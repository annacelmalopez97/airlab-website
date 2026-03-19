import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { newsBySlugQuery, allNewsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import PortableTextContent from '@/components/PortableTextContent'

interface Params { slug: string }

export async function generateStaticParams() {
  const posts = await client.fetch(allNewsQuery)
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(newsBySlugQuery, { slug })
  if (!post) return {}
  return { title: post.title }
}

export default async function NewsPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await client.fetch(newsBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end bg-charcoal pt-16">
        <Image
          src={urlFor(post.mainImage).width(2000).height(900).url()}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag bg-teal/20 text-teal border border-teal/30 font-ui">{post.category}</span>
            <span className="text-white/50 font-ui text-xs">
              {new Date(post.publishedAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {post.author && <span className="text-white/50 font-ui text-xs">by {post.author}</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* BODY */}
      <section className="section-light">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <PortableTextContent value={post.body} />
            <div className="mt-12 pt-8 border-t border-charcoal/10">
              <Link href="/news" className="text-teal hover:text-teal-dark font-ui text-sm font-medium transition-colors">
                ← Back to News & Insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
