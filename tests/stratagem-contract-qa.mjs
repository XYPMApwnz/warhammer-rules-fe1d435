import assert from 'node:assert/strict';
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

const registry=Object.values(json('glossary/registry.en.json').terms);
const sources=[
  ['adeptus-mechanicus','books/adeptus-mechanicus/content/adeptus-mechanicus-codex-detachments.en.json','books/adeptus-mechanicus/reader.html','books/adeptus-mechanicus/mobile/related-rules.inc'],
  ['tyranids','books/tyranids/content/tyranids-codex-parity.en.json','books/tyranids/reader.html','books/tyranids/mobile/related-rules.inc']
];
for(const [bookId,sourceFile,readerFile,relatedFile] of sources){
  const source=json(sourceFile),reader=read(readerFile),related=read(relatedFile);
  for(const rule of source.detachments.flatMap(detachment=>detachment.stratagems||[]).filter(item=>item.restrictions)){
    for(const [surface,html] of [['desktop',reader],['Related Rules',related]]){
      const rendered=card(html,rule.id);
      assert.equal(count(rendered,'data-source-field="restrictions"'),1,`${bookId}/${rule.id}: ${surface} must render RESTRICTIONS exactly once`);
      assert.ok(clean(rendered).includes(clean(rule.restrictions)),`${bookId}/${rule.id}: ${surface} changed RESTRICTIONS`);
    }
    const mobileFiles=fs.readdirSync(path.join(root,'books',bookId,'mobile')).filter(file=>file.endsWith('.html'));
    const mobile=mobileFiles.map(file=>read(path.join('books',bookId,'mobile',file))).find(html=>html.includes(`data-rule-id="${rule.id}"`));
    assert.ok(mobile,`${bookId}/${rule.id}: dedicated Phone Mode card is absent`);
    assert.equal(count(card(mobile,rule.id),'data-source-field="restrictions"'),1,`${bookId}/${rule.id}: Phone Mode must render RESTRICTIONS exactly once`);
    const term=registry.find(item=>item.scope===bookId&&item.title?.en.toLowerCase()===rule.title.toLowerCase());
    assert.ok(term,`${bookId}/${rule.id}: glossary term is absent`);
    assert.equal(count(clean(term.definition.en),clean(rule.restrictions)),1,`${bookId}/${rule.id}: glossary must contain RESTRICTIONS exactly once`);
  }
}

const dgReader=read('books/death-guard/reader.html'),dgRelated=read('books/death-guard/mobile/related-rules.inc');
for(const id of ['core-stratagem-insane-bravery','core-stratagem-rapid-ingress','stratagem-persistent-pests']){
  assert.equal(count(card(dgReader,id),'data-source-field="restrictions"'),1,`death-guard/${id}: desktop restriction contract`);
  assert.equal(count(card(dgRelated,id),'data-source-field="restrictions"'),1,`death-guard/${id}: Related Rules restriction contract`);
}

for(const file of [
  'books/shared/army-related-rules.js',
  'books/death-guard/scripts/app.js',
  'books/death-guard/mobile/mobile.js',
  'books/adeptus-mechanicus/scripts/related-rules.js',
  'books/adeptus-mechanicus/mobile/mobile.js',
  'books/tyranids/mobile/mobile.js'
]){
  const source=read(file);
  assert.match(source,/Conditionally compatible/);
  assert.match(source,/Check the full card conditions/);
  assert.doesNotMatch(source,/Check WHEN and TARGET/);
  assert.doesNotMatch(source,/result\.reasons/);
}

const css=read('books/death-guard/styles/content.css');
assert.match(css,/\.stratagem-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
assert.match(css,/full-related-content[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
assert.match(css,/@media\s*\(max-width:\s*900px\)[^{]*\{[\s\S]*grid-template-columns:\s*1fr/);
for(const bookId of ['death-guard','adeptus-mechanicus','tyranids']){
  const mobileCss=read(`books/${bookId}/mobile/mobile.css`);
  assert.match(mobileCss,/grid-template-columns:\s*1fr/,`${bookId}: Phone Mode must use one Stratagem column`);
  assert.match(mobileCss,/@media\s*\(min-width:\s*1000px\)\s*and\s*\(orientation:\s*landscape\)[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,`${bookId}: landscape tablet must use two Stratagem columns`);
}

assert.match(read('books/shared/popup-content.js'),/term\.kind==='stratagem'\?term\.definition:term\.summary/);
assert.match(read('glossary/tools/build-glossary.mjs'),/kind:term\.kind/);
for(const buildFile of [
  'books/death-guard/mobile/build.mjs',
  'books/adeptus-mechanicus/mobile/build.mjs',
  'books/tyranids/mobile/build.mjs'
])assert.match(read(buildFile),/term\.kind\s*===?\s*'stratagem'[\s\S]{0,100}term\.definition/);
assert.match(dgReader,/data-term="core-rule-15-04-insane-bravery"/);
assert.match(read('books/adeptus-mechanicus/reader.html'),/data-term="stratagem-priority-reclamation"/);
assert.match(read('books/shared/army-related-rules.js'),/Compatible Stratagems & Enhancements/);

console.log('Stratagem contract QA passed: restrictions, tri-state presentation and responsive two-column grids.');
