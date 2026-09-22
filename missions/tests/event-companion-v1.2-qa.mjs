import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {MISSION_SCOPES, validateCanonicalMissionFacts} from '../content/mission-model-contract.mjs';
import {createEffectiveMissionCatalog} from '../content/effective-mission-catalog.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
const canonical = readJson('missions/content/chapter-approved-2026-27.canonical.json');
const evidence = readJson('missions/sources/chapter-approved-2026-27-evidence.json');
const clone = (value) => structuredClone(value);
const partitions = [
  'forceDispositions', 'primaryMissions', 'secondaryMissions', 'deployments', 'twists',
  'missionSequenceRules', 'missionReferenceRules', 'faqOverlays', 'forceDispositionMatchups',
  'eventSequenceOverlays', 'terrainLayouts'
];
const allRecords = (facts) => partitions.flatMap((partition) => facts[partition]);
const byId = new Map(allRecords(canonical).map((record) => [record.id, record]));

validateCanonicalMissionFacts(canonical);

// Every newly indexed official Event fact resolves to its canonical owner.
assert.deepEqual(evidence.eventMissionSemantics.map(({id}) => id).sort(), [
  'event-determine-layout-v1.2',
  'event-determine-mission-v1.2',
  'event-generating-command-points-v1.2',
  'event-muster-force-disposition-roster-preselection-v1.2',
  'event-operation-marker-faqs-v1.2'
]);
for (const item of evidence.eventMissionSemantics) {
  const record = byId.get(item.canonicalRecordId);
  assert.ok(record, `${item.id}: canonical owner is missing`);
  assert.equal(record.provenance.sourceRecordId, item.id);
  assert.deepEqual(record.provenance.applicableScopes, ['EVENT_PLAY']);
}

const standard = createEffectiveMissionCatalog({scope: MISSION_SCOPES.STANDARD_MATCHED_PLAY, canonicalFacts: canonical});
const event = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: canonical});

// Standard keeps its accepted sequence and receives no Event-only facts.
assert.equal(standard.catalog.missionSequenceRules.length, 18);
assert.equal(standard.catalog.missionReferenceRules.length, 5);
assert.deepEqual(standard.getById('mission-sequence-muster-armies').requirements, [
  {type: 'MUSTER_ARMIES_AS_DESCRIBED_IN_CORE_RULES'}
]);
assert.deepEqual(standard.getById('mission-sequence-determine-mission').requirements, [
  {type: 'SECRET_FORCE_DISPOSITION_SELECTION'},
  {type: 'SIMULTANEOUS_REVEAL'},
  {type: 'DIRECTED_PRIMARY_MATRIX_LOOKUP'}
]);
for (const id of [
  'event-mission-sequence-muster-armies',
  'event-mission-sequence-determine-mission',
  'mission-reference-event-generating-command-points',
  'mission-reference-operation-markers'
]) assert.equal(standard.getById(id), null, `${id}: Event fact leaked into Standard play`);

// Event v1.2 replaces the incompatible Standard selection stages.
assert.equal(event.catalog.missionSequenceRules.length, 16);
assert.equal(event.catalog.missionReferenceRules.length, 7);
assert.equal(event.getById('mission-sequence-muster-armies'), null);
assert.equal(event.getById('mission-sequence-determine-mission'), null);
const eventMuster = event.getById('event-mission-sequence-muster-armies');
assert.deepEqual(eventMuster.requirements.map(({type}) => type), [
  'MUSTER_ARMIES_AS_DESCRIBED_IN_WARHAMMER_40000_APP',
  'AFTER_MUSTERING_SELECT_ONE_AVAILABLE_FORCE_DISPOSITION',
  'RECORD_SELECTED_FORCE_DISPOSITION_ON_ROSTER',
  'COMPLETE_BEFORE_ATTENDING_EVENT'
]);
const eventDetermineMission = event.getById('event-mission-sequence-determine-mission');
assert.deepEqual(eventDetermineMission.requirements.map(({type}) => type), [
  'USE_PRESELECTED_FORCE_DISPOSITION_CARD',
  'FIND_OPPONENT_FORCE_DISPOSITION_SYMBOL_ON_OWN_CARD',
  'ASSIGN_LISTED_PRIMARY_MISSION_TO_PLAYER'
]);
assert.ok(event.getById('event-mission-sequence-determine-layout'));

const commandPoints = event.getById('mission-reference-event-generating-command-points');
assert.deepEqual(commandPoints.ruleBody, {
  type: 'COMMAND_POINT_GAIN_LIMIT',
  governedCommandPointSourceScope: 'ALL_NON_CORE_CP_SOURCES',
  excludedCoreGain: 'CORE_RULE_START_OF_COMMAND_PHASE_CP',
  maximumAdditionalCommandPointsPerPlayerPerBattleRound: 1,
  secondaryMissionDiscardCpCountsTowardLimit: true
});
const operationMarkers = event.getById('mission-reference-operation-markers');
assert.deepEqual(operationMarkers.effectiveClarifications.map(({overlayId}) => overlayId), [
  'faq-operation-marker-status-removal',
  'faq-primary-operation-marker-removal'
]);
assert.equal(operationMarkers.effectiveClarifications[0].clarification.sourceText, 'Yes.');
assert.match(operationMarkers.effectiveClarifications[1].clarification.sourceText, /If it doesn’t, you cannot remove operation markers\./);

