# Invitados (28 oct)

Se escribe a mano. Los invitados son personajes con un papel propio que no son portavoces (regla 2 de `CLAUDE.md`): **dos fijos**, que salen en todas las eras, y **una trama de invitado por era**. Con nombre solo si vuelven a salir. Hablan de usted. **Aún no están en el juego:** necesitan arte (conversación de arte) y que el motor sepa de invitados (grupo, ficha, leyenda); entonces se pasan a `src/datos.js`.

## Fijos
### Padrino Pupo (babalawo)
- **Quién es:** un babalawo descarado y aprovechado, como todos los gurús. Trata al Comandante de **«mijo»** (el único que lo hace), primero mete el miedo (mal de ojo, envidias, sombras) y luego pide «para el santo» una lista exagerada que acaba en una puya.
- **Expediente (28 oct, aprobado por Jorge):** nombre «Padrino Pupo», cargo «Babalawo oficial». Historia: «Babalawo de barrio que lee el futuro en un collar de caracoles. Ve el mal de ojo en cualquier cara, sobre todo en las que pagan.» Nota: «Es el único que llama «mijo» al Comandante.» (Pasa a `FICHAS` cuando el motor admita invitados.)
- **Cómo sale:** solo si lo llaman. En **«Las colas»** la respuesta B pasa a ser **«Llamen a un experto»**: entonces sale una de sus cuatro amenazas (al azar) y, si le haces caso, el remedio. Las dos cartas son segundos pasos (`enlace`): no cuentan. Si no lo llamas, no sale. Una vez por era como mucho.
- **Fuerzas:** dejarse enredar (A) sube un poco el Pueblo creyente; plantarse (B) sube un poco el Partido.
- **Idea para las otras eras:** su lista encoge con la economía (era 2: arroz, frijoles, cigarros; era 3: café, queso, cerveza; era 4: leche en polvo, pollo congelado, una jaba de boniato). Ideas de Jorge guardadas: «muchos ojos encima y no todos de admiración», «cuando uno manda tanto, despierta envidias», «le han echado mal de ojo, y del fuerte».

**Era 1, los cuatro flujos:**
1. «Mijo, le han echado algo malo. Eso se le ve en la cara.» — A. Límpieme, padrino · B. Yo no creo en santos
   → «Para limpiarle el camino, el santo pide huevos, siete cocos, un chivo y la nevera de un ministro.» — A. Que sean dos neveras · B. Rebaje algo, padrino
2. «Mijo, quieren verlo caer, y no son pocos.» — A. Ciérreles el paso · B. Ya tengo escolta
   → «Para cerrarles el camino, el santo necesita tabaco, dos gallos y la casa de un burgués exiliado.» — A. Casa con piscina · B. Con un piso le basta
3. «Mijo, esa envidia que le tienen viene cargada.» — A. Protéjame, padrino · B. La envidia me alimenta
   → «Para protegerlo, hay que darle al santo langosta, ron, tres palomas y un reloj como el suyo.» — A. Le doy el de repuesto · B. Que pregunte la hora
4. «Mijo, hay mucha gente deseándole mal. El santo me lo ha dicho.» — A. Contente al santo · B. Dígale que estoy ocupado
   → «Para tenerlo contento, al santo hay que darle viandas, un puerco, ron y un carro con chófer.» — A. Un descapotable · B. Que el santo camine

### Segundo fijo
Por decidir (propuesta: el barbero de palacio).

## Tramas por era
- **Era 1 · Papá Ernesto** (el novelista extranjero, 1960): el artista sibarita que alaba la Revolución desde su bar y al final se va al «terrible capitalismo». Leyenda bajo la carta: **NOVELISTA**. **Expediente (28 oct, aprobado por Jorge):** nombre «Papá Ernesto», cargo «Novelista». Historia: «Novelista extranjero de fama mundial que adora las revoluciones, siempre que tengan buenos bares. Pesca agujas, con éxito variable.» Nota: «Su hígado no es tan revolucionario.» (Pasa a `FICHAS` cuando el motor admita invitados.) Tres cartas repartidas por la era (no es un miniflujo):
  1. «Escribo novelas y pesco agujas. Le invito a mi torneo: daiquirí ilimitado y un trofeo con mi nombre.» — A. Conmigo todos pican (Pueblo) · B. Yo pesco otra cosa (Partido)
  2. «Adoro su Revolución, pero sin whisky importado no escribo ni una línea. ¿Hacemos una excepción?» — A. Whisky para el genio (Potencias) · B. Beba guarapo (Pueblo)
  3. «Me voy unos días fuera, a curarme el hígado. Le dejo mi casa, mis gatos y mis botellas.» — A. Museo con su nombre (Pueblo) · B. Las botellas, al Partido (Partido)
- **Era 2 · Silverio** (el trovador incómodo de finales de los 60: de cantar en contra a atado en corto; el barco pesquero; en la era 3, cantor oficial o exiliado). Por escribir.
- **Eras 3 y 4:** por decidir (el poeta encarcelado; el niño del naufragio, la visita del Papa…).

## Decisiones
- Los atentados no son tramas: son cartas sueltas de aceptar o rechazar (se diseñan con las muertes).
- El hermano (Domingo) no es invitado: es el Ministro de las Fuerzas Armadas.

## Para programación (29 oct) — cómo conecta Pupo con el juego
- **La carta que lo invoca ya está en el juego** (`colas`, crisis leve): «Hay colas para el pan, el jabón y hasta para hacer cola. Nadie encuentra una explicación.» — A. Primero los militantes · B. **Yo sé a quién llamar**. La B hoy solo mueve fuerzas; **falta que encole una de las cuatro amenazas** de Pupo.
- **Reglas de la invocación:** sale **una amenaza al azar** de las cuatro; **una vez por era como máximo** (si ya salió o está esperando otra, no se encola nada); en la era 1 solo las de la era 1. Más adelante lo invocarán otras cartas, con otras respuestas.
- **Las amenazas y los remedios son segundos pasos** (`enlace: true`, no cuentan): la A de cada amenaza encola su remedio al turno siguiente; la B acaba la trama. Efectos pequeños: la A sube un poco el Pueblo y baja un poco el Partido; la B, al revés (±3).
- Los textos de las ocho cartas están arriba, en «Era 1, los cuatro flujos». Cargo para la leyenda: **Babalawo**. Ficha provisional: «Babalawo de barrio que cobra en especie y en divisas. Anunció la caída del tirano cuando el tirano ya estaba cayendo.» · Nota: «Lo visita medio gabinete de día; el otro medio, de noche.» (la revisarán los expedientes).
- **Arte:** `assets/personajes/originales/padrino-pupo.jpg` (y `papa-ernesto.jpg`) ya existen; falta recortarlos y registrarlos en `personajes.json`.
