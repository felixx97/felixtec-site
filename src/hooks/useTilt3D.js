import { useCallback, useRef } from 'react';
import { usePerformance } from '../context/PerformanceContext';

/**
 * Lightweight GPU 3D Tilt effect (perspective: 1000px).
 * Caches bounding rect on mouseenter and batches transform writes inside rAF.
 * Automatically disabled on touch devices, low-power hardware, and prefers-reduced-motion.
 */
export function useTilt3D({ maxTilt = 7, scale = 1.015 } = {}) {
  const { isLowPower, isTouch, reducedMotion } = usePerformance();
  const rectRef = useRef(null);
  const rafRef = useRef(0);

  const disabled = isLowPower || isTouch || reducedMotion;

  const onMouseEnter = useCallback(
    (e) => {
      if (disabled) return;
      rectRef.current = e.currentTarget.getBoundingClientRect();
    },
    [disabled]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (disabled) return;
      const el = e.currentTarget;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const rect = rectRef.current || el.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width;
        const py = (clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * (maxTilt * 2);
        const rotateX = (0.5 - py) * (maxTilt * 2);

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;
        el.style.setProperty('--tilt-glow-x', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--tilt-glow-y', `${(py * 100).toFixed(1)}%`);
      });
    },
    [disabled, maxTilt, scale]
  );

  const onMouseLeave = useCallback(
    (e) => {
      rectRef.current = null;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      if (!disabled) {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    },
    [disabled]
  );

  return { onMouseEnter, onMouseMove, onMouseLeave };
}
