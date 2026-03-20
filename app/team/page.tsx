import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { teamQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import TeamCard from '@/components/TeamCard'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the innovative minds driving the future of air traffic management at AIR Lab Singapore.',
}

export default async function TeamPage() {
  const team = await client.fetch(teamQuery)

  return (
    <>
      <HeroDark
        title="Our Team"
        subtitle="Meet the seasoned industry professionals, visionary researchers, and engineers driving the future of Air Traffic Management at AIR Lab Singapore."
        backgroundImageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&q=80"
      />

      <section className="section-light">
        <div className="container-inner">
          {team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {team.map((member: Parameters<typeof TeamCard>[0] & { _id: string }) => (
                <TeamCard key={member._id} {...member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-charcoal/40 font-ui">No team members yet. Add them in Sanity Studio at /studio.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
