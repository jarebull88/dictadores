# Historial de decisiones

Lo que se ha decidido hasta el **10 de octubre de 2026**, agrupado por tema. «Vigente» = sigue en el juego. «Descartado» = se probó y se quitó (no volver a ello sin preguntar a Jorge). Añade aquí cada decisión nueva, con fecha.

## 1. Concepto y tono
- **Vigente.** Juego tipo Reigns: cartas con dos opciones, cuatro fuerzas y fin al llegar a 0 o 100. Eres un dictador de un país del Caribe **sin nombre** (antes se llamaba «República de Valderia»; se quitó de la portada porque «no hace falta hacer referencia a ningún país»).
- **Vigente.** Humor negro seco: los personajes hablan con seriedad y servilismo y la ironía la pone el dictador. La crueldad cae sobre su soberbia, no sobre las víctimas.
- **Vigente.** Título «A la orden mi comandante» (antes «Dictadores»), con el emoji 🫡 del saludo militar y subtítulo en negrita: «Acabas de tomar el poder, tu objetivo es mantenerte en él el mayor tiempo posible».
- **Vigente.** Tratamiento «Comandante» → «Excelencia» (era 3, con `culto_iniciado`) → «Padre de la Patria».
- **Vigente.** Datos históricos reales solo en el archivo histórico, nunca en el texto de la carta; escritos de memoria y **por verificar**. Se basan en regímenes diversos (Cuba, URSS, Grecia, Chile, Polonia, Irak, China, México…), no solo Cuba.

## 2. Mecánica
- **Vigente.** Cuatro fuerzas (Pueblo, Ejército, Élite, Potencias) y una **crisis oculta** (la economía), que sube con las promesas imposibles y dispara cartas de crisis. La economía no es una barra.
- **Vigente.** Estados del régimen en cuatro ranuras (el más antiguo sale al entrar el quinto): censura, vigilancia, culto, alineado, embargo, frontera, nacionalizado, deuda. Cada uno tiene deriva, cadencia y efecto sobre el sorteo.
- **Vigente.** Mazo base de unas 100 cartas en 7 eras (hoy 45 en 2); ampliable con actualizaciones y expansiones por tema; escenarios de inicio; banderas con prefijo de mazo (`base.`); los identificadores nunca se borran.
- **Vigente.** Orden de robo: cola → estados críticos (crisis, coalición) → anclas con ventana → sorteo ponderado.
- **Vigente.** Una referencia de archivo histórico por partida, en un turno aleatorio, que se revela **después** de decidir y se guarda en una colección persistente.
- **Vigente (3 oct).** Los **lados A/B se mezclan al azar** en cada carta, como Reigns, para que no se aprenda que «la opción valiente está a la derecha». Antes, jugar siempre a un lado daba un 69 % de supervivencia en un lado y un 51 % en el otro.
- **Vigente (3 oct).** Cada era tiene su propio factor de dureza (`era.factor`); la 2 usa 0.7.

## 3. Dificultad
- **Problema (3 oct).** Jorge ganaba siempre, incluso jugando todo a un lado. Medido con simulaciones: al azar se superaba la era 1 el 99 % de las veces y el Pueblo subía siempre (salía en casi todas las cartas y los efectos tiraban hacia arriba).
- **Vigente.** Se **recentraron** los efectos (lo que gana una opción lo pierde la otra) y se multiplicaron por barra: Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5; deriva de estados ×2. Resultado: al azar se supera la era 1 en torno al **28 %**; quien se fija solo en el tamaño de los puntos ya no se salva (17 %); quien conoce los efectos, casi siempre (98 %). Las caídas se reparten entre las cuatro fuerzas, por arriba y por abajo.
- **Vigente.** Sin caídas en las dos primeras cartas y sin huecos sin carta.

## 4. Eras y cartas
- **Vigente.** Era 1 «Ascenso» (6–8 años): 14 cartas con historia y 5 borradores (crisis y coaliciones). Era 2 «Consolidación» (6–8 años, 26 cartas): **20 son consecuencias directas de las banderas de la era 1** y 6 son universales; seis cartas aceptan varios disparadores porque su bandera venía de cartas raras. Crisis y coaliciones repetibles tras 10 años.
- **Superado (10 oct).** Las eras 3 a 7 no existían; al final el juego tiene cuatro. Banderas ya reservadas para la era 3: `culto_iniciado`, `modestia_aparente`, `desfile_militar`, `misiles_instalados`, `misiles_rechazados`, `jefe_poderoso`, `estudiantes_reprimidos`, `periodista_oficial`; para la 4: `prensa_libre`, `general_apartado`.
- **Vigente.** **Sin réplicas.** Había un segundo paso tras decidir (un diálogo, y una pantalla de «Ver / Continuar» para el archivo) que «atrasaba la partida». Se quitó: el chiste de la réplica se fundió en la propia opción y el archivo pasó a ser un **aviso discreto** (una ficha en la barra inferior, nueve segundos).
- **Vigente.** Opciones **mucho más cortas**: acción de 2–5 palabras + remate de unas 7 (antes, 5–8 y 11–16).

## 5. Quién habla (el gabinete)
- **Problema.** «Líder sindical» no encajaba en una dictadura; ni el vigilante de barrio o el ama de casa irían a hablar con el dictador.
- **Vigente.** **Con el dictador solo hablan sus ministros, el mando militar y los embajadores extranjeros.** La gente corriente y Varela solo aparecen mencionados («a mí me avisan de que está haciendo algo»). Todos los ministros son Élite (el gobierno).
- **Vigente.** Gabinete de **once portavoces**, basado en los ministerios cubanos: Vicepresidente del Consejo de Ministros, Economía, Comercio, Agricultura, Educación, Trabajo, **Cultura** (no hubo ministerio de información), Fuerzas Armadas, Interior y los dos embajadores. Interior y Fuerzas Armadas pertenecen al grupo Ejército.
- **Vigente.** Salen: Secretario del Partido (el dictador dirige el Partido), Jefe de protocolo (no es un ministerio), Líder sindical, Jefe de la Seguridad del Estado (= Ministro del Interior), General de las milicias (= Ministro de las Fuerzas Armadas).
- **Vigente.** Reparto de las 45 cartas: Interior 9, Cultura 6, Economía 5, Fuerzas Armadas 4, Comercio 4, Vicepresidente 4, Potencia del norte 4, Agricultura 3, Educación 2, Trabajo 2, Embajador oriental 2 (ver `personajes.md`).
- **Ideas guardadas** para eras futuras: Salud Pública, Justicia, Relaciones Exteriores, Industrias (el de 1961), Azúcar y Recuperación de Bienes Malversados (existió en 1959).

