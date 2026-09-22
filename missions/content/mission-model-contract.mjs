const ID_PATTERN = /^[a-z0-9]+(?:-{1,2}[a-z0-9]+)*$/;
const SCOPES = new Set(['STANDARD_MATCHED_PLAY', 'EVENT_PLAY']);
const RECORD_PARTITIONS = [
  'forceDispositions',
  'primaryMissions',
  'secondaryMissions',
  'deployments',
  'twists',
  'missionSequenceRules',
  'missionReferenceRules',
  'faqOverlays',
  'forceDispositionMatchups',
  'eventSequenceOverlays',
  'terrainLayouts'
];

const RECORD_TYPES = Object.freeze({
  forceDispositions: 'FORCE_DISPOSITION',
  primaryMissions: 'PRIMARY_MISSION',
  secondaryMissions: 'SECONDARY_MISSION',
  deployments: 'DEPLOYMENT',
  twists: 'TWIST',
  missionSequenceRules: 'MISSION_SEQUENCE_RULE',
  missionReferenceRules: 'MISSION_REFERENCE_RULE',
  faqOverlays: 'FAQ_OVERLAY',
  forceDispositionMatchups: 'FORCE_DISPOSITION_MATCHUP',
  eventSequenceOverlays: 'EVENT_SEQUENCE_OVERLAY',
  terrainLayouts: 'TERRAIN_LAYOUT'
});
const FULL_CURRENT_COUNTS = Object.freeze({
  forceDispositions: 5,
  primaryMissions: 25,
  secondaryMissions: 18,
  deployments: 6,
  twists: 6,
  missionReferenceRules: 5,
  forceDispositionMatchups: 15,
  terrainLayouts: 45
});
function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function assertId(id, context) {
  invariant(typeof id === 'string' && ID_PATTERN.test(id), `${context}: invalid canonical ID ${JSON.stringify(id)}`);
}

function assertUniqueIds(records, context) {
  const seen = new Set();
  for (const record of records) {
    assertId(record.id, context);
    invariant(!seen.has(record.id), `${context}: duplicate canonical ID ${record.id}`);
    seen.add(record.id);
  }
  return seen;
}

function assertScopes(scopes, context) {
  invariant(Array.isArray(scopes) && scopes.length > 0, `${context}: applicableScopes must be non-empty`);
  for (const scope of scopes) invariant(SCOPES.has(scope), `${context}: unknown scope ${scope}`);
}

function assertProvenance(record, profileIds, context) {
  const provenance = record.provenance;
  invariant(provenance && typeof provenance === 'object', `${context}: provenance is required`);
  invariant(profileIds.has(provenance.profileId), `${context}: unknown provenance profile ${provenance.profileId}`);
  invariant(typeof provenance.sourceRecordId === 'string' && provenance.sourceRecordId.length > 0, `${context}: sourceRecordId is required`);
  invariant(typeof provenance.contentLocator === 'string' && provenance.contentLocator.length > 0, `${context}: contentLocator is required`);
  assertScopes(provenance.applicableScopes, context);
  invariant(Array.isArray(provenance.amendmentIds), `${context}: amendmentIds must be an array`);
}

function assertCoordinateSystem(coordinateSystem, context) {
  invariant(coordinateSystem?.unit === 'INCH', `${context}: geometry unit must be INCH`);
  invariant(coordinateSystem.origin === 'TOP_LEFT', `${context}: unsupported origin`);
  invariant(coordinateSystem.xAxis === 'RIGHT' && coordinateSystem.yAxis === 'DOWN', `${context}: unsupported axes`);
  invariant(Number.isFinite(coordinateSystem.battlefield?.width) && coordinateSystem.battlefield.width > 0, `${context}: battlefield width is required`);
  invariant(Number.isFinite(coordinateSystem.battlefield?.height) && coordinateSystem.battlefield.height > 0, `${context}: battlefield height is required`);
}

function assertPoint(point, coordinateSystem, context) {
  invariant(Number.isFinite(point?.x) && Number.isFinite(point?.y), `${context}: point coordinates must be finite`);
  invariant(point.x >= 0 && point.x <= coordinateSystem.battlefield.width, `${context}: x is outside battlefield`);
  invariant(point.y >= 0 && point.y <= coordinateSystem.battlefield.height, `${context}: y is outside battlefield`);
}

