# Cartas · Era 4: Ocaso

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 6 y 8 años. 24 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 0.8.

### 1. El reportaje

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 14; exige `prensa_libre`.

**Carta:** «Padre de la Patria, un periódico al que usted dejó publicar ha destapado las cuentas del palacio. Se vende en todos los quioscos.»

- **A. Cerrar el periódico.** *La libertad de prensa también tiene horario de cierre.* Pueblo −7 · Ejército +4 · Potencias −5
- **B. Despedir a un ministro.** *Alguien tendrá que haber firmado esas cuentas.* Pueblo +7 · Élite −6 · Potencias +4

### 2. Cienfuegos vuelve

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 14; exige `general_apartado`.

**Carta:** «Padre de la Patria, el general Cienfuegos ha vuelto de su embajada. Los descontentos lo reciben en el aeropuerto como a un candidato.»

- **A. Recibirlo en palacio.** *Dos viejos generales; solo uno tiene palacio.* Ejército +7 · Pueblo +4 · Élite −6
- **B. Devolverlo al avión.** *Su embajada le echaba mucho de menos.* Ejército −7 · Pueblo −4 · Élite +6

### 3. El delfín impaciente

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 14; exige `sucesor_designado`.

**Carta:** «Padre de la Patria, su sucesor ya recibe a los embajadores en su despacho y ha encargado retratos suyos para las escuelas.»

- **A. Recordarle quién manda.** *La paciencia también es un mérito revolucionario.* Élite −7 · Ejército +5 · Potencias −3
- **B. Dejarle hacer.** *Que aprenda; algún día tendrá que hacerlo sin mí.* Élite +7 · Ejército −5 · Potencias +3

### 4. Los inocentes

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 14; exige `oposicion_culpada`.

**Carta:** «Padre de la Patria, nuestro país tiene pruebas de que la oposición no puso aquella bomba. Pedimos que se revise el caso.»

- **A. Revisar el caso.** *Que se revise; la sentencia, que no se mueva.* Potencias +7 · Pueblo +4 · Ejército −6
- **B. Asunto cerrado.** *La Historia ya dictó sentencia; yo solo la firmé.* Potencias −7 · Pueblo −4 · Ejército +6

### 5. El mausoleo vacío

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `mausoleo_construido`.

**Carta:** «Padre de la Patria, el mausoleo necesita mantenimiento y usted aún no lo ha estrenado. Los embalsamadores piden un aumento.»

- **A. Pagar el aumento.** *La eternidad no se recorta.* Élite +5 · Pueblo −5 · Crisis +2
- **B. Alquilarlo para actos.** *Mientras tanto, que dé beneficios.* Élite −5 · Pueblo +5 · Crisis −1

### 6. El palacio sin terminar

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 14; exige `palacio_del_pueblo`.

**Carta:** «Padre de la Patria, el palacio sigue sin terminar y ya ha costado más que todos los hospitales del país.»

- **A. Terminarlo como sea.** *Que mis sucesores tengan dónde aburrirse.* Élite +6 · Pueblo −7 · Crisis +3
- **B. Convertirlo en museo.** *Un museo de lo que pudo haber sido.* Élite −6 · Pueblo +7 · Crisis −1

### 7. Dos ejércitos

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 14; exige alguna de `estado_policial`, `jefe_poderoso`.

**Carta:** «Padre de la Patria, la unidad del Interior ya tiene más tanques que el Ejército. Mis oficiales preguntan quién manda.»

- **A. Desarmar al batallón.** *Un ejército basta; dos acaban discutiendo.* Ejército +8 · Élite −4 · Pueblo +3
- **B. Más tanques al Ejército.** *Si sobran tanques, que sobren en los dos lados.* Ejército −8 · Élite +4 · Crisis +2

### 8. La salud

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «Padre de la Patria, corren rumores sobre su salud. Proponemos que se le vea nadando en el río, como hacía de joven.»

- **A. Nadar en el río.** *Que la corriente sepa quién manda.* Pueblo +6 · Élite +3 · Ejército −4
- **B. Mandar a un doble.** *Nadie notará la diferencia; yo tampoco.* Pueblo −6 · Élite −3 · Ejército +4 · Encola: `el_doble` en 2 a 3 años

### 9. El doble

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Padre de la Patria, su doble ha empezado a dar discursos por su cuenta. Dicen que habla mejor que usted.»

- **A. Retirar al doble.** *Solo hay sitio para un Padre de la Patria.* Ejército +6 · Pueblo −5 · Élite −2
- **B. Dejarle los discursos.** *Que hable él; yo descanso y escucho.* Ejército −6 · Pueblo +5 · Élite +2

### 10. Las medallas

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, el Ejército quiere concederle su máxima condecoración. Sería la número ochenta y tres.»

- **A. Aceptarla.** *La modestia también necesita sitio en el pecho.* Ejército +6 · Pueblo −4 · Élite +2
- **B. Rechazarla.** *Ochenta y dos bastan para un hombre humilde.* Ejército −6 · Pueblo +4 · Élite −2

### 11. El plebiscito

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, el Partido propone un plebiscito para que el Pueblo diga si quiere que usted siga ocho años más.»

- **A. Convocar el plebiscito.** *El Pueblo decidirá lo que ya está decidido.* Potencias +6 · Pueblo +4 · Ejército −5 · Encola: `el_escrutinio` en 1 a 2 años
- **B. No hace falta.** *No pregunto lo que ya sé.* Potencias −6 · Pueblo −4 · Ejército +5

### 12. El escrutinio

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Padre de la Patria, el plebiscito ha salido mal: gana el «No». El escrutinio todavía no es oficial.»

