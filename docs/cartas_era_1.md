# Cartas · Era 1: Ascenso

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 19 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Comandante, el palacio es nuestro. Los ministros del gobierno anterior esperan en el sótano. ¿Qué hacemos con ellos?»

- **A. Juicio público.** *Ya está la sentencia, solo falta el juicio.* Pueblo +8 · Élite −7 · Potencias −5 · Bandera: `juicios_publicos`
- **B. Al exilio.** *Prefiero que me critiquen desde muy lejos.* Pueblo −8 · Élite +7 · Potencias +5 · Bandera: `exiliados_vocales`

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

**Archivo histórico:** En 1959, tras el triunfo de la revolución cubana, se celebraron juicios públicos contra antiguos miembros del gobierno y las fuerzas de seguridad, con ejecuciones que provocaron críticas en el exterior. Muchos cambios de régimen del siglo XX se enfrentaron a la misma disyuntiva entre juzgar y dejar partir.

### 2. El general querido

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «Comandante, Varela es muy querido por la tropa y pide Defensa. En los cuarteles lo aplauden más a él que a usted.»

- **A. Varela, ministro de Defensa.** *Así lo tengo donde pueda verlo.* Ejército +9 · Élite −4 · Bandera: `general_popular`
- **B. Embajador.** *Un héroe nacional queda mejor lejos de los cuarteles.* Ejército −9 · Élite +4 · Bandera: `general_apartado`

**Consecuencia futura de `general_popular`:** Varela conspira si el Ejército baja de 35.

**Consecuencia futura de `general_apartado`:** Varela regresa como candidato de los descontentos.

**Archivo histórico:** En Egipto, tras el derrocamiento de la monarquía en 1952, el general Muhammad Naguib, muy popular, presidió el nuevo régimen. En 1954 fue apartado del poder por Gamal Abdel Nasser, que acabó al frente del país.

### 3. Las refinerías

**Personaje:** Ministro de Comercio  
**Condición:** ancla de los años 3 a 6 de su era; a partir del año 3 de la era.

**Carta:** «Comandante, las refinerías extranjeras se niegan a procesar el petróleo del bloque oriental. ¿Negociamos o las tomamos?»

- **A. Negociamos.** *La Revolución no está reñida con hacer negocios.* Potencias +10 · Élite +6 · Pueblo −8 · Bandera: `negocio_refinerias`
- **B. Nacionalizarlas.** *La Patria pone el petróleo; la Patria pone las reglas.* Pueblo +8 · Élite −6 · Potencias −10 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 3 a 8 años

**Consecuencia futura de `negocio_refinerias`:** Las empresas exigen garantías que limitan tus decisiones económicas.

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

**Archivo histórico:** En Cuba, en 1960, las refinerías de empresas estadounidenses y británicas se negaron a procesar crudo soviético y el gobierno las nacionalizó. En 1951, Irán nacionalizó la Anglo-Iranian Oil Company.

### 4. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 4 a 7 de su era; a partir del año 4 de la era.

**Carta:** «Comandante, nuestro país le ofrece petróleo, créditos y asesores. A cambio, pedimos que se alinee con el bloque.»

- **A. Aceptar el acuerdo.** *La Revolución sabe reconocer a sus amigos cuando traen petróleo.* Potencias +9 · Pueblo +5 · Élite −6 · Crisis +2 · Bandera: `alineado_bloque_oriental`
- **B. Declinar.** *Prefiero que los aliados no sepan demasiado de nuestros asuntos.* Élite +6 · Potencias −9 · Pueblo −5 · Crisis +1 · Bandera: `no_alineado`

**Consecuencia futura de `alineado_bloque_oriental`:** El aliado exige concesiones y armamento.

**Consecuencia futura de `no_alineado`:** La potencia del norte se acerca y el aislamiento económico se agrava.

**Archivo histórico:** En 1960 Cuba firmó acuerdos con la Unión Soviética para venderle azúcar y recibir petróleo. En 1955, Egipto anunció la compra de armas a Checoslovaquia tras ser rechazado por proveedores occidentales.

### 5. El embargo

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Comandante, nuestro país considera las nacionalizaciones un acto hostil y aplicaremos restricciones comerciales.»

- **A. Discurso de dignidad.** *El Pueblo sabrá quién nos está haciendo pasar hambre.* Pueblo +9 · Potencias −9 · Élite −5 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Ofrecer compensación.** *Les pagaremos lo justo, pero no lo que ellos digan.* Potencias +9 · Élite +5 · Pueblo −9 · Crisis +2 · Bandera: `compensaciones`

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

**Consecuencia futura de `compensaciones`:** Una deuda que alimenta una carta de crisis.

**Archivo histórico:** Estados Unidos impuso restricciones comerciales a Cuba en 1960 y un embargo más amplio en 1962. En 1951, tras la nacionalización petrolera de Irán, el Reino Unido organizó un boicot al petróleo iraní, y en 1953 un golpe derrocó al primer ministro Mosaddeq.

