// Via — Pre-seed pitch deck
// 11 slides, 16:9 (10" x 5.625")
// Palette mirrors the app; sandwich structure (ink title/closing, cream content).

const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // overridden below
pptx.defineLayout({ name: 'VIA16x9', width: 10, height: 5.625 });
pptx.layout = 'VIA16x9';
pptx.title = 'Via — Travel by way of trust';
pptx.subject = 'Pre-seed pitch';
pptx.author = 'Via';

// Colors (no # prefix — pptxgenjs requirement)
const C = {
  cream: 'FAF6EC',
  yellow: 'FAEBBE',
  yellowB: 'F0DD8C',
  yellowS: 'FDF8DD',
  orange: 'E8A574',
  orangeS: 'F5D4BA',
  orangeD: 'D88A54',
  tan: 'C9A77D',
  sand: 'E4D4B7',
  sandS: 'F1E7D2',
  terra: 'B98E6B',
  ink: '15110D',
  ink2: '524840',
  muted: '958B7E',
  line: 'EAE2CE',
  white: 'FFFFFF'
};

const F = { head: 'Georgia', body: 'Calibri' };

const A = (name) => path.join(__dirname, 'assets', name);

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function addPageNumber(slide, n, total, onInk = false) {
  const col = onInk ? C.muted : C.muted;
  slide.addText(`${String(n).padStart(2, '0')} / ${total}`, {
    x: 9.0, y: 5.30, w: 0.9, h: 0.25,
    fontFace: F.body, fontSize: 9, color: col, align: 'right'
  });
}
function addWordmark(slide, onInk = false) {
  slide.addText('Via', {
    x: 0.4, y: 5.30, w: 0.8, h: 0.25,
    fontFace: F.head, fontSize: 11, italic: true,
    color: onInk ? C.yellowS : C.ink2
  });
}
function sunsetDot(slide, x, y, size = 0.14) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: size, h: size, fill: { color: C.orange }, line: { color: C.orange, width: 0 }
  });
}

// ------------------------------------------------------------
// SLIDE 1 — Cover
// ------------------------------------------------------------
const TOTAL = 11;
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('hero-bg.png') };

  // Eyebrow
  s.addText('PRE-SEED  ·  APRIL 2026', {
    x: 0.6, y: 0.6, w: 6, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.orange, charSpacing: 4, bold: true
  });

  // Wordmark — big
  s.addText('Via', {
    x: 0.6, y: 1.6, w: 5, h: 1.9,
    fontFace: F.head, fontSize: 180, italic: true, color: C.cream
  });

  // Tagline
  s.addText('Travel by way of trust.', {
    x: 0.6, y: 3.55, w: 7, h: 0.6,
    fontFace: F.head, fontSize: 30, italic: true, color: C.yellowS
  });

  // Subtagline
  s.addText('A three-sided marketplace where creators, stay owners, and travelers exchange influence for access.', {
    x: 0.6, y: 4.2, w: 7.2, h: 0.7,
    fontFace: F.body, fontSize: 14, color: C.sand, lineSpacingMultiple: 1.3
  });

  // Small sunset strip accent at bottom-right
  s.addImage({ path: A('sunset-strip.png'), x: 7.5, y: 5.2, w: 2.0, h: 0.06 });
})();

