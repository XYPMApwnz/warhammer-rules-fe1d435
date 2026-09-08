import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(process.env.FACTUAL_COMPLETION_ROOT||defaultRoot);
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));

function generatedBook(bookId){
  const sandbox={window:{}};
  vm.runInNewContext(read(`books/${bookId}/scripts/target-data.js`),sandbox);
  return sandbox.window.WH_ARMY_BOOK_TARGETS;
}

function generatedRoster(bookId){
  const sandbox={window:{}};
  vm.runInNewContext(read(`books/${bookId}/scripts/roster-data.js`),sandbox);
  return sandbox.window.WH_BOOK_ROSTER_CATALOG;
}

function objectsById(value,id,found=[]){
  if(!value||typeof value!=='object')return found;
  if(value.id===id)found.push(value);
  for(const child of Object.values(value))objectsById(child,id,found);
  return found;
}

function assertGeneratedProfile(root,id,expected){
  const matches=objectsById(root,id);
  assert.equal(matches.length,1,`${id}: generated profile cardinality`);
  const profile=matches[0];
  const scalar=(...keys)=>keys.map(key=>profile[key]).find(value=>value!==undefined);
  assert.equal(scalar('range'),expected.range,`${id}: range`);
  assert.equal(scalar('a','attacks'),expected.a,`${id}: attacks`);
  assert.equal(scalar('skill','weaponSkill','ballisticSkill'),expected.skill,`${id}: skill`);
  assert.equal(scalar('s','strength'),expected.s,`${id}: strength`);
  assert.equal(scalar('ap','armourPenetration','armorPenetration'),expected.ap,`${id}: AP`);
  assert.equal(scalar('d','damage'),expected.d,`${id}: damage`);
  assert.equal(scalar('abilities'),expected.abilities,`${id}: abilities`);
}

