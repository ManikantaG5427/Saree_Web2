import React from 'react';

/**
 * SLSH WEAVES — Official Brand Logo & Emblems
 * Replicated with exact fidelity from the official Sri Lakshmi Saree House showroom poster:
 * - Circular gold medallion with dual-line arc
 * - Magenta-pink butterfly in flight at upper-left
 * - Bold serif "SLSH" in metallic gold
 * - "weaves" in lowercase italic with flanking filigree flourishes
 * - "SINCE: 2003" + "SRI LAKSHMI" in gold + "SAREE HOUSE"
 */

export function Logo({ variant = 'full', className = '', isDark = false, size = 'default' }) {
  const goldGradientId = `gold-grad-${Math.random().toString(36).substr(2, 9)}`;
  const pinkGradientId = `pink-grad-${Math.random().toString(36).substr(2, 9)}`;

  // Size mapping
  const emblemSizes = {
    sm: 'w-8 h-8',
    default: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const emblemSvg = (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sri Lakshmi Saree House — SLSH Weaves Official Emblem"
    >
      <defs>
        {/* Metallic Gold Gradient */}
        <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="35%" stopColor="#F0C860" />
          <stop offset="70%" stopColor="#D4A827" />
          <stop offset="100%" stopColor="#A67C1E" />
        </linearGradient>

        {/* Vibrant Magenta / Rani Pink Gradient for Butterfly */}
        <linearGradient id={pinkGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FA579C" />
          <stop offset="50%" stopColor="#E02979" />
          <stop offset="100%" stopColor="#9E1452" />
        </linearGradient>

        {/* Soft Gold Glow Filter */}
        <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4A827" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Optional Dark Medallion Background */}
      <circle cx="80" cy="80" r="76" fill="#280030" stroke={`url(#${goldGradientId})`} strokeWidth="1.5" opacity="0.95" />

      {/* Outer Golden Circular Arc (Open dynamic sweep as in the poster) */}
      <path
        d="M 42 135 A 66 66 0 1 1 138 98"
        stroke={`url(#${goldGradientId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Inner Delicate Concentric Golden Arc */}
      <path
        d="M 50 128 A 58 58 0 1 1 130 92"
        stroke={`url(#${goldGradientId})`}
        strokeWidth="1.2"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />

      {/* ─── Butterfly at Upper Left (Exact position from the poster) ─── */}
      <g transform="translate(68, 52) rotate(22) scale(0.95)">
        {/* Forewing Left (Large upper wing) */}
        <path
          d="M 0 0 C -16 -24, -38 -20, -34 2 C -30 18, -14 16, 0 4 Z"
          fill={`url(#${pinkGradientId})`}
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
        />
        {/* Hindwing Left (Lower delicate wing) */}
        <path
          d="M -2 4 C -18 10, -26 24, -12 28 C -2 30, -2 12, 0 4 Z"
          fill={`url(#${pinkGradientId})`}
          opacity="0.92"
        />
        {/* Forewing Right (Back wing for depth) */}
        <path
          d="M 2 -4 C 12 -20, 24 -14, 18 2 C 14 12, 4 8, 2 -2 Z"
          fill={`url(#${pinkGradientId})`}
          opacity="0.8"
        />
        {/* Butterfly Golden Slender Body */}
        <ellipse cx="0" cy="4" rx="2.2" ry="12" fill={`url(#${goldGradientId})`} />
        {/* Butterfly Golden Head */}
        <circle cx="0" cy="-7" r="2.4" fill={`url(#${goldGradientId})`} />
        {/* Butterfly Golden Curving Antennae */}
        <path
          d="M -1 -9 C -4 -16, -10 -20, -15 -18"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="-15" cy="-18" r="1.2" fill={`url(#${goldGradientId})`} />
        <path
          d="M 1 -9 C 4 -16, 10 -20, 14 -17"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="14" cy="-17" r="1.2" fill={`url(#${goldGradientId})`} />
      </g>

      {/* ─── Centered Brand Typography: "SLSH" ─── */}
      <text
        x="80"
        y="96"
        textAnchor="middle"
        fill={`url(#${goldGradientId})`}
        fontFamily="Cinzel, Playfair Display, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="0.08em"
        filter="url(#gold-glow)"
      >
        SLSH
      </text>

      {/* ─── "weaves" in Lowercase with Ornamental Flourishes ─── */}
      {/* Left Flourish */}
      <path
        d="M 44 114 C 48 111, 52 111, 56 113 C 58 114, 60 114, 62 113"
        stroke={`url(#${goldGradientId})`}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="43" cy="114" r="1.5" fill={`url(#${goldGradientId})`} />

      {/* "weaves" text */}
      <text
        x="80"
        y="117"
        textAnchor="middle"
        fill={`url(#${goldGradientId})`}
        fontFamily="'Cormorant Garamond', Baskerville, serif"
        fontSize="17"
        fontStyle="italic"
        fontWeight="500"
        letterSpacing="0.22em"
      >
        weaves
      </text>

      {/* Right Flourish */}
      <path
        d="M 98 113 C 100 114, 102 114, 104 113 C 108 111, 112 111, 116 114"
        stroke={`url(#${goldGradientId})`}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="117" cy="114" r="1.5" fill={`url(#${goldGradientId})`} />

      {/* Base Golden Ornamental Arc with Center Knot */}
      <path
        d="M 64 126 C 72 129, 88 129, 96 126"
        stroke={`url(#${goldGradientId})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="127.5" r="1.8" fill={`url(#${goldGradientId})`} />
    </svg>
  );

  if (variant === 'emblem') {
    return (
      <div className={`${emblemSizes[size] || emblemSizes.default} ${className}`}>
        {emblemSvg}
      </div>
    );
  }

  // Full Brand Lockup (Emblem + "SRI LAKSHMI SAREE HOUSE" — Compact, Never Overflows)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none flex-shrink-0 ${className}`}>
      {/* Medallion Emblem */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
        {emblemSvg}
      </div>

      {/* Typography Stack — Strictly Contained Height */}
      <div className="flex flex-col justify-center leading-none">
        {/* Line 1: SRI LAKSHMI */}
        <span
          className="font-serif text-[15px] sm:text-[17px] font-extrabold tracking-[0.14em] uppercase"
          style={{
            color: isDark ? '#F0C860' : '#280030',
            textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          Sri Lakshmi
        </span>

        {/* Line 2: SAREE HOUSE · ESTD 2003 */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="font-serif text-[11px] sm:text-[12px] font-bold tracking-[0.22em] uppercase"
            style={{ color: isDark ? '#FFF8F0' : '#4A154B' }}
          >
            Saree House
          </span>
          <span className="text-[#D4A827] text-[9px] font-bold">●</span>
          <span className="text-[9px] tracking-wider font-semibold uppercase text-[#BD3D78]">
            Estd 2003
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Official Silk Mark India Seal SVG Component
 * Exact butterfly spindle mark as shown on the poster
 */
export function SilkMarkIndia({ className = 'w-10 h-10', showText = true }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="6" fill="#FFF8F0" stroke="#BD3D78" strokeWidth="2" />
        {/* Butterfly Spindle Motif */}
        <g transform="translate(50, 42) scale(0.7)">
          <path
            d="M 0 0 C -22 -30, -50 -10, -40 22 C -32 46, -10 30, 0 10 Z"
            fill="#BD3D78"
          />
          <path
            d="M 0 0 C 22 -30, 50 -10, 40 22 C 32 46, 10 30, 0 10 Z"
            fill="#BD3D78"
          />
          <circle cx="-16" cy="12" r="6" fill="#FFF8F0" />
          <circle cx="16" cy="12" r="6" fill="#FFF8F0" />
          <path
            d="M 0 -18 L 0 32"
            stroke="#BD3D78"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        {/* Label */}
        <text
          x="50"
          y="82"
          textAnchor="middle"
          fill="#BD3D78"
          fontFamily="serif"
          fontSize="9"
          fontWeight="bold"
          letterSpacing="0.1em"
        >
          SILK MARK
        </text>
        <text
          x="50"
          y="93"
          textAnchor="middle"
          fill="#BD3D78"
          fontFamily="sans-serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          INDIA
        </text>
      </svg>
      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-[#BD3D78] uppercase tracking-wider leading-tight">
            Silk Mark Certified
          </span>
          <span className="text-[9px] text-[#706873] leading-none">
            100% Pure Natural Silk
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Official India Handloom Seal SVG Component
 * Exact circular handloom chakra from the poster
 */
export function IndiaHandloomMark({ className = 'w-10 h-10', showText = true }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#426B46" strokeWidth="2" />
        <circle cx="50" cy="50" r="44" stroke="#D4A827" strokeWidth="1" strokeDasharray="2 2" />
        {/* Concentric Handloom Spokes */}
        <g stroke="#426B46" strokeWidth="1.5">
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 36 * Math.cos((i * Math.PI) / 8)}
              y2={50 + 36 * Math.sin((i * Math.PI) / 8)}
              opacity="0.4"
            />
          ))}
        </g>
        {/* Handloom Weaver Loom Shuttle Center */}
        <rect x="36" y="44" width="28" height="12" rx="3" fill="#D4A827" />
        <path d="M 40 50 L 60 50" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="50" cy="50" r="3" fill="#BD3D78" />
        <text
          x="50"
          y="28"
          textAnchor="middle"
          fill="#426B46"
          fontFamily="sans-serif"
          fontSize="7"
          fontWeight="bold"
          letterSpacing="0.12em"
        >
          INDIA
        </text>
        <text
          x="50"
          y="76"
          textAnchor="middle"
          fill="#426B46"
          fontFamily="sans-serif"
          fontSize="6.5"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          HANDLOOM
        </text>
      </svg>
      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-[#426B46] uppercase tracking-wider leading-tight">
            India Handloom
          </span>
          <span className="text-[9px] text-[#706873] leading-none">
            Authentic Artisan Weave
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Floral Corner Filigree Motif (matching the pink rose and gold corner vines on the poster)
 */
export function FloralCornerMotif({ position = 'top-right', className = '' }) {
  const isLeft = position.includes('left');
  const isBottom = position.includes('bottom');
  const transform = `${isLeft ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`.trim();

  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none opacity-85 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
    >
      {/* Golden Filigree Vine Arcs */}
      <path
        d="M 98 2 C 80 10, 60 25, 45 45 C 30 65, 15 80, 2 98"
        stroke="#F0C860"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 98 16 C 85 24, 70 38, 58 55"
        stroke="#D4A827"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Gold Leaf Buds */}
      <ellipse cx="78" cy="22" rx="4" ry="2" transform="rotate(35 78 22)" fill="#F0C860" />
      <ellipse cx="62" cy="38" rx="4" ry="2" transform="rotate(45 62 38)" fill="#F0C860" />
      <ellipse cx="38" cy="62" rx="4" ry="2" transform="rotate(45 38 62)" fill="#F0C860" />
      <ellipse cx="22" cy="78" rx="4" ry="2" transform="rotate(55 22 78)" fill="#F0C860" />

      {/* Primary Pink Rose */}
      <g transform="translate(82, 18) scale(0.9)">
        <circle cx="0" cy="0" r="10" fill="#BD3D78" />
        <path d="M -6 -2 C -4 -8, 4 -8, 6 -2 C 4 6, -4 6, -6 -2 Z" fill="#E83D84" />
        <circle cx="0" cy="0" r="4" fill="#FFA5C8" />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Secondary Petite Rose */}
      <g transform="translate(62, 42) scale(0.65)">
        <circle cx="0" cy="0" r="10" fill="#BD3D78" />
        <circle cx="0" cy="0" r="4" fill="#FFA5C8" />
      </g>

      {/* Tertiary Miniature Rose */}
      <g transform="translate(42, 64) scale(0.5)">
        <circle cx="0" cy="0" r="10" fill="#E83D84" />
        <circle cx="0" cy="0" r="3.5" fill="#FFA5C8" />
      </g>

      {/* Little Botanical Green Leaves */}
      <path d="M 88 30 C 92 34, 90 40, 84 38 C 80 34, 84 30, 88 30 Z" fill="#426B46" />
      <path d="M 68 52 C 72 56, 70 62, 64 60 C 60 56, 64 52, 68 52 Z" fill="#426B46" />
      <path d="M 48 74 C 52 78, 50 84, 44 82 C 40 78, 44 74, 48 74 Z" fill="#426B46" />
    </svg>
  );
}

export function FloralMotif({ className = 'w-6 h-6 text-[#F0C860]' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2 C22 10 30 18 38 20 C30 22 22 30 20 38 C18 30 10 22 2 20 C10 18 18 10 20 2 Z" opacity="0.85" />
      <circle cx="20" cy="20" r="3.5" fill="#BD3D78" />
    </svg>
  );
}
