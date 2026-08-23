#!/bin/bash
# Assembles static pages from _src/body-*.html + shared parts in _src/. No deps.
set -e
cd "$(dirname "$0")"
for f in _src/body-*.html; do
  page="$(basename "${f#_src/body-}")"
  title=$(sed -n '1s/^<!--title:\(.*\)-->$/\1/p' "$f")
  desc=$(sed -n  '2s/^<!--desc:\(.*\)-->$/\1/p'  "$f")
  canon=$(sed -n '3s/^<!--canon:\(.*\)-->$/\1/p' "$f")
  [ -n "$title" ] && [ -n "$desc" ] && [ -n "$canon" ] || { echo "MISSING META in $f"; exit 1; }
  {
    echo '<!doctype html><html lang="en"><head>'
    echo "<title>${title}</title>"
    echo "<meta name=\"description\" content=\"${desc}\">"
    echo "<link rel=\"canonical\" href=\"https://trendwalkers.dpdns.org${canon}\">"
    echo "<meta property=\"og:title\" content=\"${title}\">"
    echo "<meta property=\"og:description\" content=\"${desc}\">"
    echo '<meta property="og:type" content="website">'
    echo "<meta property=\"og:url\" content=\"https://trendwalkers.dpdns.org${canon}\">"
    echo '<meta property="og:image" content="https://trendwalkers.dpdns.org/logo.svg">'
    echo '<meta name="twitter:card" content="summary_large_image">'
    cat _src/_head.part
    cat _src/_schema.part
    echo '</head><body>'
    cat _src/_header.part
    tail -n +4 "$f"
    cat _src/_footer.part
    echo '</body></html>'
  } > "$page"
done
echo "built: $(ls -1 *.html | tr '\n' ' ')"
