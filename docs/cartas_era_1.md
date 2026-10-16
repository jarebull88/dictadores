# Cartas · Era 1: Ascenso

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 23 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Hemos tomado el palacio. ¿Qué hacemos con los ministros del gobierno anterior?»

- **A. Juicio público** Pueblo +8 · Élite −7 · Potencias −5 · Bandera: `juicios_publicos`
- **B. Al exilio** Pueblo −8 · Élite +7 · Potencias +5 · Bandera: `exiliados_vocales`

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

### 2. La casa del tirano

**Personaje:** Ministra de Cultura  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «El palacio del tirano tiene piscina, cine y veinte habitaciones. ¿Lo convertimos en museo o se muda usted?»

- **A. Museo del Pueblo** Pueblo +8 · Élite −6
- **B. Me mudo yo** Pueblo −8 · Élite +6

### 3. Las arcas vacías

**Personaje:** Ministro de Economía  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «El tirano huyó con la reserva del banco nacional. No hay con qué pagar los sueldos de este mes.»

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

**Carta:** «Las refinerías extranjeras nos cierran las puertas. ¿Negociamos o las tomamos?»

- **A. Negociemos** Potencias +10 · Élite +6 · Pueblo −8 · Bandera: `negocio_refinerias`
- **B. ¡Exprópiese!** Pueblo +8 · Élite −6 · Potencias −10 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 3 a 8 años

**Consecuencia futura de `negocio_refinerias`:** Las empresas exigen garantías que limitan tus decisiones económicas.

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

### 6. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 4 a 7 de su era; a partir del año 4 de la era.

**Carta:** «Le ofrecemos ayuda económica y militar. A cambio queremos lealtad.»

- **A. Trato hecho** Potencias +9 · Pueblo +5 · Élite −6 · Crisis +2 · Bandera: `alineado_bloque_oriental`
- **B. No gracias** Élite +6 · Potencias −9 · Pueblo −5 · Crisis +1 · Bandera: `no_alineado`

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

**Carta:** «Ya sabemos quiénes nos critican. ¿Cómo procedemos?»

- **A. Es su derecho** Pueblo +8 · Ejército −5 · Potencias +5
- **B. Deténganlos** Pueblo −8 · Ejército +5 · Élite +4 · Potencias −5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 9. La tierra

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 12.

**Carta:** «Proponemos repartir las tierras entre los campesinos, pero los terratenientes protestarán.»

- **A. Mejor no** Pueblo −10 · Élite +8
- **B. Repártanla** Pueblo +10 · Élite −8 · Potencias −4 · Crisis +1 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

### 10. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «La prensa critica nuestros decretos. ¿Toleramos o censuramos?»

- **A. Que publiquen** Pueblo +6 · Potencias +6 · Ejército −4 · Bandera: `prensa_libre`
- **B. Censura no: revisión** Pueblo −6 · Élite +5 · Potencias −5 · Bandera: `censura_previa`

**Consecuencia futura de `prensa_libre`:** Un reportaje destapa un escándalo.

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

### 11. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «Usted prometió elecciones. ¿Cuándo piensa celebrarlas?»

- **A. En seis meses** Pueblo +9 · Potencias +7 · Ejército −4 · Élite −4 · Bandera: `elecciones_prometidas`
- **B. No hay prisa** Pueblo −9 · Potencias −7 · Ejército +4 · Élite +4 · Bandera: `elecciones_aplazadas`

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

### 12. La campaña de alfabetización

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 8.

**Carta:** «Propongo una campaña de alfabetización: que en un año todo el Pueblo sepa leer.»

- **A. Un Pueblo culto y agradecido** Pueblo +8 · Élite −6
- **B. Un Pueblo que lee pregunta** Pueblo −8 · Élite +6

### 13. Las escuelas para todos

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 8.

**Carta:** «Ningún niño debería pagar por aprender. Propongo que todas las escuelas sean públicas y gratuitas.»

- **A. Que todos aprendan lo mismo** Pueblo +5 · Élite −6 · Potencias −4
- **B. Algunos son más iguales que otros** Pueblo −5 · Élite +6 · Potencias +4

### 14. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 6.

