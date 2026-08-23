import fs from 'fs';
const SRC="/home/u859213632/tmp/claude-859213632/-home-u859213632/a9d49e4f-cfc5-4947-8ec0-e381c062f106/scratchpad/saltwave/public_html/wp-content/themes/saltwave/";
const R=f=>fs.readFileSync(SRC+f,'utf8');

let head=R('header.php'), home=R('home.php'), foot=R('footer.php');

// --- strip Saltwave-specific tracking + fabricated review schema -------------
head=head.replace(/\s*<meta name="google-site-verification"[^>]*>/,'')
         .replace(/\s*<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/,'')
         .replace(/\s*<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/,'')
         .replace(/\s*<script type="application\/ld\+json">\{[\s\S]*?aggregateRating[\s\S]*?<\/script>/,'');

// --- our head: title, meta, canonical, real schema --------------------------
const SITE='https://trendwalkers.dpdns.org';
const META=`
        <title>Trend Walkers — Digital Marketing, SEO &amp; App Development Agency</title>
        <meta name="description" content="Trend Walkers is a full-service digital agency: SEO, social media management, LinkedIn marketing, web and app development, graphic design and reel editing.">
        <link rel="canonical" href="${SITE}/">
        <meta property="og:title" content="Trend Walkers — Digital Marketing, SEO &amp; App Development Agency">
        <meta property="og:description" content="SEO, social media, LinkedIn marketing, web and app development, design and reel editing — one team.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${SITE}/">
        <meta property="og:image" content="${SITE}/logo.svg">
        <meta name="twitter:card" content="summary_large_image">
${fs.readFileSync('_src/_schema.part','utf8').replace(/^/gm,'        ')}`;
head=head.replace(/<\?php wp_head\(\); \?>/,META);

// --- assemble ---------------------------------------------------------------
home=home.replace(/<\?php \/\* Template Name: homepage \*\/ \?>\s*/,'')
         .replace(/<\?php get_header\(\); \?>/,head)
         .replace(/<\?php get_footer\(\); \?>/,foot);

// --- contact form replaces the wpforms shortcode ----------------------------
const FORM=`<form class="tw-form" id="brief" novalidate>
                                        <input type="text" id="f-name" placeholder="Your name" required autocomplete="name">
                                        <input type="email" id="f-email" placeholder="Email address" required autocomplete="email">
                                        <input type="tel" id="f-phone" placeholder="Phone / WhatsApp" autocomplete="tel">
                                        <select id="f-service">
                                            <option>Not sure — advise me</option><option>SEO</option>
                                            <option>Social Media Management</option><option>LinkedIn Marketing</option>
                                            <option>Digital Marketing / Ads</option><option>Web Development</option>
                                            <option>Web App Development</option><option>Android &amp; iOS App</option>
                                            <option>Graphic Design</option><option>Reel / Video Editing</option>
                                        </select>
                                        <textarea id="f-msg" placeholder="Tell us what you need" required></textarea>
                                        <button class="button button-primary" type="submit"><span>Send the brief</span></button>
                                        <p class="form-note small mb-0" role="status"></p>
                                    </form>`;
home=home.replace(/<\?php echo do_shortcode\('\[wpforms id="55"\]'\); \?>/,FORM);

// --- resolve remaining PHP --------------------------------------------------
home=home.replace(/<\?php echo get_stylesheet_directory_uri\(\); \?>/g,'/assets');

// --- brand swap -------------------------------------------------------------
const swaps=[
  [/>SALTWAVE</g,'>TREND WALKERS<'],
  [/Saltwave Social/g,'Trend Walkers'],
  [/saltwavesocial@gmail\.com/g,'info@trendwalkers.dpdns.org'],
  [/tel:\+918482910786/g,'tel:+916283101614'],
  [/\+91 8482910786/g,'+91 62831 01614'],
  [/saltwavesocial/gi,'trendwalkers'],
  [/©\s*2025/,'© 2026'],
  [/\/assets\/images\/logo\.webp/g,'/logo-light.svg'],
  [/\/assets\/images\/favicon\.webp/g,'/favicon.svg'],
  // retire Saltwave's own social accounts rather than pointing our brand at them
  [/href="https:\/\/www\.facebook\.com\/share\/[^"]*"/,'href="#"'],
  [/href="https:\/\/www\.instagram\.com\/[^"]*"/,'href="#"'],
  [/href="https:\/\/youtube\.com\/@[^"]*"/,'href="#"'],
];
for(const [re,to] of swaps) home=home.replace(re,to);

// hero rotating word list -> our nine services
home=home.replace(/(<div class="intro-wrapper">)Search Engine Optimization(<\/div>)/,'$1Search Engine Optimization$2')
         .replace(/(<div class="intro-wrapper">)Social Media Marketing(<\/div>)/,'$1Social Media Management$2')
         .replace(/(<div class="intro-wrapper">)PPC(<\/div>)/,'$1LinkedIn Marketing$2')
         .replace(/(<div class="intro-wrapper">)Graphics(<\/div>)/,'$1Web &amp; App Development$2')
         .replace(/(<div class="intro-wrapper">)Performance Marketing(<\/div>)/,'$1Graphics &amp; Reels$2');

// favicon link type
home=home.replace(/<link rel="icon" type="image\/x-icon" href="\/favicon\.svg">/,'<link rel="icon" type="image/svg+xml" href="/favicon.svg">');

fs.writeFileSync('index.html',home);
const left=home.match(/<\?php[\s\S]*?\?>/g);
console.log('index.html written,',home.length,'bytes');
console.log('unresolved php:',left?left.length:0);
console.log('saltwave mentions left:',(home.match(/saltwave/gi)||[]).length);
