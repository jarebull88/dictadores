# ¡Comandante, ordene!

Juego de cartas satírico tipo Reigns: eres un dictador del Caribe (sin nombre de país) y decides deslizando la carta. Cuatro fuerzas (Pueblo, Ejército, Élite, Potencias); si una llega a 0 o a 100, caes.

Es un único HTML autocontenido. Juego completo: cuatro eras (Ascenso, Consolidación, Culto y Ocaso), 94 cartas, pantalla de victoria y 10 portavoces de papel recortado con su mini animación.

## Empezar
```
npm install            # una vez
pip install pillow numpy scipy   # solo para recortar personajes e iconos
npm test               # monta el juego y pasa las pruebas
```
Abre `dist/index.html` en el navegador, con la ventana estrecha (formato móvil).

## Dónde está cada cosa
| Quiero… | Voy a… |
| --- | --- |
| Cambiar un texto o un efecto de una carta | `src/datos.js` |
| Añadir una carta o una era | `src/datos.js` (y `docs/DISENO.md`, «Cómo se añade una era») |
| Cambiar reglas, estados, interfaz o dificultad | `src/motor.js` |
| Cambiar colores o maquetación | `src/estilos.css`, `src/cuerpo.html` |
| Cambiar un personaje o un icono | `docs/PIPELINE_PERSONAJES.md` (assets, recorte y ojos) |
| Ver las cartas como documento | `docs/` (se genera con `npm run docs`) |
| Entender por qué se decidió algo | `docs/HISTORIAL_DE_DECISIONES.md` |

Claude Code lee `CLAUDE.md` al abrir la carpeta: ahí están las reglas del proyecto y cómo le gusta trabajar a Jorge.

## Licencias
Tipografías Courier Prime (SIL OFL) y Special Elite (Apache 2.0), en `assets/fuentes/`. Iconos de interfaz de Material Symbols (Apache 2.0). Las ilustraciones son generadas por IA para este proyecto.
