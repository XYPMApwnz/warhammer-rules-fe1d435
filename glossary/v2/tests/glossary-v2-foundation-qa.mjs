import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {BOOK_IDS,FACTUAL_INPUTS,buildGlossaryV2Index,createGlossaryV2Index,loadGlossaryV2Inputs} from '../content/glossary-v2-index.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const generated=JSON.parse(fs.readFileSync(path.join(root,'glossary/v2/generated/index.en.json'),'utf8'));
const inputs=await loadGlossaryV2Inputs();
const index=createGlossaryV2Index(inputs);
assert.deepEqual(generated,index,'generated Glossary V2 index must equal the effective-domain projection');
assert.equal(index.schema,'wh40k-glossary-v2-index/v1');
assert.equal(index.factualAuthority,false);
assert.equal(index.counts.total,index.entries.length);
assert.equal(new Set(index.entries.map(entry=>entry.id)).size,index.entries.length,'V2 entry IDs must be unique');

assert.equal(index.counts.byDomain.CORE,293,'Core must contribute full factual records, excluding alias-only errata and evidence-pending identities');
assert.equal(index.coverage.coreNotIndexed.identityOnly.length,2);
assert.equal(index.coverage.coreNotIndexed.aliasOnlyErrata.length,2);
assert.equal(index.counts.byDomain.MISSIONS,156,'Missions must contribute the Standard/Event union plus eight factual FAQ clarifications');
assert.deepEqual(index.coverage.armyEffectiveBooks,BOOK_IDS,'all nine supported Army Books must contribute');
for(const bookId of BOOK_IDS)assert(index.entries.some(entry=>entry.domain==='ARMY'&&entry.contexts.some(context=>context.effectiveBookId===bookId)),`${bookId} must contribute an effective Army context`);

const coreDeepStrike=index.entries.filter(entry=>entry.id==='core::core-deep-strike');
assert.equal(coreDeepStrike.length,1,'one Core fact referenced by many datasheets must remain one article');
assert(coreDeepStrike[0].contexts.length>1,'Core ability article must retain Army occurrence contexts');
const standardEventPrimary=index.entries.find(entry=>entry.id==='missions::primary-battlefield-dominance');
assert.deepEqual(new Set(standardEventPrimary.contexts.map(context=>context.scope)),new Set(['STANDARD_MATCHED_PLAY','EVENT_PLAY']),'shared Mission fact must be one article with both scopes');

assert.equal(index.coverage.mfm.standaloneArticles,0,'MFM must augment factual owners instead of creating duplicate articles');
assert.equal(index.counts.byDomain.MFM,undefined);
assert.equal(index.coverage.mfm.augmentation.pointRecords,inputs.mfmCatalog.unitPointRecords.filter(record=>{const ref=inputs.mfmCatalog.unitReferences.find(item=>item.id===record.unitReferenceId);return ref?.armyBinding?.bindingStatus==='BOUND';}).length);
assert.equal(index.coverage.mfm.augmentation.paidUpgrades,inputs.mfmCatalog.paidUpgradeRecords.length);
assert.equal(index.coverage.mfm.augmentation.detachments,inputs.mfmCatalog.detachments.length);
assert.equal(index.coverage.mfm.augmentation.enhancementCosts,inputs.mfmCatalog.enhancementCosts.length);
assert.equal(index.coverage.mfm.augmentation.qualifiers,inputs.mfmCatalog.qualifierRecords.length);
assert.equal(index.coverage.mfm.augmentation.referenceOnlyPointRecords.length,4,'four T’au IA point records remain explicit reference-only coverage');
assert(index.entries.some(entry=>entry.recordType==='UNIT'&&entry.mfm?.pointRecords?.length),'bound MFM points must augment Army units');
assert(index.entries.some(entry=>entry.recordType==='DETACHMENT'&&entry.mfm?.detachment),'bound MFM DP/Force Disposition facts must augment Army Detachments');
assert(index.entries.some(entry=>entry.recordType==='ENHANCEMENT'&&entry.mfm?.enhancementCost),'bound MFM cost must augment Army Enhancements');

assert(!FACTUAL_INPUTS.some(input=>/registry\.en\.json|aliases\.en\.json|scripts\/data\.js|\.html/i.test(input)),'generated and legacy glossary artifacts cannot be factual inputs');
assert(!index.entries.some(entry=>entry.sourceOwner.domain==='GLOSSARY'),'legacy Glossary cannot own V2 gameplay facts');
assert.equal(index.coverage.legacy.editorialMigrated,11,'only editorial contracts with one exact canonical target may migrate');
assert.equal(index.coverage.legacy.editorialUnresolved.length,13,'unbound legacy editorial identities must remain explicit');
assert.equal(index.coverage.legacy.resolutionAliasesMigrated,10);
assert.equal(index.coverage.legacy.preferredMatchesMigrated,4);
assert.equal(index.coverage.legacy.preferredMatchesUnresolved.length,1);
assert.equal(index.coverage.legacy.legacyGameplayRejected.length,65,'legacy supplemental gameplay bodies are rejected as factual input');
assert.equal(index.coverage.legacy.quickReferenceGameplayRejected,14,'legacy quick-reference gameplay bodies are rejected as factual input');

const weapons=index.entries.filter(entry=>entry.recordType==='WEAPON_PROFILE');
const duplicateByLabel=new Map();for(const entry of weapons){const key=entry.label.toLocaleLowerCase('en');if(!duplicateByLabel.has(key))duplicateByLabel.set(key,[]);duplicateByLabel.get(key).push(entry);}
const scopedDuplicate=[...duplicateByLabel.values()].find(group=>new Set(group.map(entry=>entry.parent.canonicalId)).size>1);
assert(scopedDuplicate,'same-name weapon profiles must coexist as parent-scoped entries');
assert.equal(new Set(scopedDuplicate.map(entry=>entry.id)).size,scopedDuplicate.length);

const renamedInputs={...inputs,armyModels:structuredClone(inputs.armyModels)};
renamedInputs.armyModels[0].units[0].title='DISPLAY TITLE MUTATION';
const firstWeapon=renamedInputs.armyModels.flatMap(model=>model.units).flatMap(unit=>unit.weapons||[])[0];if(firstWeapon)firstWeapon.name='DISPLAY WEAPON MUTATION';
const renamed=createGlossaryV2Index(renamedInputs);
assert.deepEqual(renamed.entries.map(entry=>entry.id),index.entries.map(entry=>entry.id),'display title changes must have zero identity influence');

for(const entry of index.entries){
  assert(entry.sourceOwner?.canonicalId,`${entry.id}: source owner is required`);
  if(entry.parent)assert(entry.id.includes(entry.parent.canonicalId),`${entry.id}: scoped child ID must retain parent identity`);
}
const second=await buildGlossaryV2Index();
assert.equal(JSON.stringify(second),JSON.stringify(index),'Glossary V2 build must be deterministic');

console.log(`Glossary V2 foundation QA PASS (${index.counts.total} entries; ${index.counts.standalone} standalone; ${index.counts.scopedChildren} scoped children)`);
