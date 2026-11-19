import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Desktop: renders children inside the exact desktop gridClass (unchanged).
 * Mobile (<= 768px): turns the grid into a silky-smooth native scroll-snap
 * horizontal carousel with sleek Prev/Next arrows and pagination dots.
 */
export default function MobileSnapCarousel({
  gridClass = '',
  theme = 'dark', // 'dark' | 'natal' | 'auto'
  itemCount = 0,
  ariaLabel = 'Carrossel de cards',
  onActiveChange,
  children,
}) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (targetIdx) => {
      const track = trackRef.current;
      if (!track || !track.children.length) return;
      const clamped = ((targetIdx % itemCount) + itemCount) % itemCount;
      const child = track.children[clamped];
      if (child) {
        const left = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;
        track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
      }
      setActiveIndex(clamped);
      if (onActiveChange) onActiveChange(clamped);
    },
    [itemCount, onActiveChange]
  );

  // Keep active dot synced with native thumb swiping
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const child = track.children[i];
          const childCenter = child.offsetLeft + child.clientWidth / 2;
          const dist = Math.abs(center - childCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
        setActiveIndex((prev) => {
          if (prev !== closest && onActiveChange) onActiveChange(closest);
          return closest;
        });
      });
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onActiveChange]);

  return (
    <div className={`msc-wrapper msc-theme-${theme}`}>
      <div className={`msc-track ${gridClass}`} ref={trackRef} aria-label={ariaLabel}>
        {children}
      </div>

      {itemCount > 1 && (
        <div className="msc-controls" aria-label={`Navegação de ${ariaLabel}`}>
          <button
            type="button"
            className="msc-arrow"
            aria-label="Anterior"
            onClick={() => scrollToIndex(activeIndex - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="msc-dots" role="tablist" aria-label="Selecionar item">
            {Array.from({ length: itemCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Ir para item ${idx + 1} de ${itemCount}`}
                className={`msc-dot${idx === activeIndex ? ' active' : ''}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            className="msc-arrow"
            aria-label="Próximo"
            onClick={() => scrollToIndex(activeIndex + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
