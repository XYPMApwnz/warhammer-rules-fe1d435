import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const override=process.env.P2_26_APP_OVERRIDE?await readFile(process.env.P2_26_APP_OVERRIDE):null;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
const server=createServer(async(request,response)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://localhost').pathname));assert.ok(file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(override&&file===path.join(root,'roster-guides/app.js')?override:await readFile(file));}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await launchChromium(),context=await browser.newContext({serviceWorkers:'block',acceptDownloads:true,viewport:{width:1100,height:850}}),page=await context.newPage(),errors=[];
page.setDefaultTimeout(7000);
page.on('pageerror',error=>errors.push(error.message));
const valid={id:'valid-roster',name:'Valid roster',updatedAt:'2026-09-13T00:00:00.000Z',sourceText:'',attachments:{},roster:{faction:'Death Guard',detachments:[],enhancements:[],warnings:[],units:[{id:'valid-physical-1',canonicalUnitId:'unit-plague-marines',name:'Plague Marines',points:100,models:[]}]}};
const malformed={id:'malformed-roster',name:'Malformed roster',updatedAt:'not-a-date',sourceText:'',attachments:{unsafe:['value']},roster:{faction:'Death Guard',detachments:[],units:[null]}};
await context.addInitScript(records=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify(records)),[valid,malformed]);
try{
  await page.goto(`http://127.0.0.1:${server.address().port}/roster-guides/index.html`);
  const validCard=page.locator('.saved-card').filter({has:page.getByRole('heading',{name:valid.name,exact:true})}),recovery=page.locator('[data-roster-recovery="required"]');
  await validCard.waitFor();await recovery.waitFor();
  assert.equal(await page.locator('.saved-card').count(),2,'one malformed record must not hide valid saved rosters');
  assert.deepEqual(errors,[],'malformed saved record must not abort startup');
  assert.match(await recovery.innerText(),/Recovery needed[\s\S]*could not be read[\s\S]*Export its original backup/i,'bounded recovery diagnostic');
  assert.equal(await recovery.getByRole('button',{name:'Open',exact:true}).count(),0,'malformed record must not become trusted/openable');
  assert.deepEqual(await recovery.locator('.actions > button').allTextContents(),['Export','Delete'],'recovery actions are bounded');
  const waiting=page.waitForEvent('download');await recovery.getByRole('button',{name:'Export',exact:true}).click();const download=await waiting,stream=await download.createReadStream(),chunks=[];for await(const chunk of stream)chunks.push(chunk);
  assert.deepEqual(JSON.parse(Buffer.concat(chunks).toString('utf8')),malformed,'recovery export must preserve the raw malformed record');
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).map(record=>record.id)),[valid.id,malformed.id],'startup must not destroy or replace stored records');
  console.log('Saved roster record isolation QA: valid collection survives, malformed raw record quarantined and exportable PASS');
}finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
