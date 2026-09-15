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
OFFICIAL_MFM = ROOT / "sources" / "official-mfm-v1.3.json"
FACTION_PACK = ROOT / "content" / "space-marines-faction-pack.en.json"
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


def resolved_path(path: Path) -> Path:
    return path.expanduser().resolve(strict=False)


def path_within(candidate: Path, root: Path) -> bool:
    try:
        candidate.relative_to(root)
        return True
    except ValueError:
        return False


def validate_candidate_destination(value: str) -> Path:
    candidate = resolved_path(Path(value))
    allowed_roots = (
        resolved_path(Path(tempfile.gettempdir())),
        resolved_path(REPO / "tmp" / "candidates" / "space-marines"),
    )
    if not any(path_within(candidate, root) for root in allowed_roots):
        raise ValueError("space-marines: candidate destination is outside approved roots")
    return candidate


def key(value: str) -> str:
    return " ".join("".join(char.lower() if char.isalnum() else " " for char in value).split())


def absolute_config(config: dict, folder: Path, faction: str) -> Path:
    source_dir = CONFIG.parent
    checkout = (source_dir / config["source"]["checkout"]).resolve()
    config["source"]["checkout"] = str(checkout)
    inputs = []
    for item in config["inputs"]:
        copied = dict(item)
        copied["path"] = str((source_dir / item["path"]).resolve())
        copied["role"] = "library"
        inputs.append(copied)
    faction_path = (checkout / faction).resolve()
    inputs.insert(0, {"role": "faction", "path": str(faction_path)})
    seen = set()
    config["inputs"] = [item for item in inputs if not (item["path"] in seen or seen.add(item["path"]))]
    # Each catalogue is extracted independently, so only the merged layer can
    # prove that the complete configured child-identity set was observed.
    config["allowPartialPersistentChildSourceIds"] = True
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


def persistent_child_source_ids(value) -> set[str]:
    found = set()
    if isinstance(value, dict):
        source_id = value.get("sourceChildId")
        if isinstance(source_id, str):
            found.add(source_id)
        for child in value.values():
            found.update(persistent_child_source_ids(child))
    elif isinstance(value, list):
        for child in value:
            found.update(persistent_child_source_ids(child))
    return found


def apply_faction_pack_facts(datasheets: dict) -> None:
    pack = json.loads(FACTION_PACK.read_text(encoding="utf-8"))
    if pack.get("meta", {}).get("version") != "1.2":
        raise ValueError("Space Marines Faction Pack v1.2 is required for current Datasheet facts")
    oath_update = next((item for item in pack.get("updates", []) if item.get("id") == "oath-of-moment"), None)
    if not oath_update or not oath_update.get("change") or oath_update.get("sourcePages") != [60]:
        raise ValueError("Current Oath of Moment definition was not found on Faction Pack page 60")

    units = {item["title"]: item for item in datasheets["datasheets"]}
    for title in ("Eradicator Squad with Heavy Bolters", "Wardens of Ultramar"):
        unit = units[title]
        memberships = [ability for ability in unit.get("abilities", []) if key(ability["title"]) == "oath of moment"]
        if len(memberships) > 1:
            raise ValueError(f"{title}: expected at most one Oath of Moment ability")
        if not memberships:
            unit.setdefault("abilities", []).append({"title": "Oath of Moment", "text": ""})

    oath_members = 0
    for unit in datasheets["datasheets"]:
        for ability in unit.get("abilities", []):
            if key(ability["title"]) == "oath of moment":
                ability["text"] = oath_update["change"]
                oath_members += 1
    if not oath_members:
        raise ValueError("No Oath of Moment Datasheet memberships were found")

    land_speeder = units["Land Speeder"]
    heavy_flamers = [weapon for weapon in land_speeder["weapons"] if key(weapon["name"]) == "heavy flamer"]
    if len(heavy_flamers) != 1:
        raise ValueError("Land Speeder: expected exactly one Heavy Flamer profile")
    heavy_flamers[0]["abilities"] = "Torrent"


