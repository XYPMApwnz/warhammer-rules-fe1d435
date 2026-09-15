const values=value=>Array.isArray(value)?value:[];
const statRecord=value=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length?value:null;

export function canonicalBaseStatsForUnit(unit){
  const explicit=statRecord(unit?.stats);
  const profileSources=values(unit?.profiles).map(profile=>statRecord(profile?.stats)).filter(Boolean);
  if(explicit){
    if(profileSources.length&&!profileSources.some(source=>canonicalStats(source)===canonicalStats(explicit)))throw new Error(`${unit?.id||'unit'}: canonical unit stats do not resolve to one source profile`);
    return {...explicit};
  }
  const sources=[
    ...profileSources,
    ...values(unit?.blocks).filter(block=>block?.type==='statline').map(block=>statRecord(block?.values))
  ].filter(Boolean);
  if(!sources.length)return {};
  const keys=[...new Set(sources.flatMap(source=>Object.keys(source)))];
  return Object.fromEntries(keys
    .filter(key=>sources.every(source=>Object.prototype.hasOwnProperty.call(source,key)&&String(source[key])===String(sources[0][key])))
    .map(key=>[key,sources[0][key]]));
}

const canonicalStats=value=>JSON.stringify(Object.entries(value||{}).sort(([left],[right])=>left.localeCompare(right)));

export function projectRosterBaseStats(units,catalogUnits,{label='roster base-stat projection'}={}){
  if(!Array.isArray(units)||!Array.isArray(catalogUnits))throw new Error(`${label}: units and catalogUnits must be arrays`);
  const sourceById=new Map();
  for(const unit of units){
    if(typeof unit?.id!=='string'||!unit.id)throw new Error(`${label}: canonical unit requires an ID`);
    if(sourceById.has(unit.id))throw new Error(`${label}: duplicate canonical unit identity ${unit.id}`);
    sourceById.set(unit.id,unit);
  }
  const seen=new Set();
  const projected=catalogUnits.map(item=>{
    if(typeof item?.id!=='string'||!item.id||!sourceById.has(item.id))throw new Error(`${label}: unknown canonical stat-profile scope ${item?.id||'<missing>'}`);
    if(seen.has(item.id))throw new Error(`${label}: duplicate roster stat-profile identity ${item.id}`);
    seen.add(item.id);
    return {...item,gameSelections:{...(item.gameSelections||{}),stats:canonicalBaseStatsForUnit(sourceById.get(item.id))}};
  });
  if(seen.size!==sourceById.size){
    const missing=[...sourceById.keys()].find(id=>!seen.has(id));
    throw new Error(`${label}: missing roster unit ${missing}`);
  }
  return projected;
}

export function assertRosterBaseStatProjection(units,catalogUnits,{label='roster base-stat projection'}={}){
  const projected=projectRosterBaseStats(units,catalogUnits,{label});
  for(let index=0;index<projected.length;index++){
    const expected=projected[index].gameSelections.stats,actual=catalogUnits[index]?.gameSelections?.stats;
    if(canonicalStats(actual)!==canonicalStats(expected))throw new Error(`${label}: ${projected[index].id} has conflicting canonical base stats`);
  }
  return true;
}
