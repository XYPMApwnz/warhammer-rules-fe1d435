# Standard 11E Missions Source Acquisition

Cutoff: **2026-09-22**
Start commit: `3eae0c34a6ca7c487cfd45c61388578714d7c928`

This ledger records source acquisition and exact gaps only. It does not define a production mission schema or transcribe copyrighted card bodies.

## Local evidence before acquisition

Already present:

- The 11E rules-universe inventory and URL-level source metadata.
- A URL-only Event Companion entry in the Core source registry, scoped as event evidence.
- Nine accepted MFM v1.3 captures containing 102 Detachment Force Disposition records.
- Core terrain and objective-marker semantics.

Missing:

- Every Chapter Approved 2026-27 physical card/reference source capture.
- Event Companion local artifact and hash.
- Standard Deployment, Twist, Secondary and casual layout corpus.
- An authenticated War Journal/app export.

## Newly authenticated artifacts

```text
SOURCE_ID=wh40k-11e-event-companion-v1.2-2026-08-26
TITLE=Warhammer 40,000 Event Companion
PUBLISHER=Games Workshop
VERSION=1.2
DATE=2026-08-26
SOURCE_CLASS=official-pdf
SCOPE=EVENT_ONLY
OFFICIAL_URL=https://assets.warhammer-community.com/eng_wh40k_event_companion-pl87i44rzn-a7ieny8i9x.pdf
OFFICIAL_CATALOG=https://www.warhammer-community.com/en-gb/downloads/warhammer-40000/
OFFICIAL_CATALOG_API=POST https://www.warhammer-community.com/api/search/downloads/
CATALOG_RECORD_LAST_UPDATED=2026-08-26
LOCAL_ARTIFACT=missions/sources/warhammer-40000-event-companion-v1.2-2026-08-26.pdf
HASH_SHA256=1F44D9FA0297F60BE6C4367041A65D1A98710C68B221D8C8E22ECD1674E7525E
BYTE_SIZE=10665731
RETRIEVED_AT=2026-09-22
CURRENT_STATUS=CURRENT_AT_2026_09_22
SUPERSEDES=wh40k-11e-event-companion-v1.1-2026-07-22
SUPERSEDED_BY=
PAGES=93
DOCUMENT_VERSION_MARKER=VERSION 1.2
EVENT_LAYOUTS=45
EXPLICITLY_UPDATED_LAYOUTS=27
```

```text
SOURCE_ID=wh40k-11e-event-companion-v1.1-2026-07-22
TITLE=Warhammer 40,000 Event Companion
PUBLISHER=Games Workshop
DATE=2026-07-22
SOURCE_CLASS=official-pdf
SCOPE=EVENT_ONLY
OFFICIAL_URL=https://assets.warhammer-community.com/eng_22-07_warhammer_40,000_event_companion-alyapl19us-b2drgwkji4.pdf
LOCAL_ARTIFACT=missions/sources/warhammer-40000-event-companion-v1.1-2026-07-22.pdf
HASH_SHA256=97AE5591BE2E58BDB636E97127EAC0877F9BF28B29FC607ED4EAD4D377FB8F20
RETRIEVED_AT=2026-09-22
CURRENT_STATUS=SUPERSEDED
SUPERSEDES=wh40k-11e-event-companion-v1.0-2026-06-12
SUPERSEDED_BY=wh40k-11e-event-companion-v1.2-2026-08-26
PAGES=93
```

```text
SOURCE_ID=wh40k-11e-event-companion-v1.0-2026-06-12
TITLE=Warhammer 40,000 Event Companion
PUBLISHER=Games Workshop
DATE=2026-06-12
SOURCE_CLASS=official-pdf
SCOPE=EVENT_ONLY
OFFICIAL_URL=https://assets.warhammer-community.com/eng_12-06_warhammer40000_event_companion-s3bfb5f9s1-ivswuij3fo.pdf
LOCAL_ARTIFACT=missions/sources/warhammer-40000-event-companion-v1.0-2026-06-12.pdf
HASH_SHA256=0E26F6586929E7EC4C50C6A17D240ED794BB7B6C654D1D9664FB908ABC606A19
RETRIEVED_AT=2026-09-22
CURRENT_STATUS=SUPERSEDED
SUPERSEDES=
SUPERSEDED_BY=wh40k-11e-event-companion-v1.1-2026-07-22
PAGES=93
```

