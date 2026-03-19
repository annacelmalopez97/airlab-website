import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface NewsCardProps {
  title: string
  slug: string
  publishedAt: string
  category: string
  mainImage: object
  excerpt: string
  externalLink?: string
  dark?: boolean
}

const categoryColors: Record<string, string> = {
  News: 'bg-teal/15 text-teal',
  Insight: 'bg-teal-dark/15 text-teal-dark',
  Event: 'bg-white/15 text-white/70',
}

export default function NewsCard({ title, slug, publishedAt, category, mainImage, excerpt, externalLink, dark = false }: NewsCardProps) {
  const href = externalLink || `/news/${slug}`
  const isExternal = !!externalLink

  const cardBg = dark
    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-teal/40'
    : 'bg-white hover:bg-body-bg border-gray-100 hover:border-teal/30 shadow-sm hover:shadow-md'

  const titleColor = dark ? 'text-white group-hover:text-teal' : 'text-charcoal group-hover:text-teal'
  const textColor = dark ? 'text-white/60' : 'text-charcoal/60'
  const metaColor = dark ? 'text-white/40' : 'text-charcoal/40'

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group block border rounded-xl overflow-hidden transition-all duration-300 ${cardBg}`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={urlFor(mainImage).width(600).height(400).url()}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 tag ${categoryColors[category] ?? 'bg-white/10 text-white'} ${dark ? '' : 'shadow-sm'}`}>
          {category}
        </span>
        {isExternal && (
          <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-ui px-2 py-1 rounded">
            ↗ External
          </span>
        )}
      </div>
      <div className="p-5">
        <p className={`font-ui text-xs uppercase tracking-widest mb-2 ${metaColor}`}>
          {new Date(publishedAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className={`font-display font-bold text-base leading-snug transition-colors duration-200 ${titleColor}`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed line-clamp-3 ${textColor}`}>{excerpt}</p>
      </div>
    </Link>
  )
}
