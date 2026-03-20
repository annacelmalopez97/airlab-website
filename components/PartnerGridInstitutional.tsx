import Image from 'next/image'
import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

interface Partner {
  _id: string
  name: string
  logo: SanityImageSource
  websiteUrl?: string
}

interface Props {
  partners: Partner[]
}

export default function PartnerGridInstitutional({ partners }: Props) {
  if (!partners.length) return null

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {partners.map((p) => {
        const logoUrl = builder.image(p.logo).width(200).height(80).fit('max').url()
        const content = (
          <div className="bg-white/5 border border-white/8 rounded-lg p-4 h-16 flex items-center justify-center hover:border-teal/20 transition-colors">
            <Image
              src={logoUrl}
              alt={p.name}
              width={120}
              height={48}
              className="object-contain max-h-10 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        )
        return p.websiteUrl ? (
          <a key={p._id} href={p.websiteUrl} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <div key={p._id}>{content}</div>
        )
      })}
    </div>
  )
}
