# Codex repository map

Use this map before broad discovery. Paths are repository-relative. Read the root and nearest scoped `AGENTS.md` first.

## Supported scope

The public/offline product contains nine Army Books: Death Guard, Adeptus Mechanicus, Tyranids, T'au Empire, Emperor's Children, Chaos Space Marines, Space Marines, Dark Angels, and Blood Angels. `books/orks/` is held and participates only in configured source-freshness reporting.

## Source ingestion and accepted inputs

- **Primary paths:** `books/source-ingestion-contract.json`, `books/publication-inventory.json`, `books/*/sources/source-manifest.json`, configured `books/*/sources/` and `books/*/content/` files.
- **Factual owner:** the source role declared by each `book.config.json`, manifest, and ingestion binding.
- **Main consumers:** canonical adapters and the shared Army Book builder.
- **Common tasks:** provenance checks, frozen-source adjudication, extractor `--check`, explicit capture/update review.
- **Normal QA:** `npm run qa:sources`, then the affected `qa:<book>`.
- **Expand scope when:** a shared ingestion contract or authenticated dependency changes. Never use a live update for a normal build.

## Canonical and effective model

- **Primary paths:** `books/shared/tools/canonical-build-contract.mjs`, `canonical-join-contract.mjs`, `effective-book-model.mjs`, `build-effective-book.mjs`, and `build-army-book.mjs`.
- **Factual owner:** accepted source records after canonical identity assignment; `wh40k-effective-book-model/v1` is the validated downstream boundary.
- **Main consumers:** rendering, effects, roster catalogs, points projections, glossary projections, and generated publication.
- **Common tasks:** identity joins, dependency overlays, projection validation, deterministic build checks.
- **Normal QA:** affected `qa:<book>` plus the relevant subsystem command.
- **Expand scope when:** a shared primitive changes or a dependency book consumes the changed partition.

## Standard shared Army Books

- **Primary paths:** each `books/<book>/book.config.json`, accepted local sources, and `books/shared/tools/build-army-book.mjs`.
- **Factual owner:** configured local and dependency sources projected through the effective model.
- **Main consumers:** shared structured publication, roster, points, glossary, target catalog, and mobile routes.
- **Common tasks:** local source/content fixes, build checks, local effect or presentation checks.
- **Normal QA:** the matching `npm run qa:<book>`.
- **Expand scope when:** the defect is in `books/shared/` or changes an inherited source.

## Space Marines family

- **Primary paths:** `books/space-marines/`, `books/dark-angels/`, `books/blood-angels/`, their configs, and dependency declarations.
- **Factual owner:** Space Marines owns shared records; supplements own local records, exclusions, overrides, and dependency policy.
- **Main consumers:** SM, DA, and BA effective models and publications.
- **Common tasks:** source normalization, inherited membership, local precedence, attachments, effects, and points.
- **Normal QA:** `qa:sm`; add `qa:da` and `qa:ba` when inherited semantics can change.
- **Expand scope when:** shared identities, exclusions, overrides, relations, Detachments, Enhancements, effects, or points are affected.

## Death Guard special path

- **Primary paths:** `books/death-guard/tools/canonical-source-adapter.mjs`, `tools/presentation-hook.mjs`, configured `content/`, `sources/`, and `presentation/`.
- **Factual owner:** validated effective facts; presentation contracts own layout/presentation metadata only.
- **Main consumers:** DG reader, roster/runtime, popup/glossary projection, mobile routes.
- **Common tasks:** source adapter corrections, physical loadout/effect fixes, presentation-hook defects.
- **Normal QA:** `npm run qa:dg`; add `qa:effects` or `qa:glossary` when those partitions change.
- **Expand scope when:** a proven shared runtime or global glossary mechanism is involved.

## Adeptus Mechanicus special path

- **Primary paths:** `books/adeptus-mechanicus/tools/canonical-source-adapter.mjs`, configured content/sources, and the shared structured renderer.
- **Factual owner:** accepted AM records normalized before effective-model validation.
- **Main consumers:** AM publication, roster composition/effects, and canonical glossary projection.
- **Common tasks:** adapter parity, multi-profile/loadout behavior, Detachment/Enhancement projection.
- **Normal QA:** `npm run qa:am`; add `qa:effects` or `qa:glossary` when applicable.
- **Expand scope when:** the failing mechanism is shared rather than AM source normalization.

## Effects

- **Primary paths:** `books/shared/tools/effect-contract.mjs`, `books/*/sources/*effect-contracts*.json`, `books/shared/effect-contract-runtime.js`.
- **Factual owner:** source-owned structured effect contracts; runtime code implements generic operations.
- **Main consumers:** provider/runtime projection, roster cards, selected wargear, attachments, and publication references.
- **Common tasks:** selector/scope/condition corrections and generic interpreter fixes.
- **Normal QA:** `npm run qa:effects` plus each affected book command.
- **Expand scope when:** a shared operation or selector changes behavior in multiple books.

