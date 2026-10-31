# Cartas · Era 1: La Revolución

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Duración: entre 10 y 12 cartas. 51 cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por Pueblo ×2.2, Ejército ×3.5, Élite ×2.7, Potencias ×2.5 y, en esta era, por 1.3.

### 1. La casa vacía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Los ministros del tirano esperan juicio y el Pueblo quiere verlo en directo, como un partido.»

- **A. Pongan un narrador deportivo** Pueblo +8 · Ejército −5 · Bandera: `juicios_publicos`
- **B. Esto no es un circo** Pueblo −8 · Ejército +5

**Consecuencia futura de `juicios_publicos`:** Las potencias endurecen su postura ante el régimen.

### 2. La casa del tirano

**Personaje:** Ministra de Cultura  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «La mansión del tirano tiene piscina, cine y 20 habitaciones. Habrá que darle algún uso.»

- **A. Museo del Pueblo** Pueblo +8 · Élite −6
- **B. Me mudo yo** Pueblo −8 · Élite +6

### 3. Los casinos

**Personaje:** Ministro de Trabajo  
**Condición:** ancla de los años 1 a 1 de su era.

**Carta:** «Los crupieres protestan por el cierre de los casinos. Propongo reabrirlos con moral revolucionaria.»

- **A. Que gire la ruleta** Pueblo +5 · Potencias +4 · Élite −4
- **B. Ni un vicio capitalista** Pueblo −5 · Potencias −4 · Élite +4

### 4. El comandante que dimite

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** ancla de los años 1 a 3 de su era.

**Carta:** «Un comandante de provincias ha dimitido: dice que la Revolución se está volviendo comunista.»

- **A. Que Milfuegos lo detenga** Élite +5 · Ejército −4 · Encola: `viaje_milfuegos` en 1 años
- **B. Que dimita tranquilo** Ejército +4 · Élite −5

### 5. El viaje de Milfuegos

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Milfuegos quiere salir hoy mismo. Tengo un avión listo, revisado por mis hombres esta mañana.»

- **A. Que vaya volando** Ejército +3 · Pueblo −3 · Bandera: `mota_juzgado` · Encola: `avion_diezfuegos` en 3 a 4 años
- **B. Por tierra, sin prisa** Pueblo +3 · Ejército −3 · Encola: `fuga_comandante` en 1 a 2 años

**Consecuencia futura de `mota_juzgado`:** Los nietos de Mota piden que los libros hablen de él.

### 6. La fuga del comandante

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Milfuegos llegó dos días tarde. El comandante dimitido se fue en una lancha y ya habla por la radio del exilio.»

- **A. Que hable, nadie le oye** Pueblo +3 · Ejército −3 · Bandera: `exiliados_vocales`
- **B. Interfieran su emisora** Ejército +3 · Pueblo −3 · Bandera: `exiliados_vocales`

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

### 7. Las refinerías

**Personaje:** Ministro de Comercio  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Las petroleras extranjeras no quieren refinar el crudo de nuestro aliado. Propongo intervenirlas.»

- **A. ¡Exprópiese!** Pueblo +8 · Élite −5 · Potencias −6 · Crisis +1 · Bandera: `nacionalizo_empresas` · Encola: `embargo` en 2 a 4 años
- **B. Les pagaremos con bonos de azúcar** Pueblo −6 · Élite +6 · Bandera: `compensaciones` · Encola: `embargo` en 2 a 4 años

**Consecuencia futura de `nacionalizo_empresas`:** Sanciones de la potencia del norte.

**Consecuencia futura de `compensaciones`:** Una deuda que alimenta una carta de crisis.

### 8. El visitante del bloque oriental

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 3 a 7 de su era; a partir del año 3 de la era.

**Carta:** «Le cambiaremos petróleo por azúcar y le mandaremos asesores militares. Así su Revolución no cometerá errores.»

