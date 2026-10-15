# Auditoría de veracidad · web de DecorMG Reformas Integrales

Fecha de comprobación de todas las fuentes: **15 de octubre de 2026** (rama `feat/redesign-dark`).
Estado de la web: propuesta para DecorMG, pendiente de su aprobación. No es la web oficial.

## 1. Método

- Se han recorrido todas las páginas y componentes:
  - páginas de inicio, obras, cada ficha de obra, servicios y cada servicio;
  - nosotros, contacto, aviso legal, privacidad, cookies y 404;
  - cabecera, pie y botones flotantes;
  - metadatos (`title`, `description`, Open Graph) y JSON-LD;
  - textos alternativos de las fotos.
- Cada dato se ha contrastado con las fuentes originales, abiertas de nuevo el 15-10-2026, sin iniciar sesión y rechazando las cookies no esenciales:
  - **CR** · perfil de Cronoshare: <https://www.cronoshare.com/croner-5519111-decormg-reformas-integrales>
  - **IG** · perfil de Instagram: <https://www.instagram.com/decormg.reformas/>, más cada publicación citada (`/p/<código>/`).
  - **GM** · ficha de Google Maps: <https://www.google.com/maps/place/DecorMG+%7C+Reformas+Integrales+Madrid/@40.3904822,-3.76063,17z>, incluido el visor de fotos, que indica quién subió cada foto.
  - **WA** · enlace de WhatsApp de la bio de Instagram: <https://wa.link/ggf3oj>
- No se ha dado por bueno ningún dato por estar ya escrito en el código o en `docs/`. Las notas previas de `docs/decormg/01-research.md` (14-10-2026) solo se usan como referencia cuando la fuente no deja ver el dato completo sin sesión, y se indica así.
- Cronoshare es una plataforma. Sus botones «Pide presupuesto gratis», su «Garantía Cronoshare» y sus listas de categorías **no** se consideran condiciones de DecorMG.

### Leyenda de estados

| Estado | Significado |
|---|---|
| VERIFICADO | Evidencia directa y trazable en un canal de la propia empresa (o en el dato agregado de Google). |
| RESPALDADO POR TERCEROS | Evidencia indirecta: lo dicen clientes, una foto subida por un cliente o un dato de plataforma. |
| NO VERIFICABLE | No hay evidencia suficiente. |
| CONTRADICTORIO | Las fuentes discrepan. |
| FALSO | Hay evidencia suficiente que lo desmiente. |

## 2. Resumen

- **No se ha encontrado ningún dato FALSO.**
- **No aparecen en la web:** años de experiencia, garantías, seguros, precios, plazos, horario, nombres de personas del equipo ni el número de seguidores.
- **Corregido (sobreafirmaciones e imprecisiones):**
  - «obras en toda la Comunidad»;
  - «11 obras» presentadas como cifra de trabajos;
  - «el presupuesto no tiene coste»;
  - «cada obra, con su antes»;
  - «es el trabajo que más publicamos»;
  - «abrimos la cocina al comedor»;
  - la bañera cambiada «como en Lucero»;
  - una reseña con las frases cambiadas de orden.
- **Hallazgo importante en fotos de Google:** 5 de las fotos usadas no las subió DecorMG, sino clientas. Una clienta subió los dos salones y el baño del espejo dorado; otra, la pareja antes/después de la cocina. Ahora se indica así en la web.
- **Hallazgo importante en Instagram:** muestra la etiqueta «Contenido generado con IA» en 6 publicaciones, de las que salen fotos de 4 obras: Las Águilas (el antes), Lucero (el después), Villaverde (antes y después) y Aluche. Sin sesión no se puede ver qué parte es IA (puede ser la música, un efecto o la imagen). Ahora se avisa en la web y queda pendiente de confirmar con la empresa.

## 3. Comprobaciones pedidas expresamente