// ------------------------------------------------------------
// SLIDE 2 — Problem
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 2, TOTAL);

  s.addText('The problem', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('The content-for-stay market runs on cold DMs and lost threads.', {
    x: 0.85, y: 0.95, w: 8.5, h: 1.1,
    fontFace: F.head, fontSize: 30, color: C.ink, lineSpacingMultiple: 1.15
  });

  // Three pain columns
  const cols = [
    {
      eyebrow: 'FOR CREATORS',
      head: 'Pitch into the void.',
      body: 'Hundreds of DMs, no templates, no tracking. No way to prove audience fit before the "no."'
    },
    {
      eyebrow: 'FOR STAY OWNERS',
      head: 'Drowning in unfit asks.',
      body: 'Inboxes flooded with creators who will never convert. No signal on audience, no deliverable follow-through.'
    },
    {
      eyebrow: 'FOR TRAVELERS',
      head: 'Reviews don\'t scale trust.',
      body: 'They want the place their favorite creator actually stayed at — not the one with the most 5-star reviews.'
    }
  ];
  const cw = 2.9, gap = 0.15, startX = 0.6;
  cols.forEach((c, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: 2.4, w: cw, h: 2.6,
      fill: { color: C.white }, line: { color: C.line, width: 0.75 }, rectRadius: 0.12
    });
    s.addText(c.eyebrow, {
      x: x + 0.25, y: 2.55, w: cw - 0.5, h: 0.25,
      fontFace: F.body, fontSize: 9, color: C.orangeD, bold: true, charSpacing: 3
    });
    s.addText(c.head, {
      x: x + 0.25, y: 2.85, w: cw - 0.5, h: 0.7,
      fontFace: F.head, fontSize: 17, color: C.ink, italic: true
    });
    s.addText(c.body, {
      x: x + 0.25, y: 3.55, w: cw - 0.5, h: 1.35,
      fontFace: F.body, fontSize: 12, color: C.ink2, lineSpacingMultiple: 1.3
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 3 — Why now
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 3, TOTAL);

  s.addText('Why now', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Creators are the new travel agents.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 30, color: C.ink
  });
  s.addText('And the plumbing underneath them is still duct tape.', {
    x: 0.85, y: 1.75, w: 8.5, h: 0.5,
    fontFace: F.head, fontSize: 18, italic: true, color: C.ink2
  });

  // 4 stat cards
  const stats = [
    { big: '74%', label: 'of Gen Z travelers say creators influenced their last trip',   src: 'Phocuswright, 2024' },
    { big: '$500B', label: 'global short-term rental and boutique stay market',          src: 'Skift + AirDNA' },
    { big: '3.5x',  label: 'booking intent lift from a creator endorsement vs. ad',      src: 'MediaKix meta-analysis' },
    { big: '2M+',   label: 'mid-tier travel creators with 10K–500K followers globally',  src: 'HypeAuditor 2025' }
  ];
  const cw = 2.15, gap = 0.13, startX = 0.6, y = 2.85;
  stats.forEach((st, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cw, h: 2.15,
      fill: { color: C.yellowS }, line: { color: C.line, width: 0.5 }, rectRadius: 0.12
    });
    s.addText(st.big, {
      x: x + 0.2, y: y + 0.2, w: cw - 0.3, h: 0.85,
      fontFace: F.head, fontSize: 32, color: C.ink, bold: true
    });
    s.addText(st.label, {
      x: x + 0.2, y: y + 1.0, w: cw - 0.4, h: 0.85,
      fontFace: F.body, fontSize: 10.5, color: C.ink2, lineSpacingMultiple: 1.25
    });
    s.addText(st.src, {
      x: x + 0.2, y: y + 1.78, w: cw - 0.4, h: 0.3,
      fontFace: F.body, fontSize: 8, color: C.muted, italic: true
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 4 — Solution one-liner (two-pane)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 4, TOTAL);

  s.addText('The solution', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Via turns content-for-stay into a marketplace.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });

  // LEFT pane — "What's broken"
  const lx = 0.6, ly = 2.15;
  s.addShape(pptx.ShapeType.roundRect, {
    x: lx, y: ly, w: 4.35, h: 2.9,
    fill: { color: C.white }, line: { color: C.line, width: 0.75 }, rectRadius: 0.12
  });
  s.addText('WHAT\'S BROKEN', {
    x: lx + 0.3, y: ly + 0.25, w: 3.8, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.muted, bold: true, charSpacing: 3
  });
  const broken = [
    'Creators pitch in cold DMs, one-by-one',
    'Owners comp stays with no deliverable proof',
    'Travelers book on strangers\' reviews',
    'Nobody can measure what a stay actually earned'
  ];
  broken.forEach((t, i) => {
    s.addShape(pptx.ShapeType.line, {
      x: lx + 0.3, y: ly + 0.75 + i * 0.52, w: 0.15, h: 0,
      line: { color: C.muted, width: 1.5 }
    });
    s.addText(t, {
      x: lx + 0.55, y: ly + 0.58 + i * 0.52, w: 3.6, h: 0.4,
      fontFace: F.body, fontSize: 12.5, color: C.ink2
    });
  });

  // RIGHT pane — "What Via ships"
  const rx = 5.05, ry = 2.15;
  s.addShape(pptx.ShapeType.roundRect, {
    x: rx, y: ry, w: 4.35, h: 2.9,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 }, rectRadius: 0.12
  });
  s.addText('WHAT VIA SHIPS', {
    x: rx + 0.3, y: ry + 0.25, w: 3.8, h: 0.3,
    fontFace: F.body, fontSize: 10, color: C.orange, bold: true, charSpacing: 3
  });
  const viaShips = [
    'Application inbox with audience-fit scoring',
    'Deliverable tracker with approval gates',
    'Creator-curated discovery for travelers',
    'Automatic commission on every booking back to the creator'
  ];
  viaShips.forEach((t, i) => {
    s.addShape(pptx.ShapeType.ellipse, {
      x: rx + 0.3, y: ry + 0.75 + i * 0.52, w: 0.09, h: 0.09,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 }
    });
    s.addText(t, {
      x: rx + 0.5, y: ry + 0.58 + i * 0.52, w: 3.7, h: 0.4,
      fontFace: F.body, fontSize: 12.5, color: C.cream
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 5 — Wedge: Content-trade CRM (uses phone-inbox.png)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 5, TOTAL);

  s.addText('Wedge', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('We enter as the CRM for content trades.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });
  s.addText('Own the operational surface first. Marketplace follows the data.', {
    x: 0.85, y: 1.7, w: 5.0, h: 0.45,
    fontFace: F.head, fontSize: 14, italic: true, color: C.ink2
  });

  // Left column — bullets
  const lx = 0.6, ly = 2.35;
  const points = [
    { h: 'Match-fit scoring',  b: 'Every application is ranked by audience-fit — not just follower count.' },
    { h: 'Deliverable tracker', b: 'Stays don\'t get comped without proof. Every post has an approval gate.' },
    { h: 'Owner-first UX',      b: 'Replaces Gmail folders, Notion trackers, and "did they ever post?" spreadsheets.' }
  ];
  points.forEach((p, i) => {
    const y = ly + i * 0.92;
    s.addShape(pptx.ShapeType.rect, {
      x: lx, y: y + 0.08, w: 0.04, h: 0.5,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 }
    });
    s.addText(p.h, {
      x: lx + 0.2, y, w: 4.6, h: 0.35,
      fontFace: F.head, fontSize: 16, bold: true, color: C.ink
    });
    s.addText(p.b, {
      x: lx + 0.2, y: y + 0.33, w: 4.6, h: 0.6,
      fontFace: F.body, fontSize: 11.5, color: C.ink2, lineSpacingMultiple: 1.3
    });
  });

  // Right — phone mockup
  s.addImage({ path: A('phone-inbox.png'), x: 5.85, y: 1.7, w: 1.9, h: 3.5 });

  // Caption beside phone
  s.addText('Live owner inbox.\nApplications ranked by fit.', {
    x: 7.85, y: 3.2, w: 2.0, h: 0.9,
    fontFace: F.head, fontSize: 12, italic: true, color: C.ink2, lineSpacingMultiple: 1.3
  });
})();

// ------------------------------------------------------------
// SLIDE 6 — Flywheel (3-sided marketplace diagram)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 6, TOTAL);

  s.addText('Flywheel', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Three sides, one loop.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });

  // 3 circles — triangle layout
  const nodes = [
    { label: 'CREATORS',      sub: 'apply, post, earn commissions',        x: 1.2, y: 2.1, w: 2.4, h: 2.4, color: C.yellowB },
    { label: 'STAY OWNERS',   sub: 'list, curate, measure reach',          x: 6.4, y: 2.1, w: 2.4, h: 2.4, color: C.orangeS },
    { label: 'TRAVELERS',     sub: 'discover, book, trust the creator',    x: 3.8, y: 3.0, w: 2.4, h: 2.4, color: C.sand }
  ];
  nodes.forEach(n => {
    s.addShape(pptx.ShapeType.ellipse, {
      x: n.x, y: n.y, w: n.w, h: n.h,
      fill: { color: n.color }, line: { color: C.line, width: 0.5 }
    });
    s.addText(n.label, {
      x: n.x, y: n.y + 0.65, w: n.w, h: 0.4,
      fontFace: F.body, fontSize: 11, bold: true, color: C.ink, align: 'center', charSpacing: 3
    });
    s.addText(n.sub, {
      x: n.x + 0.2, y: n.y + 1.05, w: n.w - 0.4, h: 0.9,
      fontFace: F.head, fontSize: 11, italic: true, color: C.ink2, align: 'center', lineSpacingMultiple: 1.25
    });
  });

  // Arrows — clockwise labels
  // Creators -> Owners  (top arc)
  s.addShape(pptx.ShapeType.line, {
    x: 3.65, y: 2.55, w: 2.75, h: 0,
    line: { color: C.orangeD, width: 1.75, endArrowType: 'triangle' }
  });
  s.addText('deliverables', {
    x: 3.9, y: 2.15, w: 2.2, h: 0.3,
    fontFace: F.body, fontSize: 10, italic: true, color: C.ink2, align: 'center'
  });

  // Owners -> Travelers (right arc, down-left)
  s.addShape(pptx.ShapeType.line, {
    x: 6.4, y: 4.3, w: -1.4, h: 0.55,
    line: { color: C.orangeD, width: 1.75, endArrowType: 'triangle' }
  });
  s.addText('stays', {
    x: 5.4, y: 4.6, w: 1.4, h: 0.3,
    fontFace: F.body, fontSize: 10, italic: true, color: C.ink2, align: 'center'
  });

  // Travelers -> Creators (left arc, up-left)
  s.addShape(pptx.ShapeType.line, {
    x: 3.85, y: 4.85, w: -1.4, h: -0.55,
    line: { color: C.orangeD, width: 1.75, endArrowType: 'triangle' }
  });
  s.addText('commission', {
    x: 2.25, y: 4.6, w: 1.6, h: 0.3,
    fontFace: F.body, fontSize: 10, italic: true, color: C.ink2, align: 'center'
  });

  // Caption strip
  s.addText('Every booking pays the creator whose content surfaced it — so creators keep curating, owners keep listing, travelers keep trusting.', {
    x: 0.6, y: 4.8, w: 8.8, h: 0.5,
    fontFace: F.head, fontSize: 13, italic: true, color: C.ink2, align: 'center', lineSpacingMultiple: 1.3
  });
})();

