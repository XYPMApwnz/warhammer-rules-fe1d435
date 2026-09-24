import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const index=JSON.parse(read('glossary/v2/generated/index.en.json'));
const scope={window:{}};
vm.runInNewContext(read('glossary/v2/generated/index.en.js'),scope);
vm.runInNewContext(read('glossary/v2/runtime/glossary-v2-runtime.js'),scope);
const api=scope.window.WH40K_GLOSSARY;

assert.equal(index.counts.total,4633);
assert.equal(index.counts.standalone,1741);
assert.equal(index.counts.scopedChildren,2892);
assert.equal(api.entries().length,4633);
assert.equal(api.standaloneEntries().length,1741);
assert.equal(api.counts.scopedChildren,2892);

const detachments=api.standaloneEntries().filter(entry=>entry.recordType==='DETACHMENT');
assert.equal(detachments.length,102,'standalone browse must retain exactly 102 Detachments');
assert.equal(new Set(detachments.map(entry=>entry.id)).size,102,'standalone Detachment articles must not duplicate');
for(const detachment of detachments){
  assert(detachment.definition.en.trim(),`${detachment.id}: Detachment definition`);
  assert.notEqual(detachment.definition.en.trim().toLocaleLowerCase(),detachment.label.trim().toLocaleLowerCase(),`${detachment.id}: Detachment definition must not echo its title`);
}
const mortarionsHammerId='army::death-guard::detachment::detachment-mortarions-hammer';
const mortarionsHammer=api.get(mortarionsHammerId,{bookId:'death-guard'});
assert.equal(mortarionsHammer.id,mortarionsHammerId);
assert.match(mortarionsHammer.definition.en,/Force Disposition: Purge the Foe/);
assert.match(mortarionsHammer.definition.en,/Detachment Points: 2DP/);
assert.match(mortarionsHammer.definition.en,/Miasmic Bombardment/);
assert.match(mortarionsHammer.definition.en,/Incursion \| 1[\s\S]*Strike Force \| 2[\s\S]*Onslaught \| 3/);
assert.equal(api.forBook('death-guard')[mortarionsHammerId].id,mortarionsHammer.id,'Mortarion’s Hammer popup/viewer identity parity');

const dgOwner='army-rule-nurgles-gift';
for(const id of ['contagion-range','afflicted','skullsquirm-blight','rattlejoint-ague','scabrous-soulrot']){
  const term=api.get(id,{bookId:'death-guard'});
  assert(term,`${id}: Death Guard scoped term must resolve`);
  assert.equal(term.recordType,'ARMY_RULE_COMPONENT');
  assert.equal(term.parent.canonicalId,dgOwner);
  assert.equal(term.canonicalReferences[0].canonicalId,dgOwner);
}

const deepStrike=api.get('core-deep-strike',{bookId:'space-marines'});
assert.equal(deepStrike.id,'core::core-deep-strike');
assert.equal(deepStrike.domain,'CORE');
assert.match(deepStrike.definition.en,/ingress move/i);
assert.equal(api.get('transport',{bookId:'core-rules'}).id,'core::core-rule-18-01-transport-capacity');
assert.equal(api.get('power fist'),null,'an ambiguous scoped weapon label must fail closed globally');

const local=api.get('army::space-marines::ability::space-marines-ability-press-the-attack');
assert.equal(local.sourceOwner.bookId,'space-marines');
assert.match(local.definition.en,/SUSTAINED HITS 1/);
const smTerms=api.forBook('space-marines');
assert.equal(smTerms[deepStrike.id].id,deepStrike.id);
assert.equal(smTerms[local.id].id,local.id);

const oathCompatibilityId='space-marines-army-rule-oath-of-moment';
const oathId='army::space-marines::army_rule::army-rule-oath-of-moment';
for(const bookId of ['space-marines','dark-angels','blood-angels']){
  const oath=api.get(oathCompatibilityId,{bookId});
  assert.equal(oath?.id,oathId,`${bookId}: the accepted Oath compatibility identity must resolve to its single V2 owner`);
  assert.equal(api.forBook(bookId)[oathId]?.id,oathId,`${bookId}: Oath must expose the same popup/viewer identity`);
}
assert.equal(index.entries.filter(entry=>entry.sourceOwner?.canonicalId==='army-rule-oath-of-moment').length,1,'Oath must remain one factual V2 article');

