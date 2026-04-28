# VIA — Project Context for Claude

You are picking up an in-flight pre-seed startup project. Read this whole file before making any changes.

## What VIA is

**Tagline:** Travel by way of trust
**Subline:** Stays chosen by creators you already follow

VIA is a three-sided creator-economy travel marketplace.

1. **Creators** apply for content trades (free/discounted stays in exchange for content + bookings driven).
2. **Stay owners** (boutique hotels, vacation rentals) post trades, review applicants, track deliverables, and pay commission on bookings creators drive.
3. **Travelers** discover stays curated by the creators they already follow, book through VIA, and creators earn commission on those bookings.

The wedge is the **content-trade CRM** for stay owners — the messy back-and-forth of vetting creators, agreeing on deliverables, and tracking what actually got posted. Once that habit is in place, VIA opens the marketplace where travelers book stays through creator profiles, and the owner pays a commission on those bookings. Three-sided flywheel.

Founder: Cierra Bellamy (cierra@charmedcollectiveagency.com).

## What's in this folder

```
via-project/
├── CLAUDE.md                ← this file (read first)
├── README.md                ← human-friendly intro
├── app/
│   └── index.html           ← the prototype (single-file, no build step)
├── deck/
│   ├── build-deck.js        ← regenerates the pitch deck (.pptx)
│   ├── build-assets.js      ← regenerates phone-mockup PNGs in assets/
│   ├── package.json
│   └── assets/              ← rendered hero + phone mockup images
├── plan/
│   ├── build-plan.js        ← regenerates the business plan (.docx)
│   ├── build-playbook.js    ← regenerates the execution playbook (.docx)
│   └── package.json
└── outputs/                 ← latest rendered artifacts (don't edit by hand)
    ├── via-creator-app.html       (= app/index.html)
    ├── via-pitch-deck.pptx
    ├── via-business-plan.docx
    ├── via-execution-playbook.docx
    └── via-design-tokens.md
```

Everything in `outputs/` is generated. Edit the source in `app/`, `deck/`, or `plan/`, then re-run.

## How to run / regenerate everything

```bash
# Open the prototype (no build needed — open in any browser)
open app/index.html

# Regenerate the pitch deck (.pptx)
cd deck && npm install && node build-deck.js
# Output: ../outputs/via-pitch-deck.pptx

# Regenerate phone-mockup assets (only needed if you change the prototype's UI substantially)
cd deck && node build-assets.js
# Output: deck/assets/phone-*.png

# Regenerate the business plan
cd plan && npm install && node build-plan.js
# Output: ../outputs/via-business-plan.docx

# Regenerate the execution playbook
cd plan && node build-playbook.js
# Output: ../outputs/via-execution-playbook.docx
```

After regenerating a doc, paths inside the build scripts write to `/sessions/...` — these may need adjusting to point at `../outputs/` on the partner's machine. Search for `/sessions/adoring-modest-cray/mnt/outputs/` in the build scripts and replace with the partner's local outputs path. (If running in Cowork/Claude Code with the same workspace mount, no change needed.)

## The prototype (`app/index.html`)

Single HTML file, ~233KB, no build step, no framework. Vanilla JS + custom CSS using CSS variables. Open in any browser — desktop or mobile. There's a floating "demo dock" in the corner that lets you switch between the three personas.

### Architecture

- One `<section class="screen" data-screen="X">` per screen.
- Navigation is `showScreen('screen-name')` defined near the bottom of the file. Hash-based routing.
- Three personas are routed via `?role=creator|owner|traveler` and the demo dock.
- Design tokens are CSS variables in `:root` at the top of `<style>` (lines ~10-90). Mirror of `outputs/via-design-tokens.md`.

### All 24 screens (search for `data-screen="..."` in the file)

**Creator flow:** `splash`, `onboard-role`, `onboard-niche`, `onboard-socials`, `home`, `detail`, `apply`, `post` (apply-success), `inbox`, `messaging`, `paywall`, `showcase`, `creator-commission`

**Stay owner flow:** `owner-onboard-business`, `owner-onboard-creators`, `owner-dashboard`, `owner-inbox`, `owner-review`, `owner-tracker`, `owner-listing`

**Traveler flow:** `traveler-discover`, `traveler-detail`, `traveler-book`, `traveler-confirm`

### Common edits the partner will make

| Goal | Where to edit |
|---|---|
| Change copy on a screen | Search for `data-screen="X"` then edit the markup inside that section |
| Change a brand color | Edit the CSS variable in `:root` (line 12 onward). Don't add new colors — palette is locked. |
| Add a new screen | Copy an existing `<section class="screen">` block, set a new `data-screen="..."`, and link to it via `onclick="showScreen('your-name')"` |
| Change navigation | The bottom tab bar markup is repeated in screens that have `class="with-tabs"`. Update each one when adding tabs. |
| Replace placeholder images | Inline SVG sunset gradients are used as image fallbacks — search for `linear-gradient` in the markup. |

### Screens that use the bottom tab bar

`home`, `inbox`, `showcase`, `owner-dashboard`, `owner-inbox`, `owner-tracker`, `traveler-discover` (look for `class="with-tabs"`).

## Design tokens (LOCKED — do not invent new colors)

