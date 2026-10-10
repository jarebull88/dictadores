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
