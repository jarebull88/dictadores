# Historial de decisiones

Lo que se ha decidido hasta el **3 de octubre de 2026**, agrupado por tema. «Vigente» = sigue en el juego. «Descartado» = se probó y se quitó (no volver a ello sin preguntar a Jorge). Añade aquí cada decisión nueva, con fecha.

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
- **Vigente.** Las eras 3 a 7 no existen todavía ni tienen nombre. Banderas ya reservadas para la era 3: `culto_iniciado`, `modestia_aparente`, `desfile_militar`, `misiles_instalados`, `misiles_rechazados`, `jefe_poderoso`, `estudiantes_reprimidos`, `periodista_oficial`; para la 4: `prensa_libre`, `general_apartado`.
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
5. **En curso (3 oct).** Nueva dirección: **fotografía de prensa de los años 60 en blanco y negro**, con trama de puntos, contorno negro grueso salvo abajo, fondo blanco, el personaje **pegado al borde inferior**, y el nombre en una franja inferior. **Sin imagen de referencia** en el prompt (el generador no la reproduce). Los ministros son **«víboras vividoras»**: ropa cara, oro, glotonería y desprecio; nunca sudor, herramientas ni aspecto de campesino u obrero. Se pide diversidad de sexos y orígenes. Cinco prompts hechos, seis pendientes.
- **Vigente.** Reglas de ropa: Caribe, sin trajes y casi sin mangas largas; solo los embajadores visten de fuera.
- **Aviso.** Los dos embajadores de las hojas antiguas llevaban símbolos reales (bandera estadounidense, insignia roja) y el General una estrella roja: en las ilustraciones nuevas no puede haber ninguno.

## 8. Herramientas y flujo de trabajo
- **Vigente.** Los documentos de cartas dejan de mantenerse a mano: se generan desde `src/datos.js` (`npm run docs`). Antes había que actualizar cuatro sitios por cada cambio.
- **Vigente.** Un paquete para Claude Design (HTML, capturas, resumen) se montó a mano varias veces; ahora el resumen está en `docs/brief_claude_design.md`.
- **Vigente (3 oct).** Se migró de una conversación a esta carpeta para tener control de versiones, `CLAUDE.md` y pruebas.

## Pendiente
- Generar los **seis retratos en blanco y negro** que faltan (Cultura, Trabajo, Fuerzas Armadas, Interior y los dos embajadores) y sustituir los once. Decidir si la titular de Fuerzas Armadas es hombre o mujer.
- Al integrar su retrato, renombrar «Ministro de Educación» a **«Ministra de Educación»**.
- **Era 3 en adelante**: culto a la personalidad, «Excelencia», monumentos, `culto_iniciado`.
- Verificar los **datos históricos** del archivo y los **nombres de los ministerios cubanos** (están de memoria).
- Reforzar las cartas de coalición (hoy dos borradores) y repasar las 5 cartas borrador de la era 1.
- Si Jorge pasa la paleta «industrial» de Claude Design, aplicarla.
- Probar el juego en móviles reales (hasta ahora solo se ha mirado en Chromium a 360–430 px). Un fallo de iconos que Jorge vio en su móvil se atribuyó a Safari y se reforzó, pero no se pudo reproducir.
