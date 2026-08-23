import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true});
const cases=[['Mortarion','unit-mortarion'],['Plague Marines','unit-plague-marines'],['Plagueburst Crawler','unit-plagueburst-crawler'],['Great Unclean One','unit-great-unclean-one']];
const observe=page=>{const errors=[],failed=[];page.on('pageerror',error=>errors.push(error.message));page.on('requestfailed',request=>failed.push(request.url()));return{errors,failed};};
const ready=(page,id)=>page.waitForFunction(target=>document.documentElement.dataset.mountedTarget===target&&document.querySelector(`#${CSS.escape(target)} .unit-art img`),id,{timeout:15000});

try{
  const phone=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await phone.newPage(),observed=observe(page);page.setDefaultTimeout(15000);
    for(const [title,id] of cases){
      await page.goto(`${origin}/books/death-guard/reader.html?view=mobile#${id}`);await ready(page,id);
      const image=page.locator(`#${id} .unit-art img`);await image.evaluate(node=>node.decode());
      const state=await page.evaluate(({id,title})=>{const card=document.getElementById(id),image=card.querySelector('.unit-art img'),header=card.querySelector('.unit-header'),nav=card.querySelector('.local-nav'),statline=card.querySelector('.statline');return{mounted:document.documentElement.dataset.mountedTarget,cards:document.querySelectorAll('.unit-card').length,art:document.querySelectorAll('.unit-card .unit-art img,.unit-card .unit-art-background img').length,title:card.querySelector('.unit-name,h3')?.textContent.trim(),image:image.complete&&image.naturalWidth>0,headerVisible:header.getBoundingClientRect().height>0,navVisible:nav.getBoundingClientRect().height>0,statlineVisible:statline.getBoundingClientRect().height>0,overflow:document.documentElement.scrollWidth-innerWidth};},{id,title});
      assert.deepEqual(state,{mounted:id,cards:1,art:1,title,image:true,headerVisible:true,navVisible:true,statlineVisible:true,overflow:0},`${title}: Phone presentation`);
      console.log(`PASS Phone ${title}`);
    }
    assert.deepEqual(observed.errors,[],'Phone console errors');assert.deepEqual(observed.failed,[],'Phone failed requests');
  }finally{await phone.close();}

  const desktop=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}});
  try{
    const page=await desktop.newPage(),observed=observe(page);page.setDefaultTimeout(15000);await page.goto(`${origin}/books/death-guard/reader.html?view=full#unit-mortarion`,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForFunction(()=>Boolean(window.DG_APP?.navigation&&window.WHArmyBookTargetMount?.catalog),null,{timeout:15000});
    assert.equal(await page.locator('.unit-card').count(),36,'Desktop Datasheet count');assert.equal(await page.locator('.unit-card .unit-art img,.unit-card .unit-art-background img').count(),32,'Desktop art count');
    for(const [,id] of cases){const image=page.locator(`#${id} .unit-art img`);await image.scrollIntoViewIfNeeded();await image.evaluate(node=>node.decode());}
    assert.deepEqual(observed.errors,[],'Desktop console errors');assert.deepEqual(observed.failed,[],'Desktop failed requests');
    console.log('PASS Desktop DG art inventory');
  }finally{await desktop.close();}

  const offline=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}});
  try{
    const page=await offline.newPage(),observed=observe(page);page.setDefaultTimeout(30000);await page.goto(`${origin}/index.html?dg-art-offline=1`);console.log('PASS offline Library loaded');await page.evaluate(async()=>{const limit=promise=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Service Worker readiness timeout')),30000))]);await limit(navigator.serviceWorker.ready);if(!navigator.serviceWorker.controller)await limit(new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})));});if(!await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)))await page.reload();console.log('PASS offline package installed');
    const cached=await page.evaluate(async()=>{const keys=await caches.keys(),cache=await caches.open(keys[0]),requests=await cache.keys();return requests.map(request=>new URL(request.url).pathname);});
    assert.equal(cached.filter(url=>url.startsWith('/books/death-guard/assets/unit-images/')).length,32,'offline DG art inventory');
    await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));
    await page.goto(`${origin}/books/death-guard/reader.html?view=mobile#unit-mortarion`,{waitUntil:'domcontentloaded'});await ready(page,'unit-mortarion');const image=page.locator('#unit-mortarion .unit-art img');await image.evaluate(node=>node.decode());assert.equal(await image.evaluate(node=>node.complete&&node.naturalWidth>0),true,'offline Mortarion decode');assert.deepEqual(observed.errors,[],'offline console errors');assert.deepEqual(observed.failed,[],'offline failed requests');
  }finally{await offline.close();}
  console.log('Death Guard unit art browser QA: PASS (Phone, Desktop, physical origin shutdown).');
}finally{await browser.close();if(server.listening)await new Promise(resolve=>server.close(resolve));}
