import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createCanonicalBuildContext} from '../books/shared/tools/canonical-build-contract.mjs';
import {runPresentationHook,validateEffectiveBookModel} from '../books/shared/tools/effective-book-model.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const stable=value=>value instanceof Map?['Map',[...value].sort(([a],[b])=>a.localeCompare(b)).map(([key,item])=>[key,stable(item)])]:Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
const digest=value=>crypto.createHash('sha256').update(JSON.stringify(stable(value))).digest('hex');
const idHash=items=>crypto.createHash('sha256').update(JSON.stringify([...items].sort())).digest('hex');
const expected={
  'death-guard':{units:36,tiers:57,wargear:2,detachments:9,enhancements:30,relations:48,effects:49,profiles:36,unitHash:'ed93e400c628d783566a6344f37e881954fce3b27a5df8ef87c0da97571bb1af',detachmentHash:'95e2dec24b53131c5a3c0d1db5c2eecb7144983a42761eff82434155bac0e399',enhancementHash:'c55483300df859d31f335907e63b788b18a8825cec4478bb6b08af551932de0e'},
  'adeptus-mechanicus':{units:34,tiers:68,wargear:2,detachments:10,enhancements:34,relations:82,effects:42,profiles:34,unitHash:'312f7dc5730f3796d98065f4e477f0132bc8a42a40d0da4b5b66931aa9bbc26d',detachmentHash:'deef2e62ed5a3112f2e8a8ce8ef038e705e45335df80f7977db283660bdb854b',enhancementHash:'d423f8f7aa131788a0291aed6321f4fb75955ae98384cc0c39bb3702ca2eea16'}
};

async function construct(id){
  const configPath=path.join(root,'books',id,'book.config.json'),context=createCanonicalBuildContext({configPath,args:['--check']});
  const config=context.config,spec=config.effectiveModel;
  assert.equal(config.buildExtension,undefined,`${id}: full semantic buildExtension must be retired`);
  assert.equal(spec?.schema,'wh40k-effective-book-model/v1');
  const reads=[],original=context.readJson;context.readJson=file=>(reads.push(String(file).replaceAll('\\','/')),original(file));
  const module=await import(pathToFileURL(path.join(root,spec.sourceAdapter)).href),adapt=module[spec.sourceAdapterExport];
  assert.equal(typeof adapt,'function',`${id}: source adapter export is missing`);
  const model=validateEffectiveBookModel(await adapt(context));
  assert.equal(reads.some(file=>/(?:reader\.html|scripts\/(?:target|roster)-data\.js|mobile\/.*\.html)$/.test(file)),false,`${id}: source adapter read a generated effective output`);
  return {config,model,reads};
}

const first={};
for(const id of Object.keys(expected)){
  const {config,model}=await construct(id),want=expected[id];first[id]=model;
  const relations=[...model.relationGraphs.values()].reduce((sum,graph)=>sum+Object.values(graph).reduce((n,items)=>n+(Array.isArray(items)?items.length:0),0),0);
  assert.deepEqual({units:model.units.length,tiers:model.units.reduce((n,item)=>n+item.points.length,0),wargear:model.units.reduce((n,item)=>n+(item.paidWargear||[]).length,0),detachments:model.detachments.length,enhancements:model.enhancements.length,relations,effects:model.effectContracts.length,profiles:model.ruleProfiles?.size||model.units.filter(item=>item.ruleProfile).length},{units:want.units,tiers:want.tiers,wargear:want.wargear,detachments:want.detachments,enhancements:want.enhancements,relations:want.relations,effects:want.effects,profiles:want.profiles});
  assert.equal(idHash(model.units.map(item=>item.id)),want.unitHash);
  assert.equal(idHash(model.detachments.map(item=>item.id)),want.detachmentHash);
  assert.equal(idHash(model.enhancements.map(item=>item.id)),want.enhancementHash);
  assert.equal(config.generatedOutputs.filter(item=>item.lifecycle==='NORMAL_BUILD_OUTPUT').every(item=>item.producer==='books/shared/tools/build-army-book.mjs'||item.class==='MOBILE_COMPATIBILITY_ROUTES'||item.class==='COMPATIBLE_RULES_MATRIX'),true);
}

const duplicate=structuredClone(first['death-guard']);duplicate.units.push(structuredClone(duplicate.units[0]));assert.throws(()=>validateEffectiveBookModel(duplicate),/duplicate death-guard unit identity/);
const unknownRelation=structuredClone(first['adeptus-mechanicus']);unknownRelation.relationGraphs.get(unknownRelation.units[0].id).canLead=[{unitId:'unit-unknown-effective-target'}];assert.throws(()=>validateEffectiveBookModel(unknownRelation),/unknown relation target/);
const substituted=structuredClone(first['death-guard']);substituted.units[0].id='unit-count-preserving-substitution';assert.throws(()=>validateEffectiveBookModel(substituted),/(conflicting unit partitions|canonical rule profile)/);
await assert.rejects(()=>runPresentationHook(first['death-guard'],model=>{model.relationGraphs.set('unit-poison',{});return{};}),/semantic mutation/);

const secondAm=(await construct('adeptus-mechanicus')).model,secondDg=(await construct('death-guard')).model;
assert.equal(digest(secondAm),digest(first['adeptus-mechanicus']),'adapter construction order changed AM');
assert.equal(digest(secondDg),digest(first['death-guard']),'adapter construction order changed DG');

const sharedBuilder=fs.readFileSync(path.join(root,'books/shared/tools/build-army-book.mjs'),'utf8');
assert.match(sharedBuilder,/createEffectiveBookModel\(/,'shared seven-book path must validate the same effective model contract');
const dgRenderer=fs.readFileSync(path.join(root,'books/death-guard/tools/presentation-hook.mjs'),'utf8');
assert.doesNotMatch(dgRenderer,/export\s+(?:async\s+)?function\s+buildCanonicalBook/,'DG presentation hook must not own full semantic assembly');
const amRenderer=fs.readFileSync(path.join(root,'books/shared/tools/render-structured-effective-book.mjs'),'utf8');
assert.doesNotMatch(amRenderer,/createAdeptusMechanicusCanonicalModel|buildAdeptusMechanicusEffectiveModelInput/,'shared structured renderer must consume the effective model');

console.log('Effective model convergence QA: PASS (DG/AM shared schema, frozen inventories, generated-output independence, fail-closed mutations, presentation isolation, construction-order independence).');
