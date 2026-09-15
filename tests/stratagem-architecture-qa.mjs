import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {buildCanonicalBook} from '../books/shared/tools/build-army-book.mjs';
import {createCanonicalBuildContext} from '../books/shared/tools/canonical-build-contract.mjs';
import {loadPublicationInventory,selectPublicationBooks} from '../books/shared/tools/publication-inventory.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const books=selectPublicationBooks(loadPublicationInventory({root}),'library');
const expectedCounts={
  'death-guard':45,'adeptus-mechanicus':51,tyranids:51,'tau-empire':31,'emperors-children':51,
  'chaos-space-marines':93,'space-marines':123,'dark-angels':112,'blood-angels':120
};
const expectedHashes={
  'death-guard':'1dca38f6bb92c9d33df060f62304e33772390440321f45b8d253f58f11e1b0a9',
  'adeptus-mechanicus':'8db4c4af6f31537ba26a5cf440c564be415814fd55e1b957f9f8b89eb2197882',
  tyranids:'aebf56b8c70a98ddaaa36c80d0540220f393cf3970964d71855d1facadbeeaf0',
  'tau-empire':'9d3b39e2a9a39e84e50856b3150896edecfffe9dcd09bcc32cbbd5701086fa43',
  'emperors-children':'a3d0271b14b34fb6e844b5dd30e81a2afa2f9076bf0357005673cf94c6c739cc',
  'chaos-space-marines':'e92e71e8ec7c2c6ef8770f35c363b92ec8ca8761945240ab0cae15012a52ef39',
  'space-marines':'155bdd05a4a7509c4bbfee7f7a26a5dce1a7ba77a6e2b6498f971a379cbd321c',
  'dark-angels':'3eeb9e5a93e319ba151a11afc4b9a107d6d98a45abd78bf98f3be01f4dc7e960',
  'blood-angels':'a9b9af4283839f93a04271102771317fc04f880b5b550cce9c4e544fdef81474'
};
const key=record=>[record.detachmentId,record.id,record.sourceBookId].join('\0');
const sorted=records=>records.map(key).sort();
const digest=records=>crypto.createHash('sha256').update(JSON.stringify(records.map(record=>[record.detachmentId,record.id,record.sourceBookId]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))))).digest('hex');

function validateInventory(records,label){
  assert.ok(records.length,`${label}: authoritative Stratagem inventory must not be empty`);
  const seen=new Set();
  for(const record of records){
    assert.match(record.id,/^[a-z0-9][a-z0-9-]*$/,`${label}: invalid canonical Stratagem ID`);
    assert.match(record.detachmentId,/^[a-z0-9][a-z0-9-]*$/,`${label}: invalid canonical Detachment ID`);
    assert.ok(books.some(book=>book.id===record.sourceBookId),`${label}: unknown source owner ${record.sourceBookId}`);
    assert.equal(seen.has(key(record)),false,`${label}: duplicate scoped Stratagem ${key(record).replaceAll('\0',' / ')}`);
    seen.add(key(record));
  }
  return records;
}
function assertExactInventory(actual,expected,label){
  validateInventory(actual,`${label}/actual`);validateInventory(expected,`${label}/expected`);
  assert.deepEqual(sorted(actual),sorted(expected),`${label}: exact scoped Stratagem identity/owner set differs`);
}
function nestedDeathGuardStratagems(detachment){
  const records=[];
  const walk=value=>{
    if(Array.isArray(value)){for(const item of value)walk(item);return;}
    if(!value||typeof value!=='object')return;
    if(value.type==='rule'&&String(value.id||'').startsWith('stratagem-'))records.push(value);
    for(const child of Object.values(value))walk(child);
  };
  walk(detachment.subsections||[]);return records;
}
function modelStratagems(model){
  return model.detachments.flatMap(detachment=>{
    const owner=detachment.sourceBookId||detachment.dependencyBook||model.book.id;
    const items=Array.isArray(detachment.stratagems)?detachment.stratagems:nestedDeathGuardStratagems(detachment);
    return items.map(item=>({id:item.id,detachmentId:detachment.id,sourceBookId:owner}));
  });
}
function acceptedSourceStratagems(book,config){
  if(book==='death-guard'){
    const source=json(`books/${book}/${config.sources.canonical}`);
    return source.sections.filter(section=>section.id.startsWith('detachment-')).flatMap(detachment=>nestedDeathGuardStratagems(detachment).map(item=>({id:item.id,detachmentId:detachment.id,sourceBookId:book})));
  }
  const sourceKeys=book==='adeptus-mechanicus'?['factionRules','codexDetachments']:['factionPack','codexParity'];
  return sourceKeys.filter(name=>config.sources[name]).flatMap(name=>(json(`books/${book}/${config.sources[name]}`).detachments||[]).flatMap(detachment=>(detachment.stratagems||[]).map(item=>({id:item.id,detachmentId:detachment.id,sourceBookId:book}))));
}
function targetCatalog(book){
  const sandbox={window:{}};vm.runInNewContext(read(`books/${book}/scripts/target-data.js`),sandbox,{filename:`${book}/target-data.js`});
  return sandbox.window.WH_ARMY_BOOK_TARGETS;
}
function publishedStratagems(book,model){
  const catalog=targetCatalog(book),records=[];
  for(const detachment of model.detachments){
    const targetId=detachment.id.startsWith('detachment-')?detachment.id:`detachment-${detachment.id}`;
    const target=catalog.targets[targetId];assert.ok(target,`${book}: missing published Detachment target ${targetId}`);
    const html=catalog.html.slice(target.start,target.end),owner=detachment.sourceBookId||detachment.dependencyBook||book;
    for(const match of html.matchAll(/<article\b[^>]*class="[^"]*\bstratagem\b[^"]*"[^>]*>/g)){
      const id=/\b(?:data-rule-id|id)="([^"]+)"/.exec(match[0])?.[1];
      if(id&&!id.startsWith('core-stratagem-'))records.push({id,detachmentId:detachment.id,sourceBookId:owner});
    }
  }
  return records;
}

