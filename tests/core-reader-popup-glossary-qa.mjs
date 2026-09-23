import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from './helpers/browser-launch.mjs';
import {createCoreFactProjection} from '../books/core-rules/content/core-fact-projection.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=fs.readFileSync(path.join(root,'books/core-rules/reader/app.js'),'utf8');
const projection=createCoreFactProjection({repoRoot:root}),projectionById=new Map(projection.terms.map(term=>[term.id,term]));
const expected=projectionById.get('core-blast');
assert(expected?.definition,'effective Core projection must expose the Blast definition');
assert.match(app,/glossary\.resolveView\('core-rules',trigger\.dataset\.term\)/,'Core Reader popup must resolve the canonical V2 entry');
assert.match(app,/summary\.textContent = term\.definition/,'Core Reader popup must render the generated effective-Core definition');
assert.doesNotMatch(app,/dataset\.termDefinition|dataset\.termSummary|glossary\/generated\/glossary\.en\.js/,'Core Reader popup must not retain generated DOM or legacy Glossary factual dependencies');
const decode=value=>value.replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
const generatedHtml=fs.readdirSync(path.join(root,'books/core-rules/reader')).filter(file=>file.endsWith('.html')).map(file=>fs.readFileSync(path.join(root,'books/core-rules/reader',file),'utf8')).join('\n');
let projectedButtons=0;
for(const match of generatedHtml.matchAll(/<button class="[^"]*\bterm\b[^"]*"[^>]*data-term="([^"]+)"[^>]*data-term-definition="([^"]*)"/g)){
  const term=projectionById.get(decode(match[1]));
  assert(term,`generated Core Reader term does not resolve in effective Core: ${match[1]}`);
  assert.equal(decode(match[2]),term.definition||term.summary||'',`${term.id}: generated popup definition diverges from effective Core`);
  projectedButtons++;
}
assert(projectedButtons>0,'Core Reader generated no effective-Core popup projections');

const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));
  if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await launchChromium(),base=`http://127.0.0.1:${server.address().port}`,errors=[],requests=[];
try{
  for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage();
    page.on('pageerror',error=>errors.push(`${viewport.width}: ${error.message}`));
    page.on('request',request=>requests.push(request.url()));
    await page.goto(`${base}/books/core-rules/reader/monsters-vehicles.html`);
    const trigger=page.locator('[data-term="core-blast"]').first();
    assert.equal(await trigger.getAttribute('data-term-title'),expected.title,`${viewport.width}: generated title differs from effective Core`);
    assert.equal(await trigger.getAttribute('data-term-definition'),expected.definition,`${viewport.width}: generated definition differs from effective Core`);
    await trigger.evaluate(node=>{node.dataset.termSummary='POISON LEGACY SUMMARY';node.dataset.termDefinition='POISON GENERATED DEFINITION';});
    await trigger.click();
    await page.locator('#termDialog[open]').waitFor();
    assert.equal(await page.locator('#termTitle').innerText(),expected.title,`${viewport.width}: popup title bypassed generated effective Core`);
    assert.equal(await page.locator('#termSummary').innerText(),expected.definition,`${viewport.width}: popup definition bypassed generated effective Core`);
    assert.equal(await page.locator('#termDialog').getAttribute('data-open-term'),`core::${expected.id}`,`${viewport.width}: popup identity drift`);
    assert.notEqual(await page.locator('#termSummary').innerText(),'POISON LEGACY SUMMARY',`${viewport.width}: legacy summary remained authoritative`);
    assert.notEqual(await page.locator('#termSummary').innerText(),'POISON GENERATED DEFINITION',`${viewport.width}: generated DOM definition remained authoritative`);
    await page.locator('#termClose').click();
    await context.close();
  }
  assert.deepEqual(errors,[],'Core Reader popup browser errors');
  assert(!requests.some(url=>url.includes('/glossary/generated/glossary.en.js')),`Core Reader popup requested legacy Glossary facts: ${requests.find(url=>url.includes('/glossary/generated/glossary.en.js'))}`);
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log('Core Reader popup Glossary V2 QA passed: the V2 Core entry wins over poisoned generated DOM fields at 390px and 1440px.');
