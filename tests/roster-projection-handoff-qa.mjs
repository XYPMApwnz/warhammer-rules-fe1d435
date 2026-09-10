import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sources=new Map();
const read=file=>{if(!sources.has(file))sources.set(file,fs.readFileSync(path.join(root,file),'utf8'));return sources.get(file);};
const plain=value=>JSON.parse(JSON.stringify(value));
const contextPath='books/shared/roster-context.js';
const anchors={
  'adeptus-mechanicus':'unit-skitarii-rangers',tyranids:'unit-gargoyles',
  'chaos-space-marines':'unit-cultist-mob','space-marines':'unit-bladeguard-veteran-squad',
  'dark-angels':'unit-bladeguard-veteran-squad','blood-angels':'unit-bladeguard-veteran-squad',
  'tau-empire':'unit-breacher-team','emperors-children':'unit-daemonettes'
};
function loadBook(book,overrides={}){
  const scope={console,URL,URLSearchParams,location:{pathname:`/books/${book}/reader.html`,search:''},document:{documentElement:{dataset:{bookId:book}},querySelectorAll:()=>[]},addEventListener(){}};
  scope.window=scope;scope.globalThis=scope;vm.createContext(scope);
  const run=file=>vm.runInContext(overrides[file]??read(file),scope,{filename:file});
  for(const file of ['books/shared/rule-facts.js','roster-guides/points-data.js','roster-guides/points-validator.js',`books/${book}/scripts/roster-data.js`,contextPath])run(file);
  const api=scope.WHArmyRosterContext;
  let options;
  scope.WHArmyRosterContext={...api,install:value=>{options=value;}};
  if(book==='death-guard'){
    run('books/shared/roster-enhancements.js');run('books/death-guard/scripts/roster-semantics.js');
  }else if(book==='adeptus-mechanicus')run('books/adeptus-mechanicus/scripts/roster-enhancements.js');
  else{run('books/shared/book-roster-enhancements.js');run('books/extensions/book-roster-enhancement-providers.js');}
  run(`books/${book}/scripts/roster-filter.js`);
  scope.WHArmyRosterContext=api;
  assert.ok(options,`${book}: actual adapter install captured`);
  return {scope,api,catalog:scope.WH_BOOK_ROSTER_CATALOG,project:roster=>api.install({...options,roster,record:{id:'ra02-qa',roster}})};
}
function rawUnit(catalog,id,instance='physical-1'){
  const unit=catalog.units.find(item=>item.id===id);assert.ok(unit,`canonical fixture ${id}`);
  const selection=unit.gameSelections?.selections?.find(item=>item.kind==='weapon'&&item.profileIds?.some(id=>unit.gameSelections.weaponProfiles.find(profile=>profile.id===id)?.mode==='melee'));
  return{id:instance,canonicalUnitId:id,name:unit.title,quantity:1,points:100,wargear:selection?.title||'',models:[]};
}
function fixture(runtime,id,enhancementId,{detachmentId,duplicateUnit=false}={}){
  const {catalog}=runtime,enhancement=catalog.enhancements.find(item=>item.id===enhancementId);
  assert.ok(enhancement,`canonical enhancement ${enhancementId}`);
  const detachment=catalog.detachments.find(item=>item.id===(detachmentId||enhancement.detachmentId));assert.ok(detachment);
  return{faction:catalog.book.title,units:[rawUnit(catalog,id),...(duplicateUnit?[rawUnit(catalog,id,'physical-2')]:[])],detachments:[{id:detachment.id,name:detachment.title}],enhancements:[{id:enhancement.id,name:enhancement.title.replace(/\s+[-\u2013]\s+\d+\s*pts$/i,''),ownerUnitId:'physical-1',ownerStatus:'resolved'}],warnings:[]};
}
const enhancementEffects=game=>game.effects.filter(effect=>effect.source?.kind==='enhancement'||effect.provenance?.rosterFact==='enhancement-owner');
function inactive(runtime,roster,label,status='invalid'){
  const before=JSON.stringify(roster),projection=runtime.project(roster);
  assert.equal(JSON.stringify(roster),before,`${label}: raw input changed`);
  assert.deepEqual(plain(projection.sourceRoster),plain(roster),`${label}: inspectable source`);
  assert.equal(projection.enhancementAssessment.assignments[0].assessment?.ownerEligibility,status,`${label}: existing eligibility assessment`);
  assert.equal(projection.roster.enhancements.length,0,`${label}: legacy active roster`);
  assert.equal(projection.enhancements.length,0,`${label}: structured active resolutions`);
  assert.equal(projection.context.enhancements.length,1,`${label}: raw assignment remains visible`);
  assert.equal(projection.context.enhancements[0].active,false,`${label}: inactive diagnostic`);
  assert.ok(projection.roster.warnings.length,`${label}: warning preserved`);
  for(const game of projection.game.units)assert.equal(enhancementEffects(game).length,0,`${label}: forbidden active effect`);
  return projection;
}
export function runHandoffQa(overrides={}){
  let controls=0;
  for(const [book,id] of Object.entries(anchors)){
    const runtime=loadBook(book,overrides),roster={faction:runtime.catalog.book.title,units:[rawUnit(runtime.catalog,id)],detachments:[],enhancements:[]},projection=runtime.project(roster);
    const profile=projection.context.units[0].keywordProfile;
    assert.ok(profile.intrinsic.length,`${book}: intrinsic anchor`);
    assert.deepEqual(plain(projection.game.units[0].effective.keywords),plain(profile.effective),`${book}: normalized handoff`);
    controls++;
  }
  const sm=loadBook('space-marines',overrides),unit=rawUnit(sm.catalog,anchors['space-marines']);
  for(const [label,profile,expected,state] of [
    ['added-removed',{intrinsic:['INFANTRY','TACTICUS'],added:['BATTLELINE'],removed:['TACTICUS'],state:'known'},['INFANTRY','BATTLELINE'],'known'],
    ['explicit-effective',{intrinsic:['INFANTRY','TACTICUS'],added:['BATTLELINE'],removed:['TACTICUS'],effective:['INFANTRY'],state:'known'},['INFANTRY'],'known'],
    ['explicit-empty',{intrinsic:['INFANTRY'],effective:[],state:'known'},[],'known'],
    ['unknown',{intrinsic:['INFANTRY'],state:'unknown'},[],'unknown']
  ]){
    const projection=sm.api.project({catalog:sm.catalog,roster:{units:[unit,{...unit,id:'physical-2'}],enhancements:[]},provider:{keywordProfile({raw},base){return raw.id==='physical-1'?profile:base;}}});
    assert.deepEqual(plain(projection.game.units[0].effective.keywords),expected,`${label}: effective handoff`);
    assert.deepEqual(plain(projection.context.units[0].keywordProfile.effective),expected,`${label}: public context`);
    assert.equal(projection.game.units[0].rosterState.keywordProfile.state,state,`${label}: state`);
    assert.deepEqual(plain(projection.game.units[1].effective.keywords),plain(sm.catalog.units.find(item=>item.id===unit.canonicalUnitId).intrinsicKeywords),`${label}: physical copy isolation`);
    controls++;
  }
  const pedro=sm.project({units:[rawUnit(sm.catalog,'unit-pedro-kantor')],enhancements:[],detachments:[]}).game.units[0];
  assert.ok(pedro.effective.keywords.some(k=>k.toUpperCase()==='CRIMSON FISTS'),'Pedro intrinsic identity');
  assert.equal(pedro.effective.keywords.some(k=>k.toUpperCase()==='IMPERIAL FISTS'),false,'Pedro compatibility is not intrinsic');
  const dg=loadBook('death-guard',overrides),furnace='enhancement-furnace-of-plagues';
  inactive(dg,fixture(dg,'unit-mortarion',furnace),'Mortarion Furnace');
  const csm=loadBook('chaos-space-marines',overrides),wrongDetachment=csm.catalog.detachments.find(item=>item.id!=='creations-of-bile').id;
  inactive(csm,fixture(csm,'unit-chaos-lord','enhancement-living-carapace',{detachmentId:wrongDetachment}),'wrong-detachment Living Carapace');
  const am=loadBook('adeptus-mechanicus',overrides);
  inactive(am,fixture(am,'unit-tech-priest-dominus','enhancement-clandestine-infiltrator'),'invalid SKITARII restriction');
  const legal=fixture(dg,'unit-lord-of-contagion',furnace,{duplicateUnit:true}),base=dg.project({...legal,enhancements:[]}),valid=dg.project(legal);
  assert.equal(valid.enhancementAssessment.assignments[0].assessment.ownerEligibility,'valid','legal Furnace assessment');
  assert.ok(enhancementEffects(valid.game.units[0]).length,'legal Furnace effects retained');
  assert.equal(enhancementEffects(valid.game.units[1]).length,0,'legal Furnace wrong physical copy');
  const attacks=valid.game.units[0].effects.find(e=>e.id==='furnace-attacks');
  assert.ok(attacks?.targets.length,'legal Furnace numeric targets');
  for(const target of attacks.targets)assert.equal(Number(target.effective),Number(target.base)+1,'legal Furnace A+1');
  assert.deepEqual(plain(valid.game.units[1].effective.weaponProfiles),plain(base.game.units[1].effective.weaponProfiles),'unassigned copy profiles unchanged');
  assert.equal(valid.game.units[0].identity.instanceId,'physical-1');assert.equal(valid.game.units[1].identity.instanceId,'physical-2');
  for(const modifier of [entry=>({...entry,ownerStatus:'unresolved'}),entry=>({...entry,ownerUnitId:'missing-owner',ownerStatus:'resolved'})])inactive(dg,{...legal,enhancements:legal.enhancements.map(modifier)},'unresolved physical owner');
  const duplicate={...legal,enhancements:[legal.enhancements[0],{...legal.enhancements[0],ownerUnitId:'physical-2'}]},duplicateProjection=dg.project(duplicate);
  assert.equal(duplicateProjection.enhancementAssessment.assignments[1].assessment.ownerEligibility,'invalid','assignment limit');
  assert.equal(enhancementEffects(duplicateProjection.game.units[1]).length,0,'limit may not activate other owner');
  const repeated=dg.project({...legal,enhancements:[legal.enhancements[0],{...legal.enhancements[0]}]});
  assert.equal(repeated.roster.enhancements.length,1,'duplicate assignment occurrence filtered');
  assert.equal(repeated.context.enhancements.length,2,'duplicate raw diagnostics retained');
  const ec=loadBook('emperors-children',overrides),rawSourceUnverifiedEntry=ec.scope.WH_POINTS_CATALOG["emperor s children"].enhancements['exalted patron'];
  assert.deepEqual([...rawSourceUnverifiedEntry.owner.selector.unitIds],['unit-lord-exultant'],'raw fixture uses the resolved canonical bearer contract');
  rawSourceUnverifiedEntry.sourceLimited=true; // TEMP VM coverage warning, not a legality decision.
  assert.equal(rawSourceUnverifiedEntry.sourceLimited,true,'raw fixture carries an independent source-coverage warning');
  assert.equal(ec.catalog.enhancements.some(item=>item.id==='enhancement-exalted-patron'),false,'points identity must not be fabricated in the book catalog');
  const sourceLimited={faction:ec.catalog.book.title,units:[rawUnit(ec.catalog,'unit-daemon-prince-of-slaanesh')],detachments:[{name:rawSourceUnverifiedEntry.detachment}],enhancements:[{name:rawSourceUnverifiedEntry.title,ownerUnitId:'physical-1',ownerStatus:'resolved',source:'inline'}],warnings:[]};
  assert.equal(Object.hasOwn(sourceLimited.enhancements[0],'id'),false,'raw/source-unverified assignment has no fabricated canonical id');
  inactive(ec,sourceLimited,'source-limited wrong bearer','invalid');
  const unknown=dg.project({...legal,enhancements:[{name:'Missing QA enhancement',ownerStatus:'resolved',ownerUnitId:'physical-1'},legal.enhancements[0]]});
  assert.equal(unknown.roster.enhancements.length,1,'raw occurrence alignment after unknown enhancement');
  assert.equal(unknown.roster.enhancements[0],legal.enhancements[0],'preserve original assignment object and id');
  const oldPoints=dg.scope.WHRosterPoints.check(legal,'death guard'),activePoints=dg.scope.WHRosterPoints.check({...legal,enhancements:[]},'death guard');
  assert.equal(oldPoints.total-activePoints.total,25,'no price arithmetic change');
  assert.equal(dg.scope.WHRosterPoints.check(duplicate,'death guard').total-activePoints.total,50,'invalid occurrence still priced');
  vm.runInContext('delete window.WHRosterPoints',dg.scope);
  const unavailable=dg.project(legal);
  assert.equal(unavailable.roster.enhancements.length,0,'missing assessment must fail closed');
  assert.equal(unavailable.enhancementAssessment.available,false,'missing assessment distinct from invalid');
  assert.equal(unavailable.context.enhancements[0].ownerEligibility,'unavailable');
  return {controls:controls+18};
}

