import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ft_cookie_consent_accepted';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  const handleAccept = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage quota errors
    }
    setTimeout(() => setMounted(false), 550);
  };

  return (
    <div id="ft-cookie-banner" className={visible ? 'active' : ''} role="dialog" aria-label="Aviso de cookies">
      <div id="ft-cookie-banner-title-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00d2ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h4 id="ft-cookie-banner-title">Segurança &amp; Privacidade</h4>
      </div>
      <p>
        Utilizamos cookies essenciais para analisar o tráfego de visitas e medir a segurança deste site. Ao continuar
        navegando, você concorda com nossos <Link to="/politicas#termos">Termos de Uso</Link> e{' '}
        <Link to="/politicas#privacidade">Política de Privacidade</Link>.
      </p>
      <button type="button" id="ft-cookie-banner-btn" onClick={handleAccept}>
        Aceitar
      </button>
    </div>
  );
}

