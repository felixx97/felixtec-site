import { useId } from 'react';

export function WebDevVisual() {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `webdev-skin-${uid}`;

  return (
    <svg className="bento-svg-wrapper" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe5c4" />
          <stop offset="100%" stopColor="#fca88f" />
        </linearGradient>
      </defs>

      <rect x="30" y="40" width="260" height="150" rx="10" fill="#060608" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <circle cx="48" cy="54" r="5" fill="#ff5f56" />
      <circle cx="62" cy="54" r="5" fill="#ffbd2e" />
      <circle cx="76" cy="54" r="5" fill="#27c93f" />
      <rect x="100" y="49" width="70" height="10" rx="3" fill="rgba(255,255,255,0.05)" />

      <line x1="45" y1="80" x2="160" y2="80" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="95" x2="190" y2="95" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="110" x2="220" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="125" x2="140" y2="125" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="140" x2="110" y2="140" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />

      <g className="felix-climb" style={{ transform: 'translate(210px, 10px)' }}>
        <path d="M12 25 Q25 15 38 25 Q32 21 25 23 Q18 21 12 25 Z" fill="#15151c" />
        <path d="M11 25 C11 38, 39 38, 39 25 Z" fill={`url(#${gradSkin})`} />
        <circle cx="20" cy="27" r="5" fill="rgba(0, 210, 255, 0.08)" stroke="var(--accent-cyan)" strokeWidth="0.9" />
        <circle cx="30" cy="27" r="5" fill="rgba(0, 210, 255, 0.08)" stroke="var(--accent-cyan)" strokeWidth="0.9" />
        <line x1="25" y1="27" x2="25" y2="27" stroke="var(--accent-cyan)" strokeWidth="0.8" />
        <circle cx="20" cy="27" r="1.5" fill="#15151c" />
        <circle cx="30" cy="27" r="1.5" fill="#15151c" />
        <circle cx="14" cy="30" r="1.2" fill="#ff3366" fillOpacity="0.5" />
        <circle cx="36" cy="30" r="1.2" fill="#ff3366" fillOpacity="0.5" />
        <rect x="7" y="32" width="6" height="5" rx="2" fill={`url(#${gradSkin})`} stroke="#222" strokeWidth="0.5" />
        <rect x="37" y="32" width="6" height="5" rx="2" fill={`url(#${gradSkin})`} stroke="#222" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export function AutomationVisual() {
  const uid = useId().replace(/:/g, '');
  const pillLeft = `auto-left-${uid}`;
  const pillRight = `auto-right-${uid}`;
  const gradSkin = `auto-skin-${uid}`;

  return (
    <svg className="bento-svg-wrapper small-card-svg" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={pillLeft} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#18181c" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <linearGradient id={pillRight} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(0, 113, 227, 0.15)" />
          <stop offset="100%" stopColor="rgba(0, 210, 255, 0.05)" />
        </linearGradient>
        <linearGradient id={gradSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe5c4" />
          <stop offset="100%" stopColor="#fca88f" />
        </linearGradient>
      </defs>

      <line x1="20" y1="124" x2="220" y2="124" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
      <line x1="120" y1="20" x2="120" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

      <path d="M 75 124 Q 120 94 165 124" stroke="rgba(0, 210, 255, 0.35)" strokeWidth="2" strokeLinecap="round" fill="none" className="svg-data-flow" />
      <path d="M 75 124 Q 120 154 165 124" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
      <circle cx="120" cy="109" r="3.5" fill="var(--accent-cyan)" className="svg-pulse-glow" />

      <g className="automation-pill">
        <rect x="25" y="106" width="55" height="36" rx="8" fill={`url(#${pillLeft})`} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="42" cy="124" r="5" stroke="var(--text-secondary)" strokeWidth="1" fill="none" />
        <path d="M42 116 V119 M42 129 V132 M34 124 H37 M47 124 H50" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" />
        <text x="61" y="127" fill="var(--text-secondary)" fontSize="8.5" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">
          n8n
        </text>
      </g>

      <g className="automation-pill">
        <rect x="160" y="106" width="55" height="36" rx="8" fill={`url(#${pillRight})`} stroke="var(--accent-blue)" strokeWidth="1.2" className="svg-pulse-glow" />
        <path d="M174 120 L175.5 122.5 L178 124 L175.5 125.5 L174 128 L172.5 125.5 L170 124 L172.5 122.5 Z" fill="var(--accent-cyan)" />
        <text x="194" y="127" fill="var(--text-primary)" fontSize="8.5" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">
          IA
        </text>
      </g>

      <g className="svg-float-mascot" style={{ transform: 'translate(170px, 74px)' }}>
        <path d="M12 18 Q20 10 28 18 Q24 15 20 16 Q16 15 12 18 Z" fill="#15151c" />
        <path d="M11 18 C11 28, 29 28, 29 18 Z" fill={`url(#${gradSkin})`} />
        <circle cx="17" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="23" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="17" cy="20" r="1.0" fill="#15151c" />
        <circle cx="23" cy="20" r="1.0" fill="#15151c" />
        <rect x="7" y="24" width="4.5" height="3.5" rx="1.5" fill={`url(#${gradSkin})`} stroke="#222" strokeWidth="0.4" />
        <rect x="29" y="24" width="4.5" height="3.5" rx="1.5" fill={`url(#${gradSkin})`} stroke="#222" strokeWidth="0.4" />
      </g>
    </svg>
  );
}

export function BackendVisual() {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `be-skin-${uid}`;
  const gradHoodie = `be-hoodie-${uid}`;

  return (
    <svg className="bento-svg-wrapper small-card-svg" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe5c4" />
          <stop offset="100%" stopColor="#fca88f" />
        </linearGradient>
        <linearGradient id={gradHoodie} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d2d3a" />
          <stop offset="100%" stopColor="#14141a" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="155" rx="42" ry="12" fill="rgba(0,0,0,0.4)" />

      <g className="db-cylinder">
        <path d="M78 120 V145 C78 152 162 152 162 145 V120 Z" fill="#121216" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <ellipse cx="120" cy="120" rx="42" ry="10" fill="#1e1e24" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="120" cy="120" r="1.5" fill="var(--accent-cyan)" />
        <path d="M100 120 H115 M125 120 H140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="120" y1="130" x2="120" y2="140" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="db-cylinder db-cylinder-mid" style={{ transform: 'translateY(-20px)' }}>
        <path d="M78 120 V145 C78 152 162 152 162 145 V120 Z" fill="#121216" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <ellipse cx="120" cy="120" rx="42" ry="10" fill="#1e1e24" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="120" cy="120" r="1.5" fill="var(--accent-cyan)" />
        <path d="M96 120 H112 M128 120 H144" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="100" y1="132" x2="140" y2="132" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="120" y1="130" x2="120" y2="140" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="db-cylinder db-cylinder-top" style={{ transform: 'translateY(-40px)' }}>
        <path d="M78 120 V145 C78 152 162 152 162 145 V120 Z" fill="#121216" stroke="var(--border-light)" strokeWidth="1" />
        <ellipse cx="120" cy="120" rx="42" ry="10" fill="rgba(0, 113, 227, 0.15)" stroke="var(--accent-blue)" strokeWidth="1.5" className="svg-pulse-glow" />
        <circle cx="120" cy="120" r="1.5" fill="var(--accent-cyan)" />
        <path d="M98 120 H114 M126 120 H142" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="120" y1="130" x2="120" y2="140" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="svg-float-mascot" style={{ transform: 'translate(110px, 32px)' }}>
        <path d="M12 18 Q20 10 28 18 Q24 15 20 16 Q16 15 12 18 Z" fill="#15151c" />
        <path d="M11 18 C11 28, 29 28, 29 18 Z" fill={`url(#${gradSkin})`} />
        <circle cx="17" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="23" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="17" cy="20" r="1.0" fill="#15151c" />
        <circle cx="23" cy="20" r="1.0" fill="#15151c" />
        <path d="M12 25 C12 25, 20 23, 28 25 L30 36 L10 36 Z" fill={`url(#${gradHoodie})`} stroke="#2d2d3a" strokeWidth="0.5" />
        <circle cx="20" cy="28" r="2" stroke="var(--accent-cyan)" strokeWidth="0.8" fill="none" />
        <line x1="21.5" y1="29.5" x2="24" y2="32" stroke="var(--accent-cyan)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export function TrafficVisual() {
  const uid = useId().replace(/:/g, '');
  const barGrad = `traffic-bar-${uid}`;
  const gradSkin = `traffic-skin-${uid}`;

  return (
    <svg className="bento-svg-wrapper" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={barGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-cyan)" />
          <stop offset="100%" stopColor="var(--accent-blue)" />
        </linearGradient>
        <linearGradient id={gradSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe5c4" />
          <stop offset="100%" stopColor="#fca88f" />
        </linearGradient>
      </defs>

      <rect x="30" y="40" width="260" height="150" rx="10" fill="#060608" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <line x1="45" y1="75" x2="275" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <line x1="45" y1="110" x2="275" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <line x1="45" y1="145" x2="275" y2="145" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

      <rect x="55" y="115" width="16" height="50" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
      <rect x="85" y="90" width="16" height="75" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
      <rect x="115" y="105" width="16" height="60" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
      <rect x="145" y="60" width="16" height="105" rx="3" fill={`url(#${barGrad})`} className="svg-pulse-glow" />

      <g className="svg-float-rocket" style={{ transform: 'translate(220px, 60px)' }}>
        <path d="M0 25 L12 0 L24 25 L12 20 Z" fill="var(--accent-cyan)" />
        <path d="M8 24 L12 32 L16 24 Z" fill="#ff3366" className="svg-pulse-glow-pink" />
      </g>

      <rect x="180" y="115" width="82" height="24" rx="12" fill="rgba(0, 210, 255, 0.1)" stroke="var(--accent-cyan)" strokeWidth="1" className="svg-pulse-glow" />
      <text x="221" y="131" fill="var(--accent-cyan)" fontSize="10" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        +234% ROI
      </text>

      <g className="svg-float-mascot" style={{ transform: 'translate(163px, 120px)' }}>
        <path d="M12 18 Q20 10 28 18 Q24 15 20 16 Q16 15 12 18 Z" fill="#15151c" />
        <path d="M11 18 C11 28, 29 28, 29 18 Z" fill={`url(#${gradSkin})`} />
        <circle cx="17" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="23" cy="20" r="3.5" stroke="var(--accent-cyan)" strokeWidth="0.6" fill="none" />
        <circle cx="17" cy="20" r="1.0" fill="#15151c" />
        <circle cx="23" cy="20" r="1.0" fill="#15151c" />
        <rect x="11" y="22" width="7" height="4" rx="1" fill="#2d2d3a" stroke="var(--accent-cyan)" strokeWidth="0.6" />
        <rect x="22" y="22" width="7" height="4" rx="1" fill="#2d2d3a" stroke="var(--accent-cyan)" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export function ServiceVisual({ type }) {
  switch (type) {
    case 'webdev':
      return <WebDevVisual />;
    case 'automation':
      return <AutomationVisual />;
    case 'backend':
      return <BackendVisual />;
    case 'traffic':
      return <TrafficVisual />;
    default:
      return null;
  }
}

