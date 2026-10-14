type Item = { q: string; a: string };

/** Answers as reading text: each question is the run-in of its own paragraph. */
export function FaqText({ items, title = "Preguntas", id = "preguntas" }: { items: Item[]; title?: string; id?: string }) {
  return (
    <section className="section bg-ice" aria-labelledby={`${id}-title`} id={id}>
      <div className="wrap grid-12" data-reveal>
        <h2 id={`${id}-title`} className="t-h2 faq__title">
          {title}
        </h2>
        <div className="faq__text">
          {items.map((item) => (
            <p key={item.q}>
              <strong>{item.q}</strong> {item.a}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
