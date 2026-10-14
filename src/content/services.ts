// Services DecorMG states in its own texts (Cronoshare description, Instagram bio and posts).
// "includes" only lists work documented in a published job.

export type ServiceSlug = "reformas-integrales" | "reformas-de-banos" | "reformas-de-cocinas";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  includes: { title: string; text: string }[];
  before: string[];
  faq: { q: string; a: string }[];
  builderType: string;
};

export const services: Service[] = [
  {
    slug: "reformas-de-banos",
    name: "Reformas de baño",
    short: "Baño",
    metaTitle: "Reformas de baño en Madrid",
    metaDescription:
      "Reformas de baño completas y parciales en Madrid: fontanería, electricidad, alicatado, plato de ducha, mampara y muebles. Obras reales en Las Águilas y Lucero.",
    intro:
      "Es el trabajo que más publicamos. Hacemos el baño entero, desde la fontanería hasta el último remate, o solo la parte que falla: cambiar la bañera por un plato de ducha, poner mampara o cambiar el mueble.",
    includes: [
      { title: "Fontanería y electricidad", text: "Tomas nuevas, desagües y enchufes donde los necesites; en Las Águilas los clientes eligieron la distribución." },
      { title: "Alicatado y solado", text: "Gres de gran formato, azulejo en relieve o porcelánico efecto madera en el suelo, con sus remates." },
      { title: "Bañera por plato de ducha", text: "Levantamos el suelo hasta el desagüe, colocamos el plato y la mampara, como en Lucero." },
      { title: "Muebles, espejos y luz", text: "Mueble suspendido, lavabo sobre encimera, espejo con luz e iluminación LED en la zona de ducha." },
      { title: "Puertas correderas", text: "Casoneto para puerta corredera cuando el baño es pequeño y la puerta abatible estorba." },
    ],
    before: [
      "Qué quieres cambiar: todo el baño o solo una parte.",
      "Si tienes bañera y quieres ducha.",
      "El barrio o código postal aproximado.",
    ],
    faq: [
      { q: "¿Hacéis solo el cambio de bañera por plato de ducha?", a: "Sí. Es un trabajo que hacemos a menudo, con su alicatado de remate y la mampara." },
      { q: "¿Puedo elegir dónde van los enchufes y la luz?", a: "Sí. En el baño de Las Águilas la distribución y los enchufes se hicieron como pidieron los clientes." },
      { q: "¿Cuánto cuesta reformar un baño?", a: "Depende de las medidas, los materiales y el estado de las instalaciones. No publicamos precios cerrados: escríbenos con lo que quieres hacer y te damos presupuesto sin compromiso." },
    ],
    builderType: "Reforma de baño",
  },
  {
    slug: "reformas-de-cocinas",
    name: "Reformas de cocina",
    short: "Cocina",
    metaTitle: "Reformas de cocina en Madrid",
    metaDescription:
      "Reformas de cocina en Madrid: muebles, encimeras, electrodomésticos integrados y cocinas abiertas al comedor. Antes y después de obras reales de DecorMG.",
    intro:
      "Renovamos la cocina entera o cambiamos lo que se ha quedado viejo: la encimera, los muebles, los fogones de gas por una placa de inducción. También abrimos la cocina al comedor cuando el espacio lo permite.",
    includes: [
      { title: "Muebles y encimera", text: "Muebles nuevos sin tiradores o con ellos, encimeras claras veteadas o de madera." },
      { title: "Electrodomésticos integrados", text: "Horno, placa y columnas de electrodomésticos montados en su hueco." },
      { title: "Cambio de encimera suelto", text: "Si los muebles están bien, cambiamos solo la encimera, como en la reforma parcial de Aluche." },
      { title: "Alicatado y suelo", text: "Retiramos el azulejo antiguo y dejamos paredes y suelo terminados." },
    ],
    before: [
      "Si quieres cambiar toda la cocina o una parte (muebles, encimera, alicatado).",
      "Si tienes gas y quieres pasar a inducción.",
      "El barrio o código postal aproximado.",
    ],
    faq: [
      { q: "¿Podéis cambiar solo la encimera?", a: "Sí. En la reforma parcial de Aluche cambiamos la encimera junto con otros trabajos sueltos." },
      { q: "¿Hacéis cocinas abiertas al salón?", a: "Sí, tenemos una cocina abierta al comedor publicada. Si implica tirar un tabique, lo valoramos con tu caso concreto." },
      { q: "¿Cuánto cuesta una cocina?", a: "Depende de los metros, los muebles y los electrodomésticos. Cuéntanos qué quieres y te preparamos un presupuesto sin compromiso." },
    ],
    builderType: "Reforma de cocina",
  },
  {
    slug: "reformas-integrales",
    name: "Reformas integrales",
    short: "Piso completo",
    metaTitle: "Reformas integrales de pisos en Madrid",
    metaDescription:
      "Reformas integrales y parciales de pisos en Madrid: baño, cocina, suelos, pintura, pladur, iluminación y carpintería. Empresa de reformas con base en Latina.",
    intro:
      "Reformamos pisos enteros y también por partes. Una clienta reformó su piso con nosotros y, un par de meses después, una parte del de sus padres.",
    includes: [
      { title: "Baño y cocina", text: "Las dos estancias que más se reforman, con todo lo que llevan dentro." },
      { title: "Suelos y rodapiés", text: "Solados nuevos, porcelánico efecto madera y cambio de todo el rodapié." },
      { title: "Pladur y pintura", text: "Falsos techos con luz integrada, tabiques de pladur y pintura de toda la vivienda." },
      { title: "Iluminación", text: "Líneas de luz LED en falso techo, focos empotrados y montaje de lámparas." },
      { title: "Remates de la casa", text: "Mosquiteras, poyetes, armarios recibidores y reparación de filtraciones." },
    ],
    before: [
      "Qué estancias quieres reformar.",
      "Si la vivienda está habitada durante la obra.",
      "El barrio o código postal aproximado.",
    ],
    faq: [
      { q: "¿Hacéis reformas parciales o solo pisos enteros?", a: "Las dos cosas. En Aluche hicimos una reforma parcial de varios trabajos sueltos; en otros pisos, la reforma completa." },
      { q: "¿Ayudáis con la decoración?", a: "Nuestros clientes lo mencionan en sus opiniones: proponemos ideas y mejoras mientras se decide la obra." },
      { q: "¿Cuánto dura una reforma integral?", a: "Depende de los metros y de lo que haya que hacer. Pregúntanoslo al pedir presupuesto y lo vemos con tu caso." },
    ],
    builderType: "Reforma integral",
  },
];

/** Smaller works DecorMG lists in its own texts or posts. */
export const otherWorks = [
  "Reformas de locales",
  "Pintura",
  "Pladur",
  "Alicatados",
  "Solados",
  "Bañera por plato de ducha",
  "Patios y terrazas",
  "Filtraciones y poyetes",
  "Armarios recibidores",
  "Aire acondicionado",
];

export const builderTypes = [
  "Reforma de baño",
  "Reforma de cocina",
  "Reforma integral",
  "Reforma parcial",
  "Local comercial",
  "Otro trabajo",
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
