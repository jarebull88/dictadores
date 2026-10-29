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
- **La carta, por detrás** (al tocarla se gira, como la ficha de los personajes; otro toque la devuelve): la **descripción** (2 o 3 frases con la voz del «Sistema»), el **Beneficio** (una línea, lo positivo) y el **Perjuicio** (una línea, lo negativo, que tiene que ser *real*; 28 oct, Jorge: ya no se llaman «Efecto» y «Efecto secundario». **Pueden recaer sobre el país, no solo sobre el Comandante**, siempre que sean concretos y absurdos)

**Regla definitiva (28 oct, Jorge): los objetos son como los items de un juego.** El **Beneficio** responde a «¿qué consigo si *uso* este objeto?» (la paloma: +100 de aura divina). El **Perjuicio** es lo contrario: el efecto negativo de *poseer* el objeto (la paloma: el uniforme nunca estará limpio). Ejemplo: la pelota firmada, beneficio «Lánzala a alguien: preferirá que le dé antes que batearla»; perjuicio «Todos te ponen excusa para no jugar contigo». Los beneficios aprobados de las recompensas 1, 2 y 4 se revisan con este criterio.. Nada más: sin puntos, valores ni rarezas.
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
**28 oct, Jorge: recompensas y logros se separan.** Una **recompensa** es un objeto que se gana con **una decisión concreta**; un **logro** es una hazaña por **cómo juegas** (nunca una sola decisión, nunca un fracaso), por era o global. Recompensas elegidas para la era 1 (los textos, aquí): **carné de profesor de educación física** («Se juega por amor», `fin_pelota`), **libreta de abastecimiento** («Una libreta por familia», `embargo_total`), **etiqueta de compota** («Cámbienlos por compotas», `la_bahia`), **botella de Revolukola** («Inventen la Revolukola», `refresco`), **pelota firmada** («A ver quién me batea», `beisbol`) y **postal de la bahía con un misil** («Discreto como mi barba», `nuevos_vecinos`). El carné del comité (chivatón) pasa a la era 2. El billete firmado no entra en la era 1.

**Logros de la era 1** (28 oct, Jorge; nombres provisionales, los cierra esta conversación; necesitan que el motor los compruebe al acabar la era): **Las cuatro casillas** (acabar la era con cuatro secuelas a la vez) · **Por los pelos** (acabar la era con alguna fuerza por debajo de 15 o por encima de 85) · **El equilibrista** (acabar la era con las cuatro fuerzas entre 40 y 60) · **Revolución con buenos modales** (acabar la era sin Censura, Vigilancia ni Jaula). Cuatro por era.


### 1. Carné del comité de barrio — *propuesto*
- **Logro:** «Chivatón de barrio» (elegido por Jorge).
- **Objeto:** pendiente de elegir nombre y siglas.
- **Frase del archivo:** pendiente.
- **Texto del objeto:** pendiente (cita en mayúsculas con guiones de partición, firmada «COMANDANTE [nombre]»; cinta con el lema; ojo).
- **Referencia real:** el carné de los Comités de Defensa de la Revolución (CDR), con el ojo, la cinta «con la guardia en alto» y una cita firmada por Fidel. Los CDR se fundaron el 28 sep 1960, en un acto ante el Palacio Presidencial, mientras estallaban petardos; Fidel anunció «un sistema de vigilancia colectiva revolucionaria» (verificado). El texto exacto de la cita del carné sale de la imagen que tiene Jorge; no lo he encontrado transcrito en la red.
- **Se desbloquea con** (28 oct, Jorge: «por ser literalmente un chivatón»): carta `denuncias_falsas` de la **era 2** (Ministro del Interior), opción «Que se investigue hasta la gallina» (bandera `base.denuncias_todas`). Antes, `ojos_barrio`, que ahora crea los comités siempre.

### Recompensa 1 · Licencia de electricista — *aprobada* (29 oct, textos de Jorge)
- **Se gana con:** carta `fin_pelota` («Se acabó el profesional», Ministra de Educación), opción «Se juega por amor» (no pone bandera: el motor tendrá que reconocer la opción).
- **titulo:** Licencia de electricista
- **subtitulo:** Tu mejor atleta ya tiene oficio
- **descripcion:** Tus deportistas de élite son ahora electricistas, carpinteros y fontaneros. Fichan en el taller por la mañana y entrenan por la tarde. Rezamos para que nadie les encargue una obra.
- **Beneficio:** Usa esta licencia para inscribir a tus antiguos deportistas en competiciones universitarias y conseguir +20 medallas.
- **Perjuicio:** Para competir, cada atleta debe presentar un justificante de ausencia firmado por su encargado.
- **decision** (lo que se lee bajo la carta, 29 oct, Jorge): Abolir el deporte profesional. *(La opción de la carta en el juego sigue siendo «Se juega por amor».)*
- **Referencia real:** la resolución 83-A del INDER (1962) abolió el deporte profesional; los profesionales pasaron a aficionados pagados por el Estado. El «amateurismo de Estado» del bloque (atletas inscritos con un oficio) es real; un caso cubano concreto no está documentado, así que la licencia es invención sobre una práctica real.

