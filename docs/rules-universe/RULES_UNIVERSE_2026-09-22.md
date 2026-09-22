# Warhammer 40,000 11th Edition Rules Universe

Inventory cutoff: **2026-09-22**
Repository baseline: `5540970d60b31d756b98a4df8fb33a87977b9459`

This is a source and factual-ownership inventory outside the already accepted Core Rules and nine effective Army Books. It is not an implementation specification.

## Executive findings

- The Munitorum Field Manual (MFM) is an independent mutable factual domain. It owns points, cost tiers, paid upgrades, Leader/Support eligibility, Detachment Points, Force Dispositions, current priced inventory, and some live list-building qualifiers.
- The current standard mission source is the **Chapter Approved Mission Deck 2026–27**. Its complete 88-card and ten-page rules content is enrolled for factual modeling through per-record official, physical-corroborated and accepted secondary evidence; the complete first-party physical/app corpus remains unavailable.
- Standard play keeps mission, Deployment card, optional Twist, and terrain choice modular. The Event Companion instead publishes 45 composed layouts embedding deployment zones, objectives, and terrain.
- Core owns terrain and objective-marker semantics. Mission/layout sources own selection, geometry, placement, and scoring facts.
- Event, Doubles, Teams, and Dominatus companions are scoped overlays and must never become standard-game defaults.
- Dominatus, Combat Patrol, current Boarding Actions material, Apocalypse, Armoured Gauntlet, and current narrative campaigns are separate modes/domains.
- Glossary V2 can start with accepted Core and effective Army facts. The Chapter Approved source corpus is now ready for later mission modeling; other missing mode corpora still block an all-modes glossary, not that bounded foundation.

## Official artifact registry

