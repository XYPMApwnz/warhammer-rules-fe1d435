import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const bookIds=['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const catalogFor=bookId=>{const scope={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,`books/${bookId}/scripts/roster-data.js`),'utf8'),scope);return scope.window.WH_BOOK_ROSTER_CATALOG;};
const catalogs=new Map(bookIds.map(bookId=>[bookId,catalogFor(bookId)]));

for(const [bookId,catalog] of catalogs){
  const missing=catalog.units.filter(unit=>!Object.keys(unit.gameSelections?.stats||{}).length);
  assert.equal(missing.length,0,`${bookId}: canonical stat metadata missing: ${missing.map(unit=>unit.id).join(', ')}`);
}

const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true});
const ready=(page,instance)=>page.waitForFunction(id=>document.querySelector(`.unit-card[data-roster-instance="${CSS.escape(id)}"].roster-game-view`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instance);
const selectedModel=(unit,id,quantity=3)=>{const selection=unit.gameSelections.selections.find(item=>item.kind==='weapon'&&item.profileIds.length);return{id,name:unit.title,points:100,models:[{quantity,name:unit.gameSelections.models[0]?.title||unit.title,loadouts:selection?[{quantity,wargear:selection.title}]:[]}]};};
const rawRecord=(catalog,id,body)=>({id,sourceText:`${catalog.book.title}\n${body}`});
const openRecord=async({bookId,record,instance,unitId})=>{const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),record);const page=await context.newPage();await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile&roster=${record.id}&rosterInstance=${instance}#${unitId}`);await ready(page,instance);return{context,page};};
const visibleStats=page=>page.evaluate(()=>{const card=document.querySelector('.unit-card.roster-game-view');return Object.fromEntries([...card.querySelectorAll('.stat[data-source-field^="stats."]')].map(node=>[node.dataset.sourceField.slice(6),node.querySelector('span')?.textContent.trim()||'']));});