| Dato | Estado | Evidencia | Decisión |
|---|---|---|---|
| **4,8 estrellas y 26 reseñas** | VERIFICADO (a 15-10-2026) | GM: «4,8 · 26 reseñas». Reparto: 25 de 5★ y 1 de 1★. Google añade: «Las reseñas no se verifican». | Se mantiene con fecha de consulta y ahora con el aviso de Google. Es un dato que cambia: actualizar antes de publicar. Sin marcado `aggregateRating` en el JSON-LD (correcto: no son reseñas propias). |
| **11 obras reales** | NO VERIFICABLE como cifra de trabajos | Es el número de fichas de la web, no un dato de la empresa. 4 fichas agrupan fotos sin descripción de la empresa: el agrupamiento es nuestro, y dos fichas podrían ser el mismo piso. IG indica 254 publicaciones, así que la empresa tiene más obra que la mostrada. | Retirada la cifra de la franja de confianza («Obras reales · Fotos de DecorMG y de sus clientes») y del texto de /proyectos. Los contadores por grupo de /proyectos («4 obras») solo cuentan las fichas visibles en la página. |
| **Presupuesto sin compromiso** | VERIFICADO | IG, bio: «📲 Presupuesto sin compromiso». CR no lo dice como texto propio; allí «Pide presupuesto gratis» es un botón de la plataforma. | Se mantiene. Corregida la pregunta frecuente «¿El presupuesto tiene coste? No»: «sin compromiso» no equivale a «gratis». Ahora pone «¿Pedir presupuesto me compromete a algo? No. DecorMG ofrece presupuesto sin compromiso». |
| **Área: Comunidad de Madrid** | VERIFICADO como zona declarada por la empresa | IG, bio: «📍 Comunidad de Madrid»; CR: «Madrid». Obra documentada solo en barrios de Madrid capital: Aluche, Las Águilas, Lucero y Villaverde. | Se mantiene «trabaja en la Comunidad de Madrid». Corregido «obras en toda la Comunidad», que afirmaba obra hecha por toda la región sin pruebas. |
| **Garantías** | No aparece en la web | La única «garantía» localizada es la «Garantía Cronoshare» de la plataforma (enlace a /devoluciones), no de DecorMG. | Nada que corregir. No usar sin documento de la empresa. |
| **Años de experiencia** | NO VERIFICABLE (no aparece en la web) | CR, texto escrito por la empresa: «Llevamos 7 años en Madrid». Es autodeclarado, el perfil se registró el 27-05-2026 y no hay más fuente. | No se usa. Pedir confirmación a DecorMG. |

## 4. Afirmaciones comprobables

Abreviaturas de URL: CR, IG, GM y WA, como en el apartado 1. «Fecha» es siempre 15-10-2026, salvo que se indique otra.

### 4.1 Datos de empresa (cabecera, pie, contacto, aviso legal, JSON-LD)

| Página | Afirmación exacta | Estado | Prueba | Fecha | Corrección recomendada |
|---|---|---|---|---|---|
| Todas (cabecera, pie, flotante, contacto, JSON-LD `telephone`) | «665 84 28 64» / `+34665842864` | VERIFICADO | GM («665 84 28 64»); IG, en cada publicación: «Contáctanos 665-842-864» | 15-10-2026 | — |
| Todas (botones WhatsApp) | WhatsApp `34665842864` | VERIFICADO | WA redirige a `api.whatsapp.com/send?phone=34665842864` (comprobado 14-10-2026, mismo enlace en la bio actual de IG) | 14/15-10-2026 | — |
| Pie, contacto, aviso legal, JSON-LD `address` | «C. de Quero, 55, 28024 Madrid (Latina)» | VERIFICADO como dirección de la ficha | GM: «C. de Quero, 55, Latina, 28024 Madrid» | 15-10-2026 | En contacto ya figura como «Dirección de la ficha de Google». Confirmar si es local con atención al público o domicilio fiscal. |
| JSON-LD `geo` | 40.3904822, -3.76063 | VERIFICADO | Coordenadas de la URL de la ficha GM | 15-10-2026 | — |
| JSON-LD `name`, marca | «DecorMG Reformas Integrales» | VERIFICADO | GM «DecorMG \| Reformas Integrales Madrid»; IG «DecorMG \| Reformas en Madrid»; CR «Decormg Reformas Integrales»; logotipo «DECOR MG / REFORMAS INTEGRALES» | 15-10-2026 | — |
| JSON-LD `areaServed`, pie, menú, contacto, /servicios | «Comunidad de Madrid» | VERIFICADO (declarado) | IG, bio | 15-10-2026 | — |
| Inicio (franja) | «Base en Latina, obras en toda la Comunidad» | NO VERIFICABLE (sobreafirmación) | Solo hay obra documentada en 4 barrios de Madrid | 15-10-2026 | **Corregido:** «Base en Latina, trabaja en la Comunidad de Madrid». |
| Nosotros, metadatos, servicio integral | «con base en Latina» | RESPALDADO POR TERCEROS | La dirección de la ficha GM está en Latina; la empresa no lo dice con esas palabras | 15-10-2026 | Mantener; confirmar con DecorMG. |
| Pie, footer, nosotros | «Últimas obras publicadas en: Aluche, Las Águilas, Lucero, Villaverde» | VERIFICADO | IG `/p/DdJ6p7KDfyi/` (Aluche), `/p/DecjXmOjUAF/` (Las Águilas), `/p/DdWC44mjRsT/` (Lucero), `/p/DdjA8icjZxW/` (Villaverde) | 15-10-2026 | — |
| JSON-LD `sameAs` | Instagram y Google Maps | VERIFICADO | IG, GM | 15-10-2026 | — |
| Aviso legal | Razón social, NIF, email, domicilio fiscal, registro | Marcados como pendientes (correcto) | No publicados en ninguna fuente | 15-10-2026 | Pedir a DecorMG. |
| (no usado) | Horario «Abierto 24 horas» | NO VERIFICABLE | GM lo muestra; probable valor por defecto | 15-10-2026 | No usar sin confirmar. |
| (no usado) | Responsable «Gustavo» | RESPALDADO POR TERCEROS | Una opinión de Google (notas del 14-10-2026) | 14-10-2026 | No usar sin permiso. |

