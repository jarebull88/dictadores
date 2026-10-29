# Plan narrativo (28 oct)

Se escribe a mano (no la genera `npm run docs`). Es el traspaso a la conversación que rehace el sistema narrativo del juego: diagnóstico, decisiones de Jorge y plan por fases. **Aquí no se escriben cartas**: cada fase deja su resultado en su propio documento.

## Lo que quiere Jorge
Un sistema narrativo que cuente historias distintas según las decisiones, con base histórica creíble (la Revolución cubana, disfrazada: regla 1 de `CLAUDE.md`), humor y personalidad, y que aproveche el formato de cartas. No se trata de escribir mejores preguntas una a una, sino de fijar criterios y probarlos antes de extenderlos.

## Diagnóstico (28 oct, sobre las 119 cartas activas)

**A. Rigor histórico.** Primera pasada de memoria (sin verificar): unas 60 cartas documentadas, unas 25 plausibles, unas 15 de humor y unas 8 con problemas. Problemas vistos:
- `retrato` (era 1): el Partido pide culto al líder en 1959–62, cuando históricamente lo rechazaba y el Partido aún no existía.
- `el_escrutinio` (era 4): el «Sí» gana elecciones libres; contrafactual contado como si el sistema lo permitiera.
- `deuda_llama` (era 2): impago de deuda en los 60; la crisis de la deuda es de 1986.
- El id `universidades` lleva el texto del puerto.
- Tres cartas repiten «la unidad especial del Interior» (`jefe_poder`, `jefe_insaciable`, `el_batallon`).

**B. Narrativa y ramificaciones.** El motor ya funciona como el de Reigns (condiciones, pesos, colas, estados, grupos excluyentes): no hay que rehacerlo. Pero:
- No hay ninguna variable que recuerde cómo gobierna el jugador. Las barras miden peso político, no rumbo, y los efectos están recentrados (cada barra suma lo que la otra opción resta): el jugador óptimo solo equilibra.
- De 45 banderas, 9 no las exige ninguna carta y 1 (`base.criticos_detenidos`) se exige sin ponerse nunca. Por era, las cartas condicionadas son 7, 14, 9 y 6.
- El final siempre es «moriste en tu cama»; solo cambian 6 líneas de la esquela. Las 8 caídas dependen solo de qué barra llega al límite.
- Cada era juega 8–10 de sus 24–34 cartas: la variedad por azar ya existe; falta que las partidas se sientan distintas.

**C. Miniflujos** (varias preguntas seguidas del mismo personaje). Las colas (`encolar`) ya lo permiten. Límite: cada paso gasta una carta de una era de 8–10. Recomendación: pocos, de 2 pasos como máximo, para humor y personajes; decidir si el paso de enlace gasta turno y lleva efectos.

**D. Personajes invitados.** No hay ninguno; hoy solo hablan 10 portavoces (regla 2).

**E. Tutorial.** Ocho mini-lecciones de Domingo (el hermano) que explican controles. Ojo: en el tutorial la izquierda vuelve al paso anterior (en el primero, a la portada), así que solo la derecha decide.

**F. Preguntas y respuestas.** Pregunta media de 91 caracteres; respuesta media de 31 (máx. 36): el 74 % pasa de 28. Ninguna pregunta plantea la decisión; 11 pasan de 100 caracteres. Las respuestas cargan con la explicación que debería dar la pregunta.

**G. La conferencia del creador de Reigns** (resumen en 98 puntos que pasó Jorge). Útil directamente: condiciones + pesos + bloqueo en vez de árboles; escritura breve y evocadora que no lo explica todo; humor por contraste; la muerte como remate o chiste. Adaptable: la continuidad de la dinastía (aquí, el sucesor). Descartado por ahora: subsistemas tipo «mazmorra» (Jorge: no hasta que el juego esté completo), la integración hoja de cálculo–Unity, el misterio de fondo.

