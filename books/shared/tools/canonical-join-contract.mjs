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

export function resolveDeclaredLegacyAlias(alias,aliases,{label='legacy alias'}={}){
  const matches=values(aliases).filter(record=>values(record.aliases).includes(alias));
  if(matches.length!==1)throw new Error(`${label} ${alias} must resolve exactly once; got ${matches.length}`);
  if(!matches[0].canonicalId)throw new Error(`${label} ${alias} has no canonical target ID`);
  return matches[0].canonicalId;
}

export function canonicalizeRelationTargets(units,{bookId='book',dispositions=[]}={}){
  const byId=indexCanonicalById(units,{label:`${bookId} relation unit`}),byTitle=new Map(),usedDispositions=new Set();
  const dispositionRecords=values(dispositions).map((record,index)=>{if(!record||typeof record!=='object'||!record.title||!record.disposition)throw new Error(`${bookId}: relation disposition ${index+1} is invalid`);return{...record,key:[record.sourceId||'*',record.role||'*',canonicalDisplayKey(record.title)].join('\0')};});
  if(new Set(dispositionRecords.map(record=>record.key)).size!==dispositionRecords.length)throw new Error(`${bookId}: duplicate relation target disposition`);
  const dispositionByKey=new Map(dispositionRecords.map(record=>[record.key,record]));
  for(const unit of units){const key=canonicalDisplayKey(unit.title),group=byTitle.get(key)||[];group.push(unit.id);byTitle.set(key,group);}
  const edges=[],edgeKeys=new Set();
  for(const source of units)for(const [role,targets] of [['leader',source.relations?.leader],['support',source.relations?.support]])for(const raw of values(targets)){
    const records=typeof raw==='object'&&raw?([raw.targetId||raw.unitId||raw.id].filter(Boolean).map(targetId=>({targetId}))):String(raw).split(/[;,]/).map(value=>({title:value.trim()})).filter(record=>record.title);
    for(const record of records){
      let targetId=record.targetId;
      if(targetId&&!byId.has(targetId))throw new Error(`${bookId}: ${source.id} references unknown ${role} target ID ${targetId}`);
      if(!targetId){const matches=byTitle.get(canonicalDisplayKey(record.title))||[];if(matches.length!==1){const keys=[[source.id,role,canonicalDisplayKey(record.title)].join('\0'),[source.id,'*',canonicalDisplayKey(record.title)].join('\0'),['*',role,canonicalDisplayKey(record.title)].join('\0'),['*','*',canonicalDisplayKey(record.title)].join('\0')],disposition=keys.map(key=>dispositionByKey.get(key)).find(Boolean);if(matches.length===0&&disposition){usedDispositions.add(disposition.key);continue;}throw new Error(`${bookId}: ${source.id} ${role} target ${record.title} must resolve exactly once; got ${matches.length}`);}targetId=matches[0];}
      const edgeKey=[source.id,role,targetId].join('\0');if(edgeKeys.has(edgeKey))continue;edgeKeys.add(edgeKey);edges.push({role,sourceId:source.id,targetId});
    }
  }
  const unused=dispositionRecords.filter(record=>!usedDispositions.has(record.key));if(unused.length)throw new Error(`${bookId}: unused relation target dispositions: ${unused.map(record=>record.key.replaceAll('\0','/')).join(', ')}`);
  return edges;
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
