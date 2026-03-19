import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface Partner {
  _id: string
  name: string
  logo: object
  websiteUrl?: string
}

export default function PartnerGrid({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      {partners.map((p) => {
        const img = (
          <div className="relative h-10 w-32 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
            <Image
              src={urlFor(p.logo).height(80).url()}
              alt={p.name}
              fill
              className="object-contain"
            />
          </div>
        )

        return p.websiteUrl ? (
          <a key={p._id} href={p.websiteUrl} target="_blank" rel="noopener noreferrer" title={p.name}>
            {img}
          </a>
        ) : (
          <div key={p._id} title={p.name}>{img}</div>
        )
      })}
    </div>
  )
}
