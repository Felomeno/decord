"use client";

import { useEffect } from "react";

/** Forwards [data-track] clicks to window.dataLayer when an analytics tool has been installed. */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = event.target instanceof Element ? event.target.closest("[data-track]") : null;
      if (!el || !Array.isArray(window.dataLayer)) return;
      window.dataLayer.push({ event: el.getAttribute("data-track"), place: el.getAttribute("data-track-place") ?? "" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