### 6. La lista *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Comandante, tenemos una lista de quienes más criticaron al gobierno. ¿Qué hacemos con ella?»

- **A. Archivar la lista.** *La Revolución tiene buena memoria.* Pueblo +8 · Ejército −5 · Potencias +5
- **B. Detenerlos.** *Que respondan por lo que dijeron; el Pueblo debe cuidarse.* Pueblo −8 · Ejército +5 · Élite +4 · Potencias −5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 7. La tierra

**Personaje:** Ministro de Agricultura  
**Condición:** sorteo con peso 12.

**Carta:** «Comandante, proponemos repartir las grandes propiedades entre los campesinos. Los terratenientes no estarán contentos.»

- **A. Aplazar la reforma.** *Primero necesito que estén contentos los que tienen dinero.* Pueblo −10 · Élite +8
- **B. Repartir la tierra.** *Una revolución también necesita buenas fotos.* Pueblo +10 · Élite −8 · Potencias −4 · Crisis +1 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

**Archivo histórico:** La Ley de Reforma Agraria de Cuba (1959) y la del Perú bajo el gobierno militar de Velasco (1969) repartieron grandes propiedades. Ambas afectaron a intereses extranjeros y locales, y obligaron a replantear la producción agrícola.

### 8. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Comandante, los periódicos cuestionan los decretos. ¿Les dejamos publicar o revisamos los textos antes de imprimirlos?»

- **A. Que publiquen.** *Así sabré quiénes son antes de hacer la lista.* Pueblo +6 · Potencias +6 · Ejército −4 · Bandera: `prensa_libre`
- **B. Que me lo enseñen antes.** *No es censura; es enseñarles a escribir lo correcto.* Pueblo −6 · Élite +5 · Potencias −5 · Bandera: `censura_previa`

**Consecuencia futura de `prensa_libre`:** Un reportaje destapa un escándalo.

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

**Archivo histórico:** La Ley de Prensa española de 1938 estableció la censura previa de publicaciones. Muchos regímenes del siglo XX combinaron el control de la prensa con la propaganda oficial.

### 9. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «Comandante, usted prometió elecciones. El Pueblo pregunta cuándo serán.»

- **A. Elecciones en seis meses.** *Para entonces el Pueblo estará preparado para elegir.* Pueblo +9 · Potencias +7 · Ejército −4 · Élite −4 · Bandera: `elecciones_prometidas`
- **B. Aplazar las elecciones.** *El Pueblo todavía no está preparado para esa responsabilidad.* Pueblo −9 · Potencias −7 · Ejército +4 · Élite +4 · Bandera: `elecciones_aplazadas`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

**Archivo histórico:** Muchos regímenes surgidos de una revolución o un golpe prometieron elecciones y las pospusieron. En Cuba, tras 1959, las elecciones que se habían anunciado no llegaron a celebrarse en los años siguientes.

### 10. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 6.

**Carta:** «Comandante, proponemos abrir un período en que cualquiera pueda criticar al gobierno.»

- **A. Que critiquen.** *Me interesa mucho saber quién empieza.* Pueblo +8 · Élite −4 · Ejército −4 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 3 años
- **B. No hace falta.** *El Pueblo ya ha hablado.* Pueblo −8 · Ejército +4 · Élite +4

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

**Archivo histórico:** En China, la Campaña de las Cien Flores (1956-1957) invitó a criticar al Partido. En 1957, la Campaña Antiderechista persiguió a muchos de quienes habían hablado.

### 11. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Comandante, siguen en los cuarteles oficiales del gobierno anterior. Todavía no han hecho nada.»

