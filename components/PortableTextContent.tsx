import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-display font-bold text-charcoal mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-charcoal/80 leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-teal pl-5 italic text-charcoal/70 my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-bold text-charcoal">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-dark underline underline-offset-2 transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-5 text-charcoal/80">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-charcoal/80">{children}</ol>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ''}
          width={1200}
          height={675}
          className="w-full h-auto"
        />
      </div>
    ),
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableTextContent({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />
}
