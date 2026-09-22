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
const sourceManifest = readJson('missions/sources/source-manifest.json');
const gdmReferences = readJson('missions/sources/game-data-missions-terrain-reference-2026-09-22.json');

function clone(value) {
  return structuredClone(value);
}

function canonicalRecordIds(facts) {
  return [
    ...facts.forceDispositions,
    ...facts.primaryMissions,
    ...facts.secondaryMissions,
    ...facts.deployments,
    ...facts.twists,
    ...facts.missionSequenceRules,
    ...facts.faqOverlays,
    ...facts.forceDispositionMatchups,
    ...facts.eventSequenceOverlays,
    ...facts.terrainLayouts
  ].map(({id}) => id);
}

function sourceEvidenceIds() {
  return new Set([
    ...Object.values(evidence.records).flat().map(({id}) => id),
    ...evidence.faqOverlays.map(({id}) => id)
  ]);
}

assert.equal(evidence.contentStatus.chapterApprovedRulesContent, 'COMPLETE_FOR_MODELING');
assert.equal(evidence.contentStatus.contentGap, false);
assert.equal(evidence.contentStatus.userSourceNeeded, false);
assert.deepEqual(evidence.physicalAccounting, {
  primaryMissionCards: 30,
  secondaryObjectiveCards: 36,
  forceDispositionCards: 10,
  deploymentCards: 6,
  twistCards: 6,
  totalCards: 88,
  referenceBookletPages: 10
});
assert.equal(evidence.semanticAccounting.primaryMissions, 25);
assert.equal(evidence.semanticAccounting.secondaryObjectives, 18);
assert.equal(evidence.semanticAccounting.forceDispositions, 5);
assert.equal(evidence.semanticAccounting.eventLayoutsReferenced, 45);
assert.equal(evidence.records.primaryMissions.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 30);
assert.equal(evidence.records.primaryMissions.length, 25);
assert.equal(evidence.records.secondaryObjectives.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 36);
assert.equal(evidence.records.secondaryObjectives.length, 18);
assert.equal(evidence.records.forceDispositions.reduce((sum, record) => sum + record.physicalMultiplicity, 0), 10);
assert.equal(evidence.records.forceDispositions.length, 5);

validateCanonicalMissionFacts(canonical);
const ids = canonicalRecordIds(canonical);
assert.equal(new Set(ids).size, ids.length, 'canonical IDs must be globally unique');
assert.equal(canonical.importCoverage, 'REPRESENTATIVE_FOUNDATION');

const evidenceIds = sourceEvidenceIds();
for (const partition of ['forceDispositions', 'primaryMissions', 'secondaryMissions', 'deployments', 'twists', 'missionSequenceRules', 'faqOverlays']) {
  for (const record of canonical[partition]) {
    assert.ok(evidenceIds.has(record.provenance.sourceRecordId), `${record.id} source record must resolve in evidence manifest`);
  }
}

const deathTrap = canonical.primaryMissions.find(({id}) => id === 'primary-death-trap');
assert.equal(deathTrap.ruleBody.objectiveAction.id, 'objective-action-booby-trap');
assert.equal(deathTrap.ruleBody.objectiveAction.sourceSide, 'REVERSE');
assert.ok(!canonical.primaryMissions.some(({id}) => id === 'objective-action-booby-trap'), 'Primary back must not become a separate mission');
const plunder = canonical.secondaryMissions.find(({id}) => id === 'secondary-plunder');
assert.equal(plunder.physicalMultiplicity, 2);
assert.deepEqual(plunder.presentationCopies, ['ATTACKER', 'DEFENDER']);
assert.equal(plunder.presentationCopiesAreSeparateSemantics, false);
assert.equal(canonical.secondaryMissions.filter(({id}) => id === 'secondary-plunder').length, 1);

