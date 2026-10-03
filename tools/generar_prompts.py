#!/usr/bin/env python3
"""Genera los prompts de imagen de cada personaje (fotografía de prensa de los años 60, en blanco y negro, con contorno grueso).

    python3 tools/generar_prompts.py            # escribe prompts/generados/NN_clave.txt
    python3 tools/generar_prompts.py --pendientes   # solo los que faltan por ilustrar

La parte común (estilo, contorno, encuadre pegado abajo, pie de foto) está aquí; lo propio de cada personaje, en prompts/personajes_bn.json.
Regla del proyecto: los ministros son «víboras vividoras»: el prompt describe lujo, glotonería y desprecio, nunca trabajo ni humildad.
"""
import json, pathlib, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PLANTILLA = """Crea una fotografía realista en blanco y negro de {sujeto} inventad{o} (una persona ficticia, no basada en ninguna persona real) para un videojuego satírico de humor negro ambientado en una dictadura ficticia del Caribe. No hay imagen de referencia: todo lo necesario está descrito aquí.

ESTILO
Foto de prensa de los años 60, tal como se vería impresa en un periódico de la época: blanco y negro puros, trama de puntos (halftone) visible, grano grueso de impresión, alto contraste, negros densos y blancos limpios, ligera imperfección de tinta. Iluminación frontal dura, de flash, como un retrato oficial de archivo. Es una fotografía realista, no un dibujo ni una caricatura.{extra_estilo}

CONTORNO Y FONDO
El personaje está recortado del fondo y lleva un contorno negro grueso y continuo alrededor de su silueta ({partes_contorno}), como una pegatina recortada. Fondo blanco puro, liso, sin sombras, sin degradados y sin textura.

PERSONAJE: {pie_mayus}
{desc}

ENCUADRE (importante)
Imagen vertical 4:5. Los cuatro quintos superiores son la fotografía; el quinto inferior es una franja blanca para el pie de foto.
El personaje está PEGADO AL BORDE INFERIOR de la fotografía: busto de frente y centrado, con la cabeza en el tercio superior y los hombros anchos. El cuerpo continúa hacia abajo y queda cortado por el borde inferior de la foto, como si estuviera recortada ahí. NO hay ningún contorno negro, línea ni base en la parte de abajo: el contorno grueso baja por los lados del cuerpo y desaparece por el borde inferior. Pequeño margen blanco {margen}; los hombros pueden llegar casi a los bordes laterales.

PIE DE FOTO
En la franja blanca inferior, centrado, una sola línea con tipografía de imprenta de periódico antiguo (serif, negra): «{pie}». Ningún otro texto, número, marco ni logotipo.

PROHIBIDO
Ningún emblema, bandera, insignia, estrella ni símbolo de ningún país. {extra_prohibido}Ninguna persona real.
"""

def main():
    solo_pendientes = "--pendientes" in sys.argv
    fichas = json.loads((RAIZ / "prompts" / "personajes_bn.json").read_text(encoding="utf-8"))
    salida = RAIZ / "prompts" / "generados"
    salida.mkdir(exist_ok=True)
    for f in salida.glob("*.txt"): f.unlink()
    n = 0
    for i, f in enumerate(fichas, 1):
        if solo_pendientes and not f["estado"].startswith("PENDIENTE"): continue
        texto = PLANTILLA.format(
            sujeto=f["sujeto"], o="a" if f["sujeto"] == "una mujer" else "o",
            extra_estilo=f.get("extra_estilo", ""), partes_contorno=f.get("partes_contorno", "pelo, cabeza, orejas, hombros y brazos"),
            pie_mayus=f["pie"].upper(), desc=f["desc"], margen=f.get("margen", "encima de la cabeza"), pie=f["pie"],
            extra_prohibido=f.get("extra_prohibido", ""))
        ruta = salida / f"{i:02d}_{f['clave']}.txt"
        ruta.write_text(texto, encoding="utf-8"); n += 1
        print(f"{ruta.relative_to(RAIZ)}  [{f['estado']}]")
    print(f"{n} prompts")

if __name__ == "__main__":
    main()
