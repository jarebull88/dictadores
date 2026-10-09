# ¡Comandante, ordene!

Juego de cartas satírico, tipo Reigns, de Jorge. Eres un dictador de un país del Caribe **sin nombre**: decides deslizando la carta a izquierda o derecha, y cada decisión mueve cuatro fuerzas (Pueblo, Ejército, Élite, Potencias). Si una llega a 0 o a 100, caes. Humor negro seco: los personajes hablan en serio y con servilismo; el chiste lo pone la ironía del propio dictador.

Es **un único HTML autocontenido** (`dist/index.html`, sin red). Hoy hay tres eras jugables: Ascenso (1), Consolidación (2) y Culto (3), 70 cartas. El plan completo es de 7 eras.

## Cómo trabajar
```
npm install            # una vez (jsdom, para las pruebas)
pip install pillow numpy scipy   # solo para recortar personajes e iconos (tools/recortar.py)
npm test               # monta el juego y pasa 28 pruebas
npm run build          # solo montar → dist/index.html
npm run docs           # regenera docs/ desde los datos
npm run simular        # supervivencia y cobertura de cartas con miles de partidas
npm run calibrar -- 1 1.25   # ¿y si todos los efectos se multiplicaran por…?
```
Abre `dist/index.html` en el navegador (en formato móvil vertical) para jugar. **Antes de dar algo por hecho: `npm test`.**

## Mapa de la carpeta
- `src/datos.js` — **fuente única** de cartas, eras, finales y consecuencias futuras. Aquí se editan textos y efectos.
- `src/motor.js` — reglas, estados del régimen, interfaz y gestos. `src/estilos.css`, `src/cuerpo.html` — aspecto y pantallas.
- `assets/personajes/` — `originales/` (Gemini, con croma), `recortados/` (WebP con transparencia) y `personajes.json` (ojos, Noir, extras). `assets/iconos/` — igual, para los iconos. **Antes de tocar personajes o iconos, lee `docs/PIPELINE_PERSONAJES.md`.**
- El arte antiguo (lápiz de cera, fotos de prensa, papel recortado con ojos, pegatinas) se borró; solo queda en el historial de git. No lo recuperes sin preguntar.
- `docs/` — **generado** desde los datos (no se edita a mano) salvo `HISTORIAL_DE_DECISIONES.md`, `DISENO.md` y `brief_claude_design.md`.
- `tools/` — `recortar.py` (croma de personajes e iconos), build, simulación y exportación. `tests/` — pruebas.

## Reglas de contenido (no negociables)
1. **Ningún país real dentro de las cartas ni de las ilustraciones.** Solo el `archivo` histórico de cada carta puede nombrar casos reales (Cuba, URSS, Chile…), siempre marcado «datos pendientes de verificar». Sin banderas, estrellas, escudos ni insignias reales.
2. **Con el dictador solo hablan:** sus ministros, el mando militar (Interior y Fuerzas Armadas) y los embajadores extranjeros. **La gente corriente y Varela nunca hablan**: los mencionan los ministros («el general Varela recibe oficiales en su casa»).
3. **Diez portavoces:** Vicepresidente del Consejo de Ministros, Economía, Comercio, Educación (ministra), Trabajo (heredó las cartas de Agricultura, que ya no existe), Cultura (ministra), Fuerzas Armadas, Interior, Embajador del bloque oriental, Embajador de la potencia del norte. Los ministerios se inspiran en los cubanos (de memoria: **verifícalos**). Para eras futuras: Salud Pública, Justicia, Relaciones Exteriores, Industrias, Azúcar, Recuperación de Bienes Malversados.
4. **Grupo = fuerza:** Élite: el gabinete civil. Ejército: Interior y Fuerzas Armadas. Potencias: los embajadores. Pueblo: sin portavoz. (Los colores por grupo se quitaron: la interfaz es en blanco y negro.)
5. **Los ministros son «víboras vividoras»:** cerdos de la granja, no trabajadores. En arte y texto, lujo, glotonería y desprecio; nunca sudor, herramientas, aulas ni ropa de obrero.
6. **Diversidad:** el gabinete mezcla sexos y orígenes (ahora mismo: Educación y Cultura son mujeres). No se expresa la maldad con rasgos étnicos, sino con gesto, mirada y lujo. Caribe: sin trajes y casi sin mangas largas (camisas de manga corta, guayaberas); solo los embajadores visten de fuera.
7. **Tratamiento:** «Comandante» en las eras 1 y 2; **«Excelencia» desde la era 3** (el motor lo cambia solo, `tratamiento()`; las cartas de la era 3 empiezan por «Excelencia,»); «Padre de la Patria» más adelante.
8. **El nombre del dictador es una sola palabra** y se muestra como «Comandante X».

