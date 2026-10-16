# Cartas · Era 2: La Purga

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 cartas. 26 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.7.

### 1. El aniversario

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «Para el aniversario de la Revolución, el Ejército pide tanques y el Pueblo ron. No hay para ambos.»

- **A. Que aplaudan a los tanques** Ejército +8 · Élite +4 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. Repartan ron en mi nombre** Pueblo +7 · Ejército −8 · Élite −4

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

### 2. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 2 a 4 de su era; exige `alineado_bloque_oriental`.

**Carta:** «Nuestro país le ofrece misiles de alcance medio, instalados y apuntando a donde usted diga.»

- **A. Ahora sí nos respetarán** Ejército +8 · Potencias +7 · Pueblo −7 · Élite −4 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 a 2 años
- **B. Nuestro misil es el Pueblo** Ejército −8 · Potencias −7 · Pueblo +7 · Élite +4 · Bandera: `misiles_rechazados`

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_rechazados`:** El aliado recuerda tu negativa.

### 3. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Nuestros barcos rodearán su costa hasta que retire los misiles.»

- **A. Que disfruten de la vista** Ejército +8 · Potencias −9 · Pueblo −4 · Crisis +2 · Bandera: `embargo_en_marcha`
- **B. Se irán como nunca vinieron** Ejército −8 · Potencias +9 · Pueblo +4 · Crisis −1

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 4. La mano del norte

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `no_alineado`.

**Carta:** «Le daremos créditos y comercio si se porta bien y nos deja auditarle.»

- **A. Será un honor rendir cuentas** Potencias +8 · Élite +5 · Pueblo −5 · Crisis +1 · Bandera: `deuda_externa`
- **B. Aquí solo audita el Pueblo** Potencias −8 · Pueblo +6 · Élite −4

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 5. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `juicios_publicos`.

**Carta:** «Nuestro país pide garantías para los acusados de sus juicios públicos que aún esperan sentencia.»

- **A. Tendrán abogados «de confianza»** Potencias +7 · Pueblo −6 · Élite +3
- **B. Los juicios son asunto nuestro** Potencias −7 · Ejército +5 · Élite −3

### 6. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha.»

- **A. Apagón donde llegue la señal** Pueblo −6 · Ejército +4 · Élite +3
- **B. Son agentes del imperialismo** Pueblo +5 · Potencias +4 · Élite −3

### 7. El general murmura

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 18; exige `general_popular`; solo si Ejército está en 40 o menos.

**Carta:** «Cienfuegos está recibiendo oficiales en su casa. Dicen que habla de usted en pasado.»

- **A. Pregúntenle por sus hijos** Ejército +9 · Élite −5
- **B. Que tenga un accidente heroico** Ejército −9 · Pueblo −5 · Potencias −4 · Élite +5 · Bandera: `accidente_cienfuegos`

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Cienfuegos.

### 8. El hambre

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «Los campesinos tienen tierra, pero no semillas ni tractores. La cosecha ha caído a la mitad.»

- **A. La culpa es del imperialismo** Pueblo −6 · Élite +3 · Crisis −1
- **B. Importen la canasta básica** Pueblo +6 · Potencias +5 · Crisis +2

### 9. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «Nadie cree los periódicos, pero sí los rumores. Propongo un periodista oficial que los desmienta.»

- **A. Nombren un Vocero de la Verdad** Pueblo −5 · Élite +5 · Ejército +3 · Bandera: `periodista_oficial`
- **B. Apunten quién los repite** Pueblo +5 · Élite −5 · Ejército −3

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

### 10. Las garantías

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige `negocio_refinerias`.

**Carta:** «Las empresas exigen garantías: no más nacionalizaciones y que sus beneficios salgan del país.»

- **A. Firmar las garantías.** *La Revolución puede firmar cualquier cosa cuando lo necesita.* Potencias +8 · Élite +6 · Pueblo −7 · Crisis −1
- **B. Negarse a firmar.** *Ninguna empresa extranjera pondrá condiciones en nuestra Patria.* Potencias −8 · Pueblo +6 · Élite −5 · Crisis +1

### 11. Elecciones controladas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `elecciones_prometidas`.

**Carta:** «Las elecciones prometidas están a la vista. El Partido propone una lista única para evitar confusiones.»

- **A. Lista única.** *El Pueblo no necesita elegir entre nosotros.* Pueblo −6 · Élite +5 · Ejército +3
- **B. Varias listas.** *Que voten libremente. El resultado ya está claro.* Pueblo +6 · Potencias +5 · Élite −5 · Ejército −3

### 12. Estudiantes en la calle

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `elecciones_aplazadas`.

**Carta:** «Los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.»

- **A. Hablar con delegados.** *Primero quiero saber quiénes son los que saben escribir.* Pueblo +7 · Ejército −5 · Élite −2
- **B. Desalojar la universidad.** *La universidad es para estudiar, no para hacer política.* Pueblo −8 · Ejército +6 · Potencias −4 · Bandera: `estudiantes_reprimidos`

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

### 13. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `viejos_oficiales`.

**Carta:** «Los oficiales jubilados fundaron un club de ajedrez. Se reúnen en secreto y no juegan al ajedrez.»

- **A. Disolver el club.** *La Revolución no tiene paciencia para reuniones sin permiso.* Ejército −6 · Élite +3 · Potencias −3
- **B. Ofrecerles cargos.** *Que conspiren dentro del gobierno; allí puedo vigilarlos.* Ejército +6 · Élite −3 · Crisis +1

### 14. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Solicito autorización para crear una unidad que investigue a la propia policía. Yo la dirigiría, por discreción.»

- **A. Autorizar la unidad.** *Quien vigila a todos debe saber que también lo vigilan.* Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Denegar la unidad.** *Un hombre con tanto poder nunca debe sentirse cómodo.* Ejército −8 · Pueblo +4 · Élite +5

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

### 15. Huelga en el puerto

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `sindicato_libre`; solo si la crisis oculta llega a 2.

**Carta:** «Con la subida de precios el sindicato exige aumentos y amenaza con otra huelga en el puerto.»

- **A. Subir los salarios.** *El Pueblo puede soportar precios altos; lo que no puede es dudar.* Pueblo +8 · Élite −5 · Crisis +2
- **B. Prohibir la huelga.** *La Patria no se puede parar porque alguien esté descontento.* Pueblo −8 · Ejército +5 · Élite +5

### 16. Panfletos en la universidad

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `huelga_reprimida`.

**Carta:** «Aparecen panfletos en la universidad. Los hijos de los estibadores aún no han olvidado el puerto.»

- **A. Becas para todos.** *Una beca vale más que un panfleto.* Pueblo +6 · Élite −4 · Crisis +1
- **B. Expulsar a los cabecillas.** *La universidad enseñará lo que la Revolución considere necesario.* Pueblo −6 · Ejército +5 · Potencias −3

### 17. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o una gallina.»

- **A. Investigarlas todas.** *Más vale investigar a cien inocentes que dejar escapar a un enemigo.* Ejército +6 · Pueblo −7 · Élite +2
- **B. Castigar las falsas.** *La Revolución necesita confidentes, no bromistas.* Pueblo +7 · Ejército −5 · Élite −2

### 18. Una carta con firmas

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige alguna de `policia_tradicional`, `exiliados_vocales`, `critica_abierta`.

**Carta:** «Intelectuales han firmado una carta pidiendo respetar los derechos que usted mismo prometió.»

- **A. Recibir a los firmantes.** *Quiero conocer a los que creen que eso depende de mí.* Pueblo +6 · Potencias +5 · Ejército −5 · Élite −3
- **B. Prohibir la carta.** *No permitiré que cuatro firmas aparenten dividir al Pueblo.* Pueblo −6 · Ejército +5 · Potencias −5 · Élite +3

### 19. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.»

- **A. Contratar extranjeros.** *La Revolución necesita profesionales, no importa el pasaporte.* Potencias +6 · Élite −4 · Crisis +1 · Pueblo +1
- **B. Formar a los fieles.** *Primero lealtad; el oficio se aprende después.* Élite +5 · Pueblo −1 · Ejército +2

### 20. Intentos de fuga

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `frontera_cerrada`, `criticos_detenidos`, `exiliados_vocales`.

**Carta:** «Tres familias intentaron cruzar la frontera en una barca. Una era la de un viceministro.»

- **A. Reforzar la frontera.** *Quien abandona la Patria debe explicar por qué.* Ejército +6 · Potencias −5 · Pueblo −5
- **B. Amnistía a quien vuelva.** *Que vuelvan; aún tenemos preguntas para ellos.* Pueblo +6 · Potencias +4 · Ejército −6

### 21. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 14; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`.

