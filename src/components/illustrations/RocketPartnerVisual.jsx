import { useId } from 'react';

export default function RocketPartnerVisual() {
  const uid = useId().replace(/:/g, '');
  const blueGrad = `rocket-blue-${uid}`;
  const fireGrad = `rocket-fire-${uid}`;
  const skinGrad = `rocket-skin-${uid}`;
  const suitGrad = `rocket-suit-${uid}`;
  const hoodieGrad = `rocket-hoodie-${uid}`;

  return (
    <div className="satisfaction-container">
      <div className="satisfaction-header">
        <div className="satisfaction-brand">FélixTec</div>
        <div className="satisfaction-subtitle">Satisfação &amp; Parceria</div>
      </div>

      <svg className="rocket-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Foguete de parceria FélixTec">
        <defs>
          <linearGradient id={blueGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0071e3" />
            <stop offset="100%" stopColor="#00d2ff" />
          </linearGradient>
          <linearGradient id={fireGrad} x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#ff7b00" />
            <stop offset="50%" stopColor="#ff2a5f" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={skinGrad} x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#ffe5c4" />
            <stop offset="100%" stopColor="#fca88f" />
          </linearGradient>
          <linearGradient id={suitGrad} x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={hoodieGrad} x1="0%" y1="0%" x2="0%" y2="1">
            <stop offset="0%" stopColor="#2d2d3a" />
            <stop offset="100%" stopColor="#14141a" />
          </linearGradient>
        </defs>

        <path d="M 40 70 L 41 72 L 43 73 L 41 74 L 40 76 L 39 74 L 37 73 L 39 72 Z" fill="var(--accent-cyan)" opacity="0.6" />
        <path d="M 160 60 L 161 62 L 163 63 L 161 64 L 160 66 L 159 64 L 157 63 L 159 62 Z" fill="var(--accent-cyan)" opacity="0.6" />
        <path d="M 50 140 L 51 142 L 53 143 L 51 144 L 50 146 L 49 144 L 47 143 L 49 142 Z" fill="var(--accent-blue)" opacity="0.5" />

        <g className="rocket-group">
          <path d="M79 120 Q56 142 60 152 L79 148 Z" fill={`url(#${blueGrad})`} />
          <path d="M121 120 Q144 142 140 152 L121 148 Z" fill={`url(#${blueGrad})`} />
          <path d="M79 85 C79 40, 121 40, 121 85 L121 142 L79 142 Z" fill="#15151c" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
          <polygon points="90,44 110,44 100,28" fill={`url(#${blueGrad})`} />
          <rect x="91" y="142" width="18" height="6" rx="2" fill="#2d2d3a" />
          <polygon className="thruster-flame" points="93,148 107,148 100,182" fill={`url(#${fireGrad})`} />

          {/* Window 1: Dev Félix */}
          <circle cx="100" cy="78" r="13" fill="#000" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <g>
            <path d="M 91 75 A 11 11 0 0 1 109 75" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.2" />
            <rect x="88" y="73" width="3" height="6" rx="1" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="0.6" />
            <rect x="109" y="73" width="3" height="6" rx="1" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="0.6" />
            <path d="M90 75 C90 85, 110 85, 110 75 Z" fill={`url(#${skinGrad})`} />
            <path d="M91 73 Q100 64 109 73 Z" fill="#15151c" />
            <circle cx="96" cy="77" r="4" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" strokeWidth="0.5" />
            <circle cx="104" cy="77" r="4" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" strokeWidth="0.5" />
            <line x1="99" y1="77" x2="101" y2="77" stroke="var(--accent-cyan)" strokeWidth="0.5" />
            <path d="M 94 77 Q 96 75 98 77 M 102 77 Q 104 75 106 77" fill="none" stroke="#15151c" strokeWidth="0.6" />
            <path d="M 99 81 Q 100 82 101 81" fill="none" stroke="#ff3366" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M90 84 C90 84, 100 82, 110 84 L111 94 L89 94 Z" fill={`url(#${hoodieGrad})`} stroke="#2d2d3a" strokeWidth="0.5" />
            <text x="100" y="91.5" fill="var(--accent-cyan)" fontSize="6" fontWeight="900" fontFamily="monospace" textAnchor="middle">
              FT
            </text>
          </g>

          {/* Window 2: Businessman */}
          <circle cx="100" cy="105" r="10.5" fill="#000" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <g>
            <path d="M91 103 C91 112, 109 112, 109 103 Z" fill={`url(#${skinGrad})`} />
            <path d="M91 101 Q100 93 109 101 Z" fill="#653b1b" />
            <circle cx="96" cy="103" r="0.8" fill="#15151c" />
            <circle cx="104" cy="103" r="0.8" fill="#15151c" />
            <path d="M98 106 Q100 108 102 106" fill="none" stroke="#653b1b" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M92 110 L108 110 L106 117 L94 117 Z" fill={`url(#${suitGrad})`} />
            <polygon points="99,110 101,110 102,115 100,117 98,115" fill="#ff3366" />
            <circle className="hand-wave-left" cx="89" cy="104" r="1.8" fill="#ffe5c4" stroke="#653b1b" strokeWidth="0.3" />
          </g>

          {/* Window 3: Doctor */}
          <circle cx="100" cy="128" r="9.5" fill="#000" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <g>
            <path d="M92 126 C92 134, 108 134, 108 126 Z" fill={`url(#${skinGrad})`} />
            <path d="M91 125 C89 135, 93 137, 93 137 C93 137, 100 115, 109 125 C111 135, 107 137, 107 137 Z" fill="#15151c" />
            <circle cx="97" cy="126" r="0.8" fill="#15151c" />
            <circle cx="103" cy="126" r="0.8" fill="#15151c" />
            <path d="M99 129 Q100 131 101 129" fill="none" stroke="#ff3366" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M93 132 L107 132 L105 138 L95 138 Z" fill="#f5f5f7" />
            <path d="M 97 132 Q 100 136 103 132" fill="none" stroke="#86868b" strokeWidth="0.6" />
            <circle className="hand-wave-right" cx="111" cy="127" r="1.8" fill="#ffe5c4" stroke="#15151c" strokeWidth="0.3" />
          </g>
        </g>

        <circle cx="80" cy="180" r="14" fill="rgba(255,255,255,0.02)" />
        <circle cx="120" cy="180" r="14" fill="rgba(255,255,255,0.02)" />
        <circle cx="100" cy="176" r="16" fill="rgba(255,255,255,0.03)" />
      </svg>

      <div className="satisfaction-caption">100% Projetos Bem-Sucedidos</div>
    </div>
  );
}

