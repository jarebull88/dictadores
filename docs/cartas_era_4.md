# Cartas · Era 4: La Supervivencia

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 30 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.

### 1. El acreedor pide favores

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `deuda_externa`.

**Carta:** «El acreedor perdonará los intereses si en los foros internacionales votamos siempre con él.»

- **A. Mi delegado levantará las dos manos** Potencias +7 · Élite −2 · Crisis −2
- **B. Pagaremos apretando el cinturón** Potencias −7 · Pueblo −5 · Élite +3 · Crisis +1

### 2. El mausoleo

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «El Partido ya diseña su tumba: un cacho de roca gigante que dicen que se parece a usted.»

- **A. Seré una piedra eterna** Élite +4 · Pueblo −4 · Crisis +2 · Bandera: `mausoleo_construido`
- **B. Entiérrenme como viví: con humildad** Élite −3 · Crisis −1

**Consecuencia futura de `mausoleo_construido`:** La roca eterna espera a su inquilino.

### 3. El reportaje

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `prensa_libre`.

**Carta:** «Un periódico al que dejamos publicar ha destapado las cuentas del gobierno.»

- **A. Ciérrenlo por... falta de papel** Élite +3 · Pueblo −5
- **B. Busquen un viceministro culpable** Pueblo +3 · Élite −5 · Crisis +1

### 4. Cienfuegos vuelve

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `general_apartado`.

**Carta:** «El general Cienfuegos vuelve de su embajada. En el aeropuerto lo recibe una multitud con pancartas.»

- **A. Jubílenlo con honores y escolta** Ejército −4 · Élite +3
- **B. Denle un cuartel y un espía al lado** Ejército +6 · Élite −4

### 5. El delfín impaciente

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `sucesor_designado`.

**Carta:** «Su hermano ya recibe embajadores en su despacho y reparte sus propios retratos por las escuelas.»

- **A. En los retratos solo salgo yo** Ejército −5 · Crisis +1
- **B. Que gobierne él y yo le corrijo** Ejército +5 · Élite −3

### 6. Los inocentes

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `oposicion_culpada`.

**Carta:** «Tenemos pruebas de que la oposición de dentro no tuvo nada que ver con lo del avión. Pedimos que se libere a los presos.»

- **A. Si los quieres, te los llevas** Potencias +5 · Ejército −4
- **B. Pruebas fabricadas por su espionaje** Potencias −5 · Ejército +4 · Pueblo −3

### 7. Las bombas de los hoteles

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Han estallado bombas en tres hoteles. El detenido confiesa que le pagaban desde el extranjero por cada bomba.»

- **A. Que los turistas no se enteren** Ejército +3 · Potencias +3 · Pueblo −2
- **B. Juicio para que lo vea el mundo** Potencias −5 · Élite +3 · Crisis +1

### 8. El mausoleo vacío

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 0; exige `mausoleo_construido`.

**Carta:** «Su roca eterna pide mantenimiento: la gente se sube a hacerse fotos y las palomas la usan a diario.»

- **A. Guardia de honor día y noche** Ejército +3 · Pueblo −3 · Crisis +1
- **B. Cobren la entrada en dólares** Potencias +3 · Élite −2

### 9. El palacio sin terminar

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `palacio_del_pueblo`.

**Carta:** «Su palacio sigue sin terminar y ya ha costado más que todos los hospitales del país.»

- **A. La Revolución merece su palacio** Élite +5 · Pueblo −5 · Crisis +3
- **B. Conviértanlo en un hospital** Pueblo +5 · Élite −4

### 10. Los militares empresarios

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14.

**Carta:** «Los generales ya saben de tanques. Ahora quieren aprender de hoteles, tiendas y divisas.»

- **A. Que cada general tenga su hotel** Ejército +6 · Élite −4
- **B. Los negocios son cosa de ministros** Élite +4 · Ejército −3

### 11. El batallón

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `estado_policial`.

**Carta:** «El batallón especial ya ha llenado las cárceles. Pedimos más celdas y más sueldo para seguir así.»

- **A. Más celdas y más sueldo** Ejército +6 · Pueblo −4
- **B. Que el Partido mande a sus brigadas** Élite +5 · Ejército −4 · Pueblo −2

### 12. La salud

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «Corren rumores de que usted está muy enfermo. Algunos ya se pelean por su despacho.»

- **A. Apunten quién se pelea por mi silla** Ejército +4 · Élite −5
- **B. Daré un discurso de siete horas** Élite +3 · Crisis −1

### 13. El doble

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Su doble ya hace los actos mejor que usted y obedece a este ministerio. El Pueblo lo prefiere.»

- **A. Que el doble desaparezca** Ejército −5 · Crisis +1
- **B. Que haga él los actos y yo descanso** Ejército +5 · Élite −3

### 14. Las medallas

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Los generales quieren lo que usted tiene: medallas en el pecho y una pensión para toda la vida.»

- **A. Medalla y pensión para cada general** Ejército +5 · Crisis +1
- **B. Mi chándal es el único condecorado** Élite +3 · Ejército −3

### 15. El plebiscito

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «La oposición quiere votar si hay elecciones libres. Y la Constitución se lo permite, por desgracia.»

