# A la orden mi comandante

Juego de cartas satírico, tipo Reigns, de Jorge. Eres un dictador de un país del Caribe **sin nombre**: decides deslizando la carta a izquierda o derecha, y cada decisión mueve cuatro fuerzas (Pueblo, Ejército, Élite, Potencias). Si una llega a 0 o a 100, caes. Humor negro seco: los personajes hablan en serio y con servilismo; el chiste lo pone la ironía del propio dictador.

Es **un único HTML autocontenido** (`dist/index.html`, ~740 KB, sin red). Hoy hay dos eras jugables: Ascenso (era 1) y Consolidación (era 2), 45 cartas. El plan completo es de 7 eras.

## Cómo trabajar
```
npm install            # una vez (jsdom, para las pruebas)
pip install pillow     # una vez (para montar las imágenes)
npm test               # monta el juego y pasa 21 pruebas
npm run build          # solo montar → dist/index.html
npm run docs           # regenera docs/ desde los datos
npm run simular        # supervivencia y cobertura de cartas con miles de partidas
npm run calibrar -- 1 1.25   # ¿y si todos los efectos se multiplicaran por…?
```
Abre `dist/index.html` en el navegador (en formato móvil vertical) para jugar. **Antes de dar algo por hecho: `npm test`.**

## Mapa de la carpeta
- `src/datos.js` — **fuente única** de cartas, eras, finales y consecuencias futuras. Aquí se editan textos y efectos.
- `src/motor.js` — reglas, estados del régimen, interfaz y gestos. `src/estilos.css`, `src/cuerpo.html` — aspecto y pantallas.
- `data/ilustraciones.json` — qué imagen tiene cada personaje. `assets/personajes/definitivos|provisionales/` — retratos cuadrados.
- `assets/originales/` — imágenes tal como se generaron. `assets/descartado/` — arte probado y rechazado (no lo recuperes sin preguntar).
- `docs/` — **generado** desde los datos (no se edita a mano) salvo `HISTORIAL_DE_DECISIONES.md`, `DISENO.md` y `brief_claude_design.md`.
- `prompts/` — fichas y generador de los prompts de imagen. `tools/` — build, simulación, exportación y preparación de retratos. `tests/` — pruebas.

## Reglas de contenido (no negociables)
1. **Ningún país real dentro de las cartas ni de las ilustraciones.** Solo el `archivo` histórico de cada carta puede nombrar casos reales (Cuba, URSS, Chile…), siempre marcado «datos pendientes de verificar». Sin banderas, estrellas, escudos ni insignias reales.
2. **Con el dictador solo hablan:** sus ministros, el mando militar (Interior y Fuerzas Armadas) y los embajadores extranjeros. **La gente corriente y Varela nunca hablan**: los mencionan los ministros («el general Varela recibe oficiales en su casa»).
3. **Once portavoces:** Vicepresidente del Consejo de Ministros, Economía, Comercio, Agricultura, Educación, Trabajo, Cultura (ministra), Fuerzas Armadas, Interior, Embajador del bloque oriental, Embajador de la potencia del norte. Los ministerios se inspiran en los cubanos (de memoria: **verifícalos**). Para eras futuras: Salud Pública, Justicia, Relaciones Exteriores, Industrias, Azúcar, Recuperación de Bienes Malversados.
4. **Grupos = fuerza = color de fondo:** Élite (rosa higo): el gabinete civil. Ejército (gris grafito): Interior y Fuerzas Armadas. Potencias (azul): los embajadores. Pueblo (naranja): sin portavoz.
5. **Los ministros son «víboras vividoras»:** cerdos de la granja, no trabajadores. En arte y texto, lujo, glotonería y desprecio; nunca sudor, herramientas, aulas ni ropa de obrero.
6. **Diversidad:** el gabinete mezcla sexos y orígenes (ahora mismo: Educación y Cultura son mujeres). No se expresa la maldad con rasgos étnicos, sino con gesto, mirada y lujo. Caribe: sin trajes y casi sin mangas largas (camisas de manga corta, guayaberas); solo los embajadores visten de fuera.
7. **Tratamiento:** «Comandante» en las eras 1 y 2; «Excelencia» a partir de la era 3 (`culto_iniciado`); «Padre de la Patria» más adelante.
8. **El nombre del dictador es una sola palabra** y se muestra como «Comandante X».

