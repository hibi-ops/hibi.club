'use client';
import { useEffect, useRef } from 'react';

/**
 * Contour field — the site's one ambient WebGL surface.
 *
 * Not a gradient: hairlines. A slowly deforming height field drawn as contour
 * lines in ink on paper, the same stroke as the column rules, the register
 * marks and the outline glyphs. The pointer raises the ground it passes over,
 * so the lines crowd around it the way contours crowd a rise.
 *
 * Colour fields date; a drawing does not. This is the survey sheet the whole
 * page is typeset on, made to move.
 *
 * Static CSS wash stays underneath as base and fallback: no WebGL, coarse
 * pointer or reduced motion simply means the ground holds still.
 *
 * variant="field" places the same instrument behind an estimator section, and
 * there it stops being ambient: the relief is DRIVEN by the walk-ins slider
 * (`hibi:relief`, the same event pattern WeekStats already uses for redeems).
 * The contour interval is fixed, so raising the number does not just make the
 * picture busier — it makes the ground steeper, and steeper ground crosses
 * more contours. More traffic, more lines. That is the job; without it this
 * would be the fourth ambient field to get torn out of this project.
 */
export default function Wash(
  { variant = 'hero', seed = 0 }: { variant?: 'hero' | 'field'; seed?: number } = {},
) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let stop = false;
    let cleanup = () => {};
    (async () => {
      const T = await import('three');
      if (stop) return;

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try {
        renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch { return; }
      // hairlines need the real pixel grid, unlike a blur field
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new T.Scene();
      const cam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uT: { value: 0 },
        uP: { value: new T.Vector2(0.5, 0.5) },
        uAspect: { value: 1 },
        /* relief. The hero sits at the baseline; a field instance is driven by
           its section's slider between 0 and 1. */
        uLevel: { value: 0.25 },
        uVariant: { value: variant === 'field' ? 1 : 0 },
        /* Every hero stands on this sheet, so without an offset all six pages
           would show the identical hill — one asset repeated, which is what a
           background looks like. The offset makes them different sheets of the
           same survey. Irrational multipliers so no two seeds land on the same
           noise lattice cell. */
        uSeed: { value: new T.Vector2(seed * 13.73, seed * 7.31) },
      };

      const mat = new T.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
        fragmentShader: /* glsl */`
          precision highp float;
          uniform float uT, uAspect, uLevel, uVariant;
          uniform vec2 uP, uSeed;
          varying vec2 vUv;

          vec2 hash(vec2 p){
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }
          float noise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(dot(hash(i), f),
                           dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
                       mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
                           dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
          }
          float terrain(vec2 p){
            float v = 0.0, a = 0.5;
            for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            vec2 p = vec2(uv.x * uAspect, uv.y) * 3.1;

            /* the contour INTERVAL is fixed below, so amplitude is the only
               thing that changes: steeper ground crosses more lines. */
            float h = terrain(p + uSeed + vec2(uT * 0.018, uT * 0.011)) * mix(0.75, 2.0, uLevel);

            /* the pointer is a rise in the ground: contours crowd around it,
               which is what a hill looks like on a survey sheet */
            vec2 d = (uv - uP) * vec2(uAspect, 1.0);
            h += 0.26 * exp(-dot(d, d) * 11.0);

            // contour lines: distance to the nearest level, in screen space
            float lines = 15.0;
            float band = h * lines;
            float dist = abs(fract(band) - 0.5) / lines;
            float w = fwidth(h) * 0.75;
            float line = 1.0 - smoothstep(w, w * 2.4, dist);

            // every fifth contour is an index line, drawn heavier
            float idx = step(0.5, abs(fract(band / 5.0) - 0.5) * 2.0 - 0.86);
            float ink = line * (0.055 + 0.075 * idx);

            /* resolve to clean paper before the copy. The hero clears its
               lower half (lead, buttons, ledger card); a field clears its left,
               where .est caps at 820px and the numbers live. */
            float mHero  = smoothstep(0.04, 0.66, uv.y)
                         * mix(1.0, 0.35, smoothstep(0.34, 1.0, uv.x));
            float mField = smoothstep(0.0, 0.30, uv.y)
                         * smoothstep(0.28, 0.92, uv.x);
            ink *= mix(mHero, mField, uVariant);

            gl_FragColor = vec4(vec3(0.082, 0.078, 0.102), ink);
          }`,
      });

      scene.add(new T.Mesh(new T.PlaneGeometry(2, 2), mat));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        uniforms.uAspect.value = w / h;
      };
      el.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const target = new T.Vector2(0.5, 0.5);
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      /* decoupled the way WeekStats listens for hibi:redeem — the calculator
         does not need a handle on the renderer, and the hero instance simply
         never hears the event. */
      let level = uniforms.uLevel.value;
      const onRelief = (e: Event) => {
        const v = (e as CustomEvent<{ level: number }>).detail?.level;
        if (typeof v === 'number') level = Math.min(1, Math.max(0, v));
      };
      if (variant === 'field') window.addEventListener('hibi:relief', onRelief);

      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
      io.observe(el);

      el.classList.add('wash-on');
      el.parentElement?.classList.add('has-wash');
      const clock = new T.Clock();
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        uniforms.uT.value = clock.getElapsedTime();
        uniforms.uP.value.lerp(target, 0.045);
        /* eased, not snapped: the ground is being surveyed, not switched */
        uniforms.uLevel.value += (level - uniforms.uLevel.value) * 0.08;
        renderer.render(scene, cam);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect(); ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('hibi:relief', onRelief);
        mat.dispose(); renderer.dispose();
        renderer.domElement.remove();
        el.classList.remove('wash-on');
        el.parentElement?.classList.remove('has-wash');
      };
    })();
    return () => { stop = true; cleanup(); };
  }, []);

  return <div ref={host} className={`wash${variant === 'field' ? ' wash-field' : ''}`} aria-hidden="true" />;
}
