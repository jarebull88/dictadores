# Cartas · Era 3: Culto

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 25 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.75.

### 1. El monumento

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era; exige `culto_iniciado`.

**Carta:** «Excelencia, el Partido ha diseñado un monumento de cuarenta metros en su honor. Se verá desde todos los barrios y desde la costa.»

- **A. Monumento colosal.** *Me conmueve que el Pueblo me vea como a un padre.* Élite +7 · Pueblo −6 · Crisis +2 · Bandera: `monumento_colosal` · Encola: `pedestal` en 2 a 3 años
- **B. Monumento modesto.** *El Pueblo no necesita mármol para saber quién lo protege.* Élite −7 · Pueblo +6 · Bandera: `monumento_modesto`

**Archivo histórico:** En 1998, en Asjabad, el presidente turcomano Saparmurat Niyazov inauguró el Arco de la Neutralidad, coronado por una estatua dorada de doce metros que giraba para mirar siempre al sol.

### 2. El pedestal

**Personaje:** Ministro de Economía  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Excelencia, el pedestal costó el doble de lo previsto y el bronce llegó incompleto: la estatua tiene un solo brazo.»

- **A. Terminar la estatua.** *El Padre de la Patria no puede aparecer manco.* Élite +5 · Pueblo −6 · Crisis +2
- **B. Dejarla con un brazo.** *Un gesto de humildad también educa al Pueblo.* Élite −5 · Pueblo +6 · Crisis −1

### 3. La modestia sospechosa

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `modestia_aparente`.

**Carta:** «Excelencia, su rechazo a los retratos se ha interpretado como falsa humildad. El Partido propone una gran demostración de lealtad.»

- **A. Aceptar la demostración.** *No quiero contrariar al Pueblo en una muestra de cariño.* Élite +6 · Ejército +3 · Pueblo −5
- **B. Insistir en la modestia.** *La lealtad verdadera no necesita tantas ceremonias.* Élite −6 · Ejército −3 · Pueblo +5

**Archivo histórico:** En la China de 1966, el Pequeño Libro Rojo con citas de Mao Zedong se distribuyó en cientos de millones de ejemplares, y recitarlo y lucir sus chapas se volvió una prueba de lealtad casi obligatoria.

### 4. El desfile del año

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `desfile_militar`.

**Carta:** «Excelencia, el Ejército espera un desfile mayor que el del año pasado: más tanques, más soldados y, por tradición, caballería.»

- **A. Desfile aún mayor.** *El Pueblo debe ver que la Revolución sigue fuerte.* Ejército +8 · Élite +3 · Pueblo −7 · Crisis +2
- **B. El mismo desfile.** *La fuerza de la Revolución no se mide en tanques.* Ejército −8 · Élite −3 · Pueblo +7

**Archivo histórico:** Hasta 1990, el 7 de noviembre se celebraba en la Plaza Roja de Moscú un desfile militar por el aniversario de la revolución rusa de 1917, con los dirigentes saludando desde el mausoleo de Lenin.

### 5. Los satélites

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `misiles_instalados`.

**Carta:** «Excelencia, nuestros satélites siguen contando sus misiles y pedimos una inspección. Aceptarla evitaría un incidente mayor.»

- **A. Permitir la inspección.** *Que inspeccionen; para entonces ya habremos hecho el cambio.* Potencias +8 · Ejército −7 · Élite +2
- **B. Negarse.** *La soberanía no se inspecciona.* Potencias −8 · Ejército +7 · Élite −2 · Crisis +1

**Archivo histórico:** Los vuelos de reconocimiento U-2 sobre Cuba, en octubre de 1962, fotografiaron los emplazamientos de misiles soviéticos. El 27 de octubre un U-2 fue derribado sobre la isla.

### 6. El aliado enfadado

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 14; exige `misiles_rechazados`.

**Carta:** «Excelencia, nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.»

- **A. Pedir disculpas.** *Una amistad duradera también exige saber pedir perdón.* Potencias +8 · Pueblo −6 · Ejército −2
- **B. Buscar otro proveedor.** *El petróleo no tiene ideología, solo precio.* Potencias −8 · Pueblo +6 · Ejército +2 · Crisis +1

**Archivo histórico:** En 1960, en plena ruptura chino-soviética, la Unión Soviética retiró a sus asesores técnicos de China y suspendió numerosos proyectos conjuntos.

### 7. El jefe insaciable

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `jefe_poderoso`.

**Carta:** «Excelencia, mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto que no figure en ningún presupuesto.»

