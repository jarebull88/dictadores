// Auditoría de estilos (25 oct): recorre todas las pantallas del juego y agrupa cada texto visible por letra, tamaño, peso y mayúsculas.
// Sirve para ver de un vistazo si algo se sale de los dos estilos (Londrina y Sofia) o de los pesos 400/800.
// Uso: node tools/auditar_estilos.js   (necesita Playwright; en la sesión de Claude Code ya está instalado)
const path = require("path");
let chromium; try { ({ chromium } = require("playwright")); } catch (e) { ({ chromium } = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright")); }
const juego = "file://" + path.join(__dirname, "..", "dist", "index.html") + "?cero";
(async () => { const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const todo = {};
  async function coger(pantalla) {
    const r = await p.evaluate(() => { const out=[]; document.querySelectorAll("#app *").forEach(e=>{
      const cs=getComputedStyle(e); if (cs.display==="none"||cs.visibility==="hidden"||e.closest(".solo-lector")) return;
      const r=e.getBoundingClientRect(); if(!r.width||!r.height) return;
      const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(" "); if(!t) return;
      out.push({ sel:(e.id?"#"+e.id:"")+"."+[...e.classList].join("."), fam:cs.fontFamily.split(",")[0].replace(/"/g,""), size:cs.fontSize, w:cs.fontWeight, tt:cs.textTransform, t:t.slice(0,28) }); }); return out; });
    for (const x of r) { const k=[x.fam,x.size,x.w,x.tt].join(" | "); (todo[k]=todo[k]||new Set()).add(pantalla+": "+x.sel+" «"+x.t+"»"); }
  }
  await p.goto(juego);
  await coger("portada");
  await p.evaluate(()=>empezarTutorial()); await p.waitForTimeout(1500); await coger("tutorial");
  for (let i of [3,5]) { await p.evaluate(i=>pasoTutorial(i), i); await p.waitForTimeout(800); await coger("tutorial"+i); }
  await p.evaluate(()=>{ irANombre(); }); await p.waitForTimeout(900); await coger("nombre");
  await p.evaluate(()=>{ document.getElementById("carta-nombre").classList.add("volteada"); ajustarFicha(document.getElementById("carta-nombre")); }); await p.waitForTimeout(500); await coger("nombre-ficha");
  await p.evaluate(()=>{ nombreDictador="Yoyo"; empezar(); E.estados=[{id:"culto",cartas:0}]; pintarRanuras(); }); await p.waitForTimeout(2500); await coger("partida");
  await p.click(".barra"); await p.waitForTimeout(400); await coger("popup-fuerza"); await p.keyboard.press("Escape");
  await p.click("#btn-menu"); await p.waitForTimeout(300); await coger("menu"); await p.evaluate(()=>cerrarMenu());
  await p.evaluate(()=>{ anunciarLogro(); }); await p.waitForTimeout(800); await coger("logro-texto");
  await p.waitForTimeout(2000); await p.evaluate(()=>{ guardarLogros({chivaton:{abierto:false}}); abrirArchivo(); }); await p.waitForTimeout(300); await coger("archivo");
  await p.click(".sobre-mini"); await p.waitForTimeout(300); await coger("logro-sobre"); await p.click(".sobre-escena"); await p.waitForTimeout(1200); await coger("logro-carta");
  await p.evaluate(()=>{ cerrarArchivo(); E.barras={pueblo:50,ejercito:50,elite:50,potencias:50}; E.turno=finEra()+1; finDeEra(); }); await p.waitForTimeout(800); await coger("era");
  await p.evaluate(()=>{ document.getElementById("carta-era").classList.add("volteada"); }); await p.waitForTimeout(600); await coger("era-informe");
  await p.evaluate(()=>{ empezar(); terminar("pueblo_0"); }); await p.waitForTimeout(800); await coger("caida");
  await p.evaluate(()=>{ empezar(); E.era=4; E.banderas.add("base.mausoleo_construido"); terminar(null); }); await p.waitForTimeout(800); await coger("victoria");
  const permitidas = ["Londrina Solid", "Sofia Sans Semi Condensed"];
  let raros = 0;
  for (const k of Object.keys(todo).sort()) { const [fam, , w] = k.split(" | "); const raro = !permitidas.includes(fam) || !["400", "800"].includes(w); if (raro) raros++;
    console.log((raro ? "⚠ " : "") + k, "\n    ", [...todo[k]].slice(0, 4).join("\n     ")); }
  console.log(raros ? `\n${raros} combinación(es) fuera de los estilos (marcadas con ⚠; las de .solo-lector no se ven)` : "\nTodo en los dos estilos.");
  await b.close(); })();
