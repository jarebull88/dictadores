/* =====================================================
   UTILIDADES, ARCHIVO PERSISTENTE Y NOMBRE
   ===================================================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const limitar = v => Math.max(0, Math.min(100, v));

const CLAVE_ARCHIVO = "dictadores_archivo_v2";
let desbloqueados = new Set();
try {
  const raw = localStorage.getItem(CLAVE_ARCHIVO);
  if (raw) desbloqueados = new Set(JSON.parse(raw));
} catch (e) { /* sin almacenamiento: queda en memoria */ }
function desbloquear(id) {
  desbloqueados.add(id);
  try { localStorage.setItem(CLAVE_ARCHIVO, JSON.stringify([...desbloqueados])); } catch (e) {}
}

const CLAVE_NOMBRE = "dictadores_nombre_v2";
let nombreDictador = "";
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
  embargo: "🚫", frontera: "🧱", nacionalizado: "🏭", deuda: "💸"
};
const ESTADOS = {
  censura: {
    nombre: "Censura", bandera: "base.censura_previa", duracion: null,
    descripcion: "Los rumores ocupan el lugar de las noticias, y la vigilancia de barrio se vuelve más probable.",
    deriva: { pueblo: -1 }, cada: 1, pesos: { ojos_barrio: 2 }
  },
  vigilancia: {
    nombre: "Vigilancia", bandera: "base.comites_vigilancia", duracion: null,
    descripcion: "Cada vecino vigila al de al lado y el aparato de seguridad gana poder.",
    deriva: { ejercito: 1, pueblo: -1 }, cada: 2
  },
  culto: {
    nombre: "Culto", bandera: "base.culto_iniciado", duracion: null,
    descripcion: "Retratos, estatuas y fiestas. La gente aplaude, pero alguien tiene que pagarlas.",
    deriva: { pueblo: 1 }, cada: 2, crisis: 1
  },
  alineado: {
    nombre: "Alineado", bandera: "base.alineado_bloque_oriental", duracion: null,
    descripcion: "El aliado te sostiene y lleva la cuenta.",
    deriva: { potencias: 1 }, cada: 2, crisis: 1
  },
  embargo: {
    nombre: "Embargo", bandera: "base.embargo_en_marcha", duracion: 6,
    descripcion: "Nadie te vende nada, y lo poco que llega cuesta más.",
    deriva: { potencias: -1 }, cada: 2, multCrisis: 2
  },
  frontera: {
    nombre: "Frontera cerrada", bandera: "base.frontera_cerrada", duracion: null,
    descripcion: "Nadie entra ni sale, y el Ejército vigila la frontera.",
    deriva: { ejercito: 1, potencias: -1 }, cada: 2, pesos: { marchan: 0 }
  },
  nacionalizado: {
    nombre: "Nacionalizaciones", bandera: "base.nacionalizo_empresas", duracion: null,
    descripcion: "Lo que era privado ahora es tuyo, y las cuentas también.",
    deriva: { elite: -1 }, cada: 2, crisis: 1
  },
  deuda: {
    nombre: "Deuda externa", bandera: "base.deuda_externa", duracion: null,
    descripcion: "El acreedor llama cada mes.",
    deriva: { potencias: 1 }, cada: 2, crisis: 1
  }
};
const RESUMEN = {
  censura: "El Pueblo se enfría cada año.",
  vigilancia: "El Ejército sube y el Pueblo baja.",
  culto: "El Pueblo sube, pero la crisis crece.",
  alineado: "Potencias sube, pero la dependencia (crisis) crece.",
  embargo: "Potencias baja y las promesas cuestan el doble.",
  frontera: "El Ejército sube, Potencias baja y nadie se marcha.",
  nacionalizado: "La Élite baja y la crisis crece.",
  deuda: "Potencias sube, pero la crisis crece."
};
/* DIFICULTAD
   Los efectos de las cartas se escriben en una escala pequeña (±4 a ±12) y se multiplican al cargar.
   Cada fuerza tiene su propio factor porque no se toca con la misma frecuencia (el Pueblo aparece en casi
   todas las cartas y el Ejército en pocas). Con estos valores, jugando al azar se sobrevive a la era 1
   alrededor del 28 % de las veces (jugar siempre hacia el mismo lado es lo mismo que jugar al azar, porque los
   lados se mezclan), y las caídas se reparten entre las cuatro fuerzas, por arriba y por abajo. */
