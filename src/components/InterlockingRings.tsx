export function InterlockingRings({
  className = 'w-8 h-8',
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${
        glow ? 'filter drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]' : ''
      }`}
    >
      {/* Ring 1 (Left Ring with Solitaire Diamond) */}
      <circle
        cx="38"
        cy="54"
        r="24"
        stroke="url(#ringGoldGrad1)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Solitaire Diamond Mount */}
      <polygon points="38,24 43,31 33,31" fill="url(#sparkleWhiteGrad)" />
      <circle cx="38" cy="25" r="3.5" fill="#FFFFFF" />

      {/* Ring 2 (Right Band intertwined) */}
      <circle
        cx="62"
        cy="54"
        r="24"
        stroke="url(#ringGoldGrad2)"
        strokeWidth="6"
        strokeDasharray="120 28"
        strokeDashoffset="24"
      />

      {/* Radiant Diamond Sparkles */}
      <path
        d="M38 12 L40.5 19 L47.5 21.5 L40.5 24 L38 31 L35.5 24 L28.5 21.5 L35.5 19 Z"
        fill="url(#sparkleWhiteGrad)"
        opacity="0.95"
      />
      <path
        d="M74 34 L75.5 38 L79.5 39.5 L75.5 41 L74 45 L72.5 41 L68.5 39.5 L72.5 38 Z"
        fill="#D4AF37"
        opacity="0.8"
      />
      <circle cx="26" cy="62" r="1.5" fill="#D4AF37" opacity="0.6" />

      <defs>
        <linearGradient id="ringGoldGrad1" x1="14" y1="30" x2="62" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2D6" />
          <stop offset="0.35" stopColor="#D4AF37" />
          <stop offset="0.75" stopColor="#B76E79" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="ringGoldGrad2" x1="38" y1="30" x2="86" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2D6" />
          <stop offset="0.3" stopColor="#E5C158" />
          <stop offset="0.7" stopColor="#C59B27" />
          <stop offset="1" stopColor="#9D4A55" />
        </linearGradient>
        <linearGradient id="sparkleWhiteGrad" x1="28" y1="12" x2="48" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#FFF9E6" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default InterlockingRings;
