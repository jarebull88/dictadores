# Personajes e iconos: de la imagen de Gemini a la carta del juego

Especificación del pipeline de personajes de *¡Comandante, ordene!*. Léela entera antes de tocar nada.

> **Importante (10 oct 2026): el modo Noir se quitó del juego.** Las secciones sobre la paleta Noir y los filtros `#bw` quedan como referencia, pero ya no se usan; el campo `noir` de `personajes.json` también se quitó. La ilustración se muestra entera (`preserveAspectRatio="xMidYMax meet"`).
>
> **Actualizado el 10 oct 2026** a lo que hay en el juego: los ojos ya no se mueven solos (siguen a la carta, ver «Ojos»), Agricultura se fusionó con Trabajo, el recorte lo hace `tools/recortar.py` y los iconos siguen el mismo proceso.

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
    personajes.json    metadatos: posición de los ojos, contraste en Noir, extras
  iconos/
    originales/        hojas de iconos con croma: hoja-fuerzas, hoja-estados, hoja-archivo
    recortados/        un WebP por icono (pueblo, ejercito, elite, potencias, censura, …, archivo, bloqueado)
```

`python3 tools/recortar.py` regenera todos los recortes (o `personajes` / `iconos` por separado). Los iconos se
nombran por su posición en la hoja; el orden está en `HOJAS`, dentro del script.

`personajes.json`, una entrada por personaje:

```json
{
  "cultura": {
    "nombre": "Ministra de Cultura",
    "archivo": "cultura.webp",
    "ancho": 900,
    "alto": 1205,
    "ojos": { "izq": [383, 487], "der": [545, 487], "r": 9.5 },
    "noir": { "contraste": "duro" },
    "extras": []
  }
}
```

- `ojos`: coordenadas en píxeles de la imagen recortada, no del original.
- `noir`: `"duro"` por defecto; `"suave"` para personajes de ropa muy clara (Interior, Agricultura), que de otro modo se queman y pierden la textura del papel.
- `extras`: `["humo"]` solo en Fuerzas Armadas, con `"humo": [x, y]`: la punta del puro, donde nace el humo.

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

El personaje es un `<svg>` con la imagen de fondo y los ojos encima. Nada de `<img>` suelto: los ojos tienen que ir en el mismo sistema de coordenadas que la imagen.

```html
<svg class="personaje" viewBox="0 0 900 1205" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Ministra de Cultura">
  <defs>
    <!-- Filtro blanco y negro de la paleta Noir -->
    <filter id="bw" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix"
        values=".33 .59 .11 0 0  .33 .59 .11 0 0  .33 .59 .11 0 0  0 0 0 1 0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.75" intercept="-.41"/>
        <feFuncG type="linear" slope="1.75" intercept="-.41"/>
        <feFuncB type="linear" slope="1.75" intercept="-.41"/>
      </feComponentTransfer>
    </filter>
    <!-- Variante suave, para personajes de ropa muy clara -->
    <filter id="bw-suave" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix"
        values=".33 .59 .11 0 0  .33 .59 .11 0 0  .33 .59 .11 0 0  0 0 0 1 0"/>
      <feComponentTransfer>
        <feFuncR type="table" tableValues="0 .07 .24 .5 .74 .88"/>
        <feFuncG type="table" tableValues="0 .07 .24 .5 .74 .88"/>
        <feFuncB type="table" tableValues="0 .07 .24 .5 .74 .88"/>
      </feComponentTransfer>
    </filter>
  </defs>

  <image id="base" href="assets/personajes/recortados/cultura.webp"
         x="0" y="0" width="900" height="1205"/>

  <g class="ojos">
    <circle cx="383" cy="487" r="9.5"/>
    <circle cx="545" cy="487" r="9.5"/>
  </g>
</svg>
```

**El filtro va en el SVG, no en CSS.** `filter: grayscale(1)` por CSS sobre un `<image>` dentro de un SVG lo ignoran algunos navegadores (Safari entre ellos) y el personaje se queda a color. Con `feColorMatrix` funciona en todos.

Para activar Noir, pon el atributo en la imagen:

```js
base.setAttribute('filter', 'url(#bw)');   // noir
base.removeAttribute('filter');            // vivo
```

### Ojos

Dos círculos del color `--ojo` (`#161618`). **Se mueven solos**, sin depender de la carta: miran a un lado y a otro
con pausas (`@keyframes mirar`, 7 s, recorrido de 13 unidades del dibujo). Cada carta arranca con un desfase al
azar (`animation-delay` negativo) para que no miren todos a la vez.

