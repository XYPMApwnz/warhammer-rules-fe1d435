import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const source=JSON.parse(fs.readFileSync(path.join(repo,'books/space-marines/content/space-marines-codex-datasheets.en.json'),'utf8'));
const sourceUnits=[...(source.datasheets||[]),...(source.imperialArmour||[])];
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(repo,'books/space-marines/scripts/roster-data.js'),'utf8'),sandbox,{filename:'books/space-marines/scripts/roster-data.js'});
const catalog=JSON.parse(JSON.stringify(sandbox.window.WH_BOOK_ROSTER_CATALOG));
const catalogById=new Map(catalog.units.map(unit=>[unit.id,unit]));
const sourceById=new Map(sourceUnits.map(unit=>[unit.id,unit]));
const abilityFact=(unit,ability)=>JSON.stringify([unit.id,ability.title,ability.text||'']);
const sourceAbilityFacts=sourceUnits.flatMap(unit=>(unit.abilities||[]).map(ability=>abilityFact(unit,ability))).sort();
const catalogAbilityFacts=catalog.units.flatMap(unit=>unit.gameSelections.abilities.map(ability=>abilityFact(unit,ability))).sort();

assert.equal(catalog.units.length,103);
assert.equal(catalog.enhancements.length,87);
assert.equal(catalog.detachments.length,23);
assert.deepEqual(catalog.units.map(unit=>unit.id).sort(),sourceUnits.map(unit=>unit.id).sort(),'generated unit identities differ from accepted normalized source');
assert.deepEqual(catalogAbilityFacts,sourceAbilityFacts,'generated canonical Ability records differ from accepted normalized source');
for(const unit of catalog.units){
  assert.equal(new Set(unit.gameSelections.abilities.map(ability=>ability.id)).size,unit.gameSelections.abilities.length,`${unit.id}: duplicate scoped canonical Ability ID`);
  assert.ok(unit.gameSelections.abilities.every(ability=>ability.sourceUnitId===unit.id),`${unit.id}: canonical Ability belongs to wrong source unit`);
}

const scopedModel=(unitId,title)=>{
  const sourceUnit=sourceById.get(unitId),catalogUnit=catalogById.get(unitId);
  return {
    source:sourceUnit.composition.find(model=>model.name===title),
    canonical:catalogUnit.gameSelections.models.find(model=>model.title===title),
    unit:catalogUnit
  };
};
const dainal=scopedModel('unit-wardens-of-ultramar','Dainal Kornelius');
assert.deepEqual(dainal.source.intrinsicKeywords,['Psyker']);
assert.equal(dainal.canonical.id,'unit-wardens-of-ultramar-model-4f04168567');
assert.deepEqual(dainal.canonical.intrinsicKeywords,['Psyker']);
assert.equal(dainal.unit.intrinsicKeywords.includes('Psyker'),false,'model-scoped Psyker must not flatten onto Wardens of Ultramar');

const invader=scopedModel('unit-outrider-squad','Invader ATV');
const invaderKeywords=['Mounted','Grenades','Imperium','Invader ATV','Adeptus Astartes'];
assert.deepEqual(invader.source.intrinsicKeywords,invaderKeywords);
assert.equal(invader.canonical.id,'unit-outrider-squad-model-355c8d4307');
assert.deepEqual(invader.canonical.intrinsicKeywords,invaderKeywords);
assert.equal(invader.unit.intrinsicKeywords.includes('Invader ATV'),false,'embedded model identity must not flatten onto Outrider Squad');

const plasmaSource=sourceById.get('unit-inceptor-squad').weapons.filter(profile=>/plasma exterminators/i.test(profile.name));
assert.deepEqual(plasmaSource.map(profile=>profile.sourceChildId),['98fc-ec81-28d0-6001','470f-f223-b33d-a1b0'],'accepted duplicate BSData branches must retain one persistent profile identity per mode');
assert.deepEqual(plasmaSource.map(({name,range,a,skill,s,ap,d,abilities})=>({name,range,a,skill,s,ap,d,abilities})),[
  {name:'➤ Plasma Exterminators - Standard',range:'18"',a:'2',skill:'3+',s:'7',ap:'-2',d:'2',abilities:'Assault, Pistol, Twin-linked'},
  {name:'➤ Plasma Exterminators - Supercharge',range:'18"',a:'2',skill:'3+',s:'8',ap:'-3',d:'3',abilities:'Assault, Pistol, Hazardous, Twin-linked'}
]);
const inceptor=catalogById.get('unit-inceptor-squad'),plasmaProfiles=inceptor.gameSelections.weaponProfiles.filter(profile=>/plasma exterminators/i.test(profile.title));
const plasmaIds=['unit-inceptor-squad-profile-94b795ddda','unit-inceptor-squad-profile-babc18b0b0'];
assert.deepEqual(plasmaProfiles.map(profile=>profile.id),plasmaIds);
assert.deepEqual(inceptor.gameSelections.weaponFamilies.find(family=>family.id==='unit-inceptor-squad-weapon-family-plasma-exterminators').profileIds,plasmaIds);
assert.deepEqual(inceptor.gameSelections.selections.find(selection=>selection.id==='unit-inceptor-squad-weapon-family-plasma-exterminators-selection').profileIds,plasmaIds);

const gravProfiles=sourceById.get('unit-centurion-devastator-squad').weapons.filter(profile=>profile.name==='Grav-cannon');
assert.deepEqual(gravProfiles.map(profile=>profile.abilities),['Anti-vehicle 2+','Anti-Vehicle 2+'],'case-distinct accepted Grav-cannon facts must not be collapsed');

const wargearSelections=catalog.units.flatMap(unit=>unit.gameSelections.selections.filter(selection=>selection.kind==='wargear'));
assert.equal(wargearSelections.length,18);
assert.ok(wargearSelections.every(selection=>selection.wargearAbilityIds.length===1&&!selection.candidateWargearAbilityIds));
const honourIds=catalog.units.flatMap(unit=>unit.gameSelections.abilities.filter(ability=>ability.title==='Honour or Death').map(ability=>[unit.id,ability.id]));
assert.deepEqual(honourIds,[['unit-cato-sicarius','space-marines-ability-honour-or-death']]);
const onslaught=catalog.units.flatMap(unit=>unit.gameSelections.weaponProfiles.filter(profile=>/onslaught gatling cannon/i.test(profile.title)).map(profile=>profile.id));
assert.ok(onslaught.length>1&&new Set(onslaught).size===onslaught.length&&onslaught.every(id=>id.startsWith('unit-')));

console.log(`Space Marines base source conformance QA passed: 103 Datasheets, ${catalogAbilityFacts.length} exact source-matched canonical Ability records, scoped model keywords, stable Plasma Exterminator identities, case-distinct Grav-cannon facts, 87 Enhancements and 23 Detachments.`);
