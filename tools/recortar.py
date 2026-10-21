#!/usr/bin/env python3
"""Recorta el croma verde de los personajes, los dibujos, las escenas y la escena de la portada.

    python3 tools/recortar.py            # todo
    python3 tools/recortar.py personajes # assets/personajes/originales/<slug>.jpg -> recortados/<slug>.webp
    python3 tools/recortar.py dibujos    # assets/iconos/originales/dibujo-<id>.jpeg -> recortados/<id>-dibujo.webp
    python3 tools/recortar.py escenas    # assets/iconos/originales/escena-<id>.jpg -> recortados/<id>-escena.webp (+ escenas.json)
    python3 tools/recortar.py fondos     # assets/fondos/*.jpg -> fondos/web/ (versiones ligeras)
    python3 tools/recortar.py portada    # assets/portada/originales/ -> portada/recortados/ (+ escena.json)

El recorte sigue docs/PIPELINE_PERSONAJES.md: alfa en rampa (no umbral binario), se descartan islas
sueltas y se quita el rebote verde del borde. Necesita numpy, scipy y Pillow.
"""
import json, pathlib, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ANCHO_PERSONAJE = 900
ANCHO_FONDO = 700          # texturas de cartulina: se estiran sobre cada carta, sobra con 700 px
# Piel de papel: se le suma el grano de cartulinablanca. La piel se encuentra por color: se mide en la cara (entre los ojos,
# bajo el puente de la nariz) y se marca todo lo que se le parece. D_PIEL_* = distancia de color (Lab) donde la máscara
# pasa de 1 a 0; FUERZA_PIEL = cuánto marca el grano (1 = la textura tal cual).
D_PIEL_0, D_PIEL_1 = 9.0, 17.0
FUERZA_PIEL = 1.4
STD_PIEL_X, STD_PIEL_ANCHO = 1.8, 4.0   # la tela (lino, punto) tiene más trama que el papel: se excluye lo que supera X veces la trama de la cara (rampa de ANCHO)
LADO_DIBUJO = 256         # los dibujos a bolígrafo/lápiz llevan más detalle fino que los recortes de papel


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


# Croma por tono (16 oct): algunos fondos salen verde azulado y en degradado (oscuro abajo), y «cuánto domina el verde»
# no basta. Aquí también se quita lo que tenga tono verde-turquesa y bastante saturación. Solo en estos personajes.
CROMA_TONO = {"economia", "educacion"}
# Despill fuerte (16 oct): el verde que queda se lleva del todo a gris. Comercio: las sombras verdes entre los rizos
# del pelo pasan a sombra gris oscura, que se lee como pelo.
DESPILL_FUERTE = {"comercio"}
# Zonas que el croma por tono no debe agujerear (x0, y0, x1, y1 en coordenadas del recorte de 900 px): dentro se rellenan
# los huecos de la silueta. Economía: los brillos de los frijoles del cucurucho, que reflejan el verde.
PROTEGER = {"economia": [(540, 845, 665, 960)]}


def alfa_tono(a, tono_max=175, croma_min=28):
    """Alfa (0-1): 0 en lo que tiene tono verde-turquesa (95°-tono_max) y bastante color. Se mide el croma absoluto
    (máximo - mínimo), no la saturación: así el pelo negro con reflejos verdosos (poco croma) no se agujerea, y el
    fondo, incluso en sombra, sí se va."""
    mx, mn = a.max(-1), a.min(-1)
    croma = mx - mn
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    tono = np.degrees(np.arctan2(np.sqrt(3) * (g - b), 2 * r - g - b)) % 360
    en_tono = np.clip(1 - np.maximum(95 - tono, tono - tono_max) / 12, 0, 1)
    fondo = en_tono * np.clip((croma - croma_min) / 15, 0, 1)
    return 1 - fondo


def a_lab(rgb):
    """sRGB (0-255, forma [...,3]) -> Lab."""
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = (c @ m.T) / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], axis=-1)


