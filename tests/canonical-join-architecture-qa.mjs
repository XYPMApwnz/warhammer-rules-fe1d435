import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {
  assignCanonicalChildIdentities,
  bindRowsToCanonicalIds,
  canonicalTargetsFromProse,
  canonicalizeRelationTargets,
  indexCanonicalById,
  mergeCanonicalById,
  resolveDeclaredLegacyAlias,
  resolvePointEnhancement,
  resolveScopedEnhancement
} from '../books/shared/tools/canonical-join-contract.mjs';
import {buildCompatibleRules as buildCsmCompatibleRules,inputs as csmCompatibleInputs} from '../books/chaos-space-marines/tools/build-compatible-rules.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const roster=id=>{const sandbox={window:{}};vm.runInNewContext(read(`books/${id}/scripts/roster-data.js`),sandbox);return sandbox.window.WH_BOOK_ROSTER_CATALOG;};
const throws=(fn,pattern)=>assert.throws(fn,pattern);

const owners=[{id:'unit-alpha',title:'Alpha'},{id:'unit-beta',title:'Beta'}];
assert.deepEqual([...indexCanonicalById(owners).keys()],['unit-alpha','unit-beta']);
throws(()=>indexCanonicalById([...owners,{id:'unit-alpha',title:'Other'}]),/duplicate/);
const renamed=bindRowsToCanonicalIds([{id:'unit-alpha',title:'Alpha'}],owners,{label:'rename control'});
assert.equal(renamed[0].canonicalId,'unit-alpha');
throws(()=>bindRowsToCanonicalIds([{title:'Same'}],[{id:'unit-a',title:'Same'},{id:'unit-b',title:'Same'}]),/exactly once/);
throws(()=>bindRowsToCanonicalIds([{title:'A-B'}],[{id:'unit-a',title:'A B'},{id:'unit-b',title:'A-B'}]),/exactly once/);

const enhancements=[
  {id:'enhancement-shared',detachmentId:'detachment-a'},
  {id:'enhancement-shared',detachmentId:'detachment-b'}
];
assert.equal(resolveScopedEnhancement({enhancementId:'enhancement-shared',detachmentId:'detachment-a'},enhancements).detachmentId,'detachment-a');
throws(()=>resolveScopedEnhancement({enhancementId:'enhancement-shared',detachmentId:'detachment-c'},enhancements),/exactly once/);
throws(()=>resolveScopedEnhancement({enhancementId:'enhancement-unknown',detachmentId:'detachment-a'},enhancements),/exactly once/);
const pointRecords=[{id:'enhancement-power',detachmentId:'detachment-a',title:'Original title'}];
assert.equal(resolvePointEnhancement({id:'detachment-a-power',title:'Renamed title'},'detachment-a',pointRecords).id,'enhancement-power');
assert.equal(resolvePointEnhancement({id:'legacy-power'},'detachment-a',pointRecords,{aliases:{'detachment-a|legacy-power':'enhancement-power'}}).id,'enhancement-power');
assert.equal(resolvePointEnhancement({id:'unknown',title:'Original title'},'detachment-a',pointRecords),null);
throws(()=>resolvePointEnhancement({id:'legacy-power'},'detachment-b',pointRecords,{aliases:{'detachment-b|legacy-power':'enhancement-power'}}),/targets no exact point record/);
throws(()=>resolvePointEnhancement({id:'detachment-a-power'},'detachment-a',[...pointRecords,{id:'power',detachmentId:'detachment-a'}]),/at most once/);
assert.equal(resolveDeclaredLegacyAlias('old',[{canonicalId:'new',aliases:['old']}]),'new');
throws(()=>resolveDeclaredLegacyAlias('old',[{canonicalId:'a',aliases:['old']},{canonicalId:'b',aliases:['old']}]),/exactly once/);

const relationUnits=[{id:'unit-leader',title:'Leader',relations:{leader:[{targetId:'unit-target'}]}},{id:'unit-target',title:'Original target'}];
assert.deepEqual(canonicalizeRelationTargets(relationUnits,{bookId:'qa'}),[{role:'leader',sourceId:'unit-leader',targetId:'unit-target'}]);
const targetRenamed=structuredClone(relationUnits);targetRenamed[1].title='Renamed target';
assert.deepEqual(canonicalizeRelationTargets(targetRenamed,{bookId:'qa'}),[{role:'leader',sourceId:'unit-leader',targetId:'unit-target'}]);
throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:['Same']}},{id:'unit-a',title:'Same'},{id:'unit-b',title:'Same'}],{bookId:'qa'}),/requires an explicit canonical ID/);
throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:[{targetId:'unit-missing'}]}}],{bookId:'qa'}),/unknown/);
throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:[{targetId:'unit-target'},{targetId:'unit-target'}]}},{id:'unit-target',title:'Target'}],{bookId:'qa'}),/duplicate leader relation/);
assert.deepEqual(canonicalTargetsFromProse('May join Foetid Bloat-drone with Heavy Blight Launcher.',[
  {id:'unit-short',title:'Foetid Bloat-drone'},
  {id:'unit-long',title:'Foetid Bloat-drone with Heavy Blight Launcher'}
],{sourceId:'unit-leader'}),['unit-long']);

