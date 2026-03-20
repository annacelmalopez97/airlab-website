'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface TimelineItem {
  phase: string
  title: string
  body: unknown[]
  isCurrent?: boolean
}

interface Props {
  items: TimelineItem[]
}

export default function RcpTimeline({ items }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = (i: number) => setExpanded(expanded === i ? null : i)

  return (
    <div className="relative pl-6">
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-teal/20" />

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <div
              className={`absolute -left-6 top-4 w-3 h-3 rotate-45 border ${
                item.isCurrent
                  ? 'bg-teal border-teal'
                  : expanded === i
                  ? 'bg-teal/40 border-teal'
                  : 'bg-body-bg border-teal/40'
              }`}
            />

            <div
              className={`rounded-xl overflow-hidden border cursor-pointer select-none ${
                item.isCurrent
                  ? 'bg-charcoal border-teal/20'
                  : 'bg-white border-charcoal/6'
              }`}
              onClick={() => toggle(i)}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`atm-label text-[10px] ${item.isCurrent ? 'text-teal' : 'text-teal/70'}`}>
                      {item.phase}
                    </span>
                    {item.isCurrent && (
                      <span className="atm-label text-[9px] bg-teal/10 border border-teal/25 text-teal rounded-full px-2 py-px">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <h4 className={`font-display font-bold text-sm ${item.isCurrent ? 'text-white' : 'text-charcoal'}`}>
                    {item.title}
                  </h4>
                </div>
                <span className={`text-xs font-semibold ml-4 flex-shrink-0 ${item.isCurrent ? 'text-teal' : 'text-teal/60'}`}>
                  {expanded === i ? '▲' : 'More ↓'}
                </span>
              </div>

              {expanded === i && item.body && (
                <div className={`px-5 pb-5 pt-0 border-t ${item.isCurrent ? 'border-white/10' : 'border-charcoal/6'}`}>
                  <div className={`prose prose-sm max-w-none mt-3 ${item.isCurrent ? 'prose-invert' : ''}`}>
                    <PortableText value={item.body as Parameters<typeof PortableText>[0]['value']} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
