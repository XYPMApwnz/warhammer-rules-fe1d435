import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {parseArmyBookTargetCatalog} from '../books/shared/tools/build-army-book-targets.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const books = [
  ['death-guard', true],
  ['adeptus-mechanicus', false],
  ['tau-empire', false],
  ['emperors-children', false],
  ['tyranids', false],
  ['chaos-space-marines', true],
  ['space-marines', false],
  ['dark-angels', false],
  ['blood-angels', true]
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function matches(text, pattern) {
  return [...text.matchAll(pattern)];
}

for (const [bookId, expectsBase] of books) {
  const shell = read(`books/${bookId}/reader.html`);
  const content = parseArmyBookTargetCatalog(read(`books/${bookId}/scripts/target-data.js`)).html;
  const html = shell + content;
  const label = `[${bookId}]`;
  const ids = matches(html, /\sid="([^"]+)"/g).map(match => match[1]);
  const viewSwitches = matches(html, /<a\b[^>]*\bdata-view-switch\b[^>]*>/g);
  const logicalOwners = matches(html, /\bdata-logical-owner="([^"]+)"/g).map(match => match[1]);

  assert(/<header\b[^>]*\bclass="[^"]*\bapp-header\b[^"]*"[^>]*\bid="appHeader"/.test(html), `${label} common app header missing`);
  assert(/<button\b[^>]*\bid="navMenu"[^>]*\btype="button"/.test(html), `${label} menu button contract missing`);
  assert(/<button\b[^>]*\bid="navCollapse"[^>]*\btype="button"/.test(html), `${label} collapse button contract missing`);
  assert(/<a\b[^>]*\bclass="[^"]*\blibrary-link\b[^"]*"[^>]*>[^]*?<b>Library<\/b>/.test(html), `${label} Library control missing`);
  assert(viewSwitches.length === 1, `${label} expected exactly one view switch, found ${viewSwitches.length}`);
  assert(/href="\.\/reader\.html\?view=mobile"/.test(viewSwitches[0][0]), `${label} view switch must retain the canonical reader`);
  assert(!/href="[^"]*\/mobile\//.test(viewSwitches[0][0]), `${label} view switch must not use a legacy Mobile route`);
  assert(/<button\b[^>]*\bid="backButton"[^>]*\btype="button"/.test(html), `${label} Back button contract missing`);
  assert(/<button\b[^>]*\bid="tocScrim"[^>]*\btype="button"[^>]*\baria-label="Close navigation"/.test(html), `${label} accessible scrim contract missing`);
  assert(ids.length === new Set(ids).size, `${label} duplicate DOM IDs found`);

  assert(!/\bclass="[^"]*\bunit-head\b/.test(html), `${label} legacy unit-head remains`);
  assert(/\bclass="[^"]*\bunit-header\b/.test(html), `${label} common unit-header missing`);
  assert(logicalOwners.length > 0, `${label} Profile logical ownership is missing`);
  for (const owner of new Set(logicalOwners)) {
    assert(ids.includes(owner), `${label} logical owner ${owner} has no target element`);
  }
  assert(!/<div\b[^>]*\bclass="[^"]*\bstat\b[^"]*"[^>]*>[^]*?<span\b[^>]*\bclass="stat-label"[^>]*>Base<\/span>/.test(html), `${label} Base remains a combat stat`);

  const baseFields = matches(html, /<p\b[^>]*\bclass="[^"]*\bprofile-base\b[^"]*"[^>]*\bdata-logical-owner="([^"]+)"/g);
  if (expectsBase) {
    assert(baseFields.length > 0, `${label} factual Base presentation missing`);
  } else {
    assert(baseFields.length === 0, `${label} synthesized Base presentation found`);
  }
}

const armyBookApp = read('books/shared/army-book-app.js');
const viewRouter = read('books/shared/controllers/view-router.js');
const sharedBuilder = read('books/shared/tools/build-army-book.mjs');
const sharedLayout = read('books/shared/styles/layout.css');
const dgApp = read('books/death-guard/scripts/app.js');
const smRoster = read('books/space-marines/scripts/roster-filter.js');
const daApp = read('books/dark-angels/scripts/app.js');
const dgReader = parseArmyBookTargetCatalog(read('books/death-guard/scripts/target-data.js')).html;

assert(!armyBookApp.includes('config.dedicatedMobile'), '[shared] view switch still branches through dedicated Mobile routes');
assert(viewRouter.includes("new URL('./reader.html'"), '[shared] view router does not retain canonical reader');
assert(!viewRouter.includes('./mobile/index.html'), '[shared] view router still targets a Mobile stub');
assert(!sharedBuilder.includes('generatedMobileSwitchJs'), '[shared] duplicate generated view-switch handler remains');
assert(!sharedBuilder.includes('forcedPhoneCss'), '[shared] forced Phone CSS remains duplicated in generated book CSS');
assert(sharedBuilder.includes('runtimeVersions.shared.viewRouter'), '[shared] view-router version is not authoritative');
assert(sharedLayout.includes('html[data-view="mobile"]'), '[shared] forced Phone presentation contract missing');
assert(!dgApp.includes('[data-roster-guides-link]'), '[death-guard] legacy roster selector remains');
assert(!smRoster.includes('.toc-panel details'), '[space-marines] stale TOC selector remains');
assert(!daApp.includes('semanticViewSwitch'), '[dark-angels] duplicate view-switch handler remains');
assert(!/id="core-stratagems"\s+data-track="core-stratagems"/.test(dgReader), '[death-guard] orphan Core Stratagems track remains');

console.log('Shared Army Book presentation structure QA: PASS (9/9).');
