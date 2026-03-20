import Image from 'next/image'
import { client } from '@/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

interface StartupPartner {
  _id: string
  name: string
  logo: SanityImageSource
  websiteUrl?: string
  description?: string
  categoryTag?: string
}

interface Props {
  partners: StartupPartner[]
}

export default function PartnerGridStartups({ partners }: Props) {
  if (!partners.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {partners.map((p) => {
        const logoUrl = p.logo ? builder.image(p.logo).width(120).height(120).fit('max').url() : null
        return (
          <div key={p._id} className="bg-white rounded-xl p-5 border border-charcoal/5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-tint rounded-lg flex items-center justify-center flex-shrink-0">
                {logoUrl ? (
                  <Image src={logoUrl} alt={p.name} width={36} height={36} className="object-contain" />
                ) : (
                  <span className="font-display font-bold text-teal text-xs">{p.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-charcoal text-sm">{p.name}</h4>
                {p.description && (
                  <p className="text-charcoal/55 text-xs leading-relaxed mt-1 line-clamp-2">{p.description}</p>
                )}
              </div>
            </div>
            {p.categoryTag && (
              <div className="self-start bg-tint rounded px-2 py-0.5">
                <span className="atm-label text-teal text-[9px]">{p.categoryTag}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
