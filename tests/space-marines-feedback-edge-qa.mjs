import assert from 'node:assert/strict';
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
const {coreRuleMap,coreRelatedPath}=require(extractorPath);

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

console.log('Space Marines feedback edge QA: PASS (Core owner, absent/poison isolation, SM-family inheritance).');