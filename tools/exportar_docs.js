// Genera los documentos de docs/ desde la fuente única (src/datos.js + el juego montado). No los edites a mano.
//   npm run docs      (necesita haber hecho antes «npm run build»)
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const RAIZ = path.join(__dirname, "..");

// 1) datos con los efectos tal como se escriben (escala pequeña), sin los factores del motor
const D = new Function(fs.readFileSync(path.join(RAIZ, "src/datos.js"), "utf8") +
  "; return { CARTAS, ERAS, FINALES, FUTURO, FUTURO_ERA, BARRAS };")();
// 2) lo que depende del motor (estados, grupos, ilustraciones, factores) se lee del juego montado
const w = new JSDOM(fs.readFileSync(path.join(RAIZ, "dist/index.html"), "utf8"), { runScripts: "dangerously" }).window;
const juego = w.eval("({ ESTADOS, RESUMEN, GRUPO_DE, ILUSTRACION_FIJA, FACTOR_EFECTOS, FACTOR_DERIVA, COLOR_GRUPO, EMOJI_ESTADO, EMOJI_FUERZA, FUERZAS })");
const ilus = JSON.parse(fs.readFileSync(path.join(RAIZ, "data/ilustraciones.json"), "utf8"));

const N = { pueblo: "Pueblo", ejercito: "Ejército", elite: "Élite", potencias: "Potencias", crisis: "Crisis" };
const sg = v => (v > 0 ? "+" : "−") + Math.abs(v);
const fx = e => Object.entries(e).map(([k, v]) => `${N[k]} ${sg(v)}`).join(" · ");
const cod = b => "`" + b.replace(/^base\./, "") + "`";
const AUTO = "<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->\n\n";

function condicion(c) {
  const k = c.cond || {}, t = [];
  if (c.tipo === "ancla") t.push(`ancla de los años ${c.ventana[0]} a ${c.ventana[1]} de su era`);
  else if (c.tipo === "cola") t.push("carta de cola: solo sale si una decisión anterior la encola");
  else if (c.tipo === "crisis") t.push("carta de crisis: la dispara la crisis oculta" + (c.repetible ? " (repetible)" : ""));
  else if (c.tipo === "coalicion") t.push("carta de coalición: la dispara tener dos barras bajas a la vez" + (c.repetible ? " (repetible)" : ""));
  else t.push(`sorteo con peso ${c.peso}`);
  if (k.requiere) t.push("exige " + k.requiere.map(cod).join(" y "));
  if (k.alguna) t.push("exige alguna de " + k.alguna.map(cod).join(", "));
  if (k.barraMax) t.push("solo si " + Object.entries(k.barraMax).map(([b, v]) => `${N[b]} está en ${v} o menos`).join(", "));
  if (k.crisisMin) t.push(`solo si la crisis oculta llega a ${k.crisisMin}`);
  if (k.turnoMin) t.push(`a partir del año ${k.turnoMin} de la era`);
  return t.join("; ");
}
function opcion(o, L) {
  let s = `- **${L}. ${o.accion}** *${o.remate}* ${fx(o.efectos)}`;
  if (o.banderas && o.banderas.length) s += " · Bandera: " + o.banderas.map(cod).join(", ");
  if (o.encolar && o.encolar.length) s += " · Encola: " + o.encolar.map(q => `\`${q.carta}\` en ${q.min === q.max ? q.min : q.min + " a " + q.max} años`).join(", ");
  return s;
}
function bloque(c, n) {
  let s = `### ${n}. ${c.titulo}${c.borrador ? " *(borrador)*" : ""}\n\n**Personaje:** ${c.personaje}  \n**Condición:** ${condicion(c)}.\n\n**Carta:** «${c.texto}»\n\n${opcion(c.izq, "A")}\n${opcion(c.der, "B")}\n`;
  const futuras = [...(c.izq.banderas || []), ...(c.der.banderas || [])].filter(b => D.FUTURO[b]);
  if (futuras.length) s += "\n" + futuras.map(b => `**Consecuencia futura de ${cod(b)}:** ${D.FUTURO[b].replace(/^Con `[^`]+`, /, "")}`).join("\n\n") + "\n";
  if (c.archivo) s += `\n**Archivo histórico:** ${c.archivo}\n`;
  return s;
}
const out = (f, t) => { fs.mkdirSync(path.join(RAIZ, "docs"), { recursive: true }); fs.writeFileSync(path.join(RAIZ, "docs", f), t); console.log("docs/" + f); };

// ---- cartas por era ----
D.ERAS.forEach((era, i) => {
  const cartas = D.CARTAS.filter(c => (c.era || 1) === i + 1);
  const cab = `# Cartas · Era ${i + 1}: ${era.nombre}\n\n${AUTO}Duración: entre ${era.min} y ${era.max} años. ${cartas.length} cartas. Los efectos están en la escala pequeña de los datos; el juego los multiplica por ` +
    Object.entries(juego.FACTOR_EFECTOS).map(([k, v]) => `${N[k]} ×${v}`).join(", ") + (era.factor ? ` y, en esta era, por ${era.factor}` : "") + ".\n\n";
  out(`cartas_era_${i + 1}.md`, cab + cartas.map((c, j) => bloque(c, j + 1)).join("\n"));
});

