# Análisis de las cartas: fallos de diseño y la era 4 (22 oct)

Lo aprendido al revisar las eras 1 a 3, para no repetirlo, y una revisión previa de la era 4 con esos criterios. **No se ha cambiado nada**: es material para la sesión que revise la era 4.

## 1. Los fallos que se repetían (eras 1–3)

1. **Espejos sin decisión.** La B era la A negada («Aceptarla / Rechazarla», «Que toquen / Prohibir») o las dos decían lo mismo con otras palabras (La calle y los cuarteles, Estudiantes en la calle). El jugador no elige entre dos políticas, sino entre «sí» y «no». **Regla:** cada opción es una medida concreta y distinta (racionar o hacer la vista gorda; encerrar a los oficiales o comprarlos).
2. **Respuestas que no dicen qué haces** («Escasez, pero justa», «Pregúntenle por sus hijos»). **Regla:** se tiene que entender la orden sin conocer el contexto; ahora hay 36 caracteres para explicarla.
3. **Potencias como opinión extranjera.** «Al extranjero no le gusta» subía o bajaba Potencias aunque no hubiera ni dependencia ni presión. **Regla:** solo mueve Potencias lo que te hace depender (ayuda, deuda, condiciones) o plantarles cara.
4. **Partido con el signo antiguo** (los empresarios como Élite) **o sin causa.** Y un exceso de subidas: el Partido llegaba solo al máximo. **Regla:** nacionalizar, controlar, el culto y los cargos lo suben; auditar, recortar, gobernar sin él y aceptar condiciones de fuera lo bajan. Si una opción lo sube y la otra no lo baja, +2 como mucho.
5. **Efectos que no se deducen del texto** (Ejército en cartas sin nada militar, Pueblo en cartas de propaganda). **Regla:** si no lo puede razonar un jugador con inteligencia política, se quita.
6. **Dilemas falsos:** una opción buena para todos y otra mala para todos (El visitante del bloque oriental). **Regla:** la opción «buena» paga algo (un coste común o una bandera con factura futura).
7. **Consecuencias sin coste:** cartas repetibles que bajaban la crisis sin pagar nada (La factura). **Regla:** lo que se resuelve hoy deja una bandera para mañana.
8. **Dificultad:** las eras eran cortas y suaves y se ganaban al azar (era 2: ~30 %). **Regla:** 8–10 cartas por era y factor ×1,1 a ×1,25; comprobar con `npm run simular` (objetivo: al azar ~6–15 %, el «humano» ~55–65 %).

## 2. La era 4 con esos criterios (28 cartas)

**En números:** 22 de 28 son espejos exactos; 25 tienen todavía remate (material para las respuestas nuevas); 11 preguntas pasan de 100 caracteres. Dificultad actual: al azar la supera el 50 % de los que llegan y el «humano» el 72 %: es la más fácil del juego.

**Respuestas sí/no que conviene convertir en dos medidas distintas:** las_medallas (Aceptarla / Rechazarla), el_concierto (Que toquen / Prohibir), los_turistas (Abrir / Mantener cerradas), el_plebiscito (Convocar / No hace falta), los_inocentes (Revisar / Asunto cerrado), las_memorias (Doce tomos / Un solo tomo), la_memoria (Una página / Nada que contar), mausoleo (Construir / Sepultura sencilla).

**Potencias como opinión (quitar o justificar):** el_reportaje (±5), el_plebiscito (±6), el_escrutinio (±7), la_memoria (±4), el_concierto (±4), estatuas_caen (−3), el_general_heroe (±4), bomba_interior (±3), huelga_general (−4), delfin_impaciente (±3), el_hijo (±2). Sí están bien: acreedor_favores, salida_honrosa, los_turistas, la_cuenta, aliado_se_hunde, los_inocentes (ceder a una petición del Norte).

**Efectos sin causa clara:**
- el_parte_medico: «Firmarlos desde la cama» sube el Ejército +6 sin nada militar; lo lógico es solo Partido ∓.
- huelga_general: «Bajaré yo mismo a calmarlos» baja el Partido −5; no se deduce (sería Pueblo + y Crisis +).
- las_medallas y el_doble: Partido ±2 sin causa.
- la_salud: «Nadar en el río» sube el Pueblo +6 (propaganda, el Pueblo no gana nada) y el Ejército se mueve sin motivo; el doble del Interior sí puede subir el Ejército.
- estatuas_caen: «Reforzar las estatuas» sube el Pueblo +3; debería ser Partido + (culto) y Pueblo 0 o −.
- mausoleo_vacio: «Alquilarlo para actos» sube el Pueblo +5; no se deduce.
- **dos_ejercitos** (conceptual): enfrenta a las Fuerzas Armadas con el Interior, pero las dos forman la barra del Ejército. Desarmar a uno no puede subir «el Ejército» sin más. Propuesta: la opción de desarmar baja algo el Ejército (pierde poder un brazo armado) y la de dar tanques lo sube mucho (los dos se arman); o replantear la carta como Ejército contra Partido.

**Bien planteadas** (solo pulir texto): la_sequia, palacio_sin_terminar, acreedor_favores, salida_honrosa, aliado_se_hunde, el_escrutinio, varela_vuelve, el_hijo, la_cuenta, los_turistas.

## 3. El tono: más humor y cultura pop
La era 3 funcionó mejor cuando la respuesta llevaba el chiste. Propuesta para la era 4 (1986–2006):
- **El humor va en las respuestas del dictador**, como siempre; los personajes siguen hablando en serio (es lo que hace reír).
- **Cultura pop de la época** (los 90 y los 2000): el chándal, las telenovelas, el Mundial, los primeros móviles, internet que no llega, las remesas, el «período especial» de las bicicletas, el turismo de pulsera. Sin marcas ni nombres reales.
- **Guiños modernos tipo «lol»:** con medida. Funcionan si son raros (uno o dos en toda la era) y los dice el dictador viejo que quiere parecer joven; si se repiten, rompen el humor seco del juego.
