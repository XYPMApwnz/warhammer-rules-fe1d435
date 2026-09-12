import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRosterFixture} from './helpers/roster-fixtures.mjs';

const scope={console,WH40K_GLOSSARY:{forBook:()=>({})}};
scope.window=scope;
scope.globalThis=scope;
for(const file of ['../books/adeptus-mechanicus/scripts/roster-data.js','../roster-guides/points-data.js']){
  vm.runInNewContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),scope,{filename:file});
}
const catalog=scope.WH_BOOK_ROSTER_CATALOG,pointsCatalog=scope.WH_POINTS_CATALOG['adeptus mechanicus'];
const providerSource=fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-enhancements.js',import.meta.url),'utf8');
assert.doesNotMatch(providerSource,/Models represented by this roster|Effect could not be applied automatically|Cyber-psalm Programming/,'AM provider must not own synthetic gameplay prose');
vm.runInNewContext(providerSource,scope,{filename:'am-roster-enhancements.js'});

const api=scope.AMRosterEnhancements;
const fixture=(id,detachmentId,units,attachments={})=>createRosterFixture({catalog,pointsCatalog,id,detachmentId,units,attachments});
const providerRoster=canonicalFixture=>({
  units:canonicalFixture.units.map(unit=>({id:unit.instanceId,name:unit.title,points:unit.points})),
  enhancements:canonicalFixture.units.flatMap(unit=>unit.enhancements.map(enhancement=>({
    name:enhancement.title,
    ruleId:enhancement.id,
    ownerStatus:'resolved',
    ownerUnitId:unit.instanceId,
  }))),
});
const effects=(canonicalFixture,instanceId,{attachments=canonicalFixture.record.attachments,detachmentIds=canonicalFixture.detachments.map(item=>item.id)}={})=>{
  const roster=providerRoster(canonicalFixture),unit=roster.units.find(item=>item.id===instanceId);
  return api.projectGameEffects(roster,unit,{attachments,unitById:new Map(roster.units.map(item=>[item.id,item])),detachmentIds:new Set(detachmentIds)});
};

const group=fixture('am-semantic-attached','detachment-haloscreed-battle-clade',[
  {datasheetId:'unit-tech-priest-manipulus',instanceId:'parsed-unit-1',quantity:1,enhancementId:'enhancement-sanctified-ordnance'},
  {datasheetId:'unit-skitarii-rangers',instanceId:'parsed-unit-2',quantity:10},
  {datasheetId:'unit-tech-priest-dominus',instanceId:'parsed-unit-3',quantity:1},
  {datasheetId:'unit-technoarcheologist',instanceId:'parsed-unit-4',quantity:1},
  {datasheetId:'unit-skitarii-rangers',instanceId:'parsed-unit-5',quantity:10},
],{'parsed-unit-2':['parsed-unit-1','parsed-unit-3','parsed-unit-4']});
const rangerEffects=effects(group,'parsed-unit-2');
assert(rangerEffects.some(effect=>effect.id==='galvanic-field'&&effect.tag==='LETHAL HITS'&&effect.source.ownerInstanceId==='parsed-unit-1'));
assert(rangerEffects.some(effect=>effect.title==='Feel No Pain 5+'&&effect.source.ownerInstanceId==='parsed-unit-3'));
assert(rangerEffects.some(effect=>effect.id==='technoarcheologist-oc'&&effect.delta===1&&effect.source.ownerInstanceId==='parsed-unit-4'));
assert(rangerEffects.some(effect=>effect.canonicalReference?.id==='enhancement-sanctified-ordnance'&&effect.source.ownerInstanceId==='parsed-unit-1'));
assert.equal(effects(group,'parsed-unit-5').length,0,'attachment effects leaked to a duplicate physical unit');
assert.equal(effects(group,'parsed-unit-2',{attachments:{}}).length,0,'potential attachment activated current effects');

