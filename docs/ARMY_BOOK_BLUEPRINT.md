# Canonical Army Book Blueprint

**Scope:** shared canonical baseline for all Army Books (Death Guard, Adeptus Mechanicus, Tyranids, T’au Empire, Emperor’s Children, and future books).

## AB-SCOPE-001 — Canonical blueprint file
- Level: MUST
- Normative requirement: A single canonical `docs/ARMY_BOOK_BLUEPRINT.md` file MUST exist as the normative requirements artifact for all Army Books.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: repo-relative file path `docs/ARMY_BOOK_BLUEPRINT.md`; references to this file from applicable architecture documents or release audit; usage of requirement IDs in conformance audit.
- Book-specific extensions: book-local docs may add IDs only as extensions and must reference canonical IDs.

## AB-SCOPE-002 — Universal conformance execution
- Level: MUST
- Normative requirement: Each Army Book MUST pass a conformance audit over all applicable requirement IDs in this blueprint.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: release/review artifact named with concrete evidence path listing each checked ID; evidence of not-applicable handling per ID.
- Book-specific extensions: books may add book-local requirements and constraints as long as they do not weaken canonical requirements.

## AB-SCOPE-003 — Architecture non-goals
- Level: MUST NOT
- Normative requirement: A published Army Book and work on this blueprint MUST NOT introduce solely for unification a new generic matcher, selector evaluator, rules engine, battlefield simulator, framework, universal reader engine, global shared rewrite, or global abstraction layer over book-local runtimes.
- Owner: shared product shell; shared Army Book capability
- Applicability: all Army Books and blueprint evolution
- Required evidence: architecture or release diff audit showing that each added shared mechanism is required by a canonical contract rather than unification alone.
- Book-specific extensions: existing or independently justified shared capabilities may remain when evidence demonstrates a required canonical contract.

## AB-SCOPE-004 — Implementation diversity
- Level: MAY
- Normative requirement: An Army Book MAY use an internal implementation different from Death Guard only when Death Guard has no technically compatible capability, when a documented technically necessary book-local difference conforms to `AB-SCOPE-007`, or when a separate canonical requirement explicitly requires a different implementation. Equivalent end behavior alone MUST NOT justify an alternative implementation when a technically compatible Death Guard production pattern exists, and every deviation MUST conform to `AB-SCOPE-007`.
- Owner: shared Army Book capability; book-local implementation
- Applicability: all Army Books
- Required evidence: `static-source-inspection` of the applicable Death Guard production path or evidence that the capability is absent; documented technical necessity or the canonical requirement requiring a different implementation; conformance evidence and applicable tests proving the deviation preserves the canonical contract and satisfies `AB-SCOPE-007`.
- Book-specific extensions: book-local implementation diversity MAY remain for genuinely different mechanics, content schemas, generated DOM structures, route formats, ownership/cardinality models, and capabilities absent from Death Guard, subject to `AB-SCOPE-007`.

## AB-SCOPE-005 — Conformance status contract
- Level: MUST
- Normative requirement: Conformance records MUST use exactly one canonical status (`pass`, `partial`, `missing`, `not-verified`, `book-specific-exception`, or `not-applicable`), MUST include evidence and blocker status, and MUST include rationale for `partial`, `missing`, `not-verified`, or `book-specific-exception`; `conditional` and `unresolved` MUST NOT be used as conformance statuses.
- Status definitions: `pass` means the full requirement is proven by sufficient evidence; `partial` means only part of the requirement is proven; `missing` means a mandatory artifact or process is absent; `not-verified` means implementation may exist but available evidence is insufficient; `book-specific-exception` means a documented permissible extension or deviation that does not weaken the baseline; `not-applicable` means the requirement objectively does not apply to the book or mode.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: concrete matrix or audit artifact with per-ID fields (`status`, `evidence`, `blocker`, `rationale`) and evidence mapping to immutable commit context when available.
- Book-specific extensions: additional narrative rationale fields may be added by book-local implementation.

## AB-SCOPE-006 — Publication audit model
- Level: MUST
- Normative requirement: Publication audit MUST reference this blueprint and requirement IDs and MAY be externalized into release/review artifacts; publication tooling MUST NOT be required to parse this Markdown as a machine input in this stage.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: publication checklist or release/review artifacts that resolve requirements to status; link map to blueprint IDs and responsible owner.
- Book-specific extensions: book-local publication notes must cite blueprint requirement IDs and immutable evidence.

## AB-SCOPE-007 — Death Guard technical reference implementation
- Level: MUST
- Normative requirement: Before implementing an Army Book capability for which Death Guard has a technically compatible production implementation, the implementer MUST inspect the current accepted Death Guard production paths and tests and MUST reuse the same applicable production pattern, including data-loading and validation order, fail-closed control flow, runtime and generated-artifact boundaries, DOM interaction, navigation and roster-context propagation, query/hash preservation, popup/history/Journey integration, desktop/Phone transitions, build/check discipline, and QA pattern. Book-local copying or minimal adaptation MAY be used and MUST be preferred over an alternative implementation. An Army Book MUST NOT create a parallel book-local algorithm or a new shared or generic resolver, filter, router, matcher, evaluator, engine, framework, DOM adapter, or abstraction merely to replace a technically compatible Death Guard path or reduce duplication. Any material deviation MUST be minimal, book-local, technically necessary because of a different canonical mechanic, content schema, generated DOM, route format, rule-bearing entity type, ownership/cardinality model, absent Death Guard capability, or conflicting canonical requirement, and MUST be justified in the implementation report and covered by evidence or tests; convenience, speculative reuse, perceived generality, reduced duplication, or preference to rewrite MUST NOT justify deviation. If Death Guard lacks the capability, a minimal book-local implementation MAY be used under the remaining canonical requirements, MUST NOT automatically establish a shared pattern, MUST be validated on at least one additional materially different Army Book before recognition as a universal technical pattern, and MUST be explicitly recorded when accepted as a canonical reference. Later accepted Death Guard changes MUST guide subsequent applicable Army Book work, but existing accepted books MUST NOT be mass-rewritten without a concrete regression or a separate migration task.
- Owner: shared Army Book capability; generated content/build layer; book-local implementation
- Applicability: all Army Books and all capabilities for which Death Guard has a technically compatible production implementation
- Required evidence: `static-source-inspection` of exact applicable Death Guard production paths and tests; an implementation-report table with `Capability`, `Death Guard production path`, `Reused pattern`, and `Necessary book-local difference`; applicable executable tests following the Death Guard production test pattern where contracts are compatible; diff, import, or architecture evidence confirming the absence of an unnecessary parallel implementation path.
- Book-specific extensions: book-local differences MAY preserve only the minimum parameters, structures, and behavior required by a documented technical distinction; capabilities absent from Death Guard MAY remain book-local until the cross-book validation and explicit canonical-reference conditions in this requirement are met.

