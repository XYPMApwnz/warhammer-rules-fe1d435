import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const exists=file=>fs.existsSync(path.join(root,file));
const failures=[];
let passed=0;
const check=(name,condition)=>{
  if(condition){passed++;console.log(`PASS  ${name}`);}
  else failures.push(name);
};

const sharedAssets=[
  'books/shared/navigation-targets.js',
  'books/shared/popup-rule-actions.js',
  'books/shared/datasheet-layout.js',
  'books/shared/popup-content.js',
  'books/shared/rule-facts.js',
  'books/shared/roster-entities.js',
  'books/shared/roster-parser.js',
  'books/shared/roster-enhancements.js'
];
for(const asset of sharedAssets)check(`shared asset exists: ${asset}`,exists(asset));

const library=read('index.html');
const books=[
  {id:'death-guard',phone:'chaos-land-raider.html',matrix:null},
  {id:'adeptus-mechanicus',phone:'skitarii-rangers.html',matrix:'books/adeptus-mechanicus/generated/compatible-rules.json'},
  {id:'tyranids',phone:'hive-tyrant.html',matrix:'books/tyranids/generated/compatible-rules.json'},
  {id:'tau-empire',phone:'breacher-team.html',matrix:'books/tau-empire/generated/compatible-rules.json'},
  {id:'emperors-children',phone:'lord-exultant.html',matrix:'books/emperors-children/generated/compatible-rules.json'},
  {id:'chaos-space-marines',phone:'abaddon-the-despoiler.html',matrix:'books/chaos-space-marines/generated/compatible-rules.json'},
  {id:'space-marines',phone:'intercessor-squad.html',matrix:'books/space-marines/generated/compatible-rules.json',roster:false},
  {id:'dark-angels',phone:'belial.html',matrix:null,roster:false}
];

for(const book of books){
  const entry=`books/${book.id}/index.html`;
  const reader=`books/${book.id}/reader.html`;
  const phone=`books/${book.id}/mobile/${book.phone}`;
  check(`${book.id} public routes exist`,exists(entry)&&exists(reader)&&exists(phone));
  check(`${book.id} is linked from the Library`,library.includes(`books/${book.id}/`));

  const entryHtml=read(entry);
  const readerHtml=read(reader);
  const phoneHtml=read(phone);
  const phoneRuntime=book.singleReader?phoneHtml.includes('new URL("../reader.html"')&&phoneHtml.includes('searchParams.set("view","mobile")'):/mobile\.js\?v=\d+/.test(phoneHtml);
  check(`${book.id} exposes required production paths`,(book.roster===false||/scripts\/roster-filter\.js\?v=\d+/.test(readerHtml))&&phoneRuntime);
  if(book.matrix)check(`${book.id} Compatible Rules matrix exists`,exists(book.matrix));
  if(book.id==='chaos-space-marines'){
    check('chaos-space-marines entry exposes verification status and artwork',entryHtml.includes('Verification build')&&entryHtml.includes('chaos-space-marines-cover-480.webp')&&!entryHtml.includes('class="entry-mark"'));
    check('chaos-space-marines reader preserves current publication inventory',(readerHtml.match(/<article class="unit-card/g)||[]).length===54&&(readerHtml.match(/data-nav-id="detachment-[^"]+"/g)||[]).length===17&&readerHtml.includes('faction-hero-cover'));
    const phoneRoutes=fs.readdirSync(path.join(root,'books/chaos-space-marines/mobile')).filter(file=>file.endsWith('.html'));
    check('chaos-space-marines exposes 74 generated Phone routes',phoneRoutes.length===74&&phoneHtml.includes('id="unit-abaddon-the-despoiler"')&&!phoneHtml.includes('reader.html?view=mobile'));
  }
  if(book.id==='dark-angels'){
    check('dark-angels entry exposes source-limited review status and artwork',entryHtml.includes('Source-limited preview')&&entryHtml.includes('dark-angels-cover-480.webp')&&!entryHtml.includes('class="entry-mark"'));
    check('dark-angels reader exposes one categorized inventory while preserving ownership and source gaps',(readerHtml.match(/<article class="unit-card/g)||[]).length===98&&(readerHtml.match(/Space Marines shared datasheet/g)||[]).length===82&&!readerHtml.includes('data-nav-id="datasheets-dark-angels"')&&!readerHtml.includes('data-nav-id="datasheets-space-marines"')&&readerHtml.includes('data-nav-id="datasheets-epic-heroes"')&&readerHtml.includes('data-nav-id="datasheets-vehicle"')&&(readerHtml.match(/Codex source required/g)||[]).length===3);
    const phoneRoutes=fs.readdirSync(path.join(root,'books/dark-angels/mobile')).filter(file=>file.endsWith('.html'));
    check('dark-angels exposes deterministic generated Phone routes',phoneRoutes.length===109&&phoneHtml.includes('id="unit-belial"')&&!phoneHtml.includes('reader.html?view=mobile'));
  }
}

check('Core Rules route exists and is linked',exists('books/core-rules/index.html')&&library.includes('books/core-rules/'));
check('Roster Guides route exists and is linked',exists('roster-guides/index.html')&&library.includes('roster-guides/'));
check('Mega Glossary route exists and is linked',exists('glossary/index.html')&&library.includes('glossary/'));

const serviceWorker=read('service-worker.js');
const shellUrls=[...serviceWorker.matchAll(/["'](\.\/[^"']+)["']/g)].map(match=>match[1]);
const shellFiles=shellUrls.map(url=>decodeURIComponent(url.split(/[?#]/,1)[0].slice(2)));
check('service worker has a non-empty app shell',shellFiles.length>0);
check('every literal app-shell asset exists',shellFiles.every(exists));
const versionsByFile=new Map();
for(const url of shellUrls){
  const file=url.split(/[?#]/,1)[0];
  if(!versionsByFile.has(file))versionsByFile.set(file,new Set());
  versionsByFile.get(file).add(url);
}
check('app shell has one active URL per asset',[...versionsByFile.values()].every(urls=>urls.size===1));
check('service worker imports the generated cache revision',serviceWorker.includes('./glossary/generated/cache-revision.js'));

assert.equal(failures.length,0,failures.join('\n'));
console.log(`${passed}/${passed} integration checks passed.`);
