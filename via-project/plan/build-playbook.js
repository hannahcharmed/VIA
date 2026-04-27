// Via — Execution Playbook
// Tactical, week-by-week / month-by-month companion to the business plan.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TabStopType, HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
} = require('docx');

const COL = {
  ink: '15110D', ink2: '524840', muted: '958B7E',
  orange: 'E8A574', orangeD: 'D88A54',
  cream: 'FAF6EC', sandS: 'F1E7D2', yellowS: 'FDF8DD', line: 'EAE2CE',
};

// ---------- helpers ----------
const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, ...(opts.run || {}) })],
  spacing: { after: 120, ...(opts.spacing || {}) },
  alignment: opts.alignment,
  heading: opts.heading,
  ...(opts.pageBreakBefore ? { pageBreakBefore: true } : {}),
});

const rp = (runs, opts = {}) => new Paragraph({
  children: runs.map(r => new TextRun(typeof r === 'string' ? r : r)),
  spacing: { after: 120, ...(opts.spacing || {}) },
  alignment: opts.alignment,
  heading: opts.heading,
  ...(opts.pageBreakBefore ? { pageBreakBefore: true } : {}),
});

const bullet = (text, ref = 'bullets') => new Paragraph({
  children: [new TextRun(text)],
  numbering: { reference: ref, level: 0 },
  spacing: { after: 60 },
});

const numbered = (text, ref) => new Paragraph({
  children: [new TextRun(text)],
  numbering: { reference: ref, level: 0 },
  spacing: { after: 60 },
});

const h2 = (text, opts = {}) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun(text)],
  spacing: { before: 320, after: 120 },
  ...(opts.pageBreakBefore ? { pageBreakBefore: true } : {}),
});
const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun(text)],
  spacing: { before: 240, after: 80 },
});

const dayRow = (day, body) => new Paragraph({
  children: [
    new TextRun({ text: day, bold: true, color: COL.orangeD }),
    new TextRun({ text: '\u00a0\u00a0' + body }),
  ],
  spacing: { after: 60 },
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const hr = () => new Paragraph({
  children: [new TextRun('')],
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COL.orangeD, space: 1 } },
  spacing: { after: 240 },
});

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
          children: [new TextRun({ text: t, bold: opts.bold, color: opts.color })],
          spacing: { after: 0 },
          alignment: opts.align,
        })
      : t
  ),
});

const TABLE_W = 9360;