const daExpected=new Map([
  ['company-of-hunters',[
    {id:'stratagem-rapid-reappraisal',title:'Rapid Reappraisal',cp:1,category:'Battle Tactic',when:'End of your opponent’s Fight phase.',target:'One RAVENWING unit from your army that is not within Engagement Range of one or more enemy units.',effect:'Remove your unit from the battlefield and place it into Strategic Reserves.',canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Company of Hunters · Battle Tactic Stratagem'},
    {id:'stratagem-high-speed-focus',title:'High-speed Focus',cp:1,category:'Battle Tactic',when:'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',target:'One RAVENWING unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',effect:'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Company of Hunters · Battle Tactic Stratagem'},
    {id:'stratagem-hunters-trail',title:'Hunters’ Trail',cp:1,category:'Strategic Ploy',when:'Command phase.',target:'One RAVENWING MOUNTED unit from your army that is within range of an objective marker you control.',effect:'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',canonicalType:'strategic-ploy',typeStatus:'confirmed',sourceLabel:'Company of Hunters · Strategic Ploy Stratagem'}
  ]],
  ['inner-circle-task-force',[
    {id:'stratagem-unmatched-fortitude',title:'Unmatched Fortitude',cp:1,category:'Battle Tactic',when:'Your opponent’s Shooting phase, just after an enemy unit has selected its targets.',target:'One DEATHWING INFANTRY unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',effect:'Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than your unit’s Toughness characteristic, subtract 1 from the Wound roll.',canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Inner Circle Task Force · Battle Tactic Stratagem'},
    {id:'stratagem-martial-mastery',title:'Martial Mastery',cp:1,category:'Epic Deed',when:'Fight phase.',target:'One DEATHWING INFANTRY unit from your army that has not been selected to fight this phase.',effect:'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit is within range of your Vowed objective marker, you can re-roll the Wound roll instead.',canonicalType:'epic-deed',typeStatus:'confirmed',sourceLabel:'Inner Circle Task Force · Epic Deed Stratagem'},
    {id:'stratagem-wrath-of-the-lion',title:'Wrath of the Lion',cp:1,category:'Epic Deed',when:'Your Charge phase.',target:'One DEATHWING INFANTRY unit from your army that just ended a Charge move.',effect:'Select one enemy unit within Engagement Range of your unit and roll one D6 for each model in your unit, adding 1 to the result if that enemy unit is within range of your Vowed objective marker: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 3 mortal wounds).',canonicalType:'epic-deed',typeStatus:'confirmed',sourceLabel:'Inner Circle Task Force · Epic Deed Stratagem'},
    {id:'stratagem-duty-unto-death',title:'Duty Unto Death',cp:1,category:'Strategic Ploy',when:'Fight phase, just after an enemy unit has selected its targets.',target:'One DEATHWING unit from your army that was selected as the target of one or more of the attacking unit’s attacks.',effect:'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 if your unit is within range of your Vowed objective marker. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',canonicalType:'strategic-ploy',typeStatus:'confirmed',sourceLabel:'Inner Circle Task Force · Strategic Ploy Stratagem'}
  ]],
  ['unforgiven-task-force',[
    {id:'stratagem-unbreakable-lines',title:'Unbreakable Lines',cp:2,category:'Battle Tactic',when:'Your opponent’s Charge phase, just after an enemy unit ends a Charge move.',target:'One ADEPTUS ASTARTES unit from your army within Engagement Range of that enemy unit.',effect:'Until the end of the turn, each time an attack targets your unit, subtract 1 from the Wound roll.',canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Unforgiven Task Force · Battle Tactic Stratagem'},
    {id:'stratagem-unforgiven-fury',title:'Unforgiven Fury',cp:1,category:'Battle Tactic',when:'Your Shooting phase or the Fight phase.',target:'One ADEPTUS ASTARTES unit from your army that has not been selected to shoot or fight this phase.',effect:'Until the end of the phase, weapons equipped by models in your unit have the [LETHAL HITS] ability. In addition, if one or more ADEPTUS ASTARTES units from your army are currently Battle-shocked, until the end of the phase, each time a model in your unit makes an attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.',canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Unforgiven Task Force · Battle Tactic Stratagem'},
    {id:'stratagem-grim-retribution',title:'Grim Retribution',cp:1,category:'Strategic Ploy',when:'Your opponent’s Shooting phase, just after an enemy unit has shot.',target:'One ADEPTUS ASTARTES unit from your army that had one or more models destroyed as a result of the attacking unit’s attacks.',effect:'Your unit can shoot as if it were your Shooting phase, but it must target the enemy unit that just attacked it, and can only do so if that enemy unit is an eligible target.',canonicalType:'strategic-ploy',typeStatus:'confirmed',sourceLabel:'Unforgiven Task Force · Strategic Ploy Stratagem'}
  ]]
]);

const da=json('books/dark-angels/content/dark-angels-codex-parity.en.json');
const allDaRules=da.detachments.flatMap(detachment=>(detachment.stratagems||[]).map(rule=>({detachmentId:detachment.id,rule})));
const expectedDaRules=[...daExpected.values()].flat();
for(const [detachmentId,expected] of daExpected){
  const owner=da.detachments.find(detachment=>detachment.id===detachmentId);
  assert.ok(owner,`Dark Angels detachment ${detachmentId} is absent`);
  assert.deepEqual(owner.stratagems,expected,`${detachmentId}: reviewed Stratagem ledger changed`);
}
for(const expected of expectedDaRules){
  assert.equal(allDaRules.filter(({rule})=>rule.id===expected.id).length,1,`${expected.id}: source identity cardinality`);
  assert.equal(allDaRules.filter(({rule})=>rule.title===expected.title).length,1,`${expected.id}: title cardinality`);
}
const daGenerated=generatedBook('dark-angels');
for(const rule of expectedDaRules){
  assert.equal((daGenerated.html.match(new RegExp(`data-rule-id="${rule.id}"`,'g'))||[]).length,1,`${rule.id}: generated card cardinality`);
}

const daRelatedRules=json('books/dark-angels/content/dark-angels-related-rules.en.json');
const daEligibilityExpected=new Map([
  ['rapid-reappraisal',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['RAVENWING']}}],conditions:['not-within-engagement-range']}],
  ['high-speed-focus',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['RAVENWING']}}],conditions:['targeted-by-enemy-attack']}],
  ['hunters-trail',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['RAVENWING','MOUNTED']}}],conditions:['within-range-of-objective-you-control']}],
  ['unmatched-fortitude',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['DEATHWING','INFANTRY']}}],conditions:['targeted-by-enemy-attack']}],
  ['martial-mastery',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['DEATHWING','INFANTRY']}}],conditions:['not-selected-to-fight']}],
  ['wrath-of-the-lion',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['DEATHWING','INFANTRY']}}],conditions:['ended-charge-move']}],
  ['duty-unto-death',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['DEATHWING']}}],conditions:['targeted-by-enemy-attack']}],
  ['unbreakable-lines',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['ADEPTUS ASTARTES']}}],conditions:['enemy-unit-ended-charge-move','within-engagement-range-of-that-unit']}],
  ['unforgiven-fury',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['ADEPTUS ASTARTES']}}],conditions:['not-selected-to-attack']}],
  ['grim-retribution',{v:1,roles:[{id:'friendly-target',side:'friendly',subject:'unit',count:1,selector:{allKeywords:['ADEPTUS ASTARTES']}}],conditions:['unit-has-been-shot','lost-one-or-more-models']}]
]);
for(const rule of expectedDaRules){
  const eligibilityId=rule.id.replace(/^stratagem-/,'');
  const eligibility=daRelatedRules.stratagems?.[eligibilityId];
  assert.deepEqual(eligibility,daEligibilityExpected.get(eligibilityId),`${eligibilityId}: exact eligibility contract`);
}