**Carta:** «El embargo ya es total: no entran medicinas, repuestos ni, al parecer, nuestras quejas.»

- **A. Racionar la escasez.** *El Pueblo tendrá exactamente lo que la Patria pueda darle.* Pueblo −6 · Élite −2 · Crisis −1
- **B. Contrabando oficial.** *La soberanía también puede entrar por la puerta de atrás.* Pueblo +6 · Élite +2 · Potencias −4 · Crisis +1

### 22. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Mañana vence el primer pago de las compensaciones. En caja hay menos de lo prometido.»

- **A. Pagar la cuota.** *La Revolución cumple cuando le conviene.* Potencias +6 · Élite +3 · Pueblo −7 · Crisis −2
- **B. Pedir prórroga.** *La Historia puede esperar; los acreedores tendrán que aprender.* Potencias −6 · Crisis +3 · Élite −3

### 23. El plan quinquenal

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 8.

**Carta:** «Proponemos un plan quinquenal con metas para cada fábrica, granja y tienda.»

- **A. Plan quinquenal.** *El éxito de la Revolución empieza por escribirlo.* Élite +5 · Pueblo −4 · Crisis +2
- **B. Dejar al mercado.** *El mercado funciona mientras haga lo que se le dice.* Pueblo +4 · Potencias +4 · Élite −4

### 24. La cosecha récord

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8.

**Carta:** «La cosecha es récord, según los informes. Los almacenes, curiosamente, están vacíos.»

- **A. Proclamar el récord.** *El Pueblo no come estadísticas, pero escucha las noticias.* Pueblo +5 · Élite +3 · Crisis +2
- **B. Pedir cifras reales.** *Quiero saber cuánto falta antes de decidir a quién culpar.* Pueblo −4 · Élite −4 · Crisis −1

### 25. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.»

- **A. Expulsarlo.** *Que visite otro país. Aquí ya ha visto demasiado.* Potencias −5 · Ejército +5
- **B. Intercambiarlo.** *La Patria también puede negociar con sus enemigos.* Potencias +5 · Ejército −5 · Élite +2

### 26. Los chistes

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 8.

**Carta:** «Circula un chiste sobre usted por todas las oficinas. Al final, todos miran al techo.»

- **A. Tribunal del humor.** *Quiero saber quién se ríe cuando cree que nadie lo escucha.* Pueblo −6 · Ejército +4 · Élite +2
- **B. Contar uno mejor.** *El mejor chiste sobre un dictador es el que todos aplauden.* Pueblo +5 · Ejército −3 · Élite −2
