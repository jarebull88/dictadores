# Cartas · Era 3: El Culto

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 24 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.2.

### 1. Elecciones controladas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `elecciones_prometidas`.

**Carta:** «Se acercan las elecciones prometidas. El Partido propone lista única, «para comodidad del votante».»

- **A. Papeleta única: Partido o Partido** Pueblo −6 · Élite +5
- **B. Abran las listas a la oposición** Pueblo +6 · Élite −5

### 2. Una carta con firmas

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige alguna de `policia_tradicional`, `exiliados_vocales`, `critica_abierta`, `campos_trabajo`.

**Carta:** «Un grupo de intelectuales firmó una carta reclamando los derechos que usted mismo prometió.»

- **A. Abran un diálogo con los firmantes** Pueblo +6 · Ejército −4 · Élite −3
- **B. Prohíban la carta y a sus autores** Pueblo −6 · Ejército +5 · Élite +3

### 3. El plan quinquenal

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 8.

**Carta:** «Proponemos un plan quinquenal con metas para cada fábrica, granja y tienda del país.»

- **A. Que el éxito quede por escrito** Élite +5 · Pueblo −4 · Crisis +2
- **B. Que el mercado fije los precios** Pueblo +4 · Élite −4

### 4. El monumento

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era; exige `culto_iniciado`.

**Carta:** «El Partido propone un monumento de 40m en su honor, visible desde toda la costa y los barrios»

- **A. Cuarenta metros, ni uno menos** Élite +5 · Pueblo −4 · Crisis +2 · Bandera: `monumento_colosal` · Encola: `pedestal` en 2 a 3 años
- **B. Que el dinero se gaste en escuelas** Élite −4 · Pueblo +4 · Bandera: `monumento_modesto`

### 5. El pedestal

**Personaje:** Ministro de Economía  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «El monumento costó el doble y no se terminó: la estatua tiene un solo brazo.»

- **A. Termínenla, cueste lo que cueste** Élite +4 · Pueblo −4 · Crisis +2
- **B. Un brazo basta para saludar** Élite −3 · Pueblo +3 · Crisis −1

### 6. La modestia sospechosa

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `modestia_aparente`.

**Carta:** «Su rechazo a los retratos se toma por desapego al Partido. Quieren una demostración de lealtad.»

- **A. Que cuelguen mi retrato en cada sede** Élite +4 · Pueblo −4
- **B. Que el Partido trabaje y no adore** Élite −4 · Pueblo +4

### 7. El desfile del año

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `desfile_militar`.

**Carta:** «Las Fuerzas Armadas esperan un desfile mayor que el del año pasado: más tanques y más soldados.»

- **A. Desfile por todo lo alto** Ejército +7 · Pueblo −5 · Crisis +2
- **B. Desfile austero, con lo que haya** Ejército −6 · Pueblo +4

### 8. El jefe insaciable

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `jefe_poderoso`.

**Carta:** «Mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto secreto.»

- **A. Tendrá batallón, cárcel y fondos** Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `estado_policial`
- **B. Que se apañen con lo que hay** Ejército −8 · Élite +3 · Pueblo +4

**Consecuencia futura de `estado_policial`:** El batallón del Interior pide más sueldos y más cárceles.

### 9. Las aulas vacías

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige alguna de `estudiantes_reprimidos`, `huelga_reprimida`.

**Carta:** «Algunos profesores se atreven a enseñar historia sin citarle a usted.»

- **A. Enseñen que la historia me absolverá** Élite +5 · Pueblo −5
- **B. Libertad de cátedra, de momento** Pueblo +5 · Élite −5

### 10. Los titulares

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `periodista_oficial`.

**Carta:** «El periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.»

- **A. Seis páginas y el horóscopo** Élite +5 · Pueblo −3
- **B. Con tres páginas es suficiente** Élite −4 · Pueblo +3

### 11. Los presos en la agenda

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `criticos_detenidos`.

**Carta:** «Tenemos una lista de presos políticos. Esperamos que los libere como gesto de buena fe.»

- **A. Liberaré a algunos, por mi cumple** Potencias +6 · Ejército −5 · Pueblo +3
- **B. ¿Qué presos? Que revisen su lista** Potencias −6 · Ejército +5 · Pueblo −3

### 12. El mercado mayor

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `mercado_paralelo`.

**Carta:** «El mercado paralelo vende más que las tiendas del Estado, y algunos funcionarios cobran en divisas.»