**Cuidado con el `transform` en SVG:** una animación CSS de `transform` pisa el atributo `transform` del mismo
elemento. Si un grupo necesita las dos cosas, pon la colocación en un grupo padre y la animación en el hijo.

### Mini animaciones

Cada personaje lleva una, dibujada en SVG encima de la imagen. En `personajes.json`:
`"animacion": { "tipo": "humo", "x": 752, "y": 1128 }` — el tipo y el punto (en píxeles del recorte) donde se coloca.
Los dibujos están en `ANIMACION` (`src/motor.js`) y el movimiento en `src/estilos.css`. Tipos: `humo` (puro),
`timbre` (teléfono que suena), `flecha` (gráfico que sube), `destello`, `mosca`, `sello` («PROHIBIDO»),
`piloto` (luz roja que parpadea) y `gota` (sudor). Para uno nuevo, añade su dibujo a `ANIMACION` y su `@keyframes`.

## 5. Las dos paletas

**Normal (vivo).** La imagen tal cual, sin filtro. Ojos `#161618`. El fondo de la escena es uno de los colores planos del juego: gris `#D9D5CB` (por defecto), papel `#F8F6F0` o carbón `#2B2A27`.

**Noir.** Toda la imagen pasa por el filtro de blanco y negro con mucho contraste. En esta paleta solo hay tres colores posibles, y el jugador elige dos cosas:

- **Fondo:** blanco `#f2f0ea`, negro `#0b0b0c` o rojo `#b3171f`.
- **Ojos:** blancos `#f4f2ec`, negros `#0b0b0c` o rojos `#d3202a`.

Por defecto, fondo negro y ojos blancos. El jugador lo elige en la portada (bloque «Estilo», con una muestra del Vicepresidente) y se recuerda en el navegador. Los controles de fondo de Normal se ocultan en Noir y se muestran estos dos grupos en su lugar. En Noir los iconos también pasan a gris (son `<img>` HTML, ahí el filtro CSS sí sirve).

```js
function setPaleta(nombre) {
  const noir = nombre === 'noir';
  const base = svg.querySelector('#base');
  if (noir) base.setAttribute('filter', `url(#${suave ? 'bw-suave' : 'bw'})`);
  else base.removeAttribute('filter');
  svg.style.setProperty('--ojo', noir ? '#f4f2ec' : '#161618');
  // mostrar u ocultar los grupos de botones correspondientes
}
```

El rojo es el único acento de la paleta Noir. No metas ningún otro color: ni amarillos, ni verdes, ni destacados sueltos de la imagen. Si hace falta resaltar algo, se hace con el rojo o no se hace.

## 6. Reglas al añadir un personaje nuevo

1. Genera la imagen en Gemini con el prompt del personaje y súbela a `assets/personajes/originales/<slug>.jpg`.
2. Ejecuta `python3 tools/recortar.py personajes`.
3. Localiza el centro de cada ojo sobre la imagen recortada y anota las coordenadas en `personajes.json`. Añade el personaje a `PERSONAJE_SLUG` y `GRUPO_DE` en `src/motor.js` y ejecuta `npm test`. Los ojos van dentro de la montura si lleva gafas, a la altura donde estarían las cejas menos un tercio de la cara.
4. Comprueba las dos paletas y los tres fondos de Noir. Si en Noir se pierde la textura del papel, cámbialo a `"suave"`.
5. Comprueba que no hay halo verde en el borde sobre fondo claro.

## 7. Lo que no hay que hacer

- No pintes los ojos en la imagen. Van siempre por código.
- No uses filtros CSS para el blanco y negro.
- No añadas colores a la paleta Noir más allá del rojo.
- No subas al repo la imagen original con croma en el directorio que se publica; pesa de más y no se usa en el juego.
- No cambies el tamaño de los personajes uno a uno: todos comparten el mismo encuadre, con la cabeza ocupando en torno al 40 % del alto y los hombros tocando los dos bordes laterales. Si uno se ve más pequeño que el resto, el fallo está en la imagen, no en el CSS.
