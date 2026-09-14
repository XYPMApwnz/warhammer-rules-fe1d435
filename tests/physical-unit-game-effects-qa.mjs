import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createCatalogGameUnit} from './helpers/roster-fixtures.mjs';

const loadBook=bookId=>{
  const scope={console};scope.window=scope;scope.globalThis=scope;
  for(const file of [`../books/${bookId}/scripts/roster-data.js`,'../books/shared/effect-contract-runtime.js']){
    vm.runInNewContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),scope,{filename:file});
  }
  return {catalog:scope.WH_BOOK_ROSTER_CATALOG,runtime:scope.WHEffectContractRuntime};
};
const attach=(bodyguard,leaders)=>{
  bodyguard.attachments.leaders=leaders.map(unit=>({instanceId:unit.identity.instanceId,certainty:'current',provenance:{kind:'explicit-roster-attachment'}}));
  for(const leader of leaders)leader.attachments.leading=[{instanceId:bodyguard.identity.instanceId,certainty:'current',provenance:{kind:'explicit-roster-attachment'}}];
};
const project=(runtime,gameUnit,gameUnits,detachmentId)=>runtime.project({
  gameUnit,gameUnits,byInstance:new Map(gameUnits.map(unit=>[unit.identity.instanceId,unit])),enhancements:[],detachments:detachmentId?[detachmentId]:[],
});

const dg=loadBook('death-guard'),poxwalkers=createCatalogGameUnit({catalog:dg.catalog,datasheetId:'unit-poxwalkers',instanceId:'dg-body'}),iconA=createCatalogGameUnit({catalog:dg.catalog,datasheetId:'unit-icon-bearer',instanceId:'dg-leader-a'}),iconB=createCatalogGameUnit({catalog:dg.catalog,datasheetId:'unit-icon-bearer',instanceId:'dg-leader-b'}),dgUnits=[poxwalkers,iconA,iconB];
attach(poxwalkers,[iconB]);
const dgEffects=project(dg.runtime,poxwalkers,dgUnits,'detachment-shamblerot-vectorium');
assert.ok(dgEffects.some(effect=>effect.targetId==='BATTLELINE'&&effect.source.id==='detachment-shamblerot-vectorium'));
assert.ok(dgEffects.some(effect=>effect.targetId==='OC'&&effect.source.ownerInstanceId==='dg-leader-b'));
assert.equal(dgEffects.some(effect=>effect.source.ownerInstanceId==='dg-leader-a'),false,'duplicate physical Icon Bearer leaked into the attached unit');

const am=loadBook('adeptus-mechanicus'),rangers=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-skitarii-rangers',instanceId:'am-body'}),manipulusA=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-tech-priest-manipulus',instanceId:'am-leader-a'}),manipulusB=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-tech-priest-manipulus',instanceId:'am-leader-b'}),amUnits=[rangers,manipulusA,manipulusB];
attach(rangers,[manipulusB]);
const amEffects=project(am.runtime,rangers,amUnits,'detachment-cohort-acquisitus');
assert.ok(amEffects.some(effect=>effect.targetId==='RECON AUGURY'&&effect.source.id==='detachment-cohort-acquisitus'));
assert.ok(amEffects.some(effect=>effect.id==='galvanic-field'&&effect.source.ownerInstanceId==='am-leader-b'));
assert.equal(amEffects.some(effect=>effect.source.ownerInstanceId==='am-leader-a'),false,'duplicate physical Manipulus leaked into the attached unit');
for(const unit of amUnits)unit.attachments={leading:[],leaders:[]};
assert.equal(project(am.runtime,rangers,amUnits,'detachment-cohort-acquisitus').some(effect=>effect.id==='galvanic-field'),false,'potential attachment activated a current effect');

const runtimeSource=fs.readFileSync(new URL('../books/shared/effect-contract-runtime.js',import.meta.url),'utf8'),dgSource=fs.readFileSync(new URL('../books/death-guard/scripts/roster-semantics.js',import.meta.url),'utf8'),amSource=fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-enhancements.js',import.meta.url),'utf8');
assert.match(runtimeSource,/function project\(context\)/,'shared effect interpreter is absent');
for(const source of [dgSource,amSource])assert.doesNotMatch(source,/detachment-shamblerot-vectorium|datasheet-galvanic-field|\bCHARACTERISTIC_ADD\b|\bKEYWORD_GRANT\b/,'book-local compatibility helper retains factual effect data');
console.log('Physical-unit DG/AM canonical effect-contract QA: PASS');
