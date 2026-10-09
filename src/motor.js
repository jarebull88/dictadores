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
const tratamiento = () => (E && E.era >= 3 ? "Excelencia" : "Comandante");
const nombreCompleto = () => tratamiento() + " " + nombreDictador;
function guardarNombre(n) { try { localStorage.setItem(CLAVE_NOMBRE, n); } catch (e) {} }

/* =====================================================
   ESTADOS DEL RÉGIMEN (las cuatro ranuras bajo la carta)
   Un estado se activa cuando el jugador toma cierta decisión (bandera).
   Solo caben 4: el más antiguo sale cuando entra uno nuevo.
   - deriva / cada: cambia las barras solo, cada N años
   - crisis: suma a la cuenta oculta, cada N años
   - multCrisis: multiplica lo que suman las decisiones a la crisis
   - pesos: cambia la probabilidad de ciertas cartas (0 = no salen)
   - duracion: años que dura (null = hasta que lo desplace otro)
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
/* Con el dictador solo hablan sus ministros y los embajadores extranjeros; la gente corriente y Varela solo son mencionados.
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
const icono = (id, clase = "") => IMG["icono_" + id]
  ? `<img class="icono${clase ? " " + clase : ""}" src="${IMG["icono_" + id].src}" alt="" draggable="false">` : "";

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
function svgPersonaje(slug, nombre) {
  const p = RETRATOS[slug];
  const [xi, yi] = p.ojos.izq, [xd, yd] = p.ojos.der, r = p.ojos.r;
  const a = p.animacion && ANIMACION[p.animacion.tipo]
    ? `<g class="animacion anim-${p.animacion.tipo}" transform="translate(${p.animacion.x} ${p.animacion.y})">${ANIMACION[p.animacion.tipo]()}</g>` : "";
  const arriba = p.arriba || 0;      // se recorta el aire de encima de la cabeza; el resto se ve entero
  const desfase = -(Math.random() * 7).toFixed(2);   // cada carta mira a su ritmo
  return `<svg class="personaje" viewBox="0 ${arriba} ${p.ancho} ${p.alto - arriba}" preserveAspectRatio="xMidYMax meet" role="img" aria-label="${esc(nombre || p.nombre)}">` +
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

/* Una era dura entre 6 y 8 años. Las ventanas de las anclas y turnoMin se cuentan desde el inicio de la era. */
const anioEra = () => E.turno - E.inicioEra + 1;
const finEra = () => E.inicioEra + E.N - 1;
const deEra = c => (c.era || 1) === E.era;
const libre = c => !E.vistas.has(c.id) || (c.repetible && E.turno - (E.ultima[c.id] || 0) >= (c.descanso || 10));
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
  if (!cand.length) return null;
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
  if (forzadas.length) return forzadas[0];

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
const PANTALLAS = ["screen-start", "screen-name", "screen-game", "screen-archive", "screen-end"];
function mostrar(id) {
  PANTALLAS.forEach(s => $(s).classList.toggle("hidden", s !== id));
  ocultarInfo();
  ocultarAvisoArchivo();
  if (id === "screen-start") $("cont-archivo").textContent = `${desbloqueados.size} de ${ARCHIVABLES.length}`;
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
  $("anios-poder").textContent = n === 0 ? "Recién llegado al poder" : `${n} ${n === 1 ? "año" : "años"} en el poder`;
}

