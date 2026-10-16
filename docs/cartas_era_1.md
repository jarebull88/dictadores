# Cartas · Era 1: La Revolución

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 34 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Hemos tomado el palacio. Los ministros del tirano no huyeron a tiempo y el Pueblo pide justicia.»

- **A. Juicio público en el estadio** Pueblo +8 · Élite −7 · Potencias −5 · Bandera: `juicios_publicos`
- **B. Tienen 24 horas para irse** Pueblo −8 · Élite +7 · Potencias +5 · Bandera: `exiliados_vocales`

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

### 2. La casa del tirano

**Personaje:** Ministra de Cultura  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «La mansión del tirano tiene piscina, cine y veinte habitaciones. Podría ser un museo o su casa.»

- **A. Museo del Pueblo** Pueblo +8 · Élite −6
- **B. Me mudo yo** Pueblo −8 · Élite +6

### 3. Las arcas vacías

**Personaje:** Ministro de Economía  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «El tirano huyó con la reserva del Banco Nacional. No hay para pagar los sueldos de este mes.»

- **A. Impriman billetes** Pueblo +5 · Élite −4 · Potencias −4 · Bandera: `mercado_paralelo`
- **B. Pidan un préstamo** Pueblo −5 · Élite +4 · Potencias +4 · Bandera: `deuda_externa`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 4. El general querido

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El general Cienfuegos es muy popular y quiere ser jefe del Estado Mayor.»

- **A. Denle el Estado Mayor** Ejército +9 · Élite −4 · Bandera: `general_popular`
- **B. Embajador donde haga frío** Ejército −9 · Élite +4 · Bandera: `general_apartado`

**Consecuencia futura de `general_popular`:** Cienfuegos conspira si el Ejército baja de 40.

**Consecuencia futura de `general_apartado`:** Cienfuegos regresa como candidato de los descontentos.

### 5. Las refinerías

**Personaje:** Ministro de Comercio  
**Condición:** ancla de los años 3 a 6 de su era; a partir del año 3 de la era.

**Carta:** «Las refinerías extranjeras nos cierran las puertas y amenazan con dejarnos sin gasolina.»

- **A. Negociemos** Potencias +10 · Élite +6 · Pueblo −8 · Bandera: `negocio_refinerias`
- **B. ¡Exprópiese!** Pueblo +8 · Élite −6 · Potencias −10 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 3 a 8 años

**Consecuencia futura de `negocio_refinerias`:** Las empresas exigen garantías que limitan tus decisiones económicas.

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

### 6. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 4 a 7 de su era; a partir del año 4 de la era.

**Carta:** «Nuestro país le ofrece ayuda económica y militar. A cambio, solo pedimos su lealtad.»

- **A. Lealtad a cambio de petróleo** Potencias +9 · Pueblo +5 · Élite −6 · Crisis +2 · Bandera: `alineado_bloque_oriental`
- **B. La Revolución no tiene dueño** Élite +6 · Potencias −9 · Pueblo −5 · Crisis +1 · Bandera: `no_alineado`

**Consecuencia futura de `alineado_bloque_oriental`:** El aliado exige concesiones y armamento.

**Consecuencia futura de `no_alineado`:** La potencia del norte se acerca y el aislamiento económico se agrava.

### 7. El embargo

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Han expropiado nuestras refinerías. Exigimos compensación o habrá embargo.»

- **A. Que nos embarguen** Pueblo +9 · Potencias −9 · Élite −5 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Pagaremos… algo** Potencias +9 · Élite +5 · Pueblo −9 · Crisis +2 · Bandera: `compensaciones`

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

**Consecuencia futura de `compensaciones`:** Una deuda que alimenta una carta de crisis.

### 8. La lista *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Ya sabemos quiénes nos critican. Sus vecinos han sido muy colaboradores.»

- **A. Que critiquen con moderación** Pueblo +8 · Ejército −5 · Potencias +5
- **B. A la cárcel por orden alfabético** Pueblo −8 · Ejército +5 · Élite +4 · Potencias −5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 9. La tierra

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 12.

**Carta:** «Repartamos las tierras entre los campesinos y en un año seremos el granero del mundo.»

- **A. Respeten la propiedad todavía** Pueblo −10 · Élite +8
- **B. La tierra para quien la merece** Pueblo +10 · Élite −8 · Potencias −4 · Crisis +1 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

### 10. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «La prensa no para de criticar nuestros decretos.»

- **A. Que publiquen** Pueblo +6 · Potencias +6 · Ejército −4 · Bandera: `prensa_libre`
- **B. Nacionalicen la imprenta** Pueblo −6 · Élite +5 · Potencias −5 · Bandera: `censura_previa`

**Consecuencia futura de `prensa_libre`:** Un reportaje destapa un escándalo.

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

