/** Infinite horizontal marquee of big Magvix-italic text. Pure CSS loop. */
export default function Marquee({
  text,
  reps = 4,
  dur = 28,
  accent,
}: {
  text: string;
  reps?: number;
  dur?: number;
  accent?: string; // a word to tint with the green accent
}) {
  const phrase = Array.from({ length: reps }, () => text).join("");
  const seg = (key: number) => (
    <span className="marquee-seg" key={key}>
      {phrase}
      {accent ? <span className="marquee-accent">{accent} </span> : null}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${dur}s` }}>
        {seg(0)}
        {seg(1)}
      </div>
    </div>
  );
}
