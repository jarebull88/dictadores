# Cartas · Era 4: La Supervivencia

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 8 y 10 cartas. 29 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.1.

### 1. El acreedor pide favores

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `deuda_externa`.

**Carta:** «El acreedor aplazará la deuda a cambio de nuestro voto en los foros internacionales durante años.»

- **A. Nuestro voto es suyo, con intereses** Potencias +7 · Élite −2 · Crisis −2
- **B. Pagaremos con la libreta de comida** Potencias −7 · Pueblo −5 · Élite +3 · Crisis +1

### 2. El mausoleo

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 8.

**Carta:** «El Partido pide un monumento eterno: un cacho de roca gigante que dicen que se parece a usted.»

- **A. Seré una piedra eterna** Élite +4 · Pueblo −4 · Crisis +2 · Bandera: `mausoleo_construido`
- **B. Prohíban estatuas con mi cara** Élite −3 · Crisis −1

**Consecuencia futura de `mausoleo_construido`:** Un edificio eterno que hay que mantener.

### 3. El reportaje

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `prensa_libre`.

**Carta:** «Un periódico al que dejamos publicar ha destapado las cuentas del gobierno.»

- **A. Ciérrenlo por falta de papel** Élite +3 · Pueblo −5
- **B. Auditoría pública de las cuentas** Pueblo +3 · Élite −5 · Crisis +1

### 4. Cienfuegos vuelve

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `general_apartado`.

**Carta:** «El general Cienfuegos vuelve de su embajada. En el aeropuerto lo recibe una multitud con pancartas.»

- **A. Jubílenlo con honores y escolta** Ejército −4 · Élite +3
- **B. Que mande la tropa y vigílenlo** Ejército +6 · Élite −4

### 5. El delfín impaciente

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `sucesor_designado`.

**Carta:** «Su hermano ya recibe embajadores en su despacho y reparte sus propios retratos por las escuelas.»

- **A. En los retratos solo salgo yo** Élite −5 · Crisis +1
- **B. Nombren a mi hermano mi segundo** Élite +5 · Ejército −2

### 6. Los inocentes

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `oposicion_culpada`.

**Carta:** «Nuestro país tiene pruebas de que la oposición no puso aquella bomba. Pedimos que se revise el caso.»

- **A. Revisaremos el caso con gusto** Potencias +5 · Pueblo +3 · Ejército −5
- **B. Sus pruebas son un montaje** Potencias −5 · Ejército +4 · Pueblo −3

### 7. El mausoleo vacío

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `mausoleo_construido`.

**Carta:** «Su roca eterna ya pide mantenimiento. Usted no la ha estrenado, pero las palomas la usan a diario.»

- **A. Guardia de honor día y noche** Ejército +3 · Pueblo −3 · Crisis +1
- **B. Cobren la entrada en dólares** Potencias +3 · Élite −2

### 8. El palacio sin terminar

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `palacio_del_pueblo`.

**Carta:** «El palacio sigue sin terminar y ya ha costado más que todos los hospitales del país.»

- **A. Terminen mi palacio** Élite +5 · Pueblo −5 · Crisis +3
- **B. Que sea un hospital con mi nombre** Pueblo +5 · Élite −4

### 9. Los militares empresarios

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14.

**Carta:** «Los militares sabemos administrar. Denos los hoteles y las tiendas en divisas y verá qué orden.»

- **A. Los hoteles, para el Ejército** Ejército +6 · Élite −4
- **B. Los negocios son cosa de ministros** Élite +4 · Ejército −3

### 10. El batallón

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `estado_policial`.

**Carta:** «El batallón especial ya ha llenado las cárceles. Pedimos más celdas y más sueldo para seguir así.»

- **A. Más celdas y más sueldo** Ejército +6 · Pueblo −4
- **B. Que el batallón obedezca al Partido** Ejército −5 · Élite +4

### 11. La salud

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «Corren rumores de que usted está muy enfermo. Algunos ya se pelean por su despacho.»

- **A. Detengan a los del rumor** Ejército +5 · Pueblo −5
- **B. Que salga mi doble a saludar** Ejército +3 · Élite −3 · Encola: `el_doble` en 2 a 3 años

### 12. El doble

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Su doble ya hace los actos mejor que usted y obedece a este ministerio. El Pueblo lo prefiere.»

- **A. Que el doble desaparezca** Ejército −5 · Crisis +1
- **B. Que haga él los actos y yo descanso** Ejército +5 · Élite −3

### 13. Las medallas

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «El Ejército quiere darle su medalla número ochenta y tres. Los generales esperan las suyas, con pensión.»

- **A. Medallas y pensión para todos** Ejército +5 · Crisis +1
- **B. Aquí las medallas solo las llevo yo** Élite +3 · Ejército −3

### 14. El plebiscito

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «La oposición ha reunido firmas para un referéndum. La Constitución, por desgracia, lo permite.»

