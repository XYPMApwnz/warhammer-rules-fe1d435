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
const explicitListFixture=createRosterFixture({catalog,pointsCatalog,id:'helper-explicit-list',detachmentIds:['renegade-warband'],units:[
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5},
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-2',quantity:5},
]});
assert.equal(explicitListFixture.record.sourceText,fixture.record.sourceText,'explicit Detachment fixture output remains byte-equivalent');

const noDetachmentFixture=createRosterFixture({catalog,pointsCatalog,id:'helper-no-detachment',units:[
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5},
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-2',quantity:5},
]});
const nullDetachmentFixture=createRosterFixture({catalog,pointsCatalog,id:'helper-null-detachment',detachmentId:null,units:[
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5},
  {datasheetId:'unit-chosen',instanceId:'parsed-unit-2',quantity:5},
]});
assert.deepEqual(noDetachmentFixture.detachments,[],'omitted Detachment produces an empty canonical list');
assert.deepEqual(nullDetachmentFixture.detachments,[],'null Detachment produces an empty canonical list');
assert.equal(nullDetachmentFixture.record.sourceText,noDetachmentFixture.record.sourceText,'null and omitted Detachment produce the same source');
assert.doesNotMatch(noDetachmentFixture.record.sourceText,/^\+ DETACHMENT:/m,'omitted Detachment emits no source line');
const noDetachmentRoster=sandbox.WHRosterParser.parse(noDetachmentFixture.record.sourceText);
assert.equal(noDetachmentRoster.detachment,'—');
assert.deepEqual(Array.from(noDetachmentRoster.detachments),[]);
assert.deepEqual(Array.from(noDetachmentRoster.units,unit=>unit.id),['parsed-unit-1','parsed-unit-2'],'physical instances remain distinct without a Detachment');
assert.throws(()=>createRosterFixture({catalog,pointsCatalog,id:'helper-no-detachment-enhancement',units:[{datasheetId:'unit-chaos-lord',instanceId:'parsed-unit-1',enhancementId:'enhancement-living-carapace'}]}),/is not owned by a selected Detachment/,'Enhancement remains fail-closed without its owning Detachment');
assert.throws(()=>createRosterFixture({catalog,pointsCatalog,id:'helper-unknown-detachment',detachmentId:'unknown-detachment',units:[{datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5}]}),/Detachment canonical ID/);
assert.throws(()=>createRosterFixture({catalog,pointsCatalog,id:'helper-title-detachment',detachmentId:'Renegade Warband',units:[{datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5}]}),/Detachment canonical ID/);

const dgSandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});dgSandbox.globalThis=dgSandbox;dgSandbox.window=dgSandbox;
for(const file of ['books/death-guard/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),dgSandbox,{filename:file});
const dgCatalog=dgSandbox.WH_BOOK_ROSTER_CATALOG,dgPoints=dgSandbox.WH_POINTS_CATALOG['death guard'],dgNoDetachment=createRosterFixture({catalog:dgCatalog,pointsCatalog:dgPoints,id:'dg-helper-no-detachment',units:[{datasheetId:'unit-plaguebearers',instanceId:'parsed-unit-1',quantity:10}]}),dgRoster=dgSandbox.WHRosterParser.parse(dgNoDetachment.record.sourceText);
assert.deepEqual(dgNoDetachment.detachments,[]);
assert.doesNotMatch(dgNoDetachment.record.sourceText,/^\+ DETACHMENT:/m);
assert.equal(dgRoster.detachment,'—');
assert.deepEqual(Array.from(dgRoster.detachments),[]);

const renamed=JSON.parse(JSON.stringify(catalog));
renamed.detachments.find(item=>item.id==='renegade-warband').title='Renamed Canonical Detachment';
renamed.units.find(item=>item.id==='unit-chosen').title='Renamed Canonical Datasheet';
const renamedFixture=createRosterFixture({catalog:renamed,pointsCatalog,id:'helper-rename',detachmentId:'renegade-warband',units:[{datasheetId:'unit-chosen',instanceId:'parsed-unit-1',quantity:5}]});
assert.match(renamedFixture.record.sourceText,/DETACHMENT: Renamed Canonical Detachment/);
assert.match(renamedFixture.record.sourceText,/5x Renamed Canonical Datasheet/);
const renamedRoster=sandbox.WHRosterParser.parse(renamedFixture.record.sourceText);
const renamedUnit=createCatalogGameUnit({catalog:renamed,datasheetId:'unit-chosen',instanceId:'parsed-unit-1'});
const behavior=sandbox.CSM_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedUnit,byInstance:new Map([[renamedUnit.identity.instanceId,renamedUnit]]),enhancements:[],detachments:[{id:'renegade-warband'}]});
assert.ok(behavior.some(effect=>effect.source?.id==='renegade-warband'));
assert.equal(renamedRoster.detachments[0].name,'Renamed Canonical Detachment');
assert.equal(renamedRoster.units[0].name,'Renamed Canonical Datasheet');