def mascara_piel(rgba, ojos):
    """Máscara (0-1) de las zonas de piel: el color medido en la cara, con rampa suave."""
    (xi, yi), (xd, yd) = ojos["izq"], ojos["der"]
    cx, cy = int((xi + xd) / 2), int((yi + yd) / 2 + (xd - xi) * 0.30)
    parche = rgba[cy - 8:cy + 8, cx - 8:cx + 8, :3].reshape(-1, 3)
    ref = a_lab(np.median(parche, axis=0))
    d = np.linalg.norm(a_lab(rgba[..., :3].astype(float)) - ref, axis=-1)
    m = np.clip(1 - (d - D_PIEL_0) / (D_PIEL_1 - D_PIEL_0), 0, 1) * (rgba[..., 3] / 255.0)
    lum = rgba[..., :3].mean(axis=-1)                                  # trama local: desviación típica en 7×7
    sd = ndi.gaussian_filter(np.sqrt(np.maximum(ndi.uniform_filter(lum ** 2, 7) - ndi.uniform_filter(lum, 7) ** 2, 0)), 1.5)
    sd0 = max(3.0, STD_PIEL_X * float(np.median(sd[cy - 12:cy + 12, cx - 12:cx + 12])))   # lo que tiene la propia cara
    m = m * np.clip(1 - (sd - sd0) / STD_PIEL_ANCHO, 0, 1)
    return ndi.gaussian_filter(m, 0.8)


# Caras con la luz desigual en la foto (16 oct: la barbilla de Hortensia salía sombreada): se iguala el brillo de la
# piel de la cabeza al tono de la frente, para que la cara sea una sola pieza de papel liso.
IGUALAR_CARA = {"educacion"}


def igualar_cara(out, slug):
    ruta = RAIZ / "assets/personajes/personajes.json"
    ojos = json.loads(ruta.read_text(encoding="utf-8")).get(slug, {}).get("ojos")
    if slug not in IGUALAR_CARA or not ojos:
        return out
    rgba = np.array(out).astype(float)
    (xi, yi), (xd, yd) = ojos["izq"], ojos["der"]
    d = xd - xi
    m = mascara_piel(rgba, ojos)
    caja = np.zeros(m.shape, bool)
    caja[max(0, int(yi - 2.2 * d)):int(yi + 2.4 * d), max(0, int(xi - 1.3 * d)):int(xd + 1.3 * d)] = True
    m = m * caja
    lum = rgba[..., :3].mean(-1)
    peso = ndi.gaussian_filter(m, 25)
    lenta = ndi.gaussian_filter(lum * m, 25) / np.maximum(peso, 1e-3)        # el brillo de la piel, sin el grano
    ref = np.median(lum[(m > 0.8) & (np.arange(m.shape[0])[:, None] < yi)])   # el de la frente
    k = np.clip(ref / np.maximum(lenta, 1), 1, 1.35)
    rgba[..., :3] = np.clip(rgba[..., :3] * (1 + m[..., None] * (k[..., None] - 1)), 0, 255)
    return Image.fromarray(rgba.astype(np.uint8))


def texturizar_piel(out, slug):
    """Suma el grano de cartulinablanca a la piel del personaje (multiplicar suave sobre la máscara de piel)."""
    ruta = RAIZ / "assets/personajes/personajes.json"
    ojos = json.loads(ruta.read_text(encoding="utf-8")).get(slug, {}).get("ojos")
    if not ojos:
        return out
    rgba = np.array(out).astype(float)
    tex = Image.open(RAIZ / "assets/fondos/cartulinablanca.jpg").convert("L").resize(out.size, Image.LANCZOS)
    g = np.array(tex).astype(float)
    grano = g / np.maximum(ndi.gaussian_filter(g, 30), 1)          # solo el grano: sin viñeta ni manchas grandes
    k = 1 + FUERZA_PIEL * (grano - 1)
    m = mascara_piel(rgba, ojos)[..., None]
    rgba[..., :3] = np.clip(rgba[..., :3] * (1 + m * (k[..., None] - 1)), 0, 255)
    return Image.fromarray(rgba.astype(np.uint8))


