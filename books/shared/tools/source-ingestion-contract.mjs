import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {verifyTrackedInputs} from './verify-bsdata-source.mjs';

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

const samePath=(left,right)=>process.platform==='win32'
  ?path.resolve(left).toLowerCase()===path.resolve(right).toLowerCase()
  :path.resolve(left)===path.resolve(right);
const within=(file,root)=>{
  const relative=path.relative(root,file);
  return relative===''||(!relative.startsWith(`..${path.sep}`)&&relative!=='..'&&!path.isAbsolute(relative));
};
const bundlePath=(root,relative,label)=>{
  const file=path.resolve(root,...String(relative).replaceAll('\\','/').split('/'));
  if(!within(file,root))throw new Error(`Source capture ${label} escapes bundle: ${relative}`);
  return file;
};

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
  const accepted=source.artifacts.length===1?verified[0].sha256:aggregate;
  if(source.acceptedHash&&source.acceptedHash.toLowerCase()!==accepted.toLowerCase())throw new Error(`${sourceId}: acceptedHash does not match its frozen artifact set`);
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

export function beginLegacyCaptureTool({argv,toolName,...captureOptions}){
  const mode=requireSourceToolMode(argv,{toolName});
  return{mode,session:mode.kind==='capture'?createCaptureSession({...captureOptions,candidateDir:mode.candidateDir}):null};
}

export async function captureFetchText(session,url,{name,headers={}}={}){
  const response=await fetch(url,{headers});
  if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);
  const content=await response.text();
  session.captureText({requestedUrl:url,finalUrl:response.url||url,content,name:name||url});
  return content;
}

const safeName=value=>String(value).normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,120)||'artifact';

export function createCaptureSession({repoRoot=defaultRepoRoot,sourceId,authority,sourceType,candidateDir,extractorPath,localInputs=[],upstreamVersion=null,upstreamCommit=null,notes='',confidence='unreviewed'}){
  const root=path.resolve(candidateDir);
  if(samePath(root,path.resolve(repoRoot))||within(path.resolve(repoRoot),root))throw new Error(`${sourceId}: candidate directory cannot be the repository root or contain accepted production paths`);
  const insideRepo=path.relative(path.resolve(repoRoot),root);
  const approvedRepoRoot=path.resolve(repoRoot,'tmp','source-candidates');
  if(insideRepo!==''&&!insideRepo.startsWith(`..${path.sep}`)&&insideRepo!=='..'&&!path.isAbsolute(insideRepo)){
    const approvedRelative=path.relative(approvedRepoRoot,root);
    if(approvedRelative.startsWith(`..${path.sep}`)||approvedRelative==='..'||path.isAbsolute(approvedRelative))throw new Error(`${sourceId}: candidate directory inside the repository must be under tmp/source-candidates`);
  }
  const extractorFile=path.resolve(repoRoot,extractorPath);
  const requestedInputs=localInputs.map(input=>typeof input==='string'?{path:input}:input);
  const authenticated=verifyTrackedInputs({checkout:repoRoot,inputFiles:[extractorFile,...requestedInputs.map(input=>path.resolve(repoRoot,input.path))]});
  const authenticatedExtractor=path.resolve(authenticated.checkout,...authenticated.inputFiles[0].split('/'));
  const extractorIdentity={path:authenticated.inputFiles[0],sha256:sha256(fs.readFileSync(authenticatedExtractor))};
  const normalizationInputs=authenticated.inputFiles.slice(1).map((relative,index)=>{
    const bytes=fs.readFileSync(path.resolve(authenticated.checkout,...relative.split('/')));
    const input=requestedInputs[index];
    return{path:relative,kind:input.kind||'tracked-repository-input',owner:input.owner||null,sha256:sha256(bytes),bytes:bytes.length};
  });
  if(fs.existsSync(root))throw new Error(`${sourceId}: candidate directory already exists; each capture requires a fresh isolated destination`);
  fs.mkdirSync(path.dirname(root),{recursive:true});
  fs.mkdirSync(root);
  const rawDir=path.join(root,'raw');
  const normalizedDir=path.join(root,'normalized');
  fs.mkdirSync(rawDir);
  fs.mkdirSync(normalizedDir);
  const captureId=`${sourceId}-${new Date().toISOString().replace(/[:.]/g,'-')}-${crypto.randomUUID()}`;
  const statePath=path.join(root,'capture-state.json');
  fs.writeFileSync(statePath,stableJson({schema:'warhammer-source-capture-state/v1',captureId,status:'INCOMPLETE'}),'utf8');
  const rawArtifacts=[];
  const normalizedArtifacts=[];
  const requestedUrls=[];
  const finalUrls=[];
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
      const relative=path.posix.join('normalized',String(relativePath).replaceAll('\\','/'));
      if(normalizedArtifacts.some(item=>item.path===relative))throw new Error(`${sourceId}: duplicate candidate output: ${relativePath}`);
      const file=bundlePath(root,relative,'normalized artifact'),bytes=Buffer.from(content,'utf8');
      fs.mkdirSync(path.dirname(file),{recursive:true});
      fs.writeFileSync(file,bytes);
      normalizedArtifacts.push({path:relative,sha256:sha256(bytes),bytes:bytes.length});
      return file;
    },
    finalize(overrides={}){
      if(!rawArtifacts.length)throw new Error(`${sourceId}: capture contains no retained raw artifacts`);
      if(!normalizedArtifacts.length)throw new Error(`${sourceId}: capture contains no normalized candidate outputs`);
      const manifest={
        schema:'warhammer-source-capture/v1',sourceId,authority,sourceType,captureId,capturedAt:new Date().toISOString(),
        requestedUrls:[...new Set(requestedUrls)],finalUrls:[...new Set(finalUrls)],rawArtifacts,normalizedArtifacts,normalizationInputs,
        upstreamVersion:overrides.upstreamVersion??upstreamVersion,upstreamCommit:overrides.upstreamCommit??upstreamCommit,extractorIdentity,notes,confidence
      };
      manifest.aggregateManifestHash=sha256(stableJson(manifest));
      fs.writeFileSync(path.join(root,'capture-manifest.json'),stableJson(manifest),'utf8');
      fs.writeFileSync(statePath,stableJson({schema:'warhammer-source-capture-state/v1',captureId,status:'COMPLETE',manifestSha256:sha256(stableJson(manifest))}),'utf8');
      return manifest;
    }
  };
}

