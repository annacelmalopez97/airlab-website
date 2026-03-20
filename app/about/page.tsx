import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { teamQuery, aboutInstitutionalPartnersQuery, aboutStartupPartnersQuery } from '@/sanity/queries'
import HeroDark from '@/components/HeroDark'
import TeamCard from '@/components/TeamCard'
import PartnerGridInstitutional from '@/components/PartnerGridInstitutional'
import PartnerGridStartups from '@/components/PartnerGridStartups'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about AIR Lab Singapore — our mission, vision, team, and partners.',
}

export default async function AboutPage() {
  const [team, institutionalPartners, startupPartners] = await Promise.all([
    client.fetch(teamQuery),
    client.fetch(aboutInstitutionalPartnersQuery),
    client.fetch(aboutStartupPartnersQuery),
  ])

  return (
    <>
      <HeroDark
        title="About AIR Lab"
        subtitle="A Singapore-based innovation lab dedicated to advancing Air Traffic Management through open research, agile collaboration, and global partnerships."
        backgroundImageUrl="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=2000&q=80"
        showBlueprint
      />

      {/* MISSION & VISION */}
      <section className="section-light">
        <div className="container-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-charcoal/5">
              <div className="w-8 h-0.5 bg-teal mb-5" />
              <h2 className="text-2xl font-display font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-charcoal/70 leading-relaxed">
                To accelerate global aviation efficiency and sustainability by developing innovative Air Traffic Management solutions through agile methodologies and open, multi-stakeholder collaboration.
              </p>
            </div>
            <div className="bg-charcoal rounded-xl p-8">
              <div className="w-8 h-0.5 bg-teal mb-5" />
              <h2 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70 leading-relaxed">
                A future where airspace is seamlessly managed, sustainably operated, and continuously improved through the power of open innovation and global collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-white border-t border-charcoal/5">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <p className="atm-label text-teal mb-4">OUR STORY</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Building the future of ATM together</h2>
            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                AIR Lab Singapore was established with a clear purpose: to bridge the gap between aviation research and operational reality in Air Traffic Management. Drawing on Singapore&apos;s unique position as a global aviation hub, we set out to create an open, collaborative environment where ideas can be tested, refined, and scaled.
              </p>
              <p>
                Since our founding, we have grown into a multi-disciplinary team of researchers, engineers, and aviation experts working alongside industry partners, regulators, and academic institutions. Our work spans from foundational research to real-world implementation — always guided by the principle that the best solutions emerge from open collaboration.
              </p>
              <p>
                Today, AIR Lab continues to push the boundaries of what is possible in ATM — developing initiatives like the Regional Collaboration Platform, FF-ICE implementation, and OPEN ATM that are shaping the future of airspace management across South East Asia and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {team.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="text-center mb-14">
              <p className="atm-label text-teal mb-3">THE TEAM</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">Meet our ATM experts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {team.map((member: Parameters<typeof TeamCard>[0] & { _id: string }) => (
                <TeamCard key={member._id} {...member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TIER 1 — INSTITUTIONAL PARTNERS */}
      {institutionalPartners.length > 0 && (
        <section id="partners" className="section-dark">
          <div className="container-inner">
            <div className="mb-10">
              <p className="atm-label text-teal mb-2">TIER 1</p>
              <h2 className="text-3xl font-display font-bold text-white">Institutional Partners</h2>
              <p className="text-white/50 mt-2 text-sm">Government, regulatory bodies & industry organisations</p>
            </div>
            <PartnerGridInstitutional partners={institutionalPartners} />
          </div>
        </section>
      )}

      {/* TIER 2 — STARTUP & INNOVATION PARTNERS */}
      {startupPartners.length > 0 && (
        <section className="section-light">
          <div className="container-inner">
            <div className="mb-10">
              <p className="atm-label text-teal mb-2">TIER 2</p>
              <h2 className="text-3xl font-display font-bold text-charcoal">Startup & Innovation Partners</h2>
              <p className="text-charcoal/50 mt-2 text-sm">Technology companies and startups we collaborate with</p>
            </div>
            <PartnerGridStartups partners={startupPartners} />
            <div className="mt-10 flex items-center justify-between pt-8 border-t border-charcoal/8">
              <p className="text-charcoal/55 text-sm">Interested in partnering with AIR Lab?</p>
              <Link href="/contact" className="btn-primary">Get in Touch →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