## 6. Interfaz
- **Vigente.** Solo se juega arrastrando (o con flechas). Umbral de decisión: 22 % del ancho de la carta; un gesto rápido también decide. Al llegar a la zona de decisión, borde naranja y respuesta opaca (se quitó el texto «Suelta para decidir»: el resaltado basta).
- **Vigente.** Mensaje del personaje **sobre la carta** (hasta 5 líneas). Carta **cuadrada** con la ilustración y el nombre del personaje centrado debajo. Sin título de evento. La respuesta a la opción, **sobre la carta**, en un plano translúcido.
- **Vigente.** «N años en el poder» en la barra inferior; el nombre del año, muy pequeño (un guiño de los regímenes). Sin el texto «Estados del régimen»; los símbolos y estados se **tocan** y abren una ventana que los explica.
- **Vigente.** El nombre del dictador es **una sola palabra**: «Comandante Aureliano».
- **Vigente.** Pantalla final: **«Has caído» enorme** (antes era una etiqueta de 15 px y Jorge no sabía qué había pasado), la causa, un recuadro con la fuerza que cayó y la última decisión del jugador.
- **Vigente.** Fuerzas: **emoji + barra horizontal debajo + puntos de pista debajo de la barra**; roja solo por debajo de 15 o por encima de 85. Se quitaron las marcas rojas de los extremos de la barra.
- **Descartado.** Iconos que se llenan desde abajo (el de Ejército, una estrella con aro dibujada a mano; el resto de Material Symbols en peso bold): «no me convencen». Después, barra vertical al lado del icono. Se pasó a **emojis** (🪖 👥 🎩 🌐) y a los estados con emojis (🤐 👁️ 🖼️ 🤝 🚫 🧱 🏭 💸).
- **Vigente.** Aspecto Material Design en tonos de blanco, tipografía **Space Grotesk**, paleta de Claude **sin verde**, solo tema claro.
- **Descartado.** Paleta oliva y tipografías Oswald y Source Serif. La paleta «industrial de Claude Design» que pidió Jorge no se pudo localizar en la documentación; se usó la de Claude. Si Jorge manda una captura o los códigos, se cambia.

## 7. Ilustraciones (cronología)
1. **Descartado.** Estilo South Park en papel recortado, con ojos y bocas intercambiables que reaccionaban al arrastre (hubo una carta animada completa del Jefe de la Seguridad). Piezas en `assets/descartado/`.
2. **Descartado.** Hojas de baja resolución (512 px) con etiquetas, recortadas a mano. Algunas siguen como **provisionales** (seis personajes).
3. **Descartado.** Pegatinas con borde blanco y sombra, a alta resolución («no me gustan las nuevas»).
4. **Vigente.** Retratos a lápiz de cera generados en Flow (cinco definitivos: Vicepresidente, Economía, Comercio, Educación y Cultura), recortados a cuadrado y mezclados por multiplicación sobre un tono pálido del color del grupo.
5. **Vigente (6 oct; en curso desde el 3 oct).** Nueva dirección: **fotografía de prensa de los años 60 en blanco y negro**, con trama de puntos, contorno negro grueso salvo abajo, fondo blanco, el personaje **pegado al borde inferior**, y el nombre en una franja inferior. **Sin imagen de referencia** en el prompt (el generador no la reproduce). Los ministros son **«víboras vividoras»**: ropa cara, oro, glotonería y desprecio; nunca sudor, herramientas ni aspecto de campesino u obrero. Se pide diversidad de sexos y orígenes. Los once retratos llegaron el 6 oct (3:4, con el nombre impreso debajo, que el montaje recorta). Ese día se borraron todos los provisionales, el arte descartado, los originales antiguos, los prompts descartados y la herramienta que dejaba los retratos cuadrados.
- **Vigente.** Reglas de ropa: Caribe, sin trajes y casi sin mangas largas; solo los embajadores visten de fuera.
- **Aviso.** Los dos embajadores de las hojas antiguas llevaban símbolos reales (bandera estadounidense, insignia roja) y el General una estrella roja: en las ilustraciones nuevas no puede haber ninguno.

## 6 bis. Rediseño «documento impreso» (6 oct)
- **Vigente.** Paleta estricta de blanco, negro y gris carbón; **rojo solo para alertas** (barras en peligro, puntos de pista, «Has caído»). Se quitan el naranja, el azul y los colores de grupo.
- **Vigente.** Tipografía de máquina de escribir de los 60: Courier Prime para el texto y Special Elite para los títulos (sustituyen a Space Grotesk). Cuerpo del mensaje a 16 px como mínimo.
- **Vigente.** Fondo de papel envejecido grisáceo con tinta carbón (no blanco puro sobre negro puro).
- **Vigente.** Sin sombras ni degradados (se abandona la elevación de Material): contornos negros netos en lo pulsable (ranuras, botones, menú), bloques planos en lo informativo, línea doble bajo la cabecera, línea de puntos sobre la barra inferior, marcas de corte alrededor de la carta y ventanas con borde doble. Activo o seleccionado = colores invertidos (el pie de la carta en la zona de decisión, las ranuras al entrar o actuar un estado).
- **Vigente.** Alertas que no dependen del color: en peligro la barra se pone roja **y rayada**, parpadea, aparece un «!» junto al emoji y el móvil vibra al entrar en la zona crítica.
- **Vigente.** Se quita la línea del año («Año 7 - Año de…») para ganar espacio; el menú pasa a la fila de las fuerzas. Los nombres de los años se eliminan del código.
- **Vigente.** Pueblo pasa de 👥 a ✊.
- **Vigente.** La carta pasa de cuadrada a **3:4** (la proporción de los retratos nuevos): foto arriba y nombre escrito debajo.