export function verifyCaptureManifest(manifestPath,{repoRoot=defaultRepoRoot}={}){
  const file=path.resolve(manifestPath),root=path.dirname(file),manifest=JSON.parse(fs.readFileSync(file,'utf8'));
  if(manifest.schema!=='warhammer-source-capture/v1')throw new Error('Unsupported source capture schema');
  if(!manifest.sourceId||!manifest.authority||!manifest.sourceType||!manifest.captureId||!manifest.capturedAt)throw new Error('Source capture identity is incomplete');
  if(!Array.isArray(manifest.requestedUrls)||!manifest.requestedUrls.length||!Array.isArray(manifest.finalUrls)||!manifest.finalUrls.length)throw new Error('Source capture URL identity is incomplete');
  if(!Array.isArray(manifest.rawArtifacts)||!manifest.rawArtifacts.length)throw new Error('Source capture retained no raw artifacts');
  if(!Array.isArray(manifest.normalizedArtifacts)||!manifest.normalizedArtifacts.length)throw new Error('Source capture retained no normalized artifacts');
  if(!Array.isArray(manifest.normalizationInputs))throw new Error('Source capture local normalization input identity is missing');
  if(!manifest.extractorIdentity?.path||!manifest.extractorIdentity?.sha256)throw new Error('Source capture extractor identity is missing');
  const expected=manifest.aggregateManifestHash;
  const withoutHash={...manifest};delete withoutHash.aggregateManifestHash;
  if(sha256(stableJson(withoutHash))!==expected)throw new Error('Source capture aggregate manifest hash mismatch');
  const statePath=path.join(root,'capture-state.json');
  if(!fs.existsSync(statePath))throw new Error('Source capture completion state is missing');
  const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
  if(state.schema!=='warhammer-source-capture-state/v1'||state.captureId!==manifest.captureId||state.status!=='COMPLETE'||state.manifestSha256!==sha256(stableJson(manifest)))throw new Error('Source capture completion state does not match the manifest');
  for(const artifact of manifest.rawArtifacts){
    const artifactPath=path.resolve(root,artifact.path),relative=path.relative(root,artifactPath);
    if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error(`Source capture artifact escapes bundle: ${artifact.path}`);
    if(!fs.existsSync(artifactPath))throw new Error(`Source capture artifact is missing: ${artifact.path}`);
    const actual=sha256(fs.readFileSync(artifactPath));
    if(actual!==artifact.sha256)throw new Error(`Source capture artifact hash mismatch: ${artifact.path}`);
  }
  for(const artifact of manifest.normalizedArtifacts){
    const artifactPath=bundlePath(root,artifact.path,'normalized artifact');
    if(!fs.existsSync(artifactPath))throw new Error(`Source capture normalized artifact is missing: ${artifact.path}`);
    if(sha256(fs.readFileSync(artifactPath))!==artifact.sha256)throw new Error(`Source capture normalized artifact hash mismatch: ${artifact.path}`);
  }
  const authenticated=verifyTrackedInputs({checkout:repoRoot,inputFiles:[path.resolve(repoRoot,...manifest.extractorIdentity.path.split('/')),...manifest.normalizationInputs.map(input=>path.resolve(repoRoot,...input.path.split('/')))]});
  const extractorPath=path.resolve(authenticated.checkout,...authenticated.inputFiles[0].split('/'));
  if(sha256(fs.readFileSync(extractorPath))!==manifest.extractorIdentity.sha256)throw new Error(`Source capture extractor hash mismatch: ${manifest.extractorIdentity.path}`);
  for(const [index,input] of manifest.normalizationInputs.entries()){
    const inputPath=path.resolve(authenticated.checkout,...authenticated.inputFiles[index+1].split('/'));
    if(!fs.existsSync(inputPath))throw new Error(`Source capture normalization input is missing: ${input.path}`);
    if(sha256(fs.readFileSync(inputPath))!==input.sha256)throw new Error(`Source capture normalization input hash mismatch: ${input.path}`);
  }
  return manifest;
}
