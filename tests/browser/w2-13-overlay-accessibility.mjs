import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){response.statusCode=204;response.end();return;}
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file===root||file.startsWith(root+path.sep));
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.end(await readFile(file));
  }catch{response.statusCode=404;response.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});
const focusable='button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const observe=page=>{
  const errors=[],failed=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('requestfailed',request=>failed.push(request.url()+': '+request.failure()?.errorText));
  return{errors,failed};
};
const loadUnit=async page=>{
  await page.goto(`${origin}/books/death-guard/reader.html#unit-plague-marines`);
  await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry&&document.querySelector('.unit-card .related-rules-trigger')&&document.querySelector('.unit-card [data-term]')));
};
const inViewport=box=>box&&box.top>=0&&box.bottom<=256;

async function fullEntryContract(){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}}),page=await context.newPage(),observed=observe(page);
  try{
    await loadUnit(page);
    const trigger=page.locator('.unit-card [data-term]').first(),id=await trigger.getAttribute('data-term');
    await trigger.focus();
    await page.evaluate(termId=>DG_APP.fullEntry.open(termId,document.activeElement),id);
    const dialog=page.locator('.full-entry-dialog'),close=dialog.locator('[data-full-entry-close]').first();
    assert.equal(await close.evaluate(node=>document.activeElement===node),true,'Full entry did not focus its visible Close control');
    assert.equal(await page.locator('.full-entry-back').isHidden(),true,'Initial full entry unexpectedly exposed Previous entry');
    assert.equal(await page.evaluate(()=>[...document.body.children].filter(node=>!node.matches('.full-entry-layer')).every(node=>node.inert)),true,'Full entry left background controls interactive');

    await page.keyboard.press('Shift+Tab');
    assert.equal(await dialog.locator('[data-full-entry-close]').last().evaluate(node=>document.activeElement===node),true,'Reverse boundary did not wrap to the last visible modal control');
    await page.keyboard.press('Tab');
    assert.equal(await close.evaluate(node=>document.activeElement===node),true,'Forward boundary did not wrap to the first visible modal control');
    assert.equal(await dialog.evaluate(node=>node.contains(document.activeElement)),true,'Full-entry focus escaped the dialog');

    const reference=dialog.locator('.full-entry-reference-grid button').first();
    await reference.click();
    assert.equal(await page.locator('.full-entry-back').isVisible(),true,'Nested full entry did not reveal Previous entry');
    assert.equal(await page.locator('.full-entry-back').evaluate(node=>document.activeElement===node),true,'Nested full entry did not focus Previous entry');
    await page.locator('.full-entry-back').click();
    assert.equal(await page.locator('.full-entry-back').isHidden(),true,'Returning to the root entry left Previous entry exposed');

    await page.evaluate(()=>DG_APP.fullEntry.close({restoreFocus:true}));
    assert.equal(await trigger.evaluate(node=>document.activeElement===node),true,'Full entry did not restore focus to its opener');
    assert.equal(await page.evaluate(()=>[...document.body.children].every(node=>!node.inert)),true,'Full entry left background content inert after close');
    assert.deepEqual(observed.errors,[],'Full-entry browser errors');
    assert.deepEqual(observed.failed,[],'Full-entry failed requests');
  }finally{await context.close();}
}

async function popupContract(){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:500}}),page=await context.newPage(),observed=observe(page);
  try{
    await loadUnit(page);
    const trigger=page.locator('.unit-card [data-term]').first();
    await trigger.scrollIntoViewIfNeeded();await trigger.click();
    const popup=page.locator('.term-popup').last();
    assert.equal(await popup.evaluate(node=>document.activeElement===node),true,'Term popup itself was not focused');
    assert.notEqual(await page.evaluate(()=>getComputedStyle(document.documentElement).overflow),'hidden','Nonmodal term popup locked page scrolling');
    assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden','Nonmodal term popup locked body scrolling');
    const count=await popup.locator(focusable).count();
    for(let index=0;index<=count+1;index++)await page.keyboard.press('Tab');
    const traversal=await page.evaluate(()=>({inside:document.querySelector('.term-popup').contains(document.activeElement),top:document.activeElement.getBoundingClientRect().top,bottom:document.activeElement.getBoundingClientRect().bottom}));
    assert.equal(traversal.inside,false,'Nonmodal popup trapped ordinary page navigation');
    assert.ok(traversal.top>=0&&traversal.bottom<=500,'Focus moved to invisible page content after leaving popup');
    await page.evaluate(()=>DG_APP.popups.closeFrom(0));

    const relatedTrigger=page.locator('.related-rules-trigger').first();
    await relatedTrigger.click();
    await page.waitForSelector('.related-rules-layer:not([hidden]) .full-related-content');
    const relatedTerm=page.locator('.related-rules-layer [data-term]:visible').first();
    await relatedTerm.click();
    assert.equal(await page.locator('.term-popup').last().evaluate(node=>document.activeElement===node),true,'Related-rules term popup was not focused');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.term-popup').last().locator('.popup-close').evaluate(node=>document.activeElement===node),true,'Related-rules popup controls were not keyboard reachable');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.related-rules-layer').isVisible(),true,'Closing a term popup also closed its compatible-rules dialog');
    assert.equal(await relatedTerm.evaluate(node=>document.activeElement===node),true,'Closing a term popup did not restore its related-rules origin');
    await page.locator('.related-rules-close').click();
    assert.equal(await relatedTrigger.evaluate(node=>document.activeElement===node),true,'Compatible-rules dialog did not restore its opener');
    assert.deepEqual(observed.errors,[],'Popup browser errors');
    assert.deepEqual(observed.failed,[],'Popup failed requests');
  }finally{await context.close();}
}

