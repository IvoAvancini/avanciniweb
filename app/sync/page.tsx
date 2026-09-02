"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { AvanciniMark } from "../avancini-mark";

const countriesList = [
  { code: "BR", name: "Brasil", ddi: "+55", placeholder: "(11) 99999-9999" },
  { code: "US", name: "Estados Unidos", ddi: "+1", placeholder: "(555) 000-0000" },
  { code: "PT", name: "Portugal", ddi: "+351", placeholder: "912 345 678" },
  { code: "MX", name: "México", ddi: "+52", placeholder: "55 1234 5678" },
  { code: "AR", name: "Argentina", ddi: "+54", placeholder: "11 1234-5678" },
  { code: "GB", name: "Reino Unido", ddi: "+44", placeholder: "7911 123456" },
  { code: "ES", name: "Espanha", ddi: "+34", placeholder: "612 34 56 78" },
  { code: "FR", name: "França", ddi: "+33", placeholder: "06 12 34 56 78" },
  { code: "DE", name: "Alemanha", ddi: "+49", placeholder: "151 12345678" },
  { code: "IT", name: "Itália", ddi: "+39", placeholder: "312 345 6789" },
  { code: "CA", name: "Canadá", ddi: "+1", placeholder: "(555) 000-0000" },
  { code: "CL", name: "Chile", ddi: "+56", placeholder: "9 1234 5678" },
  { code: "CO", name: "Colômbia", ddi: "+57", placeholder: "300 123 4567" },
  { code: "UY", name: "Uruguai", ddi: "+598", placeholder: "99 123 456" },
  { code: "PY", name: "Paraguai", ddi: "+595", placeholder: "981 123456" },
  { code: "JP", name: "Japão", ddi: "+81", placeholder: "90 1234 5678" },
  { code: "CH", name: "Suíça", ddi: "+41", placeholder: "78 123 45 67" },
  { code: "AU", name: "Austrália", ddi: "+61", placeholder: "412 345 678" },
];