## AB-SRC-001 — Structured source manifest
- Level: MUST
- Normative requirement: A structured source manifest artifact for each book MUST exist and contain all required fields, and MUST be deterministically valid.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: one manifest artifact per book with required fields (source, title, edition, version, publication date, retrieval/freeze dates, path/URL, hash, authority, scope, coverage, gaps, superseding updates, language, affected records, affected outputs).
- Book-specific extensions: book-local extension fields may be added, but required fields are mandatory.

## AB-SRC-002 — Source precedence
- Level: MUST
- Normative requirement: Source precedence MUST be applied in this order: 1) more recent and more specific official FAQ/Errata/Update/Replacement; 2) current official base document; 3) official MFM only for points/costs and Detachment Points-related costs; 4) other frozen official materials; 5) full frozen secondary sources; 6) Wahapedia; 7) BSData/community as auxiliary evidence.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: manifest precedence fields and gap rationale for each overridden or non-applicable source.
- Book-specific extensions: book-local overrides may be documented only with explicit exception reason and authority.

## AB-SRC-003 — Source parity inventory
- Level: MUST
- Normative requirement: The source inventory MUST include inventory completeness checks for: canonical content, Core Stratagems, glossary records, Legends policy, Imperial Armour policy, current official points provenance, manifest, updates/FAQ/Errata inventory, explicit exclusions, and gap records.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: frozen official inventory artifact and manifest fields proving scope and exclusions.
- Book-specific extensions: extra source tracks (e.g., campaign books) allowed with explicit policy references.

## AB-SRC-004 — Update and errata coverage
- Level: MUST
- Normative requirement: All official updates, FAQ, and errata relevant to book behavior MUST be inventoried and linked to affected records, with explicit update/override status.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: versioned update ledger artifact and manifest linkage to frozen records.
- Book-specific extensions: book-local change logs may add affected-record details.

## AB-SRC-005 — No invented rule-bearing content
- Level: MUST NOT
- Normative requirement: Canonical rule-bearing content MUST NOT be reconstructed from memory or title alone, invent missing wording, assemble a complete base rule from an update fragment, or automatically treat a local value, Wahapedia, or BSData as truth; when sufficient evidence is absent, the record MUST remain a gap or unresolved, or be explicitly excluded by policy.
- Owner: generated content/build layer
- Applicability: all canonical rule-bearing content
- Required evidence: source and correction/gap records showing the evidence, authority, decision, and unresolved or exclusion status for incomplete content.
- Book-specific extensions: none.

## AB-CONTENT-001 — Army rules coverage
- Level: MUST
- Normative requirement: Each book MUST implement all canonical army-wide rules, including Army Rules, faction-wide rules, Detachments, and Detachment Rules present in canonical sources.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: source-to-output mapping artifact and generated report indicating coverage and unresolved gaps.
- Book-specific extensions: local naming/alias may vary with stable ID mapping.

## AB-CONTENT-002 — Stratagem and enhancement coverage
- Level: MUST
- Normative requirement: Core Stratagems, faction Stratagems, Enhancements, and assignment restrictions MUST be implemented using deterministic data and verified against source and parity artifacts. Stratagem card grids MUST preserve a readable minimum card width. When available content width cannot support the canonical multi-column presentation, including tablet portrait layouts, the grid MUST collapse to one column and MUST NOT create horizontal overflow. Stratagem card color semantics MUST be based on the canonical Stratagem type rather than turn ownership or timing. Battle Tactic, Strategic Ploy, Wargear, Epic Deed, and Core Stratagems MUST have stable and visually distinct type categories shared by all Army Books. Turn timing MUST remain separate semantic metadata and a visible text label and MUST NOT determine the card's primary color category.
 Every rendered Stratagem card MUST display its canonical Stratagem type as visible text within the card; machine-readable metadata such as data-stratagem-type alone is insufficient. Desktop, Phone, roster-scoped, and dynamically loaded Compatible Rules or Related Rules representations MUST each contain exactly one visible type label with equivalent type semantics. The visible type label and the card's primary color category MUST be derived from the same canonical Stratagem type value. If available canonical evidence does not establish a Stratagem type, the card MUST retain an explicit unknown type category, MUST use the neutral type color, and MUST visibly state that the type is unverified. Runtime MUST NOT infer an unverified type from turn timing, phase, CP cost, title, target, effect, Detachment theme, or other rule prose. Turn timing MUST remain separate from the type label and MUST NOT control the card's primary color.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: canonical stratagem/enhancement artifacts and resolved unit assignment evidence.
 Deterministic DOM inventory proving exactly one visible type label per rendered Stratagem card; desktop, Phone, roster-scoped, and dynamically loaded Compatible/Related Rules parity; real-browser computed-style evidence for every represented canonical type category; evidence that the visible label and primary color are derived from the same canonical type value; evidence that turn timing remains separately visible and does not control the primary card color.
