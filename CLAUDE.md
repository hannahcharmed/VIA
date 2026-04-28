# VIA — Project Handoff for Claude Code

**Founders:** Hannah + Cierra Bellamy (cierra@charmedcollectiveagency.com)
**Branch:** `claude/add-frontend-design-xa65X`
**Stack:** Vanilla HTML/CSS/JS, no build step, no framework. Open any `.html` in a browser.

---

## What VIA is

Three-sided creator-economy travel marketplace.

1. **Creators** apply for content trades — free/discounted stays in exchange for content + bookings driven.
2. **Stay owners** (boutique hotels, vacation rentals) post trades, review applicants, and track deliverables.
3. **Travelers** discover stays curated by creators they follow, book through VIA, and creators earn a 10% commission.

The wedge is the **content-trade CRM for stay owners** — the messy back-and-forth of vetting creators, agreeing on deliverables, and tracking what actually got posted. Once that habit is in place, VIA opens the marketplace.

---

## File Map

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Marketing homepage — hero, explore strip, creator showcase, how-it-works, testimonials | ✅ Complete |
| `explore.html` | Stay + creator discovery with search, filter chips, sort, map placeholder | ✅ Complete |
| `stay.html` | Stay detail — gallery, info, booking sidebar, trade CTA, creator quote | ✅ Complete |
| `booking.html` | Traveler booking flow — guest info, payment, confirmation | ✅ Complete |
| `creator.html` | Creator public showcase — posts grid, stats, stay history, deal link | ✅ Complete |
| `auth.html` | Sign in / sign up — email + social buttons, role-aware redirect | ✅ Complete |
| `onboard.html` | Multi-step onboarding — role select → creator niche/socials or owner property/creators | ✅ Complete |
| `dashboard.html` | **Creator** dashboard — earnings, bookings, stays, posts, wishlist, profile, active trade card | ✅ Complete |
| `owner.html` | **Owner** portal — overview, bookings, applications CRM, new trade listing, properties, creators, revenue, settings | ✅ Complete |
| `apply.html` | Content trade application form — dates, pitch, deliverables, success overlay | ✅ Complete |
| `messages.html` | Creator ↔ owner chat — context bar, bubbles, quick replies, simulated reply | ✅ Complete |
| `traveler.html` | **Traveler** dashboard — upcoming trips, wishlist, bookings, account | ✅ Complete |
| `css/via.css` | Shared design system — all tokens, components, utilities | ✅ Complete |
| `js/app.js` | Shared logic — nav, toast, modal, gallery, calendar, wishlist, auth guard, card renderers | ✅ Complete |
| `js/data.js` | Mock data — `VIA_DATA` (stays, creators, posts, reviews), `VIA_STATE` (user session, wishlist) | ✅ Complete |

---

## Design System (LOCKED — do not invent new colors)

Defined in `css/via.css` `:root`. Mirror of `via-project/outputs/via-design-tokens.md`.

```css
--cream: #FAF6EC        /* page background */
--yellow-bright: #F0DD8C /* CTA buttons */
--orange: #E8A574       /* accent, dots, chips hover */
--orange-deep: #D88A54  /* depth */
--ink: #15110D          /* primary type */
--ink-2: #524840        /* secondary type */
--muted: #958B7E        /* meta, timestamps */
--line: #EAE2CE         /* borders */
--success: #3D7A5C
--error: #A83D3D

--serif: "Fraunces", Georgia, serif    /* headings, numbers */
--sans: "Inter", -apple-system, sans-serif  /* UI, body */

--radius-sm: 12px  --radius-md: 18px  --radius-lg: 26px  --radius-xl: 34px
--shadow-sm  --shadow-md  --shadow-lg
```

**Backward-compat aliases** (safe to use throughout): `--warm-white`, `--accent`, `--accent-light`, `--border`.

**Signature gradient** (avatars, hero cards, decorative elements):
`linear-gradient(135deg, var(--yellow) 0%, var(--orange) 50%, var(--tan) 100%)`

**Banned:** coral (too Airbnb), cool blues, sage green. The co-founder has rejected these after multiple iterations.

---

## Shared Components

### CSS (`css/via.css`)
- `.btn-primary` — yellow-bright CTA, ink text, radius-sm
- `.btn-accent` — orange fill, ink text
- `.btn-outline` — bordered, ink text
- `.btn-ghost` — text-only with arrow
- `.chip` / `.chip.selected` — pill toggle (deliverables, niches, filters)
- `.field` / `.field-help` / `.field-row` — form field wrapper
- `.tab-btn` — shared tab button
- `.tabs` — bordered box tab container
- `.tab-bar` — pill-style tab container (used in panel headers)
- `.dash-stat-card` — white card, border, shadow-sm
- `.booking-status` — pill badge (confirmed/pending/completed)
- `.stay-card` / `.creator-card` — discovery grid cards
- `.toast` — bottom notification bar
- `.modal` / `.modal-overlay` — bottom-sheet modal

