import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const extractorPath=path.join(root,'books','space-marines','tools','extract-codex-details.cjs');
const coreOwnerPath=path.join(root,'books','core-rules','content','core-stratagems.related-rules.inc');
const formerMechanicusPath=path.join(root,'books','adeptus-mechanicus','mobile','related-rules.inc');
const extractorSource=fs.readFileSync(extractorPath,'utf8');
const {coreRuleMap,coreRelatedPath,buildDetachmentInputs}=require(extractorPath);

const canonicalCoreIds=[
  'core-stratagem-command-re-roll',
  'core-stratagem-counteroffensive',
  'core-stratagem-crushing-impact',
  'core-stratagem-epic-challenge',
  'core-stratagem-explosives',
  'core-stratagem-fire-overwatch',
  'core-stratagem-heroic-intervention',
  'core-stratagem-insane-bravery',
  'core-stratagem-rapid-ingress',
  'core-stratagem-smokescreen'
].sort();

assert.equal(path.resolve(coreRelatedPath),coreOwnerPath,'Space Marines codex normalization must use the Core-owned Related Rules artifact');
assert.doesNotMatch(extractorSource,/adeptus-mechanicus/,'Space Marines codex normalization still names an Adeptus Mechanicus artifact');
assert.match(extractorSource,/core-rules','content','core-stratagems\.related-rules\.inc/,'Core-owned normalization input is not declared');

const expectedMap=coreRuleMap();
assert.deepEqual([...new Set(expectedMap.values())].sort(),canonicalCoreIds,'Core-owned canonical Stratagem identities changed');

const originalReadFileSync=fs.readFileSync;
const absentReads=[];
try{
  fs.readFileSync=(file,...args)=>{
    const resolved=path.resolve(String(file));
    absentReads.push(resolved);
    if(resolved===formerMechanicusPath)throw new Error('former generated input is absent');
    return originalReadFileSync(file,...args);
  };
  assert.deepEqual([...new Set(coreRuleMap().values())].sort(),canonicalCoreIds,'Absent former generated input changed canonical Core identities');
}finally{
  fs.readFileSync=originalReadFileSync;
}
assert(!absentReads.includes(formerMechanicusPath),'The former generated input was still read in the absent-input probe');

const mechanicusMarkup=originalReadFileSync(formerMechanicusPath,'utf8');
const poisonedMechanicusMarkup=mechanicusMarkup.replace('id="core-stratagem-command-re-roll"','id="poisoned-core-command-re-roll"');
assert.notEqual(poisonedMechanicusMarkup,mechanicusMarkup,'Poison fixture did not alter the former generated input');
let poisonedReads=0;
try{
  fs.readFileSync=(file,...args)=>{
    if(path.resolve(String(file))===formerMechanicusPath){
      poisonedReads+=1;
      return poisonedMechanicusMarkup;
    }
    return originalReadFileSync(file,...args);
  };
  assert.deepEqual([...new Set(coreRuleMap().values())].sort(),canonicalCoreIds,'Poisoned former generated input influenced canonical Core identities');
}finally{
  fs.readFileSync=originalReadFileSync;
}
assert.equal(poisonedReads,0,'The former generated input was consulted during the poison probe');

const packPath=path.join(root,'books','space-marines','content','space-marines-faction-pack.en.json');
const previousOverlayPath=path.join(root,'books','space-marines','content','space-marines-current-overlay.en.json');
const pack=JSON.parse(originalReadFileSync(packPath,'utf8'));
const acceptedOverlay=JSON.parse(originalReadFileSync(previousOverlayPath,'utf8'));
const vengefulMatches=pack.detachments.filter(item=>item.id==='vengeful-hosts');
assert.equal(vengefulMatches.length,1,'Faction Pack must own exactly one Vengeful Hosts Detachment');
const [vengeful]=vengefulMatches;
assert.equal(vengeful.title,'Vengeful Hosts','Faction Pack Vengeful Hosts title changed');
assert.equal(vengeful.rule?.id,'vengeful-hosts-imperator-unleashed','Vengeful Hosts canonical Detachment rule changed');
assert.deepEqual((vengeful.enhancements||[]).map(item=>item.id).sort(),['enhancement-avenging-angel','enhancement-orksbane'],'Vengeful Hosts Enhancement identities changed');
assert.deepEqual((vengeful.stratagems||[]).map(item=>item.id).sort(),['vengeful-hosts-know-no-fear','vengeful-hosts-meteoric-onslaught','vengeful-hosts-purge-by-sectors'],'Vengeful Hosts Stratagem identities changed');
assert.deepEqual(vengeful.sourcePages,[2],'Vengeful Hosts Faction Pack page locator changed');
assert.equal(vengeful.provenance?.sourceId,'space-marines-faction-pack-v1.2','Vengeful Hosts must remain owned by the authenticated Faction Pack');
assert.deepEqual(vengeful.provenance?.sourcePages,[2],'Vengeful Hosts provenance page locator changed');

