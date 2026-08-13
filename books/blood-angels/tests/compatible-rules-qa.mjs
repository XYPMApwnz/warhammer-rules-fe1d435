import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildCompatibleRules,inputs} from '../tools/build-compatible-rules.mjs';

const read=file=>JSON.parse(fs.readFileSync(new URL(file,import.meta.url),'utf8'));
const generated=read('../generated/compatible-rules.json'),source=inputs(),rebuilt=buildCompatibleRules(source);
const excluded=new Set(source.config.dependencyDatasheets.excludeAnyKeywords.map(value=>value.toUpperCase()));
const shared=source.spaceMarines.datasheets.filter(unit=>!(unit.keywords||[]).some(item=>excluded.has(String(item).toUpperCase()))),expectedIds=new Set([...source.codex.datasheets,...shared].map(unit=>unit.id));
const titleKey=value=>String(value||'').replace(/\s*\(Aura\)$/i,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),chapterKey=titleKey(source.config.dependencyDetachments.chapterKeyword),currentSharedTitles=new Set(source.spaceMarinesPoints.detachments.map(item=>titleKey(item.title)));
const localDetachments=[...(source.pack.detachments||[]),...(source.parity.detachments||[])],sharedDetachments=[...(source.spaceMarinesPack.detachments||[]),...(source.spaceMarinesParity.detachments||[])].filter(item=>{const restriction=item.restriction||source.spaceMarinesConfig.detachmentChapterRestrictions?.[item.title];return currentSharedTitles.has(titleKey(item.title))&&(!restriction||titleKey(restriction)===chapterKey);}),detachments=[...localDetachments,...sharedDetachments],detachmentIds=new Set(detachments.map(item=>item.id)),rows=Object.values(generated.units).flat();
const localPoints=source.points.enhancements,sharedPoints=source.spaceMarinesPoints.enhancements,factionRules=new Set(detachments.flatMap(item=>[...(item.stratagems||[]).map(rule=>rule.id),...(item.enhancements||[]).map(rule=>(sharedDetachments.includes(item)?sharedPoints:localPoints).find(point=>titleKey(point.detachment)===titleKey(item.title)&&titleKey(point.title)===titleKey(rule.title))?.id).filter(Boolean)]));

assert.deepEqual(generated,rebuilt,'Blood Angels Compatible Rules matrix is stale');
assert.equal(generated.schema,'blood-angels-compatible-rules/v1');
assert.equal(Object.keys(generated.units).length,97);
assert.deepEqual(new Set(Object.keys(generated.units)),expectedIds);
assert.equal(localDetachments.length,8);
assert.equal(sharedDetachments.length,16);
assert.equal(detachments.length,24);
assert.ok(rows.length,'Compatible Rules matrix is empty');
assert.deepEqual(new Set(rows.filter(row=>row.scope!=='core').map(row=>row.ruleId)),factionRules);
assert.equal(new Set(rows.filter(row=>row.scope==='core').map(row=>row.ruleId)).size,10);
for(const id of ['liberator-assault-group-armour-of-contempt','savage-echoes','the-lost-brethren-armour-of-contempt','the-angelic-host-armour-of-contempt','unbridled-ardour'])assert.ok(rows.filter(row=>row.ruleId===id).length>32,`${id} must not be restricted to a Character or effect-recipient keyword`);
assert.ok(generated.units['unit-drop-pod'].some(row=>row.ruleId==='angelic-grace'),'Drop Pod must retain Blood Angels ADEPTUS ASTARTES applicability');
for(const row of rows.filter(item=>item.scope!=='core'))assert.ok(detachmentIds.has(row.detachmentId),`Unknown Detachment ${row.detachmentId}`);
console.log(`Blood Angels Compatible Rules QA passed: 97 Datasheets, ${rows.length} deterministic rows and 24 Detachments.`);
