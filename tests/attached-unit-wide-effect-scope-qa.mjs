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
const detach=units=>{for(const unit of units)unit.attachments={leading:[],leaders:[]};};
const project=(runtime,gameUnit,gameUnits,{detachmentId=null,enhancements=[]}={})=>{
  for(const unit of gameUnits)unit.rosterState.detachments=detachmentId?[detachmentId]:[];
  return runtime.project({gameUnit,gameUnits,byInstance:new Map(gameUnits.map(unit=>[unit.identity.instanceId,unit])),enhancements,detachments:detachmentId?[detachmentId]:[]});
};
const sourceEffects=(effects,id)=>effects.filter(effect=>effect.source?.id===id);

const am=loadBook('adeptus-mechanicus');
const destroyers=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-kataphron-destroyers',instanceId:'am-body'});
const manipulus=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-tech-priest-manipulus',instanceId:'am-leader'});
const duplicateDestroyers=createCatalogGameUnit({catalog:am.catalog,datasheetId:'unit-kataphron-destroyers',instanceId:'am-duplicate'});
const amUnits=[destroyers,manipulus,duplicateDestroyers],belicosaId='enhancement-belicosa-class-capacitor-vanes';
attach(destroyers,[manipulus]);
const belicosa=[{catalog:am.catalog.enhancements.find(item=>item.id===belicosaId),input:{ownerStatus:'resolved',ownerUnitId:'am-leader'}}];
const amOptions={detachmentId:'detachment-eradication-cohort',enhancements:belicosa};
for(const unit of [destroyers,manipulus]){
  const effects=sourceEffects(project(am.runtime,unit,amUnits,amOptions),belicosaId);
  assert.deepEqual(new Set(effects.map(effect=>`${effect.targetId}:${effect.stat}:${effect.delta}`)),new Set(['ranged:Range:6','ranged:S:1']),`${unit.identity.instanceId}: Belicosa must cover the formed Attached Unit`);
  assert.equal(effects.every(effect=>effect.source.ownerInstanceId==='am-leader'),true,`${unit.identity.instanceId}: Belicosa owner changed`);
}
assert.equal(sourceEffects(project(am.runtime,duplicateDestroyers,amUnits,amOptions),belicosaId).length,0,'Belicosa leaked to a duplicate physical Datasheet');
const lethal=project(am.runtime,destroyers,amUnits,amOptions).filter(effect=>effect.id==='galvanic-field');
assert.equal(lethal.length,1,'Manipulus Lethal Hits must remain exactly once');
assert.equal(lethal[0].source.ownerInstanceId,'am-leader');
detach(amUnits);
assert.equal(sourceEffects(project(am.runtime,destroyers,amUnits,amOptions),belicosaId).length,0,'detached Destroyers retained Belicosa');
assert.equal(sourceEffects(project(am.runtime,manipulus,amUnits,amOptions),belicosaId).length,2,'unattached Belicosa bearer lost its own unit effect');
assert.equal(sourceEffects(project(am.runtime,manipulus,amUnits,{detachmentId:'detachment-haloscreed-battle-clade',enhancements:belicosa}),belicosaId).length,0,'wrong-detachment Belicosa activated');