- Book-specific extensions: additional faction-specific enhancement behavior may be documented via book-local extensions.

## AB-CONTENT-003 — Datasheet implementation coverage
- Level: MUST
- Normative requirement: All canonical datasheets, unit abilities, characteristics, weapons, profiles, profiles of damaged states, and composition options MUST have deterministic output representations. On wide and tablet datasheets, Weapons and Abilities MAY begin as parallel columns, but a longer Abilities stream MUST NOT remain constrained to the side column after Weapons ends. Remaining whole ability cards and subsequent support sections MUST continue below the parallel region across the full datasheet width. Rule order, content, and headings MUST remain unchanged, and large dead space beside an active content column MUST NOT be present.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: canonical datasheet artifacts and generated snapshots for desktop/Phone and roster modes.
- Book-specific extensions: additional custom visual fields may be kept book-local.

## AB-CONTENT-004 — Wargear and upgrade implementation
- Level: MUST
- Normative requirement: Wargear options, weapons, upgrade options, and UPGRADE entities MUST be represented with rule-bearing fields preserved and traceable. Weapon abilities MUST be rendered as discrete atomic interactive tokens. The complete canonical ability label and any associated parameter, including labels such as ANTI-INFANTRY 2+, ANTI-VEHICLE 4+, and RAPID FIRE 3, MUST remain inside one token. Glossary interaction MUST cover the complete token, glossary autolinking MUST NOT split compound weapon abilities into partial links, and responsive wrapping MUST occur only between tokens, not inside a canonical ability label. Desktop and Phone outputs MUST preserve the same token text, order, and interaction semantics.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: deterministic wargear/upgrade structured data artifacts.
- Book-specific extensions: local UI grouping labels are allowed.

## AB-CONTENT-005 — Keywords and faction tags
- Level: MUST
- Normative requirement: Keywords and faction keywords from canonical sources MUST be represented with stable identifiers and preserved through filtering, compat checks, and assignment logic.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: keyword manifest/lookup evidence and deterministic validation.
- Book-specific extensions: additional tags for local filters only if non-normative.

## AB-CONTENT-006 — Canonical formation and transport relations
- Level: MUST
- Normative requirement: Canonical content MUST preserve every source-defined formation and Transport relation, including applicable Leader, Bodyguard, Support, mandatory-join, and conditional-join relations, together with directly source-defined keyword additions, keyword removals, deployment restrictions, and other explicitly structured formation effects; relation eligibility MUST NOT be treated as proof of actual formation, actual formation MUST remain unknown until confirmed by an authoritative structured formation source, and runtime MUST use only pre-generated relation artifacts without introducing a formation graph engine.
- Owner: shared Army Book capability; generated content/build layer; book-local implementation
- Applicability: all Army Books
- Required evidence: deterministic structured relation artifact; source/update linkage; `schema-data-qa`; roster fixtures for unconfirmed and confirmed formation.
- Book-specific extensions: relation representation MAY be book-local; no formation graph engine, generic matcher, evaluator, or shared runtime rewrite is required.
## AB-CONTENT-007 — Points and provenance
- Level: MUST
- Normative requirement: Official points and cost values MUST be declared with current provenance evidence and resolved against MFM as applicable.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: point manifest fields, MFM evidence path and hash, and any superseding official correction entry.
- Book-specific extensions: none.

## AB-CONTENT-008 — Updates/FAQ/errata integration
- Level: MUST
- Normative requirement: Update and errata effects MUST be incorporated into canonical content and flagged as resolved, pending, or explicitly excluded.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: immutable update ledger and generated correction/gap ledger entries.
- Book-specific extensions: book-local rationale narratives.

## AB-CONTENT-009 — Deterministic generated snapshots and reports
- Level: MUST
- Normative requirement: Canonical content outputs MUST be generated deterministically per SHA into traceable snapshots and QA reports.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: generated artifacts, manifest hashes, and review logs with SHA binding.
- Book-specific extensions: report templates may differ only in formatting.

## AB-CONTENT-010 — Snapshot/report parity scope
- Level: MUST
- Normative requirement: Generated snapshots and reports MUST cover all canonical layers required in this blueprint and mark known exclusions and unresolved items.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: snapshot metadata and gap entries.
- Book-specific extensions: none.

## AB-WAHA-001 — Full content comparability scope
- Level: MUST
- Normative requirement: Wahapedia comparison MUST include all comparable rule-bearing information: inventory, Army Rules, faction-wide rules, Detachments, Detachment Rules, faction Stratagems, Enhancements, UPGRADE, assignment rules, datasheets, characteristics, weapons, profiles, abilities, composition, wargear, keywords, damaged profiles, Leader/Bodyguard, Transport, points, updates/FAQ effects, rule-to-unit associations, compatible-rule candidates, Enhancement restrictions, and all other comparable rule-bearing fields.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: comparison reports listing each comparable field and status.
- Book-specific extensions: book-local fields are out of scope unless explicitly added with clear policy.

## AB-WAHA-002 — Comparable fields and exclusions
- Level: MUST
- Normative requirement: All comparable rule-bearing fields MUST be compared; fields may be excluded only as `not-comparable` with reason, `excluded-by-policy` with reason + affected records + gap entry, or explicit coverage gap.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: parity artifact showing each comparable field decision and its rationale category.
- Book-specific extensions: none.

## AB-WAHA-003 — Frozen Wahapedia snapshot
- Level: MUST
- Normative requirement: A frozen Wahapedia snapshot MUST record URL, edition, retrieval/freeze dates, schema/version, hash, parser version, normalization version, coverage, extracted types, gaps, failures, and limitations.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: snapshot metadata file and immutable hash.
- Book-specific extensions: additional extracted types allowed when relevant.

