import {launchChromium} from './helpers/browser-launch.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {createReaderAnchorValidator,isAutoPublishedRulePath} from '../glossary/tools/reader-path-contract.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const hash=value=>createHash('sha256').update(value).digest('hex');
const clean=value=>String(value).replace(/\s+/g,' ').trim();
const load=(p,key)=>{const scope={window:{}};vm.runInNewContext(read(p),scope);return JSON.parse(JSON.stringify(scope.window[key]));};
const valid=createReaderAnchorValidator(root);
const generated='books/chaos-space-marines/reader.html#masters-of-the-maelstrom-keywords';
const wrongBook='books/space-marines/reader.html#masters-of-the-maelstrom-keywords';
const validUnpublished='books/death-guard/reader.html#enhancement-daemon-weapon-of-nurgle';
const published='books/death-guard/reader.html#unit-typhus';
const frozenDg={count:54,hash:'69f1226824ecce4d5da96a1ee5c2ecd6e458bfbdb9e086b7d801946f6f7219ba'};

function navigationOracle(check=valid){
  assert.equal(check('books/chaos-space-marines/reader.html#main'),true,'VALID_STATIC');
  assert.equal(check(generated),true,'VALID_GENERATED_TARGET');
  assert.equal(check('books/space-marines/reader.html#captain-titus-profile'),true,'SM generated control');
  assert.equal(check('books/emperors-children/reader.html#fulgrim-abilities'),true,'EC generated control');
  assert.equal(check('books/chaos-space-marines/reader.html#ra07-nonexistent-anchor'),false,'MISSING_TARGET');
  assert.equal(check(wrongBook),false,'WRONG_BOOK_TARGET');
  assert.equal(check('../outside.html#main'),false,'unsafe path rejected');
  assert.equal(check(validUnpublished),true,'VALID_BUT_NOT_AUTO_PUBLISHED navigation');
  assert.equal(check(published),true,'VALID_AND_AUTO_PUBLISHED navigation');
}

function publicationOracle(eligible=isAutoPublishedRulePath){
  const context=JSON.parse(read('glossary/contexts/death-guard.json')).terms;
  const registry=JSON.parse(read('glossary/registry.en.json')).terms;
  const pairs=Object.values(context).filter(t=>t.navigation?.rule).flatMap(t=>{
    const candidate='books/death-guard/reader.html#'+t.navigation.rule;
    return eligible(root,candidate)?[[t.termId,candidate]]:[];
  }).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  assert.equal(pairs.length,frozenDg.count,'DG publication freeze count');
  assert.equal(hash(JSON.stringify(pairs)),frozenDg.hash,'DG publication freeze exact canonical-ID/path mapping');
  assert.ok(context['pact-of-decay'],'Pact of Decay must be registered by the canonical DG adapter');
  assert.equal(context['pact-of-decay'].termId,'death-guard-army-rules-pact-of-decay','Pact of Decay must retain its canonical DG identity');
  assert.equal(context['pact-of-decay'].curated,undefined,'Pact of Decay must not retain previous generated curation metadata');
  assert.equal(eligible(root,validUnpublished),false,'validity must not imply publication');
  assert.equal(eligible(root,published),true,'existing publication eligibility preserved');
  for(const book of ['core-rules','adeptus-mechanicus','emperors-children','space-marines','tau-empire','tyranids','blood-angels','dark-angels']){
    const entries=Object.values(JSON.parse(read(`glossary/contexts/${book}.json`)).terms);
    assert.ok(entries.length,`${book}: generated context must not be empty`);
    for(const entry of entries)assert.ok(registry[entry.termId],`${book}/${entry.termId}: generated context must resolve to a canonical term`);
  }
}

function coverageOracle(registry=JSON.parse(read('glossary/registry.en.json')).terms){
  const terms=load('books/chaos-space-marines/scripts/data.js','DG_TERMS');
  const context=JSON.parse(read('glossary/contexts/chaos-space-marines.json')).terms;
  const ids=Object.keys(terms).sort();
  assert.ok(ids.length,'published CSM source inventory must not be empty');
  assert.deepEqual(Object.keys(registry).filter(id=>id.startsWith('chaos-space-marines-')).sort(),ids,'CSM exact eligible coverage, no ID collisions');
  for(const id of ids){
    const term=registry[id],source=terms[id];
    assert.equal(term.id,id,id+': canonical identity');
    assert.equal(term.scope,'chaos-space-marines',id+': scope');
    assert.equal(term.title.en,source.title,id+': title');
    assert.equal(context[id].termId,id,id+': context identity');
    if(source.rule){assert.equal(term.fullRulePath,'books/chaos-space-marines/reader.html#'+source.rule,id+': exact owner path');assert.equal(valid(term.fullRulePath),true,id+': strict anchor');}
  }
  assert.equal(registry['chaos-space-marines-model-keywords-garlon-souleater'].definition.en,'Garlon Souleater only: PSYKER.','scoped model identity remains explicit');
  assert.deepEqual(registry['chaos-space-marines-weapon-reductor-array'].structured.weapon,{Range:'Melee',A:'6',WS:'3+',S:'4',AP:'-2',D:'1'},'existing exact structured profile');
  assert.equal(Object.keys(registry).some(id=>id.startsWith('orks-')),false,'unsupported Orks never registered');
  return {registry,terms};
}

