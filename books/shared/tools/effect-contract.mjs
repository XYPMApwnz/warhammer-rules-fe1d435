const BOOKS=new Set(['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels']);
export const EFFECT_SCHEMA='wh40k-effect-contracts/v1';
export const EFFECT_TYPES=new Set([
  'CHARACTERISTIC_ADD','CHARACTERISTIC_SET','WEAPON_CHARACTERISTIC_ADD','WEAPON_TAG_GRANT','WEAPON_PROFILE_GRANT',
  'ABILITY_GRANT','ABILITY_REMOVE','KEYWORD_GRANT','KEYWORD_REMOVE','CANONICAL_REFERENCE'
]);
export const EFFECT_CONFIDENCE=new Set(['VERIFIED_FROZEN','VERIFIED_CURRENT','SOURCE_LIMITED','LEGACY_UNVERIFIABLE']);
const SOURCE_KINDS=new Set(['enhancement','ability','datasheet-ability','detachment-rule','selected-wargear','wargear-ability']);
const SCOPES=new Set([
  'assigned-enhancement','attached-bodyguard','attached-group','attached-group-excluding-source','attached-leaders','attached-selected-wargear',
  'attached-unit','bearer','bearer-aura','bearer-while-attached','bodyguard','effective-unit','leading','owner','roster-reference',
  'roster-unit-pair','selected-detachment','selected-physical-loadout','selected-wargear','source','source-model','unit','unit-upgrade',
  'owner-or-attached-group','attachment-group','upgraded-unit','physical-support-composition'
]);
const STACKING_POLICIES=new Set(['apply-once-per-source','best-value','dedupe-effect-id','deduplicate-by-effect-id','set-exact']);
const SELECTOR_KEYS=new Set([
  'abilityId','abilityIds','all','allAbilities','allKeywords','allUnitIds','any','anyKeywords','anyOf','attachmentGroup','bodyguardUnitIds','canonicalEquipmentIds',
  'canonicalRecordId','canonicalTargetIds','detachmentId','detachmentIds','distance','enhancementId','equipmentFamilyId','equippedBy',
  'excludeSourceOwner','excludeSourceUnit','excludeUnitIds','groupAbilityIds','kind','minCharacteristics','modelCount','noneKeywords','noneUnitIds','not',
  'on','ownerUnitIds','physicalEquipment','relationship','requiresLeading','scope','selectedProfileIds','selectedWargearAbilityIds',
  'selectors','sourceUnitId','sourceUnitIds','stat','subject','type','unitIds','weaponFamilyId','weaponMode','groupContainsUnitIds',
  'groupExcludesUnitIds','groupHasEnhancementIds','attachmentState','abilityParameters','targetRelation'
]);
const CONDITION_KINDS=new Set([
  'ability-use','after-fight','ATTACHMENT_MEMBER_PRESENT','attachment-state','battle-formation-selection','battle-shock-step','battle-shock-test',
  'below-starting-strength','destroyed-target-keyword','incoming-attack-strength-greater-than-toughness','manual-resolution','nearby-friendly-unit',
  'not-in-engagement-range','objective-controlled-by-owner','once-per-battle','once-per-battle-per-army','once-per-battle-round','phase',
  'phase-start','reserve-state','ROSTER_UNIT_PRESENT','setup-from-reserves','target-status','target-within-friendly-contagion-range',
  'acquisition-objective-state','attachment-group-contains','attachment-group-excludes','battle-imperative','battle-protocol','battle-selection',
  'battle-shock','source-unit-present','unit-keyword','unit-keyword-absent'
]);

