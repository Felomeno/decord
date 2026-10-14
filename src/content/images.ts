// Every photograph used on the site. All belong to DecorMG's public channels;
// rights for publication are pending (see docs/decormg/03-asset-manifest.md).

export type ImageSource = "google" | "instagram" | "cronoshare";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: ImageSource;
  /** CSS object-position, used when the frame crops the photo. */
  focal?: string;
};

const p = (
  file: string,
  width: number,
  height: number,
  source: ImageSource,
  alt: string,
  focal?: string,
): Photo => ({ src: `/images/${file}`, width, height, source, alt, focal });

export const photos = {
  cocinaAbierta: p("cocina-abierta-1.jpg", 1200, 1600, "google", "Cocina blanca sin tiradores abierta al comedor, con encimera de madera, suelo efecto madera y ventana a la calle", "50% 45%"),
  cocinaObra: p("cocina-obra.jpg", 1200, 1600, "google", "Operario de DecorMG de espaldas revisando una cocina en obra con columnas de madera y blanco", "50% 55%"),
  cocinaAntes: p("cocina-antes.jpg", 1600, 1200, "google", "Cocina antes de la reforma, con azulejo antiguo decorado, encimera de granito y fogones de gas"),
  cocinaDespues: p("cocina-despues.jpg", 1600, 1168, "google", "La misma cocina después de la reforma: muebles blancos, encimera clara, placa de inducción y horno integrado"),
  banoMarmol: p("bano-marmol-1.jpg", 1200, 1600, "google", "Baño con paredes de porcelánico blanco veteado, mueble de lavabo suspendido de madera y suelo de lamas efecto madera", "40% 60%"),
  banoLaton: p("bano-laton-1.jpg", 1200, 1600, "google", "Lavabo negro mate sobre encimera gris veteada, mueble de roble y espejo de marco dorado ante azulejo blanco en relieve", "50% 55%"),
  banoLatonObra1: p("bano-laton-obra-1.jpg", 375, 500, "cronoshare", "Operario de DecorMG instalando un toallero negro en el baño del espejo dorado"),
  banoLatonObra2: p("bano-laton-obra-2.jpg", 375, 500, "cronoshare", "El mismo baño en obra, con el inodoro ya colocado y el mueble de roble montado"),
  banoLatonObra3: p("bano-laton-obra-3.jpg", 375, 500, "cronoshare", "Alicatado en curso con azulejo blanco en relieve y crucetas entre piezas"),
  banoGris: p("bano-gris-1.jpg", 375, 500, "cronoshare", "Baño terminado en gris con espejo LED de forma orgánica, mueble blanco y mampara de vidrio"),
  banoGrisObra1: p("bano-gris-obra-1.jpg", 375, 500, "cronoshare", "Operario de DecorMG ajustando la columna de ducha del baño gris"),
  banoGrisObra2: p("bano-gris-obra-2.jpg", 375, 500, "cronoshare", "El baño gris en obra, con el plato de ducha y el mueble aún embalado"),
  salon1: p("salon-1.jpg", 1205, 1600, "google", "Salón con una pared revestida de papel pintado oscuro con hojas doradas y una línea de luz LED en el falso techo", "50% 50%"),
  salon2: p("salon-2.jpg", 1205, 1600, "google", "Zona de televisión del mismo salón, con lámpara de globos y suelo efecto madera"),
  localLed: p("local-led-1.jpg", 1200, 1600, "google", "Local comercial en obra con paredes negras y un techo de luminarias LED en forma de panal", "50% 30%"),
  aguilasAntes: p("aguilas-antes.jpg", 360, 640, "instagram", "Baño de Las Águilas antes de la obra: bañera, azulejo azul y baldas de obra. Portada original con rótulo"),
  aguilasDespues: p("aguilas-despues.jpg", 480, 640, "instagram", "El baño de Las Águilas terminado: ducha con mampara, toallero cromado, suelo efecto madera y baldas en hornacina"),
  luceroAntes: p("lucero-antes.jpg", 360, 640, "instagram", "Ducha de Lucero antes de la obra, con el suelo levantado y el desagüe a la vista. Portada original con rótulo"),
  luceroDespues: p("lucero-despues.jpg", 480, 640, "instagram", "La ducha de Lucero terminada, con plato blanco, mampara de vidrio y alicatado gris"),
  villaverdeAntes: p("villaverde-antes.jpg", 360, 640, "instagram", "Poyete de una ventana en Villaverde con la pintura levantada por filtraciones. Portada original con rótulo"),
  villaverdeDespues: p("villaverde-despues.jpg", 480, 640, "instagram", "El poyete de Villaverde terminado, con remate claro sobre la calle"),
  aluche: p("aluche-1.jpg", 480, 640, "instagram", "Habitación de la reforma parcial en Aluche, recién pintada, con lámpara de techo y suelo laminado"),
  equipo: p("equipo-obra.jpg", 361, 640, "instagram", "Dos operarios de DecorMG en una obra, junto a un cubo de mortero"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const sourceLabel: Record<ImageSource, string> = {
  google: "ficha de Google de DecorMG",
  instagram: "Instagram de DecorMG",
  cronoshare: "perfil de DecorMG en Cronoshare",
};
