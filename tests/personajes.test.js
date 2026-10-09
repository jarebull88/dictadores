// Personajes de papel recortado: ojos que se mueven solos, una mini animación por personaje y la ilustración entera.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

test("cada personaje tiene dos ojos animados y su mini animación", () => {
  const j = cargar(); j.empezar();
  const retratos = j.w.eval("RETRATOS"), tipos = Object.keys(j.w.eval("ANIMACION"));
  for (const slug of Object.keys(retratos)) {
    const a = retratos[slug].animacion;
    assert.ok(a && tipos.includes(a.tipo), `«${slug}» no tiene una animación conocida`);
    j.d.querySelector("#carta").innerHTML = j.w.eval(`svgPersonaje("${slug}")`);
    const ojos = j.d.querySelector("#carta .ojos");
    assert.equal(ojos.querySelectorAll("circle").length, 2, `«${slug}» no tiene dos ojos`);
    assert.match(ojos.getAttribute("style") || "", /animation-delay/, `los ojos de «${slug}» no tienen desfase`);
    assert.ok(j.d.querySelector(`#carta .animacion.anim-${a.tipo}`), `«${slug}» no pinta su animación`);
  }
});

test("los ojos ya no dependen de la carta: arrastrar no los mueve por código", () => {
  const j = cargar(); j.empezar();
  assert.equal(j.w.eval("typeof mirar"), "undefined");
});

test("la ilustración se ve entera (se ajusta al hueco, no se recorta)", () => {
  const j = cargar(); j.empezar();
  assert.equal(j.d.querySelector("#carta svg.personaje").getAttribute("preserveAspectRatio"), "xMidYMax meet");
});
