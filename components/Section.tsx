import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** background tone — snow (default) or paper */
  tone?: "snow" | "paper";
  /** extra class names */
  className?: string;
  id?: string;
};

/**
 * Canonical section wrapper (HANDOFF §10.3): --s9/--s7 vertical padding via
 * `.section`, 1120px container via `.wrap`. Use for every page section so
 * spacing stays on the 8px scale.
 */
export default function Section({
  children,
  tone = "snow",
  className = "",
  id,
}: Props) {
  const cls = ["section", tone === "paper" ? "tone-paper" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls}>
      <div className="wrap">{children}</div>
    </section>
  );
}
