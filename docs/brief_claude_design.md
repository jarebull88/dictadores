> Resumen para llevar el diseño a Claude Design. Puede ir algo por detrás de lo que hay en `docs/` y en el código: si dudas, manda lo que dicen los datos y el motor.

# A la orden mi comandante · Paquete para Claude Design

## Qué es el juego
Juego de cartas para móvil, al estilo de Reigns: el jugador es un dictador de un país latinoamericano **ficticio** del siglo XX. Decide deslizando cada carta a izquierda o derecha, y cada decisión mueve cuatro barras de poder. Si una barra llega a 0 o a 100, el régimen cae. El objetivo es durar el mayor tiempo posible. Tono: satírico, seco, con humor negro, nunca infantil. El humor lo pone el dictador; los ministros hablan en serio.

## Qué hay en este paquete
- `prototipo/dictadores-v2.html`: prototipo jugable, un solo archivo autocontenido (~240 KB). Ábrelo en el navegador con la ventana en formato móvil.
- `capturas/`: 9 capturas en 390 × 780 px de cada pantalla. **Ojo:** en las capturas los títulos salen con una tipografía de reserva; la real es Oswald.
- `personajes/`: las ilustraciones de los personajes, a **lápiz de cera**, en cuadrados con fondo blanco. Las cinco nuevas (`nuevo_*`: Vicepresidente, Economía, Comercio, Educación y Cultura) vienen de Flow, a unos 900 px, y son las definitivas; el resto son recortes provisionales de una hoja de baja resolución (Agricultura, Trabajo, Fuerzas Armadas, Interior y los dos embajadores) a la espera de sus ilustraciones nuevas. Se muestran fijos sobre un fondo con el tono pálido del color de su grupo (el papel blanco del dibujo se mezcla por multiplicación).

## Pantallas
1. **Inicio**: el título "A la orden mi comandante" con el emoji del saludo militar (🫡), un subtítulo en negrita ("Acabas de tomar el poder, tu objetivo es mantenerte en él el mayor tiempo posible.") sin ninguna referencia a un país, "Empezar partida" y "Archivo histórico" (contador X de 14).
2. **Nombre**: el jugador escribe una sola palabra (por ejemplo, Aureliano). El juego lo muestra como "Comandante Aureliano".
3. **Juego**, de arriba abajo: una línea pequeña con el nombre del año ("Año 1 - Año de la Gloriosa Revolución", solo un guiño) y el menú; las cuatro fuerzas, cada una con un **emoji** (🪖 Ejército, 👥 Pueblo, 🎩 Élite, 🌐 Potencias), una **barra horizontal debajo** que se llena o se vacía con animación y, **debajo de la barra, los puntos** que avisan de cuánto se verá afectada; **el mensaje del personaje, con sitio para hasta 5 líneas**; la carta, que es un cuadrado con la ilustración y el nombre del personaje centrado debajo, con un mazo detrás; y la barra inferior con "Comandante X", los años en el poder y cuatro ranuras de estado. Al tocar un símbolo de arriba o un estado de abajo se abre una ventana emergente que explica qué es.
4. **Sin pantallas intermedias**: al decidir aparece al instante la carta siguiente. Una vez por partida, la línea "X años en el poder" cambia unos segundos por un aviso discreto, "Archivo desbloqueado ›", que al tocarlo abre una ventana con la nota histórica.
5. **Final y paso de era**: el mensaje principal enorme, la causa, la fuerza que cayó con su barra en el límite, el resumen de años y de valores, y lo que queda pendiente. Si el jugador supera una era, la misma pantalla muestra "Sigues en el poder", el nombre de la era que acaba (por ejemplo "Fin de la era 1 · Ascenso") y el botón "Seguir gobernando", que lleva a la siguiente. El juego tiene ya dos eras: Ascenso y Consolidación.
6. **Archivo histórico** (39 referencias entre las dos eras): lista compacta de referencias; al tocar una se abre a pantalla completa.