- **A. Autorizar el batallón.** *Quiero que tengan todo lo necesario para proteger la Revolución.* Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `estado_policial`
- **B. Recortarle el presupuesto.** *Que vigilen al Pueblo sin crear un gobierno dentro del Gobierno.* Ejército −8 · Élite +5 · Pueblo +4

**Consecuencia futura de `estado_policial`:** El batallón del Interior pide más sueldos y más cárceles.

**Archivo histórico:** Erich Mielke dirigió el Ministerio para la Seguridad del Estado de la República Democrática Alemana, la Stasi, de 1957 a 1989. En 1989 la organización contaba con unos noventa mil empleados.

### 8. Las aulas vacías

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige alguna de `estudiantes_reprimidos`, `huelga_reprimida`.

**Carta:** «Excelencia, la universidad sigue vacía y circulan apuntes clandestinos. Algunos profesores enseñan historia sin citarle a usted.»

- **A. Exigir lealtad a profesores.** *Las notas medirán tanto los conocimientos como la lealtad.* Élite +5 · Ejército +3 · Pueblo −6
- **B. Reabrir las facultades.** *La Revolución necesita aulas llenas, no héroes universitarios.* Pueblo +6 · Élite −5 · Ejército −3

**Archivo histórico:** En 1989, estudiantes ocuparon durante semanas la plaza de Tiananmén, en Pekín. Los días 3 y 4 de junio el ejército la despejó.

### 9. Los titulares

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `periodista_oficial`.

**Carta:** «Excelencia, el periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.»

- **A. Seis páginas diarias.** *El Pueblo merece seis páginas diarias de buenas noticias.* Élite +6 · Ejército +2 · Pueblo −5
- **B. Tres páginas bastan.** *El Pueblo ya conoce mi obra; no hace falta repetirla tanto.* Élite −6 · Ejército −2 · Pueblo +5

**Archivo histórico:** En la Rumanía de Ceaușescu, el diario del Partido, Scînteia, dedicaba su portada casi a diario a los discursos y las visitas del dirigente.

### 10. Los presos en la agenda

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `criticos_detenidos`.

**Carta:** «Excelencia, una organización extranjera publica la lista de sus presos políticos. Nuestro país pide su liberación como gesto de buena voluntad.»

- **A. Liberar a algunos.** *Liberemos a los más ancianos para no gastar en entierros.* Potencias +8 · Ejército −6 · Élite −2
- **B. Negar que existan.** *En mi país no hay presos políticos, solo ciudadanos confundidos.* Potencias −8 · Ejército +6 · Élite +2

**Archivo histórico:** En 1975 se firmaron los Acuerdos de Helsinki, que incluían compromisos sobre derechos humanos. En 1977 Amnistía Internacional recibió el Premio Nobel de la Paz por su trabajo con los presos de conciencia.

### 11. El acreedor pide favores

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `deuda_externa`.

**Carta:** «Excelencia, el acreedor aplazará el pago a cambio de un favor: nuestro voto en los foros internacionales durante años.»

- **A. Vender nuestro voto.** *La diplomacia también sirve para pagar deudas.* Potencias +8 · Élite +3 · Pueblo −5 · Crisis −2
- **B. Pagar con lo que haya.** *La Revolución honra sus deudas, aunque el Pueblo pague la cuenta.* Potencias −8 · Élite −3 · Pueblo +5 · Crisis +2

**Archivo histórico:** En 1982, México anunció que no podía pagar su deuda externa y abrió la crisis de la deuda latinoamericana. Los préstamos posteriores llegaron con condiciones de ajuste exigidas por el Fondo Monetario Internacional.

### 12. El mercado mayor

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `mercado_paralelo`.

**Carta:** «Excelencia, el mercado paralelo vende más que las tiendas del Estado. Algunos funcionarios ya cobran en especie y otros, en dólares.»

- **A. Legalizar el mercado.** *Si el Pueblo compra allí, será mejor que tribute aquí.* Pueblo +6 · Élite −4 · Ejército −2 · Crisis −1
- **B. Perseguir a los vendedores.** *La escasez también debe tener licencia.* Pueblo −6 · Élite +4 · Ejército +2 · Crisis +1

**Archivo histórico:** En la Unión Soviética de los años setenta y ochenta, una parte importante de los bienes y servicios circulaba por canales no oficiales, y la escasez alimentaba el mercado negro.

### 13. La ciudad con su nombre

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, la capital merece un nombre a su altura. El Partido propone sustituir el actual por el suyo, con avenida incluida.»

- **A. Rebautizar la capital.** *Que el Pueblo pueda pronunciar mi nombre al pedir una dirección.* Élite +6 · Pueblo −5 · Ejército +2 · Bandera: `capital_rebautizada`
- **B. Solo una avenida.** *Una avenida recuerda a un hombre; una capital pertenece al Pueblo.* Élite −6 · Pueblo +5 · Ejército −2

