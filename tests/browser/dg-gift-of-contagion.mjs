import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const giftId='ability-gift-of-contagion-psychic-4fea300';
const giftSectionId='malignant-plaguecaster-ability-gift-of-contagion-psychic';
const giftText='While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Afflicted, that attack has the [SUSTAINED HITS 1] ability.';
const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg+xml':'image/svg+xml','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),relative=pathname.replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);
  if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}
  try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':contentTypes[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const sourceText=`Death Guard
1x Malignant Plaguecaster (60 pts): Bolt pistol, Corrupted staff, Plague Wind
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives
7x Plague Marines (125 pts)
• 6x Plague Marine
    4 with Boltgun, Plague knives
    2 with Plague knives, Plasma gun
• 1x Plague Champion: Boltgun, Plague knives`;
const record=id=>({id,sourceText,attachments:id==='gift-attached'?{'parsed-unit-2':['parsed-unit-1']}: {}});

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const open=async(saved,instanceId,canonicalId)=>{
    const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
    await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),saved);
    const page=await context.newPage();
    await page.goto(`${origin}/books/death-guard/reader.html?view=mobile&roster=${saved.id}&rosterInstance=${instanceId}#${canonicalId}`,{waitUntil:'networkidle'});
    await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===id)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${id}"]`),instanceId);
    return{context,page};
  };
  const attached=await open(record('gift-attached'),'parsed-unit-2','unit-plague-marines');
  const attachedResult=await attached.page.evaluate(({giftId,giftSectionId,giftText})=>{
    const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]'),effect=gameUnit.effects.find(item=>item.canonicalAbilityId===giftId),articles=[...card.querySelectorAll(`[data-roster-canonical-ability-id="${giftId}"]`)];
    return{effect,articleCount:articles.length,title:articles[0]?.querySelector('h5')?.textContent.trim()||'',source:articles[0]?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',text:articles[0]?.querySelector('p')?.textContent.trim()||'',sectionId:articles[0]?.dataset.rosterCanonicalSectionId||'',activeText:card.querySelector('.roster-game-effects')?.textContent||'',sh1Tags:[...card.querySelectorAll('.weapon-row:not([hidden]) .weapon-tags .tag')].filter(node=>node.textContent.trim()==='SUSTAINED HITS 1').length,effectiveGift:gameUnit.effective.abilities.some(ability=>ability.id===giftId),cardCount:document.querySelectorAll('.unit-card[data-roster-game-instance]').length,expected:{giftSectionId,giftText}};
  },{giftId,giftSectionId,giftText});
  assert.equal(attachedResult.effect?.source?.ownerInstanceId,'parsed-unit-1');
  assert.equal(attachedResult.effect?.targetInstanceId,'parsed-unit-2');
  assert.equal(attachedResult.effect?.operation,'reference');
  assert.equal(attachedResult.effect?.certainty,'current');
  assert.equal(attachedResult.effect?.provenance?.rosterFact,'explicit-attachment');
  assert.equal(attachedResult.effect?.canonicalAbility?.id,giftId);
  assert.equal(attachedResult.effect?.canonicalAbility?.sectionId,giftSectionId);
  assert.equal(attachedResult.articleCount,1);
  assert.equal(attachedResult.title,'Gift of Contagion (Psychic)');
  assert.equal(attachedResult.source,'Malignant Plaguecaster');
  assert.equal(attachedResult.text,giftText);
  assert.equal(attachedResult.sectionId,giftSectionId);
  assert.doesNotMatch(attachedResult.activeText,/Gift of Contagion/);
  assert.equal(attachedResult.sh1Tags,0,'Unknown Afflicted target state must not permanently grant SUSTAINED HITS 1');
  assert.equal(attachedResult.effectiveGift,false,'Canonical reference must not masquerade as a deterministic effective grant');
  assert.equal(attachedResult.cardCount,1);
  await attached.context.close();

  const other=await open(record('gift-attached'),'parsed-unit-3','unit-plague-marines');
  const otherResult=await other.page.evaluate(giftId=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-3'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-3"]');return{effects:unit.effects.filter(effect=>effect.canonicalAbilityId===giftId).length,articles:card.querySelectorAll(`[data-roster-canonical-ability-id="${giftId}"]`).length,sh1:[...card.querySelectorAll('.weapon-row:not([hidden]) .weapon-tags .tag')].filter(node=>node.textContent.trim()==='SUSTAINED HITS 1').length};},giftId);
  assert.deepEqual(otherResult,{effects:0,articles:0,sh1:0},'Gift must not leak to another physical Plague Marines instance');
  await other.context.close();

  const caster=await open(record('gift-attached'),'parsed-unit-1','unit-malignant-plaguecaster');
  const casterResult=await caster.page.evaluate(giftId=>{const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-1"]'),giftArticles=[...card.querySelectorAll('.ability')].filter(article=>article.querySelector('h5')?.textContent.trim()==='Gift of Contagion (Psychic)');return{all:giftArticles.length,derived:card.querySelectorAll(`[data-roster-canonical-ability-id="${giftId}"]`).length,sh1:[...card.querySelectorAll('.weapon-row:not([hidden]) .weapon-tags .tag')].filter(node=>node.textContent.trim()==='SUSTAINED HITS 1').length};},giftId);
  assert.deepEqual(casterResult,{all:1,derived:0,sh1:0},'Plaguecaster must retain one canonical Gift article without a derived duplicate or permanent mutation');
  await caster.context.close();

  const detached=await open(record('gift-detached'),'parsed-unit-2','unit-plague-marines');
  const detachedResult=await detached.page.evaluate(giftId=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]');return{effects:unit.effects.filter(effect=>effect.canonicalAbilityId===giftId).length,articles:card.querySelectorAll(`[data-roster-canonical-ability-id="${giftId}"]`).length};},giftId);
  assert.deepEqual(detachedResult,{effects:0,articles:0},'Potential compatibility or absent attachment must not expose Gift');
  await detached.context.close();
  console.log('DG Gift of Contagion attached canonical Ability QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