const ec=json('books/emperors-children/content/emperors-children-codex-datasheets.en.json');
const ecUnit=id=>{
  const matches=ec.datasheets.filter(unit=>unit.id===id);
  assert.equal(matches.length,1,`${id}: canonical Datasheet cardinality`);
  return matches[0];
};
const exactWeapon=(unit,name)=>{
  const matches=unit.weapons.filter(weapon=>weapon.name===name);
  assert.equal(matches.length,1,`${unit.id} / ${name}: canonical profile cardinality`);
  return matches[0];
};

const lordPowerFist={name:'Power fist',mode:'melee',range:'Melee',a:'5',skill:'2+',s:'8',ap:'-2',d:'2',abilities:''};
assert.deepEqual(exactWeapon(ecUnit('unit-lord-exultant'),'Power fist'),lordPowerFist,'Lord Exultant Power fist profile');

const tormentorProfiles=[
  {name:'Bolt pistol',mode:'ranged',range:'12"',a:'1',skill:'3+',s:'4',ap:'0',d:'1',abilities:'Pistol, Precision'},
  {name:'➤ Plasma pistol - standard',mode:'ranged',range:'12"',a:'1',skill:'3+',s:'7',ap:'-2',d:'1',abilities:'Pistol, Precision'},
  {name:'➤ Plasma pistol - supercharge',mode:'ranged',range:'12"',a:'1',skill:'3+',s:'8',ap:'-3',d:'2',abilities:'Hazardous, Pistol, Precision'}
];
const tormentors=ecUnit('unit-tormentors');
for(const profile of tormentorProfiles)assert.deepEqual(exactWeapon(tormentors,profile.name),profile,`Tormentors ${profile.name}`);

const ecRoster=generatedRoster('emperors-children');
assertGeneratedProfile(ecRoster,'unit-lord-exultant-profile-power-fist-melee-5',lordPowerFist);
assertGeneratedProfile(ecRoster,'unit-tormentors-profile-bolt-pistol-ranged',tormentorProfiles[0]);
assertGeneratedProfile(ecRoster,'unit-tormentors-profile-plasma-pistol-standard-ranged-2',tormentorProfiles[1]);
assertGeneratedProfile(ecRoster,'unit-tormentors-profile-plasma-pistol-supercharge-ranged-3',tormentorProfiles[2]);

const ecGenerated=generatedBook('emperors-children');
for(const unitId of ['unit-lord-exultant','unit-tormentors'])assert.ok(ecGenerated.targets[unitId],`${unitId}: generated target card`);

const { readFileSync: pidbReadFileSync } = await import('node:fs');
const { dirname: pidbDirname, resolve: pidbResolve } = await import('node:path');
const { fileURLToPath: pidbFileURLToPath } = await import('node:url');

const pidbRoot=pidbResolve(process.env.FACTUAL_COMPLETION_ROOT||pidbResolve(pidbDirname(pidbFileURLToPath(import.meta.url)),'..'));

function pidbCanonicalUnit(relativePath,unitId){
  const payload=JSON.parse(pidbReadFileSync(pidbResolve(pidbRoot,relativePath),'utf8'));
  const units=Array.isArray(payload)?payload:(payload.datasheets??payload.units??[]);
  const matches=units.filter(unit=>unit?.id===unitId);
  assert.equal(matches.length,1,`${unitId} must resolve exactly once in ${relativePath}`);
  return matches[0];
}

function pidbAbility(unit,title){
  const matches=(unit.abilities??[]).filter(ability=>ability?.title===title);
  assert.equal(matches.length,1,`${unit.id} must expose ${title} exactly once`);
  return matches[0];
}