### 4.2 Servicios

| Página | Afirmación exacta | Estado | Prueba | Fecha | Corrección recomendada |
|---|---|---|---|---|---|
| Inicio (hero), pie, metadatos | «Reformas integrales y parciales de baños, cocinas y pisos en Madrid» / «… y locales» | VERIFICADO | CR, texto propio: «Nos dedicamos a reformar viviendas, locales y más» y «todo tipo de reforma sea integral o parcial como ejemplo reforma de baño, reforma de cocina…»; IG: «Reformas integrales en MADRID · Baños • Cocinas • Viviendas • Locales» | 15-10-2026 | — |
| /servicios «También hacemos» | Pintura, Pladur, Alicatados, Solados | VERIFICADO | CR, texto propio de la empresa | 15-10-2026 | — |
| /servicios | «Bañera por plato de ducha», «Patios y terrazas» | VERIFICADO | CR (cambio de bañera por plato, patios); IG, destacado «Terrazas»; IG Aluche «Cambio de bañera por plato de ducha» | 15-10-2026 | — |
| /servicios | «Filtraciones y poyetes», «Armarios recibidores» | VERIFICADO | IG `/p/DdjA8icjZxW/` y `/p/Dee6_PQtQZU/` («Instalación de armario recibidor… Armario comprado por el cliente») | 15-10-2026 | — |
| /servicios | «Aire acondicionado» | RESPALDADO (solo destacado de IG) | IG, destacado «Aire acondici..» sin detalle del alcance | 15-10-2026 | Confirmar qué incluye (¿instalación?). |
| /servicios | «Reformas de locales» | VERIFICADO | CR «locales»; IG bio «Locales» | 15-10-2026 | — |
| Reformas de baño (intro) | «Es el trabajo que más publicamos.» | NO VERIFICABLE | Hay 254 publicaciones; sin sesión solo se ven las últimas | 15-10-2026 | **Retirada** la frase. |
| Reformas de baño (incluye) | «Bañera por plato de ducha: … colocamos el plato y la mampara, **como en Lucero**» | NO VERIFICABLE (imprecisa) | La publicación de Lucero dice «Instalación de plato de ducha y mampara», no que hubiera bañera; la que sí lo dice es Aluche | 15-10-2026 | **Corregido:** cita Aluche para el cambio de bañera y Lucero para plato, mampara y remates. |
| Reformas de baño | «En el baño de Las Águilas la distribución y los enchufes se hicieron como pidieron los clientes» | VERIFICADO | IG `/p/DecjXmOjUAF/`: «Distribución y enchufes pedidos por los clientes» | 15-10-2026 | — |
| Reformas de baño | Fontanería, electricidad, alicatado, LED en ducha, mampara, muebles, casoneto | VERIFICADO | IG `/p/DecjXmOjUAF/` | 15-10-2026 | — |
| Reformas de cocina (intro) | «También abrimos la cocina al comedor cuando el espacio lo permite.» | NO VERIFICABLE | La foto (subida por DecorMG) muestra una cocina abierta, pero no consta que DecorMG derribara un tabique | 15-10-2026 | **Corregido:** «También hemos hecho cocinas abiertas al comedor». FAQ: «Tenemos publicada una cocina abierta al comedor». |
| Reformas de cocina | «cambiamos solo la encimera, como en la reforma parcial de Aluche» | RESPALDADO, pero impreciso | IG Aluche: «Cambio de encimera», sin decir de qué estancia | 15-10-2026 | **Corregido:** «El cambio de encimera fue uno de los trabajos de la reforma parcial de Aluche» (sin afirmar que fuera de cocina). |
| Reformas de cocina | Gas a inducción, horno integrado, alicatado retirado | VERIFICADO (visual) | Pareja de fotos de la cocina (ver fotos) | 15-10-2026 | — |
| Reformas integrales | «Una clienta reformó su piso con nosotros y, un par de meses después, una parte del de sus padres.» | RESPALDADO POR TERCEROS | GM, opinión de Nuria Cerezo: «He realizado una reforma integral en mi piso… Un par de meses despues hicieron una pequeña reforma en el piso de mis padres» | 15-10-2026 | — |
| Reformas integrales | Suelos, rodapiés, pladur, pintura, LED en falso techo, mosquiteras, poyetes | VERIFICADO / visual | CR (pladur, pintura, solados); IG Aluche (rodapié, mosquiteros, lámparas, pintura); fotos de salón (LED) | 15-10-2026 | — |
| Servicios (FAQ) | «No publicamos precios cerrados» | VERIFICADO | Ningún canal publica precios | 15-10-2026 | — |
| /servicios | «plazos… se dan en el presupuesto» | NO VERIFICABLE | No consta | 15-10-2026 | **Corregido:** «pregúntalos al pedir presupuesto». |
| (no usado) | Categorías de Cronoshare (placas solares, construcción…) | No aplicable | Son categorías de la plataforma | 15-10-2026 | No usarlas. |

