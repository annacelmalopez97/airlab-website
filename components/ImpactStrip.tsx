const stats = [
  { label: 'ATM EXPERTS', value: '20+', sub: 'IN TEAM' },
  { label: 'PARTNERS', value: '30+', sub: 'GLOBAL' },
  { label: 'FOCUS', value: 'South East Asia', sub: 'REGION' },
  { label: 'SINCE', value: '2020', sub: 'FOUNDED' },
]

export default function ImpactStrip() {
  return (
    <section className="bg-charcoal py-10">
      <div className="container-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="atm-label text-teal mb-1">{s.label}</p>
              <p className="font-display font-bold text-white text-2xl md:text-3xl leading-tight">{s.value}</p>
              <p className="atm-label text-white/30 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
