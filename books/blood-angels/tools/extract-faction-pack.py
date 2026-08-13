from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "sources" / "blood-angels-faction-pack-v1.1.pdf"
OUTPUT = ROOT / "content" / "blood-angels-faction-pack.en.json"
SOURCE_ID = "blood-angels-faction-pack-v1.1"
EXPECTED_PDF_SHA256 = "75AAD2A44B40DB3DBC6C0FA7786D1A7C76F878F34F15AA7E69B9B80D66CAEED1"


def e(title: str, points: int) -> dict:
    return {"title": title, "points": points}


def s(title: str, cp: int) -> dict:
    return {"title": title, "cp": cp}


DETACHMENTS = [
    {"title": "Legacy of Grace", "page": 2, "rule": "Legacy of the Angel",
     "enhancements": [e("Blood Boil", 10), e("Aureole of the Angel", 20)],
     "stratagems": [s("Martial Paragon", 1), s("Soul-darkened Fury", 1), s("Aura of the Angel's Grace", 1)]},
    {"title": "Encarmine Speartip", "page": 3, "rule": "Wrath of Angels",
     "enhancements": [e("Angelic Executioner", 25), e("Shadow of Abomination", 25)],
     "stratagems": [s("Judgement of the Golden Host", 1), s("Inexorable Valour", 1), s("Blinding Blurs of Vengeance", 1)]},
    {"title": "Wrath of the Doomed", "page": 4, "rule": "Fanatical Celerity",
     "enhancements": [e("Instinctive Interception", 10), e("On the Archtraitor's Bridge", 20)],
     "stratagems": [s("Death Begets Vengeance", 1), s("No Barrier to Retribution", 1), s("Rage-fuelled Response", 1)]},
    {"title": "Angelic Inheritors", "page": 5, "rule": "Legacy of the Angel",
     "enhancements": [e("Prescient Flash", 20), e("Troubling Visions", 15), e("Blazing Icon", 20), e("Ordained Sacrifice", 25)],
     "stratagems": [s("Armour of Contempt", 1), s("Focused Fury", 1), s("Instant of Grace", 1), s("Strike Now for Glory", 1), s("In the Shadow of Great Wings", 1), s("Unto the Burning Skies", 1)]},
    {"title": "Rage-cursed Onslaught", "page": 7, "rule": "Maddened Ferocity",
     "enhancements": [e("Carmine Reliquary", 30), e("Master of the Red Thirst", 25), e("Sanguinary Tear (Aura)", 35), e("Angel's Fang", 25)],
     "stratagems": [s("A Grim Warning", 1), s("Armour of Contempt", 1), s("Insensate Rampage", 1), s("Limb from Limb", 1), s("Deathless Duty", 2), s("Red Wrath", 1)]},
]

MFM_DETACHMENTS = [
    "Angelic Inheritors", "Encarmine Speartip", "Legacy of Grace", "Liberator Assault Group",
    "Rage-cursed Onslaught", "The Angelic Host", "The Lost Brethren", "Wrath of the Doomed",
]


def clean(value: str) -> str:
    value = value.replace("\ufffd", ".").replace("\u00ad", "").replace("\r\n", "\n")
    value = value.replace("Y our", "Your").replace("Y ou", "You").replace("T arget", "Target").replace("C hange", "Change")
    return re.sub(r"\n{3,}", "\n\n", re.sub(r"[ \t]+\n", "\n", value)).strip()


def flat(value: str) -> str:
    value = re.sub(r"\s+([.,;:])", r"\1", re.sub(r"\s+", " ", clean(value).replace("\n", " "))).strip()
    return re.sub(r"\.{2}$", ".", value)


def comparable(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.casefold()).strip()


def slug(value: str) -> str:
    return comparable(value).replace(" ", "-")


def source(item: dict, pages: list[int]) -> dict:
    return {**item, "sourcePages": pages, "provenance": {"sourceId": SOURCE_ID, "sourcePages": pages}}


def heading(lines: list[str], title: str) -> tuple[int, int]:
    wanted = comparable(title)
    for start in range(len(lines)):
        for count in (1, 2, 3):
            candidate = comparable(" ".join(lines[start:start + count]))
            if candidate == wanted or re.fullmatch(rf"{re.escape(wanted)}(?: upgrade)? \d+cp", candidate):
                return start, start + count
            if candidate == f"{wanted} upgrade":
                return start, start + count
    raise ValueError(f"Heading not found: {title}")


def blocks(text: str, names: list[str]) -> dict[str, str]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    spans = [(name, *heading(lines, name)) for name in names]
    spans.sort(key=lambda item: item[1])
    output = {}
    for index, (name, _start, body_start) in enumerate(spans):
        end = spans[index + 1][1] if index + 1 < len(spans) else len(lines)
        body = [line for line in lines[body_start:end] if comparable(line) not in {"enhancements", "detachment rule", "detachment rules"}]
        while body and re.fullmatch(r"\d+", body[-1]):
            body.pop()
        output[name] = flat("\n".join(body))
    return output


