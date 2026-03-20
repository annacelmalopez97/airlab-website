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