## 6 ter. Ajustes del 6 oct (tarde)
- **Vigente.** El juego se llama **«¡Comandante, ordene!»** (antes «A la orden mi comandante»); se quita el 🫡 de la portada.
- **Vigente.** Pantalla de nombre: solo «Comandante» como título y el campo debajo; se quitan el subtítulo y la vista previa.
- **Vigente.** Se quita el botón de tres puntos y su menú: «Abandonar partida» pasa a ser una línea de texto pequeña bajo un divisor, debajo de las ranuras.
- **Vigente.** El mensaje del personaje va sin caja, directamente sobre el papel.
- **Corregido.** Al arrastrar, la carta se cortaba al salir de la columna (el contenedor recortaba). Ya no se recorta.
- **Vigente.** Los retratos se mezclan por multiplicación sobre el gris imprenta (el blanco del fondo pasa a gris). Sí se recortan: se quita el pie de foto y 1,5 % por cada lado.
- **Vigente.** Rojo también en la decisión: contorno grueso rojo y nombre invertido en rojo cuando la carta está lista para decidir.
- **Vigente.** Lo que se marca en rojo al decidir es la **respuesta** (el bloque de arriba de la carta), no el nombre. Barra en peligro: **roja lisa**, sin rayas (sigue el «!» y el parpadeo). Mensaje del personaje a 19 px (17 px en pantallas bajas): el texto más largo, 152 caracteres, cabe en 6 líneas.

## 4 bis. Era 3 · Culto (7 oct)
- **Vigente.** Tercera era, «Culto» (6–8 años, factor 0.75): 25 cartas. 11 son consecuencias de las banderas que estaban reservadas para ella (`culto_iniciado`, `modestia_aparente`, `desfile_militar`, `misiles_instalados`, `misiles_rechazados`, `jefe_poderoso`, `estudiantes_reprimidos`, `periodista_oficial`, `criticos_detenidos`, `deuda_externa`, `mercado_paralelo`); 11 son universales (ciudad con su nombre, himno, libro de texto, cumpleaños nacional, biografía, mausoleo, palacio del pueblo, zafra de los diez millones, sucesión, beso fraterno, viaje oficial); 1 ancla de final de era (el atentado) y 2 de cola (el pedestal, la investigación).
- **Vigente.** Desde la era 3 el tratamiento es **«Excelencia»**: lo cambia el motor solo, aparece en la barra inferior y las cartas empiezan por «Excelencia,». El texto de fin de era 2 lo anuncia.
- **Vigente.** Límites de longitud para la era 3 (test): mensaje ≤150, acción ≤5 palabras y ≤28, remate ≤75 caracteres. Desde la revisión de Jorge del 7 oct (ver abajo) también los cumplen las eras 1 y 2.
- **Vigente.** Los remates de la era 3 hablan en primera persona del dictador. Sin retratos nuevos: salen los once portavoces existentes (los ministerios futuros, Salud, Justicia, etc., siguen sin retrato).
- **Pendiente.** Las banderas nuevas apuntan a la era 4: `sucesor_designado`, `oposicion_culpada`, `mausoleo_construido`, `palacio_del_pueblo`, `estado_policial`. Los datos del archivo histórico de la era 3 están escritos de memoria y por verificar.

## 4 ter. Revisión de textos de las eras 1 y 2 (7 oct)
- **Vigente.** Jorge reescribió los **mensajes y los remates de las 45 cartas** de las eras 1 y 2 (las acciones no cambian). Los mensajes pasan a ser más cortos y directos y los remates hablan en **primera persona del dictador**, con tono más seco y menos chiste de frase hecha. Ya cumplen todos los límites (mensaje ≤150, remate ≤75); el test de longitud vale ahora para todas las cartas.
- **Anotado.** Varias cartas de embajadores pasan a hablar de «ofrecen», «piden», «consideran» en tercera persona (antes «mi gobierno ofrece…»). Y «El jefe pide más» empieza «quiero crear una unidad…» en lugar de «solicito autorización».

## 4 quater. Revisión de la era 3 (7 oct)
- **Vigente.** Jorge reescribió también los mensajes y remates de las **25 cartas de la era 3**, en el mismo tono que las eras 1 y 2 (primera persona del dictador). Cumplen todos los límites.
- **Corregido.** «El viaje oficial», opción A: el remate era el de la B; ahora dice «Dos semanas de aplausos extranjeros valen un par de riesgos».
- **Vigente.** Los embajadores hablan en **primera persona** («nuestro país considera…, aplicaremos…», «pedimos…»), nunca en tercera. Afecta a las cartas de embajador de las tres eras. «El jefe pide más» vuelve a «solicito autorización…» (servilismo).

## 7 bis. Papel recortado, ojos y estilos (10 oct)
- **Vigente.** Nueva dirección de arte: **manualidades de papel recortado** (Gemini, sobre croma verde). Diez personajes y catorce iconos que sustituyen a los emojis en todo el juego. Se borran las fotos de prensa en blanco y negro, los prompts antiguos y su herramienta.
- **Vigente.** **Agricultura desaparece**: el Ministro de Trabajo hereda sus cuatro cartas (la tierra, el hambre, la cosecha récord y la zafra). Diez portavoces.
- **Vigente.** Los ojos se dibujan por código y **siguen a la carta**: miran al centro, al lado contrario del arrastre. Se descarta la animación automática de 11 s del documento original.
- **Vigente.** Dos estilos, Normal y **Noir** (blanco y negro con rojo como único acento; fondo y ojos a elegir entre blanco, negro y rojo; por defecto fondo negro y ojos blancos). Se eligen en la portada, con una muestra del personaje.
- **Vigente.** Se mantienen los nombres del juego («Consejo de Ministros», «potencia del norte»), no los del documento de Gemini.
- **Vigente.** Las estrellas de tres personajes (Embajador oriental, Fuerzas Armadas, Educación) **se quedan**: excepción decidida por Jorge a la regla de insignias.
- **Aparcado.** El peso del HTML (~3,4 MB; se podría bajar a 700 px) y los fondos de escena (colores planos por ahora): no son prioridad.

## 7 ter. La carta manda (10 oct)
- **Vigente.** En el móvil de Jorge la carta quedaba pequeña y con mucho aire alrededor. Ahora **ocupa todo el hueco libre**, sin proporción fija (máximo 1,45 veces el ancho). Se aprieta todo lo demás: menos márgenes, mensaje con sitio para 5 líneas (el más largo ocupa 5), sin marcas de corte alrededor de la carta, mazo más pegado.
- **Vigente.** Iconos más grandes para que se vea que son manualidades: fuerzas a 46 px y ranuras de estado a 42 px.
- **Vigente.** Con la carta ancha el personaje se ve de busto (se recorta el aire de encima de la cabeza, `arriba` en `personajes.json`). La respuesta pasa a la parte baja de la foto, porque arriba tapaba los ojos justo cuando se mueven.

