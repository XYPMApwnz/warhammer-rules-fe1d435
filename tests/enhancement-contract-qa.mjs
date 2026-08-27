import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const targetHtml=book=>{
  const sandbox={window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'books',book,'scripts','target-data.js'),'utf8'),sandbox);
  return sandbox.window.WH_ARMY_BOOK_TARGETS.html;
};
const upgrades={
  'death-guard':new Set(['enhancement-parasitic-woe-reaper','enhancement-lancet-of-the-worldsore','enhancement-insectile-murmuration','enhancement-plagueveil']),
  'adeptus-mechanicus':new Set(['enhancement-stealth-screened-cybercanids-upgrade']),
  tyranids:new Set(['encircling-horrors','cryptophotaic-camouflage','destabilising-predation','synaptoprescience']),
  'tau-empire':new Set(['negation-emitters-upgrade','unmasking-suite-upgrade'])
};
const check=(book,id,tags,owner,assignment)=>{
  const upgrade=upgrades[book].has(id);
  assert.deepEqual(tags,upgrade?['UPGRADE']:[],`${book}: ${id} tags`);
  assert.equal(owner?.subject,upgrade?'unit':'model',`${book}: ${id} owner subject`);
  assert(owner?.selector&&typeof owner.selector==='object',`${book}: ${id} owner selector`);
  assert.deepEqual(assignment,{maxOwners:upgrade?3:1,enhancementChoices:1,payPointsPerOwner:true},`${book}: ${id} assignment`);
};

const dg=json('books/death-guard/content/death-guard-rules.en.json');
const dgItems=dg.sections.flatMap(section=>(section.subsections||[]).flatMap(subsection=>(subsection.blocks||[]).filter(item=>item.type==='enhancement')));
assert.equal(dgItems.length,30);
for(const item of dgItems)check('death-guard',item.id,item.tags,item.owner,item.assignment);

const amItems=['books/adeptus-mechanicus/content/adeptus-mechanicus-rules.en.json','books/adeptus-mechanicus/content/adeptus-mechanicus-codex-detachments.en.json'].flatMap(file=>json(file).detachments.flatMap(det=>det.enhancements||[]));
assert.equal(amItems.length,34);
for(const item of amItems)check('adeptus-mechanicus',item.id,item.tags,item.eligibility?.owner,item.assignment);

for(const book of ['tyranids','tau-empire']){
  const contracts=json(`books/${book}/content/${book}-related-rules.en.json`).enhancements;
  for(const [id,item] of Object.entries(contracts))check(book,id,item.tags,item.owner,item.assignment);
  assert.deepEqual(new Set(Object.entries(contracts).filter(([,item])=>item.tags.includes('UPGRADE')).map(([id])=>id)),upgrades[book],`${book}: official Upgrade inventory`);
}

for(const [book,expected] of Object.entries(upgrades)){
  const reader=targetHtml(book);
  const related=fs.readFileSync(path.join(root,'books',book,'mobile','related-rules.inc'),'utf8');
  assert.equal([...reader.matchAll(/data-enhancement-tags="UPGRADE"/g)].length,expected.size,`${book}: desktop Upgrade badges`);
  assert.equal([...related.matchAll(/data-enhancement-tags="UPGRADE"/g)].length,expected.size,`${book}: Related/Phone Upgrade badges`);
}

const glossary=json('glossary/registry.en.json').terms;
for(const [book,expected] of Object.entries(upgrades))assert.equal(Object.values(glossary).filter(term=>term.scope===book&&term.structured?.tags?.includes('UPGRADE')).length,expected.size,`${book}: Glossary Upgrade tags`);

console.log('PASS  Enhancement tags, owner subjects and assignment limits');