function pintarRanuras() {
  const cont = $("ranuras");
  cont.innerHTML = Array.from({ length: MAX_RANURAS }, (_, i) => {
    const s = E.estados[i];
    return s
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
  const cadencia = d.cada === 1 ? "Actúa cada año." : `Actúa cada ${d.cada} años.`;
  const tiempo = d.duracion
    ? `${cadencia} Dura ${d.duracion} años${s ? " y lleva " + s.edad : ""}.`
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

function pintarCarta(c) {
  const slug = PERSONAJE_SLUG[c.personaje];
  const ilus = slug && RETRATOS[slug]
    ? svgPersonaje(slug, c.personaje)
    : `<div class="ph"><b>Sin retrato</b></div>`;
  $("mensaje").textContent = c.texto;
  /* la respuesta va en la parte baja de la foto, para no tapar los ojos mientras se arrastra */
  $("carta").innerHTML = `<div class="ilustracion${slug && RETRATOS[slug] ? "" : " ph"}">${ilus}<div class="respuesta" id="respuesta"></div></div><div class="nombre">${esc(c.personaje)}</div>`;
}

function pintarEleccion(dir) {
  const c = E && E.actual;
  const op = c && !panelAbierto && dir !== 0 ? opcionDe(dir) : null;
  const r = $("respuesta");
  if (r) {
    if (op) { r.innerHTML = `<strong>${op.accion}</strong><span>${op.remate}</span>`; r.classList.add("visible"); }
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
  void carta.offsetWidth;
  carta.style.transition = "";
  panelAbierto = false;
  ocupado = false;
  pintarEleccion(0);
}

function decidir(dir) {
  if (ocupado || panelAbierto) return;
  ocupado = true;
  ocultarInfo();
  const carta = $("carta");
  pintarEleccion(dir);
  carta.classList.add("listo");
  const rsp = $("respuesta"); if (rsp) rsp.classList.add("firme");
  carta.style.transition = "";
  carta.style.transform = `translateX(${dir * 130}vw) rotate(${dir * 24}deg)`;
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
    const idx = E.estados.findIndex(s => s.id === ent[ent.length - 1]);
    let html = contenidoEstado(ent[ent.length - 1], E.estados[idx], "Nuevo estado");
    if (sal.length) html += `<small>${esc(nom(sal))} desaparece para dejarle sitio.</small>`;
    E.avisoPendiente = { clave: "nuevo-" + ent[ent.length - 1], html, indice: idx };
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

function siguiente() {
  pintarCabecera();
  const nueva = siguienteCarta();
  if (!nueva) return finDeEra();
  E.actual = nueva;
  barajarLados();
  const carta = $("carta");
  carta.classList.remove("hidden", "listo");
  carta.style.transition = "none";
  carta.style.transform = "translateY(10px) scale(.94)";
  carta.style.opacity = "0";
  pintarCarta(nueva);
  pintarBarras();
  void carta.offsetWidth;
  carta.style.transition = "";
  carta.style.transform = "";
  carta.style.opacity = "1";
  ocupado = false;
  pintarEleccion(0);
  mostrarAvisoPendiente();
  mostrarAvisoArchivo();
}

function anios() { return Math.max(0, E.turno - 1); }

const TEXTO_FIN_ERA = {
  1: "Has sobrevivido a los primeros años. El país continúa. Tú también. Ahora toca consolidar el régimen: lo que decidiste vuelve a buscarte.",
  2: "El régimen ya no se llama revolución, sino costumbre. Tus ministros han decidido que «Comandante» suena a cuartel: a partir de ahora serás Excelencia."
};
const TEXTO_FIN_JUEGO = "El régimen se ha consolidado. Lo que decidiste en los primeros años ya forma parte de la rutina del país. La era 4 todavía no existe en este prototipo.";

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
  panelAbierto = false;
  ocupado = false;
  const n = anios();
  const pantalla = $("screen-end");
  pantalla.classList.toggle("caida", !!clave);
  const caja = $("fin-fuerza");
  if (clave) {
    const f = FINALES[clave];
    const [idF, extremo] = [clave.split("_")[0], clave.endsWith("_100") ? 100 : 0];
    $("fin-principal").textContent = "¡Has caído!";
    $("fin-titulo").textContent = f.titulo;
    $("fin-texto").textContent = f.texto;
    caja.innerHTML = parBarra(idF, 1.6) +
      `<p><strong>${esc(FUERZAS[idF].nombre)}</strong> llegó al ${extremo === 100 ? "máximo" : "mínimo"}.${E.ultimaDecision ? `<small>Tu última decisión: «${esc(E.ultimaDecision)}»</small>` : ""}</p>`;
    caja.querySelector(".relleno").style.width = extremo + "%";
    caja.classList.remove("hidden");
  } else {
    $("fin-principal").textContent = "Sigues en el poder";
    $("fin-titulo").textContent = `Fin de la era ${E.era} · ${ERAS[E.era - 1].nombre}`;
    $("fin-texto").textContent = transicion ? TEXTO_FIN_ERA[E.era] : TEXTO_FIN_JUEGO;
    caja.classList.add("hidden");
    caja.innerHTML = "";
  }
  $("btn-continuar").classList.toggle("hidden", !transicion);
  $("btn-repetir").classList.toggle("hidden", !!transicion);
  $("fin-cuadro").innerHTML =
    `<div class="fila"><span>Dictador</span><span>${esc(nombreCompleto())}</span></div>` +
    `<div class="fila"><span>Has gobernado</span><span>${n} ${n === 1 ? "año" : "años"}</span></div>` +
    BARRAS.map(b => `<div class="fila"><span>${b.nombre}</span><span>${E.barras[b.id]}</span></div>`).join("");

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

  $("fin-lineas").innerHTML = clave ? "" : BARRAS.map(b => {
    const v = E.barras[b.id];
    const l = LINEAS_BARRA[b.id];
    return v >= 60 ? `<li>${l.alto}</li>` : v <= 40 ? `<li>${l.bajo}</li>` : "";
  }).join("");

  const pend = E.orden.filter(b => FUTURO[b] && (FUTURO_ERA[b] || 2) > E.era).map(b => `<li>${FUTURO[b]}</li>`);
  const colaTxt = E.cola.map(q => POR_ID[q.carta]).filter(Boolean).map(c => `<li>Te espera una carta: ${c.titulo}.</li>`);
  const todo = transicion ? [] : colaTxt.concat(pend);
  $("fin-pendiente").innerHTML = todo.length
    ? `<h3>Lo que dejas pendiente para las siguientes eras</h3><ul>${todo.join("")}</ul>` : "";
  mostrar("screen-end");
}

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
  setTimeout(() => $("input-nombre").focus(), 60);
}
function confirmarNombre() {
  let v = $("input-nombre").value.trim();
  if (!v) {
    $("nombre-error").textContent = "Un dictador sin nombre no sale en los libros de historia.";
    $("input-nombre").focus();
    return;
  }
  if (/\s/.test(v)) {
    $("nombre-error").textContent = "Una sola palabra: Aureliano, Anselmo, Esteban…";
    $("input-nombre").focus();
    return;
  }
  v = v.charAt(0).toUpperCase() + v.slice(1);
  nombreDictador = v;
  guardarNombre(v);
  empezar();
}

/* ---------- Gestos ---------- */
(function gestos() {
  const carta = $("carta");
  let drag = null;
  const umbral = () => Math.max(64, carta.offsetWidth * 0.22);      // distancia a partir de la cual se decide
  function marcarListo(listo) {
    if (carta.classList.contains("listo") === listo) return;
    carta.classList.toggle("listo", listo);
    const r = $("respuesta"); if (r) r.classList.toggle("firme", listo);
    if (listo) { try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {} }
  }
  function volver() {
    marcarListo(false);
    carta.style.transition = ""; carta.style.transform = "";
    pintarEleccion(0);
  }
  carta.addEventListener("pointerdown", e => {
    if (ocupado || panelAbierto) return;
    drag = { x: e.clientX, dx: 0, dir: 0, hist: [{ t: e.timeStamp, x: e.clientX }] };
    arrastrando = true;
    carta.setPointerCapture(e.pointerId);
    carta.style.transition = "none";
    ocultarInfo();
  });
  carta.addEventListener("pointermove", e => {
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    drag.hist.push({ t: e.timeStamp, x: e.clientX });
    if (drag.hist.length > 6) drag.hist.shift();
    carta.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 18}deg)`;
    const dir = Math.abs(drag.dx) > 24 ? Math.sign(drag.dx) : 0;
    if (dir !== drag.dir) { drag.dir = dir; pintarEleccion(dir); }
    marcarListo(Math.abs(drag.dx) > umbral());
  });
  function soltar() {
    if (!drag) return;
    const dx = drag.dx, h = drag.hist;
    drag = null;
    arrastrando = false;
    const v = (h[h.length - 1].x - h[0].x) / Math.max(1, h[h.length - 1].t - h[0].t);   // px por ms
    const lanzada = Math.abs(v) > 0.55 && Math.abs(dx) > 36 && Math.sign(v) === Math.sign(dx);
    if (Math.abs(dx) > umbral() || lanzada) decidir(Math.sign(dx));
    else volver();
  }
  function cancelar() {
    if (!drag) return;
    drag = null; arrastrando = false; volver();
  }
  carta.addEventListener("pointerup", soltar);
  carta.addEventListener("pointercancel", cancelar);
})();

/* ---------- Eventos ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!$("screen-archive").classList.contains("hidden")) atrasArchivo();
    else ocultarInfo();
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
$("btn-jugar").addEventListener("click", irANombre);
$("btn-nombre-volver").addEventListener("click", () => mostrar("screen-start"));
$("btn-tomar-poder").addEventListener("click", confirmarNombre);
$("input-nombre").addEventListener("keydown", e => { if (e.key === "Enter") confirmarNombre(); });
$("input-nombre").addEventListener("input", actualizarVistaNombre);
$("aviso-archivo").addEventListener("click", ev => {
  ev.stopPropagation();
  const c = POR_ID[$("aviso-archivo").dataset.id];
  if (c) abrirPopup("archivo-" + c.id, contenidoArchivo(c), $("aviso-archivo"));
});
$("btn-continuar").addEventListener("click", continuarEra);
$("btn-repetir").addEventListener("click", empezar);
$("btn-cambiar-nombre").addEventListener("click", irANombre);
$("btn-archivo").addEventListener("click", () => abrirArchivo("screen-start"));
$("btn-fin-archivo").addEventListener("click", () => abrirArchivo("screen-end"));
$("btn-archivo-volver").addEventListener("click", atrasArchivo);

$("btn-archivo-volver").innerHTML = icoUI("atras") + "Volver";
document.querySelectorAll("[data-icono]").forEach(el => { el.innerHTML = icono(el.dataset.icono, "en-linea"); });
mostrar("screen-start");