## 7 quater. Sin Noir e ilustración entera (10 oct)
- **Descartado.** El modo **Noir** y el bloque «Estilo» de la portada: queda solo el estilo original, a color, con fondo gris.
- **Vigente.** La ilustración **se ve entera** (tiene muchos detalles): se ajusta al hueco de la carta apoyada abajo, sin recortar. Sustituye al busto recortado de la versión anterior.
- **Anotado.** El Embajador oriental no tiene cigarro: lleva un documento enrollado con cordel. Para que eche humo habría que regenerar su imagen.

## 7 quinquies. Ojos vivos y animaciones (10 oct)
- **Vigente.** Los ojos **se mueven solos** (a un lado y a otro, con pausas; 7 s; cada carta con su desfase). Se descarta que siguieran a la carta: «casi no se nota».
- **Vigente.** **Una mini animación por personaje** (ver CLAUDE.md). El Embajador oriental no tiene cigarro (lleva un documento enrollado): en lugar de humo, una gota de sudor.
- **Vigente.** Nueva imagen de la Ministra de Cultura (corrige un error en la cara).
- **Vigente.** Los iconos de estado de abajo, mucho más grandes: fila propia a todo el ancho (62 px de alto); el nombre y los años pasan a una sola línea encima.

## 7 sexies. Composición del boceto de Jorge (10 oct)
- **Vigente.** Arriba, una línea «Comandante X | N años en el poder»; debajo, las fuerzas; el mensaje; la carta lo más grande posible; «Abandonar partida» al pie. Se quitan la línea doble y la barra inferior.
- **Vigente.** Los **estados pasan dentro de la carta**, arriba a la izquierda, uno debajo de otro, sin recuadro; solo aparecen los activos. Así la carta puede ser más vertical (hasta 1,6 veces el ancho).
- **Vigente.** La ilustración ocupa **siempre todo el ancho** (algunas vienen cortadas a los lados): se apoya abajo y, si no cabe en alto, se recorta por abajo. Fondo de la carta **gris oscuro** por ahora.
- **Vigente.** Los iconos proyectan una **sombra leve**, como recortes de papel.

## 4 quinquies. Era 4 · Ocaso y victoria: el juego completo (10 oct)
- **Vigente.** El juego tiene **cuatro eras** (antes se planeaban siete). La cuarta, «Ocaso» (6–8 años, factor 0.8), tiene 24 cartas: 7 consecuencias de las banderas reservadas (`prensa_libre`, `general_apartado`, `sucesor_designado`, `oposicion_culpada`, `mausoleo_construido`, `palacio_del_pueblo`, `estado_policial`), 13 universales (salud, medallas, plebiscito, el aliado se hunde, salida honrosa, memorias, el hijo, la cuenta en el extranjero, la memoria histórica, huelga general, concierto, estatuas que caen, sequía, turistas), 2 anclas (la salud y el parte médico) y 2 de cola (el doble, el escrutinio).
- **Vigente.** Tratamiento **«Padre de la Patria»** en la era 4.
- **Vigente.** **Victoria**: sobrevivir a la cuarta era. «¡Has ganado!», «Moriste en tu cama, y en el poder» y una esquela con hasta cuatro líneas de epitafio según las decisiones de la partida. Al azar se gana el 1 % de las veces; quien conoce los efectos, casi siempre.
- **Vigente.** Primer MVP listo; a partir de aquí, pulir.

## 7 septies. Carta que se voltea (10 oct)
- **Vigente.** Vuelve la barra inferior: «Comandante X» y los años en dos líneas, con las cuatro casillas de estado a la derecha (se descarta la línea de arriba y los estados dentro de la carta). Lo primero que se ve son las cuatro fuerzas; el mensaje, más pegado a ellas.
- **Vigente.** Se quita la franja blanca con el cargo: más alto para la ilustración. **Al tocar la carta, se voltea** y enseña la ficha del personaje (nombre propio, cargo, historia breve). Los nombres e historias son una primera propuesta de Claude, pendiente de revisar por Jorge.
- **Vigente.** Más alto para la carta: se quita la línea discontinua de la barra inferior y el mensaje reserva 4 líneas en vez de 5 (los largos bajan la letra hasta 15 px). En un móvil de 390×664 la carta pasa de 373 a 411 px de alto.
- **Vigente.** El volteo es un **giro 3D real de 180°** (0,6 s, con perspectiva): la carta entera, con su marco, da media vuelta y el reverso aparece por detrás. Se descarta el primer intento (encoger y estirar), que parecía «medio giro».
- **Vigente.** La carta mantiene el alto máximo y **ajusta el ancho a la proporción de las ilustraciones** (≈ 0,747): todas se ven enteras. En 390×664 mide 307×411 (antes 358×411, con los personajes cortados por abajo).
- **Vigente (11 oct).** Nuevo Ministro de Comercio, regenerado desde cero con proporciones medidas en el prompt (cabeza ≈ un tercio del ancho, barbilla al 43 % del alto): camisa vaquera de retales, pelo de ganchillo, moneda como insignia. Ojos y destello del reloj recolocados.

