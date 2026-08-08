# Army Book Blueprint

This document is a practical checklist for adding and maintaining Warhammer 40,000
11th Edition Army Books. It defines three independent levels of readiness without
prescribing a specific implementation.

- `PREVIEW` is the minimum gate for adding a book to the Library.
- `OPTIONAL` capabilities are required only when a book claims to support them.
- `FULL QA` is the separate source and publication gate.

Death Guard is a useful production reference, not a mandatory implementation
specification. Prefer existing shared components when they are already simpler than
book-local code, but do not introduce a framework solely to make books look alike.

# PREVIEW

## PREVIEW-001 - Faction identity and source honesty

The book MUST identify the correct faction and Warhammer 40,000 11th Edition source
layer. Rule-bearing content MUST come from a frozen repository source and MUST NOT be
invented. Community or secondary evidence MUST remain visibly distinct from official
authority, and known source gaps MUST remain explicit.

## PREVIEW-002 - Required Army Book content

The Library entry and reader MUST expose the available canonical Army Rules,
Detachments, Detachment Rules, Stratagems, Enhancements and Datasheets. Required
sections MUST use stable identifiers and preserve canonical text and order.

## PREVIEW-003 - Content presentation

Rule-bearing content MUST remain readable without changing its meaning. Weapon
abilities MUST remain atomic labels, Stratagem types and timing MUST remain visible
and separate, and cards, tables and controls MUST not create horizontal overflow at
the supported desktop and Phone widths.

## PREVIEW-004 - Deterministic build

Authoritative sources and existing builders MUST deterministically produce the
tracked reader and Phone outputs. A completed build followed by its existing check
MUST report no stale generated output. Generated files MUST NOT be edited manually.

## PREVIEW-005 - Reader, Library and navigation

The Library MUST open the Army Book, direct public URLs MUST remain valid, and the
reader MUST navigate to its major sections and Datasheets. Navigation, query and hash
state MUST not depend on timing delays, hidden DOM mutation or hover-only behavior.

## PREVIEW-006 - Desktop and Phone

Desktop and Phone views MUST present the same rule-bearing text, identifiers and
ordering. Both views MUST be readable and usable with their existing keyboard, mouse
and touch interactions. A separate Phone implementation MAY remain book-local when
that is simpler than adding shared infrastructure.

## PREVIEW-007 - Runtime safety

Opening the Library, Core Rules and the Army Book MUST not produce fatal runtime or
navigation errors. Existing glossary links and basic offline/PWA loading MUST remain
usable. A Preview check SHOULD be small and behavior-oriented; publication evidence
and exhaustive browser matrices do not belong in the normal development gate.

# OPTIONAL

Optional capabilities do not block `PREVIEW` when they are absent or visibly disabled.

## OPTIONAL-001 - Roster support, if supported

Roster behavior is required only when the book advertises it. It MUST accept only the
correct faction, select the intended units and Detachment, fail closed on invalid or
ambiguous input, avoid redirect loops and preserve saved user data. It MUST NOT expose
results from another faction or corrupt an existing roster record.

## OPTIONAL-002 - Compatible Rules, if supported

Compatible Rules are required only when the book advertises them. Mapping MUST be
deterministic, applicability MUST NOT be invented, and unresolved context MUST remain
unresolved rather than being guessed. A book without Compatible Rules can still be a
valid Preview.

# FULL QA

`FULL QA` is independent from ordinary Preview development and MUST NOT block work on
the next Preview Army Book.

## FULL-QA-001 - Source parity and updates

Full QA MUST compare the implemented rule-bearing inventory with the available frozen
sources, close out applicable FAQ, errata and update records, and record unresolved
source-authority gaps without reconstructing missing rules.

## FULL-QA-002 - Extended product verification

Full QA MUST run the applicable extended browser, responsive, roster, Compatible
Rules, glossary and offline/PWA checks. It MAY retain detailed source and investigation
tests that are intentionally excluded from the normal Preview gate.

## FULL-QA-003 - Publication decision

`PUBLICATION-READY` requires authoritative source completeness, deterministic release
outputs and a recorded publication decision. A working public Preview or a
`FUNCTIONAL` book MUST NOT be represented as publication-ready while source gaps
remain.