const record=value=>value&&typeof value==='object'&&!Array.isArray(value);
const scalar=(value,label)=>{if(typeof value!=='string'||!value.trim())throw new Error(`${label} must be a non-empty string`);return value;};
const array=(value,label)=>{if(!Array.isArray(value))throw new Error(`${label} must be an array`);return value;};
const normalize=value=>String(value||'').toLowerCase().replaceAll('_','-');
const dataOnly=(value,label)=>{
  if(value==null||['string','number','boolean'].includes(typeof value))return;
  if(Array.isArray(value)){value.forEach((item,index)=>dataOnly(item,`${label}[${index}]`));return;}
  if(!record(value))throw new Error(`${label} must contain JSON data only`);
  for(const [key,item] of Object.entries(value)){if(['__proto__','prototype','constructor'].includes(key))throw new Error(`${label} contains a prohibited key`);dataOnly(item,`${label}.${key}`);}
};
const targetId=value=>typeof value==='string'?value:record(value)?scalar(value.id,'canonical target id'):'';
export const effectBindingKey=contract=>[contract.sourceKind,contract.canonicalRecordId,contract.sourceUnitId||'',contract.detachmentId||'',contract.sourceUnitIds?.join(',')||''].join('\0');
const validateSelector=(selector,label)=>{
  if(!record(selector))throw new Error(`${label} must be structured`);
  for(const key of Object.keys(selector))if(!SELECTOR_KEYS.has(key))throw new Error(`${label}: unknown selector field ${key}`);
  for(const key of ['all','any','anyOf','selectors'])if(selector[key]!=null)array(selector[key],`${label}.${key}`).forEach((item,index)=>validateSelector(item,`${label}.${key}[${index}]`));
  if(selector.not!=null)validateSelector(selector.not,`${label}.not`);
  dataOnly(selector,label);
};
const validateOperation=(operation,label,operationIds)=>{
  if(!record(operation)||!EFFECT_TYPES.has(operation.type))throw new Error(`${label}: unsupported effect type ${operation?.type}`);
  const id=scalar(operation.id,`${label}.id`);if(operationIds.has(id))throw new Error(`${label}: duplicate effect operation ID ${id}`);operationIds.add(id);
  const target=targetId(operation.canonicalTarget);if(!target)throw new Error(`${id}: canonicalTarget must be a string or {kind,id}`);
  if(record(operation.canonicalTarget)){scalar(operation.canonicalTarget.kind,`${id}.canonicalTarget.kind`);dataOnly(operation.canonicalTarget,`${id}.canonicalTarget`);}
  if(!record(operation.parameters))throw new Error(`${id}: parameters must be an object`);dataOnly(operation.parameters,`${id}.parameters`);
  if(operation.type==='CHARACTERISTIC_ADD'&&typeof operation.parameters.delta!=='number'&&typeof operation.parameters.value!=='number')throw new Error(`${id}: CHARACTERISTIC_ADD requires numeric delta`);
  if(operation.type==='CHARACTERISTIC_SET'&&!['number','string'].includes(typeof operation.parameters.to)&&!['number','string'].includes(typeof operation.parameters.value))throw new Error(`${id}: CHARACTERISTIC_SET requires a value`);
  if(operation.type==='WEAPON_CHARACTERISTIC_ADD'&&!((typeof operation.parameters.stat==='string'&&typeof operation.parameters.delta==='number')||(typeof operation.parameters.characteristic==='string'&&typeof operation.parameters.value==='number')))throw new Error(`${id}: WEAPON_CHARACTERISTIC_ADD requires a characteristic and numeric modifier`);
  if(operation.type==='WEAPON_TAG_GRANT'&&typeof operation.parameters.tag!=='string')throw new Error(`${id}: WEAPON_TAG_GRANT requires tag`);
  if(operation.type==='WEAPON_PROFILE_GRANT'&&!record(operation.parameters.profile)&&!Array.isArray(operation.parameters.profileIds)&&operation.parameters.profileSource!=='canonical-record')throw new Error(`${id}: WEAPON_PROFILE_GRANT requires a structured profile or canonical profile binding`);
};

