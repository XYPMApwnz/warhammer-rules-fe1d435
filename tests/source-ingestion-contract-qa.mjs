import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  aggregateArtifactHash,createCaptureSession,readSourceRegistry,requireSourceToolMode,sha256,stableJson,
  verifyCaptureManifest,verifyFrozenSource
} from '../books/shared/tools/source-ingestion-contract.mjs';
import {verifyBsdataSource} from '../books/shared/tools/verify-bsdata-source.mjs';
import {buildSourceStatus} from '../books/shared/tools/source-freshness.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const packageJson=JSON.parse(read('package.json'));
const registry=readSourceRegistry();
const freshness=buildSourceStatus();
assert.equal(freshness.summary.REGISTERED_SOURCE_COUNT,5);
assert.equal(freshness.summary.DECLARED_SOURCE_COUNT,32);
assert.equal(freshness.summary.CLASSIFIED_DECLARED_SOURCE_COUNT,4);
assert.equal(freshness.summary.UNCLASSIFIED_SOURCE_COUNT,28);
assert.equal(freshness.summary.REGISTERED_WITHOUT_MANIFEST_DECLARATION_COUNT,1);
assert.deepEqual(freshness.summary.BOOKS_WITH_COMPLETE_SOURCE_ENROLLMENT,[]);
assert.deepEqual(freshness.summary.BOOKS_WITH_PARTIAL_SOURCE_ENROLLMENT,['tau-empire','chaos-space-marines','space-marines']);
assert.deepEqual(freshness.summary.BOOKS_WITH_NO_SOURCE_ENROLLMENT,['death-guard','adeptus-mechanicus','tyranids','emperors-children','dark-angels','blood-angels','orks']);
assert(freshness.sources.every(source=>source.UPSTREAM_OBSERVATION.status==='UNKNOWN'),'Missing retained upstream observations must remain UNKNOWN');
const active=[
  ['books/space-marines/tools/extract-codex-details.cjs','space-marines-codex-details'],
  ['books/chaos-space-marines/tools/extract-mfm.cjs','csm-mfm-v1.3'],
  ['books/tau-empire/tools/extract-mfm.cjs','tau-mfm-v1.3'],
  ['books/tau-empire/tools/extract-wargear.cjs','tau-codex-wargear'],
  ['books/tau-empire/tools/extract-codex-parity.cjs','tau-codex-parity']
];

