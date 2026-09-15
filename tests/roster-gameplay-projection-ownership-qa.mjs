import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {buildCanonicalBook} from '../books/shared/tools/build-army-book.mjs';
import {createCanonicalBuildContext} from '../books/shared/tools/canonical-build-contract.mjs';
import {assertRosterBaseStatProjection} from '../books/shared/tools/canonical-unit-stats.mjs';
import {assertRosterWeaponFactProjection} from '../books/shared/tools/canonical-weapon-profile-facts.mjs';
import {assertRosterUnitGameplayProjection} from '../books/shared/tools/build-roster-catalog.mjs';
import {createEffectiveBookModel,validateEffectiveBookModel} from '../books/shared/tools/effective-book-model.mjs';
import {createRosterFixture} from './helpers/roster-fixtures.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const clone=value=>structuredClone(value),values=value=>Array.isArray(value)?value:[];
const loadScript=(scope,file)=>vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),scope,{filename:file});
const loadCatalog=bookId=>{const scope={};scope.window=scope;scope.globalThis=scope;loadScript(scope,`books/${bookId}/scripts/roster-data.js`);return scope.WH_BOOK_ROSTER_CATALOG;};
const sourceProfiles=unit=>values(unit.weapons).length?unit.weapons:values(unit.blocks).filter(block=>block?.type==='weapon');

const models=new Map(),catalogs=new Map();
let weaponProfiles=0,weaponCells=0,ordinaryAbilities=0,wargearAbilities=0,modelsProjected=0,unitKeywordSets=0,relationSets=0;
for(const bookId of books){
  const context=createCanonicalBuildContext({configPath:path.join(root,'books',bookId,'book.config.json'),args:['--check'],repo:root});
  const model=(await buildCanonicalBook(context,{projectionOnly:true})).effectiveBookModel,catalog=model.rosterCatalog||loadCatalog(bookId);
  assertRosterBaseStatProjection(model.units,catalog.units,{label:`${bookId} production roster base-stat projection`});
  assertRosterWeaponFactProjection(model.units,catalog.units,{label:`${bookId} production roster weapon-fact projection`});
  assertRosterUnitGameplayProjection(model.units,model.relationGraphs,catalog.units,{label:`${bookId} production roster unit-gameplay projection`});
  for(const unit of catalog.units){
    weaponProfiles+=unit.gameSelections.weaponProfiles.length;weaponCells+=unit.gameSelections.weaponProfiles.length*8;
    ordinaryAbilities+=unit.gameSelections.abilities.length;wargearAbilities+=unit.gameSelections.wargearAbilities.length;modelsProjected+=unit.gameSelections.models.length;
    unitKeywordSets+=1;relationSets+=1;
  }
  models.set(bookId,model);catalogs.set(bookId,catalog);
}
assert.deepEqual({weaponProfiles,weaponCells,ordinaryAbilities,wargearAbilities,modelsProjected,unitKeywordSets,relationSets},{weaponProfiles:2713,weaponCells:21704,ordinaryAbilities:2224,wargearAbilities:134,modelsProjected:575,unitKeywordSets:540,relationSets:540},'all-nine roster gameplay projection inventory');

const darkAngels=models.get('dark-angels'),unitId='unit-assault-intercessor-squad',profileId='unit-assault-intercessor-squad-profile-08f1080123',selectionId='unit-assault-intercessor-squad-selection-plasma-pistol-supercharge';
const canonicalUnit=model=>model.units.find(unit=>unit.id===unitId),canonicalProfile=model=>sourceProfiles(canonicalUnit(model)).find(profile=>profile.id===profileId);
const rosterUnit=model=>model.rosterCatalog.units.find(unit=>unit.id===unitId),rosterProfile=model=>rosterUnit(model).gameSelections.weaponProfiles.find(profile=>profile.id===profileId);
assert.equal(canonicalProfile(darkAngels).s,'8','accepted canonical plasma Strength');
assert.equal(rosterProfile(darkAngels).s,'8','accepted derived roster plasma Strength');

