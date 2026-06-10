"use client";
import { useState } from "react";

type QA = { q: string; a: string };

/** Accordion in the unified glass language. One item open at a time. */
export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div key={it.q} className="faq-item" data-open={open === i}>
          <button
            type="button"
            className="faq-q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{it.q}</span>
            <span className="faq-x" aria-hidden>
              +
            </span>
          </button>
          <div className="faq-a">
            <div className="faq-a-inner">
              <p className="body">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