try{
  for(const bookId of bookIds){
    const catalog=catalogs.get(bookId),unit=catalog.units.find(item=>item.gameSelections.models.length===1),instance='parsed-unit-1';
    assert.ok(unit,`${bookId}: canonical single-model fixture`);
    const record=rawRecord(catalog,`${bookId}-composition-record`,`1x ${unit.title} (100 pts):`),modelTitle=unit.gameSelections.models[0].title;
    const {context,page}=await openRecord({bookId,record,instance,unitId:unit.id});
    try{
      const game=await page.evaluate(sourceText=>{const parsed=window.WHRosterParser.parse(sourceText),unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units[0],card=document.querySelector('.unit-card.roster-game-view'),section=[...card.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-composition')),canonical=[...section.querySelectorAll('[data-roster-game-canonical="true"]')];return{rawQuantity:parsed.units[0].quantity,rawModels:parsed.units[0].models.length,modelCount:unit.selection.modelCount,composition:unit.selection.composition,generated:section.querySelectorAll('[data-roster-game-generated="composition"]').length,canonicalVisible:canonical.filter(node=>getComputedStyle(node).display!=='none'||node.getClientRects().length||node.getBoundingClientRect().height).length,text:section.innerText};},record.sourceText);
      assert.equal(game.rawQuantity,1,`${bookId}: raw quantity`);
      assert.equal(game.rawModels,0,`${bookId}: raw fixture unexpectedly supplied models`);
      assert.deepEqual({value:game.modelCount.value,state:game.modelCount.state},{value:1,state:'resolved'},`${bookId}: projected raw quantity`);
      assert.equal(game.composition.state,'resolved',`${bookId}: single-model composition resolution`);
      assert.equal(game.generated,1,`${bookId}: physical composition missing`);
      assert.equal(game.canonicalVisible,0,`${bookId}: canonical composition remains visible`);
      assert.match(game.text,/1 model\b/i,`${bookId}: actual model count missing`);
      assert.equal(game.text.includes(`1 × ${modelTitle}`),true,`${bookId}: canonical model identity missing`);
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile#${unit.id}`);
      await page.waitForSelector('.unit-card');
      const normal=await page.evaluate(()=>{const card=document.querySelector('.unit-card'),section=[...card.querySelectorAll('.unit-part')].find(part=>part.id.endsWith('-composition'));return{generated:section?.querySelectorAll('[data-roster-game-generated="composition"]').length||0,hidden:section?.querySelectorAll('[data-roster-game-canonical="true"]').length||0};});
      assert.deepEqual(normal,{generated:0,hidden:0},`${bookId}: normal composition changed`);
    }finally{await context.close();}
  }

  const dg=catalogs.get('death-guard'),noxious=dg.units.find(unit=>unit.id==='unit-noxious-blightbringer'),poxwalkers=dg.units.find(unit=>unit.id==='unit-poxwalkers'),plagueMarines=dg.units.find(unit=>unit.id==='unit-plague-marines'),pipes=dg.enhancements.find(item=>item.id==='enhancement-witherbone-pipes'),detachment=dg.detachments.find(item=>item.id===pipes?.detachmentId)||dg.detachments.find(item=>/Shamblerot/i.test(item.title));
  assert.ok(noxious&&poxwalkers&&plagueMarines&&pipes&&detachment,'DG pair canonical fixture');
  for(const fixture of [
    {name:'Poxwalkers',unit:poxwalkers,quantity:10,modelTitle:'Poxwalker',body:'10x Poxwalkers (65 pts):\n10 with Improvised weapons',forbidden:[/10[-\u2013]20 Poxwalkers/i,/Every model is equipped with/i]},
    {name:'Noxious',unit:noxious,quantity:1,modelTitle:'Noxious Blightbringer',body:'1x Noxious Blightbringer (60 pts): Plasma pistol, Cursed plague bell',forbidden:[/This model is equipped with/i]}
  ]){
    const record=rawRecord(dg,`raw-${fixture.name.toLowerCase()}-composition`,fixture.body),instance='parsed-unit-1',opened=await openRecord({bookId:'death-guard',record,instance,unitId:fixture.unit.id});
    try{
      const state=await opened.page.evaluate(sourceText=>{const parsed=window.WHRosterParser.parse(sourceText),unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units[0],section=document.querySelector('.unit-card.roster-game-view [id$="-composition"]');return{raw:parsed.units[0],modelCount:unit.selection.modelCount,composition:unit.selection.composition,text:section?.innerText||'',generated:section?.querySelectorAll('[data-roster-game-generated="composition"]').length||0};},record.sourceText);
      assert.equal(state.raw.quantity,fixture.quantity,`${fixture.name}: raw quantity`);
      assert.equal(state.raw.models.length,0,`${fixture.name}: raw fixture model records`);
      assert.deepEqual({value:state.modelCount.value,state:state.modelCount.state},{value:fixture.quantity,state:'resolved'},`${fixture.name}: model count`);
      assert.equal(state.composition.state,'resolved',`${fixture.name}: composition state`);
      assert.deepEqual(state.composition.models.map(model=>[model.quantity,model.sourceText]),[[fixture.quantity,fixture.modelTitle]],`${fixture.name}: canonical single-model breakdown`);
      assert.equal(state.generated,1,`${fixture.name}: generated composition`);
      assert.equal(state.text.includes(`${fixture.quantity} ${fixture.quantity===1?'model':'models'}`),true,`${fixture.name}: visible total`);
      assert.equal(state.text.includes(`${fixture.quantity} × ${fixture.modelTitle}`),true,`${fixture.name}: visible breakdown`);
      for(const pattern of fixture.forbidden)assert.doesNotMatch(state.text,pattern,`${fixture.name}: canonical composition leaked`);
    }finally{await opened.context.close();}
  }

  const explicitRecord=rawRecord(dg,'raw-plague-marines-composition','7x Plague Marines (125 pts):\n• 6x Plague Marine\n    4 with Boltgun, Plague knives\n    2 with Plague knives, Plasma gun\n• 1x Plague Champion:\n    Boltgun, Plague knives');
  {
    const {context,page}=await openRecord({bookId:'death-guard',record:explicitRecord,instance:'parsed-unit-1',unitId:plagueMarines.id});
    try{const state=await page.evaluate(sourceText=>{const parsed=window.WHRosterParser.parse(sourceText),unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units[0];return{raw:parsed.units[0],modelCount:unit.selection.modelCount,composition:unit.selection.composition,text:document.querySelector('.unit-card.roster-game-view [id$="-composition"]')?.innerText||''};},explicitRecord.sourceText);assert.deepEqual(state.raw.models.map(model=>[model.quantity,model.name]),[[6,'Plague Marine'],[1,'Plague Champion']]);assert.deepEqual({value:state.modelCount.value,state:state.modelCount.state},{value:7,state:'resolved'});assert.equal(state.composition.state,'resolved');assert.deepEqual(state.composition.models.map(model=>[model.quantity,model.sourceText]),[[6,'Plague Marine'],[1,'Plague Champion']]);assert.match(state.text,/6 × Plague Marine/);assert.match(state.text,/1 × Plague Champion/);}finally{await context.close();}
  }

  const ambiguousRecord=rawRecord(dg,'raw-ambiguous-plague-marines','7x Plague Marines (125 pts): Boltgun, Plague knives');
  {
    const {context,page}=await openRecord({bookId:'death-guard',record:ambiguousRecord,instance:'parsed-unit-1',unitId:plagueMarines.id});
    try{const state=await page.evaluate(sourceText=>{const parsed=window.WHRosterParser.parse(sourceText),unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units[0];return{raw:parsed.units[0],modelCount:unit.selection.modelCount,composition:unit.selection.composition};},ambiguousRecord.sourceText);assert.equal(state.raw.models.length,0);assert.deepEqual({value:state.modelCount.value,state:state.modelCount.state},{value:7,state:'resolved'});assert.equal(state.composition.state,'partial');assert.deepEqual(state.composition.models,[]);assert.equal(state.composition.unresolved[0]?.reason,'ambiguous-canonical-model-identities');}finally{await context.close();}
  }

  const pairRecord={id:'noxious-poxwalkers-effective-stats',roster:{faction:dg.book.title,units:[selectedModel(noxious,'noxious',1),selectedModel(poxwalkers,'poxwalkers',10)],detachments:[{name:detachment.title}],enhancements:[{id:pipes.id,name:pipes.title,ownerUnitId:'noxious',ownerStatus:'resolved'}],warnings:[]},attachments:{poxwalkers:['noxious']}};
  for(const [instance,unitId] of [['poxwalkers',poxwalkers.id],['noxious',noxious.id]]){
    const {context,page}=await openRecord({bookId:'death-guard',record:pairRecord,instance,unitId});
    try{
      const projected=await page.evaluate(id=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId===id),stats=unit.effects.filter(effect=>effect.component==='stat'),vitalityId='ability-sickening-vitality-89bb5ff';return{effective:unit.effective.stats,effects:stats.map(effect=>({id:effect.id,targetId:effect.targetId,base:effect.base,effective:effect.effective,owner:effect.source?.ownerInstanceId})),text:document.querySelector('.roster-game-effects')?.innerText||'',vitality:unit.effects.find(effect=>effect.canonicalAbilityId===vitalityId),vitalityText:document.querySelector(`[data-roster-canonical-ability-id="${vitalityId}"]`)?.innerText||''};},instance),dom=await visibleStats(page);
      assert.equal(projected.effective.M,'6"',`${instance}: effective M`);
      assert.equal(projected.effective.OC,'2',`${instance}: effective OC`);
      assert.equal(dom.M,'6"',`${instance}: visible M`);
      assert.equal(dom.OC,'2',`${instance}: visible OC`);
      assert.equal(projected.effects.filter(effect=>effect.targetId==='M'&&effect.base==='5"'&&effect.effective==='6"'&&effect.owner==='noxious').length,1,`${instance}: Sickening Vitality reduction`);
      assert.equal(projected.effects.filter(effect=>effect.targetId==='OC'&&effect.base==='1'&&effect.effective==='2'&&effect.owner==='noxious').length,1,`${instance}: Witherbone Pipes reduction`);
      if(instance==='poxwalkers'){
        assert.equal(projected.vitality?.operation,'reference',`${instance}: Sickening Vitality canonical reference`);
        assert.match(projected.vitalityText,/Sickening Vitality[\s\S]*Noxious Blightbringer[\s\S]*re-roll Advance and Charge/i,`${instance}: canonical Sickening Vitality ability/source`);
        assert.doesNotMatch(projected.text,/Sickening Vitality/i,`${instance}: no Active roster effects reference duplicate`);
        assert.match(projected.text,/Witherbone Pipes/i,`${instance}: Witherbone Pipes ability/provenance`);
      }
    }finally{await context.close();}
  }

  const noAttachment={...pairRecord,id:'noxious-poxwalkers-no-attachment',attachments:{}};
  for(const [instance,unitId] of [['poxwalkers',poxwalkers.id],['noxious',noxious.id]]){
    const {context,page}=await openRecord({bookId:'death-guard',record:noAttachment,instance,unitId});
    try{const state=await page.evaluate(id=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId===id);return unit.effects.filter(effect=>effect.id==='sickening-vitality-move'||effect.id==='witherbone-pipes-oc').length;},instance),dom=await visibleStats(page);assert.equal(state,0,`${instance}: no-attachment effect leakage`);assert.equal(dom.M,'5"');assert.equal(dom.OC,'1');}finally{await context.close();}
  }

  const leaderRecipeUnitIds=['unit-typhus','unit-biologus-putrifier','unit-icon-bearer','unit-lord-of-contagion','unit-lord-of-poxes','unit-lord-of-virulence','unit-noxious-blightbringer','unit-tallyman'],leaderRecipeUnits=leaderRecipeUnitIds.map(unitId=>dg.units.find(unit=>unit.id===unitId));
  assert.equal(leaderRecipeUnits.every(Boolean),true,'DG attachment-required Leader fixture coverage');
  const unattachedLeaders={id:'dg-unattached-leader-recipes',roster:{faction:dg.book.title,units:leaderRecipeUnits.map((unit,index)=>selectedModel(unit,`unattached-leader-${index+1}`,1)),detachments:[],enhancements:[],warnings:[]},attachments:{}};
  {
    const {context,page}=await openRecord({bookId:'death-guard',record:unattachedLeaders,instance:'unattached-leader-1',unitId:leaderRecipeUnits[0].id});
    try{const falseEffects=await page.evaluate(()=>window.WH_ARMY_ROSTER_GAME_PROJECTION.units.flatMap(unit=>unit.effects.filter(effect=>effect.source?.kind==='explicit-attachment').map(effect=>`${unit.identity.instanceId}:${effect.id}`)));assert.deepEqual(falseEffects,[],'DG attachment-required Leader recipe self-activation');}finally{await context.close();}
  }

  const wrongBodyguard={id:'noxious-wrong-bodyguard',roster:{faction:dg.book.title,units:[selectedModel(noxious,'noxious',1),selectedModel(plagueMarines,'plague-marines',5)],detachments:[{name:detachment.title}],enhancements:[{id:pipes.id,name:pipes.title,ownerUnitId:'noxious',ownerStatus:'resolved'}],warnings:[]},attachments:{'plague-marines':['noxious']}};
  for(const [instance,unitId] of [['noxious',noxious.id],['plague-marines',plagueMarines.id]]){
    const {context,page}=await openRecord({bookId:'death-guard',record:wrongBodyguard,instance,unitId});
    try{const state=await page.evaluate(id=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId===id);return unit.effects.filter(effect=>effect.id==='witherbone-pipes-oc').length;},instance);assert.equal(state,0,`${instance}: Witherbone Pipes leaked to wrong Bodyguard`);}finally{await context.close();}
  }

  console.log('Roster effective stats and physical composition QA: PASS (9/9).');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
