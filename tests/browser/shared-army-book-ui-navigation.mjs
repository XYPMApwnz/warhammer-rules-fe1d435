import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const books=[
  ['Death Guard','death-guard'],
  ['Adeptus Mechanicus','adeptus-mechanicus'],
  ["T'au Empire",'tau-empire'],
  ["Emperor's Children",'emperors-children'],
  ['Tyranids','tyranids'],
  ['Chaos Space Marines','chaos-space-marines'],
  ['Space Marines','space-marines'],
  ['Dark Angels','dark-angels'],
  ['Blood Angels','blood-angels']
];

const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.end(await readFile(file));
  }catch{response.statusCode=404;response.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});

const observe=page=>{
  const errors=[],failed=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('requestfailed',request=>failed.push(request.url()+': '+request.failure()?.errorText));
  return{errors,failed};
};
const waitForApp=page=>page.waitForFunction(()=>Boolean(window.DG_APP?.navigation?.byId?.size));
const waitForTarget=(page,target)=>page.waitForFunction(id=>{
  const button=document.querySelector(`#tocTree [data-nav-target="${CSS.escape(id)}"]`);
  return location.hash===`#${id}`&&button?.classList.contains('is-current');
},target);
const firstContentTarget=page=>page.locator('#tocTree [data-nav-target]:not([data-nav-target="start"])').first().getAttribute('data-nav-target');
const firstUnitTarget=page=>page.locator('#tocTree [data-nav-target^="unit-"]').first().getAttribute('data-nav-target');

async function phoneContract(page,name,id){
  const observed=observe(page);
  await page.goto(`${origin}/books/${id}/reader.html#start`);
  await waitForApp(page);
  await waitForTarget(page,'start');
  const menu=page.locator('#navMenu'),panel=page.locator('#tocPanel'),scrim=page.locator('#tocScrim');
  await menu.click();
  await page.waitForFunction(()=>document.body.classList.contains('nav-drawer-open'));
  assert.equal(await menu.getAttribute('aria-expanded'),'true',`${name}: menu did not open`);
  assert.equal(await panel.getAttribute('aria-hidden'),'false',`${name}: drawer stayed hidden`);
  assert.equal(await scrim.getAttribute('aria-hidden'),'false',`${name}: scrim stayed hidden`);
  assert.equal(await page.locator('#main').evaluate(node=>node.inert),true,`${name}: document is not inert`);
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden',`${name}: body scroll is not locked`);
  assert.equal(await page.evaluate(()=>[...document.querySelector('#appHeader').children].filter(node=>node.id!=='navMenu').every(node=>node.inert)),true,`${name}: background header controls remain interactive`);
  await page.waitForFunction(()=>document.querySelector('#tocPanel')?.contains(document.activeElement));
  const drawerControls=page.locator('#tocPanel a:visible, #tocPanel button:visible, #tocPanel input:visible, #tocPanel select:visible, #tocPanel textarea:visible, #tocPanel [tabindex]:visible');
  const firstDrawerControl=drawerControls.first(),lastDrawerControl=drawerControls.last();
  await firstDrawerControl.focus();
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'navMenu',`${name}: menu is outside the drawer focus cycle`);
  await page.keyboard.press('Tab');
  assert.equal(await firstDrawerControl.evaluate(node=>document.activeElement===node),true,`${name}: forward focus did not return to first drawer control`);
  await lastDrawerControl.focus();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'navMenu',`${name}: last drawer control escaped the focus cycle`);
  await page.keyboard.press('Shift+Tab');
  assert.equal(await lastDrawerControl.evaluate(node=>document.activeElement===node),true,`${name}: reverse focus did not return to last drawer control`);

  const toggle=page.locator('#tocTree [data-nav-toggle]').first();
  const beforeToggle=await toggle.getAttribute('aria-expanded');
  await toggle.click();
  assert.notEqual(await toggle.getAttribute('aria-expanded'),beforeToggle,`${name}: branch did not toggle`);
  const target=await firstContentTarget(page),historyBefore=await page.evaluate(()=>history.length);
  await page.locator(`#tocTree [data-nav-target="${target}"]`).click();
  await waitForTarget(page,target);
  assert.equal(await page.evaluate(()=>history.length),historyBefore+1,`${name}: TOC did not push history`);
  assert.equal(await menu.getAttribute('aria-expanded'),'false',`${name}: target did not close drawer`);
  assert.equal(await page.locator('#main').evaluate(node=>node.inert),false,`${name}: document remained inert`);
  assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden',`${name}: body scroll remained locked`);
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'navMenu',`${name}: focus did not return to menu`);
  await page.goBack();await waitForTarget(page,'start');
  await page.goForward();await waitForTarget(page,target);

  await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-drawer-open'));
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'),'false',`${name}: Escape did not close drawer`);
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'navMenu',`${name}: Escape did not restore focus`);
  await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-drawer-open'));
  const scrimBox=await scrim.boundingBox();
  await page.mouse.click(scrimBox.x+scrimBox.width-8,scrimBox.y+Math.min(80,scrimBox.height/2));
  assert.equal(await menu.getAttribute('aria-expanded'),'false',`${name}: scrim did not close drawer`);
  await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-drawer-open'));
  await page.setViewportSize({width:1280,height:720});
  await page.waitForFunction(()=>!document.body.classList.contains('nav-drawer-open'));
  assert.equal(await page.locator('#main').evaluate(node=>node.inert),false,`${name}: resize left document inert`);
  assert.equal(await page.evaluate(()=>[...document.querySelector('#appHeader').children].every(node=>!node.inert)),true,`${name}: resize left header inert`);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`${name}: horizontal overflow`);
  assert.deepEqual(observed.errors,[],`${name}: console errors`);
  assert.deepEqual(observed.failed,[],`${name}: failed requests`);
  return target;
}

