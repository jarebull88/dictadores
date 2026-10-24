// 24 oct: la tipografía vive en UN solo sitio (el bloque TIPOGRAFIA de src/estilos.css). Si alguien pone una letra, un
// tamaño o un peso suelto en otra parte, este test falla: así un cambio de estilo llega a todo el juego (partida,
// tutorial, fichas, ventanas, pantallas de nombre, era y final).
const test = require("node:test"), assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const raiz = path.join(__dirname, "..");
const css = fs.readFileSync(path.join(raiz, "src/estilos.css"), "utf8");

test("el CSS solo define letra, tamaño, peso, mayúsculas, espaciado e interlineado dentro del bloque TIPOGRAFIA", () => {
  const i = css.indexOf("TIPOGRAFIA:INICIO"), f = css.indexOf("TIPOGRAFIA:FIN");
  assert.ok(i > 0 && f > i, "falta el bloque TIPOGRAFIA:INICIO … TIPOGRAFIA:FIN");
  const fuera = (css.slice(0, i) + css.slice(f)).replace(/\/\*[\s\S]*?\*\//g, "");
  const sueltas = fuera.match(/(^|[;{\s])(font-family|font-size|font-weight|text-transform|letter-spacing|line-height)\s*:/g) || [];
  assert.deepEqual(sueltas, [], "tipografía suelta fuera del bloque (ponla en un papel del bloque TIPOGRAFIA): " + sueltas.join(", "));
});

test("solo hay dos familias de letra: Londrina Solid (titular) y Baloo 2 (cuerpo)", () => {
  const bloque = css.slice(css.indexOf("TIPOGRAFIA:INICIO"), css.indexOf("TIPOGRAFIA:FIN"));
  const familias = [...bloque.matchAll(/--f-(titular|cuerpo):\s*"([^"]+)"/g)].map(m => m[1] + ":" + m[2]);
  assert.deepEqual(familias.sort(), ["cuerpo:Baloo 2", "titular:Londrina Solid"]);
});

test("el código no pone letra ni tamaño en línea (solo los ajustes de «caber» de motor.js)", () => {
  const motor = fs.readFileSync(path.join(raiz, "src/motor.js"), "utf8");
  const html = fs.readFileSync(path.join(raiz, "src/cuerpo.html"), "utf8");
  const enLinea = (motor + html).match(/style="[^"]*(font-family|font-size|font-weight|text-transform)[^"]*"/g) || [];
  assert.deepEqual(enLinea, [], "estilos tipográficos en línea: " + enLinea.join(" | "));
});
