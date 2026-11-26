# El método

Cómo pasar de "quiero una web" a una web publicada que trae clientes. Sale de lo que funcionó (y de lo que hubo que corregir) en la web de Refuge Sound Record.

## 1. Antes de tocar nada: el brief

Pasa al cliente el cuestionario de [BRIEF.md](BRIEF.md). Sin estas respuestas, la web acaba siendo genérica. Lo mínimo:

- **Qué vende y a quién.** Una frase. Si no la tiene, la web no la va a inventar.
- **Qué acción quiere que haga el visitante.** Casi siempre: escribir por WhatsApp, llamar o pedir cita.
- **Qué prueba tiene.** Reseñas reales, vídeos de clientes, antes y después, años de trayectoria, números.
- **Material.** Fotos propias (de su trabajo, su espacio y su cara), logo y redes.
- **Qué NO quiere.** En Refuge: nada de precios, nada de "a 15 minutos de Zaragoza". Apúntalo desde el principio.

## 2. El orden de la página (la historia)

La web cuenta una historia en este orden. No hace falta usar todas las piezas, pero sí respetar la secuencia:

1. **Portada (`hero`)**: qué consigue el cliente, no qué haces tú. Una frase de remate con acento de color. Dos botones como mucho.
2. **Empieza por aquí (`caminos`)**: 2-3 puertas según quién llega ("tengo un tema en la cabeza", "quiero algo más grande"). Cada visitante se reconoce en una.
3. **Quién soy (`texto-foto`)**: la historia personal. La gente compra a personas.
4. **Filosofía (`manifiesto`)**: en qué crees. Opcional, pero da carácter.
5. **Cómo trabajo (`pasos`)**: quita el miedo del primer cliente: sabe qué va a pasar.
6. **La prueba**: `comparador` (antes y después), `testimonios`, `videos` de clientes y `resenas`.
7. **Los trabajos (`videos` / `galeria`)**: lo que ya ha salido de ahí.
8. **El espacio (`galeria` / `ubicacion`)**: cuando el cliente ya se imagina yendo.
9. **La oferta (`servicios`, `lista`)**: los packs, después de toda la prueba. Las pruebas van antes de la oferta, no después.
10. **Dudas (`faq`)**: las que frenan el primer mensaje.
11. **Contacto (`cuestionario`)**: siempre al final y siempre con dos caminos.

Si una sección solo tiene relleno, quítala. Una web corta y con pruebas reales convence más que una larga y vacía.

## 3. Principios de conversión que funcionaron

- **No saques al visitante de la web.** El botón "Leer las reseñas" abre un visor dentro de la página; Google queda como enlace pequeño de "Verificadas en Google". Quien sale a Maps ve a la competencia.
- **Dos caminos de contacto.** WhatsApp directo para el que ya lo tiene claro, y un cuestionario de 3-5 preguntas para el resto. El cuestionario termina abriendo WhatsApp con un resumen, así el mensaje llega con contexto en vez de "hola, ¿precio?".
- **No llenes la web de WhatsApp.** Un botón por pack con su mensaje ya escrito, el flotante y el del contacto. El botón del menú lleva al contacto, no directamente a WhatsApp.
- **Sin precios, salvo que el negocio los necesite.** Frases como "presupuesto a medida" o "beats a medida (presupuesto aparte)" preparan al cliente sin asustar. En negocios de tarifa fija (fisio, peluquería), los precios claros sí ayudan: el motor admite `precio`.
- **Pon un "el más pedido".** Señala el pack de entrada y destácalo.
- **Habla al que tiene miedo.** "¿Es tu primera vez? No tienes que demostrar nada." Una frase así vale más que una lista de equipo.
- **Reseñas solo reales**, con el nombre que la persona usa en público y bien escrito (Mahatma Gyn, no Gin). Nunca inventes reseñas ni testimonios, tampoco "de ejemplo" en una web publicada.
- **El número de reseñas tiene que cuadrar** con lo que se ve. Si pone 65, el visor no debería acabar en 45.

## 4. Fotos

- Menos caras repetidas: la persona en la portada, en "quién soy" y en el contacto; el resto, el trabajo y el espacio.
- La foto de cada tarjeta tiene que contar lo que dice la tarjeta (micro para "tengo un tema", pantalla de producción para "algo más grande", mirada a cámara para "dar rumbo").
- Pasa todo a webp con `node lanzar.mjs fotos <slug>` (lado mayor 1800 px). Una foto de más de 400 KB frena la web en móvil.
- Toda foto lleva `alt`: describe lo que se ve.

## 5. Lo técnico (ya resuelto en el motor, pero conviene saberlo)

- **Titular de portada**: se ajusta al ancho **y al alto** de la pantalla. En monitores anchos y bajos (PC del trabajo) se cortaba; ahora usa `min(vw, vh)`.
- **Scroll fluido**: nada de `backdrop-filter` (desenfoque en vivo), grano como imagen pequeña en vez de filtro SVG, animaciones con `transform`, y la cinta de reseñas solo se mueve cuando está a la vista.
- **Música de ambiente**: los navegadores no dejan sonar nada sin un gesto, y en móvil deslizar no cuenta. Por eso la forma fiable es la **pantalla de entrada**: su toque enciende la música. La música se para sola cuando suena una muestra o un vídeo.
- **Vídeos de YouTube**: se reproducen dentro de la web solo en el dominio real. En vistas previas abren YouTube.
- **Nombres de variables en JavaScript**: cada pieza del runtime va en su propio bloque para que no se pisen (así se rompió una vez el botón "Ver todos los temas").
- **Caché**: tras publicar, recarga con Cmd+Shift+R (Mac) o Ctrl+F5 (PC), o abre en incógnito. Si cambias una foto conservando el nombre, añade `?v=2` a la ruta.
- **Menú**: 6 entradas como mucho. Con más, no caben en portátil.

## 6. Revisión antes de publicar

`node lanzar.mjs revisar <slug>` prueba en móvil (390×844), ordenador (1440×900) y portátil bajo (1366×657): desbordes, titular cortado, imágenes rotas y errores. Deja capturas en `dist/<slug>/_revision/`.

Además, a mano:

- [ ] El número de WhatsApp es el bueno y el mensaje preescrito tiene sentido en cada botón.
- [ ] Los nombres propios están bien escritos (artistas, clientes, lugares).
- [ ] No queda ningún hueco de foto ni texto de plantilla.
- [ ] Los vídeos se reproducen en la web publicada.
- [ ] La descripción (`descripcion`) se lee bien al compartir el enlace por WhatsApp.
- [ ] Probada en un móvil de verdad.
