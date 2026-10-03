// Red de seguridad de la dificultad: si alguien toca los pesos y el juego se vuelve trivial o imposible, falla.
// Para afinar los números usa «npm run calibrar» y «npm run simular».
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const SIM = `
  window.__sim = function () {
    mezclarLados = true; nuevaPartida(); E.actual = siguienteCarta(); barajarLados();
    let nulos = 0, guardia = 0;
    while (true) {
      if (++guardia > 200) return { error: "bucle" };
      if (!E.actual) { nulos++; if (E.era < ERAS.length) { iniciarEra(E.era + 1); E.actual = siguienteCarta(); barajarLados(); continue; } return { caida: null, era: E.era, nulos }; }
      const c = E.actual; aplicar(c, opcionDe(Math.random() < .5 ? -1 : 1));
      const caida = comprobarCaida(); if (caida) return { caida, era: E.era, nulos };
      if (E.turno > finEra()) { if (E.era < ERAS.length) iniciarEra(E.era + 1); else return { caida: null, era: E.era, nulos }; }
      E.actual = siguienteCarta(); barajarLados();
    }
  };`;

test("jugando al azar, la era 1 se supera entre el 15 % y el 45 % de las veces y nunca falta carta", () => {
  const j = cargar(); j.w.eval(SIM);
  const N = 3000; let supera = 0, nulos = 0, errores = 0;
  for (let i = 0; i < N; i++) {
    const r = j.w.eval("__sim()");
    if (r.error) { errores++; continue; }
    nulos += r.nulos; if (!(r.caida && r.era === 1)) supera++;
  }
  const p = supera / N;
  assert.equal(errores, 0);
  assert.equal(nulos, 0, "hubo huecos sin carta");
  assert.ok(p > 0.15 && p < 0.45, `supervivencia a la era 1 al azar: ${(p * 100).toFixed(0)} % (esperado 15–45 %)`);
});
