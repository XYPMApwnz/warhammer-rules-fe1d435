import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const units=[
  'army::adeptus-mechanicus::unit::unit-servitor-battleclade',
  'army::blood-angels::unit::unit-astorath',
  'army::chaos-space-marines::unit::unit-chaos-bikers',
  'army::dark-angels::unit::unit-asmodai',
  'army::emperors-children::unit::unit-chaos-land-raider',
  'army::space-marines::unit::unit-adrax-agatone',
  'army::tau-empire::unit::unit-breacher-team',
  'army::tyranids::unit::unit-barbgaunts',
  'army::death-guard::unit::unit-mortarion',
  'army::death-guard::unit::unit-plague-marines',
  'army::death-guard::unit::unit-deathshroud-terminators',
  'army::death-guard::unit::unit-plagueburst-crawler',
  'army::death-guard::unit::unit-malignant-plaguecaster',
  'army::death-guard::unit::unit-nurglings'
];
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  if(request.url==='/favicon.ico'){response.writeHead(204).end();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`,browser=await launchChromium();
try{
  for(const viewport of [{name:'phone',width:390,height:844},{name:'desktop',width:1440,height:900}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    for(const id of units){
      await page.goto(`${base}/glossary/index.html#${encodeURIComponent(id)}`);await page.locator('body.article-open').waitFor();
      const definition=await page.locator('#termDetail .definition').last().innerText();
      assert.match(definition,/UNIT COMPOSITION/,`${viewport.name}/${id}: composition`);
      assert.match(definition,/MODEL PROFILES/,`${viewport.name}/${id}: profiles`);
      assert.doesNotMatch(definition,/\[object Object\]/,`${viewport.name}/${id}: raw object serialization`);
      if(viewport.name==='phone')assert((await page.evaluate(()=>document.documentElement.scrollWidth))<=390,`${id}: no page-wide phone overflow`);
    }
    const popupId=units[0];
    await page.goto(`${base}/glossary/index.html#${encodeURIComponent(popupId)}`);await page.locator('body.article-open').waitFor();
    await page.evaluate(id=>{const button=document.createElement('button');button.dataset.autolink='';button.dataset.term=id;button.textContent='Unit';document.querySelector('#termDetail').append(button);},popupId);
    const compact=value=>value.replace(/•/g,'').replace(/\s+/g,' ').trim();
    const article=compact(await page.locator('#termDetail .definition').last().innerText());await page.locator(`[data-autolink][data-term="${popupId}"]`).click();await page.locator('#termPopup[open]').waitFor();
    assert.equal(compact(await page.locator('#termPopupSummary').innerText()),article,`${viewport.name}: popup/article parity`);
    await page.goto(`${base}/glossary/index.html`);await page.locator('#search').fill('Talon of Horus');await page.waitForTimeout(180);
    const results=page.locator('.term-button').filter({hasText:'Talon of Horus'});assert((await results.count())>=2,`${viewport.name}: same-name profiles remain distinct`);
    assert((await page.locator('.term-qualifier').count())>=2,`${viewport.name}: same-name profiles remain visibly contextual`);
    assert.deepEqual(errors,[],`${viewport.name}: browser errors`);
    await context.close();
  }
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

console.log('Glossary V2 Unit rendering browser smoke PASS (390x844 + 1440x900; all Unit producers; popup parity; scoped duplicate profiles).');
