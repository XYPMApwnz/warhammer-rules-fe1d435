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
const unit='Chaos Lord with Jump Pack',cardId='unit-chaos-lord-with-jump-pack',route='chaos-lord-with-jump-pack';
const nightmare={detachment:'Nightmare Hunt',ruleId:'enhancement-nightmare-hunt-warp-fuelled-thrusters',text:/opponent.s Fight phase/i};
const dread={detachment:'Dread Talons',ruleId:'enhancement-dread-talons-warp-fuelled-thrusters',text:/opponent.s turn/i};

const rosterSource=({detachments=[nightmare.detachment],enhancement=true,second=false,unresolved=false})=>`+ FACTION KEYWORD: Chaos - Chaos Space Marines
+ DETACHMENT: ${detachments.join('\n+ DETACHMENT: ')}
+ TOTAL ARMY POINTS: ${80*(second?2:1)+(enhancement?20:0)}pts
${unresolved?'+ ENHANCEMENT: Warp-fuelled Thrusters (on Char9: Missing Owner)\n':''}Char1: 1x ${unit} (80 pts)
${enhancement&&!unresolved?'Enhancement: Warp-fuelled Thrusters (+20 pts)\n':''}${second?`Char2: 1x ${unit} (80 pts)\n`:''}`;

async function savedRoster(page,source){
  await page.goto(`${base}/roster-guides/index.html`);
  await page.locator('#roster-input').fill(source);await page.locator('#roster-form button[type="submit"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length===1);
  return page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0].id);
}
const article=page=>page.locator(`#${cardId} .roster-enhancement`);
async function openDesktop(page,id){
  await page.goto(`${base}/books/chaos-space-marines/reader.html?roster=${id}#${cardId}`);
  await page.locator(`#${cardId}[data-roster-selected="true"]`).waitFor();
  await page.locator(`[data-nav-target="${cardId}"]`).evaluate(node=>node.click());
  await page.waitForFunction(id=>window.DG_APP?.navigation?.active===id,cardId);
}
async function assignedCompatibleIds(page){
  await page.locator(`#${cardId} .related-rules-trigger`).click();
  await page.locator('.related-rules-layer:not([hidden])').waitFor();
  await page.locator('.related-rules-layer .full-related-content').waitFor();
  const tab=page.locator('.related-rules-layer [data-kind="enhancements"]');if(await tab.isVisible())await tab.click();
  return page.locator('.related-rules-layer .enhancement:not([hidden])').evaluateAll(nodes=>nodes.map(node=>node.dataset.ruleId).sort());
}
async function identity(candidate,other){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(String(error)));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const id=await savedRoster(page,rosterSource({detachments:[candidate.detachment]}));
  await openDesktop(page,id);
  assert.equal(await article(page).getAttribute('data-roster-enhancement-rule-id'),candidate.ruleId);
  assert.match(await article(page).innerText(),/Warp-fuelled Thrusters[\s\S]*20 pts included/i);assert.match(await article(page).innerText(),candidate.text);
  assert.equal(await page.locator(`#${cardId} [data-roster-derived-effect]`).count(),0);
  assert.deepEqual(await page.evaluate(id=>window.CSM_ROSTER_GUIDE.enhancementRuleIdsByUnitId[id],cardId),[candidate.ruleId]);
  assert.deepEqual(await assignedCompatibleIds(page),[candidate.ruleId]);
  assert.equal(await page.locator(`.related-rules-layer [data-rule-id="${other.ruleId}"]:visible`).count(),0);
  await page.locator('.related-rules-layer .related-rules-close').click();
  await page.locator('[data-view-switch]').click();await page.waitForURL(url=>url.pathname.endsWith(`/mobile/${route}.html`)&&url.searchParams.get('roster')===id);
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');await page.locator(`#${cardId}`).waitFor();
  assert.equal(await article(page).getAttribute('data-roster-enhancement-rule-id'),candidate.ruleId);assert.match(await article(page).innerText(),candidate.text);
  assert.equal(await page.locator(`#${cardId} [data-roster-derived-effect]`).count(),0);
  await page.locator('#navButton').click();await page.locator('#mobileNav[aria-hidden="false"]').waitFor();
  await page.locator('[data-view-switch]').click();await page.waitForURL(url=>url.pathname.endsWith('/reader.html')&&url.searchParams.get('roster')===id);
  assert.equal(errors.length,0,`${candidate.detachment} console errors: ${errors.join(' | ')}`);await context.close();
}

try{
  await identity(nightmare,dread);await identity(dread,nightmare);

  const duplicate=await browser.newContext({serviceWorkers:'block'}),duplicatePage=await duplicate.newPage();
  let id=await savedRoster(duplicatePage,rosterSource({second:true}));
  for(const target of [`${base}/books/chaos-space-marines/reader.html?roster=${id}#${cardId}`,`${base}/books/chaos-space-marines/mobile/${route}.html?roster=${id}`]){
    await duplicatePage.goto(target);await duplicatePage.locator(`#${cardId}`).waitFor();if(target.includes('/mobile/'))await duplicatePage.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');else await duplicatePage.locator(`#${cardId}[data-roster-selected="true"]`).waitFor();
    assert.equal(await duplicatePage.locator(`#${cardId} .roster-instances li`).count(),2);assert.equal(await duplicatePage.locator(`#${cardId} [data-roster-derived-effect]`).count(),0);
    assert.match(await duplicatePage.locator(`#${cardId}`).innerText(),/Warp-fuelled Thrusters[\s\S]*instance-specific/i);
  }
  await duplicate.close();

  const safety=await browser.newContext({serviceWorkers:'block'}),safetyPage=await safety.newPage();
  id=await savedRoster(safetyPage,rosterSource({unresolved:true}));await openDesktop(safetyPage,id);
  assert.equal(await article(safetyPage).count(),0);assert.equal(await safetyPage.locator(`#${cardId} [data-roster-derived-effect]`).count(),0);
  assert.deepEqual(await safetyPage.evaluate(id=>window.CSM_ROSTER_GUIDE.enhancementRuleIdsByUnitId[id],cardId),[]);
  await safety.close();

  const ambiguous=await browser.newContext({serviceWorkers:'block'}),ambiguousPage=await ambiguous.newPage();
  id=await savedRoster(ambiguousPage,rosterSource({detachments:[nightmare.detachment,dread.detachment]}));await openDesktop(ambiguousPage,id);
  assert.equal(await ambiguousPage.locator(`#${cardId} [data-roster-enhancement-rule-id]`).count(),0);assert.match(await article(ambiguousPage).innerText(),/multiple selected Detachments/i);
  assert.deepEqual(await ambiguousPage.evaluate(id=>window.CSM_ROSTER_GUIDE.enhancementRuleIdsByUnitId[id],cardId),[]);
  assert.deepEqual(await assignedCompatibleIds(ambiguousPage),[]);await ambiguous.close();

  const unassigned=await browser.newContext({serviceWorkers:'block'}),unassignedPage=await unassigned.newPage();
  id=await savedRoster(unassignedPage,rosterSource({enhancement:false}));await openDesktop(unassignedPage,id);
  assert.equal(await article(unassignedPage).count(),0);assert.deepEqual(await assignedCompatibleIds(unassignedPage),[]);await unassigned.close();
  console.log('CSM Enhancement presentation QA passed: qualified identity, Desktop/Phone bearer presentation, duplicate, unresolved, ambiguous and unassigned safety.');
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
