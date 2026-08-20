import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const mime={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer((request,response)=>{
  const requested=decodeURIComponent(new URL(request.url,'http://localhost').pathname),file=path.resolve(root,`.${requested==='/'?'/index.html':requested}`);
  if(requested==='/favicon.ico'){response.writeHead(204).end();return;}
  if(!file.startsWith(root)||!fs.existsSync(file)||!fs.statSync(file).isFile()){response.writeHead(404).end('Not found');return;}
  response.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true});

const rosterSource=({detachment,unit,points,enhancement,cost=15,second=false,unresolved=false})=>`+ FACTION KEYWORD: T'au Empire
+ DETACHMENT: ${detachment}
+ TOTAL ARMY POINTS: ${points*(second?2:1)+cost}pts
${unresolved?`+ ENHANCEMENT: ${enhancement} (on Char9: ${unit})\n`:''}Char1: 1x ${unit} (${points} pts)
${unresolved?'':`Enhancement: ${enhancement} (+${cost} pts)\n`}${second?`Char2: 1x ${unit} (${points} pts)\n`:''}`;

async function savedRoster(page,source){
  await page.goto(`${base}/roster-guides/index.html`);
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length);
  await page.locator('#roster-input').fill(source);await page.locator('#roster-form button[type="submit"]').click();
  await page.waitForFunction(count=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length>count,before);
  return page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0].id);
}
async function effectState(page,cardId,effect){
  return page.locator(`#${cardId}`).evaluate((card,effect)=>{
    const rows=[...card.querySelectorAll('.weapon-row:not(.weapon-head)')],ranged=rows.filter(row=>row.closest('.weapon-group')?.querySelector('h5')?.textContent.toLowerCase().startsWith('ranged'));
    return{
      article:Boolean(card.querySelector(`.roster-enhancement[data-roster-derived-effect="${effect}"]`)),
      derived:card.querySelectorAll(`[data-roster-derived-effect="${effect}"]`).length,
      ranged:ranged.length,
      allRows:rows.length,
      allRangedTagged:ranged.length>0&&ranged.every(row=>row.querySelector(`[data-roster-derived-effect="${effect}"]`)),
      allRowsDoubleTagged:rows.length>0&&rows.every(row=>row.querySelectorAll(`[data-roster-derived-effect="${effect}"]`).length===2),
      text:card.textContent
    };
  },effect);
}
async function candidate(test){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(String(error)));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const rosterId=await savedRoster(page,rosterSource(test)),query=`?roster=${encodeURIComponent(rosterId)}`;
  await page.goto(`${base}/books/tau-empire/reader.html${query}#${test.cardId}`);await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();
  await page.locator(`[data-nav-target="${test.cardId}"]`).evaluate(node=>node.click());await page.waitForFunction(cardId=>window.DG_APP?.navigation?.active===cardId,test.cardId);
  test.assert(await effectState(page,test.cardId,test.effect));
  assert.deepEqual(windowIds(await page.evaluate(cardId=>window.TAU_ROSTER_GUIDE.enhancementRuleIdsByUnitId[cardId]||[],test.cardId)),windowIds(test.ruleIds));
  await page.setViewportSize({width:390,height:844});await page.reload();
  await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();test.assert(await effectState(page,test.cardId,test.effect));
  await page.setViewportSize({width:1280,height:900});await page.reload();await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();
  assert.equal(errors.length,0,`${test.enhancement}: console errors: ${errors.join(' | ')}`);await context.close();
}
const windowIds=values=>[...values].sort();

