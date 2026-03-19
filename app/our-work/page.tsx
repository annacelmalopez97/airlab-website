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
        backgroundImageUrl="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=2000&q=80"
      />

      {/* ACTIVE */}
      {active.length > 0 && (
        <section className="section-dark">
          <div className="container-inner">
            <p className="font-ui text-xs font-medium uppercase tracking-widest text-teal mb-8">Active Initiatives</p>
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
            <p className="font-ui text-xs font-medium uppercase tracking-widest text-teal-dark mb-8">Upcoming</p>
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
            <p className="font-ui text-xs font-medium uppercase tracking-widest text-charcoal/40 mb-8">Completed</p>
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
