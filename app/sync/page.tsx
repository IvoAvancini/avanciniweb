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

/* --------------------------------------------------------------------------
   DADOS DE JORNADA COMERCIAL: PRÉ-VENDA, VENDA, PÓS-VENDA & OPERAÇÃO
   -------------------------------------------------------------------------- */
const commercialJourney = [
  {
    id: "pre-venda",
    phase: "01 / PRÉ-VENDA",
    title: "Velocidade & Qualificação",
    badge: "PRIMEIRO CONTATO",
    summary: "Seu cliente não fica 1 minuto esperando. A IA atende na hora, qualifica o perfil e separa compradores reais de curiosos.",
    points: [
      "Tempo de resposta inferior a 2 segundos",
      "Identifica faturamento, orçamento ou urgência",
      "Responde textos ou áudios com linguagem natural",
      "Direciona leads qualificados para seu time",
    ],
    metricLabel: "Impacto no funil",
    metricValue: "Redução de até 90% no tempo de espera do lead",
  },
  {
    id: "venda",
    phase: "02 / VENDA & FECHAMENTO",
    title: "Apresentação & Follow-up Ativo",
    badge: "CONVERSÃO",
    summary: "Apresenta propostas, tira dúvidas técnicas, contorna objeções frequentes e agenda reuniões direto no Google Calendar.",
    points: [
      "Apresenta catálogo, planos e formas de pagamento",
      "Consulta horários livres e agenda reuniões",
      "Faz follow-up inteligente com quem parou de responder",
      "Envia link Pix ou cartão dentro da conversa",
    ],
    metricLabel: "Impacto no funil",
    metricValue: "Pode acelerar a taxa de reuniões agendadas",
  },
  {
    id: "pos-venda",
    phase: "03 / PÓS-VENDA & SUPORTE",
    title: "Retenção & Resolução Imediata",
    badge: "RELACIONAMENTO",
    summary: "Resolve dúvidas frequentes, emite 2ª via de faturas, informa status de serviços e reativa clientes antigos no momento certo.",
    points: [
      "Consulta status de pedidos e serviços em tempo real",
      "Resolução de dúvidas sem necessidade de fila",
      "Coleta feedback e satisfação do atendimento",
      "Reativação proativa de clientes inativos",
    ],
    metricLabel: "Impacto no funil",
    metricValue: "Pode desafogar até 70% dos chamados repetitivos",
  },
  {
    id: "operacao",
    phase: "04 / OPERAÇÃO INTEGRADA",
    title: "Sincronização & Transbordo",
    badge: "PRODUTIVIDADE",
    summary: "Tudo o que a IA conversa é gravado no seu CRM. Quando o humano precisa intervir, recebe um resumo pronto e estruturado.",
    points: [
      "Integração com RD Station, HubSpot e Google Sheets",
      "Transbordo inteligente para humanos com histórico",
      "Conexão estável com WhatsApp via QR Code",
      "Sem falhas de comunicação ou dados perdidos",
    ],
    metricLabel: "Impacto no funil",
    metricValue: "Equipe rende mais focando apenas no fechamento",
  },
];

/* --------------------------------------------------------------------------
   COMPARATIVO FINANCEIRO: CUSTO DE FUNCIONÁRIO VS. AGENTE DE IA
   -------------------------------------------------------------------------- */
const financialComparison = {
  employee: {
    title: "Ampliar Equipe Tradicional",
    subtitle: "Custo total de contratação física para tarefas repetitivas",
    items: [
      { label: "Salário base + encargos", detail: "CLT adiciona ~60% a 70% em encargos, FGTS e impostos" },
      { label: "Benefícios obrigatórios", detail: "Vale transporte, alimentação, 13º salário e férias proporcionais" },
      { label: "Tempo & Custo de Treinamento", detail: "Semanas para ambientação e risco frequente de rotatividade (turnover)" },
      { label: "Limitação de horário", detail: "Trabalho restrito a 8h/dia em dias úteis — noites e finais de semana sem cobertura" },
      { label: "Gargalo de capacidade", detail: "Um humano atende apenas 1 a 3 clientes por vez com lentidão no pico" },
    ],
    verdict: "Custo alto e difícil de escalar rapidamente",
  },
  aiAgent: {
    title: "Força de Trabalho Digital (IA)",
    subtitle: "Um colaborador de IA treinado para assumir o volume repetitivo",
    items: [
      { label: "Investimento fixo e previsível", detail: "Apenas uma mensalidade acessível, sem encargos ou passivos trabalhistas" },
      { label: "Disponibilidade 24 horas por dia", detail: "Atende noites, madrugadas, sábados, domingos e feriados sem pausas" },
      { label: "Treinamento sob medida incluso", detail: "A IA é calibrada com as regras e dados da sua empresa antes de operar" },
      { label: "Escala simultânea ilimitada", detail: "Atende 1, 50 ou 500 clientes ao mesmo tempo sem criar fila de espera" },
      { label: "Alívio imediato para sua equipe", detail: "Seus funcionários atuais focam em estratégias, vendas complexas e negociações" },
    ],
    verdict: "Pode custar menos de 20% de uma nova contratação",
  },
};

