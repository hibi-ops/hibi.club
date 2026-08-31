#!/usr/bin/env node
/**
 * Static hosts serve out/404.html for unmatched paths, but Next only emits
 * that file from a root-level not-found.tsx — which this app cannot have,
 * because both root layouts sit inside route groups so that /[lang] can own
 * <html lang>. The 404 is therefore built as a normal route at /404/ and
 * copied into place here.
 */
import { copyFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const out = 'out';
const from = join(out, '404', 'index.html');
const to = join(out, '404.html');

try {
  await access(from);
} catch {
  console.error(`post-build: ${from} is missing — did app/(root)/404/page.tsx build?`);
  process.exit(1);
}
await copyFile(from, to);
console.log(`post-build: ${from} → ${to}`);