- **A. Toda ayuda es poca** Potencias +9 · Ejército +5 · Crisis +2 · Bandera: `alineado_bloque_oriental` · Encola: `refinerias` en 1 años
- **B. Con el petróleo basta** Potencias −9 · Ejército −5 · Crisis +1 · Encola: `refinerias` en 1 años

**Consecuencia futura de `alineado_bloque_oriental`:** El aliado exige concesiones y armamento.

### 9. Los alfabetizadores en el monte

**Personaje:** Ministra de Educación  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Un maestro de 18 años ha caído en la sierra. ¿Ponemos a salvo a los demás o lo hacemos mártir?»

- **A. Será nuestro mártir** Élite +5 · Pueblo −5
- **B. Primero sus vidas** Pueblo +5 · Élite −5

### 10. El avión de Milfuegos

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «El querido Comandante Milfuegos no ha vuelto. Su avión se esfumó sobre el mar. ¿Fue un accidente?»

- **A. Quiero toda la verdad** Ejército +5 · Élite −3 · Bandera: `accidente_cienfuegos`
- **B. Sí, un accidente** Élite +3 · Ejército −5 · Bandera: `accidente_cienfuegos`

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Milfuegos.

**Consecuencia futura de `accidente_cienfuegos`:** El Pueblo no olvida el accidente de Milfuegos.

### 11. El azúcar

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Hemos decidido no comprarle más azúcar hasta que devuelvan lo expropiado.»

- **A. Pues ahora me quedo con todo** Élite +6 · Potencias −6 · Crisis +1 · Bandera: `embargo_en_marcha`
- **B. Ya tengo otro cliente** Potencias +6 · Élite −6

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 12. La lista

**Personaje:** Ministro del Interior  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Los escritores se tomaron en serio lo de la libertad. Tengo la lista de criticones. ¿Los detenemos?»

- **A. Que critiquen bajito** Pueblo +8 · Ejército −5
- **B. Memorias desde la celda** Pueblo −8 · Ejército +5 · Bandera: `criticos_detenidos`

**Consecuencia futura de `criticos_detenidos`:** Presos políticos que pesan en tus relaciones exteriores.

### 13. La tierra

**Personaje:** Ministro de Trabajo  
**Condición:** sorteo con peso 20.

**Carta:** «Las fincas de los ricos ya son de la Revolución. ¿Las repartimos entre los campesinos o las gestionará el Estado?»

- **A. A los campesinos** Pueblo +8 · Élite −6 · Crisis +1 · Bandera: `reforma_agraria`
- **B. El Estado cultiva mejor** Pueblo −8 · Élite +6 · Bandera: `reforma_agraria`

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

**Consecuencia futura de `reforma_agraria`:** Escasez de alimentos dos años después.

### 14. Los periódicos

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 5.

**Carta:** «La prensa critica cada decreto. Los tipógrafos quieren aclarar al pie que es propaganda enemiga.»

- **A. Aclaren todo** Élite +6 · Pueblo −6 · Bandera: `censura_previa`
- **B. Prensa libre por ahora** Pueblo +6 · Élite −6 · Bandera: `prensa_libre`

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

### 15. Las urnas prometidas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 20; a partir del año 2 de la era.

**Carta:** «Se acerca la fecha de las elecciones que prometimos. ¿Qué le decimos al Pueblo?»

- **A. ¿Elecciones para qué?** Pueblo +6 · Élite −6 · Bandera: `elecciones_aplazadas`, `estudiantes_reprimidos`
- **B. Aplazadas por decreto** Pueblo −6 · Élite +6 · Bandera: `elecciones_aplazadas`, `elecciones_prometidas`

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

**Consecuencia futura de `estudiantes_reprimidos`:** La universidad se convierte en foco de oposición.

**Consecuencia futura de `elecciones_aplazadas`:** Protestas estudiantiles.

**Consecuencia futura de `elecciones_prometidas`:** Elecciones controladas.

### 16. La campaña de alfabetización

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 20.

