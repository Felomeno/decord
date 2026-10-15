# 08 · Traspaso

> Actualización 15 de octubre de 2026: rediseño visual oscuro en la rama `feat/redesign-dark`; ver `09-rediseno.md`. Datos, fuentes y bloqueos de este documento siguen vigentes.

Estado a 15 de octubre de 2026: **demo completa y funcional en local**, lista para revisión comercial con DecorMG. No está desplegada ni publicada. Rama `feat/demo-web` con commits por hito; no se ha hecho push.

## 1. Qué se hizo

- **Investigación** de Cronoshare, Google Maps e Instagram (sin iniciar sesión en ninguna cuenta), con trazabilidad de cada dato (`01`–`03`).
- **Dirección visual** *Architectural Editorial Blue* con la paleta y tipografías fijadas, sobre la composición *contact sheet* del taste-skill: cada obra se presenta como una tira de fotogramas (antes → en obra → después), igual que DecorMG documenta sus obras en Instagram.
- **Tres heros** prototipados en `/preview/hero`; elegido A (tira iluminada) por mostrar obra real en el primer pantallazo, aprovechar fotos de baja resolución y mantener el CTA visible en móvil.
- **Web** con Next.js 16.4 App Router + TypeScript + Tailwind 4: inicio, 11 obras, 3 servicios, nosotros, contacto y legales; contenido desacoplado en `src/content/`.
- **Conversión real:** WhatsApp (número verificado en el enlace oficial de la empresa) y teléfono en cabecera, barra fija móvil, pie y cada página. El constructor de mensaje compone la solicitud y abre WhatsApp; nunca simula un envío.
- **SEO local** honesto: metadatos por ruta, canónicas, breadcrumbs, `HomeAndConstructionBusiness` solo con campos verificados y **sin valoración en datos estructurados**; demo con `noindex` y `robots.txt` cerrado.
- **QA** en navegador real a 5 anchos, Lighthouse y revisión visual (`07-qa-report.md`).

## 2. Fuentes usadas

| Fuente | Uso |
|---|---|
| Perfil de Cronoshare | Texto propio de servicios, 6 fotos de obra (baja resolución) |
| Ficha de Google Maps | Nombre, dirección, teléfono, 4,8/26 opiniones, 3 opiniones literales, 9 fotos en alta |
| Instagram @decormg.reformas | Barrios, listas de trabajos, enlace WhatsApp, 8 portadas de publicaciones |

Detalle y fechas en `01-research.md`; foto a foto en `03-asset-manifest.md`.

## 3. Decisiones clave

| Decisión | Motivo |
|---|---|
| Sin fotografía de stock | Había suficiente material propio; el brief prohíbe atribuir fotos ajenas |
| Antes/después lado a lado, sin deslizador | Los encuadres no coinciden; un deslizador sugeriría una alineación que no existe |
| No hay página de locales ni páginas por barrio | Contenido insuficiente o páginas artificiales de SEO |
| No se usan "7 años", el nombre del dueño ni el horario | Solo autodeclarado o de terceros; pendientes de confirmar |
| Sin GSAP | CSS (scroll-driven) y un componente cliente bastan; menos JS, mejor INP |
| Sin backend ni email | No hay credenciales; WhatsApp es el canal real de la empresa |
| Rechazado parte del skill `high-end-visual-design` | Píldoras, eyebrows y glass contradicen el brief |
| Nombres de clientes de Instagram fuera | Privacidad; las opiniones de Google se citan con nombre e inicial |
| Dos fotos excluidas | Aparece una persona identificable reflejada |

## 4. Bloqueos reales

| Bloqueo | Impacto | Alternativa actual |
|---|---|---|
| **Autorización de fotos, logo y opiniones** | No se puede publicar como web oficial | Demo `noindex`, aviso visible, manifiesto con estado de cada foto |
| **Datos legales** (razón social, CIF, domicilio fiscal, email) | Aviso legal y privacidad incompletos | Plantillas con `[PENDIENTE]` resaltado |
| **Fotos originales en alta resolución** (Instagram 640 px, Cronoshare 500 px) | Varias obras se ven pequeñas; algunas páginas de obra sin foto dominante | Se muestran a tamaño natural, sin ampliar |
| **Carruseles y reels de Instagram** | Requieren iniciar sesión; no se descargó vídeo | Solo portadas públicas; sin vídeo en la web |
| **18 de 28 fotos y 23 de 26 opiniones de Google** | La vista sin sesión es limitada | Se usan las accesibles |
| **Logo vectorial** | Wordmark tipográfico provisional | Pedir archivo SVG/PDF |
| **Email o CRM** para recibir solicitudes | El formulario no puede enviar a servidor | WhatsApp + "copiar mensaje"; `validateBrief` listo para una Server Action |
| **Confirmar**: dirección con atención al público, horario, nombre del responsable, "7 años en Madrid", autoría de fotos de Maps sin marca de agua | Datos que darían más confianza | No se publican |
| **Dominio y despliegue** | No hay URL pública | README explica Vercel |

## 5. Revisión necesaria antes de publicar

1. Autorización escrita de DecorMG (fotos, logo, uso de opiniones).
2. Completar todos los `[PENDIENTE]` legales con su asesor.
3. Sustituir fotos por originales en alta y añadir obras nuevas (`README → Editar contenido`).
4. Decidir canal de formularios (email/CRM) si quieren algo más que WhatsApp; si se añade analítica con cookies, añadir consentimiento.
5. Desplegar con `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_SITE_INDEXABLE=true` solo en el dominio aprobado.
6. Repetir Lighthouse y `scripts/qa.mjs` contra el despliegue, y probar en iPhone/Android reales.

## 6. Contenido de muestra que debe confirmarse

No hay texto inventado presentado como hecho, pero sí redacción propia que DecorMG debe validar: la entradilla de cada servicio, las respuestas de la FAQ, los textos de las fases de obra y los títulos de las obras sin descripción publicada (por ejemplo, "Baño con espejo dorado y mueble de roble").

## 7. Resultado de verificaciones

`npm run typecheck`, `npm run lint` y `npm run build` sin errores; `scripts/qa.mjs` 0 fallos en 75 cargas; Lighthouse ≥87 móvil y 100 escritorio en rendimiento, 97–100 accesibilidad, 100 buenas prácticas, SEO 100 en modo indexable. Detalle en `07-qa-report.md`.