try{
  await candidate({detachment:'Advanced Acquisition Cadre',unit:'Stealth Battlesuits',points:110,enhancement:'Negation Emitters Upgrade',cost:15,cardId:'unit-stealth-battlesuits',route:'stealth-battlesuits',effect:'detection-range-minus-3',ruleIds:['negation-emitters-upgrade'],assert:state=>{assert.equal(state.article,true);assert.match(state.text,/-3" detection range/);}});
  await candidate({detachment:'Kauyon',unit:'Cadre Fireblade',points:50,enhancement:'Precision of the Patient Hunter',cost:15,cardId:'unit-cadre-fireblade',route:'cadre-fireblade',effect:'hit-plus-1',ruleIds:['enhancement-precision-of-the-patient-hunter'],assert:state=>{assert.equal(state.article,true);assert.match(state.text,/add 1 to Hit rolls[\s\S]*battle round 3/i);}});
  await candidate({detachment:'Kroot Hunting Pack',unit:'Kroot War Shaper',points:50,enhancement:'Kroothawk Flock',cost:10,cardId:'unit-kroot-war-shaper',route:'kroot-war-shaper',effect:'ignores-cover',ruleIds:['enhancement-kroothawk-flock'],assert:state=>{assert.equal(state.article,true);assert.equal(state.allRangedTagged,true);}});
  await candidate({detachment:'Kroot Hunting Pack',unit:'Kroot War Shaper',points:50,enhancement:'Root-carved Weapons',cost:10,cardId:'unit-kroot-war-shaper',route:'kroot-war-shaper',effect:'precision-devastating-wounds',ruleIds:['enhancement-root-carved-weapons'],assert:state=>{assert.equal(state.article,true);assert.equal(state.allRowsDoubleTagged,true);}});
  await candidate({detachment:'Retaliation Cadre',unit:'Commander in Coldstar Battlesuit',points:95,enhancement:'Internal Grenade Racks',cost:20,cardId:'unit-commander-in-coldstar-battlesuit',route:'commander-in-coldstar-battlesuit',effect:'grenades-keyword',ruleIds:['enhancement-internal-grenade-racks'],assert:state=>{assert.equal(state.article,true);assert.ok(state.derived>=2);assert.match(state.text,/GRENADES/);}});

  const duplicate=await browser.newContext({serviceWorkers:'block'}),duplicatePage=await duplicate.newPage();
  let id=await savedRoster(duplicatePage,rosterSource({detachment:'Kauyon',unit:'Cadre Fireblade',points:50,enhancement:'Precision of the Patient Hunter',cost:15,second:true}));
  for(const [target,viewport] of [[`${base}/books/tau-empire/reader.html?roster=${id}#unit-cadre-fireblade`,{width:1280,height:900}],[`${base}/books/tau-empire/mobile/cadre-fireblade.html?roster=${id}`,{width:390,height:844}]]){
    await duplicatePage.setViewportSize(viewport);
    await duplicatePage.goto(target);await duplicatePage.locator('#unit-cadre-fireblade[data-roster-selected="true"]').waitFor();
    assert.equal(await duplicatePage.locator('#unit-cadre-fireblade .roster-instances li').count(),2);assert.equal(await duplicatePage.locator('#unit-cadre-fireblade [data-roster-derived-effect]').count(),0);assert.match(await duplicatePage.locator('#unit-cadre-fireblade').innerText(),/Precision of the Patient Hunter[\s\S]*multiple roster units/i);
  }
  await duplicate.close();

  const safety=await browser.newContext({serviceWorkers:'block'}),safetyPage=await safety.newPage();
  id=await savedRoster(safetyPage,rosterSource({detachment:'Kauyon',unit:'Cadre Fireblade',points:50,enhancement:'Precision of the Patient Hunter',cost:15,unresolved:true}));
  await safetyPage.goto(`${base}/books/tau-empire/reader.html?roster=${id}#unit-cadre-fireblade`);await safetyPage.locator('#unit-cadre-fireblade[data-roster-selected="true"]').waitFor();
  assert.equal(await safetyPage.locator('#unit-cadre-fireblade [data-roster-derived-effect]').count(),0);assert.match(await safetyPage.locator('#unit-cadre-fireblade .roster-enhancement-unresolved').innerText(),/owner could not be resolved/i);
  id=await savedRoster(safetyPage,rosterSource({detachment:'Experimental Prototype Cadre',unit:'Commander in Coldstar Battlesuit',points:95,enhancement:'Thermoneutronic Projector',cost:15}));
  await safetyPage.setViewportSize({width:390,height:844});await safetyPage.goto(`${base}/books/tau-empire/mobile/commander-in-coldstar-battlesuit.html?roster=${id}`);await safetyPage.locator('#unit-commander-in-coldstar-battlesuit[data-roster-selected="true"]').waitFor();
  assert.equal(await safetyPage.locator('#unit-commander-in-coldstar-battlesuit [data-roster-derived-effect]').count(),0);assert.match(await safetyPage.locator('#unit-commander-in-coldstar-battlesuit .roster-warning').innerText(),/does not identify the weapon selected/i);
  await safety.close();
  console.log("T'au Enhancement runtime QA passed: 5 deterministic effects, duplicate-instance, unresolved-owner and weapon-target safety.");
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
