import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CodingMascotVisual from '../components/illustrations/CodingMascotVisual';
import { ServiceVisual } from '../components/illustrations/ServiceVisuals';
import PricingSection from '../components/sections/PricingSection';
import { CheckIcon } from '../components/widgets/Icons';
import { usePerformance } from '../context/PerformanceContext';
import { SERVICES_PAGE_ITEMS } from '../data/services';
import { buildWhatsAppUrl } from '../data/siteConfig';
import { useCardGlow } from '../hooks/useCardGlow';
import { renderRichText } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

const SESSION_WA_URL = buildWhatsAppUrl(
  'Olá, gostaria de agendar uma sessão estratégica para planejar meu projeto'
);

export default function ServicesPage() {
  const pageRef = useRef(null);
  const { isLowPower, reducedMotion } = usePerformance();
  const cardGlowHandlers = useCardGlow();

  useEffect(() => {
    document.title = 'Nossos Serviços | FélixTec';
  }, []);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.service-detail-card').forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: isMobile ? 'top 90%' : 'top 86%',
            once: true,
          },
          opacity: 0,
          x: isLowPower ? 0 : isMobile ? 30 : 70,
          y: isLowPower ? 24 : 0,
          rotation: isLowPower ? 0 : isMobile ? 2 : 0,
          duration: isLowPower ? 0.55 : 0.85,
          ease: 'power3.out',
          onComplete: () => gsap.set(panel, { clearProps: 'transform' }),
        });
      });

      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: { trigger: header, start: 'top 86%', once: true },
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
        });
      });

      gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          opacity: 0,
          y: isLowPower ? 20 : 40,
          scale: isLowPower ? 1 : 0.96,
          rotation: isLowPower ? 0 : index % 2 === 0 ? 1.2 : -1.2,
          duration: isLowPower ? 0.5 : 0.75,
          ease: 'power3.out',
          onComplete: () => gsap.set(card, { clearProps: 'transform' }),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [isLowPower, reducedMotion]);

  return (
    <div ref={pageRef}>
      <header className="services-hero">
        <div className="section-container services-hero-container">
          <div className="services-hero-text">
            <span className="section-tag">Nossa Expertise</span>
            <h1 className="section-title services-hero-title">Soluções Digitais.</h1>
            <p className="section-subtitle services-hero-subtitle">
              Transformo suas ideias em realidade digital através de um processo focado em resultados.{' '}
              <span className="hide-mobile">
                Seja um site ultra veloz, automações inteligentes para otimizar suas horas de trabalho ou campanhas
                estratégicas de tráfego, meu compromisso é entregar tecnologia limpa, robusta e sob medida para o seu
                negócio.
              </span>
            </p>
          </div>
          <CodingMascotVisual />
        </div>
      </header>

      <main className="services-grid-container">
        <div className="section-container services-grid-wrapper">
          {SERVICES_PAGE_ITEMS.map((service) => {
            const visualNode = (
              <div className={`visual-${service.key}${service.reverseOrder ? ' order-visual-right' : ''}`}>
                <ServiceVisual type={service.key} />
              </div>
            );

            const contentNode = (
              <div className={`service-detail-content${service.reverseOrder ? ' order-content-left' : ''}`}>
                <span className="section-tag" style={{ color: 'var(--accent-cyan)' }}>
                  {service.tag}
                </span>
                <h2 className="service-detail-title">{service.title}</h2>
                <p className="service-detail-desc">{renderRichText(service.description)}</p>
                <ul className="detail-features-list">
                  {service.features.map((feat) => (
                    <li key={feat}>
                      <CheckIcon size={18} strokeWidth={2.5} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-detail-actions">
                  <a
                    href={service.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Contratar Serviço
                  </a>
                  <div className="btn-secondary btn-ai-disabled">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0.5 }}
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Consultar IA</span>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={service.key}
                className="glass-panel card-hover-tilt service-detail-card"
                {...cardGlowHandlers}
              >
                {service.reverseOrder ? (
                  <>
                    {visualNode}
                    {contentNode}
                  </>
                ) : (
                  <>
                    {contentNode}
                    {visualNode}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <PricingSection variant="services" />

      <section className="cta-section services-cta-section">
        <div className="section-container services-cta-inner">
          <h2 className="services-cta-title">Pronto para transformar sua infraestrutura?</h2>
          <p className="services-cta-desc">
            Fale conosco diretamente e agende uma sessão estratégica para planejar suas soluções de web e automação
            comercial.
          </p>
          <a href={SESSION_WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Agendar Sessão Estratégica
          </a>
        </div>
      </section>
    </div>
  );
}

