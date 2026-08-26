import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..', '..');

function loadScript(relativePath, sandbox) {
  const filename = path.join(root, relativePath);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), sandbox, { filename });
}

function makeUnit(id, canonicalId, name, keywords = [], enhancementIds = [], abilities = []) {
  return {
    identity: { instanceId: id, canonicalDatasheetId: canonicalId, title: name },
    attachments: { leading: [], leaders: [] },
    rosterState: { keywordProfile: { effective: keywords, intrinsic: keywords } },
    item: { catalogUnit: { intrinsicKeywords: keywords, gameSelections: { abilities, stats: { T: '4', W: '5', Invulnerable: '' } } } },
    selection: { loadout: { weaponResolution: { state: 'resolved' }, selectedProfileIds: ['fixture-profile'] } },
    enhancementIds,
  };
}

const sandbox = vm.createContext({ console, window: {}, globalThis: null, addEventListener() {} });
sandbox.globalThis = sandbox;
sandbox.window = sandbox;
loadScript('books/chaos-space-marines/scripts/roster-data.js', sandbox);
loadScript('books/chaos-space-marines/scripts/roster-filter.js', sandbox);

const catalog = sandbox.WH_BOOK_ROSTER_CATALOG;
const provider = sandbox.CSM_ROSTER_SEMANTICS.gameEffects;
assert.ok(catalog, 'generated CSM roster catalog must load');
assert.equal(typeof provider, 'function', 'CSM effect provider must register');
assert.equal(catalog.units.length, 54, 'current CSM Datasheet count');
assert.equal(catalog.enhancements.length, 62, 'current CSM Enhancement count');
assert.equal(catalog.detachmentRules.length, 17, 'current CSM Detachment Rule count');

const providerSource = fs.readFileSync(path.join(root, 'books/chaos-space-marines/scripts/roster-filter.js'), 'utf8');
assert.doesNotMatch(providerSource, /WHBookRosterEnhancements/, 'legacy synthetic provider must be removed');
assert.doesNotMatch(providerSource, /Ability ranges \+3/, 'Crown synthetic range summary must be removed');
assert.doesNotMatch(providerSource, /summary\s*:/, 'provider must not own gameplay summaries');

function effects(units, options = {}) {
  const byInstance = new Map(units.map((unit) => [unit.identity.instanceId, unit]));
  for (const relation of options.attachments || []) {
    const facts = { certainty: 'current', provenance: { kind: 'explicit-roster-attachment' } };
    byInstance.get(relation.sourcePhysicalInstanceId).attachments.leading.push({ ...facts, instanceId: relation.targetPhysicalInstanceId });
    byInstance.get(relation.targetPhysicalInstanceId).attachments.leaders.push({ ...facts, instanceId: relation.sourcePhysicalInstanceId });
  }
  const enhancements = units.flatMap((unit) => unit.enhancementIds.map((id) => ({
    input: { ownerUnitId: unit.identity.instanceId },
    catalog: { id, ruleId: id }
  })));
  const detachments = options.detachmentId ? [{ id: options.detachmentId }] : [];
  return units.flatMap((gameUnit) => provider({ gameUnit, byInstance, enhancements, detachments }) || []);
}

function matching(list, operation, target, sourceId) {
  return list.filter((effect) => effect.operation === operation
    && effect.targetInstanceId === target
    && (!sourceId || effect.source?.id === sourceId));
}

