import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
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
const touchGesture=async(locator,pointerId,{move=false,cancel=false}={})=>{
  const box=await locator.boundingBox();assert.ok(box);
  await locator.dispatchEvent('pointerdown',{pointerType:'touch',pointerId,isPrimary:true,clientX:box.x+5,clientY:box.y+5});
  if(move)await locator.dispatchEvent('pointermove',{pointerType:'touch',pointerId,isPrimary:true,clientX:box.x+25,clientY:box.y+25});
  await locator.dispatchEvent(cancel?'pointercancel':'pointerup',{pointerType:'touch',pointerId,isPrimary:true,clientX:box.x+(move?25:5),clientY:box.y+(move?25:5)});
  return box;
};

try{
  const failSoftContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(failSoftContext);
    await page.route('**/compatible-stratagems-runtime.mjs*',route=>route.abort());
    await page.goto(`${origin}/books/death-guard/reader.html#unit-chaos-land-raider`);
    await page.waitForFunction(()=>Boolean(window.DG_APP?.navigation));
    assert.equal(await page.locator('.related-rules-trigger').count(),0,'missing review module must disable only Compatible Stratagems');
    assert.equal(errors.length,1);
    assert.match(errors[0],/Failed to load resource: net::ERR_FAILED.*compatible-stratagems-runtime\.mjs/);
    console.log('PASS Death Guard feature module fails soft without blocking the reader');
  }finally{await failSoftContext.close();}

  const modalContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(modalContext);
    const books=[
      ['Death Guard','/books/death-guard/reader.html#unit-chaos-land-raider','/books/death-guard/mobile/chaos-land-raider.html','/books/death-guard/mobile/virulent-vectorium.html',true],
      ['Adeptus Mechanicus','/books/adeptus-mechanicus/reader.html#unit-skitarii-rangers','/books/adeptus-mechanicus/mobile/skitarii-rangers.html','/books/adeptus-mechanicus/mobile/cohort-acquisitus.html',true],
      ['Tyranids','/books/tyranids/reader.html#unit-hive-tyrant','/books/tyranids/mobile/hive-tyrant.html','/books/tyranids/mobile/invasion-fleet.html',true],
      ["T'au Empire",'/books/tau-empire/reader.html#unit-breacher-team','/books/tau-empire/mobile/breacher-team.html','/books/tau-empire/mobile/kauyon.html',true]
    ];
    let profileCount=0;
    for(const [name,desktop,mobile,detachment,reviewEnabled] of books){
      await page.goto(origin+desktop);
      if(name==='Death Guard')assert.deepEqual(await page.evaluate(()=>({matcher:typeof window.WHRelatedRules,legacy:typeof window.DGRelatedRules})),{matcher:'undefined',legacy:'undefined'},'Death Guard must not load the legacy matcher path');
      else if(name==='Adeptus Mechanicus')assert.deepEqual(await page.evaluate(()=>({matcher:typeof window.WHRelatedRules,legacy:typeof window.AMRelatedRules})),{matcher:'undefined',legacy:'undefined'},'Adeptus Mechanicus must not load the legacy matcher path');
      else if(name==='Tyranids')assert.deepEqual(await page.evaluate(()=>({matcher:typeof window.WHRelatedRules,legacy:typeof window.TYRRelatedRules})),{matcher:'undefined',legacy:'undefined'},'Tyranids must not load the legacy matcher path');
      else assert.deepEqual(await page.evaluate(()=>({matcher:typeof window.WHRelatedRules,legacy:typeof window.TAURelatedRules})),{matcher:'undefined',legacy:'undefined'},"T'au Empire must not load the legacy matcher path");
      if(reviewEnabled)await page.locator('.related-rules-trigger').first().waitFor();
      assert.equal(await page.locator('.related-rules-trigger').count()>0,reviewEnabled,`${name} desktop review integration state is wrong`);
      assert.ok(await page.locator('[id$="-stratagems"] .stratagem').count(),`${name} full Detachment Stratagems must remain available`);
      const parity=await page.evaluate(()=>[...document.querySelectorAll('.unit-card')].map(node=>{
        const fromDataset=WHRuleFacts.serializeRuleProfile(WHRuleFacts.profileFromDataset(node.dataset,{id:node.id}));
        const fromRecord=WHRuleFacts.serializeRuleProfile(WHRuleFacts.profileFromRecord(JSON.parse(node.dataset.ruleFacts)));
        return{id:node.id,equal:JSON.stringify(fromDataset)===JSON.stringify(fromRecord)};
      }));
      assert.ok(parity.length&&parity.every(item=>item.equal),`${name} browser dataset must equal its compiled plain record`);
      profileCount+=parity.length;
      await page.goto(origin+mobile);
      assert.equal(await page.locator('#relatedRules').count()>0,reviewEnabled,`${name} Phone Mode review integration state is wrong`);
      await page.goto(origin+detachment);
      assert.ok(await page.locator('.stratagem').count(),`${name} Phone Mode Detachment Stratagems must remain available`);
    }
    assert.equal(profileCount,199,'Browser parity must cover all published datasheets');
    const malformed=await page.evaluate(()=>{try{WHRuleFacts.profileFromDataset({ruleFacts:'{bad'},{id:'unit-browser-bad'});return'';}catch(error){return error.message;}});
    assert.match(malformed,/unit-browser-bad: malformed data-rule-facts/);
    assert.deepEqual(errors,[]);
    console.log('PASS shared safety remains active while Death Guard, Mechanicus and Tyranids review matrices are integrated');
  }finally{await modalContext.close();}

  const mechanicusContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(mechanicusContext);
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html#unit-cybernetica-datasmith`);
    await page.locator('#unit-cybernetica-datasmith .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments','Mechanicus desktop must start with All Detachments');
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'Mechanicus desktop All Detachments must show faction rules from multiple Detachments');
    const conditionLines=await page.locator('.related-rules-layer [data-rule-id="core-stratagem-crushing-impact"] .compatibility-status span').allTextContents();
    assert.deepEqual(conditionLines,['Requires an Attached Unit','Check the full card conditions'],'Mechanicus desktop must render every matrix condition');
    await page.locator('.related-rules-layer [data-kind="enhancements"]:not([hidden])').click();
    assert.ok(await page.locator('.related-rules-layer .enhancement:visible').count()>1,'Mechanicus desktop All Detachments must show Enhancements from multiple Detachments');
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>1,'Mechanicus desktop Enhancement results must span multiple Detachments');
    await page.locator('.related-rules-layer [data-kind="stratagems"]').click();
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="cohort-cybernetica"]').click();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count(),2,'Mechanicus desktop Detachment choice must narrow to Core plus one Detachment');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'am-owner-filter',roster:{faction:'Adeptus Mechanicus',detachment:'Cohort Cybernetica',detachments:[{label:'Cohort Cybernetica'}],declared:95,units:[{id:'am-owner-1',name:'Tech-Priest Enginseer',quantity:1,points:75}],enhancements:[{name:'Necromechanic',ownerUnitId:'am-owner-1',ownerStatus:'resolved'}]}}])));
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?roster=am-owner-filter#unit-tech-priest-enginseer`);
    await page.locator('#unit-tech-priest-enginseer .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,'Mechanicus desktop roster must not expose All Detachments');
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-necromechanic'],'Mechanicus desktop roster must show only the Enhancement assigned to this ownerUnitId');
    await page.goto(`${origin}/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html?roster=missing-roster`);
    assert.equal(await page.locator('#relatedRules').count(),0,'missing Mechanicus Phone roster must fail closed');
    await page.evaluate(()=>localStorage.removeItem('adeptus-mechanicus-detachment-filter'));
    await page.goto(`${origin}/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html`);
    assert.equal(await page.locator('#relatedRules').count(),1,'ordinary Mechanicus Phone Mode must keep all Detachment choices available');
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent [data-rule-id="stratagem-repolarised-augurs"]:not([hidden])').waitFor();
    assert.equal(await page.locator('#relatedDetachment').inputValue(),'all','ordinary Phone Mode must start with All detachments');
    await page.locator('[data-related-tab="enhancements"]').click();
    assert.ok(await page.locator('#relatedRulesContent .enhancement:visible').count()>0,'All detachments must include compatible Enhancements');
    await page.locator('#relatedDetachment').selectOption('cohort-acquisitus');
    await page.locator('[data-related-tab="stratagems"]').click();
    assert.equal(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count(),2,'selected Phone Detachment must show Core plus that Detachment');
    assert.equal(await page.locator('#relatedRulesContent [data-rule-id="stratagem-repolarised-augurs"] .compatibility-status').filter({hasText:'Requires Detachment selection'}).count(),0,'selected Cohort Acquisitus must resolve the Detachment-selection condition');
    await page.goto(`${origin}/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html?roster=am-owner-filter`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('[data-related-tab="enhancements"]:not([hidden])').waitFor();
    await page.locator('[data-related-tab="enhancements"]').click();
    await page.locator('#relatedRulesContent [data-rule-id="enhancement-necromechanic"]:visible').waitFor();
    assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId||card.id)),['enhancement-necromechanic'],'Mechanicus Phone roster must show only the Enhancement assigned to this ownerUnitId');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'am-wrong-faction',roster:{faction:'Death Guard',detachment:'Cohort Cybernetica',detachments:[{label:'Cohort Cybernetica'}],units:[{id:'am-wrong-owner',name:'Tech-Priest Enginseer',quantity:1,points:75}]}}])));
    await page.goto(`${origin}/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html?roster=am-wrong-faction`);
    assert.equal(await page.locator('#relatedRules').count(),0,'wrong-faction Mechanicus Phone roster must fail closed');
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?roster=am-wrong-faction#unit-tech-priest-enginseer`);
    await page.waitForURL('**/roster-guides/index.html');
    assert.equal(await page.locator('.related-rules-trigger').count(),0,'Mechanicus desktop wrong-faction gate must remain fail closed');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?roster=broken#unit-tech-priest-enginseer`);
    assert.equal(await page.locator('#unit-tech-priest-enginseer .related-rules-trigger').count(),0,'corrupt Mechanicus desktop roster must fail closed');
    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html#unit-belisarius-cawl`);
    await page.locator('#unit-belisarius-cawl .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'Belisarius Cawl must not receive Enhancements');
    await page.goto(`${origin}/books/adeptus-mechanicus/mobile/belisarius-cawl.html`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('[data-related-tab="enhancements"]:visible').count(),0,'Belisarius Cawl must not receive Phone Mode Enhancements');
    assert.deepEqual(errors,[]);
    console.log('PASS Mechanicus matrix UI conditions and roster owner filtering');
  }finally{await mechanicusContext.close();}

  const tyranidsContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(tyranidsContext);
    await page.goto(`${origin}/books/tyranids/reader.html#unit-trygon`);
    await page.locator('#unit-trygon .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments','Tyranids desktop must start with All Detachments');
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'Tyranids desktop All Detachments must show faction rules from multiple Detachments');
    await page.locator('.related-rules-layer [data-kind="enhancements"]:not([hidden])').click();
    assert.ok(await page.locator('.related-rules-layer .enhancement:visible').count()>1,'Tyranids desktop All Detachments must show Enhancements from multiple Detachments');
    await page.locator('.related-rules-layer [data-kind="stratagems"]').click();
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="subterranean-assault"]').click();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count(),2,'Tyranids desktop Detachment choice must narrow to Core plus one Detachment');
    await page.locator('.related-rules-layer [data-kind="enhancements"]:not([hidden])').click();
    await page.locator('.related-rules-layer [data-rule-id="trygon-prime"]:not([hidden])').waitFor();
    assert.equal(await page.locator('.related-rules-layer [data-rule-id="trygon-prime"] .compatibility-status').count(),0,'selected Subterranean Assault must resolve the Trygon Detachment-selection condition');

    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('#relatedDetachment').inputValue(),'all','ordinary Tyranids Phone Mode must start with All detachments');
    assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,'All detachments must include faction rules, not only Core');
    await page.locator('[data-related-tab="enhancements"]:not([hidden])').click();
    assert.ok(await page.locator('#relatedRulesContent .enhancement:visible').count()>0,'All detachments must include compatible Tyranids Enhancements');
    await page.locator('#relatedDetachment').selectOption('invasion-fleet');
    await page.locator('[data-related-tab="stratagems"]').click();
    assert.equal(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count(),2,'selected Tyranids Phone Detachment must show Core plus that Detachment');

    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'tyr-owner-filter',roster:{faction:'Tyranids',detachment:'Invasion Fleet',detachments:[{label:'Invasion Fleet'}],declared:235,units:[{id:'tyr-owner-1',name:'Hive Tyrant',quantity:1,points:205}],enhancements:[{name:'Adaptive Biology',ownerUnitId:'tyr-owner-1',ownerStatus:'resolved'}]}}])));
    await page.goto(`${origin}/books/tyranids/reader.html?roster=tyr-owner-filter#unit-hive-tyrant`);
    await page.locator('#unit-hive-tyrant .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,'Tyranids desktop roster must not expose All Detachments');
    await page.locator('.related-rules-layer [data-kind="enhancements"]:not([hidden])').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-adaptive-biology'],'Tyranids desktop roster must show only the Enhancement assigned to this ownerUnitId');
    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?roster=tyr-owner-filter`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('[data-related-tab="enhancements"]:not([hidden])').waitFor();
    await page.locator('[data-related-tab="enhancements"]').click();
    await page.locator('#relatedRulesContent [data-rule-id="enhancement-adaptive-biology"]:visible').waitFor();
    assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-adaptive-biology'],'Tyranids Phone roster must show only the Enhancement assigned to this ownerUnitId');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'tyr-wrong-faction',roster:{faction:"T'au Empire",detachment:'Invasion Fleet',detachments:[{label:'Invasion Fleet'}],units:[{id:'tyr-wrong-owner',name:'Hive Tyrant',quantity:1,points:205}]}}])));
    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?roster=tyr-wrong-faction`);
    assert.equal(await page.locator('#relatedRules').count(),0,'wrong-faction Tyranids Phone roster must remain fail closed');
    await page.goto(`${origin}/books/tyranids/reader.html?roster=tyr-wrong-faction#unit-hive-tyrant`);
    await page.waitForURL('**/roster-guides/index.html');
    assert.equal(await page.locator('.related-rules-trigger').count(),0,'wrong-faction Tyranids desktop roster must remain fail closed');
    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?roster=missing-roster`);
    assert.equal(await page.locator('#relatedRules').count(),0,'missing Tyranids Phone roster must fail closed');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));
    await page.goto(`${origin}/books/tyranids/reader.html?roster=broken#unit-hive-tyrant`);
    assert.equal(await page.locator('#unit-hive-tyrant .related-rules-trigger').count(),0,'corrupt Tyranids desktop roster must fail closed');
    await page.goto(`${origin}/books/tyranids/reader.html#unit-the-swarmlord`);
    await page.locator('#unit-the-swarmlord .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'The Swarmlord must not receive Enhancements');
    await page.goto(`${origin}/books/tyranids/mobile/the-swarmlord.html`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('[data-related-tab="enhancements"]:visible').count(),0,'The Swarmlord must not receive Phone Mode Enhancements');
    assert.deepEqual(errors,[]);
    console.log('PASS Tyranids matrix UI, Detachment resolution and roster owner filtering');
  }finally{await tyranidsContext.close();}

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

  const mechanicusPhonePopupContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  try{
    const {page,errors}=await observedPage(mechanicusPhonePopupContext);
    const popupGeometry=()=>page.evaluate(()=>{const box=node=>{const rect=node.getBoundingClientRect(),style=getComputedStyle(node);return{left:rect.left,top:rect.top,right:rect.right,bottom:rect.bottom,scrollTop:node.scrollTop,scrollWidth:node.scrollWidth,clientWidth:node.clientWidth,scrollHeight:node.scrollHeight,clientHeight:node.clientHeight,overflowY:style.overflowY};},dialog=document.getElementById('termDialog'),stack=document.getElementById('termPopupStack'),cards=[...stack.querySelectorAll('.mobile-popup-card')],close=cards.at(-1)?.querySelector('[data-popup-close]'),header=document.getElementById('appHeader');return{viewport:{width:innerWidth,height:innerHeight},document:{scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth},header:box(header),dialog:box(dialog),stack:box(stack),active:box(cards.at(-1)),close:box(close)};});
    const assertPopupGeometry=(geometry,label)=>{assert.ok(geometry.dialog.left>=0&&geometry.dialog.right<=geometry.viewport.width&&geometry.dialog.top>=geometry.header.bottom&&geometry.dialog.bottom<=geometry.viewport.height,`${label} Mechanicus dialog outside viewport: ${JSON.stringify(geometry)}`);assert.ok(geometry.stack.left>=geometry.dialog.left&&geometry.stack.right<=geometry.dialog.right&&geometry.stack.top>=geometry.dialog.top&&geometry.stack.bottom<=geometry.dialog.bottom,`${label} Mechanicus stack outside dialog: ${JSON.stringify(geometry)}`);assert.ok(geometry.active.top>=geometry.stack.top-1&&geometry.close.top>=Math.max(geometry.header.bottom,geometry.stack.top)-1&&geometry.close.right<=geometry.viewport.width&&geometry.close.bottom<=Math.min(geometry.viewport.height,geometry.stack.bottom)+1,`${label} Mechanicus active close outside visible area: ${JSON.stringify(geometry)}`);assert.equal(geometry.stack.overflowY,'auto',`${label} Mechanicus stack must own vertical scrolling: ${JSON.stringify(geometry)}`);assert.ok(geometry.stack.scrollHeight<=geometry.stack.clientHeight||geometry.stack.scrollTop>0,`${label} Mechanicus active card was not auto-scrolled when overflow exists: ${JSON.stringify(geometry)}`);assert.ok(geometry.document.scrollWidth<=geometry.document.clientWidth&&geometry.stack.scrollWidth<=geometry.stack.clientWidth+1,`${label} Mechanicus horizontal overflow: ${JSON.stringify(geometry)}`);};
    const popupRoute=`${origin}/books/adeptus-mechanicus/mobile/skitarii-marshal.html?popup=mechanicus#unit-skitarii-marshal`;
    await page.goto(popupRoute);const initialHistoryLength=await page.evaluate(()=>history.length),rootTrigger=page.locator('main [data-term="core-support"]').first();assert.equal(await rootTrigger.count(),1,'Mechanicus popup fixture must expose core-support');await rootTrigger.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').last().evaluate(node=>node===document.activeElement),true);await rootTrigger.dispatchEvent('click');assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1);
    const otherRoot=page.locator('main [data-term]:not([data-term="core-support"])').first(),otherRootId=await otherRoot.getAttribute('data-term');assert.ok(otherRootId);await otherRoot.dispatchEvent('click');assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),[otherRootId]);await rootTrigger.dispatchEvent('click');await page.evaluate(()=>{window.__amPhoneRoot=document.querySelector('#termPopupStack .mobile-popup-card');});
    const nestedTrigger=page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').first();assert.equal(await nestedTrigger.count(),1);await nestedTrigger.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2);assert.equal(await page.evaluate(()=>window.__amPhoneRoot===document.querySelector('#termPopupStack .mobile-popup-card')),true);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').last().evaluate(node=>node===document.activeElement),true);
    const geometry390=await popupGeometry();assertPopupGeometry(geometry390,'390x844');await nestedTrigger.dispatchEvent('click');assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2);const ancestorTrigger=page.locator('#termPopupStack .mobile-popup-card').last().locator('[data-term="core-support"]').first();assert.equal(await ancestorTrigger.count(),1);await ancestorTrigger.click();assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),['core-support']);assert.equal(await page.evaluate(()=>window.__amPhoneRoot===document.querySelector('#termPopupStack .mobile-popup-card')),true);await nestedTrigger.click();await page.locator('#termPopupStack .mobile-popup-card').last().locator('h2').click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2);await page.locator('[data-popup-close="1"]').click();await page.waitForTimeout(20);assert.equal(await nestedTrigger.evaluate(node=>node===document.activeElement),true);await nestedTrigger.click();await page.keyboard.press('Escape');await page.waitForTimeout(20);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1);await page.locator('[data-popup-close="0"]').click();await page.waitForTimeout(20);assert.equal(await rootTrigger.evaluate(node=>node===document.activeElement),true);assert.equal(await page.evaluate(()=>history.length),initialHistoryLength);
    await page.goto(popupRoute);const closeRoot=page.locator('main [data-term="core-support"]').first();await closeRoot.click();const closeLeader=page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').first();assert.equal(await closeLeader.count(),1);await closeLeader.click();const closeBodyguard=page.locator('#termPopupStack .mobile-popup-card').last().locator('[data-term="core-bodyguard"]').first();assert.equal(await closeBodyguard.count(),1);await closeBodyguard.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),3);await page.locator('[data-popup-close="1"]').click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1);await page.locator('[data-popup-close="0"]').click();
    await page.setViewportSize({width:320,height:568});await page.goto(popupRoute);await rootTrigger.click();await page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').click();const geometry320=await popupGeometry();assertPopupGeometry(geometry320,'320x568');await page.locator('[data-popup-close="0"]').click();await page.setViewportSize({width:390,height:844});
    await page.goto(popupRoute);await page.waitForSelector('#relatedRulesContent .related-empty, #relatedRulesContent .related-detachment');await page.evaluate(()=>{window.__phoneTouchTrace=[];for(const type of ['pointerdown','pointermove','pointerup','pointercancel','touchstart','touchend','click'])document.addEventListener(type,event=>window.__phoneTouchTrace.push({type,pointerType:event.pointerType||'',target:event.target.closest?.('[data-term]')?.dataset.term||''}),true);});const touchRoot=page.locator('main [data-term="core-support"]').first();await touchRoot.scrollIntoViewIfNeeded();const touchBox=await touchGesture(touchRoot,71,{move:true});assert.ok(touchBox.y>=0&&touchBox.y+touchBox.height<=844,`Mechanicus touch fixture must be inside the Phone viewport: ${JSON.stringify(touchBox)}`);const touchHit=await page.evaluate(box=>{const target=document.elementFromPoint(box.x+5,box.y+5),term=target?.closest?.('[data-term]');return{tag:target?.tagName||'',term:term?.dataset.term||'',href:target?.closest?.('a')?.href||'',headerBottom:document.getElementById('appHeader').getBoundingClientRect().bottom};},touchBox);assert.equal(touchHit.term,'core-support',`Mechanicus touchscreen coordinates must hit the fixture: ${JSON.stringify({touchBox,touchHit})}`);assert.ok(touchBox.y>=touchHit.headerBottom,`Mechanicus touch fixture must not be covered by the fixed header: ${JSON.stringify({touchBox,touchHit})}`);assert.equal(await page.locator('#termDialog').evaluate(node=>node.open),false);let touchNavigation='';page.on('framenavigated',frame=>{if(frame===page.mainFrame())touchNavigation=frame.url();});await page.touchscreen.tap(touchBox.x+5,touchBox.y+5);assert.equal(touchNavigation,'',`Mechanicus term tap must not navigate: ${JSON.stringify({touchBox,touchHit,touchNavigation})}`);const touchEvidence=await page.evaluate(box=>({box,viewport:{width:innerWidth,height:innerHeight},scrollY,trace:window.__phoneTouchTrace}),touchBox);assert.equal(touchEvidence.trace.filter(event=>event.type==='pointerdown'&&event.target==='core-support').length,2,`Mechanicus scroll and genuine tap must both reach the term trigger: ${JSON.stringify(touchEvidence)}`);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,`Mechanicus immediate tap after scroll must open exactly one level: ${JSON.stringify(touchEvidence)}`);const touchNested=page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').first(),touchNestedBox=await touchNested.boundingBox();assert.ok(touchNestedBox);await page.touchscreen.tap(touchNestedBox.x+5,touchNestedBox.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Mechanicus nested touch tap must append exactly one level');await page.locator('[data-popup-close="0"]').click();await touchGesture(touchRoot,72,{cancel:true});await page.touchscreen.tap(touchBox.x+5,touchBox.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Mechanicus pointercancel must not suppress the next tap');await page.locator('[data-popup-close="0"]').click();await touchRoot.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Mechanicus mouse click must ignore stale touch suppression');await page.locator('[data-popup-close="0"]').click();for(let attempt=0;attempt<2;attempt++){await page.touchscreen.tap(touchBox.x+5,touchBox.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Mechanicus rapid touch must open one level');await page.locator('[data-popup-close="0"]').click();}
    const fullRuleFixture={route:'/books/adeptus-mechanicus/mobile/skitarii-rangers.html',selector:'main [data-term="doctrina-imperatives"]',destination:'/books/adeptus-mechanicus/mobile/army-rules.html#army-rule-doctrina'},fullRuleQuery='?popup=mechanicus&case=full-rule';await page.goto(`${origin}${fullRuleFixture.route}${fullRuleQuery}#unit-skitarii-rangers`);const fullRuleTrigger=page.locator(fullRuleFixture.selector);assert.equal(await fullRuleTrigger.count(),1,`Missing Mechanicus full-rule fixture: ${JSON.stringify(fullRuleFixture)}`);assert.equal(await fullRuleTrigger.getAttribute('data-mobile-rule-path'),fullRuleFixture.destination.slice(1));await fullRuleTrigger.click();const fullRuleAction=page.locator('#termPopupStack .popup-action',{hasText:'Open full rule'}).first(),fullRuleHref=await fullRuleAction.getAttribute('href'),fullRuleUrl=new URL(fullRuleHref,page.url()),expectedFullRuleUrl=new URL(`${origin}${fullRuleFixture.destination}`);assert.equal(fullRuleUrl.pathname,expectedFullRuleUrl.pathname);assert.equal(fullRuleUrl.hash,expectedFullRuleUrl.hash);assert.equal(fullRuleUrl.search,fullRuleQuery);assert.equal(fullRuleUrl.searchParams.getAll('popup').length,1);await fullRuleAction.click();await page.waitForURL(url=>url.pathname===expectedFullRuleUrl.pathname&&url.hash===expectedFullRuleUrl.hash);assert.equal(new URL(page.url()).search,fullRuleQuery);
    await page.goto(popupRoute);await rootTrigger.click();await page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').click();const glossaryOrigin=await page.evaluate(()=>({url:location.href,scrollX,scrollY})),restoredIds=await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm));await page.locator('#termPopupStack .mobile-popup-card').last().locator('[data-mega-glossary]').click();await page.waitForURL(/\/glossary\/index\.html/);const returnRecord=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('wh40k-mega-glossary-return')||'null'));assert.deepEqual(returnRecord.popupIds,restoredIds);assert.equal(returnRecord.path,new URL(glossaryOrigin.url).pathname+new URL(glossaryOrigin.url).search+new URL(glossaryOrigin.url).hash);await page.goBack();await page.waitForFunction(ids=>JSON.stringify([...document.querySelectorAll('#termPopupStack .mobile-popup-card')].map(card=>card.dataset.popupTerm))===JSON.stringify(ids),restoredIds);assert.equal(page.url(),glossaryOrigin.url);assert.ok(Math.abs((await page.evaluate(()=>scrollY))-glossaryOrigin.scrollY)<=1);await page.locator('[data-popup-close="0"]').click();
    await page.evaluate(()=>{history.replaceState(null,'',location.href);const triggers=[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')],root=triggers.find(node=>node.dataset.term==='core-support');sessionStorage.setItem('wh40k-mega-glossary-return',JSON.stringify({v:1,createdAt:Date.now(),path:location.pathname+location.search+location.hash,scrollX,scrollY,restoreMode:'automatic',popupIds:['core-support','missing-mechanicus-term','core-leader'],rootTerm:'core-support',triggerIndex:triggers.indexOf(root)}));});await page.reload();await page.waitForFunction(()=>document.querySelectorAll('#termPopupStack .mobile-popup-card').length===1);assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),['core-support']);assert.equal(await page.evaluate(()=>sessionStorage.getItem('wh40k-mega-glossary-return')),null);await page.waitForFunction(()=>document.getElementById('termDialog')?.contains(document.activeElement));const missingOpener=page.locator('main [data-term="core-support"]').first();await page.locator('[data-popup-close="0"]').click();await missingOpener.click();await missingOpener.evaluate(node=>node.remove());await page.locator('[data-popup-close="0"]').click();await page.waitForTimeout(20);assert.equal(await page.locator('#navButton').evaluate(node=>node===document.activeElement),true);
    await page.reload();const rapidRoot=page.locator('main [data-term="core-support"]').first();await rapidRoot.click();await page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').click();await page.locator('[data-popup-close="1"]').click();await page.locator('[data-popup-close="0"]').click();for(let i=0;i<2;i++){await rapidRoot.click();await page.locator('[data-popup-close="0"]').click();}assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),0);await page.waitForFunction(()=>!document.documentElement.classList.contains('phone-popup-open'));const rapidCleanup=await page.evaluate(()=>({overflow:getComputedStyle(document.documentElement).overflow,popupOpen:document.documentElement.classList.contains('phone-popup-open'),scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));assert.notEqual(rapidCleanup.overflow,'hidden',`Mechanicus rapid close retained scroll lock: ${JSON.stringify(rapidCleanup)}`);assert.equal(rapidCleanup.popupOpen,false,`Mechanicus rapid close retained popup-open state: ${JSON.stringify(rapidCleanup)}`);assert.ok(rapidCleanup.scrollWidth<=rapidCleanup.clientWidth,`Mechanicus rapid close retained horizontal overflow: ${JSON.stringify(rapidCleanup)}`);
    const rosterSource="+ FACTION KEYWORD: Imperium - Adeptus Mechanicus\n+ DETACHMENT: Cohort Cybernetica\n+ TOTAL ARMY POINTS: 95pts\n\nChar1: 1x Tech-Priest Enginseer (75 pts): Mechanicus pistol, Omnissian axe, Servo-arm\nEnhancement: Necromechanic (+20 pts)";await page.goto(`${origin}/index.html?am-popup-setup=1`);await page.evaluate(sourceText=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'am-popup-roster',sourceText}])),rosterSource);await page.goto(`${origin}/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html?roster=am-popup-roster#unit-tech-priest-enginseer`);assert.equal(new URL(page.url()).pathname,'/books/adeptus-mechanicus/mobile/tech-priest-enginseer.html');assert.deepEqual(await page.locator('#mobileNav [data-route-type="detachment"]').evaluateAll(links=>links.map(link=>link.dataset.detachmentId)),['cohort-cybernetica']);assert.deepEqual(await page.locator('#mobileNav [data-route-type="unit"]').evaluateAll(links=>links.map(link=>link.dataset.unitId)),['unit-tech-priest-enginseer']);
    const rosterPopup=page.locator('main [data-term="core-leader"]').first();await rosterPopup.click();await page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-support"]').click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2);await page.locator('[data-popup-close="1"]').click();await page.locator('[data-popup-close="0"]').click();const rosterDoctrine=page.locator('main [data-term="doctrina-imperatives"]').first();await rosterDoctrine.click();const rosterFullRule=page.locator('#termPopupStack .popup-action',{hasText:'Open full rule'}).first(),rosterFullUrl=new URL(await rosterFullRule.getAttribute('href'),page.url());assert.equal(rosterFullUrl.searchParams.getAll('roster').length,1);assert.equal(rosterFullUrl.searchParams.get('roster'),'am-popup-roster');await rosterFullRule.click();await page.waitForURL('**/books/adeptus-mechanicus/mobile/army-rules.html?roster=am-popup-roster#army-rule-doctrina');assert.deepEqual(await page.locator('#mobileNav [data-route-type="detachment"]').evaluateAll(links=>links.map(link=>link.dataset.detachmentId)),['cohort-cybernetica']);assert.deepEqual(await page.locator('#mobileNav [data-route-type="unit"]').evaluateAll(links=>links.map(link=>link.dataset.unitId)),['unit-tech-priest-enginseer']);
    const rosterGlossaryTrigger=page.locator('main [data-term="core-heavy"]').first();await rosterGlossaryTrigger.click();await page.locator('#termPopupStack [data-mega-glossary]').click();await page.waitForURL(/\/glossary\/index\.html/);assert.equal(new URL((await page.evaluate(()=>JSON.parse(sessionStorage.getItem('wh40k-mega-glossary-return')))).path,origin).searchParams.get('roster'),'am-popup-roster');await page.goBack();await page.waitForFunction(()=>document.querySelectorAll('#termPopupStack .mobile-popup-card').length===1);assert.deepEqual(await page.locator('#mobileNav [data-route-type="unit"]').evaluateAll(links=>links.map(link=>link.dataset.unitId)),['unit-tech-priest-enginseer']);await page.locator('[data-popup-close="0"]').click();assert.deepEqual(errors,[]);console.log('PASS Adeptus Mechanicus canonical Phone popup stack, geometry, roster and Glossary return');
  }finally{await mechanicusPhonePopupContext.close();}

  const phonePopupContext=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  try{
    const {page,errors}=await observedPage(phonePopupContext);
    await page.goto(`${origin}/books/death-guard/mobile/army-rules.html?popup=stack#core-rules`);
    const popupGeometry=()=>page.evaluate(()=>{const box=node=>{const rect=node.getBoundingClientRect();return{left:rect.left,top:rect.top,right:rect.right,bottom:rect.bottom,width:rect.width,height:rect.height,scrollLeft:node.scrollLeft,scrollTop:node.scrollTop,scrollWidth:node.scrollWidth,scrollHeight:node.scrollHeight,clientWidth:node.clientWidth,clientHeight:node.clientHeight};},dialog=document.getElementById('termDialog'),stack=document.getElementById('termPopupStack'),cards=[...stack.querySelectorAll('.mobile-popup-card')],close=cards.at(-1)?.querySelector('[data-popup-close]'),header=document.getElementById('appHeader');return{viewport:{width:innerWidth,height:innerHeight},document:{scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth},header:box(header),dialog:box(dialog),stack:box(stack),active:box(cards.at(-1)),close:box(close)};});
    const assertPopupGeometry=(geometry,label)=>{
      assert.ok(geometry.dialog.left>=0&&geometry.dialog.right<=geometry.viewport.width&&geometry.dialog.top>=geometry.header.bottom&&geometry.dialog.bottom<=geometry.viewport.height,`${label} dialog outside viewport: ${JSON.stringify(geometry)}`);
      assert.ok(geometry.stack.left>=geometry.dialog.left&&geometry.stack.right<=geometry.dialog.right&&geometry.stack.top>=geometry.dialog.top&&geometry.stack.bottom<=geometry.dialog.bottom,`${label} stack outside dialog: ${JSON.stringify(geometry)}`);
      assert.ok(geometry.active.top>=geometry.stack.top-1&&geometry.close.top>=Math.max(geometry.header.bottom,geometry.stack.top)-1&&geometry.close.right<=geometry.viewport.width&&geometry.close.bottom<=Math.min(geometry.viewport.height,geometry.stack.bottom)+1,`${label} active close outside visible area: ${JSON.stringify(geometry)}`);
      assert.ok(geometry.document.scrollWidth<=geometry.document.clientWidth&&geometry.stack.scrollWidth<=geometry.stack.clientWidth+1,`${label} horizontal overflow: ${JSON.stringify(geometry)}`);
    };
    const initialHistoryLength=await page.evaluate(()=>history.length);
    const rootTrigger=page.locator('main [data-term="keyword-death-guard"]').first();
    await rootTrigger.click();
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone root term must create one popup level');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').last().evaluate(node=>node===document.activeElement),true,'Phone root card must receive focus');
    await rootTrigger.dispatchEvent('click');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone current root must not duplicate');
    const otherRootTrigger=page.locator('main [data-term]:not([data-term="keyword-death-guard"])').first(),otherRootTerm=await otherRootTrigger.getAttribute('data-term');
    assert.ok(otherRootTerm,'Phone root replacement fixture must expose a second document term');
    await otherRootTrigger.dispatchEvent('click');
    assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),[otherRootTerm],'Phone external root opening must replace the previous chain');
    await rootTrigger.dispatchEvent('click');
    assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),['keyword-death-guard'],'Phone root fixture must replace the alternate chain');
    await page.evaluate(()=>{window.__phoneRootCard=document.querySelector('#termPopupStack .mobile-popup-card');});
    const nestedTrigger=page.locator('#termPopupStack [data-popup-related]').first();
    await nestedTrigger.click();
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Phone nested term must append one popup level');
    assert.equal(await page.evaluate(()=>window.__phoneRootCard===document.querySelector('#termPopupStack .mobile-popup-card')),true,'Phone nested opening must preserve the parent card DOM');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').last().evaluate(node=>node===document.activeElement),true,'Phone nested card must receive focus');
    const nestedGeometry=await popupGeometry();assertPopupGeometry(nestedGeometry,'390x844');assert.ok(nestedGeometry.stack.scrollTop>0,'Phone stack must scroll the active nested level into view');
    await nestedTrigger.dispatchEvent('click');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Phone current nested term must not duplicate');
    const ancestorTrigger=page.locator('#termPopupStack .mobile-popup-card').last().locator('[data-term="keyword-death-guard"]').first();
    assert.equal(await ancestorTrigger.count(),1,'Phone cycle fixture must expose the root term from the nested card');
    await ancestorTrigger.click();
    assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),['keyword-death-guard'],'Phone ancestor opening must remove the nested cycle');
    assert.equal(await page.evaluate(()=>window.__phoneRootCard===document.querySelector('#termPopupStack .mobile-popup-card')),true,'Phone cycle collapse must preserve the root card DOM');
    await nestedTrigger.click();
    const siblingNestedTrigger=page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-popup-related]').nth(1);
    assert.equal(await siblingNestedTrigger.count(),1,'Phone level-close fixture must expose a second nested term');
    await siblingNestedTrigger.dispatchEvent('click');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),3,'Phone second nested opening must append a deeper level');
    await page.locator('[data-popup-close="1"]').click();
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone level-N close must remove that level and all deeper levels');
    await nestedTrigger.click();
    await page.locator('#termPopupStack .mobile-popup-card').last().locator('h2').click();
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Phone internal click must not close the popup chain');
    await page.locator('[data-popup-close="1"]').click();
    await page.waitForTimeout(20);
    assert.equal(await nestedTrigger.evaluate(node=>node===document.activeElement),true,'Phone nested close must return focus to its parent opener');
    await nestedTrigger.click();await page.keyboard.press('Escape');await page.waitForTimeout(20);
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone Escape must close only the top level');
    await page.locator('[data-popup-close="0"]').click();await page.waitForTimeout(20);
    assert.equal(await rootTrigger.evaluate(node=>node===document.activeElement),true,'Phone root close must return document focus');
    assert.equal(await page.evaluate(()=>history.length),initialHistoryLength,'ordinary Phone popup operations must not create Browser History entries');

    await page.setViewportSize({width:320,height:568});
    await rootTrigger.click();await page.locator('#termPopupStack [data-popup-related]').first().click();
    const compactGeometry=await popupGeometry();assertPopupGeometry(compactGeometry,'320x568');assert.ok(compactGeometry.stack.scrollTop>0,'compact Phone stack must scroll the active nested level into view');
    await page.locator('[data-popup-close="0"]').click();await page.setViewportSize({width:390,height:844});

    await rootTrigger.click();
    await page.locator('#termDialog').click({position:{x:2,y:2}});
    assert.equal(await page.locator('#termDialog').evaluate(node=>node.open),false,'Phone backdrop must close the complete root chain');

    await rootTrigger.scrollIntoViewIfNeeded();const box=await touchGesture(rootTrigger,41,{move:true});
    assert.ok(box.y>=0&&box.y+box.height<=844,`Phone touch fixture must be inside the Phone viewport: ${JSON.stringify(box)}`);
    assert.equal(await page.locator('#termDialog').evaluate(node=>node.open),false,'Phone touch scroll must not open a popup');
    await page.touchscreen.tap(box.x+5,box.y+5);
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone tap plus synthetic click must open exactly one level');
    const geometry=await page.evaluate(()=>{const dialog=document.getElementById('termDialog'),rect=dialog.getBoundingClientRect(),header=document.getElementById('appHeader').getBoundingClientRect();return{left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:innerWidth,height:innerHeight,headerBottom:header.bottom,overflow:dialog.scrollWidth-dialog.clientWidth};});
    assert.ok(geometry.left>=0&&geometry.right<=geometry.width&&geometry.top>=geometry.headerBottom&&geometry.bottom<=geometry.height&&geometry.overflow<=1,`Phone popup must remain inside the safe viewport: ${JSON.stringify(geometry)}`);
    await page.locator('[data-popup-close="0"]').click();
    await touchGesture(rootTrigger,42,{cancel:true});await page.touchscreen.tap(box.x+5,box.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone pointercancel must not suppress the next tap');
    const touchNested=page.locator('#termPopupStack [data-popup-related]').first(),touchNestedBox=await touchNested.boundingBox();assert.ok(touchNestedBox);await page.touchscreen.tap(touchNestedBox.x+5,touchNestedBox.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Phone nested touch tap must append exactly one level');await page.locator('[data-popup-close="0"]').click();
    await rootTrigger.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone mouse click must ignore stale touch suppression');await page.locator('[data-popup-close="0"]').click();
    for(let attempt=0;attempt<2;attempt++){await page.touchscreen.tap(box.x+5,box.y+5);assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone rapid touch must open one level');await page.locator('[data-popup-close="0"]').click();}

    const fullRuleFixture={route:'/books/death-guard/mobile/typhus.html',selector:'main [data-term="ability-the-destroyer-hive-70f0cc1"]',destination:'/books/death-guard/mobile/typhus.html#typhus-ability-the-destroyer-hive'};
    const fullRuleQuery='?popup=stack&case=full-rule';
    await page.goto(`${origin}${fullRuleFixture.route}${fullRuleQuery}#typhus`);
    const routedTrigger=page.locator(fullRuleFixture.selector);
    assert.equal(await routedTrigger.count(),1,`Missing Phone full-rule fixture: route=${fullRuleFixture.route} selector=${fullRuleFixture.selector} destination=${fullRuleFixture.destination}`);
    assert.equal(await routedTrigger.getAttribute('data-mobile-rule-path'),fullRuleFixture.destination.slice(1),`Unexpected Phone full-rule fixture destination on ${fullRuleFixture.route}`);
    assert.equal(await routedTrigger.evaluate(node=>Boolean(node.closest('main'))),true,`Phone full-rule fixture trigger must remain inside <main>: ${fullRuleFixture.selector}`);
    await routedTrigger.click();
    const fullRuleAction=page.locator('#termPopupStack .popup-action',{hasText:'Open full rule'}).first();
    const fullRuleHref=await fullRuleAction.getAttribute('href');
    assert.ok(fullRuleHref,'Phone popup full-rule action must have a destination');
    const fullRuleUrl=new URL(fullRuleHref,page.url()),expectedFullRuleUrl=new URL(`${origin}${fullRuleFixture.destination}`);
    assert.equal(fullRuleUrl.pathname,expectedFullRuleUrl.pathname,'Phone popup full-rule action must use the generated local route');
    assert.equal(fullRuleUrl.hash,expectedFullRuleUrl.hash,'Phone popup full-rule action must preserve the generated destination hash');
    assert.equal(fullRuleUrl.search,fullRuleQuery,'Phone popup full-rule action must preserve the current query');
    assert.equal(fullRuleUrl.searchParams.getAll('popup').length,1,'Phone popup full-rule action must not duplicate popup query');
    assert.equal(fullRuleUrl.searchParams.getAll('case').length,1,'Phone popup full-rule action must not duplicate fixture query');
    await fullRuleAction.click();
    await page.waitForURL(url=>url.pathname===expectedFullRuleUrl.pathname&&url.hash===expectedFullRuleUrl.hash);
    const navigatedFullRuleUrl=new URL(page.url());
    assert.equal(navigatedFullRuleUrl.pathname,expectedFullRuleUrl.pathname,'Phone full-rule click must reach the generated local route');
    assert.equal(navigatedFullRuleUrl.hash,expectedFullRuleUrl.hash,'Phone full-rule click must reach the generated destination hash');
    assert.equal(navigatedFullRuleUrl.search,fullRuleQuery,'Phone full-rule click must preserve query exactly once');

    await page.goto(`${origin}/books/death-guard/mobile/army-rules.html?popup=stack#core-rules`);

    await rootTrigger.click();await page.locator('#termPopupStack [data-popup-related]').first().click();
    const glossaryOrigin=await page.evaluate(()=>({url:location.href,scrollX,scrollY,activeTerm:document.activeElement?.dataset.popupTerm||'',historyLength:history.length}));
    const restoredIds=await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm));
    await page.locator('#termPopupStack .mobile-popup-card').last().locator('[data-mega-glossary]').click();
    await page.waitForURL(/\/glossary\/index\.html/);
    const glossaryReturnRecord=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('wh40k-mega-glossary-return')||'null'));
    assert.ok(glossaryReturnRecord,'Phone Glossary transition must save a return record');
    assert.deepEqual(glossaryReturnRecord.popupIds,restoredIds,'Phone Glossary return record must preserve the complete popup chain');
    assert.equal(glossaryReturnRecord.path,new URL(glossaryOrigin.url).pathname+new URL(glossaryOrigin.url).search+new URL(glossaryOrigin.url).hash,'Phone Glossary return record must preserve route, query and hash');
    assert.equal(glossaryReturnRecord.scrollX,glossaryOrigin.scrollX,'Phone Glossary return record must preserve horizontal scroll');
    assert.equal(glossaryReturnRecord.scrollY,glossaryOrigin.scrollY,'Phone Glossary return record must preserve vertical scroll');
    await page.goBack();
    await page.waitForFunction(ids=>JSON.stringify([...document.querySelectorAll('#termPopupStack .mobile-popup-card')].map(card=>card.dataset.popupTerm))===JSON.stringify(ids),restoredIds);
    assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),restoredIds,'Phone Glossary return must restore the popup chain');
    assert.equal(page.url(),glossaryOrigin.url,'Phone Glossary return must restore route, query and hash');
    assert.ok(Math.abs((await page.evaluate(()=>scrollY))-glossaryOrigin.scrollY)<=1,'Phone Glossary return must restore document scroll');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').last().evaluate(node=>node===document.activeElement),true,'Phone Glossary return must focus the restored active level');
    await page.locator('[data-popup-close="0"]').click();
    await page.evaluate(()=>{history.replaceState(null,'',location.href);const triggers=[...document.querySelectorAll('main [data-term],#relatedRules [data-term]')],root=triggers.find(node=>node.dataset.term==='keyword-death-guard');sessionStorage.setItem('wh40k-mega-glossary-return',JSON.stringify({v:1,createdAt:Date.now(),path:location.pathname+location.search+location.hash,scrollX,scrollY,restoreMode:'automatic',popupIds:['keyword-death-guard','missing-phone-term','death-guard-army-rules-nurgles-gift'],rootTerm:'keyword-death-guard',triggerIndex:triggers.indexOf(root)}));});
    await page.reload();await page.waitForFunction(()=>document.querySelectorAll('#termPopupStack .mobile-popup-card').length===1);
    assert.deepEqual(await page.locator('#termPopupStack .mobile-popup-card').evaluateAll(cards=>cards.map(card=>card.dataset.popupTerm)),['keyword-death-guard'],'invalid saved nested term must restore only the valid popup prefix');
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('wh40k-mega-glossary-return')),null,'Phone invalid saved popup suffix must be consumed after fail-safe restoration');
    await page.waitForFunction(()=>document.getElementById('termDialog')?.contains(document.activeElement));
    assert.equal(await page.locator('#termDialog').evaluate(node=>node.contains(document.activeElement)),true,'Phone valid restored popup prefix must retain focus inside the open modal');
    const missingOpener=page.locator('main [data-term="keyword-death-guard"]').first();await page.locator('[data-popup-close="0"]').click();await missingOpener.click();await missingOpener.evaluate(node=>node.remove());await page.locator('[data-popup-close="0"]').click();await page.waitForTimeout(20);
    assert.equal(await page.locator('#navButton').evaluate(node=>node===document.activeElement),true,'missing Phone popup opener must use the safe focus fallback');
    await page.reload();
    const rapidTrigger=page.locator('main [data-term="keyword-death-guard"]').first();
    await rapidTrigger.click();await page.locator('#termPopupStack [data-popup-related]').first().click();await page.locator('[data-popup-close="1"]').click();await page.locator('[data-popup-close="0"]').click();
    const rapidOtherRoot=page.locator('main [data-term]:not([data-term="keyword-death-guard"])').first();await rapidOtherRoot.click();assert.notEqual(await page.locator('#termPopupStack .mobile-popup-card').first().getAttribute('data-popup-term'),'keyword-death-guard','rapid Phone sequence must open a different root');await page.locator('[data-popup-close="0"]').click();await rapidTrigger.click();await page.locator('#termPopupStack [data-popup-related]').first().click();await page.mouse.click(1,1);
    for(let attempt=0;attempt<2;attempt++){await rapidTrigger.click();await page.locator('[data-popup-close="0"]').click();}
    await page.waitForFunction(()=>!document.documentElement.classList.contains('phone-popup-open'));
    assert.equal(await page.locator('#termDialog').evaluate(node=>node.open),false,'rapid Phone popup opening and closing must leave a valid closed state');
    assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),0,'rapid Phone popup opening and closing must leave no stale levels');
    assert.equal(await page.locator('#termPopupStack :is(a,button,[tabindex])').count(),0,'rapid Phone popup opening and closing must leave no hidden focusable popup controls');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),true,'rapid Phone popup opening and closing must leave no horizontal document overflow');
    assert.equal(await page.evaluate(()=>getComputedStyle(document.body).overflow!=='hidden'&&getComputedStyle(document.documentElement).overflow!=='hidden'),true,'rapid Phone popup opening and closing must restore page scroll policy');
    await rapidTrigger.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Phone popup must open normally after the rapid sequence');await page.locator('[data-popup-close="0"]').click();
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard Phone nested popup, focus, touch, geometry and Glossary return');
  }finally{await phonePopupContext.close();}

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
    await page.locator('#unit-chaos-land-raider .related-rules-trigger').waitFor();
    await page.locator('#unit-chaos-land-raider .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments','Death Guard desktop must start with All Detachments');
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'Death Guard desktop All Detachments must show faction rules from multiple Detachments');
    assert.equal(await page.locator('.related-rules-layer [data-detachment="core"] [data-rule-id="core-stratagem-command-re-roll"]:not([hidden])').count(),1,'desktop must show matrix-approved Core Stratagems');
    assert.equal(await page.locator('.related-rules-layer [data-rule-id="stratagem-disgustingly-resilient"]:not([hidden])').count(),1,'desktop must show the matrix-approved Stratagem');
    assert.equal(await page.locator('.related-rules-layer .enhancement:visible').count(),0,'review integration must not revive legacy Enhancement matching');
    assert.equal(await page.locator('.related-rules-layer [data-rule-id="stratagem-plaguesurge"] .compatibility-status span').textContent(),'Requires Warlord selection');
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="virulent-vectorium"]').click();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count(),2,'Death Guard desktop Detachment choice must narrow to Core plus one Detachment');
    await page.evaluate(()=>localStorage.removeItem('death-guard-detachment-filter'));
    await page.goto(`${origin}/books/death-guard/mobile/chaos-land-raider.html?view=mobile`);
    assert.equal(await page.locator('#relatedDetachment').inputValue(),'all','Death Guard Phone Mode must start with All Detachments');
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,'Death Guard Phone All Detachments must show faction rules from multiple Detachments');
    await page.locator('#relatedDetachment').selectOption('virulent-vectorium');
    await page.locator('#relatedRulesContent [data-detachment="virulent-vectorium"] .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count(),2,'Phone Mode must show Core plus one selected Detachment');
    assert.equal(await page.locator('#relatedRulesContent [data-detachment="core"] #core-stratagem-command-re-roll:not([hidden])').count(),1,'Phone Mode must show matrix-approved Core Stratagems');
    assert.equal(await page.locator('#stratagem-disgustingly-resilient:not([hidden])').count(),1,'Phone Mode must show the matrix-approved Stratagem');
    assert.equal(await page.locator('#stratagem-plaguesurge .compatibility-status span').textContent(),'Requires Warlord selection');
    await page.evaluate(()=>localStorage.removeItem('death-guard-detachment-filter'));
    await page.goto(`${origin}/books/death-guard/reader.html#unit-biologus-putrifier`);
    await page.locator('#unit-biologus-putrifier .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.ok(await page.locator('.related-rules-layer .enhancement:visible').count()>4,'Death Guard desktop All Detachments must show Enhancements from multiple Detachments');
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>1,'Death Guard desktop Enhancement results must span multiple Detachments');
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="virulent-vectorium"]').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="virulent-vectorium"] .enhancement:not([hidden])').count(),4,'desktop must show the four standard Virulent Vectorium Enhancements');
    assert.equal(await page.locator('.related-rules-layer [data-enhancement-tags="UPGRADE"]:visible').count(),0,'desktop must not leak UPGRADE from another Detachment');
    await page.evaluate(()=>localStorage.removeItem('death-guard-detachment-filter'));
    await page.goto(`${origin}/books/death-guard/mobile/biologus-putrifier.html?view=mobile`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    await page.locator('[data-related-tab="enhancements"]').click();
    assert.ok(await page.locator('#relatedRulesContent .enhancement:visible').count()>4,'Death Guard Phone All Detachments must show Enhancements from multiple Detachments');
    await page.locator('#relatedDetachment').selectOption('virulent-vectorium');
    assert.equal(await page.locator('#relatedRulesContent [data-detachment="virulent-vectorium"] .enhancement:not([hidden])').count(),4,'Phone Mode must show the four standard Virulent Vectorium Enhancements');
    assert.equal(await page.locator('#relatedRulesContent [data-enhancement-tags="UPGRADE"]:visible').count(),0,'Phone Mode must not leak UPGRADE from another Detachment');
    await page.goto(`${origin}/books/death-guard/reader.html#unit-helbrute`);
    await page.locator('#unit-helbrute .related-rules-trigger').click();
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="contagion-engines"]').click();
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="contagion-engines"] [data-enhancement-tags="UPGRADE"]:visible').count(),2,'desktop Helbrute must show both Contagion Engines UPGRADE cards');
    await page.goto(`${origin}/books/death-guard/mobile/plague-marines.html?view=mobile`);
    await page.locator('#relatedDetachment').selectOption('flyblown-host');
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent [data-detachment="flyblown-host"] .stratagem:not([hidden])').first().waitFor();
    await page.locator('[data-related-tab="enhancements"]').click();
    assert.equal(await page.locator('#relatedRulesContent [data-detachment="flyblown-host"] [data-enhancement-tags="UPGRADE"]:visible').count(),2,'Phone Mode Plague Marines must show both Flyblown Host UPGRADE cards');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'dg-owner-filter',roster:{faction:'Death Guard',detachment:'Contagion Engines',detachments:[{label:'Contagion Engines'}],declared:210,units:[{id:'dg-owner-1',name:'Helbrute',quantity:1,points:110},{id:'dg-owner-2',name:'Myphitic Blight-hauler',quantity:1,points:100}],enhancements:[{name:'Parasitic Woe-Reaper',ownerUnitId:'dg-owner-1',ownerStatus:'resolved'}]}}])));
    await page.goto(`${origin}/books/death-guard/reader.html?roster=dg-owner-filter#unit-helbrute`);
    await page.locator('#unit-helbrute .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,'Death Guard desktop roster must not expose All Detachments');
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-parasitic-woe-reaper'],'desktop roster mode must show only the UPGRADE assigned to this ownerUnitId');
    await page.locator('.related-rules-layer .related-rules-close').click();
    await page.locator('#unit-myphitic-blight-hauler .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'desktop roster unit without an assignment must not show Enhancement choices');
    await page.goto(`${origin}/books/death-guard/mobile/helbrute.html?view=mobile&roster=dg-owner-filter`);
    assert.deepEqual(await page.locator('#relatedDetachment option').evaluateAll(options=>options.map(option=>option.value)),['contagion-engines'],'Phone Mode roster must expose only its actual Detachment');
    assert.equal(await page.locator('#relatedDetachment').isDisabled(),true,'a single roster Detachment must be fixed');
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('#relatedRulesContent [data-detachment="virulent-vectorium"] .stratagem:visible').count(),0,'Contagion Engines roster must not expose Virulent Vectorium');
    await page.locator('[data-related-tab="enhancements"]').click();
    assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.id)),['enhancement-parasitic-woe-reaper'],'Phone Mode roster must show only the UPGRADE assigned to this ownerUnitId');
    await page.goto(`${origin}/books/death-guard/mobile/myphitic-blight-hauler.html?view=mobile&roster=dg-owner-filter`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('[data-related-tab="enhancements"]:visible').count(),0,'Phone Mode roster unit without an assignment must not show Enhancement choices');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'dg-wrong-faction',roster:{faction:'Adeptus Mechanicus',detachment:'Contagion Engines',detachments:[{label:'Contagion Engines'}],units:[{id:'dg-wrong-owner',name:'Helbrute',quantity:1,points:110}]}}])));
    await page.goto(`${origin}/books/death-guard/mobile/helbrute.html?view=mobile&roster=dg-wrong-faction`);
    assert.equal(await page.locator('#relatedRules').count(),0,'wrong-faction Death Guard Phone roster must fail closed');
    await page.goto(`${origin}/books/death-guard/reader.html?roster=dg-wrong-faction#unit-helbrute`);
    await page.waitForURL('**/roster-guides/index.html');
    assert.equal(await page.locator('.related-rules-trigger').count(),0,'wrong-faction Death Guard desktop roster must fail closed');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));
    await page.goto(`${origin}/books/death-guard/reader.html?roster=broken#unit-helbrute`);
    assert.equal(await page.locator('#unit-helbrute .related-rules-trigger').count(),0,'damaged desktop roster storage must fail closed');
    await page.goto(`${origin}/books/death-guard/mobile/helbrute.html?view=mobile&roster=broken`);
    assert.equal(await page.locator('#relatedRules').count(),0,'damaged roster storage must hide Compatible Rules instead of revealing Enhancements');
    await page.evaluate(()=>localStorage.removeItem('death-guard-detachment-filter'));
    await page.goto(`${origin}/books/death-guard/mobile/helbrute.html?view=mobile`);
    assert.equal(await page.locator('#relatedDetachment option').count(),10,'ordinary Phone Mode must keep All plus every Detachment');
    assert.equal(await page.locator('#relatedDetachment').inputValue(),'all','ordinary Death Guard Phone Mode must default to All Detachments');
    assert.equal(await page.locator('#relatedDetachment').isDisabled(),false,'ordinary Phone Mode Detachment selector must remain unrestricted');
    await page.goto(`${origin}/books/death-guard/reader.html#unit-mortarion`);
    await page.locator('#unit-mortarion .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'Mortarion must not receive Enhancements');
    await page.goto(`${origin}/books/death-guard/mobile/mortarion.html?view=mobile`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('[data-related-tab="enhancements"]:visible').count(),0,'Mortarion must not receive Phone Mode Enhancements');
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard review matrix uses the existing desktop and Phone Mode interfaces');
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

  const tauRulesContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(tauRulesContext);
    await page.goto(`${origin}/books/tau-empire/reader.html#unit-cadre-fireblade`);
    await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments',"T'au desktop must start with All Detachments");
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,"T'au desktop All Detachments must show several faction Detachments");
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.ok(await page.locator('.related-rules-layer .enhancement:visible').count()>1,"T'au desktop must show matrix-approved Enhancements from several Detachments");
    await page.locator('.related-rules-layer [data-kind="stratagems"]').click();await page.locator('.related-rules-layer .full-related-filter summary').click();await page.locator('.related-rules-layer button[data-detachment="kauyon"]').click();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count(),2,"T'au Detachment filter must retain Core plus the selected Detachment");await page.locator('.related-rules-close').click();
    await page.goto(`${origin}/books/tau-empire/reader.html#unit-commander-farsight`);await page.locator('#unit-commander-farsight .related-rules-trigger').click();assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,"T'au Epic Heroes must not receive Enhancements");
    await page.goto(`${origin}/books/tau-empire/mobile/stealth-battlesuits.html?view=mobile`);await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();assert.equal(await page.locator('#relatedDetachment').inputValue(),'all',"T'au Phone Mode must start with All Detachments");await page.locator('[data-related-tab="enhancements"]').click();assert.ok(await page.locator('#relatedRulesContent .enhancement:visible').count()>1,"T'au Phone Mode must show compatible Enhancements and UPGRADE options");await page.locator('#relatedDetachment').selectOption('advanced-acquisition-cadre');assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId||card.id).sort()),['negation-emitters-upgrade','unmasking-suite-upgrade']);
    assert.deepEqual(errors,[]);console.log("PASS T'au matrix-backed desktop and Phone Compatible Rules");
  }finally{await tauRulesContext.close();}

  const rosterGuidesContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(rosterGuidesContext);
    await page.goto(`${origin}/roster-guides/index.html`);
    const source=(faction,detachment='Kauyon',units='Char1: 1x Cadre Fireblade (50 pts)')=>`+ FACTION KEYWORD: ${faction}\n+ DETACHMENT: ${detachment}\n+ TOTAL ARMY POINTS: 50pts\n\n${units}`;
    const create=async(faction,{accepted=true,detachment,units}={})=>{
      const before=await page.evaluate(()=>{try{return JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length;}catch{return 0;}});
      await page.locator('#roster-input').fill(source(faction,detachment,units));
      await page.locator('#roster-form button[type="submit"]').click();
      if(!accepted){
        assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length),before,`${faction} must not be saved`);
        assert.equal(await page.locator('#roster-result .eyebrow').textContent(),'Unknown faction');
        return null;
      }
      await page.waitForFunction(expected=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length===expected,before+1);
      const record=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0]);
      assert.equal(record.roster.faction,faction.toLowerCase().includes('death guard')?'Death Guard':faction.toLowerCase().includes('adeptus mechanicus')?'Adeptus Mechanicus':faction.toLowerCase().includes('tyranids')?'Tyranids':"T'au Empire");
      return record;
    };

    const ownerRecord=await create("Xenos - T'au Empire",{units:'Char1: 1x Cadre Fireblade (50 pts): Fireblade pulse rifle, close combat weapon\nEnhancement: Through Unity, Devastation (+30 pts)\nChar2: 1x Commander in Coldstar Battlesuit (130 pts)'});
    await page.locator('#open-guide').click();
    await page.waitForURL('**/books/tau-empire/reader.html**');
    await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-through-unity-devastation'],'Roster Guides must preserve exact T\'au ownerUnitId on desktop open');
    await page.locator('.related-rules-close').click();
    await page.locator('#unit-commander-in-coldstar-battlesuit .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'another eligible T\'au owner must not receive the assigned Enhancement');
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=${ownerRecord.id}`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    await page.locator('[data-related-tab="enhancements"]').click();
    assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId||card.id)),['enhancement-through-unity-devastation'],'Roster Guides must preserve exact T\'au ownerUnitId on Phone open');

    await page.goto(`${origin}/roster-guides/index.html`);
    for(const faction of ["Xenos – Tau Empire","Xenos — T'au Empire","T'au Empire","Tau Empire"])await create(faction);
    await create('Chaos - Death Guard',{detachment:'Contagion Engines',units:'Char1: 1x Helbrute (110 pts)'});
    await create('Imperium - Adeptus Mechanicus',{detachment:'Cohort Cybernetica',units:'Char1: 1x Tech-Priest Enginseer (75 pts)'});
    await create('Xenos - Tyranids',{detachment:'Invasion Fleet',units:'Char1: 1x Neurotyrant (80 pts)'});
    for(const faction of ["Imperium - T'au Empire","Chaos - T'au Empire",'Chaos - Tyranids','Xenos - Death Guard','Aeldari'])await create(faction,{accepted:false});

    const backup={id:'tau-ascii-backup',name:'ASCII T\'au backup',sourceText:source('Tau Empire'),roster:{faction:'Tau Empire',detachment:'Kauyon',detachments:[{label:'Kauyon'}],units:[{id:'parsed-unit-1',name:'Cadre Fireblade',quantity:1,points:50}]}};
    const beforeImport=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).length);
    await page.locator('#import-roster-file').setInputFiles({name:'tau-ascii-backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
    await page.waitForFunction(expected=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).length===expected,beforeImport+1);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')).find(record=>record.id==='tau-ascii-backup').roster.faction),"T'au Empire",'backup import must canonicalise Tau Empire');

    await page.evaluate(()=>localStorage.removeItem('wh40k-rosters-v1'));
    await page.reload();
    assert.match(await page.locator('#saved-roster-list').textContent(),/No saved rosters/,'missing roster storage must stay empty');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));
    await page.reload();
    assert.match(await page.locator('#saved-roster-list').textContent(),/No saved rosters/,'corrupt roster storage must fail closed');
    await create('Tau Empire');
    assert.equal(await page.evaluate(()=>localStorage.getItem('wh40k-rosters-v1-corrupt-backup')),'{broken','corrupt roster storage must remain recoverable');
    assert.deepEqual(errors,[]);
    console.log('PASS Roster Guides faction aliases, parent gates, owner IDs and backup import');
  }finally{await rosterGuidesContext.close();}

  const rosterContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(rosterContext);
    await page.goto(`${origin}/index.html?roster-setup=1`);
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([
      {id:'tau-enhancement-qa',name:'Test Kauyon roster',sourceText:"+ FACTION KEYWORD: Xenos — T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 180pts\n\nChar1: 1x Cadre Fireblade (50 pts): Fireblade pulse rifle, close combat weapon\nEnhancement: Through Unity, Devastation (+30 pts)\nChar2: 1x Commander in Coldstar Battlesuit (130 pts)"},
      {id:'tau-unassigned-identical',name:'Unassigned Fireblade',sourceText:"+ FACTION KEYWORD: Xenos - T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts): Fireblade pulse rifle, close combat weapon"},
      {id:'tau-plain-faction',name:'Plain faction',sourceText:"+ FACTION KEYWORD: T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts)"},
      {id:'tau-ascii-faction',name:'ASCII faction',sourceText:"+ FACTION KEYWORD: Xenos – Tau Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts)"},
      {id:'tau-imperium-prefix',sourceText:"+ FACTION KEYWORD: Imperium - T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts)"},
      {id:'tau-chaos-prefix',sourceText:"+ FACTION KEYWORD: Chaos — T'au Empire\n+ DETACHMENT: Kauyon\n+ TOTAL ARMY POINTS: 50pts\n\nChar1: 1x Cadre Fireblade (50 pts)"},
      {id:'tau-wrong-faction',roster:{faction:'Tyranids',detachment:'Kauyon',detachments:[{label:'Kauyon'}],units:[{id:'tau-wrong-owner',name:'Cadre Fireblade',quantity:1,points:50}]}}
    ])));
    const expected='T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [LETHAL HITS] ability while targeting their Spotted unit.';
    await page.goto(`${origin}/books/tau-empire/reader.html?roster=tau-enhancement-qa#unit-cadre-fireblade`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.equal(await page.locator('.content-group.detachment').count(),1);
    assert.equal(await page.locator('#unit-cadre-fireblade .unit-status').textContent(),'50 pts');
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,"T'au roster must not expose All Detachments");await page.locator('.related-rules-layer [data-kind="enhancements"]').click();assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-through-unity-devastation']);await page.locator('.related-rules-close').click();
    await page.locator('#unit-commander-in-coldstar-battlesuit .related-rules-trigger').click();await page.locator('.related-rules-layer .full-related-content').waitFor();assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'another eligible roster unit must not see an Enhancement assigned to a different ownerUnitId');
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=tau-enhancement-qa`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();assert.equal(await page.locator('#relatedDetachment option[value="all"]').count(),0);await page.locator('[data-related-tab="enhancements"]').click();assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId||card.id)),['enhancement-through-unity-devastation']);
    await page.goto(`${origin}/books/tau-empire/reader.html?roster=tau-unassigned-identical#unit-cadre-fireblade`);await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();await page.locator('.related-rules-layer .full-related-content').waitFor();assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'an identical T\'au unit without an assigned Enhancement must not receive options');
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=tau-unassigned-identical`);await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();assert.equal(await page.locator('[data-related-tab="enhancements"]:visible').count(),0,'an identical T\'au Phone unit without an assigned Enhancement must not receive options');
    await page.goto(`${origin}/books/tau-empire/reader.html?roster=tau-plain-faction#unit-cadre-fireblade`);assert.equal(await page.locator('#unit-cadre-fireblade').count(),1,"plain T'au Empire must remain accepted on desktop");
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=tau-ascii-faction`);assert.equal(await page.locator('#relatedRules').count(),1,'Xenos en-dash Tau Empire must be accepted on Phone');
    for(const id of ['tau-wrong-faction','tau-imperium-prefix','tau-chaos-prefix']){await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=${id}`);assert.equal(await page.locator('#relatedRules').count(),0,`${id} T'au Phone roster must fail closed`);await page.goto(`${origin}/books/tau-empire/reader.html?roster=${id}#unit-cadre-fireblade`);await page.waitForURL('**/roster-guides/index.html');assert.equal(await page.locator('.related-rules-trigger').count(),0,`${id} T'au desktop roster must fail closed`);}
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=missing-tau`);assert.equal(await page.locator('#relatedRules').count(),0,'missing T\'au roster must fail closed');await page.goto(`${origin}/index.html`);await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=broken-tau`);assert.equal(await page.locator('#relatedRules').count(),0,'corrupt T\'au roster must fail closed');
    assert.deepEqual(errors,[]);
    console.log("PASS T'au roster Enhancement owner and full effect in desktop/iPad + Phone Mode");
  }finally{await rosterContext.close();}

  const emperorsChildrenContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(emperorsChildrenContext);
    await page.goto(`${origin}/books/emperors-children/reader.html#unit-lord-exultant`);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments',"Emperor's Children desktop must start with All Detachments");
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.ok(await page.locator('.related-rules-layer .enhancement:visible').count()>4,"Emperor's Children All Detachments must show compatible Enhancements from several Detachments");
    assert.equal(await page.locator('.related-rules-layer [data-rule-id="enhancement-faultless-opportunist"]').count(),0,'Faultless Opportunist must remain excluded');
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer button[data-detachment="court-of-the-phoenician"]').click();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden]):not([data-detachment="core"]):not([data-detachment="court-of-the-phoenician"])').count(),0,'specific Detachment must hide other Emperor\'s Children rules');
    await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile#unit-chaos-terminators`);
    await page.locator('#unit-chaos-terminators .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments',"Emperor's Children Phone Mode must start with All Detachments");
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    const upgrade=page.locator('.related-rules-layer [data-rule-id="enhancement-frenzied-ferocity"]:visible');
    await upgrade.waitFor();
    assert.match(await upgrade.locator(':scope > .eyebrow').textContent(),/UPGRADE/);
    assert.doesNotMatch(await upgrade.locator(':scope > .eyebrow').textContent(),/\d+\s*pts/i,'UPGRADE with unconfirmed points must not invent a cost');
    await page.goto(`${origin}/index.html`);
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([
      {id:'ec-owner',roster:{faction:"Emperor's Children",detachment:'Court of the Phoenician',detachments:[{label:'Court of the Phoenician'}],units:[{id:'ec-owner-1',name:'Lord Exultant',quantity:1,points:80}],enhancements:[{name:'Exalted Patron',ownerUnitId:'ec-owner-1',ownerStatus:'resolved'}]}},
      {id:'ec-wrong',roster:{faction:'Tyranids',detachment:'Court of the Phoenician',detachments:[{label:'Court of the Phoenician'}],units:[{id:'ec-wrong-1',name:'Lord Exultant',quantity:1,points:80}]}}
    ])));
    await page.goto(`${origin}/books/emperors-children/reader.html?roster=ec-owner#unit-lord-exultant`);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,"Emperor's Children roster must not expose All Detachments");
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-exalted-patron'],'roster must show only the Enhancement assigned to the exact ownerUnitId');
    await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile&roster=ec-owner#unit-lord-exultant`);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-exalted-patron'],'Phone roster must preserve the exact ownerUnitId');
    for(const id of ['ec-wrong','ec-missing']){await page.goto(`${origin}/books/emperors-children/reader.html?roster=${id}#unit-lord-exultant`);await page.waitForURL('**/roster-guides/index.html*');assert.equal(await page.locator('.related-rules-trigger').count(),0,`${id} must fail closed`);}
    await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile&roster=ec-wrong#unit-lord-exultant`);await page.waitForURL('**/roster-guides/index.html*');assert.equal(await page.locator('.related-rules-trigger').count(),0,'wrong-faction Phone roster must fail closed');
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile&roster=ec-corrupt#unit-lord-exultant`);await page.waitForURL('**/roster-guides/index.html*');assert.equal(await page.locator('.related-rules-trigger').count(),0,'corrupt Phone roster must fail closed');
    assert.deepEqual(errors,[]);
    console.log("PASS Emperor's Children desktop, Phone and exact roster owner matrix integration");
  }finally{await emperorsChildrenContext.close();}

  const coldContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(coldContext);
    await page.goto(`${origin}/index.html?cold=1`);
    await control(page);
    const currentPhoneShell=await page.evaluate(async()=>{const urls=['./books/death-guard/mobile/mobile.css?v=9','./books/death-guard/mobile/mobile.js?v=25','./books/death-guard/mobile/phone-popup-controller.js?v=1','./books/adeptus-mechanicus/mobile/mobile.css?v=2','./books/adeptus-mechanicus/mobile/mobile.js?v=10','./books/adeptus-mechanicus/mobile/phone-popup-controller.js?v=1'];return Object.fromEntries(await Promise.all(urls.map(async url=>[url,Boolean(await caches.match(url))])));});
    assert.equal(Object.values(currentPhoneShell).every(Boolean),true,`current canonical Phone shell assets must be precached: ${JSON.stringify(currentPhoneShell)}`);
    await coldContext.setOffline(true);
    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${origin}/books/death-guard/reader.html?build=dg-cold#unit-chaos-land-raider`);
    await page.waitForTimeout(500);
    const coldDgState=await page.evaluate(async()=>({
      url:location.href,
      title:document.title,
      hasApp:Boolean(window.DG_APP),
      scripts:[...document.scripts].map(script=>script.src).filter(Boolean).slice(-5),
      triggerCount:document.querySelectorAll('.related-rules-trigger').length,
      relatedRules:Boolean(window.DG_APP?.relatedRules),
      cachedApp:Boolean(await caches.match('./books/death-guard/scripts/app.js?v=35')),
      cachedModule:Boolean(await caches.match('./books/death-guard/scripts/compatible-stratagems-runtime.mjs?v=3')),
      cachedMatrix:Boolean(await caches.match('./books/death-guard/generated/compatible-rules.json')),
      cachedTemplate:Boolean(await caches.match('./books/death-guard/mobile/related-rules.inc?v=3'))
    }));
    assert.equal(coldDgState.hasApp&&coldDgState.triggerCount>0,true,`DG cold review runtime unavailable: ${JSON.stringify({coldDgState,errors})}`);
    await page.locator('#unit-chaos-land-raider .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-rule-id="stratagem-disgustingly-resilient"]:not([hidden])').waitFor();
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'DG cold desktop must reopen matrix-backed All Detachments');
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard true cold desktop Compatible Stratagems');

    await page.goto(`${origin}/books/adeptus-mechanicus/reader.html?build=am-cold#unit-skitarii-rangers`);
    await page.locator('#unit-skitarii-rangers .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-rule-id="core-stratagem-command-re-roll"]:not([hidden])').waitFor();
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'Mechanicus cold desktop must reopen matrix-backed All Detachments');
    assert.deepEqual(errors,[]);
    console.log('PASS Adeptus Mechanicus true cold desktop Compatible Rules');

    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${origin}/books/tyranids/?build=cold-desktop&view=full`);
    assert.match(page.url(),/\/books\/tyranids\/reader\.html\?build=cold-desktop$/);
    assert.equal(await page.title(),'Tyranids Rules — WH40K Library');
    await page.goto(`${origin}/books/tyranids/reader.html?build=tyr-cold#unit-hive-tyrant`);
    await page.locator('#unit-hive-tyrant .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-rule-id="core-stratagem-command-re-roll"]:not([hidden])').waitFor();
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,'Tyranids cold desktop must reopen matrix-backed All Detachments');
    await page.locator('.related-rules-layer .full-related-filter summary').click();
    await page.locator('.related-rules-layer .full-related-filter [data-detachment="invasion-fleet"]').click();
    await page.locator('.related-rules-layer [data-detachment="invasion-fleet"] .stratagem:not([hidden])').first().waitFor();
    assert.equal(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count(),2,'Tyranids cold desktop Detachment choice must narrow to Core plus one Detachment');

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
    await page.goto(`${origin}/books/tau-empire/reader.html?build=tau-cold#unit-cadre-fireblade`);await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();await page.locator('.related-rules-layer [data-rule-id="core-stratagem-command-re-roll"]:not([hidden])').waitFor();assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,"T'au cold desktop must reopen matrix-backed All Detachments");
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/tau-empire/?build=cold-phone`);
    assert.match(page.url(),/\/books\/tau-empire\/mobile\/index\.html\?build=cold-phone$/);
    assert.match(await page.title(),/T.au Empire/);
    await page.goto(`${origin}/books/tau-empire/mobile/commander-farsight.html?build=unvisited`);
    assert.match(await page.title(),/Start.*T.au Empire/);
    assert.match(page.url(),/\/books\/tau-empire\/mobile\/commander-farsight\.html\?build=unvisited$/);
    assert.deepEqual(errors,[]);
    console.log("PASS T'au Empire true cold desktop, Phone Mode and unvisited datasheet fallback");

    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${origin}/books/emperors-children/reader.html?build=ec-cold#unit-lord-exultant`);
    await page.locator('#unit-lord-exultant .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-rule-id="core-stratagem-command-re-roll"]:not([hidden])').waitFor();
    assert.ok(await page.locator('.related-rules-layer .related-detachment:not([hidden])').count()>2,"Emperor's Children cold desktop must reopen matrix-backed All Detachments");
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/emperors-children/reader.html?view=mobile&build=ec-phone#unit-chaos-terminators`);
    await page.locator('#unit-chaos-terminators .related-rules-trigger').click();
    await page.locator('.related-rules-layer [data-kind="enhancements"]').click();
    await page.locator('.related-rules-layer [data-rule-id="enhancement-frenzied-ferocity"]:not([hidden])').waitFor();
    assert.equal(await page.locator('.related-rules-layer .full-related-filter summary').textContent(),'All Detachments',"Emperor's Children cold Phone Mode must retain All Detachments");
    assert.deepEqual(errors,[]);
    console.log("PASS Emperor's Children cold desktop and Phone Mode Compatible Rules");
  }finally{await coldContext.close();}

  const warmDeathGuardContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(warmDeathGuardContext);
    await page.goto(`${origin}/index.html?dg-warm=1`);
    await control(page);
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/death-guard/mobile/chaos-land-raider.html?view=mobile`);
    await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));
    const warmBefore=await page.evaluate(async()=>({
      title:document.title,
      relatedRules:document.querySelectorAll('#relatedRules').length,
      cacheKeys:(await Promise.all((await caches.keys()).map(async name=>(await caches.open(name)).keys()))).flat().map(request=>request.url).filter(url=>url.includes('chaos-land-raider'))
    }));
    assert.equal(warmBefore.relatedRules,1,`DG visited Phone page did not initialize online: ${JSON.stringify(warmBefore)}`);
    const visitedPhoneUrl=page.url();
    const popupPhoneUrl=`${origin}/books/death-guard/mobile/army-rules.html?view=mobile#core-rules`;await page.goto(popupPhoneUrl);await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));
    await warmDeathGuardContext.setOffline(true);
    await page.goto(visitedPhoneUrl);
    await page.waitForTimeout(500);
    const warmDgState=await page.evaluate(async()=>({
      url:location.href,
      title:document.title,
      relatedRules:document.querySelectorAll('#relatedRules').length,
      cachedPage:Boolean(await caches.match(location.href)),
      cachedCss:Boolean(await caches.match(new URL('./mobile.css?v=9',location.href).href)),
      cachedMobile:Boolean(await caches.match(new URL('./mobile.js?v=25',location.href).href)),
      cachedPopupController:Boolean(await caches.match(new URL('./phone-popup-controller.js?v=1',location.href).href)),
      cachedModule:Boolean(await caches.match(new URL('../scripts/compatible-stratagems-runtime.mjs?v=3',location.href).href))
    }));
    assert.equal(warmDgState.relatedRules===1&&warmDgState.cachedCss&&warmDgState.cachedMobile&&warmDgState.cachedPopupController,true,`DG warm Phone runtime unavailable: ${JSON.stringify({warmBefore,warmDgState,errors})}`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent [data-detachment] .stratagem:not([hidden])').first().waitFor();
    assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,'visited DG Phone page must reopen matrix-backed All Detachments offline');
    await page.goto(popupPhoneUrl);assert.equal(await page.evaluate(()=>typeof window.DGPhonePopups==='function'),true,'DG current popup controller must load offline');const offlineDgRoot=page.locator('main [data-term="keyword-death-guard"]').first();await offlineDgRoot.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'DG offline root popup must open');const offlineDgNested=page.locator('#termPopupStack [data-popup-related]').first();assert.equal(await offlineDgNested.count(),1,'DG offline popup fixture must expose a nested term');await offlineDgNested.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'DG offline nested popup must open');await page.locator('[data-popup-close="0"]').click();
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard visited Phone Mode Compatible Stratagems offline');
  }finally{await warmDeathGuardContext.close();}

  const warmMechanicusContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(warmMechanicusContext);await page.goto(`${origin}/index.html?am-warm=1`);await control(page);await page.setViewportSize({width:390,height:844});const visited=`${origin}/books/adeptus-mechanicus/mobile/skitarii-marshal.html?view=mobile`;await page.goto(visited);await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));await warmMechanicusContext.setOffline(true);await page.goto(visited);const state=await page.evaluate(async()=>({controller:typeof window.AMPhonePopups==='function',css:Boolean(await caches.match(new URL('./mobile.css?v=2',location.href).href)),mobile:Boolean(await caches.match(new URL('./mobile.js?v=10',location.href).href)),popup:Boolean(await caches.match(new URL('./phone-popup-controller.js?v=1',location.href).href))}));assert.equal(Object.values(state).every(Boolean),true,`Mechanicus warm Phone shell unavailable offline: ${JSON.stringify({state,errors})}`);const root=page.locator('main [data-term="core-support"]').first();await root.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),1,'Mechanicus offline root popup must open');const nested=page.locator('#termPopupStack .mobile-popup-card').first().locator('[data-term="core-leader"]').first();assert.equal(await nested.count(),1,'Mechanicus offline popup fixture must expose a nested term');await nested.click();assert.equal(await page.locator('#termPopupStack .mobile-popup-card').count(),2,'Mechanicus offline nested popup must open');await page.locator('[data-popup-close="0"]').click();assert.deepEqual(errors,[]);console.log('PASS Adeptus Mechanicus visited Phone popup stack offline');
  }finally{await warmMechanicusContext.close();}

  const warmTyranidsContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(warmTyranidsContext);
    await page.goto(`${origin}/index.html?tyr-warm=1`);
    await control(page);
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?view=mobile`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));
    const visitedPhoneUrl=page.url();
    await warmTyranidsContext.setOffline(true);
    await page.goto(visitedPhoneUrl);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();
    assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,'visited Tyranids Phone page must reopen matrix-backed All Detachments offline');
    assert.deepEqual(errors,[]);
    console.log('PASS Tyranids visited Phone Mode Compatible Rules offline');
  }finally{await warmTyranidsContext.close();}

  const warmTauContext=await browser.newContext({serviceWorkers:'allow'});
  try{
    const {page,errors}=await observedPage(warmTauContext);await page.goto(`${origin}/index.html?tau-warm=1`);await control(page);await page.setViewportSize({width:390,height:844});await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?view=mobile`);await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();await page.waitForFunction(async()=>Boolean(await caches.match(location.href)));const visited=page.url();await warmTauContext.setOffline(true);await page.goto(visited);await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,"visited T'au Phone page must reopen matrix-backed All Detachments offline");assert.deepEqual(errors,[]);console.log("PASS T'au visited Phone Mode Compatible Rules offline");
  }finally{await warmTauContext.close();}

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
