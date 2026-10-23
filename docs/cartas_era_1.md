# Cartas · Era 1: La Revolución

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 41 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.35.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Tenemos a los ministros del tirano. Los tribunales revolucionarios esperan y el Pueblo pide justicia.»

- **A. Juicio público en el estadio** Pueblo +8 · Ejército +4 · Bandera: `juicios_publicos`
- **B. Tienen 24 horas para hacer maletas** Pueblo −8 · Ejército −4 · Potencias +5 · Bandera: `exiliados_vocales`

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

### 2. La casa del tirano

**Personaje:** Ministra de Cultura  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «La mansión del tirano tiene piscina, cine y 20 habitaciones. Habrá que darle algún uso revolucionario.»

- **A. Museo del Pueblo** Pueblo +8 · Élite −6
- **B. Me mudo yo** Pueblo −8 · Élite +6

### 3. Las arcas vacías

**Personaje:** Ministro de Economía  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «El tirano huyó con la reserva del Banco Nacional. No hay para pagar los sueldos de este mes.»

- **A. Impriman billetes hasta que alcance** Pueblo +5 · Potencias −5 · Bandera: `mercado_paralelo`
- **B. Pidan un préstamo y recorten gastos** Pueblo −5 · Potencias +5 · Bandera: `deuda_externa`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 4. El comandante que dimite

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El comandante Mota dimite con una carta: dice que la Revolución se está volviendo comunista.»

- **A. Veinte años de cárcel por traidor** Élite +5 · Ejército −4 · Bandera: `mota_juzgado` · Encola: `avion_diezfuegos` en 1 a 2 años
- **B. La Revolución no retiene a nadie** Ejército +4 · Élite −5 · Encola: `avion_diezfuegos` en 1 a 2 años

**Consecuencia futura de `mota_juzgado`:** Los nietos de Mota piden que los libros hablen de él.

### 5. El general querido

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El general Cienfuegos es el más querido del Ejército y pide el Estado Mayor.»

- **A. Denle el Estado Mayor** Ejército +9 · Élite −4 · Bandera: `general_popular`
- **B. Embajador en el país más lejano** Ejército −9 · Élite +4 · Bandera: `general_apartado`

**Consecuencia futura de `general_popular`:** (Obsoleta, 22 oct) Cienfuegos conspira si el Ejército baja de 40.

**Consecuencia futura de `general_apartado`:** Cienfuegos regresa como candidato de los descontentos.

### 6. Las refinerías

**Personaje:** Ministro de Comercio  
**Condición:** ancla de los años 3 a 6 de su era; a partir del año 3 de la era.

**Carta:** «Las petroleras extranjeras exigen condiciones o cierran el grifo.»

- **A. Aceptemos sus condiciones** Potencias +10 · Élite −5 · Pueblo −4 · Bandera: `negocio_refinerias`
- **B. ¡Exprópiese!** Pueblo +8 · Élite +5 · Potencias −10 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 3 a 8 años

**Consecuencia futura de `negocio_refinerias`:** Las empresas exigen garantías que limitan tus decisiones económicas.

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

### 7. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 4 a 7 de su era; a partir del año 4 de la era.

**Carta:** «Nuestro país le ofrece petróleo, armas y asesores. A cambio, solo pedimos su lealtad.»

- **A. Acepto su generosa ayuda** Potencias +9 · Pueblo +2 · Ejército +4 · Crisis +2 · Bandera: `alineado_bloque_oriental`
- **B. La Revolución no tiene dueño** Potencias −9 · Pueblo −5 · Ejército −4 · Crisis +1 · Bandera: `no_alineado`

**Consecuencia futura de `alineado_bloque_oriental`:** El aliado exige concesiones y armamento.

**Consecuencia futura de `no_alineado`:** La potencia del norte se acerca y el aislamiento económico se agrava.

### 8. Los alfabetizadores en el monte

**Personaje:** Ministra de Educación  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Los alzados del monte han matado a un maestro de dieciocho años. Las brigadas temen subir.»

- **A. Que el Ejército suba con ellos** Ejército +5 · Élite −3
- **B. Que suban todos aunque tengan miedo** Élite +3 · Ejército −5

### 9. El avión de Diezfuegos

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «El general Diezfuegos, el más querido de la tropa, fue a relevar a Mota y su avión no ha vuelto.»

