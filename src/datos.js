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
  { nombre: "La Purga", min: 6, max: 8, factor: 0.7 },
  { nombre: "El Culto", min: 6, max: 8, factor: 0.75 },
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
    izq: { accion: "Juicio público en el estadio", efectos: { pueblo: 8, ejercito: 4, potencias: -5 }, banderas: ["base.juicios_publicos"] },
    der: { accion: "Tienen 24 horas para irse", efectos: { pueblo: -8, ejercito: -4, potencias: 5 }, banderas: ["base.exiliados_vocales"] }
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
    izq: { accion: "Impriman billetes", efectos: { pueblo: 5, potencias: -5 }, banderas: ["base.mercado_paralelo"] },
    der: { accion: "Pedir préstamo y hacer recortes", efectos: { pueblo: -5, potencias: 5 }, banderas: ["base.deuda_externa"] }
  },
  {
    id: "general_querido", tipo: "ancla", ventana: [1, 3], titulo: "El general querido",
    personaje: "Ministro del Interior",
    texto: "El general Cienfuegos es el más querido del Ejército y pide el Estado Mayor.",
    izq: { accion: "Denle el Estado Mayor", efectos: { ejercito: 9, elite: -4 }, banderas: ["base.general_popular"] },
    der: { accion: "Embajador, lejos del ejército", efectos: { ejercito: -9, elite: 4 }, banderas: ["base.general_apartado"] }
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
    izq: { accion: "Acepto su generosa ayuda", efectos: { potencias: 9, pueblo: 5, ejercito: 4, crisis: 2 }, banderas: ["base.alineado_bloque_oriental"] },
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
    der: { accion: "A la cárcel por orden alfabético", largaAutorizada: true, efectos: { pueblo: -8, ejercito: 5 }, banderas: ["base.criticos_detenidos"] }
  },

  /* ---------- Sorteo ---------- */
  {
    id: "tierra", tipo: "sorteo", peso: 12, titulo: "La tierra",
    personaje: "Ministro de Trabajo",
    texto: "Si repartimos las tierras entre los campesinos, el país será el granero del mundo en un año.",
    izq: { accion: "Respeten la propiedad privada", efectos: { pueblo: -10, elite: -5 } },
    der: { accion: "La tierra para quien la merece", largaAutorizada: true, efectos: { pueblo: 10, elite: 5, potencias: -4, crisis: 1 }, banderas: ["base.reforma_agraria"] }
  },
  {
    id: "periodicos", tipo: "sorteo", peso: 10, titulo: "Los periódicos",
    personaje: "Ministra de Cultura",
    texto: "Los periódicos publican críticas contra cada decreto, uno detrás de otro.",
    izq: { accion: "Que la prensa respire", efectos: { pueblo: 6, elite: -5 }, banderas: ["base.prensa_libre"] },
    der: { accion: "Nacionalicen la imprenta", efectos: { pueblo: -6, elite: 5 }, banderas: ["base.censura_previa"] }
  },
  {
    id: "urnas", tipo: "sorteo", peso: 10, cond: { turnoMin: 2 }, titulo: "Las urnas prometidas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Pueblo recuerda que prometimos elecciones en dieciocho meses. Ya han pasado doce.",
    izq: { accion: "Elecciones en seis meses", efectos: { pueblo: 9, elite: -5 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "La Revolución ya fue votada", efectos: { pueblo: -9, elite: 5 }, banderas: ["base.elecciones_aplazadas"] }
  },
  {
    id: "alfabetizacion", tipo: "sorteo", peso: 6, titulo: "La campaña de alfabetización",
    personaje: "Ministra de Educación",
    texto: "Propongo una campaña de alfabetización: brigadas de jóvenes enseñando a leer en cada rincón.",
    izq: { accion: "Un Pueblo culto y agradecido", efectos: { pueblo: 10 } },
    der: { accion: "Un Pueblo que lee pregunta", efectos: { pueblo: -10 } }
  },
  {
    id: "escuelas", tipo: "sorteo", peso: 6, titulo: "Las escuelas para todos",
    personaje: "Ministra de Educación",
    texto: "Los colegios privados cobran por enseñar. Propongo que todas las escuelas sean del Estado.",
    izq: { accion: "Que todos aprendan lo mismo", efectos: { pueblo: 7, elite: 5 } },
    der: { accion: "Que cada familia elija su escuela", largaAutorizada: true, efectos: { pueblo: -7, elite: -5 } }
  },
  {
    id: "asesores", tipo: "sorteo", peso: 6, cond: { turnoMin: 2 }, titulo: "Los asesores",
    personaje: "Embajador del bloque oriental",
    texto: "Le enviaremos asesores para su economía y su policía. Nos ocuparemos de que todo vaya bien.",
    izq: { accion: "Aprenderemos de los mejores", efectos: { potencias: 9, ejercito: 5, elite: 5 } },
    der: { accion: "Agradecemos, pero no hace falta", largaAutorizada: true, efectos: { potencias: -9, ejercito: -5, elite: -5 } }
  },
  {
    id: "club_golf", tipo: "sorteo", peso: 6, titulo: "El club de golf",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país reconocerá su gobierno si respeta nuestras propiedades, empezando por el club de golf.",
    izq: { accion: "Le reservo el hoyo nueve", efectos: { potencias: 9, pueblo: -8, elite: -4 } },
    der: { accion: "Empezaremos nacionalizando el golf", largaAutorizada: true, efectos: { potencias: -9, pueblo: 8, elite: 4 } }
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
    izq: { accion: "Buen viaje, niños", efectos: { pueblo: 5, ejercito: -4, potencias: 3 } },
    der: { accion: "Nadie se lleva a nuestros niños", largaAutorizada: true, efectos: { pueblo: -5, ejercito: 4, potencias: -3 } }
  },
  {
    id: "reforma_urbana", tipo: "sorteo", peso: 6, titulo: "La reforma urbana",
    personaje: "Ministro de Economía",
    texto: "Que los inquilinos dejen de pagar al casero: el Estado cobrará la mitad y la casa será suya.",
    izq: { accion: "Cada casa, para quien la vive", efectos: { pueblo: 8, elite: 4 } },
    der: { accion: "Los contratos se respetan", efectos: { pueblo: -8, elite: -4 } }
  },
  {
    id: "milicias", tipo: "sorteo", peso: 6, titulo: "Las milicias",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los barrios piden fusiles para defender la Revolución por su cuenta.",
    izq: { accion: "Milicias en cada barrio", efectos: { pueblo: 6, ejercito: -6 } },
    der: { accion: "Las armas solo para los soldados", largaAutorizada: true, efectos: { pueblo: -6, ejercito: 6 } }
  },
  {
    id: "mil_flores", tipo: "sorteo", peso: 6, cond: { sin: ["base.censura_previa"] }, titulo: "Las mil flores",
    personaje: "Ministra de Cultura",
    texto: "Los intelectuales preguntan hasta dónde pueden criticar a la Revolución.",
    izq: { accion: "Que critiquen lo que quieran", efectos: { pueblo: 8, elite: -5 }, banderas: ["base.critica_abierta"],
           encolar: [{ carta: "depuracion_criticos", min: 3, max: 3 }] },
    der: { accion: "La Revolución no se cuestiona", efectos: { pueblo: -8, elite: 5 } }
  },
  {
    id: "oficiales", tipo: "sorteo", peso: 10, titulo: "Los oficiales de antes",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los oficiales del antiguo régimen siguen al mando de la mitad de los cuarteles.",
    izq: { accion: "Jubílenlos", efectos: { ejercito: -5, crisis: 1 }, banderas: ["base.viejos_oficiales"] },
    der: { accion: "¡Al paredón!", efectos: { ejercito: 5, pueblo: 4 }, banderas: ["base.purga_inicial"] }
  },
  {
    id: "puerto", tipo: "sorteo", peso: 8, cond: { turnoMin: 3 }, titulo: "El puerto parado",
    personaje: "Ministro de Trabajo",
    texto: "El puerto lleva tres días parado. Los estibadores no quieren que el Partido elija a sus líderes.",
    izq: { accion: "Que se organicen libremente", efectos: { pueblo: 10, elite: -7, ejercito: -4, crisis: 1 }, banderas: ["base.sindicato_libre"] },
    der: { accion: "La huelga es contrarrevolución", efectos: { pueblo: -10, elite: 7, ejercito: 4 }, banderas: ["base.huelga_reprimida"] }
  },
  {
    id: "ojos_barrio", tipo: "sorteo", peso: 14, cond: { alguna: ["base.purga_inicial", "base.censura_previa"] }, titulo: "Los ojos del barrio",
    personaje: "Ministro del Interior",
    texto: "Los contrarrevolucionarios se esconden en los barrios. Los vecinos podrían ayudarnos a encontrarlos.",
    izq: { accion: "Vecino vigila vecino", efectos: { ejercito: 6, elite: 4, pueblo: -7 }, banderas: ["base.comites_vigilancia"] },
    der: { accion: "No necesitamos chivatos", efectos: { pueblo: 7, ejercito: -6, elite: -4 }, banderas: ["base.policia_tradicional"] }
  },
  {
    id: "retrato", tipo: "sorteo", peso: 6, cond: { turnoMin: 4 }, titulo: "El retrato",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido quiere su retrato en cada aula y una estatua en la plaza.",
    izq: { accion: "Si insisten…", efectos: { pueblo: -3, elite: 6, crisis: 1 }, banderas: ["base.culto_iniciado"] },
    der: { accion: "Los monumentos son para los mártires", largaAutorizada: true, efectos: { pueblo: 3, elite: -6 }, banderas: ["base.modestia_aparente"] }
  },
  {
    id: "marchan", tipo: "sorteo", peso: 14, cond: { alguna: ["base.reforma_agraria", "base.nacionalizo_empresas"] }, titulo: "Los que se marchan",
    personaje: "Ministro del Interior",
    texto: "Los ricos hacen cola en el aeropuerto. Dicen que vuelven en cuanto caiga la Revolución.",
    izq: { accion: "Que se vayan, sin el dinero", efectos: { pueblo: 7, potencias: 4, crisis: -1 }, banderas: ["base.exodo_elite"] },
    der: { accion: "Nadie sale sin permiso", efectos: { ejercito: 6, pueblo: -7, potencias: -4 }, banderas: ["base.frontera_cerrada"] }
  },

  /* ---------- Crisis (borrador) ---------- */
  {
    id: "crisis_factura", tipo: "crisis", repetible: true, borrador: true, disparo: e => e.crisis >= 4, titulo: "La factura",
    personaje: "Ministro de Economía",
    texto: "Hemos prometido demasiado y no queda dinero. Los precios se disparan y el Pueblo protesta.",
    izq: { accion: "Precios congelados por decreto", efectos: { pueblo: 8, elite: 5, crisis: -3 }, banderas: ["base.mercado_paralelo"] },
    der: { accion: "Otro préstamo y ya veremos", efectos: { potencias: 8, pueblo: -3, crisis: -3 }, banderas: ["base.deuda_externa"] }
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
    izq: { accion: "Un ascenso por cada traición evitada", largaAutorizada: true, efectos: { ejercito: 8, elite: -4 } },
    der: { accion: "Calabozo para esos oficiales", largaAutorizada: true, efectos: { ejercito: -6, pueblo: -3, crisis: 2 } }
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
    texto: "Para el aniversario de la Revolución, el Ejército pide tanques y el Pueblo ron. No hay para ambos.",
    izq: { accion: "Que aplaudan a los tanques", efectos: { ejercito: 8, elite: 4, pueblo: -7, crisis: 1 }, banderas: ["base.desfile_militar"] },
    der: { accion: "Repartan ron en mi nombre", efectos: { pueblo: 7, ejercito: -8, elite: -4 } }
  },

  {
    id: "nuevos_vecinos", tipo: "ancla", ventana: [8, 10], cond: { requiere: ["base.alineado_bloque_oriental"] }, titulo: "Los nuevos vecinos",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país le ofrece misiles, instalados y apuntando a donde usted diga.",
    izq: { accion: "Ahora sí nos respetarán", efectos: { ejercito: 6, potencias: 5, pueblo: -4, crisis: 2 }, banderas: ["base.misiles_instalados"], encolar: [{ carta: "ultimatum", min: 1, max: 2 }] },
    der: { accion: "Nuestro misil es el Pueblo", efectos: { ejercito: -6, potencias: -5, pueblo: 4 }, banderas: ["base.misiles_rechazados"] }
  },

  {
    id: "ultimatum", tipo: "cola", titulo: "El ultimátum",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestros barcos rodearán su costa hasta que retire los misiles.",
    izq: { accion: "Que disfruten de la vista", efectos: { ejercito: 6, potencias: -6, pueblo: -3, crisis: 2 }, banderas: ["base.embargo_en_marcha"] },
    der: { accion: "Tranquilo, los retiraremos", efectos: { ejercito: -6, potencias: 6, crisis: -1 } }
  },

  {
    id: "mano_norte", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.no_alineado"] }, titulo: "La mano del norte",
    personaje: "Embajador de la potencia del norte",
    texto: "Le daremos créditos y comercio si se porta bien y nos deja auditarle.",
    izq: { accion: "Será un honor rendir cuentas", efectos: { potencias: 8, elite: 5, pueblo: -5, crisis: 1 }, banderas: ["base.deuda_externa"] },
    der: { accion: "Aquí solo audita el Pueblo", efectos: { potencias: -8, pueblo: 6, elite: -4 } }
  },

  {
    id: "potencias_enfadan", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.juicios_publicos"] }, titulo: "Las potencias se enfadan",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país pide garantías para los acusados de sus juicios públicos que aún esperan sentencia.",
    izq: { accion: "Tendrán abogados «de confianza»", efectos: { potencias: 7, pueblo: -6, elite: 3 } },
    der: { accion: "Los juicios son asunto nuestro", efectos: { potencias: -7, ejercito: 5, elite: -3 } }
  },

  {
    id: "voz_exilio", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.exiliados_vocales"] }, titulo: "La voz del exilio",
    personaje: "Ministra de Cultura",
    texto: "Los exiliados denuncian por radio la censura y las cárceles, y media capital los escucha.",
    izq: { accion: "Apagón donde llegue la señal", efectos: { pueblo: -6, ejercito: 4, elite: 3 } },
    der: { accion: "Son agentes del imperialismo", efectos: { pueblo: 5, potencias: 4, elite: -3 } }
  },

  {
    id: "general_murmura", tipo: "sorteo", peso: 14, cond: { requiere: ["base.general_popular"], barraMax: { ejercito: 40 } }, titulo: "El general murmura",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "El general Cienfuegos recibe oficiales en su casa. Dicen que habla de usted en pasado.",
    izq: { accion: "Pregúntenle por sus hijos", efectos: { ejercito: -3, crisis: 1 } },
    der: { accion: "Que tenga un accidente heroico", efectos: { ejercito: -6, pueblo: -4, elite: 3 }, banderas: ["base.accidente_cienfuegos"] }
  },

  {
    id: "hambre", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.reforma_agraria"] }, titulo: "El hambre",
    personaje: "Ministro de Trabajo",
    texto: "Los campesinos tienen tierra, pero no semillas ni tractores. La cosecha ha caído a la mitad.",
    izq: { accion: "La culpa es del imperialismo", efectos: { pueblo: -6, elite: 3, crisis: -1 } },
    der: { accion: "Importen la canasta básica", efectos: { pueblo: 6, potencias: 5, crisis: 2 } }
  },

  {
    id: "periodista_oficial", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.censura_previa"] }, titulo: "El periodista oficial",
    personaje: "Ministra de Cultura",
    texto: "Nadie cree los periódicos, pero sí los rumores. Propongo un periodista oficial que los desmienta.",
    izq: { accion: "Nombren un Vocero de la Verdad", largaAutorizada: true, efectos: { pueblo: -5, elite: 5, ejercito: 3 }, banderas: ["base.periodista_oficial"] },
    der: { accion: "Apunten quién los repite", efectos: { pueblo: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "garantias", tipo: "sorteo", peso: 14, cond: { requiere: ["base.negocio_refinerias"] }, titulo: "Las garantías",
    personaje: "Ministro de Comercio",
    texto: "Las empresas extranjeras quieren por escrito que no habrá más nacionalizaciones y que podrán llevarse sus ganancias.",
    izq: { accion: "Palabra de revolucionario", efectos: { potencias: 6, elite: -4, pueblo: -5, crisis: -1 } },
    der: { accion: "Aquí no se firma nada", efectos: { potencias: -6, pueblo: 4, elite: 4, crisis: 1 } }
  },

  {
    id: "elecciones_controladas", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_prometidas"] }, titulo: "Elecciones controladas",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Las elecciones prometidas están a la vista. El Partido propone una lista única para evitar confusiones.",
    izq: { accion: "Lista única.", remate: "El Pueblo no necesita elegir entre nosotros.", efectos: { pueblo: -6, elite: 5, ejercito: 3 } },
    der: { accion: "Varias listas.", remate: "Que voten libremente. El resultado ya está claro.", efectos: { pueblo: 6, potencias: 5, elite: -5, ejercito: -3 } }
  },

  {
    id: "estudiantes_calle", tipo: "sorteo", peso: 14, cond: { requiere: ["base.elecciones_aplazadas"] }, titulo: "Estudiantes en la calle",
    personaje: "Ministra de Educación",
    texto: "Los estudiantes ocupan la universidad y exigen las elecciones que usted aplazó.",
    izq: { accion: "Habrá elecciones, universitarias", efectos: { pueblo: 5, elite: -4 }, banderas: ["base.elecciones_prometidas"] },
    der: { accion: "¿Elecciones para qué?", efectos: { pueblo: -6, ejercito: 4 }, banderas: ["base.estudiantes_reprimidos"] }
  },

  {
    id: "club_ajedrez", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.viejos_oficiales"] }, titulo: "El club de ajedrez",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "Los oficiales jubilados tienen un «club de ajedrez». No juegan al ajedrez.",
    izq: { accion: "Arresto domiciliario para todos", efectos: { ejercito: -6, elite: 3, potencias: -3 } },
    der: { accion: "Vigilen cada movimiento", efectos: { ejercito: 6, elite: -3, crisis: 1 } }
  },

  {
    id: "jefe_poder", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.purga_inicial"] }, titulo: "El jefe pide más",
    personaje: "Ministro del Interior",
    texto: "Propongo crear una unidad que vigile a la propia policía. La dirigiría yo.",
    izq: { accion: "Autorizo la unidad especial", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.jefe_poderoso"] },
    der: { accion: "Denegado", efectos: { ejercito: -8, pueblo: 4, elite: 5 } }
  },

  {
    id: "huelgas_crisis", tipo: "sorteo", peso: 14, cond: { requiere: ["base.sindicato_libre"] }, titulo: "La marcha de los eléctricos",
    personaje: "Ministro de Trabajo",
    texto: "Los electricistas marchan hacia el palacio. Exigen un sindicato independiente del Partido.",
    izq: { accion: "La Revolución respeta sus deseos", efectos: { pueblo: 6, elite: -4, crisis: 2 } },
    der: { accion: "Que marchen hasta la cárcel", efectos: { pueblo: -6, ejercito: 4, elite: 4 } }
  },

  {
    id: "universidades", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.huelga_reprimida"] }, titulo: "Panfletos en la universidad",
    personaje: "Ministra de Educación",
    texto: "Los hijos de los estibadores reparten panfletos en la universidad. Recuerdan lo del puerto.",
    izq: { accion: "Sus compañeros los educarán", efectos: { pueblo: 6, elite: -4, crisis: 1 } },
    der: { accion: "Expúlsenlos, a cortar caña", efectos: { pueblo: -6, ejercito: 5, potencias: -3 } }
  },

  {
    id: "denuncias_falsas", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.comites_vigilancia", "base.purga_inicial", "base.criticos_detenidos"] }, titulo: "Denuncias falsas",
    personaje: "Ministro del Interior",
    texto: "Los comités reciben mil denuncias al día. Muchas son falsas: vecinos que se acusan por un balcón o una gallina.",
    izq: { accion: "Investigarlas todas.", remate: "Más vale investigar a cien inocentes que dejar escapar a un enemigo.", efectos: { ejercito: 6, pueblo: -7, elite: 2 } },
    der: { accion: "Castigar las falsas.", remate: "La Revolución necesita confidentes, no bromistas.", efectos: { pueblo: 7, ejercito: -5, elite: -2 } }
  },

  {
    id: "oposicion_firma", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.policia_tradicional", "base.exiliados_vocales", "base.critica_abierta"] }, titulo: "Una carta con firmas",
    personaje: "Ministra de Cultura",
    texto: "Intelectuales han firmado una carta pidiendo respetar los derechos que usted mismo prometió.",
    izq: { accion: "Recibir a los firmantes.", remate: "Quiero conocer a los que creen que eso depende de mí.", efectos: { pueblo: 6, potencias: 5, ejercito: -5, elite: -3 } },
    der: { accion: "Prohibir la carta.", remate: "No permitiré que cuatro firmas aparenten dividir al Pueblo.", efectos: { pueblo: -6, ejercito: 5, potencias: -5, elite: 3 } }
  },

  {
    id: "faltan_tecnicos", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.exodo_elite", "base.juicios_publicos", "base.nacionalizo_empresas"] }, titulo: "Faltan técnicos",
    personaje: "Ministro de Economía",
    texto: "Se han ido ingenieros, médicos y contables. Las fábricas funcionan por pura voluntad.",
    izq: { accion: "Contratar extranjeros.", remate: "La Revolución necesita profesionales, no importa el pasaporte.", efectos: { potencias: 6, elite: -4, crisis: 1, pueblo: 1 } },
    der: { accion: "Formar a los fieles.", remate: "Primero lealtad; el oficio se aprende después.", efectos: { elite: 5, pueblo: -1, ejercito: 2 } }
  },

  {
    id: "intentos_fuga", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.frontera_cerrada", "base.criticos_detenidos", "base.exiliados_vocales"] }, titulo: "Intentos de fuga",
    personaje: "Ministro del Interior",
    texto: "Tres familias intentaron cruzar la frontera en una barca. Una era la de un viceministro.",
    izq: { accion: "Reforzar la frontera.", remate: "Quien abandona la Patria debe explicar por qué.", efectos: { ejercito: 6, potencias: -5, pueblo: -5 } },
    der: { accion: "Amnistía a quien vuelva.", remate: "Que vuelvan; aún tenemos preguntas para ellos.", efectos: { pueblo: 6, potencias: 4, ejercito: -6 } }
  },

  {
    id: "embargo_total", tipo: "sorteo", peso: 14, cond: { turnoMin: 6, alguna: ["base.embargo_en_marcha", "base.nacionalizo_empresas"] }, titulo: "Embargo total",
    personaje: "Ministro de Comercio",
    texto: "El embargo ya es total: no entran comida, medicinas ni repuestos.",
    izq: { accion: "Cartilla de racionamiento", efectos: { pueblo: -4, elite: -1, crisis: -1 } },
    der: { accion: "Compren por terceros países", efectos: { pueblo: 4, elite: 1, potencias: -3, crisis: 1 } }
  },

  {
    id: "deuda_llama", era: 2, tipo: "sorteo", peso: 14, cond: { alguna: ["base.compensaciones", "base.deuda_externa"] }, titulo: "La deuda llama",
    personaje: "Ministro de Economía",
    texto: "Mañana vence el primer pago de las compensaciones. En caja hay menos de lo prometido.",
    izq: { accion: "Pagar la cuota.", remate: "La Revolución cumple cuando le conviene.", efectos: { potencias: 6, elite: 3, pueblo: -7, crisis: -2 } },
    der: { accion: "Pedir prórroga.", remate: "La Historia puede esperar; los acreedores tendrán que aprender.", efectos: { potencias: -6, crisis: 3, elite: -3 } }
  },

  {
    id: "plan_quinquenal", era: 3, tipo: "sorteo", peso: 8, titulo: "El plan quinquenal",
    personaje: "Ministro de Economía",
    texto: "Proponemos un plan quinquenal con metas para cada fábrica, granja y tienda.",
    izq: { accion: "Plan quinquenal.", remate: "El éxito de la Revolución empieza por escribirlo.", efectos: { elite: 5, pueblo: -4, crisis: 2 } },
    der: { accion: "Dejar al mercado.", remate: "El mercado funciona mientras haga lo que se le dice.", efectos: { pueblo: 4, potencias: 4, elite: -4 } }
  },

  {
    id: "cosecha_record", era: 2, tipo: "sorteo", peso: 8, titulo: "La cosecha récord",
    personaje: "Ministro de Trabajo",
    texto: "La cosecha es récord, según los informes. Los almacenes, curiosamente, están vacíos.",
    izq: { accion: "Proclamar el récord.", remate: "El Pueblo no come estadísticas, pero escucha las noticias.", efectos: { pueblo: 5, elite: 3, crisis: 2 } },
    der: { accion: "Pedir cifras reales.", remate: "Quiero saber cuánto falta antes de decidir a quién culpar.", efectos: { pueblo: -4, elite: -4, crisis: -1 } }
  },

  {
    id: "el_espia", era: 2, tipo: "sorteo", peso: 8, titulo: "El diplomático curioso",
    personaje: "Ministro del Interior",
    texto: "Detuvimos a un diplomático con un mapa de los cuarteles. Dice que es turista.",
    izq: { accion: "Expulsarlo.", remate: "Que visite otro país. Aquí ya ha visto demasiado.", efectos: { potencias: -5, ejercito: 5 } },
    der: { accion: "Intercambiarlo.", remate: "La Patria también puede negociar con sus enemigos.", efectos: { potencias: 5, ejercito: -5, elite: 2 } }
  },

  {
    id: "los_chistes", era: 2, tipo: "sorteo", peso: 8, titulo: "Los chistes",
    personaje: "Ministra de Cultura",
    texto: "Circula un chiste sobre usted por todas las oficinas. Al final, todos miran al techo.",
    izq: { accion: "Tribunal del humor.", remate: "Quiero saber quién se ríe cuando cree que nadie lo escucha.", efectos: { pueblo: -6, ejercito: 4, elite: 2 } },
    der: { accion: "Contar uno mejor.", remate: "El mejor chiste sobre un dictador es el que todos aplauden.", efectos: { pueblo: 5, ejercito: -3, elite: -2 } }
  },
  /* ---------- Era 3 · Culto ---------- (tratamiento: «Excelencia»; límites: mensaje ≤150 caracteres, acción ≤5 palabras, remate ≤75) */
  {
    id: "el_monumento", era: 3, tipo: "ancla", ventana: [1, 3], cond: { requiere: ["base.culto_iniciado"] }, titulo: "El monumento",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido ha diseñado un monumento de cuarenta metros en su honor. Se verá desde todos los barrios y desde la costa.",
    izq: { accion: "Monumento colosal.", remate: "Me conmueve que el Pueblo me vea como a un padre.", efectos: { elite: 7, pueblo: -6, crisis: 2 }, banderas: ["base.monumento_colosal"], encolar: [{ carta: "pedestal", min: 2, max: 3 }] },
    der: { accion: "Monumento modesto.", remate: "El Pueblo no necesita mármol para saber quién lo protege.", efectos: { elite: -7, pueblo: 6 }, banderas: ["base.monumento_modesto"] }
  },
  {
    id: "pedestal", era: 3, tipo: "cola", titulo: "El pedestal",
    personaje: "Ministro de Economía",
    texto: "El pedestal costó el doble de lo previsto y el bronce llegó incompleto: la estatua tiene un solo brazo.",
    izq: { accion: "Terminar la estatua.", remate: "El Padre de la Patria no puede aparecer manco.", efectos: { elite: 5, pueblo: -6, crisis: 2 } },
    der: { accion: "Dejarla con un brazo.", remate: "Un gesto de humildad también educa al Pueblo.", efectos: { elite: -5, pueblo: 6, crisis: -1 } }
  },
  {
    id: "modestia_sospechosa", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.modestia_aparente"] }, titulo: "La modestia sospechosa",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su rechazo a los retratos se ha interpretado como falsa humildad. El Partido propone una gran demostración de lealtad.",
    izq: { accion: "Aceptar la demostración.", remate: "No quiero contrariar al Pueblo en una muestra de cariño.", efectos: { elite: 6, ejercito: 3, pueblo: -5 } },
    der: { accion: "Insistir en la modestia.", remate: "La lealtad verdadera no necesita tantas ceremonias.", efectos: { elite: -6, ejercito: -3, pueblo: 5 } }
  },
  {
    id: "desfile_anual", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.desfile_militar"] }, titulo: "El desfile del año",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "El Ejército espera un desfile mayor que el del año pasado: más tanques, más soldados y, por tradición, caballería.",
    izq: { accion: "Desfile aún mayor.", remate: "El Pueblo debe ver que la Revolución sigue fuerte.", efectos: { ejercito: 8, elite: 3, pueblo: -7, crisis: 2 } },
    der: { accion: "El mismo desfile.", remate: "La fuerza de la Revolución no se mide en tanques.", efectos: { ejercito: -8, elite: -3, pueblo: 7 } }
  },
  {
    id: "satelites", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_instalados"] }, titulo: "Los satélites",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestros satélites siguen contando sus misiles y pedimos una inspección. Aceptarla evitaría un incidente mayor.",
    izq: { accion: "Permitir la inspección.", remate: "Que inspeccionen; para entonces ya habremos hecho el cambio.", efectos: { potencias: 8, ejercito: -7, elite: 2 } },
    der: { accion: "Negarse.", remate: "La soberanía no se inspecciona.", efectos: { potencias: -8, ejercito: 7, elite: -2, crisis: 1 } }
  },
  {
    id: "aliado_enfadado", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.misiles_rechazados"] }, titulo: "El aliado enfadado",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro país recuerda que rechazó los misiles. Reduciremos el petróleo hasta que su amistad sea más clara.",
    izq: { accion: "Pedir disculpas.", remate: "Una amistad duradera también exige saber pedir perdón.", efectos: { potencias: 8, pueblo: -6, ejercito: -2 } },
    der: { accion: "Buscar otro proveedor.", remate: "El petróleo no tiene ideología, solo precio.", efectos: { potencias: -8, pueblo: 6, ejercito: 2, crisis: 1 } }
  },
  {
    id: "jefe_insaciable", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.jefe_poderoso"] }, titulo: "El jefe insaciable",
    personaje: "Ministro del Interior",
    texto: "Mi unidad especial necesita su propio batallón, su propia cárcel y un presupuesto que no figure en ningún presupuesto.",
    izq: { accion: "Autorizar el batallón.", remate: "Quiero que tengan todo lo necesario para proteger la Revolución.", efectos: { ejercito: 8, elite: -5, pueblo: -4 }, banderas: ["base.estado_policial"] },
    der: { accion: "Recortarle el presupuesto.", remate: "Que vigilen al Pueblo sin crear un gobierno dentro del Gobierno.", efectos: { ejercito: -8, elite: 5, pueblo: 4 } }
  },
  {
    id: "aulas_vacias", era: 3, tipo: "sorteo", peso: 14, cond: { alguna: ["base.estudiantes_reprimidos", "base.huelga_reprimida"] }, titulo: "Las aulas vacías",
    personaje: "Ministra de Educación",
    texto: "La universidad sigue vacía y circulan apuntes clandestinos. Algunos profesores enseñan historia sin citarle a usted.",
    izq: { accion: "Exigir lealtad a profesores.", remate: "Las notas medirán tanto los conocimientos como la lealtad.", efectos: { elite: 5, ejercito: 3, pueblo: -6 } },
    der: { accion: "Reabrir las facultades.", remate: "La Revolución necesita aulas llenas, no héroes universitarios.", efectos: { pueblo: 6, elite: -5, ejercito: -3 } }
  },
  {
    id: "titulares", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.periodista_oficial"] }, titulo: "Los titulares",
    personaje: "Ministra de Cultura",
    texto: "El periódico oficial pide titulares más generosos con usted. Ayer solo le dedicó tres páginas.",
    izq: { accion: "Seis páginas diarias.", remate: "El Pueblo merece seis páginas diarias de buenas noticias.", efectos: { elite: 6, ejercito: 2, pueblo: -5 } },
    der: { accion: "Tres páginas bastan.", remate: "El Pueblo ya conoce mi obra; no hace falta repetirla tanto.", efectos: { elite: -6, ejercito: -2, pueblo: 5 } }
  },
  {
    id: "presos_agenda", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.criticos_detenidos"] }, titulo: "Los presos en la agenda",
    personaje: "Embajador de la potencia del norte",
    texto: "Una organización extranjera publica la lista de sus presos políticos. Nuestro país pide su liberación como gesto de buena voluntad.",
    izq: { accion: "Liberar a algunos.", remate: "Liberemos a los más ancianos para no gastar en entierros.", efectos: { potencias: 8, ejercito: -6, elite: -2 } },
    der: { accion: "Negar que existan.", remate: "En mi país no hay presos políticos, solo ciudadanos confundidos.", efectos: { potencias: -8, ejercito: 6, elite: 2 } }
  },
  {
    id: "acreedor_favores", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.deuda_externa"] }, titulo: "El acreedor pide favores",
    personaje: "Ministro de Economía",
    texto: "El acreedor aplazará el pago a cambio de un favor: nuestro voto en los foros internacionales durante años.",
    izq: { accion: "Vender nuestro voto.", remate: "La diplomacia también sirve para pagar deudas.", efectos: { potencias: 8, elite: 3, pueblo: -5, crisis: -2 } },
    der: { accion: "Pagar con lo que haya.", remate: "La Revolución honra sus deudas, aunque el Pueblo pague la cuenta.", efectos: { potencias: -8, elite: -3, pueblo: 5, crisis: 2 } }
  },
  {
    id: "mercado_mayor", era: 3, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mercado_paralelo"] }, titulo: "El mercado mayor",
    personaje: "Ministro de Comercio",
    texto: "El mercado paralelo vende más que las tiendas del Estado. Algunos funcionarios ya cobran en especie y otros, en dólares.",
    izq: { accion: "Legalizar el mercado.", remate: "Si el Pueblo compra allí, será mejor que tribute aquí.", efectos: { pueblo: 6, elite: -4, ejercito: -2, crisis: -1 } },
    der: { accion: "Perseguir a los vendedores.", remate: "La escasez también debe tener licencia.", efectos: { pueblo: -6, elite: 4, ejercito: 2, crisis: 1 } }
  },

  {
    id: "ciudad_con_nombre", era: 3, tipo: "sorteo", peso: 10, titulo: "La ciudad con su nombre",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "La capital merece un nombre a su altura. El Partido propone sustituir el actual por el suyo, con avenida incluida.",
    izq: { accion: "Rebautizar la capital.", remate: "Que el Pueblo pueda pronunciar mi nombre al pedir una dirección.", efectos: { elite: 6, pueblo: -5, ejercito: 2 }, banderas: ["base.capital_rebautizada"] },
    der: { accion: "Solo una avenida.", remate: "Una avenida recuerda a un hombre; una capital pertenece al Pueblo.", efectos: { elite: -6, pueblo: 5, ejercito: -2 } }
  },
  {
    id: "himno_nuevo", era: 3, tipo: "sorteo", peso: 10, titulo: "El himno nuevo",
    personaje: "Ministra de Cultura",
    texto: "El himno nacional no le menciona. Proponemos una versión con cuarenta estrofas, treinta sobre usted.",
    izq: { accion: "Himno de cuarenta estrofas.", remate: "El Pueblo necesita tiempo para aprender a agradecer.", efectos: { elite: 5, ejercito: 3, pueblo: -6 } },
    der: { accion: "Solo el estribillo.", remate: "Mi nombre en el estribillo bastará para que nadie lo olvide.", efectos: { elite: -5, ejercito: -3, pueblo: 6 } }
  },
  {
    id: "libro_texto", era: 3, tipo: "sorteo", peso: 10, titulo: "El libro de texto",
    personaje: "Ministra de Educación",
    texto: "Proponemos un libro con su vida y sus pensamientos, obligatorio en todas las escuelas y para obtener el carné de conducir.",
    izq: { accion: "Libro obligatorio.", remate: "Quien no lo apruebe no sabrá de qué le acusan.", efectos: { elite: 5, ejercito: 3, pueblo: -6 }, banderas: ["base.libro_obligatorio"] },
    der: { accion: "Libro opcional.", remate: "Si es bueno, se leerá; y si no, también.", efectos: { elite: -5, ejercito: -3, pueblo: 6 } }
  },
  {
    id: "cumpleanos", era: 3, tipo: "sorteo", peso: 10, titulo: "El cumpleaños nacional",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido propone declarar fiesta nacional el día de su cumpleaños, con desfile, discursos y un día libre para todos.",
    izq: { accion: "Fiesta nacional.", remate: "Un día al año para que el Pueblo celebre a quien lo protege.", efectos: { pueblo: 6, elite: 3, ejercito: -3, crisis: 2 } },
    der: { accion: "Cumpleaños privado.", remate: "Prefiero que el Pueblo celebre nuestras conquistas, no mi cumpleaños.", efectos: { pueblo: -6, elite: -3, ejercito: 3, crisis: -1 } }
  },
  {
    id: "biografia", era: 3, tipo: "sorteo", peso: 10, titulo: "La biografía oficial",
    personaje: "Ministra de Cultura",
    texto: "Algunos historiadores dicen que usted no hizo la Revolución, sino que llegó al final. La biografía oficial está lista.",
    izq: { accion: "Reescribir la biografía.", remate: "La Historia la escriben los vencedores, y nosotros vencimos.", efectos: { elite: 5, pueblo: -5, ejercito: 2 } },
    der: { accion: "Dejarla como está.", remate: "La Historia sabrá poner cada nombre en su sitio.", efectos: { elite: -5, pueblo: 5, ejercito: -2 } }
  },
  {
    id: "mausoleo", era: 3, tipo: "sorteo", peso: 8, titulo: "El mausoleo",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido ruega prever un mausoleo para cuando le llegue la hora. Los embalsamadores ya están en nómina.",
    izq: { accion: "Construir el mausoleo.", remate: "La Historia merece un lugar donde visitarme.", efectos: { elite: 5, pueblo: -5, crisis: 2 }, banderas: ["base.mausoleo_construido"] },
    der: { accion: "Sepultura sencilla.", remate: "No hace falta pensar en mi tumba mientras sigo dando órdenes.", efectos: { elite: -5, pueblo: 5, crisis: -1 } }
  },
  {
    id: "palacio_pueblo", era: 3, tipo: "sorteo", peso: 10, titulo: "El palacio del Pueblo",
    personaje: "Ministro de Economía",
    texto: "El nuevo palacio costará cinco años de presupuesto y exige derribar tres barrios enteros.",
    izq: { accion: "Derribar los barrios.", remate: "Una gran Revolución necesita un palacio a su altura.", efectos: { elite: 6, ejercito: 2, pueblo: -8, crisis: 3 }, banderas: ["base.palacio_del_pueblo"] },
    der: { accion: "Buscar otro solar.", remate: "El palacio puede esperar; los vecinos viven ahí.", efectos: { elite: -6, ejercito: -2, pueblo: 8, crisis: -1 } }
  },
  {
    id: "zafra_diez_millones", era: 2, tipo: "sorteo", peso: 10, cond: { turnoMin: 4 }, titulo: "La zafra de los diez millones",
    personaje: "Ministro de Trabajo",
    texto: "Para batir el récord de la zafra proponemos movilizar durante tres meses a estudiantes, oficinistas y soldados.",
    izq: { accion: "Todos a la zafra.", remate: "El que corta caña no conspira.", efectos: { pueblo: -6, ejercito: 3, elite: 3, crisis: -1 } },
    der: { accion: "Contratar jornaleros.", remate: "La Revolución también puede pagar a quien trabaja.", efectos: { pueblo: 6, ejercito: -3, elite: -3, crisis: 1 } }
  },
  {
    id: "sucesion", era: 3, tipo: "sorteo", peso: 8, titulo: "La sucesión",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "El Partido pregunta quién le sucederá. Si no lo designa usted, algunos ministros empezarán a designarse solos.",
    izq: { accion: "Designar sucesor.", remate: "El sucesor debe aprender a esperar; yo tuve que hacerlo.", efectos: { elite: 6, ejercito: -5, potencias: 2 }, banderas: ["base.sucesor_designado"] },
    der: { accion: "Sin sucesor.", remate: "Un líder eterno no necesita explicar quién viene después.", efectos: { elite: -6, ejercito: 5, potencias: -2 } }
  },
  {
    id: "beso_fraterno", era: 3, tipo: "sorteo", peso: 8, titulo: "El beso fraterno",
    personaje: "Embajador del bloque oriental",
    texto: "Nuestro máximo dirigente desea un abrazo fraternal con usted ante las cámaras. Será una foto para la Historia.",
    izq: { accion: "Abrazo y beso.", remate: "Que la Historia vea que la Revolución tiene amigos poderosos.", efectos: { potencias: 7, pueblo: -5, elite: -2 } },
    der: { accion: "Apretón de manos.", remate: "Una mano firme también puede estrecharse sin besar.", efectos: { potencias: -7, pueblo: 5, elite: 2 } }
  },
  {
    id: "viaje_oficial", era: 3, tipo: "sorteo", peso: 8, titulo: "El viaje oficial",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro presidente le invita a una visita oficial de dos semanas, con cenas, desfiles y un acuerdo comercial preparado.",
    izq: { accion: "Aceptar el viaje.", remate: "Dos semanas de aplausos extranjeros valen un par de riesgos.", efectos: { potencias: 8, elite: 3, ejercito: -7 } },
    der: { accion: "Quedarse en el país.", remate: "El Pueblo no puede pasar dos semanas sin escucharme.", efectos: { potencias: -8, elite: -3, ejercito: 7 } }
  },
  {
    id: "el_atentado", era: 3, tipo: "ancla", ventana: [5, 7], titulo: "El atentado",
    personaje: "Ministro del Interior",
    texto: "Una bomba ha estallado cerca del palacio, sin heridos. Podemos investigarla o culpar a la oposición.",
    izq: { accion: "Culpar a la oposición.", remate: "La Revolución no desperdicia una buena conspiración.", efectos: { ejercito: 8, pueblo: -6, potencias: -2 }, banderas: ["base.oposicion_culpada"], encolar: [{ carta: "la_investigacion", min: 1, max: 2 }] },
    der: { accion: "Investigar de verdad.", remate: "Una investigación honesta podría dejarnos sin culpables.", efectos: { ejercito: -8, pueblo: 6, potencias: 2 }, banderas: ["base.atentado_investigado"] }
  },
  {
    id: "la_investigacion", era: 3, tipo: "cola", titulo: "La investigación",
    personaje: "Ministro del Interior",
    texto: "Los detenidos por el atentado lo niegan. Dos tienen coartada y uno, incluso, certificado de defunción.",
    izq: { accion: "Mantener la acusación.", remate: "Los certificados de defunción también confiesan.", efectos: { ejercito: 6, pueblo: -5, potencias: -3 } },
    der: { accion: "Liberar a los acusados.", remate: "Liberarlos sería reconocer un error, y la Revolución no se equivoca.", efectos: { ejercito: -6, pueblo: 5, potencias: 3 } }
  },
  {
    id: "flores_mar", era: 2, tipo: "sorteo", peso: 14, cond: { requiere: ["base.accidente_cienfuegos"] }, titulo: "Las flores en el mar",
    personaje: "Ministro del Interior",
    texto: "Cada año más gente tira flores al mar el día del accidente de Cienfuegos.",
    izq: { accion: "Declaren la playa zona militar", efectos: { ejercito: 6, pueblo: -6 } },
    der: { accion: "Encabezaré yo los homenajes", efectos: { pueblo: 6, ejercito: -6 } }
  },
  /* ---------- Era 4 · La Supervivencia ---------- (última era; tratamiento: «Padre de la Patria»; mismos límites de longitud) */
  {
    id: "el_reportaje", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.prensa_libre"] }, titulo: "El reportaje",
    personaje: "Ministra de Cultura",
    texto: "Un periódico al que usted dejó publicar ha destapado las cuentas del palacio. Se vende en todos los quioscos.",
    izq: { accion: "Cerrar el periódico.", remate: "La libertad de prensa también tiene horario de cierre.", efectos: { pueblo: -7, ejercito: 4, potencias: -5 } },
    der: { accion: "Despedir a un ministro.", remate: "Alguien tendrá que haber firmado esas cuentas.", efectos: { pueblo: 7, elite: -6, potencias: 4 } }
  },
  {
    id: "varela_vuelve", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.general_apartado"] }, titulo: "Cienfuegos vuelve",
    personaje: "Ministro del Interior",
    texto: "El general Cienfuegos ha vuelto de su embajada. Los descontentos lo reciben en el aeropuerto como a un candidato.",
    izq: { accion: "Recibirlo en palacio.", remate: "Dos viejos generales; solo uno tiene palacio.", efectos: { ejercito: 7, pueblo: 4, elite: -6 } },
    der: { accion: "Devolverlo al avión.", remate: "Su embajada le echaba mucho de menos.", efectos: { ejercito: -7, pueblo: -4, elite: 6 } }
  },
  {
    id: "delfin_impaciente", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.sucesor_designado"] }, titulo: "El delfín impaciente",
    personaje: "Vicepresidente del Consejo de Ministros",
    texto: "Su sucesor ya recibe a los embajadores en su despacho y ha encargado retratos suyos para las escuelas.",
    izq: { accion: "Recordarle quién manda.", remate: "La paciencia también es un mérito revolucionario.", efectos: { elite: -7, ejercito: 5, potencias: -3 } },
    der: { accion: "Dejarle hacer.", remate: "Que aprenda; algún día tendrá que hacerlo sin mí.", efectos: { elite: 7, ejercito: -5, potencias: 3 } }
  },
  {
    id: "los_inocentes", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.oposicion_culpada"] }, titulo: "Los inocentes",
    personaje: "Embajador de la potencia del norte",
    texto: "Nuestro país tiene pruebas de que la oposición no puso aquella bomba. Pedimos que se revise el caso.",
    izq: { accion: "Revisar el caso.", remate: "Que se revise; la sentencia, que no se mueva.", efectos: { potencias: 7, pueblo: 4, ejercito: -6 } },
    der: { accion: "Asunto cerrado.", remate: "La Historia ya dictó sentencia; yo solo la firmé.", efectos: { potencias: -7, pueblo: -4, ejercito: 6 } }
  },
  {
    id: "mausoleo_vacio", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.mausoleo_construido"] }, titulo: "El mausoleo vacío",
    personaje: "Ministro de Economía",
    texto: "El mausoleo necesita mantenimiento y usted aún no lo ha estrenado. Los embalsamadores piden un aumento.",
    izq: { accion: "Pagar el aumento.", remate: "La eternidad no se recorta.", efectos: { elite: 5, pueblo: -5, crisis: 2 } },
    der: { accion: "Alquilarlo para actos.", remate: "Mientras tanto, que dé beneficios.", efectos: { elite: -5, pueblo: 5, crisis: -1 } }
  },
  {
    id: "palacio_sin_terminar", era: 4, tipo: "sorteo", peso: 14, cond: { requiere: ["base.palacio_del_pueblo"] }, titulo: "El palacio sin terminar",
    personaje: "Ministro de Economía",
    texto: "El palacio sigue sin terminar y ya ha costado más que todos los hospitales del país.",
    izq: { accion: "Terminarlo como sea.", remate: "Que mis sucesores tengan dónde aburrirse.", efectos: { elite: 6, pueblo: -7, crisis: 3 } },
    der: { accion: "Convertirlo en museo.", remate: "Un museo de lo que pudo haber sido.", efectos: { elite: -6, pueblo: 7, crisis: -1 } }
  },
  {
    id: "dos_ejercitos", era: 4, tipo: "sorteo", peso: 14, cond: { alguna: ["base.estado_policial", "base.jefe_poderoso"] }, titulo: "Dos ejércitos",
    personaje: "Ministro de las Fuerzas Armadas",
    texto: "La unidad del Interior ya tiene más tanques que el Ejército. Mis oficiales preguntan quién manda.",
    izq: { accion: "Desarmar al batallón.", remate: "Un ejército basta; dos acaban discutiendo.", efectos: { ejercito: 8, elite: -4, pueblo: 3 } },
    der: { accion: "Más tanques al Ejército.", remate: "Si sobran tanques, que sobren en los dos lados.", efectos: { ejercito: -8, elite: 4, crisis: 2 } }
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

const FUTURO_ERA = {"base.culto_iniciado": 3, "base.modestia_aparente": 3, "base.prensa_libre": 4, "base.general_apartado": 4, "base.criticos_detenidos": 3, "base.mercado_paralelo": 3, "base.desfile_militar": 3, "base.periodista_oficial": 3, "base.estudiantes_reprimidos": 3, "base.jefe_poderoso": 3, "base.sucesor_designado": 4, "base.oposicion_culpada": 4, "base.mausoleo_construido": 4, "base.palacio_del_pueblo": 4, "base.estado_policial": 4, "base.accidente_cienfuegos": 2, "base.alineado_bloque_oriental": 1, "base.general_popular": 1, "base.negocio_refinerias": 1, "base.sindicato_libre": 1, "base.elecciones_aplazadas": 1, "base.embargo_en_marcha": 1, "base.critica_abierta": 3, "base.elecciones_prometidas": 3, "base.policia_tradicional": 3, "base.atentado_investigado": 4};   // era en la que llegan las consecuencias; el resto llega en la era 2
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
  { paso: "pistas", texto: "Por ejemplo, conviene mantener la lealtad del Ejército. No querrá que olviden quién manda.", cinta: "Los puntos rojos indican cuánto afectará tu decisión a cada fuerza.", izq: "Primero el Pueblo, Capitán", der: "No les faltará el ron", efectos: { izq: { pueblo: 24, elite: -16, potencias: -6 }, der: { ejercito: 24, pueblo: -6, elite: 16 } } },
  // Carta de estado: no hay personaje, así que arriba se habla al jugador. Si no se toca, se guarda sola a los 7 s.
  { paso: "estado", texto: "Tus decisiones tienen efectos a largo plazo." },
  { paso: "guardar", texto: "Esta carta aumenta el apoyo popular, pero tanto amor puede ser peligroso.", cinta: "Toca la casilla de abajo para saber más.", izq: "Por eso el amor se raciona", der: "Disfrutemos mientras dure" },
  { paso: "fin", texto: "La nación aguarda sus primeras palabras. Ha llegado el momento de presentarse.", cinta: "A partir de aquí, gobiernas tú.", izq: "Seré breve: cinco horas", der: "Quiero una paloma en mi hombro" }
];
