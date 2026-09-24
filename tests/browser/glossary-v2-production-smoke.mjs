import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const index=JSON.parse(fs.readFileSync(path.join(root,'glossary/v2/generated/index.en.json'),'utf8'));
const byId=new Map(index.entries.map(entry=>[entry.id,entry]));
const enhancement='army::space-marines::enhancement::1st-company-task-force::1st-company-task-force-iron-resolve';
const stratagem='army::space-marines::stratagem::1st-company-task-force::1st-company-task-force-armour-of-contempt';
const scopedWeapon='army::adeptus-mechanicus::weapon_profile::unit-cybernetica-datasmith::unit-cybernetica-datasmith-profile-9c2ab1e5d9';
const oathCompatibilityId='space-marines-army-rule-oath-of-moment';
const oathId='army::space-marines::army_rule::army-rule-oath-of-moment';
const mortarionsHammerId='army::death-guard::detachment::detachment-mortarions-hammer';
const structuredAmIds=['army::adeptus-mechanicus::army_rule::army-rule-doctrina','army::adeptus-mechanicus::ability::datasheet-canticles-of-the-omnissiah'];
const compact=value=>String(value).replace(/\s+/g,' ').trim();
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  if(request.url==='/favicon.ico'){response.writeHead(204).end();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium(),observations=[];
try{
  for(const viewport of [{name:'phone',width:390,height:844},{name:'desktop',width:1440,height:900}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});

    await page.goto(`${base}/glossary/index.html`);
    await page.waitForFunction(()=>window.WH40K_GLOSSARY?.counts?.standalone===1738);
    assert.equal(await page.locator('#termCount').innerText(),'1738',`${viewport.name}: standalone browse count`);
    assert.equal(await page.locator('.term-button').count(),121,`${viewport.name}: bounded initial browse plus load-more`);
    await page.locator('#search').fill('transport');await page.waitForTimeout(180);
    const preferred=page.locator('.term-button').first();assert.match(await preferred.innerText(),/Transport Capacity/i,`${viewport.name}: preferred alias result`);
    await preferred.click();await page.locator('body.article-open').waitFor();
    assert.equal(decodeURIComponent(new URL(page.url()).hash.slice(1)),'core::core-rule-18-01-transport-capacity',`${viewport.name}: preferred alias identity`);
    await page.goBack();await page.locator('body:not(.article-open)').waitFor();

    await page.goto(`${base}/glossary/index.html`);await page.locator('#search').fill('Power fist');await page.waitForTimeout(180);
    assert((await page.locator('.term-qualifier').count())>1,`${viewport.name}: duplicate weapon labels need visible context`);
    assert.equal(new URL(page.url()).hash,'',`${viewport.name}: ambiguous label must not auto-open an arbitrary profile`);

    await page.goto(`${base}/glossary/index.html`);await page.locator('#search').fill('Oath of Moment');await page.waitForTimeout(180);
    const oathSearch=page.locator('.term-button').filter({hasText:'Oath of Moment'}).first();await oathSearch.waitFor();await oathSearch.click();await page.locator('body.article-open').waitFor();
    assert.equal(decodeURIComponent(new URL(page.url()).hash.slice(1)),oathId,`${viewport.name}: Oath search identity`);

    for(const id of [scopedWeapon,enhancement,stratagem]){
      await page.goto(`${base}/glossary/index.html#${encodeURIComponent(id)}`);await page.locator('body.article-open').waitFor();
      assert.equal(await page.locator('#termDetail h2').innerText(),byId.get(id).label,`${viewport.name}: direct V2 article ${id}`);
    }
    await page.goto(`${base}/glossary/index.html#${encodeURIComponent(mortarionsHammerId)}`);await page.locator('body.article-open').waitFor();
    const mortarionsHammerArticle=await page.locator('#termDetail').innerText();
    assert.match(mortarionsHammerArticle,/Miasmic Bombardment/i,`${viewport.name}: Mortarion’s Hammer rule projection`);
    assert.match(mortarionsHammerArticle,/Incursion \| 1[\s\S]*Strike Force \| 2[\s\S]*Onslaught \| 3/,`${viewport.name}: Mortarion’s Hammer battle-size table`);
    for(const id of structuredAmIds){
      await page.goto(`${base}/glossary/index.html#${encodeURIComponent(id)}`);await page.locator('body.article-open').waitFor();
      const article=compact(await page.locator('#termDetail .definition').last().innerText()),facts=byId.get(id).facts;
      if(facts.openingText)assert(article.includes(compact(facts.openingText)),`${viewport.name}: ${id} article opening text`);
      for(const option of facts.options)for(const rule of [option.text,...(option.effects||[])].filter(Boolean))assert(article.includes(compact(rule)),`${viewport.name}: ${id} complete article option ${option.id}`);
    }

    await page.goto(`${base}/books/core-rules/reader/monsters-vehicles.html`);
    const coreTrigger=page.locator('[data-term="core-blast"]').first();await coreTrigger.click();await page.locator('#termDialog[open]').waitFor();
    assert.equal(await page.locator('#termDialog').getAttribute('data-open-term'),'core::core-blast',`${viewport.name}: Core click identity`);
    assert.equal(compact(await page.locator('#termSummary').innerText()),compact(byId.get('core::core-blast').facts.semanticContent),`${viewport.name}: Core popup facts`);
    await page.locator('#termClose').click();await page.locator('#searchButton').click();await page.locator('#searchInput').fill('deep strike');
    const coreSearch=page.locator('#searchResults a').filter({hasText:'DEEP STRIKE'}).first();await coreSearch.waitFor();
    assert.match(await coreSearch.getAttribute('href'),/core%3A%3Acore-deep-strike/,`${viewport.name}: Core search V2 identity`);

    await page.goto(`${base}/books/death-guard/reader.html?view=${viewport.name==='phone'?'mobile':'full'}#army-rule-nurgles-gift`);
    await page.waitForFunction(()=>Boolean(window.DG_APP?.popups));
    for(const id of ['contagion-range','afflicted','skullsquirm-blight','rattlejoint-ague','scabrous-soulrot']){
      const trigger=page.locator(`[data-glossary-v2-source="${id}"]`).first();await trigger.waitFor();
      const resolved=await trigger.getAttribute('data-term');assert.equal(resolved,`army::death-guard::army_rule_component::army-rule-nurgles-gift::${id}`,`${viewport.name}: ${id} scoped identity`);
      await trigger.click();await page.locator(`.term-popup[data-popup-term="${resolved}"]`).waitFor();
      assert.match(await page.locator(`.term-popup[data-popup-term="${resolved}"]`).innerText(),new RegExp(byId.get(resolved).label,'i'),`${viewport.name}: ${id} popup`);
      await page.keyboard.press('Escape');
    }

    await page.goto(`${base}/books/adeptus-mechanicus/reader.html?view=${viewport.name==='phone'?'mobile':'full'}#army-rule-doctrina`);
    await page.waitForFunction(()=>Boolean(window.DG_APP?.popups));
    for(const id of structuredAmIds){
      await page.evaluate(termId=>window.DG_APP.popups.open(termId,document.querySelector('.document')),id);
      const popup=page.locator(`.term-popup[data-popup-term="${id}"]`);await popup.waitFor();
      const popupText=compact(await popup.innerText()),facts=byId.get(id).facts;
      if(facts.openingText)assert(popupText.includes(compact(facts.openingText)),`${viewport.name}: ${id} popup opening text`);
      for(const option of facts.options)for(const rule of [option.text,...(option.effects||[])].filter(Boolean))assert(popupText.includes(compact(rule)),`${viewport.name}: ${id} complete popup option ${option.id}`);
      await page.keyboard.press('Escape');
    }

    await page.goto(`${base}/books/space-marines/reader.html?view=${viewport.name==='phone'?'mobile':'full'}#unit-captain-in-terminator-armour`);
    try{await page.waitForFunction(()=>Boolean(window.DG_APP?.popups),null,{timeout:8000});}catch(error){const state=await page.evaluate(()=>({href:location.href,ready:document.readyState,glossary:Boolean(window.WH40K_GLOSSARY),app:Boolean(window.DG_APP),body:document.body.innerText.slice(0,120)}));throw new Error(`${viewport.name}: Army app did not initialize: ${errors.join(' | ')||error.message}; ${JSON.stringify(state)}`);}
    const coreAbility=page.locator('#unit-captain-in-terminator-armour [data-term="core::core-deep-strike"]').first();await coreAbility.waitFor();await coreAbility.click();
    await page.locator('.term-popup[data-popup-term="core::core-deep-strike"]').waitFor();
    assert.match(await page.locator('.term-popup[data-popup-term="core::core-deep-strike"]').innerText(),/DEEP STRIKE/i,`${viewport.name}: Army Core popup`);
    await page.keyboard.press('Escape');
    const localAbility=page.locator('#unit-captain-in-terminator-armour [data-term="army::space-marines::ability::space-marines-ability-unstoppable-valour"]').first();await localAbility.waitFor();await localAbility.click();
    await page.locator('.term-popup[data-popup-term="army::space-marines::ability::space-marines-ability-unstoppable-valour"]').waitFor();
    assert.match(await page.locator('.term-popup').last().innerText(),/Unstoppable Valour/i,`${viewport.name}: local Army popup`);
    await page.keyboard.press('Escape');

    for(const book of ['space-marines','dark-angels','blood-angels']){
      await page.goto(`${base}/books/${book}/reader.html?view=${viewport.name==='phone'?'mobile':'full'}#army-rule-oath-of-moment`);
      await page.waitForFunction(()=>Boolean(window.DG_APP?.popups));
      const oathTrigger=page.locator(`[data-glossary-v2-source="${oathCompatibilityId}"]`).first();await oathTrigger.waitFor();
      assert.equal(await oathTrigger.getAttribute('data-term'),oathId,`${viewport.name}/${book}: Oath trigger identity`);
      await oathTrigger.click();const oathPopup=page.locator(`.term-popup[data-popup-term="${oathId}"]`);await oathPopup.waitFor();
      const fullEntry=oathPopup.getByRole('link',{name:'Glossary entry'});const href=await fullEntry.getAttribute('href');
      assert.equal(decodeURIComponent(new URL(href,base).hash.slice(1)),oathId,`${viewport.name}/${book}: popup/viewer identity`);
      await page.keyboard.press('Escape');
    }
    for(const control of [
      {book:'chaos-space-marines',unit:'unit-masters-of-the-maelstrom',term:'chaos-space-marines-ability-support'},
      {book:'space-marines',unit:'unit-cato-sicarius',term:'space-marines-ability-support-3'},
      {book:'space-marines',unit:'unit-wardens-of-ultramar',term:'space-marines-ability-support-4'}
    ]){
      await page.goto(`${base}/books/${control.book}/reader.html?view=${viewport.name==='phone'?'mobile':'full'}#${control.unit}`);
      await page.waitForFunction(()=>Boolean(window.DG_APP?.popups));
      const trigger=page.locator(`[data-glossary-v2-source="${control.term}"]`).first();await trigger.waitFor();
      assert.equal(await trigger.getAttribute('data-term'),'core::core-rule-19-01-forming-attached-units',`${viewport.name}/${control.term}: Core Support identity`);
      await trigger.click();const popup=page.locator('.term-popup[data-popup-term="core::core-rule-19-01-forming-attached-units"]');await popup.waitFor();
      assert.match(await popup.innerText(),/Forming Attached Units/i,`${viewport.name}/${control.term}: Core Support popup`);
      const href=await popup.getByRole('link',{name:'Glossary entry'}).getAttribute('href');
      assert.equal(decodeURIComponent(new URL(href,base).hash.slice(1)),'core::core-rule-19-01-forming-attached-units',`${viewport.name}/${control.term}: popup/viewer identity`);
      await page.keyboard.press('Escape');
    }
    observations.push({viewport:viewport.name,corePopup:true,armyPopup:true,standalone:1738,scoped:index.counts.scopedChildren});
    assert.deepEqual(errors,[],`${viewport.name}: browser errors`);await context.close();
  }
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log(`Glossary V2 production browser smoke passed: ${observations.map(item=>item.viewport).join(' + ')}, Core/Army popups, browse/search/aliases, duplicate labels, Enhancement/Stratagem/scoped weapon articles.`);
