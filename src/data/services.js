import { buildWhatsAppUrl } from './siteConfig';

export const BENTO_SERVICES = [
  {
    key: 'webdev',
    wide: true,
    title: 'Desenvolvimento Web & UI/UX',
    description:
      'Criação de sites, portfólios e landing pages modernas e sob medida. Foco em design atraente, animações fluidas e carregamento rápido para o seu negócio.',
    visualClass: 'visual-webdev',
  },
  {
    key: 'automation',
    wide: false,
    title: 'Automação & IA Generativa',
    description:
      'Criação de fluxos automatizados (n8n/Make) integrando IAs (Gemini, Claude) e Google AI Studio para escalar sua produtividade comercial.',
    visualClass: 'visual-automation',
  },
  {
    key: 'backend',
    wide: false,
    title: 'Backend & Bancos de Dados',
    description:
      'Estruturação de bancos de dados eficientes (SQL Server, MySQL, PostgreSQL) e APIs seguras sob NodeJS, Python e Docker.',
    visualClass: 'visual-backend',
  },
  {
    key: 'traffic',
    wide: true,
    title: 'Tráfego Pago & Meta/Google Ads',
    description:
      'Gestão de anúncios patrocinados (Google Ads, Facebook Meta Business Suite) e integração avançada de Tag Manager e Analytics para garantir ROI exponencial.',
    visualClass: 'visual-traffic',
  },
];

