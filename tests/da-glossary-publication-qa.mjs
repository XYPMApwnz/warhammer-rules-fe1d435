import {launchChromium} from './helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {registerHooks} from 'node:module';
import {spawnSync} from 'node:child_process';
import {createServer} from 'node:http';
import {createReaderAnchorValidator} from '../glossary/tools/reader-path-contract.mjs';

const file=fileURLToPath(import.meta.url),root=path.resolve(path.dirname(file),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const normalizeEol=text=>text.replace(/\r\n/g,'\n');
const json=p=>JSON.parse(read(p));
const load=p=>{const scope={window:{}};vm.runInNewContext(read(p),scope);return scope.window;};
const representative='dark-angels-weapon-heavy-bolt-pistol';
const navigationOnly='w18b-navigation-only';
const runtime=load('books/dark-angels/scripts/data.js').DG_TERMS;
const registry=json('glossary/registry.en.json').terms;
const aliases=json('glossary/aliases.en.json').aliases;
const context=json('glossary/contexts/dark-angels.json').terms;
const dependencyIds=json('books/dark-angels/book.config.json').dependencies;
const inherited=id=>dependencyIds.some(book=>id.startsWith(book+'-'));

function coverage(terms,bookContext,termAliases){
  assert.ok(terms[representative],'DA_GLOBAL_REGRESSION: Heavy Bolt Pistol must resolve');
  assert.deepEqual(Object.keys(bookContext).sort(),Object.keys(runtime).sort(),'context covers precisely source-backed runtime concepts');
  for(const [id,local] of Object.entries(runtime)){
    const canonical=terms[termAliases[id]||id];assert.ok(canonical,`${id}: global resolution`);
    assert.equal(bookContext[id].termId,canonical.id);
    if(inherited(id)){
      assert.notEqual(canonical.scope,'dark-angels',`${id}: dependency owns the definition`);
      assert.deepEqual(canonical,registry[canonical.id],`${id}: dependency canonical content unchanged`);
    }else{
      assert.equal(canonical.scope,'dark-angels');assert.equal(canonical.title.en,local.title);
      assert.ok(canonical.definition.en.trim());
      assert.equal(canonical.fullRulePath,`books/dark-angels/reader.html#${local.rule}`);
    }
  }
  assert.ok(!Object.values(terms).some(term=>term.scope==='orks'),'unsupported Orks remains unpublished');
}

// Run the real producer with in-memory output capture. A valid static navigation
// target has no concept record and must not acquire a global entry. Cache writing
// is outside this focused contract and is never invoked, including in mutations.
if(process.argv.includes('--probe')){
  const mutation=process.argv.find(arg=>arg.startsWith('--mutation='))?.split('=')[1];
  const originalRead=fs.readFileSync,outputs=new Map();
  fs.readFileSync=function(p,...args){
    const value=originalRead.call(this,p,...args);
    if(path.resolve(String(p))===path.join(root,'books/dark-angels/reader.html')){
      const source=value.toString().replace('</body>',`<aside id="${navigationOnly}"></aside></body>`);
      return typeof value==='string'?source:Buffer.from(source);
    }
    return value;
  };
  assert.equal(createReaderAnchorValidator(root)(`books/dark-angels/reader.html#${navigationOnly}`),true);
  fs.mkdirSync=()=>{};
  fs.writeFileSync=(p,data)=>{
    const relative=path.relative(root,String(p)).replaceAll('\\','/');
    assert.ok(relative.startsWith('glossary/')&&!relative.includes('cache-revision'),'producer output boundary');
    outputs.set(relative,String(data));
  };
  registerHooks({load(url,options,nextLoad){
    if(url.endsWith('/tools/cache-revision.mjs'))return{format:'module',shortCircuit:true,source:'export function writeCacheRevision(){}'};
    const result=nextLoad(url,options);
    if(url.endsWith('/glossary/tools/build-glossary.mjs')&&mutation){
      let source=String(result.source);
      if(mutation==='omit-registration')source=source.replace("'blood-angels','dark-angels']","'blood-angels']");
      else if(mutation==='publish-navigation'){
        // Deliberately promote every static DA reader id to a glossary concept.
        source=source.replace("writeJson(path.join(glossaryRoot,'registry.en.json'),registryDocument);",`
          for(const match of fs.readFileSync(path.join(root,'books/dark-angels/reader.html'),'utf8').matchAll(/\\bid="([^"]+)"/g)){
            const id=match[1];registryDocument.terms[id]||={...registryDocument.terms['${representative}'],id};
          }
          writeJson(path.join(glossaryRoot,'registry.en.json'),registryDocument);`);
      }else throw new Error('Unknown focused mutation: '+mutation);
      assert.notEqual(source,String(result.source),'mutation must hit its intended owner');
      return{...result,source};
    }
    return result;
  }});
  await import(pathToFileURL(path.join(root,'glossary/tools/build-glossary.mjs')).href);
  const built=JSON.parse(outputs.get('glossary/registry.en.json')).terms;
  assert.ok(!built[navigationOnly]&&!built['dark-angels-'+navigationOnly],'NAVIGATION_IS_NOT_PUBLICATION');
  const builtContext=JSON.parse(outputs.get('glossary/contexts/dark-angels.json')||'{"terms":{}}').terms;
  coverage(built,builtContext,JSON.parse(outputs.get('glossary/aliases.en.json')).aliases);
  for(const [relative,value] of outputs)assert.equal(normalizeEol(value),normalizeEol(read(relative)),`${relative}: authoritative generated output is current`);
  console.log('DA publication producer probe PASS: navigation-only target excluded; generated outputs current');
}else{
  coverage(registry,context,aliases);
  const api=load('glossary/generated/glossary.en.js').WH40K_GLOSSARY;
  for(const id of Object.keys(runtime))assert.ok(api.get(id),`${id}: browser runtime resolution`);
  const profile=api.get(representative).structured.weapon;
  assert.deepEqual(Object.keys(profile).sort(),['A','AP','Abilities','BS','D','Range','S']);
  assert.equal(profile.Range,runtime[representative].summary.split(' · ')[1]);
  assert.equal(profile.Abilities,runtime[representative].summary.split(' · ').at(-1));
  for(const [key,value] of Object.entries(profile))if(!['Range','Abilities'].includes(key))assert.ok(runtime[representative].summary.includes(`${key} ${value}`),`${key}: source profile value`);
  const probe=spawnSync(process.execPath,[file,'--probe'],{cwd:root,encoding:'utf8',maxBuffer:20e6});
  assert.equal(probe.status,0,probe.stdout+probe.stderr);
  process.stdout.write(probe.stdout);
  if(process.argv.includes('--mutations'))for(const [mutation,marker] of [['omit-registration','DA_GLOBAL_REGRESSION'],['publish-navigation','NAVIGATION_IS_NOT_PUBLICATION']]){
    const result=spawnSync(process.execPath,[file,'--probe','--mutation='+mutation],{cwd:root,encoding:'utf8',maxBuffer:20e6});
    assert.notEqual(result.status,0,`${mutation}: must fail`);
    assert.ok(result.stderr.includes(marker),result.stderr);
    assert.ok(!result.stdout.includes('PASS'),`${mutation}: no false PASS`);
    console.log(`${mutation}: killed, exit ${result.status}, ${marker}, no PASS`);
  }
  if(process.argv.includes('--browser')){
    const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'};
    const server=createServer((req,res)=>{try{
      if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}
      const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
      assert.ok(target.startsWith(root+path.sep));
      res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(fs.readFileSync(target));
    }catch{res.writeHead(404).end();}});
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;
    try{
      browser=await launchChromium();
      for(const [view,width] of [['full',1280],['mobile',390]]){
        const browserContext=await browser.newContext({serviceWorkers:'block',viewport:{width,height:844}});
        try{
          const page=await browserContext.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
          page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
          await page.goto(`http://127.0.0.1:${server.address().port}/books/dark-angels/reader.html?view=${view}#unit-asmodai`);
          await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));
          await page.locator(`#unit-asmodai button[data-term="${representative}"]`).first().click();
          await page.locator(`.term-popup[data-popup-term="${representative}"]`).waitFor({state:'visible'});
          await page.evaluate(id=>DG_APP.fullEntry.open(id),representative);
          await page.locator('.full-entry-layer').waitFor({state:'visible'});
          assert.equal(await page.locator('#fullEntryTitle').innerText(),runtime[representative].title);
          const content=await page.locator('[data-full-entry-content]').innerText();
          for(const value of Object.values(profile))assert.ok(content.includes(String(value)),`${view}: complete weapon profile`);
          assert.ok(content.includes('Pistol'),`${view}: weapon ability text`);
          const renderedProfile=await page.locator('.full-entry-profile > div').evaluateAll(cells=>Object.fromEntries(cells.map(cell=>[cell.querySelector('small').textContent,cell.querySelector('strong').textContent])));
          assert.deepEqual(renderedProfile,JSON.parse(JSON.stringify(profile)),`${view}: exact stats and abilities`);
          assert.equal(await page.locator('.full-entry-definition,.full-entry-summary').count(),0,`${view}: no duplicate profile body`);
          assert.deepEqual(errors,[],`${view}: no runtime exceptions`);
          console.log(`DA browser ${view}: actual Asmodai Heavy Bolt Pistol full-entry PASS`);
        }finally{await browserContext.close();}
      }
    }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
  }
  console.log(`DA publication QA PASS: ${Object.keys(runtime).filter(id=>!inherited(id)).length} local concepts; ${Object.keys(runtime).filter(inherited).length} dependency contexts`);
}
