import {launchChromium} from './helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import fs from 'node:fs';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=new Map([
  ['emperors-children','enhancement-distortion'],
  ['tyranids','enhancement-adaptive-biology'],
  ['chaos-space-marines','enhancement-touched-by-the-warp'],
  ['space-marines','firestorm-assault-force-war-tempered-artifice'],
  ['dark-angels','enhancement-weapons-of-the-first-legion'],
  ['blood-angels','enhancement-archangels-shard']
]);
const registrySource=fs.readFileSync(path.join(root,'books/shared/book-roster-enhancements.js'),'utf8');
const providerSource=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
const components=new Set();
let conditionalCount=0;
const fixtures=new Map();
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const ownerEligible=(unit,selector={})=>{
  const keywords=new Set((unit.intrinsicKeywords||[]).map(normalize)),abilities=new Set((unit.gameSelections?.abilities||[]).map(item=>normalize(item.id)));
  if((selector.unitIds||[]).length&&!selector.unitIds.includes(unit.id))return false;
  if((selector.allKeywords||[]).some(keyword=>!keywords.has(normalize(keyword))))return false;
  if((selector.anyKeywords||[]).length&&!selector.anyKeywords.some(keyword=>keywords.has(normalize(keyword))))return false;
  if((selector.noneKeywords||[]).some(keyword=>keywords.has(normalize(keyword))))return false;
  if((selector.allAbilities||[]).some(ability=>!abilities.has(normalize(ability))))return false;
  return true;
};

const loadBook=bookId=>{
  const scope={
    console,
    URL,
    URLSearchParams,
    location:{pathname:`/books/${bookId}/reader.html`},
    document:{documentElement:{dataset:{bookId}}}
  };
  scope.window=scope;
  scope.globalThis=scope;
  vm.runInNewContext(fs.readFileSync(path.join(root,`books/${bookId}/scripts/roster-data.js`),'utf8'),scope,{filename:`${bookId}/roster-data.js`});
  vm.runInNewContext(registrySource,scope,{filename:'book-roster-enhancements.js'});
  vm.runInNewContext(providerSource,scope,{filename:'book-roster-enhancement-providers.js'});
  return {api:scope.WHBookRosterEnhancements,catalog:scope.WH_BOOK_ROSTER_CATALOG};
};

