# DESIGN.md — Alexa Lashes marketing site

Reverse-engineered from the running site (`apps/marketing`, Chromium via Playwright, 1440×900 and 390×844) and
the source. Scope: the public marketing site and the shared `packages/ui` it uses.

Legend: **[M]** measured in the browser (computed style), **[S]** read from source, **[?]** inferred or not verified.

## 1. Identity

A calm, premium lash studio in Bratislava. Warm cream paper, a single muted-gold accent, a high-contrast
serif for headlines and a clean geometric sans for everything else. No gradients, no heavy shadows, no
decorative color. Photography (faces, lashes, salon) carries the visual interest; UI stays quiet.
Restraint is a rule: a bold contact redesign was rejected as overwhelming (see project memory).

Voice in the UI: short, direct labels; WhatsApp is the primary conversion path ("Objednať sa").

## 2. Canonical sources

| What                                                                               | File                                           |
| ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| All color/radius/font tokens, base typography, focus ring, reduced motion, `.card` | `packages/ui/src/components/styles.css`        |
| Button variants/sizes                                                              | `packages/ui/src/components/shadcn/Button.tsx` |
| Input / Textarea / Dialog / Drawer / Tabs / Dropdown                               | `packages/ui/src/components/shadcn/*`          |
| Accordion, Alert, FieldError, Label, MenuToggle                                    | `packages/ui/src/components/*.tsx`             |
| Page shell (skip link, `main`)                                                     | `apps/marketing/src/routes/__root.tsx`         |
| Header / Footer / Banner / Cta / cards                                             | `apps/marketing/src/components/*`              |

Tailwind v4, **no `tailwind.config`**; tokens live in CSS (`:root`, `@theme`, `@theme inline`). Default Tailwind
breakpoints and spacing scale (1 unit = 4px) are used; no custom breakpoints were found **[S]**.

## 3. Color

Prefer the semantic Tailwind utility (`bg-primary-light`, `text-primary-strong`) over raw hex.

| Token                 | Value                                                                  | Use                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `background`          | `#fdfbf7` **[M]**                                                      | Page background (cream)                                                                                                                  |
| `foreground`          | `oklch(0.145 0 0)` (near black) **[M]**                                | Headings, primary text                                                                                                                   |
| `card`                | white `rgb(255,255,255)` **[M]**                                       | Card surface (`.card`), popovers                                                                                                         |
| `primary`             | `#c4ad72` **[M]**                                                      | Gold. Fills (buttons), borders, stars, decoration. **Never for text on light**                                                           |
| `primary-strong`      | `color-mix(primary 60%, black)` ≈ `#766844` **[M]**                    | Gold text, outlines, focus ring, prices, icons on light                                                                                  |
| `primary-ink`         | `#2b2418` **[S]**                                                      | Text on gold fills (buttons, badges)                                                                                                     |
| `primary-light`       | `#f7f3e9` **[M]**                                                      | Tinted panels (CTA band, price card header, dialog, active nav pill, ghost hover)                                                        |
| `primary-line`        | `#f0ece4` **[M]**                                                      | Hairline borders and dividers (header, card, footer, list rows)                                                                          |
| `primary-disabled`    | `#e1d6b8` **[S]**                                                      | Disabled default button                                                                                                                  |
| `tertiary`            | `#4a413a` **[S]**                                                      | Dark warm brown; banner fallback background                                                                                              |
| `secondary`           | `#f4f2ee` **[S]**                                                      | Secondary button / cookie "reject" fill                                                                                                  |
| `muted-foreground`    | `#6b6359` **[S]**                                                      | Meets ≥4.5:1 on cream and white (per source comment; not re-measured)                                                                    |
| `neutral-500/600/700` | `#6b6359 / #5a5249 / #453e36` **[S]**                                  | Warm greys overriding Tailwind's. Body copy secondary = `neutral-600` (`rgb(90,82,73)` **[M]**); `neutral-700` for denser secondary text |
| `border` / `input`    | `oklch(0.922 0 0)` **[S]**                                             | shadcn default grey; mostly overridden by `primary-line` in marketing UI                                                                 |
| `destructive` / error | `red-600` border, `red-700` text **[M/S]**                             | Field errors only                                                                                                                        |
| Alert success         | bg `#f0f6ed`, border `#cfe2c8`, text `#2d4a2b`, icon `#3f7a3c` **[S]** | `Alert variant="success"`                                                                                                                |
| Alert error           | bg `#fbf2ef`, border `#ecd0c9`, text `#6b2a20`, icon `#b0412f` **[S]** | `Alert variant="error"`                                                                                                                  |