function assertShape(shape, coordinateSystem, context) {
  invariant(shape && typeof shape === 'object', `${context}: shape is required`);
  if (shape.type === 'POINT') return assertPoint(shape, coordinateSystem, context);
  if (shape.type === 'CIRCLE') {
    assertPoint(shape.center, coordinateSystem, context);
    invariant(Number.isFinite(shape.radius) && shape.radius > 0, `${context}: circle radius must be positive`);
    return;
  }
  if (shape.type === 'RECT') {
    assertPoint({x: shape.x, y: shape.y}, coordinateSystem, context);
    invariant(Number.isFinite(shape.width) && shape.width > 0, `${context}: rectangle width must be positive`);
    invariant(Number.isFinite(shape.height) && shape.height > 0, `${context}: rectangle height must be positive`);
    invariant(shape.x + shape.width <= coordinateSystem.battlefield.width, `${context}: rectangle exceeds battlefield width`);
    invariant(shape.y + shape.height <= coordinateSystem.battlefield.height, `${context}: rectangle exceeds battlefield height`);
    return;
  }
  if (shape.type === 'POLYGON') {
    invariant(Array.isArray(shape.points) && shape.points.length >= 3, `${context}: polygon needs at least three points`);
    for (const point of shape.points) assertPoint(point, coordinateSystem, context);
    return;
  }
  throw new Error(`${context}: unsupported shape type ${shape.type}`);
}

function assertGeometry(geometry, context) {
  invariant(geometry && typeof geometry === 'object', `${context}: geometry is required`);
  invariant(['DEPLOYMENT_GEOMETRY', 'TERRAIN_LAYOUT_GEOMETRY'].includes(geometry.kind), `${context}: unknown geometry kind`);
  invariant(['VERIFIED_MACHINE_GEOMETRY', 'SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION'].includes(geometry.digitizationStatus), `${context}: unknown digitization status`);
  assertCoordinateSystem(geometry.coordinateSystem, context);
  for (const collection of ['zones', 'objectives', 'terrainAreas', 'measurements']) {
    invariant(Array.isArray(geometry[collection]), `${context}: ${collection} must be an array`);
  }
  const localIds = new Set();
  for (const collection of ['zones', 'objectives', 'terrainAreas', 'measurements']) {
    for (const item of geometry[collection]) {
      assertId(item.id, `${context}.${collection}`);
      invariant(!localIds.has(item.id), `${context}: duplicate geometry ID ${item.id}`);
      localIds.add(item.id);
    }
  }
  for (const zone of geometry.zones) assertShape(zone.shape, geometry.coordinateSystem, `${context}.zone.${zone.id}`);
  for (const objective of geometry.objectives) assertShape(objective.shape, geometry.coordinateSystem, `${context}.objective.${objective.id}`);
  for (const area of geometry.terrainAreas) {
    invariant(Array.isArray(area.componentCodes) && area.componentCodes.length > 0, `${context}.${area.id}: componentCodes required`);
    if (area.footprint) assertShape(area.footprint, geometry.coordinateSystem, `${context}.terrain.${area.id}`);
  }
  for (const measurement of geometry.measurements) {
    invariant(Number.isFinite(measurement.distanceInches) && measurement.distanceInches > 0, `${context}.${measurement.id}: distanceInches must be positive`);
    invariant(typeof measurement.fromRef === 'string' && typeof measurement.toRef === 'string', `${context}.${measurement.id}: measurement endpoints required`);
  }
  if (geometry.sourceMeasurementValuesInches !== undefined) {
    invariant(Array.isArray(geometry.sourceMeasurementValuesInches) && geometry.sourceMeasurementValuesInches.length > 0, `${context}: source measurement values must be a non-empty array`);
    invariant(geometry.sourceMeasurementValuesInches.every((value) => Number.isFinite(value) && value > 0), `${context}: source measurement values must be positive`);
  }
  if (geometry.digitizationStatus === 'VERIFIED_MACHINE_GEOMETRY') {
    invariant(geometry.sourceRegistration, `${context}: verified geometry needs source registration`);
    invariant(geometry.terrainAreas.every((area) => area.footprint), `${context}: verified terrain geometry cannot omit footprints`);
  } else {
    invariant(geometry.sourceRegistration, `${context}: pending geometry needs authenticated source registration`);
    invariant(Array.isArray(geometry.requiredVerifiedLayers) && geometry.requiredVerifiedLayers.length > 0, `${context}: pending geometry must name missing verified layers`);
  }
}

export function canonicalMatchupId(forceDispositionA, forceDispositionB) {
  for (const id of [forceDispositionA, forceDispositionB]) assertId(id, 'canonicalMatchupId');
  const members = [forceDispositionA, forceDispositionB].sort();
  const suffixes = members.map((id) => id.replace(/^force-disposition-/, ''));
  return `force-disposition-matchup-${suffixes.join('--')}`;
}