## AB-WAHA-004 — Safe normalization
- Level: MUST
- Normative requirement: Raw extracted values from Wahapedia MUST be preserved exactly; normalized values MAY harmonize only safe typographic variants, while preserving meaningful punctuation, numbers, dice expressions, keywords, ranges, conditions, and restrictions, and normalization MUST NOT convert semantic differences into matches.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: parity artifact containing both raw and normalized fields where compared.
- Book-specific extensions: additional normalization tokens may be added only as no-meaning-change transforms.

## AB-WAHA-005 — Comparison status taxonomy
- Level: MUST
- Normative requirement: Comparison status records MUST use the canonical set: match, official-overrides-secondary, local-gap, wahapedia-gap, wording-difference, structural-difference, source-version-difference, candidate-correction, unresolved, not-comparable, excluded-by-policy.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: parity artifact enumerating status per compared entity and field.
- Book-specific extensions: none.

## AB-WAHA-006 — Factual investigation and unresolved blocking
- Level: MUST
- Normative requirement: Factual investigation MUST apply the source hierarchy in AB-SRC-002 in authority order using only sources applicable to the disputed field, including MFM for points, Detachment Points, and costs and FAQ/Errata for affected rules or datasheets; irrelevant sources MUST NOT be reviewed solely to satisfy a checklist; investigation MUST continue until authoritative resolution, proven `not-comparable`, explicit `excluded-by-policy`, or `unresolved`, and only critical unresolved items MUST block finished, frozen, reference, and publication-ready.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: investigation record identifying applicable sources, authority order, terminal status, unresolved criticality, and blocker decision.
- Book-specific extensions: exclusions allowed only via explicit gap entries with fail-safe behavior.

## AB-WAHA-007 — Investigator precedence for disputes
- Level: MUST
- Normative requirement: Critical discrepancies must be resolved first by source precedence and then by approved evidence quality, and local content must never be treated as ground truth over higher-authority sources.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: resolved corrections with authority and decision log references.
- Book-specific extensions: can include local historical rationale with lower precedence only.

## AB-WAHA-008 — Wahapedia role
- Level: MUST
- Normative requirement: Wahapedia is mandatory for comparability and structured extraction but MUST NOT be treated as the source of truth for disputes.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: explicit parity and precedence evidence showing how Wahapedia-derived findings were validated.
- Book-specific extensions: none.

## AB-WAHA-009 — Candidate corrections
- Level: MUST
- Normative requirement: If parity emits candidate corrections, each candidate-correction MUST include stable entity ID, compared field/relation, local value, Wahapedia value, decision, evidence, authority, and resolution or unresolved status; otherwise requirement is not-applicable.
- Owner: generated content/build layer
- Applicability: Army Books whose parity produces at least one candidate-correction; otherwise conformance status is `not-applicable`.
- Required evidence: parity/correction artifact entries for every candidate-correction, or parity evidence proving that no candidate-corrections exist.
- Book-specific extensions: none.

## AB-BUILD-001 — Content-resolution pipeline
- Level: MUST
- Normative requirement: Content-resolution pipeline MUST be: canonical source inventory > frozen Wahapedia snapshot > parity comparison > factual investigation > correction/gap ledger > canonical resolution.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: pipeline artifact and ledger entry ordering.
- Book-specific extensions: none.

## AB-BUILD-002 — Deterministic production build
- Level: MUST
- Normative requirement: Deterministic production build MUST take resolved canonical content, frozen source inputs, approved correction decisions, and the Enhancement owner matrix as inputs; MUST output generated Army Book artifacts, the generated Compatible Rules runtime matrix, desktop, Phone, roster, and offline outputs, and deterministic QA reports; and MUST NOT depend on a live network.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: build logs with frozen inputs and stable hashes.
- Book-specific extensions: book-local build targets allowed only with canonical inputs.

## AB-BUILD-003 — Canonical outputs
- Level: MUST
- Normative requirement: Builds MUST output shared canonical datasets required for desktop, Phone, roster, and offline behavior.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: generated outputs for each execution mode in release artifacts.
- Book-specific extensions: additional outputs allowed.

## AB-BUILD-004 — Update and manifest integrity
- Level: MUST
- Normative requirement: Canonical manifests and generated artifacts MUST include version, hash, and deterministic provenance for audit replay.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: deterministic build manifests and hash records.
- Book-specific extensions: local metadata extensions allowed.

## AB-BUILD-005 — Deterministic evidence linkage
- Level: MUST
- Normative requirement: Build artifacts MUST be tied to immutable evidence references and previous accepted evidence at the same SHA where applicable.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: evidence ledger or report path with commit SHA linkage.
- Book-specific extensions: optional enrichment fields.

## AB-BUILD-006 — Stale generated output verification
- Level: MUST
- Normative requirement: Every Army Book pipeline with tracked generated outputs MUST provide a read-only check, or an equivalent deterministic verification, that fails when tracked generated output differs from output derived from the frozen inputs and approved correction decisions.
- Owner: generated content/build layer
- Applicability: Army Books with tracked generated outputs
- Required evidence: exact read-only command or verification procedure; `generated-artifact-validation` or `executable-unit-test`; confirmation that the check leaves the working tree unchanged.
- Book-specific extensions: command name and implementation MAY be book-local; no shared generator, framework, or global build rewrite is required.

## AB-COMPAT-001 — Parity/correction schema
- Level: MUST
- Normative requirement: Build/audit parity-correction schema MUST support the states match, no-match, conditional, rejected candidate, source difference, correction decision, gap, unresolved, and exclusion.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: artifact schema usage in generated parity/gap reports.
- Book-specific extensions: optional explanatory fields.

