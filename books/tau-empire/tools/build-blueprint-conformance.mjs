import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const blueprintPath='docs/ARMY_BOOK_BLUEPRINT.md';
const reportPath='books/tau-empire/reports/army-book-blueprint-conformance.json';
const ids=[...fs.readFileSync(path.join(root,blueprintPath),'utf8').matchAll(/^## (AB-[A-Z0-9]+-[0-9]{3})\s/gm)].map(match=>match[1]);
const rows=`
AB-SCOPE-001|pass|static-source-inspection|docs/ARMY_BOOK_BLUEPRINT.md|Canonical heading parsing returns 83 total and 83 unique IDs.||
AB-SCOPE-002|pass|executable-unit-test|books/tau-empire/tests/blueprint-conformance-qa.mjs|The validator enforces complete ordered coverage of every canonical ID.||
AB-SCOPE-003|pass|static-source-inspection|books/tau-empire|No router, matcher, evaluator, rules engine, or cross-book framework is introduced.||
AB-SCOPE-004|pass|static-source-inspection|books/tau-empire/book.config.json|T'au Empire retains the existing shared build plus book-local runtime architecture.||
AB-SCOPE-005|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Every record uses an allowed status and explicit blocker kind.||
AB-SCOPE-006|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Implementation and publication blockers are summarized independently.||
AB-SCOPE-007|pass|static-source-inspection|books/tau-empire/mobile/phone-popup-controller.js|Phone popup behavior reuses the accepted Death Guard pattern with book-local namespace and book ID only.||
AB-SRC-001|partial|schema-data-qa|books/tau-empire/sources/source-manifest.json|The manifest records source IDs, versions, dates, paths, URLs, hashes, authority, scope, coverage, gaps, and outputs.|source-authority|No authoritative official Codex source is frozen for complete field-level verification.
AB-SRC-002|pass|static-source-inspection|books/tau-empire/sources/source-manifest.json|Official updates and base publications precede community transcription and secondary comparison.||
AB-SRC-003|partial|schema-data-qa|books/tau-empire/tests/codex-source-parity.cjs|Structured parity covers 63 datasheets, seven Detachments, 23 Enhancements, and 31 Stratagems.|source-authority|Codex parity uses frozen community and secondary sources rather than an official Codex.
AB-SRC-004|partial|schema-data-qa|books/tau-empire/generated/official-updates.json|The official Faction Pack inventory contains 32 updates and 12 FAQ entries with output integration.|source-authority|A complete authoritative Codex update and errata chain cannot be proven.
AB-SRC-005|pass|static-source-inspection|books/tau-empire/sources/source-manifest.json|Unverified fields remain explicit gaps and publishAsComplete remains false.||
AB-CONTENT-001|partial|schema-data-qa|books/tau-empire/tests/qa.mjs|Generated Army Rules and all seven Detachments are inventory-checked.|source-authority|Complete official Codex text authority is absent.
AB-CONTENT-002|partial|schema-data-qa|books/tau-empire/tests/codex-source-parity.cjs|The inventory covers 31 Stratagems and 23 Enhancement point records deterministically.|source-authority|Four Codex Detachments rely on frozen community or secondary transcription evidence.
AB-CONTENT-003|partial|schema-data-qa|books/tau-empire/tests/qa.mjs|All 63 datasheets, including twenty Legends records, have desktop and Phone outputs.|source-authority|Every rule-bearing datasheet field cannot be certified against an official Codex.
AB-CONTENT-004|partial|schema-data-qa|books/tau-empire/tests/qa.mjs|Wargear and composition cover all 63 units and preserve 277 atomic weapon tokens.|source-authority|The wargear corpus is verified against frozen secondary transcription.
AB-CONTENT-005|partial|schema-data-qa|books/tau-empire/tests/qa.mjs|Faction and datasheet keyword presence is checked for every generated unit.|source-authority|Official Codex field-level keyword parity remains unavailable.
AB-CONTENT-006|partial|schema-data-qa|books/tau-empire/tests/compatible-rules-qa.mjs|Build-time relations preserve attachment-unknown conditions and runtime never infers actual attachment.|source-authority|Some formation and transport authority derives from the unverified Codex transcription.
AB-CONTENT-007|partial|schema-data-qa|books/tau-empire/sources/official-mfm-v1.1.json|Frozen official MFM v1.1 covers 43 current units, 23 Enhancements, and seven Detachments.|source-authority|The repository cannot prove that no later official MFM supersedes the frozen evidence.
AB-CONTENT-008|partial|schema-data-qa|books/tau-empire/generated/official-updates.json|Faction Pack update and FAQ effects are represented in deterministic generated data.|source-authority|Official Codex FAQ and errata completeness cannot be proven.
AB-CONTENT-009|pass|generated-artifact-validation|books/tau-empire/reports/army-book-blueprint-conformance.json|Source, parity, matrix, output, and conformance artifacts are deterministic and freshness-checked.||
AB-CONTENT-010|partial|schema-data-qa|books/tau-empire/reports/compatible-rules-import-report.json|Compatible Rules reports identify covered, conditional, and unresolved rows.|publication|No artifact compares every all-content rule-bearing layer to a frozen external parity source.
AB-WAHA-001|partial|schema-data-qa|books/tau-empire/sources/wahapedia-compatible-rules.snapshot.json|The frozen snapshot covers Compatible Rules candidates and rule-to-unit associations.|publication|All-content comparable layers are outside this snapshot.
AB-WAHA-002|partial|schema-data-qa|books/tau-empire/reports/compatible-rules-import-report.json|Compatible Rules comparison distinguishes imported, ignored, conditional, and unresolved records.|publication|Comparable and excluded policy is incomplete for every content layer.
AB-WAHA-003|partial|schema-data-qa|books/tau-empire/sources/source-manifest.json|The Compatible Rules snapshot has retrieval date, URL, scope, and immutable hash.|publication|Snapshot metadata and coverage do not describe an all-content extraction.
AB-WAHA-004|pass|executable-unit-test|books/tau-empire/tests/compatible-rules-qa.mjs|Safe normalized IDs are validated without rewriting rule-bearing prose.||
AB-WAHA-005|pass|schema-data-qa|books/tau-empire/reports/compatible-rules-import-report.json|Comparison records use explicit matched, conditional, ignored, and unresolved outcomes.||
AB-WAHA-006|partial|schema-data-qa|books/tau-empire/reports/compatible-rules-import-report.json|Compatible Rules has zero unresolved records and explicit imported association evidence.|publication|Discrepancies outside Compatible Rules lack all-content investigation.
AB-WAHA-007|pass|static-source-inspection|books/tau-empire/sources/source-manifest.json|Official sources retain precedence over community transcription and Wahapedia.||
AB-WAHA-008|pass|static-source-inspection|books/tau-empire/sources/source-manifest.json|Wahapedia is secondary comparison evidence and never authoritative source content.||
AB-WAHA-009|partial|schema-data-qa|books/tau-empire/sources/compatible-rules-correction-ledger.json|Compatible Rules candidate corrections have stable IDs, evidence, decisions, and runtime boundaries.|publication|Candidate-correction coverage is not established for every all-content layer.
AB-BUILD-001|pass|static-source-inspection|books/tau-empire/book.config.json|Frozen sources flow through existing extraction, matrix, shared rendering, and Phone generation.||
AB-BUILD-002|pass|generated-artifact-validation|books/shared/tools/build-army-book.mjs|T'au Empire desktop generation passes --check without changing output.||
AB-BUILD-003|pass|generated-artifact-validation|books/tau-empire/reader.html|Desktop reader, 73 Phone routes, matrices, snapshots, and reports are tracked outputs.||
AB-BUILD-004|pass|schema-data-qa|books/tau-empire/sources/source-manifest.json|Manifest source hashes and official update records are checked by T'au Empire QA.||
AB-BUILD-005|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Each requirement names a concrete source, output, command, selector, or count.||
AB-BUILD-006|pass|generated-artifact-validation|books/tau-empire/mobile/build.mjs|Desktop, Phone, glossary, Compatible Rules, and cache freshness checks reject stale output.||
AB-COMPAT-001|pass|schema-data-qa|books/tau-empire/sources/compatible-rules-correction-ledger.json|Correction rows retain stable unit and rule IDs, relation evidence, decisions, and status.||
AB-COMPAT-002|pass|schema-data-qa|books/tau-empire/generated/compatible-rules.json|The runtime matrix contains 1,947 rows including 90 explicit conditional rows.||
AB-COMPAT-003|pass|executable-unit-test|books/tau-empire/tests/compatible-rules-qa.mjs|Production consumes generated matrix lookups and never derives compatibility from prose.||
AB-COMPAT-004|pass|static-source-inspection|books/tau-empire/scripts/compatible-rules-runtime.mjs|Runtime has no TARGET parser, selector evaluator, or generic matcher.||
AB-COMPAT-005|pass|static-source-inspection|books/tau-empire/scripts/compatible-rules-runtime.mjs|The correction ledger is build-only and absent from runtime dependencies.||
AB-COMPAT-006|pass|schema-data-qa|books/tau-empire/generated/compatible-rules.json|Rows carry minimal relation, condition, owner, and scope metadata.||
AB-COMPAT-007|pass|executable-unit-test|books/tau-empire/tests/compatible-rules-qa.mjs|Legacy matcher globals and production dependencies are asserted absent.||
AB-COMPAT-008|pass|schema-data-qa|books/tau-empire/reports/compatible-rules-import-report.json|Conditional and unresolved are separate; unresolved count is zero.||
AB-ROSTER-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|No-roster desktop and Phone expose full navigation and Compatible Rules choices.||
AB-ROSTER-002|pass|executable-unit-test|tests/roster-guide-qa.mjs|New Recruit parsing, faction validation, stable unit identity, and selection use the shared parser.||
AB-ROSTER-003|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Adaptive Biology is displayed only for its exact resolved ownerUnitId.||
AB-ROSTER-004|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Accepted Phone validation uses replacement navigation with immediate termination; browser fixtures cover rejected contexts and valid owner filtering.||
AB-ROSTER-005|pass|state-machine-test|books/tau-empire/tests/compatible-rules-qa.mjs|Attachment-dependent rules remain conditional when actual formation is unknown.||
AB-ROSTER-006|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Desktop and Phone accept exactly one normalized Detachment and reject ambiguity.||
AB-POPUP-001|pass|state-machine-test|books/tau-empire/tests/blueprint-conformance-qa.mjs|Phone root replacement, nested append, duplicate prevention, and cycle collapse execute production state logic.||
AB-POPUP-002|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Phone popup stack is bounded, internally scrollable, auto-scrolls active cards, and remains contained.||
AB-POPUP-003|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Escape closes top, level close removes deeper levels, and backdrop closes root.||
AB-HISTORY-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Reader navigation and restoration use the accepted shared Page State contract.||
AB-HISTORY-002|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Desktop full-entry behavior uses the accepted DGFullEntry path.||
AB-HISTORY-003|pass|static-source-inspection|books/tau-empire/scripts/app.js|Full-entry internal state remains separate from popup and navigation stacks.||
AB-HISTORY-004|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Journey Back uses DGJourney with route, query, hash, and scroll restoration.||
AB-HISTORY-005|pass|state-machine-test|books/tau-empire/tests/blueprint-conformance-qa.mjs|Ordinary Phone popup state never calls Browser History API.||
AB-HISTORY-006|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Missing openers and invalid restored suffixes use safe focus and state fallbacks.||
AB-GLOSSARY-001|pass|schema-data-qa|glossary/generated/glossary.en.js|Desktop and Phone use the canonical global registry and T'au Empire context.||
AB-GLOSSARY-002|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Mega Glossary return preserves route, query, hash, scroll, and valid popup prefix.||
AB-GLOSSARY-003|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Popup actions expose canonical Mega Glossary navigation without duplicate rule data.||
AB-NAV-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|TOC, direct routes, view switch, query, and hash navigation are deterministic.||
AB-NAV-002|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Shared navigation cancels stale rapid selections and keeps the latest destination.||
AB-NAV-003|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Active item and scroll synchronization use DGNavigation.||
AB-NAV-004|pass|executable-unit-test|books/tau-empire/tests/qa.mjs|Generated navigation targets resolve to existing desktop sections and Phone routes.||
AB-A11Y-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Keyboard, mouse, and touch activation avoid hover-only dependencies.||
AB-A11Y-002|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Popup focus enters active level and returns to nested or document opener with fallback.||
AB-A11Y-003|pass|static-source-inspection|books/death-guard/styles/content.css|Reused presentation limits motion to non-rule-bearing transitions.||
AB-A11Y-004|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|The reused reduced-motion media path disables nonessential animation.||
AB-PHONE-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Seventy-three Phone routes preserve content, roster, type-color, popup, glossary, query/hash, and token parity.||
AB-PWA-001|pass|real-browser-automated-integration|tests/browser/cold-offline.mjs|Current desktop and Phone assets, glossary data, popup controller, saved routes, and cache revision work offline.||
AB-QA-001|partial|real-browser-automated-integration|tests/browser/cold-offline.mjs|Source, schema, unit, state, generated, integration, browser, and offline evidence is present.|publication|Manual browser acceptance and public smoke are not complete SHA-bound publication evidence.
AB-QA-002|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Every evidence item records a category, path, and concrete detail.||
AB-QA-003|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Runtime-sensitive requirements cite state or browser evidence rather than source presence alone.||
AB-QA-004|pass|executable-unit-test|books/tau-empire/tests/blueprint-conformance-qa.mjs|Static assertions are limited to wiring, schema, dependency, and prohibition contracts.||
AB-QA-005|partial|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|Evidence is tied to the frozen audit base and deterministic commands.|publication|A final public deployment record tied to the resulting commit SHA is absent.
AB-PUBLISH-001|partial|schema-data-qa|books/tau-empire/sources/source-manifest.json|Implementation evidence is complete and publishAsComplete remains false.|publication|Authoritative Codex completeness, all-content parity, and publication acceptance remain unresolved.
AB-PUBLISH-002|pass|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|The report preserves the Blueprint baseline without weakening requirements.||
AB-PUBLISH-003|pass|static-source-inspection|books/tau-empire|No generic framework, matcher, evaluator, router, or rules engine is introduced.||
AB-PUBLISH-004|pass|generated-artifact-validation|books/tau-empire/reports/army-book-blueprint-conformance.json|This pass produces an ordered final conformance record after scoped regeneration and checks.||
AB-PUBLISH-005|partial|schema-data-qa|books/tau-empire/reports/army-book-blueprint-conformance.json|The report binds audit inputs to b1b8053dcfde249cc730a01aa69cd7a803cd0336.|publication|The resulting commit requires external Pages deployment evidence before publication approval.
`.trim().split('\n').map(line=>line.split('|'));

if(ids.length!==83||new Set(ids).size!==83)throw new Error(`Blueprint ID count mismatch: ${ids.length}/${new Set(ids).size}`);
const audit=new Map(rows.map(([id,status,type,evidencePath,detail,blockerKind,rationale])=>[id,{status,evidence:[{type,path:evidencePath,detail}],blockerKind:blockerKind||null,rationale:rationale||''}]));
const missing=ids.filter(id=>!audit.has(id));
const extra=[...audit.keys()].filter(id=>!ids.includes(id));
if(missing.length||extra.length||audit.size!==83)throw new Error(`Audit map mismatch: missing=${missing.join(',')} extra=${extra.join(',')} count=${audit.size}`);
const requirements=ids.map(id=>{const item=audit.get(id);return {id,status:item.status,evidence:item.evidence,blocker:Boolean(item.blockerKind),blockerKind:item.blockerKind,rationale:item.rationale};});
const summary={pass:0,partial:0,missing:0,notVerified:0,bookSpecificException:0,notApplicable:0,implementationBlockers:[],sourceAuthorityBlockers:[],publicationBlockers:[],externalBlockers:[]};
const summaryKey={pass:'pass',partial:'partial',missing:'missing','not-verified':'notVerified','book-specific-exception':'bookSpecificException','not-applicable':'notApplicable'};
for(const item of requirements){summary[summaryKey[item.status]]++;if(item.blockerKind==='implementation')summary.implementationBlockers.push(item.id);if(item.blockerKind==='source-authority')summary.sourceAuthorityBlockers.push(item.id);if(item.blockerKind==='publication')summary.publicationBlockers.push(item.id);if(item.blockerKind==='external')summary.externalBlockers.push(item.id);}
const report={schema:1,bookId:'tau-empire',blueprintPath,auditBaseSha:'b1b8053dcfde249cc730a01aa69cd7a803cd0336',requirementCount:{total:ids.length,unique:new Set(ids).size},requirements,summary};
const output=`${JSON.stringify(report,null,2)}\n`;
const target=path.join(root,reportPath);
if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==output)throw new Error(`${reportPath} is stale`);
  console.log(`PASS T'au Empire Blueprint conformance ${ids.length}/${new Set(ids).size}`);
}else{
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,output);
  console.log(`Wrote ${reportPath}`);
}
