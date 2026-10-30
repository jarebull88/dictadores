/* =====================================================================================
   DATOS DEL JUEGO · fuente única de las cartas, las eras, los finales y las consecuencias futuras
   Aquí se editan los textos y los efectos. Los documentos de cartas (docs/) se generan desde este archivo:
   npm run docs. Los efectos se escriben en escala pequeña; el motor los multiplica (ver CLAUDE.md).
   ===================================================================================== */
/* =====================================================
   DATOS
   Efectos, pesos y ventanas son provisionales.
   Las banderas llevan el prefijo del mazo (base.).
   ===================================================== */
const BARRAS = [
  { id: "pueblo",    nombre: "Pueblo" },
  { id: "ejercito",  nombre: "Ejército" },
  { id: "elite",     nombre: "Partido" },
  { id: "potencias", nombre: "Potencias" }
];
const ERAS = [   // 16 oct: las cuatro eras siguen la Revolución (1959–62, 1963–70, 1971–85, 1986–2006)
  { nombre: "La Revolución", min: 10, max: 12, factor: 1.3 },   // 29 oct: ×1.3 (28 oct ×1.15): con los pesos revisados la era se hizo más fácil (77 %); ahora «humano» ~62 %, azar ~3 %
  { nombre: "La Purga", min: 8, max: 10, factor: 1.35 },   // 23 oct: ×1.35 (antes 1.1): con las cartas cubanas nuevas el «humano» la superaba el 68 %; ahora ~59 %
  { nombre: "El Culto", min: 8, max: 10, factor: 1.7 },   // 23 oct: ×1.7 (antes 1.2): con las cartas cubanas nuevas el «humano» la superaba el 75 % y el azar el 37 %; ahora ~58 % y ~9 %
  { nombre: "La Supervivencia", min: 8, max: 10, factor: 1.4 }   // 23 oct: con las cartas nuevas, ×1.0 dejaba al «humano» en 68 %; con ×1.4, ~57 %
];
const ERA = ERAS[0];
const UMBRAL_COALICION = 30;

