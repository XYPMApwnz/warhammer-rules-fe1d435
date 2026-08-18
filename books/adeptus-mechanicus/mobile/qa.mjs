import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const routes=fs.readdirSync(root).filter(name=>name.endsWith('.html'));
const pages=routes.map(name=>fs.readFileSync(path.join(root,name),'utf8'));
const reader=fs.readFileSync(path.join(root,'..','reader.html'),'utf8');
const build=fs.readFileSync(path.join(root,'build.mjs'),'utf8');
const redirect=fs.readFileSync(path.join(root,'..','..','shared','mobile-route-redirect.js'),'utf8');

assert.equal(routes.length,47,'Compatibility route inventory changed');
assert.ok(pages.every(page=>page.includes('data-canonical-reader="../reader.html"')),'A route does not target the canonical reader');
assert.ok(pages.every(page=>page.includes('../../shared/mobile-route-redirect.js?v=1')),'A route does not load the versioned redirect helper');
assert.ok(pages.every(page=>!/<(?:article|section)\b|class="[^"]*\bunit-card\b|data-rule-id=/.test(page)),'A compatibility route embeds book content');
assert.ok(pages.every(page=>!page.includes('mobile.js')&&!page.includes('mobile.css')&&!page.includes('phone-popup-controller.js')),'A compatibility route loads the obsolete Mobile runtime');
assert.ok(build.includes('data-canonical-target="${route.id}"')&&build.includes('Invalid compatibility stub'),'Builder does not enforce stub-only output');
assert.ok(fs.existsSync(path.join(root,'related-rules.inc'))&&!build.includes('related-rules.inc')&&pages.every(page=>!page.includes('related-rules.inc')),'Compatibility builder owns or embeds the independent Related Rules artifact');
assert.ok(redirect.includes('destination.search=location.search'),'Redirect does not preserve roster query');
assert.ok(redirect.includes("destination.searchParams.delete('view')"),'Redirect retains obsolete view mode');
assert.ok(redirect.includes('location.hash||root.dataset.canonicalTarget'),'Redirect does not preserve a deep target');
assert.ok(redirect.includes('location.replace(destination.href)'),'Redirect can create a Back loop');
assert.equal((reader.match(/<article\b[^>]*\bid="unit-skitarii-rangers"/g)||[]).length,1,'Canonical Datasheet exists more than once');
assert.ok(reader.includes('./scripts/roster-enhancements.js?v=4')&&reader.includes('./scripts/roster-filter.js?v=7'),'Responsive reader does not load the common roster path');

console.log('Adeptus Mechanicus responsive runtime QA passed: 13/13.');