## 7 octies. El dictador (11 oct)
- **Vigente.** El jugador tendrá cara: **tres etapas del dictador**, inspiradas en el arquetipo del líder guerrillero carismático (sin parecido con personas reales): **joven** (eras 1 y 2, «Comandante»), **tirano asentado** (era 3, «Excelencia») y **viejo en chándal** (era 4, «Padre de la Patria»). Las tres con el gesto del índice levantado, el codo a 90°.
- **Hecho.** Imágenes recortadas y guardadas (`dictador-joven`, `dictador-asentado`, `dictador-viejo`); el viejo se refleja al recortarlo (`REFLEJAR` en `tools/recortar.py`) para que el dedo quede en la misma mano. **Aún no se usan**: dónde aparecen (portada, cambio de era) está por decidir.
- **Vigente (11 oct).** Portada y pantalla del nombre **sobre fondo oscuro**, con enlaces de texto en lugar de botones. La portada estrena al **dictador joven** (ojos animados y humo del puro) y la ventana «Cómo jugar» sustituye a la nota de instrucciones. El subtítulo pierde «en él».
- **Vigente (11 oct).** Nueva pantalla de **«Sigues en el poder»** (la de «¡Has caído!» queda como estaba): fondo oscuro, «Has gobernado N años» en lugar de «Fin de la era N», un solo texto con lo que ha pasado y el objetivo de la siguiente era, una lista breve (estado del país + lo que te espera), «Seguir gobernando» como enlace y la ilustración del dictador. Sin tabla ni botón de cambiar de nombre. Los tres dictadores ya tienen ojos y animación (humo del puro en joven y asentado; destello en la cremallera del viejo).
- **Vigente (11 oct).** **Misma interfaz para todo:** la portada y «Sigues en el poder» se montan como el juego, con el dictador en una carta. En la portada, la carta se arrastra: derecha, empezar a gobernar; izquierda, archivo histórico; solo queda el enlace «Cómo se juega». «Sigues en el poder» tiene pantalla propia, con un solo párrafo más corto y el botón «Seguir gobernando» abajo. «¡Has caído!» se rehará igual más adelante.
- **Vigente (11 oct). Empieza el rediseño de la interfaz, por la portada.** Nuevo **logo de letras de papel y tela recortadas** (Gemini sobre croma; `assets/logo/`, recortado con `tools/recortar.py logo`) en lugar del título en rojo. Subtítulo: «Mantén el poder tanto tiempo como puedas.» El archivo histórico **deja de estar en el arrastre a la izquierda**: la carta lleva a gobernar hacia cualquier lado, y al pie queda «Cómo se juega | Archivo histórico».
- **En prueba (11 oct). Respuestas cortas, solo en la era 1.** Las respuestas del dictador pasan a ser de **1 a 3 palabras, sin remate** (p. ej. «¡Exprópiese!» en las refinerías), y la respuesta se muestra **en la parte alta de la carta**, no en la baja. Las eras 2 a 4 siguen con acción + remate hasta ver qué tal. Copia de todas las respuestas anteriores en `docs/COPIA_RESPUESTAS_CON_REMATE.md`.
- **Vigente (11 oct). Panel de respuesta como en Reigns.** Al inclinar la carta baja desde arriba un panel de tinta translúcido; gira al revés que la carta, así que su borde inferior queda siempre horizontal y el panel es una cuña (más alto en el lado que sube). La respuesta (hasta 2 líneas) va en esa esquina, la contraria al arrastre. En la zona de decisión, el panel se vuelve rojo.
- **Vigente (11 oct). Cada personaje tiene su fondo**, un color plano que pega con su ropa (`fondo` en `personajes.json`): Vicepresidente mostaza, Economía verde billete, Comercio naranja, Educación granate, Trabajo verde platanal, Cultura morado, Fuerzas Armadas arena, Interior azul noche, Embajador oriental rojo ladrillo, Embajador del norte azul cielo; dictador joven tierra, asentado azul y viejo verde pálido.
- **En prueba (12 oct), era 1:** las respuestas van **sin punto final** y las preguntas **sin «Comandante,»**; las 19 preguntas se reescribieron más cortas y claras. El panel de respuesta es **siempre negro al 50 %** (ya no se vuelve rojo en la zona de decisión).
- **Vigente (12 oct). Sin resaltado de confirmación.** Se quita el contorno rojo de la carta lista para decidir: la respuesta aparece justo en el umbral (15 % del ancho de la carta, mín. 44 px), así que **si se ve la respuesta, soltar decide**. Queda una vibración corta al cruzarlo.
- **Vigente (12 oct).** El umbral baja al **7 % del ancho de la carta (mín. 20 px)**: con el 15 % la respuesta salía tarde, con la carta ya muy inclinada. Ahora sale casi en cuanto empieza a inclinarse (unos 20 px en un móvil de 360).
- **Vigente (12 oct).** El panel de la respuesta **empieza a bajar en cuanto la carta se mueve**, al ritmo del arrastre, y llega abajo justo en el umbral; el texto sigue apareciendo solo en el umbral. Más fluido que antes, cuando el panel aparecía de golpe.
- **Vigente (13 oct). Cartas de cartón.** La carta pasa a ser un **rectángulo de cartón con esquinas redondeadas**; encima, algo más pequeña, la **cartulina de color** del personaje, y sobre ella el personaje, todo con sombras de papel pegado. Hecho **en código (CSS)**: una sola carta sirve para los 13 personajes, se adapta a cualquier móvil y las esquinas y sombras se ajustan sin regenerar nada. Las **texturas de cartulina** (`assets/fondos/`, tres: clara, con motas y kraft) se aplican como capa «multiplicar» y se usarán en todo el juego. Se quita la cascada del mazo: detrás queda **una sola carta de cartón oscuro** (se definirá mejor más adelante). El reverso (ficha) es la misma carta con una hoja pegada. Se relaja la regla «sin sombras»: solo las cosas pegadas la llevan.
- **Vigente (13 oct). Acabado de las cartas.** **Bisel** sutil en cartón, cartulina y hoja (filo claro arriba y a la izquierda, sombra fina abajo y a la derecha) y sombra bajo el personaje. La **cartulina de color** usa la nueva textura 4 (papel de pulpa, con relieve) a tamaño fijo, y se nota. **Cada carta se hace con un cartón distinto** (texturas 1 a 3 al azar: claro, kraft con motas y kraft oscuro); la 4 no se usa en el cartón por ser demasiado intensa. **El fondo del juego** lleva la textura 1 (la más clara) bajo un velo del color del papel al 55 %: el contraste del texto sigue en 12:1.
- **Vigente (13 oct). Segundo acabado.** La cartulina de color pasa a la **textura 5** (la 4, de pulpa, se descarta por ahora). **La carta base tiene color**: ocho cartones apagados (kraft, crema, gris, mostaza, verde, azul, ladrillo, morado) × tres texturas, al azar y descartando los que se parecen al fondo del personaje. **La piel de los personajes lleva el grano de la cartulina 1**, horneado en los recortes (máscara por color y por ausencia de trama; se probó con fuerza 5 y parecía corcho, se dejó en 1,4). **Menos bisel** (solo un filo claro arriba y uno oscuro abajo) y **sombras más oscuras y cortas** (sin desenfoque ni desplazamiento en X). **Vista cenital**: la carta de detrás solo asoma por abajo.
- **Vigente (13 oct). Perforaciones.** Las barras de las fuerzas y las casillas de estado pasan a ser **huecos en el cartón**: sin borde, con la textura 3 (cartón más oscuro) por detrás, sombra interior arriba y filo claro abajo. Ya no hay casilla discontinua para las vacías.
- **En prueba (13 oct). Iconos dibujados.** Pueblo (puño), Ejército (casquete) y Potencias (globo) arriba se sustituyen por **dibujos a bolígrafo y lápiz** sobre la cartulina (se les quita el blanco del papel y se recupera el color de la tinta; sin sombra). Los iconos de papel recortado **no se borran** y siguen en el resto del juego; la Élite aún no tiene dibujo. Si funciona, se hace el resto.
- **Vigente (13 oct). Textos de la era 1 reescritos por Jorge** (en `docs/cartas_era_1.md`, pasados a `src/datos.js`): preguntas más cortas y directas y respuestas nuevas. Como algunas respuestas pasan de 3 palabras, la regla de la era 1 pasa a ser **hasta 30 caracteres** y la letra de la respuesta **baja sola hasta 14 px** para caber en 2 líneas (elegido frente a ensanchar el texto o acortar las respuestas). Correcciones: «anterioros» → «anteriores» y «Comités de Defensa Revolucionaria» (nombre real cubano) → «Comités de Vigilancia Revolucionaria».
- **Vigente (13 oct). El general se llama Cienfuegos** (antes Varela), en todas las cartas y consecuencias, por decisión de Jorge aunque coincide con el apellido de una persona real. El identificador `varela_vuelve` se conserva (no se borran identificadores).
- **Vigente (13 oct). Iconos dibujados en todo el juego.** Llegan la chistera (Élite) y el apretón de manos (estado «Alineado», sin el marco ni los garabatos del dibujo). `icono()` usa el dibujo en todas las pantallas cuando existe (arriba, ventanas, «¡Has caído!», «Cómo se juega», casillas). En las casillas de estado los iconos se mezclan en **multiplicar** con el cartón del hueco.
- **Vigente (13 oct). Nueva portada y nueva pantalla del nombre.** La portada queda en el logo y tres opciones de texto («Comenzar partida», «Cómo se juega», «Archivo histórico»); se quitan la carta y «Mantén el poder…». La carta del dictador joven pasa a la **pantalla del nombre**, con el texto «El tirano ha caído…» arriba: a la derecha empieza la partida, a la izquierda vuelve a la portada; el nombre se escribe debajo, en una **perforación del cartón** como las casillas de estado. La pantalla del nombre deja de ser oscura.
- **Vigente (13 oct). Texto de fin de la era 1**, de Jorge: «Has conquistado el poder. Ahora toca aferrarse a él. Tus decisiones pasadas empiezan a volverse en tu contra. Fuera de tus fronteras crece la oposición y, dentro, aún quedan voces que silenciar. La Revolución debe resistir.» (Detrás siguen, si toca, la fuerza más tensa y lo que te espera.)
- **Vigente (13 oct).** El cartón de la carta lleva también la **pulpa de la textura 5**, como la cartulina de color.
- **Vigente (13 oct).** La portada va sobre **cartón kraft oscuro** (textura 3) para que contraste con el logo, que es claro. Las tres opciones pasan a crema: en tinta quedaban a 3:1 de contraste; en crema, 5:1.
- **Vigente (13 oct).** Se quita el kraft oscuro de la portada (no quedaba bien): vuelve al cartón claro del resto, con las opciones en tinta. En la pantalla del nombre, el texto de arriba (alineado a la izquierda) y el campo del nombre miden lo mismo que la carta.
- **Vigente (13 oct). Misma carta en todas las pantallas.** La carta de la pantalla del nombre y la de «Sigues en el poder» miden y se colocan exactamente como la de la partida (antes tomaban el alto libre de su pantalla y salían más grandes o más pequeñas). El texto de arriba ocupa el hueco de las barras y el mensaje; en «Sigues en el poder» el párrafo se corta por ahora (pendiente de decidir).
- **Vigente (13 oct). Un cartón fijo por personaje** (color y textura en `personajes.json`), en vez de uno al azar: así el mismo personaje no sale con dos cartones distintos.
- **Vigente (13 oct).** La pregunta de cada carta va **centrada en vertical** en su hueco de 4 líneas, para que con 2 líneas quede el mismo aire arriba y abajo. **«Cómo se juega»** con el texto nuevo de Jorge (con los iconos dibujados en lugar de emojis).
- **Vigente (13 oct).** En la carta de la pantalla del nombre, las respuestas pasan de «Empezar partida» / «Volver» a **«¡La Revolución empieza hoy!»** / **«Primero, elecciones»** (más punch tras el texto inicial; el chiste: elegir la democracia te saca del juego).
- **En prueba (13 oct). Iconos de estado de cartón y carta de estado nuevo.** Ocho iconos nuevos (censura, vigilancia, culto, alineado, embargo, frontera, nacionalizado, deuda), minimalistas y cuadrados, hechos para leerse a 40 px. Cuando entra un estado, en lugar de la ventana emergente sale una carta con el icono grande; al tocarla o arrastrarla baja volando a su casilla. Los iconos de papel antiguos se conservan.
- **En prueba (13 oct). Carta de estado con letra «a boli».** Nueva tipografía **Gochi Hand** (manuscrita, algo infantil; elegida frente a Schoolbell, Indie Flower y Patrick Hand por leerse mejor en pequeño). La carta lleva el nombre del estado y una frase con ironía en una etiqueta de papel pegada; arriba solo «Nuevo estado del régimen»; la descripción y los efectos pasan a la ventana de la casilla. Frase provisional de Nacionalizaciones: «Ahora todo es del pueblo. Y el pueblo soy yo.»; las otras siete, pendientes.
- **Vigente (13 oct).** En la carta de estado, el título va a máquina (Special Elite) y solo la frase va a boli, en azul tinta más oscuro. Nacionalizaciones: «Ahora todo es del pueblo. Y el pueblo eres tú.». El texto de la pantalla del nombre pasa a ir centrado, como la pregunta de la partida.
- **Vigente (14 oct). «Sigues en el poder» sin botón:** la carta del dictador se arrastra. Derecha sigue gobernando; izquierda te retiras y vuelves a la portada. Frases (provisionales): a la era 2 «La Revolución no ha terminado» / «Convocar elecciones»; a la 3 «El pueblo me necesita» / «Retirarme a tiempo»; a la 4 «Aún me queda cuerda» / «Ceder el testigo».
- **Vigente (14 oct). «¡Has caído!» rehecha:** título, «Pueblo llegó al mínimo», el relato, y la causa como título de una carta (de momento una cartulina roja con el título; las cartas de caída se diseñarán más adelante). Derecha, jugar de nuevo; izquierda, archivo histórico. Fuera el divisor, la caja roja con la barra, la última decisión, la tabla de datos, «lo que dejas pendiente» y el botón «Cambiar de nombre» (también de todo el juego). Al caer ya no se enseña el bloque de «Archivo histórico desbloqueado».
- **Vigente (14 oct).** La frase de cada estado pasa de la carta al hueco de arriba, donde va la pregunta (en lugar de «Nuevo estado del régimen. Toca la carta…»); en la carta queda solo el nombre. Se quita la tipografía Gochi Hand, que ya no se usaba.
- **Vigente (14 oct). Frases de los ocho estados**, de Jorge: Nacionalizaciones «Ahora todo es del pueblo. Y el pueblo eres tú.» · Embargo «La culpa de todo, por fin, tiene nombre.» · Deuda «Que paguen los nietos. Ya lo dijiste.» · Vigilancia «🎵 En cada cuadra un comité. En cada barrio, Revolución. 🎵» · Culto «El pueblo te quiere tanto que he tenido que repartir tu retrato por todo el país.» · Censura «Qué bonito cuando todos piensan igual.» · Frontera «El imperialismo lleva años intentando llevarse a nuestros mejores talentos.» · Alineado «La soberanía cuenta con el respaldo de una potencia que decide cómo debes ejercerla.»
- **Vigente (14 oct).** Embargo: «La culpa de todo por fin tiene nombre.» (sin comas). Deuda externa: «La revolución se pagará en cómodos plazos.»
- **Vigente (14 oct). Caída por Pueblo al máximo**, de Jorge: «Compraste el cariño del pueblo a base de subsidios y precios congelados. Cuando llegaron los recortes, salieron a reclamar sus «derechos»… y tu cabeza.» (Antes, el pueblo «exigía elecciones», que no tenía sentido con la popularidad al máximo.) El título sigue siendo «Transición democrática», pendiente de cambiar.
- **Vigente (14 oct).** Caída por Pueblo al máximo, versión final de Jorge: «Regalaste tanto para ganarte al pueblo que vaciaste las arcas. Cuando dejaste de dar, salieron a reclamar sus «derechos»… y tu cabeza.» Además, corregida la errata «gobierno anteriores» → «gobierno anterior» en la primera carta.
- **Vigente (14 oct). Cinco caídas reescritas por Jorge** (título de la carta · texto): Pueblo al máximo «Pan para hoy» (sin puntos suspensivos); Ejército al mínimo «Extracción nocturna»; Élite al mínimo «Junta de accionistas»; Élite al máximo «El «puesto a dedo»»; Potencias al máximo «Presidente desechable». Quedan con el texto anterior: Pueblo al mínimo «Revolución popular», Ejército al máximo «Junta militar» y Potencias al mínimo «Embargo e invasión».
- **Vigente (14 oct). Los cuatro dictadores nuevos**, generados con los prompts de esta sesión: joven (puño en alto), asentado (índice y dos relojes), culto (nuevo: gordo, con muchas medallas, sale al empezar la era 3) y viejo (chándal de los 90). Recortados con su piel texturizada, ojos y animación (humo del puro en los tres primeros; destello en la cremallera del viejo). Las imágenes antiguas quedan en el historial de git.
- **Vigente (14 oct). Cartón con color.** El cartón base de cada carta tenía casi siempre tonos ocre; ahora cada personaje tiene un color vivo propio que contrasta con su cartulina (azul, naranja, turquesa, amarillo, rojo, ámbar, verde, rosa, morado…), siempre el mismo para el mismo personaje.
- **Vigente (14 oct).** En «Sigues en el poder», «Has gobernado N años» baja debajo de la carta y deja más sitio al párrafo de arriba.