export const SERVICE_ARTICLES = {
  webdev: {
    key: 'webdev',
    tag: 'Desenvolvimento Web & UI/UX',
    title: 'Desenvolvimento Web & UI/UX',
    lead: 'Unimos design de interface refinado (UI) e usabilidade focada na experiência do usuário (UX) para criar páginas dinâmicas e atraentes. Desenvolvemos soluções sob medida que guiam seus clientes de forma natural e geram mais oportunidades de negócio.',
    sections: [
      {
        heading: 'Boas Práticas de UI/UX',
        intro: 'Um design premium coloca o cliente no centro de tudo. Cuidamos de cada detalhe visual e funcional:',
        bullets: [
          {
            label: 'Hierarquia Visual & Escaneabilidade:',
            text: 'Organização inteligente de tamanhos, cores e espaçamentos. As informações cruciais do seu negócio ganham destaque imediato, facilitando a leitura rápida.',
          },
          {
            label: 'Tipografia & Leitura Confortável:',
            text: 'Proporções tipográficas refinadas e contraste de cores perfeito, garantindo uma leitura leve, agradável e sem cansaço visual em qualquer tipo de tela.',
          },
          {
            label: 'Navegação Mobile Inteligente:',
            text: 'Layout desenhado sob medida para a área de alcance confortável dos dedos nos celulares, com botões bem espaçados para evitar toques errados.',
          },
          {
            label: 'Foco em Conversão e Vendas:',
            text: 'Botões de ação bem sinalizados e localizados nos melhores pontos da página para incentivar o visitante a iniciar uma conversa no WhatsApp com facilidade.',
          },
        ],
      },
      {
        heading: 'Desenvolvimento Inteligente & Sob Medida',
        intro: 'Oferecemos total flexibilidade técnica para construir a melhor versão do seu projeto:',
        bullets: [
          {
            label: 'Abordagem Híbrida (Código Puro ou Low-Code):',
            text: 'Desenvolvemos seu site programando o código do zero para máxima performance e exclusividade técnica, ou utilizando plataformas modernas de baixo código (Low-Code) que aceleram a entrega e permitem que você mesmo atualize textos e imagens facilmente.',
          },
          {
            label: 'Movimento & Elegância Visual:',
            text: 'Animações sutis e fluidas que reagem de forma inteligente às ações do usuário. A página ganha vida e transmite profissionalismo, credibilidade e sofisticação de alto nível.',
          },
          {
            label: 'Velocidade e Carregamento Rápido:',
            text: 'Páginas leves que carregam de forma ágil, diminuindo a desistência de novos clientes e melhorando muito a visibilidade da sua empresa nas buscas orgânicas do Google.',
          },
        ],
      },
    ],
  },
  automation: {
    key: 'automation',
    tag: 'Automação & IA Generativa',
    title: 'Sistemas Inteligentes no Piloto Automático',
    introParagraph: [
      'Conectamos as ferramentas essenciais do seu negócio (como CRM, planilhas e e-mails) a modelos de linguagem de inteligência artificial de ponta (',
      { strong: 'Gemini e Claude via Google AI Studio' },
      '). O objetivo é eliminar gargalos manuais e escalar a produtividade da sua empresa em até 80%.',
    ],
    middleHeading: 'Integrações & Processamento Inteligente',
    middleParagraph: [
      'Criamos pipelines inteligentes e fluxos automatizados com plataformas líderes como ',
      { strong: 'n8n e Make' },
      '. Desenvolvemos agentes de qualificação de leads, bots integrados para WhatsApp e sistemas que estruturam e processam dados não organizados de forma imediata.',
    ],
    benefitsHeading: 'Benefícios Estratégicos:',
    benefits: [
      {
        label: 'Economia de Tempo:',
        text: 'Reduza tarefas manuais e repetitivas em rotinas automáticas de frações de segundos.',
      },
      {
        label: 'Qualificação com IA:',
        text: 'Respostas contextuais, triagem e envio de alertas em tempo real.',
      },
      {
        label: 'IA Generativa Prática:',
        text: 'Conexão nativa com APIs das melhores LLMs do mercado global.',
      },
    ],
    closingParagraph:
      'Modernize sua estrutura operacional. Traga a potência das IAs modernas e APIs de automação robustas para trabalhar 24 horas por dia focando na geração de leads do seu negócio.',
  },
  backend: {
    key: 'backend',
    tag: 'Arquitetura & Engenharia',
    title: 'Backend Robusto & Bancos de Dados Seguros',
    introParagraph: [
      'Abaixo de uma bela interface visual, reside a engenharia lógica que garante a integridade, velocidade e segurança dos seus dados comerciais. Desenvolvemos soluções backend complexas focadas em alto desempenho, segurança de informação e estabilidade operacional.',
    ],
    middleHeading: 'Tecnologia & Bancos de Dados Relacionais',
    middleParagraph: [
      'Com forte experiência técnica desenvolvida em laboratórios acadêmicos e corporativos (UFSC Telemedicina e Paradigma Business), implementamos APIs performáticas sob o ecossistema ',
      { strong: 'NodeJS (Express/HapiJS) e Python' },
      ', aliadas a bancos de dados robustos como ',
      { strong: 'SQL Server, MySQL e PostgreSQL' },
      ' e ambientes isolados com ',
      { strong: 'Docker' },
      '.',
    ],
    benefitsHeading: 'Benefícios Estratégicos:',
    benefits: [
      {
        label: 'Integridade Absoluta:',
        text: 'Bancos relacionais modelados sob rígidos padrões de consistência física e lógica.',
      },
      {
        label: 'Escalabilidade Avançada:',
        text: 'Estrutura de rotas de servidor preparadas para alta concorrência de requisições.',
      },
      {
        label: 'Segurança e Isolamento:',
        text: 'Docker containers para portabilidade e controle rígido contra invasões.',
      },
    ],
    closingParagraph:
      'Garanta que as informações do seu negócio estejam armazenadas com segurança e velocidade estrutural de nível enterprise.',
  },
  traffic: {
    key: 'traffic',
    tag: 'Tráfego Pago & Web Analytics',
    title: 'Meta/Google Ads & Rastreamento Avançado',
    introParagraph: [
      'Não basta ter um sistema veloz se ele não atrai o público certo. Desenvolvemos a gestão técnica de campanhas comerciais em ',
      { strong: 'Google Ads' },
      ' e ',
      { strong: 'Facebook Meta Business Suite (Meta Ads)' },
      ' de forma orientada a dados, focando no retorno estratégico sobre o seu investimento (ROI).',
    ],
    middleHeading: 'Business Intelligence & Rastreamento Cirúrgico',
    middleParagraph: [
      'Nosso diferencial é a integração profunda de dados. Configuramos e depuramos ferramentas como ',
      { strong: 'Google Tag Manager, Google Analytics 4 e APIs de conversão direta' },
      '. Isso garante que cada clique, visualização e compra seja rastreado, alimentando o algoritmo de anúncios com dados limpos para otimizar suas conversões.',
    ],
    benefitsHeading: 'Benefícios Estratégicos:',
    benefits: [
      {
        label: 'Precisão nos Dados:',
        text: 'Rastreamento sem perdas por meio de APIs de conversão no servidor.',
      },
      {
        label: 'Públicos Inteligentes:',
        text: 'Otimização constante de públicos Lookalike e testes de criativos de alta conversão.',
      },
      {
        label: 'Retorno Mensurável:',
        text: 'Relatórios transparentes focados no Custo de Aquisição de Clientes (CAC) e ROI real.',
      },
    ],
    closingParagraph:
      'Atraia os leads mais quentes do mercado direto para suas páginas otimizadas e veja as vendas operarem em escala geométrica.',
  },
};

