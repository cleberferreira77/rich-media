from pathlib import Path
from shutil import copy2, copytree, rmtree
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src"
ASSETS = ROOT / "assets"
PACKAGES = ROOT / "packages"
SIZES = [(300, 2500), (400, 300), (600, 400)]
KINDS = ("floating", "cube")


def html(kind: str, width: int, height: int) -> str:
    return f'''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width={width}, initial-scale=1">
  <meta name="ad.size" content="width={width},height={height}">
  <title>Bantrab 60 años — {kind} {width}×{height}</title>
  <link rel="stylesheet" href="ad.css">
  <script>window.BANTRAB_AD={{kind:"{kind}",width:{width},height:{height}}};</script>
  <script src="ad.js" defer></script>
</head>
<body></body>
</html>
'''


PACKAGES.mkdir(exist_ok=True)
for kind in KINDS:
    for width, height in SIZES:
        name = f"{kind}-{width}x{height}"
        output = ROOT / kind / f"{width}x{height}"
        if output.exists():
            rmtree(output)
        output.mkdir(parents=True)
        (output / "index.html").write_text(html(kind, width, height), encoding="utf-8")
        copy2(SOURCE / "ad.js", output / "ad.js")
        copy2(SOURCE / "ad.css", output / "ad.css")
        copytree(ASSETS, output / "assets")
        with ZipFile(PACKAGES / f"bantrab-60-anos-{name}.zip", "w", ZIP_DEFLATED) as archive:
            for file in output.rglob("*"):
                if file.is_file():
                    archive.write(file, file.relative_to(output))
        print(name)