### JS (`js/app.js`)
- `initNav()` — hamburger + drawer + avatar injection
- `requireAuth(redirectUrl?)` — guards pages to logged-in users
- `showToast(msg, duration?)` — notification toast
- `openModal(id)` / `closeModal(id)` — modal lifecycle
- `renderStayCard(stay, creator)` — returns HTML string for a stay card
- `renderCreatorCard(creator)` — returns HTML string for a creator card
- `createCalendar(container, opts)` — date-range picker
- `toggleChip(chip)` — chip selected state toggle
- `getParam(key)` — URL query param reader
- `initGallery(galleryEl)` — touch-swipe gallery with dots
- `initWishlistButtons()` — heart toggle with VIA_STATE sync
- `VIA_STATE.user` — current logged-in user (null if guest)
- `VIA_STATE.isWishlisted(id)` / `VIA_STATE.toggleWishlist(id)`

### Data (`js/data.js`)
- `VIA_DATA.stays` — 10 stays (id, name, location, price, images, amenities, tags, reviews…)
- `VIA_DATA.creators` — 4 creators (camille, marcos, yuna, sofia)
- `VIA_DATA.posts` — 12 posts (creatorId, stayId, image, stats)
- `VIA_DATA.reviews` — reviews keyed by stayId
- `getCreator(id)` — helper
- `getStaysByCreator(id)` — helper

---

## Auth & Role Model

`requireAuth()` redirects to `auth.html` if no user session. After login, `VIA_STATE.user.role` is `'creator' | 'owner' | 'traveler'`.

Pages that check role:
- `messages.html` — swaps avatar/name based on role
- `explore.html` — shows "+ Post this stay" button for creators
- `dashboard.html` — creator-specific
- `owner.html` — owner-specific (guards itself)
- `traveler.html` — traveler-specific

Auto-login flow: `auth.html?auto=creator&next=dashboard.html` sets role and redirects.

---

## Owner Portal — Applications CRM Detail

`owner.html` has these sidebar panels (click or use `switchPanel(name, btn)`):

| Panel ID | Content |
|----------|---------|
| `overview` | KPI stats, revenue chart, recent bookings, top creators |
| `bookings` | Full booking list with All/Confirmed/Completed tabs |
| `applications` | Creator applications inbox — New(7)/Approved(3)/Declined(2) tabs |
| `properties` | Property list + "Add another" placeholder |
| `creators` | Performance table with expandable post strip |
| `new-trade` | 4-step listing form (property → terms → expectations → availability) |
| `revenue` | Payout history + stats |
| `settings` | Profile form |

The Applications panel (`renderApplications(filter)`) reads the `APPLICATIONS` array (12 entries, statuses: `new/approved/declined`). `openReview(id)` hides the list and shows the full review sub-panel. `approveCreator()` / `declineCreator()` update the in-memory status and re-render.

---

## Creator Dashboard — Panel Map

`dashboard.html` panels: `overview`, `bookings`, `stays`, `earnings`, `profile`, `wishlist`, `posts`.

The `earnings` panel has a commission notification card at the top (hardcoded to Sarah M. / €119 — should eventually be driven by the most recent booking).

The `overview` panel has an "Active trade" card linking to `messages.html`. This is hardcoded to Rua Dos Anjos, Lisbon — should be dynamic.

---

## Known Remaining Issues / Stubs

1. **Explore search bar** — renders fine, but `input` event listener exists without actual filter logic. Needs to filter `VIA_DATA.stays` by name/location/niche in real time.

2. **Image upload** in `dashboard.html` new post modal — file input exists, preview exists, but `submitNewPost()` just renders a fake card. Needs real upload or a mock Blob URL preview.

3. **Deliverable tracker** — mentioned in `messages.html` context bar ("tracked in your dashboard") but the creator dashboard has no deliverable checklist. This is the core owner CRM value prop and is completely missing from the creator side.

4. **Notification center** — `.notif-dot` appears in mobile nav but there's no notification dropdown or page. Tapping the dot does nothing.

5. **Deal link copy** in `dashboard.html` — `copyDealLink()` calls `navigator.clipboard.writeText()` but on some browsers this requires HTTPS. Falls back to `showToast` with the link text.

6. **`apply.html` pitch** — validation is 300 chars; help text says "300 characters minimum". Both correct now, but the textarea has no live character count.

7. **`onboard.html` socials step** — handle inputs use `@` prefix UI but the value isn't validated as a real handle format.

