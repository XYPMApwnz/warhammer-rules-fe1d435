import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const assert=(condition,message)=>{if(!condition)throw new Error(message);};

const sharedStyles=['tokens.css','layout.css','navigation.css','content.css','popups.css','entry.css'];
const sharedControllers=['navigation-controller.js','full-entry-controller.js','popup-controller.js','journey-controller.js','ui-controllers.js','view-router.js'];
for(const file of sharedStyles){assert(fs.existsSync(path.join(root,'books/shared/styles',file)),`Missing shared style: ${file}`);assert(!fs.existsSync(path.join(root,'books/death-guard/styles',file)),`Death Guard still owns shared style: ${file}`);}
for(const file of sharedControllers){assert(fs.existsSync(path.join(root,'books/shared/controllers',file)),`Missing shared controller: ${file}`);assert(!fs.existsSync(path.join(root,'books/death-guard/scripts',file)),`Death Guard still owns shared controller: ${file}`);}

const productionText=[read('service-worker.js'),read('books/shared/tools/build-army-book.mjs'),read('books/adeptus-mechanicus/tools/canonical-build-extension.mjs'),read('books/death-guard/tools/canonical-build-extension.mjs'),...['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels'].flatMap(id=>[read(`books/${id}/reader.html`),read(`books/${id}/index.html`)])].join('\n');
assert(!/death-guard\/(?:styles\/(?:tokens|layout|navigation|content|popups|entry)\.css|scripts\/(?:navigation-controller|full-entry-controller|popup-controller|journey-controller|ui-controllers|view-router)\.js)/.test(productionText),'A production consumer still points at a Death Guard-owned shared asset');

const genericBuilder=read('books/shared/tools/build-army-book.mjs');
assert(!genericBuilder.includes("'adeptus-mechanicus','mobile','related-rules.inc'"),'Shared builder still reads Core Stratagems from Adeptus Mechanicus');
assert(genericBuilder.includes("'core-rules','content','core-stratagems.related-rules.inc'"),'Shared builder does not use the Core-owned Related Rules source');

const coreInc=read('books/core-rules/content/core-stratagems.related-rules.inc');
assert((coreInc.match(/class="stratagem surface"/g)||[]).length===10,'Core-owned Related Rules source must contain ten Core Stratagems');
const sourceNodes=[];
const walk=value=>{if(Array.isArray(value))return value.forEach(walk);if(value&&typeof value==='object'){if(typeof value.code==='string'&&typeof value.title==='string')sourceNodes.push(value);Object.values(value).forEach(walk);}};
walk(json('books/core-rules/content/core-rules.digital-11e.json'));
const sourceStratagems=sourceNodes.filter(item=>/^15\.(?:0[2-8]|1[0-2])$/.test(item.code));
assert(sourceStratagems.length===10,'Core canonical source must expose ten Core Stratagem records');
for(const item of sourceStratagems)assert(coreInc.includes(item.title),`Core Related Rules source is missing ${item.code} ${item.title}`);

const genericRelated=read('books/shared/army-related-rules.js');
const genericEnhancements=read('books/shared/book-roster-enhancements.js');
for(const id of ['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','chaos-space-marines','space-marines','dark-angels','blood-angels']){
  assert(!genericRelated.includes(id),`Generic Related Rules runtime contains faction dispatch: ${id}`);
  assert(!genericEnhancements.includes(id),`Generic Roster Enhancement runtime contains faction dispatch: ${id}`);
}
assert(fs.existsSync(path.join(root,'books/extensions/book-roster-enhancement-providers.js')),'Faction Roster Enhancement provider registry is missing');

for(const id of ['death-guard','adeptus-mechanicus','tau-empire','emperors-children','tyranids','space-marines']){
  const config=json(`books/${id}/book.config.json`),owner=config.relatedRulesOwnership;
  assert(owner?.mode==='authoritative-runtime-source'&&owner.path==='mobile/related-rules.inc',`${id} does not declare authoritative Related Rules ownership`);
  assert(fs.existsSync(path.join(root,'books',id,owner.path)),`${id} authoritative Related Rules source is missing`);
}
assert(!fs.existsSync(path.join(root,'books/space-marines/mobile/related-rules.source.inc')),'Space Marines still has split Related Rules ownership');

console.log('FINAL ARCHITECTURE OWNERSHIP QA: PASS');
