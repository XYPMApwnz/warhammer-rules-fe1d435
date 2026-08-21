import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import ruleFacts from '../books/shared/rule-facts.js';
import {conditionsFor,createCompatibleRulesLoader,createCompatibleRulesSource,loadCompatibleRulesSource,validateCompatibleRulesMatrix} from '../books/shared/compatible-rules-matrix.mjs';
import {createStratagemPresentation} from '../books/shared/stratagem-presentation.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const matrix=JSON.parse(read('books/space-marines/generated/compatible-rules.json'));
const source=createCompatibleRulesSource(matrix,{schema:'space-marines-compatible-rules/v1'});
const [unitId,rows]=Object.entries(matrix.units).find(([,items])=>items.some(row=>row.scope==='core')&&items.some(row=>row.detachmentId));
const detachmentRow=rows.find(row=>row.detachmentId),coreRow=rows.find(row=>row.scope==='core');
const filtered=source.rowsForUnit(unitId,{detachmentId:`detachment-${detachmentRow.detachmentId}`});

assert.equal(source.schema,matrix.schema);
assert.equal(source.hasUnit(unitId),true);
assert(filtered.includes(detachmentRow));
assert(filtered.includes(coreRow));
assert(filtered.every(row=>row.scope==='core'||row.detachmentId===detachmentRow.detachmentId));
assert.deepEqual(conditionsFor({condition:'attachment-unknown'}),['attachment-unknown']);
assert.deepEqual(conditionsFor({condition:'a',conditions:['a','b','a']}),['a','b']);

const conditional=Object.values(matrix.units).flat().find(row=>row.state==='conditional'&&conditionsFor(row).includes('attachment-unknown'));
assert(conditional,'Space Marines matrix must prove attachment-unknown row preservation');
assert.equal(source.rowsForUnit(Object.keys(matrix.units).find(id=>matrix.units[id].includes(conditional))).includes(conditional),true);
assert.equal(ruleFacts.staticCompatible(conditional),false);

const loaded=await loadCompatibleRulesSource('matrix.json',{schema:matrix.schema,fetch:async url=>({ok:url==='matrix.json',status:200,json:async()=>matrix})});
assert.equal(loaded.hasUnit(unitId),true);
let lazyRequests=0;
const lazy=createCompatibleRulesLoader('matrix.json',{schema:matrix.schema,fetch:async()=>{lazyRequests++;return{ok:true,status:200,json:async()=>matrix};}});
assert.equal(lazy.hasUnit(unitId),true);
assert.deepEqual(lazy.rowsForUnit(unitId),[]);
await lazy.load();
assert.equal(lazyRequests,1);
assert.equal(lazy.rowsForUnit(unitId).length,source.rowsForUnit(unitId).length);
await lazy.load();
assert.equal(lazyRequests,1,'lazy Compatible Rules source must be cached after its first use');
assert.throws(()=>validateCompatibleRulesMatrix(matrix,{schema:'wrong-schema'}),/Unsupported Compatible Rules schema/);
assert.throws(()=>validateCompatibleRulesMatrix({schema:'test/v1',units:{unit:[{ruleId:'rule',state:'match',conditions:[1]}]}},{schema:'test/v1'}),/conditions must be strings/);

