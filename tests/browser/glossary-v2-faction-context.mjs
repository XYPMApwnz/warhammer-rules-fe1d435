import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  if(request.url==='/favicon.ico'){response.writeHead(204).end();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file===root||file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
const stormId='army::space-marines::detachment::stormlance-task-force';
const terminatorId='army::space-marines::unit::unit-terminator-squad';
const ravenwingId='army::space-marines::unit::unit-chaplain-on-bike';
const compact=value=>String(value||'').replace(/\s+/g,' ').trim();

async function readerControl(bookId,viewport,id,expected,rejected){
  const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  try{
    await page.goto(`${base}/books/${bookId}/reader.html?view=${viewport.width===390?'mobile':'full'}#start`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>window.WH40K_GLOSSARY&&window.DG_APP?.popups);
    const view=await page.evaluate(({bookId,id})=>window.WH40K_GLOSSARY.resolveView(bookId,id),{bookId,id});
    assert(view,`${bookId}: contextual view missing ${id}`);assert.match(compact(view.definition),expected,`${bookId}: contextual runtime value`);if(rejected)assert.doesNotMatch(compact(view.definition),rejected,`${bookId}: sibling context leaked`);
    await page.evaluate(id=>{const trigger=document.createElement('button');trigger.id='context-test-trigger';trigger.dataset.term=id;trigger.textContent='Context test';document.body.append(trigger);},id);
    await page.locator('#context-test-trigger').click();const popup=page.locator('.term-popup').last();await popup.waitFor();
    assert.equal(await popup.getAttribute('data-popup-term'),id,`${bookId}: popup canonical identity`);
    if(id===stormId){assert.match(compact(await popup.innerText()),expected,`${bookId}: popup context`);if(rejected)assert.doesNotMatch(compact(await popup.innerText()),rejected,`${bookId}: popup sibling leak`);}
    const full=popup.locator('button.popup-action',{hasText:'Full entry'});await full.click();const layer=page.locator('.full-entry-layer:not([hidden])');await layer.waitFor();
    assert.match(compact(await layer.innerText()),expected,`${bookId}: full article context`);if(rejected)assert.doesNotMatch(compact(await layer.innerText()),rejected,`${bookId}: full article sibling leak`);
    const href=await layer.locator('[data-open-mega]').getAttribute('href'),url=new URL(href);
    assert.equal(url.searchParams.get('book'),bookId,`${bookId}: Mega Glossary link must retain effective book context`);assert.equal(decodeURIComponent(url.hash.slice(1)),id,`${bookId}: Mega Glossary link identity`);
    assert.deepEqual(errors,[],`${bookId}: browser runtime errors`);
  }finally{await context.close();}
}

try{
  const desktop={width:1440,height:900},phone={width:390,height:844};
  await readerControl('space-marines',desktop,stormId,/Detachment Points: 3DP\./);
  await readerControl('dark-angels',desktop,stormId,/Detachment Points: 3DP\./);
  await readerControl('blood-angels',desktop,stormId,/Detachment Points: 2DP\./,/Detachment Points: 3DP\./);
  await readerControl('dark-angels',desktop,terminatorId,/KEYWORDS.*DEATHWING/);
  await readerControl('dark-angels',desktop,ravenwingId,/KEYWORDS.*RAVENWING/);
  await readerControl('space-marines',desktop,terminatorId,/KEYWORDS/,/DEATHWING/);
  await readerControl('blood-angels',desktop,terminatorId,/KEYWORDS/,/DEATHWING/);
  await readerControl('blood-angels',phone,stormId,/Detachment Points: 2DP\./,/Detachment Points: 3DP\./);
  await readerControl('dark-angels',phone,terminatorId,/KEYWORDS.*DEATHWING/);

  for(const control of [
    {bookId:'blood-angels',id:stormId,expected:/Detachment Points: 2DP\./},
    {bookId:'dark-angels',id:terminatorId,expected:/KEYWORDS.*DEATHWING/}
  ]){
    const context=await browser.newContext({viewport:phone,serviceWorkers:'block'}),page=await context.newPage();
    try{await page.goto(`${base}/glossary/index.html?book=${control.bookId}#${encodeURIComponent(control.id)}`);await page.locator('body.article-open').waitFor();assert.match(compact(await page.locator('#termDetail').innerText()),control.expected,`${control.bookId}: Mega Glossary contextual article`);assert.equal(decodeURIComponent(new URL(page.url()).hash.slice(1)),control.id,`${control.bookId}: viewer identity unchanged`);}finally{await context.close();}
  }
  console.log('Glossary V2 faction-context browser QA PASS: desktop/390px popup, full article and Mega Glossary preserve SM/DA/BA effective context.');
}finally{await browser.close();await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));}
