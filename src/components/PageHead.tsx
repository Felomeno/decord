import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/content/images";
import { Frame } from "./Frame";
import { BreadcrumbJsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

type Props = {
  title: string;
  kicker?: string;
  lead?: ReactNode;
  crumbs: Crumb[];
  /** Real job photo shown beside the title. */
  photo?: Photo;
  actions?: ReactNode;
  /** Hide the photo on phones, where the task (a form) should come first. */
  photoDesktopOnly?: boolean;
};

export function PageHead({ title, kicker, lead, crumbs, photo, actions, photoDesktopOnly }: Props) {
  const trail = [{ name: "Inicio", path: "/" }, ...crumbs];
  const natural = photo ? photo.width < 1000 : false;
  return (
    <header className="phead">
      <BreadcrumbJsonLd items={trail} />
      <div className="wrap phead__grid">
        <div className="phead__text">
          <nav className="crumbs" aria-label="Migas de pan">
            <ol>
              {trail.map((crumb, i) => (
                <li key={crumb.path}>
                  {i < trail.length - 1 ? (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  ) : (
                    <span aria-current="page">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h1 className="h1 accent-bar">{title}</h1>
          {lead ? <div className="lead phead__lead">{lead}</div> : null}
          {actions ? (
            <div className="btn-row" style={{ marginTop: 28 }}>
              {actions}
            </div>
          ) : null}
        </div>
        {photo ? (
          <div className={`phead__photo${natural ? " phead__photo--natural" : ""}${photoDesktopOnly ? " phead__photo--desk" : ""}`}>
            {natural ? (
              <Frame photo={photo} height={480} sizes="360px" priority />
            ) : (
              <Frame photo={photo} fill sizes="(max-width: 899px) 100vw, 45vw" priority />
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
