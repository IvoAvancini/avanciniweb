export const solutionSlugs = [
  "ecommerce",
  "sites",
  "agentes-ia",
  "crm-automacao",
  "sistemas",
  "identidade",
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];

export type SolutionFeature = {
  title: string;
  description: string;
  tag: string;
};

export type SolutionMetric = {
  label: string;
  value: string;
};

export type SolutionFAQ = {
  question: string;
  answer: string;
};

export type Solution = {
  slug: SolutionSlug;
  number: string;
  short: string;
  title: string;
  categoryTag: string;
  eyebrow: string;
  promise: string;
  summary: string;
  image: string;
  metrics: SolutionMetric[];
  techStack: string[];
  impact: string[];
  features: SolutionFeature[];
  applications: { title: string; text: string }[];
  operation: { number: string; title: string; text: string }[];
  deliverables: string[];
  faqs: SolutionFAQ[];
  connections: SolutionSlug[];
  relatedProjects: string[];
};

export const solutions: Solution[] = [
  {
    slug: "ecommerce",
    number: "01",
    short: "E-commerce",
    categoryTag: "LOJAS VIRTUAIS & CONVERSÃO",
    title: "E-commerce e presença comercial",
    eyebrow: "Produto, pagamento, logística e atendimento na mesma jornada",
    promise: "Lojas virtuais e catálogos organizados para facilitar a escolha do cliente e a rotina de quem opera a venda.",
    summary: "A estrutura pode reunir catálogo, checkout, cálculo de frete, meios de pagamento e integração com ferramentas de gestão. O escopo depende das regras reais do negócio.",
    image: "/images/solutions/ecommerce.jpg",
    metrics: [
      { label: "Jornada", value: "Loja ou catálogo" },
      { label: "Pagamento", value: "Pix e cartão" },
      { label: "Gestão", value: "ERP quando aplicável" },
      { label: "Atendimento", value: "WhatsApp e CRM" },
    ],
    techStack: [
      "Next.js e React",
      "Pix",
      "Mercado Pago",
      "Pagar.me / Stripe",
      "Melhor Envio / Correios",
      "Bling & Tiny ERP",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    impact: [
      "Checkout transparente sem login obrigatório que reduz abandono de carrinho",
      "Catálogo com filtros por variação, tamanho e preço",
      "Controle sincronizado de estoque, emissão fiscal e rastreamento com ERP",
    ],
    features: [
      {
        tag: "CONVERSÃO",
        title: "Checkout no próprio site",
        description: "O pagamento pode reunir Pix, cartão ou boleto sem mandar o cliente para outra página.",
      },
      {
        tag: "LOGÍSTICA",
        title: "Frete e rastreio",
        description: "Cotação automática com Correios, Jadlog, Total Express e Melhor Envio diretamente na página do produto e no carrinho.",
      },
      {
        tag: "GESTÃO",
        title: "Integração com ERP",
        description: "Bling, Tiny e outras plataformas podem concentrar estoque, expedição e nota fiscal, de acordo com as APIs disponíveis.",
      },
      {
        tag: "PERFORMANCE",
        title: "Experiência responsiva",
        description: "A experiência é projetada para celulares e computadores, com imagens otimizadas e carregamento acompanhado durante o desenvolvimento.",
      },
      {
        tag: "RECORRÊNCIA",
        title: "B2B e varejo no mesmo catálogo",
        description: "Tabelas de preço diferenciadas por perfil de cliente (PJ e PF), pedidos mínimos e faturamento com prazos personalizados.",
      },
      {
        tag: "RECUPERAÇÃO",
        title: "Lembrete de carrinho",
        description: "Quando a operação permitir, o cliente pode receber uma mensagem sobre a compra que ficou em aberto.",
      },
    ],
    applications: [
      { title: "Lojas Virtuais D2C", text: "Marcas próprias de moda, vestuário, cosméticos, suplementos e produtos físicos que exigem identidade de alto nível." },
      { title: "Comércio B2B & Atacado", text: "Portais de vendas para distribuidores e indústrias com catálogo fechado, cotações e regras de crédito." },
      { title: "Catálogos Digitais com Pedido no WhatsApp", text: "Estrutura rápida para produtos de alto valor ou serviços onde o fechamento ocorre no atendimento humano." },
    ],
    operation: [
      { number: "01", title: "Mapeamento & Catálogo", text: "Definimos arquitetura de categorias, regras de frete, meios de pagamento e fluxo de estoque." },
      { number: "02", title: "Desenho das telas", text: "Desenhamos as telas para computador e celular e validamos os principais caminhos de compra." },
      { number: "03", title: "Desenvolvimento & Integrações", text: "Programamos o e-commerce, conectamos gateways de pagamento, transportadoras e ERPs." },
      { number: "04", title: "Testes Reais & Go-Live", text: "Executamos compras-teste completas (Pix, cartão, frete) antes de colocar a loja em produção." },
    ],
    deliverables: [
      "Loja Virtual Completa Responsiva",
      "Checkout Transparente Integrado",
      "Painel de Gestão de Produtos e Pedidos",
      "Integração com Fretes e Correios",
      "Integração com ERP (Bling / Tiny)",
      "Treinamento da equipe",
    ],
    faqs: [
      {
        question: "Consigo cadastrar novos produtos e gerenciar pedidos sozinho?",
        answer: "Sim. O painel permite cadastrar produtos, fotos e variações, ajustar preços e acompanhar pedidos. A forma de uso é apresentada à equipe na entrega.",
      },
      {
        question: "Quais gateways de pagamento posso utilizar?",
        answer: "A escolha depende das taxas, dos meios de pagamento e da API disponível. Mercado Pago, Pagar.me, Asaas, Stripe e PagBank estão entre as opções que podem ser avaliadas.",
      },
      {
        question: "Qual o prazo médio de entrega de uma loja virtual?",
        answer: "O prazo depende do catálogo, das regras comerciais e das integrações. Ele é definido depois do diagnóstico e apresentado por etapas.",
      },
    ],
    connections: ["sites", "crm-automacao", "agentes-ia"],
    relatedProjects: ["vertice", "motora"],
  },
  {
    slug: "sites",
    number: "02",
    short: "Sites",
    categoryTag: "PRESENÇA DIGITAL & LANDING PAGES",
    title: "Sites Institucionais e Experiências Digitais",
    eyebrow: "Uma apresentação clara para a empresa e para o que ela oferece",
    promise: "Sites institucionais, portfólios e landing pages feitos para explicar o negócio e conduzir a próxima ação.",
    summary: "Arquitetura de informação, conteúdo, interface, desenvolvimento e publicação são tratados como partes do mesmo projeto, sem depender de um formato visual pronto.",
    image: "/images/solutions/sites.jpg",
    metrics: [
      { label: "Formato", value: "Site ou landing page" },
      { label: "Acesso", value: "Celular e computador" },
      { label: "Busca", value: "SEO técnico" },
      { label: "Publicação", value: "Domínio e métricas" },
    ],
    techStack: [
      "Next.js e React",
      "React 19",
      "Tailwind CSS",
      "Motion",
      "Vercel Edge",
      "Schema.org SEO",
      "WebP / AVIF Otimizado",
    ],
    impact: [
      "Apresentação coerente com o posicionamento e o público da empresa",
      "Navegação que ajuda a pessoa a encontrar informação e iniciar contato",
      "Imagens, fontes e código preparados para uma experiência eficiente",
    ],
    features: [
      {
        tag: "AUTORIDADE",
        title: "Direção visual própria",
        description: "A estrutura visual parte do conteúdo, do público e do posicionamento da empresa.",
      },
      {
        tag: "CONVERSÃO",
        title: "Caminho de decisão claro",
        description: "Conteúdo, referências e chamadas para ação ajudam a pessoa a entender a oferta e iniciar uma conversa.",
      },
      {
        tag: "BUSCA",
        title: "Base técnica para busca",
        description: "Meta tags, OpenGraph, dados estruturados e uma base técnica que ajuda os mecanismos de busca a compreender o conteúdo.",
      },
      {
        tag: "VELOCIDADE",
        title: "Carregamento acompanhado",
        description: "Imagens, fontes e código são tratados para reduzir peso e evitar espera desnecessária.",
      },
    ],
    applications: [
      { title: "Empresas e Indústrias", text: "Apresentação institucional completa com linhas de produtos, certificações, infraestrutura e canais comerciais." },
      { title: "Clínicas e Profissionais Liberais", text: "Médicos, dentistas e escritórios que precisam apresentar especialidades, equipe e formas de atendimento com clareza." },
      { title: "Landing Pages de Lançamento", text: "Páginas únicas focadas na conversão direta de campanhas de tráfego pago (Google Ads e Meta Ads)." },
    ],
    operation: [
      { number: "01", title: "Briefing Estratégico", text: "Entendemos seu público, principais objeções de venda e a imagem que sua empresa quer projetar." },
      { number: "02", title: "Conteúdo e arquitetura", text: "Organizamos o que precisa ser explicado e a ordem em que cada assunto aparece." },
      { number: "03", title: "Design e protótipo", text: "Criamos a interface e validamos as principais telas antes do desenvolvimento." },
      { number: "04", title: "Publicação & Otimização", text: "Colocamos o site no ar com certificado SSL, domínio configurado e métricas ativas." },
    ],
    deliverables: [
      "Site institucional",
      "Design Responsivo para Celular e Computador",
      "Otimização de SEO e Velocidade",
      "Integração com WhatsApp e Analytics",
      "Configuração de Domínio e E-mails Profissionais",
    ],
    faqs: [
      {
        question: "Vocês cuidam dos textos e imagens do site?",
        answer: "Sim. Podemos organizar a redação e orientar a seleção ou produção de imagens. Isso fica definido no escopo.",
      },
      {
        question: "O site funciona bem em qualquer tamanho de celular?",
        answer: "O projeto é adaptado para celular e computador. As larguras e os dispositivos de teste são definidos conforme o público e o conteúdo.",
      },
    ],
    connections: ["identidade", "ecommerce", "agentes-ia"],
    relatedProjects: ["janildo", "solaris", "moreira"],
  },
  {
    slug: "agentes-ia",
    number: "03",
    short: "Agentes IA",
    categoryTag: "INTELIGÊNCIA ARTIFICIAL & ATENDIMENTO",
    title: "Agentes de inteligência artificial",
    eyebrow: "Atendimento assistido por contexto, regras e supervisão humana",
    promise: "Agentes conectados ao WhatsApp ou ao site para responder, qualificar e encaminhar conversas dentro de limites definidos.",
    summary: "A solução usa materiais aprovados pela empresa, regras de encaminhamento e registro das conversas. Casos sensíveis, dúvidas fora do contexto e negociações podem seguir para uma pessoa.",
    image: "/images/solutions/agentes-ia.jpg",
    metrics: [
      { label: "Contexto", value: "Base aprovada" },
      { label: "Canais", value: "WhatsApp e web" },
      { label: "Supervisão", value: "Encaminhamento humano" },
      { label: "Integração", value: "CRM e agenda" },
    ],
    techStack: [
      "OpenAI / Anthropic LLMs",
      "WhatsApp Business Cloud API",
      "Base Vetorial / RAG",
      "Webhooks em Tempo Real",
      "Supabase / PostgreSQL",
      "Painel de Supervisão",
    ],
    impact: [
      "Triagem inicial disponível conforme a configuração e os canais contratados",
      "Qualificação dos dados essenciais (orçamento, urgência, necessidade) antes de acionar a equipe",
      "Fim do tempo gasto respondendo as mesmas perguntas repetitivas todos os dias",
    ],
    features: [
      {
        tag: "CONVERSAÇÃO",
        title: "Linguagem alinhada à empresa",
        description: "O agente usa instruções, exemplos e materiais aprovados para manter vocabulário e tom próximos do atendimento da equipe.",
      },
      {
        tag: "CONHECIMENTO",
        title: "Base de conhecimento da empresa",
        description: "As respostas são apoiadas por materiais da empresa e limites de assunto. Quando não houver base suficiente, o agente encaminha a conversa.",
      },
      {
        tag: "INTEGRAÇÃO",
        title: "Agenda e CRM",
        description: "O agente verifica horários vagos, agenda consultas ou reuniões e preenche os campos do lead no CRM automaticamente.",
      },
      {
        tag: "SUPERVISÃO",
        title: "Passagem para uma pessoa",
        description: "Quando o assunto exige atendimento humano, a conversa pode seguir com um resumo do que já foi tratado.",
      },
    ],
    applications: [
      { title: "Clínicas Médicas e Odontológicas", text: "Tira dúvidas de tratamentos, informa horários disponíveis e pré-agenda consultas no WhatsApp." },
      { title: "Imobiliárias e Construtoras", text: "Filtra localização, faixa de valor e perfil de imóvel desejado antes de repassar o lead ao corretor." },
      { title: "Serviços e Vendas B2B", text: "Recebe o contato de anúncios, qualifica tamanho da empresa e necessidade, e agenda demo com executivo." },
    ],
    operation: [
      { number: "01", title: "Mapeamento das Conversas", text: "Catalogamos as 50 dúvidas mais frequentes, regras de negócio e critérios de qualificação." },
      { number: "02", title: "Instruções e base", text: "Organizamos os materiais aprovados, os limites de resposta e as regras de encaminhamento." },
      { number: "03", title: "Conexão com WhatsApp", text: "Integramos o agente ao número oficial da sua empresa com suporte a múltiplos atendentes." },
      { number: "04", title: "Piloto e revisão", text: "Acompanhamos as primeiras conversas, ajustamos o vocabulário e revisamos as respostas com a equipe." },
    ],
    deliverables: [
      "Agente configurado para a operação",
      "Conexão Oficial com WhatsApp Business",
      "Integração com CRM ou Google Calendar",
      "Painel de Monitoramento de Conversas",
      "Rotina de revisão definida no escopo",
    ],
    faqs: [
      {
        question: "A IA pode inventar informações que não são da minha empresa?",
        answer: "Modelos de IA podem errar. Por isso definimos fontes, limites, monitoramento e encaminhamento humano para reduzir risco e evitar respostas sem base.",
      },
      {
        question: "Preciso de um número novo de WhatsApp?",
        answer: "Pode ser usado tanto o seu número atual de atendimento quanto um número dedicado exclusivo para triagem e qualificação inicial.",
      },
    ],
    connections: ["crm-automacao", "sistemas", "sites"],
    relatedProjects: ["caio", "san-diego"],
  },
  {
    slug: "crm-automacao",
    number: "04",
    short: "CRM & WhatsApp",
    categoryTag: "GESTÃO COMERCIAL & AUTOMATIZAÇÃO",
    title: "CRM, WhatsApp e Automação Comercial",
    eyebrow: "Histórico, responsáveis e próximos passos no mesmo lugar",
    promise: "Organizamos o processo comercial com histórico, responsáveis, próximos passos e automações que façam sentido para a equipe.",
    summary: "Quando contatos ficam espalhados entre planilhas e conversas, acompanhar oportunidades exige memória e retrabalho. O CRM reúne o contexto e torna o processo visível.",
    image: "/images/solutions/crm.jpg",
    metrics: [
      { label: "Histórico", value: "Conversas reunidas" },
      { label: "Responsabilidade", value: "Dono por oportunidade" },
      { label: "Próximo passo", value: "Tarefas e lembretes" },
      { label: "Visibilidade", value: "Funil compartilhado" },
    ],
    techStack: [
      "Kanban Comercial",
      "WhatsApp Multi-Atendente",
      "Disparos Automáticos de Follow-up",
      "Webhooks de Entrada de Leads",
      "Dashboards de Conversão",
      "Relatórios Exportáveis",
    ],
    impact: [
      "Toda conversa de WhatsApp fica salva no histórico do cliente para consulta futura",
      "Alertas automáticos avisam quando um lead está há mais de 24h sem resposta",
      "Visão clara de quantos negócios estão em negociação e qual o faturamento previsto do mês",
    ],
    features: [
      {
        tag: "PIPELINE",
        title: "Funil de vendas",
        description: "As oportunidades avançam por etapas definidas pela equipe, como contato, proposta, negociação e fechamento.",
      },
      {
        tag: "WHATSAPP",
        title: "Atendimento compartilhado",
        description: "A equipe pode trabalhar no mesmo canal de WhatsApp, com distribuição e responsabilidade por conversa.",
      },
      {
        tag: "AUTOMAÇÃO",
        title: "Lembretes programados",
        description: "Regras de acompanhamento lembram a equipe ou enviam uma mensagem quando uma negociação fica parada.",
      },
      {
        tag: "MÉTRICAS",
        title: "Leitura do processo",
        description: "Relatórios ajudam a comparar canais, acompanhar conversão e localizar etapas que acumulam oportunidades.",
      },
    ],
    applications: [
      { title: "Equipes de Vendas Consultivas", text: "Empresas com ciclo de venda de médio/alto valor que precisam de acompanhamento minucioso de propostas." },
      { title: "Atendimento Centralizado", text: "Clínicas, escolas e escritórios que recebem dezenas de mensagens diárias e precisam distribuir para setores." },
      { title: "Empresas com Múltiplos Canais", text: "Centralização de leads vindos do site, Instagram, Google Ads e indicações no mesmo painel." },
    ],
    operation: [
      { number: "01", title: "Diagnóstico do Processo", text: "Mapeamos como a venda acontece hoje e onde os contatos se perdem." },
      { number: "02", title: "Desenho das Etapas", text: "Estruturamos os gatilhos, campos personalizados e regras de distribuição dos leads." },
      { number: "03", title: "Conexão dos Canais", text: "Integramos formulários do site, WhatsApp e ferramentas de tráfego pago." },
      { number: "04", title: "Treinamento Prático", text: "Treinamos seus vendedores e gestores para o uso correto da ferramenta no dia a dia." },
    ],
    deliverables: [
      "Estrutura de CRM configurada",
      "Integração com WhatsApp Oficial",
      "Gatilhos de Automação de E-mail e Mensagens",
      "Painel de Indicadores e Metas",
      "Treinamento Gravado para a Equipe",
    ],
    faqs: [
      {
        question: "Minha equipe vai achar difícil usar o sistema?",
        answer: "O fluxo é desenhado com a equipe e evita campos sem uso. O treinamento e um período de adaptação fazem parte do planejamento.",
      },
      {
        question: "Consigo importar minha lista atual de clientes?",
        answer: "Sim, desde que os dados possam ser exportados e estejam em condições de uso. A importação é conferida antes de entrar no CRM.",
      },
    ],
    connections: ["agentes-ia", "sistemas", "ecommerce"],
    relatedProjects: ["solaris", "motora"],
  },
  {
    slug: "sistemas",
    number: "05",
    short: "Sistemas",
    categoryTag: "SISTEMAS SOB MEDIDA & PLATAFORMAS",
    title: "Sistemas e plataformas sob medida",
    eyebrow: "Tecnologia desenhada a partir da operação da empresa",
    promise: "Portais de clientes, cockpits operacionais e plataformas internas criadas para processos que não cabem em softwares de prateleira.",
    summary: "Quando uma ferramenta pronta não acompanha o processo, mapeamos regras, papéis e dados antes de construir módulos próprios. Infraestrutura, suporte e propriedade são definidos na proposta.",
    image: "/images/solutions/sistemas.jpg",
    metrics: [
      { label: "Propriedade", value: "Definida em contrato" },
      { label: "Infraestrutura", value: "Dimensionada ao uso" },
      { label: "Disponibilidade", value: "Monitoramento previsto" },
      { label: "Evolução", value: "Módulos incrementais" },
    ],
    techStack: [
      "Next.js & React 19",
      "Node.js / TypeScript",
      "PostgreSQL & Drizzle ORM",
      "Autenticação Segura (JWT / 2FA)",
      "Cloudflare / AWS Infra",
      "APIs RESTful & Webhooks",
    ],
    impact: [
      "Eliminação de retrabalho manual entre setores e planilhas paralelas",
      "Acesso seguro para clientes ou fornecedores consultarem pedidos e documentos em área restrita",
      "Dados centralizados com relatórios confiáveis para tomada de decisão da diretoria",
    ],
    features: [
      {
        tag: "CONTROLE",
        title: "Permissões por perfil",
        description: "Administrador, gerente, operador e cliente podem ter acessos diferentes conforme a responsabilidade de cada um.",
      },
      {
        tag: "OPERAÇÃO",
        title: "Fluxos de trabalho",
        description: "Aprovações de pedidos, ordens de serviço, emissão de documentos e alertas automáticos conforme o andamento da operação.",
      },
      {
        tag: "SEGURANÇA",
        title: "Dados e segurança",
        description: "Armazenamento, acesso, cópias de segurança e recuperação são planejados de acordo com os dados tratados pelo sistema.",
      },
      {
        tag: "EXPANSÃO",
        title: "Evolução por módulos",
        description: "O sistema nasce com o núcleo essencial e recebe novos módulos conforme o negócio cresce, sem necessidade de recomeçar do zero.",
      },
    ],
    applications: [
      { title: "Portais de Clientes e Parceiros", text: "Áreas exclusivas para clientes acompanharem status de projetos, baixarem relatórios e emitirem boletos." },
      { title: "Sistemas de Gestão Operacional", text: "Controle de ordens de serviço, estoque técnico, frotas, orçamentos complexos e alocação de equipes." },
      { title: "Plataformas Digitais e SaaS", text: "Desenvolvimento de novos produtos digitais ou ferramentas comerciais para comercialização no mercado." },
    ],
    operation: [
      { number: "01", title: "Levantamento de Requisitos", text: "Mapeamos regras, papéis de usuários, cálculos específicos e fluxos de dados essenciais." },
      { number: "02", title: "Arquitetura & Prototipagem", text: "Validamos telas navegáveis de todos os módulos antes de escrever a primeira linha de código." },
      { number: "03", title: "Desenvolvimento por etapas", text: "Os módulos são apresentados para teste e ajuste ao longo do desenvolvimento." },
      { number: "04", title: "Entrada em operação", text: "Testamos acessos e fluxos, preparamos a publicação e definimos a rotina de suporte." },
    ],
    deliverables: [
      "Código e documentação definidos no contrato",
      "Banco de dados e rotina de cópias",
      "Módulos Operacionais Sob Medida",
      "Manual de Uso e Treinamento",
      "Infraestrutura dimensionada para o uso",
    ],
    faqs: [
      {
        question: "O código do sistema pertence à minha empresa?",
        answer: "A propriedade, os acessos, os componentes licenciados e as responsabilidades de manutenção são definidos de forma explícita na proposta e no contrato.",
      },
      {
        question: "Podemos começar com uma versão menor e expandir depois?",
        answer: "Sim. Podemos começar pelo fluxo que concentra mais trabalho e adicionar outros módulos depois que ele estiver validado.",
      },
    ],
    connections: ["crm-automacao", "agentes-ia", "sites"],
    relatedProjects: ["nexo", "caio"],
  },
  {
    slug: "identidade",
    number: "06",
    short: "Identidade",
    categoryTag: "ESTRATÉGIA DE MARCA & BRANDING",
    title: "Identidade Visual e Posicionamento de Marca",
    eyebrow: "Uma identidade coerente em cada ponto de contato",
    promise: "Construímos identidades visuais, sistemas de aplicação e linguagem para a empresa se apresentar com consistência.",
    summary: "A identidade organiza símbolo, tipografia, cores, voz e aplicações. O objetivo é tornar a marca reconhecível e facilitar o trabalho de quem produz materiais no dia a dia.",
    image: "/images/solutions/identidade.jpg",
    metrics: [
      { label: "Direção", value: "Posicionamento e voz" },
      { label: "Sistema visual", value: "Marca, cor e tipografia" },
      { label: "Aplicação", value: "Guia de uso" },
      { label: "Entrega", value: "Arquivos para produção" },
    ],
    techStack: [
      "Brand Positioning",
      "Sistema tipográfico",
      "Paleta Cromática Funcional",
      "Brand Guidelines",
      "Design System de Componentes",
      "Aplicações de apresentação",
    ],
    impact: [
      "Fim da bagunça visual onde cada material tem uma cor, fonte e logo diferentes",
      "Uma apresentação coerente com a maturidade e a proposta da empresa",
      "Facilidade e agilidade para sua equipe criar novas peças de comunicação no padrão certo",
    ],
    features: [
      {
        tag: "ESTRATÉGIA",
        title: "Diagnóstico e direção de marca",
        description: "Analisamos o negócio, o público e referências do setor para definir uma direção visual própria.",
      },
      {
        tag: "SISTEMA",
        title: "Sistema de identidade visual",
        description: "Criação do símbolo, tipografia institucional, cores primárias/secundárias e grafismos de apoio que dão personalidade à marca.",
      },
      {
        tag: "APLICAÇÃO",
        title: "Guia de uso",
        description: "O guia mostra como aplicar marca, cor, tipografia e elementos gráficos nos materiais do dia a dia.",
      },
      {
        tag: "MATERIAIS",
        title: "Materiais prioritários",
        description: "Papelaria executiva, cartões de visita, templates para apresentações comerciais e padrões de postagem para redes sociais.",
      },
    ],
    applications: [
      { title: "Empresas em Rebranding", text: "Negócios que cresceram no mundo físico mas continuam com a marca antiga que não reflete seu tamanho atual." },
      { title: "Novas Marcas e Startups", text: "Lançamento no mercado com identidade madura e competitiva desde o primeiro dia de operação." },
      { title: "Linhas de Produtos e Serviços Premium", text: "Sub-marcas criadas para atender fatias mais exigentes do mercado consumidor ou B2B." },
    ],
    operation: [
      { number: "01", title: "Imersão & Pesquisa", text: "Entendemos a história, concorrentes e diferenciais competitivos que tornam seu negócio único." },
      { number: "02", title: "Rotas Criativas", text: "Desenvolvemos caminhos conceituais com aplicações reais em embalagens, telas e papelaria." },
      { number: "03", title: "Refinamento & Sistema", text: "Ajustamos a rota aprovada, fechamos paletas cromáticas e desenhamos todos os desdobramentos." },
      { number: "04", title: "Organização dos arquivos", text: "Entregamos os arquivos previstos no escopo e o guia com as orientações de aplicação." },
    ],
    deliverables: [
      "Logotipo Principal, Secundário e Ícone",
      "Guia de Tipografia e Paleta de Cores",
      "Manual de Identidade Visual (Brandbook)",
      "Aplicações Digitais e Materiais de Papelaria",
      "Kit de Ativos para Mídias Sociais",
    ],
    faqs: [
      {
        question: "Em quais formatos recebo os arquivos da minha marca?",
        answer: "Os formatos são definidos conforme o uso. A entrega pode incluir arquivos vetoriais, versões para tela, fundo transparente e materiais preparados para impressão.",
      },
      {
        question: "A identidade visual inclui o design do site?",
        answer: "A identidade orienta o visual do site, mas o design e o desenvolvimento entram como uma frente própria. Os dois trabalhos podem fazer parte do mesmo projeto.",
      },
    ],
    connections: ["sites", "ecommerce", "crm-automacao"],
    relatedProjects: ["janildo", "moreira"],
  },
];

export const solutionBySlug = Object.fromEntries(
  solutions.map((solution) => [solution.slug, solution])
) as Record<SolutionSlug, Solution>;
