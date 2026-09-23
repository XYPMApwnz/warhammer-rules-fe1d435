import crypto from 'node:crypto';

const clean=value=>String(value??'').replaceAll('\u00a0',' ').replace(/\s+/g,' ').trim();
export const canonicalDisplayKey=value=>clean(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export const canonicalSlug=value=>clean(value).toLowerCase().replace(/[\u2019']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const values=value=>Array.isArray(value)?value:[];

export function indexCanonicalById(records,{label='record',idOf=record=>record?.id}={}){
  const result=new Map();
  for(const [index,record] of values(records).entries()){
    const id=idOf(record);
    if(typeof id!=='string'||!id.trim()||id!==id.trim()||/\s/.test(id))throw new Error(`${label} ${index+1} requires an exact canonical ID`);
    if(result.has(id))throw new Error(`duplicate ${label} canonical ID ${id}`);
    result.set(id,record);
  }
  return result;
}

export function bindRowsToCanonicalIds(rows,canonicalRecords,{
  label='source row',
  rowId=record=>record?.id||record?.unitId||null,
  canonicalId=record=>record?.id,
  rowTitle=record=>record?.title,
  canonicalTitle=record=>record?.title,
  normalizeId=id=>id,
  allowUnbound=false
}={}){
  const canonical=indexCanonicalById(canonicalRecords,{label:`${label} owner`,idOf:canonicalId});
  const titles=new Map();
  for(const record of canonicalRecords){
    const key=canonicalDisplayKey(canonicalTitle(record));
    if(!key)continue;
    const group=titles.get(key)||[];group.push(canonicalId(record));titles.set(key,group);
  }
  const bound=[],boundIds=new Set();
  for(const [index,row] of values(rows).entries()){
    let id=rowId(row);if(id)id=normalizeId(id,row);
    if(id&&!canonical.has(id)){if(allowUnbound)id=null;else throw new Error(`${label} ${index+1} references unknown canonical ID ${id}`);}
    if(!id){
      const key=canonicalDisplayKey(rowTitle(row)),matches=titles.get(key)||[];
      if(matches.length!==1){if(allowUnbound&&matches.length===0){bound.push({...row});continue;}throw new Error(`${label} ${index+1} must bind exactly once; display assertion matched ${matches.length}`);}
      id=matches[0];
    }
    const owner=canonical.get(id);
    if(canonicalDisplayKey(rowTitle(row))!==canonicalDisplayKey(canonicalTitle(owner)))throw new Error(`${label} ${id} display title drift`);
    if(boundIds.has(id))throw new Error(`${label} duplicates canonical binding ${id}`);
    boundIds.add(id);
    bound.push({...row,canonicalId:id});
  }
  return bound;
}

export function mergeCanonicalById(base,overlays,{label='record',idOf=record=>record?.id,onConflict='error'}={}){
  const result=indexCanonicalById(base,{label,idOf});
  for(const record of values(overlays)){
    const id=idOf(record);if(typeof id!=='string'||!id.trim())throw new Error(`${label} overlay requires an exact canonical ID`);
    if(result.has(id)&&onConflict==='error')throw new Error(`${label} canonical ID collision ${id}`);
    if(result.has(id)&&onConflict==='prefer-base')continue;
    if(result.has(id)&&onConflict!=='prefer-overlay')throw new Error(`${label}: unsupported canonical precedence ${onConflict}`);
    result.set(id,record);
  }
  return [...result.values()];
}

export function resolveScopedEnhancement({enhancementId,detachmentId},records,{label='Enhancement'}={}){
  if(!enhancementId||!detachmentId)throw new Error(`${label} lookup requires exact Enhancement and Detachment IDs`);
  const matches=values(records).filter(record=>(record.canonicalId||record.id)===enhancementId&&(record.detachmentId||record.canonicalDetachmentId)===detachmentId);
  if(matches.length!==1)throw new Error(`${label} ${detachmentId}/${enhancementId} must resolve exactly once; got ${matches.length}`);
  return matches[0];
}

export function resolvePointEnhancement(record,detachmentId,pointRecords,{aliases={},label='Enhancement points'}={}){
  if(!record||!detachmentId)throw new Error(`${label} lookup requires an Enhancement record and exact Detachment ID`);
  const sourceIds=[record.canonicalId,record.id,record.sourceId,record.ruleId].filter(Boolean);
  if(!sourceIds.length)throw new Error(`${label} lookup requires an exact source identity`);
  const candidates=new Set();
  const add=id=>{if(typeof id!=='string'||!id||id!==id.trim()||/\s/.test(id))throw new Error(`${label} contains an invalid identity`);candidates.add(id);};
  for(const id of sourceIds){
    const raw=id.replace(/^enhancement-/,'');
    add(id);add(raw);add(`enhancement-${raw}`);
    const scopePrefix=`${detachmentId}-`;
    if(raw.startsWith(scopePrefix)){
      const unscoped=raw.slice(scopePrefix.length);add(unscoped);add(`enhancement-${unscoped}`);
    }else{
      add(`${scopePrefix}${raw}`);add(`enhancement-${scopePrefix}${raw}`);
    }
  }
  const aliasKey=`${detachmentId}|${record.id}`;
  if(Object.hasOwn(aliases,aliasKey))add(aliases[aliasKey]);
  const matches=values(pointRecords).filter(point=>(point.detachmentId||point.canonicalDetachmentId)===detachmentId&&candidates.has(point.canonicalId||point.id));
  if(matches.length>1)throw new Error(`${label} ${aliasKey} must resolve at most once; got ${matches.length}`);
  if(Object.hasOwn(aliases,aliasKey)&&matches.length!==1)throw new Error(`${label} alias ${aliasKey} targets no exact point record`);
  return matches[0]||null;
}

export function mergeExactPointEnhancement(record,point,{qualified=false}={}){
  if(!record||!point)throw new Error('Exact Enhancement merge requires source and points records');
  const sourceId=record.sourceId||point.sourceId||(qualified&&point.id?record.id:null);
  return {...record,...(qualified&&point.id?{id:point.id}:{}),...(sourceId?{sourceId}:{}),value:point.value,pointsSource:point.pointsSource};
}

export function resolveArmyRuleBindings(bindings,sources,{label='Army rule'}={}){
  if(!Array.isArray(bindings)||!bindings.length)throw new Error(`${label} bindings must declare exact canonical identities`);
  const outputIds=new Set();
  return bindings.map((binding,index)=>{
    if(!binding||typeof binding.id!=='string'||!binding.id||typeof binding.sourceId!=='string'||!binding.sourceId)throw new Error(`${label} binding ${index+1} is invalid`);
    if(outputIds.has(binding.id))throw new Error(`${label} duplicate canonical ID ${binding.id}`);outputIds.add(binding.id);
    const matches=values(sources).filter(item=>[item?.id,item?.termId].includes(binding.sourceId));
    if(!matches.length)throw new Error(`${label} unknown source ID ${binding.sourceId}`);
    const facts=new Map(matches.map(item=>[[item.subject||item.title,item.change||item.summary||item.text].join('\0'),item]));
    if(facts.size!==1)throw new Error(`${label} conflicting source ID ${binding.sourceId}`);
    return {binding,source:[...facts.values()][0]};
  });
}

export function resolveDeclaredLegacyAlias(alias,aliases,{label='legacy alias'}={}){
  const matches=values(aliases).filter(record=>values(record.aliases).includes(alias));
  if(matches.length!==1)throw new Error(`${label} ${alias} must resolve exactly once; got ${matches.length}`);
  if(!matches[0].canonicalId)throw new Error(`${label} ${alias} has no canonical target ID`);
  return matches[0].canonicalId;
}

export function canonicalizeRelationTargets(units,{bookId='book',dispositions=[]}={}){
  const byId=indexCanonicalById(units,{label:`${bookId} relation unit`});
  if(values(dispositions).length)throw new Error(`${bookId}: legacy title-based relation target dispositions are unsupported`);
  const edges=[],edgeKeys=new Set();
  for(const source of units)for(const [role,targets] of [['leader',source.relations?.leader],['support',source.relations?.support]])for(const raw of values(targets)){
    if(!raw||typeof raw!=='object')throw new Error(`${bookId}: ${source.id} ${role} target requires an explicit canonical ID`);
    const targetId=raw.targetId||raw.unitId||raw.id;
    if(!targetId||!byId.has(targetId))throw new Error(`${bookId}: ${source.id} references unknown ${role} target ID ${targetId||'(missing)'}`);
    const edgeKey=[source.id,role,targetId].join('\0');
    if(edgeKeys.has(edgeKey))throw new Error(`${bookId}: duplicate ${role} relation ${source.id} -> ${targetId}`);
    edgeKeys.add(edgeKey);edges.push({role,sourceId:source.id,targetId});
  }
  return edges;
}

export function canonicalTargetsFromProse(text,units,{sourceId='source',role='relation',excludeId=null}={}){
  const value=clean(text),records=[...indexCanonicalById(units,{label:`${sourceId} ${role} target`}).values()].filter(record=>record.id!==excludeId);
  const escaped=input=>input.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const matches=[];
  for(const record of records){
    if(!clean(record.title))throw new Error(`${sourceId}: ${role} target ${record.id} requires a display title assertion`);
    for(const match of value.matchAll(new RegExp(`(^|[^A-Za-z0-9])(${escaped(clean(record.title))})(?=$|[^A-Za-z0-9])`,'giu')))matches.push({id:record.id,start:match.index+match[1].length,end:match.index+match[0].length});
  }
  matches.sort((left,right)=>left.start-right.start||(right.end-right.start)-(left.end-left.start)||left.id.localeCompare(right.id));
  const accepted=[];
  for(const match of matches){
    const containing=accepted.find(other=>other.start<=match.start&&other.end>=match.end);
    if(containing)continue;
    const overlap=accepted.find(other=>other.start<match.end&&match.start<other.end);
    if(overlap)throw new Error(`${sourceId}: ambiguous ${role} prose target ${overlap.id}/${match.id}`);
    accepted.push(match);
  }
  return [...new Set(accepted.map(match=>match.id))];
}

const stableFingerprint=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0,10);
export function requireCanonicalChildIdentity(parent,record,{kind,title,semantic,legacyId}={}){
  if(record?.id)return {id:record.id,legacyIds:values(record.legacyIds)};
  const id=`${parent.id}-${kind}-${stableFingerprint(semantic??record)}`;
  const identity={id,legacyIds:legacyId&&legacyId!==id?[legacyId]:[]};
  return identity;
}

export function assignCanonicalChildIdentities(parent,records,{kind,titleOf=record=>record?.title||record?.name,semanticOf=record=>record,legacyIdOf=()=>null}={}){
  const seen=new Set();return values(records).map((record,index)=>{const identity=requireCanonicalChildIdentity(parent,record,{kind,title:titleOf(record),semantic:semanticOf(record),legacyId:legacyIdOf(record,index)});if(seen.has(identity.id))throw new Error(`${parent.id}: duplicate ${kind} canonical child identity ${identity.id}`);seen.add(identity.id);return{...record,...identity};});
}

export function assertCanonicalReferences(records,validIds,{label='reference',idsOf=record=>[record?.id]}={}){
  const allowed=validIds instanceof Set?validIds:new Set(validIds);
  for(const record of values(records))for(const id of values(idsOf(record)))if(!allowed.has(id))throw new Error(`${label} references unknown canonical ID ${id}`);
  return records;
}