// ---- banderas ----
const concede = {}, exige = {};
D.CARTAS.forEach(c => {
  ["izq", "der"].forEach((l, k) => (c[l].banderas || []).forEach(b => (concede[b] = concede[b] || []).push(`${c.titulo} (${k ? "B" : "A"})`)));
  const k = c.cond || {}; [...(k.requiere || []), ...(k.alguna || [])].forEach(b => (exige[b] = exige[b] || []).push(c.titulo));
});
const todas = [...new Set([...Object.keys(concede), ...Object.keys(exige), ...Object.keys(D.FUTURO)])].sort();
out("banderas.md", `# Banderas y cadenas\n\n${AUTO}Cada decisión puede dejar una bandera; las cartas posteriores se activan al tenerla.\n\n| Bandera | La concede | La exigen | Consecuencia (era) |\n| --- | --- | --- | --- |\n` +
  todas.map(b => `| ${cod(b)} | ${(concede[b] || ["—"]).join("; ")} | ${(exige[b] || ["—"]).join("; ")} | ${D.FUTURO[b] ? D.FUTURO[b] + " (era " + (D.FUTURO_ERA[b] || 2) + ")" : "—"} |`).join("\n") + "\n");

// ---- personajes ----
const porP = {}; D.CARTAS.forEach(c => (porP[c.personaje] = porP[c.personaje] || []).push(c));
const fila = ([p, cs]) => {
  const clave = juego.ILUSTRACION_FIJA[p], ruta = ilus[clave] || "—";
  const estado = ruta.includes("definitivos") ? "definitiva" : ruta.includes("provisionales") ? "provisional" : "sin dibujo";
  return `| ${p} | ${juego.GRUPO_DE[p]} | ${cs.length} (${cs.filter(c => !c.era).length}/${cs.filter(c => c.era === 2).length}) | ${estado} | \`${ruta}\` |`;
};
out("personajes.md", `# Personajes\n\n${AUTO}Con el dictador solo hablan sus ministros, los dos ministros del grupo Ejército y los embajadores. La gente corriente y Varela solo aparecen mencionados.\n\n| Personaje | Grupo | Cartas (era 1 / era 2) | Ilustración | Archivo |\n| --- | --- | --- | --- | --- |\n` +
  Object.entries(porP).sort((a, b) => b[1].length - a[1].length).map(fila).join("\n") + "\n");

// ---- estados ----
out("estados.md", `# Estados del régimen\n\n${AUTO}Hay cuatro ranuras. Al entrar un quinto estado, sale el más antiguo. Los valores de \`deriva\` son los del juego (ya multiplicados por ${juego.FACTOR_DERIVA}).\n\n| Estado | Emoji | Qué es | Efecto | Deriva | Cada | Duración |\n| --- | --- | --- | --- | --- | --- | --- |\n` +
  Object.entries(juego.ESTADOS).map(([id, e]) => `| ${e.nombre} (\`${id}\`) | ${juego.EMOJI_ESTADO[id]} | ${e.descripcion} | ${juego.RESUMEN[id] || ""} | ${e.deriva ? fx(e.deriva) : "—"} | ${e.cada} | ${e.duracion ? e.duracion + " años" : "hasta que otro lo desplace"} |`).join("\n") + "\n");

// ---- finales ----
out("finales.md", `# Finales\n\n${AUTO}Si una fuerza llega a 0 o a 100, la partida termina.\n\n| Causa | Título | Texto |\n| --- | --- | --- |\n` +
  Object.entries(D.FINALES).map(([k, f]) => `| \`${k}\` | ${f.titulo} | ${f.texto} |`).join("\n") + "\n");
