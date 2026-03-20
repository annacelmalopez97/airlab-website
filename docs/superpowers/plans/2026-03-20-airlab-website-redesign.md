# AIR Lab Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the AIR Lab website with a blueprint/aviation aesthetic, add the RCP page, overhaul the Partners section into two tiers, and update the homepage with new sections.

**Architecture:** Design system tokens first (Tailwind + fonts + CSS), then Sanity schemas, then reusable components, then pages. Each task produces a working build. No test framework is installed — verification is `npm run build` (TypeScript + compilation) plus `npm run dev` (visual).

**Tech Stack:** Next.js 14 App Router, Tailwind CSS 3, Sanity v3, TypeScript, Vercel. No testing library installed.

---

## File Map

**Modified:**
- `tailwind.config.ts` — new color tokens + mono font family
- `app/layout.tsx` — add JetBrains Mono font
- `app/globals.css` — new utility classes (btn-primary-dark, section-hero)
- `components/Nav.tsx` — new links array (RCP added, Team/Partners removed)
- `components/HeroDark.tsx` — videoUrl + overlayOpacity props
- `components/InitiativeCard.tsx` — status chip, surface bg
- `components/PartnerGrid.tsx` — replaced by two new components (delete this file)
- `components/Footer.tsx` — monospace label style
- `app/page.tsx` — homepage full rebuild
- `app/about/page.tsx` — two-tier partners section
- `app/our-work/page.tsx` — design system update
- `app/our-work/[slug]/page.tsx` — design system update
- `app/news/page.tsx` — design system update
- `app/news/[slug]/page.tsx` — design system update
- `app/contact/page.tsx` — design system update
- `sanity/schemas/partner.ts` — add tier, description, categoryTag; remove showOn
- `sanity/schemas/index.ts` — register rcp schema
- `sanity/queries.ts` — new partner queries, add rcpQuery

**Created:**
- `components/BlueprintGrid.tsx` — reusable SVG blueprint overlay
- `components/ImpactStrip.tsx` — 4-stat dark strip
- `components/QuickAccessChips.tsx` — project chip row
- `components/PartnerGridInstitutional.tsx` — tier 1 logo grid
- `components/PartnerGridStartups.tsx` — tier 2 startup cards
- `components/RcpTimeline.tsx` — client component, accordion timeline
- `app/rcp/page.tsx` — new RCP page
- `app/partners/page.tsx` — replaced with redirect
- `app/team/page.tsx` — replaced with redirect
- `sanity/schemas/rcp.ts` — new singleton schema

---

## Task 1: Design System — Tailwind, Fonts, CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add new color tokens and mono font to Tailwind**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#30C7B5',
          dark: '#00AC97',
        },
        charcoal: '#14261C',
        'hero-bg': '#0A1A10',
        surface: '#1C3325',
        'body-bg': '#F3F6F3',
        tint: '#E8F0E9',
      },
      fontFamily: {
        display: ['var(--font-red-hat-display)', 'sans-serif'],
        body: ['var(--font-red-hat-text)', 'sans-serif'],
        ui: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Add JetBrains Mono to layout.tsx**

Replace the font imports section in `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Red_Hat_Display, Red_Hat_Text, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap',
})

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-red-hat-text',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AIR Lab Singapore',
    template: '%s | AIR Lab Singapore',
  },
  description:
    'AIR Lab Singapore develops innovative Air Traffic Management solutions through open collaboration and agile methodologies.',
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://airlab.aero',
    siteName: 'AIR Lab Singapore',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${redHatText.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Add new utility classes to globals.css**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-body-bg text-charcoal font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer components {
  .btn-primary {
    @apply inline-block bg-teal hover:bg-teal-dark text-white font-ui font-medium text-sm px-6 py-3 rounded transition-colors duration-200;
  }

  /* Used on dark hero sections where teal bg needs dark text */
  .btn-primary-dark {
    @apply inline-block bg-teal hover:bg-teal-dark text-hero-bg font-ui font-medium text-sm px-6 py-3 rounded transition-colors duration-200;
  }

  .btn-outline {
    @apply inline-block border-2 border-teal text-teal hover:bg-teal hover:text-white font-ui font-medium text-sm px-6 py-3 rounded transition-colors duration-200;
  }

  .section-light {
    @apply bg-body-bg py-16 md:py-24;
  }

  .section-dark {
    @apply bg-charcoal py-16 md:py-24;
  }

  .section-hero {
    @apply bg-hero-bg py-16 md:py-24;
  }

  .section-white {
    @apply bg-white py-16 md:py-24;
  }

  .container-inner {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .tag {
    @apply inline-block text-xs font-ui font-medium uppercase tracking-widest px-3 py-1 rounded-full;
  }

  .atm-label {
    @apply font-mono text-xs uppercase tracking-widest;
  }
}
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026" && npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat: add design system tokens — hero-bg, surface, tint, JetBrains Mono, new CSS utilities"
```

---

## Task 2: Sanity — Partner Schema Update

**Files:**
- Modify: `sanity/schemas/partner.ts`
- Modify: `sanity/queries.ts`

- [ ] **Step 1: Update partner schema — add tier/description/categoryTag, remove showOn**

Replace `sanity/schemas/partner.ts` with:

```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Organization Name', validation: (R) => R.required() }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', validation: (R) => R.required() }),
    defineField({ name: 'websiteUrl', type: 'url', title: 'Website URL' }),
    defineField({
      name: 'tier',
      type: 'string',
      title: 'Partner Tier',
      description: 'Institutional = government/regulatory/industry orgs. Startup = tech companies and startups.',
      options: { list: ['institutional', 'startup'] },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'Used on startup partner cards. 1–2 sentences about the collaboration.',
      rows: 3,
    }),
    defineField({
      name: 'categoryTag',
      type: 'string',
      title: 'Category Tag',
      description: 'Startup tier only. E.g. ATM TECH, AI/DATA, SIMULATION, DRONE/UAM',
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order', description: 'Lower number = appears first', validation: (R) => R.required() }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } },
})
```

- [ ] **Step 2: Update sanity/queries.ts — new partner queries**

Replace the two old partner queries (lines 37–44) with three new ones. Full updated file:

```ts
// Home page — active initiatives (max 4)
export const activeInitiativesQuery = `*[_type == "initiative" && status == "Active"] | order(order asc)[0...4] {
  _id, title, "slug": slug.current, shortDescription, status, coverImage
}`

// Our Work page — all initiatives
export const allInitiativesQuery = `*[_type == "initiative"] | order(order asc) {
  _id, title, "slug": slug.current, shortDescription, status, coverImage
}`

// Single initiative by slug
export const initiativeBySlugQuery = `*[_type == "initiative" && slug.current == $slug][0] {
  _id, title, shortDescription, status, coverImage, body, partnerOrganizations, publicationsAndLinks
}`

// Initiative slugs for QuickAccessChips (checks existence)
export const initiativeSlugsQuery = `*[_type == "initiative"] { "slug": slug.current }`

// Home page — 3 latest news posts
export const latestNewsQuery = `*[_type == "newsPost"] | order(publishedAt desc)[0...3] {
  _id, title, "slug": slug.current, publishedAt, category, mainImage, excerpt, externalLink
}`

// News listing — all posts
export const allNewsQuery = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id, title, "slug": slug.current, publishedAt, category, mainImage, excerpt, externalLink
}`

// Single news post by slug
export const newsBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id, title, publishedAt, category, mainImage, body, author, externalLink
}`

// Team members
export const teamQuery = `*[_type == "teamMember"] | order(order asc) {
  _id, name, role, photo, bio, linkedIn
}`

// Partners for Home (all tiers, ordered)
export const homePartnersQuery = `*[_type == "partner"] | order(order asc) {
  _id, name, logo, websiteUrl, tier
}`

// Institutional partners for About (tier 1)
export const aboutInstitutionalPartnersQuery = `*[_type == "partner" && tier == "institutional"] | order(order asc) {
  _id, name, logo, websiteUrl
}`

// Startup partners for About (tier 2)
export const aboutStartupPartnersQuery = `*[_type == "partner" && tier == "startup"] | order(order asc) {
  _id, name, logo, websiteUrl, description, categoryTag
}`

// RCP singleton
export const rcpQuery = `*[_type == "rcp"][0] {
  heroVideoUrl, explainerVideoUrl,
  timelineItems[] { phase, title, body, isCurrent },
  useCaseImages[] { image, caption, altText, order },
  resources[] { label, url, type }
}`
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: succeeds. (Sanity schema changes don't affect Next.js build.)

- [ ] **Step 4: Commit**

```bash
git add sanity/schemas/partner.ts sanity/queries.ts
git commit -m "feat: update partner schema (tier/description/categoryTag), replace showOn queries with tier-based queries, add rcpQuery"
```

---

## Task 3: Sanity — RCP Singleton Schema

**Files:**
- Create: `sanity/schemas/rcp.ts`
- Modify: `sanity/schemas/index.ts`

- [ ] **Step 1: Create RCP singleton schema**

Create `sanity/schemas/rcp.ts`:

```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'rcp',
  title: 'RCP Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroVideoUrl', type: 'url', title: 'Hero Background Video URL' }),
    defineField({ name: 'explainerVideoUrl', type: 'url', title: 'Explainer Video URL (YouTube/Vimeo embed)' }),
    defineField({
      name: 'timelineItems',
      type: 'array',
      title: 'Timeline Items',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'phase', type: 'string', title: 'Phase Label', description: 'E.g. "2019–2023" or "2025"', validation: (R) => R.required() }),
          defineField({ name: 'title', type: 'string', title: 'Title', validation: (R) => R.required() }),
          defineField({ name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] }),
          defineField({ name: 'isCurrent', type: 'boolean', title: 'Is Current Phase', initialValue: false }),
        ],
        preview: { select: { title: 'title', subtitle: 'phase' } },
      }],
    }),
    defineField({
      name: 'useCaseImages',
      type: 'array',
      title: 'FF-ICE Use Case Images',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true }, validation: (R) => R.required() }),
          defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          defineField({ name: 'altText', type: 'string', title: 'Alt Text', validation: (R) => R.required() }),
          defineField({ name: 'order', type: 'number', title: 'Display Order', validation: (R) => R.required() }),
        ],
        preview: { select: { title: 'caption', media: 'image' } },
      }],
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Resources (Documents & Links)',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label', validation: (R) => R.required() }),
          defineField({ name: 'url', type: 'url', title: 'URL', validation: (R) => R.required() }),
          defineField({
            name: 'type',
            type: 'string',
            title: 'Type',
            options: { list: ['pdf', 'link'] },
            validation: (R) => R.required(),
          }),
        ],
        preview: { select: { title: 'label', subtitle: 'type' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'RCP Page Content' }) },
})
```

- [ ] **Step 2: Register in index.ts**

Replace `sanity/schemas/index.ts`:

```ts
import newsPost from './news'
import teamMember from './team'
import initiative from './initiative'
import partner from './partner'
import rcp from './rcp'

