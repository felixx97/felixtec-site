import { useState } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { submitLeadWebhook } from '../../utils/analytics';
import { ArrowRightIcon } from '../widgets/Icons';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !service || !message.trim()) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    setStatus('submitting');

    submitLeadWebhook({
      origem: 'Formulario_Footer',
      nome: name.trim(),
      email: email.trim(),
      servico: service,
      mensagem: message.trim(),
    });

    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setService('');
      setMessage('');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 900);
  };

  return (
    <section className="contact-section" id="contato">
      <div className="section-container contact-inner">
        <div className="contact-header">
          <span className="section-tag">Fale Conosco</span>
          <h2 className="section-title">Inicie sua transformação digital hoje.</h2>
          <p className="section-subtitle">
            Tire suas ideias do papel com o profissionalismo técnico e o minimalismo estético que sua marca merece.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <p>{SITE_CONFIG.email}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="info-content">
                <h4>WhatsApp</h4>
                <p>{SITE_CONFIG.whatsappDisplay}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                </svg>
              </div>
              <div className="info-content">
                <h4>Atendimento</h4>
                <p>{SITE_CONFIG.locationText}</p>
              </div>
            </div>
          </div>

          <form className="contact-form glass-panel" id="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  required
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Nome completo</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">E-mail</label>
              </div>
            </div>

            <div className="form-group">
              <select
                id="service-select"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="" disabled hidden />
                <option value="webdev">Desenvolvimento Web de alta performance</option>
                <option value="automation">Automação de Processos &amp; IA</option>
                <option value="traffic">Gestão de Tráfego &amp; Patrocínio Pago</option>
                <option value="all">Ecossistema Completo (Todos os serviços)</option>
              </select>
              <label htmlFor="service-select" className="select-label">
                Serviço de interesse
              </label>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                required
                rows="4"
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label htmlFor="message">Fale um pouco sobre o seu projeto...</label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              id="submit-btn"
              disabled={status !== 'idle'}
              style={
                status === 'success'
                  ? { background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }
                  : undefined
              }
            >
              {status === 'submitting' ? (
                <span>Processando...</span>
              ) : status === 'success' ? (
                <span>Solicitação Enviada!</span>
              ) : (
                <>
                  <span>Enviar Solicitação</span>
                  <ArrowRightIcon size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

