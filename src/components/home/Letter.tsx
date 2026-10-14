import { site } from "@/content/site";
import { reviews } from "@/content/voice";

/** One long letter: a customer's own words given room, then two shorter ones. */
export function Letter({ flushTop = false }: { flushTop?: boolean }) {
  const [main, ...others] = reviews;
  return (
    <section className="section bg-paper" aria-labelledby="carta-title" style={flushTop ? { paddingTop: 0 } : undefined}>
      <div className="wrap grid-12">
        <div className="letter__aside" data-reveal>
          <h2 id="carta-title" className="t-small" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>
            Lo que cuentan los clientes
          </h2>
        </div>
        <blockquote className="letter" data-reveal>
          <p className="letter__opening">{main.opening}</p>
          {main.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <footer className="letter__sign">
            <cite style={{ fontStyle: "normal", fontWeight: 600 }}>{main.author}</cite>
            <br />
            <span className="t-muted">{main.context}</span>
          </footer>
        </blockquote>
        <div className="letter__others" data-reveal>
          {others.map((review) => (
            <blockquote key={review.author} style={{ margin: 0 }}>
              <p>
                {review.opening} {review.body.join(" ")}
              </p>
              <footer className="t-small" style={{ marginTop: 12 }}>
                <cite style={{ fontStyle: "normal", fontWeight: 600 }}>{review.author}</cite>
                <span className="t-muted">, {review.context.toLowerCase()}</span>
              </footer>
            </blockquote>
          ))}
          <p className="t-small" style={{ gridColumn: "1 / -1" }}>
            Extractos literales de opiniones públicas.{" "}
            <a href={site.links.googleMaps} className="prose-link" target="_blank" rel="noopener">
              Leer las {site.google.reviewCount} opiniones en Google ({site.google.rating} de 5)
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
