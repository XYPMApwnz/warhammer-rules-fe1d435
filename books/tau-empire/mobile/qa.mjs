import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';

const root=new URL('./',import.meta.url);
const files=(await readdir(root)).filter(name=>name.endsWith('.html'));
const runtime=await readFile(new URL('mobile.js',root),'utf8');
assert.equal(files.length,73,'Phone Mode must contain start, updates, army rules, 7 detachments and 63 datasheets');
assert.match(runtime,/routeDetachmentId=link=>\{const pathname=new URL\(link\.href,location\.href\)\.pathname/,'Detachment IDs must come from route pathname');
assert.match(runtime,/canonicalDetachments=new Set\([^;]+\.map\(routeDetachmentId\)\)/,'only Detachment navigation routes may establish canonical membership');
assert.doesNotMatch(runtime,/canonicalDetachments=new Set\([^;]+textContent/,'visible DP badges must not enter canonical Detachment IDs');
const detachmentRoute=new URL('./kauyon.html?roster=fixture#detachment',new URL('cadre-fireblade.html',root));
assert.equal((detachmentRoute.pathname.split('/').pop()||'').replace(/\.html$/i,''),'kauyon','KAUYON 2DP route must resolve to kauyon despite query and hash');
for(const file of files){
  const html=await readFile(new URL(file,root),'utf8');
  assert.match(html,/\.\/mobile\.js\?v=8/);
  assert.match(html,/\.\/mobile\.css\?v=2/);
  assert.match(html,/rule-facts\.js\?v=4/);
  assert.doesNotMatch(html,/related-rules-matcher|army-related-rules/);
  assert.match(html,/glossary-return\.js\?v=3/);
  assert.match(html,/roster-parser\.js\?v=2/);
  assert.match(html,/roster-data\.js\?v=1/);
  assert.match(html,/book-roster-enhancements\.js\?v=1/);
  assert.ok((await stat(new URL(file,root))).size<100_000,`${file} must stay a focused Phone Mode page`);
  for(const[,target]of html.matchAll(/data-mobile-rule-path="books\/tau-empire\/mobile\/([^"#]+)(?:#[^"]*)?"/g))assert.ok(files.includes(target),`${file}: missing mobile rule page ${target}`);
}
const related=await readFile(new URL('related-rules.inc',root),'utf8');
assert.equal([...related.matchAll(/<section class="related-detachment(?: [^"]*)?" data-detachment=/g)].length,8,'Related Rules must contain Core plus 7 T’au detachments');
assert.doesNotMatch(related,/data-eligibility|data-keyword-grants/);
assert.match(await readFile(new URL('commander-in-coldstar-battlesuit.html',root),'utf8'),/id="relatedRules"/,'Codex datasheets expose matrix-backed Compatible Rules');
assert.doesNotMatch(await readFile(new URL('rvarna-battlesuit.html',root),'utf8'),/id="relatedRules"/,'Legends datasheets stay outside the Compatible Rules matrix');
assert.doesNotMatch(await readFile(new URL('manta.html',root),'utf8'),/id="relatedRules"/,'Imperial Armour datasheets stay outside the Compatible Rules matrix');
assert.doesNotMatch(related,/data-term-title="[^"]*"[^>]*data-term-title=/,'Related Rules hydration must be idempotent');
const generatedPages=await Promise.all(files.map(file=>readFile(new URL(file,root),'utf8')));
assert.ok(generatedPages.every(html=>html.includes('id="termPopupStack"')),'all Phone routes must use the canonical popup stack');
assert.ok(generatedPages.every(html=>html.includes('phone-popup-controller.js?v=1')),'all Phone routes must load the T’au popup controller');
assert.ok(generatedPages.every(html=>html.includes('glossary/generated/glossary.en.js?v=tyranids-1')),'all Phone routes must load the canonical glossary registry');
assert.ok(generatedPages.every(html=>!html.includes('id="termTitle"')&&!html.includes('id="termSummary"')),'legacy single-dialog markup must be absent');
console.log(`T'au Empire Phone Mode QA passed: ${files.length} focused pages and 8 Related Rules sections.`);
