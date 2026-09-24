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

const detachmentEntries=index.entries.filter(entry=>entry.recordType==='DETACHMENT');
assert.equal(detachmentEntries.length,102,'all standalone Detachment identities must remain present exactly once');
assert.equal(new Set(detachmentEntries.map(entry=>entry.id)).size,102,'standalone Detachment identities must remain unique');
for(const entry of detachmentEntries)assert(entry.facts.detachmentRules?.length,`${entry.id}: standalone Detachment must project its accepted gameplay rule facts`);
for(const bookId of ['death-guard','adeptus-mechanicus','space-marines','dark-angels','blood-angels'])assert(detachmentEntries.some(entry=>entry.contexts.some(context=>context.effectiveBookId===bookId)&&entry.facts.detachmentRules.length),`${bookId}: representative Detachment gameplay projection`);
const mortarionsHammer=detachmentEntries.find(entry=>entry.id==='army::death-guard::detachment::detachment-mortarions-hammer');
assert(mortarionsHammer,'Mortarion’s Hammer standalone article');
const miasmic=mortarionsHammer.facts.detachmentRules.find(rule=>rule.id==='detachment-rule-miasmic-bombardment');
assert(miasmic,'Mortarion’s Hammer must project Miasmic Bombardment by stable rule identity');
assert.match(miasmic.blocks.find(block=>block.type==='ability').text,/select a number of enemy units/i);
assert.deepEqual(miasmic.blocks.find(block=>block.type==='table').rows,[['Incursion','1'],['Strike Force','2'],['Onslaught','3']]);
const spearpoint=detachmentEntries.find(entry=>entry.id==='army::space-marines::detachment::spearpoint-task-force');
assert.match(spearpoint.facts.restrictions,/cannot include any Adeptus Astartes units drawn from any other Chapter/,'Detachment-level accepted restrictions must remain in the standalone projection');

assert(!FACTUAL_INPUTS.some(input=>/registry\.en\.json|aliases\.en\.json|scripts\/data\.js|\.html/i.test(input)),'generated and legacy glossary artifacts cannot be factual inputs');
assert(!index.entries.some(entry=>entry.sourceOwner.domain==='GLOSSARY'),'legacy Glossary cannot own V2 gameplay facts');
assert.equal(index.coverage.legacy.editorialMigrated,11,'only editorial contracts with one exact canonical target may migrate');
assert.equal(index.coverage.legacy.editorialUnresolved.length,13,'unbound legacy editorial identities must remain explicit');
assert.equal(index.coverage.legacy.resolutionAliasesMigrated,10);
assert.equal(index.coverage.legacy.supplementalAliasesMigrated,55,'all accepted supplemental aliases and match labels must resolve');
assert.equal(index.coverage.legacy.supplementalTargetBindings,7,'legacy presentation IDs must bind explicitly to existing V2 owners');
assert.equal(index.coverage.legacy.preferredMatchesMigrated,5);
assert.equal(index.coverage.legacy.preferredMatchesUnresolved.length,0);
assert.equal(index.coverage.legacy.legacyGameplayRejected.length,65,'legacy supplemental gameplay bodies are rejected as factual input');
assert.equal(index.coverage.legacy.quickReferenceGameplayRejected,14,'legacy quick-reference gameplay bodies are rejected as factual input');

const migratedLegacyLabels=new Map([
  ['damage-roll','core::core-rule-02-02-03-random-characteristics'],
  ['Damage roll','core::core-rule-02-02-03-random-characteristics'],
  ['Damage rolls','core::core-rule-02-02-03-random-characteristics'],
  ['battle-shocked','core::core-rule-01-07-battle-shock-rolls'],
  ['Battle-shocked','core::core-rule-01-07-battle-shock-rolls'],
  ['plagues','army::death-guard::army_rule::army-rule-nurgles-gift'],
  ['Plague','army::death-guard::army_rule::army-rule-nurgles-gift'],
  ['Plagues','army::death-guard::army_rule::army-rule-nurgles-gift'],
  ['range-characteristics','core::core-rule-02-04-weapons'],
  ['Range characteristic','core::core-rule-02-04-weapons'],
  ['Range characteristics','core::core-rule-02-04-weapons'],
  ['attacks','core::core-rule-02-04-weapons'],
  ['Attacks characteristic','core::core-rule-02-04-weapons'],
  ['Attacks characteristics','core::core-rule-02-04-weapons'],
  ['damage-characteristic','core::core-rule-02-04-weapons'],
  ['Damage characteristic','core::core-rule-02-04-weapons'],
  ['Damage characteristics','core::core-rule-02-04-weapons']
]);
for(const [label,targetId] of migratedLegacyLabels){
  const matches=index.entries.filter(entry=>entry.aliases.includes(label));
  assert.equal(matches.length,1,`${label}: supplemental label must resolve without dangling or ambiguous bindings`);
  assert.equal(matches[0].id,targetId,`${label}: supplemental label must resolve to its explicit factual owner`);
}
const transportPreferred=index.entries.filter(entry=>entry.presentation.preferredMatchLabels?.includes('transport'));
assert.deepEqual(transportPreferred.map(entry=>entry.id),['core::core-rule-18-01-transport-capacity'],'transport preferred match must resolve through the accepted keyword-transport migration binding');

