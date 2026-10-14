# 07 · Informe de QA

Fecha: 14 de octubre de 2026. Entorno: Windows 11, Node 24.19, Next.js 16.4.1 (Turbopack, Cache Components), Microsoft Edge (Chromium) headless vía `playwright-core` y Lighthouse 12. Servidor de producción local (`next build && next start`).

## 1. Verificaciones estáticas

| Comprobación | Comando | Resultado |
|---|---|---|
| TypeScript | `npm run typecheck` | Sin errores |
| ESLint (config Next core-web-vitals + TS) | `npm run lint` | Sin errores ni avisos |
| Build de producción | `npm run build` | OK, 30 páginas estáticas (11 proyectos y 3 servicios prerenderizados) |
| Lint de antipatrones (taste-skill) | `lint.mjs src` | 0 FAIL, 0 WARN |

No hay tests unitarios: la lógica es mínima (componer mensaje y validar). Las pruebas funcionales están en `scripts/qa.mjs`.

## 2. QA en navegador real (`node scripts/qa.mjs http://localhost:3200`)

15 rutas × 5 anchos (360, 390, 768, 1024, 1440) = 75 cargas, con `prefers-reduced-motion: reduce` y todas las imágenes diferidas cargadas. Capturas completas en `qa-output/` (no versionadas).

Comprobaciones automáticas por carga: código HTTP (404 en ruta inexistente), desbordamiento horizontal fuera de las filas deslizables, `img` sin `alt`, imágenes rotas, enlaces/botones sin nombre accesible, un único `h1`, campos sin `label`, controles por debajo de 44 px, titulares de más de dos líneas, `noindex` presente, errores de consola.

Interacción a 390 px: el menú abre, `Escape` lo cierra y el foco vuelve al botón; el formulario vacío muestra errores asociados y lleva el foco al primer campo inválido; con datos válidos abre `api.whatsapp.com/send?phone=34665842864&text=…` con el mensaje compuesto; el estado nunca dice "enviado".

**Resultado final: 0 fallos.**

## 3. Inspección visual (taste-skill `inspect.mjs` + revisión de capturas)

| Página | Resultado del medidor | Avisos defendidos |
|---|---|---|
| `/` | 0 FAIL | Sin vídeo (los reels de Instagram no son descargables sin sesión ni derechos); filas que se deslizan a propósito (tira del hero, antes/después, proceso) |
| `/proyectos`, `/servicios/*`, `/nosotros` | 0 FAIL salvo `covered-text` a 360–390 px | La barra fija de contacto y la cabecera fija tapan titulares *mientras se desplaza*; es el comportamiento esperado de barras fijas pedidas en el brief |
| `/proyectos/[slug]` con fotos de baja resolución | `focal-point` | Las fotos de Instagram (480×640) y Cronoshare (375×500) se muestran a su tamaño natural en lugar de ampliarlas y pixelarlas |
| `/contacto`, legales | `few-pictures`, `still-page` | Páginas de tarea; se priorizan formulario y lectura |

Revisé a mano capturas de home (360/390/1440), obras, proyecto, servicio, nosotros y contacto: jerarquía, recortes, CTA visible en el primer pantallazo móvil, sin texto cortado ni desbordes.

Problemas encontrados y corregidos durante la QA:

1. *Hydration mismatch* por un script previo a la hidratación que tocaba atributos de React → revelados pasados a CSS `animation-timeline: view()` y tira del hero como componente cliente.
2. Etiquetas de la tira leídas como *eyebrow* sobre el H1 → titular movido encima de la tira.
3. Pie fijo de la hoja de obras tapaba el título → resumen bajo cada obra.
4. 11 tamaños de letra → 6 (14 / 17 / 26 / 28–46 / 95).
5. Contraste 3,6:1 en etiquetas del formulario sobre azul acero → #D5E1EC (>4,5:1).
6. Titulares interiores sin foco visual → cabeceras con foto real; fotos de baja resolución a tamaño natural.
7. Lista de pasos sin numeración (preflight de Tailwind) → `list-style: decimal`.
8. Aviso de Next 16 "URL data outside of Suspense" → `Suspense` en rutas dinámicas.
9. Caché de Turbopack sirviendo CSS antiguo con el mismo hash → solución: borrar `.next` (documentado en README).
10. Mensaje de WhatsApp con mayúscula incorrecta tras el nombre → corregido.

## 4. Lighthouse (producción local, modo demo `noindex`)

Simulación móvil (Moto G Power, 4G lenta) y escritorio. Los valores de rendimiento varían ±8 puntos entre ejecuciones; se muestran los de la última ejecución.

| Ruta | Perf. móvil | Perf. escritorio | Accesibilidad | Buenas prácticas | SEO demo | LCP móvil | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 87–95 | 100 | 100 | 100 | 69* | 3,0–4,1 s | 0 |
| `/proyectos` | 96 | 100 | 100 | 100 | 69* | 2,9 s | 0 |
| `/proyectos/bano-las-aguilas` | 94 | 100 | 100 | 100 | 69* | 3,1 s | 0 |
| `/servicios/reformas-de-banos` | 90 | 100 | 97** / 100 | 100 | 69* | 3,7 s | 0 |
| `/nosotros` | 89 | 100 | 100 | 100 | 69* | 3,8 s | 0 |
| `/contacto` | 94 | 100 | 100 | 100 | 69* | 3,0 s | 0 |

\* SEO 69 solo por `is-crawlable`: la demo lleva `noindex` y `robots.txt` con `Disallow: /` a propósito. Con `NEXT_PUBLIC_SITE_INDEXABLE=true` el mismo build da **SEO 100** en `/`, `/servicios/reformas-de-banos` y `/proyectos/bano-las-aguilas` (medido).

\*\* En escritorio Lighthouse midió el contraste de un bloque a mitad de su animación de entrada (opacidad parcial). El color final es `--ink` sobre `--paper` (14:1).

Objetivos del brief: ≥90 escritorio ✔, ≥80 móvil ✔, ≥95 accesibilidad ✔, ≥95 SEO ✔ en modo indexable (69 en demo por diseño).

El LCP móvil lo marca el titular en Newsreader (cambio de fuente) o la primera foto. Mejora posible: subconjunto de la fuente display o `font-display: optional` para el H1.

## 5. Accesibilidad y movimiento

- Navegación por teclado: enlace "Saltar al contenido", foco visible de 3 px, filas deslizables enfocables (`role="region"` con nombre), botones de la fila de proceso con nombre, menú `<dialog>` nativo.
- `prefers-reduced-motion`: sin revelados, sin marquesina, sin desplazamientos; todo el contenido visible (comprobado en las 75 capturas).
- Movimiento revisado con los criterios de `review-animations`: solo `transform`/`opacity` (se cambió el atenuado de la tira de `filter` a `opacity`), hovers ≤ 280 ms y limitados a `(hover: hover) and (pointer: fine)`, pulsación a 140 ms con `scale(0.97)`, sin `transition: all`, sin `ease-in`.
- Formularios: `label` visibles, errores con `aria-describedby` y `aria-invalid`, estado en `role="status"`.

## 6. Pendiente o no verificado

- No se probó en dispositivos físicos iOS/Android, solo emulación Chromium; tampoco en Safari ni Firefox (Firefox no soporta aún `animation-timeline`: verá el contenido sin revelados, que es el comportamiento previsto).
- No se probó el envío real de un mensaje de WhatsApp (solo que se abre la URL correcta).
- Lighthouse en local; repetir en el despliegue de Vercel.
