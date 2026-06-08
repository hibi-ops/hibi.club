import Hero from "@/components/Hero";
import Roles from "@/components/Roles";
import Chapter from "@/components/Chapter";
import Stat from "@/components/Stat";
import SmoothScroll from "@/components/three/SmoothScroll";
import DayBackdrop from "@/components/three/DayBackdrop";

export default function Home() {
  return (
    <SmoothScroll>
      {/* fixed 3D "a block's day" world (progressive enhancement) */}
      <DayBackdrop />

      <div className="home-3d">
        <Hero />
        <Roles />

        <div className="divider">Posted · Scanned · Verified ·</div>

        <Chapter
          variant="visit"
          eyebrow="01 — Morning"
          color="var(--sky)"
          word="VISIT"
          sub="A creator posts the matcha shop on the corner. Someone walks in the next morning. The day begins with a real footstep — not a click."
        />
        <Chapter
          variant="stamp"
          eyebrow="02 — Midday"
          color="var(--orange)"
          word="STAMP"
          sub="At the register, they scan. One day, stamped. The merchant pays only for this — a verified visit, not an impression."
        />
        <Chapter
          variant="belong"
          eyebrow="03 — Dusk"
          color="var(--green)"
          word="BELONG"
          sub="Fifty days in, they're a regular — and they belong to this block, measurably. The day closes. Tomorrow, another stamp. 日々."
        />

        <Stat />

        <div className="divider">End of day · Hibi ·</div>
      </div>
    </SmoothScroll>
  );
}