// ---------- content blocks ----------
function coverPage() {
  return [
    new Paragraph({
      children: [new TextRun({ text: 'VIA', size: 160, bold: true, font: 'Georgia', color: COL.ink })],
      spacing: { before: 2400, after: 240 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Execution Playbook', size: 44, italics: true, font: 'Georgia', color: COL.orangeD })],
      spacing: { after: 480 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Your week-by-week operating manual', size: 28, bold: true, color: COL.ink })],
      spacing: { after: 120 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'From tomorrow to $1B, in 84 months', size: 22, color: COL.ink2, italics: true })],
      spacing: { after: 1600 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Companion to the Via Business Plan  \u00b7  April 2026', size: 18, color: COL.muted, italics: true })],
      alignment: AlignmentType.CENTER,
    }),
    pageBreak(),
  ];
}

function howToUse() {
  return [
    p('How to use this document', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('This playbook turns the business plan into a sequence of actions you can actually execute. It is organized by time, not by topic, because startups die from bad sequencing more often than bad strategy.'),
    p('Read rules:'),
    bullet('Part 1 (Next 30 days) is day-by-day. Do it in order.'),
    bullet('Part 2 (Months 1\u20136) is week-by-week inside each month. Adjust timing, keep sequence.'),
    bullet('Parts 3\u20137 are directional. Re-plan in detail at the start of each phase using this structure.'),
    bullet('Part 8 is the weekly operating rhythm. Install it in Month 1 and never skip it.'),
    bullet('Part 9 lists the eight decisions that matter most. If you only have bandwidth to think hard about eight things, make them these.'),
    bullet('Part 10 is a 100-day checklist you can print and tape above your desk.'),
    p('If you hit a wall on sequencing, the rule is: revenue gates everything else. No hire, no ad spend, no expansion until the current phase\u2019s revenue milestone is closer than it was last week.', { run: { italics: true, color: COL.orangeD } }),
    pageBreak(),
  ];
}

// ---------- PART 1: NEXT 30 DAYS ----------
function part1() {
  return [
    p('Part 1 \u2014 The Next 30 Days', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('You are not raising yet. The first 30 days exist to prepare: sharpen the story, build the fundraising list, set up legal and financial plumbing, and soft-launch outreach. Investors can smell an unprepared founder. Do the work first.'),

    h2('Week 1 \u2014 Sharpen the story'),
    dayRow('Mon',  'Decide the pilot city (see decision framework, Part 9). The single biggest early decision.'),
    dayRow('Tue',  'Fill in the two deck placeholders: Founder\u2013problem fit (years at Charmed, number of trades run, number of creators in your network) and The Ask (city + $1M).'),
    dayRow('Wed',  'Write your story in three lengths: 30-second elevator, 2-minute origin, 5-minute full pitch. Record each. Listen back \u2014 cut anything that sounds rehearsed.'),
    dayRow('Thu',  'Rehearse the 5-minute pitch with three people outside your bubble. Ask each: "What would stop you from investing?" Write down every answer.'),
    dayRow('Fri',  'Rewrite the deck\u2019s problem and solution slides using the exact words those three people used. Investors underwrite pattern matching \u2014 speak their language, not yours.'),

    h2('Week 2 \u2014 Build the fundraising stack'),
    dayRow('Mon',  'Build target list of 50\u201375 names: 20 angels (travel, creator economy, marketplace operators), 15 pre-seed funds with $250K\u2013$1M check size, 10 scout checks, 10 warm-intro-only targets.'),
    dayRow('Tue',  'Create a fundraising CRM in Airtable or Notion. Columns: Name, Firm, Warm-intro path, Priority (1\u20133), Stage, Last contact, Next action, Date. Update daily.'),
    dayRow('Wed',  'Write three email templates: (a) cold intro with prototype link, (b) warm-intro follow-up after an intro email, (c) post-meeting thank-you with deck and SAFE terms.'),
    dayRow('Thu',  'Map the intro graph. For each target: who in your existing network knows them? List the top three intro paths for each of the top 25 priority investors.'),
    dayRow('Fri',  'Prep the data room: pitch deck (pdf), business plan (pdf), prototype link, SAFE doc, FAQ. Host it on a password-protected DocSend-equivalent so you can see who opens what.'),

    h2('Week 3 \u2014 Legals and money plumbing'),
    dayRow('Mon',  'Incorporate as a Delaware C-corp. Use Clerky or Stripe Atlas, ~$500. Do not use LegalZoom.'),
    dayRow('Tue',  'File for an EIN. Required before banking. Takes one day online.'),
    dayRow('Wed',  'Open a business bank account (Mercury or Brex are startup-native). Set up basic bookkeeping with Pilot or Bench.'),
    dayRow('Thu',  'Draft founder stock with a 4-year vesting schedule and 1-year cliff. Use Y Combinator\u2019s post-money SAFE template for the round. Cap the round at $8M post-money.'),
    dayRow('Fri',  'Engage a startup lawyer for review only (Cooley, Goodwin, Wilson Sonsini all have startup rates). Do not do this before Week 3 \u2014 spending on lawyers too early is a first-time-founder tax.'),

    h2('Week 4 \u2014 First outreach'),
    dayRow('Mon',  'Soft launch to your warmest 10 angels. Personal ask: "I\u2019m starting to take first meetings next week. Would love 30 minutes with you before that." Goal: get 3\u20135 on the calendar.'),
    dayRow('Tue',  'Send first 15 warm-intro requests via email. Template: who you are, one-sentence pitch, the specific intro, prototype link, "no pressure if not a fit."'),
    dayRow('Wed',  'Take first meetings. For each: pitch, capture feedback, ask for two warm intros. Track in CRM before you close your laptop.'),
    dayRow('Thu',  'Iterate the deck based on what didn\u2019t land. Expect to rewrite the problem slide three times. That\u2019s normal.'),
    dayRow('Fri',  'Kick off recruiting: post the engineer and creator-ops roles on Y Combinator\u2019s Work at a Startup, Wellfound (AngelList), and your network. Source candidates in parallel with fundraising.'),

    pageBreak(),
  ];
}

// ---------- PART 2: MONTHS 1-6 ----------
function part2() {
  const sec = [];
  sec.push(p('Part 2 \u2014 Months 1\u20136: Phase 1 (Foundation)', { heading: HeadingLevel.HEADING_1 }));
  sec.push(hr());
  sec.push(p('The goal of Phase 1 is not to build a unicorn. It is to de-risk the wedge in a single city with a tight cohort of creators and stays. Every dollar, hire, and line of code in these six months should move you toward three exit criteria: 20 stays booked, 80% creator retention at 90 days, 30 completed deliverables.'));

  // Month 1
  sec.push(h2('Month 1 \u2014 Close first checks and start hiring'));
  sec.push(h3('Fundraising'));
  sec.push(bullet('Goal: close $300K of soft-committed angel money this month. Angel checks catalyze fund checks.'));
  sec.push(bullet('Tactic: "I\u2019m announcing the round next week; I\u2019d love you in first with a $25\u201350K check." FOMO beats logic at pre-seed.'));
  sec.push(bullet('Second priority: get at least one fund meeting per week. A fund lead signals to angels and vice-versa.'));
  sec.push(h3('Product'));
  sec.push(bullet('Keep building the prototype solo. Priority: owner inbox + creator applications. The wedge.'));
  sec.push(bullet('End of month goal: a clickable demo URL investors can open during meetings.'));
  sec.push(h3('Supply side (stays)'));
  sec.push(bullet('Manually recruit 10 stays to the waitlist. DM 100 boutique hotels you already follow. Expected conversion: 10%.'));
  sec.push(bullet('Offer: 3 months free + 1 free curated creator match at launch.'));
  sec.push(h3('Demand side (creators)'));
  sec.push(bullet('Recruit 20 creators to the waitlist from your Charmed Collective network.'));
  sec.push(bullet('Personal outreach only \u2014 no mass emails. Quality matters more than quantity here.'));

  // Month 2
  sec.push(h2('Month 2 \u2014 Close the round and lock the team'));
  sec.push(h3('Fundraising'));
  sec.push(bullet('Close remaining $700K of the $1M round. If oversubscribed, allocate pro-rata; build an "observer" list for next round.'));
  sec.push(bullet('Send the first investor update on the last Monday of the month. Sections: wins, losses, KPIs, asks.'));
  sec.push(h3('Hiring'));
  sec.push(bullet('First engineer: target ex-Airbnb, ex-Uber, or ex-Etsy. Full-stack. $150K + 1\u20132% equity. Source: Y Combinator Work at a Startup, ex-marketplace operators.'));
  sec.push(bullet('First creator-ops lead: target ex-TikTok creator team, ex-YouTube partner program, or ex-talent agency. $120K + 0.5\u20131% equity. Source: LinkedIn + warm intros.'));
  sec.push(bullet('Rule: make the offer within 48 hours of deciding. Speed is your only advantage vs. bigger salaries.'));
  sec.push(h3('Product'));
  sec.push(bullet('Engineer starts building V1 of the CRM. Milestone: users can apply and be reviewed end-to-end by end of month.'));
  sec.push(bullet('You keep the prototype alive as a marketing tool and a design reference.'));

  // Month 3
  sec.push(h2('Month 3 \u2014 MVP soft-launch'));
  sec.push(h3('Product'));
  sec.push(bullet('V1 live: creator applications, owner inbox, deliverable tracker.'));
  sec.push(bullet('5 creators + 3 owners running real trades on the platform by week 2.'));
  sec.push(bullet('Daily feedback loops; ship 3\u20135 user-driven fixes per week.'));
  sec.push(h3('Operations'));
  sec.push(bullet('Creator-ops lead runs manual matchmaking for the first 5 trades. Document every friction point \u2014 this becomes the self-service blueprint in Phase 3.'));
  sec.push(bullet('Stand up a weekly creator call (30 min, open invite). Use it as both a support forum and a qualitative research engine.'));
  sec.push(h3('Fundraising'));
  sec.push(bullet('Pre-seed closed. Send monthly investor update on the first Monday of every month going forward, forever.'));

  // Month 4
  sec.push(h2('Month 4 \u2014 First bookings, first revenue'));
  sec.push(h3('Product'));
  sec.push(bullet('Booking flow live in soft beta.'));
  sec.push(bullet('Stripe Connect integration live. Money flows from traveler \u2192 platform \u2192 creator commission + owner payout.'));
  sec.push(bullet('Three real bookings through the platform by end of month.'));
  sec.push(h3('The metrics that matter now'));
  sec.push(bullet('Active creators (logged in last 30 days).'));
  sec.push(bullet('Applications submitted per active creator per month.'));
  sec.push(bullet('Application \u2192 approval conversion rate.'));
  sec.push(bullet('Approval \u2192 stay-completed rate.'));
  sec.push(bullet('Deliverable completion rate \u2014 the single most important Phase 1 metric.'));

  // Month 5
  sec.push(h2('Month 5 \u2014 Double the cohort'));
  sec.push(bullet('Supply side: 50 stays active on the platform.'));
  sec.push(bullet('Demand side: 100 creators active.'));
  sec.push(bullet('Bookings: 5 completed, 5 more in flight.'));
  sec.push(bullet('Hiring: optional first designer or part-time growth intern if fundraising allows, but do not over-hire. Runway is sacred.'));
  sec.push(bullet('Start Seed warm-up conversations with the funds you met in Week 2\u20133 of the playbook. Updates, not asks.'));

  // Month 6
  sec.push(h2('Month 6 \u2014 Phase 1 exit criteria check'));
  sec.push(p('Three must-haves before you start a Seed raise:'));
  sec.push(bullet('20+ stays booked through the platform.'));
  sec.push(bullet('80%+ creator retention at 90 days.'));
  sec.push(bullet('30+ completed deliverables with owner approval.'));
  sec.push(p('Plus a 60-second demo video showing the wedge end-to-end \u2014 creator applies, owner approves, traveler books, creator earns commission. Investors underwrite motion, not mockups.'));
  sec.push(rp([
    { text: 'If you miss any of the three: ', italics: true },
    { text: 'extend runway with a bridge SAFE. Do not raise Seed.', italics: true, bold: true, color: COL.orangeD },
  ]));
  sec.push(rp([
    { text: 'If you hit all three: ', italics: true },
    { text: 'begin Seed conversations in Month 7.', italics: true, bold: true, color: COL.orangeD },
  ]));
  sec.push(pageBreak());

  return sec;
}

// ---------- PART 3: MONTHS 7-18 ----------
function part3() {
  return [
    p('Part 3 \u2014 Months 7\u201318: Phase 2 (Traction)', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Phase 2 is where Via stops being a wedge CRM and becomes a three-sided marketplace. The goal is to prove the flywheel in one city, then copy-paste it to four more.'),

    h2('Months 7\u20139 \u2014 The Seed round + marketplace turn-on'),
    h3('Fundraising'),
    bullet('Target: $4M at $20M post. Lead check: $2\u20133M from a Seed-focused consumer fund.'),
    bullet('Pitch frame: "The CRM has worked. We have 500 creators, 200 stays, 60% NRR, $500K GMV. Now we\u2019re turning on the marketplace."'),
    bullet('Run a tight two-week process: fund meetings Monday\u2013Thursday, decisions by Friday of week two.'),
    h3('Product'),
    bullet('Launch traveler marketplace in pilot city only. Creator-led discovery feed, stay detail pages with creator endorsements, bookings.'),
    bullet('Introduce Premium creator tier ($9.99/mo) in soft launch. Measure conversion before expanding pricing tests.'),
    h3('Hiring (post-Seed close)'),
    bullet('Growth lead (paid acquisition + creator referral programs).'),
    bullet('Product designer.'),
    bullet('2 more engineers.'),
    bullet('Creator success + owner success (one each).'),

    h2('Months 10\u201312 \u2014 Five-city playbook'),
    bullet('Select four expansion cities by density score: creator count, boutique stay count, existing network, unit economics.'),
    bullet('Sequence the launches: one city per month, not all at once. Each launch should repeat the pilot\u2019s playbook with a local creator-ops contractor (not full-time).'),
    bullet('City-launch checklist: 25 seed stays, 50 seed creators, one local creator event, one launch post from a top creator in that city.'),
    bullet('Do not move on from a city until it hits 10+ bookings/month. Premature expansion is how marketplaces die.'),

    h2('Months 13\u201315 \u2014 Monetization experiments'),
    bullet('A/B test Premium pricing: $9.99 vs. $14.99 vs. $4.99. Measure conversion and churn at 30 and 60 days.'),
    bullet('Soft launch Owner SaaS at $49/mo/listing to the top 50 owners. Offer free for 3 months, then opt-in pricing.'),
    bullet('Instrument the take rate carefully: stated vs. realized is often 1\u20132% apart because of refunds, fee absorption, and promo credits.'),

    h2('Months 16\u201318 \u2014 Series A prep'),
    bullet('Lock in the metrics that matter to a Series A: ARR run rate, NRR by cohort, LTV/CAC by channel, Premium conversion, creator churn.'),
    bullet('Build the Series A data room early. Financial model in Excel with 3-year bottoms-up plan.'),
    bullet('Target A lead check: $8\u201310M from a top-tier consumer investor. Start relationship-building in Month 13, not Month 17.'),

    pageBreak(),
  ];
}

// ---------- PART 4: MONTHS 19-36 ----------
function part4() {
  return [
    p('Part 4 \u2014 Months 19\u201336: Phase 3 (Scale)', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Phase 3 is when Via shifts from a manual marketplace to a self-service platform. The hardest operational transition in the entire plan. If you do this one thing well, the rest of the way to Series B is mostly execution.'),

    h2('Quarter 1 (Months 19\u201321) \u2014 Close Series A, hire the leadership layer'),
    bullet('Close Series A at $15M on ~$75M post.'),
    bullet('Hire VP Engineering, VP Growth, and Head of Trust & Safety. These three roles carry you from 30 people to 100.'),
    bullet('Design the self-service onboarding flow end-to-end before writing a line of code.'),

    h2('Quarter 2 (Months 22\u201324) \u2014 Ship self-service'),
    bullet('Creators can apply to any stay without manual vetting; the system ranks applications automatically using audience-fit scoring.'),
    bullet('Owners can create listings without creator-ops involvement.'),
    bullet('Policy engine handles trust & safety baseline; human review queue for edge cases only.'),
    bullet('Your creator-ops team shrinks in relative terms \u2014 not by firing, by hiring slower while the marketplace grows faster.'),

    h2('Quarter 3 (Months 25\u201327) \u2014 National US launch'),
    bullet('Open the US to any city organically. Remove the city-gated experience.'),
    bullet('Invest in national creator acquisition: paid TikTok + Instagram, a sponsored podcast arc, and a creator referral program.'),
    bullet('Owner SaaS moves from opt-in to the default for owners with 3+ listings.'),

    h2('Quarter 4 (Months 28\u201330) \u2014 API + integrations'),
    bullet('Launch a public API that lets property-management software (Hostfully, Guesty) sync listings into Via.'),
    bullet('This is the moat-hardening play of Phase 3. Once Via is integrated into the owner\u2019s existing stack, switching costs become structural.'),

    h2('Quarters 5\u20136 (Months 31\u201336) \u2014 Series B prep'),
    bullet('Target metrics before the B: $25M ARR run rate, 120%+ NRR on creators, 60%+ on owners, 3 positive unit-economics geographies.'),
    bullet('Build the international expansion thesis: which country first? Which after?'),
    bullet('Hire a CFO or interim Finance lead to build the Series B model.'),

    pageBreak(),
  ];
}

// ---------- PART 5: YEARS 3-7 ----------
function part5() {
  return [
    p('Part 5 \u2014 Years 3\u20137: Phases 4\u20136', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('From this point on the playbook is directional, not tactical. Each phase deserves its own fresh plan, written in the quarter before it begins, using the same structure you see in Parts 1\u20134.'),

    h2('Year 3\u20135 \u2014 Phase 4: International (Series B, $40M)'),
    bullet('Launch EU first (Paris \u2192 Lisbon \u2192 Barcelona). Creator density and stay density both favor Europe before LatAm.'),
    bullet('LatAm second (Mexico City \u2192 Buenos Aires). Leverage diaspora creators between LA and CDMX.'),
    bullet('Multi-currency payouts through Stripe Connect + Wise.'),
    bullet('Hire Head of International based in Europe, not in the US.'),
    bullet('Tuck-in acquisition target: a travel-creator talent agency or a creator analytics tool. Makes sense at this stage, not earlier.'),
    bullet('Exit criteria: 100K creators, 20K stays, $250M GMV, $25M ARR.'),

    h2('Year 5\u20137 \u2014 Phase 5: Category leader (Series C, $100M)'),
    bullet('First adjacent vertical: restaurants. Same two-sided structure (creator endorsements \u2192 reservations) with a completely different supply graph.'),
    bullet('Second adjacent vertical: experiences (tours, classes, wellness retreats). Via-branded, creator-surfaced.'),
    bullet('Launch Via Business: white-label creator-booking infrastructure sold to brands, tourism boards, and destination management companies.'),
    bullet('Start IPO readiness work in Year 6: SOX controls, audit-ready financials, board governance maturity.'),
    bullet('Exit criteria: $1B GMV run rate, $100M+ ARR, 3 verticals live, positive contribution margin.'),

    h2('Year 7+ \u2014 Phase 6: Outcome'),
    bullet('IPO path: $1B+ ARR run rate, >80% gross margin, 4 consecutive quarters of positive contribution margin.'),
    bullet('OR strategic outcome: Airbnb, Expedia, Booking Holdings, Meta, or TikTok Shop acquires Via as the creator-booking rail for their stack.'),
    bullet('OR private acquisition by a PE firm at a mature multiple (~8\u201312x revenue).'),
    bullet('Target enterprise value: $5\u201310B.'),
    bullet('The founder\u2019s job at this stage is to be ready for all three outcomes and choose between them based on market conditions, not ego.'),

    pageBreak(),
  ];
}

// ---------- PART 6: OPERATING RHYTHM ----------
function part6() {
  return [
    p('Part 6 \u2014 Operating Rhythm', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Install these four loops in Month 1 and do not break them. A company is the sum of its operating rhythms.'),

    h2('Weekly'),
    bullet('Monday 9am \u2014 Team standup + KPI review (30 min). Look at the same 7 KPIs every week (see Part 10).'),
    bullet('Wednesday \u2014 Customer calls. Minimum 3 creators, 3 owners, 3 travelers (once traveler side is live). Schedule them; do not make them optional.'),
    bullet('Friday 3pm \u2014 Ship review + retrospective + next-week plan (45 min). What shipped, what didn\u2019t, why, and what we\u2019re doing about it.'),

    h2('Monthly'),
    bullet('First Monday \u2014 Investor update email. Sections: wins, losses, KPIs, asks. Never skip, even when things are bad. Especially when things are bad.'),
    bullet('Third Monday \u2014 KPI deep dive. Dig into one metric that\u2019s moving in the wrong direction.'),
    bullet('Last Friday \u2014 Retention cohort analysis. Look at creator and owner retention curves by cohort.'),

    h2('Quarterly'),
    bullet('Half-day strategy offsite. No slides; just a shared Google Doc and a whiteboard. Focus on: are we still on track for this phase\u2019s exit criteria?'),
    bullet('Hiring plan review. One question: what hire would 10x the team if we made it this quarter?'),
    bullet('Cash runway review. Three scenarios: base, upside, downside. If downside runway is under 9 months, start the next round.'),
    bullet('Phase exit-criteria gate. Are we hitting them? If not, what changes this quarter?'),

    h2('Annually'),
    bullet('Company all-hands retreat. In-person if the team is under 50. Two days, off site, one day strategy, one day relationships.'),
    bullet('Board + investor day. Formal update, live Q&A, transparent discussion of risks.'),
    bullet('Annual planning \u2014 November, one month before the calendar year. Build the next year\u2019s plan phase-by-phase using this playbook\u2019s structure.'),

    pageBreak(),
  ];
}

// ---------- PART 7: EIGHT DECISIONS ----------
function part7() {
  const cols = [600, 2800, 6000];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
      align: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
    })),
  });
  const table = new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['#', 'Decision', 'Why it is load-bearing'], true),
      mk(['1', 'Pilot city choice (Week 1)',                 'Density compounds. The wrong city makes Phase 1 impossible.']),
      mk(['2', 'First engineer hire (Month 2)',              'Your architect for 18 months. Wrong choice delays Seed by two quarters.']),
      mk(['3', 'First creator-ops lead (Month 2)',           'Defines your creator culture forever. Cannot be rehired into later.']),
      mk(['4', 'When to flip on the marketplace (Month 9\u201310)', 'Too early: chicken-and-egg dies. Too late: a competitor eats you.']),
      mk(['5', 'Second city timing (Month 11\u201312)',      'If the first city is not dense, the second will not be either.']),
      mk(['6', 'Self-service transition (Month 20\u201324)', 'You must automate vetting or you cannot scale past Series A.']),
      mk(['7', 'International expansion timing (Year 3)',    'Europe first vs. LatAm first shapes the entire org.']),
      mk(['8', 'Vertical expansion timing (Year 5)',         'Restaurants first vs. experiences first shapes the category.']),
    ],
  });

  return [
    p('Part 7 \u2014 The Eight Decisions That Matter Most', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Most decisions in a startup are reversible. These eight are not. Write each one down before you make it, review it with three people who have built something similar, and then commit.'),
    table,
    p('A quick framework for each:', { heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 80 } }),
    bullet('Write the decision as a single sentence.'),
    bullet('List the three things that would make you change it.'),
    bullet('Get three people with domain experience to pressure-test it.'),
    bullet('Set a review date 90 days from the decision.'),
    bullet('If it is wrong, change it before the 90-day review. Do not wait.'),
    pageBreak(),
  ];
}

