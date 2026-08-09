import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCompatibleRules,inputs} from '../tools/build-compatible-rules.mjs';
import {getCompatibleRules} from '../scripts/compatible-rules-runtime.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const snapshot=read('sources/wahapedia-compatible-rules.snapshot.json'),report=read('reports/compatible-rules-import-report.json'),gaps=read('reports/compatible-rules-gap-report.json'),ledger=read('sources/compatible-rules-correction-ledger.json'),owners=read('sources/enhancement-owner-matrix.json'),matrix=read('generated/compatible-rules.json'),source=inputs(),built=buildCompatibleRules(source);

assert.deepEqual(matrix,built,'generated matrix must be reproducible from frozen inputs');
assert.equal(Object.keys(snapshot.units).length,18);
assert.equal(Object.keys(snapshot.coreUnits).length,18);
assert.deepEqual(report.summary.datasheets,{canonical:18,imported:18});
assert.deepEqual(report.summary.factionStratagems,{canonical:51,observed:49});
assert.equal(report.summary.unexplainedUnknowns,0);
assert.equal(report.summary.unresolved,0);
assert.deepEqual(gaps.unexplainedUnknowns,[]);
assert.equal(Object.keys(owners.enhancements).length,34);
assert.equal(Object.values(owners.enhancements).filter(item=>item.tags.includes('UPGRADE')).length,3);
assert.equal(Object.values(owners.enhancements).filter(item=>item.status==='unresolved-owner').length,0);

const ledgerPairs=new Set();
for(const entry of ledger.entries){
  assert.equal(entry.decision,'conditional');
  assert.equal(entry.conditionKind,'attachment');
  assert.equal(entry.unitIds.length*entry.ruleIds.length,entry.pairCount,`pairCount ${entry.id}`);
  for(const unitId of entry.unitIds)for(const ruleId of entry.ruleIds){const id=`${unitId}|${ruleId}`;assert(!ledgerPairs.has(id),`duplicate ledger pair ${id}`);ledgerPairs.add(id);}
}
assert.equal(ledgerPairs.size,17);

const all=Object.entries(matrix.units).flatMap(([unitId,rules])=>rules.map(rule=>({unitId,...rule})));
assert.equal(Object.keys(matrix.units).length,18);
assert.equal(all.filter(row=>row.state==='conditional').length,17);
assert.equal(new Set(all.filter(row=>!row.scope&&!row.kind).map(row=>row.ruleId)).size,49);
assert.equal(new Set(all.filter(row=>row.scope==='core').map(row=>row.ruleId)).size,10);
assert.equal(new Set(all.filter(row=>row.kind==='enhancement').map(row=>row.ruleId)).size,34);
assert(all.some(row=>row.ruleId==='enhancement-faultless-opportunist'));
for(const row of all.filter(row=>row.tags?.includes('UPGRADE'))){assert.equal(row.ownerSubject,'unit');assert.deepEqual(row.assignment,{maxOwners:3,enhancementChoices:1,payPointsPerOwner:true});}
for(const row of all.filter(row=>row.kind==='enhancement'&&!row.tags?.includes('UPGRADE'))){assert.equal(row.ownerSubject,'model');assert.deepEqual(row.assignment,{maxOwners:1,enhancementChoices:1,payPointsPerOwner:true});}
for(const epic of source.datasheets.filter(unit=>unit.keywords.includes('Epic Hero')).map(unit=>unit.id))assert.equal(matrix.units[epic].some(row=>row.kind==='enhancement'),false,`${epic} must not receive Enhancements`);
assert.equal(all.filter(row=>row.state==='conditional').every(row=>row.condition==='attachment-unknown'&&row.conditions.length===1),true);

const allDetachments=getCompatibleRules(matrix,'unit-lord-exultant',{detachmentId:'all'}),court=getCompatibleRules(matrix,'unit-lord-exultant',{detachmentId:'court-of-the-phoenician'});
assert(allDetachments.some(row=>row.scope==='core'));
assert(new Set(allDetachments.filter(row=>row.kind==='enhancement').map(row=>row.detachmentId)).size>1);
assert(court.every(row=>row.scope==='core'||row.detachmentId==='court-of-the-phoenician'));
assert(allDetachments.some(row=>row.ruleId==='enhancement-faultless-opportunist'));

const reader=fs.readFileSync(path.join(root,'reader.html'),'utf8'),template=fs.readFileSync(path.join(root,'mobile/related-rules.inc'),'utf8'),app=fs.readFileSync(path.join(root,'scripts/app.js'),'utf8'),rosterData=fs.readFileSync(path.join(root,'scripts/roster-data.js'),'utf8');
assert(reader.includes('./scripts/compatible-rules-runtime.mjs')===false,'runtime is imported by the book app');
assert(/\.\/scripts\/roster-filter\.js\?v=\d+/.test(reader));
assert(/\.\/scripts\/app\.js\?v=\d+/.test(reader));
assert(!reader.includes('related-rules-matcher.js'));
assert(!reader.includes('army-related-rules.js'));
assert(!reader.includes('army-book-app.js'));
assert(!reader.includes('data-eligibility'));
assert(!template.includes('data-eligibility'));
assert(!template.includes('data-keyword-grants'));
assert(/import\(new URL\('\.\/compatible-rules-runtime\.mjs\?v=\d+'/.test(app));
assert(!app.includes('data-eligibility'));
assert(!app.includes('allKeywords'));
assert(template.includes('Faultless Opportunist'));
for(const [title,value] of [['Frenzied Ferocity',15],['Eager Patrons',20],['Beguiling Grotesquerie',15]]){const start=template.indexOf(title);assert(start>=0,title);const current=template.slice(template.lastIndexOf('<article',start),template.indexOf('</article>',start));assert(current.includes('Enhancement · UPGRADE'));assert(current.includes(`${value} pts`),`${title} current MFM points`);}
assert(rosterData.includes('Faultless Opportunist'));
for(const value of [15,20])assert(rosterData.includes(`"value": ${value}`));

console.log(`PASS Emperor's Children matrix runtime: 18 datasheets, ${all.length} rows, 49 observed of 51 faction Stratagems, no unexplained unknowns`);