**Archivo histórico:** En 1936, Santo Domingo, la capital de la República Dominicana, fue rebautizada como Ciudad Trujillo en honor del dictador Rafael Trujillo. Recuperó su nombre en 1961.

### 14. El himno nuevo

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, el himno nacional no le menciona. Proponemos una versión con cuarenta estrofas, treinta sobre usted.»

- **A. Himno de cuarenta estrofas.** *El Pueblo necesita tiempo para aprender a agradecer.* Élite +5 · Ejército +3 · Pueblo −6
- **B. Solo el estribillo.** *Mi nombre en el estribillo bastará para que nadie lo olvide.* Élite −5 · Ejército −3 · Pueblo +6

**Archivo histórico:** El himno de la Unión Soviética adoptado en 1944 incluía versos de alabanza a Stalin. Tras su muerte se dejó sin letra, y en 1977 se estrenó una nueva letra sin su nombre.

### 15. El libro de texto

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, proponemos un libro con su vida y sus pensamientos, obligatorio en todas las escuelas y para obtener el carné de conducir.»

- **A. Libro obligatorio.** *Quien no lo apruebe no sabrá de qué le acusan.* Élite +5 · Ejército +3 · Pueblo −6 · Bandera: `libro_obligatorio`
- **B. Libro opcional.** *Si es bueno, se leerá; y si no, también.* Élite −5 · Ejército −3 · Pueblo +6

**Archivo histórico:** En Turkmenistán, el libro Ruhnama, firmado por el presidente Niyazov en 2001, fue lectura obligatoria en las escuelas y se examinaba también en las pruebas para obtener el carné de conducir.

### 16. El cumpleaños nacional

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, el Partido propone declarar fiesta nacional el día de su cumpleaños, con desfile, discursos y un día libre para todos.»

- **A. Fiesta nacional.** *Un día al año para que el Pueblo celebre a quien lo protege.* Pueblo +6 · Élite +3 · Ejército −3 · Crisis +2
- **B. Cumpleaños privado.** *Prefiero que el Pueblo celebre nuestras conquistas, no mi cumpleaños.* Pueblo −6 · Élite −3 · Ejército +3 · Crisis −1

**Archivo histórico:** El 21 de diciembre de 1949, el 70.º cumpleaños de Stalin se celebró en la Unión Soviética y en todo el bloque con actos, regalos y homenajes oficiales.

### 17. La biografía oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, algunos historiadores dicen que usted no hizo la Revolución, sino que llegó al final. La biografía oficial está lista.»

- **A. Reescribir la biografía.** *La Historia la escriben los vencedores, y nosotros vencimos.* Élite +5 · Pueblo −5 · Ejército +2
- **B. Dejarla como está.** *La Historia sabrá poner cada nombre en su sitio.* Élite −5 · Pueblo +5 · Ejército −2

**Archivo histórico:** En 1938 se publicó el Breve curso de historia del Partido Comunista de la URSS, un manual oficial en el que Stalin intervino personalmente y cuya lectura fue obligatoria durante años.

### 18. El mausoleo

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «Excelencia, el Partido ruega prever un mausoleo para cuando le llegue la hora. Los embalsamadores ya están en nómina.»

- **A. Construir el mausoleo.** *La Historia merece un lugar donde visitarme.* Élite +5 · Pueblo −5 · Crisis +2 · Bandera: `mausoleo_construido`
- **B. Sepultura sencilla.** *No hace falta pensar en mi tumba mientras sigo dando órdenes.* Élite −5 · Pueblo +5 · Crisis −1

**Consecuencia futura de `mausoleo_construido`:** Un edificio eterno que hay que mantener.

**Archivo histórico:** Tras la muerte de Lenin, en 1924, su cuerpo fue embalsamado y expuesto en un mausoleo en la Plaza Roja de Moscú, donde permanece abierto al público.

### 19. El palacio del pueblo

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, el nuevo palacio costará cinco años de presupuesto y exige derribar tres barrios enteros.»

- **A. Derribar los barrios.** *Una gran Revolución necesita un palacio a su altura.* Élite +6 · Ejército +2 · Pueblo −8 · Crisis +3 · Bandera: `palacio_del_pueblo`
- **B. Buscar otro solar.** *El palacio puede esperar; los vecinos viven ahí.* Élite −6 · Ejército −2 · Pueblo +8 · Crisis −1

**Consecuencia futura de `palacio_del_pueblo`:** Las deudas del palacio siguen sin pagarse.

