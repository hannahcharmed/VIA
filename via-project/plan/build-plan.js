// Via — Business Plan & Action Plan to $1B
// US Letter, Arial, structured headings, tables for phases/financials.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader
} = require('docx');

// --- palette (brand accents) ---------------------------------------
const COL = {
  ink: '15110D',
  ink2: '524840',
  muted: '958B7E',
  orange: 'E8A574',
  orangeD: 'D88A54',
  cream: 'FAF6EC',
  sandS: 'F1E7D2',
  yellowS: 'FDF8DD',
  line: 'EAE2CE',
};

// --- helpers -------------------------------------------------------
const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, ...(opts.run || {}) })],
  spacing: { after: 120, ...(opts.spacing || {}) },
  alignment: opts.alignment,
  heading: opts.heading,
  ...(opts.numbering ? { numbering: opts.numbering } : {}),
  ...(opts.pageBreakBefore ? { pageBreakBefore: true } : {}),
});

// Rich paragraph with multiple runs
const rp = (runs, opts = {}) => new Paragraph({
  children: runs.map(r => (typeof r === 'string' ? new TextRun(r) : new TextRun(r))),
  spacing: { after: 120, ...(opts.spacing || {}) },
  alignment: opts.alignment,
  heading: opts.heading,
  ...(opts.pageBreakBefore ? { pageBreakBefore: true } : {}),
});

const bullet = (text) => new Paragraph({
  children: [new TextRun(text)],
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 80 },
});

const numbered = (text, ref = 'numbers') => new Paragraph({
  children: [new TextRun(text)],
  numbering: { reference: ref, level: 0 },
  spacing: { after: 80 },
});

const sectionBreak = () => new Paragraph({ children: [new PageBreak()] });

// Horizontal rule via paragraph border
const hr = () => new Paragraph({
  children: [new TextRun('')],
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COL.orangeD, space: 1 } },
  spacing: { after: 240 },
});

// Cell helper
const border = { style: BorderStyle.SINGLE, size: 4, color: COL.line };
const borders = { top: border, bottom: border, left: border, right: border };
const cell = (text, opts = {}) => new TableCell({
  borders,
  width: { size: opts.w, type: WidthType.DXA },
  shading: opts.shade ? { fill: opts.shade, type: ShadingType.CLEAR } : undefined,
  margins: { top: 100, bottom: 100, left: 140, right: 140 },
  children: (Array.isArray(text) ? text : [text]).map(t =>
    typeof t === 'string'
      ? new Paragraph({
          children: [new TextRun({ text: t, bold: opts.bold, color: opts.color, size: opts.fontSize })],
          spacing: { after: 0 },
          alignment: opts.align,
        })
      : t
  ),
  verticalAlign: opts.vAlign,
});

// --- tables --------------------------------------------------------
const TABLE_W = 9360; // content width for US Letter 1" margins

// Competitive landscape table
const competitiveTable = () => {
  const cols = [1800, 2100, 2760, 2700];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Category', 'Player', 'What they do', 'Where Via wins'], true),
      mk(['OTAs', 'Airbnb, Booking.com', 'Review-based discovery at scale', 'Creator-led trust, not stranger reviews']),
      mk(['Creator tools', 'Passionfroot, Aspire', 'Brand-side sponsorship mgmt', 'Travel-native + transactional, not just contractual']),
      mk(['Travel creators', '#TravelTok, hotel DMs', 'Ad-hoc outreach', 'Platform + pipeline + payments in one place']),
      mk(['Boutique curators', 'Mr. & Mrs. Smith, Tablet', 'Gated editorial curation', 'Democratized curation — every creator is a curator']),
    ],
  });
};

