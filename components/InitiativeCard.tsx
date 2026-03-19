import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface InitiativeCardProps {
  title: string
  slug: string
  shortDescription: string
  status: string
  coverImage: object
}

const statusColors: Record<string, string> = {
  Active: 'bg-teal/20 text-teal',
  Completed: 'bg-white/20 text-white/70',
  Upcoming: 'bg-teal-dark/20 text-teal-dark',
}

export default function InitiativeCard({ title, slug, shortDescription, status, coverImage }: InitiativeCardProps) {
  return (
    <Link
      href={`/our-work/${slug}`}
      className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal/40 rounded-xl overflow-hidden transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={urlFor(coverImage).width(600).height(400).url()}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <span className={`absolute top-3 left-3 tag ${statusColors[status] ?? 'bg-white/10 text-white'}`}>
          {status}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-white group-hover:text-teal transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-2 text-white/65 text-sm leading-relaxed line-clamp-3">{shortDescription}</p>
        <span className="mt-4 inline-flex items-center text-teal text-sm font-ui font-medium gap-1 group-hover:gap-2 transition-all duration-200">
          Learn more <span>→</span>
        </span>
      </div>
    </Link>
  )
}