**Carta:** «Los estudiantes irán al campo a enseñar a leer y escribir. ¿Cuál será la primera lección?»

- **A. La R de Revolución** Élite +6 · Pueblo −6 · Encola: `alfabetizadores_monte` en 1 años
- **B. El abecedario** Pueblo +6 · Élite −6 · Encola: `alfabetizadores_monte` en 1 años

### 17. La declaración socialista

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** ancla de los años 6 a 10 de su era.

**Carta:** «Nos han bombardeado y el Pueblo llora en la plaza. Es el momento de decir qué es la Revolución.»

- **A. Para los humildes** Pueblo +6 · Potencias −5 · Élite −3 · Encola: `la_bahia` en 1 años
- **B. Socialista importada** Pueblo −6 · Potencias +5 · Élite +3 · Encola: `la_bahia` en 1 años

### 18. Se acabó el profesional

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 5.

**Carta:** «Nuestros mejores deportistas juegan en las ligas extranjeras. ¿Abolimos el deporte profesional?»

- **A. Se juega por amor** Élite +4 · Potencias −4
- **B. Que cobren en divisas** Potencias +4 · Élite −4

### 19. Los colegios de los curas

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 20.

**Carta:** «Los curas no perdonan que les quitáramos los colegios: cada domingo predican contra la Revolución.»

- **A. Que recen en un barco** Élite +6 · Pueblo −6
- **B. Dios, pero sin tiza** Pueblo +6 · Élite −6

### 20. El club de golf

**Personaje:** Embajador de la potencia del norte  
**Condición:** sorteo con peso 3.

**Carta:** «Nuestro país romperá relaciones si sigue expropiando. Empezando por el club de golf.»

- **A. Su «hoyo» ahora es mío** Potencias −9 · Pueblo +8 · Élite +4
- **B. No tocaremos nada más** Potencias +9 · Pueblo −8 · Élite −4

### 21. La bahía

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Derrotamos a los invasores de la bahía en tres días. ¿Qué hacemos con los mil doscientos presos?»

- **A. Cámbienlos por compotas** Pueblo +5 · Potencias +4 · Ejército −6
- **B. Un último cigarro y chao** Potencias −4 · Ejército +6 · Crisis +2

### 22. Los niños que se van

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 3; a partir del año 3 de la era.

**Carta:** «Corre el rumor de que el Estado se quedará con los niños. Los padres los suben solos a los aviones.»

- **A. Sus padres sabrán** Pueblo +5 · Ejército −4 · Potencias +3
- **B. Los niños son del Estado** Pueblo −5 · Ejército +4 · Potencias −3

### 23. La reforma urbana

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 20.

**Carta:** «Los alquileres se comen medio sueldo. Propongo expropiar las casas y que el Estado las alquile.»

- **A. Que cada inquilino sea dueño** Pueblo +8 · Élite −5
- **B. Ahora el casero soy yo** Pueblo −8 · Élite +5

### 24. Las milicias

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 3.

**Carta:** «Crearemos milicias de obreros y estudiantes por si vuelve el tirano. Falta decidir quién las manda.»

- **A. Que cada barrio mande** Pueblo +6 · Ejército −6
- **B. Bajo mando militar** Pueblo −6 · Ejército +6

### 25. Las mil flores

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 3.

**Carta:** «Los escritores quieren saber qué pueden publicar. Propongo que usted les marque el límite.»

- **A. Dentro todo, fuera nada** Pueblo −8 · Élite +5 · Bandera: `censura_previa`
- **B. El arte es libre** Pueblo +8 · Élite −5 · Bandera: `critica_abierta` · Encola: `depuracion_criticos` en 1 años

**Consecuencia futura de `censura_previa`:** Aparecen el periodista oficial y los rumores.

**Consecuencia futura de `critica_abierta`:** Depuración de críticos.

### 26. Los oficiales de antes

**Personaje:** Ministro de las Fuerzas Armadas  
**Condición:** sorteo con peso 5.

