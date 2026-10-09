# Cartas · Era 2: Consolidación

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 26 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.7.

### 1. El aniversario

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «Comandante, se cumplen los primeros años de la Revolución. Proponemos un gran desfile militar con tanques.»

- **A. Gran desfile.** *El Pueblo debe recordar quién derrocó a los tiranos.* Ejército +8 · Élite +4 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. Fiesta popular.** *La Revolución también sabe celebrar.* Pueblo +7 · Ejército −8 · Élite −4

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

**Archivo histórico:** Desde los años veinte, los desfiles de la Plaza Roja de Moscú mostraban cada 1 de mayo y cada 7 de noviembre la fuerza militar del régimen soviético, con los dirigentes saludando desde lo alto del mausoleo de Lenin.

### 2. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 2 a 4 de su era; exige `alineado_bloque_oriental`.

**Carta:** «Comandante, nuestro país propone instalar misiles de alcance medio en su territorio. Sería una garantía frente a la potencia del norte.»

- **A. Aceptar los misiles.** *Nadie se mete con un país que puede borrar un barrio entero.* Ejército +8 · Potencias +7 · Pueblo −7 · Élite −4 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 a 2 años
- **B. Declinar.** *La Patria no necesita armas con instrucciones ajenas.* Ejército −8 · Potencias −7 · Pueblo +7 · Élite +4 · Bandera: `misiles_rechazados`

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_rechazados`:** El aliado recuerda tu negativa.

**Archivo histórico:** En octubre de 1962 la Unión Soviética instaló misiles nucleares de alcance medio en Cuba, lo que provocó la crisis de los misiles. Terminó cuando Moscú aceptó retirarlos a cambio de que Estados Unidos no invadiera la isla y, en secreto, retirara sus misiles de Turquía.

### 3. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Comandante, nuestro país exige la retirada inmediata de los misiles. De lo contrario, impondremos un bloqueo naval.»

- **A. Mantener los misiles.** *Si cedemos hoy, mañana nos pedirán el palacio.* Ejército +8 · Potencias −9 · Pueblo −4 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Retirarlos.** *La Revolución también sabe cuándo hacer desaparecer una prueba.* Ejército −8 · Potencias +9 · Pueblo +4 · Crisis −1

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 4. La mano del norte

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `no_alineado`.

**Carta:** «Comandante, nuestro país le ofrece créditos y comercio, aunque no pertenezca a ningún bloque. Solo pedimos buenas maneras y auditorías.»

- **A. Aceptar los créditos.** *El dinero extranjero siempre llega con una bandera escondida.* Potencias +8 · Élite +5 · Pueblo −5 · Crisis +1 · Bandera: `deuda_externa`
- **B. Seguir sin bloque.** *La Revolución no necesita que nadie le enseñe a gobernar.* Potencias −8 · Pueblo +6 · Élite −4

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

**Archivo histórico:** Tras romper con Stalin en 1948, la Yugoslavia de Tito, comunista y no alineada, recibió ayuda económica y militar de Estados Unidos, y en 1961 impulsó en Belgrado la primera cumbre del Movimiento de Países No Alineados.

### 5. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `juicios_publicos`.

**Carta:** «Comandante, nuestro país pide garantías para los acusados que aún esperan sentencia en los juicios públicos.»

- **A. Abogados de oficio.** *Que tengan abogado; la sentencia ya tiene otro dueño.* Potencias +7 · Pueblo −6 · Élite +3
- **B. Asunto interno.** *La Patria no acepta lecciones sobre sus enemigos.* Potencias −7 · Ejército +5 · Élite −3

**Archivo histórico:** Tras el golpe de 1967 en Grecia, la junta militar detuvo a miles de opositores. Varios países occidentales y el Consejo de Europa criticaron al régimen, y Grecia abandonó el Consejo en 1969 antes de ser expulsada.

### 6. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Comandante, los exiliados emiten por radio y ya los escucha media capital. Dicen que el palacio tiene goteras.»

- **A. Interferir la emisora.** *La mentira también necesita permiso para entrar en la Patria.* Pueblo −6 · Ejército +4 · Élite +3
- **B. Contestar por radio.** *Que hablen; el Pueblo sabrá quién defiende la Revolución.* Pueblo +5 · Potencias +4 · Élite −3

**Archivo histórico:** Radio Europa Libre emitió hacia Europa del Este desde 1950 y Radio Martí hacia Cuba desde 1985. Los gobiernos de ambos países interfirieron las señales, con resultados desiguales.

### 7. El general murmura

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 18; exige `general_popular`; solo si Ejército está en 40 o menos.

**Carta:** «Comandante, Varela recibe oficiales en su casa. Dicen que habla de usted en pasado.»

- **A. Ascender a Varela.** *Un ascenso para que se calle.* Ejército +9 · Élite −4 · Crisis +1
- **B. Detener a Varela.** *La Historia juzgará mis decisiones cuando nadie pueda discutirlas.* Ejército −9 · Pueblo −5 · Potencias −4

**Archivo histórico:** En Egipto, el general Mohamed Naguib fue el primer presidente de la república en 1953. En 1954 fue apartado por Gamal Abdel Nasser y pasó casi dos décadas bajo arresto domiciliario.

### 8. El hambre

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «Comandante, los campesinos tienen tierra, pero no semillas, tractores ni crédito. La cosecha ha caído a la mitad.»

- **A. Racionar los alimentos.** *El Pueblo tendrá lo necesario y aprenderá a agradecerlo.* Pueblo −6 · Élite +3 · Crisis −1
- **B. Importar comida.** *No importa de dónde venga el pan si lo reparte la Revolución.* Pueblo +6 · Potencias +5 · Crisis +2

**Archivo histórico:** En marzo de 1962 Cuba introdujo la libreta de abastecimiento para racionar alimentos y productos básicos, un sistema que se mantuvo durante décadas.

### 9. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «Comandante, ya no circulan noticias, solo rumores. Propongo un periodista oficial que los desmienta cada mañana.»

- **A. Periodista oficial.** *Una sola voz evita muchas confusiones.* Pueblo −5 · Élite +5 · Ejército +3 · Bandera: `periodista_oficial`
- **B. Dejar que corran.** *Mientras escuchen lo que yo diga, pueden hablar.* Pueblo +5 · Élite −5 · Ejército −3

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

**Archivo histórico:** En la Unión Soviética, Pravda («La Verdad») era el órgano oficial del Partido Comunista. Circulaba un chiste popular: «En Pravda no hay noticias y en Izvestia no hay verdad».

### 10. Las garantías

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `negocio_refinerias`.

**Carta:** «Comandante, las empresas exigen garantías: no más nacionalizaciones y que sus beneficios salgan del país.»

- **A. Firmar las garantías.** *La Revolución puede firmar cualquier cosa cuando lo necesita.* Potencias +8 · Élite +6 · Pueblo −7 · Crisis −1
- **B. Negarse a firmar.** *Ninguna empresa extranjera pondrá condiciones en nuestra Patria.* Potencias −8 · Pueblo +6 · Élite −5 · Crisis +1

**Archivo histórico:** En 1967, el régimen de Suharto en Indonesia aprobó una ley de inversión extranjera que garantizaba a las empresas que no serían nacionalizadas, para atraer capital tras años de inestabilidad.

### 11. Elecciones controladas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `elecciones_prometidas`.

**Carta:** «Comandante, las elecciones prometidas están a la vista. El Partido propone una lista única para evitar confusiones.»

- **A. Lista única.** *El Pueblo no necesita elegir entre nosotros.* Pueblo −6 · Élite +5 · Ejército +3
- **B. Varias listas.** *Que voten libremente. El resultado ya está claro.* Pueblo +6 · Potencias +5 · Élite −5 · Ejército −3

**Archivo histórico:** En el referéndum de 2002 en Irak, el gobierno de Sadam Huseín anunció un 100 % de votos a favor, con una participación también del 100 %.

### 12. Estudiantes en la calle

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `elecciones_aplazadas`.

**Carta:** «Comandante, los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.»

- **A. Hablar con delegados.** *Primero quiero saber quiénes son los que saben escribir.* Pueblo +7 · Ejército −5 · Élite −2
- **B. Desalojar la universidad.** *La universidad es para estudiar, no para hacer política.* Pueblo −8 · Ejército +6 · Potencias −4 · Bandera: `estudiantes_reprimidos`

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

**Archivo histórico:** En noviembre de 1973, estudiantes ocuparon la Escuela Politécnica de Atenas contra la junta militar griega. El día 17 un tanque derribó la puerta y la protesta fue aplastada.

### 13. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `viejos_oficiales`.

**Carta:** «Comandante, los oficiales jubilados fundaron un club de ajedrez. Se reúnen en secreto y no juegan al ajedrez.»

- **A. Disolver el club.** *La Revolución no tiene paciencia para reuniones sin permiso.* Ejército −6 · Élite +3 · Potencias −3
- **B. Ofrecerles cargos.** *Que conspiren dentro del gobierno; allí puedo vigilarlos.* Ejército +6 · Élite −3 · Crisis +1

**Archivo histórico:** En octubre de 1970, un grupo ligado al general retirado Roberto Viaux intentó secuestrar en Chile al jefe del Ejército, René Schneider, que murió días después. Buscaban impedir que el Congreso ratificara a Salvador Allende.

### 14. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Comandante, solicito autorización para crear una unidad que investigue a la propia policía. Yo la dirigiría, por discreción.»

- **A. Autorizar la unidad.** *Quien vigila a todos debe saber que también lo vigilan.* Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Denegar la unidad.** *Un hombre con tanto poder nunca debe sentirse cómodo.* Ejército −8 · Pueblo +4 · Élite +5

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

**Archivo histórico:** Lavrenti Beria dirigió la policía política soviética desde 1938. Tras la muerte de Stalin, en 1953, fue detenido por sus propios compañeros de dirección y ejecutado ese mismo año.

### 15. Huelga en el puerto

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `sindicato_libre`; solo si la crisis oculta llega a 2.

**Carta:** «Comandante, con la subida de precios el sindicato exige aumentos y amenaza con otra huelga en el puerto.»

- **A. Subir los salarios.** *El Pueblo puede soportar precios altos; lo que no puede es dudar.* Pueblo +8 · Élite −5 · Crisis +2
- **B. Prohibir la huelga.** *La Patria no se puede parar porque alguien esté descontento.* Pueblo −8 · Ejército +5 · Élite +5

**Archivo histórico:** En agosto de 1980, una huelga en los astilleros de Gdansk, tras una subida de precios de la carne, acabó con la creación de Solidaridad, el primer sindicato independiente del bloque soviético.

### 16. Panfletos en la universidad

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `huelga_reprimida`.

**Carta:** «Comandante, aparecen panfletos en la universidad. Los hijos de los estibadores aún no han olvidado el puerto.»

- **A. Becas para todos.** *Una beca vale más que un panfleto.* Pueblo +6 · Élite −4 · Crisis +1
- **B. Expulsar a los cabecillas.** *La universidad enseñará lo que la Revolución considere necesario.* Pueblo −6 · Ejército +5 · Potencias −3

**Archivo histórico:** El 2 de octubre de 1968, el ejército y las fuerzas de seguridad dispararon contra una concentración de estudiantes en Tlatelolco, Ciudad de México, pocos días antes de los Juegos Olímpicos.

### 17. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Comandante, los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o una gallina.»

- **A. Investigarlas todas.** *Más vale investigar a cien inocentes que dejar escapar a un enemigo.* Ejército +6 · Pueblo −7 · Élite +2
- **B. Castigar las falsas.** *La Revolución necesita confidentes, no bromistas.* Pueblo +7 · Ejército −5 · Élite −2

**Archivo histórico:** En la Unión Soviética de 1937 y 1938, muchas detenciones empezaron con denuncias de vecinos y compañeros de trabajo, a veces por rencillas personales.

### 18. Una carta con firmas

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige alguna de `policia_tradicional`, `exiliados_vocales`, `critica_abierta`.

**Carta:** «Comandante, intelectuales han firmado una carta pidiendo respetar los derechos que usted mismo prometió.»

- **A. Recibir a los firmantes.** *Quiero conocer a los que creen que eso depende de mí.* Pueblo +6 · Potencias +5 · Ejército −5 · Élite −3
- **B. Prohibir la carta.** *No permitiré que cuatro firmas aparenten dividir al Pueblo.* Pueblo −6 · Ejército +5 · Potencias −5 · Élite +3

**Archivo histórico:** En enero de 1977, un grupo de intelectuales checoslovacos publicó la Carta 77, que criticaba al gobierno por incumplir los derechos humanos que había firmado en los acuerdos de Helsinki.

### 19. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Comandante, se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.»

- **A. Contratar extranjeros.** *La Revolución necesita profesionales, no importa el pasaporte.* Potencias +6 · Élite −4 · Crisis +1 · Pueblo +1
- **B. Formar a los fieles.** *Primero lealtad; el oficio se aprende después.* Élite +5 · Pueblo −1 · Ejército +2

**Archivo histórico:** Tras 1959 salieron de Cuba muchos profesionales con formación. Se suele citar que cerca de la mitad de los médicos abandonó el país en pocos años.

### 20. Intentos de fuga

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `frontera_cerrada`, `criticos_detenidos`, `exiliados_vocales`.

**Carta:** «Comandante, tres familias intentaron cruzar la frontera en una barca. Una era la de un viceministro.»

- **A. Reforzar la frontera.** *Quien abandona la Patria debe explicar por qué.* Ejército +6 · Potencias −5 · Pueblo −5
- **B. Amnistía a quien vuelva.** *Que vuelvan; aún tenemos preguntas para ellos.* Pueblo +6 · Potencias +4 · Ejército −6

**Archivo histórico:** Entre 1961 y 1989, al menos 140 personas murieron en relación con el Muro de Berlín, la mayoría intentando cruzarlo.

### 21. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`.