const fabius = makeUnit('fabius-1', 'unit-fabius-bile', 'Fabius Bile', ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES']);
const executioner = makeUnit('moe-1', 'unit-master-of-executions', 'Master of Executions', ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES']);
const legionariesA = makeUnit('legionaries-a', 'unit-legionaries', 'Legionaries', ['INFANTRY', 'HERETIC ASTARTES']);
const legionariesB = makeUnit('legionaries-b', 'unit-legionaries', 'Legionaries', ['INFANTRY', 'HERETIC ASTARTES']);
let result = effects([fabius, executioner, legionariesA, legionariesB], {
  attachments: [
    { sourcePhysicalInstanceId: 'fabius-1', targetPhysicalInstanceId: 'legionaries-a' },
    { sourcePhysicalInstanceId: 'moe-1', targetPhysicalInstanceId: 'legionaries-a' }
  ]
});
assert.equal(result.filter((effect) => effect.operation === 'add' && effect.component === 'stat'
  && effect.targetId === 'T' && effect.targetInstanceId === 'legionaries-a'
  && effect.source?.id === 'chaos-space-marines-ability-enhanced-warriors').length, 1,
  'Enhanced Warriors must add Toughness only to exact Bodyguard');
assert.equal(result.filter((effect) => effect.operation === 'add-stat' && effect.component === 'weapon' && effect.stat === 'S'
  && effect.targetInstanceId === 'legionaries-a'
  && effect.source?.id === 'chaos-space-marines-ability-enhanced-warriors').length, 1,
  'Enhanced Warriors must add melee Strength only to exact Bodyguard');
assert.equal(result.filter((effect) => effect.source?.id === 'chaos-space-marines-ability-enhanced-warriors'
  && ['fabius-1', 'moe-1', 'legionaries-b'].includes(effect.targetInstanceId)).length, 0,
  'Enhanced Warriors must not affect Leaders or duplicate Bodyguard');
assert.equal(matching(result, 'reference', 'legionaries-a', 'chaos-space-marines-ability-warp-sighted-butcher').length, 1,
  'Warp-sighted Butcher must reference exact attached Bodyguard');

const commune = makeUnit('commune-1', 'unit-dark-commune', 'Dark Commune', ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES']);
const accursed = makeUnit('accursed-1', 'unit-accursed-cultists', 'Accursed Cultists', ['INFANTRY', 'CULTIST']);
result = effects([commune, accursed], {
  attachments: [{ sourcePhysicalInstanceId: 'commune-1', targetPhysicalInstanceId: 'accursed-1' }]
});
assert.equal(matching(result, 'reference', 'accursed-1', 'chaos-space-marines-ability-faithful-flock').length, 1,
  'Faithful Flock canonical rule must reach exact Attached Unit');
assert.equal(result.filter((effect) => effect.operation === 'set' && effect.component === 'stat'
  && effect.targetId === 'Invulnerable' && effect.to === '5+'
  && effect.targetInstanceId === 'accursed-1'
  && effect.source?.id === 'chaos-space-marines-ability-faithful-flock').length, 1,
  'Faithful Flock deterministic Invulnerable Save must reach exact Attached Unit');

const crown = makeUnit('warpsmith-crown', 'unit-warpsmith', 'Warpsmith', ['CHARACTER', 'INFANTRY', 'WARPSMITH', 'HERETIC ASTARTES'], ['enhancement-crown-of-worms']);
result = effects([crown]);
assert.equal(matching(result, 'reference', 'warpsmith-crown', 'enhancement-crown-of-worms').length, 1,
  'Crown of Worms must use its full canonical Enhancement reference');
assert.equal(result.filter((effect) => effect.source?.id === 'enhancement-crown-of-worms' && effect.operation !== 'reference').length, 0,
  'Crown of Worms must not claim an unsupported structured prose mutation');

const tzagulla = makeUnit('lord-tzagulla', 'unit-chaos-lord-in-terminator-armour', 'Chaos Lord in Terminator Armour', ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES'], ['enhancement-tzagulla'], [{ id: 'core-deep-strike', title: 'Deep Strike' }]);
result = effects([tzagulla]);
assert.equal(matching(result, 'reference', 'lord-tzagulla', 'enhancement-tzagulla').length, 1,
  'Tzagulla must retain full canonical Class C reference');
for (const field of ['A', 'S', 'AP']) {
  assert.equal(result.filter((effect) => effect.source?.id === 'enhancement-tzagulla'
    && effect.operation === 'add-stat' && effect.component === 'weapon' && effect.stat === field).length, 1,
  `Tzagulla must deterministically mutate ${field}`);
}
assert.equal(result.filter((effect) => effect.source?.id === 'enhancement-tzagulla' && effect.stat === 'D').length, 0,
  'Tzagulla conditional Reserves Damage must fail closed');

const chosen = makeUnit('chosen-1', 'unit-chosen', 'Chosen', ['INFANTRY', 'HERETIC ASTARTES']);
result = effects([chosen], { detachmentId: 'renegade-warband' });
assert.equal(result.filter((effect) => effect.operation === 'grant-tag' && effect.component === 'weapon'
  && effect.targetInstanceId === 'chosen-1' && effect.source?.id === 'renegade-warband').length, 1,
  'Slaves to None must grant ASSAULT to current ranged weapons');
assert.equal(result.filter((effect) => effect.operation === 'remove' && effect.component === 'ability'
  && effect.targetInstanceId === 'chosen-1' && effect.source?.id === 'renegade-warband').length, 1,
  'Slaves to None must remove Dark Pacts from effective abilities');
assert.equal(result.filter((effect) => effect.operation === 'reference'
  && effect.targetId === 'chaos-space-marines-detachment-rule-slaves-to-none'
  && effect.targetInstanceId === 'chosen-1' && effect.source?.id === 'renegade-warband').length, 1,
  'Slaves to None mixed rule must retain full canonical Detachment Rule');

result = effects([chosen], { detachmentId: 'deceptors' });
assert.equal(result.length, 0, 'empty canonical Deceptors rule must remain fail closed');

const chaosIcon = catalog.units.find((unit) => unit.id === 'unit-legionaries')?.gameSelections.selections
  .find((entry) => entry.id === 'unit-legionaries-selection-chaos-icon');
assert.ok(chaosIcon, 'Chaos icon selected-wargear record must exist');
assert.deepEqual(Array.from(chaosIcon.wargearAbilityIds), ['unit-legionaries-wargear-ability-chaos-icon'],
  'exact singleton Chaos icon selection must resolve during the CSM build');

console.log('CSM roster conformance QA: PASS');
