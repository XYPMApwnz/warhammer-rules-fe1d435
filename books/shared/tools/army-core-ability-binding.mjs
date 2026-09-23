import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createCoreFactProjection} from '../../core-rules/content/core-fact-projection.mjs';

export const ARMY_CORE_ABILITY_BINDING_SCHEMA='wh40k-army-core-ability-source-bindings/v1';
export const ARMY_CORE_ABILITY_BINDING_PATH='books/shared/content/army-ability-source-bindings.v1.json';

const nonEmptyString=value=>typeof value==='string'&&value.trim()===value&&value.length>0;
const cloneAbility=ability=>({...ability});

export function createArmyCoreAbilityBindings({repoRoot,coreFactProjection=null,registry=null}={}){
  const resolvedRepoRoot=repoRoot||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
  const projection=coreFactProjection||createCoreFactProjection({repoRoot:resolvedRepoRoot});
  const source=registry||JSON.parse(fs.readFileSync(path.join(resolvedRepoRoot,ARMY_CORE_ABILITY_BINDING_PATH),'utf8'));
  if(source?.schema!==ARMY_CORE_ABILITY_BINDING_SCHEMA)throw new Error(`Army Core ability bindings require schema ${ARMY_CORE_ABILITY_BINDING_SCHEMA}`);
  if(!Array.isArray(source.bindings))throw new Error('Army Core ability bindings require bindings[]');
  const acceptedCoreIds=new Set((projection.abilityIdentityTerms||[]).map(term=>term.id));
  const bySourceId=new Map();
  for(const [index,binding] of source.bindings.entries()){
    const location=`Army Core ability binding ${index+1}`;
    if(!nonEmptyString(binding?.sourceAbilityId))throw new Error(`${location} requires sourceAbilityId`);
    if(!nonEmptyString(binding?.coreAbilityId))throw new Error(`${location} requires coreAbilityId`);
    if(!acceptedCoreIds.has(binding.coreAbilityId))throw new Error(`${location} references unknown effective Core ID ${binding.coreAbilityId}`);
    if(bySourceId.has(binding.sourceAbilityId)){
      const existing=bySourceId.get(binding.sourceAbilityId);
      throw new Error(`${location} duplicates sourceAbilityId ${binding.sourceAbilityId} (${existing} vs ${binding.coreAbilityId})`);
    }
    bySourceId.set(binding.sourceAbilityId,binding.coreAbilityId);
  }
  const resolve=(sourceAbilityId,{required=false}={})=>{
    if(!nonEmptyString(sourceAbilityId)){
      if(required)throw new Error('Core ability binding requires a stable sourceAbilityId');
      return null;
    }
    const coreAbilityId=bySourceId.get(sourceAbilityId)||null;
    if(required&&!coreAbilityId)throw new Error(`Unknown Army Core source ability ID ${sourceAbilityId}`);
    return coreAbilityId;
  };
  const bindAbility=ability=>{
    const result=cloneAbility(ability);
    const mapped=resolve(result.sourceAbilityId);
    if(result.coreAbilityId&&!result.sourceAbilityId)throw new Error(`Army ability ${result.coreAbilityId} lacks stable sourceAbilityId`);
    if(result.coreAbilityId&&!mapped)throw new Error(`Army ability declares ${result.coreAbilityId} for unknown sourceAbilityId ${result.sourceAbilityId}`);
    if(result.coreAbilityId&&result.coreAbilityId!==mapped)throw new Error(`Army ability source ${result.sourceAbilityId} conflicts: ${result.coreAbilityId} vs ${mapped}`);
    if(mapped)result.coreAbilityId=mapped;
    return result;
  };
  const bindUnits=units=>(units||[]).map(unit=>({
    ...unit,
    abilities:(unit.abilities||[]).map(bindAbility),
    wargearAbilities:(unit.wargearAbilities||[]).map(bindAbility)
  }));
  return Object.freeze({
    schema:source.schema,
    bindingCount:bySourceId.size,
    resolve,
    resolveRequired:sourceAbilityId=>resolve(sourceAbilityId,{required:true}),
    bindAbility,
    bindUnits,
    hasSourceAbilityId:sourceAbilityId=>bySourceId.has(sourceAbilityId),
    bindings:Object.freeze(source.bindings.map(binding=>Object.freeze({...binding})))
  });
}
