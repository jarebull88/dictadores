# Tipografía del juego (24 oct; 2 nov: tres estilos y un tamaño por estilo, por Jorge)

**Hay tres estilos de letra y cada uno tiene UN solo tamaño**, definidos en una única regla cada uno, en el bloque de `src/estilos.css` (entre `TIPOGRAFIA:INICIO` y `TIPOGRAFIA:FIN`). Un texto del juego es de uno de los tres; para cambiar todos los textos de un estilo se cambia su regla (o su variable) y listo. El test `tests/tipografia.test.js` falla si alguien pone letra, tamaño o peso suelto fuera del bloque.

| Estilo | Letra | Variable | Tamaño | Dónde sale |
|---|---|---|---|---|
| **1 · Título** | Londrina Solid, mayúsculas | `--t-titulo` | 12 % del ancho de la carta, máx. 48 px | «Era 1: La Revolución», «¡Has caído!», «Recompensas», el nombre en la ficha, el título de las cartas de objeto |
| **2 · Subtítulo** | Roboto Condensed **Bold** (700), mayúsculas | `--t-sub` | 27 px, menos si la carta es estrecha (2 nov: ya no es Londrina) | La leyenda («Comercio»), las respuestas, «Gobernaste por N años», «Has gobernado N años», el título de una recompensa y su «Por …», «El Pueblo llegó al mínimo.», los carteles «¡Nueva recompensa!», los botones de la portada, el nombre de la esquela |
| **3 · Cuerpo** | Roboto Condensed regular, mayúsculas | `--c-cuerpo` (interlineado `--lh-cuerpo`) | 20 px (18 en pantallas bajas) | las preguntas, el texto de la era, el reverso de todas las tarjetas, el relato de la caída, los avisos, los botones de partida, el campo del nombre, las etiquetas y textos pequeños |

## Cómo cambiar un estilo
- **Para cambiar una letra, un tamaño o un peso:** se cambia la variable (`--t-titulo`, `--t-sub`, `--c-cuerpo`, `--f-*`, `--peso-*`) o la regla del estilo, y se aplica a todo el juego a la vez.
- **Para un texto nuevo:** se añade su selector a uno de los tres estilos. No se le da estilo propio.
- **Excepciones** (tamaños que se calculan solos para que algo quepa): `--leyenda-px` (la leyenda), `--ficha-px` y `--nombre-px` (la ficha), y el logo de la portada.

## Ajustes de «caber»
`motor.js` puede achicar una letra solo para que un texto quepa (`ajustarMensaje`, `ajustarTituloEra`, `ajustarFicha`, `ajustarIntro`). Lo hace con una medida mínima y no cambia el estilo. En la ficha usa las variables `--ficha-px` (cuerpo) y `--nombre-px` (nombre).
