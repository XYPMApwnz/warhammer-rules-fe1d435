import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCompatibleRules,inputs} from '../tools/build-compatible-rules.mjs';
import {createCompatibleRulesSource,getCompatibleRules} from '../../shared/compatible-rules-matrix.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const report=read('reports/compatible-rules-import-report.json'),snapshot=read('sources/wahapedia-compatible-rules.snapshot.json'),ledger=read('sources/compatible-rules-correction-ledger.json'),generated=read('generated/compatible-rules.json'),built=buildCompatibleRules(inputs());
assert.deepEqual(report.summary,{associations:{core:335,faction:1109},boardingActionNamesIgnored:21,coreStratagems:{canonical:10,observed:9},datasheets:{canonical:50,imported:50},factionStratagems:{canonical:51,observed:51},unresolved:0});
assert.equal(Object.keys(snapshot.units).length,50);assert.equal(Object.keys(snapshot.coreUnits).length,50);
assert.deepEqual(generated,built,'generated matrix is stale');
const rows=Object.values(generated.units).flat();
assert.equal(rows.length,1724);assert.equal(rows.filter(row=>row.scope==='core').length,335);assert.equal(rows.filter(row=>row.kind==='enhancement').length,194);assert.equal(rows.filter(row=>row.detachmentId&&row.kind!=='enhancement').length,1195);assert.equal(rows.filter(row=>row.state==='conditional').length,90);
assert.equal(ledger.entries.reduce((total,entry)=>total+entry.pairCount,0),96);for(const entry of ledger.entries)assert.equal(entry.unitIds.length*entry.ruleIds.length,entry.pairCount,entry.id);
for(const entry of ledger.entries.filter(entry=>entry.side==='matcher-only'))for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){const row=generated.units[unitId]?.find(item=>item.ruleId===ruleId);if(generated.units[unitId])assert.equal(row?.condition,'attachment-unknown',`${unitId}|${ruleId}`);}
for(const unitId of ['unit-harpy','unit-hive-crone','unit-mawloc','unit-neurotyrant','unit-old-one-eye','unit-the-red-terror','unit-trygon','unit-tyrannocyte','unit-winged-hive-tyrant'])assert.equal(generated.units[unitId].find(row=>row.ruleId==='stratagem-corrosive-viscera')?.state,'match');
const trygon=generated.units['unit-trygon'].filter(row=>row.kind==='enhancement'&&row.state==='conditional');assert.deepEqual(trygon.map(row=>row.ruleId),['synaptic-strategy','tremor-senses','trygon-prime','vanguard-intellect']);
assert.ok(getCompatibleRules(generated,'unit-hive-tyrant',{detachmentId:'all'}).some(row=>row.detachmentId==='invasion-fleet'),'All detachments must retain faction rules');
const runtime=createCompatibleRulesSource(generated,{schema:'tyranids-compatible-rules/v1',resolveDetachmentSelection:true}),selectedTrygon=runtime.rowsForUnit('unit-trygon',{detachmentId:'subterranean-assault'});assert.equal(selectedTrygon.find(row=>row.ruleId==='trygon-prime')?.state,'match');assert.ok(selectedTrygon.every(row=>row.scope==='core'||row.detachmentId==='subterranean-assault'));
const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8'),phone=fs.readFileSync(path.join(root,'mobile','trygon.html'),'utf8');
assert.doesNotMatch(reader,/related-rules-matcher/);assert.match(reader,/army-related-rules/);
assert.match(reader,/scripts\/app\.js\?v=\d+/);assert.match(phone,/data-canonical-reader="\.\.\/reader\.html"/);assert.match(phone,/data-canonical-target="unit-trygon"/);assert.match(phone,/mobile-route-redirect\.js\?v=2/);assert.doesNotMatch(phone,/<(?:article|section)\b|data-rule-id=/);
assert.doesNotMatch(fs.readFileSync(path.join(root,'mobile','related-rules.inc'),'utf8'),/data-eligibility|data-keyword-grants/);
console.log('Tyranids Compatible Rules QA passed: 1724 matrix rows, 90 conditional, legacy matcher absent.');
