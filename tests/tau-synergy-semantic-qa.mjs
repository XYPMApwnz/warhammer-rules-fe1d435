import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),sources=new Map(),read=file=>{if(!sources.has(file))sources.set(file,fs.readFileSync(path.join(root,file),'utf8'));return sources.get(file);};
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const scope={console,WHRosterParser:{normalize},addEventListener(){}};scope.window=scope;scope.globalThis=scope;
vm.runInNewContext(read('books/tau-empire/scripts/roster-data.js'),scope,{filename:'tau-roster-data.js'});
vm.runInNewContext(read('books/tau-empire/scripts/roster-filter.js'),scope,{filename:'tau-roster-filter.js'});
const catalog=scope.WH_BOOK_ROSTER_CATALOG,semantics=scope.TAURosterSemantics;
assert.ok(semantics,'T\'au semantic provider API');
assert.equal(catalog.units.length,39,'Datasheet inventory');
assert.equal(catalog.units.reduce((sum,unit)=>sum+unit.gameSelections.abilities.length,0),190,'canonical Datasheet ability inventory');
assert.equal(catalog.enhancements.length,23,'canonical Enhancement inventory');
assert.equal(catalog.detachmentRules.length,7,'canonical Detachment Rule inventory');
assert.equal(catalog.units.reduce((sum,unit)=>sum+unit.gameSelections.wargearAbilities.length,0),52,'selected-wargear rule inventory');
for(const unit of catalog.units)for(const ability of unit.gameSelections.wargearAbilities){assert.equal(ability.requiredSelectionIds.length,1,`${unit.id}/${ability.id}: exact Wargear selection link`);const selection=unit.gameSelections.selections.find(item=>item.id===ability.requiredSelectionIds[0]);assert.ok(selection?.wargearAbilityIds.includes(ability.id),`${unit.id}/${ability.id}: reciprocal Wargear link`);}
for(const detachment of catalog.detachments)assert.equal(detachment.detachmentRuleIds.length,1,`${detachment.id}: canonical Detachment Rule link`);

const unit=id=>catalog.units.find(item=>item.id===id);
const draft=(instanceId,unitId,{detachments=[],wargear=[],quantity=1}={})=>{const catalogUnit=unit(unitId),selectedIds=catalogUnit.gameSelections.wargearAbilities.filter(item=>wargear.includes(item.title)).map(item=>item.id);return{identity:{instanceId,canonicalDatasheetId:unitId},item:{catalogUnit},selection:{modelCount:{value:quantity},loadout:{selectedWargearAbilityIds:selectedIds}},rosterState:{detachments,keywordProfile:{effective:catalogUnit.intrinsicKeywords}},attachments:{leaders:[],leading:[]}};};
const attach=(body,...leaders)=>{body.attachments.leaders=leaders.map(leader=>({instanceId:leader.identity.instanceId}));for(const leader of leaders)leader.attachments.leading=[{instanceId:body.identity.instanceId}];};
const effects=(target,units,enhancements=[])=>semantics.projectEffects({gameUnit:target,byInstance:new Map(units.map(item=>[item.identity.instanceId,item])),enhancements});
const has=(records,id)=>records.some(item=>item.id===id);

const fireblade=draft('fireblade-1','unit-cadre-fireblade'),breachers=draft('breachers-1','unit-breacher-team'),duplicate=draft('breachers-2','unit-breacher-team');attach(breachers,fireblade);
assert.ok(has(effects(breachers,[fireblade,breachers,duplicate]),'volley-fire'),'attached Bodyguard receives Volley Fire');
assert.ok(has(effects(fireblade,[fireblade,breachers,duplicate]),'volley-fire'),'Leader is part of its Attached Unit');
assert.equal(has(effects(duplicate,[fireblade,breachers,duplicate]),'volley-fire'),false,'same-canonical duplicate isolation');
const loneFireblade=draft('fireblade-lone','unit-cadre-fireblade');assert.equal(effects(loneFireblade,[loneFireblade]).length,0,'unattached Character does not lead itself');