**14 oct — Cartón base en pastel.** Los colores vivos del cartón base parecían planos y no dejaban ver la textura. Ahora cada personaje tiene un tono claro/pastel del mismo matiz (azul, melocotón, menta, amarillo, coral, verde salvia, rosa, lavanda…), que sigue contrastando con su cartulina de color.

**14 oct — Cada carta, año y medio.** Con un año por carta una partida completa daba 24–32 años, poco para imitar a un dictador de verdad (Castro, casi 50). Ahora cada carta avanza entre 12 y 24 meses al azar (`MESES_POR_CARTA`) y una partida entera dura unos 40–50 años. Las reglas internas (estados, colas, ventanas) siguen contando cartas; la ventana de un estado dice «decisiones» en vez de «años».

**14 oct — Escenas para las cartas de estado.** La carta de un estado nuevo ya no enseña solo el icono: lleva un collage de papel recortado, plano y de piezas grandes, construido alrededor del icono (Gemini, 3:4, croma; los primeros intentos salían como maqueta, con muchas piezas pequeñas y volumen, y se pidió «plano, pocas piezas y grandes»). Ideas: Nacionalizaciones (todo sellado, llaves, chistera caída, retrato), Censura (bocadillos idénticos con corazones), Embargo (dedo acusador), Deuda (factura infinita, hucha rota, bombín del banquero), Vigilancia (un ojo en cada ventana, cancioncita), Culto (marcos con tu cara por todas partes), Frontera (los talentos huyen en balsa) y Alineado (marioneta). Los marcos vacíos llevan la cara del dictador de la etapa en curso, pegada por el juego. El icono queda para la casilla de abajo.

