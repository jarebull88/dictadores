# Cartas · Era 2: La Purga

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 34 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.35.

### 1. El aniversario

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «¿Y si para el aniversario de la Revolución hacemos un desfile militar con todos los tanques? Los decoro yo.»

- **A. Que desfilen los tanques** Ejército +8 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. La fiesta es para el Pueblo** Pueblo +7 · Ejército −8

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

### 2. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 0; exige `juicios_publicos`.

**Carta:** «Exigimos que los acusados de sus juicios públicos tengan defensa y garantías antes de la sentencia.»

- **A. Que se les asignen abogados** Potencias +7 · Élite −3
- **B. Los juicios son asunto nuestro** Potencias −7 · Ejército +4 · Élite +3

### 3. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Los exiliados tienen una emisora de radio y media capital la escucha bajito.»

- **A. Pongan la telenovela a esa hora** Pueblo +5 · Ejército −5
- **B. Al que pillen, al calabozo** Ejército +5 · Pueblo −5

### 4. El hambre

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «La cosecha no da. Proponemos que el Estado se quede también con las fincas medianas.»

- **A. Todo para la Revolución** Élite +5 · Pueblo −5
- **B. Los medianos no son ricos** Pueblo +5 · Élite −5

### 5. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «La gente ya cree más en los rumores que en los periódicos.»

- **A. Nombren un Desmentidor Oficial** Pueblo −3 · Élite +5 · Bandera: `periodista_oficial`
- **B. Que la prensa diga la verdad** Pueblo +5 · Élite −5

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

### 6. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 0; exige `viejos_oficiales`.

**Carta:** «Los oficiales que jubilaste se reúnen en un «club de ajedrez». No juegan al ajedrez.»

- **A. Jaque mate: todos detenidos** Ejército +3 · Potencias −5
- **B. Metan un topo en el club** Ejército +6

### 7. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Propongo crear una unidad que vigile a la propia policía. La dirigiría yo.»

- **A. Autorizo la unidad** Ejército +8 · Élite −3 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Que se vigilen solos** Ejército −4 · Pueblo +3 · Élite +3

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

### 8. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Los comités reciben mil denuncias al día. La mitad son de vecinos que se pelean por una gallina.»

- **A. Investiguen la gallina** Ejército +6 · Pueblo −6 · Bandera: `denuncias_todas`
- **B. Solo las denuncias políticas** Pueblo +4 · Ejército −4

### 9. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Se han ido ingenieros, médicos y contables. Las fábricas ya solo funcionan con consignas.»

- **A. Ningún titulado sale del país** Ejército +4 · Pueblo −4
- **B. Cursos de ingeniería en seis meses** Pueblo +4 · Élite −4

### 10. El puerto abierto

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14.

**Carta:** «Hay mucha gente que quiere irse. ¿Abrimos un puerto y que los recojan sus familiares?»

- **A. Aquí no se va nadie** Ejército +6 · Pueblo −5 · Bandera: `frontera_cerrada`
- **B. Adiós, y dejen la llave** Pueblo +3 · Élite +3 · Ejército −6

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

### 11. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 0; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Mañana vence el primer pago de la deuda con el extranjero. En caja hay menos de lo prometido.»

- **A. Paguen aunque el Pueblo no coma** Potencias +5 · Pueblo −5
- **B. No se le paga al explotador** Potencias −6 · Élite +2

### 12. La cosecha récord

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 0.

**Carta:** «La cosecha ha roto récord según los informes. Los almacenes curiosamente están vacíos.»

- **A. Que la radio anuncie el récord** Élite +5
- **B. Detengan al que infló las cifras** Élite −5 · Ejército +3

### 13. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.»

- **A. Expúlsenlo del país** Potencias +4 · Ejército −4
- **B. A la cárcel por espía** Ejército +5 · Potencias −5

### 14. Los chistes

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 8.

**Carta:** «Circula un chiste sobre usted. Lo cuentan en las colas y en el Consejo se ríen más alto.»

- **A. Detengan al que se ría primero** Pueblo −5 · Ejército +4
- **B. Reírse también es de revolucionarios** Pueblo +4 · Ejército −3

### 15. Los satélites

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `misiles_instalados`.

**Carta:** «Nuestros satélites siguen detectando misiles. Exigimos una inspección.»

- **A. Inspeccionen lo que quieran** Potencias +8 · Ejército −5
- **B. Revisen primero sus propias bases** Potencias −8 · Ejército +5

### 16. El aliado enfadado

**Personaje:** Embajador del bloque oriental  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Han detenido a nuestro amigo de su Partido. Le enviaremos menos petróleo.»

- **A. Me da igual** Ejército +3 · Potencias −3
- **B. ¿Y si el amigo soy yo?** Potencias +3 · Ejército −3

### 17. El amigo del aliado

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; a partir del año 3 de la era.

**Carta:** «Un miembro del Partido se reúne con el embajador oriental. Dice que tú no eres buen comunista.»

- **A. Mándenlo a sembrar tomates** Ejército +5 · Élite −5 · Encola: `aliado_enfadado` en 1 años
- **B. Que me lo diga a la cara** Élite +5 · Ejército −5

### 18. La zafra de los diez millones

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Queremos la mayor zafra de la historia. Proponemos mandar a cortar caña a estudiantes, oficinistas y soldados.»

- **A. ¡Todos a la zafra!** Pueblo −6 · Élite +4 · Encola: `cifra_no_llega` en 2 a 3 años
- **B. Qué disparate, el país se pararía** Pueblo +5 · Élite −4

### 19. Los domingos de Cabaña

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14.

**Carta:** «Cabaña manda a los ministros a cortar caña los domingos. Dice que así nace el hombre nuevo.»

