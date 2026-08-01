# Verified Compatible Rules source pipeline

## Scope

This document defines the data provenance and file contracts required before
Compatible Rules can be enabled. It changes no reader, builder, matcher or UI
behaviour.

The first implementation target is Death Guard only. The same pipeline can be
reused later for Adeptus Mechanicus, T'au Empire and Tyranids.

## Source hierarchy

Wahapedia is an input for discovery, not an authority for published rules. It
may supply initial datasheet-to-rule associations, Leader and Support
relations, keywords, abilities and source identifiers. Raw Wahapedia HTML is
never committed or rendered by the application.

When sources disagree, a newer and more specific official update overrides an
older base source. Use this precedence order:

1. Latest official FAQ, Errata and datasheet updates.
2. Current official Faction Pack or other base rules source.
3. Official Core Rules for shared game definitions.
4. Official Munitorum Field Manual only for points, DP and related costs.
5. Wahapedia discovery snapshot.

Every departure from the Wahapedia snapshot must be recorded in the correction
ledger; there are no implicit code-level exceptions.

## File contracts

The planned Death Guard files are:

```text
books/death-guard/sources/wahapedia-compatible-rules.snapshot.json
books/death-guard/sources/compatible-rules-corrections.json
books/death-guard/generated/compatible-rules.json
books/death-guard/reports/compatible-rules-diff.json
```

The snapshot and ledger are source inputs. The generated matrix is the only
runtime-facing compatibility inventory. The report is review material and must
be read before a matrix is accepted.

## Wahapedia snapshot schema

The importer will write normalized identifiers and titles, never page HTML.

```json
{
  "schema": 1,
  "source": {
    "name": "Wahapedia",
    "edition": "Warhammer 40,000 11th",
    "retrievedAt": "YYYY-MM-DD",
    "url": "https://wahapedia.ru/wh40k11ed/"
  },
  "units": [
    {
      "title": "Plague Marines",
      "unitId": "unit-plague-marines",
      "wahapediaRules": ["stratagem-creeping-blight"],
      "leaderRelations": ["unit-biologus-putrifier"],
      "supportRelations": []
    }
  ]
}
```

Title-to-ID matching must fail into the report if a local unit or rule is
missing, duplicated, renamed or stale. It must not silently omit an entry.

## Correction ledger schema

Each correction is a documented, authoritative override of a snapshot claim.

```json
{
  "schema": 1,
  "corrections": [
    {
      "unitId": "unit-tidewall-droneport",
      "ruleId": "stratagem-coordinate-to-engage",
      "wahapediaState": "shown",
      "verifiedState": "no-match",
      "reason": "FORTIFICATION cannot be selected as an Observer",
      "evidence": "T'au Empire Faction Pack v1.1"
    }
  ]
}
```

`reason` and `evidence` are mandatory for every correction. The ledger does
not duplicate rule text already held in the Army Book.

## Verified compatibility matrix schema

The matrix records which existing rule cards belong to a datasheet. It does
not replace `data-rule-facts`, the relation graph or matcher evaluation.

```json
{
  "schema": 1,
  "bookId": "death-guard",
  "units": {
    "unit-plague-marines": {
      "stratagem-creeping-blight": {"state": "match"},
      "stratagem-blessings-of-filth": {
        "state": "conditional",
        "reason": "attachment-unknown"
      }
    }
  }
}
```

Matrix states are `match`, `no-match` and `conditional`. `conditional` means
the result depends on formation or game state; it is not permission to guess a
formation. The matcher remains responsible for evaluating the current context.

## Required report categories

For each Death Guard unit/rule pair, the report classifies the result as one
of:

- Wahapedia shows the rule and the local verified result agrees.
- Wahapedia shows the rule and the local verified result rejects it.
- Wahapedia omits the rule and an official target permits it.
- The result is conditional on formation or game state.

## Acceptance gates before enabling the UI

- Every matrix `unitId` and `ruleId` resolves to an existing local record.
- There are no duplicate or unknown entries.
- Every snapshot disagreement has a ledger entry with evidence.
- Desktop and Phone Mode consume the same matrix.
- Epic Heroes do not receive forbidden Enhancements.
- Attached-unit keywords are never inherited by an individual model.
- Possible attachments remain conditional; confirmed attachments may match.

The UI may be enabled only for Death Guard on the review branch after these
gates, automated QA and manual review pass. `main`, Pages and roster-aware
formation resolution remain out of scope.

## New Recruit roster contract

New Recruit may provide Warlord state, an Enhancement owner and assigned
UPGRADEs. It does not provide Leader assignments, Support assignments, an
actual Attached Unit or the number of Character models in a particular
Attached Unit.

Compatible units appearing in the same roster are never evidence that they
are attached. Until a source explicitly supplies that formation, the pipeline
must retain the result as conditional.

## Non-goals

This design does not implement an importer, change builders, add HTML
attributes, enable Compatible Rules, alter the matcher, or infer roster
assignments. Those are follow-up stages after the Death Guard matrix is
verified.
