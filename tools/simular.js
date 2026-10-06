// Simula miles de partidas de todas las eras con distintos estilos de juego y muestra supervivencia, causas de caída y cobertura de cartas.
//   npm run simular
const { JSDOM } = require("jsdom"); const fs = require("fs"); const path = require("path");
const html = fs.readFileSync(process.env.JUEGO_HTML || path.join(__dirname, "..", "dist", "index.html"), "utf8");
const w = new JSDOM(html, { runScripts: "dangerously" }).window;
w.eval(`
  const mag=o=>Object.entries(o.efectos).filter(([k])=>k!=='crisis').reduce((a,[,v])=>a+Math.abs(v),0);
  const sd=(op)=>{ const b={...E.barras}; for(const k in op.efectos){ if(k==='crisis') continue; b[k]=Math.max(0,Math.min(100,b[k]+op.efectos[k])); } return Math.max(...Object.values(b).map(v=>Math.abs(v-50))); };
  // azar: no sabe nada. cauto: elige la opción con puntos más pequeños. omnisciente: conoce los efectos y evita los extremos.
  const ESTR={ azar:()=>Math.random()<.5?-1:1, cauto:()=>mag(E.lados.izq)<=mag(E.lados.der)?-1:1, omnisciente:()=>sd(E.lados.izq)<=sd(E.lados.der)?-1:1 };
  window.__vistas={};
  function __sim(e){ mezclarLados=true; nuevaPartida(); E.actual=siguienteCarta(); barajarLados(); let nulos=0, ciclos=0;
    while(true){
      if(++ciclos>200) return {error:"bucle"};
      if(!E.actual){ nulos++; if(E.era<ERAS.length){ iniciarEra(E.era+1); E.actual=siguienteCarta(); barajarLados(); continue; } return {caida:null,era:E.era,nulos,anios:E.turno-1}; }
      const c=E.actual, dir=ESTR[e](c); window.__vistas[c.id]=(window.__vistas[c.id]||0)+1;
      aplicar(c,opcionDe(dir)); const caida=comprobarCaida();
      if(caida) return {caida,era:E.era,nulos,anios:E.turno-1};
      if(E.turno>finEra()){ if(E.era<ERAS.length) iniciarEra(E.era+1); else return {caida:null,era:E.era,nulos,anios:E.turno-1}; }
      E.actual=siguienteCarta(); barajarLados();
    } }
  window.__run=(n,N)=>{ const r={cae:{},gana:0,nulos:0,errores:0,causas:{},anios:0}; window.__vistas={};
    for(let i=0;i<N;i++){ const x=__sim(n); if(x.error){r.errores++;continue;} r.nulos+=x.nulos; r.anios+=x.anios;
      if(!x.caida) r.gana++; else { r.cae[x.era]=(r.cae[x.era]||0)+1; r.causas[x.era+":"+x.caida]=(r.causas[x.era+":"+x.caida]||0)+1; } }
    r.vistas=window.__vistas; return r; };
`);
const N = Number(process.argv[2]) || 4000;
const NE = w.eval("ERAS.length");
for (const e of ["azar", "cauto", "omnisciente"]) {
  const r = w.__run(e, N);
  let vivos = N, tramos = [];
  for (let era = 1; era <= NE; era++) { const cae = r.cae[era] || 0; tramos.push(`supera la era ${era}: ${(((vivos - cae) / (vivos || 1)) * 100).toFixed(0)}%`); vivos -= cae; }
  console.log(`${e.padEnd(12)} ${tramos.join(" | ")} | gana todas: ${(r.gana / N * 100).toFixed(0)}% | huecos sin carta: ${r.nulos} | errores: ${r.errores} | años medios: ${(r.anios / N).toFixed(1)}`);
  if (e === "azar") {
    for (let era = 1; era <= NE; era++) {
      const c = Object.entries(r.causas).filter(([k]) => k.startsWith(era + ":")), tot = c.reduce((a, [, v]) => a + v, 0) || 1;
      console.log(`   causas de caída en la era ${era}:`, c.sort((a, b) => b[1] - a[1]).map(([k, v]) => k.slice(2).replace("_100", " ↑").replace("_0", " ↓") + " " + (v / tot * 100).toFixed(0) + "%").join(" · "));
    }
    const todas = w.eval("CARTAS.map(c=>c.id)"), nunca = todas.filter(id => !(id in r.vistas));
    const v = Object.entries(r.vistas).sort((a, b) => a[1] - b[1]);
    console.log("   cartas que casi nunca salen:", v.slice(0, 8).map(([k, n]) => k + " " + n).join(", "));
    console.log("   cartas que nunca salen:", nunca.join(", ") || "ninguna");
  }
}
