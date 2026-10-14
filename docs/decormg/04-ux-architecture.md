# 04 · UX, conversión y arquitectura

## 1. Personas (basadas en las opiniones y publicaciones reales)

| Persona | Situación | Lo que necesita ver | Canal probable |
|---|---|---|---|
| Propietaria de piso antiguo en el suroeste de Madrid | Azulejo y baño de los 80, presupuesto ajustado (opinión de Juan D.) | Obras parecidas en su barrio, que dejan limpio, trato cercano | Instagram o recomendación → WhatsApp |
| Familia que reforma el piso de los padres | Reforma integral y luego una parcial (opinión de Nuria C.) | Que hacen integral y parcial, ideas de decoración | Google → teléfono |
| Persona con una avería concreta | Plato de ducha, filtraciones, poyete | Que aceptan trabajos pequeños, lista de trabajos | Google Maps en el móvil → llamada |
| Dueño de local | Reforma o instalación de iluminación | Que trabajan locales | Instagram → WhatsApp |

## 2. Recorridos críticos y cómo se resuelven

1. **Google → compruebo trabajo → veo opiniones → pido presupuesto.** Home: hero con tira de obras reales → "Lo esencial" con 4,8 en Google enlazado → hoja de obras → carta de un cliente → formulario-WhatsApp.
2. **Instagram → abro un proyecto → contacto.** `/proyectos/[slug]` con barrio y trabajos literales, enlace a la publicación original y CTA WhatsApp con mensaje que cita el proyecto ("Hola, he visto el baño de Las Águilas…").
3. **Busco reforma de baño/cocina → leo → veo casos → pido.** `/servicios/reformas-de-banos` con qué incluye (sacado de obras reales), casos de baño enlazados y CTA con el tipo preseleccionado.
4. **Móvil con prisa.** Barra fija inferior en móvil con "Llamar" y "WhatsApp"; zona y teléfono en el primer bloque tras el hero; menú con teléfono visible.

## 3. Mapa del sitio

```
/                                 Inicio
/proyectos                        Hoja de obras completa, agrupada por tipo
/proyectos/[slug]                 11 casos
/servicios                        Índice de servicios + trabajos parciales
/servicios/reformas-integrales
/servicios/reformas-de-banos
/servicios/reformas-de-cocinas
/nosotros                         Empresa, zona, forma de trabajar, opiniones
/contacto                         Constructor de mensaje (WhatsApp) + teléfono + dirección
/aviso-legal  /privacidad  /cookies   Plantillas con huecos [PENDIENTE]
/preview/hero                     Interna: 3 variantes de hero (noindex, fuera del sitemap)
```

Decisión: **no** se crea página de locales (una sola foto en obra, sin texto propio suficiente) ni páginas por barrio (serían páginas artificiales de SEO local). Locales y trabajos parciales se cubren en `/servicios`.

## 4. Por ruta: tarea, información, confianza, CTA, jerarquía, eventos

| Ruta | Tarea del usuario | Info necesaria | Prueba | CTA | H1 / H2 | Enlaces | Eventos | Estado vacío |
|---|---|---|---|---|---|---|---|---|
| `/` | Saber qué hacen, ver obra, contactar | Servicios, zona, contacto | Fotos reales, 4,8 Google, carta | WhatsApp, Llamar, Ver obras | H1 "Baños, cocinas y pisos en Madrid"; H2 por sección | Proyectos, servicios, contacto | `cta_whatsapp`, `cta_phone`, `nav_projects`, `builder_open_whatsapp` | — |
| `/proyectos` | Encontrar una obra parecida | Tipo, barrio, trabajos | Fotos y fuente de cada obra | Ver obra, WhatsApp | H1 "Obras"; H2 por tipo | Cada proyecto | `project_open` | Si un grupo queda sin obras no se pinta |
| `/proyectos/[slug]` | Comprobar el detalle | Qué se hizo, barrio, fotos | Antes/después, enlace a la publicación | WhatsApp con el proyecto citado | H1 título; H2 "Qué se hizo", "Fotos" | Anterior/siguiente, servicio relacionado | `cta_whatsapp` con `project` | Proyectos sin barrio/trabajos: se indica "Sin descripción publicada" |
| `/servicios` | Ver si hacen lo suyo | Lista de servicios y trabajos sueltos | Obras por servicio | Pedir presupuesto | H1 "Servicios" | 3 servicios | `service_open` | — |
| `/servicios/*` | Decidir | Qué incluye, cómo se trabaja, casos | Obras del tipo | WhatsApp con tipo | H1 servicio; H2 "Qué incluye", "Obras", "Preguntas" | Proyectos del tipo | `cta_whatsapp` con `service` | — |
| `/nosotros` | Confiar | Quiénes, dónde, cómo | Fotos de equipo en obra, opiniones | Contactar | H1 "Nosotros" | Proyectos, contacto | — | Nombres del equipo pendientes |
| `/contacto` | Escribir sin fricción | Qué pasa después | NAP | Abrir WhatsApp / Llamar / Copiar mensaje | H1 "Pide presupuesto" | Privacidad | `builder_open_whatsapp`, `builder_copy`, `cta_phone` | Validación con mensajes asociados |

## 5. Conversión: decisiones

- **Canal principal: WhatsApp** (enlace oficial de la empresa). Teléfono secundario. No hay email ni backend → el "formulario" construye el mensaje y abre WhatsApp; **no** se finge un envío al servidor. También permite copiar el mensaje.
- El formulario pide lo mínimo: tipo de reforma, zona (barrio o CP aproximado), descripción breve; nombre y forma de contacto preferida en `/contacto`. Nunca dirección completa ni fotos.
- Qué pasa después (texto honesto): "Se abre WhatsApp con tu mensaje escrito. Lo envías tú; DecorMG te responde por ese mismo chat." No se promete plazo de respuesta, visita ni precio.
- **Medición:** `src/lib/track.ts` empuja eventos a `window.dataLayer` si existe. Sin scripts de terceros ni cookies; activar analítica requiere decisión y, si usa cookies, banner de consentimiento.

## 6. Priorización

1. Home, contacto y constructor de mensaje.
2. Proyectos (índice + detalle).
3. Servicios de baño y cocina (intención alta), luego integrales.
4. Nosotros, legales.
