const SCHEMA='wh40k-attachment-group-constraints/v1';
const list=value=>Array.isArray(value)?value:[];
const clean=value=>String(value??'').trim();
const capacity=value=>value==='UNBOUNDED'||Number.isInteger(value)&&value>=1;

export function validateAttachmentGroupConstraintSet(value,{bookId='',units=[]}={}){
  if(value?.schema!==SCHEMA)throw new Error(`${bookId||'book'}: invalid attachment-group constraint schema`);
  if(bookId&&value.bookId!==bookId)throw new Error(`${bookId}: attachment-group constraints belong to ${value.bookId||'(missing)'}`);
  const byUnitId=new Map(list(units).map(unit=>[unit.id,unit]));
  if(byUnitId.size!==list(units).length)throw new Error(`${bookId}: attachment-group constraints require unique canonical unit IDs`);
  const ids=new Set();
  for(const record of list(value.constraints)){
    if(!clean(record.id)||ids.has(record.id))throw new Error(`${bookId}: duplicate or missing attachment-group constraint ID ${record.id||'(missing)'}`);ids.add(record.id);
    if(!['leader','support'].includes(record.role))throw new Error(`${record.id}: invalid attachment role`);
    if(!byUnitId.has(record.targetUnitId))throw new Error(`${record.id}: unknown target unit ${record.targetUnitId||'(missing)'}`);
    if(!Array.isArray(record.sourceUnitIds)||!record.sourceUnitIds.length||new Set(record.sourceUnitIds).size!==record.sourceUnitIds.length)throw new Error(`${record.id}: exact source unit IDs are required`);
    for(const unitId of record.sourceUnitIds)if(!byUnitId.has(unitId))throw new Error(`${record.id}: unknown source unit ${unitId}`);
    if(!capacity(record.totalCapacity)||!capacity(record.perRoleCapacity)||!capacity(record.sameCanonicalLimit))throw new Error(`${record.id}: invalid attachment capacity`);
    if(record.bodyguardPredicate!=null&&(record.bodyguardPredicate.kind!=='STARTING_STRENGTH_EQUALS'||!Number.isInteger(record.bodyguardPredicate.value)||record.bodyguardPredicate.value<1))throw new Error(`${record.id}: invalid Bodyguard-state predicate`);
    const owner=record.source,sourceUnit=owner&&byUnitId.get(owner.sourceUnitId);
    if(!owner||owner.kind!=='accepted-army-ability'||!clean(owner.sourceId)||!sourceUnit||!clean(owner.sourceAbilityId))throw new Error(`${record.id}: accepted source binding is required`);
    const matches=[...list(sourceUnit.abilities),...list(sourceUnit.wargearAbilities)].filter(item=>item?.sourceAbilityId===owner.sourceAbilityId);
    if(matches.length!==1)throw new Error(`${record.id}: source ability ${owner.sourceAbilityId} must resolve exactly once; got ${matches.length}`);
    if(record.mandatoryParticipant){const consequence=record.noValidTargetConsequence;if(!consequence||consequence.deployment!=='CANNOT_DEPLOY'||consequence.destroyedTiming!=='FIRST_BATTLE_ROUND')throw new Error(`${record.id}: exact mandatory no-target consequence is required`);}
    else if(record.noValidTargetConsequence!=null)throw new Error(`${record.id}: non-mandatory constraint cannot own a no-target consequence`);
    if(!record.provenance||!clean(record.provenance.sourceId)||!clean(record.provenance.currentness)||!clean(record.provenance.verifiedAt))throw new Error(`${record.id}: provenance/currentness is required`);
  }
  return structuredClone(value);
}

export const attachmentGroupConstraintSchema=SCHEMA;
