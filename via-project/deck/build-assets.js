// Generate visual assets for the Via pitch deck.
// Produces sunset-gradient strip + simplified phone mockups as PNGs.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

// Via palette
const C = {
  cream:   '#FAF6EC',
  yellow:  '#FAEBBE',
  yellowB: '#F0DD8C',
  yellowS: '#FDF8DD',
  orange:  '#E8A574',
  orangeS: '#F5D4BA',
  orangeD: '#D88A54',
  tan:     '#C9A77D',
  sand:    '#E4D4B7',
  sandS:   '#F1E7D2',
  terra:   '#B98E6B',
  ink:     '#15110D',
  ink2:    '#524840',
  muted:   '#958B7E',
  line:    '#EAE2CE',
};

async function main() {
  // ===== 1. Sunset horizontal gradient strip (thin motif, 10"x0.25" @ 150dpi) =====
  {
    const w = 1500, h = 40;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${C.yellow}"/>
          <stop offset="35%" stop-color="${C.yellowB}"/>
          <stop offset="65%" stop-color="${C.orange}"/>
          <stop offset="100%" stop-color="${C.tan}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'sunset-strip.png'));
  }

  // ===== 2. Sunset radial hero background (for title + closing slides) =====
  {
    const w = 1920, h = 1080;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="r1" cx="85%" cy="20%" r="55%">
          <stop offset="0%" stop-color="${C.yellow}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${C.ink}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="r2" cx="15%" cy="100%" r="55%">
          <stop offset="0%" stop-color="${C.orange}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${C.ink}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${C.ink}"/>
      <rect width="${w}" height="${h}" fill="url(#r1)"/>
      <rect width="${w}" height="${h}" fill="url(#r2)"/>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'hero-bg.png'));
  }

  // ===== 3. Cream radial soft background (for content slide accents) =====
  {
    const w = 1920, h = 1080;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="r1" cx="100%" cy="0%" r="60%">
          <stop offset="0%" stop-color="${C.yellow}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${C.cream}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="r2" cx="0%" cy="100%" r="50%">
          <stop offset="0%" stop-color="${C.orangeS}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${C.cream}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${C.cream}"/>
      <rect width="${w}" height="${h}" fill="url(#r1)"/>
      <rect width="${w}" height="${h}" fill="url(#r2)"/>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'content-bg.png'));
  }

  // ===== Phone frame helper =====
  // Returns SVG string for a phone-shaped card with arbitrary inner content.
  function phone(innerSvg, w=520, h=1050) {
    const notchW = 130, notchH = 28;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <filter id="shadow" x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="${C.ink}" flood-opacity="0.14"/>
        </filter>
        <clipPath id="frameClip">
          <rect x="14" y="14" width="${w-28}" height="${h-28}" rx="52" ry="52"/>
        </clipPath>
      </defs>
      <!-- Outer body -->
      <rect x="0" y="0" width="${w}" height="${h}" rx="66" ry="66" fill="${C.ink}" filter="url(#shadow)"/>
      <!-- Inner screen background -->
      <rect x="14" y="14" width="${w-28}" height="${h-28}" rx="52" ry="52" fill="${C.cream}"/>
      <!-- Content (clipped) -->
      <g clip-path="url(#frameClip)">
        ${innerSvg}
      </g>
      <!-- Notch -->
      <rect x="${(w-notchW)/2}" y="26" width="${notchW}" height="${notchH}" rx="14" ry="14" fill="${C.ink}"/>
    </svg>`;
  }

  // ===== 4. Phone mockup: OWNER INBOX (applications) =====
  {
    const inner = `
      <!-- Status bar space -->
      <g transform="translate(0, 90)">
        <text x="40" y="0" font-family="Georgia, serif" font-size="14" letter-spacing="2" fill="${C.muted}">GOOD MORNING</text>
        <text x="40" y="40" font-family="Georgia, serif" font-size="38" fill="${C.ink}" font-weight="500">Creator applications</text>
        <text x="40" y="66" font-family="Inter, Arial" font-size="14" fill="${C.muted}">7 new this week · ranked by audience fit</text>
        <!-- Tabs -->
        <g transform="translate(40, 90)">
          <rect x="0" y="0" width="90" height="30" rx="15" fill="${C.ink}"/>
          <text x="45" y="20" font-family="Inter, Arial" font-size="13" fill="#fff" text-anchor="middle" font-weight="600">New · 7</text>
          <text x="130" y="20" font-family="Inter, Arial" font-size="13" fill="${C.muted}">Approved</text>
          <text x="235" y="20" font-family="Inter, Arial" font-size="13" fill="${C.muted}">Declined</text>
        </g>
        <!-- App row 1 -->
        <g transform="translate(30, 150)">
          <rect x="0" y="0" width="430" height="130" rx="18" fill="#fff" stroke="${C.line}"/>
          <circle cx="40" cy="40" r="30" fill="url(#av1)"/>
          <defs>
            <linearGradient id="av1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${C.yellow}"/>
              <stop offset="60%" stop-color="${C.orange}"/>
              <stop offset="100%" stop-color="${C.tan}"/>
            </linearGradient>
          </defs>
          <text x="80" y="28" font-family="Georgia, serif" font-size="18" font-weight="600" fill="${C.ink}">Camille Reyes</text>
          <rect x="210" y="16" width="80" height="20" rx="10" fill="${C.orangeS}"/>
          <text x="250" y="30" font-family="Inter, Arial" font-size="10" font-weight="700" fill="#8A4A1F" text-anchor="middle">94% MATCH</text>
          <text x="80" y="48" font-family="Inter, Arial" font-size="11" fill="${C.muted}">128K IG · 62K TikTok · Travel + Wellness</text>
          <text x="30" y="78" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink2}">"I've been dreaming about slow mornings</text>
          <text x="30" y="96" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink2}">on the Calanques. I'd document the..."</text>
          <text x="30" y="118" font-family="Inter, Arial" font-size="10" fill="${C.muted}">Sunset suite</text>
          <text x="400" y="118" font-family="Inter, Arial" font-size="10" fill="${C.ink2}" text-anchor="end" font-weight="600">Jun 14–17</text>
        </g>
        <!-- App row 2 -->
        <g transform="translate(30, 300)">
          <rect x="0" y="0" width="430" height="130" rx="18" fill="#fff" stroke="${C.line}"/>
          <circle cx="40" cy="40" r="30" fill="url(#av1)"/>
          <text x="80" y="28" font-family="Georgia, serif" font-size="18" font-weight="600" fill="${C.ink}">Jules Mercier</text>
          <rect x="210" y="16" width="80" height="20" rx="10" fill="${C.orangeS}"/>
          <text x="250" y="30" font-family="Inter, Arial" font-size="10" font-weight="700" fill="#8A4A1F" text-anchor="middle">88% MATCH</text>
          <text x="80" y="48" font-family="Inter, Arial" font-size="11" fill="${C.muted}">89K IG · 24K YouTube · Hotels &amp; Design</text>
          <text x="30" y="78" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink2}">"Long-form YouTube piece + carousel. I've</text>
          <text x="30" y="96" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink2}">shot for Aman and Belmond — decks..."</text>
          <text x="30" y="118" font-family="Inter, Arial" font-size="10" fill="${C.muted}">Cliff-side villa</text>
          <text x="400" y="118" font-family="Inter, Arial" font-size="10" fill="${C.ink2}" text-anchor="end" font-weight="600">Jun 21–23</text>
        </g>
        <!-- App row 3 (partial, clipped) -->
        <g transform="translate(30, 450)">
          <rect x="0" y="0" width="430" height="130" rx="18" fill="#fff" stroke="${C.line}"/>
          <circle cx="40" cy="40" r="30" fill="url(#av1)"/>
          <text x="80" y="28" font-family="Georgia, serif" font-size="18" font-weight="600" fill="${C.ink}">Noa Bensoussan</text>
          <rect x="210" y="16" width="80" height="20" rx="10" fill="${C.yellowS}"/>
          <text x="250" y="30" font-family="Inter, Arial" font-size="10" font-weight="700" fill="#7A5F22" text-anchor="middle">71% MATCH</text>
          <text x="80" y="48" font-family="Inter, Arial" font-size="11" fill="${C.muted}">54K IG · Lifestyle · 48% FR audience</text>
        </g>
      </g>
    `;
    const svg = phone(inner);
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'phone-inbox.png'));
  }

  // ===== 5. Phone mockup: TRAVELER DISCOVER =====
  {
    const inner = `
      <g transform="translate(0, 90)">
        <text x="40" y="0" font-family="Georgia, serif" font-size="14" letter-spacing="2" fill="${C.muted}" font-style="italic">GOOD EVENING, JAMIE</text>
        <text x="40" y="40" font-family="Georgia, serif" font-size="34" fill="${C.ink}" font-weight="500">Where you go</text>
        <text x="40" y="76" font-family="Georgia, serif" font-size="34" fill="${C.ink}" font-weight="500">starts with who you trust.</text>

        <!-- Creators strip -->
        <g transform="translate(40, 110)">
          <text x="0" y="20" font-family="Georgia, serif" font-size="16" font-weight="600" fill="${C.ink}">Creators you follow</text>
          <g transform="translate(0, 40)">
            ${[0,1,2,3,4].map(i =>
              `<g transform="translate(${i*80}, 0)"><circle cx="30" cy="30" r="28" fill="none" stroke="${C.orange}" stroke-width="3"/><circle cx="30" cy="30" r="25" fill="url(#av1)"/></g>`
            ).join('')}
          </g>
        </g>

        <!-- Featured stay card -->
        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="430" height="450" rx="26" fill="#fff" stroke="${C.line}"/>
          <!-- Image area (placeholder sunset) -->
          <defs>
            <linearGradient id="imgBG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${C.yellow}"/>
              <stop offset="50%" stop-color="${C.orange}"/>
              <stop offset="100%" stop-color="${C.tan}"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="430" height="250" fill="url(#imgBG)"/>
          <!-- Sun -->
          <circle cx="340" cy="80" r="36" fill="#fff" opacity="0.7"/>
          <!-- Rec badge -->
          <rect x="20" y="20" width="170" height="36" rx="18" fill="#fff" opacity="0.94"/>
          <circle cx="38" cy="38" r="12" fill="url(#av1)"/>
          <text x="56" y="42" font-family="Inter, Arial" font-size="11" font-weight="600" fill="${C.ink}">@camille recommends</text>
          <!-- Heart -->
          <circle cx="400" cy="38" r="18" fill="#fff" opacity="0.94"/>
          <text x="400" y="44" font-family="Arial" font-size="16" fill="${C.ink}" text-anchor="middle">♡</text>

          <!-- Body -->
          <g transform="translate(20, 270)">
            <text x="0" y="20" font-family="Georgia, serif" font-size="20" font-weight="600" fill="${C.ink}">La Bastide du Calanques</text>
            <text x="390" y="20" font-family="Inter, Arial" font-size="12" font-weight="600" fill="${C.ink2}" text-anchor="end">★ 4.96</text>
            <text x="0" y="44" font-family="Inter, Arial" font-size="12" fill="${C.muted}">Cassis, France · 6 rooms · ocean view</text>
            <text x="0" y="76" font-family="Georgia, serif" font-size="20" font-weight="600" fill="${C.ink}">€260</text>
            <text x="60" y="76" font-family="Inter, Arial" font-size="12" fill="${C.muted}">/ night</text>
            <!-- Quote chip -->
            <rect x="0" y="96" width="390" height="58" rx="10" fill="${C.yellowS}"/>
            <text x="14" y="120" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink}">
              <tspan font-style="normal" font-weight="600">Camille says:</tspan> "Sunrise swims, long lunches,
            </text>
            <text x="14" y="140" font-family="Georgia, serif" font-size="13" font-style="italic" fill="${C.ink}">
              no wifi needed. My favorite slow escape this year."
            </text>
          </g>
        </g>
      </g>
    `;
    const svg = phone(inner);
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'phone-discover.png'));
  }

  // ===== 6. Phone mockup: CREATOR COMMISSION =====
  {
    const inner = `
      <defs>
        <radialGradient id="commBG" cx="100%" cy="0%" r="70%">
          <stop offset="0%" stop-color="${C.yellow}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${C.cream}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="commBG2" cx="0%" cy="100%" r="60%">
          <stop offset="0%" stop-color="${C.orange}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${C.cream}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="14" y="14" width="492" height="1022" fill="${C.cream}"/>
      <rect x="14" y="14" width="492" height="1022" fill="url(#commBG)"/>
      <rect x="14" y="14" width="492" height="1022" fill="url(#commBG2)"/>

      <g transform="translate(260, 150)">
        <text x="0" y="0" font-family="Georgia, serif" font-size="14" font-style="italic" letter-spacing="2.5" fill="${C.ink2}" text-anchor="middle">CAMILLE'S WALLET · JUST NOW</text>
      </g>

      <!-- Big money card -->
      <g transform="translate(50, 220)">
        <rect x="0" y="0" width="420" height="400" rx="34" fill="#fff" opacity="0.92"/>
        <text x="210" y="50" font-family="Inter, Arial" font-size="13" letter-spacing="2" font-weight="700" fill="${C.muted}" text-anchor="middle">COMMISSION EARNED</text>
        <text x="210" y="180" font-family="Georgia, serif" font-size="130" font-weight="500" fill="${C.ink}" text-anchor="middle" letter-spacing="-4">
          <tspan fill="${C.orangeD}">+</tspan>€78
        </text>
        <text x="210" y="230" font-family="Inter, Arial" font-size="14" fill="${C.ink2}" text-anchor="middle">From <tspan font-weight="600" fill="${C.ink}">Jamie's booking</tspan> at La Bastide</text>
        <text x="210" y="252" font-family="Inter, Arial" font-size="14" fill="${C.ink2}" text-anchor="middle">du Calanques — a stay you featured.</text>

        <!-- Mini booking card -->
        <rect x="30" y="290" width="360" height="80" rx="16" fill="${C.sandS}"/>
        <rect x="44" y="304" width="52" height="52" rx="10" fill="url(#imgBG2)"/>
        <defs>
          <linearGradient id="imgBG2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${C.yellow}"/>
            <stop offset="100%" stop-color="${C.tan}"/>
          </linearGradient>
        </defs>
        <text x="114" y="326" font-family="Inter, Arial" font-size="12" fill="${C.muted}">Jamie K. · 3 nights · Jun 14</text>
        <text x="114" y="352" font-family="Georgia, serif" font-size="15" font-weight="600" fill="${C.ink}">La Bastide du Calanques</text>
      </g>

      <!-- Summary cards -->
      <g transform="translate(50, 660)">
        <rect x="0" y="0" width="200" height="110" rx="18" fill="#fff" opacity="0.8"/>
        <text x="18" y="26" font-family="Inter, Arial" font-size="10" letter-spacing="1" font-weight="700" fill="${C.muted}">THIS MONTH</text>
        <text x="18" y="70" font-family="Georgia, serif" font-size="36" font-weight="600" fill="${C.ink}">€412</text>
        <text x="18" y="92" font-family="Inter, Arial" font-size="11" fill="${C.ink2}">6 bookings · ↑ 48%</text>

        <rect x="220" y="0" width="200" height="110" rx="18" fill="#fff" opacity="0.8"/>
        <text x="238" y="26" font-family="Inter, Arial" font-size="10" letter-spacing="1" font-weight="700" fill="${C.muted}">LIFETIME</text>
        <text x="238" y="70" font-family="Georgia, serif" font-size="36" font-weight="600" fill="${C.ink}">€3,847</text>
        <text x="238" y="92" font-family="Inter, Arial" font-size="11" fill="${C.ink2}">across 41 stays</text>
      </g>
    `;
    const svg = phone(inner);
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, 'phone-commission.png'));
  }

  console.log('Assets generated in', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