const armyBook=read('books/shared/army-book-app.js'),relatedRules=read('books/shared/army-related-rules.js'),spaceMarines=read('books/space-marines/scripts/app.js'),darkAngels=read('books/dark-angels/scripts/app.js'),bloodAngels=read('books/blood-angels/scripts/app.js');
const relatedSandbox={window:{WHRuleFacts:{normalizeKeyword:value=>String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}}};
vm.runInNewContext(relatedRules,relatedSandbox);
const resolveDetachments=relatedSandbox.window.WHArmyRelatedRules.resolveRosterDetachmentIds,section=(id,title)=>({dataset:{detachment:id},querySelector:()=>({textContent:title})}),detachmentSections=[section('explicit','Explicit'),section('single-detachment','Single Detachment'),section('second-detachment','Second Detachment')];
assert.deepEqual([...resolveDetachments({detachmentIds:['detachment-explicit'],detachments:[{label:'Single Detachment'}]},detachmentSections)],['explicit']);
assert.deepEqual([...resolveDetachments({detachmentIds:[],detachments:[{label:'Single Detachment'}]},detachmentSections)],['single-detachment']);
assert.deepEqual([...resolveDetachments({detachments:[{label:'Single Detachment'},{label:'Second Detachment'}]},detachmentSections)],[]);
assert.deepEqual([...resolveDetachments({detachment:{label:'Unresolved Detachment'}},detachmentSections)],[]);
assert.match(armyBook,/relatedConfig=config\.relatedRules/);
assert.match(armyBook,/extensions\.forEach/);
assert.match(armyBook,/return app/);
assert.match(relatedRules,/rowsForUnit/);
assert.match(spaceMarines,/shared\/compatible-rules-matrix\.mjs/);
assert.match(spaceMarines,/createCompatibleRulesLoader/);
assert.match(spaceMarines,/window\.WHArmyBook\.install/);
assert(!fs.existsSync(path.join(root,'books/space-marines/scripts/compatible-rules-runtime.mjs')));
assert.match(darkAngels,/relatedRules:\{enabled:true\}/);
assert.match(darkAngels,/extensions:/);
assert.match(bloodAngels,/createCompatibleRulesLoader/);
assert.match(bloodAngels,/shared\/stratagem-presentation\.mjs/);
assert.match(bloodAngels,/window\.WHArmyBook\.install/);
assert.equal(JSON.parse(read('books/blood-angels/book.config.json')).sharedArmyBookApp,true);
assert(!fs.existsSync(path.join(root,'books/blood-angels/scripts/compatible-rules-runtime.mjs')));
for(const book of ['tau-empire','emperors-children','tyranids','chaos-space-marines']){
  const app=read(`books/${book}/scripts/app.js`),config=JSON.parse(read(`books/${book}/book.config.json`));
  assert.match(app,/window\.WHArmyBook\.install/);
  assert.match(app,/shared\/compatible-rules-matrix\.mjs/);
  assert.match(app,/shared\/stratagem-presentation\.mjs/);
  assert.equal(config.sharedArmyBookApp,true);
  assert(!fs.existsSync(path.join(root,`books/${book}/scripts/compatible-rules-runtime.mjs`)));
}
const adeptusMechanicus=read('books/adeptus-mechanicus/scripts/app.js');
assert.match(adeptusMechanicus,/window\.WHArmyBook\.install/);
assert.match(adeptusMechanicus,/shared\/compatible-rules-matrix\.mjs/);
assert.match(adeptusMechanicus,/shared\/stratagem-presentation\.mjs/);
assert(!fs.existsSync(path.join(root,'books/adeptus-mechanicus/scripts/compatible-rules-runtime.mjs')));
const deathGuard=read('books/death-guard/scripts/app.js'),deathGuardReader=read('books/death-guard/reader.html');
assert.match(deathGuard,/window\.WHArmyBook\.install/);
assert.match(deathGuard,/createCompatibleRulesLoader/);
assert.match(deathGuard,/shared\/compatible-rules-matrix\.mjs/);
assert.match(deathGuard,/shared\/stratagem-presentation\.mjs/);
assert.match(deathGuardReader,/shared\/army-related-rules\.js/);
assert.match(deathGuardReader,/shared\/army-book-app\.js/);
assert(!fs.existsSync(path.join(root,'books/death-guard/scripts/compatible-stratagems-runtime.mjs')));
assert.doesNotMatch(armyBook,/bookId\s*===/);

const presentationCases=[
  ['confirmed',{canonicalType:'battle-tactic',typeStatus:'confirmed',sourceLabel:'Battle Tactic Stratagem'},'Decorative label','battle-tactic','Battle Tactic Stratagem'],
  ['source-untyped',{canonicalType:null,typeStatus:'source-untyped',sourceLabel:'Exact Source Stratagem'},'Battle Tactic Stratagem','source-untyped','Exact Source Stratagem'],
  ['unknown',{canonicalType:null,typeStatus:'unknown'},'Wargear Stratagem','unknown','Type unverified']
];
const cards=presentationCases.map(([id,,label])=>{const typeNode={textContent:label,classList:{add(){}},remove(){}},host={append(node){this.node=node;}};return{dataset:{ruleId:id},querySelectorAll:selector=>selector==='.stratagem-type'?[typeNode]:[],querySelector:selector=>selector==='.stratagem-head'?{querySelector:()=>host}:null,typeNode};});
createStratagemPresentation({types:new Map(presentationCases.map(([id,metadata])=>[id,metadata])),labelMode:'exact'}).decorateTypes({querySelectorAll:()=>cards});
presentationCases.forEach(([id,,,type,label],index)=>{assert.equal(cards[index].dataset.stratagemType,type,`${id}: provenance status`);assert.equal(cards[index].typeNode.textContent,label,`${id}: source label`);});

console.log('Shared Army Book runtime QA passed.');
