import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'books/shared/roster-context.js'),'utf8');
const runtimeVersions=JSON.parse(fs.readFileSync(path.join(root,'books/shared/runtime-asset-versions.json'),'utf8'));
const sandbox={window:{},URLSearchParams};
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

for(const id of bookIds){
  const reader=fs.readFileSync(path.join(root,'books',id,'reader.html'),'utf8');
  const contextAt=reader.indexOf('../shared/roster-context.js?v=1');
  const appAt=reader.indexOf(`../shared/army-book-app.js?v=${runtimeVersions.shared.armyBook}`);
  assert.ok(contextAt>=0,`${id} does not load the shared roster context`);
  assert.ok(appAt>contextAt,`${id} loads WHArmyBook before the roster context`);
  const probe=api.create({status:'not-requested',book:{id}});
  assert.equal(probe.schema,api.SCHEMA,`${id} contract unavailable`);
}

const appSource=fs.readFileSync(path.join(root,'books/shared/army-book-app.js'),'utf8');
assert.match(appSource,/WHArmyRosterContext\?\.fromRuntime/);
assert.match(appSource,/rosterContextSettings\.provider/);
assert.match(appSource,/Object\.freeze\(\{navigation,popups,fullEntry,journey,relatedRules,rosterContext\}\)/);
for(const [id,file] of [['death-guard','books/death-guard/scripts/roster-filter.js'],['adeptus-mechanicus','books/adeptus-mechanicus/scripts/roster-filter.js']]){
  const adapter=fs.readFileSync(path.join(root,file),'utf8');
  assert.match(adapter,/rosterContext:Object\.freeze\(\{attachments:rosterContextAttachments\}\)/,`${id} thin adapter is absent`);
}
for(const id of ['dark-angels','blood-angels']){
  const app=fs.readFileSync(path.join(root,'books',id,'scripts/app.js'),'utf8');
  assert.match(app,/parentBookId["']?:["']space-marines["']/,`${id} supplement parent identity is absent`);
}

console.log('Shared roster context QA: 9/9 PASS');
