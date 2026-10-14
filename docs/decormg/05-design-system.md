# 05 · Sistema de diseño — Architectural Editorial Blue

Implementado en `src/app/globals.css` (tokens CSS + `@theme` de Tailwind 4). Todo componente usa tokens; no hay colores sueltos.

## 1. Dirección y concepto

- **Dirección (taste-skill, seed 102082577):** *The contact sheet* — la obra se muestra como una hoja de contactos de fotógrafo: muchas fotos pequeñas en filas, cada obra como una tira de fotogramas precedida por su título. Paleta y tipografía de marca conservadas (`--keep palette,type`).
- **Idea:** *En esta web, la forma en que DecorMG ya documenta cada obra en Instagram — barrio, lista de trabajos y su "antes" — se convierte en la hoja de contactos.* Prueba de la competencia: otra empresa de reformas no tiene estas tiras (Las Águilas, Lucero, Villaverde, Aluche) ni este material de obra; la idea depende del archivo real de DecorMG.
- **Lo vivo:** el constructor de mensaje (tipo de reforma + zona → mensaje de WhatsApp escrito y visible antes de abrirlo). Funciona sin JS como enlace directo a WhatsApp y teléfono.
- **Por qué esta dirección:** responde "¿puedo ver trabajo parecido?" en el primer pantallazo, y convierte una limitación real (muchas fotos a 375–640 px) en el formato: fotogramas pequeños donde la baja resolución no se nota. Las 5 fotos en alta resolución se reservan para los momentos grandes.

## 2. Color

| Token | Hex | Rol | Contraste verificado |
|---|---|---|---|
| `--navy` | #102A43 | Hero, footer, barra de contacto: momentos de marca | Texto `--paper` 15.6:1 |
| `--steel` | #244D73 | Campo de la sección de contacto, profundidad | `--paper` 8.42:1 · `--on-dark-muted` 4.51:1 (solo ≥18px) |
| `--accent` | #4278A3 | Relleno de botón primario | Texto blanco 4.72:1 |
| `--accent-strong` | #356791 | Hover del botón; **texto de enlace** sobre claro | 5.73:1 sobre `--paper` |
| `--ice` | #EDF3F8 | Bloques claros (servicios, FAQ) | `--ink` 13.2:1, `--muted` 5.83:1 |
| `--paper` | #F8FAFC | Superficie principal | — |
| `--ink` | #172A3A | Texto y títulos | 14.05:1 |
| `--muted` | #4A6075 | Texto secundario | 6.23:1 |
| `--on-dark` | #F8FAFC | Texto sobre navy | — |
| `--on-dark-muted` | #A9BCCD | Secundario sobre navy | 7.50:1 |
| `--link-on-dark` | #8FB3D3 | Enlaces sobre navy | 6.66:1 |

Ajuste por accesibilidad: el azul acento #4278A3 da solo 4.51:1 sobre blanco frío y 4.22:1 sobre hielo, así que **como texto** se usa `--accent-strong` (#356791); #4278A3 queda para rellenos de botón. Proporción: blanco frío ~60 %, navy ~20 % (hero, contacto, footer), hielo ~15 %, acento solo en la acción.

## 3. Tipografía

- **Newsreader** (Google Fonts vía `next/font`, variable, eje óptico): H1, H2, carta de cliente, wordmark. Peso 400–500, sin itálica decorativa.
- **Manrope** (variable): navegación, texto, fichas, formularios, botones. 400/500/600/700.

Cinco pasos (no hay sexto):

| Paso | Valor | Uso |
|---|---|---|
| `--step-display` | clamp(2.5rem, 1.1rem + 5.4vw, 6.5rem) | H1 de home (40→104px) |
| `--step-h2` | clamp(1.75rem, 1.25rem + 1.9vw, 2.875rem) | H2 de sección, H1 interiores (28→46px) |
| `--step-lead` | clamp(1.25rem, 1.08rem + 0.6vw, 1.625rem) | Entradillas, primera frase de la carta (20→26px) |
| `--step-body` | 1.0625rem | Texto (17px), leading 1.55 |
| `--step-small` | 0.875rem | Pies, metadatos (14px), nunca < 13px |

Display: tracking −0.025em, leading 0.98. H2: −0.015em, leading 1.08. Medida de lectura 60–68ch. Titulares: máximo dos líneas en todo ancho.

## 4. Grid y espacio

