# AIR Lab Website Redesign — Design Spec
**Date:** 2026-03-19
**Status:** Draft

---

## 1. Overview

Modernize and rebuild the AIR Lab Singapore website (airlab.aero) to better reflect the organization's positioning as an innovative, forward-thinking ATM research lab. The new site replaces the existing WordPress/AWS setup with a self-managed Framer site requiring no coding or technical expertise to maintain.

---

## 2. Goals

- **Primary:** Establish credibility and awareness across multiple audiences (industry professionals, researchers, partners, funders)
- **Secondary:** Surface key initiatives, news, and contact pathways clearly
- Make content updates simple enough for a non-technical editor working independently (CMS panel only, no design access)
- Present a modern, aviation/innovation-aligned visual identity

---

## 3. Platform & Hosting

| Decision | Choice | Rationale |
|---|---|---|
| Platform | **Framer** | Best balance of design quality and self-build ease; AI-assisted page building; built-in CMS |
| Hosting | Framer CDN | Replaces AWS; managed SSL, DDoS protection, fast global delivery |
| Domain | airlab.aero (unchanged) | DNS update only in Gandi.net |
| CMS | Framer CMS (built-in) | Simple collections panel; no dashboard complexity |
| Editor access | Framer CMS panel only | Team members get CMS-only access, not canvas access |

**Cost:** Verify current plan pricing at framer.com/pricing before subscribing. Confirm which plan includes CMS collections and CMS-only Editor role access — this may require a plan above the basic Pro tier.

**No agency required.** The site is designed and maintained independently.

---

## 4. Roles & Access

| Role | Who | Framer Permission Level | Capabilities |
|---|---|---|---|
| Owner / Admin | AIR Lab (anna.celma.e) | Admin | Full access — design canvas, CMS, publishing, settings, billing |
| Content Editor | AIR Lab team | Editor (CMS only) | Add/edit CMS content, publish — no canvas access |

The Framer Editor role allows adding news posts, updating team members, editing initiative pages, and publishing — without touching any design or layout. This is sufficient for the stated goal of adding a news post in under 5 minutes.

---

## 5. Visual Design Direction

**Direction: Dark Hero + Light Body**

Inspired by leading aviation technology organizations (Airbus, SITA, Frequentis).

### Color Palette
| Role | Color | Hex |
|---|---|---|
| Primary accent | Teal | `#30C7B5` |
| Accent hover / darker teal | Dark teal | `#00AC97` |
| Hero / dark section backgrounds | Dark charcoal | `#14261C` |
| Body / light section backgrounds | Off-white | `#F3F6F3` |
| Body text (on light) | Dark charcoal | `#14261C` |
| Text on dark sections | White | `#FFFFFF` |
| CTA buttons | Teal `#30C7B5`, hover `#00AC97` | |
| Links | Teal `#30C7B5` | |

### Typography Hierarchy
| Element | Font | Weight | Size |
|---|---|---|---|
| H1 (hero headlines) | Red Hat Display | 700 | 48–64px |
| H2 (section titles) | Red Hat Display | 700 | 32–40px |
| H3 (card titles) | Red Hat Display | 700 | 20–24px |
| Body text | Red Hat Text | 400 | 16px |
| Navigation items | Poppins | 500 | 14px |
| Buttons & labels | Poppins | 500 | 14px |
| Captions & metadata | Poppins | 400 | 12px |

All three fonts are available on Google Fonts and are natively supported by Framer's font integration. No licensing cost.

### Logo & Favicon
- Use existing AIR Lab logo assets (SVG format preferred for logo; PNG fallback)
- Export a square version of the logo mark as favicon (32×32 and 180×180 PNG for Apple touch icon)
- Provide both a light version (for dark hero backgrounds) and a dark version (for light body sections)

### Imagery Style
- Full-width aerial photography, airspace/ATM visualizations, radar graphics
- High-contrast imagery on dark hero sections
- Source: Unsplash (aviation/technology category) or AIR Lab's own photography
- Avoid stock images that feel generic or corporate

