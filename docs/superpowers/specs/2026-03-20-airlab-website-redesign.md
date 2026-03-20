# AIR Lab Website Redesign — Design Spec
**Date:** 2026-03-20
**Stack:** Next.js 14 + Sanity CMS + Tailwind CSS + Vercel
**Approach:** Full redesign — new design system applied to all pages, two new pages (RCP, enhanced About/Partners), updated navigation.

---

## 1. Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `hero-bg` | `#0A1A10` | Hero sections, dark feature banners |
| `charcoal` | `#14261C` | Dark sections, nav, footer (kept) |
| `surface` | `#1C3325` | Dark cards, panels within charcoal sections |
| `teal` | `#30C7B5` | Primary accent, CTAs, labels (kept) |
| `teal-dark` | `#00AC97` | Hover states (kept) |
| `body-bg` | `#F3F6F3` | Light sections (kept) |
| `tint` | `#E8F0E9` | Light cards, hover states, subtle backgrounds |

Add `hero-bg: '#0A1A10'`, `surface: '#1C3325'`, and `tint: '#E8F0E9'` to `tailwind.config.ts`.

### Typography
- **Headings:** Red Hat Display (kept)
- **Body:** Red Hat Text (kept)
- **UI labels:** Poppins (kept)
- **ATM technical labels:** JetBrains Mono (new) — used sparingly for waypoint codes, flight levels, region identifiers, section micro-labels

Implementation steps:
1. Add `JetBrains_Mono` import in `app/layout.tsx`, load with `subsets: ['latin']`, `variable: '--font-mono'`, pass variable to `<html>` className alongside existing font variables
2. Add `mono: ['var(--font-mono)', 'monospace']` to `fontFamily` in `tailwind.config.ts`

### Blueprint Grid Pattern
- SVG pattern: fine grid (20px) + major grid (100px) with teal stroke at 0.4px / 0.9px
- Waypoint diamond markers (rotated squares) with dashed flight-path lines between them
- Use real Singapore FIR waypoints: SINVY, ROMAR, VISAT
- Opacity: 10–12% on `hero-bg`, 8% on charcoal sections
- **Used exclusively on dark/hero backgrounds** — never on light sections
- Implement as a reusable `<BlueprintGrid />` component

Reference SVG structure (copy from brainstorm mockups in `.superpowers/brainstorm/`):
- `<pattern id="sg">` — 20×20px, teal stroke 0.4px
- `<pattern id="lg">` — 100×100px wrapping `sg`, teal stroke 0.9px
- 3 waypoint diamonds: rotated `<rect>` 8×8px, teal stroke 1px, labels in `font-family="monospace"` 6px
- 2 dashed flight paths connecting the 3 waypoints: `stroke-dasharray="5,3"`

### ATM Accent Elements
- **Teal accent bar:** 2px horizontal teal bar above section headings (kept, standardised)
- **Status chips:** `ACTIVE` / `UPCOMING` / `COMPLETED` — pill with dot indicator and monospace label
- **Stat counters:** monospace label + large number + sub-label (used in impact strip)
- **Teal gradient divider:** `from-teal to-transparent` horizontal rule
- **Category tags:** monospace uppercase, teal on light tint background

### Buttons
- `btn-primary`: single class, `text-white` retained. On dark sections that need dark text, use a `btn-primary-dark` variant: `bg-teal text-hero-bg` (added to `globals.css` as a new utility class)
- `btn-outline`: border-teal, existing behaviour kept
- `rounded` (4px) already in place — no change needed

---

## 2. Navigation

**Top-level items:** Home · About · Our Work · RCP · News & Insights · Contact

Changes from current:
- Add **RCP** as a top-level nav item linking to `/rcp`
- Partners remains a section within `/about` (no separate nav item)
- Remove `Partners` link from `Nav.tsx` (currently points to `/partners`)
- Remove `Team` link from `Nav.tsx` (currently points to `/team`) — Team is subsumed into `/about`
- Nav background on scroll: `charcoal/95` with backdrop blur

**Route cleanup:**
- Delete `app/partners/page.tsx` — this standalone route is replaced by the Partners section within `/about`
- Delete `app/team/page.tsx` — Team is already rendered within `/about`; standalone route is redundant
- If either URL needs to stay alive for SEO, replace the page file with a `redirect('/about')` using Next.js `redirect()`

---

## 3. Pages

### 3.1 Home Page (`/`)

Eight sections, top to bottom:

**① Hero** (full-screen, `hero-bg`)
- `<BlueprintGrid />` SVG overlay
- AIR Lab text logo top-left (`AIR` + teal `Lab`) — real logo image can be swapped in later via `public/logo.svg`
- Label line: `"AIR Lab · Aviation Innovation Research Lab"` — Poppins, teal, letter-spaced
- H1: "Advancing the Future of Air Traffic Management"
- Subheading: focus on South East Asia
- Two CTAs: `Explore Our Work` (primary) + `About AIR Lab` (outline)
- Quick-access chips row (below a hairline border): RCP Platform · FF-ICE · OPEN ATM · Digital Twin
  - RCP Platform → `/rcp` (hardcoded)
  - FF-ICE, OPEN ATM, Digital Twin → `/our-work/[slug]` using their Sanity slugs; render chip only if the slug exists (conditional fetch at build time); fallback gracefully to hiding the chip if slug not found

**② Impact Strip** (`charcoal`)
- 4-column grid: ATM Experts (20+) · Partners (30+) · South East Asia · Since 2020
- Monospace labels above, large number, monospace sub-label below

**③ What We Do** (`body-bg`)
- Section label + H2
- 2×2 card grid, white cards, teal accent bar
- Four pillars: Innovation · Collaboration · ATM Excellence · Fast Experimentation & Prototyping
- 4th pillar uses `charcoal` card to visually distinguish it

**④ Key Initiatives** (`charcoal`)
- 2×2 card grid: FF-ICE · OPEN ATM · Digital Twin · AI Enablers
- Each card: cover image, status chip, title, short description
- "View all →" link to `/our-work`
- Cards use `surface` background

**⑤ RCP Spotlight** (`hero-bg`)
- `<BlueprintGrid />` overlay
- Left: "FEATURED INITIATIVE" label + RCP title + description focused on South East Asia
- Right: "Explore RCP →" CTA + monospace region tag `SEA · MULTI-STAKEHOLDER`

**⑥ Partners Row** (white)
- Monospace label: "PARTNERS & COLLABORATORS"
- Horizontal logo strip — Sanity-driven
- Links to Partners section of About

**⑦ News & Insights** (`body-bg`)
- 3-column news card grid
- Teal monospace date, headline, excerpt
- "View all →" link to `/news`

**⑧ Footer CTA** (`charcoal`)
- "GET INVOLVED" monospace label
- H2: "Ready to collaborate?"
- Body copy referencing South East Asia network
- `Contact Us` primary CTA

---

### 3.2 About Page (`/about`)

Keeps existing structure (Hero → Mission & Vision → Our Story → Team) with new design system applied, plus updated Partners section replacing the current simple logo grid.

**Partners Section — Two Tiers:**

*Tier 1 — Institutional Partners* (`charcoal` bg)
- Label: "TIER 1 · Institutional Partners"
- Sub-label: "Government, regulatory bodies & industry organisations"
- 4-across logo grid — white on dark, subtle border cards

*Tier 2 — Startup & Innovation Partners* (`body-bg`)
- Label: "TIER 2 · Startup & Innovation Partners"
- Sub-label: "Technology companies and startups we collaborate with"
- 3-column partner cards: logo + name + description + category tag
- Category tags managed in Sanity: ATM TECH · AI/DATA · SIMULATION · DRONE/UAM etc.
- "Get in Touch →" CTA at section bottom

**Sanity schema change for `partner`:**
- Add `tier`: string, options `['institutional', 'startup']`, required
- Add `description`: text, optional (for startup tier cards)
- Add `categoryTag`: string, optional (e.g. "ATM TECH", "AI/DATA", "SIMULATION", "DRONE/UAM")
- Deprecate `showOn` field: remove it from the schema and from `sanity/queries.ts`. Replace `homePartnersQuery` and `aboutPartnersQuery` with:
  - `homePartnersQuery` — all partners (both tiers), ordered by `order asc`
  - `aboutInstitutionalPartnersQuery` — `tier == "institutional"`, ordered by `order`
  - `aboutStartupPartnersQuery` — `tier == "startup"`, ordered by `order`

---

### 3.3 RCP Page (`/rcp`) — NEW

**① Hero** (`hero-bg`, background video)
- Reuse existing background video from airlab.aero/regional-collaboration-platform/
- `charcoal/70` overlay (standardise `HeroDark` overlay as a `overlayOpacity` prop, default `75`, RCP hero uses `70`)
- AIR Lab label · RCP title with teal `(RCP)` highlight
- Two CTAs: `Access the RCP Platform` (primary, links to live portal) + `Learn More ↓`
- Domain shown below CTA: `rcp.pub.airlab.thalesdigital.io`

**② Overview** (`body-bg`)
- Opening quote (blockquote style, teal left border): *"Through the Regional Collaboration Platform, we foster shared understanding, accelerate iteration, and co-develop a common way forward."*
- Full description paragraph
- 3 attribute cards: Multi-stakeholder · Open & Cloud-based · Risk-free Testing

**③ Explainer Video** (`charcoal`)
- Section label + H2: "See RCP in action"
- Embedded YouTube/Vimeo player (16:9, `hero-bg` bg)