export function validateCanonicalMissionFacts(facts) {
  invariant(facts?.schema === 'wh40k-canonical-mission-facts/v1', 'Unsupported mission fact schema');
  invariant(facts.edition === 'Warhammer 40,000 11th Edition', 'Only Warhammer 40,000 11th Edition is supported');
  invariant(facts.cutoff === '2026-09-22', 'Unexpected currentness cutoff');
  invariant(
    ['REPRESENTATIVE_FOUNDATION', 'FULL_CURRENT_CORPUS'].includes(facts.importCoverage),
    'Unknown mission import coverage'
  );
  const isFullCorpus = facts.importCoverage === 'FULL_CURRENT_CORPUS';

  const profileIds = assertUniqueIds(facts.provenanceProfiles ?? [], 'provenanceProfiles');
  for (const profile of facts.provenanceProfiles) {
    invariant(['official', 'secondary'].includes(profile.factOwnerAuthority), `${profile.id}: invalid fact owner authority`);
    invariant(['official', 'secondary'].includes(profile.contentEvidenceAuthority), `${profile.id}: invalid evidence authority`);
    if (profile.evidenceClass === 'SECONDARY_CONTENT_SOURCE') {
      invariant(profile.contentEvidenceAuthority === 'secondary', `${profile.id}: secondary evidence must not be promoted to official`);
    }
  }

  const records = [];
  for (const partition of RECORD_PARTITIONS) {
    invariant(Array.isArray(facts[partition]), `${partition} must be an array`);
    for (const record of facts[partition]) {
      invariant(record.recordType === RECORD_TYPES[partition], `${partition}.${record.id}: wrong recordType`);
      invariant(typeof record.label === 'string' && record.label.length > 0, `${partition}.${record.id}: canonical label is required`);
      invariant(Array.isArray(record.aliases), `${partition}.${record.id}: aliases must be an array`);
      invariant(Array.isArray(record.references), `${partition}.${record.id}: references must be an array`);
      records.push({record, partition});
    }
  }
  if (isFullCorpus) {
    for (const [partition, expectedCount] of Object.entries(FULL_CURRENT_COUNTS)) {
      invariant(facts[partition].length === expectedCount, `${partition}: FULL_CURRENT_CORPUS requires ${expectedCount} records`);
    }
    invariant(
      facts.forceDispositions.reduce((sum, record) => sum + (record.missionMatrixRelations?.length ?? 0), 0) === 25,
      'FULL_CURRENT_CORPUS requires the complete 25-cell Primary mission matrix'
    );
  }
  const allIds = assertUniqueIds(records.map(({record}) => record), 'mission records');
  for (const {record, partition} of records) assertProvenance(record, profileIds, `${partition}.${record.id}`);

  const forceIds = new Set(facts.forceDispositions.map(({id}) => id));
  const primaryIds = new Set(facts.primaryMissions.map(({id}) => id));
  const secondaryIds = new Set(facts.secondaryMissions.map(({id}) => id));
  const matchupIds = new Set(facts.forceDispositionMatchups.map(({id}) => id));
  const layoutIds = new Set(facts.terrainLayouts.map(({id}) => id));
  const sequenceIds = new Set(facts.missionSequenceRules.map(({id}) => id));
  const referenceRuleIds = new Set(facts.missionReferenceRules.map(({id}) => id));

  for (const forceDisposition of facts.forceDispositions) {
    invariant(Array.isArray(forceDisposition.missionMatrixRelations), `${forceDisposition.id}: missionMatrixRelations must be an array`);
    for (const relation of forceDisposition.missionMatrixRelations) {
      invariant(forceIds.has(relation.opponentForceDispositionId), `${forceDisposition.id}: unknown opponent Force Disposition`);
      if (isFullCorpus) invariant(relation.resolvedInRepresentativeCatalog !== false, `${forceDisposition.id}: full corpus cannot retain an unresolved representative relation`);
      if (relation.resolvedInRepresentativeCatalog !== false) invariant(primaryIds.has(relation.primaryMissionId), `${forceDisposition.id}: unresolved Primary ${relation.primaryMissionId}`);
    }
  }
  for (const primary of facts.primaryMissions) {
    invariant(forceIds.has(primary.playerForceDispositionId), `${primary.id}: unknown player Force Disposition`);
    invariant(forceIds.has(primary.opponentForceDispositionId), `${primary.id}: unknown opponent Force Disposition`);
    invariant(primary.ruleBody && Array.isArray(primary.ruleBody.scoringClauses), `${primary.id}: structured ruleBody required`);
    if (primary.ruleBody.objectiveAction) assertId(primary.ruleBody.objectiveAction.id, `${primary.id}.objectiveAction`);
  }
  for (const secondary of facts.secondaryMissions) {
    invariant(secondary.ruleBody && Array.isArray(secondary.ruleBody.scoringClauses), `${secondary.id}: structured ruleBody required`);
    invariant(secondary.presentationCopiesAreSeparateSemantics === false, `${secondary.id}: physical copies cannot create semantic identities`);
    if (secondary.ruleBody.objectiveAction) assertId(secondary.ruleBody.objectiveAction.id, `${secondary.id}.objectiveAction`);
  }
  for (const deployment of facts.deployments) {
    assertGeometry(deployment.geometry, deployment.id);
    invariant(deployment.geometry.kind === 'DEPLOYMENT_GEOMETRY', `${deployment.id}: deployment must not use terrain-layout geometry`);
  }
  for (const layout of facts.terrainLayouts) {
    invariant(matchupIds.has(layout.matchupId), `${layout.id}: unknown matchup ${layout.matchupId}`);
    assertGeometry(layout.geometry, layout.id);
    invariant(layout.geometry.kind === 'TERRAIN_LAYOUT_GEOMETRY', `${layout.id}: terrain layout must not be a Deployment`);
    invariant(layout.visualReferences?.factualAuthority === false, `${layout.id}: visual reference cannot own facts`);
    invariant(layout.visualReferences?.authorityClass === 'SECONDARY_VISUAL_REFERENCE', `${layout.id}: visual reference authority class is required`);
  }
  for (const matchup of facts.forceDispositionMatchups) {
    invariant(matchup.unordered === true && matchup.reverseOrderEquivalent === true, `${matchup.id}: matchup must be unordered`);
    invariant(matchup.memberForceDispositionIds.length === 2, `${matchup.id}: matchup needs two members`);
    invariant(matchup.memberForceDispositionIds.every((id) => forceIds.has(id)), `${matchup.id}: unknown Force Disposition member`);
    invariant(matchup.id === canonicalMatchupId(...matchup.memberForceDispositionIds), `${matchup.id}: ID does not match unordered members`);
    invariant(matchup.layoutIds.length === 3 && matchup.layoutIds.every((id) => layoutIds.has(id)), `${matchup.id}: exactly three valid layouts required`);
    invariant(new Set(matchup.layoutIds.map((id) => facts.terrainLayouts.find((layout) => layout.id === id).variant)).size === 3, `${matchup.id}: layouts A/B/C required`);
    for (const relation of matchup.directedPrimaryRelations) {
      invariant(forceIds.has(relation.playerForceDispositionId) && forceIds.has(relation.opponentForceDispositionId), `${matchup.id}: invalid directed relation`);
      if (isFullCorpus) invariant(relation.resolvedInRepresentativeCatalog !== false, `${matchup.id}: full corpus cannot retain an unresolved representative relation`);
      if (relation.resolvedInRepresentativeCatalog !== false) invariant(primaryIds.has(relation.primaryMissionId), `${matchup.id}: unresolved Primary ${relation.primaryMissionId}`);
    }
  }
  for (const referenceRule of facts.missionReferenceRules) {
    invariant(referenceRule.ruleBody && typeof referenceRule.ruleBody === 'object', `${referenceRule.id}: structured ruleBody required`);
  }
  for (const overlay of facts.faqOverlays) {
    invariant(overlay.operation === 'APPEND_CLARIFICATION', `${overlay.id}: unsupported FAQ operation`);
    invariant(
      primaryIds.has(overlay.targetId)
        || secondaryIds.has(overlay.targetId)
        || sequenceIds.has(overlay.targetId)
        || referenceRuleIds.has(overlay.targetId),
      `${overlay.id}: unknown FAQ target`
    );
    assertScopes(overlay.applicableScopes, overlay.id);
  }
  for (const overlay of facts.eventSequenceOverlays) {
    invariant(overlay.operation === 'REPLACE_SEQUENCE_STAGES', `${overlay.id}: unsupported event sequence operation`);
    invariant(overlay.applicableScopes.length === 1 && overlay.applicableScopes[0] === 'EVENT_PLAY', `${overlay.id}: event overlay scope leak`);
    invariant(overlay.replacesSequenceRuleIds.every((id) => sequenceIds.has(id)), `${overlay.id}: unknown replaced sequence stage`);
    assertId(overlay.replacementRule?.id, `${overlay.id}.replacementRule`);
  }

  invariant(allIds.size === records.length, 'Mission record IDs must be globally unique');
  return facts;
}

export const MISSION_SCOPES = Object.freeze({
  STANDARD_MATCHED_PLAY: 'STANDARD_MATCHED_PLAY',
  EVENT_PLAY: 'EVENT_PLAY'
});
