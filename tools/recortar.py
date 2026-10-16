#!/usr/bin/env python3
"""Recorta el croma verde de los personajes y de las hojas de iconos.

    python3 tools/recortar.py            # todo
    python3 tools/recortar.py personajes
    python3 tools/recortar.py iconos
    python3 tools/recortar.py logo
    python3 tools/recortar.py fondos
    python3 tools/recortar.py dibujos
    python3 tools/recortar.py carton
    python3 tools/recortar.py escenas

Entrada:  assets/personajes/originales/<slug>.jpg   y   assets/iconos/originales/hoja-*.jpg
Entrada:  assets/logo/originales/logo.jpg (letras de papel y tela recortadas, para la portada)
Salida:   assets/personajes/recortados/<slug>.webp  y   assets/iconos/recortados/<id>.webp
          assets/logo/recortados/logo.webp

El recorte sigue docs/PIPELINE_PERSONAJES.md: alfa en rampa (no umbral binario), se descartan islas
sueltas y se quita el rebote verde del borde. Las hojas de iconos se parten en piezas: cada grupo de
recortes cercanos es un icono, y se nombran por su posición en la hoja (filas de arriba abajo, de
izquierda a derecha). Necesita numpy, scipy y Pillow.
"""
import json, pathlib, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ANCHO_PERSONAJE = 900
# Personajes que se reflejan en horizontal al recortarlos (para que el gesto quede del mismo lado que en sus otras versiones)
REFLEJAR = set()           # el dictador viejo antiguo se reflejaba; los cuatro nuevos (14 oct) ya vienen con el brazo en su sitio
ANCHO_FONDO = 700          # texturas de cartulina: se estiran sobre cada carta, sobra con 700 px
# Piel de papel: se le suma el grano de la cartulina 1. La piel se encuentra por color: se mide en la cara (entre los ojos,
# bajo el puente de la nariz) y se marca todo lo que se le parece. D_PIEL_* = distancia de color (Lab) donde la máscara
# pasa de 1 a 0; FUERZA_PIEL = cuánto marca el grano (1 = la textura tal cual).
D_PIEL_0, D_PIEL_1 = 9.0, 17.0
FUERZA_PIEL = 1.4
STD_PIEL_X, STD_PIEL_ANCHO = 1.8, 4.0   # la tela (lino, punto) tiene más trama que el papel: se excluye lo que supera X veces la trama de la cara (rampa de ANCHO)
ANCHO_LOGO = 1000         # se muestra a ~400 px de ancho como mucho
LADO_DIBUJO = 256         # los dibujos a bolígrafo/lápiz llevan más detalle fino que los recortes de papel
LADO_ICONO = 192          # lado mayor de cada icono (se muestran a ~30 px; sobra para pantallas densas)

# Orden de los iconos en cada hoja: filas de arriba abajo, cada fila de izquierda a derecha.
HOJAS = {}   # 15 oct: la hoja del archivo (archivo y candado) se borró con el archivo histórico


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


def alfa_tono(a, tono_max=175, sat_min=0.30):
    """Alfa (0-1): 0 en lo que tiene tono verde-turquesa (95°-tono_max) y saturación alta."""
    mx, mn = a.max(-1), a.min(-1)
    sat = (mx - mn) / np.maximum(mx, 1)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    tono = np.degrees(np.arctan2(np.sqrt(3) * (g - b), 2 * r - g - b)) % 360
    en_tono = np.clip(1 - np.maximum(95 - tono, tono - tono_max) / 12, 0, 1)
    fondo = en_tono * np.clip((sat - sat_min) / 0.15, 0, 1)
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


def texturizar_piel(out, slug):
    """Suma el grano de cartulina1 a la piel del personaje (multiplicar suave sobre la máscara de piel)."""
    ruta = RAIZ / "assets/personajes/personajes.json"
    ojos = json.loads(ruta.read_text(encoding="utf-8")).get(slug, {}).get("ojos")
    if not ojos:
        return out
    rgba = np.array(out).astype(float)
    tex = Image.open(RAIZ / "assets/fondos/cartulina1.jpg").convert("L").resize(out.size, Image.LANCZOS)
    g = np.array(tex).astype(float)
    grano = g / np.maximum(ndi.gaussian_filter(g, 30), 1)          # solo el grano: sin viñeta ni manchas grandes
    k = 1 + FUERZA_PIEL * (grano - 1)
    m = mascara_piel(rgba, ojos)[..., None]
    rgba[..., :3] = np.clip(rgba[..., :3] * (1 + m * (k[..., None] - 1)), 0, 255)
    return Image.fromarray(rgba.astype(np.uint8))


