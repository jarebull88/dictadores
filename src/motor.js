/* =====================================================
   UTILIDADES Y NOMBRE
   ===================================================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const limitar = v => Math.max(0, Math.min(100, v));

const CLAVE_NOMBRE = "dictadores_nombre_v2";
let nombreDictador = "";
/* ?cero en la dirección: empezar como la primera vez (16 oct): se olvidan el nombre y el tutorial visto */
if (/[?&]cero\b/.test(location.search)) { try { Object.keys(localStorage).filter(k => k.startsWith("dictadores_") || k.startsWith("comandante.")).forEach(k => localStorage.removeItem(k)); } catch (e) {} }
try { nombreDictador = (localStorage.getItem(CLAVE_NOMBRE) || "").trim().split(/\s+/)[0] || ""; } catch (e) {}
/* «Comandante» en las eras 1 y 2; «Excelencia» a partir de la era 3 (culto a la personalidad) */
/* «Comandante» en las eras 1 y 2, «Excelencia» en la 3 y «Padre de la Patria» en la 4 (la última) */
const tratamiento = () => (E && E.era >= 4 ? "Padre de la Patria" : E && E.era >= 3 ? "Excelencia" : "Comandante");
const nombreCompleto = () => (E && E.era >= 4 ? `${nombreDictador}, Padre de la Patria` : tratamiento() + " " + nombreDictador);
function guardarNombre(n) { try { localStorage.setItem(CLAVE_NOMBRE, n); } catch (e) {} }

/* =====================================================
   ESTADOS DEL RÉGIMEN (las cuatro ranuras bajo la carta)
   Un estado se activa cuando el jugador toma cierta decisión (bandera).
   Solo caben 4: el más antiguo sale cuando entra uno nuevo.
   - deriva / cada: cambia las barras solo, cada N cartas
   - crisis: suma a la cuenta oculta, cada N cartas
   - multCrisis: multiplica lo que suman las decisiones a la crisis
   - pesos: cambia la probabilidad de ciertas cartas (0 = no salen)
   - duracion: cartas que dura (null = hasta que lo desplace otro)
   La descripción no da números: cuenta qué pasa, no cuánto.
   ===================================================== */
/* Iconos de interfaz (Material Symbols de Google) */
const UI = {
  mas: "M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z",
  atras: "m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z"
};
const icoUI = n => `<svg class="ico" viewBox="0 -960 960 960" aria-hidden="true"><path d="${UI[n]}"/></svg>`;

/* Emojis de los estados: ya no se ven en el juego (se usan iconos de papel); solo los usan los documentos generados */
const EMOJI_ESTADO = {
  censura: "🤐", vigilancia: "👁️", culto: "🖼️", alineado: "🤝",
  embargo: "🚫", frontera: "🧱", nacionalizado: "🏭", deuda: "💸", luna: "🍯"
};
const ESTADOS = {
  censura: {
    nombre: "Censura", bandera: "base.censura_previa", duracion: null,
    descripcion: "El «diversionismo ideológico» corrompe la conciencia revolucionaria. Toda producción cultural deberá contar con la aprobación del Ministerio de Cultura.",
    deriva: { pueblo: -1 }, cada: 1
  },
  vigilancia: {
    nombre: "Vigilancia", bandera: "base.comites_vigilancia", duracion: null,
    descripcion: "Los enemigos de la Revolución se esconden entre nosotros. Se refuerza la vigilancia ciudadana. Todo vecino tiene el deber de informar sobre «actividades sospechosas».",
    deriva: { ejercito: 1, pueblo: -1 }, cada: 2, pesos: { ojos_barrio: 2 }
  },
  culto: {
    nombre: "Culto", bandera: "base.culto_iniciado", duracion: null,
    descripcion: "Tu imagen aparece en cada rincón del país. Las instituciones organizan homenajes y es altamente recomendable asistir a los actos oficiales.",
    deriva: { pueblo: 1 }, cada: 2, crisis: 1
  },
  alineado: {
    nombre: "Alineado", bandera: "base.alineado_bloque_oriental", duracion: null,
    descripcion: "Una potencia aliada te ofrece protección, financiación y asesoramiento. Pero tu soberanía permanece intacta, claro.",
    deriva: { potencias: 1 }, cada: 2, crisis: 1
  },
  embargo: {
    nombre: "Embargo", bandera: "base.embargo_en_marcha", duracion: 6,
    descripcion: "Una potencia extranjera impone sanciones económicas a la Revolución. La población afrontará las dificultades con el sacrificio y la unidad de siempre.",
    deriva: { potencias: -1 }, cada: 2, multCrisis: 2
  },
  frontera: {
    nombre: "Jaula", bandera: "base.frontera_cerrada", duracion: null,
    descripcion: "El imperialismo pretende robarnos a nuestros médicos, ingenieros y científicos. Después de todo lo que el Estado ha invertido en ellos, lo mínimo es que se queden.",
    deriva: { ejercito: 1, potencias: -1 }, cada: 2, pesos: { marchan: 0 }
  },
  nacionalizado: {
    nombre: "Nacionalizaciones", bandera: "base.nacionalizo_empresas", duracion: null,
    descripcion: "Ningún interés particular estará por encima del bienestar colectivo. Se nacionalizan empresas, comercios y pequeños negocios.",
    deriva: { elite: -1 }, cada: 2, crisis: 1
  },
  deuda: {
    nombre: "Deuda externa", bandera: "base.deuda_externa", duracion: null,
    descripcion: "Para preservar la soberanía económica, se ha solicitado financiación a los mercados internacionales.",
    deriva: { potencias: 1 }, cada: 2, crisis: 1
  },
  // Solo en el tutorial (15 oct): no la activa ninguna bandera y desaparece al empezar la partida
  luna: {
    nombre: "Luna de miel", bandera: null, duracion: 1, soloTutorial: true,
    descripcion: "Todos te quieren, por ahora. Especialmente el Pueblo.",
    deriva: { pueblo: 1 }, cada: 1
  }
};
const RESUMEN = {
  luna: "El Pueblo sube cada año.",
  censura: "El Pueblo baja cada año.",
  vigilancia: "El Ejército sube y el Pueblo baja cada 3 años.",
  culto: "El Pueblo sube cada 3 años.",
  alineado: "Las Potencias suben cada 3 años.",
  embargo: "Las Potencias bajan cada 3 años, durante unos 9.",
  frontera: "El Ejército sube y las Potencias bajan cada 3 años.",
  nacionalizado: "La Élite baja cada 3 años.",
  deuda: "Las Potencias suben cada 3 años."
};
/* DIFICULTAD
   Los efectos de las cartas se escriben en una escala pequeña (±4 a ±12) y se multiplican al cargar.
   Cada fuerza tiene su propio factor porque no se toca con la misma frecuencia (el Pueblo aparece en casi
   todas las cartas y el Ejército en pocas). Con estos valores, jugando al azar se sobrevive a la era 1
   alrededor del 6 % de las veces (16 oct: era 1 ×1.25) (jugar siempre hacia el mismo lado es lo mismo que jugar al azar, porque los
   lados se mezclan), y las caídas se reparten entre las cuatro fuerzas, por arriba y por abajo. */
const FACTOR_EFECTOS = { pueblo: 2.2, ejercito: 3.5, elite: 2.7, potencias: 2.5 };
const FACTOR_DERIVA = 2;
CARTAS.forEach(c => ["izq", "der"].forEach(l => {
  const e = c[l].efectos;
  const comun = c.tipo === "crisis" || c.tipo === "coalicion";   // crisis y coaliciones salen en todas las eras: sin factor de era
  const fe = comun ? 1 : ERAS[(c.era || 1) - 1].factor || 1;     // cada era puede ajustar su propia dureza
  for (const k in e) if (k !== "crisis") e[k] = Math.round(e[k] * FACTOR_EFECTOS[k] * fe);
}));
for (const id in ESTADOS) {
  const d = ESTADOS[id];
  for (const k in (d.deriva || {})) d.deriva[k] = Math.round(d.deriva[k] * FACTOR_DERIVA);
}
const MAX_RANURAS = 4;

/* =====================================================
   PERSONAJES: manualidades de papel recortado (RETRATOS, incrustado por tools/build.py desde
   assets/personajes/personajes.json). La imagen no tiene ojos: se pintan por código y
   miran a un lado y a otro solos (animación CSS «mirar»). Ver docs/PIPELINE_PERSONAJES.md.
   ===================================================== */
const PERSONAJE_SLUG = {
  "Vicepresidente del Consejo de Ministros": "vicepresidente",
  "Ministro de Economía": "economia",
  "Ministro de Comercio": "comercio",
  "Ministra de Educación": "educacion",
  "Ministro de Trabajo": "trabajo",                 /* hereda las cartas del antiguo Ministro de Agricultura */
  "Ministra de Cultura": "cultura",
  "Ministro de las Fuerzas Armadas": "fuerzas-armadas",
  "Ministro del Interior": "interior",
  "Embajador del bloque oriental": "embajador-oriental",
  "Embajador de la potencia del norte": "embajador-occidental"
};
/* Con el dictador solo hablan sus ministros y los embajadores extranjeros; la gente corriente y Cienfuegos solo son mencionados.
   Grupo de cada personaje = fuerza a la que pertenece.
   Élite: el gabinete civil. Ejército: Interior (policía y Seguridad del Estado) y Fuerzas Armadas. Potencias: el extranjero.
   Pueblo no tiene portavoz: sus problemas llegan a través de los ministros. */
const GRUPO_DE = {
  "Ministro del Interior": "ejercito", "Ministro de las Fuerzas Armadas": "ejercito",
  "Vicepresidente del Consejo de Ministros": "elite", "Ministro de Economía": "elite", "Ministro de Comercio": "elite",
  "Ministra de Educación": "elite", "Ministra de Cultura": "elite", "Ministro de Trabajo": "elite",
  "Embajador del bloque oriental": "potencias", "Embajador de la potencia del norte": "potencias"
};
[...Object.values(IMG), ...Object.values(RETRATOS)].forEach(p => { const i = new Image(); i.src = p.src; });

/* Iconos de papel recortado (fuerzas y estados del régimen) */
/* Iconos: si hay versión dibujada a mano (assets/iconos/originales/dibujo-*.jpeg → «<id>-dibujo»), se usa esa en todo el
   juego; si no, el recorte de papel. Los dibujos van sin sombra: están pintados en la cartulina. */
const icono = (id, clase = "") => {
  // Prioridad: dibujo a rotulador (16 oct, también los estados) > icono de cartón (13 oct) > recorte de papel antiguo
  const dib = IMG["icono_" + id + "-dibujo"] || IMG["icono_" + id + "-carton"], img = dib || IMG["icono_" + id];
  const cl = ["icono", dib ? "dibujo" : "", clase].filter(Boolean).join(" ");
  return img ? `<img class="${cl}" src="${img.src}" alt="" draggable="false">` : "";
};

/* Cada personaje tiene su cartón fijo: color («carton») y textura 1-3 («carton_textura») en personajes.json.
   (La textura 5, de pulpa, va encima de todos.) */
/* 17 oct: la carta del Comandante lleva un marco de metal que se degrada con los años (oro el joven, plata el asentado;
   vendrán bronce y óxido). Texturas en assets/fondos/ (oro.jpg, plata.jpg). */
const METAL_DICTADOR = { "dictador-joven": "oro", "dictador-asentado": "plata" };
function cartonDe(carta, slug) {
  const p = RETRATOS[slug] || {};
  carta.classList.remove("k1", "k2", "k3", "purpurina", "oro", "plata");
  carta.classList.add("k" + (p.carton_textura || 2));
  if (METAL_DICTADOR[slug]) carta.classList.add(METAL_DICTADOR[slug]);
  carta.style.setProperty("--c-base", p.carton || "#D2AE7C");
}
/* Fondo de escena de cada personaje: un color plano que pega con su ropa ("fondo" en personajes.json) */
const fondoDe = slug => RETRATOS[slug] && RETRATOS[slug].fondo ? ` style="--fondo-escena:${RETRATOS[slug].fondo}"` : "";
function svgPersonaje(slug, nombre) {
  const p = RETRATOS[slug];
  const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
  const arriba = p.arriba || 0;      // se recorta el aire de encima de la cabeza; el resto se ve entero
  const desfase = -(Math.random() * 7).toFixed(2);   // cada carta mira a su ritmo
  return `<svg class="personaje" viewBox="0 ${arriba} ${p.ancho} ${p.alto - arriba}" preserveAspectRatio="xMidYMax meet" style="aspect-ratio:${p.ancho} / ${p.alto - arriba}" role="img" aria-label="${esc(nombre || p.nombre)}">` +
    `<image class="base" href="${p.src}" x="0" y="0" width="${p.ancho}" height="${p.alto}"/>` +
    (p.brillo ? svgBrillo(slug, p.brillo) : "") +
    `<g class="ojos" style="animation-delay:${desfase}s"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></svg>`;
}