function mutation(source,old,replacement){assert.ok(source.includes(old),`mutation anchor ${old}`);return source.replace(old,replacement);}
function runMutations(){
  const source=read(contextPath),cases=[
    ['M1',mutation(source,'keywordProfile:keywordProfile(providerProfile)','keywordProfile:providerProfile'),/normalized handoff/],
    ['M2',mutation(source,'keywordState=new Set(list(draft.rosterState.keywordProfile.effective))','keywordState=new Set(list(draft.item.catalogUnit.intrinsicKeywords))'),/effective handoff/],
    ['M3',mutation(source,'enhancements:activeEnhancements,provider:options.provider','enhancements:resolvedEnhancements,provider:options.provider'),/wrong-detachment Living Carapace: forbidden active effect/],
    ['M4',mutation(source,'enhancements:rawEnhancements.filter((item,ordinal)=>activeOrdinals.has(ordinal))','enhancements:rawEnhancements'),/Mortarion Furnace: legacy active roster|Mortarion Furnace: forbidden active effect/],
    ['M5',mutation(source,'enhancements:rawEnhancements.filter((item,ordinal)=>activeOrdinals.has(ordinal))','enhancements:rawEnhancements.filter((item,ordinal)=>activeOrdinals.has(ordinal)).map(item=>({...item,ownerUnitId:rawUnits[1]?.id||item.ownerUnitId}))'),/legal Furnace effects retained|legal Furnace wrong physical copy/]
  ];
  for(const [id,mutant,expected] of cases){let failure;try{runHandoffQa({[contextPath]:mutant});}catch(error){failure=error;}assert.ok(failure instanceof assert.AssertionError,`${id}: must fail an assertion, not crash or survive`);assert.match(failure.message,expected,`${id}: intended oracle`);console.log(`${id}: KILLED (${failure.message.split('\n')[0]})`);}
  runHandoffQa();console.log('Restored focused QA: PASS');
}

