"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** signed distance to a rounded rectangle centred at origin */
function sdRoundRect(
  px: number,
  py: number,
  hw: number,
  hh: number,
  r: number,
) {
  const qx = Math.abs(px) - hw + r;
  const qy = Math.abs(py) - hh + r;
  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    r
  );
}

/** Generate an RGB-encoded refraction displacement map for a rounded rect. */
function makeDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezel: number,
) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x - hw;
      const py = y - hh;
      const d = -sdRoundRect(px, py, hw, hh, r); // depth inside the shape (>0)
      // refraction only in the bezel band near the edge; squircle falloff
      let mag = 0;
      if (d > 0) {
        const t = Math.min(1, d / bezel);
        const profile = Math.pow(1 - t, 1.4); // strong at edge, 0 toward centre
        mag = profile;
      }
      const len = Math.hypot(px, py) || 1;
      const nx = -px / len; // inward (toward centre)
      const ny = -py / len;
      const i = (y * w + x) * 4;
      img.data[i] = 128 + nx * mag * 127;
      img.data[i + 1] = 128 + ny * mag * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/**
 * Apple-style liquid glass: real optical refraction via an SVG displacement
 * map applied as backdrop-filter (Chromium). Non-Chromium falls back to a
 * blurred glassmorphism. Refracts whatever is BEHIND it — content stays crisp.
 */
export default function LiquidGlass({
  children,
  radius = 24,
  bezel = 18,
  scale = 70,
  blur = 2,
  className = "",
  style,
}: {
  children: ReactNode;
  radius?: number;
  bezel?: number;
  scale?: number;
  blur?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = "lg-" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [map, setMap] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const ok =
      typeof CSS !== "undefined" &&
      (CSS.supports("backdrop-filter", "url('#x')") ||
        CSS.supports("-webkit-backdrop-filter", "url('#x')"));
    setSupported(ok);
    const el = ref.current;
    if (!el || !ok) return;
    let last = "";
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 2 || h < 2) return;
      const key = `${w}x${h}`;
      if (key === last) return;
      last = key;
      setSize({ w, h });
      setMap(makeDisplacementMap(w, h, radius, bezel));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, bezel]);

  const glass: CSSProperties =
    supported && map
      ? {
          backdropFilter: `url(#${id}) saturate(1.6) brightness(1.05)`,
          WebkitBackdropFilter: `url(#${id}) saturate(1.6)`,
        }
      : {
          backdropFilter: `blur(16px) saturate(1.6)`,
          WebkitBackdropFilter: `blur(16px) saturate(1.6)`,
        };

  return (
    <div
      ref={ref}
      className={`lg ${className}`.trim()}
      style={{ borderRadius: radius, ...glass, ...style }}
    >
      {supported && map && (
        <svg className="lg-defs" aria-hidden="true" width="0" height="0">
          <filter id={id} colorInterpolationFilters="sRGB">
            <feImage
              href={map}
              x="0"
              y="0"
              width={size.w}
              height={size.h}
              result="m"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="b" />
            <feDisplacementMap
              in="b"
              in2="m"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
}
