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

const source=({detachment,unit,points,enhancement,cost=0,second=false,unresolved=false})=>`+ FACTION KEYWORD: Chaos - Emperor's Children
+ DETACHMENT: ${detachment}
+ TOTAL ARMY POINTS: ${points*(second?2:1)+cost}pts
${unresolved?`+ ENHANCEMENT: ${enhancement} (on Char9: ${unit})\n`:''}Char1: 1x ${unit} (${points} pts)
${unresolved?'':`Enhancement: ${enhancement}${cost?` (+${cost} pts)`:''}\n`}${second?`Char2: 1x ${unit} (${points} pts)\n`:''}`;
async function save(page,test){
  await page.goto(`${base}/roster-guides/index.html`);
  const values=await page.evaluate(({unit,enhancement})=>{
    const factions=window.WH_POINTS_CATALOG||{},key=Object.keys(factions).find(name=>name.includes('emperor'));
    const book=factions[key]||{},normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const unitData=Object.values(book.units||{}).find(item=>normalize(item.title||item.name)===normalize(unit));
    const enhancementData=Object.values(book.enhancements||{}).find(item=>normalize(item.title||item.name)===normalize(enhancement));
    return{points:Number(unitData?.points?.[0]?.value)||0,cost:Number(enhancementData?.value)||0};
  },{unit:test.unit,enhancement:test.enhancement});
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length);
  await page.locator('#roster-input').fill(source({...test,...values}));await page.locator('#roster-form button[type="submit"]').click();
  await page.waitForFunction(count=>JSON.parse(localStorage.getItem('wh40k-rosters-v1')||'[]').length>count,before);
  return page.evaluate(()=>JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0].id);
}
async function state(page,cardId,effect){return page.locator(`#${cardId}`).evaluate((card,effect)=>({
  article:Boolean(card.querySelector(`.roster-enhancement[data-roster-derived-effect="${effect}"]`)),
  notes:[...card.querySelectorAll(`[data-roster-derived-note="${effect}"]`)].map(node=>node.textContent),
  modified:[...card.querySelectorAll(`[data-roster-derived-effect="${effect}"][data-roster-base-value]`)].map(node=>({base:node.dataset.rosterBaseValue,value:node.textContent.trim(),label:node.dataset.label||node.closest('.stat')?.querySelector('b')?.textContent||''})),
  tags:[...card.querySelectorAll(`.weapon-tags [data-roster-derived-effect="${effect}"]`)].map(node=>node.textContent.trim()),
  abilities:[...card.querySelectorAll(`.shared-abilities [data-roster-derived-effect="${effect}"]`)].map(node=>node.textContent.trim()),
  text:card.textContent
}),effect);}
async function candidate(test){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(String(error)));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  const id=await save(page,test),query=`?roster=${encodeURIComponent(id)}`;
  await page.goto(`${base}/books/emperors-children/reader.html${query}#${test.cardId}`);await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();
  await page.locator(`[data-nav-target="${test.cardId}"]`).evaluate(node=>node.click());await page.waitForFunction(cardId=>window.DG_APP?.navigation?.active===cardId,test.cardId);
  test.assert(await state(page,test.cardId,test.effect));
  assert.equal(await page.evaluate(cardId=>(window.EC_ROSTER_GUIDE.enhancementRuleIdsByUnitId[cardId]||[]).length,test.cardId),1,`${test.enhancement}: only the assigned Enhancement should reach Compatible Rules`);
  await page.setViewportSize({width:390,height:844});await page.goto(`${base}/books/emperors-children/mobile/${test.route}.html?roster=${id}`);await page.waitForURL(url=>url.pathname.endsWith('/reader.html')&&url.searchParams.get('roster')===id&&url.hash===`#${test.cardId}`);await page.locator(`#${test.cardId}[data-roster-selected="true"]`).waitFor();test.assert(await state(page,test.cardId,test.effect));
  assert.equal(errors.length,0,`${test.enhancement}: console errors: ${errors.join(' | ')}`);await context.close();
}
const cases=[
  {detachment:'Court of the Phoenician',unit:'Lord Exultant',enhancement:'Tears of the Phoenix',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'modifier-immunity',assert:s=>{assert.equal(s.article,true);assert.match(s.notes.join(' '),/ignore modifiers/i);}},
  {detachment:'Court of the Phoenician',unit:'Lord Exultant',enhancement:'Exalted Patron',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'move-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.some(item=>item.label==='M'&&parseInt(item.value)===parseInt(item.base)+1));}},
  {detachment:'Court of the Phoenician',unit:'Daemon Prince of Slaanesh',enhancement:'Spiritsliver',cardId:'unit-daemon-prince-of-slaanesh',route:'daemon-prince-of-slaanesh',effect:'melee-strength-attacks-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.some(item=>item.label==='S'));assert.ok(s.modified.some(item=>item.label==='A'));}},
  {detachment:'Elegant Brutes',unit:'Lord Kakophonist',enhancement:'Cacophonic Accompaniment',cardId:'unit-lord-kakophonist',route:'lord-kakophonist',effect:'deep-strike-ignores-cover',assert:s=>{assert.equal(s.article,true);assert.ok(s.abilities.includes('Deep Strike'));assert.ok(s.tags.length>0&&s.tags.every(tag=>tag==='IGNORES COVER'));assert.match(s.notes.join(' '),/attachment evidence/i);}},
  {detachment:'Elegant Brutes',unit:'Chaos Terminators',enhancement:'Frenzied Ferocity',cardId:'unit-chaos-terminators',route:'chaos-terminators',effect:'sustained-hits-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.tags.length>0&&s.tags.every(tag=>tag==='SUSTAINED HITS 1'));}},
  {detachment:'Frenzied Host',unit:'Lord Exultant',enhancement:'Euphoric Crown',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'melee-strength-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.length>0&&s.modified.every(item=>item.label==='S'));}},
  {detachment:'Frenzied Host',unit:'Lord Exultant',enhancement:'Howling Plate',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'ranged-ap-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.length>0&&s.modified.every(item=>item.label==='AP'&&Number(item.value)===Number(item.base)-1));assert.match(s.notes.join(' '),/attachment evidence/i);}},
  {detachment:'Peerless Bladesmen',unit:'Lord Exultant',enhancement:'Distortion',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'melee-attacks-damage-plus-1',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.some(item=>item.label==='A'));assert.ok(s.modified.some(item=>item.label==='D'));}},
  {detachment:"Slaanesh's Chosen",unit:'Lord Exultant',enhancement:'Slayer of Champions',cardId:'unit-lord-exultant',route:'lord-exultant',effect:'precision-vs-character',assert:s=>{assert.equal(s.article,true);assert.ok(s.tags.length>0&&s.tags.every(tag=>tag==='PRECISION'));assert.match(s.notes.join(' '),/conditional on targeting a Character/i);}},
  {detachment:'Spectacle of Slaughter',unit:'Flawless Blades',enhancement:'Eager Patrons',cardId:'unit-flawless-blades',route:'flawless-blades',effect:'move-plus-2',assert:s=>{assert.equal(s.article,true);assert.ok(s.modified.some(item=>item.label==='M'&&parseInt(item.value)===parseInt(item.base)+2));}},
  {detachment:'Spectacle of Slaughter',unit:'Flawless Blades',enhancement:'Beguiling Grotesquerie',cardId:'unit-flawless-blades',route:'flawless-blades',effect:'snap-shooting-protection',assert:s=>{assert.equal(s.article,true);assert.match(s.notes.join(' '),/cannot target this unit with snap shooting/i);}}
];
try{
  for(const test of cases)await candidate(test);
  const duplicate=await browser.newContext({serviceWorkers:'block'}),page=await duplicate.newPage();let id=await save(page,{detachment:'Court of the Phoenician',unit:'Lord Exultant',enhancement:'Exalted Patron',second:true});
  for(const target of [`${base}/books/emperors-children/reader.html?roster=${id}#unit-lord-exultant`,`${base}/books/emperors-children/mobile/lord-exultant.html?roster=${id}`]){await page.goto(target);await page.locator('#unit-lord-exultant[data-roster-selected="true"]').waitFor();assert.equal(await page.locator('#unit-lord-exultant .roster-instances li').count(),2);assert.equal(await page.locator('#unit-lord-exultant [data-roster-derived-effect]').count(),0);}
  await duplicate.close();
  const unresolved=await browser.newContext({serviceWorkers:'block'}),unresolvedPage=await unresolved.newPage();id=await save(unresolvedPage,{detachment:'Court of the Phoenician',unit:'Lord Exultant',enhancement:'Exalted Patron',unresolved:true});
  await unresolvedPage.goto(`${base}/books/emperors-children/reader.html?roster=${id}#unit-lord-exultant`);await unresolvedPage.locator('#unit-lord-exultant[data-roster-selected="true"]').waitFor();assert.equal(await unresolvedPage.locator('#unit-lord-exultant [data-roster-derived-effect]').count(),0);assert.match(await unresolvedPage.locator('#unit-lord-exultant .roster-enhancement-unresolved').innerText(),/owner could not be resolved/i);await unresolved.close();
  console.log("Emperor's Children Enhancement runtime QA passed: 11 classified effects, Desktop/Phone parity, duplicate-instance and unresolved-owner safety.");
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
