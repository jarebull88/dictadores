// Los lados se mezclan al azar y lo que se decide es lo que se ve.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

test("los lados se reparten al azar (entre 40 % y 60 %)", () => {
  const j = cargar(); j.empezar();
  let inv = 0; const N = 600;
  for (let i = 0; i < N; i++) {
    j.w.eval('nuevaPartida(); E.actual=POR_ID.tierra; E.turno=3; barajarLados();');
    if (!j.w.eval("E.lados.izq===E.actual.izq")) inv++;
  }
  assert.ok(inv / N > 0.4 && inv / N < 0.6, `lados invertidos: ${(inv / N * 100).toFixed(0)} %`);
});

test("lo que se aplica al decidir es la opción mostrada en ese lado", () => {
  const j = cargar(); j.empezar();
  for (let i = 0; i < 40; i++) {
    const dir = i % 2 ? 1 : -1;
    j.w.eval('mezclarLados=true; empezar(); E.actual=POR_ID.tierra; E.turno=3; pintarCarta(E.actual); E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; barajarLados();');
    j.w.eval(`pintarEleccion(${dir})`);
    const op = j.w.eval(`opcionDe(${dir})`);
    assert.ok(j.$("respuesta").textContent.includes(op.accion));
    const esp = j.w.eval(`JSON.stringify(opcionDe(${dir}).efectos)`);
    j.w.decidir(dir);
    for (const [k, v] of Object.entries(JSON.parse(esp))) {
      if (k === "crisis") continue;
      assert.ok(Math.abs(j.w.eval(`E.barras.${k}`) - 50 - v) <= 3, `${k}: efecto distinto del esperado`);   // ±3 por la deriva de los estados
    }
  }
});

test("sin mezcla, la izquierda es la opción original", () => {
  const j = cargar(); j.empezar();
  j.w.eval("mezclarLados=false; E.lados=null; E.actual=POR_ID.tierra; barajarLados();");
  assert.equal(j.w.eval("E.lados.izq===E.actual.izq"), true);
});
