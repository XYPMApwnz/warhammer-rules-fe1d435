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
  {name:'Death Guard',unit:'unit-great-unclean-one',desktop:'/books/death-guard/reader.html#unit-great-unclean-one',phone:'/books/death-guard/mobile/great-unclean-one.html'},
  {name:'Adeptus Mechanicus',unit:'unit-skitarii-rangers',desktop:'/books/adeptus-mechanicus/reader.html#unit-skitarii-rangers',phone:'/books/adeptus-mechanicus/mobile/skitarii-rangers.html'},
  {name:'Tyranids',unit:'unit-hive-tyrant',desktop:'/books/tyranids/reader.html#unit-hive-tyrant',phone:'/books/tyranids/mobile/hive-tyrant.html'},
  {name:"T'au Empire",unit:'unit-breacher-team',desktop:'/books/tau-empire/reader.html#unit-breacher-team',phone:'/books/tau-empire/mobile/breacher-team.html'},
  {name:"Emperor's Children",unit:'unit-shalaxi-helbane',desktop:'/books/emperors-children/reader.html#unit-shalaxi-helbane',phone:'/books/emperors-children/mobile/shalaxi-helbane.html'},
  {name:"Emperor's Children Daemonettes",unit:'unit-daemonettes',desktop:'/books/emperors-children/reader.html#unit-daemonettes',phone:'/books/emperors-children/mobile/daemonettes.html'},
  {name:'Space Marines',unit:'unit-intercessor-squad',desktop:'/books/space-marines/reader.html#unit-intercessor-squad',phone:'/books/space-marines/mobile/intercessor-squad.html'},
  {name:'Dark Angels',unit:'unit-belial',desktop:'/books/dark-angels/reader.html#unit-belial',phone:'/books/dark-angels/reader.html?view=mobile#unit-belial',offline:'/books/dark-angels/reader.html?view=mobile#unit-hellblaster-squad',offlineUnit:'unit-hellblaster-squad',related:false,singleReader:true}
];

async function openPhonePopup(page,name,singleReader=false){
  const trigger=page.locator('main button[data-term]:visible').first();
  await trigger.waitFor({state:'visible'});
  await trigger.click();
  if(singleReader){
    const card=page.locator('#popupLayer .term-popup').last();
    await card.waitFor({state:'visible'});
    assert.ok((await card.textContent()).trim().length>10,`${name} popup lost its rule content`);
    await card.locator('[data-popup-close]').click();
    await card.waitFor({state:'hidden'});
    assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} popup must restore focus`);
    return;
  }
  const dialog=page.locator('#termDialog');
  const card=page.locator('#termPopupStack .mobile-popup-card').first();
  await dialog.waitFor({state:'visible'});
  await card.waitFor({state:'visible'});
  assert.ok((await card.textContent()).trim().length>10,`${name} popup lost its rule content`);
  await page.locator('[data-popup-close="0"]').click();
  await dialog.waitFor({state:'hidden'});
  assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} popup must restore focus`);
}

async function assertDarkAngelsLeaderJourney(page,leaderId,targetId){
  await page.goto(`${origin}/books/dark-angels/reader.html#${leaderId}`);
  const link=page.locator(`#${leaderId} [data-journey-target="${targetId}"]`);
  await link.waitFor({state:'visible'});
  await link.click();
  await page.locator(`#tocTree [data-nav-target="${targetId}"].is-current`).waitFor({state:'visible'});
  assert.equal(new URL(page.url()).pathname,'/books/dark-angels/reader.html','Shared Leader destination must retain Dark Angels reading context');
  assert.match(await page.locator(`#${targetId}`).textContent(),/Space Marines shared datasheet/,'Shared Leader destination lost ownership presentation');
  await page.locator('#backButton').click();
  await page.locator(`#tocTree [data-nav-target="${leaderId}"].is-current`).waitFor({state:'visible'});
}