Pastel sunset palette. Full source of truth in `outputs/via-design-tokens.md`. Quick reference:

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#FAF6EC` | Page background |
| `--yellow` | `#FAEBBE` | Avatars, soft fills |
| `--yellow-bright` | `#F0DD8C` | **CTA buttons** (not orange) |
| `--orange` | `#E8A574` | Editorial accent, dots, chips |
| `--orange-deep` | `#D88A54` | Depth |
| `--tan` | `#C9A77D` | Gradient anchor (dark end) |
| `--ink` | `#15110D` | Primary type |
| `--muted` | `#958B7E` | Meta, timestamps |

**Signature gradient (used everywhere — avatars, hero cards):**
`linear-gradient(135deg, var(--yellow) 0%, var(--orange) 50%, var(--tan) 100%)`

**Typography:** Fraunces (serif headlines, weights 500–600) + Inter (UI/body, 400–700). Both via Google Fonts.

**Banned:** coral (too Airbnb), cool blues, sage green. Don't add them.

## The deck (`deck/build-deck.js`)

11-slide pre-seed pitch deck built with `pptxgenjs`. Slide map (search `// SLIDE N`):

1. Cover
2. Problem
3. Why now
4. Solution one-liner (two-pane)
5. Wedge — Content-trade CRM
6. Flywheel (3-sided marketplace diagram)
7. Marketplace (creators as shelf)
8. Monetization
9. Market (TAM / SAM / SOM)
10. Founder–problem fit (placeholder — needs Cierra's photo + bio)
11. Ask + closing

Slides 5, 7, 8 use phone mockups from `deck/assets/`. The flywheel on slide 6 is drawn with shapes (no asset). Editing tips: keep the dark `ink` background only on the cover and the closing ask; everything else is light cream.

## The business plan (`plan/build-plan.js`)

Long-form `.docx` built with the `docx` library. Sections:

`coverPage → execSummary → vision → market → problem → solution → businessModel → competitive → gtm → flywheel → roadmap → financials → team → funding → risks → kpis → founderFit → cta`

To edit, find the function (e.g. `function gtm()`) and modify the paragraphs/tables inside. Helpers at the top (`p`, `rp`, `bullet`, `h2`, `h3`, `cell`) handle styling — use these instead of constructing `Paragraph` directly.

## The execution playbook (`plan/build-playbook.js`)

Tactical companion to the business plan. Day-by-day, week-by-week, month-by-month. Sections:

1. Next 30 Days
2. Months 1-6
3. Months 7-18
4. Months 19-36
5. Years 3-7
6. Operating Rhythm (weekly/monthly cadence)
7. Eight Decisions (founder choices ahead)
8. Pilot City Decision Framework
9. 100-Day Checklist

Same `docx`-library approach as the business plan, same helper functions.

## Tech stack & conventions

- **Prototype:** vanilla HTML/CSS/JS, single file, no framework. Mobile-first (390px viewport).
- **Deck:** `pptxgenjs` (Node).
- **Docs:** `docx` library (Node).
- **No backend yet** — the prototype is fully client-side, no API calls.
- **Versioning:** there's no Git repo set up yet. Initialize one (`git init`) before making non-trivial changes.

## What's next on the roadmap (from the playbook)

**This week (Cierra is owning):** finalizing the bug/polish list on the prototype, recording a 3-min Loom walkthrough, and choosing a developer hiring lane (freelancer vs agency vs technical cofounder).

**Likely partner help needed:**
1. Stand up the prototype as a real web link (Vercel deploy from `app/index.html` — see "Deploy" below).
2. Initialize a Git repo at the project root.
3. Help Cierra spec the MVP backend (suggested stack: React Native + Expo + Supabase + Stripe Connect + Mux for video deliverables).
4. Walk through the prototype together and propose a "v1 cut list" — which screens to ship in MVP vs. defer.

## Deploy the prototype to Vercel (one command)

```bash
cd app
npx vercel
```

Vercel will treat `index.html` as a static site. Follow the prompts (login → confirm settings). You'll get a live URL like `https://via-app-xyz.vercel.app`.

For a custom domain or team access, see Vercel project settings.

## Working with this codebase in Claude Code

- **Always read this file first** when starting a new Claude Code session in this folder.
- The prototype's design system is locked — Cierra has rejected coral, blues, and sage greens after multiple iterations. Don't reintroduce them.
- When adding screens, follow the existing `<section class="screen" data-screen="...">` pattern. Don't switch to React, Vue, or any framework without an explicit conversation with Cierra first.
- The deck and docs are deterministic — re-running the build scripts produces byte-identical output (modulo timestamps). Treat the `.js` build scripts as the source of truth, not the rendered files.
- Ask before regenerating phone-mockup assets — `build-assets.js` uses Puppeteer/Playwright-style screenshots and can change subtly between runs.

## Quick sanity check (run this first to make sure the project works on your machine)

```bash
# 1. Open the prototype
open app/index.html

# 2. Regenerate the deck (~30 sec)
cd deck && npm install && node build-deck.js && cd ..

# 3. Regenerate the playbook (~10 sec)
cd plan && npm install && node build-playbook.js && cd ..

# 4. Confirm three fresh files in outputs/
ls -lt outputs/
```

If all three regenerate cleanly, you're set up. If `npm install` fails, make sure you have Node 18+ (`node --version`).

---

Questions Cierra has flagged she'll want help thinking through:
- Should the MVP launch with all three personas live, or just creator + owner first?
- Pilot cities: Austin, Nashville, Charleston, Scottsdale, or Palm Springs (top 2)?
- What's the right Stripe Connect setup — direct vs custom accounts — for paying creators commissions?

Talk through these *with Cierra* before deciding. Don't lock anything in unilaterally.