Selection color: `primary` at 35% **[S]**. Hover fill for the default button: `primary` mixed 20% with white
≈ `#d0bd8e` **[M]**.

Notes

- `.dark` tokens exist and `dark:` appears in `Faqs.tsx`, but no theme switch is wired up in the marketing app
  **[S]**. Treat dark mode as dormant; don't design for it unless asked.
- `--chart-*` and `--sidebar-*` are unused shadcn defaults.
- Alert colors are hardcoded hex (not tokens); the only place semantic status colors exist.

## 4. Typography

| Role                                       | Family                                                      | Notes                                                                                                                                                          |
| ------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display (`h1`, `h2`, dialog/drawer titles) | **Cormorant Garamond**, Georgia, serif                      | Weights 500–700 (self-hosted woff2, latin/latin-ext/cyrillic), `size-adjust: 112%`, `letter-spacing: -0.01em`. Applied globally to `h1,h2` in base CSS **[S]** |
| UI / body                                  | **Manrope** variable (200–800, self-hosted ttf), sans-serif | Antialiased. Applied on `body`. `h3`+ stay Manrope                                                                                                             |

Measured hierarchy **[M]** (desktop / mobile):

| Element                                              | Desktop                                                                                                                        | Mobile                    | Weight    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | --------- |
| Home hero `h1`                                       | 60px / lh 63 (`lg:text-6xl`, `leading-[1.05]`)                                                                                 | 36px / lh 38              | 700       |
| Page intro `h1` (prices, contact, gallery, training) | 48px / lh 48 (`md:text-5xl`)                                                                                                   | 36px (`text-4xl`)         | 700       |
| Banner `h1` (about, training/basic)                  | 48px, white, text-shadow                                                                                                       | 30px (`text-3xl`)         | **800**   |
| Section `h2`                                         | 36px / lh 40 (`md:text-4xl`)                                                                                                   | 30px / lh 36 (`text-3xl`) | 700       |
| Card `h2` (training card)                            | 30px (`md:text-3xl`)                                                                                                           | 24px                      | 700       |
| Card/sub `h2` (price card, contact card)             | 18–24px                                                                                                                        | 18px                      | 700       |
| `h3` (program day, kicker)                           | 20px (`text-xl`) or 14px/600 (`text-sm`)                                                                                       | same                      | 700 / 600 |
| Lead paragraph                                       | 18px / lh 28.8, `neutral-600`                                                                                                  | 18px                      | 400       |
| Body `p`                                             | 16px / lh 1.6 (global `p` rule)                                                                                                | 16px                      | 400       |
| Small / meta                                         | 14px (`text-sm`), 12px source tags                                                                                             |                           | 400–600   |
| Price figure                                         | `text-5xl` (48px) extrabold, `primary-strong`, `tabular-nums`, `tracking-tight` (card hero); `text-xl`/`text-lg` bold in lists |                           | 800 / 700 |
| Buttons                                              | 16px (lg/default), 14px (sm), weight 700                                                                                       |                           | 700       |
| Nav links                                            | 16px, weight 500 (600 when active)                                                                                             | drawer 18px               | 500/600   |

Rules: `text-balance` on headings, `text-pretty` on paragraphs, `tabular-nums` on prices/times, one `h1` per page.
Body line length is capped (`max-w-[46ch]` hero, `52ch` CTA, `65ch` FAQ).