try{
  const bookContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1440,height:900}});
  try{
    const {page,errors}=await observedPage(bookContext);
    await page.goto(`${origin}/index.html`);
    const darkAngelsCard=page.locator('a.book.da');
    await darkAngelsCard.waitFor({state:'visible'});
    const darkAngelsCover=darkAngelsCard.locator('img');
    await darkAngelsCover.scrollIntoViewIfNeeded();
    await darkAngelsCover.evaluate(image=>image.decode());
    assert.equal(await darkAngelsCover.evaluate(image=>image.complete&&image.naturalWidth>0&&Math.abs(image.naturalWidth/image.naturalHeight-.8)<.01),true,'Dark Angels Library artwork failed to load');
    await Promise.all([
      page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.searchParams.get('view')!=='mobile'),
      darkAngelsCard.click()
    ]);
    assert.match(await page.locator('#start').evaluate(node=>getComputedStyle(node).backgroundImage),/dark-angels-cover-800\.webp/,'Dark Angels Desktop Start lost its artwork');
    assert.equal(await page.locator('.unit-card').count(),98,'Dark Angels reader must expose 16 local and 82 shared datasheets');
    assert.equal(await page.locator('#tocTree [data-nav-id="datasheets-dark-angels"]').count(),1,'Dark Angels local ownership branch is missing');
    assert.equal(await page.locator('#tocTree [data-nav-id="datasheets-space-marines"]').count(),1,'Space Marines shared ownership branch is missing');
    for(const id of ['unit-hellblaster-squad','unit-intercessor-squad','unit-bladeguard-veteran-squad','unit-terminator-squad','unit-terminator-assault-squad','unit-outrider-squad','unit-land-raider','unit-redemptor-dreadnought'])assert.equal(await page.locator(`#${id}`).count(),1,`Dark Angels reader lost shared ${id}`);
    for(const id of ['unit-roboute-guilliman','unit-marneus-calgar-in-armour-of-antilochus','unit-vulkan-hestan','unit-kayvaan-shrike','unit-victrix-honour-guard'])assert.equal(await page.locator(`#${id}`).count(),0,`Dark Angels reader leaked foreign Chapter ${id}`);
    for(const book of books){
      errors.length=0;
      await page.goto(origin+book.desktop);
      const unit=page.locator(`#${book.unit}`);
      await unit.waitFor({state:'visible'});
      assert.ok((await unit.textContent()).trim().length>100,`${book.name} datasheet content is missing`);
      if(book.name==='Space Marines'){assert.match(await unit.textContent(),/Every model is equipped with:/);assert.match(await unit.textContent(),/Wargear Options/);}

      if(book.related!==false){
        const related=unit.locator('.related-rules-trigger').first();
        await related.waitFor({state:'visible'});
        await related.click();
        const relatedLayer=page.locator('.related-rules-layer');
        await relatedLayer.waitFor({state:'visible'});
        assert.ok((await relatedLayer.textContent()).trim().length>20,`${book.name} Related Rules did not open`);
        await page.locator('.related-rules-close').click();
        await relatedLayer.waitFor({state:'hidden'});
      }

      const switcher=page.locator('[data-view-switch]:visible').first();
      const phoneTarget=new URL(book.phone,origin);
      await Promise.all([
        page.waitForURL(url=>url.pathname===phoneTarget.pathname&&(!phoneTarget.search||url.search===phoneTarget.search)&&(!phoneTarget.hash||url.hash===phoneTarget.hash)),
        switcher.click()
      ]);
      const phoneUnit=page.locator(`#${book.unit}, main .unit-card`).first();
      await phoneUnit.waitFor({state:'visible'});
      assert.ok((await phoneUnit.textContent()).trim().length>100,`${book.name} Phone content is missing`);
      if(book.name==='Space Marines'){assert.ok(await page.locator('#relatedRules').count(),'Space Marines Phone Datasheet Tools are missing');assert.match(await phoneUnit.textContent(),/Wargear Options/);}
      await openPhonePopup(page,book.name,book.singleReader);
      assert.deepEqual(errors,[],`${book.name} emitted an uncaught runtime error`);
    }
    await assertDarkAngelsLeaderJourney(page,'unit-belial','unit-terminator-squad');
    await assertDarkAngelsLeaderJourney(page,'unit-azrael','unit-hellblaster-squad');
    await assertDarkAngelsLeaderJourney(page,'unit-sammael','unit-outrider-squad');
    console.log('PASS six Army Books open desktop content, supported Related Rules, Phone routes and glossary popups');
  }finally{
    await bookContext.close();
  }

  const previewContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const {page,errors}=await observedPage(previewContext);
    await page.goto(`${origin}/index.html`);
    await Promise.all([
      page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.searchParams.get('view')==='mobile'),
      page.locator('a.book.da').click()
    ]);
    assert.match(await page.locator('#start').evaluate(node=>getComputedStyle(node).backgroundImage),/dark-angels-cover-800\.webp/,'Dark Angels Phone Start lost its artwork');
    await page.locator('#navMenu').click();
    await page.locator('li[data-nav-id="datasheets"] > .toc-row > [data-nav-toggle]').click();
    await page.locator('li[data-nav-id="datasheets-space-marines"] > .toc-row > [data-nav-toggle]').click();
    await page.locator('li[data-nav-id="datasheets-space-marines-infantry"] > .toc-row > [data-nav-toggle]').click();
    await page.locator('li[data-nav-id="unit-hellblaster-squad"] > .toc-row > [data-nav-target="unit-hellblaster-squad"]').click();
    await page.locator('#tocTree [data-nav-target="unit-hellblaster-squad"].is-current').waitFor({state:'attached'});
    assert.match(await page.locator('#unit-hellblaster-squad').textContent(),/Space Marines shared datasheet/,'Dark Angels Phone shared datasheet lost ownership context');
    for(const viewport of [{width:390,height:844},{width:430,height:932}]){
      await page.setViewportSize(viewport);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`Dark Angels overflows at ${viewport.width}px`);
    }
    assert.deepEqual(errors,[],'Dark Angels responsive preview emitted an uncaught runtime error');
  }finally{
    await previewContext.close();
  }

  const noScriptContext=await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await noScriptContext.newPage();
    await page.goto(`${origin}/books/dark-angels/index.html`);
    const art=page.locator('.entry-art img');
    await art.waitFor({state:'visible'});
    await art.evaluate(image=>image.decode());
    assert.equal(await art.evaluate(image=>image.complete&&image.naturalWidth>0&&Math.abs(image.naturalWidth/image.naturalHeight-.8)<.01),true,'Dark Angels no-JS entry artwork failed to load');
    assert.equal(await page.locator('a[href="./reader.html?view=full"]').count(),1,'Dark Angels no-JS Desktop link is missing');
    assert.equal(await page.locator('a[href="./mobile/index.html?view=mobile"]').count(),1,'Dark Angels no-JS Phone link is missing');
    assert.equal(await page.locator('a[href="../../index.html"]').count(),1,'Dark Angels no-JS Library return is missing');
  }finally{
    await noScriptContext.close();
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
      await page.goto(origin+(book.offline||book.phone));
      await page.locator(`#${book.offlineUnit||book.unit}`).waitFor({state:'visible'});
      await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));
    }
    assert.equal(await page.evaluate(async()=>Boolean(await caches.match(new URL('/books/dark-angels/assets/dark-angels-cover-800.webp',location.origin).href))),true,'Dark Angels artwork is absent from the offline cache');
    errors.length=0;
    await offlineContext.setOffline(true);
    for(const book of books){
      await page.goto(origin+(book.offline||book.phone),{waitUntil:'domcontentloaded'});
      await page.reload({waitUntil:'domcontentloaded'});
      const content=page.locator(`#${book.offlineUnit||book.unit}`);
      await content.waitFor({state:'visible'});
      assert.ok((await content.textContent()).trim().length>100,`${book.name} is unusable after offline reload`);
    }
    await openPhonePopup(page,'Dark Angels offline',true);
    assert.deepEqual(errors,[],'Offline smoke emitted an uncaught runtime error');
    console.log('PASS six visited Army Books remain usable after offline reload');
  }finally{
    await offlineContext.close();
  }
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
