import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
const app=await readFile(new URL('../scripts/app.js',root),'utf8');
assert.equal(files.length,49,'legacy routes must contain start, updates, army rules, 7 detachments and 39 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/data-canonical-reader="\.\.\/reader\.html"/,`${file}: canonical reader target is absent`);
  assert.match(html,/data-canonical-target="[^"]+"/,`${file}: canonical target is absent`);
  assert.match(html,/mobile-route-redirect\.js\?v=1/,`${file}: shared redirect runtime is absent`);
  assert.doesNotMatch(html,/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/,`${file}: compatibility stub contains duplicated content`);
  assert.doesNotMatch(html,/mobile\.js|mobile\.css|phone-popup-controller|book-roster-enhancements/,`${file}: obsolete Phone runtime is present`);
  assert.ok((await stat(new URL(file,root))).size<2_000,`${file} must stay a content-free compatibility stub`);
}
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,8,'Related Rules must contain Core plus 7 T’au detachments');
assert.doesNotMatch(related,/data-eligibility|data-keyword-grants/);
assert.match(app,/shared\/compatible-rules-matrix\.mjs\?v=\d+/,'canonical reader runtime must use the shared matrix-backed Compatible Rules source');
assert.match(app,/WHArmyBook\.install/,'canonical reader runtime must use the shared Army Book contract');
assert.ok(!files.includes('rvarna-battlesuit.html')&&!files.includes('manta.html'),'Legends and Imperial Armour routes must be absent');
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
for(const obsolete of ['mobile.js','mobile.css','phone-popup-controller.js'])await assert.rejects(stat(new URL(obsolete,root)),`${obsolete} must not exist`);
console.log(`T'au Empire responsive QA passed: ${files.length} content-free compatibility stubs and 8 Related Rules sections.`);
