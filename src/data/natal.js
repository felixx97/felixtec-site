import { buildWhatsAppUrl } from './siteConfig';

export const NATAL_META = {
  title: 'Coloque seu Site Profissional no Ar Antes do Ano Virar | Especial de Natal FélixTec',
  description:
    'Condição exclusiva de dezembro: Landing Pages por R$ 300, Sites Profissionais por R$ 499 e Automações sob medida com entrega rápida em até 5 dias úteis. Garanta sua vaga!',
  url: 'https://felixtec.com.br/natal',
  ogTitle: '🎄 Coloque seu Site Profissional no Ar Antes do Ano Virar | Especial de Natal FélixTec',
  ogDescription:
    'Condição exclusiva de dezembro: Landing Pages por R$ 300, Sites Profissionais por R$ 499 e Automações sob medida com entrega rápida em até 5 dias. Ideal para Médicos, Advogados, Contadores, Arquitetos e Empresas. Clique e garanta sua vaga!',
  ogImage: 'https://felixtec.com.br/og-natal.jpg?v=3',
};

export const NATAL_WHATSAPP = {
  heroDirect: buildWhatsAppUrl(
    'Olá! Vim pela página de Natal (/natal) da FélixTec e gostaria de aproveitar as condições especiais de dezembro para o meu projeto.'
  ),
  closingCta: buildWhatsAppUrl(
    'Olá! Vim pela página de Natal (/natal) da FélixTec, li a garantia e quero garantir minha vaga na agenda de dezembro!'
  ),
};

export const NATAL_PORTFOLIO_IDS = ['at-work', 'estelar', 'jukere'];

export const NATAL_NICHES = [
  {
    id: 'medicos',
    label: 'Médicos & Clínicas',
    shortLabel: 'Médicos',
    tagline: 'Credibilidade clínica e agenda cheia sem fricção',
    description:
      'Site institucional que passa confiança imediata, apresenta corpo clínico e especialidades com clareza e leva o paciente direto para o agendamento no WhatsApp.',
    deliverables: [
      'Apresentação clara de especialidades, convênios e localização',
      'Botão inteligente de agendamento direto no WhatsApp da recepção',
      'Design limpo, rápido no celular e pronto para anúncios no Google',
    ],
    recommendedPack: 'Site Profissional (R$ 499) ou Combo Virada Completa',
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec. Atuo na área de Médicos & Clínicas e quero saber qual pacote especial de dezembro melhor atende meu consultório.'
    ),
  },
  {
    id: 'advogados',
    label: 'Advogados & Escritórios',
    shortLabel: 'Advogados',
    tagline: 'Autoridade jurídica com captação qualificada',
    description:
      'Página de autoridade jurídica pensada para transmitir sobriedade, destacar áreas de atuação e realizar triagem inicial automática de casos pelo WhatsApp.',
    deliverables: [
      'Estrutura elegante alinhada à sobriedade e ética da advocacia',
      'Seções claras de áreas de atuação e perguntas frequentes',
      'Triagem inicial automática para filtrar demandas qualificadas',
    ],
    recommendedPack: 'Landing Page de Alta Conversão (R$ 300) ou Combo Virada Completa',
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec. Atuo na área de Advogados & Escritórios e quero conhecer as condições especiais de dezembro.'
    ),
  },
  {
    id: 'contadores',
    label: 'Contadores & Consultores',
    shortLabel: 'Contadores',
    tagline: 'Posicionamento moderno que atrai empresas recorrentes',
    description:
      'Portal moderno para apresentar seus planos mensais, facilitar pedidos de abertura de empresa e capturar leads empresariais prontos para migração.',
    deliverables: [
      'Comparativo visual de planos e serviços (MEI, Simples, Lucro Presumido)',
      'Fluxo rápido para pedido de abertura de empresa ou troca de contador',
      'Formulário inteligente integrado ao seu WhatsApp comercial',
    ],
    recommendedPack: 'Site Profissional (R$ 499) ou Mini-Sistema / Portal',
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec. Atuo na área de Contadores & Consultores e quero aproveitar a condição especial de dezembro.'
    ),
  },
  {
    id: 'arquitetos',
    label: 'Arquitetos & Designers',
    shortLabel: 'Arquitetos',
    tagline: 'Portfólio visual fluido pensado para encantar',
    description:
      'Portfólio visual sofisticado, ultrarrápido no celular e desenhado para valorizar cada projeto e atrair clientes de alto padrão.',
    deliverables: [
      'Galerias otimizadas em WebP que abrem instantaneamente sem perder nitidez',
      'Apresentação de projetos por categoria (residencial, comercial, interiores)',
      'Botão discreto para solicitação de orçamento e briefing rápido',
    ],
    recommendedPack: 'Site Profissional (R$ 499) ou Mini-Sistema de Portfólio',
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec. Atuo na área de Arquitetos & Designers e quero aproveitar a oferta de dezembro para meu portfólio.'
    ),
  },
];