// ------------------------------------------------------------
// SLIDE 7 — Marketplace (creators as shelf) uses phone-discover.png
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 7, TOTAL);

  s.addText('Marketplace', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Creators become the shelf.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });
  s.addText('Where Airbnb sorts by reviews, Via sorts by who you trust.', {
    x: 0.85, y: 1.7, w: 8.5, h: 0.45,
    fontFace: F.head, fontSize: 16, italic: true, color: C.ink2
  });

  // LEFT — phone mockup
  s.addImage({ path: A('phone-discover.png'), x: 0.75, y: 2.25, w: 1.9, h: 3.0 });

  // RIGHT — feature grid 2x2
  const fx = 3.15, fy = 2.35, fw = 3.15, fh = 1.2, gap = 0.2;
  const feat = [
    { h: 'Follow-graph discovery', b: 'Travelers see stays featured by creators they already follow.' },
    { h: 'Creator-curated collections', b: 'Each creator becomes a storefront of vetted stays.' },
    { h: 'Commission transparency', b: '"Supports @camille · 10%" is shown in the price — not buried in fine print.' },
    { h: 'Two-sided reputation', b: 'Owners rate creators. Creators rate owners. Travelers see both.' }
  ];
  feat.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = fx + col * (fw + gap), y = fy + row * (fh + gap);
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: fw, h: fh,
      fill: { color: C.yellowS }, line: { color: C.line, width: 0.5 }, rectRadius: 0.1
    });
    s.addText(f.h, {
      x: x + 0.2, y: y + 0.15, w: fw - 0.4, h: 0.35,
      fontFace: F.head, fontSize: 13, bold: true, color: C.ink
    });
    s.addText(f.b, {
      x: x + 0.2, y: y + 0.5, w: fw - 0.4, h: 0.6,
      fontFace: F.body, fontSize: 10.5, color: C.ink2, lineSpacingMultiple: 1.25
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 8 — Monetization (uses phone-commission.png)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 8, TOTAL);

  s.addText('Monetization', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Three revenue lines, all aligned.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });

  // Three revenue lines — left column
  const items = [
    { big: '10%',   tag: 'BOOKING TAKE RATE',  body: 'On every traveler booking. Creator earns it back; Via keeps 10% of that cut.' },
    { big: '$9.99', tag: 'PREMIUM (CREATOR)',  body: 'Unlimited applications + priority review + enhanced analytics. Free tier = 1 application / month.' },
    { big: '15%',   tag: 'PREMIUM LIFT',       body: 'Premium creators earn a higher share on bookings they drive — from 10% → 15%.' }
  ];
  const lx = 0.6, ly = 2.2, rowH = 0.95;
  items.forEach((it, i) => {
    const y = ly + i * rowH;
    s.addShape(pptx.ShapeType.rect, {
      x: lx, y: y + 0.05, w: 0.04, h: 0.7,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 }
    });
    s.addText(it.big, {
      x: lx + 0.2, y, w: 1.6, h: 0.8,
      fontFace: F.head, fontSize: 26, bold: true, color: C.ink
    });
    s.addText(it.tag, {
      x: lx + 1.85, y: y + 0.03, w: 4.2, h: 0.3,
      fontFace: F.body, fontSize: 10, bold: true, color: C.orangeD, charSpacing: 3
    });
    s.addText(it.body, {
      x: lx + 1.85, y: y + 0.32, w: 4.2, h: 0.6,
      fontFace: F.body, fontSize: 11, color: C.ink2, lineSpacingMultiple: 1.3
    });
  });

  // Right — phone mockup
  s.addImage({ path: A('phone-commission.png'), x: 6.9, y: 1.75, w: 2.3, h: 3.35 });

  // Caption under phone (sits above page number row)
  s.addText('Creator sees the money. The loop compounds.', {
    x: 6.9, y: 5.15, w: 2.3, h: 0.25,
    fontFace: F.head, fontSize: 10, italic: true, color: C.ink2, align: 'center'
  });
})();

