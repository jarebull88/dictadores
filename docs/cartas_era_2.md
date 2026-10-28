# Cartas · Era 2: La Purga

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 26 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.35.

### 1. El aniversario

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «Llega el aniversario: el Ejército quiere desfile de tanques y el Pueblo, ron. No hay para los dos.»

- **A. Un gran desfile con tanques** Ejército +8 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. Ron gratis para todo el Pueblo** Pueblo +7 · Ejército −8

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

### 2. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `juicios_publicos`.

**Carta:** «Exigimos que los acusados de sus juicios públicos tengan defensa y garantías antes de la sentencia.»

- **A. Que se les asignen abogados** Potencias +7 · Élite −3
- **B. Los juicios son asunto nuestro** Potencias −7 · Ejército +4 · Élite +3

### 3. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha bajito.»

- **A. Interfieran la emisora con música** Pueblo −6 · Ejército +3 · Élite +2
- **B. Que la radio diga que son espías** Ejército +4 · Potencias −4 · Pueblo −3

### 4. El hambre

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «Repartimos la tierra, pero faltan semillas y tractores. La cosecha se ha reducido a la mitad.»

- **A. El Estado siembra mejor que nadie** Pueblo −5 · Élite +2
- **B. Importen comida a cualquier precio** Pueblo +6 · Potencias +5

### 5. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «La gente cree más en los rumores que en los periódicos. Propongo un periodista oficial que los desmienta.»

- **A. Nombren un Desmentidor Oficial** Pueblo −3 · Élite +5 · Bandera: `periodista_oficial`
- **B. Que la prensa diga la verdad** Pueblo +5 · Élite −5

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

### 6. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `viejos_oficiales`.

**Carta:** «Los oficiales que jubiló se reúnen en un «club de ajedrez». No juegan al ajedrez.»

- **A. Jaque mate: todos detenidos** Ejército +3 · Potencias −5
- **B. Metan un topo en el club** Ejército +6

### 7. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Propongo crear una unidad que vigile a la propia policía. La dirigiría yo.»

- **A. Autorizo la unidad especial** Ejército +8 · Élite −3 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Que la policía se vigile sola** Ejército −4 · Pueblo +3 · Élite +3

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

### 8. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por una gallina.»

- **A. Que se investigue hasta la gallina** Ejército +6 · Pueblo −6 · Bandera: `denuncias_todas`
- **B. Solo cuentan las denuncias políticas** Pueblo +4 · Ejército −4

### 9. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Se han ido ingenieros, médicos y contables. Las fábricas ya solo funcionan con consignas.»

- **A. Prohíban salir a los titulados** Ejército +4 · Pueblo −4
- **B. Cursos de ingeniería en seis meses** Élite +2 · Pueblo +3

### 10. Intentos de fuga

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `frontera_cerrada`, `criticos_detenidos`, `exiliados_vocales`.

**Carta:** «Cada semana huyen más familias en balsas. Ya no quedan neumáticos ni puertas en los barrios.»

- **A. Refuercen la frontera** Ejército +6 · Pueblo −5
- **B. Que se vayan y nos dejen sus casas** Pueblo +5 · Ejército −4 · Potencias +3

### 11. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Mañana vence el primer pago de la deuda con el extranjero. En caja hay menos de lo prometido.»

- **A. Paguen aunque el Pueblo no coma** Potencias +5 · Pueblo −5
- **B. No se le paga al explotador** Potencias −6 · Élite +2

### 12. La cosecha récord

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8.

**Carta:** «La cosecha ha roto récord según los informes. Los almacenes curiosamente están vacíos.»

- **A. Que la radio anuncie el récord** Élite +5
- **B. Detengan al que infló las cifras** Élite −5 · Ejército +3

### 13. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.»

- **A. Expúlsenlo del país** Potencias −3
- **B. A la cárcel, por espía** Potencias −6 · Ejército +5

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

### 16. El aliado enfadado *(borrador)*

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 0; a partir del año 3 de la era.

