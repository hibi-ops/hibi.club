// Copy lint: fails the build check if a forbidden word appears in site copy.
// Source: 04-Strategy/CANONICAL.md §10 + AGENT-DESIGN-GUIDE.md §0.5 + 08-27 workshop verdicts.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN = [
  /\battribution\b/i, /归因/, /\bClub\b/, /No visit, no fee/i, /first to sell visits/i,
  /verified visit/i, /三信号/, /飞轮/, /闭环/, /抓手/, /颗粒度/, /赋能/, /范式/, /重塑/,
  /\bPush\b/, /Williamsburg/i, /Long Island City|LIC\b|法拉盛|Flushing|K-town|Chinatown|中国城/,
  /only pay when|只有.*才有收入|双方皆无收入/i, /按(真实|实际)?(客流|到店)(的顾客)?付费/,
];
const ALLOW_FILES = ['check-copy.mjs'];

function walk(d, out = []) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (['node_modules', '.next', 'out', '_archive', '.git'].includes(f)) continue;
    if (statSync(p).isDirectory()) walk(p, out); else if (/\.(tsx?|mdx?|html|txt|json)$/.test(f)) out.push(p);
  }
  return out;
}
let bad = 0;
for (const file of [...walk('content'), ...walk('app'), ...walk('components'), ...walk('public').filter(f => /\.(txt|html)$/.test(f))]) {
  if (ALLOW_FILES.some(a => file.endsWith(a))) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/^\s*\/\//.test(line)) return; // comments may name the rule
    for (const re of FORBIDDEN) if (re.test(line)) { console.log(`✗ ${file}:${i + 1}  ${re}  →  ${line.trim().slice(0, 100)}`); bad++; }
  });
}
if (bad) { console.error(`\n${bad} forbidden-word hit(s). See 04-Strategy/CANONICAL.md §10.`); process.exit(1); }
console.log('✓ copy check passed');
