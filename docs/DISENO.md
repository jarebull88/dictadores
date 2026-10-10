# Diseño del juego

Este documento explica **cómo funciona** el juego. Las cartas concretas, las banderas, los personajes y los estados están en los documentos generados (`cartas_era_1.md`, `cartas_era_2.md`, `banderas.md`, `personajes.md`, `estados.md`, `finales.md`).

## Qué ve el jugador
1. **Portada:** «A la orden 🫡 mi comandante», subtítulo, «Empezar partida» y «Archivo histórico (X de N)».
2. **Nombre:** una sola palabra; se verá como «Comandante X».
3. **Juego:** cuatro fuerzas y menú · mensaje del personaje · carta 3:4 con su nombre debajo · barra con «Comandante X», años en el poder y cuatro ranuras de estado.
4. **Decidir:** arrastrar la carta (o las flechas). La respuesta aparece sobre la carta; al entrar en la zona de decisión se rodea de un contorno grueso y el nombre se invierte.
5. **Fin de era / final:** «Sigues en el poder» con «Seguir gobernando», o «¡Has caído!» con la causa.
6. **Archivo histórico:** colección persistente (localStorage) de referencias reales desbloqueadas, una por partida.

## Las cuatro fuerzas y la crisis oculta
Pueblo (puño), Ejército 🪖, Élite 🎩 y Potencias 🌐, todas empiezan en 50. 0 o 100 = caída (cada extremo tiene su final en `finales.md`). La **crisis oculta** (la economía) no es una barra: sube con promesas imposibles y, al cruzar umbrales, dispara cartas de crisis. El jugador nunca ve su número.
Los puntos de pista que aparecen al arrastrar avisan **de cuánto** se verá afectada cada fuerza, **no de si sube o baja**.

## Orden en que se roba una carta
1. **Cola:** cartas que una decisión anterior programó para dentro de 1 o 2 años.
2. **Estados críticos:** crisis oculta alta, o coalición (dos barras bajas a la vez).
3. **Anclas** con ventana de años: se fuerzan en su último año.
4. **Sorteo** ponderado por `peso` y por las condiciones (`cond`), modulado por los estados activos.
Las cartas solo salen en su era y una vez por partida, salvo las `repetible` (descanso de 10 años).

## Estados del régimen
Máximo 4 ranuras: al entrar el quinto sale el más antiguo. Cada estado tiene deriva sobre las barras, cadencia, a veces duración, y cambia los pesos del sorteo. Lista en `estados.md`. Al entrar un estado nuevo se abre una ventana explicativa automática.

## Eras
Cada era dura de 6 a 8 años. Son cuatro: **1 · Ascenso**, **2 · Consolidación** (factor de dureza 0.7), **3 · Culto** (0.75; tratamiento «Excelencia») y **4 · Ocaso** (0.8; «Padre de la Patria»). Sobrevivir a la cuarta es **ganar** (pantalla de victoria con esquela). Entre eras se conservan barras, estados, banderas y crisis; los años siguen contando; los nombres de año (Año 1 – Año de la Gloriosa Revolución…) llegan a 30 y luego se numeran.
En la era 2, cada bandera que la era 1 apuntaba hacia ella tiene su carta; algunas aceptan varias banderas (`alguna`) porque sus disparadores son raros.

## Dificultad
Objetivo: **jugando al azar se supera la era 1 en torno al 28 % de las veces**; quien conoce los efectos casi siempre la supera; las caídas se reparten entre las cuatro fuerzas, por arriba y por abajo; nunca hay caídas en las dos primeras cartas ni huecos sin carta. Se mide con `npm run simular` y un test lo vigila (15–45 %).
- Los lados A/B se mezclan al azar; jugar siempre a un lado equivale a jugar al azar.
- Puntos de pista (sobre los efectos ya multiplicados): hasta 14 = pequeño, hasta 20 = mediano, más = grande.
- Peligro (barra roja): por debajo de 15 o por encima de 85.

## Cómo se añade una era
1. Mira `docs/banderas.md`: qué banderas apuntan a la era nueva (`FUTURO_ERA`) y cuáles de la era anterior conviene hacer pagar.
2. En `src/datos.js`: añade la era a `ERAS` (nombre, `min`, `max`, `factor`) y las cartas con `era: N`. Una bandera exigida por una carta debe concederla alguna otra carta (lo comprueba un test).
3. Cada carta: portavoz del gabinete (regla del proyecto), mensaje, dos opciones recentradas, `archivo` histórico cuando proceda.
4. Añade textos en `TEXTO_FIN_ERA` y `FUTURO` si hay consecuencias a largo plazo (en `src/motor.js` y `src/datos.js`).
5. `npm test`, `npm run simular` (¿se ven todas las cartas? ¿supervivencia razonable?), ajusta `era.factor`, `npm run docs`, y apunta la decisión en el historial.

## Cómo se añade o cambia un personaje
Sigue `docs/PIPELINE_PERSONAJES.md`: imagen de Gemini con croma en `assets/personajes/originales/`, `python3 tools/recortar.py`, ojos en `assets/personajes/personajes.json`, `PERSONAJE_SLUG` y `GRUPO_DE` en `src/motor.js`, `npm test` y `npm run docs`.

## Técnica
- Un solo HTML: datos + motor + estilos + personajes e iconos WebP con transparencia + fuentes, todo en base64. Ver `tools/build.py`.
- Persistencia: `localStorage` (archivo y nombre), con respaldo en memoria si no está disponible.
- Las pruebas usan jsdom (sin navegador). Para ver el aspecto real, abre `dist/index.html` a 360–430 px de ancho.
- Fecha de esta versión: 6 de octubre de 2026.
