# Cartas · Era 2: La Purga

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 cartas. 20 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.7.

### 1. El aniversario

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 2 de su era.

**Carta:** «Para el aniversario de la Revolución, el Ejército pide tanques y el Pueblo ron. No hay para ambos.»

- **A. Que aplaudan a los tanques** Ejército +8 · Élite +4 · Pueblo −7 · Crisis +1 · Bandera: `desfile_militar`
- **B. Repartan ron en mi nombre** Pueblo +7 · Ejército −8 · Élite −4

**Consecuencia futura de `desfile_militar`:** El Ejército espera cada año un desfile mayor.

### 2. La mano del norte

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `no_alineado`.

**Carta:** «Le daremos créditos y comercio si se porta bien y nos deja auditarle.»

- **A. Será un honor rendir cuentas** Potencias +8 · Élite +5 · Pueblo −5 · Crisis +1 · Bandera: `deuda_externa`
- **B. Aquí solo audita el Pueblo** Potencias −8 · Pueblo +6 · Élite −4

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 3. Las potencias se enfadan

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `juicios_publicos`.

**Carta:** «Nuestro país pide garantías para los acusados de sus juicios públicos que aún esperan sentencia.»

- **A. Tendrán abogados «de confianza»** Potencias +7 · Pueblo −6 · Élite +3
- **B. Los juicios son asunto nuestro** Potencias −7 · Ejército +5 · Élite −3

### 4. La voz del exilio

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `exiliados_vocales`.

**Carta:** «Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha.»

- **A. Apagón donde llegue la señal** Pueblo −6 · Ejército +4 · Élite +3
- **B. Son agentes del imperialismo** Pueblo +5 · Potencias +4 · Élite −3

### 5. El hambre

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 14; exige `reforma_agraria`.

**Carta:** «Los campesinos tienen tierra, pero no semillas ni tractores. La cosecha ha caído a la mitad.»

- **A. La culpa es del imperialismo** Pueblo −6 · Élite +3 · Crisis −1
- **B. Importen la canasta básica** Pueblo +6 · Potencias +5 · Crisis +2

### 6. El periodista oficial

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `censura_previa`.

**Carta:** «Nadie cree los periódicos, pero sí los rumores. Propongo un periodista oficial que los desmienta.»

- **A. Nombren un Vocero de la Verdad** Pueblo −5 · Élite +5 · Ejército +3 · Bandera: `periodista_oficial`
- **B. Apunten quién los repite** Pueblo +5 · Élite −5 · Ejército −3

**Consecuencia futura de `periodista_oficial`:** La prensa del régimen exige titulares cada vez más generosos.

### 7. El club de ajedrez

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `viejos_oficiales`.

**Carta:** «Los oficiales jubilados tienen un «club de ajedrez». No juegan al ajedrez.»

- **A. Arresto domiciliario para todos** Ejército −6 · Élite +3 · Potencias −3
- **B. Vigilen cada movimiento** Ejército +6 · Élite −3 · Crisis +1

### 8. El jefe pide más

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `purga_inicial`.

**Carta:** «Propongo crear una unidad que vigile a la propia policía. La dirigiría yo.»

- **A. Autorizo la unidad especial** Ejército +8 · Élite −5 · Pueblo −4 · Bandera: `jefe_poderoso`
- **B. Denegado** Ejército −8 · Pueblo +4 · Élite +5

**Consecuencia futura de `jefe_poderoso`:** El Ministro del Interior pide cada vez más poder.

### 9. Panfletos en la universidad

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 14; exige `huelga_reprimida`.

**Carta:** «Los hijos de los estibadores reparten panfletos en la universidad. Recuerdan lo del puerto.»

- **A. Sus compañeros los educarán** Pueblo +6 · Élite −4 · Crisis +1
- **B. Expúlsenlos, a cortar caña** Pueblo −6 · Ejército +5 · Potencias −3

### 10. Denuncias falsas

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `comites_vigilancia`, `purga_inicial`, `criticos_detenidos`.

**Carta:** «Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o una gallina.»

- **A. Investigarlas todas.** *Más vale investigar a cien inocentes que dejar escapar a un enemigo.* Ejército +6 · Pueblo −7 · Élite +2
- **B. Castigar las falsas.** *La Revolución necesita confidentes, no bromistas.* Pueblo +7 · Ejército −5 · Élite −2

### 11. Faltan técnicos

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `exodo_elite`, `juicios_publicos`, `nacionalizo_empresas`.