const robots=fixture('am-semantic-robots','detachment-cohort-cybernetica',[
  {datasheetId:'unit-kastelan-robots',instanceId:'parsed-unit-1',quantity:2},
  {datasheetId:'unit-cybernetica-datasmith',instanceId:'parsed-unit-2',quantity:1},
],{'parsed-unit-1':['parsed-unit-2']});
const robotEffects=effects(robots,'parsed-unit-1'),datasmithEffects=effects(robots,'parsed-unit-2'),aegis=robotEffects.find(effect=>effect.id==='aegis-protocol-toughness');
assert.equal(aegis.state,'conditional');
assert.equal(aegis.certainty,'unknown');
assert.equal(aegis.condition?.state,'unknown');
assert.equal(aegis.source.ownerInstanceId,'parsed-unit-2');
assert(robotEffects.some(effect=>effect.canonicalAbilityId==='datasheet-battle-protocols'&&effect.source.ownerInstanceId==='parsed-unit-2'));
assert(datasmithEffects.some(effect=>effect.title==='Feel No Pain 4+'&&effect.source.id==='datasheet-robotic-bodyguard'&&effect.source.ownerInstanceId==='parsed-unit-1'),'reverse Bodyguard source identity is wrong');
assert.equal(effects(robots,'parsed-unit-1',{attachments:{}}).some(effect=>effect.id==='aegis-protocol-toughness'),false);

const electro=fixture('am-semantic-electro',null,[
  {datasheetId:'unit-fulgurite-electro-priests',instanceId:'parsed-unit-1',quantity:5},
  {datasheetId:'unit-tech-priest-manipulus',instanceId:'parsed-unit-2',quantity:1},
],{'parsed-unit-1':['parsed-unit-2']});
const electroEffect=effects(electro,'parsed-unit-2').find(effect=>effect.canonicalAbilityId==='datasheet-electro-infusion');
assert.equal(electroEffect.source.ownerInstanceId,'parsed-unit-1');
assert.equal(effects(electro,'parsed-unit-1').some(effect=>effect.canonicalAbilityId==='datasheet-electro-infusion'),false,'source card received a derived duplicate');

for(const spec of [
  ['detachment-cohort-acquisitus','unit-skitarii-rangers',10,'cohort-acquisitus-rule'],
  ['detachment-lords-of-the-forge','unit-tech-priest-dominus',1,'lords-of-the-forge-rule'],
  ['detachment-cohort-cybernetica','unit-kastelan-robots',2,'cohort-cybernetica-rule'],
  ['detachment-luminen-auto-choir','unit-fulgurite-electro-priests',5,'luminen-auto-choir-rule'],
]){
  const [detachmentId,datasheetId,quantity,ruleId]=spec,current=fixture(`am-semantic-${detachmentId}`,detachmentId,[{datasheetId,instanceId:'parsed-unit-1',quantity}]);
  assert(effects(current,'parsed-unit-1').some(effect=>effect.canonicalReference?.id===ruleId));
}
const unrelatedDetachment=fixture('am-semantic-unrelated-detachment','detachment-haloscreed-battle-clade',[{datasheetId:'unit-kastelan-robots',instanceId:'parsed-unit-1',quantity:2}]);
assert.equal(effects(unrelatedDetachment,'parsed-unit-1').length,0,'unknown Haloscreed selection was auto-applied');

