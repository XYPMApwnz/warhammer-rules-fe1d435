# Warhammer Rules Library product structure

Warhammer Rules Library is a local-first Warhammer 40,000 11th Edition reference.
The product favors stable public URLs, frozen source data and small deterministic
builds over a universal Army Book framework.

## Product spaces

### Library

The Library is the stable entry point for Core Rules, Army Books, Roster Guides and
Mega Glossary. A book can be listed as soon as it satisfies the `PREVIEW` gate in
`docs/ARMY_BOOK_BLUEPRINT.md`.

### Core Rules

Core Rules provide the shared rules reference and canonical glossary targets used by
Army Books. Army Books may link to Core Rules but must not silently redefine them.

### Army Books

An Army Book presents the available faction rules, Detachments, Stratagems,
Enhancements and Datasheets. Desktop and Phone may use different book-local code when
that is simpler, but they preserve the same rule-bearing content and public routes.

### Roster Guides

Roster Guides use locally saved roster data. Roster support is optional per Army Book.
Books that support it accept only their own faction, fail closed on invalid input and
do not corrupt or silently rewrite saved data.

### Mega Glossary

Mega Glossary provides canonical term records and return links. Army Books reuse these
records rather than creating alternate definitions for shared terms.

## Product contracts

### URL compatibility

Existing public Library, Core Rules, Army Book, Datasheet, Phone, Roster Guide and
Glossary URLs remain compatible. Query and hash context is preserved where the current
feature requires it.

### Local-data compatibility

User rosters and other browser-local data remain readable across normal updates.
Invalid records fail safely and are not rewritten merely to satisfy a route.

### PWA and offline behavior

The repository has one global PWA lifecycle. Versioned production assets and generated
routes remain refreshable without manual storage clearing, and supported cached pages
remain available offline.

### Source hierarchy

Official frozen sources take precedence over community or secondary evidence.
Secondary data can support a Preview but cannot by itself establish publication
readiness. Known gaps remain explicit and rule-bearing text is never reconstructed from
memory.

## Readiness statuses

### PREVIEW

The required content builds and the Library, reader, navigation, desktop and Phone
paths are usable without fatal errors. Optional capabilities may be absent.

### FUNCTIONAL

The book satisfies `PREVIEW` and every capability it advertises, including Roster or
Compatible Rules when present, works through its normal user flow. This status does
not imply complete source authority.

### PUBLICATION-READY

The book has completed `FULL QA`, has authoritative source coverage for its publication
claim and has deterministic release outputs. Public preview availability alone does
not grant this status.

## Development path

The normal path for another Army Book is intentionally short:

```text
data
-> build
-> preview checks
-> Library
```

Source extraction and `FULL QA` are run when their inputs or publication claim change.
Do not create a new runtime, report generator, matcher or conformance layer solely to
add another book.