### 4.3 Reseñas y valoraciones

| Página | Afirmación exacta | Estado | Prueba | Fecha | Corrección recomendada |
|---|---|---|---|---|---|
| Inicio, nosotros (Opiniones), pie, hero, franja | «4,8 de 5 · 26 opiniones en Google» | VERIFICADO | GM | 15-10-2026 | Añadido «Google indica que las reseñas no se verifican» y fecha actualizada a 15-10-2026. |
| Opiniones | Nuria C.: «He realizado una reforma integral en mi piso con esta empresa.» + «Gente sería y muy profesional…» | VERIFICADO (literal) | GM, opinión de Nuria Cerezo, «Hace un mes» | 15-10-2026 | — («sería» es errata del original). |
| Opiniones | Cristina M.: «Acabamos de hacer una pequeña reforma…» + «Muy profesionales y serios. Han cumplido con los plazos…» | VERIFICADO (literal) | GM, opinión de Cristina Martin, «Hace 2 meses» | 15-10-2026 | — |
| Opiniones | Juan De Dios D.: «No puedo estar más contento con el resultado […]» seguido de «Conocí esta empresa…» | CONTRADICTORIO (orden alterado) | GM: el original empieza por «Conocí esta empresa…» y sigue con «…y no puedo estar más contento con el resultado» | 15-10-2026 | **Corregido:** el extracto respeta el orden original. Retiradas dos frases no publicadas en la web que hoy no se pueden revisar sin sesión. |
| Opiniones | Juan: «Era un piso con decoración y azulejos bastante antiguo…» | VERIFICADO | GM (el inicio se ve sin sesión) y notas del 14-10-2026 | 14/15-10-2026 | — |
| Inicio («Qué esperar»), por qué DecorMG | «Un cliente lo resume en Google: dejaron el piso limpio de polvo y suciedad» | RESPALDADO POR TERCEROS | Opinión de Juan De Dios (texto completo leído el 14-10-2026; hoy Google lo recorta sin sesión) | 14-10-2026 | Revisar el texto completo con sesión antes de publicar. |
| Por qué DecorMG, FAQ, nosotros | «En Google destacan las ideas de decoración, el cuidado del detalle y que el piso queda limpio» / «Varios clientes lo destacan» | RESPALDADO POR TERCEROS | GM: Nuria («ideas acertadas»), Cristina («sugiriendo mejoras»), Laura Martin («muy detallistas y cuidadosos»), Juan (limpieza) | 15-10-2026 | — |
| Todas las reseñas | Uso público de extractos con nombre e inicial | Pendiente de permiso | — | — | Pedir permiso a cada autor (ya indicado en aviso legal). |

