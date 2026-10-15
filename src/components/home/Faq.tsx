import { SectionHead } from "@/components/SectionHead";

type Item = { q: string; a: string };

type Props = {
  items: Item[];
  id?: string;
  title?: string;
  pale?: boolean;
};

/** Native disclosure list: works without script and with the keyboard. */
export function Faq({ items, id = "preguntas", title = "Preguntas frecuentes", pale = true }: Props) {
  return (
    <section className={`sec${pale ? " sec--pale on-pale" : " sec--alt"}`} aria-labelledby={`${id}-title`} id={id}>
      <div className="wrap">
        <SectionHead id={`${id}-title`} kicker="Dudas" title={title} />
        <div className="faq" data-reveal>
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
