import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const ledger=[
  {book:'emperors-children',sourceId:'unit-lord-kakophonist',sourceTitle:'Lord Kakophonist',targetId:'unit-chaos-terminators',targetTitle:'Chaos Terminators'},
  {book:'space-marines',sourceId:'unit-vulkan-hestan',sourceTitle:"Vulkan He'stan",targetId:'unit-assault-intercessor-squad',targetTitle:'Assault Intercessor Squad'},
  {book:'space-marines',sourceId:'unit-vulkan-hestan',sourceTitle:"Vulkan He'stan",targetId:'unit-company-heroes',targetTitle:'Company Heroes'},
  {book:'space-marines',sourceId:'unit-vulkan-hestan',sourceTitle:"Vulkan He'stan",targetId:'unit-infernus-squad',targetTitle:'Infernus Squad'},
  {book:'space-marines',sourceId:'unit-vulkan-hestan',sourceTitle:"Vulkan He'stan",targetId:'unit-tactical-squad',targetTitle:'Tactical Squad'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-assault-intercessor-squad',targetTitle:'Assault Intercessor Squad'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-bladeguard-veteran-squad',targetTitle:'Bladeguard Veteran Squad'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-company-heroes',targetTitle:'Company Heroes'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-intercessor-squad',targetTitle:'Intercessor Squad'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-sternguard-veteran-squad',targetTitle:'Sternguard Veteran Squad'},
  {book:'space-marines',sourceId:'unit-korsarro-khan',sourceTitle:"Kor'sarro Khan",targetId:'unit-tactical-squad',targetTitle:'Tactical Squad'}
];
assert.equal(ledger.length,11,'R1 owner-level ledger size');

const readBook=book=>{
  const bookRoot=path.join(root,'books',book);
  const config=JSON.parse(fs.readFileSync(path.join(bookRoot,'book.config.json'),'utf8'));
  const canonical=JSON.parse(fs.readFileSync(path.resolve(bookRoot,config.sources.codexDatasheets),'utf8')).datasheets;
  const byId=new Map();
  const byTitle=new Map();
  for(const unit of canonical){
    assert.equal(byId.has(unit.id),false,`${book}: duplicate canonical ID ${unit.id}`);
    byId.set(unit.id,unit);
    const key=normalize(unit.title),items=byTitle.get(key)||[];items.push(unit);byTitle.set(key,items);
  }
  const context={window:{}};vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(bookRoot,'scripts','roster-data.js'),'utf8'),context,{filename:`${book}/roster-data.js`});
  return {canonical,byId,byTitle,catalog:context.window.WH_BOOK_ROSTER_CATALOG};
};
const books=Object.fromEntries(['emperors-children','space-marines','dark-angels','blood-angels'].map(book=>[book,readBook(book)]));
const sourceIds=[...new Set(ledger.map(item=>item.sourceId))];

for(const edge of ledger){
  const owner=books[edge.book],source=owner.byId.get(edge.sourceId),target=owner.byId.get(edge.targetId);
  assert.ok(source,`${edge.book}: missing source ${edge.sourceId}`);
  assert.ok(target,`${edge.book}: missing target ${edge.targetId}`);
  assert.equal(source.title,edge.sourceTitle,`${edge.book}: source title ${edge.sourceId}`);
  assert.equal(target.title,edge.targetTitle,`${edge.book}: target title ${edge.targetId}`);
  const titleMatches=owner.byTitle.get(normalize(edge.targetTitle))||[];
  assert.equal(titleMatches.length,1,`${edge.book}: ambiguous target title ${edge.targetTitle}`);
  assert.equal(titleMatches[0].id,edge.targetId,`${edge.book}: target identity ${edge.targetTitle}`);
  const directTitles=(source.relations?.leader||[]).filter(title=>normalize(title)===normalize(edge.targetTitle));
  assert.equal(directTitles.length,1,`${edge.book}: canonical edge ${edge.sourceId}>${edge.targetId}`);

  const generatedSource=owner.catalog.units.find(unit=>unit.id===edge.sourceId);
  const generatedTarget=owner.catalog.units.find(unit=>unit.id===edge.targetId);
  assert.ok(generatedSource,`${edge.book}: generated source ${edge.sourceId}`);
  assert.ok(generatedTarget,`${edge.book}: generated target ${edge.targetId}`);
  assert.equal((generatedSource.relations?.canLead||[]).filter(item=>item.unitId===edge.targetId).length,1,`${edge.book}: generated direct ${edge.sourceId}>${edge.targetId}`);
  assert.equal((generatedTarget.relations?.canBeLedBy||[]).filter(item=>item.unitId===edge.sourceId).length,1,`${edge.book}: generated inverse ${edge.targetId}<${edge.sourceId}`);
}

for(const sourceId of sourceIds){
  const edge=ledger.find(item=>item.sourceId===sourceId),source=books[edge.book].byId.get(sourceId);
  const normalized=(source.relations?.leader||[]).map(normalize);
  assert.equal(new Set(normalized).size,normalized.length,`${edge.book}: duplicate direct relation on ${sourceId}`);
}
for(const chapter of ['dark-angels','blood-angels'])for(const sourceId of sourceIds.filter(id=>id!=='unit-lord-kakophonist')){
  assert.equal(books[chapter].byId.has(sourceId),false,`${chapter}: duplicated SM canonical owner ${sourceId}`);
  assert.equal(books[chapter].catalog.units.some(unit=>unit.id===sourceId),false,`${chapter}: excluded chapter source unexpectedly effective ${sourceId}`);
}

console.log('R1 relation QA passed: 11 canonical direct edges, 11 generated inverses, stable IDs and no DA/BA owner duplication.');