### 4.4 Presupuesto, proceso y condiciones

| Página | Afirmación exacta | Estado | Prueba | Fecha | Corrección recomendada |
|---|---|---|---|---|---|
| Hero, franja, contacto, servicios, CTA, metadatos | «Presupuesto sin compromiso» | VERIFICADO | IG, bio | 15-10-2026 | — |
| Inicio (FAQ) | «¿El presupuesto tiene coste? No.» | NO VERIFICABLE | «Sin compromiso» ≠ «gratis»; «gratis» solo lo dice Cronoshare de su propio servicio | 15-10-2026 | **Corregido** (ver apartado 3). |
| Contacto, «Qué esperar» | «Por WhatsApp o por teléfono» | VERIFICADO | WA, GM, IG | 15-10-2026 | — |
| Contacto | «DecorMG te contesta por ese chat o te llama, según hayas elegido» | NO VERIFICABLE (proceso) | No publicado por la empresa | 15-10-2026 | Confirmar con DecorMG el proceso de respuesta. |
| «Qué esperar» | «Si quieres, mandas fotos del estado actual» | NO VERIFICABLE (proceso) | No publicado por la empresa; WhatsApp lo permite técnicamente | 15-10-2026 | Confirmar con DecorMG. |
| Nosotros («Paso a paso») | «Así publicamos cada obra: primero su antes» | NO VERIFICABLE (generalización) | Las publicaciones de Las Águilas, Lucero y Villaverde tienen su antes; las fotos de Google, no | 15-10-2026 | **Corregido:** «Así publicamos muchas obras en Instagram». |
| Inicio («Por qué DecorMG»), nosotros, metadatos | «Cada obra, con su antes» / «enseñamos cada obra con su antes» | NO VERIFICABLE (generalización) | Ídem | 15-10-2026 | **Corregido:** «Obras con su antes» / «En Instagram publicamos las obras con su antes…». |

### 4.5 Obras (/proyectos y fichas)

| Ficha | Afirmación | Estado | Prueba | Fecha | Corrección recomendada |
|---|---|---|---|---|---|
| Baño completo en Las Águilas | Barrio, octubre 2026, 7 trabajos listados | VERIFICADO | IG `/p/DecjXmOjUAF/` (13-10-2026) y `/p/DecEkdWNFyu/` | 15-10-2026 | Añadido aviso de etiqueta IA (la publicación del antes la lleva). |
| Plato de ducha y mampara en Lucero | Barrio, septiembre 2026, 3 trabajos | VERIFICADO | IG `/p/DdWC44mjRsT/` (16-09-2026) y `/p/DdTnUr8NNcL/` (15-09-2026) | 15-10-2026 | Añadido aviso de etiqueta IA (la publicación del después la lleva). |
| Reforma parcial en Aluche | Barrio, septiembre 2026, 8 trabajos | VERIFICADO | IG `/p/DdJ6p7KDfyi/` (11-09-2026). El original dice «aseo social» y «mosquiteros» | 15-10-2026 | Añadido aviso de etiqueta IA. |
| Filtraciones y poyetes en Villaverde | Barrio, septiembre 2026, 3 trabajos | VERIFICADO | IG `/p/DdjA8icjZxW/` y `/p/Ddi3oh3tPWl/` (21-09-2026) | 15-10-2026 | Añadido aviso de etiqueta IA (ambas publicaciones). |
| Cocina renovada entera | Mismo espacio antes y después | RESPALDADO POR TERCEROS | GM: las dos fotos las subió la misma clienta (jul 2026); mismo suelo hexagonal y misma ventana | 15-10-2026 | **Corregida la fuente:** «Fotos subidas por una clienta a la ficha de Google de DecorMG». |
| Cocina abierta al comedor | Foto de cocina terminada | VERIFICADO | GM: subida por la empresa (jun 2026), con marca de agua DecorMG | 15-10-2026 | — |
| Baño con espejo dorado y mueble de roble | Mismo baño en obra y terminado | RESPALDADO (fuerte) | CR: la empresa publica el mismo baño en obra (operario con toallero) y una copia de la foto final. GM: la foto final en alta la subió una clienta (ago 2026) | 15-10-2026 | **Corregida la fuente.** La foto de alicatado en curso (`bano-laton-obra-3`) se agrupa por el mismo azulejo: agrupación probable, pendiente de confirmar. |
| Baño gris con espejo LED | Mismo baño en obra y terminado | VERIFICADO | CR: las 3 fotos las publica la empresa; mismo techo, espejo y mampara | 15-10-2026 | — |
| Baño en blanco veteado y madera | Foto de baño terminado | VERIFICADO | GM: subida por la empresa (jun 2026), con marca de agua | 15-10-2026 | — |
| Salón con pared de papel pintado | Dos fotos del mismo salón | RESPALDADO POR TERCEROS | GM: subidas por una clienta (fecha de imagen oct 2025). Misma lámpara y suelo | 15-10-2026 | **Corregida la fuente.** No se afirma qué trabajos hizo DecorMG en él. |
| Local con techo de luz en panal | Foto en obra | VERIFICADO | GM: subida por la empresa (may 2026) | 15-10-2026 | — |
| /proyectos | «11 obras con fotos de DecorMG» | NO VERIFICABLE | Ver apartado 3 | 15-10-2026 | **Corregido.** |
| Metadatos de cada ficha | «Obra de DecorMG en Madrid» | VERIFICADO o RESPALDADO, según la ficha | Ver filas anteriores | 15-10-2026 | Mantener. Las fichas sin barrio no inventan ubicación («Barrio: No publicado»). |
| /proyectos (metadatos) | «Obras reales de DecorMG en Madrid: baños en Las Águilas y Lucero…» | VERIFICADO | IG | 15-10-2026 | — |
| Fichas | Ningún nombre de cliente (Eusebio y Sara, Pablo y Natalia, Erodita, Cristina y padres) | Correcto | IG los nombra; la web los omite por privacidad | 15-10-2026 | — |