## Cómo se escriben las cartas
- Mensaje del personaje: ~20 palabras, serio y servil, empieza por «Comandante,». Sin réplicas posteriores (se eliminaron).
- Cada opción: **acción de 2 a 5 palabras** + **remate irónico de unas 7** (un test lo vigila). El chiste va en la propia opción.
- Los efectos se escriben **en escala pequeña** (±4 a ±12) y cada barra suma lo que la otra opción resta (**recentrados**). El motor los multiplica: Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5, deriva de estados ×2 y, en la era 2, ×0.7 más (`era.factor`). Cambia los factores en `motor.js` (`FACTOR_EFECTOS`), nunca los números de las cartas en bloque.
- **Los lados se mezclan al azar** (`mezclarLados`), así que A/B no es izquierda/derecha. No dependas del lado.
- Tipos: `ancla` (con `ventana` de años de la era), `cola` (la encola una decisión), `sorteo` (con `peso` y `cond`), `crisis` y `coalicion` (las dispara el estado de las barras; repetibles). `cond` admite `requiere`, `alguna`, `barraMax`, `barraMin`, `crisisMin`, `turnoMin`.
- Las banderas llevan el prefijo del mazo (`base.`). **Nunca se borra un identificador**, solo se marca obsoleto. Cada bandera que apunta a una era futura debe tener su carta cuando esa era exista (mira `docs/banderas.md`).
- Cada carta con `archivo` desbloquea una referencia histórica (una por partida, en un momento aleatorio, con aviso discreto).

## Interfaz (decisiones vigentes)
- Solo se juega **arrastrando** (o con las flechas): sin botones de decisión ni pantallas entre cartas. Umbral = 22 % del ancho de la carta; un gesto rápido también decide. Al llegar a la zona de decisión, la carta se rodea de un **borde naranja** y la respuesta se vuelve opaca (sin texto añadido).
- Arriba: nombre del año pequeño (un guiño), **cuatro emojis** (🪖 Ejército, 👥 Pueblo, 🎩 Élite, 🌐 Potencias) con barra horizontal debajo y **puntos de pista debajo de la barra** (tamaño = cuánto, nunca signo). Barra **roja solo por debajo de 15 o por encima de 85**.
- Mensaje del personaje **sobre la carta**, hasta 5 líneas. Carta **cuadrada** con la ilustración y el **nombre centrado debajo**. La respuesta a la opción aparece **sobre la carta** en un plano translúcido.
- Abajo: «Comandante X», «N años en el poder» y cuatro ranuras de **estados** (emojis). Tocar un emoji de arriba o una ranura abre una ventana que lo explica.
- Pantalla final: **«Has caído» enorme**, la causa, la fuerza que cayó con su barra y la última decisión.
- Aspecto: Material Design en tonos de blanco, tipografía **Space Grotesk**, paleta de Claude (marfil, pizarra `#141413`, naranja `#D97757`, azul `#6A9BCC`, error `#B3261E`). **Sin verde. Solo tema claro.** Sin pictogramas: emojis.
- Primera pantalla: «A la orden 🫡 / mi comandante» y un subtítulo en negrita, sin país.

## Ilustraciones
- **Vigente:** retratos de busto a **lápiz de cera** sobre blanco (las cinco definitivas vienen de Flow), mezclados por multiplicación sobre un fondo pálido del color del grupo. Seis son recortes provisionales de baja resolución.
- **Nueva dirección (en curso):** fotografía de prensa de los años 60 en blanco y negro, con trama de puntos, contorno negro grueso (excepto abajo) y el personaje **pegado al borde inferior**. Cinco prompts hechos (`prompts/personajes_bn.json`), seis pendientes. Sin imagen de referencia en el prompt (el generador no la sigue bien). `tools/preparar_retrato.py` prepara el resultado; el flujo está en `docs/DISENO.md`.
- Descartados: papel recortado con ojos y boca que cambian, pegatinas con borde blanco, hojas de baja resolución con etiquetas.

## Cómo trabaja Jorge (y cómo responderle)
- Español, **tuteo**. Lo revisa casi todo **desde el móvil**: respuestas cortas y claras, lo importante primero, sin tablas enormes.
- **Haz solo lo que pide.** Si ves algo más que mejorar, díselo; no lo cambies sin preguntar. Si hay varias lecturas posibles, elige la más probable y dilo.
- Cuando cambies algo visible, **pruébalo** (`npm test`, y en el navegador a 360–430 px de ancho) y cuéntale qué probaste y qué no.
- Le gusta ir **personaje por personaje** y carta por carta, revisando cada uno. Ofrece alternativas con una recomendación.
- Mantén `docs/` al día con `npm run docs` y apunta cada decisión nueva en `docs/HISTORIAL_DE_DECISIONES.md`.

## Pendiente (ver también el final del historial)
Ilustrar los 6 personajes que faltan en blanco y negro e integrar los 11 · renombrar «Ministro de Educación» a «Ministra de Educación» al integrar su retrato · era 3 en adelante (culto, «Excelencia», monumentos) · verificar los datos históricos y los nombres de los ministerios cubanos · cartas de coalición adicionales · reforzar o reubicar los avisos si se juegan eras largas.