/* --------------------------------------------------------------------------
   NICHOS COM AÇÕES ESPECÍFICAS & VALOR COMERCIAL
   -------------------------------------------------------------------------- */
const nicheSolutions = [
  {
    id: "advocacia",
    title: "Advocacia & Jurídico",
    icon: "⚖️",
    badge: "SEGURANÇA & PRIVACIDADE",
    role: "Triagem preliminar, qualificação de causas e agendamento de consultas com tratamento seguro e sigiloso de dados.",
    tasks: [
      "Triagem inicial de clientes e identificação da área do Direito",
      "Coleta preliminar de informações e histórico do caso",
      "Agendamento de consultas e reuniões na grade dos advogados",
      "Respostas para dúvidas frequentes de honorários e atendimento",
      "Encaminhamento para o advogado responsável com ficha pronta",
      "Atendimento inicial 24 horas para quem procura auxílio urgente",
    ],
  },
  {
    id: "oficinas",
    title: "Mecânicas & Oficinas",
    icon: "🔧",
    badge: "AGENDAMENTO & PÓS-SERVIÇO",
    role: "Agendamento de manutenções, envio de status do veículo e lembretes preventivos que trazem o cliente de volta.",
    tasks: [
      "Agendamento de revisões, alinhamento e trocas de peças",
      "Orientações preliminares de orçamentos e prazos",
      "Informar status do veículo em manutenção com rapidez",
      "Lembretes de manutenção preventiva (ex: troca de óleo e correia)",
      "Follow-up e pesquisa de satisfação pós-retirada do carro",
      "Recuperação de clientes que não realizam serviços há meses",
    ],
  },
  {
    id: "clinicas",
    title: "Clínicas Médicas & Odonto",
    icon: "🏥",
    badge: "REDUÇÃO DE FALTAS",
    role: "Triagem administrativa, marcação de consultas e confirmação ativa que diminui faltas e desafoga a recepção.",
    tasks: [
      "Agendamento automático de consultas e exames na agenda médica",
      "Confirmação ativa de comparecimento com lembretes inteligentes",
      "Orientações pré-exame (jejum, preparo e documentação necessária)",
      "Tira-dúvidas sobre convênios aceitos e formas de pagamento",
      "Acolhimento humanizado e triagem administrativa dos pacientes",
      "Recuperação de pacientes para retorno ou revisão periódica",
    ],
  },
  {
    id: "imobiliarias",
    title: "Imobiliárias & Construtoras",
    icon: "🏢",
    badge: "QUALIFICAÇÃO DE COMPRADORES",
    role: "Qualificação instantânea para que o corretor só gaste tempo atendendo leads com real potencial de fechamento.",
    tasks: [
      "Qualificação do cliente: perfil de compra, locação e teto financeiro",
      "Filtro inteligente de bairros, metragem e características do imóvel",
      "Envio imediato de opções do catálogo com fotos e ficha técnica",
      "Agendamento de visitas presenciais direto na agenda do corretor",
      "Follow-up contínuo com clientes que deixaram de responder",
      "Reativação de leads parados nos portais imobiliários",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & Varejo",
    icon: "🛍️",
    badge: "RESOLUÇÃO EM SEGUNDOS",
    role: "Atendimento imediato para dúvidas de produtos, status de entrega e recuperação de compras não finalizadas.",
    tasks: [
      "Consulta instantânea de status de pedido e código de rastreio",
      "Tira-dúvidas sobre tamanhos, prazos de entrega e especificações",
      "Geração de chave Pix e link de pagamento na conversa",
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
      "Elimina curiosos e leads desqualificados antes da equipe",
      "Apresenta visão geral de serviços e propostas formatadas",
      "Agenda reuniões no Google Meet com links automáticos",
      "Notifica o consultor no WhatsApp com resumo executivo pronto",
      "Sincroniza todas as informações direto no CRM da empresa",
    ],
  },
];

/* --------------------------------------------------------------------------
   PLANOS RADICALMENTE SIMPLIFICADOS (TODAS AS IAs SÃO COMPLETAS)
   -------------------------------------------------------------------------- */
type SyncPlanSimple = {
  id: string;
  name: string;
  badge: string;
  monthlyPrice: number;
  annualPriceMonthly: number;
  tagline: string;
  idealFor: string;
  keyHighlights: string[];
  ctaText: string;
};

const simplifiedPlans: SyncPlanSimple[] = [
  {
    id: "essencial",
    name: "Agente IA Essencial",
    badge: "PARA COMEÇAR",
    monthlyPrice: 490,
    annualPriceMonthly: 392,
    tagline: "1 Agente de IA completo dedicado à sua operação de vendas ou atendimento.",
    idealFor: "Para profissionais liberais, consultórios e empresas que querem eliminar filas no primeiro contato.",
    keyHighlights: [
      "1 Agente de IA com inteligência total",
      "Treinado exclusivamente na base da sua empresa",
      "Conexão com 1 WhatsApp (QR Code rápido)",
      "Agendamento no Google Calendar / Calendly",
      "Transbordo para humano com resumo pronto",
      "Setup e calibração inclusos (sem taxa de criação)",
    ],
    ctaText: "Começar com Plano Essencial",
  },
  {
    id: "operacao-pro",
    name: "Agente IA Operação Pro",
    badge: "MAIS ESCOLHIDO",
    monthlyPrice: 890,
    annualPriceMonthly: 712,
    tagline: "2 Agentes de IA coordenados (SDR Comercial + Atendimento) com compreensão de áudio e CRM.",
    idealFor: "Para clínicas, imobiliárias, escritórios e empresas com volume diário constante de contatos.",
    keyHighlights: [
      "2 Agentes de IA trabalhando de forma coordenada",
      "Compreensão de áudios de clientes (Whisper)",
      "Respostas em áudio humanizado (opcional)",
      "Sincronização com CRM (RD Station, HubSpot, Sheets)",
      "Follow-up ativo de recuperação de leads",
      "Geração de links Pix / pagamento no chat",
    ],
    ctaText: "Contratar Operação Pro",
  },
  {
    id: "enterprise",
    name: "Ecossistema Custom AI",
    badge: "OPERAÇÕES COMPLEXAS",
    monthlyPrice: 1590,
    annualPriceMonthly: 1272,
    tagline: "Arquitetura avançada de IA multicanal para empresas com sistemas proprietários ou ERP.",
    idealFor: "Para redes de franquias, grandes clínicas, concessionárias e empresas com regras complexas.",
    keyHighlights: [
      "Agentes de IA ilimitados e múltiplos fluxos",
      "Conexão multicanal (WhatsApp, Instagram e Site)",
      "Integração profunda com ERPs e bancos de dados",
      "Automações sob medida via Webhooks (n8n, Make)",
      "Roteamento inteligente de leads por departamento",
      "SLA corporativo com calibragem semanal dedicada",
    ],
    ctaText: "Estruturar Solução Custom",
  },
];

const formatMoney = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

const faqsCommercial = [
  {
    question: "O que significa dizer que o Agente de IA é uma equipe digital?",
    answer: "Diferente de um chatbot que apenas aperta botões pré-programados, o Agente de IA raciocina sobre as informações da sua empresa. Ele entende textos livres e áudios, extrai dados importantes, qualifica o perfil do lead, agenda compromissos na sua grade e até consulta bancos de dados para dar respostas exatas — operando como um verdadeiro colaborador digital.",
  },
  {
    question: "A IA substitui completamente os meus funcionários?",
    answer: "O objetivo principal não é demitir funcionários, e sim fazer sua equipe atual render muito mais. A IA assume o trabalho maçante, repetitivo e o atendimento inicial 24 horas por dia. Quando surge uma negociação complexa ou uma situação que exige empatia humana, a IA transfere o cliente com um resumo pronto de toda a conversa.",
  },
  {
    question: "Como funciona a conexão com o WhatsApp?",
    answer: "A conexão é simples e rápida via leitura de QR Code diretamente no seu sistema ou celular, semelhante ao WhatsApp Web. Não há burocracia complexa e a tecnologia mantém a conexão estável com suporte a webhooks e automação de conversas.",
  },
  {
    question: "Todas as versões de IA são boas ou a primeira é limitada?",
    answer: "Todas as nossas versões utilizam inteligência artificial de ponta e são treinadas rigorosamente com a base de conhecimento da sua empresa. O que muda de um plano para o outro são recursos operacionais adicionais (como múltiplos agentes trabalhando juntos, compreensão de áudio, integração profunda com CRMs/ERPs e volume de canais).",
  },
  {
    question: "A IA pode falar bobagens ou inventar informações?",
    answer: "Nossos Agentes utilizam arquitetura de proteção RAG (Retrieval-Augmented Generation) com diretrizes rígidas. Eles respondem estritamente com base nos documentos, manuais, tabelas e regras que sua empresa fornecer. Se houver alguma pergunta fora das diretrizes, o Agente informa educadamente ou aciona sua equipe humana.",
  },
  {
    question: "Existe taxa de criação (setup) ou fidelidade obrigatória?",
    answer: "Não há taxa de criação nas condições atuais. A calibração inicial e estruturação da base de conhecimento já estão inclusas. Você pode optar pelo plano mensal sem fidelidade ou escolher o ciclo anual para economizar 20% no valor.",
  },
];

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
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
          source: "sync_commercial",
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
            <small>Equipe Digital de IA</small>
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
            <span>NAVEGAÇÃO COMERCIAL <i /> AVANCINI SYNC</span>
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
              ["01", "Início", "Equipe digital que vende", "#inicio"],
              ["02", "Jornada da IA", "Pré-venda, Venda e Pós-venda", "#jornada"],
              ["03", "Custo vs. Retorno", "IA x Ampliar equipe humana", "#retorno"],
              ["04", "Segmentos & Nichos", "Aplicações reais por nicho", "#nichos"],
              ["05", "Planos Simplificados", "Sem taxa de criação", "#planos"],
              ["06", "Conexão WhatsApp", "Integração rápida via QR Code", "#conexao"],
              ["07", "Dúvidas Frequentes", "Respostas diretas", "#duvidas"],
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
                openLead("uma demonstração de como a IA pode atender minha empresa");
              }}
            >
              SOLICITAR DEMONSTRAÇÃO <SyncArrow />
            </button>
          </div>
        </div>
      )}

      {/* 1. HERO COM FOCO EM VALOR, ESCALA E REDUÇÃO DE SOBRECARGA */}
      <section className="sync-hero sync-hero-compact" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <AvanciniMark variant="sync" className="sync-hero-mark avancini-a-mark" />
        
        <div className="sync-hero-copy">
          <div className="sync-hero-badge-row">
            <span className="sync-eyebrow"><i /> FORÇA DE TRABALHO DIGITAL · ATENDIMENTO &amp; VENDAS</span>
            <span className="sync-hero-live-pill"><i /> OPERAÇÃO 24/7 · RESPOSTA EM &lt; 2S</span>
          </div>

          <h1>Sua empresa crescendo sem precisar<br /><em>inchar a equipe para atender clientes.</em></h1>
          
          <p>
            Um Agente de IA autônomo treinado no seu negócio que assume tarefas repetitivas, atende noites e finais de semana, qualifica leads e agenda reuniões — por uma fração do custo de uma nova contratação.
          </p>

          <div className="sync-hero-actions">
            <a href="#retorno">Comparar com funcionário <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos simples <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("implantar um Agente de IA na minha empresa")}>
              Quero uma demonstração na prática <SyncArrow />
            </button>
          </div>

          {/* 4 Pilares Comerciais em Destaque */}
          <div className="sync-hero-stats-grid sync-commercial-stats">
            <div className="hero-stat-card">
              <span className="hero-stat-number">&lt; 2s</span>
              <p>Tempo de resposta imediato para nenhum lead desistir por demora</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">24/7</span>
              <p>Operação ativa sem pausas, cobrindo horários em que ninguém atende</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">Ilimitado</span>
              <p>Capacidade de atender centenas de clientes simultaneamente sem fila</p>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-number">Produtividade</span>
              <p>Sua equipe atual rende muito mais focando apenas no fechamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A JORNADA DA IA: PRÉ-VENDA → VENDA → PÓS-VENDA → OPERAÇÃO */}
      <section className="sync-commercial-section" id="jornada" aria-labelledby="sync-journey-title">
        <header className="sync-section-heading">
          <div>
            <span>01 / A FORÇA DE TRABALHO DIGITAL</span>
            <h2 id="sync-journey-title">Você não contrata só um chatbot.<br />Você contrata um colaborador digital.</h2>
          </div>
          <p>A IA atua em todas as etapas da sua empresa, reduzindo tarefas repetitivas e aumentando a conversão.</p>
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

      {/* 3. COMPARATIVO FINANCEIRO: CUSTO DE FUNCIONÁRIO VS. AGENTE DE IA */}
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

          {/* Card Agente de IA */}
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
            💡 <strong>Importante:</strong> Não prometemos milagres nem demissão em massa. Nosso foco é <em>produtividade real</em>: permitir que a mesma equipe atenda 5x mais clientes e cresça sem elevar a folha de pagamento na mesma proporção.
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
          <p>Cada segmento possui rotinas e necessidades específicas. Veja exatamente o que o Agente executa na sua área:</p>
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

              <footer className="niche-detail-footer">
                <span>Quer ver como fica no fluxo exato da sua empresa?</span>
                <button
                  type="button"
                  className="niche-cta-highlight"
                  onClick={() => openLead(`a implantação da IA para ${niche.title}`)}
                >
                  Configurar IA para {niche.title.split("&")[0]} <SyncArrow />
                </button>
              </footer>
            </div>
          );
        })()}
      </section>

      {/* 5. PLANOS SIMPLIFICADOS (TODAS AS IAs SÃO COMPLETAS) */}
      <section className="sync-commercial-section" id="planos" aria-labelledby="sync-plans-title">
        <header className="sync-section-heading">
          <div>
            <span>04 / INVESTIMENTO TRANSPARENTE</span>
            <h2 id="sync-plans-title">Três formatos simples.<br />Todas as versões são completas.</h2>
          </div>
          <p>A inteligência e calibração são sempre avançadas. O que muda é a complexidade operacional e o volume de fluxos.</p>
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
              Anual <em>20% de economia</em>
            </button>
          </div>
          <small className="plan-cycle-note">
            Condição de lançamento: <strong>Zero taxa de criação inicial (Setup incluso)</strong>.
          </small>
        </div>

        <div className="simplified-plans-grid">
          {simplifiedPlans.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPriceMonthly;
            const isPro = plan.id === "operacao-pro";
            return (
              <article className={`simple-plan-card ${isPro ? "featured" : ""}`} key={plan.id}>
                {isPro && <span className="simple-plan-pill-tag">RECOMENDADO</span>}
                <div className="plan-card-top">
                  <small className="plan-badge-label">{plan.badge}</small>
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
                <small className="plan-secure-subnote">Sem fidelidade no mensal · Atendimento humano de apoio</small>
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
              Gere o QR Code, escaneie e deixe a IA começar a responder. Compatível com seu número comercial atual, com envio estável, suporte a webhooks e transbordo seguro para seus atendentes humanos.
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
          <p>Transparência total para você tomar a melhor decisão para o seu negócio.</p>
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

      {/* 8. CTA FINAL COMERCIAL */}
      <section className="sync-final-commercial">
        <AvanciniMark variant="sync" className="sync-final-mark avancini-a-mark" />
        <span>AVANCINI SYNC // FORÇA DE TRABALHO DIGITAL</span>
        <h2>Faça sua empresa crescer sem aumentar custos na mesma proporção.</h2>
        <p>Converse com nosso time agora mesmo. Vamos entender sua rotina e mostrar uma demonstração funcionando na prática.</p>
        <button
          type="button"
          onClick={() => openLead("solicitar demonstração da equipe digital de IA")}
        >
          Solicitar Demonstração Gratuita <SyncArrow />
        </button>
      </section>

      {/* Footer Conciso */}
      <footer className="sync-footer">
        <Link href="/" className="sync-brand">
          <AvanciniMark variant="sync" className="sync-brand-mark avancini-a-mark" />
          <span><b>AVANCINI <em>SYNC</em></b><small>Equipe Digital de IA</small></span>
        </Link>
        <p>Inteligência Artificial comercial para empresas que querem atender 24/7 e escalar vendas sem inchar a equipe.</p>
        <nav>
          <a href="#inicio">Início</a>
          <a href="#jornada">Jornada</a>
          <a href="#retorno">Custo x Retorno</a>
          <a href="#nichos">Nichos</a>
          <a href="#planos">Planos</a>
          <Link href="/dash">Avancini Dash <SyncArrow /></Link>
        </nav>
        <div>
          <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
          <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <SyncArrow /></a>
        </div>
        <small>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</small>
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
                <strong>AVANCINI SYNC // EQUIPE DIGITAL DE IA</strong>
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
