// Personajes de papel recortado: ojos que miran al centro al arrastrar y estilos Normal / Noir.
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

test("Noir pasa el personaje a blanco y negro con el filtro SVG y Normal lo quita", () => {
  const j = cargar(); j.empezar();
  const base = () => j.d.querySelector("#carta image.base");
  j.w.eval("cambiarEstilo('modo','noir')");
  assert.match(base().getAttribute("filter") || "", /^url\(#bw(-suave)?\)$/);
  assert.ok(j.d.documentElement.classList.contains("noir"));
  j.w.eval("cambiarEstilo('modo','normal')");
  assert.equal(base().getAttribute("filter"), null);
  assert.ok(!j.d.documentElement.classList.contains("noir"));
});

test("en Noir solo se ofrecen blanco, negro y rojo para el fondo y los ojos", () => {
  const j = cargar();
  const op = j.w.eval("OPCIONES_ESTILO");
  assert.deepEqual(Object.keys(op.fondoNoir).sort(), ["blanco", "negro", "rojo"]);
  assert.deepEqual(Object.keys(op.ojosNoir).sort(), ["blancos", "negros", "rojos"]);
  j.w.eval("cambiarEstilo('modo','noir'); cambiarEstilo('ojosNoir','rojos')");
  assert.equal(j.d.documentElement.style.getPropertyValue("--ojo"), "#d3202a");
});
