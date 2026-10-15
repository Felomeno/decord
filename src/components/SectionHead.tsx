import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  title: string;
  children?: ReactNode;
  /** Element shown at the right edge on wide screens (usually a link to the full list). */
  action?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
};

export function SectionHead({ id, kicker, title, children, action, center, as: Tag = "h2" }: Props) {
  return (
    <div className={`sec-head${center ? " center" : ""}`} data-reveal>
      <div className="sec-head__text">
        <p className="kicker">{kicker}</p>
        <Tag id={id} className={`${Tag === "h1" ? "h1" : "h2"} accent-bar`}>
          {title}
        </Tag>
        {children}
      </div>
      {action}
    </div>
  );
}
