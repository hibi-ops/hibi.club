/**
 * Offline city-point-cloud baker (surface + crease-edge sampling).
 *
 * Reads the city GLB, then:
 *  1) area-weighted-samples SURFACE points on all world-transformed
 *     triangles, with a baked per-point directional-light byte;
 *  2) length-weighted-samples EDGE points along crease edges (dihedral
 *     angle > ~28°) and boundary/silhouette edges — densest ink (light=0),
 *     so every corner of every building reads as a drawn line.
 *
 * Normalises (centred, ground y=0, fixed footprint), quantises Int16 and
 * writes:
 *   public/city-points.bin   (Int16 xyz triplets, then Uint8 light bytes)
 *   public/city-points.json  ({ count, maxAbs, light: true })
 *
 * Usage: node scripts/sample-city.mjs [glbPath] [surfaceCount] [edgeCount]
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { writeFileSync } from "node:fs";

const GLB =
  process.argv[2] ??
  "/Users/jiamingw/Documents/3D Assests/Hibi:web/hibi:web:home:downtown.glb";
const SURFACE = Number(process.argv[3] ?? 660000);
const EDGE = Number(process.argv[4] ?? 140000);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(GLB);
const root = doc.getRoot();

function xfm(m, v) {
  const [x, y, z] = v;
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

// ---- gather world-space triangles (with unit normals) ----
const tris = []; // { a, b, c, area, n }
let totalArea = 0;

for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const world = node.getWorldMatrix();
  for (const prim of mesh.listPrimitives()) {
    if (prim.getMode() !== 4) continue;
    const pos = prim.getAttribute("POSITION");
    if (!pos) continue;
    const idx = prim.getIndices();
    const readV = (i) => xfm(world, pos.getElement(i, []));
    const triCount = idx ? idx.getCount() / 3 : pos.getCount() / 3;
    for (let t = 0; t < triCount; t++) {
      const i0 = idx ? idx.getScalar(t * 3) : t * 3;
      const i1 = idx ? idx.getScalar(t * 3 + 1) : t * 3 + 1;
      const i2 = idx ? idx.getScalar(t * 3 + 2) : t * 3 + 2;
      const a = readV(i0);
      const b = readV(i1);
      const c = readV(i2);
      const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
      const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      let nx = ab[1] * ac[2] - ab[2] * ac[1];
      let ny = ab[2] * ac[0] - ab[0] * ac[2];
      let nz = ab[0] * ac[1] - ab[1] * ac[0];
      const nl = Math.hypot(nx, ny, nz);
      const area = nl / 2;
      if (area <= 1e-12 || !isFinite(area)) continue;
      nx /= nl; ny /= nl; nz /= nl;
      tris.push({ a, b, c, area, n: [nx, ny, nz] });
      totalArea += area;
    }
  }
}
console.log(`triangles: ${tris.length}, total area: ${totalArea.toFixed(2)}`);

// ---- crease / boundary edge detection ----
const qk = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)},${p[2].toFixed(3)}`;
const edgeMap = new Map(); // key -> { a, b, normals: [] }
for (const t of tris) {
  const pts = [t.a, t.b, t.c];
  for (let e = 0; e < 3; e++) {
    const p = pts[e];
    const q = pts[(e + 1) % 3];
    const k1 = qk(p);
    const k2 = qk(q);
    const key = k1 < k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
    let rec = edgeMap.get(key);
    if (!rec) {
      rec = { a: p, b: q, normals: [] };
      edgeMap.set(key, rec);
    }
    rec.normals.push(t.n);
  }
}
const CREASE_DOT = Math.cos((28 * Math.PI) / 180);
const creases = []; // { a, b, len }
let totalLen = 0;
for (const rec of edgeMap.values()) {
  let crease = rec.normals.length === 1; // boundary / silhouette
  if (!crease) {
    outer: for (let i = 0; i < rec.normals.length; i++) {
      for (let j = i + 1; j < rec.normals.length; j++) {
        const d =
          rec.normals[i][0] * rec.normals[j][0] +
          rec.normals[i][1] * rec.normals[j][1] +
          rec.normals[i][2] * rec.normals[j][2];
        if (Math.abs(d) < CREASE_DOT) {
          crease = true;
          break outer;
        }
      }
    }
  }
  if (!crease) continue;
  const len = Math.hypot(
    rec.b[0] - rec.a[0],
    rec.b[1] - rec.a[1],
    rec.b[2] - rec.a[2]
  );
  if (len <= 1e-9) continue;
  creases.push({ a: rec.a, b: rec.b, len });
  totalLen += len;
}
console.log(`crease/boundary edges: ${creases.length}, total length: ${totalLen.toFixed(1)}`);

// ---- cumulative tables ----
const cumA = new Float64Array(tris.length);
{
  let acc = 0;
  for (let i = 0; i < tris.length; i++) {
    acc += tris[i].area;
    cumA[i] = acc;
  }
}
const cumL = new Float64Array(creases.length);
{
  let acc = 0;
  for (let i = 0; i < creases.length; i++) {
    acc += creases[i].len;
    cumL[i] = acc;
  }
}
const bsearch = (arr, r) => {
  let lo = 0,
    hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < r) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

// ---- sample ----
const SUN = (() => {
  const v = [0.55, 0.65, 0.52];
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
})();
const COUNT = SURFACE + EDGE;
const pts = new Float64Array(COUNT * 3);
const light = new Uint8Array(COUNT);

for (let i = 0; i < SURFACE; i++) {
  const t = tris[bsearch(cumA, Math.random() * totalArea)];
  let u = Math.random();
  let v = Math.random();
  if (u + v > 1) {
    u = 1 - u;
    v = 1 - v;
  }
  pts[i * 3] = t.a[0] + (t.b[0] - t.a[0]) * u + (t.c[0] - t.a[0]) * v;
  pts[i * 3 + 1] = t.a[1] + (t.b[1] - t.a[1]) * u + (t.c[1] - t.a[1]) * v;
  pts[i * 3 + 2] = t.a[2] + (t.b[2] - t.a[2]) * u + (t.c[2] - t.a[2]) * v;
  const d = Math.abs(t.n[0] * SUN[0] + t.n[1] * SUN[1] + t.n[2] * SUN[2]);
  light[i] = Math.round(Math.min(1, 0.3 + 0.7 * d) * 255);
}
for (let i = 0; i < EDGE; i++) {
  const e = creases[bsearch(cumL, Math.random() * totalLen)];
  const t = Math.random();
  const o = (SURFACE + i) * 3;
  pts[o] = e.a[0] + (e.b[0] - e.a[0]) * t;
  pts[o + 1] = e.a[1] + (e.b[1] - e.a[1]) * t;
  pts[o + 2] = e.a[2] + (e.b[2] - e.a[2]) * t;
  light[SURFACE + i] = 0; // corners drawn in the densest ink
}

// ---- normalise: centre xz, ground y=0, footprint 4.6 ----
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
for (let i = 0; i < COUNT; i++) {
  minX = Math.min(minX, pts[i * 3]); maxX = Math.max(maxX, pts[i * 3]);
  minY = Math.min(minY, pts[i * 3 + 1]); maxY = Math.max(maxY, pts[i * 3 + 1]);
  minZ = Math.min(minZ, pts[i * 3 + 2]); maxZ = Math.max(maxZ, pts[i * 3 + 2]);
}
const cx0 = (minX + maxX) / 2;
const cz0 = (minZ + maxZ) / 2;
const s = 4.6 / Math.max(maxX - minX, maxZ - minZ);
let maxAbs = 0;
for (let i = 0; i < COUNT; i++) {
  pts[i * 3] = (pts[i * 3] - cx0) * s;
  pts[i * 3 + 1] = (pts[i * 3 + 1] - minY) * s;
  pts[i * 3 + 2] = (pts[i * 3 + 2] - cz0) * s;
  maxAbs = Math.max(maxAbs, Math.abs(pts[i * 3]), Math.abs(pts[i * 3 + 1]), Math.abs(pts[i * 3 + 2]));
}
console.log(`normalised: footprint 4.6, maxAbs ${maxAbs.toFixed(3)}`);

// ---- quantise + write (Int16 xyz, then Uint8 light) ----
const q = new Int16Array(COUNT * 3);
for (let i = 0; i < COUNT * 3; i++) q[i] = Math.round((pts[i] / maxAbs) * 32767);
const out = Buffer.concat([Buffer.from(q.buffer), Buffer.from(light.buffer)]);
writeFileSync("public/city-points.bin", out);
writeFileSync(
  "public/city-points.json",
  JSON.stringify({ count: COUNT, maxAbs, light: true })
);
console.log(
  `wrote public/city-points.bin (${(out.length / 1024).toFixed(0)} KB): ${SURFACE} surface + ${EDGE} edge points`
);
