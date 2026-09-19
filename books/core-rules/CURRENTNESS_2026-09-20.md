# Core Rules corpus reconciliation — 2026-09-20

This is an evidence ledger, not a gameplay source. The source-owned changes are in `content/core-rules.current-official.en.json`; the artifacts inspected are registered in `content/core-official-source-registry.en.json`. The original printed Core, the accepted older digital snapshot, current global GW updates, event rulings, faction corroboration and secondary mirrors retain distinct authority and scope.

## Current-source check and precedence

No September **general** Core/balance update, new downloadable comprehensive Appendix, or new public global Core FAQ was found by 20 September. The GW Downloads index dates the online MFM to 2 September; the GW Orks article ties that refresh to Codex: Orks points and app content. This is not a global Core-rule amendment. The August update article still describes the next monthly balance pass as forthcoming. The official app may contain changes not exposed on the public site: the June Event Companion identifies the app as the home of the comprehensive Appendix and FAQ, but no reliable current GW app text/API capture was available.

The global [Universal Rules Updates v1.1](https://assets.warhammer-community.com/eng_wh40k_core&key_universal_rules_updates-lu3grocned-rphh78bl6k.pdf), legal from 26 August, supersedes v1.0 **for the four retained clauses** and adds the Disembark move-type mapping. Its fifth clause is now a separate effective update record. The [July article](https://www.warhammer-community.com/en-gb/articles/rgqanids/warhammer-40000-july-update-what-you-need-to-know/) supplies the narrower current revival and extra-CP clarifications. The original [Core PDF](https://assets.warhammer-community.com/eng_01-06_warhammer40k_new40k_core_rules-was6fbu1ix-hfewhmxyiy.pdf) remains the global source wherever no applicable later source changes it. The [Tacoma FAQ](https://assets.warhammer-community.com/articles/0-2026/july/wc06-07/faq-warhammer-open-tacoma-dtb3ingprd-cvcl2agtfd.pdf) expressly governs that event; it cannot supersede global Core rules. A secondary mirror never outranks an applicable official GW fact. These are record- and scope-specific edges, not a rule that the newest date wins.

## Candidate ledger

Source IDs below refer to the structured registry. `CURRENT_SECONDARY_CORROBORATED` identifies wording/compatibility taken from a secondary record whose underlying mechanic is independently confirmed by a global GW fact; it is **not** represented as verbatim GW app text.

| Rule ID | Audit claim / sources checked | Latest applicable authority and supersession | Status | Rationale and action |
| --- | --- | --- | --- | --- |
| 01.02.06 | Global two-way equal split, including impossible prescribed size with attached Leader/Support. `gw-core-original-2026-06-01`, `gw-drukhari-pack-2026-06-09`, `gw-sororitas-pack-2026-06-11`, `gdm-app-export-2026-08-26-v931`. | Original global Core remains; faction packs prove equal splits only in their own rules. GDM reports later global app erratum but not independently authenticated. | EVIDENCE_PENDING | Faction examples do not prove the universal Leader/Support edge. No text change. |
| 12.08 | Extra Ongoing Consolidation after-move fight selection. Original GW Core, accepted digital, GDM v931 and current secondary mirrors. | Original GW and accepted digital remain; GDM reports a later erratum not found in an accessible global GW source. | EVIDENCE_PENDING | Do not silently promote the secondary after-move clause. |
| 13.09 | Hidden extends to light or dense terrain. Original GW p50, GDM/current mirrors. | Original global GW text is dense-only. No later applicable official change captured. | EVIDENCE_PENDING | Current secondary light/dense wording would replace, rather than merely explain, the official wording. No edit. |
| 15.05 | Grenade(s) Stratagem legacy name resolves to Explosives. Original GW Core, Imperial Agents pack, Tacoma FAQ, current Waha Core. | Official global original owns Explosives gameplay; the faction legacy reference and event FAQ corroborate the compatibility concept, while Waha gives the current alias wording. No global gameplay supersession. | CURRENT_SECONDARY_CORROBORATED | Added search/compatibility aliases only. Canonical 15.05 text and identity unchanged; Tacoma has event scope only. |
| 17.03 | Main sentence explicitly excludes Blast attacks into engaged Monster/Vehicle. Original GW main rule and p88 Blast FAQ, current Waha erratum, 40k.app mirror. | The original global FAQ directly prohibits the interaction; current secondary erratum inserts that same exclusion in the main sentence. | CURRENT_SECONDARY_CORROBORATED | Corrected **main-rule** first sentence with explicit secondary wording provenance, independently supported by GW's global FAQ. The FAQ remains a separate clarification. |
| 18.04.01 | Rapid Disembark limitations get a numbered app identity. Original GW p65 and accepted 18.04 already contain the mechanic; GDM v946 reports the new ID. | Original global text confirms gameplay, but the new standalone app identity is secondary-only. | EVIDENCE_PENDING | Existing 18.04 semantics retained. No duplicate rule invented solely from the reported ID. |
| 18.05 | Emergency fallback: try unengaged setup, then engaged setup, then destroy if still impossible. Original GW p65; current Waha/40k.app secondary text. | Original global GW printed rule lacks the engaged fallback. | EVIDENCE_PENDING | Later effective erratum is plausible but lacks an independently captured globally applicable GW source/corroboration. |
| 18.06 | Assault Disembark full move definition. August v1.1 and GDM v931/Waha move text. | `gw-universal-rules-updates-2026-08-26-v1-1` **officially confirms the ID and trigger**: normal-moving Transport plus permission to charge after disembarking. Full move definition remains secondary. | EVIDENCE_PENDING | Official trigger is now published as a Universal Update; no separately authenticated full 18.06 sequence added. |
| 18.07 | Shock Disembark full move definition. August v1.1 and GDM v931/Waha move text. | August v1.1 **officially confirms the ID and trigger**: advancing Transport plus permission to disembark. Full move definition remains secondary. | EVIDENCE_PENDING | Secondary after-move paragraph appears copied from Consolidation and is internally suspect for embarked passengers. Do not invent a repair. |
| 22.03.01 | Psychic abilities with a Psychic Level cannot be repeated by a Psyker unit in one phase. Original printed Appendix, GDM v931, current secondary Appendix. | Current comprehensive Appendix is app-only; no independent current GW text/corroboration captured. | EVIDENCE_PENDING | No new rule record. |
| 24.11.01 | Only Extra Attacks weapons clarification. Existing digital snapshot; current secondary Appendix. | Already in accepted digital Core, no newer contrary official fact. | ALREADY_CURRENT | Identity and semantics retained; secondary provenance remains explicit. |
| 24.26.01 | Multiple One Shot weapons clarification. Existing digital snapshot; current secondary Appendix. | Already in accepted digital Core, no newer contrary official fact. | ALREADY_CURRENT | Identity and semantics retained; secondary provenance remains explicit. |

The printed original Core lacks 01.02.06, 18.06, 18.07, 22.03.01, 24.11.01 and 24.26.01 as numbered entries. Their app/digital identities must never be misattributed to that PDF. Original GW p88 contains five FAQ answers; the source registry keeps that FAQ partition separate from main rules and errata.

## Disembark family

`18.04` already contains Rapid Disembark and its Ingress restrictions. `18.05` retains the original printed Emergency sequence pending a trustworthy later global erratum. The accepted August Universal Update now links the two **official** triggers to 18.06 and 18.07; it does not print their complete move sequences. GDM/Waha provide a plausible 18.06 sequence, but their 18.07 after-move text refers to passengers starting the move engaged, a suspect copy from Consolidation. The secondary FAQ that every disembark move counts as having disembarked that turn is not independently confirmed by GW. **Family status: PARTIAL.** No contradictory secondary move sequence was introduced into the effective Core.

## FAQ family ledger

Five launch FAQs are `OFFICIAL_GW_CONFIRMED`: no-ranged-weapons shooting/action eligibility; two distinct Blast/engaged Monster-or-Vehicle cases; Overrun Fight eligibility; Scout move followed by Embark. They retain their original page-88 FAQ identities and are not rewritten as main rules.

The following 23 later/current FAQ candidates remain global `EVIDENCE_PENDING` rather than being attributed to the official app. Tacoma and Event Companion corroborations have only their declared event scopes. GDM v931 reports twelve new FAQ answers, while Waha FAQ blocks include apparent third-party editorial prose, so neither is a reliable verbatim GW app capture.

| FAQ family | Direct GW evidence, if any | Current global FAQ disposition |
| --- | --- | --- |
| Battle-shock / Actions | Original main rules | Pending exact FAQ |
| Damage changed to zero timing | Original attack sequence | Pending exact FAQ |
| Multi-word keyword matching | Original keyword rules | Pending exact FAQ |
| Leader attachment: MFM vs datasheet | Current online MFM lists attachments | Pending precedence FAQ |
| Unit Coherency / mission objective | Original main rules | Pending exact FAQ |
| Targeting: visible model vs model in range | Original targeting/visibility | Pending exact FAQ |
| Critical Hits / Snap Shooting | Original Snap Shooting | Pending exact FAQ |
| Insane Bravery on already Battle-shocked unit | Original main rule/Stratagem | Pending exact FAQ |
| Embarked abilities / Not On Battlefield | Tacoma p5 only | Event-only answer; global pending |
| Attached Unit destroyed-model keywords | Tacoma p5 only | Event-only answer; global pending |
| Strategic Reserves pre-battle 50% cap | Original p68 §20.01 confirms the **main rule** | Pending any later exception/FAQ, no duplicate main rule |
| Lone Operative X | Original main ability confirms X form | Pending exact FAQ |
| Hazardous allocation | Original attack/hazard rules | Pending exact FAQ |
| Scouts sequencing between players | Event Companion p2 alternates event pre-battle abilities; launch FAQ concerns the distinct Scout-then-Embark question | Global sequencing FAQ pending |
| Feel No Pain timing | Original main ability | Pending exact FAQ |
| Fight on Death vs Deadly Demise | Tacoma p6 confirms Fight-on-Death models stay on the board; it does **not** answer the Deadly Demise ordering | Exact ordering pending |
| Anti-Non-X | Original Anti ability | Pending exact FAQ |
| Upgrade + Enhancement | Tacoma p4; GW September Space Marines article prints an Upgrade under Enhancements | Exact global FAQ pending; subtype relationship corroborated |
| Charge targets after roll modifiers | Secondary app-data diff v931 | Pending exact FAQ |
| Objective marker versus objective | Secondary app-data diff v931 | Pending exact FAQ |
| Line of sight from any model part | Secondary app-data diff v931 | Pending exact FAQ |
| Flying Take to the Skies timing | Secondary app-data diff v931 | Pending exact FAQ |
| Whether every disembark move counts as disembarking that turn | Current Waha FAQ only | Pending exact FAQ |

## Core-to-Glossary / popup impact (read-only)

All 270 routable effective Core record IDs have a generated glossary entry (`03.03.01` is intentionally excluded); the five Universal Update identities have none. `glossary/registry.en.json` still has the old 17.03 main definition and popup summary without the Blast parenthetical; the 15.05 Grenade(s) and 15.06 Tank Shock aliases are missing from glossary lookup labels. Its Command Points definition includes the extra-CP cap, but its shortened popup summary ends before that cap. The Revival glossary summary and definition already reflect the separate revived Leader/Support semantics. Core Reader build reads the generated registry for inline term/popup summaries, so its fresh Core text and its old popup summaries can coexist until the separately authorized Glossary redesign. No glossary or popup factual source was changed in this task.

Core Reader generated pages and search index consume the effective Core layer; glossary and popup factual sources remain downstream read-only observations. No Reader HTML was scraped to create Core facts.
