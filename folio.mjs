import fs from 'fs';
const DECKS = JSON.parse(fs.readFileSync('folio.json','utf8'));
const pad = n => String(n).padStart(2,'0');

for (const deck of DECKS){
  // only ship pages that actually exist on disk (branded pages were removed)
  const list = deck.list.filter(n => fs.existsSync(`img/portfolio/${deck.slug}-${pad(n)}.jpg`));
  if (list.length !== deck.list.length) throw new Error(`${deck.slug}: missing image for a listed page`);
  const pages = list.map(n => `        <figure class="folio-page">
          <img class="folio-shot" src="/img/portfolio/${deck.slug}-${pad(n)}.jpg" alt="${deck.title} work by Trend Walkers" width="1920" height="1080" loading="lazy" decoding="async">
        </figure>`);
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
  console.log(`portfolio-${deck.slug}: ${list.length} work pages`);
}

const cards = DECKS.map(d=>`      <a class="folio-card" href="/portfolio-${d.slug}">
        <img src="/img/portfolio/${d.slug}-${pad(d.list[0])}.jpg" alt="${d.title}" width="1920" height="1080" loading="lazy" decoding="async">
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
