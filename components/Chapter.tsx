import Mark from "./Mark";
import Reveal from "./Reveal";

type Props = { variant: "visit" | "stamp" | "belong"; eyebrow: string; color: string; word: string; sub: string };

export default function Chapter({ variant, eyebrow, color, word, sub }: Props) {
  return (
    <section className={`chapter ch-${variant}`}>
      <Reveal className="eyebrow">{eyebrow}</Reveal>
      <Reveal className="ch-seal">
        <Mark size={56} color={color} />
      </Reveal>
      <Reveal className="display">{word}</Reveal>
      <Reveal as="p" className="subtitle">{sub}</Reveal>
    </section>
  );
}
