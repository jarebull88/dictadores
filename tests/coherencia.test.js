// Coherencia de los datos: cada carta tiene portavoz con grupo e ilustración, las banderas y colas existen, etc.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const j = cargar();
const { w, d } = j;
const cartas = w.eval("CARTAS");
const ev = x => w.eval(x);

test("el juego carga sin errores", () => assert.deepEqual(j.errores, []));

test("hay cartas de las cuatro eras", () => {
  assert.ok(cartas.filter(c => !c.era).length >= 19, "faltan cartas de la era 1");
  assert.ok(cartas.filter(c => c.era === 2).length >= 20, "faltan cartas de la era 2");
  assert.ok(cartas.filter(c => c.era === 3).length >= 20, "faltan cartas de la era 3");
  assert.ok(cartas.filter(c => c.era === 4).length >= 20, "faltan cartas de la era 4");
});

test("todas las cartas tienen portavoz con grupo e ilustración", () => {
  const grupo = ev("GRUPO_DE"), slug = ev("PERSONAJE_SLUG"), retratos = ev("Object.keys(RETRATOS)");
  for (const p of new Set(cartas.map(c => c.personaje))) {
    assert.ok(grupo[p], `«${p}» no tiene grupo`);
    assert.ok(slug[p], `«${p}» no tiene personaje asignado`);
    assert.ok(retratos.includes(slug[p]), `el personaje ${slug[p]} de «${p}» no está embebido`);
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
    assert.ok(d.querySelector("#carta svg.personaje image.base"), `«${c.id}» no muestra imagen`);
    assert.equal(d.querySelectorAll("#carta svg.personaje .ojos circle").length, 2, `«${c.id}» no tiene dos ojos`);
    assert.equal(d.querySelector("#carta .dorso .ficha-cargo").textContent, c.personaje);
  }
});

test("las opciones son cortas (acción de 5 palabras o menos; en la era 1 manda el límite de caracteres)", () => {
  for (const c of cartas.filter(c => (c.era || 1) !== 1)) for (const l of ["izq", "der"]) {
    const n = c[l].accion.trim().split(/\s+/).length;
    assert.ok(n <= 5, `«${c.id}» ${l}: la acción tiene ${n} palabras`);
  }
});

test("los datos históricos no mencionan países en el texto de la carta", () => {
  const paises = /(Cuba|Estados Unidos|Unión Soviética|URSS|Rusia|China|España|Chile|México)/;
  for (const c of cartas) assert.doesNotMatch(c.texto, paises, `«${c.id}»: el texto de la carta nombra un país real (solo el archivo histórico puede)`);
});

test("todas las cartas respetan los límites de longitud y el tratamiento de su era", () => {
  for (const c of cartas) {
    const era = c.era || 1, saludo = era >= 4 ? "Padre de la Patria," : era >= 3 ? "Excelencia," : "Comandante,";
    assert.ok(c.texto.length <= 150, `«${c.id}»: el mensaje tiene ${c.texto.length} caracteres (máx. 150)`);
    // Eras 1 y 2 (12 y 15 oct): las preguntas van sin «Comandante,»; las eras 3 y 4 siguen con su tratamiento
    if (era <= 2) assert.ok(!/^(Comandante|Excelencia|Padre de la Patria),/.test(c.texto), `«${c.id}»: en las eras 1 y 2 la pregunta va sin «Comandante,»`);
    else assert.ok(c.texto.startsWith(saludo), `«${c.id}»: debe empezar por «${saludo}»`);
    for (const l of ["izq", "der"]) {
      const maxAccion = era === 1 ? 30 : 28;   // era 1: la letra se ajusta a 2 líneas, cabe algo más
      assert.ok(c[l].accion.length <= maxAccion, `«${c.id}» ${l}: la acción tiene ${c[l].accion.length} caracteres (máx. ${maxAccion})`);
      if (era === 1) {
        // Respuestas cortas en la era 1 (11-13 oct): sin remate ni punto final; si es larga, la letra baja hasta caber
        // en 2 líneas (ajustarRespuesta), así que el límite es de caracteres, no de palabras (ver el de arriba)
        assert.ok(!c[l].remate, `«${c.id}» ${l}: en la era 1 ya no hay remate`);
        assert.ok(!/[^.]\.$/.test(c[l].accion), `«${c.id}» ${l}: la respuesta no lleva punto final`);
      } else assert.ok(c[l].remate.length <= 75, `«${c.id}» ${l}: el remate tiene ${c[l].remate.length} caracteres (máx. 75)`);
    }
  }
});

test("cada bandera reservada para las eras 3 y 4 tiene su carta de consecuencia", () => {
  const futuro = ev("FUTURO_ERA");
  for (const era of [3, 4]) {
    const exigidas = new Set(ev(`CARTAS.filter(c=>c.era===${era}).flatMap(c=>c.cond?[...(c.cond.requiere||[]),...(c.cond.alguna||[])]:[])`));
    const sinCarta = Object.keys(futuro).filter(b => futuro[b] === era && !exigidas.has(b));
    assert.deepEqual(sinCarta, [], `banderas de la era ${era} sin carta: ` + sinCarta.join(", "));
  }
});

test("ya no habla el Ministro de Agricultura: sus cartas son del Ministro de Trabajo", () => {
  assert.equal(cartas.filter(c => c.personaje === "Ministro de Agricultura").length, 0);
  assert.ok(cartas.filter(c => c.personaje === "Ministro de Trabajo").length >= 6);
});
