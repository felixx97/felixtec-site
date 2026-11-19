import { useEffect, useRef } from 'react';
import { usePerformance } from '../../context/PerformanceContext';

const CODE_SNIPPETS = [
  'gaga',
  'paramore',
  'FelixTec',
  'React',
  'GSAP',
  'Vite',
  'const',
  'let',
  'function',
  '=>',
  'class',
  'return',
  'import',
  'export',
  'async',
  'await',
  'api',
  '&&',
  '||',
  '===',
  'true',
  'false',
  '{}',
  '[]',
  'if',
  'else',
  'try',
  'catch',
  'fetch',
  'promise',
  'json',
  'map',
  'filter',
  'reduce',
  'deploy',
  'git',
  'npm',
  '<section>',
  '</div>',
  'display: flex',
  'grid-template',
];

const COLORS = ['#00d2ff', '#0071e3', 'rgba(255, 255, 255, 0.55)'];

export default function CodeParticlesCanvas() {
  const { isLowPower, isTouch, reducedMotion } = usePerformance();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const maxParticles = isLowPower ? 14 : 32;
    const minSpawnDistSq = isLowPower ? 55 * 55 : 36 * 36;
    const clusterSize = isLowPower ? 1 : 3;

    const particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let lastTime = 0;
    let lastSpawnX = -999;
    let lastSpawnY = -999;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Cap DPR at 1.5 so 4K/HiDPI screens stay silky smooth on integrated GPUs
      dpr = Math.min(window.devicePixelRatio || 1, isLowPower ? 1 : 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '500 14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };

    resize();

    const draw = (now) => {
      rafId = 0;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        const t = p.age / p.life;

        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const easeOut = 1 - Math.pow(1 - t, 2);
        const x = p.x + p.vx * easeOut;
        const y = p.y + p.vy * easeOut;
        const alpha = p.startOpacity * (1 - t);
        const scale = p.startScale + (0.35 - p.startScale) * t;
        const angle = p.rotation + p.vRot * t;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scale, scale);
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      }

      if (particles.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        lastTime = 0;
      }
    };

    const spawnCluster = (x, y) => {
      for (let i = 0; i < clusterSize; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }
        particles.push({
          text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          x: x + (Math.random() - 0.5) * 44,
          y: y + (Math.random() - 0.5) * 44,
          vx: (Math.random() - 0.5) * 90,
          vy: -(65 + Math.random() * 55),
          rotation: ((Math.random() - 0.5) * 50 * Math.PI) / 180,
          vRot: ((Math.random() - 0.5) * 70 * Math.PI) / 180,
          startScale: 0.65 + Math.random() * 0.4,
          startOpacity: 0.35 + Math.random() * 0.35,
          life: 1.15 + Math.random() * 0.85,
          age: 0,
        });
      }

      if (!rafId) {
        lastTime = 0;
        rafId = requestAnimationFrame(draw);
      }
    };

    const handleMove = (e) => {
      if (document.hidden) return;
      const dx = e.clientX - lastSpawnX;
      const dy = e.clientY - lastSpawnY;
      if (dx * dx + dy * dy >= minSpawnDistSq) {
        lastSpawnX = e.clientX;
        lastSpawnY = e.clientY;
        spawnCluster(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLowPower, isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return <canvas className="code-particles-canvas" ref={canvasRef} aria-hidden="true" />;
}