## 5. Layout, spacing, breakpoints

- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`) **[S]**. Main layout switches at
  `md` (grids, banner height) and `lg` (desktop nav).
- Page container: `mx-auto max-w-6xl px-4 py-10` (1152px, 16px gutters → **1120px content**) **[M]**. Banner pages use
  `pt-5 pb-10` plus a breadcrumb.
- Page intro: centered, `mx-auto max-w-180 text-center` (720px), `mb-12`/`mb-14`, h1 `mb-4`.
- Vertical rhythm between sections: `mb-18 md:mb-25` (72px / 100px) is the dominant pattern (13 uses); the home page
  uses `mb-16 md:mb-24`. Section heading to content: `mb-6 md:mb-8`.
- Grids: `gap-5` (20px) for cards; 4px-based gaps otherwise. Price cards `sm:grid-cols-2 lg:grid-cols-4`; contact
  `md:grid-cols-7` with `md:gap-15`; photo grids `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4/5` with `gap-4`.
- Text-led content blocks sit in narrower columns (e.g. `max-w-180`, `max-w-2xl`) inside the 1120 container.
- `main` has `min-h-[calc(100vh-300px)]`.
- Header: 72–77px tall, `border-b border-primary-line`, inner `max-w-6xl p-4`, no background fill, not sticky **[M/S]**.

## 6. Shape, borders, shadows

- Radius token `--radius: 0.625rem` (10px). Used radii **[M]**: buttons/inputs **8px** (`rounded-md`),
  cards/CTA/banner/photos/dialog **14px** (`rounded-xl` = radius+4), pills and icon buttons **full**.
- Borders are hairlines in `primary-line` (`#f0ece4`), 1px. Interactive outline buttons and inputs use 2px/1px gold
  (`primary`, `primary-strong/80`).
- **Flat by default.** Cards have no shadow **[M]**. The only shadows: cookie banner
  (`0 -8px 24px -12px rgb(43 36 24 / .18)`), training-level badge (`0 2px 10px rgb(43 36 24 / .12)`),
  Alert icon chip. Shadows use the warm `43 36 24` base, never pure black.
- Dialog/drawer overlay: `bg-black/10` + `backdrop-blur-xs` **[S/seen]**.

## 7. Components

### Button (`Button` / `buttonVariants`) **[S/M]**

Base: `rounded-md`, 2px transparent border, weight 700, `gap-2`, 150ms color transition. Use `buttonVariants()` on
`<a>`/`<Link>` for link buttons.

| Variant       | Look                                               | Hover                                       |
| ------------- | -------------------------------------------------- | ------------------------------------------- |
| `default`     | gold fill, `primary-ink` text                      | lightens 20% toward white **[M]**           |
| `outline`     | cream fill, 2px gold border, `primary-strong` text | fill → white **[M]**                        |
| `secondary`   | `#f4f2ee` fill, foreground text                    | darkens 5%                                  |
| `ghost`       | transparent, `primary-strong` text                 | `primary-light` fill                        |
| `link`        | `primary-strong`, underline on hover               | underline                                   |
| `destructive` | `destructive/10`, red-700 text                     | `/20` (admin-oriented; unused on marketing) |

Sizes: `default` h-44px, `lg` h-48px / px-6 (hero, CTA), `sm` h-36px (header "Objednať sa"), `xs` h-28px;
`icon` 44px, `icon-sm` 36px, `icon-lg` 48px, `icon-xs` 28px (all full radius). Disabled: `primary-disabled` for
default, 50% opacity for others. Pair primary + outline for dual CTAs (hero: "Objednať sa cez WhatsApp" + "Cenník").
One gold fill per viewport region.

### Navigation

