import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadAcceptedRelatedRulesInputs,validateAcceptedRelatedRulesContracts} from '../books/space-marines/tools/space-marines-related-rules-contract.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const bookRoot=path.join(root,'books','space-marines');
const inputs=loadAcceptedRelatedRulesInputs({bookRoot,authenticateRepository:false});
const validated=validateAcceptedRelatedRulesContracts(inputs);

assert.equal(validated.supplementalContracts.length,28,'supplemental Enhancement contract count');
assert.equal(new Set(validated.supplementalContracts.map(item=>item.id)).size,28,'supplemental contracts resolve exactly once');
assert.equal(validated.supplementalContracts.filter(item=>item.tags.includes('UPGRADE')).length,3,'unit Upgrade contract count');
assert(validated.supplementalContracts.every(item=>item.confidence.assignment==='SOURCE_LIMITED'),'assignment evidence confidence must remain source-limited');

const mutation=change=>{
  const copy=structuredClone(inputs);
  change(copy.accepted);
  return()=>validateAcceptedRelatedRulesContracts(copy);
};
assert.throws(mutation(value=>value.enhancements.pop()),/expected exactly 28 supplemental Enhancement contracts/);
assert.throws(mutation(value=>value.enhancements.push(structuredClone(value.enhancements[0]))),/expected exactly 28|duplicate supplemental/);
assert.throws(mutation(value=>value.enhancements[0].id='unknown-enhancement'),/missing or unknown supplemental Enhancement contract/);
assert.throws(mutation(value=>value.enhancements[0].detachmentId='wrong-detachment'),/wrong Detachment or identity/);
assert.throws(mutation(value=>value.enhancements[0].sourceRefs=[]),/bind all accepted evidence classes/);
assert.throws(mutation(value=>value.enhancements[0].confidence.assignment='VERIFIED_FROZEN'),/assignment confidence must remain SOURCE_LIMITED/);
assert.throws(mutation(value=>value.enhancements.find(item=>item.id==='bellicose-weapon-spirits').assignment.maxOwners=1),/conflicting owner\/assignment contract/);
assert.throws(mutation(value=>value.enhancements.find(item=>item.id==='spy-skull-data-link').id='spy-skull-datalink'),/missing or unknown supplemental Enhancement contract/);

const artifact=JSON.parse(fs.readFileSync(path.join(bookRoot,'sources','space-marines-related-rules-contracts.v1.json'),'utf8'));
assert.equal(Object.values(artifact.enhancements).some(item=>'title' in item||'text' in item||'points' in item),false,'accepted contract must not duplicate display, rule text, or points facts');

console.log('PASS Space Marines accepted Related Rules contract: 25 owner repairs, 3 unit Upgrades, canonical Spy-skull identity.');
