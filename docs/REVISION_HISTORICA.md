# Revisión histórica de las cartas (16 oct)

Propuesta de Jorge: el juego sigue la **Revolución cubana y el mandato de Fidel Castro (1959–2006)**, aunque toma ideas de otras dictaduras. Aquí se revisan las 101 cartas contra esa cronología: qué carta va en qué era, cuáles no son cubanas y qué momentos faltan. **La edición de las cartas se hace en la sesión de textos**; esto es el mapa.

> **La regla 1 sigue vigente:** ningún país, persona ni nombre real en el juego. Los hechos se cuentan disfrazados (una invasión de exiliados por una bahía, no «Girón»). La historia da el **momento** y el **tono**, no los nombres.
>
> **Ojo:** las fechas salen de memoria (como los ministerios, regla 3). Las marcadas con (?) conviene verificarlas.

---

## 1. Las eras nuevas

| Era | Nombre | Años | Duración | Idea |
|---|---|---|---|---|
| I | La Revolución | 1959–1962 | 4 años | Legitimidad popular, enemigos internos, conquista de las instituciones |
| II | La purga revolucionaria | 1963–1970 | 8 años | Radicalización, movilización de masas, control político |
| III | El culto al Comandante | 1971–1985 | 15 años | Burocracia, lealtad personal, aparato estatal, respaldo del aliado |
| IV | La supervivencia | 1986–2006 | 21 años | Escasez, pérdida del aliado, concesiones económicas, resistencia |

**Decidido por Jorge (16 oct):**
- **Meses por carta según la era: hecho.** Era 1, 5–6 meses (unos 4 años en total); era 2, 12–16 (unos 8); era 3, 22–30 (unos 15); era 4, 30–42 (unos 21). Una partida entera dura unos 48 años, de 1959 a 2006 (`MESES_POR_CARTA`).
- **Se sigue mostrando «N años al poder»**, no el año del calendario.
- **Tratamiento:** se mantiene la escalada como sátira (Comandante, Excelencia, Padre de la Patria). Las cartas que cambian de era ajustan su comienzo: en la era III empiezan por «Excelencia,» y en la I y la II van sin tratamiento.
- **Cienfuegos:** su accidente pasa a la era I, como en la historia, y el homenaje anual a la II.
- **Nombres de las eras: hecho.** La Revolución, La Purga, El Culto y La Supervivencia.
- **Las cartas de otras dictaduras se quedan** si no chocan con la historia principal, porque le dan vidilla exagerada. Solo se cambian las que la contradicen: las de la sección 2, incluidas las dos reescrituras de la era IV.

**Lo que había en esta sección:**
- **Meses por carta según la era.** Ahora toda carta vale 12–24 meses, así que la era I duraría unos 14 años en vez de 4. Propuesta: era I ≈ 5 meses por carta (9 cartas ≈ 4 años), II ≈ 12, III ≈ 24 y IV ≈ 30–36. Una partida entera daría unos 47 años, de 1959 a 2006.
- **Mostrar el año** («1961») en vez de «N años al poder» sería lo más claro. Al ser un país sin nombre no rompe la regla 1, pero lo decide Jorge.
- **Tratamiento.** Históricamente, «Comandante» y «Comandante en Jefe» todo el tiempo; nunca «Excelencia» ni «Padre de la Patria», que vienen de otras dictaduras. Opciones: mantener la escalada como sátira, o pasar a Comandante (I–II) y Comandante en Jefe (III–IV). Decide Jorge.
- **Nombres de las eras** en `ERAS` (ahora Ascenso, Consolidación, Culto, Ocaso).
- **Cienfuegos.** Su accidente es de 1959 (era I), no de la era II. Si se mueve, cambian la bandera `base.accidente_cienfuegos` y `FUTURO_ERA`.

---

## 2. Cartas que cambian de era

| Carta | Ahora | Propuesta | Por qué |
|---|---|---|---|
| `nuevos_vecinos` (los misiles) | II (ancla) | **I, al final** | Crisis de los misiles, octubre de 1962 |
| `ultimatum` (el bloqueo naval) | II (cola) | **I** | Va con la anterior, también en 1962 |
| `general_murmura` (Cienfuegos y el accidente) | II | **I** | El general popular desaparece en 1959 |
| `flores_mar` (el homenaje anual) | III | **II** | El homenaje empieza el año siguiente al accidente y sigue siempre |
| `embargo_total` | II | **I, al final** | El embargo total es de febrero de 1962 |
| `garantias` (las empresas piden garantías) | II | **I** | Las nacionalizaciones son de 1960 |
| `huelgas_crisis` (huelga en el puerto) | II | **I** | Los sindicatos libres desaparecen hacia 1960; después no hay huelgas |
| `estudiantes_calle` (piden las elecciones aplazadas) | II | **I** | El «¿elecciones para qué?» es de 1960–61 |
| `elecciones_controladas` (lista única) | II | **III** | Las primeras elecciones del nuevo sistema son de 1976 |
| `plan_quinquenal` | II | **III** | El primer plan quinquenal es de 1976–1980 |
| `zafra_diez_millones` | III | **II, al final** | La gran zafra fallida es de 1970 |
| `aliado_enfadado` (el aliado corta el petróleo) | III | **II** | El aliado recortó el petróleo en 1967–68 (?) por la independencia del Comandante |
| `satelites` (inspección de los misiles) | III | **I o II** | La inspección se discute justo tras los misiles (1962); en 1970 hubo otra crisis por una base de submarinos (?) |
| `oposicion_firma` (carta de intelectuales) | II | **III, al principio** | Es el caso del poeta encarcelado de 1971 y la carta de los intelectuales extranjeros |
| `acreedor_favores` | III | **IV, al principio** | La crisis de la deuda y el impago son de 1986 |
| `huelga_general` | IV | **IV, reescrita** | No hubo huelgas generales. Lo que hubo fue la revuelta del malecón de 1994: cambiar «sindicatos» por «la gente sale al malecón» |
| `el_reportaje` | IV | **IV, reescrita** | No había prensa libre que destapara nada. El momento real es el juicio televisado de un general héroe en 1989 (conecta con `dos_ejercitos`) |