- **A. Búsquenlo aunque sequemos el mar** Ejército +5 · Élite −3 · Bandera: `accidente_cienfuegos`
- **B. Tres días de luto y todos a trabajar** Élite +3 · Ejército −5 · Bandera: `accidente_cienfuegos`

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Diezfuegos.

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Diezfuegos.

### 10. El embargo

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Han expropiado nuestras refinerías. Exigimos compensación o no les venderemos ni un tornillo.»

- **A. Aquí no se paga nada** Pueblo +3 · Potencias −9 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Pagaremos, que somos gente seria** Potencias +9 · Pueblo −9 · Crisis +2 · Bandera: `compensaciones`

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

**Consecuencia futura de `compensaciones`:** Una deuda que alimenta una carta de crisis.

### 11. La lista *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Ya sabemos quiénes nos critican, gracias a unos vecinos muy colaboradores.»

- **A. Que protesten, pero bajito** Pueblo +8 · Ejército −5
- **B. Detengan a todos en orden alfabético** Pueblo −8 · Ejército +5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 12. La tierra

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 12.

**Carta:** «Si repartimos las tierras entre los campesinos, el país será el granero del mundo en un año.»

- **A. Respeten la propiedad privada** Pueblo −10 · Élite −5
- **B. La tierra para quien la "merece"** Pueblo +10 · Élite +5 · Potencias −4 · Crisis +1 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

### 13. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Los periódicos publican críticas contra cada decreto, uno detrás de otro.»

- **A. Que publiquen lo que quieran** Pueblo +6 · Élite −5 · Bandera: `prensa_libre`
- **B. Nacionalicen las imprentas** Pueblo −6 · Élite +5 · Bandera: `censura_previa`

**Consecuencia futura de `prensa_libre`:** Un reportaje destapa un escándalo.

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

### 14. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «El Pueblo recuerda que prometimos elecciones en dieciocho meses. Ya han pasado doce.»

- **A. Elecciones ya, que seguro gano** Pueblo +9 · Élite −5 · Bandera: `elecciones_prometidas`
- **B. La Revolución ya fue votada** Pueblo −9 · Élite +5 · Bandera: `elecciones_aplazadas`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

### 15. La campaña de alfabetización

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6.

**Carta:** «Propongo una campaña de alfabetización: brigadas de jóvenes enseñando a leer en cada rincón.»

- **A. Un Pueblo culto y agradecido** Pueblo +10 · Encola: `alfabetizadores_monte` en 2 a 3 años
- **B. Un Pueblo que lee pregunta demasiado** Pueblo −10

### 16. La declaración socialista

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 3 de la era.

**Carta:** «El exilio nos ha bombardeado y la plaza se llena de luto. Habrá que decir qué es la Revolución.»

- **A. Hoy la Revolución será socialista** Potencias +5 · Élite +3
- **B. Que la palabra sea patria y nada más** Potencias −5 · Élite −3

### 17. Se acabó el profesional

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10.

**Carta:** «Nuestras estrellas del béisbol juegan y cobran fuera. Si abolimos el deporte profesional no volverán.»

- **A. La pelota libre le gana a la esclava** Élite +4 · Potencias −4
- **B. Que sigan bateando en divisas** Potencias +4 · Élite −4

### 18. Las escuelas para todos

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6.

**Carta:** «Los colegios privados cobran por enseñar. Propongo que todas las escuelas sean del Estado.»

- **A. Que todos aprendan lo mismo** Pueblo +7 · Élite +5
- **B. Que pague quien quiera otra escuela** Pueblo −7 · Élite −5

### 19. Los asesores

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 6; a partir del año 2 de la era.

**Carta:** «Le enviaremos asesores para su economía y su policía. Nos ocuparemos de que todo vaya bien.»

- **A. Aprenderemos de los mejores** Potencias +9 · Ejército +5 · Élite +5
- **B. Gracias, aquí nos asesoramos solos** Potencias −9 · Ejército −5 · Élite −5

### 20. El club de golf

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 6.

**Carta:** «Nuestro país reconocerá su gobierno si respeta nuestras propiedades, empezando por el club de golf.»

