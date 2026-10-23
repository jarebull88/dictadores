# Guía de arte estilo Muñoz Bachs — «¡Comandante, ordene!»

**Documento vivo** (23 oct). Lo escribió Jorge con lo aprendido al generar los iconos y lo mantiene la conversación de arte. Cada mejora, error o regla nueva que diga Jorge se apunta aquí: en «Lecciones aprendidas» o en el prompt que toque, con la fecha. Así cualquier sesión futura parte de lo último que se sabe.

---

## 0. El juego, en breve (para quien llegue nuevo)
- **Qué es:** «¡Comandante, ordene!», un juego de cartas satírico tipo Reigns, en un único HTML para móvil. Eres el dictador de un país del Caribe sin nombre, inspirado en la Revolución cubana (1959–2006), en cuatro eras: La Revolución, La Purga, El Culto y La Supervivencia.
- **Cómo se juega:** decides deslizando cada carta a izquierda o derecha. Cada decisión mueve cuatro fuerzas: Pueblo, Ejército, Partido y Potencias. Si una llega a 0 o a 100, caes.
- **Tono:** humor negro seco. Los personajes hablan en serio y con servilismo, y el chiste lo pone la ironía del dictador.
- **Contexto completo:** `CLAUDE.md`, en la raíz del repositorio.
- **Reglas que afectan al arte:**
  - Ningún país real: sin banderas, escudos ni insignias reales. Hay una excepción: las tres estrellas de personajes que Jorge ya aprobó.
  - Los ministros son «víboras vividoras» (lujo y glotonería) desde la era 2.
  - La maldad nunca se expresa con rasgos étnicos.
- **Dirección de arte desde el 23 oct:**
  - Cartel cubano serigrafiado del ICAIC, al estilo de Eduardo Muñoz Bachs.
  - Interfaz plana, sin sombras, relieves ni esquinas redondeadas.
  - Cartas cuadradas (1:1).
  - Tipografías: Londrina Solid (siempre en mayúsculas) y Baloo 2.
  - Paleta: `docs/PALETA.md`, la misma de abajo.

## 0.1 Dónde va cada imagen en el juego
- **Iconos de fuerzas y estados:**
  - El original se guarda en `assets/iconos/originales/cartel-<id>.jpg`, cuadrado y con su fondo.
  - En el juego va reducido a `assets/iconos/recortados/<id>-cartel.webp` (144 px).
  - `icono()`, en `src/motor.js`, prefiere el cartel al dibujo antiguo.
  - Los id son: `pueblo`, `ejercito`, `elite` (el Partido), `potencias`, `luna`, `censura`, `vigilancia`, `culto`, `alineado`, `embargo`, `frontera` (se llama Jaula en el juego), `nacionalizado` y `deuda`.
- **Reparto:** `docs/PERSONAJES.md` (23 oct) tiene la historia de cada personaje y una idea visual por etapa (eras 1–4), pensada para este estilo. Es la base para los prompts de personajes.
- **Personajes:** por ahora siguen siendo el arte antiguo, de papel recortado y 3:4. Los nuevos serán 1:1. Antes de cambiarlos, lee `docs/PIPELINE_PERSONAJES.md` y decide con Jorge cómo encajan los ojos animados: hoy son círculos SVG encima de la imagen.
- **Escenas** de estados y de caídas: también son arte antiguo, pendiente de rehacer en este estilo.

---

## 1. Contexto de los prompts

Es una serie de iconos cuadrados con el estilo de los carteles serigrafiados de Eduardo Muñoz Bachs para el ICAIC (años 60–80). Cada icono es un mini cartel: un solo objeto grande sobre un fondo plano de color.

Los prompts tienen dos partes que se pegan seguidas:
- **A · Estilo:** fijo, igual para todos los iconos.
- **B · Tema:** variable, describe el objeto de cada icono.

La tarea de la conversación de arte es:
- escribir los bloques B de iconos nuevos;
- corregir los resultados que enseñe Jorge;
- darle prompts de edición.

Responde en español; los prompts van en inglés.

**Cómo pide Jorge cada icono** (23 oct): primero, solo las propuestas (3 ideas con una recomendación), sin prompt. Cuando elija una, el **prompt completo listo para pegar: A (versión vigente) + tema** en un solo bloque.

---

## 2. Paleta (la única permitida)

| Nombre | Hex | Uso |
|---|---|---|
| Rojo | #B0362A | fondo del Pueblo, estrella del Partido, alertas |
| Mostaza | #D8A02A | fondo del tanque y del candado, la luna |
| Oliva | #86762C | tanque, uniformes, vegetación, fondos |
| Azul | #1D51A0 | fondo de la luna y del globo; color de «las potencias» |
| Rosa | #DF8178 | el cerdito de la Deuda externa, acentos tiernos |
| Crema | #F0E9D6 | sustituye al blanco: manos, caras, papel |
| Tinta | #201D14 | detalles negros |

Cada icono usa su color de fondo y 2 o 3 tintas más.

**Fondos asignados:**
- Pueblo: rojo
- Ejército: mostaza
- Partido: oliva
- Potencias: azul
- Luna de miel: azul
- Culto: rojo
- Embargo: mostaza
- Jaula: oliva
- Censura: mostaza (23 oct; antes crema, pero el bocadillo es crema)
- Vigilancia: azul
- Alineado: rojo
- Nacionalizaciones: oliva
- Deuda externa: oliva (no mostaza, porque el rosa no contrasta con mostaza)

---

## 3. Lecciones aprendidas (no repetir estos errores)

**Línea y negro**
- Nunca escribir «brush», «pen» ni «marker»: el modelo dibuja un trazo seco, rascado o con vetas. En serigrafía el negro es una plantilla más: formas planas recortadas, de borde nítido y tinta uniforme.
- Describir los detalles negros como formas («solid dots», «solid wedges», «a thin solid band»), nunca como trazos («lines», «dash marks»).
- Sin contornos: cada forma se define solo por su silueta contra el fondo.

**Bordes y marcos**
- No mencionar «border», «frame» ni «margin», ni siquiera para prohibirlos: nombrarlo lo provoca. Hay que decirlo en positivo: «the background color runs off all four edges, like a cropped detail of a larger print».
- Para reforzarlo, empezar el bloque B con «Full-bleed … background, edge to edge» (23 oct: a Potencias le salió un marco crema).
- Si aun así aparece un marco de papel, es más fiable recortarlo en Photoshop que pelearlo con prompts.
- **Colores que la edición no consigue quitar** (23 oct, Rigoberto: el beige de la cara de atrás de la cuenta siguió tras editar): los corrige Claude con PIL. Clasifica cada píxel por la tinta más cercana y desplaza el tono intruso hasta la tinta buena, sin perder el grano. Más fiable que insistir con el generador.

**Color**
- No pedir desajuste de registro en los iconos: el modelo lo convierte en un halo blanco o en una segunda capa de color más oscura, como una sombra. Pedir en su lugar «each shape is exactly one ink, perfectly aligned, never stacked or overlapping».
- Comprobar el contraste: dos colores de luminosidad parecida (rosa sobre mostaza) se funden a tamaño de icono.
- Para cambiar los colores de un icono que ya está bien, mejor editar que regenerar (sección 6). Para clavar los hex exactos, Photoshop → Reemplazar color.

