// Personajes de papel recortado: ojos que miran al centro al arrastrar y la ilustración completa.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const desplazamientoOjos = j => {
  const t = j.d.querySelector("#carta .ojos").style.transform || "";
  const m = t.match(/translate\((-?[\d.]+)px/);
  return m ? Number(m[1]) : 0;
};

test("los ojos miran hacia el centro: carta a la derecha, ojos a la izquierda", () => {
  const j = cargar(); j.empezar();
  j.w.eval("mirar(1)");
  assert.ok(desplazamientoOjos(j) < 0, "con la carta a la derecha, los ojos deberían ir a la izquierda");
  j.w.eval("mirar(-1)");
  assert.ok(desplazamientoOjos(j) > 0, "con la carta a la izquierda, los ojos deberían ir a la derecha");
  j.w.eval("mirar(0)");
  assert.equal(desplazamientoOjos(j), 0);
});

test("la ilustración se ve entera (se ajusta al hueco, no se recorta)", () => {
  const j = cargar(); j.empezar();
  assert.equal(j.d.querySelector("#carta svg.personaje").getAttribute("preserveAspectRatio"), "xMidYMax meet");
});
