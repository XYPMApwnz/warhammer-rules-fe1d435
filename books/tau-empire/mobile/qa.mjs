import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
assert.equal(files.length,49,'Phone Mode must contain start, updates, army rules, 7 detachments and 39 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=\d+/);
  assert.match(html,/\.\/mobile\.css\?v=\d+/);
  assert.match(html,/rule-facts\.js\?v=\d+/);
  assert.doesNotMatch(html,/related-rules-matcher|army-related-rules/);
  assert.match(html,/glossary-return\.js\?v=\d+/);
  assert.match(html,/roster-parser\.js\?v=\d+/);
  assert.match(html,/roster-data\.js\?v=\d+/);
  assert.match(html,/book-roster-enhancements\.js\?v=\d+/);
  assert.ok((await stat(new URL(file,root))).size<100_000,`${file} must stay a focused Phone Mode page`);
  for(const[,target]of html.matchAll(/data-mobile-rule-path="books\/tau-empire\/mobile\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(files.includes(target),`${file}: missing mobile rule page ${target}`);
}
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,8,'Related Rules must contain Core plus 7 T’au detachments');
assert.doesNotMatch(related,/data-eligibility|data-keyword-grants/);
assert.match(await readFile(new URL('commander-in-coldstar-battlesuit.html',root),'utf8'),/id="relatedRules"/,'Codex datasheets expose matrix-backed Compatible Rules');
assert.ok(!files.includes('rvarna-battlesuit.html')&&!files.includes('manta.html'),'Legends and Imperial Armour routes must be absent');
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
const generatedPages=await Promise.all(files.map(file=>readFile(new URL(file,root),'utf8')));
assert.ok(generatedPages.every(html=>html.includes('id="termPopupStack"')),'all Phone routes must use the canonical popup stack');
assert.ok(generatedPages.every(html=>/phone-popup-controller\.js\?v=\d+/.test(html)),'all Phone routes must load a versioned T’au popup controller');
assert.ok(generatedPages.every(html=>html.includes('glossary/generated/glossary.en.js?v=tyranids-1')),'all Phone routes must load the canonical glossary registry');
assert.ok(generatedPages.every(html=>!html.includes('id="termTitle"')&&!html.includes('id="termSummary"')),'legacy single-dialog markup must be absent');
console.log(`T'au Empire Phone Mode QA passed: ${files.length} focused pages and 8 Related Rules sections.`);
