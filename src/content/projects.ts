import { photos, type Photo } from "./images";

export type ProjectKind = "bano" | "cocina" | "vivienda" | "local";
export type Stage = "antes" | "en obra" | "después";

export type Frame = { photo: Photo; stage: Stage };

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** One line shown on hover in the sheet and in listings. */
  summary: string;
  neighbourhood?: string;
  /** Month the job was published by DecorMG, when known. */
  published?: string;
  /** Works listed by DecorMG in the original post, verbatim in meaning. */
  works?: string[];
  /** When there is no published description: what the photos show, nothing more. */
  visible?: string;
  frames: Frame[];
  pair?: { before: Photo; after: Photo };
  source: { label: string; url: string };
  service?: "reformas-de-banos" | "reformas-de-cocinas" | "reformas-integrales";
};

const ig = (code: string) => `https://www.instagram.com/decormg.reformas/p/${code}/`;
const maps = "https://www.google.com/maps/place/DecorMG+%7C+Reformas+Integrales+Madrid/@40.3904822,-3.76063,17z";
const crono = "https://www.cronoshare.com/croner-5519111-decormg-reformas-integrales";

export const projects: Project[] = [
  {
    slug: "bano-las-aguilas",
    title: "Baño completo en Las Águilas",
    kind: "bano",
    summary: "De bañera y azulejo azul a ducha con mampara, luz LED y casoneto con puerta corredera.",
    neighbourhood: "Las Águilas",
    published: "octubre de 2026",
    works: [
      "Fontanería",
      "Electricidad",
      "Alicatados",
      "Iluminación LED en la zona de ducha",
      "Instalación de mampara y muebles",
      "Casoneto con puerta corredera",
      "Distribución y enchufes a petición de los clientes",
    ],
    frames: [
      { photo: photos.aguilasAntes, stage: "antes" },
      { photo: photos.aguilasDespues, stage: "después" },
    ],
    pair: { before: photos.aguilasAntes, after: photos.aguilasDespues },
    source: { label: "Publicación en Instagram, 13 de octubre de 2026", url: ig("DecjXmOjUAF") },
    service: "reformas-de-banos",
  },
  {
    slug: "ducha-lucero",
    title: "Plato de ducha y mampara en Lucero",
    kind: "bano",
    summary: "Suelo levantado hasta el desagüe, plato nuevo, mampara y remates de alicatado.",
    neighbourhood: "Lucero",
    published: "septiembre de 2026",
    works: ["Alicatado y remates", "Instalación de plato de ducha", "Instalación de mampara"],
    frames: [
      { photo: photos.luceroAntes, stage: "antes" },
      { photo: photos.luceroDespues, stage: "después" },
    ],
    pair: { before: photos.luceroAntes, after: photos.luceroDespues },
    source: { label: "Publicación en Instagram, 16 de septiembre de 2026", url: ig("DdWC44mjRsT") },
    service: "reformas-de-banos",
  },
  {
    slug: "reforma-parcial-aluche",
    title: "Reforma parcial en Aluche",
    kind: "vivienda",
    summary: "Encimera, aseo nuevo, pintura, bañera por plato de ducha, rodapié, mosquiteras y lámparas.",
    neighbourhood: "Aluche",
    published: "septiembre de 2026",
    works: [
      "Cambio de encimera",
      "Creación de aseo",
      "Pintura",
      "Cambio de bañera por plato de ducha",
      "Instalación de mampara",
      "Cambio de todo el rodapié",
      "Instalación de mosquiteras",
      "Instalación de lámparas",
    ],
    frames: [{ photo: photos.aluche, stage: "después" }],
    source: { label: "Publicación en Instagram, 11 de septiembre de 2026", url: ig("DdJ6p7KDfyi") },
    service: "reformas-integrales",
  },
  {
    slug: "filtraciones-villaverde",
    title: "Filtraciones y poyetes en Villaverde",
    kind: "vivienda",
    summary: "Saneamiento de filtraciones de agua, pintura y poyetes nuevos en las ventanas.",
    neighbourhood: "Villaverde",
    published: "septiembre de 2026",
    works: ["Saneamiento", "Reparación de pintura", "Instalación de poyetes"],
    frames: [
      { photo: photos.villaverdeAntes, stage: "antes" },
      { photo: photos.villaverdeDespues, stage: "después" },
    ],
    pair: { before: photos.villaverdeAntes, after: photos.villaverdeDespues },
    source: { label: "Publicación en Instagram, 21 de septiembre de 2026", url: ig("DdjA8icjZxW") },
  },
  {
    slug: "cocina-antes-despues",
    title: "Cocina renovada entera",
    kind: "cocina",
    summary: "De azulejo decorado y fogones de gas a muebles blancos, encimera clara e inducción.",
    visible:
      "Las fotos muestran la misma cocina (mismo suelo hexagonal y misma ventana) antes y después: muebles bajos nuevos, encimera clara veteada, fregadero de acero, placa de inducción, horno integrado y alicatado retirado.",
    frames: [
      { photo: photos.cocinaAntes, stage: "antes" },
      { photo: photos.cocinaDespues, stage: "después" },
    ],
    pair: { before: photos.cocinaAntes, after: photos.cocinaDespues },
    source: { label: "Fotos de la ficha de Google de DecorMG", url: maps },
    service: "reformas-de-cocinas",
  },
  {
    slug: "cocina-abierta",
    title: "Cocina abierta al comedor",
    kind: "cocina",
    summary: "Cocina blanca sin tiradores, columnas de horno y microondas y suelo efecto madera continuo.",
    visible:
      "La foto muestra una cocina blanca sin tiradores abierta al comedor, con encimera de madera, columnas de electrodomésticos, focos empotrados y el mismo suelo efecto madera en todo el espacio.",
    frames: [{ photo: photos.cocinaAbierta, stage: "después" }],
    source: { label: "Fotos de la ficha de Google de DecorMG", url: maps },
    service: "reformas-de-cocinas",
  },
  {
    slug: "bano-laton-y-roble",
    title: "Baño con espejo dorado y mueble de roble",
    kind: "bano",
    summary: "Azulejo en relieve, lavabo negro sobre encimera gris, mueble de roble y toallero negro.",
    visible:
      "Las fotos siguen el mismo baño desde el alicatado con azulejo blanco en relieve hasta el final: encimera gris veteada con lavabo negro, mueble suspendido de roble, grifería dorada, toallero negro y suelo efecto madera.",
    frames: [
      { photo: photos.banoLatonObra3, stage: "en obra" },
      { photo: photos.banoLatonObra1, stage: "en obra" },
      { photo: photos.banoLatonObra2, stage: "en obra" },
      { photo: photos.banoLaton, stage: "después" },
    ],
    source: { label: "Fotos de la ficha de Google y del perfil de Cronoshare de DecorMG", url: crono },
    service: "reformas-de-banos",
  },
  {
    slug: "bano-gris-espejo-led",
    title: "Baño gris con espejo LED",
    kind: "bano",
    summary: "Gres gris de gran formato, ducha con mampara, mueble blanco y espejo con luz.",
    visible:
      "Las fotos muestran el mismo baño en obra y terminado: gres gris de gran formato, plato de ducha con mampara de vidrio, mueble blanco con lavabo integrado, espejo con luz LED, focos empotrados y toallero.",
    frames: [
      { photo: photos.banoGrisObra2, stage: "en obra" },
      { photo: photos.banoGrisObra1, stage: "en obra" },
      { photo: photos.banoGris, stage: "después" },
    ],
    source: { label: "Fotos del perfil de Cronoshare de DecorMG", url: crono },
    service: "reformas-de-banos",
  },
  {
    slug: "bano-marmol-y-madera",
    title: "Baño en blanco veteado y madera",
    kind: "bano",
    summary: "Porcelánico efecto mármol en paredes, mueble suspendido y mampara de perfil negro.",
    visible:
      "La foto muestra un baño terminado con porcelánico blanco veteado en paredes, suelo de lamas efecto madera, mueble suspendido de madera con lavabo blanco, grifería negra, espejo con luz y mampara de perfil negro.",
    frames: [{ photo: photos.banoMarmol, stage: "después" }],
    source: { label: "Foto de la ficha de Google de DecorMG", url: maps },
    service: "reformas-de-banos",
  },
  {
    slug: "salon-papel-pintado",
    title: "Salón con pared de papel pintado",
    kind: "vivienda",
    summary: "Pared de papel pintado oscuro, línea de luz en el falso techo y suelo efecto madera.",
    visible:
      "Las fotos muestran un salón terminado con una pared revestida de papel pintado oscuro con hojas doradas, una línea de luz LED encastrada en el falso techo y suelo porcelánico efecto madera.",
    frames: [
      { photo: photos.salon1, stage: "después" },
      { photo: photos.salon2, stage: "después" },
    ],
    source: { label: "Fotos de la ficha de Google de DecorMG", url: maps },
    service: "reformas-integrales",
  },
  {
    slug: "local-techo-led",
    title: "Local con techo de luz en panal",
    kind: "local",
    summary: "Paredes negras y un techo de luminarias LED hexagonales, durante el montaje.",
    visible:
      "La foto, tomada durante la obra, muestra un local con paredes negras, espejos de pared y un techo de luminarias LED en forma de panal ya encendido.",
    frames: [{ photo: photos.localLed, stage: "en obra" }],
    source: { label: "Foto de la ficha de Google de DecorMG", url: maps },
  },
];

export const kindLabel: Record<ProjectKind, string> = {
  bano: "Baños",
  cocina: "Cocinas",
  vivienda: "Pisos y otras estancias",
  local: "Locales",
};

export const kindOrder: ProjectKind[] = ["bano", "cocina", "vivienda", "local"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
