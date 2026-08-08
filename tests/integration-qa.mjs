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
  {id:'tau-empire',phone:'breacher-team.html',matrix:'books/tau-empire/generated/compatible-rules.json'}
];

for(const book of books){
  const entry=`books/${book.id}/index.html`;
  const reader=`books/${book.id}/reader.html`;
  const phone=`books/${book.id}/mobile/${book.phone}`;
  check(`${book.id} public routes exist`,exists(entry)&&exists(reader)&&exists(phone));
  check(`${book.id} is linked from the Library`,library.includes(`books/${book.id}/`));

  const readerHtml=read(reader);
  const phoneHtml=read(phone);
  check(`${book.id} exposes roster-aware production paths`,/scripts\/roster-filter\.js\?v=\d+/.test(readerHtml)&&/mobile\.js\?v=\d+/.test(phoneHtml));
  if(book.matrix)check(`${book.id} Compatible Rules matrix exists`,exists(book.matrix));
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
