import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {launchChromium} from './helpers/browser-launch.mjs';
import {buildCanonicalBook} from '../books/shared/tools/build-army-book.mjs';
import {createCanonicalBuildContext} from '../books/shared/tools/canonical-build-contract.mjs';
import {canonicalWeaponProfileId} from '../books/shared/tools/build-roster-catalog.mjs';
import {validateEffectContractsAgainstCatalog} from '../books/shared/tools/effect-contract.mjs';
import {validateEffectiveBookModel} from '../books/shared/tools/effective-book-model.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const clone=value=>structuredClone(value);
const profileRecords=unit=>unit.weapons?.length?unit.weapons:(unit.blocks||[]).filter(block=>block?.type==='weapon');
const bookIds=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];

const models=new Map();
for(const bookId of bookIds){
  const context=createCanonicalBuildContext({configPath:path.join(root,'books',bookId,'book.config.json'),args:['--check'],repo:root});
  const {effectiveBookModel}=await buildCanonicalBook(context,{projectionOnly:true});
  models.set(bookId,effectiveBookModel);
  for(const unit of effectiveBookModel.units){
    const ids=profileRecords(unit).map(profile=>canonicalWeaponProfileId(unit,profile));
    assert.equal(new Set(ids).size,ids.length,`${bookId}/${unit.id}: duplicate pre-model weapon profile ID`);
  }
}
const profileCount=[...models.values()].reduce((sum,model)=>sum+model.units.reduce((bookSum,unit)=>bookSum+profileRecords(unit).length,0),0);
assert.equal(profileCount,2713,'all runtime-addressed weapon profiles must be owned before effective-model validation');

const tau=models.get('tau-empire'),fireblade=tau.units.find(unit=>unit.id==='unit-cadre-fireblade');
assert.ok(fireblade,'T’au Cadre Fireblade effective record');
const pulse=profileRecords(fireblade).find(profile=>profile.name.toLowerCase()==='fireblade pulse rifle');
assert.equal(pulse.id,'unit-cadre-fireblade-profile-a051b421bc','accepted pulse-rifle profile identity');
const rosterFireblade=tau.rosterCatalog.units.find(unit=>unit.id===fireblade.id),rosterPulse=rosterFireblade.gameSelections.weaponProfiles.find(profile=>profile.id===pulse.id);
assert.ok(rosterPulse,'roster and effective profile identities agree');
assert.equal(canonicalWeaponProfileId(fireblade,{...pulse,name:'Independent renamed rifle'}),pulse.id,'display title changed canonical profile identity');
assert.equal(canonicalWeaponProfileId(fireblade,{...pulse,abilities:'Equivalent reworded profile annotation'}),pulse.id,'profile text changed canonical profile identity');
const reordered={...fireblade,weapons:[...fireblade.weapons].reverse()};
assert.equal(canonicalWeaponProfileId(reordered,reordered.weapons.find(profile=>profile.id===pulse.id)),pulse.id,'profile position changed canonical identity');
const other=fireblade.weapons.find(profile=>profile.id!==pulse.id);
assert.ok(other,'pulse-rifle false-title control profile');
assert.equal(canonicalWeaponProfileId(fireblade,{...other,name:pulse.name}),other.id,'false matching title acquired pulse-rifle identity');
assert.throws(()=>canonicalWeaponProfileId(fireblade,{...pulse,id:null}),/no pre-model canonical ID/,'missing profile ID did not fail closed');
assert.throws(()=>canonicalWeaponProfileId({id:'unit-wrong-parent'},pulse),/wrong parent/,'wrong parent profile did not fail closed');

const duplicate=clone(tau),duplicateUnit=duplicate.units.find(unit=>unit.id===fireblade.id),duplicateProfiles=profileRecords(duplicateUnit);
duplicateProfiles[1].id=duplicateProfiles[0].id;
assert.throws(()=>validateEffectiveBookModel(duplicate),/duplicate .*weapon profile identity/,'duplicate profile ID did not fail');
const substituted=clone(tau),substitutedUnit=substituted.units.find(unit=>unit.id===fireblade.id),substitutedPulse=profileRecords(substitutedUnit).find(profile=>profile.id===pulse.id);
substitutedPulse.id=`${pulse.id}-substituted`;
assert.throws(()=>validateEffectiveBookModel(substituted),/conflicting .*weapon profile partitions/,'count-preserving profile substitution did not fail');