- Desktop (≥`lg`): logo (SVG mark + "Alexa Lashes" 20px/600) left; centered links `rounded-full px-3 py-1.5`; locale
  switcher `sk / en / ru`; `sm` default button on the right. **Active link:** `primary-light` pill + weight 600 +
  `primary-strong` text (non-color cue per a11y rule) **[M]**. Hover: text → `primary-strong`.
- Mobile (<`lg`): `sm` book button + ghost `icon` menu toggle (`MenuToggle` crossfades menu/X, 300ms). Opens a
  right-side `Drawer` (`max-w-xs`): logo header with hairline, links `text-lg px-3 py-2.5 rounded-md`, active =
  `primary-light` fill, locale switcher pinned at the bottom behind a hairline **[seen]**. The brand name hides
  below 23rem.
- Breadcrumb on banner pages (small, `›` separator, current page bold) **[seen]**.
- Skip link in `__root.tsx`: white pill, shown on focus.
- Footer: social icon row (44px circular targets) → 3-column info grid (`md:grid-cols-3`, centered on mobile) →
  privacy link + legal line; sections separated by `border-primary-line` hairlines; text `neutral-600`, links
  underlined, hover `primary-strong`.

### Cards (`.card`) **[S/M]**

`rounded-xl border border-primary-line bg-white` (`dark:bg-tertiary`). Padding by content: `p-6 md:p-8`
(program), `px-6 py-2` (list cards), `px-5 md:px-7` (FAQ), `p-0` with internal sections (price card).
Variants in use:

- **Price card** (`LashPriceCard`): `primary-light` header with title + "new set" label + 48px gold price; below, a
  `dl` of refills divided by `primary-line`.
- **Service list** (`Services`): two-column `dl`, dotted leader (`border-primary/50 border-dotted`), price
  `text-xl` bold `primary-strong`.
- **Includes**: two-column checklist; check icon `fill-primary-strong stroke-white`.
- **Training card**: 21:9 (`lg` 2:1) image with a white pill badge top-left, `p-6` body, skill chips with
  `primary-light` check circles, footer row under a hairline (duration + button). Image zooms 1.03 on hover
  (`motion-safe` only).
- **Review card**: white card, 5 gold stars (15px), body `neutral-700`, name bold 14px + "Recenzia z Google" 12px
  `neutral-500` footer; in an Embla carousel with ghost-outline round prev/next buttons.
- **Program day**: numbered `bg-primary` square badge (40px, `rounded-md`), time column in `primary-strong` bold
  `tabular-nums`, bullet markers `text-primary`.

### Banner (`Banner`) — image hero for about / training/basic

`rounded-xl`, min-height 400px (`md` 520px), `bg-tertiary` fallback, centered white text with `text-shadow-sm`,
`h1` weight 800 + 18px description (500/600), buttons below. Overlay: `from-black/25 → transparent` gradient, or
`backdrop-brightness-50` when `isDark`. Uses `<picture>` with Netlify CDN; see CLAUDE.md "Images".

### Home hero (`HomeHero`)

Two-column grid `md:grid-cols-[1.1fr_1fr]`: text left (h1, lead, two `lg` buttons, small Google-rating link with gold
star), 4:5 photo right (`rounded-xl`, `object-[center_30%]`).

### CTA band (`Cta`) **[M]**

`rounded-xl bg-primary-light`, `px-6 py-12 md:px-10 md:py-16`, centered h2 (`text-3xl md:text-4xl`), lead at
`foreground/80`, one `lg` gold button + a "or call" line (`neutral-600`, 14px). Closes nearly every page.

### Forms (`Input`, `Textarea`, `Label`, `FieldError`) **[M]**

Stacked fields, label above (16px), input `rounded-md`, 1px `primary-strong/80` border, `bg-background`,
`px-4 py-3` (50px tall), 16px text, placeholder = foreground at 50%. Textarea 4 rows. Focus: global 2px
`primary-strong` outline with 2px offset. Invalid: `aria-invalid` → `red-600` border, `red-700` outline;
`FieldError` is 14px `red-700` text with `id="{name}-error"` referenced by `aria-describedby`. Submit is a
full-width default button. Form-level feedback uses `Alert` (success/error, 12px radius `rounded-lg`, white icon chip,
fade/slide-in 300ms).

