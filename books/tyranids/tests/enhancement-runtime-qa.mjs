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

const rosterSource=({detachment,unit,points,enhancement,cost,second=false,unresolved=false})=>`+ FACTION KEYWORD: Xenos - Tyranids
+ DETACHMENT: ${detachment}
+ TOTAL ARMY POINTS: ${points*(second?2:1)+cost}pts
${unresolved?`+ ENHANCEMENT: ${enhancement} (on Char9: ${unit})\n`:''}Char1: 1x ${unit} (${points} pts)
${unresolved?'':`Enhancement: ${enhancement} (+${cost} pts)\n`}${second?`Char2: 1x ${unit} (${points} pts)\n`:''}`;

async function save(page,test){
  await page.goto(`${base}/roster-guides/index.html`);
  const values=await page.evaluate(({unit,enhancement})=>{
    const factions=window.WH_POINTS_CATALOG||{},normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const book=factions[Object.keys(factions).find(name=>normalize(name)==='tyranids')]||{};
    const unitData=Object.values(book.units||{}).find(item=>normalize(item.title||item.name)===normalize(unit));
    const enhancementData=Object.values(book.enhancements||{}).find(item=>normalize(item.title||item.name)===normalize(enhancement));
    return{points:Number(unitData?.points?.[0]?.value)||0,cost:Number(enhancementData?.value)||0};
  },{unit:test.unit,enhancement:test.enhancement});
  assert.ok(values.points,`${test.unit}: missing points catalogue entry`);
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length);
  await page.locator('#roster-input').fill(rosterSource({...test,...values}));await page.locator('#roster-form button[type="submit"]').click();
  await page.waitForFunction(count=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length>count,before);
  return page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0].id);
}
async function state(page,cardId,effect){return page.locator(`#${cardId}`).evaluate((card,effect)=>(
  {article:Boolean(card.querySelector(`.roster-enhancement[data-roster-derived-effect="${effect}"]`)),
   notes:[...card.querySelectorAll(`[data-roster-derived-note="${effect}"]`)].map(node=>node.textContent),
   modified:[...card.querySelectorAll(`[data-roster-derived-effect="${effect}"][data-roster-base-value]`)].map(node=>({base:node.dataset.rosterBaseValue,value:node.textContent.trim(),label:node.dataset.label||node.closest('.stat')?.querySelector('b')?.textContent||''})),
   tags:[...card.querySelectorAll(`.weapon-tags [data-roster-derived-effect="${effect}"]`)].map(node=>node.textContent.trim()),
   abilities:[...card.querySelectorAll(`.shared-abilities [data-roster-derived-effect="${effect}"]`)].map(node=>node.textContent.trim()),
   keywords:[...card.querySelectorAll(`[id$="-keywords"] [data-roster-derived-effect="${effect}"]`)].map(node=>node.textContent.trim()),text:card.textContent}),effect);}