const contextScope={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'books/shared/roster-context.js'),'utf8'),contextScope,{filename:'roster-context.js'});
const rosterApi=contextScope.window.WHArmyRosterContext;
const ability=(id,title,text='visible text')=>({id,title,text,sourceUnitId:'unit-collision'});
const baseCatalogAbilities=[ability('chaos-space-marines-ability-chance-for-glory','Chance for Glory'),ability('chaos-space-marines-ability-dark-pacts','Dark Pacts')];
const abilityCatalog=abilities=>({schema:rosterApi.CATALOG_SCHEMA,book:{id:'fixture',title:'Fixture',factionKeyword:'FIXTURE',dependencies:[]},units:[{id:'unit-collision',title:'Collision Unit',sourceBookId:'fixture',intrinsicKeywords:[],relations:{},gameSelections:{stats:{},abilities,wargearAbilities:[],models:[],selections:[],weaponProfiles:[]}}],detachments:[],enhancements:[]});
const removeEffect=targetId=>({id:'remove-dark-pacts',component:'ability',operation:'remove',targetId,title:'Dark Pacts',state:'active',certainty:'current'});
const projectAbilities=(abilities,targetId='chaos-space-marines-ability-dark-pacts')=>rosterApi.project({catalog:abilityCatalog(abilities),roster:{faction:'FIXTURE',detachments:[],enhancements:[],units:[{id:'physical-1',canonicalUnitId:'unit-collision'}]},provider:{gameEffects:()=>[removeEffect(targetId)]},record:{id:'fixture'}}).game.units[0];
const realCollision=projectAbilities([{...baseCatalogAbilities[0],title:'Dark Pacts'},baseCatalogAbilities[1]]);
assert.deepEqual(Array.from(realCollision.effective.abilities,item=>item.id),['chaos-space-marines-ability-chance-for-glory'],'real target collision removed the unrelated ability');
const missingCollision=projectAbilities([{...baseCatalogAbilities[0],title:'Dark Pacts'}]);
assert.deepEqual(Array.from(missingCollision.effective.abilities,item=>item.id),['chaos-space-marines-ability-chance-for-glory'],'missing target collision removed an unrelated ability');
assert.equal(missingCollision.effects[0].targetState,'unresolved','missing exact ability target must remain unresolved');
const textCollision=projectAbilities([{...baseCatalogAbilities[0],text:baseCatalogAbilities[1].text},baseCatalogAbilities[1]]);
assert.deepEqual(Array.from(textCollision.effective.abilities,item=>item.id),['chaos-space-marines-ability-chance-for-glory'],'visible text authorized removal');
const renamedTarget=projectAbilities([baseCatalogAbilities[0],{...baseCatalogAbilities[1],title:'Independent renamed target',text:'Reworded target text'}]);
assert.deepEqual(Array.from(renamedTarget.effective.abilities,item=>item.id),['chaos-space-marines-ability-chance-for-glory'],'canonical target rename changed removal behavior');
const wrongTarget=projectAbilities(baseCatalogAbilities,'unknown-canonical-ability');
assert.equal(wrongTarget.effects[0].targetState,'unresolved','wrong canonical ability target did not fail closed');
assert.deepEqual(Array.from(wrongTarget.effective.abilities,item=>item.id),baseCatalogAbilities.map(item=>item.id),'wrong canonical target removed an ability');
assert.throws(()=>projectAbilities([baseCatalogAbilities[0],{...baseCatalogAbilities[0]}]),/duplicate canonical ability ID/,'duplicate canonical ability ID did not fail');
const csmConfig=JSON.parse(fs.readFileSync(path.join(root,'books/chaos-space-marines/book.config.json'),'utf8')),wrongAbilityContract=JSON.parse(fs.readFileSync(path.join(root,'books/chaos-space-marines',csmConfig.sources.effectContracts),'utf8'));
const slaves=wrongAbilityContract.contracts.find(contract=>contract.canonicalRecordId==='chaos-space-marines-detachment-rule-slaves-to-none'),remove=slaves.clauses.flatMap(clause=>clause.operations).find(operation=>operation.type==='ABILITY_REMOVE');
remove.canonicalTarget='chaos-space-marines-ability-unknown';
assert.throws(()=>validateEffectContractsAgainstCatalog(wrongAbilityContract,models.get('chaos-space-marines').rosterCatalog),/unknown canonical ability target/,'wrong accepted ability target did not fail contract validation');

