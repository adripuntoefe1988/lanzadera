# Lanzadera de webs

Un solo proyecto para crear webs de negocios que no se parecen en nada: un estudio de música, una panadería, una clínica, una empresa de reformas, un entrenador o una peluquería.

Cada web es **un archivo de texto** (`sitios/<nombre>/sitio.json`) con los textos, las fotos y el orden de las secciones. El motor lo convierte en una web rápida, de un solo archivo, que funciona en móvil y ordenador y se publica gratis en GitHub Pages.

Está construida a partir de todo lo que aprendimos con la web de Refuge Sound Record: el orden de las secciones, cómo convencer sin sacar a la gente de la web, el contacto en dos caminos, la música de ambiente, y los arreglos de rendimiento y de pantallas.

## Lo que necesitas

- [Node.js](https://nodejs.org) 18 o superior. No hace falta instalar nada más.
- Opcional: Python 3 con Pillow para optimizar fotos (`pip install pillow`).
- Opcional: Playwright para la revisión automática (`npm i -D playwright && npx playwright install chromium`).

## Crear una web en 5 pasos

```bash
# 1. Crea la carpeta de la web a partir de la plantilla, eligiendo tema
node lanzar.mjs nueva panaderia-pepa --tema horno --nombre "Panadería Pepa"

# 2. Mete las fotos en sitios/panaderia-pepa/archivos/ y optimízalas
node lanzar.mjs fotos panaderia-pepa

# 3. Rellena sitios/panaderia-pepa/sitio.json (textos, secciones, WhatsApp)

# 4. Mírala en el navegador mientras la editas
node lanzar.mjs ver panaderia-pepa        # abre http://localhost:8080/panaderia-pepa/

# 5. Revísala en móvil y ordenador antes de publicar
node lanzar.mjs revisar panaderia-pepa
```

Para publicar, sube el proyecto a GitHub: el flujo de `.github/workflows/publicar.yml` construye todas las webs y las publica solo. Lo tienes paso a paso en [docs/PUBLICAR.md](docs/PUBLICAR.md).

## Qué hay dentro

| Carpeta | Qué es |
|---|---|
| `lanzar.mjs` | La orden principal: `nueva`, `construir`, `ver`, `fotos`, `revisar`, `temas`, `secciones` |
| `motor/` | El generador. `secciones/` tiene un archivo por tipo de bloque; `runtime/` el JavaScript que solo se incluye si la web lo usa |
| `temas/` | 6 estilos visuales listos (colores, tipografías, formas) |
| `sitios/` | Una carpeta por web. `_plantilla` es el punto de partida |
| `docs/` | El método, el cuestionario para el cliente, el catálogo de secciones y cómo publicar |
| `herramientas/` | Optimizador de fotos y revisión automática |

## Temas

| Tema | Para qué | Ejemplo |
|---|---|---|
| `templo` | Oscuro, rojo fuego, titulares de impacto. Música, tatuajes, barberías, boxeo | `refuge` |
| `papel` | Claro y editorial. Arquitectura, reformas, despachos, consultoría | `reformas-alba` |
| `horno` | Cálido y artesano. Panaderías, restaurantes, cafeterías, producto local | `horno-la-espiga` |
| `clinica` | Limpio y sereno. Fisioterapia, dentistas, psicología, nutrición | `fisio-norte` |
| `noche` | Oscuro y elegante, oro. Peluquerías, coctelerías, bodas, joyería | `salon-medianoche` |
| `pista` | Enérgico, lima eléctrica. Gimnasios, entrenadores, academias | `entrena-con-dani` |

Cualquier tema se puede ajustar por web con `"ajustesTema": { "--acento": "#E4572E" }`.

## Secciones disponibles

`hero` · `caminos` · `texto-foto` · `manifiesto` · `pasos` · `comparador` (audio o imagen) · `testimonios` · `videos` · `resenas` · `galeria` · `servicios` · `lista` · `faq` · `cuestionario` · `ubicacion` · `cta`

Y extras para toda la web: botón flotante de WhatsApp, música de ambiente y pantalla de entrada.

Todos los campos están en [docs/SECCIONES.md](docs/SECCIONES.md).

## Los ejemplos

- `refuge`: la web de Refuge Sound Record reconstruida con el motor, con fotos, audios antes/después, 17 testimonios en vídeo, 45 capturas de reseñas, packs y cuestionario.
- `horno-la-espiga`, `fisio-norte`, `reformas-alba`, `entrena-con-dani`, `salon-medianoche`: negocios inventados para enseñar cada tema. Las fotos salen como huecos rayados con la foto que habría que hacer, así sirven también de lista de fotos para el cliente. Las reseñas son huecos para reseñas reales: no inventes reseñas.

`node lanzar.mjs construir` las construye todas en `dist/` con una página índice.
