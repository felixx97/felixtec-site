import { buildWhatsAppUrl } from './siteConfig';

export const PRICING_PLANS = [
  {
    id: 'landing-page',
    title: 'Landing Page / Site Pro',
    description:
      'Ideal para landing pages de alta conversão para tráfego pago ou sites institucionais minimalistas.',
    marketPrice: 'Valor de Mercado: R$ 5.000,00',
    price: '999,99',
    popular: false,
    ctaLabel: 'Comprar Agora',
    features: [
      { text: 'Código 100% puro ou ', highlightBreak: 'Low Code' },
      { text: 'Otimizado para Mobile & Desktop' },
      { text: 'Animações suaves de alta performance' },
      { text: 'Integração com WhatsApp & Tags' },
    ],
    whatsappHome: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano de Landing Page Pro no valor de R$ 999,99'
    ),
    whatsappServices: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano Landing Page Pro e agendar minha avaliação gratuita'
    ),
  },
  {
    id: 'ecommerce',
    title: 'Loja Virtual Completa',
    description:
      'Catálogo de produtos completo e dinâmico, focado em facilidade de compra e gestão de pedidos.',
    marketPrice: 'Valor de Mercado: R$ 12.000,00',
    price: '2.499,99',
    popular: false,
    ctaLabel: 'Comprar Agora',
    features: [
      { text: 'Catálogo interativo sob medida' },
      { text: 'Painel de gestão de pedidos simplificado' },
      { text: 'Checkout limpo otimizado para celular' },
      { text: 'Integrações com sistemas de pagamento' },
    ],
    whatsappHome: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano de Loja Virtual no valor de R$ 2.499,99'
    ),
    whatsappServices: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano Loja Virtual Completa e agendar minha avaliação gratuita'
    ),
  },
  {
    id: 'automation',
    title: 'Automação de Tarefas',
    description:
      'Elimine rotinas repetitivas interligando suas planilhas, formulários, alertas e envios de e-mails diários.',
    marketPrice: 'Valor de Mercado: R$ 8.000,00',
    price: '1.199,99',
    popular: true,
    badge: 'Mais Procurado',
    ctaLabel: 'Contratar Agora',
    features: [
      { text: 'Integração Planilhas / Formulários' },
      { text: 'Envio automático de alertas e e-mails' },
      { text: 'Configuração de robôs no n8n / Make' },
      { text: 'Economia de horas de trabalho manual' },
    ],
    whatsappHome: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano de Automação de Rotinas no valor de R$ 1.199,99'
    ),
    whatsappServices: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano Automação de Tarefas e agendar minha avaliação gratuita'
    ),
  },
  {
    id: 'ai-apps',
    title: 'IA & Apps Avançados',
    description:
      'Modelos de inteligência artificial de ponta integrados ao seu negócio, aplicativos web/desktop ou mobile.',
    marketPrice: 'Valor de Mercado: R$ 25.000,00',
    price: '3.499,99',
    popular: false,
    ctaLabel: 'Contratar Agora',
    features: [
      { text: 'Agentes de IA customizados (GPTs)' },
      { text: 'Análise de dados corporativos com IA' },
      { text: 'Desenvolvimento Desktop, Mobile ou Web' },
      { text: 'Suporte e infraestrutura especializada' },
    ],
    whatsappHome: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano de Agentes de IA e SaaS no valor de R$ 3.499,99'
    ),
    whatsappServices: buildWhatsAppUrl(
      'Olá, gostaria de solicitar um orçamento para o plano IA & Apps Avançados e agendar minha avaliação gratuita'
    ),
  },
];

