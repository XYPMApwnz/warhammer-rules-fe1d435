import assert from 'node:assert/strict';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const defaultModule=new URL('../books/shared/tools/build-relation-graph.mjs',import.meta.url);
const moduleUrl=process.env.R3A_GRAPH_MODULE?pathToFileURL(path.resolve(process.env.R3A_GRAPH_MODULE)):defaultModule;
const {buildRelationGraphs}=await import(`${moduleUrl.href}?r3a-qa=${Date.now()}`);

const unit=(id,title,keywords=[])=>({id,title,keywords});
const inheritedLeader=unit('unit-synthetic-leader','Synthetic Leader',['CHARACTER']);
const inheritedSupport=unit('unit-synthetic-support','Synthetic Support',['CHARACTER']);
const inheritedBodyguard=unit('unit-inherited-bodyguard','Inherited Bodyguard',['INFANTRY']);
const localBodyguard=unit('unit-local-bodyguard','Local Bodyguard',['INFANTRY']);
const localCharacter=unit('unit-local-character','Local Character',['CHARACTER']);
const inheritedUnits=[inheritedLeader,inheritedSupport,inheritedBodyguard];
const effectiveUnits=[...inheritedUnits,localBodyguard,localCharacter];

const build=(adds,edges=[],options={})=>buildRelationGraphs(options.effectiveUnits||effectiveUnits,edges,{
  bookId:'synthetic-dependency-book',
  inheritedUnits:options.inheritedUnits||inheritedUnits,
  effectiveUnits:options.effectiveUnits||effectiveUnits,
  adds
});
const relationIds=(graphs,unitId,key)=>graphs.get(unitId)[key].map(item=>item.unitId);

const adds=[
  {sourceId:inheritedLeader.id,role:'leader',targetId:inheritedBodyguard.id},
  {sourceId:inheritedSupport.id,role:'support',targetId:localBodyguard.id}
];
const graphs=build(adds);
assert.deepEqual(relationIds(graphs,inheritedLeader.id,'canLead'),[inheritedBodyguard.id],'leader ADD direct edge');
assert.deepEqual(relationIds(graphs,inheritedBodyguard.id,'canBeLedBy'),[inheritedLeader.id],'leader ADD inverse edge');
assert.deepEqual(relationIds(graphs,inheritedSupport.id,'canSupport'),[localBodyguard.id],'support ADD direct edge');
assert.deepEqual(relationIds(graphs,localBodyguard.id,'canBeSupportedBy'),[inheritedSupport.id],'support ADD inverse edge');
assert.deepEqual(relationIds(graphs,inheritedSupport.id,'canLead'),[],'support ADD must not become leader');
assert.deepEqual(relationIds(graphs,localBodyguard.id,'canBeLedBy'),[],'support inverse must not become leader inverse');

const withoutOverlay=buildRelationGraphs(effectiveUnits,[]);
const emptyOverlay=build([]);
assert.deepEqual(emptyOverlay,withoutOverlay,'empty dependency relation overlay must be output-neutral');

assert.throws(()=>build([{sourceId:'unit-missing',role:'leader',targetId:localBodyguard.id}]),/not provided by a declared dependency/,'unknown dependency source');
assert.throws(()=>build([{sourceId:localCharacter.id,role:'leader',targetId:localBodyguard.id}]),/not provided by a declared dependency/,'local source must not masquerade as inherited');
assert.throws(()=>build([{sourceId:inheritedLeader.id,role:'leader',targetId:'unit-missing'}]),/not in the final effective inventory/,'unknown effective target');
assert.throws(()=>build([{sourceId:inheritedLeader.id,role:'LEADER',targetId:localBodyguard.id}]),/unsupported relation role/,'relation kind is exact');
assert.throws(()=>build([{sourceId:inheritedLeader.id,role:'replace',targetId:localBodyguard.id}]),/unsupported relation role/,'unknown relation kind');
assert.throws(()=>build([{sourceId:inheritedLeader.id,role:'leader',targetId:localBodyguard.id,operation:'REMOVE'}]),/implicit ADD/,'explicit operations are rejected');
assert.throws(()=>build([
  {sourceId:inheritedLeader.id,role:'leader',targetId:localBodyguard.id},
  {sourceId:inheritedLeader.id,role:'leader',targetId:localBodyguard.id}
]),/duplicates another dependency relation ADD/,'duplicate overlay record');
assert.throws(()=>build(
  [{sourceId:inheritedLeader.id,role:'leader',targetId:inheritedBodyguard.id}],
  [{sourceId:inheritedLeader.id,role:'leader',targetId:inheritedBodyguard.id}]
),/duplicates an existing direct relation/,'duplicate inherited/base relation');
assert.throws(()=>build([{sourceTitle:inheritedLeader.title,role:'leader',targetId:localBodyguard.id}]),/stable sourceId/,'title-only source cannot resolve');
assert.throws(()=>build([{sourceId:inheritedLeader.id,role:'leader',targetTitle:localBodyguard.title}]),/stable targetId/,'title-only target cannot resolve');
assert.throws(()=>build(
  [{sourceId:inheritedLeader.id,role:'leader',targetId:localBodyguard.id}],[],
  {inheritedUnits:[...inheritedUnits,{...inheritedLeader}]}
),/ambiguous across declared dependencies/,'ambiguous inherited source');
assert.throws(()=>build(
  [{sourceId:inheritedLeader.id,role:'leader',targetId:localBodyguard.id}],[],
  {effectiveUnits:[...effectiveUnits,{...localBodyguard}]}
),/ambiguous in the final effective inventory/,'ambiguous effective target');

console.log('Dependency relation ADD overlay QA passed: stable IDs, exact dependency/effective resolution, direct/inverse graph order and fail-closed validation.');
