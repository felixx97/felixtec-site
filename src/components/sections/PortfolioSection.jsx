import { useCallback, useEffect, useRef, useState } from 'react';
import { usePerformance } from '../../context/PerformanceContext';
import { PORTFOLIO_CASES } from '../../data/cases';
import { useInView } from '../../hooks/useInView';

const AUTOPLAY_DELAY = 3500;

function getItemsPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth > 1024) return 3;
  if (window.innerWidth > 768) return 2;
  return 1;
}

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const { reducedMotion } = usePerformance();
  const inView = useInView(sectionRef, { rootMargin: '100px 0px', threshold: 0.05 });

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const totalCards = PORTFOLIO_CASES.length;
  const maxIndex = Math.max(0, totalCards - itemsPerView);

  // Sync items per view on resize
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const nextItems = getItemsPerView();
        setItemsPerView(nextItems);
        setCurrentIndex((prev) => Math.min(prev, Math.max(0, totalCards - nextItems)));
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [totalCards]);

  // Apply GPU translate3d offset cleanly whenever index or layout changes
  const syncTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = track.children[0].getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
  }, [currentIndex]);

  useEffect(() => {
    syncTransform();
  }, [syncTransform, itemsPerView]);

  // Autoplay only when section is visible, not hovered, and motion is allowed
  useEffect(() => {
    if (!inView || hovered || reducedMotion || maxIndex === 0) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [inView, hovered, reducedMotion, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="portfolio-section" id="portfolio" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Cases de Sucesso</span>
          <h2 className="section-title">Nossos Projetos &amp; Portfólio</h2>
          <p className="section-subtitle">
            Uma seleção de sites institucionais, landing pages de alta conversão e plataformas digitais desenvolvidas
            com performance e design premium.
          </p>
        </div>

        <div
          className="portfolio-carousel-wrapper"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button
            type="button"
            className="carousel-btn prev"
            id="portfolio-prev"
            aria-label="Projeto anterior"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="portfolio-carousel-container">
            <div className="portfolio-carousel-track" id="portfolio-track" ref={trackRef}>
              {PORTFOLIO_CASES.map((project) => (
                <div key={project.id} className="project-showcase-card glass-panel">
                  <div className="project-visual-wrapper">
                    <div className="project-mockup-placeholder">
                      <div className="browser-header">
                        <span className="browser-dot red" />
                        <span className="browser-dot yellow" />
                        <span className="browser-dot green" />
                      </div>
                      <div
                        className="browser-body"
                        style={{ padding: 0, overflow: 'hidden', display: 'block', width: '100%', height: '100%' }}
                      >
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="project-showcase-info">
                    <h3>{project.name}</h3>
                    <span className="project-category">{project.category}</span>
                    <p>{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-showcase-link"
                    >
                      Acessar Projeto &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-btn next"
            id="portfolio-next"
            aria-label="Próximo projeto"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
