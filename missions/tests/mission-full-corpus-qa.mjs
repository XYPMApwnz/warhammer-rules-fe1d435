import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {canonicalMatchupId, MISSION_SCOPES, validateCanonicalMissionFacts} from '../content/mission-model-contract.mjs';
import {createEffectiveMissionCatalog} from '../content/effective-mission-catalog.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
const canonical = readJson('missions/content/chapter-approved-2026-27.canonical.json');
const evidence = readJson('missions/sources/chapter-approved-2026-27-evidence.json');
const booklet = readJson('missions/sources/chapter-approved-2026-27-booklet-pages-08-09-evidence.json');
const manifest = readJson('missions/sources/source-manifest.json');

const clone = (value) => structuredClone(value);
const PARTITIONS = [
  'forceDispositions', 'primaryMissions', 'secondaryMissions', 'deployments', 'twists',
  'missionSequenceRules', 'missionReferenceRules', 'faqOverlays', 'forceDispositionMatchups',
  'eventSequenceOverlays', 'terrainLayouts'
];

function allRecords(facts) {
  return PARTITIONS.flatMap((partition) => facts[partition].map((record) => ({partition, record})));
}

function assertFullCounts(facts) {
  assert.equal(facts.importCoverage, 'FULL_CURRENT_CORPUS');
  assert.equal(facts.forceDispositions.length, 5);
  assert.equal(facts.primaryMissions.length, 25);
  assert.equal(facts.secondaryMissions.length, 18);
  assert.equal(facts.deployments.length, 6);
  assert.equal(facts.twists.length, 6);
  assert.equal(facts.missionSequenceRules.length, 18);
  assert.equal(facts.missionReferenceRules.length, 7);
  assert.equal(facts.faqOverlays.length, 8);
  assert.equal(facts.forceDispositionMatchups.length, 15);
  assert.equal(facts.eventSequenceOverlays.length, 3);
  assert.equal(facts.terrainLayouts.length, 45);
}

function assertFullCorpusCompleteness(facts) {
  assertFullCounts(facts);
  assert.equal(facts.forceDispositions.reduce((sum, record) => sum + record.missionMatrixRelations.length, 0), 25);
  assert.equal(facts.forceDispositionMatchups.reduce((sum, record) => sum + record.layoutIds.length, 0), 45);
}

function assertSourceCoverage(facts) {
  const modeled = new Set();
  for (const {record} of allRecords(facts)) {
    modeled.add(record.provenance.sourceRecordId);
    for (const id of record.provenance.supportingSourceRecordIds ?? []) modeled.add(id);
  }
  for (const deployment of facts.deployments) modeled.add(deployment.geometry.deploymentCardKeySourceRecordId);
  const accepted = new Set([
    ...Object.values(evidence.records).flat().map(({id}) => id),
    ...evidence.eventMissionSemantics.map(({id}) => id)
  ]);
  const missing = [...accepted].filter((id) => !modeled.has(id));
  assert.deepEqual(missing, [], `unmodeled accepted source records: ${missing.join(', ')}`);
  const overlayIds = new Set(facts.faqOverlays.map(({id}) => id));
  assert.deepEqual(evidence.faqOverlays.map(({id}) => id).filter((id) => !overlayIds.has(id)), []);
  const canonicalIds = new Set(allRecords(facts).map(({record}) => record.id));
  for (const item of evidence.eventMissionSemantics) assert.ok(canonicalIds.has(item.canonicalRecordId), `${item.id}: canonical Event fact is missing`);
  const primaryEvidenceById = new Map(evidence.records.primaryMissions.map((record) => [record.id, record]));
  for (const primary of facts.primaryMissions) {
    const sourceRecord = primaryEvidenceById.get(primary.id);
    assert.ok(sourceRecord, `${primary.id}: accepted Primary source record is missing`);
    assert.deepEqual(
      [primary.playerForceDispositionId, primary.opponentForceDispositionId],
      [sourceRecord.playerForceDispositionId, sourceRecord.opponentForceDispositionId],
      `${primary.id}: canonical Force Disposition relation differs from accepted source evidence`
    );
  }
}

