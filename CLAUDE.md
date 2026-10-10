# ¡Comandante, ordene!

Juego de cartas satírico, tipo Reigns, de Jorge. Eres un dictador de un país del Caribe **sin nombre**: decides deslizando la carta a izquierda o derecha, y cada decisión mueve cuatro fuerzas (Pueblo, Ejército, Élite, Potencias). Si una llega a 0 o a 100, caes. Humor negro seco: los personajes hablan en serio y con servilismo; el chiste lo pone la ironía del propio dictador.

Es **un único HTML autocontenido** (`dist/index.html`, sin red). **Juego completo (MVP, 10 oct): cuatro eras** — Ascenso (1), Consolidación (2), Culto (3) y Ocaso (4) —, 94 cartas. Si sobrevives a la cuarta, **ganas**: mueres de viejo, en tu cama y en el poder.

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
7. **Tratamiento:** «Comandante» en las eras 1 y 2; **«Excelencia»** en la 3; **«Padre de la Patria»** en la 4 (arriba se lee «Jorge, Padre de la Patria»). El motor lo cambia solo (`tratamiento()`); cada carta empieza por el tratamiento de su era (lo vigila un test).
8. **El nombre del dictador es una sola palabra** y se muestra como «Comandante X».

## Cómo se escriben las cartas
- **Límites (todas las eras, vigilados por un test):** mensaje ≤150 caracteres, acción ≤5 palabras y ≤28 caracteres, remate ≤75 caracteres. Más largo no cabe sobre la carta en móviles pequeños.
- **Los embajadores hablan en primera persona** del país que representan («nuestro país considera…, aplicaremos…»), no en tercera.
- Mensaje del personaje: ~20 palabras, serio y servil, empieza por «Comandante,» (era 3: «Excelencia,»). Sin réplicas posteriores (se eliminaron).
- Cada opción: **acción de 2 a 5 palabras** + **remate irónico** dicho en primera persona por el dictador (hasta 75 caracteres). El chiste va en la propia opción.
- Los efectos se escriben **en escala pequeña** (±4 a ±12) y cada barra suma lo que la otra opción resta (**recentrados**). El motor los multiplica: Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5, deriva de estados ×2 y, en las eras 2, 3 y 4, ×0.7, ×0.75 y ×0.8 más (`era.factor`). Cambia los factores en `motor.js` (`FACTOR_EFECTOS`), nunca los números de las cartas en bloque.
- **Los lados se mezclan al azar** (`mezclarLados`), así que A/B no es izquierda/derecha. No dependas del lado.
- Tipos: `ancla` (con `ventana` de años de la era), `cola` (la encola una decisión), `sorteo` (con `peso` y `cond`), `crisis` y `coalicion` (las dispara el estado de las barras; repetibles). `cond` admite `requiere`, `alguna`, `barraMax`, `barraMin`, `crisisMin`, `turnoMin`.
- Las banderas llevan el prefijo del mazo (`base.`). **Nunca se borra un identificador**, solo se marca obsoleto. Cada bandera que apunta a una era futura debe tener su carta cuando esa era exista (mira `docs/banderas.md`).
- Cada carta con `archivo` desbloquea una referencia histórica (una por partida, en un momento aleatorio, con aviso discreto).

