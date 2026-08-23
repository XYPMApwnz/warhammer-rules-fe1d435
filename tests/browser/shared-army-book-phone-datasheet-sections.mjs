import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const books=[
  ['Death Guard','death-guard'],['Adeptus Mechanicus','adeptus-mechanicus'],["T'au Empire",'tau-empire'],
  ["Emperor's Children",'emperors-children'],['Tyranids','tyranids'],['Chaos Space Marines','chaos-space-marines'],
  ['Space Marines','space-marines'],['Dark Angels','dark-angels'],['Blood Angels','blood-angels']
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

const waitForApp=page=>page.waitForFunction(()=>Boolean(window.DG_APP?.navigation&&window.WHArmyBookTargetMount));
const waitForHash=(page,id)=>page.waitForFunction(target=>location.hash===`#${target}`,id);
const observe=page=>{
  const errors=[],failed=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('requestfailed',request=>failed.push(request.url()+': '+request.failure()?.errorText));
  return{errors,failed};
};
const unitIds=page=>page.evaluate(()=>window.WHArmyBookTargetMount.catalog.nodes.filter(node=>node.kind==='target'&&node.id.startsWith('unit-')).slice(0,2).map(node=>node.id));
const navSnapshot=page=>page.evaluate(()=>{
  const unit=document.querySelector('.document .unit-card'),nav=unit?.querySelector(':scope > .local-nav'),buttons=[...(nav?.querySelectorAll('[data-journey-target]')||[])];
  return{
    unitId:unit?.id||'',units:document.querySelectorAll('.document .unit-card').length,
    terminalOwners:[...document.querySelector('.document')?.children||[]].filter(node=>node.id).map(node=>node.id),
    navs:document.querySelectorAll('.document .unit-card > .local-nav').length,
    role:nav?.getAttribute('role')||'',label:nav?.getAttribute('aria-label')||'',position:nav?getComputedStyle(nav).position:'',
    targets:buttons.map(button=>button.dataset.journeyTarget),
    mapped:buttons.every(button=>{const target=document.getElementById(button.dataset.journeyTarget);return target?.matches('section.unit-part')&&target.closest('.unit-card')===unit;}),
    active:buttons.filter(button=>button.matches('.is-current,.is-active,[aria-current]')).length,
    overflow:document.documentElement.scrollWidth>window.innerWidth,
    hiddenTerminalContent:[...document.querySelectorAll('.document [data-track],.document .unit-card')].filter(node=>getComputedStyle(node).display==='none').length
  };
});
const clickSection=async(page,id)=>{
  await page.locator(`[data-journey-target="${id}"]`).click();
  await waitForHash(page,id);
  await page.waitForFunction(target=>document.getElementById(target)?.classList.contains('destination-highlight'),id);
  const feedback=await page.evaluate(target=>{
    const section=document.getElementById(target),heading=section?.querySelector(':scope > h4');
    return{section:section?.matches('section.unit-part')&&section.classList.contains('destination-highlight'),heading:heading?.classList.contains('destination-highlight')||false,active:document.querySelectorAll('.local-nav .is-current,.local-nav .is-active,.local-nav [aria-current]').length};
  },id);
  assert.deepEqual(feedback,{section:true,heading:false,active:0},`${id}: whole-section feedback contract failed`);
};

async function phoneBook(page,name,id){
  const observed=observe(page);
  await page.goto(`${origin}/books/${id}/reader.html?view=mobile#start`);await waitForApp(page);
  const [first,second]=await unitIds(page);assert.ok(first&&second,`${name}: representative Datasheets missing`);
  await page.goto(`${origin}/books/${id}/reader.html?view=mobile#${first}`);await waitForApp(page);await waitForHash(page,first);
  await page.waitForFunction(target=>document.querySelector('.document .unit-card')?.id===target,first);
  let snapshot=await navSnapshot(page);
  assert.equal(snapshot.unitId,first,`${name}: deep link mounted wrong Datasheet`);
  assert.equal(snapshot.units,1,`${name}: PHONE-1 unit count regressed`);
  assert.equal(snapshot.terminalOwners.length,1,`${name}: multiple terminal targets are live`);
  assert.equal(snapshot.navs,1,`${name}: duplicate or missing Datasheet nav`);
  assert.equal(snapshot.role,'navigation',`${name}: nav semantics missing`);
  assert.equal(snapshot.label,'Datasheet sections',`${name}: nav accessible label missing`);
  assert.equal(snapshot.position,'sticky',`${name}: nav is not sticky`);
  assert.equal(snapshot.mapped,true,`${name}: orphan local-nav target`);
  assert.equal(snapshot.active,0,`${name}: persistent active state exists`);
  assert.equal(snapshot.overflow,false,`${name}: page horizontal overflow`);
  assert.equal(snapshot.hiddenTerminalContent,0,`${name}: unrelated terminal content is hidden instead of absent`);
  assert.ok(snapshot.targets.length>=2,`${name}: no useful section navigation`);

  const middle=snapshot.targets[Math.floor(snapshot.targets.length/2)],last=snapshot.targets.at(-1);
  await clickSection(page,middle);
  const sticky=await page.evaluate(()=>{const header=document.getElementById('appHeader').getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return{delta:Math.abs(nav.top-header.bottom-6),overflow:document.documentElement.scrollWidth>window.innerWidth};});
  assert.ok(sticky.delta<=2,`${name}: sticky nav is not aligned to measured header`);assert.equal(sticky.overflow,false,`${name}: sticky nav caused overflow`);
  await page.waitForTimeout(2350);
  assert.equal(await page.locator(`#${middle}.destination-highlight`).count(),0,`${name}: highlight did not clear`);

  await clickSection(page,last);
  assert.equal(await page.evaluate(()=>document.querySelectorAll('[data-datasheet-nav-spacer],.datasheet-nav-spacer,.phone-section-spacer').length),0,`${name}: artificial bottom spacer exists`);
  await page.evaluate(target=>window.DG_APP.navigation.go(target,{historyMode:'push'}),second);await waitForHash(page,second);
  await page.waitForFunction(target=>document.querySelector('.document .unit-card')?.id===target,second);
  snapshot=await navSnapshot(page);
  assert.equal(snapshot.unitId,second,`${name}: replacement mounted wrong Datasheet`);
  assert.equal(snapshot.units,1,`${name}: previous Datasheet remained mounted`);
  assert.equal(snapshot.navs,1,`${name}: old nav survived replacement`);
  assert.equal(await page.locator(`#${first}`).count(),0,`${name}: previous Datasheet remains in live DOM`);
  assert.equal(await page.locator('.destination-highlight').count(),0,`${name}: stale target highlight survived replacement`);
  assert.deepEqual(observed.errors,[],`${name}: console errors`);assert.deepEqual(observed.failed,[],`${name}: failed requests`);
  return{first,second};
}

async function amBehavior(page){
  await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(page);
  const nav=await navSnapshot(page);assert.equal(nav.unitId,'unit-onager-dunecrawler','AM: Onager was not mounted');
  assert.equal(await page.locator('#unit-onager-dunecrawler .unit-art-background img, #unit-onager-dunecrawler .unit-art img').count(),1,'AM: translucent unit artwork missing');
  await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.waitForFunction(()=>Math.abs(scrollY-(document.documentElement.scrollHeight-innerHeight))<2);
  const visible=await page.evaluate(()=>{
    const nav=document.querySelector('.unit-card > .local-nav'),usable=nav.getBoundingClientRect().bottom;
    return[...nav.querySelectorAll('[data-journey-target]')].map(button=>button.dataset.journeyTarget).filter(id=>{const heading=document.querySelector(`#${CSS.escape(id)} > h4`),rect=heading?.getBoundingClientRect();return rect&&rect.top>=usable&&rect.top<innerHeight;});
  });
  assert.ok(visible.length>=1,'AM: no real already-visible final section fixture');
  const target=visible[0],before=await page.evaluate(()=>scrollY);await clickSection(page,target);const after=await page.evaluate(()=>scrollY);
  assert.ok(Math.abs(after-before)<=1,'AM: already-visible target caused an unnecessary jump');
  const last=nav.targets.at(-1);await page.locator(`[data-journey-target="${last}"]`).click();await waitForHash(page,last);await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('destination-highlight'),last);
  const bottom=await page.evaluate(()=>({scrollY,max:document.documentElement.scrollHeight-innerHeight}));assert.ok(Math.abs(bottom.scrollY-bottom.max)<=2,'AM: final section did not use natural bottom clamp');

  const firstSection=nav.targets[0];await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#${firstSection}`);await waitForApp(page);await waitForHash(page,firstSection);
  assert.equal((await navSnapshot(page)).unitId,'unit-onager-dunecrawler','AM: section deep link did not mount owning Datasheet');
  const middle=nav.targets[Math.floor(nav.targets.length/2)];await clickSection(page,middle);await clickSection(page,last);await page.goBack();await waitForHash(page,middle);await page.goForward();await waitForHash(page,last);

  await page.setViewportSize({width:1280,height:720});await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(page);
  assert.equal((await navSnapshot(page)).units,1,'AM: forced Phone lost single-target mount');assert.equal((await navSnapshot(page)).position,'sticky','AM: forced Phone nav is not sticky');
}

async function desktopBook(page,name,id){
  await page.goto(`${origin}/books/${id}/reader.html?view=full#datasheets`);await waitForApp(page);
  const state=await page.evaluate(()=>({units:document.querySelectorAll('.document .unit-card').length,position:getComputedStyle(document.querySelector('.unit-card > .local-nav')).position,phone:document.documentElement.hasAttribute('data-phone-single-target')}));
  assert.ok(state.units>1,`${name}: Desktop no longer mounts full book`);assert.notEqual(state.position,'sticky',`${name}: Phone sticky styling leaked to Desktop`);assert.equal(state.phone,false,`${name}: Desktop entered Phone mode`);
}

try{
  const phone=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{const page=await phone.newPage();for(const [name,id] of books)await phoneBook(page,name,id);await amBehavior(page);}finally{await phone.close();}
  const desktop=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}});
  try{const page=await desktop.newPage();for(const [name,id] of books)await desktopBook(page,name,id);}finally{await desktop.close();}
  console.log('Shared Army Book PHONE-2 Datasheet section navigation QA: PASS (9/9).');
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
