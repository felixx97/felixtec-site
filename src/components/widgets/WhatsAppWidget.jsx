import { useEffect, useRef, useState } from 'react';
import { buildWhatsAppUrl } from '../../data/siteConfig';
import { reportWhatsAppConversion, submitLeadWebhook } from '../../utils/analytics';
import { WhatsAppIcon } from './Icons';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }

    submitLeadWebhook({
      origem: 'Formulario_WhatsApp',
      nome: trimmedName,
      whatsapp: trimmedPhone,
      email: trimmedEmail,
    });

    const message = `Olá! Meu nome é ${trimmedName} (E-mail: ${trimmedEmail}, WhatsApp: ${trimmedPhone}). Gostaria de idealizar um projeto estratégico e solicitar um orçamento comercial com a FélixTec!`;
    const waUrl = buildWhatsAppUrl(message);

    reportWhatsAppConversion();
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setOpen(false);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div ref={containerRef}>
      <button
        type="button"
        id="ft-wa-float"
        title="Falar no WhatsApp"
        aria-label="Falar no WhatsApp"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <WhatsAppIcon size={32} fill="#fff" />
      </button>

      <form
        id="ft-wa-popup"
        className={open ? 'active' : ''}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          id="ft-wa-popup-close"
          title="Fechar"
          aria-label="Fechar popup do WhatsApp"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        <div id="ft-wa-popup-header">
          <WhatsAppIcon size={24} fill="#25D366" />
          <h4 id="ft-wa-popup-title">Iniciar conversa</h4>
        </div>

        <p>Olá! Insira suas informações para falar diretamente no meu WhatsApp comercial.</p>

        <input
          type="text"
          id="ft-wa-name"
          className="ft-wa-field"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          id="ft-wa-phone"
          className="ft-wa-field"
          placeholder="Seu WhatsApp (com DDD)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          id="ft-wa-email"
          className="ft-wa-field"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" id="ft-wa-popup-btn">
          <span>Iniciar Chat</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

