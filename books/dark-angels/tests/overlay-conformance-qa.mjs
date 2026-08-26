import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repo=path.resolve(root,'../..');
const readJson=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const context={};context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'scripts/roster-data.js'),'utf8'),context);
const catalog=context.WH_BOOK_ROSTER_CATALOG;
const config=readJson('book.config.json');
const codex=readJson('content/dark-angels-codex-datasheets.en.json');
const related=readJson('content/dark-angels-related-rules.en.json');
const provider=fs.readFileSync(path.join(repo,'books/extensions/book-roster-enhancement-providers.js'),'utf8');

assert.equal(catalog.units.length,98,'effective DA Datasheet count');
const localUnitIds=new Set(codex.datasheets.map(unit=>unit.id));
assert.equal(catalog.units.filter(unit=>!localUnitIds.has(unit.id)).length,82,'inherited SM Datasheet count');
assert.equal(catalog.units.filter(unit=>localUnitIds.has(unit.id)).length,16,'DA-local Datasheet count');
assert.equal(catalog.detachments.length,24,'effective Detachment count');
assert.equal(catalog.detachmentRules.length,24,'all local and inherited Detachment Rules must be canonical');
assert.equal(catalog.enhancements.length,85,'effective Enhancement count');
const localEnhancements=catalog.enhancements.filter(item=>!item.dependencyBook);
assert.equal(localEnhancements.length,26,'DA-local Enhancement identities');
assert.equal(new Set(localEnhancements.map(item=>item.title)).size,25,'DA-local normalized Enhancement titles');
assert.ok(localEnhancements.every(item=>item.owner&&item.assignment),'local Enhancement eligibility must be explicit');
assert.equal(Object.keys(related.enhancements).length,26,'all local Enhancement contracts');
assert.equal(localEnhancements.filter(item=>item.title==='Deathwing Assault').length,2,'Deathwing Assault identities remain distinct');
assert.equal(new Set(localEnhancements.filter(item=>item.title==='Deathwing Assault').map(item=>item.id)).size,2,'Deathwing Assault IDs remain distinct');

const byId=new Map(catalog.units.map(unit=>[unit.id,unit]));
const relationEdges=catalog.units.flatMap(unit=>['canLead','canSupport'].flatMap(kind=>(unit.relations[kind]||[]).map(relation=>({source:unit.id,target:relation.unitId,kind}))));
const overlayEdges=relationEdges.filter(edge=>localUnitIds.has(edge.source)||localUnitIds.has(edge.target));
assert.equal(overlayEdges.length,50,'49 pre-existing DA overlay edges plus repaired Ezekiel relation');
assert.equal(overlayEdges.filter(edge=>!localUnitIds.has(edge.source)&&localUnitIds.has(edge.target)).length,11,'generic to chapter relations');
assert.equal(overlayEdges.filter(edge=>localUnitIds.has(edge.source)&&!localUnitIds.has(edge.target)).length,31,'chapter to generic relations including Ezekiel repair');
assert.equal(overlayEdges.filter(edge=>localUnitIds.has(edge.source)&&localUnitIds.has(edge.target)).length,8,'chapter to chapter relations');
const ezekiel=byId.get('unit-ezekiel');
assert.ok(ezekiel.relations.canLead.some(relation=>relation.unitId==='unit-sternguard-veteran-squad'),'Ezekiel exact Sternguard relation');
assert.ok(!JSON.stringify(codex.datasheets.find(unit=>unit.id==='unit-ezekiel').relations).includes('Sternguard Veterans Squad'),'obsolete fuzzy target removed');

for(const id of config.dependencyDatasheets.keywordOverlays.find(item=>item.keyword==='DEATHWING').unitIds)assert.ok(byId.get(id).intrinsicKeywords.includes('DEATHWING'),`${id} receives exact DEATHWING overlay`);
for(const id of config.dependencyDatasheets.keywordOverlays.find(item=>item.keyword==='RAVENWING').unitIds)assert.ok(byId.get(id).intrinsicKeywords.includes('RAVENWING'),`${id} receives exact RAVENWING overlay`);
assert.equal(config.dependencyDatasheets.keywordOverlays[0].unitIds.length,19,'DEATHWING overlay count');
assert.equal(config.dependencyDatasheets.keywordOverlays[1].unitIds.length,10,'RAVENWING overlay count');

for(const keyword of config.dependencyDatasheets.excludeAnyKeywords)assert.ok(!catalog.units.some(unit=>(unit.intrinsicKeywords||[]).includes(keyword)),`${keyword} dependency units remain excluded`);
assert.match(provider,/const daLocalConformanceEnhancements=new Map/);
assert.match(provider,/const daAttachedAbilitySemantics=new Map/);
assert.match(provider,/const daDetachmentSemantics=new Map/);
assert.doesNotMatch(provider,/const daNotes=new Map/);
assert.doesNotMatch(provider,/function applyDaEffect/);
assert.doesNotMatch(provider,/const daEffects=new Map/);
assert.doesNotMatch(provider,/if\s*\(.*bookId.*dark-angels/,'shared presentation must not branch on DA book ID');

const localAbilityIds=new Set(catalog.units.filter(unit=>localUnitIds.has(unit.id)).flatMap(unit=>unit.gameSelections.abilities.map(ability=>ability.id)));
assert.equal(localAbilityIds.size,39,'current generated DA-local Ability identity surface, including shared/core facts');
const localWeaponIds=new Set(catalog.units.filter(unit=>localUnitIds.has(unit.id)).flatMap(unit=>unit.gameSelections.weaponProfiles.map(weapon=>weapon.id)));
assert.equal(localWeaponIds.size,68,'current generated DA-local unit-qualified weapon profile surface');
const localWargearIds=new Set(catalog.units.filter(unit=>localUnitIds.has(unit.id)).flatMap(unit=>unit.gameSelections.wargearAbilities.map(ability=>ability.id)));
assert.equal(localWargearIds.size,3,'current generated DA-local selected-wargear identity surface');

console.log('Dark Angels overlay conformance QA passed: 98=82+16, 26 local Enhancements, 24 Detachment Rules, exact Ezekiel and chapter keyword overlays.');
