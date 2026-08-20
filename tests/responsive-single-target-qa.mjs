import assert from 'node:assert/strict';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {chromium} from 'playwright';

const root=process.cwd();
const chromeCandidates=[
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'',
  process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':'',
  chromium.executablePath()
].filter(Boolean);
const executablePath=chromeCandidates.find(candidate=>fs.existsSync(candidate));
assert.ok(executablePath,'Chromium/Chrome executable is required');

const contentTypes={
  '.css':'text/css; charset=utf-8',
  '.html':'text/html; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.mjs':'text/javascript; charset=utf-8',
  '.png':'image/png',
  '.svg':'image/svg+xml',
  '.webp':'image/webp'
};
const server=http.createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://127.0.0.1');
    if(url.pathname==='/favicon.ico'){
      response.writeHead(204,{'Cache-Control':'no-store'});
      response.end();
      return;
    }
    let file=path.join(root,decodeURIComponent(url.pathname).replace(/^\/+/,'')); 
    if((await fsp.stat(file)).isDirectory())file=path.join(file,'index.html');
    response.writeHead(200,{'Cache-Control':'no-store','Content-Type':contentTypes[path.extname(file)]||'application/octet-stream'});
    response.end(await fsp.readFile(file));
  }catch{
    response.writeHead(404,{'Cache-Control':'no-store'});
    response.end('not found');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath});

const books=[
  {name:'Death Guard',path:'death-guard',targets:['unit-plague-marines','unit-lord-of-contagion','unit-poxwalkers'],legacy:'plague-marines'},
  {name:'Adeptus Mechanicus',path:'adeptus-mechanicus',targets:['unit-tech-priest-manipulus','unit-skitarii-rangers','unit-kataphron-breachers'],legacy:'tech-priest-manipulus'},
  {name:"T'au Empire",path:'tau-empire',targets:['unit-cadre-fireblade','unit-breacher-team','unit-riptide-battlesuit'],legacy:'cadre-fireblade'}
];

async function context(viewport){
  const result=await browser.newContext({serviceWorkers:'block',viewport});
  const page=await result.newPage();
  const session=await result.newCDPSession(page);
  await session.send('Network.setCacheDisabled',{cacheDisabled:true});
  return{result,page};
}

async function state(page,target){
  return page.evaluate(target=>{
    const cards=[...document.querySelectorAll('.unit-card')];
    const visible=cards.filter(card=>card.getClientRects().length>0&&!card.hidden);
    const active=document.getElementById(target);
    const next=cards[cards.indexOf(active)+1];
    return{
      active:document.querySelector('#main .document')?.dataset.responsiveActiveTarget||'',
      activeVisible:Boolean(active?.getClientRects().length),
      nextHidden:Boolean(next?.closest('[hidden]')&&!next.getClientRects().length),
      total:cards.length,
      visible:visible.map(card=>card.id)
    };
  },target);
}

try{
  for(const book of books){
    const phone=await context({width:390,height:844});
    const errors=[];
    phone.page.on('pageerror',error=>errors.push(error.message));
    phone.page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    const base=`${origin}/books/${book.path}/reader.html`;
    await phone.page.goto(`${base}#${book.targets[0]}`,{waitUntil:'networkidle'});
    await phone.page.waitForFunction(()=>document.documentElement.classList.contains('responsive-book-card-mode'));
    let current=await state(phone.page,book.targets[0]);
    assert.ok(current.total>1,`${book.name}: canonical DOM keeps the complete book`);
    assert.deepEqual(current.visible,[book.targets[0]],`${book.name}: Phone shows one target`);
    assert.equal(current.activeVisible,true,`${book.name}: active target is visible`);
    assert.equal(current.nextHidden,true,`${book.name}: next Datasheet has no layout`);
    await phone.page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
    const bottom=await phone.page.evaluate(()=>[...document.querySelectorAll('.unit-card')].filter(card=>{const rect=card.getBoundingClientRect();return rect.bottom>0&&rect.top<innerHeight;}).map(card=>card.id));
    assert.ok(bottom.every(id=>id===book.targets[0]),`${book.name}: scrolling cannot reach another Datasheet`);

    for(const target of book.targets.slice(1)){
      await phone.page.evaluate(target=>document.querySelector(`[data-nav-target="${target}"]`)?.click(),target);
      await phone.page.waitForFunction(target=>location.hash==='#'+target&&document.querySelector('#main .document')?.dataset.responsiveActiveTarget===target,target);
      current=await state(phone.page,target);
      assert.deepEqual(current.visible,[target],`${book.name}: target switch keeps one visible Datasheet`);
    }
    await phone.page.goBack();
    await phone.page.waitForFunction(target=>location.hash==='#'+target&&document.querySelector('#main .document')?.dataset.responsiveActiveTarget===target,book.targets[1]);
    assert.deepEqual((await state(phone.page,book.targets[1])).visible,[book.targets[1]],`${book.name}: Back restores the active target`);
    await phone.page.goForward();
    await phone.page.waitForFunction(target=>location.hash==='#'+target&&document.querySelector('#main .document')?.dataset.responsiveActiveTarget===target,book.targets[2]);
    assert.deepEqual((await state(phone.page,book.targets[2])).visible,[book.targets[2]],`${book.name}: Forward restores the active target`);

    await phone.page.goto(`${origin}/books/${book.path}/mobile/${book.legacy}.html?probe=1#${book.targets[0].replace(/^unit-/,'')}-abilities`,{waitUntil:'networkidle'});
    assert.match(phone.page.url(),new RegExp(`/books/${book.path}/reader\\.html\\?probe=1#`),`${book.name}: legacy route preserves query and hash`);
    assert.equal((await state(phone.page,book.targets[0])).visible.length,1,`${book.name}: legacy route enters one-target mode`);
    assert.deepEqual(errors,[],`${book.name}: Phone console is clean`);
    await phone.result.close();

    for(const viewport of [{width:1024,height:768},{width:1280,height:720}]){
      const desktop=await context(viewport);
      await desktop.page.goto(`${base}#${book.targets[0]}`,{waitUntil:'networkidle'});
      const visible=await desktop.page.locator('.unit-card:visible').count();
      assert.ok(visible>1,`${book.name}: ${viewport.width}px keeps full-book presentation`);
      assert.equal(await desktop.page.locator('html.responsive-book-card-mode').count(),0,`${book.name}: ${viewport.width}px is not Phone mode`);
      await desktop.result.close();
    }
    console.log(`PASS ${book.name}`);
  }
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
