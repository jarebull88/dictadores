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
  { nombre: "Consolidación", min: 6, max: 8, factor: 0.7 }
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
    izq: { accion: "Juicio público.", remate: "La sentencia ya está escrita.", efectos: { pueblo: 8, elite: -7, potencias: -5 }, banderas: ["base.juicios_publicos"] },
    der: { accion: "Al exilio.", remate: "Que den discursos en otro país.", efectos: { pueblo: -8, elite: 7, potencias: 5 }, banderas: ["base.exiliados_vocales"] }
  },
  {
    id: "general_querido", tipo: "ancla", ventana: [1, 3], titulo: "El general querido", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, el general Varela es el más querido por la tropa y pide la cartera de Defensa. En los cuarteles lo aplauden más a él que a usted.",
    archivo: "En Egipto, tras el derrocamiento de la monarquía en 1952, el general Muhammad Naguib, muy popular, presidió el nuevo régimen. En 1954 fue apartado del poder por Gamal Abdel Nasser, que acabó al frente del país.",
    izq: { accion: "Varela, ministro de Defensa.", remate: "Mejor cerca que suelto.", efectos: { ejercito: 9, elite: -4 }, banderas: ["base.general_popular"] },
    der: { accion: "Embajador.", remate: "Que entienda el gran honor que es estar a 30.000 km.", efectos: { ejercito: -9, elite: 4 }, banderas: ["base.general_apartado"] }
  },
  {
    id: "refinerias", tipo: "ancla", ventana: [3, 6], cond: { turnoMin: 3 }, titulo: "Las refinerías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las refinerías extranjeras se niegan a procesar el petróleo que llega del bloque oriental. Podemos negociar con las empresas o tomarlas.",
    archivo: "En Cuba, en 1960, las refinerías de empresas estadounidenses y británicas se negaron a procesar crudo soviético y el gobierno las nacionalizó. En 1951, Irán nacionalizó la Anglo-Iranian Oil Company.",
    izq: { accion: "Negociamos.", remate: "Ellos firman. Yo recuerdo.", efectos: { potencias: 10, elite: 6, pueblo: -8 }, banderas: ["base.negocio_refinerias"] },
    der: { accion: "Nacionalizarlas.", remate: "Falta avisar a los ingenieros.", efectos: { pueblo: 8, elite: -6, potencias: -10, crisis: 1 }, banderas: ["base.nacionalizo_empresas"],
           encolar: [{ carta: "embargo", min: 3, max: 8 }] }
  },
  {
    id: "visitante_oriental", tipo: "ancla", ventana: [4, 7], cond: { turnoMin: 4 }, titulo: "El visitante del bloque oriental", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Comandante, mi gobierno ofrece petróleo, créditos y asesores. A cambio, pide que su país se alinee con el bloque en los foros internacionales.",
    archivo: "En 1960 Cuba firmó acuerdos con la Unión Soviética para venderle azúcar y recibir petróleo. En 1955, Egipto anunció la compra de armas a Checoslovaquia tras ser rechazado por proveedores occidentales.",
    izq: { accion: "Aceptar el acuerdo.", remate: "Amistad eterna. Factura por determinar.", efectos: { potencias: 9, pueblo: 5, elite: -6, crisis: 2 }, banderas: ["base.alineado_bloque_oriental"] },
    der: { accion: "Declinar.", remate: "Que se alineen ellos.", efectos: { elite: 6, potencias: -9, pueblo: -5, crisis: 1 }, banderas: ["base.no_alineado"] }
  },

  /* ---------- Cola ---------- */
  {
    id: "embargo", tipo: "cola", titulo: "El embargo", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, mi gobierno considera las nacionalizaciones un acto hostil y anuncia restricciones comerciales.",
    archivo: "Estados Unidos impuso restricciones comerciales a Cuba en 1960 y un embargo más amplio en 1962. En 1951, tras la nacionalización petrolera de Irán, el Reino Unido organizó un boicot al petróleo iraní, y en 1953 un golpe derrocó al primer ministro Mosaddeq.",
    izq: { accion: "Discurso de dignidad.", remate: "Sin importaciones, pero con dignidad.", efectos: { pueblo: 9, potencias: -9, elite: -5, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Ofrecer compensación.", remate: "Lo justo: lo que podamos.", efectos: { potencias: 9, elite: 5, pueblo: -9, crisis: 2 }, banderas: ["base.compensaciones"] }
  },
  {
    id: "depuracion_criticos", tipo: "cola", borrador: true, titulo: "La lista", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, tras el período de críticas tenemos una lista de quienes hablaron con más entusiasmo. ¿Qué hacemos con ella?",
    archivo: null,
    izq: { accion: "Archivar la lista.", remate: "Por ahora.", efectos: { pueblo: 8, ejercito: -5, potencias: 5 } },
    der: { accion: "Detenerlos.", remate: "Todos tienen derecho a opinar.", efectos: { pueblo: -8, ejercito: 5, elite: 4, potencias: -5 }, banderas: ["base.criticos_detenidos"] }
  },

  /* ---------- Sorteo ---------- */
  {
    id: "tierra", tipo: "sorteo", peso: 12, titulo: "La tierra", ilustracion: null,
    personaje: "Ministro de Agricultura",
    texto: "Comandante, proponemos repartir las grandes propiedades entre los campesinos. Los terratenientes no estarán contentos.",
    archivo: "La Ley de Reforma Agraria de Cuba (1959) y la del Perú bajo el gobierno militar de Velasco (1969) repartieron grandes propiedades. Ambas afectaron a intereses extranjeros y locales, y obligaron a replantear la producción agrícola.",
    izq: { accion: "Aplazar la reforma.", remate: "Como el ron, necesita reposo.", efectos: { pueblo: -10, elite: 8 } },
    der: { accion: "Repartir la tierra.", remate: "Y siete horas de discurso.", efectos: { pueblo: 10, elite: -8, potencias: -4, crisis: 1 }, banderas: ["base.reforma_agraria"] }
  },
  {
    id: "periodicos", tipo: "sorteo", peso: 10, titulo: "Los periódicos", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, los periódicos cuestionan los primeros decretos. Podemos permitirlo o revisar los textos antes de que se impriman.",
    archivo: "La Ley de Prensa española de 1938 estableció la censura previa de publicaciones. Muchos regímenes del siglo XX combinaron el control de la prensa con la propaganda oficial.",
    izq: { accion: "Que publiquen.", remate: "El termómetro, a distancia.", efectos: { pueblo: 6, potencias: 6, ejercito: -4 }, banderas: ["base.prensa_libre"] },
    der: { accion: "Que me lo enseñen antes.", remate: "Libertad de prensa, naturalmente. Armonía garantizada.", efectos: { pueblo: -6, elite: 5, potencias: -5 }, banderas: ["base.censura_previa"] }
  },
  {
    id: "urnas", tipo: "sorteo", peso: 10, cond: { turnoMin: 2 }, titulo: "Las urnas prometidas", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, al tomar el poder usted prometió elecciones. La gente pregunta cuándo serán.",
    archivo: "Muchos regímenes surgidos de una revolución o un golpe prometieron elecciones y las pospusieron. En Cuba, tras 1959, las elecciones que se habían anunciado no llegaron a celebrarse en los años siguientes.",
    izq: { accion: "Elecciones en seis meses.", remate: "Hay que prepararlas.", efectos: { pueblo: 9, potencias: 7, ejercito: -4, elite: -4 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "Aplazar las elecciones.", remate: "El pueblo aún no está listo.", efectos: { pueblo: -9, potencias: -7, ejercito: 4, elite: 4 }, banderas: ["base.elecciones_aplazadas"] }
  },
  {
    id: "mil_flores", tipo: "sorteo", peso: 6, cond: { sin: ["base.censura_previa"] }, titulo: "Las mil flores", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, proponemos abrir un período en el que cualquiera pueda criticar al gobierno. Así sabremos qué piensa realmente la gente.",
    archivo: "En China, la Campaña de las Cien Flores (1956-1957) invitó a criticar al Partido. En 1957, la Campaña Antiderechista persiguió a muchos de quienes habían hablado.",
    izq: { accion: "Que critiquen.", remate: "Tomaré nota de quién habla.", efectos: { pueblo: 8, elite: -4, ejercito: -4 }, banderas: ["base.critica_abierta"],
           encolar: [{ carta: "depuracion_criticos", min: 3, max: 3 }] },
    der: { accion: "No hace falta.", remate: "Ya sé lo que piensan.", efectos: { pueblo: -8, ejercito: 4, elite: 4 } }
  },
  {
    id: "oficiales", tipo: "sorteo", peso: 10, titulo: "Los oficiales de antes", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, en los cuarteles siguen oficiales que sirvieron al gobierno anterior. Todavía no han hecho nada.",
    archivo: "En la Unión Soviética, entre 1937 y 1938, la Gran Purga alcanzó al Ejército Rojo. Altos mandos como Tujachevski fueron juzgados y ejecutados, y buena parte del cuerpo de oficiales fue depurado.",
    izq: { accion: "Jubilarlos con pensión.", remate: "Que piensen lejos de la tropa.", efectos: { ejercito: 7, elite: 4, crisis: 1 }, banderas: ["base.viejos_oficiales"] },
    der: { accion: "Investigarlos uno a uno.", remate: "Si no hay pruebas, se buscan.", efectos: { ejercito: -7, potencias: -4 }, banderas: ["base.purga_inicial"] }
  },
  {
    id: "puerto", tipo: "sorteo", peso: 8, cond: { turnoMin: 3 }, titulo: "El puerto parado", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, los estibadores del puerto han parado. Piden mejores salarios y un sindicato que no dependa del gobierno.",
    archivo: "En Polonia, las huelgas de los astilleros de Gdansk en 1980 dieron origen a Solidaridad, el primer sindicato independiente del bloque oriental. En 1981 el gobierno declaró la ley marcial.",
    izq: { accion: "Reconocer el sindicato.", remate: "Mientras dure la madurez.", efectos: { pueblo: 10, elite: -7, ejercito: -4, crisis: 1 }, banderas: ["base.sindicato_libre"] },
    der: { accion: "Mandar al ejército.", remate: "Las peticiones, cuando termine el trabajo.", efectos: { pueblo: -10, elite: 7, ejercito: 4, potencias: -4 }, banderas: ["base.huelga_reprimida"] }
  },
  {
    id: "ojos_barrio", tipo: "sorteo", peso: 8, cond: { alguna: ["base.purga_inicial", "base.censura_previa"] }, titulo: "Los ojos del barrio", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, proponemos organizar comités de vecinos que informen sobre actividades sospechosas en cada manzana. Es barato y eficaz.",
    archivo: "En la República Democrática Alemana, el Ministerio para la Seguridad del Estado (Stasi), creado en 1950, construyó una extensa red de informantes. En Cuba, los Comités de Defensa de la Revolución se crearon en 1960.",
    izq: { accion: "Comités de vigilancia.", remate: "Miles de informes. Que alguien los lea.", efectos: { ejercito: 6, elite: 3, pueblo: -7 }, banderas: ["base.comites_vigilancia"] },
    der: { accion: "La policía de siempre.", remate: "Confiar sale barato.", efectos: { pueblo: 7, ejercito: -6, elite: -3 }, banderas: ["base.policia_tradicional"] }
  },
  {
    id: "retrato", tipo: "sorteo", peso: 6, cond: { turnoMin: 4 }, titulo: "El retrato", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, las escuelas piden un retrato suyo para cada aula. También se propone una estatua en la plaza principal.",
    archivo: "En Turkmenistán, en 2002, el presidente Saparmurat Niyazov rebautizó los meses del año, y dio a enero su propio título y a abril el nombre de su madre. Muchos regímenes del siglo XX levantaron monumentos y retratos de sus líderes.",
    izq: { accion: "Retratos y estatua.", remate: "La estatua, visible desde el palacio.", efectos: { pueblo: 1, elite: 6, ejercito: 4, crisis: 1 }, banderas: ["base.culto_iniciado"] },
    der: { accion: "Nada de retratos.", remate: "Soy modesto. Que se sepa.", efectos: { pueblo: -1, potencias: 2, elite: -6, ejercito: -4 }, banderas: ["base.modestia_aparente"] }
  },
  {
    id: "marchan", tipo: "sorteo", peso: 10, cond: { alguna: ["base.reforma_agraria", "base.nacionalizo_empresas"] }, titulo: "Los que se marchan", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, cada semana salen más familias adineradas del país con sus fondos. Podemos dejarlas ir o cerrar la frontera.",
    archivo: "Entre 1949 y 1961, millones de personas abandonaron la República Democrática Alemana rumbo a Berlín Occidental y la República Federal. En agosto de 1961 se levantó el Muro de Berlín.",
    izq: { accion: "Que se vayan sin dinero.", remate: "Solo los recuerdos.", efectos: { pueblo: 7, elite: -7, potencias: -4, crisis: -1 }, banderas: ["base.exodo_elite"] },
    der: { accion: "Cerrar la frontera.", remate: "Esto no es una estación. Es protección.", efectos: { ejercito: 6, elite: 7, pueblo: -7, potencias: -8 }, banderas: ["base.frontera_cerrada"] }
  },

  /* ---------- Crisis (borrador) ---------- */
  {
    id: "crisis_factura", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 4, titulo: "La factura", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, hemos prometido más de lo que tenemos. Podemos subir los precios o pedir un préstamo al extranjero.",
    archivo: null,
    izq: { accion: "Subir los precios.", remate: "Lo llamaremos patriótico.", efectos: { pueblo: -10, elite: 6, crisis: -3 } },
    der: { accion: "Pedir un préstamo.", remate: "Un regalo con calendario.", efectos: { potencias: 8, elite: 4, crisis: -3 }, banderas: ["base.deuda_externa"] }
  },
  {
    id: "crisis_tiendas", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 8, titulo: "Las tiendas vacías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las tiendas están vacías. Podemos racionar lo que queda o tolerar un mercado paralelo.",
    archivo: null,
    izq: { accion: "Racionar lo que queda.", remate: "La escasez, bien repartida.", efectos: { pueblo: -8, ejercito: 4, elite: -5, crisis: -3 } },
    der: { accion: "Tolerar el mercado paralelo.", remate: "Lo que no se ve, no existe.", efectos: { pueblo: 8, elite: 5, potencias: -4, crisis: -3 }, banderas: ["base.mercado_paralelo"] }
  },

  /* ---------- Coalición (borrador) ---------- */
  {
    id: "coalicion_calle_cuarteles", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.pueblo < UMBRAL_COALICION && e.barras.ejercito < UMBRAL_COALICION,
    titulo: "La calle y los cuarteles", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, los manifestantes y algunos oficiales han empezado a hablar entre ellos. Si se coordinan, no podremos detenerlos.",
    archivo: null,
    izq: { accion: "Ascender a los inquietos.", remate: "Un ascenso convence.", efectos: { ejercito: 12, elite: -6, crisis: 2 } },
    der: { accion: "Detener a los cabecillas.", remate: "Que se conozcan en la celda.", efectos: { pueblo: -6, ejercito: 8, potencias: -6 } }
  },
  {
    id: "coalicion_dinero_sale", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.elite < UMBRAL_COALICION && e.barras.potencias < UMBRAL_COALICION,
    titulo: "El dinero se va", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, empresarios y diplomáticos coordinan la salida de capitales y un bloqueo comercial.",
    archivo: null,
    izq: { accion: "Concesiones a empresarios.", remate: "Un privilegio compra lealtades.", efectos: { elite: 9, pueblo: -8, crisis: 2 } },
    der: { accion: "Congelar sus cuentas.", remate: "A salvo. En mis manos.", efectos: { potencias: -8, pueblo: 8, elite: -9 } }
  },

  /* ---------- Era 2 · Consolidación ---------- */
  {
    id: "aniversario", era: 2, tipo: "ancla", ventana: [1, 2], titulo: "El aniversario", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, se cumplen los primeros años de la revolución. Proponemos un gran desfile militar frente al palacio, con tanques.",
    archivo: "Desde los años veinte, los desfiles de la Plaza Roja de Moscú mostraban cada 1 de mayo y cada 7 de noviembre la fuerza militar del régimen soviético, con los dirigentes saludando desde lo alto del mausoleo de Lenin.",
    izq: { accion: "Gran desfile.", remate: "Los tanques desfilan; las tiendas, no.", efectos: { ejercito: 8, elite: 4, pueblo: -7, crisis: 1 }, banderas: ["base.desfile_militar"] },
    der: { accion: "Fiesta popular.", remate: "Música gratis y poco acero.", efectos: { pueblo: 7, ejercito: -8, elite: -4 } }
  },

  {
    id: "nuevos_vecinos", era: 2, tipo: "ancla", ventana: [2, 4], cond: { requiere: ["base.alineado_bloque_oriental"] }, titulo: "Los nuevos vecinos", ilustracion: null,
    personaje: "Embajador del bloque oriental",
    texto: "Comandante, mi gobierno propone instalar en su territorio misiles de alcance medio. Sería una garantía para su seguridad frente a la potencia del norte.",
    archivo: "En octubre de 1962 la Unión Soviética instaló misiles nucleares de alcance medio en Cuba, lo que provocó la crisis de los misiles. Terminó cuando Moscú aceptó retirarlos a cambio de que Estados Unidos no invadiera la isla y, en secreto, retirara sus misiles de Turquía.",
    izq: { accion: "Aceptar los misiles.", remate: "Protección con matrícula extranjera.", efectos: { ejercito: 8, potencias: 7, pueblo: -7, elite: -4, crisis: 2 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 2 }] },
    der: { accion: "Declinar.", remate: "El aliado se ofende; los vecinos, no.", efectos: { ejercito: -8, potencias: -7, pueblo: 7, elite: 4 }, banderas: ["base.misiles_rechazados"] }
  },

  {
    id: "ultimatum", era: 2, tipo: "cola", titulo: "El ultimátum", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, mi gobierno ha localizado instalaciones militares extranjeras en su territorio y exige su retirada inmediata, o habrá bloqueo naval.",
    archivo: null,
    izq: { accion: "Mantener los misiles.", remate: "Que bloqueen; ya comemos poco.", efectos: { ejercito: 8, potencias: -9, pueblo: -4, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Retirarlos.", remate: "A oscuras, sin foto y sin ruido.", efectos: { ejercito: -8, potencias: 9, pueblo: 4, crisis: -1 } }
  },

  {
    id: "mano_norte", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.no_alineado"] }, titulo: "La mano del norte", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, mi gobierno ofrece créditos y comercio a un país que no pertenece a ningún bloque. Solo pedimos buenas maneras y algunas auditorías.",
    archivo: "Tras romper con Stalin en 1948, la Yugoslavia de Tito, comunista y no alineada, recibió ayuda económica y militar de Estados Unidos, y en 1961 impulsó en Belgrado la primera cumbre del Movimiento de Países No Alineados.",
    izq: { accion: "Aceptar los créditos.", remate: "Cada préstamo trae su auditor.", efectos: { potencias: 8, elite: 5, pueblo: -5, crisis: 1 }, banderas: ["base.deuda_externa"] },
    der: { accion: "Seguir sin bloque.", remate: "El orgullo no cotiza, pero abriga.", efectos: { potencias: -8, pueblo: 6, elite: -4 } }
  },

  {
    id: "potencias_enfadan", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.juicios_publicos"] }, titulo: "Las potencias se enfadan", ilustracion: null,
    personaje: "Embajador de la potencia del norte",
    texto: "Comandante, mi gobierno ha seguido con preocupación los juicios públicos y pide garantías para los acusados que aún esperan sentencia.",
    archivo: "Tras el golpe de 1967 en Grecia, la junta militar detuvo a miles de opositores. Varios países occidentales y el Consejo de Europa criticaron al régimen, y Grecia abandonó el Consejo en 1969 antes de ser expulsada.",
    izq: { accion: "Abogados de oficio.", remate: "Del Partido, por supuesto.", efectos: { potencias: 7, pueblo: -6, elite: 3 } },
    der: { accion: "Asunto interno.", remate: "Cada país, con sus tribunales.", efectos: { potencias: -7, ejercito: 5, elite: -3 } }
  },

  {
    id: "voz_exilio", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.exiliados_vocales"] }, titulo: "La voz del exilio", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, los exiliados emiten por radio desde el extranjero y ya los escucha media capital. Dicen que el palacio tiene goteras.",
    archivo: "Radio Europa Libre emitió hacia Europa del Este desde 1950 y Radio Martí hacia Cuba desde 1985. Los gobiernos de ambos países interfirieron las señales, con resultados desiguales.",
    izq: { accion: "Interferir la emisora.", remate: "El silencio también es una emisora.", efectos: { pueblo: -6, ejercito: 4, elite: 3 } },
    der: { accion: "Contestar por radio.", remate: "Con mejores chistes y peores noticias.", efectos: { pueblo: 5, potencias: 4, elite: -3 } }
  },

  {
    id: "general_murmura", era: 2, tipo: "sorteo", peso: 18, cond: { requiere: ["base.general_popular"], barraMax: { ejercito: 40 } }, titulo: "El general murmura", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, el general Varela recibe oficiales en su casa. Dicen que habla de usted en pasado.",
    archivo: "En Egipto, el general Mohamed Naguib fue el primer presidente de la república en 1953. En 1954 fue apartado por Gamal Abdel Nasser y pasó casi dos décadas bajo arresto domiciliario.",
    izq: { accion: "Ascender a Varela.", remate: "Un ascenso para que se calle.", efectos: { ejercito: 9, elite: -4, crisis: 1 } },
    der: { accion: "Detener a Varela.", remate: "Por conspirar contra el futuro.", efectos: { ejercito: -9, pueblo: -5, potencias: -4 } }
  },

  {
    id: "hambre", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.reforma_agraria"] }, titulo: "El hambre", ilustracion: null,
    personaje: "Ministro de Agricultura",
    texto: "Comandante, los campesinos tienen tierra, pero no semillas, ni tractores, ni crédito. La cosecha ha caído a la mitad.",
    archivo: "En marzo de 1962 Cuba introdujo la libreta de abastecimiento para racionar alimentos y productos básicos, un sistema que se mantuvo durante décadas.",
    izq: { accion: "Racionar los alimentos.", remate: "La libreta, sin empujar, por favor.", efectos: { pueblo: -6, elite: 3, crisis: -1 } },
    der: { accion: "Importar comida.", remate: "Pan extranjero y hambre propia.", efectos: { pueblo: 6, potencias: 5, crisis: 2 } }
  },

  {
    id: "periodista_oficial", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.censura_previa"] }, titulo: "El periodista oficial", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, ya no circulan noticias, solo rumores. Propongo un periodista oficial que los desmienta cada mañana.",
    archivo: "En la Unión Soviética, Pravda («La Verdad») era el órgano oficial del Partido Comunista. Circulaba un chiste popular: «En Pravda no hay noticias y en Izvestia no hay verdad».",
    izq: { accion: "Periodista oficial.", remate: "Desmiente lo cierto y confirma lo útil.", efectos: { pueblo: -5, elite: 5, ejercito: 3 }, banderas: ["base.periodista_oficial"] },
    der: { accion: "Dejar que corran.", remate: "Los rumores también se cansan.", efectos: { pueblo: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "garantias", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.negocio_refinerias"] }, titulo: "Las garantías", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, las empresas con las que negociamos exigen garantías por escrito: no habrá más nacionalizaciones y sus beneficios saldrán del país.",
    archivo: "En 1967, el régimen de Suharto en Indonesia aprobó una ley de inversión extranjera que garantizaba a las empresas que no serían nacionalizadas, para atraer capital tras años de inestabilidad.",
    izq: { accion: "Firmar las garantías.", remate: "La palabra del Estado, en letra pequeña.", efectos: { potencias: 8, elite: 6, pueblo: -7, crisis: -1 } },
    der: { accion: "Negarse a firmar.", remate: "La soberanía no se hipoteca; se alquila.", efectos: { potencias: -8, pueblo: 6, elite: -5, crisis: 1 } }
  },

  {
    id: "elecciones_controladas", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_prometidas"] }, titulo: "Elecciones controladas", ilustracion: null,
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Comandante, las elecciones prometidas están a la vista. El Partido propone presentar una lista única, para evitar confusiones.",
    archivo: "En el referéndum de 2002 en Irak, el gobierno de Sadam Huseín anunció un 100 % de votos a favor, con una participación también del 100 %.",
    izq: { accion: "Lista única.", remate: "Pluralidad: ninguna; confusión: cero.", efectos: { pueblo: -6, elite: 5, ejercito: 3 } },
    der: { accion: "Varias listas.", remate: "Que ganemos, pero por poco.", efectos: { pueblo: 6, potencias: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "estudiantes_calle", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_aplazadas"] }, titulo: "Estudiantes en la calle", ilustracion: null,
    personaje: "Ministro de Educación",
    texto: "Comandante, los estudiantes han ocupado la universidad y exigen las elecciones que usted aplazó. Algunos traen pancartas con faltas de ortografía.",
    archivo: "En noviembre de 1973, estudiantes ocuparon la Escuela Politécnica de Atenas contra la junta militar griega. El día 17 un tanque derribó la puerta y la protesta fue aplastada.",
    izq: { accion: "Hablar con delegados.", remate: "Cada delegado, un expediente.", efectos: { pueblo: 7, ejercito: -5, elite: -2 } },
    der: { accion: "Desalojar la universidad.", remate: "Cerrada por reformas indefinidas.", efectos: { pueblo: -8, ejercito: 6, potencias: -4 }, banderas: ["base.estudiantes_reprimidos"] }
  },

  {
    id: "club_ajedrez", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.viejos_oficiales"] }, titulo: "El club de ajedrez", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Comandante, los oficiales jubilados han fundado un club de ajedrez. Se reúnen en secreto y, por lo visto, no juegan al ajedrez.",
    archivo: "En octubre de 1970, un grupo ligado al general retirado Roberto Viaux intentó secuestrar en Chile al jefe del Ejército, René Schneider, que murió días después. Buscaban impedir que el Congreso ratificara a Salvador Allende.",
    izq: { accion: "Disolver el club.", remate: "Las piezas, confiscadas por seguridad.", efectos: { ejercito: -6, elite: 3, potencias: -3 } },
    der: { accion: "Ofrecerles cargos.", remate: "Un jubilado con sueldo no conspira; cobra.", efectos: { ejercito: 6, elite: -3, crisis: 1 } }
  },

  {
    id: "jefe_poder", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.purga_inicial"] }, titulo: "El jefe pide más", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, solicito autorización para crear una unidad especial que investigue a la propia policía. Yo la dirigiría, por discreción.",
    archivo: "Lavrenti Beria dirigió la policía política soviética desde 1938. Tras la muerte de Stalin, en 1953, fue detenido por sus propios compañeros de dirección y ejecutado ese mismo año.",
    izq: { accion: "Autorizar la unidad.", remate: "¿Quién vigila al que vigila? Yo.", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.jefe_poderoso"] },
    der: { accion: "Denegar la unidad.", remate: "Un hombre con tantos archivos, mejor visible.", efectos: { ejercito: -8, pueblo: 4, elite: 5 } }
  },

  {
    id: "huelgas_crisis", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.sindicato_libre"], crisisMin: 2 }, titulo: "Huelga en el puerto", ilustracion: null,
    personaje: "Ministro de Trabajo",
    texto: "Comandante, con la subida de precios el sindicato exige aumentos de salario y amenaza con otra huelga en el puerto.",
    archivo: "En agosto de 1980, una huelga en los astilleros de Gdansk, tras una subida de precios de la carne, acabó con la creación de Solidaridad, el primer sindicato independiente del bloque soviético.",
    izq: { accion: "Subir los salarios.", remate: "Billetes nuevos para precios viejos.", efectos: { pueblo: 8, elite: -5, crisis: 2 } },
    der: { accion: "Prohibir la huelga.", remate: "El derecho de huelga, en huelga.", efectos: { pueblo: -8, ejercito: 5, elite: 5 } }
  },

  {
    id: "universidades", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.huelga_reprimida"] }, titulo: "Panfletos en la universidad", ilustracion: null,
    personaje: "Ministro de Educación",
    texto: "Comandante, los hijos de los estibadores ya estudian, y no han olvidado el puerto. Aparecen panfletos en la universidad.",
    archivo: "El 2 de octubre de 1968, el ejército y las fuerzas de seguridad dispararon contra una concentración de estudiantes en Tlatelolco, Ciudad de México, pocos días antes de los Juegos Olímpicos.",
    izq: { accion: "Becas para todos.", remate: "Una beca vale más que un panfleto.", efectos: { pueblo: 6, elite: -4, crisis: 1 } },
    der: { accion: "Expulsar a los cabecillas.", remate: "Aprenderán fuera del aula.", efectos: { pueblo: -6, ejercito: 5, potencias: -3 } }
  },

  {
    id: "denuncias_falsas", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.comites_vigilancia", "base.purga_inicial", "base.criticos_detenidos"] }, titulo: "Denuncias falsas", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o por una gallina.",
    archivo: "En la Unión Soviética de 1937 y 1938, muchas detenciones empezaron con denuncias de vecinos y compañeros de trabajo, a veces por rencillas personales.",
    izq: { accion: "Investigarlas todas.", remate: "Quien denuncia tiene razón, hasta que lo denuncian.", efectos: { ejercito: 6, pueblo: -7, elite: 2 } },
    der: { accion: "Castigar las falsas.", remate: "Denunciar, sí. Mentir, no.", efectos: { pueblo: 7, ejercito: -5, elite: -2 } }
  },

  {
    id: "oposicion_firma", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.policia_tradicional", "base.exiliados_vocales", "base.critica_abierta"] }, titulo: "Una carta con firmas", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, un grupo de intelectuales ha firmado una carta que pide respetar los derechos que usted mismo prometió.",
    archivo: "En enero de 1977, un grupo de intelectuales checoslovacos publicó la Carta 77, que criticaba al gobierno por incumplir los derechos humanos que había firmado en los acuerdos de Helsinki.",
    izq: { accion: "Recibir a los firmantes.", remate: "Con café y un fotógrafo de la policía.", efectos: { pueblo: 6, potencias: 5, ejercito: -5, elite: -3 } },
    der: { accion: "Prohibir la carta.", remate: "No se puede firmar lo que no existe.", efectos: { pueblo: -6, ejercito: 5, potencias: -5, elite: 3 } }
  },

  {
    id: "faltan_tecnicos", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exodo_elite", "base.juicios_publicos", "base.nacionalizo_empresas"] }, titulo: "Faltan técnicos", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, se han ido los ingenieros, los médicos y los contables. Las fábricas funcionan por pura voluntad.",
    archivo: "Tras 1959 salieron de Cuba muchos profesionales con formación. Se suele citar que cerca de la mitad de los médicos abandonó el país en pocos años.",
    izq: { accion: "Contratar extranjeros.", remate: "Los técnicos llegan; los sueldos, también.", efectos: { potencias: 6, elite: -4, crisis: 1, pueblo: 1 } },
    der: { accion: "Formar a los fieles.", remate: "Un carnet del Partido vale por un título.", efectos: { elite: 5, pueblo: -1, ejercito: 2 } }
  },

  {
    id: "intentos_fuga", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.frontera_cerrada", "base.criticos_detenidos", "base.exiliados_vocales"] }, titulo: "Intentos de fuga", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, anoche tres familias intentaron cruzar la frontera en una barca de pesca. Una era la de un viceministro.",
    archivo: "Entre 1961 y 1989, al menos 140 personas murieron en relación con el Muro de Berlín, la mayoría intentando cruzarlo.",
    izq: { accion: "Reforzar la frontera.", remate: "Más vallas y menos preguntas.", efectos: { ejercito: 6, potencias: -5, pueblo: -5 } },
    der: { accion: "Amnistía a quien vuelva.", remate: "Con asuntos pendientes, claro.", efectos: { pueblo: 6, potencias: 4, ejercito: -6 } }
  },

  {
    id: "embargo_total", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.embargo_en_marcha", "base.nacionalizo_empresas"] }, titulo: "Embargo total", ilustracion: null,
    personaje: "Ministro de Comercio",
    texto: "Comandante, el embargo ya es total: no entran medicinas, repuestos ni, al parecer, nuestras quejas.",
    archivo: "En agosto de 1990, tras la invasión de Kuwait, el Consejo de Seguridad de la ONU impuso sanciones económicas casi totales a Irak. El país sufrió escasez y una fuerte inflación durante años.",
    izq: { accion: "Racionar la escasez.", remate: "Todos iguales: igualmente sin nada.", efectos: { pueblo: -6, elite: -2, crisis: -1 } },
    der: { accion: "Contrabando oficial.", remate: "Ministerio de Importaciones Imaginarias.", efectos: { pueblo: 6, elite: 2, potencias: -4, crisis: 1 } }
  },

  {
    id: "deuda_llama", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.compensaciones", "base.deuda_externa"] }, titulo: "La deuda llama", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, el primer pago de las compensaciones vence mañana. En caja hay menos de lo prometido y más de lo confesado.",
    archivo: "En los años setenta, Polonia se endeudó con bancos occidentales para modernizar su industria. En 1981 tuvo que suspender pagos y renegociar su deuda.",
    izq: { accion: "Pagar la cuota.", remate: "Con el dinero del pan.", efectos: { potencias: 6, elite: 3, pueblo: -7, crisis: -2 } },
    der: { accion: "Pedir prórroga.", remate: "Mañana pagamos; siempre es mañana.", efectos: { potencias: -6, crisis: 3, elite: -3 } }
  },

  {
    id: "plan_quinquenal", era: 2, tipo: "sorteo", peso: 8, titulo: "El plan quinquenal", ilustracion: null,
    personaje: "Ministro de Economía",
    texto: "Comandante, proponemos un plan quinquenal: metas de producción para cada fábrica, cada granja y cada tienda.",
    archivo: "El primer plan quinquenal soviético empezó en 1928 y fijó metas de producción para la industria y la agricultura. Muchas cifras oficiales se cumplieron en los informes más que en las fábricas.",
    izq: { accion: "Plan quinquenal.", remate: "Las metas se cumplen en el papel.", efectos: { elite: 5, pueblo: -4, crisis: 2 } },
    der: { accion: "Dejar al mercado.", remate: "Decide lo que nosotros permitimos.", efectos: { pueblo: 4, potencias: 4, elite: -4 } }
  },

  {
    id: "cosecha_record", era: 2, tipo: "sorteo", peso: 8, titulo: "La cosecha récord", ilustracion: null,
    personaje: "Ministro de Agricultura",
    texto: "Comandante, la cosecha de este año es récord, según los informes. Los almacenes, curiosamente, están vacíos.",
    archivo: "Durante el Gran Salto Adelante en China (1958-1962), muchos funcionarios locales informaron de cosechas infladas para complacer al Partido. El Estado requisó grano que luego faltó, y la hambruna causó millones de muertes.",
    izq: { accion: "Proclamar el récord.", remate: "Las estadísticas nunca pasan hambre.", efectos: { pueblo: 5, elite: 3, crisis: 2 } },
    der: { accion: "Pedir cifras reales.", remate: "Y un ministro menos, quizá.", efectos: { pueblo: -4, elite: -4, crisis: -1 } }
  },

  {
    id: "el_espia", era: 2, tipo: "sorteo", peso: 8, titulo: "El diplomático curioso", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "Comandante, hemos detenido a un diplomático extranjero con un mapa detallado de los cuarteles. Dice que es turista.",
    archivo: "El 10 de febrero de 1962, en el puente de Glienicke, entre Berlín y Potsdam, Estados Unidos y la Unión Soviética intercambiaron al piloto Francis Gary Powers por el espía soviético Rudolf Abel.",
    izq: { accion: "Expulsarlo.", remate: "Con escolta y con el mapa.", efectos: { potencias: -5, ejercito: 5 } },
    der: { accion: "Intercambiarlo.", remate: "Por algo que nos hace más falta.", efectos: { potencias: 5, ejercito: -5, elite: 2 } }
  },

  {
    id: "los_chistes", era: 2, tipo: "sorteo", peso: 8, titulo: "Los chistes", ilustracion: null,
    personaje: "Ministra de Cultura",
    texto: "Comandante, circula un chiste sobre usted por todas las oficinas. Termina con una pausa en la que la gente mira al techo.",
    archivo: "En la Unión Soviética de Stalin, contar chistes políticos podía castigarse como «agitación antisoviética», según el artículo 58 del código penal.",
    izq: { accion: "Tribunal del humor.", remate: "Cada risa, un expediente.", efectos: { pueblo: -6, ejercito: 4, elite: 2 } },
    der: { accion: "Contar uno mejor.", remate: "El suyo, con aplausos obligatorios.", efectos: { pueblo: 5, ejercito: -3, elite: -2 } }
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

const FUTURO_ERA = {"base.culto_iniciado": 3, "base.modestia_aparente": 3, "base.prensa_libre": 4, "base.general_apartado": 4, "base.criticos_detenidos": 3, "base.deuda_externa": 3, "base.mercado_paralelo": 3, "base.desfile_militar": 3, "base.misiles_instalados": 3, "base.misiles_rechazados": 3, "base.periodista_oficial": 3, "base.estudiantes_reprimidos": 3, "base.jefe_poderoso": 3};   // era en la que llegan las consecuencias; el resto llega en la era 2
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
  "base.jefe_poderoso": "El Ministro del Interior pide cada vez más poder."
};


/* Reservado: expresión de la cara del dictador por opción [izquierda, derecha]. No se usa por ahora. */
const CARAS_OPCION = {
  casa_vacia: ["soberbia", "calculadora"],
  general_querido: ["desconfiada", "calculadora"],
  refinerias: ["calculadora", "furiosa"],
  visitante_oriental: ["calculadora", "soberbia"],
  embargo: ["furiosa", "preocupada"],
  depuracion_criticos: ["calculadora", "desconfiada"],
  tierra: ["aburrida", "soberbia"],
  periodicos: ["calculadora", "soberbia"],
  urnas: ["sorprendida", "calculadora"],
  mil_flores: ["calculadora", "aburrida"],
  oficiales: ["aburrida", "desconfiada"],
  puerto: ["preocupada", "furiosa"],
  ojos_barrio: ["desconfiada", "aburrida"],
  retrato: ["soberbia", "carcajada"],
  marchan: ["soberbia", "furiosa"],
  crisis_factura: ["preocupada", "calculadora"],
  crisis_tiendas: ["aburrida", "desconfiada"],
  coalicion_calle_cuarteles: ["calculadora", "furiosa"],
  coalicion_dinero_sale: ["preocupada", "soberbia"]
};
CARTAS.forEach(c => {
  const m = CARAS_OPCION[c.id] || [];
  c.izq.cara = m[0] || "neutra";
  c.der.cara = m[1] || "neutra";
});

