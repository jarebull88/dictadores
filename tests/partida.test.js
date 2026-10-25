// Partidas completas simuladas con el teclado: sin errores, con finales válidos y con paso a la era 2.
const test = require("node:test"), assert = require("node:assert/strict");
const { cargar, jugarPartida } = require("./_juego");

test("500 partidas al azar terminan bien y alguna llega a la era 2", () => {
  const j = cargar();
  j.empezar();
  let transiciones = 0, caidas = 0, finales = 0;
  for (let g = 0; g < 500; g++) {
    const r = jugarPartida(j);
    transiciones += r.transiciones;
    assert.ok(["¡Has caído!", "¡Has ganado!"].includes(r.principal), "final inesperado: " + r.principal);
    r.cae ? caidas++ : finales++;
  }
  assert.deepEqual(j.errores, []);
  assert.ok(transiciones > 0, "ninguna partida llegó a la era 2");
  assert.ok(caidas > 0, "nunca se pierde");
});

test("el paso de era conserva barras y cambia la numeración de años", () => {
  const j = cargar();
  j.empezar();
  j.w.eval("E.barras={pueblo:58,ejercito:46,elite:55,potencias:40}; E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("screen-era"), "debería poder seguir gobernando");
  j.w.eval("decidirEra(1)");
  assert.equal(j.w.eval("E.era"), 2);
  assert.equal(j.w.eval("E.barras.pueblo"), 58);
  assert.equal(j.w.eval("E.inicioEra"), j.w.eval("E.turno"));
});

test("al pasar a la era 3 el tratamiento cambia de «Comandante» a «Excelencia»", () => {
  const j = cargar();
  j.empezar();
  assert.match(j.$("nombre-dictador").textContent, /^Comandante /);
  j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
  j.w.eval("decidirEra(1)");
  j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("screen-era"), "debería haber paso a la era 3");
  j.w.eval("decidirEra(1)");
  assert.equal(j.w.eval("E.era"), 3);
  assert.match(j.$("nombre-dictador").textContent, /^Excelencia /);
});

test("en la era 4 eres «Padre de la Patria» y al sobrevivirla ganas: «¡Has ganado!» con esquela", () => {
  const j = cargar();
  j.empezar();
  for (let era = 1; era <= 3; era++) {
    j.w.eval("E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra();");
    j.w.eval("decidirEra(1)");
  }
  assert.equal(j.w.eval("E.era"), 4);
  assert.match(j.$("nombre-dictador").textContent, /, Padre de la Patria$/);
  j.w.eval("E.banderas.add('base.mausoleo_construido'); E.turno=finEra()+1; finDeEra();");
  assert.equal(j.w.eval("E.actual.id"), "ultimas_palabras", "antes de la esquela salen las últimas palabras");
  j.w.eval("resolver(1)");
  assert.equal(j.$("fin-principal").textContent, "¡Has ganado!");
  assert.ok(j.$("screen-end").classList.contains("victoria"));
  assert.ok(!j.visible("screen-era"), "tras la última era no se sigue gobernando");
  assert.match(j.$("fin-esquela").textContent, /roca gigante/);
  assert.match(j.$("fin-esquela").textContent, /Tus últimas palabras/);
});

test("al pasar de era: pantalla propia con el nombre de la era, con los años, un párrafo y el dictador de la era que empieza en una carta", () => {
  const j = cargar();
  j.empezar();
  j.w.eval("E.turno=finEra()+1; finDeEra();");
  assert.ok(j.visible("screen-era"));
  assert.match(j.$("era-titulo").textContent, /La Purga$/);   // 17 oct: el nombre de la era que empieza, en vez de «Sigues en el poder»
  assert.match(j.$("era-anios").textContent, /^Has gobernado \d+ años?$/);
  assert.ok(j.$("era-texto").textContent.length > 40, "falta el párrafo");
  assert.ok(j.d.querySelector("#carta-era svg.personaje"), "falta el dictador en la carta");
  j.w.eval("decidirEra(1)");
  assert.ok(j.visible("screen-game"));
  assert.equal(j.w.eval("E.era"), 2);
});

test("portada: el logo y «Comenzar partida»; el nombre se elige en una carta (derecha empieza, izquierda vuelve)", () => {
  const j = cargar();
  assert.ok(j.d.querySelector("#logo .logo-texto"), "falta el logo en la portada");
  assert.ok(!j.d.querySelector("#screen-start .carta"), "la portada ya no lleva carta");
  j.$("btn-comenzar").click();
  assert.ok(j.visible("screen-name"));
  assert.ok(j.d.querySelector("#carta-nombre svg.personaje"), "falta el dictador en la carta del nombre");
  j.w.eval("decidirNombre(-1)");
  assert.ok(j.visible("screen-start"), "a la izquierda vuelve a la portada");
  j.$("btn-comenzar").click();
  j.$("input-nombre").value = "";
  j.w.eval("decidirNombre(1)");
  assert.ok(j.visible("screen-name"), "sin nombre no empieza");
  j.$("input-nombre").value = "aureliano";
  j.w.eval("decidirNombre(1)");
  assert.ok(j.visible("screen-game"), "con nombre, a la derecha empieza");
});