**Carta:** «Los oficiales del tirano que se rindieron piden un puesto en el nuevo Ejército.»

- **A. Uniforme nuevo y listo** Ejército −5 · Potencias +4
- **B. Todos a la calle** Ejército +5 · Potencias −4 · Crisis +1 · Bandera: `viejos_oficiales`, `purga_inicial`

**Consecuencia futura de `viejos_oficiales`:** Conspiración de oficiales retirados.

**Consecuencia futura de `purga_inicial`:** El Ministro del Interior pide más poder.

### 27. Los ojos del barrio

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 30; a partir del año 3 de la era.

**Carta:** «Cada cuadra tendrá su comité de vecinos vigilantes. Falta decidir a quién le cuentan lo que ven.»

- **A. Los chismes al Partido** Élite +6 · Ejército −6 · Pueblo −3
- **B. Los chismes a la Policía** Ejército +6 · Élite −6 · Pueblo −3 · Bandera: `comites_vigilancia`

**Consecuencia futura de `comites_vigilancia`:** Denuncias falsas entre vecinos.

### 28. El retrato

**Personaje:** Ministra de Cultura  
**Condición:** sorteo con peso 3; a partir del año 4 de la era.

**Carta:** «Propongo su retrato en cada aula. El fotógrafo pregunta cuál es su perfil bueno.»

- **A. El izquierdo, claro** Pueblo −3 · Élite +6 · Crisis +1 · Bandera: `culto_iniciado`
- **B. Mejor el de los mártires** Pueblo +3 · Élite −6 · Bandera: `modestia_aparente`

**Consecuencia futura de `modestia_aparente`:** El Partido exige otros símbolos de lealtad.

### 29. Los que se marchan

**Personaje:** Ministro del Interior  
**Condición:** sorteo con peso 7; exige alguna de `reforma_agraria`, `nacionalizo_empresas`.

**Carta:** «Los ricos se marchan con las joyas cosidas al forro. Propongo registrarlos en el aeropuerto.»

- **A. Que viajen ligeros** Élite +6 · Ejército −4 · Crisis −1 · Bandera: `exodo_elite`, `exiliados_vocales`
- **B. Nadie sale sin permiso** Ejército +6 · Élite −4 · Pueblo −5 · Bandera: `frontera_cerrada`

**Consecuencia futura de `exodo_elite`:** Faltan técnicos y gestores.

**Consecuencia futura de `exiliados_vocales`:** Una oposición habla desde el extranjero.

**Consecuencia futura de `frontera_cerrada`:** Intentos de fuga.

### 30. El partido

**Personaje:** Ministra de Educación  
**Condición:** sorteo con peso 12.

**Carta:** «Estamos organizando un partido de béisbol entre ministros y comandantes. Propongo que lance usted.»

- **A. A ver quién me batea** Pueblo +4 · Ejército −3
- **B. Yo seré el árbitro** Ejército +3 · Pueblo −4

### 31. El economista

**Personaje:** Ministro de Economía  
**Condición:** sorteo con peso 12.

**Carta:** «Pedimos un economista para el Banco Nacional y el Comandante Cabaña se ofreció porque oyó «comunista».»

- **A. Me sirve igual** Ejército +4 · Élite −4
- **B. Mejor uno que sepa sumar** Élite +4 · Ejército −4

### 32. Las barbas

**Personaje:** Vicepresidente del Consejo de Ministros  
**Condición:** sorteo con peso 12.

**Carta:** «El barbero de palacio quiere saber si los comandantes se afeitarán ahora que gobiernan.»

- **A. Las barbas no se tocan** Ejército +4 · Élite −3
- **B. Que se afeiten los demás** Élite +3 · Ejército −4

### 33. El refresco

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 12.

**Carta:** «Nacionalizamos la fábrica del famoso refresco de cola, pero se llevaron la receta secreta.»

