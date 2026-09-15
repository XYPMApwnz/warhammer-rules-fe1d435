import assert from 'node:assert/strict';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

export const CONTRACT_ORACLE_SCRIPTS=Object.freeze({
  SOURCE_LIFECYCLE:['tests/source-ingestion-contract-qa.mjs','tests/sm-authenticated-bsdata-argument-binding-qa.mjs'],
  SOURCE_ENROLLMENT:['tests/source-enrollment-qa.mjs'],
  CANONICAL_IDENTITY:['tests/canonical-join-architecture-qa.mjs','tests/authoritative-non-id-joins-qa.mjs','tests/persistent-child-identity-qa.mjs','tests/final-d4-canonical-ability-profile-qa.mjs'],
  FACT_OWNERSHIP:['tests/final-architecture-ownership-qa.mjs','tests/glossary-output-ownership-qa.mjs','tests/generated-output-ownership-qa.mjs','tests/space-marines-related-rules-owner-qa.mjs','tests/tau-related-rules-owner-qa.mjs','tests/am-datasheet-source-ownership-qa.mjs','tests/roster-base-stat-ownership-qa.mjs','tests/roster-gameplay-projection-ownership-qa.mjs'],
  EFFECTIVE_MODEL:['tests/effective-model-convergence-qa.mjs','tests/enhancement-text-ownership-qa.mjs','tests/roster-base-stat-ownership-qa.mjs','tests/roster-gameplay-projection-ownership-qa.mjs'],
  DEPENDENCY_PRECEDENCE:['tests/effective-points-projection-qa.mjs'],
  POINTS:['tests/effective-points-projection-qa.mjs'],
  ENHANCEMENTS:['tests/enhancement-contract-qa.mjs','tests/canonical-join-architecture-qa.mjs','tests/authoritative-non-id-joins-qa.mjs','tests/enhancement-text-ownership-qa.mjs'],
  STRATAGEMS:['tests/stratagem-architecture-qa.mjs'],
  RELATIONS:['tests/canonical-join-architecture-qa.mjs','tests/dependency-relation-overlay-qa.mjs'],
  ROSTER:['tests/roster-fixtures-qa.mjs','tests/enhancement-text-ownership-qa.mjs','tests/roster-base-stat-ownership-qa.mjs','tests/roster-gameplay-projection-ownership-qa.mjs'],
  EFFECTS:['tests/effect-contract-ownership-qa.mjs','tests/effect-provider-interpreter-equality-qa.mjs','tests/final-d4-canonical-ability-profile-qa.mjs','tests/roster-gameplay-projection-ownership-qa.mjs'],
  GLOSSARY:['tests/glossary-output-ownership-qa.mjs','tests/glossary-editorial-contract-qa.mjs','tests/enhancement-text-ownership-qa.mjs'],
  PUBLICATION_INVENTORY:['tests/publication-inventory-qa.mjs','tests/offline-mobile-routes-qa.mjs','tests/generated-output-ownership-qa.mjs','tests/rendered-output-qa.mjs'],
  GENERATED_OWNERSHIP:['tests/generated-output-ownership-qa.mjs','tests/effective-points-projection-qa.mjs','tests/glossary-output-ownership-qa.mjs']
});

export const ASTRA_ATTACK_SCRIPTS=Object.freeze({
  ASTRA_D1_ATTACK:'tests/effective-model-convergence-qa.mjs',
  ASTRA_D2_ATTACK:'tests/glossary-output-ownership-qa.mjs',
  ASTRA_D3_ATTACK:'tests/effective-points-projection-qa.mjs',
  ASTRA_D4_ATTACK:'tests/authoritative-non-id-joins-qa.mjs',
  ASTRA_D5_ATTACK:'tests/sm-authenticated-bsdata-argument-binding-qa.mjs',
  EFFECT_PLUS_99_ATTACK:'tests/effect-contract-ownership-qa.mjs',
  STRATAGEM_COUNT_PRESERVING_ATTACK:'tests/stratagem-architecture-qa.mjs',
  G1_PROVIDER_PLUS_7_ATTACK:'tests/effect-provider-interpreter-equality-qa.mjs',
  NEW_D4_ABILITY_COLLISION_ATTACK:'tests/final-d4-canonical-ability-profile-qa.mjs',
  NEW_D4_WEAPON_RENAME_ATTACK:'tests/final-d4-canonical-ability-profile-qa.mjs',
  NEW_ROSTER_STAT_COPY_ATTACK:'tests/roster-base-stat-ownership-qa.mjs',
  NEW_CANONICAL_STAT_DIRECTION_ATTACK:'tests/roster-base-stat-ownership-qa.mjs',
  NEW_WEAPON_ROSTER_COPY_ATTACK:'tests/roster-gameplay-projection-ownership-qa.mjs',
  NEW_CANONICAL_WEAPON_DIRECTION_ATTACK:'tests/roster-gameplay-projection-ownership-qa.mjs'
});

const diagnostic=result=>`${result.stdout||''}${result.stderr||''}`.trim();
export function runBehavioralOracleScripts({root,scripts}){
  const results=new Map();
  for(const relative of [...new Set(scripts)]){
    const result=spawnSync(process.execPath,[path.join(root,relative)],{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024});
    results.set(relative,{status:result.status,signal:result.signal,output:diagnostic(result)});
  }
  return results;
}

export function assertBehavioralOracleScripts(results,scripts,label){
  for(const relative of scripts){
    const result=results.get(relative);
    assert(result,`${label}: oracle was not run: ${relative}`);
    assert.equal(result.status,0,`${label}: ${relative} failed\n${result.output}`);
  }
}

export function contractOracleResult(results,contract){
  const scripts=CONTRACT_ORACLE_SCRIPTS[contract];
  if(!scripts)throw new Error(`No behavioral architecture oracle is mapped for ${contract}`);
  const failures=scripts.filter(script=>results.get(script)?.status!==0);
  return {pass:failures.length===0,scripts,failures,diagnostics:failures.map(script=>`${script}: ${results.get(script)?.output||'not run'}`)};
}
