import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_CASES } from '../../data/cases';
import { SERVICE_ARTICLES } from '../../data/services';
import { renderRichText } from '../../utils/analytics';
import { ModalFelixMascot } from '../illustrations/DevFelixMascot';

export default function ServiceModal({ serviceKey, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const article = serviceKey ? SERVICE_ARTICLES[serviceKey] : null;

  useEffect(() => {
    if (!article) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    if (overlayRef.current && cardRef.current) {
      gsap.killTweensOf([overlayRef.current, cardRef.current]);
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(
        cardRef.current,
        { scale: 0.88, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.1)' }
      );
    }

    return () => document.removeEventListener('keydown', handleKey);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="service-modal-overlay active"
      id="service-modal"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="service-modal-card glass-panel" id="service-modal-card" ref={cardRef}>
        <button
          type="button"
          className="service-modal-close"
          id="service-modal-close"
          title="Fechar"
          aria-label="Fechar detalhes do serviço"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="service-modal-header">
          <span className="section-tag" id="service-modal-tag">
            {article.tag}
          </span>
          <h2 className="service-modal-title" id="service-modal-title">
            {article.title}
          </h2>
        </div>

        <div className="service-modal-body" id="service-modal-body">
          {article.key === 'webdev' ? (
            <div className="article-webdev-layout">
              <div className="article-webdev-copy">
                <p className="article-webdev-lead">{article.lead}</p>

                {article.sections.map((section) => (
                  <div key={section.heading}>
                    <h4 className="article-webdev-heading">{section.heading}</h4>
                    <p className="article-webdev-sub">{section.intro}</p>
                    <ul className="article-webdev-list">
                      {section.bullets.map((b) => (
                        <li key={b.label}>
                          <span className="article-webdev-check">✓</span>
                          <strong>{b.label}</strong> {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="article-webdev-aside">
                <div className="article-mascot-card">
                  <div className="article-mascot-float">
                    <ModalFelixMascot />
                  </div>
                  <span className="article-mascot-label">Dev Félix</span>
                  <p className="article-mascot-desc">
                    Mascote FélixTec programando cada pixel com foco em design e usabilidade.
                  </p>
                </div>

                <div className="article-cases-box">
                  <span className="article-cases-title">Casos de Sucesso</span>
                  <div className="article-cases-grid">
                    {PORTFOLIO_CASES.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="article-case-thumb"
                      >
                        <img src={item.image} alt={item.shortName} loading="lazy" decoding="async" />
                        <div className="article-case-thumb-caption">
                          <span>{item.shortName}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p>{renderRichText(article.introParagraph)}</p>
              <h4>{article.middleHeading}</h4>
              <p>{renderRichText(article.middleParagraph)}</p>
              <h4>{article.benefitsHeading}</h4>
              <ul>
                {article.benefits.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}</strong> {item.text}
                  </li>
                ))}
              </ul>
              <p>{article.closingParagraph}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