**Composición y concepto**
- Minimalismo: un objeto y, como mucho, tres detalles. Si el prompt enumera muchas piezas (mitades, fragmentos, monedas…), sale recargado.
- El objeto debe pesar visualmente lo mismo en toda la serie: unos 85 % del cuadrado. Las formas con puntas, como la estrella, tienen que ir más grandes, casi tocando los bordes.
- Las caras: dos puntos sólidos de ojos y una pequeña forma sólida, nada más.
- La ironía de Bachs funciona mejor con una idea visual: la estrella «sacando bíceps», la manga azul de las potencias metida en el títere.
- El líder es un guerrillero naíf: gorra kepi oliva de copa plana, cara crema con ojos de punto, barba negra enorme, uniforme oliva y, a veces, puro. Si solo se pide «bigote», sale el señor del Monopoly.
- Los objetos-símbolo (bocadillo, sol…) se describen en su forma clásica y limpia («classic», «instantly recognizable»). Si se pide que estén rotos o cortados, el corte tiene que ser recto y sin trozos sueltos: con «jagged edges» se deforman y dejan de reconocerse (23 oct, Censura). Y hay que decir que las piezas «fit together like a puzzle»: si no, el modelo dibuja dos bocadillos enteros, cada uno con sus puntos.
- «Globe» o «world» saca un mapamundi bien dibujado, con costas e islas. Hay que pedir «a simple round ball with three clumsy blobs, abstract and childlike, not a map» (23 oct, Potencias). Y si hay dos objetos, dar proporciones («only about half the width», «each hand as big as the ball»): si no, el principal se come al otro.
- Una curva hacia abajo en un objeto («like a wide smile») se lee como una boca y le da vida (23 oct, estrella gorda). Para marcar volumen, mejor una curva corta del color del fondo que se arquea hacia arriba en el centro, sin tocar los bordes («floating, without touching any edge», «about a third of the width»): si no, la cruza entera y la parte en dos. Y pedir «no shading», porque el modelo tiende a sombrear los bultos.
- En personajes, el modelo dibuja a línea los detalles pequeños (nudillos, puntadas, pliegues) aunque el resto sea plano (23 oct, Comandante joven). Hay que pedir que sean formas sólidas o rendijas del fondo.
- Con mucho detalle, el resultado tiende a la ilustración plana moderna (limpia, bonita, simétrica). Para acercarlo a Bachs: más deformación, formas más torpes y un grano de serigrafía más marcado.
- Para dar volumen, el modelo inventa tonos intermedios de un color (23 oct: una banda de la gorra en un oliva más oscuro, `#6D612B`). Hay que pedir que cada pieza sea «one single flat <color> shape, no band, no lines». Y los nudillos dibujados vuelven aunque se pidan sólidos: solo cambian de color.
- Las cintas de papel que se enrollan (la cuenta de Rigoberto) salen con la cara de atrás en un beige más oscuro, y los pliegues de la ropa, en un oliva más oscuro (23 oct). Hay que pedir «the back side of every curl is the same flat cream, separated only by a thin gap of background» y los pliegues como rendijas del fondo.
- **El cartel de referencia se ignora si el bloque B describe otra escena** (23 oct, Hortensia con *En las tinieblas*: del cartel solo se quedó el fondo negro). Jorge: hay que respetar el cartel en concepto y en técnica. Cada bloque B tiene que decir **qué se toma del cartel**: la composición (una cabeza enorme sola), la técnica (rayado de grabado frente a tintas planas), el truco visual (los ojos cambiados por formas de color, el objeto intruso clavado) y el tono.
- «Brush» o «brushy» en personajes saca pincel seco, con vetas de cerdas, que parece acuarela y no serigrafía (23 oct, Sarria). En serigrafía, una forma hecha a pincel se imprime: borde irregular pero tinta maciza y uniforme por dentro. Se pide así en el A-P v8.
- **El generador convierte a cualquier guerrillero en el Comandante** (barba, kepi, cara de señor mayor) y les da a todos la misma piel y el mismo pelo (23 oct, Rigoberto v4). En cada personaje hay que decir la edad, «clean-shaven, NO beard» si no la tiene, y una piel y un pelo propios (ver «Pieles y pelo del reparto»).
- Un sol con rayos triangulares pegados al disco parece una explosión (23 oct, Culto): hay que pedir un disco claramente redondo y rayos rectos sueltos, «separate short thick bars», cada uno separado del disco por un hueco de fondo.
- Los objetos que todo el mundo conoce en blanco van en crema (23 oct, Jorge: el bocadillo de diálogo de Censura salió azul y no se reconocía). Entonces el fondo no puede ser crema.
- Cuidado con lo que significa cada color: una manga oliva convierte al pueblo en militar. El oliva es del ejército y del líder; el pueblo lleva el azul de obrero.

**Generadores**
- **ChatGPT (imagen)** es el que mejor entiende el estilo y la textura.
- **Gemini (Nano Banana)** tiende a volver a su propia estética: necesita una referencia adjunta y edición por pasos.
- **Bing Image Creator** usa modelos de OpenAI y es gratis, pero solo admite 2.000 caracteres y no acepta referencias.
- Con ChatGPT no hace falta referencia (23 oct: los iconos de Vigilancia, Censura y Culto salieron sin adjuntar nada; prompt A v9). Con Gemini, adjuntar como referencia de estilo la estrella del Partido. Para personajes que se repiten, adjuntar también el icono donde ya aparecen.
- Iterar con edición en el mismo hilo («Keep this image exactly the same… change only…») en lugar de regenerar. Pero solo para cambios pequeños (color, tamaño, un detalle): si cambia la composición, el modelo arrastra lo anterior y tras 2 o 3 ediciones se lía (23 oct, Censura: tres bocadillos en vez de uno partido). Entonces, regenerar de cero en un hilo nuevo.

---

## 4. Prompt A · Estilo de icono (v9)

**v9 (23 oct):** sin imagen de referencia. Jorge genera sin adjuntar nada y los resultados salen bien, así que se quita la frase «Match the style, print texture and visual weight of the attached reference image, but not its subject or colors». Si algún día se adjunta referencia, se vuelve a añadir tras la primera frase.

```
Square 1:1 icon in the style of a 1970s Cuban silkscreen poster by Eduardo Muñoz Bachs (ICAIC). The flat background color runs off all four edges of the image, like a cropped detail of a larger print. One single object, centered, large and dominant, filling about 85% of the square. Hand-cut stencil look: a few big flat shapes of opaque ink with crisp, slightly irregular edges, playful, naive and boldly distorted, never geometrically perfect. Every shape is defined only by its silhouette against the background, and each shape is exactly one ink: each color sits directly next to the other, perfectly aligned, never stacked or overlapping. Black details are printed as their own stencil layer of near-black ink: small flat shapes with crisp, clean edges and uniform solid black inside, cut like the other shapes, never drawn with a brush, pen or marker. Any face is just two solid dot eyes and one small solid shape. A bold, simple silhouette readable at very small size. Real screen-print texture: fine directionless mottle, slightly fuzzy edges, paper fibers visible. Palette: brick red #B0362A, mustard #D8A02A, olive green #86762C, cobalt blue #1D51A0, soft pink #DF8178, cream paper #F0E9D6, near-black ink #201D14. Keep it minimal: one object, at most three small details, empty background around it. Perfectly flat colors. Not vector, not a logo.
```

**Cómo se escribe un bloque B nuevo:**
1. El color de fondo, con su hex.
2. El objeto como silueta plana, con tamaños relativos.
3. Como mucho tres detalles, descritos como formas sólidas.

---

## 5. Prompts B por icono

**El Pueblo** (23 oct, elegido: el puño en alto. Abajo queda la mano que vota, como alternativa)
```
Brick red #B0362A background. A big raised fist, seen from the front, filling most of the square: one chunky, blocky cream #F0E9D6 silhouette with four curled fingers as thick squarish blocks stacked side by side, separated only by thin gaps of red background, and a short square thumb folded across them. Below it, the wrist and the rolled-up sleeve of a cobalt-blue #1D51A0 work shirt as one plain flat shape, cropped by the bottom edge. No black details on the hand. Nothing else.
```