for(const [bookId,requiredEnhancementId] of books){
  const {api,catalog}=loadBook(bookId);
  const structuredIds=new Set();
  for(const enhancement of catalog.enhancements){
    const ownerId=`${bookId}-physical-owner`;
    const selector=enhancement.owner?.selector,ownerUnit=(selector?catalog.units.find(candidate=>ownerEligible(candidate,selector)):null)||catalog.units.find(candidate=>candidate.intrinsicKeywords.some(keyword=>keyword.toLowerCase()==='character'))||catalog.units[0];
    const item={
      instanceId:ownerId,
      unitId:ownerUnit.id,
      raw:{id:ownerId}
    };
    const resolved={
      catalog:enhancement,
      input:{ownerStatus:'resolved',ownerUnitId:ownerId},
      owner:{status:'resolved',instanceId:ownerId}
    };
    const keywords=ownerUnit.intrinsicKeywords||[];
    const gameUnit={identity:{instanceId:ownerId,canonicalDatasheetId:ownerUnit.id},rosterState:{detachments:[enhancement.detachmentId],keywordProfile:{intrinsic:keywords,added:[],removed:[],effective:keywords}},selection:{loadout:{selectedWargearAbilityIds:[]}},item:{catalogUnit:ownerUnit}};
    const effects=api.gameEffects({item,gameUnit,gameUnits:[gameUnit],byInstance:new Map([[ownerId,gameUnit]]),enhancements:[resolved]}).filter(effect=>effect.source?.kind==='enhancement');
    if(!effects.length)continue;
    structuredIds.add(enhancement.id);
    for(const effect of effects){
      assert.equal(effect.source?.ownerInstanceId,ownerId,`${bookId}/${enhancement.id}: exact source owner`);
      assert.ok([enhancement.id,enhancement.ruleId,enhancement.sourceId].filter(Boolean).includes(effect.source?.id),`${bookId}/${enhancement.id}: canonical source`);
      assert.equal(effect.provenance?.rosterFact,'enhancement-owner',`${bookId}/${enhancement.id}: provenance`);
      assert.ok(effect.component||effect.kind,`${bookId}/${enhancement.id}: effect class`);
      assert.ok(effect.operation,`${bookId}/${enhancement.id}: operation`);
      components.add(effect.component||effect.kind);
      if(effect.condition){
        conditionalCount+=1;
        assert.equal(effect.state,'conditional',`${bookId}/${enhancement.id}: conditional state`);
        assert.equal(effect.certainty,'unknown',`${bookId}/${enhancement.id}: conditional certainty`);
      }
    }

    const otherId=`${bookId}-physical-other`;
    const otherItem={...item,instanceId:otherId,raw:{id:otherId}},otherGameUnit={...gameUnit,identity:{...gameUnit.identity,instanceId:otherId}};
    const other=api.gameEffects({item:otherItem,gameUnit:otherGameUnit,gameUnits:[otherGameUnit],byInstance:new Map([[otherId,otherGameUnit]]),enhancements:[resolved]}).filter(effect=>effect.source?.kind==='enhancement');
    assert.equal(other.length,0,`${bookId}/${enhancement.id}: bearer effect leaked to another physical instance`);
    const unresolved=api.gameEffects({item,gameUnit,gameUnits:[gameUnit],byInstance:new Map([[ownerId,gameUnit]]),enhancements:[{...resolved,input:{ownerStatus:'unresolved',ownerUnitId:ownerId},owner:{status:'unresolved',instanceId:ownerId}}]}).filter(effect=>effect.source?.kind==='enhancement');
    assert.equal(unresolved.length,0,`${bookId}/${enhancement.id}: unresolved owner produced a factual effect`);
    if(enhancement.id===requiredEnhancementId){
      const detachment=catalog.detachments.find(candidate=>candidate.id===enhancement.detachmentId);
      fixtures.set(bookId,{catalog,unit:ownerUnit,enhancement,detachment,effects});
    }
  }
  assert.ok(structuredIds.has(requiredEnhancementId),`${bookId}: required stable Enhancement provider ${requiredEnhancementId}`);
  assert.ok(fixtures.has(bookId),`${bookId}: browser fixture for required stable Enhancement`);
  console.log(`PASS  ${bookId}: ${structuredIds.size} canonical Enhancements emit structured effects; stable anchor ${requiredEnhancementId}`);
}
assert.deepEqual([...components].sort(),['ability','keyword','stat','weapon'],'structured component families');
assert.ok(conditionalCount>0,'conditional game-state effects are absent');