**Carta:** «Comandante, el embargo ya es total: no entran medicinas, repuestos ni, al parecer, nuestras quejas.»

- **A. Racionar la escasez.** *El Pueblo tendrá exactamente lo que la Patria pueda darle.* Pueblo −6 · Élite −2 · Crisis −1
- **B. Contrabando oficial.** *La soberanía también puede entrar por la puerta de atrás.* Pueblo +6 · Élite +2 · Potencias −4 · Crisis +1

**Archivo histórico:** En agosto de 1990, tras la invasión de Kuwait, el Consejo de Seguridad de la ONU impuso sanciones económicas casi totales a Irak. El país sufrió escasez y una fuerte inflación durante años.

### 22. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Comandante, mañana vence el primer pago de las compensaciones. En caja hay menos de lo prometido.»

- **A. Pagar la cuota.** *La Revolución cumple cuando le conviene.* Potencias +6 · Élite +3 · Pueblo −7 · Crisis −2
- **B. Pedir prórroga.** *La Historia puede esperar; los acreedores tendrán que aprender.* Potencias −6 · Crisis +3 · Élite −3

**Archivo histórico:** En los años setenta, Polonia se endeudó con bancos occidentales para modernizar su industria. En 1981 tuvo que suspender pagos y renegociar su deuda.