### Overlays

- **Dialog** (training interest form): centered, `max-w-lg` (512px), `bg-primary-light`, `rounded-xl`, `p-6 md:p-8`,
  1px `foreground/10` ring, title in the display serif, ghost `icon-sm` close at top-right with `sr-only` label,
  zoom/fade 100ms **[M/seen]**. Inputs inside keep the cream `background` fill so they read against the tinted dialog.
- **Drawer**: mobile nav only (see Navigation).
- **Cookie banner** (`react-cookie-consent`): fixed bottom, white, `border-primary-line`, bottom shadow; full-bleed
  strip on mobile, floating `max-w-6xl` rounded-xl card with `md:mb-4` on desktop; "Odmietnuť" = secondary,
  "Prijať" = default button **[M/seen]**. It overlays content in full-page screenshots; it is fixed, not inline.
- **Image lightbox**: `react-photo-view` (gallery/previews) **[S]**.

### Accordion (FAQ) **[S]**

Inside a `.card`; trigger row `py-5`, 16px/600, hover → `primary-strong` without underline, chevron rotates 180° in
200ms, rows divided by `primary-line`, answer 14–16px `foreground/80`, `max-w-[65ch]`. First item open by default;
`hiddenUntilFound` is set.

### Photo grids (`PreviewGallery`, `Gallery`)

`rounded-xl` image buttons, fixed `h-40` tiles with `object-cover`, hover `scale-[1.03]` over 500ms (disabled under
`motion-reduce`), same focus ring. On mobile the odd last tile spans two columns (`h-64`).

### Links

Global: `a` outside the header is underlined (`underline-offset-2`) and turns `primary-strong` on hover **[M]**.
Button links and nav links opt out with `no-underline`. Footer/CTA text links stay underlined.

### Icons

Lucide for UI icons (16–20px, `aria-hidden`), custom `GoogleIcon` and social glyphs in `Socials`. Gold-tinted
icons use `primary-strong` on light.

## 8. Responsive behavior **[M/seen]**

- 390px: single column; hero text above the photo, full-width stacked buttons; header shows brand mark + "Objednať sa"
  - hamburger; photo grids 2-up; reviews are a horizontal swipe carousel; footer centered. No horizontal page scroll
    observed on the pages checked.
- ≥768: multi-column grids, hero side-by-side, bigger headings, banner min-height 520px, cookie card floats.
- ≥1024: inline nav replaces the drawer, price cards 4-up, galleries 4–5-up.
- Content never exceeds 1120px; backgrounds stay the flat cream at any width.

## 9. Interaction and motion

- Color transitions only (`transition-colors`, ~150ms) for buttons and links; subtle zoom on image hover; accordion
  chevron/height animation; dialog/alert fade+zoom/slide (100–300ms). No parallax, no autoplay.
- **Reduced motion:** global `@media (prefers-reduced-motion: reduce)` clamps all animation/transition to `0.01ms`
  (kept non-zero so overlay unmount events still fire) and disables smooth scroll **[M: transition duration 1e-5s]**.
  Hover zooms additionally use `motion-safe:` / `motion-reduce:`.
- States verified: button hover (default and outline), nav hover, keyboard focus, input focus, invalid form submit,
  dialog open, mobile drawer open.

## 10. Accessibility (house rules; target WCAG 2.2 AA)

- Focus: `:focus-visible` gives a **2px solid `primary-strong` outline, 2px offset** globally **[M]**. Never remove it;
  dark-background contexts (banner) have not been verified to keep sufficient contrast **[?]**.