def recortar_personaje(entrada, salida):
    im = Image.open(entrada).convert("RGB")
    W, H = im.size
    a = np.array(im).astype(float)
    alpha, g2 = alfa_croma(a, 8000)
    if entrada.stem in CROMA_TONO:
        alpha = np.minimum(alpha, alfa_tono(a))
        fg = alpha > 0.5
        lab, n = ndi.label(fg)
        tam = ndi.sum(fg, lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, t in enumerate(tam) if t > 8000])
        alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0)
        k = W / ANCHO_PERSONAJE
        for x0, y0, x1, y1 in PROTEGER.get(entrada.stem, []):
            y0, y1, x0, x1 = int(y0 * k), int(y1 * k), int(x0 * k), int(x1 * k)
            lleno = ndi.binary_fill_holes(alpha[y0:y1, x0:x1] > 0.5)
            alpha[y0:y1, x0:x1] = np.maximum(alpha[y0:y1, x0:x1], lleno)
        g2 = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) + 6)
    if entrada.stem in DESPILL_FUERTE:
        fila = np.arange(H)[:, None]
        zona = fila < H * 0.44                                             # la cabeza: fuera la sombra verde azulada de los rizos
        hombros = (fila >= H * 0.44) & (fila < H * 0.62)                   # cuello y hombros: solo verdes (la camisa tiene azules)
        alpha = np.where(zona, np.minimum(alpha, alfa_tono(a, 205, 13)), alpha)
        alpha = np.where(hombros, np.minimum(alpha, alfa_tono(a, 170, 13)), alpha)
        hueco = ndi.binary_fill_holes(alpha > 0.5) & (alpha <= 0.5) & zona  # y se tapan los agujeritos que deja dentro del pelo
        lab, n = ndi.label(hueco)
        tam = ndi.sum(hueco, lab, range(1, n + 1))
        alpha = np.where(np.isin(lab, [i + 1 for i, t in enumerate(tam) if t < 60]), 1, alpha)
        g2 = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]))
    rgba = np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba).resize((ANCHO_PERSONAJE, int(H * ANCHO_PERSONAJE / W)), Image.LANCZOS)
    out = igualar_cara(out, entrada.stem)
    out = texturizar_piel(out, entrada.stem)
    out.save(salida, "WEBP", quality=88, method=6)
    anotar_arriba(salida.stem, out)
    return out.size


def anotar_arriba(slug, imagen):
    """Guarda en personajes.json la fila donde empieza el personaje (la cabeza), con un pequeño margen:
    la carta recorta el aire de encima para que quepa más figura cuando el hueco es ancho."""
    ruta = RAIZ / "assets/personajes/personajes.json"
    mapa = json.loads(ruta.read_text(encoding="utf-8"))
    if slug not in mapa:
        return            # aún no está en el juego (p. ej. el dictador): se recorta y se guarda, sin datos
    alfa = np.array(imagen)[..., 3]
    filas = np.where((alfa > 128).sum(axis=1) > 3)[0]
    mapa[slug]["arriba"] = max(0, int(filas[0]) - 24) if len(filas) else 0
    ruta.write_text("{\n" + ",\n".join(f'  "{k}": ' + json.dumps(v, ensure_ascii=False) for k, v in mapa.items()) + "\n}\n", encoding="utf-8")


def aligerar_fondos(carpeta):
    """Texturas de cartulina (assets/fondos/*.jpg) -> versiones ligeras en assets/fondos/web/ para incrustar en el HTML."""
    dst = carpeta / "web"; dst.mkdir(exist_ok=True)
    for f in sorted(carpeta.glob("*.jpg")):
        im = Image.open(f).convert("RGB")
        im = im.resize((ANCHO_FONDO, round(im.height * ANCHO_FONDO / im.width)), Image.LANCZOS)
        im.save(dst / f.name, "JPEG", quality=70, optimize=True)
        print(f"fondo {f.stem}: {im.width}×{im.height}, {(dst / f.name).stat().st_size // 1024} KB")


