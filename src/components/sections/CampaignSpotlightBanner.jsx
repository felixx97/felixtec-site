import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../widgets/Icons';

export default function CampaignSpotlightBanner() {
  return (
    <section className="campaign-spotlight-section" aria-label="Campanhas em destaque">
      <div className="section-container">
        <div className="campaign-spotlight-grid">
          <Link to="/natal" className="campaign-spotlight-card is-natal">
            <div className="campaign-spotlight-text">
              <span className="campaign-spotlight-badge is-natal">✦ Especial de Natal &amp; Dezembro</span>
              <h3>Landing Pages por R$ 300 e Sites Profissionais por R$ 499</h3>
              <p>Condições promocionais de virada de ano com entrega rápida para profissionais liberais e empresas.</p>
            </div>
            <span className="campaign-spotlight-link is-natal">
              Ver Ofertas <ArrowRightIcon size={15} />
            </span>
          </Link>

          <Link to="/automacoes" className="campaign-spotlight-card is-auto">
            <div className="campaign-spotlight-text">
              <span className="campaign-spotlight-badge is-auto">⚡ Novo — Soluções B2B</span>
              <h3>Automação de Processos &amp; WhatsApp Inteligente</h3>
              <p>Conecte site, WhatsApp, CRM e planilhas para atender em segundos e eliminar retrabalho manual.</p>
            </div>
            <span className="campaign-spotlight-link is-auto">
              Conhecer Fluxos <ArrowRightIcon size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