const detachmentFixture=(bookId,unitId,instanceId,detachments,gameUnits=null)=>{
  const {api,catalog}=loadBook(bookId),unit=catalog.units.find(candidate=>candidate.id===unitId);
  assert.ok(unit,`${bookId}: missing ${unitId}`);
  const keywords=unit.intrinsicKeywords||[],item={instanceId,unitId,raw:{id:instanceId}},gameUnit={identity:{instanceId,canonicalDatasheetId:unit.id},rosterState:{detachments,keywordProfile:{intrinsic:keywords,added:[],removed:[],effective:keywords}},selection:{loadout:{selectedWargearAbilityIds:[]}},item:{catalogUnit:unit}};
  const allUnits=gameUnits||[gameUnit];
  return{api,catalog,item,gameUnit,effects:api.gameEffects({item,gameUnit,gameUnits:allUnits,byInstance:new Map(allUnits.map(entry=>[entry.identity.instanceId,entry])),enhancements:[]})};
};
const masterRuleId='emperors-children-detachment-rule-master-of-the-pageant';
const masterReferences=fixture=>fixture.effects.filter(effect=>effect.canonicalReference?.kind==='detachment-rule'&&effect.canonicalReference.id===masterRuleId);
const fulgrimA=detachmentFixture('emperors-children','unit-fulgrim','ec-fulgrim-a',['court-of-the-phoenician']);
assert.equal(masterReferences(fulgrimA).length,1,'Master of the Pageant must emit exactly once for physical Fulgrim');
assert.deepEqual(
  JSON.parse(JSON.stringify(masterReferences(fulgrimA).map(effect=>({component:effect.component,targetId:effect.targetId,operation:effect.operation,state:effect.state,sourceKind:effect.source?.kind,sourceId:effect.source?.id,owner:effect.source?.ownerInstanceId,rosterFact:effect.provenance?.rosterFact})))),
  [{component:'ability',targetId:masterRuleId,operation:'reference',state:'reference',sourceKind:'detachment',sourceId:'court-of-the-phoenician',owner:null,rosterFact:'detachment-rule-reference'}],
  'Master of the Pageant must remain a reference-only effect'
);
assert.equal(fulgrimA.effects.length,1,'Master of the Pageant must not add automatic mutations');
assert.equal(masterReferences(detachmentFixture('emperors-children','unit-fulgrim','ec-fulgrim-other',['rapid-evisceration'])).length,0,'Master of the Pageant leaked to another EC Detachment');
assert.equal(masterReferences(detachmentFixture('emperors-children','unit-seekers','ec-non-fulgrim',['court-of-the-phoenician'])).length,0,'Master of the Pageant leaked to a non-Fulgrim unit');
assert.equal(masterReferences(detachmentFixture('chaos-space-marines','unit-chaos-lord','csm-wrong-faction',['court-of-the-phoenician'])).length,0,'Master of the Pageant leaked cross-faction');
for(const instanceId of ['ec-fulgrim-copy-1','ec-fulgrim-copy-2'])assert.equal(masterReferences(detachmentFixture('emperors-children','unit-fulgrim',instanceId,['court-of-the-phoenician'])).length,1,`Master of the Pageant physical isolation ${instanceId}`);
for(const bookId of ['space-marines','dark-angels','blood-angels']){
  const nowhere=detachmentFixture(bookId,'unit-scout-squad',`${bookId}-scout`,['subversion-assets']).effects.filter(effect=>effect.canonicalReference?.kind==='detachment-rule');
  assert.deepEqual(Array.from(nowhere,effect=>effect.canonicalReference.id),['subversion-assets-nowhere-to-hide'],`${bookId}: Nowhere to Hide reference regression`);
}

