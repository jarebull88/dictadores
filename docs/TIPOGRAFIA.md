# Tipografía del juego (24 oct)

**Solo hay tres estilos de letra**, definidos en un único bloque de `src/estilos.css` (entre `TIPOGRAFIA:INICIO` y `TIPOGRAFIA:FIN`). El test `tests/tipografia.test.js` falla si alguien pone letra, tamaño, peso, mayúsculas, espaciado o interlineado en otra parte del CSS, o en línea en el HTML o en `motor.js`.

- **TITULAR:** Londrina Solid, siempre en mayúsculas, peso normal.
- **CUERPO:** Sofia Sans Semi Condensed (condensada, como Londrina; desde el 24 oct, antes Baloo 2), en negrita (800, `--peso-negrita`) o normal (400). Sus tamaños son los de Baloo × 1,16.
- **CURSIVA:** Playwrite IT Moderna, normal. Solo para «¡Nuevo logro!» (`--f-cursiva`, `--t-cursiva`: 26 px).

## Cómo cambiar un estilo
- **Para cambiar una letra, un tamaño o un peso:** se cambia el valor del papel en el bloque (variables `--f-*`, `--t-*`, `--c-*`) y se aplica a todo el juego a la vez.
- **Para un texto nuevo:** se añade su selector a un papel de la tabla. No se le da estilo propio.

## Papeles
| Papel | Estilo | Tamaño | Dónde sale |
|---|---|---|---|
| **Titular XL** | Londrina, mayúsculas | `--t-xl`: 15 % del ancho de la carta, máx. 56 px | «¡Has caído!», «¡Has ganado!», el nombre en la ficha (en dos líneas, nombre y apellido) |
| **Titular L** | Londrina, mayúsculas | `--t-l`: 10 % del ancho de la carta, máx. 44 px | el título de la era («La Purga»…) y el de la pantalla del nombre |
| **Titular M** | Londrina, mayúsculas | `--t-m`: 26 px | títulos de las ventanas de fuerzas y estados, nombre del estado en su carta, «Comenzar partida» y «Cómo se juega», título de la esquela y de las cartas de caída, la causa al final |
| **Titular S** | Londrina, mayúsculas | `--t-s`: 21 px | cintas del tutorial, efecto del estado, «Has gobernado N años», estados con nombre muy largo |
| **Logo** | Londrina, mayúsculas | 46 px y 92 px | «Comandante, ¡Ordene!» de la portada |
| **Cursiva** | Playwrite, normal | `--t-cursiva`: 26 px | «¡Nuevo logro!», que se escribe en el sitio del nombre y los años |
| **Pregunta** | Sofia, negrita | `--c-pregunta`: 22 px (20 px en pantallas bajas) | la pregunta de cada carta, el texto de la pantalla del nombre, el de la pantalla de era, el campo del nombre |
| **Respuesta** | Sofia, negrita | `--c-respuesta`: 27 px (menos si la carta es estrecha) | la respuesta que sale al arrastrar |
| **Texto** | Sofia, normal (negrita en destacados) | `--c-texto`: 18 px | ventanas, fichas, informes, relato final, esquela, errores, botones |
| **Pequeño** | Sofia, normal (negrita en el nombre del Comandante y en las alertas) | `--c-pequeno`: 16 px | «Comandante X · N años», «Abandonar partida», etiquetas, avisos, nombre de las cartas de estado |

## Ajustes de «caber»
`motor.js` puede achicar una letra solo para que un texto quepa (`ajustarMensaje`, `ajustarTituloEra`, `ajustarFicha`, `ajustarIntro`). Lo hace con una medida mínima y no cambia el estilo. En la ficha usa las variables `--ficha-px` (cuerpo) y `--nombre-px` (nombre).