### Framer Template Selection Criteria
Select a template from the **Tech / Innovation / Agency** category in Framer's template library with:
- Dark hero section on the homepage
- CMS blog/news support built in
- Card-based layout for services/projects
- Clean, minimal aesthetic with generous whitespace
- No heavy scroll animations that obscure content readability

Template is confirmed during Phase 1 Step 2. The criteria above are the selection guide.

---

## 6. Site Structure & Page Specs

### Home
| Section | Content | Type | Notes |
|---|---|---|---|
| Nav | Logo + page links + Contact CTA | Static | Sticky on scroll |
| Hero | Bold headline (e.g. "Advancing the Future of Air Traffic Management"), one-sentence positioning, CTA button ("Learn More" → About) | Static | Dark charcoal background |
| What We Do | 3–4 pillars: Innovation, Collaboration, ATM Focus, Sustainability — each with icon + title + 1-sentence description | Static | |
| Key Initiatives | Cards linking to initiative subpages | CMS (Initiatives) | Show all active initiatives |
| Latest News | 3 most recent posts by publication date (auto-populated, no manual curation) | CMS (News) | |
| Partners | Logo grid | CMS (Partners, filtered: Show On = Home or Both) | |
| Footer | Navigation links, social icons (LinkedIn, Twitter/X), copyright | Static | |

### About
| Section | Content | Type |
|---|---|---|
| Hero | Dark hero with "About AIR Lab" title + tagline | Static |
| Mission & Vision | Two short statements side by side | Static |
| Our Story | 2–3 paragraphs of organizational history | Static |
| Team | Photo grid — name, title, bio on hover, LinkedIn link | CMS (Team) — flat list, ordered by Display Order field, no grouping |
| Partners & Collaborators | Logo grid with org name | CMS (Partners, filtered: Show On = About or Both) |

### Our Work
| Section | Content | Type |
|---|---|---|
| Hero | Dark hero with "Our Work" title + intro sentence | Static |
| Initiatives overview | Card grid — all active initiatives | CMS (Initiatives) |
| Individual initiative subpages | Full page per initiative (see CMS fields) | CMS detail page |

**Initiatives in scope:**
- Regional Collaboration Platform (RCP)
- FF-ICE
- OPEN ATM

### News & Insights
| Section | Content | Type |
|---|---|---|
| Hero | Dark hero with "News & Insights" title | Static |
| Article listing | Grid — title, date, category, featured image, excerpt | CMS (News) — most recent first |
| Individual post pages | Full article with body, author, date, category | CMS detail page |

### Contact
| Section | Content | Type |
|---|---|---|
| Hero | Dark hero with "Get in Touch" title | Static |
| Contact form | Fields: Name (required), Organization (optional), Email (required), Message (required); Submit button; on submit: show confirmation message "Thank you — we'll be in touch soon." | Framer native form |
| Form recipient | anna.celma.e@thalesdigital.io (temporary — update when permanent address confirmed) | |
| Location / affiliation | AIR Lab Singapore address and organizational affiliations | Static |

### 404 Page
Custom 404 with: AIR Lab branding, short message ("This page doesn't exist."), link back to Home. Dark hero style consistent with rest of site.

---

## 7. CMS Collections

### News Posts
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | |
| Slug | Text | Yes | Auto-generated from title |
| Publication Date | Date | Yes | |
| Category | Option | Yes | Values: News, Insight, Event |
| Featured Image | Image | Yes | |
| Excerpt | Text | Yes | Max 160 characters |
| Body | Rich text | Yes | |
| Author | Text | No | |
| External Link | URL | No | If populated: post card links to this URL (opens in new tab) instead of internal post page. Use for external press coverage or event registration links. |

### Team Members
| Field | Type | Required | Notes |
|---|---|---|---|
| Name | Text | Yes | |
| Title / Role | Text | Yes | |
| Photo | Image | Yes | |
| Bio | Text | No | Shown on hover |
| LinkedIn URL | URL | No | |
| Display Order | Number | Yes | Lower number = appears first |