const oath=index.entries.filter(entry=>entry.sourceOwner.canonicalId==='army-rule-oath-of-moment');
assert.equal(oath.length,1,'inherited Oath of Moment must remain one Space Marines-owned factual article');
assert.equal(oath[0].id,'army::space-marines::army_rule::army-rule-oath-of-moment');
assert.equal(oath[0].sourceOwner.bookId,'space-marines');
assert.deepEqual(new Set(oath[0].contexts.map(context=>context.effectiveBookId)),new Set(['space-marines','dark-angels','blood-angels']),'Oath of Moment must retain all three effective-book contexts');
const oathSourceTexts=inputs.armyModels.flatMap(model=>[...(model.rules?.armyRules||[]),...(model.rules?.armyRule?[model.rules.armyRule]:[])]).filter(rule=>rule.id==='army-rule-oath-of-moment').map(rule=>rule.text);
assert.equal(new Set(oathSourceTexts).size,1,'all inherited Oath of Moment contexts must carry identical accepted semantics');
assert.equal(oath[0].facts.text,oathSourceTexts[0],'folding inherited contexts must not change Oath of Moment gameplay text');
assert.equal(index.entries.filter(entry=>entry.label==='Oath of Moment').length,1,'Oath of Moment occurrences must not become a second standalone factual article');
assert(!index.entries.some(entry=>entry.id==='army::space-marines::ability::space-marines-army-rule-oath-of-moment'),'the derived Oath datasheet occurrence must resolve to its Army-rule owner');

const coreSupportId='core::core-rule-19-01-forming-attached-units',coreSupport=index.entries.find(entry=>entry.id===coreSupportId);
const falseSupportArticles=[
  {entryId:'army::chaos-space-marines::ability::chaos-space-marines-ability-support',termId:'chaos-space-marines-ability-support',bookId:'chaos-space-marines',unitId:'unit-masters-of-the-maelstrom',mfmId:'mfm-support-eligibility-d50c824cb1d8dabe'},
  {entryId:'army::space-marines::ability::space-marines-ability-support-3',termId:'space-marines-ability-support-3',bookId:'space-marines',unitId:'unit-cato-sicarius',mfmId:'mfm-support-eligibility-384607b24098f07e'},
  {entryId:'army::space-marines::ability::space-marines-ability-support-4',termId:'space-marines-ability-support-4',bookId:'space-marines',unitId:'unit-wardens-of-ultramar',mfmId:'mfm-support-eligibility-80d2e325d305c2b3'}
];
assert(coreSupport,'canonical Core Support mechanic must be indexed');
for(const control of falseSupportArticles){
  assert(!index.entries.some(entry=>entry.id===control.entryId),`${control.termId}: empty Support occurrence must not become an Army article`);
  assert(coreSupport.aliases.includes(control.termId),`${control.termId}: compatibility identity must resolve to Core Support`);
  assert(coreSupport.contexts.some(context=>context.effectiveBookId===control.bookId&&context.parentUnitId===control.unitId&&context.termId===control.termId),`${control.termId}: exact Army occurrence context`);
  const parent=index.entries.find(entry=>entry.id===`army::${control.bookId}::unit::${control.unitId}`);
  assert(parent?.mfm?.supportRelations?.some(record=>record.id===control.mfmId),`${control.termId}: MFM Support relation must remain on its canonical parent`);
}
const catoSupport=index.entries.find(entry=>entry.id==='army::space-marines::ability::space-marines-ability-support-2');
assert.match(catoSupport?.facts?.text||'',/VICTRIX HONOUR GUARD/,'Cato Sicarius substantive Army-owned Support rule must remain distinct');