### Recompensa 2 · Libreta de abastecimiento — *aprobada* (29 oct, textos de Jorge)
- **Se gana con:** carta `embargo_total` (Ministro de Comercio), opción «Una libreta por familia».
- **titulo:** Libreta de abastecimiento
- **subtitulo:** Todo el país come lo mismo
- **descripcion:** Cada familia recibe una libreta con una casilla por producto y mes: arroz, café, cigarros y cuarenta artículos más que solo existen sobre el papel. El reparto es rigurosamente igualitario y el resultado, espectacular: todo el país luce abdominales de campeonato.
- **Beneficio:** Añade a tu abuela fallecida a la libreta y sigue cobrando su libra de arroz.
- **Perjuicio:** Si pierdes la libreta, tu familia deja de existir a efectos del almacén.
- **decision:** «Una libreta por familia»
- **Referencia real:** la libreta de abastecimiento se creó en marzo de 1962 (cuadrícula de productos por persona y mes, sellada por el bodeguero).

### Recompensa 3 · Compota importada — *aprobada* (29 oct, textos de Jorge)
- **Se gana con:** carta `la_bahia` (Ministro de las Fuerzas Armadas), opción «Cámbienlos por compotas».
- **titulo:** Compota importada
- **subtitulo:** El postre favorito del Comandante
- **descripcion:** Compota extranjera de primera calidad, conseguida mediante una operación diplomática de alto nivel. La fruta es excelente, el envase es precioso y la etiqueta está en otro idioma. Disfrútala despacio: ya no quedan mercenarios para otro intercambio.
- **Beneficio:** Entrega este tarro a un ministro para ganarte su favor.
- **Perjuicio:** Quienes se quedan sin tarro recuerdan que todos son iguales ante la Revolución y preguntan dónde está su compota.
- **decision:** «Cámbienlos por compotas»
- **Referencia real (verificada):** en diciembre de 1962 se canjearon 1.113 prisioneros de la bahía por unos 53 millones de dólares en medicinas, material médico y comida infantil, donados por empresas privadas y negociados por un abogado de Nueva York. Fidel lo llamó un «regalo de Navidad».

### Recompensa 4 · Botella de Revolukola — *en curso* (28 oct)
- **Se gana con:** carta `refresco` (Ministro de Comercio), opción «Inventen la Revolukola».
- **titulo:** Botella de Revolukola
- **subtitulo:** Dulce, pegajosa y de producción nacional.
- **descripcion:** Una bebida marrón y dulce que sabe a Revolución. Receta oficial: azúcar, agua y lo que haya en el almacén ese día. Ninguna botella sabe igual que la anterior.
- **Beneficio:** Mezclada con ron, el país entero aguanta tus discursos.
- **Perjuicio:** *pendiente* (propuestos: Los dentistas del país trabajan el doble.)
- **Referencia real (verificada):** las embotelladoras del refresco de cola más famoso se nacionalizaron en 1960; salió una cola nacional más dulce y menos gaseosa, buena para mezclar con ron (años después, marcas como TropiCola).

### Recompensa 5 · Pelota firmada — *en curso* (28 oct)
- **Se gana con:** carta `beisbol` (Ministra de Educación), opción «A ver quién me batea».
- **titulo:** Pelota firmada
- **subtitulo:** Nadie se atrevió a hacer swing.
- **descripcion:** La pelota del partido lleva tu firma y las marcas de unos bateadores que prefirieron no tocarla. Los archivos recogen veintisiete ponches en un partido de dos entradas.
- **Beneficio:** Lánzala a alguien: preferirá que le dé antes que batearla. *(propuesto sobre la idea de Jorge)*
- **Perjuicio:** Todos te ponen excusa para no jugar contigo.
- **Referencia real (verificada):** el 24 de julio de 1959, en un partido de exhibición, Fidel lanzó con los Barbudos dos entradas; la propaganda dijo que eliminó a todos los bateadores, lo cual las fuentes ponen en duda.

### Pendientes (elegidos por Jorge, sin redactar)
4. Postal de la bahía con un misil (inventada) — aceptar los misiles (`base.misiles_instalados`).
5. Billete firmado con un mote (era 1, `base.mercado_paralelo`) y, en pareja, billete con la cara del firmante (era 3 o 4, decisión por buscar).

## Traspaso a programación (28 oct)

Esta conversación solo escribe documentos; el código lo hace la de programación. Lo que hay que hacer en el juego, con las recompensas y los logros **aunque sus textos digan «Pendiente»** (para poder probarlos ya):