- **A. Permitan pequeños negocios privados** Pueblo +6 · Élite −5 · Crisis −1
- **B. Persigan a los vendedores** Pueblo −6 · Élite +3 · Ejército +3 · Crisis +1

### 13. La ciudad con su nombre

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «El Partido propone rebautizar la capital con su nombre.»

- **A. Que la capital lleve mi nombre** Élite +5 · Pueblo −3 · Bandera: `capital_rebautizada`
- **B. Basta con el estadio y el aeropuerto** Élite −3 · Pueblo +3

### 14. El himno nuevo

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «El himno nacional no le menciona. Proponemos una nueva versión.»

- **A. Y que se cante a diario en clase** Élite +4 · Pueblo −3
- **B. Dejen el himno como está** Élite −3 · Pueblo +3

### 15. El libro de texto

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10.

**Carta:** «Tenemos listo un libro con su vida y sus ideas. Lo exigiremos en todas las escuelas.»

- **A. Que se evalúe en los exámenes** Élite +5 · Pueblo −5 · Bandera: `libro_obligatorio`
- **B. Libro opcional, en las bibliotecas** Élite −4 · Pueblo +4

### 16. El cumpleaños nacional

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «Su cumpleaños merece ser fiesta nacional, con discursos y día libre.»

- **A. Que todo el país sople las velas** Pueblo −2 · Élite +4 · Crisis +2
- **B. Ese día, todos a trabajar** Pueblo −2 · Élite −2 · Crisis −1

### 17. El documental

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «El documental de la Revolución está listo, pero en las tomas de la sierra se le ve algo rellenito.»

- **A. Repitan con un actor con abdominales** Élite +4 · Pueblo −3
- **B. La hamaca fue mi trinchera** Élite −3 · Pueblo +3

### 18. El palacio del Pueblo

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Proponemos un nuevo palacio de gobierno. Cuesta cinco años de presupuesto y tres barrios enteros.»

- **A. El viejo palacio se nos queda chico** Élite +3 · Pueblo −6 · Crisis +3 · Bandera: `palacio_del_pueblo`
- **B. Ese dinero, para viviendas** Pueblo +4 · Crisis −1

**Consecuencia futura de `palacio_del_pueblo`:** Las deudas del palacio siguen sin pagarse.

### 19. La sucesión

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «El Partido pregunta quién le sucederá. Si no lo designa, algunos ministros se designarán solos.»

- **A. Designo sucesor a mi hermano** Élite −3 · Ejército +4 · Bandera: `sucesor_designado`
- **B. Yo soy la Revolución, y no muero** Élite −2 · Crisis +3

**Consecuencia futura de `sucesor_designado`:** El sucesor empieza a hacerse notar.

### 20. El beso fraterno

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 8.

**Carta:** «Nuestro máximo dirigente desea abrazarle ante las cámaras. Será una foto para la Historia.»

- **A. Abrazo que todos digan «¡Ohhh!»** Potencias +6
- **B. Apretón de manos, que hace calor** Potencias −5

### 21. El viaje oficial

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 8.

**Carta:** «Nuestro presidente le invita dos semanas, con cenas, desfiles y un acuerdo comercial ya preparado.»

- **A. Encantado, llevaré los puros** Potencias +6
- **B. Imposible, tengo mucho que dirigir** Potencias −5

### 22. El atentado

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 5 a 7 de su era.

**Carta:** «Los terroristas del exilio han volado uno de nuestros aviones. Setenta y tres muertos.»

- **A. Funeral con un millón en la plaza** Pueblo +4 · Élite +2 · Encola: `los_que_celebran` en 1 a 2 años
- **B. Habrá que defenderse infiltrándolos** Ejército +4 · Potencias −3 · Bandera: `atentado_investigado`

**Consecuencia futura de `atentado_investigado`:** Tus agentes en el exilio corren peligro.

### 23. Los que celebran

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Algunos opositores celebraron el atentado del avión. Los tenemos localizados.»

- **A. Que celebren en la cárcel** Ejército +7 · Pueblo −6 · Bandera: `oposicion_culpada` · Encola: `la_investigacion` en 1 a 2 años
- **B. Que los vecinos les den la respuesta** Élite +4 · Pueblo −3

**Consecuencia futura de `oposicion_culpada`:** La oposición recuerda al acusado injusto.

### 24. La investigación

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Los acusados del atentado lo niegan todo. Uno de ellos lleva dos años muerto.»

- **A. Que confiese también el difunto** Ejército +5 · Pueblo −5
- **B. Suéltenlos sin pedirles perdón** Ejército −5 · Pueblo +5