const renamedSupportInputs={...inputs,armyModels:structuredClone(inputs.armyModels)};
for(const control of falseSupportArticles){
  const model=renamedSupportInputs.armyModels.find(item=>item.book.id===control.bookId),unit=model.units.find(item=>item.id===control.unitId),ability=[...(unit.abilities||[]),...(unit.wargearAbilities||[])].find(item=>(item.termId||item.id||item.sourceAbilityId)===control.termId);
  ability.title='DISPLAY SUPPORT MUTATION';
}
const renamedSupportIndex=createGlossaryV2Index(renamedSupportInputs),renamedCoreSupport=renamedSupportIndex.entries.find(entry=>entry.id===coreSupportId);
for(const control of falseSupportArticles){
  assert(!renamedSupportIndex.entries.some(entry=>entry.id===control.entryId),`${control.termId}: display rename must not restore a false article`);
  assert(renamedCoreSupport.aliases.includes(control.termId),`${control.termId}: display rename must not change Core binding`);
}
const poisonedSupportInputs={...inputs,armyModels:structuredClone(inputs.armyModels)},poisonedMasters=poisonedSupportInputs.armyModels.find(item=>item.book.id==='chaos-space-marines').units.find(item=>item.id==='unit-masters-of-the-maelstrom').abilities.find(item=>item.termId==='chaos-space-marines-ability-support');
poisonedMasters.text='INDEPENDENT SUPPORT GAMEPLAY POISON';
assert.throws(()=>createGlossaryV2Index(poisonedSupportInputs),/unexpectedly owns gameplay text/,'an empty Support compatibility occurrence cannot become an independent factual owner');
const conflictingSupportInputs={...inputs,armyModels:structuredClone(inputs.armyModels)},conflictingSm=conflictingSupportInputs.armyModels.find(item=>item.book.id==='space-marines');
conflictingSm.units.find(item=>item.id==='unit-intercessor-squad').abilities.push({title:'Support',text:'',termId:'space-marines-ability-support-4'});
assert.throws(()=>createGlossaryV2Index(conflictingSupportInputs),/conflicting Support occurrence/,'a Support compatibility identity cannot bind from the wrong parent unit');

const staleOathOccurrenceInputs={...inputs,armyModels:structuredClone(inputs.armyModels)};
const staleOathOccurrence=staleOathOccurrenceInputs.armyModels.flatMap(model=>model.units).flatMap(unit=>unit.abilities||[]).find(ability=>ability.termId==='space-marines-army-rule-oath-of-moment');
assert(staleOathOccurrence,'an Oath of Moment datasheet occurrence is required for the ownership control');
staleOathOccurrence.text='STALE DERIVED OCCURRENCE POISON';
const staleOathOccurrenceIndex=createGlossaryV2Index(staleOathOccurrenceInputs);
const staleOathOwner=staleOathOccurrenceIndex.entries.filter(entry=>entry.sourceOwner.canonicalId==='army-rule-oath-of-moment');
assert.equal(staleOathOwner.length,1,'a stale Oath occurrence must not recreate the duplicate factual article');
assert.equal(staleOathOwner[0].facts.text,oath[0].facts.text,'a stale Oath occurrence must have zero factual influence on its Army-rule owner');

const amModel=inputs.armyModels.find(model=>model.book.id==='adeptus-mechanicus');
for(const id of ['recon-augury','data-psalm','halo-override']){
  const source=amModel.glossary.find(record=>record.id===id),entry=index.entries.find(record=>record.id===`army::adeptus-mechanicus::faction_term::${id}`);
  assert(source,`${id}: accepted effective Army fact must exist`);
  assert(entry,`${id}: accepted effective Army fact must be projected into V2`);
  assert.equal(entry.recordType,'FACTION_TERM',`${id}: record class`);
  assert.equal(entry.sourceOwner.canonicalId,id,`${id}: factual owner identity`);
  assert.equal(entry.facts.text,source.full,`${id}: production definition parity`);
  assert.equal(entry.facts.summary,source.summary,`${id}: production summary parity`);
  assert.deepEqual(entry.contexts.map(context=>context.effectiveBookId),['adeptus-mechanicus'],`${id}: effective context`);
  assert.equal(entry.canonicalReferences.length,1,`${id}: exact owning-rule reference`);
  assert.equal(entry.canonicalReferences[0].canonicalId,source.sectionId,`${id}: stable owning-rule identity`);
}

