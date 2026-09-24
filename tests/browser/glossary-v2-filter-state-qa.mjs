import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const createBattlefieldId='missions::mission-sequence-create-battlefield';
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  if(request.url==='/favicon.ico'){response.writeHead(204).end();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
const filter=(page,label)=>page.locator('#filters button').filter({hasText:label});
const activateFilter=(page,label)=>filter(page,label).evaluate(node=>node.click());
const enterSearch=(page,value)=>page.locator('#search').evaluate((node,text)=>{node.value=text;node.dispatchEvent(new Event('input',{bubbles:true}));},value);
const openCreateBattlefield=async page=>{await page.goto(`${base}/glossary/index.html#${encodeURIComponent(createBattlefieldId)}`);await page.locator('body.article-open').waitFor();assert.equal(await page.locator('#termDetail h2').innerText(),'Create the Battlefield');};

try{
  for(const viewport of [{name:'desktop',width:1440,height:900},{name:'phone',width:390,height:844}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});

    await openCreateBattlefield(page);
    await activateFilter(page,'Mission Reference Rule');
    await page.locator('body:not(.article-open)').waitFor();
    assert.equal(await page.locator('#resultCount').innerText(),'7 OF 7 ENTRIES SHOWN',`${viewport.name}: filtered result count`);
    assert.match(await page.locator('#termDetail').innerText(),/Select a term from the archive/i,`${viewport.name}: excluded article clears to neutral state`);
    assert.equal(new URL(page.url()).hash,'',`${viewport.name}: excluded article hash cleared`);
    assert.equal(await page.locator('.term-button.active').count(),0,`${viewport.name}: excluded selection cleared`);

    await openCreateBattlefield(page);
    await activateFilter(page,'Mission Sequence Rule');
    await page.waitForTimeout(50);
    assert(await page.locator('body').evaluate(node=>node.classList.contains('article-open')),`${viewport.name}: included article remains active`);
    assert.equal(await page.locator('#termDetail h2').innerText(),'Create the Battlefield',`${viewport.name}: included article identity`);
    assert.equal(decodeURIComponent(new URL(page.url()).hash.slice(1)),createBattlefieldId,`${viewport.name}: included article hash`);

    await page.goto(`${base}/glossary/index.html`);
    await activateFilter(page,'Mission Reference Rule');
    const visibleResult=page.locator('.term-button').first(),visibleTitle=await visibleResult.locator('strong').innerText();
    await visibleResult.click();await page.locator('body.article-open').waitFor();
    const visibleHash=new URL(page.url()).hash;
    await activateFilter(page,'All');await page.waitForTimeout(50);
    assert(await page.locator('body').evaluate(node=>node.classList.contains('article-open')),`${viewport.name}: clearing filter retains selected article`);
    assert.equal(await page.locator('#termDetail h2').innerText(),visibleTitle,`${viewport.name}: clearing filter retains selected identity`);
    assert.equal(new URL(page.url()).hash,visibleHash,`${viewport.name}: clearing filter retains hash`);

    await openCreateBattlefield(page);
    await activateFilter(page,'Mission Reference Rule');await page.locator('body:not(.article-open)').waitFor();
    await page.goBack();await page.locator('body.article-open').waitFor();
    assert.equal(await page.locator('#termDetail h2').innerText(),'Create the Battlefield',`${viewport.name}: Back restores deep-linked article`);
    assert.equal(await filter(page,'All').getAttribute('class'),'active',`${viewport.name}: Back restores compatible catalogue scope`);
    await page.goForward();await page.locator('body:not(.article-open)').waitFor();
    assert.equal(new URL(page.url()).hash,'',`${viewport.name}: Forward restores neutral catalogue hash`);

    await openCreateBattlefield(page);
    await enterSearch(page,'Mortarion');await page.locator('body:not(.article-open)').waitFor();
    assert.equal(new URL(page.url()).hash,'',`${viewport.name}: excluding search clears stale article hash`);
    assert.deepEqual(errors,[],`${viewport.name}: browser errors`);
    await context.close();
  }
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log('Glossary V2 filter/article state QA passed: excluded selections clear, included selections persist, clear-filter and hash history remain coherent on desktop and phone.');
