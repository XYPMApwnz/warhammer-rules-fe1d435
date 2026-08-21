import assert from 'node:assert/strict';
import ruleFacts from '../books/shared/rule-facts.js';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>fs.readFileSync(path.join(root,relative),'utf8');
const json=relative=>JSON.parse(read(relative));
const clean=value=>String(value||'').replace(/<[^>]+>/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const count=(text,value)=>text.split(value).length-1;
const card=(html,id)=>{
  const start=html.search(new RegExp(`<article\\b[^>]*(?:data-rule-id|id)="${id}"`));
  assert.notEqual(start,-1,`${id}: card is absent`);
  const end=html.indexOf('</article>',start);
  assert.notEqual(end,-1,`${id}: card is not closed`);
  return html.slice(start,end+10);
};
const cardCount=(html,id)=>(html.match(new RegExp(`<article\\b[^>]*(?:data-rule-id|id)="${id}"`,'g'))||[]).length;
const migratedBooks=new Map([['death-guard',48],['adeptus-mechanicus',47],['tau-empire',49],['tyranids',63],['emperors-children',36]]);
const migratedStubs=new Map([...migratedBooks].map(([bookId,expected])=>{
  const directory=path.join(root,'books',bookId,'mobile');
  const stubs=fs.readdirSync(directory).filter(file=>file.endsWith('.html')).map(file=>[file,read(path.join('books',bookId,'mobile',file))]);
  assert.equal(stubs.length,expected,`${bookId}: legacy compatibility route inventory changed`);
  for(const [file,html] of stubs){
    assert.match(html,/data-canonical-reader="\.\.\/reader\.html"/,`${bookId}/${file}: canonical reader target is absent`);
    assert.match(html,/mobile-route-redirect\.js\?v=1/,`${bookId}/${file}: shared redirect runtime is absent`);
    assert.doesNotMatch(html,/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/,`${bookId}/${file}: compatibility stub contains duplicated rule content`);
  }
  return[bookId,stubs];
}));

const registry=Object.values(json('glossary/registry.en.json').terms);
const sources=[
  ['adeptus-mechanicus','books/adeptus-mechanicus/content/adeptus-mechanicus-codex-detachments.en.json','books/adeptus-mechanicus/reader.html','books/adeptus-mechanicus/mobile/related-rules.inc'],
  ['tyranids','books/tyranids/content/tyranids-codex-parity.en.json','books/tyranids/reader.html','books/tyranids/mobile/related-rules.inc'],
  ['tau-empire','books/tau-empire/content/tau-empire-codex-parity.en.json','books/tau-empire/reader.html','books/tau-empire/mobile/related-rules.inc'],
  ['emperors-children','books/emperors-children/content/emperors-children-codex-parity.en.json','books/emperors-children/reader.html','books/emperors-children/mobile/related-rules.inc']
];
for(const [bookId,sourceFile,readerFile,relatedFile] of sources){
  const source=json(sourceFile),reader=read(readerFile),related=read(relatedFile);
  for(const rule of source.detachments.flatMap(detachment=>detachment.stratagems||[]).filter(item=>item.restrictions)){
    for(const [surface,html] of [['desktop',reader],['Related Rules',related]]){
      const rendered=card(html,rule.id);
      assert.equal(count(rendered,'data-source-field="restrictions"'),1,`${bookId}/${rule.id}: ${surface} must render RESTRICTIONS exactly once`);
      assert.ok(clean(rendered).includes(clean(rule.restrictions)),`${bookId}/${rule.id}: ${surface} changed RESTRICTIONS`);
    }
    if(migratedBooks.has(bookId)){
      assert.equal(cardCount(reader,rule.id),1,`${bookId}/${rule.id}: responsive reader must expose one canonical Phone Mode card`);
      assert.equal(count(card(reader,rule.id),'data-source-field="restrictions"'),1,`${bookId}/${rule.id}: responsive Phone Mode must render RESTRICTIONS exactly once`);
    }else{
      const mobileFiles=fs.readdirSync(path.join(root,'books',bookId,'mobile')).filter(file=>file.endsWith('.html'));
      const mobile=mobileFiles.map(file=>read(path.join('books',bookId,'mobile',file))).find(html=>html.includes(`data-rule-id="${rule.id}"`));
      assert.ok(mobile,`${bookId}/${rule.id}: dedicated Phone Mode card is absent`);
      assert.equal(count(card(mobile,rule.id),'data-source-field="restrictions"'),1,`${bookId}/${rule.id}: Phone Mode must render RESTRICTIONS exactly once`);
    }
    const term=registry.find(item=>item.scope===bookId&&item.title?.en.toLowerCase()===rule.title.toLowerCase());
    assert.ok(term,`${bookId}/${rule.id}: glossary term is absent`);
    assert.equal(count(clean(term.definition.en),clean(rule.restrictions)),1,`${bookId}/${rule.id}: glossary must contain RESTRICTIONS exactly once`);
  }
}

const dgSource=json('books/death-guard/content/death-guard-rules.en.json');
const dgReader=read('books/death-guard/reader.html'),dgRelated=read('books/death-guard/mobile/related-rules.inc');
const dgDetachments=dgSource.sections.filter(section=>section.id.startsWith('detachment-'));
const dgStratagems=dgDetachments.flatMap(detachment=>
  (detachment.subsections||[]).flatMap(subsection=>subsection.blocks||[])
).filter(block=>block.id?.startsWith('stratagem-'));
assert.equal(dgDetachments.length,9,'death-guard: published Detachment inventory changed');
assert.equal(dgStratagems.length,45,'death-guard: published Stratagem inventory must contain 45 cards');
assert.equal(new Set(dgStratagems.map(rule=>rule.id)).size,dgStratagems.length,'death-guard: duplicate Stratagem source IDs');
assert.deepEqual(dgStratagems.filter(rule=>(rule.lines||[]).some(line=>/^RESTRICTIONS?:/i.test(line))).map(rule=>rule.id),[
  'stratagem-persistent-pests'
],'death-guard: restriction-bearing Stratagem inventory changed');

for(const rule of dgStratagems){
  const restrictionLine=(rule.lines||[]).find(line=>/^RESTRICTIONS?:/i.test(line));
  const restriction=restrictionLine?.replace(/^RESTRICTIONS?:\s*/i,'')||'';
  const expectedCount=restriction?1:0;
  for(const [surface,html] of [['desktop',dgReader],['Related Rules',dgRelated]]){
    assert.equal(cardCount(html,rule.id),1,`death-guard/${rule.id}: ${surface} must contain exactly one card`);
    const rendered=card(html,rule.id);
    assert.equal(count(rendered,'data-source-field="restrictions"'),expectedCount,`death-guard/${rule.id}: ${surface} RESTRICTIONS cardinality`);
    if(restriction)assert.equal(count(clean(rendered),clean(restriction)),1,`death-guard/${rule.id}: ${surface} changed or duplicated RESTRICTIONS`);
  }
  assert.equal(cardCount(dgReader,rule.id),1,`death-guard/${rule.id}: responsive Phone Mode must use the one canonical reader card`);
  assert.equal(migratedStubs.get('death-guard').filter(([,html])=>cardCount(html,rule.id)).length,0,`death-guard/${rule.id}: compatibility stubs duplicated the card`);
  const mobileCard=card(dgReader,rule.id);
  assert.equal(count(mobileCard,'data-source-field="restrictions"'),expectedCount,`death-guard/${rule.id}: Phone Mode RESTRICTIONS cardinality`);
  if(restriction)assert.equal(count(clean(mobileCard),clean(restriction)),1,`death-guard/${rule.id}: Phone Mode changed or duplicated RESTRICTIONS`);

  const sourceTerms=dgSource.glossary.filter(term=>term.sectionId===rule.id);
  assert.equal(sourceTerms.length,1,`death-guard/${rule.id}: popup/Full Entry must have exactly one source term`);
  const sourceTerm=sourceTerms[0];
  assert.equal(sourceTerm.kind,'stratagem',`death-guard/${rule.id}: popup term kind`);
  for(const rendered of [card(dgReader,rule.id),card(dgRelated,rule.id),mobileCard]){
    assert.equal(count(rendered,`data-term="${sourceTerm.id}"`),1,`death-guard/${rule.id}: card must link its popup term exactly once`);
  }
  assert.equal((sourceTerm.full.match(/\bRESTRICTIONS?:/gi)||[]).length,expectedCount,`death-guard/${rule.id}: popup/Full Entry RESTRICTIONS cardinality`);
  if(restriction)assert.equal(count(clean(sourceTerm.full),clean(restriction)),1,`death-guard/${rule.id}: popup/Full Entry changed or duplicated RESTRICTIONS`);
  const registryTerms=registry.filter(term=>term.scope==='death-guard'&&term.kind==='stratagem'&&term.title?.en.toLowerCase()===sourceTerm.title.toLowerCase());
  assert.equal(registryTerms.length,1,`death-guard/${rule.id}: Mega Glossary must have exactly one term`);
  const registryTerm=registryTerms[0];
  assert.equal((registryTerm.definition.en.match(/\bRESTRICTIONS?:/gi)||[]).length,expectedCount,`death-guard/${rule.id}: Mega Glossary RESTRICTIONS cardinality`);
  if(restriction)assert.equal(count(clean(registryTerm.definition.en),clean(restriction)),1,`death-guard/${rule.id}: Mega Glossary changed or duplicated RESTRICTIONS`);
}

for(const id of ['core-stratagem-insane-bravery','core-stratagem-rapid-ingress']){
  assert.equal(count(card(dgReader,id),'data-source-field="restrictions"'),1,`death-guard/${id}: desktop restriction contract`);
  assert.equal(count(card(dgRelated,id),'data-source-field="restrictions"'),1,`death-guard/${id}: Related Rules restriction contract`);
}

for(const file of [
  'books/shared/army-related-rules.js',
  'books/adeptus-mechanicus/scripts/app.js',
  'books/tyranids/scripts/app.js',
  'books/tau-empire/scripts/app.js'
]){
  const source=read(file);
  assert.match(source,/Conditionally compatible/);
  assert.match(source,/Check the full card conditions/);
  assert.doesNotMatch(source,/Check WHEN and TARGET/);
  assert.doesNotMatch(source,/result\.reasons/);
}
for(const file of ['books/death-guard/scripts/app.js']){
  const source=read(file);
  assert.match(source,/Conditionally compatible/);
  assert.match(source,/compatibleRuntime\.conditionLabels/);
  assert.doesNotMatch(source,/result\.reasons/);
}
const dgReviewRuntime=read('books/death-guard/scripts/compatible-stratagems-runtime.mjs');
for(const label of ['Requires an Attached Unit','Requires a second Character','Requires Warlord selection','Requires Detachment selection'])assert.ok(dgReviewRuntime.includes(label));

for(const file of [
  'books/tyranids/scripts/app.js',
  'books/tau-empire/scripts/app.js'
]){
  const source=read(file);
  for(const label of ['Battle Tactic Stratagem','Strategic Ploy Stratagem','Wargear Stratagem','Epic Deed Stratagem','Core Stratagem','Type unverified'])assert.ok(source.includes(label),`${file}: canonical visible type label ${label} is absent`);
  assert.match(source,/labels=\[\.\.\.card\.querySelectorAll\('\.stratagem-type'\)\]/,`${file}: decorator must inventory existing labels`);
  assert.match(source,/labels\.forEach\(node=>node\.remove\(\)\)/,`${file}: decorator must remove duplicate labels`);
  assert.match(source,/host\?\.append\(label\)/,`${file}: decorator must place the label in the card header`);
  assert.doesNotMatch(source,/dataset\.stratagemType\|\|''\)\)return/,`${file}: valid metadata must not skip visible-label decoration`);
}

