# Coleccionables

Se escribe a mano (no la genera `npm run docs`). Cada coleccionable se desbloquea con una decisión concreta y se guarda entre partidas en el archivo (menú ☰, «Logros»). Tiene dos capas:
- **El objeto**: un documento o cosa real de la Revolución cubana, reimaginado al estilo Muñoz Bachs (`docs/GUIA_ARTE_BACHS.md`). Es lo que queda en el archivo.
- **El título del logro**: la frase con chiste que salta al conseguirlo («¡Nuevo logro: …!»).

Reglas: inspirarse en cosas reales (solo se inventa si el chiste lo vale); ningún país real, sin banderas, estrellas, escudos ni siglas reales; donde iría «Fidel», el nombre del jugador («Comandante X»). Frase del archivo: ≤100 caracteres.

Estado: **propuesto** (en revisión con Jorge) · **aprobado**.

## Pantalla del logro (25 oct, Jorge) — para programar

Usa la disposición de la partida: textos arriba (en el hueco de las barras y la pregunta), la carta en medio (en el mismo sitio y con la misma medida que la del juego) y textos debajo.

- **Arriba:** el **título** del logro (estilo Titular) y, debajo, el **subtítulo**: una sola frase corta (estilo Cuerpo, en negrita, donde va la pregunta en la partida).
- **La carta, por delante:** la ilustración del objeto ocupa la carta (mientras no haya ilustración, un hueco con el nombre del objeto).
- **Debajo de la carta:** «Por «decisión»» (la respuesta que dio el logro).
- **La carta, por detrás** (al tocarla se gira, como la ficha de los personajes; otro toque la devuelve): el nombre del objeto, la **descripción** (2 o 3 frases con la voz del «Sistema»), el **Efecto** (una línea, lo positivo) y el **Efecto secundario** (una línea, lo negativo). Nada más: sin puntos, valores ni rarezas.
- **Primera vez:** sin sobre (25 oct, Jorge: «eliminamos la animación del sobre»). El jugador toca la estrella, ve la cuadrícula con el logro nuevo («¡Nuevo!») y, al tocarlo, sale directamente la carta por delante, con la pista «Toca la carta para girarla» (solo la primera vez).
- **Datos de cada logro** (`LOGROS` en `datos.js`): `id, bandera, titulo, subtitulo, objeto, decision, descripcion, efecto, secundario` (`frase` pasa a llamarse `descripcion`).
- **Límites orientativos:** título ≤24 caracteres, subtítulo ≤60, descripción ≤220, efecto y efecto secundario ≤60 cada uno.

**Estilo de los textos (como los logros de *Dungeon Crawler Carl*):** los anuncia la voz del «Sistema», burocrática, sarcástica y algo condescendiente, que habla de tú, se ríe del jugador y le pone a cada objeto un efecto absurdo y su efecto secundario.

**Ejemplo (el logro del tutorial, propuesto):**
- titulo: «Paloma amaestrada»
- subtitulo: «Tu primer milagro, cortesía de tu hermano.»
- objeto: «Paloma blanca»
- decision: «Si se posa en mi hombro, asciendes»
- descripcion: «Tu hermano pequeño la ha entrenado tres meses en el monte con paciencia y maíz. Cada vez que alces el brazo en un discurso, se posará en tu hombro y medio país verá en ti al elegido.»
- efecto: «+100 de aura divina.»
- secundario: «Tu uniforme de gala nunca volverá a estar limpio.»

## Era 1

### 1. Carné del comité de barrio — *propuesto*
- **Logro:** «Chivatón de barrio» (elegido por Jorge).
- **Objeto:** pendiente de elegir nombre y siglas.
- **Frase del archivo:** pendiente.
- **Texto del objeto:** pendiente (cita en mayúsculas con guiones de partición, firmada «COMANDANTE [nombre]»; cinta con el lema; ojo).
- **Referencia real:** el carné de los Comités de Defensa de la Revolución (CDR), con el ojo, la cinta «con la guardia en alto» y una cita firmada por Fidel. Los CDR se fundaron el 28 sep 1960, en un acto ante el Palacio Presidencial, mientras estallaban petardos; Fidel anunció «un sistema de vigilancia colectiva revolucionaria» (verificado). El texto exacto de la cita del carné sale de la imagen que tiene Jorge; no lo he encontrado transcrito en la red.
- **Se desbloquea con** (28 oct, Jorge: «por ser literalmente un chivatón»): carta `denuncias_falsas` de la **era 2** (Ministro del Interior), opción «Que se investigue hasta la gallina» (bandera `base.denuncias_todas`). Antes, `ojos_barrio`, que ahora crea los comités siempre.

### 6. Licencia de electricista del pelotero — *propuesto* (idea de Jorge, 24 oct)
- **Idea:** la estrella del béisbol pasa a «aficionado» y necesita un oficio sobre el papel; esperamos que nadie le pida arreglar un enchufe.
- **Logro, objeto, frase y texto:** pendientes de elegir.
- **Referencia real:** la resolución 83-A del INDER (1962) abolió el deporte profesional (béisbol y boxeo, entre otros); los profesionales pasaron a aficionados y el INDER, creado en 1961, les pagaba. En 1962 empezó la primera Serie Nacional aficionada. Lo del oficio nominal es el «amateurismo de Estado» de todo el bloque (atletas inscritos como soldados, estudiantes u obreros); para Cuba no he encontrado un caso concreto documentado.
- **Se desbloquea con:** carta `fin_pelota` («Se acabó el profesional», Ministra de Educación), opción «Ahora se jugará por amor a la patria» (no pone bandera; el motor tendría que reconocer la opción).

### Pendientes (elegidos por Jorge, sin redactar)
2. Libreta de abastecimiento — «Libreta de racionamiento por familia» (`embargo_total`).
3. Etiqueta de compota (canje de los prisioneros de la bahía, 1962) — «Cámbienlos por compotas».
4. Postal de la bahía con un misil (inventada) — aceptar los misiles (`base.misiles_instalados`).
5. Billete firmado con un mote (era 1, `base.mercado_paralelo`) y, en pareja, billete con la cara del firmante (era 3 o 4, decisión por buscar).