# Ajustes por dibujo: «recorte» = caja (x0, y0, x1, y1) en el original, para quitar un marco dibujado;
# «principal» = quedarse solo con los trazos grandes (fuera garabatos sueltos de las esquinas).
DIBUJO_AJUSTES = {"reverso": {"lado": 800}}   # el reverso de las cartas (14 oct) ocupa la carta entera: más resolución
# Iconos de estado (16 oct): se dibujan en carbón y aquí se tiñe la tinta de un color oscuro propio de cada estado
# (el tono de su cartulina, mucho más oscuro). Nunca rojo: el rojo es para las alertas.
COLOR_ESTADO = {"luna": "#8E2A5E", "censura": "#6B3A1E", "vigilancia": "#1F5F5B", "culto": "#8A6417",
                "alineado": "#3D4F7A", "embargo": "#2F4858", "frontera": "#3E5B2A", "deuda": "#5C4A1C",
                "nacionalizado": "#1F4E6B"}
for _id, _c in COLOR_ESTADO.items():
    DIBUJO_AJUSTES[_id] = {"color": _c}
DIBUJO_AJUSTES["elite"] = {"color": "#6B1A1A"}   # 21 oct: el Partido, una estrella a rotulador en rojo oscuro (más apagado que el rojo de las alertas)
DIBUJO_AJUSTES["pueblo"] = {"color": "#7A5416"}  # 21 oct: el Pueblo pasa a ocre oscuro (el rojo, para el Partido)


def recortar_dibujo(entrada, salida, recorte=None, principal=False, lado=None, color=None):
    """Dibujo sobre papel blanco -> tinta con transparencia, para que parezca pintado en la cartulina.
    Se mide cuánto oscurece cada píxel respecto al papel (alfa) y se recupera el color de la tinta bajo esa alfa;
    así los trazos finos de bolígrafo quedan sólidos y el lápiz de color queda translúcido, como en el papel."""
    im0 = Image.open(entrada).convert("RGB")
    if recorte:
        im0 = im0.crop(recorte)
    a = np.array(im0).astype(float)
    papel = np.percentile(a.reshape(-1, 3), 97, axis=0)              # el blanco del papel (la mayor parte de la hoja)
    ratio = np.clip(a / papel, 0, 1)
    alfa = 1 - ratio.min(axis=-1)
    fg = alfa > 0.25
    lab, n = ndi.label(ndi.binary_dilation(fg, iterations=3))
    tam = ndi.sum(fg, lab, range(1, n + 1))
    minimo = 0.12 * tam.max() if principal and n else 150
    keep = np.isin(lab, [i + 1 for i, s in enumerate(tam) if s > minimo])   # fuera las motas del papel (y los garabatos)
    alfa = np.where(keep, alfa, 0)
    tinta = 1 - (1 - ratio) / np.maximum(alfa, 0.04)[..., None]
    if color:                                                          # tinta de un solo color: se tiñe toda igual
        alfa = ndi.grey_dilation(alfa, size=(7, 7))                    # y el trazo engorda: en la casilla se ven a 40 px
        tinta = np.broadcast_to(np.array([int(color[i:i + 2], 16) for i in (1, 3, 5)]) / 255.0, tinta.shape)
    rgba = np.dstack([np.clip(tinta, 0, 1) * 255, np.clip(alfa * (2.2 if color else 1.35), 0, 1) * 255]).astype(np.uint8)   # teñidos: trazo con más cuerpo
    im = Image.fromarray(rgba, "RGBA")
    im = im.crop(im.getbbox())
    esc = (lado or LADO_DIBUJO) / max(im.size)
    im = im.resize((max(1, round(im.width * esc)), max(1, round(im.height * esc))), Image.LANCZOS)
    im.save(salida, "WEBP", quality=88, method=6)
    return im.size


# Escenas de las cartas de estado (14 oct): collage de papel, 3:4, sobre croma. Desde el 16 oct son escenas libres
# (ya no el icono ampliado): el icono, dibujado a rotulador, va aparte.
# Los marcos vacíos (papel crema) llevan dentro la cara del dictador de la etapa: aquí se da un punto de cada
# hueco (en píxeles del original) y el giro del marco; el hueco visible se busca por color y se guarda como máscara.
ANCHO_ESCENA = 900
MARCOS = {
    "nacionalizado": [((684, 1303), 0)],   # 16 oct: escena nueva, el ingenio con el retrato en la fachada
    # 16 oct: escena nueva del culto, un tendedero de retratos y uno grande en medio (todos rectos)
    "culto": [((238, 339), 0), ((564, 385), 0), ((898, 399), 0), ((1230, 383), 0), ((1554, 338), 0),
              ((896, 1267), 0), ((576, 2106), 0), ((891, 2140), 0), ((1211, 2108), 0)],
}