## AB-COMPAT-002 — Runtime matrix shape
- Level: MUST
- Normative requirement: Runtime-facing Compatible Rules matrix MUST contain only published lookup rows and minimal runtime fields: unitId/ruleId/state with optional scope, detachmentId, one explicit pre-generated condition or a finite ordered set of explicit pre-generated conditions, and owner assignment metadata only when required at runtime; every condition MUST be produced by the build layer, runtime MUST only check explicitly supported structured context fields, runtime MUST NOT parse rule text or TARGET, run a selector evaluator, or infer attachment or game state, and the result MUST remain `conditional` whenever at least one required condition remains unknown; the runtime representation MAY use `condition`, `conditions`, or a book-local equivalent; the matrix MAY contain a minimal, pre-generated, stable `kind` or equivalent type discriminator when required for deterministic distinction, grouping, filtering, or display of rule types such as Stratagem, Enhancement, or UPGRADE; the discriminator MUST be produced by the build layer, MUST NOT be derived through runtime text parsing, and MUST NOT contain raw source evidence, correction prose, eligibility inference, or instructions for runtime evaluation; any other runtime field MUST have demonstrated necessity for the canonical contract.
- Owner: shared Army Book capability; generated content/build layer
- Applicability: all Army Books
- Required evidence: `schema-data-qa`; `generated-artifact-validation`; `static-source-inspection` of the runtime lookup path; `executable-unit-test` proving preservation of multiple conditions.
- Book-specific extensions: condition and discriminator names and representations MAY be book-local; no new framework or shared schema is required.
## AB-COMPAT-003 — Runtime lookup only
- Level: MUST
- Normative requirement: Army Book runtime MUST resolve Compatible Rules only through small lookup over generated matrix rows.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: runtime import path and matrix consumption proof in generated build.
- Book-specific extensions: local filtering logic around lookup is allowed if semantically equivalent.

## AB-COMPAT-004 — Runtime parsing prohibitions
- Level: MUST NOT
- Normative requirement: Runtime MUST NOT perform TARGET parsing, human-text parsing, keyword extraction from prose, selector evaluation, attachment inference from prose, or live source parsing for compatibility decisions.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: runtime code-path audit and absence of those parsers in runtime imports.
- Book-specific extensions: build-time generators may perform parsing.

## AB-COMPAT-005 — Correction ledger boundary
- Level: MUST
- Normative requirement: Correction ledger is a build/audit input; builder compiles accepted decisions into generated runtime matrix; runtime MUST NOT read correction ledger and MUST read only generated runtime artifacts, with no hidden runtime corrections.
- Owner: generated content/build layer; book-local implementation
- Applicability: all Army Books
- Required evidence: build pipeline logs and runtime import dependency checks.
- Book-specific extensions: book-local overrides for review-only decisions are not allowed in runtime.

## AB-COMPAT-006 — Minimal compatibility metadata
- Level: MUST
- Normative requirement: Runtime-facing data for compat MUST include only data needed for deterministic display and filtering and must not include raw textual evidence or correction prose.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: generated matrix row fields and runtime access logs.
- Book-specific extensions: none.

## AB-COMPAT-007 — Legacy matcher prohibition
- Level: MUST
- Normative requirement: Published Army Book must NOT import or load legacy generic matcher/legacy TARGET parser/selector evaluator runtime paths; QA MUST verify absence of such imports/loads and QA MUST forbid fallback to legacy logic.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: runtime dependency/trace check and QA evidence of absence.
- Book-specific extensions: book-local lookup implementations are allowed.

## AB-COMPAT-008 — Conditional and unresolved separation
- Level: MUST
- Normative requirement: Compatibility artifacts MUST distinguish `conditional`, a valid compatibility result dependent on unknown formation or game-state information, from `unresolved`, an unresolved source or content discrepancy; `conditional` MUST NOT automatically be treated as a content gap or publication blocker, `unresolved` MUST NOT automatically be converted to `conditional`, and only critical unresolved discrepancies MUST block finished, frozen, reference, or publication-ready status.
- Owner: shared Army Book capability; generated content/build layer
- Applicability: all Army Books with compatibility results
- Required evidence: parity/correction artifacts, generated runtime matrix rows, and publication blocker mapping demonstrating the distinction.
- Book-specific extensions: explicit book-local conditions may be represented when they preserve this distinction.

## AB-ROSTER-001 — No-roster baseline
- Level: MUST
- Normative requirement: Without roster context, all detachments MUST be available by default; Core and faction Stratagems MUST be available; Enhancements and UPGRADE MUST be available; detachment choice MUST only narrow results; EPIC HERO MUST NOT receive standard Enhancements.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: no-roster path snapshots showing available pools and narrowing behavior.
- Book-specific extensions: may add additional non-normative prefiltering indicators.

## AB-ROSTER-002 — Roster baseline selection
- Level: MUST
- Normative requirement: With a roster, All Detachments MUST be absent and only the roster-selected context MUST be used. In roster-scoped Compatible Rules views, group hierarchy labels MUST NOT be duplicated: `Core Stratagems` MUST be shown once, a Detachment title MUST NOT be followed by an additional visible heading containing only `Stratagems`, and cards MUST follow the visible group title directly. A roster accepted and persisted by the canonical Roster Guides flow MUST remain consumable by the corresponding Army Book through semantically equivalent faction-identity normalization. When a roster export uses an optional canonical parent prefix such as Chaos, Imperium, or Xenos, desktop and Phone consumers MUST accept the correct parent prefix for that faction and MUST reject a wrong parent prefix. Re-parsing preserved sourceText MUST NOT invalidate an otherwise accepted roster solely because Roster Guides stores a canonical faction label while the raw export retains its correct canonical parent prefix.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: roster-aware outputs and detachment resolution evidence. End-to-end import, persistence, and open-roundtrip evidence from raw New Recruit text through Roster Guides into desktop and Phone Army Book routes, covering the plain faction label, the correct canonical parent prefix, a wrong parent prefix, and sourceText re-parsing.
- Book-specific extensions: none.

