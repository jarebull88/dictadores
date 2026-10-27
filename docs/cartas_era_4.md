# Cartas · Era 4: La Supervivencia

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 34 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.4.

### 1. Últimas palabras

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Los médicos dicen que es el final. El país entero espera sus últimas palabras.»

- **A. No me iré nunca del todo**  · Bandera: `ultimas_eterno`
- **B. Es solo un apagón, volveré**  · Bandera: `ultimas_apagon`

### 2. La tribuna

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Llevamos meses marchando por el niño. Proponemos una tribuna fija frente a la embajada occidental.»

- **A. Una tribuna para gritar siempre** Élite +4 · Pueblo −4 · Encola: `el_regreso` en 1 a 2 años
- **B. Ya gritaron bastante, a trabajar** Pueblo +4 · Élite −4 · Encola: `el_regreso` en 1 a 2 años

### 3. El regreso

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «El niño volverá con su padre. Nuestro gobierno espera que no lo convierta en un trofeo.»

- **A. Algo sencillo: un millón en la plaza** Élite +4 · Pueblo −3
- **B. Lo recibirá su padre y nadie más** Pueblo +3 · Élite −4

### 4. El acreedor pide favores

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `deuda_externa`.

**Carta:** «El acreedor perdonará los intereses si en los foros internacionales votamos siempre con él.»

- **A. Mi delegado levantará las dos manos** Potencias +7 · Élite −2 · Crisis −2
- **B. Pagaremos apretando el cinturón** Potencias −7 · Pueblo −5 · Élite +3 · Crisis +1

### 5. El mausoleo

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «El Partido ya diseña su tumba: un cacho de roca gigante que dicen que se parece a usted.»

- **A. Seré una piedra eterna** Élite +4 · Pueblo −4 · Crisis +2 · Bandera: `mausoleo_construido`
- **B. Entiérrenme como viví: con humildad** Élite −3 · Crisis −1

**Consecuencia futura de `mausoleo_construido`:** La roca eterna espera a su inquilino.

### 6. El delfín impaciente

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `sucesor_designado`.

**Carta:** «Su hermano ya recibe embajadores en su despacho y reparte sus propios retratos por las escuelas.»

- **A. En los retratos solo salgo yo** Ejército −5 · Crisis +1
- **B. Que gobierne él y yo le corrijo** Ejército +5 · Élite −3

### 7. Los inocentes

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `oposicion_culpada`.

**Carta:** «Tenemos pruebas de que la oposición de dentro no tuvo nada que ver con lo del avión. Pedimos que se libere a los presos.»

- **A. Si los quieres, te los llevas** Potencias +5 · Ejército −4
- **B. Pruebas fabricadas por su espionaje** Potencias −5 · Ejército +4 · Pueblo −3

### 8. Las bombas de los hoteles

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Han estallado bombas en tres hoteles. El detenido confiesa que le pagaban desde el extranjero por cada bomba.»

- **A. Que los turistas no se enteren** Ejército +3 · Potencias +3 · Pueblo −2
- **B. Juicio para que lo vea el mundo** Potencias −5 · Élite +3 · Crisis +1

### 9. Los militares empresarios

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14.

**Carta:** «Los generales ya saben de tanques. Ahora quieren aprender de hoteles, tiendas y divisas.»

- **A. Que cada general tenga su hotel** Ejército +6 · Élite −4
- **B. Los negocios son cosa de ministros** Élite +4 · Ejército −3

### 10. El batallón

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `estado_policial`.

**Carta:** «El batallón especial ya ha llenado las cárceles. Pedimos más celdas y más sueldo para seguir así.»

- **A. Más celdas y más sueldo** Ejército +6 · Pueblo −4
- **B. Que el Partido mande a sus brigadas** Élite +5 · Ejército −4 · Pueblo −2

### 11. La salud

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «La radio del exilio lo ha dado por muerto tres veces este mes. Algunos se pelean por su despacho.»