// Fixed numeric facts, independent of the provider recipe and its actual delta.
const breacherBase={
  'unit-breacher-team-profile-pulse-pistol-ranged':'1',
  'unit-breacher-team-profile-pulse-blaster-ranged-3':'2',
  'unit-breacher-team-profile-close-combat-weapon-melee-2':'1'
};
const breacherVolley={
  'unit-breacher-team-profile-pulse-pistol-ranged':'2',
  'unit-breacher-team-profile-pulse-blaster-ranged-3':'3',
  'unit-breacher-team-profile-close-combat-weapon-melee-2':'1'
};
const firebladeBase={
  'unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged':'1',
  'unit-cadre-fireblade-profile-close-combat-weapon-melee-2':'3'
};
const firebladeVolley={
  'unit-cadre-fireblade-profile-fireblade-pulse-rifle-ranged':'2',
  'unit-cadre-fireblade-profile-close-combat-weapon-melee-2':'3'
};
vm.runInNewContext(read('books/shared/roster-context.js'),scope,{filename:'roster-context.js'});
const rawFireblade=id=>({id,name:'Cadre Fireblade',quantity:1,points:50,wargear:'Close combat weapon, Fireblade pulse rifle'});
const rawBreachers=id=>({id,name:'Breacher Team',quantity:10,points:100,models:[
  {name:"Breacher Fire Warrior Shas'ui",quantity:1,wargear:'Close combat weapon, Pulse blaster, Pulse pistol'},
  {name:'Breacher Fire Warrior',quantity:9,wargear:'Close combat weapon, Pulse blaster, Pulse pistol'}
]});
// The first same-datasheet Character is deliberately NOT the physical owner.
const volleyRoster={faction:"T'au Empire",units:[rawFireblade('fireblade-lone'),rawFireblade('fireblade-1'),rawBreachers('breachers-1'),rawBreachers('breachers-2')]};
const projectVolley=(attachments={'breachers-1':['fireblade-1']})=>scope.WHArmyRosterContext.project({catalog,roster:volleyRoster,record:{attachments},provider:{gameEffects:semantics.projectEffects}}).game;
const assertVolleyProjection=(projection,instanceId,canonicalId,base,expected,owner=null)=>{
  const member=projection.units.find(item=>item.identity.instanceId===instanceId);
  assert.ok(member,`${instanceId}: physical projection exists`);
  assert.equal(member.identity.canonicalDatasheetId,canonicalId,`${instanceId}: canonical identity`);
  assert.equal(member.selection.loadout.weaponResolution.state,'resolved',`${instanceId}: fixture equipment resolves`);
  assert.deepEqual(Array.from(member.selection.loadout.selectedProfileIds).sort(),Object.keys(expected).sort(),`${instanceId}: exact selected equipment`);
  for(const [profileId,value] of Object.entries(expected)){
    assert.equal(unit(canonicalId).gameSelections.weaponProfiles.find(profile=>profile.id===profileId)?.a,base[profileId],`${instanceId}/${profileId}: canonical base A`);
    assert.equal(member.effective.weaponProfiles.find(profile=>profile.id===profileId)?.values.A,value,`${instanceId}/${profileId}: semantic A`);
  }
  const volley=Array.from(member.effects).filter(effect=>effect.id==='volley-fire');
  assert.equal(volley.length,owner?1:0,`${instanceId}: exactly one owned Volley Fire, or none`);
  if(owner){
    const effect=volley[0];
    assert.deepEqual({id:effect.id,component:effect.component,targetId:effect.targetId,operation:effect.operation,stat:effect.stat,delta:effect.delta,targetInstanceId:effect.targetInstanceId,targetState:effect.targetState,state:effect.state,certainty:effect.certainty,source:{...effect.source}},
      {id:'volley-fire',component:'weapon',targetId:'ranged',operation:'add-stat',stat:'A',delta:1,targetInstanceId:instanceId,targetState:'resolved',state:'active',certainty:'current',source:{kind:'explicit-attachment',id:'tau-empire-ability-volley-fire',ownerInstanceId:owner}},`${instanceId}: exact Volley Fire recipe and physical owner`);
    const targets=Object.keys(expected).filter(id=>base[id]!==expected[id]).sort().map(profileId=>({profileId,field:'A',base:base[profileId],effective:expected[profileId]}));
    assert.deepEqual(Array.from(effect.targets,target=>({...target})).sort((a,b)=>a.profileId.localeCompare(b.profileId)),targets,`${instanceId}: exact ranged numeric reduction targets`);
  }
  return member;
};
const firstVolleyProjection=projectVolley();
for(const projection of [firstVolleyProjection,projectVolley(),projectVolley()]){
  assert.equal(projection.status,'ready','physical Volley Fire fixture is fully resolved');
  assert.equal(projection.units.length,4,'two physical Fireblades and two physical Breacher Teams');
  const body=assertVolleyProjection(projection,'breachers-1','unit-breacher-team',breacherBase,breacherVolley,'fireblade-1');
  const leader=assertVolleyProjection(projection,'fireblade-1','unit-cadre-fireblade',firebladeBase,firebladeVolley,'fireblade-1');
  const otherBody=assertVolleyProjection(projection,'breachers-2','unit-breacher-team',breacherBase,breacherBase);
  const otherLeader=assertVolleyProjection(projection,'fireblade-lone','unit-cadre-fireblade',firebladeBase,firebladeBase);
  assert.equal(body.selection.modelCount.value,10,'ten models do not multiply the per-profile bonus');
  assert.deepEqual(Array.from(body.attachments.leaders,item=>item.instanceId),['fireblade-1'],'exact physical leader attachment');
  assert.deepEqual(Array.from(leader.attachments.leading,item=>item.instanceId),['breachers-1'],'reciprocal physical bodyguard attachment');
  for(const member of [otherBody,otherLeader])assert.equal(member.attachments.leaders.length+member.attachments.leading.length,0,'unattached duplicate isolation');
  assert.equal(JSON.stringify(projection),JSON.stringify(firstVolleyProjection),'reprojection does not compound Volley Fire');
}
const unresolvedVolleyProjection=projectVolley({'breachers-1':['missing-fireblade']});
assertVolleyProjection(unresolvedVolleyProjection,'breachers-1','unit-breacher-team',breacherBase,breacherBase);
assertVolleyProjection(unresolvedVolleyProjection,'fireblade-1','unit-cadre-fireblade',firebladeBase,firebladeBase);