async function desktopContract(page,name,id){
  const observed=observe(page);
  await page.setViewportSize({width:1280,height:720});
  await page.goto(`${origin}/books/${id}/reader.html#start`);
  await waitForApp(page);await waitForTarget(page,'start');
  const collapse=page.locator('#navCollapse');
  await collapse.click();
  assert.equal(await page.evaluate(()=>document.body.classList.contains('nav-collapsed')),true,`${name}: Desktop collapse failed`);
  await collapse.click();
  assert.equal(await page.evaluate(()=>document.body.classList.contains('nav-collapsed')),false,`${name}: Desktop expand failed`);
  const target=await firstContentTarget(page);
  await page.locator(`#tocTree [data-nav-target="${target}"]`).click();
  await waitForTarget(page,target);
  await page.goBack();await waitForTarget(page,'start');
  await page.goForward();await waitForTarget(page,target);

  const unit=await firstUnitTarget(page);
  await page.goto(`${origin}/books/${id}/reader.html#${unit}`);
  await waitForApp(page);await waitForTarget(page,unit);
  await page.waitForTimeout(2300);
  const first=await page.evaluate(target=>{
    const node=document.getElementById(target),header=document.getElementById('appHeader');
    return{hash:location.hash,current:document.querySelector('[data-nav-target].is-current')?.dataset.navTarget,top:Math.round(node.getBoundingClientRect().top),expected:Math.round(header.getBoundingClientRect().bottom+18),scrollY:Math.round(scrollY)};
  },unit);
  await page.waitForTimeout(500);
  const second=await page.evaluate(()=>({current:document.querySelector('[data-nav-target].is-current')?.dataset.navTarget,scrollY:Math.round(scrollY)}));
  assert.equal(first.hash,`#${unit}`,`${name}: deep-link URL changed`);
  assert.equal(first.current,unit,`${name}: deep-link marker diverged`);
  assert.ok(Math.abs(first.top-first.expected)<=3,`${name}: deep-link target did not settle below header`);
  assert.deepEqual(second,{current:unit,scrollY:first.scrollY},`${name}: late second startup restore occurred`);
  const z=await page.evaluate(()=>({
    header:Number(getComputedStyle(document.getElementById('appHeader')).zIndex),
    drawer:Number(getComputedStyle(document.getElementById('tocPanel')).zIndex),
    related:Number(getComputedStyle(document.documentElement).getPropertyValue('--z-related-rules')),
    popup:Number(getComputedStyle(document.documentElement).getPropertyValue('--z-popup')),
    full:Number(getComputedStyle(document.documentElement).getPropertyValue('--z-full-entry'))
  }));
  assert.ok(z.drawer<z.header&&z.header<z.related&&z.related<z.popup&&z.popup<z.full,`${name}: shared overlay stack is invalid`);
  assert.deepEqual(observed.errors,[],`${name}: Desktop console errors`);
  assert.deepEqual(observed.failed,[],`${name}: Desktop failed requests`);
}

