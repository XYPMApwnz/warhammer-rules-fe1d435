import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createEffectiveCoreCatalog} from '../../books/core-rules/content/effective-core-catalog.mjs';
import {canonicalMatchupId, MISSION_SCOPES, validateCanonicalMissionFacts} from './mission-model-contract.mjs';
import {validateMissionCoreReferences} from './mission-core-reference-contract.mjs';

const DEFAULT_FACTS_PATH = fileURLToPath(new URL('./chapter-approved-2026-27.canonical.json', import.meta.url));

function clone(value) {
  return structuredClone(value);
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

function byId(left, right) {
  return left.id.localeCompare(right.id);
}

function appliesToScope(record, scope) {
  return record.provenance?.applicableScopes?.includes(scope) || record.applicableScopes?.includes(scope);
}

function loadDefaultFacts() {
  return JSON.parse(fs.readFileSync(DEFAULT_FACTS_PATH, 'utf8'));
}

function selectBaseRecords(facts, partition, scope) {
  return facts[partition].filter((record) => appliesToScope(record, scope)).map(clone).sort(byId);
}

function buildRecordIndex(catalog) {
  const index = new Map();
  for (const partition of ['forceDispositions', 'primaryMissions', 'secondaryMissions', 'deployments', 'twists', 'missionSequenceRules', 'missionReferenceRules', 'forceDispositionMatchups', 'terrainLayouts']) {
    for (const record of catalog[partition]) index.set(record.id, record);
  }
  return index;
}

function applyFaqOverlays(facts, catalog, scope) {
  const index = buildRecordIndex(catalog);
  for (const overlay of facts.faqOverlays.filter((record) => appliesToScope(record, scope)).sort(byId)) {
    const target = index.get(overlay.targetId);
    if (!target) throw new Error(`${overlay.id}: effective FAQ target ${overlay.targetId} is missing`);
    target.effectiveClarifications ??= [];
    target.effectiveClarifications.push({
      overlayId: overlay.id,
      operation: overlay.operation,
      clarification: clone(overlay.clarification),
      provenance: clone(overlay.provenance)
    });
  }
}

function applyEventSequence(facts, catalog, scope) {
  if (scope !== MISSION_SCOPES.EVENT_PLAY) return;
  for (const overlay of facts.eventSequenceOverlays.filter((record) => appliesToScope(record, scope)).sort(byId)) {
    const replaced = new Set(overlay.replacesSequenceRuleIds);
    catalog.missionSequenceRules = catalog.missionSequenceRules.filter((record) => !replaced.has(record.id));
    catalog.missionSequenceRules.push({
      ...clone(overlay.replacementRule),
      appliedOverlayId: overlay.id,
      provenance: clone(overlay.provenance)
    });
  }
  catalog.missionSequenceRules.sort((left, right) => left.order - right.order || left.id.localeCompare(right.id));
}

export function createEffectiveMissionCatalog({
  scope = MISSION_SCOPES.STANDARD_MATCHED_PLAY,
  asOf = '2026-09-22',
  canonicalFacts = loadDefaultFacts(),
  coreCatalog = createEffectiveCoreCatalog()
} = {}) {
  if (!Object.values(MISSION_SCOPES).includes(scope)) throw new Error(`Unknown mission catalog scope ${scope}`);
  if (asOf !== canonicalFacts.cutoff) throw new Error(`No accepted mission snapshot for cutoff ${asOf}`);
  validateCanonicalMissionFacts(canonicalFacts);
  validateMissionCoreReferences(canonicalFacts, coreCatalog);

  const catalog = {
    schema: 'wh40k-effective-mission-catalog/v1',
    edition: canonicalFacts.edition,
    cutoff: asOf,
    scope,
    importCoverage: canonicalFacts.importCoverage,
    sourceSelection: {
      standardSourceId: 'wh40k-11e-chapter-approved-2026-27',
      eventSourceId: scope === MISSION_SCOPES.EVENT_PLAY ? 'wh40k-11e-event-companion-v1.2-2026-08-26' : null,
      eventVersion: scope === MISSION_SCOPES.EVENT_PLAY ? '1.2' : null
    },
    forceDispositions: selectBaseRecords(canonicalFacts, 'forceDispositions', scope),
    primaryMissions: selectBaseRecords(canonicalFacts, 'primaryMissions', scope),
    secondaryMissions: selectBaseRecords(canonicalFacts, 'secondaryMissions', scope),
    deployments: selectBaseRecords(canonicalFacts, 'deployments', scope),
    twists: selectBaseRecords(canonicalFacts, 'twists', scope),
    missionSequenceRules: selectBaseRecords(canonicalFacts, 'missionSequenceRules', scope),
    missionReferenceRules: selectBaseRecords(canonicalFacts, 'missionReferenceRules', scope),
    forceDispositionMatchups: selectBaseRecords(canonicalFacts, 'forceDispositionMatchups', scope),
    terrainLayouts: selectBaseRecords(canonicalFacts, 'terrainLayouts', scope)
  };

  applyFaqOverlays(canonicalFacts, catalog, scope);
  applyEventSequence(canonicalFacts, catalog, scope);
  catalog.missionSequenceRules.sort((left, right) => left.order - right.order || left.id.localeCompare(right.id));

  const frozenCatalog = deepFreeze(catalog);
  const recordIndex = buildRecordIndex(frozenCatalog);

  return Object.freeze({
    catalog: frozenCatalog,
    getById(id) {
      return recordIndex.get(id) ?? null;
    },
    getPrimaryForForceDispositions(playerForceDispositionId, opponentForceDispositionId) {
      const player = frozenCatalog.forceDispositions.find((record) => record.id === playerForceDispositionId);
      const relation = player?.missionMatrixRelations.find((item) => item.opponentForceDispositionId === opponentForceDispositionId);
      if (!relation) return null;
      const mission = recordIndex.get(relation.primaryMissionId) ?? null;
      if (!mission && relation.resolvedInRepresentativeCatalog !== false) {
        throw new Error(`Resolved mission ${relation.primaryMissionId} is missing from effective catalog`);
      }
      return mission;
    },
    getLayoutsForMatchup(forceDispositionA, forceDispositionB) {
      if (scope !== MISSION_SCOPES.EVENT_PLAY) return [];
      const matchup = recordIndex.get(canonicalMatchupId(forceDispositionA, forceDispositionB));
      if (!matchup) return [];
      return matchup.layoutIds.map((id) => recordIndex.get(id)).filter(Boolean);
    }
  });
}

export {MISSION_SCOPES};
