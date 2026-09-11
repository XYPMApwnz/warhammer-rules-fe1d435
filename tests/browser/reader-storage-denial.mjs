import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const reader=`${origin}/books/death-guard/reader.html?view=mobile`;
const browser=await chromium.launch({channel:'chrome',headless:true});
const denyStorage=()=>Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('Access denied','SecurityError');}});
const open=async(context,url)=>{const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});await page.goto(url,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.WH_ARMY_BOOK_APP||document.documentElement.dataset.bookError,{timeout:5000});return {page,errors};};

try{
  const denied=await browser.newContext({serviceWorkers:'block'});
  await denied.addInitScript(denyStorage);
  try{
    const {page,errors}=await open(denied,`${reader}#unit-plague-marines`);
    const state=await page.evaluate(()=>({app:Boolean(window.WH_ARMY_BOOK_APP),context:window.WH_ARMY_ROSTER_CONTEXT&&{status:window.WH_ARMY_ROSTER_CONTEXT.status,rosterId:window.WH_ARMY_ROSTER_CONTEXT.rosterId},card:Boolean(document.querySelector('.unit-card')),nav:Boolean(window.DG_APP?.navigation)}));
    assert.deepEqual(state,{app:true,context:{status:'not-requested',rosterId:null},card:true,nav:true},`denied localStorage must leave an ordinary reader usable: ${errors.join(' | ')}`);
    assert.deepEqual(errors,[],'ordinary reader must not emit an uncaught error when localStorage is denied');
  }finally{await denied.close();}

  const normal=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await open(normal,`${reader}#unit-plague-marines`);
    const state=await page.evaluate(()=>({app:Boolean(window.WH_ARMY_BOOK_APP),context:window.WH_ARMY_ROSTER_CONTEXT&&{status:window.WH_ARMY_ROSTER_CONTEXT.status,rosterId:window.WH_ARMY_ROSTER_CONTEXT.rosterId},storage:localStorage.getItem('wh40k-rosters-v1')}));
    assert.deepEqual(state,{app:true,context:{status:'not-requested',rosterId:null},storage:null},'normal localStorage reader behavior changed');
    assert.deepEqual(errors,[],'normal localStorage reader emitted an uncaught error');
    await assert.rejects(page.evaluate(()=>window.WHArmyRosterContext.fromRuntime({force:true,location:{get search(){throw new Error('runtime sentinel');}}})),/runtime sentinel/,'non-storage runtime errors must remain visible');
  }finally{await normal.close();}

  const deniedRoster=await browser.newContext({serviceWorkers:'block'});
  await deniedRoster.addInitScript(denyStorage);
  try{
    for(let attempt=0;attempt<2;attempt+=1){
      const {page,errors}=await open(deniedRoster,`${reader}&roster=denied-roster#unit-plague-marines`);
      const state=await page.evaluate(()=>({app:Boolean(window.WH_ARMY_BOOK_APP),context:window.WH_ARMY_ROSTER_CONTEXT&&{status:window.WH_ARMY_ROSTER_CONTEXT.status,rosterId:window.WH_ARMY_ROSTER_CONTEXT.rosterId},projection:Boolean(window.WH_ARMY_ROSTER_PROJECTION)}));
      assert.deepEqual(state,{app:true,context:{status:'unavailable',rosterId:'denied-roster'},projection:false},'denied roster storage must fail closed deterministically');
      assert.deepEqual(errors,[],'denied roster storage emitted an uncaught error');
      await page.close();
    }
  }finally{await deniedRoster.close();}
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}

console.log('reader storage denial QA passed');
