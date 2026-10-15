"use client";

import { useEffect, useRef } from "react";
import type { HeroVideoSource } from "@/content/hero";

/**
 * Background loop over the poster photo. It downloads nothing until it is allowed to play
 * (preload="none"), never plays with reduced motion or Save-Data, fades in only once frames
 * are running, and pauses while the hero is off screen.
 */
export function HeroVideo({ sources }: { sources: HeroVideoSource[] }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce.matches || saveData) return;

    video.muted = true; // set as a property too: autoplay policies check it, not the attribute
    const play = () => video.play().catch(() => {});
    const onPlaying = () => video.classList.add("is-playing");
    video.addEventListener("playing", onPlaying);

    const seen = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : video.pause()));
    seen.observe(video);
    const onReduce = () => {
      if (reduce.matches) {
        video.pause();
        video.classList.remove("is-playing");
      }
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      seen.disconnect();
      reduce.removeEventListener("change", onReduce);
      video.removeEventListener("playing", onPlaying);
      video.pause();
    };
  }, []);

  return (
    <video ref={ref} className="hero__video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} media={source.media} />
      ))}
    </video>
  );
}