**Carta:** «Nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.»

- **A. Apoyaremos su próxima invasión** Potencias +7
- **B. Guarden su petróleo, iremos en bici** Potencias −6 · Pueblo −4

### 17. La zafra de los diez millones

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Queremos la mayor zafra de la historia. Proponemos mandar a cortar caña a estudiantes, oficinistas y soldados.»

- **A. ¡Todos a la zafra!** Pueblo −6 · Élite +4 · Encola: `cifra_no_llega` en 2 a 3 años
- **B. Qué disparate, el país se pararía** Pueblo +5 · Élite −4

### 18. El compañero incómodo

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10.

**Carta:** «Cabaña, su héroe más famoso, nos llamó imperialistas en un foro internacional. Exigimos que lo calle.»

- **A. Lo mandaré a una misión bien lejos** Potencias +4 · Ejército −3 · Encola: `guerrilla_perdida` en 2 a 3 años
- **B. Quien calla a Cabaña me calla a mí** Potencias −4 · Ejército +3

### 19. La ofensiva revolucionaria

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10; a partir del año 3 de la era.

**Carta:** «Aún quedan miles de negocios privados: puestos de frituras, barberías, talleres. Son focos de egoísmo.»

- **A. El Estado hará las mejores frituras** Élite +5 · Pueblo −4
- **B. Dejen vivir al pequeño negocio** Pueblo +4 · Élite −5

### 20. El servicio militar

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Proponemos tres años de servicio militar obligatorio para todos los jóvenes.»

- **A. Que cada joven sirva a la patria** Ejército +5 · Pueblo −4
- **B. La patria no se defiende obligado** Pueblo +4 · Ejército −5

### 21. La invasión del aliado

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Un país aliado quería reformas y lo hemos corregido con tanques. Esperamos su apoyo público.»

- **A. Tienen todo nuestro apoyo fraterno** Potencias +5
- **B. Aquí no opinamos de casas ajenas** Potencias −5

### 22. La guerrilla perdida

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Cabaña pide refuerzos desde la selva. Si los mandamos, el mundo sabrá que es cosa nuestra.»

- **A. Mándenle a nuestros mejores hombres** Ejército +4 · Potencias −4
- **B. Cabaña será un millón de camisetas** Potencias +3 · Ejército −3 · Bandera: `ferro_martir`

### 23. La cifra que no llega

**Personaje:** Ministro de Trabajo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Se acaba la zafra y la caña no llega a la cifra que hemos pintado en cada valla del país.»

- **A. Manden a todo el país al cañaveral** Élite +4 · Pueblo −5 · Encola: `discurso_derrota` en 1 a 2 años
- **B. Busquen cómo hacer que la cuenta dé** Pueblo +3 · Élite −3 · Encola: `discurso_derrota` en 1 a 2 años

### 24. El discurso de la derrota

**Personaje:** Ministro de Trabajo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «La zafra ha fracasado. Un millón de personas le espera en la plaza para oír qué pasó.»

- **A. Ofreceré mi dimisión a la plaza** Pueblo +4 · Élite −3
- **B. Busquen al contrarrevolucionario** Ejército +4 · Pueblo −4

### 25. Las flores en el mar

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `accidente_cienfuegos`.

**Carta:** «El Pueblo sigue tirando flores al mar por Milfuegos. Muchos aún preguntan qué pasó.»

- **A. Que se olvide sin acto oficial** Pueblo +3 · Élite −4
- **B. Encabezaré yo los homenajes** Élite +4 · Pueblo −3

### 26. Los campos de trabajo

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14.

**Carta:** «Hay jóvenes con el pelo largo, curas y «desviados». Trabajar en el campo y cortar caña los reformaría.»

- **A. Que el trabajo los haga hombres** Ejército +6 · Pueblo −7 · Bandera: `campos_trabajo`
- **B. Que lleven el pelo como quieran** Ejército −6 · Pueblo +7

**Consecuencia futura de `campos_trabajo`:** Intelectuales denuncian los campos de trabajo.