async function runBrowser(){
  const {chromium}=await import('playwright');
  const types={'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
  const server=createServer((req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));assert.ok(file.startsWith(root+path.sep));if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);}catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'chrome',headless:true}),origin=`http://127.0.0.1:${server.address().port}`;
  const errors=[];
  const open=async(book,id,roster,instance='physical-1')=>{
    const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),record={id:'ra02-browser',roster};
    await context.addInitScript(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),record);
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${origin}/books/${book}/reader.html?view=mobile&roster=${record.id}&rosterInstance=${instance}#${id}`);
    await page.waitForFunction(id=>document.querySelector(`.unit-card[data-roster-instance="${id}"].roster-game-view`),instance);
    const state=await page.evaluate(id=>({context:WH_ARMY_ROSTER_CONTEXT.units.find(u=>u.instanceId===id),game:WH_ARMY_ROSTER_GAME_PROJECTION.units.find(u=>u.identity.instanceId===id),active:WH_ARMY_ROSTER_PROJECTION.roster.enhancements,raw:WH_ARMY_ROSTER_PROJECTION.sourceRoster.enhancements,warnings:WH_ARMY_ROSTER_PROJECTION.roster.warnings,visible:document.querySelector('.unit-card.roster-game-view').innerText,keywords:[...document.querySelectorAll('.unit-card.roster-game-view [id$="-keywords"] .keyword-list > *')].filter(n=>!n.hidden).map(n=>n.textContent.trim()),saved:JSON.parse(localStorage.getItem('wh40k-rosters-v1'))[0]}),instance);
    await context.close();return state;
  };
  try{
    for(const [book,id] of Object.entries(anchors)){
      const runtime=loadBook(book),roster={faction:runtime.catalog.book.title,units:[rawUnit(runtime.catalog,id)],detachments:[],enhancements:[]},state=await open(book,id,roster);
      assert.deepEqual(state.game.effective.keywords,state.context.keywordProfile.effective,`${book}: browser normalized keywords`);
      if(state.keywords.length)assert.ok(state.keywords.some(k=>k.toUpperCase()==='INFANTRY'),`${book}: visible intrinsic keyword`);
    }
    const am=loadBook('adeptus-mechanicus'),datasmith=rawUnit(am.catalog,'unit-cybernetica-datasmith');
    const removed=await open('adeptus-mechanicus',datasmith.canonicalUnitId,{faction:am.catalog.book.title,units:[datasmith],detachments:[],enhancements:[]});
    assert.ok(removed.game.effective.keywords.some(k=>k.toUpperCase()==='INFANTRY'),'real Data-severed addition');
    assert.equal(removed.game.effective.keywords.some(k=>k.toUpperCase()==='VEHICLE'),false,'real Data-severed removal');
    assert.equal(removed.keywords.some(k=>k.toUpperCase()==='VEHICLE'),false,'removed keyword not visible');
    const dg=loadBook('death-guard'),furnace='enhancement-furnace-of-plagues',invalid=fixture(dg,'unit-mortarion',furnace),bad=await open('death-guard','unit-mortarion',invalid);
    assert.equal(enhancementEffects(bad.game).length,0,'browser invalid Furnace effects');
    assert.equal(bad.game.effective.weaponProfiles.find(p=>p.id==='mortarion-weapon-silence-strike').values.A,'5','browser invalid Furnace A unchanged');
    assert.match(bad.visible,/inactive: Epic Hero cannot receive this Enhancement/,'visible rejection warning');
    assert.equal(bad.raw.length,1);assert.equal(bad.active.length,0);assert.deepEqual(bad.saved.roster,invalid,'raw stored roster preserved');
    const legal=fixture(dg,'unit-lord-of-contagion',furnace,{duplicateUnit:true});
    const owner=await open('death-guard','unit-lord-of-contagion',legal),other=await open('death-guard','unit-lord-of-contagion',legal,'physical-2');
    assert.ok(owner.game.effects.some(e=>e.id==='furnace-attacks'&&e.targets.length),'visible legal Furnace numeric effect');
    assert.equal(enhancementEffects(other.game).length,0,'browser second physical copy not enhanced');
    assert.notEqual(owner.game.identity.instanceId,other.game.identity.instanceId);
    assert.equal(errors.length,0,`browser application exceptions: ${errors.join('; ')}`);
    console.log('RA02 browser: PASS (8 no-effect anchors, real removed keyword, valid/invalid Furnace, two physical copies, warnings and unchanged storage)');
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  if(process.argv.includes('--mutations'))runMutations();
  else if(process.argv.includes('--browser'))await runBrowser();
  else console.log('RA02 handoff QA: PASS',runHandoffQa());
}