const deployment = canonical.deployments.find(({id}) => id === 'deployment-dawn-of-war');
assert.equal(deployment.geometry.kind, 'DEPLOYMENT_GEOMETRY');
assert.equal(deployment.geometry.coordinateSystem.unit, 'INCH');
assert.equal(deployment.geometry.digitizationStatus, 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION');
for (const layout of canonical.terrainLayouts) {
  assert.equal(layout.geometry.kind, 'TERRAIN_LAYOUT_GEOMETRY');
  assert.notEqual(layout.geometry.kind, deployment.geometry.kind);
  assert.equal(layout.geometry.coordinateSystem.unit, 'INCH');
  assert.equal(layout.geometry.coordinateSystem.battlefield.width, 44);
  assert.equal(layout.geometry.coordinateSystem.battlefield.height, 60);
  assert.ok(layout.geometry.sourceMeasurementValuesInches.length > 0);
  assert.equal(layout.visualReferences.factualAuthority, false);
  assert.equal(layout.visualReferences.authorityClass, 'SECONDARY_VISUAL_REFERENCE');
}

const matchup = canonical.forceDispositionMatchups[0];
assert.equal(matchup.id, canonicalMatchupId('force-disposition-take-and-hold', 'force-disposition-disruption'));
assert.equal(matchup.id, canonicalMatchupId('force-disposition-disruption', 'force-disposition-take-and-hold'));
assert.deepEqual(canonical.terrainLayouts.map(({variant}) => variant).sort(), ['A', 'B', 'C']);
assert.equal(new Set(matchup.layoutIds).size, 3);
const gdmMatchup = gdmReferences.matchups.find(({id}) => id === 'take-and-hold--disruption');
assert.ok(gdmMatchup);
for (const [index, canonicalLayout] of canonical.terrainLayouts.entries()) {
  const referenceLayout = gdmMatchup.layouts[index];
  assert.equal(canonicalLayout.variant, referenceLayout.officialLayoutIdentity);
  assert.equal(canonicalLayout.geometry.sourceRegistration.page, referenceLayout.officialPdfPage);
  assert.equal(canonicalLayout.visualReferences.plain.url, referenceLayout.assets.plain.url);
  assert.equal(canonicalLayout.visualReferences.plain.sha256, referenceLayout.assets.plain.sha256);
  assert.equal(canonicalLayout.visualReferences.measurements.url, referenceLayout.assets.measurements.url);
  assert.equal(canonicalLayout.visualReferences.measurements.sha256, referenceLayout.assets.measurements.sha256);
  assert.equal(referenceLayout.setupDistanceAssessment.officialGeometryRemainsAuthoritative, true);
}
assert.ok(matchup.directedPrimaryRelations.some((relation) => relation.playerForceDispositionId === 'force-disposition-disruption' && relation.primaryMissionId === 'primary-death-trap'));
assert.ok(matchup.directedPrimaryRelations.some((relation) => relation.playerForceDispositionId === 'force-disposition-take-and-hold' && relation.primaryMissionId === 'primary-determined-acquisition'));

const secondaryProfile = canonical.provenanceProfiles.find(({id}) => id === 'provenance-chapter-approved-secondary-corroborated');
assert.equal(secondaryProfile.factOwnerAuthority, 'official');
assert.equal(secondaryProfile.contentEvidenceAuthority, 'secondary');
assert.equal(secondaryProfile.evidenceClass, 'SECONDARY_CONTENT_SOURCE');
const physicalProfile = canonical.provenanceProfiles.find(({id}) => id === 'provenance-chapter-approved-physical-corroborated');
assert.equal(physicalProfile.factOwnerAuthority, 'official');
assert.equal(physicalProfile.contentEvidenceAuthority, 'secondary');
assert.equal(physicalProfile.evidenceClass, 'PHYSICAL_SOURCE_CORROBORATED');
const eventProfile = canonical.provenanceProfiles.find(({id}) => id === 'provenance-event-companion-v1-2-official');
assert.equal(eventProfile.contentEvidenceAuthority, 'official');
assert.equal(eventProfile.version, '1.2');

const manifestSources = [];
(function walk(value) {
  if (Array.isArray(value)) value.forEach(walk);
  else if (value && typeof value === 'object') {
    if (value.sourceId) manifestSources.push(value);
    Object.values(value).forEach(walk);
  }
})(sourceManifest);
const v10 = manifestSources.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.0-2026-06-12');
const v11 = manifestSources.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.1-2026-07-22');
const v12 = manifestSources.find(({sourceId}) => sourceId === 'wh40k-11e-event-companion-v1.2-2026-08-26');
assert.equal(v10.currentStatus, 'SUPERSEDED');
assert.equal(v11.currentStatus, 'SUPERSEDED');
assert.equal(v12.currentStatus, 'CURRENT_AT_2026_09_22');
assert.equal(v12.version, '1.2');
assert.equal(v12.coverage.eventLayouts, 45);

const canonicalBefore = JSON.stringify(canonical);
const standard = createEffectiveMissionCatalog({canonicalFacts: canonical});
assert.equal(JSON.stringify(canonical), canonicalBefore, 'effective assembly must not mutate canonical facts');
assert.equal(standard.catalog.scope, MISSION_SCOPES.STANDARD_MATCHED_PLAY);
assert.equal(standard.catalog.terrainLayouts.length, 0, 'Event layouts must not leak into standard play');
assert.ok(standard.getById('deployment-dawn-of-war'));
assert.ok(standard.getById('twist-night-fighting'));
assert.equal(standard.getById('event-mission-sequence-determine-layout'), null);
assert.equal(standard.getPrimaryForForceDispositions('force-disposition-take-and-hold', 'force-disposition-take-and-hold').id, 'primary-battlefield-dominance');
assert.deepEqual(standard.getLayoutsForMatchup('force-disposition-disruption', 'force-disposition-take-and-hold'), []);
assert.ok(Object.isFrozen(standard.catalog));
assert.ok(Object.isFrozen(standard.catalog.primaryMissions[0].ruleBody));

const effectiveDeathTrap = standard.getById('primary-death-trap');
assert.deepEqual(effectiveDeathTrap.effectiveClarifications.map(({overlayId}) => overlayId), ['faq-death-trap-terrain-area-timing']);
assert.equal(effectiveDeathTrap.provenance.profileId, 'provenance-chapter-approved-secondary-corroborated');
assert.equal(effectiveDeathTrap.effectiveClarifications[0].provenance.profileId, 'provenance-event-companion-v1-2-official');

const event = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: canonical});
assert.equal(event.catalog.sourceSelection.eventVersion, '1.2');
assert.equal(event.catalog.deployments.length, 0);
assert.equal(event.catalog.twists.length, 0);
assert.equal(event.catalog.terrainLayouts.length, 3);
assert.ok(event.getById('event-mission-sequence-determine-layout'));
assert.equal(event.getById('mission-sequence-determine-deployment'), null);
assert.equal(event.getById('mission-sequence-optional-twist'), null);
assert.equal(event.getById('mission-sequence-create-battlefield'), null);
assert.deepEqual(event.getLayoutsForMatchup('force-disposition-disruption', 'force-disposition-take-and-hold').map(({variant}) => variant), ['A', 'B', 'C']);
assert.deepEqual(event.getLayoutsForMatchup('force-disposition-take-and-hold', 'force-disposition-disruption').map(({variant}) => variant), ['A', 'B', 'C']);

