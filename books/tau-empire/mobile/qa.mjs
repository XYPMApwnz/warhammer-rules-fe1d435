import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
assert.equal(files.length,73,'Phone Mode must contain start, updates, army rules, 7 detachments and 63 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=2/);
  assert.match(html,/\.\/mobile\.css\?v=1/);
  assert.match(html,/related-rules-matcher\.js\?v=3/);
  assert.match(html,/army-related-rules\.js\?v=7/);
  assert.match(html,/glossary-return\.js\?v=2/);
  assert.match(html,/roster-parser\.js\?v=2/);
  assert.match(html,/roster-data\.js\?v=1/);
  assert.match(html,/book-roster-enhancements\.js\?v=1/);
  assert.ok((await stat(new URL(file,root))).size<100_000,`${file} must stay a focused Phone Mode page`);
  for(const[,target]of html.matchAll(/data-mobile-rule-path="books\/tau-empire\/mobile\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(files.includes(target),`${file}: missing mobile rule page ${target}`);
}
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,8,'Related Rules must contain Core plus 7 T’au detachments');
assert.match(related,/data-eligibility=/);
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
console.log(`T'au Empire Phone Mode QA passed: ${files.length} focused pages and 8 Related Rules sections.`);
