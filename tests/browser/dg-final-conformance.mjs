import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createRosterFixture} from '../helpers/roster-fixtures.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const scope={window:{}};
for(const file of ['books/death-guard/scripts/roster-data.js','roster-guides/points-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),scope,{filename:file});
const catalog=scope.window.WH_BOOK_ROSTER_CATALOG,pointsCatalog=scope.window.WH_POINTS_CATALOG['death guard'];
const byUnit=id=>catalog.units.find(unit=>unit.id===id);
const byEnhancement=id=>catalog.enhancements.find(item=>item.id===id);
const rule=id=>catalog.detachmentRules.find(item=>item.id===id);
const fixture=(id,detachmentId,units,attachments={})=>createRosterFixture({catalog,pointsCatalog,id,detachmentId,units,attachments}).record;
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{const relative=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname).replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await launchChromium();
const open=async(saved,instanceId,canonicalId)=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),saved);const page=await context.newPage();await page.goto(`${origin}/books/death-guard/reader.html?view=mobile&roster=${saved.id}&rosterInstance=${instanceId}#${canonicalId}`,{waitUntil:'networkidle'});await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===id)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${id}"]`),instanceId);return{context,page};};

try{
  const hyperId='detachment-rule-hypervirulent-strains',hyper=rule(hyperId);
  assert.ok(hyper?.text);
  const hyperRecord=fixture('dg-hyper','detachment-paragons-of-putrescence',[{datasheetId:'unit-noxious-blightbringer',instanceId:'parsed-unit-1',quantity:1},{datasheetId:'unit-poxwalkers',instanceId:'parsed-unit-2',quantity:10}]);
  const hyperPage=await open(hyperRecord,'parsed-unit-1','unit-noxious-blightbringer');
  const hyperResult=await hyperPage.page.evaluate(id=>{const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-1'),effect=gameUnit.effects.find(item=>item.canonicalReference?.id===id),article=document.querySelector(`[data-roster-canonical-detachment-rule-id="${id}"]`),body=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-2');return{effect,bodyEffects:body.effects.filter(item=>item.canonicalReference?.id===id).length,title:article?.querySelector('h5')?.textContent.trim()||'',text:article?.querySelector('p')?.textContent.trim()||'',source:article?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',active:document.querySelector('.roster-game-effects')?.textContent||''};},hyperId);
  assert.equal(hyperResult.effect?.canonicalReference?.kind,'detachment-rule');
  assert.equal(hyperResult.effect?.source?.ownerInstanceId,null);
  assert.equal(hyperResult.effect?.targetInstanceId,'parsed-unit-1');
  assert.equal(hyperResult.bodyEffects,0);
  assert.equal(hyperResult.title,hyper.title);
  assert.equal(hyperResult.text,hyper.text);
  assert.equal(hyperResult.source,'Paragons of Putrescence');
  assert.doesNotMatch(hyperResult.active,/Hypervirulent Strains/);
  await hyperPage.context.close();
  const wrongHyper=await open(fixture('dg-hyper-wrong','detachment-virulent-vectorium',[{datasheetId:'unit-noxious-blightbringer',instanceId:'parsed-unit-1',quantity:1}]),'parsed-unit-1','unit-noxious-blightbringer');
  assert.equal(await wrongHyper.page.locator(`[data-roster-canonical-reference-id="${hyperId}"]`).count(),0);
  await wrongHyper.context.close();

  const attachedCases=[
    ['enhancement-arch-contaminator','unit-biologus-putrifier','unit-plague-marines',5],
    ['enhancement-eye-of-affliction','unit-biologus-putrifier','unit-plague-marines',5],
    ['enhancement-shriekworm-familiar','unit-biologus-putrifier','unit-plague-marines',5],
    ['enhancement-final-ingredient','unit-biologus-putrifier','unit-plague-marines',5],
    ['enhancement-lord-of-the-walking-pox','unit-noxious-blightbringer','unit-poxwalkers',10],
    ['enhancement-warprot-talisman','unit-lord-of-virulence','unit-blightlord-terminators',5],
    ['enhancement-rejuvenating-swarm','unit-biologus-putrifier','unit-plague-marines',5],
    ['enhancement-host-of-the-hybridised-pox','unit-biologus-putrifier','unit-plague-marines',5]
  ];
  for(const [id,sourceId,targetId,targetQuantity] of attachedCases){
    const item=byEnhancement(id),saved=fixture(`dg-ref-${id}`,item.detachmentId,[{datasheetId:sourceId,instanceId:'parsed-unit-1',quantity:1,enhancementId:id},{datasheetId:targetId,instanceId:'parsed-unit-2',quantity:targetQuantity},{datasheetId:targetId,instanceId:'parsed-unit-3',quantity:targetQuantity}],{'parsed-unit-2':['parsed-unit-1']}),opened=await open(saved,'parsed-unit-2',targetId);
    const result=await opened.page.evaluate(id=>{const target=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-2'),other=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId==='parsed-unit-3'),effect=target.effects.find(item=>item.canonicalReference?.id===id),article=document.querySelector(`[data-roster-canonical-reference-id="${id}"]`);return{effect,other:other.effects.filter(item=>item.canonicalReference?.id===id).length,title:article?.querySelector('h5')?.textContent.trim()||'',text:article?.querySelector('p')?.textContent.trim()||'',source:article?.querySelector('.roster-game-ability-source')?.textContent.trim()||'',active:document.querySelector('.roster-game-effects')?.textContent||''};},id);
    assert.equal(result.effect?.source?.ownerInstanceId,'parsed-unit-1',id);
    assert.equal(result.effect?.targetInstanceId,'parsed-unit-2',id);
    assert.equal(result.effect?.canonicalReference?.kind,'enhancement',id);
    assert.equal(result.effect?.provenance?.kind,'curated-provider',id);
    assert.equal(result.effect?.provenance?.rosterFact,'explicit-attachment',id);
    assert.equal(result.other,0,id);
    assert.equal(result.title,item.title.replace(/\s+-\s+\d+\s*pts$/i,''),id);
    assert.equal(result.text,item.text,id);
    assert.ok(result.source.startsWith(byUnit(sourceId).title),id);
    if(id==='enhancement-arch-contaminator')assert.equal(result.source,'Biologus Putrifier');
    assert.doesNotMatch(result.active,new RegExp(item.title.replace(/\s+-\s+\d+\s*pts$/i,'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),id);
    await opened.context.close();
  }
  const wrongWalking=byEnhancement('enhancement-lord-of-the-walking-pox'),wrongWalkingPage=await open(fixture('dg-walking-wrong',wrongWalking.detachmentId,[{datasheetId:'unit-noxious-blightbringer',instanceId:'parsed-unit-1',quantity:1,enhancementId:wrongWalking.id},{datasheetId:'unit-plague-marines',instanceId:'parsed-unit-2',quantity:5}],{'parsed-unit-2':['parsed-unit-1']}),'parsed-unit-2','unit-plague-marines');
  assert.equal(await wrongWalkingPage.page.locator(`[data-roster-canonical-reference-id="${wrongWalking.id}"]`).count(),0);
  await wrongWalkingPage.context.close();

  const biologus=byUnit('unit-biologus-putrifier'),melee=biologus.gameSelections.selections.find(selection=>selection.kind==='weapon'&&selection.profileIds.some(id=>biologus.gameSelections.weaponProfiles.find(profile=>profile.id===id)?.mode==='melee')),ranged=biologus.gameSelections.selections.find(selection=>selection.kind==='weapon'&&selection.profileIds.some(id=>biologus.gameSelections.weaponProfiles.find(profile=>profile.id===id)?.mode==='ranged'));
  const daemonId='enhancement-daemon-weapon-of-nurgle',daemonItem=byEnhancement(daemonId),daemonPage=await open(fixture('dg-daemon',daemonItem.detachmentId,[{datasheetId:'unit-biologus-putrifier',instanceId:'parsed-unit-1',quantity:1,selectionIds:[melee.id,ranged.id],enhancementId:daemonId}]),'parsed-unit-1','unit-biologus-putrifier');
  const daemonResult=await daemonPage.page.evaluate(()=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-1'),effect=unit.effects.find(item=>item.id==='critical-hit-5'),rows=[...document.querySelectorAll('.weapon-row:not(.weapon-head)')].filter(row=>!row.hidden);return{effect,tagged:rows.filter(row=>row.textContent.includes('CRITICAL HITS 5+')).map(row=>row.id),synthetic:[...document.querySelectorAll('.ability h5')].filter(node=>node.textContent.trim()==='Critical Hits 5+').length,active:document.querySelector('.roster-game-effects')?.textContent||''};});
  assert.equal(daemonResult.effect?.component,'weapon');
  assert.equal(daemonResult.effect?.operation,'grant-tag');
  assert.ok(daemonResult.effect?.targets.length>0);
  assert.ok(daemonResult.tagged.length>0);
  assert.equal(daemonResult.synthetic,0);
  assert.match(daemonResult.active,/CRITICAL HITS 5\+/);
  await daemonPage.context.close();

  const regenId='enhancement-revolting-regeneration',regenItem=byEnhancement(regenId),regenPage=await open(fixture('dg-regen',regenItem.detachmentId,[{datasheetId:'unit-biologus-putrifier',instanceId:'parsed-unit-1',quantity:1,enhancementId:regenId}]),'parsed-unit-1','unit-biologus-putrifier');
  const regenResult=await regenPage.page.evaluate(()=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-1'),effect=unit.effects.find(item=>item.id==='revolting-regeneration'),core=[...document.querySelectorAll('.ability')].find(article=>article.querySelector('h5')?.textContent.trim()==='CORE')?.textContent||'';return{effect,core,synthetic:[...document.querySelectorAll('.roster-game-derived-ability h5')].filter(node=>node.textContent.trim()==='Revolting Regeneration').length};});
  assert.equal(regenResult.effect?.targetId,'core-feel-no-pain');
  assert.match(regenResult.core,/Feel No Pain 5\+/);
  assert.equal(regenResult.synthetic,0);
  await regenPage.context.close();

  const plagueveilId='enhancement-plagueveil',plagueveil=byEnhancement(plagueveilId),plagueveilPage=await open(fixture('dg-plagueveil',plagueveil.detachmentId,[{datasheetId:'unit-plague-marines',instanceId:'parsed-unit-1',quantity:5,enhancementId:plagueveilId}]),'parsed-unit-1','unit-plague-marines');
  const plagueveilResult=await plagueveilPage.page.evaluate(id=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-1');return{effects:unit.effects.filter(item=>item.id==='plagueveil'||item.canonicalReference?.id===id).length,headings:[...document.querySelectorAll('h3,h4,h5')].filter(node=>node.textContent.trim().replace(/\s+-\s+\d+\s*pts$/i,'')==='Plagueveil').length};},plagueveilId);
  assert.equal(plagueveilResult.effects,0);
  assert.equal(plagueveilResult.headings,1);
  await plagueveilPage.context.close();

  const plaguebearers=byUnit('unit-plaguebearers'),instrumentId='plaguebearers-ability-instrument-of-chaos',instrumentPage=await open(fixture('dg-instrument',null,[{datasheetId:'unit-plaguebearers',instanceId:'parsed-unit-1',quantity:10,selectionIds:['unit-plaguebearers-selection-instrument-of-chaos']}]),'parsed-unit-1','unit-plaguebearers');
  const instrumentResult=await instrumentPage.page.evaluate(id=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId==='parsed-unit-1'),effect=unit.effects.find(item=>item.canonicalReference?.id===id),article=document.querySelector(`[data-roster-canonical-reference-id="${id}"]`);return{effect,count:document.querySelectorAll(`[data-roster-canonical-reference-id="${id}"]`).length,title:article?.querySelector('h5')?.textContent.trim()||'',text:article?.querySelector('p')?.textContent.trim()||''};},instrumentId);
  const canonicalInstrument=plaguebearers.gameSelections.wargearAbilities.find(item=>item.id===instrumentId);
  assert.equal(instrumentResult.effect?.source?.kind,'selected-wargear');
  assert.equal(instrumentResult.count,1);
  assert.equal(instrumentResult.title,canonicalInstrument.title);
  assert.equal(instrumentResult.text,canonicalInstrument.text);
  await instrumentPage.context.close();
  console.log('DG final roster conformance browser QA: PASS');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
