import Image from "next/image";
import type { Photo } from "@/content/images";

type FrameProps = {
  photo: Photo;
  /** Rendered height in px used to size the frame at its natural ratio. */
  height?: number;
  /** Fixed aspect ratio instead of the natural one. */
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  decorative?: boolean;
};

/**
 * A photo with square corners. Either sized by height at its natural ratio (sheet, strips)
 * or filling a box whose ratio is set in CSS.
 */
export function Frame({ photo, height, fill, sizes, priority, className, decorative }: FrameProps) {
  const style =
    !fill && height ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined;
  return (
    <div className={`frame ${className ?? ""}`} style={style}>
      <Image
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        style={photo.focal ? { objectPosition: photo.focal } : undefined}
      />
    </div>
  );
}
