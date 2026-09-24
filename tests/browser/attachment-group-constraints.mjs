import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const server=createServer((request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.writeHead(204).end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');response.end(fs.readFileSync(file));}catch{response.writeHead(404).end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const unit=(id,canonicalUnitId,name,quantity=1)=>({id,canonicalUnitId,name,points:1,models:[{quantity,name,loadouts:[]}]});
const record=(id,faction,units)=>({id,name:id,sourceText:'',createdAt:'2026-09-24T00:00:00Z',updatedAt:'2026-09-24T00:00:00Z',attachments:{},roster:{faction,declared:1,calculated:1,unitLineTotal:1,detachments:[],enhancements:[],warnings:[],units}});
const datasmithRecord=record('attachment-constraint-am','Adeptus Mechanicus',[
  unit('kastelan-1','unit-kastelan-robots','Kastelan Robots',2),unit('kastelan-2','unit-kastelan-robots','Kastelan Robots',2),
  unit('datasmith-1','unit-cybernetica-datasmith','Cybernetica Datasmith'),unit('datasmith-2','unit-cybernetica-datasmith','Cybernetica Datasmith'),unit('datasmith-3','unit-cybernetica-datasmith','Cybernetica Datasmith')
]);
const krootRecord=record('attachment-constraint-tau',"T'au Empire",[
  unit('carnivores','unit-kroot-carnivores','Kroot Carnivores',20),unit('war','unit-kroot-war-shaper','Kroot War Shaper'),unit('trail','unit-kroot-trail-shaper','Kroot Trail Shaper'),unit('flesh','unit-kroot-flesh-shaper','Kroot Flesh Shaper')
]);
const browser=await launchChromium(),errors=[];
const saved=(page,id)=>page.evaluate(id=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).find(row=>row.id===id),id);
const openEditor=async(page,id)=>{await page.goto(`${origin}/roster-guides/index.html`,{waitUntil:'networkidle'});await page.locator(`[data-edit-attachments="${id}"]`).click();};
const option=(page,body,value)=>page.locator(`select[data-attachment-bodyguard="${body}"]`).filter({has:page.locator(`option[value="${value}"]`)});
const openReader=async(page,book,id,instance,canonicalId)=>{await page.goto(`${origin}/books/${book}/reader.html?view=mobile&roster=${id}&rosterInstance=${instance}#${canonicalId}`,{waitUntil:'networkidle'});await page.waitForFunction(instance=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units?.some(unit=>unit.identity.instanceId===instance),instance);return page.evaluate(instance=>({attachments:window.WH_ARMY_ROSTER_PROJECTION.record.attachments,leaders:window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===instance).attachments.leaders.map(item=>item.instanceId)}),instance);};
const run=async(recordValue,work)=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});await context.addInitScript(value=>{if(!localStorage.getItem('wh40k-rosters-v1'))localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value]));},recordValue);const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));try{await work(page);}finally{await context.close();}};
try{
  await run(datasmithRecord,async page=>{
    await openEditor(page,datasmithRecord.id);
    for(const id of ['datasmith-1','datasmith-2','datasmith-3'])await option(page,'kastelan-1',id).selectOption(id);
    assert.deepEqual((await saved(page,datasmithRecord.id)).attachments,{'kastelan-1':['datasmith-1','datasmith-2','datasmith-3']});
    assert.equal(await option(page,'kastelan-2','datasmith-1').count(),0,'one physical Datasmith cannot attach twice');
    await page.reload();assert.deepEqual((await saved(page,datasmithRecord.id)).attachments['kastelan-1'],['datasmith-1','datasmith-2','datasmith-3']);
    const projection=await openReader(page,'adeptus-mechanicus',datasmithRecord.id,'kastelan-1','unit-kastelan-robots');assert.deepEqual(projection.leaders,['datasmith-1','datasmith-2','datasmith-3']);
    await openEditor(page,datasmithRecord.id);await option(page,'kastelan-1','remove:datasmith-2').selectOption('remove:datasmith-2');
    assert.deepEqual((await saved(page,datasmithRecord.id)).attachments,{'kastelan-1':['datasmith-1','datasmith-3']});
  });
  await run(krootRecord,async page=>{
    await openEditor(page,krootRecord.id);for(const id of ['war','trail'])await option(page,'carnivores',id).selectOption(id);
    assert.equal(await option(page,'carnivores','flesh').count(),0,'third Kroot Leader remains unavailable');
    assert.deepEqual((await saved(page,krootRecord.id)).attachments,{carnivores:['war','trail']});
    const projection=await openReader(page,'tau-empire',krootRecord.id,'carnivores','unit-kroot-carnivores');assert.deepEqual(projection.leaders,['war','trail']);
  });
  assert.deepEqual(errors,[],'attachment-group browser errors');
  console.log('Attachment-group browser QA PASS: Datasmith multiplicity, physical isolation, detach/reload and Kroot 20-model capacity at 390x844');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