export const schemaTypes = [newsPost, teamMember, initiative, partner, rcp]
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add sanity/schemas/rcp.ts sanity/schemas/index.ts
git commit -m "feat: add RCP singleton Sanity schema"
```

---

## Task 4: BlueprintGrid Component

**Files:**
- Create: `components/BlueprintGrid.tsx`

- [ ] **Step 1: Create component**

Create `components/BlueprintGrid.tsx`:

```tsx
interface BlueprintGridProps {
  opacity?: number // 0–100, default 10
}

export default function BlueprintGrid({ opacity = 10 }: BlueprintGridProps) {
  return (
    <svg
      aria-hidden="true"
      style={{ opacity: opacity / 100 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Fine 20px grid */}
        <pattern id="bp-small" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#30C7B5" strokeWidth="0.4" />
        </pattern>
        {/* Major 100px grid */}
        <pattern id="bp-large" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-small)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#30C7B5" strokeWidth="0.9" />
        </pattern>
      </defs>

      {/* Grid fill */}
      <rect width="800" height="600" fill="url(#bp-large)" />

      {/* Waypoint: SINVY */}
      <rect x="248" y="148" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 252 152)" />
      <text x="236" y="142" fill="#30C7B5" fontSize="7" fontFamily="monospace">SINVY</text>

      {/* Waypoint: ROMAR */}
      <rect x="448" y="198" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 452 202)" />
      <text x="436" y="192" fill="#30C7B5" fontSize="7" fontFamily="monospace">ROMAR</text>

      {/* Waypoint: VISAT */}
      <rect x="618" y="163" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 622 167)" />
      <text x="606" y="157" fill="#30C7B5" fontSize="7" fontFamily="monospace">VISAT</text>

      {/* Flight paths */}
      <line x1="252" y1="152" x2="452" y2="202" stroke="#30C7B5" strokeWidth="0.9" strokeDasharray="5,3" />
      <line x1="452" y1="202" x2="622" y2="167" stroke="#30C7B5" strokeWidth="0.9" strokeDasharray="5,3" />

      {/* Flight level labels */}
      <text x="342" y="168" fill="#30C7B5" fontSize="6" fontFamily="monospace" opacity="0.7">FL350</text>
      <text x="530" y="177" fill="#30C7B5" fontSize="6" fontFamily="monospace" opacity="0.7">FL370</text>
    </svg>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/BlueprintGrid.tsx
git commit -m "feat: add BlueprintGrid SVG component with Singapore FIR waypoints"
```

---

## Task 5: Nav Component Update

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Update Nav links array — add RCP, remove Team and Partners**

Replace `components/Nav.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/rcp', label: 'RCP' },
  { href: '/news', label: 'News & Insights' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-white/10">
      <div className="container-inner flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl text-white tracking-tight">
          AIR<span className="text-teal">Lab</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-sm font-medium text-white/80 hover:text-teal transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-sm font-medium text-white/80 hover:text-teal transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-center" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: update nav — add RCP link, remove Team and Partners links"
```

---

## Task 6: HeroDark Component Update

**Files:**
- Modify: `components/HeroDark.tsx`

- [ ] **Step 1: Add videoUrl and overlayOpacity props**

Replace `components/HeroDark.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import BlueprintGrid from './BlueprintGrid'

interface HeroDarkProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImageUrl?: string
  videoUrl?: string
  size?: 'large' | 'medium'
  overlayOpacity?: number // Tailwind opacity value: 70 | 75 | 80 etc.
  showBlueprint?: boolean
}

