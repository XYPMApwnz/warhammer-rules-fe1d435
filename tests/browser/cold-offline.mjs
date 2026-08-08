import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){
      response.statusCode=204;
      response.end();
      return;
    }
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.end(await readFile(file));
  }catch{
    response.statusCode=404;
    response.end('Not found');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});

const observedPage=async context=>{
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  return{page,errors};
};

const control=async page=>{
  await page.evaluate(async()=>{
    await navigator.serviceWorker.ready;
    if(navigator.serviceWorker.controller)return;
    await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
  if(!await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)))await page.reload();
  assert.equal(await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)),true,'Library must be controlled by the service worker');
};

const books=[
  {name:'Death Guard',unit:'unit-chaos-land-raider',desktop:'/books/death-guard/reader.html#unit-chaos-land-raider',phone:'/books/death-guard/mobile/chaos-land-raider.html'},
  {name:'Adeptus Mechanicus',unit:'unit-skitarii-rangers',desktop:'/books/adeptus-mechanicus/reader.html#unit-skitarii-rangers',phone:'/books/adeptus-mechanicus/mobile/skitarii-rangers.html'},
  {name:'Tyranids',unit:'unit-hive-tyrant',desktop:'/books/tyranids/reader.html#unit-hive-tyrant',phone:'/books/tyranids/mobile/hive-tyrant.html'},
  {name:"T'au Empire",unit:'unit-breacher-team',desktop:'/books/tau-empire/reader.html#unit-breacher-team',phone:'/books/tau-empire/mobile/breacher-team.html'}
];

async function openPhonePopup(page,name){
  const trigger=page.locator('main button[data-term]:visible').first();
  await trigger.waitFor({state:'visible'});
  await trigger.click();
  const dialog=page.locator('#termDialog');
  const card=page.locator('#termPopupStack .mobile-popup-card').first();
  await dialog.waitFor({state:'visible'});
  await card.waitFor({state:'visible'});
  assert.ok((await card.textContent()).trim().length>10,`${name} popup lost its rule content`);
  await page.locator('[data-popup-close="0"]').click();
  await dialog.waitFor({state:'hidden'});
  assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} popup must restore focus`);
}

try{
  const bookContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1440,height:900}});
  try{
    const {page,errors}=await observedPage(bookContext);
    for(const book of books){
      errors.length=0;
      await page.goto(origin+book.desktop);
      const unit=page.locator(`#${book.unit}`);
      await unit.waitFor({state:'visible'});
      assert.ok((await unit.textContent()).trim().length>100,`${book.name} datasheet content is missing`);

      const related=unit.locator('.related-rules-trigger').first();
      await related.waitFor({state:'visible'});
      await related.click();
      const relatedLayer=page.locator('.related-rules-layer');
      await relatedLayer.waitFor({state:'visible'});
      assert.ok((await relatedLayer.textContent()).trim().length>20,`${book.name} Related Rules did not open`);
      await page.locator('.related-rules-close').click();
      await relatedLayer.waitFor({state:'hidden'});

      const switcher=page.locator('[data-view-switch]:visible').first();
      await Promise.all([
        page.waitForURL(url=>url.pathname===book.phone),
        switcher.click()
      ]);
      const phoneUnit=page.locator(`#${book.unit}, main .unit-card`).first();
      await phoneUnit.waitFor({state:'visible'});
      assert.ok((await phoneUnit.textContent()).trim().length>100,`${book.name} Phone content is missing`);
      await openPhonePopup(page,book.name);
      assert.deepEqual(errors,[],`${book.name} emitted an uncaught runtime error`);
    }
    console.log('PASS four Army Books open desktop content, Related Rules, Phone routes and glossary popups');
  }finally{
    await bookContext.close();
  }

  const rosterContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const {page,errors}=await observedPage(rosterContext);
    await page.goto(`${origin}/roster-guides/index.html`);
    await page.locator('#roster-input').fill("+ FACTION KEYWORD: T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts)");
    await page.locator('#roster-form button[type="submit"]').click();
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length>0);
    const rosterId=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).at(-1).id);
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=${encodeURIComponent(rosterId)}`);
    await page.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');
    assert.ok(await page.locator('#relatedRules').count(),'Valid roster must expose roster-aware rules');

    await page.goto(`${origin}/index.html?roster-smoke-control=1`);
    await page.evaluate(record=>{
      const records=JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]');
      localStorage.setItem('wh40k-rosters-v1',JSON.stringify([...records,record]));
    },{id:'smoke-wrong-faction',name:'Wrong faction smoke fixture',roster:{faction:'Tyranids',detachment:'Invasion Fleet',detachments:[{label:'Invasion Fleet'}],units:[{id:'smoke-hive-tyrant',name:'Hive Tyrant',quantity:1,points:0}],enhancements:[]}});
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=smoke-wrong-faction`);
    await page.waitForURL('**/roster-guides/index.html*');
    assert.equal(await page.locator('#relatedRules').count(),0,'Invalid roster must not expose Related Rules');
    assert.equal(await page.locator('.unit-card').count(),0,'Invalid roster must not leave an Army Book active');
    assert.notEqual(await page.locator('html').getAttribute('data-roster-active'),'true','Invalid roster must not retain roster state');
    await page.goBack();
    await page.waitForURL('**/index.html?roster-smoke-control=1');
    assert.deepEqual(errors,[],'Roster smoke emitted an uncaught runtime error');
    console.log('PASS representative valid roster and wrong-faction fail-closed flow without redirect loop');
  }finally{
    await rosterContext.close();
  }

  const offlineContext=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}});
  try{
    const {page,errors}=await observedPage(offlineContext);
    await page.goto(`${origin}/index.html?offline-smoke=1`);
    await control(page);
    for(const book of books){
      await page.goto(origin+book.phone);
      await page.locator('main .unit-card').first().waitFor({state:'visible'});
      await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));
    }
    errors.length=0;
    await offlineContext.setOffline(true);
    for(const book of books){
      await page.goto(origin+book.phone,{waitUntil:'domcontentloaded'});
      await page.reload({waitUntil:'domcontentloaded'});
      const content=page.locator('main .unit-card').first();
      await content.waitFor({state:'visible'});
      assert.ok((await content.textContent()).trim().length>100,`${book.name} is unusable after offline reload`);
    }
    await openPhonePopup(page,"T'au Empire offline");
    assert.deepEqual(errors,[],'Offline smoke emitted an uncaught runtime error');
    console.log('PASS four visited Army Books remain usable after offline reload');
  }finally{
    await offlineContext.close();
  }
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
