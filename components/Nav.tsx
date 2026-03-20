'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/rcp', label: 'RCP' },
  { href: '/news', label: 'News & Insights' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-white/10">
      <div className="container-inner flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl text-white tracking-tight">
          AIR<span className="text-teal">Lab</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-sm font-medium text-white/80 hover:text-teal transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <Link href="/contact" className="hidden md:block btn-primary text-sm py-2 px-4">
          Contact
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-charcoal">
          <div className="container-inner py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-ui text-sm font-medium text-white/80 hover:text-teal transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-sm py-2 px-4 text-center mt-2" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