## Interfaz (decisiones vigentes)
- Solo se juega **arrastrando** (o con las flechas): sin botones de decisión ni pantallas entre cartas. Umbral = 22 % del ancho de la carta; un gesto rápido también decide. Al llegar a la zona de decisión, la carta se rodea de un **contorno negro grueso**, el nombre se invierte y la respuesta se vuelve opaca (sin texto añadido).
- Arriba, lo primero, **cuatro iconos de papel** (casco = Ejército, puño = Pueblo, chistera = Élite, globo = Potencias) con su barra y **puntos rojos de pista** (tamaño = cuánto, nunca signo). Por debajo de 15 o por encima de 85 la barra se pone **roja, parpadea, sale un «!»** junto al icono y el móvil vibra al entrar (nunca solo color).
- Mensaje del personaje **sobre la carta**, sin caja y pegado a los iconos (alineado arriba), con sitio para **4 líneas** a 19 px (17 px en pantallas bajas); si un mensaje no cabe, `ajustarMensaje()` baja la letra hasta 15 px y, en pantallas muy estrechas, la caja crece una línea solo para ese mensaje. La carta **ocupa todo el hueco libre** (máximo 1,6 veces el ancho), fondo **gris oscuro**, mazo detrás y **sin franja con el cargo**. La ilustración va siempre a todo el ancho, apoyada abajo (si no cabe, se recorta por abajo, nunca la cabeza). La respuesta aparece en la parte baja de la foto; en la zona de decisión, contorno y respuesta en rojo.
- **Al tocar la carta se voltea** y enseña la **ficha del personaje**: nombre propio, cargo e historia breve (`FICHAS` en `datos.js`). Por detrás no se decide; otro toque la devuelve.
- Abajo, sin línea separadora: «Comandante X» y los años en el poder (dos líneas) y, a la derecha, **cuatro casillas de estado** (vacías con borde discontinuo; llenas con su icono). Tocar un icono de arriba o un estado abre una ventana que lo explica. Al pie, «Abandonar partida» en texto pequeño.
- Pantalla final: **«¡Has caído!» enorme**, la causa, la fuerza que cayó con su barra y la última decisión. Al superar una era, «Sigues en el poder». **Al superar la cuarta: «¡Has ganado!»**, «Moriste en tu cama, y en el poder» y una **esquela** cuyo epitafio depende de las decisiones (mausoleo, sucesor, capital con tu nombre, plebiscito…; `EPITAFIO` en `motor.js`).
- Aspecto: **documento impreso de los 60.** Papel envejecido `#ECE9E1`, bloques blanco roto `#F8F6F0`, gris imprenta `#D9D5CB`, carbón `#2B2A27`, tinta `#1C1B19`. **Rojo `#B3261E` solo para alertas y decisión** (barras en peligro, puntos de pista, contorno de la carta lista para decidir, «¡Has caído!»). El fondo blanco de los retratos se mezcla por multiplicación con el gris imprenta. Sin sombras ni degradados: lo pulsable lleva contorno negro neto; activo = colores invertidos; separaciones con línea doble, línea de puntos y marcas de corte. Tipografía de máquina de escribir: **Courier Prime** (texto, 16 px mínimo en el cuerpo) y **Special Elite** (títulos). Solo tema claro. Iconos: manualidades de papel recortado (ya no emojis), con una **sombra leve** para que parezcan recortes.
- Primera pantalla: título «¡Comandante, ordene!» (el juego se llama así) y un subtítulo en negrita, sin país. Segunda: solo «Comandante» y debajo el campo del nombre (se lee «Comandante X»); más de una palabra da aviso.

## Personajes, iconos y estilos (vigente desde el 10 oct)
- **Manualidades de papel recortado** generadas con Gemini sobre croma verde; recortadas con `tools/recortar.py`. Diez personajes y catorce iconos (4 fuerzas, 8 estados, archivo y candado).
- **La imagen no tiene ojos:** son dos círculos SVG por encima que **miran a un lado y a otro solos** (animación `mirar`, 7 s, cada carta con su desfase). No dependen de la carta.
- **Cada personaje tiene una mini animación** encima de la imagen (`animacion` en `personajes.json`, dibujos en `ANIMACION` de `motor.js`): Vicepresidente, el teléfono suena · Economía, la flecha del gráfico sube · Comercio, destello en el reloj · Educación, destello en la estrella · Trabajo, una mosca sobre los plátanos · Cultura, el sello deja un «PROHIBIDO» · Fuerzas Armadas, humo del puro · Interior, piloto rojo de la cámara del bolsillo · Embajador oriental, gota de sudor · Embajador occidental, destello en la sonrisa.
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
Pulir el MVP · verificar los datos históricos y los nombres de los ministerios cubanos · cartas de coalición adicionales · reforzar o reubicar los avisos si se juegan eras largas.
