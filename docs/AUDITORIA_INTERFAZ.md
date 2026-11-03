# Auditoría de la interfaz: partida y menú (3 nov)

Encargo de Jorge: el juego se siente «demasiado app, poco juego» pese al arte. Se revisó la partida y el menú, no la portada. Capturas a 390×844 y 360×740 de 16 estados: carta, arrastre, ficha, fuerza, secuela, aviso, banda, las cuatro secciones del menú, recompensa, caída y paso de era. **No se ha cambiado nada.**

## Diagnóstico en una frase
El arte es de cartel y el resto es de formulario. Todo el texto va en la misma palo seco condensada, en mayúsculas y centrado. Los huecos vacíos son cuadros grises. Lo que pasa en la partida se anuncia con banners que cruzan la pantalla. Los controles (»», «SONIDO: SÍ», «ABANDONAR PARTIDA») son los de cualquier app. Las cartas son lo único que parece un objeto.

## Qué suena a app (por orden de peso)
1. **Nadie habla.** La pregunta es un rótulo en mayúsculas, sin comillas ni voz, y quien la dice es un pie gris diminuto («MINISTRO DE DEFENSA»). Se lee como un enunciado de examen, no como alguien que te pide algo.
2. **Las decisiones no se notan.** Las barras son finas, como las de progreso de una app, y la consecuencia apenas se ve al soltar la carta: el momento más importante del juego es el más plano.
3. **Las casillas vacías son cuadros grises**, como campos de formulario sin rellenar, siempre a la vista desde la primera carta.
4. **El mazo no parece un mazo.** Las cuatro cartas de debajo se ven como una franja de rayas bajo la carta, más adorno que montón. Además no informa de nada.
5. **Avisos por banner.** Censura, recompensa y «¡Has caído!» entran como un *toast* a todo el ancho: es el lenguaje de las notificaciones.
6. **La nota de inteligencia es un cuadro de diálogo:** una carta blanca con texto, y además la caja de la pregunta se queda vacía encima.
7. **El menú es una pantalla de ajustes.** «SONIDO: SÍ» y «ABANDONAR PARTIDA» son barras negras con texto; el título de la sección es un rótulo pequeño; la flecha »» es el control de un carrusel.
8. **Mucho aire muerto** entre la pregunta y la carta, y debajo del pie; en el paso de era, más de media pantalla vacía.
9. **El tiempo no existe en la partida.** Gobiernas 47 años y no se ve pasar ni uno hasta el paso de era.

Lo que ya funciona como juego: la carta que se inclina con la cuña de la respuesta; la caída en negro con la barra roja, que es lo más dramático que tiene el juego; las cartas de fuerza que vuelan del icono; el título rojo de la era, la única vez que la letra tiene carácter; y el álbum de cromos con el sobre.

## Propuestas (de más rendimiento a menos)
Cada una dice qué cuesta y si choca con una decisión vigente.

### A. Que la pregunta sea una voz — *barato; toca la tipografía*
- Poner la pregunta entre comillas «», y probarla en minúsculas normales. Las mayúsculas se quedan para la interfaz (leyenda, botones).
- Poner quién habla **encima o pegado a la carta**, como un sello o una tarjeta de visita («MINISTRO DE DEFENSA»), no perdido en el pie.
- *Choca con* la regla de 2 nov, «todo en mayúsculas, tres estilos». No cambia el número de estilos, solo el uso de mayúsculas en uno.

### B. Que cada decisión pegue — *medio; motor y CSS*
- Al soltar la carta, cada barra que cambia **enseña el trozo ganado o perdido** (un destello del tramo de 0,6 s) y su icono da un respingo, más fuerte cuanto más se mueve.
- Barras más gruesas (el doble), pintadas como un termómetro serigrafiado y no como una línea de progreso.
- Ya existen los puntos de pista y el sonido: esto cierra el gesto con una consecuencia que se ve.

### C. El mazo como reloj de la era — *medio*
- Que el montón tenga **tantas cartas como le quedan a la era** y adelgace a cada decisión, con las cartas un poco giradas y desordenadas, como sobre una mesa.
- Así el progreso se vería sin números, que es lo que haría un juego de mesa. La carta jugada podría caer en un montón de descarte en vez de desaparecer.

### D. El tiempo en pantalla — *barato*
- Un año que va pasando (**«1961»**), como un sello de fechador o una hoja de calendario, en el hueco de aire entre la pregunta y la carta.
- *Ojo:* el 28 oct Jorge quitó el nombre y los años del pie para ponerlos «en otra zona». Esto sería esa zona; decide él.

### E. Huecos y avisos como objetos — *medio; arte*
- **Casillas vacías:** un contorno discontinuo o la silueta del sello, o que no salgan hasta la primera secuela.
- **Banners → sellos:** la palabra entra como un tampón entintado y torcido **sobre la carta**, no como una banda a todo el ancho. *Ojo:* Jorge dijo que el estilo definitivo de la banda lo da él.
- **Nota de inteligencia:** papel mecanografiado con el sello «CONFIDENCIAL», un poco torcido; y su texto en la caja de la pregunta, para que no quede vacía.

### F. Menú como objeto, no como ajustes — *medio*
- **Abandonar:** una carta («El exilio») que se desliza para confirmar, con el mismo gesto que todo el juego, en vez de un botón negro.
- **Sonido:** una carta o un icono que se gira (radio encendida o apagada), no una barra de texto.
- **Logros vacíos:** enseñar cuántos hay («3 / 12») y que las casillas del álbum se cuenten, para dar ganas de llenarlo.
- **La flecha »»:** podría ser la pestaña de una carpeta o expediente que asoma por el borde.

### G. Aire muerto — *barato; retícula*
- Con la retícula fija de 2 nov sobra aire entre la pregunta y la carta, y en el paso de era. Ese hueco es el sitio natural para D (el año) o para el sello de quién habla (A). No hace falta tocar la retícula.

## Pegas sueltas vistas al revisar
- **Respuesta poco legible sobre imágenes con mucho detalle:** con la cuña al 35 %, las gafas del cartel de Domingo quedan detrás de «JUICIO MILITAR SIN CÁMARAS». Cabría subir la cuña o dar un contorno al texto.
- **El reverso del mazo** (la barba con el puro), visto de canto al inclinar la carta, parece un garabato negro.
- **El paso de era decía «Has gobernado 0 años»** en la captura. Probablemente era por el estado forzado del guion de capturas, pero conviene comprobarlo en una partida real.

## Recomendación
Empezar por **A + B**: la voz y el golpe de la decisión, que es lo que más se juega. Seguir con **C + D**: el mazo que adelgaza y el año, porque dan progreso sin números. E y F pueden esperar al arte.
