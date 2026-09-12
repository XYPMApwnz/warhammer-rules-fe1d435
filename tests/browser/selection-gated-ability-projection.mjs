import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const bookIds=['death-guard','adeptus-mechanicus','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const loadCatalog=book=>{const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,`books/${book}/scripts/roster-data.js`),'utf8'),context);return context.window.WH_BOOK_ROSTER_CATALOG;};
const catalogs=new Map(bookIds.map(book=>[book,loadCatalog(book)]));
const dgCases=[
  ['unit-plague-marines','plague-marines-ability-icon-of-despair-aura'],
  ['unit-deathshroud-terminators','deathshroud-terminators-ability-icon-of-despair-aura'],
  ['unit-plaguebearers','plaguebearers-ability-instrument-of-chaos'],
  ['unit-plaguebearers','plaguebearers-ability-daemonic-icon'],
  ['unit-plague-drones','plague-drones-ability-daemonic-icon'],
  ['unit-plague-drones','plague-drones-ability-instrument-of-chaos'],
];
const cases=[];
for(const book of bookIds){
  const catalog=catalogs.get(book);
  const requested=book==='death-guard'?dgCases:[catalog.units.flatMap(unit=>(unit.gameSelections?.wargearAbilities||[]).map(ability=>[unit.id,ability.id]))[0]];
  for(const [unitId,abilityId] of requested){
    const unit=catalog.units.find(item=>item.id===unitId),ability=unit?.gameSelections?.wargearAbilities.find(item=>item.id===abilityId),selection=unit?.gameSelections?.selections.find(item=>ability?.requiredSelectionIds?.includes(item.id));
    assert.ok(unit&&ability&&selection,`${book}/${unitId}/${abilityId}: exact canonical browser case`);
    cases.push({book,catalog,unit,ability,selection});
  }
}

const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.mjs':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer((request,response)=>{const relative=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname).replace(/^\/+/, '')||'index.html',file=path.resolve(root,relative);if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await launchChromium();
const visible=node=>Boolean(node&&!node.hidden&&getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden'&&Number(getComputedStyle(node).opacity)!==0&&node.getBoundingClientRect().height>0);
const open=async(testCase,selected)=>{
  const instanceId='selection-gated-unit',modelTitle=testCase.unit.gameSelections.models?.[0]?.title||testCase.unit.title,rawUnit={id:instanceId,canonicalUnitId:testCase.unit.id,name:testCase.unit.title,quantity:1,models:selected?[{name:modelTitle,quantity:1,wargear:testCase.selection.title}]:[]},saved={id:`selection-gated-${testCase.book}-${selected?'selected':'unselected'}-${testCase.ability.id}`,roster:{faction:testCase.catalog.book.title,units:[rawUnit],detachments:[],enhancements:[],warnings:[]},attachments:{}};
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),errors=[];
  context.on('page',page=>page.on('pageerror',error=>errors.push(error.message)));
  await context.addInitScript(value=>{if(location.protocol==='http:'||location.protocol==='https:')localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value]));},saved);
  const page=await context.newPage();
  await page.goto(`${origin}/books/${testCase.book}/reader.html?view=mobile&roster=${encodeURIComponent(saved.id)}&rosterInstance=${instanceId}#${testCase.unit.id}`,{waitUntil:'networkidle'});
  await page.waitForFunction(id=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===id)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${id}"]`),instanceId);
  const state=await page.evaluate(({instanceId,abilityId})=>{const gameUnit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(unit=>unit.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${instanceId}"]`),nodes=[...card.querySelectorAll('.ability')].filter(node=>(node.dataset.rosterWargearAbilityId||node.id)===abilityId),shown=nodes.filter(node=>Boolean(node&&!node.hidden&&getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden'&&Number(getComputedStyle(node).opacity)!==0&&node.getBoundingClientRect().height>0));return{selected:[...gameUnit.selection.loadout.selectedWargearAbilityIds],wargearState:gameUnit.selection.loadout.wargearResolution.state,effective:gameUnit.effective.abilities.some(item=>item.id===abilityId),references:gameUnit.effects.filter(effect=>effect.canonicalReference?.id===abilityId).length,nodeCount:nodes.length,visibleCount:shown.length,nested:nodes.every(node=>node.closest('[id$="-wargear-abilities"]'))};},{instanceId,abilityId:testCase.ability.id});
  return {context,page,state,errors};
};

try{
  let selectedPass=0,unselectedPass=0,articleMutation=false,visibilityMutation=false;
  for(const testCase of cases){
    const unselected=await open(testCase,false);
    assert.deepEqual(unselected.errors,[],`${testCase.book}/${testCase.ability.id}: unselected page errors`);
    assert.equal(unselected.state.effective,false,`${testCase.book}/${testCase.ability.id}: unselected runtime inactive`);
    assert.equal(unselected.state.nodeCount,1,`${testCase.book}/${testCase.ability.id}: one canonical article`);
    assert.equal(unselected.state.visibleCount,0,`${testCase.book}/${testCase.ability.id}: unselected article hidden`);
    assert.equal(unselected.state.nested,true,`${testCase.book}/${testCase.ability.id}: gated section ownership`);
    if(!visibilityMutation&&testCase.ability.id==='plaguebearers-ability-instrument-of-chaos'){
      const mutated=await unselected.page.evaluate(abilityId=>{const node=[...document.querySelectorAll('.ability')].find(item=>(item.dataset.rosterWargearAbilityId||item.id)===abilityId),card=document.querySelector('.unit-card.roster-game-view');node.hidden=false;node.style.setProperty('display','block','important');node.style.visibility='visible';node.style.opacity='1';card.append(node);return Boolean(node&&!node.hidden&&getComputedStyle(node).display!=='none'&&node.getBoundingClientRect().height>0);},testCase.ability.id);
      assert.throws(()=>assert.equal(mutated,false),undefined,'UNSELECTED_VISIBILITY_MUTATION must be killed');
      visibilityMutation=true;
      console.log('UNSELECTED_VISIBILITY_MUTATION: KILLED');
    }
    await unselected.context.close();unselectedPass+=1;

    const selected=await open(testCase,true);
    assert.deepEqual(selected.errors,[],`${testCase.book}/${testCase.ability.id}: selected page errors`);
    assert.equal(selected.state.wargearState,'resolved',`${testCase.book}/${testCase.ability.id}: exact selection resolved`);
    assert.ok(selected.state.selected.includes(testCase.ability.id),`${testCase.book}/${testCase.ability.id}: canonical ability selected`);
    assert.equal(selected.state.nodeCount,1,`${testCase.book}/${testCase.ability.id}: one selected canonical article`);
    assert.equal(selected.state.visibleCount,1,`${testCase.book}/${testCase.ability.id}: selected article visible exactly once`);
    assert.equal(selected.state.nested,true,`${testCase.book}/${testCase.ability.id}: selected gated section ownership`);
    if(testCase.ability.id==='plaguebearers-ability-instrument-of-chaos')assert.ok(selected.state.effective||selected.state.references>0,'selected Instrument is effective or canonically referenced');
    if(!articleMutation&&testCase.ability.id==='plaguebearers-ability-instrument-of-chaos'){
      const mutated=await selected.page.evaluate(abilityId=>{const node=[...document.querySelectorAll('.ability')].find(item=>(item.dataset.rosterWargearAbilityId||item.id)===abilityId);document.querySelector('.unit-card.roster-game-view').append(node);return Boolean(node.closest('[id$="-wargear-abilities"]'));},testCase.ability.id);
      assert.throws(()=>assert.equal(mutated,true),undefined,'ARTICLE_OUTSIDE_GATED_SECTION_MUTATION must be killed');
      articleMutation=true;
      console.log('ARTICLE_OUTSIDE_GATED_SECTION_MUTATION: KILLED');
    }
    await selected.context.close();selectedPass+=1;
  }
  assert.equal(articleMutation,true);
  assert.equal(visibilityMutation,true);
  console.log(`Selection-gated browser QA: ${cases.length} cases; unselected ${unselectedPass}; selected ${selectedPass}; PASS`);
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