const rosterPoison=clone(darkAngels);rosterProfile(rosterPoison).s='99';
assert.throws(()=>validateEffectiveBookModel(rosterPoison),/conflicting canonical weapon facts/,'contradictory roster weapon Strength passed validation');
const canonicalEight=createEffectiveBookModel(rosterPoison);assert.equal(rosterProfile(canonicalEight).s,'8','canonical Strength did not replace roster poison');

const canonicalDirection=clone(darkAngels);canonicalProfile(canonicalDirection).s='12';
assert.equal(rosterProfile(canonicalDirection).s,'8','canonical-direction fixture did not retain a stale roster copy');
assert.throws(()=>validateEffectiveBookModel(canonicalDirection),/conflicting canonical weapon facts/,'stale roster weapon Strength passed validation');
const canonicalTwelve=createEffectiveBookModel(canonicalDirection);assert.equal(rosterProfile(canonicalTwelve).s,'12','canonical Strength did not control roster projection');

const runtime={console,addEventListener(){}};runtime.window=runtime;runtime.globalThis=runtime;
for(const file of ['roster-guides/points-data.js','books/shared/effect-contract-runtime.js','books/shared/roster-parser.js','books/shared/roster-context.js'])loadScript(runtime,file);
const pointsCatalog=runtime.WH_POINTS_CATALOG['dark angels'];
const project=(model,gameEffects=context=>runtime.WHEffectContractRuntime.project(context))=>{
  const catalog=model.rosterCatalog;runtime.WH_BOOK_ROSTER_CATALOG=catalog;
  const fixture=createRosterFixture({catalog,pointsCatalog,id:'roster-gameplay-owner',detachmentId:'dark-age-arsenal',units:[{datasheetId:unitId,instanceId:'parsed-unit-1',quantity:5,selectionIds:[selectionId]}]});
  const roster=runtime.WHRosterParser.parse(fixture.record.sourceText);
  return runtime.WHArmyRosterContext.project({catalog,roster,record:fixture.record,provider:{gameEffects}}).game.units[0];
};
const eightPlusOne=project(canonicalEight),twelvePlusOne=project(canonicalTwelve);
const effectiveProfile=result=>result.effective.weaponProfiles.find(profile=>profile.id===profileId);
assert.equal(effectiveProfile(eightPlusOne).values.S,'9','canonical S=8 plus Dark Age Arsenal did not produce 9');
assert.equal(effectiveProfile(twelvePlusOne).values.S,'13','canonical S=12 plus Dark Age Arsenal did not produce 13');
for(const [result,base,effective] of [[eightPlusOne,'8','9'],[twelvePlusOne,'12','13']])assert.ok(result.effects.some(effect=>effect.id==='dark-angels-detachment-rule-invocations-of-ancient-fury:clause-1-operation-1'&&effect.targets.some(target=>target.profileId===profileId&&target.base===base&&target.effective===effective)),'actual Dark Age Arsenal effect did not use canonical weapon facts');

const characteristicControl=(field,canonicalValue,effect)=>{
  const input=clone(darkAngels),profile=canonicalProfile(input),roster=rosterProfile(input);profile[field]=canonicalValue;const stale=roster[field];
  const model=createEffectiveBookModel(input);assert.equal(rosterProfile(model)[field],canonicalValue,`${field}: canonical value did not replace stale roster value ${stale}`);
  return effectiveProfile(project(model,()=>[{id:`${field}-projection-control`,component:'weapon',operation:'add-stat',targetId:profileId,stat:effect.stat,delta:effect.delta,state:'active',certainty:'current'}])).values[effect.stat];
};
assert.equal(characteristicControl('a','4',{stat:'A',delta:1}),'5','Attacks control');
assert.equal(characteristicControl('ap','-5',{stat:'AP',delta:-1}),'-6','AP control');
assert.equal(characteristicControl('d','4',{stat:'D',delta:1}),'5','Damage control');
assert.equal(characteristicControl('skill','2+',{stat:'BS',delta:1}),'3+','BS control');

const tagsDirection=clone(darkAngels);canonicalProfile(tagsDirection).abilities='Hazardous, Pistol, Precision';
const tagsModel=createEffectiveBookModel(tagsDirection),tagsResult=effectiveProfile(project(tagsModel,()=>[]));
assert.deepEqual([...tagsResult.tags],['Hazardous','Pistol','Precision'],'canonical weapon tags did not control runtime projection');