const sm=loadBook('space-marines');
const infiltrators=createCatalogGameUnit({catalog:sm.catalog,datasheetId:'unit-infiltrator-squad',instanceId:'sm-body'});
const librarian=createCatalogGameUnit({catalog:sm.catalog,datasheetId:'unit-librarian-in-phobos-armour',instanceId:'sm-leader'});
const secondInfiltrators=createCatalogGameUnit({catalog:sm.catalog,datasheetId:'unit-infiltrator-squad',instanceId:'sm-duplicate'});
const smUnits=[infiltrators,librarian,secondInfiltrators],helixId='unit-infiltrator-squad-wargear-ability-a3a027c4e3';
infiltrators.selection.loadout.selectedWargearAbilityIds=[helixId];
secondInfiltrators.selection.loadout.selectedWargearAbilityIds=[];
attach(infiltrators,[librarian]);
for(const unit of [infiltrators,librarian]){
  const effects=sourceEffects(project(sm.runtime,unit,smUnits),helixId);
  assert.equal(effects.length,1,`${unit.identity.instanceId}: Helix FNP missing`);
  assert.equal(effects[0].targetId,'core-feel-no-pain');
  assert.equal(effects[0].title,'Feel No Pain 6+');
  assert.equal(effects[0].source.ownerInstanceId,'sm-body','Helix ownership moved away from selected Bodyguard wargear');
}
assert.equal(sourceEffects(project(sm.runtime,secondInfiltrators,smUnits),helixId).length,0,'Helix leaked to a second Infiltrator Squad');
for(const unit of [infiltrators,librarian])assert.equal(project(sm.runtime,unit,smUnits).filter(effect=>effect.source?.id==='space-marines-ability-shrouding-psychic'&&effect.targetId==='core-stealth').length,1,`${unit.identity.instanceId}: Shrouding Stealth control`);
detach(smUnits);
assert.equal(sourceEffects(project(sm.runtime,infiltrators,smUnits),helixId).length,1,'detached Helix Bodyguard lost its own effect');
assert.equal(sourceEffects(project(sm.runtime,librarian,smUnits),helixId).length,0,'detached Librarian retained Helix');

const intercessors=createCatalogGameUnit({catalog:sm.catalog,datasheetId:'unit-intercessor-squad',instanceId:'sm-model-body'});
const captain=createCatalogGameUnit({catalog:sm.catalog,datasheetId:'unit-captain',instanceId:'sm-model-owner'});
const modelUnits=[intercessors,captain],relicShieldId='unit-captain-wargear-ability-e950f63e04';
captain.selection.loadout.selectedWargearAbilityIds=[relicShieldId];attach(intercessors,[captain]);
assert.equal(sourceEffects(project(sm.runtime,captain,modelUnits),relicShieldId).length,1,'model-only Relic Shield lost its owner effect');
assert.equal(sourceEffects(project(sm.runtime,intercessors,modelUnits),relicShieldId).length,0,'model-only Relic Shield broadened to Bodyguard');

const swordId='1st-company-task-force-the-imperiums-sword',sword=[{catalog:sm.catalog.enhancements.find(item=>item.id===swordId),input:{ownerStatus:'resolved',ownerUnitId:'sm-model-owner'}}],swordOptions={detachmentId:'1st-company-task-force',enhancements:sword};
assert.ok(sourceEffects(project(sm.runtime,captain,modelUnits,swordOptions),swordId).length,'bearer-only Enhancement lost its owner effect');
assert.equal(sourceEffects(project(sm.runtime,intercessors,modelUnits,swordOptions),swordId).length,0,'bearer-only Enhancement broadened to Bodyguard');

const dg=loadBook('death-guard');
const furnaceOwner=createCatalogGameUnit({catalog:dg.catalog,datasheetId:'unit-lord-of-contagion',instanceId:'dg-furnace-owner'});
const furnaceOther=createCatalogGameUnit({catalog:dg.catalog,datasheetId:'unit-lord-of-contagion',instanceId:'dg-furnace-other'});
const dgUnits=[furnaceOwner,furnaceOther],furnaceId='enhancement-furnace-of-plagues',furnaceRecord=dg.catalog.enhancements.find(item=>item.id===furnaceId),furnace=[{catalog:furnaceRecord,input:{ownerStatus:'resolved',ownerUnitId:'dg-furnace-owner'}}],furnaceOptions={detachmentId:furnaceRecord.detachmentId,enhancements:furnace};
assert.ok(sourceEffects(project(dg.runtime,furnaceOwner,dgUnits,furnaceOptions),furnaceId).some(effect=>effect.id==='furnace-attacks'),'DG Furnace owner control');
assert.equal(sourceEffects(project(dg.runtime,furnaceOther,dgUnits,furnaceOptions),furnaceId).length,0,'DG Furnace physical-instance isolation control');

console.log('Attached-unit-wide effect scope QA: PASS (Belicosa, Helix, isolation, detach, narrow-scope controls)');