- **A. Las propiedades y el golf son suyas** Potencias +9 · Pueblo −8 · Élite −4
- **B. Empezaremos nacionalizando el golf** Potencias −9 · Pueblo +8 · Élite +4

### 21. La bahía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 5 a 7 de su era.

**Carta:** «Hemos derrotado la invasión de la bahía. Tenemos mil doscientos prisioneros.»

- **A. Cámbienlos por compotas** Potencias −6 · Pueblo +2 · Ejército −4
- **B. Juicio televisado y luego al «patio»** Potencias −3 · Pueblo +5 · Ejército +5 · Crisis +2

### 22. Los niños que se van

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 6; a partir del año 3 de la era.

**Carta:** «Cada semana salen aviones llenos de niños sin sus padres. Temen que la Revolución se los quede.»

- **A. Dejen salir a los niños** Pueblo +5 · Ejército −4 · Potencias +3
- **B. Nadie se lleva a nuestros niños** Pueblo −5 · Ejército +4 · Potencias −3

### 23. La reforma urbana

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 6.

**Carta:** «El Estado expropiará las casas y las alquilará a mitad de precio hasta que el inquilino las compre.»

- **A. Ahora el casero es el Estado** Pueblo +8 · Élite +4
- **B. Los caseros mantienen sus casas** Pueblo −8 · Élite −4

### 24. Las milicias

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 6.

**Carta:** «Los barrios piden fusiles para defender la Revolución por su cuenta.»

- **A. Que el Pueblo se arme** Pueblo +6 · Ejército −6
- **B. Las armas solo son para el Ejército** Pueblo −6 · Ejército +6

### 25. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 6.

**Carta:** «Los intelectuales preguntan hasta dónde pueden criticar a la Revolución.»

- **A. Que critiquen todo lo que quieran** Pueblo +8 · Élite −5 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 3 años
- **B. La Revolución no se cuestiona** Pueblo −8 · Élite +5

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

### 26. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Los oficiales del antiguo régimen siguen al mando de la mitad de los cuarteles.»

- **A. Jubílenlos** Ejército −5 · Crisis +1 · Bandera: `viejos_oficiales`
- **B. Purga y ascensos para los nuestros** Ejército +5 · Pueblo +4 · Bandera: `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

### 27. El puerto parado

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; a partir del año 3 de la era.

**Carta:** «El puerto lleva tres días parado. Los estibadores no quieren que el Partido elija a sus líderes.»

- **A. Que se organicen libremente** Pueblo +10 · Élite −7 · Ejército −4 · Crisis +1 · Bandera: `sindicato_libre`
- **B. El Partido ya eligió por ellos** Pueblo −10 · Élite +7 · Ejército +4 · Bandera: `huelga_reprimida`

**Consecuencia futura de `sindicato_libre`:** Los sindicatos libres quieren elegir a sus dirigentes sin el Partido.

**Consecuencia futura de `huelga_reprimida`:** Malestar en las universidades.

### 28. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `purga_inicial`, `censura_previa`.

**Carta:** «Los contrarrevolucionarios se esconden en los barrios. Los vecinos podrían ayudarnos a encontrarlos.»

- **A. Que cada vecino vigile a su vecino** Ejército +6 · Élite +4 · Pueblo −7 · Bandera: `comites_vigilancia`
- **B. No necesitamos chivatos** Pueblo +7 · Ejército −6 · Élite −4 · Bandera: `policia_tradicional`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

**Consecuencia futura de `policia_tradicional`:** La oposición se organiza con más facilidad.

### 29. El retrato

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 6; a partir del año 4 de la era.

**Carta:** «El Partido quiere su retrato en cada aula y una estatua en la plaza.»

- **A. Si insisten…** Pueblo −3 · Élite +6 · Crisis +1 · Bandera: `culto_iniciado`
- **B. Los monumentos son para los mártires** Pueblo +3 · Élite −6 · Bandera: `modestia_aparente`

**Consecuencia futura de `culto_iniciado`:** Tratamiento de Excelencia y monumentos cada vez más costosos.

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

### 30. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Los ricos hacen cola en el aeropuerto. Dicen que vuelven en cuanto caiga la Revolución.»

- **A. Que se vayan y dejen el dinero** Pueblo +7 · Potencias +4 · Crisis −1 · Bandera: `exodo_elite`
- **B. Nadie sale del país sin permiso** Ejército +6 · Pueblo −7 · Potencias −4 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

### 31. La factura *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Hemos prometido demasiado y no queda dinero. Los precios se disparan y el Pueblo protesta.»

- **A. Congelen los precios por decreto** Pueblo +8 · Élite +5 · Crisis −3 · Bandera: `mercado_paralelo`
- **B. Pidan otro préstamo y ya veremos** Potencias +8 · Pueblo −3 · Crisis −3 · Bandera: `deuda_externa`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 32. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «No hay nada en las tiendas del Estado. En el mercado negro, de todo.»

- **A. Redadas en el mercado negro** Pueblo −8 · Ejército +4 · Élite +4 · Crisis −3
- **B. Hagan la vista gorda** Pueblo +3 · Élite +5 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 33. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Algunos oficiales se reúnen con los que protestan en la calle. Si se juntan, caemos.»

- **A. Asciendan a los que no se reúnen** Ejército +8 · Élite −4
- **B. Arresten a los oficiales reunidos** Ejército −6 · Pueblo −3 · Crisis +2

### 34. El dinero se va *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Los empresarios se reúnen con los embajadores. Si se alían, nos asfixian.»

- **A. Mimen a los empresarios** Potencias +6 · Pueblo −8 · Élite −5
- **B. Intervengan sus empresas** Potencias −8 · Pueblo +6 · Élite +5 · Crisis +2

### 35. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 8 a 10 de su era; exige `alineado_bloque_oriental`.

**Carta:** «Nuestro país le ofrece misiles, instalados y apuntando a donde usted diga.»

- **A. Acepto y apúntenlos donde ya sabe** Ejército +6 · Potencias +5 · Pueblo −4 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 a 2 años
- **B. Nuestro misil es el Pueblo** Ejército −6 · Potencias −5 · Pueblo +4 · Bandera: `misiles_rechazados`

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_rechazados`:** El aliado recuerda tu negativa.

