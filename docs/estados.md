# Estados del régimen

<!-- Generado por tools/exportar_docs.js a partir de src/datos.js. No lo edites a mano: cambia los datos y ejecuta «npm run docs». -->

Hay cuatro ranuras. Al entrar un quinto estado, sale el más antiguo. Los valores de `deriva` son los del juego (ya multiplicados por 2).

| Estado | Emoji | Qué es | Efecto | Deriva | Cada | Duración |
| --- | --- | --- | --- | --- | --- | --- |
| Censura (`censura`) | 🤐 | Los rumores ocupan el lugar de las noticias, y la vigilancia de barrio se vuelve más probable. | El Pueblo se enfría cada año. | Pueblo −2 | 1 | hasta que otro lo desplace |
| Vigilancia (`vigilancia`) | 👁️ | Cada vecino vigila al de al lado y el aparato de seguridad gana poder. | El Ejército sube y el Pueblo baja. | Ejército +2 · Pueblo −2 | 2 | hasta que otro lo desplace |
| Culto (`culto`) | 🖼️ | Retratos, estatuas y fiestas. La gente aplaude, pero alguien tiene que pagarlas. | El Pueblo sube, pero la crisis crece. | Pueblo +2 | 2 | hasta que otro lo desplace |
| Alineado (`alineado`) | 🤝 | El aliado te sostiene y lleva la cuenta. | Potencias sube, pero la dependencia (crisis) crece. | Potencias +2 | 2 | hasta que otro lo desplace |
| Embargo (`embargo`) | 🚫 | Nadie te vende nada, y lo poco que llega cuesta más. | Potencias baja y las promesas cuestan el doble. | Potencias −2 | 2 | 6 años |
| Frontera cerrada (`frontera`) | 🧱 | Nadie entra ni sale, y el Ejército vigila la frontera. | El Ejército sube, Potencias baja y nadie se marcha. | Ejército +2 · Potencias −2 | 2 | hasta que otro lo desplace |
| Nacionalizaciones (`nacionalizado`) | 🏭 | Lo que era privado ahora es tuyo, y las cuentas también. | La Élite baja y la crisis crece. | Élite −2 | 2 | hasta que otro lo desplace |
| Deuda externa (`deuda`) | 💸 | El acreedor llama cada mes. | Potencias sube, pero la crisis crece. | Potencias +2 | 2 | hasta que otro lo desplace |
