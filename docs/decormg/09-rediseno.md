# 09 · Rediseño oscuro inspirado en ClassicCarsSaar

Fecha: 15 de octubre de 2026. Rama `feat/redesign-dark` (sale de `feat/demo-web`). Sustituye la dirección *Architectural Editorial Blue* descrita en `05-design-system.md` y `06-page-specs.md`; el contenido, las fuentes y las reglas de veracidad no cambian.

## 1. Auditoría previa (resumen)

1. La portada abría con una tira horizontal de fotos **encima** del titular: el primer pantallazo no decía qué hace la empresa.
2. Fotos atenuadas (opacidad de la tira) y recortadas a alturas fijas: el trabajo real no lucía.
3. Grandes campos azul acero vacíos (banda de contacto, cabeceras interiores sin foto a la derecha).
4. Titulares en Newsreader (serif editorial): lenguaje de revista de arquitectura, no de empresa de reformas que vende.
5. Las obras vivían en una "hoja de contactos" de miniaturas de 168 px: difícil leer el resultado de cada obra.
6. Servicios como lomos de libro sin foto: no respondían a "¿hacéis mi tipo de reforma?".
7. Opiniones en formato carta, poco escaneables.
8. Barra fija inferior en móvil que competía con el contenido.
9. Cabecera sin CTA de presupuesto propio (iba directo a WhatsApp) ni navegación con estado claro.
10. Indicador de desarrollo de Next.js: mostraba incidencias solo por estados intermedios de recarga en caliente; con build limpio no hay errores de consola ni de hidratación (comprobado en el log del servidor y en `scripts/qa.mjs`). No se oculta.
11. Ruta interna `/preview/hero` con las tres cabeceras antiguas: obsoleta con el rediseño, eliminada (sigue en el historial de git).

Referencia estudiada visualmente (capturas reales a 1440×900 y 390×844 con Edge): fondo negro, titulares geométricos anchos (Bruno Ace), navegación en cápsulas con borde, CTA rojo en cápsula, tarjetas fotográficas grandes con etiqueta y degradado solo bajo el texto, bloque "Warum…?" en mosaico 1 grande + 2, servicios 2 + 3, tabla comparativa, opiniones en tarjetas, CTA final sobre foto, pie a cuatro columnas y botones flotantes de llamada y WhatsApp. No se ha copiado código, textos, imágenes ni ventajas competitivas.

## 2. Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#080F1B` | Fondo principal |
| `--bg-2` | `#0C1828` | Secciones alternas |
| `--surface` | `#12233A` | Tarjetas sobre oscuro |
| `--navy` | `#102A43` | Reservado (marca) |
| `--blue` | `#1769B0` | CTA primario, etiquetas, barras de acento (blanco encima 5,7:1) |
| `--blue-light` | `#4F97D1` | Texto de acento pequeño sobre oscuro (6,1:1), foco |
| `--pale` | `#EAF2F8` | Secciones claras ("Qué esperar", otros trabajos) |
| `--offwhite` | `#F5F8FC` | Texto claro |
| `--text-muted` | `#AEBFD0` | Texto secundario sobre oscuro (≥8:1) |
| `--whatsapp` | `#157A42` | Botón de WhatsApp; el verde de marca `#1F9E57` daba 3,45:1 con texto blanco y se oscureció |

Sin rojo, sin degradados decorativos, sin neón ni *glassmorphism*. Los únicos degradados son velos localizados bajo el texto de las fotos para garantizar lectura.

**Tipografía:** Bruno Ace (display, titulares, navegación, cifras) + Inter (lectura, botones, formularios), servidas por `next/font`. Escala con `clamp()`: hero 30→52 px, H1 28→52 px, H2 24→42 px. Bruno Ace es muy ancha: el H1 de portada ocupa 2 líneas en escritorio grande y 3 en móvil y tableta; `scripts/qa.mjs` admite 3 líneas en H1 y 2 en H2.

**Componentes:** botón cápsula (primario azul, fantasma con borde, WhatsApp verde), etiqueta cápsula, `SectionHead` (rótulo + titular + barra de acento), tarjeta fotográfica `pcard`, tarjeta de obra `ProjectCard` (foto, barrio, resumen y qué fases tienen foto: antes / obra / después), visor de antes/después con pestañas, pasos numerados, tarjetas de opinión, FAQ con `<details>`, CTA final sobre foto, pie a cuatro columnas y botones flotantes (llamada solo en móvil, WhatsApp siempre).

**Movimiento:** entradas al hacer scroll con CSS `animation-timeline: view()` (sin JS; sin soporte, el contenido se ve directamente), entrada del texto del hero al cargar (el H1 no se anima para no retrasar el LCP), ligero asentamiento de la foto del hero, zoom suave de fotos al pasar el ratón, pulsación `scale(0.97)` en botones. Solo `transform` y `opacity`; todo se desactiva con `prefers-reduced-motion`. No se añadió GSAP: no aportaba nada que CSS no resolviera.

