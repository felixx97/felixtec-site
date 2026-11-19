import { buildWhatsAppUrl } from './siteConfig';

export const AUTOMACOES_META = {
  title: 'Automação de Processos & Sistemas Escaláveis | FélixTec',
  description:
    'Conecte seu site, WhatsApp, planilhas e CRM para atender mais rápido, eliminar trabalho manual repetitivo e escalar sua empresa sem aumentar a equipe. Soluções a partir de R$ 497.',
  url: 'https://felixtec.com.br/automacoes',
  ogTitle: 'Automações Inteligentes & Sistemas Escaláveis | FélixTec',
  ogDescription:
    'Pare de perder vendas e horas fazendo trabalho manual. Triagem no WhatsApp, integração Site → CRM/Planilhas, propostas automáticas e APIs sob medida.',
};

export const AUTOMACOES_WHATSAPP = {
  heroDirect: buildWhatsAppUrl(
    'Olá! Vim pela página de Automações (/automacoes) da FélixTec e quero automatizar processos na minha empresa.'
  ),
  diagnostic: buildWhatsAppUrl(
    'Olá! Vim pela página de Automações (/automacoes) da FélixTec e quero fazer o diagnóstico rápido de 2 minutos para identificar qual processo posso automatizar primeiro.'
  ),
};

export const FLOW_STEPS = [
  {
    id: 1,
    stepLabel: 'PASSO 01',
    title: 'Cliente envia mensagem',
    shortDesc: 'WhatsApp, formulário do site ou anúncio.',
    detailTitle: 'Captação imediata em qualquer canal',
    detailText:
      'Assim que um interessado envia mensagem no WhatsApp ou preenche um formulário no seu site — mesmo fora do horário comercial — o fluxo acorda instantaneamente em menos de 2 segundos.',
    metric: '< 2s de resposta',
    layerDepth: 0,
  },
  {
    id: 2,
    stepLabel: 'PASSO 02',
    title: 'Sistema organiza os dados',
    shortDesc: 'Triagem inteligente sem parecer robô travado.',
    detailTitle: 'Qualificação clara e natural',
    detailText:
      'O sistema identifica nome, serviço desejado, urgência e responde dúvidas frequentes de forma cordial, separando curiosos de clientes prontos para fechar.',
    metric: '100% padronizado',
    layerDepth: 1,
  },
  {
    id: 3,
    stepLabel: 'PASSO 03',
    title: 'Planilha / CRM atualiza',
    shortDesc: 'Registro automático sem copiar e colar.',
    detailTitle: 'Zero retrabalho de digitação',
    detailText:
      'Os dados entram automaticamente na sua planilha do Google, Notion, Pipefy, RD Station ou CRM interno com data, origem do lead e status — nada se perde no meio das conversas.',
    metric: '0h de digitação',
    layerDepth: 2,
  },
  {
    id: 4,
    stepLabel: 'PASSO 04',
    title: 'Alerta pronto no WhatsApp',
    shortDesc: 'Sua equipe recebe o resumo pronto para fechar.',
    detailTitle: 'Você só entra na hora da venda',
    detailText:
      'Você ou seu time recebe um aviso imediato no celular com o resumo completo do cliente, pronto para enviar a proposta ou agendar a reunião — além de lembretes automáticos de follow-up.',
    metric: '+3x velocidade comercial',
    layerDepth: 3,
  },
];

