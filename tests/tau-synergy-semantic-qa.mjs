import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
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
