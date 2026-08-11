import argparse
import io
import json
from collections import deque
from pathlib import Path
from statistics import median

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "presentation" / "unit-images.json"


def transparent_product_image(source, config):
    image = Image.open(source).convert("RGBA")
    if crop := config["processing"].get("crop"):
        image = image.crop(tuple(crop))
    width, height = image.size
    rgb = image.convert("RGB")
    pixels = list(rgb.getdata())
    min_luma = config["processing"]["minLuma"]
    max_chroma = config["processing"]["maxChroma"]
    candidate = bytearray(
        1 if (max(pixel) - min(pixel) <= max_chroma and sum(pixel) / 3 >= min_luma) else 0
        for pixel in pixels
    )
    background = bytearray(width * height)
    queue = deque()
    for x in range(width):
        queue.extend((x, (height - 1) * width + x))
    for y in range(height):
        queue.extend((y * width, y * width + width - 1))
    for x, y in config["processing"].get("backgroundSeeds", []):
        queue.append(y * width + x)
    while queue:
        index = queue.popleft()
        if background[index] or not candidate[index]:
            continue
        background[index] = 1
        x, y = index % width, index // width
        if x:
            queue.append(index - 1)
        if x + 1 < width:
            queue.append(index + 1)
        if y:
            queue.append(index - width)
        if y + 1 < height:
            queue.append(index + width)
    edge = max(8, width // 32)
    max_distance = config["processing"]["backgroundDistance"]
    for y in range(height):
        row = pixels[y * width:(y + 1) * width]
        samples = row[:edge] + row[-edge:]
        backdrop = tuple(median(pixel[channel] for pixel in samples) for channel in range(3))
        for x, pixel in enumerate(row):
            index = y * width + x
            if candidate[index] and max(abs(pixel[channel] - backdrop[channel]) for channel in range(3)) <= max_distance:
                background[index] = 1
    alpha = Image.new("L", image.size)
    alpha.putdata([0 if value else 255 for value in background])
    alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.45))
    image.putalpha(alpha)
    image = image.convert("RGBa").resize(
        (config["width"], config["height"]), Image.Resampling.LANCZOS
    ).convert("RGBA")
    output = io.BytesIO()
    image.save(output, "WEBP", quality=92, method=6, exact=True)
    extrema = image.getchannel("A").getextrema()
    if extrema != (0, 255):
        raise RuntimeError(f"{source.name}: expected real alpha, got {extrema}")
    return output.getvalue()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    units = json.loads(MANIFEST.read_text(encoding="utf-8"))["units"]
    changed = []
    for unit_id, config in units.items():
        source = ROOT / config["original"]
        target = ROOT / config["asset"]
        expected = transparent_product_image(source, config)
        actual = target.read_bytes() if target.exists() else None
        if args.check:
            if actual != expected:
                changed.append(unit_id)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(expected)
    if changed:
        raise SystemExit("Stale unit image derivatives: " + ", ".join(changed))
    print(f"Mechanicus unit image derivatives {'current' if args.check else 'built'}: {len(units)}.")


if __name__ == "__main__":
    main()
