# 🚀 FélixTec — Manual de Engenharia, Design & Integrações (Wiki do Projeto)

Este repositório contém o código-fonte do ecossistema corporativo da **FélixTec**. O site foi desenvolvido seguindo os mais altos padrões de design moderno (estética premium minimalista e *glassmorphic*) combinados com engenharia de software de alta performance, animações fluidas e prontidão para integrações comerciais inteligentes.

Este documento funciona como um **manual técnico e operacional** completo para que você possa entender cada engrenagem do projeto e dar continuidade à expansão e às automações da marca.

---

## 📌 Sumário
1. [🚀 Tecnologias, Bibliotecas & Frameworks](#-tecnologias-bibliotecas--frameworks)
2. [✨ Manual de Animações & Estética Visual](#-manual-de-animações--estética-visual)
3. [📊 Manual de Integração com Google Sheets (Apps Script Grátis)](#-manual-de-integração-com-google-sheets-apps-script-grátis)
4. [🤖 Como funciona o Botão de WhatsApp & Lead Capture](#-como-funciona-o-botão-de-whatsapp--lead-capture)
5. [🖥️ Como Executar o Projeto Localmente](#%EF%B8%8F-como-executar-o-projeto-localmente)

---

## 🚀 Tecnologias, Bibliotecas & Frameworks

Para garantir carregamento instantâneo, leveza e total flexibilidade criativa, o projeto utiliza uma arquitetura baseada em **código limpo**:

*   **Vite (v5.4.11)**: Utilizado como agrupador (*bundler*) e servidor de desenvolvimento ágil. O Vite compila os assets de forma otimizada para produção, unificando códigos e estilos e eliminando redundâncias.
*   **Vanilla HTML5 & CSS3**: Estrutura semântica focada em acessibilidade e SEO técnico. O CSS utiliza uma arquitetura de variáveis centralizadas em `src/style.css` (tokens de cores HSL, sombras e tempos de transição).
*   **GSAP (GreenSock Animation Platform) & ScrollTrigger (v3.12.5)**: A biblioteca padrão ouro de animação na web. Usada para calcular interações físicas, efeitos magnéticos e aparições dinâmicas de componentes à medida que o usuário rola a página.

---

## ✨ Manual de Animações & Estética Visual

O site foi construído sobre uma identidade visual futurista e sofisticada. Veja como as principais interações estão implementadas:

### 1. Cursor Fluido Magnético & Partículas de Código (`src/main.js`)
*   **Como funciona**: Há dois elementos que formam o ponteiro do mouse (`#custom-cursor` e `#custom-cursor-dot`). O ponto interno se move instantaneamente com as coordenadas reais do mouse, enquanto o anel externo segue o ponteiro com um atraso suave calculado por interpolação linear (LERP) a uma taxa de atualização nativa do monitor.
*   **Efeito magnético de hover**: Ao passar por links, botões ou cards interativos, o anel externo aumenta de tamanho e ganha uma borda neon, criando um efeito magnético sutil que guia a atenção do usuário.
*   **Emissão de Partículas**: Conforme o mouse se desloca, o sistema gera dinamicamente pequenas palavras e operadores matemáticos reais de programação (ex: `const`, `let`, `function`, `=>`, `FélixTec`) que flutuam para cima, rotacionam e desaparecem gradualmente no ar usando físicas de opacidade com o motor GSAP.

### 2. Efeito de Vidro Fosco (*Glassmorphism*)
*   Os cards do portfólio de serviços, os formulários e os popups utilizam a propriedade CSS `backdrop-filter: blur(20px) saturate(180%)`. Isso borra e satura o conteúdo de fundo das seções, dando um aspecto de vidro fosco translúcido e futurista altamente premium.

### 3. Foguete Interativo FélixTec (`index.html` - Seção Diferenciais)
*   **Ilustração Vetorial**: Um foguete puro em SVG que decola de nuvens de fumaça sem nenhuma borda ou círculo limitador, passando a sensação de expansão ilimitada.
*   **Animação Tridimensional**: Ao passar o mouse sobre o contêiner do widget (`satisfaction-container`), o foguete decola ligeiramente (`translateY(-12px)`), inicia uma vibração lateral de alta frequência (`rocketVibrate`), as chamas do propulsor pulsam com maior volume e os personagens nas cabines (Dev Félix com capuz **"FT"**, o empresário e a médica) acenam ativamente.

---

## 📊 Manual de Integração com Google Sheets (Apps Script Grátis)

Você **não** precisa pagar por plataformas externas para enviar as informações do formulário do rodapé e do botão de WhatsApp para uma planilha. Você pode utilizar o **Google Apps Script**, que é uma ferramenta 100% gratuita do próprio Google Drive para hospedar sua própria API de Webhooks.

Aqui está o manual completo de como fazer isso, unificando os leads em uma única planilha com duas abas separadas (*"Solicitações do Site"* e *"Leads do WhatsApp"*).

### Passo 1: Preparar a Planilha do Google
1. Crie uma nova planilha no seu Google Sheets.
2. Nomeie a primeira aba (página) como `Solicitacoes_Site`.
3. Na primeira linha da aba `Solicitacoes_Site`, crie os cabeçalhos:
   `Data/Hora | Nome | E-mail | Serviço de Interesse | Mensagem/Projeto`
4. Crie uma segunda aba (página) e nomeie como `Leads_WhatsApp`.
5. Na primeira linha da aba `Leads_WhatsApp`, crie os cabeçalhos:
   `Data/Hora | Nome | WhatsApp | E-mail`

### Passo 2: Criar o Script Webhook (Google Apps Script)
1. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
2. Apague o código padrão que aparecer lá e cole o seguinte código-fonte:

```javascript
function doPost(e) {
  try {
    // Obter os dados enviados pelo site em formato JSON
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Identificar a origem do lead para salvar na aba correta
    if (data.origem === "Formulario_Footer") {
      var targetSheet = sheet.getSheetByName("Solicitacoes_Site");
      targetSheet.appendRow([
        new Date(), // Data/Hora
        data.nome,
        data.email,
        data.servico,
        data.mensagem
      ]);
    } else if (data.origem === "Formulario_WhatsApp") {
      var targetSheet = sheet.getSheetByName("Leads_WhatsApp");
      targetSheet.appendRow([
        new Date(), // Data/Hora
        data.nome,
        data.whatsapp,
        data.email
      ]);
    }
    
    // Retornar resposta de sucesso em formato JSON
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Lead registrado com sucesso!" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    // Retornar resposta de erro caso ocorra alguma falha
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique no botão de **Salvar** (ícone de disquete).
4. No canto superior direito, clique em **Implantar** (Deploy) > **Nova implantação**.
5. Selecione o tipo de implantação clicando na engrenagem e escolhendo **Aplicativo da Web**.
6. Preencha as configurações:
   *   **Descrição**: *Webhook de Leads FélixTec*
   *   **Executar como**: *Você (seu-email@gmail.com)*
   *   **Quem tem acesso**: *Qualquer pessoa* (isso é essencial para o formulário do site conseguir enviar os dados sem precisar de login).
7. Clique em **Implantar**. O Google solicitará permissão de acesso à sua planilha. Conceda a autorização.
8. Ao finalizar, copie a **URL do aplicativo da web** gerada (ela termina com `/exec`). Essa é a sua **URL de Webhook**.

---

## 🤖 Como funciona o Botão de WhatsApp & Lead Capture

Com a sua URL do Webhook do Google em mãos, veja como ativar a gravação em tempo real em ambos os formulários no projeto:

### 1. Ativar na Captura do WhatsApp (`src/main.js`)
Abra o arquivo `src/main.js`, localize a função `initWhatsAppWidget()` e atualize o evento do botão de envio para realizar o envio real (basta preencher a sua URL e descomentar o trecho de `fetch`):

```javascript
// Substitua o trecho atual correspondente por este código:
const webhookUrl = 'SUA_URL_DO_APPS_SCRIPT_AQUI';

fetch(webhookUrl, {
  method: 'POST',
  mode: 'no-cors', // Evita problemas de CORS no envio ao Apps Script
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origem: 'Formulario_WhatsApp',
    nome: name,
    whatsapp: phone,
    email: email
  })
});
```

### 2. Ativar no Formulário de Contato do Rodapé (`src/main.js`)
Abra o arquivo `src/main.js`, localize a função `initContactForm()` e faça a mesma atualização inserindo a sua URL:

```javascript
// Substitua o trecho atual correspondente por este código:
const webhookUrl = 'SUA_URL_DO_APPS_SCRIPT_AQUI';

fetch(webhookUrl, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origem: 'Formulario_Footer',
    nome: name,
    email: email,
    servico: service,
    mensagem: message
  })
});
```

Ao fazer isso, sempre que um formulário for disparado, o site enviará os leads instantaneamente para a respectiva aba da sua planilha do Google Sheets de forma silenciosa e automática, enquanto continua fornecendo os feedbacks visuais premium na tela do cliente.

---

## 🖥️ Como Executar o Projeto Localmente

### Instalação de Dependências
```bash
npm install
```

### Rodar Servidor de Desenvolvimento
```bash
npm run dev
```

### Compilação de Produção
```bash
npm run build
```
Os arquivos otimizados serão compilados dentro da pasta `/dist` prontos para deploy final em servidores de hospedagem estática.
