import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {applyCanonicalChildIdentityContracts,validateEffectContractSet,validateEffectContractsAgainstCatalog} from '../books/shared/tools/effect-contract.mjs';

const root=path.resolve(import.meta.dirname,'..');
const clone=value=>structuredClone(value);
const emptySet=childIdentities=>({schema:'wh40k-effect-contracts/v1',bookId:'tau-empire',childIdentities,contracts:[]});
const shieldBinding={
  parentUnitId:'unit-cadre-fireblade',kind:'wargear-ability',sourceChildId:'274d-797e-a00f-62',
  canonicalId:'unit-cadre-fireblade-wargear-ability-bc6aabc321',
  legacyIds:['unit-cadre-fireblade-wargear-ability-shield-drone-2'],
  semanticFamilyIds:['tau-empire-equipment-family-shield-drone']
};
const sourceUnit=(title='Shield Drone',text='Add 1 to the bearer’s Wounds characteristic.')=>({
  id:'unit-cadre-fireblade',weapons:[],wargearAbilities:[{sourceChildId:'274d-797e-a00f-62',title,text}]
});
const bind=units=>applyCanonicalChildIdentityContracts(units,[emptySet([shieldBinding])]);

const original=bind([sourceUnit()]);
const renamed=bind([sourceUnit('Independent Renamed Drone')]);
const reworded=bind([sourceUnit('Shield Drone','Equivalent reviewed wording that does not own identity.')]);
const reordered=bind([{...sourceUnit(),wargearAbilities:[{sourceChildId:'unrelated-source-child',title:'Shield Drone',text:'Unrelated child.'},...sourceUnit().wargearAbilities]}]);
for(const result of [original,renamed,reworded,reordered])assert.equal(result[0].wargearAbilities.find(item=>item.sourceChildId===shieldBinding.sourceChildId).id,shieldBinding.canonicalId,'source-owned child identity must survive label, text and position changes');
assert.notEqual(reordered[0].wargearAbilities[0].id,shieldBinding.canonicalId,'a different child with the Shield Drone title must not acquire the accepted identity');
assert.deepEqual(bind([sourceUnit()]),bind([sourceUnit()]),'persistent child projection must be deterministic');
assert.throws(()=>applyCanonicalChildIdentityContracts([{id:'unit-cadre-fireblade',weapons:[],wargearAbilities:[]}],[emptySet([shieldBinding])]),/must resolve exactly once/,'missing accepted child source identity fails closed');
assert.throws(()=>validateEffectContractSet(emptySet([shieldBinding,{...shieldBinding,sourceChildId:'other-source'}])),/duplicate child canonical identity/,'duplicate child canonical identity fails closed');

const books=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
let examined=0,migrated=0;
for(const book of books){
  const config=JSON.parse(fs.readFileSync(path.join(root,'books',book,'book.config.json'),'utf8'));
  const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','roster-data.js'),'utf8'),sandbox);
  const catalog=sandbox.window.WH_BOOK_ROSTER_CATALOG,set=config.sources.effectContracts?JSON.parse(fs.readFileSync(path.join(root,'books',book,config.sources.effectContracts),'utf8')):emptySet([]);
  validateEffectContractsAgainstCatalog(set,catalog);
  migrated+=(set.childIdentities||[]).length;
  for(const unit of catalog.units||[])examined+=(unit.gameSelections?.weaponProfiles||[]).length+(unit.gameSelections?.wargearAbilities||[]).length+(unit.gameSelections?.abilities||[]).length+(unit.gameSelections?.models||[]).length;
}
assert.equal(migrated,98,'all correctness-sensitive source child identities must be contract-owned');

const tauSet=JSON.parse(fs.readFileSync(path.join(root,'books/tau-empire/sources/tau-empire-effect-contracts.v1.json'),'utf8'));
const tauSandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'books/tau-empire/scripts/roster-data.js'),'utf8'),tauSandbox);
const tauCatalog=tauSandbox.window.WH_BOOK_ROSTER_CATALOG;
const fireblade=tauCatalog.units.find(unit=>unit.id==='unit-cadre-fireblade'),shield=fireblade.gameSelections.wargearAbilities.find(item=>item.id===shieldBinding.canonicalId);
assert.ok(shield,'Cadre Fireblade Shield Drone must retain its accepted canonical child ID');
assert.ok(tauCatalog.effectContracts.some(contract=>(contract.selector?.selectedWargearAbilityIds||[]).includes(shield.id)),'the selected-wargear effect must reference the persistent Shield Drone ID');

const minimalCatalog={book:{id:'tau-empire'},units:[
  {id:'unit-a',gameSelections:{abilities:[],wargearAbilities:[{id:'unit-a-wargear-ability-one',sourceUnitId:'unit-a'}],weaponProfiles:[]}},
  {id:'unit-b',gameSelections:{abilities:[],wargearAbilities:[{id:'unit-b-wargear-ability-two',sourceUnitId:'unit-b'}],weaponProfiles:[]}}
],enhancements:[],detachments:[],detachmentRules:[]};
const minimalContract={canonicalRecordId:'source-selected-wargear',sourceKind:'selected-wargear',sourceBookId:'tau-empire',effectiveBookIds:['tau-empire'],sourceUnitId:'unit-a',scope:'selected-wargear',selector:{sourceUnitIds:['unit-a'],selectedWargearAbilityIds:['unit-a-wargear-ability-one']},clauses:[{selector:{},conditions:[],operations:[{id:'test-operation',type:'ABILITY_GRANT',canonicalTarget:'core-test',parameters:{title:'Test'}}]}],timingState:'roster-projection',stackingPolicy:'deduplicate-by-effect-id',source:{sourceId:'test-source',locator:'test#selected-wargear'},confidence:'SOURCE_LIMITED'};
const minimalSet={...emptySet([]),contracts:[minimalContract]};
validateEffectContractsAgainstCatalog(minimalSet,minimalCatalog);
const unknown=clone(minimalSet);unknown.contracts[0].selector.selectedWargearAbilityIds[0]='unit-a-wargear-ability-unknown';
assert.throws(()=>validateEffectContractsAgainstCatalog(unknown,minimalCatalog),/unknown wargear-ability reference/,'unknown selected-wargear child reference fails closed');
const wrongParent=clone(minimalSet);wrongParent.contracts[0].selector.selectedWargearAbilityIds[0]='unit-b-wargear-ability-two';
assert.throws(()=>validateEffectContractsAgainstCatalog(wrongParent,minimalCatalog),/belongs to wrong parent/,'wrong-parent child reference fails closed');
const substituted=clone(minimalCatalog);substituted.units[0].gameSelections.wargearAbilities[0].id='unit-a-wargear-ability-substituted';
assert.throws(()=>validateEffectContractsAgainstCatalog(minimalSet,substituted),/unknown wargear-ability reference/,'count-preserving child identity substitution fails closed');

console.log(`Persistent child identity QA passed: ${examined} child records examined, ${migrated} effect-addressed identities source-bound, Shield Drone rename/text/reorder stable, false-title isolated, invalid references rejected.`);