assert.deepEqual(mergeCanonicalById([{id:'unit-shared',source:'parent'}],[{id:'unit-shared',source:'local'}],{onConflict:'prefer-overlay'}),[{id:'unit-shared',source:'local'}]);
throws(()=>mergeCanonicalById([{id:'unit-shared'}],[{id:'unit-shared'}]),/collision/);

const parent={id:'unit-parent'},children=[{name:'Same',value:1},{name:'Same',value:2}];
const first=assignCanonicalChildIdentities(parent,children,{kind:'profile',semanticOf:item=>item});
const reordered=assignCanonicalChildIdentities(parent,[...children].reverse(),{kind:'profile',semanticOf:item=>item});
assert.deepEqual(first.map(item=>item.id).sort(),reordered.map(item=>item.id).sort());
throws(()=>assignCanonicalChildIdentities(parent,[children[0],structuredClone(children[0])],{kind:'profile',semanticOf:item=>item}),/duplicate/);

for(const id of ['death-guard','adeptus-mechanicus']){
  const source=read(`books/${id}/tools/canonical-source-adapter.mjs`);
  assert.match(source,/canonicalJoinContract:'v1'/);
  assert.doesNotMatch(source,/includes\(bodyguard\.title\.toLowerCase\(\)\)/);
  const catalog=roster(id),keys=[];
  for(const unit of catalog.units)for(const [role,relations] of Object.entries(unit.ruleProfile?.relations||{}))for(const relation of relations)keys.push(`${unit.id}\0${role}\0${relation.id}`);
  assert.equal(keys.length,new Set(keys).size,`${id}: canonical relation graph must not contain duplicate edges`);
}

for(const fixture of [
  ['chaos-space-marines','enhancement-dread-talons-warp-fuelled-thrusters','dread-talons'],
  ['chaos-space-marines','enhancement-nightmare-hunt-warp-fuelled-thrusters','nightmare-hunt'],
  ['dark-angels','enhancement-inner-circle-task-force-deathwing-assault','inner-circle-task-force'],
  ['dark-angels','deathwing-assault','wrath-of-the-rock']
]){
  const [bookId,enhancementId,detachmentId]=fixture,catalog=roster(bookId);
  assert.equal(resolveScopedEnhancement({enhancementId,detachmentId},catalog.enhancements).detachmentId,detachmentId);
}

const sharedBuilder=read('books/shared/tools/build-army-book.mjs'),ecConfig=JSON.parse(read('books/emperors-children/book.config.json'));
assert.doesNotMatch(sharedBuilder,/enhancementOwnerRecords\.filter\([^\n]*titleKey/);
assert.doesNotMatch(sharedBuilder,/pointTitleKey\(record\.title\).*pointTitleKey\((?:item|enhancement)\.title\)/);
assert.equal(Object.keys(ecConfig.enhancementOwnerAliases||{}).length,10);

const csmInputs=csmCompatibleInputs();
assert.doesNotThrow(()=>buildCsmCompatibleRules(csmInputs));
const unknownCompatibleOwner=structuredClone(csmInputs);unknownCompatibleOwner.pack.detachments[0].enhancements[0].id='unknown-enhancement-owner';
throws(()=>buildCsmCompatibleRules(unknownCompatibleOwner),/Missing Enhancement contract|Missing or ambiguous detachment-qualified Enhancement identity/);
const ambiguousAlias=structuredClone(csmInputs),aliasKey='cabal-of-chaos|touched-by-the-warp';
ambiguousAlias.config.compatibleRulesEnhancementAliases[aliasKey]='enhancement-conduit-of-chaos';
throws(()=>buildCsmCompatibleRules(ambiguousAlias),/ambiguous detachment-qualified Enhancement identity/);

console.log('Canonical join architecture QA passed: exact IDs, scoped Enhancements, collision rejection, prose canonicalization, child stability and DG/AM relation graphs.');