The official Warhammer Community Downloads catalog returned v1.2 as the current Warhammer Event Companion at the 2026-09-22 cutoff. The PDF identifies itself as `VERSION 1.2`; the official catalog record is dated 2026-08-26. No official v1.3 or later replacement applicable by the cutoff was found. The organiser-resources page still links to v1.1, but that historical link does not override the newer live Downloads catalog record.

The v1.2 `WHAT'S NEW` section updates the Determine a Layout step and Chapter Approved errata/FAQs. Printed page 7 lists 27 updated layouts. The document recommends cycling layouts A, B and C sequentially and repeating that sequence as needed for the number of event rounds.

## Chapter Approved 2026-27 completeness

| Family | Status | Accepted evidence | Boundary |
|---|---|---|---|
| Primary Missions | PARTIAL | Official Event layout headings authenticate all 25 directed identities/mappings; Event FAQ authenticates limited fragments | Full rules and individual scoring bodies require physical cards |
| Secondary Objectives | PARTIAL | Official articles and Event Companion authenticate Fixed/Tactical workflow and shared caps | Full identities, conditions and VP bodies unavailable |
| Deployment cards | UNAVAILABLE | Product/release pages confirm the card family and app projection | Complete identities, geometry, measurements and mappings unavailable |
| Force Disposition cards | PARTIAL | MFM and Event Companion authenticate disposition identities and event relationships | Complete authoritative card corpus unavailable |
| Twists | PARTIAL | Official sources authenticate the optional system and examples | Full identities and text unavailable |
| Standard mission sequence | PARTIAL | Official mission article exposes the public setup flow | Complete standard reference booklet unavailable |
| Standard scoring rules | PARTIAL | Public 45 VP source caps, 15 VP per-round caps and Fixed/Tactical mechanics | Card-specific scoring and complete standard reference unavailable |
| Force Disposition to Primary mapping | COMPLETE | Official Event Companion layout headings | Identity relationship complete; Primary bodies remain partial |
| Event mission sequence | COMPLETE | Event Companion pp. 1-3 | Event-only |
| Event scoring framework | COMPLETE | Event Companion pp. 1-3 | Event-only |

The official product/release confirmation is:
https://www.warhammer-community.com/en-gb/articles/adciuo3f/saturday-pre-orders-new40k-rules-card-packs-and-more/

The official system and sequence context is:
https://www.warhammer-community.com/en-gb/articles/p3i6aa3h/the-chapter-approved-deck-what-is-it-and-how-does-it-work/
https://www.warhammer-community.com/en-gb/articles/oefzq9fg/new40k-how-your-army-affects-your-mission/

## Event layout authentication

The current Event Companion v1.2 contains the complete event layout snapshot applicable at the cutoff:

```text
EVENT_LAYOUT_ARTIFACT_V1_2=COMPLETE_45
CURRENT_AT_CUTOFF=2026-09-22
EXPLICITLY_UPDATED_LAYOUTS=27
UNORDERED_FORCE_DISPOSITION_PAIRINGS=15
VARIANTS_PER_PAIRING=A,B,C
BATTLEFIELD=44 by 60 inches
LAYOUT_PAGES=printed pages 9-53
RELATIONSHIPS_VERIFIED=YES
CURRENT_2026_09_22_EVENT_CORPUS=AUTHENTICATED
```

Each layout page supplies:

- two Force Dispositions and their directed Primary Mission identities;
- variant A, B or C;
- Attacker and Defender deployment geometry/orientation;
- objective types and positions;
- terrain footprint/component placement;
- dense/light terrain classification;
- measurements and layout-specific geometry.

The PDF defines the footprint inventory as four 6x4-inch, two 10x2.5-inch, four 6x2-inch, four 7x11.5-inch, and two 8x11.5-inch polygon terrain areas.

