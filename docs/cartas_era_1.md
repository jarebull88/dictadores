# Cartas · Era 1: Ascenso

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 19 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Hemos tomado el palacio. ¿Qué hacemos con los ministros del gobierno anterioros?»

- **A. Juicio público** Pueblo +8 · Élite −7 · Potencias −5 · Bandera: `juicios_publicos`
- **B. Al exilio** Pueblo −8 · Élite +7 · Potencias +5 · Bandera: `exiliados_vocales`

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

**Archivo histórico:** En 1959, tras el triunfo de la revolución cubana, se celebraron juicios públicos contra antiguos miembros del gobierno y las fuerzas de seguridad, con ejecuciones que provocaron críticas en el exterior. Muchos cambios de régimen del siglo XX se enfrentaron a la misma disyuntiva entre juzgar y dejar partir.

### 2. El general querido

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El General Cienfuegos es muy popular y quiere ser Ministro de las Fuerzas Armadas.»

- **A. Que sea Ministro** Ejército +9 · Élite −4 · Bandera: `general_popular`
- **B. Mejor lejos de Embajador** Ejército −9 · Élite +4 · Bandera: `general_apartado`

**Consecuencia futura de `general_popular`:** Varela conspira si el Ejército baja de 35.

**Consecuencia futura de `general_apartado`:** Varela regresa como candidato de los descontentos.

**Archivo histórico:** En Egipto, tras el derrocamiento de la monarquía en 1952, el general Muhammad Naguib, muy popular, presidió el nuevo régimen. En 1954 fue apartado del poder por Gamal Abdel Nasser, que acabó al frente del país.

### 3. Las refinerías

**Personaje:** Ministro de Comercio  
**Condición:** ancla de los años 3 a 6 de su era; a partir del año 3 de la era.

**Carta:** «Las refinerías extranjeras nos cierran las puertas. ¿Negociamos o las tomamos?»

- **A. Negociemos** Potencias +10 · Élite +6 · Pueblo −8 · Bandera: `negocio_refinerias`
- **B. ¡Exprópiese!** Pueblo +8 · Élite −6 · Potencias −10 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 3 a 8 años

**Consecuencia futura de `negocio_refinerias`:** Las empresas exigen garantías que limitan tus decisiones económicas.

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

**Archivo histórico:** En Cuba, en 1960, las refinerías de empresas estadounidenses y británicas se negaron a procesar crudo soviético y el gobierno las nacionalizó. En 1951, Irán nacionalizó la Anglo-Iranian Oil Company.

### 4. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 4 a 7 de su era; a partir del año 4 de la era.

**Carta:** «Le ofrecemos ayuda económica y militar. A cambio queremos lealtad.»

- **A. Trato hecho** Potencias +9 · Pueblo +5 · Élite −6 · Crisis +2 · Bandera: `alineado_bloque_oriental`
- **B. No gracias** Élite +6 · Potencias −9 · Pueblo −5 · Crisis +1 · Bandera: `no_alineado`

**Consecuencia futura de `alineado_bloque_oriental`:** El aliado exige concesiones y armamento.

**Consecuencia futura de `no_alineado`:** La potencia del norte se acerca y el aislamiento económico se agrava.

**Archivo histórico:** En 1960 Cuba firmó acuerdos con la Unión Soviética para venderle azúcar y recibir petróleo. En 1955, Egipto anunció la compra de armas a Checoslovaquia tras ser rechazado por proveedores occidentales.

### 5. El embargo

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Han expropiado nuestras refinerías. Exigimos compensación o habrá embargo.»

- **A. Que nos embarguen** Pueblo +9 · Potencias −9 · Élite −5 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Pagaremos… algo** Potencias +9 · Élite +5 · Pueblo −9 · Crisis +2 · Bandera: `compensaciones`

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

**Consecuencia futura de `compensaciones`:** Una deuda que alimenta una carta de crisis.

