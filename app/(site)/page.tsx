import Hero from "@/components/Hero";
import Roles from "@/components/Roles";
import Stat from "@/components/Stat";
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

        <div className="divider">Posted · Scanned · Verified ·</div>

        {/* scroll-pinned chapters: VISIT -> STAMP -> BELONG */}
        <PinnedChapters />

        <Stat />

        <div className="divider">End of day · Hibi ·</div>
      </div>
    </SmoothScroll>
  );
}
