import { Frame } from "@/components/Frame";
import { SectionHead } from "@/components/SectionHead";
import type { Photo } from "@/content/images";

type Step = { title: string; text: string; photo: Photo };

type Props = {
  items: Step[];
  id?: string;
  kicker?: string;
  title?: string;
  intro?: string;
};

/** Numbered steps on the pale ground, each with a real photo of that moment. */
export function Process({ items, id = "proceso-title", kicker = "Cómo trabajamos", title = "Qué esperar", intro }: Props) {
  return (
    <section className="sec sec--pale on-pale" aria-labelledby={id}>
      <div className="wrap">
        <SectionHead id={id} kicker={kicker} title={title}>
          {intro ? <p className="muted">{intro}</p> : null}
        </SectionHead>
        <ol className="process" data-reveal>
          {items.map((step, i) => (
            <li key={step.title} className="step">
              <Frame photo={step.photo} fill sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 25vw" decorative />
              <div className="step__body">
                <span className="step__num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
