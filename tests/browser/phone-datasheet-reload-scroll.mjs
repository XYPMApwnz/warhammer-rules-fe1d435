import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const books=[
  ['Death Guard','death-guard','unit-mortarion'],['Adeptus Mechanicus','adeptus-mechanicus','unit-onager-dunecrawler'],['Tau Empire','tau-empire','unit-commander-farsight'],
  ['Emperors Children','emperors-children','unit-fulgrim'],['Tyranids','tyranids','unit-deathleaper'],['Chaos Space Marines','chaos-space-marines','unit-abaddon-the-despoiler'],
  ['Space Marines','space-marines','unit-ballistus-dreadnought'],['Dark Angels','dark-angels','unit-azrael'],['Blood Angels','blood-angels','unit-astorath']
];
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});

const waitForApp=(page,unitId)=>page.waitForFunction(id=>Boolean(window.DG_APP?.navigation&&window.WHArmyBookTargetMount&&document.querySelector('.document .unit-card')?.id===id),unitId);
const waitForReader=page=>page.waitForFunction(()=>window.DG_APP?.navigation?.state?.owner==='reader');
const profileTarget=page=>page.evaluate(()=>{const unit=document.querySelector('.document .unit-card');return[...unit.querySelectorAll('.unit-part[id]')].find(section=>unit.querySelector(`[data-logical-owner="${CSS.escape(section.id)}"]`))?.id||'';});
const waitForProfile=async(page,id)=>{await page.waitForFunction(target=>location.hash===`#${target}`&&document.querySelector('.logical-destination-highlight.destination-highlight'),id);await waitForReader(page);};
const monitor=page=>{const errors=[],failed=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});page.on('requestfailed',request=>failed.push(request.url()));return{errors,failed};};

async function reloadAt(page,name,unitId,ratio,label){
  const stale=await page.evaluate(()=>{const id=location.hash.slice(1),section=document.getElementById(id),nav=document.querySelector('.unit-card > .local-nav'),targets=window.WHNavigationTargets.resolve(section),inset=window.DG_APP.navigation.geometry.headerBottom+nav.getBoundingClientRect().height+window.DG_APP.navigation.trackingGap;return{hash:location.hash,top:window.DG_APP.navigation.destination(targets.scrollTarget,inset)};});
  const manual=await page.evaluate(value=>{const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),top=Math.round(max*value);window.scrollTo({top,behavior:'instant'});return{max,top};},ratio);
  await page.waitForFunction(top=>Math.abs(scrollY-top)<=2,manual.top);
  const before=await page.evaluate(()=>{window.WHPageState.capture();return{scrollY,hash:location.hash,state:history.state?.wh40kPageState||null,journey:history.state?.whJourneyTarget||'',mounted:window.WHArmyBookTargetMount.current};});
  assert.equal(before.state?.scrollY,before.scrollY,`${name} ${label}: PageState did not capture manual scroll`);
  assert.equal(before.journey,before.hash.slice(1),`${name} ${label}: explicit Profile Journey state was not preserved`);
  await page.reload({waitUntil:'load'});await waitForApp(page,unitId);
  await page.waitForFunction(top=>window.DG_APP.navigation.state.owner==='reader'&&Math.abs(scrollY-top)<=4,before.scrollY);
  const first=await page.evaluate(()=>({scrollY,hash:location.hash,saved:history.state?.wh40kPageState?.scrollY,mounted:window.WHArmyBookTargetMount.current,units:document.querySelectorAll('.document .unit-card').length,owners:document.querySelector('.document')?.children.length||0,restoration:history.scrollRestoration,trace:window.__phone2gEarly}));
  await page.waitForTimeout(450);const late=await page.evaluate(()=>scrollY);
  assert.ok(Math.abs(first.scrollY-before.scrollY)<=4,`${name} ${label}: reload replaced manual scroll with section position`);
  assert.ok(Math.abs(late-first.scrollY)<=2,`${name} ${label}: late section restore moved the page`);
  assert.equal(first.hash,before.hash,`${name} ${label}: reload changed section hash`);
  assert.equal(first.saved,before.scrollY,`${name} ${label}: saved PageState changed during reload`);
  assert.equal(first.mounted,unitId,`${name} ${label}: reload mounted the wrong Datasheet`);
  assert.equal(first.units,1,`${name} ${label}: PHONE-1 mounted target count regressed`);
  assert.equal(first.owners,1,`${name} ${label}: unrelated terminal content was mounted`);
  assert.equal(first.restoration,'manual',`${name} ${label}: native restoration ownership changed`);
  assert.equal(first.trace.initialHash,before.hash,`${name} ${label}: bootstrap lost the original fragment`);
  assert.equal(first.trace.mount?.hash,'',`${name} ${label}: stale fragment remained effective when target DOM mounted`);
  assert.ok(first.trace.replaces.some(entry=>entry.before===before.hash&&entry.after===''),`${name} ${label}: stale fragment was not neutralized before mount`);
  assert.ok(first.trace.replaces.some(entry=>entry.before===''&&entry.after===before.hash),`${name} ${label}: original fragment was not restored without navigation`);
  assert.deepEqual(first.trace.hashchanges,[],`${name} ${label}: hash restoration triggered navigation`);
  assert.equal(first.trace.scrolls.some(entry=>Math.abs(entry.y-stale.top)<=4&&Math.abs(entry.y-before.scrollY)>4),false,`${name} ${label}: transient stale-section scroll was observed`);
  assert.equal(first.trace.scrolls.filter(entry=>entry.y>0).every(entry=>Math.abs(entry.y-before.scrollY)<=4),true,`${name} ${label}: an intermediate semantic scroll was observed`);
}

