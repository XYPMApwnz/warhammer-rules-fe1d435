import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const blindingId='ability-blinding-spray-7d189f5';
const blindingSectionId='foul-blightspawn-ability-blinding-spray';
const blindingText='In the Fight phase, you can select one model from your army with this ability to use this ability. If you do, until the end of the phase, that model’s unit has the Fights First ability. Each model can only be selected for this ability once per battle.';
const stinkId='ability-putrefying-stink-4f5145b';
const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg+xml':'image/svg+xml','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),relative=pathname.replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);
  if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}
  try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':contentTypes[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const sourceText=`Death Guard
1x Foul Blightspawn (60 pts): Close combat weapon, Plague sprayer
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
const record=id=>({id,sourceText,attachments:id==='blinding-attached'?{'parsed-unit-2':['parsed-unit-1']}: {}});

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

  const attached=await open(record('blinding-attached'),'parsed-unit-2','unit-plague-marines');
  const attachedResult=await attached.page.evaluate(({blindingId,blindingSectionId,blindingText,stinkId})=>{
    const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]'),effect=gameUnit.effects.find(item=>item.canonicalAbilityId===blindingId),articles=[...card.querySelectorAll(`[data-roster-canonical-ability-id="${blindingId}"]`)];
    return{effect,articleCount:articles.length,title:articles[0]?.querySelector('h5')?.textContent.trim()||'',source:articles[0]?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',text:articles[0]?.querySelector('p')?.textContent.trim()||'',sectionId:articles[0]?.dataset.rosterCanonicalSectionId||'',activeText:card.querySelector('.roster-game-effects')?.textContent||'',fightsFirst:gameUnit.effective.abilities.filter(item=>item.id==='core-fights-first'||item.title==='Fights First').length,stinkEffects:gameUnit.effects.filter(item=>item.canonicalAbilityId===stinkId).length,stinkArticles:card.querySelectorAll(`[data-roster-canonical-ability-id="${stinkId}"]`).length,cardCount:document.querySelectorAll('.unit-card[data-roster-game-instance]').length,expected:{blindingSectionId,blindingText}};
  },{blindingId,blindingSectionId,blindingText,stinkId});
  assert.equal(attachedResult.effect?.source?.ownerInstanceId,'parsed-unit-1');
  assert.equal(attachedResult.effect?.targetInstanceId,'parsed-unit-2');
  assert.equal(attachedResult.effect?.operation,'reference');
  assert.equal(attachedResult.effect?.certainty,'current');
  assert.equal(attachedResult.effect?.provenance?.rosterFact,'explicit-attachment');
  assert.equal(attachedResult.effect?.canonicalAbility?.id,blindingId);
  assert.equal(attachedResult.effect?.canonicalAbility?.sectionId,blindingSectionId);
  assert.equal(attachedResult.articleCount,1);
  assert.equal(attachedResult.title,'Blinding Spray');
  assert.equal(attachedResult.source,'Foul Blightspawn');
  assert.equal(attachedResult.text,blindingText);
  assert.equal(attachedResult.sectionId,blindingSectionId);
  assert.doesNotMatch(attachedResult.activeText,/Blinding Spray/);
  assert.equal(attachedResult.fightsFirst,0,'Blinding Spray must not permanently grant Fights First from roster state');
  assert.equal(attachedResult.stinkEffects,0,'Putrefying Stink must not propagate to the attached unit');
  assert.equal(attachedResult.stinkArticles,0,'Putrefying Stink must not render as an attached-unit reference');
  assert.equal(attachedResult.cardCount,1);
  await attached.context.close();

  const other=await open(record('blinding-attached'),'parsed-unit-3','unit-plague-marines');
  const otherResult=await other.page.evaluate(({blindingId,stinkId})=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-3'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-3"]');return{effects:unit.effects.filter(effect=>effect.canonicalAbilityId===blindingId).length,articles:card.querySelectorAll(`[data-roster-canonical-ability-id="${blindingId}"]`).length,stink:card.querySelectorAll(`[data-roster-canonical-ability-id="${stinkId}"]`).length};},{blindingId,stinkId});
  assert.deepEqual(otherResult,{effects:0,articles:0,stink:0},'Blinding Spray must not leak to another physical Plague Marines instance');
  await other.context.close();

  const source=await open(record('blinding-attached'),'parsed-unit-1','unit-foul-blightspawn');
  const sourceResult=await source.page.evaluate(({blindingId,stinkId})=>{const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-1"]'),count=title=>[...card.querySelectorAll('.ability')].filter(article=>article.querySelector('h5')?.textContent.trim()===title).length;return{blinding:count('Blinding Spray'),blindingDerived:card.querySelectorAll(`[data-roster-canonical-ability-id="${blindingId}"]`).length,stink:count('Putrefying Stink'),stinkDerived:card.querySelectorAll(`[data-roster-canonical-ability-id="${stinkId}"]`).length};},{blindingId,stinkId});
  assert.deepEqual(sourceResult,{blinding:1,blindingDerived:0,stink:1,stinkDerived:0},'Foul Blightspawn must retain one canonical article for each source Ability without derived duplicates');
  await source.context.close();

  const detached=await open(record('blinding-detached'),'parsed-unit-2','unit-plague-marines');
  const detachedResult=await detached.page.evaluate(blindingId=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]');return{effects:unit.effects.filter(effect=>effect.canonicalAbilityId===blindingId).length,articles:card.querySelectorAll(`[data-roster-canonical-ability-id="${blindingId}"]`).length};},blindingId);
  assert.deepEqual(detachedResult,{effects:0,articles:0},'Potential compatibility or absent attachment must not expose Blinding Spray');
  await detached.context.close();
  console.log('DG Blinding Spray attached canonical Ability QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
