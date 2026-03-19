import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-charcoal pt-16">
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-teal-dark" />
      <div className="container-inner text-center py-24">
        <div className="w-12 h-1 bg-teal mx-auto mb-8" />
        <h1 className="text-8xl font-display font-bold text-white/10 mb-4">404</h1>
        <h2 className="text-3xl font-display font-bold text-white mb-4">This page doesn&apos;t exist.</h2>
        <p className="text-white/60 mb-10 font-body">
          The page you&apos;re looking for may have been moved or removed.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
