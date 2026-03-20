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
