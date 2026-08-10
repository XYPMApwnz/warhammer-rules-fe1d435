import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {stratagemTypes} from '../scripts/stratagem-types.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const bookRoot=path.resolve(root,'..');
const reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8');
const codex=JSON.parse(fs.readFileSync(path.join(bookRoot,'content','emperors-children-codex-datasheets.en.json'),'utf8'));
const routeIds=[...reader.matchAll(/<(?:section|article)[^>]+id="((?:detachment|unit)-[^"]+)"/g)].map(match=>match[1]);
const routes=['index.html','army-rules.html','updates.html',...routeIds.map(id=>id.replace(/^(?:detachment|unit)-/,'')+'.html')];

assert.equal(new Set(routeIds).size,33,'Expected 10 Detachments and 23 Datasheets');
for(const route of routes){
  const html=fs.readFileSync(path.join(root,route),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=3/);
  assert.match(html,/\.\/phone-popup-controller\.js\?v=1/);
  assert.match(html,/data-view-switch/);
}
assert.equal(routes.length,36);
assert.equal(stratagemTypes.size,51);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='confirmed'&&item.canonicalType).length,36);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='source-untyped'&&item.canonicalType===null&&item.sourceLabel.endsWith(' Stratagem')).length,15);
assert.equal([...stratagemTypes.values()].filter(item=>item.typeStatus==='unexplained-unknown').length,0);
assert.ok(fs.readFileSync(path.join(root,'related-rules.inc'),'utf8').includes('related-detachment'));
const card=id=>{const start=reader.indexOf(`<article class="unit-card surface" id="${id}"`),end=reader.indexOf('<article class="unit-card',start+1);assert.ok(start>=0,`${id}: card missing`);return reader.slice(start,end<0?reader.length:end);};
const fullAbility=title=>new RegExp(`<h5><button class="term-button" data-term="[^"]+">${title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}<\\/button><\\/h5>`);
for(const title of ['Pistol','Precision','Hazardous','Psychic','Leader','Thrill Seekers','Deep Strike','Infiltrators','Fights First','Hover','Lone Operative','Supreme Commander','Scouts 6"','Deadly Demise D3','Deadly Demise D6','Feel No Pain 5+','Firing Deck 2','Damaged: 1-5 wounds remaining','Damaged: 1-6 Wounds Remaining'])assert.doesNotMatch(reader,fullAbility(title),`${title}: shared/Core ability rendered as a full card`);
for(const title of ['Warped Interference (Psychic)','Wracking Agonies (Psychic)'])assert.match(card('unit-sorcerer'),fullAbility(title),`${title}: Sorcerer-specific ability was compacted`);
assert.match(card('unit-chaos-rhino'),fullAbility('Assault Vehicle'),'Assault Vehicle: datasheet-specific ability was compacted');
const sourceWargearAbilities=codex.datasheets.flatMap(unit=>(unit.wargearAbilities||[]).map(ability=>({unit,ability})));
assert.deepEqual(sourceWargearAbilities.map(item=>[item.unit.title,item.ability.title]),[['Daemonettes','Daemonic Icon'],['Daemonettes','Instrument of Chaos'],['Infractors','Icon of Excess'],['Tormentors','Icon of Excess'],['Keeper of Secrets','Shining aegis'],['Seekers','Daemonic Icon'],['Seekers','Instrument of Chaos']]);
for(const {unit,ability} of sourceWargearAbilities){
  const id=`${unit.id.slice(5)}-wargear-abilities`,desktop=card(unit.id),phone=fs.readFileSync(path.join(root,`${unit.id.slice(5)}.html`),'utf8');
  for(const output of [desktop,phone]){assert.ok(output.includes(`id="${id}"`));assert.ok(output.includes('These abilities apply only while the corresponding wargear is equipped.'));assert.match(output,new RegExp(`<button class="term-button" data-term="[^"]+"[^>]*>${ability.title}<\\/button>`));}
}
console.log(`Emperor's Children Phone QA: ${routes.length} routes, 10 detachments, 23 datasheets.`);
