import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createCoreFactProjection} from '../books/core-rules/content/core-fact-projection.mjs';
import {ARMY_CORE_ABILITY_BINDING_SCHEMA,createArmyCoreAbilityBindings} from '../books/shared/tools/army-core-ability-binding.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projection=createCoreFactProjection({repoRoot:root});
const bindings=createArmyCoreAbilityBindings({repoRoot:root,coreFactProjection:projection});
const coreIds=new Set(projection.abilityIdentityTerms.map(term=>term.id));
const books=['tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels','adeptus-mechanicus'];
const identityKeys=new Set(['sourceAbilityId','coreAbilityId']);
const withoutIdentity=value=>{
  if(Array.isArray(value))return value.map(withoutIdentity);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([key])=>!identityKeys.has(key)).map(([key,item])=>[key,withoutIdentity(item)]));
  return value;
};
const inventory=data=>[...(data.datasheets||[]),...(data.imperialArmour||[]),...(data.legends||[])];
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');

assert.equal(bindings.bindingCount,bindings.bindings.length,'binding registry must not contain duplicate source IDs');
for(const row of bindings.bindings){
  assert.deepEqual(Object.keys(row).sort(),['coreAbilityId','sourceAbilityId'],'registry rows contain identity only');
  assert.ok(coreIds.has(row.coreAbilityId),`${row.sourceAbilityId} must resolve to an effective Core ID`);
  assert.equal(bindings.resolveRequired(row.sourceAbilityId),row.coreAbilityId);
}

const deepStrikeSourceId='7cb5-dd6b-dd87-ad3b';
const renamed=bindings.bindAbility({sourceAbilityId:deepStrikeSourceId,title:'Arbitrary renamed display label',text:'Unchanged accepted fact'});
assert.equal(renamed.coreAbilityId,'core-deep-strike','display-title rename must not influence binding');
assert.throws(()=>bindings.resolveRequired('unknown-source-id'),/Unknown Army Core source ability ID/);
assert.throws(()=>bindings.bindAbility({sourceAbilityId:'unknown-source-id',coreAbilityId:'core-deep-strike',title:'Deep Strike'}),/unknown sourceAbilityId/);
assert.throws(()=>bindings.bindAbility({sourceAbilityId:deepStrikeSourceId,coreAbilityId:'core-stealth',title:'Deep Strike'}),/conflicts/);

const minimal=(rows,terms=projection.abilityIdentityTerms)=>createArmyCoreAbilityBindings({
  repoRoot:root,
  coreFactProjection:{abilityIdentityTerms:terms},
  registry:{schema:ARMY_CORE_ABILITY_BINDING_SCHEMA,bindings:rows}
});
assert.throws(()=>minimal([
  {sourceAbilityId:'same-source',coreAbilityId:'core-deep-strike'},
  {sourceAbilityId:'same-source',coreAbilityId:'core-stealth'}
]),/duplicates sourceAbilityId/,'duplicate/conflicting source binding must fail closed');
assert.throws(()=>minimal([{sourceAbilityId:'source',coreAbilityId:'core-does-not-exist'}]),/unknown effective Core ID/);
const renamedCoreTerms=projection.abilityIdentityTerms.map(term=>({...term,title:`POISON ${term.id}`,aliases:['POISON']}));
assert.equal(minimal([{sourceAbilityId:deepStrikeSourceId,coreAbilityId:'core-deep-strike'}],renamedCoreTerms).resolveRequired(deepStrikeSourceId),'core-deep-strike','Core/glossary display poison must not influence stable-ID resolution');

