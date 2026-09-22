import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from './helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=fs.readFileSync(path.join(root,'books/core-rules/reader/app.js'),'utf8');
assert.match(app,/resolveView\?\.\('core-rules',trigger\.dataset\.term\)/,'Core Reader popup must resolve its stable TERM_ID through WH40K_GLOSSARY');
assert.match(app,/summary\.textContent = term\.definition/,'Core Reader popup must render the effective glossary definition');
assert.doesNotMatch(app,/summary\.textContent = trigger\.dataset\.termSummary/,'data-term-summary must not retain factual authority');

const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));
  if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await launchChromium(),base=`http://127.0.0.1:${server.address().port}`,errors=[];
try{
  for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(`${viewport.width}: ${error.message}`));
    await page.goto(`${base}/books/core-rules/reader/monsters-vehicles.html`);
    await page.waitForFunction(()=>window.WH40K_GLOSSARY?.resolveView?.('core-rules','core-blast'));
    const expected=await page.evaluate(()=>window.WH40K_GLOSSARY.resolveView('core-rules','core-blast'));
    const trigger=page.locator('[data-term="core-blast"]').first();
    await trigger.evaluate(node=>{node.dataset.termTitle='POISON TITLE';node.dataset.termSummary='POISON SUMMARY';});
    await trigger.click();
    await page.locator('#termDialog[open]').waitFor();
    assert.equal(await page.locator('#termTitle').innerText(),expected.title,`${viewport.width}: popup title bypassed effective glossary`);
    assert.equal(await page.locator('#termSummary').innerText(),expected.definition,`${viewport.width}: popup definition bypassed effective glossary`);
    assert.equal(await page.locator('#termDialog').getAttribute('data-open-term'),expected.id,`${viewport.width}: popup identity drift`);
    assert.notEqual(await page.locator('#termSummary').innerText(),'POISON SUMMARY',`${viewport.width}: legacy summary remained authoritative`);
    await page.locator('#termClose').click();
    await context.close();
  }
  assert.deepEqual(errors,[],'Core Reader popup browser errors');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log('Core Reader popup glossary QA passed: effective TERM_ID/definition wins over poisoned legacy DOM fields at 390px and 1440px.');
