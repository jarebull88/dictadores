# Sistema de diseño (24 oct)

Igual que la tipografía (`docs/TIPOGRAFIA.md`), **las medidas que se repiten viven en un solo bloque** de `src/estilos.css`, entre `DISENO:INICIO` y `DISENO:FIN`. Un cambio ahí llega a todo el juego. Lo vigila `tests/diseno.test.js`.

| Variable | Valor | Qué controla |
|---|---|---|
| `--linea` | 1,5 px | grosor de todo contorno de tinta |
| `--borde` | `--linea` sólida, tinta | contorno de cartas, iconos, barras, casillas, mazo, logros y menú |
| `--margen-carta` | 3,5 % | margen de las cartas (blanco, `--p-blanco`) |
| `--cuadro` | 46 px (40 en pantallas estrechas) | lado de las casillas de estado |
| `--menu` | `--cuadro` / 2 | tamaño del menú (☰) |
| `--alto-leyenda` | `--t-l` × 1,15 | la franja bajo la carta (cargo, nombre del estado, instrucción del tutorial) |
| `--aviso` | (`--cuadro` − `--menu`) / 2 | la bolita amarilla del menú: llena el hueco hasta el borde de las casillas |
| `--mazo-cartas` | 4 | cartas que se ven debajo de la de arriba |
| `--mazo-paso` | 3,5 px | lo que asoma cada una |
| `--mazo-alto` | cartas × paso | lo que ocupa el mazo; carta y mazo se centran juntos en el hueco |
| `--separacion` | 6 px | hueco entre casillas |

**Regla:** si algo se repite en el CSS, se convierte en una variable de este bloque y se añade al test. Las medidas del texto siguen en el bloque de tipografía.

**Cómo se coloca la carta (todas las pantallas):** en la partida, la carta cuadrada (`--lado`) y su mazo van centrados como un solo conjunto en el hueco entre la pregunta y el pie. `medirCartaJuego()` mide dónde queda la carta y guarda `--carta-w`, `--carta-h` y `--cabecera-h`; las pantallas de nombre, era y caída usan esas medidas para poner su carta en el mismo sitio.