| ID | Artifact | Date/status | Factual scope | Official source | Repository coverage |
|---|---|---|---|---|---|
| `mfm-live` | Interactive Munitorum Field Manual | 2026-09-02, CURRENT | Points, tiers, upgrades, Leader/Support eligibility, DP, Force Dispositions, current inventory/qualifiers | https://mfm.warhammer-community.com/en | Nine supported faction captures dated 2026-08-27; global/current coverage PARTIAL |
| `mfm-contract` | New app for a new edition | 2026-06-17, CURRENT context | Defines MFM ownership and live/app synchronization | https://www.warhammer-community.com/en-gb/articles/dv1aslrr/new40k-new-app-for-a-new-edition/ | No local copy |
| `mfm-july` | July Update | 2026-07-22, SUPERSEDED | Points, DP, disposition changes | https://www.warhammer-community.com/en-gb/articles/rgqanids/warhammer-40000-july-update-what-you-need-to-know/ | Partial dated captures |
| `mfm-august` | August Update | 2026-08-26, current for supported nine at cutoff | Global MFM/balance state | https://www.warhammer-community.com/en-gb/articles/b4zj2o7u/the-warhammer-40000-august-update-everything-you-need-to-know/ | Nine v1.3 captures |
| `mfm-september` | Orks points live | 2026-09-02, CURRENT global mutation | Orks points, Legends support, Orks dispositions | https://www.warhammer-community.com/en-gb/articles/x82yzzth/codex-orks-points-are-live-on-the-munitorum-field-manual/ | Orks intentionally unsupported; no current accepted capture |
| `ca-2026-27` | Chapter Approved Mission Deck 2026–27 | 2026-06-13, CURRENT | Standard Primaries, Secondaries, Deployment, Twists, setup/scoring | https://www.warhammer.com/shop/warhammer-40k-chapter-approved-mission-deck-2026-eng | SOURCE EVIDENCE COMPLETE FOR MODELING; production model MISSING |
| `ca-overview` | Chapter Approved deck overview | 2026-05-28, CURRENT context | Fixed/Tactical Secondaries, score caps, card relationships | https://www.warhammer-community.com/en-gb/articles/p3i6aa3h/the-chapter-approved-deck-what-is-it-and-how-does-it-work/ | ACCEPTED CORROBORATION |
| `mission-dispositions` | How your army affects your mission | 2026-04-03, CURRENT context | Five dispositions and directed Primary generation | https://www.warhammer-community.com/en-gb/articles/oefzq9fg/new40k-how-your-army-affects-your-mission/ | ACCEPTED CORROBORATION |
| `war-journal` | 11E War Journal/app | 2026-06, CURRENT projection | Mission generator, scoring, layouts, mustering views | https://www.warhammer-community.com/en-gb/articles/dv1aslrr/new40k-new-app-for-a-new-edition/ | App payload inaccessible |
| `terrain-update` | Updated terrain rules | 2026-06, CURRENT | Terrain semantics; owner remains Core | https://www.warhammer-community.com/en-gb/articles/xlppkx5s/new40k-take-cover-with-updated-terrain-rules/ | Core model present |
| `terrain-objectives` | Terrain & Objectives / Area Set | 2026-06, CURRENT play aid | Sixteen standard footprints in five types | https://www.warhammer-community.com/en-gb/articles/lxzwueun/new40k-terrain-objectives-make-the-battlefield-your-mission/ | Layout model MISSING |
| `event-companion` | Event Companion v1.2 | 2026-08-26, CURRENT EVENT_ONLY at 2026-09-22 cutoff | Sequence, card FAQ/errata, 45 layouts including 27 explicitly updated layouts, terrain, objectives, deployment, base-size guide | https://assets.warhammer-community.com/eng_wh40k_event_companion-pl87i44rzn-a7ieny8i9x.pdf | v1.2, superseded v1.1 and v1.0 authenticated locally; production layout model MISSING |
| `doubles-companion` | Doubles Event Companion v1.0 | 2026-06-12, EVENT_ONLY | Shared force, CP/VP/turns, cross-army semantics/restrictions | https://assets.warhammer-community.com/eng_12-06_warhammer40000_doubles_event_companion-xyapytrwkz-9a6fljmnob.pdf | MISSING |
| `teams-companion` | Teams Event Companion v1.0 | 2026-06-12, EVENT_ONLY | Pairing modules, faction/disposition frequency, layout choice, ranking | https://assets.warhammer-community.com/eng_12-06_warhammer40000_teams_event_companion-3pq1qxo6kv-96smptwn3u.pdf | MISSING |
| `dominatus-event` | Dominatus Event Companion v1.0 | 2026-06-12, EVENT_ONLY | Event adaptation, pairings, phase timing, upgrade limits | https://assets.warhammer-community.com/eng_12-06_warhammer40000_dominatus_event_companion-i9vapqcbqf-zuit0tso2r.pdf | MISSING |
| `dominatus` | Dominatus Deck | 2026, MODE_SPECIFIC | Alliances, phases, locations, agendas, upgrades, relics, ascendancy | https://www.warhammer-community.com/en-gb/articles/kjdzbnvr/run-a-campaign-in-a-weekend-with-the-dominatus-deck/ | Full deck MISSING |
| `combat-patrol` | Combat Patrol Companion/app | 2026-07-22, MODE_SPECIFIC | Patrol rules, forces and War Journal missions | https://www.warhammer-community.com/en-gb/articles/rgqanids/warhammer-40000-july-update-what-you-need-to-know/ | MISSING/app inaccessible |
| `dread-incursions` | 500 Worlds: Titus — Dread Incursions | 2026-01, MODE_SPECIFIC | Updated Boarding Actions core, 12 missions, campaigns, lists | https://www.warhammer-community.com/en-gb/articles/ra4pksny/500-worlds-titus-fight-deadly-boarding-actions-on-necron-terrain-with-dread-incursions/ | MISSING |
| `vespator` | War on the Vespator Front | 2026, MODE_SPECIFIC | Map campaign, operations, infrastructure, alliances, missions | https://www.warhammer-community.com/en-gb/articles/oq2wdapz/500-worlds-titus-will-you-brave-a-deadly-campaign-on-the-war-torn-vespator-front/ | MISSING |
| `raid-ruin` | Maelstrom — Raid and Ruin | 2026, MODE_SPECIFIC | 12 missions, notoriety, 3/4-player support | https://www.warhammer-community.com/en-gb/articles/w4kpa40k/the-new-year-preview-enter-the-lair-of-the-tyrant/ | MISSING |
| `crucible` | Maelstrom — Crucible of Champions | 2026, MODE_SPECIFIC | Custom-character construction by consent | https://www.warhammer-community.com/en-gb/articles/zivixehm/bring-your-own-warlords-to-life-with-custom-character-rules-in-the-maelstrom-crucible-of-champions/ | MISSING |
| `apocalypse` | Eye of Terror: Reign of Iron — Apocalypse | 2026-04, MODE_SPECIFIC | Large-game construction/play | https://www.warhammer-community.com/en-gb/articles/di79mrzj/new-apocalypse-rules-make-gigantic-battles-easy/ | MISSING |
| `armoured-gauntlet` | Armageddon: Return of Yarrick — Armoured Gauntlet | 2026, MODE_SPECIFIC | Vehicle/Monster damage, upgrades, 12 missions, campaigns | https://www.warhammer-community.com/en-gb/articles/apbymsj6/ace-tanks-spearhead-vehicular-carnage-with-new-armoured-gauntlet-rules/ | MISSING |
| `boarding-actions-2024` | Boarding Actions Compendium | 2024, LEGACY_PREVIOUS_EDITION | Older Boarding Actions corpus | https://www.warhammer-community.com/en-gb/articles/vcjrpRwv/paint-a-space-hulk-red-with-brutal-close-range-brawls-in-the-new-boarding-actions-supplement/ | Do not use as current root |
| `crusade-10e` | Generic Crusade framework | 10E, UNCLEAR | Generic Crusade progression | Official source varies | No verified global 11E currentness |
| `space-marine-operations` | Space Marine Operations parts 1–2 | 2025-12, UNCLEAR | Cooperative scenario mode | https://assets.warhammer-community.com/eng_18-12_wh40k_otherrules_white_dwarf_space_marine_operations_pt1-npihhgutd0-irggicsq4w.pdf and https://assets.warhammer-community.com/eng_18-12_wh40k_otherrules_white_dwarf_space_marine_operations_pt2-g2uo399grq-fc0d8b8s5l.pdf | No explicit 11E currentness |
| `tacoma-faq` | Warhammer Open Tacoma FAQ | 2026-07, EVENT_ONLY expired | Named-event FAQ only | https://assets.warhammer-community.com/articles/0-2026/july/wc06-07/faq-warhammer-open-tacoma-dtb3ingprd-cvcl2agtfd.pdf | Event-only evidence registered |
| `ca-2025-26` | Chapter Approved 2025–26 | 10E, LEGACY_PREVIOUS_EDITION | Older mission pack | Official product remains discoverable | Do not mix with 11E |
| `pariah-nexus` | Pariah Nexus Mission Deck | 10E, LEGACY_PREVIOUS_EDITION | Older mission pack | Official product remains discoverable | Do not mix with 11E |
| `leviathan` | Leviathan Mission Deck | 10E, LEGACY_PREVIOUS_EDITION | Older mission pack | Official product remains discoverable | Do not mix with 11E |