function CountryFlagIcon({ code }: { code: string }) {
  if (code === "BR") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#009b3a" />
        <polygon points="16,5 28,16 16,27 4,16" fill="#fedf00" />
        <circle cx="16" cy="16" r="6" fill="#002776" />
        <path d="M10.8 17.2 C13 14.8 19 14.8 21.2 17.2" stroke="#ffffff" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  if (code === "US") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#b22234" />
        <path d="M0 10h32M0 16h32M0 22h32" stroke="#ffffff" strokeWidth="3" />
        <path d="M0 0h16v16H0z" fill="#3c3b6e" />
        <circle cx="8" cy="8" r="3.5" fill="#ffffff" />
      </svg>
    );
  }
  if (code === "PT") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#ff0000" />
        <path d="M0 0 A16 16 0 0 0 0 32 L13 32 L13 0 Z" fill="#006600" />
        <circle cx="13" cy="16" r="4.5" fill="#ffff00" stroke="#002776" strokeWidth="1" />
      </svg>
    );
  }
  if (code === "ES") {
    return (
      <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#aa151b" />
        <rect x="0" y="8" width="32" height="16" fill="#f1bf00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" className="country-flag-svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1e293b" />
      <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 2a12 12 0 1 1-12 12A12 12 0 0 1 16 4Z" fill="#38bdf8" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "5573981019782";

const whatsappFor = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const SyncArrow = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="sync-svg-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const SyncDownArrow = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

type SyncPaymentCycle = "monthly" | "semiannual" | "annual";

type SyncPlan = {
  id: string;
  name: string;
  label: string;
  price: string;
  suffix: string;
  description: string;
  definition: string;
  fit: string;
  example: string;
  items: string[];
  cyclePrices: Record<SyncPaymentCycle, number>;
};

const syncPaymentCycles: { id: SyncPaymentCycle; label: string; detail: string; discount: string }[] = [
  { id: "monthly", label: "Mensal", detail: "Sem fidelidade longa", discount: "" },
  { id: "semiannual", label: "Semestral", detail: "10% de economia", discount: "10% OFF" },
  { id: "annual", label: "Anual", detail: "20% de economia", discount: "20% OFF" },
];

const syncPlans: SyncPlan[] = [
  {
    id: "especialista",
    name: "Agente IA Especialista",
    label: "OPERAÇÃO COMERCIAL OU ATENDIMENTO",
    price: "R$ 490",
    suffix: "/mês",
    description: "1 Agente de IA autônomo treinado no seu negócio para qualificar leads, tirar dúvidas e agendar compromissos 24 horas por dia.",
    definition: "Agente inteligente treinado exclusivamente com a base de conhecimento da sua empresa.",
    fit: "Para empresas, consultórios e prestadores de serviços que perdem oportunidades por demora no primeiro contato.",
    example: "Um lead chama no WhatsApp às 23h. O Agente entende o perfil, tira dúvidas técnicas e agenda uma reunião no Google Calendar.",
    items: [
      "1 Agente de IA dedicado (Vendas ou Suporte)",
      "Treinamento na base de conhecimento da sua empresa (PDFs, regras, FAQs)",
      "Integração nativa com 1 número de WhatsApp",
      "Agendamento autônomo no Google Calendar / Calendly",
      "Transbordo inteligente para atendente humano com resumo pronto",
      "Painel de controle com histórico e relatórios de conversão",
      "Suporte e calibragem contínua inclusos",
    ],
    cyclePrices: {
      monthly: 490,
      semiannual: 2646,
      annual: 4704,
    },
  },
  {
    id: "multi-agente",
    name: "Agente IA Multi-Operação",
    label: "VENDAS + SUPORTE + CRM (MAIS ESCOLHIDO)",
    price: "R$ 890",
    suffix: "/mês",
    description: "2 Agentes de IA trabalhando juntos (SDR Comercial + Atendente de Suporte) com compreensão de áudio e sincronização automática de CRM.",
    definition: "Ecossistema completo com agentes especialistas trabalhando de forma coordenada no WhatsApp.",
    fit: "Para clínicas, imobiliárias, escritórios, e-commerces e empresas com volume diário de novos contatos.",
    example: "O Agente de Vendas qualifica o lead, ouve áudios do cliente, salva os dados no RD Station/HubSpot e avisa seu vendedor no WhatsApp.",
    items: [
      "2 Agentes de IA especialistas (SDR Comercial + Suporte/Pós-Venda)",
      "Compreensão de áudios de clientes (transcrição instantânea Whisper)",
      "Envio de respostas em áudio com voz natural humanizada (opcional)",
      "Integração direta com CRM (RD Station, HubSpot, ActiveCampaign ou Planilhas)",
      "Reativação ativa de leads que pararam de responder (Follow-up inteligente)",
      "Geração de links de pagamento Pix / Cartão dentro da conversa",
      "Regras avançadas anti-alucinação e segurança de dados RAG",
      "Onboarding dedicado e acompanhamento semanal de performance",
    ],
    cyclePrices: {
      monthly: 890,
      semiannual: 4806,
      annual: 8544,
    },
  },
  {
    id: "enterprise",
    name: "Ecossistema Custom AI",
    label: "MULTICANAL + BANCO DE DADOS + ERP",
    price: "R$ 1.590",
    suffix: "/mês",
    description: "Operação corporativa com múltiplos Agentes de IA no WhatsApp, Instagram e Site, integrados com banco de dados interno e ERP.",
    definition: "Arquitetura avançada de inteligência artificial desenvolvida sob medida para operações de alta escala.",
    fit: "Para operações com múltiplos atendentes, redes de franquias, grandes clínicas e empresas com sistemas proprietários.",
    example: "A IA consulta o estoque/sistema do ERP em tempo real, emite status de pedidos, agenda em múltiplos consultórios e orquestra a equipe.",
    items: [
      "Agentes de IA ilimitados e multicanais (WhatsApp, Instagram Direct e Site)",
      "Integração profunda com APIs privadas, ERPs e bancos de dados SQL",
      "Automações complexas via Webhooks (n8n, Make, Evolution API)",
      "Roteamento avançado de leads por região, vendedor ou especialidade",
      "SLA de atendimento prioritário e treinamento contínuo da equipe",
      "Relatórios executivos e auditoria de inteligência artificial",
    ],
    cyclePrices: {
      monthly: 1590,
      semiannual: 8586,
      annual: 15264,
    },
  },
];

const formatSyncPlanMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

type AgentScenario = {
  id: string;
  name: string;
  role: string;
  segment: string;
  tools: string[];
  metrics: string;
  reasoning: string;
  floatingTags: string[];
  messages: {
    sender: "client" | "agent";
    time: string;
    text?: string;
    isAudio?: boolean;
    audioDuration?: string;
    actionNote?: string;
  }[];
};

const agentScenarios: AgentScenario[] = [
  {
    id: "sdr-vendas",
    name: "Agente SDR Comercial",
    role: "Qualificação & Vendas B2B",
    segment: "Empresas de Serviços, Tecnologia e Consultoria",
    tools: ["Google Calendar", "RD Station CRM", "Qualificador de Ticket", "WhatsApp API"],
    metrics: "Tempo de resposta: 1.2s · Taxa de qualificação: 88%",
    reasoning: "Lead demonstrou interesse em modernização. Agente verificou porte da empresa, extraiu necessidade e marcou reunião de proposta na agenda do consultor.",
    floatingTags: ["Qualificar Lead B2B", "Consultar Google Calendar", "Sincronizar com CRM", "Follow-up Ativo"],
    messages: [
      {
        sender: "client",
        time: "21:42",
        text: "Boa noite! Vocês fazem automação para escritório de contabilidade? Estamos perdendo muitos contatos no WhatsApp.",
      },
      {
        sender: "agent",
        time: "21:42",
        text: "Olá! Sim, atendemos escritórios de contabilidade com Agentes de IA sob medida. 🚀\n\nPara eu te passar o melhor direcionamento: quantos contatos vocês recebem por mês e qual o principal gargalo atual?",
      },
      {
        sender: "client",
        time: "21:44",
        text: "Recebemos cerca de 300 contatos/mês. O problema é que a equipe demora para responder e os clientes acabam fechando com outros.",
      },
      {
        sender: "agent",
        time: "21:44",
        text: "Entendi perfeitamente. Nesse volume, o Agente de IA reduz o tempo de resposta para menos de 2 segundos e já qualifica o regime tributário da empresa antes de passar para seu time.\n\nTenho disponibilidade com nosso especialista amanhã às 10h ou às 15h para te mostrar uma demonstração ao vivo. Qual horário fica melhor para você?",
        actionNote: "💡 Ação: Verificou slots livres no Google Calendar do consultor.",
      },
      {
        sender: "client",
        time: "21:45",
        text: "Amanhã às 15h fica ótimo!",
      },
      {
        sender: "agent",
        time: "21:45",
        text: "Perfeito! Reunião confirmada para amanhã às 15:00. 📅\n\nEnviei o convite com o link da chamada para seu e-mail e nosso consultor já recebeu o histórico do seu escritório.",
        actionNote: "✅ Ação: Agendou no Google Calendar e criou oportunidade no CRM.",
      },
    ],
  },
  {
    id: "clinica-saude",
    name: "Agente Clínico & Saúde",
    role: "Triagem & Agendamento Médico",
    segment: "Clínicas Médicas, Odontológicas e Estética",
    tools: ["Agenda Médica", "Protocolos de Triagem", "Instruções Pré-Exame", "Transcrição de Áudio"],
    metrics: "Tempo de resposta: 0.9s · Agendamentos automáticos: 94%",
    reasoning: "Agente acolheu a paciente, esclareceu sobre o procedimento de harmonização, transcreveu o áudio da cliente e reservou o horário com a Dra. Mariana.",
    floatingTags: ["Transcrever Áudio (Whisper)", "Consultar Agenda Médica", "Triagem de Sintomas", "Disparar Lembrete"],
    messages: [
      {
        sender: "client",
        time: "19:15",
        text: "Oi, gostaria de saber quanto custa a harmonização facial e se vocês têm horário para essa semana.",
      },
      {
        sender: "agent",
        time: "19:15",
        text: "Olá! Seja muito bem-vinda à Clínica Avancini Saúde. ✨\n\nOs procedimentos são 100% personalizados após uma avaliação detalhada com a Dra. Mariana para analisar sua estrutura facial.",
      },
      {
        sender: "client",
        time: "19:16",
        isAudio: true,
        audioDuration: "0:22",
        text: "Áudio: 'Entendi! E a consulta de avaliação é muito demorada? Eu só consigo no final da tarde por causa do trabalho.'",
      },
      {
        sender: "agent",
        time: "19:17",
        text: "A avaliação dura em média 45 minutos com planejamento 3D. 💆‍♀️\n\nTemos um horário especial nesta Quinta-feira às 18h30 com a Dra. Mariana. Gostaria que eu reservasse para você?",
        actionNote: "💡 Ação: Transcreveu o áudio e filtrou horários de final de tarde.",
      },
      {
        sender: "client",
        time: "19:18",
        text: "Pode agendar sim, por favor!",
      },
      {
        sender: "agent",
        time: "19:18",
        text: "Excelente! Agendamento confirmado para Quinta-feira às 18h30. Já registrei sua ficha e enviaremos o lembrete de localização no dia. Até breve! ✨",
        actionNote: "✅ Ação: Reserva gravada no sistema da clínica e lembrete programado.",
      },
    ],
  },
  {
    id: "imobiliario",
    name: "Agente Imobiliário",
    role: "Filtro de Imóveis & Agendamento",
    segment: "Imobiliárias, Construtoras e Corretores",
    tools: ["Banco de Imóveis", "Filtro de Bairros", "Agenda de Corretores", "Catálogo com Fotos"],
    metrics: "Tempo de resposta: 1.5s · Envio de portfólio instantâneo",
    reasoning: "Lead procurou apartamento de 3 quartos. Agente filtrou no acervo, enviou opções com fotos e agendou visita com o corretor responsável.",
    floatingTags: ["Filtrar Catálogo", "Enviar Fotos do Imóvel", "Notificar Corretor", "Agendar Visita Presencial"],
    messages: [
      {
        sender: "client",
        time: "14:02",
        text: "Vi uma placa no bairro Jardins. Vocês têm apartamento de 3 quartos para compra até R$ 900 mil?",
      },
      {
        sender: "agent",
        time: "14:02",
        text: "Olá! Temos sim excelentes opções nos Jardins com esse perfil. 🏢\n\nVocê busca imóvel pronto para morar ou lançamento na planta? E precisa de quantas vagas de garagem?",
      },
      {
        sender: "client",
        time: "14:03",
        text: "Pronto para morar, com pelo menos 2 vagas.",
      },
      {
        sender: "agent",
        time: "14:03",
        text: "Perfeito! Selecionei 2 opções ideais:\n\n1️⃣ Edifício Jardins Privilege: 112m², 3 suítes, 2 vagas, varanda gourmet — R$ 870.000\n2️⃣ Residencial Bella Vista: 98m², 3 quartos (1 suíte), lazer completo — R$ 790.000\n\nPodemos marcar uma visita presencial para amanhã às 14h?",
        actionNote: "💡 Ação: Filtrou catálogo interno e cruzou requisitos de vagas e metragem.",
      },
      {
        sender: "client",
        time: "14:04",
        text: "Gostei do Jardins Privilege! Amanhã às 14h dá certo.",
      },
      {
        sender: "agent",
        time: "14:04",
        text: "Excelente escolha! Visita agendada para amanhã às 14h. Nosso corretor especialista Ricardo estará te esperando no local com as chaves.",
        actionNote: "✅ Ação: Notificou o corretor Ricardo no WhatsApp com ficha do cliente.",
      },
    ],
  },
  {
    id: "suporte-operacional",
    name: "Agente Suporte & Operações",
    role: "Resolução Técnica & Pedidos",
    segment: "E-commerce, SaaS, Cursos e Plataformas",
    tools: ["Consulta de Pedidos", "Emissão de 2ª via Pix", "Status de Envio", "API de Logística"],
    metrics: "Tempo de resposta: 0.8s · Resolução no 1º contato: 91%",
    reasoning: "Cliente solicitou código de rastreio e 2ª via de fatura. Agente consultou o sistema em tempo real e entregou a solução em 15 segundos.",
    floatingTags: ["Consultar ERP / Pedidos", "Gerar Chave Pix", "Rastreio em Tempo Real", "Zero Fila de Espera"],
    messages: [
      {
        sender: "client",
        time: "11:20",
        text: "Olá, fiz o pedido #48291 semana passada e ainda não recebi o código de rastreamento.",
      },
      {
        sender: "agent",
        time: "11:20",
        text: "Olá, Carlos! Deixe-me consultar seu pedido #48291 em nosso sistema agora mesmo... 🔍",
        actionNote: "💡 Ação: Consulta à API de logística do e-commerce.",
      },
      {
        sender: "agent",
        time: "11:21",
        text: "Localizei aqui! Seu pedido foi despachado ontem pela transportadora Jadlog.\n\n📦 Código de Rastreio: BR892109482\n🚚 Previsão de entrega: até Sexta-feira\n\nVocê pode acompanhar pelo link oficial: rastreio.avancini.com/BR892109482. Posso ajudar com mais alguma dúvida?",
      },
      {
        sender: "client",
        time: "11:22",
        text: "Nossa, que rapidez! Era só isso mesmo, muito obrigado!",
      },
      {
        sender: "agent",
        time: "11:22",
        text: "Por nada, Carlos! Estamos sempre à disposição. Tenha um excelente dia! 🚀",
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   KNOWLEDGE BASE SOURCES (INSPIRADO NO GPTMAKER)
   -------------------------------------------------------------------------- */
const knowledgeSources = [
  {
    id: "pdf",
    icon: "📄",
    title: "Documentos e PDFs",
    subtitle: "Catálogos, manuais e regras",
    desc: "Envie PDFs de catálogos de produtos, tabelas de preço, manuais técnicos, cardápios ou políticas de garantia. O Agente extrai as respostas em segundos.",
    sample: "manual_de_servicos_2026.pdf (142 páginas indexadas)",
    status: "Indexado com precisão 100%",
  },
  {
    id: "urls",
    icon: "🌐",
    title: "Links e Páginas Web",
    subtitle: "Seu site sempre sincronizado",
    desc: "Basta colar o link do seu site institucional ou e-commerce. A IA faz a leitura profunda de todas as páginas e se atualiza quando houver novidades.",
    sample: "https://suaempresa.com.br/* (48 páginas sincronizadas)",
    status: "Atualização automática contínua",
  },
  {
    id: "scripts",
    icon: "💬",
    title: "Scripts Comerciais & FAQs",
    subtitle: "A voz dos seus melhores vendedores",
    desc: "Cadastre as perguntas mais frequentes, argumentos de venda, regras de parcelamento e o tom de voz da sua marca para a IA responder com empatia.",
    sample: "script_comercial_objeções_v3.txt (64 pares Pergunta/Resposta)",
    status: "Tom de voz humanizado ativo",
  },
  {
    id: "sheets",
    icon: "📊",
    title: "Planilhas e Dados Vivos",
    subtitle: "Google Sheets, Notion e SQL",
    desc: "Conecte planilhas de estoque, tabelas de honorários médicos ou bases no Notion. Quando você alterar uma célula, o Agente já responde atualizado.",
    sample: "Planilha_Estoque_e_Precos_AoVivo (Sincronização 3s)",
    status: "Conexão bi-direcional em tempo real",
  },
];

/* --------------------------------------------------------------------------
   INTEGRATIONS (ECOSSISTEMA OMNICHANNEL)
   -------------------------------------------------------------------------- */
const integrationCategories = [
  {
    category: "Canais de Atendimento",
    items: [
      { name: "WhatsApp Oficial", detail: "Meta Cloud API sem risco de banimento", tag: "Principal" },
      { name: "Instagram Direct", detail: "Atende DMs e respostas de stories", tag: "Social" },
      { name: "Webchat no Site", detail: "Widget flutuante para seu site", tag: "Web" },
      { name: "Telegram", detail: "Grupos e canais corporativos", tag: "Chat" },
    ],
  },
  {
    category: "Agendas & Agendamento",
    items: [
      { name: "Google Calendar", detail: "Checa horários livres e cria convites", tag: "Google" },
      { name: "Calendly", detail: "Sincronização instantânea de agenda", tag: "Agenda" },
      { name: "Outlook Calendar", detail: "Operação corporativa Microsoft", tag: "MS" },
    ],
  },
  {
    category: "CRMs & Automação",
    items: [
      { name: "RD Station", detail: "Criação de leads e transbordo", tag: "CRM" },
      { name: "HubSpot", detail: "Pipeline e histórico completo", tag: "CRM" },
      { name: "ActiveCampaign", detail: "Disparo de tags e sequências", tag: "E-mail" },
      { name: "Webhooks (n8n/Make)", detail: "Conecte a qualquer ERP ou banco", tag: "API" },
    ],
  },
  {
    category: "Voz & Inteligência",
    items: [
      { name: "Whisper (OpenAI)", detail: "Transcrição perfeita de áudios de clientes", tag: "Áudio" },
      { name: "ElevenLabs", detail: "Respostas com voz humanizada indistinguível", tag: "Voz" },
      { name: "Proteção RAG", detail: "Zero alucinações — dados 100% seguros", tag: "Segurança" },
    ],
  },
];

/* --------------------------------------------------------------------------
   NICHE USE CASES (PARA QUEM É O AVANCINI SYNC)
   -------------------------------------------------------------------------- */
const nicheUseCases = [
  {
    niche: "Clínicas Médicas & Odonto",
    icon: "🏥",
    badge: "SAÚDE & BEM-ESTAR",
    headline: "Atendimento humanizado 24h sem sobrecarregar a recepção.",
    points: [
      "Triagem prévia de sintomas e orientações de preparo",
      "Agendamento automático na grade dos médicos",
      "Confirmação ativa de consulta reduzindo faltas em 70%",
    ],
    metric: "94% das consultas agendadas direto pelo WhatsApp",
  },
  {
    niche: "Imobiliárias & Construtoras",
    icon: "🏢",
    badge: "IMOBILIÁRIO & ALTO PADRÃO",
    headline: "Qualificação instantânea para o corretor só falar com comprador real.",
    points: [
      "Filtro inteligente de metragem, bairro e teto orçamentário",
      "Envio de fotos e fichas técnicas dos imóveis do acervo",
      "Agendamento direto da visita com o corretor responsável",
    ],
    metric: "Resposta em 2s para leads de portais (Zap/VivaReal)",
  },
  {
    niche: "Escritórios & Serviços B2B",
    icon: "⚖️",
    badge: "ADVOCACIA, CONTABILIDADE & B2B",
    headline: "SDR Comercial autônomo agendando reuniões no Google Meet.",
    points: [
      "Qualifica faturamento, regime tributário e urgência do lead",
      "Elimina curiosos e encaminha propostas formatadas",
      "Notifica o consultor com resumo pronto da conversa",
    ],
    metric: "+68% de reuniões marcadas para o time comercial",
  },
  {
    niche: "E-commerces & Negócios Locais",
    icon: "🛍️",
    badge: "VAREJO & OPERAÇÃO",
    headline: "Resolução de dúvidas em 15 segundos e emissão de Pix.",
    points: [
      "Consulta status de envio e rastreio em tempo real",
      "Gera código Pix e link de pagamento dentro do chat",
      "Reativa clientes que abandonaram o carrinho",
    ],
    metric: "91% das dúvidas resolvidas sem atendente humano",
  },
];

function AutonomousAgentShowcase({ onLead }: { onLead: (context: string) => void }) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const scenario = agentScenarios[activeScenarioIndex];

  return (
    <section className="sync-agent-showcase" id="demonstracao" aria-labelledby="sync-showcase-title">
      <header className="sync-section-heading">
        <div>
          <span>01 / DEMONSTRAÇÃO AO VIVO</span>
          <h2 id="sync-showcase-title">Veja como o Agente de IA<br />conversa, decide e fecha vendas.</h2>
        </div>
        <p>Sem menus engessados de botões. O Agente de IA compreende a linguagem natural do cliente, ouve áudios, executa ações no sistema e agenda compromissos.</p>
      </header>

      <div className="agent-scenario-picker" role="tablist" aria-label="Cenários de Agentes de IA">
        {agentScenarios.map((item, index) => (
          <button
            type="button"
            key={item.id}
            role="tab"
            aria-selected={activeScenarioIndex === index}
            className={`agent-scenario-btn ${activeScenarioIndex === index ? "active" : ""}`}
            onClick={() => setActiveScenarioIndex(index)}
          >
            <span className="scenario-idx">0{index + 1}</span>
            <div className="scenario-btn-info">
              <strong>{item.name}</strong>
              <small>{item.role}</small>
            </div>
          </button>
        ))}
      </div>

      <div className="agent-showcase-grid">
        {/* Mockup do WhatsApp com tags flutuantes inspiradas no GPTMaker */}
        <div className="agent-chat-wrapper">
          {/* Tags flutuantes interativas ao redor do celular */}
          <div className="agent-floating-tags-track" aria-hidden="true">
            {scenario.floatingTags.map((tag, idx) => (
              <span key={idx} className={`agent-floating-tag tag-pos-${idx + 1}`}>
                <i>⚡</i> {tag}
              </span>
            ))}
          </div>

          <div className="agent-chat-mockup">
            <div className="agent-chat-phone-bar">
              <span>10:10</span>
              <div className="phone-notch" />
              <div className="phone-signals">
                <span className="sig-bar" />
                <span className="sig-bar" />
                <span className="sig-bar" />
                <span className="phone-battery" />
              </div>
            </div>

            <div className="agent-chat-header">
              <div className="agent-chat-avatar">
                <AvanciniMark variant="sync" className="agent-avatar-mark" />
                <span className="agent-live-dot" aria-label="Online" />
              </div>
              <div className="agent-chat-info">
                <strong>{scenario.name}</strong>
                <span className="agent-chat-status">
                  <i>●</i> Agente IA Ativo · Responde em 1.2s
                </span>
              </div>
              <span className="agent-segment-pill">{scenario.segment.split(",")[0]}</span>
            </div>

            <div className="agent-chat-body">
              {scenario.messages.map((msg, i) => (
                <div key={i} className={`chat-bubble-row ${msg.sender}`}>
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.isAudio ? (
                      <div className="chat-audio-player">
                        <button type="button" className="audio-play-btn" aria-label="Reproduzir áudio">▶</button>
                        <div className="audio-waveform">
                          <span /><span /><span /><span /><span /><span /><span /><span />
                        </div>
                        <span className="audio-time">{msg.audioDuration}</span>
                      </div>
                    ) : null}
                    <p>{msg.text}</p>
                    <span className="bubble-time">{msg.time} {msg.sender === "agent" && <i className="check-marks">✓✓</i>}</span>
                  </div>
                  {msg.actionNote && (
                    <div className="agent-action-badge">
                      <span>{msg.actionNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <footer className="agent-chat-footer">
              <span className="agent-tools-label">⚡ FERRAMENTAS INTEGRADAS:</span>
              <div className="agent-tools-tags">
                {scenario.tools.map((tool) => (
                  <span key={tool} className="agent-tool-tag">{tool}</span>
                ))}
              </div>
            </footer>
          </div>
        </div>

        <div className="agent-brain-panel">
          <div className="agent-brain-card">
            <div className="brain-header">
              <span className="brain-tag">🧠 CÉREBRO DO AGENTE DE IA</span>
              <small>{scenario.metrics}</small>
            </div>
            <h3>O que a inteligência artificial executou nesta conversa:</h3>
            <p className="brain-reasoning">{scenario.reasoning}</p>

            <div className="brain-capabilities-list">
              <div className="brain-cap-item">
                <span className="cap-icon">01</span>
                <div>
                  <strong>Compreensão Contextual Livre</strong>
                  <p>Entendeu a real intenção e ouviu o áudio do cliente sem exigir menus engessados.</p>
                </div>
              </div>
              <div className="brain-cap-item">
                <span className="cap-icon">02</span>
                <div>
                  <strong>Execução Autônoma de Ações</strong>
                  <p>Consultou disponibilidade de agenda, gravou no sistema e sincronizou com o CRM.</p>
                </div>
              </div>
              <div className="brain-cap-item">
                <span className="cap-icon">03</span>
                <div>
                  <strong>Tom de Voz Humanizado</strong>
                  <p>Manteve cordialidade, empatia e alinhamento com a postura da sua marca.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="agent-cta-btn"
              onClick={() => onLead(`um Agente de IA para ${scenario.role} no segmento de ${scenario.segment}`)}
            >
              Quero um Agente como esse na minha empresa <SyncArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const comparisonPoints = [
  {
    topic: "Experiência do Cliente",
    oldChatbot: "Menus rígidos ('digite 1 para vendas, 2 para suporte'). Se o cliente digitar qualquer frase livre, o bot trava e não responde.",
    aiAgent: "Conversação 100% livre e humana por texto e áudio. Entende gírias, perguntas complexas e responde com empatia imediata.",
  },
  {
    topic: "Compreensão de Áudio",
    oldChatbot: "Ignora completamente áudios ou responde com mensagem automática pedindo para 'digitar apenas texto'.",
    aiAgent: "Ouve áudios longos com tecnologia Whisper, transcreve em milissegundos e pode responder em áudio com voz humanizada.",
  },
  {
    topic: "Resolução de Problemas",
    oldChatbot: "Repete links genéricos do site e frequentemente deixa o cliente sem resposta ou manda esperar atendente.",
    aiAgent: "Executa ações reais: agenda reuniões no Google Calendar, consulta estoque/pedidos e emite links de pagamento Pix.",
  },
  {
    topic: "Qualificação de Vendas (SDR)",
    oldChatbot: "Coleta formulários chatos com dezenas de campos que o cliente abandona pela metade.",
    aiAgent: "Faz perguntas fluidas em tom de conversa, descobre orçamento, faturamento ou urgência e entrega o lead pronto para o vendedor.",
  },
  {
    topic: "Aprendizado e Atualização",
    oldChatbot: "Exige reprogramar fluxogramas gigantescos toda vez que um preço ou serviço muda.",
    aiAgent: "Aprende lendo seus documentos, PDFs e catálogos. Se sua regra mudar, basta atualizar a base de conhecimento.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Cérebro Treinado na Sua Empresa",
    description: "Seu Agente de IA lê manuais, tabelas de preços, regras de contratação e histórico de atendimento para responder rigorosamente dentro das suas diretrizes.",
  },
  {
    number: "02",
    title: "Compreensão & Envio de Áudio",
    description: "Mais de 60% dos brasileiros preferem mandar áudio no WhatsApp. Seu Agente escuta áudios de qualquer tamanho e responde com voz natural e clara.",
  },
  {
    number: "03",
    title: "Agendamento de Reuniões Autônomo",
    description: "Conectado ao Google Calendar ou Calendly, ele checa horários livres, negocia o melhor momento com o cliente e envia o convite com link de chamada.",
  },
  {
    number: "04",
    title: "Qualificação Cirúrgica de Leads (SDR)",
    description: "Identifica se o cliente tem orçamento, necessidade e urgência antes de envolver seu time, garantindo que seus vendedores só falem com quem tem potencial de compra.",
  },
  {
    number: "05",
    title: "Integração Direta com CRM & APIs",
    description: "Envia os dados capturados direto para o RD Station, HubSpot, ActiveCampaign, Notion ou Google Sheets, mantendo seu funil de vendas 100% atualizado.",
  },
  {
    number: "06",
    title: "Transbordo Humano Inteligente",
    description: "Quando o caso exige um atendente humano, o Agente notifica seu vendedor no WhatsApp com um resumo executivo de tudo o que o cliente falou.",
  },
];

const faqs = [
  {
    question: "O que diferencia um Agente de IA de um chatbot tradicional?",
    answer: "Um chatbot tradicional usa regras estáticas de botões e árvores engessadas (se o cliente não clicar exatamente na opção, ele trava). Um Agente de IA da Avancini utiliza modelos de linguagem modernos para raciocinar, interpretar áudio ou texto, consultar bases de dados em tempo real e executar tarefas reais (como agendar compromissos e atualizar seu CRM).",
  },
  {
    question: "O Agente de IA pode inventar informações (alucinar)?",
    answer: "Não. Nossos Agentes são calibrados com rigorosas camadas de segurança RAG (Retrieval-Augmented Generation) e System Prompts blindados. Eles respondem estritamente com base nos documentos, manuais e regras da sua empresa. Se um cliente fizer uma pergunta fora do escopo, o Agente informa com educação ou transfere para um humano.",
  },
  {
    question: "Preciso trocar de número de WhatsApp?",
    answer: "Não. É possível conectar o Agente de IA diretamente ao seu número de WhatsApp atual ou configurar um novo número exclusivo para a operação de atendimento e vendas.",
  },
  {
    question: "Como o Agente aprende sobre os meus produtos e serviços?",
    answer: "Basta nos fornecer os materiais da sua empresa (PDFs, catálogo, site, regras comerciais, dúvidas frequentes ou planilhas). Nossa equipe processa esses dados, estrutura a base de conhecimento e calibra o Agente antes de colocar no ar.",
  },
  {
    question: "O que acontece quando o cliente precisa falar com uma pessoa?",
    answer: "O Agente detecta quando o cliente solicita atendimento humano ou quando atinge critérios estratégicos (como um lead de alto valor pronto para fechar). Ele pausa o atendimento automático e notifica sua equipe pelo WhatsApp com um resumo executivo pronto de toda a conversa.",
  },
  {
    question: "Existe taxa de criação ou contrato de fidelidade?",
    answer: "Não há taxa de criação ou setup inicial nas condições de lançamento. O plano mensal pode ser cancelado a qualquer momento sem multa. Para planos semestrais e anuais, você conta com descontos exclusivos de 10% e 20%.",
  },
];

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1);
  const [paymentCycle, setPaymentCycle] = useState<SyncPaymentCycle>("monthly");
  const [activeKnowledgeSource, setActiveKnowledgeSource] = useState(0);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);
  const [ddiDropdownOpen, setDdiDropdownOpen] = useState(false);
  const [ddiSearch, setDdiSearch] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const leadInputRef = useRef<HTMLInputElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      window.history.replaceState(null, "", href);
      document.querySelector(href)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 120);
  };

  const normalizedLeadContext = leadContext.trim().replace(/[.!?]+$/, "");

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!leadContext && !menuOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeadContext("");
        setMenuOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [leadContext, menuOpen]);

  useEffect(() => {
    if (!leadContext) return;
    const timer = window.setTimeout(() => leadInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [leadContext]);

  useEffect(() => {
    if (!menuOpen) return;
    const frame = window.requestAnimationFrame(() => menuCloseRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [menuOpen]);

  const openLead = (context: string) => {
    setLeadContext(context);
    setLeadName("");
    setLeadPhone("");
    setLeadError("");
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = leadName.trim();
    if (name.length < 2) {
      setLeadError("Digite seu nome para continuar.");
      return;
    }
    const cleanPhone = leadPhone.trim();
    const fullPhone = cleanPhone ? `${selectedCountry.ddi} ${cleanPhone}` : "";
    setLeadError("");
    setLeadSubmitting(true);

    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          intent: `Quero conversar sobre ${normalizedLeadContext}`,
          source: "sync_modal",
          page: "/sync",
        }),
      }).catch(() => {});
    } catch {}

    const phoneText = fullPhone ? ` Meu WhatsApp é ${fullPhone}.` : "";
    const message = `Olá! Meu nome é ${name}.${phoneText} Conheci a Avancini Sync e quero conversar sobre ${normalizedLeadContext}.`;
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
    setLeadSubmitting(false);
    setLeadContext("");
    setLeadName("");
    setLeadPhone("");
    setDdiDropdownOpen(false);
  };

  const filteredCountries = countriesList.filter((c) => {
    const q = ddiSearch.toLowerCase().trim();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.ddi.includes(q) || c.code.toLowerCase().includes(q);
  });

  return (
    <main className="sync-page">
      <header className={`header sync-shared-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="logo" aria-label="Avancini Sync, início">
          <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
          <span>
            <span className="brand-name">AVANCINI <b>SYNC</b></span>
            <small>Agentes de IA Autônomos</small>
          </span>
        </a>
        <div className="web-ecosystem-switch" aria-label="Ecossistema Avancini">
          <Link className="button button-small header-cta sync-dash-cta" href="/dash">
            Avancini Dash <SyncArrow />
          </Link>
          <Link className="button button-small header-cta" href="/">
            Avancini OS <SyncArrow />
          </Link>
        </div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <i className="menu-glyph" aria-hidden="true"><span /><span /><span /></i><b>{menuOpen ? "Fechar" : "Menu"}</b>
        </button>
      </header>

      {menuOpen && (
        <div
          ref={menuDialogRef}
          tabIndex={-1}
          className="sync-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal do Avancini Sync"
        >
          <div className="sync-menu-top">
            <span>NAVEGAÇÃO <i /> 07 SEÇÕES</span>
            <div className="sync-menu-network" aria-label="Ecossistema Avancini">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                AVANCINI OS <SyncArrow />
              </Link>
              <Link href="/dash" onClick={() => setMenuOpen(false)}>
                AVANCINI DASH <SyncArrow />
              </Link>
            </div>
            <button ref={menuCloseRef} type="button" onClick={() => setMenuOpen(false)}>
              × <b>FECHAR</b><small>ESC</small>
            </button>
          </div>
          <nav>
            {[
              ["01", "Início", "Inteligência Artificial que vende", "#inicio"],
              ["02", "Demonstração", "Agentes em ação ao vivo", "#demonstracao"],
              ["03", "Treinamento", "Como o Agente aprende", "#treinamento"],
              ["04", "Para quem é", "Casos de uso por nicho", "#para-quem"],
              ["05", "Integrações", "Canais e ecossistema conectado", "#integracoes"],
              ["06", "Comparativo", "Chatbot antigo vs. Agente IA", "#comparativo"],
              ["07", "Planos e preços", "Implantação e acompanhamento", "#planos"],
            ].map(([number, label, description, href]) => (
              <a href={href} key={number} onClick={(event) => navigateFromMenu(event, href)}>
                <small>{number}</small>
                <span>{label}</span>
                <em>{description}</em>
                <SyncArrow />
              </a>
            ))}
          </nav>
          <div className="sync-menu-bottom">
            <span><i /> SEU ATENDIMENTO PODE COMEÇAR POR UMA CONVERSA</span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openLead("a implantação de um Agente de IA na minha empresa");
              }}
            >
              SOLICITAR ORÇAMENTO <SyncArrow />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section — Inspirado na proposta comercial magnética do GPTMaker */}
      <section className="sync-hero" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <AvanciniMark variant="sync" className="sync-hero-mark avancini-a-mark" />
        <div className="sync-hero-copy">
          <div className="sync-hero-badge-row">
            <span className="sync-eyebrow"><i /> AGENTE DE IA AUTÔNOMO · ATENDIMENTO &amp; VENDAS 24/7</span>
            <span className="sync-hero-live-pill"><i /> WHATSAPP META API · PROTEÇÃO ANTI-ALUCINAÇÃO</span>
          </div>
          <h1>Equipe de atendimento sobrecarregada?<br /><em>Dê superpoderes com um Agente de IA que pensa, atende e vende.</em></h1>
          <p>Esqueça menus lentos de &ldquo;digite 1 ou 2&rdquo;. Tenha um colaborador de IA dedicado 24 horas por dia executando tarefas, compreendendo áudios livres, qualificando clientes e agendando compromissos com precisão cirúrgica.</p>
          
          <div className="sync-hero-actions">
            <a href="#demonstracao">Ver Agentes em ação <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("implantar um Agente de IA para automatizar meu atendimento e vendas")}>Quero um Agente de IA na minha empresa <SyncArrow /></button>
          </div>

          {/* ROI Stats Bar — Inspirada nas estatísticas de alto impacto do GPTMaker */}
          <div className="sync-hero-stats-grid">
            <div className="hero-stat-card">
              <span className="hero-stat-number">+68%</span>
              <p>Mais chances de concretizar uma venda respondendo no primeiro minuto</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">&lt; 2s</span>
              <p>Tempo de resposta imediata sem nenhuma fila de espera no WhatsApp</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">94%</span>
              <p>De dúvidas e agendamentos resolvidos 100% no automático pela IA</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">24/7</span>
              <p>Operação ativa dia e noite, finais de semana e feriados sem pausas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Showcase com WhatsApp Simulator e Floating Action Tags */}
      <AutonomousAgentShowcase onLead={openLead} />

      {/* NOVA SEÇÃO: Como seu Agente Aprende (Knowledge Base) — Inspirada no GPTMaker */}
      <section className="sync-training-section" id="treinamento" aria-labelledby="sync-training-title">
        <header className="sync-section-heading">
          <div>
            <span>02 / BASE DE CONHECIMENTO</span>
            <h2 id="sync-training-title">Simples de treinar,<br />cirúrgico no resultado.</h2>
          </div>
          <p>Você fornece os materiais da sua empresa e a tecnologia Avancini calibra o Agente para responder com fidelidade absoluta, sem inventar dados.</p>
        </header>

        <div className="training-sources-container">
          <div className="training-sources-list">
            {knowledgeSources.map((source, idx) => (
              <button
                type="button"
                key={source.id}
                className={`training-source-card ${activeKnowledgeSource === idx ? "active" : ""}`}
                onClick={() => setActiveKnowledgeSource(idx)}
              >
                <div className="source-card-header">
                  <span className="source-icon">{source.icon}</span>
                  <div>
                    <strong>{source.title}</strong>
                    <small>{source.subtitle}</small>
                  </div>
                </div>
                <p>{source.desc}</p>
                <span className="source-card-status">
                  <i>●</i> {source.status}
                </span>
              </button>
            ))}
          </div>

          <div className="training-preview-terminal">
            <div className="terminal-header">
              <span className="terminal-dots"><i /><i /><i /></span>
              <span className="terminal-title">AVANCINI BRAIN CORE // INGESTÃO DE CONHECIMENTO</span>
              <span className="terminal-badge">RAG ATIVO</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="term-prompt">&gt;</span> Fonte selecionada: <b>{knowledgeSources[activeKnowledgeSource].title}</b></div>
              <div className="terminal-line"><span className="term-prompt">&gt;</span> Arquivo de exemplo: <code>{knowledgeSources[activeKnowledgeSource].sample}</code></div>
              <div className="terminal-line"><span className="term-prompt">&gt;</span> Processamento semântico: 100% concluído em milissegundos</div>
              <div className="terminal-line term-success"><span className="term-prompt">&gt;</span> Status: Proteção anti-alucinação validada. A IA só responderá o que estiver documentado.</div>
              <div className="terminal-knowledge-box">
                <small>FRAGMENTO EXTRAÍDO PELA IA:</small>
                <p>&ldquo;Horário de atendimento: Segunda a Sexta das 8h às 19h. Pagamentos via Pix têm 5% de desconto. Reuniões de avaliação têm duração média de 45 minutos.&rdquo;</p>
              </div>
            </div>
            <footer className="terminal-footer">
              <span>💡 Proteção corporativa: seus dados nunca são compartilhados ou usados para treinar modelos de terceiros.</span>
            </footer>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Para quem é o Avancini Sync (Segmentos & Nichos) — Inspirada no GPTMaker */}
      <section className="sync-niches-section" id="para-quem" aria-labelledby="sync-niches-title">
        <header className="sync-section-heading">
          <div>
            <span>03 / CASOS DE USO POR NICHO</span>
            <h2 id="sync-niches-title">Feito para quem não aceita<br />perder clientes por demora.</h2>
          </div>
          <p>Veja como empresas de diferentes segmentos transformaram seu WhatsApp em uma máquina previsível de novos negócios.</p>
        </header>

        <div className="niches-grid">
          {nicheUseCases.map((niche, i) => (
            <article className="niche-card" key={i}>
              <div className="niche-card-top">
                <span className="niche-icon">{niche.icon}</span>
                <span className="niche-badge">{niche.badge}</span>
              </div>
              <h3>{niche.niche}</h3>
              <p className="niche-headline">{niche.headline}</p>
              <ul className="niche-points">
                {niche.points.map((pt, idx) => (
                  <li key={idx}><i>✓</i> {pt}</li>
                ))}
              </ul>
              <div className="niche-metric-bar">
                <small>RESULTADO PRÁTICO:</small>
                <strong>{niche.metric}</strong>
              </div>
              <button
                type="button"
                className="niche-cta-btn"
                onClick={() => onLead(`um Agente de IA especializado em ${niche.niche}`)}
              >
                Quero para {niche.niche.split("&")[0]} <SyncArrow />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* NOVA SEÇÃO: Ecossistema de Integrações Omnichannel — Inspirada no GPTMaker */}
      <section className="sync-integrations-section" id="integracoes" aria-labelledby="sync-integrations-title">
        <header className="sync-section-heading">
          <div>
            <span>04 / ECOSSISTEMA OMNICHANNEL</span>
            <h2 id="sync-integrations-title">Conectado a tudo que<br />sua empresa já utiliza.</h2>
          </div>
          <p>O Agente de IA atua de forma unificada no WhatsApp, Instagram e Site, sincronizando tudo com seu CRM, agenda e ferramentas de cobrança.</p>
        </header>

        <div className="integrations-showcase-grid">
          {integrationCategories.map((cat, idx) => (
            <div className="integration-category-card" key={idx}>
              <h4>{cat.category}</h4>
              <div className="integration-items-list">
                {cat.items.map((item, i) => (
                  <div className="integration-item-row" key={i}>
                    <div className="integration-item-info">
                      <strong>{item.name}</strong>
                      <small>{item.detail}</small>
                    </div>
                    <span className="integration-tag">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section: Old Chatbot vs. Modern AI Agent */}
      <section className="sync-comparison-section" id="comparativo">
        <header className="sync-section-heading">
          <div>
            <span>05 / A EVOLUÇÃO DO ATENDIMENTO</span>
            <h2>Chatbot Antigo vs.<br />Agente de IA Avancini.</h2>
          </div>
          <p>Entenda por que menus engessados perdem clientes e como um Agente de IA autônomo eleva a taxa de conversão da sua empresa.</p>
        </header>

        <div className="comparison-table-wrap">
          <div className="comparison-table-header">
            <div className="col-aspect">ASPECTO</div>
            <div className="col-old">❌ CHATBOT TRADICIONAL</div>
            <div className="col-new">⚡ AGENTE DE IA SYNC</div>
          </div>
          <div className="comparison-table-rows">
            {comparisonPoints.map((pt, i) => (
              <div className="comparison-row" key={i}>
                <div className="col-aspect"><strong>{pt.topic}</strong></div>
                <div className="col-old"><p>{pt.oldChatbot}</p></div>
                <div className="col-new"><p>{pt.aiAgent}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Superpowers Section */}
      <section className="sync-capabilities-section" id="recursos">
        <header className="sync-section-heading">
          <div>
            <span>06 / RECURSOS E TECNOLOGIA</span>
            <h2>Tudo o que seu Agente de IA<br />é capaz de executar.</h2>
          </div>
          <p>Construído sobre modelos de linguagem de última geração com arquitetura segura anti-alucinação e conexão em tempo real.</p>
        </header>

        <div className="capabilities-grid">
          {capabilities.map((cap) => (
            <article className="capability-card" key={cap.number}>
              <span className="cap-number">{cap.number}</span>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="sync-pricing" id="planos">
        <header className="sync-section-heading">
          <div><span>07 / PLANOS &amp; IMPLANTAÇÃO</span><h2>Invista em produtividade.<br />Sem taxa de criação inicial.</h2></div>
          <p>Escolha a estrutura de Agentes de IA que sua operação necessita. Todos os planos incluem treinamento e acompanhamento especializado.</p>
        </header>
        <div className="sync-offer-proof" aria-label="Por que começar com o Avancini Sync">
          <article><small>01 · SEM TAXA DE CRIAÇÃO</small><strong>Setup e calibração inclusos</strong><span>Construímos a base de conhecimento e calibramos o agente sem custo extra.</span></article>
          <article><small>02 · RETORNO IMEDIATO</small><strong>Zero leads perdidos</strong><span>Seu atendimento responde em segundos, dia e noite, aumentando a conversão.</span></article>
          <article><small>03 · SEGURANÇA TOTAL</small><strong>Diretrizes anti-alucinação</strong><span>A IA responde estritamente o que sua empresa autorizar e orientar.</span></article>
        </div>
        <div className="sync-plan-configurator sync-single-plan-configurator">
          <div className="sync-plan-configurator-body">
            <div className="sync-plan-picker" role="group" aria-label="Escolha um plano Sync">
              {syncPlans.map((plan, index) => (
                <button
                  type="button"
                  key={plan.name}
                  className={selectedPlanIndex === index ? "active" : ""}
                  aria-pressed={selectedPlanIndex === index}
                  onClick={() => setSelectedPlanIndex(index)}
                >
                  <small>0{index + 1} · {plan.label}</small>
                  <strong>{plan.name}</strong>
                  <span>{plan.definition}</span>
                </button>
              ))}
              <div className="sync-price-promise">
                <small>CONDIÇÃO DE LANÇAMENTO</small>
                <strong>Setup, calibração e suporte inclusos.</strong>
                <span>Sem taxa de criação</span>
              </div>
            </div>
            <div className="sync-plan-grid">
              {[syncPlans[selectedPlanIndex]].map((plan) => {
                const selectedCycle = syncPaymentCycles.find((item) => item.id === paymentCycle) ?? syncPaymentCycles[0];
                const total = plan.cyclePrices[paymentCycle];
                const priceLabel = paymentCycle === "monthly"
                  ? `${plan.price}${plan.suffix}`
                  : `A partir de ${formatSyncPlanMoney(total)}${paymentCycle === "semiannual" ? "/semestre" : "/ano"}`;
                return (
                  <article className={selectedPlanIndex === 1 ? "featured" : ""} key={plan.name}>
                    <div className="sync-plan-top">
                      <span>0{selectedPlanIndex + 1}</span>
                      <small>{plan.label}</small>
                      <b>SEM TAXA DE CRIAÇÃO</b>
                    </div>
                    <h3>{plan.name}</h3>
                    <strong>{priceLabel}</strong>
                    <p>{plan.description}</p>
                    <div className="sync-plan-clarity">
                      <div><b>O que é</b><span>{plan.definition}</span></div>
                      <div><b>Para quem serve</b><span>{plan.fit}</span></div>
                      <div><b>Na prática</b><span>{plan.example}</span></div>
                    </div>
                    <small className="sync-plan-includes">O QUE ESTÁ INCLUSO</small>
                    <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <div className="sync-plan-closing">
                      <div className="payment-cycle-block sync-payment-cycle-block">
                        <div className="payment-cycle-heading">
                          <span>ESCOLHA O CICLO DE PAGAMENTO</span>
                          <small>Flexibilidade total para sua empresa</small>
                        </div>
                        <div className="payment-cycle-options" role="group" aria-label="Frequência de pagamento do Sync">
                          {syncPaymentCycles.map((option) => (
                            <button
                              type="button"
                              key={option.id}
                              className={paymentCycle === option.id ? "active" : ""}
                              aria-pressed={paymentCycle === option.id}
                              onClick={() => setPaymentCycle(option.id)}
                            >
                              <strong>{option.label}{option.id !== "monthly" && <i>{option.detail}</i>}</strong>
                              <span>
                                {option.id === "monthly"
                                  ? `${formatSyncPlanMoney(plan.cyclePrices.monthly)} por mês`
                                  : option.id === "semiannual"
                                  ? `${formatSyncPlanMoney(plan.cyclePrices.semiannual)} a cada 6 meses`
                                  : `${formatSyncPlanMoney(plan.cyclePrices.annual)} à vista`}
                              </span>
                            </button>
                          ))}
                        </div>
                        <p className="card-limit-note">No mensal, apenas o valor daquele mês é cobrado. Semestral e anual são cobrados antecipadamente com descontos especiais.</p>
                      </div>
                      <button className="sync-plan-cta" type="button" onClick={() => openLead(`${plan.name} por ${priceLabel}, no ciclo ${selectedCycle.label.toLowerCase()} e sem taxa de criação`)}>
                        <span><strong>Contratar {plan.name}</strong><small>Validar meu fluxo e iniciar calibração do Agente</small></span>
                        <SyncArrow />
                      </button>
                      <small className="sync-plan-contact-note">Nenhum pagamento agora. Primeiro estruturamos o seu caso de uso.</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sync-faq" id="duvidas">
        <div>
          <span>08 / PERGUNTAS FREQUENTES</span>
          <h2>Tudo o que você precisa<br />saber sobre o Agente IA.</h2>
          <p>Sem jargões técnicos complicados. Entenda como funciona na prática.</p>
          <button type="button" onClick={() => openLead("tirar dúvidas sobre a implantação de um Agente de IA")}>Tirar dúvidas com especialista <SyncArrow /></button>
        </div>
        <div>
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span>+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="sync-final">
        <AvanciniMark variant="sync" className="sync-final-mark avancini-a-mark" />
        <span>AVANCINI SYNC / TRANSFORMAÇÃO DIGITAL</span>
        <h2>Seus concorrentes ainda deixam clientes esperando.<br />Coloque um Agente de IA trabalhando hoje.</h2>
        <p>Converse com nosso time e veja em poucos minutos como um Agente de IA sob medida pode assumir o atendimento e acelerar as vendas da sua empresa.</p>
        <button type="button" onClick={() => openLead("estruturar um Agente de IA para minha empresa")}>Quero um Agente de IA na minha empresa <SyncArrow /></button>
      </section>

      {/* Footer */}
      <footer className="sync-footer">
        <Link href="/" className="sync-brand">
          <AvanciniMark variant="sync" className="sync-brand-mark avancini-a-mark" />
          <span><b>AVANCINI <em>SYNC</em></b><small>Agentes de IA Autônomos</small></span>
        </Link>
        <p>Inteligência Artificial e Agentes Autônomos para empresas que não aceitam perder clientes por demora no atendimento.</p>
        <nav>
          <a href="#demonstracao">Demonstração</a>
          <a href="#treinamento">Treinamento</a>
          <a href="#para-quem">Para quem é</a>
          <a href="#integracoes">Integrações</a>
          <a href="#comparativo">Chatbot vs IA</a>
          <a href="#planos">Planos</a>
          <Link href="/dash">Avancini Dash <SyncArrow /></Link>
        </nav>
        <div>
          <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
          <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <SyncArrow /></a>
        </div>
        <small>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</small>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <button className="whatsapp-float sync-whatsapp-float" type="button" aria-label="Conversar sobre Agentes de IA no WhatsApp" onClick={() => openLead("um Agente de IA para automatizar meu atendimento")}>
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>

      {/* WhatsApp Lead Modal */}
      {leadContext && (
        <div className="web-lead-modal sync-web-lead-modal" role="dialog" aria-modal="true" aria-label="Iniciar conversa pelo WhatsApp">
          <form onSubmit={submitLead}>
            <button className="web-lead-close" type="button" aria-label="Fechar" onClick={() => setLeadContext("")}>
              ×
            </button>
            <header>
              <AvanciniMark variant="sync" className="lead-logo avancini-a-mark" />
              <div>
                <strong>AVANCINI SYNC // AGENTE DE IA</strong>
                <b><i>●</i> OPERAÇÃO INTELIGENTE 24/7</b>
              </div>
            </header>
            <p className="lead-modal-context">
              Você selecionou: <strong>{normalizedLeadContext}</strong>.
            </p>
            <label>
              <span>NOME</span>
              <input
                ref={leadInputRef}
                type="text"
                placeholder="Seu nome ou da sua empresa"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
              />
            </label>
            <label className="phone-input-label">
              <span>WHATSAPP</span>
              <div className="ddi-selector-wrapper">
                <button
                  type="button"
                  className="ddi-trigger-btn"
                  onClick={() => setDdiDropdownOpen(!ddiDropdownOpen)}
                  aria-expanded={ddiDropdownOpen}
                  aria-label="Selecionar país do telefone"
                >
                  <CountryFlagIcon code={selectedCountry.code} />
                  <b>{selectedCountry.ddi}</b>
                  <i className="ddi-arrow">▼</i>
                </button>
                {ddiDropdownOpen && (
                  <div className="ddi-dropdown-menu">
                    <div className="ddi-search-box">
                      <input
                        type="text"
                        placeholder="Buscar país ou código..."
                        value={ddiSearch}
                        onChange={(e) => setDdiSearch(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ul className="ddi-list-options">
                      {filteredCountries.map((country) => (
                        <li key={country.code}>
                          <button
                            type="button"
                            className={`ddi-option-item ${selectedCountry.code === country.code ? "selected" : ""}`}
                            onClick={() => {
                              setSelectedCountry(country);
                              setDdiDropdownOpen(false);
                              setDdiSearch("");
                            }}
                          >
                            <CountryFlagIcon code={country.code} />
                            <span className="country-name">{country.name}</span>
                            <span className="country-code">{country.ddi}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <input
                type="tel"
                placeholder={selectedCountry.placeholder}
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
              />
            </label>
            {leadError && <p className="lead-error">{leadError}</p>}
            <button className="lead-submit sync-lead-submit" type="submit" disabled={leadSubmitting}>
              {leadSubmitting ? "CONECTANDO..." : "CONVERSAR NO WHATSAPP COM O AGENTE"} <SyncArrow />
            </button>
            <small>Ao clicar, você será direcionado para o WhatsApp da Avancini Sync.</small>
          </form>
        </div>
      )}
    </main>
  );
}
