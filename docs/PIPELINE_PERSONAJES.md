# Personajes e iconos: de la imagen de Gemini a la carta del juego

Especificación del pipeline de personajes de *¡Comandante, ordene!*. Léela entera antes de tocar nada.

> **Actualizado el 17 oct 2026** a lo que hay en el juego: sin modo Noir (se quitó el 10 oct), los ojos se mueven solos, la única animación es el brillo del farol de Hortensia, y el recorte lo hace `tools/recortar.py`.

## 1. Qué es cada personaje

Cada ministro es **una sola imagen** generada con Gemini: una manualidad de papel recortado, fotografiada de frente, de busto (de la cintura o el ombligo hacia arriba), sobre fondo verde croma `#00FF00`.

La imagen original **no tiene ojos ni nariz**: la zona de los ojos es cartulina lisa. Los ojos se añaden después **por código**, como dos círculos negros superpuestos al SVG, y se animan. Eso es deliberado: así el personaje mira, parpadea y cambia de color según la paleta sin regenerar la imagen.

Lo único dibujado en la cara es la boca, trazada a bolígrafo BIC azul en el propio collage.

### Personajes

| slug | cargo | extras |
|---|---|---|
| `cultura` | Ministra de Cultura | — |
| `educacion` | Ministra de Educación | — |
| `interior` | Ministro del Interior | — |
| `fuerzas-armadas` | Ministro de las Fuerzas Armadas | humo del puro animado |
| `comercio` | Ministro de Comercio | — |
| `economia` | Ministro de Economía | — |
| `trabajo` | Ministro de Trabajo (hereda las cartas del antiguo Ministro de Agricultura) | — |
| `vicepresidente` | Vicepresidente del Consejo de Ministros | — |
| `embajador-oriental` | Embajador del bloque oriental | — |
| `embajador-occidental` | Embajador de la potencia del norte | — |

## 2. Estructura de archivos

```
assets/
  personajes/
    originales/        imágenes de Gemini con el croma (<slug>.jpg). No se publican: solo se incrusta el recorte.
    recortados/        WebP con transparencia, 900 px de ancho (<slug>.webp), generados por tools/recortar.py
    personajes.json    metadatos: posición de los ojos, fondo de escena, cartón, brillo del farol
  iconos/
    originales/        dibujo-* (fuerzas y estados, a rotulador) y escena-* (cartas de estado y de caída), con croma
    recortados/        <id>-dibujo.webp, <id>-escena.webp y las máscaras <id>-huecos.webp de los marcos con retrato
    escenas.json       tamaño de cada escena y posición de sus marcos
  portada/
    originales/        las figuras de la escena del triunfo (con croma)
    recortados/        escena-movil.webp y escena-ancha.webp; escena.json (ojos y farol)
```

`python3 tools/recortar.py` regenera todo, o por partes: `personajes`, `dibujos`, `escenas`, `fondos`, `portada`.

`personajes.json`, una entrada por personaje:

```json
{
  "educacion": {
    "nombre": "Ministra de Educación", "archivo": "educacion.webp", "ancho": 900, "alto": 1205,
    "ojos": { "izq": [387, 340], "der": [520, 340], "r": 11 }, "arriba": 71,
    "fondo": "#F28FA6", "carton": "#F5E3A0",
    "brillo": { "x": 326, "y": 1000, "r": 240 }
  }
}
```

- `ojos`: coordenadas en píxeles de la imagen recortada, no del original.
- `arriba`: fila donde empieza la cabeza (la escribe `recortar.py`); la carta recorta el aire de encima.
- `fondo`: color de la cartulina de su escena; `carton`: el color del cartón de su carta (la textura es siempre `cartulinablanca`).
- `brillo`: solo Hortensia, el halo de su farol.

## 3. Recorte del croma

Lo hace `tools/recortar.py` con este mismo código. No uses un umbral binario: deja un borde con alfa parcial o quedan dientes de sierra. Script de referencia (Python, numpy + Pillow + scipy):

```python
import numpy as np, io
from PIL import Image
from scipy import ndimage as ndi

def recortar(entrada, salida, ancho=900):
    im = Image.open(entrada).convert('RGB')
    W, H = im.size
    a = np.array(im).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]

    # "verdor": cuánto domina el verde sobre el resto
    d = g - np.maximum(r, b)
    # rampa de alfa: opaco hasta 35, transparente a partir de 90
    alpha = np.clip(1 - (d - 35) / (90 - 35), 0, 1)

    # descarta islas de verde sueltas y manchas pequeñas
    fg = alpha > 0.5
    lab, n = ndi.label(fg)
    tam = ndi.sum(fg, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, s in enumerate(tam) if s > 8000])
    alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0)

    # despill: quita el rebote verde del borde
    g2 = np.minimum(g, np.maximum(r, b) + 6)

    rgba = np.dstack([r, g2, b, alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba).resize((ancho, int(H * ancho / W)), Image.LANCZOS)
    out.save(salida, 'WEBP', quality=88, method=6)
```

