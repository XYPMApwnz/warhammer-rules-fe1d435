# Emperor's Children Compatible Rules parity

Scope: 23 current Codex datasheets. Imperial Armour and Legends inventories are both zero.

## Frozen inventory

- 10 Detachments: 4 official Faction Pack v1.0 and 6 secondary Codex carry-forward Detachments.
- 15 official Faction Pack Stratagems with complete local `WHEN`, `TARGET` and `EFFECT` fields.
- 10 Core Stratagem IDs from the local Core Rules render.
- 34 Enhancements: 10 official Faction Pack entries and 24 secondary BSData carry-forward entries.
- 3 official UPGRADE Enhancements.

## Source authority

The local Faction Pack v1.0 PDF and its 17 updates are the only primary faction source in this stage. The 23 datasheets, 6 Codex Detachments, 24 Codex Enhancements and their points remain explicitly secondary BSData carry-forward data. The current official MFM snapshot is not stored locally.

Wahapedia is used only for datasheet-to-Stratagem candidate associations. It is not used as canonical rule text. The frozen snapshot contains 96 associations for the 15 official faction Stratagems and 162 Core associations.

Wahapedia also exposes 444 candidate associations for 36 Codex carry-forward Stratagem names. Those names have no complete fixed local full-text source and are therefore recorded in the gap/import reports and excluded from the matrix.

## Corrections

The disabled legacy matcher adds nine faction pairs beyond the snapshot. All nine require a possible Leader/Bodyguard attachment and are retained only as `attachment-unknown` conditional rows.

Eight additional Core pairs are likewise possible only after an attachment assignment: five Epic Challenge pairs and three Explosives pairs. They are conditional; the matrix does not infer an actual Attached Unit.

## Enhancement ownership

The owner matrix contains all 34 Enhancement records and explicitly separates primary and secondary authority.

- 7 official standard Enhancements produce 15 owner associations.
- 3 official UPGRADE Enhancements produce 3 unit-owner associations.
- 23 secondary standard Enhancements with existing local owner contracts produce 115 associations.
- Faultless Opportunist has no verifiable owner restriction and is excluded as one unresolved owner record.

Every standard owner group uses `subject: model` and excludes EPIC HERO. Every UPGRADE uses `subject: unit`, `maxOwners: 3`, one Enhancement choice and points paid per owner. The three UPGRADE point values remain unresolved because the official MFM snapshot is absent.

## Preliminary matrix

- 23 datasheets.
- 105 faction rows: 96 match and 9 attachment-unknown conditional.
- 170 Core rows: 162 match and 8 attachment-unknown conditional.
- 133 Enhancement rows: 130 standard and 3 UPGRADE.
- 408 total rows: 391 match and 17 conditional.

No runtime, reader, Phone, roster, service-worker or UI file is changed by this data-only stage.
