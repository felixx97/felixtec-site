import { useEffect, useRef } from 'react';
import { usePerformance } from '../../context/PerformanceContext';

export default function AmbientGlow() {
  const { isLowPower, isTouch, reducedMotion } = usePerformance();
  const glowRef = useRef(null);

  useEffect(() => {
    if (isLowPower || isTouch || reducedMotion) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLowPower, isTouch, reducedMotion]);

  if (isLowPower || isTouch || reducedMotion) return null;

  return <div className="ambient-glow" id="ambient-glow" ref={glowRef} aria-hidden="true" />;
}

