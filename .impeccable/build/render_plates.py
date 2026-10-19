from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "plates"
OUT.mkdir(parents=True, exist_ok=True)


def cover_crop(image: Image.Image, aspect: float, *, y_bias: float = 0.5) -> Image.Image:
    width, height = image.size
    current = width / height
    if current > aspect:
        crop_width = round(height * aspect)
        left = (width - crop_width) // 2
        return image.crop((left, 0, left + crop_width, height))
    crop_height = round(width / aspect)
    top = round((height - crop_height) * y_bias)
    top = max(0, min(top, height - crop_height))
    return image.crop((0, top, width, top + crop_height))


def save_resized(source: Path, destination: Path, size: tuple[int, int], *, y_bias: float = 0.5) -> None:
    with Image.open(source) as image:
        working = cover_crop(image.convert("RGB"), size[0] / size[1], y_bias=y_bias)
        working.resize(size, Image.Resampling.LANCZOS).save(destination, "PNG", optimize=True)


def save_mirror_tiled(source: Path, destination: Path, size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        tile = image.convert("RGB")
        pair = Image.new("RGB", (tile.width * 2, tile.height * 2))
        pair.paste(tile, (0, 0))
        pair.paste(tile.transpose(Image.Transpose.FLIP_LEFT_RIGHT), (tile.width, 0))
        pair.paste(tile.transpose(Image.Transpose.FLIP_TOP_BOTTOM), (0, tile.height))
        pair.paste(tile.transpose(Image.Transpose.ROTATE_180), (tile.width, tile.height))
        canvas = Image.new("RGB", size)
        for y in range(0, size[1], pair.height):
            for x in range(0, size[0], pair.width):
                canvas.paste(pair, (x, y))
        canvas.save(destination, "PNG", optimize=True)


# Clean raw comp paper patch, mirrored into a seamless production tile.
save_mirror_tiled(
    ROOT / ".impeccable" / "build" / "crops" / "paper-texture.raw.png",
    OUT / "paper-texture.png",
    (636, 396),
)

# Generic conceptual automotive visual regenerated from the approved comp crop.
save_resized(
    Path(r"C:\Users\jose.avancini\.codex\generated_images\01a0da76-9238-79f0-9859-f2b44a2a00ba\exec-95b06e52-084e-45a9-89c4-cea553dba4c0.png"),
    OUT / "project-photo.png",
    (1520, 1268),
)

# Generated clean contour material, narrowed to the approved tall strip.
save_resized(
    Path(r"C:\Users\jose.avancini\.codex\generated_images\01a0da76-9238-79f0-9859-f2b44a2a00ba\exec-41f03f11-f87e-4b5c-83aa-a6995f9d2c9b.png"),
    OUT / "contour-texture.png",
    (480, 2396),
)

# Generated decorative transition art; crop around the mountain ridge and line-work.
save_resized(
    Path(r"C:\Users\jose.avancini\.codex\generated_images\01a0da76-9238-79f0-9859-f2b44a2a00ba\exec-e20fa055-ecda-494c-a383-226ca9ac41de.png"),
    OUT / "next-project-plate.png",
    (1920, 300),
    y_bias=0.40,
)