**Archivo histórico:** Estados Unidos impuso restricciones comerciales a Cuba en 1960 y un embargo más amplio en 1962. En 1951, tras la nacionalización petrolera de Irán, el Reino Unido organizó un boicot al petróleo iraní, y en 1953 un golpe derrocó al primer ministro Mosaddeq.

### 6. La lista *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Ya sabemos quiénes nos critican. ¿Cómo procedemos?»

- **A. Es su derecho** Pueblo +8 · Ejército −5 · Potencias +5
- **B. Deténganlos** Pueblo −8 · Ejército +5 · Élite +4 · Potencias −5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 7. La tierra

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 12.

**Carta:** «Proponemos repartir las tierras entre los campesinos, pero los terratenientes protestarán.»

- **A. Mejor no** Pueblo −10 · Élite +8
- **B. Repártanla** Pueblo +10 · Élite −8 · Potencias −4 · Crisis +1 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

**Archivo histórico:** La Ley de Reforma Agraria de Cuba (1959) y la del Perú bajo el gobierno militar de Velasco (1969) repartieron grandes propiedades. Ambas afectaron a intereses extranjeros y locales, y obligaron a replantear la producción agrícola.

### 8. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «La prensa critica nuestros decretos. ¿Toleramos o censuramos?»

- **A. Que publiquen** Pueblo +6 · Potencias +6 · Ejército −4 · Bandera: `prensa_libre`
- **B. Censura no: revisión** Pueblo −6 · Élite +5 · Potencias −5 · Bandera: `censura_previa`

**Consecuencia futura de `prensa_libre`:** Un reportaje destapa un escándalo.

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

**Archivo histórico:** La Ley de Prensa española de 1938 estableció la censura previa de publicaciones. Muchos regímenes del siglo XX combinaron el control de la prensa con la propaganda oficial.

### 9. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «Usted prometió elecciones. ¿Cuándo piensa celebrarlas?»

- **A. En seis meses** Pueblo +9 · Potencias +7 · Ejército −4 · Élite −4 · Bandera: `elecciones_prometidas`
- **B. No hay prisa** Pueblo −9 · Potencias −7 · Ejército +4 · Élite +4 · Bandera: `elecciones_aplazadas`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

**Archivo histórico:** Muchos regímenes surgidos de una revolución o un golpe prometieron elecciones y las pospusieron. En Cuba, tras 1959, las elecciones que se habían anunciado no llegaron a celebrarse en los años siguientes.

### 10. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 6.

**Carta:** «¿Y si dejamos que el pueblo critique al gobierno libremente?»

- **A. Que hablen** Pueblo +8 · Élite −4 · Ejército −4 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 3 años
- **B. La Revolución no se cuestiona** Pueblo −8 · Ejército +4 · Élite +4

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

**Archivo histórico:** En China, la Campaña de las Cien Flores (1956-1957) invitó a criticar al Partido. En 1957, la Campaña Antiderechista persiguió a muchos de quienes habían hablado.

### 11. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Los oficiales del antiguo régimen siguen en sus puestos. ¿Qué hacemos?»