- **A. Adelante, que el Pueblo decida** Pueblo +6 · Élite −4 · Encola: `el_escrutinio` en 1 a 2 años
- **B. Pues que el 99 % firme lo contrario** Élite +5 · Pueblo −5

### 16. El escrutinio

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Ha ganado el «Sí» a las elecciones libres, pero el resultado aún no es oficial.»

- **A. Elecciones con un solo candidato** Pueblo +3 · Élite +2 · Crisis +2 · Bandera: `derrota_aceptada`
- **B. Cuenten hasta que gane el No** Pueblo −8 · Ejército +5 · Élite +3 · Bandera: `recuento`

### 17. El aliado se hunde

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10.

**Carta:** «Nuestro país se disuelve. Le dejo el último barril de petróleo y mi abrigo de piel.»

- **A. Lo llamaré... «período especial»** Potencias −6 · Pueblo −5 · Élite +3 · Crisis +2
- **B. Ya me buscaré un amigo con dólares** Potencias +5 · Élite −4

### 18. La salida honrosa

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 10.

**Carta:** «Si convoca elecciones, nuestro país le garantiza inmunidad y una casa con piscina en nuestra costa.»

- **A. Guárdenme la casa por si acaso** Potencias +6 · Élite −3
- **B. Váyase, que me espera la plaza llena** Potencias −6 · Élite +3

### 19. Las memorias

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Una editorial extranjera quiere publicar sus memorias. Piden cien horas de entrevista con usted.»

- **A. El mundo merece conocerme** Potencias +3 · Élite +2
- **B. No tengo tiempo, hay que gobernar** Élite −2

### 20. El hijo

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Su hijo quiere dirigir el puerto. Dice que entiende de barcos porque tiene tres yates.»

- **A. Dénselo, lleva el mar en la sangre** Élite +5 · Pueblo −4
- **B. Que lo dirija alguien con méritos** Élite −3 · Crisis −1

### 21. La cuenta en el extranjero

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Una revista extranjera dice que es usted de los más ricos del mundo.»

- **A. Dimito si encuentran un dólar** Pueblo +3 · Crisis +1
- **B. Calumnias pagadas por el imperio** Potencias −4 · Élite +2

### 22. La memoria

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10; exige `mota_juzgado`.

**Carta:** «Los nietos de los compañeros de la sierra que encarceló quieren que los libros hablen de ellos.»

- **A. Fueron héroes, aunque se desviaran** Pueblo +4 · Ejército −4
- **B. Eran contrarrevolucionarios y punto** Élite +3 · Pueblo −4

### 23. La revuelta

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «El paseo marítimo está lleno de gente que grita contra usted y de balsas hechas con neumáticos.»

- **A. Bajaré con las tropas especiales** Ejército +6 · Pueblo −6
- **B. Abran la costa al que quiera irse** Pueblo −5 · Potencias +4 · Crisis −3

### 24. El concierto

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Una banda de rock extranjera pide tocar en el estadio. La juventud ya se sabe todas las canciones.»

- **A. Que toquen, que yo también fui joven** Pueblo +5 · Élite −3
- **B. Que toque la orquesta del Ministerio** Élite +3 · Pueblo −5

### 25. Las estatuas caen

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «En la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.»

- **A. Corten la señal, que es mal ejemplo** Élite +3 · Pueblo −5 · Crisis +1
- **B. Que vigilen mis estatuas día y noche** Ejército +4 · Pueblo −2

### 26. La sequía

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10.

**Carta:** «La sequía arruinó la cosecha. El campo pasa hambre y los almacenes del Ejército están llenos.»

- **A. Que los soldados repartan el arroz** Pueblo +6 · Ejército −6
- **B. Ese grano es para defender la patria** Ejército +6 · Pueblo −5

### 27. Los turistas

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Hacen falta divisas. Podemos llenar las playas de turistas o dejar que los exiliados manden dólares.»

- **A. Que los turistas gocen la Revolución** Potencias +5 · Élite +3 · Pueblo −4
- **B. Que el exilio mantenga la Revolución** Pueblo +4 · Potencias +3 · Élite −4

### 28. Los cinco

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `atentado_investigado`.

**Carta:** «Hemos detenido a cinco agentes suyos infiltrados en nuestro país. Los juzgaremos como espías.»

- **A. Volverán: eso se lo aseguro** Élite +4 · Potencias −4
- **B. Hablemos de un canje discreto** Potencias +4 · Élite −2

### 29. El general héroe

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El general más condecorado está preso por contrabando. Cuando declare, dirá quién lo autorizó.»

- **A. Que asuma toda la culpa en directo** Ejército −6 · Élite +3 · Pueblo −2
- **B. Finca con vistas y boquita cerrada** Ejército +5 · Élite −2 · Crisis +1

### 30. El parte médico

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 5 a 8 de su era.

**Carta:** «Los médicos ordenan reposo absoluto. Alguien tiene que firmar los decretos mientras se recupera.»

- **A. Firmaré los decretos desde la cama** Élite −5 · Crisis +2
- **B. Que firme el Consejo de Ministros** Élite +5
