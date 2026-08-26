import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(new URL('../books/shared/roster-context.js',import.meta.url),'utf8'),context);
const ability={id:'unit-test-wargear-ability-banner',title:'Banner',text:'Models in this unit add 1 to their Objective Control characteristic.',sectionId:'unit-test-wargear-ability-banner'};
const catalog={schema:'wh40k-army-roster-catalog/v1',book:{id:'test-book',title:'Test Book'},detachments:[],detachmentRules:[],enhancements:[],units:[{id:'unit-test',title:'Test Unit',sourceBookId:'test-book',intrinsicKeywords:['TEST'],relations:{},gameSelections:{stats:{M:'6"',T:'4',Sv:'3+',W:'2',Ld:'6+',OC:'1'},models:[{id:'model-test',title:'Test Unit'}],weaponProfiles:[],abilities:[],wargearAbilities:[ability],selections:[{id:'selection-banner',title:'Banner',kind:'wargear',profileIds:[],wargearAbilityIds:[ability.id]}]}}]};
const roster={faction:'test-book',units:[{id:'instance-1',name:'Test Unit',quantity:1,wargear:'Banner'}],detachments:[],enhancements:[]},record={id:'selected-wargear-reference',attachments:{}};
const provider={gameEffects({gameUnit}){if(!gameUnit.selection.loadout.selectedWargearAbilityIds.includes(ability.id))return[];return[{id:'banner-reference',component:'ability',targetId:ability.id,operation:'reference',canonicalReference:{kind:'ability',id:ability.id},source:{kind:'selected-wargear',id:ability.id,ownerInstanceId:'instance-1'},targetInstanceId:'instance-1'}];}};
const selected=context.window.WHArmyRosterContext.project({catalog,roster,record,provider}).game.units[0],reference=selected.effects.find(effect=>effect.id==='banner-reference');
assert.deepEqual(Array.from(selected.selection.loadout.selectedWargearAbilityIds),[ability.id]);
assert.equal(reference.targetState,'resolved');assert.equal(reference.canonicalReference.id,ability.id);assert.equal(reference.canonicalReference.title,ability.title);assert.equal(reference.canonicalReference.text,ability.text);
const absent=context.window.WHArmyRosterContext.project({catalog,roster:{...roster,units:[{...roster.units[0],wargear:''}]},record,provider}).game.units[0];assert.equal(absent.effects.length,0,'unselected Wargear Ability must fail closed');
console.log('Selected-wargear canonical reference QA: PASS');
