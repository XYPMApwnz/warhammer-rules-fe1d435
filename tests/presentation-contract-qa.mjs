import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const text=file=>fs.readFileSync(path.join(repo,file),'utf8');
const blueprint=text('docs/ARMY_BOOK_BLUEPRINT.md');
const blueprintIds=[...blueprint.matchAll(/^## ((?:PREVIEW|OPTIONAL|FULL-QA)-[0-9]{3})\b/gm)].map(match=>match[1]);
assert.equal(blueprintIds.length,12,'Blueprint must contain 12 practical requirements');
assert.equal(new Set(blueprintIds).size,12,'Blueprint requirement IDs must be unique');
assert.match(blueprint,/# PREVIEW[\s\S]*# OPTIONAL[\s\S]*# FULL QA/,'Blueprint must separate Preview, optional capabilities and Full QA');
assert.match(blueprint,/Optional capabilities do not block `PREVIEW`/,'Optional capabilities must not block Preview');
const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
  if(entry.name==='tmp'||entry.name==='node_modules'||entry.name==='.git')return[];
  const target=path.join(directory,entry.name);
  return entry.isDirectory()?walk(target):/\.(?:css|html|js|mjs)$/.test(entry.name)?[target]:[];
});

const forbiddenThemeTokens=['themeButton','DGTheme','Use light theme','Use dark theme','dg-v4-theme','data-theme="light"','[data-theme="light"]','prefers-color-scheme:light'];
for(const file of walk(repo)){
  if(path.resolve(file)===fileURLToPath(import.meta.url))continue;
  const source=fs.readFileSync(file,'utf8');
  for(const token of forbiddenThemeTokens)assert.ok(!source.includes(token),`${path.relative(repo,file)} still contains light-theme contract ${token}`);
}

const dg=text('books/death-guard/reader.html');
assert.ok(!dg.includes('data-nav-target="core-stratagems"'),'Death Guard Contents still exposes Core Stratagems');
assert.ok(dg.includes('id="core-stratagems"'),'Death Guard Core Stratagems source was removed');
assert.ok(text('books/death-guard/mobile/related-rules.inc').includes('id="core-stratagems"'),'Death Guard datasheet Related Rules lost Core Stratagems');

const library=text('index.html');
assert.ok(library.includes('.faction-group .cover{height:auto;aspect-ratio:4/5}'),'Library army covers must use one portrait frame');
assert.ok(library.includes('.faction-group .cover img{object-fit:contain}'),'Library army cover art must fit the shared frame without cropping');

const datasheetCss=text('books/shared/datasheet-system.css');
assert.match(datasheetCss,/\.shared-abilities \.term-button[\s\S]*text-decoration:none/,'Shared abilities must render as compact chips');
assert.match(datasheetCss,/\.ability h5,\.unit-card \.ability h5 \.term-button[\s\S]*text-align:left/,'Full ability titles must remain left aligned');
const unitCard=(book,id)=>{const source=text(`books/${book}/reader.html`),match=source.match(new RegExp(`<article class="unit-card[^>]*" id="${id}"[\\s\\S]*?<\\/article>`));assert.ok(match,`${book}: missing ${id}`);return match[0];};
for(const [book,id,tiers] of [['death-guard','unit-plague-marines',3],['adeptus-mechanicus','unit-kataphron-breachers',2],['tyranids','unit-termagants',2],['tau-empire','unit-broadside-battlesuits',2],['emperors-children','unit-infractors',2],['space-marines','unit-heavy-intercessor-squad',2]]){
  const card=unitCard(book,id),rows=(card.match(/class="points-row/g)||[]).length,status=card.match(/class="unit-status"[^>]*>([^<]*)</)?.[1]||'';
  assert.ok(rows>=tiers,`${book}: each point tier must have its own structured row`);
  assert.ok((status.match(/pts/gi)||[]).length<=1,`${book}: multi-tier points must not remain a concatenated status string`);
}

for(const [book,count] of [['death-guard',9],['adeptus-mechanicus',10],['tyranids',10],['tau-empire',7]]){
  const desktop=text(`books/${book}/reader.html`);
  const headings=[...desktop.matchAll(/<section class="content-group detachment"[^>]*>[\s\S]*?<h3 class="category-title detachment-title">[\s\S]*?<span class="detachment-dp">([1-9]\d*)DP<\/span><\/h3>/g)];
  assert.equal(headings.length,count,`${book}: every desktop detachment must show DP beside its title`);
  const mobileFiles=fs.readdirSync(path.join(repo,'books',book,'mobile')).filter(file=>file.endsWith('.html'));
  const mobileHeadings=mobileFiles.filter(file=>/<h3 class="category-title detachment-title">[\s\S]*?<span class="detachment-dp">[1-9]\d*DP<\/span><\/h3>/.test(text(`books/${book}/mobile/${file}`)));
  assert.equal(mobileHeadings.length,count,`${book}: every Phone Mode detachment must show DP beside its title`);
}

console.log('Presentation contracts passed: dark-only UI, DG Contents scope and detachment DP headings.');
