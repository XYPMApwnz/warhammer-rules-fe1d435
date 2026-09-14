import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadEditorialContract,validateEditorialContract} from '../glossary/tools/editorial-contract.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contract=loadEditorialContract({authenticateRepository:false});
const ids=new Set(contract.summaries.map(record=>record.termId));

assert.equal(contract.summaries.length,24);
assert.equal(contract.summaries.filter(record=>record.field==='summary').length,24);
assert.equal(contract.summaries.filter(record=>record.termId.startsWith('core-')).length,11);
assert.equal(contract.summaries.filter(record=>record.termId.startsWith('death-guard-')).length,13);
for(const record of contract.summaries){
  assert.deepEqual(Object.keys(record).sort(),['contentHash','editorialRevision','field','semanticSource','summary','termId']);
  assert.equal(['definition','related','mentions','references','presentation','canonicalSource','aliases','contexts','points','timing'].some(field=>field in record),false,`${record.termId}: editorial owner leaked a non-summary field`);
}

const source=JSON.parse(fs.readFileSync(path.join(root,'books','death-guard','content','death-guard-rules.en.json'),'utf8'));
const dgLocators=new Set(source.glossary.flatMap(entry=>[entry.id,entry.sectionId,entry.group]).filter(Boolean));
const core=JSON.parse(fs.readFileSync(path.join(root,'books','core-rules','content','core-rules.digital-11e.json'),'utf8'));
const coreLocators=new Set(core.records.map(record=>record.code));
for(const record of contract.summaries){
  const locator=record.semanticSource.locator;
  if(record.semanticSource.documentId==='core-rules')assert(coreLocators.has(locator),`${record.termId}: Core semantic locator does not resolve`);
  else if(record.semanticSource.documentId==='death-guard')assert(dgLocators.has(locator)||locator==='Rules Updates · Skullsquirm Blight',`${record.termId}: Death Guard semantic locator does not resolve`);
  else assert.fail(`${record.termId}: unsupported semantic source owner`);
}

const mutate=change=>{
  const copy=structuredClone(contract);
  change(copy);
  return()=>validateEditorialContract(copy,{knownTermIds:ids});
};
assert.throws(mutate(value=>value.summaries[0].termId='unknown-editorial-term'),/unknown canonical term ID/);
assert.throws(mutate(value=>value.summaries.push(structuredClone(value.summaries[0]))),/expected exactly 24|duplicate canonical term/);
assert.throws(mutate(value=>value.summaries[0].definition='not allowed'),/unsupported fields/);
assert.throws(mutate(value=>value.summaries[0].summary+=' poison'),/content hash mismatch/);

console.log('PASS glossary editorial contract: 24 accepted summary-only records with source locators and review hashes.');