- **A. Improvisen una receta** Élite +4 · Pueblo −3
- **B. Que beban guarapo** Pueblo +3 · Élite −4

### 34. Las tiendas vacías *(borrador)*

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «En las tiendas del Estado no hay nada. En el mercado negro de todo a precio de oro.»

- **A. Confisquen y repartan** Pueblo −8 · Ejército +4 · Élite +4 · Crisis −3
- **B. Yo también compro ahí** Pueblo +3 · Élite +5 · Crisis −3 · Bandera: `mercado_paralelo`

**Consecuencia futura de `mercado_paralelo`:** Una economía que escapa a tu control.

### 35. Las colas

**Personaje:** Ministro de Comercio  
**Condición:** carta de crisis: la dispara la crisis oculta (repetible).

**Carta:** «Hay colas para el pan, el jabón y hasta para hacer cola. Nadie encuentra una explicación.»

- **A. Primero los militantes** Élite +5 · Pueblo −4 · Crisis −3
- **B. Yo sé a quién llamar** Pueblo +4 · Élite −5 · Crisis −3 · Encola: `undefined` en 1 años

### 36. Padrino Pupo (mal ojo)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Mijo, le han echado algo malo. Eso se le ve en la cara.»

- **A. Límpieme, padrino** Pueblo +3 · Élite −3 · Encola: `pupo_mal_ojo_remedio` en 1 años
- **B. Yo no creo en santos** Pueblo −3 · Élite +3

### 37. Padrino Pupo (el remedio)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Para limpiarle el camino, el santo pide huevos, siete cocos, un chivo y la nevera de un ministro.»

- **A. Que sean dos neveras** Pueblo +3 · Élite −3
- **B. Rebaje algo, padrino** Pueblo −3 · Élite +3

### 38. Padrino Pupo (enemigos)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Mijo, quieren verlo caer, y no son pocos.»

- **A. Ciérreles el paso** Pueblo +3 · Élite −3 · Encola: `pupo_enemigos_remedio` en 1 años
- **B. Ya tengo escolta** Pueblo −3 · Élite +3

### 39. Padrino Pupo (el remedio)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Para cerrarles el camino, el santo necesita tabaco, dos gallos y la casa de un burgués exiliado.»

- **A. Casa con piscina** Pueblo +3 · Élite −3
- **B. Con un piso le basta** Pueblo −3 · Élite +3

### 40. Padrino Pupo (envidia)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Mijo, esa envidia que le tienen viene cargada.»

- **A. Protéjame, padrino** Pueblo +3 · Élite −3 · Encola: `pupo_envidia_remedio` en 1 años
- **B. La envidia me alimenta** Pueblo −3 · Élite +3

### 41. Padrino Pupo (el remedio)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Para protegerlo, hay que darle al santo langosta, ron, tres palomas y un reloj como el suyo.»

- **A. Le doy el de repuesto** Pueblo +3 · Élite −3
- **B. Que pregunte la hora** Pueblo −3 · Élite +3

### 42. Padrino Pupo (deseos)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Mijo, hay mucha gente deseándole mal. El santo me lo ha dicho.»

- **A. Contente al santo** Pueblo +3 · Élite −3 · Encola: `pupo_deseos_remedio` en 1 años
- **B. Dígale que estoy ocupado** Pueblo −3 · Élite +3

### 43. Padrino Pupo (el remedio)

**Personaje:** Padrino Pupo  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Para tenerlo contento, al santo hay que darle viandas, un puerco, ron y un carro con chófer.»

- **A. Un descapotable** Pueblo +3 · Élite −3
- **B. Que el santo camine** Pueblo −3 · Élite +3

### 44. Papá Ernesto (torneo)

**Personaje:** Papá Ernesto  
**Condición:** ancla de los años 2 a 3 de su era; a partir del año 2 de la era.

**Carta:** «Escribo novelas y pesco agujas. Le invito a mi torneo: daiquirí ilimitado y un trofeo con mi nombre.»