**Carta:** «Se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.»

- **A. Contratar extranjeros.** *La Revolución necesita profesionales, no importa el pasaporte.* Potencias +6 · Élite −4 · Crisis +1 · Pueblo +1
- **B. Formar a los fieles.** *Primero lealtad; el oficio se aprende después.* Élite +5 · Pueblo −1 · Ejército +2

### 12. Intentos de fuga

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige alguna de `frontera_cerrada`, `criticos_detenidos`, `exiliados_vocales`.

**Carta:** «Tres familias intentaron cruzar la frontera en una barca. Una era la de un viceministro.»

- **A. Reforzar la frontera.** *Quien abandona la Patria debe explicar por qué.* Ejército +6 · Potencias −5 · Pueblo −5
- **B. Amnistía a quien vuelva.** *Que vuelvan; aún tenemos preguntas para ellos.* Pueblo +6 · Potencias +4 · Ejército −6

### 13. La deuda llama

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige alguna de `compensaciones`, `deuda_externa`.

**Carta:** «Mañana vence el primer pago de las compensaciones. En caja hay menos de lo prometido.»

- **A. Pagar la cuota.** *La Revolución cumple cuando le conviene.* Potencias +6 · Élite +3 · Pueblo −7 · Crisis −2
- **B. Pedir prórroga.** *La Historia puede esperar; los acreedores tendrán que aprender.* Potencias −6 · Crisis +3 · Élite −3

### 14. La cosecha récord

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8.

**Carta:** «La cosecha es récord, según los informes. Los almacenes, curiosamente, están vacíos.»

- **A. Proclamar el récord.** *El Pueblo no come estadísticas, pero escucha las noticias.* Pueblo +5 · Élite +3 · Crisis +2
- **B. Pedir cifras reales.** *Quiero saber cuánto falta antes de decidir a quién culpar.* Pueblo −4 · Élite −4 · Crisis −1

### 15. El diplomático curioso

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8.

**Carta:** «Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.»

- **A. Expulsarlo.** *Que visite otro país. Aquí ya ha visto demasiado.* Potencias −5 · Ejército +5
- **B. Intercambiarlo.** *La Patria también puede negociar con sus enemigos.* Potencias +5 · Ejército −5 · Élite +2

### 16. Los chistes

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 8.

**Carta:** «Circula un chiste sobre usted por todas las oficinas. Al final, todos miran al techo.»

- **A. Tribunal del humor.** *Quiero saber quién se ríe cuando cree que nadie lo escucha.* Pueblo −6 · Ejército +4 · Élite +2
- **B. Contar uno mejor.** *El mejor chiste sobre un dictador es el que todos aplauden.* Pueblo +5 · Ejército −3 · Élite −2

### 17. Los satélites

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `misiles_instalados`.

**Carta:** «Nuestros satélites siguen contando sus misiles y pedimos una inspección. Aceptarla evitaría un incidente mayor.»

- **A. Permitir la inspección.** *Que inspeccionen; para entonces ya habremos hecho el cambio.* Potencias +8 · Ejército −7 · Élite +2
- **B. Negarse.** *La soberanía no se inspecciona.* Potencias −8 · Ejército +7 · Élite −2 · Crisis +1

### 18. El aliado enfadado

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 14; exige `misiles_rechazados`.

**Carta:** «Nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.»

- **A. Pedir disculpas.** *Una amistad duradera también exige saber pedir perdón.* Potencias +8 · Pueblo −6 · Ejército −2
- **B. Buscar otro proveedor.** *El petróleo no tiene ideología, solo precio.* Potencias −8 · Pueblo +6 · Ejército +2 · Crisis +1

### 19. La zafra de los diez millones

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Para batir el récord de la zafra proponemos movilizar durante tres meses a estudiantes, oficinistas y soldados.»

- **A. Todos a la zafra.** *El que corta caña no conspira.* Pueblo −6 · Ejército +3 · Élite +3 · Crisis −1
- **B. Contratar jornaleros.** *La Revolución también puede pagar a quien trabaja.* Pueblo +6 · Ejército −3 · Élite −3 · Crisis +1

### 20. Las flores en el mar

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `accidente_cienfuegos`.

**Carta:** «Cada año más gente tira flores al mar el día del accidente de Cienfuegos.»

- **A. Declaren la playa zona militar** Ejército +6 · Pueblo −6
- **B. Encabezaré yo los homenajes** Pueblo +6 · Ejército −6
