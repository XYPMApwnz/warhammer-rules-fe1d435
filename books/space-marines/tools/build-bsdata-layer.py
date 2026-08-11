from __future__ import annotations

import argparse
import hashlib
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
OFFICIAL_MFM = ROOT / "sources" / "official-mfm-v1.2.json"
SUPPLEMENTAL_CATALOGUES = (
    "Imperium - Imperial Fists.json",
    "Imperium - Iron Hands.json",
    "Imperium - Raven Guard.json",
    "Imperium - Salamanders.json",
    "Imperium - Ultramarines.json",
    "Imperium - White Scars.json",
)
IMPERIAL_ARMOUR = {"astraeus", "thunderhawk gunship"}
CURRENT_FACTION_PACK = {
    "eradicator squad with heavy bolters", "land speeder", "terminator assault squad",
    "marneus calgar in armour of antilochus", "cato sicarius", "victrix honour guard",
    "captain titus", "wardens of ultramar", "caanok var", "suboden khan",
    "vulkan he stan", "aethon shaan", "darnath lysander", "drop pod",
}


def key(value: str) -> str:
    return " ".join("".join(char.lower() if char.isalnum() else " " for char in value).split())


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
    official_points = config.get("outputs", {}).get("officialPoints")
    config["outputs"] = {
        "snapshot": "snapshot.json",
        "datasheets": "datasheets.json",
        "points": "points.json",
    }
    if official_points:
        config["outputs"]["officialPoints"] = str((source_dir / official_points).resolve())
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
    official = json.loads(OFFICIAL_MFM.read_text(encoding="utf-8"))
    expected_titles = {key(title) for title in official["verifiedUnits"]} - IMPERIAL_ARMOUR
    expected_titles.discard("captain titus")
    expected_titles.add("lieutenant titus")
    with tempfile.TemporaryDirectory(prefix="space-marines-bsdata-", dir=ROOT / "sources") as temp:
        temp = Path(temp)
        snapshot, datasheets, points = extract(json.loads(json.dumps(config)), temp / "space-marines", "Imperium - Space Marines.json")
        supplemental = [extract(json.loads(json.dumps(config)), temp / Path(name).stem, name) for name in SUPPLEMENTAL_CATALOGUES]

    existing = {key(item["title"]) for item in datasheets["datasheets"]}
    point_ids = {item["id"] for item in points["units"]}
    for extra_snapshot, extra_datasheets, extra_points in supplemental:
        for document in extra_snapshot.get("documents", []):
            if document not in snapshot.setdefault("documents", []):
                snapshot["documents"].append(document)
        for unit in extra_datasheets["datasheets"]:
            title_key = "lieutenant titus" if key(unit["title"]) == "captain titus" else key(unit["title"])
            if title_key not in expected_titles or title_key in existing:
                continue
            if title_key == "lieutenant titus":
                unit["title"] = "Lieutenant Titus"
                unit["id"] = "unit-lieutenant-titus"
            datasheets["datasheets"].append(unit)
            existing.add(title_key)
        for item in extra_points["units"]:
            title_key = "lieutenant titus" if key(item["title"]) == "captain titus" else key(item["title"])
            if title_key not in expected_titles or item["id"] in point_ids:
                continue
            if title_key == "lieutenant titus":
                item["title"] = "Lieutenant Titus"
                item["id"] = "unit-lieutenant-titus"
            points["units"].append(item)
            point_ids.add(item["id"])

    for unit in datasheets["datasheets"]:
        unit["abilities"] = [ability for ability in unit.get("abilities", []) if key(ability["title"]) != "templar vows"]
        if key(unit["title"]) in CURRENT_FACTION_PACK:
            unit["sourceLayer"] = "faction-pack"
    titus = next(item for item in datasheets["datasheets"] if item["title"] == "Lieutenant Titus")
    titus["profiles"] = [{"name": "Lieutenant Titus", "stats": {"M": '6"', "T": "4", "Sv": "3+", "W": "5", "Ld": "6+", "OC": "1"}}]
    titus["weapons"] = [
        {"name": "Heavy bolt pistol", "mode": "ranged", "range": '18"', "a": "1", "skill": "2+", "s": "4", "ap": "-1", "d": "1", "abilities": "Pistol"},
        {"name": "Astartes chainsword", "mode": "melee", "range": "Melee", "a": "8", "skill": "2+", "s": "4", "ap": "-1", "d": "1", "abilities": "Anti-Infantry 2+"},
    ]
    titus["abilities"] = [ability for ability in titus.get("abilities", []) if key(ability["title"]) not in {"press the attack", "honour of the chapter"}]
    titus["abilities"].extend([
        {"title": "Press the Attack", "text": "Weapons equipped by models in this unit have the Sustained Hits 1 ability."},
        {"title": "Honour of the Chapter", "text": "If this model is destroyed by a melee attack before it has fought this phase, roll one D6. On a 2+, do not remove it from play; the destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play."},
    ])
    titus["relations"] = {**titus.get("relations", {}), "leader": [
        "Assault Intercessor Squad", "Bladeguard Veteran Squad", "Hellblaster Squad", "Infernus Squad",
        "Intercessor Squad", "Sternguard Veteran Squad", "Wardens of Ultramar",
    ]}
    titus["keywords"] = ["Infantry", "Character", "Imperium", "Grenades", "Epic Hero", "Tacticus", "Lieutenant", "Titus", "Adeptus Astartes", "Ultramarines"]

    codex_ids = {item["id"] for item in datasheets["datasheets"]}
    datasheets["audit"]["excludedImperialArmour"] = len(datasheets["imperialArmour"])
    datasheets["audit"]["excludedLegends"] = len(datasheets["legends"])
    datasheets["imperialArmour"] = []
    datasheets["legends"] = []
    datasheets["audit"]["imperialArmour"] = 0
    datasheets["audit"]["legends"] = 0
    datasheets["datasheets"] = sorted(datasheets["datasheets"], key=lambda item: (item["category"], item["title"]))
    datasheets["audit"]["datasheets"] = len(datasheets["datasheets"])

    points["units"] = sorted((item for item in points["units"] if item["id"] in codex_ids), key=lambda item: item["title"])
    current_enhancements = {(key(item["detachment"]), key(item["title"]).removesuffix(" upgrade")) for item in official["enhancements"]}
    enhancement_by_key = {}
    for item in points["enhancements"]:
        item_key = (key(item["detachment"]), key(item["title"]).removesuffix(" upgrade"))
        if item_key in current_enhancements and (item_key not in enhancement_by_key or item.get("pointsSource")):
            enhancement_by_key[item_key] = item
    points["enhancements"] = sorted(enhancement_by_key.values(), key=lambda item: (item["detachment"], item["title"]))
    points["audit"]["units"] = len(points["units"])
    points["audit"]["enhancements"] = len(points["enhancements"])
    snapshot_digest = hashlib.sha256((json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n").encode("utf-8")).hexdigest().upper()
    datasheets["source"]["snapshotSha256"] = snapshot_digest
    points["source"]["snapshotSha256"] = snapshot_digest
    return snapshot, datasheets, points


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    snapshot, datasheets, points = build()
    errors = []
    if len(datasheets["datasheets"]) != 101:
        errors.append("expected 101 current owned datasheets")
    if datasheets["imperialArmour"]:
        errors.append("expected no Imperial Armour datasheets in the Codex-native Preview inventory")
    if datasheets["legends"]:
        errors.append("expected no Legends datasheets in the Codex-native Preview inventory")
    if len(points["units"]) != 101:
        errors.append(f"expected points for 101 current owned datasheets, found {len(points['units'])}")
    if len(points["enhancements"]) != 87:
        errors.append(f"expected 87 enhancements across 23 detachments, found {len(points['enhancements'])}")
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
