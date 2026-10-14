import { photos, type Photo } from "./images";

// Literal extracts from public Google reviews (checked 14 Oct 2026). Publication requires permission.
export const reviews = [
  {
    author: "Juan De Dios D.",
    context: "Opinión en Google, hace 3 meses",
    opening: "No puedo estar más contento con el resultado […]",
    body: [
      "Conocí esta empresa de reformas a través de Instagram y por un amigo al que también le habían realizado una reforma […]. Era un piso con decoración y azulejos bastante antiguo y han realizado un acabado bastante conseguido y bonito con materiales muy actuales que se llevan ahora.",
      "[…] van al mínimo detalle con cosas que a veces se pueden escapar. Incluso al acabar, han dejado el piso bastante limpio de polvo y resto de suciedad que suele quedar después de las obras.",
      "Desde luego que los volvería a elegir. Los recomiendo totalmente.",
    ],
  },
  {
    author: "Nuria C.",
    context: "Opinión en Google, hace un mes",
    opening: "He realizado una reforma integral en mi piso con esta empresa.",
    body: [
      "Gente sería y muy profesional, un excelente trabajo y con una gran capacidad para la decoración, siempre aportando ideas acertadas con muy buen criterio.",
    ],
  },
  {
    author: "Cristina M.",
    context: "Opinión en Google, hace 2 meses",
    opening: "Acabamos de hacer una pequeña reforma con esta empresa.",
    body: [
      "Muy profesionales y serios. Han cumplido con los plazos y todo muy bien realizado, sugiriendo mejoras y con precios muy ajustados.",
    ],
  },
];

export const faq = [
  {
    q: "¿Hacéis trabajos pequeños?",
    a: "Sí. Además de reformas completas hacemos cambios de bañera por plato de ducha, poyetes, reparación de filtraciones, encimeras o pintura.",
  },
  {
    q: "¿Por qué zonas trabajáis?",
    a: "En la Comunidad de Madrid. Nuestra base está en Latina y las últimas obras publicadas son de Aluche, Las Águilas, Lucero y Villaverde.",
  },
  {
    q: "¿El presupuesto tiene coste?",
    a: "No. El presupuesto es sin compromiso.",
  },
  {
    q: "¿Cuánto cuesta una reforma?",
    a: "No publicamos precios cerrados porque cada obra cambia según medidas, materiales y estado de las instalaciones. Cuéntanos qué quieres hacer y te damos un presupuesto concreto.",
  },
  {
    q: "¿Cuánto tarda la obra?",
    a: "Depende del trabajo. Pregúntanos el plazo al pedir presupuesto y lo vemos con tu caso.",
  },
  {
    q: "¿Qué tengo que contar en el primer mensaje?",
    a: "Qué quieres reformar, el barrio o código postal aproximado y una frase sobre el estado actual. No hace falta tu dirección completa.",
  },
  {
    q: "¿Ayudáis a elegir materiales?",
    a: "Sí. Varios clientes lo destacan en sus opiniones de Google: proponemos ideas y mejoras mientras se decide la obra.",
  },
  {
    q: "¿Es esta la web oficial de DecorMG?",
    a: "Todavía no. Es una propuesta de web preparada para DecorMG con sus fotos y datos públicos, pendiente de su aprobación.",
  },
];

// How a job moves forward, told with DecorMG's own job photos.
export const moments: { title: string; text: string; photo: Photo; gap: number }[] = [
  {
    title: "Nos escribes",
    text: "Por WhatsApp o por teléfono: qué quieres hacer y en qué barrio. El presupuesto es sin compromiso.",
    photo: photos.equipo,
    gap: 96,
  },
  {
    title: "El antes",
    text: "Fotografiamos cómo está. Así publicamos cada obra: primero su antes, luego el resultado.",
    photo: photos.aguilasAntes,
    gap: 40,
  },
  {
    title: "Demolición",
    text: "Polvo, ruido y escombro. No es la parte bonita, pero sin ella no existe lo demás.",
    photo: photos.luceroAntes,
    gap: 128,
  },
  {
    title: "Instalaciones",
    text: "Fontanería y electricidad: desagües, tomas, enchufes y luz donde se decidió.",
    photo: photos.banoGrisObra1,
    gap: 64,
  },
  {
    title: "Alicatado",
    text: "Pieza a pieza, con crucetas y nivel, hasta los remates de esquina.",
    photo: photos.banoLatonObra3,
    gap: 112,
  },
  {
    title: "Montaje",
    text: "Plato, mampara, muebles, toalleros y espejos, ya sobre el alicatado terminado.",
    photo: photos.banoLatonObra1,
    gap: 48,
  },
  {
    title: "Entregado y limpio",
    text: "Lo último es recoger. Un cliente lo resume en Google: dejaron el piso limpio de polvo.",
    photo: photos.banoLaton,
    gap: 88,
  },
];