const css=read('books/death-guard/styles/content.css');
const ecPackStratagems=json('books/emperors-children/content/emperors-children-faction-pack.en.json').detachments.flatMap(detachment=>detachment.stratagems);
const ecCodexStratagems=json('books/emperors-children/content/emperors-children-codex-parity.en.json').detachments.flatMap(detachment=>detachment.stratagems);
const ecReader=read('books/emperors-children/reader.html');
assert.equal(ecCodexStratagems.length,36);
assert.equal(ecCodexStratagems.every(item=>item.typeStatus==='confirmed'&&['battle-tactic','strategic-ploy','wargear','epic-deed'].includes(item.canonicalType)),true);
assert.equal(ecPackStratagems.length,15);
assert.equal(ecPackStratagems.every(item=>item.canonicalType===null&&item.typeStatus==='source-untyped'&&item.sourceLabel.endsWith(' Stratagem')),true);
assert.equal([...ecPackStratagems,...ecCodexStratagems].filter(item=>item.typeStatus==='unexplained-unknown').length,0);
for(const item of ecPackStratagems){const rendered=card(ecReader,item.id);assert.match(rendered,/data-stratagem-type="source-untyped"/);assert.ok(rendered.includes(`<span class="stratagem-type">${item.sourceLabel}</span>`),`${item.id}: source label must remain visible`);}
assert.match(css,/\.stratagem\{--strat-color:#756f61/,'source-untyped cards must retain the general fallback color');
for(const color of ['#247090','#507f72','#a77b32','#a83338'])assert.notEqual(color,'#756f61');
assert.match(css,/\.stratagem>\.compatibility-status\{grid-column:2\}/,'conditional compatibility status must clear the Stratagem CP rail');
const readableStratagemGrid=/grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(min\(100%,\s*360px\),\s*1fr\)\)/;
assert.match(css,new RegExp(`\\.stratagem-grid\\s*\\{[^}]*${readableStratagemGrid.source}`),'Stratagem grids must preserve the canonical readable minimum card width');
assert.match(css,/full-related-content[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(min\(100%,\s*360px\),\s*1fr\)\)/,'Compatible Stratagem grids must preserve two columns and the readable minimum card width');
assert.match(css,/:is\(\[data-related-kind="stratagems"\],\[data-related-kind="enhancements"\]\)>section\s*\{[^}]*grid-column:\s*1\/-1/,'nested Related Rules sections must span the outer grid instead of shrinking cards to one quarter');
assert.match(css,/@media\s*\(max-width:\s*900px\)[^{]*\{[\s\S]*grid-template-columns:\s*1fr/);
for(const bookId of migratedBooks.keys()){
  const reader=read(`books/${bookId}/reader.html`);
  const responsiveContentCss=bookId==='death-guard'?/\.\/styles\/content\.css\?v=\d+/:/\.\.\/death-guard\/styles\/content\.css\?v=\d+/;
  assert.match(reader,responsiveContentCss,`${bookId}: responsive reader does not load the canonical Stratagem layout`);
  assert.doesNotMatch(reader,/mobile\/mobile\.css|mobile\/mobile\.js|mobile\/phone-popup-controller\.js/,`${bookId}: canonical reader still loads the obsolete Phone content runtime`);
}

assert.match(read('books/shared/popup-content.js'),/term\.kind==='stratagem'\?term\.definition:term\.summary/);
assert.match(read('glossary/tools/build-glossary.mjs'),/kind:term\.kind/);
for(const buildFile of ['books/tyranids/mobile/build.mjs','books/emperors-children/mobile/build.mjs','books/tau-empire/mobile/build.mjs'])assert.match(read(buildFile),/data-canonical-reader="\.\.\/reader\.html"/);
assert.match(dgReader,/data-term="core-rule-15-04-insane-bravery"/);
assert.match(read('books/adeptus-mechanicus/reader.html'),/data-term="stratagem-priority-reclamation"/);
assert.match(read('books/shared/army-related-rules.js'),/Compatible Stratagems & Enhancements/);
assert.equal(ruleFacts.staticCompatible({state:'match'}),true);
assert.equal(ruleFacts.staticCompatible({state:'conditional',condition:'battle-state-unknown'}),true);
for(const condition of ['attachment-unknown','second-character-unknown','second-unit-unknown','warlord-unknown','detachment-not-selected'])assert.equal(ruleFacts.staticCompatible({state:'conditional',condition}),false,condition);
assert.equal(ruleFacts.staticCompatible({state:'conditional',matchedRoleIds:['target'],reasons:['in-range']}),true);
assert.equal(ruleFacts.staticCompatible({state:'conditional',matchedRoleIds:[],reasons:[]}),false);

console.log('Stratagem contract QA passed: restrictions, tri-state presentation and responsive two-column grids.');
