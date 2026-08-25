import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'books/shared/roster-context.js'),'utf8');
const runtimeVersions=JSON.parse(fs.readFileSync(path.join(root,'books/shared/runtime-asset-versions.json'),'utf8'));
const sandbox={window:{},URL,URLSearchParams};
vm.runInNewContext(source,sandbox,{filename:'roster-context.js'});
const api=sandbox.window.WHArmyRosterContext;
assert.equal(api.SCHEMA,'wh40k-army-roster-context/v1');

const bookIds=['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'];
for(const id of bookIds)assert.equal(source.includes(`'${id}'`)||source.includes(`"${id}"`),false,`shared core contains book-specific dispatch for ${id}`);

const fixture={
  status:'ready',
  rosterId:'fixture-roster',
  book:{id:'fixture-supplement',factionId:'fixture-faction',parentBookId:'fixture-parent'},
  detachment:{ids:['detachment-alpha'],state:'selected'},
  units:[
    {instanceId:'physical-1',datasheetId:'unit-example',title:'Example Unit',sourceBookId:'fixture-parent',keywords:{intrinsic:['INFANTRY','CORE'],added:['BATTLELINE'],removed:['CORE'],effective:['INFANTRY','BATTLELINE'],state:'known'}},
    {instanceId:'physical-2',datasheetId:'unit-example',title:'Example Unit',sourceBookId:'fixture-supplement',keywords:{state:'unknown'}}
  ],
  enhancements:[{ruleId:'enhancement-example',title:'Example Enhancement',detachmentId:'detachment-alpha',ownerInstanceId:'physical-2',ownerState:'resolved'}],
  relations:{
    attachments:{state:'known',entries:[{anchorInstanceId:'physical-1',memberInstanceIds:['physical-2'],state:'known',certainty:'current',provenance:'existing-book-semantics'}]},
    groups:{state:'known',entries:[{id:'rendered-group',instanceIds:['physical-1','physical-2'],state:'known',certainty:'current',provenance:'rendered-roster-state'}]},
    formations:{state:'unknown',entries:[]}
  }
};
const before=JSON.stringify(fixture);
const context=api.create(fixture);
assert.equal(JSON.stringify(fixture),before,'context creation mutated its input');
assert.equal(JSON.stringify(api.create(fixture)),JSON.stringify(context),'context creation is not deterministic');
assert.equal(Object.isFrozen(context),true);
assert.equal(Object.isFrozen(context.units),true);
assert.equal(Object.isFrozen(context.units[0].keywords),true);
assert.deepEqual([...context.units.map(unit=>unit.instanceId)],['physical-1','physical-2']);
assert.equal(context.units[0].datasheetId,context.units[1].datasheetId);
assert.equal(context.enhancements[0].owner.instanceId,'physical-2');
assert.equal(context.enhancements[0].owner.state,'resolved');
assert.deepEqual([...context.units[0].keywords.intrinsic],['INFANTRY','CORE']);
assert.deepEqual([...context.units[0].keywords.added],['BATTLELINE']);
assert.deepEqual([...context.units[0].keywords.removed],['CORE']);
assert.deepEqual([...context.units[0].keywords.effective],['INFANTRY','BATTLELINE']);
assert.equal(context.relations.attachments.entries[0].certainty,'current');
assert.equal(context.book.parentBookId,'fixture-parent');
assert.equal(context.units[1].source.bookId,'fixture-supplement');
assert.equal(context.relations.formations.state,'unknown');

const unknown=api.create({status:'ready',book:{id:'fixture'},units:[{title:'Unresolved'}]});
assert.equal(unknown.units[0].instanceState,'unknown');
assert.equal(unknown.units[0].datasheetState,'unknown');
assert.equal(unknown.units[0].keywords.state,'unknown');
assert.equal(unknown.relations.attachments.state,'unknown');