**④ Timeline** (`body-bg`) — collapsible
- Section label + H2: "RCP Development Journey"
- Vertical waypoint-style timeline (diamond markers, dashed lines)
- 4 phases — titles visible by default, full content revealed on "More ↓" click (accordion):
  - **2019–2023:** Initializing Capabilities
  - **2024:** Regional Awareness as the First Use Case — live/historical data, 4D flight data, surveillance fusion
  - **2025 (CURRENT):** Regional Engagement with FF-ICE — progressive APAC ANSP onboarding, full FF-ICE stack, hybrid "what-if" mode
  - **2026:** Strengthening Regional Use Cases — weather forecasting, city-pair optimisation
- Current phase (2025) uses `charcoal` card to stand out
- Managed in Sanity

**⑤ FF-ICE Use Case** (white)
- Definition + intro paragraph
- 3 alternating text/screenshot pairs (left-right-left layout):
  1. Early Trajectory Negotiation + screenshot
  2. Pre-Departure 4D Trajectory Agreement + screenshot
  3. Reduce Workload & Enhance Safety + screenshot
- Full-width dashboard screenshot below (main RCP UI)
- All images/screenshots migrated from existing airlab.aero — uploaded to Sanity, no new assets needed
- "Explore the full FF-ICE initiative →" link to initiative detail page

**⑥ Get Involved** (`charcoal`)
- 3 numbered steps:
  1. Join as a Member Organisation
  2. Partner as a Technology Provider
  3. Want to know more? → `Contact us` CTA button (teal, inline)

**⑦ Resources** (white)
- Sanity-managed list of downloadable docs and external links
- Diamond waypoint icon per item
- Pre-populated: RCP Platform (live) + RCP Demo Environment

**New Sanity schema: `rcp`** (singleton document, `__experimental_actions: ['update', 'publish']`)
Fields:
- `heroVideoUrl`: url string
- `explainerVideoUrl`: url string
- `timelineItems[]`: array of objects with:
  - `phase`: string (e.g. "2019–2023", "2024", "2025", "2026") — plain text label, not a date type
  - `title`: string
  - `body`: portable text (block array)
  - `isCurrent`: boolean
- `useCaseImages[]`: array of `{ image: image (with hotspot), caption: string, altText: string, order: number }`
- `resources[]`: array of `{ label: string, url: url, type: string (options: ['pdf', 'link']) }`

Register `rcp` in `sanity/schemas/index.ts` alongside the existing four schemas.

`RcpTimeline` component must be a **client component** (`'use client'`) due to accordion `useState` interaction.

---

### 3.4 Our Work Page (`/our-work`) & Initiative Detail (`/our-work/[slug]`)

- Apply new design system (blueprint hero, status chips, surface cards)
- No structural changes to page layout
- Update `InitiativeCard` component with new status chip and `surface` bg

---

### 3.5 News Page (`/news`) & Article (`/news/[slug]`)

- Apply new design system
- Teal monospace date on cards
- No structural changes

---

### 3.6 Contact Page (`/contact`)

- Apply new design system (blueprint hero)
- No structural changes

---

## 4. New & Updated Components

| Component | Status | Notes |
|-----------|--------|-------|
| `BlueprintGrid` | New | SVG grid + waypoints, reusable, accepts `opacity` prop |
| `Nav` | Update | Add RCP link, scroll behaviour |
| `HeroDark` | Update | Accept `videoUrl` prop for video bg (used on RCP) |
| `InitiativeCard` | Update | New status chip, surface bg |
| `PartnerGrid` | Replace | Split into `PartnerGridInstitutional` + `PartnerGridStartups` |
| `ImpactStrip` | New | 4-stat dark strip for homepage |
| `QuickAccessChips` | New | Project chip row in hero |
| `RcpTimeline` | New | Accordion timeline, Sanity-driven |
| `Footer` | Update | Minor: tint on hover, monospace label style |

---

## 5. Sanity Schema Changes

| Schema | Change |
|--------|--------|
| `partner` | Add `tier` (institutional/startup), `description`, `categoryTag` |
| `initiative` | No change |
| `news` | No change |
| `team` | No change |
| `rcp` *(new)* | Singleton: heroVideoUrl, explainerVideoUrl, timelineItems[], useCaseImages[], resources[] |

---

## 6. Asset Migration

All existing assets from airlab.aero are reused — no new photography or illustration needed:
- Background video from `/regional-collaboration-platform/` hero → used on RCP page hero
- FF-ICE screenshots and diagrams → uploaded to Sanity as `rcp.useCaseImages[]`
- Partner logos → uploaded to Sanity under existing `partner` schema

Real logo file (`public/logo.svg`) can be dropped in at any time — the `Nav` and `Footer` components are structured to swap text logo for image logo with a one-line change.

---

## 7. Out of Scope

- No changes to authentication or admin access
- No new fonts beyond JetBrains Mono
- No animated blueprint grid (static SVG only — keeps performance high)
- No changes to Vercel deployment configuration
- No changes to Resend/contact form logic