export function validateEffectContractSet(input,{expectedBookId=null}={}){
  if(!record(input)||input.schema!==EFFECT_SCHEMA)throw new Error(`Unsupported effect contract schema: ${input?.schema||'<missing>'}`);
  const bookId=scalar(input.bookId,'effect contract bookId');
  if(expectedBookId&&bookId!==expectedBookId)throw new Error(`${expectedBookId}: effect contract owner mismatch ${bookId}`);
  if(!BOOKS.has(bookId))throw new Error(`${bookId}: unsupported effect contract book`);
  const seenBindings=new Set(),seenOperationIds=new Set(),contracts=array(input.contracts,`${bookId}.contracts`);
  for(const [index,contract] of contracts.entries()){
    const label=`${bookId}.contracts[${index}]`;
    if(!record(contract))throw new Error(`${label} must be an object`);
    const canonicalRecordId=scalar(contract.canonicalRecordId,`${label}.canonicalRecordId`);
    if(contract.sourceBookId!==bookId)throw new Error(`${canonicalRecordId}: sourceBookId must equal factual owner ${bookId}`);
    if(!SOURCE_KINDS.has(contract.sourceKind))throw new Error(`${canonicalRecordId}: unsupported sourceKind ${contract.sourceKind}`);
    const key=effectBindingKey(contract);if(seenBindings.has(key))throw new Error(`${bookId}: duplicate scoped effect contract ${key.replaceAll('\0',' / ')}`);seenBindings.add(key);
    const effective=array(contract.effectiveBookIds,`${canonicalRecordId}.effectiveBookIds`);
    if(!effective.length||new Set(effective).size!==effective.length||effective.some(id=>!BOOKS.has(id)))throw new Error(`${canonicalRecordId}: invalid effectiveBookIds`);
    if(!effective.includes(bookId))throw new Error(`${canonicalRecordId}: factual owner must be an effective book`);
    const scope=normalize(scalar(contract.scope,`${canonicalRecordId}.scope`));if(!SCOPES.has(scope))throw new Error(`${canonicalRecordId}: unsupported scope ${contract.scope}`);
    validateSelector(contract.selector,`${canonicalRecordId}.selector`);
    const clauses=array(contract.clauses,`${canonicalRecordId}.clauses`);
    for(const [clauseIndex,clause] of clauses.entries()){
      const clauseLabel=`${canonicalRecordId}.clauses[${clauseIndex}]`;if(!record(clause))throw new Error(`${clauseLabel} must be an object`);
      if(clause.selector!=null)validateSelector(clause.selector,`${clauseLabel}.selector`);
      for(const [conditionIndex,condition] of array(clause.conditions||[],`${clauseLabel}.conditions`).entries()){
        if(!record(condition))throw new Error(`${clauseLabel}.conditions[${conditionIndex}] must be structured`);
        if(condition.selector!=null)validateSelector(condition.selector,`${clauseLabel}.conditions[${conditionIndex}].selector`);
        else if(condition.kind&&!CONDITION_KINDS.has(condition.kind))throw new Error(`${canonicalRecordId}: unsupported condition ${condition.kind}`);
        dataOnly(condition,`${clauseLabel}.conditions[${conditionIndex}]`);
      }
      for(const [operationIndex,operation] of array(clause.operations,`${clauseLabel}.operations`).entries())validateOperation(operation,`${clauseLabel}.operations[${operationIndex}]`,seenOperationIds);
    }
    if(typeof contract.timingState==='string')scalar(contract.timingState,`${canonicalRecordId}.timingState`);else if(record(contract.timingState)){scalar(contract.timingState.kind,`${canonicalRecordId}.timingState.kind`);dataOnly(contract.timingState,`${canonicalRecordId}.timingState`);}else throw new Error(`${canonicalRecordId}: timingState must be a string or object`);
    if(!STACKING_POLICIES.has(normalize(contract.stackingPolicy)))throw new Error(`${canonicalRecordId}: unsupported stackingPolicy ${contract.stackingPolicy}`);
    if(!record(contract.source))throw new Error(`${canonicalRecordId}: source binding is required`);
    scalar(contract.source.sourceId,`${canonicalRecordId}.source.sourceId`);scalar(contract.source.locator,`${canonicalRecordId}.source.locator`);
    if(!EFFECT_CONFIDENCE.has(contract.confidence))throw new Error(`${canonicalRecordId}: unsupported confidence ${contract.confidence}`);
  }
  return input;
}

export function effectiveEffectContracts(contractSets,bookId){
  if(!BOOKS.has(bookId))throw new Error(`Unsupported effective effect book ${bookId}`);
  const records=[];for(const set of contractSets){const validated=validateEffectContractSet(set);for(const contract of validated.contracts)if(contract.effectiveBookIds.includes(bookId))records.push(contract);}
  const seen=new Set();for(const contract of records){const key=effectBindingKey(contract);if(seen.has(key))throw new Error(`${bookId}: duplicate effective effect contract ${key.replaceAll('\0',' / ')}`);seen.add(key);}
  return records.sort((a,b)=>effectBindingKey(a).localeCompare(effectBindingKey(b))||a.sourceBookId.localeCompare(b.sourceBookId));
}

