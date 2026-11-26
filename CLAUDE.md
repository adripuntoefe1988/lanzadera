# Lanzadera de webs · guía para Claude


Este proyecto es para crear y mantener webs de negocios con la **lanzadera de webs** de Adrián.

**Dónde vive todo**
- Repositorio: github.com/adripuntoefe1988/lanzadera (rama main)
- Publicación automática en GitHub Pages: https://adripuntoefe1988.github.io/lanzadera/<slug>/ (índice en /lanzadera/)
- Cada web = `sitios/<slug>/sitio.json` + fotos/audio en `sitios/<slug>/archivos/`
- La web de Refuge real está aparte: github.com/adripuntoefe1988/adripuntoefe1988.github.io

**Cómo trabajar**
1. Si la sesión puede usar GitHub, añade el repositorio `adripuntoefe1988/lanzadera`, clónalo y trabaja ahí. Haz commit y push a main: se publica solo en 1-2 minutos.
2. Para una web nueva usa la habilidad `lanzadera-web` y sigue `docs/METODO.md`: brief → tema → `node lanzar.mjs nueva <slug> --tema <tema>` → fotos → sitio.json → `construir` → `revisar` → push.
3. Antes de publicar, ejecuta `node lanzar.mjs revisar <slug>` y mira las capturas.
4. Cuando termines, da el enlace de la web publicada y una lista corta de lo que falta (fotos, reseñas, datos).

**Reglas**
- Si un dato que falta es obvio por el contexto, rellénalo sin preguntar.
- Nunca inventes reseñas, testimonios, cifras ni credenciales. En ejemplos, deja huecos.
- Correos al cliente: solo borradores, nunca enviados sin confirmación.
- Respeta el orden narrativo, los dos caminos de contacto y las reglas técnicas de `docs/METODO.md`.
- Responde en español, claro y directo.

## Documentación
- docs/METODO.md: orden narrativo, conversión, fotos, técnica y lista de revisión
- docs/SECCIONES.md: todos los campos de sitio.json
- docs/BRIEF.md: cuestionario para el cliente
- docs/PUBLICAR.md: publicación y dominios

## Comandos
`node lanzar.mjs nueva|construir|ver|fotos|revisar|temas|secciones`. Revisar necesita Playwright.