def recortar_escena(entrada, salida, marcos):
    im = Image.open(entrada).convert("RGB")
    W, H = im.size
    a = np.array(im).astype(float)
    # Aquí hay papel verde de verdad (hojas de laurel, casas menta): en vez de «cuánto domina el verde» se mide la
    # distancia al color del croma de esta imagen (medido en las esquinas), y el rebote solo se quita en el borde.
    esquinas = [a[:40, :40], a[:40, -40:], a[-40:, :40], a[-40:, -40:]]
    verdes = [e for e in esquinas if np.median(e[..., 1]) > np.median(np.maximum(e[..., 0], e[..., 2])) + 40]
    fondo = np.median(np.concatenate([e.reshape(-1, 3) for e in (verdes or esquinas)]), 0)   # solo las esquinas de croma (en las caídas, la figura llega a las esquinas)
    dist = np.sqrt(((a - fondo) ** 2).sum(-1))
    alpha = np.clip((dist - 70) / (130 - 70), 0, 1)
    # Las sombras sobre el croma son verde oscuro (lejos del color de fondo, pero casi solo verde): también fuera
    cuota = a[..., 1] / (a.sum(-1) + 1)
    alpha = np.minimum(alpha, np.clip((0.80 - cuota) / (0.80 - 0.62), 0, 1))
    fg = alpha > 0.5
    lab_, n_ = ndi.label(fg)
    tam = ndi.sum(fg, lab_, range(1, n_ + 1))
    keep = np.isin(lab_, [i + 1 for i, t in enumerate(tam) if t > 3000])
    alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0)
    borde = ndi.binary_dilation(alpha < 0.98, iterations=6)    # el rebote verde (y el de la pelusa de los limpiapipas) vive cerca del borde
    g2 = np.where(borde, np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) + 6), a[..., 1])
    rgba = np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8)
    k = ANCHO_ESCENA / W
    out = Image.fromarray(rgba).resize((ANCHO_ESCENA, round(H * k)), Image.LANCZOS)
    out.save(salida, "WEBP", quality=86, method=6)
    if not marcos:
        return out.size, []
    # Papel crema: claro, poco saturado y algo cálido (no el blanco puro de los sellos)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    crema = ((r + g + b) / 3 > 195) & (a.max(-1) - a.min(-1) < 50) & (r - b > 10)
    crema = ndi.binary_opening(crema, iterations=3)
    lab, _ = ndi.label(crema)
    hueco = np.zeros_like(crema)
    datos = []
    for punto, giro in marcos:
        puntos = punto if isinstance(punto, list) else [punto]       # varios puntos = un solo marco partido en trozos
        m = np.zeros_like(crema)
        for x, y in puntos:
            n = lab[y, x]
            if not n:
                raise SystemExit(f"{entrada.name}: el punto {(x, y)} no cae en papel crema")
            m |= ndi.binary_fill_holes(lab == n)
        hueco |= m
        # Rectángulo del hueco visible en los ejes del marco (girado)
        ys, xs = np.nonzero(m)
        t = np.radians(giro)
        u = xs * np.cos(t) + ys * np.sin(t)
        v = -xs * np.sin(t) + ys * np.cos(t)
        u0, u1, v0, v1 = np.percentile(u, 0.5), np.percentile(u, 99.5), np.percentile(v, 0.5), np.percentile(v, 99.5)
        uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
        cx, cy = uc * np.cos(t) - vc * np.sin(t), uc * np.sin(t) + vc * np.cos(t)
        datos.append({"x": round(cx * k, 1), "y": round(cy * k, 1), "w": round((u1 - u0) * k, 1), "h": round((v1 - v0) * k, 1), "giro": giro})
    hueco = ndi.binary_dilation(hueco, iterations=2)
    mascara = Image.fromarray((hueco * 255).astype(np.uint8)).resize(out.size, Image.LANCZOS)
    mascara.save(salida.with_name(salida.stem.replace("-escena", "-huecos") + ".webp"), "WEBP", quality=80, method=6)
    return out.size, datos