let sourceIdentityRecords=0,coreIdentityRecords=0;
const sourceCounts={},coreCounts={};
for(const book of books){
  const config=JSON.parse(read(`books/${book}/book.config.json`));
  const relative=`books/${book}/${config.sources.codexDatasheets}`;
  const current=JSON.parse(read(relative));
  const baseline=JSON.parse(execFileSync('git',['show',`HEAD:${relative}`],{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024}));
  assert.deepEqual(withoutIdentity(current),withoutIdentity(baseline),`${book}: normalized gameplay facts must be unchanged`);
  let sourceCount=0,coreCount=0;
  for(const unit of inventory(current))for(const field of ['abilities','wargearAbilities'])for(const ability of unit[field]||[]){
    if(!ability.sourceAbilityId&&!ability.coreAbilityId)continue;
    assert.ok(ability.sourceAbilityId,`${book}:${unit.id}:${field} Core identity must retain its stable source identity`);
    sourceCount++;
    if(ability.coreAbilityId){
      assert.equal(bindings.resolveRequired(ability.sourceAbilityId),ability.coreAbilityId,`${book}:${unit.id}:${field} must use the exact registry binding`);
      coreCount++;
    }
  }
  sourceCounts[book]=sourceCount;
  coreCounts[book]=coreCount;
  sourceIdentityRecords+=sourceCount;
  coreIdentityRecords+=coreCount;
}
assert.deepEqual(sourceCounts,{
  tyranids:236,
  'tau-empire':239,
  'emperors-children':102,
  'chaos-space-marines':405,
  'space-marines':85,
  'dark-angels':18,
  'blood-angels':109,
  'adeptus-mechanicus':148
});
assert.deepEqual(coreCounts,{
  tyranids:74,
  'tau-empire':79,
  'emperors-children':36,
  'chaos-space-marines':86,
  'space-marines':85,
  'dark-angels':18,
  'blood-angels':44,
  'adeptus-mechanicus':44
});
assert.equal(sourceIdentityRecords,1342);
assert.equal(coreIdentityRecords,466);

const loadWindow=relative=>{const sandbox={window:{}};vm.runInNewContext(read(relative),sandbox,{filename:relative});return sandbox.window;};
const csmDatasheets=JSON.parse(read('books/chaos-space-marines/content/chaos-space-marines-codex-datasheets.en.json'));
const csmMastersSource=inventory(csmDatasheets).find(unit=>unit.id==='unit-masters-of-the-maelstrom').abilities.find(ability=>ability.title==='Support');
const csmRoster=loadWindow('books/chaos-space-marines/scripts/roster-data.js').WH_BOOK_ROSTER_CATALOG;
const csmMastersRuntime=csmRoster.units.find(unit=>unit.id==='unit-masters-of-the-maelstrom').gameSelections.abilities.find(ability=>ability.title==='Support');
assert.equal(csmMastersRuntime.id,'chaos-space-marines-ability-support','Masters of the Maelstrom Support must remain a local Army identity');
assert.equal(csmMastersRuntime.text,csmMastersSource.text,'removing the false Core binding must not alter Masters gameplay text');
assert.notEqual(csmMastersRuntime.id,'core-support','Masters of the Maelstrom Support must not be title-bound to Core Support');

const sharedBuilder=read('books/shared/tools/build-army-book.mjs');
const amAdapter=read('books/adeptus-mechanicus/tools/canonical-source-adapter.mjs');
const renderer=read('books/shared/tools/render-structured-effective-book.mjs');
const helper=read('books/shared/tools/army-core-ability-binding.mjs');
assert.match(sharedBuilder,/canonical=ability\.coreAbilityId\|\|null/);
assert.doesNotMatch(sharedBuilder,/canonicalCoreAbilityTerms\.get\(/);
assert.match(amAdapter,/ability\.coreAbilityId\?coreTermsById\.get\(ability\.coreAbilityId\)/);
assert.doesNotMatch(amAdapter,/coreTermKeys\.get\(coreBaseKey\(ability\.title\)\)/);
assert.match(renderer,/item\.coreAbilityId/);
assert.doesNotMatch(helper,/registry\.en\.json|WH40K_GLOSSARY|glossary/i);

console.log(`Army Core ability binding QA: PASS (${bindings.bindingCount} source bindings; ${sourceIdentityRecords} source identity projections; ${coreIdentityRecords} Core identity projections; title/Core-label poison isolated; unknown/conflicting identities fail closed).`);
