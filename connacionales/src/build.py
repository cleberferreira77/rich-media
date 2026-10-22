from pathlib import Path
from shutil import copy2, copytree, rmtree
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'src'
SIZES = ((300, 250), (400, 300), (600, 400))
(ROOT / 'packages').mkdir(exist_ok=True)

for width, height in SIZES:
    output = ROOT / f'{width}x{height}'
    if output.exists():
        rmtree(output)
    output.mkdir()
    html = (SOURCE / 'ad.html').read_text(encoding='utf-8')
    html = html.replace('{{WIDTH}}', str(width)).replace('{{HEIGHT}}', str(height))
    (output / 'index.html').write_text(html, encoding='utf-8')
    copy2(SOURCE / 'ad.css', output / 'ad.css')
    copytree(SOURCE / 'assets', output / 'assets')
    package = ROOT / 'packages' / f'bantrab-connacionales-{width}x{height}.zip'
    with ZipFile(package, 'w', ZIP_DEFLATED) as archive:
        for file in output.rglob('*'):
            if file.is_file():
                archive.write(file, file.relative_to(output))
    print(width, height)

    cube = ROOT / 'cube' / f'{width}x{height}'
    if cube.exists():
        rmtree(cube)
    cube.mkdir(parents=True)
    cube_html = (SOURCE / 'cube.html').read_text(encoding='utf-8')
    cube_html = cube_html.replace('{{WIDTH}}', str(width)).replace('{{HEIGHT}}', str(height))
    (cube / 'index.html').write_text(cube_html, encoding='utf-8')
    copy2(SOURCE / 'ad.css', cube / 'ad.css')
    copy2(SOURCE / 'cube.css', cube / 'cube.css')
    copytree(SOURCE / 'assets', cube / 'assets')
    cube_package = ROOT / 'packages' / f'bantrab-connacionales-cube-{width}x{height}.zip'
    with ZipFile(cube_package, 'w', ZIP_DEFLATED) as archive:
        for file in cube.rglob('*'):
            if file.is_file():
                archive.write(file, file.relative_to(cube))
