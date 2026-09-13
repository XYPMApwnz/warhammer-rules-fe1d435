import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const moduleDir=path.dirname(fileURLToPath(import.meta.url));
export const defaultRepoRoot=path.resolve(moduleDir,'../../..');
export const defaultRegistryPath=path.join(defaultRepoRoot,'books','source-ingestion-contract.json');

export const sha256=value=>crypto.createHash('sha256').update(value).digest('hex');
export const normalizeLf=value=>String(value).replace(/\r\n/g,'\n');
const stable=value=>{
  if(Array.isArray(value))return value.map(stable);
  if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])]));
  return value;
};
export const stableJson=value=>`${JSON.stringify(stable(value),null,2)}\n`;

export function readSourceRegistry(registryPath=defaultRegistryPath){
  const registry=JSON.parse(fs.readFileSync(registryPath,'utf8'));
  if(registry.schema!=='warhammer-source-ingestion/v1')throw new Error(`Unsupported source-ingestion registry schema: ${registry.schema}`);
  return registry;
}

export function aggregateArtifactHash(artifacts){
  return sha256(artifacts.map(item=>`${item.path}\0${item.sha256}`).sort().join('\n'));
}

export function verifyFrozenSource(sourceId,{repoRoot=defaultRepoRoot,registryPath=defaultRegistryPath}={}){
  const registry=readSourceRegistry(registryPath);
  const source=registry.sources.find(item=>item.sourceId===sourceId);
  if(!source)throw new Error(`Unknown frozen source: ${sourceId}`);
  if(!Array.isArray(source.artifacts)||!source.artifacts.length)throw new Error(`${sourceId}: no frozen artifacts are registered`);
  const verified=source.artifacts.map(artifact=>{
    const file=path.resolve(repoRoot,artifact.path);
    if(!fs.existsSync(file))throw new Error(`${sourceId}: frozen artifact is missing: ${artifact.path}`);
    const raw=fs.readFileSync(file);
    const bytes=artifact.normalization==='lf'?Buffer.from(normalizeLf(raw.toString('utf8')),'utf8'):raw;
    const actual=sha256(bytes);
    if(actual.toLowerCase()!==String(artifact.sha256).toLowerCase())throw new Error(`${sourceId}: frozen artifact hash mismatch for ${artifact.path}: expected ${artifact.sha256}, got ${actual}`);
    return{path:artifact.path,sha256:actual};
  });
  const aggregate=aggregateArtifactHash(verified);
  if(source.acceptedHash&&source.artifacts.length===1&&source.acceptedHash.toLowerCase()!==verified[0].sha256.toLowerCase())throw new Error(`${sourceId}: acceptedHash does not match its frozen artifact`);
  return{sourceId,status:source.status,rawOrigin:source.rawOrigin,artifacts:verified,aggregateArtifactHash:aggregate};
}

export function requireSourceToolMode(argv,{toolName}){
  const check=argv.includes('--check');
  const capture=argv.includes('--capture-update');
  if(check===capture)throw new Error(`${toolName}: choose exactly one mode: --check or --capture-update --candidate-dir <path>`);
  if(check)return{kind:'verify'};
  const index=argv.indexOf('--candidate-dir');
  const candidateDir=index>=0?argv[index+1]:'';
  if(!candidateDir||candidateDir.startsWith('--'))throw new Error(`${toolName}: --capture-update requires --candidate-dir <path>`);
  return{kind:'capture',candidateDir:path.resolve(candidateDir)};
}

const safeName=value=>String(value).normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,120)||'artifact';

