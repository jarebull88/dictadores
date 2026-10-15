# Fotos del archivo histórico

Una foto por carta con archivo, con el **id de la carta** como nombre: `assets/archivo/<id>.jpg` (o `.webp`, `.png`).
`npm run build` las incrusta solas y salen en el hueco de la foto de la carta grande del archivo.
Los ids están en `docs/` (o en `src/datos.js`, campo `id`). Proporción del hueco: 4:3 (se recorta al centro).
Conviene que pesen poco (unos 800 px de ancho, JPEG al 75 %).