async function candidate(test){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(String(error)));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const id=await save(page,test),query=`?roster=${encodeURIComponent(id)}`;
  await page.goto(`${base}/books/tyranids/reader.html${query}#${test.cardId}`);await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();
  await page.locator(`[data-nav-target="${test.cardId}"]`).evaluate(node=>node.click());await page.waitForFunction(cardId=>window.DG_APP?.navigation?.active===cardId,test.cardId);
  test.assert(await state(page,test.cardId,test.effect));
  const assigned=await page.evaluate(cardId=>window.TYRANIDS_ROSTER_GUIDE.enhancementRuleIdsByUnitId[cardId]||[],test.cardId);assert.equal(assigned.length,1,`${test.enhancement}: assigned-only Compatible Rules`);
  await page.locator('[data-view-switch]').click();await page.waitForURL(url=>url.pathname.endsWith(`/mobile/${test.route}.html`)&&url.searchParams.get('roster')===id);
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');await page.locator(`#${test.cardId}`).waitFor();test.assert(await state(page,test.cardId,test.effect));
  await page.locator('#navButton').click();await page.locator('#mobileNav[aria-hidden="false"]').waitFor();
  assert.equal(await page.locator('.phone-tree > details:first-of-type .mobile-nav-branch > a:not([hidden])').count(),1,`${test.enhancement}: selected Detachment remains visible`);
  await page.locator('[data-view-switch]').click();await page.waitForURL(url=>url.pathname.endsWith('/reader.html')&&url.searchParams.get('roster')===id);
  assert.equal(errors.length,0,`${test.enhancement}: console errors: ${errors.join(' | ')}`);await context.close();
}
const changed=(state,label,amount)=>state.modified.some(item=>item.label===label&&Number.parseInt(item.value)===Number.parseInt(item.base)+amount);
const cases=[
  {detachment:'Ambush Predators',unit:"Von Ryan's Leapers",enhancement:'Cryptophotaic Camouflage',cardId:'unit-von-ryans-leapers',route:'von-ryans-leapers',effect:'detection-range-minus-3',assert:s=>{assert.equal(s.article,true);assert.match(s.notes.join(' '),/-3" detection range/);}},
  {detachment:'Talons of the Norn Queen',unit:'Norn Emissary',enhancement:'Destabilising Predation',cardId:'unit-norn-emissary',route:'norn-emissary',effect:'ranged-anti-character-2',assert:s=>{assert.equal(s.article,true);assert.ok(s.tags.length&&s.tags.every(tag=>tag==='ANTI-CHARACTER 2+'));}},
  {detachment:'Talons of the Norn Queen',unit:'Norn Assimilator',enhancement:'Synaptoprescience',cardId:'unit-norn-assimilator',route:'norn-assimilator',effect:'invulnerable-save-4',assert:s=>{assert.equal(s.article,true);assert.ok(s.abilities.includes('Invulnerable Save 4+'));}},
  {detachment:'Warrior Bioform Onslaught',unit:'Tyranid Prime with Lash Whip',enhancement:'Elevated Might',cardId:'unit-tyranid-prime-with-lash-whip',route:'tyranid-prime-with-lash-whip',effect:'melee-reroll-wounds-ap-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(changed(s,'AP',-1));assert.match(s.notes.join(' '),/re-roll Wound rolls/i);}},
  {detachment:'Warrior Bioform Onslaught',unit:'Winged Tyranid Prime',enhancement:'Ocular Adaptation',cardId:'unit-winged-tyranid-prime',route:'winged-tyranid-prime',effect:'melee-hit-plus-1',assert:s=>{assert.equal(s.article,true);assert.equal(s.modified.length,0);assert.match(s.notes.join(' '),/Hit rolls[\s\S]*not rewritten/i);}},
  {detachment:'Subterranean Assault',unit:'Trygon',enhancement:'Trygon Prime',cardId:'unit-trygon',route:'trygon',effect:'synapse-melee-strength-ws-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.keywords.includes('SYNAPSE'));assert.ok(changed(s,'S',1));assert.ok(s.modified.some(item=>item.label==='WS'&&Number.parseInt(item.value)===Math.max(2,Number.parseInt(item.base)-1)));}},
  {detachment:'Invasion Fleet',unit:'Hive Tyrant',enhancement:'Adaptive Biology',cardId:'unit-hive-tyrant',route:'hive-tyrant',effect:'feel-no-pain',assert:s=>{assert.equal(s.article,true);assert.ok(s.abilities.includes('Feel No Pain 5+'));assert.match(s.notes.join(' '),/4\+ remains conditional/i);}},
  {detachment:'Crusher Stampede',unit:'Hive Tyrant',enhancement:'Ominous Presence',cardId:'unit-hive-tyrant',route:'hive-tyrant',effect:'oc-plus-3',assert:s=>{assert.equal(s.article,true);assert.ok(changed(s,'OC',3));}},
  {detachment:'Unending Swarm',unit:'Broodlord',enhancement:'Relentless Hunger',cardId:'unit-broodlord',route:'broodlord',effect:'move-plus-2-unit',assert:s=>{assert.equal(s.article,true);assert.ok(changed(s,'M',2));assert.match(s.notes.join(' '),/attachment evidence/i);}},
  {detachment:'Assimilation Swarm',unit:'Broodlord',enhancement:'Parasitic Biomorphology',cardId:'unit-broodlord',route:'broodlord',effect:'melee-strength-plus-1-conditional-attacks',assert:s=>{assert.equal(s.article,true);assert.ok(changed(s,'S',1));assert.match(s.notes.join(' '),/Harvester[\s\S]*attachment evidence/i);}},
  {detachment:'Vanguard Onslaught',unit:'Broodlord',enhancement:'Chameleonic',cardId:'unit-broodlord',route:'broodlord',effect:'stealth',assert:s=>{assert.equal(s.article,true);assert.ok(s.abilities.includes('Stealth'));}},
  {detachment:'Synaptic Nexus',unit:'Neurotyrant',enhancement:'Power of the Hive Mind',cardId:'unit-neurotyrant',route:'neurotyrant',effect:'psychic-strength-ap-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(changed(s,'S',1));assert.ok(changed(s,'AP',-1));}}
];
try{
  for(const test of cases)await candidate(test);
  const duplicate=await browser.newContext({serviceWorkers:'block'}),page=await duplicate.newPage();let id=await save(page,{detachment:'Ambush Predators',unit:"Von Ryan's Leapers",enhancement:'Cryptophotaic Camouflage',second:true});
  for(const target of [`${base}/books/tyranids/reader.html?roster=${id}#unit-von-ryans-leapers`,`${base}/books/tyranids/mobile/von-ryans-leapers.html?roster=${id}`]){await page.goto(target);await page.locator('#unit-von-ryans-leapers').waitFor();if(target.includes('/mobile/'))await page.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');else await page.locator('#unit-von-ryans-leapers[data-roster-selected="true"]').waitFor();assert.equal(await page.locator('#unit-von-ryans-leapers .roster-instances li').count(),2);assert.equal(await page.locator('#unit-von-ryans-leapers [data-roster-derived-effect]').count(),0);}
  await duplicate.close();
  const unresolved=await browser.newContext({serviceWorkers:'block'}),unresolvedPage=await unresolved.newPage();id=await save(unresolvedPage,{detachment:'Invasion Fleet',unit:'Hive Tyrant',enhancement:'Adaptive Biology',unresolved:true});
  await unresolvedPage.goto(`${base}/books/tyranids/mobile/hive-tyrant.html?roster=${id}`);await unresolvedPage.waitForFunction(()=>document.documentElement.dataset.rosterActive==='true');await unresolvedPage.locator('#unit-hive-tyrant').waitFor();assert.equal(await unresolvedPage.locator('#unit-hive-tyrant [data-roster-derived-effect]').count(),0);assert.match(await unresolvedPage.locator('#unit-hive-tyrant .roster-enhancement-unresolved').innerText(),/owner could not be resolved/i);await unresolved.close();
  console.log('Tyranids Enhancement runtime QA passed: 12 classified effects, Desktop/Phone parity, duplicate-instance and unresolved-owner safety.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
