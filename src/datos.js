/* =====================================================================================
   DATOS DEL JUEGO · fuente única de las cartas, las eras, los finales y las consecuencias futuras
   Aquí se editan los textos y los efectos. Los documentos de cartas (docs/) se generan desde este archivo:
   npm run docs. Los efectos se escriben en escala pequeña; el motor los multiplica (ver CLAUDE.md).
   ===================================================================================== */
/* =====================================================
   DATOS
   Efectos, pesos y ventanas son provisionales.
   Las banderas llevan el prefijo del mazo (base.).
   "ilustracion": null -> aquí irá la ruta de la imagen.
   "archivo": texto que se revela después de decidir.
   Los datos históricos están escritos de memoria y por verificar.
   ===================================================== */
const BARRAS = [
  { id: "pueblo",    nombre: "Pueblo" },
  { id: "ejercito",  nombre: "Ejército" },
  { id: "elite",     nombre: "Élite" },
  { id: "potencias", nombre: "Potencias" }
];
const ERAS = [
  { nombre: "Ascenso", min: 6, max: 8 },
  { nombre: "Consolidación", min: 6, max: 8, factor: 0.7 },
  { nombre: "Culto", min: 6, max: 8, factor: 0.75 }
];
const ERA = ERAS[0];
const UMBRAL_COALICION = 30;

