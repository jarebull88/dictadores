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
0. **Arte: los cuatro iconos del menú a pantalla completa** (Recompensas, Logros, Ajustes, Salir): hoy son dibujos SVG provisionales, de color plano de la paleta (`#btn-recompensas`… en `cuerpo.html`).
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
12. **Logros de era (29 oct, Jorge):** las cartas de logro no tienen Beneficio ni Perjuicio (quitarlo de la carta girada; solo los coleccionables los llevan). «Por los pelos» se consigue con **2 o más fuerzas en zona crítica** al terminar la era.
13. ~~**Tutorial nuevo**~~ **hecho el 29 oct (programación)**: ambas respuestas siguen adelante, sin paso «guardar», la secuela se gira en su paso, títulos «Era N: …». (Antes: Tutorial nuevo (29 oct, Textos; los textos ya están en `TUTORIAL`):** (a) las dos respuestas siguen adelante: la izquierda ya no vuelve atrás; (b) la carta de la secuela «Luna de miel» se puede girar en su paso, y se quita el paso «guardar» (su entrada en `TUTORIAL` es provisional: bórrala y ajusta la prueba de los ocho pasos de `partida.test.js`); (c) el título de la pantalla del nombre pasa a «Era 1: La Revolución», y el del paso de era, a «Era 2: La Purga», etc.; (d) hecho: la izquierda de la pantalla del nombre dice «Me da miedo el micrófono» (Jorge, 29 oct).
14. **Caídas por era (30 oct, Textos):** `FINALES` tiene ya la versión de la era 1 (títulos nuevos: Ingratitud, Unanimidad, Embajador, Anexión); hace falta que cada era tenga las suyas (p. ej. `FINALES_ERA[era][clave]`, con la de la era 1 de reserva) y que, si caes en una carta de Domingo, Sarria, Strenko, Pembrook o Anselmo, salga su muerte en lugar de la de la barra (con la frase en negrita de qué barra cayó; textos en `docs/MUERTES.md`).
15. **Atentados (30 oct, Textos):** mecanismo en `docs/MUERTES.md` («Atentados»): carta sorpresa tras una decisión, protección oculta solo por el Ejército (riesgo del 75 % con el Ejército ≤20 al 5 % con ≥80), uno por era sin contar para el largo de la era, premio que acerca a 50 la fuerza de la carta, muerte propia con todas las barras cayendo, y rechazo con una secuela de un solo golpe. Los números, a ajustar con `npm run simular`. Textos de cada atentado: los entrega Textos.
16. **Pupo, mecánica nueva (31 oct, Textos):** ver «Pupo: mecánica nueva» en `docs/INVITADOS.md` (amenaza sin efectos, hechizo con suerte según el Pueblo, secuelas Collar y maldición, carta de resultado). Números por calcular con Textos.
17. **Logros de trama (31 oct, Jorge):** completar una trama (de era o entre eras) da un logro; si una decisión la corta, ya no. Ver «Tipos de trama» en `PLAN_NARRATIVO.md`. El primero será Papá Ernesto (punto ya apuntado arriba); los textos, Coleccionables.
18. **Cartas de aviso (31 oct, Jorge):** tipo nuevo de carta (p. ej. `tipo: "aviso"`, encolada tras una decisión): sin respuestas, se desliza a cualquier lado como una secuela, sin efectos salvo que los lleve, no cuenta para el largo de la era; imagen de personaje u objeto, texto arriba y `leyenda` propia («NOTA DE INTELIGENCIA»; nunca «TRAMA PERDIDA»), y nunca en la misma decisión que saca una carta de secuela. Ver `PLAN_NARRATIVO.md`, «Cartas de aviso».
19. Quitar de `CLAUDE.md` lo que se quede obsoleto cuando esto cambie.

- **Logro «la historia de Ernesto»** (29 oct, Jorge): se da al decidir la tercera carta de Papá Ernesto (`ernesto_higado`), que solo sale si aceptas el torneo y el whisky. **Regla hecha (29 oct, `llegar` en `LOGROS`)**; faltan sus textos (hoy «Pendiente»): los redacta Coleccionables. Sin imagen.

## Textos (la lleva «Comandante - Textos»)
**Pruebas (29 oct, Jorge):** si solo cambian textos de cartas (preguntas, respuestas, fichas), `npm run build` y `node --test tests/coherencia.test.js tests/lados.test.js`, y se sube; sin `npm test` completo (manda `CLAUDE.md`, «Cómo pasar las pruebas», punto 3). Si cambia la estructura (banderas, condiciones, colas, pesos), además `npm test` completo una vez antes de subir.
Ver «Estado a 29 oct» en `PLAN_NARRATIVO.md`. Lo siguiente que pidió Jorge: las muertes de la era 1 (8 caídas con versión por era, atentados como cartas sueltas, muerte de humor); luego expedientes desfasados y la era 2 por el mismo camino que la 1.

**Pendientes menores de Textos (sin prisa):** que más cartas invoquen a Pupo y que tenga cartas en las eras 2 a 4; calcular la fuerza y la duración del Collar y la maldición de Pupo, y del premio y el castigo de los atentados.

## Arte (la lleva «Comandante - Arte»)
Ver §11 y §12 de `GUIA_ARTE_BACHS.md`. Pendiente: reverso de la era 1 (probar v10), Pupo, edición de color de Ernesto, reversos de las eras 2–4, carta del logro «Paloma amaestrada», escenas de las caídas, elegir prueba de expedientes (recomendada la A) y tintas por personaje, decidir si el Comandante pasa a una sola imagen.

## Coleccionables (la lleva «Comandante - Coleccionables»)
Ver «Traspaso a programación» y las notas finales de `COLECCIONABLES.md`. La era 1 está completa en el juego (29 oct). Faltan textos del carné y los billetes; los embajadores occidentales de las eras 2 a 4.
