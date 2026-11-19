import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_CASES } from '../../data/cases';
import { buildWhatsAppUrl } from '../../data/siteConfig';

const OFFER_WA_URL = buildWhatsAppUrl(
  'Olá, gostaria de garantir minha oferta exclusiva a partir de R$ 999,99 que vi no portfólio'
);

export default function OfferModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    if (overlayRef.current && cardRef.current) {
      gsap.killTweensOf([overlayRef.current, cardRef.current]);
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.15)' }
      );
    }

    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="offer-modal-overlay active"
      id="offer-modal"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-modal-heading"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="offer-modal-card glass-panel" id="offer-modal-card" ref={cardRef}>
        <button
          type="button"
          className="offer-modal-close"
          id="offer-modal-close"
          title="Fechar"
          aria-label="Fechar modal de oferta"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="offer-modal-header">
          <div className="offer-modal-badge" style={{ marginBottom: 12 }}>
            Oferta Limitada
          </div>

          <div
            className="offer-highlight-card glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 28,
              borderRadius: 20,
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}
          >
            <div className="offer-highlight-price" style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <span
                className="offer-market-price"
                style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'line-through', display: 'block', marginBottom: 2 }}
              >
                Valor de Mercado em Agências:{' '}
                <del style={{ color: '#ff5f56', textDecoration: 'line-through' }}>R$ 8.000,00</del>
              </span>
              <div
                className="offer-promo-price"
                style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}
              >
                <span style={{ fontSize: 15, color: 'var(--text-secondary)', fontWeight: 500 }}>A partir de:</span>
                <strong
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  R$ 999,99
                </strong>
                <small
                  className="offer-footer-suffix"
                  style={{
                    fontSize: 11,
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'rgba(0, 210, 255, 0.08)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    border: '1px solid rgba(0, 210, 255, 0.15)',
                    marginLeft: 4,
                  }}
                >
                  Pagamentos em até 3x sem juros
                </small>
              </div>
            </div>

            <p
              className="offer-disclaimer"
              style={{
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                margin: 0,
                paddingTop: 12,
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                textAlign: 'center',
                width: '100%',
              }}
            >
              ⚠️ <strong>Nota:</strong> Este valor é inicial. O custo final varia de acordo com as funcionalidades
              empregadas, idealização e complexidade de cada projeto (seja para Automações de rotina, Lojas Virtuais
              completas, Gestão de Tráfego Pago ou Sites Institucionais de alta performance).
            </p>

            <div className="offer-highlight-action" style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, width: '100%' }}>
              <a
                href={OFFER_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary modal-cta-btn"
                style={{
                  width: '100%',
                  maxWidth: 400,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  padding: '14px 24px',
                  boxShadow: '0 4px 15px rgba(0, 113, 227, 0.35)',
                }}
              >
                Garantir Meu Desconto
              </a>
            </div>
          </div>

          <h2 className="offer-modal-title" id="offer-modal-heading">
            Portfólio &amp; Cases FélixTec
          </h2>
          <p className="offer-modal-subtitle" style={{ marginBottom: 24 }}>
            Engenharia de software moderna integrada a ecossistemas inteligentes para alavancar faturamento.
          </p>
        </div>

        <div className="offer-modal-body">
          <div className="projects-showcase-grid">
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="project-showcase-info">
                  <h3>{project.name}</h3>
                  <span className="project-category">{project.category}</span>
                  <p>{project.description}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-showcase-link">
                    Acessar Projeto &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

