import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { POLICY_SECTIONS } from '../data/policies';
import { renderRichText } from '../utils/analytics';

export default function PoliciesPage() {
  useEffect(() => {
    document.title = 'Políticas de Privacidade & Termos | FélixTec';
  }, []);

  return (
    <div>
      <header className="services-hero policies-hero">
        <div className="section-container policies-hero-container">
          <span className="section-tag">Transparência &amp; Conformidade</span>
          <h1 className="section-title policies-hero-title">Políticas &amp; Termos de Uso</h1>
          <p className="section-subtitle policies-hero-subtitle">
            Garantimos a proteção das informações e a total clareza na prestação dos nossos serviços de desenvolvimento
            sob medida.
          </p>
        </div>
      </header>

      <main className="services-grid-container policies-main">
        <div className="section-container policies-stack">
          <div className="policies-tabs">
            {POLICY_SECTIONS.map((sec) => (
              <a key={sec.id} href={`#${sec.id}`} className="policy-tab-link">
                {sec.tabLabel}
              </a>
            ))}
          </div>

          {POLICY_SECTIONS.map((sec) => (
            <section key={sec.id} id={sec.id} className="glass-panel policy-card">
              <div className="policy-card-accent" />
              <span className="section-tag policy-card-tag">{sec.tag}</span>
              <h2 className="policy-card-title">{sec.title}</h2>

              <div className="policy-card-body">
                <p>{renderRichText(sec.intro)}</p>
                {sec.subsections.map((sub) => (
                  <div key={sub.heading}>
                    <h3>{sub.heading}</h3>
                    <p>{renderRichText(sub.body)}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <Link to="/" className="policies-back-link">
            ← Voltar para o Início
          </Link>
        </div>
      </main>
    </div>
  );
}

