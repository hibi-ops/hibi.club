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
  webpack: (config) => {
    config.resolve.alias['@'] = root; // mirrors tsconfig "paths"
    return config;
  },
};
export default nextConfig;
