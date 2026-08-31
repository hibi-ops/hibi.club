import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // pure static site → Vercel / Cloudflare Pages / GitHub Pages / any CDN
  trailingSlash: true,       // /en/merchants/ → out/en/merchants/index.html (works on every static host)
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: root,
  webpack: (config) => {
    config.resolve.alias['@'] = root; // mirrors tsconfig "paths"
    return config;
  },
};
export default nextConfig;