Pesa unos 170–250 KB por personaje. Si hay que bajarlo, reduce a 700 px de ancho antes que la calidad.

Después de recortar, abre la imagen sobre un fondo claro y otro oscuro y comprueba que no queda halo verde en los bordes. Si queda, sube el `+6` del despill o el umbral inferior de la rampa.

## 4. Montaje del personaje

El personaje es un `<svg>` con la imagen de fondo y los ojos encima (`svgPersonaje()` en `src/motor.js`). Nada de `<img>`
suelto: los ojos tienen que ir en el mismo sistema de coordenadas que la imagen. La ilustración se muestra entera
(`preserveAspectRatio="xMidYMax meet"`) y se recorta el aire de encima de la cabeza (`arriba` en `personajes.json`).

```html
<svg class="personaje" viewBox="0 97 900 1108" role="img" aria-label="El Comandante">
  <image class="base" href="(recorte incrustado)" x="0" y="0" width="900" height="1205"/>
  <g class="ojos"><circle cx="409" cy="354" r="11"/><circle cx="522" cy="354" r="11"/></g>
</svg>
```

### Ojos

Dos círculos del color `--ojo` (`#161618`). **Se mueven solos**, sin depender de la carta: miran a un lado y a otro
con pausas (`@keyframes mirar`, 7 s, recorrido de 13 unidades del dibujo). Cada carta arranca con un desfase al
azar (`animation-delay` negativo) para que no miren todos a la vez.

**Cuidado con el `transform` en SVG:** una animación CSS de `transform` pisa el atributo `transform` del mismo
elemento. Si un grupo necesita las dos cosas, pon la colocación en un grupo padre y la animación en el hijo.

### Brillo del farol

La única animación de los personajes es el farol de Hortensia: `"brillo": {"x", "y", "r"}` en `personajes.json` (en
píxeles del recorte); `svgBrillo()` pinta un halo que late como una llama (`.brillo`, `@keyframes llama`).

## 5. Reglas al añadir un personaje nuevo

1. Genera la imagen en Gemini con el prompt del personaje y súbela a `assets/personajes/originales/<slug>.jpg`.
2. Ejecuta `python3 tools/recortar.py personajes`.
3. Localiza el centro de cada ojo sobre la imagen recortada y anota las coordenadas en `personajes.json`. Añade el personaje a `PERSONAJE_SLUG` y `GRUPO_DE` en `src/motor.js` y ejecuta `npm test`. Los ojos van dentro de la montura si lleva gafas, a la altura donde estarían las cejas menos un tercio de la cara.
4. Comprueba que no hay halo verde en el borde sobre fondo claro.

## 6. Lo que no hay que hacer

- No pintes los ojos en la imagen. Van siempre por código.
- No subas al repo la imagen original con croma en el directorio que se publica; pesa de más y no se usa en el juego.
- No cambies el tamaño de los personajes uno a uno: todos comparten el mismo encuadre, con la cabeza ocupando en torno al 40 % del alto y los hombros tocando los dos bordes laterales. Si uno se ve más pequeño que el resto, el fallo está en la imagen, no en el CSS.


## Estilo nuevo en prueba: «el periódico mural» (21 oct)
Collage pobre y cubista, hecho con lo que hay (periódico viejo, libreta cuadriculada, papel de saco, cartón de cajas, chapas, cinta amarillenta): caras partidas en dos planos de papeles distintos, formas grandes, rasgadas y mal alineadas, colores sucios y un solo toque de color fuerte. De momento solo lo usa la carta del Comandante de la pantalla del nombre (`dictador-joven-mural`). Plantilla del prompt (la del Comandante joven, de Gemini):

```
A crude cubist paper collage portrait, in the style of an early Picasso papier collé, made by poor neighbours for a revolutionary wall newspaper in a country where there is a shortage of everything. Only recycled, old and dirty materials: yellowed newspaper with grey smudged columns (no readable text), pages of a worn ration booklet, brown sugar-sack paper, cardboard from an old box, a cigar-box label, thin flour paste stains, ballpoint pen and an almost dry marker.
[sujeto: medio cuerpo, centrado; cara partida en dos planos de papeles distintos; SIN ojos (se añaden luego); boca a rotulador del color de su grupo; un solo acento de color fuerte]
Everything is rough, simple, out of proportion and slightly misaligned; many edges are torn by hand, not cut. Visible yellowed adhesive tape, glue stains, creases and pencil marks. Muted, dirty, faded colors.
Flat view from straight above, flat even lighting, very short dark shadows under the paper pieces (glued flat). Vertical format 3:4. Solid chroma-key green background (#00B140), flat and even, with nothing else on it.
Rules: no text, no letters, no flags, no stars, no real symbols or insignia. Nothing shiny, nothing new: no felt, no wool, no clean cardstock.
```
Pendiente de decidir: el brazo en alto a la izquierda (como el resto de etapas del dictador) y si el recorte de periódico de detrás forma parte del estilo.
