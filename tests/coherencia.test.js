// Coherencia de los datos: cada carta tiene portavoz con grupo e ilustración, las banderas y colas existen, etc.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar } = require("./_juego");

const j = cargar();
const { w, d } = j;
const cartas = w.eval("CARTAS");
const conPersonaje = cartas.filter(c => c.personaje);   // 1 nov: las cartas de aviso y las de objeto no tienen personaje
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
  for (const p of new Set(conPersonaje.map(c => c.personaje))) {
    assert.ok(grupo[p], `«${p}» no tiene grupo`);
    assert.ok(slug[p], `«${p}» no tiene personaje asignado`);
    assert.ok(retratos.includes(slug[p]), `el personaje ${slug[p]} de «${p}» no está embebido`);
  }
});

test("al dictador solo le hablan ministros, el mando militar y los embajadores", () => {
  const permitido = /^(Ministro|Ministra|Vicepresidente|Embajador|Padrino|Papá)/;   // 29 oct: invitados
  for (const p of new Set(conPersonaje.map(c => c.personaje))) assert.match(p, permitido, `«${p}» no debería hablar con el dictador`);
});

test("las banderas que exigen las cartas las concede alguna carta", () => {
  const dadas = new Set(ev("CARTAS.flatMap(c=>[c.izq,c.der]).flatMap(o=>o.banderas||[])"));
  const exigidas = ev("CARTAS.flatMap(c=>c.cond?[...(c.cond.requiere||[]),...(c.cond.alguna||[])]:[])");
  const faltan = [...new Set(exigidas)].filter(b => !dadas.has(b));
  assert.deepEqual(faltan, [], "banderas exigidas que nadie concede: " + faltan.join(", "));
});

test("las cartas encoladas existen", () => {
  const ids = ev("CARTAS.flatMap(c=>[c.izq,c.der]).flatMap(o=>(o.encolar||[]).filter(q=>q.carta).map(q=>q.carta))");
  for (const id of ids) assert.ok(ev(`!!POR_ID["${id}"]`), `la carta encolada «${id}» no existe`);
});

test("«Yo sé a quién llamar» invoca una amenaza de Pupo, una sola vez por era, y su remedio sale después", () => {
  j.empezar();
  const r = JSON.parse(w.eval(`(() => {
    const op = POR_ID.colas.der, a = [];
    for (let i = 0; i < 3; i++) { const n = E.cola.length; aplicar(POR_ID.colas, op); a.push(E.cola.length - n); }
    const id = E.cola[0].carta, amenaza = POR_ID[id]; E.cola.length = 0; aplicar(amenaza, amenaza.izq);
    return JSON.stringify({ a, amenaza: amenaza.invoca, remedio: E.cola.map(q => q.carta) });
  })()`));
  assert.equal(r.amenaza, "pupo");
  assert.deepEqual(r.a.slice(1), [0, 0], "solo una invocación por era");
  assert.equal(r.remedio.length, 1);
});

test("Pupo: la amenaza sale al azar entre las tres, enseguida (la carta siguiente), y su remedio justo después; también si «Las colas» sale en otra era", () => {
  j.empezar();
  const r = JSON.parse(w.eval(`(() => {
    const vistas = {}, c = POR_ID.colas; let enseguida = true, remedio = true, otraEra = true;
    for (let i = 0; i < 80; i++) {
      nuevaPartida(); E.actual = siguienteCarta(); aplicar(c, c.der);
      const a = siguienteCarta(); vistas[a.id] = 1;
      if (!a.invoca) enseguida = false;
      aplicar(a, a.izq);
      const rem = siguienteCarta(); if (!rem || rem.id !== a.id + "_remedio") remedio = false;
    }
    for (const era of [2, 3, 4]) { nuevaPartida(); E.era = era; aplicar(c, c.der); const a = siguienteCarta(); if (!a || !a.invoca) otraEra = false; }
    return JSON.stringify({ n: Object.keys(vistas).length, enseguida, remedio, otraEra });
  })()`));
  assert.equal(r.n, 3, "salen las tres amenazas al azar");   // 1 nov: Enemigos se quitó
  assert.ok(r.enseguida && r.remedio, "amenaza y remedio, seguidos");
  assert.ok(r.otraEra, "también en las eras 2–4");
});