const ethereal=draft('ethereal-1','unit-ethereal'),strike=draft('strike-1','unit-strike-team');attach(strike,ethereal);
for(const member of [ethereal,strike])assert.ok(has(effects(member,[ethereal,strike]),'ethereal-fnp'),`${member.identity.instanceId}: attached FNP 5+`);
const coldstar=draft('coldstar-1','unit-commander-in-coldstar-battlesuit'),crisis=draft('crisis-1','unit-crisis-fireknife-battlesuits');attach(crisis,coldstar);
for(const member of [coldstar,crisis]){const records=effects(member,[coldstar,crisis]);assert.ok(has(records,'coldstar-move'));assert.ok(has(records,'coldstar-assault'));}

const kauyon=draft('kauyon-1','unit-breacher-team',{detachments:['kauyon']});const kauyonEffects=effects(kauyon,[kauyon]);assert.ok(kauyonEffects.some(item=>item.canonicalReference?.id===semantics.DETACHMENT_RULE.patient));assert.equal(kauyonEffects.some(item=>item.component==='weapon'),false,'unknown battle-round/Guided state is not auto-applied');
const experimental=draft('experimental-1','unit-commander-in-coldstar-battlesuit',{detachments:['experimental-prototype-cadre']});assert.ok(has(effects(experimental,[experimental]),'superior-craftsmanship'),'roster-known Detachment mutation');

const precisionOwner=draft('precision-1','unit-cadre-fireblade');const precisionResolution={input:{ownerStatus:'resolved',ownerUnitId:'precision-1'},catalog:catalog.enhancements.find(item=>item.id===semantics.ENHANCEMENT.precision)};const precisionEffects=effects(precisionOwner,[precisionOwner],[precisionResolution]);assert.ok(precisionEffects.some(item=>item.canonicalReference?.id===semantics.ENHANCEMENT.precision));assert.equal(precisionEffects.some(item=>item.operation!=='reference'),false,'Precision live roll modifiers are not profile mutations');
const shaper=draft('shaper-1','unit-kroot-war-shaper'),carnivores=draft('kroot-1','unit-kroot-carnivores');attach(carnivores,shaper);const kroothawkResolution={input:{ownerStatus:'resolved',ownerUnitId:'shaper-1'},catalog:catalog.enhancements.find(item=>item.id===semantics.ENHANCEMENT.kroothawk)};const krootEffects=effects(carnivores,[shaper,carnivores],[kroothawkResolution]);assert.ok(has(krootEffects,'kroothawk-cover'));assert.ok(krootEffects.some(item=>item.canonicalReference?.id===semantics.ENHANCEMENT.kroothawk),'Class C full canonical reference');

const droneEthereal=draft('drone-ethereal','unit-ethereal',{wargear:['Hover Drone','Marker Drone','Shield Drone']});const droneEffects=effects(droneEthereal,[droneEthereal]);for(const id of ['hover-drone-move','hover-drone-fly','marker-drone-keyword','shield-drone-wounds'])assert.ok(has(droneEffects,id),`selected Wargear effect ${id}`);
const shieldCommander=draft('shield-commander','unit-commander-in-coldstar-battlesuit',{wargear:['Shield Generator']});assert.ok(has(effects(shieldCommander,[shieldCommander]),'shield-generator-invulnerable'));
const pathfinder=draft('pathfinder-1','unit-pathfinder-team',{wargear:['Pulse Accelerator Drone','Recon Drone'],quantity:10});const pathEffects=effects(pathfinder,[pathfinder]);for(const id of ['pulse-accelerator-range','recon-drone-infiltrators','recon-drone-profile'])assert.ok(has(pathEffects,id),`selected Pathfinder Wargear effect ${id}`);

const localProvider=read('books/tau-empire/scripts/roster-filter.js'),legacyProvider=read('books/extensions/book-roster-enhancement-providers.js');
for(const text of ['Derived effect:','Apply the current','No permanent Datasheet mutation was applied'])assert.doesNotMatch(localProvider,new RegExp(text,'i'),`synthetic user-facing text: ${text}`);
assert.doesNotMatch(legacyProvider,/const tauEffects|applyTauEffect/,'legacy T\'au DOM effect provider removed');
console.log("T'au semantic conformance QA: PASS (39 Datasheets, 190 abilities, 23 Enhancements, 7 Detachment Rules, 52 selected-wargear rules).");
