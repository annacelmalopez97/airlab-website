# AIR Lab Website Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch a modern, self-managed Framer website for AIR Lab Singapore at airlab.aero, replacing the existing WordPress/AWS setup.

**Architecture:** Framer-hosted site with built-in CMS. Static sections handle layout and brand; CMS collections (News, Team, Initiatives, Partners) handle all updatable content. No custom code required. Content editors access only the CMS panel.

**Tech Stack:** Framer (Pro or CMS plan), Google Fonts (Red Hat Display, Red Hat Text, Poppins), Framer native contact form, Gandi.net DNS.

**Spec:** `docs/superpowers/specs/2026-03-19-airlab-website-redesign-design.md`

---

## Important Notes for This Plan

This is a **no-code build in Framer**. Steps are performed in the Framer visual editor and CMS panel — not in a code editor. "Verification" steps are visual and functional checks, not automated tests. "Commits" are Framer publish actions or explicit save checkpoints.

Work proceeds in 8 tasks:
1. Account & Template Setup
2. Brand Customization
3. CMS Collections Setup
4. Build Static Pages
5. Populate CMS Content
6. Configure Contact Form & 404
7. QA
8. DNS Cutover & Launch

---

## Task 1: Account & Template Setup

**What this produces:** A Framer project with a suitable template, linked to airlab.aero as the target domain (not yet live).

- [ ] **Step 1: Create Framer account**
  Go to framer.com → Sign Up → use anna.celma.e@thalesdigital.io

- [ ] **Step 2: Verify plan tier**
  Go to framer.com/pricing. Confirm which plan includes:
  - CMS Collections
  - Editor (CMS-only) collaborator role
  Subscribe to that plan.

- [ ] **Step 3: Select a template**
  In Framer dashboard → Templates → filter by **Tech**, **Agency**, or **Innovation**.
  Select a template that has ALL of:
  - Dark hero section on the homepage
  - Blog/CMS support built in
  - Card-based layout for services or projects
  - Clean, minimal aesthetic
  - No heavy scroll animations

  Do not start from blank — a template saves significant build time.

- [ ] **Step 4: Rename the project**
  In Framer dashboard, rename the project to: `AIR Lab — airlab.aero`

- [ ] **Step 5: Verify template loads correctly**
  Open the project in Framer editor. Confirm the canvas shows all template pages and that the preview (▶ button) renders without errors.

- [ ] **Step 6: Note the staging URL**
  In Framer editor → Settings (gear icon) → General. Note the `.framer.app` staging URL — you'll use this throughout QA. Example format: `airlabsomething.framer.app`

---

## Task 2: Brand Customization

**What this produces:** The site uses AIR Lab's exact color palette, typography, and logo throughout.

**Reference:** Spec Section 5 (Visual Design Direction).

- [ ] **Step 1: Set brand colors**
  In Framer editor → Assets panel → Colors → Edit or create:
  - `teal` → `#30C7B5`
  - `teal-dark` → `#00AC97`
  - `charcoal` → `#14261C`
  - `body-bg` → `#F3F6F3`
  - `white` → `#FFFFFF`

  Replace all template colors with these values across all pages.

- [ ] **Step 2: Set fonts**
  In Framer editor → Assets panel → Fonts → Add Google Font:
  - Red Hat Display
  - Red Hat Text
  - Poppins

  Apply font hierarchy across the site:
  - H1: Red Hat Display 700, 48–64px
  - H2: Red Hat Display 700, 32–40px
  - H3: Red Hat Display 700, 20–24px
  - Body: Red Hat Text 400, 16px
  - Nav / Buttons / Labels: Poppins 500, 14px
  - Captions / Metadata: Poppins 400, 12px

- [ ] **Step 3: Upload logo**
  Prepare logo files from existing AIR Lab brand assets:
  - Light version (white/teal on transparent) — for dark hero backgrounds
  - Dark version (dark on transparent) — for light body sections
  - Formats: SVG preferred; PNG fallback

  In Framer: Assets panel → Upload → add both logo variants.

- [ ] **Step 4: Upload favicon**
  Prepare from logo mark:
  - 32×32 PNG (browser tab favicon)
  - 180×180 PNG (Apple touch icon)

  In Framer: Settings → General → Favicon → upload 32×32 PNG.