const catalog={schema:api.CATALOG_SCHEMA,book:{id:'fixture',title:'Fixture Book',factionKeyword:'FIXTURE FACTION',parentBookId:null,dependencies:[]},units:[{id:'unit-example',title:'Example Unit',sourceBookId:'fixture',intrinsicKeywords:['INFANTRY']}],detachments:[{id:'detachment-alpha',title:'Alpha'},{id:'detachment-beta',title:'Beta'}],enhancements:[]};
const validRoster={faction:'Fixture Faction',units:[{id:'physical-1',name:'Example Unit'}],detachments:[{name:'Alpha'}],enhancements:[]};
assert.equal(api.project({catalog,roster:validRoster,record:{id:'valid-roster'}}).context.status,'ready','valid complete projection did not restore the v1 ready status');
assert.equal(api.fromRuntime({force:true,catalog,bookId:'fixture',location:{search:''},storage:{getItem:()=>"[]"}}).status,'not-requested','no-roster v1 status changed');
assert.equal(api.fromRuntime({force:true,catalog,bookId:'fixture',location:{search:'?roster=missing'},storage:{getItem:()=>"[]"}}).status,'unavailable','invalid roster v1 status changed');
assert.equal(api.project({catalog,roster:{units:[{id:'physical-missing',name:'Missing Unit'}]},record:{id:'incomplete'}}).context.status,'unknown','incomplete unit projection was falsely marked ready');
assert.equal(api.project({catalog,roster:{units:[{id:'physical-1',name:'Example Unit'}],detachments:[{name:'Missing Detachment'}]},record:{id:'incomplete-detachment'}}).context.status,'unknown','incomplete Detachment projection was falsely marked ready');
let redirected=null;sandbox.window.location={href:'https://example.test/books/fixture/reader.html?roster=wrong',search:'',replace:value=>{redirected=value;}};
const incompatible=api.install({catalog,roster:{...validRoster,faction:'Other Faction'}});
assert.equal(incompatible.compatibility.state,'incompatible','wrong-faction roster was not classified as incompatible');
assert.equal(redirected,'https://example.test/roster-guides/index.html','wrong-faction roster did not fail closed to the canonical Roster Guides route');
redirected=null;assert.equal(api.install({catalog,roster:null}),null,'no-roster install contract changed');assert.equal(redirected,null,'no-roster state incorrectly redirected');
const incompleteInstall=api.install({catalog,roster:{faction:'Fixture Faction',units:[{id:'physical-missing',name:'Missing Unit'}]}});assert.equal(incompleteInstall.context.status,'unknown');assert.equal(redirected,null,'incomplete compatible projection incorrectly redirected');
const otherCatalog={...catalog,book:{...catalog.book,id:'other',title:'Other Book',factionKeyword:'OTHER FACTION'}};api.install({catalog:otherCatalog,roster:validRoster});assert.equal(redirected,'https://example.test/roster-guides/index.html','reverse wrong-faction roster did not use the generic fail-closed contract');
assert.equal(api.project({catalog,roster:{...validRoster,faction:'Xenos - Fixture Faction'}}).compatibility.state,'compatible','parent-qualified canonical faction identity was rejected');
redirected=null;const multiRoster={...validRoster,detachments:[{name:'Alpha'},{name:'Beta'}]},multiProjection=api.install({catalog,roster:multiRoster,guideGlobal:'FIXTURE_MULTI_GUIDE'});assert.deepEqual([...multiProjection.detachmentIds],['detachment-alpha','detachment-beta']);assert.deepEqual([...sandbox.window.FIXTURE_MULTI_GUIDE.detachmentIds],['detachment-alpha','detachment-beta'],'public multi-Detachment guide IDs diverged from projection order');
api.install({catalog,roster:validRoster,guideGlobal:'FIXTURE_SINGLE_GUIDE'});assert.deepEqual([...sandbox.window.FIXTURE_SINGLE_GUIDE.detachmentIds],['detachment-alpha'],'public single-Detachment guide IDs changed');
delete sandbox.window.FIXTURE_NO_ROSTER_GUIDE;assert.equal(api.install({catalog,roster:null,guideGlobal:'FIXTURE_NO_ROSTER_GUIDE'}),null);assert.equal(sandbox.window.FIXTURE_NO_ROSTER_GUIDE,undefined,'no-roster install synthesized public Detachment IDs');
api.install({catalog:otherCatalog,roster:{...validRoster,faction:'Other Faction'},guideGlobal:'FIXTURE_OTHER_GUIDE'});assert.deepEqual([...sandbox.window.FIXTURE_OTHER_GUIDE.detachmentIds],['detachment-alpha'],'second generic book did not receive shared Detachment IDs');

for(const id of bookIds){
  const reader=fs.readFileSync(path.join(root,'books',id,'reader.html'),'utf8');
  const contextAt=reader.indexOf(`../shared/roster-context.js?v=${runtimeVersions.shared.rosterContext}`);
  const appAt=reader.indexOf(`../shared/army-book-app.js?v=${runtimeVersions.shared.armyBook}`);
  assert.ok(contextAt>=0,`${id} does not load the shared roster context`);
  assert.ok(appAt>contextAt,`${id} loads WHArmyBook before the roster context`);
  const probe=api.create({status:'not-requested',book:{id}});
  assert.equal(probe.schema,api.SCHEMA,`${id} contract unavailable`);
}

const appSource=fs.readFileSync(path.join(root,'books/shared/army-book-app.js'),'utf8');
assert.match(appSource,/WHArmyRosterContext\?\.fromRuntime/);
assert.match(appSource,/rosterContextSettings\.provider/);
assert.match(appSource,/app=Object\.freeze\(\{navigation,popups,fullEntry,journey,relatedRules,rosterContext,initializeRoot,targetMount:/);
assert.match(appSource,/WH_ARMY_ROSTER_DECORATOR\?\.decorate\(mountRoot,initializeOptions\)/,'mounted target is not decorated from the shared roster projection with exact instance options');
for(const [id,file,provider] of [['death-guard','books/death-guard/scripts/roster-filter.js',/providerFactory\s*\(/],['adeptus-mechanicus','books/adeptus-mechanicus/scripts/roster-filter.js',/const provider\s*=\s*\{/]]){
  const adapter=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((adapter.match(/WHArmyRosterContext\.install\s*\(/g)||[]).length,1,`${id} does not have exactly one shared install owner`);
  assert.match(adapter,provider,`${id} thin provider is absent`);
  assert.doesNotMatch(adapter,/rosterContext:Object\.freeze\(\{attachments:rosterContextAttachments\}\)/,`${id} retains obsolete local roster-context orchestration`);
  assert.doesNotMatch(adapter,/querySelectorAll|data-rule-facts|DocumentFragment|display\s*:\s*none|offscreen/i,`${id} adapter reconstructs roster truth from hidden/full DOM`);
  assert.doesNotMatch(adapter,/WHArmyRosterContext\.(?:create|project)\s*\(/,`${id} adapter duplicates shared projection orchestration`);
}
const projectionSource=source.slice(source.indexOf('function project('),source.indexOf('function fromRuntime('));
assert.doesNotMatch(projectionSource,/document|querySelectorAll|data-rule-facts|DocumentFragment/i,'shared roster projection depends on full-book DOM');
for(const id of ['dark-angels','blood-angels']){
  const app=fs.readFileSync(path.join(root,'books',id,'scripts/app.js'),'utf8');
  assert.match(app,/parentBookId["']?:["']space-marines["']/,`${id} supplement parent identity is absent`);
}

console.log('Shared roster context QA: 9/9 PASS');
