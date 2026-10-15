import { StarIcon } from "@/components/icons";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/content/site";
import { reviews } from "@/content/voice";

/** Literal extracts of public Google reviews, with author initial and a link to all of them. */
export function Reviews() {
  return (
    <section className="sec" aria-labelledby="opiniones-title">
      <div className="wrap">
        <SectionHead id="opiniones-title" kicker="Opiniones en Google" title="Lo que dicen los clientes">
          <p className="muted">
            Extractos literales de opiniones públicas. {site.google.rating} de 5 con {site.google.reviewCount} opiniones,
            consultado el {site.google.checkedOn}. Google indica que las reseñas no se verifican.
          </p>
        </SectionHead>
        <div className="reviews" data-reveal>
          {reviews.map((review) => (
            <blockquote key={review.author} className="review">
              <span className="review__mark" aria-hidden>
                “
              </span>
              <p>{review.opening}</p>
              <p>{review.body[0]}</p>
              <footer>
                <cite>{review.author}</cite>
                <span>{review.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p style={{ marginTop: 36, textAlign: "center" }}>
          <a href={site.links.googleMaps} className="g-badge" target="_blank" rel="noopener">
            <StarIcon /> Leer las {site.google.reviewCount} opiniones en Google
          </a>
        </p>
      </div>
    </section>
  );
}