const sourceManifest=JSON.parse(originalReadFileSync(path.join(root,'books','space-marines','sources','source-manifest.json'),'utf8'));
const factionPackSource=sourceManifest.layers.find(item=>item.id==='faction-pack-v1.2');
assert(factionPackSource,'Space Marines source manifest lost the Faction Pack v1.2 owner');
const factionPackPdfPath=path.join(root,'books','space-marines','sources',factionPackSource.localFile);
const factionPackPdfHash=crypto.createHash('sha256').update(originalReadFileSync(factionPackPdfPath)).digest('hex').toUpperCase();
assert.equal(factionPackPdfHash,factionPackSource.sha256,'Retained Faction Pack bytes do not match the declared source hash');
assert.equal(String(pack.meta?.sha256).toUpperCase(),factionPackSource.sha256,'Generated Faction Pack metadata does not bind the retained source hash');

const acceptedInputs=buildDetachmentInputs(pack,acceptedOverlay.detachments);
assert.strictEqual(acceptedInputs.vengeful,vengeful,'Vengeful Hosts must come directly from the authenticated Faction Pack object');
assert.deepEqual(acceptedInputs.overlayDetachments,acceptedOverlay.detachments,'Codex overlay output changed while removing its self-input');
assert.equal(acceptedInputs.allDetachments.filter(item=>item.id==='vengeful-hosts').length,1,'Combined Detachment inputs must contain exactly one Vengeful Hosts identity');
assert.throws(()=>buildDetachmentInputs({...pack,detachments:pack.detachments.filter(item=>item.id!=='vengeful-hosts')},[]),/must resolve exactly once/,'Missing accepted Vengeful Hosts owner must fail closed');
assert.throws(()=>buildDetachmentInputs({...pack,detachments:[...pack.detachments,vengeful]},[]),/must resolve exactly once/,'Duplicate accepted Vengeful Hosts owner must fail closed');

let previousOverlayReads=0;
try{
  fs.readFileSync=(file,...args)=>{
    if(path.resolve(String(file))===previousOverlayPath){
      previousOverlayReads+=1;
      throw new Error('previous generated overlay is absent');
    }
    return originalReadFileSync(file,...args);
  };
  const absentResult=buildDetachmentInputs(pack,[]);
  assert.strictEqual(absentResult.vengeful,vengeful,'Absent previous overlay changed the accepted Vengeful Hosts owner');
}finally{
  fs.readFileSync=originalReadFileSync;
}
assert.equal(previousOverlayReads,0,'The previous generated overlay was read during the absent-input probe');

const poisonedOverlay=JSON.stringify({schema:1,detachments:[{id:'vengeful-hosts',title:'POISONED VENGEFUL HOSTS',rules:[{id:'poisoned-rule'}]}]});
let poisonedOverlayReads=0;
try{
  fs.readFileSync=(file,...args)=>{
    if(path.resolve(String(file))===previousOverlayPath){
      poisonedOverlayReads+=1;
      return poisonedOverlay;
    }
    return originalReadFileSync(file,...args);
  };
  const poisonResult=buildDetachmentInputs(pack,acceptedOverlay.detachments);
  assert.strictEqual(poisonResult.vengeful,vengeful,'Poisoned previous overlay changed the accepted Vengeful Hosts owner');
  assert.equal(poisonResult.vengeful.rule?.id,'vengeful-hosts-imperator-unleashed','Poisoned previous overlay changed the canonical Vengeful Hosts rule');
}finally{
  fs.readFileSync=originalReadFileSync;
}
assert.equal(poisonedOverlayReads,0,'The poisoned previous generated overlay was consulted');
assert.doesNotMatch(extractorSource,/previousOverlay/,'Space Marines codex-details still names its previous generated overlay as factual input');
assert.doesNotMatch(extractorSource,/fs\.readFileSync\(overlayPath/,'Space Marines codex-details still reads its previous generated overlay');
assert.match(extractorSource,/filter\(item=>item\.id==='vengeful-hosts'\)/,'Vengeful Hosts must resolve by exact canonical identity');

const snapshot=JSON.parse(fs.readFileSync(path.join(root,'books','space-marines','sources','wahapedia-compatible-rules.snapshot.json'),'utf8'));
const snapshotCoreIds=[...new Set(Object.values(snapshot.units).flat().filter(row=>row.scope==='core').map(row=>row.ruleId))].sort();
assert.deepEqual(snapshotCoreIds,canonicalCoreIds,'Accepted Space Marines snapshot lost canonical Core Stratagem identities');

for(const book of ['dark-angels','blood-angels']){
  const config=JSON.parse(fs.readFileSync(path.join(root,'books',book,'book.config.json'),'utf8'));
  assert.deepEqual(config.dependencies,['space-marines'],`${book}: declared Space Marines inheritance changed`);
  const sandbox={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),sandbox,{filename:`${book}/roster-data.js`});
  const catalog=sandbox.window.WH_BOOK_ROSTER_CATALOG;
  assert.equal(catalog.book.parentBookId,'space-marines',`${book}: generated parent identity changed`);
  assert(catalog.book.dependencies.some(item=>item.bookId==='space-marines'),`${book}: generated dependency identity changed`);
}

console.log('Space Marines feedback edge QA: PASS (Core and Vengeful Hosts owners, absent/poison isolation, SM-family inheritance).');
