import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {canonicalizeRelationTargets} from '../books/shared/tools/canonical-join-contract.mjs';
import {createEffectiveMfmArmyProjection} from '../books/shared/tools/effective-mfm-army-projection.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(ROOT,relative),'utf8');
const readJson=relative=>JSON.parse(read(relative));
const clean=value=>String(value??'').replace(/\s+/g,' ').trim().toUpperCase();
const bookIds=['tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
const expectedLegacyCounts={tyranids:15,'tau-empire':20,'emperors-children':8,'chaos-space-marines':59,'space-marines':213,'dark-angels':177,'blood-angels':161};

function unitInventory(codex){return[...(codex.datasheets||[]),...(codex.imperialArmour||[]),...(codex.legends||[])];}
function effectiveSourceUnits(bookId){
  const config=readJson(`books/${bookId}/book.config.json`),codex=readJson(`books/${bookId}/${config.sources.codexDatasheets}`),merged=new Map();
  for(const dependencyId of config.dependencies||[]){
    const dependencyConfig=readJson(`books/${dependencyId}/book.config.json`),dependencyCodex=readJson(`books/${dependencyId}/${dependencyConfig.sources.codexDatasheets}`),excluded=new Set((config.dependencyDatasheets?.excludeAnyKeywords||[]).map(clean));
    const candidates=config.dependencyDatasheets?.currentOnly?[...(dependencyCodex.datasheets||[]),...(dependencyCodex.imperialArmour||[])]:unitInventory(dependencyCodex);
    for(const unit of candidates.filter(item=>![...(item.keywords||[]),...(dependencyConfig.unitCompatibleChapterKeywords?.[item.id]||[])].some(keyword=>excluded.has(clean(keyword)))))merged.set(unit.id,unit);
  }
  const own=config.currentDatasheetLayers?config.currentDatasheetLayers.flatMap(layer=>codex[layer]||[]):config.currentDatasheetsOnly?codex.datasheets||[]:unitInventory(codex);
  for(const unit of own)merged.set(unit.id,unit);
  return [...merged.values()];
}

let legacyTitleRelations=0;
for(const bookId of bookIds){
  const units=effectiveSourceUnits(bookId),unitIds=units.map(({id})=>id),allowed=new Set(unitIds),legacyCount=units.reduce((total,unit)=>total+(unit.relations?.leader?.length||0)+(unit.relations?.support?.length||0),0);
  assert.equal(legacyCount,expectedLegacyCounts[bookId],`${bookId}: legacy relation baseline changed`);
  legacyTitleRelations+=legacyCount;
  const edges=createEffectiveMfmArmyProjection(bookId).relationEdges({effectiveUnitIds:unitIds}),keys=new Set();
  for(const edge of edges){
    assert(allowed.has(edge.sourceId),`${bookId}: unbound relation source ${edge.sourceId}`);
    assert(allowed.has(edge.targetId),`${bookId}: unbound relation target ${edge.targetId}`);
    const key=`${edge.role}\0${edge.sourceId}\0${edge.targetId}`;
    assert(!keys.has(key),`${bookId}: duplicate effective relation ${key}`);keys.add(key);
  }
}
assert.equal(legacyTitleRelations,653);

const sharedBuilder=read('books/shared/tools/build-army-book.mjs'),smCompatibleBuilder=read('books/space-marines/tools/build-compatible-rules.mjs');
assert.doesNotMatch(sharedBuilder,/canonicalizeRelationTargets/,'shared builder still consumes title-derived Army relations');
assert.doesNotMatch(smCompatibleBuilder,/canonicalizeRelationTargets/,'SM compatible builder still consumes title-derived Army relations');
assert.match(sharedBuilder,/mfmProjection\.relationEdges\(\{effectiveUnitIds:/,'shared builder does not consume effective MFM relation IDs');
assert.match(smCompatibleBuilder,/createEffectiveMfmArmyProjection\('space-marines'\)\.relationEdges/,'SM compatible builder does not consume effective MFM relation IDs');

const exact=[{id:'unit-source',title:'Source',relations:{leader:[{targetId:'unit-target'}]}},{id:'unit-target',title:'Original'}];
assert.deepEqual(canonicalizeRelationTargets(exact,{bookId:'mutation'}),[{role:'leader',sourceId:'unit-source',targetId:'unit-target'}]);
const renamed=structuredClone(exact);renamed[1].title='Arbitrary renamed target';
assert.deepEqual(canonicalizeRelationTargets(renamed,{bookId:'mutation'}),[{role:'leader',sourceId:'unit-source',targetId:'unit-target'}]);
assert.throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:['Target']}},{id:'unit-target',title:'Target'}],{bookId:'mutation'}),/requires an explicit canonical ID/);
assert.throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:[{targetId:'unit-unknown'}]}},{id:'unit-target',title:'Target'}],{bookId:'mutation'}),/unknown/);
assert.throws(()=>canonicalizeRelationTargets([{id:'unit-source',title:'Source',relations:{leader:[{targetId:'unit-target'},{targetId:'unit-target'}]}},{id:'unit-target',title:'Target'}],{bookId:'mutation'}),/duplicate leader relation/);

console.log('ARMY_RELATION_IDENTITY_QA=PASS');
console.log('LEGACY_NORMALIZED_TITLE_RELATIONS_BEFORE=653');
console.log('PRODUCTION_NORMALIZED_TITLE_RELATION_JOINS_AFTER=0');
console.log('RELATION_ID_SOURCE=EFFECTIVE_MFM_EXPLICIT_CANONICAL_BINDINGS');
console.log('RENAME_INFLUENCE=ZERO');
console.log('UNKNOWN_AND_DUPLICATE_TARGETS=FAIL_CLOSED');