const structuredAmControls=[
  {
    id:'army::adeptus-mechanicus::army_rule::army-rule-doctrina',
    compatibilityId:'army-rule-doctrina'
  },
  {
    id:'army::adeptus-mechanicus::ability::datasheet-canticles-of-the-omnissiah',
    compatibilityId:'datasheet-canticles-of-the-omnissiah'
  }
];
for(const {id,compatibilityId} of structuredAmControls){
  const source=index.entries.find(entry=>entry.id===id),article=api.get(id),popup=api.forBook('adeptus-mechanicus')[compatibilityId];
  assert(source,`${id}: accepted V2 source projection`);
  assert(article?.definition.en.trim(),`${id}: full article definition`);
  assert.equal(popup?.id,id,`${id}: popup identity parity`);
  assert.equal(popup.definition,article.definition.en,`${id}: popup/article definition parity`);
  if(source.facts.openingText)assert(article.definition.en.includes(source.facts.openingText),`${id}: opening text preserved`);
  for(const option of source.facts.options){
    assert(article.definition.en.includes(option.label||option.title),`${id}: option heading ${option.id}`);
    if(option.subtitle)assert(article.definition.en.includes(option.subtitle),`${id}: option subtitle ${option.id}`);
    if(option.text)assert(article.definition.en.includes(option.text),`${id}: option text ${option.id}`);
    for(const effect of option.effects||[])assert(article.definition.en.includes(effect),`${id}: option effect ${option.id}`);
  }
}
const ordinaryAm=api.get('army::adeptus-mechanicus::ability::datasheet-aerial-deployment');
assert.equal(ordinaryAm.definition.en,index.entries.find(entry=>entry.id===ordinaryAm.id).facts.text,'ordinary AM definitions remain unchanged');
assert.equal(deepStrike.definition.en,index.entries.find(entry=>entry.id===deepStrike.id).facts.semanticContent,'non-AM definitions remain unchanged');
for(const [termId,bookId] of [
  ['datasheet-broad-spectrum-data-tether','adeptus-mechanicus'],
  ['tau-empire-ability-battlesuit-support-system','tau-empire'],
  ['tau-empire-ability-weapon-support-system','tau-empire']
])assert.equal(api.get(termId,{bookId}),null,`${termId}: ambiguous standalone/scoped compatibility identity must remain fail-closed`);

const supported=['death-guard','adeptus-mechanicus','tyranids','tau-empire','emperors-children','chaos-space-marines','space-marines','dark-angels','blood-angels'];
for(const book of supported){
  const html=read(`books/${book}/reader.html`);
  assert.match(html,/glossary\/v2\/generated\/index\.en\.js\?v=1/);
  assert.match(html,/glossary\/v2\/runtime\/glossary-v2-runtime\.js\?v=1/);
  assert.doesNotMatch(html,/glossary\/generated\/glossary\.en\.js/);
}
for(const file of fs.readdirSync(path.join(root,'books/core-rules/reader')).filter(file=>file.endsWith('.html'))){
  const html=read(`books/core-rules/reader/${file}`);
  assert.match(html,/glossary\/v2\/generated\/index\.en\.js\?v=1/);
  assert.match(html,/glossary\/v2\/runtime\/glossary-v2-runtime\.js\?v=1/);
}

const viewer=read('glossary/viewer.js'),viewerHtml=read('glossary/index.html');
assert.match(viewer,/const terms=api\.standaloneEntries\(\)/,'main browse must use standalone entries');
assert.match(viewer,/source=query\?allTerms:terms/,'search must include scoped children');
assert.match(viewerHtml,/v2\/generated\/index\.en\.js/);
assert.match(viewerHtml,/v2\/runtime\/glossary-v2-runtime\.js/);
assert.doesNotMatch(viewerHtml,/generated\/glossary\.en\.js/);

const factualConsumers=[
  'glossary/viewer.js','books/shared/army-book-app.js','books/shared/glossary-autolink.js','books/core-rules/reader/app.js'
].map(read).join('\n');
assert.doesNotMatch(factualConsumers,/WH40K_GLOSSARY_REGISTRY|glossary\/generated\/glossary\.en\.js/);
assert.doesNotMatch(read('books/core-rules/reader/app.js'),/dataset\.term(?:Definition|Summary)/);

console.log('Glossary V2 production contract QA passed: 1741 standalone browse entries, 2892 scoped searchable children, explicit/context-safe identity resolution.');
