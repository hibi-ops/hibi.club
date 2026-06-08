import type { CSSProperties } from "react";

type Props = { size?: number; color?: string; style?: CSSProperties; className?: string };

/** The Hibi mark. `color` sets the --mc token (default ink). Needs <MarkDefs/> in the tree. */
export default function Mark({ size = 56, color, style, className }: Props) {
  const s: CSSProperties = { ...(color ? ({ ["--mc" as any]: color }) : {}), ...style };
  return (
    <svg width={size} height={size} style={s} className={className} aria-hidden="true">
      <use href="#hibi-mk" />
    </svg>
  );
}
