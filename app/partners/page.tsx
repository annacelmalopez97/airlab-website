import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { aboutPartnersQuery, homePartnersQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import { urlFor } from '@/sanity/image'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Discover the collaborative power driving innovation at AIR Lab through our partners — from industry leaders to pioneering research institutions.',
}

interface Partner {
  _id: string
  name: string
  logo: object
  websiteUrl?: string
}

export default async function PartnersPage() {
  const [homePartners, aboutPartners] = await Promise.all([
    client.fetch(homePartnersQuery),
    client.fetch(aboutPartnersQuery),
  ])

  // Merge and deduplicate all partners
  const allPartners: Partner[] = [...homePartners, ...aboutPartners].reduce(
    (acc: Partner[], partner: Partner) => {
      if (!acc.find((p) => p._id === partner._id)) acc.push(partner)
      return acc
    },
    []
  )

  return (
    <>
      <HeroDark
        title="Our Partners"
        subtitle="From industry leaders in air traffic management to pioneering research institutions — our partners play a crucial role in shaping the future of sustainable aviation."
        backgroundImageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=2000&q=80"
      />

      <section className="section-light">
        <div className="container-inner">
          {allPartners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {allPartners.map((partner) => {
                const card = (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-charcoal/5 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow duration-300 aspect-square">
                    <div className="relative w-full h-16">
                      <Image
                        src={urlFor(partner.logo).height(120).url()}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-charcoal/60 text-xs font-ui text-center">{partner.name}</p>
                  </div>
                )

                return partner.websiteUrl ? (
                  <a key={partner._id} href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                ) : (
                  <div key={partner._id}>{card}</div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-charcoal/40 font-ui">No partners yet. Add them in Sanity Studio at /studio.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
