import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // pure static site → Vercel / Cloudflare Pages / GitHub Pages / any CDN
  trailingSlash: true,       // /en/merchants/ → out/en/merchants/index.html (works on every static host)
  images: { unoptimized: true },
  reactStrictMode: true,
  // the little round dev badge bottom-left. Development only — it never ships
  // in the static export — but it sits on top of the page while reviewing.
  devIndicators: false,
  poweredByHeader: false,
  outputFileTracingRoot: root,
  /* DO NOT REACH FOR distDir TO KEEP `next build` OFF THE DEV SERVER'S FEET.
     Tried, measured, reverted. Both processes write .next, so building while
     `next dev` runs corrupts it and every already-compiled route starts
     answering 500 with MODULE_NOT_FOUND — and restarting dev mints a new build
     ID, so a tab open from before it 404s on its own chunks and goes blank on
     the next click. distDir does not fix that: with output:'export' it moves
     the EXPORT as well, so the site landed in .next-prod and out/ was left
     stale (which is what actually ships), and .next/BUILD_ID was rewritten by
     the build regardless. The working rule is procedural, not configural:
     stop dev, build, start dev, and reload any open tab once. */
  webpack: (config) => {
    config.resolve.alias['@'] = root; // mirrors tsconfig "paths"
    return config;
  },
};
export default nextConfig;
