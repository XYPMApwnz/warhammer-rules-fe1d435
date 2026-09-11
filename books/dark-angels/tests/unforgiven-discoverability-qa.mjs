import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {parseArmyBookTargetCatalog} from '../../shared/tools/build-army-book-targets.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const json=file=>JSON.parse(read(file));
const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
const anchor='army-rule-the-unforgiven',expectedId='dark-angels-army-rule-the-unforgiven';
const oathId='space-marines-army-rule-oath-of-moment',localControl='dark-angels-weapon-heavy-bolt-pistol';
const config=json('books/dark-angels/book.config.json');
const canonical=json('books/dark-angels/'+config.sources.codexParity).armyRules.find(rule=>rule.id===anchor);
assert.ok(canonical,'DA parity owns The Unforgiven');
const catalog=parseArmyBookTargetCatalog(read('books/dark-angels/scripts/target-data.js'));
const range=catalog.targets[anchor];assert.ok(range,'stable reader mount owner');
const fragment=catalog.html.slice(range.start,range.end);
const match=fragment.match(/<button class="term-button" data-term="([^"]+)">The Unforgiven<\/button>/);
assert.ok(match,'actual mounted rule button');
const termId=match[1],scope={window:{}};
for(const file of ['glossary/generated/glossary.en.js','books/dark-angels/scripts/data.js','books/shared/controllers/popup-controller.js'])vm.runInNewContext(read(file),scope,{filename:file});
const local=scope.window.DG_TERMS,global=scope.window.WH40K_GLOSSARY;
const terms={...global.forBook('dark-angels'),...local};
function opens(id){
  let rendered=false;
  const popup={terms,ids:[],origins:[],captureOrigin(){return{};},sync(){rendered=true;}};
  scope.window.DGPopups.prototype.open.call(popup,id,null);
  return rendered&&popup.ids.length===1&&popup.ids[0]===id;
}
assert.ok(opens(oathId),'existing SM-owned Oath popup control');
assert.ok(opens(localControl),'existing DA-local popup control');
assert.equal(opens('dark-angels-missing-regression-term'),false,'missing terms must not open a popup');
console.log(`The Unforgiven actual popup: ${opens(termId)?'OPEN':'NOT OPEN'}; term=${termId}`);
assert.ok(opens(termId),'The Unforgiven mounted button must open through the real popup controller');
assert.equal(termId,expectedId,'DA-local canonical term identity');
assert.equal(local[termId].rule,anchor,'stable canonical reader anchor');
assert.equal(local[termId].title,canonical.title);
assert.equal(clean(local[termId].full),clean(canonical.text),'popup uses full source-owned DA rule text');
assert.equal(config.armyRuleTermIds['Oath of Moment'],oathId,'SM Oath reference remains canonical');
assert.equal(local['dark-angels-army-rule-oath-of-moment'],undefined,'no DA copy of SM-owned Oath');
const smConfig=json('books/space-marines/book.config.json');
const smParity=json('books/space-marines/'+smConfig.sources.codexParity);
assert.ok(!(smParity.armyRules||[]).some(rule=>rule.title===canonical.title),'The Unforgiven is not an SM parity rule');

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
  const server=createServer((req,res)=>{try{
    const url=new URL(req.url,'http://localhost'),file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    assert.ok(file.startsWith(root+path.sep));
    res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
  }catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  let browser;
  try{
    browser=await chromium.launch({channel:'chrome',headless:true});
    for(const [view,width] of [['full',1280],['mobile',390]]){
      const context=await browser.newContext({serviceWorkers:'block',viewport:{width,height:844}});
      try{
        const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
        await page.goto(`${origin}/books/dark-angels/reader.html?view=${view}#${anchor}`);
        await page.waitForFunction(()=>Boolean(window.DG_APP?.popups&&window.WHArmyBookTargetMount));
        const button=page.locator(`#${anchor} button[data-term="${expectedId}"]`);
        await button.click();
        const popup=page.locator(`.term-popup[data-popup-term="${expectedId}"]`);await popup.waitFor({state:'visible'});
        assert.equal(await popup.locator('h3').innerText(),canonical.title);
        const body=await popup.innerText();
        for(const paragraph of canonical.text.split(/\n+/).filter(Boolean))assert.ok(clean(body).includes(clean(paragraph)),`${view}: complete canonical rule paragraph`);
        assert.equal(await page.evaluate(()=>WHArmyBookTargetMount.catalog.owners['army-rule-the-unforgiven']),anchor);
        await page.locator('.popup-close').click();await popup.waitFor({state:'detached'});
        await page.goto(`${origin}/books/dark-angels/reader.html?view=${view}#army-rule-oath-of-moment`);
        await page.waitForFunction(()=>Boolean(window.DG_APP?.popups));
        await page.locator(`#army-rule-oath-of-moment button[data-term="${oathId}"]`).click();
        await page.locator(`.term-popup[data-popup-term="${oathId}"]`).waitFor({state:'visible'});
        assert.deepEqual(errors,[],`${view}: no runtime exceptions`);
        console.log(`DA browser ${view}: The Unforgiven full popup + SM-owned Oath control passed`);
      }finally{await context.close();}
    }
  }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
}
console.log('DA The Unforgiven discoverability QA passed');
