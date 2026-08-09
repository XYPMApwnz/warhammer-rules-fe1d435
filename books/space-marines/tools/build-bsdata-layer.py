from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
CONFIG = ROOT / "sources" / "bsdata-extract.config.json"
EXTRACTOR = REPO / "books" / "shared" / "tools" / "extract-bsdata-11e.mjs"
NODE = shutil.which("node")
SNAPSHOT = ROOT / "sources" / "bsdata-space-marines-11e.json"
DATASHEETS = ROOT / "content" / "space-marines-codex-datasheets.en.json"
POINTS = ROOT / "content" / "space-marines-points.en.json"
ULTRAMARINES_LEGENDS = {
    "Chaplain Cassius", "Sergeant Chronus", "Sergeant Telion", "Tyrannic War Veterans"
}


def absolute_config(config: dict, folder: Path, faction: str) -> Path:
    source_dir = CONFIG.parent
    inputs = []
    for item in config["inputs"]:
        copied = dict(item)
        copied["path"] = str((source_dir / item["path"]).resolve())
        copied["role"] = "library"
        inputs.append(copied)
    faction_path = (REPO / "tmp" / "bsdata-wh40k-11e" / faction).resolve()
    inputs.insert(0, {"role": "faction", "path": str(faction_path)})
    seen = set()
    config["inputs"] = [item for item in inputs if not (item["path"] in seen or seen.add(item["path"]))]
    config["outputs"] = {
        "snapshot": "snapshot.json",
        "datasheets": "datasheets.json",
        "points": "points.json",
    }
    path = folder / "config.json"
    path.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return path


def extract(config: dict, folder: Path, faction: str) -> tuple[dict, dict, dict]:
    if not NODE:
        raise RuntimeError("Node.js was not found on PATH; install Node.js before rebuilding the Space Marines BSData layer")
    folder.mkdir(parents=True)
    path = absolute_config(config, folder, faction)
    subprocess.run([NODE, str(EXTRACTOR), str(path)], cwd=REPO, check=True)
    return tuple(json.loads((folder / name).read_text(encoding="utf-8")) for name in ("snapshot.json", "datasheets.json", "points.json"))


def build() -> tuple[dict, dict, dict]:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    with tempfile.TemporaryDirectory(prefix="space-marines-bsdata-", dir=ROOT / "sources") as temp:
        temp = Path(temp)
        snapshot, datasheets, points = extract(json.loads(json.dumps(config)), temp / "space-marines", "Imperium - Space Marines.json")

    codex_ids = {item["id"] for item in datasheets["datasheets"]}
    datasheets["audit"]["excludedImperialArmour"] = len(datasheets["imperialArmour"])
    datasheets["audit"]["excludedLegends"] = len(datasheets["legends"])
    datasheets["imperialArmour"] = []
    datasheets["legends"] = []
    datasheets["audit"]["imperialArmour"] = 0
    datasheets["audit"]["legends"] = 0

    points["units"] = sorted((item for item in points["units"] if item["id"] in codex_ids), key=lambda item: item["title"])
    points["audit"]["units"] = len(points["units"])
    return snapshot, datasheets, points


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    snapshot, datasheets, points = build()
    errors = []
    if len(datasheets["datasheets"]) != 83:
        errors.append("expected 83 codex datasheets")
    if datasheets["imperialArmour"]:
        errors.append("expected no Imperial Armour datasheets in the Codex-native Preview inventory")
    if datasheets["legends"]:
        errors.append("expected no Legends datasheets in the Codex-native Preview inventory")
    if len(points["units"]) != 83:
        errors.append(f"expected points for 83 Codex datasheets, found {len(points['units'])}")
    if len(points["enhancements"]) != 85:
        errors.append(f"expected 85 enhancements across 22 detachments, found {len(points['enhancements'])}")
    if args.check:
        for path, value in ((SNAPSHOT, snapshot), (DATASHEETS, datasheets), (POINTS, points)):
            if not path.exists() or json.loads(path.read_text(encoding="utf-8")) != value:
                errors.append(f"{path.name} is stale")
    if errors:
        print("\n".join(errors))
        return 1
    if not args.check:
        for path, value in ((SNAPSHOT, snapshot), (DATASHEETS, datasheets), (POINTS, points)):
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("Wrote Space Marines BSData snapshot, datasheets and points")
    else:
        print("Space Marines BSData source layer is current")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
