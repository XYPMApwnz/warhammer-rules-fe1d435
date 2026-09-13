# Source ingestion contract

Normal builds, checks, tests, and releases consume only tracked or authenticated pinned local inputs. They do not query live source sites. `--check` verifies the accepted frozen inputs and their hashes.

Live source access is an operator update action. A live extractor must require `--capture-update --candidate-dir <path>`, retain every raw response or rendered DOM input it consumes, record requested and final URLs, hashes, capture time, upstream version or commit when available, and its extractor identity. It writes normalized candidate output beside the capture. Accepted canonical or generated production files are changed only after review of the candidate semantic diff.

Git sources use exact checkout, commit, tracked-input, and clean-input verification from `verify-bsdata-source.mjs`.

The accepted Space Marines codex-detail evidence and the T'au MFM, wargear, and codex-parity evidence predate this capture contract. Their historical raw responses are unavailable. They are marked `LEGACY_UNVERIFIABLE`; normal checks reproduce their accepted state by verifying the frozen normalized artifacts. A live response is a new candidate and cannot silently replace them.

Large multi-page HTML captures are kept as self-contained capture bundles outside accepted production paths until review. A capture may be stored outside Git, but its raw bytes and manifest must remain recoverable together. A hash without the retained bytes is not a reproducible source.