- **A. Yo cortaré a su lado** Pueblo +5 · Élite −5 · Encola: `companero_incomodo` en 2 a 3 años
- **B. El domingo es sagrado** Élite +5 · Pueblo −5 · Encola: `companero_incomodo` en 2 a 3 años

### 20. La carta de Cabaña

**Personaje:** undefined  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Cabaña te ha dejado una carta de despedida. Renuncia a sus cargos, a su grado y a su nacionalidad.»

- **A. Léanla en la plaza** Pueblo +3 · Élite −3
- **B. Guárdenla en mi cajón** Élite +3 · Pueblo −3

### 21. El congreso

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 12; a partir del año 3 de la era.

**Carta:** «Vendrán guerrilleros de medio mundo a nuestro congreso. Hay que decidir qué se llevan de vuelta.»

- **A. Y que se lleven fusiles** Ejército +5 · Potencias −5
- **B. Solo discursos, sin fusiles** Potencias +5 · Ejército −5

### 22. El compañero incómodo

**Personaje:** Embajador del bloque oriental  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Cabaña, su héroe más famoso, nos llamó imperialistas en un foro internacional. Exigimos que lo calle.»

- **A. Lo mandaré a una misión bien lejos** Potencias +4 · Ejército −3 · Encola: `cabana_carta` en 1 años, `guerrilla_perdida` en 2 a 3 años
- **B. Quien calla a Cabaña me calla a mí** Potencias −4 · Ejército +3

### 23. La ofensiva revolucionaria

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10; a partir del año 3 de la era.

**Carta:** «Aún quedan miles de negocios privados: puestos de frituras, barberías, talleres. Son focos de egoísmo.»

- **A. El Estado hará las mejores frituras** Élite +5 · Pueblo −4
- **B. Dejen vivir al pequeño negocio** Pueblo +4 · Élite −5

### 24. El servicio militar

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Proponemos tres años de servicio militar obligatorio para todos los jóvenes.»

- **A. Que cada joven sirva a la patria** Ejército +5 · Pueblo −4
- **B. La patria no se defiende obligado** Pueblo +4 · Ejército −5

### 25. La invasión del aliado

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Un país aliado quería reformas y lo hemos corregido con tanques. Esperamos su apoyo público.»

- **A. Tienen todo nuestro apoyo fraterno** Potencias +5
- **B. Aquí no opinamos de casas ajenas** Potencias −5

### 26. La guerrilla perdida

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Cabaña pide refuerzos desde la selva. Si los mandamos, el mundo sabrá que es cosa nuestra.»

- **A. Mándenle a nuestros mejores hombres** Ejército +4 · Potencias −4
- **B. Cabaña será un millón de camisetas** Potencias +3 · Ejército −3 · Bandera: `ferro_martir`

### 27. La cifra que no llega

**Personaje:** Ministro de Trabajo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Se acaba la zafra y la caña no llega a la cifra que hemos pintado en cada valla del país.»

- **A. Manden a todo el país al cañaveral** Élite +4 · Pueblo −5 · Encola: `discurso_derrota` en 1 a 2 años
- **B. Busquen cómo hacer que la cuenta dé** Pueblo +3 · Élite −3 · Encola: `discurso_derrota` en 1 a 2 años

### 28. El discurso de la derrota

**Personaje:** Ministro de Trabajo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «La zafra ha fracasado. Un millón de personas le espera en la plaza para oír qué pasó.»

- **A. Ofreceré mi dimisión a la plaza** Pueblo +4 · Élite −3
- **B. Busquen al contrarrevolucionario** Ejército +4 · Pueblo −4

### 29. Motos en la cárcel

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `mota_juzgado`.

**Carta:** «El excomandante Motos protesta en la cárcel: se niega a vestir de preso y lleva meses en calzoncillos.»

- **A. Que pase frío** Pueblo +5 · Ejército −5
- **B. Que lo vistan entre cuatro** Ejército +5 · Pueblo −5

### 30. Motos en la universidad

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `matojos_libre`.

**Carta:** «El excomandante Motos da clases en la universidad. Los alumnos le aplauden más que a tus discursos.»

- **A. Aplaudir es gratis** Pueblo +5 · Élite −5
- **B. Fuera de la universidad** Élite +5 · Pueblo −5

### 31. La investigación

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `milfuegos_investigado`.

**Carta:** «Parece que el investigador del caso Milfuegos encontró algo. Quiere saber quién ordenó el vuelo.»

- **A. Todo lo que necesite** Pueblo +5 · Ejército −5
- **B. Caso cerrado, gracias** Ejército +5 · Pueblo −5

### 32. La leyenda de Milfuegos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `milfuegos_cerrado`.

**Carta:** «En los bares cantan que Milfuegos no murió, que sigue en el mar y que volverá.»

- **A. Prohíbanla, por respeto** Élite +5 · Pueblo −5
- **B. Háganle una estatua** Pueblo +5 · Élite −5

### 33. Las flores en el mar

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `accidente_cienfuegos`.

**Carta:** «El Pueblo sigue tirando flores al mar por Milfuegos. Muchos aún preguntan qué pasó.»

- **A. Que se olvide sin acto oficial** Pueblo +3 · Élite −4
- **B. Encabezaré yo los homenajes** Élite +4 · Pueblo −3

### 34. Los campos de trabajo

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14.

**Carta:** «Hay jóvenes con el pelo largo, curas y «desviados». Trabajar en el campo y cortar caña los reformaría.»

- **A. Que el trabajo los haga hombres** Ejército +6 · Pueblo −7 · Bandera: `campos_trabajo`
- **B. Que lleven el pelo como quieran** Ejército −6 · Pueblo +7

**Consecuencia futura de `campos_trabajo`:** Intelectuales denuncian los campos de trabajo.