renamed.detachments.find(item=>item.id==='creations-of-bile').title='Renamed Enhancement Detachment';
renamed.enhancements.find(item=>item.id==='enhancement-living-carapace').title='Renamed Canonical Enhancement';
renamed.units.find(item=>item.id==='unit-chaos-lord').title='Renamed Enhancement Bearer';
const renamedEnhancementFixture=createRosterFixture({catalog:renamed,pointsCatalog,id:'helper-enhancement-rename',detachmentId:'creations-of-bile',units:[
  {datasheetId:'unit-chaos-lord',instanceId:'parsed-unit-1',enhancementId:'enhancement-living-carapace'},
  {datasheetId:'unit-chaos-lord',instanceId:'parsed-unit-2'},
]});
assert.match(renamedEnhancementFixture.record.sourceText,/Enhancement: Renamed Canonical Enhancement/);
assert.equal(renamedEnhancementFixture.record.sourceText.match(/1x Renamed Enhancement Bearer/g)?.length,2);
const renamedEnhancementRoster=sandbox.WHRosterParser.parse(renamedEnhancementFixture.record.sourceText),renamedEnhancementOwner=createCatalogGameUnit({catalog:renamed,datasheetId:'unit-chaos-lord',instanceId:'parsed-unit-1',enhancementIds:['enhancement-living-carapace']}),renamedEnhancementPeer=createCatalogGameUnit({catalog:renamed,datasheetId:'unit-chaos-lord',instanceId:'parsed-unit-2'}),csmByInstance=new Map([[renamedEnhancementOwner.identity.instanceId,renamedEnhancementOwner],[renamedEnhancementPeer.identity.instanceId,renamedEnhancementPeer]]),renamedLivingCarapace=renamed.enhancements.find(item=>item.id==='enhancement-living-carapace'),csmEnhancements=[{catalog:renamedLivingCarapace,input:{ownerStatus:'resolved',ownerUnitId:renamedEnhancementOwner.identity.instanceId}}],csmDetachments=[{id:'creations-of-bile'}];
const renamedEnhancementBehavior=sandbox.CSM_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedEnhancementOwner,byInstance:csmByInstance,enhancements:csmEnhancements,detachments:csmDetachments}),renamedEnhancementPeerBehavior=sandbox.CSM_ROSTER_SEMANTICS.gameEffects({gameUnit:renamedEnhancementPeer,byInstance:csmByInstance,enhancements:csmEnhancements,detachments:csmDetachments});
assert.equal(renamedEnhancementRoster.detachments[0].name,'Renamed Enhancement Detachment');
assert.equal(renamedEnhancementRoster.enhancements[0].name,'Renamed Canonical Enhancement');
assert.deepEqual(Array.from(renamedEnhancementRoster.units,item=>[item.id,item.name]),[['parsed-unit-1','Renamed Enhancement Bearer'],['parsed-unit-2','Renamed Enhancement Bearer']]);
assert.ok(renamedEnhancementBehavior.some(effect=>effect.source?.id==='enhancement-living-carapace'&&effect.operation==='add'&&effect.targetId==='W'),'CSM Enhancement behavior must remain keyed by canonical identity');
assert.equal(renamedEnhancementPeerBehavior.some(effect=>effect.source?.id==='enhancement-living-carapace'),false,'CSM Enhancement must not leak to a second physical Datasheet instance');

const ecSandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});ecSandbox.globalThis=ecSandbox;ecSandbox.window=ecSandbox;
for(const file of ['books/emperors-children/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js','books/emperors-children/scripts/roster-filter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ecSandbox,{filename:file});
const ecCatalog=ecSandbox.WH_BOOK_ROSTER_CATALOG,ecPoints=ecSandbox.WH_POINTS_CATALOG['emperor s children'],renamedEc=JSON.parse(JSON.stringify(ecCatalog));
renamedEc.detachments.find(item=>item.id==='spectacle-of-slaughter').title='Renamed EC Detachment';
renamedEc.enhancements.find(item=>item.id==='eager-patrons').title='Renamed Eager Patrons';
renamedEc.units.find(item=>item.id==='unit-flawless-blades').title='Renamed Flawless Blades';
const renamedEcFixture=createRosterFixture({catalog:renamedEc,pointsCatalog:ecPoints,id:'ec-helper-rename',detachmentId:'spectacle-of-slaughter',factionPrefix:'Chaos - ',units:[
  {datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',quantity:3,enhancementId:'eager-patrons'},
  {datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-2',quantity:3},
]});
assert.match(renamedEcFixture.record.sourceText,/DETACHMENT: Renamed EC Detachment/);
assert.match(renamedEcFixture.record.sourceText,/Enhancement: Renamed Eager Patrons \(\+20 pts\)/);
assert.equal(renamedEcFixture.record.sourceText.match(/3x Renamed Flawless Blades/g)?.length,2);
assert.deepEqual({detachmentId:renamedEcFixture.detachments[0].id,enhancementId:renamedEcFixture.units[0].enhancement.id},{detachmentId:'spectacle-of-slaughter',enhancementId:'eager-patrons'});
const renamedEcRoster=ecSandbox.WHRosterParser.parse(renamedEcFixture.record.sourceText),renamedEcUnit=createCatalogGameUnit({catalog:renamedEc,datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',enhancementIds:['eager-patrons']}),renamedEcPeer=createCatalogGameUnit({catalog:renamedEc,datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-2'}),ecByInstance=new Map([[renamedEcUnit.identity.instanceId,renamedEcUnit],[renamedEcPeer.identity.instanceId,renamedEcPeer]]);
renamedEcUnit.rosterState.detachments=['spectacle-of-slaughter'];renamedEcPeer.rosterState.detachments=['spectacle-of-slaughter'];
const renamedEnhancement=renamedEc.enhancements.find(item=>item.id==='eager-patrons'),ecEnhancements=[{catalog:renamedEnhancement,input:{ownerStatus:'resolved',ownerUnitId:renamedEcUnit.identity.instanceId}}],renamedEcBehavior=ecSandbox.ECRosterSemantics.projectEffects({gameUnit:renamedEcUnit,byInstance:ecByInstance,enhancements:ecEnhancements}),renamedEcPeerBehavior=ecSandbox.ECRosterSemantics.projectEffects({gameUnit:renamedEcPeer,byInstance:ecByInstance,enhancements:ecEnhancements});
assert.equal(renamedEcRoster.detachments[0].name,'Renamed EC Detachment');
assert.equal(renamedEcRoster.enhancements[0].name,'Renamed Eager Patrons');
assert.deepEqual(Array.from(renamedEcRoster.units,item=>[item.id,item.name]),[['parsed-unit-1','Renamed Flawless Blades'],['parsed-unit-2','Renamed Flawless Blades']]);
assert.ok(renamedEcBehavior.some(effect=>effect.id==='eager-patrons-move'&&effect.operation==='add'&&effect.targetId==='M'&&effect.delta===2),'EC behavior must remain keyed by canonical identities');
assert.equal(renamedEcPeerBehavior.some(effect=>effect.source?.id==='eager-patrons'),false,'Eager Patrons must not leak to a second physical Datasheet instance');
assert.throws(()=>createRosterFixture({catalog:ecCatalog,pointsCatalog:ecPoints,id:'ec-helper-wrong-detachment',detachmentId:'peerless-bladesmen',units:[{datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',quantity:3,enhancementId:'eager-patrons'}]}),/is not owned by a selected Detachment/);
for(const [label,change] of [
  ['Datasheet',input=>input.units[0].datasheetId='Flawless Blades'],
  ['Detachment',input=>input.detachmentId='Spectacle of Slaughter'],
  ['Enhancement',input=>input.units[0].enhancementId='Eager Patrons'],
]){
  const input={catalog:ecCatalog,pointsCatalog:ecPoints,id:'ec-helper-invalid',detachmentId:'spectacle-of-slaughter',units:[{datasheetId:'unit-flawless-blades',instanceId:'parsed-unit-1',quantity:3,enhancementId:'eager-patrons'}]};
  change(input);assert.throws(()=>createRosterFixture(input),new RegExp(`${label} canonical ID`));
}
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

const tauSandbox=vm.createContext({console,window:{},globalThis:null,addEventListener(){}});tauSandbox.globalThis=tauSandbox;tauSandbox.window=tauSandbox;
for(const file of ['books/tau-empire/scripts/roster-data.js','roster-guides/points-data.js','books/shared/roster-parser.js','books/tau-empire/scripts/roster-filter.js','books/shared/roster-context.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),tauSandbox,{filename:file});
const tauCatalog=tauSandbox.WH_BOOK_ROSTER_CATALOG,tauPoints=tauSandbox.WH_POINTS_CATALOG['t au empire'],renamedTau=JSON.parse(JSON.stringify(tauCatalog));
renamedTau.detachments.find(item=>item.id==='kauyon').title='Renamed T\'au Detachment';
renamedTau.enhancements.find(item=>item.id==='enhancement-precision-of-the-patient-hunter').title='Renamed T\'au Enhancement';
renamedTau.units.find(item=>item.id==='unit-cadre-fireblade').title='Renamed Cadre Fireblade';
const renamedTauFixture=createRosterFixture({catalog:renamedTau,pointsCatalog:tauPoints,id:'tau-helper-rename',detachmentId:'kauyon',attachments:{'parsed-unit-2':['parsed-unit-1']},units:[
  {datasheetId:'unit-cadre-fireblade',instanceId:'parsed-unit-1',selectionIds:['unit-cadre-fireblade-selection-close-combat-weapon','unit-cadre-fireblade-selection-fireblade-pulse-rifle']},
  {datasheetId:'unit-breacher-team',instanceId:'parsed-unit-2',quantity:10,selectionIds:['unit-breacher-team-selection-close-combat-weapon','unit-breacher-team-selection-pulse-blaster','unit-breacher-team-selection-pulse-pistol']},
  {datasheetId:'unit-breacher-team',instanceId:'parsed-unit-3',quantity:10,selectionIds:['unit-breacher-team-selection-close-combat-weapon','unit-breacher-team-selection-pulse-blaster','unit-breacher-team-selection-pulse-pistol']},
  {datasheetId:'unit-ethereal',instanceId:'parsed-unit-4',selectionIds:['unit-ethereal-selection-honour-stave'],enhancementId:'enhancement-precision-of-the-patient-hunter'},
]});
const renamedTauRoster=tauSandbox.WHRosterParser.parse(renamedTauFixture.record.sourceText),renamedTauProjection=tauSandbox.WHArmyRosterContext.project({catalog:renamedTau,roster:renamedTauRoster,record:renamedTauFixture.record,provider:{gameEffects:tauSandbox.TAURosterSemantics.projectEffects}}).game,renamedTauBody=renamedTauProjection.units.find(item=>item.identity.instanceId==='parsed-unit-2'),renamedTauPeer=renamedTauProjection.units.find(item=>item.identity.instanceId==='parsed-unit-3'),renamedTauEnhancementOwner=createCatalogGameUnit({catalog:renamedTau,datasheetId:'unit-ethereal',instanceId:'parsed-unit-4'}),renamedTauEnhancement=renamedTau.enhancements.find(item=>item.id==='enhancement-precision-of-the-patient-hunter'),renamedTauEnhancementEffects=tauSandbox.TAURosterSemantics.projectEffects({gameUnit:renamedTauEnhancementOwner,byInstance:new Map([['parsed-unit-4',renamedTauEnhancementOwner]]),enhancements:[{catalog:renamedTauEnhancement,input:{ownerStatus:'resolved',ownerUnitId:'parsed-unit-4'}}]});
assert.match(renamedTauFixture.record.sourceText,/DETACHMENT: Renamed T'au Detachment/);
assert.match(renamedTauFixture.record.sourceText,/Enhancement: Renamed T'au Enhancement/);
assert.equal(renamedTauRoster.detachments[0].name,"Renamed T'au Detachment");
assert.equal(renamedTauRoster.enhancements[0].name,"Renamed T'au Enhancement");
assert.equal(renamedTauRoster.units[0].name,'Renamed Cadre Fireblade');
assert.deepEqual(renamedTauFixture.units.slice(1,3).map(item=>[item.instanceId,item.datasheetId]),[['parsed-unit-2','unit-breacher-team'],['parsed-unit-3','unit-breacher-team']]);
assert.equal(renamedTauProjection.status,'ready','renamed T\'au fixture must remain fully resolved');
assert.ok(renamedTauBody.effects.some(effect=>effect.id==='volley-fire'&&effect.source?.ownerInstanceId==='parsed-unit-1'),'T\'au behavior must remain keyed by canonical and physical identities');
assert.equal(renamedTauPeer.effects.some(effect=>effect.id==='volley-fire'),false,'T\'au effect must not leak to a duplicate physical Datasheet instance');
assert.ok(renamedTauEnhancementEffects.some(effect=>effect.canonicalReference?.id==='enhancement-precision-of-the-patient-hunter'),'T\'au Enhancement behavior must remain keyed by canonical identity');
assert.throws(()=>createRosterFixture({catalog:tauCatalog,pointsCatalog:tauPoints,id:'tau-helper-wrong-datasheet',detachmentId:'kauyon',units:[{datasheetId:'Cadre Fireblade',instanceId:'parsed-unit-1'}]}),/Datasheet canonical ID/);
assert.throws(()=>createRosterFixture({catalog:tauCatalog,pointsCatalog:tauPoints,id:'tau-helper-wrong-detachment',detachmentId:'Kauyon',units:[{datasheetId:'unit-cadre-fireblade',instanceId:'parsed-unit-1'}]}),/Detachment canonical ID/);
assert.throws(()=>createRosterFixture({catalog:tauCatalog,pointsCatalog:tauPoints,id:'tau-helper-wrong-enhancement',detachmentId:'kauyon',units:[{datasheetId:'unit-ethereal',instanceId:'parsed-unit-1',enhancementId:'Precision of the Patient Hunter'}]}),/Enhancement canonical ID/);

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
