// Partidas completas simuladas con el teclado: sin errores, con finales válidos y con paso a la era 2.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar, jugarPartida } = require("./_juego");

test("500 partidas al azar terminan bien y alguna llega a la era 2", () => {
  const j = cargar();
  j.empezar();
  let transiciones = 0, caidas = 0, finales = 0;
  for (let g = 0; g < 500; g++) {
    const r = jugarPartida(j);
    transiciones += r.transiciones;
    assert.ok(["¡Has caído!", "¡Has ganado!"].includes(r.principal), "final inesperado: " + r.principal);
    r.cae ? caidas++ : finales++;
  }
  assert.deepEqual(j.errores, []);
  assert.ok(transiciones > 0, "ninguna partida llegó a la era 2");
  assert.ok(caidas > 0, "nunca se pierde");
});

test("el paso de era conserva barras y cambia la numeración de años", () => {
  const j = cargar();
  j.empezar();
  j.w.eval("E.barras={pueblo:58,ejercito:46,elite:55,potencias:40}; E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("btn-continuar"), "debería haber botón de continuar");
  j.$("btn-continuar").click();
  assert.equal(j.w.eval("E.era"), 2);
  assert.equal(j.w.eval("E.barras.pueblo"), 58);
  assert.equal(j.w.eval("E.inicioEra"), j.w.eval("E.turno"));
});

test("al pasar a la era 3 el tratamiento cambia de «Comandante» a «Excelencia»", () => {
  const j = cargar();
  j.empezar();
  assert.match(j.$("nombre-dictador").textContent, /^Comandante /);
  j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
  j.$("btn-continuar").click();
  j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("btn-continuar"), "debería haber paso a la era 3");
  j.$("btn-continuar").click();
  assert.equal(j.w.eval("E.era"), 3);
  assert.match(j.$("nombre-dictador").textContent, /^Excelencia /);
});

test("en la era 4 eres «Padre de la Patria» y al sobrevivirla ganas: «¡Has ganado!» con esquela", () => {
  const j = cargar();
  j.empezar();
  for (let era = 1; era <= 3; era++) {
    j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
    j.$("btn-continuar").click();
  }
  assert.equal(j.w.eval("E.era"), 4);
  assert.match(j.$("nombre-dictador").textContent, /, Padre de la Patria$/);
  j.w.eval("E.banderas.add('base.mausoleo_construido'); E.turno=finEra()+1; finDeEra();");
  assert.equal(j.$("fin-principal").textContent, "¡Has ganado!");
  assert.ok(j.$("screen-end").classList.contains("victoria"));
  assert.ok(!j.visible("screen-era"), "tras la última era no se sigue gobernando");
  assert.match(j.$("fin-esquela").textContent, /mausoleo/);
});

test("«Sigues en el poder»: pantalla propia con los años, un párrafo y el dictador de la era que empieza en una carta", () => {
  const j = cargar();
  j.empezar();
  j.w.eval("E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("screen-era"));
  assert.equal(j.$("era-titulo").textContent, "Sigues en el poder");
  assert.match(j.$("era-anios").textContent, /^Has gobernado \d+ años?$/);
  assert.ok(j.$("era-texto").textContent.length > 40, "falta el párrafo");
  assert.ok(j.d.querySelector("#carta-era svg.personaje"), "falta el dictador en la carta");
  j.$("btn-continuar").click();
  assert.ok(j.visible("screen-game"));
  assert.equal(j.w.eval("E.era"), 2);
});

test("portada: el logo, la carta del dictador a cualquier lado empieza a gobernar y el archivo está en el pie", () => {
  const j = cargar();
  assert.ok(j.d.querySelector("#logo img"), "falta el logo en la portada");
  assert.ok(j.d.querySelector("#carta-portada svg.personaje"), "falta el dictador en la portada");
  j.w.eval("decidirPortada(1)");
  assert.ok(j.visible("screen-name"));
  j.w.eval("mostrar('screen-start'); decidirPortada(-1)");
  assert.ok(j.visible("screen-name"));
  j.w.eval("mostrar('screen-start')");
  j.d.getElementById("btn-portada-archivo").click();
  assert.ok(j.visible("screen-archive"));
});
