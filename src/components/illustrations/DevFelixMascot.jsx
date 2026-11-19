import { useId } from 'react';

export function DevFelixMascot() {
  const uid = useId().replace(/:/g, '');
  const glowCyan = `hero-glow-cyan-${uid}`;
  const shadowChar = `hero-shadow-${uid}`;
  const gradSkin = `hero-skin-${uid}`;
  const gradHoodie = `hero-hoodie-${uid}`;

  return (
    <div className="ide-robot-container" id="main-robot">
      <div className="felix-speech-bubble">Toque aqui! 🎮</div>
      <svg className="ide-robot" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Mascote Dev Félix">
        <defs>
          <filter id={glowCyan} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id={shadowChar} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <linearGradient id={gradSkin} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe5c4" />
            <stop offset="100%" stopColor="#fca88f" />
          </linearGradient>
          <linearGradient id={gradHoodie} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d2d3a" />
            <stop offset="100%" stopColor="#14141a" />
          </linearGradient>
        </defs>

        <g filter={`url(#${shadowChar})`}>
          {/* Headphone Band */}
          <path d="M23 42 A 28 28 0 0 1 77 42" fill="none" stroke="#15151c" strokeWidth="2.5" />
          <path
            d="M23 42 A 28 28 0 0 1 77 42"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="0.8"
            filter={`url(#${glowCyan})`}
          />

          {/* Headphone Side Cups */}
          <rect
            className="phone-cup-left"
            x="15"
            y="38"
            width="8"
            height="15"
            rx="4"
            fill="#15151c"
            stroke="var(--accent-cyan)"
            strokeWidth="1.0"
            filter={`url(#${glowCyan})`}
          />
          <rect
            className="phone-cup-right"
            x="77"
            y="38"
            width="8"
            height="15"
            rx="4"
            fill="#15151c"
            stroke="var(--accent-cyan)"
            strokeWidth="1.0"
            filter={`url(#${glowCyan})`}
          />

          {/* Head */}
          <path d="M22 42 C22 60, 78 60, 78 42 Z" fill={`url(#${gradSkin})`} stroke="#fca88f" strokeWidth="0.5" />

          {/* Hair */}
          <path d="M23 40 Q50 25 77 40 Q64 35 50 38 Q36 35 23 40 Z" fill="#15151c" />

          {/* Tech Geek Glasses */}
          <circle
            className="glasses-rim left-rim"
            cx="37"
            cy="46"
            r="9.5"
            fill="rgba(0, 210, 255, 0.05)"
            stroke="var(--accent-cyan)"
            strokeWidth="1.2"
            filter={`url(#${glowCyan})`}
          />
          <circle
            className="glasses-rim right-rim"
            cx="63"
            cy="46"
            r="9.5"
            fill="rgba(0, 210, 255, 0.05)"
            stroke="var(--accent-cyan)"
            strokeWidth="1.2"
            filter={`url(#${glowCyan})`}
          />
          <line
            className="glasses-bridge"
            x1="46.5"
            y1="46"
            x2="53.5"
            y2="46"
            stroke="var(--accent-cyan)"
            strokeWidth="1.2"
            filter={`url(#${glowCyan})`}
          />

          {/* Eyes */}
          <circle className="felix-eye eye-left" cx="37" cy="46" r="3.2" fill="#15151c" />
          <circle className="felix-eye eye-right" cx="63" cy="46" r="3.2" fill="#15151c" />
          <circle className="felix-refle left-refle" cx="38.5" cy="44.5" r="1" fill="#ffffff" />
          <circle className="felix-refle right-refle" cx="64.5" cy="44.5" r="1" fill="#ffffff" />

          {/* Blush cheeks */}
          <circle className="felix-blush blush-left" cx="25" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />
          <circle className="felix-blush blush-right" cx="75" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />

          {/* Hoodie Body */}
          <path d="M21 54 C21 54, 50 64, 79 54 L75 62 L25 62 Z" fill="#15151c" />
          <path
            className="felix-hoodie"
            d="M23 60 C23 60, 50 56, 77 60 L80 92 L20 92 Z"
            fill={`url(#${gradHoodie})`}
            stroke="#2d2d3a"
            strokeWidth="1.2"
          />

          {/* Hoodie Cords */}
          <line className="cord-left" x1="43" y1="62" x2="43" y2="73" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeLinecap="round" />
          <line className="cord-right" x1="57" y1="62" x2="57" y2="73" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Chest Logo FT */}
          <g className="ft-logo">
            <path d="M44.8 69.5 V63.5 H48.5 V64.7 H45.8 V66.1 H48 V67.2 H45.8 V69.5 Z" fill="var(--accent-cyan)" filter={`url(#${glowCyan})`} />
            <path d="M50 63.5 H55.2 V64.7 H53.5 V69.5 H51.9 V64.7 H50 Z" fill="var(--accent-cyan)" filter={`url(#${glowCyan})`} />
          </g>

          {/* Arms & Hands */}
          <path className="left-arm" d="M23 66 Q13 70 12 76" stroke="#2d2d3a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle className="left-hand" cx="12" cy="76" r="4.5" fill={`url(#${gradSkin})`} />
          <path className="right-arm" d="M77 66 Q87 70 88 76" stroke="#2d2d3a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle className="right-hand" cx="88" cy="76" r="4.5" fill={`url(#${gradSkin})`} />

          {/* Shoes */}
          <rect className="shoe-left" x="32" y="91" width="13" height="4" rx="2" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="0.8" />
          <rect className="shoe-right" x="55" y="91" width="13" height="4" rx="2" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="0.8" />

          {/* Interactive Hidden Props (GSAP Animated) */}
          <g className="felix-coffee-mug" style={{ opacity: 0 }}>
            <rect x="23" y="65" width="8" height="10" rx="1.5" fill="#1e1e24" stroke="var(--accent-cyan)" strokeWidth="1" />
            <path d="M31 67 H34 V73 H31" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" />
            <path className="coffee-steam" d="M25 61 Q27 58 25 55" stroke="rgba(0, 210, 255, 0.6)" strokeWidth="0.8" fill="none" />
            <path className="coffee-steam" d="M29 61 Q31 58 29 55" stroke="rgba(0, 210, 255, 0.6)" strokeWidth="0.8" fill="none" />
          </g>

          <g className="music-note" style={{ opacity: 0 }}>
            <path d="M26 28 C26 26.5 29 26.5 29 28 C29 29.5 26 29.5 26 28 Z M29 28 V21 H34 V23 H31 V28" fill="var(--accent-cyan)" />
          </g>
          <g className="music-note" style={{ opacity: 0 }}>
            <path d="M68 28 C68 26.5 71 26.5 71 28 C71 29.5 68 29.5 68 28 Z M71 28 V21 H76 V23 H73 V28" fill="var(--accent-cyan)" />
          </g>

          <g className="sleep-z" style={{ opacity: 0 }}>
            <path d="M28 20 H33 L28 26 H33" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <g className="sleep-z" style={{ opacity: 0 }}>
            <path d="M68 20 H73 L68 26 H73" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <g className="sleep-z" style={{ opacity: 0 }}>
            <path d="M21 11 H25 L21 15 H25" stroke="var(--accent-cyan)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <g className="sleep-z" style={{ opacity: 0 }}>
            <path d="M75 11 H79 L75 15 H79" stroke="var(--accent-cyan)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>

          <g className="felix-laptop-group" style={{ opacity: 0 }}>
            <rect x="36" y="73" width="28" height="17" rx="2" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="1.2" />
            <line x1="40" y1="77" x2="49" y2="77" stroke="rgba(0, 210, 255, 0.7)" strokeWidth="1.2" />
            <line x1="40" y1="81" x2="56" y2="81" stroke="rgba(0, 210, 255, 0.7)" strokeWidth="1.2" />
            <line x1="40" y1="85" x2="46" y2="85" stroke="rgba(0, 210, 255, 0.7)" strokeWidth="1.2" />
            <path d="M30 90 H70 L66 94 H34 Z" fill="#2d2d3a" stroke="var(--accent-cyan)" strokeWidth="1.2" />
            <line x1="44" y1="92" x2="56" y2="92" stroke="var(--accent-cyan)" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function ModalFelixMascot() {
  const uid = useId().replace(/:/g, '');
  const gradSkin = `modal-skin-${uid}`;
  const gradHoodie = `modal-hoodie-${uid}`;

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }} aria-hidden="true">
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

      <text x="5" y="30" fill="var(--accent-cyan)" fontSize="8" fontFamily="monospace" opacity="0.6">
        {'</>'}
      </text>
      <text x="80" y="25" fill="var(--accent-blue)" fontSize="7" fontFamily="monospace" opacity="0.6">
        {'{ UX }'}
      </text>
      <circle cx="10" cy="75" r="1.5" fill="var(--accent-cyan)" opacity="0.5" />
      <circle cx="90" cy="65" r="2" fill="var(--accent-blue)" opacity="0.5" />

      <path d="M23 42 A 28 28 0 0 1 77 42" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.8" />
      <rect x="15" y="38" width="8" height="15" rx="4" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="1.2" />
      <rect x="77" y="38" width="8" height="15" rx="4" fill="#15151c" stroke="var(--accent-cyan)" strokeWidth="1.2" />
      <path d="M22 42 C22 60, 78 60, 78 42 Z" fill={`url(#${gradSkin})`} />
      <path d="M23 40 Q50 25 77 40 Q64 35 50 38 Q36 35 23 40 Z" fill="#15151c" />
      <circle cx="37" cy="46" r="9.5" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" strokeWidth="1.2" />
      <circle cx="63" cy="46" r="9.5" fill="rgba(0, 210, 255, 0.05)" stroke="var(--accent-cyan)" strokeWidth="1.2" />
      <line x1="46.5" y1="46" x2="53.5" y2="46" stroke="var(--accent-cyan)" strokeWidth="1.2" />
      <circle cx="37" cy="46" r="3.2" fill="#15151c" />
      <circle cx="63" cy="46" r="3.2" fill="#15151c" />
      <circle cx="38.5" cy="44.5" r="1" fill="#ffffff" />
      <circle cx="64.5" cy="44.5" r="1" fill="#ffffff" />
      <circle cx="25" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />
      <circle cx="75" cy="51" r="2.5" fill="#ff3366" fillOpacity="0.4" />
      <path d="M23 60 C23 60, 50 56, 77 60 L80 92 L20 92 Z" fill={`url(#${gradHoodie})`} stroke="#2d2d3a" strokeWidth="1.2" />
      <path d="M44.8 69.5 V63.5 H48.5 V64.7 H45.8 V66.1 H48 V67.2 H45.8 V69.5 Z" fill="var(--accent-cyan)" />
      <path d="M50 63.5 H55.2 V64.7 H53.5 V69.5 H51.9 V64.7 H50 Z" fill="var(--accent-cyan)" />
    </svg>
  );
}

