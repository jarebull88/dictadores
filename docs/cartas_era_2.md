# Cartas · Era 2: Consolidación

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 26 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.7.

### 1. El aniversario

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «Comandante, se cumplen los primeros años de la revolución. Proponemos un gran desfile militar frente al palacio, con tanques.»

- **A. Gran desfile.** *Los tanques desfilan; las tiendas, no.* Ejército +8 · Élite +4 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. Fiesta popular.** *Música gratis y poco acero.* Pueblo +7 · Ejército −8 · Élite −4

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

**Archivo histórico:** Desde los años veinte, los desfiles de la Plaza Roja de Moscú mostraban cada 1 de mayo y cada 7 de noviembre la fuerza militar del régimen soviético, con los dirigentes saludando desde lo alto del mausoleo de Lenin.

### 2. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 2 a 4 de su era; exige `alineado_bloque_oriental`.

**Carta:** «Comandante, mi gobierno propone instalar en su territorio misiles de alcance medio. Sería una garantía para su seguridad frente a la potencia del norte.»

- **A. Aceptar los misiles.** *Protección con matrícula extranjera.* Ejército +8 · Potencias +7 · Pueblo −7 · Élite −4 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 a 2 años
- **B. Declinar.** *El aliado se ofende; los vecinos, no.* Ejército −8 · Potencias −7 · Pueblo +7 · Élite +4 · Bandera: `misiles_rechazados`

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_rechazados`:** El aliado recuerda tu negativa.

**Archivo histórico:** En octubre de 1962 la Unión Soviética instaló misiles nucleares de alcance medio en Cuba, lo que provocó la crisis de los misiles. Terminó cuando Moscú aceptó retirarlos a cambio de que Estados Unidos no invadiera la isla y, en secreto, retirara sus misiles de Turquía.

### 3. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Comandante, mi gobierno ha localizado instalaciones militares extranjeras en su territorio y exige su retirada inmediata, o habrá bloqueo naval.»

- **A. Mantener los misiles.** *Que bloqueen; ya comemos poco.* Ejército +8 · Potencias −9 · Pueblo −4 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Retirarlos.** *A oscuras, sin foto y sin ruido.* Ejército −8 · Potencias +9 · Pueblo +4 · Crisis −1

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 4. La mano del norte

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `no_alineado`.

**Carta:** «Comandante, mi gobierno ofrece créditos y comercio a un país que no pertenece a ningún bloque. Solo pedimos buenas maneras y algunas auditorías.»

- **A. Aceptar los créditos.** *Cada préstamo trae su auditor.* Potencias +8 · Élite +5 · Pueblo −5 · Crisis +1 · Bandera: `deuda_externa`
- **B. Seguir sin bloque.** *El orgullo no cotiza, pero abriga.* Potencias −8 · Pueblo +6 · Élite −4

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

**Archivo histórico:** Tras romper con Stalin en 1948, la Yugoslavia de Tito, comunista y no alineada, recibió ayuda económica y militar de Estados Unidos, y en 1961 impulsó en Belgrado la primera cumbre del Movimiento de Países No Alineados.

### 5. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `juicios_publicos`.

**Carta:** «Comandante, mi gobierno ha seguido con preocupación los juicios públicos y pide garantías para los acusados que aún esperan sentencia.»

- **A. Abogados de oficio.** *Del Partido, por supuesto.* Potencias +7 · Pueblo −6 · Élite +3
- **B. Asunto interno.** *Cada país, con sus tribunales.* Potencias −7 · Ejército +5 · Élite −3

**Archivo histórico:** Tras el golpe de 1967 en Grecia, la junta militar detuvo a miles de opositores. Varios países occidentales y el Consejo de Europa criticaron al régimen, y Grecia abandonó el Consejo en 1969 antes de ser expulsada.

### 6. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Comandante, los exiliados emiten por radio desde el extranjero y ya los escucha media capital. Dicen que el palacio tiene goteras.»

- **A. Interferir la emisora.** *El silencio también es una emisora.* Pueblo −6 · Ejército +4 · Élite +3
- **B. Contestar por radio.** *Con mejores chistes y peores noticias.* Pueblo +5 · Potencias +4 · Élite −3

**Archivo histórico:** Radio Europa Libre emitió hacia Europa del Este desde 1950 y Radio Martí hacia Cuba desde 1985. Los gobiernos de ambos países interfirieron las señales, con resultados desiguales.

### 7. El general murmura

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 18; exige `general_popular`; solo si Ejército está en 40 o menos.

**Carta:** «Comandante, el general Varela recibe oficiales en su casa. Dicen que habla de usted en pasado.»

- **A. Ascender a Varela.** *Un ascenso para que se calle.* Ejército +9 · Élite −4 · Crisis +1
- **B. Detener a Varela.** *Por conspirar contra el futuro.* Ejército −9 · Pueblo −5 · Potencias −4

**Archivo histórico:** En Egipto, el general Mohamed Naguib fue el primer presidente de la república en 1953. En 1954 fue apartado por Gamal Abdel Nasser y pasó casi dos décadas bajo arresto domiciliario.

### 8. El hambre

**Personaje:** Ministro de Agricultura  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «Comandante, los campesinos tienen tierra, pero no semillas, ni tractores, ni crédito. La cosecha ha caído a la mitad.»

- **A. Racionar los alimentos.** *La libreta, sin empujar, por favor.* Pueblo −6 · Élite +3 · Crisis −1
- **B. Importar comida.** *Pan extranjero y hambre propia.* Pueblo +6 · Potencias +5 · Crisis +2

**Archivo histórico:** En marzo de 1962 Cuba introdujo la libreta de abastecimiento para racionar alimentos y productos básicos, un sistema que se mantuvo durante décadas.

### 9. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «Comandante, ya no circulan noticias, solo rumores. Propongo un periodista oficial que los desmienta cada mañana.»

- **A. Periodista oficial.** *Desmiente lo cierto y confirma lo útil.* Pueblo −5 · Élite +5 · Ejército +3 · Bandera: `periodista_oficial`
- **B. Dejar que corran.** *Los rumores también se cansan.* Pueblo +5 · Élite −5 · Ejército −3

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

**Archivo histórico:** En la Unión Soviética, Pravda («La Verdad») era el órgano oficial del Partido Comunista. Circulaba un chiste popular: «En Pravda no hay noticias y en Izvestia no hay verdad».

### 10. Las garantías

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `negocio_refinerias`.

**Carta:** «Comandante, las empresas con las que negociamos exigen garantías por escrito: no habrá más nacionalizaciones y sus beneficios saldrán del país.»

- **A. Firmar las garantías.** *La palabra del Estado, en letra pequeña.* Potencias +8 · Élite +6 · Pueblo −7 · Crisis −1
- **B. Negarse a firmar.** *La soberanía no se hipoteca; se alquila.* Potencias −8 · Pueblo +6 · Élite −5 · Crisis +1

**Archivo histórico:** En 1967, el régimen de Suharto en Indonesia aprobó una ley de inversión extranjera que garantizaba a las empresas que no serían nacionalizadas, para atraer capital tras años de inestabilidad.

### 11. Elecciones controladas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `elecciones_prometidas`.

**Carta:** «Comandante, las elecciones prometidas están a la vista. El Partido propone presentar una lista única, para evitar confusiones.»

- **A. Lista única.** *Pluralidad: ninguna; confusión: cero.* Pueblo −6 · Élite +5 · Ejército +3
- **B. Varias listas.** *Que ganemos, pero por poco.* Pueblo +6 · Potencias +5 · Élite −5 · Ejército −3

**Archivo histórico:** En el referéndum de 2002 en Irak, el gobierno de Sadam Huseín anunció un 100 % de votos a favor, con una participación también del 100 %.

### 12. Estudiantes en la calle

**Personaje:** Ministro de Educación  
**Condición:** sorteo con peso 14; exige `elecciones_aplazadas`.

**Carta:** «Comandante, los estudiantes han ocupado la universidad y exigen las elecciones que usted aplazó. Algunos traen pancartas con faltas de ortografía.»

- **A. Hablar con delegados.** *Cada delegado, un expediente.* Pueblo +7 · Ejército −5 · Élite −2
- **B. Desalojar la universidad.** *Cerrada por reformas indefinidas.* Pueblo −8 · Ejército +6 · Potencias −4 · Bandera: `estudiantes_reprimidos`

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

**Archivo histórico:** En noviembre de 1973, estudiantes ocuparon la Escuela Politécnica de Atenas contra la junta militar griega. El día 17 un tanque derribó la puerta y la protesta fue aplastada.

### 13. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `viejos_oficiales`.

**Carta:** «Comandante, los oficiales jubilados han fundado un club de ajedrez. Se reúnen en secreto y, por lo visto, no juegan al ajedrez.»

- **A. Disolver el club.** *Las piezas, confiscadas por seguridad.* Ejército −6 · Élite +3 · Potencias −3
- **B. Ofrecerles cargos.** *Un jubilado con sueldo no conspira; cobra.* Ejército +6 · Élite −3 · Crisis +1

**Archivo histórico:** En octubre de 1970, un grupo ligado al general retirado Roberto Viaux intentó secuestrar en Chile al jefe del Ejército, René Schneider, que murió días después. Buscaban impedir que el Congreso ratificara a Salvador Allende.

### 14. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Comandante, solicito autorización para crear una unidad especial que investigue a la propia policía. Yo la dirigiría, por discreción.»

- **A. Autorizar la unidad.** *¿Quién vigila al que vigila? Yo.* Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Denegar la unidad.** *Un hombre con tantos archivos, mejor visible.* Ejército −8 · Pueblo +4 · Élite +5

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

**Archivo histórico:** Lavrenti Beria dirigió la policía política soviética desde 1938. Tras la muerte de Stalin, en 1953, fue detenido por sus propios compañeros de dirección y ejecutado ese mismo año.

### 15. Huelga en el puerto

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `sindicato_libre`; solo si la crisis oculta llega a 2.

**Carta:** «Comandante, con la subida de precios el sindicato exige aumentos de salario y amenaza con otra huelga en el puerto.»

- **A. Subir los salarios.** *Billetes nuevos para precios viejos.* Pueblo +8 · Élite −5 · Crisis +2
- **B. Prohibir la huelga.** *El derecho de huelga, en huelga.* Pueblo −8 · Ejército +5 · Élite +5

**Archivo histórico:** En agosto de 1980, una huelga en los astilleros de Gdansk, tras una subida de precios de la carne, acabó con la creación de Solidaridad, el primer sindicato independiente del bloque soviético.

### 16. Panfletos en la universidad

**Personaje:** Ministro de Educación  
**Condición:** sorteo con peso 14; exige `huelga_reprimida`.

**Carta:** «Comandante, los hijos de los estibadores ya estudian, y no han olvidado el puerto. Aparecen panfletos en la universidad.»

- **A. Becas para todos.** *Una beca vale más que un panfleto.* Pueblo +6 · Élite −4 · Crisis +1
- **B. Expulsar a los cabecillas.** *Aprenderán fuera del aula.* Pueblo −6 · Ejército +5 · Potencias −3

**Archivo histórico:** El 2 de octubre de 1968, el ejército y las fuerzas de seguridad dispararon contra una concentración de estudiantes en Tlatelolco, Ciudad de México, pocos días antes de los Juegos Olímpicos.

### 17. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Comandante, los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o por una gallina.»

- **A. Investigarlas todas.** *Quien denuncia tiene razón, hasta que lo denuncian.* Ejército +6 · Pueblo −7 · Élite +2
- **B. Castigar las falsas.** *Denunciar, sí. Mentir, no.* Pueblo +7 · Ejército −5 · Élite −2

**Archivo histórico:** En la Unión Soviética de 1937 y 1938, muchas detenciones empezaron con denuncias de vecinos y compañeros de trabajo, a veces por rencillas personales.

### 18. Una carta con firmas

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige alguna de `policia_tradicional`, `exiliados_vocales`, `critica_abierta`.

**Carta:** «Comandante, un grupo de intelectuales ha firmado una carta que pide respetar los derechos que usted mismo prometió.»

- **A. Recibir a los firmantes.** *Con café y un fotógrafo de la policía.* Pueblo +6 · Potencias +5 · Ejército −5 · Élite −3
- **B. Prohibir la carta.** *No se puede firmar lo que no existe.* Pueblo −6 · Ejército +5 · Potencias −5 · Élite +3

**Archivo histórico:** En enero de 1977, un grupo de intelectuales checoslovacos publicó la Carta 77, que criticaba al gobierno por incumplir los derechos humanos que había firmado en los acuerdos de Helsinki.

### 19. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Comandante, se han ido los ingenieros, los médicos y los contables. Las fábricas funcionan por pura voluntad.»

- **A. Contratar extranjeros.** *Los técnicos llegan; los sueldos, también.* Potencias +6 · Élite −4 · Crisis +1 · Pueblo +1
- **B. Formar a los fieles.** *Un carnet del Partido vale por un título.* Élite +5 · Pueblo −1 · Ejército +2

**Archivo histórico:** Tras 1959 salieron de Cuba muchos profesionales con formación. Se suele citar que cerca de la mitad de los médicos abandonó el país en pocos años.

### 20. Intentos de fuga

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `frontera_cerrada`, `criticos_detenidos`, `exiliados_vocales`.

**Carta:** «Comandante, anoche tres familias intentaron cruzar la frontera en una barca de pesca. Una era la de un viceministro.»

- **A. Reforzar la frontera.** *Más vallas y menos preguntas.* Ejército +6 · Potencias −5 · Pueblo −5
- **B. Amnistía a quien vuelva.** *Con asuntos pendientes, claro.* Pueblo +6 · Potencias +4 · Ejército −6

**Archivo histórico:** Entre 1961 y 1989, al menos 140 personas murieron en relación con el Muro de Berlín, la mayoría intentando cruzarlo.

### 21. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`.

