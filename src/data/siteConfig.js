export const SITE_CONFIG = {
  brand: 'FélixTec',
  email: 'contato@felixtec.com.br',
  whatsappNumber: '5547989224775',
  whatsappDisplay: '+55 (47) 98922-4775',
  locationText: 'Remoto para todo o Brasil e exterior.',
  googleAdsConversionId: 'AW-17907993497/l-bMCIKIsbccEJmXmdtC',
  sheetsWebhookUrl:
    'https://script.google.com/macros/s/AKfycby2ReFA66FpTSvlCTdQuI3buSn_KrZWEDbMwTwWus_32yJSryICn2WsNhaqErCepdnyuA/exec',
};

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: 'Início', to: '/#inicio', hash: 'inicio' },
  { label: 'Planos', to: '/#precos', hash: 'precos' },
  { label: 'Portfólio', to: '/#portfolio', hash: 'portfolio' },
  { label: 'Serviços', to: '/servicos', hash: null },
  { label: 'Automações', to: '/automacoes', hash: null },
  { label: 'Ofertas de Natal', to: '/natal', hash: null, highlight: 'natal' },
  { label: 'Contato', to: '/#contato', hash: 'contato' },
];

export const GAMING_LINKS = [
  {
    id: 'steam',
    label: 'Steam (Cód: 1623179030)',
    href: 'https://s.team/p/jbqw-qwcj/grpcdqmq',
  },
  {
    id: 'discord',
    label: 'Discord (@abrahammfelixx)',
    href: 'https://discord.com/users/835327536770711573',
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abra%C3%A3o-f%C3%A9lix-968b4a1a8/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/abrahammfelixx/',
  },
  ...GAMING_LINKS,
];