const renamed = clone(canonical);
renamed.forceDispositions[0].label = 'Collision label';
renamed.forceDispositions[1].label = 'Collision label';
renamed.terrainLayouts.forEach((layout) => { layout.label = 'Renamed visual label'; });
const renamedEvent = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: renamed});
assert.equal(renamedEvent.getLayoutsForMatchup('force-disposition-take-and-hold', 'force-disposition-disruption').length, 3, 'labels cannot authorize joins');
const renamedStandard = createEffectiveMissionCatalog({canonicalFacts: renamed});
assert.equal(renamedStandard.getPrimaryForForceDispositions('force-disposition-take-and-hold', 'force-disposition-take-and-hold').id, 'primary-battlefield-dominance');

const shuffled = clone(canonical);
for (const partition of ['forceDispositions', 'primaryMissions', 'secondaryMissions', 'deployments', 'twists', 'missionSequenceRules', 'faqOverlays', 'forceDispositionMatchups', 'eventSequenceOverlays', 'terrainLayouts']) shuffled[partition].reverse();
const eventFromShuffled = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: shuffled});
assert.equal(JSON.stringify(eventFromShuffled.catalog), JSON.stringify(event.catalog), 'effective output must be deterministic across input ordering');

const duplicate = clone(canonical);
duplicate.twists.push(clone(duplicate.twists[0]));
assert.throws(() => validateCanonicalMissionFacts(duplicate), /duplicate canonical ID/);
const wrongScope = clone(canonical);
wrongScope.eventSequenceOverlays[0].applicableScopes = ['STANDARD_MATCHED_PLAY'];
assert.throws(() => validateCanonicalMissionFacts(wrongScope), /event overlay scope leak/);
const promotedSecondary = clone(canonical);
promotedSecondary.provenanceProfiles.find(({id}) => id === 'provenance-chapter-approved-secondary-corroborated').contentEvidenceAuthority = 'official';
assert.throws(() => validateCanonicalMissionFacts(promotedSecondary), /secondary evidence must not be promoted/);
const visualAuthorityPoison = clone(canonical);
visualAuthorityPoison.terrainLayouts[0].visualReferences.factualAuthority = true;
assert.throws(() => validateCanonicalMissionFacts(visualAuthorityPoison), /visual reference cannot own facts/);
const visualMutation = clone(canonical);
visualMutation.terrainLayouts[0].visualReferences.plain.url = 'https://invalid.example/poison.png';
const visualMutationEvent = createEffectiveMissionCatalog({scope: MISSION_SCOPES.EVENT_PLAY, canonicalFacts: visualMutation});
assert.deepEqual(visualMutationEvent.catalog.terrainLayouts[0].geometry, event.catalog.terrainLayouts[0].geometry, 'secondary visual reference cannot alter official geometry');

console.log('MISSION_DOMAIN_FOUNDATION_QA=PASS');
console.log(`REPRESENTATIVE_FORCE_DISPOSITIONS=${canonical.forceDispositions.length}`);
console.log(`REPRESENTATIVE_PRIMARIES=${canonical.primaryMissions.length}`);
console.log(`REPRESENTATIVE_SECONDARIES=${canonical.secondaryMissions.length}`);
console.log(`REPRESENTATIVE_DEPLOYMENTS=${canonical.deployments.length}`);
console.log(`REPRESENTATIVE_TWISTS=${canonical.twists.length}`);
console.log(`REPRESENTATIVE_SEQUENCE_RULES=${canonical.missionSequenceRules.length}`);
console.log(`REPRESENTATIVE_EVENT_LAYOUTS=${canonical.terrainLayouts.length}`);
console.log('STANDARD_EVENT_SCOPE_ISOLATION=PASS');
console.log('SOURCE_AUTHORITY_PRESERVATION=PASS');
console.log('DETERMINISTIC_EFFECTIVE_OUTPUT=PASS');
console.log('ADVERSARIAL_MUTATIONS=PASS');
