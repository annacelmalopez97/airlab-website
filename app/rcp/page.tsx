import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { rcpQuery } from '@/sanity/queries'
import RcpTimeline from '@/components/RcpTimeline'
import BlueprintGrid from '@/components/BlueprintGrid'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export const metadata: Metadata = {
  title: 'RCP — Regional Collaboration Platform',
  description: 'An open, cloud-based sandbox for ATM experimentation and rapid prototyping across South East Asia.',
}

export default async function RcpPage() {
  const rcp = await client.fetch(rcpQuery)

  return (
    <>
      {/* ① HERO with background video */}
      <section className="relative min-h-[60vh] flex items-center bg-hero-bg pt-16 overflow-hidden">
        {rcp?.heroVideoUrl && (
          <video src={rcp.heroVideoUrl} autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <BlueprintGrid opacity={8} />
        <div className="absolute inset-0 bg-charcoal" style={{ opacity: 0.70 }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

        <div className="container-inner relative z-10 py-16">
          <p className="atm-label text-teal mb-4">AIR LAB · FEATURED INITIATIVE · SEA</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Regional Collaboration<br />
            Platform <span className="text-teal">(RCP)</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
            An open, cloud-based sandbox for experimentation and rapid prototyping across South East Asia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://rcp-landing-page.rcp.pub.airlab.thalesdigital.io/" target="_blank" rel="noopener noreferrer"
              className="btn-primary-dark text-base px-8 py-4 flex items-center gap-2">
              <span>▶</span> Access the RCP Platform
            </a>
            <a href="#overview" className="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-charcoal">
              Learn More ↓
            </a>
          </div>
          <p className="atm-label text-white/25 mt-3 text-[10px]">rcp.pub.airlab.thalesdigital.io</p>
        </div>
      </section>

      {/* ② OVERVIEW */}
      <section id="overview" className="section-light">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto">
            <p className="atm-label text-teal mb-4">OVERVIEW</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-6">What is the RCP?</h2>
            <blockquote className="border-l-2 border-teal pl-5 mb-6 text-charcoal/70 italic leading-relaxed">
              &ldquo;Through the Regional Collaboration Platform, we foster shared understanding, accelerate iteration, and co-develop a common way forward.&rdquo;
            </blockquote>
            <p className="text-charcoal/65 leading-relaxed">
              The Regional Collaboration Platform (RCP) is an open, cloud-based sandbox designed for experimentation and rapid prototyping. Freely accessible to regional partners, it comes equipped with built-in tools and representative data to support realistic testing. Most importantly, RCP enables collaborative exploration of regional ATM concepts in a risk-free environment, helping stakeholders shape the future of air traffic management together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {[
                { title: 'Multi-stakeholder', desc: 'Governments, ANSPs, airlines & startups' },
                { title: 'Open & Cloud-based', desc: 'Freely accessible sandbox with representative data' },
                { title: 'Risk-free Testing', desc: 'Safe environment for ATM concept exploration' },
              ].map((a) => (
                <div key={a.title} className="bg-white rounded-xl p-5 border border-charcoal/5 text-center">
                  <div className="w-6 h-0.5 bg-teal mx-auto mb-3" />
                  <h3 className="font-display font-bold text-charcoal text-sm mb-2">{a.title}</h3>
                  <p className="text-charcoal/55 text-xs leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ③ EXPLAINER VIDEO */}
      {rcp?.explainerVideoUrl && (
        <section className="section-dark">
          <div className="container-inner max-w-4xl">
            <p className="atm-label text-teal mb-3">EXPLAINER</p>
            <h2 className="text-3xl font-display font-bold text-white mb-8">See RCP in action</h2>
            <div className="relative aspect-video bg-hero-bg rounded-xl overflow-hidden">
              <iframe
                src={rcp.explainerVideoUrl}
                title="RCP Explainer Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ④ TIMELINE */}
      {rcp?.timelineItems?.length > 0 && (
        <section className="section-light">
          <div className="container-inner max-w-3xl">
            <p className="atm-label text-teal mb-3">MILESTONES</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-10">RCP Development Journey</h2>
            <RcpTimeline items={rcp.timelineItems} />
          </div>
        </section>
      )}

      {/* ⑤ FF-ICE USE CASE */}
      <section className="section-white border-t border-charcoal/5">
        <div className="container-inner">
          <p className="atm-label text-teal mb-2">USE CASE · 2025</p>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-2">Regional FF-ICE</h2>
          <p className="font-mono text-xs text-charcoal/40 mb-6">Flight and Flow Information for a Collaborative Environment</p>
          <p className="text-charcoal/65 leading-relaxed max-w-3xl mb-12">
            FF-ICE aims to enhance flight planning and ATM through improved data sharing and automation — enabling real-time, standardised information exchange between airlines (eAUs), ANSPs (eASPs), and other stakeholders. FF-ICE Release 1 encompasses six critical services for collaborative flight planning.
          </p>

          {[
            {
              title: 'Early Trajectory Negotiation for Smoother Traffic',
              desc: 'Anticipate and ease predicted traffic by negotiating the trajectory early before departure.',
            },
            {
              title: 'Pre-Departure 4D Trajectory Agreement',
              desc: 'Common agreement on the 4D trajectory before departure between the airline and eASPs.',
              flip: true,
            },
            {
              title: 'Reduce Workload & Enhance Safety',
              desc: 'Reduce ATC workload and improve safety by minimising changes after take-off.',
            },
          ].map((item, i) => {
            const image = rcp?.useCaseImages?.find((img: { order: number }) => img.order === i + 1)
            const imgUrl = image ? builder.image(image.image as SanityImageSource).width(700).height(500).url() : null

            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${item.flip ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="w-8 h-0.5 bg-teal mb-4" />
                  <h3 className="font-display font-bold text-charcoal text-xl mb-3">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
                </div>
                <div className="bg-tint rounded-xl overflow-hidden aspect-[4/3]">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={image.altText} width={700} height={500} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="atm-label text-charcoal/30 text-[10px]">SCREENSHOT — upload in Sanity Studio</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {rcp?.useCaseImages?.find((img: { order: number }) => img.order === 4) ? (
            <div className="rounded-xl overflow-hidden aspect-[16/7] bg-hero-bg relative">
              <Image
                src={builder.image((rcp.useCaseImages.find((img: { order: number }) => img.order === 4).image) as SanityImageSource).width(1400).height(613).url()}
                alt="RCP Platform Dashboard"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl bg-hero-bg aspect-[16/7] flex items-center justify-center">
              <p className="atm-label text-teal/40 text-[10px]">DASHBOARD SCREENSHOT — upload as image order 4 in Sanity Studio</p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between p-4 bg-tint rounded-xl">
            <p className="font-display font-bold text-charcoal text-sm">Explore the full FF-ICE initiative</p>
            <Link href="/our-work/ff-ice" className="text-teal font-ui text-sm font-bold hover:text-teal-dark transition-colors">View →</Link>
          </div>
        </div>
      </section>

      {/* ⑥ GET INVOLVED */}
      <section className="section-dark">
        <div className="container-inner max-w-3xl">
          <p className="atm-label text-teal mb-3">PARTICIPATION</p>
          <h2 className="text-3xl font-display font-bold text-white mb-8">How to get involved</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                n: '01',
                title: 'Join as a Member Organisation',
                desc: 'Civil aviation authorities, ANSPs and airlines can join as full members to access shared data and participate in joint working groups.',
              },
              {
                n: '02',
                title: 'Partner as a Technology Provider',
                desc: 'Technology companies and startups can integrate with the platform and contribute tools, datasets, or capabilities.',
              },
            ].map((step) => (
              <div key={step.n} className="bg-surface rounded-xl p-5 flex gap-4">
                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center">
                  <span className="font-mono text-xs text-teal font-bold">{step.n}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
            <div className="bg-teal/8 border border-teal/20 rounded-xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center">
                  <span className="font-mono text-xs text-teal font-bold">03</span>
                </div>
                <h3 className="font-display font-bold text-white text-sm">Want to know more?</h3>
              </div>
              <Link href="/contact" className="btn-primary-dark flex-shrink-0">Contact us →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ RESOURCES */}
      {rcp?.resources?.length > 0 && (
        <section className="section-white border-t border-charcoal/5">
          <div className="container-inner max-w-3xl">
            <p className="atm-label text-teal mb-3">RESOURCES</p>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Documentation & Links</h2>
            <div className="flex flex-col gap-3">
              {(rcp.resources as { label: string; url: string; type: string }[]).map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-body-bg rounded-xl hover:bg-tint transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rotate-45 border border-teal flex-shrink-0" />
                    <div>
                      <p className="font-ui font-semibold text-charcoal text-sm">{r.label}</p>
                      <p className="atm-label text-charcoal/40 text-[10px] mt-0.5">{r.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <span className="text-teal font-ui text-sm font-bold group-hover:text-teal-dark transition-colors">
                    {r.type === 'pdf' ? 'Download →' : 'Open →'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
