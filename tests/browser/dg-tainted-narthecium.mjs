import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const taintedId='ability-tainted-narthecium-01ba1bd';
const taintedSectionId='plague-surgeon-ability-tainted-narthecium';
const taintedText='While this model is leading a unit, in your Command phase, you can return 1 destroyed Bodyguard model to that unit.';
const needleId='enhancement-needle-of-nurgle';
const needleText='PLAGUE SURGEON only. Each time the bearer uses its Tainted Narthecium ability, you can return up to D3 destroyed models to the bearer’s unit (instead of 1).';
const inflamedId='ability-inflamed-infections-ca01e1a';
const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg+xml':'image/svg+xml','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),relative=pathname.replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);
  if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}
  try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':contentTypes[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const sourceText=`Death Guard
1x Plague Surgeon (50 pts): Balesword, Plague bolt pistol
Enhancement: Needle of Nurgle (+25 pts)
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
const sourceTextNoNeedle=sourceText.replace('\nEnhancement: Needle of Nurgle (+25 pts)','');
const record=(id,{needle=true,attached=true}={})=>({id,sourceText:needle?sourceText:sourceTextNoNeedle,attachments:attached?{'parsed-unit-2':['parsed-unit-1']}: {}});
const providerSource=fs.readFileSync(path.join(root,'books/death-guard/scripts/roster-semantics.js'),'utf8');
assert.doesNotMatch(providerSource,/narthecium-d3|Apply the current Narthecium D3 effect\./,'legacy synthetic Needle/Narthecium gameplay record must be removed');
assert.match(providerSource,/canonicalEnhancement\(DG_ENH\.needle/,'Needle must use the shared canonical Enhancement reference path');

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

  const attached=await open(record('needle-attached'),'parsed-unit-2','unit-plague-marines');
  const attachedResult=await attached.page.evaluate(({taintedId,taintedSectionId,taintedText,needleId,needleText,inflamedId})=>{
    const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]'),effect=gameUnit.effects.find(item=>item.canonicalAbilityId===taintedId),needleEffect=gameUnit.effects.find(item=>item.canonicalReference?.id===needleId),articles=[...card.querySelectorAll(`[data-roster-canonical-ability-id="${taintedId}"]`)],needleArticles=[...card.querySelectorAll(`[data-roster-canonical-reference-id="${needleId}"]`)],composition=[...card.querySelectorAll('.unit-part')].find(part=>part.textContent.includes('Unit Composition'))?.textContent||'',modelCount=gameUnit.selection?.modelCount?.value??gameUnit.modelCount?.value??gameUnit.modelCount;
    return{effect,needleEffect,articleCount:articles.length,title:articles[0]?.querySelector('h5')?.textContent.trim()||'',source:articles[0]?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',text:articles[0]?.querySelector('p')?.textContent.trim()||'',sectionId:articles[0]?.dataset.rosterCanonicalSectionId||'',needleArticleCount:needleArticles.length,needleTitle:needleArticles[0]?.querySelector('h5')?.textContent.trim()||'',needleSource:needleArticles[0]?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',needleText:needleArticles[0]?.querySelector('p')?.textContent.trim()||'',activeText:card.querySelector('.roster-game-effects')?.textContent||'',syntheticEffects:gameUnit.effects.filter(item=>item.id==='narthecium-d3'||item.title==='Narthecium').length,syntheticArticles:[...card.querySelectorAll('.ability h5')].filter(node=>node.textContent.trim()==='Narthecium').length,inflamedEffects:gameUnit.effects.filter(item=>item.canonicalAbilityId===inflamedId).length,inflamedArticles:card.querySelectorAll(`[data-roster-canonical-ability-id="${inflamedId}"]`).length,automaticModelMutations:gameUnit.effects.filter(item=>['model','model-count','modelCount','composition'].includes(item.component)).length,modelCount,composition,expected:{taintedSectionId,taintedText,needleText}};
  },{taintedId,taintedSectionId,taintedText,needleId,needleText,inflamedId});
  assert.equal(attachedResult.effect?.source?.ownerInstanceId,'parsed-unit-1');
  assert.equal(attachedResult.effect?.targetInstanceId,'parsed-unit-2');
  assert.equal(attachedResult.effect?.operation,'reference');
  assert.equal(attachedResult.effect?.certainty,'current');
  assert.equal(attachedResult.effect?.provenance?.rosterFact,'explicit-attachment');
  assert.equal(attachedResult.effect?.canonicalAbility?.id,taintedId);
  assert.equal(attachedResult.effect?.canonicalAbility?.sectionId,taintedSectionId);
  assert.equal(attachedResult.articleCount,1);
  assert.equal(attachedResult.title,'Tainted Narthecium');
  assert.equal(attachedResult.source,'Plague Surgeon');
  assert.equal(attachedResult.text,taintedText);
  assert.equal(attachedResult.sectionId,taintedSectionId);
  assert.equal(attachedResult.needleEffect?.operation,'reference');
  assert.equal(attachedResult.needleEffect?.canonicalReference?.kind,'enhancement');
  assert.equal(attachedResult.needleEffect?.canonicalReference?.id,needleId);
  assert.equal(attachedResult.needleEffect?.source?.ownerInstanceId,'parsed-unit-1');
  assert.equal(attachedResult.needleEffect?.targetInstanceId,'parsed-unit-2');
  assert.equal(attachedResult.needleEffect?.certainty,'current');
  assert.equal(attachedResult.needleEffect?.provenance?.rosterFact,'explicit-attachment');
  assert.equal(attachedResult.needleArticleCount,1);
  assert.equal(attachedResult.needleTitle,'Needle of Nurgle');
  assert.equal(attachedResult.needleSource,'Plague Surgeon');
  assert.equal(attachedResult.needleText,needleText);
  assert.doesNotMatch(attachedResult.activeText,/Tainted Narthecium|Needle of Nurgle|Narthecium/);
  assert.equal(attachedResult.syntheticEffects,0);
  assert.equal(attachedResult.syntheticArticles,0);
  assert.equal(attachedResult.inflamedEffects,0,'Inflamed Infections must not propagate to the attached unit');
  assert.equal(attachedResult.inflamedArticles,0,'Inflamed Infections must not render as an attached-unit reference');
  assert.equal(attachedResult.automaticModelMutations,0,'Tainted Narthecium must not mutate roster model state automatically');
  assert.equal(attachedResult.modelCount,7);
  assert.match(attachedResult.composition,/7 models/);
  assert.doesNotMatch(attachedResult.composition,/8 models/);
  await attached.context.close();

  const other=await open(record('needle-attached'),'parsed-unit-3','unit-plague-marines');
  const otherResult=await other.page.evaluate(({taintedId,needleId,inflamedId})=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-3'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-3"]');return{taintedEffects:unit.effects.filter(effect=>effect.canonicalAbilityId===taintedId).length,taintedArticles:card.querySelectorAll(`[data-roster-canonical-ability-id="${taintedId}"]`).length,needleEffects:unit.effects.filter(effect=>effect.canonicalReference?.id===needleId).length,needleArticles:card.querySelectorAll(`[data-roster-canonical-reference-id="${needleId}"]`).length,inflamed:card.querySelectorAll(`[data-roster-canonical-ability-id="${inflamedId}"]`).length};},{taintedId,needleId,inflamedId});
  assert.deepEqual(otherResult,{taintedEffects:0,taintedArticles:0,needleEffects:0,needleArticles:0,inflamed:0},'Surgeon rules must not leak to another physical Plague Marines instance');
  await other.context.close();

  const source=await open(record('needle-attached'),'parsed-unit-1','unit-plague-surgeon');
  const sourceResult=await source.page.evaluate(({taintedId,needleId,inflamedId})=>{const card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-1"]'),count=title=>[...card.querySelectorAll('.ability')].filter(article=>article.querySelector('h5')?.textContent.trim()===title).length,headingCount=title=>[...card.querySelectorAll('h3,h4,h5,h6')].filter(node=>node.textContent.trim().replace(/\s+-\s+\d+\s*pts$/i,'')===title).length;return{tainted:count('Tainted Narthecium'),taintedDerived:card.querySelectorAll(`[data-roster-canonical-ability-id="${taintedId}"]`).length,needle:headingCount('Needle of Nurgle'),needleDerived:card.querySelectorAll(`[data-roster-canonical-reference-id="${needleId}"]`).length,synthetic:headingCount('Narthecium'),inflamed:count('Inflamed Infections'),inflamedDerived:card.querySelectorAll(`[data-roster-canonical-ability-id="${inflamedId}"]`).length};},{taintedId,needleId,inflamedId});
  assert.deepEqual(sourceResult,{tainted:1,taintedDerived:0,needle:1,needleDerived:0,synthetic:0,inflamed:1,inflamedDerived:0},'Plague Surgeon must retain canonical source content without derived duplicates');
  await source.context.close();

  const detached=await open(record('needle-detached',{attached:false}),'parsed-unit-2','unit-plague-marines');
  const detachedResult=await detached.page.evaluate(({taintedId,needleId})=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]');return{tainted:unit.effects.filter(effect=>effect.canonicalAbilityId===taintedId).length,needle:unit.effects.filter(effect=>effect.canonicalReference?.id===needleId).length,articles:card.querySelectorAll(`[data-roster-canonical-reference-id="${needleId}"],[data-roster-canonical-ability-id="${taintedId}"]`).length,modelCount:unit.selection?.modelCount?.value??unit.modelCount?.value??unit.modelCount};},{taintedId,needleId});
  assert.deepEqual(detachedResult,{tainted:0,needle:0,articles:0,modelCount:7},'Potential compatibility or absent attachment must not expose Surgeon rules or alter model count');
  await detached.context.close();

  const noNeedle=await open(record('tainted-no-needle',{needle:false}),'parsed-unit-2','unit-plague-marines');
  const noNeedleResult=await noNeedle.page.evaluate(({taintedId,needleId})=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-2'),card=document.querySelector('.unit-card.roster-game-view[data-roster-instance="parsed-unit-2"]');return{tainted:card.querySelectorAll(`[data-roster-canonical-ability-id="${taintedId}"]`).length,needle:card.querySelectorAll(`[data-roster-canonical-reference-id="${needleId}"]`).length,synthetic:[...card.querySelectorAll('.ability h5')].filter(node=>node.textContent.trim()==='Narthecium').length,active:card.querySelector('.roster-game-effects')?.textContent||'',modelCount:unit.selection?.modelCount?.value??unit.modelCount?.value??unit.modelCount};},{taintedId,needleId});
  assert.deepEqual({...noNeedleResult,active:''},{tainted:1,needle:0,synthetic:0,active:'',modelCount:7},'Without Needle, attached unit must retain only base canonical Tainted Narthecium');
  await noNeedle.context.close();
  console.log('DG Needle of Nurgle and Tainted Narthecium canonical reference QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
