import { photos, type Photo } from "./images";

export type HeroSlide = {
  /** Finished result of a real DecorMG job. */
  photo: Photo;
  /** Art-directed version for desktop, when the job has a landscape shot. */
  desktop?: Photo;
  /** Short label shown on the slide: the job it comes from. */
  label: string;
};

/**
 * Background of the home hero: finished jobs that crossfade in turn. Only full-resolution
 * "después" photos (the 375–640 px Instagram and Cronoshare shots would look soft full screen).
 * The first slide is the LCP image and the only one shown with reduced motion.
 */
export const heroSlides: HeroSlide[] = [
  { photo: photos.cocinaAbierta, desktop: photos.cocinaDespues, label: "Cocina renovada" },
  { photo: photos.banoMarmol, label: "Baño en blanco veteado y madera" },
  { photo: photos.salon1, label: "Salón con papel pintado" },
  { photo: photos.banoLaton, label: "Baño con espejo dorado y roble" },
  { photo: photos.salon2, label: "Salón reformado" },
];
