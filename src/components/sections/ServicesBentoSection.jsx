import { useRef } from 'react';
import { BENTO_SERVICES } from '../../data/services';
import { useCardGlow } from '../../hooks/useCardGlow';
import { useInView } from '../../hooks/useInView';
import { ServiceVisual } from '../illustrations/ServiceVisuals';
import { ArrowRightIcon } from '../widgets/Icons';

function BentoCardIcon({ type }) {
  switch (type) {
    case 'webdev':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'automation':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'backend':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'traffic':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesBentoSection({ onSelectService }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const cardGlowHandlers = useCardGlow();

  return (
    <section
      className={`services-section${!inView ? ' offscreen-paused' : ''}`}
      id="diferenciais"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Nossas Soluções</span>
          <h2 className="section-title">Impulsionando negócios com tecnologia.</h2>
          <p className="section-subtitle">
            Conheça os diferenciais da Felix Tec e como implementamos tecnologia e desenvolvimento ágil.
          </p>
        </div>

        <div className="bento-grid">
          {BENTO_SERVICES.map((card) => (
            <div
              key={card.key}
              className={`bento-card${card.wide ? ' bento-wide' : ''} card-hover-tilt`}
              data-card={card.key}
              role="button"
              tabIndex={0}
              onClick={() => onSelectService(card.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService(card.key);
                }
              }}
              {...cardGlowHandlers}
            >
              <div className="bento-card-bg-glow" />
              <div className="bento-card-content">
                <div className="bento-card-icon">
                  <BentoCardIcon type={card.key} />
                </div>
                <h3 className="bento-card-title">{card.title}</h3>
                <p className="bento-card-desc">{card.description}</p>
                <div className="bento-card-footer">
                  <span className="bento-card-link">
                    Saber mais <ArrowRightIcon size={16} />
                  </span>
                </div>
              </div>

              <div className={`bento-card-visual ${card.visualClass}`}>
                <ServiceVisual type={card.key} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

