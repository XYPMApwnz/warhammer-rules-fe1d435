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
  const modalContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(modalContext);
    const books=[
      ['Adeptus Mechanicus','/books/adeptus-mechanicus/reader.html#unit-skitarii-rangers','#unit-skitarii-rangers'],
      ['Tyranids','/books/tyranids/reader.html#unit-hive-tyrant','#unit-hive-tyrant'],
      ["T'au Empire",'/books/tau-empire/reader.html#unit-breacher-team','#unit-breacher-team']
    ];
    for(const [name,url,unitSelector] of books){
      await page.goto(origin+url);
      const trigger=page.locator(`${unitSelector} .related-rules-trigger`);
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      await page.waitForFunction(()=>document.activeElement?.classList.contains('related-rules-close'));
      assert.equal(await page.evaluate(()=>[...document.body.children].filter(node=>!node.matches('.related-rules-layer,.popup-layer,.full-entry-layer')).every(node=>node.inert)),true,`${name} background must be inert`);
      for(let index=0;index<20;index+=1)await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(()=>document.querySelector('.related-rules-layer').contains(document.activeElement)),true,`${name} Tab focus must remain in dialog`);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.evaluate(()=>document.querySelector('.related-rules-layer').contains(document.activeElement)),true,`${name} Shift+Tab focus must remain in dialog`);
      await page.keyboard.press('Escape');
      assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} Escape must restore the trigger`);

      await trigger.click();
      await page.locator('.related-rules-close').click();
      assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} close button must restore the trigger`);

      await trigger.click();
      await page.locator('.related-rules-layer').evaluate(node=>node.click());
      assert.equal(await trigger.evaluate(node=>node===document.activeElement),true,`${name} backdrop must restore the trigger`);
      assert.equal(await page.evaluate(()=>[...document.body.children].some(node=>node.inert)),false,`${name} close must clear inert`);
    }
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html#unit-skitarii-rangers`);
    const journeyTrigger=page.locator('#unit-skitarii-rangers .related-rules-trigger');
    await journeyTrigger.click();
    await page.locator('.related-rules-layer [data-term]:visible').first().click();
    const journeyAction=page.locator('#popupLayer [data-journey-target]').first();
    await journeyAction.waitFor();
    const actionKey=await journeyAction.getAttribute('data-action-key');
    await journeyAction.click();
    await page.goBack();
    await page.waitForFunction(key=>document.activeElement?.dataset.actionKey===key,actionKey);
    assert.equal(await page.locator('.related-rules-layer').isVisible(),true,'Journey Back must restore Related Rules');
    assert.equal(await page.evaluate(()=>document.querySelector('.related-rules-layer').contains(document.activeElement)||document.querySelector('#popupLayer').contains(document.activeElement)),true,'Journey Back must restore focus inside the Related Rules journey');
    assert.deepEqual(errors,[]);
    console.log('PASS Related Rules modal focus, trap, inert, close restore and Journey Back');
  }finally{await modalContext.close();}

  const historyContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1194,height:834}});
  try{
    const {page,errors}=await observedPage(historyContext);
    await page.goto(`${origin}/books/death-guard/reader.html#unit-chaos-spawn`);
    const spawnAnchor=page.locator('#chaos-spawn-ability-lethal-ichor');
    await spawnAnchor.scrollIntoViewIfNeeded();
    const popupTrigger=page.locator('#unit-chaos-spawn [data-term]').first();
    await popupTrigger.click();
    const popupTerm=await page.locator('#popupLayer .term-popup').last().getAttribute('data-popup-term');
    await page.getByRole('link',{name:'Glossary entry'}).last().click();
    await page.waitForURL(/\/glossary\/index\.html/);
    await page.goBack();
    await page.waitForSelector(`#popupLayer .term-popup[data-popup-term="${popupTerm}"]`);
    await page.waitForTimeout(150);
    const restored=await page.evaluate(()=>{const record=history.state?.wh40kPageState,anchor=record?.anchor?.id?document.getElementById(record.anchor.id):document.querySelector(`[data-track="${CSS.escape(record?.anchor?.track||'')}"]`);return{record,anchorTop:anchor?.getBoundingClientRect().top,url:location.href,scrollY,scrollHeight:document.documentElement.scrollHeight,overflow:getComputedStyle(document.documentElement).overflow,popups:document.querySelectorAll('#popupLayer .term-popup').length};});
    assert.ok(restored.record?.anchor&&Math.abs(restored.anchorTop-restored.record.anchor.top)<=2,`Browser Back must restore the exact Spawn reading anchor (${restored.record?.anchor?.top} -> ${restored.anchorTop}; ${restored.url}; y=${restored.scrollY}; h=${restored.scrollHeight}; overflow=${restored.overflow}; popups=${restored.popups})`);
    assert.equal(await page.evaluate(()=>document.querySelector('#popupLayer .term-popup:last-child')===document.activeElement),true,'Browser Back must restore focus to the open popup');
    assert.deepEqual(errors,[]);
    console.log('PASS Browser Back restores exact Army Book scroll, popup and focus');
  }finally{await historyContext.close();}

  const orientationContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1194,height:834}});
  try{
    const {page,errors}=await observedPage(orientationContext);
    await page.goto(`${origin}/books/death-guard/reader.html#unit-chaos-spawn`);
    const anchor=page.locator('#chaos-spawn-ability-lethal-ichor');
    await anchor.scrollIntoViewIfNeeded();
    const before=await page.evaluate(()=>{WHPageState.capture();return history.state.wh40kPageState.anchor;});
    await page.setViewportSize({width:834,height:1194});
    await page.waitForTimeout(250);
    const after=await page.evaluate(anchor=>{const node=anchor.id?document.getElementById(anchor.id):document.querySelector(`[data-track="${CSS.escape(anchor.track)}"]`);return node?.getBoundingClientRect().top;},before);
    assert.ok(Math.abs(after-before.top)<=2,`orientation change must preserve the exact visible reading anchor (${before.top} -> ${after})`);
    assert.equal(await page.locator('[data-nav-target="unit-chaos-spawn"]').getAttribute('aria-current'),'location','orientation change must preserve the active Spawn datasheet');

    await page.setViewportSize({width:844,height:390});
    await page.goto(`${origin}/books/death-guard/mobile/chaos-spawn.html`);
    const navLink=page.locator('#mobileNav a').first();await navLink.focus();
    await page.setViewportSize({width:390,height:844});
    await page.waitForTimeout(100);
    assert.equal(await page.locator('#navButton').evaluate(node=>node===document.activeElement),true,'Phone rotation must move focus out of the hidden navigation to its menu button');
    assert.deepEqual(errors,[]);
    console.log('PASS orientation preserves reading position, active datasheet and valid focus');
  }finally{await orientationContext.close();}

  const relatedLayoutContext=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:880}});
  try{
    const {page,errors}=await observedPage(relatedLayoutContext);
    await page.goto(`${origin}/books/death-guard/reader.html#unit-chaos-land-raider`);
    assert.equal(await page.locator('.related-rules-trigger').count(),0,'Death Guard Related Rules UI must remain behind the safety flag');
    const matrix=await page.evaluate(async()=>{
      const vehicleIds=['unit-chaos-land-raider','unit-chaos-predator-annihilator','unit-chaos-predator-destructor','unit-defiler','unit-foetid-bloat-drone','unit-foetid-bloat-drone-with-heavy-blight-launcher','unit-helbrute','unit-myphitic-blight-hauler','unit-plagueburst-crawler','unit-chaos-rhino'];
      const html=await fetch('./mobile/related-rules.inc?v=2').then(response=>response.text()),template=document.createElement('template');
      template.innerHTML=html;
      template.content.querySelectorAll('[id]').forEach(node=>{node.dataset.ruleId=node.id;node.removeAttribute('id');});
      const cards=[...template.content.querySelectorAll('.stratagem,.enhancement')],byId=new Map(cards.map(card=>[card.dataset.ruleId,card]));
      const normalize=value=>String(value||'').replace(/\s+/g,' ').trim().toUpperCase();
      const profiles=vehicleIds.map(id=>{
        const node=document.getElementById(id),actual=window.DGRelatedRules.profile(node);
        const expectedKeywords=new Set((node.dataset.keywords||'').split('|').map(normalize).filter(Boolean));
        let expectedCandidates=[];
        try{expectedCandidates=JSON.parse(node.dataset.relatedCandidates||'[]').map(candidate=>({...candidate,keywords:new Set((candidate.keywords||[]).map(normalize).filter(Boolean))}));}catch{}
        return{id,actual,expected:{...actual,keywords:expectedKeywords,intrinsicKeywords:expectedKeywords,candidates:expectedCandidates.length?expectedCandidates:undefined}};
      });
      const differences=[];
      for(const profile of profiles)for(const card of cards){
        const actual=window.DGRelatedRules.match(card,profile.actual).state;
        const expected=window.DGRelatedRules.match(card,profile.expected).state;
        if(actual!==expected)differences.push([profile.id,card.dataset.ruleId,actual,expected]);
      }
      const state=(unitId,ruleId)=>window.DGRelatedRules.match(byId.get(ruleId),profiles.find(profile=>profile.id===unitId).actual).state;
      return{
        differences,
        facts:profiles.map(profile=>({id:profile.id,keywords:[...profile.actual.keywords],candidateKeywords:(profile.actual.candidates||[]).map(candidate=>[...candidate.keywords])})),
        fixtures:{
          landRaiderHeroic:state('unit-chaos-land-raider','core-stratagem-heroic-intervention'),
          helbruteHeroic:state('unit-helbrute','core-stratagem-heroic-intervention'),
          landRaiderCrushing:state('unit-chaos-land-raider','core-stratagem-crushing-impact'),
          landRaiderSmoke:state('unit-chaos-land-raider','core-stratagem-smokescreen'),
          defilerSmoke:state('unit-defiler','core-stratagem-smokescreen'),
          landRaiderPlaguesurge:state('unit-chaos-land-raider','stratagem-plaguesurge')
        }
      };
    });
    assert.deepEqual(matrix.differences,[],'production DG profiles must preserve the generated keyword facts for all 10 current Vehicles');
    assert.ok(matrix.facts.every(profile=>profile.keywords.length&&profile.candidateKeywords.every(keywords=>keywords.length)),'DG profile must not erase intrinsic or candidate keywords');
    assert.equal(matrix.fixtures.landRaiderHeroic,'no-match');
    assert.notEqual(matrix.fixtures.helbruteHeroic,'no-match');
    assert.notEqual(matrix.fixtures.landRaiderCrushing,'no-match');
    assert.notEqual(matrix.fixtures.landRaiderSmoke,'no-match');
    assert.equal(matrix.fixtures.defilerSmoke,'no-match');
    assert.equal(matrix.fixtures.landRaiderPlaguesurge,'no-match');
    await page.goto(`${origin}/books/death-guard/mobile/chaos-land-raider.html?view=mobile`);
    assert.equal(await page.locator('#relatedRules').count(),0,'Death Guard Phone Mode Related Rules must remain behind the safety flag');
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard production profile preserves all 10 Vehicle keyword contracts; Related Rules safety flag is active');
  }finally{await relatedLayoutContext.close();}

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
