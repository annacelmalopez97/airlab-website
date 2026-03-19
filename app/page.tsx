import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { activeInitiativesQuery, latestNewsQuery, homePartnersQuery } from '@/sanity/queries'
import InitiativeCard from '@/components/InitiativeCard'
import NewsCard from '@/components/NewsCard'
import PartnerGrid from '@/components/PartnerGrid'

const pillars = [
  {
    icon: '⚡',
    title: 'Innovation',
    description: 'Developing cutting-edge solutions to complex Air Traffic Management challenges through agile research and experimentation.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Building open partnerships across industry, academia, and government to accelerate progress in ATM.',
  },
  {
    icon: '✈️',
    title: 'ATM Excellence',
    description: 'Advancing operational efficiency, safety, and capacity in airspace management across the Asia-Pacific region.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'Driving sustainable aviation practices through data-driven insights and environmentally conscious ATM research.',
  },
]

export default async function HomePage() {
  const [initiatives, news, partners] = await Promise.all([
    client.fetch(activeInitiativesQuery),
    client.fetch(latestNewsQuery),
    client.fetch(homePartnersQuery),
  ])

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-charcoal pt-16">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&q=80"
          alt="Air traffic control aerial view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-teal mb-8" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
              Advancing the Future of Air Traffic Management
            </h1>
            <p className="mt-6 text-xl text-white/75 leading-relaxed max-w-2xl">
              AIR Lab Singapore develops innovative ATM solutions through open collaboration, agile methodologies, and a commitment to global aviation efficiency.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary text-base px-8 py-4">
                Learn More
              </Link>
              <Link href="/our-work" className="btn-outline text-base px-8 py-4 border-white/40 text-white hover:bg-white hover:text-charcoal">
                Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section-light">
        <div className="container-inner">
          <div className="text-center mb-14">
            <p className="font-ui text-xs font-medium uppercase tracking-widest text-teal mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">
              Shaping the future of aviation
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-charcoal/5">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-display font-bold text-charcoal text-lg mb-2">{p.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY INITIATIVES */}
      {initiatives.length > 0 && (
        <section className="section-dark">
          <div className="container-inner">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-ui text-xs font-medium uppercase tracking-widest text-teal mb-3">Our Work</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Key Initiatives</h2>
              </div>
              <Link href="/our-work" className="hidden md:block text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* LATEST NEWS */}
      {news.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-ui text-xs font-medium uppercase tracking-widest text-teal mb-3">Latest</p>
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
            <div className="mt-8 md:hidden text-center">
              <Link href="/news" className="text-teal font-ui text-sm font-medium">View all →</Link>
            </div>
          </div>
        </section>
      )}

      {/* PARTNERS */}
      {partners.length > 0 && (
        <section className="section-white border-t border-charcoal/5">
          <div className="container-inner">
            <p className="text-center font-ui text-xs font-medium uppercase tracking-widest text-charcoal/40 mb-10">
              Our Partners & Collaborators
            </p>
            <PartnerGrid partners={partners} />
          </div>
        </section>
      )}
    </>
  )
}
