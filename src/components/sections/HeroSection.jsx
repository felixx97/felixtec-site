import { buildWhatsAppUrl } from '../../data/siteConfig';
import { CheckIcon } from '../widgets/Icons';
import PythonIdeWidget from './PythonIdeWidget';

const HERO_WA_URL = buildWhatsAppUrl(
  'Olá, vi o anúncio e gostaria de garantir o orçamento promocional a partir de R$ 999,99'
);

export default function HeroSection({ onOpenOffer }) {
  const handleOfferClick = (e) => {
    if (e.target.closest('a') || e.target.closest('.btn-primary')) return;
    e.preventDefault();
    onOpenOffer();
  };

  return (
    <header className="hero-section" id="inicio">
      <div className="hero-container">
        <div className="hero-left-content">
          <h1 className="hero-title">
            <span className="hero-title-gradient">FélixTec</span>
          </h1>
          <h2 className="hero-subtitle">
            Programando o futuro do seu negócio. Sistemas, Apps e IAs que vendem no piloto automático.
          </h2>

          <div
            className="hero-offer-card glass-panel"
            role="button"
            tabIndex={0}
            aria-label="Abrir oferta exclusiva e portfólio"
            onClick={handleOfferClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenOffer();
              }
            }}
          >
            <div className="offer-badge">Oferta Exclusiva</div>
            <div className="offer-price-info">
              <span className="offer-price-market">
                Preço em agências tradicionais: <del>R$ 8.000 - R$ 25.000</del>
              </span>
              <div className="offer-price-promo">
                <span className="offer-price-label">A partir de:</span>
                <span className="offer-price-value">R$ 999,99</span>
              </div>
            </div>
            <div className="offer-features">
              <div className="offer-feature-bullet">
                <CheckIcon size={14} stroke="var(--accent-cyan)" strokeWidth={3} />
                <span>Código 100% puro com carregamento abaixo de 0.5s</span>
              </div>
              <div className="offer-feature-bullet">
                <CheckIcon size={14} stroke="var(--accent-cyan)" strokeWidth={3} />
                <span>Design exclusivo e focado em alta conversão</span>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <a href={HERO_WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Garantir Desconto Exclusivo
            </a>
          </div>
        </div>

        <div className="hero-right-animation">
          <PythonIdeWidget />
        </div>
      </div>
    </header>
  );
}