- **A. Jubílenlos** Ejército +7 · Élite +4 · Crisis +1 · Bandera: `viejos_oficiales`
- **B. Limpien los cuarteles** Ejército −7 · Potencias −4 · Bandera: `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

**Archivo histórico:** En la Unión Soviética, entre 1937 y 1938, la Gran Purga alcanzó al Ejército Rojo. Altos mandos como Tujachevski fueron juzgados y ejecutados, y buena parte del cuerpo de oficiales fue depurado.

### 12. El puerto parado

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; a partir del año 3 de la era.

**Carta:** «Los estibadores están en huelga. Exigen más sueldo y autonomía sindical.»

- **A. Sindicato concedido** Pueblo +10 · Élite −7 · Ejército −4 · Crisis +1 · Bandera: `sindicato_libre`
- **B. Manden al ejército** Pueblo −10 · Élite +7 · Ejército +4 · Potencias −4 · Bandera: `huelga_reprimida`

**Consecuencia futura de `sindicato_libre`:** Nuevas huelgas cuando la crisis sube.

**Consecuencia futura de `huelga_reprimida`:** Malestar en las universidades.

**Archivo histórico:** En Polonia, las huelgas de los astilleros de Gdansk en 1980 dieron origen a Solidaridad, el primer sindicato independiente del bloque oriental. En 1981 el gobierno declaró la ley marcial.

### 13. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8; exige alguna de `purga_inicial`, `censura_previa`.

**Carta:** «¿Y si creamos Comités de Defensa Revolucionaria para vigilar los barrios?»

- **A. La Revolución somos todos** Ejército +6 · Élite +3 · Pueblo −7 · Bandera: `comites_vigilancia`
- **B. No necesitamos chivatos** Pueblo +7 · Ejército −6 · Élite −3 · Bandera: `policia_tradicional`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

**Consecuencia futura de `policia_tradicional`:** La oposición se organiza con más facilidad.

**Archivo histórico:** En la República Democrática Alemana, el Ministerio para la Seguridad del Estado (Stasi), creado en 1950, construyó una extensa red de informantes. En Cuba, los Comités de Defensa de la Revolución se crearon en 1960.

### 14. El retrato

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 6; a partir del año 4 de la era.

**Carta:** «Quieren su retrato en cada aula y una estatua en la plaza. ¿Qué opina?»

- **A. Si insisten…** Pueblo +1 · Élite +6 · Ejército +4 · Crisis +1 · Bandera: `culto_iniciado`
- **B. No necesito estatuas** Pueblo −1 · Potencias +2 · Élite −6 · Ejército −4 · Bandera: `modestia_aparente`

**Consecuencia futura de `culto_iniciado`:** Tratamiento de Excelencia y monumentos cada vez más costosos.

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

**Archivo histórico:** En Turkmenistán, en 2002, el presidente Saparmurat Niyazov rebautizó los meses del año, y dio a enero su propio título y a abril el nombre de su madre. Muchos regímenes del siglo XX levantaron monumentos y retratos de sus líderes.

### 15. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Cada vez se van más ricos. ¿Los dejamos escapar o les prohibimos salir?»

- **A. Que se vayan, sin el dinero** Pueblo +7 · Élite −7 · Potencias −4 · Crisis −1 · Bandera: `exodo_elite`
- **B. Frontera cerrada** Ejército +6 · Élite +7 · Pueblo −7 · Potencias −8 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

**Archivo histórico:** Entre 1949 y 1961, millones de personas abandonaron la República Democrática Alemana rumbo a Berlín Occidental y la República Federal. En agosto de 1961 se levantó el Muro de Berlín.

### 16. La factura *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Hemos prometido demasiado. ¿Subimos los precios o pedimos un préstamo?»

- **A. Suban los precios** Pueblo −10 · Élite +6 · Crisis −3
- **B. Que paguen nuestros nietos** Potencias +8 · Élite +4 · Crisis −3 · Bandera: `deuda_externa`

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 17. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Las tiendas están vacías. ¿Racionamos o toleramos el mercado negro?»

- **A. Escasez, pero justa** Pueblo −8 · Ejército +4 · Élite −5 · Crisis −3
- **B. Ojos que no ven** Pueblo +8 · Élite +5 · Potencias −4 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 18. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Hay oficiales reuniéndose con los manifestantes. Si se unen, caemos. ¿Los compramos o los cortamos?»

- **A. Ascender oficiales** Ejército +12 · Élite −6 · Crisis +2
- **B. Detener cabecillas** Pueblo −6 · Ejército +8 · Potencias −6

### 19. El dinero se va *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Los empresarios huyen con su dinero y se avecina un bloqueo comercial.»

- **A. Mimen a los empresarios** Élite +9 · Pueblo −8 · Crisis +2
- **B. Congelen sus cuentas** Potencias −8 · Pueblo +8 · Élite −9
