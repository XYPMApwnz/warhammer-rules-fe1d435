import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  createCaptureSession,readSourceRegistry,requireSourceToolMode,sha256,
  verifyCaptureManifest,verifyFrozenSource
} from '../books/shared/tools/source-ingestion-contract.mjs';
import {verifyBsdataSource} from '../books/shared/tools/verify-bsdata-source.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const packageJson=JSON.parse(read('package.json'));
const registry=readSourceRegistry();
const active=[
  ['books/space-marines/tools/extract-codex-details.cjs','space-marines-codex-details'],
  ['books/tau-empire/tools/extract-mfm.cjs','tau-mfm-v1.3'],
  ['books/tau-empire/tools/extract-wargear.cjs','tau-codex-wargear'],
  ['books/tau-empire/tools/extract-codex-parity.cjs','tau-codex-parity']
];

for(const [tool,sourceId] of active){
  const source=read(tool),modeIndex=source.indexOf('requireSourceToolMode'),returnIndex=source.indexOf("mode.kind==='verify'"),playwrightIndex=source.indexOf("require('playwright')");
  assert(modeIndex>=0&&returnIndex>modeIndex&&playwrightIndex>returnIndex,`${tool}: frozen verification must return before Playwright is loaded`);
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

  const capture=createCaptureSession({repoRoot:root,sourceId:'probe-live',authority:'official',sourceType:'html',candidateDir:path.join(temp,'capture'),extractorPath:'tests/source-ingestion-contract-qa.mjs'});
  capture.captureText({requestedUrl:'https://example.invalid/requested',finalUrl:'https://example.invalid/final',content:'<html>retained</html>',name:'index'});
  capture.writeCandidate('candidate.json','{"candidate":true}\n');
  const manifest=capture.finalize(),manifestPath=path.join(capture.root,'capture-manifest.json');
  assert.equal(verifyCaptureManifest(manifestPath).aggregateManifestHash,manifest.aggregateManifestHash);
  fs.appendFileSync(path.join(capture.root,manifest.rawArtifacts[0].path),'tampered');
  assert.throws(()=>verifyCaptureManifest(manifestPath),/artifact hash mismatch/);
}finally{fs.rmSync(temp,{recursive:true,force:true});}

assert.throws(()=>verifyBsdataSource({checkout:root,expectedCommit:'0'.repeat(40),inputFiles:[path.join(root,'package.json')]}),/does not match checkout HEAD/,'BSData commit mismatch must fail closed');

const normalSourceCommands=['army-books:sources:check','tau:sources:check'];
for(const name of normalSourceCommands){
  const command=packageJson.scripts[name];
  assert(command,`${name}: missing`);
  for(const [tool] of active)if(command.includes(tool))assert(command.match(new RegExp(`${tool.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')} --check`)),`${name}: ${tool} must be invoked only in frozen --check mode`);
}

const normalGraph=Object.entries(packageJson.scripts).filter(([name])=>name==='test'||name.startsWith('test:')||name.endsWith(':build')||name.endsWith(':check')||name==='army-books:sources:check').map(([,command])=>command).join('\n');
for(const dormant of registry.dormantLiveTools){
  const source=read(dormant);
  assert(source.includes('--capture-update'),`${dormant}: live mode lacks an explicit update guard`);
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
}

console.log(`Source ingestion contract QA passed: ${active.length} frozen live-derived sources, ${registry.dormantLiveTools.length} guarded update tools.`);
