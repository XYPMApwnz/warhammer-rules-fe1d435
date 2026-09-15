import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {loadPublicationInventory,selectArmyBookBuildBooks,selectFreshnessOnlyBooks,selectPublicationBooks,validatePublicationInventory} from '../books/shared/tools/publication-inventory.mjs';
import {collectOfflineMobileRoutes} from '../tools/build-offline-mobile-routes.mjs';

const root=path.resolve('.'),inventory=loadPublicationInventory({root});
const ids=field=>selectPublicationBooks(inventory,field).map(book=>book.id);
const supported=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const exactScope=(actual,label)=>assert.deepEqual([...new Set(actual)].sort(),supported.slice().sort(),`${label} diverges from the publication inventory`);
assert.deepEqual(ids('library'),supported);
assert.deepEqual(ids('offline'),supported);
assert.deepEqual(ids('freshness'),[...supported,'orks']);
assert.equal(inventory.books.find(book=>book.id==='orks').library,false,'Orks must remain explicitly outside the public Library');
assert.deepEqual(selectArmyBookBuildBooks(inventory).map(book=>book.id),supported,'Army Book build plan must contain only the nine published books');
assert.deepEqual(selectFreshnessOnlyBooks(inventory).map(book=>book.id),['orks'],'Orks must remain a freshness-only source-status entry');

const libraryHtml=fs.readFileSync(path.join(root,'index.html'),'utf8');
const linked=[...libraryHtml.matchAll(/href="(?:\.\/)?books\/([^/]+)\/index\.html"/g)].map(match=>match[1]).filter(id=>inventory.books.some(book=>book.id===id));
assert.deepEqual([...new Set(linked)].sort(),supported.slice().sort(),'Library cards diverge from publication inventory');
exactScope(linked,'Library cards');

const offlineRoutes=collectOfflineMobileRoutes({root});
exactScope(offlineRoutes.map(route=>route.book),'offline mobile route scope');
assert.equal(offlineRoutes.some(route=>route.book==='orks'),false,'Orks entered actual offline route consumers');
const generatedTargetBooks=inventory.books.filter(book=>{
  const config=JSON.parse(fs.readFileSync(path.join(root,book.config),'utf8'));
  return (config.generatedOutputs||[]).some(output=>output.class==='TARGET_CATALOG');
}).map(book=>book.id);
exactScope(generatedTargetBooks,'generated target-catalog producer scope');
assert.throws(()=>exactScope(supported.slice(1),'missing downstream book mutation'),/diverges from the publication inventory/);
assert.throws(()=>exactScope([...supported,'orks'],'hidden downstream book mutation'),/diverges from the publication inventory/);

const scripts=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).scripts;
assert.equal(scripts['army-books:check'],'npm run publication:check','aggregate Army Book freshness must use the publication inventory');
for(const gate of ['publication:check','wiring:check','cache:check'])assert.match(scripts['test:preview'],new RegExp(`npm run ${gate.replace(':','\\:')}(?: |$)`),`test:preview does not reach ${gate}`);

const missingStructuredClone=structuredClone(inventory);
missingStructuredClone.books.pop();
assert.match(validatePublicationInventory({root,inventory:missingStructuredClone}).join('\n'),/missing=orks/,'unregistered config mutation survived');
const accidentalOrks=structuredClone(inventory);
accidentalOrks.books.find(book=>book.id==='orks').offline=true;
assert.match(validatePublicationInventory({root,inventory:accidentalOrks}).join('\n'),/offline publication requires library publication/,'implicit Orks offline enrollment survived');
const accidentalOrksMobile=structuredClone(inventory);
accidentalOrksMobile.books.find(book=>book.id==='orks').mobile=true;
assert.match(validatePublicationInventory({root,inventory:accidentalOrksMobile}).join('\n'),/mobile output requires library publication/,'implicit Orks mobile enrollment survived');

console.log('Publication inventory QA passed: 10 configured books, 9 public/offline books, Orks explicitly freshness-only, Library cards exact.');