### 11. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «Prometimos elecciones en dieciocho meses. Ya han pasado doce.»

- **A. Elecciones en seis meses** Pueblo +9 · Potencias +7 · Ejército −4 · Élite −4 · Bandera: `elecciones_prometidas`
- **B. La Revolución ya fue votada** Pueblo −9 · Potencias −7 · Ejército +4 · Élite +4 · Bandera: `elecciones_aplazadas`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

### 12. La campaña de alfabetización

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6.

**Carta:** «Propongo una campaña de alfabetización: que en un año todo el Pueblo sepa leer.»

- **A. Un Pueblo culto y agradecido** Pueblo +10 · Élite −8
- **B. Un Pueblo que lee pregunta** Pueblo −10 · Élite +8

### 13. Las escuelas para todos

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6.

**Carta:** «Ningún niño debería pagar por aprender. Propongo que todas las escuelas sean públicas.»

- **A. Que todos aprendan lo mismo** Pueblo +7 · Élite −8 · Potencias −6
- **B. Algunos son más iguales que otros** Pueblo −7 · Élite +8 · Potencias +6

### 14. Los asesores

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 6; a partir del año 2 de la era.

**Carta:** «Le enviaremos asesores para su economía y su policía. Nos ocuparemos de que todo vaya bien.»

- **A. Aprenderemos de los mejores** Potencias +9 · Ejército +6 · Élite −7
- **B. Ya vamos bien sin ustedes** Potencias −9 · Ejército −6 · Élite +7

### 15. El club de golf

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 6.

**Carta:** «Reconoceremos su gobierno si respeta nuestras propiedades… sobre todo el club de golf.»

- **A. Le reservo el hoyo nueve** Potencias +9 · Pueblo −8
- **B. Sembraremos caña en el green** Potencias −9 · Pueblo +8

### 16. La bahía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 5 a 7 de su era.

**Carta:** «Hemos derrotado la invasión de la bahía. Tenemos mil doscientos prisioneros.»

- **A. Cámbienlos por compotas** Potencias +6 · Pueblo +3 · Ejército −5
- **B. Juicio televisado y paredón** Potencias −6 · Pueblo −3 · Ejército +5

### 17. Los niños que se van

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6; a partir del año 3 de la era.

**Carta:** «Cada semana salen aviones llenos de niños sin sus padres. Temen que la Revolución se los quede.»

- **A. Menos bocas que alimentar** Potencias +5 · Pueblo −5
- **B. Nadie se lleva a nuestros niños** Potencias −5 · Pueblo +5

### 18. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 6.

**Carta:** «Los artistas e intelectuales piden libertad para criticar al gobierno sin miedo.»

- **A. Que critiquen** Pueblo +8 · Élite −4 · Ejército −4 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 3 años
- **B. La Revolución no se cuestiona** Pueblo −8 · Ejército +4 · Élite +4

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

### 19. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Los oficiales del antiguo régimen siguen en sus puestos. ¿Qué hacemos?»

