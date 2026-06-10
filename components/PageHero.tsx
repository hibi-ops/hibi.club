import type { ReactNode } from "react";
import CTAPair from "./CTAPair";

type CTA = { label: string; href: string };

type Props = {
  /** page index in the site map, e.g. "04" — rendered as "№ 04" */
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  lead?: ReactNode;
  /** render the CTA pair (default true) */
  cta?: boolean;
  primary?: CTA;
  secondary?: CTA;
  /** vertical Japanese gloss in the right margin (brand default 日々) */
  jp?: string;
};

/**
 * Editorial sub-page hero (v14 "field notes"): thick top rule with the
 * eyebrow and a № index, huge left-aligned Magvix display, italic
 * subtitle, lead, CTAs — and a ghosted vertical 日々 in the margin.
 * Every page is a numbered entry in one journal.
 */
export default function PageHero({
  index,
  eyebrow,
  title,
  subtitle,
  lead,
  cta = true,
  primary,
  secondary,
  jp = "日々",
}: Props) {
  return (
    <header className="section page-hero">
      <div className="wrap">
        <div className="ph-meta">
          <span className="eyebrow">{eyebrow}</span>
          <span className="ph-no">№ {index}</span>
        </div>
        <h1 className="title">{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {lead && <p className="lead">{lead}</p>}
        {cta && <CTAPair primary={primary} secondary={secondary} />}
        <span className="ph-jp" aria-hidden="true">
          {jp}
        </span>
      </div>
    </header>
  );
}
