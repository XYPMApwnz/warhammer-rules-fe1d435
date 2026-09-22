# Effective Core consumer contract

`books/core-rules/content/effective-core-catalog.mjs` is the public factual entrypoint for Core Rules consumers.

```js
import {createEffectiveCoreCatalog} from './content/effective-core-catalog.mjs';
const core = createEffectiveCoreCatalog();
```

The returned `wh40k-effective-core-catalog/v1` catalog exposes one `records` collection and indexed access through `getById`, `getByCode`, and `resolveId`. Consumers do not need to read the digital base snapshot, PDF extraction, current-official override file, or rendered Reader.

Every record has a stored stable `id`, `recordType`, `title`, `semanticContent`, `provenance`, `relationships`, and `state`. Supported record classes are `MAIN_RULE`, `ERRATA`, `FAQ_CLARIFICATION`, `UNIVERSAL_RULE_UPDATE`, and source-backed `CORE_CONCEPT` projections.

- `MAIN_RULE` contains current effective semantics after accepted ERRATA.
- `ERRATA` remains an inspectable source record linked to its target MAIN_RULE.
- `FAQ_CLARIFICATION` keeps its explicit FAQ identity and links to primary/related MAIN_RULE records.
- `UNIVERSAL_RULE_UPDATE` keeps its explicit update identity and canonical references.
- `IDENTITY_ONLY` records expose accepted machine identity without inventing semantic content. Their `semanticContent` is `null` and their `evidenceStatus` remains `EVIDENCE_PENDING`.

Rule identities are stored in `core-identities.v1.json`, keyed by stable Core code. Titles never create factual identity. Compatibility aliases resolve once to a stored record ID and do not carry semantics.

Maintenance path for an accepted Core change:

1. Register the accepted source and precedence in the current-official source layer.
2. Bind the change to an existing stable code/ID, or add an explicitly accepted identity record.
3. Build the effective catalog and run `npm run qa:core`.
4. Rebuild the Core Reader from the effective catalog.
5. Downstream systems consume the effective catalog; generated Reader or Glossary artifacts never feed Core facts upstream.