**Archivo histórico:** En 1984 comenzó en Bucarest la construcción de la Casa del Pueblo, hoy Palacio del Parlamento, para lo cual se demolió una parte importante del centro histórico de la ciudad.

### 20. La zafra de los diez millones

**Personaje:** Ministro de Agricultura  
**Condición:** sorteo con peso 10.

**Carta:** «Excelencia, para batir el récord de la zafra proponemos movilizar durante tres meses a estudiantes, oficinistas y soldados.»

- **A. Todos a la zafra.** *El que corta caña no conspira.* Pueblo −6 · Ejército +3 · Élite +3 · Crisis −1
- **B. Contratar jornaleros.** *La Revolución también puede pagar a quien trabaja.* Pueblo +6 · Ejército −3 · Élite −3 · Crisis +1

**Archivo histórico:** En 1970 Cuba se propuso una zafra de diez millones de toneladas de azúcar. Movilizó a media población y logró unos ocho millones y medio, la mayor de su historia, a costa de desorganizar el resto de la economía.

### 21. La sucesión

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «Excelencia, el Partido pregunta quién le sucederá. Si no lo designa usted, algunos ministros empezarán a designarse solos.»

- **A. Designar sucesor.** *El sucesor debe aprender a esperar; yo tuve que hacerlo.* Élite +6 · Ejército −5 · Potencias +2 · Bandera: `sucesor_designado`
- **B. Sin sucesor.** *Un líder eterno no necesita explicar quién viene después.* Élite −6 · Ejército +5 · Potencias −2

**Consecuencia futura de `sucesor_designado`:** El sucesor empieza a hacerse notar.

**Archivo histórico:** En octubre de 1980, el VI Congreso del Partido del Trabajo de Corea mostró en público a Kim Jong-il como sucesor de su padre, Kim Il-sung.

### 22. El beso fraterno

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 8.

**Carta:** «Excelencia, nuestro máximo dirigente desea un abrazo fraternal con usted ante las cámaras. Será una foto para la Historia.»

- **A. Abrazo y beso.** *Que la Historia vea que la Revolución tiene amigos poderosos.* Potencias +7 · Pueblo −5 · Élite −2
- **B. Apretón de manos.** *Una mano firme también puede estrecharse sin besar.* Potencias −7 · Pueblo +5 · Élite +2

**Archivo histórico:** En octubre de 1979, durante el 30.º aniversario de la República Democrática Alemana, Leonid Brézhnev y Erich Honecker se besaron en la boca. La foto, de Régis Bossu, fue pintada en 1990 en el Muro de Berlín.

### 23. El viaje oficial

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 8.

**Carta:** «Excelencia, nuestro presidente le invita a una visita oficial de dos semanas, con cenas, desfiles y un acuerdo comercial preparado.»

- **A. Aceptar el viaje.** *Dos semanas de aplausos extranjeros valen un par de riesgos.* Potencias +8 · Élite +3 · Ejército −7
- **B. Quedarse en el país.** *El Pueblo no puede pasar dos semanas sin escucharme.* Potencias −8 · Élite −3 · Ejército +7

**Archivo histórico:** En marzo de 1970, el príncipe Norodom Sihanouk, jefe del Estado de Camboya, fue depuesto por un golpe mientras viajaba por el extranjero.

### 24. El atentado

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 5 a 7 de su era.

**Carta:** «Excelencia, una bomba ha estallado cerca del palacio, sin heridos. Podemos investigarla o culpar a la oposición.»

- **A. Culpar a la oposición.** *La Revolución no desperdicia una buena conspiración.* Ejército +8 · Pueblo −6 · Potencias −2 · Bandera: `oposicion_culpada` · Encola: `la_investigacion` en 1 a 2 años
- **B. Investigar de verdad.** *Una investigación honesta podría dejarnos sin culpables.* Ejército −8 · Pueblo +6 · Potencias +2 · Bandera: `atentado_investigado`

**Consecuencia futura de `oposicion_culpada`:** La oposición recuerda al acusado injusto.

**Archivo histórico:** El asesinato de Serguéi Kírov, jefe del Partido en Leningrado, el 1 de diciembre de 1934, fue seguido de leyes de excepción y de detenciones masivas que abrieron paso a la Gran Purga.

### 25. La investigación

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Excelencia, los detenidos por el atentado lo niegan. Dos tienen coartada y uno, incluso, certificado de defunción.»

- **A. Mantener la acusación.** *Los certificados de defunción también confiesan.* Ejército +6 · Pueblo −5 · Potencias −3
- **B. Liberar a los acusados.** *Liberarlos sería reconocer un error, y la Revolución no se equivoca.* Ejército −6 · Pueblo +5 · Potencias +3
