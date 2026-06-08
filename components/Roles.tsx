"use client";
import { useState } from "react";
import Mark from "./Mark";

type Role = "creator" | "customer" | "merchant";

const DATA: Record<
  Role,
  { color: string; tint: string; tag: string; title: string; body: string; say: string; cta: string }
> = {
  creator: {
    color: "#f079a6",
    tint: "#fdeff5",
    tag: "Creator",
    title: "Stamp your hibi.",
    body:
      "Post the place you actually go. When someone walks in and scans, the visit is yours — verified, attributable, paid. No codes, no link in bio, no vanity reach.",
    say: '"I\'m stamping my hibi at Oslo." — the block I belong to.',
    cta: "Become a creator",
  },
  customer: {
    color: "#52b6dd",
    tint: "#eef7fb",
    tag: "Customer",
    title: "Belong without trying.",
    body:
      "Scan once at the register. Come back. Day by day, the places you already love become a quiet membership — no points, no spam, no spin-to-win.",
    say: "日々、ひとつずつ。 — one visit at a time.",
    cta: "Find your hibis",
  },
  merchant: {
    color: "#f5854a",
    tint: "#fdf2ea",
    tag: "Merchant",
    title: "Pay only when they hibi.",
    body:
      "The customer who walks in every Tuesday is finally a number you can see — and pay for. From walk-by to regular, measurable. Your regulars, on the books.",
    say: "From walk-by to regular — measurable.",
    cta: "Become a hibi",
  },
};

export default function Roles() {
  const [active, setActive] = useState<Role>("creator");
  const d = DATA[active];
  const roles: Role[] = ["creator", "customer", "merchant"];

  return (
    <section className="section roles">
      <div className="wrap">
        <div className="head">
          <h2 className="title">One rail, three sides of the block.</h2>
          <p className="subtitle">The same visit means something different to everyone.</p>
        </div>

        <div className="tabs">
          {roles.map((r) => (
            <button
              key={r}
              className="tab"
              data-tab={r}
              data-on={active === r}
              onClick={() => setActive(r)}
            >
              {DATA[r].tag}
            </button>
          ))}
        </div>

        <div className="panel">
          <div>
            <div className="ptag" style={{ color: d.color }}>{d.tag}</div>
            <h3 className="title">{d.title}</h3>
            <p className="body">{d.body}</p>
            <div className="say" style={{ borderLeft: `2px solid ${d.color}` }}>{d.say}</div>
            <a className="btn btn-primary" href="#">{d.cta}</a>
          </div>
          <div className="pv" style={{ background: d.tint }}>
            <Mark size={116} color={d.color} />
          </div>
        </div>
      </div>
    </section>
  );
}
