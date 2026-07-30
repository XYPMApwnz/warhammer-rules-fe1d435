import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const text=file=>fs.readFileSync(path.join(repo,file),'utf8');
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

for(const [book,count] of [['death-guard',9],['adeptus-mechanicus',10],['tyranids',10],['tau-empire',7]]){
  const desktop=text(`books/${book}/reader.html`);
  const headings=[...desktop.matchAll(/<section class="content-group detachment"[^>]*>[\s\S]*?<h3 class="category-title detachment-title">[\s\S]*?<span class="detachment-dp">([1-9]\d*)DP<\/span><\/h3>/g)];
  assert.equal(headings.length,count,`${book}: every desktop detachment must show DP beside its title`);
  const mobileFiles=fs.readdirSync(path.join(repo,'books',book,'mobile')).filter(file=>file.endsWith('.html'));
  const mobileHeadings=mobileFiles.filter(file=>/<h3 class="category-title detachment-title">[\s\S]*?<span class="detachment-dp">[1-9]\d*DP<\/span><\/h3>/.test(text(`books/${book}/mobile/${file}`)));
  assert.equal(mobileHeadings.length,count,`${book}: every Phone Mode detachment must show DP beside its title`);
}

console.log('Presentation contracts passed: dark-only UI, DG Contents scope and detachment DP headings.');
