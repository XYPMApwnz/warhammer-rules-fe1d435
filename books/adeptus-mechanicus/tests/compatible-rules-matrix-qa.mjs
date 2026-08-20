import assert from 'node:assert/strict';
import ruleFacts from '../../shared/rule-facts.js';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCompatibleRules,inputs} from '../tools/build-compatible-rules.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const generated=json('generated/compatible-rules.json');
const expected=buildCompatibleRules(inputs());
assert.deepEqual(generated,expected,'generated Mechanicus matrix is stale');

const rows=Object.values(generated.units).flat();
const faction=rows.filter(row=>!row.scope&&!row.kind);
const core=rows.filter(row=>row.scope==='core');
const enhancements=rows.filter(row=>row.kind==='enhancement');
assert.deepEqual({faction:faction.length,core:core.length,enhancements:enhancements.length,total:rows.length},{faction:935,core:236,enhancements:142,total:1313});
assert.deepEqual({match:rows.filter(row=>row.state==='match').length,conditional:rows.filter(row=>row.state==='conditional').length},{match:1179,conditional:134});

const ledger=json('sources/compatible-rules-correction-ledger.json');
for(const entry of ledger.entries)for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){
  const unitRows=generated.units[unitId];
  if(!unitRows)continue;
  const row=unitRows.find(candidate=>candidate.ruleId===ruleId);
  if(entry.decision==='unresolved'||entry.decision==='reject')assert.equal(row,undefined,`${entry.decision} leaked into matrix: ${unitId}|${ruleId}`);
  if(entry.decision==='conditional')assert.equal(row?.state,'conditional',`conditional missing from matrix: ${unitId}|${ruleId}`);
}

const fixture=JSON.parse(fs.readFileSync(path.resolve(root,'..','..','tests','fixtures','enhancement-owner-matrix.json'),'utf8')).books['adeptus-mechanicus'];
for(const [ruleId,owners] of Object.entries(fixture)){
  const actual=Object.entries(generated.units).filter(([,unitRows])=>unitRows.some(row=>row.ruleId===ruleId&&row.kind==='enhancement')).map(([unitId])=>unitId).sort();
  assert.deepEqual(actual,owners.match,`Enhancement owners changed: ${ruleId}`);
  assert.deepEqual(owners.conditional,[],`Unexpected conditional Enhancement fixture: ${ruleId}`);
}

const conditions=new Set(['attachment-unknown','second-character-unknown','warlord-unknown','detachment-not-selected','second-unit-unknown','battle-state-unknown']);
for(const row of rows.filter(row=>row.state==='conditional')){
  assert(conditions.has(row.condition),`Unknown primary condition: ${row.ruleId}`);
  assert((row.conditions||[row.condition]).every(condition=>conditions.has(condition)),`Unknown condition metadata: ${row.ruleId}`);
}
const staticRows=Object.fromEntries(Object.entries(generated.units).map(([unitId,unitRows])=>[unitId,ruleFacts.filterStaticCompatible(unitRows)]));
const hiddenStaticRows=rows.length-Object.values(staticRows).flat().length;
assert.equal(hiddenStaticRows,134,'AM static filter must hide every roster-dependent relation');
assert(!staticRows['unit-tech-priest-manipulus'].some(row=>row.ruleId==='stratagem-aggressor-imperative'),'static Manipulus must not show Aggressor Imperative');
for(const unitId of ['unit-skitarii-rangers','unit-skitarii-vanguard'])assert(staticRows[unitId].some(row=>row.ruleId==='stratagem-aggressor-imperative'&&row.state==='match'),`${unitId} must retain Aggressor Imperative`);
const builder=fs.readFileSync(path.join(root,'tools','build-compatible-rules.mjs'),'utf8');
assert(!/related-rules-matcher|WHRelatedRules/.test(builder),'matrix builder must not call the legacy matcher');
console.log('PASS Mechanicus compatible-rules matrix: 935 faction + 236 Core + 142 Enhancement rows; 1179 match + 134 conditional.');
