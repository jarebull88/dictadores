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
- **La carta, por detrás** (al tocarla se gira, como la ficha de los personajes; otro toque la devuelve): la **descripción** (2 o 3 frases con la voz del «Sistema»), el **Beneficio** (una línea, lo positivo) y el **Perjuicio** (una línea, lo negativo, que tiene que ser *real*: algo que le pasa al Comandante, como lo de la paloma y el uniforme; 28 oct, Jorge: ya no se llaman «Efecto» y «Efecto secundario»). Nada más: sin puntos, valores ni rarezas.
- **Primera vez:** sin sobre (25 oct, Jorge: «eliminamos la animación del sobre»). El jugador toca la estrella, ve la cuadrícula con el logro nuevo («¡Nuevo!») y, al tocarlo, sale directamente la carta por delante, con la pista «Toca la carta para girarla» (solo la primera vez).
- **Datos de cada logro** (`LOGROS` en `datos.js`): `id, bandera, titulo, subtitulo, decision, descripcion, beneficio, perjuicio` (28 oct, Jorge: título y objeto son lo mismo, así que el campo `objeto` desaparece; `efecto` y `secundario` pasan a `beneficio` y `perjuicio`) (`frase` pasa a llamarse `descripcion`).
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
**28 oct, Jorge: recompensas y logros se separan.** Una **recompensa** es un objeto que se gana con **una decisión concreta**; un **logro** es una hazaña por **cómo juegas** (nunca una sola decisión, nunca un fracaso), por era o global. Recompensas elegidas para la era 1 (los textos, aquí): **carné de profesor de educación física** («Se juega por amor», `fin_pelota`), **libreta de abastecimiento** («Una libreta por familia», `embargo_total`), **etiqueta de compota** («Cámbienlos por compotas», `la_bahia`), **botella de Revolukola** («Inventen la Revolukola», `refresco`), **pelota firmada** («A mí nadie me batea», `beisbol`) y **postal de la bahía con un misil** («Discreto como mi barba», `nuevos_vecinos`). El carné del comité (chivatón) pasa a la era 2. El billete firmado no entra en la era 1.

**Logros de la era 1** (28 oct, Jorge; nombres provisionales, los cierra esta conversación; necesitan que el motor los compruebe al acabar la era): **Las cuatro casillas** (acabar la era con cuatro secuelas a la vez) · **Por los pelos** (acabar la era con alguna fuerza por debajo de 15 o por encima de 85) · **El equilibrista** (acabar la era con las cuatro fuerzas entre 40 y 60) · **Revolución con buenos modales** (acabar la era sin Censura, Vigilancia ni Jaula). Cuatro por era.


### 1. Carné del comité de barrio — *propuesto*
- **Logro:** «Chivatón de barrio» (elegido por Jorge).
- **Objeto:** pendiente de elegir nombre y siglas.
- **Frase del archivo:** pendiente.
- **Texto del objeto:** pendiente (cita en mayúsculas con guiones de partición, firmada «COMANDANTE [nombre]»; cinta con el lema; ojo).
- **Referencia real:** el carné de los Comités de Defensa de la Revolución (CDR), con el ojo, la cinta «con la guardia en alto» y una cita firmada por Fidel. Los CDR se fundaron el 28 sep 1960, en un acto ante el Palacio Presidencial, mientras estallaban petardos; Fidel anunció «un sistema de vigilancia colectiva revolucionaria» (verificado). El texto exacto de la cita del carné sale de la imagen que tiene Jorge; no lo he encontrado transcrito en la red.
- **Se desbloquea con** (28 oct, Jorge: «por ser literalmente un chivatón»): carta `denuncias_falsas` de la **era 2** (Ministro del Interior), opción «Que se investigue hasta la gallina» (bandera `base.denuncias_todas`). Antes, `ojos_barrio`, que ahora crea los comités siempre.

### Recompensa 1 · Licencia de electricista — *aprobada* (28 oct; faltan solo los números que el motor necesite)
- **Se gana con:** carta `fin_pelota` («Se acabó el profesional», Ministra de Educación), opción «Se juega por amor» (no pone bandera: el motor tendrá que reconocer la opción).
- **titulo:** Licencia de electricista (28 oct: título y objeto son lo mismo; «Amateur de élite» se descarta)
- **subtitulo:** Tu mejor atleta ya tiene oficio
- **descripcion:** Felicidades: tus deportistas de élite son ahora electricistas, carpinteros y fontaneros. Fichan en el taller por la mañana y entrenan por la tarde. Rezamos para que nadie les encargue una obra.
- **Beneficio:** +20 medallas por competir contra universitarios.
- **Perjuicio:** Tu aire acondicionado lo montó un boxeador y ahora gotea.
- **Referencia real:** la resolución 83-A del INDER (1962) abolió el deporte profesional; los profesionales pasaron a aficionados pagados por el Estado. El «amateurismo de Estado» del bloque (atletas inscritos con un oficio) es real; un caso cubano concreto no está documentado, así que la licencia es invención sobre una práctica real.

### Recompensa 2 · Libreta de abastecimiento — *en curso* (28 oct)
- **Se gana con:** carta `embargo_total` (Ministro de Comercio), opción «Una libreta por familia».
- **titulo:** Libreta de abastecimiento
- **subtitulo:** Todo el país come lo mismo
- **descripcion:** Tu libreta incluye una casilla por producto y mes. Lo básico: café, cigarros y arroz para todos, y cuarenta casillas más para productos que nunca han llegado ni se esperan.
- **Beneficio / Perjuicio:** *pendiente* (Jorge no se decide por las propuestas del 28 oct: el beneficio y el perjuicio deben ser algo concreto y real que le pasa al Comandante).
- **Referencia real:** la libreta de abastecimiento se creó en marzo de 1962 (cuadrícula de productos por persona y mes, sellada por el bodeguero).

### Recompensa 3 · Compota importada — *en curso* (28 oct)
- **Se gana con:** carta `la_bahia` (Ministro de las Fuerzas Armadas), opción «Cámbienlos por compotas».
- **titulo:** Compota importada
- **subtitulo:** El postre favorito del Comandante
- **descripcion:** Mil doscientos presos por un cargamento de compota de calidad, de la de fuera, un producto de primera que no volverás a ver en tu vida. Se recomienda saborearla despacio.
- **Beneficio / Perjuicio:** *pendiente*
- **Referencia real (verificada):** en diciembre de 1962 se canjearon 1.113 prisioneros de la bahía por unos 53 millones de dólares en medicinas, material médico y comida infantil, donados por empresas privadas y negociados por un abogado de Nueva York. Fidel lo llamó un «regalo de Navidad».

### Pendientes (elegidos por Jorge, sin redactar)
4. Postal de la bahía con un misil (inventada) — aceptar los misiles (`base.misiles_instalados`).
5. Billete firmado con un mote (era 1, `base.mercado_paralelo`) y, en pareja, billete con la cara del firmante (era 3 o 4, decisión por buscar).