test("las tres cartas de Papá Ernesto salen repartidas por la era 1: siempre en orden y con al menos dos cartas de por medio", () => {
  const r = JSON.parse(w.eval(`(() => {
    const salidas = [];
    for (let g = 0; g < 40; g++) {
      nuevaPartida(); E.actual = siguienteCarta(); const t = {};
      while (E.actual && E.era === 1) {
        if (E.actual.id.startsWith("ernesto_")) t[E.actual.id] = E.turno;
        aplicar(E.actual, Math.random() < .5 ? E.actual.izq : E.actual.der);
        if (eraTerminada()) break;
        E.actual = siguienteCarta();
      }
      salidas.push(t);
    }
    return JSON.stringify(salidas);
  })()`));
  for (const t of r) {
    const a = t.ernesto_torneo, b = t.ernesto_whisky, c = t.ernesto_higado;
    if (b !== undefined) assert.ok(a !== undefined && b - a >= 3, "el whisky va tras el torneo, con hueco");
    if (c !== undefined) assert.ok(b !== undefined && c - b >= 3, "el hígado va tras el whisky, con hueco");
  }
  assert.ok(r.some(t => t.ernesto_higado !== undefined), "alguna vez salen las tres");
});

test("cada carta se pinta con su imagen y su nombre", () => {
  j.empezar();
  for (const c of conPersonaje) {
    w.eval(`E.actual=POR_ID["${c.id}"]; pintarCarta(E.actual);`);
    assert.ok(d.querySelector("#carta svg.personaje image.base"), `«${c.id}» no muestra imagen`);
    assert.equal(d.querySelectorAll("#carta svg.personaje .ojos circle").length, 0, `«${c.id}»: los carteles no llevan ojos por código (23 oct)`);
    assert.ok(!d.querySelector("#carta .dorso .ficha-cargo"), "29 oct: el cargo ya no va en el expediente (sale bajo la carta)");
  }
});

// 22 oct (Jorge): sin límite de palabras; manda el de caracteres (2 líneas de la respuesta sin achicar la letra)

test("ninguna carta nombra un país real", () => {
  const paises = /(Cuba|Estados Unidos|Unión Soviética|URSS|Rusia|China|España|Chile|México)/;
  for (const c of cartas) assert.doesNotMatch(c.texto, paises, `«${c.id}»: el texto de la carta nombra un país real`);
});