# 17 oct: la escena del triunfo de la portada (como la foto de la entrada en la capital). Las figuras con el puño en
# alto están en assets/portada/originales/; se recortan por croma y se componen en dos versiones: «ancha» (escritorio,
# los cinco en fila) y «movil» (más juntos). Los ojos y el brillo del farol no se pintan: van en escena.json para que
# el juego los ponga por encima (los ojos miran a los lados como en las cartas).
# Cada figura: (archivo, slug de personajes.json para los ojos o None, escala, centro x, borde de abajo); orden = de atrás a delante.
OJOS_FUSIL = {"izq": [415, 261], "der": [505, 261], "r": 9}   # el Comandante con fusil, en coordenadas de 900 de ancho
PORTADA = {
    "ancha": ((3400, 1500), [("educacion-puno", "educacion", 0.513, 500, 80), ("cultura-puno", "cultura", 0.513, 2900, 80),
                             ("comercio-puno", "comercio", 0.532, 1110, 60), ("economia-puno", "economia", 0.532, 2280, 60),
                             ("dictador-joven-fusil", None, 0.68, 1700, 70)]),
    "movil": ((2400, 1500), [("educacion-puno", "educacion", 0.47, 520, 40), ("cultura-puno", "cultura", 0.47, 1880, 40),
                             ("comercio-puno", "comercio", 0.50, 690, 70), ("economia-puno", "economia", 0.50, 1710, 70),
                             ("dictador-joven-fusil", None, 0.66, 1200, 70)]),
}
# 17 oct: en el móvil solo se ve el centro («ventana», en px del lienzo compuesto) y los de los lados quedan cortados: así el
# Comandante sale del tamaño de su carta (la carta enseña el dibujo a un 80 % del ancho de la pantalla).
VENTANA_PORTADA = {"movil": 1344}
ESCALA_PORTADA = 0.5   # el lienzo se compone a tamaño grande y se guarda a la mitad


def recortar_figura(f):
    a = np.array(Image.open(f).convert("RGB")).astype(float)
    alpha, _ = alfa_croma(a, 8000)
    alpha = np.minimum(alpha, alfa_tono(a))
    fg = alpha > 0.5
    lab, n = ndi.label(fg)
    tam = ndi.sum(fg, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, t in enumerate(tam) if t > 8000])
    alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0)
    g2 = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) + 6)
    return Image.fromarray(np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8))