function assertGlossaryReady(record, partition) {
  assert.match(record.id, /^[a-z0-9]+(?:-{1,2}[a-z0-9]+)*$/, `${partition}: stable ID`);
  assert.equal(typeof record.label, 'string', `${record.id}: label`);
  assert.ok(record.label.length > 0, `${record.id}: label`);
  assert.ok(Array.isArray(record.aliases), `${record.id}: aliases`);
  assert.ok(Array.isArray(record.references), `${record.id}: references`);
  assert.ok(record.recordType, `${record.id}: rule class`);
  assert.ok(record.provenance?.sourceRecordId, `${record.id}: provenance`);
  if (partition === 'primaryMissions' || partition === 'secondaryMissions') assert.ok(record.ruleBody, `${record.id}: factual rule body`);
  if (partition === 'missionSequenceRules' || partition === 'missionReferenceRules') {
    assert.ok(record.requirements || record.ruleBody, `${record.id}: structured factual components`);
  }
}

validateCanonicalMissionFacts(canonical);
assertFullCorpusCompleteness(canonical);

// Complete accepted physical and semantic accounting.
assert.deepEqual(evidence.physicalAccounting, {
  primaryMissionCards: 30,
  secondaryObjectiveCards: 36,
  forceDispositionCards: 10,
  deploymentCards: 6,
  twistCards: 6,
  totalCards: 88,
  referenceBookletPages: 10
});
assert.equal(canonical.primaryMissions.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 30);
assert.equal(canonical.secondaryMissions.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 36);
assert.equal(canonical.forceDispositions.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 10);
assert.equal(canonical.deployments.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 6);
assert.equal(canonical.twists.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 6);
assert.equal(30 + 36 + 10 + 6 + 6, 88);
assert.ok(canonical.secondaryMissions.every((record) => record.physicalMultiplicity === 2));
assert.ok(canonical.secondaryMissions.every((record) => record.presentationCopiesAreSeparateSemantics === false));
assert.ok(canonical.secondaryMissions.every((record) => new Set(record.presentationCopies).size === 2));
assert.equal(canonical.primaryMissions.filter((record) => record.ruleBody.objectiveAction).length, 11);
assert.equal(canonical.secondaryMissions.filter((record) => record.ruleBody.objectiveAction).length, 2);

// The complete directed 5x5 Primary matrix is represented exactly once.
const matrixKeys = [];
const matrixMissionIds = [];
for (const disposition of canonical.forceDispositions) {
  assert.equal(disposition.missionMatrixRelations.length, 5);
  for (const relation of disposition.missionMatrixRelations) {
    matrixKeys.push(`${disposition.id}|${relation.opponentForceDispositionId}`);
    matrixMissionIds.push(relation.primaryMissionId);
  }
}
assert.equal(new Set(matrixKeys).size, 25);
assert.equal(new Set(matrixMissionIds).size, 25);
assert.deepEqual(new Set(matrixMissionIds), new Set(canonical.primaryMissions.map(({id}) => id)));

// All accepted source records and overlays have a canonical owner.
assertSourceCoverage(canonical);

// Complete mission sequence/scoring and distinct Appendix/reference ownership.
assert.deepEqual(booklet.pageCoverage.map(({status}) => status), ['COMPLETE', 'COMPLETE']);
assert.equal(booklet.claims.every(({status}) => status === 'AUTHENTICATED'), true);
const determineVictor = canonical.missionSequenceRules.find(({id}) => id === 'mission-sequence-determine-victor');
const caps = determineVictor.requirements.find(({type}) => type === 'SCORING_CAPS');
assert.deepEqual(caps, {
  type: 'SCORING_CAPS', primaryTotal: 45, primaryPerBattleRound: 15,
  secondaryTotal: 45, secondaryPerBattleRound: 15, fixedSecondaryPerCard: 20, battleReady: 10
});
const conditionReference = canonical.missionReferenceRules.find(({id}) => id === 'mission-reference-cumulative-and-or-conditions');
assert.ok(conditionReference.ruleBody.operations.includes('GAIN_VP_FOR_ONLY_ONE_OR_CONDITION_OR_THE_PRECEDING_NORMAL_CONDITION'));
const missionWideFaq = canonical.faqOverlays.find(({id}) => id === 'faq-end-of-battle-scoring-timing');
assert.equal(missionWideFaq.targetId, 'mission-sequence-determine-victor');

