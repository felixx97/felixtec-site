import { useId } from 'react';

const THEME_COLORS = {
  natal: {
    primary: '#D4AF37',
    secondary: '#10B981',
    glassFill: 'rgba(212, 175, 55, 0.10)',
  },
  automacoes: {
    primary: '#0EA5E9',
    secondary: '#6366F1',
    glassFill: 'rgba(14, 165, 233, 0.10)',
  },
  default: {
    primary: '#00d2ff',
    secondary: '#0071e3',
    glassFill: 'rgba(0, 210, 255, 0.08)',
  },
};

export default function FelixMascotGuide({
  theme = 'default',
  size = 110,
  badge,
  speech,
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `guide-skin-${uid}`;
  const gradHoodie = `guide-hoodie-${uid}`;
  const palette = THEME_COLORS[theme] || THEME_COLORS.default;

  return (
    <div className={`felix-guide-wrap felix-guide-${theme} ${className}`}>
      {badge && <span className="felix-guide-badge">{badge}</span>}
      {speech && <div className="felix-guide-speech">{speech}</div>}

      <div className="felix-guide-avatar" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width={size} height={size} aria-label="Mascote Dev Félix">
          <defs>
            <linearGradient id={gradSkin} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe5c4" />
              <stop offset="100%" stopColor="#fca88f" />
            </linearGradient>
            <linearGradient id={gradHoodie} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d2d3a" />
              <stop offset="100%" stopColor="#14141a" />
            </linearGradient>
          </defs>

          {/* Subtle ambient sparkles */}
          <path d="M11 21 L12.2 23.8 L15 25 L12.2 26.2 L11 29 L9.8 26.2 L7 25 L9.8 23.8 Z" fill={palette.primary} opacity="0.75" />
          <path d="M89 19 L90 21 L92 22 L90 23 L89 25 L88 23 L86 22 L88 21 Z" fill={palette.secondary} opacity="0.75" />

          {/* Headphone Band */}
          <path d="M23 42 A 28 28 0 0 1 77 42" fill="none" stroke="#15151c" strokeWidth="2.5" />
          <path d="M23 42 A 28 28 0 0 1 77 42" fill="none" stroke={palette.primary} strokeWidth="1" />

          {/* Headphone Cups */}
          <rect x="15" y="38" width="8" height="15" rx="4" fill="#15151c" stroke={palette.primary} strokeWidth="1.1" />
          <rect x="77" y="38" width="8" height="15" rx="4" fill="#15151c" stroke={palette.primary} strokeWidth="1.1" />

          {/* Head */}
          <path d="M22 42 C22 60, 78 60, 78 42 Z" fill={`url(#${gradSkin})`} stroke="#fca88f" strokeWidth="0.5" />

          {/* Hair */}
          <path d="M23 40 Q50 25 77 40 Q64 35 50 38 Q36 35 23 40 Z" fill="#15151c" />

          {/* Tech Glasses */}
          <circle cx="37" cy="46" r="9.5" fill={palette.glassFill} stroke={palette.primary} strokeWidth="1.3" />
          <circle cx="63" cy="46" r="9.5" fill={palette.glassFill} stroke={palette.primary} strokeWidth="1.3" />
          <line x1="46.5" y1="46" x2="53.5" y2="46" stroke={palette.primary} strokeWidth="1.3" />

          {/* Eyes */}
          <circle cx="37" cy="46" r="3.2" fill="#15151c" />
          <circle cx="63" cy="46" r="3.2" fill="#15151c" />
          <circle cx="38.5" cy="44.5" r="1" fill="#ffffff" />
          <circle cx="64.5" cy="44.5" r="1" fill="#ffffff" />

          {/* Blush */}
          <circle cx="25" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />
          <circle cx="75" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />

          {/* Hoodie */}
          <path d="M21 54 C21 54, 50 64, 79 54 L75 62 L25 62 Z" fill="#15151c" />
          <path d="M23 60 C23 60, 50 56, 77 60 L80 92 L20 92 Z" fill={`url(#${gradHoodie})`} stroke="#2d2d3a" strokeWidth="1.2" />

          {/* Cords */}
          <line x1="43" y1="62" x2="43" y2="73" stroke={palette.secondary} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="57" y1="62" x2="57" y2="73" stroke={palette.secondary} strokeWidth="1.2" strokeLinecap="round" />

          {/* FT Logo */}
          <path d="M44.8 69.5 V63.5 H48.5 V64.7 H45.8 V66.1 H48 V67.2 H45.8 V69.5 Z" fill={palette.primary} />
          <path d="M50 63.5 H55.2 V64.7 H53.5 V69.5 H51.9 V64.7 H50 Z" fill={palette.primary} />

          {/* Arms & Hands */}
          <path d="M23 66 Q13 70 12 76" stroke="#2d2d3a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="76" r="4.5" fill={`url(#${gradSkin})`} />
          <path d="M77 66 Q87 70 88 76" stroke="#2d2d3a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="88" cy="76" r="4.5" fill={`url(#${gradSkin})`} />

          {/* Shoes */}
          <rect x="32" y="91" width="13" height="4" rx="2" fill="#15151c" stroke={palette.primary} strokeWidth="0.9" />
          <rect x="55" y="91" width="13" height="4" rx="2" fill="#15151c" stroke={palette.primary} strokeWidth="0.9" />
        </svg>
      </div>
    </div>
  );
}