const models=new Map(),sourceInventories=new Map();
for(const book of books){
  const config=json(book.config),context=createCanonicalBuildContext({configPath:path.join(root,book.config),repo:root,args:['--check']});
  const {effectiveBookModel}=await buildCanonicalBook(context,{projectionOnly:true});
  models.set(book.id,effectiveBookModel);
  const source=validateInventory(acceptedSourceStratagems(book.id,config),`${book.id}/accepted-source`);
  sourceInventories.set(book.id,source);
  const effective=validateInventory(modelStratagems(effectiveBookModel),`${book.id}/effective`);
  const local=effective.filter(record=>record.sourceBookId===book.id);
  assertExactInventory(local,source,`${book.id}: accepted source -> local effective`);
  assertExactInventory(publishedStratagems(book.id,effectiveBookModel),effective,`${book.id}: effective -> publication`);
  assert.equal(effective.length,expectedCounts[book.id],`${book.id}: frozen effective Stratagem count`);
  assert.equal(digest(effective),expectedHashes[book.id],`${book.id}: frozen scoped Stratagem identity hash`);
}

for(const childId of ['dark-angels','blood-angels']){
  const inherited=modelStratagems(models.get(childId)).filter(record=>record.sourceBookId==='space-marines');
  const inheritedDetachments=models.get(childId).detachments.filter(detachment=>(detachment.sourceBookId||detachment.dependencyBook||childId)==='space-marines');
  const smByKey=new Map(sourceInventories.get('space-marines').map(record=>[[record.detachmentId,record.id].join('\0'),record]));
  assert.equal(inherited.length,81,`${childId}: inherited SM Stratagem count`);
  assert.equal(inheritedDetachments.length,16,`${childId}: inherited SM Detachment count`);
  for(const record of inherited)assert.ok(smByKey.has([record.detachmentId,record.id].join('\0')),`${childId}: inherited Stratagem lacks its SM source owner`);
}

const baseline=modelStratagems(models.get('space-marines'));
const countPreserving=structuredClone(baseline);countPreserving[0].id='stratagem-count-preserving-substitution';
assert.throws(()=>assertExactInventory(countPreserving,baseline,'count-preserving identity substitution'),/exact scoped Stratagem identity\/owner set differs/);
const duplicateMissing=structuredClone(baseline);duplicateMissing[0]=structuredClone(duplicateMissing[1]);
assert.throws(()=>assertExactInventory(duplicateMissing,baseline,'missing plus duplicate count-preserving mutation'),/duplicate scoped Stratagem/);
const wrongScope=structuredClone(baseline);wrongScope[0].detachmentId=baseline.find(record=>record.detachmentId!==baseline[0].detachmentId).detachmentId;
assert.throws(()=>assertExactInventory(wrongScope,baseline,'wrong Detachment scope mutation'),/exact scoped Stratagem identity\/owner set differs|duplicate scoped Stratagem/);
const wrongOwner=structuredClone(modelStratagems(models.get('dark-angels')));wrongOwner.find(record=>record.sourceBookId==='space-marines').sourceBookId='dark-angels';
assert.throws(()=>assertExactInventory(wrongOwner,modelStratagems(models.get('dark-angels')),'inherited owner mutation'),/exact scoped Stratagem identity\/owner set differs/);

assert.equal([...models.values()].reduce((sum,model)=>sum+modelStratagems(model).length,0),677,'effective Stratagem bindings');
assert.equal([...sourceInventories.values()].reduce((sum,records)=>sum+records.length,0),515,'unique source-owned Stratagem contracts');
console.log('Stratagem architecture QA: PASS (515 source-owned contracts, 677 effective/publication bindings, exact scoped sets for 9 books, count-preserving attacks rejected).');
