import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {editorialReviewHash,validateEditorialContract} from '../glossary/tools/editorial-contract.mjs';
import {validateGlossaryGraph} from '../glossary/tools/glossary-policies.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const glossaryRoot=path.join(root,'glossary');
const builderPath=path.join(glossaryRoot,'tools','build-glossary.mjs');
const contextIds=['core-rules','death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','blood-angels','dark-angels'];
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
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const restore=()=>{for(const [file,bytes] of expected){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,bytes);}};
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

const builderSource=fs.readFileSync(builderPath,'utf8');
assert.doesNotMatch(builderSource,/existingRegistry|existingAliases|existingContexts/,'generated glossary feedback variables remain');
assert.doesNotMatch(builderSource,/readJson\(path\.join\(glossaryRoot,'(?:registry|aliases)\.en\.json'/,'generated glossary registry/aliases remain inputs');

try{
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
