import fs from 'fs';

const MARK = `<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="13" fill="#D64218"/><g fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 46 C 22 46, 24 32, 32 28 C 39 24.5, 43 22, 50 17"/><path d="M43.5 16.2 L50.5 16.6 L50 23.6"/></g><circle cx="13" cy="46" r="3.4" fill="#fff"/></svg>`;

const DECKS = JSON.parse(fs.readFileSync('folio.json','utf8'));
const pct = n => (n*100).toFixed(2) + '%';

function overlay(p){
  const [l,t,r,b] = p.bbox;
  const st = `left:${pct(l)};top:${pct(t)};width:${pct(r-l)};height:${pct(b-t)};background:${p.bg}`;
  let inner = '';
  if (p.mark) inner = MARK;
  else if (p.text) inner = `<span class="folio-patch-text">${p.text}</span>`;
  return `\n          <span class="folio-patch${p.text?' is-text':''}" style="${st}">${inner}</span>`;
}

function page(deck, n){
  const slug = deck.slug, num = String(n).padStart(2,'0');
  const patches = (deck.patches||{})[n] || [];
  return `        <figure class="folio-page">
          <img class="folio-shot" src="/img/portfolio/${slug}-${num}.jpg" alt="${deck.title} portfolio, page ${n}" width="1920" height="1080" loading="lazy" decoding="async">${patches.map(overlay).join('')}
        </figure>`;
}

for (const deck of DECKS){
  const pages = [];
  for (let n=1; n<=deck.pages; n++) pages.push(page(deck,n));
  fs.writeFileSync(`_src/body-portfolio-${deck.slug}.html`,
`<!--title:${deck.title} Portfolio | Trend Walkers-->
<!--desc:${deck.desc}-->
<!--canon:/portfolio-${deck.slug}-->

<section class="spacer-xl">
  <div class="wrap">
    <p class="eyebrow">Portfolio</p>
    <h1>${deck.title}</h1>
    <p class="lead folio-intro">${deck.intro}</p>
    <p><a href="/portfolio">&larr; All work</a></p>
    <div class="folio-deck">
${pages.join('\n')}
    </div>
    <p style="margin-top:36px"><a class="btn btn-primary" href="/contact">Start a project like this</a></p>
  </div>
</section>`);
  const np = Object.values(deck.patches||{}).flat().length;
  console.log(`portfolio-${deck.slug}: ${deck.pages} pages, ${np} overlays`);
}

const cards = DECKS.map(d=>`      <a class="folio-card" href="/portfolio-${d.slug}">
        <img src="/img/portfolio/${d.slug}-${String(d.cover).padStart(2,'0')}.jpg" alt="${d.title}" width="1920" height="1080" loading="lazy" decoding="async">
        <span class="folio-meta"><h3>${d.title}</h3><p>${d.desc}</p></span>
      </a>`).join('\n');
fs.writeFileSync('_src/body-portfolio.html',
`<!--title:Portfolio | Trend Walkers-->
<!--desc:Selected Trend Walkers work across graphic design, social media, content creation and product photography.-->
<!--canon:/portfolio-->

<section class="spacer-xl">
  <div class="wrap">
    <p class="eyebrow">Portfolio</p>
    <h1>Take a look at what we do</h1>
    <p class="lead folio-intro">Selected work across design, social, content and product photography.</p>
    <div class="folio-grid">
${cards}
    </div>
  </div>
</section>`);
console.log('portfolio index written');
