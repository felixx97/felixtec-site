import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import RocketPartnerVisual from '../illustrations/RocketPartnerVisual';
import { CheckIcon } from '../widgets/Icons';

const PARTNER_POINTS = [
  'Parceria real: escutamos suas dores para desenhar a solução ideal.',
  'Flexibilidade técnica: projetos feitos sob medida para a sua necessidade.',
  'Navegação agradável: sites rápidos, intuitivos e fáceis de usar no celular.',
];

export default function DetailsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section
      className={`details-section${!inView ? ' offscreen-paused' : ''}`}
      id="detalhes"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="detail-row">
          <div className="detail-info scroll-reveal-left">
            <span className="detail-tag">Diferencial</span>
            <h3 className="detail-title">Seu parceiro de tecnologia. Idealizando e criando juntos.</h3>
            <p className="detail-desc">
              Acreditamos que um bom projeto nasce da escuta e da parceria. Antes de escrever qualquer linha de código,
              buscamos entender a fundo a sua realidade, os seus objetivos e como a tecnologia pode ser realmente útil
              para o seu dia a dia. Pensamos e desenhamos cada detalhe juntos para transformar suas ideias em soluções
              digitais eficientes.
            </p>
            <ul className="detail-features-list">
              {PARTNER_POINTS.map((point) => (
                <li key={point}>
                  <CheckIcon size={20} strokeWidth={2} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-visual scroll-reveal-right">
            <RocketPartnerVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

