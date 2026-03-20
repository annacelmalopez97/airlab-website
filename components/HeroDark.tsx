import BlueprintGrid from './BlueprintGrid'

interface HeroDarkProps {
  title: string
  subtitle?: string
  backgroundImageUrl?: string
  videoUrl?: string
  overlayOpacity?: number // 0–100, default 75
  size?: 'default' | 'full'
  showBlueprint?: boolean
}

export default function HeroDark({
  title,
  subtitle,
  backgroundImageUrl,
  videoUrl,
  overlayOpacity = 75,
  size = 'default',
  showBlueprint = false,
}: HeroDarkProps) {
  const heightClass = size === 'full' ? 'min-h-screen' : 'min-h-[60vh]'

  return (
    <section className={`relative ${heightClass} flex items-center bg-hero-bg pt-16`}>
      {/* Background video */}
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Background image */}
      {!videoUrl && backgroundImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={backgroundImageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      {(videoUrl || backgroundImageUrl) && (
        <div
          className="absolute inset-0 bg-charcoal"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Blueprint grid — only on pure dark hero (no video/image) */}
      {showBlueprint && !videoUrl && !backgroundImageUrl && (
        <BlueprintGrid opacity={10} />
      )}

      {/* Bottom teal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-teal to-transparent" />

      {/* Content */}
      <div className="container-inner relative z-10">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