## Decisiones de Jorge (28 oct)
1. **Criterio histórico: aprobado.** Cada carta lleva una etiqueta: **D** documentada (hecho concreto, con año y fuente anotados), **P** plausible (escena de bambalinas verosímil; nunca afirma cifras ni fechas), **H** humor (el absurdo se reconoce en la propia pregunta), **X** problema (ni respaldo ni gracia, o atribuye mal). Se guarda como campo en `datos.js` y un test impide cartas sin etiqueta.
2. **Ramificaciones: pendiente de decidir, con esta preocupación de Jorge.** La gracia del juego es que el jugador reconozca cosas que pasaron de verdad y que el Comandante tuvo que decidir; no quiere que el Comandante se convierta en otro tipo de dictador (Reigns puede ramificar porque su historia es ficticia). Propone tomarse la licencia creativa en **las muertes** y mantener la historia fiel. Lo que quiere es que **no se sienta tan lineal**. Opinión dada en la conversación anterior (ver abajo).
3. **Miniflujos: según el criterio propuesto** (pocos, de 2 pasos, para humor y personajes).
4. **Invitados: se rompe la regla 2** y se actualiza `CLAUDE.md`. Pueden ser muchos (Reigns tiene más de 35 personajes). Se definirán en una fase propia, pensándolos bien: los ejemplos de Jorge (periodista extranjero, babalawo, cantante) eran solo ejemplos, aunque el babalawo le gusta.
5. **Tutorial: el comienzo de la historia.** La Revolución acaba de triunfar y el hermano va explicándole al Comandante lo que pasa hasta que llega el discurso inaugural. Es una mini historia antes de gobernar; si el jugador se la salta, no pasa nada, porque el juego empieza al gobernar. Se rediseña el guion con calma; los ejemplos de Jorge («¿Eres tú, hermanito?») no se toman al pie de la letra.
6. **Preguntas: se rompe la regla de la pregunta implícita** de `docs/GUIA_DE_REDACCION.md`. La pregunta plantea el dilema (a veces con «?», como en Reigns) y las respuestas son más cortas; la guía se actualiza con el criterio nuevo.
7. **Subsistemas: no**, hasta que el juego esté completo.
8. **Orden: empezar por la era 1**, como piloto, con los enganches de la era 2; lo que afecte a todas las eras (finales, muertes, variables) se diseña antes para las cuatro.

## Opinión sobre la decisión 2 (ramificaciones sin traicionar la historia)
Jorge tiene razón: con una historia real, convertir al Comandante en otro dictador rompe lo que hace bueno al juego. Propuesta: **la historia es fija (los hechos llegan); lo que cambia es cómo los vives y cómo acabas.** Herramientas, de más a menos peso:
1. **Muertes y caídas con licencia creativa** (la idea de Jorge). Hay una mina histórica: los cientos de atentados contra el líder real (el puro explosivo, el traje de buceo contaminado, el batido envenenado, la concha con explosivos…). Cada atentado que en la historia falló puede ser una muerte en el juego, con su chiste. Las caídas pueden depender también de la era y de lo que hayas hecho, no solo de la barra.
2. **El mismo hecho, contado distinto según lo que hiciste antes.** «La memoria» (era 4) no puede decir lo mismo si a Mota lo encarcelaste que si lo dejaste irse. Variantes de una misma carta por condiciones: el jugador reconoce el hecho real y además ve su propia partida reflejada.
3. **Huellas acumuladas, sin cambiar de ideología.** Unas pocas variables discretas (por ejemplo, cuántas veces cediste ante el aliado, cuántos compañeros de la sierra quitaste de en medio) que colorean textos: el informe de cada era, la esquela, el sucesor, los logros. No reescriben la historia; la comentan.
4. **Personajes con arco propio** (los fijos y los invitados) cuyo destino depende de ti: Domingo, Diezfuegos, Mota, Ferro…
5. **Desvíos acotados y con fecha de vuelta**: un «¿y si…?» que dura dos o tres cartas y vuelve al cauce histórico, siempre marcado como H o P, nunca como D.