async function forcedPhoneContract(page,name,id){
  const observed=observe(page);
  await page.setViewportSize({width:1280,height:720});
  await page.goto(`${origin}/books/${id}/reader.html?probe=ui-r2&view=mobile#start`);
  await waitForApp(page);await waitForTarget(page,'start');
  const forced=await page.evaluate(()=>( {
    path:location.pathname,
    probe:new URLSearchParams(location.search).get('probe'),
    view:new URLSearchParams(location.search).get('view'),
    hash:location.hash,
    state:document.documentElement.dataset.view,
    menu:getComputedStyle(document.getElementById('navMenu')).display,
    collapse:getComputedStyle(document.getElementById('navCollapse')).display,
    overflow:document.documentElement.scrollWidth>window.innerWidth,
    href:document.querySelector('[data-view-switch]')?.href||''
  }));
  assert.equal(forced.path,`/books/${id}/reader.html`,`${name}: forced Phone view left canonical reader`);
  assert.equal(forced.probe,'ui-r2',`${name}: forced Phone view lost query state`);
  assert.equal(forced.view,'mobile',`${name}: forced Phone view lost view state`);
  assert.equal(forced.hash,'#start',`${name}: forced Phone view lost hash state`);
  assert.equal(forced.state,'mobile',`${name}: wide viewport did not apply forced Phone state`);
  assert.notEqual(forced.menu,'none',`${name}: forced Phone menu stayed hidden`);
  assert.equal(forced.collapse,'none',`${name}: Desktop collapse remained in forced Phone view`);
  assert.equal(forced.overflow,false,`${name}: forced Phone view overflowed horizontally`);
  assert.ok(forced.href.includes(`/books/${id}/reader.html`),`${name}: view switch does not retain canonical reader`);
  assert.ok(!forced.href.includes('/mobile/'),`${name}: view switch still targets a legacy Mobile route`);

  const historyBefore=await page.evaluate(()=>history.length);
  await page.locator('[data-view-switch]').click();
  await waitForApp(page);await waitForTarget(page,'start');
  const restored=await page.evaluate(()=>( {
    path:location.pathname,
    probe:new URLSearchParams(location.search).get('probe'),
    view:new URLSearchParams(location.search).get('view'),
    hash:location.hash,
    state:document.documentElement.dataset.view||null,
    menu:getComputedStyle(document.getElementById('navMenu')).display,
    collapse:getComputedStyle(document.getElementById('navCollapse')).display,
    history:history.length
  }));
  assert.equal(restored.path,`/books/${id}/reader.html`,`${name}: full view left canonical reader`);
  assert.equal(restored.probe,'ui-r2',`${name}: full view lost query state`);
  assert.equal(restored.view,'full',`${name}: full view state was not restored`);
  assert.equal(restored.hash,'#start',`${name}: full view lost hash state`);
  assert.equal(restored.state,null,`${name}: forced Phone presentation state was not cleared`);
  assert.equal(restored.menu,'none',`${name}: Phone menu remained visible in full view`);
  assert.notEqual(restored.collapse,'none',`${name}: Desktop collapse did not return in full view`);
  assert.equal(restored.history,historyBefore+1,`${name}: one view-switch click did not create exactly one transition`);
  assert.deepEqual(observed.errors,[],`${name}: forced view console errors`);
  assert.deepEqual(observed.failed,[],`${name}: forced view failed requests`);
}