async function openProfile(page,name,book,unitId){
  await page.goto(`${origin}/books/${book}/reader.html?view=mobile#${unitId}`);await waitForApp(page,unitId);
  const profileId=await profileTarget(page);assert.ok(profileId,`${name}: logical Profile target missing`);
  await page.locator(`[data-journey-target="${profileId}"]`).click();await waitForProfile(page,profileId);
  return profileId;
}

async function directAndHistory(context){
  const fixture=await context.newPage();let ids;
  try{await fixture.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#unit-onager-dunecrawler`);await waitForApp(fixture,'unit-onager-dunecrawler');ids=await fixture.evaluate(()=>{const unit=document.querySelector('.unit-card'),profile=[...unit.querySelectorAll('.unit-part[id]')].find(section=>unit.querySelector(`[data-logical-owner="${CSS.escape(section.id)}"]`))?.id||'',abilities=[...unit.querySelectorAll('.unit-part[id]')].find(section=>section.id.endsWith('-abilities'))?.id||'';return{profile,abilities};});}finally{await fixture.close();}
  assert.ok(ids.profile&&ids.abilities,'AM: direct-link fixtures missing');
  const page=await context.newPage(),log=monitor(page);
  try{
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?view=mobile#${ids.abilities}`);await waitForApp(page,'unit-onager-dunecrawler');
    await page.waitForFunction(id=>{const section=document.getElementById(id),nav=document.querySelector('.unit-card > .local-nav')?.getBoundingClientRect(),rect=section?.getBoundingClientRect();return section&&nav&&rect&&window.DG_APP.navigation.state.owner==='reader'&&rect.bottom>nav.bottom&&rect.top<innerHeight;},ids.abilities);
    const direct=await page.evaluate(id=>{const rect=document.getElementById(id).getBoundingClientRect(),nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return{hash:location.hash,visible:rect.bottom>nav.bottom&&rect.top<innerHeight,units:document.querySelectorAll('.document .unit-card').length,mountHash:window.__phone2gEarly.mount?.hash||'',blankReplace:window.__phone2gEarly.replaces.some(entry=>entry.after==='')};},ids.abilities);assert.equal(direct.hash,`#${ids.abilities}`,'AM: direct Abilities hash changed');assert.equal(direct.visible,true,'AM: direct Abilities section is not visible');assert.equal(direct.units,1,'AM: direct section link regressed PHONE-1');assert.equal(direct.mountHash,`#${ids.abilities}`,'AM: fresh deep-link fragment was neutralized');assert.equal(direct.blankReplace,false,'AM: fresh deep-link used reload suppression');
    await page.locator(`[data-journey-target="${ids.profile}"]`).click();await waitForProfile(page,ids.profile);
    const profile=await page.evaluate(id=>{const section=document.getElementById(id),target=window.WHNavigationTargets.resolve(section).scrollTarget,nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect();return{hash:location.hash,aligned:target.getBoundingClientRect().top>=nav.bottom-1&&target.getBoundingClientRect().top<=nav.bottom+window.DG_APP.navigation.trackingGap+4,journey:history.state?.whJourneyTarget||''};},ids.profile);
    assert.equal(profile.hash,`#${ids.profile}`,'AM: intentional Profile hash changed');assert.equal(profile.aligned,true,'AM: intentional Profile no longer scrolls to statline');assert.equal(profile.journey,ids.profile,'AM: Profile Journey state missing');
    await page.goBack();await page.waitForFunction(id=>location.hash===`#${id}`&&window.DG_APP.navigation.state.owner==='reader',ids.abilities);const back=await page.evaluate(()=>({hash:location.hash,unit:window.WHArmyBookTargetMount.current,units:document.querySelectorAll('.document .unit-card').length}));assert.equal(back.hash,`#${ids.abilities}`,'AM: Back did not restore Abilities');assert.equal(back.unit,'unit-onager-dunecrawler','AM: Back changed mounted target');assert.equal(back.units,1,'AM: Back regressed PHONE-1');
    await page.goForward();await page.waitForFunction(id=>location.hash===`#${id}`&&window.DG_APP.navigation.state.owner==='reader',ids.profile);const forward=await page.evaluate(()=>({hash:location.hash,unit:window.WHArmyBookTargetMount.current,journey:history.state?.whJourneyTarget||''}));assert.equal(forward.hash,`#${ids.profile}`,'AM: Forward did not restore Profile');assert.equal(forward.unit,'unit-onager-dunecrawler','AM: Forward changed mounted target');assert.equal(forward.journey,ids.profile,'AM: Forward lost Journey state');
    assert.deepEqual(log.errors,[],'AM: direct/history console errors');assert.deepEqual(log.failed,[],'AM: direct/history failed requests');
  }finally{await page.close();}
}

try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:667}});
  try{
    await context.addInitScript(()=>{window.__phone2gEarly={initialHash:location.hash,mount:null,scrolls:[],replaces:[],hashchanges:[]};addEventListener('scroll',()=>window.__phone2gEarly.scrolls.push({hash:location.hash,y:scrollY,app:Boolean(window.DG_APP)}),{passive:true});addEventListener('hashchange',()=>window.__phone2gEarly.hashchanges.push({hash:location.hash,y:scrollY}));new MutationObserver(()=>{const unit=document.querySelector('.document .unit-card');if(unit&&!window.__phone2gEarly.mount)window.__phone2gEarly.mount={hash:location.hash,y:scrollY,unit:unit.id};}).observe(document,{childList:true,subtree:true});const replace=History.prototype.replaceState;History.prototype.replaceState=function(state,title,url){const before=location.hash,value=replace.call(this,state,title,url);window.__phone2gEarly.replaces.push({before,after:location.hash,y:scrollY});return value;};});
    for(const [name,book,unitId] of books){
      const page=await context.newPage(),log=monitor(page);
      try{await openProfile(page,name,book,unitId);const ratios=book==='adeptus-mechanicus'?[[.08,'Profile near top'],[.55,'Profile middle'],[.98,'Profile near bottom']]:[[.68,'Profile representative']];for(const [ratio,label] of ratios)await reloadAt(page,name,unitId,ratio,label);if(book==='adeptus-mechanicus'){const abilities=await page.evaluate(()=>[...document.querySelectorAll('.unit-part[id]')].find(section=>section.id.endsWith('-abilities'))?.id||'');assert.ok(abilities,'AM: Abilities reload fixture missing');await page.locator(`[data-journey-target="${abilities}"]`).click();await page.waitForFunction(id=>location.hash===`#${id}`&&document.getElementById(id)?.classList.contains('destination-highlight'),abilities);await waitForReader(page);await reloadAt(page,name,unitId,.42,'Abilities manual scroll');}assert.deepEqual(log.errors,[],`${name}: console errors`);assert.deepEqual(log.failed,[],`${name}: failed requests`);}finally{await page.close();}
    }
    await directAndHistory(context);
  }finally{await context.close();}
  console.log('PHONE-2G real reload scroll preservation QA: PASS (9/9; AM top/middle/bottom).');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
