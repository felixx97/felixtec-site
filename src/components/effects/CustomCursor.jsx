import { useEffect, useRef } from 'react';
import { usePerformance } from '../../context/PerformanceContext';

const HOVERABLE_SELECTOR =
  'a, button, select, input, textarea, .flow-step, .bento-card, .btn-primary, .btn-secondary, .hero-offer-card, #ft-wa-float, #ft-wa-popup-close, #nav-cta-dropdown-btn, .article-case-thumb';

export default function CustomCursor() {
  const { isTouch, reducedMotion } = usePerformance();
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;
    let initialized = false;
    let rafId = 0;

    const tick = () => {
      rafId = 0;
      const speed = reducedMotion ? 1 : 0.18;
      outerX += (mouseX - outerX) * speed;
      outerY += (mouseY - outerY) * speed;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
      }

      // Stop animation loop automatically once settled — 0% CPU when mouse is idle
      if (Math.abs(mouseX - outerX) > 0.15 || Math.abs(mouseY - outerY) > 0.15) {
        rafId = requestAnimationFrame(tick);
      } else {
        outerX = mouseX;
        outerY = mouseY;
        if (outerRef.current) {
          outerRef.current.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
        }
      }
    };

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!initialized) {
        initialized = true;
        outerX = mouseX;
        outerY = mouseY;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest?.(HOVERABLE_SELECTOR)) {
        outerRef.current?.classList.add('hovering');
        innerRef.current?.classList.add('hovering');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest?.(HOVERABLE_SELECTOR)) {
        const next = e.relatedTarget;
        if (!next || !next.closest?.(HOVERABLE_SELECTOR)) {
          outerRef.current?.classList.remove('hovering');
          innerRef.current?.classList.remove('hovering');
        }
      }
    };

    const handleLeaveWindow = () => {
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    const handleEnterWindow = () => {
      if (outerRef.current) outerRef.current.style.opacity = '1';
      if (innerRef.current) innerRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseenter', handleEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseenter', handleEnterWindow);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch) return null;

  return (
    <>
      <div className="custom-cursor" id="custom-cursor" ref={outerRef} aria-hidden="true" />
      <div className="custom-cursor-dot" id="custom-cursor-dot" ref={innerRef} aria-hidden="true" />
    </>
  );
}