async function journeyContract(page){
  const state=()=>page.evaluate(()=>({
    hash:location.hash,
    token:history.state?.whJourney||null,
    stack:window.DG_APP.journey.history.map(record=>record.token),
    current:document.querySelector('[data-nav-target].is-current')?.dataset.navTarget||null,
    backHidden:document.querySelector('#backButton').hidden,
    scrollY:Math.round(scrollY),
    targetTop:Math.round((window.WHNavigationTargets.resolve(document.getElementById(location.hash.slice(1))).scrollTarget)?.getBoundingClientRect().top||0),
    targetLine:Math.round(document.getElementById('appHeader').getBoundingClientRect().bottom+18)
  }));
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${origin}/books/death-guard/reader.html#unit-plague-marines`);
  await waitForApp(page);await waitForTarget(page,'unit-plague-marines');
  let originScroll=0;
  for(const target of ['unit-plague-marines-profile','plague-marines-abilities']){
    const button=page.locator(`[data-journey-target="${target}"]`);
    await button.scrollIntoViewIfNeeded();
    if(!originScroll)originScroll=Math.round(await page.evaluate(()=>scrollY));
    await button.click();
    await page.waitForFunction(id=>location.hash===`#${id}`&&document.querySelector('[data-nav-target].is-current')?.dataset.navTarget==='unit-plague-marines',target);
  }
  let snapshot=await state();
  assert.equal(snapshot.stack.length,2,'Journey stack did not record nested targets');
  assert.equal(snapshot.stack.at(-1),snapshot.token,'Journey URL token and nested stack diverged');
  assert.equal(snapshot.current,'unit-plague-marines','Journey changed the parent Datasheet marker');
  await page.goBack();await page.waitForFunction(()=>{
    const raw=document.getElementById('unit-plague-marines-profile'),target=window.WHNavigationTargets.resolve(raw).scrollTarget,header=document.getElementById('appHeader');
    return location.hash==='#unit-plague-marines-profile'
      &&document.querySelector('[data-nav-target].is-current')?.dataset.navTarget==='unit-plague-marines'
      &&window.DG_APP.navigation.state.owner==='reader'
      &&Math.abs(target.getBoundingClientRect().top-header.getBoundingClientRect().bottom-18)<=3;
  });
  snapshot=await state();
  assert.equal(snapshot.stack.length,1,'Journey Back left a stale nested record');
  assert.equal(snapshot.stack.at(-1),snapshot.token,'Journey Back token and stack diverged');
  assert.equal(snapshot.current,'unit-plague-marines','Journey Back changed the parent Datasheet marker');
  assert.ok(Math.abs(snapshot.targetTop-snapshot.targetLine)<=3,'Journey Back did not restore the explicit section target');
  assert.equal(snapshot.backHidden,false,'Journey Back button disappeared too early');
  await page.goBack();await page.waitForFunction(()=>location.hash==='#unit-plague-marines'&&document.querySelector('[data-nav-target].is-current')?.dataset.navTarget==='unit-plague-marines'&&window.DG_APP.navigation.state.owner==='reader');
  snapshot=await state();
  assert.deepEqual(snapshot.stack,[],'Rapid Journey Back did not restore origin stack');
  assert.equal(snapshot.token,null,'Rapid Journey Back left a URL token');
  assert.equal(snapshot.current,'unit-plague-marines','Rapid Journey Back changed the Datasheet marker');
  assert.ok(Math.abs(snapshot.scrollY-originScroll)<=1,'Non-Journey origin did not restore its scroll snapshot');
  assert.equal(snapshot.backHidden,true,'Journey Back button stayed visible at origin');
  await page.goForward();await page.waitForFunction(()=>location.hash==='#unit-plague-marines-profile'&&document.querySelector('[data-nav-target].is-current')?.dataset.navTarget==='unit-plague-marines');
  snapshot=await state();
  assert.equal(snapshot.stack.length,1,'Journey Forward did not rebuild stack');
  assert.equal(snapshot.stack.at(-1),snapshot.token,'Journey Forward token and stack diverged');
  assert.equal(snapshot.backHidden,false,'Journey Forward did not restore Back state');
  await page.goForward();await page.waitForFunction(()=>location.hash==='#plague-marines-abilities'&&document.querySelector('[data-nav-target].is-current')?.dataset.navTarget==='unit-plague-marines');
  snapshot=await state();
  assert.equal(snapshot.stack.length,2,'Nested Journey Forward did not rebuild stack');
  assert.equal(snapshot.stack.at(-1),snapshot.token,'Nested Journey Forward token and stack diverged');
  assert.equal(snapshot.current,'unit-plague-marines','Nested Journey Forward changed the parent Datasheet marker');
}

try{
  const phone=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await phone.newPage();
    for(const [name,id] of books)await phoneContract(page,name,id);
    await journeyContract(page);
  }finally{await phone.close();}
  const desktop=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}});
  try{
    const page=await desktop.newPage();
    for(const [name,id] of books){
      await desktopContract(page,name,id);
      await forcedPhoneContract(page,name,id);
    }
  }finally{await desktop.close();}
  console.log('Shared Army Book UI/navigation QA: PASS (9/9).');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
