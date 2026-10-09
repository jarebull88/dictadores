# Personajes: de la imagen de Gemini a la carta del juego

Especificación del pipeline de personajes de *A la orden mi comandante*. Léela entera antes de tocar nada.

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
| `agricultura` | Ministro de Agricultura | — |
| `economia` | Ministro de Economía | — |
| `vicepresidente` | Vicepresidente del Consejo de Estado | — |
| `embajador-oriental` | Embajador del Bloque Oriental | — |
| `embajador-occidental` | Embajador del Bloque Occidental | — |

## 2. Estructura de archivos

```
assets/
  personajes/
    originales/        imágenes crudas de Gemini, con el croma (no se publican)
      cultura.png
    recortados/        PNG/WebP con transparencia, 900 px de ancho
      cultura.webp
    personajes.json    metadatos: posición de los ojos y extras
```

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
- `extras`: `["humo"]` solo en Fuerzas Armadas.

## 3. Recorte del croma

No uses un umbral binario: deja un borde con alfa parcial o quedan dientes de sierra. Script de referencia (Python, numpy + Pillow + scipy):

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

Dos círculos negros, del mismo negro que el pelo. Se mueven despacio de un lado a otro, con pausas: ciclo de 11 s y recorrido de unos 9 px. Tiene que ser casi imperceptible; si se nota, está mal.

```css
@keyframes mirar {
  0%, 12%   { transform: translate(0, 0); }
  22%, 38%  { transform: translate(-9px, 1px); }
  48%, 58%  { transform: translate(0, 0); }
  68%, 86%  { transform: translate(9px, -1px); }
  96%, 100% { transform: translate(0, 0); }
}
.personaje .ojos { fill: var(--ojo, #161618); animation: mirar 11s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .personaje .ojos { animation: none; }
}
```

El color sale de la variable `--ojo`, que cambia con la paleta.

**Cuidado con el `transform` en SVG:** una animación CSS de `transform` pisa el atributo `transform` del mismo elemento. Si un grupo necesita las dos cosas, pon la colocación en un grupo padre y la animación en el hijo.

### Extras

Fuerzas Armadas lleva humo saliendo del puro: dos volutas idénticas con la misma animación desfasada media vuelta.

```css
@keyframes humo {
  0%   { opacity: .85; transform: translate(0, 0) scale(.7); }
  70%  { opacity: .5; }
  100% { opacity: 0; transform: translate(14px, -120px) scale(1.5); }
}
.humo1 { animation: humo 4.5s linear infinite; }
.humo2 { animation: humo 4.5s linear -2.25s infinite; }
```

Las volutas van dentro del SVG, colocadas sobre la punta del puro, en gris claro y con una sombra corta.

## 5. Las dos paletas

**Vivo.** La imagen tal cual, sin filtro. Ojos `#161618`. El fondo de la escena es uno de los colores planos del juego.

**Noir.** Toda la imagen pasa por el filtro de blanco y negro con mucho contraste. En esta paleta solo hay tres colores posibles, y el jugador elige dos cosas:

- **Fondo:** blanco `#f2f0ea`, negro `#0b0b0c` o rojo `#b3171f`.
- **Ojos:** blancos `#f4f2ec`, negros `#0b0b0c` o rojos `#d3202a`.

Por defecto, fondo negro y ojos blancos. Los controles de fondo de la paleta Vivo se ocultan en Noir y se muestran estos dos grupos en su lugar.

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

1. Genera la imagen en Gemini con el prompt del personaje y súbela a `originales/`.
2. Pásala por el script de recorte y guárdala en `recortados/`.
3. Localiza el centro de cada ojo sobre la imagen recortada y anota las coordenadas en `personajes.json`. Los ojos van dentro de la montura si lleva gafas, a la altura donde estarían las cejas menos un tercio de la cara.
4. Comprueba las dos paletas y los tres fondos de Noir. Si en Noir se pierde la textura del papel, cámbialo a `"suave"`.
5. Comprueba que no hay halo verde en el borde sobre fondo claro.

## 7. Lo que no hay que hacer

- No pintes los ojos en la imagen. Van siempre por código.
- No uses filtros CSS para el blanco y negro.
- No añadas colores a la paleta Noir más allá del rojo.
- No subas al repo la imagen original con croma en el directorio que se publica; pesa de más y no se usa en el juego.
- No cambies el tamaño de los personajes uno a uno: todos comparten el mismo encuadre, con la cabeza ocupando en torno al 40 % del alto y los hombros tocando los dos bordes laterales. Si uno se ve más pequeño que el resto, el fallo está en la imagen, no en el CSS.
