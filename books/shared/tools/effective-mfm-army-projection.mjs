import {createEffectiveMfmCatalog} from '../../../mfm/content/effective-mfm-catalog.mjs';

const clone=value=>structuredClone(value);
const edgeKey=edge=>`${edge.role}\0${edge.sourceId}\0${edge.targetId}`;
const sourceMetadata=Object.freeze({
  label:'Official MFM v1.4',
  version:'v1.4',
  currentnessCutoff:'2026-09-22',
  verifiedAt:'2026-09-22',
  authority:'OFFICIAL_GAMES_WORKSHOP_LIVE_MFM'
});

const armyRelationOverlays=Object.freeze({
  'death-guard':new Set([
    'support\0unit-biologus-putrifier\0unit-plague-marines',
    'support\0unit-foul-blightspawn\0unit-plague-marines',
    'support\0unit-icon-bearer\0unit-plague-marines',
    'support\0unit-noxious-blightbringer\0unit-plague-marines',
    'support\0unit-noxious-blightbringer\0unit-poxwalkers',
    'support\0unit-plague-surgeon\0unit-plague-marines',
    'support\0unit-tallyman\0unit-plague-marines'
  ]),
  'adeptus-mechanicus':new Set([
    'leader\0unit-tech-priest-enginseer\0unit-hastarii-exterminators',
    'leader\0unit-tech-priest-enginseer\0unit-hastarii-fusiliers',
    'leader\0unit-tech-priest-enginseer\0unit-servitor-battleclade'
  ])
});

const retiredArmyRelationEdges=new Set([
  'leader\0unit-huron-blackheart\0unit-masters-of-the-maelstrom'
]);

const tyranidScheduleOverlays=Object.freeze({
  'unit-hormagaunts':new Map(['20:20'].map(key=>[key,{minModels:11,maxModels:20,label:'11-20 models'}])),
  'unit-termagants':new Map(['20:20'].map(key=>[key,{minModels:11,maxModels:20,label:'11-20 models'}])),
  'unit-von-ryans-leapers':new Map(['6:6'].map(key=>[key,{minModels:4,maxModels:6,label:'4-6 models'}]))
});

const ordinal=value=>{const n=Number(value),tail=n%100;if(tail>=11&&tail<=13)return`${n}th`;return`${n}${n%10===1?'st':n%10===2?'nd':n%10===3?'rd':'th'}`;};
const armyPaidUpgradeLabel=value=>String(value||'').replace(/^1\s+/,'');
const flattenSchedule=(bookId,unitId,schedules)=>schedules.flatMap(schedule=>(schedule.entries||[]).map(entry=>{
  const overlay=bookId==='tyranids'?tyranidScheduleOverlays[unitId]?.get(`${entry.minModels}:${entry.maxModels}`):null;
  const model={...entry,...overlay};
  const copyPrefix=schedule.minCopies===undefined?'':schedule.maxCopies==null?`${ordinal(schedule.minCopies)}+ unit · `:schedule.minCopies===schedule.maxCopies?`${ordinal(schedule.minCopies)} unit · `:`${ordinal(schedule.minCopies)}–${ordinal(schedule.maxCopies)} unit · `;
  return {label:`${copyPrefix}${model.label||model.sourceLabel}`,value:model.value,minModels:model.minModels,maxModels:model.maxModels,...(schedule.minCopies!==undefined?{minCopies:schedule.minCopies}:{}),...(schedule.maxCopies!=null?{maxCopies:schedule.maxCopies}:{}),sourceLabel:model.sourceLabel};
}));