def fields(body: str) -> dict:
    labels = ["WHEN", "TARGET", "EFFECT", "RESTRICTIONS"]
    output = {}
    for index, label in enumerate(labels):
        following = "|".join(labels[index + 1:])
        end = rf"(?=\b(?:{following}):|$)" if following else "$"
        match = re.search(rf"\b{label}:\s*(.*?){end}", body, re.I)
        if match:
            value = flat(match.group(1))
            value = re.sub(r"\s+(?:1CP|2CP)(?:\s+(?:1CP|2CP)){2,}\s*$", "", value)
            for footer in (
                "THE LORDS OF THE BLOOD ANGELS BLAZE BRIGHT WITH NOBILITY DURING THE DARKEST OF BATTLES UNIQUE: GRACE",
                "THE CHAPTER’S GOLDEN‑ARMOURED ELITE PLUNGE INTO FOE LIKE A SPEAR CAST FROM THE HEAVENS",
                "THE DEATH COMPANY BRING THEIR FOES A DOOM THAT IS BLOODY AND SUPERNATURALLY SWIFT UNIQUE: DOOMED",
            ):
                if value.endswith(footer):
                    value = value[:-len(footer)].rstrip()
            output[label.casefold()] = value
    return output


def page_text(page) -> str:
    return clean(page.extract_text() or "")


def stratagem_type(body: str, detachment: str) -> dict:
    match = re.search(r"\b(BATTLE TACTIC|STRATEGIC PLOY|EPIC DEED|WARGEAR) STRATAGEM\b", body, re.I)
    if not match:
        return {"canonicalType": None, "typeStatus": "source-untyped", "sourceLabel": f"{detachment} Stratagem"}
    label = match.group(1).title()
    return {"canonicalType": slug(label), "typeStatus": "confirmed", "sourceLabel": f"{detachment} · {label} Stratagem"}


def extract_detachments(pages) -> list[dict]:
    output = []
    name_counts = {}
    for spec in DETACHMENTS:
        for item in spec["stratagems"]:
            name_counts[slug(item["title"])] = name_counts.get(slug(item["title"]), 0) + 1
    for spec in DETACHMENTS:
        detachment_text = page_text(pages[spec["page"] - 1])
        names = [spec["rule"], *[item["title"] for item in spec["enhancements"]]]
        rule_blocks = blocks(detachment_text, names + ([item["title"] for item in spec["stratagems"]] if spec["page"] <= 4 else []))
        strat_page = spec["page"] if spec["page"] <= 4 else spec["page"] + 1
        strat_blocks = rule_blocks if strat_page == spec["page"] else blocks(page_text(pages[strat_page - 1]), [item["title"] for item in spec["stratagems"]])
        stratagems = []
        for item in spec["stratagems"]:
            parsed = fields(strat_blocks[item["title"]])
            if not all(parsed.get(field) for field in ("when", "target", "effect")):
                raise ValueError(f"Incomplete Stratagem: {spec['title']} / {item['title']}")
            base_id = slug(item["title"])
            item_id = f"{slug(spec['title'])}-{base_id}" if name_counts[base_id] > 1 else base_id
            stratagems.append(source({"id": item_id, "title": item["title"], "cp": item["cp"], **parsed, **stratagem_type(strat_blocks[item["title"]], spec["title"])}, [strat_page]))
        pages_used = [spec["page"]] if strat_page == spec["page"] else [spec["page"], strat_page]
        output.append(source({
            "id": slug(spec["title"]), "title": spec["title"],
            "rule": source({"title": spec["rule"], "text": rule_blocks[spec["rule"]]}, [spec["page"]]),
            "enhancements": [source({"id": slug(item["title"]), "title": item["title"], "points": item["points"], "text": rule_blocks[item["title"]]}, [spec["page"]]) for item in spec["enhancements"]],
            "stratagems": stratagems,
        }, pages_used))
    return output


def parse_faq(text: str) -> list[dict]:
    return [source({"id": slug(q), "question": flat(q), "answer": flat(a)}, [10]) for q, a in re.findall(r"Q:\s*(.*?)\s*A:\s*(.*?)(?=\s*Q:|$)", text, re.S)]


def legend_title(text: str) -> str:
    lines = [flat(line) for line in text.splitlines() if flat(line)]
    for line in lines:
        if comparable(line) != "w arhammer legends":
            return line.title()
    raise ValueError("Legends title not found")