- [ ] **Step 5: Apply logo to navigation**
  Replace the template's logo placeholder with the AIR Lab light logo SVG. Confirm it is visible on dark nav/hero backgrounds.

- [ ] **Step 6: Verify brand visually**
  Preview the site (▶). Check:
  - [ ] Teal accent appears on CTA buttons and links
  - [ ] Dark charcoal hero sections use `#14261C`
  - [ ] Body sections use `#F3F6F3` background
  - [ ] All headings use Red Hat Display
  - [ ] Logo is sharp and correctly sized in the nav

---

## Task 3: CMS Collections Setup

**What this produces:** Four CMS collections configured with the correct fields, ready to receive content.

**Reference:** Spec Section 7 (CMS Collections).

- [ ] **Step 1: Create News Posts collection**
  Framer editor → CMS → New Collection → name: `News Posts`

  Add fields:
  | Field name | Type | Required |
  |---|---|---|
  | Title | Text | Yes |
  | Publication Date | Date | Yes |
  | Category | Option (News, Insight, Event) | Yes |
  | Featured Image | Image | Yes |
  | Excerpt | Text | Yes |
  | Body | Rich Text | Yes |
  | Author | Text | No |
  | External Link | Link | No |

- [ ] **Step 2: Create Team Members collection**
  New Collection → name: `Team Members`

  Add fields:
  | Field name | Type | Required |
  |---|---|---|
  | Name | Text | Yes |
  | Title / Role | Text | Yes |
  | Photo | Image | Yes |
  | Bio | Text | No |
  | LinkedIn URL | Link | No |
  | Display Order | Number | Yes |

- [ ] **Step 3: Create Initiatives collection**
  New Collection → name: `Initiatives`

  Add fields:
  | Field name | Type | Required |
  |---|---|---|
  | Title | Text | Yes |
  | Short Description | Text | Yes |
  | Status | Option (Active, Completed, Upcoming) | Yes |
  | Cover Image | Image | Yes |
  | Body Content | Rich Text | Yes |
  | Partner Organizations | Text | No |
  | Publications & Links | Rich Text | No |
  | Display Order | Number | Yes |

- [ ] **Step 4: Create Partners collection**
  New Collection → name: `Partners`

  Add fields:
  | Field name | Type | Required |
  |---|---|---|
  | Organization Name | Text | Yes |
  | Logo | Image | Yes |
  | Website URL | Link | No |
  | Show On | Option (Home, About, Both) | Yes |
  | Display Order | Number | Yes |

- [ ] **Step 5: Verify collections**
  In CMS panel, open each collection and confirm all fields appear with correct types. Add one dummy entry to each collection to confirm the schema works before building page layouts that bind to them.

---

## Task 4: Build Static Pages

**What this produces:** All five pages (Home, About, Our Work, News & Insights, Contact) plus 404, with correct layout and sections. CMS-powered sections are wired to collections.

**Reference:** Spec Section 6 (Site Structure & Page Specs).

### 4a — Global Navigation & Footer

- [ ] **Step 1: Build navigation**
  Edit the global nav component:
  - Logo (light variant, links to Home)
  - Links: Home · About · Our Work · News & Insights · Contact
  - CTA button: "Contact" — teal `#30C7B5`, Poppins 500 14px
  - Sticky on scroll

- [ ] **Step 2: Build footer**
  Edit the global footer:
  - Navigation links (same as nav)
  - LinkedIn icon (link to AIR Lab LinkedIn — add URL when available)
  - Twitter/X icon (link to AIR Lab Twitter/X — add URL when available)
  - Copyright line: `© 2026 AIR Lab Singapore`

### 4b — Home Page

- [ ] **Step 3: Hero section**
  Dark charcoal (`#14261C`) background, full-width.
  - Headline: `Advancing the Future of Air Traffic Management` (Red Hat Display 700, white, 48–64px)
  - Sub-headline: one-sentence positioning statement (placeholder — to be replaced with final copy)
  - CTA button: "Learn More" → links to /about (teal)
  - Background: full-width aerial/ATM image from Unsplash (aviation category)