**Carta:** «¿Y si dejamos que el Pueblo critique al gobierno libremente?»

- **A. Que hablen** Pueblo +8 · Élite −4 · Ejército −4 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 3 años
- **B. La Revolución no se cuestiona** Pueblo −8 · Ejército +4 · Élite +4

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

### 15. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Los oficiales del antiguo régimen siguen en sus puestos. ¿Qué hacemos?»

- **A. Jubílenlos** Ejército +7 · Élite +4 · Crisis +1 · Bandera: `viejos_oficiales`
- **B. ¡Al paredón!** Ejército −7 · Potencias −4 · Bandera: `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

### 16. El puerto parado

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 8; a partir del año 3 de la era.

**Carta:** «Los estibadores están en huelga. Exigen más sueldo y autonomía sindical.»

- **A. Sindicato concedido** Pueblo +10 · Élite −7 · Ejército −4 · Crisis +1 · Bandera: `sindicato_libre`
- **B. Manden al ejército** Pueblo −10 · Élite +7 · Ejército +4 · Potencias −4 · Bandera: `huelga_reprimida`

**Consecuencia futura de `sindicato_libre`:** Nuevas huelgas cuando la crisis sube.

**Consecuencia futura de `huelga_reprimida`:** Malestar en las universidades.

### 17. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 8; exige alguna de `purga_inicial`, `censura_previa`.

**Carta:** «¿Y si creamos Comités de Vigilancia Revolucionaria para vigilar los barrios?»

- **A. La Revolución somos todos** Ejército +6 · Élite +3 · Pueblo −7 · Bandera: `comites_vigilancia`
- **B. No necesitamos chivatos** Pueblo +7 · Ejército −6 · Élite −3 · Bandera: `policia_tradicional`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

**Consecuencia futura de `policia_tradicional`:** La oposición se organiza con más facilidad.

### 18. El retrato

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 6; a partir del año 4 de la era.

**Carta:** «Quieren su retrato en cada aula y una estatua en la plaza. ¿Qué opina?»

- **A. Si insisten…** Pueblo +1 · Élite +6 · Ejército +4 · Crisis +1 · Bandera: `culto_iniciado`
- **B. No necesito estatuas** Pueblo −1 · Potencias +2 · Élite −6 · Ejército −4 · Bandera: `modestia_aparente`

**Consecuencia futura de `culto_iniciado`:** Tratamiento de Excelencia y monumentos cada vez más costosos.

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

### 19. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Cada vez se van más ricos. ¿Los dejamos escapar o les prohibimos salir?»

- **A. Que se vayan, sin el dinero** Pueblo +7 · Élite −7 · Potencias −4 · Crisis −1 · Bandera: `exodo_elite`
- **B. Frontera cerrada** Ejército +6 · Élite +7 · Pueblo −7 · Potencias −8 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

### 20. La factura *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Hemos prometido demasiado. ¿Subimos los precios o pedimos un préstamo?»

- **A. Suban los precios** Pueblo −10 · Élite +6 · Crisis −3
- **B. Que paguen nuestros nietos** Potencias +8 · Élite +4 · Crisis −3 · Bandera: `deuda_externa`

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.

### 21. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Las tiendas están vacías. ¿Racionamos o toleramos el mercado negro?»

- **A. Escasez, pero justa** Pueblo −8 · Ejército +4 · Élite −5 · Crisis −3
- **B. Ojos que no ven** Pueblo +8 · Élite +5 · Potencias −4 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 22. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Hay oficiales reuniéndose con los manifestantes. Si se unen, caemos. ¿Los compramos o los cortamos?»

- **A. Ascender oficiales** Ejército +12 · Élite −6 · Crisis +2
- **B. Detener cabecillas** Pueblo −6 · Ejército +8 · Potencias −6

### 23. El dinero se va *(borrador)*

**Personaje:** Ministro de Economía  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Los empresarios se reúnen con los embajadores. Si se alían, nos asfixian.»

- **A. Mimen a los empresarios** Élite +9 · Pueblo −8 · Crisis +2
- **B. Intervenir sus empresas** Potencias −8 · Pueblo +8 · Élite −9