The official 11E launch explicitly carries recent campaign supplements forward: https://www.warhammer-community.com/en-gb/articles/ctdexme4/warhammer-40000-the-new-edition-is-revealed-at-adepticon-preview-2026/

## Domain ownership map

| Domain | Authoritative source | Facts | Independent | Repository status |
|---|---|---|---|---|
| MFM army construction | Live official MFM | Points/tiers/upgrades, relations, DP, disposition, current qualifiers/inventory | YES | PARTIAL globally; main numeric projection present for nine books |
| Standard missions | CA 2026–27 cards | Setup, Primaries, Secondaries, Twists, scoring | YES | SOURCE READY; production model MISSING |
| Deployment | CA Deployment cards; Event layouts in event scope | Zone identity/geometry/orientation/compatibility | YES | SOURCE READY; production model MISSING |
| Terrain layouts | Event Companion and CA recommendations | Battlefield, footprints, positions, light/dense categories | YES | MISSING |
| Objective layout | Relevant Deployment/layout artifact | Positions/designation; Core owns marker semantics | Source-owned subdomain, not proven global reusable entity | MISSING |
| Event overlays | Four companions and named FAQs | Sequence, selection, scoring, pairing, construction, FAQ, base guidance | YES, scoped | MISSING |
| Physical model/base metadata | Event base guide + accepted model sources | Event standard base size or `Unique` | YES with explicit scope | PARTIAL/inconsistent |
| Dominatus | Physical deck | Alliance campaign state and cards | YES | MISSING |
| Combat Patrol | Official companion/app | Patrol forces/rules/missions | YES | MISSING |
| Boarding Actions | Dread Incursions | Close-quarters rules/lists/missions/campaign | YES | MISSING |
| Narrative campaigns | Current supplements | Maps, operations, resources, alliances, notoriety, custom characters | YES by system | MISSING |
| Apocalypse | Reign of Iron | Large-game mode | YES | MISSING |
| Armoured Gauntlet | Return of Yarrick | Vehicle/Monster mode | YES | MISSING |
| Cooperative Operations | Official PDFs | Cooperative scenarios/automation | CANDIDATE pending currentness | MISSING |
| Digital projections | App / War Journal | Views, generators, scoring and app-only surfaces | NO when projection; YES for proven app-only payload | MISSING/inaccessible |
| Update channels | Errata, FAQ, Universal updates, balance documents | Patches to owner-domain facts | NO | Non-Core registry missing |