const FACTOR_EFECTOS = { pueblo: 2.2, ejercito: 3.5, elite: 2.7, potencias: 2.5 };
const FACTOR_DERIVA = 2;
CARTAS.forEach(c => ["izq", "der"].forEach(l => {
  const e = c[l].efectos;
  const fe = ERAS[(c.era || 1) - 1].factor || 1;           // cada era puede ajustar su propia dureza
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

/* Iconos de papel recortado (fuerzas, estados del régimen y archivo) */
/* Iconos: si hay versión dibujada a mano (assets/iconos/originales/dibujo-*.jpeg → «<id>-dibujo»), se usa esa en todo el
   juego; si no, el recorte de papel. Los dibujos van sin sombra: están pintados en la cartulina. */
const icono = (id, clase = "") => {
  // Prioridad: icono de cartón (estados, 13 oct) > dibujo a mano > recorte de papel antiguo
  const dib = IMG["icono_" + id + "-carton"] || IMG["icono_" + id + "-dibujo"], img = dib || IMG["icono_" + id];
  const cl = ["icono", dib ? "dibujo" : "", clase].filter(Boolean).join(" ");
  return img ? `<img class="${cl}" src="${img.src}" alt="" draggable="false">` : "";
};

/* Mini animaciones de cada personaje: se dibujan en SVG encima de la imagen, en el punto (x, y) de
   personajes.json ("animacion"). La colocación va en el grupo padre y el movimiento (CSS) en el hijo,
   para que la animación no pise el atributo transform. */
const VOLUTA = '<circle cx="0" cy="-12" r="15"/><circle cx="13" cy="-25" r="12"/><circle cx="-7" cy="-34" r="10"/>';
const ESTRELLA = '<path d="M0 -26 C3 -6 6 -3 26 0 C6 3 3 6 0 26 C-3 6 -6 3 -26 0 C-6 -3 -3 -6 0 -26Z"/>';
const ANIMACION = {
  humo:     () => `<g class="humo humo1">${VOLUTA}</g><g class="humo humo2">${VOLUTA}</g>`,
  timbre:   () => '<g class="timbre">' +
              '<path d="M-78 -40 q-14 22 0 44 M-98 -52 q-20 34 0 68 M78 -40 q14 22 0 44 M98 -52 q20 34 0 68"/></g>',
  flecha:   () => '<g class="flecha"><path d="M-14 4 L14 -22 L18 10 Z"/></g>',
  destello: () => `<g class="destello">${ESTRELLA}</g>`,
  mosca:    () => '<g class="mosca"><g class="mosca-cuerpo" transform="scale(2.4)"><ellipse class="ala" cx="-5" cy="-7" rx="7" ry="4" transform="rotate(-30)"/>' +
              '<ellipse class="ala" cx="5" cy="-7" rx="7" ry="4" transform="rotate(30)"/><ellipse cx="0" cy="0" rx="6" ry="5"/></g></g>',
  sello:    () => '<g class="sello"><rect x="-82" y="-24" width="164" height="48" rx="4"/>' +
              '<text x="0" y="10" text-anchor="middle">PROHIBIDO</text></g>',
  piloto:   () => '<g class="piloto"><circle r="10"/></g>',
  gota:     () => '<g class="gota"><g transform="scale(1.7)"><path d="M0 -14 C6 -4 10 2 10 7 A10 10 0 0 1 -10 7 C-10 2 -6 -4 0 -14Z"/><ellipse class="brillo" cx="-3" cy="5" rx="2.5" ry="4"/></g></g>'
};
/* Cada personaje tiene su cartón fijo: color («carton») y textura 1-3 («carton_textura») en personajes.json.
   (La textura 5, de pulpa, va encima de todos.) */
function cartonDe(carta, slug) {
  const p = RETRATOS[slug] || {};
  carta.classList.remove("k1", "k2", "k3", "purpurina");
  carta.classList.add("k" + (p.carton_textura || 2));
  carta.style.setProperty("--c-base", p.carton || "#D2AE7C");
}
/* Fondo de escena de cada personaje: un color plano que pega con su ropa ("fondo" en personajes.json) */
const fondoDe = slug => RETRATOS[slug] && RETRATOS[slug].fondo ? ` style="--fondo-escena:${RETRATOS[slug].fondo}"` : "";
function svgPersonaje(slug, nombre) {
  const p = RETRATOS[slug];
  const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
  const a = p.animacion && ANIMACION[p.animacion.tipo]
    ? `<g class="animacion anim-${p.animacion.tipo}" transform="translate(${p.animacion.x} ${p.animacion.y})">${ANIMACION[p.animacion.tipo]()}</g>` : "";
  const arriba = p.arriba || 0;      // se recorta el aire de encima de la cabeza; el resto se ve entero
  const desfase = -(Math.random() * 7).toFixed(2);   // cada carta mira a su ritmo
  return `<svg class="personaje" viewBox="0 ${arriba} ${p.ancho} ${p.alto - arriba}" preserveAspectRatio="xMidYMax meet" style="aspect-ratio:${p.ancho} / ${p.alto - arriba}" role="img" aria-label="${esc(nombre || p.nombre)}">` +
    `<image class="base" href="${p.src}" x="0" y="0" width="${p.ancho}" height="${p.alto}"/>${a}` +
    `<g class="ojos" style="animation-delay:${desfase}s"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></svg>`;
}

/* =====================================================
   LAS CUATRO FUERZAS: un icono, una barra horizontal debajo y los puntos de pista bajo la barra
   ===================================================== */
/* Emojis de las fuerzas: solo para los documentos generados; en el juego se ven los iconos de papel */
const EMOJI_FUERZA = { pueblo: "✊", ejercito: "🪖", elite: "🎩", potencias: "🌐" };

/* Qué es cada fuerza (ventana emergente al tocar su símbolo) */
const FUERZAS = {
  pueblo:    { nombre: "Pueblo",    quien: "La población: obreros, campesinos y estudiantes. Aplaude o protesta según cómo vive." },
  ejercito:  { nombre: "Ejército",  quien: "Las fuerzas armadas, la policía y el aparato de seguridad." },
  elite:     { nombre: "Élite",     quien: "Empresarios, terratenientes, altos funcionarios y dirigentes del Partido." },
  potencias: { nombre: "Potencias", quien: "Los países extranjeros, tanto aliados como enemigos." }
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
    archivoEntregado: false,
    turnoArchivo: 0,
    aviso: null,
    pistaVista: false,
    actual: null
  };
  // Un archivo histórico por partida (por era), en un momento aleatorio
  E.turnoArchivo = 2 + Math.floor(Math.random() * (E.N - 1));
}

/* Una era dura entre 6 y 8 cartas (unos 9-12 años). Las ventanas de las anclas y turnoMin se cuentan desde el inicio de la era. */
const anioEra = () => E.turno - E.inicioEra + 1;
const finEra = () => E.inicioEra + E.N - 1;
const deEra = c => (c.era || 1) === E.era;
const libre = c => (!E.vistas.has(c.id) || (c.repetible && E.turno - (E.ultima[c.id] || 0) >= (c.descanso || 10))) && !grupoVisto(c);
/* Cartas de un mismo «grupo» (p. ej. las tres cartas iniciales): solo sale una por partida, sorteada */
const grupoVisto = c => !!c.grupo && CARTAS.some(o => o.grupo === c.grupo && o.id !== c.id && E.vistas.has(o.id));
function iniciarEra(n) {
  const def = ERAS[n - 1];
  E.era = n;
  E.inicioEra = E.turno;
  E.N = def.min + Math.floor(Math.random() * (def.max - def.min + 1));
  E.archivoEntregado = false;
  E.turnoArchivo = E.inicioEra + 1 + Math.floor(Math.random() * (E.N - 1));
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
  E.meses += MESES_POR_CARTA[0] + Math.floor(Math.random() * (MESES_POR_CARTA[1] - MESES_POR_CARTA[0] + 1));
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
const PANTALLAS = ["screen-start", "screen-name", "screen-game", "screen-archive", "screen-era", "screen-end"];
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
  ocultarAvisoArchivo();
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
      ${parBarra(b.id)}
      <div class="punto-zona"><div class="punto"></div></div>
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
  $("anios-poder").textContent = n === 0 ? "Recién llegado" : `${n} ${n === 1 ? "año" : "años"} en el poder`;
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
function abrirPopup(clave, html, ancla, autocierre) {
  const pop = $("popup");
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
  const cadencia = d.cada === 1 ? "Actúa en cada decisión." : `Actúa cada ${d.cada} decisiones.`;
  const tiempo = d.duracion
    ? `${cadencia} Dura ${d.duracion} decisiones${s ? " y lleva " + s.edad : ""}.`
    : `${cadencia} Se queda hasta que otro estado lo desplace: solo caben ${MAX_RANURAS}.`;
  return `${etiqueta ? `<small class="etiqueta-pop">${esc(etiqueta)}</small>` : ""}<b>${icono(id, "en-linea")}${esc(d.nombre)}</b><span>${esc(d.descripcion)}</span><span class="efecto">${esc(RESUMEN[id] || "")}</span><small>${esc(tiempo)}</small>`;
}
function mostrarInfo(i) {
  const s = E.estados[i];
  const el = $("ranuras").querySelectorAll("button.ranura")[0] && $("ranuras").children[i];
  if (!s || !el) { ocultarInfo(); return; }
  abrirPopup("estado-" + s.id, contenidoEstado(s.id, s), el);
}
function mostrarFuerza(id, el) {
  const f = FUERZAS[id];
  const bajo = FINALES[id + "_0"].titulo, alto = FINALES[id + "_100"].titulo;
  abrirPopup("fuerza-" + id,
    `<b>${icono(id, "en-linea")}${esc(f.nombre)}</b><span>${esc(f.quien)}</span>
     <div class="extremos"><div>▼ Si se vacía: <strong>${esc(bajo)}</strong>.</div><div>▲ Si se llena: <strong>${esc(alto)}</strong>.</div></div>
     <small>Los puntos que ves al arrastrar indican cuánto se moverá, no si sube o baja.</small>`, el);
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
window.addEventListener("resize", () => { if (E && E.actual && !$("screen-game").classList.contains("hidden")) ajustarMensaje(); });

function fichaPersonaje(cargo) {
  const f = FICHAS[cargo] || { nombre: cargo, historia: "" };
  return `<div class="dorso"><div class="hoja"><small class="ficha-etiqueta">Expediente</small><b class="ficha-nombre">${esc(f.nombre)}</b>` +
    `<span class="ficha-cargo">${esc(cargo)}</span><p class="ficha-historia">${esc(f.historia)}</p><small class="ficha-pie">Toca la carta para volver</small></div></div>`;
}
function pintarCarta(c) {
  const slug = PERSONAJE_SLUG[c.personaje];
  const ilus = slug && RETRATOS[slug]
    ? svgPersonaje(slug, c.personaje)
    : `<div class="ph"><b>Sin retrato</b></div>`;
  $("mensaje").textContent = c.texto;
  ajustarMensaje();
  /* Anverso: el personaje (la respuesta va en la parte alta de la carta). Reverso: su ficha. */
  $("carta").classList.remove("volteada");
  cartonDe($("carta"), slug);
  $("carta").innerHTML = `<div class="giro"><div class="tapa"></div><div class="cara"><div class="ilustracion${slug && RETRATOS[slug] ? "" : " ph"}"${fondoDe(slug)}>${ilus}` +
    `<div class="respuesta" id="respuesta"></div></div></div>${fichaPersonaje(c.personaje)}</div>`;
}
/* Al tocar la carta se voltea: media vuelta en 3D (CSS, .giro) y enseña la ficha del personaje */
function voltear() {
  if (modoEstado) { recogerEstado(); return; }
  if (ocupado) return;
  pintarEleccion(0);
  $("carta").classList.toggle("volteada");
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
    else r.classList.remove("visible");
  }
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
  mostrar("screen-game");
  $("nombre-dictador").textContent = nombreCompleto();
  E.avisoPendiente = null;
  E.archivoPendiente = null;
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
  if (ocupado || panelAbierto) return;
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

  const caida = comprobarCaida();
  const eraCompleta = !caida && E.turno > finEra();
  let despues;
  if (caida) despues = () => terminar(caida);
  else if (eraCompleta) despues = finDeEra;
  else despues = siguiente;

  // Un archivo histórico por partida, en un momento aleatorio: el de la carta que acabas de decidir.
  // No detiene la partida: se avisa de forma discreta en la barra inferior.
  const toca = !E.archivoEntregado && turnoDecidido >= E.turnoArchivo && !!c.archivo && !desbloqueados.has(c.id);
  if (toca) { E.archivoEntregado = true; E.archivoPendiente = c.id; desbloquear(c.id); }
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
let temporizadorArchivo = null;
function contenidoArchivo(c) {
  return `<small class="etiqueta-pop">Archivo histórico desbloqueado</small><b>${esc(c.titulo)}</b><span>${esc(c.archivo)}</span><small>Datos pendientes de verificar.</small>`;
}
function mostrarAvisoArchivo() {
  const id = E.archivoPendiente;
  if (!id) return;
  E.archivoPendiente = null;
  const c = POR_ID[id], btn = $("aviso-archivo");
  btn.innerHTML = icono("archivo", "en-linea") + "Archivo desbloqueado";
  btn.setAttribute("aria-label", `Archivo desbloqueado: ${c.titulo}`);
  btn.dataset.id = id;
  btn.classList.remove("hidden");
  $("anios-poder").classList.add("hidden");
  clearTimeout(temporizadorArchivo);
  temporizadorArchivo = setTimeout(ocultarAvisoArchivo, 9000);
}
function ocultarAvisoArchivo() {
  clearTimeout(temporizadorArchivo);
  $("aviso-archivo").classList.add("hidden");
  $("anios-poder").classList.remove("hidden");
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
  nacionalizado: "Ahora todo es del pueblo. Y el pueblo eres tú.",
  embargo: "La culpa de todo por fin tiene nombre.",
  deuda: "La revolución se pagará en cómodos plazos.",
  vigilancia: "🎵 En cada cuadra un comité. En cada barrio, Revolución. 🎵",
  culto: "El pueblo te quiere tanto que he tenido que repartir tu retrato por todo el país.",
  censura: "Qué bonito cuando todos piensan igual.",
  frontera: "El imperialismo lleva años intentando llevarse a nuestros mejores talentos.",
  alineado: "La soberanía cuenta con el respaldo de una potencia que decide cómo debes ejercerla."
};
const FONDO_ESTADO = { censura: "#E86A5C", vigilancia: "#4FC3B8", culto: "#9B7FD4", alineado: "#F29A7A",
  embargo: "#5BA8DC", frontera: "#7CC67A", nacionalizado: "#7CC6EE", deuda: "#A5D867" };
function mostrarCartaEstado() {
  const n = E.estadoNuevo, d = ESTADOS[n.id];
  modoEstado = true; ocupado = false;
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
    `<div class="etiqueta-boli"><b>${esc(d.nombre)}</b></div>` +
    `<div class="respuesta" id="respuesta"></div></div></div></div>`;
  entrarCarta(carta);
  pintarRanuras();
}
/* Escena de la carta de estado (collage de papel alrededor de su icono). Los marcos vacíos llevan la cara del
   dictador de la etapa en curso; la máscara de huecos (papel crema visible) la recorta donde algo tapa el marco. */
const dictadorDeEra = era => DICTADOR_ERA[era] || "dictador-joven";
function svgEscena(id) {
  const e = typeof ESCENAS !== "undefined" && ESCENAS[id], img = IMG["icono_" + id + "-escena"];
  if (!e || !img) return "";
  let caras = "";
  const huecos = IMG["icono_" + id + "-huecos"];
  if (e.marcos.length && huecos) {
    const p = RETRATOS[dictadorDeEra(E ? E.era : 1)];
    const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
    const d = xd - xi, ex = (xi + xd) / 2, ey = (yi + yd) / 2;
    const vista = `${ex - 2.1 * d} ${ey - 2.3 * d} ${4.2 * d} ${5.4 * d}`;     // cabeza y hombros
    const retrato = (m, i) => `<g transform="translate(${m.x} ${m.y}) rotate(${m.giro})">` +
      `<svg x="${-m.w / 2}" y="${-m.h / 2}" width="${m.w}" height="${m.h}" viewBox="${vista}" preserveAspectRatio="xMidYMid slice">` +
      `<rect x="${ex - 4 * d}" y="${ey - 4 * d}" width="${8 * d}" height="${10 * d}" fill="${p.fondo}"/>` +
      `<image href="${p.src}" width="${p.ancho}" height="${p.alto}"/>` +
      `<g class="ojos-fijos"><circle cx="${xi}" cy="${yi}" r="${r}"/><circle cx="${xd}" cy="${yd}" r="${r}"/></g></svg></g>`;
    caras = `<mask id="huecos-${id}"><image href="${huecos.src}" width="${e.ancho}" height="${e.alto}"/></mask>` +
      `<g mask="url(#huecos-${id})">${e.marcos.map(retrato).join("")}</g>`;
  }
  return `<svg class="escena" viewBox="0 0 ${e.ancho} ${e.alto}" role="img" aria-label="${esc(ESTADOS[id].nombre)}">` +
    `<image href="${img.src}" width="${e.ancho}" height="${e.alto}"/>${caras}</svg>`;
}
/* La carta vuela, encogiéndose, hasta su casilla de abajo; después sale la carta siguiente */
function recogerEstado() {
  if (!modoEstado || ocupado) return;
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
  mostrarAvisoArchivo();
}

/* Cada carta es un año y medio, más o menos: así una partida entera da unos 40-50 años, como un dictador de verdad */
const MESES_POR_CARTA = [12, 24];
function anios() { return Math.floor((E.meses || 0) / 12); }

/* «Sigues en el poder»: qué ha pasado y cuál es el objetivo de la era siguiente */
const TEXTO_FIN_ERA = {
  1: "Has conquistado el poder. Ahora toca aferrarse a él. Tus decisiones pasadas empiezan a volverse en tu contra. Fuera de tus fronteras crece la oposición y, dentro, aún quedan voces que silenciar. La Revolución debe resistir.",
  2: "La revolución ya es costumbre y desde hoy serás Excelencia. Llega el culto a tu persona, y alguien tendrá que pagarlo.",
  3: "Ya eres Padre de la Patria y los médicos te visitan cada semana. Aguanta y morirás en tu cama, en el poder."
};
/* Ilustración del dictador en «Sigues en el poder», según la era que empieza */
const DICTADOR_ERA = { 2: "dictador-asentado", 3: "dictador-culto", 4: "dictador-viejo" };
/* Victoria: sobrevivir a la última era. El final al que aspira todo dictador: morir de viejo, en la cama y en el poder.
   La esquela cambia según lo que hayas decidido en la partida. */
const TEXTO_VICTORIA = n => `Gobernaste ${n} años. Ningún general, ninguna revolución y ningún aliado consiguió echarte: te echó la biología. Muy pocos dictadores lo consiguen.`;
const EPITAFIO = [
  ["base.mausoleo_construido", "Tu cuerpo, embalsamado, recibe visitas en el mausoleo. Las colas son voluntarias."],
  ["base.sucesor_designado", "Tu sucesor jura el cargo antes de que se enfríe el café."],
  ["base.capital_rebautizada", "La capital lleva tu nombre. De momento."],
  ["base.monumento_colosal", "Tu estatua de cuarenta metros se ve desde la costa."],
  ["base.palacio_del_pueblo", "El palacio del pueblo sigue sin terminar."],
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
    /* Caída: «¡Has caído!», qué fuerza cayó, el relato y la causa en una carta (derecha = jugar de nuevo, izquierda = archivo) */
    const f = FINALES[clave];
    const [idF, extremo] = [clave.split("_")[0], clave.endsWith("_100") ? 100 : 0];
    $("fin-principal").textContent = "¡Has caído!";
    $("fin-titulo").textContent = f.titulo;
    $("fin-texto").textContent = f.texto;
    caja.textContent = `${FUERZAS[idF].nombre} llegó al ${extremo === 100 ? "máximo" : "mínimo"}.`;
    caja.classList.remove("hidden");
    pintarCartaFin(f.titulo);
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

  const cajaArch = $("fin-archivo");
  cajaArch.innerHTML = "";
  let cFin = E.archivoPendiente ? POR_ID[E.archivoPendiente] : null;
  if (!cFin && !E.archivoEntregado) {
    const cand = [...E.vistas].map(id => POR_ID[id]).filter(c => c && c.archivo && !desbloqueados.has(c.id));
    if (cand.length) { cFin = cand[Math.floor(Math.random() * cand.length)]; E.archivoEntregado = true; desbloquear(cFin.id); }
  }
  E.archivoPendiente = null;
  if (cFin) {
    cajaArch.innerHTML = `<div class="archivo"><h3>Archivo histórico desbloqueado</h3><h4>${esc(cFin.titulo)}</h4>
      <div class="arch-texto hidden" id="fin-arch-texto"><p>${cFin.archivo}</p><small>Datos pendientes de verificar.</small></div>
      <button class="enlace" id="btn-leer-archivo" type="button">Leer</button></div>`;
    $("btn-leer-archivo").addEventListener("click", () => {
      $("fin-arch-texto").classList.remove("hidden");
      $("btn-leer-archivo").remove();
    });
  }

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

  if (clave) $("fin-archivo").innerHTML = "";        // al caer, el archivo está en la carta (izquierda)
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

/* ---------- Carta de la caída: la causa como título. Derecha = jugar de nuevo; izquierda = archivo histórico ---------- */
let finOcupada = false;
function pintarCartaFin(titulo) {
  const carta = $("carta-fin");
  finOcupada = false;
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1";
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  cartonDe(carta, "");
  carta.innerHTML = `<div class="giro"><div class="cara carta-caida"><div class="ilustracion" style="--fondo-escena:#7A2E2A">` +
    `<div class="titulo-caida">${esc(titulo)}</div><div class="respuesta"></div></div></div></div>`;
  void carta.offsetWidth; carta.style.transition = "";
}
function eleccionFin(dir) {
  const r = $("carta-fin").querySelector(".respuesta");
  if (!r) return;
  if (!dir) { r.classList.remove("visible"); return; }
  r.innerHTML = `<div class="texto-respuesta"><strong>${dir > 0 ? "Jugar de nuevo" : "Archivo histórico"}</strong></div>`;
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
  setTimeout(() => { if (dir > 0) empezar(); else { abrirArchivo("screen-end"); pintarCartaFin($("fin-titulo").textContent); } }, 240);
}
arrastrable($("carta-fin"), { activa: () => !finOcupada, mostrar: eleccionFin, decidir: decidirFin });

/* ---------- Archivo histórico ---------- */
function pintarArchivo() {
  $("archivo-intro").textContent = `Has descubierto ${desbloqueados.size} de ${ARCHIVABLES.length} referencias históricas. Toca una para leerla.`;
  $("archivo-lista").innerHTML = ARCHIVABLES.map(c => desbloqueados.has(c.id)
    ? `<button class="fila-archivo" type="button" data-id="${c.id}"><span class="ico-circulo">${icono("archivo")}</span><span class="textos"><b>${c.titulo}</b><span class="sub-fila">${c.personaje}</span></span></button>`
    : `<div class="fila-archivo cerrada"><span class="ico-circulo">${icono("bloqueado")}</span><span class="textos"><b>Sin descubrir</b></span></div>`
  ).join("");
  $("archivo-lista").querySelectorAll("button.fila-archivo").forEach(b =>
    b.addEventListener("click", () => abrirDetalle(b.dataset.id))
  );
}

let detalleAbierto = false;
function abrirDetalle(id) {
  const c = POR_ID[id];
  detalleAbierto = true;
  $("archivo-lista").classList.add("hidden");
  $("archivo-intro").classList.add("hidden");
  const det = $("archivo-detalle");
  det.innerHTML = `<div class="archivo"><h3>Archivo histórico</h3><h4>${c.titulo}</h4><p>${c.archivo}</p><small>Datos pendientes de verificar.</small></div>`;
  det.classList.remove("hidden");
  det.scrollTop = 0;
  $("btn-archivo-volver").innerHTML = icoUI("atras") + "Archivo";
}
function cerrarDetalle() {
  detalleAbierto = false;
  $("archivo-detalle").classList.add("hidden");
  $("archivo-lista").classList.remove("hidden");
  $("archivo-intro").classList.remove("hidden");
  $("btn-archivo-volver").innerHTML = icoUI("atras") + "Volver";
}
let origenArchivo = "screen-start";
function abrirArchivo(desde) {
  origenArchivo = desde;
  cerrarDetalle();
  pintarArchivo();
  mostrar("screen-archive");
  $("archivo-lista").scrollTop = 0;
}
function atrasArchivo() {
  if (detalleAbierto) cerrarDetalle();
  else mostrar(origenArchivo);
}

/* ---------- Nombre del dictador ---------- */
function actualizarVistaNombre() {
  $("nombre-error").textContent = /\s/.test($("input-nombre").value.trim()) ? "Una sola palabra: Aureliano, Anselmo, Esteban…" : "";
}
function irANombre() {
  $("input-nombre").value = nombreDictador;
  actualizarVistaNombre();
  mostrar("screen-name");
}
/* Comprueba el nombre; si vale, lo guarda y devuelve true. Si no, explica por qué y devuelve false. */
function nombreValido() {
  let v = $("input-nombre").value.trim();
  if (!v) {
    $("nombre-error").textContent = "Un dictador sin nombre no sale en los libros de historia.";
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
function arrastrable(carta, op) {
  let drag = null;
  // Distancia a partir de la cual se decide: es también la que muestra la respuesta, así que si se ve, soltar decide
  const umbral = () => Math.max(20, carta.offsetWidth * 0.07);      // casi en cuanto empieza a inclinarse
  function marcarListo(listo) {
    if (carta.classList.contains("listo") === listo) return;
    carta.classList.toggle("listo", listo);
    const r = carta.querySelector(".respuesta"); if (r) r.classList.toggle("firme", listo);
    if (listo) { try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {} }
  }
  function volver() {
    marcarListo(false);
    carta.style.transition = ""; carta.style.transform = ""; carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
    op.mostrar(0);
  }
  carta.addEventListener("pointerdown", e => {
    if (!op.activa()) return;
    drag = { x: e.clientX, dx: 0, dir: 0, t0: e.timeStamp, hist: [{ t: e.timeStamp, x: e.clientX }] };
    arrastrando = true;
    carta.setPointerCapture(e.pointerId);
    carta.style.transition = "none";
    ocultarInfo();
  });
  carta.addEventListener("pointermove", e => {
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    if (carta.classList.contains("volteada") || (op.fija && op.fija())) return;   // por detrás (o si es fija) no se arrastra: solo se toca
    drag.hist.push({ t: e.timeStamp, x: e.clientX });
    if (drag.hist.length > 6) drag.hist.shift();
    carta.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 18}deg)`;
    carta.style.setProperty("--giro", `${drag.dx / 18}deg`);
    // El panel baja desde el primer píxel, al ritmo del arrastre; llega abajo justo en el umbral, cuando sale el texto
    carta.style.setProperty("--bajada", Math.min(1, Math.abs(drag.dx) / umbral()).toFixed(3));
    const dir = Math.abs(drag.dx) > umbral() ? Math.sign(drag.dx) : 0;
    if (dir !== drag.dir) { drag.dir = dir; op.mostrar(dir); }
    marcarListo(dir !== 0);
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
arrastrable($("carta"), { activa: () => !ocupado && !panelAbierto, fija: () => modoEstado, mostrar: pintarEleccion, decidir, toque: voltear });

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
function parrafoEra() {
  const masTensa = BARRAS.map(b => ({ id: b.id, v: E.barras[b.id] })).sort((a, b) => Math.abs(b.v - 50) - Math.abs(a.v - 50))[0];
  const estado = Math.abs(masTensa.v - 50) >= 10 ? LINEAS_BARRA[masTensa.id][masTensa.v > 50 ? "alto" : "bajo"] : "";
  const espera = E.orden.filter(b => FUTURO[b] && (FUTURO_ERA[b] || 2) === E.era + 1).slice(0, 2)
    .map(b => FUTURO[b].replace(/\.$/, "")).map(t => t.charAt(0).toLowerCase() + t.slice(1));
  return [TEXTO_FIN_ERA[E.era], estado, espera.length ? `Te espera: ${espera.join("; ")}.` : ""].filter(Boolean).join(" ");
}
function mostrarEra() {
  panelAbierto = false; ocupado = false;
  const n = anios();
  $("era-anios").textContent = `Has gobernado ${n} ${n === 1 ? "año" : "años"}`;
  $("era-texto").textContent = parrafoEra();
  const slug = DICTADOR_ERA[E.era + 1];
  const carta = $("carta-era");
  eraOcupada = false;
  carta.style.transition = "none"; carta.style.transform = ""; carta.style.opacity = "1";
  carta.style.setProperty("--giro", "0deg"); carta.style.setProperty("--bajada", "0");
  cartonDe(carta, slug);
  carta.innerHTML = slug
    ? `<div class="giro"><div class="cara"><div class="ilustracion"${fondoDe(slug)}>${svgPersonaje(slug, "El dictador")}<div class="respuesta"></div></div></div></div>` : "";
  void carta.offsetWidth; carta.style.transition = "";
  mostrar("screen-era");
}
/* Seguir o retirarse, con frases de cada paso de era (la clave es la era que empieza) */
const FRASES_ERA = {
  2: { seguir: "La Revolución no ha terminado", dejar: "Convocar elecciones" },
  3: { seguir: "El pueblo me necesita", dejar: "Retirarme a tiempo" },
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
arrastrable($("carta-era"), { activa: () => !eraOcupada, mostrar: eleccionEra, decidir: decidirEra });

/* ---------- Eventos ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!$("como-jugar").classList.contains("hidden")) cerrarComoJugar();
    else if (!$("screen-archive").classList.contains("hidden")) atrasArchivo();
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

$("btn-salir").addEventListener("click", () => mostrar("screen-start"));
$("btn-comenzar").addEventListener("click", irANombre);
$("input-nombre").addEventListener("keydown", e => { if (e.key === "Enter") { $("input-nombre").blur(); decidirNombre(1); } });
$("input-nombre").addEventListener("input", actualizarVistaNombre);
$("aviso-archivo").addEventListener("click", ev => {
  ev.stopPropagation();
  const c = POR_ID[$("aviso-archivo").dataset.id];
  if (c) abrirPopup("archivo-" + c.id, contenidoArchivo(c), $("aviso-archivo"));
});
$("btn-repetir").addEventListener("click", empezar);
$("btn-fin-archivo").addEventListener("click", () => abrirArchivo("screen-end"));
$("btn-archivo-volver").addEventListener("click", atrasArchivo);

$("btn-archivo-volver").innerHTML = icoUI("atras") + "Volver";
document.querySelectorAll("[data-icono]").forEach(el => { el.innerHTML = icono(el.dataset.icono, "en-linea"); });
/* «Cómo jugar»: ventana con las instrucciones */
function abrirComoJugar() {
  $("como-jugar").classList.remove("hidden");
  const caja = $("como-jugar").querySelector(".modal-caja");
  caja.scrollTop = 0; caja.focus({ preventScroll: true });
}
function cerrarComoJugar() { $("como-jugar").classList.add("hidden"); }
$("btn-como-jugar").addEventListener("click", abrirComoJugar);
$("btn-portada-archivo").addEventListener("click", () => abrirArchivo("screen-start"));
if (IMG.logo) $("logo").insertAdjacentHTML("afterbegin", `<img src="${IMG.logo.src}" alt="" draggable="false">`);
$("btn-cerrar-como").addEventListener("click", cerrarComoJugar);
$("como-jugar").addEventListener("click", e => { if (e.target === $("como-jugar")) cerrarComoJugar(); });
mostrar("screen-start");