/* Brillo que late sobre una luz del dibujo (16 oct: solo el farol de Hortensia). En personajes.json:
   "brillo": {"x", "y", "r"} en coordenadas del recorte; un halo cálido en «trama» que respira. */
function svgBrillo(slug, b) {
  const id = "brillo-" + slug;
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#FFF6C8" stop-opacity="1"/>` +
    `<stop offset=".18" stop-color="#FFE27A" stop-opacity=".85"/><stop offset=".45" stop-color="#FFC24A" stop-opacity=".35"/>` +
    `<stop offset="1" stop-color="#FFB020" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${id}-halo"><stop offset="0" stop-color="#FFD25A" stop-opacity=".55"/><stop offset=".5" stop-color="#FFC03A" stop-opacity=".22"/>` +
    `<stop offset="1" stop-color="#FFB020" stop-opacity="0"/></radialGradient></defs>` +
    `<circle class="brillo halo" cx="${b.x}" cy="${b.y}" r="${Math.round(b.r * 1.7)}" fill="url(#${id}-halo)"/>` +
    `<circle class="brillo" cx="${b.x}" cy="${b.y}" r="${b.r}" fill="url(#${id})"/>`;
}

/* =====================================================
   LAS CUATRO FUERZAS: un icono, una barra horizontal debajo y los puntos de pista bajo la barra
   ===================================================== */
/* Emojis de las fuerzas: solo para los documentos generados; en el juego se ven los iconos de papel */
const EMOJI_FUERZA = { pueblo: "✊", ejercito: "🪖", elite: "🎩", potencias: "🌐" };

/* Qué es cada fuerza (ventana emergente al tocar su símbolo) */
const FUERZAS = {
  pueblo:    { nombre: "Pueblo",    quien: "La población: obreros, campesinos y estudiantes. Te aplauden o protestan según cómo viven." },
  ejercito:  { nombre: "Ejército",  quien: "Las Fuerzas Armadas, la policía y el aparato de seguridad. Te protegen mientras se sientan respetados; si no, conspiran en los cuarteles." },
  elite:     { nombre: "Élite",     quien: "Empresarios, terratenientes, altos funcionarios y dirigentes del Partido. Te apoyan mientras hagan negocio; si no, sacan su dinero o conspiran." },
  potencias: { nombre: "Potencias", quien: "Los países extranjeros, tanto aliados como enemigos. Te ayudan o te castigan según les convenga." }
};

/* =====================================================
   MOTOR
   ===================================================== */
let E = null;
let ocupado = false;
let panelAbierto = false;

/* Los lados se mezclan al azar en cada carta (como en Reigns), para que no se pueda aprender
   que "la opción valiente siempre está a la derecha". Cada opción conserva sus efectos. */
let mezclarLados = true;
function barajarLados() {
  const c = E && E.actual;
  if (!c) return;
  const inv = mezclarLados && Math.random() < 0.5;
  E.lados = { id: c.id, izq: inv ? c.der : c.izq, der: inv ? c.izq : c.der };
}
function opcionDe(dir) {
  const c = E.actual;
  if (!E.lados || E.lados.id !== c.id) barajarLados();
  return dir < 0 ? E.lados.izq : E.lados.der;
}

function nuevaPartida() {
  E = {
    barras: { pueblo: 50, ejercito: 50, elite: 50, potencias: 50 },
    crisis: 0,
    turno: 1,
    meses: 0,
    N: ERA.min + Math.floor(Math.random() * (ERA.max - ERA.min + 1)),
    era: 1,
    inicioEra: 1,
    ultima: {},
    banderas: new Set(),
    orden: [],
    cola: [],
    vistas: new Set(),
    estados: [],
    eventos: [],
    derivaTurno: {},
    aviso: null,
    pistaVista: false,
    actual: null
  };
}

/* Una era dura entre 6 y 8 cartas (unos 9-12 años). Las ventanas de las anclas y turnoMin se cuentan desde el inicio de la era. */
const anioEra = () => E.turno - E.inicioEra + 1;
const finEra = () => E.inicioEra + E.N - 1;
const deEra = c => (c.era || 1) === E.era;
const libre = c => (!E.vistas.has(c.id) || (c.repetible && E.turno - (E.ultima[c.id] || 0) >= (c.descanso || 10))) && !grupoVisto(c);
/* Cartas de un mismo «grupo» (p. ej. las tres cartas iniciales): solo sale una por partida, sorteada */
const grupoVisto = c => !!c.grupo && CARTAS.some(o => o.grupo === c.grupo && o.id !== c.id && E.vistas.has(o.id));
/* El reverso de las cartas cambia de color con la etapa (base pastel y el dibujo, del mismo tono, más intenso) */
const REVERSO_ERA = {
  1: { base: "#A9D3A0", tinta: "#4E8A47" },   // La Revolución: verde guerrillero
  2: { base: "#9EC8EA", tinta: "#3F7DB3" },   // La Purga: azul
  3: { base: "#F2C76E", tinta: "#B9832A" },   // Culto: dorado
  4: { base: "#C9B1E4", tinta: "#7D5BAE" }    // La Supervivencia: lavanda
};
function colorReverso(era) {
  const c = REVERSO_ERA[era] || REVERSO_ERA[1], r = document.documentElement.style;
  r.setProperty("--rev-base", c.base); r.setProperty("--rev-tinta", c.tinta);
}
function iniciarEra(n) {
  const def = ERAS[n - 1];
  E.era = n;
  colorReverso(n);
  E.inicioEra = E.turno;
  E.N = def.min + Math.floor(Math.random() * (def.max - def.min + 1));
}

function cumple(c) {
  const k = c.cond || {};
  if (k.turnoMin && anioEra() < k.turnoMin) return false;
  if (k.barraMax && Object.entries(k.barraMax).some(([b, v]) => E.barras[b] > v)) return false;
  if (k.barraMin && Object.entries(k.barraMin).some(([b, v]) => E.barras[b] < v)) return false;
  if (k.crisisMin && E.crisis < k.crisisMin) return false;
  if (k.sin && k.sin.some(f => E.banderas.has(f))) return false;
  if (k.alguna && !k.alguna.some(f => E.banderas.has(f))) return false;
  if (k.requiere && !k.requiere.every(f => E.banderas.has(f))) return false;
  return true;
}

function pesoEfectivo(c) {
  return c.peso * E.estados.reduce((m, s) => {
    const p = (ESTADOS[s.id].pesos || {})[c.id];
    return m * (p === undefined ? 1 : p);
  }, 1);
}

function sorteo() {
  const cand = CARTAS.filter(c => c.tipo === "sorteo" && deEra(c) && libre(c) && cumple(c) && pesoEfectivo(c) > 0);
  if (!cand.length) {
    // Respaldo (muy raro: muchas cartas dependen de banderas): repite la carta de la era que hace más tiempo que salió
    const vistas = CARTAS.filter(c => c.tipo === "sorteo" && deEra(c) && cumple(c) && pesoEfectivo(c) > 0 && !grupoVisto(c))
      .sort((a, b) => (E.ultima[a.id] || 0) - (E.ultima[b.id] || 0));
    return vistas[0] || null;
  }
  const total = cand.reduce((s, c) => s + pesoEfectivo(c), 0);
  let r = Math.random() * total;
  for (const c of cand) { r -= pesoEfectivo(c); if (r <= 0) return c; }
  return cand[cand.length - 1];
}

/* Prioridades: cola, ancla en su último año, estados críticos,
   ancla con probabilidad uniforme dentro de su ventana, sorteo ponderado. */
function siguienteCarta() {
  const i = E.cola.findIndex(q => q.turno <= E.turno);
  if (i >= 0) return POR_ID[E.cola.splice(i, 1)[0].carta];

  const fin = c => Math.min(c.ventana[1], E.N);
  const anclas = CARTAS.filter(c => c.tipo === "ancla" && deEra(c) && libre(c) && cumple(c) && anioEra() >= c.ventana[0]);

  const forzadas = anclas.filter(c => anioEra() >= fin(c));
  if (forzadas.length) {
    const g = forzadas[0].grupo, delGrupo = g ? forzadas.filter(c => c.grupo === g) : [forzadas[0]];
    return delGrupo[Math.floor(Math.random() * delGrupo.length)];
  }

  const criticas = CARTAS.filter(c => (c.tipo === "crisis" || c.tipo === "coalicion") && libre(c) && c.disparo(E));
  if (criticas.length) return criticas[0];

  const probables = anclas.filter(c => Math.random() < 1 / (fin(c) - anioEra() + 1));
  if (probables.length) return probables[Math.floor(Math.random() * probables.length)];

  return sorteo();
}

function activarEstados(banderas) {
  (banderas || []).forEach(b => {
    for (const id in ESTADOS) {
      if (ESTADOS[id].bandera === b && !E.estados.some(s => s.id === id)) {
        E.estados.push({ id, edad: 0, nuevo: true });
        E.eventos.push({ t: "entra", id });
        if (E.estados.length > MAX_RANURAS) {
          const fuera = E.estados.shift();
          E.eventos.push({ t: "sale", id: fuera.id });
        }
      }
    }
  });
}

function avanzarEstados() {
  E.estados = E.estados.filter(s => {
    const d = ESTADOS[s.id];
    s.edad++;
    if (d.cada && s.edad % d.cada === 0) {
      s.actuo = true;
      for (const k in (d.deriva || {})) {
        E.barras[k] = limitar(E.barras[k] + d.deriva[k]);
        E.derivaTurno[k] = (E.derivaTurno[k] || 0) + d.deriva[k];
      }
      if (d.crisis) E.crisis = Math.max(0, E.crisis + d.crisis);
    }
    const termina = d.duracion && s.edad >= d.duracion;
    if (termina) E.eventos.push({ t: "fin", id: s.id });
    return !termina;
  });
}

function aplicar(c, op) {
  E.eventos = [];
  E.derivaTurno = {};
  const mult = E.estados.reduce((m, s) => m * (ESTADOS[s.id].multCrisis || 1), 1);
  for (const k in op.efectos) {
    if (k === "crisis") {
      const dc = op.efectos[k] > 0 ? Math.round(op.efectos[k] * mult) : op.efectos[k];
      E.crisis = Math.max(0, E.crisis + dc);
    } else {
      E.barras[k] = limitar(E.barras[k] + op.efectos[k]);
    }
  }
  (op.banderas || []).forEach(b => { if (!E.banderas.has(b)) { E.banderas.add(b); E.orden.push(b); } });
  activarEstados(op.banderas);
  (op.encolar || []).forEach(q => {
    const demora = q.min + Math.floor(Math.random() * (q.max - q.min + 1));
    E.cola.push({ carta: q.carta, turno: E.turno + demora });
  });
  E.vistas.add(c.id);
  E.ultima[c.id] = E.turno;
  E.turno++;
  const [m0, m1] = MESES_POR_CARTA[E.era] || MESES_POR_CARTA[1];
  E.meses += m0 + Math.floor(Math.random() * (m1 - m0 + 1));
  avanzarEstados();
}

function comprobarCaida() {
  for (const b of BARRAS) {
    if (E.barras[b.id] <= 0) return b.id + "_0";
    if (E.barras[b.id] >= 100) return b.id + "_100";
  }
  return null;
}

/* =====================================================
   INTERFAZ
   ===================================================== */
const PANTALLAS = ["screen-start", "screen-name", "screen-game", "screen-era", "screen-end"];
/* Todas las cartas miden lo que la de la partida y están a la misma altura. Se mide la pantalla de juego (aunque
   esté oculta: se muestra un instante invisible) y se guardan --carta-w, --carta-h y --cabecera-h (lo que ocupan
   arriba las barras y el mensaje). Las pantallas con carta (nombre, «Sigues en el poder») usan esas medidas. */
