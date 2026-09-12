import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRosterCatalog} from '../books/shared/tools/build-roster-catalog.mjs';

const loadRuntime=file=>{const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context);return context.window;};
const clone=value=>JSON.parse(JSON.stringify(value));
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const abilityId='plaguebearers-ability-instrument-of-chaos';
const selectionId='unit-plaguebearers-selection-instrument-of-chaos';
const instrumentText='Add 1 to Charge rolls made for the bearer’s unit.';
const authored=JSON.parse(fs.readFileSync(new URL('../books/death-guard/content/death-guard-rules.en.json',import.meta.url),'utf8')),authoredUnit=authored.sections.find(item=>item.id==='unit-plaguebearers'),authoredWargear=authoredUnit?.subsections.find(item=>item.id==='plaguebearers-wargear-abilities')?.blocks.find(item=>item.id===abilityId),authoredContract=authoredUnit?.gameSelectionContracts?.find(item=>item.id===selectionId);
assert.equal(authoredWargear?.text,instrumentText);
assert.deepEqual(authoredWargear?.requiredSelections?.map(item=>item.id),[selectionId]);
assert.equal(authoredContract?.kind,'wargear');
assert.equal(authoredContract?.maxTotalQuantity,1);

const syntheticUnit={
  id:'unit-test',title:'Test Unit',abilities:[{id:'ability-banner',title:'Banner',text:'Canonical banner text.'}],
  wargearAbilities:[{id:'ability-banner',title:'Banner',text:'Canonical banner text.',requiredSelections:[{id:'selection-banner',title:'Banner'}]}]
};
const synthetic=createRosterCatalog({config:{id:'test-book',title:'Test Book'},units:[syntheticUnit]});
const syntheticGame=synthetic.units[0].gameSelections,ordinary=syntheticGame.abilities.find(item=>item.id==='ability-banner'),wargear=syntheticGame.wargearAbilities.find(item=>item.id==='ability-banner');
assert.equal(ordinary,undefined,'selection-gated ability must not be emitted as an ordinary ability');
assert.ok(wargear,'selection-gated ability remains in the Wargear Ability projection');
assert.deepEqual(Object.fromEntries(['id','sectionId','title','text','sourceUnitId'].map(field=>[field,wargear[field]])),{id:'ability-banner',sectionId:'ability-banner',title:'Banner',text:'Canonical banner text.',sourceUnitId:'unit-test'});
assert.deepEqual(wargear.requiredSelectionIds,['selection-banner']);
assert.throws(()=>createRosterCatalog({config:{id:'test-book',title:'Test Book'},units:[{...syntheticUnit,wargearAbilities:[{...syntheticUnit.wargearAbilities[0],text:'Conflicting text.'}]}]}),/conflicting canonical ability ability-banner field text/,'conflicting same-ID semantic records fail closed');

const runtime=loadRuntime('../books/shared/roster-context.js'),generated=loadRuntime('../books/death-guard/scripts/roster-data.js');
const catalog=generated.WH_BOOK_ROSTER_CATALOG;
const assertInstrument=current=>{
  const unit=current.units.find(item=>item.id==='unit-plaguebearers');
  assert.ok(unit,'Plaguebearers canonical unit exists');
  const selection=unit.gameSelections.selections.find(item=>item.id===selectionId);
  assert.equal(selection?.kind,'wargear');
  assert.equal(selection?.maxTotalQuantity,1);
  assert.deepEqual(Array.from(selection?.wargearAbilityIds||[]),[abilityId]);
  const record=unit.gameSelections.wargearAbilities.find(item=>item.id===abilityId);
  assert.equal(record?.text,instrumentText);
  assert.equal(record?.sectionId,abilityId);
  assert.equal(record?.sourceUnitId,unit.id);
  assert.deepEqual(Array.from(record?.requiredSelectionIds||[]),[selectionId]);
  const indexed=runtime.WHArmyRosterContext.indexCatalog(current);
  assert.equal(indexed.abilitiesById.get(normalize(abilityId))?.text,instrumentText,'same-ID indexing retains complete canonical text');
  assert.equal(indexed.abilitiesById.has(normalize('Instrument of Chaos')),false,'ability title is not an identity fallback');
  assert.equal(indexed.abilitiesById.has(normalize(`${abilityId}-unknown`)),false,'unknown ability ID fails closed');
};
assertInstrument(catalog);