def build() -> dict:
    digest = hashlib.sha256(PDF.read_bytes()).hexdigest().upper()
    document = PdfReader(PDF)
    page_objects = list(document.pages)
    page_data = {}
    for number, page in enumerate(page_objects, 1):
        text = page_text(page)
        page_data[str(number)] = {"sha256": hashlib.sha256(text.encode()).hexdigest().upper(), "text": text}
    detachments = extract_detachments(page_objects)
    page_nine = page_data["9"]["text"]
    update_text, datasheets_nine = page_nine.split("\nDATASHEETS\n", 1)
    update_text = update_text.split("\nUPDATES\n", 1)[1]
    datasheets_ten, faq_text = page_data["10"]["text"].split("\nFAQS\n", 1)
    updates = [
        source({"id": "rules-updates-9", "section": "Rules Updates", "subject": "Page 9 · updates", "change": update_text}, [9]),
        source({"id": "datasheets-updates-9", "section": "Datasheets", "subject": "Page 9 · datasheets", "change": datasheets_nine}, [9]),
        source({"id": "datasheets-updates-10", "section": "Datasheets", "subject": "Page 10 · datasheets", "change": datasheets_ten}, [10]),
    ]
    legends = [source({"id": slug(legend_title(page_data[str(first)]["text"])), "title": legend_title(page_data[str(first)]["text"])}, [first, first + 1]) for first in range(11, 31, 2)]
    return {
        "meta": {"title": "Blood Angels Faction Pack", "version": "1.1", "legalFrom": "2026-07-22", "pageCount": len(page_objects), "sha256": digest, "file": "sources/blood-angels-faction-pack-v1.1.pdf"},
        "provenance": {"sourceId": SOURCE_ID, "authority": "Games Workshop", "documentType": "faction-pack", "edition": "Warhammer 40,000 11th Edition", "pageNumbering": "physical PDF pages", "note": "Supplement layer. Blood Angels armies also depend on the Space Marines base rules and datasheets."},
        "dependency": {"type": "codex-supplement", "book": "space-marines", "required": True, "duplicatedHere": False},
        "pages": page_data,
        "detachments": detachments,
        "detachmentAudit": {"source": "Munitorum Field Manual v1.2 dated capture", "url": "https://mfm.warhammer-community.com/en/blood-angels", "checkedAt": "2026-08-12", "expected": 8, "count": len(MFM_DETACHMENTS), "current": MFM_DETACHMENTS, "factionPackCount": len(DETACHMENTS), "factionPack": [item["title"] for item in DETACHMENTS]},
        "updates": updates,
        "faqs": parse_faq(faq_text),
        "datasheets": {"matched": [], "legends": legends},
    }


def validate(data: dict) -> list[str]:
    errors = []
    stratagems = [item for detachment in data.get("detachments", []) for item in detachment.get("stratagems", [])]
    checks = [
        (data.get("meta", {}).get("pageCount"), 30, "pages"),
        (len(data.get("detachments", [])), 5, "detachments"),
        (len(stratagems), 21, "Stratagems"),
        (sum(len(item["enhancements"]) for item in data.get("detachments", [])), 14, "Enhancements"),
        (len(data.get("updates", [])), 3, "updates"),
        (len(data.get("faqs", [])), 1, "FAQs"),
        (len(data.get("datasheets", {}).get("legends", [])), 10, "Legends"),
        (len(data.get("detachmentAudit", {}).get("current", [])), 8, "MFM detachments"),
    ]
    for actual, expected, label in checks:
        if actual != expected:
            errors.append(f"expected {expected} {label}, found {actual}")
    if data.get("dependency", {}).get("book") != "space-marines" or data.get("dependency", {}).get("duplicatedHere") is not False:
        errors.append("Space Marines supplement dependency is invalid")
    if data.get("meta", {}).get("sha256") != EXPECTED_PDF_SHA256:
        errors.append("official PDF SHA-256 mismatch")
    if chr(0xFFFD) in json.dumps(data, ensure_ascii=False):
        errors.append("replacement character found")
    semantic_text = " ".join(
        [detachment["rule"]["text"] for detachment in data.get("detachments", [])]
        + [value for detachment in data.get("detachments", []) for stratagem in detachment.get("stratagems", []) for value in (stratagem.get("when", ""), stratagem.get("target", ""), stratagem.get("effect", ""), stratagem.get("restrictions", ""))]
    )
    if re.search(r"\bY ou\b|(?:1CP|2CP)(?:\s+(?:1CP|2CP)){2,}|UNIQUE:\s+(?:GRACE|DOOMED)", semantic_text):
        errors.append("PDF layout noise found in rule-bearing fields")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    data = build()
    errors = validate(data)
    content = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != content:
            errors.append("Faction Pack output is stale")
        if errors:
            print("\n".join(errors))
            return 1
        print("Blood Angels Faction Pack source layer is current")
        return 0
    if errors:
        raise ValueError("\n".join(errors))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(content, encoding="utf-8")
    print(f"Refreshed {OUTPUT.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
