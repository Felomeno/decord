# 02 · Inventario de contenido

Toda la información editable de la web vive en `src/content/` (módulos TypeScript tipados). Este documento es el mapa de qué se puede decir, de dónde sale y qué está prohibido.

## 1. Identidad

| Elemento | Contenido permitido | Fuente | Estado |
|---|---|---|---|
| Nombre | DecorMG · Reformas Integrales | F1–F3 | Verificado |
| Descriptor | Reformas integrales y parciales en Madrid | F1, F3 | Verificado |
| Logo | Wordmark tipográfico provisional "DecorMG" en la demo. El logo real (casa de puntos) solo existe en 150 px; se pide archivo vectorial | F1 | Pendiente de archivo |
| Tono | Directo, de barrio, cercano, centrado en la obra; usa "nosotros" y nombra barrios y trabajos concretos | F3 | Verificado por lectura |

## 2. Contacto (NAP)

| Campo | Valor | Uso en la web | Estado |
|---|---|---|---|
| Teléfono | 665 84 28 64 → `tel:+34665842864` | Cabecera, CTA, contacto, footer | Verificado |
| WhatsApp | `https://wa.me/34665842864?text=…` | CTA principal y constructor de mensaje | Verificado (número del enlace oficial) |
| Dirección | C. de Quero, 55 · Latina · 28024 Madrid | Contacto y footer, rotulada "dirección de la ficha de Google" | Verificado como dato de ficha; atención presencial por confirmar |
| Instagram | https://www.instagram.com/decormg.reformas/ | Footer, proyectos | Verificado |
| Google Maps | URL de la ficha | Bloque de opiniones y contacto | Verificado |
| Email | — | No se muestra | No disponible |
| Horario | — | No se muestra | Por confirmar |

## 3. Servicios

Solo servicios declarados por la empresa en textos propios o demostrados en obra publicada.

| Servicio | Evidencia | Página propia |
|---|---|---|
| Reformas integrales de pisos | F1 ("reformas integrales"), opinión de Nuria C., IG Aluche | `/servicios/reformas-integrales` |
| Reformas de baño | F1, F3 (Las Águilas, Lucero), 4 baños en fotos | `/servicios/reformas-de-banos` |
| Reformas de cocina | F1, F3, cocina antes/después en Maps | `/servicios/reformas-de-cocinas` |
| Reformas de locales | F1 ("locales"), F3 (bio y destacado), foto de local con techo LED | Mencionado en `/servicios` |
| Reformas parciales: pintura, pladur, alicatados, solados, cambio de bañera por plato, poyetes, filtraciones, armarios | F1, F3 | Mencionado en `/servicios` |
| Terrazas, aire acondicionado | Destacados de IG sin detalle | Solo listado, sin promesa |

## 4. Prueba social

| Elemento | Uso | Restricción |
|---|---|---|
| 4,8 / 5 · 26 opiniones en Google | Texto con enlace a la ficha y fecha de consulta | No se marca en datos estructurados; no se llama "verificadas" |
| 3 extractos literales | Home y Nosotros, con nombre + inicial del apellido | Requieren permiso de uso |
| Fotos de equipo en obra | Home ("Quién entra en tu casa") y Nosotros | Sin nombres hasta confirmar |

## 5. Proyectos

| Slug | Título en la web | Barrio | Qué se hizo (literal de la fuente) | Imágenes | Fuente |
|---|---|---|---|---|---|
| `bano-las-aguilas` | Baño completo en Las Águilas | Las Águilas | Fontanería, electricidad, alicatados, luz LED en zona de ducha, mampara y muebles, casoneto con puerta corredera, distribución y enchufes a petición del cliente | IG antes + IG después | F3, 13-10-2026 |
| `ducha-lucero` | Plato de ducha y mampara en Lucero | Lucero | Alicatado y remates, plato de ducha, mampara | IG antes + IG después | F3, 15/16-09-2026 |
| `reforma-parcial-aluche` | Reforma parcial en Aluche | Aluche | Cambio de encimera, aseo nuevo, pintura, bañera por plato de ducha, mampara, rodapié, mosquiteras, lámparas | IG (1 portada) | F3, 11-09-2026 |
| `filtraciones-villaverde` | Filtraciones y poyetes en Villaverde | Villaverde | Saneamiento, reparación de pintura, instalación de poyetes | IG antes + IG después | F3, 21-09-2026 |
| `cocina-antes-despues` | Cocina renovada | Sin barrio publicado | No hay pie de foto: se describe solo lo visible (muebles, encimera, placa, horno, fregadero) | Maps antes + Maps después | F2 |
| `cocina-abierta` | Cocina abierta al comedor | Sin barrio publicado | Solo lo visible | Maps (alta resolución, marca de agua) + Maps en obra | F2 |
| `bano-laton-y-roble` | Baño con lavabo sobre encimera y espejo dorado | Sin barrio publicado | Solo lo visible; serie con fotos en obra | Maps alta + 3 Cronoshare en obra | F1, F2 |
| `bano-marmol-y-madera` | Baño en porcelánico efecto mármol | Sin barrio publicado | Solo lo visible | Maps alta (marca de agua) | F2 |
| `bano-gris-espejo-led` | Baño en gris con espejo LED | Sin barrio publicado | Solo lo visible; serie en obra | 3 Cronoshare (375×500) | F1 |
| `salon-papel-pintado` | Salón con pared de papel pintado | Sin barrio publicado | Solo lo visible (tira LED en falso techo, papel pintado) | 2 Maps | F2 |
| `local-techo-led` | Local con techo de luz hexagonal | Sin barrio publicado | En obra; solo lo visible | 1 Maps | F2 |

Regla: no se agrupan fotos en un mismo proyecto salvo que el espacio sea inequívocamente el mismo (mismo alicatado, mismos muebles, mismo techo). Las agrupaciones se marcan "por confirmar" en `asset-manifest`.

## 6. Copy permitido y prohibido

Permitido: barrios documentados, trabajos literales de los pies de foto, "presupuesto sin compromiso", teléfono, WhatsApp, valoración con fecha y enlace, extractos literales.

Prohibido en la demo: años de experiencia, número de obras, garantías, seguros, plazos, precios, "visita gratuita", "respuesta en 24 h", "los mejores", "lujo", cualquier dato legal inventado, nombres de clientes de Instagram (Eusebio y Sara, Pablo y Natalia, Erodita, Cristina) por privacidad.

## 7. Restricciones legales y de privacidad

- La demo se sirve con `noindex` y un aviso visible de demo no oficial.
- Aviso legal, privacidad y cookies: plantillas con huecos marcados `[PENDIENTE: …]`; no se inventan razón social ni CIF.
- Formulario: no hay backend ni email confirmado. El envío abre WhatsApp con el texto compuesto por el visitante; nada se guarda en servidor.
- Fotos con personas ajenas identificables (reflejos de una clienta en espejo/mampara) se excluyen.