The Event Companion expressly excludes standard Deployment and Twist cards. Event layouts therefore do not close the standard-play source gaps. Version 1.2 closes the August event-layout gap only; it does not supply the complete Chapter Approved standard mission corpus.

## Source ownership

- Core Rules own terrain feature and objective-marker semantics.
- Chapter Approved owns standard mission cards, standard Deployment/Twist facts, standard scoring and casual maps.
- Event Companion owns event deployment geometry, objective placement, terrain footprint/category placement, and event-sequence modifications.
- MFM owns each Detachment's Force Disposition.
- No evidence supports inventing one global Objective Layout owner.

## Digital/app check

```text
DIGITAL_SOURCE=Warhammer 40,000 app / War Journal
ACCESS=UNAVAILABLE
PROVENANCE=Official articles confirm mission generation, layout/deployment presentation and score tracking
```

No authenticated downloadable payload or reliably capturable endpoint was found. No further reverse engineering was attempted.

## Physical-only source requirement

```text
PHYSICAL_PRODUCT=YES
PRODUCT_NAME=Warhammer 40,000: Chapter Approved Mission Deck 2026-27
CURRENT_OFFICIAL_EXISTENCE_CONFIRMED=YES
FULL_CONTENT_PUBLICLY_ACCESSIBLE=NO
USER_SOURCE_NEEDED=YES
```

To close the standard corpus, provide complete legible scans/photos or an official PDF containing:

- both faces where applicable of every Primary Mission card;
- every Secondary Objective card;
- every Deployment card;
- every Force Disposition card;
- every Twist card;
- every page of the instruction/reference booklet;
- all standard casual terrain/objective maps;
- packaging/product identification sufficient to authenticate the capture.

Promotional crops, community transcriptions and fuzzy screenshots are not accepted substitutes.

## Exact gap ledger

### GAP-CA-PRIMARY-BODIES

```text
DOMAIN=PRIMARY_MISSIONS
CONTENT=Full rules, conditions, timing and scoring for all current Primary cards
EXPECTED_OFFICIAL_OWNER=Chapter Approved Mission Deck 2026-27 Primary cards
BEST_AVAILABLE_EVIDENCE=25 identities/mappings in official Event layouts plus limited FAQ fragments
WHY_NOT_ACCEPTED=Identity headings do not contain the complete gameplay body
WHAT_WOULD_CLOSE_GAP=Complete legible current Primary cards
```

### GAP-CA-SECONDARY-CORPUS

```text
DOMAIN=SECONDARY_OBJECTIVES
CONTENT=Complete identities, conditions, timing and scoring
EXPECTED_OFFICIAL_OWNER=Chapter Approved Mission Deck 2026-27 Secondary cards
BEST_AVAILABLE_EVIDENCE=Official Fixed/Tactical workflow and scoring caps
WHY_NOT_ACCEPTED=No complete official public card corpus
WHAT_WOULD_CLOSE_GAP=Complete legible current Secondary cards
```

### GAP-CA-DEPLOYMENT

```text
DOMAIN=DEPLOYMENT
CONTENT=Identities, geometry, measurements, orientation, objectives and compatibility
EXPECTED_OFFICIAL_OWNER=Chapter Approved Mission Deck 2026-27 Deployment cards
BEST_AVAILABLE_EVIDENCE=Official confirmation of the card family and app projection
WHY_NOT_ACCEPTED=Event geometry is event-owned and cannot substitute for standard cards
WHAT_WOULD_CLOSE_GAP=Complete legible current Deployment cards
```

### GAP-CA-FORCE-DISPOSITIONS

```text
DOMAIN=FORCE_DISPOSITION_CARDS
CONTENT=Complete authoritative rules, relationships and presentation for all current Force Disposition cards
EXPECTED_OFFICIAL_OWNER=Chapter Approved Mission Deck 2026-27 Force Disposition cards
BEST_AVAILABLE_EVIDENCE=MFM identities plus Event Companion mission/layout relationships
WHY_NOT_ACCEPTED=The complete authoritative Force Disposition card corpus is not publicly accessible
WHAT_WOULD_CLOSE_GAP=Complete legible current Force Disposition cards
```

