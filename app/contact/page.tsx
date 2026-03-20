import type { Metadata } from 'next'
import HeroDark from '@/components/HeroDark'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with AIR Lab Singapore.',
}

export default function ContactPage() {
  return (
    <>
      <HeroDark
        title="Get in Touch"
        subtitle="We'd love to hear from you — whether you're interested in collaboration, partnership, or simply want to learn more about our work."
        showBlueprint
      />

      <section className="section-light">
        <div className="container-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="atm-label text-teal mb-6">Contact</p>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-6">
                Let&apos;s start a conversation
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-10">
                AIR Lab Singapore brings together aviation experts, researchers, and technologists to advance the future of Air Traffic Management. We welcome enquiries from industry partners, academic institutions, and aviation authorities.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="atm-label text-charcoal/40 mb-1">Location</p>
                  <p className="text-charcoal/70 text-sm">
                    AIR Lab Singapore<br />
                    Singapore
                  </p>
                </div>
                <div>
                  <p className="atm-label text-charcoal/40 mb-1">Affiliation</p>
                  <p className="text-charcoal/70 text-sm">
                    Civil Aviation Authority of Singapore (CAAS)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
