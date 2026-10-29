// Coleccionables (28 oct, traspaso de docs/COLECCIONABLES.md): cada recompensa de la era 1 y los cuatro logros de la era se desbloquean de verdad.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const CAMPOS = ["id", "titulo", "subtitulo", "decision", "descripcion", "beneficio", "perjuicio"];

test("cada coleccionable tiene todos sus campos (con «Pendiente» donde falte el texto) y ya no existe «objeto»", () => {
  const j = cargar();
  const LOGROS = JSON.parse(j.w.eval("JSON.stringify(LOGROS)"));
  for (const g of LOGROS) {
    // 29 oct, Jorge: los logros (regla) no llevan beneficio ni perjuicio
    for (const c of CAMPOS) if (!(g.regla && (c === "beneficio" || c === "perjuicio"))) assert.ok(typeof g[c] === "string" && g[c].length > 0, `${g.id}: falta ${c}`);
    if (g.regla) assert.ok(!("beneficio" in g) && !("perjuicio" in g), `${g.id}: un logro no lleva beneficio ni perjuicio`);
    assert.ok(!("objeto" in g) && !("efecto" in g) && !("secundario" in g), `${g.id}: campos antiguos`);
    assert.ok(g.bandera || g.carta || g.regla, `${g.id}: no dice cómo se desbloquea`);
  }
  const ids = LOGROS.map(g => g.id);
  for (const id of ["licencia", "libreta", "compota", "revolukola", "pelota", "postal", "cuatro_casillas", "por_los_pelos", "equilibrista", "buenos_modales", "chivaton", "paloma"])
    assert.ok(ids.includes(id), "falta " + id);
  assert.equal(new Set(ids).size, ids.length, "ids repetidos");
});

test("cada recompensa se desbloquea con su opción (con o sin bandera) y la primera decisión ya no regala nada", () => {
  const casos = [["fin_pelota", "Se juega por amor", "licencia"], ["embargo_total", "Una libreta por familia", "libreta"], ["la_bahia", "Cámbienlos por compotas", "compota"],
    ["refresco", "Improvisen una receta", "revolukola"], ["beisbol", "A ver quién me batea", "pelota"], ["nuevos_vecinos", "Discreto como mi barba", "postal"]];
  for (const [carta, accion, logro] of casos) {
    const j = cargar(); j.empezar();
    // la primera decisión de la partida no da ningún logro
    j.w.eval(`resolver(1)`);
    assert.equal(j.w.eval("JSON.stringify(Object.keys(logros()))"), "[]", "la primera decisión no regala logros");
    // la opción equivocada tampoco lo da (la otra de la misma carta)
    const otra = j.w.eval(`(() => { const c = CARTAS.find(x => x.id === "${carta}"); return [c.izq, c.der].find(o => o.accion !== "${accion}").accion; })()`);
    j.w.eval(`mezclarLados = false; E.lados = null; E.actual = CARTAS.find(c => c.id === "${carta}");`);
    const dirOtra = j.w.eval(`E.actual.izq.accion === ${JSON.stringify(otra)} ? -1 : 1`);
    j.w.eval(`resolver(${dirOtra})`);
    assert.ok(!j.w.eval(`!!logros().${logro}`), `${logro}: la otra opción no debe darlo`);
    j.w.eval(`mezclarLados = false; E.lados = null; E.actual = CARTAS.find(c => c.id === "${carta}");`);
    const dir = j.w.eval(`E.actual.izq.accion === ${JSON.stringify(accion)} ? -1 : 1`);
    j.w.eval(`ocupado = false; resolver(${dir})`);
    assert.ok(j.w.eval(`!!logros().${logro}`), `${logro}: «${accion}» debería darlo`);
  }
});

test("los logros de fin de era se dan al acabar la era con sus condiciones", () => {
  const prueba = (preparar, esperado, noEsperado = []) => {
    const j = cargar(); j.empezar();
    j.w.eval(preparar);
    j.w.eval("comprobarLogrosEra()");
    const l = JSON.parse(j.w.eval("JSON.stringify(logros())"));
    for (const id of esperado) assert.ok(l[id], `debería dar ${id}`);
    for (const id of noEsperado) assert.ok(!l[id], `no debería dar ${id}`);
    return j;
  };
  prueba(`E.estados = ["censura","vigilancia","frontera","culto"].map(id => ({ id, edad: 0 }))`, ["cuatro_casillas"], ["buenos_modales"]);
  prueba(`E.barras = { pueblo: 50, ejercito: 14, elite: 50, potencias: 50 }`, [], ["por_los_pelos", "equilibrista"]);   // una sola fuerza crítica no basta
  prueba(`E.barras = { pueblo: 50, ejercito: 14, elite: 86, potencias: 50 }`, ["por_los_pelos"], ["equilibrista"]);
  prueba(`E.barras = { pueblo: 40, ejercito: 60, elite: 45, potencias: 55 }`, ["equilibrista"], ["por_los_pelos"]);
  prueba(`E.estados = [{ id: "luna", edad: 0 }]; E.barras = { pueblo: 30, ejercito: 50, elite: 50, potencias: 50 }`, ["buenos_modales"], ["cuatro_casillas", "equilibrista"]);
  prueba(`E.estados = [{ id: "censura", edad: 0 }]`, [], ["buenos_modales"]);
});

test("un coleccionable sin ilustración se ve como carta completa: fondo plano por delante y, por detrás, su texto o «Pendiente»", () => {
  const j = cargar(); j.empezar();
  j.w.eval(`const l = {}; LOGROS.forEach(g => { l[g.id] = { abierto: true }; }); guardarLogros(l); abrirArchivo();`);
  assert.equal(j.d.querySelectorAll("#archivo-rejilla .hueco-logro.abierto").length, j.w.eval("LOGROS.length"));
  j.w.eval(`verLogro("postal")`);
  assert.equal(j.d.querySelector(".logro-titulo").textContent, "Postal con misil");
  assert.match(j.d.querySelector(".logro-cara .logro-ilustracion").getAttribute("style"), /var\(--p-/, "fondo plano de la paleta");
  assert.ok(!j.d.querySelector(".logro-cara img"), "sin ilustración");
  const dorso = j.d.querySelector(".logro-dorso").textContent;
  assert.match(dorso, /Beneficio:\s*Mándasela/);
  assert.match(dorso, /Perjuicio:\s*A veces/);
  // 29 oct, Jorge: los logros (de fin de era) no llevan beneficio ni perjuicio
  j.w.eval(`verLogro("equilibrista")`);
  assert.doesNotMatch(j.d.querySelector(".logro-dorso").textContent, /Beneficio|Perjuicio/);
});