// Complete unordered matchup matrix and current Event Companion layouts.
const forceIds = canonical.forceDispositions.map(({id}) => id).sort();
const expectedMatchups = [];
for (let left = 0; left < forceIds.length; left += 1) {
  for (let right = left; right < forceIds.length; right += 1) expectedMatchups.push(canonicalMatchupId(forceIds[left], forceIds[right]));
}
assert.deepEqual(canonical.forceDispositionMatchups.map(({id}) => id).sort(), expectedMatchups.sort());
const layoutPages = [];
for (const matchup of canonical.forceDispositionMatchups) {
  assert.equal(matchup.layoutIds.length, 3);
  const layouts = matchup.layoutIds.map((id) => canonical.terrainLayouts.find((layout) => layout.id === id));
  assert.deepEqual(layouts.map(({variant}) => variant).sort(), ['A', 'B', 'C']);
  assert.equal(canonicalMatchupId(...matchup.memberForceDispositionIds), matchup.id);
  layoutPages.push(...layouts.map((layout) => layout.geometry.sourceRegistration.page));
}
assert.deepEqual([...layoutPages].sort((a, b) => a - b), Array.from({length: 45}, (_, index) => index + 9));
assert.ok(canonical.terrainLayouts.every((layout) => layout.geometry.digitizationStatus === 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION'));
assert.ok(canonical.deployments.every((deployment) => deployment.geometry.digitizationStatus === 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION'));
assert.ok(canonical.terrainLayouts.every((layout) => layout.visualReferences.factualAuthority === false));

// Official/secondary authority and historical/current Event versions stay honest.
const secondaryProfile = canonical.provenanceProfiles.find(({id}) => id === 'provenance-chapter-approved-secondary-corroborated');
assert.equal(secondaryProfile.contentEvidenceAuthority, 'secondary');
assert.equal(secondaryProfile.factOwnerAuthority, 'official');
const sourceEntries = [];
(function walk(value) {
  if (Array.isArray(value)) value.forEach(walk);
  else if (value && typeof value === 'object') {
    if (value.sourceId) sourceEntries.push(value);
    Object.values(value).forEach(walk);
  }
})(manifest);
assert.equal(sourceEntries.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.0-2026-06-12').currentStatus, 'SUPERSEDED');
assert.equal(sourceEntries.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.1-2026-07-22').currentStatus, 'SUPERSEDED');
assert.equal(sourceEntries.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.2-2026-08-26').currentStatus, 'CURRENT_AT_2026_09_22');

// Effective catalogs isolate Standard and Event scope and do not mutate canonical facts.
const before = JSON.stringify(canonical);
const standard = createEffectiveMissionCatalog({scope: MISSION_SCOPES.STANDARD_MATCHED_PLAY, canonicalFacts: canonical});
const event = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: canonical});
assert.equal(JSON.stringify(canonical), before);
assert.deepEqual([
  standard.catalog.forceDispositions.length, standard.catalog.primaryMissions.length,
  standard.catalog.secondaryMissions.length, standard.catalog.deployments.length,
  standard.catalog.twists.length, standard.catalog.missionReferenceRules.length,
  standard.catalog.terrainLayouts.length
], [5, 25, 18, 6, 6, 5, 0]);
assert.deepEqual([
  event.catalog.forceDispositions.length, event.catalog.primaryMissions.length,
  event.catalog.secondaryMissions.length, event.catalog.deployments.length,
  event.catalog.twists.length, event.catalog.missionReferenceRules.length,
  event.catalog.terrainLayouts.length
], [5, 25, 18, 0, 0, 7, 45]);
assert.ok(event.getById('event-mission-sequence-determine-layout'));
assert.equal(standard.getById('event-mission-sequence-determine-layout'), null);
assert.deepEqual(
  event.getLayoutsForMatchup('force-disposition-take-and-hold', 'force-disposition-disruption').map(({id}) => id),
  event.getLayoutsForMatchup('force-disposition-disruption', 'force-disposition-take-and-hold').map(({id}) => id)
);
assert.deepEqual(
  standard.getById('mission-sequence-determine-victor').effectiveClarifications.map(({overlayId}) => overlayId),
  ['faq-end-of-battle-scoring-timing']
);

// Glossary V2 can index canonical labels, bodies, references and provenance without owning facts.
for (const {partition, record} of allRecords(canonical)) assertGlossaryReady(record, partition);

// Deterministic effective output across source ordering.
const shuffled = clone(canonical);
for (const partition of PARTITIONS) shuffled[partition].reverse();
assert.equal(
  JSON.stringify(createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: shuffled}).catalog),
  JSON.stringify(event.catalog)
);

// The representative contract remains accepted while full mode rejects unresolved representative relations.
const representative = clone(canonical);
representative.importCoverage = 'REPRESENTATIVE_FOUNDATION';
representative.forceDispositions[0].missionMatrixRelations[0].resolvedInRepresentativeCatalog = false;
validateCanonicalMissionFacts(representative);
const unresolvedFull = clone(canonical);
unresolvedFull.forceDispositions[0].missionMatrixRelations[0].resolvedInRepresentativeCatalog = false;
assert.throws(() => validateCanonicalMissionFacts(unresolvedFull), /full corpus cannot retain an unresolved representative relation/);

// Bounded adversarial controls.
const duplicate = clone(canonical);
duplicate.missionReferenceRules[1].id = duplicate.missionReferenceRules[0].id;
assert.throws(() => validateCanonicalMissionFacts(duplicate), /duplicate canonical ID/);
const unknownFaqTarget = clone(canonical);
unknownFaqTarget.faqOverlays.find(({id}) => id === 'faq-end-of-battle-scoring-timing').targetId = 'mission-reference-unknown';
assert.throws(() => validateCanonicalMissionFacts(unknownFaqTarget), /unknown FAQ target/);
const scopeLeak = clone(canonical);
scopeLeak.eventSequenceOverlays[0].applicableScopes = ['STANDARD_MATCHED_PLAY'];
assert.throws(() => validateCanonicalMissionFacts(scopeLeak), /event overlay scope leak/);
const promotedAuthority = clone(canonical);
promotedAuthority.provenanceProfiles.find(({id}) => id === 'provenance-chapter-approved-secondary-corroborated').contentEvidenceAuthority = 'official';
assert.throws(() => validateCanonicalMissionFacts(promotedAuthority), /secondary evidence must not be promoted/);
const missingMatrix = clone(canonical);
missingMatrix.forceDispositions[0].missionMatrixRelations.pop();
assert.throws(() => assertFullCorpusCompleteness(missingMatrix));
const missingLayout = clone(canonical);
missingLayout.forceDispositionMatchups[0].layoutIds.pop();
assert.throws(() => validateCanonicalMissionFacts(missingLayout), /exactly three valid layouts required/);

console.log('MISSION_FULL_CORPUS_QA=PASS');
console.log('CONTRACT_EXTENSION_FULL_CURRENT_CORPUS=PASS');
console.log('CONTRACT_EXTENSION_APPENDIX_REFERENCE=PASS');
console.log('CONTRACT_EXTENSION_MISSION_WIDE_FAQ_TARGET=PASS');
console.log('PHYSICAL_CARD_ACCOUNTING=88/88');
console.log('PRIMARY_MATRIX=25/25');
console.log('UNORDERED_MATCHUPS=15/15');
console.log('EVENT_LAYOUTS=45/45');
console.log('UNMODELED_ACCEPTED_FACTS=0');
console.log('PENDING_DEPLOYMENT_GEOMETRIES=6');
console.log('PENDING_EVENT_LAYOUT_GEOMETRIES=45');
console.log('STANDARD_EVENT_SCOPE=PASS');
console.log('MISSIONS_GLOSSARY_READY=YES');
console.log('DETERMINISTIC_OUTPUT=PASS');
