import Link from "next/link";

type CTA = { label: string; href: string };

type Props = {
  /** primary action — always renders as the ink-filled button */
  primary?: CTA;
  /** secondary action — always renders as the glass/ghost button */
  secondary?: CTA;
  /** center the pair horizontally */
  center?: boolean;
  size?: "md" | "sm";
  className?: string;
};

/**
 * The brand CTA pair (HANDOFF §5.5): primary = --ink fill, secondary = glass.
 * CTAs always appear as a pair — a neon never fills a primary button. Buttons
 * are sentence case, General Sans (handled by .btn).
 */
export default function CTAPair({
  primary = { label: "Start for free", href: "/signup" },
  secondary = { label: "Book a demo", href: "/contact" },
  center = false,
  size = "md",
  className = "",
}: Props) {
  const sm = size === "sm" ? " btn-sm" : "";
  const cls = ["cta-pair", center ? "cta-center" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <Link className={`btn btn-primary${sm}`} href={primary.href}>
        {primary.label}
      </Link>
      <Link className={`btn btn-glass${sm}`} href={secondary.href}>
        {secondary.label}
      </Link>
    </div>
  );
}