## Cómo se escriben las cartas
- **Límites (todas las eras, vigilados por un test):** mensaje ≤150 caracteres, acción ≤5 palabras y ≤28 caracteres, remate ≤75 caracteres. Más largo no cabe sobre la carta en móviles pequeños.
- **Los embajadores hablan en primera persona** del país que representan («nuestro país considera…, aplicaremos…»), no en tercera.
- Mensaje del personaje: ~20 palabras, serio y servil, empieza por «Comandante,» (era 3: «Excelencia,»). Sin réplicas posteriores (se eliminaron).
- Cada opción: **acción de 2 a 5 palabras** + **remate irónico** dicho en primera persona por el dictador (hasta 75 caracteres). El chiste va en la propia opción.
- Los efectos se escriben **en escala pequeña** (±4 a ±12) y cada barra suma lo que la otra opción resta (**recentrados**). El motor los multiplica: Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5, deriva de estados ×2 y, en las eras 2 y 3, ×0.7 y ×0.75 más (`era.factor`). Cambia los factores en `motor.js` (`FACTOR_EFECTOS`), nunca los números de las cartas en bloque.
- **Los lados se mezclan al azar** (`mezclarLados`), así que A/B no es izquierda/derecha. No dependas del lado.
- Tipos: `ancla` (con `ventana` de años de la era), `cola` (la encola una decisión), `sorteo` (con `peso` y `cond`), `crisis` y `coalicion` (las dispara el estado de las barras; repetibles). `cond` admite `requiere`, `alguna`, `barraMax`, `barraMin`, `crisisMin`, `turnoMin`.
- Las banderas llevan el prefijo del mazo (`base.`). **Nunca se borra un identificador**, solo se marca obsoleto. Cada bandera que apunta a una era futura debe tener su carta cuando esa era exista (mira `docs/banderas.md`).
- Cada carta con `archivo` desbloquea una referencia histórica (una por partida, en un momento aleatorio, con aviso discreto).