// ---------- PART 8: PILOT CITY DECISION FRAMEWORK ----------
function part8() {
  const cols = [2100, 1800, 1800, 1800, 1860];
  const mk = (cells, header = false) => new TableRow({
    children: cells.map((t, i) => cell(t, {
      w: cols[i],
      bold: header || i === 0,
      color: header ? COL.cream : undefined,
      shade: header ? COL.ink : undefined,
      align: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
    })),
  });
  const table = new Table({
    width: { size: TABLE_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      mk(['Criterion (score /10)', 'Los Angeles', 'Lisbon', 'Austin', 'Mexico City'], true),
      mk(['Creator density',        '10', '7',  '8',  '6']),
      mk(['Boutique stay density',  '7',  '10', '5',  '9']),
      mk(['Your existing network',  '9',  '6',  '6',  '5']),
      mk(['Unit economics (ADR)',   '8',  '8',  '7',  '9']),
      mk(['Operating cost',         '5',  '8',  '7',  '9']),
      mk(['Language/regulatory',    '10', '9',  '10', '7']),
      mk(['Total (max 60)',         '49', '48', '43', '45']),
    ],
  });

  return [
    p('Part 8 \u2014 Pilot City Decision Framework', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('The single highest-leverage decision in the first 30 days. Scored against six criteria, each out of 10. Fill in your real numbers; the grid below is illustrative.'),
    table,
    p('How to interpret', { heading: HeadingLevel.HEADING_2, spacing: { before: 360, after: 120 } }),
    bullet('LA wins on creator density and network strength; loses on operating cost.'),
    bullet('Lisbon wins on stay density and regulatory simplicity; loses on your existing network.'),
    bullet('CDMX wins on unit economics and stay density; loses on your network.'),
    bullet('Default recommendation if the gap is within 5 points: go with where your network is strongest. Networks beat markets in Phase 1.'),
    p('Deeper diligence before you commit:', { heading: HeadingLevel.HEADING_2 }),
    bullet('Count the mid-tier travel creators (10K\u2013500K followers) living in the metro. Use Modash, HypeAuditor, or manual Instagram search.'),
    bullet('Count the boutique independent stays (non-chain, under 50 rooms). AirDNA and Airbnb search give a floor.'),
    bullet('Map your warm-intro density: how many creators and owners can you reach with zero cold outreach?'),
    bullet('Check the nightly ADR distribution. Target: 60\u201370% of stays priced $150\u2013$400/night. That is the sweet spot for mid-tier creators.'),
    pageBreak(),
  ];
}

// ---------- PART 9: 100-DAY CHECKLIST ----------
function part9() {
  return [
    p('Part 9 \u2014 First 100 Days Checklist', { heading: HeadingLevel.HEADING_1 }),
    hr(),
    p('Print this. Tape it above your desk. Cross items off. The checklist below compresses the first 100 days into a single page of committable actions.'),

    h2('Days 1\u201330 \u2014 Prep'),
    numbered('Pilot city chosen and documented.', 'n1'),
    numbered('Deck placeholders filled.', 'n1'),
    numbered('Three pitch lengths recorded and rehearsed.', 'n1'),
    numbered('Target investor list of 50\u201375 names built.', 'n1'),
    numbered('Fundraising CRM set up.', 'n1'),
    numbered('Delaware C-corp incorporated.', 'n1'),
    numbered('EIN obtained, business bank account opened.', 'n1'),
    numbered('YC SAFE template reviewed by a startup lawyer.', 'n1'),
    numbered('Data room live and password-protected.', 'n1'),
    numbered('First 10 warm-intro requests sent.', 'n1'),

    h2('Days 31\u201360 \u2014 Close the round, lock the team'),
    numbered('$300K of soft-committed angel money closed.', 'n2'),
    numbered('At least one fund meeting per week on the calendar.', 'n2'),
    numbered('First investor update email sent.', 'n2'),
    numbered('First engineer offer made and accepted.', 'n2'),
    numbered('First creator-ops lead offer made and accepted.', 'n2'),
    numbered('10 stay owners on the waitlist.', 'n2'),
    numbered('20 creators on the waitlist.', 'n2'),
    numbered('Prototype stable enough to demo in investor meetings.', 'n2'),

    h2('Days 61\u2013100 \u2014 Go live'),
    numbered('$1M pre-seed closed.', 'n3'),
    numbered('V1 CRM in production.', 'n3'),
    numbered('5 creators + 3 owners running real trades.', 'n3'),
    numbered('First booking processed through Stripe Connect.', 'n3'),
    numbered('First deliverable approved by an owner.', 'n3'),
    numbered('First creator earns commission from a booking.', 'n3'),
    numbered('Weekly operating rhythm installed (Mon / Wed / Fri).', 'n3'),
    numbered('Monthly investor update cadence established.', 'n3'),
    numbered('Phase 1 dashboard live with the 7 Phase 1 KPIs.', 'n3'),
    numbered('Clear view of Phase 2 seed plan started.', 'n3'),

    new Paragraph({
      children: [new TextRun({ text: 'Travel by way of trust.', size: 32, italics: true, font: 'Georgia', color: COL.orangeD })],
      spacing: { before: 600, after: 240 },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: 'You have the playbook. Now ship.', size: 22, color: COL.ink2, italics: true })],
      alignment: AlignmentType.CENTER,
    }),
  ];
}

// ---------- document ----------
const numRefs = ['bullets', 'n1', 'n2', 'n3'];

const doc = new Document({
  creator: 'Cierra Bellamy',
  title: 'Via \u2014 Execution Playbook',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } },
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
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, font: 'Calibri', color: COL.orangeD },
        paragraph: { spacing: { before: 180, after: 60 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ...['n1', 'n2', 'n3'].map(ref => ({
        reference: ref,
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      })),
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: 'Via  \u00b7  Execution Playbook', size: 18, color: COL.muted, italics: true }),
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
      ...howToUse(),
      ...part1(),
      ...part2(),
      ...part3(),
      ...part4(),
      ...part5(),
      ...part6(),
      ...part7(),
      ...part8(),
      ...part9(),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  const out = '/sessions/adoring-modest-cray/mnt/outputs/via-execution-playbook.docx';
  fs.writeFileSync(out, buf);
  console.log('Wrote', out);
}).catch(err => { console.error(err); process.exit(1); });