function medirCartaJuego() {
  const g = $("screen-game"), c = $("carta"), esc = c.parentElement;
  if (!$("barras").children.length) construirBarras();
  if (!$("ranuras").children.length) $("ranuras").innerHTML = '<div class="ranura"></div>'.repeat(MAX_RANURAS);
  const oculta = g.classList.contains("hidden"), cartaOculta = c.classList.contains("hidden");
  if (oculta) { g.classList.remove("hidden"); g.style.position = "absolute"; g.style.inset = "0"; g.style.visibility = "hidden"; }
  c.classList.remove("hidden");
  /* 16 oct: si la carta tiene más alto del que pide el personaje (móviles altos: manda el ancho), el hueco de la pregunta
     crece a 5 o 6 líneas para que los textos largos no encojan la letra. Igual en todas las cartas, para que no salten. */
  const raiz = document.documentElement.style;
  raiz.setProperty("--lineas-mensaje", "4");
  const linea = parseFloat(getComputedStyle($("mensaje")).fontSize) * 1.28 || 24;
  const sobra = c.offsetHeight - c.offsetWidth * 1.32;              // 1,32 ≈ alto/ancho que necesita la ilustración con su marco
  if (sobra > 0) raiz.setProperty("--lineas-mensaje", String(4 + Math.min(2, Math.floor(sobra / linea))));
  const w = c.offsetWidth, h = c.offsetHeight;
  const arriba = esc.getBoundingClientRect().top - g.getBoundingClientRect().top - (parseFloat(getComputedStyle(g).paddingTop) || 0);
  if (cartaOculta) c.classList.add("hidden");
  if (oculta) { g.classList.add("hidden"); g.style.position = g.style.inset = g.style.visibility = ""; }
  if (!w || !h) return;                                   // sin maquetación (pruebas): se quedan las medidas de CSS
  const r = document.documentElement.style;
  r.setProperty("--carta-w", w + "px"); r.setProperty("--carta-h", h + "px"); r.setProperty("--cabecera-h", Math.max(0, arriba) + "px");
  document.body.classList.add("carta-medida");
}
window.addEventListener("resize", medirCartaJuego);

function mostrar(id) {
  if (id === "screen-name" || id === "screen-era" || id === "screen-end") medirCartaJuego();
  PANTALLAS.forEach(s => $(s).classList.toggle("hidden", s !== id));
  ocultarInfo();
  if (id === "screen-name") pintarCartaNombre();
  cerrarComoJugar();
}

function parBarra(id, esc = 1) {
  return `<div class="par">
      <div class="icono-fuerza" style="height:${Math.round(32 * esc)}px" aria-hidden="true">${icono(id)}</div>
      <span class="alerta" aria-hidden="true">!</span>
      <div class="nivel" aria-hidden="true" style="max-width:${Math.round(72 * esc)}px"><i class="relleno"></i></div>
    </div>`;
}

function construirBarras() {
  $("barras").innerHTML = BARRAS.map(b => `
    <div class="barra" role="button" tabindex="0" data-b="${b.id}" aria-label="${b.nombre}" title="${b.nombre}">
      <div class="punto-zona"><div class="punto"></div></div>
      ${parBarra(b.id)}
    </div>`).join("");
  $("barras").querySelectorAll(".barra").forEach(el => {
    el.addEventListener("click", ev => { ev.stopPropagation(); mostrarFuerza(el.dataset.b, el); });
    el.addEventListener("keydown", ev => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ev.stopPropagation(); mostrarFuerza(el.dataset.b, el); }
    });
  });
}

function pintarBarras() {
  const previos = E.vistos || (E.vistos = {});
  BARRAS.forEach(b => {
    const v = E.barras[b.id];
    const el = document.querySelector(`.barra[data-b="${b.id}"]`);
    el.querySelector(".relleno").style.width = v + "%";
    const peligro = v <= 15 || v >= 85;
    if (peligro && !el.classList.contains("peligro") && previos[b.id] !== undefined) {   // acaba de entrar en zona crítica
      try { if (navigator.vibrate) navigator.vibrate([40, 60, 40]); } catch (e) {}
    }
    el.classList.toggle("peligro", peligro);
    el.setAttribute("aria-label", `${b.nombre}${peligro ? ": en peligro" : ""}`);
    if (previos[b.id] !== undefined && previos[b.id] !== v) {      // se llena o se vacía: destello breve
      el.classList.remove("cambia"); void el.offsetWidth; el.classList.add("cambia");
      setTimeout(() => el.classList.remove("cambia"), 850);
    }
    previos[b.id] = v;
  });
}

function pintarCabecera() {
  const n = anios();
  $("anios-poder").textContent = n === 0 ? "Recién llegado" : `${n} ${n === 1 ? "año" : "años"} al poder`;   // 15 oct: más corto, para que quepa
}

function pintarRanuras() {
  const cont = $("ranuras");
  cont.innerHTML = Array.from({ length: MAX_RANURAS }, (_, i) => {
    const s = E.estados[i];
    const fuera = E.estadoNuevo && s && s.id === E.estadoNuevo.id;     // su carta aún no ha bajado
    return s && !fuera
      ? `<button class="ranura llena${s.nuevo ? " nueva" : s.actuo ? " actua" : ""}" type="button" data-i="${i}" aria-label="${esc(ESTADOS[s.id].nombre)}">${icono(s.id)}</button>`
      : `<div class="ranura"></div>`;
  }).join("");
  E.estados.forEach(s => { s.nuevo = false; s.actuo = false; });
  cont.querySelectorAll("button.ranura").forEach(b =>
    b.addEventListener("click", ev => { ev.stopPropagation(); mostrarInfo(+b.dataset.i); })
  );
  ocultarInfo();
}

let temporizadorPopup = null;
/* Color pastel claro de cada ventana: uno por fuerza; los estados, su cartulina aclarada */
const COLOR_POPUP = { pueblo: "#FBEBDF", ejercito: "#EBF2E2", elite: "#F1EAF8", potencias: "#E4F0F8" };   // muy claros: se lee mejor
function colorPopup(clave) {
  const [tipo, id] = clave.split("-");
  if (tipo === "fuerza") return COLOR_POPUP[id];
  if (tipo === "estado" && FONDO_ESTADO[id]) return `color-mix(in srgb, ${FONDO_ESTADO[id]} 16%, #FBF8F0)`;
  return "";
}
function abrirPopup(clave, html, ancla, autocierre) {
  const pop = $("popup");
  pop.style.setProperty("--pop-color", colorPopup(clave) || "#F3EEDF");
  if (!pop.classList.contains("hidden") && pop.dataset.clave === clave) { ocultarInfo(); return; }
  clearTimeout(temporizadorPopup);
  pop.innerHTML = html;
  pop.dataset.clave = clave;
  pop.classList.remove("hidden");
  const cont = $("screen-game").getBoundingClientRect();
  const a = ancla.getBoundingClientRect();
  const ancho = Math.min(300, cont.width - 32);
  pop.style.width = ancho + "px";
  let izq = a.left - cont.left + a.width / 2 - ancho / 2;
  izq = Math.max(16, Math.min(cont.width - 16 - ancho, izq));
  pop.style.left = izq + "px";
  if (a.top - cont.top < cont.height / 2) {            // ancla arriba: la ventana se abre debajo
    pop.style.top = (a.bottom - cont.top + 8) + "px"; pop.style.bottom = "auto";
  } else {                                              // ancla abajo: la ventana se abre encima
    pop.style.bottom = (cont.bottom - a.top + 8) + "px"; pop.style.top = "auto";
  }
  if (autocierre) temporizadorPopup = setTimeout(ocultarInfo, autocierre);
}
function ocultarInfo() {
  clearTimeout(temporizadorPopup);
  const pop = $("popup");
  pop.classList.add("hidden");
  delete pop.dataset.clave;
}
function contenidoEstado(id, s, etiqueta) {
  const d = ESTADOS[id];
  return `${etiqueta ? `<small class="etiqueta-pop">${esc(etiqueta)}</small>` : ""}<b>${icono(id, "en-linea")}${esc(d.nombre)}</b><span>${esc(d.descripcion)}</span><span class="efecto"><span class="tinta">Efecto: ${esc(RESUMEN[id] || "")}</span></span>`;   // el ritmo y la duración van en el efecto (15 oct)
}
function mostrarInfo(i) {
  const s = E.estados[i];
  const el = $("ranuras").querySelectorAll("button.ranura")[0] && $("ranuras").children[i];
  if (!s || !el) { ocultarInfo(); return; }
  abrirPopup("estado-" + s.id, contenidoEstado(s.id, s), el);
  if (E.tutorial && TUTORIAL[E.tutorial.i].paso === "guardar") { E.tutorial.casilla = true; $("ranuras").classList.remove("destacar"); }
}
function mostrarFuerza(id, el) {
  const f = FUERZAS[id];
  abrirPopup("fuerza-" + id,
    `<b>${icono(id, "en-linea")}${esc(f.nombre)}</b><span>${esc(f.quien)}</span>`, el);
}

/* El mensaje tiene sitio para 4 líneas. Si no cabe, se baja la letra de punto en punto (hasta 15 px);
   si aun así no cabe (pantallas muy estrechas), la caja crece lo justo para ese mensaje. */
function ajustarMensaje() {
  const m = $("mensaje");
  m.style.fontSize = ""; m.style.height = "";
  let px = parseFloat(getComputedStyle(m).fontSize) || 19;
  while (m.scrollHeight > m.clientHeight + 1 && px > 15) { px -= 1; m.style.fontSize = px + "px"; }
  if (m.scrollHeight > m.clientHeight + 1) m.style.height = m.scrollHeight + "px";   // pantalla muy estrecha: una línea más
}
window.addEventListener("resize", () => { if (E && E.actual && !$("screen-game").classList.contains("hidden")) { ajustarMensaje(); ajustarFicha(); } });

/* Si el informe no cabe en la ficha (pantallas bajas), primero se achica la foto y luego la letra, hasta 12 px */
function ajustarFicha(carta = $("carta")) {
  const h = carta.querySelector(".dorso .hoja");
  if (!h) return;
  h.style.removeProperty("--foto-w"); h.style.removeProperty("--ficha-px");
  const sobra = () => h.scrollHeight > h.clientHeight + 1;
  for (const w of [72, 60]) if (sobra()) h.style.setProperty("--foto-w", w + "px");
  for (let px = 14.5; px >= 12 && sobra(); px -= .5) h.style.setProperty("--ficha-px", px + "px");
}

/* Color del rotulador de cada grupo (16 oct): el de la boca y los rasgos del personaje; con él se escribe su nombre en la ficha */
const ROTULADOR_GRUPO = { ejercito: "#2E6B2E", elite: "#5B2C83", potencias: "#B5541C" };

/* Foto de la ficha: la cara de la etapa 1 (siempre la misma, para recordar quién es), en blanco y negro.
   Se encuadra a partir de los ojos: cabeza y hombros, como una foto de carné. */
function fotoFicha(cargo) { return fotoDe(PERSONAJE_SLUG[cargo]); }
function fotoDe(slug) {
  const p = RETRATOS[(RETRATOS[slug] || {}).foto || slug];
  if (!p) return "";
  const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
  const cx = (xi + xd) / 2, cy = (yi + yd) / 2, w = (xd - xi) * 3.3, h = w * 1.25;
  return `<div class="ficha-foto"${fondoDe(slug)}><svg viewBox="${(cx - w / 2).toFixed(0)} ${(cy - h * .42).toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">` +
    `<image href="${p.src}" x="0" y="0" width="${p.ancho}" height="${p.alto}"/><g class="ojos-foto"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></svg></div>`;
}

function fichaPersonaje(cargo) {
  const f = FICHAS[cargo] || { nombre: cargo, historia: "" };
  return dorsoFicha({ foto: fotoFicha(cargo), nombre: f.nombre, color: ROTULADOR_GRUPO[GRUPO_DE[cargo]], cargo: f.cargo || cargo, historia: f.historia, nota: f.nota });
}
function dorsoFicha(f) {
  return `<div class="dorso"><div class="hoja">${ICONO_GIRO}${f.foto || ""}<b class="ficha-nombre" style="--rotulador:${f.color || "#23211E"}">${esc(f.nombre)}</b>` +
    `<span class="ficha-cargo">${esc(f.cargo)}</span><p class="ficha-historia">${esc(f.historia)}</p>` +
    (f.nota ? `<p class="ficha-historia ficha-nota"><b>Nota:</b> ${esc(f.nota)}</p>` : "") + `</div></div>`;
}
/* Icono «360» (Material, de Google), semitransparente en la esquina de la cartulina: avisa de que la carta se gira */
const ICONO_GIRO = '<svg class="icono-giro" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7C6.48 7 2 9.24 2 12c0 2.24 2.94 4.13 7 4.77V20l4-4-4-4v2.73c-3.15-.56-5-1.9-5-2.73 0-1.06 3.04-3 8-3s8 1.94 8 3c0 .73-1.46 1.89-4 2.53v2.05c3.53-.77 6-2.53 6-4.58 0-2.76-4.48-5-10-5z"/></svg>';
/* Partición de palabras en las preguntas (15 oct): se meten guiones blandos (U+00AD) en los límites de sílaba según
   las reglas del español, y el navegador pone «-» solo si la palabra se corta al final de la línea. Nunca deja menos
   de 2 letras a un lado del corte, ni corta palabras de menos de 6 letras. */
