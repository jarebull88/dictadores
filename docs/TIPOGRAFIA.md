# Tipografía del juego (24 oct; 2 nov: tres estilos, por Jorge)

**Solo hay tres estilos de letra**, definidos en un único bloque de `src/estilos.css` (entre `TIPOGRAFIA:INICIO` y `TIPOGRAFIA:FIN`). El test `tests/tipografia.test.js` falla si alguien pone letra, tamaño o peso suelto fuera del bloque.

- **ESTILO 1 · TÍTULOS:** Londrina Solid, mayúsculas (`--t-xl`, `--t-l`, `--t-m`, `--t-s`).
- **ESTILO 2 · SUBTÍTULOS:** Londrina en mayúsculas, al tamaño de «Comercio» (`--c-respuesta`, 27 px como mucho): **ligero** (300, `--peso-ligero`) en la leyenda bajo la carta, las respuestas, «Gobernaste por N años», «Has gobernado N años», el título de una recompensa o logro bajo su carta y su «Por …»; **normal** (400) en la frase de qué fuerza cayó («El Pueblo llegó al mínimo.») y los carteles «¡Nueva recompensa!».
- **ESTILO 3 · CUERPO:** **Roboto Condensed**, mayúsculas, **un solo peso** (`--peso-cuerpo`, 400 desde el 2 nov; antes 700): las preguntas, el texto de la era, el reverso de todas las tarjetas (fichas, informes, secuelas, fuerzas, recompensas y logros), el relato de la caída, las notas de aviso, la esquela, los botones y el campo del nombre. Tamaños: `--c-pregunta` 22 px (20 en pantallas bajas), `--c-texto` 18 px, `--c-pequeno` 16 px. (2 nov: antes Sofia Sans Semi Condensed, en negrita 800 o normal.)

## Cómo cambiar un estilo
- **Para cambiar una letra, un tamaño o un peso:** se cambia el valor en el bloque (variables `--f-*`, `--t-*`, `--c-*`, `--peso-*`) y se aplica a todo el juego a la vez.
- **Para un texto nuevo:** se añade su selector a un estilo del bloque. No se le da estilo propio.

## Ajustes de «caber»
`motor.js` puede achicar una letra solo para que un texto quepa (`ajustarMensaje`, `ajustarTituloEra`, `ajustarFicha`, `ajustarIntro`). Lo hace con una medida mínima y no cambia el estilo. En la ficha usa las variables `--ficha-px` (cuerpo) y `--nombre-px` (nombre).