### 4.6 Preguntas frecuentes (inicio)

| Pregunta | Estado | Nota |
|---|---|---|
| ¿Hacéis trabajos pequeños? | VERIFICADO | Bañera por plato (CR, IG), poyetes y filtraciones (IG), encimera y pintura (IG Aluche). |
| ¿Por qué zonas trabajáis? | VERIFICADO | Comunidad de Madrid (IG), base en Latina (GM), barrios (IG). |
| ¿El presupuesto tiene coste? | Corregida | Ahora: «¿Pedir presupuesto me compromete a algo? No. DecorMG ofrece presupuesto sin compromiso». |
| ¿Cuánto cuesta / cuánto tarda? | VERIFICADO | No se da cifra; remite al presupuesto. |
| ¿Qué tengo que contar en el primer mensaje? | No es afirmación comercial | Instrucción de uso del formulario. |
| ¿Ayudáis a elegir materiales? | RESPALDADO POR TERCEROS | Opiniones de Nuria y Cristina. |
| ¿Es esta la web oficial? | VERIFICADO | «Todavía no»: es una propuesta. |

### 4.7 Datos ocultos: SEO, JSON-LD, metadatos y alt

| Lugar | Contenido | Estado | Nota |
|---|---|---|---|
| `layout.tsx` title/description | «Reformas de baños, cocinas y pisos en Madrid · … Presupuesto sin compromiso por WhatsApp» | VERIFICADO | — |
| Open Graph `alt` | «Cocina reformada por DecorMG» (`cocina-abierta-1.jpg`) | VERIFICADO | La foto la subió la empresa, con marca de agua. |
| JSON-LD `HomeAndConstructionBusiness` | Nombre, teléfono, dirección, geo, área, `sameAs` | VERIFICADO | Sin `aggregateRating`, `openingHours`, `priceRange` ni `foundingDate`: correcto, no hay datos fiables. |
| `robots` | `noindex` mientras sea demo | Correcto | — |
| Alt `equipo-obra.jpg` | «Dos operarios de DecorMG…» | RESPALDADO | Solo uno lleva camiseta con logo. **Corregido:** «Dos operarios en una obra, uno con camiseta de DecorMG…». |
| Alt de las demás fotos | Describen lo visible | VERIFICADO (visual) | Sin ubicaciones inventadas. |
| Página de cookies | «No instala cookies… fuentes servidas desde el propio dominio» | VERIFICADO (técnico) | `next/font` autoaloja Anton y Manrope; no hay analítica. |

## 5. Auditoría de fotografías