async function shortDialogContract(){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:320,height:256},hasTouch:true,isMobile:true}),page=await context.newPage(),observed=observe(page);
  try{
    await loadUnit(page);
    await page.locator('.related-rules-trigger').first().click();
    await page.waitForSelector('.related-rules-layer:not([hidden]) .full-related-content');
    await page.evaluate(()=>{document.getElementById('relatedRulesTitle').textContent='Plague Marines with an extraordinarily long compatible rules dialog title that wraps through many lines';});
    const geometry=await page.evaluate(()=>{
      const dialog=document.querySelector('.related-rules-dialog'),header=dialog.querySelector('header'),body=dialog.querySelector('.related-rules-body'),close=dialog.querySelector('.related-rules-close'),box=node=>{const rect=node.getBoundingClientRect();return{top:rect.top,bottom:rect.bottom,height:rect.height};};
      return{dialog:box(dialog),header:box(header),body:box(body),close:box(close),bodyClient:body.clientHeight,bodyScroll:body.scrollHeight};
    });
    assert.equal(inViewport(geometry.dialog),true,'Short-viewport dialog escaped the viewport');
    assert.equal(inViewport(geometry.close),true,'Long title pushed Close outside the viewport');
    assert.ok(geometry.bodyClient>=100&&geometry.bodyScroll>geometry.bodyClient,'Long title left no usable scrollable rule body');

    const body=page.locator('.related-rules-body');
    await body.hover();await page.mouse.wheel(0,700);await page.waitForTimeout(100);
    assert.ok(await body.evaluate(node=>node.scrollTop)>0,'Mouse wheel could not reveal compatible-rules body content');
    await body.evaluate(node=>{node.scrollTop=0;});
    const box=await body.boundingBox(),session=await context.newCDPSession(page),x=Math.round(box.x+box.width/2),startY=Math.round(box.y+box.height-12),endY=Math.round(box.y+18);
    await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y:startY}]});
    await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:Math.round((startY+endY)/2)}]});
    await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:endY}]});
    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await page.waitForTimeout(150);
    assert.ok(await body.evaluate(node=>node.scrollTop)>0,'Touch pan could not reveal compatible-rules body content');

    const close=page.locator('.related-rules-close');
    await close.focus();await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator('.related-rules-dialog').evaluate(node=>node.contains(document.activeElement)),true,'Short-dialog reverse traversal escaped the modal');
    assert.equal(inViewport(await close.evaluate(node=>{const rect=node.getBoundingClientRect();return{top:rect.top,bottom:rect.bottom};})),true,'Keyboard traversal pushed Close outside the viewport');
    await page.keyboard.press('Tab');
    assert.equal(await close.evaluate(node=>document.activeElement===node),true,'Short-dialog forward boundary did not return to Close');
    assert.deepEqual(observed.errors,[],'Short-dialog browser errors');
    assert.deepEqual(observed.failed,[],'Short-dialog failed requests');
  }finally{await context.close();}

  const normal=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:720}}),normalPage=await normal.newPage();
  try{
    await loadUnit(normalPage);await normalPage.locator('.related-rules-trigger').first().click();await normalPage.waitForSelector('.related-rules-layer:not([hidden]) .full-related-content');
    const state=await normalPage.evaluate(()=>{const dialog=document.querySelector('.related-rules-dialog'),body=dialog.querySelector('.related-rules-body');return{height:dialog.getBoundingClientRect().height,body:body.clientHeight,kicker:getComputedStyle(dialog.querySelector('header span')).display};});
    assert.equal(Math.round(state.height),648,'Normal compatible-rules dialog height changed');
    assert.ok(state.body>400,'Normal compatible-rules body lost its expected space');
    assert.notEqual(state.kicker,'none','Normal compatible-rules header lost its kicker');
  }finally{await normal.close();}
}

try{
  await fullEntryContract();
  await popupContract();
  await shortDialogContract();
  console.log('W2-13 overlay accessibility QA: PASS (WBA-043, WBA-047, WBA-048).');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
