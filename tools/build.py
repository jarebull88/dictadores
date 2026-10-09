#!/usr/bin/env python3
"""Monta el juego completo en un único HTML autocontenido: dist/index.html

    python3 tools/build.py

Une src/ (datos, motor, estilos y cuerpo), incrusta los personajes recortados y sus datos
(assets/personajes/personajes.json), los iconos (assets/iconos/recortados/) y las fuentes
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
    return {f"icono_{f.stem}": {"src": datos_uri(f.relative_to(RAIZ), "image/webp")}
            for f in sorted((RAIZ / "assets/iconos/recortados").glob("*.webp"))}

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
    activos = ('<script>\n/* Personajes e iconos de papel recortado (WebP con transparencia, incrustados) */\nconst RETRATOS = '
               + json.dumps(personajes(), ensure_ascii=False) + ';\nconst IMG = '
               + json.dumps(iconos(), ensure_ascii=False) + ';\n</script>\n')
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
