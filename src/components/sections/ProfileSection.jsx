import { PROFILE_DATA } from '../../data/profile';
import { renderRichText } from '../../utils/analytics';
import { CheckIcon } from '../widgets/Icons';

export default function ProfileSection() {
  return (
    <section className="profile-section" id="sobre-mim">
      <div className="profile-container">
        <div className="profile-info">
          <span className="section-tag">{PROFILE_DATA.tag}</span>
          <h2 className="profile-title">{PROFILE_DATA.title}</h2>
          <div className="profile-text">
            <p>
              Olá! Sou acadêmico e profissional de Tecnologia da Informação, atualmente no{' '}
              <strong>7º semestre de Ciência da Informação na UFSC</strong> (Universidade Federal de Santa Catarina).
              Trabalho ativamente com desenvolvimento de sistemas e arquitetura digital desde <strong>2021</strong>,
              aliando qualidade com soluções de mercado ágeis e de alta performance.
            </p>
            <p>
              Minha atuação foca no desenvolvimento de sistemas, automações inteligentes de rotinas comerciais
              (utilizando APIs e inteligências artificiais como Gemini e Claude) e na estruturação estratégica de bancos
              de dados relacionais e não relacionais. Como especialista técnico, crio soluções que convertem visitantes
              em clientes de forma previsível e automatizada.
            </p>
          </div>

          <ul className="profile-experience-list">
            {PROFILE_DATA.experiences.map((exp) => (
              <li key={exp.id} className="profile-experience-item">
                <div className="profile-experience-icon">
                  <CheckIcon size={12} strokeWidth={2.5} />
                </div>
                <div className="profile-experience-details">
                  <h4>{exp.title}</h4>
                  <p>{renderRichText(exp.descriptionParts)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-media-container">
          <div className="profile-photo-frame has-image">
            <img
              className="profile-photo"
              src={PROFILE_DATA.photo}
              alt={PROFILE_DATA.photoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