// Relation-integrity mutations must fail even when all referenced IDs still exist.
const crossWiredMatrix = clone(canonical);
crossWiredMatrix.forceDispositions[0].missionMatrixRelations[0].primaryMissionId = canonical.primaryMissions[1].id;
assert.throws(() => validateCanonicalMissionFacts(crossWiredMatrix), /Primary matrix relation is cross-wired/);

const crossWiredMatchup = clone(canonical);
crossWiredMatchup.forceDispositionMatchups[0].directedPrimaryRelations[0].primaryMissionId = canonical.primaryMissions[1].id;
assert.throws(() => validateCanonicalMissionFacts(crossWiredMatchup), /directed Primary relation is cross-wired/);

const crossWiredLayoutList = clone(canonical);
crossWiredLayoutList.forceDispositionMatchups[0].layoutIds[0] = crossWiredLayoutList.forceDispositionMatchups[1].layoutIds[0];
assert.throws(() => validateCanonicalMissionFacts(crossWiredLayoutList), /layout relation is cross-wired/);

const crossWiredLayoutBackref = clone(canonical);
crossWiredLayoutBackref.terrainLayouts[0].matchupId = canonical.forceDispositionMatchups[1].id;
assert.throws(() => validateCanonicalMissionFacts(crossWiredLayoutBackref), /layout relation is cross-wired/);

for (const [partition, ids] of Object.entries({
  missionSequenceRules: canonical.missionSequenceRules.map(({id}) => id),
  missionReferenceRules: canonical.missionReferenceRules.map(({id}) => id),
  faqOverlays: canonical.faqOverlays.map(({id}) => id),
  eventSequenceOverlays: canonical.eventSequenceOverlays.map(({id}) => id)
})) {
  for (const id of ids) {
    const missing = clone(canonical);
    missing[partition] = missing[partition].filter((record) => record.id !== id);
    assert.throws(() => validateCanonicalMissionFacts(missing), /FULL_CURRENT_CORPUS requires|required IDs do not match/, `${partition}.${id} removal survived`);
  }
}

const countPreservingFaqSubstitution = clone(canonical);
countPreservingFaqSubstitution.faqOverlays[0].id = 'faq-valid-looking-substitute';
assert.throws(() => validateCanonicalMissionFacts(countPreservingFaqSubstitution), /required IDs do not match/);

const duplicateReplacement = clone(canonical);
duplicateReplacement.eventSequenceOverlays[1].replacementRule.id = duplicateReplacement.eventSequenceOverlays[0].replacementRule.id;
assert.throws(() => validateCanonicalMissionFacts(duplicateReplacement), /duplicate replacement rule ID/);

const duplicateReplacementTarget = clone(canonical);
duplicateReplacementTarget.eventSequenceOverlays[1].replacesSequenceRuleIds = [...duplicateReplacementTarget.eventSequenceOverlays[0].replacesSequenceRuleIds];
assert.throws(() => validateCanonicalMissionFacts(duplicateReplacementTarget), /sequence stage replaced more than once/);

const crossWiredFaqTarget = clone(canonical);
crossWiredFaqTarget.faqOverlays.find(({id}) => id === 'faq-primary-operation-marker-removal').targetId = 'primary-death-trap';
assert.throws(() => validateCanonicalMissionFacts(crossWiredFaqTarget), /FAQ target is cross-wired/);

const crossWiredEventTarget = clone(canonical);
crossWiredEventTarget.eventSequenceOverlays.find(({id}) => id === 'event-sequence-muster-armies-v1-2').replacesSequenceRuleIds = ['mission-sequence-declare-battle-formations'];
assert.throws(() => validateCanonicalMissionFacts(crossWiredEventTarget), /Event sequence target is cross-wired/);

const crossWiredEventReplacement = clone(canonical);
crossWiredEventReplacement.eventSequenceOverlays.find(({id}) => id === 'event-sequence-muster-armies-v1-2').replacementRule.id = 'event-mission-sequence-muster-armies-substitute';
assert.throws(() => validateCanonicalMissionFacts(crossWiredEventReplacement), /Event replacement identity is cross-wired/);

// Current entity/accounting and geometry state remain fixed.
assert.deepEqual({
  forceDispositions: canonical.forceDispositions.length,
  primaryMissions: canonical.primaryMissions.length,
  secondaryMissions: canonical.secondaryMissions.length,
  deployments: canonical.deployments.length,
  twists: canonical.twists.length,
  matchups: canonical.forceDispositionMatchups.length,
  layouts: canonical.terrainLayouts.length
}, {forceDispositions: 5, primaryMissions: 25, secondaryMissions: 18, deployments: 6, twists: 6, matchups: 15, layouts: 45});
assert.equal(canonical.deployments.filter(({geometry}) => geometry.digitizationStatus === 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION').length, 6);
assert.equal(canonical.terrainLayouts.filter(({geometry}) => geometry.digitizationStatus === 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION').length, 45);

const reversed = clone(canonical);
for (const partition of partitions) reversed[partition].reverse();
assert.equal(
  JSON.stringify(createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: reversed}).catalog),
  JSON.stringify(event.catalog)
);

console.log('EVENT_COMPANION_V1_2_FACTUAL_COVERAGE=PASS');
console.log('STANDARD_EVENT_ISOLATION=PASS');
console.log('PRIMARY_MATCHUP_LAYOUT_INTEGRITY=PASS');
console.log('REQUIRED_RECORD_REMOVAL_MUTATIONS=KILLED');
console.log('DETERMINISTIC_EFFECTIVE_OUTPUT=PASS');
