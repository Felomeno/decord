"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/content/images";

/**
 * A rotating hero photo after the first. It is requested only once the page has loaded and the
 * browser is idle, so it never competes with the first photo (the LCP image) for bandwidth; its
 * turn comes six seconds in at the earliest.
 */
export function HeroSlideImage({ photo }: { photo: Photo }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle = 0;
    const schedule = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
        : window.setTimeout(() => setReady(true), 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  if (!ready) return null;
  return (
    <Image
      src={photo.src}
      alt=""
      fill
      sizes="100vw"
      loading="eager"
      style={photo.focal ? { objectPosition: photo.focal } : undefined}
    />
  );
}
