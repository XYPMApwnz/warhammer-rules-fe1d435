import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const viewer=read('glossary/viewer.js');
const css=read('glossary/viewer-progressive.css');
const index=read('glossary/index.html');
const content=read('books/death-guard/styles/content.css');
const sw=read('service-worker.js');
const registry=JSON.parse(read('glossary/registry.en.json')).terms;
const publicBooks=['death-guard','adeptus-mechanicus','tyranids'];

assert.match(viewer,/const titleCounts=new Map\(\)/,'duplicate titles must be detected');
assert.match(viewer,/className='term-qualifier'/,'duplicate titles must display a source qualifier');
const duplicateTitles=new Map();
for(const term of Object.values(registry)){const title=term.title?.en?.toLocaleLowerCase();if(title)duplicateTitles.set(title,(duplicateTitles.get(title)||0)+1);}
assert.ok([...duplicateTitles.values()].some(count=>count>1),'fixture: catalogue must contain duplicate titles');

assert.match(viewer,/const titleMatches=ranked\.filter\(item=>item\.score<5\)/,'title and alias matches must be separated from body matches');
assert.match(viewer,/query&&titleMatches\.length\?titleMatches:ranked/,'body matches must be fallback results only');
assert.match(viewer,/technicalAlias=.*unit\|weapon\|ability/,'technical IDs must be recognised');
assert.match(viewer,/searchAliases=aliases\.filter/,'technical IDs must not flood prefix search results');

assert.match(viewer,/const repeatsDefinition=.*full\.startsWith\(quick\)/,'article duplicate detection must require a normalized prefix');
assert.match(viewer,/!repeatsDefinition\(summaryText,definitionText\)/,'full articles must hide repeated Quick Rule blocks');
assert.match(viewer,/popupSummary\.textContent=term\.summary\?\.en\|\|term\.definition\?\.en/,'popups must retain Quick Rule summaries');
const normalized=value=>String(value).toLocaleLowerCase().replace(/\s+/g,' ').trim();
const values=Object.values(registry);
assert.ok(values.some(term=>term.summary?.en&&term.definition?.en&&normalized(term.definition.en).startsWith(normalized(term.summary.en))),'fixture: registry must contain a repeated summary prefix');
assert.ok(values.some(term=>term.summary?.en&&term.definition?.en&&!normalized(term.definition.en).startsWith(normalized(term.summary.en))),'fixture: registry must contain an independent summary');

assert.match(css,/\.filters\{[^}]*flex-wrap:wrap[^}]*overflow:visible/,'filter chips must wrap instead of clipping');
assert.match(css,/@media\(min-width:761px\) and \(max-width:1366px\)/,'iPad layout must have an explicit contract');
assert.match(css,/grid-template-columns:minmax\(320px,36%\) minmax\(0,1fr\)/,'iPad catalogue must remain readable');
assert.match(index,/viewer-progressive\.css\?v=3/);
assert.match(index,/viewer\.js\?v=11/);
assert.ok(sw.includes('"./glossary/viewer-progressive.css?v=3"')&&sw.includes('"./glossary/viewer.js?v=11"'),'service worker must precache current Glossary UI');

assert.match(content,/\.stratagem-grid \{ display:grid; grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/,'desktop and landscape tablet Stratagem sections must use two columns');
assert.match(content,/@media \(max-width: 900px\) \{[\s\S]*?\.stratagem-grid \{ grid-template-columns:1fr; \}/,'phone and narrow layouts must use one Stratagem column');
for(const book of publicBooks)assert.ok(read(`books/${book}/reader.html`).includes('content.css?v=37'),`${book} must use the shared Stratagem layout release`);
assert.ok(read('books/death-guard/reader.html').includes('class="detachment-content stratagem-grid"'),'Death Guard must use the shared Stratagem grid contract');
assert.ok(read('books/adeptus-mechanicus/reader.html').includes('class="stratagem-grid"'),'Mechanicus must use the shared Stratagem grid contract');
assert.ok(read('books/tyranids/reader.html').includes('class="detachment-grid stratagem-grid"'),'Tyranids must use the shared Stratagem grid contract');

console.log('Glossary viewer and shared Stratagem layout QA passed.');
