import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books={
  'death-guard':{routes:48,armyRules:'core-rules'},
  'adeptus-mechanicus':{routes:47,armyRules:'core-rules'},
  'tau-empire':{routes:49,armyRules:'army-rules'},
  'emperors-children':{routes:36,armyRules:'army-rules'},
  tyranids:{routes:63,armyRules:'army-rules'},
  'chaos-space-marines':{routes:74,armyRules:'army-rules'},
  'space-marines':{routes:127,armyRules:'army-rules'},
  'dark-angels':{routes:125,armyRules:'army-rules'},
  'blood-angels':{routes:124,armyRules:'army-rules'}
};
const publicRoutes=new Set();
let total=0;
for(const [book,spec] of Object.entries(books)){
  const bookRoot=path.join(root,'books',book),reader=fs.readFileSync(path.join(bookRoot,'reader.html'),'utf8'),mobile=path.join(bookRoot,'mobile'),files=fs.readdirSync(mobile).filter(file=>file.endsWith('.html')).sort(),wrapper=fs.readFileSync(path.join(mobile,'build.mjs'),'utf8');
  assert.equal(files.length,spec.routes,`${book}: compatibility route count`);
  assert.match(wrapper,/shared\/tools\/build-mobile-stubs\.mjs/,`${book}: shared builder delegation is missing`);
  assert.match(wrapper,/runMobileStubBuilder\(import\.meta\.url/,`${book}: shared builder entry point is missing`);
  assert.doesNotMatch(wrapper,/\b(?:readFile|writeFile|readdir|matchAll)\b/,`${book}: book-local builder still contains generation logic`);
  for(const file of files){
    const publicPath=`books/${book}/mobile/${file}`;assert.equal(publicRoutes.has(publicPath),false,`duplicate route ownership: ${publicPath}`);publicRoutes.add(publicPath);
    const html=fs.readFileSync(path.join(mobile,file),'utf8'),target=html.match(/data-canonical-target="([^"]+)"/)?.[1];
    assert.match(html,/data-canonical-reader="\.\.\/reader\.html"/,`${publicPath}: canonical reader metadata`);
    assert.ok(target&&reader.includes(`id="${target}"`),`${publicPath}: missing canonical target ${target||'(none)'}`);
    const fixedTarget=file==='index.html'?'start':file==='army-rules.html'?spec.armyRules:null;
    if(fixedTarget)assert.equal(target,fixedTarget,`${publicPath}: fixed route target`);
    assert.equal((html.match(/mobile-route-redirect\.js\?v=1/g)||[]).length,1,`${publicPath}: shared redirect runtime`);
    assert.doesNotMatch(html,/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=|mobile\.(?:js|css)|phone-popup-controller/,`${publicPath}: duplicated content or legacy runtime`);
  }
  assert.match(reader,/<article\b[^>]*\bclass="[^"]*\bunit-card\b/,`${book}: canonical reader lost content ownership`);
  total+=files.length;
}
assert.equal(total,693,'9-book compatibility route inventory');

const redirect=fs.readFileSync(path.join(root,'books/shared/mobile-route-redirect.js'),'utf8');
const destinationFor=(url,target)=>{const parsed=new URL(url);let replaced='';vm.runInNewContext(redirect,{document:{documentElement:{dataset:{canonicalReader:'../reader.html',canonicalTarget:target}}},location:{href:parsed.href,search:parsed.search,hash:parsed.hash,replace:value=>{replaced=value;}},URL});return replaced;};
const explicit=new URL(destinationFor('https://local/books/tau-empire/mobile/cadre-fireblade.html?roster=r1&instance=i2&extra=ok&view=mobile#cadre-fireblade-abilities','unit-cadre-fireblade'));
assert.equal(explicit.pathname,'/books/tau-empire/reader.html');assert.equal(explicit.searchParams.get('roster'),'r1');assert.equal(explicit.searchParams.get('instance'),'i2');assert.equal(explicit.searchParams.get('extra'),'ok');assert.equal(explicit.searchParams.has('view'),false);assert.equal(explicit.hash,'#cadre-fireblade-abilities');
const fallback=new URL(destinationFor('https://local/books/blood-angels/mobile/sanguinary-priest.html?roster=r2&instance=i3','unit-sanguinary-priest'));
assert.equal(fallback.pathname,'/books/blood-angels/reader.html');assert.equal(fallback.searchParams.get('roster'),'r2');assert.equal(fallback.searchParams.get('instance'),'i3');assert.equal(fallback.hash,'#unit-sanguinary-priest');

const tauConfig=JSON.parse(fs.readFileSync(path.join(root,'books/tau-empire/book.config.json'),'utf8'));
assert.equal(tauConfig.customIndex,undefined,'T\'au customIndex escape hatch remains');
assert.equal(tauConfig.entryRoute,'canonical-reader-redirect','T\'au declarative entry route is missing');
const spaceMarinesConfig=JSON.parse(fs.readFileSync(path.join(root,'books/space-marines/book.config.json'),'utf8'));
assert.deepEqual(spaceMarinesConfig.relatedRulesOwnership,{mode:'authoritative-runtime-source',path:'mobile/related-rules.inc'},'Space Marines Related Rules ownership is not explicit');
assert.equal(fs.existsSync(path.join(root,'books/space-marines/mobile/related-rules.inc')),true,'Space Marines authoritative Related Rules source is missing');
assert.equal(fs.existsSync(path.join(root,'books/space-marines/mobile/related-rules.source.inc')),false,'Space Marines still has split Related Rules ownership');
console.log(`Mobile compatibility routing QA passed: ${Object.keys(books).length} books, ${total} content-free routes, one shared builder and preserved query/hash/instance semantics.`);