- **A. Aceptar el resultado.** *Que no se diga que no sé perder; solo que no me voy.* Pueblo +9 · Potencias +7 · Ejército −9 · Élite −4 · Bandera: `derrota_aceptada`
- **B. Recontar los votos.** *Hasta que salgan bien.* Pueblo −9 · Potencias −7 · Ejército +9 · Élite +4 · Bandera: `recuento`

### 13. El aliado se hunde

**Personaje:** Embajador del bloque oriental  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, nuestro país atraviesa dificultades. El año que viene no podremos enviar petróleo, ni créditos, ni, quizá, embajador.»

- **A. Pedir un último envío.** *Por los viejos tiempos y por los nuevos apagones.* Potencias +5 · Pueblo −5 · Crisis +2
- **B. Buscar nuevos amigos.** *La amistad eterna también caduca.* Potencias −5 · Pueblo +5 · Élite +3 · Crisis +1

### 14. La salida honrosa

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, nuestro país le ofrece una salida honrosa: elecciones libres, inmunidad y una casa en la costa.»

- **A. Negociar la salida.** *Una casa en la costa, con vistas al palacio.* Potencias +8 · Pueblo +5 · Ejército −7 · Élite −4
- **B. Rechazar la oferta.** *De aquí solo salgo en procesión.* Potencias −8 · Pueblo −5 · Ejército +7 · Élite +4

### 15. Las memorias

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, la editorial del Estado prepara sus memorias en doce tomos. Necesitamos saber qué recuerda usted.»

- **A. Doce tomos.** *Y un decimotercero con lo que no recuerdo.* Élite +5 · Pueblo −5 · Crisis +1
- **B. Un solo tomo.** *Lo esencial cabe en una página: yo.* Élite −5 · Pueblo +5

### 16. El hijo

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, su hijo quiere la concesión del puerto. Dice que conoce el negocio porque ha visto llegar los barcos.»

- **A. Darle la concesión.** *La experiencia se hereda, como el apellido.* Élite +6 · Pueblo −6 · Potencias −2
- **B. Negársela.** *Que empiece desde abajo: un ministerio pequeño.* Élite −6 · Pueblo +6 · Potencias +2

### 17. La cuenta en el extranjero

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, un banco extranjero pregunta de dónde salen los fondos de su cuenta personal. Quiere un papel firmado.»

- **A. Firmar cualquier cosa.** *Mi firma vale más que su pregunta.* Potencias +6 · Élite +3 · Pueblo −5
- **B. Traer el dinero a casa.** *Bajo el colchón del Estado no pregunta nadie.* Potencias −6 · Élite −3 · Pueblo +5 · Crisis −1

### 18. La memoria

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, los nietos de los que usted encarceló piden que los libros de texto cuenten lo que pasó.»

- **A. Una página en el libro.** *Breve, en letra pequeña y al final.* Pueblo +6 · Potencias +4 · Ejército −6
- **B. Nada que contar.** *La Historia ya está escrita; yo tengo la pluma.* Pueblo −6 · Potencias −4 · Ejército +6

### 19. La huelga general

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, los sindicatos convocan una huelga general. Por primera vez se han puesto de acuerdo entre ellos.»

- **A. Subir los salarios.** *Que celebren; la inflación los pondrá en su sitio.* Pueblo +8 · Élite −5 · Crisis +2
- **B. Declarar el estado de sitio.** *Si no trabajan, que vigilen el toque de queda.* Pueblo −8 · Ejército +6 · Potencias −4

### 20. El concierto

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, una banda de rock extranjera pide tocar en el estadio. La juventud ya se sabe todas las canciones.»

- **A. Que toquen.** *Si cantan, no gritan.* Pueblo +7 · Potencias +4 · Ejército −5
- **B. Prohibir el concierto.** *La música extranjera también necesita visado.* Pueblo −7 · Potencias −4 · Ejército +5

### 21. Las estatuas caen

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, en la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.»

- **A. Cortar la señal.** *Lo que no se ve, no se derriba.* Pueblo −6 · Ejército +5 · Potencias −3
- **B. Reforzar las estatuas.** *Con hormigón y con guardia.* Pueblo +3 · Ejército −5 · Élite +3 · Crisis +1

### 22. La sequía

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, la sequía ha arruinado la cosecha. Los campesinos piden ayuda y los almacenes del Ejército están llenos.»

- **A. Abrir los almacenes.** *El Ejército comerá menos; por una vez.* Pueblo +8 · Ejército −7
- **B. Mantenerlos cerrados.** *La reserva es para emergencias, no para el hambre.* Pueblo −8 · Ejército +7

### 23. Los turistas

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 10.

**Carta:** «Padre de la Patria, proponemos abrir las playas al turismo extranjero. Traerán divisas, cámaras y malas costumbres.»

- **A. Abrir las playas.** *Las divisas no tienen ideología.* Potencias +6 · Élite +4 · Pueblo −4 · Crisis −2
- **B. Mantenerlas cerradas.** *Las playas, para el Pueblo; el Pueblo, en su casa.* Potencias −6 · Élite −4 · Pueblo +4 · Crisis +1

### 24. El parte médico

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 5 a 8 de su era.

**Carta:** «Padre de la Patria, los médicos recomiendan reposo absoluto. El Partido pregunta quién firmará los decretos mientras tanto.»

- **A. Firmarlos desde la cama.** *Gobierno mejor tumbado: me cuesta menos sonreír.* Ejército +6 · Élite −6 · Pueblo −3
- **B. Delegar en el Consejo.** *Que firmen; luego revisaré quién firmó qué.* Ejército −6 · Élite +6 · Pueblo +3
