import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCompatibleRules,detachmentByRuleId,stableStringify} from '../books/death-guard/tools/build-compatible-rules.mjs';
import {createCompatibleRulesLoader} from '../books/shared/compatible-rules-matrix.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const book=json('books/death-guard/content/death-guard-rules.en.json'),snapshot=json('books/death-guard/sources/wahapedia-compatible-rules.snapshot.json'),ledger=json('books/death-guard/scripts/related-rules-correction-ledger.json'),enhancementMatrix=json('books/death-guard/sources/enhancement-owner-matrix.json').enhancements,generated=json('books/death-guard/generated/compatible-rules.json');
const matrix=buildCompatibleRules({book,snapshot,ledger,enhancementMatrix}),pairs=new Set(Object.entries(snapshot.units).flatMap(([unitId,ruleIds])=>ruleIds.map(ruleId=>`${unitId}|${ruleId}`))),ledgerByPair=new Map(ledger.entries.map(entry=>[`${entry.unitId}|${entry.ruleId}`,entry])),detachmentIds=detachmentByRuleId(book),conditions=new Set(['attachment-unknown','second-character-unknown','warlord-unknown','detachment-not-selected']);
assert.equal([...pairs].filter(pair=>!ledgerByPair.has(pair)).length,ledger.sharedPairCount,'snapshot pairs without ledger must be shared');
for(const entry of ledger.entries)assert.equal(pairs.has(`${entry.unitId}|${entry.ruleId}`),entry.side==='wahapedia-only',`ledger side mismatch: ${entry.unitId}/${entry.ruleId}`);
assert.equal(ledger.entries.filter(entry=>entry.decision==='unresolved').length,0);
assert.deepEqual(matrix,generated,'generated matrix is stale');
assert.equal(stableStringify(matrix),stableStringify(buildCompatibleRules({book,snapshot,ledger,enhancementMatrix})),'matrix must be deterministic');
const rows=Object.values(matrix.units).flat(),conditional=rows.filter(rule=>rule.state==='conditional');
assert.equal(Object.keys(matrix.units).length,36);
assert.equal(rows.length,981);
assert.equal(rows.filter(rule=>rule.state==='match').length,894);
assert.equal(conditional.length,87);
assert.deepEqual(Object.fromEntries([...conditions].map(condition=>[condition,conditional.filter(rule=>rule.condition===condition).length])),{'attachment-unknown':25,'second-character-unknown':9,'warlord-unknown':16,'detachment-not-selected':37});
const core=rows.filter(rule=>rule.scope==='core');
assert.equal(core.length,261);
assert.equal(core.filter(rule=>rule.state==='match').length,251);
assert.equal(core.filter(rule=>rule.condition==='attachment-unknown').length,10);
const enhancements=rows.filter(rule=>rule.kind==='enhancement'),enhancementIds=new Set(enhancements.map(rule=>rule.ruleId));
assert.equal(enhancements.length,164);
assert.equal(enhancementIds.size,30);
const upgradeIds=['enhancement-parasitic-woe-reaper','enhancement-lancet-of-the-worldsore','enhancement-insectile-murmuration','enhancement-plagueveil'];
assert.deepEqual([...enhancementIds].filter(id=>upgradeIds.includes(id)).sort(),upgradeIds.sort());
assert.equal(enhancements.filter(rule=>upgradeIds.includes(rule.ruleId)).length,8);
const parity=json('books/death-guard/reports/wahapedia-enhancement-parity.json');
assert.equal(parity.officialOwnerAssociations,198);
assert.equal(parity.wahapediaAssociations,168);
assert.equal(Object.values(parity.officialOnly).flat().length,0);
assert.deepEqual(Object.keys(parity.officialOnly).sort(),[]);
assert.equal(parity.upgrades.officialOwnerAssociations,8);
assert.equal(parity.upgrades.wahapediaAssociations,8);
assert.deepEqual(parity.upgrades.wahapediaOnly,[]);
assert.deepEqual(parity.upgrades.officialOnly,[]);
for(const [unitId,rules] of Object.entries(matrix.units))for(const rule of rules){
  if(rule.scope==='core')assert.equal(rule.detachmentId,undefined,`Core rule has a Detachment: ${rule.ruleId}`);
  else assert.equal(rule.detachmentId,detachmentIds.get(rule.ruleId),`missing detachment: ${rule.ruleId}`);
  assert.notEqual(ledgerByPair.get(`${unitId}|${rule.ruleId}`)?.decision,'reject',`reject leaked: ${unitId}/${rule.ruleId}`);
  assert(rule.state==='match'||conditions.has(rule.condition),`invalid condition: ${rule.ruleId}`);
}
const builder=fs.readFileSync(path.join(root,'books/death-guard/tools/build-compatible-rules.mjs'),'utf8');
assert(!/related-rules-matcher|TARGET|keywords/i.test(builder),'builder must not infer eligibility');
const runtimeMatrix={...matrix,units:Object.fromEntries(Object.entries(matrix.units).map(([unitId,rules])=>[unitId,rules.map(rule=>rule.detachmentId?.startsWith('detachment-')?{...rule,detachmentId:rule.detachmentId.replace(/^detachment-/,'')}:rule)]))};
let runtimeFetches=0;
const runtime=createCompatibleRulesLoader('memory:death-guard-compatible-rules',{
  schema:'death-guard-compatible-rules/v1',
  resolveDetachmentSelection:true,
  fetch:async()=>{runtimeFetches++;return{ok:true,json:async()=>runtimeMatrix};}
});
await runtime.load();
const warlord=Object.entries(matrix.units).flatMap(([unitId,rules])=>rules.filter(rule=>rule.condition==='warlord-unknown').map(rule=>[unitId,rule]))[0];
assert(warlord,'matrix must contain a Warlord condition');
assert.equal((await runtime.rowsForUnit(warlord[0],{detachmentId:warlord[1].detachmentId})).find(rule=>rule.ruleId===warlord[1].ruleId).condition,'warlord-unknown');
const detachment=Object.entries(matrix.units).flatMap(([unitId,rules])=>rules.filter(rule=>rule.condition==='detachment-not-selected').map(rule=>[unitId,rule]))[0];
assert.equal((await runtime.rowsForUnit(detachment[0],{detachmentId:detachment[1].detachmentId})).find(rule=>rule.ruleId===detachment[1].ruleId).state,'match');
assert.equal((await runtime.rowsForUnit(detachment[0],{detachmentId:detachment[1].detachmentId.replace(/^detachment-/,'')})).find(rule=>rule.ruleId===detachment[1].ruleId).state,'match');
assert.deepEqual(await runtime.rowsForUnit(detachment[0],{detachmentId:'all'}),runtimeMatrix.units[detachment[0]],'All Detachments must preserve every compatible matrix row');
assert((await runtime.rowsForUnit(warlord[0],{detachmentId:'other'})).every(rule=>rule.scope==='core'));
assert.equal(runtimeFetches,1,'shared lazy source must fetch the matrix exactly once');
console.log('Death Guard compatible rules matrix QA passed.');
