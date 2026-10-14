import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/content/images";
import { Frame } from "./Frame";
import { BreadcrumbJsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

type Props = {
  title: string;
  lead?: ReactNode;
  crumbs: Crumb[];
  /** Real job photo that carries the first screen. */
  photo?: Photo;
  /** Short titles (one or two words) are set at display size. */
  large?: boolean;
};

export function PageHead({ title, lead, crumbs, photo, large }: Props) {
  const trail = [{ name: "Inicio", path: "/" }, ...crumbs];
  return (
    <header className={`page-head bg-paper${photo ? " page-head--photo" : ""}`}>
      <BreadcrumbJsonLd items={trail} />
      <div className="wrap grid-12 page-head__grid">
        <div className="page-head__text" data-reveal>
          <nav className="crumbs" aria-label="Migas de pan">
            <ol>
              {trail.map((crumb, i) => (
                <li key={crumb.path}>
                  {i < trail.length - 1 ? (
                    <Link href={crumb.path} className="plain-link">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className={large ? "t-display" : "t-h2"}>{title}</h1>
          {lead ? <div className="t-lead page-head__lead">{lead}</div> : null}
        </div>
        {photo ? (
          photo.width >= 1000 ? (
            <div className="page-head__photo">
              <Frame photo={photo} fill sizes="(max-width: 1023px) 100vw, 50vw" priority />
            </div>
          ) : (
            <div className="page-head__photo page-head__photo--natural">
              <Frame photo={photo} height={640} sizes={`${photo.width}px`} priority />
            </div>
          )
        ) : null}
      </div>
    </header>
  );
}
