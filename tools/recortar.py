#!/usr/bin/env python3
"""Recorta el croma verde de los personajes y de las hojas de iconos.

    python3 tools/recortar.py            # todo
    python3 tools/recortar.py personajes
    python3 tools/recortar.py iconos

Entrada:  assets/personajes/originales/<slug>.jpg   y   assets/iconos/originales/hoja-*.jpg
Salida:   assets/personajes/recortados/<slug>.webp  y   assets/iconos/recortados/<id>.webp

El recorte sigue docs/PIPELINE_PERSONAJES.md: alfa en rampa (no umbral binario), se descartan islas
sueltas y se quita el rebote verde del borde. Las hojas de iconos se parten en piezas: cada grupo de
recortes cercanos es un icono, y se nombran por su posición en la hoja (filas de arriba abajo, de
izquierda a derecha). Necesita numpy, scipy y Pillow.
"""
import pathlib, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ANCHO_PERSONAJE = 900
LADO_ICONO = 192          # lado mayor de cada icono (se muestran a ~30 px; sobra para pantallas densas)

# Orden de los iconos en cada hoja: filas de arriba abajo, cada fila de izquierda a derecha.
HOJAS = {
    "hoja-fuerzas": [["pueblo", "ejercito"], ["elite", "potencias"]],
    "hoja-estados": [["censura", "vigilancia"], ["culto", "alineado"], ["embargo", "frontera"], ["nacionalizado", "deuda"]],
    "hoja-archivo": [["archivo", "bloqueado"]],
}


def alfa_croma(a, isla_min):
    """Alfa en rampa según cuánto domina el verde; descarta islas pequeñas. Devuelve (alfa, verde sin rebote)."""
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    d = g - np.maximum(r, b)
    alpha = np.clip(1 - (d - 35) / (90 - 35), 0, 1)
    fg = alpha > 0.5
    lab, n = ndi.label(fg)
    tam = ndi.sum(fg, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, s in enumerate(tam) if s > isla_min])
    alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0)
    g2 = np.minimum(g, np.maximum(r, b) + 6)          # despill
    return alpha, g2


def recortar_personaje(entrada, salida):
    im = Image.open(entrada).convert("RGB")
    W, H = im.size
    a = np.array(im).astype(float)
    alpha, g2 = alfa_croma(a, 8000)
    rgba = np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba).resize((ANCHO_PERSONAJE, int(H * ANCHO_PERSONAJE / W)), Image.LANCZOS)
    out.save(salida, "WEBP", quality=88, method=6)
    return out.size


def recortar_hoja(entrada, nombres, carpeta):
    im = Image.open(entrada).convert("RGB")
    a = np.array(im).astype(float)
    alpha, g2 = alfa_croma(a, 1500)
    rgba = np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8)
    # agrupa recortes cercanos (el humo de la fábrica, las alas del billete…) en un solo icono
    grupos, n = ndi.label(ndi.binary_dilation(alpha > 0.5, iterations=20))
    cajas = [c for c in ndi.find_objects(grupos) if (c[0].stop - c[0].start) * (c[1].stop - c[1].start) > 20000]
    esperados = sum(len(f) for f in nombres)
    if len(cajas) != esperados:
        raise SystemExit(f"{entrada.name}: encontré {len(cajas)} iconos y esperaba {esperados}")
    # ordena por filas (centros verticales parecidos) y luego por columnas
    cajas.sort(key=lambda c: (c[0].start + c[0].stop) / 2)
    filas, i = [], 0
    for f in nombres:
        filas.append(sorted(cajas[i:i + len(f)], key=lambda c: c[1].start)); i += len(f)
    hechos = []
    for fila, nombres_fila in zip(filas, nombres):
        for c, nombre in zip(fila, nombres_fila):
            y0, y1, x0, x1 = c[0].start, c[0].stop, c[1].start, c[1].stop
            pieza = Image.fromarray(rgba[y0:y1, x0:x1])
            pieza = pieza.crop(pieza.getbbox())               # ajusta al contenido opaco real
            esc = LADO_ICONO / max(pieza.size)
            pieza = pieza.resize((max(1, round(pieza.width * esc)), max(1, round(pieza.height * esc))), Image.LANCZOS)
            pieza.save(carpeta / f"{nombre}.webp", "WEBP", quality=86, method=6)
            hechos.append(nombre)
    return hechos


def main():
    que = sys.argv[1] if len(sys.argv) > 1 else "todo"
    if que in ("todo", "personajes"):
        dst = RAIZ / "assets/personajes/recortados"; dst.mkdir(parents=True, exist_ok=True)
        for f in sorted((RAIZ / "assets/personajes/originales").glob("*.jpg")):
            w, h = recortar_personaje(f, dst / f"{f.stem}.webp")
            print(f"personaje {f.stem}: {w}×{h}, {(dst / f'{f.stem}.webp').stat().st_size // 1024} KB")
    if que in ("todo", "iconos"):
        dst = RAIZ / "assets/iconos/recortados"; dst.mkdir(parents=True, exist_ok=True)
        for hoja, nombres in HOJAS.items():
            print(f"{hoja}:", ", ".join(recortar_hoja(RAIZ / f"assets/iconos/originales/{hoja}.jpg", nombres, dst)))


if __name__ == "__main__":
    main()
