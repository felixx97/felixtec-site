import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FelixMascotGuide from '../components/illustrations/FelixMascotGuide';
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from '../components/widgets/Icons';
import MobileSnapCarousel from '../components/widgets/MobileSnapCarousel';
import { usePerformance } from '../context/PerformanceContext';
import {
  AUTOMACOES_META,
  AUTOMACOES_WHATSAPP,
  AUTOMATION_SOLUTIONS,
  BEFORE_AFTER,
  FLOW_STEPS,
} from '../data/automacoes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useTilt3D } from '../hooks/useTilt3D';

gsap.registerPlugin(ScrollTrigger);

function FlowStepIcon({ id }) {
  switch (id) {
    case 1:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 2:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 3:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 4:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    default:
      return null;
  }
}

function SolutionCard({ solution }) {
  const tiltHandlers = useTilt3D({ maxTilt: 5.5, scale: 1.015 });

  return (
    <article className="auto-solution-card" {...tiltHandlers}>
      <div className="auto-solution-top">
        <span className="auto-solution-tag">{solution.tag}</span>
        <div className="auto-solution-price-block">
          <span className="auto-solution-price-prefix">{solution.pricePrefix}</span>
          <strong className="auto-solution-price">{solution.price}</strong>
        </div>
      </div>

      <h3 className="auto-solution-title">{solution.title}</h3>
      <p className="auto-solution-desc">{solution.description}</p>

      <ul className="auto-solution-list">
        {solution.highlights.map((item) => (
          <li key={item}>
            <CheckIcon size={16} stroke="#0EA5E9" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={solution.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="auto-solution-cta"
      >
        <WhatsAppIcon size={15} fill="currentColor" />
        <span>Solicitar esta automação</span>
      </a>
    </article>
  );
}

export default function AutomacoesPage() {
  usePageMeta(AUTOMACOES_META);

  const pageRef = useRef(null);
  const { isLowPower, reducedMotion } = usePerformance();
  const [activeStepId, setActiveStepId] = useState(1);

  const activeStep = FLOW_STEPS.find((s) => s.id === activeStepId) || FLOW_STEPS[0];

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.auto-hero-animate', {
        opacity: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.auto-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: isLowPower ? 16 : 30,
          duration: isLowPower ? 0.45 : 0.7,
          ease: 'power3.out',
          onComplete: () => gsap.set(el, { clearProps: 'transform' }),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [isLowPower, reducedMotion]);

  const scrollToExamples = (e) => {
    e.preventDefault();
    document.getElementById('fluxo-pratico')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="auto-page" ref={pageRef}>
      {/* 1. Hero Section */}
      <header className="auto-hero">
        <div className="auto-ambient-orb auto-orb-cyan" aria-hidden="true" />
        <div className="auto-ambient-orb auto-orb-indigo" aria-hidden="true" />

        <div className="section-container auto-hero-grid">
          <div className="auto-hero-copy">
            <span className="auto-tag auto-hero-animate">AUTOMAÇÃO INTELIGENTE &amp; SISTEMAS ESCALÁVEIS</span>
            <h1 className="auto-hero-title auto-hero-animate">
              Pare de perder vendas e horas do seu dia fazendo{' '}
              <span className="auto-gradient-text">trabalho manual repetitivo.</span>
            </h1>
            <p className="auto-hero-subtitle auto-hero-animate">
              Conectamos seu site, WhatsApp, planilhas e ferramentas para sua operação atender mais rápido e escalar sem
              precisar aumentar a equipe.
            </p>

            <div className="auto-hero-actions auto-hero-animate">
              <a
                href={AUTOMACOES_WHATSAPP.heroDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="auto-btn-primary"
              >
                <WhatsAppIcon size={16} fill="currentColor" />
                <span>Quero Automatizar Meu Processo</span>
              </a>
              <a href="#fluxo-pratico" className="auto-btn-secondary" onClick={scrollToExamples}>
                <span>Ver Exemplos Práticos</span>
                <ArrowRightIcon size={16} />
              </a>
            </div>
          </div>

          <div className="auto-hero-guide-card auto-hero-animate">
            <FelixMascotGuide
              theme="automacoes"
              size={140}
              badge="Consultor Digital FélixTec"
              speech="Clique nos passos abaixo e veja na prática como um atendimento automático trabalha 24h por você!"
            />
          </div>
        </div>
      </header>

      {/* Interactive 3D Layered Workflow Diagram */}
      <section className="auto-section auto-flow-section" id="fluxo-pratico">
        <div className="section-container">
          <div className="section-header auto-reveal">
            <span className="auto-section-tag">Sem Tecniquês — Veja na Prática</span>
            <h2 className="section-title">Como um fluxo automatizado funciona no dia a dia</h2>
            <p className="auto-section-subtitle">
              Toque ou passe o mouse em cada etapa abaixo para ver o caminho automático de um novo cliente até o seu
              fechamento.
            </p>
          </div>

          <div className="auto-flow-stage auto-reveal">
            <MobileSnapCarousel
              gridClass="auto-flow-3d-track"
              theme="auto"
              itemCount={FLOW_STEPS.length}
              ariaLabel="Etapas do fluxo automatizado"
              onActiveChange={(idx) => {
                if (FLOW_STEPS[idx]) setActiveStepId(FLOW_STEPS[idx].id);
              }}
            >
              {FLOW_STEPS.map((step, idx) => {
                const isActive = step.id === activeStepId;
                return (
                  <div key={step.id} className="auto-flow-node-wrapper">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`auto-flow-node${isActive ? ' active' : ''}`}
                      onClick={() => setActiveStepId(step.id)}
                      onMouseEnter={() => setActiveStepId(step.id)}
                    >
                      <div className="auto-flow-node-head">
                        <span className="auto-flow-step-num">{step.stepLabel}</span>
                        <span className="auto-flow-icon">
                          <FlowStepIcon id={step.id} />
                        </span>
                      </div>
                      <h3>{step.title}</h3>
                      <p>{step.shortDesc}</p>
                      <span className="auto-flow-metric">{step.metric}</span>
                    </button>

                    {idx < FLOW_STEPS.length - 1 && (
                      <div className="auto-flow-connector" aria-hidden="true">
                        <span className="auto-flow-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </MobileSnapCarousel>

            <div className="auto-flow-detail-panel" role="tabpanel">
              <div className="auto-flow-detail-badge">
                <span>{activeStep.stepLabel}</span>
                <strong>{activeStep.metric}</strong>
              </div>
              <div className="auto-flow-detail-body">
                <h4>{activeStep.detailTitle}</h4>
                <p>{activeStep.detailText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Comparativo Visual: Antes vs. Depois */}
      <section className="auto-section auto-compare-section">
        <div className="section-container">
          <div className="section-header auto-reveal">
            <span className="auto-section-tag">Antes vs. Depois</span>
            <h2 className="section-title">A diferença real na rotina da sua empresa.</h2>
            <p className="auto-section-subtitle">
              Veja o que muda quando tarefas repetitivas deixam de depender de memória e digitação manual.
            </p>
          </div>

          <div className="auto-compare-grid auto-reveal">
            <div className="auto-compare-card is-before">
              <span className="auto-compare-badge is-before">{BEFORE_AFTER.before.badge}</span>
              <h3>{BEFORE_AFTER.before.title}</h3>
              <ul>
                {BEFORE_AFTER.before.items.map((item) => (
                  <li key={item}>
                    <span className="auto-compare-mark is-before" aria-hidden="true">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="auto-compare-card is-after">
              <span className="auto-compare-badge is-after">{BEFORE_AFTER.after.badge}</span>
              <h3>{BEFORE_AFTER.after.title}</h3>
              <ul>
                {BEFORE_AFTER.after.items.map((item) => (
                  <li key={item}>
                    <span className="auto-compare-mark is-after" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Soluções Práticas & Escaláveis */}
      <section className="auto-section auto-solutions-section" id="solucoes-automacao">
        <div className="section-container">
          <div className="section-header auto-reveal">
            <span className="auto-section-tag">Soluções Práticas &amp; Escaláveis</span>
            <h2 className="section-title">Comece pelo gargalo que mais consome seu tempo.</h2>
            <p className="section-subtitle">
              Implantações rápidas, sob medida e sem mensalidades abusivas — pensadas para se pagarem já nas primeiras
              semanas.
            </p>
          </div>

          <div className="auto-reveal">
            <MobileSnapCarousel
              gridClass="auto-solutions-grid"
              theme="auto"
              itemCount={AUTOMATION_SOLUTIONS.length}
              ariaLabel="Soluções de Automação"
            >
              {AUTOMATION_SOLUTIONS.map((sol) => (
                <SolutionCard key={sol.id} solution={sol} />
              ))}
            </MobileSnapCarousel>
          </div>
        </div>
      </section>

      {/* 4. Bloco de Diagnóstico Rápido com Mascote */}
      <section className="auto-section auto-diagnostic-section">
        <div className="section-container">
          <div className="auto-diagnostic-card auto-reveal">
            <div className="auto-diagnostic-mascot">
              <FelixMascotGuide
                theme="automacoes"
                size={124}
                badge="Diagnóstico Gratuito"
                speech="Em 2 minutos eu te digo o que automatizar primeiro!"
              />
            </div>

            <div className="auto-diagnostic-copy">
              <span className="auto-section-tag">Diagnóstico Rápido</span>
              <h2>Não sabe por onde começar?</h2>
              <p>
                Me conte em 2 minutos qual tarefa mais consome tempo na sua empresa hoje e eu desenho a solução ideal —
                sem compromisso e sem termos técnicos complicados.
              </p>
              <a
                href={AUTOMACOES_WHATSAPP.diagnostic}
                target="_blank"
                rel="noopener noreferrer"
                className="auto-btn-primary"
              >
                <WhatsAppIcon size={16} fill="currentColor" />
                <span>Fazer Diagnóstico Gratuito no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