### 23. El plan quinquenal

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, proponemos un plan quinquenal con metas para cada fábrica, granja y tienda.»

- **A. Plan quinquenal.** *El éxito de la Revolución empieza por escribirlo.* Élite +5 · Pueblo −4 · Crisis +2
- **B. Dejar al mercado.** *El mercado funciona mientras haga lo que se le dice.* Pueblo +4 · Potencias +4 · Élite −4

**Archivo histórico:** El primer plan quinquenal soviético empezó en 1928 y fijó metas de producción para la industria y la agricultura. Muchas cifras oficiales se cumplieron en los informes más que en las fábricas.

### 24. La cosecha récord

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, la cosecha es récord, según los informes. Los almacenes, curiosamente, están vacíos.»

- **A. Proclamar el récord.** *El Pueblo no come estadísticas, pero escucha las noticias.* Pueblo +5 · Élite +3 · Crisis +2
- **B. Pedir cifras reales.** *Quiero saber cuánto falta antes de decidir a quién culpar.* Pueblo −4 · Élite −4 · Crisis −1

**Archivo histórico:** Durante el Gran Salto Adelante en China (1958-1962), muchos funcionarios locales informaron de cosechas infladas para complacer al Partido. El Estado requisó grano que luego faltó, y la hambruna causó millones de muertes.

### 25. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.»

- **A. Expulsarlo.** *Que visite otro país. Aquí ya ha visto demasiado.* Potencias −5 · Ejército +5
- **B. Intercambiarlo.** *La Patria también puede negociar con sus enemigos.* Potencias +5 · Ejército −5 · Élite +2

**Archivo histórico:** El 10 de febrero de 1962, en el puente de Glienicke, entre Berlín y Potsdam, Estados Unidos y la Unión Soviética intercambiaron al piloto Francis Gary Powers por el espía soviético Rudolf Abel.

### 26. Los chistes

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, circula un chiste sobre usted por todas las oficinas. Al final, todos miran al techo.»

- **A. Tribunal del humor.** *Quiero saber quién se ríe cuando cree que nadie lo escucha.* Pueblo −6 · Ejército +4 · Élite +2
- **B. Contar uno mejor.** *El mejor chiste sobre un dictador es el que todos aplauden.* Pueblo +5 · Ejército −3 · Élite −2

**Archivo histórico:** En la Unión Soviética de Stalin, contar chistes políticos podía castigarse como «agitación antisoviética», según el artículo 58 del código penal.