## Plan por fases
- **Fase 0 · Decisiones (sin escribir contenido).** Cerrar la decisión 2 y definir: el campo de la etiqueta histórica, las variables de huella (si las hay), las muertes nuevas, si el miniflujo gasta turno, la regla nueva de quién habla (regla 2) y el criterio nuevo de preguntas y respuestas (con ejemplos). Resultado: `CLAUDE.md` y `docs/GUIA_DE_REDACCION.md` actualizados.
- **Fase 1 · Auditoría histórica de las 119 cartas.** Tabla D/P/H/X en `docs/`, fechas verificadas y lista de cartas a arreglar, reubicar o retirar. Independiente del resto.
- **Fase 2 · Motor** (puede ir en paralelo; basta Sonnet). Lo que pida la fase 0: etiquetas, variables, variantes de carta, muertes, miniflujos.
- **Fase 3 · Piloto de la era 1** (más los enganches de la era 2). Reescribir sus cartas con el criterio nuevo, 1 o 2 miniflujos, los primeros invitados y el tutorial como el comienzo de la historia.
- **Fase 4 · Invitados**: el reparto por eras, pensado con calma, cada uno con una función (humor, otra perspectiva, un hecho, una trama, un dilema que no plantearía un ministro).
- **Fase 5 · Eras 2–4** con lo aprendido; finales y esquelas.

**Cómo se comprueba cada mejora:** los tests actuales más los nuevos (etiqueta histórica, límites de las preguntas y respuestas nuevas); la simulación (el «humano» debe seguir entre el 55 y el 65 % por era) y, si hay variables, bots con estrategias distintas que deben ver cartas y finales distintos; y partidas de Jorge en el móvil.

## Modelo
Fases 0, 1, 3, 4 y 5: **Opus**. Fase 2 y los tests: **Sonnet**.

---

# Estado a 29 oct (cierre de la primera conversación de textos)

## Hecho
- **Fase 0 cerrada:** decisión 2 (vía B), regla 2 nueva (invitados y objetos), criterio nuevo de preguntas y respuestas, etiqueta D/P/H/X, miniflujos que no cuentan, `CLAUDE.md` y la guía al día.
- **Fase 1 (auditoría):** `docs/AUDITORIA_HISTORICA.md`, eras 1 y 2. Las eras 3 y 4 **no están auditadas**.
- **Fase 3 (piloto de la era 1) terminada en textos y estructura:** 38 cartas en el juego (`docs/PILOTO_ERA1.md`, `docs/cartas_era_1.md`), 6 segundos pasos que no cuentan, 10–12 cartas, ×1.3, secuelas con su decisión, huecos cubiertos (colas, La embajada), pesos del sorteo. Todo lo aprobado carta a carta por Jorge. `docs/PESOS_CARTAS.md` (generado) lista lo que sube y baja cada respuesta de todas las eras: se revisa «a conciencia de vez en cuando» y se regenera con `npm run docs`.
- **Invitados:** `docs/INVITADOS.md` (Padrino Pupo con 4 flujos, Papá Ernesto con 3 cartas, Silverio apuntado para la era 2). **Las cartas de los invitados aún no están en el juego** (las monta la conversación de programación; nota de traspaso al final del documento). Solo está en el juego la carta que invoca a Pupo (`colas`, respuesta B).

