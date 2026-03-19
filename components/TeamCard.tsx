import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface TeamCardProps {
  name: string
  role: string
  photo: object
  bio?: string
  linkedIn?: string
}

export default function TeamCard({ name, role, photo, bio, linkedIn }: TeamCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden bg-charcoal/10">
        <Image
          src={urlFor(photo).width(400).height(450).url()}
          alt={name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-charcoal">{name}</h3>
        <p className="font-ui text-sm text-teal-dark font-medium mt-0.5">{role}</p>
        {bio && <p className="text-charcoal/60 text-sm mt-3 leading-relaxed line-clamp-4">{bio}</p>}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-ui font-medium text-charcoal/40 hover:text-teal transition-colors"
            aria-label={`${name} on LinkedIn`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  )
}