export const BEFORE_AFTER = {
  before: {
    badge: 'ANTES — OPERAÇÃO MANUAL',
    title: 'Tempo perdido e vendas esfriando na fila',
    items: [
      'Cliente manda mensagem e espera horas até alguém conseguir responder',
      'Leads e orçamentos perdidos no meio de dezenas de conversas no WhatsApp',
      'Equipe copiando e colando dados manualmente entre formulários, planilhas e PDFs',
      'Esquecimento de follow-up e lembretes de agendamento que viram faltas',
      'Para atender mais clientes, parece que só resta contratar mais pessoas',
    ],
  },
  after: {
    badge: 'DEPOIS — OPERAÇÃO AUTOMATIZADA FÉLIXTEC',
    title: 'Atendimento em segundos e processos organizados',
    items: [
      'Resposta imediata 24h por dia com triagem educada e objetiva',
      'Todos os contatos registrados automaticamente na planilha ou CRM com histórico',
      'Propostas, contratos e lembretes disparados no piloto automático sem erros',
      'Notificação direta no seu celular quando um lead quente está pronto para fechar',
      'Sua operação escala o volume de atendimentos mantendo a mesma equipe enxuta',
    ],
  },
};

export const AUTOMATION_SOLUTIONS = [
  {
    id: 'triagem-whatsapp',
    tag: 'Atendimento Rápido',
    title: 'Triagem e Atendimento Rápido no WhatsApp',
    pricePrefix: 'A partir de',
    price: 'R$ 497',
    description:
      'Recepção automática que acolhe o cliente em segundos, qualifica o pedido, responde dúvidas frequentes e encaminha tudo mastigado para você fechar.',
    highlights: [
      'Resposta imediata 24/7 sem deixar o cliente esfriar',
      'Coleta automática de nome, necessidade e melhor horário',
      'Encaminhamento organizado direto para o responsável',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Automações (/automacoes) da FélixTec e tenho interesse na solução de Triagem e Atendimento Rápido no WhatsApp (a partir de R$ 497).'
    ),
  },
  {
    id: 'integracao-crm',
    tag: 'Dados Organizados',
    title: 'Integração Site → CRM / Planilhas',
    pricePrefix: 'A partir de',
    price: 'R$ 597',
    description:
      'Todo formulário ou lead captado no seu site ou anúncios cai organizado automaticamente na sua planilha ou CRM com alerta instantâneo no seu celular.',
    highlights: [
      'Conexão direta com Google Sheets, Notion, Pipedrive, RD ou ERP',
      'Notificação instantânea via WhatsApp ou e-mail a cada novo lead',
      'Fim definitivo do "copia e cola" e de contatos esquecidos',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Automações (/automacoes) da FélixTec e tenho interesse na solução de Integração Site → CRM / Planilhas (a partir de R$ 597).'
    ),
  },
  {
    id: 'rotinas-propostas',
    tag: 'Produtividade Real',
    title: 'Automação de Rotinas, Propostas e Lembretes',
    pricePrefix: 'A partir de',
    price: 'R$ 797',
    description:
      'Geração automática de propostas/PDFs, envio de lembretes de agendamento e follow-up comercial programado para nenhuma oportunidade escapar.',
    highlights: [
      'PDFs de proposta e recibos preenchidos automaticamente',
      'Lembretes automáticos antes de reuniões e consultas (menos faltas)',
      'Follow-up educado para clientes que pediram orçamento',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Automações (/automacoes) da FélixTec e tenho interesse na Automação de Rotinas, Propostas e Lembretes (a partir de R$ 797).'
    ),
  },
  {
    id: 'sistemas-apis',
    tag: 'Escala Sob Medida',
    title: 'Sistemas Web & Integrações Sob Medida (APIs)',
    pricePrefix: 'Projeto personalizado',
    price: 'Sob diagnóstico',
    description:
      'Desenvolvimento de painéis internos, micro-SaaS ou conexões sob medida entre os sistemas e bancos de dados que sua empresa já utiliza hoje.',
    highlights: [
      'Painéis gerenciais rápidos com métricas reais da operação',
      'Integrações via APIs REST, webhooks, NodeJS, Python e SQL',
      'Arquitetura própria sem ficar refém de mensalidades infladas',
    ],
    whatsappUrl: buildWhatsAppUrl(
      'Olá! Vim pela página de Automações (/automacoes) da FélixTec e tenho interesse em Sistemas Web & Integrações Sob Medida (APIs) — gostaria de um diagnóstico.'
    ),
  },
];
