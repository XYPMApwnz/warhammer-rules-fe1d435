import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildCompatibleRules,inputs} from '../tools/build-compatible-rules.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL(file,import.meta.url),'utf8'));
const generated=read('../generated/compatible-rules.json'),source=inputs(),rebuilt=buildCompatibleRules(source);
const excluded=new Set(source.config.dependencyDatasheets.excludeAnyKeywords.map(value=>value.toUpperCase()));
const compatibilityKeywords=unit=>source.spaceMarinesConfig.unitCompatibleChapterKeywords?.[unit.id]||[],inclusionKeywords=unit=>[...(unit.keywords||[]),...compatibilityKeywords(unit)];
const shared=source.spaceMarines.datasheets.filter(unit=>!inclusionKeywords(unit).some(item=>excluded.has(String(item).toUpperCase()))),expectedIds=new Set([...source.codex.datasheets,...shared].map(unit=>unit.id));
const titleKey=value=>String(value||'').replace(/\s*\(Aura\)$/i,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),chapterKey=titleKey(source.config.dependencyDetachments.chapterKeyword),currentSharedTitles=new Set(source.spaceMarinesPoints.detachments.map(item=>titleKey(item.title)));
const localDetachments=[...(source.pack.detachments||[]),...(source.parity.detachments||[])],sharedDetachments=[...(source.spaceMarinesPack.detachments||[]),...(source.spaceMarinesParity.detachments||[])].filter(item=>{const restriction=item.restriction||source.spaceMarinesConfig.detachmentChapterRestrictions?.[item.title];return currentSharedTitles.has(titleKey(item.title))&&(!restriction||titleKey(restriction)===chapterKey);}),detachments=[...localDetachments,...sharedDetachments],detachmentIds=new Set(detachments.map(item=>item.id)),rows=Object.values(generated.units).flat();
const localPoints=source.points.enhancements,sharedPoints=source.spaceMarinesPoints.enhancements,factionRules=new Set(detachments.flatMap(item=>[...(item.stratagems||[]).map(rule=>rule.id),...(item.enhancements||[]).map(rule=>(sharedDetachments.includes(item)?sharedPoints:localPoints).find(point=>titleKey(point.detachment)===titleKey(item.title)&&titleKey(point.title)===titleKey(rule.title))?.id).filter(Boolean)]));
const exactIdentityDiff=(actual,expected)=>{const counts=new Map();for(const identity of actual)counts.set(identity,(counts.get(identity)||0)+1);const actualSet=new Set(counts.keys()),expectedSet=new Set(expected);return{missing:[...expectedSet].filter(identity=>!actualSet.has(identity)).sort(),unexpected:[...actualSet].filter(identity=>!expectedSet.has(identity)).sort(),duplicates:[...counts].filter(([,count])=>count>1).map(([identity])=>identity).sort()};};
const assertExactIdentities=(actual,expected,label)=>assert.deepEqual(exactIdentityDiff(actual,expected),{missing:[],unexpected:[],duplicates:[]},`${label} compatible Datasheet identity coverage drift`);

assert.deepEqual(generated,rebuilt,'Blood Angels Compatible Rules matrix is stale');
assert.equal(generated.schema,'blood-angels-compatible-rules/v1');
assert.equal(Object.keys(generated.units).length,97);
assert.deepEqual(new Set(Object.keys(generated.units)),expectedIds);
assert.ok(!expectedIds.has('unit-pedro-kantor'),'Pedro Kantor compatibility must exclude him from the Blood Angels shared inventory');
assert.equal(generated.units['unit-pedro-kantor'],undefined,'Pedro Kantor leaked into the Blood Angels Compatible Rules matrix');
assert.equal(localDetachments.length,8);
assert.equal(sharedDetachments.length,16);
assert.equal(detachments.length,24);
assert.ok(rows.length,'Compatible Rules matrix is empty');
assert.deepEqual(new Set(rows.filter(row=>row.scope!=='core').map(row=>row.ruleId)),factionRules);
assert.equal(new Set(rows.filter(row=>row.scope==='core').map(row=>row.ruleId)).size,10);
const universalRuleIds=new Set(['liberator-assault-group-armour-of-contempt','savage-echoes','the-lost-brethren-armour-of-contempt','the-angelic-host-armour-of-contempt','unbridled-ardour']);
const ownedRules=new Map(localDetachments.flatMap(detachment=>(detachment.stratagems||[]).filter(rule=>universalRuleIds.has(rule.id)).map(rule=>[rule.id,detachment.id])));
for(const id of universalRuleIds){
  assert.deepEqual(source.contracts.stratagems[id].roles.filter(role=>role.side==='friendly'&&role.subject==='unit').map(role=>role.selector),[{allKeywords:['ADEPTUS ASTARTES']}],`${id} source target contract drift`);
  const ownerId=ownedRules.get(id),expected=[...expectedIds].map(unitId=>`${unitId}#${ownerId}#${id}`),actual=Object.entries(generated.units).flatMap(([unitId,unitRows])=>unitRows.filter(row=>row.ruleId===id).map(row=>`${unitId}#${row.detachmentId}#${row.ruleId}`));
  assertExactIdentities(actual,expected,id);
}
assert.ok(generated.units['unit-drop-pod'].some(row=>row.ruleId==='angelic-grace'),'Drop Pod must retain Blood Angels ADEPTUS ASTARTES applicability');
for(const row of rows.filter(item=>item.scope!=='core'))assert.ok(detachmentIds.has(row.detachmentId),`Unknown Detachment ${row.detachmentId}`);
console.log(`Blood Angels Compatible Rules QA passed: 97 Datasheets, ${rows.length} deterministic rows and 24 Detachments.`);
