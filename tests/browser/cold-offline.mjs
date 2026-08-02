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

  const rosterContext=await browser.newContext({serviceWorkers:'block'});
  try{
    const {page,errors}=await observedPage(rosterContext);
    await page.goto(`${origin}/index.html?roster-setup=1`);
    await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([{id:'tau-enhancement-qa',name:'Test Kauyon roster',roster:{faction:"T'au Empire",detachment:'KAUYON',detachments:[{label:'Kauyon'}],declared:180,units:[{id:'tau-owner-1',name:'Cadre Fireblade',quantity:1,points:50,wargear:'Fireblade pulse rifle, close combat weapon'},{id:'tau-other-1',name:'Commander in Coldstar Battlesuit',quantity:1,points:130}],enhancements:[{name:'Through Unity, Devastation',exportedCost:30,ownerUnitId:'tau-owner-1',ownerStatus:'resolved'}]}}])));
    const expected='T’AU EMPIRE model only (excluding KROOT SHAPER models). While the bearer is leading a unit, each time that unit is an Observer unit, until the end of the phase, ranged weapons equipped by models in a Guided unit have the [LETHAL HITS] ability while targeting their Spotted unit.';
    await page.goto(`${origin}/books/tau-empire/reader.html?roster=tau-enhancement-qa#unit-cadre-fireblade`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.equal(await page.locator('.content-group.detachment').count(),1);
    assert.equal(await page.locator('#unit-cadre-fireblade .unit-status').textContent(),'50 pts');
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    await page.locator('#unit-cadre-fireblade .related-rules-trigger').click();assert.equal(await page.locator('.related-rules-layer [data-detachment="all"]').count(),0,"T'au roster must not expose All Detachments");await page.locator('.related-rules-layer [data-kind="enhancements"]').click();assert.deepEqual(await page.locator('.related-rules-layer .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId)),['enhancement-through-unity-devastation']);await page.locator('.related-rules-close').click();
    await page.locator('#unit-commander-in-coldstar-battlesuit .related-rules-trigger').click();assert.equal(await page.locator('.related-rules-layer [data-kind="enhancements"]:visible').count(),0,'another eligible roster unit must not see an Enhancement assigned to a different ownerUnitId');
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=tau-enhancement-qa`);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-roster-enhancement="through unity devastation"] p').textContent(),expected);
    assert.match(await page.locator('#unit-cadre-fireblade .roster-composition').textContent(),/Fireblade pulse rifle/);
    assert.equal(await page.locator('#unit-cadre-fireblade [data-source-field="weapons.twin-pulse-carbine"]').count(),0);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();await page.locator('#relatedRulesContent .stratagem:not([hidden])').first().waitFor();assert.equal(await page.locator('#relatedDetachment option[value="all"]').count(),0);await page.locator('[data-related-tab="enhancements"]').click();assert.deepEqual(await page.locator('#relatedRulesContent .enhancement:visible').evaluateAll(cards=>cards.map(card=>card.dataset.ruleId||card.id)),['enhancement-through-unity-devastation']);
    await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=missing-tau`);assert.equal(await page.locator('#relatedRules').count(),0,'missing T\'au roster must fail closed');await page.goto(`${origin}/index.html`);await page.evaluate(()=>localStorage.setItem('wh40k-rosters-v1','{broken'));await page.goto(`${origin}/books/tau-empire/mobile/cadre-fireblade.html?roster=broken-tau`);assert.equal(await page.locator('#relatedRules').count(),0,'corrupt T\'au roster must fail closed');
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
    await warmDeathGuardContext.setOffline(true);
    await page.goto(visitedPhoneUrl);
    await page.waitForTimeout(500);
    const warmDgState=await page.evaluate(async()=>({
      url:location.href,
      title:document.title,
      relatedRules:document.querySelectorAll('#relatedRules').length,
      cachedPage:Boolean(await caches.match(location.href)),
      cachedMobile:Boolean(await caches.match(new URL('./mobile.js?v=17',location.href).href)),
      cachedModule:Boolean(await caches.match(new URL('../scripts/compatible-stratagems-runtime.mjs?v=3',location.href).href))
    }));
    assert.equal(warmDgState.relatedRules,1,`DG warm Phone runtime unavailable: ${JSON.stringify({warmBefore,warmDgState,errors})}`);
    await page.locator('#relatedRules').scrollIntoViewIfNeeded();
    await page.locator('#relatedRulesContent [data-detachment] .stratagem:not([hidden])').first().waitFor();
    assert.ok(await page.locator('#relatedRulesContent .related-detachment:not([hidden])').count()>2,'visited DG Phone page must reopen matrix-backed All Detachments offline');
    assert.deepEqual(errors,[]);
    console.log('PASS Death Guard visited Phone Mode Compatible Stratagems offline');
  }finally{await warmDeathGuardContext.close();}

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