const dgModel=inputs.armyModels.find(model=>model.book.id==='death-guard');
const dgOwner=index.entries.find(entry=>entry.id==='army::death-guard::army_rule::army-rule-nurgles-gift');
const dgComponents=['contagion-range','afflicted','skullsquirm-blight','rattlejoint-ague','scabrous-soulrot'];
for(const id of dgComponents){
  const entry=index.entries.find(record=>record.id===`army::death-guard::army_rule_component::army-rule-nurgles-gift::${id}`);
  assert(entry,`${id}: accepted Nurgle's Gift component must be projected into V2`);
  assert.equal(entry.parent.canonicalId,'army-rule-nurgles-gift');
  assert.equal(entry.canonicalReferences[0].id,dgOwner.id);
  assert.equal(entry.sourceOwner.interface,'buildCanonicalBook(...,{projectionOnly:true})');
  if(id==='contagion-range'){
    const sourceRule=(dgModel.rules.armyRules||[]).find(record=>record.id==='army-rule-nurgles-gift')||dgModel.rules.armyRule;
    assert.deepEqual(entry.facts.blocks,[sourceRule.blocks.find(block=>block.type==='table'&&block.columns?.includes('Contagion Range')),sourceRule.blocks.find(block=>block.id==='contagion-range-cap')]);
  }else{
    const sourceRule=(dgModel.rules.armyRules||[]).find(record=>record.id==='army-rule-nurgles-gift')||dgModel.rules.armyRule;
    assert.deepEqual(entry.facts,sourceRule.subsections.find(record=>record.id===id),`${id}: child semantics must come from the accepted Army rule`);
  }
}
assert.equal(index.counts.standalone,1738,'false Support occurrences must not enter standalone browse');
assert.equal(index.counts.scopedChildren,2892,'only the five Death Guard components may extend scoped children');

const missingAmFactInputs={...inputs,armyModels:structuredClone(inputs.armyModels)};
const missingAmModel=missingAmFactInputs.armyModels.find(model=>model.book.id==='adeptus-mechanicus');
missingAmModel.glossary=missingAmModel.glossary.filter(record=>record.id!=='recon-augury');
assert.throws(()=>createGlossaryV2Index(missingAmFactInputs),/required effective Army glossary fact recon-augury is incomplete/,'a missing accepted AM glossary fact must fail closed');

const weapons=index.entries.filter(entry=>entry.recordType==='WEAPON_PROFILE');
const duplicateByLabel=new Map();for(const entry of weapons){const key=entry.label.toLocaleLowerCase('en');if(!duplicateByLabel.has(key))duplicateByLabel.set(key,[]);duplicateByLabel.get(key).push(entry);}
const scopedDuplicate=[...duplicateByLabel.values()].find(group=>new Set(group.map(entry=>entry.parent.canonicalId)).size>1);
assert(scopedDuplicate,'same-name weapon profiles must coexist as parent-scoped entries');
assert.equal(new Set(scopedDuplicate.map(entry=>entry.id)).size,scopedDuplicate.length);

const renamedInputs={...inputs,armyModels:structuredClone(inputs.armyModels)};
renamedInputs.armyModels[0].units[0].title='DISPLAY TITLE MUTATION';
const firstWeapon=renamedInputs.armyModels.flatMap(model=>model.units).flatMap(unit=>unit.weapons||[])[0];if(firstWeapon)firstWeapon.name='DISPLAY WEAPON MUTATION';
const inheritedOath=renamedInputs.armyModels.find(model=>model.book.id==='dark-angels').rules.armyRules.find(rule=>rule.id==='army-rule-oath-of-moment');inheritedOath.title='DISPLAY OATH MUTATION';
const renamed=createGlossaryV2Index(renamedInputs);
assert.deepEqual(renamed.entries.map(entry=>entry.id),index.entries.map(entry=>entry.id),'display title changes must have zero identity influence');
assert.equal(renamed.entries.filter(entry=>entry.sourceOwner.canonicalId==='army-rule-oath-of-moment').length,1,'inherited source ownership must not depend on the Oath display title');

const danglingTargetInputs={...inputs,supplemental:structuredClone(inputs.supplemental)};
danglingTargetInputs.supplemental.v2Targets['keyword-transport']='core::missing-transport-owner';
assert.throws(()=>createGlossaryV2Index(danglingTargetInputs),/resolves to absent V2 entry/,'dangling legacy presentation bindings must fail closed');

for(const entry of index.entries){
  assert(entry.sourceOwner?.canonicalId,`${entry.id}: source owner is required`);
  if(entry.parent)assert(entry.id.includes(entry.parent.canonicalId),`${entry.id}: scoped child ID must retain parent identity`);
}
const second=await buildGlossaryV2Index();
assert.equal(JSON.stringify(second),JSON.stringify(index),'Glossary V2 build must be deterministic');

console.log(`Glossary V2 foundation QA PASS (${index.counts.total} entries; ${index.counts.standalone} standalone; ${index.counts.scopedChildren} scoped children)`);
