# Catálogo de secciones y campos

## Lo general del `sitio.json`

```jsonc
{
  "titulo": "Nombre · lo que hace",          // pestaña del navegador y Google
  "descripcion": "Frase de ~150 caracteres", // Google y al compartir
  "tema": "papel",                           // templo | papel | horno | clinica | noche | pista
  "ajustesTema": { "--acento": "#E4572E" },  // opcional: cambia cualquier variable del tema
  "marca": { "nombre": "", "etiqueta": "REC", "logo": "archivos/logo.svg", "favicon": "archivos/icono.svg" },
  "contacto": { "whatsapp": "34600000000", "mensaje": "Mensaje del botón flotante", "email": "", "telefono": "", "instagram": ["usuario"] },
  "navegacion": { "boton": { "texto": "Pide cita", "seccion": "contacto" } },
  "extras": {
    "botonWhatsapp": true,                   // botón verde flotante (por defecto sí, si hay WhatsApp)
    "musica": { "archivo": "archivos/ambiente.mp3", "titulo": "Lofi", "volumen": 0.35 },
    "entrada": { "etiqueta": "● REC", "titulo": "MARCA", "subtitulo": "", "boton": "Entrar", "sinSonido": "Entrar sin sonido" }
  },
  "secciones": [ /* bloques, en el orden en que salen */ ],
  "pie": { "titular": "Nombre legal", "texto": "Ciudad", "enlaces": [{ "texto": "Aviso legal", "href": "aviso.html" }] },
  "cssExtra": ""                             // por si hace falta un retoque puntual
}
```

### Campos que comparten todas las secciones

| Campo | Para qué |
|---|---|
| `tipo` | Qué sección es (obligatorio) |
| `id` | Ancla para enlazarla (`#contacto`). Si no lo pones, se genera |
| `menu` | Si lo pones, sale en el menú con ese texto |
| `capitulo` | Rótulo pequeño tipo "03 / EL OFICIO" |
| `antetitulo` | Línea pequeña con raya antes del título |
| `titulo` | Título. `[[texto]]` lo pinta con el color de acento |
| `entradilla` | Párrafo bajo el título |
| `fondo` | `normal`, `alterno` o `igual`. Por defecto se alternan |

En cualquier texto: `**negrita**`, `*cursiva*`, `[[acento]]`.

### Botones (en cualquier sitio donde haya `boton` o `botones`)

```jsonc
{ "texto": "Pedir cita", "seccion": "contacto" }                  // baja a una sección
{ "texto": "Consultar", "whatsapp": "Mensaje ya escrito" }        // abre WhatsApp con ese mensaje
{ "texto": "Consultar", "whatsapp": true }                        // con el mensaje general
{ "texto": "Instagram", "href": "https://..." }                   // enlace normal
"estilo": "principal" | "secundario" | "texto"
```

### Fotos
Ruta relativa a la carpeta del sitio (`archivos/foto.webp`). Si dejas la ruta vacía pero pones el texto alternativo (`fotoAlt`, `alt`), sale un **hueco rayado con ese texto**: sirve de lista de fotos pendientes. `fotoPos` / `pos` mueve el encuadre (`"50% 25%"`).

---

## hero · portada
`antetitulo`, `titulo` (lista de líneas; una línea puede ser `{ "texto": "...", "acento": true }`), `entradilla`, `foto`, `fotoAlt`, `fotoPos`, `botones` (máx. 2), `datos` (`[{ "valor": "180+", "texto": "obras" }]`).

## caminos · empieza por aquí
`tarjetas`: `[{ etiqueta, titulo, texto, foto, fotoAlt, fotoPos, boton }]`. De 2 a 4.

## texto-foto · historia, quién soy, el espacio
`parrafos` (lista), `cita`, `firma`, `boton`, `foto` + `fotoAlt` o `fotos` (`[{ src, alt, pos }]`, dos fotos escalonadas), `pieFoto`, `invertir` (foto a la izquierda). Las fotos se amplían.

## manifiesto
`frases`: `[{ fuerte, texto }]` (numeradas), `cierre`, `foto` (queda fija al hacer scroll).

## pasos · cómo trabajamos
`pasos`: `[{ titulo, texto }]`, `boton`.

## comparador · antes y después
`modo`: `audio` o `imagen`. `etiquetas`: `["Antes", "Después"]`.
- audio: `items: [{ titulo, subtitulo, antes, despues, nota }]`. Las dos pistas van sincronizadas. Usa fragmentos de ~35 s al mismo volumen percibido.
- imagen: `items: [{ titulo, alt, antes, despues }]`. Deslizador.
`consejo`: nota final.

## testimonios · reseñas escritas destacadas
`citas: [{ frase, completa, nombre, rol, foto }]`. `completa` puede ser texto o lista de párrafos (sale en "Leer reseña completa"). Solo reseñas reales.

## videos · YouTube
`videos: [{ youtube, titulo, subtitulo, portada, distintivo }]`. `youtube` admite el enlace o el código. Sin `portada` usa la miniatura de YouTube. `visibles` (por defecto 6), `textoVerMas`, `columnas` (3).

## resenas · nota y cinta
`nota` ("4,9"), `fuente` ("Google"), `total`, `enlace` (a la ficha, sale como "Verificadas en Google"), `pie`, y una de dos:
- `capturas: ["archivos/resenas/r1.webp", ...]` → botón "Leer las reseñas" que abre el visor.
- `resenas: [{ texto, nombre, fecha, estrellas }]` en texto.

## galeria
`fotos: [{ src, alt, pie, grande, pos }]`, `nota`.

## servicios · packs / planes
`planes: [{ verbo, nombre, tipo, precio, frase, texto, incluye, aviso, destacado, etiqueta, boton, alternativa, nota }]`, `nota` general. Recomendado: botón de WhatsApp con mensaje propio y `alternativa` al cuestionario.

## lista · servicios sueltos o ventajas
`items: [{ icono, titulo, texto }]`, `boton`.

## faq
`preguntas: [{ pregunta, respuesta }]` (`respuesta` puede ser lista de párrafos).

## cuestionario · contacto
`directo: { titulo, texto, boton }` (camino rápido a WhatsApp), `preguntas: [{ pregunta, clave, opciones }]` (sin `opciones` es una pregunta abierta; `ayuda` es el texto de ejemplo), `mensajeInicio`, `textoFinal`, `gracias`, `foto`. Termina abriendo WhatsApp (o el correo si no hay WhatsApp) con un resumen.

## ubicacion
`parrafos`, `direccion`, `horario: [{ dias, horas }]`, `mapa` (enlace a Google Maps), `nota`.

## cta · banda de llamada a la acción
`titulo`, `texto`, `botones`.

---

## Añadir una sección nueva

Crea `motor/secciones/<tipo>.mjs` con:

```js
export default {
  tipo: 'mi-seccion',
  render(d, sitio, ctx) { return `<section id="${ctx.id}">...</section>`; },
  css: `/* estilos usando las variables del tema */`,
  runtime: [],   // piezas de motor/runtime que necesita
};
```

El motor la detecta solo. Usa siempre variables (`var(--acento)`) y no colores fijos, así funciona con todos los temas.
