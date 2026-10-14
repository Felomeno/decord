# DecorMG Reformas Integrales — web demo

Propuesta de web para **DecorMG Reformas Integrales** (Madrid), construida con fotos y datos públicos de la empresa. **Es una demo pendiente de aprobación**: se sirve con `noindex`, muestra un aviso visible y no debe presentarse como la web oficial hasta que DecorMG la apruebe.

Documentación completa del proyecto en [`docs/decormg/`](docs/decormg/):
investigación de fuentes, inventario de contenido, manifiesto de fotos, UX, sistema de diseño, especificaciones de página, informe de QA y traspaso.

## Requisitos

- Node.js 20.9 o superior (probado con Node 24)
- npm 10+

## Instalación y arranque

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:3000. La ruta interna `/preview/hero` muestra las tres composiciones de hero que se evaluaron.

Producción local:

```bash
npm run build
```

```bash
npm start
```

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` / `npm start` | Build y servidor de producción |
| `npm run typecheck` | TypeScript sin emitir |
| `npm run lint` | ESLint (config de Next.js) |
| `npm run check` | typecheck + lint + build |
| `npm run images` | Regenera `public/images/` desde `assets-source/` (sharp) |
| `node scripts/qa.mjs [url]` | QA en navegador: capturas a 360/390/768/1024/1440 en `qa-output/` y comprobaciones de accesibilidad, desbordes, menú y formulario. Usa Chrome o Edge instalados (no descarga navegadores). Por defecto `http://localhost:3100` |

## Estructura

```
src/
  app/                 Rutas (App Router): /, /proyectos, /proyectos/[slug], /servicios,
                       /servicios/[slug], /nosotros, /contacto, legales, robots, sitemap
  components/          Cabecera, pie, hoja de obras, constructor de mensaje, Frame (fotos)
    home/              Secciones de la portada
  content/             TODO el contenido editable, tipado
    site.ts            Nombre, teléfono, WhatsApp, dirección, enlaces, valoración de Google
    projects.ts        Obras: título, barrio, trabajos, fotos, fuente
    services.ts        Servicios, qué incluye, preguntas
    voice.ts           Opiniones (extractos literales), FAQ, fases de obra
    images.ts          Cada foto con dimensiones, alt, fuente y punto focal
  lib/                 Mensaje de WhatsApp, validación, tracking
assets-source/         Fotos originales tal como se obtuvieron (no se publican)
public/images/         Fotos optimizadas que usa la web
scripts/               prepare-images.mjs, qa.mjs
docs/decormg/          Documentación del proyecto
```

## Editar contenido

- **Datos de contacto:** `src/content/site.ts`.
- **Añadir una obra:** copia las fotos a `assets-source/`, añádelas al mapa de `scripts/prepare-images.mjs`, ejecuta `npm run images`, registra cada foto en `src/content/images.ts` (dimensiones y `alt`) y añade la obra en `src/content/projects.ts`. Si DecorMG publicó la lista de trabajos, va en `works`; si no, describe solo lo que se ve en `visible`. La página `/proyectos/<slug>` se genera sola.
- **Servicios y preguntas:** `src/content/services.ts` y `src/content/voice.ts`.
- Regla: no se publican cifras, plazos, precios, garantías ni opiniones que no estén en una fuente verificable (ver `docs/decormg/02-content-inventory.md`).

## Variables de entorno

| Variable | Valor | Efecto |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dominio-definitivo.es` | URL canónica, sitemap, Open Graph y datos estructurados |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `true` solo en producción aprobada | Quita `noindex`, abre `robots.txt` y publica el sitemap. Sin ella la web es una demo no indexable |

No hay claves ni credenciales: el formulario no envía nada a un servidor (abre WhatsApp con el mensaje escrito).

## Publicar en Vercel

1. Sube el repositorio a GitHub (rama `feat/demo-web`).
2. En Vercel: *Add New → Project*, importa el repositorio. Framework: Next.js (detectado). Sin cambios en build/output.
3. Para la **demo**, no definas `NEXT_PUBLIC_SITE_INDEXABLE`. Define `NEXT_PUBLIC_SITE_URL` con la URL que asigne Vercel.
4. Para la **web oficial** (solo con aprobación escrita de DecorMG y dominio propio): añade el dominio, define `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_SITE_INDEXABLE=true`, completa los datos `[PENDIENTE]` de las páginas legales y vuelve a desplegar.

## Problemas conocidos

- Si en desarrollo un cambio de CSS no aparece, para el servidor y borra `.next`: la caché de Turbopack puede servir una hoja antigua con el mismo hash.
- Firefox todavía no soporta `animation-timeline`: las entradas al hacer scroll no se animan y el contenido se ve directamente.