- **A. Que vote el Pueblo** Pueblo +6 · Élite −4 · Encola: `el_escrutinio` en 1 a 2 años
- **B. Votemos que el socialismo es eterno** Élite +5 · Pueblo −5

### 15. El escrutinio

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «El referéndum ha salido mal: gana el «No». El escrutinio todavía no es oficial.»

- **A. Acepto el resultado y me quedo** Pueblo +6 · Élite −4 · Ejército −2 · Bandera: `derrota_aceptada`
- **B. Recuenten hasta que salga bien** Pueblo −8 · Ejército +5 · Élite +3 · Bandera: `recuento`

### 16. El aliado se hunde

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10.

**Carta:** «Nuestro país se hunde. El año que viene no enviaremos petróleo, ni créditos, ni quizá embajador.»

- **A. Pedalearemos hasta la victoria** Potencias −6 · Pueblo −5 · Élite +3 · Crisis +2
- **B. Ya encontraremos amigos con divisas** Potencias +5 · Élite −4

### 17. La salida honrosa

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 10.

**Carta:** «Nuestro país le ofrece una salida honrosa: elecciones libres, inmunidad y una casa en la costa.»

- **A. Me quedo la casa, sin elecciones** Potencias +6 · Élite −3
- **B. Le responderé con la plaza llena** Potencias −6 · Ejército +5 · Pueblo −3

### 18. Las memorias

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «La editorial del Estado quiere publicar sus memorias. Necesitamos saber qué recuerda usted.»

- **A. Doce tomos, obligatorios en clase** Élite +4 · Pueblo −3
- **B. Que me entreviste un extranjero** Potencias +3 · Élite −3

### 19. El hijo

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Su hijo quiere la concesión del puerto. Dice que conoce el negocio porque ha visto llegar los barcos.»

- **A. Que mi hijo dirija el puerto** Élite +5 · Pueblo −4
- **B. Al extranjero, con mi hijo de asesor** Potencias +4 · Élite −3

### 20. La cuenta en el extranjero

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Un banco extranjero pregunta de dónde salen los fondos de su cuenta personal. Quiere un papel firmado.»

- **A. Firmo lo que haga falta** Potencias +6
- **B. Traigan el dinero a casa** Potencias −5 · Élite +2 · Crisis −1

### 21. La memoria

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10.

**Carta:** «Los nietos de los que usted encarceló piden que los libros de texto cuenten lo que pasó.»

- **A. Una página que escribiré yo** Pueblo +4 · Ejército −4
- **B. Fue un golpe y así se contará** Élite +3 · Pueblo −4

### 22. La revuelta

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Miles de personas han salido al paseo marítimo gritando contra usted.»

- **A. Manden a las tropas especiales** Ejército +6 · Pueblo −6
- **B. Abran la costa al que quiera irse** Pueblo −5 · Potencias +4 · Crisis −3

### 23. El concierto

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Una banda de rock extranjera pide tocar en el estadio. La juventud ya se sabe todas las canciones.»

- **A. Que toquen y yo en primera fila** Pueblo +5 · Élite −3
- **B. Mejor la Orquesta del Ministerio** Élite +3 · Pueblo −5

### 24. Las estatuas caen

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «En la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.»

- **A. Corten la señal extranjera** Élite +3 · Pueblo −5 · Crisis +1
- **B. Quiten mis estatuas antes que ellos** Élite −3 · Crisis −2

### 25. La sequía

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10.

**Carta:** «La sequía ha arruinado la cosecha. Los campesinos piden ayuda y los almacenes del Ejército están llenos.»

- **A. Abran los almacenes del Ejército** Pueblo +6 · Ejército −6
- **B. Que el Ejército venda su grano** Ejército +6 · Pueblo −5

### 26. Los turistas

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Hacen falta divisas. Podemos abrir las playas al turismo o dejar que los exiliados manden dólares.»

- **A. Playas solo para turistas** Potencias +5 · Élite +3 · Pueblo −4
- **B. Que los exiliados manden dólares** Pueblo +4 · Potencias +3 · Élite −4

### 27. La bomba de dentro

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige `atentado_investigado`.

**Carta:** «Tenemos el resultado de la investigación: la bomba salió del Ministerio del Interior.»

- **A. Purguen el Ministerio del Interior** Ejército −6 · Élite +3
- **B. Archiven y que me deban una** Ejército +5 · Élite −3

### 28. El general héroe

**Personaje:** Ministro del Interior  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «El general más condecorado está preso por contrabando. Lo hizo con su permiso, pero eso no lo sabe nadie.»

- **A. Juicio en directo y paredón** Ejército −6 · Élite +3 · Pueblo −2
- **B. Suéltenlo si sabe guardar silencio** Ejército +5 · Élite −2 · Crisis +1

### 29. El parte médico

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 5 a 8 de su era.

**Carta:** «Los médicos recomiendan reposo absoluto. El Partido pregunta quién firmará los decretos mientras tanto.»

- **A. Gobernaré desde la cama** Élite −5 · Crisis +2
- **B. Deleguen, provisionalmente** Élite +5