**El Pueblo, alternativa: la mano que vota** (adjuntar también el cartel *Realengo 18* sin texto)
```
Brick red #B0362A background. A big raised open hand, as if voting, like the hand in the second attached image: one chunky, blocky cream silhouette, palm facing the viewer, fingers slightly spread and separated only by small gaps of red background, each finger a thick squarish block with a flat, straight-cut tip, and a short square thumb sticking out to one side. No black details on the hand. Below it, a short piece of wrist cropped by the bottom edge, with the rolled-up sleeve of a cobalt-blue work shirt as one plain flat shape.

Image 2: take only the blocky, cut-paper shape of the hand. Ignore its colors, its text and its composition.
```

**El Ejército**
```
Mustard #D8A02A background. A chubby toy-like tank seen from the side, filling most of the square: one olive-green #86762C body shape with a round turret, a short solid near-black cannon pointing up, and round solid near-black wheels with a cream #F0E9D6 dot in the middle. Nothing else.
```

**El Partido**
```
Olive green #86762C background. A big hand-cut five-pointed star in brick red, clearly imperfect: points of different lengths, soft wobbly edges, slightly tilted, like a star cut out by hand from paper, its points almost touching the edges. One point goes out to the right and bends upward at an elbow, like an arm flexing its biceps, with a small rounded bulge on top. Next to it, three small solid near-black wedges like a little sparkle.
```

**El Partido, alternativa: la estrella gorda** (23 oct: el Partido como cerdo de la granja; v2, Jorge: sin ojos ni puro, solo la gordura y una curva que marca la barriga; v3: la curva hacia arriba, como el borde de una bola, y del color del fondo, como un corte; sin sombreado; v4: la curva, corta y en el centro, sin cortar la estrella, y un ombligo de punto debajo)
```
Olive green #86762C background. A big, fat, well-fed five-pointed star in brick red #B0362A, filling most of the square: short, stubby, rounded points and a plump round belly bulging out at the bottom, like a star that eats too much. No face, no shading: the whole star is one single flat red. Only two small details, both in the olive-green background color: in the center of the lower part, a short thin curve arching upward (a small upside-down U), about a third of the star's width, floating inside the red without touching any edge, suggesting the top of a big round belly; and just below its middle, one small round dot as a belly button. Nothing else.
```

**Las Potencias** (23 oct, elegido: el globo agarrado; dos potencias se pelean por el mundo como por una pelota. Las manos van en rojo y mostaza, como guantes, para que no se fundan con el globo crema; sin meridianos, para no recargar. v2: el globo, más pequeño y abstracto, y las manos, tan grandes como él. Abajo queda el globo solo, como alternativa)
```
Full-bleed cobalt blue #1D51A0 background, edge to edge. In the center, a simple round cream #F0E9D6 ball, only about half the width of the square, with three clumsy olive-green #86762C blobs on it, abstract and childlike, not a map, so it reads as a toy globe. Two huge, chunky hands grab it from the left and right, like two kids fighting over a ball, each hand as big as the ball itself: the left hand and its thick sleeve are one flat brick-red #B0362A shape, the right hand and its thick sleeve one flat mustard #D8A02A shape, each sleeve running off its side edge, fingers as thick blocky shapes squeezing the ball. Nothing else.
```

**Las Potencias, alternativa: el globo solo**
```
Cobalt blue #1D51A0 background. A big round globe of cream paper, slightly squashed and imperfect, with four or five big clumsy olive-green blobs as continents, only vaguely suggesting the Americas, Europe-Africa and Asia, with no islands or coastline detail. Two curved meridians and one equator as thin solid near-black bands.
```

**Luna de miel** (23 oct: la luna novia; el país se casa con la Revolución)
```
Cobalt blue #1D51A0 background. A big, chubby crescent moon in mustard #D8A02A, slightly lopsided, filling most of the square, with one sleepy closed eye as a small solid near-black curved shape and a tiny solid smile. On top of the moon sits a cream #F0E9D6 bridal veil: one flowing flat shape that falls behind the crescent down to the bottom, held by one small brick-red #B0362A flower at the top. Nothing else.
```

**Culto** (23 oct, elegido: el líder como sol; v2: con rayos triangulares salía una explosión, así que ahora es un disco redondo con rayos sueltos. Los dos de abajo, el cuadro y la estatua, quedan como alternativas)
```
Brick red #B0362A background. A huge round mustard #D8A02A sun disc, clearly circular, filling most of the square, surrounded by a ring of twelve separate short, thick straight mustard rays like little bars, each one detached from the disc by a small gap of red background. In the middle of the sun, the round cream #F0E9D6 face of a naive guerrilla leader: a flat-topped olive-green #86762C kepi cap, two solid near-black dot eyes and one enormous solid near-black beard covering the lower half of the face. Nothing else.
```

**Culto 1** (cuadro)
```
Brick red #B0362A background. A big portrait in a chunky mustard frame, slightly crooked. Inside, on cream, a naive guerrilla leader seen from the chest up: a flat-topped olive-green kepi cap, two solid dot eyes and one enormous solid black beard. At the bottom of the frame, three simple round flowers in cream and cobalt blue.
```

**Culto 2** (estatua)
```
Brick red #B0362A background. A tall, proud statue of a naive guerrilla leader: a flat-topped olive-green kepi cap, a small cream face with two solid dot eyes, one enormous solid black beard covering the lower face and chest, a small flat mustard cigar sticking out of the beard, and a stocky olive-green body in fatigues with one arm raised high. He stands on a simple mustard block pedestal. No suit, no tie.
```

**Embargo** (23 oct: el candado, ahora en el azul de las potencias: el color dice quién cierra. El ojo de la cerradura, en crema, porque el negro no se ve sobre el azul)
```
Mustard #D8A02A background. A big, chubby padlock, slightly lopsided, filling most of the square: one rounded cobalt-blue #1D51A0 body shape with a cream #F0E9D6 keyhole cut into it, and a thick solid near-black shackle on top, closed.
```

**Alineado** (23 oct, elegido: el títere de guante; la marioneta de abajo queda como alternativa)
```
Brick red #B0362A background. A hand puppet of a naive guerrilla leader, centered: a flat-topped olive-green kepi cap, a round cream face with two solid black dot eyes, one big solid black beard covering the lower half of the face, and a floppy olive-green cloth body shaped like a sack, with two tiny limp arms. From the bottom edge, a big cobalt-blue sleeve and wrist enter the puppet from below, clearly working it from inside.
```

**Alineado 2** (marioneta de hilos, el mismo personaje)
```
Brick red #B0362A background. A small, limp marionette of the same naive guerrilla leader hanging in the middle: flat-topped olive-green kepi cap, round cream face with two solid dot eyes, big solid black beard, small olive-green body, floppy stick-like arms and legs. Thin solid near-black strings run from its head and hands up to a mustard cross-shaped control bar held at the top by a big cobalt-blue hand coming in from the top edge.
```

**Nacionalizaciones** (23 oct, idea de Jorge: una fábrica a la que le ponen la estrella roja del Partido. La fábrica, grande y crema; la estrella, más pequeña, para no confundirla con el icono del Partido, que también es una estrella roja sobre oliva)
```
Olive green #86762C background. A chubby, slightly crooked factory filling most of the square: one big cream #F0E9D6 building shape with a sawtooth roof, two tall solid near-black chimneys of different heights leaning a little, and a row of small solid near-black rectangular windows. Slapped onto the middle of its facade, slightly crooked like a freshly stuck label, a big hand-cut brick-red #B0362A five-pointed star with uneven points and soft wobbly edges, like a star cut out by hand from paper. Nothing else.
```