**14 oct — Cartas de estado: solo se tocan y con marco de purpurina.** La carta de un estado nuevo ya no se arrastra: solo responde al toque, que la manda volando a su casilla. Su marco ya no es de cartón, sino de cartulina de purpurina dorada (textura nueva de Jorge), para distinguirlas de las cartas de decisión.

**14 oct — Limpieza de lo que no se usa.** Se borran los recortes de papel antiguos de las fuerzas y los estados (y sus hojas originales), el dibujo de «Alineado» (lo tapaba el icono de cartón) y la textura 4 (pulpa, sin usar). Quedan en el historial de git.

**14 oct — Reparto y volteo.** Al empezar la partida, las cartas llegan volando y se apilan en el mazo, como el reparto del solitario; después se descubre la primera. Cada carta nueva (decisión o estado) sale boca abajo sobre el mazo y se le da la vuelta. Con «reducir movimiento» del sistema no hay animación.

**14 oct — Ajustes del reparto y del volteo.** El reparto ya no llega de todas partes girando: es una cascada diagonal, en línea recta y desde una sola esquina. El volteo se queda rápido, y la pregunta no aparece hasta que la carta se descubre.

**14 oct — «Los oficiales de antes».** La opción de purga decía «Limpien los cuarteles», que no dejaba claro qué se hacía. Ahora es «¡Al paredón!». «Jubílenlos» se queda.

