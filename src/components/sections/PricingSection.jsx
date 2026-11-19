import { PRICING_PLANS } from '../../data/pricing';
import { CheckIcon } from '../widgets/Icons';

export default function PricingSection({ variant = 'home' }) {
  return (
    <section className="pricing-section" id="precos">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Planos Comerciais</span>
          <h2 className="section-title">Uma solução para cada necessidade.</h2>
          <p className="section-subtitle">
            Desenvolvimento de alta qualidade com preços acessíveis. Compare e comprove a diferença de custos do mercado
            tradicional.
          </p>
        </div>

        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => {
            const href = variant === 'services' ? plan.whatsappServices : plan.whatsappHome;
            return (
              <div key={plan.id} className={`pricing-card${plan.popular ? ' popular' : ''}`}>
                {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
                <div className="pricing-header">
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="pricing-price-box">
                  <span className="pricing-market-price">{plan.marketPrice}</span>
                  <div className="pricing-promo-price">
                    <span className="pricing-currency">R$</span>
                    <span className="pricing-amount">{plan.price}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckIcon size={16} strokeWidth={2.5} />
                      <span>
                        {feat.text}
                        {feat.highlightBreak && (
                          <>
                            <br />
                            {feat.highlightBreak}
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pricing-btn ${plan.popular ? 'pricing-btn-primary' : 'pricing-btn-secondary'}`}
                >
                  {plan.ctaLabel}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

