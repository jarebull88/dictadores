# Cartas · Era 3: El Culto

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 24 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.7.

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

### 3. Las vallas

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Queremos poner sus frases épicas en vallas por todo el país, pero no hay pintura para todo.»

- **A. Si faltan frases que me avisen** Élite +4 · Pueblo −4
- **B. Que la pintura vaya a las escuelas** Pueblo +4 · Élite −4

### 4. La autocrítica del poeta

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Hemos detenido a un poeta premiado por sus versos contra el gobierno. Ofrece retractarse en público.»

- **A. Que sus colegas oigan su autocrítica** Ejército +4 · Pueblo −3
- **B. Que publique, la poesía no muerde** Pueblo +3 · Ejército −4

### 5. La guerra lejana

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Nos piden soldados para una guerra de liberación al otro lado del mar. El Ejército está listo.»

- **A. Que el océano no frene la Revolución** Ejército +5 · Pueblo −3
- **B. Que se liberen solos, como nosotros** Pueblo +3 · Ejército −5

### 6. Diez mil en una embajada

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Un autobús ha entrado en una embajada por la verja y detrás diez mil personas.»

- **A. Abran el puerto a quien quiera irse** Pueblo −4 · Potencias +4 · Crisis −2
- **B. Corten el agua y espérenlos fuera** Ejército +4 · Potencias −4

### 7. El diálogo con el exilio

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Los exiliados quieren volver de visita a ver a sus familias, cargados de regalos y de dólares.»

- **A. Mis gusanos ahora son mariposas** Pueblo +4 · Élite −4
- **B. Los traidores no tienen familia** Élite +4 · Pueblo −4

### 8. El boicot

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10; a partir del año 5 de la era.

**Carta:** «Boicotearemos las olimpiadas que organiza el enemigo. Esperamos que sus atletas tampoco vayan.»

- **A. El mejor deporte es la lealtad** Potencias +4 · Pueblo −3
- **B. No les robaré el sueño a mis atletas** Pueblo +3 · Potencias −4

### 9. El discurso

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «Hoy le toca dar el discurso del aniversario. La televisión pregunta cuántas horas le reserva.»

- **A. Hablaré hasta que amanezca** Élite +4 · Pueblo −3
- **B. Diez minutos y que empiece la fiesta** Pueblo +3 · Élite −4

### 10. El plan quinquenal

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 8.

**Carta:** «Proponemos un plan quinquenal con metas para cada fábrica, granja y tienda del país.»

- **A. Que el éxito quede por escrito** Élite +5 · Pueblo −4 · Crisis +2
- **B. Que el mercado fije los precios** Pueblo +4 · Élite −4

### 11. La modestia sospechosa

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `modestia_aparente`.

**Carta:** «Su rechazo a los retratos se toma por desapego al Partido. Quieren una demostración de lealtad.»

- **A. Que cuelguen mi retrato en cada sede** Élite +4 · Pueblo −4
- **B. Que el Partido trabaje y no adore** Élite −4 · Pueblo +4

### 12. El desfile del año

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `desfile_militar`.

**Carta:** «Las Fuerzas Armadas esperan un desfile mayor que el del año pasado: más tanques y más soldados.»

- **A. Desfile por todo lo alto** Ejército +7 · Pueblo −5 · Crisis +2
- **B. Desfile austero, con lo que haya** Ejército −6 · Pueblo +4

### 13. El jefe insaciable

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `jefe_poderoso`.

**Carta:** «Mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto secreto.»

- **A. Tendrá batallón, cárcel y fondos** Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `estado_policial`
- **B. Que se apañen con lo que hay** Ejército −8 · Élite +3 · Pueblo +4

**Consecuencia futura de `estado_policial`:** El batallón del Interior pide más sueldos y más cárceles.

### 14. Las aulas vacías

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige alguna de `estudiantes_reprimidos`, `huelga_reprimida`.

**Carta:** «Algunos profesores se atreven a enseñar historia sin citarle a usted.»

- **A. Enseñen que la historia me absolverá** Élite +5 · Pueblo −5
- **B. Libertad de cátedra, de momento** Pueblo +5 · Élite −5

### 15. Los titulares

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `periodista_oficial`.

**Carta:** «El periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.»

- **A. Seis páginas y el horóscopo** Élite +5 · Pueblo −3
- **B. Con tres páginas es suficiente** Élite −4 · Pueblo +3

### 16. Los presos en la agenda

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `criticos_detenidos`.

**Carta:** «Tenemos una lista de presos políticos. Esperamos que los libere como gesto de buena fe.»

- **A. Liberaré a algunos, por mi cumple** Potencias +6 · Ejército −5 · Pueblo +3
- **B. ¿Qué presos? Que revisen su lista** Potencias −6 · Ejército +5 · Pueblo −3

### 17. El mercado mayor

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `mercado_paralelo`.

**Carta:** «El mercado paralelo vende más que las tiendas del Estado, y algunos funcionarios cobran en divisas.»

- **A. Permitan pequeños negocios privados** Pueblo +6 · Élite −5 · Crisis −1
- **B. Persigan a los vendedores** Pueblo −6 · Élite +3 · Ejército +3 · Crisis +1

### 18. El documental

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «El documental de la Revolución está listo, pero en las tomas de la sierra se le ve algo rellenito.»

- **A. Repitan con un actor con abdominales** Élite +4 · Pueblo −3
- **B. La hamaca fue mi trinchera** Élite −3 · Pueblo +3

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

**Carta:** «Los terroristas del exilio han volado uno de nuestros aviones con setenta y tres pasajeros.»

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

**Carta:** «Los acusados del atentado lo niegan todo. A uno de ellos lo enterraron hace dos años.»

- **A. Que confiese también el difunto** Ejército +5 · Pueblo −5
- **B. Suéltenlos sin pedirles perdón** Ejército −5 · Pueblo +5