- **A. Apunten quién se pelea por mi silla** Ejército +4 · Élite −5
- **B. Que me graben corriendo en chándal** Élite +3 · Crisis −1

### 12. El plebiscito

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «La oposición quiere votar si hay elecciones libres. Y la Constitución se lo permite, por desgracia.»

- **A. Adelante, que el Pueblo decida** Pueblo +6 · Élite −4 · Encola: `el_escrutinio` en 1 a 2 años
- **B. Pues que el 99 % firme lo contrario** Élite +5 · Pueblo −5

### 13. El escrutinio

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Ha ganado el «Sí» a las elecciones libres, pero el resultado aún no es oficial.»

- **A. Elecciones con un solo candidato** Pueblo +3 · Élite +2 · Crisis +2 · Bandera: `derrota_aceptada`
- **B. Cuenten hasta que gane el No** Pueblo −8 · Ejército +5 · Élite +3 · Bandera: `recuento`

### 14. El aliado se hunde

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10.

**Carta:** «Nuestro país se disuelve. Le dejo el último barril de petróleo y mi abrigo de piel.»

- **A. Lo llamaré... «período especial»** Potencias −6 · Pueblo −5 · Élite +3 · Crisis +2
- **B. Ya me buscaré un amigo con dólares** Potencias +5 · Élite −4

### 15. Las memorias

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Una editorial extranjera quiere publicar sus memorias. Piden cien horas de entrevista con usted.»

- **A. El mundo merece conocerme** Potencias +3 · Élite +2
- **B. No tengo tiempo, hay que gobernar** Élite −2

### 16. Los Juegos

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 2 de la era.

**Carta:** «No hay petróleo ni comida, y nos toca construir los estadios de los Juegos del continente.»

- **A. Las medallas alimentarán al Pueblo** Élite +4 · Pueblo −4
- **B. Primero el plato y luego el podio** Pueblo +4 · Élite −4

### 17. La visita del Papa

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 3 de la era.

**Carta:** «El Papa vendría si le dejamos la plaza para una misa. Nos vendría bien un amigo de su tamaño.»

- **A. Dios también cabe en la Revolución** Pueblo +4 · Élite −3
- **B. La plaza es solo para mí** Élite +3 · Pueblo −4

### 18. La central del hijo

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Su hijo mayor dirige la central nuclear del aliado, pero el aliado se ha hundido y no hay uranio.»

- **A. Destitúyanlo: el fracaso es suyo** Élite −3 · Crisis −1
- **B. Quiten de donde sea para su central** Élite +3 · Pueblo −4

### 19. Los setenta y cinco

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «El mundo está pendiente de una guerra lejana. Es un buen momento para detener opositores.»

- **A. Aprovechemos que el mundo no mira** Ejército +5 · Pueblo −4
- **B. No, los mártires salen caros** Pueblo +4 · Ejército −5

### 20. El amigo del sur

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Un coronel del sur que lo admira quiere ser presidente. Ofrece petróleo si le ayudamos.»

- **A. Le prestaré asesores y algunos tips** Potencias +5 · Ejército +2
- **B. Que gane solo, como gané yo** Potencias −5 · Ejército −2

### 21. La revolución energética

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10; a partir del año 5 de la era.

**Carta:** «Tenemos bombillas que ahorran luz y ollas que ahorran arroz. Podemos regalarlas o venderlas.»

- **A. Regálenlas y enseñaré a hacer arroz** Pueblo +4 · Ejército −4
- **B. Que las venda el Ejército en dólares** Ejército +4 · Pueblo −4

### 22. El niño de la balsa

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10; a partir del año 4 de la era.

**Carta:** «Un niño llegó en balsa a la otra orilla sin su madre. Su padre lo reclama: podría ser una causa.»

- **A. Este niño vale por diez discursos** Élite +4 · Pueblo −3 · Encola: `la_tribuna` en 1 a 2 años
- **B. Un niño no es una bandera** Pueblo +3 · Élite −4 · Encola: `el_regreso` en 2 a 3 años

