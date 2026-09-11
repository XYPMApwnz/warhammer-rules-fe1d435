import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(process.env.WBA058_ROOT||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'));
const {chromium}=createRequire(path.join(root,'package.json'))('playwright');
const override=process.env.WBA058_APP_OVERRIDE?await readFile(process.env.WBA058_APP_OVERRIDE):null;
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){response.writeHead(204);response.end();return;}
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.setHeader('Cache-Control','no-store');
    response.end(override&&file===path.join(root,'roster-guides/app.js')?override:await readFile(file));
  }catch{response.writeHead(404);response.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser,context,page;
const key='wh40k-rosters-v1',dialogs=[],errors=[];
let confirmDelete=false;
async function start(){
  browser=await chromium.launch({channel:'chrome',headless:true});
  context=await browser.newContext({serviceWorkers:'block',acceptDownloads:true,viewport:{width:1280,height:900}});
  page=await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror',error=>{if(page.url().includes('/roster-guides/'))errors.push(error.message);});
  page.on('dialog',dialog=>{
    dialogs.push({type:dialog.type(),message:dialog.message()});
    if(dialog.type()==='confirm'&&!confirmDelete)void dialog.dismiss();else void dialog.accept();
  });
  await guides();
}
async function stop(){
  if(context)await context.close();
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
async function guides(){
  await page.goto(origin+'/roster-guides/index.html');
  await page.waitForFunction(()=>window.WHRosterParser&&window.WHRosterPoints&&window.WH_POINTS_CATALOG&&window.WHArmyRosterContext&&document.querySelector('#import-roster-file'));
}
const stored=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)||'[]'),key);
const card=record=>page.locator('.saved-card').filter({has:page.getByRole('heading',{name:record.name,exact:true})});
async function fixture(id,label,odd=false){
  const canonical=await page.evaluate(()=>{
    const units=Object.values(window.WH_POINTS_CATALOG['space marines'].units);
    const captain=units.find(unit=>unit.unitId==='unit-captain');
    const edge=captain?.relations?.canLead?.find(edge=>units.some(unit=>unit.unitId===edge.unitId));
    const body=units.find(unit=>unit.unitId===edge?.unitId);
    if(!captain||!body)throw new Error('WBA058 canonical Captain/bodyguard fixture unavailable');
    const value=unit=>Number(unit.points?.[0]?.value??unit.points?.[0]?.points??0);
    return{captain:{id:captain.unitId,title:captain.title,points:value(captain)},body:{id:body.unitId,title:body.title,points:value(body)}};
  });
  const suffix=odd?'"&\u0414\u0430\u043d\u043d\u044b\u0435':'plain';
  const ids={bodyA:label+'-body-a-'+suffix,bodyB:label+'-body-b-'+suffix,leaderA:label+'-leader-a-'+suffix,leaderB:label+'-leader-b-'+suffix};
  const unit=(id,c)=>({id,name:c.title,points:c.points,models:[{quantity:1,name:c.title,loadouts:[]}]});
  const total=2*canonical.captain.points+2*canonical.body.points;
  return{id,name:'WBA058 '+label,createdAt:'2026-09-09T00:00:00.000Z',updatedAt:'2026-09-09T00:00:00.000Z',sourceText:'',attachments:{},
    roster:{faction:'Space Marines',declared:total,calculated:total,unitLineTotal:total,exportMatches:true,disposition:'Strike Force',detachments:[],enhancements:[],warnings:[],
      units:[unit(ids.bodyA,canonical.body),unit(ids.bodyB,canonical.body),unit(ids.leaderA,canonical.captain),unit(ids.leaderB,canonical.captain)]}};
}
async function importRecord(record,valid=true){
  const before=dialogs.length;
  await page.locator('#import-roster-file').setInputFiles({name:'roster.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(record))});
  await page.waitForFunction(()=>document.querySelector('#import-roster-file').value==='');
  if(valid){
    await page.waitForFunction(({key,id})=>JSON.parse(localStorage.getItem(key)||'[]').some(record=>record.id===id),{key,id:record.id});
    assert.deepEqual(dialogs.slice(before),[],'valid opaque backup must not be rejected');
  }else{
    assert.equal(dialogs.at(-1)?.message,'Could not import the roster backup.','invalid ID rejection');
    assert.equal(dialogs.length,before+1,'one invalid-backup alert');
  }
}
async function snapshot(){
  return page.evaluate(()=>{
    const nodes=[...document.querySelectorAll('#saved-roster-list *, #roster-result *')];
    return{events:nodes.flatMap(node=>[...node.attributes].filter(attr=>/^on/i.test(attr.name)).map(attr=>({tag:node.tagName,name:attr.name,value:attr.value}))),
      injected:nodes.filter(node=>node.hasAttribute('data-wba058')).length,marker:window.__WBA058_MARKER??null,
      cards:document.querySelectorAll('.saved-grid > .saved-card').length,
      controls:[...document.querySelectorAll('.saved-card .actions')].map(node=>node.querySelectorAll('button').length)};
  });
}

async function safeState(expectedCount){
  const state=await snapshot();
  assert.deepEqual(state.events,[],'WBA058: imported IDs must not create event attributes');
  assert.equal(state.injected,0,'WBA058: IDs must not expand attribute structure');
  assert.equal(state.marker,null,'WBA058: harmless marker must remain unset');
  assert.equal(state.cards,expectedCount,'exact saved-card structure');
  assert.deepEqual(state.controls,Array(expectedCount).fill(4),'exact Open/Attachments/Export/Delete controls');
}
async function safeActions(record){
  const values=await card(record).locator('.actions > button').evaluateAll(nodes=>nodes.map(node=>Object.values(node.dataset)[0]));
  assert.deepEqual(values,Array(4).fill(record.id),'all action datasets preserve exact ID');
  for(const name of ['Open','Attachments','Export','Delete'])await card(record).getByRole('button',{name,exact:true}).hover();
}
async function selectFor(bodyId,adding){
  const index=await page.locator('#roster-result select').evaluateAll((nodes,{bodyId,adding})=>nodes.findIndex(node=>node.dataset.attachmentBodyguard===bodyId&&[...node.options].some(option=>option.value==='')===adding),{bodyId,adding});
  assert.notEqual(index,-1,'physical attachment select must exist');
  return page.locator('#roster-result select').nth(index);
}
async function attachmentControls(record,count){
  const [bodyA,bodyB,leaderA,leaderB]=record.roster.units.map(unit=>unit.id);
  await card(record).getByRole('button',{name:'Attachments',exact:true}).click();
  assert.equal(await page.locator('#roster-result .units > li').count(),4,'no physical unit collapse');
  let selects=await page.locator('#roster-result select').evaluateAll(nodes=>nodes.map(node=>({roster:node.dataset.rosterId,body:node.dataset.attachmentBodyguard,values:[...node.options].map(option=>option.value)})));
  assert.deepEqual(selects,[bodyA,bodyB].map(body=>({roster:record.id,body,values:['',leaderA,leaderB]})),'exact select/option identifiers');
  await safeState(count);
  await (await selectFor(bodyA,true)).selectOption(leaderB);
  await (await selectFor(bodyB,true)).selectOption(leaderA);
  let saved=(await stored()).find(item=>item.id===record.id);
  assert.deepEqual(saved.attachments,{[bodyA]:[leaderB],[bodyB]:[leaderA]},'attachment routing/physical copy isolation');
  assert.deepEqual(saved.roster.units.map(unit=>unit.id),[bodyA,bodyB,leaderA,leaderB],'unit IDs unchanged');
  await page.reload();
  await card(record).getByRole('button',{name:'Attachments',exact:true}).click();
  const assigned=await (await selectFor(bodyA,false)).evaluate(node=>({roster:node.dataset.rosterId,body:node.dataset.attachmentBodyguard,values:[...node.options].map(option=>option.value),selected:node.querySelector('option[selected]')?.value}));
  assert.deepEqual(assigned,{roster:record.id,body:bodyA,values:[leaderB,'remove:'+leaderB],selected:leaderB},'assigned and removal option values after reload');
  await (await selectFor(bodyA,false)).selectOption('remove:'+leaderB);
  saved=(await stored()).find(item=>item.id===record.id);
  assert.deepEqual(saved.attachments,{[bodyB]:[leaderA]},'detach does not affect the other copy');
  await safeState(count);
}
async function exportRecord(record){
  const waiting=page.waitForEvent('download');
  await card(record).getByRole('button',{name:'Export',exact:true}).click();
  const download=await waiting,stream=await download.createReadStream();
  assert.ok(stream,'actual export download stream');
  const parts=[];for await(const part of stream)parts.push(part);
  const exported=JSON.parse(Buffer.concat(parts).toString('utf8'));
  assert.equal(exported.id,record.id,'Export exact roster lookup');
  assert.deepEqual(exported.roster.units.map(unit=>unit.id),record.roster.units.map(unit=>unit.id),'export exact physical identities');
  return exported;
}
async function openRecord(record){
  const waiting=page.waitForURL(url=>url.pathname.includes('/books/space-marines/')&&url.searchParams.get('roster')===record.id);
  await card(record).getByRole('button',{name:'Open',exact:true}).click();
  await waiting;
  assert.equal(new URL(page.url()).searchParams.get('roster'),record.id,'Open exact target lookup/query');
  await guides();
}
try{
  await start();
  const definitions=[
    ['ascii','ordinary-opaque-id'],
    ['quote','opaque "double" and \'single\''],
    ['ampersand','opaque&copy;&amp;value'],
    ['unicode','opaque-\u0414\u0435\u043d\u0438\u0441-\u65e5\u672c\u8a9e'],
    ['marker','normal-prefix" data-wba058="injected" onmouseover="window.__WBA058_MARKER=1']
  ];
  const records=[];
  for(const [label,id]of definitions){
    const record=await fixture(id,label,label!=='ascii');records.push(record);
    await importRecord(record);
    assert.deepEqual((await stored()).map(item=>item.id),records.map(item=>item.id).reverse(),'unchanged import/storage IDs');
    await safeActions(record);
    await safeState(records.length);
    await page.reload();
    await safeActions(record);
    await safeState(records.length);
  }
  for(const record of records){
    await attachmentControls(record,records.length);
    const exported=await exportRecord(record);
    await importRecord(exported);
    assert.equal((await stored()).filter(item=>item.id===record.id).length,1,'reimport replaces exact record, no ID remapping/duplicate');
    await openRecord(record);
    await safeState(records.length);
    console.log('PASS opaque UI fixture: '+record.name);
  }
  const beforeInvalid=await stored();
  const duplicatePhysicalId=structuredClone(records[0]);
  duplicatePhysicalId.id='duplicate-physical-id';
  duplicatePhysicalId.name='WBA010 duplicate physical identity';
  duplicatePhysicalId.roster.units[1].id=duplicatePhysicalId.roster.units[0].id;
  await importRecord(duplicatePhysicalId,false);
  assert.deepEqual(await stored(),beforeInvalid,'colliding physical IDs must not change stored records');
  const whitespaceDuplicatePhysicalId=structuredClone(records[0]);
  whitespaceDuplicatePhysicalId.id='whitespace-duplicate-physical-id';
  whitespaceDuplicatePhysicalId.name='WBA010 whitespace duplicate physical identity';
  whitespaceDuplicatePhysicalId.roster.units[1].id=` ${whitespaceDuplicatePhysicalId.roster.units[0].id} `;
  await importRecord(whitespaceDuplicatePhysicalId,false);
  assert.deepEqual(await stored(),beforeInvalid,'physical IDs colliding after trim must not change stored records');
  const canonicalPhysicalId=structuredClone(records[0]);
  canonicalPhysicalId.id='canonical-physical-id';
  canonicalPhysicalId.name='WBA010 canonical/physical identity collision';
  canonicalPhysicalId.roster.units[2].id='unit-captain';
  await importRecord(canonicalPhysicalId,false);
  assert.deepEqual(await stored(),beforeInvalid,'canonical Datasheet IDs must not be accepted as physical IDs');
  const whitespaceCanonicalPhysicalId=structuredClone(records[0]);
  whitespaceCanonicalPhysicalId.id='whitespace-canonical-physical-id';
  whitespaceCanonicalPhysicalId.name='WBA010 whitespace canonical/physical identity collision';
  whitespaceCanonicalPhysicalId.roster.units[2].id=' unit-captain ';
  await importRecord(whitespaceCanonicalPhysicalId,false);
  assert.deepEqual(await stored(),beforeInvalid,'canonical Datasheet IDs padded with whitespace must not be accepted as physical IDs');
  for(const badId of [undefined,42,' \t ']){
    const invalid=structuredClone(records[0]);
    if(badId===undefined)delete invalid.id;else invalid.id=badId;
    await importRecord(invalid,false);
    assert.deepEqual(await stored(),beforeInvalid,'invalid IDs must not change stored records');
  }
  // Already-persisted records bypass import validation and need the same safe renderer.
  await page.evaluate(({key,record})=>localStorage.setItem(key,JSON.stringify([record])),{key,record:records.at(-1)});
  await page.reload();
  await safeActions(records.at(-1));
  await safeState(1);
  await attachmentControls(records.at(-1),1);
  // Restore isolated test records, then prove cancel/confirm routes through every exact ID.
  await page.evaluate(({key,records})=>localStorage.setItem(key,JSON.stringify(records)),{key,records});
  await page.reload();
  for(const [index,record]of records.entries()){
    confirmDelete=false;
    const before=await stored();
    await card(record).getByRole('button',{name:'Delete',exact:true}).click();
    assert.deepEqual(await stored(),before,'cancel deletion preserves exact records');
    confirmDelete=true;
    await card(record).getByRole('button',{name:'Delete',exact:true}).click();
    assert.deepEqual((await stored()).map(item=>item.id),records.slice(index+1).map(item=>item.id),'delete only intended exact record');
    await safeState(records.length-index-1);
  }
  assert.deepEqual(errors,[],'Roster Guides runtime errors');
  assert.equal(dialogs.filter(item=>item.type==='alert').length,7,'only schema-negative alerts');
  console.log('WBA058/WBA010 backup identifier QA: PASS (5 opaque IDs; import/reload/Open/Export/Delete/attachments; physical isolation; persisted bypass; 7 schema negatives).');
}finally{await stop();}
