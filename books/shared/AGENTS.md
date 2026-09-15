# Shared Army Book code

- This scope contains canonical joins, effective-model construction, roster/effect runtime, shared rendering, and source/build contracts used by multiple books.
- Read `book.config.json` for the affected book and `docs/codex/REPO_MAP.md` before tracing shared code.
- Accepted book/Core sources and config-owned contracts feed `tools/build-army-book.mjs` and `tools/effective-book-model.mjs`.
- `effect-contract-runtime.js`, `roster-context.js`, and presentation helpers implement generic behavior; book facts belong in accepted structured contracts.
- `tools/canonical-join-contract.mjs`, `tools/build-roster-catalog.mjs`, and related helpers must use persistent canonical IDs.
- Files under book `scripts/`, generated publication bundles, mobile HTML, and glossary outputs are consumers, not factual inputs.
- Keep the effective model authoritative after validation; compatibility and presentation copies may not override it.
- For a book-local fix, begin in that book and expand here only when the shared mechanism is the demonstrated cause.
- For a shared change, identify every affected consumer family before choosing dependent QA.
- Run the relevant subsystem QA first, then affected `qa:<book>` commands, then `npm run qa:integration`.
- Use `npm run qa:architecture` only when canonical/effective ownership or identity boundaries changed.
- Do not migrate book-specific presentation merely to make implementations look uniform.
- Do not edit generated book outputs by hand; rebuild through the declared producer.