test("todas las cartas respetan los límites de longitud y el tratamiento de su era", () => {
  for (const c of cartas) {
    const era = c.era || 1;
    if (c.tipo === "aviso") { assert.ok(c.texto.length <= 260, `«${c.id}»: la nota tiene ${c.texto.length} caracteres (máx. 260)`); continue; }   // 1 nov: las notas de aviso no tienen respuestas
    assert.ok(c.texto.length <= 150, `«${c.id}»: el mensaje tiene ${c.texto.length} caracteres (máx. 150)`);
    // Eras 1 y 2 (12 y 15 oct): las preguntas van sin «Comandante,»; las eras 3 y 4 siguen con su tratamiento
    // 17 oct (Jorge): en ninguna era la pregunta empieza por el tratamiento («Comandante», «Excelencia», «Padre de la Patria»)
    assert.ok(!/^(Comandante|Excelencia|Padre de la Patria),/.test(c.texto), `«${c.id}»: la pregunta va sin tratamiento delante`);
    for (const l of ["izq", "der"]) {
      const maxAccion = 36;   // 22 oct: 2 líneas sin achicar la letra en todos los móviles (el tamaño depende solo del ancho de la carta)
      assert.ok(c[l].accion.length <= maxAccion, `«${c.id}» ${l}: la acción tiene ${c[l].accion.length} caracteres (máx. ${maxAccion})`);
      if (era === 1) {
        // Respuestas cortas en la era 1 (11-13 oct): sin remate ni punto final; si es larga, la letra baja hasta caber
        // en 2 líneas (ajustarRespuesta), así que el límite es de caracteres, no de palabras (ver el de arriba)
        assert.ok(!c[l].remate, `«${c.id}» ${l}: en la era 1 ya no hay remate`);
        assert.ok(!/[^.]\.$/.test(c[l].accion), `«${c.id}» ${l}: la respuesta no lleva punto final`);
      } else if (c[l].remate) assert.ok(c[l].remate.length <= 75, `«${c.id}» ${l}: el remate tiene ${c[l].remate.length} caracteres (máx. 75)`);
      // 16 oct: los remates se quitan carta a carta en todas las eras; las ya reescritas van sin remate ni punto final
      else assert.ok(!/[^.]\.$/.test(c[l].accion), `«${c.id}» ${l}: la respuesta no lleva punto final`);
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

/* ---------- 1 nov: avisos, muertes, atentados, Pupo y pelotazo ---------- */
const jugar = js => JSON.parse(w.eval(`(() => { const rnd = Math.random; try { ${js} } finally { Math.random = rnd; } })()`));
test("avisos: los cortes de Papá Ernesto salen justo después de la decisión que los provoca y no cuentan para el largo de la era", () => {
  j.empezar();
  const r = jugar(`nuevaPartida(); E.actual = siguienteCarta();
    const t = POR_ID.ernesto_torneo; aplicar(t, t.der);
    const sig = siguienteCarta(); const N0 = E.N; aplicar(sig, sig.izq);
    return JSON.stringify({ sig: sig.id, tipo: sig.tipo, N: E.N - N0, accion: sig.izq.accion });`);
  assert.deepEqual([r.sig, r.tipo, r.N, r.accion], ["ernesto_corte1", "aviso", 1, ""]);
  j.empezar();
  w.eval(`mostrarCartaAviso(POR_ID.ernesto_corte2)`);
  assert.match(d.querySelector("#carta .carta-aviso .aviso-texto").textContent, /abandonó el país a las 6:40/);
  assert.equal(j.$("leyenda").textContent, "Nota de inteligencia");
  assert.ok(w.eval("modoAviso"));
});
test("muertes: si caes en la carta de Domingo, Octavio, Strenko, Pembrook o Anselmo sale su muerte (con la frase de la barra); en otra, la de la barra", () => {
  j.empezar();
  w.eval(`terminar("pueblo_0", false, "Ministro de las Fuerzas Armadas")`);
  assert.equal(w.eval("E.fin.titulo"), "Por fin es Domingo");
  assert.equal(w.eval("E.fin.frase"), "El Pueblo llegó al mínimo.");
  assert.match(w.eval("E.fin.texto"), /^Tu hermano pequeño/);
  w.eval(`terminar("pueblo_0", false, "Ministro de Economía")`);
  assert.equal(w.eval("E.fin.titulo"), "Re-Revolución");
  w.eval(`FINALES_ERA[2] = { pueblo_0: { titulo: "Prueba era 2", texto: "x" } }; E.era = 2; terminar("pueblo_0")`);
  assert.equal(w.eval("E.fin.titulo"), "Prueba era 2", "cada era puede tener su caída");
  w.eval(`E.era = 3; terminar("pueblo_0")`);
  assert.equal(w.eval("E.fin.titulo"), "Re-Revolución", "si falta, vale la de la era 1");
  w.eval(`delete FINALES_ERA[2]; E.era = 1`);
});
test("atentados: el riesgo depende solo del Ejército; aceptar da la muerte o su parte buena; rechazar, un golpe único", () => {
  j.empezar();
  const r = jugar(`nuevaPartida();
    const riesgo = e => { E.barras.ejercito = e; return +riesgoAtentado().toFixed(3); };
    const riesgos = [20, 50, 65, 80, 100, 0].map(riesgo);
    const c = POR_ID.atentado_tabacos;
    E.barras = { pueblo: 50, ejercito: 50, elite: 50, potencias: 90 };
    Math.random = () => 0.1; aplicar(c, c.izq); const muere = comprobarCaida();         // 0,1 < 0,40: muere
    E.muerteEspecial = null; E.cola.length = 0;
    Math.random = () => 0.9; aplicar(c, c.izq); const bien = E.cola.map(q => q.carta); const potencias = E.barras.potencias;   // sobrevive: Potencias 90 → 70, sin carta de aviso
    E.cola.length = 0; aplicar(c, c.der); const rechazo = E.cola.map(q => q.carta);
    return JSON.stringify({ riesgos, muere, bien, potencias, rechazo });`);
  assert.deepEqual(r.riesgos, [0.75, 0.4, 0.225, 0.05, 0.05, 0.75]);
  assert.equal(r.muere, "atentado_tabacos");
  assert.deepEqual(r.bien, [], "sobrevivir no saca ninguna carta: el premio es una recompensa");
  assert.equal(r.potencias, 70, "Potencias vuelve hacia el centro (la mitad de lo que falta)");
  assert.deepEqual(r.rechazo, ["tabacos_rechazo"]);
  w.eval(`terminar("atentado_tabacos")`);
  assert.equal(w.eval("E.fin.titulo"), "Regalo envenenado");
  assert.equal(w.eval("E.fin.frase"), "", "sin frase de barra");
});
test("atentados: uno por era, nunca antes de la cuarta carta de la era", () => {
  j.empezar();
  const r = jugar(`let tempranos = 0, total = 0; const seguro = ATENTADO.seguroAlFinal; ATENTADO.seguroAlFinal = true;   // con el seguro al final, sale en toda era que se acaba
    for (let g = 0; g < 30; g++) { nuevaPartida(); E.actual = siguienteCarta(); let vio = 0;
      while (E.actual && E.era === 1) { if (E.actual.id === "atentado_tabacos") { vio++; if (anioEra() < 4) tempranos++; }
        aplicar(E.actual, E.actual.izq); E.barras = { pueblo: 50, ejercito: 50, elite: 50, potencias: 50 }; E.muerteEspecial = null;   // se mantiene vivo para llegar al final de la era
        if (eraTerminada()) break; E.actual = siguienteCarta(); }
      total += vio; if (vio > 1) return JSON.stringify({ repetido: true }); }
    ATENTADO.seguroAlFinal = seguro; return JSON.stringify({ tempranos, total });`);
  assert.ok(!r.repetido, "uno por era como mucho");
  assert.equal(r.tempranos, 0);
  assert.ok(r.total >= 20, "con el seguro al final, sale en casi todas las eras que se acaban (no si hay otra carta en cola)");
});
test("Pupo: la suerte depende del Pueblo; da Collar o Salación; el Collar acerca las fuerzas al centro y la Salación las aleja", () => {
  j.empezar();
  const r = jugar(`nuevaPartida(); E.barras.pueblo = 60;
    const s = [suertePupo("entero"), suertePupo("regateo")]; E.barras.pueblo = 100; const alta = suertePupo("entero"); E.barras.pueblo = 0; const baja = suertePupo("regateo");
    const c = POR_ID.pupo_mal_ojo_remedio;
    E.barras = { pueblo: 60, ejercito: 20, elite: 80, potencias: 50 };
    Math.random = () => 0.1; aplicar(c, c.izq); const e1 = E.estados.map(x => x.id);
    const antes = { ...E.barras }; avanzarEstados(); const collar = { ejercito: E.barras.ejercito - antes.ejercito, elite: E.barras.elite - antes.elite };
    nuevaPartida(); E.barras = { pueblo: 60, ejercito: 20, elite: 80, potencias: 50 };
    Math.random = () => 0.99; aplicar(c, c.izq); const e2 = E.estados.map(x => x.id);
    const antes2 = { ...E.barras }; avanzarEstados(); const sal = { ejercito: E.barras.ejercito - antes2.ejercito, elite: E.barras.elite - antes2.elite };
    return JSON.stringify({ s, alta, baja, e1, collar, e2, sal });`);
  assert.deepEqual(r.s, [0.6, 0.4]);
  assert.equal(r.alta, 0.95); assert.equal(r.baja, 0.05);
  assert.deepEqual(r.e1, ["collar"]); assert.ok(r.collar.ejercito > 0 && r.collar.elite < 0, "el Collar acerca al centro");
  assert.deepEqual(r.e2, ["salacion"]); assert.ok(r.sal.ejercito < 0 && r.sal.elite > 0, "la Salación aleja del centro");
});
test("pelotazo: «A ver quién me batea» mata 1 de cada 10 y entonces no hay recompensa; «Ernesto»: el logro solo con «Su casa será un museo»", () => {
  j.empezar();
  const r = jugar(`const c = POR_ID.beisbol; nuevaPartida(); Math.random = () => 0.05; aplicar(c, c.izq); const muere = comprobarCaida();
    nuevaPartida(); Math.random = () => 0.5; aplicar(c, c.izq); const vive = comprobarCaida();
    return JSON.stringify({ muere, vive });`);
  assert.equal(r.muere, "pelotazo"); assert.equal(r.vive, null);
  w.eval(`terminar("pelotazo")`);
  assert.equal(w.eval("E.fin.titulo"), "Pelotazo");
  const e = jugar(`guardarLogros({}); const c = POR_ID.ernesto_higado; const otra = c.der; comprobarLogros(c, otra); const sin = !!logros().ernesto;
    comprobarLogros(c, c.izq); return JSON.stringify({ sin, con: !!logros().ernesto });`);
  assert.deepEqual(e, { sin: false, con: true });
});