const browser=await launchChromium();
try{
  const page=await browser.newPage();
  await page.setContent('<!doctype html><body></body>');
  await page.addScriptTag({path:path.join(root,'books/shared/roster-context.js')});
  await page.addScriptTag({path:path.join(root,'books/shared/roster-game-presentation.js')});
  const present=input=>page.evaluate(input=>{
    input={includeTarget:true,chanceTitle:'Chance for Glory',chanceText:'Chance text',targetTitle:'Dark Pacts',duplicateTarget:false,...input};
    const target='chaos-space-marines-ability-dark-pacts',chance='chaos-space-marines-ability-chance-for-glory';
    document.body.innerHTML=`<article class="unit-card" data-roster-instance="physical-1"><section class="unit-part" id="collision-abilities"><div class="ability-list"><article class="ability" data-ability-id="${chance}"><h5>${input.chanceTitle}</h5><p>${input.chanceText}</p></article>${input.includeTarget?`<article class="ability" data-ability-id="${target}"><h5>${input.targetTitle}</h5><p>Target text</p></article>`:''}${input.duplicateTarget?`<article class="ability" data-ability-id="${target}"><h5>Duplicate</h5></article>`:''}</div></section></article>`;
    const card=document.querySelector('.unit-card'),gameUnit={identity:{instanceId:'physical-1',canonicalDatasheetId:'unit-collision',canonicalTitle:'Collision Unit'},selection:{loadout:{state:'not-provided',weaponResolution:{state:'not-provided'},wargearResolution:{state:'not-provided'},selectedProfileIds:[],selectedWargearAbilityIds:[]},composition:{state:'not-provided'},modelCount:{state:'not-provided'}},rosterState:{enhancements:[],keywordProfile:{effective:[]}},attachments:{leaders:[],leading:[]},effective:{stats:{},weaponProfiles:[],abilities:[],keywords:[]},effects:[{id:'remove-dark-pacts',component:'ability',operation:'remove',targetId:target,title:'Dark Pacts',state:'active',certainty:'current'}]};
    try{window.WHArmyRosterGamePresentation.present(card,gameUnit,{game:{units:[gameUnit]},catalog:{detachments:[],enhancements:[]}});return{error:null,chanceHidden:card.querySelector(`[data-ability-id="${chance}"]`).hidden,targetHidden:card.querySelector(`[data-ability-id="${target}"]`)?.hidden??null};}catch(error){return{error:error.message};}
  },input);
  assert.deepEqual(await present({includeTarget:true,chanceTitle:'Dark Pacts'}),{error:null,chanceHidden:false,targetHidden:true},'DOM title collision authorized ability removal');
  assert.deepEqual(await present({includeTarget:false,chanceTitle:'Dark Pacts'}),{error:null,chanceHidden:false,targetHidden:null},'DOM missing-target title collision authorized removal');
  assert.deepEqual(await present({includeTarget:true,chanceText:'Target text'}),{error:null,chanceHidden:false,targetHidden:true},'DOM text collision authorized ability removal');
  assert.deepEqual(await present({includeTarget:true,targetTitle:'Independent renamed target'}),{error:null,chanceHidden:false,targetHidden:true},'DOM target rename changed exact removal');
  assert.match((await present({includeTarget:true,duplicateTarget:true})).error,/duplicate canonical ability presentation/,'duplicate presented ability identity did not fail');

  const pulseSelection=rosterFireblade.gameSelections.selections.find(selection=>selection.profileIds.includes(pulse.id));
  assert.ok(pulseSelection,'pulse-rifle selection');
  const profileState=await page.evaluate(({catalogUnit,selectionTitle,pulseId})=>{
    document.body.innerHTML=`<article class="unit-card" data-roster-instance="physical-1"><section class="unit-part" id="fireblade-profile"><h4>Profile & Weapons</h4><div class="weapon-group"><h5>Ranged weapons</h5><div class="weapon-table"><div class="weapon-row weapon-head"></div>${catalogUnit.gameSelections.weaponProfiles.map(profile=>`<div class="weapon-row" data-roster-profile-id="${profile.id}"><div>${profile.id===pulseId?'Independent renamed rifle':profile.title}</div></div>`).join('')}</div></div></section></article>`;
    const catalog={schema:window.WHArmyRosterContext.CATALOG_SCHEMA,book:{id:'tau-empire',title:'T’au Empire',factionKeyword:'T’AU EMPIRE',dependencies:[]},units:[catalogUnit],detachments:[],enhancements:[]},projection=window.WHArmyRosterContext.project({catalog,roster:{faction:'T’AU EMPIRE',detachments:[],enhancements:[],units:[{id:'physical-1',canonicalUnitId:catalogUnit.id,wargear:selectionTitle}]},record:{id:'pulse-rename'}}),gameUnit=projection.game.units[0],card=document.querySelector('.unit-card');
    window.WHArmyRosterGamePresentation.present(card,gameUnit,projection);
    const visible=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')].filter(row=>!row.hidden).map(row=>row.dataset.rosterProfileId);
    return{selected:gameUnit.selection.loadout.selectedProfileIds,resolution:gameUnit.selection.loadout.weaponResolution.state,visible};
  },{catalogUnit:rosterFireblade,selectionTitle:pulseSelection.title,pulseId:pulse.id});
  assert.equal(profileState.resolution,'resolved','renamed rendered profile broke loadout resolution');
  assert.deepEqual(profileState.selected,[pulse.id],'pulse-rifle selected identity changed');
  assert.deepEqual(profileState.visible,[pulse.id],'renamed rendered profile row disappeared');
}finally{await browser.close();}

const repeatContext=createCanonicalBuildContext({configPath:path.join(root,'books/tau-empire/book.config.json'),args:['--check'],repo:root});
const repeat=(await buildCanonicalBook(repeatContext,{projectionOnly:true})).effectiveBookModel;
assert.deepEqual(repeat.units.flatMap(unit=>profileRecords(unit).map(profile=>profile.id)),tau.units.flatMap(unit=>profileRecords(unit).map(profile=>profile.id)),'profile identity construction is not deterministic');

console.log(`Final D4 canonical ability/profile QA: PASS (${profileCount} profiles pre-model; ability collisions isolated; pulse-rifle ID ${pulse.id} stable through rename/text/reorder and real presentation).`);
