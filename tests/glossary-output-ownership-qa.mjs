import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {editorialReviewHash,validateEditorialContract} from '../glossary/tools/editorial-contract.mjs';
import {validateGlossaryGraph} from '../glossary/tools/glossary-policies.mjs';
import {createCanonicalBuildContext} from '../books/shared/tools/canonical-build-contract.mjs';
import {buildCanonicalBook} from '../books/shared/tools/build-army-book.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const glossaryRoot=path.join(root,'glossary');
const builderPath=path.join(glossaryRoot,'tools','build-glossary.mjs');
const contextIds=['core-rules','death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','blood-angels','dark-angels'];
const publicBookIds=contextIds.filter(id=>id!=='core-rules');
const outputPaths=[
  path.join(glossaryRoot,'registry.en.json'),
  path.join(glossaryRoot,'aliases.en.json'),
  ...contextIds.map(id=>path.join(glossaryRoot,'contexts',`${id}.json`)),
  path.join(glossaryRoot,'generated','conflict-report.json'),
  path.join(glossaryRoot,'generated','glossary.en.js')
];
assert.deepEqual(
  fs.readdirSync(path.join(glossaryRoot,'contexts')).filter(name=>name.endsWith('.json')).sort(),
  contextIds.map(id=>`${id}.json`).sort(),
  'context output directory must contain exactly the public generated contexts'
);
const expected=new Map(outputPaths.map(file=>[file,fs.readFileSync(file)]));
const bookDataPaths=publicBookIds.map(id=>path.join(root,'books',id,'scripts','data.js'));
const expectedBookData=new Map(bookDataPaths.map(file=>[file,fs.readFileSync(file)]));
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const restore=()=>{for(const [file,bytes] of [...expected,...expectedBookData]){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,bytes);}};
const build=(...args)=>{
  const result=spawnSync(process.execPath,[builderPath,'--no-cache-write',...args],{cwd:root,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr||result.stdout);
};
const assertExpected=label=>{
  for(const [file,bytes] of expected){
    const actual=fs.readFileSync(file);
    assert.equal(actual.length,bytes.length,`${label}: ${path.relative(root,file)} length differs`);
    assert.equal(digest(actual),digest(bytes),`${label}: ${path.relative(root,file)} hash differs`);
  }
};
const probe=(label,change,args=[])=>{
  restore();
  change();
  build(...args);
  assertExpected(label);
  console.log(`PASS ${label}`);
};
const stable=value=>value instanceof Map?['Map',[...value].sort(([left],[right])=>left.localeCompare(right)).map(([key,item])=>[key,stable(item)])]:Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
const factualProjection=async()=>{
  const books={};
  for(const id of publicBookIds){
    const configPath=path.join(root,'books',id,'book.config.json'),context=createCanonicalBuildContext({configPath,args:[]});
    const {effectiveBookModel:model}=await buildCanonicalBook(context,{projectionOnly:true});
    books[id]={
      units:model.units.map(unit=>({id:unit.id,ruleProfile:unit.ruleProfile,points:unit.points})),
      detachments:model.detachments.map(item=>({id:item.id,detachmentPoints:item.detachmentPoints})),
      glossary:model.glossary
    };
  }
  return digest(Buffer.from(JSON.stringify(stable(books))));
};

const builderSource=fs.readFileSync(builderPath,'utf8');
assert.doesNotMatch(builderSource,/existingRegistry|existingAliases|existingContexts/,'generated glossary feedback variables remain');
assert.doesNotMatch(builderSource,/readJson\(path\.join\(glossaryRoot,'(?:registry|aliases)\.en\.json'/,'generated glossary registry/aliases remain inputs');
assert.doesNotMatch(builderSource,/(?:readJson|readFileSync|loadWindow)[^\n]*books[^\n]*scripts[^\n]*data\.js/,'generated Army Book publication data remains a glossary factual input');
assert.doesNotMatch(builderSource,/(?:readJson|readFileSync|loadWindow)[^\n]*(?:reader\.html|target-data\.js|roster-data\.js|mobile[\\/])/,'rendered Army Book output remains a glossary factual input');
const sharedBuilderSource=fs.readFileSync(path.join(root,'books','shared','tools','build-army-book.mjs'),'utf8');
const amAdapterSource=fs.readFileSync(path.join(root,'books','adeptus-mechanicus','tools','canonical-source-adapter.mjs'),'utf8');
assert.doesNotMatch(sharedBuilderSource,/readFileSync\([^\n]*glossary[^\n]*registry\.en\.json/,'shared canonical/effective build still reads generated registry facts');
assert.doesNotMatch(amAdapterSource,/globalGlossary|registry\.en\.json/,'Adeptus Mechanicus adapter still reads generated registry facts');

const baselineProjection=await factualProjection();
try{
  restore();
  for(const file of outputPaths)fs.unlinkSync(file);
  assert.equal(await factualProjection(),baselineProjection,'generated glossary absence changed canonical/effective book facts');
  console.log('PASS generated glossary absent canonical/effective build');

  restore();
  const poisonedRegistry=JSON.parse(expected.get(path.join(glossaryRoot,'registry.en.json')).toString('utf8'));
  const deepStrike=poisonedRegistry.terms['core-deep-strike'];
  delete poisonedRegistry.terms['core-deep-strike'];
  poisonedRegistry.terms['core-deep-strike-poison']={...deepStrike,id:'core-deep-strike-poison',summary:{en:'D2_REGISTRY_SUMMARY_POISON'},definition:{en:'D2_REGISTRY_DEFINITION_POISON'}};
  fs.writeFileSync(path.join(glossaryRoot,'registry.en.json'),JSON.stringify(poisonedRegistry,null,2));
  assert.equal(await factualProjection(),baselineProjection,'generated registry identity/text poison changed canonical/effective book facts');
  const points=spawnSync(process.execPath,[path.join(root,'roster-guides','build-points.mjs'),'--check'],{cwd:root,encoding:'utf8'});
  assert.equal(points.status,0,points.stderr||points.stdout);
  console.log('PASS generated registry identity, summary, definition, and count-preserving ID poison have zero upstream influence');

  probe('registry absent',()=>fs.unlinkSync(path.join(glossaryRoot,'registry.en.json')));
  probe('aliases absent',()=>fs.unlinkSync(path.join(glossaryRoot,'aliases.en.json')));
  probe('contexts absent',()=>contextIds.forEach(id=>fs.unlinkSync(path.join(glossaryRoot,'contexts',`${id}.json`))));
  probe('all previous outputs absent',()=>outputPaths.forEach(file=>fs.unlinkSync(file)));
  probe('poisoned previous output has zero influence',()=>{
    fs.writeFileSync(path.join(glossaryRoot,'registry.en.json'),JSON.stringify({schema:1,terms:{'poison-term':{summary:{en:'poison'},related:['fake-related'],canonicalSource:{documentId:'poison'}}}}));
    fs.writeFileSync(path.join(glossaryRoot,'aliases.en.json'),JSON.stringify({schema:1,aliases:{'wrong-alias':'poison-term'}}));
    for(const id of contextIds)fs.writeFileSync(path.join(glossaryRoot,'contexts',`${id}.json`),JSON.stringify({schema:1,bookId:'wrong-owner',terms:{poison:{termId:'poison-term'}}}));
    fs.writeFileSync(path.join(glossaryRoot,'generated','conflict-report.json'),JSON.stringify({fakeProvenance:true}));
    fs.writeFileSync(path.join(glossaryRoot,'generated','glossary.en.js'),'window.POISON=true;');
  });
  restore();
  for(const file of bookDataPaths)fs.unlinkSync(file);
  build();
  assertExpected('generated Army Book data absent glossary build');
  console.log('PASS generated Army Book data absent glossary build');

  restore();
  for(const file of bookDataPaths)fs.writeFileSync(file,'window.DG_TERMS={"d2-count-preserving-poison":{"title":"D2","summary":"D2_BOOK_DEFINITION_POISON","full":"D2_BOOK_WEAPON_AND_TAG_POISON","tags":["D2_TAG"]}};\n');
  build();
  assertExpected('generated Army Book definition/weapon/tag poison');
  console.log('PASS generated Army Book definition, weapon, and tag poison have zero glossary influence');

  restore();
  for(const file of [...outputPaths,...bookDataPaths])fs.unlinkSync(file);
  assert.equal(await factualProjection(),baselineProjection,'both-side output absence changed canonical/effective book facts');
  build();
  assertExpected('both-side output absence rebuild');
  console.log('PASS both generated sides absent rebuild');

  restore();
  build();
  assertExpected('first deterministic rebuild');
  build();
  assertExpected('second deterministic rebuild');
  probe('book adapter order independence',()=>{},['--reverse-book-adapters']);
}finally{
  restore();
}

const registryDocument=JSON.parse(expected.get(path.join(glossaryRoot,'registry.en.json')).toString('utf8'));
const aliasesDocument=JSON.parse(expected.get(path.join(glossaryRoot,'aliases.en.json')).toString('utf8'));
const registry=new Map(Object.entries(registryDocument.terms));
const aliases=aliasesDocument.aliases;
const contexts=Object.fromEntries(contextIds.map(id=>[id,JSON.parse(expected.get(path.join(glossaryRoot,'contexts',`${id}.json`)).toString('utf8')).terms]));
const bookDependencies=Object.fromEntries(contextIds.map(id=>{
  const config=path.join(root,'books',id,'book.config.json');
  return[id,fs.existsSync(config)?JSON.parse(fs.readFileSync(config,'utf8')).dependencies||[]:[]];
}));
const editorial=JSON.parse(fs.readFileSync(path.join(glossaryRoot,'editorial-contracts.v1.json'),'utf8'));
const mutateEditorial=change=>{
  const copy=structuredClone(editorial);
  change(copy);
  copy.reviewBinding.contentHash=editorialReviewHash(copy);
  return()=>validateEditorialContract(copy,{knownTerms:registry});
};
assert.throws(mutateEditorial(value=>value.summaries[0].termId='unknown-count-preserving-term'),/unknown canonical term ID/,'count-preserving identity substitution must fail');
assert.throws(mutateEditorial(value=>value.summaries[1]=structuredClone(value.summaries[0])),/duplicate canonical term|deterministic ID order/,'duplicate editorial contract must fail');
assert.throws(mutateEditorial(value=>value.summaries[0].semanticSource.documentId='wrong-owner'),/conflicts with its canonical semantic owner/,'conflicting accepted owner must fail');

const wrongAliases={...aliases,'core-anti-infantry':'unknown-alias-target'};
assert.throws(()=>validateGlossaryGraph({registry,aliases:wrongAliases,contexts,bookDependencies}),/unknown target/,'wrong alias target must fail');
const wrongContexts=structuredClone(contexts);
wrongContexts['adeptus-mechanicus']['wrong-book-owner']={termId:'death-guard-army-rules-pact-of-decay',navigation:{}};
assert.throws(()=>validateGlossaryGraph({registry,aliases,contexts:wrongContexts,bookDependencies}),/wrong book ownership/,'wrong context ownership must fail');

console.log('PASS glossary output ownership: absent/poison outputs ignored, mutations fail closed, rebuild and adapter order are deterministic.');
