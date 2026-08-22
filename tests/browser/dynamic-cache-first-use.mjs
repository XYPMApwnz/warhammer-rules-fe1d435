import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.inc':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
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
const books=[
  {name:'Chaos Space Marines',id:'chaos-space-marines',unit:'unit-chaos-lord-with-jump-pack'},
  {name:'Blood Angels',id:'blood-angels',unit:'unit-sanguinary-priest'}
];

const control=async page=>{
  await page.evaluate(async()=>{
    await navigator.serviceWorker.ready;
    if(navigator.serviceWorker.controller)return;
    await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
  if(!await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)))await page.reload();
  assert.equal(await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)),true,'Page must be controlled by the Service Worker');
};

try{
  for(const book of books){
    const context=await browser.newContext({serviceWorkers:'allow',viewport:{width:390,height:844}});
    try{
      const page=await context.newPage(),errors=[],failed=[],templateRequests=[],templateResponses=[];
      page.on('pageerror',error=>errors.push(error.message));
      page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
      page.on('request',request=>{if(request.url().includes('/mobile/related-rules.inc'))templateRequests.push(request.url());});
      page.on('response',response=>{if(response.url().includes('/mobile/related-rules.inc'))templateResponses.push({url:response.url(),fromServiceWorker:response.fromServiceWorker(),status:response.status()});});
      page.on('requestfailed',request=>{if(new URL(request.url()).origin===origin)failed.push(`${request.url()} ${request.failure()?.errorText||''}`);});
      await page.goto(`${origin}/index.html?dynamic-cache-first-use=${book.id}`);
      await control(page);
      await page.goto(`${origin}/books/${book.id}/reader.html#${book.unit}`);
      await page.locator(`#${book.unit}`).waitFor({state:'visible'});
      await page.locator(`#${book.unit} .related-rules-trigger`).waitFor({state:'visible'});
      assert.deepEqual(templateRequests,[],`${book.name} loaded its Related Rules template before first use`);
      const current=`${origin}/books/${book.id}/mobile/related-rules.inc?v=2`,obsolete=`${origin}/books/${book.id}/mobile/related-rules.inc?v=1`;
      assert.equal(await page.evaluate(url=>caches.match(url).then(Boolean),current),true,`${book.name} current Related Rules template is absent from the install cache`);
      assert.equal(await page.evaluate(url=>caches.match(url).then(Boolean),obsolete),false,`${book.name} obsolete Related Rules template remains cached`);
      await context.setOffline(true);
      await page.locator(`#${book.unit} .related-rules-trigger`).click();
      const content=page.locator('.full-related-content');
      await content.waitFor({state:'visible'});
      assert.ok((await content.textContent()).trim().length>100,`${book.name} Related Rules content did not render offline`);
      assert.deepEqual(templateRequests,[current],`${book.name} did not request the exact current Related Rules URL once`);
      assert.deepEqual(templateResponses,[{url:current,fromServiceWorker:true,status:200}],`${book.name} Related Rules template was not served exactly from the Service Worker cache`);
      assert.deepEqual(failed,[],`${book.name} emitted a relevant failed request`);
      assert.deepEqual(errors,[],`${book.name} emitted a console/runtime error`);
      console.log(`PASS ${book.name} fresh-install offline first-use Related Rules (${current})`);
    }finally{await context.close();}
  }
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
