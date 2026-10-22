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
  { nombre: "La Revolución", min: 8, max: 10, factor: 1.25 },   // 16 oct: más larga (antes 6-8) y más dura (×1.25): al azar se pasaba demasiado fácil para Jorge
  { nombre: "La Purga", min: 8, max: 10, factor: 1.1 },   // 22 oct: más larga y más dura (antes 6-8 y ×0.7): al azar se superaba ~30 %
  { nombre: "El Culto", min: 8, max: 10, factor: 1.2 },   // 22 oct: más larga y más dura (antes 6-8 y ×0.75): el «humano» la superaba el 83 %
  { nombre: "La Supervivencia", min: 6, max: 8, factor: 0.8 }
];
const ERA = ERAS[0];
const UMBRAL_COALICION = 30;

const CARTAS = [
  /* ---------- Anclas ---------- */
  {
    id: "casa_vacia", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "La casa vacía",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Tenemos a los ministros del tirano. Los tribunales revolucionarios esperan y el Pueblo pide justicia.",
    izq: { accion: "Juicio público en el estadio", efectos: { pueblo: 8, ejercito: 4 }, banderas: ["base.juicios_publicos"] },
    der: { accion: "Tienen 24 horas para hacer maletas", efectos: { pueblo: -8, ejercito: -4, potencias: 5 }, banderas: ["base.exiliados_vocales"] }
  },
  {
    id: "casa_tirano", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "La casa del tirano",
    personaje: "Ministra de Cultura",
    texto: "La mansión del tirano tiene piscina, cine y 20 habitaciones. Habrá que darle algún uso revolucionario.",
    izq: { accion: "Museo del Pueblo", efectos: { pueblo: 8, elite: -6 } },
    der: { accion: "Me mudo yo", efectos: { pueblo: -8, elite: 6 } }
  },
  {
    id: "arcas_vacias", tipo: "ancla", ventana: [1, 1], grupo: "inicio", titulo: "Las arcas vacías",
    personaje: "Ministro de Economía",
    texto: "El tirano huyó con la reserva del Banco Nacional. No hay para pagar los sueldos de este mes.",
    izq: { accion: "Impriman billetes hasta que alcance", efectos: { pueblo: 5, potencias: -5 }, banderas: ["base.mercado_paralelo"] },
    der: { accion: "Pidan un préstamo y recorten gastos", efectos: { pueblo: -5, potencias: 5 }, banderas: ["base.deuda_externa"] }
  },
  {
    id: "general_querido", tipo: "ancla", ventana: [1, 3], titulo: "El general querido",
    personaje: "Ministro del Interior",
    texto: "El general Cienfuegos es el más querido del Ejército y pide el Estado Mayor.",
    izq: { accion: "Denle el Estado Mayor", efectos: { ejercito: 9, elite: -4 }, banderas: ["base.general_popular"] },
    der: { accion: "Embajador en el país más lejano", efectos: { ejercito: -9, elite: 4 }, banderas: ["base.general_apartado"] }
  },
  {
    id: "refinerias", tipo: "ancla", ventana: [3, 6], cond: { turnoMin: 3 }, titulo: "Las refinerías",
    personaje: "Ministro de Comercio",
    texto: "Las petroleras extranjeras exigen condiciones o cierran el grifo.",
    izq: { accion: "Aceptemos sus condiciones", efectos: { potencias: 10, elite: -5, pueblo: -4 }, banderas: ["base.negocio_refinerias"] },
    der: { accion: "¡Exprópiese!", efectos: { pueblo: 8, elite: 5, potencias: -10, crisis: 1 }, banderas: ["base.nacionalizo_empresas"],
           encolar: [{ carta: "embargo", min: 3, max: 8 }] }
  },
  {
    id: "visitante_oriental", tipo: "ancla", ventana: [4, 7], cond: { turnoMin: 4 }, titulo: "El visitante del bloque oriental",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país le ofrece petróleo, armas y asesores. A cambio, solo pedimos su lealtad.",
    izq: { accion: "Acepto su generosa ayuda", efectos: { potencias: 9, pueblo: 2, ejercito: 4, crisis: 2 }, banderas: ["base.alineado_bloque_oriental"] },
    der: { accion: "La Revolución no tiene dueño", efectos: { potencias: -9, pueblo: -5, ejercito: -4, crisis: 1 }, banderas: ["base.no_alineado"] }
  },

  /* ---------- Cola ---------- */
  {
    id: "embargo", tipo: "cola", titulo: "El embargo",
    personaje: "Embajador de la potencia del norte",
    texto: "Han expropiado nuestras refinerías. Exigimos compensación o habrá embargo.",
    izq: { accion: "Aquí no se paga nada", efectos: { pueblo: 3, potencias: -9, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Pagar compensación", efectos: { potencias: 9, pueblo: -9, crisis: 2 }, banderas: ["base.compensaciones"] }
  },
  {
    id: "depuracion_criticos", tipo: "cola", borrador: true, titulo: "La lista",
    personaje: "Ministro del Interior",
    texto: "Ya sabemos quiénes nos critican, gracias a unos vecinos muy colaboradores.",
    izq: { accion: "Que protesten, pero bajito", efectos: { pueblo: 8, ejercito: -5 } },
    der: { accion: "Detengan a todos en orden alfabético", efectos: { pueblo: -8, ejercito: 5 }, banderas: ["base.criticos_detenidos"] }
  },

  /* ---------- Sorteo ---------- */
  {
    id: "tierra", tipo: "sorteo", peso: 12, titulo: "La tierra",
    personaje: "Ministro de Trabajo",
    texto: "Si repartimos las tierras entre los campesinos, el país será el granero del mundo en un año.",
    izq: { accion: "Respeten la propiedad privada", efectos: { pueblo: -10, elite: -5 } },
    der: { accion: "La tierra para quien la \"merece\"", efectos: { pueblo: 10, elite: 5, potencias: -4, crisis: 1 }, banderas: ["base.reforma_agraria"] }
  },
  {
    id: "periodicos", tipo: "sorteo", peso: 10, titulo: "Los periódicos",
    personaje: "Ministra de Cultura",
    texto: "Los periódicos publican críticas contra cada decreto, uno detrás de otro.",
    izq: { accion: "Que publiquen lo que quieran", efectos: { pueblo: 6, elite: -5 }, banderas: ["base.prensa_libre"] },
    der: { accion: "Nacionalicen las imprentas", efectos: { pueblo: -6, elite: 5 }, banderas: ["base.censura_previa"] }
  },
  {
    id: "urnas", tipo: "sorteo", peso: 10, cond: { turnoMin: 2 }, titulo: "Las urnas prometidas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Pueblo recuerda que prometimos elecciones en dieciocho meses. Ya han pasado doce.",
    izq: { accion: "Convoquen elecciones en seis meses", efectos: { pueblo: 9, elite: -5 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "La Revolución ya fue votada", efectos: { pueblo: -9, elite: 5 }, banderas: ["base.elecciones_aplazadas"] }
  },
  {
    id: "alfabetizacion", tipo: "sorteo", peso: 6, titulo: "La campaña de alfabetización",
    personaje: "Ministra de Educación",
    texto: "Propongo una campaña de alfabetización: brigadas de jóvenes enseñando a leer en cada rincón.",
    izq: { accion: "Un Pueblo culto y agradecido", efectos: { pueblo: 10 } },
    der: { accion: "Un Pueblo que lee pregunta demasiado", efectos: { pueblo: -10 } }
  },
  {
    id: "escuelas", tipo: "sorteo", peso: 6, titulo: "Las escuelas para todos",
    personaje: "Ministra de Educación",
    texto: "Los colegios privados cobran por enseñar. Propongo que todas las escuelas sean del Estado.",
    izq: { accion: "Que todos aprendan lo mismo", efectos: { pueblo: 7, elite: 5 } },
    der: { accion: "Que pague quien quiera otra escuela", efectos: { pueblo: -7, elite: -5 } }
  },
  {
    id: "asesores", tipo: "sorteo", peso: 6, cond: { turnoMin: 2 }, titulo: "Los asesores",
    personaje: "Embajador del bloque oriental",
    texto: "Le enviaremos asesores para su economía y su policía. Nos ocuparemos de que todo vaya bien.",
    izq: { accion: "Aprenderemos de los mejores", efectos: { potencias: 9, ejercito: 5, elite: 5 } },
    der: { accion: "Gracias, aquí nos asesoramos solos", efectos: { potencias: -9, ejercito: -5, elite: -5 } }
  },
  {
    id: "club_golf", tipo: "sorteo", peso: 6, titulo: "El club de golf",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país reconocerá su gobierno si respeta nuestras propiedades, empezando por el club de golf.",
    izq: { accion: "Las propiedades y el golf son suyas", efectos: { potencias: 9, pueblo: -8, elite: -4 } },
    der: { accion: "Empezaremos nacionalizando el golf", efectos: { potencias: -9, pueblo: 8, elite: 4 } }
  },
  {
    id: "la_bahia", tipo: "ancla", ventana: [5, 7], titulo: "La bahía",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Hemos derrotado la invasión de la bahía. Tenemos mil doscientos prisioneros.",
    izq: { accion: "Cámbienlos por compotas", efectos: { potencias: -6, pueblo: 2, ejercito: -4 } },
    der: { accion: "Juicio televisado y paredón", efectos: { potencias: -3, pueblo: 5, ejercito: 5, crisis: 2 } }
  },
  {
    id: "los_ninos", tipo: "sorteo", peso: 6, cond: { turnoMin: 3 }, titulo: "Los niños que se van",
    personaje: "Ministra de Educación",
    texto: "Cada semana salen aviones llenos de niños sin sus padres. Temen que la Revolución se los quede.",
    izq: { accion: "Dejen salir a los niños", efectos: { pueblo: 5, ejercito: -4, potencias: 3 } },
    der: { accion: "Nadie se lleva a nuestros niños", efectos: { pueblo: -5, ejercito: 4, potencias: -3 } }
  },
  {
    id: "reforma_urbana", tipo: "sorteo", peso: 6, titulo: "La reforma urbana",
    personaje: "Ministro de Economía",
    texto: "El Estado expropiará las casas y las alquilará a mitad de precio hasta que el inquilino las compre.",
    izq: { accion: "Ahora el casero es el Estado", efectos: { pueblo: 8, elite: 4 } },
    der: { accion: "Los caseros mantienen sus casas", efectos: { pueblo: -8, elite: -4 } }
  },
  {
    id: "milicias", tipo: "sorteo", peso: 6, titulo: "Las milicias",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los barrios piden fusiles para defender la Revolución por su cuenta.",
    izq: { accion: "Que el Pueblo se arme", efectos: { pueblo: 6, ejercito: -6 } },
    der: { accion: "Las armas solo son para el Ejército", efectos: { pueblo: -6, ejercito: 6 } }
  },
  {
    id: "mil_flores", tipo: "sorteo", peso: 6, cond: { sin: ["base.censura_previa"] }, titulo: "Las mil flores",
    personaje: "Ministra de Cultura",
    texto: "Los intelectuales preguntan hasta dónde pueden criticar a la Revolución.",
    izq: { accion: "Que critiquen todo lo que quieran", efectos: { pueblo: 8, elite: -5 }, banderas: ["base.critica_abierta"],
           encolar: [{ carta: "depuracion_criticos", min: 3, max: 3 }] },
    der: { accion: "La Revolución no se cuestiona", efectos: { pueblo: -8, elite: 5 } }
  },
  {
    id: "oficiales", tipo: "sorteo", peso: 10, titulo: "Los oficiales de antes",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los oficiales del antiguo régimen siguen al mando de la mitad de los cuarteles.",
    izq: { accion: "Jubílenlos", efectos: { ejercito: -5, crisis: 1 }, banderas: ["base.viejos_oficiales"] },
    der: { accion: "Paredón y ascensos para los nuestros", efectos: { ejercito: 5, pueblo: 4 }, banderas: ["base.purga_inicial"] }
  },
  {
    id: "puerto", tipo: "sorteo", peso: 8, cond: { turnoMin: 3 }, titulo: "El puerto parado",
    personaje: "Ministro de Trabajo",
    texto: "El puerto lleva tres días parado. Los estibadores no quieren que el Partido elija a sus líderes.",
    izq: { accion: "Que se organicen libremente", efectos: { pueblo: 10, elite: -7, ejercito: -4, crisis: 1 }, banderas: ["base.sindicato_libre"] },
    der: { accion: "El Partido ya eligió por ellos", efectos: { pueblo: -10, elite: 7, ejercito: 4 }, banderas: ["base.huelga_reprimida"] }
  },
  {
    id: "ojos_barrio", tipo: "sorteo", peso: 14, cond: { alguna: ["base.purga_inicial", "base.censura_previa"] }, titulo: "Los ojos del barrio",
    personaje: "Ministro del Interior",
    texto: "Los contrarrevolucionarios se esconden en los barrios. Los vecinos podrían ayudarnos a encontrarlos.",
    izq: { accion: "Que cada vecino vigile a su vecino", efectos: { ejercito: 6, elite: 4, pueblo: -7 }, banderas: ["base.comites_vigilancia"] },
    der: { accion: "No necesitamos chivatos", efectos: { pueblo: 7, ejercito: -6, elite: -4 }, banderas: ["base.policia_tradicional"] }
  },
  {
    id: "retrato", tipo: "sorteo", peso: 6, cond: { turnoMin: 4 }, titulo: "El retrato",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido quiere su retrato en cada aula y una estatua en la plaza.",
    izq: { accion: "Si insisten…", efectos: { pueblo: -3, elite: 6, crisis: 1 }, banderas: ["base.culto_iniciado"] },
    der: { accion: "Los monumentos son para los mártires", efectos: { pueblo: 3, elite: -6 }, banderas: ["base.modestia_aparente"] }
  },
  {
    id: "marchan", tipo: "sorteo", peso: 14, cond: { alguna: ["base.reforma_agraria", "base.nacionalizo_empresas"] }, titulo: "Los que se marchan",
    personaje: "Ministro del Interior",
    texto: "Los ricos hacen cola en el aeropuerto. Dicen que vuelven en cuanto caiga la Revolución.",
    izq: { accion: "Que se vayan y dejen el dinero", efectos: { pueblo: 7, potencias: 4, crisis: -1 }, banderas: ["base.exodo_elite"] },
    der: { accion: "Nadie sale del país sin permiso", efectos: { ejercito: 6, pueblo: -7, potencias: -4 }, banderas: ["base.frontera_cerrada"] }
  },

  /* ---------- Crisis (borrador) ---------- */
  {
    id: "crisis_factura", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 4, titulo: "La factura",
    personaje: "Ministro de Economía",
    texto: "Hemos prometido demasiado y no queda dinero. Los precios se disparan y el Pueblo protesta.",
    izq: { accion: "Congelen los precios por decreto", efectos: { pueblo: 8, elite: 5, crisis: -3 }, banderas: ["base.mercado_paralelo"] },
    der: { accion: "Pidan otro préstamo y ya veremos", efectos: { potencias: 8, pueblo: -3, crisis: -3 }, banderas: ["base.deuda_externa"] }
  },
  {
    id: "crisis_tiendas", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 8, titulo: "Las tiendas vacías",
    personaje: "Ministro de Comercio",
    texto: "No hay nada en las tiendas del Estado. En el mercado negro, de todo.",
    izq: { accion: "Redadas en el mercado negro", efectos: { pueblo: -8, ejercito: 4, elite: 4, crisis: -3 } },
    der: { accion: "Hagan la vista gorda", efectos: { pueblo: 3, elite: 5, crisis: -3 }, banderas: ["base.mercado_paralelo"] }
  },

  /* ---------- Coalición (borrador) ---------- */
  {
    id: "coalicion_calle_cuarteles", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.pueblo < UMBRAL_COALICION && e.barras.ejercito < UMBRAL_COALICION,
    titulo: "La calle y los cuarteles",
    personaje: "Ministro del Interior",
    texto: "Algunos oficiales se reúnen con los que protestan en la calle. Si se juntan, caemos.",
    izq: { accion: "Asciendan a los que no se reúnen", efectos: { ejercito: 8, elite: -4 } },
    der: { accion: "Arresten a los oficiales reunidos", efectos: { ejercito: -6, pueblo: -3, crisis: 2 } }
  },
  {
    id: "coalicion_dinero_sale", tipo: "coalicion", repetible: true, borrador: true,
    disparo: e => e.barras.elite < UMBRAL_COALICION && e.barras.potencias < UMBRAL_COALICION,
    titulo: "El dinero se va",
    personaje: "Ministro de Economía",
    texto: "Los empresarios se reúnen con los embajadores. Si se alían, nos asfixian.",
    izq: { accion: "Mimen a los empresarios", efectos: { potencias: 6, pueblo: -8, elite: -5 } },
    der: { accion: "Intervengan sus empresas", efectos: { potencias: -8, pueblo: 6, elite: 5, crisis: 2 } }
  },

  /* ---------- Era 2 · La Purga ---------- */
  {
    id: "aniversario", era: 2, tipo: "ancla", ventana: [1, 2], titulo: "El aniversario",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Se acerca el aniversario de la Revolución. Los militares quieren desfile con tanques y el Pueblo ron. No hay para los dos.",
    izq: { accion: "Un gran desfile con tanques", efectos: { ejercito: 8, pueblo: -7, crisis: 1 }, banderas: ["base.desfile_militar"] },
    der: { accion: "Ron gratis para todo el Pueblo", efectos: { pueblo: 7, ejercito: -8 } }
  },

  {
    id: "nuevos_vecinos", tipo: "ancla", ventana: [8, 10], cond: { requiere: ["base.alineado_bloque_oriental"] }, titulo: "Los nuevos vecinos",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país le ofrece misiles, instalados y apuntando a donde usted diga.",
    izq: { accion: "Acepto y apúntenlos donde ya sabe", efectos: { ejercito: 6, potencias: 5, pueblo: -4, crisis: 2 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 2 }] },
    der: { accion: "Nuestro misil es el Pueblo", efectos: { ejercito: -6, potencias: -5, pueblo: 4 }, banderas: ["base.misiles_rechazados"] }
  },

  {
    id: "ultimatum", tipo: "cola", titulo: "El ultimátum",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestros barcos rodearán su costa hasta que retire los misiles.",
    izq: { accion: "Que disfruten de la vista", efectos: { ejercito: 6, potencias: -6, pueblo: -3, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Tranquilo, mañana no estarán", efectos: { ejercito: -6, potencias: 6, crisis: -1 } }
  },

  {
    id: "mano_norte", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.no_alineado"] }, titulo: "La mano del norte",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país ofrece créditos y comercio si acepta una auditoría de sus cuentas.",
    izq: { accion: "Será un honor rendir cuentas", efectos: { potencias: 8, elite: -5, crisis: 1 }, banderas: ["base.deuda_externa"] },
    der: { accion: "Aquí solo audita el Pueblo", efectos: { potencias: -8, pueblo: 4, elite: 4 } }
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
    texto: "Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha.",
    izq: { accion: "Interfieran la emisora con música", efectos: { pueblo: -6, ejercito: 3, elite: 2 } },
    der: { accion: "Acúsenlos de agentes extranjeros", efectos: { ejercito: 4, potencias: -4, pueblo: -3 } }
  },

  {
    id: "general_murmura", tipo: "sorteo", peso: 14, cond: { requiere: ["base.general_popular"], barraMax: { ejercito: 40 } }, titulo: "El general murmura",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "El general Cienfuegos recibe oficiales en su casa. Dicen que habla de usted en pasado.",
    izq: { accion: "Pregúntenle cómo están sus hijos", efectos: { ejercito: -3, crisis: 1 } },
    der: { accion: "Que tenga un accidente heroico", efectos: { ejercito: -6, pueblo: -4, elite: 3 }, banderas: ["base.accidente_cienfuegos"] }
  },

  {
    id: "hambre", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.reforma_agraria"] }, titulo: "El hambre",
    personaje: "Ministro de Trabajo",
    texto: "Repartimos la tierra, pero faltan semillas y tractores. La cosecha se ha reducido a la mitad.",
    izq: { accion: "El Estado dará mejor uso a la tierra", efectos: { pueblo: -5, elite: 2 } },
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
    id: "garantias", tipo: "sorteo", peso: 14, cond: { requiere: ["base.negocio_refinerias"] }, titulo: "Las garantías",
    personaje: "Ministro de Comercio",
    texto: "Las empresas extranjeras quieren por escrito que no habrá más nacionalizaciones y que podrán llevarse sus ganancias.",
    izq: { accion: "Les doy mi palabra de revolucionario", efectos: { potencias: 6, elite: -4, pueblo: -5, crisis: -1 } },
    der: { accion: "Aquí no se firma nada", efectos: { potencias: -6, pueblo: 4, elite: 4, crisis: 1 } }
  },

  {
    id: "elecciones_controladas", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_prometidas"] }, titulo: "Elecciones controladas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Se acercan las elecciones prometidas. El Partido propone lista única, «para comodidad del votante».",
    izq: { accion: "Papeleta única: Partido o Partido", efectos: { pueblo: -6, elite: 5 } },
    der: { accion: "Abran las listas a la oposición", efectos: { pueblo: 6, elite: -5 } }
  },

  {
    id: "estudiantes_calle", tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_aplazadas"] }, titulo: "Estudiantes en la calle",
    personaje: "Ministra de Educación",
    texto: "Los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.",
    izq: { accion: "Habrá elecciones, palabra de honor", efectos: { pueblo: 5, elite: -4 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "¿Elecciones para qué?", efectos: { pueblo: -6, ejercito: 4 }, banderas: ["base.estudiantes_reprimidos"] }
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
    id: "huelgas_crisis", tipo: "sorteo", peso: 14, cond: { requiere: ["base.sindicato_libre"] }, titulo: "La marcha de los eléctricos",
    personaje: "Ministro de Trabajo",
    texto: "Los electricistas quieren un sindicato libre como el del puerto, o apagarán la capital.",
    izq: { accion: "Que también tengan su sindicato", efectos: { pueblo: 6, elite: -4, crisis: 2 } },
    der: { accion: "Calabozo por contrarrevolución", efectos: { pueblo: -6, ejercito: 4, elite: 4 } }
  },

  {
    id: "universidades", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.huelga_reprimida"] }, titulo: "El puerto lento",
    personaje: "Ministro de Trabajo",
    texto: "Desde la huelga, los estibadores trabajan a medio ritmo. Los barcos esperan semanas para descargar.",
    izq: { accion: "Militaricen el puerto", efectos: { ejercito: 5, pueblo: -5 } },
    der: { accion: "Que puedan elegir a su delegado", efectos: { pueblo: 5, elite: -5 } }
  },

  {
    id: "denuncias_falsas", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.comites_vigilancia", "base.purga_inicial", "base.criticos_detenidos"] }, titulo: "Denuncias falsas",
    personaje: "Ministro del Interior",
    texto: "Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por una gallina.",
    izq: { accion: "Que se investigue hasta la gallina", efectos: { ejercito: 6, pueblo: -6 } },
    der: { accion: "Solo cuentan las denuncias políticas", efectos: { pueblo: 4, ejercito: -4 } }
  },

  {
    id: "oposicion_firma", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.policia_tradicional", "base.exiliados_vocales", "base.critica_abierta", "base.campos_trabajo"] }, titulo: "Una carta con firmas",
    personaje: "Ministra de Cultura",
    texto: "Un grupo de intelectuales firmó una carta reclamando los derechos que usted mismo prometió.",
    izq: { accion: "Abran un diálogo con los firmantes", efectos: { pueblo: 6, ejercito: -4, elite: -3 } },
    der: { accion: "Prohíban la carta y a sus autores", efectos: { pueblo: -6, ejercito: 5, elite: 3 } }
  },

  {
    id: "faltan_tecnicos", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exodo_elite", "base.juicios_publicos", "base.nacionalizo_empresas"] }, titulo: "Faltan técnicos",
    personaje: "Ministro de Economía",
    texto: "Se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.",
    izq: { accion: "Prohíban salir a los titulados", efectos: { ejercito: 4, pueblo: -4 } },
    der: { accion: "Cursos acelerados de todo para todos", efectos: { elite: 2, pueblo: 3 } }
  },

  {
    id: "intentos_fuga", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.frontera_cerrada", "base.criticos_detenidos", "base.exiliados_vocales"] }, titulo: "Intentos de fuga",
    personaje: "Ministro del Interior",
    texto: "Cada semana huyen más familias en balsas. Las patrullas no dan abasto.",
    izq: { accion: "Refuercen la frontera", efectos: { ejercito: 6, pueblo: -5 } },
    der: { accion: "Dejen que se vaya quien quiera", efectos: { pueblo: 5, ejercito: -4, potencias: 3 } }
  },

  {
    id: "embargo_total", tipo: "sorteo", peso: 14, cond: { turnoMin: 6, alguna: ["base.embargo_en_marcha", "base.nacionalizo_empresas"] }, titulo: "Embargo total",
    personaje: "Ministro de Comercio",
    texto: "El embargo ya es total: no entran comida, medicinas ni repuestos.",
    izq: { accion: "Libreta de racionamiento por familia", efectos: { pueblo: -4, elite: 3, crisis: -1 } },
    der: { accion: "Que un país amigo nos revenda", efectos: { pueblo: 4, potencias: 3, elite: 2, crisis: 1 } }
  },

  {
    id: "deuda_llama", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.compensaciones", "base.deuda_externa"] }, titulo: "La deuda llama",
    personaje: "Ministro de Economía",
    texto: "Mañana vence el primer pago de la deuda con el extranjero. En caja hay menos de lo prometido.",
    izq: { accion: "Paguen aunque el Pueblo no coma", efectos: { potencias: 5, pueblo: -5 } },
    der: { accion: "No se le paga al explotador", efectos: { potencias: -6, elite: 2 } }
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
    texto: "Circula un chiste sobre usted. Lo cuentan en las colas y lo repiten en el Consejo de Ministros.",
    izq: { accion: "Detengan a quien lo cuente", efectos: { pueblo: -5, ejercito: 4 } },
    der: { accion: "Reírse es gratis", efectos: { pueblo: 4, ejercito: -3 } }
  },
  /* ---------- Era 3 · Culto ---------- (tratamiento: «Excelencia»; límites: mensaje ≤150 caracteres, acción ≤5 palabras, remate ≤75) */
  {
    id: "el_monumento", era: 3, tipo: "ancla", ventana: [1, 3], cond: { requiere: ["base.culto_iniciado"] }, titulo: "El monumento",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido propone un monumento de 40m en su honor, visible desde toda la costa y los barrios",
    izq: { accion: "Cuarenta metros, ni uno menos", efectos: { elite: 5, pueblo: -4, crisis: 2 }, banderas: ["base.monumento_colosal"], encolar: [{ carta: "pedestal", min: 2, max: 3 }] },
    der: { accion: "Que el dinero se gaste en escuelas", efectos: { elite: -4, pueblo: 4 }, banderas: ["base.monumento_modesto"] }
  },
  {
    id: "pedestal", era: 3, tipo: "cola", titulo: "El pedestal",
    personaje: "Ministro de Economía",
    texto: "El monumento costó el doble y no se terminó: la estatua tiene un solo brazo.",
    izq: { accion: "Termínenla, cueste lo que cueste", efectos: { elite: 4, pueblo: -4, crisis: 2 } },
    der: { accion: "Un brazo basta para saludar", efectos: { elite: -3, pueblo: 3, crisis: -1 } }
  },
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
    id: "aliado_enfadado", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_rechazados"] }, titulo: "El aliado enfadado",
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
    id: "aulas_vacias", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.estudiantes_reprimidos", "base.huelga_reprimida"] }, titulo: "Las aulas vacías",
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
    texto: "El acreedor aplazará la deuda a cambio de nuestro voto en los foros internacionales durante años.",
    izq: { accion: "Votaremos fieles a nuestros aliados", efectos: { potencias: 7, elite: -2, crisis: -2 } },
    der: { accion: "Racionar más hasta pagar la deuda", efectos: { potencias: -7, elite: 3, pueblo: -5, crisis: 1 } }
  },
  {
    id: "mercado_mayor", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mercado_paralelo"] }, titulo: "El mercado mayor",
    personaje: "Ministro de Comercio",
    texto: "El mercado paralelo vende más que las tiendas del Estado, y algunos funcionarios cobran en divisas.",
    izq: { accion: "Permitan pequeños negocios privados", efectos: { pueblo: 6, elite: -5, crisis: -1 } },
    der: { accion: "Persigan a los vendedores", efectos: { pueblo: -6, elite: 3, ejercito: 3, crisis: 1 } }
  },

  {
    id: "ciudad_con_nombre", era: 3, tipo: "sorteo", peso: 10, titulo: "La ciudad con su nombre",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido propone rebautizar la capital con su nombre.",
    izq: { accion: "Que la capital lleve mi nombre", efectos: { elite: 5, pueblo: -3 }, banderas: ["base.capital_rebautizada"] },
    der: { accion: "Basta con el estadio y el aeropuerto", efectos: { elite: -3, pueblo: 3 } }
  },
  {
    id: "himno_nuevo", era: 3, tipo: "sorteo", peso: 10, titulo: "El himno nuevo",
    personaje: "Ministra de Cultura",
    texto: "El himno nacional no le menciona. Proponemos una nueva versión.",
    izq: { accion: "Y que se cante a diario en clase", efectos: { elite: 4, pueblo: -3 } },
    der: { accion: "Dejen el himno como está", efectos: { elite: -3, pueblo: 3 } }
  },
  {
    id: "libro_texto", era: 3, tipo: "sorteo", peso: 10, titulo: "El libro de texto",
    personaje: "Ministra de Educación",
    texto: "Tenemos listo un libro con su vida y sus ideas. Lo exigiremos en todas las escuelas.",
    izq: { accion: "Que se evalúe en los exámenes", efectos: { elite: 5, pueblo: -5 }, banderas: ["base.libro_obligatorio"] },
    der: { accion: "Libro opcional, en las bibliotecas", efectos: { elite: -4, pueblo: 4 } }
  },
  {
    id: "cumpleanos", era: 3, tipo: "sorteo", peso: 10, titulo: "El cumpleaños nacional",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su cumpleaños merece ser fiesta nacional, con discursos y día libre.",
    izq: { accion: "Que todo el país sople las velas", efectos: { pueblo: -2, elite: 4, crisis: 2 } },
    der: { accion: "Ese día, todos a trabajar", efectos: { pueblo: -2, elite: -2, crisis: -1 } }
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
    texto: "El Partido pide un monumento eterno: un cacho de roca gigante que dicen que se parece a usted.",
    izq: { accion: "Seré una piedra eterna", efectos: { elite: 4, pueblo: -4, crisis: 2 }, banderas: ["base.mausoleo_construido"] },
    der: { accion: "Prefiero ser enterrado y olvidado", efectos: { elite: -3, pueblo: 3, crisis: -1 } }
  },
  {
    id: "palacio_pueblo", era: 3, tipo: "sorteo", peso: 10, titulo: "El palacio del Pueblo",
    personaje: "Ministro de Economía",
    texto: "Proponemos un nuevo palacio de gobierno. Cuesta cinco años de presupuesto y tres barrios enteros.",
    izq: { accion: "El viejo palacio se nos queda chico", efectos: { elite: 3, pueblo: -6, crisis: 3 }, banderas: ["base.palacio_del_pueblo"] },
    der: { accion: "Ese dinero, para viviendas", efectos: { pueblo: 4, crisis: -1 } }
  },
  {
    id: "zafra_diez_millones", era: 2, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "La zafra de los diez millones",
    personaje: "Ministro de Trabajo",
    texto: "Queremos la mayor zafra de la historia. Proponemos mandar a cortar caña a estudiantes, oficinistas y soldados.",
    izq: { accion: "¡Todos a la zafra!", efectos: { pueblo: -6, elite: 4 } },
    der: { accion: "Qué disparate, el país se pararía", efectos: { pueblo: 5, elite: -4 } }
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
    texto: "Una bomba ha estallado cerca del palacio, sin heridos. Podemos investigarla o culpar a la oposición.",
    izq: { accion: "No desperdiciemos esta conspiración", efectos: { ejercito: 7, pueblo: -6 }, banderas: ["base.oposicion_culpada"], encolar: [{ carta: "la_investigacion", min: 1, max: 2 }] },
    der: { accion: "Quiero al culpable, no a cualquiera", efectos: { ejercito: -4, pueblo: 4 }, banderas: ["base.atentado_investigado"] }
  },
  {
    id: "la_investigacion", era: 3, tipo: "cola", titulo: "La investigación",
    personaje: "Ministro del Interior",
    texto: "Los acusados del atentado lo niegan todo. Uno de ellos lleva dos años muerto.",
    izq: { accion: "Que confiese también el difunto", efectos: { ejercito: 5, pueblo: -5 } },
    der: { accion: "Busquen a los verdaderos culpables", efectos: { ejercito: -5, pueblo: 5 } }
  },
  {
    id: "flores_mar", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.accidente_cienfuegos"] }, titulo: "Las flores en el mar",
    personaje: "Ministro del Interior",
    texto: "Las flores al mar por Cienfuegos ya son una protesta. Muchos creen que no fue un accidente.",
    izq: { accion: "Prohíban tirar flores al mar", efectos: { ejercito: 6, pueblo: -6 } },
    der: { accion: "Encabezaré yo los homenajes", efectos: { elite: 2 } }
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
    id: "el_reportaje", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.prensa_libre"] }, titulo: "El reportaje",
    personaje: "Ministra de Cultura",
    texto: "Un periódico al que dejamos publicar ha destapado las cuentas del gobierno.",
    izq: { accion: "Cerrar el periódico por falta de papel", efectos: { pueblo: -6, ejercito: 4 } },
    der: { accion: "Ordenar una auditoría pública", efectos: { pueblo: 3, elite: -6 } }
  },
  {
    id: "varela_vuelve", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.general_apartado"] }, titulo: "Cienfuegos vuelve",
    personaje: "Ministro del Interior",
    texto: "El general Cienfuegos vuelve de su embajada. En el aeropuerto lo recibe una multitud con pancartas.",
    izq: { accion: "Que se jubile con honores y pensión", efectos: { ejercito: -4, pueblo: -2, elite: 3 } },
    der: { accion: "Que el general tome el mando", efectos: { ejercito: 6, pueblo: 3, elite: -5 } }
  },
  {
    id: "delfin_impaciente", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.sucesor_designado"] }, titulo: "El delfín impaciente",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su hermano ya recibe embajadores en su despacho y reparte sus propios retratos por las escuelas.",
    izq: { accion: "Adviértanle que aún mando yo", efectos: { elite: -6 } },
    der: { accion: "El Pueblo debe conocer a mi hermano", efectos: { elite: 6 } }
  },
  {
    id: "los_inocentes", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.oposicion_culpada"] }, titulo: "Los inocentes",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país tiene pruebas de que la oposición no puso aquella bomba. Pedimos que se revise el caso.",
    izq: { accion: "Rectificar es de revolucionarios", efectos: { potencias: 7, pueblo: 4, ejercito: -6 } },
    der: { accion: "La Revolución no se revisa", efectos: { potencias: -6, pueblo: -4, ejercito: 5 } }
  },
  {
    id: "mausoleo_vacio", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mausoleo_construido"] }, titulo: "El mausoleo vacío",
    personaje: "Ministro de Economía",
    texto: "El mausoleo necesita mantenimiento y usted aún no lo ha estrenado. Los embalsamadores piden un aumento.",
    izq: { accion: "Pagar el aumento.", remate: "La eternidad no se recorta.", efectos: { elite: 5, pueblo: -5, crisis: 2 } },
    der: { accion: "Alquilarlo para actos.", remate: "Mientras tanto, que dé beneficios.", efectos: { elite: -4, crisis: -2 } }
  },
  {
    id: "palacio_sin_terminar", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.palacio_del_pueblo"] }, titulo: "El palacio sin terminar",
    personaje: "Ministro de Economía",
    texto: "El palacio sigue sin terminar y ya ha costado más que todos los hospitales del país.",
    izq: { accion: "Terminarlo como sea.", remate: "Que mis sucesores tengan dónde aburrirse.", efectos: { elite: 6, pueblo: -5, crisis: 3 } },
    der: { accion: "Convertirlo en museo.", remate: "Un museo de lo que pudo haber sido.", efectos: { elite: -5, pueblo: 5, crisis: -1 } }
  },
  {
    id: "dos_ejercitos", era: 4, tipo: "sorteo", peso: 14, cond: { alguna: ["base.estado_policial", "base.jefe_poderoso"] }, titulo: "Dos ejércitos",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "La unidad del Interior ya tiene más tanques que el Ejército. Mis oficiales preguntan quién manda.",
    izq: { accion: "Desarmar al batallón.", remate: "Un ejército basta; dos acaban discutiendo.", efectos: { ejercito: -5, elite: 4 } },
    der: { accion: "Más tanques al Ejército.", remate: "Si sobran tanques, que sobren en los dos lados.", efectos: { ejercito: 8, elite: -4, crisis: 2 } }
  },

  {
    id: "la_salud", era: 4, tipo: "ancla", ventana: [1, 3], titulo: "La salud",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Corren rumores sobre su salud. Proponemos que se le vea nadando en el río, como hacía de joven.",
    izq: { accion: "Nadar en el río.", remate: "Que la corriente sepa quién manda.", efectos: { pueblo: 6, elite: 3, ejercito: -4 } },
    der: { accion: "Mandar a un doble.", remate: "Nadie notará la diferencia; yo tampoco.", efectos: { pueblo: -6, elite: -3, ejercito: 4 }, encolar: [{ carta: "el_doble", min: 2, max: 3 }] }
  },
  {
    id: "el_doble", era: 4, tipo: "cola", titulo: "El doble",
    personaje: "Ministro del Interior",
    texto: "Su doble ha empezado a dar discursos por su cuenta. Dicen que habla mejor que usted.",
    izq: { accion: "Retirar al doble.", remate: "Solo hay sitio para un Padre de la Patria.", efectos: { ejercito: 6, pueblo: -5, elite: -2 } },
    der: { accion: "Dejarle los discursos.", remate: "Que hable él; yo descanso y escucho.", efectos: { ejercito: -6, pueblo: 5, elite: 2 } }
  },
  {
    id: "las_medallas", era: 4, tipo: "sorteo", peso: 10, titulo: "Las medallas",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "El Ejército quiere concederle su máxima condecoración. Sería la número ochenta y tres.",
    izq: { accion: "Aceptarla.", remate: "La modestia también necesita sitio en el pecho.", efectos: { ejercito: 6, pueblo: -4, elite: 2 } },
    der: { accion: "Rechazarla.", remate: "Ochenta y dos bastan para un hombre humilde.", efectos: { ejercito: -6, pueblo: 4, elite: -2 } }
  },
  {
    id: "el_plebiscito", era: 4, tipo: "sorteo", peso: 10, titulo: "El plebiscito",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido propone un plebiscito para que el Pueblo diga si quiere que usted siga ocho años más.",
    izq: { accion: "Convocar el plebiscito.", remate: "El Pueblo decidirá lo que ya está decidido.", efectos: { potencias: 6, pueblo: 4, ejercito: -5 }, encolar: [{ carta: "el_escrutinio", min: 1, max: 2 }] },
    der: { accion: "No hace falta.", remate: "No pregunto lo que ya sé.", efectos: { potencias: -6, pueblo: -4, ejercito: 5 } }
  },
  {
    id: "el_escrutinio", era: 4, tipo: "cola", titulo: "El escrutinio",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El plebiscito ha salido mal: gana el «No». El escrutinio todavía no es oficial.",
    izq: { accion: "Aceptar el resultado.", remate: "Que no se diga que no sé perder; solo que no me voy.", efectos: { pueblo: 9, potencias: 7, ejercito: -9, elite: -4 }, banderas: ["base.derrota_aceptada"] },
    der: { accion: "Recontar los votos.", remate: "Hasta que salgan bien.", efectos: { pueblo: -9, potencias: -7, ejercito: 9, elite: 4 }, banderas: ["base.recuento"] }
  },
  {
    id: "aliado_se_hunde", era: 4, tipo: "sorteo", peso: 10, titulo: "El aliado se hunde",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país atraviesa dificultades. El año que viene no podremos enviar petróleo, ni créditos, ni, quizá, embajador.",
    izq: { accion: "Pedir un último envío.", remate: "Por los viejos tiempos y por los nuevos apagones.", efectos: { potencias: 5, pueblo: -5, crisis: 2 } },
    der: { accion: "Buscar nuevos amigos.", remate: "La amistad eterna también caduca.", efectos: { potencias: -5, pueblo: 5, elite: 3, crisis: 1 } }
  },
  {
    id: "salida_honrosa", era: 4, tipo: "sorteo", peso: 10, titulo: "La salida honrosa",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país le ofrece una salida honrosa: elecciones libres, inmunidad y una casa en la costa.",
    izq: { accion: "Negociar la salida.", remate: "Una casa en la costa, con vistas al palacio.", efectos: { potencias: 8, pueblo: 5, ejercito: -7, elite: -4 } },
    der: { accion: "Rechazar la oferta.", remate: "De aquí solo salgo en procesión.", efectos: { potencias: -8, pueblo: -5, ejercito: 7, elite: 4 } }
  },
  {
    id: "las_memorias", era: 4, tipo: "sorteo", peso: 10, titulo: "Las memorias",
    personaje: "Ministra de Cultura",
    texto: "La editorial del Estado prepara sus memorias en doce tomos. Necesitamos saber qué recuerda usted.",
    izq: { accion: "Doce tomos.", remate: "Y un decimotercero con lo que no recuerdo.", efectos: { elite: 5, pueblo: -5, crisis: 1 } },
    der: { accion: "Un solo tomo.", remate: "Lo esencial cabe en una página: yo.", efectos: { elite: -5, pueblo: 5 } }
  },
  {
    id: "el_hijo", era: 4, tipo: "sorteo", peso: 10, titulo: "El hijo",
    personaje: "Ministro de Comercio",
    texto: "Su hijo quiere la concesión del puerto. Dice que conoce el negocio porque ha visto llegar los barcos.",
    izq: { accion: "Darle la concesión.", remate: "La experiencia se hereda, como el apellido.", efectos: { elite: 6, pueblo: -6, potencias: -2 } },
    der: { accion: "Negársela.", remate: "Que empiece desde abajo: un ministerio pequeño.", efectos: { elite: -6, pueblo: 6, potencias: 2 } }
  },
  {
    id: "la_cuenta", era: 4, tipo: "sorteo", peso: 10, titulo: "La cuenta en el extranjero",
    personaje: "Ministro de Economía",
    texto: "Un banco extranjero pregunta de dónde salen los fondos de su cuenta personal. Quiere un papel firmado.",
    izq: { accion: "Firmar cualquier cosa.", remate: "Mi firma vale más que su pregunta.", efectos: { potencias: 6, elite: 3, pueblo: -5 } },
    der: { accion: "Traer el dinero a casa.", remate: "Bajo el colchón del Estado no pregunta nadie.", efectos: { potencias: -6, elite: -3, pueblo: 5, crisis: -1 } }
  },
  {
    id: "la_memoria", era: 4, tipo: "sorteo", peso: 10, titulo: "La memoria",
    personaje: "Ministra de Educación",
    texto: "Los nietos de los que usted encarceló piden que los libros de texto cuenten lo que pasó.",
    izq: { accion: "Una página en el libro.", remate: "Breve, en letra pequeña y al final.", efectos: { pueblo: 6, potencias: 4, ejercito: -6 } },
    der: { accion: "Nada que contar.", remate: "La Historia ya está escrita; yo tengo la pluma.", efectos: { pueblo: -6, potencias: -4, ejercito: 6 } }
  },
  {
    id: "huelga_general", era: 4, tipo: "sorteo", peso: 10, titulo: "La revuelta",
    personaje: "Ministro del Interior",
    texto: "Miles de personas han salido al paseo marítimo gritando contra usted.",
    izq: { accion: "Bajaré yo mismo a calmarlos", efectos: { pueblo: 8, elite: -5, crisis: 2 } },
    der: { accion: "Manden a las tropas especiales", efectos: { pueblo: -8, ejercito: 6, potencias: -4 } }
  },
  {
    id: "el_concierto", era: 4, tipo: "sorteo", peso: 10, titulo: "El concierto",
    personaje: "Ministra de Cultura",
    texto: "Una banda de rock extranjera pide tocar en el estadio. La juventud ya se sabe todas las canciones.",
    izq: { accion: "Que toquen.", remate: "Si cantan, no gritan.", efectos: { pueblo: 7, potencias: 4, ejercito: -5 } },
    der: { accion: "Prohibir el concierto.", remate: "La música extranjera también necesita visado.", efectos: { pueblo: -7, potencias: -4, ejercito: 5 } }
  },
  {
    id: "estatuas_caen", era: 4, tipo: "sorteo", peso: 10, titulo: "Las estatuas caen",
    personaje: "Ministro del Interior",
    texto: "En la televisión extranjera derriban estatuas de dirigentes como usted. El Pueblo lo está viendo.",
    izq: { accion: "Cortar la señal.", remate: "Lo que no se ve, no se derriba.", efectos: { pueblo: -6, ejercito: 5, potencias: -3 } },
    der: { accion: "Reforzar las estatuas.", remate: "Con hormigón y con guardia.", efectos: { pueblo: 3, ejercito: -5, elite: 3, crisis: 1 } }
  },
  {
    id: "la_sequia", era: 4, tipo: "sorteo", peso: 10, titulo: "La sequía",
    personaje: "Ministro de Trabajo",
    texto: "La sequía ha arruinado la cosecha. Los campesinos piden ayuda y los almacenes del Ejército están llenos.",
    izq: { accion: "Abrir los almacenes.", remate: "El Ejército comerá menos; por una vez.", efectos: { pueblo: 8, ejercito: -7 } },
    der: { accion: "Mantenerlos cerrados.", remate: "La reserva es para emergencias, no para el hambre.", efectos: { pueblo: -8, ejercito: 7 } }
  },
  {
    id: "los_turistas", era: 4, tipo: "sorteo", peso: 10, titulo: "Los turistas",
    personaje: "Ministro de Comercio",
    texto: "Proponemos abrir las playas al turismo extranjero. Traerán divisas, cámaras y malas costumbres.",
    izq: { accion: "Abrir las playas.", remate: "Las divisas no tienen ideología.", efectos: { potencias: 6, elite: 4, pueblo: -4, crisis: -2 } },
    der: { accion: "Mantenerlas cerradas.", remate: "Las playas, para el Pueblo; el Pueblo, en su casa.", efectos: { potencias: -6, elite: -4, pueblo: 4, crisis: 1 } }
  },
  {
    id: "bomba_interior", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.atentado_investigado"] }, titulo: "La bomba de dentro", ilustracion: null,
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Tenemos el resultado de la investigación: la bomba salió del Ministerio del Interior.",
    izq: { accion: "Sarria tendrá una explicación", efectos: { ejercito: -6, pueblo: 5, potencias: 3 } },
    der: { accion: "Archiven la investigación", efectos: { ejercito: 6, pueblo: -5, potencias: -3 } }
  },
  {
    id: "el_general_heroe", era: 4, tipo: "ancla", ventana: [1, 3], titulo: "El general héroe", ilustracion: null,
    personaje: "Ministro del Interior",
    texto: "El general más condecorado está detenido por contrabando. El Pueblo lo adora.",
    izq: { accion: "Juicio en directo y paredón", efectos: { ejercito: -6, potencias: 4, pueblo: -3 } },
    der: { accion: "Retiro discreto en su finca", efectos: { ejercito: 6, potencias: -4, pueblo: 3 } }
  },
  {
    id: "el_parte_medico", era: 4, tipo: "ancla", ventana: [5, 8], titulo: "El parte médico",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Los médicos recomiendan reposo absoluto. El Partido pregunta quién firmará los decretos mientras tanto.",
    izq: { accion: "Firmarlos desde la cama.", remate: "Gobierno mejor tumbado: me cuesta menos sonreír.", efectos: { ejercito: 6, elite: -6, pueblo: -3 } },
    der: { accion: "Delegar en el Consejo.", remate: "Que firmen; luego revisaré quién firmó qué.", efectos: { ejercito: -6, elite: 6, pueblo: 3 } }
  }
];

/* Ficha de cada portavoz: el reverso de la carta (al tocarla, se voltea). Nombre propio, cargo que se muestra e historia breve,
   escrita como un informe de la inteligencia del régimen que vigila a su propio gobierno (16 oct): el retrato
   y, aparte, la «Nota:» con la observación. Los expedientes irán evolucionando por etapas.
   16 oct: personajes por etapas. La clave es el cargo interno (une cada carta con su personaje y no cambia);
   «cargo» es el que se lee en la ficha. Por ahora, la etapa 1 (los cargos humildes de la sierra) vale para todas las eras. */
const FICHAS = {
  "Vicepresidente del Consejo de Ministros": { nombre: "Anselmo Quiñones", cargo: "Vicepresidente",
    historia: "Vicepresidente del tirano y del gobierno anterior. Recibió a la columna con café y con las llaves de los ministerios.",
    nota: "Sus expedientes de los 2 regímenes anteriores han desaparecido de los archivos." },
  "Ministro de Economía": { nombre: "Rigoberto Peña", cargo: "Responsable de víveres",
    historia: "Bodeguero que fió víveres a la columna y la siguió al monte para cobrar una deuda que sigue pendiente.",
    nota: "Sus cuentas no cuadran nunca y este servicio aún no ha averiguado si es por torpeza." },
  "Ministro de Comercio": { nombre: "Ernesto «Neto» Arrieta", cargo: "Abastecedor por mar",
    historia: "Contrabandista que subía armas a la columna en una lancha prestada y en el mismo viaje vendía ron al cuartel.",
    nota: "Se desconoce a quién pertenece hoy la lancha y a quién pertenece él." },
  "Ministra de Educación": { nombre: "Hortensia Lamadrid", cargo: "Maestra de la columna",
    historia: "Maestra rural de diecinueve años que enseñó a leer a la tropa y conoce de memoria la letra de cada guerrillero.",
    nota: "Corrige con regla todo lo que pasa por sus manos. Incluidos estos informes." },
  "Ministro de Trabajo": { nombre: "Eusebio Palmares", cargo: "Delegado del sindicato cañero",
    historia: "Cortador de caña y cabecilla de la huelga de la zafra. Arrastra a medio pueblo cada vez que habla.",
    nota: "Se recomienda vigilar su popularidad y anotar el destino de los plátanos que lleva en el morral." },
  "Ministra de Cultura": { nombre: "Mirta Albear", cargo: "Locutora de Radio Machete",
    historia: "Locutora de Radio Machete cuya voz escuchaba el país de noche y a escondidas.",
    nota: "Sostiene en público que la palabra libera, por lo que se aconseja revisar sus poemas antes de cada emisión." },
  "Ministro de las Fuerzas Armadas": { nombre: "Domingo Cuesta", cargo: "Capitán de columna",
    historia: "Campesino de la sierra que aprendió a mandar a tiros y al que la tropa seguiría a cualquier parte, lo que conviene tener presente.",
    nota: "Hasta la fecha ha rechazado todas las medallas que se le han ofrecido." },
  "Ministro del Interior": { nombre: "Octavio Sarria", cargo: "Enlace de la columna",
    historia: "Oficinista de banco que en la sierra interrogaba a los recién llegados y lleva una libreta con el nombre de cada compañero.",
    nota: "Este informe lo ha redactado él mismo." },
  "Embajador del bloque oriental": { nombre: "Pavel Strenko", cargo: "Enviado especial (misión temporal)",
    historia: "Enviado del bloque oriental para una misión de seis meses.",
    nota: "Ha deshecho la maleta a medias y estudia el diccionario con interés, sobre todo las palabras que oye en las reuniones del Consejo." },
  "Embajador de la potencia del norte": { nombre: "Harlan Pembrook", cargo: "Embajador de la potencia del norte",
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

const FINALES = {
  pueblo_0:     { titulo: "Re-Revolución",               texto: "Las protestas se extienden por todo el país y ya no quedan fuerzas que las contengan. Tu gobierno cae." },
  pueblo_100:   { titulo: "Populismo",           texto: "Regalaste tanto para ganarte al Pueblo que vaciaste las arcas. Cuando dejaste de dar, salieron a reclamar sus «derechos» y tu cabeza." },
  ejercito_0:   { titulo: "Abducción",                  texto: "Tus generales se lavaron las manos mientras un comando extranjero te sacaba del país." },
  ejercito_100: { titulo: "Junta militar",             texto: "Los militares controlan todo. Sigues en el palacio, pero ya no decides nada." },
  elite_0:      { titulo: "Liquidación", texto: "El Partido se reunió sin ti y votó por unanimidad que eras prescindible." },
  elite_100:    { titulo: "Florero",                texto: "Fuiste cediendo poder al Partido hasta acabar convertido en su presidente títere." },
  potencias_0:  { titulo: "Invasión",               texto: "Sin aliados ni comercio, el país queda solo frente a sus adversarios." },
  potencias_100:{ titulo: "Recambio",           texto: "Le entregaste las llaves del país a tu protector y ahora buscan alguien que obedezca mejor." }
};

const LINEAS_BARRA = {   // 16 oct: en tercera persona, como el informe de inteligencia donde salen
  pueblo:    { alto: "El Pueblo te aplaude, de momento.",                          bajo: "El Pueblo ha aprendido a no hacer demasiadas preguntas." },
  ejercito:  { alto: "El Ejército no te ha abandonado.",                           bajo: "El Ejército te obedece, pero cuenta los días." },
  elite:     { alto: "El Partido ha aprendido a beneficiarse de tu gobierno.",    bajo: "El Partido empieza a reunirse sin ti." },
  potencias: { alto: "Tienes aliados, y deudas con ellos.",                         bajo: "En el exterior nadie te quiere, salvo quien te teme." }
};

const FUTURO_ERA = {"base.campos_trabajo": 3, "base.culto_iniciado": 3, "base.modestia_aparente": 3, "base.prensa_libre": 4, "base.general_apartado": 4, "base.criticos_detenidos": 3, "base.mercado_paralelo": 3, "base.desfile_militar": 3, "base.periodista_oficial": 3, "base.estudiantes_reprimidos": 3, "base.jefe_poderoso": 3, "base.sucesor_designado": 4, "base.oposicion_culpada": 4, "base.mausoleo_construido": 4, "base.palacio_del_pueblo": 4, "base.estado_policial": 4, "base.accidente_cienfuegos": 2, "base.alineado_bloque_oriental": 1, "base.general_popular": 1, "base.negocio_refinerias": 1, "base.sindicato_libre": 1, "base.elecciones_aplazadas": 1, "base.embargo_en_marcha": 1, "base.critica_abierta": 3, "base.elecciones_prometidas": 3, "base.policia_tradicional": 3, "base.atentado_investigado": 4};   // era en la que llegan las consecuencias; el resto llega en la era 2
const FUTURO = {
  "base.juicios_publicos": "Las potencias endurecen su postura ante el régimen.",
  "base.exiliados_vocales": "Una oposición habla desde el extranjero.",
  "base.general_popular": "Cienfuegos conspira si el Ejército baja de 40.",
  "base.accidente_cienfuegos": "El Pueblo no olvida el accidente de Cienfuegos.",
  "base.general_apartado": "Cienfuegos regresa como candidato de los descontentos.",
  "base.reforma_agraria": "Escasez de alimentos dos años después.",
  "base.prensa_libre": "Un reportaje destapa un escándalo.",
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
  "base.estado_policial": "El batallón del Interior pide más sueldos y más cárceles.",
  "base.atentado_investigado": "La investigación del atentado señala al Ministerio del Interior."
};
/* Lo que te espera, como lo cuenta el informe de inteligencia detrás de la carta del dictador al pasar de era (16 oct):
   sin mecánica del juego (nada de crisis ni umbrales), en el tono del informe. FUTURO se queda para los documentos. */
const PREVISION = {
  "base.juicios_publicos": "Las potencias extranjeras toman nota de los juicios públicos.",
  "base.exiliados_vocales": "Los exiliados hablan cada vez más alto desde fuera.",
  "base.general_popular": "El general Cienfuegos recibe oficiales en su casa.",
  "base.accidente_cienfuegos": "El Pueblo no ha olvidado el accidente del general Cienfuegos.",
  "base.general_apartado": "El general Cienfuegos prepara su regreso.",
  "base.reforma_agraria": "Las cosechas del reparto de tierras no llegarán a tiempo.",
  "base.prensa_libre": "Hay periodistas que siguen haciendo preguntas.",
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
  "base.culto_iniciado": "Los monumentos al Comandante salen cada vez más caros.",
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
  "base.mausoleo_construido": "El mausoleo cuesta una fortuna en mantenimiento.",
  "base.palacio_del_pueblo": "Las deudas del Palacio del Pueblo siguen sin pagarse.",
  "base.estado_policial": "El batallón del Interior pide más sueldo y más cárceles.",
  "base.atentado_investigado": "La investigación del atentado apunta hacia dentro de casa."
};


/* =====================================================
   TUTORIAL (15 oct): «La víspera». El capitán Domingo Cuesta (Fuerzas Armadas) acompaña al Comandante el día
   que entran en la capital. Cada carta enseña una sola cosa; las decisiones no cuentan para la partida.
   - paso: deslizar · girar (no se puede decidir hasta volver a girarla) · fuerzas (se encienden las barras)
           · pistas (puntos rojos de tres tamaños y el Ejército en peligro) · estado (entra «Luna de miel») · guardar · fin
   - arriba habla Cuesta (de usted); la instrucción al jugador va en la cinta (de tú)
   ===================================================== */
const TUTORIAL = [   // texto: lo que Cuesta dice al Comandante (de usted); cinta: la instrucción al jugador (de tú); *así* = negrita
  { paso: "deslizar", texto: "Comandante, la capital es nuestra. ¿Entramos?", cinta: "Arrastra la carta a un lado o al otro para decidir.", izq: "¡Adelante!", der: "Eso ni se pregunta" },
  { paso: "girar", texto: "Antes de entrar, ¿sabe usted quién soy?", girada: "En cada nueva etapa, Interior preparará un expediente. Solo tendrá que girar la carta.", cinta: "Toca la carta para leer su expediente y vuelve a tocarla.", izq: "Claro, Capitán Cuesta", der: "¡Vas bien, Domingo!" },
  { paso: "fuerzas", texto: "Mantenga bajo control las cuatro fuerzas. Si alguna llega al límite, caerá su gobierno.", cinta: "Toca los iconos de arriba para saber más.", izq: "Contentaré a todos", der: "Mano firme" },
  { paso: "pistas", texto: "Por ejemplo, conviene mantener la lealtad del Ejército. No querrá que olviden quién manda.", cinta: "Los puntos rojos indican cuánto afectará tu decisión a cada fuerza.", izq: "Primero el Pueblo, Capitán", der: "No les faltará el ron", efectos: { izq: { pueblo: 24, ejercito: -10 }, der: { ejercito: 24, pueblo: -10 } } },
  // Carta de estado: no hay personaje, así que arriba se habla al jugador. Si no se toca, se guarda sola a los 7 s.
  { paso: "estado", texto: "Tus decisiones tienen efectos a largo plazo." },
  { paso: "guardar", texto: "Esta carta aumenta el apoyo popular, pero tanto amor puede ser peligroso.", cinta: "Toca la casilla de abajo para saber más.", izq: "Por eso el amor se raciona", der: "Disfrutemos mientras dure" },
  { paso: "fin", texto: "La nación aguarda sus primeras palabras. Ha llegado el momento de presentarse.", cinta: "A partir de aquí, gobiernas tú.", izq: "Seré breve: cinco horas", der: "Quiero una paloma en mi hombro" }
];
