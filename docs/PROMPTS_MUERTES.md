# Prompts de arte: las muertes (2 nov)

Redactados por Textos a petición de Jorge; los revisa y usa la conversación de Arte (`GUIA_ARTE_BACHS.md`). **Regla nueva (2 nov, Jorge): las muertes tienen paleta limitada: solo negro, rojo, blanco y beige.** Los textos de cada muerte están en `docs/MUERTES.md`. Uso: el prompt A (estilo) y, debajo, el B de cada muerte.

## Prompt A · Estilo de muerte
```
Square 1:1 scene in the style of a 1960s–70s Cuban silkscreen film poster by Eduardo Muñoz Bachs (ICAIC). Full-bleed: the background runs off all four edges. One single, clear visual idea, readable at a glance on a phone, like a darkly funny poster for the end of a film. Big flat silkscreen shapes with crisp, slightly irregular hand-cut edges, thick wobbly hand-drawn black outlines where needed, naive childlike drawing and boldly distorted proportions. Faces are simple: dot eyes, a small mouth, no realism. Use ONLY these four flat inks, with no intermediate tones: near-black ink #201D14, brick red #B0362A, pure white #FFFFFF and beige paper #F0E9D6. Red is used sparingly, for the one thing that matters most. Real screen-print texture: fine mottle, paper fibers visible. No gradients, no shadows, no shine. No text, no letters, no numbers, no flags, no emblems, no real people.
```
**El Comandante** (en todas): joven guerrillero de barba negra, gorra de campaña y uniforme verde… en esta paleta, uniforme negro o beige; siempre reconocible por la barba y la gorra.

## Estado (3 nov)
- **Hechas** (en el juego): Re-Revolución, Ingratitud, Abducción, Junta militar, pelotazo y tabacos.
- **Faltan:** Unanimidad (`elite_0`), Embajador (`elite_100`), y las dos de Potencias (`potencias_0`, `potencias_100`).
- **Los dobles (2 nov):** cada muerte tiene dos textos que comparten **una sola imagen**: el de siempre (`FINALES`, la última vida) y otro donde cae o te sustituye un doble (`FINALES_DOBLE`, en `src/datos.js`). La imagen tiene que valer para los dos. En Potencias cambian bastante: **Invasión / Desconocido** (sin aliados; con doble: tu doble firma las alianzas que tú rechazaste) y **Anexión / Recambio** (tu aliado te manda a un sanatorio y deja a tu doble firmando). Las escenas 7 y 8 de abajo ya están pensadas para servir a los dos.
- **Las 5 muertes por personaje se descartaron** (2 nov, Jorge): no hay que hacerlas.

## Prompts B · Las 8 caídas (era 1)
1. **Re-Revolución** (Pueblo a 0): `Subject: a long line of small peasant rebels with rifles walking down a mountain toward a tiny palace at the bottom; on the palace balcony, the bearded Comandante in his cap looks up, small and alone. The rebels' rifles and one raised red flag-shaped cloth without any symbol are the only red.`
2. **Ingratitud** (Pueblo a 100): `Subject: a huge crowd of cheerful people carrying hoes, rifles and house keys walks away from the viewer, ignoring a tiny bearded Comandante left standing on an empty speaker's podium, his arm still raised. A single red microphone on the podium.`
3. **Abducción** (Ejército a 0): `Subject: at night, a bearded man in pyjamas, freshly shaved on one side of his face, is carried out of a palace bed by two faceless commandos in black; a razor and a cloud of black beard hair fall to the floor. The bed sheet is red.`
4. **Junta militar** (Ejército a 100): `Subject: a row of identical generals in caps and medals sit at a long table giving orders; in a corner, the small bearded Comandante, smiling stiffly, shakes maracas for a folk dance troupe. The generals' sashes are red.`
5. **Unanimidad** (Partido a 0): `Subject: a meeting hall seen from above, dozens of identical raised hands voting yes; among them, one hand in a guerrilla sleeve with a beard-stubble wrist, also raised, the Comandante voting himself out. That single hand is red.`
6. **Embajador** (Partido a 100): `Subject: the bearded Comandante in a heavy fur coat and fur hat stands alone at a tiny embassy door in an endless snowy landscape full of reindeer; the reindeer stare at him. Only the embassy door is red.`
7. **Invasión / Desconocido** (Potencias a 0): `Subject: the bearded Comandante stands alone on a tiny island beach; on the horizon, a ring of foreign warships turns away from him, and not a single boat comes to help. The ships are black; one small white handkerchief in his hand is the only light spot; the warship flags are plain red shapes with no symbols.`
8. **Anexión / Recambio** (Potencias a 100): `Subject: a huge foreign hand lifts the bearded Comandante out of the presidential armchair by the collar, like a puppet, while an identical bearded lookalike already sits down in his place holding a pen to sign. The armchair is red.`

## Prompts B · Las 5 muertes por personaje (DESCARTADAS el 2 nov: no hacer)
1. **Por fin es Domingo** (Fuerzas Armadas): `Subject: the Comandante's younger brother, slim, with a carefully groomed moustache, admires himself in a tall mirror while a tailor adjusts the Comandante's oversized uniform on him; behind, two soldiers lead the bearded Comandante away. The measuring tape is red.`
2. **Confesión** (Inteligencia, Octavio): `Subject: a bureaucrat in glasses with a small notebook sits behind a desk piled with folders; the bearded Comandante, sitting under a single hanging lamp, signs a paper. The signature and the lamp light are red.`
3. **Asesoría** (embajador oriental, Strenko): `Subject: two huge, smiling foreign advisers in fur hats escort the small bearded Comandante, wrapped in a blanket like a patient, toward an airplane stairway. The blanket is red.`
4. **Intervención** (embajador occidental, Pembrook): `Subject: a tall foreign ambassador with golf clothes and a golf club sits on the presidential armchair; ministers line up smiling, each holding out an open hand for a banknote. The armchair is red.`
5. **Superviviente** (Anselmo): `Subject: a plump vice-president with a new uniform and the price tag still hanging hands the bearded Comandante, tied with a ribbon like a gift box, to faceless figures; in his other hand, a beach towel and a sun hat. The price tag is red.`

## Prompts B · Muertes especiales
1. **Regalo envenenado** (atentado de los tabacos): `Subject: the bearded Comandante lies on the floor, arms open, next to an open cigar box; a thin line of smoke from a cigar rises and forms a skull. The cigar's glowing tip is red.`
2. **La visita** (atentado 2) y **el pelotazo**: pendientes de texto.