export const NATAL_OFFERS = [
  {
    id: 'site-profissional',
    name: 'Site Profissional',
    badge: 'Entrega em até 5 dias úteis',
    featured: false,
    oldPrice: 'R$ 1.300',
    price: 'R$ 499',
    savings: 'Economize R$ 801',
    description:
      'Presença digital completa, rápida e elegante para transmitir confiança imediata a quem pesquisa pelo seu serviço.',
    features: [
      'Até 3 páginas institucionais ou página para usuários cadastrados e gestão',
      'Layout moderno, exclusivo e 100% responsivo',
      'SEO local básico para aparecer melhor no Google',
      'Botão inteligente de WhatsApp e carregamento ultrarrápido',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec e tenho interesse no pacote Site Profissional (R$ 499).'
    ),
  },
  {
    id: 'landing-page',
    name: 'Landing Page de Alta Conversão',
    badge: 'Entrega em até 3 dias úteis',
    featured: false,
    oldPrice: 'R$ 950',
    price: 'R$ 300',
    savings: 'Economize R$ 650',
    description:
      'Página focada em vender um serviço específico ou campanha, ideal para Google Ads, Instagram, Facebook e LinkedIn.',
    features: [
      'Copy estruturada com foco em conversão de leads',
      'Design mobile-first que abre em menos de 1 segundo',
      'Rastreamento pronto para Google Ads e Meta Pixel',
      'Botões estratégicos de WhatsApp e formulário',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec e tenho interesse no pacote Landing Page de Alta Conversão (R$ 300).'
    ),
  },
  {
    id: 'mini-sistema',
    name: 'Mini-Sistema / Portal Sob Medida',
    badge: 'Entrega rápida',
    featured: false,
    oldPrice: 'R$ 1.900',
    price: 'R$ 1.097',
    savings: 'Economize R$ 803',
    description:
      'Sistema web enxuto feito para resolver um gargalo real do seu negócio sem mensalidades caras de ferramentas prontas.',
    features: [
      'Agendamentos, catálogo interativo ou área do cliente',
      'Painel de controle interno simples e prático de usar',
      'Banco de dados organizado e acesso seguro',
      'Arquitetura escalável pronta para crescer no próximo ano',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec e tenho interesse no pacote Mini-Sistema / Portal Sob Medida (R$ 1.097).'
    ),
  },
  {
    id: 'combo-virada',
    name: 'Combo Virada Completa',
    badge: '★ Mais Escolhido',
    featured: true,
    oldPrice: 'R$ 1.750',
    price: 'R$ 997',
    savings: 'Economize R$ 753',
    description:
      'O pacote completo para virar o ano posicionado, encontrado no Google e atendendo novos leads no piloto automático.',
    features: [
      'Site Profissional completo e responsivo',
      'Otimização completa do seu Google Meu Negócio',
      'Automação inicial de recepção no WhatsApp',
      'Prioridade na agenda reduzida de dezembro',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Natal (/natal) da FélixTec e tenho interesse no Combo Virada Completa, o Mais Escolhido (R$ 997).'
    ),
  },
];

export const NATAL_FAQS = [
  {
    q: 'Como funciona o pagamento na condição especial de dezembro?',
    a: 'Trabalhamos de forma simples e transparente: 50% na aprovação do briefing para reservar sua vaga na agenda de dezembro e os outros 50% somente na entrega final validada por você. Aceitamos Pix e parcelamento no cartão em até 3x sem juros.',
  },
  {
    q: 'Os prazos de 3 a 5 dias úteis são reais mesmo em dezembro?',
    a: 'Sim! Justamente por isso a agenda promocional de dezembro é limitada a poucas vagas simultâneas. Assim que recebemos seus dados básicos (logo, textos principais ou uma breve conversa de 15 minutos), iniciamos imediatamente.',
  },
  {
    q: 'E se eu ainda não tiver domínio, hospedagem ou textos prontos?',
    a: 'Sem problema algum. Orientamos passo a passo na contratação do domínio no seu nome (para você ser 100% dono) e estruturamos toda a comunicação visual e os textos comerciais junto com você sem burocracia.',
  },
  {
    q: 'Existe suporte e garantia depois que o site ou sistema vai ao ar?',
    a: 'Sim! Todo projeto entregue conta com 30 dias de garantia técnica gratuita para ajustes finos e suporte direto pelo WhatsApp com quem desenvolveu o seu projeto, sem robôs travados ou tickets demorados.',
  },
];
