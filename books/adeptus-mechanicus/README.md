# Adeptus Mechanicus Rules — Complete Codex Reference

Local interactive Adeptus Mechanicus reference: the pinned 11th-edition Codex transcription layer, the official `Faction Pack v1.1`, current official points, and Warhammer Legends. It uses the same navigation, popup, Journey, Related Rules, roster, desktop/iPad, and phone contracts as Death Guard.

## Contents

- complete updated Army Rule `Doctrina Imperatives` with a Protector / Conqueror toggle;
- 10 Detachments: 5 from the Codex and 5 from the Faction Pack, with all rules, Enhancements, and Stratagems;
- 38 Datasheets grouped into Epic Heroes, Characters, Battleline, Dedicated Transports, Other, and Warhammer Legends;
- Rules Updates from pages 17–18 and the official FAQ from page 19;
- datasheet abilities and weapon profiles registered in the searchable Mega Glossary;
- embedded transcripts of all 27 pages and direct links to the local PDF;
- global search, Contents search, popup chains, and Journey/Back;
- responsive weapon tables and mobile navigation;
- PWA/offline cache, including the source PDF.

## Reproducible data layers

Official layer: `content/adeptus-mechanicus-rules.en.json`. Codex Detachments: `content/adeptus-mechanicus-codex-detachments.en.json`. Complete Datasheet set: `content/adeptus-mechanicus-codex-datasheets.en.json`.

It generates `reader.html`, Phone Mode pages, `scripts/data.js`, and Related Rules content. The root `service-worker.js` owns offline mode for the unified site.

Build:

```powershell
& 'C:\Users\denis\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\tools\build-full-content.mjs
```

Verification:

```powershell
& 'C:\Users\denis\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\tools\build-full-content.mjs --check
& 'C:\Users\denis\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\tests\qa.mjs
```

`tools/extract-faction-pack.py` reproducibly extracts PDF text into `content/adeptus-mechanicus-source.en.json`. `tools/extract-bsdata.py` normalizes the pinned `sources/bsdata-adeptus-mechanicus.cat` catalogue; the official Faction Pack then replaces the eight matching Datasheets.

## Official source

Local copy: `sources/adeptus-mechanicus-faction-pack-v1.1.pdf`.

- 27 pages;
- legal for matched play from 22 July 2026;
- SHA-256 `FC8D366B0615CDE750E01924277D4A42B680639B1BF96E3823E7FCCE11241345`.

## Sources and reliability boundary

The project covers 10 Detachments and the complete current 11th-edition set of 38 Datasheets. Faction Pack and Legends replacements come from the local official PDF; points come from the official Munitorum Field Manual snapshot. The remaining Codex Datasheets are a pinned 11th-edition community transcription; each card displays its provenance. They are not presented as an official Codex PDF. Official Faction Pack values take precedence over the transcription.
