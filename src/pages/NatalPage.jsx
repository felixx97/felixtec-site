import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChristmasLightsBar, SantaSleighBackdrop, SnowfallCanvas } from '../components/effects/ChristmasEffects';
import SantaFelixMascot from '../components/illustrations/SantaFelixMascot';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '../components/widgets/Icons';
import MobileSnapCarousel from '../components/widgets/MobileSnapCarousel';
import { usePerformance } from '../context/PerformanceContext';
import { PORTFOLIO_CASES } from '../data/cases';
import {
  NATAL_FAQS,
  NATAL_META,
  NATAL_NICHES,
  NATAL_OFFERS,
  NATAL_PORTFOLIO_IDS,
  NATAL_WHATSAPP,
} from '../data/natal';
import { usePageMeta } from '../hooks/usePageMeta';
import { useTilt3D } from '../hooks/useTilt3D';

gsap.registerPlugin(ScrollTrigger);

function NicheIcon({ id }) {
  switch (id) {
    case 'medicos':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M2 12h20" />
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
    case 'advogados':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v18M5 7h14M6 7l-2.5 6a3.5 3.5 0 0 0 5 0L6 7zM18 7l-2.5 6a3.5 3.5 0 0 0 5 0L18 7zM8 21h8" />
        </svg>
      );
    case 'contadores':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 15l3-3 3 2 4-5" />
          <path d="M7 8h4" />
        </svg>
      );
    case 'arquitetos':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 20h18M5 20V8l7-5 7 5v12M9 20v-6h6v6" />
        </svg>
      );
    default:
      return null;
  }
}

