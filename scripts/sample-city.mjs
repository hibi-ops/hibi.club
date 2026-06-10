/**
 * Offline city-point-cloud baker.
 *
 * Reads the city GLB, area-weighted-samples N points on all triangle
 * surfaces (world-transformed), normalises (centred, ground at y=0, fixed
 * footprint), quantises to Int16 and writes:
 *   public/city-points.bin   (Int16 xyz triplets, little-endian)
 *   public/city-points.json  ({ count, maxAbs })
 *
 * The site then ships ~N*6 bytes instead of the 2.4 MB GLB + textures —
 * no GLTF parsing at runtime, instant on phones.
 *
 * Usage: node scripts/sample-city.mjs [glbPath] [count]
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { writeFileSync } from "node:fs";

const GLB =
  process.argv[2] ??
  "/Users/jiamingw/Documents/3D Assests/Hibi:web/hibi:web:home:city.glb";
const COUNT = Number(process.argv[3] ?? 80000);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(GLB);
const root = doc.getRoot();

// gather world-space triangles
const tris = []; // { a, b, c, area }
let totalArea = 0;

function xfm(m, v) {
  const [x, y, z] = v;
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const world = node.getWorldMatrix();
  for (const prim of mesh.listPrimitives()) {
    if (prim.getMode() !== 4) continue; // TRIANGLES only
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
      const cx = ab[1] * ac[2] - ab[2] * ac[1];
      const cy = ab[2] * ac[0] - ab[0] * ac[2];
      const cz = ab[0] * ac[1] - ab[1] * ac[0];
      const area = Math.hypot(cx, cy, cz) / 2;
      if (area <= 0 || !isFinite(area)) continue;
      tris.push({ a, b, c, area });
      totalArea += area;
    }
  }
}
console.log(`triangles: ${tris.length}, total area: ${totalArea.toFixed(2)}`);

// cumulative areas for binary search
const cum = new Float64Array(tris.length);
let acc = 0;
for (let i = 0; i < tris.length; i++) {
  acc += tris[i].area;
  cum[i] = acc;
}

function pickTri() {
  const r = Math.random() * totalArea;
  let lo = 0,
    hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < r) lo = mid + 1;
    else hi = mid;
  }
  return tris[lo];
}

// area-weighted surface sampling + baked directional light (from the
// triangle's geometric normal -> real shading on the dust = "光感")
const SUN = (() => {
  const v = [0.55, 0.65, 0.52];
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
})();
const pts = new Float64Array(COUNT * 3);
const light = new Uint8Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const { a, b, c } = pickTri();
  let u = Math.random();
  let v = Math.random();
  if (u + v > 1) {
    u = 1 - u;
    v = 1 - v;
  }
  pts[i * 3] = a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * v;
  pts[i * 3 + 1] = a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * v;
  pts[i * 3 + 2] = a[2] + (b[2] - a[2]) * u + (c[2] - a[2]) * v;
  // geometric normal (abs dot — winding-agnostic), 0.30 ambient floor
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  let nx = ab[1] * ac[2] - ab[2] * ac[1];
  let ny = ab[2] * ac[0] - ab[0] * ac[2];
  let nz = ab[0] * ac[1] - ab[1] * ac[0];
  const nl = Math.hypot(nx, ny, nz) || 1;
  nx /= nl; ny /= nl; nz /= nl;
  const d = Math.abs(nx * SUN[0] + ny * SUN[1] + nz * SUN[2]);
  light[i] = Math.round(Math.min(1, 0.3 + 0.7 * d) * 255);
}

// normalise: centre xz, ground y=0, footprint max(width, depth) = 4.6
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
console.log(`normalised: footprint 4.6, height ${((maxY - minY) * s).toFixed(2)}, maxAbs ${maxAbs.toFixed(3)}`);

// quantise Int16; bin layout = Int16 xyz triplets, then Uint8 light bytes
const q = new Int16Array(COUNT * 3);
for (let i = 0; i < COUNT * 3; i++) q[i] = Math.round((pts[i] / maxAbs) * 32767);

const out = Buffer.concat([Buffer.from(q.buffer), Buffer.from(light.buffer)]);
writeFileSync("public/city-points.bin", out);
writeFileSync(
  "public/city-points.json",
  JSON.stringify({ count: COUNT, maxAbs, light: true })
);
console.log(`wrote public/city-points.bin (${(out.length / 1024).toFixed(0)} KB) + city-points.json`);
