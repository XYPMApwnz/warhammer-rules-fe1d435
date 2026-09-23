# Glossary V2 factual index contract

Glossary V2 is a deterministic downstream index. It does not own gameplay facts.

Its factual inputs are the effective Core catalog, the nine projection-only effective Army Book models, the effective MFM catalog, and the Standard/Event effective Missions catalogs. Generated readers, book scripts, roster projections, legacy glossary registry files, and popup payloads are not inputs.

Standalone entries retain their source-domain canonical ID inside a domain-qualified index ID. Army child entries retain their stable parent unit or Detachment identity plus their persistent child identity. Display labels and aliases are searchable presentation metadata and never participate in identity construction.

MFM records augment explicitly bound Army and Mission entries. They do not create parallel articles. Inherited Space Marines facts have one source-owned article with multiple effective-book contexts. Standard and Event occurrences of the same Mission fact have one article with scope contexts.

Legacy editorial contracts may add reviewed summaries. Explicit legacy aliases and match labels may add search metadata after their canonical target resolves. Legacy gameplay definitions, generated glossary artifacts, and unresolved glossary-native gameplay records are rejected as factual inputs.

The generated `index.en.json` is disposable and must be rebuilt from the effective interfaces. Production popup, search, and viewer consumers are intentionally not connected in this foundation stage.
