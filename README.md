# FélixTec — Website Corporativo & Portfólio

Este é o repositório oficial do website e portfólio da **FélixTec**, desenvolvido para destacar soluções de tecnologia, ciência da informação, automação comercial e desenvolvimento de sistemas ágeis e de alta performance.

O projeto foi projetado com foco em design moderno, experiência do usuário (UX/UI) avançada e animações de alta fidelidade que valorizam a identidade da marca, sem abrir mão da simplicidade e clareza para clientes e empresários de diversos setores.

---

## 🚀 Tecnologias & Arquitetura

O ecossistema é baseado em tecnologias web modernas de alta performance:
*   **Vite**: Agrupador (*bundler*) e servidor de desenvolvimento ultrarrápido para carregamento instantâneo de recursos.
*   **HTML5 Semântico**: Estrutura robusta focada em SEO e acessibilidade.
*   **Vanilla CSS3**: Design sob medida com variáveis CSS, gradients fluidos, efeito de vidro fosco (*glassmorphism*) e responsividade total.
*   **GSAP (GreenSock Animation Platform)**: Motor de animações utilizado para as transições dinâmicas de revelação (*scroll reveal*), efeitos de mouse e micro-interações do site.

---

## 🛠️ Funcionalidades Recentes

1.  **Widget de Satisfação Customizado (Foguete FélixTec)**:
    *   Um foguete em formato vetorial (SVG) que simboliza decolagem e crescimento contínuo.
    *   Traz o chibi do **Dev Félix** na cabine superior com a logo da marca **"FT"** estampada no capuz de seu moletom.
    *   Duas cabines com clientes (um empresário e uma médica) acenam ativamente.
    *   Animações interativas de vibração, chama propulsora pulsante e acenos de mão disparadas dinamicamente ao passar o mouse.
    *   Ajuste visual de layout: remoção do círculo limitador (bolha) e reposicionamento dos títulos acima da ilustração, proporcionando sensação de liberdade e legibilidade impecável.
2.  **Banner de Cookies e Segurança**:
    *   Banner dinâmico de segurança e privacidade reposicionado no canto inferior esquerdo para melhor ergonomia visual.
    *   Integração direta com o `localStorage` do navegador para guardar a aceitação do usuário de forma persistente.
3.  **Botão de WhatsApp com Captura de Leads**:
    *   Botão flutuante pulsante posicionado estrategicamente no canto inferior direito.
    *   Abertura de formulário dinâmico adjacente coletando Nome, WhatsApp (com DDD) e E-mail.
    *   Validação em tempo real dos campos obrigatórios e direcionamento direto para a conta comercial no WhatsApp (`5547989224775`) com texto personalizado pré-definido.

---

## 🤖 Infraestrutura para Automação Futura (CRM, Webhooks & IA)

O formulário de captura do WhatsApp localizado no arquivo `src/main.js` (função `initWhatsAppWidget`) foi estruturado de forma ideal para integrar com fluxos de automação avançados, CRMs ou ferramentas de Inteligência Artificial no futuro.

### Como funciona a Automação
Quando o cliente preenche os dados e clica em "Iniciar Chat", os dados recolhidos (Nome, WhatsApp, E-mail) podem ser enviados automaticamente para uma plataforma de integração (como **n8n**, **Make / Integromat** ou **Zapier**) através de um webhook HTTP POST.

### Exemplo Prático de Código
Para ativar essa integração no futuro, basta descomentar e adaptar o seguinte trecho localizado na função `initWhatsAppWidget()` em `src/main.js`:

```javascript
// Exemplo de envio dos dados coletados para o seu webhook de CRM ou n8n:
const webhookUrl = 'https://seu-webhook-n8n-ou-make.com/lead-captura';

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: name,
    whatsapp: phone,
    email: email,
    dataOrigem: new Date().toISOString(),
    origem: 'Botao_Flutuante_WhatsApp'
  })
})
.then(response => {
  if (response.ok) {
    console.log('Lead enviado com sucesso para a automação.');
  }
})
.catch(error => {
  console.error('Erro ao registrar lead:', error);
});
```

### O que você pode fazer com essa Automação no Futuro:
1.  **Bot de Inteligência Artificial (Triagem & Consultas)**:
    *   Você pode criar um agente de IA no n8n (usando APIs da OpenAI, Gemini ou Claude) treinado com um documento de contexto que contenha todas as informações da sua empresa.
    *   O bot pode receber as mensagens dos clientes, consultar a base de dados interna da FélixTec e tirar dúvidas sobre orçamentos, tecnologias recomendadas e prazos automaticamente.
2.  **Agendamento Direto no Google Agenda**:
    *   Integrar o webhook com a API do Google Calendar.
    *   Caso o cliente decida marcar uma reunião, a automação verifica horários disponíveis na sua agenda e reserva o compromisso instantaneamente, enviando o convite para o e-mail do cliente.
3.  **Alimentação de CRM e Funil de Vendas**:
    *   Salvar o contato automaticamente em um banco de dados (relacional/não relacional) ou ferramenta de CRM (como HubSpot, RD Station, Trello ou Notion).
    *   Disparar um e-mail de boas-vindas personalizado de forma 100% automatizada.

---

## 🛠️ Como Executar o Projeto Localmente

### Instalação de Dependências
```bash
npm install
```

### Rodar Servidor de Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível por padrão no endereço local: [http://localhost:5173/](http://localhost:5173/) (ou na porta indicada pelo Vite).

### Compilação de Produção
```bash
npm run build
```
Os arquivos otimizados serão compilados dentro da pasta `/dist` prontos para deploy em servidores de hospedagem estática.
