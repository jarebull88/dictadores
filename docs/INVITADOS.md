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
  3. «Me voy a curarme el hígado y no creo que vuelva. Le dejo mi casa, mis gatos y mis botellas. Adiós.» — A. Tu casa será un museo (Pueblo) · B. El Partido cuidará tu bar (Partido) (29 oct: despedida)
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

## Hecho (29 oct, programación)
- Pupo y Ernesto ya están en el juego. Pupo: `colas`, respuesta B, encola con `invoca: "pupo"` una de las cuatro amenazas (`pupo_*`, `enlace`) de la era actual, una vez por era; la A de cada amenaza encola su remedio (`pupo_*_remedio`). Efectos ±3 provisionales. Ernesto: tres anclas (`ernesto_*`, ventanas 2–4, 5–7, 8–10 de la era 1), efectos ±5 provisionales. Leyendas: «BABALAWO OFICIAL» y «NOVELISTA». Pupo no tiene aún cartas en las eras 2–4 (si lo invocan allí no sale nada). Textos y pesos los revisa Textos.

## Pupo: mecánica nueva (31 oct, Jorge; sustituye a los efectos ±3)
Misma estructura que los atentados (`docs/MUERTES.md`), con protección o maldición en vez de recompensa o muerte:
1. **Invocación** (carta de las colas, «Yo sé a quién llamar»): nada más.
2. **Amenaza:** solo la plantea; **las dos respuestas siguen adelante** y no mueven nada (graciosas: «Protéjame, padrino», «¿Qué puedo hacer?»).
3. **Hechizo (el remedio):** aceptar o rechazar. El texto avisa del riesgo con una frase de santería («si el santo no queda conforme, se vira») y por detrás lleva una descripción ambigua.
   - **Aceptar:** se tira la suerte según el **Pueblo** (cuanto más cree en ti, mejor; nunca seguro). Carta de resultado:
     - **Bien → secuela «Collar de protección»:** acerca las fuerzas al centro durante unos turnos.
     - **Mal → secuela de maldición** (algo de santeros en negativo): las aleja del centro durante unos turnos. No mata de golpe.
   - **Rechazar:** coste fijo con su carta (Pupo se va ofendido; el Pueblo baja un poco).
   - Las dos secuelas se comportan como las demás: si las casillas están llenas, desplazan a la más antigua. **Sin coleccionable.**
   - Números del collar y la maldición (fuerza y duración): por calcular.

## Papá Ernesto: guion definitivo (31 oct, Jorge)
Trama de era. **Logro** si llegas a la despedida y eliges «Su casa será un museo» (respetar el legado de tu amigo); «El Partido cuidará de sus botellas» la corta (sin aviso: Ernesto se va igualmente).
1. **Torneo:** Soy escritor, pescador y anfitrión. Le invito a mi torneo de pesca. Habrá daiquirís para todos y un trofeo que llevará mi nombre. — Conmigo todos pican (sigue) · No me gusta pescar (corte 1)
   - **Corte 1 (nota de inteligencia):** Papá Ernesto y el embajador occidental se han hecho grandes amigos. Parece que ha encontrado a alguien que comparte sus aficiones.
2. **Whisky:** Quería pedirle un favor. ¿No podría hacer alguna gestión para que no me falte mi whisky importado? Ya sabe cuánto lo necesito para escribir. — Usted se merece ese whisky (sigue) · Beba lo que bebe el Pueblo (corte 2)
   - **Corte 2 (nota de inteligencia):** Papá Ernesto abandonó el país a las 6:40. En el registro de su casa solo se encontraron botellas vacías.
3. **Despedida:** Me voy a cuidar el hígado y no creo que vuelva. Le dejo mi casa, mis gatos y mis botellas. Ha sido un placer, Comandante. — Su casa será un museo (logro) · El Partido cuidará de sus botellas

## Padrino Pupo: guion definitivo (1 nov, Jorge; ya en `src/datos.js`)
Sustituye a la mecánica del 31 oct: **en el hechizo no se rechaza** (si has llegado hasta aquí no te rajas): **pagar entero o regatear**. Pagar cuesta más a la fuerza de lo que pide y da mejor suerte; regatear cuesta menos y la empeora. La suerte la decide el **Pueblo**; el resultado, una secuela **Collar** (bien) o **Salación** (mal). **Enemigos se quitó**: quedan tres amenazas, una por fuerza.
0. **Las colas:** Que el Partido reparta los turnos · **Hay otras formas de resolver esto** (invoca a Pupo).
1. **Mal de ojo** (cuesta Partido): «Mijo, esto salió en osogbo. Hay una mirada muy mala puesta sobre usted. Y lleva tiempo ahí.» — ¡Hágame el ebbó, padrino! · ¡Dígame qué necesita! → «Para limpiarle el camino, el santo pide 12 huevos, 7 cocos, un chivo y la nevera de un ministro. Pero puede fallar.» — Que sean dos neveras · ¿No le sirve la del viceministro?
2. **Envidia** (cuesta Potencias): «Mijo, usted despierta mucha envidia. Y esa envidia, cuando se acumula, hace mucho daño.» — Protéjame, padrino · ¿Qué pide la letra? → «Para la envidia, el santo pide 7 mazorcas, 2 racimos de plátanos, ron y un Rolex igual al suyo. Pero puede fallar.» — Elija uno de mi colección · Le consigo uno más modesto
3. **Malos deseos** (cuesta Ejército): «Mijo, el santo me lo ha marcado. Hay gente pidiendo su caída con una insistencia que no es normal.» — ¡Póngame en iré, padrino! · ¿Qué hay que ofrecer? → «Para malos deseos, el santo pide calabaza, 2 gallinas negras, arroz y un carro con chófer. Pero no le aseguro nada.» — Un descapotable, padrino · Una moto y va que chuta
- **Detrás del hechizo** (propuesta): Padrino Pupo acierta casi siempre. Lo de «casi» no lo explica nunca.
- **Resultado** (propuesta): Collar — «El santo te cubre las espaldas. De momento.» · Salación — «Todo lo que tocas se tuerce. Hasta el café.»
- Ejemplo de suerte (a ajustar): Pueblo 60 → 60 % pagando, 40 % regateando; nunca segura.