- **A. Jubilarlos con pensión.** *La Revolución no necesita oficiales que añoren otros tiempos.* Ejército +7 · Élite +4 · Crisis +1 · Bandera: `viejos_oficiales`
- **B. Investigarlos uno a uno.** *Investíguenlos. Algo encontraremos.* Ejército −7 · Potencias −4 · Bandera: `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

**Archivo histórico:** En la Unión Soviética, entre 1937 y 1938, la Gran Purga alcanzó al Ejército Rojo. Altos mandos como Tujachevski fueron juzgados y ejecutados, y buena parte del cuerpo de oficiales fue depurado.

### 12. El puerto parado

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; a partir del año 3 de la era.

**Carta:** «Comandante, los estibadores han parado. Piden mejores salarios y un sindicato independiente del gobierno.»

- **A. Reconocer el sindicato.** *Que tengan sindicato, pero que sepan quién lo concedió.* Pueblo +10 · Élite −7 · Ejército −4 · Crisis +1 · Bandera: `sindicato_libre`
- **B. Mandar al ejército.** *El trabajo no se detiene porque alguien esté descontento.* Pueblo −10 · Élite +7 · Ejército +4 · Potencias −4 · Bandera: `huelga_reprimida`

**Consecuencia futura de `sindicato_libre`:** Nuevas huelgas cuando la crisis sube.

**Consecuencia futura de `huelga_reprimida`:** Malestar en las universidades.

**Archivo histórico:** En Polonia, las huelgas de los astilleros de Gdansk en 1980 dieron origen a Solidaridad, el primer sindicato independiente del bloque oriental. En 1981 el gobierno declaró la ley marcial.

### 13. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8; exige alguna de `purga_inicial`, `censura_previa`.

**Carta:** «Comandante, proponemos comités de vecinos que informen sobre actividades sospechosas en cada manzana.»

- **A. Comités de vigilancia.** *La Revolución no puede estar en cada manzana, pero ellos sí.* Ejército +6 · Élite +3 · Pueblo −7 · Bandera: `comites_vigilancia`
- **B. La policía de siempre.** *Con la policía basta; ellos ya conocen al Pueblo.* Pueblo +7 · Ejército −6 · Élite −3 · Bandera: `policia_tradicional`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

**Consecuencia futura de `policia_tradicional`:** La oposición se organiza con más facilidad.

**Archivo histórico:** En la República Democrática Alemana, el Ministerio para la Seguridad del Estado (Stasi), creado en 1950, construyó una extensa red de informantes. En Cuba, los Comités de Defensa de la Revolución se crearon en 1960.

### 14. El retrato

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 6; a partir del año 4 de la era.

**Carta:** «Comandante, las escuelas piden un retrato suyo para cada aula y una estatua en la plaza principal.»

- **A. Retratos y estatua.** *Que sepan a quién agradecer que tengan una escuela.* Pueblo +1 · Élite +6 · Ejército +4 · Crisis +1 · Bandera: `culto_iniciado`
- **B. Nada de retratos.** *Soy modesto. Con que aprendan mi nombre es suficiente.* Pueblo −1 · Potencias +2 · Élite −6 · Ejército −4 · Bandera: `modestia_aparente`

**Consecuencia futura de `culto_iniciado`:** Tratamiento de Excelencia y monumentos cada vez más costosos.

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

**Archivo histórico:** En Turkmenistán, en 2002, el presidente Saparmurat Niyazov rebautizó los meses del año, y dio a enero su propio título y a abril el nombre de su madre. Muchos regímenes del siglo XX levantaron monumentos y retratos de sus líderes.

### 15. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Comandante, cada semana salen más familias ricas con sus fondos. ¿Las dejamos ir o cerramos la frontera?»

- **A. Que se vayan sin dinero.** *Que se lleven los recuerdos; el dinero se queda con la Revolución.* Pueblo +7 · Élite −7 · Potencias −4 · Crisis −1 · Bandera: `exodo_elite`
- **B. Cerrar la frontera.** *Nadie abandona la Patria con su fortuna en el bolsillo.* Ejército +6 · Élite +7 · Pueblo −7 · Potencias −8 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

**Archivo histórico:** Entre 1949 y 1961, millones de personas abandonaron la República Democrática Alemana rumbo a Berlín Occidental y la República Federal. En agosto de 1961 se levantó el Muro de Berlín.

### 16. La factura *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Comandante, hemos prometido más de lo que tenemos. Podemos subir precios o pedir un préstamo extranjero.»

- **A. Subir los precios.** *El Pueblo entenderá que la Revolución también tiene gastos.* Pueblo −10 · Élite +6 · Crisis −3
- **B. Pedir un préstamo.** *El futuro puede pagar lo que hoy necesitamos.* Potencias +8 · Élite +4 · Crisis −3 · Bandera: `deuda_externa`

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 17. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Comandante, las tiendas están vacías. Podemos racionar lo que queda o tolerar un mercado paralelo.»

- **A. Racionar lo que queda.** *La escasez será justa; yo me encargo de eso.* Pueblo −8 · Ejército +4 · Élite −5 · Crisis −3
- **B. Tolerar el mercado paralelo.** *Que exista, pero que nadie tenga que hablar de él.* Pueblo +8 · Élite +5 · Potencias −4 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 18. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Comandante, manifestantes y oficiales han empezado a hablar entre ellos. Si se coordinan, no podremos detenerlos.»

- **A. Ascender a los inquietos.** *Dales un despacho y descubrirán las virtudes de la Revolución.* Ejército +12 · Élite −6 · Crisis +2
- **B. Detener a los cabecillas.** *Deténganlos antes de que descubran cuántos son.* Pueblo −6 · Ejército +8 · Potencias −6

### 19. El dinero se va *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Comandante, empresarios y diplomáticos coordinan la salida de capitales y un bloqueo comercial.»

- **A. Concesiones a empresarios.** *Un empresario tranquilo hace menos preguntas.* Élite +9 · Pueblo −8 · Crisis +2
- **B. Congelar sus cuentas.** *El dinero puede ser privado; su salida no.* Potencias −8 · Pueblo +8 · Élite −9
