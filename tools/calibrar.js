// Prueba qué pasaría si se multiplicaran TODOS los efectos por un factor (además de los factores del juego).
// Sirve para decidir si hay que subir o bajar la dificultad. Uso: node tools/calibrar.js 1 1.25 1.5
const { JSDOM } = require("jsdom"); const fs = require("fs"); const path = require("path");
const html = fs.readFileSync(process.env.JUEGO_HTML || path.join(__dirname, "..", "dist", "index.html"), "utf8");
function cargar(M) {
  const w = new JSDOM(html, { runScripts: "dangerously" }).window;
  w.eval(`
    const M=${M};
    if (M!==1) CARTAS.forEach(c=>["izq","der"].forEach(l=>{ const e=c[l].efectos; for(const k in e) if(k!=="crisis") e[k]=Math.round(e[k]*M); }));
    const mag=o=>Object.entries(o.efectos).filter(([k])=>k!=='crisis').reduce((a,[,v])=>a+Math.abs(v),0);
    const sd=(op)=>{ const b={...E.barras}; for(const k in op.efectos){ if(k==='crisis') continue; b[k]=Math.max(0,Math.min(100,b[k]+op.efectos[k])); } return Math.max(...Object.values(b).map(v=>Math.abs(v-50))); };
    const ESTR={ azar:()=>Math.random()<.5?-1:1, cauto:()=>mag(E.lados.izq)<=mag(E.lados.der)?-1:1, omnisciente:()=>sd(E.lados.izq)<=sd(E.lados.der)?-1:1 };
    function __sim(e){ mezclarLados=true; nuevaPartida(); E.actual=siguienteCarta(); barajarLados(); let t=0;
      while(E.actual){ const c=E.actual, dir=ESTR[e](c); aplicar(c,opcionDe(dir)); t++; const caida=comprobarCaida(); if(caida) return {caida,t}; if(E.turno>E.N) return {caida:null,t}; E.actual=siguienteCarta(); barajarLados(); }
      return {caida:null,t}; }
    window.__run=(n,N)=>{ let v=0,temprana=0,tt=0,causas={}; for(let i=0;i<N;i++){ const r=__sim(n); if(!r.caida) v++; else { causas[r.caida]=(causas[r.caida]||0)+1; if(r.t<=2) temprana++; } tt+=r.t; } return {vivos:v/N, temprana:temprana/N, turnos:tt/N, causas}; };
  `); return w; }
const N = 4000, factores = process.argv.slice(2).map(Number).filter(Boolean);
for (const M of (factores.length ? factores : [1, 1.25, 1.5])) {
  const w = cargar(M), a = w.__run("azar", N), c = w.__run("cauto", N), o = w.__run("omnisciente", N);
  const tot = Object.values(a.causas).reduce((x, y) => x + y, 0) || 1, porBarra = {};
  for (const [k, v] of Object.entries(a.causas)) { const b = k.split("_")[0]; porBarra[b] = (porBarra[b] || 0) + v; }
  console.log(`x${M}: azar ${(a.vivos*100).toFixed(0)}% | cauto ${(c.vivos*100).toFixed(0)}% | omnisciente ${(o.vivos*100).toFixed(0)}% | caídas en las 2 primeras cartas ${(a.temprana*100).toFixed(1)}% | turnos medios ${a.turnos.toFixed(1)}`);
  console.log("    caídas por fuerza:", Object.entries(porBarra).map(([k, v]) => k + " " + (v / tot * 100).toFixed(0) + "%").join(" · "));
}