### Initiatives
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | |
| Slug | Text | Yes | Auto-generated |
| Short Description | Text | Yes | Max 160 characters — used on cards |
| Status | Option | Yes | Values: Active, Completed, Upcoming |
| Cover Image | Image | Yes | |
| Body Content | Rich text | Yes | Full initiative description |
| Partner Organizations | Text | No | Comma-separated list of partner org names |
| Publications & Links | Rich text | No | Links to papers, reports, external resources |
| Display Order | Number | Yes | Lower number = appears first |

### Partners
| Field | Type | Required | Notes |
|---|---|---|---|
| Organization Name | Text | Yes | |
| Logo | Image | Yes | |
| Website URL | URL | No | Logo links to this URL |
| Show On | Option | Yes | Values: Home, About, Both |
| Display Order | Number | Yes | Lower number = appears first |

---

## 8. Migration Plan

### Phase 1 — Build (estimated 2–4 weeks self-paced)
1. Create Framer account, subscribe to Pro plan
2. Browse template library (Tech / Innovation / Agency category) — select template per criteria in Section 5
3. Customize brand: apply color palette, load Google Fonts (Red Hat Display, Red Hat Text, Poppins), upload AIR Lab logo (SVG light + dark versions), set favicon
4. Build all static page sections per Section 6
5. Set up CMS collections per Section 7 schemas
6. **Content inventory:** Review current airlab.aero and list all pages, posts, team members, initiatives, and partners to be migrated
7. Populate CMS with migrated content (text and images from current WordPress site)
8. Configure contact form: recipient email anna.celma.e@thalesdigital.io, fields per Section 6, confirmation message
9. Build custom 404 page

### Phase 2 — QA (1 week)
10. Review all pages on desktop, tablet, and mobile (Chrome, Safari, Firefox; iOS and Android)
11. Check all internal links and CTA buttons
12. Test CMS editor flow: log in as Editor role, add a news post end-to-end — target under 5 minutes
13. Test contact form: submit a test message, confirm receipt at anna.celma.e@thalesdigital.io
14. Review on Framer staging URL (auto-assigned, format: `yoursite.framer.app`) before cutover

### Phase 3 — DNS Cutover
15. In Framer: Settings → Custom Domain → add airlab.aero → note the DNS values provided (A record and/or CNAME)
16. **24 hours before cutover:** Reduce TTL for airlab.aero in Gandi.net DNS settings to 300 seconds
17. **Export WordPress backup:** Before any cutover, export full WordPress content (Posts, Pages, Media) via Tools → Export in WordPress admin. Save to local storage.
18. Update DNS records at Gandi.net to Framer's provided values
19. Keep WordPress/AWS live and accessible until propagation confirms globally (check via dnschecker.org — typically 15–60 minutes)
20. Once confirmed: cancel WordPress hosting and AWS services (**Owner: AIR Lab admin** — check AWS billing console to confirm no residual charges after cancellation)

**Rollback:** If issues arise post-cutover, revert DNS records in Gandi.net to previous values. WordPress/AWS remains available for at least 2 weeks post-cutover as fallback.

**Acceptable downtime:** Under 60 minutes of degraded access during propagation is expected and acceptable.

---

## 9. Out of Scope

- Multilingual support
- E-commerce or payment flows
- Member login / gated content
- Custom code or API integrations
- Ongoing agency involvement

---

## 10. Success Criteria

- Non-technical team member can add a news post via Framer CMS panel in under 5 minutes
- Site renders correctly on mobile (iOS/Android) and desktop (Chrome, Safari, Firefox)
- Visual design communicates innovation and aviation technology positioning
- Contact form submissions arrive at anna.celma.e@thalesdigital.io
- DNS cutover completes with under 60 minutes of degraded access
- WordPress content export saved locally before decommission
- No WordPress or AWS dependency remains 2 weeks after launch (confirmed by admin in AWS billing console)
- All pages and initiatives from the current site have equivalent content on the new site
