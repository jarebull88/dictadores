// Coherencia de los datos: cada carta tiene portavoz con grupo e ilustración, las banderas y colas existen, etc.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const j = cargar();
const { w, d } = j;
const cartas = w.eval("CARTAS");
const ev = x => w.eval(x);

test("el juego carga sin errores", () => assert.deepEqual(j.errores, []));

test("hay cartas de las dos eras", () => {
  assert.ok(cartas.filter(c => !c.era).length >= 19, "faltan cartas de la era 1");
  assert.ok(cartas.filter(c => c.era === 2).length >= 20, "faltan cartas de la era 2");
});

test("todas las cartas tienen portavoz con grupo e ilustración", () => {
  const grupo = ev("GRUPO_DE"), fija = ev("ILUSTRACION_FIJA"), img = ev("Object.keys(IMG)");
  for (const p of new Set(cartas.map(c => c.personaje))) {
    assert.ok(grupo[p], `«${p}» no tiene grupo`);
    assert.ok(fija[p], `«${p}» no tiene ilustración asignada`);
    assert.ok(img.includes(fija[p]), `la imagen ${fija[p]} de «${p}» no está embebida`);
  }
});

test("al dictador solo le hablan ministros, el mando militar y los embajadores", () => {
  const permitido = /^(Ministro|Ministra|Vicepresidente|Embajador)/;
  for (const p of new Set(cartas.map(c => c.personaje))) assert.match(p, permitido, `«${p}» no debería hablar con el dictador`);
});

test("las banderas que exigen las cartas las concede alguna carta", () => {
  const dadas = new Set(ev("CARTAS.flatMap(c=>[c.izq,c.der]).flatMap(o=>o.banderas||[])"));
  const exigidas = ev("CARTAS.flatMap(c=>c.cond?[...(c.cond.requiere||[]),...(c.cond.alguna||[])]:[])");
  const faltan = [...new Set(exigidas)].filter(b => !dadas.has(b));
  assert.deepEqual(faltan, [], "banderas exigidas que nadie concede: " + faltan.join(", "));
});

test("las cartas encoladas existen", () => {
  const ids = ev("CARTAS.flatMap(c=>[c.izq,c.der]).flatMap(o=>(o.encolar||[]).map(q=>q.carta))");
  for (const id of ids) assert.ok(ev(`!!POR_ID["${id}"]`), `la carta encolada «${id}» no existe`);
});

test("cada carta se pinta con su imagen y su nombre", () => {
  j.empezar();
  for (const c of cartas) {
    w.eval(`E.actual=POR_ID["${c.id}"]; pintarCarta(E.actual);`);
    assert.ok(d.querySelector("#carta .ilustracion img"), `«${c.id}» no muestra imagen`);
    assert.equal(d.querySelector("#carta .nombre").textContent, c.personaje);
  }
});

test("las opciones son cortas (acción de 5 palabras o menos)", () => {
  for (const c of cartas) for (const l of ["izq", "der"]) {
    const n = c[l].accion.trim().split(/\s+/).length;
    assert.ok(n <= 5, `«${c.id}» ${l}: la acción tiene ${n} palabras`);
  }
});

test("los datos históricos no mencionan países en el texto de la carta", () => {
  const paises = /(Cuba|Estados Unidos|Unión Soviética|URSS|Rusia|China|España|Chile|México)/;
  for (const c of cartas) assert.doesNotMatch(c.texto, paises, `«${c.id}»: el texto de la carta nombra un país real (solo el archivo histórico puede)`);
});