export default function HeroDark({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  backgroundImageUrl,
  videoUrl,
  size = 'medium',
  overlayOpacity = 75,
  showBlueprint = false,
}: HeroDarkProps) {
  const heightClass = size === 'large' ? 'min-h-[90vh]' : 'min-h-[50vh]'

  return (
    <section className={`relative flex items-center bg-hero-bg ${heightClass} pt-16 overflow-hidden`}>
      {/* Background video */}
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Background image (fallback if no video) */}
      {backgroundImageUrl && !videoUrl && (
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Blueprint grid */}
      {showBlueprint && <BlueprintGrid opacity={10} />}

      {/* Teal accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

      <div className="container-inner relative z-10 py-16">
        <div className="max-w-3xl">
          <div className="w-12 h-1 bg-teal mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <Link href={ctaHref} className="btn-primary mt-8 inline-block">
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/HeroDark.tsx
git commit -m "feat: update HeroDark — videoUrl prop, overlayOpacity prop, showBlueprint prop"
```

---

## Task 7: ImpactStrip Component

**Files:**
- Create: `components/ImpactStrip.tsx`

- [ ] **Step 1: Create component**

Create `components/ImpactStrip.tsx`:

```tsx
const stats = [
  { label: 'ATM EXPERTS', value: '20+', sub: 'IN TEAM' },
  { label: 'PARTNERS', value: '30+', sub: 'GLOBAL' },
  { label: 'FOCUS', value: 'South East Asia', sub: 'REGION' },
  { label: 'SINCE', value: '2020', sub: 'FOUNDED' },
]

export default function ImpactStrip() {
  return (
    <section className="bg-charcoal py-10">
      <div className="container-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="atm-label text-teal mb-1">{s.label}</p>
              <p className="font-display font-bold text-white text-2xl md:text-3xl leading-tight">{s.value}</p>
              <p className="atm-label text-white/30 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/ImpactStrip.tsx
git commit -m "feat: add ImpactStrip component — ATM Experts, Partners, South East Asia, Since 2020"
```

---

## Task 8: QuickAccessChips Component

**Files:**
- Create: `components/QuickAccessChips.tsx`

- [ ] **Step 1: Create component**

Create `components/QuickAccessChips.tsx`:

```tsx
import Link from 'next/link'

interface Chip {
  label: string
  href: string
  highlight?: boolean
}

interface QuickAccessChipsProps {
  availableSlugs: string[] // initiative slugs that exist in Sanity
}

export default function QuickAccessChips({ availableSlugs }: QuickAccessChipsProps) {
  const chips: Chip[] = [
    { label: 'RCP Platform', href: '/rcp', highlight: true },
    { label: 'FF-ICE', href: '/our-work/ff-ice' },
    { label: 'OPEN ATM', href: '/our-work/open-atm' },
    { label: 'Digital Twin', href: '/our-work/digital-twin' },
  ]

  // For initiative chips, only render if their slug exists in Sanity
  const visible = chips.filter((c) => {
    if (c.href === '/rcp') return true
    const slug = c.href.replace('/our-work/', '')
    return availableSlugs.includes(slug)
  })

  if (visible.length === 0) return null

  return (
    <div className="border-t border-white/10 pt-5">
      <p className="atm-label text-white/30 mb-3">QUICK ACCESS</p>
      <div className="flex flex-wrap gap-2">
        {visible.map((chip) => (
          <Link
            key={chip.href}
            href={chip.href}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-ui font-semibold transition-colors ${
              chip.highlight
                ? 'bg-teal/10 border border-teal/25 text-teal hover:bg-teal/20'
                : 'bg-white/5 border border-white/12 text-white/60 hover:text-white/90'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${chip.highlight ? 'bg-teal' : 'bg-white/40'}`} />
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/QuickAccessChips.tsx
git commit -m "feat: add QuickAccessChips component with conditional slug rendering"
```

---

## Task 9: InitiativeCard Update

**Files:**
- Modify: `components/InitiativeCard.tsx`

- [ ] **Step 1: Read current file**

Read `components/InitiativeCard.tsx` fully before editing.

- [ ] **Step 2: Add status chip, update bg to surface**

Replace `components/InitiativeCard.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)
function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const statusColors: Record<string, string> = {
  Active: 'bg-teal/10 border-teal/25 text-teal',
  Upcoming: 'bg-white/10 border-white/20 text-white/60',
  Completed: 'bg-white/5 border-white/10 text-white/40',
}

const statusDots: Record<string, string> = {
  Active: 'bg-teal',
  Upcoming: 'bg-white/50',
  Completed: 'bg-white/30',
}

interface InitiativeCardProps {
  title: string
  slug: string
  shortDescription: string
  status: string
  coverImage: SanityImageSource
}

export default function InitiativeCard({ title, slug, shortDescription, status, coverImage }: InitiativeCardProps) {
  return (
    <Link href={`/our-work/${slug}`} className="group block bg-surface rounded-xl overflow-hidden hover:ring-1 hover:ring-teal/30 transition-all duration-300">
      <div className="relative h-44 bg-hero-bg">
        {coverImage && (
          <Image
            src={urlFor(coverImage).width(600).height(350).url()}
            alt={title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </div>
      <div className="p-5">
        {/* Status chip */}
        <div className={`inline-flex items-center gap-1.5 border rounded px-2 py-0.5 mb-3 ${statusColors[status] ?? statusColors.Active}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDots[status] ?? statusDots.Active}`} />
          <span className="atm-label text-[10px]">{status.toUpperCase()}</span>
        </div>
        <h3 className="font-display font-bold text-white text-base leading-snug mb-2 group-hover:text-teal transition-colors">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{shortDescription}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/InitiativeCard.tsx
git commit -m "feat: update InitiativeCard — status chip, surface bg, hover ring"
```

---

## Task 10: Partner Grid Components

**Files:**
- Create: `components/PartnerGridInstitutional.tsx`
- Create: `components/PartnerGridStartups.tsx`
- Delete: `components/PartnerGrid.tsx` (after confirming no remaining imports)

- [ ] **Step 1: Create PartnerGridInstitutional**

Create `components/PartnerGridInstitutional.tsx`:

```tsx
import Image from 'next/image'
import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

interface Partner {
  _id: string
  name: string
  logo: SanityImageSource
  websiteUrl?: string
}

interface Props {
  partners: Partner[]
}

export default function PartnerGridInstitutional({ partners }: Props) {
  if (!partners.length) return null

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {partners.map((p) => {
        const logoUrl = builder.image(p.logo).width(200).height(80).fit('max').url()
        const content = (
          <div className="bg-white/5 border border-white/8 rounded-lg p-4 h-16 flex items-center justify-center hover:border-teal/20 transition-colors">
            <Image
              src={logoUrl}
              alt={p.name}
              width={120}
              height={48}
              className="object-contain max-h-10 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        )
        return p.websiteUrl ? (
          <a key={p._id} href={p.websiteUrl} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <div key={p._id}>{content}</div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Create PartnerGridStartups**

Create `components/PartnerGridStartups.tsx`:

```tsx
import Image from 'next/image'
import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

interface StartupPartner {
  _id: string
  name: string
  logo: SanityImageSource
  websiteUrl?: string
  description?: string
  categoryTag?: string
}

interface Props {
  partners: StartupPartner[]
}

export default function PartnerGridStartups({ partners }: Props) {
  if (!partners.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {partners.map((p) => {
        const logoUrl = builder.image(p.logo).width(120).height(120).fit('max').url()
        return (
          <div key={p._id} className="bg-white rounded-xl p-5 border border-charcoal/5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-tint rounded-lg flex items-center justify-center flex-shrink-0">
                <Image src={logoUrl} alt={p.name} width={36} height={36} className="object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-charcoal text-sm">{p.name}</h4>
                {p.description && (
                  <p className="text-charcoal/55 text-xs leading-relaxed mt-1 line-clamp-2">{p.description}</p>
                )}
              </div>
            </div>
            {p.categoryTag && (
              <div className="self-start bg-tint rounded px-2 py-0.5">
                <span className="atm-label text-teal text-[9px]">{p.categoryTag}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Check for remaining PartnerGrid imports**

```bash
grep -r "PartnerGrid" "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026/app" "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026/components" --include="*.tsx"
```

Note all files that still import the old `PartnerGrid`. They will be updated in Tasks 13–14.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/PartnerGridInstitutional.tsx components/PartnerGridStartups.tsx
git commit -m "feat: add PartnerGridInstitutional and PartnerGridStartups components"
```

---

## Task 11: RcpTimeline Component

**Files:**
- Create: `components/RcpTimeline.tsx`

- [ ] **Step 1: Create accordion timeline (client component)**

Create `components/RcpTimeline.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface TimelineItem {
  phase: string
  title: string
  body: unknown[]
  isCurrent?: boolean
}

interface Props {
  items: TimelineItem[]
}

export default function RcpTimeline({ items }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = (i: number) => setExpanded(expanded === i ? null : i)

  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-teal/20" />

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="relative">
            {/* Diamond marker */}
            <div
              className={`absolute -left-6 top-4 w-3 h-3 rotate-45 border ${
                item.isCurrent
                  ? 'bg-teal border-teal'
                  : expanded === i
                  ? 'bg-teal/40 border-teal'
                  : 'bg-body-bg border-teal/40'
              }`}
            />

            <div
              className={`rounded-xl overflow-hidden border cursor-pointer select-none ${
                item.isCurrent
                  ? 'bg-charcoal border-teal/20'
                  : 'bg-white border-charcoal/6'
              }`}
              onClick={() => toggle(i)}
            >
              {/* Header row — always visible */}
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`atm-label text-[10px] ${item.isCurrent ? 'text-teal' : 'text-teal/70'}`}>
                      {item.phase}
                    </span>
                    {item.isCurrent && (
                      <span className="atm-label text-[9px] bg-teal/10 border border-teal/25 text-teal rounded-full px-2 py-px">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <h4 className={`font-display font-bold text-sm ${item.isCurrent ? 'text-white' : 'text-charcoal'}`}>
                    {item.title}
                  </h4>
                </div>
                <span className={`text-xs font-semibold ml-4 flex-shrink-0 ${item.isCurrent ? 'text-teal' : 'text-teal/60'}`}>
                  {expanded === i ? '▲' : 'More ↓'}
                </span>
              </div>

              {/* Expanded body */}
              {expanded === i && item.body && (
                <div className={`px-5 pb-5 pt-0 border-t ${item.isCurrent ? 'border-white/10' : 'border-charcoal/6'}`}>
                  <div className={`prose prose-sm max-w-none mt-3 ${item.isCurrent ? 'prose-invert' : ''}`}>
                    <PortableText value={item.body as Parameters<typeof PortableText>[0]['value']} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/RcpTimeline.tsx
git commit -m "feat: add RcpTimeline client component with accordion expand/collapse"
```

---

## Task 12: Footer Update

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Update nav links and label style**

Replace `components/Footer.tsx`:

```tsx
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/rcp', label: 'RCP' },
  { href: '/news', label: 'News & Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10">
      <div className="container-inner py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display font-bold text-2xl text-white tracking-tight">
              AIR<span className="text-teal">Lab</span>
            </Link>
            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              Advancing the future of Air Traffic Management through open collaboration and agile innovation.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="atm-label text-teal mb-4">NAVIGATION</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 hover:text-teal text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="atm-label text-teal mb-4">CONNECT</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/airlab-singapore" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://twitter.com/airlabsingapore" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-teal transition-colors" aria-label="X / Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-xs font-mono">
          © {new Date().getFullYear()} AIR Lab Singapore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: update Footer — add RCP link, remove Team/Partners, monospace label style"
```

---

## Task 13: Homepage Rebuild

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rebuild homepage with all 8 sections**

Replace `app/page.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import {
  activeInitiativesQuery,
  latestNewsQuery,
  homePartnersQuery,
  initiativeSlugsQuery,
} from '@/sanity/queries'
import InitiativeCard from '@/components/InitiativeCard'
import NewsCard from '@/components/NewsCard'
import ImpactStrip from '@/components/ImpactStrip'
import QuickAccessChips from '@/components/QuickAccessChips'
import BlueprintGrid from '@/components/BlueprintGrid'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

const pillars = [
  {
    title: 'Innovation',
    description: 'Developing cutting-edge solutions to complex Air Traffic Management challenges through agile research and experimentation.',
  },
  {
    title: 'Collaboration',
    description: 'Building open partnerships across industry, academia, and government to accelerate progress in ATM.',
  },
  {
    title: 'ATM Excellence',
    description: 'Advancing operational efficiency, safety, and capacity in airspace management across South East Asia.',
  },
  {
    title: 'Fast Experimentation & Prototyping',
    description: 'Rapid iteration from concept to working prototype — validating ideas quickly in a risk-free environment.',
    dark: true,
  },
]

export default async function HomePage() {
  const [initiatives, news, partners, slugData] = await Promise.all([
    client.fetch(activeInitiativesQuery),
    client.fetch(latestNewsQuery),
    client.fetch(homePartnersQuery),
    client.fetch(initiativeSlugsQuery),
  ])

  const availableSlugs: string[] = (slugData as { slug: string }[]).map((s) => s.slug)

  return (
    <>
      {/* ① HERO */}
      <section className="relative min-h-screen flex items-center bg-hero-bg pt-16 overflow-hidden">
        <BlueprintGrid opacity={10} />
        <div className="absolute inset-0 bg-hero-bg/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Logo */}
            <div className="mb-6">
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                AIR<span className="text-teal">Lab</span>
              </span>
            </div>

            {/* Label */}
            <p className="font-ui text-xs font-medium text-teal/80 tracking-widest mb-5">
              AIR Lab &nbsp;·&nbsp; Aviation Innovation Research Lab
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
              Advancing the Future of Air Traffic Management
            </h1>
            <p className="mt-6 text-xl text-white/70 leading-relaxed max-w-2xl">
              Developing innovative ATM solutions for South East Asia through open collaboration and agile research.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/our-work" className="btn-primary-dark text-base px-8 py-4">
                Explore Our Work
              </Link>
              <Link href="/about" className="btn-outline text-base px-8 py-4 border-white/40 text-white hover:bg-white hover:text-charcoal">
                About AIR Lab
              </Link>
            </div>

            {/* Quick-access chips */}
            <div className="mt-8 max-w-xl">
              <QuickAccessChips availableSlugs={availableSlugs} />
            </div>
          </div>
        </div>
      </section>

      {/* ② IMPACT STRIP */}
      <ImpactStrip />

      {/* ③ WHAT WE DO */}
      <section className="section-light">
        <div className="container-inner">
          <div className="text-center mb-14">
            <p className="atm-label text-teal mb-3">WHAT WE DO</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">
              Four pillars of innovation
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className={`rounded-xl p-6 border ${
                  p.dark
                    ? 'bg-charcoal border-teal/15'
                    : 'bg-white shadow-sm border-charcoal/5 hover:shadow-md transition-shadow duration-300'
                }`}
              >
                <div className="w-8 h-0.5 bg-teal mb-4" />
                <h3 className={`font-display font-bold text-lg mb-2 ${p.dark ? 'text-white' : 'text-charcoal'}`}>
                  {p.title}
                </h3>
                <p className={`text-sm leading-relaxed ${p.dark ? 'text-white/50' : 'text-charcoal/60'}`}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ KEY INITIATIVES */}
      {initiatives.length > 0 && (
        <section className="section-dark">
          <div className="container-inner">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="atm-label text-teal mb-3">OUR WORK</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Key Initiatives</h2>
              </div>
              <Link href="/our-work" className="hidden md:block text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {initiatives.map((i: Parameters<typeof InitiativeCard>[0] & { _id: string }) => (
                <InitiativeCard key={i._id} {...i} />
              ))}
            </div>
            <div className="mt-8 md:hidden text-center">
              <Link href="/our-work" className="text-teal font-ui text-sm font-medium">View all →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ⑤ RCP SPOTLIGHT */}
      <section className="section-hero relative overflow-hidden">
        <BlueprintGrid opacity={8} />
        <div className="container-inner relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="atm-label text-teal mb-3">FEATURED INITIATIVE</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Regional Collaboration Platform (RCP)
              </h2>
              <p className="text-white/55 leading-relaxed">
                Connecting ATM stakeholders across South East Asia. An open, cloud-based sandbox for experimentation and rapid prototyping.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 flex-shrink-0">
              <Link href="/rcp" className="btn-primary-dark px-8 py-4">
                Explore RCP →
              </Link>
              <p className="atm-label text-white/30">SEA · MULTI-STAKEHOLDER</p>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ PARTNERS ROW */}
      {partners.length > 0 && (
        <section className="section-white border-t border-charcoal/5">
          <div className="container-inner">
            <p className="text-center atm-label text-charcoal/40 mb-10">PARTNERS & COLLABORATORS</p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {(partners as { _id: string; name: string; logo: SanityImageSource; websiteUrl?: string }[]).map((p) => {
                const logoUrl = builder.image(p.logo).width(160).height(64).fit('max').url()
                return p.websiteUrl ? (
                  <a key={p._id} href={p.websiteUrl} target="_blank" rel="noopener noreferrer"
                    className="opacity-50 hover:opacity-100 transition-opacity">
                    <Image src={logoUrl} alt={p.name} width={100} height={40} className="object-contain" />
                  </a>
                ) : (
                  <div key={p._id} className="opacity-50">
                    <Image src={logoUrl} alt={p.name} width={100} height={40} className="object-contain" />
                  </div>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <Link href="/about#partners" className="text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                View all partners →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ⑦ LATEST NEWS */}
      {news.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="atm-label text-teal mb-3">LATEST</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">News & Insights</h2>
              </div>
              <Link href="/news" className="hidden md:block text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((post: Parameters<typeof NewsCard>[0] & { _id: string }) => (
                <NewsCard key={post._id} {...post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑧ FOOTER CTA */}
      <section className="section-dark text-center">
        <div className="container-inner max-w-2xl">
          <p className="atm-label text-teal mb-4">GET INVOLVED</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to collaborate?</h2>
          <p className="text-white/55 leading-relaxed mb-8">
            Join AIR Lab's growing network of ATM innovators and partners across South East Asia.
          </p>
          <Link href="/contact" className="btn-primary-dark px-10 py-4 text-base">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: succeeds. If PartnerGrid import errors appear in other files, note them for Task 14.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rebuild homepage — 8 sections with blueprint hero, impact strip, RCP spotlight, footer CTA"
```

---

## Task 14: About Page Update

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Update About page — add two-tier Partners, update labels**

Replace `app/about/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { teamQuery, aboutInstitutionalPartnersQuery, aboutStartupPartnersQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import TeamCard from '@/components/TeamCard'
import PartnerGridInstitutional from '@/components/PartnerGridInstitutional'
import PartnerGridStartups from '@/components/PartnerGridStartups'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about AIR Lab Singapore — our mission, vision, team, and partners.',
}

export default async function AboutPage() {
  const [team, institutionalPartners, startupPartners] = await Promise.all([
    client.fetch(teamQuery),
    client.fetch(aboutInstitutionalPartnersQuery),
    client.fetch(aboutStartupPartnersQuery),
  ])

  return (
    <>
      <HeroDark
        title="About AIR Lab"
        subtitle="A Singapore-based innovation lab dedicated to advancing Air Traffic Management through open research, agile collaboration, and global partnerships."
        backgroundImageUrl="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=2000&q=80"
        showBlueprint
      />

      {/* MISSION & VISION */}
      <section className="section-light">
        <div className="container-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-charcoal/5">
              <div className="w-8 h-0.5 bg-teal mb-5" />
              <h2 className="text-2xl font-display font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-charcoal/70 leading-relaxed">
                To accelerate global aviation efficiency and sustainability by developing innovative Air Traffic Management solutions through agile methodologies and open, multi-stakeholder collaboration.
              </p>
            </div>
            <div className="bg-charcoal rounded-xl p-8">
              <div className="w-8 h-0.5 bg-teal mb-5" />
              <h2 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70 leading-relaxed">
                A future where airspace is seamlessly managed, sustainably operated, and continuously improved through the power of open innovation and global collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-white border-t border-charcoal/5">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <p className="atm-label text-teal mb-4">OUR STORY</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Building the future of ATM together</h2>
            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                AIR Lab Singapore was established with a clear purpose: to bridge the gap between aviation research and operational reality in Air Traffic Management. Drawing on Singapore&apos;s unique position as a global aviation hub, we set out to create an open, collaborative environment where ideas can be tested, refined, and scaled.
              </p>
              <p>
                Since our founding, we have grown into a multi-disciplinary team of researchers, engineers, and aviation experts working alongside industry partners, regulators, and academic institutions. Our work spans from foundational research to real-world implementation — always guided by the principle that the best solutions emerge from open collaboration.
              </p>
              <p>
                Today, AIR Lab continues to push the boundaries of what is possible in ATM — developing initiatives like the Regional Collaboration Platform, FF-ICE implementation, and OPEN ATM that are shaping the future of airspace management across South East Asia and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {team.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="text-center mb-14">
              <p className="atm-label text-teal mb-3">THE TEAM</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">Meet our people</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {team.map((member: Parameters<typeof TeamCard>[0] & { _id: string }) => (
                <TeamCard key={member._id} {...member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TIER 1 — INSTITUTIONAL PARTNERS */}
      {institutionalPartners.length > 0 && (
        <section id="partners" className="section-dark">
          <div className="container-inner">
            <div className="mb-10">
              <p className="atm-label text-teal mb-2">TIER 1</p>
              <h2 className="text-3xl font-display font-bold text-white">Institutional Partners</h2>
              <p className="text-white/50 mt-2 text-sm">Government, regulatory bodies & industry organisations</p>
            </div>
            <PartnerGridInstitutional partners={institutionalPartners} />
          </div>
        </section>
      )}

      {/* TIER 2 — STARTUP & INNOVATION PARTNERS */}
      {startupPartners.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="mb-10">
              <p className="atm-label text-teal mb-2">TIER 2</p>
              <h2 className="text-3xl font-display font-bold text-charcoal">Startup & Innovation Partners</h2>
              <p className="text-charcoal/50 mt-2 text-sm">Technology companies and startups we collaborate with</p>
            </div>
            <PartnerGridStartups partners={startupPartners} />
            <div className="mt-10 flex items-center justify-between pt-8 border-t border-charcoal/8">
              <p className="text-charcoal/55 text-sm">Interested in partnering with AIR Lab?</p>
              <Link href="/contact" className="btn-primary">Get in Touch →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: update About page — two-tier partners section (institutional + startups), atm-label style"
```

---

## Task 15: New RCP Page

**Files:**
- Create: `app/rcp/page.tsx`

- [ ] **Step 1: Create RCP page**

Create `app/rcp/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { rcpQuery } from '@/sanity/queries'
import RcpTimeline from '@/components/RcpTimeline'
import BlueprintGrid from '@/components/BlueprintGrid'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export const metadata: Metadata = {
  title: 'RCP — Regional Collaboration Platform',
  description: 'An open, cloud-based sandbox for ATM experimentation and rapid prototyping across South East Asia.',
}

export default async function RcpPage() {
  const rcp = await client.fetch(rcpQuery)

  return (
    <>
      {/* ① HERO with background video */}
      <section className="relative min-h-[60vh] flex items-center bg-hero-bg pt-16 overflow-hidden">
        {rcp?.heroVideoUrl && (
          <video src={rcp.heroVideoUrl} autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <BlueprintGrid opacity={8} />
        <div className="absolute inset-0 bg-charcoal" style={{ opacity: 0.70 }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 py-16">
          <p className="atm-label text-teal mb-4">AIR LAB · FEATURED INITIATIVE · SEA</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Regional Collaboration<br />
            Platform <span className="text-teal">(RCP)</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
            An open, cloud-based sandbox for experimentation and rapid prototyping across South East Asia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://rcp-landing-page.rcp.pub.airlab.thalesdigital.io/" target="_blank" rel="noopener noreferrer"
              className="btn-primary-dark text-base px-8 py-4 flex items-center gap-2">
              <span>▶</span> Access the RCP Platform
            </a>
            <a href="#overview" className="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-charcoal">
              Learn More ↓
            </a>
          </div>
          <p className="atm-label text-white/25 mt-3 text-[10px]">rcp.pub.airlab.thalesdigital.io</p>
        </div>
      </section>

      {/* ② OVERVIEW */}
      <section id="overview" className="section-light">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <p className="atm-label text-teal mb-4">OVERVIEW</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-6">What is the RCP?</h2>
            <blockquote className="border-l-2 border-teal pl-5 mb-6 text-charcoal/70 italic leading-relaxed">
              "Through the Regional Collaboration Platform, we foster shared understanding, accelerate iteration, and co-develop a common way forward."
            </blockquote>
            <p className="text-charcoal/65 leading-relaxed">
              The Regional Collaboration Platform (RCP) is an open, cloud-based sandbox designed for experimentation and rapid prototyping. Freely accessible to regional partners, it comes equipped with built-in tools and representative data to support realistic testing. Most importantly, RCP enables collaborative exploration of regional ATM concepts in a risk-free environment, helping stakeholders shape the future of air traffic management together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {[
                { title: 'Multi-stakeholder', desc: 'Governments, ANSPs, airlines & startups' },
                { title: 'Open & Cloud-based', desc: 'Freely accessible sandbox with representative data' },
                { title: 'Risk-free Testing', desc: 'Safe environment for ATM concept exploration' },
              ].map((a) => (
                <div key={a.title} className="bg-white rounded-xl p-5 border border-charcoal/5 text-center">
                  <div className="w-6 h-0.5 bg-teal mx-auto mb-3" />
                  <h3 className="font-display font-bold text-charcoal text-sm mb-2">{a.title}</h3>
                  <p className="text-charcoal/55 text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ③ EXPLAINER VIDEO */}
      {rcp?.explainerVideoUrl && (
        <section className="section-dark">
          <div className="container-inner max-w-4xl">
            <p className="atm-label text-teal mb-3">EXPLAINER</p>
            <h2 className="text-3xl font-display font-bold text-white mb-8">See RCP in action</h2>
            <div className="relative aspect-video bg-hero-bg rounded-xl overflow-hidden">
              <iframe
                src={rcp.explainerVideoUrl}
                title="RCP Explainer Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ④ TIMELINE */}
      {rcp?.timelineItems?.length > 0 && (
        <section className="section-light">
          <div className="container-inner max-w-3xl">
            <p className="atm-label text-teal mb-3">MILESTONES</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-10">RCP Development Journey</h2>
            <RcpTimeline items={rcp.timelineItems} />
          </div>
        </section>
      )}

      {/* ⑤ FF-ICE USE CASE */}
      <section className="section-white border-t border-charcoal/5">
        <div className="container-inner">
          <p className="atm-label text-teal mb-2">USE CASE · 2025</p>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-2">Regional FF-ICE</h2>
          <p className="font-mono text-xs text-charcoal/40 mb-6">Flight and Flow Information for a Collaborative Environment</p>
          <p className="text-charcoal/65 leading-relaxed max-w-3xl mb-12">
            FF-ICE aims to enhance flight planning and ATM through improved data sharing and automation — enabling real-time, standardised information exchange between airlines (eAUs), ANSPs (eASPs), and other stakeholders. FF-ICE Release 1 encompasses six critical services for collaborative flight planning.
          </p>

          {/* Alternating text + image pairs */}
          {[
            {
              title: 'Early Trajectory Negotiation for Smoother Traffic',
              desc: 'Anticipate and ease predicted traffic by negotiating the trajectory early before departure.',
            },
            {
              title: 'Pre-Departure 4D Trajectory Agreement',
              desc: 'Common agreement on the 4D trajectory before departure between the airline and eASPs.',
              flip: true,
            },
            {
              title: 'Reduce Workload & Enhance Safety',
              desc: 'Reduce ATC workload and improve safety by minimising changes after take-off.',
            },
          ].map((item, i) => {
            const image = rcp?.useCaseImages?.find((img: { order: number }) => img.order === i + 1)
            const imgUrl = image ? builder.image(image.image as SanityImageSource).width(700).height(500).url() : null

            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${item.flip ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="w-8 h-0.5 bg-teal mb-4" />
                  <h3 className="font-display font-bold text-charcoal text-xl mb-3">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
                </div>
                <div className="bg-tint rounded-xl overflow-hidden aspect-[4/3]">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={image.altText} width={700} height={500} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="atm-label text-charcoal/30 text-[10px]">SCREENSHOT — upload in Sanity Studio</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Full-width dashboard image */}
          {rcp?.useCaseImages?.find((img: { order: number }) => img.order === 4) ? (
            <div className="rounded-xl overflow-hidden aspect-[16/7] bg-hero-bg relative">
              <Image
                src={builder.image((rcp.useCaseImages.find((img: { order: number }) => img.order === 4).image) as SanityImageSource).width(1400).height(613).url()}
                alt="RCP Platform Dashboard"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl bg-hero-bg aspect-[16/7] flex items-center justify-center">
              <p className="atm-label text-teal/40 text-[10px]">DASHBOARD SCREENSHOT — upload as image order 4 in Sanity Studio</p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between p-4 bg-tint rounded-xl">
            <p className="font-display font-bold text-charcoal text-sm">Explore the full FF-ICE initiative</p>
            <Link href="/our-work/ff-ice" className="text-teal font-ui text-sm font-bold hover:text-teal-dark transition-colors">View →</Link>
          </div>
        </div>
      </section>

      {/* ⑥ GET INVOLVED */}
      <section className="section-dark">
        <div className="container-inner max-w-3xl">
          <p className="atm-label text-teal mb-3">PARTICIPATION</p>
          <h2 className="text-3xl font-display font-bold text-white mb-8">How to get involved</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                n: '01',
                title: 'Join as a Member Organisation',
                desc: 'Civil aviation authorities, ANSPs and airlines can join as full members to access shared data and participate in joint working groups.',
              },
              {
                n: '02',
                title: 'Partner as a Technology Provider',
                desc: 'Technology companies and startups can integrate with the platform and contribute tools, datasets, or capabilities.',
              },
            ].map((step) => (
              <div key={step.n} className="bg-surface rounded-xl p-5 flex gap-4">
                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center">
                  <span className="font-mono text-xs text-teal font-bold">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
            {/* Step 03 — contact CTA */}
            <div className="bg-teal/8 border border-teal/20 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center">
                  <span className="font-mono text-xs text-teal font-bold">03</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm">Want to know more?</h3>
              </div>
              <Link href="/contact" className="btn-primary-dark flex-shrink-0">Contact us →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ RESOURCES */}
      {rcp?.resources?.length > 0 && (
        <section className="section-white border-t border-charcoal/5">
          <div className="container-inner max-w-3xl">
            <p className="atm-label text-teal mb-3">RESOURCES</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Documentation & Links</h2>
            <div className="flex flex-col gap-3">
              {(rcp.resources as { label: string; url: string; type: string }[]).map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-body-bg rounded-xl hover:bg-tint transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rotate-45 border border-teal flex-shrink-0" />
                    <div>
                      <p className="font-ui font-semibold text-charcoal text-sm">{r.label}</p>
                      <p className="atm-label text-charcoal/40 text-[10px] mt-0.5">{r.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className="text-teal font-ui text-sm font-bold group-hover:text-teal-dark transition-colors">
                    {r.type === 'pdf' ? 'Download →' : 'Open →'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/rcp/page.tsx
git commit -m "feat: add RCP page — hero video, overview, explainer video, timeline, FF-ICE use case, get involved, resources"
```

---

## Task 16: Apply Design System to Remaining Pages

**Files:**
- Modify: `app/our-work/page.tsx`
- Modify: `app/our-work/[slug]/page.tsx`
- Modify: `app/news/page.tsx`
- Modify: `app/news/[slug]/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace Our Work listing page**

Replace full contents of `app/our-work/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { allInitiativesQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import InitiativeCard from '@/components/InitiativeCard'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore AIR Lab Singapore\'s research initiatives and projects in Air Traffic Management.',
}

export default async function OurWorkPage() {
  const initiatives = await client.fetch(allInitiativesQuery)

  const active = initiatives.filter((i: { status: string }) => i.status === 'Active')
  const upcoming = initiatives.filter((i: { status: string }) => i.status === 'Upcoming')
  const completed = initiatives.filter((i: { status: string }) => i.status === 'Completed')

  return (
    <>
      <HeroDark
        title="Our Work"
        subtitle="Discover the initiatives and research projects driving innovation in Air Traffic Management at AIR Lab Singapore."
        showBlueprint
      />

      {/* ACTIVE */}
      {active.length > 0 && (
        <section className="section-dark">
          <div className="container-inner">
            <p className="atm-label text-teal mb-8">Active Initiatives</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((i: Parameters<typeof InitiativeCard>[0] & { _id: string }) => (
                <InitiativeCard key={i._id} {...i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <p className="atm-label text-teal-dark mb-8">Upcoming</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((i: Parameters<typeof InitiativeCard>[0] & { _id: string }) => (
                <InitiativeCard key={i._id} {...i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPLETED */}
      {completed.length > 0 && (
        <section className={upcoming.length > 0 ? 'section-white border-t border-charcoal/5' : 'section-light'}>
          <div className="container-inner">
            <p className="atm-label text-charcoal/40 mb-8">Completed</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((i: Parameters<typeof InitiativeCard>[0] & { _id: string }) => (
                <InitiativeCard key={i._id} {...i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {initiatives.length === 0 && (
        <section className="section-light">
          <div className="container-inner text-center py-20">
            <p className="text-charcoal/40 font-ui">No initiatives found. Add them in Sanity Studio at /studio.</p>
          </div>
        </section>
      )}
    </>
  )
}
```

- [ ] **Step 2: Replace initiative detail page**

Replace full contents of `app/our-work/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { initiativeBySlugQuery, allInitiativesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import PortableTextContent from '@/components/PortableTextContent'

interface Params { slug: string }

export async function generateStaticParams() {
  const initiatives = await client.fetch(allInitiativesQuery)
  return initiatives.map((i: { slug: string }) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const initiative = await client.fetch(initiativeBySlugQuery, { slug })
  if (!initiative) return {}
  return { title: initiative.title, description: initiative.shortDescription }
}

const statusColors: Record<string, string> = {
  Active: 'bg-teal/20 text-teal border border-teal/30',
  Completed: 'bg-white/10 text-white/70 border border-white/20',
  Upcoming: 'bg-teal-dark/20 text-teal border border-teal-dark/30',
}

export default async function InitiativePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const initiative = await client.fetch(initiativeBySlugQuery, { slug })
  if (!initiative) notFound()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end bg-charcoal pt-16">
        <Image
          src={urlFor(initiative.coverImage).width(2000).height(1000).url()}
          alt={initiative.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 pb-12">
          <span className={`tag font-ui mb-4 inline-block ${statusColors[initiative.status] ?? 'bg-white/10 text-white'}`}>
            {initiative.status}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-3xl">
            {initiative.title}
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl leading-relaxed">{initiative.shortDescription}</p>
        </div>
      </section>

      {/* BODY */}
      <section className="section-light">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <PortableTextContent value={initiative.body} />

            {initiative.partnerOrganizations && (
              <div className="mt-10 pt-8 border-t border-charcoal/10">
                <p className="atm-label text-teal mb-3">Partner Organizations</p>
                <p className="text-charcoal/70">{initiative.partnerOrganizations}</p>
              </div>
            )}

            {initiative.publicationsAndLinks && initiative.publicationsAndLinks.length > 0 && (
              <div className="mt-8 pt-8 border-t border-charcoal/10">
                <p className="atm-label text-teal mb-4">Publications & Links</p>
                <PortableTextContent value={initiative.publicationsAndLinks} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Replace news listing page**

Replace full contents of `app/news/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { allNewsQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Stay up to date with the latest news, insights, and events from AIR Lab Singapore.',
}

export default async function NewsPage() {
  const posts = await client.fetch(allNewsQuery)

  return (
    <>
      <HeroDark
        title="News & Insights"
        subtitle="The latest from AIR Lab — research updates, events, and perspectives on the future of Air Traffic Management."
        showBlueprint
      />

      <section className="section-light">
        <div className="container-inner">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Parameters<typeof NewsCard>[0] & { _id: string }) => (
                <NewsCard key={post._id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-charcoal/40 font-ui">No posts yet. Add them in Sanity Studio at /studio.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Replace news article page**

Replace full contents of `app/news/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { newsBySlugQuery, allNewsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import PortableTextContent from '@/components/PortableTextContent'

interface Params { slug: string }

export async function generateStaticParams() {
  const posts = await client.fetch(allNewsQuery)
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(newsBySlugQuery, { slug })
  if (!post) return {}
  return { title: post.title }
}

export default async function NewsPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await client.fetch(newsBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end bg-charcoal pt-16">
        <Image
          src={urlFor(post.mainImage).width(2000).height(900).url()}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag bg-teal/20 text-teal border border-teal/30 font-ui">{post.category}</span>
            <span className="atm-label text-white/50">
              {new Date(post.publishedAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {post.author && <span className="atm-label text-white/50">by {post.author}</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* BODY */}
      <section className="section-light">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <PortableTextContent value={post.body} />
            <div className="mt-12 pt-8 border-t border-charcoal/10">
              <Link href="/news" className="text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                ← Back to News & Insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Replace contact page**

Replace full contents of `app/contact/page.tsx`:

```tsx
import type { Metadata } from 'next'
import HeroDark from '@/components/HeroDark'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with AIR Lab Singapore.',
}

export default function ContactPage() {
  return (
    <>
      <HeroDark
        title="Get in Touch"
        subtitle="We'd love to hear from you — whether you're interested in collaboration, partnership, or simply want to learn more about our work."
        showBlueprint
      />

      <section className="section-light">
        <div className="container-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact info */}
            <div>
              <p className="atm-label text-teal mb-6">Contact</p>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-6">
                Let&apos;s start a conversation
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-10">
                AIR Lab Singapore brings together aviation experts, researchers, and technologists to advance the future of Air Traffic Management. We welcome enquiries from industry partners, academic institutions, and aviation authorities.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="atm-label text-charcoal/40 mb-1">Location</p>
                  {/* UPDATE THIS — Replace with AIR Lab's actual address */}
                  <p className="text-charcoal/70 text-sm">
                    AIR Lab Singapore<br />
                    Singapore
                  </p>
                </div>
                <div>
                  <p className="atm-label text-charcoal/40 mb-1">Affiliation</p>
                  {/* UPDATE THIS — Replace with AIR Lab's actual organizational affiliations */}
                  <p className="text-charcoal/70 text-sm">
                    Civil Aviation Authority of Singapore (CAAS)
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add app/our-work/ app/news/ app/contact/
git commit -m "feat: apply new design system (atm-label, blueprint hero) to Our Work, News, Contact pages"
```

---

## Task 17: Route Cleanup

**Files:**
- Modify: `app/partners/page.tsx` → redirect
- Modify: `app/team/page.tsx` → redirect

- [ ] **Step 1: Replace /partners with redirect**

Replace full contents of `app/partners/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function PartnersPage() {
  redirect('/about#partners')
}
```

- [ ] **Step 2: Replace /team with redirect**

Replace full contents of `app/team/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function TeamPage() {
  redirect('/about')
}
```

- [ ] **Step 3: Delete old PartnerGrid component**

```bash
rm "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026/components/PartnerGrid.tsx"
```

Verify no remaining imports:

```bash
grep -r "from.*PartnerGrid'" "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026/app" "/Users/anna.celma.e/Documents/1. AIR Lab com/New website 2026/components"
```

Expected: no output.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/partners/page.tsx app/team/page.tsx
git rm components/PartnerGrid.tsx
git commit -m "feat: redirect /partners and /team to /about, remove old PartnerGrid component"
```

---

## Task 18: Content Migration (Sanity Studio)

This task is done manually in Sanity Studio at `/studio` — no code changes.

- [ ] **Step 1: Migrate existing partners**

For each partner in Sanity Studio (`/studio`): open the document, set `tier` to either `institutional` or `startup`, add `description` and `categoryTag` for startup partners. Delete or leave the now-removed `showOn` field (Sanity ignores unknown fields in the UI after schema update).

- [ ] **Step 2: Populate RCP singleton**

In Sanity Studio, open the new "RCP Page" singleton. Fill in:
- `heroVideoUrl` — paste URL of background video from current WordPress site
- `explainerVideoUrl` — paste YouTube/Vimeo embed URL
- Timeline items: enter all 4 phases with their content from the spec
- Use case images: upload the 4 FF-ICE screenshots/diagrams migrated from airlab.aero (3 alternating + 1 dashboard), set order 1–4
- Resources: add RCP Platform live link and demo environment link

- [ ] **Step 3: Verify pages render correctly**

```bash
npm run dev
```

Visit `/rcp`, `/about`, `/` and verify all sections display correctly with real content.

---

## Task 19: Final Build Verification

- [ ] **Step 1: Full production build**

```bash
npm run build
```

Expected: zero TypeScript errors, zero build failures.

- [ ] **Step 2: Check all routes resolve**

Start dev server and verify:
- `/` — homepage with 8 sections
- `/about` — two-tier partners visible
- `/rcp` — all 7 sections render
- `/our-work` — initiatives with status chips
- `/news` — news listing
- `/contact` — blueprint hero
- `/partners` → redirects to `/about#partners`
- `/team` → redirects to `/about`
- `/studio` — Sanity Studio loads, RCP document visible

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final build verification — AIR Lab website redesign complete"
```
