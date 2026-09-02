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

/* --------------------------------------------------------------------------
   SUPERVISOR MULTIAGENTE — SIMULAÇÃO INTERATIVA NO HERO
   -------------------------------------------------------------------------- */
const supervisorAgents = [
  {
    id: "sdr",
    name: "Agente SDR Vendas",
    role: "Qualificação & Pipeline",
    status: "Respondendo Lead em 1.1s",
    log: "Extraiu faturamento, identificou urgência de implantação e encaminhou proposta.",
    activeBadge: "⚡ Vendas Ativas",
  },
  {
    id: "agenda",
    name: "Agente de Agendamento",
    role: "Google Calendar & Meet",
    status: "Verificando grade livre",
    log: "Consultou slots livres no Google Calendar e agendou reunião para amanhã às 15h.",
    activeBadge: "📅 Agenda Conectada",
  },
  {
    id: "suporte",
    name: "Agente Suporte & Operação",
    role: "Resolução em 1º Nível",
    status: "Sem fila de espera",
    log: "Localizou pedido #8921 no sistema e enviou código de rastreamento com link direto.",
    activeBadge: "🔍 Resolução 15s",
  },
  {
    id: "recuperacao",
    name: "Agente Follow-up Ativo",
    role: "Recuperação de Clientes",
    status: "Reativando orçamentos",
    log: "Detectou cliente parado há 48h e disparou mensagem humanizada com condição especial.",
    activeBadge: "🔄 Recuperação",
  },
];

/* --------------------------------------------------------------------------
   JORNADA COMERCIAL: ONDE A EQUIPE DIGITAL ATUA
   -------------------------------------------------------------------------- */
