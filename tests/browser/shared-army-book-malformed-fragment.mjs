import {launchChromium} from '../helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

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
const browser=await launchChromium();

const errors=[],consoleErrors=[];
const ready=async page=>{try{await page.waitForFunction(()=>Boolean(window.DG_APP?.navigation?.byId?.size));}catch(error){throw new Error(`${error.message}\n${[...errors,...consoleErrors].join('\n')}`);}};
try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:800}});
  try{
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});

    await page.goto(`${origin}/books/death-guard/reader.html#%`);
    await ready(page);
    assert.deepEqual(await page.evaluate(()=>(
      {hash:location.hash,active:window.DG_APP.navigation.active,current:document.querySelector('[data-nav-target].is-current')?.dataset.navTarget||''}
    )),{hash:'',active:'start',current:'start'},'malformed fragment must fail closed at Start');
    await page.locator('[data-nav-target="army-rule-nurgles-gift"]').evaluate(button=>button.click());
    await page.waitForFunction(()=>location.hash==='#army-rule-nurgles-gift'&&window.DG_APP.navigation.active==='army-rule-nurgles-gift');

    await page.goto(`${origin}/books/death-guard/reader.html#army%2Drule%2Dnurgles%2Dgift`);
    await ready(page);
    await page.waitForFunction(()=>window.DG_APP.navigation.active==='army-rule-nurgles-gift');
    assert.equal(await page.evaluate(()=>location.hash),'#army%2Drule%2Dnurgles%2Dgift','valid encoded fragment was rewritten');

    await page.goto(`${origin}/books/death-guard/reader.html`);
    await ready(page);
    await page.waitForFunction(()=>window.DG_APP.navigation.active==='start');
    assert.equal(await page.evaluate(()=>location.hash),'','ordinary startup acquired a fragment');
    assert.deepEqual(errors,[],'fragment QA page errors');
    assert.deepEqual(consoleErrors,[],'fragment QA console errors');
  }finally{await context.close();}
  console.log('Shared Army Book malformed fragment QA: PASS.');
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
