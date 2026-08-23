import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const books=[
  ['Death Guard','death-guard','unit-mortarion'],['Adeptus Mechanicus','adeptus-mechanicus','unit-onager-dunecrawler'],["T'au Empire",'tau-empire','unit-commander-farsight'],
  ["Emperor's Children",'emperors-children','unit-fulgrim'],['Tyranids','tyranids','unit-deathleaper'],['Chaos Space Marines','chaos-space-marines','unit-abaddon-the-despoiler'],
  ['Space Marines','space-marines','unit-ballistus-dreadnought'],['Dark Angels','dark-angels','unit-azrael'],['Blood Angels','blood-angels','unit-astorath']
];
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if((await stat(file)).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');response.end(await readFile(file));}catch{response.statusCode=404;response.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({channel:'chrome',headless:true});

try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  try{
    for(const [name,book,unitId] of books){
      const page=await context.newPage(),errors=[],failed=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});page.on('requestfailed',request=>failed.push(request.url()));
      try{
        await page.goto(`${origin}/books/${book}/reader.html?view=mobile#${unitId}`);
        try{await page.waitForFunction(()=>Boolean(window.DG_APP?.navigation&&window.WHArmyBookTargetMount));}
        catch(error){const state=await page.evaluate(()=>({readyState:document.readyState,app:Boolean(window.DG_APP?.navigation),mount:Boolean(window.WHArmyBookTargetMount),unit:document.querySelector('.document .unit-card')?.id||'',scripts:[...document.scripts].map(script=>script.src)}));throw new Error(`${name}: app startup failed: ${JSON.stringify({state,errors,failed})}`,{cause:error});}
        await page.waitForFunction(id=>document.querySelector('.document .unit-card')?.id===id,unitId);
        const profileId=await page.evaluate(()=>{const unit=document.querySelector('.document .unit-card');return[...unit.querySelectorAll('.unit-part[id]')].find(section=>unit.querySelector(`[data-logical-owner="${CSS.escape(section.id)}"]`))?.id||'';});assert.ok(profileId,`${name}: logical Profile target missing`);
        if(book==='adeptus-mechanicus')assert.equal(await page.locator(`#${unitId} .unit-art-background img, #${unitId} .unit-art img`).count(),1,'AM: Onager artwork missing');
        await page.locator(`[data-journey-target="${profileId}"]`).click();await page.waitForFunction(id=>location.hash===`#${id}`&&document.querySelector('.logical-destination-highlight.destination-highlight'),profileId);
        const state=await page.evaluate(id=>{const section=document.getElementById(id),resolved=WHNavigationTargets.resolve(section),members=resolved.highlightTarget,range=document.querySelector('.logical-destination-highlight.destination-highlight'),rangeBox=range.getBoundingClientRect(),memberBoxes=members.map(node=>node.getBoundingClientRect()),statlines=[...section.closest('.unit-card').querySelectorAll('.statline')],bases=[...section.closest('.unit-card').querySelectorAll('.profile-base')],nav=document.querySelector('.unit-card > .local-nav').getBoundingClientRect(),anchorBox=resolved.scrollTarget.getBoundingClientRect();return{regions:document.querySelectorAll('.destination-highlight').length,ranges:document.querySelectorAll('.logical-destination-highlight').length,memberHighlights:members.filter(node=>node.classList.contains('destination-highlight')).length,animations:range.getAnimations().length,animationName:getComputedStyle(range).animationName,current:DG_APP.navigation.highlighter.current.length,timer:Boolean(DG_APP.navigation.highlighter.timer),top:Math.abs(rangeBox.top-Math.min(...memberBoxes.map(box=>box.top))),bottom:Math.abs(rangeBox.bottom-Math.max(...memberBoxes.map(box=>box.bottom))),statlines:statlines.length,statlinesIncluded:statlines.every(node=>rangeBox.top<=node.getBoundingClientRect().top+1&&rangeBox.bottom>=node.getBoundingClientRect().bottom-1),basesIncluded:bases.every(node=>rangeBox.top<=node.getBoundingClientRect().top+1&&rangeBox.bottom>=node.getBoundingClientRect().bottom-1),sectionIncluded:rangeBox.bottom>=section.getBoundingClientRect().bottom-1,anchorAligned:anchorBox.top>=nav.bottom-1&&anchorBox.top<=nav.bottom+DG_APP.navigation.trackingGap+4,units:document.querySelectorAll('.document .unit-card').length,active:document.querySelectorAll('.local-nav .is-current,.local-nav .is-active,.local-nav [aria-current]').length};},profileId);
        assert.equal(state.regions,1,`${name}: Profile has multiple visual highlight regions`);assert.equal(state.ranges,1,`${name}: Profile range overlay missing or duplicated`);assert.equal(state.memberHighlights,0,`${name}: Profile members animate independently`);assert.equal(state.animations,1,`${name}: Profile has multiple animation instances`);assert.equal(state.animationName,'destination-card-highlight',`${name}: existing destination animation not reused`);assert.equal(state.current,1,`${name}: Highlighter lifecycle has multiple current targets`);assert.equal(state.timer,true,`${name}: Highlighter lifecycle timer missing`);assert.ok(state.top<=1&&state.bottom<=1,`${name}: unified range does not match logical Profile boundaries`);assert.ok(state.statlines>=1&&state.statlinesIncluded,`${name}: statline is outside unified Profile range`);assert.equal(state.basesIncluded,true,`${name}: Base is outside unified Profile range`);assert.equal(state.sectionIncluded,true,`${name}: Profile/Weapons is outside unified Profile range`);assert.equal(state.anchorAligned,true,`${name}: PHONE-2D statline anchor regressed`);assert.equal(state.units,1,`${name}: PHONE-1 mounted target count regressed`);assert.equal(state.active,0,`${name}: persistent nav state appeared`);
        await page.waitForTimeout(2350);assert.equal(await page.locator('.destination-highlight,.logical-destination-highlight').count(),0,`${name}: unified Profile highlight did not clear once`);
        const normal=await page.evaluate(id=>[...document.querySelectorAll('.unit-card > .local-nav [data-journey-target]')].map(node=>node.dataset.journeyTarget).find(target=>target!==id&&target.endsWith('-abilities'))||'',profileId);assert.ok(normal,`${name}: normal section fixture missing`);await page.locator(`[data-journey-target="${normal}"]`).click();await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('destination-highlight'),normal);assert.equal(await page.locator('.logical-destination-highlight').count(),0,`${name}: ordinary section used logical range overlay`);assert.equal(await page.locator('.destination-highlight').count(),1,`${name}: ordinary section highlight changed`);
        assert.deepEqual(errors,[],`${name}: console errors`);assert.deepEqual(failed,[],`${name}: failed requests`);
      }finally{await page.close();}
    }
  }finally{await context.close();}
  console.log('PHONE-2F unified Profile highlight QA: PASS (9/9).');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
