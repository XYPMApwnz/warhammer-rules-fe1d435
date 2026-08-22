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
  {name:'Chaos Space Marines',unit:'unit-abaddon-the-despoiler',desktop:'/books/chaos-space-marines/reader.html#unit-abaddon-the-despoiler',phone:'/books/chaos-space-marines/mobile/abaddon-the-despoiler.html'},
  {name:'Space Marines',unit:'unit-intercessor-squad',desktop:'/books/space-marines/reader.html#unit-intercessor-squad',phone:'/books/space-marines/mobile/intercessor-squad.html'},
  {name:'Dark Angels',unit:'unit-belial',desktop:'/books/dark-angels/reader.html#unit-belial',phone:'/books/dark-angels/mobile/belial.html',offline:'/books/dark-angels/mobile/hellblaster-squad.html',offlineUnit:'unit-hellblaster-squad',related:false}
  ,{name:'Blood Angels',unit:'unit-commander-dante',desktop:'/books/blood-angels/reader.html#unit-commander-dante',phone:'/books/blood-angels/mobile/commander-dante.html'}
];

async function openPhonePopup(page,name){
  const trigger=page.locator('main button[data-term]:visible').first();
  await trigger.waitFor({state:'visible'});
  await trigger.click();
  const card=page.locator('#popupLayer .term-popup').last();
  await card.waitFor({state:'visible'});
  assert.ok((await card.textContent()).trim().length>10,`${name} popup lost its rule content`);
  await card.locator('[data-popup-close]').click();
  await card.waitFor({state:'hidden'});
  assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} popup must restore focus`);
}

async function assertDarkAngelsLeaderJourney(page,leaderId,targetId){
  await page.goto(`${origin}/books/dark-angels/reader.html#${leaderId}`);
  const link=page.locator(`#${leaderId} [data-journey-target="${targetId}"]`);
  await link.waitFor({state:'visible'});
  await link.click();
  const currentTarget=page.locator(`#tocTree [data-nav-target="${targetId}"].is-current`);
  assert.equal(await currentTarget.count(),1,'Shared Leader destination is not the unique current navigation target');
  assert.equal(await currentTarget.getAttribute('aria-current'),'location','Shared Leader destination lost canonical current-target semantics');
  assert.equal(new URL(page.url()).pathname,'/books/dark-angels/reader.html','Shared Leader destination must retain Dark Angels reading context');
  assert.match(await page.locator(`#${targetId}`).textContent(),/Space Marines shared datasheet/,'Shared Leader destination lost ownership presentation');
  await page.locator('#backButton').click();
  await page.waitForFunction(id=>document.querySelector(`#tocTree [data-nav-target="${id}"]`)?.classList.contains('is-current'),leaderId);
  const restoredTarget=page.locator(`#tocTree [data-nav-target="${leaderId}"].is-current`);
  assert.equal(await restoredTarget.count(),1,'Back did not restore the originating current navigation target');
  assert.equal(await restoredTarget.getAttribute('aria-current'),'location','Back restored the target without canonical current-target semantics');
}

async function assertDarkAngelsLegacyLeaderJourney(page,leaderFile,leaderId,targetId){
  await page.goto(`${origin}/books/dark-angels/mobile/${leaderFile}`);
  await page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.hash===`#${leaderId}`);
  const link=page.locator(`#${leaderId} [data-journey-target="${targetId}"]`);
  await link.waitFor({state:'visible'});
  await Promise.all([page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.hash===`#${targetId}`),link.click()]);
  assert.match(await page.locator(`#${targetId}`).textContent(),/Space Marines shared datasheet/,'Responsive Leader destination lost ownership presentation');
  await page.goBack();
  await page.locator(`#${leaderId}`).waitFor({state:'visible'});
  assert.equal(new URL(page.url()).hash,`#${leaderId}`,'Browser Back lost the originating Dark Angels Leader target');
}