## Cómo trabaja Jorge este tema (aprendido en la sesión)
- **Una carta cada vez, en este orden:** quién habla y qué categoría es → 3 preguntas, 3 respuestas A y 3 B (con el largo entre paréntesis si se pasa) → Jorge elige, corrige y pide más variantes → se guarda **todo junto al final** (no se escribe en el juego mientras tanto; las elegidas se van acumulando en la conversación).
- **Di siempre si la carta es un gran hecho** (las dos opciones son el *cómo*) **o una carta menor** (una opción puede decir que no) y **qué fuerza gana en cada opción**. Si las dos opciones hacen lo mismo, no se sabe qué se decide: es la queja más repetida de Jorge.
- **Reglas que Jorge fue dictando:** nada de «el norte» en preguntas; la pregunta da la premisa de lo que responden las respuestas; las referencias reales se disfrazan para que se entiendan dentro del juego («los barbudos» no se entiende); al embajador no se le desobedece a la cara, se le ironiza; las respuestas necesitan chulería e ironía propia («Rebaje algo, padrino»: hacerse el tonto sin serlo); los chistes no se repiten entre cartas (el discurso de cuatro horas y la paloma se guardan); una de cada tres cartas, de humor, con efectos pequeños; un logro no es una decisión ni un fracaso.
- **Quién hace qué:** esta conversación es de **textos, estructura de cartas y pesos**. El motor, el arte y los coleccionables tienen sus conversaciones (programación, arte, redacción de coleccionables). No toques `motor.js`, pruebas ni imágenes desde aquí: Jorge lo rechazó cuando lo hice.

- **Los textos de Jorge se copian tal cual** (29 oct): letra a letra, aunque parezca una errata. Si crees que se equivocó, pregúntale antes de guardar; nunca lo corrijas por tu cuenta.

## Probado y descartado
- **Hito fijo para los comités de vigilancia:** quitaba un hueco al sorteo; se prefirió peso alto sin condición (sale en ~42 % de las partidas).
- **Excepción de 150 caracteres para Pupo:** sustituida por el miniflujo de dos pasos (amenaza y remedio, ≤100 cada uno).
- **Tiendas vacías y colas con el umbral de crisis en 4:** las colas salían en el 89 % de las partidas y se volvían paisaje; el umbral 6 las deja en ~60 %.
- **Embargo y Alineado dados por las dos respuestas del azúcar:** Jorge no percibía sumisión en «otro cliente»; cada secuela viene ya de una sola decisión.
- **Comités de vigilancia y logro del chivatón en la misma carta:** el logro pasó a «Denuncias falsas» (era 2).

## Pendiente (por orden)
1. **Muertes de la era 1** (Jorge dijo que faltan): las 8 caídas con versión por era (ideas dadas: Pueblo 0, los alzados bajan del monte; Ejército 0, la invasión de la bahía sale bien; Partido 100, presidente decorativo; Potencias 0, solo en el mundo…; Jorge no entendió la de Potencias 0 y se le explicó), los atentados como cartas sueltas de aceptar o rechazar (amante y crema, puro) y la muerte de humor (pelotazo). Falta decidir cómo matan (siempre, al azar, según la escolta).
2. **Expedientes de los personajes:** `FICHAS` está desfasada (Milfuegos, Cabaña, Domingo, invitados). Mensaje preparado para su conversación.
3. **Era 2**, por el mismo camino que la 1: estructura (quitar `deuda_llama`, rehacer `aliado_enfadado` —apagada con peso 0—, `intentos_fuga` por el puerto abierto de 1965, quitar una de las tres cartas de cosechas, añadir el juicio a los fieles del aliado, la despedida de Cabaña y la trama de Silverio), texto carta a carta, pesos, secuelas, dificultad, recompensas, logros y la lista de Pupo (arroz, frijoles, cigarros).
4. **Eras 3 y 4:** auditoría y lo mismo. La era 4 sale por encima del 65 % de victorias del «humano» por las cartas comunes nuevas.
5. **Segundo invitado fijo** (propuesta: el barbero de palacio), trama de invitado de las eras 3 y 4, y que **varias cartas invoquen a Pupo** con respuestas distintas (Jorge: «en el futuro, cuando tengamos más cartas»).
6. **Pendientes menores:** `satelites` (era 2) sobra con el nuevo ultimátum; «La memoria» (era 4) y `flores_mar` hablan de Mota/Milfuegos; `oposicion_firma` y otras citan `policia_tradicional`, que ya no se da; el tutorial aún habla de Cuesta; `hecho`/`historia` por carta (el motor); respuestas a 24 caracteres (algunas pasan: «Que Milfuegos lo detenga», «Hemos decidido…»).
