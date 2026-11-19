import { useCallback, useRef } from 'react';
import { usePerformance } from '../context/PerformanceContext';

/**
 * Zero-layout-thrash card mouse glow tracker.
 * Caches bounding rect on mouseenter and batches style writes inside rAF.
 */
export function useCardGlow() {
  const { isLowPower, isTouch } = usePerformance();
  const rectRef = useRef(null);
  const rafRef = useRef(0);

  const onMouseEnter = useCallback(
    (e) => {
      if (isLowPower || isTouch) return;
      rectRef.current = e.currentTarget.getBoundingClientRect();
    },
    [isLowPower, isTouch]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (isLowPower || isTouch) return;
      const card = e.currentTarget;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const rect = rectRef.current || card.getBoundingClientRect();
        card.style.setProperty('--card-glow-x', `${clientX - rect.left}px`);
        card.style.setProperty('--card-glow-y', `${clientY - rect.top}px`);
      });
    },
    [isLowPower, isTouch]
  );

  const onMouseLeave = useCallback(() => {
    rectRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  return { onMouseEnter, onMouseMove, onMouseLeave };
}