## MFM ownership and coverage

The official MFM contract expressly includes unit/upgrade points, exact squads each Leader and Support character can join, Detachment Points, and Force Dispositions. Current pages also expose Detachment uniqueness tags, Enhancement eligibility qualifiers, and current/Legends priced grouping.

The nine local v1.3 captures contain 372 units, 644 unit cost rows/schedules, 25 paid-wargear records, 102 Detachments with DP/disposition, 356 Enhancement prices, 62 Leader records/256 edges, and 3 Support records/16 edges. Relation capture is incomplete: Death Guard, Adeptus Mechanicus, T'au Empire, and Dark Angels have no local MFM relation fields; Space Marines omits published Support rows. Active tags such as `AUXILIARY`, `BATTLESUIT`, and `NIGHTMARE` are omitted. Effective Army Books may contain accepted equivalents, but MFM remains the upstream current owner.

MFM does not own datasheet characteristics, weapons, abilities, keywords, Enhancement gameplay prose, Detachment/Stratagem/Army Rule prose, missions, layouts, or application canonical IDs.

## Current mission corpus observations

The five dispositions are Take and Hold, Purge the Foe, Disruption, Reconnaissance, and Priority Assets. Their directed combinations produce 25 Primaries:

- Battlefield Dominance.
- Immovable Object / Unstoppable Force.
- Determined Acquisition / Death Trap.
- Purge and Secure / Reconnaissance Sweep.
- Inescapable Dominion / Secure Asset.
- Meatgrinder.
- Punishment / Delaying Action.
- Consecrate / Triangulation.
- Destroyer's Wrath / Vital Link.
- Outmanoeuvre.
- Smoke and Mirrors / Surveil the Foe.
- Locate and Deny / Extract Relic.
- Gather Intel.
- Search and Scour / Vanguard Operation.
- Sabotage.

The 15 unordered disposition pairs each have three A/B/C Event layouts, yielding 45. Primary and Secondary scoring cap at 45 VP each; Battle Ready adds 10 VP in the event sequence. Standard play uses separate Deployment cards and optional Twists. Event layouts embed deployment and objective placement and exclude those cards.

The enrolled evidence corpus contains all 25 Primary, 18 Secondary, six Deployment, five Force Disposition and six Twist semantic records, plus ten booklet sections. It accounts for all 88 physical cards and preserves the 5x5 directed Primary matrix, 11 Objective Action-backed Primary identities, current official FAQ overlays and all six Deployment geometries. The physical Chapter Approved product remains the factual owner; accepted secondary content remains explicitly secondary and does not override official sources.

## Observed mission/layout relationship

```text
MFM Detachment -> Force Disposition
two dispositions -> two directed Primaries
standard CA selection -> Secondary set + Deployment card + optional Twist
recommended standard layout -> compatible terrain arrangement

unordered disposition pair -> three A/B/C Event layouts
event layout -> deployment geometry + objectives + terrain footprints/categories
directed disposition -> each player's Primary
```

Mission, Deployment, and terrain layout are reusable many-to-many entities in standard play. Event deployment, objective placement, and terrain are tightly coupled inside the layout. Objective-marker semantics remain Core; mission owns scoring; the source layout owns positions.

## Cross-domain ownership risks

