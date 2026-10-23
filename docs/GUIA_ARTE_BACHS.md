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
- Si aun así aparece un marco de papel, es más fiable recortarlo en Photoshop que pelearlo con prompts.

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

**El Partido, alternativa: la estrella gorda** (23 oct: el Partido como cerdo de la granja; v2, Jorge: sin ojos ni puro, solo la gordura y una curva que marca la barriga)
```
Olive green #86762C background. A big, fat, well-fed five-pointed star in brick red #B0362A, filling most of the square: short, stubby, rounded points and a plump round belly bulging out at the bottom, like a star that eats too much. No face. Only one detail: a thin solid near-black curved band, shaped like a wide smile, across the lower part of the star, marking the top of its round belly. Nothing else.
```

**Las Potencias**
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

**Alineado 1** (títere de guante)
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
