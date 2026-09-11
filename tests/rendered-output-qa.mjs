import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {recordText} from '../books/core-rules/content/record-content.mjs';
import {createArmyBookTargetCatalog,parseArmyBookTargetCatalog} from '../books/shared/tools/build-army-book-targets.mjs';
import {collectMobileStubRoutes} from '../books/shared/tools/build-mobile-stubs.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const glossary=JSON.parse(fs.readFileSync(path.join(root,'glossary','registry.en.json'),'utf8')).terms;
const aliases=JSON.parse(fs.readFileSync(path.join(root,'glossary','aliases.en.json'),'utf8')).aliases;
const knownTerms=new Set([...Object.keys(glossary),...Object.keys(aliases)]);
const errors=[];

function walk(directory){
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    const target=path.join(directory,entry.name);
    if(entry.isDirectory())return entry.name==='tmp'||entry.name==='node_modules'?[]:walk(target);
    return entry.name.endsWith('.html')?[target]:[];
  });
}

// Library cards are the publication boundary; a book directory alone is not support.
const library=fs.readFileSync(path.join(root,'index.html'),'utf8');
const publishedBooks=[];
for(const match of library.replace(/<!--[\s\S]*?-->/g,'').matchAll(/<a\b[^>]*>/gi)){
  const classes=/\bclass=["']([^"']*)["']/.exec(match[0])?.[1].split(/\s+/)||[];
  if(!classes.includes('book'))continue;
  const href=/\bhref=["']([^"']+)["']/.exec(match[0])?.[1];
  assert.ok(href,'Library book card is missing href');
  const book=/^books\/([^/]+)\//.exec(href)?.[1];
  if(!book)continue; // Roster Guides is a Library tool card, checked below.
  assert.ok(!publishedBooks.includes(book),`Library repeats book ${book}`);
  publishedBooks.push(book);
}
assert.ok(publishedBooks.length,'Library has no published books');
const htmlFiles=[
  path.join(root,'index.html'),
  ...publishedBooks.flatMap(book=>walk(path.join(root,'books',book))),
  ...walk(path.join(root,'glossary')),
  ...walk(path.join(root,'roster-guides'))
];
const required=new Set(htmlFiles),surfaces=htmlFiles.map(file=>({key:file,file,html:fs.readFileSync(file,'utf8'),page:true}));
const renderedReaders=new Map(),coverage=[];
for(const book of publishedBooks){
  if(book==='core-rules')continue; // Core Rules publishes static reader pages, already enumerated.
  const relative=`books/${book}/reader.html`,file=path.join(root,relative),reader=fs.readFileSync(file,'utf8');
  const requirePage=relative=>{const expected=path.join(root,relative);assert.ok(fs.existsSync(expected),`Missing supported target: ${relative}`);required.add(expected);};
  requirePage(`books/${book}/index.html`);requirePage(relative);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,`books/${book}/book.config.json`),'utf8')).id,book,`${book}: config identity`);
  const scripts=[...reader.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
  assert.equal(scripts.filter(src=>src==='./scripts/target-data.js').length,1,`${book}: required target catalog wiring`);
  assert.equal(scripts.filter(src=>src==='../shared/target-mount.js').length,1,`${book}: required target mount wiring`);
  const catalogPath=`books/${book}/scripts/target-data.js`;
  assert.ok(fs.existsSync(path.join(root,catalogPath)),`Missing supported target catalog: ${catalogPath}`);
  const catalog=parseArmyBookTargetCatalog(fs.readFileSync(path.join(root,catalogPath),'utf8'));
  const host=/<([a-z][\w:-]*)\b[^>]*\bclass="[^"]*\bdocument\b[^"]*"[^>]*>\s*<\/\1>/g;
  assert.equal([...reader.matchAll(host)].length,1,`${book}: canonical empty document host`);
  const full=reader.replace(host,(match,tag)=>match.replace(new RegExp('</'+tag+'>$'),()=>catalog.html+'</'+tag+'>'));
  const derived=createArmyBookTargetCatalog(full);
  for(const id of Object.keys(derived.targets))assert.ok(Object.hasOwn(catalog.targets,id),`Missing supported mounted target: ${relative}#${id}`);
  assert.deepEqual(catalog.targets,derived.targets,`${book}: mounted target ranges differ from rendered content and reader TOC`);
  assert.deepEqual(catalog.owners,derived.owners,`${book}: mounted anchor ownership`);
  assert.deepEqual(catalog.nodes,derived.nodes,`${book}: mounted navigation completeness`);
  renderedReaders.set(file,full);
  const fullKey=`${file}#full`;required.add(fullKey);surfaces.push({key:fullKey,file,html:full,page:true});
  for(const id of Object.keys(derived.targets))required.add(`${file}#${id}`);
  for(const [id,target] of Object.entries(catalog.targets))surfaces.push({key:`${file}#${id}`,file,html:catalog.html.slice(target.start,target.end),page:false});
  // Read the declarative spec without importing its writing CLI entry point.
  const mobileSource=fs.readFileSync(path.join(root,`books/${book}/mobile/build.mjs`),'utf8');
  const specMatch=/await runMobileStubBuilder\(import\.meta\.url,([\s\S]*)\);/.exec(mobileSource);
  assert.ok(specMatch,`${book}: mobile route build contract is not discoverable`);
  const spec=vm.runInNewContext('('+specMatch[1]+')');
  const routes=collectMobileStubRoutes(catalog,spec);
  for(const route of routes){
    const relative=`books/${book}/mobile/${route.file}`;requirePage(relative);
    const html=fs.readFileSync(path.join(root,relative),'utf8');
    assert.ok(html.includes('data-canonical-reader="../reader.html"')&&html.includes(`data-canonical-target="${route.target}"`),`${relative}: missing canonical redirect to ${route.target}`);
  }
  coverage.push({book,pages:htmlFiles.filter(file=>file.startsWith(path.join(root,'books',book)+path.sep)).length,mounted:Object.keys(derived.targets).length,routes:routes.length});
}
const checked=new Set();
for(const surface of surfaces){
  const {file,html,page}=surface;
  const relative=path.relative(root,surface.key).replaceAll('\\','/');
  checked.add(surface.key);
  if(page&&!/<html\b[^>]*\blang="en"/i.test(html))errors.push(`${relative}: missing lang="en"`);
  if(/[\u0400-\u04ff]|\ufffd/.test(html))errors.push(`${relative}: non-English or damaged visible text`);

  const ids=[...html.matchAll(/(?:^|\s)id="([^"]+)"/g)].map(match=>match[1]);
  for(const id of ids.filter((id,index)=>ids.indexOf(id)!==index))errors.push(`${relative}: duplicate id ${id}`);
  for(const termId of [...html.matchAll(/\bdata-term="([^"]+)"/g)].map(match=>match[1]))if(!knownTerms.has(termId))errors.push(`${relative}: unknown glossary term ${termId}`);

  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const value=match[1];
    if(!value||/^(?:[a-z]+:|\/\/)/i.test(value)||value.startsWith('data:'))continue;
    const [rawPath,fragment='']=value.split('#',2);
    const cleanPath=rawPath.split('?')[0];
    const target=cleanPath?path.resolve(path.dirname(file),decodeURIComponent(cleanPath)):file;
    const resolved=fs.existsSync(target)&&fs.statSync(target).isDirectory()?path.join(target,'index.html'):target;
    if(!fs.existsSync(resolved)){errors.push(`${relative}: broken local asset ${value}`);continue;}
    if(fragment&&resolved.endsWith('.html')&&!resolved.endsWith(path.join('glossary','index.html'))){
      const targetHtml=renderedReaders.get(resolved)||(resolved===file&&page?html:fs.readFileSync(resolved,'utf8'));
      if(!targetHtml.includes(`id="${decodeURIComponent(fragment)}"`))errors.push(`${relative}: missing anchor ${value}`);
    }
  }
}
for(const key of required)if(!checked.has(key))errors.push(`Missing rendered-output QA coverage: ${path.relative(root,key).replaceAll('\\','/')}`);

const digital=JSON.parse(fs.readFileSync(path.join(root,'books','core-rules','content','core-rules.digital-11e.json'),'utf8'));
for(const record of digital.records){
  const text=`${record.title}\n${recordText(record)}`;
  const openings=(text.match(/</g)||[]).length,closings=(text.match(/>/g)||[]).length;
  if(openings!==closings)errors.push(`Core Rules ${record.code}: unmatched angle bracket`);
}

assert.equal(errors.length,0,errors.join('\n'));
console.log(`Rendered output QA passed: ${htmlFiles.length} public pages, ${coverage.length} Army Books, ${coverage.reduce((sum,item)=>sum+item.mounted,0)} mounted targets, ${knownTerms.size} glossary IDs.`);
for(const item of coverage)console.log(`${item.book}: ${item.pages} pages; full reader; ${item.mounted} mounted targets; ${item.routes} mobile routes.`);
