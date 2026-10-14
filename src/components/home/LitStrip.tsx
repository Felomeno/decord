"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import type { Photo } from "@/content/images";

export type StripItem = { href: string; photo: Photo; place: string; stage: string };

const FRAME_H = 380;

/**
 * The hero's lit strip: one sideways row of real job photos. The frame nearest the centre is lit,
 * the rest stay dimmed until hovered, focused or scrolled to the middle. Native scroll + snap only.
 */
export function LitStrip({ items }: { items: StripItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
    const frames = Array.from(strip.querySelectorAll<HTMLElement>(".hero-frame"));
    let raf = 0;
    const update = () => {
      const box = strip.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      let best = 0;
      let distance = Infinity;
      frames.forEach((frame, i) => {
        const r = frame.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < distance) {
          distance = d;
          best = i;
        }
      });
      setLit(best);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    strip.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      strip.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hero__strip scroller"
      tabIndex={0}
      role="region"
      aria-label="Obras de DecorMG, desliza para ver más"
      data-ready={lit === null ? undefined : "true"}
    >
      {items.map((item, i) => {
        const w = Math.round((item.photo.width / item.photo.height) * FRAME_H);
        return (
          <Link
            key={`${item.href}-${i}`}
            href={item.href}
            className="hero-frame"
            style={{ ["--i" as string]: Math.min(i, 8) }}
            data-lit={lit === i ? "true" : undefined}
            data-track="project_open"
            data-track-place="hero"
          >
            <Frame photo={item.photo} height={FRAME_H} sizes={`${w}px`} priority={i < 4} />
            <span className="hero-frame__caption">
              <span>{item.place}</span>
              <span>{item.stage}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
