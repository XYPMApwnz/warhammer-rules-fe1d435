import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const contentTypes={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json'};
const server=createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  const target=path.resolve(root,`.${pathname}`);
  if(!target.startsWith(root)||!fs.existsSync(target)||fs.statSync(target).isDirectory()){response.writeHead(404).end();return;}
  response.writeHead(200,{'Content-Type':contentTypes[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','Connection':'close'});
  fs.createReadStream(target).pipe(response);
});

const rect=locator=>locator.evaluate(node=>{const box=node.getBoundingClientRect();return{top:box.top,bottom:box.bottom,left:box.left,right:box.right};});
const geometry=async page=>({header:await rect(page.locator('.topbar')),search:await rect(page.locator('#search')),workspace:await rect(page.locator('.workspace')),scrollY:await page.evaluate(()=>scrollY)});
const assertClearAndClickable=async(page,label)=>{
  const observed=await geometry(page);
  assert.ok(observed.search.top>=observed.header.bottom,`${label}: search top ${observed.search.top} must clear header bottom ${observed.header.bottom}`);
  assert.equal(await page.locator('#search').evaluate(node=>{const box=node.getBoundingClientRect();return document.elementFromPoint(box.left+box.width/2,box.top+box.height/2)===node;}),true,`${label}: search hit test`);
  return observed;
};

await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await launchChromium();
const observations=[];
try{
  for(const viewport of [{width:1280,height:800},{width:1536,height:864}]){
    const page=await browser.newPage({viewport});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${origin}/glossary/index.html`,{waitUntil:'load'});
    await page.waitForFunction(()=>document.querySelectorAll('.term-button').length>0);
    const initial=await geometry(page);
    assert.equal(initial.scrollY,0,`${viewport.width}: initial scroll`);
    await page.locator('#termDetail').evaluate(node=>node.style.scrollMarginTop='0px');
    await page.locator('.term-button').first().click();
    const preSelection=await geometry(page);
    assert.ok(preSelection.search.top<preSelection.header.bottom,`${viewport.width}: regression reproduced`);
    await page.locator('#termDetail').evaluate(node=>node.style.removeProperty('scroll-margin-top'));
    await page.locator('.term-button').nth(1).click();
    const selected=await assertClearAndClickable(page,`${viewport.width}: selection`);
    const selectedId=await page.evaluate(()=>decodeURIComponent(location.hash.slice(1)));
    assert.equal(await page.locator('#termDetail h2').evaluate(node=>document.activeElement===node),true,`${viewport.width}: selected title receives keyboard focus`);
    await page.locator('#search').click();
    await page.locator('#search').fill('mortarion');
    await page.waitForTimeout(150);
    assert.match(await page.locator('#resultCount').innerText(),/^2 of 2 entries shown$/i,`${viewport.width}: search interaction`);
    assert.match(await page.locator('.term-button').first().innerText(),/mortarion/i,`${viewport.width}: search results`);
    await page.keyboard.press('Control+A');
    await page.keyboard.type('lethal hits');
    await page.waitForTimeout(150);
    assert.equal(await page.locator('#search').inputValue(),'lethal hits',`${viewport.width}: keyboard input`);
    assert.equal(await page.evaluate(()=>document.activeElement?.id),'search',`${viewport.width}: keyboard focus`);
    assert.deepEqual(errors,[],`${viewport.width}: no page errors`);
    await page.goto('about:blank');
    await page.goto(`${origin}/glossary/index.html#${encodeURIComponent(selectedId)}`,{waitUntil:'load'});
    await page.waitForFunction(id=>document.querySelector('#termDetail h2')?.dataset.term===id,selectedId);
    const deepLink=await assertClearAndClickable(page,`${viewport.width}: direct hash`);
    assert.equal(deepLink.scrollY,0,`${viewport.width}: direct hash keeps normal initial scroll`);
    assert.deepEqual(errors,[],`${viewport.width}: direct hash has no page errors`);
    observations.push({viewport,initial,preSelection,selected,deepLink});
    await page.close();
  }
}finally{
  await browser.close();
  server.closeAllConnections();
  await new Promise(resolve=>server.close(resolve));
}
console.log(JSON.stringify(observations,null,2));
console.log('W2-17 glossary offset browser PASS');
