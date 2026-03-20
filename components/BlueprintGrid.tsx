interface BlueprintGridProps {
  opacity?: number // 0–100, default 10
}

export default function BlueprintGrid({ opacity = 10 }: BlueprintGridProps) {
  return (
    <svg
      aria-hidden="true"
      style={{ opacity: opacity / 100 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Fine 20px grid */}
        <pattern id="bp-small" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#30C7B5" strokeWidth="0.4" />
        </pattern>
        {/* Major 100px grid */}
        <pattern id="bp-large" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-small)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#30C7B5" strokeWidth="0.9" />
        </pattern>
      </defs>

      {/* Grid fill */}
      <rect width="800" height="600" fill="url(#bp-large)" />

      {/* Waypoint: SINVY */}
      <rect x="248" y="148" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 252 152)" />
      <text x="236" y="142" fill="#30C7B5" fontSize="7" fontFamily="monospace">SINVY</text>

      {/* Waypoint: ROMAR */}
      <rect x="448" y="198" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 452 202)" />
      <text x="436" y="192" fill="#30C7B5" fontSize="7" fontFamily="monospace">ROMAR</text>

      {/* Waypoint: VISAT */}
      <rect x="618" y="163" width="8" height="8" fill="none" stroke="#30C7B5" strokeWidth="1.2" transform="rotate(45 622 167)" />
      <text x="606" y="157" fill="#30C7B5" fontSize="7" fontFamily="monospace">VISAT</text>

      {/* Flight paths */}
      <line x1="252" y1="152" x2="452" y2="202" stroke="#30C7B5" strokeWidth="0.9" strokeDasharray="5,3" />
      <line x1="452" y1="202" x2="622" y2="167" stroke="#30C7B5" strokeWidth="0.9" strokeDasharray="5,3" />

      {/* Flight level labels */}
      <text x="342" y="168" fill="#30C7B5" fontSize="6" fontFamily="monospace" opacity="0.7">FL350</text>
      <text x="530" y="177" fill="#30C7B5" fontSize="6" fontFamily="monospace" opacity="0.7">FL370</text>
    </svg>
  )
}
