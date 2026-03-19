import Image from 'next/image'

interface HeroDarkProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImageUrl?: string
  size?: 'large' | 'medium'
}

export default function HeroDark({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  backgroundImageUrl,
  size = 'medium',
}: HeroDarkProps) {
  const heightClass = size === 'large' ? 'min-h-[90vh]' : 'min-h-[50vh]'

  return (
    <section className={`relative flex items-center bg-charcoal ${heightClass} pt-16`}>
      {/* Background image with overlay */}
      {backgroundImageUrl && (
        <>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/75" />
        </>
      )}

      {/* Teal accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />

      <div className="container-inner relative z-10 py-16">
        <div className="max-w-3xl">
          <div className="w-12 h-1 bg-teal mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <a href={ctaHref} className="btn-primary mt-8 inline-block">
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