8. **Messages `sendMsg()` reply** — simulated reply always says the same text. Could be a simple rotation from an array of responses.

9. **Old `font-weight: 300` in page-level CSS** — `dashboard.html` `.dash-greeting`, `.payout-amount` still declare `font-weight: 300` in the page `<style>` block. The inline replacement script updated inline styles but not CSS-in-style-tag declarations. The shared CSS already has `font-weight: 400` as baseline, so visually this is fine — but worth a cleanup pass.

---

## Suggested Next Features (Prioritized)

### 1. Deliverable Tracker (HIGH — core product)
Add a `panel-trades` to `dashboard.html` for creators, showing:
- Active trade card: stay name, dates, checklist of deliverables with status chips (Pending / Submitted / Approved)
- Each deliverable row: a "Submit link" CTA that opens a modal to paste an IG/TikTok URL
- Completion progress bar

On the owner side, `owner.html` already has the `owner-tracker` screen sketched in the prototype (`via-project/app/index.html`, search `data-screen="owner-tracker"`). Port it as `panel-tracker`.

### 2. Live Search on Explore
`explore.html` has a search `<input id="search-input">` and a `renderGrid()` function. Wire the `input` event to filter `VIA_DATA.stays` by `name`, `location`, `category`, and `tags`.

```js
document.getElementById('search-input').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = VIA_DATA.stays.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.location.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  );
  renderGrid(filtered);
});
```

### 3. Notification Center
Add a bell icon to the nav (right of avatar). On click, show a `<div class="notif-dropdown">` with 3–4 seeded notifications (new booking, trade approved, deliverable due). Badge count on the bell.

### 4. Live Character Count on Pitch Textarea
In `apply.html`, add a counter below the pitch textarea:
```js
const pitch = document.getElementById('pitch');
const counter = document.createElement('div');
pitch.after(counter);
pitch.addEventListener('input', () => {
  const n = pitch.value.length;
  counter.textContent = `${n} / 300`;
  counter.style.color = n >= 300 ? 'var(--success)' : 'var(--muted)';
});
```

### 5. Role-Aware Nav
When logged in, replace "Sign in" with an avatar that links to the right dashboard. The nav already has `.nav-avatar` and `.nav-signin` classes — `initNav()` in `app.js` already hides `.nav-signin` for logged-in users but doesn't add a dashboard link. Add:
```js
document.querySelectorAll('.nav-dashboard').forEach(el => {
  el.href = user.role === 'owner' ? 'owner.html' : user.role === 'traveler' ? 'traveler.html' : 'dashboard.html';
  el.style.display = '';
});
```
Then add `<a href="#" class="nav-dashboard" style="display:none">Dashboard</a>` to nav-links in each page.

### 6. Trade Status Timeline
In `messages.html`, replace the context bar's single line with a compact 4-step timeline: Applied → Approved → **Staying** (current) → Content posted. Use colored dots + dashes.

### 7. Onboarding → Auth → Dashboard Redirect Polish
Currently `finishCreator()` in `onboard.html` redirects to `auth.html?auto=creator&next=dashboard.html`. But if the user is *already* logged in from a previous session, they land on dashboard mid-flow without seeing the success message. Add a `?onboarded=1` param that `dashboard.html` reads to show a welcome toast on first load.

---

## How to Run

```bash
# No build step — just open in browser
open index.html

# Or serve locally (avoids CORS on clipboard API)
python3 -m http.server 8080
# → http://localhost:8080
```

Test credentials (set in `auth.html` on form submit, or manually via browser console):
```js
// Creator session
VIA_STATE.setUser({ name:'Camille Laurent', role:'creator', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80' })

// Owner session
VIA_STATE.setUser({ name:'Henri Blanc', role:'owner', property:'Hôtel Le Pigonnet' })

// Traveler session
VIA_STATE.setUser({ name:'Alex Chen', role:'traveler' })
```

---

## Git

Branch: `claude/add-frontend-design-xa65X`
Latest commit: design elevation + shared components + font purge (2 commits ahead of main)

```bash
git log --oneline -3
```

To open a PR:
```bash
gh pr create --base main --head claude/add-frontend-design-xa65X
```

---

## Co-Founder Prototype

The single-file prototype from Cierra is at `via-project/app/index.html`. It has 24 screens covering all three personas. Use it as the design reference for any new screens. The screens not yet ported to the multi-page site:

- `owner-tracker` — deliverable tracker (owner view) **→ build next**
- `paywall` — Via Premium upsell
- `traveler-detail`, `traveler-book`, `traveler-confirm` — currently in `booking.html` but could be more granular
- `post` (apply-success) — currently the success overlay in `apply.html`