### 23. Las vacas del Estado

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Cada semana desaparecen vacas del Estado. Los campesinos dicen que se tiran solas a la vía del tren.»

- **A. Más años por vaca que por persona** Ejército +4 · Pueblo −4
- **B. Si la vaca estaba triste, al caldero** Pueblo +4 · Ejército −4

### 24. El hijo

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Su hijo menor quiere dirigir el puerto. Dice que entiende de barcos porque tiene tres yates.»

- **A. Dénselo, lleva el mar en la sangre** Élite +5 · Pueblo −4
- **B. Que lo dirija alguien con méritos** Élite −3 · Crisis −1

### 25. La cuenta en el extranjero

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Una revista extranjera dice que es usted de los más ricos del mundo.»

- **A. Dimito si encuentran un dólar** Pueblo +3 · Crisis +1
- **B. Calumnias pagadas por el imperio** Potencias −4 · Élite +2

### 26. La memoria

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10; exige `mota_juzgado`.

**Carta:** «Los nietos de los compañeros de la sierra que encarceló quieren que los libros hablen de ellos.»

- **A. Fueron héroes, aunque se desviaran** Pueblo +4 · Ejército −4
- **B. Eran contrarrevolucionarios y punto** Élite +3 · Pueblo −4

### 27. La revuelta

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «El paseo marítimo está lleno de gente que grita contra usted y de balsas hechas con neumáticos.»

- **A. Bajaré con las tropas especiales** Ejército +6 · Pueblo −6
- **B. Abran la costa al que quiera irse** Pueblo −5 · Potencias +4 · Crisis −3

### 28. El concierto

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Una banda de rock extranjera pide tocar en el estadio. Hace treinta años sus discos eran delito.»

- **A. Que toquen, que yo también tuve pelo** Pueblo +5 · Élite −3
- **B. Que toque la orquesta del Ministerio** Élite +3 · Pueblo −5

### 29. Las estatuas caen

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «En la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.»

- **A. Corten la señal, que es mal ejemplo** Élite +3 · Pueblo −5 · Crisis +1
- **B. Que vigilen mis estatuas día y noche** Ejército +4 · Pueblo −2

### 30. La sequía

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10.

**Carta:** «La sequía arruinó la cosecha. El campo pasa hambre y los almacenes del Ejército están llenos.»

- **A. Que los soldados repartan el arroz** Pueblo +6 · Ejército −6
- **B. Ese grano es para defender la patria** Ejército +6 · Pueblo −5

### 31. Los turistas

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Hacen falta divisas. Podemos llenar las playas de turistas o dejar que los gusanos manden dólares.»

- **A. Que los turistas gocen el socialismo** Potencias +5 · Élite +3 · Pueblo −4
- **B. Que los gusanos paguen la Revolución** Pueblo +4 · Potencias +3 · Élite −4

### 32. Los cinco

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `atentado_investigado`.

**Carta:** «Hemos detenido a cinco agentes suyos infiltrados en nuestro país. Los juzgaremos como espías.»

- **A. Volverán: eso se lo aseguro** Élite +4 · Potencias −4
- **B. Hablemos de un canje discreto** Potencias +4 · Élite −2

### 33. El general héroe

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El general más condecorado está preso por contrabando. Cuando declare, dirá quién lo autorizó.»

- **A. Que asuma toda la culpa en directo** Ejército −6 · Élite +3 · Pueblo −2
- **B. Finca con vistas y boquita cerrada** Ejército +5 · Élite −2 · Crisis +1

### 34. El parte médico

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 5 a 8 de su era.

**Carta:** «Los médicos ordenan reposo absoluto. Alguien tiene que firmar los decretos mientras se recupera.»

- **A. Firmaré los decretos desde la cama** Élite −5 · Crisis +2
- **B. Que firme el Consejo de Ministros** Élite +5