## 3. Portada

| Bloque | Contenido | Fuente de la verdad |
|---|---|---|
| Cabecera | Marca, Obras, Servicios, Nosotros, Contacto, teléfono, "Pedir presupuesto" → `/contacto` | `site.ts` |
| Hero | Foto de la cocina abierta (obra real, ficha de Google) a la derecha en escritorio y a pantalla completa en móvil; "Reformas que transforman espacios"; CTA presupuesto y trabajos; 4,8/26 en Google | `images.ts`, `site.ts` |
| Confianza | 4,8 de 5 (enlace a Google), base en Latina, 11 obras con fotos, presupuesto sin compromiso | `site.ts`, `projects.ts` |
| ¿Por qué DecorMG? | Obra grande y pequeña; cada obra con su antes; ideas, detalle y casa limpia (de las opiniones) | publicaciones y opiniones |
| Servicios | Baño, cocina, trabajos sueltos, reformas integrales; tarjetas con foto y enlace | `services.ts` |
| Nuestros trabajos | 6 obras en tarjetas con barrio, resumen y fases con foto | `projects.ts` |
| Antes y después | Pestañas con 4 parejas reales del mismo espacio, lado a lado (los encuadres no coinciden: no hay deslizador) | `projects.ts` |
| Qué esperar | 4 pasos sobre fondo claro, solo con lo que DecorMG dice o las opiniones confirman | `voice.ts → steps` |
| Opiniones | 3 extractos literales de Google con autor e inicial y enlace a todas | `voice.ts` |
| Preguntas | 7 preguntas en `<details>` | `voice.ts` |
| CTA final | "¿Tienes una reforma en mente?" sobre la foto del local con techo LED; presupuesto, WhatsApp y teléfono | — |

No se incluyó tabla comparativa contra competidores: no hay datos reales que la sostengan.

## 4. Páginas interiores

Todas comparten la cabecera `PageHead` (migas, rótulo, H1 con barra, entradilla, CTA y foto real a la derecha) y terminan en el mismo CTA final. Obras: tarjetas por tipo. Obra: antes/después, ficha, lista de trabajos y galería con etiqueta de fase. Servicios: bloques foto + texto + lista + obras relacionadas. Servicio: tarjetas numeradas de "qué incluye", obras, cómo pedir presupuesto, preguntas. Nosotros: ficha, texto, fotos del equipo, fases de obra y opiniones. Contacto: formulario en panel oscuro y pasos de "qué pasa después" (la foto de cabecera se oculta en móvil para que el formulario aparezca antes). Legales y 404 con el mismo sistema.

## 5. Verificación

Servidor de producción local (`next build && next start`), Microsoft Edge headless.

- `npm run typecheck`, `npm run lint`, `npm run build`: sin errores (29 páginas estáticas).
- `node scripts/qa.mjs http://localhost:3200`: 15 rutas × 360/390/768/1024/1440, **0 fallos** (desbordes, `alt`, nombres accesibles, un H1, etiquetas de formulario, objetivos ≥44 px, líneas de titular, `noindex`, consola; menú con Escape y foco; formulario con errores y apertura de WhatsApp con el mensaje).
- Revisión visual de capturas a 1440 y 390 de portada, obras, obra, servicio y contacto.
- Lighthouse 12:

| Ruta | Rendimiento móvil | Escritorio | Accesibilidad | Buenas prácticas | SEO demo |
|---|---|---|---|---|---|
| `/` | 95 (LCP 3,0 s) | 100 | 100 | 100 | 69* |
| `/proyectos/bano-las-aguilas` | 95 (LCP 2,8 s) | 100 | 100 | 100 | 69* |
| `/contacto` | 96 (LCP 2,7 s) | 100 | 100 | 100 | 69* |

\* Solo por `noindex` intencionado de la demo. La primera medición dio 97 en accesibilidad (verde de WhatsApp a 3,45:1, nombre accesible de la marca distinto del texto visible y la tira de confianza medida a mitad de su animación); corregido y medido de nuevo: 100.

## 6. Pendiente

- Lo mismo que en `08-handoff.md`: autorización de fotos, logo vectorial, datos legales, fotos originales en alta (las de Instagram y Cronoshare son de 480–640 px y se ven algo blandas en tarjetas grandes), canal de formularios.
- Probar en iPhone y Android reales y en Safari.
- Confirmar con DecorMG los textos propios: razones de "¿Por qué DecorMG?", los cuatro pasos de "Qué esperar" y las entradillas de servicios.
