import { useId } from 'react';

export default function CodingMascotVisual() {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `serv-skin-${uid}`;
  const gradHoodie = `serv-hoodie-${uid}`;

  return (
    <div className="hero-mascot-container">
      <svg className="coding-mascot" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" aria-label="Mascote programando">
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

        <ellipse cx="80" cy="98" rx="45" ry="6" fill="rgba(0, 210, 255, 0.15)" />

        <g className="mascot-body">
          <path d="M56 36 A 24 24 0 0 1 104 36" fill="none" stroke="#15151c" strokeWidth="2" />
          <path d="M56 36 A 24 24 0 0 1 104 36" fill="none" stroke="#00d2ff" strokeWidth="0.8" />
          <rect x="50" y="32" width="6" height="12" rx="3" fill="#15151c" stroke="#00d2ff" strokeWidth="0.9" />
          <rect x="104" y="32" width="6" height="12" rx="3" fill="#15151c" stroke="#00d2ff" strokeWidth="0.9" />
          <path d="M55 36 C55 52, 105 52, 105 36 Z" fill={`url(#${gradSkin})`} />
          <path d="M56 34 Q80 20 104 34 Q92 30 80 32 Q68 30 56 34 Z" fill="#15151c" />
          <circle cx="68" cy="40" r="8" fill="rgba(0, 210, 255, 0.06)" stroke="#00d2ff" strokeWidth="1" />
          <circle cx="92" cy="40" r="8" fill="rgba(0, 210, 255, 0.06)" stroke="#00d2ff" strokeWidth="1" />
          <line x1="76" y1="40" x2="84" y2="40" stroke="#00d2ff" strokeWidth="1" />
          <circle cx="68" cy="40" r="2.5" fill="#15151c" />
          <circle cx="92" cy="40" r="2.5" fill="#15151c" />
          <circle cx="69" cy="38.5" r="0.8" fill="#ffffff" />
          <circle cx="93" cy="38.5" r="0.8" fill="#ffffff" />
          <circle cx="58" cy="44" r="2" fill="#ff3366" fillOpacity="0.4" />
          <circle cx="102" cy="44" r="2" fill="#ff3366" fillOpacity="0.4" />
          <path d="M56 50 C56 50, 80 47, 104 50 L108 80 L52 80 Z" fill={`url(#${gradHoodie})`} stroke="#2d2d3a" strokeWidth="1" />
          <g className="hands-group">
            <circle className="left-hand-anim" cx="62" cy="85" r="3.5" fill={`url(#${gradSkin})`} />
            <circle className="right-hand-anim" cx="98" cy="85" r="3.5" fill={`url(#${gradSkin})`} />
          </g>
        </g>

        <g className="laptop-screen">
          <rect x="45" y="60" width="70" height="42" rx="4" fill="#040407" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <rect x="47" y="62" width="66" height="38" rx="2" fill="#060608" />
          <path d="M 50 68 L 60 73 L 50 78" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="64" y="75" width="20" height="2" rx="1" fill="#ff3366" />
          <line x1="64" y1="68" x2="95" y2="68" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="84" x2="80" y2="84" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="90" x2="70" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="95" x2="90" y2="95" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <g className="laptop-base">
          <polygon points="40,102 120,102 128,106 32,106" fill="#181822" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <polygon points="32,106 128,106 124,108 36,108" fill="#101015" />
          <line x1="50" y1="104" x2="110" y2="104" stroke="rgba(0, 210, 255, 0.45)" strokeWidth="1.5" />
        </g>

        <g className="floating-sparks">
          <circle className="spark s1" cx="48" cy="80" r="1.5" fill="var(--accent-cyan)" />
          <circle className="spark s2" cx="112" cy="75" r="1.2" fill="#ff3366" />
          <circle className="spark s3" cx="60" cy="62" r="1" fill="var(--accent-cyan)" />
          <circle className="spark s4" cx="100" cy="64" r="1.5" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
}