**Deuda externa**
```
Olive green #86762C background. A chubby soft-pink #DF8178 piggy bank seen from the side, broken in two halves that open like a V: the front half tilts about 15° to the left and the back half about 15° to the right, hinged at the bottom, with an empty gap of background between their jagged zigzag edges. Both halves are one single flat pink. Only two solid near-black details: one dot eye on the front half and a coin slot on the back half.
```

**Vigilancia** (23 oct: el ojo con la gorra del líder; el que vigila es el régimen)
```
Cobalt blue #1D51A0 background. One huge almond-shaped eye, wide open and slightly lopsided, filling most of the square: a cream #F0E9D6 eye shape with pointed corners, a big round mustard iris looking sideways to the left, and a solid near-black round pupil inside it. Sitting on top of the eye, tilted like a hat, a small flat-topped olive-green kepi cap, as if the eye were wearing it. Nothing else.
```

**23 oct, Jorge: todos los iconos se rehacen desde cero en la conversación de arte**, uno a uno; los carteles instalados siguen en el juego hasta que llegue su sustituto.

**Censura** (23 oct: tijeras que cortan un bocadillo; v2: el bocadillo, en crema, y el fondo pasa de crema a mostaza para que se vea; v3: un óvalo limpio con su cola, cortado en recto y con «…» dentro, porque deformado y con trozos sueltos no se reconocía; v4, Jorge: un solo bocadillo partido como un puzle, dos puntos en la pieza grande y uno en la suelta, que se aleja girada)
```
Mustard #D8A02A background. One classic cream #F0E9D6 speech bubble, a smooth, plump oval with a clear pointed tail at the bottom left, with three big solid near-black dots in a row inside it, like "...". The bubble has been cut into two pieces along one straight cut that passes between the second and third dot: the bigger left piece, with the tail and two dots, stays in place; the smaller right piece, with the third dot, has come loose and drifts away to the right, tilted about 25°, with a clear gap of background between them. The two pieces still fit together like a puzzle if pushed back. Coming in from the left, a big pair of brick-red #B0362A scissors, blades open, right at the cut, each blade one continuous solid shape, with one solid near-black round screw dot where the blades cross. Nothing else.
```

**Jaula** (`frontera`; 23 oct: la isla enjaulada, la jaula es el país entero. La palmera, en negro, porque en oliva se perdería en el fondo)
```
Olive green #86762C background. A big dome-shaped birdcage in mustard #D8A02A, slightly crooked, filling most of the square: a round ring on top, six thick vertical bars as separate solid bands with wide gaps of background between them, and a solid mustard base. Inside the cage, sitting on its base, a small round patch of cobalt-blue #1D51A0 sea with a little cream #F0E9D6 island on it, and one small solid near-black palm tree silhouette growing from the island. Nothing else.
```

Jaula y «Frontera cerrada» son el mismo estado: el id interno es `frontera` y en el juego se llama Jaula. Ya tiene cartel, el muro con alambre de espino, aunque su fondo está asignado al oliva.

---

## 6. Prompts de edición útiles

**Recolorear a la paleta** (adjuntar la imagen de la paleta)
```
Keep this image exactly the same: same shapes, same composition, same print texture. Only recolor it to match the attached palette exactly, replacing each color with its closest match:
- any red → #B0362A
- any yellow or mustard → #D8A02A
- any green or olive → #86762C
- any blue → #1D51A0
- any pink → #DF8178
- any white, cream or paper → #F0E9D6
- any black → #201D14
Use only these seven colors, each as one flat ink, with the same subtle paper texture.
```

**Quitar el marco de papel**
```
Keep this image exactly the same. Extend the background color so it runs off all four edges of the image, as if this were a cropped detail of a larger print.
```

**Quitar capas de color superpuestas o halos**
```
Keep this image exactly the same. Remove the darker offset edges and paper-white halos around every shape: each shape is one single flat color, sitting directly on the background with clean edges.
```

**Negro rascado → plantilla sólida**
```
Keep this image exactly the same. Redraw every black detail as a solid flat shape of near-black ink with crisp, clean edges, printed as one flat stencil layer. Uniform black inside, no streaks, no scratchy texture, no stroke marks.
```

**Igualar el tamaño** (adjuntar un icono con el peso correcto, por ejemplo el globo)
```
Keep this image exactly the same. Only scale the object up so it matches the visual weight of the object in the attached reference image, filling about 85% of the square, still centered.
```

---

## 7. Personajes (desde el 23 oct)

**Diferencias con los iconos** (Jorge, 23 oct):
- Más complejidad, en técnica y en concepto: no son un objeto solo, sino un cartel de verdad.
- **Cada personaje se inspira en un cartel de Bachs**, que se adjunta como referencia. No es para copiarlo: se toma su concepto, su manera de contar una idea y su composición. Los colores siempre son los de nuestra paleta.
- Base de contenido: `docs/PERSONAJES.md` (historia e idea visual de cada etapa).
- Los ojos animados del juego van encima: los ojos tienen que ser **dos puntos limpios y fáciles de localizar**.
- Formato: cuadrado 1:1. Los carteles son verticales, así que de ellos se toma la idea y no el encuadre.

**Carteles de referencia** (`assets/referencias/bachs/`, subidos por Jorge el 23 oct; se citan por su número). Para añadir uno, se pone con el número siguiente y el título del cartel en minúsculas, con guiones:
1. `01-pajaros-tirandole-a-la-escopeta.jpg`: *Los pájaros tirándole a la escopeta*. Una escopeta-personaje negra con prismáticos y dos pájaros enamorados.
2. `02-el-bohio.jpg`: *El bohío*. Una casa de paja sobre una bandera. Ojo: tiene una bandera real, que en el juego no puede salir.
3. `03-el-llamado-de-la-selva.jpg`: *El llamado de la selva*. Una nube blanca enorme con una boca de fiera.
4. `04-vampiros-en-la-habana.jpg`: *Vampiros en La Habana*. Un busto frontal con guayabera amarilla, ojos cerrados y puro.
5. `05-por-primera-vez.jpg`: *Por primera vez*. Un hombre pequeño que asoma sobre un campo de flores de colores.
6. `06-alfredo-alfredo.jpg`: *Alfredo Alfredo*. Una cara enorme con la boca abierta, y dentro, un hombrecillo.
7. `07-gran-robo-del-tren.jpg`: *El gran robo del tren de San Trinian*. Un ladrón enmascarado sobre un tren-edificio.
8. `08-zorro.jpg`: *Zorro*. Una cara solo con el antifaz negro, la nariz y el bigote.
9. `09-cine-movil.jpg`: *Cine Móvil ICAIC*. Un personaje-pantalla con ruedas, gorro negro enorme y bigote.
10. `10-un-hombre-de-exito.jpg`: *Un hombre de éxito*. Un hombre trajeado con cigarrillo, enorme sobre una ciudad.
11. `11-hombres.jpg`: *Hombres*. Figuras de formas grandes que se encajan, en rojo, azul y crema.
12. `12-la-historia-del-fuego.jpg`: *La historia del fuego*. Un cavernícola peludo de rayitas con una pata de carne.
13. `13-aniversario-cine-movil.jpg`: *XXV aniversario Cine Móvil*. Un hombre con bombín sentado sobre un proyector.
14. `14-los-tres-mosqueteros.jpg`: *Los tres mosqueteros*. Un sombrero, un bigote y una pluma enormes sobre unas piernas de colores.
15. `15-el-general-de-las-canas.jpg`: *El general de las cañas*. Un cañaveral de formas recortadas, con una caña roja en el centro.
16. `16-el-deporte-nacional.jpg`: *El deporte nacional*. Un pelotero con una barba negra enorme, uniforme de rayas y bate.
17. `17-plaf.jpg`: *Plaf*. Una mujer cuya cabeza es una explosión amarilla con ojos, y huevos rotos a sus pies.
18. `18-cria-cuervos.jpg`: *Cría cuervos*. Un cuervo negro enorme con un ojo rojo y cruces en la cabeza.
19. `19-tres-en-un-sofa.jpg`: *Tres en un sofá*. Una cara cuadrada naranja con gafas de colores, nariz de zapato y sombrero de plumas.
20. `20-dichoso-seas.jpg`: *Dichoso seas*. Un hombre con sombrero y, a su espalda, una segunda cara que asoma y sonríe.
21. `21-se-permuta.jpg`: *Se permuta*. Una mujer que salta con una ciudad por falda, entre flechas.
22. `22-maravilla-con-trenzas-largas.jpg`: *Maravilla con trenzas largas*. Una niña haciendo el pino, con las piernas en V, sobre rojo.
23. `23-petulia.jpg`: *Petulia*. Una cara mínima: ojos de punto azules, nariz y labios, enmarcada por el pelo negro, y un corazón arriba.
24. `24-sobre-un-primer-combate.jpg`: *Sobre un primer combate*. Una calavera blanca con llamas de colores en los ojos.
25. `25-los-coroneles.jpg`: *Los coroneles*. Un militar con bigote y casco de plumas, rodeado de explosiones de colores.
26. `26-el-enigma-de-kaspar-hauser.jpg`: *El enigma de Kaspar Hauser*. Una chistera enorme con una ventana por donde asoma una cara.
27. `27-desierto-rojo.jpg`: *Desierto rojo*. Una cara de líneas sueltas, en naranja y rosa.
28. `28-el-mundo-de-los-animales.jpg`: *El mundo de los animales*. Un león amarillo de frente, con melena de rizos.
29. `29-nikolai-bauman.jpg`: *Nikolai Bauman*. Un hombre de traje cuya cara es una estrella roja.
30. `30-en-las-tinieblas.jpg`: *En las tinieblas*. Una calavera rayada con corazones por ojos y un cuchillo clavado.
31. `31-marnie.jpg`: *Marnie*. Un perfil de mujer hecho de rizos, con franjas de colores.
32. `32-dos-almas-en-pugna.jpg`: *Dos almas en pugna*. Una mujer de perfil con un moño enorme, y barrotes.
33. `33-los-karatecas.jpg`: *Los karatecas*. Una cabeza de perfil con flechas que le salen del cráneo.
34. `34-robinson-crusoe.jpg`: *Robinson Crusoe*. Una cabeza barbuda que es una isla, con árboles de colores encima.

