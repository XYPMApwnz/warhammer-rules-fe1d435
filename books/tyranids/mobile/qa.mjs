import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';
import vm from 'node:vm';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
const reader=await readFile(new URL('../reader.html',root),'utf8');
const rosterFilter=await readFile(new URL('../scripts/roster-filter.js',root),'utf8');
const rosterContext=await readFile(new URL('../../shared/roster-context.js',root),'utf8');
const rosterData=await readFile(new URL('../scripts/roster-data.js',root),'utf8');
const rosterScope={console,URL,URLSearchParams};rosterScope.window=rosterScope;rosterScope.globalThis=rosterScope;
vm.runInNewContext(rosterContext,rosterScope,{filename:'books/shared/roster-context.js'});
vm.runInNewContext(rosterData,rosterScope,{filename:'books/tyranids/scripts/roster-data.js'});
const rosterApi=rosterScope.WHArmyRosterContext,rosterCatalog=rosterScope.WH_BOOK_ROSTER_CATALOG;
assert.equal(files.length,63,'legacy routes must contain start, updates, army rules, 10 detachments and 50 datasheets');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/data-canonical-reader="\.\.\/reader\.html"/,`${file}: canonical reader target is absent`);
  assert.match(html,/data-canonical-target="[^"]+"/,`${file}: canonical content target is absent`);
  assert.match(html,/mobile-route-redirect\.js\?v=2/,`${file}: shared redirect runtime is absent`);
  assert.doesNotMatch(html,/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/,`${file}: compatibility stub contains duplicated content`);
  assert.doesNotMatch(html,/mobile\.js|mobile\.css|phone-popup-controller|book-roster-enhancements/,`${file}: obsolete Phone runtime is present`);
  assert.ok((await stat(new URL(file,root))).size<2_000,`${file}: compatibility stub is not content-free`);
}
assert.match(reader,/\.\.\/shared\/book-roster-enhancements\.js\?v=\d+/,'canonical reader does not load the shared Enhancement engine');
assert.ok(rosterApi.install({catalog:rosterCatalog,roster:null})===null&&rosterFilter.includes('WHArmyRosterContext.install({')&&(rosterFilter.match(/WHArmyRosterContext\.install\(/g)||[]).length===1&&!rosterFilter.includes('location.replace('),'invalid Tyranids roster must fail closed through the shared roster projection');
assert.ok(typeof rosterApi.project==='function'&&rosterCatalog.schema==='wh40k-army-roster-catalog/v1'&&rosterCatalog.book.id==='tyranids'&&rosterCatalog.units.every(unit=>unit.sourceBookId==='tyranids'&&Array.isArray(unit.intrinsicKeywords))&&!rosterFilter.includes("toLowerCase()==='xenos'")&&!rosterFilter.includes('querySelectorAll')&&!rosterFilter.includes('DocumentFragment')&&!/display\s*:\s*none|offscreen/i.test(rosterFilter)&&await stat(new URL('mobile.js',root)).then(()=>false,()=>true),'Tyranids identity and keyword semantics must come from the canonical shared projection without a hidden or Phone-specific roster implementation');
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,11,'Related Rules must contain Core plus 10 Tyranids detachments');
assert.doesNotMatch(related,/data-eligibility=|data-keyword-grants=/);
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
for(const obsolete of ['mobile.js','mobile.css','phone-popup-controller.js'])await assert.rejects(stat(new URL(obsolete,root)),`${obsolete} must not exist`);
console.log(`Tyranids responsive QA passed: ${files.length} content-free compatibility stubs and 11 Related Rules sections.`);
