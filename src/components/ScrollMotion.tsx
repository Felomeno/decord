"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
// Selectors are shared across routes; a page without one of them is expected, not an error.
gsap.config({ nullTargetWarn: false });

/** Cards that enter in a staggered batch. */
const CARDS = ".why-grid > *, .svc-grid > *, .proj-grid > *, .process > *, .reviews > *, .cards > *";
/** Photos that are revealed through a mask when they are not part of a card. */
const PHOTOS = "main .frame";
const SKIP_PHOTOS = ".hero__media, .cta-final, .phead, .ba, .team-strip, .scroller";
/** Photos that also drift with the scroll; they keep a small overscale so the drift never shows an edge. */
const DRIFT = ".media-43";

const EASE = "power3.out";

/** Elements already on screen when the page loads are left alone: no flash, no delayed LCP. */
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

/**
 * Scroll choreography for the whole site, rebuilt on every route.
 *
 * Progressive enhancement only: the markup is fully visible without this component, every
 * from-state is set here at runtime, and nothing runs when the visitor asks for reduced motion.
 * Only transform, opacity and clip-path are animated. The one pinned moment (before and after)
 * is desktop-only and short.
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useGSAP(
    (_context, contextSafe) => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      const setup = contextSafe!(() => mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
        },
        (context) => {
          const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;

          // Hands the entrances over from the CSS scroll-driven fallback to GSAP.
          root.classList.add("gsap-on");

          const cards = gsap.utils.toArray<HTMLElement>(CARDS).filter(belowFold);
          const cardSet = new Set<Element>(cards);

          /* Text reveal: big headlines rise line by line out of a mask. */
          gsap.utils
            .toArray<HTMLElement>("main h2.h2")
            .filter(belowFold)
            .forEach((heading) => {
              SplitText.create(heading, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.09,
                    scrollTrigger: { trigger: heading, start: "top 88%", once: true },
                  }),
              });
            });

          /* Blocks inside a section enter one after another (heading, text, then the rest). */
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .filter(belowFold)
            .forEach((block) => {
              const parts = Array.from(block.children).filter((child) => !cardSet.has(child) && !child.matches(".ba"));
              if (!parts.length) return;
              gsap.from(parts, {
                y: 32,
                opacity: 0,
                duration: 0.9,
                ease: EASE,
                stagger: 0.08,
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: block, start: "top 86%", once: true },
              });
            });

          /* Stagger: service, project, process and review cards come in as a group. */
          gsap.set(cards, { opacity: 0, y: desktop ? 72 : 40 });
          ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: EASE,
                stagger: 0.12,
                overwrite: true,
                clearProps: "transform,opacity",
              });
              gsap.fromTo(
                batch.flatMap((card) => Array.from(card.querySelectorAll(".frame img"))),
                { scale: 1.18 },
                { scale: 1, duration: 1.4, ease: EASE, stagger: 0.12, clearProps: "transform" },
              );
            },
          });

          /* Image reveal: standalone photos open from the bottom while the picture settles. */
          gsap.utils
            .toArray<HTMLElement>(PHOTOS)
            .filter((frame) => belowFold(frame) && !frame.closest(SKIP_PHOTOS) && !cards.some((c) => c.contains(frame)))
            .forEach((frame) => {
              const img = frame.querySelector("img");
              const drifts = frame.matches(DRIFT);
              const tl = gsap.timeline({
                scrollTrigger: { trigger: frame, start: "top 88%", once: true },
                defaults: { ease: "power3.inOut" },
              });
              tl.fromTo(
                frame,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, clearProps: "clipPath" },
              );
              if (img) {
                tl.fromTo(
                  img,
                  { scale: 1.3 },
                  { scale: drifts ? 1.12 : 1, duration: 1.5, ease: EASE, clearProps: drifts ? "" : "transform" },
                  0,
                );
              }
            });

          /* Hero: the title rises line by line out of a mask, then the text, buttons and proof follow.
             CSS keeps the copy hidden until this runs (with a 2.5 s failsafe), so nothing flashes. */
          const hero = document.querySelector<HTMLElement>(".hero");
          const heroCopy = hero?.querySelector<HTMLElement>(".hero__copy");
          if (hero && heroCopy) {
            const title = heroCopy.querySelector<HTMLElement>("h1");
            const rest = Array.from(heroCopy.children).filter((child) => child !== title);
            if (title) {
              gsap.set(title, { opacity: 1 });
              SplitText.create(title, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.fromTo(
                    self.lines,
                    { yPercent: 105 },
                    { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.15 },
                  ),
              });
            }
            gsap.fromTo(
              rest,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.1, delay: 0.55, clearProps: "transform" },
            );

            /* Scroll scrub: the footage settles on load, then drifts and the copy recedes as the hero leaves. */
            const media = hero.querySelector<HTMLElement>(".hero__media");
            if (media) {
              gsap.fromTo(media, { scale: 1.12 }, { scale: 1.04, duration: 2, ease: EASE });
              gsap.to(media, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
              });
            }
            gsap.to(heroCopy, {
              y: desktop ? -110 : -50,
              opacity: 0.2,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
          }

          gsap.utils.toArray<HTMLElement>(`.phead__photo .frame img, ${DRIFT} img`).forEach((img) => {
            const frame = img.closest(".frame")!;
            gsap.set(img, { scale: 1.12 });
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                immediateRender: false,
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          const ctaImg = document.querySelector<HTMLElement>(".cta-final .frame img");
          if (ctaImg) {
            gsap.fromTo(
              ctaImg,
              { yPercent: -10, scale: 1.25 },
              {
                yPercent: 10,
                scale: 1.25,
                ease: "none",
                scrollTrigger: { trigger: ".cta-final", start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }

          /* Transitions between sections: the light section and the closing photo open out from an inset card. */
          gsap.utils.toArray<HTMLElement>(".sec--pale, .cta-final").forEach((section) => {
            gsap.fromTo(
              section,
              { clipPath: `inset(0% ${desktop ? 4 : 3}% 0% ${desktop ? 4 : 3}% round 28px)` },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "top 35%", scrub: true },
              },
            );
          });

          /* Pinned section (desktop): the before photo holds the stage, then the result opens beside it.
             Held with CSS sticky inside a taller track instead of a GSAP pin, so React keeps owning the DOM. */
          const track = document.querySelector<HTMLElement>(".ba-track");
          const ba = track?.querySelector<HTMLElement>(".ba");
          if (desktop && track && ba) {
            // Centred under the sticky header when it fits; otherwise aligned to the bottom of the screen.
            const top = () => {
              const free = window.innerHeight - ba.offsetHeight;
              return free > 140 ? Math.round(Math.max(92, free / 2 + 38)) : free - 24;
            };
            const place = () => ba.style.setProperty("--ba-top", `${top()}px`);
            place();
            gsap.fromTo(
              ba,
              { "--ba-p": 0 },
              {
                "--ba-p": 1,
                ease: "none",
                scrollTrigger: {
                  trigger: track,
                  start: () => `top ${top()}px`,
                  end: () => `bottom ${top() + ba.offsetHeight}px`,
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                  onRefreshInit: place,
                },
              },
            );
          }

          return () => root.classList.remove("gsap-on");
        },
      ));

      // React hydrates Suspense boundaries in later tasks than this layout component. Touching
      // their markup earlier makes hydration mismatch, so start once every section is hydrated.
      let frame = 0;
      const startedAt = performance.now();
      const waitForHydration = () => {
        const pending = Array.from(document.querySelectorAll("main section, main header")).some(
          (el) => !Object.keys(el).some((key) => key.startsWith("__reactFiber")),
        );
        if (pending && performance.now() - startedAt < 3000) frame = requestAnimationFrame(waitForHydration);
        else setup();
      };
      waitForHydration();

      // Photos and fonts change heights after first paint; measure again once they settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
