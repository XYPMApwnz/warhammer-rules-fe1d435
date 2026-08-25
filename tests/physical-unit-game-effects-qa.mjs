import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const dgScope={window:{WHRosterEnhancements:{enriched:roster=>roster.enhancements||[]},WHRosterEntities:{weaponFamily:value=>String(value||'').toLowerCase(),loadoutIncludesProfile:()=>false}}};
vm.runInNewContext(fs.readFileSync(new URL('../books/death-guard/scripts/roster-semantics.js',import.meta.url),'utf8'),dgScope,{filename:'dg-roster-semantics.js'});
const dgRoster={units:[{id:'dg-body',name:'Poxwalkers',points:120,models:[{quantity:20,name:'Poxwalker',wargear:'Improvised weapon'}]},{id:'dg-leader-a',name:'Icon Bearer',points:55,models:[{quantity:1,name:'Icon Bearer',wargear:'Plague knife'}]},{id:'dg-leader-b',name:'Icon Bearer',points:55,models:[{quantity:1,name:'Icon Bearer',wargear:'Plague knife'}]}],enhancements:[]};
const dgIds=new Map([['dg-body','unit-poxwalkers'],['dg-leader-a','unit-icon-bearer'],['dg-leader-b','unit-icon-bearer']]);
const dg=dgScope.window.DGRosterSemantics.createContext({roster:dgRoster,attachments:{'dg-body':['dg-leader-b']},profileFor:unit=>({unitId:dgIds.get(unit.id),keywords:unit.id==='dg-body'?['INFANTRY']:['CHARACTER']})});
const dgEffects=dg.projectEffects(dgRoster.units[0],'unit-poxwalkers',['detachment-shamblerot-vectorium'],null);
assert.ok(dgEffects.some(effect=>effect.targetId==='BATTLELINE'&&effect.source.id==='detachment-shamblerot-vectorium'));
assert.ok(dgEffects.some(effect=>effect.targetId==='OC'&&effect.source.ownerInstanceId==='dg-leader-b'));
assert.equal(dg.projectEffects(dgRoster.units[0],'unit-poxwalkers',['detachment-shamblerot-vectorium'],null).some(effect=>effect.source.ownerInstanceId==='dg-leader-a'),false);

const amScope={window:{WH_POINTS_CATALOG:{'adeptus mechanicus':{units:{'skitarii rangers':{id:'unit-skitarii-rangers',keywords:['RANGERS','SKITARII','INFANTRY']},'tech priest manipulus':{id:'unit-tech-priest-manipulus',keywords:['CHARACTER','TECH-PRIEST']}},enhancements:{}}},WH40K_GLOSSARY:{forBook:()=>({})}}};
vm.runInNewContext(fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-enhancements.js',import.meta.url),'utf8'),amScope,{filename:'am-roster-enhancements.js'});
const amRoster={units:[{id:'am-body',name:'Skitarii Rangers',points:85},{id:'am-leader-a',name:'Tech Priest Manipulus',points:60},{id:'am-leader-b',name:'Tech Priest Manipulus',points:60}],enhancements:[]};
const baseContext={attachments:{'am-body':['am-leader-b']},unitById:new Map(amRoster.units.map(unit=>[unit.id,unit])),detachmentIds:new Set(['detachment-cohort-acquisitus'])};
const amEffects=amScope.window.AMRosterEnhancements.projectGameEffects(amRoster,amRoster.units[0],baseContext);
assert.ok(amEffects.some(effect=>effect.targetId==='RECON AUGURY'&&effect.source.id==='detachment-cohort-acquisitus'));
assert.ok(amEffects.some(effect=>effect.id==='galvanic-field'&&effect.source.ownerInstanceId==='am-leader-b'));
const potentialOnly=amScope.window.AMRosterEnhancements.projectGameEffects(amRoster,amRoster.units[0],{...baseContext,attachments:{}});
assert.equal(potentialOnly.some(effect=>effect.id==='galvanic-field'),false);
const amSource=fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-enhancements.js',import.meta.url),'utf8');
for(const id of ['detachment-cohort-acquisitus','detachment-lords-of-the-forge','detachment-luminen-auto-choir','detachment-cohort-cybernetica','detachment-skitarii-hunter-cohort'])assert.match(amSource,new RegExp(`has\\('${id}'\\)`));
const dgFilter=fs.readFileSync(new URL('../books/death-guard/scripts/roster-filter.js',import.meta.url),'utf8'),dgSource=fs.readFileSync(new URL('../books/death-guard/scripts/roster-semantics.js',import.meta.url),'utf8'),amFilter=fs.readFileSync(new URL('../books/adeptus-mechanicus/scripts/roster-filter.js',import.meta.url),'utf8');
assert.match(dgFilter,/items\[0\]\?\.game\?\.effects/);assert.match(amFilter,/items\[0\]\?\.game\?\.effects/);assert.match(dgSource,/if \(Array\.isArray\(projectedEffects\)\)/);assert.match(amSource,/Object\.freeze\(\{resolveDetachment,resolveOwnership,filterCompatibleRules,projectGameEffects,decorate,enriched\}\)/);assert.doesNotMatch(amSource,/context\.projectedEffects/);assert.doesNotMatch(dgFilter,/querySelectorAll|data-rule-facts|DocumentFragment/);assert.doesNotMatch(amFilter,/querySelectorAll|data-rule-facts|DocumentFragment/);
console.log('Physical-unit DG/AM game effects QA: PASS');