## Reglas que NO se pueden romper
- **Solo se juega arrastrando la carta** a izquierda o derecha. No hay botones de decisión ni pantallas entre una carta y la siguiente.
- **Zona de decisión visible:** al arrastrar, la respuesta aparece translúcida; cuando el gesto ya basta para decidir al soltar, la carta se rodea de un borde naranja y la respuesta se vuelve opaca, sin ningún texto añadido. Un gesto rápido también decide.
- Las fuerzas **no llevan texto**: un emoji, una barra horizontal debajo y los puntos de pista bajo la barra. La barra es lisa y solo se pone roja (y el emoji late) cuando el valor está cerca del mínimo o del máximo, por debajo de 15 o por encima de 85.
- **Sin pictogramas:** los estados del régimen también se muestran con emojis (🤐 censura, 👁️ vigilancia, 🖼️ culto, 🤝 alineado, 🚫 embargo, 🧱 frontera, 🏭 nacionalizado, 💸 deuda).
- **En la pantalla final el mensaje principal es lo más grande:** "Has caído" (en rojo) o "Sigues en el poder". Debajo, la causa (por ejemplo, "Golpe de Estado"), un recuadro con el icono de la fuerza que llegó al límite y la última decisión del jugador, y después el texto y los datos.
- Al arrastrar, sobre los símbolos aparecen **puntos de tres tamaños** (pequeño, mediano, grande): indican qué barra se verá afectada y cuánto, pero **nunca si sube o baja**.
- Mientras se arrastra, la respuesta de esa opción aparece **sobre la carta**, en un plano translúcido para que se lea: una acción en negrita y un remate irónico más corto.
- La **ilustración de la carta es siempre un cuadrado 1:1** (se prepara a 900 × 900 px), con un color de fondo según el grupo del personaje: Ejército verde oliva, Pueblo ocre, Élite burdeos, Potencias azul, Palacio gris.
- Las **cuatro ranuras de estado** guardan consecuencias duraderas. Al entrar un quinto estado sale el más antiguo. Tocar una ranura abre su ventana emergente.
- El formato principal es **móvil vertical** (mínimo 360 × 640 px). De momento solo hay tema claro.
- **Los lados se mezclan al azar:** en cada carta, la opción que sale a la izquierda y la que sale a la derecha cambian de una partida a otra. El diseño no puede depender de que una opción esté siempre en el mismo lado.
- **Quién habla:** al dictador solo le hablan sus ministros (once portavoces: Vicepresidente, Economía, Comercio, Agricultura, Educación, Trabajo, Cultura, Fuerzas Armadas, Interior y los dos embajadores). El nombre del personaje aparece centrado bajo la ilustración y puede ser largo (hasta 39 caracteres).
- No cambiar textos de cartas, nombres de personajes ni nombres de las barras.

## Estética actual y dirección
- Ilustraciones: **lápiz de cera**, retratos de busto con el gesto serio y fondos de color pálido por grupo.
- **Interfaz: Material Design (M3) en tonos de blanco.** Superficies blancas y blanco cálido, elevaciones suaves en lugar de bordes, esquinas redondeadas (12 a 28 px), botones rellenos, tonales y de contorno, listas con icono, ventanas emergentes con sombra. Acentos naranja y azul y rojo de error solo en los límites y en la pantalla de caída. De momento solo tema claro.
- **Sin verde.** Paleta de Claude: marfil `#FAF9F5`, blanco `#FFFFFF`, grises cálidos `#F0EEE6` y `#E8E6DC`, pizarra `#141413` (botón principal y texto), naranja `#D97757` (atención: borde de decisión, puntos de pista, avisos), azul `#6A9BCC` (barras) y rojo de error `#B3261E` solo en los límites y en la pantalla de caída. Colores de grupo de las ilustraciones (el fondo de cada carta toma el tono pálido del grupo del personaje): **Élite** rosa higo `#C46686` (el gabinete civil: Vicepresidente, Economía, Comercio, Agricultura, Educación, Cultura y Trabajo), **Ejército** gris grafito `#77756E` (Ministros del Interior y de las Fuerzas Armadas), **Potencias** azul `#6A9BCC` (los dos embajadores). El naranja del Pueblo no se usa en ninguna carta: la gente corriente nunca habla con el dictador, solo la mencionan los ministros.
- Tipografía: **Space Grotesk** para todo el juego (pesos 400, 500 y 700).

## Qué queremos mejorar
- **Jerarquía y aire en la pantalla de juego.** El mensaje, la carta y la barra inferior compiten por el espacio vertical del móvil.
- **Barra inferior y ranuras de estado** claras sin necesidad de leyenda escrita.
- **Pantallas de inicio y final** con más personalidad (cartel político, documento oficial).
- **El archivo histórico como un expediente o documento oficial,** con sello, y no como una lista sencilla.
- Que todo se lea bien con una mano en móvil.

## Prompt sugerido para pegar en Claude Design
Adjunta esta carpeta (HTML + capturas + personajes) y escribe:

> Este es el prototipo de un juego de cartas para móvil ("A la orden mi comandante"). Quiero rediseñar la interfaz manteniendo exactamente la mecánica: se juega solo arrastrando la carta a izquierda o derecha, hay cuatro barras con puntos de pista al arrastrar, una ilustración cuadrada 1:1 en la carta y cuatro ranuras de estado abajo. Lee el BRIEF.md para las reglas que no se pueden romper. La estética debe sentirse como recortes de papel y carteles políticos retro del siglo XX, sobria y con humor seco. Empieza por la pantalla de juego: dame 3 variantes, pensadas para móvil vertical, con mejor jerarquía y más aire. Después seguimos con inicio, final y archivo histórico.
