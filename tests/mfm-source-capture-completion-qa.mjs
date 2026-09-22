import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const books=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const expected={
  'death-guard':{current:36,legends:5,leader:[11,17],support:[0,0],detachments:9,enhancements:30},
  'adeptus-mechanicus':{current:34,legends:4,leader:[3,24],support:[3,14],detachments:10,enhancements:34},
  tyranids:{current:52,legends:5,leader:[8,15],support:[0,0],detachments:10,enhancements:34},
  'tau-empire':{current:43,legends:19,leader:[9,20],support:[0,0],detachments:7,enhancements:23},
  'emperors-children':{current:23,legends:0,leader:[4,8],support:[0,0],detachments:10,enhancements:34},
  'chaos-space-marines':{current:54,legends:31,leader:[17,51],support:[2,7],detachments:17,enhancements:62},
  'space-marines':{current:103,legends:76,leader:[28,172],support:[11,68],detachments:23,enhancements:87},
  'dark-angels':{current:100,legends:3,leader:[20,140],support:[10,65],detachments:24,enhancements:85},
  'blood-angels':{current:99,legends:10,leader:[20,117],support:[10,72],detachments:24,enhancements:85}
};
const read=relative=>fs.readFileSync(path.join(root,relative));
const json=relative=>JSON.parse(read(relative));
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();
const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
const stableHash=value=>sha(Buffer.from(JSON.stringify(stable(value)),'utf8'));
const nameKey=value=>String(value||'').normalize('NFKD').replace(/[’']/g,'').replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase();
const integer=value=>Number(String(value).match(/\d+/)?.[0]);

function oldUnits(book,source){
  if(book==='death-guard')return source.units.map(unit=>[nameKey(unit.title),unit.schedules.flatMap(schedule=>schedule.values.map(row=>row.value))]);
  if(book==='adeptus-mechanicus')return Object.entries(source.units).map(([title,unit])=>[nameKey(title),unit.points.map(row=>row[1])]);
  return source.unitOverrides.map(unit=>[nameKey(unit.title),unit.points.map(row=>row.value)]);
}
function oldDetachments(book,source){
  if(book==='death-guard')return source.detachments.map(item=>[nameKey(item.title),integer(item.dp),nameKey(item.disposition)]);
  if(book==='adeptus-mechanicus')return Object.entries(source.detachments).map(([title,item])=>[nameKey(title),item.dp,nameKey(item.disposition)]);
  return source.detachments.map(item=>[nameKey(item.title),item.detachmentPoints,nameKey(item.forceDisposition)]);
}
function currentRelationCounts(units,kind){
  const current=units.filter(unit=>unit.status==='CURRENT'),records=current.filter(unit=>unit.relations?.[kind]?.length).length;
  return[records,current.reduce((sum,unit)=>sum+(unit.relations?.[kind]?.length||0),0)];
}
function recomputeCounts(capture){
  const units=capture.units,detachments=capture.detachments;
  return{
    currentUnits:units.filter(unit=>unit.status==='CURRENT').length,legendsUnits:units.filter(unit=>unit.status==='LEGENDS').length,totalPricedUnits:units.length,
    pointSchedules:units.reduce((sum,unit)=>sum+unit.pointSchedules.length,0),pointRows:units.reduce((sum,unit)=>sum+unit.pointSchedules.reduce((inner,schedule)=>inner+schedule.entries.length,0),0),
    paidOptions:units.reduce((sum,unit)=>sum+(unit.paidOptions?.length||0),0),leaderRecords:units.filter(unit=>unit.relations?.leader?.length).length,
    leaderEdges:units.reduce((sum,unit)=>sum+(unit.relations?.leader?.length||0),0),supportRecords:units.filter(unit=>unit.relations?.support?.length).length,
    supportEdges:units.reduce((sum,unit)=>sum+(unit.relations?.support?.length||0),0),detachments:detachments.length,
    enhancements:detachments.reduce((sum,detachment)=>sum+detachment.enhancements.length,0),detachmentQualifierRecords:detachments.reduce((sum,detachment)=>sum+detachment.qualifiers.length,0),
    enhancementQualifierRecords:detachments.reduce((sum,detachment)=>sum+detachment.enhancements.reduce((inner,enhancement)=>inner+enhancement.qualifiers.length,0),0)
  };
}

const currentness=json('books/shared/sources/mfm-v1.4/currentness.json');
assert.equal(currentness.schema,'warhammer-mfm-currentness-capture/v1');
assert.equal(currentness.version,'v1.4');
assert.equal(currentness.sourceUpdatedAt,'2026-09-02');
assert.equal(currentness.currentnessCutoff,'2026-09-22');
assert.equal(currentness.currentness,'CURRENT');
const downloadsRaw=read('books/shared/sources/mfm-v1.4/warhammer-40000-downloads.html');
assert.equal(downloadsRaw.length,currentness.downloads.rawArtifact.bytes);
assert.equal(sha(downloadsRaw),currentness.downloads.rawArtifact.sha256);
const currentnessClone=structuredClone(currentness);delete currentnessClone.captureSha256;
assert.equal(stableHash(currentnessClone),currentness.captureSha256);
assert.deepEqual(currentness.factions.map(item=>item.factionId).sort(),[...books].sort());

const qualifierLedger=[],captures=[];
for(const book of books){
  const relative=`books/${book}/sources/official-mfm-v1.4.json`,capture=json(relative),prior=json(`books/${book}/sources/official-mfm-v1.3.json`),exp=expected[book];
  captures.push(capture);
  assert.equal(capture.schema,'warhammer-mfm-live-capture/v1');
  assert.equal(capture.factionId,book);assert.equal(capture.version,'v1.4');assert.equal(capture.sourceUpdatedAt,'2026-09-02');
  assert.equal(capture.capturedAt,'2026-09-22');assert.equal(capture.currentnessCutoff,'2026-09-22');assert.equal(capture.currentness,'CURRENT');
  assert.equal(capture.authority,'OFFICIAL_GAMES_WORKSHOP_LIVE_MFM');assert.equal(capture.url,`https://mfm.warhammer-community.com/en/${book}`);
  const clone=structuredClone(capture);delete clone.captureSha256;assert.equal(stableHash(clone),capture.captureSha256,`${book}: normalized payload fingerprint drift`);
  assert.deepEqual(recomputeCounts(capture),capture.counts,`${book}: declared capture counts drift`);
  assert.equal(capture.counts.currentUnits,exp.current);assert.equal(capture.counts.legendsUnits,exp.legends);
  assert.equal(capture.counts.detachments,exp.detachments);assert.equal(capture.counts.enhancements,exp.enhancements);
  assert.deepEqual(currentRelationCounts(capture.units,'leader'),exp.leader,`${book}: current Leader relation coverage drift`);
  assert.deepEqual(currentRelationCounts(capture.units,'support'),exp.support,`${book}: current Support relation coverage drift`);
  const unitKeys=capture.units.map(unit=>`${unit.status}\0${unit.sourceGroup}\0${unit.title}`);
  assert.equal(new Set(unitKeys).size,unitKeys.length,`${book}: duplicate priced unit source identity`);
  for(const unit of capture.units){
    assert(['CURRENT','LEGENDS'].includes(unit.status));assert(unit.title&&unit.sourceGroup&&unit.pointSchedules.length);
    for(const schedule of unit.pointSchedules){assert(schedule.sourceLabel&&schedule.entries.length);for(const row of schedule.entries)assert(row.sourceLabel&&Number.isInteger(row.value)&&row.value>=0&&Number.isInteger(row.minModels)&&Number.isInteger(row.maxModels));}
    for(const option of unit.paidOptions||[])assert(option.sourceLabel&&option.title&&Number.isInteger(option.value));
    for(const kind of ['leader','support'])for(const target of unit.relations?.[kind]||[])assert(target&&typeof target==='string');
  }
  const detachmentKeys=capture.detachments.map(detachment=>detachment.title);assert.equal(new Set(detachmentKeys).size,detachmentKeys.length,`${book}: duplicate Detachment source title`);
  for(const detachment of capture.detachments){
    assert(detachment.title&&Number.isInteger(detachment.detachmentPoints)&&detachment.detachmentPoints>=0);assert(/^(RECONNAISSANCE|DISRUPTION|PRIORITY ASSETS|PURGE THE FOE|TAKE AND HOLD)$/.test(detachment.forceDisposition));
    assert.equal(new Set(detachment.enhancements.map(item=>item.title)).size,detachment.enhancements.length,`${book}/${detachment.title}: duplicate Enhancement source title`);
    for(const qualifier of detachment.qualifiers)qualifierLedger.push(`${book}|DETACHMENT|${detachment.title}|${qualifier.kind}|${qualifier.value}`);
    for(const enhancement of detachment.enhancements){assert(enhancement.title&&Number.isInteger(enhancement.value));for(const qualifier of enhancement.qualifiers)qualifierLedger.push(`${book}|ENHANCEMENT|${detachment.title}|${enhancement.title}|${qualifier.kind}|${qualifier.values.join(',')}`);}
  }
  for(const artifact of capture.rawArtifacts){
    const bytes=read(`books/${book}/sources/${artifact.path}`);assert.equal(bytes.length,artifact.bytes,`${book}: raw artifact byte count drift`);assert.equal(sha(bytes),artifact.sha256,`${book}: raw artifact fingerprint drift`);
  }
  const newCurrent=new Map(capture.units.filter(unit=>unit.status==='CURRENT').map(unit=>[nameKey(unit.title),unit.pointSchedules.flatMap(schedule=>schedule.entries.map(row=>row.value))]));
  for(const [title,values] of oldUnits(book,prior)){assert(newCurrent.has(title),`${book}: previously accepted priced unit disappeared: ${title}`);assert.deepEqual([...newCurrent.get(title)].sort((left,right)=>left-right),[...values].sort((left,right)=>left-right),`${book}: point values changed without an explicit source delta: ${title}`);}
  const newDetachments=new Map(capture.detachments.map(item=>[nameKey(item.title),[item.detachmentPoints,nameKey(item.forceDisposition)]]));
  for(const [title,dp,disposition] of oldDetachments(book,prior)){assert(newDetachments.has(title),`${book}: previously accepted Detachment disappeared: ${title}`);assert.deepEqual(newDetachments.get(title),[dp,disposition],`${book}: DP/Force Disposition changed without an explicit source delta: ${title}`);}
}

for(const required of [
  'tau-empire|DETACHMENT|AUXILIARY CADRE|UNIQUE|AUXILIARY','tau-empire|DETACHMENT|EXPERIMENTAL PROTOTYPE CADRE|UNIQUE|BATTLESUIT',
  'chaos-space-marines|DETACHMENT|MURDERTALON RAIDERS|UNIQUE|NIGHTMARE','adeptus-mechanicus|DETACHMENT|DATA-PSALM CONCLAVE|UNIQUE|DATA-PSALM',
  'blood-angels|DETACHMENT|ANGELIC INHERITORS|UNIQUE|GRACE','blood-angels|DETACHMENT|RAGE-CURSED ONSLAUGHT|UNIQUE|DOOMED',
  'chaos-space-marines|ENHANCEMENT|MURDERTALON RAIDERS|Pact of Cursed Pinions|LEADER|WARP TALONS',
  'emperors-children|ENHANCEMENT|COURT OF THE PHOENICIAN|Exalted Patron|LEADER|FLAWLESS BLADES'
])assert(qualifierLedger.includes(required),`official qualifier metadata missing: ${required}`);

const totals=captures.reduce((sum,capture)=>({
  leaderRecords:sum.leaderRecords+capture.counts.leaderRecords,leaderEdges:sum.leaderEdges+capture.counts.leaderEdges,
  supportRecords:sum.supportRecords+capture.counts.supportRecords,supportEdges:sum.supportEdges+capture.counts.supportEdges,
  qualifiers:sum.qualifiers+capture.counts.detachmentQualifierRecords+capture.counts.enhancementQualifierRecords
}),{leaderRecords:0,leaderEdges:0,supportRecords:0,supportEdges:0,qualifiers:0});
assert.deepEqual(totals,{leaderRecords:148,leaderEdges:652,supportRecords:45,supportEdges:258,qualifiers:16});
console.log(`MFM source capture completion QA passed: 9 official v1.4 factions; Leaders ${totals.leaderRecords}/${totals.leaderEdges}, Support ${totals.supportRecords}/${totals.supportEdges}, qualifier records ${totals.qualifiers}; DG/AM/T'au/DA relations and SM Support closed; prior point/DP/Force-Disposition values preserved.`);