def apply_accepted_codex_facts(datasheets: dict) -> None:
    units = {item["id"]: item for item in datasheets["datasheets"]}

    support_overrides = {
        "unit-ancient": ["ASSAULT INTERCESSOR SQUAD", "DESOLATION SQUAD", "DEVASTATOR SQUAD", "HELLBLASTER SQUAD", "INFERNUS SQUAD", "INTERCESSOR SQUAD", "STERNGUARD VETERAN SQUAD", "TACTICAL SQUAD"],
        "unit-ancient-in-terminator-armor": ["TERMINATOR ASSAULT SQUAD", "TERMINATOR SQUAD"],
        "unit-apothecary": ["ASSAULT INTERCESSOR SQUAD", "BLADEGUARD VETERAN SQUAD", "DESOLATION SQUAD", "DEVASTATOR SQUAD", "HELLBLASTER SQUAD", "INFERNUS SQUAD", "INTERCESSOR SQUAD", "STERNGUARD VETERAN SQUAD", "TACTICAL SQUAD"],
        "unit-bladeguard-ancient": ["BLADEGUARD VETERAN SQUAD"],
        "unit-lieutenant": ["ASSAULT INTERCESSOR SQUAD", "BLADEGUARD VETERAN SQUAD", "COMPANY HEROES", "HELLBLASTER SQUAD", "INFERNUS SQUAD", "INTERCESSOR SQUAD", "STERNGUARD VETERAN SQUAD", "TACTICAL SQUAD"],
        "unit-lieutenant-in-reiver-armour": ["REIVER SQUAD"],
        "unit-cato-sicarius": ["VICTRIX HONOUR GUARD"],
    }
    for unit_id, titles in support_overrides.items():
        units[unit_id]["relations"]["support"] = titles

    apothecary_support = next(
        ability for ability in units["unit-apothecary"]["abilities"]
        if key(ability["title"]) == "support" and ability["text"]
    )
    apothecary_support["text"] = apothecary_support["text"].replace(
        "■ ASSAULT INTERCESSOR SQUAD \n■ CRUSADER SQUAD",
        "■ ASSAULT INTERCESSOR SQUAD \n■ BLADEGUARD VETERAN SQUAD \n■ CRUSADER SQUAD",
    )

    relation_overrides = {
        "unit-korsarro-khan": [
            "ASSAULT INTERCESSOR SQUAD", "BLADEGUARD VETERAN SQUAD", "COMPANY HEROES",
            "INTERCESSOR SQUAD", "STERNGUARD VETERAN SQUAD", "TACTICAL SQUAD",
        ],
        "unit-vulkan-hestan": [
            "ASSAULT INTERCESSOR SQUAD", "COMPANY HEROES", "INFERNUS SQUAD", "TACTICAL SQUAD",
        ],
    }
    for unit_id, titles in relation_overrides.items():
        units[unit_id]["relations"]["leader"] = titles

    pedro = units["unit-pedro-kantor"]
    pedro["keywords"] = ["Crimson Fists" if value == "Imperial Fists" else value for value in pedro["keywords"]]

    wardens = units["unit-wardens-of-ultramar"]
    wardens["abilities"] = [ability for ability in wardens["abilities"] if key(ability["title"]) != "heroes of ultramar"]
    wardens["relations"]["support"] = [
        "Assault Intercessor Squad", "Bladeguard Veteran Squad", "Intercessor Squad", "Sternguard Veteran Squad",
    ]

    hammerfall = units["unit-hammerfall-bunker"]
    if not any(key(ability["title"]) == "defensive array" for ability in hammerfall["abilities"]):
        hammerfall["abilities"].insert(2, {
            "title": "Defensive Array",
            "text": "You can target this Fortification with the Fire Overwatch Strategem for 0CP, and can do so even if you have already targeted another unit with that Stratagem this turn. This Fortification can only be targeted with that Stratagem once per turn.",
        })

    for unit in datasheets["datasheets"]:
        leaders = unit.get("relations", {}).get("leader", [])
        leader = next((ability for ability in unit.get("abilities", []) if key(ability["title"]) == "leader"), None)
        if leader and leaders and unit["id"] not in relation_overrides:
            leader["text"] = f"This model can be attached to the following units: {', '.join(leaders)}."


