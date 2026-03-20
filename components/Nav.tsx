'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/team', label: 'Team' },
  { href: '/partners', label: 'Partners' },
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
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-ui text-sm font-medium text-white/80 hover:text-teal transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-center" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
