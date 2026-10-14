import Link from "next/link";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

export function PageHead({ title, lead, crumbs }: { title: string; lead?: ReactNode; crumbs: Crumb[] }) {
  const trail = [{ name: "Inicio", path: "/" }, ...crumbs];
  return (
    <header className="page-head bg-paper">
      <BreadcrumbJsonLd items={trail} />
      <div className="wrap">
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
        <div className="grid-12" data-reveal>
          <h1 className="t-h2 page-head__title" style={{ fontSize: "var(--step-h2)" }}>
            {title}
          </h1>
          {lead ? <div className="t-lead page-head__lead">{lead}</div> : null}
        </div>
      </div>
    </header>
  );
}