def componer_portada():
    org, dst = RAIZ / "assets/portada/originales", RAIZ / "assets/portada/recortados"
    dst.mkdir(parents=True, exist_ok=True)
    mapa = json.loads((RAIZ / "assets/personajes/personajes.json").read_text())
    figs = {f.stem: recortar_figura(f) for f in sorted(org.glob("*.jpg"))}
    info = {}
    for version, ((W, H), lista) in PORTADA.items():
        lienzo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ojos, brillo, capas = [], None, []
        for nombre, slug, s, cx, bajo in lista:
            im = figs[nombre]
            t = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
            x0, y0 = round(cx - t.width / 2), round(H + bajo - t.height)
            lienzo.alpha_composite(t, (x0, y0)) if x0 >= 0 and y0 >= 0 else lienzo.paste(t, (x0, y0), t)
            k = s * im.width / 900                       # de coordenadas de carta (900 de ancho) al lienzo
            o = mapa[slug]["ojos"] if slug else OJOS_FUSIL
            ojos.append({"x": x0, "y": y0, "k": k, "ojos": o})
            capas.append((np.array(t)[..., 3], x0, y0))
            if slug == "educacion":                      # el farol: su luz amarilla, buscada por color
                px = np.array(t).astype(int)
                m = (px[..., 0] > 200) & (px[..., 1] > 170) & (px[..., 2] < 120) & (px[..., 3] > 200)
                ys, xs = np.nonzero(m)
                brillo = {"x": x0 + xs.mean(), "y": y0 + ys.mean(), "r": 240 * k}
            bb = Image.fromarray(np.array(t)[..., 3]).getbbox()
            if x0 + bb[0] < 0 or x0 + bb[2] > W:
                print(f"  aviso: {nombre} se sale por un lado en «{version}»")
        # un ojo tapado por una figura de delante no se pinta (si no, flotaría encima de la otra cara)
        for i, o in enumerate(ojos):
            for lado in ("izq", "der"):
                ex, ey = o["x"] + o["ojos"][lado][0] * o["k"], o["y"] + o["ojos"][lado][1] * o["k"]
                for al, ax, ay in capas[i + 1:]:
                    yy, xx = int(ey - ay), int(ex - ax)
                    if 0 <= yy < al.shape[0] and 0 <= xx < al.shape[1] and al[yy, xx] > 128:
                        o["ojos"] = {**o["ojos"], lado: None}; break
        arriba = max(0, lienzo.getbbox()[1] - 30)        # fuera el aire de encima del fusil
        lienzo = lienzo.crop((0, arriba, W, H))
        e = ESCALA_PORTADA
        out = lienzo.resize((round(W * e), round((H - arriba) * e)), Image.LANCZOS)
        out.save(dst / f"escena-{version}.webp", "WEBP", quality=86, method=6)
        info[version] = {"ancho": out.width, "alto": out.height, "ventana": round(VENTANA_PORTADA.get(version, W) * e),
                         "ojos": [{"x": round(o["x"] * e, 1), "y": round((o["y"] - arriba) * e, 1), "k": round(o["k"] * e, 4), **o["ojos"]} for o in ojos],
                         "brillo": {"x": round(brillo["x"] * e), "y": round((brillo["y"] - arriba) * e), "r": round(brillo["r"] * e)}}
        print(f"portada {version}: {out.width}×{out.height}, {(dst / f'escena-{version}.webp').stat().st_size // 1024} KB")
    (RAIZ / "assets/portada/escena.json").write_text(json.dumps(info, ensure_ascii=False, indent=1) + "\n")


def main():
    que = sys.argv[1] if len(sys.argv) > 1 else "todo"
    if que in ("todo", "personajes"):
        dst = RAIZ / "assets/personajes/recortados"; dst.mkdir(parents=True, exist_ok=True)
        for f in sorted((RAIZ / "assets/personajes/originales").glob("*.jpg")):
            w, h = recortar_personaje(f, dst / f"{f.stem}.webp")
            print(f"personaje {f.stem}: {w}×{h}, {(dst / f'{f.stem}.webp').stat().st_size // 1024} KB")
    if que in ("todo", "dibujos"):
        dst = RAIZ / "assets/iconos/recortados"; dst.mkdir(parents=True, exist_ok=True)
        for f in sorted((RAIZ / "assets/iconos/originales").glob("dibujo-*.jpeg")):
            nombre = f.stem[len("dibujo-"):] + "-dibujo"
            w, h = recortar_dibujo(f, dst / f"{nombre}.webp", **DIBUJO_AJUSTES.get(f.stem[len("dibujo-"):], {}))
            print(f"dibujo {nombre}: {w}×{h}, {(dst / f'{nombre}.webp').stat().st_size // 1024} KB")
    if que in ("todo", "escenas"):
        dst = RAIZ / "assets/iconos/recortados"
        info = {}
        for f in sorted((RAIZ / "assets/iconos/originales").glob("escena-*.jpg")):
            id = f.stem[len("escena-"):]
            (w, h), marcos = recortar_escena(f, dst / f"{id}-escena.webp", MARCOS.get(id))
            info[id] = {"ancho": w, "alto": h, "marcos": marcos}
            print(f"escena {id}: {w}×{h}, {len(marcos)} marcos, {(dst / f'{id}-escena.webp').stat().st_size // 1024} KB")
        (RAIZ / "assets/iconos/escenas.json").write_text(json.dumps(info, ensure_ascii=False, indent=1) + "\n")
    if que in ("todo", "fondos"):
        aligerar_fondos(RAIZ / "assets/fondos")
    if que in ("todo", "portada"):
        componer_portada()


if __name__ == "__main__":
    main()