def build() -> tuple[dict, dict, dict]:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    official = json.loads(OFFICIAL_MFM.read_text(encoding="utf-8"))
    expected_titles = {key(title) for title in official["verifiedUnits"]}
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
            title_key = key(unit["title"])
            if title_key not in expected_titles or title_key in existing:
                continue
            datasheets["datasheets"].append(unit)
            existing.add(title_key)
        for item in extra_points["units"]:
            title_key = key(item["title"])
            if title_key not in expected_titles or item["id"] in point_ids:
                continue
            points["units"].append(item)
            point_ids.add(item["id"])

    for unit in datasheets["datasheets"]:
        unit["abilities"] = [ability for ability in unit.get("abilities", []) if key(ability["title"]) != "templar vows"]
        if key(unit["title"]) in CURRENT_FACTION_PACK:
            unit["sourceLayer"] = "faction-pack"
    apply_faction_pack_facts(datasheets)
    apply_accepted_codex_facts(datasheets)
    expected_child_source_ids = set(config.get("persistentChildSourceIds", []))
    observed_child_source_ids = persistent_child_source_ids(datasheets)
    missing_child_source_ids = sorted(expected_child_source_ids - observed_child_source_ids)
    unexpected_child_source_ids = sorted(observed_child_source_ids - expected_child_source_ids)
    if missing_child_source_ids or unexpected_child_source_ids:
        details = []
        if missing_child_source_ids:
            details.append(f"missing: {', '.join(missing_child_source_ids)}")
        if unexpected_child_source_ids:
            details.append(f"unexpected: {', '.join(unexpected_child_source_ids)}")
        raise ValueError(f"Space Marines persistent child source identity mismatch ({'; '.join(details)})")
    titus = next(item for item in datasheets["datasheets"] if item["title"] == "Captain Titus")
    titus["sourceLayer"] = "codex"
    weapon_order = ["Bolt pistol", "Master-crafted bolter", "Master-crafted chainsword"]
    weapon_names = {key(name): name for name in weapon_order}
    for weapon in titus["weapons"]:
        weapon["name"] = weapon_names[key(weapon["name"])]
        if key(weapon["abilities"]) == key("Anti-Infantry 2+"):
            weapon["abilities"] = "Anti-Infantry 2+"
    titus["weapons"].sort(key=lambda weapon: weapon_order.index(weapon["name"]))
    press = next(ability for ability in titus["abilities"] if key(ability["title"]) == "press the attack")
    press["text"] = press["text"].rstrip(".") + "."
    ability_order = ["Honour of Ultramar", "Leader", "Oath of Moment", "Feel No Pain 5+", "Press the Attack"]
    titus["abilities"].sort(key=lambda ability: ability_order.index(ability["title"]))
    titus["keywords"] = ["Infantry", "Character", "Imperium", "Grenades", "Epic Hero", "Tacticus", "Captain", "Titus", "Adeptus Astartes", "Ultramarines"]
    titus["relations"]["leader"] = [
        "Assault Intercessor Squad", "Bladeguard Veteran Squad", "Company Heroes", "Hellblaster Squad",
        "Infernus Squad", "Intercessor Squad", "Sternguard Veteran Squad", "Victrix Honour Guard", "Wardens of Ultramar",
    ]

    datasheets["imperialArmour"] = sorted(
        (item for item in datasheets["imperialArmour"] if key(item["title"]) in IMPERIAL_ARMOUR),
        key=lambda item: (item["category"], item["title"]),
    )
    current_ids = {item["id"] for item in [*datasheets["datasheets"], *datasheets["imperialArmour"]]}
    datasheets["audit"]["excludedImperialArmour"] = 0
    datasheets["audit"]["excludedLegends"] = len(datasheets["legends"])
    datasheets["legends"] = []
    datasheets["audit"]["imperialArmour"] = len(datasheets["imperialArmour"])
    datasheets["audit"]["legends"] = 0
    datasheets["datasheets"] = sorted(datasheets["datasheets"], key=lambda item: (item["category"], item["title"]))
    datasheets["audit"]["datasheets"] = len(datasheets["datasheets"])

    points["units"] = sorted((item for item in points["units"] if item["id"] in current_ids), key=lambda item: item["title"])
    official_units = {key(item["title"]): item for item in official["unitOverrides"]}
    vulkan_points = official_units[key("Vulkan He'stan")]["points"]
    next(item for item in points["units"] if item["id"] == "unit-vulkan-hestan")["points"] = vulkan_points
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
    parser.add_argument("--candidate-dir")
    args = parser.parse_args()
    candidate_dir = None
    if not args.check:
        if not args.candidate_dir:
            parser.error("write-run requires --candidate-dir")
        try:
            candidate_dir = validate_candidate_destination(args.candidate_dir)
        except ValueError as error:
            parser.error(str(error))
    snapshot, datasheets, points = build()
    errors = []
    if len(datasheets["datasheets"]) != 101:
        errors.append("expected 101 current owned datasheets")
    if len(datasheets["imperialArmour"]) != 2:
        errors.append(f"expected 2 current Imperial Armour datasheets, found {len(datasheets['imperialArmour'])}")
    if datasheets["legends"]:
        errors.append("expected no Legends datasheets in the Codex-native Preview inventory")
    if len(points["units"]) != 103:
        errors.append(f"expected points for 103 current owned datasheets, found {len(points['units'])}")
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
        outputs = (
            (candidate_dir / SNAPSHOT.name, snapshot),
            (candidate_dir / DATASHEETS.name, datasheets),
            (candidate_dir / POINTS.name, points),
        )
        for path, value in outputs:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote Space Marines candidate BSData layer to {candidate_dir}")
    else:
        print("Space Marines BSData source layer is current")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