### 36. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Nuestros barcos rodearán su costa hasta que retire los misiles.»

- **A. Que disfruten de la vista** Ejército +6 · Potencias −6 · Pueblo −3 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Tranquilo, mañana no estarán** Ejército −6 · Potencias +6 · Crisis −1

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 37. El general murmura

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `general_popular`; solo si Ejército está en 40 o menos.

**Carta:** «El general Cienfuegos recibe oficiales en su casa. Dicen que habla de usted en pasado.»

- **A. Pregúntenle cómo están sus hijos** Ejército −3 · Crisis +1
- **B. Que tenga un accidente heroico** Ejército −6 · Pueblo −4 · Élite +3 · Bandera: `accidente_cienfuegos`

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Diezfuegos.

### 38. Las garantías

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `negocio_refinerias`.

**Carta:** «Las empresas extranjeras quieren por escrito que no habrá más nacionalizaciones y que podrán llevarse sus ganancias.»

- **A. Les doy mi palabra de revolucionario** Potencias +6 · Élite −4 · Pueblo −5 · Crisis −1
- **B. Aquí no se firma nada** Potencias −6 · Pueblo +4 · Élite +4 · Crisis +1

### 39. Estudiantes en la calle

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `elecciones_aplazadas`.

**Carta:** «Los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.»

- **A. Habrá elecciones, palabra de honor** Pueblo +5 · Élite −4 · Bandera: `elecciones_prometidas`
- **B. ¿Elecciones para qué?** Pueblo −6 · Ejército +4 · Bandera: `estudiantes_reprimidos`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

### 40. La marcha de los eléctricos

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `sindicato_libre`.

**Carta:** «Los electricistas quieren un sindicato libre como el del puerto, o apagarán la capital.»

- **A. Que también tengan su sindicato** Pueblo +6 · Élite −4 · Crisis +2
- **B. Calabozo por contrarrevolución** Pueblo −6 · Ejército +4 · Élite +4

### 41. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`; a partir del año 6 de la era.

**Carta:** «El embargo ya es total: no entran comida, medicinas ni repuestos.»

- **A. Libreta de racionamiento por familia** Pueblo −4 · Élite +3 · Crisis −1
- **B. Que un país amigo nos revenda** Pueblo +4 · Potencias +3 · Élite +2 · Crisis +1