test("tutorial «La víspera»: ocho pasos, solo se gira la carta cuando toca, entra «Luna de miel» y acaba en el nombre", () => {
  const j = cargar();
  j.w.eval("empezarTutorial()");
  assert.ok(j.visible("screen-game"));
  assert.ok(j.$("barras").classList.contains("apagadas"), "las fuerzas empiezan apagadas");
  assert.equal(j.$("btn-salir").textContent, "Saltar tutorial");
  j.w.eval("voltear()");
  assert.ok(!j.d.querySelector("#carta").classList.contains("volteada"), "antes de su paso no se gira");
  assert.ok(!j.d.querySelector("#carta").classList.contains("con-giro"), "ni se ve el icono de girar");
  j.tecla(1);                                                        // 1: deslizar
  assert.equal(j.w.eval("E.tutorial.i"), 1);
  assert.ok(j.d.querySelector("#carta").classList.contains("giro-destacado"), "en su paso, el icono parpadea");
  j.tecla(1);                                                        // 2: sin girar la carta, no avanza
  assert.equal(j.w.eval("E.tutorial.i"), 1, "hay que girar la carta antes de seguir");
  j.w.eval("voltear(); voltear();");
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 2);
  assert.ok(!j.d.querySelector("#carta").classList.contains("con-giro"), "después, el icono se va");
  assert.ok(j.d.querySelector("#carta .cinta-tutorial"), "la instrucción va en cinta");
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 2, "hay que tocar un icono antes de seguir");
  j.w.eval(`mostrarFuerza("pueblo", document.querySelector('.barra[data-b="pueblo"]')); ocultarInfo();`);
  assert.ok(!j.d.querySelector("#barras").classList.contains("destacar"), "al tocar uno se apagan los avisos");
  j.tecla(1); j.tecla(1);                                            // 3: fuerzas · 4: pistas
  assert.equal(j.w.eval("E.tutorial.i"), 4);
  assert.ok(j.w.eval("modoEstado"), "entra la carta de «Luna de miel»");
  j.w.eval("recogerEstado()");
  assert.equal(j.w.eval("E.tutorial.i"), 5);                         // 6: guardar
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 5, "hay que tocar la casilla antes de seguir");
  j.w.eval("mostrarInfo(0); ocultarInfo();");
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 6);                         // 7: logro
  assert.ok(j.$("btn-logros").classList.contains("hidden"), "la estrella no sale hasta ganar el logro");
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 6);
  assert.ok(j.w.eval("E.tutorial.logroGanado"), "la decisión da el primer logro");
  assert.ok(!j.$("btn-logros").classList.contains("hidden") && j.$("btn-logros").classList.contains("destacar"), "sale la estrella, destacada");
  j.tecla(1);
  assert.equal(j.w.eval("E.tutorial.i"), 6, "hay que abrir el logro antes de seguir");
  j.w.eval("abrirArchivo()");
  assert.ok(j.d.querySelector("#archivo-abrir .logro-carta img"), "el logro enseña su ilustración");
  j.$("archivo-cerrar").click();
  assert.equal(j.w.eval("E.tutorial.i"), 7);
  j.tecla(1);                                                        // 8: fin → nombre
  assert.ok(j.visible("screen-name"));
  j.$("input-nombre").value = "aureliano"; j.w.eval("decidirNombre(1)");
  assert.ok(j.visible("screen-game"));
  assert.equal(j.w.eval("E.estados.length"), 0, "la luna de miel no pasa a la partida");
  assert.equal(j.w.eval("E.barras.ejercito"), 50);
  assert.equal(j.$("btn-salir").textContent, "Abandonar partida");
});

test("«Saltar tutorial» lleva directo al nombre", () => {
  const j = cargar();
  j.w.eval("empezarTutorial()");
  j.$("btn-salir").click();
  assert.ok(j.visible("screen-name"));
});


test("logros: «Que cada vecino vigile a su vecino» da un logro nuevo; con un toque en la cuadrícula se descubre «Chivatón de barrio» y la carta se gira", () => {
  const j = cargar();
  j.empezar();
  const id = j.w.eval(`CARTAS.find(c => [c.izq, c.der].some(o => (o.banderas || []).includes("base.comites_vigilancia"))).id`);
  j.w.eval(`E.actual = CARTAS.find(c => c.id === "${id}"); mezclarLados = false; E.lados = null;`);
  const dir = j.w.eval(`(E.actual.izq.banderas || []).includes("base.comites_vigilancia") ? -1 : 1`);
  j.w.eval(`resolver(${dir})`);
  assert.ok(j.$("btn-logros").classList.contains("pendiente"), "la estrella de logros se rellena");
  assert.match(j.$("btn-logros").getAttribute("aria-label"), /1 sin abrir/);
  assert.ok(!j.$("menu-juego").contains(j.$("btn-logros")), "los logros ya no están dentro del menú");
  j.$("btn-logros").click();
  assert.ok(!j.$("archivo").classList.contains("hidden"));
  assert.doesNotMatch(j.$("archivo").textContent, /Chivatón/, "no se sabe cuál es hasta abrirlo");
  j.d.querySelector(".nuevo-logro").click();       // un solo toque en la cuadrícula: la carta ya está descubierta
  assert.equal(j.d.querySelector(".logro-titulo").textContent, "Chivatón de barrio");
  assert.ok(j.d.querySelector(".logro-subtitulo").textContent.length > 0, "lleva subtítulo");
  assert.match(j.d.querySelector(".archivo-pista").textContent, /Que cada vecino vigile a su vecino/);
  assert.ok(!j.$("btn-logros").classList.contains("pendiente"), "descubierto, la estrella se vacía");
  assert.ok(!j.d.querySelector(".logro-carta").classList.contains("volteada"));
  j.d.querySelector(".logro-carta").click();       // al tocarla se gira y enseña la descripción y los efectos
  assert.ok(j.d.querySelector(".logro-carta").classList.contains("volteada"));
  assert.match(j.d.querySelector(".logro-dorso").textContent, /Efecto secundario/);
  j.$("archivo-cerrar").click(); j.$("archivo-cerrar").click();
  assert.ok(j.$("archivo").classList.contains("hidden"));
  assert.ok(!j.$("btn-logros").classList.contains("pendiente"), "abierto, la estrella se vacía");
  assert.deepEqual(j.errores, []);
});
