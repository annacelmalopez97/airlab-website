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
