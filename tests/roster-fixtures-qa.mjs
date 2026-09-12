import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createCatalogGameUnit,createRosterFixture} from './helpers/roster-fixtures.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});sandbox.globalThis=sandbox;sandbox.window=sandbox;
for(const file of ['books/chaos-space-marines/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js','books/chaos-space-marines/scripts/roster-filter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
const catalog=sandbox.WH_BOOK_ROSTER_CATALOG,pointsCatalog=sandbox.WH_POINTS_CATALOG['chaos space marines'];
const fixture=createRosterFixture({catalog,pointsCatalog,id:'helper-valid',detachmentId:'renegade-warband',units:[
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5},
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-2',quantity:5},
]});
const parsed=sandbox.WHRosterParser.parse(fixture.record.sourceText);
assert.equal(parsed.detachments[0].name,'Renegade Warband');
assert.deepEqual(Array.from(parsed.units,unit=>unit.id),['parsed-unit-1','parsed-unit-2']);
assert.deepEqual(Array.from(parsed.units,unit=>unit.name),['Chosen','Chosen']);
assert.deepEqual(fixture.units.map(unit=>unit.datasheetId),['unit-chosen','unit-chosen']);
assert.equal(fixture.totalPoints,270,'fixture points must come from the current canonical point tiers');

const renamed=JSON.parse(JSON.stringify(catalog));
renamed.detachments.find(item=>item.id==='renegade-warband').title='Renamed Canonical Detachment';
const renamedFixture=createRosterFixture({catalog:renamed,pointsCatalog,id:'helper-rename',detachmentId:'renegade-warband',units:[{datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5}]});
assert.match(renamedFixture.record.sourceText,/DETACHMENT: Renamed Canonical Detachment/);
const renamedRoster=sandbox.WHRosterParser.parse(renamedFixture.record.sourceText);
const renamedUnit=createCatalogGameUnit({catalog:renamed,datasheetId:'unit-chosen',instanceId:'parsed-unit-1'});
const behavior=sandbox.CSM_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedUnit,byInstance:new Map([[renamedUnit.identity.instanceId,renamedUnit]]),enhancements:[],detachments:[{id:'renegade-warband'}]});
assert.ok(behavior.some(effect=>effect.source?.id==='renegade-warband'));
assert.equal(renamedRoster.detachments[0].name,'Renamed Canonical Detachment');

const ecSandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});ecSandbox.globalThis=ecSandbox;ecSandbox.window=ecSandbox;
for(const file of ['books/emperors-children/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js','books/emperors-children/scripts/roster-filter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ecSandbox,{filename:file});
const ecCatalog=ecSandbox.WH_BOOK_ROSTER_CATALOG,ecPoints=ecSandbox.WH_POINTS_CATALOG['emperor s children'],renamedEc=JSON.parse(JSON.stringify(ecCatalog));
renamedEc.detachments.find(item=>item.id==='spectacle-of-slaughter').title='Renamed EC Detachment';
renamedEc.enhancements.find(item=>item.id==='eager-patrons').title='Renamed Eager Patrons';
const renamedEcFixture=createRosterFixture({catalog:renamedEc,pointsCatalog:ecPoints,id:'ec-helper-rename',detachmentId:'spectacle-of-slaughter',factionPrefix:'Chaos - ',units:[{datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',quantity:3,enhancementId:'eager-patrons'}]});
assert.match(renamedEcFixture.record.sourceText,/DETACHMENT: Renamed EC Detachment/);
assert.match(renamedEcFixture.record.sourceText,/Enhancement: Renamed Eager Patrons \(\+20 pts\)/);
assert.deepEqual({detachmentId:renamedEcFixture.detachments[0].id,enhancementId:renamedEcFixture.units[0].enhancement.id},{detachmentId:'spectacle-of-slaughter',enhancementId:'eager-patrons'});
const renamedEcRoster=ecSandbox.WHRosterParser.parse(renamedEcFixture.record.sourceText),renamedEcUnit=createCatalogGameUnit({catalog:renamedEc,datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',enhancementIds:['eager-patrons']});
renamedEcUnit.rosterState.detachments=['spectacle-of-slaughter'];
const renamedEnhancement=renamedEc.enhancements.find(item=>item.id==='eager-patrons'),renamedEcBehavior=ecSandbox.ECRosterSemantics.projectEffects({gameUnit:renamedEcUnit,byInstance:new Map([[renamedEcUnit.identity.instanceId,renamedEcUnit]]),enhancements:[{catalog:renamedEnhancement,input:{ownerStatus:'resolved',ownerUnitId:renamedEcUnit.identity.instanceId}}]});
assert.equal(renamedEcRoster.detachments[0].name,'Renamed EC Detachment');
assert.equal(renamedEcRoster.enhancements[0].name,'Renamed Eager Patrons');
assert.ok(renamedEcBehavior.some(effect=>effect.id==='eager-patrons-move'),'EC behavior must remain keyed by canonical identities');
assert.throws(()=>createRosterFixture({catalog:ecCatalog,pointsCatalog:ecPoints,id:'ec-helper-wrong-detachment',detachmentId:'peerless-bladesmen',units:[{datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',quantity:3,enhancementId:'eager-patrons'}]}),/is not owned by a selected Detachment/);
const multiEnhancement=createRosterFixture({catalog:ecCatalog,pointsCatalog:ecPoints,id:'ec-helper-multiple-enhancements',detachmentIds:['carnival-of-excess','frenzied-host'],factionPrefix:'Chaos - ',units:[{datasheetId:'unit-lord-exultant',instanceId:'parsed-unit-1',enhancementIds:['enhancement-dark-blessings','euphoric-crown']}]}),multiParsed=ecSandbox.WHRosterParser.parse(multiEnhancement.record.sourceText);
assert.deepEqual(Array.from(multiParsed.enhancements,item=>item.name),['Dark Blessings','Euphoric Crown']);
assert.equal(multiEnhancement.totalPoints,120,'multiple Enhancement costs must come from canonical identities');

const tyrSandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});tyrSandbox.globalThis=tyrSandbox;tyrSandbox.window=tyrSandbox;
for(const file of ['books/tyranids/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js','books/tyranids/scripts/roster-filter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),tyrSandbox,{filename:file});
const tyrCatalog=tyrSandbox.WH_BOOK_ROSTER_CATALOG,tyrPoints=tyrSandbox.WH_POINTS_CATALOG.tyranids,renamedTyr=JSON.parse(JSON.stringify(tyrCatalog));
renamedTyr.detachments.find(item=>item.id==='invasion-fleet').title='Renamed Tyranids Detachment';
renamedTyr.enhancements.find(item=>item.id==='enhancement-adaptive-biology').title='Renamed Adaptive Biology';
renamedTyr.units.find(item=>item.id==='unit-neurotyrant').title='Renamed Neurotyrant';
const renamedTyrFixture=createRosterFixture({catalog:renamedTyr,pointsCatalog:tyrPoints,id:'tyr-helper-rename',detachmentId:'invasion-fleet',units:[
  {datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-1',selectionIds:['unit-neurotyrant-selection-neurotyrant-claws-and-lashes','unit-neurotyrant-selection-psychic-scream'],enhancementId:'enhancement-adaptive-biology'},
  {datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-2',selectionIds:['unit-neurotyrant-selection-neurotyrant-claws-and-lashes','unit-neurotyrant-selection-psychic-scream']},
]});
assert.match(renamedTyrFixture.record.sourceText,/DETACHMENT: Renamed Tyranids Detachment/);
assert.match(renamedTyrFixture.record.sourceText,/Enhancement: Renamed Adaptive Biology/);
assert.equal(renamedTyrFixture.record.sourceText.match(/1x Renamed Neurotyrant/g)?.length,2);
assert.deepEqual(renamedTyrFixture.units.map(item=>[item.instanceId,item.datasheetId]),[['parsed-unit-1','unit-neurotyrant'],['parsed-unit-2','unit-neurotyrant']]);
const renamedTyrRoster=tyrSandbox.WHRosterParser.parse(renamedTyrFixture.record.sourceText),renamedTyrOwner=createCatalogGameUnit({catalog:renamedTyr,datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-1',enhancementIds:['enhancement-adaptive-biology']}),renamedTyrPeer=createCatalogGameUnit({catalog:renamedTyr,datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-2'}),tyrByInstance=new Map([[renamedTyrOwner.identity.instanceId,renamedTyrOwner],[renamedTyrPeer.identity.instanceId,renamedTyrPeer]]),renamedAdaptive=renamedTyr.enhancements.find(item=>item.id==='enhancement-adaptive-biology'),renamedTyrEnhancements=[{catalog:renamedAdaptive,input:{ownerStatus:'resolved',ownerUnitId:renamedTyrOwner.identity.instanceId}}],tyrDetachments=[{id:'invasion-fleet'}];
const renamedTyrBehavior=tyrSandbox.TYRANIDS_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedTyrOwner,byInstance:tyrByInstance,enhancements:renamedTyrEnhancements,detachments:tyrDetachments}),renamedTyrPeerBehavior=tyrSandbox.TYRANIDS_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedTyrPeer,byInstance:tyrByInstance,enhancements:renamedTyrEnhancements,detachments:tyrDetachments});
assert.equal(renamedTyrRoster.detachments[0].name,'Renamed Tyranids Detachment');
assert.equal(renamedTyrRoster.enhancements[0].name,'Renamed Adaptive Biology');
assert.deepEqual(Array.from(renamedTyrRoster.units,item=>[item.id,item.name]),[['parsed-unit-1','Renamed Neurotyrant'],['parsed-unit-2','Renamed Neurotyrant']]);
assert.ok(renamedTyrBehavior.some(effect=>effect.id==='enhancement-adaptive-biology:feel-no-pain'),'Tyranids Enhancement behavior must remain keyed by canonical identity');
assert.ok(renamedTyrBehavior.some(effect=>effect.source?.id==='invasion-fleet'),'Tyranids Detachment behavior must remain keyed by canonical identity');
assert.equal(renamedTyrPeerBehavior.some(effect=>effect.source?.id==='enhancement-adaptive-biology'),false,'Enhancement must not leak to a second physical Datasheet instance');
assert.throws(()=>createRosterFixture({catalog:tyrCatalog,pointsCatalog:tyrPoints,id:'tyr-helper-wrong-enhancement',detachmentId:'invasion-fleet',units:[{datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-1',enhancementId:'adaptive-biology'}]}),/Enhancement canonical ID/);
assert.throws(()=>createRosterFixture({catalog:tyrCatalog,pointsCatalog:tyrPoints,id:'tyr-helper-wrong-detachment',detachmentId:'synaptic-nexus',units:[{datasheetId:'unit-neurotyrant',instanceId:'parsed-unit-1',enhancementId:'enhancement-adaptive-biology'}]}),/is not owned by a selected Detachment/);

for(const [label,change] of [
  ['Datasheet',input=>input.units[0].datasheetId='Chosen'],
  ['Detachment',input=>input.detachmentId='Renegade Warband'],
  ['Enhancement',input=>input.units[0].enhancementId='Tzagulla'],
]){
  const input={catalog,pointsCatalog,id:'helper-invalid',detachmentId:'warpstrike-champions',units:[{datasheetId:'unit-chaos-lord-in-terminator-armour',instanceId:'parsed-unit-1',enhancementId:'enhancement-tzagulla'}]};
  change(input);assert.throws(()=>createRosterFixture(input),new RegExp(`${label} canonical ID`));
}
const ambiguous=JSON.parse(JSON.stringify(catalog));
ambiguous.units.push(JSON.parse(JSON.stringify(ambiguous.units.find(unit=>unit.id==='unit-chosen'))));
assert.throws(()=>createRosterFixture({catalog:ambiguous,pointsCatalog,id:'helper-ambiguous',detachmentId:'renegade-warband',units:[{datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5}]}),/Datasheet canonical ID.*resolved 2 records/);
const synthetic=createRosterFixture({catalog,pointsCatalog,id:'helper-synthetic',detachmentId:'deceptors',syntheticMetadataLines:['+ SYNTHETIC TEST VALUE: deliberately unresolved'],units:[{datasheetId:'unit-sorcerer',instanceId:'parsed-unit-1'}]});
assert.match(synthetic.record.sourceText,/SYNTHETIC TEST VALUE: deliberately unresolved/);
assert.equal(synthetic.units[0].title,'Sorcerer');
assert.throws(()=>createRosterFixture({catalog,pointsCatalog,id:'helper-instance',detachmentId:'deceptors',units:[{datasheetId:'unit-sorcerer',instanceId:'synthetic-unit'}]}),/Physical instance ID/);
console.log('Canonical roster fixture helper QA: PASS');