const CARTAS = [
  /* ---------- Anclas ---------- */
  {
    id: "casa_vacia", tipo: "ancla", ventana: [1, 1], titulo: "La casa vacía", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, el palacio es nuestro. Los ministros del gobierno anterior esperan en el sótano. ¿Qué hacemos con ellos?",
    archivo: "En 1959, tras el triunfo de la revolución cubana, se celebraron juicios públicos contra antiguos miembros del gobierno y las fuerzas de seguridad, con ejecuciones que provocaron críticas en el exterior. Muchos cambios de régimen del siglo XX se enfrentaron a la misma disyuntiva entre juzgar y dejar partir.",
    izq: { accion: "Juicio público.", remate: "Ya está la sentencia, solo falta el juicio.", efectos: { pueblo: 8, elite: -7, potencias: -5 }, banderas: ["base.juicios_publicos"] },
    der: { accion: "Al exilio.", remate: "Prefiero que me critiquen desde muy lejos.", efectos: { pueblo: -8, elite: 7, potencias: 5 }, banderas: ["base.exiliados_vocales"] }
  },
  {
    id: "general_querido", tipo: "ancla", ventana: [1, 3], titulo: "El general querido", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, Varela es muy querido por la tropa y pide Defensa. En los cuarteles lo aplauden más a él que a usted.",
    archivo: "En Egipto, tras el derrocamiento de la monarquía en 1952, el general Muhammad Naguib, muy popular, presidió el nuevo régimen. En 1954 fue apartado del poder por Gamal Abdel Nasser, que acabó al frente del país.",
    izq: { accion: "Varela, ministro de Defensa.", remate: "Así lo tengo donde pueda verlo.", efectos: { ejercito: 9, elite: -4 }, banderas: ["base.general_popular"] },
    der: { accion: "Embajador.", remate: "Un héroe nacional queda mejor lejos de los cuarteles.", efectos: { ejercito: -9, elite: 4 }, banderas: ["base.general_apartado"] }
  },
  {
    id: "refinerias", tipo: "ancla", ventana: [3, 6], cond: { turnoMin: 3 }, titulo: "Las refinerías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las refinerías extranjeras se niegan a procesar el petróleo del bloque oriental. ¿Negociamos o las tomamos?",
    archivo: "En Cuba, en 1960, las refinerías de empresas estadounidenses y británicas se negaron a procesar crudo soviético y el gobierno las nacionalizó. En 1951, Irán nacionalizó la Anglo-Iranian Oil Company.",
    izq: { accion: "Negociamos.", remate: "La Revolución no está reñida con hacer negocios.", efectos: { potencias: 10, elite: 6, pueblo: -8 }, banderas: ["base.negocio_refinerias"] },
    der: { accion: "Nacionalizarlas.", remate: "La Patria pone el petróleo; la Patria pone las reglas.", efectos: { pueblo: 8, elite: -6, potencias: -10, crisis: 1 }, banderas: ["base.nacionalizo_empresas"],
           encolar: [{ carta: "embargo", min: 3, max: 8 }] }
  },
  {
    id: "visitante_oriental", tipo: "ancla", ventana: [4, 7], cond: { turnoMin: 4 }, titulo: "El visitante del bloque oriental", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Comandante, nuestro país le ofrece petróleo, créditos y asesores. A cambio, pedimos que se alinee con el bloque.",
    archivo: "En 1960 Cuba firmó acuerdos con la Unión Soviética para venderle azúcar y recibir petróleo. En 1955, Egipto anunció la compra de armas a Checoslovaquia tras ser rechazado por proveedores occidentales.",
    izq: { accion: "Aceptar el acuerdo.", remate: "La Revolución sabe reconocer a sus amigos cuando traen petróleo.", efectos: { potencias: 9, pueblo: 5, elite: -6, crisis: 2 }, banderas: ["base.alineado_bloque_oriental"] },
    der: { accion: "Declinar.", remate: "Prefiero que los aliados no sepan demasiado de nuestros asuntos.", efectos: { elite: 6, potencias: -9, pueblo: -5, crisis: 1 }, banderas: ["base.no_alineado"] }
  },

  /* ---------- Cola ---------- */
  {
    id: "embargo", tipo: "cola", titulo: "El embargo", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, nuestro país considera las nacionalizaciones un acto hostil y aplicaremos restricciones comerciales.",
    archivo: "Estados Unidos impuso restricciones comerciales a Cuba en 1960 y un embargo más amplio en 1962. En 1951, tras la nacionalización petrolera de Irán, el Reino Unido organizó un boicot al petróleo iraní, y en 1953 un golpe derrocó al primer ministro Mosaddeq.",
    izq: { accion: "Discurso de dignidad.", remate: "El Pueblo sabrá quién nos está haciendo pasar hambre.", efectos: { pueblo: 9, potencias: -9, elite: -5, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Ofrecer compensación.", remate: "Les pagaremos lo justo, pero no lo que ellos digan.", efectos: { potencias: 9, elite: 5, pueblo: -9, crisis: 2 }, banderas: ["base.compensaciones"] }
  },
  {
    id: "depuracion_criticos", tipo: "cola", borrador: true, titulo: "La lista", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, tenemos una lista de quienes más criticaron al gobierno. ¿Qué hacemos con ella?",
    archivo: null,
    izq: { accion: "Archivar la lista.", remate: "La Revolución tiene buena memoria.", efectos: { pueblo: 8, ejercito: -5, potencias: 5 } },
    der: { accion: "Detenerlos.", remate: "Que respondan por lo que dijeron; el Pueblo debe cuidarse.", efectos: { pueblo: -8, ejercito: 5, elite: 4, potencias: -5 }, banderas: ["base.criticos_detenidos"] }
  },

  /* ---------- Sorteo ---------- */
  {
    id: "tierra", tipo: "sorteo", peso: 12, titulo: "La tierra", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, proponemos repartir las grandes propiedades entre los campesinos. Los terratenientes no estarán contentos.",
    archivo: "La Ley de Reforma Agraria de Cuba (1959) y la del Perú bajo el gobierno militar de Velasco (1969) repartieron grandes propiedades. Ambas afectaron a intereses extranjeros y locales, y obligaron a replantear la producción agrícola.",
    izq: { accion: "Aplazar la reforma.", remate: "Primero necesito que estén contentos los que tienen dinero.", efectos: { pueblo: -10, elite: 8 } },
    der: { accion: "Repartir la tierra.", remate: "Una revolución también necesita buenas fotos.", efectos: { pueblo: 10, elite: -8, potencias: -4, crisis: 1 }, banderas: ["base.reforma_agraria"] }
  },
  {
    id: "periodicos", tipo: "sorteo", peso: 10, titulo: "Los periódicos", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, los periódicos cuestionan los decretos. ¿Les dejamos publicar o revisamos los textos antes de imprimirlos?",
    archivo: "La Ley de Prensa española de 1938 estableció la censura previa de publicaciones. Muchos regímenes del siglo XX combinaron el control de la prensa con la propaganda oficial.",
    izq: { accion: "Que publiquen.", remate: "Así sabré quiénes son antes de hacer la lista.", efectos: { pueblo: 6, potencias: 6, ejercito: -4 }, banderas: ["base.prensa_libre"] },
    der: { accion: "Que me lo enseñen antes.", remate: "No es censura; es enseñarles a escribir lo correcto.", efectos: { pueblo: -6, elite: 5, potencias: -5 }, banderas: ["base.censura_previa"] }
  },
  {
    id: "urnas", tipo: "sorteo", peso: 10, cond: { turnoMin: 2 }, titulo: "Las urnas prometidas", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, usted prometió elecciones. El Pueblo pregunta cuándo serán.",
    archivo: "Muchos regímenes surgidos de una revolución o un golpe prometieron elecciones y las pospusieron. En Cuba, tras 1959, las elecciones que se habían anunciado no llegaron a celebrarse en los años siguientes.",
    izq: { accion: "Elecciones en seis meses.", remate: "Para entonces el Pueblo estará preparado para elegir.", efectos: { pueblo: 9, potencias: 7, ejercito: -4, elite: -4 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "Aplazar las elecciones.", remate: "El Pueblo todavía no está preparado para esa responsabilidad.", efectos: { pueblo: -9, potencias: -7, ejercito: 4, elite: 4 }, banderas: ["base.elecciones_aplazadas"] }
  },
  {
    id: "mil_flores", tipo: "sorteo", peso: 6, cond: { sin: ["base.censura_previa"] }, titulo: "Las mil flores", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, proponemos abrir un período en que cualquiera pueda criticar al gobierno.",
    archivo: "En China, la Campaña de las Cien Flores (1956-1957) invitó a criticar al Partido. En 1957, la Campaña Antiderechista persiguió a muchos de quienes habían hablado.",
    izq: { accion: "Que critiquen.", remate: "Me interesa mucho saber quién empieza.", efectos: { pueblo: 8, elite: -4, ejercito: -4 }, banderas: ["base.critica_abierta"],
           encolar: [{ carta: "depuracion_criticos", min: 3, max: 3 }] },
    der: { accion: "No hace falta.", remate: "El Pueblo ya ha hablado.", efectos: { pueblo: -8, ejercito: 4, elite: 4 } }
  },
  {
    id: "oficiales", tipo: "sorteo", peso: 10, titulo: "Los oficiales de antes", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, siguen en los cuarteles oficiales del gobierno anterior. Todavía no han hecho nada.",
    archivo: "En la Unión Soviética, entre 1937 y 1938, la Gran Purga alcanzó al Ejército Rojo. Altos mandos como Tujachevski fueron juzgados y ejecutados, y buena parte del cuerpo de oficiales fue depurado.",
    izq: { accion: "Jubilarlos con pensión.", remate: "La Revolución no necesita oficiales que añoren otros tiempos.", efectos: { ejercito: 7, elite: 4, crisis: 1 }, banderas: ["base.viejos_oficiales"] },
    der: { accion: "Investigarlos uno a uno.", remate: "Investíguenlos. Algo encontraremos.", efectos: { ejercito: -7, potencias: -4 }, banderas: ["base.purga_inicial"] }
  },
  {
    id: "puerto", tipo: "sorteo", peso: 8, cond: { turnoMin: 3 }, titulo: "El puerto parado", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, los estibadores han parado. Piden mejores salarios y un sindicato independiente del gobierno.",
    archivo: "En Polonia, las huelgas de los astilleros de Gdansk en 1980 dieron origen a Solidaridad, el primer sindicato independiente del bloque oriental. En 1981 el gobierno declaró la ley marcial.",
    izq: { accion: "Reconocer el sindicato.", remate: "Que tengan sindicato, pero que sepan quién lo concedió.", efectos: { pueblo: 10, elite: -7, ejercito: -4, crisis: 1 }, banderas: ["base.sindicato_libre"] },
    der: { accion: "Mandar al ejército.", remate: "El trabajo no se detiene porque alguien esté descontento.", efectos: { pueblo: -10, elite: 7, ejercito: 4, potencias: -4 }, banderas: ["base.huelga_reprimida"] }
  },
  {
    id: "ojos_barrio", tipo: "sorteo", peso: 8, cond: { alguna: ["base.purga_inicial", "base.censura_previa"] }, titulo: "Los ojos del barrio", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, proponemos comités de vecinos que informen sobre actividades sospechosas en cada manzana.",
    archivo: "En la República Democrática Alemana, el Ministerio para la Seguridad del Estado (Stasi), creado en 1950, construyó una extensa red de informantes. En Cuba, los Comités de Defensa de la Revolución se crearon en 1960.",
    izq: { accion: "Comités de vigilancia.", remate: "La Revolución no puede estar en cada manzana, pero ellos sí.", efectos: { ejercito: 6, elite: 3, pueblo: -7 }, banderas: ["base.comites_vigilancia"] },
    der: { accion: "La policía de siempre.", remate: "Con la policía basta; ellos ya conocen al Pueblo.", efectos: { pueblo: 7, ejercito: -6, elite: -3 }, banderas: ["base.policia_tradicional"] }
  },
  {
    id: "retrato", tipo: "sorteo", peso: 6, cond: { turnoMin: 4 }, titulo: "El retrato", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, las escuelas piden un retrato suyo para cada aula y una estatua en la plaza principal.",
    archivo: "En Turkmenistán, en 2002, el presidente Saparmurat Niyazov rebautizó los meses del año, y dio a enero su propio título y a abril el nombre de su madre. Muchos regímenes del siglo XX levantaron monumentos y retratos de sus líderes.",
    izq: { accion: "Retratos y estatua.", remate: "Que sepan a quién agradecer que tengan una escuela.", efectos: { pueblo: 1, elite: 6, ejercito: 4, crisis: 1 }, banderas: ["base.culto_iniciado"] },
    der: { accion: "Nada de retratos.", remate: "Soy modesto. Con que aprendan mi nombre es suficiente.", efectos: { pueblo: -1, potencias: 2, elite: -6, ejercito: -4 }, banderas: ["base.modestia_aparente"] }
  },
  {
    id: "marchan", tipo: "sorteo", peso: 10, cond: { alguna: ["base.reforma_agraria", "base.nacionalizo_empresas"] }, titulo: "Los que se marchan", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, cada semana salen más familias ricas con sus fondos. ¿Las dejamos ir o cerramos la frontera?",
    archivo: "Entre 1949 y 1961, millones de personas abandonaron la República Democrática Alemana rumbo a Berlín Occidental y la República Federal. En agosto de 1961 se levantó el Muro de Berlín.",
    izq: { accion: "Que se vayan sin dinero.", remate: "Que se lleven los recuerdos; el dinero se queda con la Revolución.", efectos: { pueblo: 7, elite: -7, potencias: -4, crisis: -1 }, banderas: ["base.exodo_elite"] },
    der: { accion: "Cerrar la frontera.", remate: "Nadie abandona la Patria con su fortuna en el bolsillo.", efectos: { ejercito: 6, elite: 7, pueblo: -7, potencias: -8 }, banderas: ["base.frontera_cerrada"] }
  },

  /* ---------- Crisis (borrador) ---------- */
  {
    id: "crisis_factura", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 4, titulo: "La factura", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, hemos prometido más de lo que tenemos. Podemos subir precios o pedir un préstamo extranjero.",
    archivo: null,
    izq: { accion: "Subir los precios.", remate: "El Pueblo entenderá que la Revolución también tiene gastos.", efectos: { pueblo: -10, elite: 6, crisis: -3 } },
    der: { accion: "Pedir un préstamo.", remate: "El futuro puede pagar lo que hoy necesitamos.", efectos: { potencias: 8, elite: 4, crisis: -3 }, banderas: ["base.deuda_externa"] }
  },
  {
    id: "crisis_tiendas", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 8, titulo: "Las tiendas vacías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las tiendas están vacías. Podemos racionar lo que queda o tolerar un mercado paralelo.",
    archivo: null,
    izq: { accion: "Racionar lo que queda.", remate: "La escasez será justa; yo me encargo de eso.", efectos: { pueblo: -8, ejercito: 4, elite: -5, crisis: -3 } },
    der: { accion: "Tolerar el mercado paralelo.", remate: "Que exista, pero que nadie tenga que hablar de él.", efectos: { pueblo: 8, elite: 5, potencias: -4, crisis: -3 }, banderas: ["base.mercado_paralelo"] }
  },

  /* ---------- Coalición (borrador) ---------- */
  {
    id: "coalicion_calle_cuarteles", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.pueblo < UMBRAL_COALICION && e.barras.ejercito < UMBRAL_COALICION,
    titulo: "La calle y los cuarteles", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, manifestantes y oficiales han empezado a hablar entre ellos. Si se coordinan, no podremos detenerlos.",
    archivo: null,
    izq: { accion: "Ascender a los inquietos.", remate: "Dales un despacho y descubrirán las virtudes de la Revolución.", efectos: { ejercito: 12, elite: -6, crisis: 2 } },
    der: { accion: "Detener a los cabecillas.", remate: "Deténganlos antes de que descubran cuántos son.", efectos: { pueblo: -6, ejercito: 8, potencias: -6 } }
  },
  {
    id: "coalicion_dinero_sale", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.elite < UMBRAL_COALICION && e.barras.potencias < UMBRAL_COALICION,
    titulo: "El dinero se va", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, empresarios y diplomáticos coordinan la salida de capitales y un bloqueo comercial.",
    archivo: null,
    izq: { accion: "Concesiones a empresarios.", remate: "Un empresario tranquilo hace menos preguntas.", efectos: { elite: 9, pueblo: -8, crisis: 2 } },
    der: { accion: "Congelar sus cuentas.", remate: "El dinero puede ser privado; su salida no.", efectos: { potencias: -8, pueblo: 8, elite: -9 } }
  },

  /* ---------- Era 2 · Consolidación ---------- */
  {
    id: "aniversario", era: 2, tipo: "ancla", ventana: [1, 2], titulo: "El aniversario", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, se cumplen los primeros años de la Revolución. Proponemos un gran desfile militar con tanques.",
    archivo: "Desde los años veinte, los desfiles de la Plaza Roja de Moscú mostraban cada 1 de mayo y cada 7 de noviembre la fuerza militar del régimen soviético, con los dirigentes saludando desde lo alto del mausoleo de Lenin.",
    izq: { accion: "Gran desfile.", remate: "El Pueblo debe recordar quién derrocó a los tiranos.", efectos: { ejercito: 8, elite: 4, pueblo: -7, crisis: 1 }, banderas: ["base.desfile_militar"] },
    der: { accion: "Fiesta popular.", remate: "La Revolución también sabe celebrar.", efectos: { pueblo: 7, ejercito: -8, elite: -4 } }
  },

  {
    id: "nuevos_vecinos", era: 2, tipo: "ancla", ventana: [2, 4], cond: { requiere: ["base.alineado_bloque_oriental"] }, titulo: "Los nuevos vecinos", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Comandante, nuestro país propone instalar misiles de alcance medio en su territorio. Sería una garantía frente a la potencia del norte.",
    archivo: "En octubre de 1962 la Unión Soviética instaló misiles nucleares de alcance medio en Cuba, lo que provocó la crisis de los misiles. Terminó cuando Moscú aceptó retirarlos a cambio de que Estados Unidos no invadiera la isla y, en secreto, retirara sus misiles de Turquía.",
    izq: { accion: "Aceptar los misiles.", remate: "Nadie se mete con un país que puede borrar un barrio entero.", efectos: { ejercito: 8, potencias: 7, pueblo: -7, elite: -4, crisis: 2 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 2 }] },
    der: { accion: "Declinar.", remate: "La Patria no necesita armas con instrucciones ajenas.", efectos: { ejercito: -8, potencias: -7, pueblo: 7, elite: 4 }, banderas: ["base.misiles_rechazados"] }
  },

  {
    id: "ultimatum", era: 2, tipo: "cola", titulo: "El ultimátum", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, nuestro país exige la retirada inmediata de los misiles. De lo contrario, impondremos un bloqueo naval.",
    archivo: null,
    izq: { accion: "Mantener los misiles.", remate: "Si cedemos hoy, mañana nos pedirán el palacio.", efectos: { ejercito: 8, potencias: -9, pueblo: -4, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Retirarlos.", remate: "La Revolución también sabe cuándo hacer desaparecer una prueba.", efectos: { ejercito: -8, potencias: 9, pueblo: 4, crisis: -1 } }
  },

  {
    id: "mano_norte", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.no_alineado"] }, titulo: "La mano del norte", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, nuestro país le ofrece créditos y comercio, aunque no pertenezca a ningún bloque. Solo pedimos buenas maneras y auditorías.",
    archivo: "Tras romper con Stalin en 1948, la Yugoslavia de Tito, comunista y no alineada, recibió ayuda económica y militar de Estados Unidos, y en 1961 impulsó en Belgrado la primera cumbre del Movimiento de Países No Alineados.",
    izq: { accion: "Aceptar los créditos.", remate: "El dinero extranjero siempre llega con una bandera escondida.", efectos: { potencias: 8, elite: 5, pueblo: -5, crisis: 1 }, banderas: ["base.deuda_externa"] },
    der: { accion: "Seguir sin bloque.", remate: "La Revolución no necesita que nadie le enseñe a gobernar.", efectos: { potencias: -8, pueblo: 6, elite: -4 } }
  },

  {
    id: "potencias_enfadan", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.juicios_publicos"] }, titulo: "Las potencias se enfadan", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, nuestro país pide garantías para los acusados que aún esperan sentencia en los juicios públicos.",
    archivo: "Tras el golpe de 1967 en Grecia, la junta militar detuvo a miles de opositores. Varios países occidentales y el Consejo de Europa criticaron al régimen, y Grecia abandonó el Consejo en 1969 antes de ser expulsada.",
    izq: { accion: "Abogados de oficio.", remate: "Que tengan abogado; la sentencia ya tiene otro dueño.", efectos: { potencias: 7, pueblo: -6, elite: 3 } },
    der: { accion: "Asunto interno.", remate: "La Patria no acepta lecciones sobre sus enemigos.", efectos: { potencias: -7, ejercito: 5, elite: -3 } }
  },

  {
    id: "voz_exilio", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.exiliados_vocales"] }, titulo: "La voz del exilio", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, los exiliados emiten por radio y ya los escucha media capital. Dicen que el palacio tiene goteras.",
    archivo: "Radio Europa Libre emitió hacia Europa del Este desde 1950 y Radio Martí hacia Cuba desde 1985. Los gobiernos de ambos países interfirieron las señales, con resultados desiguales.",
    izq: { accion: "Interferir la emisora.", remate: "La mentira también necesita permiso para entrar en la Patria.", efectos: { pueblo: -6, ejercito: 4, elite: 3 } },
    der: { accion: "Contestar por radio.", remate: "Que hablen; el Pueblo sabrá quién defiende la Revolución.", efectos: { pueblo: 5, potencias: 4, elite: -3 } }
  },

  {
    id: "general_murmura", era: 2, tipo: "sorteo", peso: 18, cond: { requiere: ["base.general_popular"], barraMax: { ejercito: 40 } }, titulo: "El general murmura", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, Varela recibe oficiales en su casa. Dicen que habla de usted en pasado.",
    archivo: "En Egipto, el general Mohamed Naguib fue el primer presidente de la república en 1953. En 1954 fue apartado por Gamal Abdel Nasser y pasó casi dos décadas bajo arresto domiciliario.",
    izq: { accion: "Ascender a Varela.", remate: "Un ascenso para que se calle.", efectos: { ejercito: 9, elite: -4, crisis: 1 } },
    der: { accion: "Detener a Varela.", remate: "La Historia juzgará mis decisiones cuando nadie pueda discutirlas.", efectos: { ejercito: -9, pueblo: -5, potencias: -4 } }
  },

  {
    id: "hambre", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.reforma_agraria"] }, titulo: "El hambre", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, los campesinos tienen tierra, pero no semillas, tractores ni crédito. La cosecha ha caído a la mitad.",
    archivo: "En marzo de 1962 Cuba introdujo la libreta de abastecimiento para racionar alimentos y productos básicos, un sistema que se mantuvo durante décadas.",
    izq: { accion: "Racionar los alimentos.", remate: "El Pueblo tendrá lo necesario y aprenderá a agradecerlo.", efectos: { pueblo: -6, elite: 3, crisis: -1 } },
    der: { accion: "Importar comida.", remate: "No importa de dónde venga el pan si lo reparte la Revolución.", efectos: { pueblo: 6, potencias: 5, crisis: 2 } }
  },

  {
    id: "periodista_oficial", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.censura_previa"] }, titulo: "El periodista oficial", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, ya no circulan noticias, solo rumores. Propongo un periodista oficial que los desmienta cada mañana.",
    archivo: "En la Unión Soviética, Pravda («La Verdad») era el órgano oficial del Partido Comunista. Circulaba un chiste popular: «En Pravda no hay noticias y en Izvestia no hay verdad».",
    izq: { accion: "Periodista oficial.", remate: "Una sola voz evita muchas confusiones.", efectos: { pueblo: -5, elite: 5, ejercito: 3 }, banderas: ["base.periodista_oficial"] },
    der: { accion: "Dejar que corran.", remate: "Mientras escuchen lo que yo diga, pueden hablar.", efectos: { pueblo: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "garantias", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.negocio_refinerias"] }, titulo: "Las garantías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las empresas exigen garantías: no más nacionalizaciones y que sus beneficios salgan del país.",
    archivo: "En 1967, el régimen de Suharto en Indonesia aprobó una ley de inversión extranjera que garantizaba a las empresas que no serían nacionalizadas, para atraer capital tras años de inestabilidad.",
    izq: { accion: "Firmar las garantías.", remate: "La Revolución puede firmar cualquier cosa cuando lo necesita.", efectos: { potencias: 8, elite: 6, pueblo: -7, crisis: -1 } },
    der: { accion: "Negarse a firmar.", remate: "Ninguna empresa extranjera pondrá condiciones en nuestra Patria.", efectos: { potencias: -8, pueblo: 6, elite: -5, crisis: 1 } }
  },

  {
    id: "elecciones_controladas", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_prometidas"] }, titulo: "Elecciones controladas", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, las elecciones prometidas están a la vista. El Partido propone una lista única para evitar confusiones.",
    archivo: "En el referéndum de 2002 en Irak, el gobierno de Sadam Huseín anunció un 100 % de votos a favor, con una participación también del 100 %.",
    izq: { accion: "Lista única.", remate: "El Pueblo no necesita elegir entre nosotros.", efectos: { pueblo: -6, elite: 5, ejercito: 3 } },
    der: { accion: "Varias listas.", remate: "Que voten libremente. El resultado ya está claro.", efectos: { pueblo: 6, potencias: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "estudiantes_calle", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_aplazadas"] }, titulo: "Estudiantes en la calle", ilustracion: null,
    personaje: "Ministra de Educación",
    texto: "Comandante, los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.",
    archivo: "En noviembre de 1973, estudiantes ocuparon la Escuela Politécnica de Atenas contra la junta militar griega. El día 17 un tanque derribó la puerta y la protesta fue aplastada.",
    izq: { accion: "Hablar con delegados.", remate: "Primero quiero saber quiénes son los que saben escribir.", efectos: { pueblo: 7, ejercito: -5, elite: -2 } },
    der: { accion: "Desalojar la universidad.", remate: "La universidad es para estudiar, no para hacer política.", efectos: { pueblo: -8, ejercito: 6, potencias: -4 }, banderas: ["base.estudiantes_reprimidos"] }
  },

  {
    id: "club_ajedrez", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.viejos_oficiales"] }, titulo: "El club de ajedrez", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, los oficiales jubilados fundaron un club de ajedrez. Se reúnen en secreto y no juegan al ajedrez.",
    archivo: "En octubre de 1970, un grupo ligado al general retirado Roberto Viaux intentó secuestrar en Chile al jefe del Ejército, René Schneider, que murió días después. Buscaban impedir que el Congreso ratificara a Salvador Allende.",
    izq: { accion: "Disolver el club.", remate: "La Revolución no tiene paciencia para reuniones sin permiso.", efectos: { ejercito: -6, elite: 3, potencias: -3 } },
    der: { accion: "Ofrecerles cargos.", remate: "Que conspiren dentro del gobierno; allí puedo vigilarlos.", efectos: { ejercito: 6, elite: -3, crisis: 1 } }
  },

  {
    id: "jefe_poder", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.purga_inicial"] }, titulo: "El jefe pide más", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, solicito autorización para crear una unidad que investigue a la propia policía. Yo la dirigiría, por discreción.",
    archivo: "Lavrenti Beria dirigió la policía política soviética desde 1938. Tras la muerte de Stalin, en 1953, fue detenido por sus propios compañeros de dirección y ejecutado ese mismo año.",
    izq: { accion: "Autorizar la unidad.", remate: "Quien vigila a todos debe saber que también lo vigilan.", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.jefe_poderoso"] },
    der: { accion: "Denegar la unidad.", remate: "Un hombre con tanto poder nunca debe sentirse cómodo.", efectos: { ejercito: -8, pueblo: 4, elite: 5 } }
  },

  {
    id: "huelgas_crisis", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.sindicato_libre"], crisisMin: 2 }, titulo: "Huelga en el puerto", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, con la subida de precios el sindicato exige aumentos y amenaza con otra huelga en el puerto.",
    archivo: "En agosto de 1980, una huelga en los astilleros de Gdansk, tras una subida de precios de la carne, acabó con la creación de Solidaridad, el primer sindicato independiente del bloque soviético.",
    izq: { accion: "Subir los salarios.", remate: "El Pueblo puede soportar precios altos; lo que no puede es dudar.", efectos: { pueblo: 8, elite: -5, crisis: 2 } },
    der: { accion: "Prohibir la huelga.", remate: "La Patria no se puede parar porque alguien esté descontento.", efectos: { pueblo: -8, ejercito: 5, elite: 5 } }
  },

  {
    id: "universidades", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.huelga_reprimida"] }, titulo: "Panfletos en la universidad", ilustracion: null,
    personaje: "Ministra de Educación",
    texto: "Comandante, aparecen panfletos en la universidad. Los hijos de los estibadores aún no han olvidado el puerto.",
    archivo: "El 2 de octubre de 1968, el ejército y las fuerzas de seguridad dispararon contra una concentración de estudiantes en Tlatelolco, Ciudad de México, pocos días antes de los Juegos Olímpicos.",
    izq: { accion: "Becas para todos.", remate: "Una beca vale más que un panfleto.", efectos: { pueblo: 6, elite: -4, crisis: 1 } },
    der: { accion: "Expulsar a los cabecillas.", remate: "La universidad enseñará lo que la Revolución considere necesario.", efectos: { pueblo: -6, ejercito: 5, potencias: -3 } }
  },

  {
    id: "denuncias_falsas", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.comites_vigilancia", "base.purga_inicial", "base.criticos_detenidos"] }, titulo: "Denuncias falsas", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o una gallina.",
    archivo: "En la Unión Soviética de 1937 y 1938, muchas detenciones empezaron con denuncias de vecinos y compañeros de trabajo, a veces por rencillas personales.",
    izq: { accion: "Investigarlas todas.", remate: "Más vale investigar a cien inocentes que dejar escapar a un enemigo.", efectos: { ejercito: 6, pueblo: -7, elite: 2 } },
    der: { accion: "Castigar las falsas.", remate: "La Revolución necesita confidentes, no bromistas.", efectos: { pueblo: 7, ejercito: -5, elite: -2 } }
  },

  {
    id: "oposicion_firma", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.policia_tradicional", "base.exiliados_vocales", "base.critica_abierta"] }, titulo: "Una carta con firmas", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, intelectuales han firmado una carta pidiendo respetar los derechos que usted mismo prometió.",
    archivo: "En enero de 1977, un grupo de intelectuales checoslovacos publicó la Carta 77, que criticaba al gobierno por incumplir los derechos humanos que había firmado en los acuerdos de Helsinki.",
    izq: { accion: "Recibir a los firmantes.", remate: "Quiero conocer a los que creen que eso depende de mí.", efectos: { pueblo: 6, potencias: 5, ejercito: -5, elite: -3 } },
    der: { accion: "Prohibir la carta.", remate: "No permitiré que cuatro firmas aparenten dividir al Pueblo.", efectos: { pueblo: -6, ejercito: 5, potencias: -5, elite: 3 } }
  },

  {
    id: "faltan_tecnicos", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exodo_elite", "base.juicios_publicos", "base.nacionalizo_empresas"] }, titulo: "Faltan técnicos", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.",
    archivo: "Tras 1959 salieron de Cuba muchos profesionales con formación. Se suele citar que cerca de la mitad de los médicos abandonó el país en pocos años.",
    izq: { accion: "Contratar extranjeros.", remate: "La Revolución necesita profesionales, no importa el pasaporte.", efectos: { potencias: 6, elite: -4, crisis: 1, pueblo: 1 } },
    der: { accion: "Formar a los fieles.", remate: "Primero lealtad; el oficio se aprende después.", efectos: { elite: 5, pueblo: -1, ejercito: 2 } }
  },

  {
    id: "intentos_fuga", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.frontera_cerrada", "base.criticos_detenidos", "base.exiliados_vocales"] }, titulo: "Intentos de fuga", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, tres familias intentaron cruzar la frontera en una barca. Una era la de un viceministro.",
    archivo: "Entre 1961 y 1989, al menos 140 personas murieron en relación con el Muro de Berlín, la mayoría intentando cruzarlo.",
    izq: { accion: "Reforzar la frontera.", remate: "Quien abandona la Patria debe explicar por qué.", efectos: { ejercito: 6, potencias: -5, pueblo: -5 } },
    der: { accion: "Amnistía a quien vuelva.", remate: "Que vuelvan; aún tenemos preguntas para ellos.", efectos: { pueblo: 6, potencias: 4, ejercito: -6 } }
  },

  {
    id: "embargo_total", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.embargo_en_marcha", "base.nacionalizo_empresas"] }, titulo: "Embargo total", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, el embargo ya es total: no entran medicinas, repuestos ni, al parecer, nuestras quejas.",
    archivo: "En agosto de 1990, tras la invasión de Kuwait, el Consejo de Seguridad de la ONU impuso sanciones económicas casi totales a Irak. El país sufrió escasez y una fuerte inflación durante años.",
    izq: { accion: "Racionar la escasez.", remate: "El Pueblo tendrá exactamente lo que la Patria pueda darle.", efectos: { pueblo: -6, elite: -2, crisis: -1 } },
    der: { accion: "Contrabando oficial.", remate: "La soberanía también puede entrar por la puerta de atrás.", efectos: { pueblo: 6, elite: 2, potencias: -4, crisis: 1 } }
  },

  {
    id: "deuda_llama", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.compensaciones", "base.deuda_externa"] }, titulo: "La deuda llama", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, mañana vence el primer pago de las compensaciones. En caja hay menos de lo prometido.",
    archivo: "En los años setenta, Polonia se endeudó con bancos occidentales para modernizar su industria. En 1981 tuvo que suspender pagos y renegociar su deuda.",
    izq: { accion: "Pagar la cuota.", remate: "La Revolución cumple cuando le conviene.", efectos: { potencias: 6, elite: 3, pueblo: -7, crisis: -2 } },
    der: { accion: "Pedir prórroga.", remate: "La Historia puede esperar; los acreedores tendrán que aprender.", efectos: { potencias: -6, crisis: 3, elite: -3 } }
  },

  {
    id: "plan_quinquenal", era: 2, tipo: "sorteo", peso: 8, titulo: "El plan quinquenal", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, proponemos un plan quinquenal con metas para cada fábrica, granja y tienda.",
    archivo: "El primer plan quinquenal soviético empezó en 1928 y fijó metas de producción para la industria y la agricultura. Muchas cifras oficiales se cumplieron en los informes más que en las fábricas.",
    izq: { accion: "Plan quinquenal.", remate: "El éxito de la Revolución empieza por escribirlo.", efectos: { elite: 5, pueblo: -4, crisis: 2 } },
    der: { accion: "Dejar al mercado.", remate: "El mercado funciona mientras haga lo que se le dice.", efectos: { pueblo: 4, potencias: 4, elite: -4 } }
  },

  {
    id: "cosecha_record", era: 2, tipo: "sorteo", peso: 8, titulo: "La cosecha récord", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, la cosecha es récord, según los informes. Los almacenes, curiosamente, están vacíos.",
    archivo: "Durante el Gran Salto Adelante en China (1958-1962), muchos funcionarios locales informaron de cosechas infladas para complacer al Partido. El Estado requisó grano que luego faltó, y la hambruna causó millones de muertes.",
    izq: { accion: "Proclamar el récord.", remate: "El Pueblo no come estadísticas, pero escucha las noticias.", efectos: { pueblo: 5, elite: 3, crisis: 2 } },
    der: { accion: "Pedir cifras reales.", remate: "Quiero saber cuánto falta antes de decidir a quién culpar.", efectos: { pueblo: -4, elite: -4, crisis: -1 } }
  },

  {
    id: "el_espia", era: 2, tipo: "sorteo", peso: 8, titulo: "El diplomático curioso", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.",
    archivo: "El 10 de febrero de 1962, en el puente de Glienicke, entre Berlín y Potsdam, Estados Unidos y la Unión Soviética intercambiaron al piloto Francis Gary Powers por el espía soviético Rudolf Abel.",
    izq: { accion: "Expulsarlo.", remate: "Que visite otro país. Aquí ya ha visto demasiado.", efectos: { potencias: -5, ejercito: 5 } },
    der: { accion: "Intercambiarlo.", remate: "La Patria también puede negociar con sus enemigos.", efectos: { potencias: 5, ejercito: -5, elite: 2 } }
  },

  {
    id: "los_chistes", era: 2, tipo: "sorteo", peso: 8, titulo: "Los chistes", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, circula un chiste sobre usted por todas las oficinas. Al final, todos miran al techo.",
    archivo: "En la Unión Soviética de Stalin, contar chistes políticos podía castigarse como «agitación antisoviética», según el artículo 58 del código penal.",
    izq: { accion: "Tribunal del humor.", remate: "Quiero saber quién se ríe cuando cree que nadie lo escucha.", efectos: { pueblo: -6, ejercito: 4, elite: 2 } },
    der: { accion: "Contar uno mejor.", remate: "El mejor chiste sobre un dictador es el que todos aplauden.", efectos: { pueblo: 5, ejercito: -3, elite: -2 } }
  },
  /* ---------- Era 3 · Culto ---------- (tratamiento: «Excelencia»; límites: mensaje ≤150 caracteres, acción ≤5 palabras, remate ≤75) */
  {
    id: "el_monumento", era: 3, tipo: "ancla", ventana: [1, 3], cond: { requiere: ["base.culto_iniciado"] }, titulo: "El monumento", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, el Partido ha diseñado un monumento de cuarenta metros en su honor. Se verá desde todos los barrios y desde la costa.",
    archivo: "En 1998, en Asjabad, el presidente turcomano Saparmurat Niyazov inauguró el Arco de la Neutralidad, coronado por una estatua dorada de doce metros que giraba para mirar siempre al sol.",
    izq: { accion: "Monumento colosal.", remate: "Me conmueve que el Pueblo me vea como a un padre.", efectos: { elite: 7, pueblo: -6, crisis: 2 }, banderas: ["base.monumento_colosal"], encolar: [{ carta: "pedestal", min: 2, max: 3 }] },
    der: { accion: "Monumento modesto.", remate: "El Pueblo no necesita mármol para saber quién lo protege.", efectos: { elite: -7, pueblo: 6 }, banderas: ["base.monumento_modesto"] }
  },
  {
    id: "pedestal", era: 3, tipo: "cola", titulo: "El pedestal", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Excelencia, el pedestal costó el doble de lo previsto y el bronce llegó incompleto: la estatua tiene un solo brazo.",
    archivo: null,
    izq: { accion: "Terminar la estatua.", remate: "El Padre de la Patria no puede aparecer manco.", efectos: { elite: 5, pueblo: -6, crisis: 2 } },
    der: { accion: "Dejarla con un brazo.", remate: "Un gesto de humildad también educa al Pueblo.", efectos: { elite: -5, pueblo: 6, crisis: -1 } }
  },
  {
    id: "modestia_sospechosa", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.modestia_aparente"] }, titulo: "La modestia sospechosa", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, su rechazo a los retratos se ha interpretado como falsa humildad. El Partido propone una gran demostración de lealtad.",
    archivo: "En la China de 1966, el Pequeño Libro Rojo con citas de Mao Zedong se distribuyó en cientos de millones de ejemplares, y recitarlo y lucir sus chapas se volvió una prueba de lealtad casi obligatoria.",
    izq: { accion: "Aceptar la demostración.", remate: "No quiero contrariar al Pueblo en una muestra de cariño.", efectos: { elite: 6, ejercito: 3, pueblo: -5 } },
    der: { accion: "Insistir en la modestia.", remate: "La lealtad verdadera no necesita tantas ceremonias.", efectos: { elite: -6, ejercito: -3, pueblo: 5 } }
  },
  {
    id: "desfile_anual", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.desfile_militar"] }, titulo: "El desfile del año", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Excelencia, el Ejército espera un desfile mayor que el del año pasado: más tanques, más soldados y, por tradición, caballería.",
    archivo: "Hasta 1990, el 7 de noviembre se celebraba en la Plaza Roja de Moscú un desfile militar por el aniversario de la revolución rusa de 1917, con los dirigentes saludando desde el mausoleo de Lenin.",
    izq: { accion: "Desfile aún mayor.", remate: "El Pueblo debe ver que la Revolución sigue fuerte.", efectos: { ejercito: 8, elite: 3, pueblo: -7, crisis: 2 } },
    der: { accion: "El mismo desfile.", remate: "La fuerza de la Revolución no se mide en tanques.", efectos: { ejercito: -8, elite: -3, pueblo: 7 } }
  },
  {
    id: "satelites", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_instalados"] }, titulo: "Los satélites", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Excelencia, nuestros satélites siguen contando sus misiles y pedimos una inspección. Aceptarla evitaría un incidente mayor.",
    archivo: "Los vuelos de reconocimiento U-2 sobre Cuba, en octubre de 1962, fotografiaron los emplazamientos de misiles soviéticos. El 27 de octubre un U-2 fue derribado sobre la isla.",
    izq: { accion: "Permitir la inspección.", remate: "Que inspeccionen; para entonces ya habremos hecho el cambio.", efectos: { potencias: 8, ejercito: -7, elite: 2 } },
    der: { accion: "Negarse.", remate: "La soberanía no se inspecciona.", efectos: { potencias: -8, ejercito: 7, elite: -2, crisis: 1 } }
  },
  {
    id: "aliado_enfadado", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_rechazados"] }, titulo: "El aliado enfadado", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Excelencia, nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.",
    archivo: "En 1960, en plena ruptura chino-soviética, la Unión Soviética retiró a sus asesores técnicos de China y suspendió numerosos proyectos conjuntos.",
    izq: { accion: "Pedir disculpas.", remate: "Una amistad duradera también exige saber pedir perdón.", efectos: { potencias: 8, pueblo: -6, ejercito: -2 } },
    der: { accion: "Buscar otro proveedor.", remate: "El petróleo no tiene ideología, solo precio.", efectos: { potencias: -8, pueblo: 6, ejercito: 2, crisis: 1 } }
  },
  {
    id: "jefe_insaciable", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.jefe_poderoso"] }, titulo: "El jefe insaciable", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Excelencia, mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto que no figure en ningún presupuesto.",
    archivo: "Erich Mielke dirigió el Ministerio para la Seguridad del Estado de la República Democrática Alemana, la Stasi, de 1957 a 1989. En 1989 la organización contaba con unos noventa mil empleados.",
    izq: { accion: "Autorizar el batallón.", remate: "Quiero que tengan todo lo necesario para proteger la Revolución.", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.estado_policial"] },
    der: { accion: "Recortarle el presupuesto.", remate: "Que vigilen al Pueblo sin crear un gobierno dentro del Gobierno.", efectos: { ejercito: -8, elite: 5, pueblo: 4 } }
  },
  {
    id: "aulas_vacias", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.estudiantes_reprimidos", "base.huelga_reprimida"] }, titulo: "Las aulas vacías", ilustracion: null,
    personaje: "Ministra de Educación",
    texto: "Excelencia, la universidad sigue vacía y circulan apuntes clandestinos. Algunos profesores enseñan historia sin citarle a usted.",
    archivo: "En 1989, estudiantes ocuparon durante semanas la plaza de Tiananmén, en Pekín. Los días 3 y 4 de junio el ejército la despejó.",
    izq: { accion: "Exigir lealtad a profesores.", remate: "Las notas medirán tanto los conocimientos como la lealtad.", efectos: { elite: 5, ejercito: 3, pueblo: -6 } },
    der: { accion: "Reabrir las facultades.", remate: "La Revolución necesita aulas llenas, no héroes universitarios.", efectos: { pueblo: 6, elite: -5, ejercito: -3 } }
  },
  {
    id: "titulares", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.periodista_oficial"] }, titulo: "Los titulares", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Excelencia, el periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.",
    archivo: "En la Rumanía de Ceaușescu, el diario del Partido, Scînteia, dedicaba su portada casi a diario a los discursos y las visitas del dirigente.",
    izq: { accion: "Seis páginas diarias.", remate: "El Pueblo merece seis páginas diarias de buenas noticias.", efectos: { elite: 6, ejercito: 2, pueblo: -5 } },
    der: { accion: "Tres páginas bastan.", remate: "El Pueblo ya conoce mi obra; no hace falta repetirla tanto.", efectos: { elite: -6, ejercito: -2, pueblo: 5 } }
  },
  {
    id: "presos_agenda", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.criticos_detenidos"] }, titulo: "Los presos en la agenda", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Excelencia, una organización extranjera publica la lista de sus presos políticos. Nuestro país pide su liberación como gesto de buena voluntad.",
    archivo: "En 1975 se firmaron los Acuerdos de Helsinki, que incluían compromisos sobre derechos humanos. En 1977 Amnistía Internacional recibió el Premio Nobel de la Paz por su trabajo con los presos de conciencia.",
    izq: { accion: "Liberar a algunos.", remate: "Liberemos a los más ancianos para no gastar en entierros.", efectos: { potencias: 8, ejercito: -6, elite: -2 } },
    der: { accion: "Negar que existan.", remate: "En mi país no hay presos políticos, solo ciudadanos confundidos.", efectos: { potencias: -8, ejercito: 6, elite: 2 } }
  },
  {
    id: "acreedor_favores", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.deuda_externa"] }, titulo: "El acreedor pide favores", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Excelencia, el acreedor aplazará el pago a cambio de un favor: nuestro voto en los foros internacionales durante años.",
    archivo: "En 1982, México anunció que no podía pagar su deuda externa y abrió la crisis de la deuda latinoamericana. Los préstamos posteriores llegaron con condiciones de ajuste exigidas por el Fondo Monetario Internacional.",
    izq: { accion: "Vender nuestro voto.", remate: "La diplomacia también sirve para pagar deudas.", efectos: { potencias: 8, elite: 3, pueblo: -5, crisis: -2 } },
    der: { accion: "Pagar con lo que haya.", remate: "La Revolución honra sus deudas, aunque el Pueblo pague la cuenta.", efectos: { potencias: -8, elite: -3, pueblo: 5, crisis: 2 } }
  },
  {
    id: "mercado_mayor", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mercado_paralelo"] }, titulo: "El mercado mayor", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Excelencia, el mercado paralelo vende más que las tiendas del Estado. Algunos funcionarios ya cobran en especie y otros, en dólares.",
    archivo: "En la Unión Soviética de los años setenta y ochenta, una parte importante de los bienes y servicios circulaba por canales no oficiales, y la escasez alimentaba el mercado negro.",
    izq: { accion: "Legalizar el mercado.", remate: "Si el Pueblo compra allí, será mejor que tribute aquí.", efectos: { pueblo: 6, elite: -4, ejercito: -2, crisis: -1 } },
    der: { accion: "Perseguir a los vendedores.", remate: "La escasez también debe tener licencia.", efectos: { pueblo: -6, elite: 4, ejercito: 2, crisis: 1 } }
  },

  {
    id: "ciudad_con_nombre", era: 3, tipo: "sorteo", peso: 10, titulo: "La ciudad con su nombre", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, la capital merece un nombre a su altura. El Partido propone sustituir el actual por el suyo, con avenida incluida.",
    archivo: "En 1936, Santo Domingo, la capital de la República Dominicana, fue rebautizada como Ciudad Trujillo en honor del dictador Rafael Trujillo. Recuperó su nombre en 1961.",
    izq: { accion: "Rebautizar la capital.", remate: "Que el Pueblo pueda pronunciar mi nombre al pedir una dirección.", efectos: { elite: 6, pueblo: -5, ejercito: 2 }, banderas: ["base.capital_rebautizada"] },
    der: { accion: "Solo una avenida.", remate: "Una avenida recuerda a un hombre; una capital pertenece al Pueblo.", efectos: { elite: -6, pueblo: 5, ejercito: -2 } }
  },
  {
    id: "himno_nuevo", era: 3, tipo: "sorteo", peso: 10, titulo: "El himno nuevo", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Excelencia, el himno nacional no le menciona. Proponemos una versión con cuarenta estrofas, treinta sobre usted.",
    archivo: "El himno de la Unión Soviética adoptado en 1944 incluía versos de alabanza a Stalin. Tras su muerte se dejó sin letra, y en 1977 se estrenó una nueva letra sin su nombre.",
    izq: { accion: "Himno de cuarenta estrofas.", remate: "El Pueblo necesita tiempo para aprender a agradecer.", efectos: { elite: 5, ejercito: 3, pueblo: -6 } },
    der: { accion: "Solo el estribillo.", remate: "Mi nombre en el estribillo bastará para que nadie lo olvide.", efectos: { elite: -5, ejercito: -3, pueblo: 6 } }
  },
  {
    id: "libro_texto", era: 3, tipo: "sorteo", peso: 10, titulo: "El libro de texto", ilustracion: null,
    personaje: "Ministra de Educación",
    texto: "Excelencia, proponemos un libro con su vida y sus pensamientos, obligatorio en todas las escuelas y para obtener el carné de conducir.",
    archivo: "En Turkmenistán, el libro Ruhnama, firmado por el presidente Niyazov en 2001, fue lectura obligatoria en las escuelas y se examinaba también en las pruebas para obtener el carné de conducir.",
    izq: { accion: "Libro obligatorio.", remate: "Quien no lo apruebe no sabrá de qué le acusan.", efectos: { elite: 5, ejercito: 3, pueblo: -6 }, banderas: ["base.libro_obligatorio"] },
    der: { accion: "Libro opcional.", remate: "Si es bueno, se leerá; y si no, también.", efectos: { elite: -5, ejercito: -3, pueblo: 6 } }
  },
  {
    id: "cumpleanos", era: 3, tipo: "sorteo", peso: 10, titulo: "El cumpleaños nacional", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, el Partido propone declarar fiesta nacional el día de su cumpleaños, con desfile, discursos y un día libre para todos.",
    archivo: "El 21 de diciembre de 1949, el 70.º cumpleaños de Stalin se celebró en la Unión Soviética y en todo el bloque con actos, regalos y homenajes oficiales.",
    izq: { accion: "Fiesta nacional.", remate: "Un día al año para que el Pueblo celebre a quien lo protege.", efectos: { pueblo: 6, elite: 3, ejercito: -3, crisis: 2 } },
    der: { accion: "Cumpleaños privado.", remate: "Prefiero que el Pueblo celebre nuestras conquistas, no mi cumpleaños.", efectos: { pueblo: -6, elite: -3, ejercito: 3, crisis: -1 } }
  },
  {
    id: "biografia", era: 3, tipo: "sorteo", peso: 10, titulo: "La biografía oficial", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Excelencia, algunos historiadores dicen que usted no hizo la Revolución, sino que llegó al final. La biografía oficial está lista.",
    archivo: "En 1938 se publicó el Breve curso de historia del Partido Comunista de la URSS, un manual oficial en el que Stalin intervino personalmente y cuya lectura fue obligatoria durante años.",
    izq: { accion: "Reescribir la biografía.", remate: "La Historia la escriben los vencedores, y nosotros vencimos.", efectos: { elite: 5, pueblo: -5, ejercito: 2 } },
    der: { accion: "Dejarla como está.", remate: "La Historia sabrá poner cada nombre en su sitio.", efectos: { elite: -5, pueblo: 5, ejercito: -2 } }
  },
  {
    id: "mausoleo", era: 3, tipo: "sorteo", peso: 8, titulo: "El mausoleo", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, el Partido ruega prever un mausoleo para cuando le llegue la hora. Los embalsamadores ya están en nómina.",
    archivo: "Tras la muerte de Lenin, en 1924, su cuerpo fue embalsamado y expuesto en un mausoleo en la Plaza Roja de Moscú, donde permanece abierto al público.",
    izq: { accion: "Construir el mausoleo.", remate: "La Historia merece un lugar donde visitarme.", efectos: { elite: 5, pueblo: -5, crisis: 2 }, banderas: ["base.mausoleo_construido"] },
    der: { accion: "Sepultura sencilla.", remate: "No hace falta pensar en mi tumba mientras sigo dando órdenes.", efectos: { elite: -5, pueblo: 5, crisis: -1 } }
  },
  {
    id: "palacio_pueblo", era: 3, tipo: "sorteo", peso: 10, titulo: "El palacio del pueblo", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Excelencia, el nuevo palacio costará cinco años de presupuesto y exige derribar tres barrios enteros.",
    archivo: "En 1984 comenzó en Bucarest la construcción de la Casa del Pueblo, hoy Palacio del Parlamento, para lo cual se demolió una parte importante del centro histórico de la ciudad.",
    izq: { accion: "Derribar los barrios.", remate: "Una gran Revolución necesita un palacio a su altura.", efectos: { elite: 6, ejercito: 2, pueblo: -8, crisis: 3 }, banderas: ["base.palacio_del_pueblo"] },
    der: { accion: "Buscar otro solar.", remate: "El palacio puede esperar; los vecinos viven ahí.", efectos: { elite: -6, ejercito: -2, pueblo: 8, crisis: -1 } }
  },
  {
    id: "zafra_diez_millones", era: 3, tipo: "sorteo", peso: 10, titulo: "La zafra de los diez millones", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Excelencia, para batir el récord de la zafra proponemos movilizar durante tres meses a estudiantes, oficinistas y soldados.",
    archivo: "En 1970 Cuba se propuso una zafra de diez millones de toneladas de azúcar. Movilizó a media población y logró unos ocho millones y medio, la mayor de su historia, a costa de desorganizar el resto de la economía.",
    izq: { accion: "Todos a la zafra.", remate: "El que corta caña no conspira.", efectos: { pueblo: -6, ejercito: 3, elite: 3, crisis: -1 } },
    der: { accion: "Contratar jornaleros.", remate: "La Revolución también puede pagar a quien trabaja.", efectos: { pueblo: 6, ejercito: -3, elite: -3, crisis: 1 } }
  },
  {
    id: "sucesion", era: 3, tipo: "sorteo", peso: 8, titulo: "La sucesión", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Excelencia, el Partido pregunta quién le sucederá. Si no lo designa usted, algunos ministros empezarán a designarse solos.",
    archivo: "En octubre de 1980, el VI Congreso del Partido del Trabajo de Corea mostró en público a Kim Jong-il como sucesor de su padre, Kim Il-sung.",
    izq: { accion: "Designar sucesor.", remate: "El sucesor debe aprender a esperar; yo tuve que hacerlo.", efectos: { elite: 6, ejercito: -5, potencias: 2 }, banderas: ["base.sucesor_designado"] },
    der: { accion: "Sin sucesor.", remate: "Un líder eterno no necesita explicar quién viene después.", efectos: { elite: -6, ejercito: 5, potencias: -2 } }
  },
  {
    id: "beso_fraterno", era: 3, tipo: "sorteo", peso: 8, titulo: "El beso fraterno", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Excelencia, nuestro máximo dirigente desea un abrazo fraternal con usted ante las cámaras. Será una foto para la Historia.",
    archivo: "En octubre de 1979, durante el 30.º aniversario de la República Democrática Alemana, Leonid Brézhnev y Erich Honecker se besaron en la boca. La foto, de Régis Bossu, fue pintada en 1990 en el Muro de Berlín.",
    izq: { accion: "Abrazo y beso.", remate: "Que la Historia vea que la Revolución tiene amigos poderosos.", efectos: { potencias: 7, pueblo: -5, elite: -2 } },
    der: { accion: "Apretón de manos.", remate: "Una mano firme también puede estrecharse sin besar.", efectos: { potencias: -7, pueblo: 5, elite: 2 } }
  },
  {
    id: "viaje_oficial", era: 3, tipo: "sorteo", peso: 8, titulo: "El viaje oficial", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Excelencia, nuestro presidente le invita a una visita oficial de dos semanas, con cenas, desfiles y un acuerdo comercial preparado.",
    archivo: "En marzo de 1970, el príncipe Norodom Sihanouk, jefe del Estado de Camboya, fue depuesto por un golpe mientras viajaba por el extranjero.",
    izq: { accion: "Aceptar el viaje.", remate: "Dos semanas de aplausos extranjeros valen un par de riesgos.", efectos: { potencias: 8, elite: 3, ejercito: -7 } },
    der: { accion: "Quedarse en el país.", remate: "El Pueblo no puede pasar dos semanas sin escucharme.", efectos: { potencias: -8, elite: -3, ejercito: 7 } }
  },
  {
    id: "el_atentado", era: 3, tipo: "ancla", ventana: [5, 7], titulo: "El atentado", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Excelencia, una bomba ha estallado cerca del palacio, sin heridos. Podemos investigarla o culpar a la oposición.",
    archivo: "El asesinato de Serguéi Kírov, jefe del Partido en Leningrado, el 1 de diciembre de 1934, fue seguido de leyes de excepción y de detenciones masivas que abrieron paso a la Gran Purga.",
    izq: { accion: "Culpar a la oposición.", remate: "La Revolución no desperdicia una buena conspiración.", efectos: { ejercito: 8, pueblo: -6, potencias: -2 }, banderas: ["base.oposicion_culpada"], encolar: [{ carta: "la_investigacion", min: 1, max: 2 }] },
    der: { accion: "Investigar de verdad.", remate: "Una investigación honesta podría dejarnos sin culpables.", efectos: { ejercito: -8, pueblo: 6, potencias: 2 }, banderas: ["base.atentado_investigado"] }
  },
  {
    id: "la_investigacion", era: 3, tipo: "cola", titulo: "La investigación", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Excelencia, los detenidos por el atentado lo niegan. Dos tienen coartada y uno, incluso, certificado de defunción.",
    archivo: null,
    izq: { accion: "Mantener la acusación.", remate: "Los certificados de defunción también confiesan.", efectos: { ejercito: 6, pueblo: -5, potencias: -3 } },
    der: { accion: "Liberar a los acusados.", remate: "Liberarlos sería reconocer un error, y la Revolución no se equivoca.", efectos: { ejercito: -6, pueblo: 5, potencias: 3 } }
  }
];

const POR_ID = Object.fromEntries(CARTAS.map(c => [c.id, c]));
const ARCHIVABLES = CARTAS.filter(c => c.archivo);

const FINALES = {
  pueblo_0:     { titulo: "Revolución popular",               texto: "Las protestas se extienden por todo el país y ya no quedan fuerzas que las contengan. Tu gobierno cae." },
  pueblo_100:   { titulo: "Transición democrática",           texto: "Tu popularidad es tal que el pueblo exige elegir a quien gobierna. Esta vez no hay discurso que lo evite." },
  ejercito_0:   { titulo: "Golpe de Estado",                  texto: "Sin el respaldo de las armas, un grupo de oficiales te arresta durante la madrugada." },
  ejercito_100: { titulo: "Junta militar",                    texto: "Los militares controlan todo. Sigues en el palacio, pero ya no decides nada." },
  elite_0:      { titulo: "Conspiración y fuga de capitales", texto: "Los poderosos retiran su dinero y su apoyo, y financian a quien pueda sustituirte." },
  elite_100:    { titulo: "Figura decorativa",                texto: "El Partido y los grandes intereses gobiernan sin ti. Conservas el título y el retrato." },
  potencias_0:  { titulo: "Embargo e invasión",               texto: "Sin aliados ni comercio, el país queda solo frente a sus adversarios." },
  potencias_100:{ titulo: "Un protector que manda",           texto: "Tu aliado ya decide por ti. Un día te sustituye por alguien más dócil." }
};

const LINEAS_BARRA = {
  pueblo:    { alto: "El pueblo te aplaude, de momento.",                          bajo: "El pueblo aprendió a no hacer demasiadas preguntas." },
  ejercito:  { alto: "El ejército no te ha abandonado.",                           bajo: "El ejército te obedece, pero cuenta los días." },
  elite:     { alto: "Las élites aprendieron a beneficiarse de tu gobierno.",      bajo: "Las élites miran hacia la salida." },
  potencias: { alto: "Tienes aliados, y deudas con ellos.",                        bajo: "En el exterior nadie te quiere, salvo quien te teme." }
};

const FUTURO_ERA = {"base.culto_iniciado": 3, "base.modestia_aparente": 3, "base.prensa_libre": 4, "base.general_apartado": 4, "base.criticos_detenidos": 3, "base.deuda_externa": 3, "base.mercado_paralelo": 3, "base.desfile_militar": 3, "base.misiles_instalados": 3, "base.misiles_rechazados": 3, "base.periodista_oficial": 3, "base.estudiantes_reprimidos": 3, "base.jefe_poderoso": 3, "base.sucesor_designado": 4, "base.oposicion_culpada": 4, "base.mausoleo_construido": 4, "base.palacio_del_pueblo": 4, "base.estado_policial": 4};   // era en la que llegan las consecuencias; el resto llega en la era 2
const FUTURO = {
  "base.juicios_publicos": "Las potencias endurecen su postura ante el régimen.",
  "base.exiliados_vocales": "Una oposición habla desde el extranjero.",
  "base.general_popular": "Varela conspira si el Ejército baja de 35.",
  "base.general_apartado": "Varela regresa como candidato de los descontentos.",
  "base.reforma_agraria": "Escasez de alimentos dos años después.",
  "base.prensa_libre": "Un reportaje destapa un escándalo.",
  "base.censura_previa": "Aparecen el periodista oficial y los rumores.",
  "base.negocio_refinerias": "Las empresas exigen garantías que limitan tus decisiones económicas.",
  "base.nacionalizo_empresas": "Sanciones de la potencia del norte.",
  "base.elecciones_prometidas": "Elecciones controladas.",
  "base.elecciones_aplazadas": "Protestas estudiantiles.",
  "base.critica_abierta": "Depuración de críticos.",
  "base.viejos_oficiales": "Conspiración de oficiales retirados.",
  "base.purga_inicial": "El Ministro del Interior pide más poder.",
  "base.sindicato_libre": "Nuevas huelgas cuando la crisis sube.",
  "base.huelga_reprimida": "Malestar en las universidades.",
  "base.comites_vigilancia": "Denuncias falsas entre vecinos.",
  "base.policia_tradicional": "La oposición se organiza con más facilidad.",
  "base.culto_iniciado": "Tratamiento de Excelencia y monumentos cada vez más costosos.",
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
  "base.mausoleo_construido": "Un edificio eterno que hay que mantener.",
  "base.palacio_del_pueblo": "Las deudas del palacio siguen sin pagarse.",
  "base.estado_policial": "El batallón del Interior pide más sueldos y más cárceles."
};