1. **Recompensas de la era 1** (`LOGROS` en `datos.js`, campos `id, bandera, titulo, subtitulo, decision, descripcion, beneficio, perjuicio`; ya no existe `objeto`). Cada una con el texto de este documento y, donde pone *pendiente*, «Pendiente»:
   - Licencia de electricista: carta `fin_pelota`, opción «Se juega por amor» (**no pone bandera**: el motor tiene que reconocer la opción).
   - Libreta de abastecimiento: `embargo_total`, «Una libreta por familia».
   - Compota importada: `la_bahia`, «Cámbienlos por compotas».
   - Botella de Revolukola: `refresco`, «Inventen la Revolukola».
   - Pelota firmada: `beisbol`, «A ver quién me batea».
   - Postal de la bahía con un misil: `nuevos_vecinos`, solo con «Discreto como mi barba» (la otra opción también instala los misiles, pero no da la postal). **Sin texto aún.**
   - Carné del comité (era 2): `denuncias_falsas`, «Que se investigue hasta la gallina» (bandera `base.denuncias_todas`). **Texto a medias** (ver «Carné del comité de barrio»).
2. **Logros de la era 1** (cuatro; nombres provisionales, por cómo se acaba la era): Las cuatro casillas, Por los pelos, El equilibrista, Revolución con buenos modales. Hay que implementar la comprobación al terminar la era (ver «Logros de la era 1») y dejarlos con «Pendiente» en subtítulo, descripción, beneficio y perjuicio.
3. **La carta «Pendiente»:** un coleccionable con textos «Pendiente» tiene que verse completo: la carta por delante con un fondo (un color plano de la paleta, sin ilustración) y, al girarla, la parte de atrás con «Pendiente» donde falte un texto.
4. **Quitar** el logro provisional «la primera decisión de cada partida da el primer logro» cuando estén todos.

## Lo aprendido en la conversación de redacción (24–28 oct)

**Cómo trabaja Jorge aquí:** va de uno en uno, elige y combina. Pide siempre una propuesta clara por campo; las alternativas solo si las pide (28 oct: «no sé de dónde te has sacado los alternativos»). Corrige lo que no le gusta con una frase y espera que se aplique a los siguientes.

**Estructura final de una recompensa** (la que implementa programación): `titulo` (es el nombre del objeto; **título y objeto son lo mismo**, nunca dos campos), `subtitulo`, `descripcion`, `beneficio`, `perjuicio`, más `decision` (la opción que la da). Límites orientativos: título ≤24, subtítulo ≤60, descripción ≤220, beneficio y perjuicio ≤60.

**Reglas que fuimos descubriendo**
1. **Voz del «Sistema»** (como en *Dungeon Crawler Carl*): burocrática, sarcástica, habla de tú. **No empezar siempre con «Felicidades:»**; variar la entrada.
2. **Los objetos son items de juego.** **Beneficio** = qué consigues si *usas* el objeto («Lánzala a alguien: preferirá que le dé antes que batearla»). **Perjuicio** = el efecto negativo de *poseerlo* («Todos te ponen excusa para no jugar contigo»). Pueden recaer sobre el país, y deben ser concretos y absurdos; los abstractos («cuarenta casillas de promesas») no funcionan.
3. **No repetir un chiste entre descripción y perjuicio** (el del trabajo falso mal hecho de la licencia estaba en los dos).
4. El chiste se saca de lo que dijo Jorge sobre el hecho real, no de datos que no están verificados.
5. Referencia real siempre anotada y verificada; si no se encuentra un caso concreto (la licencia de electricista), se dice que es invención sobre una práctica real.
6. Sin países, siglas, banderas ni «camarada» (excepción de Jorge solo en la ficha de Domingo, no en coleccionables).

**Lo que probamos y no funcionó:** objeto y título como dos campos (Jorge los quería iguales); beneficio abstracto; perjuicio «el aire acondicionado lo montó un boxeador» (repetía el chiste del trabajo mal hecho); «Efecto» y «Efecto secundario» como etiquetas (ahora Beneficio y Perjuicio); la licencia limitada al béisbol (vale para todo el deporte).

**Estado al cerrar (29 oct)**
- Cerrado: la estructura, la regla, los textos de título, subtítulo y descripción de las recompensas 1 a 5.
- 29 oct: licencia, libreta y compota, completas (textos de Jorge). Revolukola: beneficio aprobado («Mezclada con ron, el país entero aguanta tus discursos»).
- Pelota firmada: beneficio y perjuicio completos (propuestos sobre ideas de Jorge).
- **Pendiente:** perjuicio de la Revolukola; postal de la bahía y carné del comité (a medias); billete firmado y billete con la cara (sin redactar, el segundo sin decisión que lo dé); los cuatro logros de la era (nombres provisionales); coleccionables de las eras 2 a 4.
- Ideas de perjuicio/beneficio que se propusieron y Jorge no eligió: libreta (mercado de casillas; la cola como club social), compota (celdas vacías como almacén; los niños quieren ser canjeados), licencia (medio país jura ser atleta), Revolukola (los dentistas trabajan el doble; la botella se pega a la mano).
