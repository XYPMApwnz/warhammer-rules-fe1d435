import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createEffectiveCoreCatalog} from '../../books/core-rules/content/effective-core-catalog.mjs';
import {createEffectiveMissionCatalog} from '../content/effective-mission-catalog.mjs';
import {collectMissionCoreReferences, validateMissionCoreReferences} from '../content/mission-core-reference-contract.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const facts = JSON.parse(fs.readFileSync(path.join(ROOT, 'missions/content/chapter-approved-2026-27.canonical.json'), 'utf8'));
const core = createEffectiveCoreCatalog();
const references = collectMissionCoreReferences(facts);

assert.equal(core.records.length, 297, 'Core factual record baseline changed');
assert.equal(references.length, 87, 'Missions Core-reference baseline changed');
assert.equal(new Set(references.map(({id}) => id).filter((id) => !core.records.some((record) => record.id === id))).size, 0);
validateMissionCoreReferences(facts, core);

const unknown = structuredClone(facts);
unknown.primaryMissions[0].references.find(({relationType}) => relationType === 'CORE_RULE').id = 'core-rule-unknown';
assert.throws(
  () => createEffectiveMissionCatalog({canonicalFacts: unknown, coreCatalog: core}),
  /unknown canonical Core ID core-rule-unknown/,
  'unknown Core ID must fail closed'
);

const wrong = structuredClone(facts);
wrong.twists.find(({id}) => id === 'twist-nowhere-to-hide').ruleBody.operations[0].canonicalTarget = 'core-rule-14-02-level-of-control';
assert.throws(
  () => createEffectiveMissionCatalog({canonicalFacts: wrong, coreCatalog: core}),
  /REMOVE_TERRAIN_RULE has wrong canonical Core target/,
  'wrong target kind must fail closed'
);

const renamedCore = {
  ...core,
  records: core.records.map((record) => ({...record, title: `RENAMED ${record.id}`}))
};
assert.doesNotThrow(() => validateMissionCoreReferences(facts, renamedCore), 'Core title rename must not influence identity binding');

const before = JSON.stringify(facts);
createEffectiveMissionCatalog({canonicalFacts: facts, coreCatalog: core});
assert.equal(JSON.stringify(facts), before, 'effective assembly mutated canonical Missions facts');

console.log('MISSION_CORE_REFERENCE_QA=PASS');
console.log('MISSION_CORE_REFERENCES=87/87');
console.log('UNKNOWN_CORE_ID=FAIL_CLOSED');
console.log('WRONG_CORE_TARGET_KIND=FAIL_CLOSED');
console.log('CORE_TITLE_RENAME=ZERO_INFLUENCE');
console.log('CORE_RECORD_BASELINE=297');