**Carta:** «Comandante, el embargo ya es total: no entran medicinas, repuestos ni, al parecer, nuestras quejas.»

- **A. Racionar la escasez.** *Todos iguales: igualmente sin nada.* Pueblo −6 · Élite −2 · Crisis −1
- **B. Contrabando oficial.** *Ministerio de Importaciones Imaginarias.* Pueblo +6 · Élite +2 · Potencias −4 · Crisis +1

**Archivo histórico:** En agosto de 1990, tras la invasión de Kuwait, el Consejo de Seguridad de la ONU impuso sanciones económicas casi totales a Irak. El país sufrió escasez y una fuerte inflación durante años.

### 22. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Comandante, el primer pago de las compensaciones vence mañana. En caja hay menos de lo prometido y más de lo confesado.»

- **A. Pagar la cuota.** *Con el dinero del pan.* Potencias +6 · Élite +3 · Pueblo −7 · Crisis −2
- **B. Pedir prórroga.** *Mañana pagamos; siempre es mañana.* Potencias −6 · Crisis +3 · Élite −3

**Archivo histórico:** En los años setenta, Polonia se endeudó con bancos occidentales para modernizar su industria. En 1981 tuvo que suspender pagos y renegociar su deuda.

### 23. El plan quinquenal

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, proponemos un plan quinquenal: metas de producción para cada fábrica, cada granja y cada tienda.»

