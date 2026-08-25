import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const units={
  'skitarii rangers':{id:'unit-skitarii-rangers',keywords:['RANGERS','SKITARII','INFANTRY']},
  'tech priest manipulus':{id:'unit-tech-priest-manipulus',keywords:['CHARACTER','TECH-PRIEST']},
  'cybernetica datasmith':{id:'unit-cybernetica-datasmith',keywords:['CHARACTER','INFANTRY']},
  'kastelan robots':{id:'unit-kastelan-robots',keywords:['LEGIO CYBERNETICA','VEHICLE']},
  'fulgurite electro priests':{id:'unit-fulgurite-electro-priests',keywords:['ELECTRO-PRIESTS','INFANTRY']}
};
const enhancement=(title,ruleId)=>({id:ruleId,ruleId,title,value:20,profile:ruleId==='enhancement-tl-4-9'?{name:'TL-4Ø9',type:'Ranged',characteristics:{Range:'24"',A:'3',BS:'2+',S:'11',AP:'-2',D:'D3+2'}}:null});
const enhancements={
  'autoclavic denunciation':enhancement('Autoclavic Denunciation','enhancement-autoclavic-denunciation'),
  'malphonic susurrus':enhancement('Malphonic Susurrus','enhancement-malphonic-susurrus'),
  'tl 4 9':enhancement('TL-4Ø9','enhancement-tl-4-9')
};
const glossary=Object.fromEntries(Object.values(enhancements).map(item=>[`adeptus-mechanicus-${item.ruleId}`,{id:`adeptus-mechanicus-${item.ruleId}`,title:item.title,kind:'enhancement'}]));
const scope={window:{WH_POINTS_CATALOG:{'adeptus mechanicus':{units,enhancements}},WH40K_GLOSSARY:{forBook:()=>glossary}}};
vm.runInNewContext(fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-enhancements.js',import.meta.url),'utf8'),scope,{filename:'am-roster-enhancements.js'});
const api=scope.window.AMRosterEnhancements;
const context=(roster,attachments={})=>({attachments,unitById:new Map(roster.units.map(unit=>[unit.id,unit])),detachmentIds:new Set()});

const group={units:[{id:'body',name:'Skitarii Rangers'},{id:'leader-1',name:'Tech Priest Manipulus'},{id:'leader-2',name:'Tech Priest Manipulus'}],enhancements:[{name:'Autoclavic Denunciation',ownerStatus:'resolved',ownerUnitId:'leader-2'}]};
const attached=context(group,{body:['leader-2']});
assert.equal(api.projectGameEffects(group,group.units[0],attached).some(effect=>effect.source.id==='enhancement-autoclavic-denunciation'),false,'bearer-only Enhancement leaked to Bodyguard');
assert.equal(api.projectGameEffects(group,group.units[1],attached).some(effect=>effect.source.id==='enhancement-autoclavic-denunciation'),false,'Enhancement leaked to duplicate instance');
const exact=api.projectGameEffects(group,group.units[2],attached).filter(effect=>effect.source.id==='enhancement-autoclavic-denunciation');
assert.equal(exact.length,2);assert.equal(exact.every(effect=>effect.source.ownerInstanceId==='leader-2'),true);

group.enhancements=[{name:'Malphonic Susurrus',ownerStatus:'resolved',ownerUnitId:'leader-2'}];
assert.equal(api.projectGameEffects(group,group.units[0],attached).some(effect=>effect.source.id==='enhancement-malphonic-susurrus'),true,'curated Attached Unit effect did not propagate');
assert.equal(api.projectGameEffects(group,group.units[0],context(group)).some(effect=>effect.source.id==='enhancement-malphonic-susurrus'),false,'potential relation activated an effect');

const robots={units:[{id:'robots',name:'Kastelan Robots'},{id:'datasmith',name:'Cybernetica Datasmith'}],enhancements:[]};
const robotEffects=api.projectGameEffects(robots,robots.units[0],context(robots,{robots:['datasmith']}));
const aegis=robotEffects.find(effect=>effect.id==='aegis-protocol-toughness'),battleProtocols=robotEffects.find(effect=>effect.canonicalAbilityId==='datasheet-battle-protocols');
assert.equal(aegis.state,'conditional');assert.equal(aegis.certainty,'unknown');assert.equal(aegis.condition?.kind,'battle-protocol');assert.equal(aegis.condition?.state,'unknown');assert.equal(aegis.source.ownerInstanceId,'datasmith');assert.equal(aegis.component,'stat');assert.equal(battleProtocols.operation,'reference');assert.equal(battleProtocols.state,'reference');assert.equal(battleProtocols.source.ownerInstanceId,'datasmith');

const priests={units:[{id:'priests',name:'Fulgurite Electro Priests'},{id:'character',name:'Tech Priest Manipulus'}],enhancements:[]};
const electro=api.projectGameEffects(priests,priests.units[0],context(priests,{priests:['character']})).find(effect=>effect.canonicalAbilityId==='datasheet-electro-infusion');
assert.equal(electro.operation,'reference');assert.equal(electro.source.ownerInstanceId,'character');assert.equal(electro.targetInstanceId,undefined);

const tl={units:[{id:'tl-owner',name:'Tech Priest Manipulus'},{id:'tl-other',name:'Tech Priest Manipulus'}],enhancements:[{name:'TL-4Ø9',ownerStatus:'resolved',ownerUnitId:'tl-owner'}]};
const tlEffect=api.projectGameEffects(tl,tl.units[0],context(tl)).find(effect=>effect.operation==='grant-profile');
assert.equal(tlEffect.source.id,'enhancement-tl-4-9');assert.equal(tlEffect.source.ownerInstanceId,'tl-owner');assert.equal(tlEffect.profile.name,'TL-4Ø9');assert.equal(api.projectGameEffects(tl,tl.units[1],context(tl)).some(effect=>effect.source.id==='enhancement-tl-4-9'),false);

console.log('AM SYNERGY-1A semantic QA: PASS');