const VOCALES = "aeiouáéíóúü", FUERTES = "aeoáéíóú";   // í y ú acentuadas cuentan como fuertes (hacen hiato)
const GRUPOS = ["bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "kl", "kr", "pl", "pr", "tr", "tl", "ch", "ll", "rr"];
function silabas(palabra) {
  const w = palabra.toLowerCase(), n = w.length;
  // Tipo de cada letra: v (vocal) o c (consonante); la «u» muda de que/qui/gue/gui va con la consonante; «y» final, vocal
  const t = [...w].map((ch, i) => {
    if (ch === "u" && i > 0 && "qg".includes(w[i - 1]) && "eéií".includes(w[i + 1] || "")) return "c";
    if (ch === "y") return i === n - 1 ? "v" : "c";
    return VOCALES.includes(ch) ? "v" : "c";
  });
  const cortes = [];
  let i = 0;
  while (i < n && t[i] === "c") i++;                 // consonantes iniciales: van con la primera sílaba
  while (i < n) {
    // núcleo vocálico: se parte solo si hay hiato (dos fuertes seguidas)
    let j = i + 1;
    while (j < n && t[j] === "v") {
      const a = w[j - 1], b = w[j];
      if (FUERTES.includes(a) && FUERTES.includes(b)) { cortes.push(j); }
      j++;
    }
    let k = j;
    while (k < n && t[k] === "c") k++;
    if (k >= n) break;                                // consonantes finales: con la última sílaba
    // «gu»/«qu» con la u muda cuentan como una sola consonante (per-se-guir, no per-seg-uir)
    const muda = k - j >= 2 && w[k - 1] === "u" ? 1 : 0;
    const cons = w.slice(j, k - muda), m = cons.length;
    let corte;
    if (m === 1) corte = j;
    else if (m === 2) corte = GRUPOS.includes(cons) ? j : j + 1;
    else if (m === 3) corte = GRUPOS.includes(cons.slice(1)) ? j + 1 : j + 2;
    else corte = j + 2;
    // «ch», «ll» y «rr» no se separan aunque vayan tras otra consonante
    if (["ch", "ll", "rr"].includes(w.slice(corte - 1, corte + 1))) corte--;
    cortes.push(corte);
    i = k;
  }
  return cortes;
}
/* Texto con *negritas* (y guiones de partición): el tutorial marca así sus instrucciones */
function conNegritas(texto) {
  return `<span>${texto.split("*").map((t, k) => k % 2 ? `<b>${esc(partirTexto(t))}</b>` : esc(partirTexto(t))).join("")}</span>`;   // un solo bloque: el mensaje es flex
}
const PARTIR_PALABRAS = false;   // 15 oct: sin partición de palabras (Jorge); el código sigue por si se vuelve
function partirTexto(texto) {
  if (!PARTIR_PALABRAS) return texto;
  return texto.replace(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{6,}/g, palabra => {
    const cortes = silabas(palabra).filter(c => c >= 2 && palabra.length - c >= 2);
    let out = "", prev = 0;
    cortes.forEach(c => { out += palabra.slice(prev, c) + "\u00AD"; prev = c; });
    return out + palabra.slice(prev);
  });
}
function pintarCarta(c) {
  const slug = PERSONAJE_SLUG[c.personaje];
  const ilus = slug && RETRATOS[slug]
    ? svgPersonaje(slug, c.personaje)
    : `<div class="ph"><b>Sin retrato</b></div>`;
  $("mensaje").innerHTML = conNegritas(c.texto);    // con guiones de partición (solo en las preguntas)
  ajustarMensaje();
  if (!$("screen-game").classList.contains("hidden")) { medirCartaJuego(); ajustarMensaje(); }   // si la pregunta crece, la carta encoge: se vuelve a alinear
  /* Anverso: el personaje (la respuesta va en la parte alta de la carta). Reverso: su ficha. */
  $("carta").classList.remove("volteada");
  cartonDe($("carta"), slug);
  $("carta").innerHTML = `<div class="giro"><div class="tapa"></div><div class="cara"><div class="ilustracion${slug && RETRATOS[slug] ? "" : " ph"}"${fondoDe(slug)}>${ilus}` +
    `${c.cinta ? `<div class="etiqueta-boli cinta-tutorial"><span>${esc(c.cinta)}</span></div>` : ""}` +   // tutorial: la instrucción al jugador, en cinta de carrocero
    `${ICONO_GIRO}<div class="respuesta" id="respuesta"></div></div></div>${fichaPersonaje(c.personaje)}</div>`;
  ajustarFicha();
}
/* Al tocar la carta se voltea: media vuelta en 3D (CSS, .giro) y enseña la ficha del personaje */
function voltear() {
  if (modoEstado) { recogerEstado(); return; }
  if (ocupado) return;
  if (E && E.tutorial && TUTORIAL[E.tutorial.i].paso !== "girar") return;   // 17 oct: en el tutorial solo se gira en su paso
  pintarEleccion(0);
  const volteada = $("carta").classList.toggle("volteada");
  const t = E && E.tutorial;
  if (t && TUTORIAL[t.i].paso === "girar") {               // tutorial: hay que darle la vuelta y volver a girarla
    if (volteada) t.vista = true;
    else if (t.vista) t.girada = true;
    // 16 oct: con la carta girada, Cuesta avisa de que el Comandante también tendrá su expediente al cambiar de etapa
    const paso = TUTORIAL[t.i];
    if (paso.girada) { $("mensaje").innerHTML = conNegritas(volteada ? paso.girada : paso.texto); ajustarMensaje(); }
  }
}

/* La respuesta cabe siempre en 2 líneas: si es larga, la letra baja (de 21 px hasta 14 px).
   Se mide con offsetHeight, que no cuenta el giro del panel. */
function ajustarRespuesta(r) {
  const s = r && r.querySelector(".texto-respuesta strong");
  if (!s) return;
  s.style.fontSize = "";
  let px = parseFloat(getComputedStyle(s).fontSize) || 21;
  while (s.offsetHeight > px * 1.15 * 2 + 2 && px > 14) { px -= 1; s.style.fontSize = px + "px"; }
}
function pintarEleccion(dir) {
  if (modoEstado) return;                             // la carta de estado no tiene respuestas (ni se arrastra)
  const c = E && E.actual;
  const op = c && !panelAbierto && dir !== 0 ? opcionDe(dir) : null;
  const r = $("respuesta");
  if (r) {
    if (op) { r.innerHTML = `<div class="texto-respuesta"><strong>${op.accion}</strong>${op.remate ? `<span>${op.remate}</span>` : ""}</div>`; r.dataset.dir = dir; ajustarRespuesta(r); r.classList.add("visible"); }
    // Sin lado (la carta vuelve a su sitio): el texto se queda en el panel y sube con él
  }
  if (!op) return;                                    // los puntos tampoco cambian: suben fuera de la pantalla tal cual
  BARRAS.forEach(b => {
    const p = document.querySelector(`.barra[data-b="${b.id}"] .punto`);
    const e = op ? Math.abs(op.efectos[b.id] || 0) : 0;
    const d = e === 0 ? 0 : e <= 14 ? 8 : e <= 20 ? 13 : 18;
    p.style.width = p.style.height = d + "px";
  });
}

function empezar() {
  nuevaPartida();
  construirBarras();
  $("barras").classList.remove("apagadas");
  $("btn-salir").textContent = "Abandonar partida";
  mostrar("screen-game");
  colorReverso(E.era);
  medirCartaJuego();                                   // las barras, la pregunta y el pie se alinean con la carta
  $("nombre-dictador").textContent = nombreCompleto();
  E.avisoPendiente = null;
  E.estadoNuevo = null; modoEstado = false;
  $("carta").classList.remove("hidden", "listo");
  E.actual = siguienteCarta();
  barajarLados();
  pintarBarras();
  pintarCabecera();
  pintarRanuras();
  pintarCarta(E.actual);
  const carta = $("carta");
  carta.style.transition = "none";
  carta.style.transform = "";
  carta.style.opacity = "1";
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  void carta.offsetWidth;
  carta.style.transition = "";
  panelAbierto = false;
  ocupado = false;
  pintarEleccion(0);
  if (animar()) repartir();
}

/* =====================================================
   ANIMACIONES DEL MAZO: el reparto al empezar y cada carta nueva, que se descubre dándole la vuelta sobre el mazo.
   Sin ellas si el sistema pide menos movimiento (y en las pruebas, que no tienen matchMedia).
   ===================================================== */
const animar = () => !!(window.matchMedia && !matchMedia("(prefers-reduced-motion: reduce)").matches && document.body.animate);
const VOLTEO_MS = 560;
/* La carta aparece boca abajo, justo encima del mazo, y da la vuelta */
function entrarCarta(carta) {
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1";
  if (!animar()) {
    carta.style.transform = "translateY(10px) scale(.94)"; carta.style.opacity = "0";
    void carta.offsetWidth;
    carta.style.transition = ""; carta.style.transform = ""; carta.style.opacity = "1";
    return;
  }
  vigilarReposo();
  carta.classList.add("revelando", "boca-abajo");
  // La pregunta (o la frase del estado) sale justo cuando se descubre la carta, a mitad de la vuelta
  const msg = $("mensaje"); msg.classList.add("oculto");
  void carta.offsetWidth;
  if (document.querySelector("#screen-game .escenario.repartiendo")) return;    // el reparto le da la vuelta al terminar
  carta.style.transition = "";
  carta.classList.remove("boca-abajo");
  clearTimeout(carta._revela); clearTimeout(msg._revela);
  msg._revela = setTimeout(() => msg.classList.remove("oculto"), VOLTEO_MS / 2);
  carta._revela = setTimeout(() => carta.classList.remove("revelando"), VOLTEO_MS + 40);
}
/* Si la carta lleva un rato quieta, hace un amago sutil de deslizar a un lado y a otro (para enseñar qué se puede hacer) */
const REPOSO_MS = 7000;
let reposo = null;
function vigilarReposo() { clearTimeout(reposo); reposo = setTimeout(amagar, REPOSO_MS); }
function amagar() {
  const c = $("carta");
  const quieta = animar() && !$("screen-game").classList.contains("hidden") && !ocupado && !panelAbierto && !modoEstado &&
    !arrastrando && !c.classList.contains("volteada") && !c.classList.contains("revelando") && $("popup").classList.contains("hidden");
  if (quieta) {
    c.classList.remove("amago"); void c.offsetWidth; c.classList.add("amago");
    setTimeout(() => c.classList.remove("amago"), 1300);
  }
  vigilarReposo();
}
document.addEventListener("pointerdown", () => { if (reposo) vigilarReposo(); });
/* Al empezar, las cartas llegan en cascada diagonal, en línea recta y desde una sola esquina, y se apilan en el mazo
   (como el reparto del solitario); después se descubre la primera. */
function repartir() {
  const esc = document.querySelector("#screen-game .escenario"), carta = $("carta");
  if (!esc) return;
  ocupado = true;
  esc.classList.add("repartiendo");
  entrarCarta(carta);                                  // boca abajo y sin pregunta hasta que acabe el reparto
  esc.querySelectorAll(".pila.reparto").forEach(n => n.remove());
  const N = 9, PASO = 90, DURA = 420;
  const ancho = window.innerWidth, alto = window.innerHeight;
  for (let i = 0; i < N; i++) {
    const p = document.createElement("div");
    p.className = "pila reparto"; p.setAttribute("aria-hidden", "true");
    p.innerHTML = '<div class="capa"></div>';
    esc.appendChild(p);
    // Todas desde la esquina de abajo a la izquierda, fuera de la pantalla, por la misma diagonal y sin girar
    p.animate([{ transform: `translate(${-ancho}px, ${alto * 0.8}px)` }, { transform: "translate(0, 0)" }],
      { duration: DURA, delay: i * PASO, easing: "linear", fill: "both" });
  }
  setTimeout(() => {
    esc.querySelectorAll(".pila.reparto").forEach(n => n.remove());
    esc.classList.remove("repartiendo");
    entrarCarta(carta);                                // ahora sí, la primera carta da la vuelta
    setTimeout(() => { ocupado = false; }, VOLTEO_MS * 0.7);
  }, (N - 1) * PASO + DURA + 60);
}

function decidir(dir) {
  if (modoEstado) { recogerEstado(); return; }
  if (ocupado || panelAbierto || tutorialBloquea()) return;
  ocupado = true;
  ocultarInfo();
  const carta = $("carta");
  carta.classList.remove("volteada");
  pintarEleccion(dir);
  carta.classList.add("listo");
  const rsp = $("respuesta"); if (rsp) rsp.classList.add("firme");
  carta.style.transition = "";
  carta.style.transform = `translateX(${dir * 130}vw) rotate(${dir * 24}deg)`; carta.style.setProperty("--giro", `${dir * 24}deg`); carta.style.setProperty("--bajada", "1");
  carta.style.opacity = "0";
  setTimeout(() => resolver(dir), 240);
}

function resolver(dir) {
  if (E.tutorial) { pintarEleccion(0); bajarPistas(0); pasoTutorial(E.tutorial.i + 1); return; }   // en el tutorial no cuenta
  const c = E.actual;
  const op = opcionDe(dir);
  E.ultimaDecision = op.accion;
  const turnoDecidido = E.turno;
  aplicar(c, op);
  pintarBarras();
  pintarRanuras();
  mostrarDerivas();
  prepararAviso();
  pintarEleccion(0);
  bajarPistas(0);

  const caida = comprobarCaida();
  const eraCompleta = !caida && E.turno > finEra();
  let despues;
  if (caida) despues = () => terminar(caida);
  else if (eraCompleta) despues = finDeEra;
  else despues = siguiente;
  despues();
}

/* Las barras muestran una flecha cuando un estado las mueve solo */
function mostrarDerivas() {
  BARRAS.forEach(b => {
    const v = E.derivaTurno[b.id];
    if (!v) return;
    const el = document.querySelector(`.barra[data-b="${b.id}"]`);
    el.classList.remove("sube", "baja");
    void el.offsetWidth;
    el.classList.add(v > 0 ? "sube" : "baja");
    setTimeout(() => el.classList.remove("sube", "baja"), 1900);
  });
}

/* Aviso bajo la cabecera cuando un estado entra, sale o termina */
let arrastrando = false;
function prepararAviso() {
  const ent = E.eventos.filter(e => e.t === "entra").map(e => e.id);
  const sal = E.eventos.filter(e => e.t === "sale").map(e => e.id);
  const fin = E.eventos.filter(e => e.t === "fin").map(e => e.id);
  if (!ent.length && !sal.length && !fin.length) return;
  const nom = ids => ids.map(id => ESTADOS[id].nombre).join(" y ");
  if (ent.length) {
    // Un estado nuevo sale como carta propia; al tocarla (o arrastrarla) baja a su casilla
    E.estadoNuevo = { id: ent[ent.length - 1], sale: sal.length ? nom(sal) : "" };
  } else {
    const fuerte = fin.length ? `${nom(fin)} termina` : `${nom(sal)} desaparece`;
    const texto = fin.length ? "Su efecto desaparece." : "Se ha desplazado de las ranuras.";
    E.avisoPendiente = { clave: "fin-" + (fin[0] || sal[0]), html: `<small class="etiqueta-pop">Estado</small><b>${esc(fuerte)}</b><span>${esc(texto)}</span>`, indice: -1 };
  }
}
function mostrarAvisoPendiente() {
  const a = E.avisoPendiente;
  if (!a) return;
  E.avisoPendiente = null;
  const anclas = $("ranuras").children;
  const ancla = a.indice >= 0 && anclas[a.indice] ? anclas[a.indice] : $("ranuras");
  abrirPopup(a.clave, a.html, ancla, 6500);
}

/* ---------- Carta de estado: el estado nuevo aparece como carta; al tocarla o arrastrarla, baja a su casilla ---------- */
let modoEstado = false;
/* Frase de cada estado (de Jorge): sale arriba, donde va la pregunta, cuando su carta aparece. */
const FRASE_ESTADO = {
  nacionalizado: "Ahora todo es del Pueblo. Y el Pueblo eres tú.",
  embargo: "La culpa de todo por fin tiene nombre.",
  deuda: "La Revolución se pagará en cómodos plazos.",
  vigilancia: "🎵 En cada cuadra un comité. En cada barrio, Revolución. 🎵",
  culto: "El Pueblo te quiere tanto que han tenido que repartir tu retrato por todo el país.",
  censura: "Qué bonito cuando todos piensan igual.",
  frontera: "Si todos quisieran viajar, no habría aviones para tanta gente.",
  alineado: "La soberanía cuenta con el respaldo de una potencia que decide cómo debes ejercerla."
};
const FONDO_ESTADO = { luna: "#F28FA6", censura: "#E86A5C", vigilancia: "#4FC3B8", culto: "#9B7FD4", alineado: "#F29A7A",
  embargo: "#5BA8DC", frontera: "#7CC67A", nacionalizado: "#7CC6EE", deuda: "#A5D867" };
const ESPERA_ESTADO = 7000;   // 15 oct: si nadie toca la carta de estado, se guarda sola a los 7 s (también en el tutorial)
let relojEstado = null;
function mostrarCartaEstado() {
  const n = E.estadoNuevo, d = ESTADOS[n.id];
  modoEstado = true; ocupado = false;
  clearTimeout(relojEstado);
  const partida = E;
  relojEstado = setTimeout(() => { if (modoEstado && E === partida && E.estadoNuevo === n && !$("screen-game").classList.contains("hidden")) recogerEstado(); }, ESPERA_ESTADO);
  // Arriba, donde va la pregunta, la frase del estado; en la carta, su nombre; el detalle, al tocar la casilla de abajo
  $("mensaje").textContent = FRASE_ESTADO[n.id] || "Nuevo estado del régimen.";
  ajustarMensaje();
  const carta = $("carta");
  carta.classList.remove("hidden", "listo", "volteada");
  cartonDe(carta, "");
  carta.classList.add("purpurina");                  // el marco de las cartas de estado es de cartulina de purpurina
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  carta.innerHTML = `<div class="giro"><div class="tapa"></div><div class="cara carta-estado"><div class="ilustracion" style="--fondo-escena:${FONDO_ESTADO[n.id] || "#8A7156"}">` +
    (svgEscena(n.id) || `<div class="icono-grande">${icono(n.id)}</div>`) +
    `<div class="etiqueta-boli${d.nombre.split(" ").some(w => w.length > 12) ? " larga" : ""}"><b>${esc(d.nombre)}</b></div>` +
    `<div class="respuesta" id="respuesta"></div></div></div></div>`;
  entrarCarta(carta);
  pintarRanuras();
}
/* Escena de la carta de estado (collage de papel alrededor de su icono). Los marcos vacíos llevan la cara del
   dictador de la etapa en curso; la máscara de huecos (papel crema visible) la recorta donde algo tapa el marco. */
const dictadorDeEra = era => DICTADOR_ERA[era] || "dictador-joven";
function svgEscena(id, etiqueta) {
  const e = typeof ESCENAS !== "undefined" && ESCENAS[id], img = IMG["icono_" + id + "-escena"];
  if (!e || !img) return "";
  const p = RETRATOS[dictadorDeEra(E ? E.era : 1)];
  const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
  const d = xd - xi, ex = (xi + xd) / 2, ey = (yi + yd) / 2;
  let caras = "", cabezas = "";
  const huecos = IMG["icono_" + id + "-huecos"], encima = IMG["icono_" + id + "-encima"];
  const marcos = e.marcos.filter(m => !m.cabeza), huecosCabeza = e.marcos.filter(m => m.cabeza);
  if (marcos.length && huecos) {
    const vista = `${ex - 2.1 * d} ${ey - 2.3 * d} ${4.2 * d} ${5.4 * d}`;     // cabeza y hombros
    const retrato = m => `<g transform="translate(${m.x} ${m.y}) rotate(${m.giro})">` +
      `<svg x="${-m.w / 2}" y="${-m.h / 2}" width="${m.w}" height="${m.h}" viewBox="${vista}" preserveAspectRatio="xMidYMid slice">` +
      `<rect x="${ex - 4 * d}" y="${ey - 4 * d}" width="${8 * d}" height="${10 * d}" fill="${p.fondo}"/>` +
      `<image href="${p.src}" width="${p.ancho}" height="${p.alto}"/>` +
      `<g class="ojos-fijos"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></svg></g>`;
    caras = `<mask id="huecos-${id}"><image href="${huecos.src}" width="${e.ancho}" height="${e.alto}"/></mask>` +
      `<g mask="url(#huecos-${id})">${marcos.map(retrato).join("")}</g>`;
  }
  /* Cabeza en blanco (16 oct, caídas): tres capas. La escena trae la cabeza hecha hueco; encima va la cabeza recortada
     del dictador de la etapa (contorno «cabeza» de personajes.json, en distancias entre ojos); y encima de todo, lo que
     en la escena tapa la cabeza (antifaz, cascos), con la máscara «-encima». */
  if (huecosCabeza.length && p.cabeza) {
    const contorno = p.cabeza.map(([x, y]) => `${(ex + x * d).toFixed(1)},${(ey + y * d).toFixed(1)}`).join(" ");
    const cabeza = m => {
      const s = m.w / (m.ancho * d), ojoY = m.y - m.h / 2 + m.ojo * m.h;
      return `<g transform="translate(${m.x} ${ojoY}) scale(${s.toFixed(4)}) translate(${-ex} ${-ey})">` +
        `<clipPath id="cabeza-${id}"><polygon points="${contorno}"/></clipPath>` +
        `<g clip-path="url(#cabeza-${id})"><image href="${p.src}" width="${p.ancho}" height="${p.alto}"/>` +
        `<g class="ojos-fijos"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></g></g>`;
    };
    // Debajo de la cabeza, el hueco se rellena de piel: si la barba no llega al cuello, se ve cuello y no un agujero
    const piel = huecos ? `<mask id="piel-${id}"><image href="${huecos.src}" width="${e.ancho}" height="${e.alto}"/></mask>` +
      `<rect width="${e.ancho}" height="${e.alto}" fill="${p.piel || "#D19769"}" mask="url(#piel-${id})"/>` : "";
    cabezas = piel + `<g class="cabeza-escena">${huecosCabeza.map(cabeza).join("")}</g>` + (encima
      ? `<mask id="encima-${id}"><image href="${encima.src}" width="${e.ancho}" height="${e.alto}"/></mask>` +
        `<image href="${img.src}" width="${e.ancho}" height="${e.alto}" mask="url(#encima-${id})"/>`
      : "");
  }
  return `<svg class="escena" viewBox="0 0 ${e.ancho} ${e.alto}"${id.startsWith("caida-") ? ' preserveAspectRatio="xMidYMax meet"' : ""} role="img" aria-label="${esc(etiqueta || (ESTADOS[id] || {}).nombre || "")}">` +
    `<image href="${img.src}" width="${e.ancho}" height="${e.alto}"/>${caras}${cabezas}</svg>`;
}
/* La carta vuela, encogiéndose, hasta su casilla de abajo; después sale la carta siguiente */
function recogerEstado() {
  if (!modoEstado || ocupado) return;
  clearTimeout(relojEstado);
  ocupado = true;
  const carta = $("carta"), id = E.estadoNuevo.id;
  const idx = E.estados.findIndex(s => s.id === id);
  const destino = $("ranuras").children[idx] || $("ranuras");
  const a = carta.getBoundingClientRect(), b = destino.getBoundingClientRect();
  const dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
  const k = a.width ? b.width / a.width : 0.1;
  carta.style.transition = "transform .45s cubic-bezier(.5, 0, .6, 1), opacity .45s ease-in";
  carta.style.transform = `translate(${dx}px, ${dy}px) scale(${k})`;
  carta.style.opacity = "0.3";
  setTimeout(() => {
    modoEstado = false;
    E.estadoNuevo = null;
    const s = E.estados[idx]; if (s) s.nuevo = true;
    pintarRanuras();
    siguiente();
  }, 460);
}

function siguiente() {
  if (E.tutorial) { pasoTutorial(E.tutorial.i + 1); return; }   // tras guardar «Luna de miel» en su casilla
  pintarCabecera();
  if (E.estadoNuevo) { mostrarCartaEstado(); return; }
  const nueva = siguienteCarta();
  if (!nueva) return finDeEra();
  E.actual = nueva;
  barajarLados();
  const carta = $("carta");
  carta.classList.remove("hidden", "listo");
  pintarCarta(nueva);
  pintarBarras();
  entrarCarta(carta);
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  ocupado = false;
  pintarEleccion(0);
  mostrarAvisoPendiente();
}

/* Cada carta es un año y medio, más o menos: así una partida entera da unos 40-50 años, como un dictador de verdad */
/* Meses que pasan con cada carta, según la era (16 oct): siguen la cronología de la Revolución (1959–2006).
   Era 1 (8–10 cartas) ≈ 4 años · era 2 (6–8) ≈ 8 · era 3 ≈ 15 · era 4 ≈ 21: una partida entera, unos 48 años. */
const MESES_POR_CARTA = { 1: [5, 6], 2: [12, 16], 3: [22, 30], 4: [30, 42] };
function anios() { return Math.floor((E.meses || 0) / 12); }

/* «Sigues en el poder»: qué ha pasado y cuál es el objetivo de la era siguiente */
/* «Sigues en el poder» (16 oct): arriba solo cabe una frase (≤100 caracteres; provisional, la editará Jorge); el resto va
   en el informe de inteligencia, detrás de la carta del dictador (al tocarla se gira, como las de los ministros) */
const TEXTO_FIN_ERA = {
  1: "Has conquistado el poder. Ahora toca aferrarse a él.",
  2: "La Revolución ya es costumbre y desde hoy serás Excelencia.",
  3: "Ya eres Padre de la Patria. Aguanta y morirás en tu cama, en el poder."
};
const INFORME_ERA = {
  1: "Sus decisiones pasadas empiezan a volverse en su contra. Fuera de las fronteras crece la oposición y, dentro, aún quedan voces que silenciar.",
  2: "Llega el culto a su persona, y alguien tendrá que pagarlo.",
  3: "Los médicos le visitan cada semana."
};
/* Ilustración del dictador en «Sigues en el poder», según la era que empieza */
const DICTADOR_ERA = { 2: "dictador-asentado", 3: "dictador-culto", 4: "dictador-viejo" };
/* Victoria: sobrevivir a la última era. El final al que aspira todo dictador: morir de viejo, en la cama y en el poder.
   La esquela cambia según lo que hayas decidido en la partida. */
const TEXTO_VICTORIA = n => `Gobernaste ${n} años. Ningún general, ninguna Revolución y ningún aliado consiguió echarte: te echó la biología. Muy pocos dictadores lo consiguen.`;
const EPITAFIO = [
  ["base.mausoleo_construido", "Tu cuerpo, embalsamado, recibe visitas en el mausoleo. Las colas son voluntarias."],
  ["base.sucesor_designado", "Tu sucesor jura el cargo antes de que se enfríe el café."],
  ["base.capital_rebautizada", "La capital lleva tu nombre. De momento."],
  ["base.monumento_colosal", "Tu estatua de cuarenta metros se ve desde la costa."],
  ["base.palacio_del_pueblo", "El palacio del Pueblo sigue sin terminar."],
  ["base.libro_obligatorio", "Tu libro sigue siendo obligatorio para sacarse el carné de conducir."],
  ["base.derrota_aceptada", "Perdiste un plebiscito y aun así moriste en el poder. Los historiadores no se ponen de acuerdo."],
  ["base.recuento", "El recuento de aquel plebiscito todavía no ha terminado."],
  ["base.culto_iniciado", "Tus retratos siguen colgados en las aulas, cada vez más torcidos."],
  ["base.estado_policial", "El batallón del Interior monta guardia en tu funeral. Por si acaso."]
];
function epitafio() {
  const lineas = EPITAFIO.filter(([b]) => E.banderas.has(b)).map(([, t]) => t);
  if (!E.banderas.has("base.sucesor_designado")) lineas.push("Sin sucesor, el gabinete se reparte el país en la sala de espera del hospital.");
  if (!E.banderas.has("base.mausoleo_construido")) lineas.push("Te entierran con honores en una tumba que nadie sabrá encontrar.");
  return lineas.slice(0, 4);
}

function finDeEra() {
  if (E.era < ERAS.length) terminar(null, true);      // hay otra era: se puede seguir gobernando
  else terminar(null);
}
function continuarEra() {
  iniciarEra(E.era + 1);
  E.avisoPendiente = null;
  $("nombre-dictador").textContent = nombreCompleto();
  mostrar("screen-game");
  siguiente();
}

const SUJETO_FUERZA = { pueblo: ["El Pueblo", "llegó"], ejercito: ["El ejército", "llegó"], elite: ["Las élites", "llegaron"], potencias: ["Las potencias", "llegaron"] };
function terminar(clave, transicion) {
  if (transicion) { mostrarEra(); return; }
  panelAbierto = false;
  ocupado = false;
  const n = anios();
  const pantalla = $("screen-end");
  const victoria = !clave && !transicion;
  pantalla.classList.toggle("caida", !!clave);
  pantalla.classList.toggle("victoria", victoria);
  pantalla.classList.toggle("transicion", !!transicion);
  const caja = $("fin-fuerza");
  pantalla.classList.toggle("pantalla-carta", !!clave);
  pantalla.classList.toggle("pantalla-texto", !clave);
  if (clave) {
    /* Caída: «¡Has caído!», qué fuerza cayó, el relato y la causa en una carta (derecha = jugar de nuevo, izquierda = volver a la portada) */
    const f = FINALES[clave];
    const [idF, extremo] = [clave.split("_")[0], clave.endsWith("_100") ? 100 : 0];
    $("fin-principal").textContent = "¡Has caído!";
    $("fin-titulo").textContent = f.titulo;
    // Un solo párrafo para ahorrar sitio: «Las potencias llegaron al máximo.» en negrita y, seguido, el relato
    const [sujeto, verbo] = SUJETO_FUERZA[idF];
    $("fin-texto").innerHTML = `<b>${sujeto} ${verbo} al ${extremo === 100 ? "máximo" : "mínimo"}.</b> ${esc(f.texto)}`;
    caja.textContent = ""; caja.classList.add("hidden");
    pintarCartaFin(f.titulo, clave);
    $("fin-anios").textContent = n === 0 ? "Gobernaste menos de un año" : `Gobernaste por ${n} ${n === 1 ? "año" : "años"}`;   // debajo de la carta, como en «Sigues en el poder»
  } else if (victoria) {
    $("fin-principal").textContent = "¡Has ganado!";
    $("fin-titulo").textContent = "Moriste en tu cama, y en el poder";
    $("fin-texto").textContent = TEXTO_VICTORIA(n);
    caja.classList.add("hidden");
    caja.innerHTML = "";
  } else {
    $("fin-principal").textContent = "Sigues en el poder";
    $("fin-titulo").textContent = `Has gobernado ${n} ${n === 1 ? "año" : "años"}`;
    $("fin-texto").textContent = TEXTO_FIN_ERA[E.era];
    caja.classList.add("hidden");
    caja.innerHTML = "";
  }
  $("fin-esquela").innerHTML = victoria
    ? `<small class="qepd">Q. E. P. D.</small><b>${esc(nombreCompleto())}</b><span class="anos">${n} años en el poder</span>` +
      `<ul>${epitafio().map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
  $("btn-repetir").classList.toggle("hidden", !!transicion);

  const estadoPais = BARRAS.map(b => {
    const v = E.barras[b.id], l = LINEAS_BARRA[b.id];
    return v >= 60 ? l.alto : v <= 40 ? l.bajo : "";
  }).filter(Boolean);
  /* Al pasar de era, una sola lista breve: cómo está el país y lo que te espera en la siguiente */
  const teEspera = transicion
    ? E.orden.filter(b => FUTURO[b] && (FUTURO_ERA[b] || 2) === E.era + 1).map(b => "Te espera: " + FUTURO[b].charAt(0).toLowerCase() + FUTURO[b].slice(1))
    : [];
  const lineas = transicion ? estadoPais.slice(0, 2).concat(teEspera).slice(0, 4) : estadoPais;
  $("fin-lineas").innerHTML = clave || victoria ? "" : lineas.map(t => `<li>${esc(t)}</li>`).join("");

  mostrar("screen-end");
  if (clave) ajustarCabeceraFin();
}
/* Al caer, todo lo de arriba debe caber en el hueco de las barras y la pregunta: si no cabe, baja la letra
   del relato (hasta 13 px) y después la del título (hasta 36 px) */
function ajustarCabeceraFin() {
  const cab = document.querySelector("#screen-end .fin-cab"), rel = $("fin-texto"), h1 = $("fin-principal");
  rel.style.fontSize = ""; h1.style.fontSize = "";
  if (!cab.clientHeight) return;
  let px = parseFloat(getComputedStyle(rel).fontSize) || 15;
  while (cab.scrollHeight > cab.clientHeight + 1 && px > 13) { px -= 0.5; rel.style.fontSize = px + "px"; }
  let t = parseFloat(getComputedStyle(h1).fontSize) || 56;
  while (cab.scrollHeight > cab.clientHeight + 1 && t > 36) { t -= 2; h1.style.fontSize = t + "px"; }
}

/* ---------- Carta de la caída: la causa como título. Derecha = jugar de nuevo; izquierda = volver a la portada ---------- */
let finOcupada = false;
/* Cartas de caída (16 oct): si la causa tiene escena (`escena-caida-<clave>`), la carta es como las de estado: la escena
   sobre su cartulina y el título en cinta de carrocero; si no, provisional, el título sobre cartón rojo oscuro. */
const FONDO_CAIDA = { ejercito_0: "#A9C3D9", pueblo_0: "#F5C77A", pueblo_100: "#F7D78C", ejercito_100: "#C9B8E8",
  elite_0: "#9FD8D0", elite_100: "#F2B8C6", potencias_0: "#A9D6F2", potencias_100: "#F7C59F" };
let claveFin = "";
function pintarCartaFin(titulo, clave = claveFin) {
  const carta = $("carta-fin");
  claveFin = clave;
  finOcupada = false;
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1";
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  cartonDe(carta, "");
  // Una escena por etapa si la hay («Abducción»: el dictador de cada era), si no, la de la caída
  const era = E ? E.era : 1, idEscena = clave && (ESCENAS["caida-" + clave + "-" + era] ? `caida-${clave}-${era}` : "caida-" + clave);
  const escena = clave && svgEscena(idEscena, titulo);
  carta.innerHTML = escena
    ? `<div class="giro"><div class="cara carta-estado carta-caida-escena"><div class="ilustracion" style="--fondo-escena:${FONDO_CAIDA[clave] || "#D9D5CB"}">` +
      `${escena}<div class="etiqueta-boli${titulo.split(" ").some(w => w.length > 12) ? " larga" : ""}"><b>${esc(titulo)}</b></div><div class="respuesta"></div></div></div></div>`
    : `<div class="giro"><div class="cara carta-caida"><div class="ilustracion" style="--fondo-escena:#7A2E2A">` +
      `<div class="titulo-caida">${esc(titulo)}</div><div class="respuesta"></div></div></div></div>`;
  void carta.offsetWidth; carta.style.transition = "";
}
function eleccionFin(dir) {
  const r = $("carta-fin").querySelector(".respuesta");
  if (!r) return;
  if (!dir) { r.classList.remove("visible"); return; }
  r.innerHTML = `<div class="texto-respuesta"><strong>${dir > 0 ? "Jugar de nuevo" : "Volver a la portada"}</strong></div>`;
  r.dataset.dir = dir; ajustarRespuesta(r); r.classList.add("visible");
}
function decidirFin(dir) {
  if (finOcupada) return;
  finOcupada = true;
  const carta = $("carta-fin");
  eleccionFin(dir);
  carta.style.transition = "";
  carta.style.transform = `translateX(${dir * 130}vw) rotate(${dir * 24}deg)`; carta.style.setProperty("--giro", `${dir * 24}deg`); carta.style.setProperty("--bajada", "1");
  carta.style.opacity = "0";
  setTimeout(() => { if (dir > 0) empezar(); else { mostrar("screen-start"); pintarCartaFin($("fin-titulo").textContent); } }, 240);
}
arrastrable($("carta-fin"), { activa: () => !finOcupada, mostrar: eleccionFin, decidir: decidirFin });

/* ---------- Nombre del dictador ---------- */
function actualizarVistaNombre() {
  $("nombre-error").textContent = /\s/.test($("input-nombre").value.trim()) ? "Una sola palabra: Aureliano, Anselmo, Esteban…" : "";
}
/* =====================================================
   TUTORIAL «La víspera» (15 oct): la primera vez, «Comenzar partida» lleva aquí. Usa la carta, el arrastre, las
   barras y las casillas de la partida; las decisiones no cuentan. «Saltar tutorial» (abajo) lleva al nombre.
   ===================================================== */
const CLAVE_TUTORIAL = "comandante.tutorial";
function tutorialVisto() { try { return localStorage.getItem(CLAVE_TUTORIAL) === "1"; } catch (e) { return true; } }   // sin almacenamiento (pruebas): como visto
function marcarTutorial() { try { localStorage.setItem(CLAVE_TUTORIAL, "1"); } catch (e) {} $("btn-repasar").classList.remove("hidden"); }
const tutorialBloquea = () => {
  const t = E && E.tutorial; if (!t) return false;
  const paso = TUTORIAL[t.i].paso;
  return (paso === "girar" && !t.girada) || (paso === "guardar" && !t.casilla);   // hay que girar la carta / tocar la casilla
};

function empezarTutorial() {
  nuevaPartida();
  E.tutorial = { i: 0 };
  construirBarras();
  $("barras").classList.add("apagadas");               // las fuerzas, apagadas hasta que se presentan
  mostrar("screen-game");
  colorReverso(1);
  medirCartaJuego();
  pintarBarras(); pintarRanuras();
  $("btn-salir").textContent = "Saltar tutorial";
  $("carta").classList.remove("hidden", "listo", "volteada");
  panelAbierto = false;
  if (animar()) { pasoTutorial(0, true); repartir(); } else pasoTutorial(0);
}
function pasoTutorial(i, sinEntrada) {
  const t = E.tutorial;
  if (i >= TUTORIAL.length) { terminarTutorial(); return; }
  t.i = i; t.vista = t.girada = t.casilla = false;
  const p = TUTORIAL[i];
  bajarPistas(0);                                      // los puntos fijos del paso de los puntos no se quedan en el siguiente
  $("nombre-dictador").textContent = "La víspera";
  $("anios-poder").textContent = `${i + 1} de ${TUTORIAL.length}`;
  if (p.paso === "estado") {                           // entra un estado de verdad: «Luna de miel»
    E.estados = [{ id: "luna", edad: 0 }];
    E.estadoNuevo = { id: "luna", sale: "" };
    mostrarCartaEstado();
    $("mensaje").innerHTML = conNegritas(p.texto); ajustarMensaje();   // la explicación, en vez de la frase del estado
    return;
  }
  const ef = p.efectos || {};
  const c = { id: "tutorial-" + i, personaje: "Ministro de las Fuerzas Armadas", texto: p.texto, cinta: p.cinta,
    izq: { accion: p.izq, efectos: ef.izq || {} }, der: { accion: p.der, efectos: ef.der || {} } };
  E.actual = c;
  barajarLados();
  const carta = $("carta");
  carta.classList.remove("hidden", "listo", "volteada");
  pintarCarta(c);
  if (!sinEntrada) entrarCarta(carta);
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  carta.classList.toggle("con-giro", p.paso === "girar");          // el 360 solo sale (parpadeando) cuando toca girar
  carta.classList.toggle("giro-destacado", p.paso === "girar");
  $("ranuras").classList.toggle("destacar", p.paso === "guardar");     // la casilla de «Luna de miel» parpadea hasta tocarla
  if (p.paso === "fuerzas") encenderFuerzas();
  else if (i > TUTORIAL.findIndex(x => x.paso === "fuerzas")) $("barras").classList.remove("apagadas");   // presentadas: ya encendidas
  if (p.paso === "pistas") { E.barras.ejercito = 12; pintarBarras(); }   // el Ejército en peligro, de mentira
  if (p.paso === "pistas") ensenarPistas();
  if (p.paso === "deslizar") demostrarArrastre();
  if (p.paso === "fin") { E.barras.ejercito = 50; pintarBarras(); }
  ocupado = false;
  pintarEleccion(0);
}
/* 17 oct: en el primer paso, la carta se arrastra sola a un lado y al otro (hasta que sale la respuesta) para enseñar
   cómo se juega; se para en cuanto el jugador toca la carta. */
function demostrarArrastre() {
  const carta = $("carta"), t = E.tutorial, i = t.i;
  if (!animar()) return;
  let parar = false;
  const tocar = () => { parar = true; };
  carta.addEventListener("pointerdown", tocar, { once: true });
  const sigue = () => !parar && E && E.tutorial === t && t.i === i && !arrastrando;
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  const tramo = (de, a, ms) => new Promise(r => {
    const t0 = performance.now(), estado = { lado: Math.sign(de) };
    (function paso(ahora) {
      if (!sigue()) return r(false);
      const k = Math.min(1, (ahora - t0) / ms), e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;   // suave al salir y al llegar
      carta.style.transition = "none";
      carta._mover(de + (a - de) * e, estado);
      if (k < 1) requestAnimationFrame(paso); else r(true);
    })(t0);
  });
  (async () => {
    // 17 oct: primero llega la carta (reparto y vuelta), se espera un segundo y entonces se arrastra sola
    const llegando = () => ocupado || carta.classList.contains("revelando") || carta.classList.contains("boca-abajo") ||
      !!document.querySelector("#screen-game .escenario.repartiendo");
    await esperar(200);
    while (sigue() && llegando()) await esperar(150);
    await esperar(1000);
    const d = Math.min(carta.offsetWidth * .32, carta._umbral() * 2.2);
    for (const lado of [1, -1]) {
      if (!sigue() || !await tramo(0, lado * d, 650)) break;
      await esperar(1100);
      if (!sigue() || !await tramo(lado * d, 0, 450)) break;
      carta._volver();
      await esperar(500);
    }
    if (!parar && E && E.tutorial === t) { carta.style.transition = ""; if (!arrastrando) carta._volver(); }
    carta.removeEventListener("pointerdown", tocar);
  })();
}
/* 17 oct: en el paso de los puntos, los puntos bajan solos y se quedan quietos sin mover la carta; en cuanto el jugador
   la arrastra, vuelven a su comportamiento normal (bajan y suben con el dedo). */
function ensenarPistas() {
  const op = opcionDe(1);
  BARRAS.forEach(b => {
    const p = document.querySelector(`.barra[data-b="${b.id}"] .punto`);
    const e = Math.abs(op.efectos[b.id] || 0), d = e === 0 ? 0 : e <= 14 ? 8 : e <= 20 ? 13 : 18;
    p.style.width = p.style.height = d + "px";
  });
  setTimeout(() => { if (E && E.tutorial && TUTORIAL[E.tutorial.i].paso === "pistas" && !arrastrando) bajarPistas(1); }, animar() ? 900 : 0);
}
/* Las cuatro fuerzas se encienden una a una, cada una con su nota */
function encenderFuerzas() {
  const barras = [...$("barras").querySelectorAll(".barra")];
  barras.forEach((b, k) => setTimeout(() => {
    b.classList.add("encendida");
  }, 350 + k * 450));
}
function terminarTutorial() {
  marcarTutorial();
  $("carta").classList.remove("con-giro", "giro-destacado");
  $("ranuras").classList.remove("destacar");
  clearTimeout(relojEstado);
  E = null; modoEstado = false; ocupado = false;
  $("barras").classList.remove("apagadas");
  $("btn-salir").textContent = "Abandonar partida";
  irANombre();
}
/* 17 oct: el nombre de la era que empieza, arriba, a rotulador rojo, en la pantalla del nombre y al pasar de era
   (sustituye a «Sigues en el poder»: debajo de la carta ya dice cuántos años llevas) */
let ERA_CON_NUMERO = true;
const nombreEra = n => ERA_CON_NUMERO ? `Era ${n} – ${ERAS[n - 1].nombre}` : ERAS[n - 1].nombre;
/* Si el nombre de la era no cabe en una línea, la letra baja (hasta 22 px) */
function ajustarTituloEra(h) {
  h.style.fontSize = "";
  let px = parseFloat(getComputedStyle(h).fontSize) || 30;
  if (!h.firstElementChild) h.innerHTML = `<span>${esc(h.textContent)}</span>`;   // el texto, en un span: así se mide su ancho
  const ancho = () => h.firstElementChild.getBoundingClientRect().width;
  const caja = h.parentElement.clientWidth;          // el h1 se ajusta a su texto: el límite es la cabecera
  while (ancho() > caja * .94 && px > 22) { px -= 1; h.style.fontSize = px + "px"; }   // margen: el rotulador sobresale de la letra
}
function irANombre() {
  $("nombre-era-1").textContent = nombreEra(1); requestAnimationFrame(() => ajustarTituloEra($("nombre-era-1")));
  $("input-nombre").value = nombreDictador;
  actualizarVistaNombre();
  mostrar("screen-name");
  ajustarIntro();
  vigilarNombre(REPOSO_MS);
}
/* 17 oct: la carta del Comandante también hace el amago de deslizarse, para que se entienda que se arrastra:
   al poco de escribir el nombre (la gente lo escribía y no sabía qué hacer) y, si sigue quieta, cada pocos segundos */
let relojNombre = null;
function vigilarNombre(ms) { clearTimeout(relojNombre); relojNombre = setTimeout(amagarNombre, ms); }
function amagarNombre() {
  const c = $("carta-nombre");
  if ($("screen-name").classList.contains("hidden") || nombreOcupada) return;
  if (animar() && !arrastrando) { c.classList.remove("amago"); void c.offsetWidth; c.classList.add("amago"); setTimeout(() => c.classList.remove("amago"), 1300); }
  vigilarNombre(4000);
}
$("input-nombre").addEventListener("input", () => vigilarNombre($("input-nombre").value.trim() ? 1500 : REPOSO_MS));
$("carta-nombre").addEventListener("pointerdown", () => vigilarNombre(REPOSO_MS));
/* El texto de la pantalla del nombre va a 19 px, como la pregunta; si no cabe en el hueco de arriba (móviles bajos), la letra baja hasta 14 px */
function ajustarIntro() {
  const p = document.querySelector("#screen-name .intro"), caja = p && p.parentElement;
  if (!p || $("screen-name").classList.contains("hidden")) return;
  p.style.fontSize = "";
  let px = 19;
  while ((p.offsetHeight > caja.clientHeight || caja.scrollHeight > caja.clientHeight) && px > 14) { px -= 1; p.style.fontSize = px + "px"; }
}
window.addEventListener("resize", ajustarIntro);
/* Comprueba el nombre; si vale, lo guarda y devuelve true. Si no, explica por qué y devuelve false. */
function nombreValido() {
  let v = $("input-nombre").value.trim();
  if (!v) {
    $("nombre-error").textContent = "Los libros de historia necesitan saber su nombre.";
    return false;
  }
  if (/\s/.test(v)) {
    $("nombre-error").textContent = "Una sola palabra: Aureliano, Anselmo, Esteban…";
    return false;
  }
  v = v.charAt(0).toUpperCase() + v.slice(1);
  nombreDictador = v;
  guardarNombre(v);
  return true;
}

/* ---------- Gestos ---------- */
/* Arrastrar una carta a izquierda o derecha. Se usa en el juego y en la pantalla del nombre.
   op.activa(): si se puede tocar ahora · op.mostrar(dir): pinta la respuesta de ese lado (0 = ninguna)
   op.decidir(dir): suelta la carta hacia ese lado · op.toque(): un toque sin arrastrar (opcional) */
/* Los puntos de pista bajan desde fuera de la pantalla al ritmo del arrastre (y vuelven a subir si la carta vuelve) */
const bajarPistas = v => document.documentElement.style.setProperty("--bajada-pistas", v.toFixed ? v.toFixed(3) : v);
function arrastrable(carta, op) {
  let drag = null;
  // Distancia a partir de la cual se decide: es también la que muestra la respuesta, así que si se ve, soltar decide
  // 17 oct: el umbral pasa a la mitad del recorrido (15 % del ancho; antes 7 %): ahí la respuesta ya está entera,
  // la carta se marca con el contorno rojo y soltar decide
  const umbral = () => Math.max(30, carta.offsetWidth * 0.15);
  function marcarListo(listo) {
    if (carta.classList.contains("listo") === listo) return;
    carta.classList.toggle("listo", listo);
    const r = carta.querySelector(".respuesta"); if (r) r.classList.toggle("firme", listo);
    if (listo) { try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {} }
  }
  function volver() {
    marcarListo(false);
    bajarPistas(0);
    carta.style.transition = ""; carta.style.transform = ""; carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
    op.mostrar(0);
  }
  carta.addEventListener("pointerdown", e => {
    if (!op.activa()) return;
    drag = { x: e.clientX, dx: 0, dir: 0, lado: 0, t0: e.timeStamp, hist: [{ t: e.timeStamp, x: e.clientX }] };
    arrastrando = true;
    carta.setPointerCapture(e.pointerId);
    carta.style.transition = "none";
    ocultarInfo();
  });
  // Mueve la carta como si el dedo estuviera a dx px (también lo usa la demostración del tutorial)
  function mover(dx, estado) {
    carta.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
    carta.style.setProperty("--giro", `${dx / 18}deg`);
    // El panel baja desde el primer píxel, al ritmo del arrastre; llega abajo justo en el umbral, cuando sale el texto
    const bajada = Math.min(1, Math.abs(dx) / umbral());
    carta.style.setProperty("--bajada", bajada.toFixed(3));
    bajarPistas(bajada);
    // El texto de la respuesta va dentro del panel y baja con él desde el primer píxel; se decide al llegar al umbral
    const lado = Math.sign(dx), dir = Math.abs(dx) > umbral() ? lado : 0;
    if (lado !== estado.lado) { estado.lado = lado; op.mostrar(lado); }
    estado.dir = dir;
    marcarListo(dir !== 0);
  }
  carta._mover = mover; carta._volver = volver; carta._umbral = umbral;
  carta.addEventListener("pointermove", e => {
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    if (carta.classList.contains("volteada") || (op.fija && op.fija())) return;   // por detrás (o si es fija) no se arrastra: solo se toca
    drag.hist.push({ t: e.timeStamp, x: e.clientX });
    if (drag.hist.length > 6) drag.hist.shift();
    mover(drag.dx, drag);
  });
  function soltar(e) {
    if (!drag) return;
    const dx = drag.dx, h = drag.hist, toque = Math.abs(dx) < 8 && e.timeStamp - drag.t0 < 450;
    drag = null;
    arrastrando = false;
    if (toque || (op.fija && op.fija())) { volver(); if (op.toque && (toque || Math.abs(dx) < 30)) op.toque(); return; }
    if (carta.classList.contains("volteada")) { volver(); return; }
    const v = (h[h.length - 1].x - h[0].x) / Math.max(1, h[h.length - 1].t - h[0].t);   // px por ms
    const lanzada = Math.abs(v) > 0.55 && Math.abs(dx) > 36 && Math.sign(v) === Math.sign(dx);
    if (Math.abs(dx) > umbral() || lanzada) op.decidir(Math.sign(dx));
    else volver();
  }
  function cancelar() {
    if (!drag) return;
    drag = null; arrastrando = false; volver();
  }
  carta.addEventListener("pointerup", soltar);
  carta.addEventListener("pointercancel", cancelar);
}
// La carta de un estado nuevo no se arrastra: se toca y vuela a su casilla
arrastrable($("carta"), { activa: () => !ocupado && !panelAbierto, fija: () => modoEstado || tutorialBloquea(), mostrar: pintarEleccion, decidir, toque: voltear });

/* ---------- Pantalla del nombre: el dictador joven en una carta. Derecha = empezar la partida («¡La Revolución empieza hoy!»);
   izquierda = volver a la portada («Primero, elecciones») ---------- */
let nombreOcupada = false;
function pintarCartaNombre() {
  const carta = $("carta-nombre");
  nombreOcupada = false;
  carta.classList.remove("listo");
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1"; carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  cartonDe(carta, "dictador-joven");
  carta.innerHTML = `<div class="giro"><div class="cara"><div class="ilustracion"${fondoDe("dictador-joven")}>${svgPersonaje("dictador-joven", "El Comandante")}` +
    `<div class="respuesta"></div></div></div></div>`;
  void carta.offsetWidth; carta.style.transition = "";
}
function eleccionNombre(dir) {
  const r = $("carta-nombre").querySelector(".respuesta");
  if (!r) return;
  if (!dir) { r.classList.remove("visible"); return; }
  r.innerHTML = `<div class="texto-respuesta"><strong>${dir > 0 ? "¡La Revolución empieza hoy!" : "Primero, elecciones"}</strong></div>`;
  r.dataset.dir = dir;
  ajustarRespuesta(r);
  r.classList.add("visible");
}
function volverCartaNombre() {
  const carta = $("carta-nombre");
  carta.style.transition = ""; carta.style.transform = ""; carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  eleccionNombre(0);
}
function decidirNombre(dir) {
  if (nombreOcupada) return;
  if (dir > 0 && !nombreValido()) { volverCartaNombre(); $("input-nombre").focus(); return; }   // sin nombre no se empieza
  nombreOcupada = true;
  const carta = $("carta-nombre");
  eleccionNombre(dir);
  carta.style.transition = "";
  carta.style.transform = `translateX(${dir * 130}vw) rotate(${dir * 24}deg)`; carta.style.setProperty("--giro", `${dir * 24}deg`); carta.style.setProperty("--bajada", "1");
  carta.style.opacity = "0";
  setTimeout(() => { if (dir > 0) empezar(); else mostrar("screen-start"); }, 240);
}
arrastrable($("carta-nombre"), { activa: () => !nombreOcupada, mostrar: eleccionNombre, decidir: decidirNombre });
/* El texto de arriba y el campo del nombre miden lo mismo que la carta (que cambia con el alto de la pantalla) */
if (window.ResizeObserver) new ResizeObserver(() => {
  const w = $("carta-nombre").offsetWidth;
  if (w) $("screen-name").style.setProperty("--ancho-carta", w + "px");
}).observe($("carta-nombre"));

/* ---------- «Sigues en el poder»: el dictador de la era que empieza, en una carta, y un solo párrafo ---------- */
/* Informe de inteligencia de la era (detrás de la carta del dictador): la situación, la fuerza más tensa y, en la nota,
   hasta dos cosas que te esperan en la era siguiente */
function informeEra() {
  const masTensa = BARRAS.map(b => ({ id: b.id, v: E.barras[b.id] })).sort((a, b) => Math.abs(b.v - 50) - Math.abs(a.v - 50))[0];
  const estado = Math.abs(masTensa.v - 50) >= 10 ? LINEAS_BARRA[masTensa.id][masTensa.v > 50 ? "alto" : "bajo"] : "";
  const espera = E.orden.filter(b => FUTURO[b] && (FUTURO_ERA[b] || 2) === E.era + 1).slice(0, 2).map(b => PREVISION[b] || FUTURO[b]);
  return {
    foto: fotoDe("dictador-joven"), nombre: nombreCompleto(), color: "#1F2A5C", cargo: `Informe tras ${anios()} ${anios() === 1 ? "año" : "años"} en el poder`,
    historia: [INFORME_ERA[E.era], estado].filter(Boolean).join(" "),
    nota: espera.join(" ")
  };
}
function mostrarEra() {
  panelAbierto = false; ocupado = false;
  const n = anios();
  $("era-anios").textContent = `Has gobernado ${n} ${n === 1 ? "año" : "años"}`;
  $("era-texto").textContent = TEXTO_FIN_ERA[E.era];
  $("era-titulo").textContent = E.era < ERAS.length ? nombreEra(E.era + 1) : ""; requestAnimationFrame(() => ajustarTituloEra($("era-titulo")));
  const slug = DICTADOR_ERA[E.era + 1];
  const carta = $("carta-era");
  eraOcupada = false;
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1";
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  cartonDe(carta, slug);
  carta.innerHTML = slug
    ? `<div class="giro"><div class="cara"><div class="ilustracion"${fondoDe(slug)}>${svgPersonaje(slug, "El dictador")}<div class="respuesta"></div></div></div>` +
      `${dorsoFicha(informeEra())}</div>` : "";
  carta.classList.remove("volteada");
  void carta.offsetWidth; carta.style.transition = "";
  mostrar("screen-era");
  ajustarFicha(carta);
}
/* Seguir o retirarse, con frases de cada paso de era (la clave es la era que empieza) */
const FRASES_ERA = {
  2: { seguir: "La Revolución no ha terminado", dejar: "Convocar elecciones" },
  3: { seguir: "El Pueblo me necesita", dejar: "Retirarme a tiempo" },
  4: { seguir: "Aún me queda cuerda", dejar: "Ceder el testigo" }
};
let eraOcupada = false;
function eleccionEra(dir) {
  const r = $("carta-era").querySelector(".respuesta");
  if (!r) return;
  if (!dir) { r.classList.remove("visible"); return; }
  const f = FRASES_ERA[E.era + 1] || FRASES_ERA[2];
  r.innerHTML = `<div class="texto-respuesta"><strong>${esc(dir > 0 ? f.seguir : f.dejar)}</strong></div>`;
  r.dataset.dir = dir; ajustarRespuesta(r); r.classList.add("visible");
}
/* Derecha: seguir gobernando. Izquierda: te retiras y vuelves a la portada */
function decidirEra(dir) {
  if (eraOcupada) return;
  eraOcupada = true;
  const carta = $("carta-era");
  eleccionEra(dir);
  carta.style.transition = "";
  carta.style.transform = `translateX(${dir * 130}vw) rotate(${dir * 24}deg)`; carta.style.setProperty("--giro", `${dir * 24}deg`); carta.style.setProperty("--bajada", "1");
  carta.style.opacity = "0";
  setTimeout(() => { if (dir > 0) continuarEra(); else mostrar("screen-start"); }, 240);
}
arrastrable($("carta-era"), { activa: () => !eraOcupada, mostrar: eleccionEra, decidir: decidirEra,
  toque: () => { $("carta-era").classList.toggle("volteada"); eleccionEra(0); } });   // al tocarla se gira: detrás, el informe

/* ---------- Eventos ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!$("como-jugar").classList.contains("hidden")) cerrarComoJugar();
    else ocultarInfo();
    return;
  }
  if (!$("screen-era").classList.contains("hidden")) { if (e.key === "ArrowLeft") decidirEra(-1); if (e.key === "ArrowRight") decidirEra(1); return; }
  if (!$("screen-end").classList.contains("hidden") && $("screen-end").classList.contains("caida")) { if (e.key === "ArrowLeft") decidirFin(-1); if (e.key === "ArrowRight") decidirFin(1); return; }
  if (!$("screen-name").classList.contains("hidden")) {
    if (document.activeElement === $("input-nombre")) return;      // escribiendo: las flechas mueven el cursor
    if (e.key === "ArrowLeft") decidirNombre(-1);
    if (e.key === "ArrowRight") decidirNombre(1);
    return;
  }
  if ($("screen-game").classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") decidir(-1);
  if (e.key === "ArrowRight") decidir(1);
});
document.addEventListener("click", e => {
  if (!e.target.closest("#popup")) ocultarInfo();
});

$("btn-salir").addEventListener("click", () => { if (E && E.tutorial) terminarTutorial(); else mostrar("screen-start"); });
$("btn-comenzar").addEventListener("click", () => { if (tutorialVisto()) irANombre(); else empezarTutorial(); });

$("btn-repasar").addEventListener("click", empezarTutorial);
$("input-nombre").addEventListener("keydown", e => { if (e.key === "Enter") { $("input-nombre").blur(); decidirNombre(1); } });
$("input-nombre").addEventListener("input", actualizarVistaNombre);
$("btn-repetir").addEventListener("click", empezar);

/* Reverso de las cartas (mazo y tapa al voltear): el dibujo a bolígrafo, pegado sobre el kraft */
if (IMG["icono_reverso-dibujo"]) document.documentElement.style.setProperty("--reverso", `url(${IMG["icono_reverso-dibujo"].src})`);
colorReverso(1);                                      // ya en la pantalla del nombre, el mazo es el de la primera etapa
document.querySelectorAll("[data-icono]").forEach(el => { el.innerHTML = icono(el.dataset.icono, "en-linea"); });
/* «Cómo jugar»: ventana con las instrucciones */
function abrirComoJugar() {
  $("como-jugar").classList.remove("hidden");
  const caja = $("como-jugar").querySelector(".modal-caja");
  caja.scrollTop = 0; caja.focus({ preventScroll: true });
}
function cerrarComoJugar() { $("como-jugar").classList.add("hidden"); }
// 16 oct: el logo, provisional, escrito a rotulador (la imagen de letras recortadas queda en assets/logo/, sin usar)
$("logo").insertAdjacentHTML("afterbegin", `<span class="logo-texto" aria-hidden="true"><span>Comandante,</span><span><i>¡</i>ordene<i>!</i></span></span>`);
/* 17 oct: la escena del triunfo, abajo en la portada (como la foto de la entrada en la capital). Dos versiones:
   «movil» (más juntos) y «ancha» (en fila, para pantallas anchas); el CSS enseña la que toca. Los ojos miran a los
   lados como en las cartas y el farol de Hortensia late (PORTADA sale de tools/recortar.py portada). */
function svgEscenaPortada(v) {
  const d = PORTADA[v];
  const ojos = d.ojos.map(o => `<g transform="translate(${o.x} ${o.y}) scale(${o.k})"><g class="ojos" style="animation-delay:${-(Math.random() * 7).toFixed(2)}s">` +
    [o.izq, o.der].filter(Boolean).map(e => `<circle cx="${e[0]}" cy="${e[1]}" r="${o.r}"/>`).join("") + `</g></g>`).join("");   // sin los ojos tapados
  // la «ventana» es el trozo central que se ve (en el móvil, los de los lados se cortan): «slice» llena la caja y recorta
  return `<svg class="personaje escena-${v}" viewBox="0 0 ${d.ancho} ${d.alto}" preserveAspectRatio="xMidYMin slice" style="aspect-ratio:${d.ventana} / ${d.alto}">` +
    `<image href="${d.src}" x="0" y="0" width="${d.ancho}" height="${d.alto}"/>${svgBrillo("portada-" + v, d.brillo)}${ojos}</svg>`;
}
if (typeof PORTADA !== "undefined") $("escena-portada").innerHTML = svgEscenaPortada("movil") + svgEscenaPortada("ancha");
$("btn-cerrar-como").addEventListener("click", cerrarComoJugar);
$("como-jugar").addEventListener("click", e => { if (e.target === $("como-jugar")) cerrarComoJugar(); });
if (tutorialVisto()) $("btn-repasar").classList.remove("hidden");
/* «…/index.html?tutorial» vuelve a dejar el tutorial como no visto (para probarlo desde cero) */
if (/[?&]tutorial\b/.test(location.search)) { try { localStorage.removeItem(CLAVE_TUTORIAL); } catch (e) {} }
mostrar("screen-start");
