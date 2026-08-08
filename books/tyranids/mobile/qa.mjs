import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
const runtime=await readFile(new URL('mobile.js',root),'utf8');
assert.equal(files.length,70,'Phone Mode must contain start, updates, army rules, 10 detachments and 57 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=\d+/);
  assert.match(html,/\.\/mobile\.css\?v=\d+/);
  assert.match(html,/rule-facts\.js\?v=\d+/);
  assert.doesNotMatch(html,/related-rules-matcher|army-related-rules/);
  assert.match(html,/glossary-return\.js\?v=\d+/);
  assert.match(html,/phone-popup-controller\.js\?v=\d+/);
  assert.match(html,/id="termPopupStack"/);
  assert.ok((await stat(new URL(file,root))).size<100_000,`${file} must stay a focused Phone Mode page`);
  for(const[,path]of html.matchAll(/data-mobile-rule-path="books\/tyranids\/mobile\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(files.includes(path),`${file}: missing mobile rule page ${path}`);
}
assert.ok(runtime.includes("if(rosterMode&&!roster){location.replace('../../../roster-guides/index.html');return;}"),'Invalid Tyranids Phone roster context must replace the route and terminate initialization');
assert.ok(runtime.includes("match[1].toLowerCase()==='xenos'"),'Tyranids Phone must accept only the correct optional Xenos parent prefix');
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,11,'Related Rules must contain Core plus 10 Tyranids detachments');
assert.doesNotMatch(related,/data-eligibility=|data-keyword-grants=/);
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
console.log(`Tyranids Phone Mode QA passed: ${files.length} focused pages and 11 Related Rules sections.`);