def recortar_personaje(entrada, salida):
    im = Image.open(entrada).convert("RGB")
    if entrada.stem in REFLEJAR:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
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
        zona = np.arange(H)[:, None] < H * 0.44                            # solo en la cabeza: la camisa tiene azules
        alpha = np.where(zona, np.minimum(alpha, alfa_tono(a, 205, 0.22)), alpha)   # fuera la sombra verde azulada entre los rizos
        hueco = ndi.binary_fill_holes(alpha > 0.5) & (alpha <= 0.5) & zona  # y se tapan los agujeritos que deja dentro del pelo
        lab, n = ndi.label(hueco)
        tam = ndi.sum(hueco, lab, range(1, n + 1))
        alpha = np.where(np.isin(lab, [i + 1 for i, t in enumerate(tam) if t < 60]), 1, alpha)
        g2 = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]))
    rgba = np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba).resize((ANCHO_PERSONAJE, int(H * ANCHO_PERSONAJE / W)), Image.LANCZOS)
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


def recortar_logo(entrada, salida):
    """Como un personaje, pero ajustado al contenido: sin aire alrededor de las letras."""
    a = np.array(Image.open(entrada).convert("RGB")).astype(float)
    alpha, g2 = alfa_croma(a, 300)                      # islas pequeñas: la coma y los hilos del vaquero cuentan
    rgba = Image.fromarray(np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8))
    rgba = rgba.crop(rgba.getbbox())
    out = rgba.resize((ANCHO_LOGO, round(rgba.height * ANCHO_LOGO / rgba.width)), Image.LANCZOS)
    out.save(salida, "WEBP", quality=86, method=6)
    return out.size


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
                "alineado": "#3D4F7A", "embargo": "#2F4858"}
for _id, _c in COLOR_ESTADO.items():
    DIBUJO_AJUSTES[_id] = {"color": _c}


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
        tinta = np.broadcast_to(np.array([int(color[i:i + 2], 16) for i in (1, 3, 5)]) / 255.0, tinta.shape)
    rgba = np.dstack([np.clip(tinta, 0, 1) * 255, np.clip(alfa * (2.2 if color else 1.35), 0, 1) * 255]).astype(np.uint8)   # teñidos: trazo con más cuerpo
    im = Image.fromarray(rgba, "RGBA")
    im = im.crop(im.getbbox())
    esc = (lado or LADO_DIBUJO) / max(im.size)
    im = im.resize((max(1, round(im.width * esc)), max(1, round(im.height * esc))), Image.LANCZOS)
    im.save(salida, "WEBP", quality=88, method=6)
    return im.size


LADO_CARTON = 512          # iconos de estado de cartón (13 oct): se ven pequeños en las casillas y grandes en su carta