export function createCaptureSession({repoRoot=defaultRepoRoot,sourceId,authority,sourceType,candidateDir,extractorPath,upstreamVersion=null,upstreamCommit=null,notes='',confidence='unreviewed'}){
  const root=path.resolve(candidateDir);
  const insideRepo=path.relative(path.resolve(repoRoot),root);
  const approvedRepoRoot=path.resolve(repoRoot,'tmp','source-candidates');
  if(insideRepo!==''&&!insideRepo.startsWith(`..${path.sep}`)&&insideRepo!=='..'&&!path.isAbsolute(insideRepo)){
    const approvedRelative=path.relative(approvedRepoRoot,root);
    if(approvedRelative.startsWith(`..${path.sep}`)||approvedRelative==='..'||path.isAbsolute(approvedRelative))throw new Error(`${sourceId}: candidate directory inside the repository must be under tmp/source-candidates`);
  }
  const rawDir=path.join(root,'raw');
  const normalizedDir=path.join(root,'normalized');
  fs.mkdirSync(rawDir,{recursive:true});
  fs.mkdirSync(normalizedDir,{recursive:true});
  const captureId=`${sourceId}-${new Date().toISOString().replace(/[:.]/g,'-')}`;
  const rawArtifacts=[];
  const requestedUrls=[];
  const finalUrls=[];
  const extractorFile=path.resolve(repoRoot,extractorPath);
  const extractorIdentity={path:extractorPath,sha256:sha256(fs.readFileSync(extractorFile))};
  return{
    root,
    captureText({requestedUrl,finalUrl,content,name}){
      if(!requestedUrl||!finalUrl)throw new Error(`${sourceId}: captured artifacts require requested and final URLs`);
      const index=rawArtifacts.length+1;
      const relative=path.posix.join('raw',`${String(index).padStart(3,'0')}-${safeName(name)}.html`);
      const bytes=Buffer.from(content,'utf8');
      fs.writeFileSync(path.join(root,...relative.split('/')),bytes);
      rawArtifacts.push({path:relative,sha256:sha256(bytes),requestedUrl,finalUrl,bytes:bytes.length});
      requestedUrls.push(requestedUrl);
      finalUrls.push(finalUrl);
      return relative;
    },
    async capturePage(page,requestedUrl,name){
      const content=await page.content();
      this.captureText({requestedUrl,finalUrl:page.url(),content,name});
      return content;
    },
    writeCandidate(relativePath,content){
      const file=path.join(normalizedDir,...relativePath.replaceAll('\\','/').split('/'));
      const relative=path.relative(normalizedDir,file);
      if(relative.startsWith(`..${path.sep}`)||relative==='..'||path.isAbsolute(relative))throw new Error(`${sourceId}: candidate output escapes the normalized bundle`);
      fs.mkdirSync(path.dirname(file),{recursive:true});
      fs.writeFileSync(file,content,'utf8');
      return file;
    },
    finalize(overrides={}){
      if(!rawArtifacts.length)throw new Error(`${sourceId}: capture contains no retained raw artifacts`);
      const manifest={
        schema:'warhammer-source-capture/v1',sourceId,authority,sourceType,captureId,capturedAt:new Date().toISOString(),
        requestedUrls:[...new Set(requestedUrls)],finalUrls:[...new Set(finalUrls)],rawArtifacts,
        upstreamVersion:overrides.upstreamVersion??upstreamVersion,upstreamCommit:overrides.upstreamCommit??upstreamCommit,extractorIdentity,notes,confidence
      };
      manifest.aggregateManifestHash=sha256(stableJson(manifest));
      fs.writeFileSync(path.join(root,'capture-manifest.json'),stableJson(manifest),'utf8');
      return manifest;
    }
  };
}

export function verifyCaptureManifest(manifestPath){
  const file=path.resolve(manifestPath),root=path.dirname(file),manifest=JSON.parse(fs.readFileSync(file,'utf8'));
  if(manifest.schema!=='warhammer-source-capture/v1')throw new Error('Unsupported source capture schema');
  if(!manifest.sourceId||!manifest.authority||!manifest.sourceType||!manifest.captureId||!manifest.capturedAt)throw new Error('Source capture identity is incomplete');
  if(!Array.isArray(manifest.requestedUrls)||!manifest.requestedUrls.length||!Array.isArray(manifest.finalUrls)||!manifest.finalUrls.length)throw new Error('Source capture URL identity is incomplete');
  if(!Array.isArray(manifest.rawArtifacts)||!manifest.rawArtifacts.length)throw new Error('Source capture retained no raw artifacts');
  const expected=manifest.aggregateManifestHash;
  const withoutHash={...manifest};delete withoutHash.aggregateManifestHash;
  if(sha256(stableJson(withoutHash))!==expected)throw new Error('Source capture aggregate manifest hash mismatch');
  for(const artifact of manifest.rawArtifacts){
    const artifactPath=path.resolve(root,artifact.path),relative=path.relative(root,artifactPath);
    if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error(`Source capture artifact escapes bundle: ${artifact.path}`);
    if(!fs.existsSync(artifactPath))throw new Error(`Source capture artifact is missing: ${artifact.path}`);
    const actual=sha256(fs.readFileSync(artifactPath));
    if(actual!==artifact.sha256)throw new Error(`Source capture artifact hash mismatch: ${artifact.path}`);
  }
  return manifest;
}
