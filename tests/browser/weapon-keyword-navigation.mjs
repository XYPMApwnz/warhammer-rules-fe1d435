import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {launchChromium} from '../helpers/browser-launch.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=createServer((request,response)=>{try{
  if(request.url==='/favicon.ico'){response.writeHead(204).end();return;}
  let file=path.resolve(root,'.'+decodeURIComponent(new URL(request.url,'http://local').pathname));
  assert(file.startsWith(root+path.sep));if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(response);
}catch{response.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await launchChromium();

async function openBook(page,book,unit){
  await page.goto(`${origin}/books/${book}/reader.html?view=full#${unit}`);
  await page.waitForFunction(()=>Boolean(window.DG_APP?.popups&&window.WH40K_GLOSSARY));
}

async function weaponControl(page,{book,unit,weapon,tag,term}){
  await openBook(page,book,unit);
  const row=page.locator(`#${unit} .weapon-row:not(.weapon-head)`).filter({hasText:weapon}).first();
  const profile=row.locator('.weapon-button');
  const profileId=await profile.getAttribute('data-term');
  assert(profileId&&profileId!==term,`${book}: weapon profile must retain its own identity`);
  const keyword=row.locator('.weapon-tags [data-term]').filter({hasText:new RegExp(`^${tag}$`,'i')}).first();
  assert.equal(await keyword.getAttribute('data-term'),term,`${book}: ${tag} canonical Core identity`);
  await keyword.click();
  const popup=page.locator(`.term-popup[data-popup-term="${term}"]`);await popup.waitFor();
  assert.equal(decodeURIComponent(new URL(await popup.getByRole('link',{name:'Glossary entry'}).getAttribute('href'),page.url()).hash),`#${term}`,`${book}: ${tag} popup/article identity`);
  await popup.locator('.popup-close').click();
  await profile.click();await page.locator(`.term-popup[data-popup-term="${profileId}"]`).waitFor();
  assert.equal(await page.locator('.term-popup').last().getAttribute('data-popup-term'),profileId,`${book}: weapon profile remains separately openable`);
  return profileId;
}

async function sourcePresentationControl(page,{book,unit,term}){
  await openBook(page,book,unit);
  await page.evaluate(id=>window.DG_APP.fullEntry.open(id,document.body),term);
  const meta=page.locator('.full-entry-layer:not([hidden]) .full-entry-meta');await meta.waitFor();
  const text=await meta.innerText();
  assert.doesNotMatch(text,/buildCanonicalBook\s*\(/i,`${book}: raw builder expression`);
  assert.doesNotMatch(text,/\bFULL_CONTENT\b/i,`${book}: raw implementation status`);
  await page.evaluate(()=>window.DG_APP.fullEntry.close({restoreFocus:false}));
}

try{
  for(const viewport of [{name:'desktop',width:1440,height:900},{name:'phone',width:390,height:844}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    await weaponControl(page,{book:'adeptus-mechanicus',unit:'unit-skitarii-rangers',weapon:'Transuranic arquebus',tag:'HEAVY',term:'core::core-heavy'});
    await weaponControl(page,{book:'space-marines',unit:'unit-intercessor-squad',weapon:'Bolt Rifle',tag:'ASSAULT',term:'core::core-assault'});
    await weaponControl(page,{book:'adeptus-mechanicus',unit:'unit-skitarii-rangers',weapon:'Transuranic arquebus',tag:'PRECISION',term:'core::core-precision'});
    await openBook(page,'death-guard','unit-plague-marines');
    const lethal=page.locator('#unit-plague-marines .weapon-tags [data-term="core::core-lethal-hits"]').first();await lethal.waitFor();await lethal.click();
    await page.locator('.term-popup[data-popup-term="core::core-lethal-hits"]').waitFor();
    await sourcePresentationControl(page,{book:'death-guard',unit:'unit-plague-surgeon',term:'army::death-guard::ability::ability-tainted-narthecium-01ba1bd'});
    await sourcePresentationControl(page,{book:'adeptus-mechanicus',unit:'unit-skitarii-rangers',term:'army::adeptus-mechanicus::ability::datasheet-objective-scouted'});
    await sourcePresentationControl(page,{book:'space-marines',unit:'unit-intercessor-squad',term:'army::space-marines::ability::space-marines-ability-hail-of-bolts'});
    await page.goto(`${origin}/glossary/index.html#${encodeURIComponent('army::blood-angels::detachment::angelic-inheritors')}`);await page.locator('body.article-open').waitFor();
    const registry=page.locator('.registry-details');await registry.locator('summary').click();await registry.getByText('Canonical source',{exact:true}).waitFor();
    assert.match(await registry.innerText(),/blood-angels-faction-pack-v1\.1/i,`${viewport.name}: accepted readable source remains visible`);
    assert.doesNotMatch(await registry.innerText(),/buildCanonicalBook\s*\(|\bFULL_CONTENT\b/i,`${viewport.name}: raw implementation metadata in Glossary viewer`);
    assert.deepEqual(errors,[],`${viewport.name}: browser runtime errors`);
    await context.close();
  }
  console.log('Weapon keyword navigation browser QA passed: HEAVY, ASSAULT, PRECISION and LETHAL HITS retain canonical Core identities while weapon profiles remain separate.');
}finally{await browser.close();server.close();}
