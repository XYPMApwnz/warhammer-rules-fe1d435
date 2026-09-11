import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const require=createRequire(import.meta.url);
const {chromium}=(()=>{try{return require('playwright');}catch(error){if(!process.env.CODEX_NODE_MODULES)throw error;return require(path.join(process.env.CODEX_NODE_MODULES,'playwright'));}})();
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.webp':'image/webp'};
const server=http.createServer((request,response)=>{const pathname=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname),file=path.resolve(root,pathname.replace(/^\/+/, '')||'index.html');if(file!==root&&!file.startsWith(`${root}${path.sep}`)){response.writeHead(403).end();return;}try{const stat=fs.statSync(file),target=stat.isDirectory()?path.join(file,'index.html'):file;response.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(response);}catch{response.writeHead(404).end();}});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});

try{
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}}),errors=[];
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${origin}/books/chaos-space-marines/reader.html?view=full#detachment-deceptors`,{waitUntil:'networkidle'});
  const rule=page.locator('#deceptors-rule .rule-card');await rule.waitFor();
  assert.equal(await rule.getByRole('button',{name:'Masters of Misdirection',exact:true}).count(),1);
  const ruleNote=rule.locator('[data-source-availability="verified-rule-body"]');
  assert.equal(await ruleNote.isVisible(),true);assert.equal((await ruleNote.innerText()).trim(),'Known rule identity. Verified rule body is unavailable in this publication.');

  const abaddon=await context.newPage();abaddon.on('pageerror',error=>errors.push(error.message));
  await abaddon.goto(`${origin}/books/chaos-space-marines/reader.html?view=full#unit-abaddon-the-despoiler`,{waitUntil:'networkidle'});
  const warmaster=abaddon.locator('#unit-abaddon-the-despoiler [data-source-field="abilities.the-warmaster"]');await warmaster.waitFor();
  assert.match(await warmaster.innerText(),/select one Warmaster ability/);
  const optionNote=warmaster.locator('[data-source-availability="verified-option-definitions"]');
  assert.equal(await optionNote.isVisible(),true);assert.equal((await optionNote.innerText()).trim(),'Known choice instruction. Verified option definitions are unavailable in this publication.');

  const mobile=await context.newPage();mobile.on('pageerror',error=>errors.push(error.message));
  await mobile.setViewportSize({width:390,height:844});
  await mobile.goto(`${origin}/books/chaos-space-marines/reader.html?view=mobile#unit-abaddon-the-despoiler`,{waitUntil:'networkidle'});
  const mobileCard=mobile.locator('#unit-abaddon-the-despoiler');await mobileCard.waitFor();
  await mobileCard.locator('.local-nav [data-journey-target="abaddon-the-despoiler-abilities"]').click();
  const mobileNote=mobileCard.locator('[data-source-availability="verified-option-definitions"]');await mobileNote.waitFor();assert.equal(await mobileNote.isVisible(),true);
  assert.deepEqual(errors,[]);await context.close();
  console.log('W2-22 browser acceptance PASS: both disclosures are visible; Abaddon passes canonical desktop deep link and mobile Abilities tab.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
