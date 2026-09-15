const values=value=>Array.isArray(value)?value:[];

export const canonicalWeaponProfilesForUnit=unit=>values(unit?.weapons).length
  ?values(unit.weapons)
  :values(unit?.blocks).filter(block=>block?.type==='weapon');

export function canonicalRosterWeaponProfile(unit,profile){
  if(typeof unit?.id!=='string'||!unit.id)throw new Error('canonical weapon-profile owner requires a unit ID');
  if(typeof profile?.id!=='string'||!profile.id)throw new Error(`${unit.id}: weapon profile has no pre-model canonical ID`);
  if(profile.sourceUnitId!==unit.id)throw new Error(`${profile.id}: weapon profile belongs to wrong parent ${profile.sourceUnitId||'<missing>'}`);
  return {
    id:profile.id,
    ...(values(profile.legacyIds).length?{legacyIds:[...profile.legacyIds]}:{}),
    title:profile.name||'',
    mode:profile.mode||'',
    range:profile.range||'',
    a:profile.a||'',
    skill:profile.skill||'',
    s:profile.s||'',
    ap:profile.ap||'',
    d:profile.d||'',
    abilities:profile.abilities||''
  };
}

const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
const canonical=value=>JSON.stringify(stable(value));

function projectUnit(unit,catalogUnit,label){
  const canonicalProfiles=canonicalWeaponProfilesForUnit(unit),sourceById=new Map();
  for(const profile of canonicalProfiles){
    const projected=canonicalRosterWeaponProfile(unit,profile);
    if(sourceById.has(projected.id))throw new Error(`${label}: duplicate canonical weapon profile ID ${projected.id}`);
    sourceById.set(projected.id,projected);
  }
  const gameSelections=catalogUnit?.gameSelections||{},rosterProfiles=values(gameSelections.weaponProfiles),seen=new Set();
  const projectedProfiles=rosterProfiles.map(profile=>{
    if(typeof profile?.id!=='string'||!profile.id||!sourceById.has(profile.id))throw new Error(`${label}: ${unit.id} has conflicting canonical weapon profile partitions: unknown ${profile?.id||'<missing>'}`);
    if(seen.has(profile.id))throw new Error(`${label}: duplicate roster weapon profile ID ${profile.id}`);
    seen.add(profile.id);
    const sourceSelectionIds=values(gameSelections.selections).filter(selection=>values(selection?.profileIds).includes(profile.id)).map(selection=>selection.id);
    return {...sourceById.get(profile.id),sourceSelectionIds};
  });
  if(seen.size!==sourceById.size){
    const missing=[...sourceById.keys()].find(id=>!seen.has(id));
    throw new Error(`${label}: ${unit.id} is missing canonical weapon profile ${missing}`);
  }
  return {...catalogUnit,gameSelections:{...gameSelections,weaponProfiles:projectedProfiles}};
}

export function projectRosterWeaponFacts(units,catalogUnits,{label='roster weapon-fact projection'}={}){
  if(!Array.isArray(units)||!Array.isArray(catalogUnits))throw new Error(`${label}: units and catalogUnits must be arrays`);
  const sourceById=new Map();
  for(const unit of units){
    if(typeof unit?.id!=='string'||!unit.id)throw new Error(`${label}: canonical unit requires an ID`);
    if(sourceById.has(unit.id))throw new Error(`${label}: duplicate canonical unit identity ${unit.id}`);
    sourceById.set(unit.id,unit);
  }
  const seen=new Set(),projected=catalogUnits.map(item=>{
    if(typeof item?.id!=='string'||!item.id||!sourceById.has(item.id))throw new Error(`${label}: unknown canonical weapon-profile scope ${item?.id||'<missing>'}`);
    if(seen.has(item.id))throw new Error(`${label}: duplicate roster weapon-profile scope ${item.id}`);
    seen.add(item.id);
    return projectUnit(sourceById.get(item.id),item,label);
  });
  if(seen.size!==sourceById.size){
    const missing=[...sourceById.keys()].find(id=>!seen.has(id));
    throw new Error(`${label}: missing roster unit ${missing}`);
  }
  return projected;
}

export function projectUnitRosterWeaponFacts(unit,gameSelections,{label=`${unit?.id||'unit'} roster weapon-fact projection`}={}){
  return projectUnit(unit,{id:unit.id,gameSelections},label).gameSelections;
}

export function assertRosterWeaponFactProjection(units,catalogUnits,{label='roster weapon-fact projection'}={}){
  const projected=projectRosterWeaponFacts(units,catalogUnits,{label});
  for(let unitIndex=0;unitIndex<projected.length;unitIndex++){
    const expected=projected[unitIndex].gameSelections.weaponProfiles,actual=values(catalogUnits[unitIndex]?.gameSelections?.weaponProfiles);
    if(expected.length!==actual.length)throw new Error(`${label}: ${projected[unitIndex].id} has conflicting canonical weapon profiles`);
    for(let profileIndex=0;profileIndex<expected.length;profileIndex++)if(canonical(actual[profileIndex])!==canonical(expected[profileIndex]))throw new Error(`${label}: ${projected[unitIndex].id}/${expected[profileIndex].id} has conflicting canonical weapon facts`);
  }
  return true;
}