function pidbGeneratedRosterUnit(bookId,unitId){
  const matches=objectsById(generatedRoster(bookId),unitId).filter(entry=>Array.isArray(entry?.gameSelections?.abilities));
  assert.equal(matches.length,1,`${bookId} generated roster must contain exactly one ${unitId}`);
  return matches[0];
}

function pidbGeneratedTarget(bookId,unitId){
  const generated=generatedBook(bookId);
  const range=generated.targets?.[unitId];
  assert.ok(range&&Number.isInteger(range.start)&&Number.isInteger(range.end),`${bookId} target range for ${unitId}`);
  return generated.html.slice(range.start,range.end);
}

function pidbRenderedText(html){
  return html.replace(/<[^>]*>/g,' ').replace(/&quot;/g,'"').replace(/&#39;|&apos;|&#x27;/g,"'").replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
}

const supremeCommanderText='If this model is in your army, it must be your WARLORD.';
const supremeCommanderUnits=[
  {bookId:'chaos-space-marines',unitId:'unit-abaddon-the-despoiler',source:'books/chaos-space-marines/content/chaos-space-marines-codex-datasheets.en.json'},
  {bookId:'dark-angels',unitId:'unit-lion-eljonson',source:'books/dark-angels/content/dark-angels-codex-datasheets.en.json'},
];

for(const spec of supremeCommanderUnits){
  const unit=pidbCanonicalUnit(spec.source,spec.unitId);
  assert.equal(pidbAbility(unit,'Supreme Commander').text,supremeCommanderText);
  const generatedUnit=pidbGeneratedRosterUnit(spec.bookId,spec.unitId);
  assert.equal(generatedUnit.gameSelections.abilities.filter(ability=>ability?.title==='Supreme Commander'&&ability?.text===supremeCommanderText).length,1,`${spec.unitId}: generated Supreme Commander`);
  const generatedTarget=pidbGeneratedTarget(spec.bookId,spec.unitId);
  assert.match(generatedTarget,/Supreme Commander/);
  assert.match(generatedTarget,/must be your WARLORD/);
}

const fulgrim=pidbCanonicalUnit('books/emperors-children/content/emperors-children-codex-datasheets.en.json','unit-fulgrim');
const fulgrimExpectedAbilities=new Map([
  ['Daemon Primarch of Slaanesh','At the start of your opponent’s Command phase, select one of the abilities in the Daemon Primarch of Slaanesh section (see below). Until the start of your opponent’s next Command phase, this model has that ability.'],
  ['Beguiling Form','Each time a model makes an attack that targets this model, subtract 1 from the Hit roll.'],
  ['Daemonic Speed','This model has the Fights First ability.'],
  ['Enthralling Hypnosis (Aura)','While an enemy unit is within 6" of this model, each time that unit is selected to Fall Back, it must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead.'],
]);

for(const [title,text] of fulgrimExpectedAbilities)assert.equal(pidbAbility(fulgrim,title).text,text);
assert.equal((fulgrim.abilities??[]).filter(ability=>ability?.title==='Daemon Prince of Slaanesh').length,0,'Fulgrim stale parent identity');

const daemonPrince=pidbCanonicalUnit('books/emperors-children/content/emperors-children-codex-datasheets.en.json','unit-daemon-prince-of-slaanesh');
assert.equal(daemonPrince.title,'Daemon Prince of Slaanesh');

const fulgrimRoster=pidbGeneratedRosterUnit('emperors-children','unit-fulgrim');
for(const [title,text] of fulgrimExpectedAbilities)assert.equal(fulgrimRoster.gameSelections.abilities.filter(candidate=>candidate?.title===title&&candidate?.text===text).length,1,`Fulgrim generated ${title}`);
assert.equal(fulgrimRoster.gameSelections.abilities.some(candidate=>candidate?.title==='Daemon Prince of Slaanesh'),false);

const fulgrimTarget=pidbGeneratedTarget('emperors-children','unit-fulgrim');
const fulgrimTargetText=pidbRenderedText(fulgrimTarget);
for(const [title,text] of fulgrimExpectedAbilities){
  assert.ok(fulgrimTarget.includes(title),`Fulgrim target title: ${title}`);
  assert.ok(fulgrimTargetText.includes(text),`Fulgrim target text: ${title}`);
}

console.log(`Factual completion QA passed: ${expectedDaRules.length} Dark Angels Stratagems, 3 EC factual repairs, and PIDB package A representation repairs.`);