// Phase table
const phaseTable = () => {
  const cols = [1200, 1400, 1600, 2580, 2580];
  const mk = (cells, header = false, altShade) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : altShade,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Phase', 'Timing', 'Round', 'Primary goal', 'Exit criteria'], true),
      mk(['1. Foundation', 'Months 0–6',  'Pre-seed $1M',  'Ship MVP CRM, seed 1 pilot city',          '20 stays booked, 80% creator retention at 90 days']),
      mk(['2. Traction',   'Months 6–18', 'Seed $4M',      'Marketplace live; 5 cities',               '500 creators · 200 stays · $500K GMV · 60% NRR']),
      mk(['3. Scale',      'Months 18–36','Series A $15M', 'Self-serve onboarding; national US',       '10K creators · 2K stays · $20M GMV · $2M ARR']),
      mk(['4. International','Years 3–5', 'Series B $40M', 'EU + LatAm; multi-currency payouts',       '100K creators · 20K stays · $250M GMV · $25M ARR']),
      mk(['5. Category leader','Years 5–7','Series C $100M','Adjacent verticals (restaurants, exp.)',  '$1B GMV · $100M+ ARR · 3 verticals live']),
      mk(['6. Outcome',    'Year 7+',     'IPO / M&A',     'Become the category\u2019s booking rail',  'Enterprise value $5–10B']),
    ],
  });
};

// Financials table
const financialsTable = () => {
  const cols = [1860, 1500, 1500, 1500, 1500, 1500];
  const mk = (cells, header = false, shaded = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header || i === 0,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : (shaded && i !== 0 ? COL.yellowS : undefined),
      align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Metric', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'], true),
      mk(['Creators',            '500',    '10,000',  '50,000',   '200,000',  '500,000']),
      mk(['Stays',               '200',    '2,000',   '10,000',   '40,000',   '100,000']),
      mk(['GMV',                 '$500K',  '$20M',    '$100M',    '$400M',    '$1B'], false, true),
      mk(['Revenue',             '$60K',   '$2.5M',   '$14M',     '$60M',     '$180M'], false, true),
      mk(['Gross margin',        '80%',    '82%',     '85%',      '85%',      '85%']),
      mk(['Team size',           '6',      '30',      '75',       '150',      '300']),
      mk(['Monthly burn',        '$200K',  '$500K',   '$1.5M',    '$3M',      'Profitable']),
      mk(['Cumulative raised',   '$1M',    '$5M',     '$20M',     '$60M',     '$160M']),
    ],
  });
};

// Hiring plan table
const hiringTable = () => {
  const cols = [2340, 7020];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Phase', 'Key hires'], true),
      mk(['Pre-seed (6 mo)',   '1 full-stack engineer, 1 creator-ops lead']),
      mk(['Seed (12 mo)',      '+1 growth lead, +1 product designer, +2 engineers, +1 creator success, +1 owner success']),
      mk(['Series A (18 mo)',  '+VP Engineering, +VP Growth, +Head of Trust & Safety, +10 ICs across product, engineering, ops']),
      mk(['Series B (24 mo)',  '+CFO, +Head of International, +Legal / Compliance lead, +30 ICs']),
      mk(['Series C (36 mo)',  '+COO, +Head of New Verticals, +CMO, +100 ICs']),
    ],
  });
};

// Funding strategy table
const fundingTable = () => {
  const cols = [1300, 1600, 1900, 1400, 3160];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
      align: (i === 1 || i === 2 || i === 3) ? AlignmentType.RIGHT : AlignmentType.LEFT,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Round', 'Target', 'Post-money', 'Dilution', 'Trigger to raise'], true),
      mk(['Pre-seed',  '$1M',   '$8M',    '12.5%', 'Working prototype + founder network (now)']),
      mk(['Seed',      '$4M',   '$20M',   '20%',   'Pilot city traction: 500 creators, 200 stays']),
      mk(['Series A',  '$15M',  '$75M',   '20%',   '$2M ARR, 10K creators, proven unit economics']),
      mk(['Series B',  '$40M',  '$250M',  '16%',   '$25M ARR, international expansion readiness']),
      mk(['Series C',  '$100M', '$800M',  '12.5%', '$100M ARR, multi-vertical proof']),
    ],
  });
};

// Risk table
const riskTable = () => {
  const cols = [2400, 1300, 1200, 4460];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
      align: (i === 1 || i === 2) ? AlignmentType.CENTER : AlignmentType.LEFT,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Risk', 'Likelihood', 'Impact', 'Mitigation'], true),
      mk(['Airbnb / Booking.com clones the feature',      'Medium', 'High',   'Own the two-sided operational graph before they do; creator loyalty via commission share.']),
      mk(['Creator economy slowdown',                     'Low',    'Medium', 'Focus on mid-tier creators (less volatile than top 1%); diversify to owner SaaS revenue.']),
      mk(['Platform algorithm risk (IG, TikTok)',         'Medium', 'Medium', 'Build on first-party data; don\u2019t depend on follower counts; audience-fit > raw size.']),
      mk(['Chicken-and-egg at pilot (marketplace)',       'High',   'High',   'Solve in a single city with manual matchmaking; leverage Charmed Collective\u2019s existing network.']),
      mk(['Regulatory (FTC creator disclosure)',          'Low',    'Medium', 'Disclosure is baked into the product — creator commission is shown in the price line.']),
      mk(['Trust & safety (bad actors on any side)',      'Medium', 'High',   'Two-sided reputation; manual review at pilot stage; policy engine + payouts escrow at scale.']),
    ],
  });
};

