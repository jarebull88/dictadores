# Piloto de la era 1 (28 oct)

Se escribe a mano. Es la fase 3 de `docs/PLAN_NARRATIVO.md`: qué cartas tiene la era 1 y cómo se reescriben con el criterio nuevo (`docs/GUIA_DE_REDACCION.md`). Parte de la auditoría (`docs/AUDITORIA_HISTORICA.md`).

**Criterio de Jorge:** es un MVP; lo que importa es que funcione y que el juego **aguante crecer** (tramas nuevas, más cartas que se integren en las que hay, otra carta para la trama de Diezfuegos…). La variedad vendrá al ampliar, una vez esté todo pulido.

## Estructura
**Cinco hitos fijos** (varios son miniflujos de 2 pasos; el segundo no cuenta):
1. El primer día: una de tres (`casa_vacia`, `casa_tirano`, `arcas_vacias`).
2. Diezfuegos: un comandante sin nombre dimite → el avión de Diezfuegos no vuelve.
3. El aliado: la visita del embajador oriental → las refinerías se niegan a refinar su crudo.
4. La bahía, con la declaración socialista dentro.
5. Los misiles → el ultimátum (siempre, no solo si te aliaste).

**Bolsa de sorteo** (3–5 por partida): los demás hechos documentados con mucho peso (se elige *cómo*, no *si*), las cartas menores y las de humor.

## Cambios aprobados
- **Quitar:** `puerto`.
- **Fundir:** `estudiantes_calle` en `urnas` (se queda el «¿Elecciones para qué?»); `asesores` en `visitante_oriental`; `declaracion_socialista` en `la_bahia`; `escuelas` con los colegios religiosos y los curas expulsados.
- **Rehacer:** `comandante_dimite` (sin Mota), `refinerias` (motivo real), `retrato` (un ministro adulador quiere una estatua; lo histórico es prohibirlas por ley), `oficiales` (los oficiales del tirano que se rindieron piden sitio en el Ejército nuevo), `club_golf` (el norte amenaza con romper relaciones), `milicias` (desde arriba), `embargo` (el norte deja de comprar el azúcar).
- **Disparador nuevo:** `huelgas_crisis` (la marcha de los electricistas) sale por sorteo, sin `puerto`.
- **Efectos fuera de la era 1:** se va `universidades` (era 2), cambia `club_ajedrez` con `oficiales`, `aliado_enfadado` necesita otro motivo y `la_memoria` (era 4) se queda sin Mota.

## Humor (una de cada tres)
- **Entran:** el béisbol de los barbudos (el Comandante lanza en un partido de exhibición); «¿hay algún economista?» (Ferro levanta la mano porque entiende «comunista» y acaba presidiendo el Banco Nacional, firmando los billetes con su apodo; estrena a Ferro en la era 1); las barbas (¿se afeitan los barbudos ahora que gobiernan?; prepara el atentado de la crema para la barba); los casinos (se cierran, los crupieres protestan y se reabren); el refresco del norte nacionalizado (hay que ponerle nombre revolucionario).
- **No entran:** la paloma en el hombro (es el chiste del tutorial y desbloquea un logro); el discurso de cuatro horas (se guarda: puede repetirse en varias eras y no hay que quemarlo); los cuarteles convertidos en escuelas (no es ridículo); el hotel de la asamblea de naciones y el hotel de lujo como cuartel general (se prefieren las otras).

## Textos (28 oct): guardados en `src/datos.js`
Las 36 cartas de la era 1 están reescritas con el criterio nuevo (se leen en `docs/cartas_era_1.md`). Se quitan `puerto`, `arcas_vacias` (la sustituyen los casinos en el grupo `inicio`), `garantias`, `huelgas_crisis`, `crisis_factura`, `coalicion_dinero_sale`, `asesores` (entra en `visitante_oriental`) y `estudiantes_calle` (entra en `urnas`); en la era 2, `universidades`. Entran cinco cartas: los casinos, el partido de béisbol, el economista, las barbas y el refresco. Nombres nuevos: **Milfuegos** (antes Diezfuegos, Comandante) y **Cabaña** (antes Ferro); el comandante que dimite va sin nombre. El logro «Chivatón de barrio» pasa a `denuncias_falsas` (era 2).

Cambios de estructura ya hechos, porque los textos los pedían: el aliado es un miniflujo (`visitante_oriental` → `refinerias`), los misiles salen siempre (sin exigir la alianza), y las dos opciones de los grandes hechos llevan a lo mismo (las dos respuestas de las refinerías encolan el azúcar).

## Pendiente para la revisión de estructura (con Jorge)
- **Hecho (28 oct): las secuelas** (antes «estados»). En la era 1: **Censura**, «Aclaren todo» o «Dentro todo, fuera nada»; **Vigilancia**, «Los chismes a la Policía»; **Culto**, «El izquierdo, claro»; **Alineado**, «Me cuadra»; **Embargo**, «Ahora me quedo con todo» o «Compruébeme esta»; **Jaula**, «Nadie sale sin permiso»; **Nacionalizaciones**, «¡Exprópiese!»; **Deuda externa**, «Por la puerta de atrás».
- ~~Miniflujos~~ **Hecho (28 oct):** los segundos pasos no cuentan (`enlace`): el avión, las refinerías, la bahía (tras la declaración socialista, que pasa a ancla), el ultimátum, los maestros del monte y la lista. El azúcar es un tercer paso y cuenta (2–4 turnos después). La era 1 pasa a 10–12 cartas y ×1.15: salen unas 15 (11 cuentan), con ~4 de sorteo; los nueve hitos y pasos salen en todas las partidas; «humano» 63 %, azar 4 %.
- **Hecho (28 oct): pesos del sorteo.** Grandes hechos con mucho peso (comités 30, sin condición desde el turno 3; tierra, alfabetización, curas, reforma urbana, elecciones y embargo total 20), humor 12 y cartas menores a la mitad (3–7). Por partida: unos 2–3 grandes hechos (cada uno en el 36–42 % de las partidas), 1 de humor y 1 menor; «humano» 61 %.
- **Orden y condiciones:** el béisbol (si sale antes o después de Milfuegos ya no importa: la B no lo nombra), `ojos_barrio` sale poco (gran hecho: debería salir siempre), «La voz del exilio» sale poco.
- **Huecos:** sin `crisis_factura` no hay carta para la crisis leve; sin `coalicion_dinero_sale`, la coalición Partido–Potencias se queda sin carta en todas las eras.
- **Era 2:** `aliado_enfadado` apagada (peso 0) hasta reescribirla, porque dependía de rechazar los misiles. Con los cambios, el «humano» de la era 2 vuelve al 57 %.
- **Efectos en números:** los he puesto según las fuerzas acordadas en cada carta; se ajustan en la revisión.
