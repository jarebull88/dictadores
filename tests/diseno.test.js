// 24 oct: las medidas que se repiten viven en UN solo sitio (el bloque DISENO de src/estilos.css), igual que la tipografía.
// Si alguien escribe el grosor de la línea o el margen de las cartas suelto, este test falla: así un solo cambio llega a todo.
const test = require("node:test"), assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const css = fs.readFileSync(path.join(__dirname, "..", "src/estilos.css"), "utf8");

test("el grosor de la línea y el margen de las cartas solo se escriben dentro del bloque DISENO", () => {
  const i = css.indexOf("DISENO:INICIO"), f = css.indexOf("DISENO:FIN");
  assert.ok(i > 0 && f > i, "falta el bloque DISENO:INICIO … DISENO:FIN");
  const fuera = (css.slice(0, i) + css.slice(f)).replace(/\/\*[\s\S]*?\*\//g, "");
  const sueltos = fuera.match(/1\.5px\s+solid|3\.5%|(?:width|height):\s*46px/g) || [];
  assert.deepEqual(sueltos, [], "medida suelta fuera del bloque DISENO (usa --borde, --margen-carta o --cuadro): " + sueltos.join(", "));
});

test("el bloque DISENO define las variables que usa el resto del CSS", () => {
  const bloque = css.slice(css.indexOf("DISENO:INICIO"), css.indexOf("DISENO:FIN"));
  for (const v of ["--linea", "--borde", "--margen-carta", "--cuadro", "--menu", "--mazo-cartas", "--mazo-paso", "--mazo-alto"])
    assert.ok(bloque.includes(v + ":"), "falta " + v);
});