### GAP-CA-TWISTS

```text
DOMAIN=TWISTS
CONTENT=Complete identities, conditions and gameplay text
EXPECTED_OFFICIAL_OWNER=Chapter Approved Mission Deck 2026-27 Twist cards
BEST_AVAILABLE_EVIDENCE=Official optional-system description and isolated examples
WHY_NOT_ACCEPTED=Examples do not establish the complete corpus
WHAT_WOULD_CLOSE_GAP=Complete legible current Twist cards
```

### GAP-CA-REFERENCE

```text
DOMAIN=MISSION_SEQUENCE_AND_SCORING
CONTENT=Complete standard setup sequence, shared procedures and scoring
EXPECTED_OFFICIAL_OWNER=Chapter Approved 2026-27 instruction/reference booklet
BEST_AVAILABLE_EVIDENCE=Official articles plus the distinct event sequence
WHY_NOT_ACCEPTED=Event adjustments and promotional summaries are not the full standard reference
WHAT_WOULD_CLOSE_GAP=Every page of the current reference booklet
```

### GAP-CA-STANDARD-LAYOUTS

```text
DOMAIN=STANDARD_TERRAIN_AND_OBJECTIVE_PLACEMENT
CONTENT=Complete casual recommended maps and their Deployment relationships
EXPECTED_OFFICIAL_OWNER=Chapter Approved 2026-27 cards/reference material and authenticated app projection
BEST_AVAILABLE_EVIDENCE=Official articles confirm their existence; Event layouts are complete but separately scoped
WHY_NOT_ACCEPTED=No complete standard map corpus is publicly accessible
WHAT_WOULD_CLOSE_GAP=All standard casual terrain/objective maps with associated card identities
```

### GAP-EVENT-AUGUST-LAYOUTS — CLOSED

```text
DOMAIN=EVENT_LAYOUTS
CONTENT=Layout geometry changes announced in the official August 2026 update
EXPECTED_OFFICIAL_OWNER=Current Warhammer 40,000 app/Event Companion revision
ACCEPTED_EVIDENCE=Official Event Companion v1.2 PDF from the live Warhammer Community Downloads catalog
CURRENTNESS=Current at the 2026-09-22 cutoff; catalog last updated 2026-08-26; no later official replacement found
LAYOUTS=45
EXPLICITLY_UPDATED_LAYOUTS=27
STATUS=CLOSED
```

### GAP-CA-DIGITAL

```text
DOMAIN=DIGITAL_PROJECTION
CONTENT=Authenticated current War Journal mission/deployment/layout payload
EXPECTED_OFFICIAL_OWNER=Official app projection
BEST_AVAILABLE_EVIDENCE=Official feature announcement
WHY_NOT_ACCEPTED=No sanctioned, stable, authenticated payload was accessible
WHAT_WOULD_CLOSE_GAP=Sanctioned complete app export/capture; physical corpus is sufficient instead
```

## Modeling readiness

```text
PRIMARY_MISSIONS=NO
SECONDARIES=NO
DEPLOYMENT=NO
FORCE_DISPOSITION_CARD_CORPUS=NO
TWISTS=NO
EVENT_LAYOUTS=YES_FOR_CURRENT_V1_2_AT_2026_09_22
TERRAIN_PLACEMENT=YES_FOR_CURRENT_EVENT_V1_2 / NO_STANDARD
OBJECTIVE_PLACEMENT=YES_FOR_CURRENT_EVENT_V1_2 / NO_STANDARD
MISSION_SEQUENCE_AND_SCORING=YES_EVENT / NO_STANDARD
```

The source-acquisition result remains `BLOCKED_PHYSICAL_SOURCE_GAP` for the complete standard mission corpus. Event v1.2 is authenticated as the current Event Companion at the 2026-09-22 cutoff and is ready for explicitly scoped event modeling. Complete Chapter Approved Primary, Secondary, Deployment, Force Disposition, Twist, reference, scoring and standard-layout sources remain unavailable.