- [ ] **Step 4: What We Do section**
  Light background (`#F3F6F3`), 4 pillars in a row:
  - Innovation
  - Collaboration
  - ATM Focus
  - Sustainability

  Each pillar: icon (simple SVG or Framer icon) + title (H3) + 1-sentence description (body text). Placeholder descriptions — to be replaced with final copy.

- [ ] **Step 5: Key Initiatives section**
  Bind to `Initiatives` CMS collection. Filter: Status = Active. Show as cards (cap at 4 max to avoid clutter if initiatives list grows).
  Each card: Cover Image, Title, Short Description, link to initiative detail page.

- [ ] **Step 6: Latest News section**
  Bind to `News Posts` CMS collection. Sort by Publication Date descending. Show 3 items.
  Each item: Featured Image, Title, Date, Excerpt, link to post detail page.
  Logic: auto-populated by date — no manual curation needed.

- [ ] **Step 7: Partners section**
  Bind to `Partners` CMS collection. Filter: Show On = Home OR Both.
  Display as logo grid. Each logo links to partner Website URL. Sort by Display Order.

### 4c — About Page

- [ ] **Step 8: Hero section**
  Dark charcoal background. Title: `About AIR Lab` (H1, white). Tagline below (placeholder text).

- [ ] **Step 9: Mission & Vision section**
  Two columns side by side:
  - Left: Mission heading + 2–3 sentence statement (placeholder)
  - Right: Vision heading + 2–3 sentence statement (placeholder)

- [ ] **Step 10: Our Story section**
  Single column, 2–3 paragraphs of organizational history (placeholder — to be replaced with content from existing site).

- [ ] **Step 11: Team section**
  Bind to `Team Members` CMS collection. Sort by Display Order ascending. Flat grid (no grouping).
  Each card: Photo, Name, Title/Role. Bio shown on hover. LinkedIn icon links to LinkedIn URL if set.

- [ ] **Step 12: Partners section**
  Bind to `Partners` CMS collection. Filter: Show On = About OR Both.
  Same logo grid layout as Home.

### 4d — Our Work Page

- [ ] **Step 13: Hero section**
  Dark charcoal background. Title: `Our Work`. Intro sentence (placeholder).

- [ ] **Step 14: Initiatives overview**
  Bind to `Initiatives` CMS collection. Show all (active, upcoming, completed). Sort by Display Order.
  Card grid: Cover Image, Title, Short Description, Status badge, link to detail page.

- [ ] **Step 15: Initiative detail page template**
  Create a CMS detail page bound to `Initiatives` collection.
  Sections:
  - Dark hero: Cover Image as background, Title (H1, white), Status badge
  - Body Content (rich text, full width)
  - Partner Organizations: label + text list (leave visible; if field is empty in CMS it will render blank — Framer does not auto-hide empty fields)
  - Publications & Links: label + rich text block (same — leave visible; editors should leave these sections empty in the CMS if not applicable and the blank space will be minimal)

### 4e — News & Insights Page

- [ ] **Step 16: Hero section**
  Dark charcoal background. Title: `News & Insights`.

- [ ] **Step 17: Article listing**
  Bind to `News Posts` CMS collection. Sort by Publication Date descending. Show all posts.
  Grid layout: Featured Image, Title, Date, Category badge, Excerpt. Each card links to post detail page.
  If External Link is set on a post: card links to external URL (opens in new tab) instead of internal post page.

- [ ] **Step 18: Post detail page template**
  Create a CMS detail page bound to `News Posts` collection.
  Sections:
  - Dark hero: Title (H1, white), Category badge, Date, Author (if set)
  - Body (rich text, centered, max-width 720px for readability)

### 4f — Contact Page

- [ ] **Step 19: Hero section**
  Dark charcoal background. Title: `Get in Touch`.

- [ ] **Step 20: Location / affiliation section**
  Add AIR Lab Singapore address and organizational affiliations (placeholder — replace with actual info).

*(Contact form is built in Task 6.)*

### 4g — 404 Page

- [ ] **Step 21: Build 404 page**
  In Framer: Pages → Add → 404.
  Dark charcoal hero. Text: `This page doesn't exist.` Link back to Home (teal CTA button). AIR Lab logo visible.

---

## Task 5: Populate CMS Content

