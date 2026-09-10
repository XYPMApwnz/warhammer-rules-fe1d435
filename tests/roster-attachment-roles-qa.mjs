import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'books/shared/roster-context.js'),'utf8');
const local=value=>JSON.parse(JSON.stringify(value));
const load=(file,key)=>{const scope={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),scope);return local(scope.window[key]);};
const catalogs=Object.fromEntries(['space-marines','death-guard','adeptus-mechanicus'].map(book=>[book,load('books/'+book+'/scripts/roster-data.js','WH_BOOK_ROSTER_CATALOG')]));
const points=load('roster-guides/points-data.js','WH_POINTS_CATALOG');
const apiFor=text=>{const scope={window:{},URL,URLSearchParams};vm.runInNewContext(text,scope);return scope.window.WHArmyRosterContext;};
const physical=(catalog,id,instanceId)=>{const matches=catalog.units.filter(unit=>unit.id===id);assert.equal(matches.length,1,id+' exact canonical identity');return{instanceId,canonicalUnit:matches[0]};};
const sm=catalogs['space-marines'],dg=catalogs['death-guard'],am=catalogs['adeptus-mechanicus'];
const smUnits=[
  physical(sm,'unit-intercessor-squad','body-1'),physical(sm,'unit-intercessor-squad','body-2'),
  physical(sm,'unit-captain','captain-1'),physical(sm,'unit-captain','captain-2'),
  physical(sm,'unit-ancient','ancient-1'),physical(sm,'unit-ancient','ancient-2'),
  physical(sm,'unit-apothecary','apothecary-1'),physical(sm,'unit-apothecary','apothecary-2'),
  physical(sm,'unit-chaplain','chaplain-1')
];
const dgUnits=[physical(dg,'unit-plague-marines','body-1'),physical(dg,'unit-biologus-putrifier','biologus'),physical(dg,'unit-tallyman','tallyman'),physical(dg,'unit-malignant-plaguecaster','plaguecaster')];
const amUnits=[physical(am,'unit-kastelan-robots','body-1'),physical(am,'unit-cybernetica-datasmith','datasmith')];
const idOf=unit=>unit.unitId||unit.id;
const recordFor=(catalog,units,id='ra03-roles',attachments={})=>({
  id,name:'RA03 explicit attachment roles',sourceText:'',createdAt:'2026-09-11T00:00:00Z',updatedAt:'2026-09-11T00:00:00Z',attachments,
  roster:{faction:catalog.book.title,declared:900,calculated:900,unitLineTotal:900,detachments:[],enhancements:[],warnings:[],
    units:units.map(item=>({id:item.instanceId,canonicalUnitId:idOf(item.canonicalUnit),name:item.canonicalUnit.title,points:100,models:[{quantity:1,name:item.canonicalUnit.title,loadouts:[]}]}))}
});
function groupCheck(api,catalog,units,ids,accepted,label){
  const expected=ids.slice(0,accepted),before=JSON.stringify(units);
  let state={attachments:{}};
  for(const [ordinal,id] of ids.entries()){
    const candidates=api.attachments.candidates({units,attachments:state.attachments,bodyguardInstanceId:'body-1'});
    assert.equal(candidates.some(item=>item.instanceId===id),ordinal<accepted,label+': candidate '+id);
    state=api.attachments.attach({units,attachments:state.attachments,bodyguardInstanceId:'body-1',leaderInstanceId:id});
    assert.equal(state.changed,ordinal<accepted,label+': attachment '+id);
  }
  assert.deepEqual(local(state.attachments['body-1']||[]),expected,label+': final mapping');
  const saved={'body-1':ids},snapshot=JSON.stringify(saved);
  const clean=api.attachments.sanitize({units,attachments:saved});
  assert.deepEqual(local(clean.attachments['body-1']||[]),expected,label+': sanitize');
  assert.equal(clean.rejected.length,ids.length-accepted,label+': explicit rejection');
  assert.deepEqual(local(api.attachments.sanitize({units,attachments:local(clean.attachments)}).attachments),local(clean.attachments),label+': deterministic reload');
  assert.equal(JSON.stringify(saved),snapshot,label+': saved input immutable');
  assert.equal(JSON.stringify(units),before,label+': canonical input immutable');
  if(catalog){
    const record=recordFor(catalog,units,'ra03-projection',saved),recordBefore=JSON.stringify(record);
    const projected=api.project({catalog,roster:record.roster,record});
    assert.deepEqual(local(projected.record.attachments),local(clean.attachments),label+': personal projection sanitation');
    const body=projected.game.units.find(unit=>unit.identity.instanceId==='body-1');
    assert.deepEqual(local(body.attachments.leaders.map(item=>item.instanceId)),expected,label+': physical current group');
    assert.equal(JSON.stringify(record),recordBefore,label+': raw record immutable');
  }
}
const positiveSM=[['captain-1'],['ancient-1'],['apothecary-1'],['captain-1','apothecary-1'],['apothecary-1','captain-1'],['captain-1','ancient-1'],['ancient-1','captain-1']];
const positiveDG=[['biologus','plaguecaster'],['plaguecaster','biologus'],['biologus','tallyman'],['tallyman','biologus']];
function checks(text=source){
  const api=apiFor(text);
  for(const ids of positiveSM)groupCheck(api,sm,smUnits,ids,ids.length,'SM positive '+ids.join('+'));
  for(const ids of positiveDG)groupCheck(api,dg,dgUnits,ids,2,ids.includes('plaguecaster')?'DG dual-role + Leader '+ids.join('+'):'DG two dual-role '+ids.join('+'));
  for(const pair of [['ancient-1','apothecary-1'],['apothecary-1','ancient-1']])groupCheck(api,sm,smUnits,pair,1,'two-Support negative '+pair.join('+'));
  for(const pair of [['captain-1','chaplain-1'],['chaplain-1','captain-1']])groupCheck(api,sm,smUnits,pair,1,'two-Leader negative '+pair.join('+'));
  groupCheck(api,sm,smUnits,['captain-1','ancient-1','apothecary-1'],2,'capacity two');
  groupCheck(api,sm,smUnits,['captain-1','captain-2'],1,'duplicate canonical character');
  groupCheck(api,sm,smUnits,['body-1'],0,'self attachment');
  groupCheck(api,sm,smUnits,['missing-physical'],0,'unresolved physical owner');
  const unsupported=[physical(sm,'unit-terminator-squad','body-1'),physical(sm,'unit-apothecary','apothecary-1')];
  groupCheck(api,sm,unsupported,['apothecary-1'],0,'missing canonical relation');
  const reused=api.attachments.sanitize({units:smUnits,attachments:{'body-1':['captain-1'],'body-2':['captain-1']}});
  assert.deepEqual(local(reused.attachments),{'body-1':['captain-1']},'physical Character cannot be reused');
  assert.equal(reused.rejected[0].reason,'leader-already-attached');
  const separate=api.attachments.sanitize({units:smUnits,attachments:{'body-1':['ancient-1'],'body-2':['ancient-2']}});
  assert.deepEqual(local(separate.attachments),{'body-1':['ancient-1'],'body-2':['ancient-2']},'same Datasheet, separate physical groups');
  const detached=api.attachments.detach({units:smUnits,attachments:separate.attachments,bodyguardInstanceId:'body-1',leaderInstanceId:'ancient-1'});
  assert.deepEqual(local(detached.attachments),{'body-2':['ancient-2']},'detach cannot affect other physical group');
  const inverseOnly=local(smUnits);
  for(const unit of inverseOnly){unit.canonicalUnit.relations.canLead=[];unit.canonicalUnit.relations.canSupport=[];}
  groupCheck(api,null,inverseOnly,['captain-1','ancient-1'],2,'inverse-only valid roles');
  groupCheck(api,null,inverseOnly,['ancient-1','apothecary-1'],1,'inverse-only two Supports');
  const directOnly=local(smUnits);
  for(const unit of directOnly){unit.canonicalUnit.relations.canBeLedBy=[];unit.canonicalUnit.relations.canBeSupportedBy=[];}
  groupCheck(api,null,directOnly,['ancient-1','captain-1'],2,'direct-only valid roles');
  groupCheck(api,null,directOnly,['apothecary-1','ancient-1'],1,'direct-only two Supports');
  const noFacts=local(smUnits);
  for(const unit of noFacts)unit.canonicalUnit.relations={canLead:[],canSupport:[],canBeLedBy:[],canBeSupportedBy:[]};
  groupCheck(api,null,noFacts,['captain-1'],0,'names/keywords cannot invent a relation');
  const capacityOne=local(smUnits);
  capacityOne.find(unit=>unit.instanceId==='captain-1').canonicalUnit.relations.canLead.find(edge=>edge.unitId==='unit-intercessor-squad').maxCharacters=1;
  groupCheck(api,null,capacityOne,['captain-1','ancient-1'],1,'explicit capacity one preserved');
  const pointUnits=smUnits.map(unit=>{const matches=Object.values(points['space marines'].units).filter(row=>row.unitId===unit.canonicalUnit.id);assert.equal(matches.length,1,'points fixture stable ID');return{instanceId:unit.instanceId,canonicalUnit:matches[0]};});
  groupCheck(api,null,pointUnits,['ancient-1','apothecary-1'],1,'editor catalog two Supports');
  groupCheck(api,null,pointUnits,['apothecary-1','captain-1'],2,'editor catalog Leader Support');
  groupCheck(api,am,amUnits,['datasmith'],1,'mandatory Datasmith support');
  const relation=local(api.attachments.relation(amUnits[0],amUnits[1]));
  assert.deepEqual(relation,{...amUnits[1].canonicalUnit.relations.canSupport[0],kind:'support'},'Datasmith metadata unchanged');
  assert.equal(relation.mandatory,true);
  assert.equal(relation.maxCharacters,1);
  assert.deepEqual(relation.removeKeywords,['INFANTRY']);
  const inverseSmith=local(amUnits);inverseSmith[1].canonicalUnit.relations.canSupport=[];
  assert.deepEqual(local(api.attachments.relation(inverseSmith[0],inverseSmith[1])),{...amUnits[0].canonicalUnit.relations.canBeSupportedBy[0],kind:'support'},'inverse relation metadata unchanged');
  assert.equal(api.attachments.sanitize({units:amUnits,attachments:{}}).rejected.length,0,'mandatory metadata does not invent an attachment');
  return true;
}
function mutations(){
  const guard="if(!attachmentRolesFeasible(bodyguard,leaders))return 'role-assignment';";
  assert.ok(source.includes(guard),'exact role boundary mutation anchor');
  const variants=[
    ['M1_OLD_PREDICATE',"if(leaders.length>1&&!leaders.some(item=>attachmentSupport(bodyguard,item)))return 'support-required';",/two-Support negative/],
    ['M2_SUPPORT_COUNT',"if(leaders.filter(item=>attachmentSupport(bodyguard,item)).length>1)return 'role-assignment';",/DG two dual-role/],
    ['M3_GREEDY_ROLE',"if(new Set(leaders.map(item=>attachmentRoles(bodyguard,item)[0])).size!==leaders.length)return 'role-assignment';",/DG dual-role \+ Leader/],
    ['M4_CAPACITY_ONLY','',/two-Support negative/]
  ];
  for(const [name,replacement,expected] of variants){
    const mutant=source.replace(guard,replacement);assert.notEqual(mutant,source);
    let killed=false;try{checks(mutant);}catch(error){assert.match(error.message,expected,name+': intended oracle');killed=true;}
    assert.equal(killed,true,name+': mutation survived');console.log(name+': KILLED');
  }
  checks();console.log('Restored role-assignment QA: PASS');
}
async function browserChecks(){
  const {createServer}=await import('node:http'),{chromium}=await import('playwright');
  const server=createServer((request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.writeHead(204).end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');response.end(fs.readFileSync(file));}catch{response.writeHead(404).end('Not found');}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({channel:'chrome',headless:true}),errors=[];
  const saved=(page,id)=>page.evaluate(id=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).find(row=>row.id===id),id);
  const edit=async(page,id)=>{await page.goto(origin+'/roster-guides/index.html');await page.locator('[data-edit-attachments="'+id+'"]').click();};
  const select=(page,body,value)=>page.locator('select[data-attachment-bodyguard="'+body+'"]').filter({has:page.locator('option[value="'+value+'"]')});
  const mount=async(page,record,catalog,body='body-1')=>{
    const raw=record.roster.units.find(unit=>unit.id===body);
    await page.goto(origin+'/books/'+catalog.book.id+'/reader.html?view=mobile&roster='+record.id+'&rosterInstance='+body+'#'+raw.canonicalUnitId);
    await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units?.some(unit=>unit.identity.instanceId===id)&&document.querySelector('.unit-card.roster-game-view[data-roster-instance="'+id+'"]'),body);
    return page.evaluate(id=>({mapping:window.WH_ARMY_ROSTER_PROJECTION.record.attachments,leaders:window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===id).attachments.leaders.map(item=>item.instanceId)}),body);
  };
  const withRecord=async(record,run)=>{
    const ctx=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
    try{await ctx.addInitScript(record=>{if(!localStorage.getItem('wh40k-rosters-v1'))localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record]));},record);const page=await ctx.newPage();page.on('pageerror',error=>errors.push(error.message));await run(page);}finally{await ctx.close();}
  };
  try{
    for(const pair of [['ancient-1','apothecary-1'],['apothecary-1','ancient-1']]){
      const record=recordFor(sm,smUnits,'ra03-negative-'+pair[0]);
      await withRecord(record,async page=>{
        await edit(page,record.id);await select(page,'body-1',pair[0]).selectOption(pair[0]);
        assert.equal(await select(page,'body-1',pair[1]).count(),0,'editor must not offer second Support');
        assert.deepEqual((await saved(page,record.id)).attachments['body-1'],[pair[0]],'illegal second Support not persisted');
        await page.evaluate(({id,pair})=>{const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1'));records.find(row=>row.id===id).attachments={'body-1':pair};localStorage.setItem('wh40k-rosters-v1',JSON.stringify(records));},{id:record.id,pair});
        const mounted=await mount(page,record,sm);
        assert.deepEqual(mounted.mapping,{'body-1':[pair[0]]},'stale saved illegal mapping sanitized');
        assert.deepEqual(mounted.leaders,[pair[0]],'personal projection rejects stale Support');
        await edit(page,record.id);assert.equal(await select(page,'body-1',pair[1]).count(),0,'reloaded editor rejects stale Support');
        await select(page,'body-1','captain-1').selectOption('captain-1');
        assert.deepEqual((await saved(page,record.id)).attachments['body-1'],[pair[0],'captain-1'],'normal edit persists sanitized valid group');
      });
      console.log('BROWSER two-Support negative + stale mapping PASS '+pair.join('+'));
    }
    const cases=[...positiveSM.filter(ids=>ids.length===2).map(ids=>({catalog:sm,units:smUnits,ids})),...positiveDG.map(ids=>({catalog:dg,units:dgUnits,ids}))];
    for(const [index,item] of cases.entries()){
      const record=recordFor(item.catalog,item.units,'ra03-positive-'+index);
      await withRecord(record,async page=>{
        await edit(page,record.id);for(const id of item.ids)await select(page,'body-1',id).selectOption(id);
        await page.reload();assert.deepEqual((await saved(page,record.id)).attachments['body-1'],item.ids,'valid group survives reload');
        assert.deepEqual((await mount(page,record,item.catalog)).leaders,item.ids,'valid current physical group');
        if(item.catalog===sm&&item.ids.includes('apothecary-1')){
          await edit(page,record.id);await select(page,'body-1','remove:apothecary-1').selectOption('remove:apothecary-1');
          assert.deepEqual((await saved(page,record.id)).attachments['body-1'],['captain-1'],'detach preserves Captain');
          await select(page,'body-1','apothecary-1').selectOption('apothecary-1');
          assert.deepEqual((await saved(page,record.id)).attachments['body-1'],['captain-1','apothecary-1'],'reattach legal Support');
        }
      });
      console.log('BROWSER role assignment + reload PASS '+item.ids.join('+'));
    }
    const record=recordFor(sm,smUnits,'ra03-physical-isolation');
    await withRecord(record,async page=>{
      await edit(page,record.id);await select(page,'body-1','ancient-1').selectOption('ancient-1');
      assert.equal(await select(page,'body-2','ancient-1').count(),0,'same physical Character not offered twice');
      await select(page,'body-2','ancient-2').selectOption('ancient-2');
      assert.deepEqual((await saved(page,record.id)).attachments,{'body-1':['ancient-1'],'body-2':['ancient-2']},'two physical groups');
      assert.deepEqual((await mount(page,record,sm,'body-1')).leaders,['ancient-1']);
      assert.deepEqual((await mount(page,record,sm,'body-2')).leaders,['ancient-2']);
      await edit(page,record.id);await select(page,'body-1','remove:ancient-1').selectOption('remove:ancient-1');
      assert.deepEqual((await saved(page,record.id)).attachments,{'body-2':['ancient-2']},'detach isolated physical copy');
    });
    assert.deepEqual(errors,[],'role-assignment browser exceptions');
    console.log('RA03 browser: PASS (11 scenarios; editor, stale mapping, reload, detach/reattach, physical isolation)');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
checks();console.log('RA03 feasible attachment role QA: PASS (canonical + points catalogs; direct/inverse; capacity; physical IDs; Datasmith)');
if(process.argv.includes('--mutations'))mutations();
if(process.argv.includes('--browser'))await browserChecks();