---

## 3. Cartas que ya encajan

- **Era I (1959–62):**
  - `casa_vacia`, que son los juicios de 1959;
  - `casa_tirano`, `arcas_vacias` y `general_querido`;
  - `refinerias`, de 1960;
  - `visitante_oriental`, la primera visita del aliado en 1960;
  - `embargo`, de 1960;
  - `depuracion_criticos`, por el comandante juzgado en 1959;
  - `tierra`, la reforma agraria de 1959;
  - `periodicos`, por la prensa intervenida en 1960;
  - `urnas`;
  - `alfabetizacion`, de 1961, que es exacta;
  - `escuelas`, la enseñanza nacionalizada en 1961;
  - `asesores`;
  - `club_golf`, que es casi literal porque el Comandante jugó al golf en 1961;
  - `mil_flores`, el «dentro de la Revolución, todo» de 1961;
  - `oficiales`, `puerto`, `marchan` y `retrato`;
  - `ojos_barrio`, por los comités de vigilancia de 1960;
  - las crisis y coaliciones.
  - `retrato` es exacta: en 1959 se prohibieron por ley las estatuas de dirigentes vivos. Así, «No necesito estatuas» es la respuesta histórica.
- **Era II (1963–70):**
  - `aniversario`, `mano_norte`, `voz_exilio`, `periodista_oficial`, `club_ajedrez`, `universidades`, `denuncias_falsas`, `los_chistes`, `el_espia`, `deuda_llama` y `potencias_enfadan`;
  - `jefe_poder`, porque el ministerio del Interior crece en los 60;
  - `hambre`, por la cartilla de racionamiento de 1962;
  - `faltan_tecnicos`, el éxodo de profesionales;
  - `intentos_fuga`, la salida por un puerto abierto en 1965;
  - `cosecha_record`, por las cifras infladas.
- **Era III (1971–85):**
  - `desfile_anual`, `titulares`, `jefe_insaciable`, `aulas_vacias`, `biografia` y `sucesion`;
  - `presos_agenda`, la excarcelación pactada de 1978–79 (?);
  - `mercado_mayor`, los mercados libres de 1980–86;
  - `beso_fraterno`, la visita del líder del aliado en 1974;
  - `viaje_oficial`, el deshielo con el norte de 1977;
  - `el_atentado` y `la_investigacion`, porque hubo atentados de exiliados en los 70;
  - `modestia_sospechosa`, exacta: el culto cubano era de imágenes, vallas y consignas, no de estatuas.
- **Era IV (1986–2006):**
  - `dos_ejercitos`, la purga del ministerio del Interior de 1989, exacta;
  - `aliado_se_hunde` (1991) y `estatuas_caen` (1989), ambas exactas;
  - `los_turistas`, la apertura al turismo de los 90;
  - `el_plebiscito`, la recogida de firmas por un referéndum de 2002;
  - `el_concierto`, porque en 2001 tocó una banda de rock extranjera con el Comandante en primera fila;
  - `la_cuenta`, por la fortuna que le atribuyó una revista extranjera en 2006;
  - `la_salud` y `el_parte_medico`, la enfermedad y el traspaso de 2006, exactas como final;
  - `delfin_impaciente`, `salida_honrosa`, `las_memorias`, `la_memoria`, `la_sequia`, `los_inocentes` y `varela_vuelve`. Esta última solo tiene sentido como camino alternativo, si el general no muere.

---

## 4. Cartas que no son cubanas

Vienen de otras dictaduras. Pueden quedarse como sátira o cambiarse:

