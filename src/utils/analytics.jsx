import { SITE_CONFIG } from '../data/siteConfig';

export function reportWhatsAppConversion(callback) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    let called = false;
    const safeCallback = () => {
      if (called) return;
      called = true;
      if (callback) callback();
    };

    window.gtag('event', 'conversion', {
      send_to: SITE_CONFIG.googleAdsConversionId,
      event_callback: safeCallback,
    });

    if (callback) {
      setTimeout(safeCallback, 900);
    }
    return true;
  }

  if (callback) callback();
  return false;
}

export function submitLeadWebhook(payload) {
  return fetch(SITE_CONFIG.sheetsWebhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).catch((err) => console.error('Erro ao registrar lead:', err));
}

export function renderRichText(parts) {
  if (!Array.isArray(parts)) return parts;
  return parts.map((part, idx) => {
    if (typeof part === 'string') return part;
    if (part.strong) return <strong key={idx}>{part.strong}</strong>;
    if (part.em) return <em key={idx}>{part.em}</em>;
    return null;
  });
}