const catalogIds=catalog=>{
  const units=new Map((catalog.units||[]).map(item=>[item.id,item]));
  const enhancements=new Set((catalog.enhancements||[]).flatMap(item=>[item.id,item.ruleId,item.sourceId,item.legacyKey].filter(Boolean)));
  const detachments=new Set((catalog.detachments||[]).map(item=>item.id));
  const detachmentRules=new Map((catalog.detachmentRules||[]).map(item=>[item.id,item]));
  const abilities=new Map();
  for(const unit of units.values())for(const item of [...(unit.gameSelections?.abilities||[]),...(unit.gameSelections?.wargearAbilities||[])])abilities.set(item.id,item);
  return {units,enhancements,detachments,detachmentRules,abilities};
};
const selectorUnitIds=selector=>['unitIds','excludeUnitIds','noneUnitIds','sourceUnitIds','ownerUnitIds','bodyguardUnitIds','groupContainsUnitIds','groupExcludesUnitIds','allUnitIds'].flatMap(key=>selector?.[key]||[]);
const walkSelectors=selector=>[selector,...(selector?.all||[]).flatMap(walkSelectors),...(selector?.any||[]).flatMap(walkSelectors),...(selector?.anyOf||[]).flatMap(walkSelectors),...(selector?.selectors||[]).flatMap(walkSelectors),...(selector?.not?[...walkSelectors(selector.not)]:[])];

export function validateEffectContractsAgainstCatalog(input,catalog){
  const validated=validateEffectContractSet(input,{expectedBookId:input.bookId}),ids=catalogIds(catalog);
  if(catalog.book?.id!==input.bookId)throw new Error(`${input.bookId}: effect catalog owner mismatch ${catalog.book?.id||'<missing>'}`);
  for(const contract of validated.contracts){
    if(contract.detachmentId&&!ids.detachments.has(contract.detachmentId))throw new Error(`${contract.canonicalRecordId}: unknown Detachment ${contract.detachmentId}`);
    const sourceUnits=[contract.sourceUnitId,...(contract.sourceUnitIds||[])].filter(Boolean);
    for(const id of sourceUnits)if(!ids.units.has(id))throw new Error(`${contract.canonicalRecordId}: unknown source unit ${id}`);
    if(contract.sourceKind==='enhancement'&&!ids.enhancements.has(contract.canonicalRecordId))throw new Error(`${contract.canonicalRecordId}: unknown canonical Enhancement`);
    if(contract.sourceKind==='detachment-rule'){
      const rule=ids.detachmentRules.get(contract.canonicalRecordId);if(!rule)throw new Error(`${contract.canonicalRecordId}: unknown canonical Detachment rule`);
      if(contract.detachmentId&&rule.detachmentId!==contract.detachmentId)throw new Error(`${contract.canonicalRecordId}: wrong Detachment scope ${contract.detachmentId}`);
    }
    if(['ability','datasheet-ability'].includes(contract.sourceKind)){
      if(!ids.abilities.has(contract.canonicalRecordId))throw new Error(`${contract.canonicalRecordId}: unknown canonical ability`);
      if(sourceUnits.length&&!sourceUnits.some(id=>[...(ids.units.get(id)?.gameSelections?.abilities||[]),...(ids.units.get(id)?.gameSelections?.wargearAbilities||[])].some(item=>item.id===contract.canonicalRecordId)))throw new Error(`${contract.canonicalRecordId}: ability is not owned by its declared source unit`);
    }
    for(const clause of contract.clauses){
      for(const selector of [contract.selector,clause.selector,...clause.conditions.flatMap(item=>item.selector?[item.selector]:[])].flatMap(walkSelectors)){
        for(const id of selectorUnitIds(selector))if(!ids.units.has(id))throw new Error(`${contract.canonicalRecordId}: selector references unknown unit ${id}`);
        for(const id of [...(selector?.detachmentIds||[]),selector?.detachmentId].filter(Boolean))if(!ids.detachments.has(id))throw new Error(`${contract.canonicalRecordId}: selector references unknown Detachment ${id}`);
      }
      for(const operation of clause.operations)if(operation.type==='CANONICAL_REFERENCE'){
        const target=typeof operation.canonicalTarget==='string'?operation.canonicalTarget:operation.canonicalTarget.id,kind=operation.parameters.referenceKind||operation.canonicalTarget?.kind;
        const resolved=kind==='enhancement'?ids.enhancements.has(target):kind==='detachment-rule'?ids.detachmentRules.has(target):kind==='ability'?ids.abilities.has(target):false;
        if(!resolved)throw new Error(`${contract.canonicalRecordId}: unknown canonical target ${kind||'<missing>'}/${target}`);
      }
    }
  }
  return validated;
}