| Carta | De dónde viene | Propuesta |
|---|---|---|
| `ciudad_con_nombre` | La capital rebautizada con el nombre del dictador, en el Caribe vecino | Quitar o rehacer. El Comandante nunca puso su nombre a nada; el chiste cubano es justo ese |
| `himno_nuevo` | Asia central | Quitar o cambiar por las **consignas en vallas** («Patria o muerte»…) |
| `libro_texto` | El libro sagrado obligatorio de Asia central | Cambiar por **los discursos completos** como lectura obligatoria |
| `cumpleanos` | Corea del Norte | Cambiar por **el discurso maratoniano**: horas al sol en la plaza |
| `mausoleo`, `mausoleo_vacio` | Lenin y Mao | Al revés de lo cubano, que pidió no tener monumentos. Puede quedar como sátira, pero si se busca exactitud, cambiar |
| `palacio_pueblo`, `palacio_sin_terminar` | Rumanía | Cambiar por un **gran plan faraónico** cubano (una central nuclear que nunca se terminó (?)) |
| `el_monumento`, `pedestal` | Genéricas | Chocan con `retrato` (la ley contra las estatuas). Cambiar por **la valla gigante** o **la tribuna** |
| `las_medallas` | El líder del aliado que coleccionaba medallas | Puede quedar si la medalla la da el aliado |
| `el_doble` | Otras dictaduras | Sátira, sin base cubana. Puede quedar |
| `el_hijo` | Genérica | Puede quedar |

---

## 5. Momentos que faltan (cartas nuevas)

Por era, en orden de importancia. Todo disfrazado (regla 1).

**Era I — La Revolución (1959–62)**
1. **La invasión por la bahía** (1961), el gran hito de la era. Exiliados armados y apoyados por el norte desembarcan. Debería ser un **ancla**.
2. **La declaración socialista** (1961): proclamar que la Revolución es socialista, en el entierro de las víctimas de un bombardeo.
3. **Los niños que se van solos** (1960–62): los padres mandan a sus hijos al norte por miedo a perder la patria potestad.
4. **La reforma urbana** (1960): los alquileres se rebajan a la mitad y los caseros lo pierden todo.
5. **Las milicias** (1960): armar al Pueblo.
6. **Los curas y los colegios religiosos** (1961): se nacionalizan los colegios y se expulsa a sacerdotes.

**Era II — La purga revolucionaria (1963–70)**
1. **Los campos de trabajo** (1965–68): para «antisociales», religiosos y homosexuales.
2. **El comandante que se va** (1965): el compañero de la sierra se marcha a exportar la Revolución y deja una carta de despedida.
3. **La ofensiva revolucionaria** (1968): cierre de todos los pequeños negocios, hasta los puestos de fritas.
4. **El juicio a la microfracción** (1968): comunistas fieles al aliado, juzgados por conspirar.
5. **Aplaudir una invasión** (1968): el aliado invade un país hermano y el Comandante la apoya en público.
6. **Exportar la guerrilla** (1966–67): congreso de revolucionarios del mundo y apoyo a guerrillas en otros países.

**Era III — El culto al Comandante (1971–85)**
1. **La guerra en África** (1975): mandar miles de soldados a una guerra lejana.
2. **La embajada asaltada y el éxodo por mar** (1980): miles se meten en una embajada y luego se abre un puerto para que se vayan, con presos dentro de los barcos.
3. **La nueva Constitución** (1976).
4. **Los cinco años grises** (1971–76): purga cultural, parametración de artistas.
5. **El diálogo con el exilio** (1978): los «traidores» vuelven de visita cargados de regalos.
6. **La isla invadida** (1983): el norte invade un país pequeño donde había trabajadores y soldados propios.

**Era IV — La supervivencia (1986–2006)**
1. **La rectificación** (1986): se cierran los mercados libres. Es la vuelta atrás de `mercado_mayor`.
2. **El juicio al general héroe** (1989): con fusilamiento y retransmitido por televisión. Va con `dos_ejercitos` y `el_reportaje`.
3. **Los apagones y las bicicletas** (1990–94): el «periodo especial».
4. **El dólar legal** (1993): se permite tener divisas.
5. **Los balseros** (1994): se deja salir a quien quiera en balsas. Puede fundirse con `huelga_general` reescrita (la revuelta del malecón).
6. **Las avionetas derribadas** (1996) y la ley del norte que endurece el embargo.
7. **El visitante de blanco** (1998): la visita del Papa (disfrazada).
8. **El niño náufrago** (1999–2000): la batalla por devolver a un niño rescatado en el mar.
9. **La primavera negra** (2003): 75 disidentes condenados de golpe.
10. **El nuevo amigo del petróleo** (2000–): un país rico en petróleo sustituye al aliado caído. ¿Nuevo embajador?

---

## 6. Resumen de números

- **Era I:** entran 7 cartas (los misiles, el bloqueo, Cienfuegos, el embargo total, las garantías, la huelga del puerto y los estudiantes) y no sale ninguna: pasa de 25 a **32**, más las nuevas. Es la más corta en años, así que le sobra material.
- **Era II:** salen 10 y entran 3 o 4 (el homenaje a Cienfuegos, la zafra, el aliado enfadado y quizá los satélites). Se queda en unas **19**, así que necesita las cartas nuevas.
- **Era III:** salen 5 y entran 3; además hay que rehacer 6–8 que no son cubanas.
- **Era IV:** entra 1, se reescriben 2 y se proponen unas 10 nuevas.
- Tras mover cartas, pasar `npm run simular` para comprobar que ninguna era se queda sin cartas ni se descompensa.