## Points

- **Primary paths:** `books/shared/tools/effective-points-projection.mjs`, `roster-guides/effective-points-catalog.mjs`, accepted per-book points sources.
- **Factual owner:** canonical/effective pre-render point records.
- **Main consumers:** `roster-guides/build-points.mjs`, roster assessment, and publication metadata.
- **Common tasks:** exact ID/value joins, Detachment/Enhancement point projection.
- **Normal QA:** `npm run qa:points` plus the affected book command.
- **Expand scope when:** dependency inheritance or shared point validation changes.

## Roster Guides and runtime

- **Primary paths:** `roster-guides/`, `books/shared/roster-context.js`, `roster-parser.js`, `roster-entities.js`, and presentation helpers.
- **Factual owner:** canonical/effective records; parsed selections and battle/attachment state are runtime state.
- **Main consumers:** roster guide, book reader overlays, effect providers, and assessment.
- **Common tasks:** parsing, canonical resolution, attachments, selected loadout, runtime projection.
- **Normal QA:** `npm run qa:roster` plus affected book QA; use targeted browser QA for rendered-runtime defects.
- **Expand scope when:** shared runtime or a faction-specific contract is implicated.

## Glossary

- **Primary paths:** `glossary/tools/build-glossary.mjs`, `check-glossary.mjs`, `editorial-contracts.v1.json`, and canonical book glossary projections.
- **Factual owner:** Core/book canonical facts and explicitly reviewed editorial contracts.
- **Main consumers:** generated registry, aliases, contexts, viewer, and book popups.
- **Common tasks:** projection ownership, editorial summary maintenance, identity/navigation checks.
- **Normal QA:** `npm run qa:glossary`; regeneration uses `node glossary/tools/build-glossary.mjs --no-cache-write` unless cache work is explicitly authorized.
- **Expand scope when:** a contributing book projection or viewer integration changes.

## Publication, rendering, offline, and mobile

- **Primary paths:** `books/shared/tools/render-structured-effective-book.mjs`, book presentation hooks, `publication-inventory.mjs`, `tools/build-offline-mobile-routes.mjs`, and `books/*/mobile/build.mjs`.
- **Factual owner:** the final effective model and declared publication metadata.
- **Main consumers:** readers, book indexes, mobile compatibility routes, Library, service worker.
- **Common tasks:** render checks, route inventory, offline membership, UI wiring.
- **Normal QA:** `npm run qa:publication`; add `qa:integration` for wiring.
- **Expand scope when:** shared rendering, APP_SHELL, Library membership, or route generation changes.

## Tests

- **Primary paths:** `tests/`, `tests/browser/`, `books/*/tests/`, and `books/*/mobile/qa.mjs`.
- **Owner:** tests validate production contracts; they do not define gameplay facts.
- **Common tasks:** focused semantic regressions and real-consumer mutation controls.
- **Normal QA:** consult `docs/codex/QA_MATRIX.md` and `npm run qa:help`.
- **Expand scope when:** the implementation surface or dependency graph expands.

## Generated and heavy paths

- **Generated book outputs:** `books/*/reader.html`, `index.html`, `scripts/data.js`, `scripts/target-data.js`, `scripts/roster-data.js`, `mobile/*.html`, and declared `generated/` outputs.
- **Generated global outputs:** `glossary/registry.en.json`, `aliases.en.json`, `contexts/`, `generated/`, and `roster-guides/points-data.js`.
- **Heavy/non-source paths:** `node_modules/`, `tmp/`, rendered pages, screenshots, reports/captures, media under `assets/`, and large pinned raw inputs.
- **Normal search policy:** search the named source/config/producer/test roots first. Add generated paths only for a named output or consumer trace.
- **Do not globally ignore:** accepted `sources/`, `content/`, manifests, configs, or generated files required by build checks.

## Targeted search patterns

Replace `<term>` and `<book>`; narrow the final `tests` root to named files as soon as the consumer is known.

```powershell
# Book-local facts and producers
rg <term> books/<book>/book.config.json books/<book>/content books/<book>/tools books/<book>/tests tests -g '!**/mobile/*.html' -g '!**/generated/**' -g '!**/scripts/data.js' -g '!**/scripts/target-data.js' -g '!**/scripts/roster-data.js'

# Shared runtime
rg <term> books/shared books/extensions tests -g '!tests/browser/**'

# Roster runtime
rg <term> roster-guides books/shared books/<book>/scripts tests -g '!roster-guides/points-data.js' -g '!**/scripts/roster-data.js' -g '!tests/browser/**'

# Glossary ownership and viewer
rg <term> glossary books/<book>/content books/<book>/tools tests -g '!glossary/generated/**' -g '!glossary/registry.en.json' -g '!glossary/contexts/**' -g '!tests/browser/**'
```

For source work, explicitly include only active paths named by the book config and manifest. Large pinned source files remain searchable when they are the task; they are merely excluded from routine discovery.
