import Hero from "@/components/Hero";
import Roles from "@/components/Roles";
import Stat from "@/components/Stat";
import Marquee from "@/components/Marquee";
import SmoothScroll from "@/components/three/SmoothScroll";
import DayBackdrop from "@/components/three/DayBackdrop";
import PinnedChapters from "@/components/three/PinnedChapters";

export default function Home() {
  return (
    <SmoothScroll>
      {/* fixed 3D "a block's day" world (progressive enhancement) */}
      <DayBackdrop />

      <div className="home-3d">
        <Hero />
        <Roles />

        <Marquee text="Posted · Scanned · Verified · " accent="日々 ·" />

        {/* scroll-pinned chapters: VISIT -> STAMP -> BELONG */}
        <PinnedChapters />

        <Stat />

        <Marquee
          text="End of day · Hibi · "
          dur={34}
          accent="Become someone's hibi ·"
        />
      </div>
    </SmoothScroll>
  );
}