// ------------------------------------------------------------
// SLIDE 9 — Market (TAM / SAM / SOM)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 9, TOTAL);

  s.addText('Market', {
    x: 0.6, y: 0.5, w: 4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Built on two of the biggest consumer markets.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 26, color: C.ink
  });

  // Three concentric circles (TAM > SAM > SOM) — pushed down/left, smaller
  const cx = 2.7, cy = 3.95;
  s.addShape(pptx.ShapeType.ellipse, {
    x: cx - 1.7, y: cy - 1.7, w: 3.4, h: 3.4,
    fill: { color: C.yellowS }, line: { color: C.orangeS, width: 1 }
  });
  s.addShape(pptx.ShapeType.ellipse, {
    x: cx - 1.15, y: cy - 1.15, w: 2.3, h: 2.3,
    fill: { color: C.orangeS }, line: { color: C.orange, width: 1 }
  });
  s.addShape(pptx.ShapeType.ellipse, {
    x: cx - 0.65, y: cy - 0.65, w: 1.3, h: 1.3,
    fill: { color: C.orange }, line: { color: C.orangeD, width: 1 }
  });
  // Labels on circles
  s.addText('SOM', {
    x: cx - 0.7, y: cy - 0.22, w: 1.4, h: 0.26,
    fontFace: F.body, fontSize: 10, bold: true, color: C.ink, align: 'center', charSpacing: 3
  });
  s.addText('$240M', {
    x: cx - 0.7, y: cy + 0.04, w: 1.4, h: 0.28,
    fontFace: F.head, fontSize: 12, bold: true, color: C.ink, align: 'center'
  });
  s.addText('SAM', {
    x: cx - 1.15, y: cy - 1.05, w: 2.3, h: 0.28,
    fontFace: F.body, fontSize: 10, bold: true, color: C.ink, align: 'center', charSpacing: 3
  });
  s.addText('TAM', {
    x: cx - 1.7, y: cy - 1.58, w: 3.4, h: 0.28,
    fontFace: F.body, fontSize: 10, bold: true, color: C.ink2, align: 'center', charSpacing: 3
  });

  // Right — legend
  const legend = [
    { tag: 'TAM', num: '$500B', text: 'Global short-term + boutique stays market.', sub: 'Skift, AirDNA 2024' },
    { tag: 'SAM', num: '$48B',  text: 'Influencer-driven travel spend in NA + EU.', sub: '3.5x booking-intent lift × 74% of Gen Z influence' },
    { tag: 'SOM', num: '$240M', text: 'Reachable 3-yr: 2M creators × 1.2 bookings/mo × €100 avg × 10%.', sub: 'Bottom-up, conservative' }
  ];
  const rx = 5.6, ry = 2.2, rowH = 1.1;
  legend.forEach((L, i) => {
    const y = ry + i * rowH;
    s.addShape(pptx.ShapeType.roundRect, {
      x: rx - 0.1, y, w: 4.0, h: 0.98,
      fill: { color: C.white }, line: { color: C.line, width: 0.5 }, rectRadius: 0.08
    });
    s.addText(L.tag, {
      x: rx, y: y + 0.1, w: 0.7, h: 0.3,
      fontFace: F.body, fontSize: 10, bold: true, color: C.orangeD, charSpacing: 3
    });
    s.addText(L.num, {
      x: rx + 0.65, y: y + 0.05, w: 1.2, h: 0.4,
      fontFace: F.head, fontSize: 18, bold: true, color: C.ink
    });
    s.addText(L.text, {
      x: rx, y: y + 0.42, w: 3.8, h: 0.35,
      fontFace: F.body, fontSize: 11, color: C.ink2
    });
    s.addText(L.sub, {
      x: rx, y: y + 0.72, w: 3.8, h: 0.25,
      fontFace: F.body, fontSize: 8.5, italic: true, color: C.muted
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 10 — Founder–problem fit [PLACEHOLDER]
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('content-bg.png') };
  addWordmark(s); addPageNumber(s, 10, TOTAL);

  s.addText('Founder–problem fit', {
    x: 0.6, y: 0.5, w: 5, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.orangeD, bold: true, charSpacing: 4
  });
  sunsetDot(s, 0.6, 1.05);
  s.addText('Why Cierra. Why now.', {
    x: 0.85, y: 0.95, w: 8.5, h: 0.8,
    fontFace: F.head, fontSize: 28, color: C.ink
  });

  // Left — portrait placeholder with name inside
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 2.15, w: 3.0, h: 2.9,
    fill: { color: C.sand }, line: { color: C.tan, width: 0.75 }, rectRadius: 0.15
  });
  s.addText('[ Portrait ]', {
    x: 0.6, y: 3.15, w: 3.0, h: 0.4,
    fontFace: F.head, fontSize: 16, italic: true, color: C.ink2, align: 'center'
  });
  s.addText('Cierra Bellamy', {
    x: 0.6, y: 4.45, w: 3.0, h: 0.3,
    fontFace: F.head, fontSize: 14, bold: true, color: C.ink, align: 'center'
  });
  s.addText('FOUNDER & CEO', {
    x: 0.6, y: 4.75, w: 3.0, h: 0.25,
    fontFace: F.body, fontSize: 9, color: C.ink2, align: 'center', charSpacing: 3
  });

  // Right — three proof points (placeholders)
  const items = [
    {
      h: 'Founder of Charmed Collective',
      b: '[ Placeholder — years running the agency, number of creators managed, brand deals closed. ]'
    },
    {
      h: 'Lived the problem daily',
      b: '[ Placeholder — e.g., "personally ran 200+ content-for-stay trades across Airbnb + boutique hotels before building Via." ]'
    },
    {
      h: 'Network on both sides',
      b: '[ Placeholder — warm intros to [N] creators and [N] stay operators ready to onboard at launch. ]'
    }
  ];
  const rx = 4.0, ry = 2.15, rh = 1.0;
  items.forEach((it, i) => {
    const y = ry + i * rh;
    s.addShape(pptx.ShapeType.rect, {
      x: rx, y: y + 0.05, w: 0.04, h: 0.82,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 }
    });
    s.addText(it.h, {
      x: rx + 0.2, y, w: 5.5, h: 0.35,
      fontFace: F.head, fontSize: 16, bold: true, color: C.ink
    });
    s.addText(it.b, {
      x: rx + 0.2, y: y + 0.35, w: 5.5, h: 0.6,
      fontFace: F.body, fontSize: 11, color: C.muted, italic: true, lineSpacingMultiple: 1.3
    });
  });
})();