- 12 columnas en ≥1024px, 6 en tablet, 4 en móvil. Márgenes `--margin: clamp(16px, 4vw, 56px)`; gutter `--gutter: clamp(12px, 1.6vw, 24px)`; contenedor máx. 1440px (las tiras de fotos van a sangre).
- Escala de espacio (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
- Entre secciones: `--section: clamp(80px, 10vw, 160px)`. Dentro de una sección nunca más de 64px.
- Texto alineado a la izquierda siempre; tres bordes izquierdos en toda la página (margen, columna 4 y columna 5).

## 5. Componentes

| Componente | Regla |
|---|---|
| Botón primario | Relleno `--accent`, texto blanco 600, alto 48px, esquinas 2px, sin sombra, sin icono de flecha |
| Botón secundario | Fondo transparente, borde sólido 2px en currentColor (no línea fina), mismo alto |
| Enlace | `--accent-strong`, subrayado aparece en hover (puntero fino), siempre subrayado en texto corrido |
| Imágenes | Esquinas rectas, sin marco ni sombra; `object-position` por foto (punto focal en `src/content/images.ts`) |
| Pies de foto | 14px `--muted`: nombre a la izquierda, dato a la derecha |
| Formularios | Celdas rellenas un tono por encima del fondo, label visible encima, error en texto bajo el campo con `aria-describedby`; foco cambia el relleno y añade contorno 3px |
| Navegación | Wordmark + 4 enlaces + teléfono + botón. Móvil: menú a pantalla completa (Escape cierra, foco atrapado y devuelto) |
| Barra móvil | Fija abajo en <768px: Llamar · WhatsApp, 56px, fondo navy |
| Iconografía | Ninguna decorativa. Solo glifos funcionales SVG (teléfono, WhatsApp, menú, cerrar) a 20px, trazo 1.75 |
| Tarjetas | No se usan. Las obras se muestran como tiras de fotogramas, los servicios como lomos de libro |

Prohibidos (brief + house rules): píldoras, eyebrows, mayúsculas espaciadas, monoespaciada, 01/02/03, líneas finas, degradados, sombras en reposo, glass, emojis, palabras destacadas en titulares, contadores ficticios.

## 6. Movimiento

Tokens: `--ease-out: cubic-bezier(0.22,1,0.36,1)`, `--ease-in-out: cubic-bezier(0.76,0,0.24,1)`, `--t-press: 140ms`, `--t-hover: 180ms`, `--t-ui: 240ms`, `--t-reveal: 760ms`.

| Movimiento | Dónde | Por qué |
|---|---|---|
| Fila arrastrable (firma) | Tira del hero y "Cómo avanza una obra" | Scroll horizontal nativo con snap; el fotograma central se ilumina |
| Entrada por sección | Título → texto → imagen, 70ms de escalonado, 20px + opacidad, una vez | Orden de lectura |
| Máscara de imagen | Pareja antes/después destacada | Revela el "después" |
| Marquesina lenta | Tira de fotos de la sección de contacto | Imagen en movimiento; se para en hover y con movimiento reducido |
| Feedback | Botones (scale 0.97 al pulsar), enlaces (subrayado), lomos (tinta plena) | Respuesta inmediata |

Sin GSAP: todo es CSS + un `IntersectionObserver` de 20 líneas. El contenido nunca queda oculto sin JS (estado oculto solo bajo `html.js`) y `prefers-reduced-motion` elimina desplazamientos y marquesina.

## 7. Responsive

Puntos de control auditados: 360, 390, 768, 1024, 1440. Móvil: el hero tiene la tira a 46vh y el titular debajo; las tiras de obra pasan a scroll horizontal por obra; los lomos de servicios se convierten en párrafo de enlaces; la FAQ va a una columna; el footer en dos columnas de bloques.

## 8. Uso de skills

| Skill | Uso real |
|---|---|
| design-taste-frontend | Reparto de dirección, blueprints de sección, reglas de la casa, `lint.mjs` e `inspect.mjs` |
| frontend-design | Plan de tokens antes de construir, revisión contra defaults genéricos |
| high-end-visual-design | Solo guardas de rendimiento (transform/opacity, blur solo en fijos). **Rechazado** su kit de píldoras, eyebrows, glass y doble bisel: contradice el brief |
| emil-design-eng / review-animations | Duraciones, easing, interrupción y revisión final del movimiento |
| web-design-guidelines, accessibility, seo, web-quality-audit, webapp-testing | QA (ver 07-qa-report) |
