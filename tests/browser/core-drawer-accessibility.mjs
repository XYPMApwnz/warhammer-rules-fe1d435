import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createReadStream,statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png'};
const server=createServer((request,response)=>{try{const url=new URL(request.url,'http://localhost');if(url.pathname==='/favicon.ico'){response.writeHead(204).end();return;}let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file===root||file.startsWith(root+path.sep));if(statSync(file).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');createReadStream(file).pipe(response);}catch{response.writeHead(404).end('Not found');}});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const origin=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  try{
    await page.goto(`${origin}/books/core-rules/reader/index.html`);
    const menu=page.locator('#navButton'),sidebar=page.locator('#sidebar'),main=page.locator('main.main'),scrim=page.locator('#navScrim');
    assert.equal(await sidebar.evaluate(node=>node.inert),true,'closed mobile sidebar remains interactive');
    assert.equal(await sidebar.getAttribute('aria-hidden'),'true','closed mobile sidebar remains exposed to assistive technology');
    const scrollBefore=await page.evaluate(()=>{scrollTo(0,Math.min(420,document.documentElement.scrollHeight-innerHeight));return scrollY;});
    await menu.click();
    await page.waitForFunction(()=>document.body.classList.contains('nav-open'));
    assert.equal(await menu.getAttribute('aria-expanded'),'true','menu did not expose open state');
    assert.equal(await sidebar.evaluate(node=>node.inert),false,'open sidebar remained inert');
    assert.equal(await sidebar.getAttribute('aria-hidden'),'false','open sidebar remained hidden from assistive technology');
    assert.equal(await main.evaluate(node=>node.inert),true,'open drawer did not isolate main content');
    assert.equal(await page.evaluate(()=>[...document.querySelector('.topbar').children].filter(node=>node.id!=='navButton').every(node=>node.inert)),true,'open drawer left topbar background interactive');
    assert.equal(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden','open drawer did not lock body scrolling');
    const controls=sidebar.locator('a:visible,button:visible,input:visible,select:visible,textarea:visible,[tabindex]:visible'),first=controls.first(),last=controls.last();
    assert.equal(await first.evaluate(node=>document.activeElement===node),true,'open drawer did not focus its first control');
    await first.focus();await page.keyboard.press('Shift+Tab');
    assert.equal(await menu.evaluate(node=>document.activeElement===node),true,'reverse focus escaped the drawer cycle');
    await page.keyboard.press('Tab');assert.equal(await first.evaluate(node=>document.activeElement===node),true,'forward focus did not return to first drawer control');
    await last.focus();await page.keyboard.press('Tab');assert.equal(await menu.evaluate(node=>document.activeElement===node),true,'forward focus escaped the drawer cycle');
    await page.keyboard.press('Shift+Tab');assert.equal(await last.evaluate(node=>document.activeElement===node),true,'reverse focus did not return to last drawer control');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'),'false','Escape did not close drawer');
    assert.equal(await menu.evaluate(node=>document.activeElement===node),true,'Escape did not restore menu focus');
    assert.equal(await sidebar.evaluate(node=>node.inert),true,'closed sidebar regained interactivity');
    assert.equal(await main.evaluate(node=>node.inert),false,'closed drawer left main content inert');
    assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).overflow),'hidden','closed drawer left body scrolling locked');
    assert.equal(await page.evaluate(()=>scrollY),scrollBefore,'drawer close did not restore scroll position');
    await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-open'));
    await scrim.click({position:{x:380,y:40}});assert.equal(await menu.getAttribute('aria-expanded'),'false','scrim did not close drawer');
    await menu.click();await page.waitForFunction(()=>document.body.classList.contains('nav-open'));
    await page.setViewportSize({width:1280,height:800});await page.waitForFunction(()=>!document.body.classList.contains('nav-open'));
    assert.equal(await sidebar.evaluate(node=>node.inert),false,'desktop resize left sidebar inert');
    assert.equal(await sidebar.getAttribute('aria-hidden'),'false','desktop resize hid sidebar from assistive technology');
    assert.equal(await main.evaluate(node=>node.inert),false,'desktop resize left main content inert');
    await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.querySelector('#sidebar').inert);
    assert.deepEqual(errors,[],'Core drawer emitted an uncaught runtime error');
    console.log('Core drawer accessibility browser QA passed: closed-state isolation, open-state focus/scroll contract, Escape, scrim and responsive reset.');
  }finally{await context.close();}
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
