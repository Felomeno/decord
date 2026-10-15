import { photos, type Photo } from "./images";

export type HeroVideoSource = {
  src: string;
  type: "video/mp4" | "video/webm";
  /** Media query for this file, e.g. a lighter vertical cut for phones. */
  media?: string;
};

export type HeroMedia = {
  /**
   * Real DecorMG footage only. Empty until DecorMG supplies an authorised clip: their Instagram
   * reels need a signed-in session and rights to download, so none is used yet and the hero shows
   * the poster photos. To switch the video on, put the files in public/videos and list them here,
   * phones first, e.g.
   *   { src: "/videos/hero-720x1280.mp4", type: "video/mp4", media: "(max-width: 767px)" },
   *   { src: "/videos/hero-1920x1080.webm", type: "video/webm" },
   *   { src: "/videos/hero-1920x1080.mp4", type: "video/mp4" },
   * Aim for 8 to 15 s loops, no audio track, about 2 to 4 MB per file.
   */
  video: HeroVideoSource[];
  /** Shown first on every device, and the only thing shown without video or with reduced motion. */
  poster: { desktop: Photo; mobile: Photo; alt: string };
  /** The job the poster belongs to, linked from the caption. */
  caption: { desktop: { text: string; href: string }; mobile: { text: string; href: string } };
};

export const hero: HeroMedia = {
  video: [],
  poster: {
    desktop: photos.cocinaDespues,
    mobile: photos.cocinaAbierta,
    alt: "Cocina blanca reformada por DecorMG",
  },
  caption: {
    desktop: { text: "Obra real: cocina renovada", href: "/proyectos/cocina-antes-despues" },
    mobile: { text: "Obra real: cocina abierta", href: "/proyectos/cocina-abierta" },
  },
};
