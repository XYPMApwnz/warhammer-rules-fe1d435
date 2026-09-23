const MISSION_RECORD_PARTITIONS = Object.freeze([
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
]);

function collectRecordReferences(record, partition) {
  const references = [];
  for (const [index, reference] of (record.references ?? []).entries()) {
    if (reference.relationType === 'CORE_RULE') {
      references.push({id: reference.id, ownerId: record.id, path: `${partition}.${record.id}.references[${index}].id`});
    }
  }
  for (const [index, operation] of (record.ruleBody?.operations ?? []).entries()) {
    if (operation.type === 'REMOVE_TERRAIN_RULE') {
      references.push({
        id: operation.canonicalTarget,
        ownerId: record.id,
        path: `${partition}.${record.id}.ruleBody.operations[${index}].canonicalTarget`
      });
    }
  }
  for (const [index, reference] of (record.replacementRule?.references ?? []).entries()) {
    if (reference.relationType === 'CORE_RULE') {
      references.push({
        id: reference.id,
        ownerId: record.replacementRule.id,
        path: `${partition}.${record.id}.replacementRule.references[${index}].id`
      });
    }
  }
  return references;
}

function assertMirroredCoreReferences(record, context) {
  const explicit = (record.references ?? []).filter(({relationType}) => relationType === 'CORE_RULE').map(({id}) => id);
  const mirrored = record.ruleBody?.coreRuleRefs ?? record.coreRuleRefs ?? [];
  if (mirrored.length > 0 && JSON.stringify(explicit) !== JSON.stringify(mirrored)) {
    throw new Error(`${context}: canonical Core reference projection does not match explicit references`);
  }
}

export function collectMissionCoreReferences(facts) {
  const references = [];
  for (const partition of MISSION_RECORD_PARTITIONS) {
    for (const record of facts[partition] ?? []) references.push(...collectRecordReferences(record, partition));
  }
  return references;
}

export function validateMissionCoreReferences(facts, coreCatalog) {
  if (!coreCatalog || !Array.isArray(coreCatalog.records)) throw new Error('Effective Core catalog is required');
  const coreIds = new Set(coreCatalog.records.map(({id}) => id));
  for (const reference of collectMissionCoreReferences(facts)) {
    if (!coreIds.has(reference.id)) {
      throw new Error(`${reference.path}: unknown canonical Core ID ${reference.id}`);
    }
  }
  for (const partition of MISSION_RECORD_PARTITIONS) {
    for (const record of facts[partition] ?? []) {
      assertMirroredCoreReferences(record, `${partition}.${record.id}`);
      if (record.replacementRule) assertMirroredCoreReferences(record.replacementRule, `${partition}.${record.id}.replacementRule`);
    }
  }
  for (const twist of facts.twists ?? []) {
    for (const operation of twist.ruleBody?.operations ?? []) {
      if (operation.type === 'REMOVE_TERRAIN_RULE' && operation.canonicalTarget !== 'core-rule-13-11-solid') {
        throw new Error(`${twist.id}: REMOVE_TERRAIN_RULE has wrong canonical Core target ${operation.canonicalTarget}`);
      }
    }
  }
  return facts;
}