const rawUnknown=clone(darkAngels);rosterProfile(rawUnknown).id='unknown-profile';
assert.throws(()=>validateEffectiveBookModel(rawUnknown),/conflicting canonical weapon profile partitions/,'unknown roster profile ID did not fail');
const rawDuplicate=clone(darkAngels),profiles=rosterUnit(rawDuplicate).gameSelections.weaponProfiles;profiles[1].id=profiles[0].id;
assert.throws(()=>validateEffectiveBookModel(rawDuplicate),/duplicate roster weapon profile ID/,'duplicate roster profile ID did not fail');
const rawWrongParent=clone(darkAngels),otherUnit=rawWrongParent.rosterCatalog.units.find(unit=>unit.id!==unitId&&unit.gameSelections.weaponProfiles.length),otherProfile=otherUnit.gameSelections.weaponProfiles[0];rosterProfile(rawWrongParent).id=otherProfile.id;
assert.throws(()=>validateEffectiveBookModel(rawWrongParent),/conflicting canonical weapon profile partitions/,'wrong-parent roster profile did not fail');
const substituted=clone(darkAngels),targetProfiles=rosterUnit(substituted).gameSelections.weaponProfiles,[first,second]=targetProfiles;[first.id,second.id]=[second.id,first.id];
assert.throws(()=>validateEffectiveBookModel(substituted),/conflicting canonical weapon facts/,'count-preserving profile substitution did not fail');

const renamed=clone(darkAngels),renamedCanonical=canonicalProfile(renamed);renamedCanonical.name='Independent renamed plasma profile';
const renamedModel=createEffectiveBookModel(renamed);assert.equal(rosterProfile(renamedModel).id,profileId,'display rename changed profile identity');assert.equal(effectiveProfile(project(renamedModel)).values.S,'9','display rename changed Dark Age Arsenal behavior');
const reordered=clone(darkAngels),weapons=canonicalUnit(reordered).weapons,index=weapons.findIndex(profile=>profile.id===profileId);weapons.unshift(...weapons.splice(index,1));
const reorderedModel=createEffectiveBookModel(reordered);assert.equal(rosterProfile(reorderedModel).id,profileId,'profile reorder changed identity');assert.equal(effectiveProfile(project(reorderedModel)).values.S,'9','profile reorder changed runtime behavior');

const tau=models.get('tau-empire'),fireblade=tau.units.find(unit=>unit.id==='unit-cadre-fireblade'),firebladeRoster=model=>model.rosterCatalog.units.find(unit=>unit.id===fireblade.id);
const adjacent=[
  ['abilities',copy=>{copy.gameSelections.abilities[0].text='Independent fake gameplay text';}],
  ['wargearAbilities',copy=>{copy.gameSelections.wargearAbilities[0].title='Independent fake wargear ability';}],
  ['models',copy=>{copy.gameSelections.models[0].title='Independent fake model';}],
  ['intrinsicKeywords',copy=>{copy.intrinsicKeywords.push('INDEPENDENT FAKE KEYWORD');}],
  ['relations',copy=>{copy.relations.canLead.push({unitId:'unit-fake-relation'});}],
];
for(const [partition,mutate] of adjacent){const poison=clone(tau),copy=firebladeRoster(poison);mutate(copy);assert.throws(()=>validateEffectiveBookModel(poison),/conflicting canonical/ ,`${partition}: independent roster gameplay copy passed validation`);const repaired=createEffectiveBookModel(poison);assert.doesNotThrow(()=>validateEffectiveBookModel(repaired),`${partition}: canonical projection was not restored`);}

console.log('NEW_WEAPON_ROSTER_COPY_ATTACK=KILLED');
console.log('NEW_CANONICAL_WEAPON_DIRECTION_ATTACK=KILLED');
console.log('Roster gameplay projection ownership QA: PASS (2713 weapon records / 21704 fields; 6726 canonical-derived gameplay record partitions; Astra S=99 and canonical S=12 killed through actual DA runtime).');
