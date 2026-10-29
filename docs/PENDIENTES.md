# Pendientes y reparto de conversaciones (29 oct)

Se escribe a mano. Cada conversación actualiza **su** sección al terminar (y apunta las decisiones con fecha en `HISTORIAL_DE_DECISIONES.md`). Si necesitas algo de otra área, anótalo aquí, en la sección de esa área, y díselo a Jorge; no lo hagas tú.

## Las cuatro conversaciones
| Conversación | Modelo | Qué hace | Qué NO toca | Su documento |
|---|---|---|---|---|
| **Comandante - Programación** | Sonnet | Interfaz, motor, gestos, sonido, pruebas, build, integrar arte y textos ya aprobados | Redactar cartas, generar imágenes | `CLAUDE.md`, este archivo |
| **Comandante - Textos** | Opus | Cartas, preguntas y respuestas, estructura y pesos, eras, caídas, expedientes, invitados | Código, imágenes, pruebas | `PLAN_NARRATIVO.md`, `GUIA_DE_REDACCION.md`, `INVITADOS.md`, `PESOS_CARTAS.md` |
| **Comandante - Arte** | Opus | Carteles, iconos, personajes, reversos, escenas; prompts del generador; diseño de los expedientes | Código, textos de cartas; retocar imágenes (se piden al generador o las hace Jorge) | `GUIA_ARTE_BACHS.md`, `PERSONAJES.md`, `PALETA.md` |
| **Comandante - Coleccionables** | Opus | Textos y diseño de recompensas y logros | Código, imágenes | `COLECCIONABLES.md` |

Para verificar hechos históricos o nombres de ministerios hace falta una conversación con búsqueda web (la de programación no tiene internet).

## Programación (la lleva «Comandante - Programación»)
**Hecho el 28–29 oct:** secuelas e iconos salen en vertical (secuelas abajo, iconos arriba); «Has caído» sin cinta y con la causa y los años bajo la carta; **Pupo y Ernesto en el juego** (`personajes.json`, `GRUPO_DE`, `FICHAS`, 8 cartas de Pupo y 3 anclas de Ernesto en `datos.js`; `encolar: [{ invoca: "pupo" }]` elige una amenaza al azar, una vez por era); sonido (reparto, giro, deslizar, volver; menú «Sonido: sí/no»), carta de información de fuerzas y casillas, secuelas que se giran y bajan a su casilla, banda de aviso, 12 coleccionables con desbloqueo real, `test:rapido`.
**Por hacer, por orden de importancia:**
1. ~~Alta de Padrino Pupo y Papá Ernesto~~ **hecho el 29 oct** (ver abajo). Falta que Arte repase el color de Ernesto y la imagen definitiva de Pupo (el fondo está tomado del cartel actual).
2. **Etiqueta histórica de las cartas** (`historia` y `hecho` en cada carta + prueba que impida cartas sin etiqueta; ver `PLAN_NARRATIVO.md`, fase del motor).
3. **Caídas con versión por era, atentados como cartas sueltas, muerte de humor** (cuando Textos las entregue).
4. **Expedientes como cartel tipográfico hecho con código** (cuando Jorge elija la prueba de `tools/prueba_fichas.html` y Arte dé las tintas por personaje).
5. **Nombre del jugador y año** en otra zona de la pantalla (Jorge la dirá; formato propuesto «Año x»; máx. 7 letras de nombre).
6. **Estilo definitivo de la banda de aviso** (hoy texto crema provisional, `--banda-texto`) y de los avisos en general.
7. **Sonidos reales** de `deslizar` y `volver` (hoy sintetizados), música ambiente y voces; probar el audio en Safari de iPhone (no probado: se añadió `audioSession`).
8. **Prueba sin contornos negros** (`--contorno: transparent`): Jorge decide si se queda.
9. Test de longitud de respuestas aún vigila 36 caracteres (criterio nuevo: ≤24, provisional).
10. «Revolución con buenos modales» se cumple si al acabar la era no hay Censura, Vigilancia ni Jaula (lectura literal); si Jorge la quiere «en toda la era», registrar las secuelas que pasan.
11. Peso del HTML ~7,7 MB (el «4,3 MB» antiguo ya no es cierto); no tocar sin que Jorge lo pida.
12. Quitar de `CLAUDE.md` lo que se quede obsoleto cuando esto cambie.

- **Logro «la historia de Ernesto»** (29 oct, Jorge): se da al llegar a la tercera carta de Papá Ernesto (`ernesto_higado`), que solo sale si aceptas el torneo y el whisky. Textos: Coleccionables; regla: Programación.

## Textos (la lleva «Comandante - Textos»)
Ver «Estado a 29 oct» en `PLAN_NARRATIVO.md`. Lo siguiente que pidió Jorge: las muertes de la era 1 (8 caídas con versión por era, atentados como cartas sueltas, muerte de humor); luego expedientes desfasados y la era 2 por el mismo camino que la 1.

## Arte (la lleva «Comandante - Arte»)
Ver §11 y §12 de `GUIA_ARTE_BACHS.md`. Pendiente: reverso de la era 1 (probar v10), Pupo, edición de color de Ernesto, reversos de las eras 2–4, carta del logro «Paloma amaestrada», escenas de las caídas, elegir prueba de expedientes (recomendada la A) y tintas por personaje, decidir si el Comandante pasa a una sola imagen.

## Coleccionables (la lleva «Comandante - Coleccionables»)
Ver «Traspaso a programación» y las notas finales de `COLECCIONABLES.md`. Faltan el perjuicio de la botella; textos de la postal, el carné, los billetes y los cuatro logros de la era; los embajadores occidentales de las eras 2 a 4.
