import { useEffect, useRef } from 'react';
import { usePerformance } from '../../context/PerformanceContext';

const BULBS = [
  { color: '#DC2626', delay: '0s' },
  { color: '#F59E0B', delay: '0.35s' },
  { color: '#FFFFFF', delay: '0.7s' },
  { color: '#D4AF37', delay: '1.05s' },
  { color: '#EF4444', delay: '0.2s' },
  { color: '#FDE68A', delay: '0.6s' },
  { color: '#DC2626', delay: '0.95s' },
  { color: '#F59E0B', delay: '0.15s' },
  { color: '#FFFFFF', delay: '0.5s' },
  { color: '#D4AF37', delay: '0.85s' },
  { color: '#EF4444', delay: '0.3s' },
  { color: '#FDE68A', delay: '0.75s' },
  { color: '#DC2626', delay: '1.1s' },
  { color: '#F59E0B', delay: '0.4s' },
  { color: '#FFFFFF', delay: '0.8s' },
  { color: '#D4AF37', delay: '0.25s' },
];

export function ChristmasLightsBar() {
  return (
    <div className="xmas-lights-garland" aria-hidden="true">
      <div className="xmas-lights-wire" />
      <div className="xmas-lights-row">
        {BULBS.map((bulb, i) => (
          <span
            key={i}
            className="xmas-bulb"
            style={{
              '--bulb-color': bulb.color,
              '--bulb-delay': bulb.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Animated lightweight SVG backdrop showing Santa's sleigh carrying glowing
 * digital gift boxes & websites gently gliding across the Hero sky.
 */
export function SantaSleighBackdrop() {
  return (
    <div className="xmas-sleigh-stage" aria-hidden="true">
      {/* Subtle drifting gold & red bokeh circles */}
      <span className="xmas-bokeh b1" />
      <span className="xmas-bokeh b2" />
      <span className="xmas-bokeh b3" />
      <span className="xmas-bokeh b4" />

      {/* Gliding Santa Sleigh carrying glowing websites/gifts */}
      <div className="xmas-sleigh-runner">
        <svg viewBox="0 0 280 90" width="280" height="90" xmlns="http://www.w3.org/2000/svg">
          {/* Stardust trail */}
          <circle cx="14" cy="58" r="2.2" fill="#D4AF37" opacity="0.45" />
          <circle cx="30" cy="52" r="1.6" fill="#DC2626" opacity="0.35" />
          <circle cx="48" cy="60" r="2.6" fill="#F59E0B" opacity="0.5" />
          <path d="M12 56 Q 55 62, 86 55" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 5" fill="none" opacity="0.45" />

          {/* Sleigh Base & Runners */}
          <path d="M72 68 C 90 76, 148 76, 168 62 C 174 58, 178 52, 174 47" stroke="#D4AF37" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <path d="M84 44 L150 44 C156 44, 162 56, 152 63 L88 63 C78 63, 76 50, 84 44 Z" fill="#B91C1C" stroke="#D4AF37" strokeWidth="1.4" />

          {/* Glowing Website / Gift Boxes stacked in the sleigh */}
          <rect x="88" y="29" width="18" height="15" rx="2.5" fill="#DC2626" stroke="#FDE68A" strokeWidth="1.2" />
          <line x1="97" y1="29" x2="97" y2="44" stroke="#FDE68A" strokeWidth="1.6" />
          <rect x="108" y="25" width="20" height="19" rx="2.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="112" y1="31" x2="124" y2="31" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="112" y1="35" x2="121" y2="35" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="112" y1="39" x2="119" y2="39" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />

          {/* Mini Santa silhouette driving */}
          <circle cx="141" cy="34" r="6.5" fill="#ffe5c4" />
          <path d="M134 32 C136 22, 147 22, 150 30 Z" fill="#DC2626" />
          <circle cx="151" cy="30" r="2.2" fill="#FFFFFF" />
          <rect x="134" y="30" width="14" height="3" rx="1.5" fill="#FFFFFF" />

          {/* Reins */}
          <path d="M150 44 Q 178 46, 206 38" stroke="#D4AF37" strokeWidth="1.1" fill="none" opacity="0.7" />

          {/* Stylized Golden Reindeer leading the sleigh */}
          <g transform="translate(200, 26)">
            <ellipse cx="22" cy="22" rx="14" ry="7" fill="#D4AF37" opacity="0.85" />
            <circle cx="38" cy="14" r="5" fill="#D4AF37" opacity="0.9" />
            <circle cx="43" cy="14" r="1.8" fill="#DC2626" />
            {/* Antlers */}
            <path d="M36 9 L33 2 M36 9 L39 3 M34 5 L30 5" stroke="#B45309" strokeWidth="1.3" strokeLinecap="round" />
            {/* Legs */}
            <path d="M12 27 L8 38 M18 28 L17 39 M28 27 L32 38 M32 25 L38 35" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * Ultra-lightweight Canvas Snowfall for /natal.
 * Respects reduced-motion, low-power tier, and pauses automatically when hidden.
 */
export function SnowfallCanvas() {
  const { isLowPower, reducedMotion } = usePerformance();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const count = isLowPower ? 16 : 36;
    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.4 + Math.random() * 2.8,
      vy: 18 + Math.random() * 28,
      vx: (Math.random() - 0.5) * 14,
      wobble: Math.random() * Math.PI * 2,
      isGold: Math.random() < 0.28,
      alpha: 0.35 + Math.random() * 0.45,
    }));

    const tick = (now) => {
      if (document.hidden) {
        lastTime = 0;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.wobble += dt * 1.4;
        f.x += (f.vx + Math.sin(f.wobble) * 10) * dt;
        f.y += f.vy * dt;

        if (f.y > height + 10) {
          f.y = -8;
          f.x = Math.random() * width;
        }
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = f.isGold
          ? `rgba(212, 175, 55, ${f.alpha * 0.8})`
          : `rgba(255, 255, 255, ${f.alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLowPower, reducedMotion]);

  if (reducedMotion) return null;

  return <canvas className="xmas-snow-canvas" ref={canvasRef} aria-hidden="true" />;
}
