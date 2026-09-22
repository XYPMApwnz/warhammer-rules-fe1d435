# Mission factual domain contract

This directory defines the canonical factual model for the current Warhammer 40,000 11th Edition standard mission corpus at the 2026-09-22 cutoff. The contract supports both `REPRESENTATIVE_FOUNDATION` fixtures and the production `FULL_CURRENT_CORPUS` snapshot.

## Lifecycle

```text
accepted mission sources
  -> canonical mission facts
  -> scoped effective mission catalog
  -> future Glossary V2 / Mission Assistant / Game Assistant
```

Generated UI and visual reference assets are consumers. They never own mission facts.

## Partitions

The canonical model keeps these partitions separate:

- `forceDispositions`: one semantic identity per Force Disposition, including physical multiplicity and directed Primary matrix relations.
- `primaryMissions`: structured scoring, timing, caps and a parent-owned Objective Action where a card back supplies one.
- `secondaryMissions`: one gameplay identity shared by Attacker and Defender presentation copies, with Fixed/Tactical eligibility and structured action/scoring facts.
- `deployments`: standard-play battlefield setup entities with their own geometry contract.
- `twists`: optional standard-play rules, tables/options and rules-relevant Designer's Notes.
- `missionSequenceRules`: normalized mission stages rather than a copied booklet blob.
- `missionReferenceRules`: Appendix/reference rules that apply across missions, including scoring terminology and mission-wide reference semantics.
- `forceDispositionMatchups`: unordered Event-layout identity. Directed Primary selection remains separate.
- `terrainLayouts`: Event-only A/B/C records, official source registration and a machine-geometry envelope.
- FAQ and Event sequence overlays: typed operations applied without mutating canonical records.

## Stable identity

Canonical IDs are explicit semantic identifiers. They never depend on array order, mutable prose, image names, URLs or label normalization. Matchup identity is calculated from sorted Force Disposition IDs, so A+B and B+A resolve to one record. Nested Objective Action IDs are parent-scoped because the same action label or ID may legitimately appear on different cards.

## Authority and provenance

Every record references a provenance profile and carries a source record ID, locator, scope and amendment list. A profile distinguishes:

- the official source that owns a fact;
- the evidence source used to recover its content;
- the evidence authority and class;
- version, effective date and currentness.

Secondary content evidence remains `secondary`; official corroboration does not promote it. Event Companion v1.2 owns only Event sequence/layout facts and official FAQ overlays. Historical v1.0/v1.1 remain enrolled in `missions/sources/source-manifest.json` as superseded sources.

## Standard and Event scopes

`STANDARD_MATCHED_PLAY` includes Chapter Approved Deployment-card and optional-Twist stages. `EVENT_PLAY` applies Event Companion v1.2 and uses its Determine a Layout path; it does not leak those Event-only choices into standard play.

## Geometry

The geometry envelope uses inches and an explicit origin, axes and battlefield dimensions. It supports:

- point, circle, rectangle and polygon shapes;
- deployment zones and territories;
- objective positions;
- terrain-area footprints, classes, component codes and orientation;
- endpoint-bound measurement constraints;
- authenticated raster/PDF registration metadata.

All six Deployment cards and all 45 Event v1.2 layout pages are source-registered, but deployment zones, objective positions, irregular terrain-footprint polygons and measurement endpoints are marked `SOURCE_REGISTERED_PENDING_VERIFIED_DIGITIZATION`. This is deliberate: the repository has authenticated source rasters and visual parity evidence, not an accepted vector digitization. No approximate GDM coordinates are promoted into canonical facts.

GDM assets are stored only in `visualReferences` with `factualAuthority: false`. Official Event Companion geometry wins on every conflict.

## Effective catalog API

`createEffectiveMissionCatalog({scope, asOf, canonicalFacts})` validates and clones canonical input, applies exact typed overlays, sorts deterministically and deep-freezes output. It exposes:

- `catalog`: scoped immutable partitions;
- `getById(id)`;
- `getPrimaryForForceDispositions(playerId, opponentId)`;
- `getLayoutsForMatchup(forceDispositionA, forceDispositionB)`.

The assembler never mutates canonical input and never joins by display title.

## Current corpus coverage

`FULL_CURRENT_CORPUS` contains 5 Force Dispositions, 25 semantic Primary Missions, 18 semantic Secondary Missions, 6 Deployments, 6 Twists, 18 normalized mission-sequence components, 5 Appendix/reference rules, 15 unordered Force-Disposition matchups and 45 Event Companion v1.2 layouts. The 30 physical Primary cards, 36 physical Secondary cards, 10 physical Force-Disposition cards, 6 Deployment cards and 6 Twist cards account for all 88 cards without turning physical duplicates or card backs into duplicate semantic identities.