def recortar_carton(entrada, salida):
    """Icono de cartón sobre croma verde -> recorte con transparencia, ajustado al contenido y centrado en un cuadrado."""
    a = np.array(Image.open(entrada).convert("RGB")).astype(float)
    alpha, g2 = alfa_croma(a, 600)
    im = Image.fromarray(np.dstack([a[..., 0], g2, a[..., 2], alpha * 255]).astype(np.uint8))
    im = im.crop(im.getbbox())
    esc = LADO_CARTON / max(im.size)
    im = im.resize((max(1, round(im.width * esc)), max(1, round(im.height * esc))), Image.LANCZOS)
    lienzo = Image.new("RGBA", (LADO_CARTON, LADO_CARTON), (0, 0, 0, 0))
    lienzo.alpha_composite(im, ((LADO_CARTON - im.width) // 2, (LADO_CARTON - im.height) // 2))
    lienzo.save(salida, "WEBP", quality=86, method=6)


# Escenas de las cartas de estado (14 oct): collage de papel, 3:4, sobre croma. Desde el 16 oct son escenas libres
# (ya no el icono ampliado): el icono, dibujado a rotulador, va aparte.
# Los marcos vacíos (papel crema) llevan dentro la cara del dictador de la etapa: aquí se da un punto de cada
# hueco (en píxeles del original) y el giro del marco; el hueco visible se busca por color y se guarda como máscara.
ANCHO_ESCENA = 900
MARCOS = {
    "nacionalizado": [((520, 1330), -11.5)],
    # 16 oct: escena nueva del culto, un tendedero de retratos y uno grande en medio (todos rectos)
    "culto": [((238, 339), 0), ((564, 385), 0), ((898, 399), 0), ((1230, 383), 0), ((1554, 338), 0),
              ((896, 1267), 0), ((576, 2106), 0), ((891, 2140), 0), ((1211, 2108), 0)],
    # 16 oct: cartas de caída. «Extracción nocturna»: la cabeza (óvalo crema) queda partida en dos por el antifaz; los
    # dos trozos son un solo marco. «cabeza»: en vez de un retrato dentro del marco, el hueco se vacía y el juego pone la
    # cabeza recortada del dictador (contorno «cabeza» de personajes.json) y, encima, lo que en la escena tapa la cabeza
    # (antifaz, cascos: máscara «-encima»). «ancho» = ancho del óvalo en distancias entre ojos; «ojo» = altura de los
    # ojos dentro del marco (0 arriba, 1 abajo), para que caigan bajo el antifaz.
    "caida-ejercito_0": [([(890, 154), (888, 592)], 0, {"cabeza": True, "ancho": 2.35, "ojo": 0.385})],
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
    datos, mascaras = [], []
    for punto, giro, *extra in marcos:
        puntos = punto if isinstance(punto, list) else [punto]       # varios puntos = un solo marco partido en trozos
        m = np.zeros_like(crema)
        for x, y in puntos:
            n = lab[y, x]
            if not n:
                raise SystemExit(f"{entrada.name}: el punto {(x, y)} no cae en papel crema")
            m |= ndi.binary_fill_holes(lab == n)
        mascaras.append(m)
        hueco |= m
        # Rectángulo del hueco visible en los ejes del marco (girado)
        ys, xs = np.nonzero(m)
        t = np.radians(giro)
        u = xs * np.cos(t) + ys * np.sin(t)
        v = -xs * np.sin(t) + ys * np.cos(t)
        u0, u1, v0, v1 = np.percentile(u, 0.5), np.percentile(u, 99.5), np.percentile(v, 0.5), np.percentile(v, 99.5)
        uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
        cx, cy = uc * np.cos(t) - vc * np.sin(t), uc * np.sin(t) + vc * np.cos(t)
        datos.append({"x": round(cx * k, 1), "y": round(cy * k, 1), "w": round((u1 - u0) * k, 1), "h": round((v1 - v0) * k, 1), "giro": giro, **(extra[0] if extra else {})})
    cabezas = [m for m, (_, _, *ex) in zip(mascaras, marcos) if ex and ex[0].get("cabeza")]
    if cabezas:
        # Capa 1: la escena con la cabeza en blanco hecha hueco. Capa 3 (máscara «-encima»): lo que en la escena está
        # sobre la cabeza (todo lo que no es crema dentro de su caja, ensanchada a los lados y hasta arriba del todo).
        vacia = np.zeros_like(crema)
        encima = np.zeros_like(crema)
        for mc in cabezas:
            vacia |= ndi.binary_dilation(mc, iterations=3)
            ys, xs = np.nonzero(mc)
            x0, x1 = xs.min(), xs.max(); ancho = x1 - x0
            caja = np.zeros_like(crema)
            caja[:ys.max() + 1, max(0, x0 - ancho // 2):x1 + ancho // 2] = True
            encima |= caja & (alpha > 0.5) & ~vacia
        rgba[..., 3] = np.where(vacia, 0, rgba[..., 3])
        Image.fromarray(rgba).resize(out.size, Image.LANCZOS).save(salida, "WEBP", quality=86, method=6)
        Image.fromarray((encima * 255).astype(np.uint8)).resize(out.size, Image.LANCZOS).save(
            salida.with_name(salida.stem.replace("-escena", "-encima") + ".webp"), "WEBP", quality=80, method=6)
    hueco = ndi.binary_dilation(hueco, iterations=2)
    mascara = Image.fromarray((hueco * 255).astype(np.uint8)).resize(out.size, Image.LANCZOS)
    mascara.save(salida.with_name(salida.stem.replace("-escena", "-huecos") + ".webp"), "WEBP", quality=80, method=6)
    return out.size, datos


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
    if que in ("todo", "dibujos"):
        dst = RAIZ / "assets/iconos/recortados"; dst.mkdir(parents=True, exist_ok=True)
        for f in sorted((RAIZ / "assets/iconos/originales").glob("dibujo-*.jpeg")):
            nombre = f.stem[len("dibujo-"):] + "-dibujo"
            w, h = recortar_dibujo(f, dst / f"{nombre}.webp", **DIBUJO_AJUSTES.get(f.stem[len("dibujo-"):], {}))
            print(f"dibujo {nombre}: {w}×{h}, {(dst / f'{nombre}.webp').stat().st_size // 1024} KB")
    if que in ("todo", "carton"):
        dst = RAIZ / "assets/iconos/recortados"
        for f in sorted((RAIZ / "assets/iconos/originales").glob("carton-*.jpg")):
            nombre = f.stem[len("carton-"):] + "-carton"
            recortar_carton(f, dst / f"{nombre}.webp")
            print(f"cartón {nombre}: {(dst / f'{nombre}.webp').stat().st_size // 1024} KB")
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
    if que in ("todo", "logo"):
        dst = RAIZ / "assets/logo/recortados"; dst.mkdir(parents=True, exist_ok=True)
        w, h = recortar_logo(RAIZ / "assets/logo/originales/logo.jpg", dst / "logo.webp")
        print(f"logo: {w}×{h}, {(dst / 'logo.webp').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