const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await launchChromium();
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    let browserPresented=0;
    for(const [bookId,{catalog,unit,enhancement,detachment}] of fixtures){
      const rosterId=`synergy-${bookId}`,instanceId=`${bookId}-effect-owner`,selection=unit.gameSelections.selections.find(item=>item.kind==='weapon'&&item.profileIds.length),record={id:rosterId,roster:{faction:catalog.book.title,detachments:detachment?[{name:detachment.title}]:[],units:[{id:instanceId,name:unit.title,points:100,models:[{quantity:1,name:unit.gameSelections.models[0]?.title||unit.title,loadouts:selection?[{quantity:1,wargear:selection.title}]:[]}]}],enhancements:[{id:enhancement.id,name:enhancement.title,ownerUnitId:instanceId,ownerStatus:'resolved'}],warnings:[]}};
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile#start`);
      await page.evaluate(record=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record])),record);
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile&roster=${rosterId}#${unit.id}`);
      try{await page.waitForFunction(id=>document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(id)}"]`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instanceId);}catch(error){throw new Error(`${bookId}: projection timeout; ${errors.join(' | ')||'no browser error captured'}`,{cause:error});}
      const state=await page.evaluate(({instanceId,title})=>{const projection=window.WH_ARMY_ROSTER_GAME_PROJECTION,gameUnit=projection.units.find(item=>item.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(instanceId)}"]`);return{effects:gameUnit.effects.map(effect=>({kind:effect.source?.kind,owner:effect.source?.ownerInstanceId,state:effect.state,certainty:effect.certainty,condition:effect.condition||null,targets:effect.targets||[]})),text:card.querySelector('.roster-game-effects')?.innerText||'',cardText:card.innerText,changes:card.querySelectorAll('.roster-game-change,.roster-modified,.roster-game-derived-ability,.roster-game-effects li').length,units:document.querySelectorAll('.document .unit-card').length,overflow:document.documentElement.scrollWidth>innerWidth,title};},{instanceId,title:enhancement.title});
      const enhancementEffects=state.effects.filter(effect=>effect.kind==='enhancement');
      assert.ok(enhancementEffects.length>0,`${bookId}: structured projection ${JSON.stringify(state)}`);
      assert.ok(enhancementEffects.every(effect=>effect.owner===instanceId),`${bookId}: exact source owner`);
      const titlePattern=new RegExp(enhancement.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),presented=titlePattern.test(state.text),onlyUnknownConditional=enhancementEffects.every(effect=>effect.state==='conditional'&&effect.certainty==='unknown');
      if(presented){browserPresented+=1;assert.ok(state.changes>0,`${bookId}: dynamic roster presentation`);}
      if(onlyUnknownConditional)assert.doesNotMatch(state.text,titlePattern,`${bookId}: conditional effect presented as active ${JSON.stringify(enhancementEffects)}`);
      assert.match(state.cardText,titlePattern,`${bookId}: selected Enhancement presentation`);
      assert.equal(state.units,1,`${bookId}: PHONE-1 invariant`);
      assert.equal(state.overflow,false,`${bookId}: horizontal overflow`);
      for(const effect of enhancementEffects.filter(item=>item.condition)){
        assert.equal(effect.state,'conditional',`${bookId}: conditional state`);
        assert.equal(effect.certainty,'unknown',`${bookId}: conditional certainty`);
        assert.ok(effect.targets.every(target=>JSON.stringify(target.base)===JSON.stringify(target.effective)),`${bookId}: unknown condition auto-applied`);
      }
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile#${unit.id}`);
      await page.waitForFunction(()=>document.querySelector('.unit-card')&&window.DG_APP);
      const normal=await page.evaluate(()=>({game:document.querySelector('.unit-card')?.classList.contains('roster-game-view'),changes:document.querySelectorAll('.roster-game-change,.roster-modified,.roster-game-derived-ability').length}));
      assert.deepEqual(normal,{game:false,changes:0},`${bookId}: normal Datasheet changed`);
      console.log(`BROWSER ${bookId}: structured roster presentation PASS`);
    }
    const realRosterCase=async({bookId,faction,detachment='',unitTitle,unitId,points=100})=>{
      const rosterId=`real-provider-${bookId}-${unitId}-${detachment||'none'}`,sourceText=[`+ FACTION KEYWORD: ${faction}`,detachment?`+ DETACHMENT: ${detachment}`:'',`+ TOTAL ARMY POINTS: ${points}pts`,'',`Char1: 1x ${unitTitle} (${points} pts)`].filter(Boolean).join('\n'),record={id:rosterId,sourceText};
      await page.evaluate(value=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([value])),record);
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile&roster=${rosterId}&rosterInstance=parsed-unit-1#${unitId}`);
      await page.waitForFunction(({instanceId,unitId})=>window.WH_ARMY_ROSTER_GAME_PROJECTION?.units.some(unit=>unit.identity.instanceId===instanceId&&unit.identity.canonicalDatasheetId===unitId)&&document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(instanceId)}"]`),{instanceId:'parsed-unit-1',unitId});
      return page.evaluate(({instanceId,unitId})=>{const unit=window.WH_ARMY_ROSTER_GAME_PROJECTION.units.find(item=>item.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(instanceId)}"]`);return{identity:unit.identity,effects:unit.effects.map(effect=>({component:effect.component,targetId:effect.targetId,operation:effect.operation,state:effect.state,targetState:effect.targetState,canonicalReference:effect.canonicalReference,source:effect.source,provenance:effect.provenance,targets:effect.targets})),cardText:card.innerText,unitId};},{instanceId:'parsed-unit-1',unitId});
    };
    const masterReal=await realRosterCase({bookId:'emperors-children',faction:"Emperor's Children",detachment:'Court of the Phoenician',unitTitle:'Fulgrim',unitId:'unit-fulgrim',points:340}),masterRealReferences=masterReal.effects.filter(effect=>effect.canonicalReference?.id===masterRuleId);
    assert.equal(masterReal.identity.instanceId,'parsed-unit-1','Master of the Pageant real path physical instance');
    assert.equal(masterReal.identity.canonicalDatasheetId,'unit-fulgrim','Master of the Pageant real path canonical identity');
    assert.equal(masterRealReferences.length,1,'Master of the Pageant real production path reference');
    assert.deepEqual(JSON.parse(JSON.stringify(masterRealReferences.map(effect=>({component:effect.component,targetId:effect.targetId,operation:effect.operation,state:effect.state,targetState:effect.targetState,sourceKind:effect.source?.kind,sourceId:effect.source?.id,owner:effect.source?.ownerInstanceId,rosterFact:effect.provenance?.rosterFact,targets:effect.targets})))),[{component:'ability',targetId:masterRuleId,operation:'reference',state:'reference',targetState:'resolved',sourceKind:'detachment',sourceId:'court-of-the-phoenician',owner:null,rosterFact:'detachment-rule-reference',targets:[]}],'Master of the Pageant real path remains reference-only');
    assert.match(masterReal.cardText,/Master of the Pageant/i,'Master of the Pageant missing from physical Fulgrim presentation');
    const masterNonFulgrim=await realRosterCase({bookId:'emperors-children',faction:"Emperor's Children",detachment:'Court of the Phoenician',unitTitle:'Seekers',unitId:'unit-seekers'});
    assert.equal(masterNonFulgrim.effects.filter(effect=>effect.canonicalReference?.id===masterRuleId).length,0,'Master of the Pageant leaked to a real non-Fulgrim unit');
    const masterWrongDetachment=await realRosterCase({bookId:'emperors-children',faction:"Emperor's Children",detachment:'Rapid Evisceration',unitTitle:'Fulgrim',unitId:'unit-fulgrim',points:340});
    assert.equal(masterWrongDetachment.effects.filter(effect=>effect.canonicalReference?.id===masterRuleId).length,0,'Master of the Pageant leaked to a real wrong Detachment');
    const masterMissingDetachment=await realRosterCase({bookId:'emperors-children',faction:"Emperor's Children",unitTitle:'Fulgrim',unitId:'unit-fulgrim',points:340});
    assert.equal(masterMissingDetachment.effects.filter(effect=>effect.canonicalReference?.id===masterRuleId).length,0,'Master of the Pageant leaked without a Detachment');
    const masterWrongFaction=await realRosterCase({bookId:'chaos-space-marines',faction:'Chaos Space Marines',detachment:'Court of the Phoenician',unitTitle:'Chaos Lord',unitId:'unit-chaos-lord'});
    assert.equal(masterWrongFaction.effects.filter(effect=>effect.canonicalReference?.id===masterRuleId).length,0,'Master of the Pageant leaked through a real wrong-faction path');
    for(const [bookId,faction] of [['space-marines','Space Marines'],['dark-angels','Dark Angels'],['blood-angels','Blood Angels']]){
      const nowhere=await realRosterCase({bookId,faction,detachment:'Subversion Assets',unitTitle:'Scout Squad',unitId:'unit-scout-squad',points:70}),references=nowhere.effects.filter(effect=>effect.canonicalReference?.kind==='detachment-rule');
      assert.deepEqual(references.map(effect=>effect.canonicalReference.id),['subversion-assets-nowhere-to-hide'],`${bookId}: real-path Nowhere to Hide regression`);
    }
    assert.ok(browserPresented>0,'no structured Enhancement effect reached active browser presentation');
    assert.deepEqual(errors,[],'structured effect browser console errors');
  }finally{await context.close();}
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log("Structured roster effect provider/presentation QA: 6/6 PASS (T'au uses its book-local semantic provider).");