const roster={faction:'Death Guard',units:[{id:'plaguebearers-1',canonicalUnitId:'unit-plaguebearers',name:'Plaguebearers',quantity:10,models:[{name:'Plaguebearer',quantity:1,wargear:'Instrument of Chaos'},{name:'Plaguebearer',quantity:9,wargear:'Plaguesword'}]}],detachments:[],enhancements:[]};
const provider={gameEffects({gameUnit}){if(!gameUnit.selection.loadout.selectedWargearAbilityIds.includes(abilityId))return[];return[{id:'instrument-reference',component:'ability',targetId:abilityId,operation:'reference',canonicalReference:{kind:'ability',id:abilityId},source:{kind:'selected-wargear',id:abilityId,ownerInstanceId:'plaguebearers-1'},targetInstanceId:'plaguebearers-1'}];}};
const projected=runtime.WHArmyRosterContext.project({catalog,roster,record:{id:'instrument-contract',attachments:{}},provider}),gameUnit=projected.game.units[0],reference=gameUnit.effects.find(effect=>effect.id==='instrument-reference');
assert.equal(gameUnit.selection.loadout.state,'resolved');
assert.deepEqual(Array.from(gameUnit.selection.loadout.selectedWargearAbilityIds),[abilityId]);
assert.equal(projected.game.status,'ready');
assert.equal(reference?.targetState,'resolved');
assert.equal(reference?.canonicalReference.id,abilityId);
assert.equal(reference?.canonicalReference.text,instrumentText);
const overLimit=runtime.WHArmyRosterContext.project({catalog,roster:{...roster,units:[{...roster.units[0],models:[{name:'Plaguebearer',quantity:2,wargear:'Instrument of Chaos'},{name:'Plaguebearer',quantity:8,wargear:'Plaguesword'}]}]},record:{id:'instrument-over-limit',attachments:{}},provider}),rejected=overLimit.game.units[0].selection.loadout.unresolved.find(item=>item.selectionId===selectionId);
assert.equal(overLimit.game.status,'partial');
assert.equal(rejected?.reason,'selection-quantity-exceeds-maximum');

const expectKilled=(label,mutate)=>{const changed=clone(catalog);mutate(changed);assert.throws(()=>assertInstrument(changed),undefined,`${label} must be killed`);console.log(`${label}: KILLED`);};
expectKilled('INSTRUMENT_SELECTION_REMOVAL_MUTATION',current=>{const unit=current.units.find(item=>item.id==='unit-plaguebearers');unit.gameSelections.selections=unit.gameSelections.selections.filter(item=>item.id!==selectionId);});
expectKilled('INSTRUMENT_WRONG_ABILITY_MUTATION',current=>{const unit=current.units.find(item=>item.id==='unit-plaguebearers'),selection=unit.gameSelections.selections.find(item=>item.id===selectionId);selection.wargearAbilityIds=['plaguebearers-ability-daemonic-icon'];});
expectKilled('SPARSE_OVERWRITE_MUTATION',current=>{const unit=current.units.find(item=>item.id==='unit-plaguebearers'),record=unit.gameSelections.wargearAbilities.find(item=>item.id===abilityId);unit.gameSelections.wargearAbilities[unit.gameSelections.wargearAbilities.indexOf(record)]={id:record.id,title:record.title,requiredSelectionIds:record.requiredSelectionIds};});

console.log('Wargear ability record completeness QA: PASS');
