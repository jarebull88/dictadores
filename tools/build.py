#!/usr/bin/env python3
"""Monta el juego completo en un único HTML autocontenido: dist/index.html

    python3 tools/build.py

Une src/ (datos, motor, estilos y cuerpo), incrusta los personajes recortados y sus datos
(assets/personajes/personajes.json), los iconos y escenas (assets/iconos/recortados/), el cartel de la portada y las fuentes
(Courier Prime y Special Elite). Los recortes se generan antes con tools/recortar.py.
"""
import base64, json, pathlib, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent

def leer(ruta):
    return (RAIZ / ruta).read_text(encoding="utf-8")

def datos_uri(ruta, tipo):
    return f"data:{tipo};base64," + base64.b64encode((RAIZ / ruta).read_bytes()).decode()

def personajes():
    """Retratos de papel recortado: imagen con transparencia + posición de los ojos y extras."""
    mapa = json.loads(leer("assets/personajes/personajes.json"))
    for slug, p in mapa.items():
        p["src"] = datos_uri(f"assets/personajes/recortados/{p['archivo']}", "image/webp")
    return mapa

def iconos():
    """Dibujos a rotulador, escenas y sus máscaras (assets/iconos/recortados/)."""
    img = {f"icono_{f.stem}": {"src": datos_uri(f.relative_to(RAIZ), "image/webp")}
           for f in sorted((RAIZ / "assets/iconos/recortados").glob("*.webp"))}
    return img

def cartas():
    """Imágenes de cartas de objeto, de aviso y de muerte (assets/cartas/<id>.webp), como {id: data-uri}."""
    return {f.stem: datos_uri(f.relative_to(RAIZ), "image/webp") for f in sorted((RAIZ / "assets/cartas").glob("*.webp"))}

def logros():
    """Ilustraciones de las cartas de logro (assets/logros/<id>.webp), como {id: data-uri}."""
    return {f.stem: datos_uri(f.relative_to(RAIZ), "image/webp") for f in sorted((RAIZ / "assets/logros").glob("*.webp"))}

def calcular_colores():
    """Necesita Pillow (no está en GitHub Actions): por eso el resultado se guarda en assets/colores.json y el montaje solo lo lee.
    Se recalcula con `python3 tools/build.py --colores` cuando cambien las imágenes grandes de iconos o logros."""
    from PIL import Image
    import statistics
    out = {}
    archivos = [(f"icono_{f.stem}", f) for f in sorted((RAIZ / "assets/iconos/recortados").glob("*-cartel-grande.webp"))] + \
               [(f"logro_{f.stem}", f) for f in sorted((RAIZ / "assets/logros").glob("*.webp"))]
    for clave, f in archivos:
        im = Image.open(f).convert("RGB"); w, h = im.size; k = 6
        px = [im.getpixel((x, y)) for x in range(0, w, 4) for y in range(k)]   # la franja de arriba (los lados pueden cambiar de color: la postal)
        med = tuple(statistics.median(c[i] for c in px) for i in range(3))
        out[clave] = "#%02X%02X%02X" % tuple(int(round(c)) for c in med)
    return out

def colores():
    """2 nov: el color de fondo de cada carta grande (mediana de su franja de arriba, en hexadecimal): el reverso de secuelas,
    fuerzas, recompensas y logros se pinta de ese color. {clave de imagen: #RRGGBB}, de assets/colores.json."""
    ruta = RAIZ / "assets/colores.json"
    if "--colores" in sys.argv:
        ruta.write_text(json.dumps(calcular_colores(), indent=1, sort_keys=True) + "\n")
    return json.loads(ruta.read_text())

def reversos():
    """Reverso de las cartas (3 nov, Jorge: uno solo para todas): assets/reversos/reverso.webp → {"todas": data-uri}.
    Si algún día hay uno por era, assets/reversos/era-N.webp lo sustituye para esa era."""
    out = {int(f.stem[len("era-"):]): datos_uri(f.relative_to(RAIZ), "image/webp") for f in sorted((RAIZ / "assets/reversos").glob("era-*.webp"))}
    unico = RAIZ / "assets/reversos/reverso.webp"
    if unico.exists():
        out["todas"] = datos_uri(unico.relative_to(RAIZ), "image/webp")
    return out

def sonidos():
    """Efectos de sonido (assets/sonidos/<evento>.mp3|ogg|wav|m4a), como {evento: data-uri}. Sin archivo, el juego sintetiza el suyo."""
    tipos = {".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav", ".m4a": "audio/mp4"}
    carpeta = RAIZ / "assets/sonidos"
    return {f.stem: datos_uri(f.relative_to(RAIZ), tipos[f.suffix.lower()])
            for f in sorted(carpeta.glob("*")) if f.suffix.lower() in tipos} if carpeta.exists() else {}

def fuentes():
    css = ""
    for familia, archivo, peso in (("Roboto Condensed", "roboto-condensed-latin-400-normal", 400),   # 2 nov: el cuerpo (antes Sofia Sans Semi Condensed, Baloo 2 y Courier Prime, que siguen en assets/fuentes)
                                   ("Roboto Condensed", "roboto-condensed-latin-700-normal", 700),
                                   # 23 oct: Special Elite ya no se usa (el archivo sigue en assets/fuentes)
                                   # 15 oct: Permanent Marker (rotulador); 23 oct: sustituida por Londrina Solid (el archivo sigue en assets/fuentes)
                                   ("Londrina Solid", "londrina-solid-latin-300-normal", 300),   # 27 oct: Londrina Light (leyendas bajo la carta y años)
                                   ("Londrina Solid", "londrina-solid-latin-400-normal", 400)):
        datos = base64.b64encode((RAIZ / f"assets/fuentes/{archivo}.woff2").read_bytes()).decode()
        css += ('@font-face { font-family: "%s"; font-style: normal; font-weight: %d; font-display: swap; '
                'src: url(data:font/woff2;base64,%s) format("woff2"); }\n' % (familia, peso, datos))
    return css

def main():
    css = fuentes() + leer("src/estilos.css")
    cuerpo = leer("src/cuerpo.html")
    datos = leer("src/datos.js")
    motor = leer("src/motor.js")
    activos = ('<script>\n/* Personajes e iconos de papel recortado (WebP con transparencia, incrustados) */\nconst RETRATOS = '
               + json.dumps(personajes(), ensure_ascii=False) + ';\nconst IMG = '
               + json.dumps(iconos(), ensure_ascii=False) + ';\nconst ESCENAS = '
               + leer("assets/iconos/escenas.json").strip() + ';\nconst CARTEL_PORTADA = "'
               + datos_uri("assets/portada/cartel.webp", "image/webp") + '";\nconst REVERSOS = '
               + json.dumps(reversos()) + ';\nconst IMG_CARTAS = ' + json.dumps(cartas()) + ';\nconst IMG_LOGROS = ' + json.dumps(logros()) + ';\nconst COLOR_IMG = ' + json.dumps(colores()) + ';\nconst SONIDOS = ' + json.dumps(sonidos()) + ';\n</script>\n')
    html = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#F0E9D6">
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
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    salida = pathlib.Path(args[0]) if args else RAIZ / "dist" / "index.html"
    salida.parent.mkdir(parents=True, exist_ok=True)
    salida.write_text(html, encoding="utf-8")
    print(f"{salida.relative_to(RAIZ) if salida.is_relative_to(RAIZ) else salida}: {len(html.encode()) // 1024} KB")

if __name__ == "__main__":
    main()