const enhancementScenarios=[
  ['enhancement-transoracular-dyad-wafers','detachment-haloscreed-battle-clade','unit-kastelan-robots',2,'unit-cybernetica-datasmith'],
  ['enhancement-cognitive-reinforcement','detachment-haloscreed-battle-clade','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-sanctified-ordnance','detachment-haloscreed-battle-clade','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-voltagheist-reliquary','detachment-luminen-auto-choir','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-omnicogitator','detachment-eradication-cohort','unit-skitarii-rangers',10,'unit-skitarii-marshal'],
  ['enhancement-data-blessed-autosermon','detachment-data-psalm-conclave','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-artisan','detachment-explorator-maniple','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-logis','detachment-explorator-maniple','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-genetor','detachment-explorator-maniple','unit-skitarii-rangers',10,'unit-tech-priest-manipulus'],
  ['enhancement-battle-sphere-uplink','detachment-skitarii-hunter-cohort','unit-skitarii-rangers',10,'unit-skitarii-marshal'],
];
for(const [enhancementId,detachmentId,bodyId,bodyQuantity,ownerId] of enhancementScenarios){
  const current=fixture(`am-semantic-${enhancementId}`,detachmentId,[
    {datasheetId:bodyId,instanceId:'parsed-unit-1',quantity:bodyQuantity},
    {datasheetId:ownerId,instanceId:'parsed-unit-2',quantity:1,enhancementId},
  ],{'parsed-unit-1':['parsed-unit-2']});
  assert(current.units[1].enhancements.some(item=>item.id===enhancementId),`${enhancementId} exact canonical fixture identity missing`);
  assert(effects(current,'parsed-unit-1').some(effect=>effect.canonicalReference?.id===enhancementId),`${enhancementId} canonical reference missing`);
  assert.equal(effects(current,'parsed-unit-1',{attachments:{}}).some(effect=>effect.canonicalReference?.id===enhancementId),false,`${enhancementId} leaked without attachment`);
}

const tl=fixture('am-semantic-tl409','detachment-lords-of-the-forge',[
  {datasheetId:'unit-tech-priest-manipulus',instanceId:'parsed-unit-1',quantity:1,enhancementId:'enhancement-tl-4-9'},
  {datasheetId:'unit-tech-priest-manipulus',instanceId:'parsed-unit-2',quantity:1},
]);
assert.equal(tl.units[0].enhancement.title,'TL-4Ø9');
const tlEffect=effects(tl,'parsed-unit-1').find(effect=>effect.operation==='grant-profile');
assert.deepEqual({...tlEffect.profile},{name:'TL-409',mode:'ranged',range:'24"',a:'3',skill:'2+',s:'11',ap:'-2',d:'D3+2',abilities:'Devastating Wounds, Hazardous'});
assert.equal(effects(tl,'parsed-unit-2').some(effect=>effect.source.id==='enhancement-tl-4-9'),false);

const enhancementClasses={deterministic:['enhancement-explorator-dispensation','enhancement-stealth-screened-cybercanids-upgrade','enhancement-vinghs-wafers-of-dynamism','enhancement-tl-4-9','enhancement-electromiasmic-brazier','enhancement-arch-negator','enhancement-temporcopia','enhancement-inloaded-lethality','enhancement-autoclavic-denunciation','enhancement-malphonic-susurrus','enhancement-peerless-eradicator','enhancement-clandestine-infiltrator','enhancement-omnissiahs-fury','enhancement-belicosa-class-capacitor-vanes','enhancement-martial-signatum-amplificator'],mixed:['enhancement-transoracular-dyad-wafers','enhancement-cognitive-reinforcement','enhancement-sanctified-ordnance','enhancement-omnicogitator','enhancement-mechanicus-locum'],reference:['enhancement-voltagheist-reliquary','enhancement-data-blessed-autosermon','enhancement-artisan','enhancement-logis','enhancement-genetor','enhancement-battle-sphere-uplink'],sourceOnly:['enhancement-necromechanic','enhancement-lord-of-machines','enhancement-emotionless-clarity','enhancement-mantle-of-the-gnosticarch','enhancement-magos','enhancement-radial-suffusion','enhancement-veiled-hunter','enhancement-cantic-thrallnet']};
assert.deepEqual(new Set(Object.values(enhancementClasses).flat()),new Set(catalog.enhancements.map(item=>item.id)),'AM Enhancement inventory has an unexplained omission');
assert.equal(catalog.detachmentRules.length,10);
assert.equal(catalog.detachments.every(item=>item.detachmentRuleIds.length===1),true);
for(const unit of catalog.units)for(const ability of unit.gameSelections.wargearAbilities)assert.equal(ability.requiredSelectionIds.length,1,`${unit.title} ${ability.title} lacks exact selected-wargear linkage`);
console.log(`AM full semantic conformance QA: PASS (${catalog.units.length} Datasheets, ${catalog.enhancements.length} Enhancements, ${catalog.detachmentRules.length} Detachment Rules)`);
