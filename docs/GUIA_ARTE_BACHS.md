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

### Prompt A-P · Estilo de personaje (v5, 23 oct)

**v5 (23 oct, Jorge):** el Comandante (las flores) y Domingo (la sombra del hermano) son carteles completos; Sarria, Anselmo y Rigoberto se quedaron en un busto sobre fondo liso, con la idea solo en un objeto pequeño. **Cada personaje necesita una idea gráfica grande detrás o alrededor que llene el fondo y cuente su historia**, como en un cartel de verdad.

**v4 (23 oct):** Anselmo salió con una cara de emoticono (redonda, simétrica, sonrisa y cejas de línea), «poco Bachs». Las caras de Bachs son deformes: cabeza alargada o torcida, una nariz grande y propia de cada uno como forma plana, y una boca sólida (carteles 04, 19 y 20).

**v3 (23 oct):** en el primer Comandante, los nudillos del puño y las puntadas del parche salieron dibujados a boli. Se añade «No line drawing anywhere…».
Va antes del bloque del personaje. Hay que adjuntar el cartel de referencia que toque.

**v2 (23 oct, Jorge, en prueba): todos los personajes en busto**, sea cual sea el cartel que los inspira, para que haya equilibrio entre las cartas: de la mitad del pecho para arriba, centrado y de frente, con la cabeza del mismo tamaño y los ojos a la misma altura en todos. La idea del cartel va en lo que rodea al busto, en la ropa o en los objetos.
```
Square 1:1 illustration in the style of a 1960s–70s Cuban silkscreen film poster by Eduardo Muñoz Bachs (ICAIC). Take strong inspiration from the attached poster: its concept, its playful way of telling an idea and its bold composition, but adapt it to a square format and do not copy its colors, its text or its subject. Composition: a bust portrait, from mid-chest up, centered and facing the viewer; the head fills about the upper half of the square, with the eyes at about 35% from the top, so every character in the series has the same scale. The bust is never alone on an empty background: like a real poster, one big graphic idea behind or around him fills the background and tells his story at a glance. Full-bleed: the flat background color runs off all four edges, edge to edge. Naive, childlike and witty, with boldly distorted proportions. Big flat shapes of opaque ink cut by hand, with crisp, slightly irregular edges; each color is one flat ink, perfectly aligned, never stacked or overlapping, no outlines. Black details are printed as their own stencil layer: solid flat shapes and thin solid bands of near-black ink with clean edges, never scratchy or brushy. No line drawing anywhere: knuckles, stitches and folds are small solid shapes or thin gaps of background, never pen lines. Faces are drawn like Muñoz Bachs: boldly distorted heads (long, egg-shaped, lopsided, never a round smiley), one big characteristic nose as a single flat shape, and the mouth as one solid shape, never a thin line; no eyebrows. The eyes are always two solid round near-black dots, clearly separated, each one sitting on plain cream skin. Real screen-print texture: fine directionless mottle, paper fibers visible. Use ONLY these inks: brick red #B0362A, mustard #D8A02A, olive green #86762C, cobalt blue #1D51A0, soft pink #DF8178, cream paper #F0E9D6, near-black ink #201D14. No gradients, no shadows, no shine. No text, no letters, no flags, no emblems.
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
**v3, de cero (23 oct, elegida por Jorge): la careta de palo.** Referencia: **29, *Nikolai Bauman*** (un hombre cuya cara es una estrella). Vestido de abogado de buena familia, se tapa la cara con una careta de guerrillero de carnaval. En cada era cambiará de careta. Las versiones anteriores (barba postiza caída, etiqueta de fondo) se quedaban en un busto sin concepto.
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