## AB-ROSTER-003 — Deterministic enhancement assignment
- Level: MUST
- Normative requirement: Enhancements/UPGRADE assignments in roster mode MUST apply only to exact resolved `ownerUnitId`; another instance of the same datasheet MUST NOT inherit the assignment.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: roster fixtures and generated roster outputs.
- Book-specific extensions: extension validation messages may differ.

## AB-ROSTER-004 — Roster failure modes
- Level: MUST
- Normative requirement: Missing, wrong, corrupt, or ambiguous roster data MUST fail-closed and refuse to expose non-deterministic results. On a Phone route carrying a roster query, an invalid roster context MUST trigger replacement navigation to the canonical Roster Guides route by using location.replace(...) and MUST immediately terminate Army Book initialization for that route. Silently disabling only roster-scoped controls MUST NOT satisfy this requirement. For this Phone invalid-context response only, the accepted T’au Empire Phone production control flow — resolve the roster context, then perform location.replace(...) followed immediately by return when roster mode is active and the context is invalid — is the canonical technical reference. This response contract does not expand or redefine the book's accepted roster validation criteria. Failure navigation MUST be terminal and non-reentrant. The canonical neutral failure destination MUST NOT receive an auto-open parameter or other state that automatically reopens the same rejected roster or returns to the rejected Army Book route. After replacement navigation, re-entry into an Army Book MUST require an explicit user action. A repeated Army Book-to-Roster-Guides navigation cycle is a failure of the fail-closed contract even when every individual transition uses location.replace(...).
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: Static-source inspection of the accepted T’au Empire Phone replacement-and-return control flow; per-book Phone evidence for replacement navigation and immediate initialization termination; executable missing, corrupt, wrong-faction, and ambiguous roster fixtures where already rejected by the book's accepted validator; real-browser evidence proving navigation to the canonical Roster Guides route, replacement-history semantics, absence of roster-scoped initialization, and valid-roster behavior. A bounded real-browser navigation trace proving that every invalid-roster handoff reaches one stable neutral destination without ping-pong, repeated automatic opening, or unbounded navigation events; Browser Back evidence proving replacement-history semantics; and a valid-roster control proving that explicit Open behavior still works.
- Book-specific extensions: A deterministic failure reason or roster identifier MAY be appended only through parameters that are not interpreted as automatic open commands.
## AB-ROSTER-005 — Attachment dependency behavior
- Level: MUST
- Normative requirement: Leader and Bodyguard compatibility and their presence in the same New Recruit roster MUST NOT be treated as confirmation of actual attachment; an ordinary Leader relation describes attachment eligibility, not attachment fact in a specific game, and attachment-dependent outputs MUST remain conditional unless the actual formation is explicitly confirmed by an authoritative structured formation source.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: deterministic roster relation artifacts covering compatible-but-unconfirmed units and any authoritative structured formation source used to confirm actual attachment.
- Book-specific extensions: none.

## AB-ROSTER-006 — Single resolved roster detachment
- Level: MUST
- Normative requirement: In roster context, only the single resolved roster Detachment may be used; missing or ambiguous Detachment resolution MUST fail-closed.
- Owner: book-local implementation
- Applicability: all Army Books
- Required evidence: roster detachment resolver traces and deterministic result snapshots.
- Book-specific extensions: none.

## AB-POPUP-001 — Root and nested popup opening
- Level: MUST
- Normative requirement: Opening a new external or root term MUST replace the entire previous root chain; opening a nested term MUST preserve every parent card and add exactly one deeper level; parent cards MUST NOT be removed or recreated without necessity.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: popup state-machine evidence and real-browser evidence covering root replacement, one-level nested append, and parent preservation.
- Book-specific extensions: book-specific popup templates and rendering strategies are allowed when chain semantics are preserved.

## AB-POPUP-002 — Popup scroll and geometry determinism
- Level: MUST
- Normative requirement: On opening, a popup MUST remain within the accessible viewport area and MUST NOT create horizontal overflow; on Phone it MUST NOT cover a required fixed header or safe area; desktop and Phone MAY use different positioning strategies; every open popup, modal, or drawer MUST apply a documented background scroll policy, and when that policy locks background scrolling, the lock MUST be deterministic and MUST be released on close; rapid opening and closing MUST NOT corrupt the popup chain. Phone and tablet Phone-view term popups MUST size to their content up to the accessible viewport limit. Short content MUST NOT produce a forced full-height empty panel; long content MUST use bounded internal scrolling while preserving header and safe-area clearance. Popup action groups MUST use responsive, readable controls across desktop, tablet, and Phone views. Actions MUST fill their available grid cells, MUST preserve a minimum accessible target height, and MUST collapse from equal-width columns to a single full-width column when the available popup width cannot support readable labels. On telephone-width Phone views, popup actions MUST use a single full-width column. Action labels, icons, and arrows MUST NOT clip or create horizontal overflow.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: real-browser automated integration or manual browser acceptance covering desktop and Phone viewport containment, horizontal overflow, fixed-header/safe-area clearance, background scroll policy, lock release, and rapid open/close sequences.
- Book-specific extensions: positioning algorithm, offsets, card count, timing, animation styling, and visual geometry may remain book-local within accessibility constraints.

## AB-POPUP-003 — Popup closure interactions
- Level: MUST
- Normative requirement: Escape MUST close only the top popup; close button at level N MUST close level N and all deeper levels; outside/backdrop interaction MUST close the root popup chain; internal interactions inside popup MUST NOT be treated as outside; focus MUST return to origin or safe fallback.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: interaction contract artifact and runtime tests/specs.
- Book-specific extensions: none.