- **A. Conmigo todos pican** Pueblo +5 · Élite −5 · Bandera: `ernesto_amigo`
- **B. No me gusta pescar** Pueblo −5 · Élite +5

### 45. Papá Ernesto (whisky)

**Personaje:** Papá Ernesto  
**Condición:** ancla de los años 5 a 6 de su era; exige `ernesto_amigo`; a partir del año 5 de la era.

**Carta:** «Adoro su Revolución, pero sin whisky importado no escribo ni una línea. ¿Hacemos una excepción?»

- **A. Whisky para el genio** Potencias +5 · Pueblo −5 · Bandera: `ernesto_whisky`
- **B. Beba guarapo** Potencias −5 · Pueblo +5

### 46. Papá Ernesto (higado)

**Personaje:** Papá Ernesto  
**Condición:** ancla de los años 8 a 9 de su era; exige `ernesto_amigo` y `ernesto_whisky`; a partir del año 8 de la era.

**Carta:** «Me voy a curarme el hígado y no creo que vuelva. Le dejo mi casa, mis gatos y mis botellas. Adiós.»

- **A. Tu casa será un museo** Pueblo +5 · Élite −5
- **B. El Partido cuidará tu bar** Pueblo −5 · Élite +5

### 47. La calle y los cuarteles *(borrador)*

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Algunos oficiales se reúnen con los que protestan en la calle. Propongo arrestarlos ya.»

- **A. Un ascenso y se calman** Ejército +8 · Élite −4
- **B. Arréstenlos a todos** Ejército −6 · Pueblo −3 · Crisis +2

### 48. La embajada

**Personaje:** Ministro del Interior  
**Condición:** carta de coalición: la dispara tener dos barras bajas a la vez (repetible).

**Carta:** «Algunos jefes del Partido van mucho a la embajada de nuestro aliado. Dicen que van a cenar.»

- **A. Lo que pida el aliado** Potencias +8 · Élite −4
- **B. Casa y coche para todos** Élite +8 · Potencias −4

### 49. Los nuevos vecinos

**Personaje:** Embajador del bloque oriental  
**Condición:** ancla de los años 10 a 14 de su era.

**Carta:** «Le enviaremos misiles escondidos en barcos de azúcar. Nadie debe saberlo.»

- **A. Ni mi hermano** Potencias +6 · Ejército −5 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 años
- **B. Discreto como mi barba** Potencias −6 · Ejército +5 · Crisis +2 · Bandera: `misiles_instalados` · Encola: `ultimatum` en 1 años

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

**Consecuencia futura de `misiles_instalados`:** Una potencia vecina vigila tus misiles.

### 50. El ultimátum

**Personaje:** Embajador de la potencia del norte  
**Condición:** carta de cola: solo sale si una decisión anterior la encola.

**Carta:** «Hemos pactado con su aliado la retirada de los misiles. Enviaremos inspectores para comprobarlo. Creíamos que ya lo sabía.»

- **A. Fue idea mía** Potencias +6 · Ejército −6 · Crisis −1
- **B. Compruébeme esta** Potencias −6 · Ejército +6 · Crisis +2 · Bandera: `embargo_en_marcha`

**Consecuencia futura de `embargo_en_marcha`:** Embargo total.

### 51. Embargo total

**Personaje:** Ministro de Comercio  
**Condición:** sorteo con peso 20; exige alguna de `embargo_en_marcha`, `nacionalizo_empresas`; a partir del año 6 de la era.

**Carta:** «El embargo es total y las tiendas se vacían. Propongo repartir la comida con una libreta.»

- **A. Una libreta por familia** Élite +5 · Potencias −4 · Pueblo −3 · Crisis −1
- **B. Por la puerta de atrás** Potencias +4 · Élite −5 · Pueblo +3 · Crisis +1 · Bandera: `deuda_externa`

**Consecuencia futura de `deuda_externa`:** El acreedor empieza a pedir favores.
