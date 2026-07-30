import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
let workerRevision='';
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){
      response.statusCode=204;
      response.end();
      return;
    }
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert(file.startsWith(root+path.sep)||file===root);
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    if(url.pathname==='/service-worker.js'&&workerRevision){
      response.setHeader('Cache-Control','no-store');
      response.end(`${await readFile(file,'utf8')}\n// browser-upgrade:${workerRevision}\n`);
    }else if(url.pathname==='/glossary/generated/cache-revision.js'&&workerRevision){
      response.setHeader('Cache-Control','no-store');
      response.end(`self.WH40K_CACHE_REVISION='${workerRevision}';\n`);
    }else response.end(await readFile(file));
  }catch{
    response.statusCode=404;
    response.end('Not found');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});
const observedPage=async context=>{
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{
    const url=message.location().url;
    if(message.type()==='error'&&!url.endsWith('/favicon.ico'))errors.push(`${message.text()} @ ${url}`);
  });
  return{page,errors};
};
const control=async page=>{
  await page.evaluate(async()=>{
    await navigator.serviceWorker.ready;
    if(navigator.serviceWorker.controller)return;
    await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
  if(!await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)))await page.reload();
  assert.equal(await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)),true,'Library must be controlled');
};

try{
  const wargearContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(wargearContext);
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/tyranids/mobile/carnifexes.html?wargear-layout=1`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),true,'multiline Wargear must not overflow Phone Mode');
    await page.goto(`${origin}/books/tau-empire/mobile/crisis-fireknife-battlesuits.html?wargear-layout=1`);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),true,"T'au multiline Wargear must not overflow Phone Mode");
    assert.deepEqual(errors,[]);
    console.log('PASS Tyranids Phone Mode Wargear overflow');
  }finally{await wargearContext.close();}

  const rosterContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(rosterContext);
    await page.goto(`${origin}/index.html?roster-setup=1`);
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'tau-enhancement-qa',name:'Test Kauyon roster',roster:{faction:"T'au Empire",detachment:'KAUYON',declared:80,units:[{id:'tau-owner-1',name:'Cadre Fireblade',quantity:1,points:50,wargear:'Fireblade pulse rifle, close combat weapon'}],enhancements:[{name:'Through Unity, Devastation',exportedCost:30,ownerUnitId:'tau-owner-1',ownerStatus:'resolved'}]}}])));
    const expected='T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [LETHAL HITS] ability while targeting their Spotted unit.';
    await page.goto(`${origin}/books/tau-empire/reader.html?roster=tau-enhancement-qa#unit-cadre-fireblade`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.equal(await page.locator('.content-group.detachment').count(),1);
    assert.equal(await page.locator('#unit-cadre-fireblade .unit-status').textContent(),'50 pts');
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=tau-enhancement-qa`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    assert.deepEqual(errors,[]);
    console.log("PASS T'au roster Enhancement owner and full effect in desktop/iPad + Phone Mode");
  }finally{await rosterContext.close();}

  const coldContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(coldContext);
    await page.goto(`${origin}/index.html?cold=1`);
    await control(page);
    await coldContext.setOffline(true);
    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${origin}/books/tyranids/?build=cold-desktop&view=full`);
    assert.match(page.url(),/\/books\/tyranids\/reader\.html\?build=cold-desktop$/);
    assert.equal(await page.title(),'Tyranids Rules — WH40K Library');

    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/tyranids/?build=cold-phone`);
    assert.match(page.url(),/\/books\/tyranids\/mobile\/index\.html\?build=cold-phone$/);
    assert.equal(await page.title(),'Start — Tyranids');
    assert.equal(await page.locator('.app-header').evaluate(element=>getComputedStyle(element).position),'fixed');

    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?build=unvisited`);
    assert.equal(await page.title(),'Start — Tyranids');
    assert.match(page.url(),/\/books\/tyranids\/mobile\/hive-tyrant\.html\?build=unvisited$/);
    await page.getByRole('button',{name:'Open navigation'}).click();
    assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'true');
    assert.deepEqual(errors,[]);
    console.log('PASS Tyranids true cold desktop, Phone Mode and unvisited datasheet fallback');

    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${origin}/books/tau-empire/?build=cold-desktop&view=full`);
    assert.match(page.url(),/\/books\/tau-empire\/reader\.html\?build=cold-desktop$/);
    assert.match(await page.title(),/T'au Empire Rules/);
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/tau-empire/?build=cold-phone`);
    assert.match(page.url(),/\/books\/tau-empire\/mobile\/index\.html\?build=cold-phone$/);
    assert.match(await page.title(),/T.au Empire/);
    await page.goto(`${origin}/books/tau-empire/mobile/commander-farsight.html?build=unvisited`);
    assert.match(await page.title(),/Start.*T.au Empire/);
    assert.match(page.url(),/\/books\/tau-empire\/mobile\/commander-farsight\.html\?build=unvisited$/);
    assert.deepEqual(errors,[]);
    console.log("PASS T'au Empire true cold desktop, Phone Mode and unvisited datasheet fallback");
  }finally{await coldContext.close();}

  workerRevision='browser-upgrade-a';
  const upgradeContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(upgradeContext);
    await page.goto(`${origin}/index.html?upgrade=a`);
    await control(page);
    assert.deepEqual(await page.evaluate(()=>caches.keys()),['warhammer-rules-fe1d435-browser-upgrade-a']);

    workerRevision='browser-upgrade-b';
    await page.evaluate(async()=>{
      const registration=await navigator.serviceWorker.ready;
      const changed=new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>reject(new Error('Service worker upgrade timed out')),60_000);
        navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(timer);resolve();},{once:true});
      });
      await registration.update();
      await changed;
    });
    await page.reload();
    await page.waitForFunction(async()=>{
      const keys=await caches.keys();
      return keys.includes('warhammer-rules-fe1d435-browser-upgrade-b')&&!keys.includes('warhammer-rules-fe1d435-browser-upgrade-a');
    });
    assert.deepEqual(await page.evaluate(()=>caches.keys()),['warhammer-rules-fe1d435-browser-upgrade-b']);
    assert.equal(await page.title(),'Warhammer 40,000 Rules Library');
    assert.deepEqual(errors,[]);
    console.log('PASS service worker atomic upgrade and old-cache cleanup');
  }finally{await upgradeContext.close();}
}finally{
  await browser.close();
  server.close();
}
