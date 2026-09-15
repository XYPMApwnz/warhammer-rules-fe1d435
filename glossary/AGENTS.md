# Glossary scope

- Canonical Core/book facts reach the glossary through pre-render projections.
- `editorial-contracts.v1.json` owns only reviewed editorial summaries and their provenance.
- `registry.en.json`, `aliases.en.json`, `contexts/`, `generated/`, and viewer/runtime bundles are generated outputs.
- The glossary builder must not read generated book `scripts/data.js`, readers, roster catalogs, target catalogs, or mobile output as factual input.
- Army Book/effective builders must not read generated glossary output as factual input.
- Final viewer code may consume generated glossary artifacts for display.
- Start in `tools/build-glossary.mjs`, the relevant canonical projection, or the editorial contract named by the task.
- Run `npm run qa:glossary` for glossary changes.
- Add the affected `qa:<book>` only when its canonical glossary projection changes.
- Add `npm run qa:integration` for viewer wiring or cross-route changes.
- Do not edit generated registry/context files directly; change their owner or producer and rebuild.