const commercialJourney = [
  {
    id: "pre-venda",
    phase: "01 / PRÉ-VENDA",
    title: "Velocidade & Triagem Inteligente",
    badge: "PRIMEIRO CONTATO",
    summary: "Seu cliente não fica 1 minuto esperando. O Supervisor distribui o contato para o Agente Comercial, que acolhe e qualifica o lead.",
    points: [
      "Tempo de resposta inferior a 2 segundos",
      "Qualifica faturamento, orçamento, nicho ou urgência",
      "Compreende áudios e mensagens de texto livre",
      "Filtra curiosos e entrega leads prontos para sua equipe",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Redução de até 90% na perda de leads por demora",
  },
  {
    id: "venda",
    phase: "02 / VENDA & FECHAMENTO",
    title: "Apresentação & Agendamento",
    badge: "CONVERSÃO",
    summary: "O Agente tira dúvidas técnicas, contorna objeções frequentes, apresenta soluções e agenda reuniões direto na grade da sua equipe.",
    points: [
      "Apresenta serviços, planos e diferenciais do seu negócio",
      "Verifica horários livres e cria convites com link de chamada",
      "Executa follow-up ativo com quem parou de responder",
      "Gera chave Pix ou link de pagamento seguro no WhatsApp",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Aceleração expressiva no volume de reuniões marcadas",
  },
  {
    id: "pos-venda",
    phase: "03 / PÓS-VENDA & ATENDIMENTO",
    title: "Resolução Imediata & Suporte",
    badge: "RELACIONAMENTO",
    summary: "Resolve dúvidas operacionais, emite 2ª via, informa status de pedidos ou veículos e reativa clientes antigos de forma proativa.",
    points: [
      "Consulta status de serviços e pedidos em tempo real",
      "Tira dúvidas frequentes sem necessidade de atendente humano",
      "Coleta avaliações e satisfação pós-atendimento",
      "Reativa clientes inativos com ofertas no momento certo",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Desafoga até 70% das mensagens repetitivas da sua equipe",
  },
  {
    id: "operacao",
    phase: "04 / OPERAÇÃO INTEGRADA",
    title: "Sincronização com CRM & Transbordo",
    badge: "PRODUTIVIDADE",
    summary: "Tudo o que os agentes conversam é registrado no seu CRM. Quando o caso exige um humano, a equipe recebe um resumo executivo pronto.",
    points: [
      "Integração nativa com RD Station, HubSpot e Google Sheets",
      "Transbordo inteligente para humanos com histórico estruturado",
      "Conexão estável com WhatsApp sem burocracia via QR Code",
      "Zero dados perdidos ou esquecidos em conversas soltas",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Sua equipe atual rende muito mais focando no fechamento",
  },
];

/* --------------------------------------------------------------------------
   COMPARATIVO FINANCEIRO: CUSTO DE FUNCIONÁRIO VS. MULTIAGENTE IA
   -------------------------------------------------------------------------- */
const financialComparison = {
  employee: {
    title: "Ampliar Equipe Tradicional",
    subtitle: "Custo total de contratação para tarefas operacionais e repetitivas",
    items: [
      { label: "Salário base + encargos trabalhistas", detail: "A CLT adiciona entre 60% e 70% a mais em encargos, FGTS e impostos na folha" },
      { label: "Benefícios obrigatórios e provisões", detail: "Vale transporte, alimentação, férias proporcionais, 13º salário e rescisões" },
      { label: "Treinamento e tempo de adaptação", detail: "Semanas para treinar novos funcionários e risco de rotatividade (turnover)" },
      { label: "Horário limitado a 8h/dia", detail: "Operação restrita aos dias úteis — noites, fins de semana e feriados sem cobertura" },
      { label: "Gargalo no atendimento simultâneo", detail: "Um atendente humano consegue conversar com poucos clientes por vez no pico" },
    ],
    verdict: "Custo alto e difícil de escalar sem inflar a folha",
  },
  aiAgent: {
    title: "Equipe Multiagente de IA",
    subtitle: "Agente Supervisor e especialistas treinados no seu negócio",
    items: [
      { label: "Investimento fixo e previsível", detail: "Apenas uma mensalidade acessível, sem encargos, passivos trabalhistas ou rescisões" },
      { label: "Disponibilidade 24 horas por dia", detail: "Atende noites, madrugadas, sábados, domingos e feriados com o mesmo padrão" },
      { label: "Treinamento sob medida incluso", detail: "Todos os agentes são calibrados com os dados e regras da sua empresa antes de operar" },
      { label: "Escala simultânea elástica", detail: "Atende dezenas ou centenas de clientes simultaneamente sem criar fila de espera" },
      { label: "Alívio imediato para sua equipe", detail: "Seus funcionários atuais deixam as tarefas repetitivas e focam em fechar vendas" },
    ],
    verdict: "Pode custar menos de 20% do custo de uma contratação",
  },
};

/* --------------------------------------------------------------------------
   NICHOS ESPECÍFICOS: O QUE A IA EXECUTA EM CADA SEGMENTO
   -------------------------------------------------------------------------- */
const nicheSolutions = [
  {
    id: "advocacia",
    title: "Advocacia & Jurídico",
    icon: "⚖️",
    badge: "CONFIDENCIALIDADE & TRIAGEM",
    role: "Triagem preliminar de clientes, qualificação de causas e agendamento de consultas com tratamento seguro e sigiloso de dados.",
    tasks: [
      "Triagem inicial de clientes e identificação da área do Direito",
      "Coleta preliminar de informações e histórico inicial do caso",
      "Agendamento de reuniões na grade dos advogados responsáveis",
      "Respostas para dúvidas frequentes de honorários e atendimento",
      "Encaminhamento para o advogado responsável com ficha pronta",
      "Atendimento inicial 24 horas para quem busca orientação urgente",
    ],
  },
  {
    id: "oficinas",
    title: "Mecânicas & Oficinas",
    icon: "🔧",
    badge: "AGENDAMENTO & PÓS-SERVIÇO",
    role: "Agendamento de manutenções, envio de status do veículo e lembretes preventivos que trazem o cliente de volta.",
    tasks: [
      "Agendamento de revisões, alinhamento, freios e troca de peças",
      "Orientações preliminares de orçamentos e prazos médios",
      "Informar status do veículo em manutenção com agilidade",
      "Lembretes preventivos (troca de óleo, pastilhas e correia)",
      "Follow-up e pesquisa de satisfação pós-entrega do carro",
      "Recuperação de clientes que não fazem revisão há mais de 6 meses",
    ],
  },
  {
    id: "clinicas",
    title: "Clínicas Médicas & Odonto",
    icon: "🏥",
    badge: "CONFIRMAÇÃO ATIVA & AGENDA",
    role: "Triagem administrativa, marcação de consultas e confirmação ativa que diminui faltas e desafoga a recepção.",
    tasks: [
      "Agendamento automático de consultas e exames na agenda médica",
      "Confirmação ativa de comparecimento com lembretes automáticos",
      "Orientações pré-exame (jejum, preparo e documentação)",
      "Tira-dúvidas sobre convênios aceitos e regras de atendimento",
      "Acolhimento humanizado e triagem administrativa dos pacientes",
      "Recuperação de pacientes para retorno ou revisão periódica",
    ],
  },
  {
    id: "imobiliarias",
    title: "Imobiliárias & Construtoras",
    icon: "🏢",
    badge: "QUALIFICAÇÃO DE COMPRADORES",
    role: "Qualificação instantânea para que o corretor só gaste tempo atendendo compradores reais com perfil validado.",
    tasks: [
      "Qualificação do cliente: compra ou locação, bairro e orçamento",
      "Filtro inteligente de características e metragem desejada",
      "Envio imediato de opções do acervo com fotos e ficha técnica",
      "Agendamento de visitas presenciais direto na agenda do corretor",
      "Follow-up contínuo com clientes que deixaram de responder",
      "Reativação de leads parados recebidos pelos portais",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & Lojas",
    icon: "🛍️",
    badge: "STATUS DE PEDIDOS & PIX",
    role: "Atendimento imediato para dúvidas de produtos, status de entrega e recuperação de compras não finalizadas.",
    tasks: [
      "Consulta instantânea de status de pedido e código de rastreio",
      "Tira-dúvidas sobre tamanhos, prazos e especificações",
      "Geração de chave Pix e link de pagamento na própria conversa",
      "Recuperação proativa de clientes com pedidos pendentes",
      "Apoio ao pós-venda, trocas e garantias com regras claras",
      "Atendimento contínuo nos horários de pico noturnos",
    ],
  },
  {
    id: "b2b",
    title: "Serviços B2B & Consultorias",
    icon: "💼",
    badge: "SDR COMERCIAL AUTÔNOMO",
    role: "SDR de IA que aborda, qualifica porte/faturamento e entrega reuniões de proposta prontas para os executivos.",
    tasks: [
      "Qualifica porte da empresa, faturamento e dor principal",
      "Elimina curiosos e leads desqualificados antes da sua equipe",
      "Apresenta visão geral de serviços e propostas formatadas",
      "Agenda reuniões no Google Meet com links automáticos",
      "Notifica o consultor no WhatsApp com resumo executivo pronto",
      "Sincroniza todas as informações direto no CRM da empresa",
    ],
  },
];

/* --------------------------------------------------------------------------
   PLANOS SIMPLIFICADOS — ARQUITETURA MULTIAGENTE INCLUSA EM TODOS
   Valores limpos e sem números quebrados no anual.
   -------------------------------------------------------------------------- */
type SyncPlanSimple = {
  id: string;
  name: string;
  badge: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  volumeLabel: string;
  tagline: string;
  idealFor: string;
  keyHighlights: string[];
  ctaText: string;
};

const simplifiedPlans: SyncPlanSimple[] = [
  {
    id: "inicial",
    name: "Multiagente Inicial",
    badge: "FLUXO LEVE A MODERADO",
    monthlyPrice: 490,
    annualMonthlyPrice: 390,
    volumeLabel: "Até 1.500 mensagens / mês",
    tagline: "Arquitetura Multiagente com Supervisor e especialistas para operações em estruturação.",
    idealFor: "Profissionais liberais, consultórios e empresas com fluxo inicial constante.",
    keyHighlights: [
      "Agente Supervisor + Agentes Especialistas",
      "Treinamento personalizado na base da sua empresa",
      "Conexão com 1 WhatsApp via QR Code",
      "Agendamento no Google Calendar / Calendly",
      "Transbordo para humano com resumo pronto",
      "Setup e calibração inclusos (sem taxa de criação)",
    ],
    ctaText: "Começar com Plano Inicial",
  },
  {
    id: "pro",
    name: "Multiagente Pro",
    badge: "MAIS ESCOLHIDO",
    monthlyPrice: 890,
    annualMonthlyPrice: 690,
    volumeLabel: "Até 5.000 mensagens / mês",
    tagline: "Para empresas com volume diário ativo que buscam acelerar vendas e reter clientes.",
    idealFor: "Clínicas, imobiliárias, oficinas, escritórios e empresas comerciais com volume ativo.",
    keyHighlights: [
      "Agente Supervisor coordenando múltiplos fluxos",
      "Compreensão de áudios de clientes (Whisper)",
      "Respostas em áudio humanizado (opcional)",
      "Sincronização com CRM (RD Station, HubSpot, Sheets)",
      "Follow-up ativo de recuperação de leads parados",
      "Geração de links Pix / pagamento no chat",
    ],
    ctaText: "Contratar Multiagente Pro",
  },
  {
    id: "enterprise",
    name: "Multiagente Enterprise",
    badge: "ALTO VOLUME & ESCALA",
    monthlyPrice: 1490,
    annualMonthlyPrice: 1190,
    volumeLabel: "Volume sob medida / Alto fluxo",
    tagline: "Operações com múltiplos canais, alto fluxo diário ou integração com ERP/APIs privadas.",
    idealFor: "Redes, grandes clínicas, concessionárias e empresas com regras complexas de atendimento.",
    keyHighlights: [
      "Supervisor Multi-departamento e agentes ilimitados",
      "Conexão multicanal (WhatsApp, Instagram e Site)",
      "Integração profunda com ERPs e bancos de dados SQL",
      "Automações sob medida via Webhooks (n8n, Make)",
      "Roteamento de leads por departamento/vendedor",
      "SLA de suporte dedicado com calibração contínua",
    ],
    ctaText: "Estruturar Solução Enterprise",
  },
];

const formatMoney = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

const faqsCommercial = [
  {
    question: "O que é a arquitetura Multiagente com Agente Supervisor?",
    answer: "Em vez de uma IA que tenta fazer tudo de forma confusa, o Agente Supervisor funciona como um gerente de equipe: ele acolhe a mensagem do cliente, identifica a intenção e delega para o agente especialista correspondente (SDR de Vendas, Suporte/Pós-Venda, Agendamento ou Cobrança). Isso garante precisão cirúrgica sem falhas.",
  },
  {
    question: "A IA substitui os meus funcionários?",
    answer: "O objetivo não é demitir funcionários, mas fazer sua equipe atual render muito mais. A IA assume as tarefas repetitivas, o atendimento de noites e fins de semana e a triagem inicial. Quando surge uma negociação complexa ou uma situação que exige empatia humana, a IA transfere o cliente com um resumo pronto de toda a conversa.",
  },
  {
    question: "Como funciona o Plano Anual? Bloqueia o limite do meu cartão?",
    answer: "Não! No plano anual, o valor é cobrado de forma recorrente mês a mês, sem comprometer o limite total do seu cartão de crédito. Trata-se de um compromisso de 12 meses com desconto garantido.",
  },
  {
    question: "E se eu precisar cancelar o plano anual antes de 12 meses?",
    answer: "Nossa política é justa e transparente: não cobramos multas abusivas com todos os meses restantes como fazem operadoras de telefonia. Se você precisar cancelar antes, apenas é recalculada a diferença do desconto usufruído (cobrança retroativa da diferença para o valor do plano mensal nos meses em que o serviço foi utilizado). Você nunca fica refém.",
  },
  {
    question: "Como funciona a conexão com o WhatsApp?",
    answer: "A conexão é simples e rápida via leitura de QR Code diretamente no seu celular, semelhante ao WhatsApp Web. Você pode utilizar seu número comercial atual sem burocracia, com estabilidade contínua e transbordo seguro para seus atendentes.",
  },
  {
    question: "A IA pode inventar dados ou falar coisas erradas?",
    answer: "Nossos Agentes utilizam camadas rigorosas de proteção RAG (Retrieval-Augmented Generation) com diretrizes anti-alucinação. Eles respondem estritamente com base nos manuais, tabelas e regras que você aprovar. Se houver alguma dúvida fora do escopo, a IA informa educadamente e transfere para sua equipe.",
  },
];

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [activeSupervisorIndex, setActiveSupervisorIndex] = useState(0);
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  const [activeNicheIndex, setActiveNicheIndex] = useState(0);

  // Lead modal states
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
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const normalizedLeadContext = leadContext.trim().replace(/[.!?]+$/, "");

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateHeader = () => setScrolled(window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!leadContext && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeadContext("");
        setMenuOpen(false);
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [leadContext, menuOpen]);

  useEffect(() => {
    if (!leadContext) return;
    const timer = window.setTimeout(() => leadInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [leadContext]);

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
          source: "sync_multiagent",
          page: "/sync",
        }),
      }).catch(() => {});
    } catch {}

    const phoneText = fullPhone ? ` Meu WhatsApp é ${fullPhone}.` : "";
    const message = `Olá! Meu nome é ${name}.${phoneText} Conheci o Avancini Sync e quero saber mais sobre ${normalizedLeadContext}.`;
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
    <main className="sync-page sync-commercial-layout">
      {/* Header Compacto de Navegação */}
      <header className={`header sync-shared-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="logo" aria-label="Avancini Sync, início">
          <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
          <span>
            <span className="brand-name">AVANCINI <b>SYNC</b></span>
            <small>Equipe Multiagente de IA</small>
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

      {/* Menu Overlay */}
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
            <span>ARQUITETURA MULTIAGENTE <i /> AVANCINI SYNC</span>
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
              ["01", "Início", "Supervisor & Multiagentes de IA", "#inicio"],
              ["02", "Jornada da IA", "Pré-venda, Venda e Pós-venda", "#jornada"],
              ["03", "Custo vs. Retorno", "IA x Ampliar equipe tradicional", "#retorno"],
              ["04", "Segmentos & Nichos", "Configuração sob medida", "#nichos"],
              ["05", "Planos Claros", "Sem armadilhas no anual", "#planos"],
              ["06", "Conexão WhatsApp", "QR Code rápido e estável", "#conexao"],
              ["07", "Dúvidas Frequentes", "Respostas diretas e honestas", "#duvidas"],
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
            <span><i /> FAÇA SUA EQUIPE RENDER MAIS ANTES DE CONTRATAR MAIS GENTE</span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openLead("uma demonstração de como a equipe de IA atende minha empresa");
              }}
            >
              SOLICITAR DEMONSTRAÇÃO <SyncArrow />
            </button>
          </div>
        </div>
      )}

      {/* 1. HERO COMPACTO, VIVO & INTERATIVO (SUPERVISOR MULTIAGENTE EM TEMPO REAL) */}
      <section className="sync-hero sync-hero-compact" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        
        <div className="sync-hero-copy">
          <div className="sync-hero-badge-row">
            <span className="sync-eyebrow"><i /> ARQUITETURA MULTIAGENTE · SUPERVISOR INTELIGENTE</span>
            <span className="sync-hero-live-pill"><i /> OPERAÇÃO 24/7 · RESPOSTA EM &lt; 2S</span>
          </div>

          <h1>Sua empresa crescendo sem precisar<br /><em>inchar a equipe para atender clientes.</em></h1>
          
          <p>
            Um <strong>Agente Supervisor</strong> que orquestra agentes especialistas para qualificar leads, tirar dúvidas, agendar reuniões e fechar vendas no WhatsApp — dia e noite, por uma fração do custo de uma contratação.
          </p>

          <div className="sync-hero-actions">
            <a href="#retorno">Comparar com funcionário <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos simples <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("implantar a equipe de IA na minha empresa")}>
              Quero uma demonstração prática <SyncArrow />
            </button>
          </div>

          {/* Painel Interativo Vivo do Supervisor Multiagente (Substitui os 4 cards estáticos e mortos) */}
          <div className="supervisor-live-cockpit" aria-label="Painel de Orquestração do Supervisor Multiagente">
            <div className="cockpit-header">
              <div className="cockpit-status-dot">
                <span className="pulse-ring" />
                <span className="dot" />
              </div>
              <div className="cockpit-title">
                <strong>SUPERVISOR DE IA // ORQUESTRAÇÃO EM TEMPO REAL</strong>
                <small>Distribuindo tarefas automaticamente entre os agentes especializados</small>
              </div>
              <span className="cockpit-live-tag">STATUS: 100% OPERACIONAL</span>
            </div>

            <div className="cockpit-tabs-row" role="tablist" aria-label="Agentes Especialistas">
              {supervisorAgents.map((agent, i) => (
                <button
                  type="button"
                  key={agent.id}
                  role="tab"
                  aria-selected={activeSupervisorIndex === i}
                  className={`cockpit-agent-btn ${activeSupervisorIndex === i ? "active" : ""}`}
                  onClick={() => setActiveSupervisorIndex(i)}
                >
                  <span className="btn-indicator" />
                  <strong>{agent.name}</strong>
                  <small>{agent.activeBadge}</small>
                </button>
              ))}
            </div>

            {(() => {
              const currentAgent = supervisorAgents[activeSupervisorIndex];
              return (
                <div className="cockpit-body">
                  <div className="cockpit-log-line">
                    <span className="log-badge">{currentAgent.name}</span>
                    <span className="log-role">{currentAgent.role}</span>
                    <span className="log-status">● {currentAgent.status}</span>
                  </div>
                  <div className="cockpit-action-box">
                    <p>
                      <em>Ação em andamento:</em> &ldquo;{currentAgent.log}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 2. A JORNADA DA IA: PRÉ-VENDA → VENDA → PÓS-VENDA → OPERAÇÃO */}
      <section className="sync-commercial-section" id="jornada" aria-labelledby="sync-journey-title">
        <header className="sync-section-heading">
          <div>
            <span>01 / A FORÇA DE TRABALHO DIGITAL</span>
            <h2 id="sync-journey-title">Você não contrata só um chatbot.<br />Você contrata uma equipe digital.</h2>
          </div>
          <p>O Supervisor delega para agentes especializados em cada fase da sua empresa, reduzindo tarefas repetitivas e aumentando a conversão.</p>
        </header>

        <div className="commercial-journey-container">
          <div className="journey-tabs-list" role="tablist" aria-label="Etapas de atuação da IA">
            {commercialJourney.map((stage, idx) => (
              <button
                type="button"
                key={stage.id}
                role="tab"
                aria-selected={activeJourneyIndex === idx}
                className={`journey-tab-btn ${activeJourneyIndex === idx ? "active" : ""}`}
                onClick={() => setActiveJourneyIndex(idx)}
              >
                <span className="journey-tab-phase">{stage.phase}</span>
                <strong>{stage.title}</strong>
              </button>
            ))}
          </div>

          <div className="journey-display-card">
            {(() => {
              const current = commercialJourney[activeJourneyIndex];
              return (
                <div className="journey-content-wrapper">
                  <div className="journey-header">
                    <span className="journey-badge">{current.badge}</span>
                    <h3>{current.title}</h3>
                    <p>{current.summary}</p>
                  </div>
                  <ul className="journey-points-list">
                    {current.points.map((pt, i) => (
                      <li key={i}>
                        <i>⚡</i>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="journey-metric-callout">
                    <small>{current.metricLabel}:</small>
                    <strong>{current.metricValue}</strong>
                  </div>
                  <button
                    type="button"
                    className="journey-cta-btn"
                    onClick={() => openLead(`a atuação da IA em ${current.title}`)}
                  >
                    Ver demonstração para {current.title.split("&")[0]} <SyncArrow />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. COMPARATIVO FINANCEIRO: CUSTO DE FUNCIONÁRIO VS. MULTIAGENTE IA */}
      <section className="sync-commercial-section sync-cost-comparison" id="retorno" aria-labelledby="sync-cost-title">
        <header className="sync-section-heading">
          <div>
            <span>02 / IMPACTO FINANCEIRO &amp; RETORNO</span>
            <h2 id="sync-cost-title">Quanto custa aumentar a equipe?<br />Faça sua empresa render antes de contratar.</h2>
          </div>
          <p>Entenda por que uma solução de inteligência artificial oferece escala sem gerar custos trabalhistas desproporcionais.</p>
        </header>

        <div className="financial-comparison-grid">
          {/* Card Funcionário Tradicional */}
          <div className="fin-card fin-card-employee">
            <div className="fin-card-top">
              <span className="fin-badge fin-badge-alt">OPERAÇÃO TRADICIONAL</span>
              <h3>{financialComparison.employee.title}</h3>
              <p>{financialComparison.employee.subtitle}</p>
            </div>
            <ul className="fin-list">
              {financialComparison.employee.items.map((item, i) => (
                <li key={i}>
                  <strong className="fin-negative">✕ {item.label}</strong>
                  <small>{item.detail}</small>
                </li>
              ))}
            </ul>
            <div className="fin-verdict fin-verdict-alt">
              <small>CENÁRIO:</small>
              <strong>{financialComparison.employee.verdict}</strong>
            </div>
          </div>

          {/* Card Multiagente de IA */}
          <div className="fin-card fin-card-ai">
            <div className="fin-card-top">
              <span className="fin-badge">SOLUÇÃO AVANCINI SYNC</span>
              <h3>{financialComparison.aiAgent.title}</h3>
              <p>{financialComparison.aiAgent.subtitle}</p>
            </div>
            <ul className="fin-list">
              {financialComparison.aiAgent.items.map((item, i) => (
                <li key={i}>
                  <strong className="fin-positive">✓ {item.label}</strong>
                  <small>{item.detail}</small>
                </li>
              ))}
            </ul>
            <div className="fin-verdict fin-verdict-positive">
              <small>VANTAGEM ECONÔMICA:</small>
              <strong>{financialComparison.aiAgent.verdict}</strong>
            </div>
          </div>
        </div>

        <div className="fin-closing-note">
          <p>
            💡 <strong>Importante:</strong> Não prometemos demissão em massa. Nosso foco é <em>produtividade real</em>: permitir que a mesma equipe atenda 5x a 10x mais clientes e cresça sem elevar a folha de pagamento na mesma proporção.
          </p>
        </div>
      </section>

      {/* 4. NICHOS: O QUE A IA EXECUTA EM CADA SEGMENTO */}
      <section className="sync-commercial-section" id="nichos" aria-labelledby="sync-niches-title">
        <header className="sync-section-heading">
          <div>
            <span>03 / ADAPTAÇÃO POR SEGMENTO</span>
            <h2 id="sync-niches-title">Não vendemos IA genérica.<br />Configuramos a IA para o seu negócio.</h2>
          </div>
          <p>Cada segmento possui rotinas e necessidades específicas. Veja exatamente o que os agentes executam na sua área:</p>
        </header>

        <div className="niche-selector-tabs" role="tablist" aria-label="Nichos atendidos">
          {nicheSolutions.map((item, idx) => (
            <button
              type="button"
              key={item.id}
              role="tab"
              aria-selected={activeNicheIndex === idx}
              className={`niche-tab-pill ${activeNicheIndex === idx ? "active" : ""}`}
              onClick={() => setActiveNicheIndex(idx)}
            >
              <span>{item.icon}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>

        {(() => {
          const niche = nicheSolutions[activeNicheIndex];
          return (
            <div className="niche-detail-panel">
              <div className="niche-detail-header">
                <div>
                  <span className="niche-tag-badge">{niche.badge}</span>
                  <h3>{niche.icon} {niche.title}</h3>
                </div>
                <p>{niche.role}</p>
              </div>

              <div className="niche-tasks-grid">
                {niche.tasks.map((task, i) => (
                  <div className="niche-task-item" key={i}>
                    <span className="niche-task-num">0{i + 1}</span>
                    <p>{task}</p>
                  </div>
                ))}
              </div>

              {/* Rodapé do Nicho Refinado e Integrado (Elimina a faixa preta desproporcional) */}
              <div className="niche-integrated-cta-bar">
                <div className="cta-bar-info">
                  <span className="cta-bar-icon">{niche.icon}</span>
                  <div>
                    <strong>Pronto para automatizar a rotina de {niche.title.split("&")[0]}?</strong>
                    <small>Apresentamos uma demonstração ao vivo adaptada às regras do seu estabelecimento.</small>
                  </div>
                </div>
                <button
                  type="button"
                  className="niche-cta-highlight"
                  onClick={() => openLead(`a implantação da IA para ${niche.title}`)}
                >
                  Configurar IA para {niche.title.split("&")[0]} <SyncArrow />
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. PLANOS CLAROS COM ARQUITETURA MULTIAGENTE EM TODOS */}
      <section className="sync-commercial-section" id="planos" aria-labelledby="sync-plans-title">
        <header className="sync-section-heading">
          <div>
            <span>04 / INVESTIMENTO TRANSPARENTE</span>
            <h2 id="sync-plans-title">Três formatos simples.<br />Multiagente com Supervisor em todos.</h2>
          </div>
          <p>Não limitamos a inteligência da IA. Todos os planos contam com Supervisor e agentes especializados — você escolhe pelo volume de mensagens e complexidade da sua operação.</p>
        </header>

        {/* Toggle Mensal / Anual */}
        <div className="plan-cycle-toggle-wrapper">
          <div className="plan-cycle-toggle">
            <button
              type="button"
              className={billingPeriod === "monthly" ? "active" : ""}
              onClick={() => setBillingPeriod("monthly")}
            >
              Mensal (Sem fidelidade)
            </button>
            <button
              type="button"
              className={billingPeriod === "annual" ? "active" : ""}
              onClick={() => setBillingPeriod("annual")}
            >
              Anual <em>Desconto exclusivo</em>
            </button>
          </div>
          
          <div className="plan-transparency-box">
            <p>
              🔒 <strong>Compromisso transparente no anual:</strong> Cobrança recorrente mês a mês <strong>sem comprometer o limite total do seu cartão</strong>. Se precisar rescindir antes de 12 meses, você não paga os meses restantes: apenas é ajustada a diferença do desconto dos meses utilizados. Simples e justo.
            </p>
          </div>
        </div>

        <div className="simplified-plans-grid">
          {simplifiedPlans.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualMonthlyPrice;
            const isPro = plan.id === "pro";
            return (
              <article className={`simple-plan-card ${isPro ? "featured" : ""}`} key={plan.id}>
                {isPro && <span className="simple-plan-pill-tag">MAIS ESCOLHIDO</span>}
                <div className="plan-card-top">
                  <div className="plan-badge-row">
                    <small className="plan-badge-label">{plan.badge}</small>
                    <span className="plan-volume-badge">{plan.volumeLabel}</span>
                  </div>
                  <h3>{plan.name}</h3>
                  <div className="plan-price-display">
                    <strong>{formatMoney(price)}</strong>
                    <span>/mês</span>
                  </div>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                <div className="plan-ideal-for">
                  <small>IDEAL PARA:</small>
                  <p>{plan.idealFor}</p>
                </div>

                <ul className="plan-features-list">
                  {plan.keyHighlights.map((feat, i) => (
                    <li key={i}>
                      <i>✓</i> {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="plan-direct-cta"
                  onClick={() => openLead(`${plan.name} (${billingPeriod === "monthly" ? "Mensal" : "Anual"})`)}
                >
                  {plan.ctaText} <SyncArrow />
                </button>
                <small className="plan-secure-subnote">Setup e calibração inclusos · Sem taxa de criação inicial</small>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6. CONEXÃO WHATSAPP E INFRAESTRUTURA DESCOMPLICADA */}
      <section className="sync-commercial-section sync-whatsapp-infra" id="conexao" aria-labelledby="sync-conn-title">
        <div className="infra-banner">
          <div className="infra-banner-copy">
            <span className="infra-badge">CONEXÃO DIRETA &amp; ESTÁVEL</span>
            <h2 id="sync-conn-title">Conecte seu WhatsApp em minutos.<br />Sem burocracia ou gambiarras.</h2>
            <p>
              Gere o QR Code, escaneie no seu celular e deixe o Supervisor e os agentes assumirem o atendimento. Totalmente compatível com seu número comercial atual, com estabilidade, suporte a webhooks e transbordo seguro para seus atendentes humanos.
            </p>
            <div className="infra-features-pills">
              <span>📱 QR Code instantâneo</span>
              <span>⚡ Múltiplos atendentes</span>
              <span>🔄 Webhooks &amp; Automação</span>
              <span>🔒 Segurança e privacidade</span>
            </div>
          </div>
          <div className="infra-banner-action">
            <button
              type="button"
              className="infra-btn"
              onClick={() => openLead("como funciona a conexão com WhatsApp")}
            >
              Testar conexão no meu número <SyncArrow />
            </button>
          </div>
        </div>
      </section>

      {/* 7. DÚVIDAS FREQUENTES */}
      <section className="sync-commercial-section" id="duvidas" aria-labelledby="sync-faq-title">
        <header className="sync-section-heading">
          <div>
            <span>05 / ESCLARECIMENTOS</span>
            <h2 id="sync-faq-title">Dúvidas frequentes de quem<br />vai contratar um Agente de IA.</h2>
          </div>
          <p>Transparência total sobre tecnologia, fidelidade e funcionamento prático.</p>
        </header>

        <div className="commercial-faq-list">
          {faqsCommercial.map((faq, i) => (
            <details key={i} className="commercial-faq-item">
              <summary>
                <span>{faq.question}</span>
                <i>+</i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. CTA FINAL COMERCIAL — DESIGN PREMIUM & VIVO (Substitui o vazio preto) */}
      <section className="sync-final-commercial-v2">
        <div className="final-glow-container">
          <div className="final-orbit-glow" aria-hidden="true" />
          <AvanciniMark variant="sync" className="final-mark-symbol avancini-a-mark" />
          <span className="final-eyebrow">AVANCINI SYNC // FORÇA DE TRABALHO DIGITAL</span>
          <h2>Pronto para fazer sua empresa atender 24/7 sem inchar a folha de pagamento?</h2>
          <p>Vamos entender a rotina do seu estabelecimento e apresentar uma demonstração funcional com os agentes configurados para o seu fluxo.</p>
          
          <div className="final-buttons-row">
            <button
              type="button"
              className="final-cta-main"
              onClick={() => openLead("solicitar demonstração da equipe multiagente de IA")}
            >
              Solicitar Demonstração Gratuita <SyncArrow />
            </button>
            <a href="#planos" className="final-cta-secondary">
              Rever planos e valores <SyncDownArrow />
            </a>
          </div>

          <div className="final-proof-badges">
            <span>✓ Setup e calibração inclusos</span>
            <span>✓ Sem taxa de criação inicial</span>
            <span>✓ Conexão via QR Code em minutos</span>
          </div>
        </div>
      </section>

      {/* Footer Conciso e Elegante */}
      <footer className="sync-footer sync-footer-v2">
        <div className="footer-top-row">
          <Link href="/" className="sync-brand">
            <AvanciniMark variant="sync" className="sync-brand-mark avancini-a-mark" />
            <span><b>AVANCINI <em>SYNC</em></b><small>Equipe Multiagente de IA</small></span>
          </Link>
          <nav className="footer-links-nav">
            <a href="#inicio">Início</a>
            <a href="#jornada">Jornada</a>
            <a href="#retorno">Custo x Retorno</a>
            <a href="#nichos">Nichos</a>
            <a href="#planos">Planos</a>
            <Link href="/dash">Avancini Dash <SyncArrow /></Link>
          </nav>
        </div>
        <div className="footer-bottom-row">
          <small>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</small>
          <div className="footer-contacts">
            <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
            <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <SyncArrow /></a>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp */}
      <button
        className="whatsapp-float sync-whatsapp-float"
        type="button"
        aria-label="Conversar sobre Agentes de IA no WhatsApp"
        onClick={() => openLead("tirar dúvidas sobre a equipe de IA")}
      >
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>

      {/* Modal Comercial de WhatsApp com DDI */}
      {leadContext && (
        <div className="web-lead-modal sync-web-lead-modal" role="dialog" aria-modal="true" aria-label="Iniciar conversa pelo WhatsApp">
          <form onSubmit={submitLead}>
            <button className="web-lead-close" type="button" aria-label="Fechar" onClick={() => setLeadContext("")}>
              ×
            </button>
            <header>
              <AvanciniMark variant="sync" className="lead-logo avancini-a-mark" />
              <div>
                <strong>AVANCINI SYNC // EQUIPE MULTIAGENTE DE IA</strong>
                <b><i>●</i> ATENDIMENTO &amp; VENDAS 24/7</b>
              </div>
            </header>
            <p className="lead-modal-context">
              Você selecionou: <strong>{normalizedLeadContext}</strong>.
            </p>
            <div className="sync-modal-field">
              <label htmlFor="sync-lead-name">SEU NOME OU EMPRESA</label>
              <input
                id="sync-lead-name"
                ref={leadInputRef}
                type="text"
                className="sync-modal-input"
                placeholder="Ex: João da Silva / Clínica Dental"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
              />
            </div>

            <div className="sync-modal-field">
              <label htmlFor="sync-lead-phone">WHATSAPP PARA CONTATO</label>
              <div className="sync-phone-control">
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
                          placeholder="Buscar país..."
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
                  id="sync-lead-phone"
                  type="tel"
                  className="sync-modal-input sync-phone-input"
                  placeholder={selectedCountry.placeholder}
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                />
              </div>
            </div>
            {leadError && <p className="lead-error">{leadError}</p>}
            <button className="lead-submit sync-lead-submit" type="submit" disabled={leadSubmitting}>
              {leadSubmitting ? "CONECTANDO..." : "CONVERSAR NO WHATSAPP COM O ESPECIALISTA"} <SyncArrow />
            </button>
            <small>Ao clicar, você iniciará uma conversa direta no WhatsApp da Avancini Sync.</small>
          </form>
        </div>
      )}
    </main>
  );
}