**What this produces:** All CMS collections filled with real AIR Lab content, ready for QA.

**Before starting:** Complete the content inventory. Open a spreadsheet and list all items to migrate from the current airlab.aero site:
- Pages and their text content
- News/blog posts (title, date, URL)
- Team members (name, role, photo)
- Initiative pages
- Partner logos

Save this spreadsheet locally before starting any migration steps.

- [ ] **Step 1: Add initiatives**
  In Framer CMS → Initiatives → add entries for:
  - Regional Collaboration Platform (RCP) — Status: Active
  - FF-ICE — Status: Active
  - OPEN ATM — Status: Active

  For each: fill Title, Short Description, Status, Cover Image, Body Content. Add Partner Organizations and Publications & Links if available. Set Display Order (1, 2, 3).

- [ ] **Step 2: Add team members**
  In Framer CMS → Team Members → add one entry per person.
  Fill: Name, Title/Role, Photo (upload headshot), Bio, LinkedIn URL, Display Order.

- [ ] **Step 3: Add partners**
  In Framer CMS → Partners → add one entry per partner organization.
  Fill: Name, Logo (upload), Website URL, Show On (Home/About/Both), Display Order.

- [ ] **Step 4: Add at least 3 news posts**
  In Framer CMS → News Posts → migrate the 3 most recent articles from the current WordPress site.
  Fill all required fields. Set correct Publication Dates. Upload featured images.
  (Remaining posts can be migrated after launch.)

- [ ] **Step 5: Replace all placeholder copy**
  Go through every static page section and replace placeholder text with final content:
  - Hero headlines and sub-headlines
  - What We Do pillar descriptions
  - Mission & Vision statements
  - Our Story paragraphs
  - Contact page location/affiliation info

  Source: existing airlab.aero content + AIR Lab internal documents.

- [ ] **Step 6: Verify CMS content displays correctly**
  Preview the site (▶). Check that:
  - [ ] Initiatives cards show on Home and Our Work pages
  - [ ] Latest News shows 3 most recent posts on Home
  - [ ] Team grid renders on About page
  - [ ] Partner logos appear on Home and About pages
  - [ ] Initiative detail pages render correctly (click through from cards)
  - [ ] News post detail pages render correctly (click through from listing)

---

## Task 6: Configure Contact Form & 404

**What this produces:** Working contact form that delivers submissions to anna.celma.e@thalesdigital.io, and a custom 404 page.

- [ ] **Step 1: Add contact form to Contact page**
  In Framer editor → Contact page → add a Form component.
  Fields (in order):
  1. Name — Text input, required, placeholder: `Your name`
  2. Organization — Text input, optional, placeholder: `Your organization`
  3. Email — Email input, required, placeholder: `your@email.com`
  4. Message — Textarea, required, placeholder: `How can we help?`
  5. Submit button: label `Send Message`, teal background `#30C7B5`, Poppins 500

- [ ] **Step 2: Set form recipient**
  In form settings → Email notifications → Recipient: `anna.celma.e@thalesdigital.io`

  ⚠️ Note: This is a temporary address. Update to a permanent AIR Lab email when available.

- [ ] **Step 3: Set confirmation message**
  In form settings → Success state → message: `Thank you — we'll be in touch soon.`
  Style: same font/color as body text, centered.

- [ ] **Step 4: Test the form**
  Submit a test message. Confirm:
  - [ ] Submission is accepted (confirmation message displays)
  - [ ] Email arrives at anna.celma.e@thalesdigital.io
  - [ ] Email content includes all form fields (name, org, email, message)

- [ ] **Step 5: Verify 404 page**
  In browser, navigate to `[staging-url]/this-page-does-not-exist`.
  Confirm the custom 404 page renders with AIR Lab branding and a Home link.

---

## Task 7: QA

**What this produces:** Confirmed site ready for launch — all pages render correctly across devices and browsers.

- [ ] **Step 1: Desktop review — Chrome**
  Open staging URL in Chrome. Visit every page:
  - [ ] Home
  - [ ] About
  - [ ] Our Work (overview + each initiative detail page)
  - [ ] News & Insights (listing + at least 2 post detail pages)
  - [ ] Contact
  - [ ] 404

  Check: layout, typography, colors, images, all links and CTAs.

