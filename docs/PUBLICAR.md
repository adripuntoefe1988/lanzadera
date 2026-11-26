# Publicar

## Opción A · GitHub Pages con todas las webs (recomendada)

1. Crea un repositorio en GitHub (por ejemplo `lanzadera`) y sube el proyecto.
2. En el repositorio: **Settings › Pages › Source: GitHub Actions**.
3. Cada vez que subas cambios a `main`, el flujo `.github/workflows/publicar.yml` construye todas las webs y las publica.
4. Quedan en `https://<usuario>.github.io/lanzadera/<slug>/`, con un índice en `https://<usuario>.github.io/lanzadera/`.

## Opción B · Una web en su propio repositorio o dominio

Para el cliente que quiere su web aparte (como `adripuntoefe1988.github.io`):

```bash
node lanzar.mjs construir mi-cliente
```

Sube el contenido de `dist/mi-cliente/` (el `index.html`, la carpeta `archivos/` y `.nojekyll`) a la raíz de su repositorio, o arrástralo a Netlify Drop (app.netlify.com/drop).

## Dominio propio

- **GitHub Pages**: en Settings › Pages › Custom domain escribe `www.sudominio.com`, y en el proveedor del dominio crea un registro CNAME `www` → `<usuario>.github.io`. Marca "Enforce HTTPS".
- **Netlify**: Domain settings › Add custom domain y sigue los pasos.

## Después de publicar

- Recarga sin caché (Cmd+Shift+R en Mac, Ctrl+F5 en PC) o abre en incógnito.
- Comparte el enlace por WhatsApp para ver que salen bien el título, la descripción y la foto.
- Comprueba que los vídeos de YouTube se reproducen dentro de la web (en vistas previas no lo hacen).
