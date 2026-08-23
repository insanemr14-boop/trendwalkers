import fs from 'fs';
let s = fs.readFileSync('index.html','utf8');
const start = s.indexOf('id="portfolio"');
const end   = s.indexOf('Benefits of hiring Trend Walkers');
if (start < 0 || end < 0 || end <= start) throw new Error('portfolio section not located');
const head = s.slice(0, start), mid = s.slice(start, end), tail = s.slice(end);
const targets = ['/portfolio-graphic','/portfolio-social-media','/portfolio-content-creation','/portfolio-photoshoot'];
let n = 0;
const patched = mid.replace(/<a href="javascript:void\(0\)" class="button button-secondary" data-bs-toggle="modal" data-bs-target="#boost-modal">/g,
  () => `<a href="${targets[n++]}" class="button button-secondary">`);
if (n !== 4) throw new Error('expected 4 portfolio buttons inside the section, patched ' + n);
fs.writeFileSync('index.html', head + patched + tail);
console.log('portfolio buttons wired inside the section only:', n);
