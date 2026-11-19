import { useId } from 'react';

export default function SantaFelixMascot({
  size = 150,
  badge,
  speech,
  showLaptop = true,
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `santa-skin-${uid}`;
  const gradSuit = `santa-suit-${uid}`;
  const gradGold = `santa-gold-${uid}`;

  return (
    <div className={`santa-mascot-wrap ${className}`}>
      {badge && <span className="santa-mascot-badge">{badge}</span>}
      {speech && <div className="santa-mascot-speech">{speech}</div>}

      <div className="santa-mascot-stage" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 110 116"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          aria-label="Mascote Dev Félix vestido de Papai Noel"
        >
          <defs>
            <linearGradient id={gradSkin} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe7cb" />
              <stop offset="100%" stopColor="#f9ad92" />
            </linearGradient>
            <linearGradient id={gradSuit} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id={gradGold} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Soft floor shadow */}
          <ellipse cx="55" cy="109" rx="30" ry="4.5" fill="rgba(153, 27, 27, 0.14)" />

          {/* Golden twinkling stars around mascot */}
          <path className="santa-sparkle s1" d="M12 24 L13.5 27.5 L17 29 L13.5 30.5 L12 34 L10.5 30.5 L7 29 L10.5 27.5 Z" fill="#D4AF37" />
          <path className="santa-sparkle s2" d="M96 20 L97.2 22.8 L100 24 L97.2 25.2 L96 28 L94.8 25.2 L92 24 L94.8 22.8 Z" fill="#DC2626" />
          <circle className="santa-sparkle s3" cx="95" cy="54" r="2" fill="#D4AF37" opacity="0.8" />

          {/* Mini gift box next to Dev Félix */}
          <g transform="translate(83, 84)">
            <rect x="0" y="5" width="16" height="14" rx="2.5" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
            <rect x="-1" y="3" width="18" height="4" rx="1.2" fill="#EF4444" />
            <rect x="6.5" y="3" width="3" height="16" fill={`url(#${gradGold})`} />
            <path d="M8 3 C5 -1, 2 1, 5 3 M8 3 C11 -1, 14 1, 11 3" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Headphone Side Cups (festive red & gold) */}
          <rect x="19" y="45" width="8" height="15" rx="4" fill="#7F1D1D" stroke={`url(#${gradGold})`} strokeWidth="1.4" />
          <rect x="83" y="45" width="8" height="15" rx="4" fill="#7F1D1D" stroke={`url(#${gradGold})`} strokeWidth="1.4" />

          {/* Head */}
          <path d="M26 49 C26 68, 84 68, 84 49 Z" fill={`url(#${gradSkin})`} stroke="#f4a285" strokeWidth="0.5" />

          {/* Hair peeking under Santa hat */}
          <path d="M27 48 Q55 38 83 48 Q69 44 55 46 Q41 44 27 48 Z" fill="#1e1b24" />

          {/* Santa Hat (Red felt + fluffy white fur brim + swaying pompom) */}
          <g className="santa-hat-group">
            <path d="M25 45 C28 18, 66 10, 82 28 C87 33, 91 37, 94 37 C86 41, 78 39, 73 35 C63 29, 44 31, 31 45 Z" fill={`url(#${gradSuit})`} stroke="#7F1D1D" strokeWidth="0.9" />
            {/* Pompom */}
            <circle cx="95" cy="36" r="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
            {/* Fluffy White Brim */}
            <rect x="22" y="39" width="66" height="10" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.9" />
          </g>

          {/* Signature Dev Félix Glasses (Warm Gold Edition) */}
          <circle cx="42" cy="54" r="9.5" fill="rgba(255, 255, 255, 0.35)" stroke={`url(#${gradGold})`} strokeWidth="1.6" />
          <circle cx="68" cy="54" r="9.5" fill="rgba(255, 255, 255, 0.35)" stroke={`url(#${gradGold})`} strokeWidth="1.6" />
          <line x1="51.5" y1="54" x2="58.5" y2="54" stroke={`url(#${gradGold})`} strokeWidth="1.6" />

          {/* Happy Eyes */}
          <circle cx="42" cy="54" r="3.2" fill="#18181b" />
          <circle cx="68" cy="54" r="3.2" fill="#18181b" />
          <circle cx="43.4" cy="52.5" r="1.1" fill="#ffffff" />
          <circle cx="69.4" cy="52.5" r="1.1" fill="#ffffff" />

          {/* Rosy cheeks + cute smile */}
          <circle cx="30" cy="59" r="2.8" fill="#ef4444" fillOpacity="0.35" />
          <circle cx="80" cy="59" r="2.8" fill="#ef4444" fillOpacity="0.35" />
          <path d="M51 60 Q55 64 59 60" fill="none" stroke="#991B1B" strokeWidth="1.3" strokeLinecap="round" />

          {/* Santa Coat / Festive Hoodie Body */}
          <path d="M27 67 C27 67, 55 63, 83 67 L86 99 L24 99 Z" fill={`url(#${gradSuit})`} stroke="#7F1D1D" strokeWidth="1.2" />

          {/* White Fur Collar & Bottom Trim */}
          <path d="M26 65 Q55 74 84 65 L82 72 Q55 79 28 72 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.6" />
          <rect x="23" y="94" width="64" height="6" rx="3" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.6" />

          {/* Santa Black Belt & Gold Buckle */}
          <rect x="25.5" y="84" width="59" height="5.5" fill="#18181b" />
          <rect x="48.5" y="83" width="13" height="7.5" rx="1.8" fill="none" stroke={`url(#${gradGold})`} strokeWidth="2" />

          {/* Gold FT Chest Emblem */}
          <g>
            <path d="M49.8 80 V74.2 H53.4 V75.3 H50.8 V76.7 H53 V77.8 H50.8 V80 Z" fill="#FDE68A" />
            <path d="M55 74.2 H60.2 V75.3 H58.5 V80 H56.9 V75.3 H55 Z" fill="#FDE68A" />
          </g>

          {/* Arms & Hands */}
          <path d="M27 73 Q17 77 16 83" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="83" r="4.3" fill={`url(#${gradSkin})`} />
          <path d="M83 73 Q93 77 94 83" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="94" cy="83" r="4.3" fill={`url(#${gradSkin})`} />

          {/* Boots */}
          <rect x="35" y="100" width="14" height="5" rx="2.5" fill="#18181b" stroke="#D4AF37" strokeWidth="0.8" />
          <rect x="61" y="100" width="14" height="5" rx="2.5" fill="#18181b" stroke="#D4AF37" strokeWidth="0.8" />

          {/* Optional Mini Golden Laptop Coding Christmas Sites */}
          {showLaptop && (
            <g className="santa-laptop" transform="translate(36, 78)">
              <rect x="4" y="0" width="30" height="18" rx="2.5" fill="#18181b" stroke={`url(#${gradGold})`} strokeWidth="1.2" />
              <line x1="8" y1="5" x2="18" y2="5" stroke="#FDE68A" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="8" y1="9" x2="27" y2="9" stroke="#F87171" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="8" y1="13" x2="21" y2="13" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
              <path d="M0 18 H38 L34 22 H4 Z" fill="#3f3f46" stroke={`url(#${gradGold})`} strokeWidth="1" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
