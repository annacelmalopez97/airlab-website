import Link from 'next/link'

interface Chip {
  label: string
  href: string
  highlight?: boolean
}

interface QuickAccessChipsProps {
  availableSlugs: string[]
}

export default function QuickAccessChips({ availableSlugs }: QuickAccessChipsProps) {
  const chips: Chip[] = [
    { label: 'RCP Platform', href: '/rcp', highlight: true },
    { label: 'FF-ICE', href: '/our-work/ff-ice' },
    { label: 'OPEN ATM', href: '/our-work/open-atm' },
    { label: 'Digital Twin', href: '/our-work/digital-twin' },
  ]

  const visible = chips.filter((c) => {
    if (c.href === '/rcp') return true
    const slug = c.href.replace('/our-work/', '')
    return availableSlugs.includes(slug)
  })

  if (visible.length === 0) return null

  return (
    <div className="border-t border-white/10 pt-5">
      <p className="atm-label text-white/30 mb-3">QUICK ACCESS</p>
      <div className="flex flex-wrap gap-2">
        {visible.map((chip) => (
          <Link
            key={chip.href}
            href={chip.href}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-ui font-semibold transition-colors ${
              chip.highlight
                ? 'bg-teal/10 border border-teal/25 text-teal hover:bg-teal/20'
                : 'bg-white/5 border border-white/12 text-white/60 hover:text-white/90'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${chip.highlight ? 'bg-teal' : 'bg-white/40'}`} />
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