- **A. Plan quinquenal.** *Las metas se cumplen en el papel.* Élite +5 · Pueblo −4 · Crisis +2
- **B. Dejar al mercado.** *Decide lo que nosotros permitimos.* Pueblo +4 · Potencias +4 · Élite −4

**Archivo histórico:** El primer plan quinquenal soviético empezó en 1928 y fijó metas de producción para la industria y la agricultura. Muchas cifras oficiales se cumplieron en los informes más que en las fábricas.

### 24. La cosecha récord

**Personaje:** Ministro de Agricultura  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, la cosecha de este año es récord, según los informes. Los almacenes, curiosamente, están vacíos.»

- **A. Proclamar el récord.** *Las estadísticas nunca pasan hambre.* Pueblo +5 · Élite +3 · Crisis +2
- **B. Pedir cifras reales.** *Y un ministro menos, quizá.* Pueblo −4 · Élite −4 · Crisis −1

**Archivo histórico:** Durante el Gran Salto Adelante en China (1958-1962), muchos funcionarios locales informaron de cosechas infladas para complacer al Partido. El Estado requisó grano que luego faltó, y la hambruna causó millones de muertes.

### 25. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, hemos detenido a un diplomático extranjero con un mapa detallado de los cuarteles. Dice que es turista.»

- **A. Expulsarlo.** *Con escolta y con el mapa.* Potencias −5 · Ejército +5
- **B. Intercambiarlo.** *Por algo que nos hace más falta.* Potencias +5 · Ejército −5 · Élite +2

**Archivo histórico:** El 10 de febrero de 1962, en el puente de Glienicke, entre Berlín y Potsdam, Estados Unidos y la Unión Soviética intercambiaron al piloto Francis Gary Powers por el espía soviético Rudolf Abel.

### 26. Los chistes

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 8.

**Carta:** «Comandante, circula un chiste sobre usted por todas las oficinas. Termina con una pausa en la que la gente mira al techo.»

- **A. Tribunal del humor.** *Cada risa, un expediente.* Pueblo −6 · Ejército +4 · Élite +2
- **B. Contar uno mejor.** *El suyo, con aplausos obligatorios.* Pueblo +5 · Ejército −3 · Élite −2

**Archivo histórico:** En la Unión Soviética de Stalin, contar chistes políticos podía castigarse como «agitación antisoviética», según el artículo 58 del código penal.
