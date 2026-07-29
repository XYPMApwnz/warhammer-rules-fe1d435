import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const types={'.css':'text/css','.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    if(url.pathname==='/favicon.ico'){
      response.statusCode=204;
      response.end();
      return;
    }
    let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert(file.startsWith(root+path.sep)||file===root);
    if((await stat(file)).isDirectory())file=path.join(file,'index.html');
    response.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    response.end(await readFile(file));
  }catch{
    response.statusCode=404;
    response.end('Not found');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({serviceWorkers:'allow'});
const page=await context.newPage();
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
page.on('console',message=>{
  const url=message.location().url;
  if(message.type()==='error'&&!url.endsWith('/favicon.ico'))errors.push(`${message.text()} @ ${url}`);
});

try{
  await page.goto(`${origin}/index.html?cold=1`);
  await page.evaluate(async()=>{
    await navigator.serviceWorker.ready;
    if(navigator.serviceWorker.controller)return;
    await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
  if(!await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)))await page.reload();
  assert.equal(await page.evaluate(()=>Boolean(navigator.serviceWorker.controller)),true,'Library must be controlled before going offline');

  await context.setOffline(true);
  await page.goto(`${origin}/books/tyranids/?build=cold-desktop&view=full`);
  assert.match(page.url(),/\/books\/tyranids\/reader\.html\?build=cold-desktop$/);
  assert.equal(await page.title(),'Tyranids Rules — WH40K Library');

  await page.setViewportSize({width:390,height:844});
  await page.goto(`${origin}/books/tyranids/?build=cold-phone`);
  assert.match(page.url(),/\/books\/tyranids\/mobile\/index\.html\?build=cold-phone$/);
  assert.equal(await page.title(),'Start — Tyranids');
  assert.equal(await page.locator('.app-header').evaluate(element=>getComputedStyle(element).position),'fixed');

  await page.goto(`${origin}/books/tyranids/mobile/hive-tyrant.html?build=unvisited`);
  assert.equal(await page.title(),'Start — Tyranids');
  assert.match(page.url(),/\/books\/tyranids\/mobile\/hive-tyrant\.html\?build=unvisited$/);
  await page.getByRole('button',{name:'Open navigation'}).click();
  assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'true');
  assert.deepEqual(errors,[]);
  console.log('PASS Tyranids cold desktop, Phone Mode and unvisited datasheet fallback');
}finally{
  await browser.close();
  server.close();
}
