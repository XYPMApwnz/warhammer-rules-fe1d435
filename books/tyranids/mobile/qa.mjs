import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
assert.equal(files.length,70,'Phone Mode must contain start, updates, army rules, 10 detachments and 57 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=2/);
  assert.match(html,/\.\/mobile\.css\?v=1/);
  assert.match(html,/related-rules-matcher\.js\?v=3/);
  assert.match(html,/army-related-rules\.js\?v=6/);
  assert.match(html,/glossary-return\.js\?v=2/);
  assert.ok((await stat(new URL(file,root))).size<100_000,`${file} must stay a focused Phone Mode page`);
  for(const[,path]of html.matchAll(/data-mobile-rule-path="books\/tyranids\/mobile\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(files.includes(path),`${file}: missing mobile rule page ${path}`);
}
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,11,'Related Rules must contain Core plus 10 Tyranids detachments');
assert.match(related,/data-eligibility=/);
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
console.log(`Tyranids Phone Mode QA passed: ${files.length} focused pages and 11 Related Rules sections.`);
