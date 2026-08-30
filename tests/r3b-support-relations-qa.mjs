import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=process.env.R3B_ROOT?path.resolve(process.env.R3B_ROOT):defaultRoot;
const normalize=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const baseFacts=[
  {sourceId:'unit-ancient',targetId:'unit-tactical-squad',targetTitle:'Tactical Squad'},
  {sourceId:'unit-apothecary',targetId:'unit-tactical-squad',targetTitle:'Tactical Squad'},
  {sourceId:'unit-lieutenant',targetId:'unit-tactical-squad',targetTitle:'Tactical Squad'},
  {sourceId:'unit-ancient-in-terminator-armor',targetId:'unit-terminator-squad',targetTitle:'Terminator Squad'}
];
const overlayFacts=[
  {sourceId:'unit-ancient',role:'support',targetId:'unit-inner-circle-companions',targetTitle:'Inner Circle Companions'},
  {sourceId:'unit-apothecary',role:'support',targetId:'unit-inner-circle-companions',targetTitle:'Inner Circle Companions'},
  {sourceId:'unit-lieutenant',role:'support',targetId:'unit-inner-circle-companions',targetTitle:'Inner Circle Companions'},
  {sourceId:'unit-ancient-in-terminator-armor',role:'support',targetId:'unit-deathwing-knights',targetTitle:'Deathwing Knights'},
  {sourceId:'unit-ancient-in-terminator-armor',role:'support',targetId:'unit-deathwing-terminator-squad',targetTitle:'Deathwing Terminator Squad'}
];
assert.equal(baseFacts.length+overlayFacts.length,9,'R3B owner-level ledger size');

const readBook=book=>{
  const bookRoot=path.join(root,'books',book);
  const config=JSON.parse(fs.readFileSync(path.join(bookRoot,'book.config.json'),'utf8'));
  const canonical=JSON.parse(fs.readFileSync(path.resolve(bookRoot,config.sources.codexDatasheets),'utf8')).datasheets;
  const byId=new Map();
  for(const unit of canonical){
    assert.equal(byId.has(unit.id),false,`${book}: duplicate canonical ID ${unit.id}`);
    byId.set(unit.id,unit);
  }
  const context={window:{}};vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(bookRoot,'scripts','roster-data.js'),'utf8'),context,{filename:`${book}/roster-data.js`});
  return {config,canonical,byId,catalog:context.window.WH_BOOK_ROSTER_CATALOG};
};
const books=Object.fromEntries(['space-marines','dark-angels','blood-angels'].map(book=>[book,readBook(book)]));
const catalogUnit=(book,id)=>books[book].catalog.units.filter(unit=>unit.id===id);
const relationCount=(book,sourceId,key,targetId)=>catalogUnit(book,sourceId).flatMap(unit=>unit.relations?.[key]||[]).filter(item=>item.unitId===targetId).length;
let effectiveManifestations=0;

for(const fact of baseFacts){
  const source=books['space-marines'].byId.get(fact.sourceId),target=books['space-marines'].byId.get(fact.targetId);
  assert.ok(source,`SM canonical source ${fact.sourceId}`);
  assert.ok(target,`SM canonical target ${fact.targetId}`);
  assert.equal(target.title,fact.targetTitle,`SM target identity ${fact.targetId}`);
  assert.equal((source.relations?.support||[]).filter(title=>normalize(title)===normalize(fact.targetTitle)).length,1,`SM owner support ${fact.sourceId}>${fact.targetId}`);
  for(const book of Object.keys(books)){
    const present=catalogUnit(book,fact.sourceId).length===1&&catalogUnit(book,fact.targetId).length===1;
    assert.equal(relationCount(book,fact.sourceId,'canSupport',fact.targetId),present?1:0,`${book}: effective support ${fact.sourceId}>${fact.targetId}`);
    assert.equal(relationCount(book,fact.targetId,'canBeSupportedBy',fact.sourceId),present?1:0,`${book}: effective inverse ${fact.targetId}<${fact.sourceId}`);
    if(present)effectiveManifestations++;
  }
}

const configuredAdds=books['dark-angels'].config.dependencyDatasheets?.relationAdds||[];
for(const fact of overlayFacts){
  assert.equal(configuredAdds.filter(item=>item.sourceId===fact.sourceId&&item.role===fact.role&&item.targetId===fact.targetId).length,1,`DA overlay owner ${fact.sourceId}>${fact.targetId}`);
  assert.equal(books['space-marines'].byId.has(fact.sourceId),true,`SM inherited source owner ${fact.sourceId}`);
  assert.equal(books['dark-angels'].byId.has(fact.sourceId),false,`DA must not duplicate inherited source ${fact.sourceId}`);
  assert.equal(books['blood-angels'].byId.has(fact.sourceId),false,`BA must not duplicate inherited source ${fact.sourceId}`);
  assert.equal(books['dark-angels'].byId.has(fact.targetId),true,`DA local target owner ${fact.targetId}`);
  assert.equal((books['space-marines'].byId.get(fact.sourceId).relations?.support||[]).filter(title=>normalize(title)===normalize(fact.targetTitle)).length,0,`SM canonical must not own DA-local target ${fact.sourceId}>${fact.targetId}`);
  assert.equal(relationCount('dark-angels',fact.sourceId,'canSupport',fact.targetId),1,`DA effective overlay ${fact.sourceId}>${fact.targetId}`);
  assert.equal(relationCount('dark-angels',fact.targetId,'canBeSupportedBy',fact.sourceId),1,`DA overlay inverse ${fact.targetId}<${fact.sourceId}`);
  for(const book of ['space-marines','blood-angels']){
    assert.equal(relationCount(book,fact.sourceId,'canSupport',fact.targetId),0,`${book}: DA overlay direct leak ${fact.sourceId}>${fact.targetId}`);
    assert.equal(relationCount(book,fact.targetId,'canBeSupportedBy',fact.sourceId),0,`${book}: DA overlay inverse leak ${fact.targetId}<${fact.sourceId}`);
  }
  effectiveManifestations++;
}

const overlayKeys=configuredAdds.map(item=>`${item.sourceId}\0${item.role}\0${item.targetId}`);
assert.equal(new Set(overlayKeys).size,overlayKeys.length,'DA dependency relationAdds must be unique');
assert.equal([...baseFacts,...overlayFacts].some(item=>/biologus|ezekiel|titus/.test(`${item.sourceId} ${item.targetId}`)),false,'No-change records must not enter the R3B ledger');

console.log(`R3B support relation QA passed: 9 owner facts, ${effectiveManifestations} effective direct/inverse manifestations, zero DA leaks or owner duplication.`);
