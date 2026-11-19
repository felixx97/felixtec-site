import { createContext, useContext, useEffect, useState } from 'react';

const PerformanceContext = createContext({
  tier: 'high',
  isLowPower: false,
  isTouch: false,
  reducedMotion: false,
});

function detectInitialEnvironment() {
  if (typeof window === 'undefined') {
    return { tier: 'high', isTouch: false, reducedMotion: false };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch =
    window.matchMedia('(max-width: 1024px)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches;

  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const lowHardware = cores <= 4 || memory <= 4;

  const tier = reducedMotion || lowHardware ? 'low' : 'high';
  return { tier, isTouch, reducedMotion };
}

export function PerformanceProvider({ children }) {
  const [env, setEnv] = useState(detectInitialEnvironment);

  // Sync data-perf attribute on <html>
  useEffect(() => {
    document.documentElement.dataset.perf = env.tier;
  }, [env.tier]);

  // Listen to reduced-motion & viewport pointer changes
  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchMq = window.matchMedia('(max-width: 1024px)');

    const syncEnv = () => {
      setEnv((prev) => {
        const reducedMotion = motionMq.matches;
        const isTouch =
          touchMq.matches ||
          window.matchMedia('(hover: none)').matches ||
          window.matchMedia('(pointer: coarse)').matches;
        const tier = reducedMotion ? 'low' : prev.tier;
        return { tier, isTouch, reducedMotion };
      });
    };

    motionMq.addEventListener('change', syncEnv);
    touchMq.addEventListener('change', syncEnv);
    return () => {
      motionMq.removeEventListener('change', syncEnv);
      touchMq.removeEventListener('change', syncEnv);
    };
  }, []);

  // Lightweight runtime FPS safeguard: if desktop starts in 'high' but sustains low FPS, auto-downgrade
  useEffect(() => {
    if (env.tier !== 'high' || env.isTouch) return;

    let rafId = 0;
    let frames = 0;
    let startTime = 0;
    let slowWindows = 0;
    let cancelled = false;

    const sample = (now) => {
      if (cancelled) return;
      if (!startTime) startTime = now;
      frames++;

      const elapsed = now - startTime;
      if (elapsed >= 1000) {
        const fps = (frames * 1000) / elapsed;
        if (fps < 48) {
          slowWindows++;
          if (slowWindows >= 1) {
            setEnv((prev) => ({ ...prev, tier: 'low' }));
            return;
          }
        } else {
          // Hardware is running smoothly — stop monitoring to consume 0% CPU
          return;
        }
        frames = 0;
        startTime = now;
      }

      rafId = requestAnimationFrame(sample);
    };

    // Start checking briefly after initial load settles
    const timer = setTimeout(() => {
      if (!document.hidden) {
        rafId = requestAnimationFrame(sample);
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [env.tier, env.isTouch]);

  return (
    <PerformanceContext.Provider
      value={{
        tier: env.tier,
        isLowPower: env.tier === 'low',
        isTouch: env.isTouch,
        reducedMotion: env.reducedMotion,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}