- **A. Jubílenlos** Ejército +7 · Élite +4 · Crisis +1 · Bandera: `viejos_oficiales`
- **B. ¡Al paredón!** Ejército −7 · Potencias −4 · Bandera: `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

### 20. El puerto parado

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; a partir del año 3 de la era.

**Carta:** «El puerto está parado. Los estibadores exigen un sindicato que no dependa del Partido.»

- **A. Que se organicen libremente** Pueblo +10 · Élite −7 · Ejército −4 · Crisis +1 · Bandera: `sindicato_libre`
- **B. Hacer huelga es sabotaje** Pueblo −10 · Élite +7 · Ejército +4 · Potencias −4 · Bandera: `huelga_reprimida`

**Consecuencia futura de `sindicato_libre`:** Los sindicatos libres quieren elegir a sus dirigentes sin el Partido.

**Consecuencia futura de `huelga_reprimida`:** Malestar en las universidades.

### 21. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8; exige alguna de `purga_inicial`, `censura_previa`.

**Carta:** «Los contrarrevolucionarios se esconden en los barrios. Los vecinos podrían ayudarnos a encontrarlos.»

- **A. La Revolución somos todos** Ejército +6 · Élite +3 · Pueblo −7 · Bandera: `comites_vigilancia`
- **B. No necesitamos chivatos** Pueblo +7 · Ejército −6 · Élite −3 · Bandera: `policia_tradicional`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

**Consecuencia futura de `policia_tradicional`:** La oposición se organiza con más facilidad.

### 22. El retrato

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 6; a partir del año 4 de la era.

**Carta:** «Quieren su retrato en cada aula y una estatua en la plaza. ¿Qué opina?»

- **A. Si insisten…** Pueblo +1 · Élite +6 · Ejército +4 · Crisis +1 · Bandera: `culto_iniciado`
- **B. No necesito estatuas** Pueblo −1 · Potencias +2 · Élite −6 · Ejército −4 · Bandera: `modestia_aparente`

**Consecuencia futura de `culto_iniciado`:** Tratamiento de Excelencia y monumentos cada vez más costosos.

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

### 23. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Los ricos hacen cola en el aeropuerto. Dicen que vuelven en cuanto caiga la Revolución.»

- **A. Que se vayan, sin el dinero** Pueblo +7 · Élite −7 · Potencias −4 · Crisis −1 · Bandera: `exodo_elite`
- **B. Nadie sale sin permiso** Ejército +6 · Élite +7 · Pueblo −7 · Potencias −8 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

### 24. La factura *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Hemos prometido demasiado y no queda dinero. Los precios se disparan y el Pueblo protesta.»

- **A. Precios congelados por decreto** Pueblo −10 · Élite +6 · Crisis −3
- **B. Pidan prestado al que sea** Potencias +8 · Élite +4 · Crisis −3 · Bandera: `deuda_externa`

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 25. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Las tiendas están vacías y en el mercado negro hay de todo, a precio de oro.»

- **A. Escasez, pero justa** Pueblo −8 · Ejército +4 · Élite −5 · Crisis −3
- **B. Ojos que no ven** Pueblo +8 · Élite +5 · Potencias −4 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 26. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Hay oficiales reuniéndose con los manifestantes. Si se unen, caemos.»

- **A. Asciendan a los indecisos** Ejército +12 · Élite −6 · Crisis +2
- **B. Detengan a los cabecillas** Pueblo −6 · Ejército +8 · Potencias −6

### 27. El dinero se va *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Los empresarios se reúnen con los embajadores. Si se alían, nos asfixian.»

- **A. Mimen a los empresarios** Élite +9 · Pueblo −8 · Crisis +2
- **B. Intervengan sus empresas** Potencias −8 · Pueblo +8 · Élite −9

### 28. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 8 a 10 de su era; exige `alineado_bloque_oriental`.

**Carta:** «Nuestro país le ofrece misiles de alcance medio, instalados y apuntando a donde usted diga.»

- **A. Ahora sí nos respetarán** Ejército +6 · Potencias +5 · Pueblo −5 · Élite −3 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 a 2 años
- **B. Nuestro misil es el Pueblo** Ejército −6 · Potencias −5 · Pueblo +5 · Élite +3 · Bandera: `misiles_rechazados`

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_rechazados`:** El aliado recuerda tu negativa.

### 29. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Nuestros barcos rodearán su costa hasta que retire los misiles.»

- **A. Que disfruten de la vista** Ejército +6 · Potencias −6 · Pueblo −3 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Se irán como nunca vinieron** Ejército −6 · Potencias +6 · Pueblo +3 · Crisis −1

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 30. El general murmura

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 8; exige `general_popular`; solo si Ejército está en 28 o menos.

**Carta:** «Cienfuegos está recibiendo oficiales en su casa. Dicen que habla de usted en pasado.»

- **A. Pregúntenle por sus hijos** Ejército +6 · Élite −4
- **B. Que tenga un accidente heroico** Ejército −6 · Pueblo −4 · Potencias −3 · Élite +4 · Bandera: `accidente_cienfuegos`

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Cienfuegos.

### 31. Las garantías

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 8; exige `negocio_refinerias`.

**Carta:** «Las empresas extranjeras exigen garantías: no más nacionalizaciones y sacar sus beneficios del país.»

- **A. Palabra de revolucionario** Potencias +6 · Élite +4 · Pueblo −5 · Crisis −1
- **B. Sus beneficios son del Pueblo** Potencias −6 · Pueblo +4 · Élite −4 · Crisis +1

### 32. Estudiantes en la calle

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 8; exige `elecciones_aplazadas`.

**Carta:** «Los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.»

- **A. Habrá elecciones, universitarias** Pueblo +5 · Ejército −4 · Élite −1
- **B. ¿Elecciones para qué?** Pueblo −6 · Ejército +4 · Potencias −3 · Bandera: `estudiantes_reprimidos`

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

### 33. La marcha de los eléctricos

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; exige `sindicato_libre`.

**Carta:** «Los trabajadores eléctricos marchan hacia el palacio. Exigen elegir a sus dirigentes sin el Partido.»

- **A. La Revolución respeta sus votos** Pueblo +6 · Élite −4 · Crisis +2
- **B. Que marchen hasta la cárcel** Pueblo −6 · Ejército +4 · Élite +4

### 34. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 8; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`; a partir del año 6 de la era.

**Carta:** «El embargo ya es total: no entran comida, medicinas ni repuestos.»

- **A. Cartilla de racionamiento** Pueblo −4 · Élite −1 · Crisis −1
- **B. Compren por terceros países** Pueblo +4 · Élite +1 · Potencias −3 · Crisis +1