const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(directory,entry.name)):[path.join(directory,entry.name)]);
const networkSourceTools=walk(path.join(root,'books')).filter(file=>/[\\/]tools[\\/]/.test(file)&&/\.(?:mjs|cjs|js|py)$/.test(file)&&/page\.goto\(|\bfetch\s*\(|https?\.get\(|chromium\.launch\(|urlopen\(|requests\.(?:get|post)\(/.test(fs.readFileSync(file,'utf8'))).map(file=>path.relative(root,file).replaceAll(path.sep,'/')).sort();
assert.deepEqual(networkSourceTools,[...active.map(([tool])=>tool),...registry.dormantLiveTools].sort(),'Every network-capable source tool must be enrolled as frozen-capture or guarded legacy workflow');

const acceptedBefore=new Map(registry.sources.flatMap(source=>source.artifacts.map(artifact=>[artifact.path,sha256(fs.readFileSync(path.join(root,artifact.path)))])));
for(const [tool] of active){
  const executable=path.join(root,tool);
  for(const [args,message] of [
    [[],/choose exactly one mode/],
    [['--capture-update'],/candidate-dir/],
    [['--check','--capture-update','--candidate-dir',root],/choose exactly one mode/],
    [['--capture-update','--candidate-dir',root],/repository root/]
  ]){
    const result=spawnSync(process.execPath,[executable,...args],{cwd:root,encoding:'utf8'});
    assert.notEqual(result.status,0,`${tool}: unsafe source mode unexpectedly succeeded`);
    assert.match(`${result.stdout}${result.stderr}`,message,`${tool}: unsafe source mode did not fail at the expected boundary`);
  }
  const checked=spawnSync(process.execPath,[executable,'--check'],{cwd:root,encoding:'utf8'});
  assert.equal(checked.status,0,`${tool}: frozen --check failed: ${checked.stderr||checked.stdout}`);
}
for(const [artifact,before] of acceptedBefore)assert.equal(sha256(fs.readFileSync(path.join(root,artifact))),before,`${artifact}: frozen verification mutated an accepted artifact`);

for(const tool of ['books/adeptus-mechanicus/tests/codex-parity.cjs','books/adeptus-mechanicus/tests/datasheet-parity.cjs']){
  const result=spawnSync(process.execPath,[path.join(root,tool)],{cwd:root,encoding:'utf8'});
  assert.notEqual(result.status,0,`${tool}: mutable live diagnostic ran without explicit mode`);
  assert.match(`${result.stdout}${result.stderr}`,/--live-diagnostic/,`${tool}: missing explicit live-diagnostic guard`);
}

for(const [tool,sourceId] of active){
  const source=read(tool),modeIndex=source.indexOf('requireSourceToolMode'),returnIndex=source.indexOf("mode.kind==='verify'");
  assert(modeIndex>=0&&returnIndex>modeIndex,`${tool}: frozen verification mode must be selected before live work`);
  assert(!/^const .*require\(['"]playwright['"]\)/m.test(source),`${tool}: Playwright must not be loaded at module scope`);
  assert(source.includes('requireSourceToolMode')&&source.includes('candidateDir'),`${tool}: live source access must require explicit candidate capture mode`);
  const verified=verifyFrozenSource(sourceId);
  assert(verified.artifacts.length>0,`${sourceId}: no frozen artifacts verified`);
}

assert.throws(()=>requireSourceToolMode([],{toolName:'probe'}),/choose exactly one mode/);
assert.throws(()=>requireSourceToolMode(['--check','--capture-update'],{toolName:'probe'}),/choose exactly one mode/);
assert.throws(()=>requireSourceToolMode(['--capture-update'],{toolName:'probe'}),/candidate-dir/);
assert.deepEqual(requireSourceToolMode(['--check'],{toolName:'probe'}),{kind:'verify'});

const temp=fs.mkdtempSync(path.join(os.tmpdir(),'warhammer-source-contract-'));
try{
  const artifact=path.join(temp,'accepted.json');fs.writeFileSync(artifact,'{"ok":true}\r\n');
  const sourceRegistry={schema:'warhammer-source-ingestion/v1',sources:[{sourceId:'probe',artifacts:[{path:'accepted.json',normalization:'lf',sha256:sha256('{"ok":true}\n')}]}]};
  const registryPath=path.join(temp,'registry.json');fs.writeFileSync(registryPath,JSON.stringify(sourceRegistry));
  assert.equal(verifyFrozenSource('probe',{repoRoot:temp,registryPath}).artifacts.length,1);
  fs.writeFileSync(artifact,'{"ok":false}\n');
  assert.throws(()=>verifyFrozenSource('probe',{repoRoot:temp,registryPath}),/hash mismatch/);
  fs.rmSync(artifact);
  assert.throws(()=>verifyFrozenSource('probe',{repoRoot:temp,registryPath}),/missing/);

  assert.throws(()=>createCaptureSession({repoRoot:root,sourceId:'unsafe',authority:'official',sourceType:'html',candidateDir:path.join(root,'books','unsafe-candidate'),extractorPath:'tests/source-ingestion-contract-qa.mjs'}),/tmp\/source-candidates/);
  assert.throws(()=>createCaptureSession({repoRoot:root,sourceId:'repo-root',authority:'official',sourceType:'html',candidateDir:root,extractorPath:'tests/source-ingestion-contract-qa.mjs'}),/repository root/);
  assert.throws(()=>createCaptureSession({repoRoot:root,sourceId:'repo-parent',authority:'official',sourceType:'html',candidateDir:path.dirname(root),extractorPath:'tests/source-ingestion-contract-qa.mjs'}),/contain accepted production paths/);

  const capture=createCaptureSession({repoRoot:root,sourceId:'probe-live',authority:'official',sourceType:'html',candidateDir:path.join(temp,'capture'),extractorPath:'package.json',localInputs:[{path:'books/source-ingestion-contract.json',kind:'config-input',owner:'source registry'}]});
  assert.equal(JSON.parse(fs.readFileSync(path.join(capture.root,'capture-state.json'),'utf8')).status,'INCOMPLETE');
  capture.captureText({requestedUrl:'https://example.invalid/requested',finalUrl:'https://example.invalid/final',content:'<html>retained</html>',name:'index'});
  capture.writeCandidate('candidate.json','{"candidate":true}\n');
  const manifest=capture.finalize(),manifestPath=path.join(capture.root,'capture-manifest.json');
  assert.deepEqual(manifest.normalizationInputs.map(input=>input.path),['books/source-ingestion-contract.json']);
  assert.equal(JSON.parse(fs.readFileSync(path.join(capture.root,'capture-state.json'),'utf8')).status,'COMPLETE');
  assert.equal(verifyCaptureManifest(manifestPath).aggregateManifestHash,manifest.aggregateManifestHash);
  assert.throws(()=>createCaptureSession({repoRoot:root,sourceId:'reused',authority:'official',sourceType:'html',candidateDir:path.join(temp,'capture'),extractorPath:'package.json'}),/fresh isolated destination/);
  fs.writeFileSync(path.join(capture.root,'capture-state.json'),stableJson({schema:'warhammer-source-capture-state/v1',captureId:manifest.captureId,status:'INCOMPLETE'}));
  assert.throws(()=>verifyCaptureManifest(manifestPath),/completion state/);
  fs.writeFileSync(path.join(capture.root,'capture-state.json'),stableJson({schema:'warhammer-source-capture-state/v1',captureId:manifest.captureId,status:'COMPLETE',manifestSha256:sha256(stableJson(manifest))}));
  const candidatePath=path.join(capture.root,manifest.normalizedArtifacts[0].path),candidateBytes=fs.readFileSync(candidatePath);
  fs.appendFileSync(candidatePath,'tampered');
  assert.throws(()=>verifyCaptureManifest(manifestPath),/normalized artifact hash mismatch/);
  fs.writeFileSync(candidatePath,candidateBytes);fs.rmSync(candidatePath);
  assert.throws(()=>verifyCaptureManifest(manifestPath),/normalized artifact is missing/);
  fs.writeFileSync(candidatePath,candidateBytes);
  fs.appendFileSync(path.join(capture.root,manifest.rawArtifacts[0].path),'tampered');
  assert.throws(()=>verifyCaptureManifest(manifestPath),/artifact hash mismatch/);

  const trackedRoot=path.join(temp,'tracked-inputs');fs.mkdirSync(trackedRoot);
  const git=(...args)=>{const result=spawnSync('git',args,{cwd:trackedRoot,encoding:'utf8'});assert.equal(result.status,0,result.stderr||result.stdout);};
  git('init');git('config','user.name','Source Contract QA');git('config','user.email','source-contract@example.invalid');
  fs.writeFileSync(path.join(trackedRoot,'extractor.mjs'),'export default true;\n');fs.writeFileSync(path.join(trackedRoot,'input.json'),'{"current":true}\n');
  git('add','.');git('commit','-m','fixture');
  const trackedCapture=createCaptureSession({repoRoot:trackedRoot,sourceId:'tracked-probe',authority:'official',sourceType:'html',candidateDir:path.join(temp,'tracked-capture'),extractorPath:'extractor.mjs',localInputs:['input.json']});
  trackedCapture.captureText({requestedUrl:'https://example.invalid/input',finalUrl:'https://example.invalid/input',content:'<html>tracked</html>',name:'tracked'});trackedCapture.writeCandidate('candidate.json','{}\n');
  const trackedManifest=trackedCapture.finalize(),trackedManifestPath=path.join(trackedCapture.root,'capture-manifest.json');
  assert.equal(verifyCaptureManifest(trackedManifestPath,{repoRoot:trackedRoot}).normalizationInputs[0].sha256,trackedManifest.normalizationInputs[0].sha256);
  fs.writeFileSync(path.join(trackedRoot,'input.json'),'{"current":false}\n');
  assert.throws(()=>verifyCaptureManifest(trackedManifestPath,{repoRoot:trackedRoot}),/repository inputs differ from HEAD/);
  fs.writeFileSync(path.join(trackedRoot,'untracked.json'),'{}\n');
  assert.throws(()=>createCaptureSession({repoRoot:trackedRoot,sourceId:'untracked-probe',authority:'official',sourceType:'html',candidateDir:path.join(temp,'untracked-capture'),extractorPath:'extractor.mjs',localInputs:['untracked.json']}),/every repository input must be tracked/);
}finally{fs.rmSync(temp,{recursive:true,force:true});}

assert.throws(()=>verifyBsdataSource({checkout:root,expectedCommit:'0'.repeat(40),inputFiles:[path.join(root,'package.json')]}),/does not match checkout HEAD/,'BSData commit mismatch must fail closed');

const smWrapper=read('books/space-marines/tools/build-bsdata-layer.py');
assert(smWrapper.includes('config["source"]["checkout"] = str(checkout)'),'Space Marines wrapper must preserve an absolute authenticated checkout in its temporary config');
assert(smWrapper.includes('faction_path = (checkout / faction).resolve()'),'Space Marines wrapper must resolve faction inputs from the configured checkout');
const smFactionPackWrapper=read('books/space-marines/tools/extract-faction-pack.mjs');
const smFactionPackExtractor=read('books/space-marines/tools/extract-faction-pack.py');
assert(smFactionPackWrapper.indexOf('verifyBsdataSource({checkout')<smFactionPackWrapper.indexOf('spawnSync(python'),'Space Marines Faction Pack wrapper must authenticate its BSData inputs before starting the extractor');
assert(smFactionPackWrapper.includes("configuredInput('Imperium - Space Marines.json')")&&smFactionPackWrapper.includes("configuredInput('Library - Astartes Heresy Legends.json')"),'Space Marines Faction Pack wrapper must authenticate every BSData input consumed by the extractor');
assert(!smFactionPackExtractor.includes('tmp" / "bsdata-wh40k-11e"'),'Space Marines Faction Pack extractor must not read an ambient mutable checkout');
assert(smFactionPackExtractor.includes('parser.add_argument("--bsdata-faction", type=Path, required=True)')&&smFactionPackExtractor.includes('parser.add_argument("--bsdata-library", type=Path, required=True)'),'Space Marines Faction Pack extractor must require authenticated input paths');
assert(packageJson.scripts['army-books:sources:check'].includes('node books/space-marines/tools/extract-faction-pack.mjs --check'),'Normal source checking must use the authenticated Space Marines Faction Pack wrapper');
const smCodexDetails=read('books/space-marines/tools/extract-codex-details.cjs');
const smSessionIndex=smCodexDetails.indexOf('contract.createCaptureSession({sourceId:');
for(const input of ['datasheetsPath','packPath','overlayPath','relatedPath','mechanicusConfigPath']){
  assert(smCodexDetails.indexOf(`path:path.relative(path.resolve(root,'../..'),${input})`,smSessionIndex)>smSessionIndex,`Space Marines codex-details must authenticate ${input}`);
  assert(smCodexDetails.indexOf(`fs.readFileSync(${input}`,smSessionIndex)>smCodexDetails.indexOf(`path:path.relative(path.resolve(root,'../..'),${input})`,smSessionIndex),`Space Marines codex-details must authenticate ${input} before reading it`);
}
assert(smCodexDetails.indexOf("path:path.relative(path.resolve(root,'../..'),mechanicusRelatedPath)",smSessionIndex)>smSessionIndex,'Space Marines codex-details must authenticate mechanicusRelatedPath');
assert(smCodexDetails.indexOf('coreRuleMap(),details=[]',smSessionIndex)>smCodexDetails.indexOf("path:path.relative(path.resolve(root,'../..'),mechanicusRelatedPath)",smSessionIndex),'Space Marines codex-details must authenticate mechanicusRelatedPath before using it');
assert(smCodexDetails.includes("mechanicusConfig.relatedRulesOwnership?.mode!=='authoritative-runtime-source'"),'Space Marines codex-details must verify the declared owner of its cross-book generated input');
for(const [tool,inputs] of [
  ['books/chaos-space-marines/tools/extract-mfm.cjs',['datasheetsPath','manifestPath']],
  ['books/tau-empire/tools/extract-mfm.cjs',['datasheetsPath']],
  ['books/tau-empire/tools/extract-wargear.cjs',['datasheetsPath']],
  ['books/tau-empire/tools/extract-codex-parity.cjs',['pointsPath','factionPackPath']]
]){
  const source=read(tool),sessionIndex=source.indexOf('contract.createCaptureSession({sourceId:');
  for(const input of inputs){
    const declaredIndex=source.indexOf(`path:path.relative(path.resolve(root,'../..'),${input})`,sessionIndex);
    assert(declaredIndex>sessionIndex,`${tool}: ${input} is not declared as an authenticated normalization input`);
    assert(source.indexOf(`fs.readFileSync(${input}`,sessionIndex)>declaredIndex,`${tool}: ${input} is read before authentication`);
  }
}
const ecIndex=read('books/emperors-children/tools/build-bsdata-enhancement-index.mjs');
assert(ecIndex.indexOf('verifyBsdataSource({checkout')<ecIndex.indexOf('const raw=fs.readFileSync(input)'),'Emperor\'s Children index must authenticate its ambient BSData input before reading it');

const normalSourceCommands=['army-books:sources:check','tau:sources:check'];
for(const name of normalSourceCommands){
  const command=packageJson.scripts[name];
  assert(command,`${name}: missing`);
  for(const [tool] of active)if(command.includes(tool))assert(command.match(new RegExp(`${tool.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')} --check`)),`${name}: ${tool} must be invoked only in frozen --check mode`);
}

const normalGraph=Object.entries(packageJson.scripts).filter(([name])=>name==='test'||name.startsWith('test:')||name.endsWith(':build')||name.endsWith(':check')||name==='army-books:sources:check').map(([,command])=>command).join('\n');
for(const dormant of registry.dormantLiveTools){
  const source=read(dormant);
  assert(source.includes('--capture-update')||source.includes('beginLegacyCaptureTool'),`${dormant}: live mode lacks an explicit update guard`);
  if(normalGraph.includes(dormant))assert(normalGraph.includes(`${dormant} --check`),`${dormant}: dormant live branch is reachable from normal scripts`);
}

for(const name of ['test','test:preview','test:full','test:release']){
  const command=packageJson.scripts[name];
  assert(!/wahapedia\.ru|warhammer-community\.com|raw\.githubusercontent\.com|\bcurl\b|\bwget\b|\bgit\s+(?:clone|fetch|pull)\b/i.test(command),`${name}: external source network command is wired into normal tests`);
}

const statusSet=new Set(registry.statuses);
for(const source of registry.sources){
  assert(statusSet.has(source.status),`${source.sourceId}: unknown status ${source.status}`);
  assert(source.acceptedRevision&&source.lastChecked&&source.acceptedHash,`${source.sourceId}: freshness identity is incomplete`);
  assert(source.status!=='LEGACY_UNVERIFIABLE'||source.rawOrigin==='UNAVAILABLE',`${source.sourceId}: legacy status must disclose unavailable raw origin`);
  const expectedHash=source.artifacts.length===1?source.artifacts[0].sha256:aggregateArtifactHash(source.artifacts);
  assert.equal(source.acceptedHash.toLowerCase(),expectedHash.toLowerCase(),`${source.sourceId}: accepted hash must identify its complete frozen artifact set`);
}

console.log(`Source ingestion contract QA passed: ${active.length} frozen live-derived sources, ${registry.dormantLiveTools.length} guarded update tools.`);
