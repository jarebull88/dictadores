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
    assert.ok(["Has caído", "Sigues en el poder"].includes(r.principal), "final inesperado: " + r.principal);
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
