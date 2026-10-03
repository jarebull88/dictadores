#!/usr/bin/env python3
"""Prepara un retrato generado (foto en blanco y negro con contorno grueso y pie de foto) para usarlo en el juego.

    python3 tools/preparar_retrato.py entrada.png assets/personajes/definitivos/nombre.png

Qué hace:
  1. Pasa el papel casi blanco a blanco puro (el juego mezcla el dibujo por multiplicación sobre el color del grupo).
  2. Localiza la fotografía, separada del pie de foto por una franja en blanco, y descarta el pie de foto.
  3. Recorta el borde inferior justo donde acaba el busto (el personaje va pegado abajo) y completa con blanco por arriba
     hasta dejar un cuadrado, que es lo que espera la carta.
  4. Guarda un PNG cuadrado de 720 px.
Si la imagen no tiene pie de foto (ya es una foto sola), también funciona.
Después añade la ruta en data/ilustraciones.json y ejecuta «npm run build».
"""
import sys
import numpy as np
from PIL import Image

LADO = 720
HUECO_PIE = 28      # filas en blanco seguidas que separan la foto del pie de foto

def preparar(entrada, salida):
    a = np.asarray(Image.open(entrada).convert("RGB")).astype(np.float32)
    lum = 0.3 * a[..., 0] + 0.59 * a[..., 1] + 0.11 * a[..., 2]
    t = np.clip((lum - 226) / (248 - 226), 0, 1)[..., None]            # papel -> blanco puro
    a = a * (1 - t) + 255 * t
    lum = 0.3 * a[..., 0] + 0.59 * a[..., 1] + 0.11 * a[..., 2]
    tinta = (lum < 200).sum(axis=1) > 2                                  # filas con tinta
    # bloques de filas con tinta separados por huecos largos
    bloques, ini, vacias = [], None, 0
    for y, hay in enumerate(tinta):
        if hay:
            if ini is None: ini = y
            vacias = 0; fin = y
        elif ini is not None:
            vacias += 1
            if vacias >= HUECO_PIE: bloques.append((ini, fin)); ini = None
    if ini is not None: bloques.append((ini, fin))
    if not bloques: sys.exit("No encuentro ningún dibujo en la imagen.")
    foto = max(bloques, key=lambda b: lum[b[0]:b[1] + 1].size - (lum[b[0]:b[1] + 1] > 200).sum())   # el bloque con más tinta
    y0, y1 = max(foto[0] - 14, 0), foto[1] + 1
    rec = a[y0:y1]
    alto, ancho = rec.shape[:2]
    lado = max(alto, ancho)
    lienzo = np.full((lado, lado, 3), 255, np.float32)
    ox = (lado - ancho) // 2
    lienzo[lado - alto:, ox:ox + ancho] = rec                            # pegado abajo
    im = Image.fromarray(np.clip(lienzo, 0, 255).astype(np.uint8)).resize((LADO, LADO), Image.LANCZOS)
    im.save(salida)
    print(f"{salida}: foto de {ancho}x{alto} px (bloques detectados: {len(bloques)}) -> cuadrado de {LADO} px")

if __name__ == "__main__":
    if len(sys.argv) != 3: sys.exit(__doc__)
    preparar(sys.argv[1], sys.argv[2])