### La regla de oro de los personajes (23 oct, Jorge)
**Que el jugador diga «esto me suena».** Cada personaje es un homenaje reconocible a su cartel: la misma composición, el mismo truco y la misma técnica, casi literales, con nuestro personaje y nuestra paleta. Los modelos son el Comandante joven v2 (*Por primera vez*) y Sarria v3 (*Zorro*). **Pero el personaje va primero** (23 oct, Rigoberto v3: copió tanto *El deporte nacional* que salió un pelotero viejo con guante, sin nada de Rigoberto). Del cartel se toman la composición, el truco y la técnica, no sus objetos ni su tema (el uniforme de rayas, el guante); la historia, la edad y los objetos son del personaje. **La fidelidad al cartel manda sobre la regla del busto**: el encuadre y la escala los pone el cartel (los ojos animados se colocan por personaje en `personajes.json`).

### Prompt A-P · Estilo de personaje (v9, homenaje, 23 oct)
Sustituye al v8 desde la regla de oro: sin busto obligatorio y con el cartel seguido casi al pie de la letra.
```
Square 1:1 illustration in the style of a 1960s–70s Cuban silkscreen film poster by Eduardo Muñoz Bachs (ICAIC). This is a recognizable homage to the attached poster: follow it almost literally in composition, visual trick, technique and tone, so anyone who knows the poster recognizes it at once, but with our character, in a square format and in our palette, and without its text. Full-bleed: the background runs off all four edges, edge to edge. Use the poster's own techniques: big flat silkscreen shapes, thick wobbly hand-drawn black outlines, hatching, doodled details, naive childlike drawing and boldly distorted proportions. The main character's eyes are always two solid round near-black dots, clearly separated, each on a small plain light patch so they read clearly. Every color is one of these flat inks, with no intermediate tones: brick red #B0362A, mustard #D8A02A, olive green #86762C, cobalt blue #1D51A0, soft pink #DF8178, cream paper #F0E9D6, near-black ink #201D14. Even rough, brush-made shapes are printed: solid, uniform ink inside with no bristle streaks or dry-brush texture. Real screen-print texture: fine mottle, paper fibers visible. No gradients, no shadows, no shine. No text, no letters, no flags, no emblems.
```

### Prompt A-P · Estilo de personaje (v8, 23 oct; sustituido por el v9)
Va antes del bloque del personaje. Hay que adjuntar el cartel de referencia que toque.

**v8 (23 oct, Jorge): en los personajes se pueden usar todas las técnicas de Bachs** (rayado de grabado, contornos negros de pincel, dibujo a línea, tramas, dibujo infantil), según el cartel de referencia. Lo minimalista y «sin líneas» era para los iconos, que se ven pequeños. Y el cartel se respeta en concepto, composición, técnica y tono, no solo en la idea. Se mantienen: el busto a la misma escala, los ojos de punto, solo las tintas de la paleta (sin tonos intermedios) y sin texto.

Historia: v1 estilo base · v2 busto · v3 sin dibujo a línea (quitado en la v8) · v4 caras deformes a lo Bachs · v5 una idea gráfica grande de fondo · v6 piel de cualquier tinta · v7 una nariz propia para cada personaje · v8 todas las técnicas de Bachs y fidelidad al cartel.
```
Square 1:1 illustration in the style of a 1960s–70s Cuban silkscreen film poster by Eduardo Muñoz Bachs (ICAIC). Follow the attached poster closely in concept, composition, technique and tone: take its visual trick and its way of telling an idea, but adapt it to a square format, to our character and to our palette, and do not copy its text or its subject. Composition: a bust portrait, from mid-chest up, centered and facing the viewer; the head fills about the upper half of the square, with the eyes at about 35% from the top, so every character in the series has the same scale. Like a real poster, one big graphic idea tells his story at a glance; the bust is never alone on an empty background. Full-bleed: the background runs off all four edges, edge to edge. Use whichever of Bachs's techniques the poster uses: big flat silkscreen shapes, bold black outlines with rough hand-made edges, dense hand-drawn hatching and engraving-like line work, doodled patterns, naive childlike drawing and boldly distorted proportions. Faces are drawn like Muñoz Bachs: boldly distorted heads (long, egg-shaped, lopsided, never a round smiley) and one characteristic nose whose shape and ink are unique to this character. Skin can be any ink of the palette that fits the idea. The eyes are always two solid round near-black dots, clearly separated, each on a small plain light patch so they read clearly. Every color is one of these flat inks, with no intermediate tones: brick red #B0362A, mustard #D8A02A, olive green #86762C, cobalt blue #1D51A0, soft pink #DF8178, cream paper #F0E9D6, near-black ink #201D14. Even rough, brush-made shapes are printed: solid, uniform ink inside with no bristle streaks or dry-brush texture, like a stencil cut from a brush drawing. Real screen-print texture: fine mottle, paper fibers visible. No gradients, no shadows, no shine. No text, no letters, no flags, no emblems.
```