**14 oct — Tres cartas iniciales.** Para que la partida no empiece siempre igual, la primera carta se sortea entre tres del grupo `inicio`: «La casa vacía» (Fuerzas Armadas: juicio o exilio), «La casa del tirano» (Cultura: «Museo del pueblo» / «Me mudo yo») y «Las arcas vacías» (Economía: «Impriman billetes», que deja el mercado paralelo, / «Pidan un préstamo», que activa la Deuda externa). Solo sale una por partida.

**14 oct — Textos a la izquierda y años al caer.** Todos los textos van alineados a la izquierda, salvo los titulares. En «¡Has caído!», debajo de la carta, sale «Gobernaste por N años».

**14 oct — Paleta tropical y cinta de carrocero.** Todo se veía opaco y oscuro para un juego de humor en el Caribe: los fondos de los personajes y de las cartas de estado pasan a colores vivos y claros (mango, turquesa, coral, flamenco, lima, cielo, lavanda), y el mazo a un kraft más claro. La etiqueta con el nombre del estado es ahora una tira de cinta de carrocero, algo translúcida y con los extremos en zigzag.

**14 oct — Iosevka en prueba.** Se buscaba una letra de máquina de escribir más estrecha que Courier Prime. Se compararon ocho (Xanh Mono, Iosevka, Anonymous Pro, Sometype, Victor, PT Mono, Syne y Cutive Mono) y Jorge eligió probar Iosevka en los textos. Los títulos siguen en Special Elite. Courier Prime se queda en `assets/fuentes/` por si se vuelve atrás.

**14 oct — Respaldo cuando se acaban las cartas.** Con tres cartas iniciales, muchas cartas de la era 2 que dependían de las banderas de «La casa vacía» dejaron de estar siempre disponibles, y en 1 de cada pocos miles de partidas una era se quedaba sin carta (falló la publicación en GitHub Pages por eso). Ahora, si no queda ninguna carta nueva, se repite la de esa era que hace más tiempo que salió. En 12 000 partidas simuladas: ningún hueco.

**14 oct — Todo alineado con la carta.** En móviles donde la carta no ocupa todo el ancho, la pregunta y el pie se salían de sus bordes y se veía desencajado. Ahora las barras, la pregunta, el nombre y las cuatro casillas empiezan y acaban justo donde la carta.

**14 oct — Reverso de las cartas.** El reverso liso era aburrido. Ahora lleva un dibujo a boli azul, como hecho por un niño de 5 años, que imita el reverso de una baraja con motivos revolucionarios (fusiles cruzados con una palmera en el centro, machetes, puros, caña, puños, soles sonrientes). Se quita el papel blanco y la tinta queda pegada sobre el kraft del mazo, del reparto y de la carta que se voltea.

**14 oct — Reverso por etapas.** El reverso lleva la pulpa de la textura 5, como el anverso, y un color por etapa: verde (Ascenso), azul (Consolidación), dorado (Culto) y lavanda (Ocaso). El dibujo a boli ya no va en azul: es del mismo tono que la carta, algo más intenso, para que sea sutil.

**14 oct — «¡Has caído!» más compacto.** «X llegó al máximo» y el relato van en un solo párrafo, la primera frase en negrita, y con concordancia: «El pueblo llegó…», «El ejército llegó…», «Las élites llegaron…», «Las potencias llegaron…». Los textos de arriba de esta pantalla (y de las del nombre y el paso de era) se alinean con la carta. El mazo de la pantalla del nombre ya tiene el reverso verde de la primera etapa.

**14 oct — Una sola tipografía y solo el humo.** Los títulos pasan también a Iosevka, en negrita (Special Elite ya no se incrusta). «¡No nos decepciones!» va en negrita. Se quitan todas las mini animaciones de los personajes (teléfono, flecha, destellos, mosca, sello, piloto, gota) salvo el humo de los puros, que ahora es casi el doble de grande y sube más.

## 8. Herramientas y flujo de trabajo
- **Vigente.** Los documentos de cartas dejan de mantenerse a mano: se generan desde `src/datos.js` (`npm run docs`). Antes había que actualizar cuatro sitios por cada cambio.
- **Vigente.** Un paquete para Claude Design (HTML, capturas, resumen) se montó a mano varias veces; ahora el resumen está en `docs/brief_claude_design.md`.
- **Vigente (3 oct).** Se migró de una conversación a esta carpeta para tener control de versiones, `CLAUDE.md` y pruebas.

## Pendiente
- Los pies de foto de los retratos dicen «Embajador del Bloque Occidental» y «Vicepresidente del Consejo de Estado», pero en el juego son «Embajador de la potencia del norte» y «Vicepresidente del Consejo de Ministros». Decidir si se cambian los nombres del juego.
- **Era 3 en adelante**: culto a la personalidad, «Excelencia», monumentos, `culto_iniciado`.
- Verificar los **datos históricos** del archivo y los **nombres de los ministerios cubanos** (están de memoria).
- Reforzar las cartas de coalición (hoy dos borradores) y repasar las 5 cartas borrador de la era 1.
- Probar el juego en móviles reales (hasta ahora solo se ha mirado en Chromium a 360–430 px). Un fallo de iconos que Jorge vio en su móvil se atribuyó a Safari y se reforzó, pero no se pudo reproducir.
