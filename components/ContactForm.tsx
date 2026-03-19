'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      organization: (form.elements.namedItem('organization') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-teal/10 border border-teal/30 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <p className="font-display font-bold text-charcoal text-lg">Thank you — we&apos;ll be in touch soon.</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-body-bg border border-charcoal/20 rounded-lg px-4 py-3 text-charcoal font-body text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-ui text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-1.5">
          Name <span className="text-teal">*</span>
        </label>
        <input name="name" type="text" required placeholder="Your name" className={inputClass} />
      </div>

      <div>
        <label className="block font-ui text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-1.5">
          Organization
        </label>
        <input name="organization" type="text" placeholder="Your organization" className={inputClass} />
      </div>

      <div>
        <label className="block font-ui text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-1.5">
          Email <span className="text-teal">*</span>
        </label>
        <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
      </div>

      <div>
        <label className="block font-ui text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-1.5">
          Message <span className="text-teal">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm font-ui">Something went wrong. Please try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