### Comandante joven (etapa 1)
Referencia: **05, *Por primera vez*** (el hombrecillo que asoma sobre un campo de flores). Idea: brota del monte; la Revolución como primavera. v2 (23 oct): en busto; las hojas y flores le suben por los hombros desde abajo.
```
Mustard #D8A02A background. Bust of a young, joyful bearded guerrilla leader, rising out of a lush clump of big hand-cut tropical leaves and naive flowers that fills the bottom of the square, edge to edge, and climbs up around his shoulders: leaves in olive green and cobalt blue, flowers in brick red, soft pink and cream, with small solid near-black centers. A tall, flat-topped olive-green kepi cap with a short straight visor, one single flat olive shape with no band and no lines, a round cream face, two solid near-black dot eyes, and one enormous solid near-black beard covering the lower half of the face and the chest, with a wide-open laughing mouth as a brick-red shape inside the beard. One arm raised beside his head with a big chunky cream fist, one solid shape whose fingers are separated only by thin gaps of background. Scruffy olive-green fatigues with one clumsy mustard patch sewn on, and a small cream origami dove peeking out of his chest pocket. Happy, hopeful, a little clumsy.
```

### Domingo, el hermano (etapa 1)
Referencia: **01, *Los pájaros tirándole a la escopeta*** (una silueta negra gigante que domina el cartel). Idea: el hermano pequeño a la sombra; detrás de él, la silueta enorme de la gorra y la barba del Comandante. En las etapas siguientes, la sombra encoge hasta que en la 4 se sienta en el sillón. Jorge (23 oct): **algo afeminado**, con sutileza y gracia, en el gesto y el cuidado, nunca como burla gruesa.
```
Cream paper #F0E9D6 background. Bust of a slim, serious young guerrilla, slightly smaller than the frame would allow, standing in front of a huge solid near-black silhouette that fills most of the background behind him: the giant shadow of his big brother, a flat-topped kepi cap and an enormous bushy beard, cropped by the top and side edges. He wears a neat olive-green #86762C uniform buttoned all the way up to the chin with a tidy row of small mustard buttons, the only clean, well-pressed uniform in the series, and a small flat-topped olive kepi set perfectly straight. Round cream face, two solid near-black dot eyes, a thin, carefully trimmed solid near-black pencil mustache, no beard, neatly combed hair with a sharp side parting. Subtly dainty and prim: one hand raised delicately to his collar with the little finger lifted, and a tiny soft-pink #DF8178 flower tucked into his buttonhole. Serious, proper, a little fussy, always in his brother's shadow.
```


### Octavio Sarria, Interior (etapa 1): tres pruebas (23 oct)
Idea: la libreta, que crece en cada era. Jorge quiso probar las tres.

**1 · El hombre-libreta** (referencia 09, *Cine Móvil*)
```
Cobalt blue #1D51A0 background. Bust of a thin young bank clerk turned guerrilla interrogator, whose whole chest is a big open notebook held up with both hands: two cream pages with rows of small solid near-black rectangles like scribbled names, no letters. Above it, a round cream face, two solid near-black dot eyes inside small round glasses made of thin solid near-black rings, a tiny tight-lipped mouth, neatly combed dark hair, and a mustard pencil tucked behind one ear. An olive-green #86762C guerrilla jacket worn open over a cream office-shirt collar with a thin brick-red tie. Quiet, polite, attentive, slightly creepy.
```

**2 · Las gafas que vigilan** (referencia 08, *Zorro*). **Elegida por Jorge (23 oct).**
```
Brick red #B0362A background. Bust of a thin young bank clerk turned guerrilla interrogator, his face dominated by enormous round glasses: two big cream lenses ringed by thick solid near-black rims joined across the nose, like a mask, filling the whole width of the face. Inside each lens, one solid near-black dot eye, both looking sideways. A tiny tight-lipped mouth, neatly combed dark hair. Right under his chin he holds a tiny cobalt-blue notebook and a mustard pencil, ready to write. An olive-green #86762C guerrilla jacket over a cream office-shirt collar. Quiet, polite, watching everything.
```

**3 · Los apuntados** (referencia 06, *Alfredo Alfredo*)
```
Mustard #D8A02A background. Bust of a thin young bank clerk turned guerrilla interrogator, with round glasses made of thin solid near-black rings around two solid near-black dot eyes, a tiny polite smile and neatly combed dark hair. In front of his chest he holds open a big notebook with cream pages, and on the pages, in neat rows, many tiny round faces of his comrades, each one a small olive-green or soft-pink circle with two near-black dots; a few of them are crossed out by a short solid brick-red band. A brick-red pencil in his other hand. An olive-green #86762C guerrilla jacket over a cream office-shirt collar. Quiet, polite, keeping count.
```

### Anselmo Quiñones, el presidente florero (etapa 1)
**v3, de cero (23 oct, elegida por Jorge): la careta de palo.** Referencia: **29, *Nikolai Bauman*** (un hombre cuya cara es una estrella). Vestido de abogado de buena familia, se tapa la cara con una careta de guerrillero de carnaval. En cada era cambiará de careta. Jorge (23 oct): le gusta por lo tétrico. Ajustes: la careta sin orejas, para que se lea como careta; el palo, en el centro; la careta, desplazada, de modo que un ojo de Anselmo se ve en su propia cara, el otro asoma por un agujero de la careta, y el otro agujero queda vacío. Las versiones anteriores (barba postiza caída, etiqueta de fondo) se quedaban en un busto sin concepto.
```
Brick red #B0362A background. Bust of a well-groomed young lawyer from a good family: a spotless cream #F0E9D6 guayabera with two neat vertical pleats shown as thin gaps of red, a solid near-black bow tie and an elegant mustard fountain pen clipped in the chest pocket. In front of his face he holds up, with one cream hand, a flat carnival mask of a guerrilla on a thin mustard stick: a flat-topped olive-green #86762C kepi cap, a cream mask face and one enormous solid near-black beard, with two round eye holes through which his own two solid near-black dot eyes peek out. Around the edges of the mask we still see his real self: his ears and his slick, neatly combed solid near-black hair with a sharp parting. The mask is slightly too small and a little crooked. Here the big idea is the mask itself, so the background stays plain red. Smug, polished, opportunistic.
```

### Rigoberto Peña, Economía (etapa 1)
Referencia: **16, *El deporte nacional*** (el pelotero perdido en un uniforme enorme). Idea: el bodeguero flaco dentro de una guerrera dos tallas grande; en la era 3, el uniforme le quedará pequeño. Frijoles negros, como en la cocina cubana.
```
Cobalt blue #1D51A0 background. Bust of a skinny young bodega keeper who followed the guerrillas to collect a debt, lost inside a huge olive-green #86762C guerrilla jacket two sizes too big: the shoulders droop far past his own, the sleeves swallow his hands, and his long thin neck pokes out of a collar much too wide. A thick mustard rope is tied around the jacket in a clumsy knot to hold it together. A long, narrow, lopsided cream head, a big drooping nose as one flat soft-pink #DF8178 shape, two solid near-black dot eyes looking a little worried, and a small solid brick-red mouth. Out of one sleeve, his fingers clutch a paper cone made of cream newspaper, with rows of small solid near-black rectangles instead of text, full to the brim with small solid near-black beans. Thin, hungry, careful with every bean.
```

### Ideas de fondo para los que se quedaron en busto (23 oct)
- **Sarria:** detrás, una página gigante de su libreta que llena el fondo, con filas de caritas de sus compañeros y algunas tachadas en rojo (junta las pruebas 2 y 3). v2, Jorge: más minimalista. Sin la forma de la libreta ni el contorno rojo: las caritas van directamente sobre el fondo rojo, más grandes y menos, en crema y oliva, y las tachadas con una banda negra.
- **Anselmo:** detrás, una etiqueta de precio gigante, en blanco, con su cordel: él mismo está en venta.
- **Rigoberto:** de su bolsillo sale una cuenta de fiado larguísima que se desenrolla y llena el fondo, con filas de rayitas y un sello rojo de «sin pagar» (sin texto).