try{
  const bookContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1440,height:900}});
  try{
    const {page,errors}=await observedPage(bookContext);
    await page.goto(`${origin}/index.html`);
    const csmCard=page.locator('a.book.csm');
    await csmCard.waitFor({state:'visible'});
    const csmCover=csmCard.locator('img');
    await csmCover.scrollIntoViewIfNeeded();
    await csmCover.evaluate(image=>image.decode());
    assert.equal(await csmCover.evaluate(image=>image.complete&&image.naturalWidth>0&&Math.abs(image.naturalWidth/image.naturalHeight-.8)<.01),true,'Chaos Space Marines Library artwork failed to load');
    await Promise.all([page.waitForURL(url=>url.pathname==='/books/chaos-space-marines/reader.html'),csmCard.click()]);
    assert.match(await page.locator('#start').evaluate(node=>getComputedStyle(node).backgroundImage),/chaos-space-marines-cover-800\.webp/,'Chaos Space Marines Desktop Start lost its artwork');
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
    assert.equal(await page.locator('#tocTree [data-nav-id="datasheets-dark-angels"], #tocTree [data-nav-id="datasheets-space-marines"]').count(),0,'Dark Angels reader restored obsolete ownership branches');
    assert.equal(await page.locator('#tocTree [data-nav-target="unit-belial"]').count(),1,'Dark Angels unified navigation lost a local Datasheet');
    assert.equal(await page.locator('#tocTree [data-nav-target="unit-hellblaster-squad"]').count(),1,'Dark Angels unified navigation lost a shared Datasheet');
    for(const id of ['unit-hellblaster-squad','unit-intercessor-squad','unit-bladeguard-veteran-squad','unit-terminator-squad','unit-terminator-assault-squad','unit-outrider-squad','unit-land-raider','unit-redemptor-dreadnought'])assert.equal(await page.locator(`#${id}`).count(),1,`Dark Angels reader lost shared ${id}`);
    for(const id of ['unit-roboute-guilliman','unit-marneus-calgar-in-armour-of-antilochus','unit-vulkan-hestan','unit-kayvaan-shrike','unit-victrix-honour-guard'])assert.equal(await page.locator(`#${id}`).count(),0,`Dark Angels reader leaked foreign Chapter ${id}`);
    for(const book of books){
      errors.length=0;
      await page.setViewportSize({width:1440,height:900});
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

      const readerPath=new URL(book.desktop,origin).pathname;
      assert.equal(new URL(page.url()).pathname,readerPath,`${book.name} Desktop did not open the canonical reader`);
      await page.setViewportSize({width:390,height:844});
      assert.equal(await page.evaluate(()=>window.innerWidth),390,`${book.name} responsive Phone viewport was not applied`);
      assert.equal(new URL(page.url()).pathname,readerPath,`${book.name} Phone viewport left the canonical reader`);
      assert.equal(await page.locator(`#${book.unit}`).count(),1,`${book.name} responsive reader duplicated the Datasheet`);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`${book.name} responsive reader overflows horizontally`);
      const stubResponse=await page.request.get(origin+book.phone),stub=await stubResponse.text();
      assert.equal(stubResponse.ok(),true,`${book.name} legacy Phone route is unavailable`);
      assert.match(stub,/mobile-route-redirect\.js\?v=1/,`${book.name} legacy Phone route does not load the shared redirect`);
      assert.doesNotMatch(stub,/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/,`${book.name} legacy Phone route contains duplicated content`);
      await page.goto(origin+book.phone,{waitUntil:'domcontentloaded'});
      await page.waitForURL(url=>url.pathname===readerPath&&url.hash===`#${book.unit}`);
      const phoneUnit=page.locator(`#${book.unit}`);
      await phoneUnit.waitFor({state:'visible'});
      assert.ok((await phoneUnit.textContent()).trim().length>100,`${book.name} responsive content is missing`);
      if(book.name==='Space Marines')assert.match(await phoneUnit.textContent(),/Wargear Options/);
      await openPhonePopup(page,book.name);
      assert.deepEqual(errors,[],`${book.name} emitted an uncaught runtime error`);
    }
    await assertDarkAngelsLeaderJourney(page,'unit-belial','unit-terminator-squad');
    await assertDarkAngelsLeaderJourney(page,'unit-azrael','unit-hellblaster-squad');
    await assertDarkAngelsLeaderJourney(page,'unit-sammael','unit-outrider-squad');
    await assertDarkAngelsLegacyLeaderJourney(page,'belial.html','unit-belial','unit-terminator-squad');
    await assertDarkAngelsLegacyLeaderJourney(page,'azrael.html','unit-azrael','unit-hellblaster-squad');
    await assertDarkAngelsLegacyLeaderJourney(page,'sammael.html','unit-sammael','unit-outrider-squad');
    await page.goto(`${origin}/books/dark-angels/mobile/deathwing-knights.html`);
    await page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.hash==='#unit-deathwing-knights');
    const deathwingWargear=await page.locator('#deathwing-knights-wargear-abilities').textContent();
    assert.match(deathwingWargear,/Watcher in the Dark/,'Dark Angels Phone Wargear ability regressed');
    assert.match(deathwingWargear,/These abilities apply only while the corresponding wargear is equipped\./,'Dark Angels Phone Wargear note regressed');
    const glossaryTrigger=page.locator('#unit-deathwing-knights button[data-term]').first();
    await glossaryTrigger.click();
    const glossaryLink=page.locator('#popupLayer .term-popup .popup-actions a[href*="/glossary/index.html#"]').last();
    await glossaryLink.waitFor({state:'visible'});
    assert.equal(new URL(await glossaryLink.getAttribute('href'),page.url()).pathname,'/glossary/index.html','Popup glossary action lost its canonical destination');
    await Promise.all([page.waitForURL(url=>url.pathname==='/glossary/index.html'),glossaryLink.click()]);
    await page.goBack();
    const restoredPopup=page.locator('#popupLayer .term-popup').last();
    await restoredPopup.waitFor({state:'visible'});
    await restoredPopup.locator('[data-popup-close]').click();
    await page.goto(`${origin}/books/dark-angels/mobile/army-rules.html`);
    assert.match(await page.locator('main').textContent(),/Oath of Moment/);
    await page.goto(`${origin}/books/dark-angels/mobile/dark-age-arsenal.html`);
    assert.match(await page.locator('main').textContent(),/Searing Bursts/);
    await page.goto(`${origin}/books/dark-angels/mobile/company-of-hunters.html`);
    const companyOfHunters=page.locator('#detachment-company-of-hunters');
    await companyOfHunters.waitFor({state:'visible'});
    assert.match(await companyOfHunters.textContent(),/Company of Hunters/);
    console.log('PASS published Army Books open canonical responsive content, Compatible Rules, legacy redirects and glossary popups');
  }finally{
    await bookContext.close();
  }

  const previewContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const {page,errors}=await observedPage(previewContext);
    await page.goto(`${origin}/index.html`);
    await Promise.all([page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'),page.locator('a.book.da').click()]);
    assert.match(await page.locator('#start').evaluate(node=>getComputedStyle(node).backgroundImage),/dark-angels-cover-800\.webp/,'Dark Angels responsive Start lost its artwork');
    await page.locator('#navMenu').click();
    await page.locator('#tocTree [data-nav-id="datasheets"] > .toc-row [data-nav-toggle]').click();
    await page.locator('#tocTree [data-nav-id="datasheets-infantry"] > .toc-row [data-nav-toggle]').click();
    await page.locator('#tocTree [data-nav-target="unit-hellblaster-squad"]').click();
    await page.waitForFunction(()=>document.querySelector('#tocTree [data-nav-target="unit-hellblaster-squad"]')?.classList.contains('is-current'));
    assert.equal(await page.locator('#tocTree [data-nav-target="unit-hellblaster-squad"].is-current').count(),1,'Dark Angels responsive current target is not marked');
    assert.match(await page.locator('#unit-hellblaster-squad').textContent(),/Space Marines shared datasheet/,'Dark Angels responsive shared datasheet lost ownership context');
    for(const viewport of [{width:390,height:844},{width:430,height:932}]){
      await page.setViewportSize(viewport);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`Dark Angels overflows at ${viewport.width}px`);
    }
    await page.reload();
    await page.locator('#unit-hellblaster-squad').waitFor({state:'visible'});
    for(const [target,legacyPath] of [['start','/books/dark-angels/mobile/index.html'],['army-rules','/books/dark-angels/mobile/army-rules.html'],['unit-belial','/books/dark-angels/mobile/belial.html'],['unit-terminator-squad','/books/dark-angels/mobile/terminator-squad.html'],['unit-hellblaster-squad','/books/dark-angels/mobile/hellblaster-squad.html'],['detachment-wrath-of-the-rock','/books/dark-angels/mobile/wrath-of-the-rock.html'],['updates','/books/dark-angels/mobile/updates.html']]){
      await page.goto(origin+legacyPath);
      await page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.hash===`#${target}`);
      assert.equal(await page.locator(`#${target}`).count(),1,`Dark Angels legacy route lost canonical target ${target}`);
    }
    await page.goto(`${origin}/books/dark-angels/mobile/belial.html`);
    await page.waitForURL(url=>url.pathname==='/books/dark-angels/reader.html'&&url.hash==='#unit-belial');
    await page.locator('#unit-belial').waitFor({state:'visible'});
    assert.deepEqual(errors,[],'Dark Angels responsive preview emitted an uncaught runtime error');
  }finally{
    await previewContext.close();
  }

  const noScriptContext=await browser.newContext({javaScriptEnabled:false,serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await noScriptContext.newPage();
    await page.goto(`${origin}/books/chaos-space-marines/index.html`);
    const csmArt=page.locator('.entry-art img');
    await csmArt.waitFor({state:'visible'});
    await csmArt.evaluate(image=>image.decode());
    assert.equal(await csmArt.evaluate(image=>image.complete&&image.naturalWidth>0&&Math.abs(image.naturalWidth/image.naturalHeight-.8)<.01),true,'Chaos Space Marines no-JS entry artwork failed to load');
    assert.equal(await page.locator('a[href="./reader.html?view=full"]').count(),1,'Chaos Space Marines no-JS Desktop link is missing');
    assert.equal(await page.locator('a[href="./reader.html?view=mobile"]').count(),1,'Chaos Space Marines no-JS canonical Phone link is missing');
    assert.equal(await page.locator('a[href="./mobile/index.html?view=mobile"]').count(),0,'Chaos Space Marines no-JS entry still depends on a legacy Mobile stub');
    assert.equal(await page.locator('a[href="../../index.html"]').count(),1,'Chaos Space Marines no-JS Library return is missing');
    await page.goto(`${origin}/books/dark-angels/index.html`);
    const art=page.locator('.entry-art img');
    await art.waitFor({state:'visible'});
    await art.evaluate(image=>image.decode());
    assert.equal(await art.evaluate(image=>image.complete&&image.naturalWidth>0&&Math.abs(image.naturalWidth/image.naturalHeight-.8)<.01),true,'Dark Angels no-JS entry artwork failed to load');
    assert.equal(await page.locator('a[href="./reader.html?view=full"]').count(),1,'Dark Angels no-JS Desktop link is missing');
    assert.equal(await page.locator('a[href="./reader.html?view=mobile"]').count(),1,'Dark Angels no-JS canonical Phone link is missing');
    assert.equal(await page.locator('a[href="./mobile/index.html?view=mobile"]').count(),0,'Dark Angels no-JS entry still depends on a legacy Mobile stub');
    assert.equal(await page.locator('a[href="../../index.html"]').count(),1,'Dark Angels no-JS Library return is missing');
    await page.goto(`${origin}/books/dark-angels/mobile/belial.html`);
    assert.equal(await page.locator('html').getAttribute('data-canonical-reader'),'../reader.html','Dark Angels no-JS compatibility route lost canonical reader metadata');
    assert.equal(await page.locator('html').getAttribute('data-canonical-target'),'unit-belial','Dark Angels no-JS compatibility route lost canonical target metadata');
    assert.equal(await page.locator('article, section, .unit-card, [data-rule-id]').count(),0,'Dark Angels no-JS compatibility route contains duplicated book content');
    assert.equal(await page.locator('script[src*="mobile-route-redirect.js"]').count(),1,'Dark Angels compatibility route lost its redirect runtime');
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
    await page.waitForURL(url=>url.pathname==='/books/tau-empire/reader.html'&&url.searchParams.get('roster')===rosterId&&url.hash==='#unit-cadre-fireblade');
    await page.waitForFunction(()=>window.WH_ARMY_ROSTER_CONTEXT?.status==='ready'&&document.querySelector('#unit-cadre-fireblade[data-roster-selected="true"]'));
    await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();
    await page.locator('.full-related-content').waitFor({state:'visible'});
    assert.equal(await page.locator('.full-related-filter').count(),0,'One-Detachment responsive roster still exposes a Detachment selector');
    const oneDetachmentHeadings=await page.locator('.full-related-content .related-detachment:visible > h2').allTextContents();
    assert.ok(oneDetachmentHeadings.some(title=>title.startsWith('Kauyon')),'One-Detachment roster omitted its Detachment rules');
    assert.ok(!oneDetachmentHeadings.some(title=>title.startsWith("Mont'ka")),'One-Detachment roster included a foreign Detachment');
    await page.locator('.related-rules-close').click();

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

  const compatibleRosterContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const {page,errors}=await observedPage(compatibleRosterContext);
    const rosterRecord={id:'multi-detachment-compatible',name:'Multi-detachment Compatible Rules fixture',roster:{faction:"Emperor's Children",detachment:'Carnival of Excess',detachments:[{label:'Carnival of Excess'},{label:'Frenzied Host'}],units:[{id:'fixture-lord-exultant',name:'Lord Exultant',quantity:1,points:0}],enhancements:[{name:'Dark Blessings',ownerStatus:'resolved',ownerUnitId:'fixture-lord-exultant'},{name:'Euphoric Crown',ownerStatus:'resolved',ownerUnitId:'fixture-lord-exultant'}]}};
    await page.goto(`${origin}/books/emperors-children/reader.html#unit-lord-exultant`);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    await page.locator('.full-related-filter').waitFor({state:'visible'});
    assert.match(await page.locator('.full-related-filter').textContent(),/All detachments/,'Non-roster All detachments selector regressed');
    await page.locator('.related-rules-close').click();
    await page.evaluate(record=>{localStorage.setItem('emperors-children-detachment-filter','court-of-the-phoenician');localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record]));},rosterRecord);

    await page.goto(`${origin}/books/emperors-children/reader.html?roster=${rosterRecord.id}#unit-lord-exultant`);
    await page.waitForFunction(()=>window.EC_ROSTER_GUIDE?.detachmentIds?.length===2);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    await page.locator('.full-related-content').waitFor({state:'visible'});
    assert.equal(await page.locator('.full-related-filter').count(),0,'Desktop roster mode still exposes a Detachment selector');
    const desktopHeadings=await page.locator('.full-related-content .related-detachment:visible > h2').allTextContents();
    assert.ok(desktopHeadings.some(title=>title.startsWith('Carnival of Excess'))&&desktopHeadings.some(title=>title.startsWith('Frenzied Host')),'Desktop roster union omitted a roster Detachment');
    assert.ok(!desktopHeadings.some(title=>title.startsWith('Court of the Phoenician')),'Desktop roster union included a foreign Detachment');
    assert.equal(desktopHeadings.filter(title=>title==='Core Stratagems').length,1,'Desktop roster union duplicated Core Stratagems');
    await page.locator('[data-kind="enhancements"]').click();
    const enhancementHeadings=await page.locator('.full-related-content .related-detachment:visible > h2').allTextContents();
    assert.ok(enhancementHeadings.some(title=>title.startsWith('Carnival of Excess'))&&enhancementHeadings.some(title=>title.startsWith('Frenzied Host')),'Desktop roster union omitted an assigned Enhancement group');
    const snapshot=await page.evaluate(()=>{const related=window.DG_APP.relatedRules;return related.snapshot(related.layer.querySelector('[data-kind="enhancements"]'));});
    assert.equal(snapshot.detachment,'all','Roster snapshot persisted a manual Detachment');
    await page.locator('.related-rules-close').click();
    await page.evaluate(state=>window.DG_APP.relatedRules.restore(state),snapshot);
    await page.locator('.full-related-content').waitFor({state:'visible'});
    assert.equal(await page.locator('.full-related-filter').count(),0,'Restored roster state reintroduced the Detachment selector');
    assert.deepEqual(errors,[],'Desktop roster Compatible Rules emitted an uncaught runtime error');

    errors.length=0;
    await page.goto(`${origin}/books/emperors-children/mobile/lord-exultant.html?roster=${rosterRecord.id}`);
    await page.waitForURL(url=>url.pathname==='/books/emperors-children/reader.html'&&url.searchParams.get('roster')===rosterRecord.id&&url.hash==='#unit-lord-exultant');
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    await page.locator('.full-related-content').waitFor({state:'visible'});
    assert.equal(await page.locator('.full-related-filter').count(),0,'Responsive roster mode still exposes a Detachment selector');
    const phoneHeadings=await page.locator('.full-related-content .related-detachment:visible > h2').allTextContents();
    assert.ok(phoneHeadings.some(title=>title.startsWith('Carnival of Excess'))&&phoneHeadings.some(title=>title.startsWith('Frenzied Host')),'Responsive roster union omitted a roster Detachment');
    assert.ok(!phoneHeadings.some(title=>title.startsWith('Court of the Phoenician')),'Responsive roster union included a foreign Detachment');
    assert.equal(phoneHeadings.filter(title=>title==='Core Stratagems').length,1,'Responsive roster union duplicated Core Stratagems');
    assert.deepEqual(errors,[],'Responsive roster Compatible Rules emitted an uncaught runtime error');
    const csmRosterRecord={id:'csm-publication-roster',name:'CSM publication fixture',roster:{faction:'Chaos - Chaos Space Marines',detachment:'Nightmare Hunt',detachments:[{label:'Nightmare Hunt'}],units:[{id:'fixture-chaos-lord-jump-pack',name:'Chaos Lord with Jump Pack',quantity:1,points:80}],enhancements:[]}};
    await page.evaluate(record=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record])),csmRosterRecord);
    await page.goto(`${origin}/books/chaos-space-marines/reader.html?roster=${csmRosterRecord.id}#unit-chaos-lord-with-jump-pack`);
    await page.waitForFunction(()=>window.WH_ARMY_ROSTER_CONTEXT?.status==='ready'&&document.querySelector('#unit-chaos-lord-with-jump-pack[data-roster-selected="true"]'));
    await page.locator('#unit-chaos-lord-with-jump-pack .related-rules-trigger').click();
    await page.locator('.full-related-content').waitFor({state:'visible'});
    assert.equal(await page.locator('.full-related-filter').count(),0,'CSM roster mode still exposes a Detachment selector');
    const csmHeadings=await page.locator('.full-related-content .related-detachment:visible > h2').allTextContents();
    assert.ok(csmHeadings.some(title=>title.startsWith('Nightmare Hunt'))&&csmHeadings.includes('Core Stratagems'),'CSM roster lost deterministic Compatible Rules');
    assert.deepEqual(errors,[],'CSM roster publication smoke emitted an uncaught runtime error');
    console.log('PASS roster Compatible Rules for published books without a selector on Desktop and Phone');
  }finally{
    await compatibleRosterContext.close();
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
    assert.equal(await page.evaluate(async()=>Boolean(await caches.match(new URL('/books/chaos-space-marines/assets/chaos-space-marines-cover-800.webp',location.origin).href))),true,'Chaos Space Marines artwork is absent from the offline cache');
    assert.equal(await page.evaluate(async()=>Boolean(await caches.match(new URL('/books/dark-angels/assets/dark-angels-cover-800.webp',location.origin).href))),true,'Dark Angels artwork is absent from the offline cache');
    assert.equal(await page.evaluate(async()=>Boolean(await caches.match(new URL('/books/space-marines/reader.html',location.origin).href))),true,'Space Marines Desktop reader is absent from the install cache');
    errors.length=0;
    await offlineContext.setOffline(true);
    await page.goto(`${origin}/books/space-marines/reader.html#unit-intercessor-squad`,{waitUntil:'domcontentloaded'});
    await page.locator('#unit-intercessor-squad').waitFor({state:'visible'});
    assert.ok((await page.locator('#unit-intercessor-squad').textContent()).trim().length>100,'Space Marines Desktop is unusable on cold first offline use');
    for(const book of books){
      await page.goto(origin+(book.offline||book.phone),{waitUntil:'domcontentloaded'});
      await page.reload({waitUntil:'domcontentloaded'});
      const content=page.locator(`#${book.offlineUnit||book.unit}`);
      await content.waitFor({state:'visible'});
      assert.ok((await content.textContent()).trim().length>100,`${book.name} is unusable after offline reload`);
    }
    await openPhonePopup(page,'Dark Angels offline');
    assert.deepEqual(errors,[],'Offline smoke emitted an uncaught runtime error');
    console.log('PASS published visited Army Books remain usable after offline reload');
  }finally{
    await offlineContext.close();
  }
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
