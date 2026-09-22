# MFM factual domain contract

The current Warhammer 40,000 11th Edition Munitorum Field Manual flows through one factual boundary:

`accepted official MFM v1.4 captures → explicit canonical MFM identities and facts → createEffectiveMfmCatalog() → future consumers`

The nine enrolled `official-mfm-v1.4.json` captures own the current MFM facts. The identity registry owns only persistent opaque canonical IDs and exact bindings to accepted source locators. Display labels and prose never generate identities. Missing, duplicate, renamed, or otherwise unmatched source locators fail closed and require explicit identity adjudication.

Canonical record classes are explicit faction pricing groups, unit references, unit point records with model-count schedules, paid upgrades, Leader eligibility, Support eligibility, Detachments with Detachment Points and Force Disposition references, Enhancement costs, and qualifier records. Every record retains the official source ID, v1.4 fingerprint, authority, cutoff, currentness, and exact source locator.

`CURRENT` and `LEGENDS` are explicit unit-price and relation statuses. The default effective catalog includes only current records. `CURRENT_AND_LEGENDS` includes both while preserving each record's status. Detachment, Enhancement, qualifier, and Force Disposition assignment facts are current MFM facts and are common to both catalog scopes.

MFM owns each Detachment's assignment to a stable `force-disposition-*` reference. Missions owns Force Disposition concepts, mission matrices, and layout semantics. Neither domain copies the other's facts.

This foundation does not migrate Army Book, roster, Missions, Glossary, or UI consumers. Its records expose stable IDs, labels, types, references, factual values, and provenance for future consumer migrations and Glossary indexing.