function malformedControls(){
  const shellPath=path.resolve(root,'books/chaos-space-marines/reader.html'),dataPath=path.resolve(root,'books/chaos-space-marines/scripts/target-data.js');
  const shell=read('books/chaos-space-marines/reader.html'),catalog=load('books/chaos-space-marines/scripts/target-data.js','WH_ARMY_BOOK_TARGETS');
  const checkWith=(html,data)=>createReaderAnchorValidator(root,{...fs,readFileSync:(p,enc)=>path.resolve(p)===shellPath?html:path.resolve(p)===dataPath?data:fs.readFileSync(p,enc)});
  const broken=JSON.parse(JSON.stringify(catalog));broken.owners['ra07-phantom']='unit-masters-of-the-maelstrom';
  assert.equal(checkWith(shell,'window.WH_ARMY_BOOK_TARGETS=Object.freeze('+JSON.stringify(broken)+');')('books/chaos-space-marines/reader.html#ra07-phantom'),false,'metadata-only anchor must fail');
  assert.equal(checkWith(shell,'invalid catalog')(generated),false,'malformed generated catalog must fail');
  assert.equal(checkWith(shell.replace('./scripts/target-data.js','../space-marines/scripts/target-data.js'),read('books/chaos-space-marines/scripts/target-data.js'))(generated),false,'foreign catalog wiring must fail');
  const fake=shell+'<!-- <div id="ra07-fake"></div> --><span data-nav-id="ra07-fake"></span><script>const sample=\'<i id="ra07-fake"></i>\';</script>';
  assert.equal(checkWith(fake,read('books/chaos-space-marines/scripts/target-data.js'))('books/chaos-space-marines/reader.html#ra07-fake'),false,'comments, script text and navigation metadata are not real anchors');
}

function mutations(){
  const kill=(name,fn,pattern)=>{let failure;try{fn();}catch(e){failure=e;}assert.ok(failure,name+': SURVIVED');assert.match(failure.message,pattern,name+': intended contract');console.log(name+': KILLED ('+failure.message.split('\n')[0]+')');};
  kill('S1',()=>publicationOracle((unused,p)=>valid(p)),/DG publication freeze/);
  kill('S2',()=>navigationOracle(p=>isAutoPublishedRulePath(root,p)),/VALID_GENERATED_TARGET/);
  kill('S3',()=>navigationOracle(p=>p===wrongBook?valid(generated):valid(p)),/WRONG_BOOK_TARGET/);
  console.log('Anchor/publication mutations: 3/3; isolated function substitutions only');
}

async function browserChecks({registry}){
  const browser=await launchChromium();
  const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
  const server=createServer((req,res)=>{try{if(req.url==='/favicon.ico'){res.writeHead(204).end();return;}let p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));assert.ok(p.startsWith(root+path.sep));if(fs.statSync(p).isDirectory())p=path.join(p,'index.html');res.setHeader('Content-Type',types[path.extname(p)]||'application/octet-stream');fs.createReadStream(p).pipe(res);}catch{res.writeHead(404).end();}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port,context=await browser.newContext({serviceWorkers:'block',viewport:{width:1100,height:850}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const cases=[
    ['chaos-space-marines','unit-masters-of-the-maelstrom','chaos-space-marines-ability-fleet-command','h5 > button'],
    ['chaos-space-marines','unit-masters-of-the-maelstrom','chaos-space-marines-weapon-reductor-array','[data-source-field="name"] > button'],
    ['chaos-space-marines','detachment-cabal-of-chaos','chaos-space-marines-detachment-rule-empyric-wellspring','h4 > button'],
    ['chaos-space-marines','detachment-cabal-of-chaos','chaos-space-marines-enhancement-touched-by-the-warp','h4 > button'],
    ['chaos-space-marines','unit-masters-of-the-maelstrom','chaos-space-marines-ability-choice-samples','h5 > button'],
    ['chaos-space-marines','unit-masters-of-the-maelstrom','chaos-space-marines-model-keywords-garlon-souleater','[data-roster-model-id] > button'],
    ['emperors-children','detachment-court-of-the-phoenician','emperors-children-detachment-rule-master-of-the-pageant','h4 > button'],
    ['space-marines','unit-captain-titus','space-marines-ability-press-the-attack','h5 > button']
  ];
  try{
    for(const [book,owner,id,structure] of cases){
      await page.goto(base+'/books/'+book+'/reader.html?view=mobile#'+owner);
      await page.waitForFunction(()=>Boolean(window.DG_APP?.fullEntry));
      const heading=page.locator('#'+owner+' '+structure+'[data-term="'+id+'"]');
      await heading.waitFor({state:'visible'});
      assert.equal(await heading.count(),1,id+': exact published heading, excluding body auto-links');
      await page.evaluate(id=>DG_APP.fullEntry.open(id),id);
      await page.locator('.full-entry-layer:not([hidden])').waitFor({state:'visible'});
      assert.equal(await page.locator('#fullEntryTitle').getAttribute('data-term'),id);
      assert.equal(await page.locator('#fullEntryTitle').innerText(),registry[id].title.en);
      if(registry[id].structured?.weapon){
        const profile=await page.locator('.full-entry-profile > div').evaluateAll(cells=>Object.fromEntries(cells.map(cell=>[cell.querySelector('small').textContent,cell.querySelector('strong').textContent])));
        assert.deepEqual(profile,registry[id].structured.weapon,id+': full structured profile');
      }else assert.equal(clean(await page.locator('.full-entry-definition').innerText()),clean(registry[id].definition.en),id+': complete definition');
      console.log('FULL_ENTRY PASS '+id);
    }
    assert.deepEqual(errors,[],'no application exceptions');
  }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
}

navigationOracle();publicationOracle();malformedControls();const state=coverageOracle();
console.log(`Glossary navigation/publication split: static + generated + negatives + source-derived contexts + ${Object.keys(state.terms).length} CSM terms PASS`);
if(process.argv.includes('--mutations'))mutations();
if(process.argv.includes('--browser'))await browserChecks(state);