### Ernesto «Neto» Arrieta, Comercio (etapa 1)
Referencia: **21, *Se permuta*** (la ciudad metida en la falda). Idea: se abre la guerrera como un vendedor ambulante, y el forro está lleno de contrabando. En cada era, otra mercancía (contratos, dólares, souvenirs).
```
Cobalt blue #1D51A0 background. Bust of a cheeky young smuggler who ran guns to the guerrillas and sold rum to the army on the same trip. With both hands he holds his olive-green #86762C guerrilla jacket wide open, like a street vendor showing his goods: the inside lining is brick red and covered with contraband hanging in neat rows, small mustard rum bottles with blank cream labels, a few solid near-black cigars and one small solid near-black pistol. Under the jacket, a loud cream shirt with big soft-pink and mustard flowers. A long, lopsided cream head with a big hooked nose as one flat soft-pink #DF8178 shape, a mop of tight solid near-black curls, a thin solid near-black mustache, two solid near-black dot eyes and a wide, sly grin as one solid brick-red shape with one mustard gold tooth. The open jacket and its goods fill the lower half of the square. Charming, shameless, always selling.
```

**Neto, prueba 3 · Ida y vuelta** (referencia 33, *Los karatecas*; Jorge quiso probar también esta)
```
Mustard #D8A02A background. Bust of a cheeky young smuggler who ran guns to the guerrillas and sold rum to the army on the same trip, standing in the middle of a busy flow of big hand-cut arrows that circle around him and fill the background: on one side, solid brick-red arrows point up and away, each carrying a small solid near-black rifle; on the other side, solid cobalt-blue arrows point the opposite way, each carrying a small cream rum bottle. An olive-green #86762C guerrilla jacket worn wide open over a loud cream shirt with big soft-pink and brick-red flowers. A long, lopsided cream head with a big hooked nose as one flat soft-pink #DF8178 shape, a mop of tight solid near-black curls, a thin solid near-black mustache, two solid near-black dot eyes glancing sideways and a wide, sly grin as one solid brick-red shape with one mustard gold tooth. Charming, shameless, playing both sides.
```

### Hortensia Lamadrid, Educación (etapa 1)
Referencia: **30, *En las tinieblas*** (el negro que lo llena todo). Idea: la noche del campo y la luz de su farol, donde se aprende a leer. El farol es el único objeto animado del juego, además de los ojos: tiene que verse claro y aislado.
```
Solid near-black #201D14 night background, edge to edge. In the middle, a big round pool of mustard #D8A02A lamplight, slightly uneven, cut out of the darkness, and inside it the bust of a cheerful nineteen-year-old rural literacy teacher. She holds up a small kerosene lantern beside her head: a near-black frame with a cream #F0E9D6 glass and a bright brick-red flame in the middle, the clear center of the light. With her other arm she hugs an open primer, its cream pages showing only a few simple solid shapes (a sun, a house, a hand), no letters. A long, lopsided cream face with a small upturned nose as one flat soft-pink #DF8178 shape, two solid near-black dot eyes and a big open smile as one solid brick-red shape; a big round cloud of solid near-black curly hair tied with a brick-red headscarf. A handmade olive-green #86762C brigade uniform, too big at the shoulders, with one mustard patch. Out in the dark, around the pool of light, a few pairs of small cream dot eyes peek in, curious. Hopeful, warm, tireless.
```

**Hortensia, variante con piel rosa** (23 oct, A-P v6): misma descripción, cambiando la cara por «A long, lopsided soft-pink #DF8178 face with a small upturned nose as one flat brick-red shape, two solid near-black dot eyes and a big open smile as one solid near-black shape».

### Pieles y pelo del reparto (23 oct)
No todos iguales (Jorge). Con las tintas de la paleta:
- **Comandante:** crema; barba y pelo negros.
- **Domingo:** crema; pelo negro con raya y bigotito.
- **Sarria:** crema; pelo negro (fundido con el antifaz).
- **Anselmo:** rosa; pelo negro engominado.
- **Rigoberto:** rosa (v5); rizos cortos negros; sin barba.
- **Neto:** crema; rizos negros.
- **Hortensia:** crema en el rayado (la v1 de piel rosa queda como variante).
- **Eusebio:** crema en el corte de la caña.
- **Pendiente:** dar mostaza u oliva a algún personaje (Mirta, los embajadores) para variar más.

### Narices del reparto (23 oct; revisado)
El generador tiende a poner a todos la misma narizota roja de payaso (Neto, Rigoberto). Regla nueva: **la mayoría de las narices van del color de la piel, dibujadas solo con la línea negra**, como hace Bachs, y cada una con una **forma** distinta. Solo dos llevan nariz de otro color, y es parte de su chiste: Anselmo (triángulo rosa) y Sarria (la oreja). En el prompt se dice siempre «same color as the skin, drawn only with its outline» y se prohíbe «no red clown nose».
- **Comandante:** no se ve; la tapa la barba.
- **Domingo:** cuña pequeña y recta.
- **Sarria:** la oreja.
- **Anselmo:** triángulo rosa respingón.
- **Rigoberto:** chata y redonda, un botoncito.
- **Neto:** larga, fina y puntiaguda, de pico, como la mujer de *Se permuta*.
- **Hortensia:** pequeña y respingona.
- **Eusebio:** ancha y aplastada.
- **Mirta y los embajadores:** por decidir, sin repetir forma.

**Colores fuera de la paleta que se corrigen con PIL** (23 oct): la llama del farol de Hortensia salió en un rojo vivo (`#EB341F`) y la mano en un tostado (`#C59A5C`); el marco crema se recorta.

### Hortensia v2 (23 oct): fiel a *En las tinieblas*
Del cartel se toma: una cabeza enorme sola sobre negro; la técnica mezclada (todo rayado a lo grabado en crema y negro, y solo unas pocas manchas de color plano); el objeto intruso clavado en la cabeza (aquí, un lápiz gigante: la educación como arma); y el tono negro.
```
Solid near-black #201D14 background, edge to edge. Following the attached poster: the big head and shoulders of a nineteen-year-old rural literacy teacher, drawn entirely in dense hand-drawn cream hatching and engraving-like line work on the black, exactly like the skull in the poster: a long, lopsided face, a huge round cloud of curly hair and the collar of a handmade brigade uniform, all in cream line work. Like the knife in the poster, a giant pencil is stabbed into her hair at an angle, sticking out toward the top edge: a flat mustard body, a flat cream sharpened tip buried in the hair and a flat soft-pink eraser at the top, and from it hangs a small kerosene lantern in near-black with a flat brick-red flame. On her face, only two flat colored shapes, like the hearts in the poster: her nose, one small round brick-red button, and her mouth, one small flat cobalt-blue heart. Her eyes are two solid round near-black dots, each on a small plain cream patch inside the hatching. Everything else is cream line work on black. Hopeful and a little eerie.
```