- [ ] **Step 2: Desktop review — Safari**
  Repeat Step 1 in Safari. Note any rendering differences.

- [ ] **Step 3: Desktop review — Firefox**
  Repeat Step 1 in Firefox. Note any rendering differences.

- [ ] **Step 4: Mobile review — iOS (Safari)**
  Open staging URL on iPhone. Visit every page. Check:
  - [ ] Navigation collapses to mobile menu
  - [ ] Hero sections fill screen correctly
  - [ ] Cards stack vertically on small screen
  - [ ] Text is readable without zooming
  - [ ] Contact form fields are easy to tap

- [ ] **Step 5: Mobile review — Android (Chrome)**
  Repeat Step 4 on Android device.

- [ ] **Step 6: CMS editor test**
  Log in as an Editor-role account (not Admin). Confirm:
  - [ ] CMS panel is accessible
  - [ ] Can add a new News Post in under 5 minutes
  - [ ] Cannot access the design canvas
  - [ ] Published post appears on News & Insights page

- [ ] **Step 7: Fix all issues found**
  Address every layout, rendering, or functional issue identified in Steps 1–6 before proceeding.

---

## Task 8: DNS Cutover & Launch

**What this produces:** airlab.aero resolves to the new Framer site. WordPress/AWS is decommissioned.

- [ ] **Step 1: Export WordPress backup**
  Log in to current WordPress admin (airlab.aero/wp-admin).
  Go to Tools → Export → All content → Download Export File.
  Save the exported XML file to local storage. Also download all media from the WordPress Media Library.

  ⚠️ Do this BEFORE any DNS changes.

- [ ] **Step 2: Get Framer DNS values**
  In Framer editor → Settings → Custom Domain → enter `airlab.aero`.
  Framer will display the required DNS records (A record and/or CNAME). Note these values exactly.

- [ ] **Step 3: Reduce TTL at Gandi.net**
  Log in to Gandi.net → Domain → airlab.aero → DNS Records.
  Change the TTL (Time to Live) for existing A/CNAME records to `300` (5 minutes).

  ⚠️ Do this at least 24 hours before the DNS update in Step 5. This speeds up propagation when you make the final change.

- [ ] **Step 4: Wait 24 hours**
  Allow the reduced TTL to propagate globally before proceeding.

- [ ] **Step 5: Update DNS records at Gandi.net**
  In Gandi.net → DNS Records → update A record and/or CNAME to the values from Step 2.
  Keep WordPress/AWS live — do not touch it yet.

- [ ] **Step 6: Monitor propagation**
  Go to dnschecker.org → enter `airlab.aero` → check A Record.
  Wait until the majority of global locations show the new IP (Framer's).
  Typical time: 15–60 minutes.

- [ ] **Step 7: Verify live site**
  Once propagation confirms: open airlab.aero in a fresh browser (or incognito).
  Check:
  - [ ] New Framer site loads (not WordPress)
  - [ ] SSL padlock shows (HTTPS active)
  - [ ] Home, About, Our Work, News, Contact all load correctly
  - [ ] Contact form submits successfully

- [ ] **Step 8: Decommission WordPress/AWS**
  Only after Step 7 is confirmed:
  - Cancel WordPress hosting subscription
  - Log in to AWS console → confirm no active services remaining → cancel account or terminate all instances
  - Check AWS billing console confirms $0 charges going forward

  ⚠️ Keep WordPress accessible for at least 2 weeks post-launch as rollback option before cancelling.

- [ ] **Step 9: Update contact form recipient (when ready)**
  When a permanent AIR Lab email address is established, update the contact form recipient in Framer from `anna.celma.e@thalesdigital.io` to the permanent address.

---

## Launch Checklist Summary

Before considering the project complete:

- [ ] All pages live and rendering on airlab.aero
- [ ] SSL active (HTTPS)
- [ ] Contact form delivers to anna.celma.e@thalesdigital.io
- [ ] CMS editor can add a news post in under 5 minutes
- [ ] WordPress export saved locally
- [ ] AWS billing confirmed at $0
- [ ] No remaining WordPress/AWS dependency
- [ ] Contact form recipient updated to permanent AIR Lab email (when established)
