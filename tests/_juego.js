// Utilidades comunes: carga dist/index.html en jsdom (sin navegador) y ofrece atajos para jugar.
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const RUTA = process.env.JUEGO_HTML || path.join(__dirname, "..", "dist", "index.html");

function cargar({ temporizadores = "inmediatos" } = {}) {
  const errores = [];
  const html = fs.readFileSync(RUTA, "utf8");
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    beforeParse(w) {
      w.addEventListener("error", e => errores.push(e.message));
      // los avisos largos (9 s) no se ejecutan; el resto, al instante
      if (temporizadores === "inmediatos") w.setTimeout = (fn, ms) => { if ((ms || 0) >= 500) return 0; fn(); return 0; };
    }
  });
  const w = dom.window, d = w.document, $ = id => d.getElementById(id);
  const visible = id => !$(id).classList.contains("hidden");
  const empezar = (nombre = "aureliano") => { $("btn-jugar").click(); $("input-nombre").value = nombre; $("btn-tomar-poder").click(); };
  const tecla = dir => d.dispatchEvent(new w.KeyboardEvent("keydown", { key: dir < 0 ? "ArrowLeft" : "ArrowRight" }));
  return { w, d, $, visible, empezar, tecla, errores };
}

/* Juega una partida entera con teclado al azar. Si llega al final de la era 1 y hay botón de continuar, lo pulsa. */
function jugarPartida(j, { maxPasos = 160 } = {}) {
  const { w, $, visible, tecla } = j;
  w.eval("empezar()");
  const resumen = { transiciones: 0, cae: false, principal: "" };
  for (let n = 0; n < maxPasos; n++) {
    if (visible("screen-game")) { tecla(Math.random() < 0.5 ? -1 : 1); continue; }
    if (visible("screen-end")) {
      if (visible("btn-continuar")) { resumen.transiciones++; $("btn-continuar").click(); continue; }
      resumen.cae = $("screen-end").classList.contains("caida");
      resumen.principal = $("fin-principal").textContent;
      return resumen;
    }
    break;
  }
  resumen.principal = "SIN FINAL";
  return resumen;
}

module.exports = { cargar, jugarPartida, RUTA };
