# Via — Pinned Design Tokens

Locked palette as of this session. Source of truth for all future screens.

## Brand
**Tagline:** Travel by way of trust
**Subline:** Stays chosen by creators you already follow
**Logo:** Ambigram "VIA" (no crossbar on A) — reads same rotated 180°

## Color palette — Pastel sunset

| Token | Hex | Role |
|---|---|---|
| `--yellow` | `#FAEBBE` | Primary pastel gold — avatars, soft fills |
| `--yellow-bright` | `#F0DD8C` | Pastel butter — CTA buttons, trade badges |
| `--yellow-soft` | `#FDF8DD` | Barely-there warm hint — hero card washes |
| `--orange` | `#E8A574` | Sunset peach — accent, dots, pins, chips |
| `--orange-soft` | `#F5D4BA` | Blush peach — soft highlights |
| `--orange-deep` | `#D88A54` | Deeper sunset — optional depth |
| `--tan` | `#C9A77D` | Camel — gradient anchor, dark end of sunsets |
| `--tan-soft` | `#DCC199` | Milky mid-tan — legacy (still present) |
| `--sand` | `#E4D4B7` | Warm tan neutral — map land, soft bases |
| `--sand-soft` | `#F1E7D2` | Cream neutral — card fallbacks |
| `--terra` | `#B98E6B` | Earthy accent — map pins |
| `--cream` | `#FAF6EC` | Page background — warmer than white |
| `--ink` | `#15110D` | Primary type — deep editorial |
| `--ink-2` | `#524840` | Secondary type |
| `--muted` | `#958B7E` | Meta, timestamps |
| `--line` | `#EAE2CE` | Hairlines, dividers |

## Signature gradients

**Three-stop sunset** (big avatars, cover cards):
`linear-gradient(135deg, var(--yellow) 0%, var(--orange) 50%, var(--tan) 100%)`

**Two-stop sunset** (small avatars, pills):
`linear-gradient(135deg, var(--yellow), var(--orange))`

**Soft card wash** (stay photo fallbacks, hero card base):
`linear-gradient(135deg, var(--yellow-soft), var(--sand-soft))`

## Typography
- Headlines: **Fraunces** (serif, Google Fonts) — weights 500–600, tight letter-spacing
- Body / UI: **Inter** (sans, Google Fonts) — weights 400–700

## Radii
- `--radius-sm: 12px`
- `--radius-md: 18px`
- `--radius-lg: 26px`
- `--radius-xl: 34px`

## Shadows
- `--shadow-sm: 0 2px 8px rgba(21,17,13,0.05)`
- `--shadow-md: 0 8px 24px rgba(21,17,13,0.07)`
- `--shadow-lg: 0 24px 70px rgba(21,17,13,0.18)`

## Rules going forward
- Never mix yellow + cool colors (blue, sage, teal) in the same gradient — produces muddy green.
- Orange is the only saturated accent. Sage/blue were tried and rejected.
- CTA color is `--yellow-bright`, not orange — keeps orange as editorial accent, not button.
- Tan/sand/terra are the warm earth anchors; use these when you need neutral weight without going gray.
- Coral is banned as a brand color (too Airbnb).

## Rejected along the way
- Coral `#E26A52` — too Airbnb
- Dusty blue `#8FB4C9` — too tech, fought the warm palette
- Dusty sage `#A8B09A` — read as puke next to pastel yellow
- Saturated gold `#EFC94E` + peach `#E8A76F` — too punchy for "airy, not gimmicky"
