#!/usr/bin/env python3
"""Pasa las fotos de una carpeta a .webp ligeras (lado mayor 1800 px, calidad 80).
Uso: python3 herramientas/optimizar_fotos.py sitios/<slug>/archivos
Deja los originales en archivos/_originales/ y escribe el .webp al lado con el mismo nombre.
Recuerda cambiar la extensión en sitio.json (foto.jpg -> foto.webp)."""
import sys, pathlib, shutil
from PIL import Image, ImageOps
carpeta = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
orig = carpeta / '_originales'
n = 0
for f in sorted(carpeta.rglob('*')):
    if '_originales' in f.parts or f.suffix.lower() not in ('.jpg', '.jpeg', '.png'):
        continue
    im = ImageOps.exif_transpose(Image.open(f))
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') and f.suffix.lower() == '.png' else 'RGB')
    im.thumbnail((1800, 1800), Image.LANCZOS)
    dst = f.with_suffix('.webp')
    im.save(dst, 'WEBP', quality=80, method=6)
    orig.mkdir(exist_ok=True)
    shutil.move(str(f), orig / f.name)
    n += 1
    print(f'  {f.name} -> {dst.name} ({dst.stat().st_size // 1024} KB)')
print(f'{n} fotos optimizadas. Originales en {orig}')
