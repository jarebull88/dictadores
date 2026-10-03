#!/usr/bin/env python3
"""Monta el juego completo en un único HTML autocontenido: dist/index.html

    python3 tools/build.py

Une src/ (datos, motor, estilos y cuerpo), convierte a WebP las ilustraciones de data/ilustraciones.json
y embebe la fuente Space Grotesk. Necesita Pillow (pip install pillow).
"""
import base64, io, json, pathlib, sys
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
LADO_MAX = 640        # lado de las ilustraciones embebidas (px)
CALIDAD = 84          # calidad WebP

def leer(ruta):
    return (RAIZ / ruta).read_text(encoding="utf-8")

def imagenes():
    mapa = json.loads(leer("data/ilustraciones.json"))
    img = {}
    for clave, ruta in mapa.items():
        im = Image.open(RAIZ / "assets" / ruta).convert("RGB")
        if im.width > LADO_MAX:
            im = im.resize((LADO_MAX, LADO_MAX), Image.LANCZOS)
        b = io.BytesIO()
        im.save(b, "WEBP", quality=CALIDAD, method=6)
        img[clave] = {"src": "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode(), "w": im.width, "h": im.height}
    return img

def fuentes():
    css = ""
    for peso in (400, 500, 700):
        datos = base64.b64encode((RAIZ / f"assets/fuentes/space-grotesk-latin-{peso}-normal.woff2").read_bytes()).decode()
        css += ('@font-face { font-family: "Space Grotesk"; font-style: normal; font-weight: %d; font-display: swap; '
                'src: url(data:font/woff2;base64,%s) format("woff2"); }\n' % (peso, datos))
    return css

def main():
    css = fuentes() + leer("src/estilos.css")
    cuerpo = leer("src/cuerpo.html")
    datos = leer("src/datos.js")
    motor = leer("src/motor.js")
    activos = ('<script>\n/* Dibujos de los personajes (WebP, incrustados) */\nconst IMG = '
               + json.dumps(imagenes(), ensure_ascii=False) + ';\n</script>\n')
    html = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#F7F6F3">
<title>A la orden mi comandante · Prototipo</title>
<style>
{css}</style>
</head>
<body>
{cuerpo}
{activos}<script>
"use strict";

{datos}{motor}</script>
</body>
</html>
'''
    salida = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ / "dist" / "index.html"
    salida.parent.mkdir(parents=True, exist_ok=True)
    salida.write_text(html, encoding="utf-8")
    print(f"{salida.relative_to(RAIZ) if salida.is_relative_to(RAIZ) else salida}: {len(html.encode()) // 1024} KB")

if __name__ == "__main__":
    main()
