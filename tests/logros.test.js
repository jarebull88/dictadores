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
  assert.equal(j.d.querySelectorAll("#archivo-rejilla .hueco-logro.abierto").length, j.w.eval("LOGROS.filter(g => !g.regla).length"), "«Recompensas» enseña las de decisión");
  assert.equal(j.$("archivo-titulo").textContent, "Recompensas");
  j.w.eval(`abrirArchivo("logros")`);
  assert.equal(j.d.querySelectorAll("#archivo-rejilla .hueco-logro.abierto").length, j.w.eval("LOGROS.filter(g => g.regla).length"), "«Logros» enseña los de fin de era");
  assert.equal(j.$("archivo-titulo").textContent, "Logros");
  j.w.eval(`abrirArchivo()`);
  // 29 oct: el primero que aún no tiene ilustración y sí texto de beneficio (postal ya tiene la suya)
  const g = JSON.parse(j.w.eval(`JSON.stringify(LOGROS.find(g => !IMG_LOGROS[g.id] && g.beneficio))`));
  j.w.eval(`verLogro("${g.id}")`);
  assert.equal(j.d.querySelector(".logro-titulo").textContent, g.titulo);
  assert.match(j.d.querySelector(".logro-cara .logro-ilustracion").getAttribute("style"), /var\(--p-/, "fondo plano de la paleta");
  assert.ok(!j.d.querySelector(".logro-cara img"), "sin ilustración");
  const dorso = j.d.querySelector(".logro-dorso").textContent;
  assert.ok(dorso.includes(g.beneficio) && dorso.includes(g.perjuicio), "el reverso enseña beneficio y perjuicio");
  // 29 oct, Jorge: los logros (de fin de era) no llevan beneficio ni perjuicio
  j.w.eval(`verLogro("equilibrista")`);
  assert.doesNotMatch(j.d.querySelector(".logro-dorso").textContent, /Beneficio|Perjuicio/);
});

test("menú a pantalla completa (29 oct): cuatro iconos arriba; el espacio libre enseña la galería, los ajustes o abandonar; la carta de un logro se sale a la galería o al juego", () => {
  const j = cargar(); j.empezar();
  j.w.eval(`guardarLogros({ paloma: { abierto: true }, pelota: { abierto: false } })`);
  j.$("btn-menu").click();
  assert.ok(!j.$("archivo").classList.contains("hidden"), "el menú se abre a pantalla completa");
  assert.equal(j.d.querySelectorAll("#archivo-iconos .ic-menu").length, 4);
  assert.ok(j.$("archivo-rejilla").classList.contains("hidden"), "sin elegir nada, solo los iconos");
  j.$("btn-config").click();
  assert.ok(!j.$("panel-config").classList.contains("hidden") && j.$("panel-abandono").classList.contains("hidden"), "ajustes: el sonido");
  j.$("btn-abandonar").click();
  assert.ok(!j.$("panel-abandono").classList.contains("hidden") && j.$("btn-abandonar").classList.contains("activo"), "abandonar: el botón de confirmar");
  j.$("btn-recompensas").click();
  assert.ok(!j.$("archivo-rejilla").classList.contains("hidden") && j.d.querySelectorAll("#archivo-rejilla .hueco-logro.abierto, #archivo-rejilla .nuevo-logro").length >= 1, "recompensas: la galería");
  j.d.querySelector(".nuevo-logro").click();
  assert.ok(j.$("archivo").classList.contains("viendo"));
  j.w.eval("volverAlDirectorio()");
  assert.ok(!j.$("archivo").classList.contains("viendo") && !j.$("archivo").classList.contains("hidden"), "izquierda: de vuelta a la galería");
  j.w.eval(`verLogro("pelota"); volverAlJuego()`);
  assert.ok(j.$("archivo").classList.contains("hidden"), "derecha: de vuelta al juego");
  assert.deepEqual(j.errores, []);
});