## Interfaz (decisiones vigentes)
- Solo se juega **arrastrando** (o con las flechas): sin botones de decisión ni pantallas entre cartas. Umbral = 22 % del ancho de la carta; un gesto rápido también decide. Al llegar a la zona de decisión, la carta se rodea de un **contorno negro grueso**, el nombre se invierte y la respuesta se vuelve opaca (sin texto añadido).
- Arriba (sin línea de año): **cuatro iconos de papel** (casco = Ejército, puño = Pueblo, chistera = Élite, globo = Potencias) con barra horizontal debajo, **puntos rojos de pista** debajo (tamaño = cuánto, nunca signo) y cerradas por una línea doble. Por debajo de 15 o por encima de 85 la barra se pone **roja (lisa), parpadea, sale un «!»** junto al emoji y el móvil vibra al entrar (nunca solo color).
- Mensaje del personaje **sobre la carta**, sin caja (directo sobre el papel), hasta 5 líneas a 19 px (17 px en pantallas bajas). La carta **no tiene proporción fija: ocupa todo el hueco libre** (ancho completo y el alto que dejan mensaje y barra inferior; máximo 1,45 veces el ancho), con el mazo detrás. El personaje **se ve siempre entero** (se ajusta al hueco apoyado abajo; si sobra ancho, queda fondo gris a los lados). La respuesta a la opción aparece en un plano de tinta **en la parte baja de la foto**, para no tapar los ojos. En la zona de decisión: **contorno grueso rojo** y la respuesta (lo que eliges) en un bloque rojo. La carta nunca se recorta al arrastrarla.
- Abajo, tras una línea de puntos: «Comandante X», «N años en el poder» y cuatro ranuras de **estados** (iconos de papel; vacías con borde discontinuo, llenas con contorno negro). Debajo, otro divisor y «Abandonar partida» en texto pequeño (no hay botón de menú). Tocar un emoji de arriba o una ranura abre una ventana (borde doble) que lo explica.
- Pantalla final: **«¡Has caído!» enorme**, la causa, la fuerza que cayó con su barra y la última decisión.
- Aspecto: **documento impreso de los 60.** Papel envejecido `#ECE9E1`, bloques blanco roto `#F8F6F0`, gris imprenta `#D9D5CB`, carbón `#2B2A27`, tinta `#1C1B19`. **Rojo `#B3261E` solo para alertas y decisión** (barras en peligro, puntos de pista, contorno de la carta lista para decidir, «¡Has caído!»). El fondo blanco de los retratos se mezcla por multiplicación con el gris imprenta. Sin sombras ni degradados: lo pulsable lleva contorno negro neto; activo = colores invertidos; separaciones con línea doble, línea de puntos y marcas de corte. Tipografía de máquina de escribir: **Courier Prime** (texto, 16 px mínimo en el cuerpo) y **Special Elite** (títulos). Solo tema claro. Iconos: manualidades de papel recortado (ya no emojis).
- Primera pantalla: título «¡Comandante, ordene!» (el juego se llama así) y un subtítulo en negrita, sin país. Segunda: solo «Comandante» y debajo el campo del nombre (se lee «Comandante X»); más de una palabra da aviso.

## Personajes, iconos y estilos (vigente desde el 10 oct)
- **Manualidades de papel recortado** generadas con Gemini sobre croma verde; recortadas con `tools/recortar.py`. Diez personajes y catorce iconos (4 fuerzas, 8 estados, archivo y candado).
- **La imagen no tiene ojos:** son dos círculos SVG por encima. **Siguen a la carta**: miran al centro, al lado contrario del arrastre (no se mueven solos). Fuerzas Armadas lleva humo animado en el puro.
- **Un solo estilo, a color** (el modo Noir y su selector se quitaron el 10 oct). Fondo de escena gris imprenta.
- **Excepción a la regla 1 (decidido por Jorge, 10 oct):** las estrellas de tres personajes se quedan (solapa roja del Embajador oriental, boina de Fuerzas Armadas, placa dorada de Educación). No las señales ni las quites.
- De momento no preocupan el peso del HTML (~3,4 MB) ni los fondos de escena (colores planos); no los toques sin que lo pida.

## Cómo trabaja Jorge (y cómo responderle)
- Español, **tuteo**. Lo revisa casi todo **desde el móvil**: respuestas cortas y claras, lo importante primero, sin tablas enormes.
- **Haz solo lo que pide.** Si ves algo más que mejorar, díselo; no lo cambies sin preguntar. Si hay varias lecturas posibles, elige la más probable y dilo.
- Cuando cambies algo visible, **pruébalo** (`npm test`, y en el navegador a 360–430 px de ancho) y cuéntale qué probaste y qué no.
- Le gusta ir **personaje por personaje** y carta por carta, revisando cada uno. Ofrece alternativas con una recomendación.
- Mantén `docs/` al día con `npm run docs` y apunta cada decisión nueva en `docs/HISTORIAL_DE_DECISIONES.md`.

## Pendiente (ver también el final del historial)
Era 4 en adelante · verificar los datos históricos y los nombres de los ministerios cubanos · cartas de coalición adicionales · reforzar o reubicar los avisos si se juegan eras largas.