- Gold as text on light uses `primary-strong`; never `primary` or `brightness-*` hacks.
- One `h1`; heading levels follow structure; kickers/labels are `p`/`span`.
- `__root.tsx` owns skip link → `<main id="main-content">` and `<html lang>`.
- Active nav = pill + weight, not color alone. Clickables are `button`/`a`. Icon-only buttons need a translated
  `aria-label`. Touch targets ≥24px, 44px preferred (icon/social buttons are 44px; header `sm` button is 36px).
- Error wiring via `aria-describedby="{name}-error"` while touched and invalid.
- All strings (including alt/aria) through Paraglide in `sk`/`en`/`ru`; decorative images `alt=""`.
- Contrast ratios were **not recomputed** in this pass except where source comments claim them **[?]**.

## 11. Do / Don't

Do

- Use tokens and `buttonVariants`/`.card`/`Cta`/`Banner` before writing new markup.
- Keep headlines in the serif (`h1`/`h2`), everything else in Manrope; bold headline weight (700).
- Use `primary-light` for tinted panels and `primary-line` for dividers; keep surfaces flat.
- Keep one primary gold button per section; pair with an `outline` secondary.
- Center page intros at 720px and close pages with the `Cta` band.
- Use `tabular-nums` for prices, times and counts.
- Use warm shadows (`43 36 24`) if one is truly needed.

Don't

- Don't use `primary` (#c4ad72) for text or thin outlines on cream; it fails contrast.
- Don't introduce cool greys, pure black text on gold, blue links, gradients as decoration, or drop shadows on cards.
- Don't add `bg-[url()]` banners or `rel="preload"` for banners (see CLAUDE.md).
- Don't use `div`/`img` with `onClick`; don't render kickers as headings.
- Don't invent new radii; use 8px (controls), 14px (surfaces), full (pills/icon buttons).
- Don't hand-write dark-mode styles; dark mode is not active.
- Don't add a second Tailwind entry stylesheet; all tokens live in `packages/ui/src/components/styles.css`.

## 12. Inconsistencies and one-offs (don't copy blindly)

1. **Heading weight:** banner `h1` is 800 (`font-extrabold`) while every other `h1`/`h2` is 700; home `h1` is 60px vs 48px
   elsewhere. Treat the banner/hero as intentional exceptions.
2. **Heading sizes for `h2`:** `text-3xl md:text-4xl` is the section norm; card/contact `h2` use `text-lg`–`text-2xl`
   and privacy-policy uses `text-xl`; gallery uses `text-xl md:text-2xl`. Pick by context (section vs card).
3. **Section spacing:** `mb-18 md:mb-25` (most routes) vs `mb-16 md:mb-24` (home hero). Both are 4px-scale values.
4. **Header "book" button** is `sm` (36px), below the 44px touch-target preference (still ≥24px).
5. **Hardcoded hex** appears in `Alert` (status palette), `primary-ink`, shadows and neutral overrides rather than tokens.
6. **Drawer title** uses `[font-family:inherit]` to opt out of the display serif; the dialog title keeps it.
7. **Dormant tokens:** `.dark`, `--chart-*`, `--sidebar-*`, `destructive` button variant (admin/shadcn leftovers).
8. **Link underline rule** (`a:not(header a)`) is global, so any new link inside a button-styled `<a>` needs `no-underline`
   (already in `buttonVariants`).

## 13. Not verified

- Pages not opened: `/en/*` and `/ru/*` (Cyrillic uses the same fonts; line-break and width impact unchecked), `/training/advanced/`
  if present, 404 page, error boundary, all-pages tablet (768–1023px) layout.
- Contrast ratios not measured; hover/focus states for FAQ, footer links, social icons, carousel buttons and lightbox
  not exercised in the browser (documented from source only).
- Production-only behavior (AVIF via Netlify Image CDN, font loading under real network) not checked; dev server only.
- Dark mode, print styles, and the admin app (`apps/admin`) were not inspected.
- Pixel values for `h-*`/`max-w-*` utilities derived from Tailwind v4's 4px unit; those not listed as measured are
  calculated, not read from the DOM.