Origen de cada foto publicada en `public/images/`. Los originales se conservan en `assets-source/`; no se ha borrado ninguno.

| Archivo web | Origen | Quién la publicó | Corresponde a DecorMG | Uso en la web | Estado |
|---|---|---|---|---|---|
| `bano-marmol-1.jpg` | GM (gm-01) | La empresa (jun 2026), marca de agua | Sí | Hero, servicios, obra | VERIFICADO |
| `cocina-abierta-1.jpg` | GM (gm-03) | La empresa (jun 2026), marca de agua | Sí | Hero (móvil), OG, JSON-LD, obra | VERIFICADO |
| `local-led-1.jpg` | GM (gm-08) | La empresa (may 2026) | Sí (en obra) | CTA final, equipo, obra | VERIFICADO |
| `cocina-obra.jpg` | GM (gm-09) | La empresa (may 2026), operario con camiseta DecorMG | Sí | Equipo, nosotros | VERIFICADO (sin relación con otra ficha) |
| `salon-1.jpg` | GM (gm-02) | **Una clienta** (imagen de oct 2025) | Respaldado por la clienta | Hero, servicio integral, obra | RESPALDADO POR TERCEROS |
| `salon-2.jpg` | GM (gm-05) | **La misma clienta** | Respaldado | Hero, contacto, obra | RESPALDADO POR TERCEROS |
| `bano-laton-1.jpg` | GM (gm-04) | **La misma clienta** (ago 2026); copia baja en el CR de la empresa | Sí (también en CR) | Hero, servicios, obra | RESPALDADO (fuerte) |
| `cocina-despues.jpg` | GM (gm-06) | **Otra clienta** (jul 2026) | Respaldado | Hero (escritorio), servicios, antes/después | RESPALDADO POR TERCEROS |
| `cocina-antes.jpg` | GM (gm-10) | **La misma clienta** (jul 2026) | Respaldado | Antes/después, «Qué esperar» | RESPALDADO POR TERCEROS |
| `bano-laton-obra-1/2.jpg` | CR | La empresa | Sí | Obra, equipo | VERIFICADO |
| `bano-laton-obra-3.jpg` | CR | La empresa | Sí; su relación con el baño del espejo dorado es probable (mismo azulejo) | Obra, «Paso a paso» | VERIFICADO (foto) / relación por confirmar |
| `bano-gris-1.jpg`, `bano-gris-obra-1/2.jpg` | CR | La empresa | Sí | Obra, «Qué esperar», equipo | VERIFICADO |
| `aguilas-antes.jpg` | IG `DecEkdWNFyu` | La empresa · **etiqueta «Contenido generado con IA»** | Sí | Antes/después | VERIFICADO (origen) · integridad por confirmar |
| `aguilas-despues.jpg` | IG `DecjXmOjUAF` | La empresa | Sí | Antes/después | VERIFICADO |
| `lucero-antes.jpg` | IG `DdTnUr8NNcL` | La empresa | Sí | Antes/después | VERIFICADO |
| `lucero-despues.jpg` | IG `DdWC44mjRsT` | La empresa · **etiqueta IA** | Sí | Antes/después | VERIFICADO (origen) · integridad por confirmar |
| `villaverde-antes.jpg` | IG `Ddi3oh3tPWl` | La empresa · **etiqueta IA** | Sí | Antes/después | VERIFICADO (origen) · integridad por confirmar |
| `villaverde-despues.jpg` | IG `DdjA8icjZxW` | La empresa · **etiqueta IA** | Sí | Antes/después, servicios | VERIFICADO (origen) · integridad por confirmar |
| `aluche-1.jpg` | IG `DdJ6p7KDfyi` | La empresa · **etiqueta IA** | Sí | Obra | VERIFICADO (origen) · integridad por confirmar |
| `equipo-obra.jpg` | IG `DZe66pGNZ2E` (reel de humor, 12-06-2026) | La empresa, marca de agua | Sí (uno con camiseta DecorMG) | Equipo, contacto, «Qué esperar» | RESPALDADO; identidad de las personas por confirmar |

**Relaciones antes/después.** Las cuatro parejas son del mismo espacio:

- **Las Águilas, Lucero y Villaverde:** misma publicación o par de publicaciones con el mismo barrio y los mismos clientes.
- **Cocina:** misma clienta, mismo suelo y misma ventana.

