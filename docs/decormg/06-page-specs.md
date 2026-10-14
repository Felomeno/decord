# 06 · Especificación de páginas y copy

El texto definitivo vive en `src/content/*.ts`. Aquí está el argumento de cada página (afirmación → prueba) y el orden de módulos.

## Home — argumento

| Sección (blueprint) | Afirmación | Prueba |
|---|---|---|
| Hero · *tira iluminada* | Hacen baños, cocinas y pisos en Madrid, y puedes verlo ya | 14 fotogramas reales de 8 obras en la tira; botones WhatsApp y "Ver obras" |
| Lo esencial · *nombres en columnas* | Trabajan en tu zona, hacen trabajos grandes y pequeños y se les localiza fácil | Barrios con obra publicada, lista literal de trabajos, teléfono, WhatsApp, 4,8 en Google con enlace |
| Obras · *hoja de contactos* | Hay obra real y variada detrás | 11 obras como tiras de fotogramas con título y dato |
| Antes y después · *fila con un fotograma elevado* | El cambio es visible | 2 parejas reales (cocina, baño de Las Águilas) |
| Servicios · *lomos de libro* | Saben qué hacen y lo nombran | 3 servicios con página + trabajos parciales |
| Cómo avanza una obra · *fila arrastrable* | Hay método, también en la parte fea | Fotos reales de cada fase y su texto ("los procesos no siempre son la parte bonita…") |
| Quién entra en tu casa · *datos laterales + párrafo ancho* | Empresa de barrio, cercana | Base en Latina, zona, canales; registro de obras recientes con fecha |
| Carta · *una carta larga* | Lo dicen sus clientes | Opinión literal de Juan D., enlace a las 26 opiniones |
| Preguntas · *respuestas como texto* | No hay letra pequeña escondida | 8 respuestas honestas |
| Contacto · *tira de fotos + barra de tres celdas* | Escribirles cuesta 20 segundos | Constructor de mensaje → WhatsApp |
| Footer · *bloques* | Cierre con el nombre | Wordmark, NAP, aviso de demo |

## Copy deck (home)

- **H1:** Baños, cocinas y pisos en Madrid
- **Entradilla:** Reformas integrales y parciales desde Latina. Cada obra la publicamos con su antes.
- **CTA 1:** Pedir presupuesto por WhatsApp · **CTA 2:** Ver obras
- **Lo esencial (H2):** Dónde y qué
  - Barrios con obra publicada: Aluche · Las Águilas · Lucero · Villaverde · y el resto de la Comunidad de Madrid
  - Trabajos: fontanería, electricidad, alicatados, solados, pladur, pintura, cambio de bañera por plato de ducha, mamparas y muebles de baño, encimeras, iluminación LED, filtraciones y poyetes, armarios
  - Contacto: WhatsApp 665 84 28 64 · Teléfono 665 84 28 64 · Instagram @decormg.reformas · Google 4,8 de 5 (26 opiniones, consultado el 14/10/2026)
- **Obras (H2):** Obras publicadas — "Fotos de DecorMG en su Instagram, su ficha de Google y su perfil de Cronoshare."
- **Antes y después (H2):** Antes y después
- **Servicios (H2):** Qué reformamos — "Las tres primeras tienen su página; lo demás también lo hacemos como trabajo suelto."
- **Proceso (H2):** Cómo avanza una obra — moments: Nos escribes · El antes · Demolición · Instalaciones · Alicatado · Montaje · Entregado y limpio
- **Nosotros (H2, oculto visualmente):** Quién entra en tu casa — párrafo: "DecorMG es una empresa de reformas de Madrid con base en Latina. Reformamos pisos, baños, cocinas y locales, y también hacemos el trabajo pequeño: un plato de ducha, una filtración, un poyete. Las fotos de esta página son nuestras, de obras reales, muchas con el operario todavía dentro."
- **Carta:** extracto literal de Juan De Dios De La Calzada R. (Google)
- **Preguntas (H2):** Preguntas
- **Contacto (H2):** Cuéntanos tu obra

## Interiores

### /proyectos
H1 "Obras". Entradilla con fuente de las fotos. Grupos (H2): Baños · Cocinas · Pisos y otras estancias · Locales. Cada obra: tira de fotogramas + título + barrio/fecha si existen + enlace "Ver obra".

### /proyectos/[slug]
H1 título. Datos laterales: barrio, fecha de publicación, fuente con enlace. H2 "Qué se hizo" (lista literal o "Sin descripción publicada; las fotos muestran…"). Antes/después lado a lado si existe. H2 "Fotos". CTA WhatsApp con mensaje "Hola, he visto la obra «…» en vuestra web y quiero pedir presupuesto para algo parecido." Anterior/siguiente.

### /servicios/[servicio]
H1 servicio. Entradilla. H2 "Qué incluye" (solo trabajos documentados). H2 "Obras de este tipo" (tiras). H2 "Cómo se pide" (constructor con el tipo preseleccionado). H2 "Preguntas" (2–4 específicas). Sin precios ni plazos.

### /nosotros
H1 "Nosotros". Párrafo, datos laterales, fotos del equipo en obra, cómo trabajan (proceso), opiniones (3 extractos), pendientes de confirmar no visibles.

### /contacto
H1 "Pide presupuesto". Constructor completo (tipo, zona, descripción, nombre, preferencia de contacto, aceptación de privacidad). Vista previa del mensaje. Botones: Abrir WhatsApp · Copiar mensaje · Llamar. Bloque "Qué pasa después". NAP.

### Legales
Plantillas con `[PENDIENTE: razón social]`, `[PENDIENTE: CIF]`, `[PENDIENTE: email]`. Cookies: la demo no instala cookies propias ni de terceros.

## Criterios de uso

- Primer pantallazo en 390px muestra: nombre, H1, al menos 1 fotograma completo, botón WhatsApp.
- Teléfono alcanzable en 1 toque desde cualquier página en móvil (barra inferior).
- Ningún titular pasa de dos líneas en 360–1440px.
- Toda foto de obra lleva su origen en la página de proyecto.
