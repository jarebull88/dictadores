#!/usr/bin/env python3
"""Monta el juego completo en un único HTML autocontenido: dist/index.html

    python3 tools/build.py

Une src/ (datos, motor, estilos y cuerpo), recorta y convierte a WebP los retratos de data/ilustraciones.json
y embebe las fuentes (Courier Prime y Special Elite). Necesita Pillow (pip install pillow).

Los retratos se generan en 3:4 con el nombre impreso debajo de la foto. El montaje quita ese pie de foto
(el juego escribe el nombre con su propia tipografía), deja el personaje pegado al borde inferior y recorta
todos a la misma proporción. Los originales de assets/ no se tocan.
"""
import base64, io, json, pathlib, sys
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ANCHO = 720           # ancho de los retratos embebidos (px)
PROPORCION = 0.92     # ancho / alto de la foto, sin el pie (la carta entera, con el nombre, queda en 3:4)
MARGEN_LADOS = 0.015  # se quita un poco de cada lado: algunos retratos traen el marco del pie de foto
CALIDAD = 80          # calidad WebP

def leer(ruta):
    return (RAIZ / ruta).read_text(encoding="utf-8")

def fin_de_la_foto(im):
    """Primera fila casi en blanco por debajo del 70 % de la altura: ahí acaba la foto y empieza el pie."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()
    xs = range(int(w * 0.03), int(w * 0.97), 4)
    for y in range(int(h * 0.7), h):
        if sum(1 for x in xs if px[x, y] < 200) / len(xs) < 0.02:
            return y
    return h                                   # sin pie de foto: la imagen entera

def retrato(im):
    w = im.width
    abajo = fin_de_la_foto(im)
    lado = int(w * MARGEN_LADOS)
    ancho = w - 2 * lado
    alto = min(abajo, round(ancho / PROPORCION))
    im = im.crop((lado, abajo - alto, w - lado, abajo))
    return im.resize((ANCHO, round(ANCHO * im.height / im.width)), Image.LANCZOS)

def imagenes():
    mapa = json.loads(leer("data/ilustraciones.json"))
    img = {}
    for clave, ruta in mapa.items():
        im = retrato(Image.open(RAIZ / "assets" / ruta).convert("RGB"))
        b = io.BytesIO()
        im.save(b, "WEBP", quality=CALIDAD, method=6)
        img[clave] = {"src": "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode(), "w": im.width, "h": im.height}
    return img

def fuentes():
    css = ""
    for familia, archivo, peso in (("Courier Prime", "courier-prime-latin-400-normal", 400),
                                   ("Courier Prime", "courier-prime-latin-700-normal", 700),
                                   ("Special Elite", "special-elite-latin-400-normal", 400)):
        datos = base64.b64encode((RAIZ / f"assets/fuentes/{archivo}.woff2").read_bytes()).decode()
        css += ('@font-face { font-family: "%s"; font-style: normal; font-weight: %d; font-display: swap; '
                'src: url(data:font/woff2;base64,%s) format("woff2"); }\n' % (familia, peso, datos))
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
<meta name="theme-color" content="#ECE9E1">
<title>¡Comandante, ordene!</title>
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
