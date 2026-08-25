import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import fs from 'node:fs';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=new Map([
  ['emperors-children',21],
  ['tyranids',23],
  ['chaos-space-marines',12],
  ['space-marines',12],
  ['dark-angels',35],
  ['blood-angels',11]
]);
const registrySource=fs.readFileSync(path.join(root,'books/shared/book-roster-enhancements.js'),'utf8');
const providerSource=fs.readFileSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js'),'utf8');
const components=new Set();
let conditionalCount=0;
const fixtures=new Map();

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

for(const [bookId,expected] of books){
  const {api,catalog}=loadBook(bookId);
  let structured=0;
  for(const enhancement of catalog.enhancements){
    const ownerId=`${bookId}-physical-owner`;
    const item={
      instanceId:ownerId,
      unitId:enhancement.ownerUnitIds?.[0]||catalog.units[0].id,
      raw:{id:ownerId}
    };
    const resolved={
      catalog:enhancement,
      input:{ownerStatus:'resolved',ownerUnitId:ownerId},
      owner:{status:'resolved',instanceId:ownerId}
    };
    const effects=api.gameEffects({item,enhancements:[resolved]});
    if(!effects.length)continue;
    structured+=1;
    for(const effect of effects){
      assert.equal(effect.source?.ownerInstanceId,ownerId,`${bookId}/${enhancement.id}: exact source owner`);
      assert.equal(effect.source?.id,enhancement.id,`${bookId}/${enhancement.id}: canonical source`);
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
    const other=api.gameEffects({item:{...item,instanceId:otherId,raw:{id:otherId}},enhancements:[resolved]});
    assert.equal(other.length,0,`${bookId}/${enhancement.id}: bearer effect leaked to another physical instance`);
    const unresolved=api.gameEffects({item,enhancements:[{...resolved,input:{ownerStatus:'unresolved',ownerUnitId:ownerId},owner:{status:'unresolved',instanceId:ownerId}}]});
    assert.equal(unresolved.length,0,`${bookId}/${enhancement.id}: unresolved owner produced a factual effect`);
    if(!fixtures.has(bookId)){
      const unit=catalog.units.find(candidate=>candidate.intrinsicKeywords.some(keyword=>keyword.toLowerCase()==='character'))||catalog.units[0];
      const detachment=catalog.detachments.find(candidate=>candidate.id===enhancement.detachmentId);
      fixtures.set(bookId,{catalog,unit,enhancement,detachment,effects});
    }
  }
  assert.equal(structured,expected,`${bookId}: current curated Enhancement coverage`);
  console.log(`PASS  ${bookId}: ${structured} canonical Enhancements emit structured effects`);
}
assert.deepEqual([...components].sort(),['ability','keyword','stat','weapon'],'structured component families');
assert.ok(conditionalCount>0,'conditional game-state effects are absent');

const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const [bookId,{catalog,unit,enhancement,detachment}] of fixtures){
      const rosterId=`synergy-${bookId}`,instanceId=`${bookId}-effect-owner`,record={id:rosterId,roster:{faction:catalog.book.title,detachments:detachment?[{name:detachment.title}]:[],units:[{id:instanceId,name:unit.title,points:100,models:[{quantity:1,name:unit.title,loadouts:[]}]}],enhancements:[{name:enhancement.title,ownerUnitId:instanceId,ownerStatus:'resolved'}],warnings:[]}};
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile#start`);
      await page.evaluate(record=>localStorage.setItem('wh40k-rosters-v1',JSON.stringify([record])),record);
      await page.goto(`${origin}/books/${bookId}/reader.html?view=mobile&roster=${rosterId}#${unit.id}`);
      try{await page.waitForFunction(id=>document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(id)}"]`)&&window.WH_ARMY_ROSTER_GAME_PROJECTION?.schema==='wh40k-physical-unit-game-projection/v1',instanceId);}catch(error){throw new Error(`${bookId}: projection timeout; ${errors.join(' | ')||'no browser error captured'}`,{cause:error});}
      const state=await page.evaluate(({instanceId,title})=>{const projection=window.WH_ARMY_ROSTER_GAME_PROJECTION,gameUnit=projection.units.find(item=>item.identity.instanceId===instanceId),card=document.querySelector(`.unit-card.roster-game-view[data-roster-instance="${CSS.escape(instanceId)}"]`);return{effects:gameUnit.effects.map(effect=>({owner:effect.source?.ownerInstanceId,state:effect.state,certainty:effect.certainty,condition:effect.condition||null,targets:effect.targets||[]})),text:card.querySelector('.roster-game-effects')?.innerText||'',cardText:card.innerText,changes:card.querySelectorAll('.roster-game-change,.roster-modified,.roster-game-derived-ability,.roster-game-effects li').length,units:document.querySelectorAll('.document .unit-card').length,overflow:document.documentElement.scrollWidth>innerWidth,title};},{instanceId,title:enhancement.title});
      assert.ok(state.effects.length>0,`${bookId}: structured projection`);
      assert.ok(state.effects.every(effect=>effect.owner===instanceId),`${bookId}: exact source owner`);
      const titlePattern=new RegExp(enhancement.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),hasCurrent=state.effects.some(effect=>(effect.state||'active')==='active'&&(effect.certainty||'current')==='current'&&effect.condition?.state!=='unknown');
      if(hasCurrent){assert.match(state.text,titlePattern,`${bookId}: applied provenance title`);assert.ok(state.changes>0,`${bookId}: dynamic roster presentation`);}else assert.doesNotMatch(state.text,titlePattern,`${bookId}: conditional effect presented as active`);
      assert.match(state.cardText,titlePattern,`${bookId}: selected Enhancement presentation`);
      assert.equal(state.units,1,`${bookId}: PHONE-1 invariant`);
      assert.equal(state.overflow,false,`${bookId}: horizontal overflow`);
      for(const effect of state.effects.filter(item=>item.condition)){
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
    assert.deepEqual(errors,[],'structured effect browser console errors');
  }finally{await context.close();}
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log("Structured roster effect provider/presentation QA: 6/6 PASS (T'au uses its book-local semantic provider).");