| Fact | Authoritative owner | Projection/corroboration | Risk |
|---|---|---|---|
| Leader/Support eligibility | Current MFM roster contract | Army sources/effective relations | HIGH: manifests call MFM points-only and captures omit rows |
| Points/upgrades/Enhancement costs/DP | MFM | Effective Army, points, roster, publication | Controlled by exact-ID projection; upstream must remain MFM |
| Force Disposition | MFM | Army Detachment and mission generator | MEDIUM: missions consume, never own |
| Detachment live restrictions | MFM overlay; Army source owns base rule | Army contracts | HIGH when live restrictions change |
| Enhancement qualifiers | Canonical Enhancement, with MFM live qualifier | Roster projection | MEDIUM/HIGH if labels replace IDs/selectors |
| Priced faction/Legends grouping | MFM for grouping; Army/Legends for gameplay | Publication inventory | HIGH |
| Terrain semantics | Core | Layout legends | HIGH if copied as rules |
| Terrain positions/categories | Layout source | Renderer | HIGH if inferred from artwork |
| Objective semantics | Core | Mission | MEDIUM |
| Objective placement | Deployment/layout | Renderer | HIGH |
| Mission scoring | CA card, amended by scoped FAQ | War Journal/Event projection | HIGH |
| Base size | Event Companion for event use | Army metadata/UI | HIGH if promoted globally |
| Campaign Detachment gameplay | Army source | Campaign view | MEDIUM |

## Supersession and scope

```text
10E PDF MFM -> LEGACY
11E MFM launch -> July -> August v1.3 -> live 2026-09-02

Leviathan -> Pariah Nexus -> CA 2025–26 -> LEGACY_PREVIOUS_EDITION
CA 2026–27 -> CURRENT standard mission pack

Event v1.0 -> Event v1.1 -> Event v1.2 current at 2026-09-22 cutoff
Doubles/Teams/Dominatus Event v1.0 -> CURRENT scoped overlays at cutoff

Boarding Actions Compendium 2024 -> previous-edition root
Dread Incursions 2026 -> current optional updated/reprinted Boarding Actions source
```

Event Companion v1.0 is superseded by v1.1, which is superseded by v1.2. The official Warhammer Community Downloads catalog identifies v1.2 as updated on 2026-08-26, and no official v1.3 or later replacement applicable by the 2026-09-22 cutoff was found. Version 1.2 contains all 45 event layouts and identifies 27 as updated. Named event FAQs remain bounded to their event/date.

## Repository gaps and implementation order

**Present with factual model:** Core terrain/objective semantics; nine-book MFM points, costs, Enhancement prices, DP and disposition projections.

**Partial:** global MFM corpus/history; MFM relations/qualifiers/grouping; base metadata and event provenance. Current Event Companion v1.2 and Chapter Approved 2026–27 are enrolled as source evidence but have no production mission/layout model.

**Missing:** CA production mission/card model, Deployment model, standard casual terrain layouts, production event layouts, Doubles/Teams/Dominatus overlays, Dominatus deck facts, Combat Patrol, current Boarding Actions/campaigns/Apocalypse/Armoured Gauntlet, and a general non-Core/non-Army source registry beyond the current missions source manifest.

Recommended order:

1. Extend the existing source registry pattern to other non-Core/non-Army domains with artifact identity, retrieval date/hash, scope and supersession.
2. Treat the enrolled CA 2026–27 evidence corpus as the bounded accepted input; retain its per-record authority and do not upgrade secondary evidence to official.
3. Model missions, then reusable Deployment records and source-owned relationships in a separate production task.
4. Model the authenticated Event v1.2 snapshot as the current-at-cutoff event deployment/objective/terrain composition; retain v1.1 and v1.0 only as versioned history.
5. Add scoped Event, Doubles and Teams overlays.
6. Run a separate bounded MFM convergence for relations and live qualifiers without reopening this inventory.
7. Add event-scoped base metadata.
8. Ingest Dominatus after obtaining the complete deck; layer its Event Companion separately.
9. Add separate modes independently: Combat Patrol, Boarding Actions, campaigns, Apocalypse, Armoured Gauntlet.
10. Keep unclear/legacy sources quarantined until currentness is proven.

## Glossary V2 readiness

`GLOSSARY_V2_SAFE_TO_START_NOW=YES` with a strict initial boundary: accepted effective Core plus the nine effective Army Books. Missing domains block a universal all-modes 11E glossary, not the Core/Army glossary foundation. Provenance and scope must be explicit so later mission/event/campaign terms cannot be mistaken for standard/Core facts.

Before claiming a complete all-modes glossary, model the enrolled CA/Event facts and obtain the full Dominatus deck, app-only Combat Patrol facts, and accepted current separate-mode sources.