const CARTAS = [
  /* ---------- Anclas ---------- */
  {
    // 28 oct, plan narrativo (piloto de la era 1): los juicios de 1959; las dos opciones son cómo se juzga
    id: "casa_vacia", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "La casa vacía",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los ministros del tirano esperan juicio y el Pueblo quiere verlo en directo, como un partido.",
    izq: { accion: "Pongan un narrador deportivo", efectos: { pueblo: 8, ejercito: -5 }, banderas: ["base.juicios_publicos"] },
    der: { accion: "Esto no es un circo", efectos: { pueblo: -8, ejercito: 5 } }
  },
  {
    id: "casa_tirano", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "La casa del tirano",
    personaje: "Ministra de Cultura",
    texto: "La mansión del tirano tiene piscina, cine y 20 habitaciones. Habrá que darle algún uso.",
    izq: { accion: "Museo del Pueblo", efectos: { pueblo: 8, elite: -6 } },
    der: { accion: "Me mudo yo", efectos: { pueblo: -8, elite: 6 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): sustituye a «Las arcas vacías»; los casinos se cerraron en enero de 1959 y se reabrieron tras protestar los crupieres
    id: "casinos", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "Los casinos",
    personaje: "Ministro de Trabajo",
    texto: "Los crupieres protestan por el cierre de los casinos. Propongo reabrirlos con moral revolucionaria.",
    izq: { accion: "Que gire la ruleta", efectos: { pueblo: 5, potencias: 4, elite: -4 } },
    der: { accion: "Ni un vicio capitalista", efectos: { pueblo: -5, potencias: -4, elite: 4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): Huber Matos (1959), ya sin nombre: la trama es de Milfuegos
    id: "comandante_dimite", tipo: "ancla", ventana: [1, 3], titulo: "El comandante que dimite",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Un comandante de provincias ha dimitido: dice que la Revolución se está volviendo comunista.",
    izq: { accion: "Que Milfuegos lo detenga", efectos: { elite: 5, ejercito: -4 }, banderas: ["base.mota_juzgado"], encolar: [{ carta: "avion_diezfuegos", min: 1, max: 1 }] },
    der: { accion: "Que dimita tranquilo", efectos: { ejercito: 4, elite: -5 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): segundo paso del aliado (1960): las refinerías se niegan a refinar el crudo del aliado y se intervienen
    id: "refinerias", tipo: "cola", enlace: true, titulo: "Las refinerías",
    personaje: "Ministro de Comercio",
    texto: "Las petroleras extranjeras no quieren refinar el crudo de nuestro aliado. Propongo intervenirlas.",
    izq: { accion: "¡Exprópiese!", efectos: { pueblo: 8, elite: -5, potencias: -6, crisis: 1 }, banderas: ["base.nacionalizo_empresas"], encolar: [{ carta: "embargo", min: 2, max: 4 }] },
    der: { accion: "Les pagaremos con bonos de azúcar", efectos: { pueblo: -6, elite: 6 }, banderas: ["base.compensaciones"], encolar: [{ carta: "embargo", min: 2, max: 4 }] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): la alianza llega siempre (incluye «Los asesores»); se elige cómo
    id: "visitante_oriental", tipo: "ancla", ventana: [3, 7], cond: { turnoMin: 3 }, titulo: "El visitante del bloque oriental",
    personaje: "Embajador del bloque oriental",
    texto: "Le cambiaremos petróleo por azúcar y le mandaremos asesores militares. Así su Revolución no cometerá errores.",
    izq: { accion: "Toda ayuda es poca", efectos: { potencias: 9, ejercito: 5, crisis: 2 }, banderas: ["base.alineado_bloque_oriental"], encolar: [{ carta: "refinerias", min: 1, max: 1 }] },
    der: { accion: "Con el petróleo basta", efectos: { potencias: -9, ejercito: -5, crisis: 1 }, encolar: [{ carta: "refinerias", min: 1, max: 1 }] }
  },

  /* ---------- Cola ---------- */
  {
    // 23 oct, Jorge: la última carta de la partida (la pone finDeEra() al acabar la era 4); decide la última línea de la esquela
    id: "ultimas_palabras", era: 4, tipo: "cola", titulo: "Últimas palabras",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Los médicos dicen que es el final. El país entero espera sus últimas palabras.",
    izq: { accion: "No me iré nunca del todo", efectos: {}, banderas: ["base.ultimas_eterno"] },
    der: { accion: "Es solo un apagón, volveré", efectos: {}, banderas: ["base.ultimas_apagon"] }
  },
  {
    // 23 oct, Jorge: la tribuna antiimperialista (2000), frente a la oficina de intereses del norte
    id: "la_tribuna", era: 4, tipo: "cola", titulo: "La tribuna",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Llevamos meses marchando por el niño. Proponemos una tribuna fija frente a la embajada occidental.",
    izq: { accion: "Una tribuna para gritar siempre", efectos: { elite: 4, pueblo: -4 }, encolar: [{ carta: "el_regreso", min: 1, max: 2 }] },
    der: { accion: "Ya gritaron bastante, a trabajar", efectos: { pueblo: 4, elite: -4 }, encolar: [{ carta: "el_regreso", min: 1, max: 2 }] }
  },
  {
    // 23 oct, Jorge: el regreso del niño con su padre (junio de 2000)
    id: "el_regreso", era: 4, tipo: "cola", titulo: "El regreso",
    personaje: "Embajador de la potencia del norte",
    texto: "El niño volverá con su padre. Nuestro gobierno espera que no lo convierta en un trofeo.",
    izq: { accion: "Algo sencillo: un millón en la plaza", efectos: { elite: 4, pueblo: -3 } },
    der: { accion: "Lo recibirá su padre y nadie más", efectos: { pueblo: 3, elite: -4 } }
  },
  {
    // 23 oct, Jorge: Conrado Benítez (1961); 28 oct: seguir o parar la campaña
    id: "alfabetizadores_monte", tipo: "cola", enlace: true, titulo: "Los alfabetizadores en el monte",
    personaje: "Ministra de Educación",
    texto: "Un maestro de 18 años ha caído en la sierra. ¿Ponemos a salvo a los demás o lo hacemos mártir?",
    izq: { accion: "Será nuestro mártir", efectos: { elite: 5, pueblo: -5 } },
    der: { accion: "Primero sus vidas", efectos: { pueblo: 5, elite: -5 } }
  },
  {
    // 22 oct: Camilo Cienfuegos (oct. 1959); 28 oct: pasa a llamarse Milfuegos y es Comandante
    id: "avion_diezfuegos", tipo: "cola", enlace: true, titulo: "El avión de Milfuegos",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "El querido Comandante Milfuegos no ha vuelto. Su avión se esfumó sobre el mar. ¿Fue un accidente?",
    izq: { accion: "Quiero toda la verdad", efectos: { ejercito: 5, elite: -3 }, banderas: ["base.accidente_cienfuegos"] },
    der: { accion: "Sí, un accidente", efectos: { elite: 3, ejercito: -5 }, banderas: ["base.accidente_cienfuegos"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): el norte deja de comprar el azúcar (1960)
    id: "embargo", tipo: "cola", titulo: "El azúcar",
    personaje: "Embajador de la potencia del norte",
    texto: "Hemos decidido no comprarle más azúcar hasta que devuelvan lo expropiado.",
    izq: { accion: "Pues ahora me quedo con todo", efectos: { elite: 6, potencias: -6, crisis: 1 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Ya tengo otro cliente", efectos: { potencias: 6, elite: -6 } }
  },
  {
    id: "depuracion_criticos", tipo: "cola", enlace: true, titulo: "La lista",
    personaje: "Ministro del Interior",
    texto: "Los escritores se tomaron en serio lo de la libertad. Tengo la lista de criticones. ¿Los detenemos?",
    izq: { accion: "Que critiquen bajito", efectos: { pueblo: 8, ejercito: -5 } },
    der: { accion: "Memorias desde la celda", efectos: { pueblo: -8, ejercito: 5 }, banderas: ["base.criticos_detenidos"] }
  },

  /* ---------- Sorteo ---------- */
  {
    // 28 oct, plan narrativo (piloto de la era 1): la reforma agraria (1959); se elige cómo
    id: "tierra", tipo: "sorteo", peso: 20, titulo: "La tierra",
    personaje: "Ministro de Trabajo",
    texto: "Las fincas de los ricos ya son de la Revolución. ¿Las repartimos entre los campesinos o las gestionará el Estado?",
    izq: { accion: "A los campesinos", efectos: { pueblo: 8, elite: -6, crisis: 1 }, banderas: ["base.reforma_agraria"] },
    der: { accion: "El Estado cultiva mejor", efectos: { pueblo: -8, elite: 6 }, banderas: ["base.reforma_agraria"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): las «coletillas» (1960)
    id: "periodicos", tipo: "sorteo", peso: 5, titulo: "Los periódicos",
    personaje: "Ministra de Cultura",
    texto: "La prensa critica cada decreto. Los tipógrafos quieren aclarar al pie que es propaganda enemiga.",
    izq: { accion: "Aclaren todo", efectos: { elite: 6, pueblo: -6 }, banderas: ["base.censura_previa"] },
    der: { accion: "Prensa libre por ahora", efectos: { pueblo: 6, elite: -6 }, banderas: ["base.prensa_libre"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): incluye «Estudiantes en la calle»; las elecciones nunca se hacen, se elige cómo se justifica
    id: "urnas", tipo: "sorteo", peso: 20, cond: { turnoMin: 2 }, titulo: "Las urnas prometidas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Se acerca la fecha de las elecciones que prometimos. ¿Qué le decimos al Pueblo?",
    izq: { accion: "¿Elecciones para qué?", efectos: { pueblo: 6, elite: -6 }, banderas: ["base.elecciones_aplazadas", "base.estudiantes_reprimidos"] },
    der: { accion: "Aplazadas por decreto", efectos: { pueblo: -6, elite: 6 }, banderas: ["base.elecciones_aplazadas", "base.elecciones_prometidas"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): la campaña (1961) se hace siempre; se elige qué se enseña
    id: "alfabetizacion", tipo: "sorteo", peso: 20, titulo: "La campaña de alfabetización",
    personaje: "Ministra de Educación",
    texto: "Los estudiantes irán al campo a enseñar a leer y escribir. ¿Cuál será la primera lección?",
    izq: { accion: "La R de Revolución", efectos: { elite: 6, pueblo: -6 }, encolar: [{ carta: "alfabetizadores_monte", min: 1, max: 1 }] },
    der: { accion: "El abecedario", efectos: { pueblo: 6, elite: -6 }, encolar: [{ carta: "alfabetizadores_monte", min: 1, max: 1 }] }
  },
  {
    // 23 oct, Jorge: la declaración socialista (abril de 1961); 28 oct: se elige en quién se apoya
    id: "declaracion_socialista", tipo: "ancla", ventana: [6, 10], titulo: "La declaración socialista",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Nos han bombardeado y el Pueblo llora en la plaza. Es el momento de decir qué es la Revolución.",
    izq: { accion: "Para los humildes", efectos: { pueblo: 6, potencias: -5, elite: -3 }, encolar: [{ carta: "la_bahia", min: 1, max: 1 }] },
    der: { accion: "Socialista importada", efectos: { pueblo: -6, potencias: 5, elite: 3 }, encolar: [{ carta: "la_bahia", min: 1, max: 1 }] }
  },
  {
    // 23 oct, Jorge: el fin del deporte profesional (1961-62)
    id: "fin_pelota", tipo: "sorteo", peso: 5, titulo: "Se acabó el profesional",
    personaje: "Ministra de Educación",
    texto: "Nuestros mejores deportistas juegan en las ligas extranjeras. ¿Abolimos el deporte profesional?",
    izq: { accion: "Se juega por amor", efectos: { elite: 4, potencias: -4 } },
    der: { accion: "Que cobren en divisas", efectos: { potencias: 4, elite: -4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): la enseñanza nacionalizada y los curas expulsados en barco (1961)
    id: "escuelas", tipo: "sorteo", peso: 20, titulo: "Los colegios de los curas",
    personaje: "Ministra de Educación",
    texto: "Los curas no perdonan que les quitáramos los colegios: cada domingo predican contra la Revolución.",
    izq: { accion: "Que recen en un barco", efectos: { elite: 6, pueblo: -6 } },
    der: { accion: "Dios, pero sin tiza", efectos: { pueblo: 6, elite: -6 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): la ruptura de relaciones (1961)
    id: "club_golf", tipo: "sorteo", peso: 3, titulo: "El club de golf",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país romperá relaciones si sigue expropiando. Empezando por el club de golf.",
    izq: { accion: "Su «hoyo» ahora es mío", efectos: { potencias: -9, pueblo: 8, elite: 4 } },
    der: { accion: "No tocaremos nada más", efectos: { potencias: 9, pueblo: -8, elite: -4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): la invasión de 1961; el canje por compotas es real, el fusilamiento de todos no
    id: "la_bahia", tipo: "cola", enlace: true, titulo: "La bahía",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Derrotamos a los invasores de la bahía en tres días. ¿Qué hacemos con los mil doscientos presos?",
    izq: { accion: "Cámbienlos por compotas", efectos: { pueblo: 5, potencias: 4, ejercito: -6 } },
    der: { accion: "Un último cigarro y chao", efectos: { potencias: -4, ejercito: 6, crisis: 2 } }
  },
  {
    id: "los_ninos", tipo: "sorteo", peso: 3, cond: { turnoMin: 3 }, titulo: "Los niños que se van",
    personaje: "Ministra de Educación",
    texto: "Corre el rumor de que el Estado se quedará con los niños. Los padres los suben solos a los aviones.",
    izq: { accion: "Sus padres sabrán", efectos: { pueblo: 5, ejercito: -4, potencias: 3 } },
    der: { accion: "Los niños son del Estado", efectos: { pueblo: -5, ejercito: 4, potencias: -3 } }
  },
  {
    id: "reforma_urbana", tipo: "sorteo", peso: 20, titulo: "La reforma urbana",
    personaje: "Ministro de Economía",
    texto: "Los alquileres se comen medio sueldo. Propongo expropiar las casas y que el Estado las alquile.",
    izq: { accion: "Que cada inquilino sea dueño", efectos: { pueblo: 8, elite: -5 } },
    der: { accion: "Ahora el casero soy yo", efectos: { pueblo: -8, elite: 5 } }
  },
  {
    id: "milicias", tipo: "sorteo", peso: 3, titulo: "Las milicias",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Crearemos milicias de obreros y estudiantes por si vuelve el tirano. Falta decidir quién las manda.",
    izq: { accion: "Que cada barrio mande", efectos: { pueblo: 6, ejercito: -6 } },
    der: { accion: "Bajo mando militar", efectos: { pueblo: -6, ejercito: 6 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): «Dentro de la Revolución, todo» (1961)
    id: "mil_flores", tipo: "sorteo", peso: 3, cond: { sin: ["base.censura_previa"] }, titulo: "Las mil flores",
    personaje: "Ministra de Cultura",
    texto: "Los escritores quieren saber qué pueden publicar. Propongo que usted les marque el límite.",
    izq: { accion: "Dentro todo, fuera nada", efectos: { pueblo: -8, elite: 5 }, banderas: ["base.censura_previa"] },
    der: { accion: "El arte es libre", efectos: { pueblo: 8, elite: -5 }, banderas: ["base.critica_abierta"], encolar: [{ carta: "depuracion_criticos", min: 1, max: 1 }] }
  },
  {
    id: "oficiales", tipo: "sorteo", peso: 5, titulo: "Los oficiales de antes",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los oficiales del tirano que se rindieron piden un puesto en el nuevo Ejército.",
    izq: { accion: "Uniforme nuevo y listo", efectos: { ejercito: -5, potencias: 4 } },
    der: { accion: "Todos a la calle", efectos: { ejercito: 5, potencias: -4, crisis: 1 }, banderas: ["base.viejos_oficiales", "base.purga_inicial"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): los comités de vigilancia (1960) se crean siempre; se elige a quién informan
    id: "ojos_barrio", tipo: "sorteo", peso: 30, cond: { turnoMin: 3 }, titulo: "Los ojos del barrio",
    personaje: "Ministro del Interior",
    texto: "Cada cuadra tendrá su comité de vecinos vigilantes. Falta decidir a quién le cuentan lo que ven.",
    izq: { accion: "Los chismes al Partido", efectos: { elite: 6, ejercito: -6, pueblo: -3 } },
    der: { accion: "Los chismes a la Policía", efectos: { ejercito: 6, elite: -6, pueblo: -3 }, banderas: ["base.comites_vigilancia"] }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): en 1959 se prohibieron por ley las estatuas de dirigentes vivos
    id: "retrato", tipo: "sorteo", peso: 3, cond: { turnoMin: 4 }, titulo: "El retrato",
    personaje: "Ministra de Cultura",
    texto: "Propongo su retrato en cada aula. El fotógrafo pregunta cuál es su perfil bueno.",
    izq: { accion: "El izquierdo, claro", efectos: { pueblo: -3, elite: 6, crisis: 1 }, banderas: ["base.culto_iniciado"] },
    der: { accion: "Mejor el de los mártires", efectos: { pueblo: 3, elite: -6 }, banderas: ["base.modestia_aparente"] }
  },
  {
    id: "marchan", tipo: "sorteo", peso: 7, cond: { alguna: ["base.reforma_agraria", "base.nacionalizo_empresas"] }, titulo: "Los que se marchan",
    personaje: "Ministro del Interior",
    texto: "Los ricos se marchan con las joyas cosidas al forro. Propongo registrarlos en el aeropuerto.",
    izq: { accion: "Que viajen ligeros", efectos: { elite: 6, ejercito: -4, crisis: -1 }, banderas: ["base.exodo_elite", "base.exiliados_vocales"] },
    der: { accion: "Nadie sale sin permiso", efectos: { ejercito: 6, elite: -4, pueblo: -5 }, banderas: ["base.frontera_cerrada"] }
  },

  /* ---------- Crisis (borrador) ---------- */
  {
    // 28 oct, plan narrativo (piloto de la era 1): humor; el Comandante lanzó en un partido de exhibición (1959)
    id: "beisbol", tipo: "sorteo", peso: 12, titulo: "El partido",
    personaje: "Ministra de Educación",
    texto: "Estamos organizando un partido de béisbol entre ministros y comandantes. Propongo que lance usted.",
    izq: { accion: "A ver quién me batea", efectos: { pueblo: 4, ejercito: -3 } },
    der: { accion: "Yo seré el árbitro", efectos: { ejercito: 3, pueblo: -4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): humor; la anécdota del «¿hay algún economista?» (1959)
    id: "economista", tipo: "sorteo", peso: 12, titulo: "El economista",
    personaje: "Ministro de Economía",
    texto: "Pedimos un economista para el Banco Nacional y el Comandante Cabaña se ofreció porque oyó «comunista».",
    izq: { accion: "Me sirve igual", efectos: { ejercito: 4, elite: -4 } },
    der: { accion: "Mejor uno que sepa sumar", efectos: { elite: 4, ejercito: -4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): humor; prepara el atentado de la crema para la barba
    id: "barbas", tipo: "sorteo", peso: 12, titulo: "Las barbas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El barbero de palacio quiere saber si los comandantes se afeitarán ahora que gobiernan.",
    izq: { accion: "Las barbas no se tocan", efectos: { ejercito: 4, elite: -3 } },
    der: { accion: "Que se afeiten los demás", efectos: { elite: 3, ejercito: -4 } }
  },
  {
    // 28 oct, plan narrativo (piloto de la era 1): humor; la cola nacionalizada sin receta
    id: "refresco", tipo: "sorteo", peso: 12, titulo: "El refresco",
    personaje: "Ministro de Comercio",
    texto: "Nacionalizamos la fábrica del famoso refresco de cola, pero se llevaron la receta secreta.",
    izq: { accion: "Improvisen una receta", efectos: { elite: 4, pueblo: -3 } },
    der: { accion: "Que beban guarapo", efectos: { pueblo: 3, elite: -4 } }
  },
  {
    id: "crisis_tiendas", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 8, titulo: "Las tiendas vacías",
    personaje: "Ministro de Comercio",
    texto: "En las tiendas del Estado no hay nada. En el mercado negro de todo a precio de oro.",
    izq: { accion: "Confisquen y repartan", efectos: { pueblo: -8, ejercito: 4, elite: 4, crisis: -3 } },
    der: { accion: "Yo también compro ahí", efectos: { pueblo: 3, elite: 5, crisis: -3 }, banderas: ["base.mercado_paralelo"] }
  },
  {
    // 28 oct, plan narrativo: la crisis leve (antes «La factura»), en cualquier era; umbral 5 desde el 29 oct (antes 6: en la era 1 salía en ~15 % de las partidas; con 5, ~30 %; con 4 salía en el 89 % en todas las eras)
    id: "colas", tipo: "crisis", repetible: true, disparo: e => e.crisis >= 5, titulo: "Las colas",
    personaje: "Ministro de Comercio",
    texto: "Hay colas para el pan, el jabón y hasta para hacer cola. Nadie encuentra una explicación.",
    izq: { accion: "Primero los militantes", efectos: { elite: 5, pueblo: -4, crisis: -3 } },
    der: { accion: "Yo sé a quién llamar", efectos: { pueblo: 4, elite: -5, crisis: -3 }, encolar: [{ invoca: "pupo", min: 1, max: 1 }] }   // 29 oct: invoca a Padrino Pupo (una amenaza al azar, una vez por era; docs/INVITADOS.md)
  },

  {
    // 29 oct: Padrino Pupo (invitado fijo, docs/INVITADOS.md): la amenaza es un segundo paso (`enlace`): no cuenta para el largo de la era
    id: "pupo_mal_ojo", tipo: "cola", enlace: true, invoca: "pupo", titulo: "Padrino Pupo (mal ojo)",
    personaje: "Padrino Pupo",
    texto: "Mijo, le han echado algo malo. Eso se le ve en la cara.",
    izq: { accion: "Límpieme, padrino", efectos: { pueblo: 3, elite: -3 }, encolar: [{ carta: "pupo_mal_ojo_remedio", min: 1, max: 1 }] },
    der: { accion: "Yo no creo en santos", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    id: "pupo_mal_ojo_remedio", tipo: "cola", enlace: true, titulo: "Padrino Pupo (el remedio)",
    personaje: "Padrino Pupo",
    texto: "Para limpiarle el camino, el santo pide huevos, siete cocos, un chivo y la nevera de un ministro.",
    izq: { accion: "Que sean dos neveras", efectos: { pueblo: 3, elite: -3 } },
    der: { accion: "Rebaje algo, padrino", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    // 29 oct: Padrino Pupo (invitado fijo, docs/INVITADOS.md): la amenaza es un segundo paso (`enlace`): no cuenta para el largo de la era
    id: "pupo_enemigos", tipo: "cola", enlace: true, invoca: "pupo", titulo: "Padrino Pupo (enemigos)",
    personaje: "Padrino Pupo",
    texto: "Mijo, quieren verlo caer, y no son pocos.",
    izq: { accion: "Ciérreles el paso", efectos: { pueblo: 3, elite: -3 }, encolar: [{ carta: "pupo_enemigos_remedio", min: 1, max: 1 }] },
    der: { accion: "Ya tengo escolta", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    id: "pupo_enemigos_remedio", tipo: "cola", enlace: true, titulo: "Padrino Pupo (el remedio)",
    personaje: "Padrino Pupo",
    texto: "Para cerrarles el camino, el santo necesita tabaco, dos gallos y la casa de un burgués exiliado.",
    izq: { accion: "Casa con piscina", efectos: { pueblo: 3, elite: -3 } },
    der: { accion: "Con un piso le basta", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    // 29 oct: Padrino Pupo (invitado fijo, docs/INVITADOS.md): la amenaza es un segundo paso (`enlace`): no cuenta para el largo de la era
    id: "pupo_envidia", tipo: "cola", enlace: true, invoca: "pupo", titulo: "Padrino Pupo (envidia)",
    personaje: "Padrino Pupo",
    texto: "Mijo, esa envidia que le tienen viene cargada.",
    izq: { accion: "Protéjame, padrino", efectos: { pueblo: 3, elite: -3 }, encolar: [{ carta: "pupo_envidia_remedio", min: 1, max: 1 }] },
    der: { accion: "La envidia me alimenta", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    id: "pupo_envidia_remedio", tipo: "cola", enlace: true, titulo: "Padrino Pupo (el remedio)",
    personaje: "Padrino Pupo",
    texto: "Para protegerlo, hay que darle al santo langosta, ron, tres palomas y un reloj como el suyo.",
    izq: { accion: "Le doy el de repuesto", efectos: { pueblo: 3, elite: -3 } },
    der: { accion: "Que pregunte la hora", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    // 29 oct: Padrino Pupo (invitado fijo, docs/INVITADOS.md): la amenaza es un segundo paso (`enlace`): no cuenta para el largo de la era
    id: "pupo_deseos", tipo: "cola", enlace: true, invoca: "pupo", titulo: "Padrino Pupo (deseos)",
    personaje: "Padrino Pupo",
    texto: "Mijo, hay mucha gente deseándole mal. El santo me lo ha dicho.",
    izq: { accion: "Contente al santo", efectos: { pueblo: 3, elite: -3 }, encolar: [{ carta: "pupo_deseos_remedio", min: 1, max: 1 }] },
    der: { accion: "Dígale que estoy ocupado", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    id: "pupo_deseos_remedio", tipo: "cola", enlace: true, titulo: "Padrino Pupo (el remedio)",
    personaje: "Padrino Pupo",
    texto: "Para tenerlo contento, al santo hay que darle viandas, un puerco, ron y un carro con chófer.",
    izq: { accion: "Un descapotable", efectos: { pueblo: 3, elite: -3 } },
    der: { accion: "Que el santo camine", efectos: { pueblo: -3, elite: 3 } }
  },
  {
    // 29 oct: Papá Ernesto (invitado de la era 1, docs/INVITADOS.md): tres cartas repartidas por la era, no un miniflujo
    id: "ernesto_torneo", tipo: "ancla", ventana: [2, 3], cond: { turnoMin: 2 }, titulo: "Papá Ernesto (torneo)",
    personaje: "Papá Ernesto",
    texto: "Escribo novelas y pesco agujas. Le invito a mi torneo: daiquirí ilimitado y un trofeo con mi nombre.",
    izq: { accion: "Conmigo todos pican", efectos: { pueblo: 5, elite: -5 }, banderas: ["base.ernesto_amigo"] },   // 29 oct: sin aceptar el torneo, Ernesto no vuelve
    der: { accion: "No me gusta pescar", efectos: { pueblo: -5, elite: 5 } }
  },
  {
    // 29 oct: Papá Ernesto (invitado de la era 1, docs/INVITADOS.md): tres cartas repartidas por la era, no un miniflujo
    id: "ernesto_whisky", tipo: "ancla", ventana: [5, 6], cond: { turnoMin: 5, requiere: ["base.ernesto_amigo"], tras: { carta: "ernesto_torneo", turnos: 3 } }, titulo: "Papá Ernesto (whisky)",
    personaje: "Papá Ernesto",
    texto: "Adoro su Revolución, pero sin whisky importado no escribo ni una línea. ¿Hacemos una excepción?",
    izq: { accion: "Whisky para el genio", efectos: { potencias: 5, pueblo: -5 }, banderas: ["base.ernesto_whisky"] },
    der: { accion: "Beba guarapo", efectos: { potencias: -5, pueblo: 5 } }
  },
  {
    // 29 oct: Papá Ernesto (invitado de la era 1, docs/INVITADOS.md): tres cartas repartidas por la era, no un miniflujo
    id: "ernesto_higado", tipo: "ancla", ventana: [8, 9], cond: { turnoMin: 8, requiere: ["base.ernesto_amigo", "base.ernesto_whisky"], tras: { carta: "ernesto_whisky", turnos: 3 } }, titulo: "Papá Ernesto (higado)",
    personaje: "Papá Ernesto",
    texto: "Me voy a curarme el hígado y no creo que vuelva. Le dejo mi casa, mis gatos y mis botellas. Adiós.",
    izq: { accion: "Tu casa será un museo", efectos: { pueblo: 5, elite: -5 } },
    der: { accion: "El Partido cuidará tu bar", efectos: { pueblo: -5, elite: 5 } }
  },

  /* ---------- Coalición (borrador) ---------- */
  {
    id: "coalicion_calle_cuarteles", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.pueblo < UMBRAL_COALICION && e.barras.ejercito < UMBRAL_COALICION,
    titulo: "La calle y los cuarteles",
    personaje: "Ministro del Interior",
    texto: "Algunos oficiales se reúnen con los que protestan en la calle. Propongo arrestarlos ya.",
    izq: { accion: "Un ascenso y se calman", efectos: { ejercito: 8, elite: -4 } },
    der: { accion: "Arréstenlos a todos", efectos: { ejercito: -6, pueblo: -3, crisis: 2 } }
  },
  {
    // 28 oct, plan narrativo: el Partido se acerca al aliado a espaldas del Comandante (el sectarismo de 1962, la microfracción de 1968)
    id: "coalicion_partido_aliado", tipo: "coalicion", repetible: true,
    disparo: e => e.barras.elite < UMBRAL_COALICION && e.barras.potencias < UMBRAL_COALICION,
    titulo: "La embajada",
    personaje: "Ministro del Interior",
    texto: "Algunos jefes del Partido van mucho a la embajada de nuestro aliado. Dicen que van a cenar.",
    izq: { accion: "Lo que pida el aliado", efectos: { potencias: 8, elite: -4 } },
    der: { accion: "Casa y coche para todos", efectos: { elite: 8, potencias: -4 } }
  },

  /* ---------- Era 2 · La Purga ---------- */
  {
    id: "aniversario", era: 2, tipo: "ancla", ventana: [1, 2], titulo: "El aniversario",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Llega el aniversario: el Ejército quiere desfile de tanques y el Pueblo, ron. No hay para los dos.",
    izq: { accion: "Un gran desfile con tanques", efectos: { ejercito: 8, pueblo: -7, crisis: 1 }, banderas: ["base.desfile_militar"] },
    der: { accion: "Ron gratis para todo el Pueblo", efectos: { pueblo: 7, ejercito: -8 } }
  },

  {
    // 28 oct, plan narrativo (piloto de la era 1): los misiles (1962) llegan siempre; el aliado pidió secreto y el Comandante quería anunciarlo
    id: "nuevos_vecinos", tipo: "ancla", ventana: [10, 14], titulo: "Los nuevos vecinos",
    personaje: "Embajador del bloque oriental",
    texto: "Le enviaremos misiles escondidos en barcos de azúcar. Nadie debe saberlo.",
    izq: { accion: "Ni mi hermano", efectos: { potencias: 6, ejercito: -5 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 1 }] },
    der: { accion: "Discreto como mi barba", efectos: { potencias: -6, ejercito: 5, crisis: 2 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 1 }] }
  },

  {
    // 28 oct, plan narrativo (piloto de la era 1): el aliado retiró los misiles sin consultar al Comandante, que se negó a la inspección
    id: "ultimatum", tipo: "cola", enlace: true, titulo: "El ultimátum",
    personaje: "Embajador de la potencia del norte",
    texto: "Hemos pactado con su aliado la retirada de los misiles. Enviaremos inspectores para comprobarlo. Creíamos que ya lo sabía.",
    izq: { accion: "Fue idea mía", efectos: { potencias: 6, ejercito: -6, crisis: -1 } },
    der: { accion: "Compruébeme esta", efectos: { potencias: -6, ejercito: 6, crisis: 2 }, banderas: ["base.embargo_en_marcha"] }
  },


  {
    id: "potencias_enfadan", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.juicios_publicos"] }, titulo: "Las potencias se enfadan",
    personaje: "Embajador de la potencia del norte",
    texto: "Exigimos que los acusados de sus juicios públicos tengan defensa y garantías antes de la sentencia.",
    izq: { accion: "Que se les asignen abogados", efectos: { potencias: 7, elite: -3 } },
    der: { accion: "Los juicios son asunto nuestro", efectos: { potencias: -7, ejercito: 4, elite: 3 } }
  },

  {
    id: "voz_exilio", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.exiliados_vocales"] }, titulo: "La voz del exilio",
    personaje: "Ministra de Cultura",
    texto: "Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha bajito.",
    izq: { accion: "Interfieran la emisora con música", efectos: { pueblo: -6, ejercito: 3, elite: 2 } },
    der: { accion: "Que la radio diga que son espías", efectos: { ejercito: 4, potencias: -4, pueblo: -3 } }
  },


  {
    id: "hambre", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.reforma_agraria"] }, titulo: "El hambre",
    personaje: "Ministro de Trabajo",
    texto: "Repartimos la tierra, pero faltan semillas y tractores. La cosecha se ha reducido a la mitad.",
    izq: { accion: "El Estado siembra mejor que nadie", efectos: { pueblo: -5, elite: 2 } },
    der: { accion: "Importen comida a cualquier precio", efectos: { pueblo: 6, potencias: 5 } }
  },

  {
    id: "periodista_oficial", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.censura_previa"] }, titulo: "El periodista oficial",
    personaje: "Ministra de Cultura",
    texto: "La gente cree más en los rumores que en los periódicos. Propongo un periodista oficial que los desmienta.",
    izq: { accion: "Nombren un Desmentidor Oficial", efectos: { pueblo: -3, elite: 5 }, banderas: ["base.periodista_oficial"] },
    der: { accion: "Que la prensa diga la verdad", efectos: { pueblo: 5, elite: -5 } }
  },


  {
    id: "elecciones_controladas", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_prometidas"] }, titulo: "Elecciones controladas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Se acercan las elecciones prometidas. El Partido propone lista única, «para comodidad del votante».",
    izq: { accion: "Papeleta única: Partido o Partido", efectos: { pueblo: -6, elite: 5 } },
    der: { accion: "Abran las listas a la oposición", efectos: { pueblo: 6, elite: -5 } }
  },


  {
    id: "club_ajedrez", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.viejos_oficiales"] }, titulo: "El club de ajedrez",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los oficiales que jubiló se reúnen en un «club de ajedrez». No juegan al ajedrez.",
    izq: { accion: "Jaque mate: todos detenidos", efectos: { ejercito: 3, potencias: -5 } },
    der: { accion: "Metan un topo en el club", efectos: { ejercito: 6 } }
  },

  {
    id: "jefe_poder", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.purga_inicial"] }, titulo: "El jefe pide más",
    personaje: "Ministro del Interior",
    texto: "Propongo crear una unidad que vigile a la propia policía. La dirigiría yo.",
    izq: { accion: "Autorizo la unidad especial", efectos: { ejercito: 8, elite: -3, pueblo: -4 }, banderas: ["base.jefe_poderoso"] },
    der: { accion: "Que la policía se vigile sola", efectos: { ejercito: -4, pueblo: 3, elite: 3 } }
  },



  {
    id: "denuncias_falsas", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.comites_vigilancia", "base.purga_inicial", "base.criticos_detenidos"] }, titulo: "Denuncias falsas",
    personaje: "Ministro del Interior",
    texto: "Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por una gallina.",
    izq: { accion: "Que se investigue hasta la gallina", efectos: { ejercito: 6, pueblo: -6 }, banderas: ["base.denuncias_todas"] },
    der: { accion: "Solo cuentan las denuncias políticas", efectos: { pueblo: 4, ejercito: -4 } }
  },

  {
    id: "oposicion_firma", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exiliados_vocales", "base.critica_abierta", "base.campos_trabajo"] }, titulo: "Una carta con firmas",
    personaje: "Ministra de Cultura",
    texto: "Un grupo de intelectuales firmó una carta reclamando los derechos que usted mismo prometió.",
    izq: { accion: "Abran un diálogo con los firmantes", efectos: { pueblo: 6, ejercito: -4, elite: -3 } },
    der: { accion: "Prohíban la carta y a sus autores", efectos: { pueblo: -6, ejercito: 5, elite: 3 } }
  },

  {
    id: "faltan_tecnicos", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exodo_elite", "base.juicios_publicos", "base.nacionalizo_empresas"] }, titulo: "Faltan técnicos",
    personaje: "Ministro de Economía",
    texto: "Se han ido ingenieros, médicos y contables. Las fábricas ya solo funcionan con consignas.",
    izq: { accion: "Prohíban salir a los titulados", efectos: { ejercito: 4, pueblo: -4 } },
    der: { accion: "Cursos de ingeniería en seis meses", efectos: { elite: 2, pueblo: 3 } }
  },

  {
    id: "intentos_fuga", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.frontera_cerrada", "base.criticos_detenidos", "base.exiliados_vocales"] }, titulo: "Intentos de fuga",
    personaje: "Ministro del Interior",
    texto: "Cada semana huyen más familias en balsas. Ya no quedan neumáticos ni puertas en los barrios.",
    izq: { accion: "Refuercen la frontera", efectos: { ejercito: 6, pueblo: -5 } },
    der: { accion: "Que se vayan y nos dejen sus casas", efectos: { pueblo: 5, ejercito: -4, potencias: 3 } }
  },

  {
    // 28 oct, plan narrativo (piloto de la era 1): la libreta de racionamiento (1962); comprar a intermediarios trae la deuda externa
    id: "embargo_total", tipo: "sorteo", peso: 20, cond: { turnoMin: 6, alguna: ["base.embargo_en_marcha", "base.nacionalizo_empresas"] }, titulo: "Embargo total",
    personaje: "Ministro de Comercio",
    texto: "El embargo es total y las tiendas se vacían. Propongo repartir la comida con una libreta.",
    izq: { accion: "Una libreta por familia", efectos: { elite: 5, potencias: -4, pueblo: -3, crisis: -1 } },
    der: { accion: "Por la puerta de atrás", efectos: { potencias: 4, elite: -5, pueblo: 3, crisis: 1 }, banderas: ["base.deuda_externa"] }
  },

  {
    id: "deuda_llama", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.compensaciones", "base.deuda_externa"] }, titulo: "La deuda llama",
    personaje: "Ministro de Economía",
    texto: "Mañana vence el primer pago de la deuda con el extranjero. En caja hay menos de lo prometido.",
    izq: { accion: "Paguen aunque el Pueblo no coma", efectos: { potencias: 5, pueblo: -5 } },
    der: { accion: "No se le paga al explotador", efectos: { potencias: -6, elite: 2 } }
  },

  {
    // 23 oct, Jorge: las consignas del Comandante en vallas por todo el país
    id: "consignas_vallas", era: 3, tipo: "sorteo", peso: 10, titulo: "Las vallas",
    personaje: "Ministra de Cultura",
    texto: "Queremos poner sus frases épicas en vallas por todo el país, pero no hay pintura para todo.",
    izq: { accion: "Si faltan frases que me avisen", efectos: { elite: 4, pueblo: -4 } },
    der: { accion: "Que la pintura vaya a las escuelas", efectos: { pueblo: 4, elite: -4 } }
  },
  {
    // 23 oct, Jorge: el caso Padilla (1971), el poeta que lee su autocrítica ante sus colegas
    id: "autocritica_poeta", era: 3, tipo: "sorteo", peso: 10, titulo: "La autocrítica del poeta",
    personaje: "Ministro del Interior",
    texto: "Hemos detenido a un poeta premiado por sus versos contra el gobierno. Ofrece retractarse en público.",
    izq: { accion: "Que sus colegas oigan su autocrítica", efectos: { ejercito: 4, pueblo: -3 } },
    der: { accion: "Que publique, la poesía no muerde", efectos: { pueblo: 3, ejercito: -4 } }
  },
  {
    // 23 oct, Jorge: la guerra de Angola (1975), tropas al otro lado del océano
    id: "guerra_lejana", era: 3, tipo: "sorteo", peso: 10, titulo: "La guerra lejana",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Nos piden soldados para una guerra de liberación al otro lado del mar. El Ejército está listo.",
    izq: { accion: "Que el océano no frene la Revolución", efectos: { ejercito: 5, pueblo: -3 } },
    der: { accion: "Que se liberen solos, como nosotros", efectos: { pueblo: 3, ejercito: -5 } }
  },
  {
    // 23 oct, Jorge: la embajada asaltada y el éxodo del Mariel (1980)
    id: "diez_mil_embajada", era: 3, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "Diez mil en una embajada",
    personaje: "Ministro del Interior",
    texto: "Un autobús ha entrado en una embajada por la verja y detrás diez mil personas.",
    izq: { accion: "Abran el puerto a quien quiera irse", efectos: { pueblo: -4, potencias: 4, crisis: -2 } },
    der: { accion: "Corten el agua y espérenlos fuera", efectos: { ejercito: 4, potencias: -4 } }
  },
  {
    // 23 oct, Jorge: el diálogo con el exilio (1978): los «gusanos» vuelven de visita convertidos en «mariposas»
    id: "dialogo_exilio", era: 3, tipo: "sorteo", peso: 10, titulo: "El diálogo con el exilio",
    personaje: "Ministro de Comercio",
    texto: "Los exiliados quieren volver de visita a ver a sus familias, cargados de regalos y de dólares.",
    izq: { accion: "Mis gusanos ahora son mariposas", efectos: { pueblo: 4, elite: -4 } },
    der: { accion: "Los traidores no tienen familia", efectos: { elite: 4, pueblo: -4 } }
  },
  {
    // 23 oct, Jorge: los boicots a las olimpiadas (1984 y 1988), por lealtad al bloque
    id: "boicot_olimpiadas", era: 3, tipo: "sorteo", peso: 10, cond: { turnoMin: 5 }, titulo: "El boicot",
    personaje: "Embajador del bloque oriental",
    texto: "Boicotearemos las olimpiadas que organiza el enemigo. Esperamos que sus atletas tampoco vayan.",
    izq: { accion: "El mejor deporte es la lealtad", efectos: { potencias: 4, pueblo: -3 } },
    der: { accion: "No les robaré el sueño a mis atletas", efectos: { pueblo: 3, potencias: -4 } }
  },
  {
    // 23 oct, Jorge: los discursos de horas del Comandante
    id: "discurso_maraton", era: 3, tipo: "sorteo", peso: 10, titulo: "El discurso",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Hoy le toca dar el discurso del aniversario. La televisión pregunta cuántas horas le reserva.",
    izq: { accion: "Hablaré hasta que amanezca", efectos: { elite: 4, pueblo: -3 } },
    der: { accion: "Diez minutos y que empiece la fiesta", efectos: { pueblo: 3, elite: -4 } }
  },
  {
    id: "plan_quinquenal", era: 3, tipo: "sorteo", peso: 8, titulo: "El plan quinquenal",
    personaje: "Ministro de Economía",
    texto: "Proponemos un plan quinquenal con metas para cada fábrica, granja y tienda del país.",
    izq: { accion: "Que el éxito quede por escrito", efectos: { elite: 5, pueblo: -4, crisis: 2 } },
    der: { accion: "Que el mercado fije los precios", efectos: { pueblo: 4, elite: -4 } }
  },

  {
    id: "cosecha_record", era: 2, tipo: "sorteo", peso: 8, titulo: "La cosecha récord",
    personaje: "Ministro de Trabajo",
    texto: "La cosecha ha roto récord según los informes. Los almacenes curiosamente están vacíos.",
    izq: { accion: "Que la radio anuncie el récord", efectos: { elite: 5 } },
    der: { accion: "Detengan al que infló las cifras", efectos: { elite: -5, ejercito: 3 } }
  },

  {
    id: "el_espia", era: 2, tipo: "sorteo", peso: 8, titulo: "El diplomático curioso",
    personaje: "Ministro del Interior",
    texto: "Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.",
    izq: { accion: "Expúlsenlo del país", efectos: { potencias: -3 } },
    der: { accion: "A la cárcel, por espía", efectos: { potencias: -6, ejercito: 5 } }
  },

  {
    id: "los_chistes", era: 2, tipo: "sorteo", peso: 8, titulo: "Los chistes",
    personaje: "Ministra de Cultura",
    texto: "Circula un chiste sobre usted. Lo cuentan en las colas y en el Consejo se ríen más alto.",
    izq: { accion: "Detengan al que se ría primero", efectos: { pueblo: -5, ejercito: 4 } },
    der: { accion: "Reírse también es de revolucionarios", efectos: { pueblo: 4, ejercito: -3 } }
  },
  /* ---------- Era 3 · Culto ---------- (tratamiento: «Excelencia»; límites: mensaje ≤150 caracteres, acción ≤5 palabras, remate ≤75) */
  {
    id: "modestia_sospechosa", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.modestia_aparente"] }, titulo: "La modestia sospechosa",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su rechazo a los retratos se toma por desapego al Partido. Quieren una demostración de lealtad.",
    izq: { accion: "Que cuelguen mi retrato en cada sede", efectos: { elite: 4, pueblo: -4 } },
    der: { accion: "Que el Partido trabaje y no adore", efectos: { elite: -4, pueblo: 4 } }
  },
  {
    id: "desfile_anual", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.desfile_militar"] }, titulo: "El desfile del año",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Las Fuerzas Armadas esperan un desfile mayor que el del año pasado: más tanques y más soldados.",
    izq: { accion: "Desfile por todo lo alto", efectos: { ejercito: 7, pueblo: -5, crisis: 2 } },
    der: { accion: "Desfile austero, con lo que haya", efectos: { ejercito: -6, pueblo: 4 } }
  },
  {
    id: "satelites", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_instalados"] }, titulo: "Los satélites",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestros satélites siguen detectando misiles. Exigimos una inspección.",
    izq: { accion: "Inspeccionen lo que quieran", efectos: { potencias: 8, ejercito: -5 } },
    der: { accion: "Revisen primero sus propias bases", efectos: { potencias: -8, ejercito: 5 } }
  },
  {
    id: "aliado_enfadado", era: 2, tipo: "sorteo", peso: 0, borrador: true,   // 28 oct: apagada (peso 0) hasta reescribirla: ya no se pueden rechazar los misiles
    cond: { turnoMin: 3 }, titulo: "El aliado enfadado",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.",
    izq: { accion: "Apoyaremos su próxima invasión", efectos: { potencias: 7 } },
    der: { accion: "Guarden su petróleo, iremos en bici", efectos: { potencias: -6, pueblo: -4 } }
  },
  {
    id: "jefe_insaciable", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.jefe_poderoso"] }, titulo: "El jefe insaciable",
    personaje: "Ministro del Interior",
    texto: "Mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto secreto.",
    izq: { accion: "Tendrá batallón, cárcel y fondos", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.estado_policial"] },
    der: { accion: "Que se apañen con lo que hay", efectos: { ejercito: -8, elite: 3, pueblo: 4 } }
  },
  {
    id: "aulas_vacias", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.estudiantes_reprimidos"] }, titulo: "Las aulas vacías",
    personaje: "Ministra de Educación",
    texto: "Algunos profesores se atreven a enseñar historia sin citarle a usted.",
    izq: { accion: "Enseñen que la historia me absolverá", efectos: { elite: 5, pueblo: -5 } },
    der: { accion: "Libertad de cátedra, de momento", efectos: { pueblo: 5, elite: -5 } }
  },
  {
    id: "titulares", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.periodista_oficial"] }, titulo: "Los titulares",
    personaje: "Ministra de Cultura",
    texto: "El periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.",
    izq: { accion: "Seis páginas y el horóscopo", efectos: { elite: 5, pueblo: -3 } },
    der: { accion: "Con tres páginas es suficiente", efectos: { elite: -4, pueblo: 3 } }
  },
  {
    id: "presos_agenda", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.criticos_detenidos"] }, titulo: "Los presos en la agenda",
    personaje: "Embajador de la potencia del norte",
    texto: "Tenemos una lista de presos políticos. Esperamos que los libere como gesto de buena fe.",
    izq: { accion: "Liberaré a algunos, por mi cumple", efectos: { potencias: 6, ejercito: -5, pueblo: 3 } },
    der: { accion: "¿Qué presos? Que revisen su lista", efectos: { potencias: -6, ejercito: 5, pueblo: -3 } }
  },
  {
    id: "acreedor_favores", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.deuda_externa"] }, titulo: "El acreedor pide favores",
    personaje: "Ministro de Economía",
    texto: "El acreedor perdonará los intereses si en los foros internacionales votamos siempre con él.",
    izq: { accion: "Mi delegado levantará las dos manos", efectos: { potencias: 7, elite: -2, crisis: -2 } },
    der: { accion: "Pagaremos apretando el cinturón", efectos: { potencias: -7, pueblo: -5, elite: 3, crisis: 1 } }
  },
  {
    id: "mercado_mayor", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mercado_paralelo"] }, titulo: "El mercado mayor",
    personaje: "Ministro de Comercio",
    texto: "El mercado paralelo vende más que las tiendas del Estado, y algunos funcionarios cobran en divisas.",
    izq: { accion: "Permitan pequeños negocios privados", efectos: { pueblo: 6, elite: -5, crisis: -1 } },
    der: { accion: "Persigan a los vendedores", efectos: { pueblo: -6, elite: 3, ejercito: 3, crisis: 1 } }
  },

  {
    id: "biografia", era: 3, tipo: "sorteo", peso: 10, titulo: "El documental",
    personaje: "Ministra de Cultura",
    texto: "El documental de la Revolución está listo, pero en las tomas de la sierra se le ve algo rellenito.",
    izq: { accion: "Repitan con un actor con abdominales", efectos: { elite: 4, pueblo: -3 } },
    der: { accion: "La hamaca fue mi trinchera", efectos: { elite: -3, pueblo: 3 } }
  },
  {
    id: "mausoleo", era: 4, tipo: "sorteo", peso: 8, titulo: "El mausoleo",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido ya diseña su tumba: un cacho de roca gigante que dicen que se parece a usted.",
    izq: { accion: "Seré una piedra eterna", efectos: { elite: 4, pueblo: -4, crisis: 2 }, banderas: ["base.mausoleo_construido"] },
    der: { accion: "Entiérrenme como viví: con humildad", efectos: { elite: -3, crisis: -1 } }
  },
  {
    id: "zafra_diez_millones", era: 2, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "La zafra de los diez millones",
    personaje: "Ministro de Trabajo",
    texto: "Queremos la mayor zafra de la historia. Proponemos mandar a cortar caña a estudiantes, oficinistas y soldados.",
    izq: { accion: "¡Todos a la zafra!", efectos: { pueblo: -6, elite: 4 }, encolar: [{ carta: "cifra_no_llega", min: 2, max: 3 }] },
    der: { accion: "Qué disparate, el país se pararía", efectos: { pueblo: 5, elite: -4 } }
  },
  {
    // 23 oct, Jorge: trama de traición inspirada en el Che (1965-67): el héroe fanático que critica al bloque y estorba al Comandante
    id: "companero_incomodo", era: 2, tipo: "sorteo", peso: 10, titulo: "El compañero incómodo",
    personaje: "Embajador del bloque oriental",
    texto: "Cabaña, su héroe más famoso, nos llamó imperialistas en un foro internacional. Exigimos que lo calle.",
    izq: { accion: "Lo mandaré a una misión bien lejos", efectos: { potencias: 4, ejercito: -3 },
           encolar: [{ carta: "guerrilla_perdida", min: 2, max: 3 }] },
    der: { accion: "Quien calla a Cabaña me calla a mí", efectos: { potencias: -4, ejercito: 3 } }
  },
  {
    // 23 oct, Jorge: la ofensiva revolucionaria (1968), que nacionalizó unos 58 000 negocios pequeños; «El mercado mayor» (era 3) los vuelve a permitir
    id: "ofensiva_revolucionaria", era: 2, tipo: "sorteo", peso: 10, cond: { turnoMin: 3 }, titulo: "La ofensiva revolucionaria",
    personaje: "Ministro de Economía",
    texto: "Aún quedan miles de negocios privados: puestos de frituras, barberías, talleres. Son focos de egoísmo.",
    izq: { accion: "El Estado hará las mejores frituras", efectos: { elite: 5, pueblo: -4 } },
    der: { accion: "Dejen vivir al pequeño negocio", efectos: { pueblo: 4, elite: -5 } }
  },
  {
    // 23 oct, Jorge: el servicio militar obligatorio (1963), tres años
    id: "servicio_militar", era: 2, tipo: "sorteo", peso: 10, titulo: "El servicio militar",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Proponemos tres años de servicio militar obligatorio para todos los jóvenes.",
    izq: { accion: "Que cada joven sirva a la patria", efectos: { ejercito: 5, pueblo: -4 } },
    der: { accion: "La patria no se defiende obligado", efectos: { pueblo: 4, ejercito: -5 } }
  },
  {
    // 23 oct, Jorge: la invasión de la primavera de un país del bloque (1968), que el Comandante aplaudió
    id: "invasion_aliado", era: 2, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "La invasión del aliado",
    personaje: "Embajador del bloque oriental",
    texto: "Un país aliado quería reformas y lo hemos corregido con tanques. Esperamos su apoyo público.",
    izq: { accion: "Tienen todo nuestro apoyo fraterno", efectos: { potencias: 5 } },
    der: { accion: "Aquí no opinamos de casas ajenas", efectos: { potencias: -5 } }
  },
  {
    // 23 oct, Jorge: la guerrilla del Che en Bolivia (1967), sin refuerzos
    id: "guerrilla_perdida", era: 2, tipo: "cola", titulo: "La guerrilla perdida",
    personaje: "Ministro del Interior",
    texto: "Cabaña pide refuerzos desde la selva. Si los mandamos, el mundo sabrá que es cosa nuestra.",
    izq: { accion: "Mándenle a nuestros mejores hombres", efectos: { ejercito: 4, potencias: -4 } },
    der: { accion: "Cabaña será un millón de camisetas", efectos: { potencias: 3, ejercito: -3 }, banderas: ["base.ferro_martir"] }
  },
  {
    // 23 oct, Jorge: la zafra de 1970 se queda en ocho millones y medio
    id: "cifra_no_llega", era: 2, tipo: "cola", titulo: "La cifra que no llega",
    personaje: "Ministro de Trabajo",
    texto: "Se acaba la zafra y la caña no llega a la cifra que hemos pintado en cada valla del país.",
    izq: { accion: "Manden a todo el país al cañaveral", efectos: { elite: 4, pueblo: -5 }, encolar: [{ carta: "discurso_derrota", min: 1, max: 2 }] },
    der: { accion: "Busquen cómo hacer que la cuenta dé", efectos: { pueblo: 3, elite: -3 }, encolar: [{ carta: "discurso_derrota", min: 1, max: 2 }] }
  },
  {
    // 23 oct, Jorge: el discurso de julio de 1970, en el que el Comandante ofrece dimitir y la plaza grita que no
    id: "discurso_derrota", era: 2, tipo: "cola", titulo: "El discurso de la derrota",
    personaje: "Ministro de Trabajo",
    texto: "La zafra ha fracasado. Un millón de personas le espera en la plaza para oír qué pasó.",
    izq: { accion: "Ofreceré mi dimisión a la plaza", efectos: { pueblo: 4, elite: -3 } },
    der: { accion: "Busquen al contrarrevolucionario", efectos: { ejercito: 4, pueblo: -4 } }
  },
  {
    id: "sucesion", era: 3, tipo: "sorteo", peso: 8, titulo: "La sucesión",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido pregunta quién le sucederá. Si no lo designa, algunos ministros se designarán solos.",
    izq: { accion: "Designo sucesor a mi hermano", efectos: { elite: -3, ejercito: 4 }, banderas: ["base.sucesor_designado"] },
    der: { accion: "Yo soy la Revolución, y no muero", efectos: { elite: -2, crisis: 3 } }
  },
  {
    id: "beso_fraterno", era: 3, tipo: "sorteo", peso: 8, titulo: "El beso fraterno",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro máximo dirigente desea abrazarle ante las cámaras. Será una foto para la Historia.",
    izq: { accion: "Abrazo que todos digan «¡Ohhh!»", efectos: { potencias: 6 } },
    der: { accion: "Apretón de manos, que hace calor", efectos: { potencias: -5 } }
  },
  {
    id: "viaje_oficial", era: 3, tipo: "sorteo", peso: 8, titulo: "El viaje oficial",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro presidente le invita dos semanas, con cenas, desfiles y un acuerdo comercial ya preparado.",
    izq: { accion: "Encantado, llevaré los puros", efectos: { potencias: 6 } },
    der: { accion: "Imposible, tengo mucho que dirigir", efectos: { potencias: -5 } }
  },
  {
    id: "el_atentado", era: 3, tipo: "ancla", ventana: [5, 7], titulo: "El atentado",
    personaje: "Ministro del Interior",
    texto: "Los terroristas del exilio han volado uno de nuestros aviones con setenta y tres pasajeros.",
    izq: { accion: "Funeral con un millón en la plaza", efectos: { pueblo: 4, elite: 2 }, encolar: [{ carta: "los_que_celebran", min: 1, max: 2 }] },
    der: { accion: "Habrá que defenderse infiltrándolos", efectos: { ejercito: 4, potencias: -3 }, banderas: ["base.atentado_investigado"] }
  },
  {
    id: "los_que_celebran", era: 3, tipo: "cola", titulo: "Los que celebran",
    personaje: "Ministro del Interior",
    texto: "Algunos opositores celebraron el atentado del avión. Los tenemos localizados.",
    izq: { accion: "Que celebren en la cárcel", efectos: { ejercito: 7, pueblo: -6 }, banderas: ["base.oposicion_culpada"], encolar: [{ carta: "la_investigacion", min: 1, max: 2 }] },
    der: { accion: "Que los vecinos les den la respuesta", efectos: { elite: 4, pueblo: -3 } }
  },
  {
    id: "la_investigacion", era: 3, tipo: "cola", titulo: "La investigación",
    personaje: "Ministro del Interior",
    texto: "Los acusados del atentado lo niegan todo. A uno de ellos lo enterraron hace dos años.",
    izq: { accion: "Que confiese también el difunto", efectos: { ejercito: 5, pueblo: -5 } },
    der: { accion: "Suéltenlos sin pedirles perdón", efectos: { ejercito: -5, pueblo: 5 } }
  },
  {
    id: "flores_mar", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.accidente_cienfuegos"] }, titulo: "Las flores en el mar",
    personaje: "Ministro del Interior",
    texto: "El Pueblo sigue tirando flores al mar por Milfuegos. Muchos aún preguntan qué pasó.",
    izq: { accion: "Que se olvide sin acto oficial", efectos: { pueblo: 3, elite: -4 } },
    der: { accion: "Encabezaré yo los homenajes", efectos: { elite: 4, pueblo: -3 } }
  },
  {
    // 21 oct, Jorge: las UMAP (1965-68), campos de trabajo militares para los «desviados»; el chiste va contra el eufemismo del régimen
    id: "campos_trabajo", era: 2, tipo: "sorteo", peso: 14, titulo: "Los campos de trabajo",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Hay jóvenes con el pelo largo, curas y «desviados». Trabajar en el campo y cortar caña los reformaría.",
    izq: { accion: "Que el trabajo los haga hombres", efectos: { ejercito: 6, pueblo: -7 }, banderas: ["base.campos_trabajo"] },
    der: { accion: "Que lleven el pelo como quieran", efectos: { ejercito: -6, pueblo: 7 } }
  },
  /* ---------- Era 4 · La Supervivencia ---------- (última era; tratamiento: «Padre de la Patria»; mismos límites de longitud) */
  {
    id: "delfin_impaciente", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.sucesor_designado"] }, titulo: "El delfín impaciente",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su hermano ya recibe embajadores en su despacho y reparte sus propios retratos por las escuelas.",
    izq: { accion: "En los retratos solo salgo yo", efectos: { ejercito: -5, crisis: 1 } },
    der: { accion: "Que gobierne él y yo le corrijo", efectos: { ejercito: 5, elite: -3 } }
  },
  {
    id: "los_inocentes", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.oposicion_culpada"] }, titulo: "Los inocentes",
    personaje: "Embajador de la potencia del norte",
    texto: "Tenemos pruebas de que la oposición de dentro no tuvo nada que ver con lo del avión. Pedimos que se libere a los presos.",
    izq: { accion: "Si los quieres, te los llevas", efectos: { potencias: 5, ejercito: -4 } },
    der: { accion: "Pruebas fabricadas por su espionaje", efectos: { potencias: -5, ejercito: 4, pueblo: -3 } }
  },
  {
    id: "bombas_hoteles", era: 4, tipo: "sorteo", peso: 10, titulo: "Las bombas de los hoteles",
    personaje: "Ministro del Interior",
    texto: "Han estallado bombas en tres hoteles. El detenido confiesa que le pagaban desde el extranjero por cada bomba.",
    izq: { accion: "Que los turistas no se enteren", efectos: { ejercito: 3, potencias: 3, pueblo: -2 } },
    der: { accion: "Juicio para que lo vea el mundo", efectos: { potencias: -5, elite: 3, crisis: 1 } }
  },
  {
    id: "dos_ejercitos", era: 4, tipo: "sorteo", peso: 14, titulo: "Los militares empresarios",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los generales ya saben de tanques. Ahora quieren aprender de hoteles, tiendas y divisas.",
    izq: { accion: "Que cada general tenga su hotel", efectos: { ejercito: 6, elite: -4 } },
    der: { accion: "Los negocios son cosa de ministros", efectos: { elite: 4, ejercito: -3 } }
  },
  {
    id: "el_batallon", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.estado_policial"] }, titulo: "El batallón",
    personaje: "Ministro del Interior",
    texto: "El batallón especial ya ha llenado las cárceles. Pedimos más celdas y más sueldo para seguir así.",
    izq: { accion: "Más celdas y más sueldo", efectos: { ejercito: 6, pueblo: -4 } },
    der: { accion: "Que el Partido mande a sus brigadas", efectos: { elite: 5, ejercito: -4, pueblo: -2 } }
  },

  {
    id: "la_salud", era: 4, tipo: "ancla", ventana: [1, 3], titulo: "La salud",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "La radio del exilio lo ha dado por muerto tres veces este mes. Algunos se pelean por su despacho.",
    izq: { accion: "Apunten quién se pelea por mi silla", efectos: { ejercito: 4, elite: -5 } },
    der: { accion: "Que me graben corriendo en chándal", efectos: { elite: 3, crisis: -1 } }
  },
  {
    id: "el_plebiscito", era: 4, tipo: "sorteo", peso: 10, titulo: "El plebiscito",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "La oposición quiere votar si hay elecciones libres. Y la Constitución se lo permite, por desgracia.",
    izq: { accion: "Adelante, que el Pueblo decida", efectos: { pueblo: 6, elite: -4 }, encolar: [{ carta: "el_escrutinio", min: 1, max: 2 }] },
    der: { accion: "Pues que el 99 % firme lo contrario", efectos: { elite: 5, pueblo: -5 } }
  },
  {
    id: "el_escrutinio", era: 4, tipo: "cola", titulo: "El escrutinio",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Ha ganado el «Sí» a las elecciones libres, pero el resultado aún no es oficial.",
    izq: { accion: "Elecciones con un solo candidato", efectos: { pueblo: 3, elite: 2, crisis: 2 }, banderas: ["base.derrota_aceptada"] },
    der: { accion: "Cuenten hasta que gane el No", efectos: { pueblo: -8, ejercito: 5, elite: 3 }, banderas: ["base.recuento"] }
  },
  {
    id: "aliado_se_hunde", era: 4, tipo: "sorteo", peso: 10, titulo: "El aliado se hunde",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país se disuelve. Le dejo el último barril de petróleo y mi abrigo de piel.",
    izq: { accion: "Lo llamaré... «período especial»", efectos: { potencias: -6, pueblo: -5, elite: 3, crisis: 2 } },
    der: { accion: "Ya me buscaré un amigo con dólares", efectos: { potencias: 5, elite: -4 } }
  },
  {
    id: "las_memorias", era: 4, tipo: "sorteo", peso: 10, titulo: "Las memorias",
    personaje: "Ministra de Cultura",
    texto: "Una editorial extranjera quiere publicar sus memorias. Piden cien horas de entrevista con usted.",
    izq: { accion: "El mundo merece conocerme", efectos: { potencias: 3, elite: 2 } },
    der: { accion: "No tengo tiempo, hay que gobernar", efectos: { elite: -2 } }
  },
  {
    // 23 oct, Jorge: los Juegos Panamericanos de 1991, en pleno período especial
    id: "juegos_crisis", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 2 }, titulo: "Los Juegos",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "No hay petróleo ni comida, y nos toca construir los estadios de los Juegos del continente.",
    izq: { accion: "Las medallas alimentarán al Pueblo", efectos: { elite: 4, pueblo: -4 } },
    der: { accion: "Primero el plato y luego el podio", efectos: { pueblo: 4, elite: -4 } }
  },
  {
    // 23 oct, Jorge: la visita de Juan Pablo II (1998), con misa en la plaza de la Revolución
    id: "visita_papa", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 3 }, titulo: "La visita del Papa",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Papa vendría si le dejamos la plaza para una misa. Nos vendría bien un amigo de su tamaño.",
    izq: { accion: "Dios también cabe en la Revolución", efectos: { pueblo: 4, elite: -3 } },
    der: { accion: "La plaza es solo para mí", efectos: { elite: 3, pueblo: -4 } }
  },
  {
    // 23 oct, Jorge: el hijo mayor del Comandante dirigió el programa nuclear y fue destituido en 1992; la central nunca se terminó
    id: "hijo_mayor", era: 4, tipo: "sorteo", peso: 10, titulo: "La central del hijo",
    personaje: "Ministro de Economía",
    texto: "Su hijo mayor dirige la central nuclear del aliado, pero el aliado se ha hundido y no hay uranio.",
    izq: { accion: "Destitúyanlo: el fracaso es suyo", efectos: { elite: -3, crisis: -1 } },
    der: { accion: "Quiten de donde sea para su central", efectos: { elite: 3, pueblo: -4 } }
  },
  {
    // 23 oct, Jorge: la primavera negra (2003), 75 opositores detenidos mientras el mundo miraba a otra guerra
    id: "los_75", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "Los setenta y cinco",
    personaje: "Ministro del Interior",
    texto: "El mundo está pendiente de una guerra lejana. Es un buen momento para detener opositores.",
    izq: { accion: "Aprovechemos que el mundo no mira", efectos: { ejercito: 5, pueblo: -4 } },
    der: { accion: "No, los mártires salen caros", efectos: { pueblo: 4, ejercito: -5 } }
  },
  {
    // 23 oct, Jorge: el presidente del sur que admira al Comandante (1994-99): petróleo a cambio de asesores y médicos
    id: "amigo_sur", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "El amigo del sur",
    personaje: "Ministro de Comercio",
    texto: "Un coronel del sur que lo admira quiere ser presidente. Ofrece petróleo si le ayudamos.",
    izq: { accion: "Le prestaré asesores y algunos tips", efectos: { potencias: 5, ejercito: 2 } },
    der: { accion: "Que gane solo, como gané yo", efectos: { potencias: -5, ejercito: -2 } }
  },
  {
    // 23 oct, Jorge: la revolución energética (2005-06): bombillas y ollas arroceras casa por casa
    id: "revolucion_energetica", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 5 }, titulo: "La revolución energética",
    personaje: "Ministro de Economía",
    texto: "Tenemos bombillas que ahorran luz y ollas que ahorran arroz. Podemos regalarlas o venderlas.",
    izq: { accion: "Regálenlas y enseñaré a hacer arroz", efectos: { pueblo: 4, ejercito: -4 } },
    der: { accion: "Que las venda el Ejército en dólares", efectos: { ejercito: 4, pueblo: -4 } }
  },
  {
    // 23 oct, Jorge: el niño balsero (1999-2000), una oportunidad política: meses de marchas, la tribuna y el regreso
    id: "nino_balsero", era: 4, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "El niño de la balsa",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Un niño llegó en balsa a la otra orilla sin su madre. Su padre lo reclama: podría ser una causa.",
    izq: { accion: "Este niño vale por diez discursos", efectos: { elite: 4, pueblo: -3 }, encolar: [{ carta: "la_tribuna", min: 1, max: 2 }] },
    der: { accion: "Un niño no es una bandera", efectos: { pueblo: 3, elite: -4 }, encolar: [{ carta: "el_regreso", min: 2, max: 3 }] }
  },
  {
    // 23 oct, Jorge: matar una vaca sin permiso daba más cárcel que matar a una persona; las vacas «se tiraban» a la vía del tren
    id: "matar_vaca", era: 4, tipo: "sorteo", peso: 10, titulo: "Las vacas del Estado",
    personaje: "Ministro del Interior",
    texto: "Cada semana desaparecen vacas del Estado. Los campesinos dicen que se tiran solas a la vía del tren.",
    izq: { accion: "Más años por vaca que por persona", efectos: { ejercito: 4, pueblo: -4 } },
    der: { accion: "Si la vaca estaba triste, al caldero", efectos: { pueblo: 4, ejercito: -4 } }
  },
  {
    id: "el_hijo", era: 4, tipo: "sorteo", peso: 10, titulo: "El hijo",
    personaje: "Ministro de Comercio",
    texto: "Su hijo menor quiere dirigir el puerto. Dice que entiende de barcos porque tiene tres yates.",
    izq: { accion: "Dénselo, lleva el mar en la sangre", efectos: { elite: 5, pueblo: -4 } },
    der: { accion: "Que lo dirija alguien con méritos", efectos: { elite: -3, crisis: -1 } }
  },
  {
    id: "la_cuenta", era: 4, tipo: "sorteo", peso: 10, titulo: "La cuenta en el extranjero",
    personaje: "Ministro de Economía",
    texto: "Una revista extranjera dice que es usted de los más ricos del mundo.",
    izq: { accion: "Dimito si encuentran un dólar", efectos: { pueblo: 3, crisis: 1 } },
    der: { accion: "Calumnias pagadas por el imperio", efectos: { potencias: -4, elite: 2 } }
  },
  {
    id: "la_memoria", era: 4, tipo: "sorteo", peso: 10, cond: { requiere: ["base.mota_juzgado"] }, titulo: "La memoria",
    personaje: "Ministra de Educación",
    texto: "Los nietos de los compañeros de la sierra que encarceló quieren que los libros hablen de ellos.",
    izq: { accion: "Fueron héroes, aunque se desviaran", efectos: { pueblo: 4, ejercito: -4 } },
    der: { accion: "Eran contrarrevolucionarios y punto", efectos: { elite: 3, pueblo: -4 } }
  },
  {
    id: "huelga_general", era: 4, tipo: "sorteo", peso: 10, titulo: "La revuelta",
    personaje: "Ministro del Interior",
    texto: "El paseo marítimo está lleno de gente que grita contra usted y de balsas hechas con neumáticos.",
    izq: { accion: "Bajaré con las tropas especiales", efectos: { ejercito: 6, pueblo: -6 } },
    der: { accion: "Abran la costa al que quiera irse", efectos: { pueblo: -5, potencias: 4, crisis: -3 } }
  },
  {
    id: "el_concierto", era: 4, tipo: "sorteo", peso: 10, titulo: "El concierto",
    personaje: "Ministra de Cultura",
    texto: "Una banda de rock extranjera pide tocar en el estadio. Hace treinta años sus discos eran delito.",
    izq: { accion: "Que toquen, que yo también tuve pelo", efectos: { pueblo: 5, elite: -3 } },
    der: { accion: "Que toque la orquesta del Ministerio", efectos: { elite: 3, pueblo: -5 } }
  },
  {
    id: "estatuas_caen", era: 4, tipo: "sorteo", peso: 10, titulo: "Las estatuas caen",
    personaje: "Ministro del Interior",
    texto: "En la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.",
    izq: { accion: "Corten la señal, que es mal ejemplo", efectos: { elite: 3, pueblo: -5, crisis: 1 } },
    der: { accion: "Que vigilen mis estatuas día y noche", efectos: { ejercito: 4, pueblo: -2 } }
  },
  {
    id: "la_sequia", era: 4, tipo: "sorteo", peso: 10, titulo: "La sequía",
    personaje: "Ministro de Trabajo",
    texto: "La sequía arruinó la cosecha. El campo pasa hambre y los almacenes del Ejército están llenos.",
    izq: { accion: "Que los soldados repartan el arroz", efectos: { pueblo: 6, ejercito: -6 } },
    der: { accion: "Ese grano es para defender la patria", efectos: { ejercito: 6, pueblo: -5 } }
  },
  {
    id: "los_turistas", era: 4, tipo: "sorteo", peso: 10, titulo: "Los turistas",
    personaje: "Ministro de Comercio",
    texto: "Hacen falta divisas. Podemos llenar las playas de turistas o dejar que los gusanos manden dólares.",
    izq: { accion: "Que los turistas gocen el socialismo", efectos: { potencias: 5, elite: 3, pueblo: -4 } },
    der: { accion: "Que los gusanos paguen la Revolución", efectos: { pueblo: 4, potencias: 3, elite: -4 } }
  },
  {
    id: "bomba_interior", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.atentado_investigado"] }, titulo: "Los cinco", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Hemos detenido a cinco agentes suyos infiltrados en nuestro país. Los juzgaremos como espías.",
    izq: { accion: "Volverán: eso se lo aseguro", efectos: { elite: 4, potencias: -4 } },
    der: { accion: "Hablemos de un canje discreto", efectos: { potencias: 4, elite: -2 } }
  },
  {
    id: "el_general_heroe", era: 4, tipo: "ancla", ventana: [1, 3], titulo: "El general héroe", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "El general más condecorado está preso por contrabando. Cuando declare, dirá quién lo autorizó.",
    izq: { accion: "Que asuma toda la culpa en directo", efectos: { ejercito: -6, elite: 3, pueblo: -2 } },
    der: { accion: "Finca con vistas y boquita cerrada", efectos: { ejercito: 5, elite: -2, crisis: 1 } }
  },
  {
    id: "el_parte_medico", era: 4, tipo: "ancla", ventana: [5, 8], titulo: "El parte médico",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Los médicos ordenan reposo absoluto. Alguien tiene que firmar los decretos mientras se recupera.",
    izq: { accion: "Firmaré los decretos desde la cama", efectos: { elite: -5, crisis: 2 } },
    der: { accion: "Que firme el Consejo de Ministros", efectos: { elite: 5 } }
  }
];

/* Ficha de cada portavoz: el reverso de la carta (al tocarla, se voltea). Nombre propio, cargo que se muestra e historia breve,
   escrita como un informe de la inteligencia del régimen que vigila a su propio gobierno (16 oct): el retrato
   y, aparte, la «Nota:» con la observación. Los expedientes irán evolucionando por etapas.
   16 oct: personajes por etapas. La clave es el cargo interno (une cada carta con su personaje y no cambia);
   «cargo» es el que se lee en la ficha. Por ahora, la etapa 1 (los cargos humildes de la sierra) vale para todas las eras. */
const FICHAS = {
  "Padrino Pupo": { nombre: "Padrino Pupo", cargo: "Babalawo oficial",
    historia: "Babalawo de barrio que lee el futuro en un collar de caracoles. Ve el mal de ojo en cualquier cara, sobre todo en las que pagan.",
    nota: "Es el único que llama «mijo» al Comandante." },
  "Papá Ernesto": { nombre: "Papá Ernesto", cargo: "Novelista",
    historia: "Novelista extranjero de fama mundial que adora las revoluciones, siempre que tengan buenos bares. Pesca agujas, con éxito variable.",
    nota: "Su hígado no es tan revolucionario." },
  "Vicepresidente del Consejo de Ministros": { nombre: "Anselmo Quiñones", cargo: "Vicepresidente",
    historia: "Vicepresidente del tirano. Se pasó a la Revolución el último día, con el uniforme recién comprado y la etiqueta colgando.",
    nota: "Sobrevive a todos los gobiernos. Este servicio estudia cómo." },
  "Ministro de Economía": { nombre: "Rigoberto Peña", cargo: "Ministro de Economía",
    historia: "Bodeguero que fió víveres a la columna y la siguió al monte para cobrar una deuda que sigue pendiente.",
    nota: "Sus cuentas no cuadran nunca y este servicio aún no ha averiguado si es por torpeza." },
  "Ministro de Comercio": { nombre: "Ernesto «Neto» Arrieta", cargo: "Ministro de Comercio",
    historia: "Contrabandista que subía armas a la columna en una lancha prestada y en el mismo viaje vendía ron al cuartel.",
    nota: "Se desconoce a quién pertenece hoy la lancha y a quién pertenece él." },
  "Ministra de Educación": { nombre: "Hortensia Lamadrid", cargo: "Ministra de Educación",
    historia: "Maestra rural de diecinueve años que enseñó a leer a la tropa y conoce de memoria la letra de cada guerrillero.",
    nota: "Corrige con regla todo lo que pasa por sus manos. Incluidos estos informes." },
  "Ministro de Trabajo": { nombre: "Eusebio Palmares", cargo: "Ministro de Trabajo",
    historia: "Cortador de caña y cabecilla de la huelga de la zafra. Arrastra a medio pueblo cada vez que habla.",
    nota: "Se recomienda vigilar su popularidad y anotar el destino de los plátanos que lleva en el morral." },
  "Ministra de Cultura": { nombre: "Mirta Albear", cargo: "Ministra de Cultura",
    historia: "Locutora de Radio Machete cuya voz escuchaba el país de noche y a escondidas.",
    nota: "Sostiene en público que la palabra libera, por lo que se aconseja revisar sus poemas antes de cada emisión." },
  "Ministro de las Fuerzas Armadas": { nombre: "Domingo", cargo: "Ministro de las Fuerzas Armadas",
    historia: "Hermano pequeño del Comandante. Fue el primero en llamar «camaradas» a la tropa, y el único que lo pronunciaba bien.",
    nota: "Se cuida el bigote con un esmero impropio de la sierra." },
  "Ministro del Interior": { nombre: "Octavio Sarria", cargo: "Ministro del Interior",
    historia: "Oficinista de banco que en la sierra interrogaba a los recién llegados y lleva una libreta con el nombre de cada compañero.",
    nota: "Este informe lo ha redactado él mismo." },
  "Embajador del bloque oriental": { nombre: "Pavel Strenko", cargo: "Embajador oriental",
    historia: "Enviado del bloque oriental para convertir una revolución en cliente. Ofrece petróleo y asesores. Todo se paga en azúcar y favores.",
    nota: "Este servicio ya ha perdido la cuenta de lo que debemos." },
  "Embajador de la potencia del norte": { nombre: "Harlan Pembrook", cargo: "Embajador occidental",
    historia: "Compañero de golf del tirano, se enteró de la Revolución en el hoyo nueve.",
    nota: "Sigue reservando el campo los domingos para cuando, según dice, vuelva la normalidad." }
};
/* 17 oct: el expediente del Comandante en la pantalla del nombre (detrás de su carta). Textos de Jorge. */
const FICHA_COMANDANTE = {
  sinNombre: "Nombre desconocido", cargo: "Jefe de la columna rebelde",
  historia: "Abogado sin clientes que subió al monte con 12 hombres y hoy baja con un país detrás. El tirano lo dio por muerto 3 veces.",
  nota: "Puede hablar durante horas sin mirar un papel."
};
const POR_ID = Object.fromEntries(CARTAS.map(c => [c.id, c]));

const FINALES = {   // 30 oct, Textos: versión de la era 1 (vale para todas hasta que haya una por era; docs/PENDIENTES.md)
  pueblo_0:     { titulo: "Re-Revolución", texto: "El Pueblo hizo lo que le enseñaste: subió al monte, esperó y bajó a por el tirano. El tirano eras tú." },
  pueblo_100:   { titulo: "Ingratitud",    texto: "Con tierras, fusiles y casa a mitad de precio, el Pueblo decidió que la Revolución podía seguir sin su Comandante." },
  ejercito_0:   { titulo: "Abducción",     texto: "El presupuesto militar no daba ni para vigilar tu dormitorio. Un comando extranjero te sacó de la cama, te afeitó y te llevó fuera del país." },
  ejercito_100: { titulo: "Junta militar", texto: "El Ejército ha tomado las riendas del país. A ti te dejaron la agradable tarea de recibir a las delegaciones de grupos folclóricos." },
  elite_0:      { titulo: "Unanimidad",    texto: "El Partido ha decidido que tu etapa al frente de la Revolución ha terminado. Todos han votado a favor, incluido tú." },
  elite_100:    { titulo: "Embajador",     texto: "El Partido te ha nombrado embajador en una remota república del bloque oriental. Allí el invierno dura once meses y hay más renos que habitantes." },
  potencias_0:  { titulo: "Invasión",      texto: "Te negaste a firmar alianzas con ninguna potencia. Cuando te invadieron, nadie se sintió obligado a ayudarte." },
  potencias_100:{ titulo: "Anexión",       texto: "Dependías tanto de tu aliado extranjero que acabó incorporando el país a su territorio. A ti te nombraron alcalde de un pueblo de 300 habitantes." }
};

const LINEAS_BARRA = {   // 16 oct: en tercera persona, como el informe de inteligencia donde salen
  pueblo:    { alto: "El Pueblo te aplaude, de momento.",                          bajo: "El Pueblo ha aprendido a no hacer demasiadas preguntas." },
  ejercito:  { alto: "El Ejército no te ha abandonado.",                           bajo: "El Ejército te obedece, pero cuenta los días." },
  elite:     { alto: "El Partido ha aprendido a beneficiarse de tu gobierno.",    bajo: "El Partido empieza a reunirse sin ti." },
  potencias: { alto: "Tienes aliados, y deudas con ellos.",                         bajo: "En el exterior nadie te quiere, salvo quien te teme." }
};

const FUTURO_ERA = {"base.campos_trabajo": 3, "base.modestia_aparente": 3, "base.criticos_detenidos": 3, "base.mercado_paralelo": 3, "base.desfile_militar": 3, "base.periodista_oficial": 3, "base.estudiantes_reprimidos": 3, "base.jefe_poderoso": 3, "base.sucesor_designado": 4, "base.oposicion_culpada": 4, "base.estado_policial": 4, "base.accidente_cienfuegos": 2, "base.mota_juzgado": 4, "base.alineado_bloque_oriental": 1, "base.negocio_refinerias": 1, "base.sindicato_libre": 1, "base.elecciones_aplazadas": 1, "base.embargo_en_marcha": 1, "base.critica_abierta": 3, "base.elecciones_prometidas": 3, "base.atentado_investigado": 4};   // era en la que llegan las consecuencias; el resto llega en la era 2
const FUTURO = {
  "base.juicios_publicos": "Las potencias endurecen su postura ante el régimen.",
  "base.exiliados_vocales": "Una oposición habla desde el extranjero.",
  "base.accidente_cienfuegos": "El Pueblo no olvida el accidente de Milfuegos.",
  "base.mota_juzgado": "Los nietos de Mota piden que los libros hablen de él.",
  "base.reforma_agraria": "Escasez de alimentos dos años después.",
  "base.censura_previa": "Aparecen el periodista oficial y los rumores.",
  "base.negocio_refinerias": "Las empresas exigen garantías que limitan tus decisiones económicas.",
  "base.nacionalizo_empresas": "Sanciones de la potencia del norte.",
  "base.elecciones_prometidas": "Elecciones controladas.",
  "base.elecciones_aplazadas": "Protestas estudiantiles.",
  "base.critica_abierta": "Depuración de críticos.",
  "base.campos_trabajo": "Intelectuales denuncian los campos de trabajo.",
  "base.viejos_oficiales": "Conspiración de oficiales retirados.",
  "base.purga_inicial": "El Ministro del Interior pide más poder.",
  "base.sindicato_libre": "Los sindicatos libres quieren elegir a sus dirigentes sin el Partido.",
  "base.huelga_reprimida": "Malestar en las universidades.",
  "base.comites_vigilancia": "Denuncias falsas entre vecinos.",
  "base.policia_tradicional": "La oposición se organiza con más facilidad.",
  "base.modestia_aparente": "El Partido exige otros símbolos de lealtad.",
  "base.exodo_elite": "Faltan técnicos y gestores.",
  "base.frontera_cerrada": "Intentos de fuga.",
  "base.alineado_bloque_oriental": "El aliado exige concesiones y armamento.",
  "base.no_alineado": "La potencia del norte se acerca y el aislamiento económico se agrava.",
  "base.embargo_en_marcha": "Embargo total.",
  "base.compensaciones": "Una deuda que alimenta una carta de crisis.",
  "base.criticos_detenidos": "Presos políticos que pesan en tus relaciones exteriores.",
  "base.deuda_externa": "El acreedor empieza a pedir favores.",
  "base.mercado_paralelo": "Una economía que escapa a tu control.",
  "base.desfile_militar": "El Ejército espera cada año un desfile mayor.",
  "base.misiles_instalados": "Una potencia vecina vigila tus misiles.",
  "base.misiles_rechazados": "El aliado recuerda tu negativa.",
  "base.periodista_oficial": "La prensa del régimen exige titulares cada vez más generosos.",
  "base.estudiantes_reprimidos": "La universidad se convierte en foco de oposición.",
  "base.jefe_poderoso": "El Ministro del Interior pide cada vez más poder.",
  "base.sucesor_designado": "El sucesor empieza a hacerse notar.",
  "base.oposicion_culpada": "La oposición recuerda al acusado injusto.",
  "base.mausoleo_construido": "La roca eterna espera a su inquilino.",
  "base.estado_policial": "El batallón del Interior pide más sueldos y más cárceles.",
  "base.atentado_investigado": "Tus agentes en el exilio corren peligro."
};
/* Lo que te espera, como lo cuenta el informe de inteligencia detrás de la carta del dictador al pasar de era (16 oct):
   sin mecánica del juego (nada de crisis ni umbrales), en el tono del informe. FUTURO se queda para los documentos. */
const PREVISION = {
  "base.juicios_publicos": "Las potencias extranjeras toman nota de los juicios públicos.",
  "base.exiliados_vocales": "Los exiliados hablan cada vez más alto desde fuera.",
  "base.accidente_cienfuegos": "El Pueblo no ha olvidado el accidente del Comandante Milfuegos.",
  "base.mota_juzgado": "La familia de Mota sigue contando su versión.",
  "base.reforma_agraria": "Las cosechas del reparto de tierras no llegarán a tiempo.",
  "base.censura_previa": "Circulan más rumores que periódicos.",
  "base.negocio_refinerias": "Las empresas extranjeras quieren garantías por escrito.",
  "base.nacionalizo_empresas": "La potencia del norte prepara sanciones.",
  "base.elecciones_prometidas": "El Pueblo recuerda que se le prometieron elecciones.",
  "base.elecciones_aplazadas": "Los estudiantes preguntan por las elecciones aplazadas.",
  "base.critica_abierta": "Hay críticos que se han acostumbrado a hablar.",
  "base.campos_trabajo": "En el extranjero ya se habla de los campos de trabajo.",
  "base.viejos_oficiales": "Los oficiales retirados se reúnen demasiado.",
  "base.purga_inicial": "El ministro del Interior se ha quedado con ganas de más.",
  "base.sindicato_libre": "El sindicato libre prepara nuevas huelgas.",
  "base.huelga_reprimida": "En las universidades no se olvida la huelga.",
  "base.comites_vigilancia": "Los vecinos se denuncian unos a otros.",
  "base.policia_tradicional": "La oposición se organiza sin demasiadas molestias.",
  "base.modestia_aparente": "El Partido echa de menos algún monumento.",
  "base.exodo_elite": "Faltan técnicos, ingenieros y gestores.",
  "base.frontera_cerrada": "Hay quien intenta cruzar la frontera de noche.",
  "base.alineado_bloque_oriental": "El aliado pasará la factura de su protección.",
  "base.no_alineado": "La potencia del norte se acerca y el comercio se seca.",
  "base.embargo_en_marcha": "El embargo amenaza con ser total.",
  "base.compensaciones": "Las compensaciones han dejado una deuda pendiente.",
  "base.criticos_detenidos": "Los presos políticos pesan en las relaciones exteriores.",
  "base.deuda_externa": "El acreedor empieza a pedir favores.",
  "base.mercado_paralelo": "El mercado negro crece más que la economía oficial.",
  "base.desfile_militar": "El Ejército espera un desfile mayor cada año.",
  "base.misiles_instalados": "Una potencia vecina vigila los misiles.",
  "base.misiles_rechazados": "El aliado no ha olvidado la negativa de los misiles.",
  "base.periodista_oficial": "La prensa oficial exige titulares cada vez más generosos.",
  "base.estudiantes_reprimidos": "La universidad se ha convertido en un foco de oposición.",
  "base.jefe_poderoso": "El ministro del Interior pide cada vez más poder.",
  "base.sucesor_designado": "El sucesor empieza a hacerse notar.",
  "base.oposicion_culpada": "La oposición recuerda al acusado injustamente.",
  "base.mausoleo_construido": "Tu roca eterna ya espera inquilino.",
  "base.estado_policial": "El batallón del Interior pide más sueldo y más cárceles.",
  "base.atentado_investigado": "Tus agentes en el exilio corren peligro."
};


/* =====================================================
   TUTORIAL (15 oct): «La víspera». Domingo, el hermano del Comandante (Ministro de las Fuerzas Armadas), acompaña al Comandante el día
   que entran en la capital. Cada carta enseña una sola cosa; las decisiones no cuentan para la partida.
   - paso: deslizar · girar (no se puede decidir hasta volver a girarla) · fuerzas (se encienden las barras)
           · pistas (puntos rojos de tres tamaños y el Ejército en peligro) · estado (entra «Luna de miel») · guardar · fin
   - arriba habla Domingo (29 oct: tutea al Comandante); la instrucción al jugador va en la cinta (de tú)
   ===================================================== */
const TUTORIAL = [   // 29 oct, Textos: Domingo tutea al Comandante (hermano pequeño, coqueto); cinta: la instrucción al jugador (de tú); *así* = negrita
  { paso: "deslizar", texto: "¡Ganamos, hermanito! Me he planchado el uniforme para la entrada triunfal. ¿Vamos ya?", cinta: "Desliza la carta", izq: "Entra detrás de mí", der: "Quítate esa colonia" },
  { paso: "girar", texto: "Inteligencia tiene un expediente de cada uno. Dame la vuelta, a ver qué dicen de mí.", girada: "Todo el mundo tiene el suyo. Si quieres saber de quién fiarte, gira la carta.", cinta: "Toca la carta", cintaGirada: "Tócala otra vez", izq: "Rojo desde la cuna", der: "Nada que ya no sepa" },
  { paso: "fuerzas", texto: "Arriba tienes las cuatro fuerzas. Si alguna se te queda corta o se te crece demasiado, te tumban.", cinta: "Toca los iconos", izq: "Las cuatro a dieta", der: "A mí solo me crece una" },
  // 29 oct: las dos respuestas suben al Pueblo, y por eso llega «Luna de miel» (la A más que la B)
  { paso: "pistas", texto: "Mira, el Ejército está en rojo, y el rojo no favorece a nadie. ¿Le das algo a mi tropa?", cinta: "Los puntos rojos indican cuánto afectará tu decisión a cada fuerza.", izq: "El Pueblo va primero", der: "Tu tropa puede esperar", efectos: { izq: { pueblo: 36, ejercito: -4 }, der: { pueblo: 20, ejercito: -2 } } },
  // Carta de estado: no hay personaje, así que arriba se habla al jugador.
  { paso: "estado", texto: "Algunas decisiones traen secuelas. Ahora el Pueblo te adora, y ya sabes: tanto cariño mató al niño." },
  // 25 oct: la primera recompensa. La decisión la da (sea cual sea la respuesta); luego hay que abrirla en el menú (`despues`)
  { paso: "logro", texto: "Ah, y en agradecimiento por darme un ministerio, te tengo un regalo. Cierra los ojos.", cinta: "Abre el regalo",
    despues: { texto: "¡Sorpresa! Es tu primera recompensa. Las demás tendrás que ganártelas con tus decisiones.", cinta: "Toca el menú" },
    izq: "Miedo me das", der: "Ábrelo tú, por si acaso" },
  { paso: "fin", texto: "La plaza está llena y espera tu discurso. Llévate la paloma y no te enroles, que hace calor.", cinta: "Ahora gobiernas tú", izq: "A ver qué se me ocurre", der: "Hablaré lo justo" }
];

/* 24 oct: COLECCIONABLES (prototipo). Cada uno es un objeto real de la Revolución, reimaginado, que se desbloquea con
   una decisión (la bandera) y se guarda entre partidas. Al conseguirlo solo se ve «¡Nuevo logro!»; en el archivo
   llega como un sobre cerrado y, al abrirlo, se descubre cuál es. Textos provisionales: los cierra la conversación
   de redacción en docs/COLECCIONABLES.md. */
/* 28 oct (traspaso de la conversación de coleccionables, docs/COLECCIONABLES.md): cada coleccionable es una carta completa. Campos:
   id, bandera, titulo, subtitulo, decision, descripcion, beneficio, perjuicio. Se desbloquea
   · con una bandera que pone la decisión (`bandera`), o
   · con una carta y la opción elegida (`carta` + `decision`, que es el texto de la opción): para las opciones que no ponen bandera, o
   · al acabar la era con una condición (`era` + `regla`, ver REGLAS_LOGRO en motor.js).
   `fondo`: color plano de la paleta de la carta por delante (mientras no haya ilustración). «Pendiente» = texto aún sin escribir. */
/* PRUEBAS (29 oct, Jorge): cambios en prueba. Ponlos en false para volver a lo anterior (el código viejo sigue ahí).
   · descripcionArriba: en las recompensas, la descripción va arriba, donde iba el subtítulo, y detrás solo quedan Beneficio y Perjuicio.
   (29 oct: la prueba «cuerpoLondrina» acabó: Londrina Light en mayúsculas se queda solo en las respuestas, ya sin interruptor.) */
const PRUEBAS = { descripcionArriba: true };
const LOGROS = [
  // 25 oct, Jorge: el logro del tutorial (paso «logro»); lo da la decisión del tutorial, no una bandera
  { id: "paloma", bandera: "tutorial.paloma", fondo: "azul", titulo: "Paloma amaestrada", subtitulo: "Tu primer milagro, cortesía de tu hermano.",
    decision: "Aceptar la paloma de tu hermano",
    descripcion: "Tu hermano pequeño la ha entrenado tres meses en el monte con paciencia y maíz. Cada vez que alces el brazo en un discurso, se posará en tu hombro y medio país verá en ti al elegido.",
    beneficio: "+100 de aura divina.", perjuicio: "Tu uniforme de gala nunca volverá a estar limpio." },

  // Recompensas de la era 1 (una decisión concreta)
  { id: "licencia", carta: "fin_pelota", fondo: "mostaza", titulo: "Licencia de electricista", subtitulo: "Tu mejor atleta ya tiene oficio",
    decision: "Se juega por amor",
    descripcion: "Tus deportistas de élite son ahora electricistas, carpinteros y fontaneros. Fichan en el taller por la mañana y entrenan por la tarde. Rezamos para que nadie les encargue una obra.",
    beneficio: "Usa esta licencia para inscribir a tus antiguos deportistas en competiciones universitarias y conseguir +20 medallas.",
    perjuicio: "Para competir, cada atleta debe presentar un justificante de ausencia firmado por su encargado." },
  { id: "libreta", carta: "embargo_total", fondo: "oliva", titulo: "Libreta de abastecimiento", subtitulo: "Todo el país come lo mismo",
    decision: "Una libreta por familia",
    descripcion: "Cada familia recibe una libreta con una casilla por producto y mes: arroz, café, cigarros y cuarenta artículos más que solo existen sobre el papel. El reparto es rigurosamente igualitario y el resultado, espectacular: todo el país luce abdominales de campeonato.",
    beneficio: "Añade a tu abuela fallecida a la libreta y sigue cobrando su libra de arroz.",
    perjuicio: "Si pierdes la libreta, tu familia deja de existir a efectos del almacén." },
  { id: "compota", carta: "la_bahia", fondo: "oliva", titulo: "Compota importada", subtitulo: "El postre favorito del Comandante",
    decision: "Cámbienlos por compotas",
    descripcion: "Compota extranjera de primera calidad, conseguida mediante una operación diplomática de alto nivel. La fruta es excelente, el envase es precioso y la etiqueta está en otro idioma. Disfrútala despacio: ya no quedan mercenarios para otro intercambio.",
    beneficio: "Entrega este tarro a un ministro para ganarte su favor.",
    perjuicio: "Quienes se quedan sin tarro recuerdan que todos son iguales ante la Revolución y preguntan dónde está su compota." },
  { id: "revolukola", carta: "refresco", fondo: "mostaza", titulo: "Botella de Revolukola", subtitulo: "Dulce, pegajosa y de producción nacional.",
    decision: "Improvisen una receta",
    descripcion: "Una bebida marrón que sabe a Revolución. La receta original se perdió durante la nacionalización; la versión oficial lleva azúcar, agua y lo que aparezca en el almacén. Ninguna botella sabe igual que la anterior.",
    beneficio: "Mezclada con ron, el país entero aguanta tus discursos.",
    perjuicio: "Cada vez que se fabrica Revolukola, el país se queda prácticamente sin azúcar." },
  { id: "pelota", carta: "beisbol", fondo: "oliva", titulo: "Pelota con autógrafo", subtitulo: "El partido más desigual de la historia.",
    decision: "A ver quién me batea",
    descripcion: "Pieza de colección. Firmada por el Comandante minutos antes de establecer el récord nacional: veintisiete ponches en dos entradas. «Batear bajo su responsabilidad».",
    beneficio: "Úsala contra tus enemigos o para poner a prueba a tus amigos. Si la batean, no eran tan amigos.",
    perjuicio: "No hay rival que te haga sudar la camiseta. Empiezas a preguntarte si no habrías sido una estrella del béisbol." },
  // solo con «Discreto como mi barba»: la otra opción también instala los misiles, pero no da la postal
  { id: "postal", carta: "nuevos_vecinos", fondo: "rojo", titulo: "Postal con misil", subtitulo: "Sol, arena y armamento nuclear.",
    decision: "Discreto como mi barba",
    descripcion: "Una estampa de la bahía con aguas cristalinas, sombrillas de colores y un misil nuclear que luce espléndido junto a la orilla. En el reverso, un espacio para escribir a la familia y otro para indicar las coordenadas.",
    beneficio: "Mándasela a una potencia extranjera para que se piense su próximo ultimátum. Que paguen ellos el envío.",
    perjuicio: "A veces la postal no causa efecto. Las potencias negocian a puerta cerrada y nadie se molesta en avisarte." },

  // Logros de la era 1 (cómo se acaba la era). 29 oct, Jorge: los logros no llevan beneficio ni perjuicio
  { id: "cuatro_casillas", era: 1, regla: "cuatro_casillas", fondo: "oliva", titulo: "El pack completo", subtitulo: "La autocrítica puede esperar.",
    decision: "Acabar la era con cuatro secuelas a la vez",
    descripcion: "No todo el mundo consigue meter a un país en tantos problemas. Hace falta constancia, dedicación y una gran capacidad para no aprender de los errores." },
  { id: "por_los_pelos", era: 1, regla: "por_los_pelos", fondo: "mostaza", titulo: "Por los pelos", subtitulo: "La estabilidad está sobrevalorada.",
    decision: "Acabar la era con dos o más fuerzas por debajo de 15 o por encima de 85",
    descripcion: "Terminaste una era con varios indicadores en zona crítica, pero seguiste al mando. El informe oficial certifica un sobrecumplimiento histórico de los objetivos previstos." },
  { id: "equilibrista", era: 1, regla: "equilibrista", fondo: "mostaza", titulo: "Tu mejor versión", subtitulo: "A la gente no le va tan mal.",
    decision: "Acabar la era con las cuatro fuerzas entre 40 y 60",
    descripcion: "Terminaste una era con las cuatro fuerzas equilibradas. El pueblo no pasa hambre, los militares conservan sus privilegios y el Partido sigue colocando a los suyos. Hasta tus críticos admiten que, comparado con las alternativas, tampoco se vive tan mal. Por ahora, todos te aguantan." },
  // 29 oct, Jorge: se da al llegar a la tercera carta de Papá Ernesto (`llegar`), que solo sale si aceptaste el torneo y el whisky. Textos provisionales: los redacta Coleccionables.
  { id: "ernesto", regla: "trama", llegar: "ernesto_higado", fondo: "mostaza", titulo: "La historia de Ernesto", subtitulo: "Pendiente",
    decision: "Completar la trama de Papá Ernesto",
    descripcion: "Pendiente: texto de Coleccionables." },
  { id: "buenos_modales", era: 1, regla: "buenos_modales", fondo: "azul", titulo: "Dictablanda", subtitulo: "El poder de ser amable.",
    decision: "Acabar la era sin Censura, Vigilancia ni Jaula",
    descripcion: "La gente sabe cómo te pones y prefiere no tentar a la suerte. Gobernaste toda una era sin recurrir a las medidas más duras. Pueden hablar, viajar y hasta quejarse de vez en cuando. Es que no te merecen." },

  // Carné del comité (era 2): carta `denuncias_falsas`. Texto a medias.
  { id: "chivaton", bandera: "base.denuncias_todas", fondo: "oliva", titulo: "Chivatón de barrio", subtitulo: "Ahora vigilas a tus vecinos. Y ellos, a ti.",
    decision: "Que se investigue hasta la gallina",
    descripcion: "El Sistema te felicita: has convertido cada cuadra en un puesto de observación. Tu carné incluye un ojo, una cinta con un lema y la obligación moral de mirar por la ventana.",   // texto provisional
    beneficio: "+1 vecino que te lo cuenta todo.", perjuicio: "Tú también eres vecino de alguien." }
];
/* Huecos del archivo: los logros que aún no existen se ven como siluetas, para que se note que es una colección */
const HUECOS_ARCHIVO = 6;
