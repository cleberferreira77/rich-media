from hashlib import sha256
from pathlib import Path
from shutil import copy2, copytree, rmtree
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'src'
PACKAGES = ROOT / 'packages'
SIZES = ((300, 250), (400, 300), (600, 400))
KINDS = ('floating', 'cube')
VARIANTS = ('futuro', 'suenos')
CSS_VERSION = sha256((SOURCE / 'ad.css').read_bytes()).hexdigest()[:8]
JS_VERSION = sha256((SOURCE / 'ad.js').read_bytes()).hexdigest()[:8]

def html(kind, variant, width, height):
    return f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width={width},initial-scale=1"><meta name="ad.size" content="width={width},height={height}"><title>Bantrab Ahorro — {kind} {variant} {width}×{height}</title><link rel="stylesheet" href="ad.css?v={CSS_VERSION}"><script>window.BANTRAB_AD={{kind:"{kind}",variant:"{variant}",width:{width},height:{height}}};</script><script src="ad.js?v={JS_VERSION}" defer></script></head><body></body></html>'''

PACKAGES.mkdir(exist_ok=True)
for kind in KINDS:
    for variant in VARIANTS:
      for width, height in SIZES:
        name = f'{kind}-{variant}-{width}x{height}'
        output = ROOT / kind / variant / f'{width}x{height}'
        if output.exists(): rmtree(output)
        output.mkdir(parents=True)
        (output / 'index.html').write_text(html(kind, variant, width, height), encoding='utf-8')
        copy2(SOURCE / 'ad.css', output / 'ad.css')
        copy2(SOURCE / 'ad.js', output / 'ad.js')
        copytree(SOURCE / 'assets', output / 'assets')
        with ZipFile(PACKAGES / f'bantrab-ahorro-{name}.zip', 'w', ZIP_DEFLATED) as archive:
            for file in output.rglob('*'):
                if file.is_file(): archive.write(file, file.relative_to(output))
        print(name)
