import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.webmanifest':'application/manifest+json'};
let delayMs=12,failedPath='',swVariant=1;
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    if(url.pathname===failedPath){response.statusCode=503;response.end('Controlled offline package failure');return;}
    if(delayMs&&url.pathname!=='/index.html'&&url.pathname!=='/service-worker.js'&&!url.pathname.endsWith('/offline-status.js')&&!url.pathname.endsWith('/offline-status.css'))await new Promise(resolve=>setTimeout(resolve,delayMs));
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.setHeader('Cache-Control','no-store');
    const body=await readFile(file);
    response.end(url.pathname==='/service-worker.js'?Buffer.concat([body,Buffer.from(`\n// offline-progress fixture ${swVariant}\n`)]):body);
  }catch{response.statusCode=404;response.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});

async function snapshot(page){
  return page.locator('[data-offline-package-status]').evaluate(node=>({state:node.dataset.state,completed:Number(node.dataset.completed),total:Number(node.dataset.total),hidden:node.hidden,text:node.textContent.trim()}));
}

try{
  const context=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}});
  try{
    await context.addInitScript(()=>{
      window.__offlineProgressSamples=[];
      const capture=()=>{const node=document.querySelector('[data-offline-package-status]');if(node)window.__offlineProgressSamples.push({state:node.dataset.state,completed:Number(node.dataset.completed),total:Number(node.dataset.total),hidden:node.hidden});};
      new MutationObserver(capture).observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['data-state','data-completed','data-total','hidden']});
    });
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${origin}/index.html`);
    await page.locator('[data-offline-package-status]:not([hidden])').waitFor({state:'visible'});
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.dataset.state==='ready');
    const samples=await page.evaluate(()=>window.__offlineProgressSamples);
    const active=samples.filter(value=>value.state==='preparing');
    assert.ok(active.length>1,'First install did not expose real preparation progress');
    assert.equal(active[0].completed,0,'First-install progress did not begin at zero');
    assert.ok(active.every((value,index)=>index===0||value.completed>=active[index-1].completed),'First-install progress was not monotonic');
    assert.ok(active.every(value=>value.completed<value.total),'Preparing state falsely reached 100%');
    const ready=await snapshot(page);
    assert.equal(ready.completed,ready.total,'Ready state was emitted before the full package completed');
    assert.equal(ready.total,316,'Progress total diverged from the current APP_SHELL package');
    const cache=await page.evaluate(async()=>{const keys=await caches.keys(),current=await caches.open(keys[0]);return{keys,count:(await current.keys()).length};});
    assert.equal(cache.keys.length,1,'First install created a second cache architecture');
    assert.equal(cache.count,ready.total,'Ready state disagrees with exact cache completeness');
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.hidden===true);

    await page.reload();
    await page.waitForTimeout(300);
    assert.equal(await page.locator('[data-offline-package-status]').evaluate(node=>node.hidden),true,'Ready reload showed a persistent progress indicator');

    await page.goto(`${origin}/books/death-guard/reader.html#unit-plague-marines`);
    swVariant=2;
    await page.evaluate(async()=>{const registration=await navigator.serviceWorker.getRegistration();await registration.update();});
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.dataset.state==='updating');
    const updating=await snapshot(page);
    assert.match(updating.text,/Обновление офлайн/,'Existing package update was not distinguished from first install');
    assert.equal(await page.locator('#unit-plague-marines').count(),1,'Existing application became unusable during update');
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.dataset.state==='ready');
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.hidden===true);

    await context.setOffline(true);
    await page.goto(`${origin}/books/tau-empire/reader.html#unit-breacher-team`,{waitUntil:'domcontentloaded'});
    await page.locator('#unit-breacher-team').waitFor({state:'visible'});
    assert.equal(await page.locator('[data-offline-package-status]').evaluate(node=>node.hidden),true,'Complete offline package incorrectly requested another download');
    assert.deepEqual(errors,[],'Offline progress flow emitted a runtime error');
  }finally{await context.close();}

  delayMs=8;
  failedPath='/books/core-rules/assets/diagrams/PlungingFire.webp';
  swVariant=1;
  const failedContext=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}});
  try{
    const page=await failedContext.newPage();
    await page.goto(`${origin}/index.html`);
    await page.waitForFunction(()=>document.querySelector('[data-offline-package-status]')?.dataset.state==='error');
    const failed=await snapshot(page);
    assert.ok(failed.completed<failed.total,'Interrupted install falsely reached 100%');
    assert.match(failed.text,/Офлайн-пакет не готов/,'Interrupted install did not expose the not-ready state');
    assert.equal(failed.hidden,false,'Interrupted install hid its persistent warning');
  }finally{await failedContext.close();}
  console.log('OFFLINE PACKAGE PROGRESS QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