function OfferTiltCard({ offer }) {
  const tiltHandlers = useTilt3D({ maxTilt: 6, scale: 1.015 });

  return (
    <article
      className={`natal-offer-card${offer.featured ? ' is-featured' : ''}`}
      {...tiltHandlers}
    >
      <div className="natal-offer-sheen" aria-hidden="true" />
      <div className="natal-offer-top">
        <span className={`natal-offer-badge${offer.featured ? ' is-gold' : ''}`}>{offer.badge}</span>
        <span className="natal-offer-savings">{offer.savings}</span>
      </div>

      <h3 className="natal-offer-name">{offer.name}</h3>
      <p className="natal-offer-desc">{offer.description}</p>

      <div className="natal-offer-pricing">
        <span className="natal-offer-old">
          De <del>{offer.oldPrice}</del> por
        </span>
        <div className="natal-offer-price-row">
          <strong className="natal-offer-price">{offer.price}</strong>
          <span className="natal-offer-installment">ou até 3x sem juros</span>
        </div>
      </div>

      <ul className="natal-offer-features">
        {offer.features.map((item) => (
          <li key={item}>
            <CheckIcon size={16} stroke={offer.featured ? '#FDE68A' : '#B91C1C'} strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={offer.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`natal-offer-cta${offer.featured ? ' is-featured' : ''}`}
      >
        <WhatsAppIcon size={16} fill="currentColor" />
        <span>Quero este pacote</span>
      </a>
    </article>
  );
}

export default function NatalPage() {
  usePageMeta(NATAL_META);

  const pageRef = useRef(null);
  const nicheTabsRef = useRef(null);
  const { isLowPower, reducedMotion } = usePerformance();
  const [selectedNicheId, setSelectedNicheId] = useState(NATAL_NICHES[0].id);
  const [openFaq, setOpenFaq] = useState(0);

  const selectedNicheIdx = Math.max(
    0,
    NATAL_NICHES.findIndex((n) => n.id === selectedNicheId)
  );
  const selectedNiche = NATAL_NICHES[selectedNicheIdx] || NATAL_NICHES[0];

  const selectNicheByIndex = (idx) => {
    const wrapped = ((idx % NATAL_NICHES.length) + NATAL_NICHES.length) % NATAL_NICHES.length;
    setSelectedNicheId(NATAL_NICHES[wrapped].id);
    const tabEl = nicheTabsRef.current?.children?.[wrapped];
    tabEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  const natalPortfolio = NATAL_PORTFOLIO_IDS.map((id) =>
    PORTFOLIO_CASES.find((project) => project.id === id)
  ).filter(Boolean);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.natal-hero-animate', {
        opacity: 0,
        y: 22,
        stagger: 0.09,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.natal-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: isLowPower ? 16 : 28,
          duration: isLowPower ? 0.45 : 0.7,
          ease: 'power3.out',
          onComplete: () => gsap.set(el, { clearProps: 'transform' }),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [isLowPower, reducedMotion]);

  const scrollToOffers = (e) => {
    e.preventDefault();
    document.getElementById('pacotes-natal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="natal-page" ref={pageRef}>
      {/* 1. Barra Festiva de Urgência (sem menu tradicional para foco máximo em conversão) */}
      <div className="natal-urgency-bar" role="status">
        <div className="natal-urgency-inner">
          <span className="natal-urgency-star" aria-hidden="true">★</span>
          <p>
            <strong>Especial de Natal FélixTec:</strong> agenda reduzida de dezembro com condições exclusivas para
            começar o próximo ano estruturado.
          </p>
        </div>
      </div>

      {/* Mini Topo Limpo de Landing Page (apenas Marca + 1 CTA direto, sem rotas de fuga) */}
      <div className="natal-lp-topbar">
        <div className="section-container natal-lp-topbar-inner">
          <Link to="/" className="natal-brand-mark" aria-label="Voltar para o site FélixTec">
            <span className="natal-brand-dot" aria-hidden="true">✦</span>
            <span>FélixTec</span>
            <small>Natal</small>
          </Link>

          <a
            href={NATAL_WHATSAPP.heroDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="natal-topbar-cta"
          >
            <WhatsAppIcon size={15} fill="currentColor" />
            <span>Garantir Minha Vaga</span>
          </a>
        </div>
      </div>

      {/* 2. Hero Clara & Festiva (Vermelho, Branco Neve e Dourado + Pisca-Pisca + Trenó Animado + Dev Félix Noel) */}
      <header className="natal-hero">
        <SnowfallCanvas />
        <ChristmasLightsBar />
        <SantaSleighBackdrop />

        <div className="section-container natal-hero-grid">
          <div className="natal-hero-copy">
            <span className="natal-pill natal-hero-animate">
              <span aria-hidden="true">🎄</span>
              Edição Limitada de Dezembro
            </span>

            <h1 className="natal-hero-title natal-hero-animate">
              Comece o ano novo com seu site no ar e um{' '}
              <span className="natal-accent-shimmer">presente especial de Natal.</span>
            </h1>

            <p className="natal-hero-subtitle natal-hero-animate">
              Seu site, sistema ou automação rodando rápido e sem burocracia. Condições especiais de dezembro para{' '}
              <strong>Médicos, Advogados, Contadores, Arquitetos e Empresas</strong> fecharem mais clientes já na virada
              do ano.
            </p>

            <div className="natal-hero-actions natal-hero-animate">
              <a href="#pacotes-natal" className="natal-btn-primary" onClick={scrollToOffers}>
                <span>Ver Pacotes de Natal</span>
                <ArrowRightIcon size={17} />
              </a>
              <a
                href={NATAL_WHATSAPP.heroDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="natal-btn-secondary"
              >
                <WhatsAppIcon size={16} fill="currentColor" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            <div className="natal-hero-trust natal-hero-animate">
              <span>✓ Entrega rápida em 3 a 5 dias úteis</span>
              <span>✓ 50% só na entrega final</span>
              <span>✓ 30 dias de garantia</span>
            </div>

            <a
              href="#pacotes-natal"
              className="natal-mobile-scroll-cue natal-hero-animate"
              onClick={scrollToOffers}
              aria-label="Rolar para ver os pacotes de Natal"
            >
              <span>Deslize para ver os pacotes a partir de R$ 300</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>

          <div className="natal-hero-mascot-card natal-hero-animate">
            <div className="natal-card-sparkles" aria-hidden="true">
              <span className="ncs p1" />
              <span className="ncs p2" />
              <span className="ncs p3" />
              <span className="ncs p4" />
              <span className="ncs p5" />
              <span className="ncs p6" />
            </div>
            <div className="natal-ribbon-corner" aria-hidden="true">NATAL</div>
            <SantaFelixMascot
              size={158}
              badge="Dev Félix Noel em ação"
              speech="Estou programando sites e automações com preço de presente só neste dezembro!"
              showLaptop
            />
            <div className="natal-hero-mini-stats">
              <div>
                <strong>R$ 300</strong>
                <span>a partir de</span>
              </div>
              <div className="natal-stat-divider" />
              <div>
                <strong>Até 5 dias</strong>
                <span>para ir ao ar</span>
              </div>
              <div className="natal-stat-divider" />
              <div>
                <strong>3x s/ juros</strong>
                <span>ou Pix</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Filtro & Seção por Área de Atuação */}
      <section className="natal-section natal-niches-section" id="areas-natal">
        <div className="section-container">
          <div className="section-header natal-reveal">
            <span className="natal-section-tag">Exemplos Práticos por Profissão</span>
            <h2 className="natal-section-title">Feito sob medida para o seu mercado.</h2>
            <p className="natal-section-subtitle">
              Selecione sua área de atuação abaixo para ver exatamente o que entregamos para valorizar sua marca e
              gerar novos contatos todos os dias.
            </p>
          </div>

          <div className="natal-niche-rail-wrap natal-reveal">
            <button
              type="button"
              className="natal-rail-arrow"
              aria-label="Profissão anterior"
              onClick={() => selectNicheByIndex(selectedNicheIdx - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="natal-niche-tabs" ref={nicheTabsRef} role="tablist" aria-label="Áreas de atuação">
              {NATAL_NICHES.map((niche, idx) => (
                <button
                  key={niche.id}
                  type="button"
                  role="tab"
                  aria-selected={niche.id === selectedNicheId}
                  className={`natal-niche-tab${niche.id === selectedNicheId ? ' active' : ''}`}
                  onClick={() => selectNicheByIndex(idx)}
                >
                  <NicheIcon id={niche.id} />
                  <span>{niche.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="natal-rail-arrow"
              aria-label="Próxima profissão"
              onClick={() => selectNicheByIndex(selectedNicheIdx + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="natal-niche-spotlight natal-reveal" role="tabpanel">
            <div className="natal-niche-spotlight-main">
              <span className="natal-niche-kicker">{selectedNiche.label}</span>
              <h3>{selectedNiche.tagline}</h3>
              <p>{selectedNiche.description}</p>
              <ul className="natal-niche-deliverables">
                {selectedNiche.deliverables.map((item) => (
                  <li key={item}>
                    <CheckIcon size={16} stroke="#B91C1C" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="natal-niche-spotlight-side">
              <span className="natal-recommend-label">Pacote recomendado</span>
              <strong>{selectedNiche.recommendedPack}</strong>
              <p>Adaptamos cores, identidade visual e fluxo de atendimento exatamente ao perfil dos seus clientes.</p>
              <a
                href={selectedNiche.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="natal-btn-primary"
              >
                <WhatsAppIcon size={15} fill="currentColor" />
                <span>Pedir proposta para {selectedNiche.shortLabel}</span>
              </a>
            </div>
          </div>

          <div className="natal-niche-cards-grid natal-reveal">
            {NATAL_NICHES.map((niche) => (
              <button
                key={niche.id}
                type="button"
                className={`natal-niche-card${niche.id === selectedNicheId ? ' active' : ''}`}
                onClick={() => setSelectedNicheId(niche.id)}
              >
                <div className="natal-niche-card-icon">
                  <NicheIcon id={niche.id} />
                </div>
                <h4>{niche.label}</h4>
                <p>{niche.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tabela de Ofertas Promocionais de Dezembro */}
      <section className="natal-section natal-offers-section" id="pacotes-natal">
        <div className="section-container">
          <div className="section-header natal-reveal">
            <span className="natal-section-tag">Condições Especiais de Dezembro</span>
            <h2 className="natal-section-title">Pacotes Promocionais de Natal</h2>
            <p className="natal-section-subtitle">
              Valores especiais válidos somente para projetos reservados na agenda de dezembro. Escolha o pacote ideal e
              fale direto no WhatsApp.
            </p>
          </div>

          <div className="natal-reveal">
            <MobileSnapCarousel
              gridClass="natal-offers-grid"
              theme="natal"
              itemCount={NATAL_OFFERS.length}
              ariaLabel="Pacotes Promocionais de Natal"
            >
              {NATAL_OFFERS.map((offer) => (
                <OfferTiltCard key={offer.id} offer={offer} />
              ))}
            </MobileSnapCarousel>
          </div>
        </div>
      </section>

      {/* 4.5. Portfólio Real (Prova Social logo após os pacotes) */}
      <section className="natal-section natal-portfolio-section" id="portfolio-natal">
        <div className="section-container">
          <div className="section-header natal-reveal">
            <span className="natal-section-tag">Projetos Reais Entregues</span>
            <h2 className="natal-section-title">Veja a qualidade de quem já confiou na FélixTec</h2>
            <p className="natal-section-subtitle">
              Sites desenvolvidos sob medida, rápidos no celular e focados em gerar credibilidade e clientes. Clique em
              qualquer projeto para abrir ao vivo.
            </p>
          </div>

          <div className="natal-reveal">
            <MobileSnapCarousel
              gridClass="natal-portfolio-grid"
              theme="natal"
              itemCount={natalPortfolio.length}
              ariaLabel="Projetos do Portfólio"
            >
              {natalPortfolio.map((project) => (
                <article key={project.id} className="natal-portfolio-card">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="natal-portfolio-preview"
                    aria-label={`Abrir projeto ${project.name}`}
                  >
                    <div className="natal-browser-bar">
                      <span className="natal-dot red" />
                      <span className="natal-dot gold" />
                      <span className="natal-dot neutral" />
                      <span className="natal-browser-url">
                        {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </span>
                    </div>
                    <div className="natal-browser-screen">
                      <img src={project.image} alt={project.name} loading="lazy" decoding="async" />
                    </div>
                  </a>

                  <div className="natal-portfolio-body">
                    <span className="natal-portfolio-cat">{project.category}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="natal-portfolio-link"
                    >
                      <span>Acessar site ao vivo</span>
                      <ArrowRightIcon size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </MobileSnapCarousel>
          </div>
        </div>
      </section>

      {/* 5. Garantia & Perguntas Rápidas (FAQ) */}
      <section className="natal-section natal-faq-section" id="garantia-natal">
        <div className="section-container natal-closing-grid">
          <div className="natal-guarantee-card natal-reveal">
            <SantaFelixMascot
              size={126}
              badge="Garantia Direta FélixTec"
              speech="Você acompanha cada etapa e só quita o restante quando aprovar tudo!"
              showLaptop={false}
            />
            <h3>Transparência do início ao pós-entrega</h3>
            <p>
              Você conversa direto com o desenvolvedor, recebe prévia real para testar no celular e conta com{' '}
              <strong>30 dias de garantia técnica gratuita</strong> após a publicação.
            </p>
            <a
              href={NATAL_WHATSAPP.closingCta}
              target="_blank"
              rel="noopener noreferrer"
              className="natal-btn-primary"
            >
              <WhatsAppIcon size={16} fill="currentColor" />
              <span>Reservar minha vaga de dezembro</span>
            </a>
          </div>

          <div className="natal-faq-column natal-reveal">
            <span className="natal-section-tag">Perguntas Rápidas</span>
            <h2 className="natal-faq-heading">Dúvidas sobre pagamento, prazo e suporte</h2>

            <div className="natal-faq-list">
              {NATAL_FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q} className={`natal-faq-item${isOpen ? ' open' : ''}`}>
                    <button
                      type="button"
                      className="natal-faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    >
                      <span>{item.q}</span>
                      <span className="natal-faq-chevron" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && <p className="natal-faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mini Rodapé Limpo de Landing Page */}
      <footer className="natal-mini-footer">
        <div className="section-container natal-mini-footer-inner">
          <p>&copy; 2026 FélixTec. Campanha Especial de Natal e Virada Digital.</p>
          <div className="natal-mini-footer-links">
            <Link to="/">Site Principal</Link>
            <Link to="/automacoes">Automações</Link>
            <Link to="/politicas">Políticas &amp; Termos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