## AB-HISTORY-001 — Browser history baseline
- Level: MUST
- Normative requirement: Normal browser history MUST remain a standard page stack; no new global router may replace browser URL/hash behavior; normal pages must remain addressable via query/hash/public URLs.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: navigation/runtime path map and back/forward behavior checks.
- Book-specific extensions: local route normalization permitted.

## AB-HISTORY-002 — Full-entry modal history
- Level: MUST
- Normative requirement: Browser history-backed full-entry states MUST support stack semantics where Browser Back closes the top history-backed full-entry state and restores focus to an acceptable origin/fallback.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: full-entry history artifact and runtime traces.
- Book-specific extensions: none.

## AB-HISTORY-003 — Full-entry internal stack separation
- Level: MUST
- Normative requirement: Full-entry internals MUST maintain a separate local LIFO stack for related records and must not replace normal browser history.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: full-entry controller artifact and route-behavior evidence.
- Book-specific extensions: local ordering policies may vary within contract.

## AB-HISTORY-004 — Journey Back
- Level: MUST
- Normative requirement: Journey Back MUST be an explicitly maintained local LIFO stack for defined transitions only and must restore exact scroll position, active navigation item, popup chain, focus, and highlight; if origin is missing, safe fallback behavior MUST apply.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: journey-controller artifacts and deterministic snapshots proving round-trip restoration.
- Book-specific extensions: scope of tracked transitions may be book-local.

## AB-HISTORY-005 — Popup navigation decoupling
- Level: MUST NOT
- Normative requirement: Browser Back MUST NOT be required for ordinary term popup closure.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: evidence matrix separating history-backed and non-history popup transitions.
- Book-specific extensions: none.

## AB-HISTORY-006 — Safe fallback behavior
- Level: MUST
- Normative requirement: If origin no longer exists, restoration MUST fail-safe without crash, focus MUST move to a safe fallback container/heading/documented fallback, and stale Journey entries MUST be completed fail-safely.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: defensive-state behavior proof and stale journey closure tests.
- Book-specific extensions: fallback targets may be localized.

## AB-GLOSSARY-001 — Canonical glossary records
- Level: MUST
- Normative requirement: Glossary records for every referenced term MUST be available in canonical glossary outputs and linked from content rendering.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: glossary inventory and render-link artifact.
- Book-specific extensions: optional local glossary grouping.

## AB-GLOSSARY-002 — Glossary return
- Level: MUST
- Normative requirement: Glossary-to-origin transition MUST preserve and restore call context where applicable and support focus return to the originating entry.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: glossary return traces and interaction artifacts.
- Book-specific extensions: context representation is implementation-local.

## AB-GLOSSARY-003 — Mega Glossary capability
- Level: MUST
- Normative requirement: Each Army Book MUST provide a transition to Mega Glossary, preserve source context for return when supported, maintain compatible URL/hash behavior, and support offline operation within cached canonical data.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: glossary navigation artifact and offline-capable route artifact.
- Book-specific extensions: local section grouping in Mega Glossary is permitted.

## AB-NAV-001 — Navigation determinism
- Level: MUST
- Normative requirement: Table of contents and rendered document MUST either share one canonical inventory or have deterministic one-to-one parity validation; each navigation item must map to a unique semantic scroll destination and semantic highlight destination, with section items resolving to headings and entity items resolving to entity cards.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: canonical navigation map and parity proof between TOC and rendered output.
- Book-specific extensions: none.

## AB-NAV-002 — Navigation state and rapid selection
- Level: MUST
- Normative requirement: Controlled scroll and focus restoration MUST be deterministic; rapid selections MUST leave only the latest destination active; intermediate sections MUST not flicker; transition cancellation MUST be handled.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: interaction scripts/reports and deterministic state transition tests.
- Book-specific extensions: local timing tuning allowed within user constraints.

## AB-NAV-003 — Scroll and active-item sync
- Level: MUST
- Normative requirement: Scrolling and active navigation state MUST synchronize to deterministic visible-destination rules and not depend on fixed timeout alone for correctness.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: runtime traces or evidence proving active-item mapping under real content.
- Book-specific extensions: none.

## AB-NAV-004 — Navigation completion criteria
- Level: MUST
- Normative requirement: Programmatic navigation MUST confirm actual arrival at a reachable semantic destination or equivalent deterministic completion condition; a fixed timeout alone MUST NOT be treated as successful completion.
- Owner: shared Army Book capability
- Applicability: all Army Books
- Required evidence: completion predicates and deterministic proof with accepted evidence artifacts.
- Book-specific extensions: implementation may choose specific arrival criteria consistent with semantics.

## AB-A11Y-001 — Focus and input safety
- Level: MUST
- Normative requirement: UI interactions MUST maintain predictable focus order and safe fallback focus targets to prevent focus loss across popup and navigation transitions.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: accessibility audit artifact and focus behavior evidence.
- Book-specific extensions: local focus ordering labels are allowed.

## AB-A11Y-002 — Overlay focus contract
- Level: MUST
- Normative requirement: Modal/full-entry/drawer overlays MUST provide required focus containment; non-modal term popups with `aria-modal=false` MUST NOT be required to trap focus; any overlay MUST define initial focus and safe focus return, and hidden drawers/navigation MUST be excluded from Tab order through `inert` or safe fallback behavior.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: accessibility test artifacts and runtime traces.
- Book-specific extensions: visual focus styling may vary.

## AB-A11Y-003 — Motion semantics
- Level: MUST
- Normative requirement: Motion must preserve semantic destination, active state, scroll restoration, focus restoration, popup state, and Back behavior when motion is reduced.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: a11y and motion test artifacts with reduced-motion scenarios.
- Book-specific extensions: local animation timing adjustments allowed.

