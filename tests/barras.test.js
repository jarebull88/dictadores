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

test("al caer, «¡Has caído!» es el mensaje principal y se explica la causa", () => {
  const j = cargar(); j.empezar();
  j.w.eval("E.ultimaDecision='Juicio público.'; terminar('ejercito_0')");
  assert.equal(j.$("fin-principal").textContent, "¡Has caído!");
  assert.equal(j.$("fin-titulo").textContent, "Golpe de Estado");
  assert.match(j.$("fin-fuerza").textContent, /Ejército llegó al mínimo/);
  assert.match(j.$("fin-fuerza").textContent, /Juicio público/);
});

test("al pasar de era sale «Sigues en el poder» y al sobrevivir a la última, «¡Has ganado!»", () => {
  const j = cargar(); j.empezar();
  j.w.eval("empezar(); terminar(null, true)");
  assert.equal(j.$("fin-principal").textContent, "Sigues en el poder");
  j.w.eval("empezar(); terminar(null)");
  assert.equal(j.$("fin-principal").textContent, "¡Has ganado!");
  assert.ok(!j.$("screen-end").classList.contains("caida"));
});

test("el nombre del dictador es una sola palabra y se muestra como «Comandante X»", () => {
  const j = cargar();
  j.$("btn-jugar").click();
  j.$("input-nombre").value = "Aureliano Buendía";
  j.$("input-nombre").dispatchEvent(new j.w.Event("input"));
  j.$("btn-tomar-poder").click();
  assert.ok(j.visible("screen-name"), "no debe empezar con dos palabras");
  j.$("input-nombre").value = "aureliano";
  j.$("btn-tomar-poder").click();
  assert.equal(j.$("nombre-dictador").textContent, "Comandante Aureliano");
});
