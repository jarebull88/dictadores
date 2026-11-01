// Las cuatro fuerzas: emoji + barra horizontal, rojo cerca de los límites, y las pantallas finales.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

test("cada fuerza tiene icono, barra y puntos de pista", () => {
  const j = cargar(); j.empezar();
  const barras = [...j.d.querySelectorAll(".barra")];
  assert.equal(barras.length, 4);
  for (const b of barras) {
    assert.ok(b.querySelector(".icono-fuerza img.icono") && b.querySelector(".nivel .relleno") && b.querySelector(".punto"), b.dataset.b);
    assert.ok(b.getAttribute("aria-label"));
  }
});

test("la barra se pone roja por debajo de 15 y por encima de 85", () => {
  const j = cargar(); j.empezar();
  const rojo = () => Object.fromEntries([...j.d.querySelectorAll(".barra")].map(b => [b.dataset.b, b.classList.contains("peligro")]));
  j.w.eval("E.barras={pueblo:72,ejercito:15,elite:50,potencias:85}; pintarBarras();");
  assert.deepEqual(rojo(), { pueblo: false, ejercito: true, elite: false, potencias: true });
  j.w.eval("E.barras={pueblo:72,ejercito:16,elite:84,potencias:50}; pintarBarras();");
  assert.deepEqual(rojo(), { pueblo: false, ejercito: false, elite: false, potencias: false });
});

test("el relleno es horizontal y refleja el valor", () => {
  const j = cargar(); j.empezar();
  j.w.eval("E.barras={pueblo:72,ejercito:25,elite:50,potencias:93}; pintarBarras();");
  const w = Object.fromEntries([...j.d.querySelectorAll(".barra")].map(b => [b.dataset.b, b.querySelector(".relleno").style.width]));
  assert.deepEqual(w, { pueblo: "72%", ejercito: "25%", elite: "50%", potencias: "93%" });
});

test("al caer, la caída es una carta más en la pantalla del juego: barras arriba (la caída en rojo), relato en la pregunta y, tras el cartel, los años en la leyenda", () => {
  const j = cargar(); j.empezar();
  j.w.eval("E.barras.ejercito = 0; terminar('ejercito_0')");
  assert.ok(j.visible("screen-game") && !j.visible("screen-end"));
  assert.ok(j.w.eval("modoFin"));
  assert.equal(j.w.eval("E.fin.titulo"), "Abducción");
  assert.equal(j.w.eval("E.fin.frase"), "El ejército llegó al mínimo.");
  assert.ok(j.d.querySelector('.barra[data-b="ejercito"]').classList.contains("peligro"), "la fuerza que cae sale en rojo");
  assert.ok(j.d.querySelector("#carta .ilustracion") && !j.d.querySelector("#carta .titulo-caida, #carta .etiqueta-boli"), "la carta no lleva el nombre");
  assert.match(j.$("mensaje").textContent, /\S/, "el relato va en el sitio de la pregunta");
  assert.match(j.$("leyenda").textContent, /^Gobernaste /);
  j.w.eval("decidir(1)");   // derecha: jugar de nuevo
  return new Promise(r => setTimeout(() => { assert.ok(!j.w.eval("modoFin")); assert.ok(j.visible("screen-game")); r(); }, 400));
});

test("al pasar de era sale el nombre de la era que empieza y al sobrevivir a la última, «¡Has ganado!»", () => {
  const j = cargar(); j.empezar();
  j.w.eval("empezar(); terminar(null, true)");
  assert.ok(j.visible("screen-era"));
  assert.match(j.$("era-titulo").textContent, /La Purga$/);
  j.w.eval("empezar(); terminar(null)");
  assert.equal(j.$("fin-principal").textContent, "¡Has ganado!");
  assert.ok(!j.$("screen-end").classList.contains("caida"));
});

test("el dictador ya no tiene nombre que escribir: la pantalla de inicio enseña «El Comandante» y su ficha, también", () => {
  const j = cargar();
  j.w.eval("irANombre()");
  assert.ok(!j.d.getElementById("input-nombre"), "ya no hay campo para escribir el nombre");
  assert.equal(j.$("nombre-leyenda").textContent, "El Comandante");
  assert.equal(j.w.eval("fichaComandante().nombre"), "El Comandante");
  j.w.eval("decidirNombre(1)");
  assert.equal(j.w.eval("nombreCompleto()"), "El Comandante");
});