### Sarria v2 (23 oct): rehecho con el A-P v8
Del cartel (*Zorro*) se toma: el antifaz que domina la cara (aquí, las gafas), el juego visual escondido en la cara (la nariz es una oreja: todo lo oye), la boca de dos barras negras y el negro macizo de bordes irregulares. Del fondo de caritas tachadas, lo que eligió Jorge.
```
Brick red #B0362A background, edge to edge, with a loose grid of about twenty round faces of his comrades printed directly on it, each a cream or olive-green circle with two big solid near-black dot eyes; four of them are crossed out by a thick solid near-black band. Leave clear red space around his head. Following the attached poster: the bust of a thin young bank clerk turned guerrilla interrogator, his face dominated by enormous round glasses that work like the mask in the poster: two big cream lenses inside thick near-black rims joined across the nose, filling the whole width of the face, with one solid near-black dot eye in each lens, both looking sideways. Like the rooster nose in the poster, his nose is a small cream human ear drawn in near-black, as if he listens to everything. His mouth is two short, thick horizontal near-black bars, one above the other, like sealed lips. Neat, solid near-black hair with a sharp edge. With cream hands, the same cream as his face, he holds a tiny cobalt-blue notebook and a mustard pencil under his chin. An olive-green #86762C guerrilla jacket over a cream office-shirt collar. All black shapes have rough, irregular hand-cut edges but solid, uniform ink inside, with no dry-brush streaks. Quiet, polite, listening.
```

### Sarria v3 (23 oct): de verdad como *Zorro*
Jorge: la v2 no recordaba en nada al cartel. Lo que hace *Zorro*: un primerísimo plano que llena el cartel; una banda negra maciza de lado a lado arriba (el antifaz) con dos rendijas para los ojos; debajo, la cara como una gran superficie crema vacía; el chiste escondido en la nariz; la boca de dos barras; y casi nada más (dos tintas y un acento). Aquí la banda es el pelo con las gafas fundidas, y el acento de color, las caritas tachadas que se ven reflejadas en los cristales. Rompe un poco la regla del busto: la cara sale más grande que la de los demás. **Aprobado por Jorge (23 oct)**, con el antifaz llevado hasta los bordes con PIL (el generador dejaba un margen crema). Regla de Jorge: **ningún personaje con margen o contorno alrededor**; todo llega a los bordes.
```
Cream paper #F0E9D6 background. Following the attached poster almost literally: an extreme close-up of a face that fills the whole square, edge to edge. Across the top third runs one solid near-black horizontal band from the left edge to the right edge, his hair and his heavy round glasses fused into a single mask-like shape, with two wide cream eye openings cut into it; in each opening, one solid near-black dot eye looking sideways. Below the band, the rest of the square is his plain cream face, almost empty. In the middle, like the rooster nose in the poster, his nose is a small human ear drawn in rough near-black ink, because he listens to everything. Lower down, his mouth is two thick, rough horizontal near-black bars, one above the other, like sealed lips. The only color: in each eye opening, a few tiny brick-red and olive-green round faces of his comrades, one of them crossed out, reflected next to the pupil. Nothing else. Rough, irregular edges but solid, uniform ink inside.
```

### Homenajes casi literales (23 oct, con el A-P v9)

**Domingo v3** (referencia 01, *Los pájaros tirándole a la escopeta*). v2 gustó; Jorge: solo un Domingo (el de la derecha, subido a la escopeta), corazones en rojo para que contrasten, la escopeta-hermano más a la izquierda y Domingo mucho más grande.
```
Mustard #D8A02A background. Following the attached poster almost literally: in the left third of the square, a tall, narrow, solid near-black vertical shape rises from the bottom edge to near the top, like the shotgun in the poster: it is the silhouette of his big brother, topped by a flat-topped olive kepi, with two big round cream rings at the top like the binocular barrels in the poster. Clinging to its right side and filling most of the right half of the square, like the bird perched on the shotgun in the poster: Domingo, big, a slim young guerrilla in a neat olive-green #86762C uniform buttoned up to the chin with a row of small mustard buttons, a flat-topped olive kepi set perfectly straight, a long lopsided cream face with two solid near-black dot eyes on plain cream, a small pointed near-black wedge nose and a thin pencil mustache. One arm hugs the shotgun-brother; the other hand is raised daintily, fingers pinched together with only the little finger lifted. A tiny soft-pink flower in his buttonhole. Four or five brick-red #B0362A hearts float around his head, like in the poster. Only one small character: no second figure. Thick wobbly hand-drawn outlines, printed as solid ink; no beige or grey tones.
```

**Rigoberto v5** (referencia 16, *El deporte nacional*). La v4 salió como un Comandante barbudo y mayor, con el uniforme a su medida. Jorge: **joven, sin barba, flaco, el uniforme enorme**, y no todos con la misma piel ni el mismo pelo. Piel rosa, rizos cortos negros, nariz de pera roja.
```
Mustard #D8A02A background, edge to edge, with a strip of olive-green #86762C ground along the bottom edge. From the attached poster take only the composition and technique: one figure standing full length on the ground, leaning on a tall object like the bat, with thick wobbly hand-drawn outlines. The character is ours: a very skinny YOUNG bodega keeper, a boy of nineteen, clean-shaven, NO beard and no mustache. He is drowning in an olive-green guerrilla uniform three sizes too big, like a tent on him: the jacket hangs down to his knees, the shoulders slide off his own, the empty sleeves dangle far past his hands, the trousers pile up in folds over his boots, all held together by a mustard rope tied at the waist. A big flat-topped olive kepi that falls over his ears. His skin is soft-pink #DF8178, and his hair is a mop of short near-black curls. His face in three-quarter view, both eyes visible: a thin, long, boyish face, two solid round near-black dot eyes on small cream patches, worried, and a long drooping pear-shaped brick-red nose. He leans one dangling sleeve on a giant cone of cream newspaper as tall as his leg, standing on the ground and full to the brim with small solid near-black beans; the newspaper shows only rows of small solid dashes, no letters. Big black boots. No beige, no grey: only the palette inks.
```

**Neto v2** (referencia 21, *Se permuta*)
```
Olive-green #86762C background, covered all over with hand-drawn near-black arrows, dotted lines and curving arrows pointing in every direction, exactly like in the attached poster. Following the poster almost literally: Neto leaps diagonally across the square, arms flung wide, one leg kicked back, like the woman in the poster. A loud cream shirt with big soft-pink and brick-red flowers, sleeves rolled up. A long, lopsided cream face in three-quarter view, both eyes visible: two solid near-black dot eyes, a long hooked brick-red pirate nose, a mop of tight near-black curls, a thin near-black mustache and a wide grin with one mustard gold tooth. Like the city skirt in the poster, around his waist he wears his wooden smuggling boat as a skirt: a mustard and cream wooden boat with small doodled planks, loaded with small rum bottles and crates, with a brick-red arrow sticking out of it to the right. Cream legs and two-tone mustard and red shoes. Thick wobbly hand-drawn near-black outlines around everything, printed as solid ink.
```


### Eusebio Palmares, Trabajo (etapa 1)
Referencia: **15, *El general de las cañas*** (un cañaveral de vidriera sobre negro, con una caña roja en el centro). Idea: Eusebio es la caña roja, la que sobresale entre todos los cañeros. Del cartel se toman el fondo negro, las cañas por segmentos con el corte crema arriba, el contorno negro grueso y la caña roja central; el corte crema de su caña es su cara.
```
Solid near-black #201D14 background. Following the attached poster almost literally: a dense field of tall sugarcane stalks fills the square edge to edge, drawn like stained glass with thick near-black outlines, each stalk made of segments in olive green, cobalt blue and mustard, with round cream cut tops, and long pointed leaves crossing between them. In the center rises the tallest stalk, brick red #B0362A like the red cane in the poster: it is Eusebio, a young sugarcane cutter and strike leader. His body is the segmented red cane, his two long red leaves are his arms, one of them raising a cream machete high. Where the poster has the round cream cut top, there is his face: a round-cut cream face with two solid near-black dot eyes, a broad flat nose as one small olive-green shape and a wide, confident open mouth as one solid near-black shape, shouting to the others. On top, a wide, frayed straw hat in mustard with near-black doodled weave. A small bunch of mustard bananas hangs from his red leaf-arm. Thick wobbly near-black outlines everywhere, printed as solid ink.
```
