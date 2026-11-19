export const PROFILE_DATA = {
  tag: 'Quem Sou Eu',
  title: 'Tecnologia, Ciência e Impacto Comercial.',
  photo: '/images/developer-profile.webp',
  photoAlt: 'Desenvolvedor Félix - Ciência da Informação UFSC',
  experiences: [
    {
      id: 'ufsc-ic',
      title: 'Iniciação Científica & Automação — Bolsista UFSC',
      descriptionParts: [
        'Pesquisa estruturada voltada para ',
        {
          em: '"Intervenções Automatizadas Multicanais para Retenção Estudantil e Padrões Operacionais no Ecossistema LANSE-MIRA"',
        },
        '. Engenharia de dados e análise científica.',
      ],
    },
    {
      id: 'ufsc-telemed',
      title: 'Desenvolvedor Backend — Telemedicina UFSC',
      descriptionParts: [
        'Projeto e implementação de lógica de servidor performática utilizando ',
        { strong: 'Python, NodeJS' },
        ', com integrações ágeis em banco de dados relacional, não relacional e APIs.',
      ],
    },
    {
      id: 'paradigma',
      title: 'Analista de Suporte — Paradigma Business Solutions',
      descriptionParts: [
        'Desenvolvimento de scripts complexos em ',
        { strong: 'SQL Server' },
        ' para resolução de inconsistências em bancos de dados de larga escala e análise de logs para manter fluxos de compra, venda e leilões.',
      ],
    },
  ],
};