## AB-A11Y-004 — Reduced motion
- Level: MUST
- Normative requirement: `prefers-reduced-motion` MUST disable or shorten non-essential animations while preserving destination, active state, focus behavior, scroll restoration, popup state, and Back behavior.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: reduced-motion test artifacts for desktop and Phone.
- Book-specific extensions: local animation policy mapping.

## AB-PHONE-001 — Desktop/Phone parity
- Level: MUST
- Normative requirement: Mobile/Phone behavior MUST be functionally equivalent to desktop for canonical contracts (rules, roster behavior, compatibility lookup, glossary, navigation, and Back behavior), with permitted UX-appropriate responsive differences. Phone Stratagem cards MUST preserve the same canonical type-based color mapping as desktop, including dynamically loaded Compatible Stratagems. ANY TURN, YOUR TURN, and THEIR TURN MUST remain available as semantic metadata and visible labels, but MUST NOT determine the card's primary color category.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: parity checks between desktop and Phone outputs.
- Book-specific extensions: responsive layout adaptations allowed.

## AB-PWA-001 — Offline and caching contract
- Level: MUST
- Normative requirement: Lightweight render-critical shell and canonical data MUST be available offline; previously saved routes MUST open after update; on-demand cache for heavy assets is allowed; heavy diagrams/source pages/scans must not be auto-downloaded without need; cache revision must update with changed route/content/runtime assets. When the contents of a fetch-loaded or app-shell asset change, every desktop and Phone consumer and the service-worker inventory MUST use a new matching versioned URL, and superseded URLs MUST NOT remain in the current app shell.
- Owner: generated content/build layer
- Applicability: all Army Books
- Required evidence: service worker/cache manifest and offline verification results.
- Book-specific extensions: book-local cache partitioning allowed.

## AB-QA-001 — QA taxonomy and publication prerequisites
- Level: MUST
- Normative requirement: QA for contracts MUST use only these categories: static-source-inspection, generated-artifact-validation, schema-data-qa, executable-unit-test, state-machine-test, dom-simulation-test, real-browser-automated-integration, manual-browser-acceptance, public-smoke, not-currently-verified, and MUST distinguish non-runnable tests.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: per-requirement evidence category assignments and accepted results.
- Book-specific extensions: additional internal categories are not permitted in canonical reporting.

## AB-QA-002 — Evidence record shape
- Level: MUST
- Normative requirement: For each requirement, QA evidence MUST record one or more approved evidence categories, exact evidence artifact/command/result, what is proven, what is not proven, and whether evidence is executed in the current audit or accepted from the same SHA.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: QA logs with explicit mapping fields for each requirement and category.
- Book-specific extensions: extra QA notes are optional.

## AB-QA-003 — Evidence sufficiency by complexity
- Level: MUST
- Normative requirement: State-machine or DOM simulation is sufficient for layout-independent logic; real-browser automated integration or manual browser acceptance is required for popup geometry, focus restoration, actual scroll restoration, active navigation during real scrolling, animations, reduced motion, viewport behavior, touch behavior, Phone layout, and service-worker/offline behavior.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: test artifacts covering these mandatory classes for each affected contract.
- Book-specific extensions: none.

## AB-QA-004 — Static source constraints
- Level: MUST NOT
- Normative requirement: Static source inspection alone MUST NOT be treated as proof of runtime behavior.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: explicit evidence-category distinctions where runtime proofs are required.
- Book-specific extensions: none.

## AB-QA-005 — QA evidence provenance
- Level: MUST
- Normative requirement: Static runtime-like artifacts must be validated with runtime/DOM tests where contract requires behavior, and publication readiness MUST reference executed evidence or explicit accepted evidence at same SHA.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: immutable QA evidence list and SHA lock.
- Book-specific extensions: review-specific supplemental evidence can be added.

## AB-PUBLISH-001 — Publication readiness gate
- Level: MUST
- Normative requirement: Publication-ready status MUST require all applicable critical blockers to be resolved and genuinely inapplicable requirements to be recorded as `not-applicable`, including blockers for source manifest, canonical inventory, completed Wahapedia parity for all comparable rule-bearing layers, factual resolution, update/FAQ/Errata parity, current official points provenance, resolved or explicitly excluded gaps, deterministic build, Compatible Rules, roster fail-closed, desktop, Phone, Browser/full-entry history, Journey Back, popup behavior, Glossary return, accessibility, offline/PWA, executed QA, manual browser acceptance, clean tree, and final read-only diff audit.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: publication gate artifact with all blockers and pass/fail rationale.
- Book-specific extensions: additional local publication checks are allowed.

## AB-PUBLISH-002 — Blueprint baseline status
- Level: MUST
- Normative requirement: This blueprint is the canonical baseline; book-local normative specs may extend it only with explicit references, without weakening canonical requirements.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: cross-reference evidence of canonical ID usage by book-local docs.
- Book-specific extensions: allowed if explicitly cited.

## AB-PUBLISH-003 — No framework prohibition
- Level: MUST NOT
- Normative requirement: This contract MUST NOT prohibit book-local normative specs that are compliant, evidence-backed, and non-conflicting.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: book-local spec references and evidence of non-conflict.
- Book-specific extensions: book-local extensions explicitly documented.

## AB-PUBLISH-004 — Final read-only audit requirement
- Level: MUST
- Normative requirement: Final publication gate MUST include a read-only diff audit with immutable evidence and explicit blocker statuses.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: read-only audit output and blocker registry.
- Book-specific extensions: none.

## AB-PUBLISH-005 — SHA-bound evidence summary
- Level: MUST
- Normative requirement: A SHA-bound evidence summary MUST identify audited commit, exact artifact paths, executed commands/results, accepted prior evidence on the same SHA, and remaining blockers.
- Owner: shared product shell
- Applicability: all Army Books
- Required evidence: publication summary artifact and evidence manifest with commit hash.
- Book-specific extensions: additional local evidence links permitted.