Los encuadres son distintos, así que se muestran lado a lado, sin comparador deslizante. Ninguna foto se ha retocado.

**Excluidas y sin uso:**

- `gm-07` y `gm-11`: aparecen personas reflejadas. `gm-07` también la subió la primera clienta.
- Otras publicaciones de IG: anuncio, reel de humor sin obra y rótulos.

**Sin fotos de stock ni de terceros ajenos a la empresa.** Ninguna imagen es material provisional o generado para la demo.

## 6. Correcciones aplicadas en el código

| Archivo | Cambio |
|---|---|
| `src/components/home/TrustStrip.tsx` | «obras en toda la Comunidad» → «trabaja en la Comunidad de Madrid»; «11 obras · Con fotos reales en esta web» → «Obras reales · Fotos de DecorMG y de sus clientes». |
| `src/content/voice.ts` | Reseña de Juan en su orden original, retiradas frases no revisables; pregunta del presupuesto corregida; «cada obra» → «muchas obras en Instagram». |
| `src/content/services.ts` | Retirado «es el trabajo que más publicamos»; bañera por plato atribuida a Aluche; «abrimos la cocina» → «hemos hecho cocinas abiertas»; encimera de Aluche sin afirmar que fuera de cocina. |
| `src/content/images.ts` | Nuevo origen `google-client` para las 5 fotos de Google subidas por clientas; alt del equipo más preciso. |
| `src/content/projects.ts` | Fuentes de 3 fichas corregidas («subidas por una clienta»); marca `aiLabel` en 4 fichas. |
| `src/app/proyectos/[slug]/page.tsx` | Aviso visible en las fichas con etiqueta IA de Instagram. |
| `src/components/home/BeforeAfter.tsx` | Aviso de la etiqueta IA en el bloque antes/después. |
| `src/components/home/Reviews.tsx`, `src/content/site.ts` | «Google indica que las reseñas no se verifican»; fecha de consulta 15-10-2026. |
| `src/components/home/WhyUs.tsx`, `src/app/nosotros/page.tsx` | «Cada obra, con su antes» → «Obras con su antes» / «En Instagram publicamos…». |
| `src/components/home/FeaturedProjects.tsx`, `src/app/proyectos/page.tsx` | Fuente de las fotos precisada (empresa y clientes); retirada la cifra «11 obras». |
| `src/app/servicios/page.tsx` | Plazos: «pregúntalos al pedir presupuesto». |
| `src/app/aviso-legal/page.tsx` | Permiso necesario también de las clientas que subieron fotos a Google. |

No se han tocado diseño, colores, tipografías ni animaciones GSAP. Los avisos nuevos usan estilos de texto que ya existían.

## 7. Necesita confirmación de DecorMG antes de publicar

1. **Fotos con etiqueta «Contenido generado con IA» en Instagram:** Las Águilas (antes), Lucero (después), Villaverde y Aluche. Hay que saber qué parte es IA y conseguir los originales sin editar. Si alguna imagen está alterada, retirarla de la web.
2. **Permiso de las dos clientas** que subieron a Google las fotos de los salones, del baño del espejo dorado y de la cocina antes/después. Si no lo dan, sustituirlas por fotos propias. Afecta a 4 imágenes del hero (3 diapositivas y la primera en escritorio).
3. Autorización escrita para fotos y logotipo, y permiso de los autores de las reseñas citadas.
4. «7 años en Madrid»: solo autodeclarado en Cronoshare; se publicaría si la empresa lo confirma.
5. Si la dirección C. de Quero, 55 es local con atención al público o solo domicilio.
6. Alcance del servicio de aire acondicionado.
7. Identidad y consentimiento de las personas del equipo que salen en fotos.
8. Proceso real de respuesta: canal y si conviene mandar fotos.
9. Si las fotos de alicatado en curso (`bano-laton-obra-3`) y las de los salones son de las obras a las que se han asociado.
10. Datos legales: razón social, NIF, email y domicilio fiscal.

## 8. Limitaciones

- **Sin iniciar sesión** en Google ni en Instagram:
  - de las 26 reseñas solo se leen 5 y algunas salen recortadas;
  - de las 28 fotos de la ficha solo se cargan 11;
  - Instagram no muestra el motivo de la etiqueta IA.
- **Valores que cambian con el tiempo:** valoración, número de reseñas y antigüedad («hace un mes»). Repetir esta comprobación justo antes de publicar.
