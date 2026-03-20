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
            <div className="mb-6">
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                AIR<span className="text-teal">Lab</span>
              </span>
            </div>

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
                const logoUrl = p.logo ? builder.image(p.logo).width(160).height(64).fit('max').url() : null
                if (!logoUrl) return (
                  <div key={p._id} className="opacity-50 px-3 py-2 text-charcoal/60 text-xs font-ui">{p.name}</div>
                )
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
            Join AIR Lab&apos;s growing network of ATM innovators and partners across South East Asia.
          </p>
          <Link href="/contact" className="btn-primary-dark px-10 py-4 text-base">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