export function createEffectiveMfmArmyProjection(bookId){
  const {catalog}=createEffectiveMfmCatalog(),unitRefs=new Map(catalog.unitReferences.map(item=>[item.id,item])),pointById=new Map(catalog.unitPointRecords.map(item=>[item.id,item])),forceBindings=catalog.crossDomainBindings.forceDispositionBindings;
  const factionPoints=catalog.unitPointRecords.filter(item=>item.factionId===bookId),factionPointIds=new Set(factionPoints.map(item=>item.id));
  const paidByPoint=new Map();
  for(const item of catalog.paidUpgradeRecords.filter(item=>item.factionId===bookId)){const values=paidByPoint.get(item.unitPointRecordId)||[];values.push(item);paidByPoint.set(item.unitPointRecordId,values);}
  const boundUnitRecords=factionPoints.map(point=>({point,reference:unitRefs.get(point.unitReferenceId)})).filter(({reference})=>reference?.armyBinding?.bindingStatus==='BOUND');
  const referenceOnlyUnitRecords=factionPoints.map(point=>({point,reference:unitRefs.get(point.unitReferenceId)})).filter(({reference})=>reference?.armyBinding?.bindingStatus==='REFERENCE_ONLY');
  const factionDetachments=catalog.detachments.filter(item=>item.factionId===bookId),factionEnhancements=catalog.enhancementCosts.filter(item=>item.factionId===bookId);
  const qualifierByOwner=new Map();
  for(const item of catalog.qualifierRecords.filter(item=>item.factionId===bookId)){const key=`${item.ownerKind}\0${item.armyBookId}\0${item.armyOwnerId}`,values=qualifierByOwner.get(key)||[];values.push(clone(item));qualifierByOwner.set(key,values);}
  const pointsForArmyBook=armyBookId=>{
    const units=boundUnitRecords.filter(({reference})=>reference.armyBinding.armyBookId===armyBookId).map(({point,reference})=>({
      id:reference.armyBinding.armyUnitId,
      unitId:reference.armyBinding.armyUnitId,
      title:point.label,
      status:'Current',
      sourceLayer:point.sourceGroup,
      points:flattenSchedule(bookId,reference.armyBinding.armyUnitId,point.pointSchedules),
      paidWargear:(paidByPoint.get(point.id)||[]).map(item=>({name:armyPaidUpgradeLabel(item.label),value:item.value,modifiers:[]})),
      pointsSource:sourceMetadata,
      mfmRecordId:point.id
    }));
    const detachments=factionDetachments.filter(item=>item.armyBookId===armyBookId).map(item=>({
      id:item.armyDetachmentId,detachmentId:item.armyDetachmentId,canonicalId:item.armyDetachmentId,title:item.label,
      detachmentPoints:item.detachmentPoints,dp:String(item.detachmentPoints),
      forceDisposition:forceBindings[item.mfmForceDispositionId].sourceValue,disposition:forceBindings[item.mfmForceDispositionId].sourceValue,
      mfmForceDispositionId:item.mfmForceDispositionId,missionForceDispositionId:item.missionForceDispositionId,forceDispositionId:item.forceDispositionId,mfmRecordId:item.id,
      mfmQualifiers:clone(qualifierByOwner.get(`DETACHMENT\0${armyBookId}\0${item.armyDetachmentId}`)||[])
    }));
    const enhancements=factionEnhancements.filter(item=>item.armyBookId===armyBookId).map(item=>({
      id:item.armyEnhancementId,canonicalEnhancementId:item.armyEnhancementId,detachmentId:item.armyDetachmentId,canonicalDetachmentId:item.armyDetachmentId,
      title:item.label,detachment:detachments.find(det=>det.id===item.armyDetachmentId)?.title||'',value:item.value,mfmRecordId:item.id,
      mfmQualifiers:clone(qualifierByOwner.get(`ENHANCEMENT\0${armyBookId}\0${item.armyEnhancementId}`)||[])
    }));
    return {schema:1,source:sourceMetadata,units,detachments,enhancements,counts:{units:units.length,detachments:detachments.length,enhancements:enhancements.length,pricedOptions:units.reduce((total,item)=>total+item.paidWargear.length,0)}};
  };
  const deathGuardPoints=()=>{
    const current=pointsForArmyBook('death-guard'),enhancementsByDetachment=new Map();
    for(const item of current.enhancements){const values=enhancementsByDetachment.get(item.detachmentId)||[];values.push({id:item.id,title:item.title,value:item.value,mfmRecordId:item.mfmRecordId});enhancementsByDetachment.set(item.detachmentId,values);}
    const units=boundUnitRecords.filter(({reference})=>reference.armyBinding.armyBookId==='death-guard').map(({point,reference})=>({unitId:reference.armyBinding.armyUnitId,title:point.label,sourceGroup:point.sourceGroup,schedules:point.pointSchedules.map(schedule=>({label:schedule.sourceLabel,values:schedule.entries.map(entry=>({label:entry.sourceLabel,value:entry.value}))})),paidWargear:(paidByPoint.get(point.id)||[]).map(item=>({label:item.sourceLabel,value:item.value,mfmRecordId:item.id})),mfmRecordId:point.id}));
    const detachments=current.detachments.map(item=>({title:item.title,id:item.id,detachmentPoints:item.detachmentPoints,dp:`${item.detachmentPoints}DP`,disposition:item.disposition,mfmRecordId:item.mfmRecordId,mfmForceDispositionId:item.mfmForceDispositionId,missionForceDispositionId:item.missionForceDispositionId,forceDispositionId:item.forceDispositionId,mfmQualifiers:item.mfmQualifiers,enhancements:enhancementsByDetachment.get(item.id)||[]}));
    const enhancements=current.enhancements.map(item=>({id:item.id,title:item.title,detachment:item.detachment,value:item.value,mfmRecordId:item.mfmRecordId,mfmQualifiers:item.mfmQualifiers}));
    return {schema:1,source:sourceMetadata,units,detachments,enhancements,counts:{units:units.length,detachments:detachments.length,enhancements:enhancements.length,pricedOptions:units.reduce((total,item)=>total+item.paidWargear.length,0)}};
  };
  const relationEdges=({effectiveUnitIds,armyEdges=[]})=>{
    const ids=new Set(effectiveUnitIds),base=[];
    for(const [role,records] of [['leader',catalog.leaderEligibilityRecords],['support',catalog.supportEligibilityRecords]])for(const record of records.filter(item=>item.factionId===bookId)){
      const source=unitRefs.get(record.sourceUnitReferenceId)?.armyBinding;if(source?.bindingStatus!=='BOUND'||!ids.has(source.armyUnitId))continue;
      for(const targetRefId of record.targetUnitReferenceIds){const target=unitRefs.get(targetRefId)?.armyBinding;if(target?.bindingStatus==='BOUND'&&ids.has(target.armyUnitId))base.push({role,sourceId:source.armyUnitId,targetId:target.armyUnitId,mfmRecordId:record.id});}
    }
    const result=new Map(base.map(edge=>[edgeKey(edge),edge])),allowed=armyRelationOverlays[bookId]||new Set();
    for(const edge of armyEdges){const key=edgeKey(edge);if(result.has(key))continue;if(allowed.has(key))result.set(key,{...edge,overlaySource:'ARMY_EFFECTIVE_MODEL'});else if(!retiredArmyRelationEdges.has(key))throw new Error(`${bookId}: unclassified Army relation outside effective MFM: ${key.replaceAll('\0',' / ')}`);}
    for(const key of allowed)if(!result.has(key))throw new Error(`${bookId}: required Army-domain relation overlay is absent: ${key.replaceAll('\0',' / ')}`);
    return [...result.values()].sort((a,b)=>edgeKey(a).localeCompare(edgeKey(b)));
  };
  const qualifierRecordsFor=(ownerKind,armyBookId,ownerId)=>clone(qualifierByOwner.get(`${ownerKind}\0${armyBookId}\0${ownerId}`)||[]);
  return Object.freeze({bookId,sourceMetadata,pointsForArmyBook,deathGuardPoints,relationEdges,qualifierRecordsFor,referenceOnlyUnitRecords:clone(referenceOnlyUnitRecords.map(({point,reference})=>({mfmRecordId:point.id,label:point.label,unitReferenceId:reference.id,reason:reference.armyBinding.reason}))),boundUnitCount:boundUnitRecords.length,factionPointCount:factionPointIds.size});
}
