import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { allNewsQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Stay up to date with the latest news, insights, and events from AIR Lab Singapore.',
}

export default async function NewsPage() {
  const posts = await client.fetch(allNewsQuery)

  return (
    <>
      <HeroDark
        title="News & Insights"
        subtitle="The latest from AIR Lab — research updates, events, and perspectives on the future of Air Traffic Management."
        backgroundImageUrl="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=2000&q=80"
      />

      <section className="section-light">
        <div className="container-inner">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Parameters<typeof NewsCard>[0] & { _id: string }) => (
                <NewsCard key={post._id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-charcoal/40 font-ui">No posts yet. Add them in Sanity Studio at /studio.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