// KPI table
const kpiTable = () => {
  const cols = [3000, 6360];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header || i === 0,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
    })),
  });
  return new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['KPI', 'Definition & why it matters'], true),
      mk(['GMV',                   'Total bookings \u00d7 avg nightly rate \u00d7 nights. The headline scale metric.']),
      mk(['Realized take rate',    'Revenue / GMV. Proof the monetization model holds under real behavior.']),
      mk(['Creator NPS',           'Survey creators every 90 days. Below 40 is a structural warning.']),
      mk(['Owner NPS',             'Survey owners every 90 days. Owner satisfaction is the rate-limiter on listings.']),
      mk(['Deliverable completion','% of trades where the creator posted what they committed to. Keeps the trust engine honest.']),
      mk(['Traveler repeat rate',  '% of travelers who book a second stay within 12 months. Marketplace stickiness.']),
      mk(['Premium conversion',    '% of creators on the $9.99/mo plan. Direct signal of product-market fit on the creator side.']),
    ],
  });
};

// --- content sections ----------------------------------------------
function coverPage() {
  return [
    new Paragraph({
      children: [new TextRun({ text: 'VIA', size: 180, bold: true, font: 'Georgia', color: COL.ink })],
      spacing: { before: 2400, after: 240 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Travel by way of trust.', size: 36, italics: true, font: 'Georgia', color: COL.orangeD })],
      spacing: { after: 600 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Business Plan & Action Plan to $1B', size: 32, bold: true, color: COL.ink })],
      spacing: { after: 120 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Prepared by Cierra Bellamy  \u00b7  Founder & CEO', size: 22, color: COL.ink2 })],
      spacing: { after: 80 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'April 2026', size: 22, color: COL.muted })],
      spacing: { after: 1600 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Confidential. For investor discussion only.', size: 18, color: COL.muted, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
    }),
    sectionBreak(),
  ];
}

function execSummary() {
  return [
    p('1. Executive Summary', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Via is building the trust layer of travel. By turning creator recommendations into a bookable, commissioned marketplace \u2014 where creators, stay owners, and travelers all transact on a single platform \u2014 Via solves the $48B annual pain of influencer-driven travel that today runs on cold DMs, lost spreadsheets, and comped stays that never delivered.'),
    p('We enter through a sharp wedge: the first proper CRM for content-for-stay trades. Creators get a pipeline. Owners get ranked applications and deliverable tracking. That operational surface becomes the proprietary graph underneath a three-sided marketplace where travelers book the stays their favorite creators actually endorse \u2014 and every booking pays the creator back.'),
    p('Our path to $1B in enterprise value is a disciplined, six-phase build: pilot city \u2192 vertical density in five cities \u2192 national US scale \u2192 international expansion \u2192 adjacent verticals \u2192 IPO or strategic outcome. Each phase has explicit exit criteria, so capital deploys against proof, not narrative.'),
    p('The prototype is live. The founder has lived the problem \u2014 Cierra has personally run hundreds of content-for-stay deals through Charmed Collective Agency. The wedge is de-risked. The market is ready.'),
    rp([
      { text: 'We are raising a ', size: 24 },
      { text: '$1M pre-seed', size: 24, bold: true },
      { text: ' to launch the pilot city in H2 2026 and put the first 50 creators and 20 stays on the platform.', size: 24 },
    ]),
    sectionBreak(),
  ];
}

function vision() {
  return [
    p('2. The Vision \u2014 Travel by way of trust', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Every era of travel is defined by whoever holds the trust. In the 20th century it was friends and word-of-mouth. In the 2000s and 2010s, Airbnb and Tripadvisor rebuilt travel on strangers\u2019 reviews. That model is buckling: reviews are gamed, hotels are indistinguishable, and Gen Z no longer books from a stranger. They book from someone they already follow.'),
    p('Via\u2019s thesis in one sentence:', { run: { italics: true }, spacing: { after: 60 } }),
    rp([{ text: 'No traveler should book a stay without the person who inspired it earning for surfacing it.', italics: true, size: 28, color: COL.orangeD }]),
    p('We earn that position in three arcs:'),
    numbered('Own the operational plumbing between creators and stay owners (2026\u20132027). Become the default CRM that replaces Gmail folders, Notion trackers, and "did they ever post?" spreadsheets.', 'nums-vision'),
    numbered('Turn that data into the highest-trust discovery feed in travel (2027\u20132029). Travelers browse creators they already follow; every stay ships with proof that a real person stayed, reviewed, and was paid to tell the truth.', 'nums-vision'),
    numbered('Become the booking rail creators default to \u2014 in travel first, and then in restaurants, experiences, and wellness (2029+). The moat is the graph.', 'nums-vision'),
    sectionBreak(),
  ];
}

function market() {
  return [
    p('3. Market Opportunity', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('3.1  Market sizing', { heading: HeadingLevel.HEADING_2 }),
    bullet('TAM \u2014 $500B: global short-term + boutique stays (Skift / AirDNA, 2024).'),
    bullet('SAM \u2014 $48B: influencer-driven travel spend in North America and Europe, applying a 3.5\u00d7 booking-intent lift to the 74% of Gen Z who report creator influence on their last trip (Phocuswright, 2024).'),
    bullet('SOM \u2014 $240M reachable within 3 years: 2M mid-tier travel creators \u00d7 1.2 bookings/month \u00d7 \u20ac100 avg nightly rate \u00d7 10% take. Conservative bottom-up.'),
    p('3.2  Why now', { heading: HeadingLevel.HEADING_2 }),
    bullet('Gen Z trust has migrated: 74% say creators influenced their last travel decision (Phocuswright, 2024).'),
    bullet('The mid-tier creator cohort (10K\u2013500K followers) has grown to 2M+ globally (HypeAuditor, 2025). This is the audience big brands don\u2019t reach but small stays desperately need.'),
    bullet('Booking-intent lift from a creator endorsement is 3.5\u00d7 that of a traditional ad (MediaKix meta-analysis).'),
    bullet('Infrastructure has not kept up. Airbnb\u2019s "book from a stranger\u2019s 4.8 stars" model is past its peak. Creator tools (Passionfroot, Aspire) are brand-side, not travel-native.'),
    sectionBreak(),
  ];
}

function problem() {
  return [
    p('4. The Problem \u2014 Trust collapse and operational chaos', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('4.1  For creators', { heading: HeadingLevel.HEADING_2 }),
    p('Pitch into the void. Travel creators send hundreds of cold DMs a month to hotels, villas, and Airbnbs. No templates. No tracking. No way to prove audience fit before the "no." Revenue is trapped in one-off brand deals and sponsored posts; no recurring upside on the trips they actually took.'),
    p('4.2  For stay owners', { heading: HeadingLevel.HEADING_2 }),
    p('Drowning in unfit asks. Every boutique owner who has ever posted on Instagram gets flooded with creator DMs, most of whom will never drive an actual booking. Owners have no signal on audience fit, no deliverable follow-through, and no post-stay metric to tell them whether comping that villa was worth it.'),
    p('4.3  For travelers', { heading: HeadingLevel.HEADING_2 }),
    p('Reviews don\u2019t scale trust. A modern traveler wants to stay at the place their favorite creator actually loved \u2014 not the one with the most 5-star reviews from strangers. Today, that information lives in ephemeral Instagram Stories and unsearchable TikTok captions.'),
    p('Every stakeholder loses. Meanwhile, $48B in influencer-driven travel spend routes through cold DMs and Google Docs.', { run: { italics: true, color: COL.orangeD } }),
    sectionBreak(),
  ];
}

function solution() {
  return [
    p('5. The Solution \u2014 A three-sided marketplace with a CRM wedge', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('5.1  Day-one product \u2014 the CRM wedge', { heading: HeadingLevel.HEADING_2 }),
    p('Via launches as the first proper CRM for content-for-stay trades:'),
    bullet('Creators apply once, not a hundred times. A single profile with audience data, past stays, and deliverable history.'),
    bullet('Owners see applications ranked by audience-fit, not follower count.'),
    bullet('Deliverables are tracked through approval gates \u2014 no stay is comped without the post going up.'),
    bullet('Two-sided reputation is captured from day one (owners rate creators, creators rate owners).'),
    p('5.2  Year-two product \u2014 the traveler marketplace', { heading: HeadingLevel.HEADING_2 }),
    p('Once the operational graph exists, the traveler app turns on:'),
    bullet('Travelers follow their favorite creators and see the stays those creators actually endorsed.'),
    bullet('Every booking pays the creator a commission \u2014 10% standard, 15% for Premium creators.'),
    bullet('Stays are ranked by creator endorsement quality, not by stranger reviews.'),
    p('The fundamental insight: the operational graph we build with the CRM in Year 1 is the data asset that makes the Year-2 marketplace un-cloneable.'),
    sectionBreak(),
  ];
}

function businessModel() {
  return [
    p('6. Business Model & Unit Economics', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('6.1  Three revenue lines', { heading: HeadingLevel.HEADING_2 }),
    bullet('Booking take rate: 10% on every traveler booking; 15% on bookings surfaced by Premium creators.'),
    bullet('Creator Premium: $9.99 / month. Unlimited applications, priority review, analytics, higher commission share. Free tier is 1 application / month.'),
    bullet('Owner SaaS (Year 2+): $49 / month per listing for analytics, priority placement, and campaign tools.'),
    p('6.2  Year-2 steady-state unit economics (creator side)', { heading: HeadingLevel.HEADING_2 }),
    bullet('Average creator LTV: $1,200 (24-month retention \u00d7 $50 avg monthly commission + Premium).'),
    bullet('Blended CAC: $80 (organic + paid seed across Instagram, TikTok, podcast sponsorships).'),
    bullet('LTV:CAC = 15:1.'),
    bullet('Gross margin: 85% (payment processing ~3%, refund reserve ~2%, platform ops minimal).'),
    bullet('Contribution margin: 70% after creator success operations.'),
    p('6.3  Why the model compounds', { heading: HeadingLevel.HEADING_2 }),
    p('Every new creator brings an audience that discovers new stays. Every new stay gives creators more to pitch. Every booking pays the creator who surfaced it, turning the marketplace into a continuous income stream. The commission is the glue that converts content into loyalty.'),
    sectionBreak(),
  ];
}

function competitive() {
  return [
    p('7. Competitive Landscape', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Nobody owns this category end-to-end today. Every adjacent player leaves a seam Via closes.'),
    competitiveTable(),
    p('7.1  Defensibility', { heading: HeadingLevel.HEADING_2, spacing: { before: 360 } }),
    p('Via\u2019s moat is the two-sided operational graph. Once creators and owners live inside our CRM \u2014 with applications, deliverables, reputation, and payouts all in-platform \u2014 switching costs are structural. A competitor would need to rebuild both sides from scratch, and neither side has an incentive to move without the other.'),
    sectionBreak(),
  ];
}

function gtm() {
  return [
    p('8. Go-to-Market Strategy', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('We densify vertically \u2014 by geography and by creator niche \u2014 not horizontally.'),
    p('8.1  Pilot city: how we pick it', { heading: HeadingLevel.HEADING_2 }),
    bullet('Target: Los Angeles or Lisbon. Both have dense concentrations of travel creators and boutique stays, both are English-native for operators, and both have existing creator relationships through Charmed Collective.'),
    bullet('Launch criteria: 50 hand-picked creators + 20 vetted stays ready to transact within the first 90 days of MVP launch.'),
    p('8.2  Acquisition playbook', { heading: HeadingLevel.HEADING_2 }),
    bullet('Creator-side: Warm intros through Cierra\u2019s existing Charmed Collective network for the first 50; then a paid creator referral program ($50 credit for each creator who brings another live creator to the platform).'),
    bullet('Owner-side: Direct outreach to 200 hand-picked boutique stays via Instagram DM and email, offering 3 months of free listing + 1 free curated creator match.'),
    bullet('Traveler-side: Wait until there are 100+ endorsed stays in one city, then run creator-led launch posts tagged with a unique Via referral link. Seed with a waitlist early.'),
    p('8.3  Density first, breadth later', { heading: HeadingLevel.HEADING_2 }),
    p('We will resist the temptation to expand to a second city until the first hits 200+ stays and 500+ creators. Thin coverage in many cities kills marketplaces; deep coverage in one city is how Airbnb won Paris, Kickstarter won Brooklyn, and how Via wins its first metro.'),
    sectionBreak(),
  ];
}

function flywheel() {
  return [
    p('9. The Flywheel', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Via\u2019s flywheel is a closed loop from day one because every booking pays the creator who surfaced it \u2014 the feedback loop most competitors leave open.'),
    numbered('More creators apply to more stays through the CRM.', 'nums-flywheel'),
    numbered('More endorsed stays get discovered by travelers.', 'nums-flywheel'),
    numbered('More travelers book high-trust stays.', 'nums-flywheel'),
    numbered('Every booking pays the creator who surfaced it.', 'nums-flywheel'),
    numbered('Creators earn, retain, and bring other creators in.', 'nums-flywheel'),
    numbered('Owners see ROI and list more properties.', 'nums-flywheel'),
    numbered('The cycle compounds.', 'nums-flywheel'),
    p('Unlike affiliate links (where attribution is broken and payouts are delayed), Via\u2019s booking rail lets us pay commission in real time, close the attribution loop, and build creator loyalty through cash, not clout.', { run: { italics: true } }),
    sectionBreak(),
  ];
}

function roadmap() {
  return [
    p('10. The Six-Phase Action Plan to $1B', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('This is the operating plan. Each phase has a primary goal, a funding round, a team shape, and explicit exit criteria that must be hit before the next phase begins.'),
    phaseTable(),

    p('10.1  Phase 1 \u2014 Foundation (Months 0\u20136)', { heading: HeadingLevel.HEADING_2, spacing: { before: 400 } }),
    p('Goal: de-risk the wedge in a single city.'),
    bullet('Raise $1M pre-seed (angels + micro-VCs).'),
    bullet('Hire: 1 full-stack engineer, 1 creator-ops lead.'),
    bullet('Ship MVP: creator applications, owner inbox, deliverable tracker, manual matchmaking.'),
    bullet('Seed the pilot city with 50 creators + 20 stays from the Charmed Collective network.'),
    bullet('Instrument every action; build the dataset that will make the marketplace work in Phase 2.'),
    p('Exit criteria: 20 stays booked through the platform, 80% creator retention at 90 days, 30 completed deliverables with owner approval. If we miss, we extend runway with a bridge \u2014 we do not move to Phase 2.', { run: { italics: true, color: COL.orangeD } }),

    p('10.2  Phase 2 \u2014 Traction (Months 6\u201318)', { heading: HeadingLevel.HEADING_2 }),
    p('Goal: prove the marketplace flywheel in one city, then copy it to four more.'),
    bullet('Raise $4M seed, priced off pilot-city proof.'),
    bullet('Hire: +1 growth lead, +1 product designer, +2 engineers, +1 creator success, +1 owner success (team of 10).'),
    bullet('Launch the traveler marketplace in the pilot city.'),
    bullet('Expand to 5 cities: Los Angeles, Lisbon, Mexico City, Austin, Miami (or equivalents selected by density).'),
    bullet('Introduce Premium ($9.99 creator) and test owner SaaS pricing.'),
    p('Exit criteria: 500 creators, 200 stays, $500K GMV, 60% net revenue retention, 20% of creators on Premium.'),

    p('10.3  Phase 3 \u2014 Scale (Months 18\u201336)', { heading: HeadingLevel.HEADING_2 }),
    p('Goal: national US coverage and self-service onboarding.'),
    bullet('Raise $15M Series A.'),
    bullet('Team grows to 30. Add VP Engineering, VP Growth, Head of Trust & Safety.'),
    bullet('Self-service onboarding replaces manual vetting; policy engine handles applications at scale.'),
    bullet('Launch Owner SaaS tier at $49/month per listing.'),
    bullet('Open a public API for stay-management software (Hostfully, Guesty) to sync listings into Via.'),
    p('Exit criteria: 10K creators, 2K stays, $20M GMV, $2M ARR.'),

    p('10.4  Phase 4 \u2014 International (Years 3\u20135)', { heading: HeadingLevel.HEADING_2 }),
    p('Goal: prove the model works outside North America.'),
    bullet('Raise $40M Series B.'),
    bullet('Team grows to 75\u2013150. Add CFO, Head of International, Legal / Compliance.'),
    bullet('Launch EU (Paris, Lisbon, Barcelona first) and LatAm (Mexico City, Buenos Aires).'),
    bullet('Multi-currency payouts; localized trust & safety; regional creator-ops teams.'),
    bullet('Acquire a smaller creator-tools company if strategic (e.g., a travel-creator talent agency or analytics tool).'),
    p('Exit criteria: 100K creators, 20K stays, $250M GMV, $25M ARR.'),

    p('10.5  Phase 5 \u2014 Category leader (Years 5\u20137)', { heading: HeadingLevel.HEADING_2 }),
    p('Goal: expand beyond stays into the full creator-curated consumption stack.'),
    bullet('Raise $100M Series C.'),
    bullet('Team grows to 200\u2013300. Add COO, Head of New Verticals, CMO.'),
    bullet('Launch adjacent verticals: restaurants, experiences (tours, classes), wellness (retreats, spas).'),
    bullet('Launch Via Business: white-label creator-booking infrastructure sold to brands and DMCs.'),
    bullet('Consider SPAC or dual-track IPO readiness work starting Year 6.'),
    p('Exit criteria: $1B GMV run rate, $100M+ ARR, 3 consumer verticals live, positive contribution margin.'),

    p('10.6  Phase 6 \u2014 Outcome (Year 7+)', { heading: HeadingLevel.HEADING_2 }),
    p('Goal: lock in the category.'),
    bullet('IPO path: $1B+ ARR run rate, >80% gross margin, positive contribution margin for four consecutive quarters.'),
    bullet('OR strategic outcome: Airbnb, Expedia, Booking Holdings, Meta, or TikTok Shop acquires Via as the creator-booking rail for their stack.'),
    bullet('Target enterprise value: $5\u201310B.'),
    sectionBreak(),
  ];
}

function financials() {
  return [
    p('11. Financial Projections (5-Year)', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Projections are bottom-up, built on unit economics rather than market-share assumptions. Year-5 GMV of $1B implies ~0.2% of SAM \u2014 a conservative capture rate for a category-defining platform.'),
    financialsTable(),
    p('11.1  Revenue mix by Year 5', { heading: HeadingLevel.HEADING_2, spacing: { before: 360 } }),
    bullet('Booking take rate: 72% of revenue ($130M)'),
    bullet('Creator Premium: 16% of revenue ($28M across ~240K Premium creators)'),
    bullet('Owner SaaS + other: 12% of revenue ($22M)'),
    p('11.2  Path to profitability', { heading: HeadingLevel.HEADING_2 }),
    p('We expect to reach contribution-positive by Year 3 on the creator cohort, and company-level profitability in Year 5 as international expansion absorbs the last large investment cycle.'),
    sectionBreak(),
  ];
}

function team() {
  return [
    p('12. Team & Hiring Plan', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('We hire against the exit criteria of the current phase. No speculative roles; every headcount closes a specific bottleneck.'),
    hiringTable(),
    p('12.1  Who Cierra hires first, and why', { heading: HeadingLevel.HEADING_2, spacing: { before: 360 } }),
    bullet('Full-stack engineer: owns the product surface end-to-end through MVP. Optimizes for shipping, not scaling.'),
    bullet('Creator-ops lead: runs the hand-matchmaking for Phase 1, builds the playbook that self-service will automate in Phase 3. This hire is the bridge between Cierra\u2019s founder network and the scaled team.'),
    sectionBreak(),
  ];
}

function funding() {
  return [
    p('13. Funding Strategy', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('We raise against milestones, not calendar. Each round should de-risk the next phase on the strength of the previous phase\u2019s exit criteria.'),
    fundingTable(),
    p('13.1  Dilution and founder ownership', { heading: HeadingLevel.HEADING_2, spacing: { before: 360 } }),
    p('Cumulative dilution over five years is approximately 60%. With standard option pool refreshes, founder ownership at an IPO or strategic exit remains in the 25\u201330% range \u2014 a healthy outcome for a category-defining marketplace.'),
    p('13.2  Pre-seed use of funds', { heading: HeadingLevel.HEADING_2 }),
    bullet('40% Product: MVP polish, two-sided auth, Stripe Connect payments, trust & safety baseline.'),
    bullet('40% Go-to-market: seeding the first 50 creators and 20 stays; creator-ops lead compensation; pilot-city launch events.'),
    bullet('20% Founding team: one engineer, one creator-ops lead alongside the founder.'),
    sectionBreak(),
  ];
}

function risks() {
  return [
    p('14. Risks & Mitigations', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    riskTable(),
    sectionBreak(),
  ];
}

function kpis() {
  return [
    p('15. Key Milestones & KPIs', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('We report on the same seven KPIs every quarter, to every investor. Consistency of reporting is how we build trust with capital partners across five years of rounds.'),
    kpiTable(),
    sectionBreak(),
  ];
}

function founderFit() {
  return [
    p('16. Why Cierra. Why now.', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Cierra Bellamy founded Charmed Collective Agency and has spent years brokering content-for-stay deals across Airbnbs, villas, and boutique hotels. She has personally sent the cold DMs, negotiated the comped stays, and chased creators for the post that never went up.'),
    p('That lived experience is the founder-problem fit that Via\u2019s investors should underwrite. Specifically:'),
    bullet('She knows the shape of every failure mode in a content-for-stay trade because she has personally debugged hundreds of them.'),
    bullet('Her existing network unlocks the cold-start problem: warm intros to the first 50 creators and 20 stays, bypassing the chicken-and-egg trap that kills most marketplaces.'),
    bullet('She speaks both sides fluently. Creators trust her because she\u2019s been their advocate; owners trust her because she\u2019s delivered real results on their listings.'),
    p('Beyond founder fit, the timing could not be sharper. The creator economy is mature enough to transact on (Phase 2 creator tooling is investable). Gen Z is old enough to be a paying travel cohort. And the reviews-based OTA model is eroding visibly \u2014 Airbnb\u2019s own guests now say they can\u2019t tell listings apart.'),
    sectionBreak(),
  ];
}

function cta() {
  return [
    p('17. The Ask', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    rp([
      { text: 'Via is raising ', size: 28 },
      { text: '$1M pre-seed', size: 28, bold: true, color: COL.orangeD },
      { text: ' to launch the pilot city in H2 2026, with a clear path through Seed ($4M), Series A ($15M), Series B ($40M), and Series C ($100M) to a billion-dollar outcome within seven years.', size: 28 },
    ]),
    p('The prototype is live. The wedge is de-risked. The founder fit is rare. The market is ready.'),
    new Paragraph({
      children: [new TextRun({ text: 'Travel by way of trust.', size: 40, italics: true, font: 'Georgia', color: COL.orangeD })],
      spacing: { before: 600, after: 480 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Cierra Bellamy  \u00b7  cierra@charmedcollectiveagency.com', size: 22, color: COL.ink2 })],
      alignment: AlignmentType.CENTER,
    }),
  ];
}

// --- document ------------------------------------------------------
const doc = new Document({
  creator: 'Cierra Bellamy',
  title: 'Via — Business Plan & Action Plan to $1B',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } }, // 11pt
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Georgia', color: COL.ink },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Georgia', color: COL.ink },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      ...['numbers', 'nums-vision', 'nums-flywheel'].map(ref => ({
        reference: ref,
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      })),
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'Via  \u00b7  Business Plan', size: 18, color: COL.muted, italics: true }),
            new TextRun({ text: '\t' }),
            new TextRun({ text: 'Confidential', size: 18, color: COL.muted, italics: true }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: COL.line, space: 4 } },
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'Cierra Bellamy  \u00b7  cierra@charmedcollectiveagency.com', size: 18, color: COL.muted }),
            new TextRun({ text: '\t' }),
            new TextRun({ text: 'Page ', size: 18, color: COL.muted }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: COL.muted }),
            new TextRun({ text: ' of ', size: 18, color: COL.muted }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: COL.muted }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
        })],
      }),
    },
    children: [
      ...coverPage(),
      ...execSummary(),
      ...vision(),
      ...market(),
      ...problem(),
      ...solution(),
      ...businessModel(),
      ...competitive(),
      ...gtm(),
      ...flywheel(),
      ...roadmap(),
      ...financials(),
      ...team(),
      ...funding(),
      ...risks(),
      ...kpis(),
      ...founderFit(),
      ...cta(),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  const out = '/sessions/adoring-modest-cray/mnt/outputs/via-business-plan.docx';
  fs.writeFileSync(out, buf);
  console.log('Wrote', out);
}).catch(err => { console.error(err); process.exit(1); });