export const SERVICES_PAGE_ITEMS = [
  {
    key: 'webdev',
    tag: 'FélixTec Dev',
    title: 'Desenvolvimento Web Pro',
    reverseOrder: false,
    description: [
      'Desenvolvemos sites corporativos, e-commerces, portfólios e landing pages sob medida, adaptando a tecnologia ideal ao seu orçamento e objetivo de negócio. Seja através de código puro de altíssima performance (como Vite, React e NodeJS) ou utilizando plataformas robustas de low-code e CMS (como WordPress e Webflow), nosso foco é entregar soluções rápidas, otimizadas para o Google e 100% responsivas.',
    ],
    features: [
      'Flexibilidade tecnológica: do código puro de alta performance ao Low-Code eficiente',
      'Otimização SEO avançada e performance adaptada ao seu projeto',
      'Layouts responsivos e interfaces interativas com animações fluidas',
    ],
    whatsappUrl: buildWhatsAppUrl('Olá, gostaria de conversar sobre o Desenvolvimento Web Pro'),
  },
  {
    key: 'automation',
    tag: 'Inteligência Artificial',
    title: 'Automação & IA Generativa',
    reverseOrder: true,
    description: [
      'Elimine processos manuais ineficientes. Desenvolvemos ecossistemas de automação interligando suas ferramentas cotidianas (CRM, ERP, Planilhas, WhatsApp) com processadores inteligentes de IA. Automatizamos fluxos de prospecção, qualificação de leads, respostas automatizadas e extração de dados com Gemini e Claude via Google AI Studio.',
    ],
    features: [
      'Modelagem de pipelines personalizados no n8n e Make',
      'Modelagem de agentes GPT com análise contextual corporativa',
      'Redução de até 80% do tempo gasto em tarefas repetitivas',
    ],
    whatsappUrl: buildWhatsAppUrl('Olá, gostaria de conversar sobre Automação e IA'),
  },
  {
    key: 'backend',
    tag: 'Arquitetura & Engenharia',
    title: 'Engenharia Backend & Bancos de Dados',
    reverseOrder: false,
    description: [
      'Projeto e estruturação de servidores rápidos, seguros e escaláveis. Modelagem relacional e administração profissional de bancos de dados como ',
      { strong: 'SQL Server, MySQL e PostgreSQL' },
      '. APIs REST e microsserviços seguros criados sob NodeJS e Python com ambientes conteinerizados em ',
      { strong: 'Docker' },
      '.',
    ],
    features: [
      'Modelagem de dados segura e queries SQL otimizadas',
      'Estruturação de rotas de alta performance com Express ou HapiJS',
      'Segurança e integridade de dados e ambientes isolados em Docker',
    ],
    whatsappUrl: buildWhatsAppUrl('Olá, gostaria de conversar sobre a Engenharia Backend e Bancos de Dados'),
  },
  {
    key: 'traffic',
    tag: 'Escala Comercial',
    title: 'Patrocínio Pago & Tráfego',
    reverseOrder: true,
    description: [
      'Atraia o público ideal para o seu negócio de forma previsível e altamente mensurável. Estruturamos e otimizamos campanhas de anúncios patrocinados complexas nos canais mais quentes como ',
      { strong: 'Google Ads' },
      ' e ',
      { strong: 'Facebook Meta Business Suite (Meta Ads)' },
      ', interligando a inteligência de rastreamento do ',
      { strong: 'Google Analytics, Tag Manager e APIs de conversão' },
      ' para maximizar o seu ROI.',
    ],
    features: [
      'Configuração profissional de Tags, Google Analytics 4 e APIs de Conversão',
      'Desenvolvimento e testes constantes de criativos e públicos Lookalike',
      'Otimização constante de custos de aquisição (CAC) e escala de ROI',
    ],
    whatsappUrl: buildWhatsAppUrl('Olá, gostaria de conversar sobre Patrocínio Pago e Tráfego'),
  },
];

