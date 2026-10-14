"use client";

import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/Frame";
import { ChevronIcon } from "@/components/icons";
import { moments } from "@/content/voice";

/** Drag row of moments: native horizontal scroll with snap, buttons and a progress bar. */
export function ProcessRow() {
  const rowRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let raf = 0;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      setProgress(max > 0 ? row.scrollLeft / max : 1);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * 312, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="section bg-ice" aria-labelledby="proceso-title" style={{ overflow: "hidden" }}>
      <div className="wrap">
        <div className="process__head" data-reveal>
          <h2 id="proceso-title" className="t-h2">
            Cómo avanza una obra
          </h2>
          <div className="process__buttons">
            <button type="button" className="square-btn" onClick={() => step(-1)} disabled={progress <= 0.001} aria-controls="proceso-fila">
              <ChevronIcon dir="left" />
              <span className="sr-only">Anterior</span>
            </button>
            <button type="button" className="square-btn" onClick={() => step(1)} disabled={progress >= 0.999} aria-controls="proceso-fila">
              <ChevronIcon dir="right" />
              <span className="sr-only">Siguiente</span>
            </button>
          </div>
        </div>
        <div className="progress" aria-hidden>
          <span style={{ ["--p" as string]: Math.max(0.12, progress) }} />
        </div>
      </div>

      <ol id="proceso-fila" ref={rowRef} className="process__row scroller" tabIndex={0} aria-label="Fases de una obra, desliza para ver más" style={{ listStyle: "none", margin: "40px 0 0" }}>
        {moments.map((moment) => (
          <li key={moment.title} className="moment" style={{ ["--gap" as string]: `${moment.gap}px` }}>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
            <Frame photo={moment.photo} fill sizes="(max-width: 767px) 72vw, 280px" />
          </li>
        ))}
      </ol>
    </section>
  );
}
