#!/usr/bin/env bash
# Regenerate the self-hosted Noto Sans SC (Simplified Chinese sans) webfont.
# Google Fonts is unreachable from mainland China, so the subsets are vendored.
# Noto Sans SC is a variable font: 400 and 600 share the same .woff2 files.
set -euo pipefail
cd "$(dirname "$0")/.."

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36'
SRC='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600&display=swap'
OUT=public/fonts/noto-sans-sc
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

curl -fsS -A "$UA" "$SRC" -o "$TMP/nsc.css"
grep -o 'https://fonts.gstatic.com/[^)]*' "$TMP/nsc.css" | sort -u > "$TMP/urls.txt"

rm -rf "$OUT" && mkdir -p "$OUT"
export UA
( cd "$OUT" && xargs -P 12 -n 1 -I URL bash -c 'curl -fsS -A "$UA" "$0" -o "$(basename "$0")"' URL < "$TMP/urls.txt" )

{
  echo "/* Noto Sans SC 400/600, self-hosted (unicode-range subsets). Regenerate: scripts/fetch-noto-sc.sh */"
  sed -E 's#https://fonts\.gstatic\.com/s/notosanssc/v[0-9]+/#/fonts/noto-sans-sc/#g' "$TMP/nsc.css"
} > app/noto-sans-sc.css

echo "$(ls "$OUT" | wc -l | tr -d ' ') subsets, $(du -sh "$OUT" | cut -f1)"
