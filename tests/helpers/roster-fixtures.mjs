const entries = value => Array.isArray(value) ? value : Object.values(value || {});
const flatEntries = value => entries(value).flatMap(item => Array.isArray(item) ? item : [item]);

function exact(records, id, kind) {
  if (typeof id !== 'string' || !id) throw new Error(`${kind} canonical ID is required`);
  const matches = entries(records).filter(record => record?.id === id || (kind === 'Datasheet' && record?.unitId === id));
  if (matches.length !== 1) throw new Error(`${kind} canonical ID ${JSON.stringify(id)} resolved ${matches.length} records`);
  return matches[0];
}

function pointTier(pointsUnit, quantity, copyIndex) {
  const tiers = entries(pointsUnit?.points).filter(tier => {
    const models = quantity >= Number(tier.minModels ?? quantity) && quantity <= Number(tier.maxModels ?? quantity);
    const copies = copyIndex >= Number(tier.minCopies ?? copyIndex) && copyIndex <= Number(tier.maxCopies ?? copyIndex);
    return models && copies;
  });
  if (tiers.length !== 1) throw new Error(`Datasheet ${JSON.stringify(pointsUnit?.id)} quantity ${quantity}, copy ${copyIndex} resolved ${tiers.length} point tiers`);
  return tiers[0];
}

function selection(catalogUnit, input) {
  const spec = typeof input === 'string' ? { id:input } : input;
  const record = exact(catalogUnit.gameSelections?.selections, spec?.id, 'Selection');
  const quantity = spec?.quantity == null ? 1 : Number(spec.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) throw new Error(`Selection ${JSON.stringify(spec?.id)} quantity must be a positive integer`);
  return { id:record.id, title:record.title, quantity };
}

function enhancementCost(bookEnhancement, pointsCatalog) {
  const pointsMatches = flatEntries(pointsCatalog?.enhancements).filter(record =>
    record?.id === bookEnhancement.id || record?.canonicalEnhancementId === bookEnhancement.id);
  if (pointsMatches.length > 1) throw new Error(`Enhancement canonical ID ${JSON.stringify(bookEnhancement.id)} resolved ${pointsMatches.length} point records`);
  const value = pointsMatches[0]?.value ?? bookEnhancement.points ?? bookEnhancement.value;
  if (!Number.isFinite(Number(value))) throw new Error(`Enhancement ${JSON.stringify(bookEnhancement.id)} has no canonical points value`);
  return Number(value);
}

export function createRosterFixture({
  catalog,
  pointsCatalog,
  id,
  name = 'Canonical roster fixture',
  detachmentId,
  detachmentIds,
  units,
  attachments = {},
  syntheticMetadataLines = [],
  factionPrefix = '',
}) {
  if (!catalog?.book?.title) throw new Error('Roster catalog book title is required');
  if (!Array.isArray(units) || !units.length) throw new Error('At least one roster unit is required');
  const requestedDetachments = detachmentIds || (detachmentId ? [detachmentId] : []);
  if (!requestedDetachments.length) throw new Error('At least one Detachment canonical ID is required');
  const detachments = requestedDetachments.map(value => exact(catalog.detachments, value, 'Detachment'));
  const copies = new Map();
  const resolvedUnits = units.map((spec, index) => {
    const expectedInstanceId = `parsed-unit-${index + 1}`;
    if (spec?.instanceId !== expectedInstanceId) throw new Error(`Physical instance ID must be explicit and equal ${expectedInstanceId}`);
    const unit = exact(catalog.units, spec.datasheetId, 'Datasheet');
    const pointsUnit = exact(pointsCatalog?.units, spec.datasheetId, 'Datasheet points');
    const copyIndex = (copies.get(unit.id) || 0) + 1;
    copies.set(unit.id, copyIndex);
    const availableTiers = entries(pointsUnit.points);
    const fixedQuantities = [...new Set(availableTiers
      .filter(tier => Number(tier.minModels) === Number(tier.maxModels))
      .map(tier => Number(tier.minModels)))];
    const quantity = spec.quantity == null
      ? (fixedQuantities.length === 1 ? fixedQuantities[0] : NaN)
      : Number(spec.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) throw new Error(`Datasheet ${JSON.stringify(unit.id)} requires an explicit valid quantity`);
    const tier = pointTier(pointsUnit, quantity, copyIndex);
    const selections = entries(spec.selectionIds).map(value => selection(unit, value));
    const chosenEnhancement = spec.enhancementId ? exact(catalog.enhancements, spec.enhancementId, 'Enhancement') : null;
    if (chosenEnhancement && !detachments.some(item => item.id === chosenEnhancement.detachmentId)) {
      throw new Error(`Enhancement ${JSON.stringify(chosenEnhancement.id)} is not owned by a selected Detachment`);
    }
    return {
      instanceId:spec.instanceId,
      datasheetId:unit.id,
      title:unit.title,
      quantity,
      points:Number(tier.value),
      selections,
      enhancement:chosenEnhancement ? {
        id:chosenEnhancement.id,
        title:chosenEnhancement.title,
        points:enhancementCost(chosenEnhancement, pointsCatalog),
      } : null,
    };
  });
  const enhancementPoints = resolvedUnits.reduce((sum, unit) => sum + (unit.enhancement?.points || 0), 0);
  const totalPoints = resolvedUnits.reduce((sum, unit) => sum + unit.points, enhancementPoints);
  const lines = [
    `+ FACTION KEYWORD: ${factionPrefix}${catalog.book.title}`,
    ...detachments.map(item => `+ DETACHMENT: ${item.title}`),
    `+ TOTAL ARMY POINTS: ${totalPoints}pts`,
    ...syntheticMetadataLines.map(line => String(line)),
  ];
  for (const unit of resolvedUnits) {
    const loadout = unit.selections.map(item => `${item.quantity > 1 ? `${item.quantity}x ` : ''}${item.title}`).join(', ');
    lines.push(`${unit.quantity}x ${unit.title} (${unit.points} pts)${loadout ? `: ${loadout}` : ''}`);
    if (unit.enhancement) lines.push(`Enhancement: ${unit.enhancement.title} (+${unit.enhancement.points} pts)`);
  }
  return {
    record:{ id, name, sourceText:lines.join('\n'), attachments },
    book:{ id:catalog.book.id, title:catalog.book.title },
    detachments:detachments.map(item => ({ id:item.id, title:item.title })),
    units:resolvedUnits,
    totalPoints,
  };
}

export function createCatalogGameUnit({ catalog, datasheetId, instanceId, enhancementIds = [] }) {
  if (typeof instanceId !== 'string' || !instanceId) throw new Error('Physical instance ID is required');
  const unit = exact(catalog?.units, datasheetId, 'Datasheet');
  for (const id of enhancementIds) exact(catalog.enhancements, id, 'Enhancement');
  const keywords = [...entries(unit.intrinsicKeywords)];
  return {
    identity:{ instanceId, canonicalDatasheetId:unit.id, title:unit.title },
    attachments:{ leading:[], leaders:[] },
    rosterState:{ keywordProfile:{ effective:keywords, intrinsic:keywords } },
    item:{ catalogUnit:unit },
    selection:{
      loadout:{ weaponResolution:{ state:'resolved' }, selectedProfileIds:entries(unit.gameSelections?.weaponProfiles).map(profile => profile.id) },
    },
    enhancementIds:[...enhancementIds],
  };
}