// ------------------------------------------------------------
// SLIDE 11 — Ask + closing (ink bg)
// ------------------------------------------------------------
(() => {
  const s = pptx.addSlide();
  s.background = { path: A('hero-bg.png') };

  s.addText('THE ASK', {
    x: 0.6, y: 0.6, w: 4, h: 0.3,
    fontFace: F.body, fontSize: 11, color: C.orange, bold: true, charSpacing: 4
  });

  s.addText('We\'re raising $[ X ]', {
    x: 0.6, y: 1.15, w: 9, h: 1.1,
    fontFace: F.head, fontSize: 56, italic: true, color: C.cream
  });
  s.addText('to launch Via in [ City ] with 50 creators and 20 stays.', {
    x: 0.6, y: 2.25, w: 9, h: 0.6,
    fontFace: F.head, fontSize: 22, color: C.yellowS
  });

  // Use-of-funds three columns
  const funds = [
    { tag: '40%', label: 'Product',          body: 'MVP polish, two-sided auth, payments, trust + safety.' },
    { tag: '40%', label: 'Go-to-market',     body: 'Seeding the first 50 creators and 20 stays in the pilot city.' },
    { tag: '20%', label: 'Founding team',    body: 'One engineer, one creator-ops lead alongside the founder.' }
  ];
  const cx = 0.6, cy = 3.3, cw = 2.9, gap = 0.15;
  funds.forEach((f, i) => {
    const x = cx + i * (cw + gap);
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: cy, w: cw, h: 1.4,
      fill: { color: C.ink }, line: { color: C.ink2, width: 0.75 }, rectRadius: 0.1
    });
    s.addText(f.tag, {
      x: x + 0.2, y: cy + 0.15, w: 1, h: 0.5,
      fontFace: F.head, fontSize: 22, bold: true, color: C.orange
    });
    s.addText(f.label, {
      x: x + 1.15, y: cy + 0.2, w: cw - 1.3, h: 0.35,
      fontFace: F.head, fontSize: 14, bold: true, color: C.cream
    });
    s.addText(f.body, {
      x: x + 0.2, y: cy + 0.7, w: cw - 0.4, h: 0.6,
      fontFace: F.body, fontSize: 10.5, color: C.sand, lineSpacingMultiple: 1.3
    });
  });

  // Closing tagline
  s.addText('Travel by way of trust.', {
    x: 0.6, y: 4.95, w: 6, h: 0.45,
    fontFace: F.head, fontSize: 20, italic: true, color: C.yellowS
  });
  s.addText('cierra@charmedcollectiveagency.com', {
    x: 6, y: 5.0, w: 3.4, h: 0.35,
    fontFace: F.body, fontSize: 11, color: C.sand, align: 'right'
  });
})();

// ------------------------------------------------------------
// Save
// ------------------------------------------------------------
pptx.writeFile({ fileName: '/sessions/adoring-modest-cray/mnt/outputs/via-pitch-deck.pptx' })
  .then(fn => console.log('Deck saved:', fn))
  .catch(err => { console.error(err); process.exit(1); });
