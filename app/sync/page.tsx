"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { AvanciniMark } from "../avancini-mark";
import { MagneticButton } from "../components/MagneticButton";

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

import { CountryFlag } from "../components/CountryFlag";
import AnimatedCounter from "../components/AnimatedCounter";
import "../web/dash-hero.css";

function CountryFlagIcon({ code }: { code: string }) {
  return <CountryFlag code={code} size={18} />;
}

const WHATSAPP_NUMBER = "5573981019782";

const whatsappFor = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const LivingArrow = ({ size = 12, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`living-svg-arrow ${className}`}
    aria-hidden="true"
  >
    <path
      d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const syncHeroAudiences = [
  "CLÍNICAS & SAÚDE",
  "ADVOCACIA & JURÍDICO",
  "IMOBILIÁRIAS & CORRETORES",
  "LOJAS & E-COMMERCE",
  "EMPRESAS & PRESTADORES",
] as const;

function SyncAudienceTypewriter() {
  const [text, setText] = useState("");
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = syncHeroAudiences[audienceIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          window.setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setAudienceIndex((prev) => (prev + 1) % syncHeroAudiences.length);
        }
      }
    }, typingSpeed);

    return () => window.clearTimeout(timer);
  }, [text, isDeleting, audienceIndex]);

  return (
    <span className="hero-typewriter-dynamic sync-typewriter-dynamic">
      <strong className="hero-typewriter-target">{text}</strong>
      <span className="hero-typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}

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
   CENTRAL DE ATENDIMENTO INTELIGENTE — SIMULAÇÃO INTERATIVA NO HERO
   -------------------------------------------------------------------------- */
const supervisorAgents = [
  {
    id: "clinica",
    name: "Clínica & Saúde",
    role: "Agendamento Direto no Google Calendar",
    status: "Sincronizado com sua agenda",
    activeBadge: "🩺 Agenda no WhatsApp",
    metrics: [
      { label: "Sua Agenda", value: "Google Calendar" },
      { label: "Faltas de Pacientes", value: "Lembretes automáticos" },
      { label: "Marcação", value: "Direto no WhatsApp" },
    ],
    tools: ["📅 Google Calendar", "⏰ Lembrete Anti-Falta", "✅ Horários no Chat", "🔔 Aviso para Equipe"],
    pipelineSteps: [
      { step: "01", name: "Checa a Grade", desc: "Vê dias e horários livres" },
      { step: "02", name: "Escolha Simples", desc: "O paciente escolhe no WhatsApp" },
      { step: "03", name: "Salva e Lembra", desc: "Agenda e envia lembrete antes" },
    ],
    capabilities: [
      "Sincroniza em tempo real com Google Calendar",
      "Oferece opções claras de horários livres",
      "Envia link ou endereço da clínica no chat",
      "Dispara lembretes gentis anti-falta",
    ],
    chatType: "calendar",
    chat: {
      clientText: "Olá! Gostaria de agendar uma consulta para quinta-feira à tarde. Tem horário livre?",
      aiResponse: "Olá! Tudo bem? 😊 Na quinta-feira à tarde com o Dr. Marcelo temos as opções:",
      slots: ["14h30", "16h00", "17h30"],
      selectedSlot: "14h30",
      confirmationCard: {
        title: "✓ Consulta Agendada no Google Calendar",
        doctor: "Dr. Marcelo · Avaliação Presencial",
        date: "Quinta-feira às 14:30 (~45 min)",
        reminder: "Lembretes programados: 24h e 2h antes no WhatsApp",
      },
      actionTag: "📅 Horário Marcado no Google Calendar · Lembrete Ativo",
    },
  },
  {
    id: "advocacia",
    name: "Advocacia & Consultoria",
    role: "Triagem de Casos & Audição de Áudios",
    status: "Responde em < 3 segundos",
    activeBadge: "⚖️ Ouve e Entende Áudios",
    metrics: [
      { label: "Tempo de Resposta", value: "Na mesma hora" },
      { label: "Capacidade", value: "Múltiplos contatos simultâneos" },
      { label: "Disponibilidade", value: "24 horas por dia" },
    ],
    tools: ["🎙️ Ouve e entende áudios", "📄 Lê fotos e arquivos", "💬 Tira dúvidas frequentes", "🤝 Envia para sua equipe"],
    pipelineSteps: [
      { step: "01", name: "Ouve com Atenção", desc: "Entende áudios e textos longos" },
      { step: "02", name: "Tira as Dúvidas", desc: "Explica a atuação com clareza" },
      { step: "03", name: "Passa para Você", desc: "Entrega a conversa organizada" },
    ],
    capabilities: [
      "Ouve e transcreve áudios de qualquer tamanho",
      "Identifica a urgência e o perfil do cliente",
      "Responde dúvidas preliminares com empatia",
      "Transfere para o advogado com resumo pronto",
    ],
    chatType: "audio",
    chat: {
      audioDuration: "0:18",
      audioTranscription: 'Olá, doutor! Preciso de orientação urgente sobre uma rescisão de contrato de trabalho. Vocês atendem esse tipo de caso?',
      aiResponse: "Olá! Atendemos sim. Nosso escritório é especializado em Direito Trabalhista e Contratual. Já organizei suas informações para o advogado responsável dar o retorno detalhado.",
      crmBadge: {
        title: "⚖️ CASO TRIADO & RESUMO PRONTO",
        area: "Direito Trabalhista / Contratos",
        volume: "Áudio de 18s ouvido e transcrito",
        action: "Resumo organizado enviado para o WhatsApp do advogado",
      },
      actionTag: "⚡ Áudio Ouvido · Cliente Acolhido · Resumo Pronto",
    },
  },
  {
    id: "comercio",
    name: "Comércio & Serviços",
    role: "Dúvidas, Fotos, Catálogo & Pix",
    status: "Atendimento simultâneo ágil",
    activeBadge: "🛍️ Fotos & Chave Pix",
    metrics: [
      { label: "Dúvidas Repetitivas", value: "Resolvidas na hora" },
      { label: "Fotos e PDFs", value: "Confere arquivos enviados" },
      { label: "Chave Pix", value: "Copia e cola no WhatsApp" },
    ],
    tools: ["📄 Leitor de Fotos e PDFs", "💳 Chave Pix no Chat", "🔍 Consulta de Pedidos", "📦 Informações Claras"],
    pipelineSteps: [
      { step: "01", name: "Recebe o Arquivo", desc: "Lê o PDF, pedido ou comprovante" },
      { step: "02", name: "Conferência", desc: "Checa se está legível e correto" },
      { step: "03", name: "Orientação", desc: "Passa a chave Pix ou próximo passo" },
    ],
    capabilities: [
      "Lê fotos de pedidos, tabelas e comprovantes",
      "Consulta status de entregas e serviços",
      "Gera chave Pix cópia e cola instantânea",
      "Resolve até 90% das dúvidas do dia a dia",
    ],
    chatType: "document",
    chat: {
      docName: "Pedido_Orçamento_Serviço.pdf",
      docSize: "1.4 MB · Documento de Pedido",
      clientText: "Boa tarde! Segue o pedido do material que orcei. Conseguem confirmar se receberam e me mandar a chave Pix?",
      aiResponse: "Olá! Recebi seu pedido perfeitamente e já encaminhei para a expedição.\n\nSegue o Pix para confirmação do pedido (R$ 65,00):",
      pixCard: {
        title: "Chave Pix Copia e Cola",
        value: "R$ 65,00 · Confirmação Imediata",
        pixKey: "00020126580014br.gov.bcb.pix0136...",
      },
      actionTag: "📄 Pedido Confirmado · Chave Pix Enviada",
    },
  },
  {
    id: "imobiliaria",
    name: "Imobiliária & Negócios",
    role: "Qualificação & Resgate de Orçamentos",
    status: "Acompanhamento simpático",
    activeBadge: "🏢 Resgate de Propostas",
    metrics: [
      { label: "Clientes Sumidos", value: "Reativados com educação" },
      { label: "Tempo de Retomada", value: "No momento ideal" },
      { label: "Orçamentos", value: "Mais vendas fechadas" },
    ],
    tools: ["💬 Mensagem Amigável", "⏰ Lembrete no Tempo Certo", "🎯 Dúvidas Pendentes", "🤝 Ajuda para Fechar"],
    pipelineSteps: [
      { step: "01", name: "Percebe a Parada", desc: "Vê quem pediu preço e sumiu" },
      { step: "02", name: "Mensagem Gentil", desc: "Pergunta se ficou alguma dúvida" },
      { step: "03", name: "Conclusão", desc: "Facilita o fechamento da compra" },
    ],
    capabilities: [
      "Identifica clientes sem resposta após 24h",
      "Envia lembrete amigável e sem insistência",
      "Tira dúvidas para destravar a negociação",
      "Recupera vendas que seriam perdidas no silêncio",
    ],
    chatType: "recovery",
    chat: {
      pastTime: "Ontem às 16:45",
      pastClientText: "Gostei muito do apartamento! Vou conversar com minha esposa hoje e te retorno amanhã cedo.",
      triggerTime: "Hoje · 24h sem resposta — IA retoma com gentileza",
      aiFollowupText: "Oi, Mariana! Tudo bem? Conseguiram conversar sobre o apartamento? Se ficou alguma dúvida de valores ou quiser agendar uma visita presencial, estou por aqui!",
      clientReplyText: "Oi! Conversamos sim e adoramos! Podemos agendar a visita para sábado de manhã?",
      recoveredCard: {
        title: "🎉 PROPOSTA RESGATADA COM SUCESSO",
        value: "Visita agendada · Negociação salva que seria perdida no silêncio",
      },
      actionTag: "💬 Cliente Reativado com Educação · Visita Agendada",
    },
  },
];

/* --------------------------------------------------------------------------
   JORNADA: ONDE A INTELIGÊNCIA ARTIFICIAL AJUDA SUA EMPRESA
   -------------------------------------------------------------------------- */
const commercialJourney = [
  {
    id: "pre-venda",
    phase: "01 / ACOLHIMENTO E RAPIDEZ",
    title: "Nenhum cliente esperando no vácuo",
    badge: "PRIMEIRO CONTATO",
    summary: "Seu cliente não fica esperando. A IA acolhe na hora, ouve áudios e entende a urgência de cada mensagem.",
    points: [
      "⚡ Resposta ágil 24h: retenha clientes antes que procurem a concorrência",
      "🎙️ Compreensão total: ouve áudios, lê fotos e textos longos",
      "📋 Resumo organizado: passa o lead qualificado para sua equipe",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Reduz drasticamente o tempo de espera e o abandono de clientes",
  },
  {
    id: "venda",
    phase: "02 / AGENDAMENTO E PRATICIDADE",
    title: "Horários marcados e informações claras",
    badge: "AGILIDADE",
    summary: "Explica serviços, regras e valores, e marca horários direto na sua grade.",
    points: [
      "📅 Agenda conectada: marca no Google Calendar sem conflitos",
      "💬 Clareza total: explica serviços e tira dúvidas frequentes",
      "💳 Facilidade no chat: envia chave Pix e links de pagamento",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Mais serviços marcados sem você parar para responder",
  },
  {
    id: "pos-venda",
    phase: "03 / DÚVIDAS E FINS DE SEMANA",
    title: "Sua empresa ativa de noite e fins de semana",
    badge: "TRANQUILIDADE",
    summary: "Resolve dúvidas comuns e atende à noite ou fins de semana sem você ficar preso no WhatsApp.",
    points: [
      "🌙 Atendimento 24/7: noites e finais de semana sem fila",
      "📄 Leitura inteligente: confere fotos, exames e comprovantes",
      "⭐ Pesquisa pós-atendimento: colhe feedback e satisfação",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Economiza até 70% do tempo gasto com perguntas repetidas",
  },
  {
    id: "operacao",
    phase: "04 / VOCÊ NO CONTROLE",
    title: "Passagem limpa para você ou sua equipe",
    badge: "PRODUTIVIDADE",
    summary: "Tudo registrado. Quando o caso exige atenção humana, sua equipe recebe a conversa com resumo pronto.",
    points: [
      "📲 Transbordo transparente: cliente transferido em 1 clique",
      "📝 Histórico completo: saiba o que o cliente quer antes de falar",
      "🔗 Conexão direta: integração via QR Code no seu WhatsApp atual",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Sua equipe foca em fechar negócios em vez de triar mensagens",
  },
];

/* --------------------------------------------------------------------------
   COMPARATIVO FINANCEIRO: CUSTO DE FUNCIONÁRIO VS. MULTIAGENTE IA
   -------------------------------------------------------------------------- */
const financialComparison = {
  employee: {
    title: "Ampliar Equipe Tradicional",
    subtitle: "Custo total de contratação para tarefas operacionais",
    items: [
      { label: "Salário base + encargos CLT", detail: "Encargos e impostos somam até 70% a mais na folha mensal" },
      { label: "Benefícios obrigatórios e provisões", detail: "VT, VR, férias proporcionais, 13º salário e rescisões contratuais" },
      { label: "Treinamento e tempo de adaptação", detail: "Semanas de treino com risco contínuo de rotatividade (turnover)" },
      { label: "Horário restrito (8h/dia)", detail: "Sem cobertura em noites, madrugadas, finais de semana e feriados" },
      { label: "Gargalo no atendimento simultâneo", detail: "Atendente humano não consegue atender dezenas de chats no pico" },
    ],
    verdict: "Custo alto e difícil de escalar sem inflar a folha",
  },
  aiAgent: {
    title: "Equipe Multiagente de IA",
    subtitle: "Supervisor e especialistas calibrados no seu negócio",
    items: [
      { label: "Investimento fixo e previsível", detail: "Mensalidade acessível, sem encargos trabalhistas nem rescisões" },
      { label: "Disponibilidade 24 horas por dia", detail: "Atende noites, domingos e feriados com o mesmo padrão" },
      { label: "Treinamento sob medida incluso", detail: "Calibrado com dados e regras da sua empresa antes de operar" },
      { label: "Escala simultânea elástica", detail: "Atende centenas de clientes juntos sem criar fila de espera" },
      { label: "Alívio imediato para sua equipe", detail: "Seus colaboradores focam em negociações e fechamentos" },
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
    role: "Triagem preliminar de clientes, qualificação de causas e agendamento seguro e sigiloso de consultas.",
    tasks: [
      "Triagem inicial de clientes e identificação da área jurídica",
      "Coleta do histórico preliminar e urgência do caso",
      "Agendamento de reuniões na grade dos advogados",
      "Encaminhamento para o advogado com resumo executivo",
    ],
  },
  {
    id: "oficinas",
    title: "Mecânicas & Oficinas",
    icon: "🔧",
    badge: "AGENDAMENTO & PÓS-SERVIÇO",
    role: "Agendamento de manutenções, envio de status do veículo e lembretes preventivos que trazem o cliente de volta.",
    tasks: [
      "Agendamento de revisões, alinhamento e manutenções",
      "Envio de status rápido do veículo na oficina",
      "Lembretes preventivos de troca de óleo, freios e correia",
      "Reativação de clientes sem revisão há mais de 6 meses",
    ],
  },
  {
    id: "clinicas",
    title: "Clínicas Médicas & Odonto",
    icon: "🏥",
    badge: "CONFIRMAÇÃO ATIVA & AGENDA",
    role: "Triagem administrativa, marcação de consultas e confirmação ativa que diminui faltas e desafoga a recepção.",
    tasks: [
      "Agendamento automático de consultas e exames médicos",
      "Confirmação ativa de comparecimento com lembretes anti-falta",
      "Orientações pré-consulta (jejum, preparo e documentação)",
      "Tira-dúvidas sobre convênios aceitos e regras da clínica",
    ],
  },
  {
    id: "imobiliarias",
    title: "Imobiliárias & Construtoras",
    icon: "🏢",
    badge: "QUALIFICAÇÃO DE COMPRADORES",
    role: "Qualificação instantânea para que o corretor só atenda compradores reais com perfil validado.",
    tasks: [
      "Qualificação: compra ou locação, bairro, perfil e orçamento",
      "Envio imediato de opções do acervo com fotos e ficha técnica",
      "Agendamento de visitas direto na agenda do corretor",
      "Reativação contínua de leads parados vindos de portais",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & Lojas",
    icon: "🛍️",
    badge: "STATUS DE PEDIDOS & PIX",
    role: "Atendimento imediato para dúvidas de produtos, status de entrega e recuperação de compras não finalizadas.",
    tasks: [
      "Consulta de status de pedido e código de rastreio",
      "Tira-dúvidas de tamanhos, medidas e prazos de entrega",
      "Geração de Pix instantâneo cópia e cola no chat",
      "Recuperação proativa de clientes com pedidos pendentes",
    ],
  },
  {
    id: "b2b",
    title: "Serviços B2B & Consultorias",
    icon: "💼",
    badge: "SDR COMERCIAL AUTÔNOMO",
    role: "SDR de IA que aborda, qualifica porte/faturamento e entrega reuniões de proposta prontas para os consultores.",
    tasks: [
      "Qualifica porte da empresa, faturamento e necessidade",
      "Filtra curiosos antes de passar para a equipe comercial",
      "Agenda reuniões no Google Meet com link automático",
      "Notifica o consultor no WhatsApp com ficha executiva pronta",
    ],
  },
];

/* --------------------------------------------------------------------------
   PLANOS SIMPLIFICADOS — ARQUITETURA MULTIAGENTE INCLUSA EM TODOS
   Valores transparentes e foco nas dores reais das empresas.
   -------------------------------------------------------------------------- */
type CapabilityItem = {
  icon: string;
  title: string;
  desc: string;
};

type PlanFeature = {
  title: string;
  desc: string;
};

type SyncPlanSimple = {
  id: string;
  name: string;
  badge?: string;
  kicker: string;
  idealFor: string;
  pitch: string;
  features: PlanFeature[];
  payoff: string;
  deliverableBadge: string;
  ctaText: string;
  featured?: boolean;
};

const simplifiedPlans: SyncPlanSimple[] = [
  {
    id: "chatbot",
    name: "Chatbot de Fluxo Guiado",
    badge: "AUTOMAÇÃO EXPRESSA",
    kicker: "RESPOSTAS IMEDIATAS & TRIAGEM OBJETIVA",
    idealFor: "Empresas com dúvidas repetitivas que precisam de triagem rápida sem IA generativa.",
    pitch: "Elimina filas com envio instantâneo de catálogo, tabela de preços e transferência automática de setor.",
    features: [
      { title: "Menu Ágil de Opções (1 a 5)", desc: "O cliente escolhe o assunto e recebe a resposta oficial sem espera." },
      { title: "Envio de Catálogo, PDFs & Fotos", desc: "Dispara tabelas, rotas e material comercial no mesmo segundo." },
      { title: "Transbordo com Histórico Preservado", desc: "Transfere para o atendente humano mantendo toda a conversa." },
    ],
    payoff: "💡 Desafogue sua equipe das perguntas repetitivas com ativação rápida em 24h.",
    deliverableBadge: "⚡ Setup em 24h · Conexão QR Code · Respostas Literais",
    ctaText: "Testar Chatbot no WhatsApp",
    featured: false,
  },
  {
    id: "essencial",
    name: "Operação IA Essencial",
    badge: "🔥 MAIS ESCOLHIDO",
    kicker: "IA GENERATIVA HUMANIZADA 24/7",
    idealFor: "Clínicas, consultórios e escritórios que precisam acolher e agendar horários 24h.",
    pitch: "Atendente virtual humanizado que acolhe clientes, ouve áudios, tira dúvidas e marca consultas no Google Calendar.",
    features: [
      { title: "Conversação Natural & Empática", desc: "Entende gírias, áudios longos e fotos de documentos com fluidez." },
      { title: "Google Agenda em Tempo Real", desc: "Consulta horários vagos e marca compromissos sem choque de grade." },
      { title: "Lembretes Ativos de Presença", desc: "Dispara confirmação na véspera com opção de reagendamento para reduzir faltas." },
      { title: "Transbordo com Resumo Pronto", desc: "Encaminha para você com a ficha mastigada do que o lead precisa." },
    ],
    payoff: "💎 Recupere clientes fora do horário comercial enquanto o concorrente está offline.",
    deliverableBadge: "⚡ Calibração Guiada · Google Calendar · Regras Estritas de Negócio",
    ctaText: "Solicitar Demonstração da IA",
    featured: true,
  },
  {
    id: "pro",
    name: "Operação Scale Pro",
    badge: "ALTA ESCALA",
    kicker: "CENTRAL CORPORATIVA MULTISSETOR",
    idealFor: "Empresas com múltiplos atendentes, vários departamentos ou anúncios em escala.",
    pitch: "Multiagentes de IA especializados por setor (Vendas, Agendamento, Cobrança) e distribuição de fila humana.",
    features: [
      { title: "Multiagentes Especializados por Setor", desc: "IAs dedicadas: um agente para Vendas, um para Recepção e um para Suporte." },
      { title: "Fila Inteligente de Atendentes", desc: "Vários operadores no mesmo WhatsApp com divisão automática de leads." },
      { title: "Painel de Métricas & Prioridade Ads", desc: "Infraestrutura reforçada para suportar picos de campanhas e conversão do time." },
    ],
    payoff: "🚀 Uma estrutura multissetor preparada para atender múltiplos clientes simultaneamente com respostas rápidas.",
    deliverableBadge: "⚡ Multiagentes · Gestão de Equipe · SLA Corporativo",
    ctaText: "Agendar Diagnóstico Scale Pro",
    featured: false,
  },
];

const formatMoney = (val: number) =>
  `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const faqsCommercial = [
  {
    question: "O que é 'uso justo' (Fair Use) e como funciona na prática?",
    answer: "É atendimento contínuo e sem estresse para o volume normal do dia a dia da sua empresa — áudios, textos, marcações no Google Calendar e follow-ups à vontade, sem contador travando seu atendimento no meio do mês. A política apenas previne spam em massa não autorizado.",
  },
  {
    question: "Como funciona a contratação e o processo de implantação?",
    answer: "Apresentamos uma demonstração ao vivo para o seu nicho. Em seguida, mapeamos as regras da sua empresa, calibramos as respostas e realizamos a conexão direta no seu WhatsApp via QR Code em poucos minutos.",
  },
  {
    question: "Preciso trocar de número de WhatsApp ou contratar chip novo?",
    answer: "Não! A IA conecta diretamente no número comercial que sua empresa já utiliza hoje. Basta escanear um QR Code rápido pelo celular, exatamente como no WhatsApp Web, mantendo todos os contatos e conversas.",
  },
  {
    question: "Quando faz sentido escolher a Operação Scale Pro?",
    answer: "A Operação Essencial já é 100% completa para 1 número de WhatsApp (agenda, lembretes, áudio, Pix e resumo). O Scale Pro é indicado quando sua empresa tem múltiplos departamentos e vários atendentes humanos precisando de roteamento de fila.",
  },
  {
    question: "A IA pode inventar dados, falar preços errados ou dar diagnósticos?",
    answer: "De jeito nenhum! A IA segue estritamente o manual de regras, serviços e horários da sua empresa. Não dá diagnósticos e não inventa dados. Se houver pergunta imprevista, avisa com simpatia e transfere para você.",
  },
  {
    question: "A IA substitui os meus funcionários?",
    answer: "Não, ela potencializa sua equipe. A IA assume tarefas repetitivas (dúvidas básicas, grade de horários e atendimento noturno) e passa as conversas mastigadas para seu time focar em fechar.",
  },
  {
    question: "Existe período de teste ou demonstração personalizada?",
    answer: "Sim! Antes de contratar, você testa a IA no seu WhatsApp com demonstração ao vivo no seu segmento.",
  },
];

const coreSyncIntegrations = [
  {
    name: "Google Calendar",
    category: "AGENDA & COMPROMISSOS EM TEMPO REAL",
    desc: "Sincronização bidirecional em tempo real. A IA consulta horários livres, agenda consultas ou reuniões e bloqueia a grade automaticamente sem choque de horários.",
    icon: "📅",
    color: "#38bdf8",
    highlights: [
      "Bloqueio automático de grade sem choque de horários",
      "Lembretes anti-falta programados no WhatsApp",
      "Sincronização com agendas individuais ou de equipe",
    ],
  },
  {
    name: "WhatsApp Cloud API",
    category: "COMUNICAÇÃO OFICIAL META",
    desc: "Conexão oficial homologada pela Meta com estabilidade corporativa e criptografia de ponta a ponta. Atendimento contínuo mantendo o mesmo número que você já tem.",
    icon: "💬",
    color: "#22c55e",
    highlights: [
      "Mantém o número comercial atual sem troca de chip",
      "Conexão estável e segura via QR Code em 5 minutos",
      "Transbordo fluido para atendentes humanos no WhatsApp",
    ],
  },
];

const secondarySyncIntegrations = [
  { name: "Mercado Pago & Pix", category: "Cobrança Instantânea", icon: "💳", desc: "Chave Pix Copia e Cola imediata no chat" },
  { name: "Hotmart & Kiwify", category: "Vendas Digitais", icon: "🚀", desc: "Recuperação de boletos e pós-venda" },
  { name: "Bling & Tiny ERP", category: "Gestão & Pedidos", icon: "📦", desc: "Consulta de estoque e confirmação de pedidos" },
  { name: "Asana, Trello & Notion", category: "Organização", icon: "📋", desc: "Cards e resumos automáticos dos atendimentos" },
  { name: "Webhooks & Zapier", category: "Automação Universal", icon: "⚡", desc: "Conexão aberta com mais de 2.000 sistemas de CRM" },
];

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<"essencial" | "pro">("pro");
  const [showAllMobileSync, setShowAllMobileSync] = useState(false);
  const [activeSupervisorIndex, setActiveSupervisorIndex] = useState(0);
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  const [activeNicheIndex, setActiveNicheIndex] = useState(0);
  const [dailyContacts, setDailyContacts] = useState(60);
  const [clientTicket, setClientTicket] = useState(800);
  const [missedWeekendLeads, setMissedWeekendLeads] = useState(3);
  const [simulating, setSimulating] = useState(false);
  const [simStage, setSimStage] = useState<0 | 1 | 2 | 3>(3);
  const simTimersRef = useRef<number[]>([]);

  const clearSimTimers = () => {
    simTimersRef.current.forEach((t) => window.clearTimeout(t));
    simTimersRef.current = [];
  };

  const runSimulation = (agentIdx: number) => {
    clearSimTimers();
    setActiveSupervisorIndex(agentIdx);
    setSimulating(true);
    setSimStage(0);

    const t1 = window.setTimeout(() => {
      setSimStage(1);
    }, 450);

    const t2 = window.setTimeout(() => {
      setSimStage(2);
    }, 1500);

    const t3 = window.setTimeout(() => {
      setSimStage(3);
      setSimulating(false);
    }, 2350);

    simTimersRef.current = [t1, t2, t3];
  };

  useEffect(() => {
    return () => clearSimTimers();
  }, []);

  // Audio player demo states
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (audioPlaying) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 24) {
            setAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [audioPlaying]);

  const toggleAudio = () => {
    if (!audioPlaying && audioProgress >= 24) {
      setAudioProgress(0);
    }
    setAudioPlaying((prev) => !prev);
  };

  const formatAudioTime = (sec: number) => {
    const s = sec % 60;
    return `0:${s < 10 ? "0" : ""}${s}`;
  };

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
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("is-os-hub");
      document.body.classList.remove("is-os-hub");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
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
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
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
      {/* Header Compacto de Navegação (Padronizado com Dash) */}
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="logo" href="#inicio" aria-label="Avancini Sync, início">
          <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
          <span>
            <span className="brand-name">
              AVANCINI <b>SYNC</b>
            </span>
            <small>Equipe Multiagente de IA</small>
          </span>
        </a>

        {/* Dock Central de Ecossistema (Idêntico ao Dash em Modelo, Tamanho e Informações) */}
        <div className="web-ecosystem-switch" aria-label="Navegar entre as soluções Avancini">
          <Link className="header-cta header-dash-cta" href="/dash">
            <span className="cta-full-name">Avancini </span>Dash <LivingArrow size={11} />
          </Link>
          <Link className="header-cta header-os-cta" href="/">
            <span className="cta-full-name">Avancini </span>OS <LivingArrow size={11} />
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className="menu-glyph" aria-hidden="true"><span /><span /><span /></i>
          <b>{menuOpen ? "Fechar" : "Menu"}</b>
        </button>
      </header>

      {/* Menu Overlay (Padronizado com Dash) */}
      {menuOpen && (
        <div
          ref={menuDialogRef}
          tabIndex={-1}
          className="web-menu-overlay sync-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal do Avancini Sync"
        >
          <div className="web-menu-top">
            <span>NAVEGAÇÃO <i /> 07 SEÇÕES</span>
            <div className="web-menu-network" aria-label="Ecossistema Avancini">
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
              ["02", "Jornada da IA", "Acolhimento, Triagem & Resolução", "#jornada"],
              ["03", "Custo vs. Retorno", "IA x Ampliar equipe tradicional", "#retorno"],
              ["04", "Segmentos Atendidos", "Configuração sob medida", "#nichos"],
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
          <div className="web-menu-bottom">
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

      {/* 1. HERO COMPACTO, VIVO & INTERATIVO (CENTRAL DE ATENDIMENTO NO WHATSAPP) */}
      <section className="sync-hero sync-hero-compact" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        
        <div className="sync-hero-copy">
          <div className="eyebrow hero-typewriter sync-hero-typewriter">
            <span className="hero-badge-dot sync-badge-dot" />
            <span className="hero-typewriter-prefix">Atendimento inteligente com IA para</span>
            <SyncAudienceTypewriter />
          </div>

          <h1>Atendimento rápido, simpático e acolhedor.<br /><em>Sua empresa respondendo na hora, 24 horas por dia.</em></h1>
          
          <p>
            Inteligência artificial no WhatsApp que acolhe clientes, ouve áudios, tira dúvidas e marca horários 24h por dia, sem deixar ninguém esperando.
          </p>

          <div className="sync-hero-actions">
            <a className="btn-underline" href="#retorno"><span>Comparar com funcionário</span> <SyncDownArrow /></a>
            <a className="btn-underline sync-plans-shortcut" href="#planos"><span>Ver planos</span> <SyncDownArrow /></a>
            <MagneticButton type="button" className="sync-primary-cta" onClick={() => openLead("implantar a equipe de IA na minha empresa")}>
              <span>Quero uma demonstração prática</span> <SyncArrow />
            </MagneticButton>
          </div>

          {/* KPI Strip Comercial com Números Animados */}
          <div className="sync-hero-kpis-strip" aria-label="Indicadores de performance da IA">
            <div className="kpi-box">
              <strong><AnimatedCounter target={24} suffix="/7" /></strong>
              <span>Atendimento 24h</span>
            </div>
            <div className="kpi-box">
              <strong>&lt; <AnimatedCounter target={3} suffix="s" /></strong>
              <span>Tempo de Resposta</span>
            </div>
            <div className="kpi-box">
              <strong>+<AnimatedCounter target={38} suffix="%" /></strong>
              <span>Conversão Fora de Hora</span>
            </div>
            <div className="kpi-box">
              <strong><AnimatedCounter target={84000} prefix="+" /></strong>
              <span>Conversas Analisadas</span>
            </div>
          </div>

          {/* Painel Interativo Vivo do Supervisor Multiagente (Substitui os 4 cards estáticos e mortos) */}
          <div className="supervisor-live-cockpit" aria-label="Central de Atendimento Inteligente">
            <div className="cockpit-header">
              <div className="cockpit-status-dot">
                <span className="pulse-ring" />
                <span className="dot" />
              </div>
              <div className="cockpit-title">
                <strong>CENTRAL DE ATENDIMENTO INTELIGENTE</strong>
                <small>Veja na prática como a IA acolhe, tira dúvidas e agenda pelo WhatsApp da sua empresa</small>
              </div>
              <div className="cockpit-header-actions">
                <button
                  type="button"
                  className="cockpit-sim-btn"
                  onClick={() => runSimulation(activeSupervisorIndex)}
                  disabled={simulating}
                  aria-label="Simular atendimento ao vivo"
                >
                  <span className="sim-btn-icon">{simulating ? "⚡" : "▶"}</span>
                  <span>{simulating ? "Processando..." : "Simular Atendimento ao Vivo"}</span>
                </button>
                <span className="cockpit-live-tag">STATUS: ONLINE E PRONTO</span>
              </div>
            </div>

            <div className="cockpit-tabs-row" role="tablist" aria-label="Agentes Especialistas">
              {supervisorAgents.map((agent, i) => (
                <button
                  type="button"
                  key={agent.id}
                  role="tab"
                  aria-selected={activeSupervisorIndex === i}
                  className={`cockpit-agent-btn ${activeSupervisorIndex === i ? "active" : ""}`}
                  onClick={() => runSimulation(i)}
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
                <div className="cockpit-body-split">
                  {/* Coluna Esquerda: O Que o Agente de IA Faz na Vida Real (Prático, sem jargões) */}
                  <div className="cockpit-superpowers-panel">
                    <div className="superpowers-header">
                      <div className="paulo-ref-kicker" style={{ marginBottom: 4 }}>
                        REF:// SEU DIA A DIA TRANSFORMADO · 24/7 <span className="kicker-bar" />
                      </div>
                      <span className="spec-agent-tag">{currentAgent.name}</span>
                      <h4>Como o Chatbot com IA muda sua rotina:</h4>
                      <p>Você foca no seu trabalho enquanto seu WhatsApp acolhe, tira dúvidas e agenda sem você precisar digitar nada.</p>
                    </div>

                    {/* Formato 1: Clínica & Saúde (Métricas + Passos de Grade) */}
                    {currentAgent.id === "clinica" && (
                      <div className="superpower-segment-panel segment-clinica">
                        <div className="segment-metrics-highlight">
                          <div className="seg-metric-chip">
                            <span className="seg-chip-icon">📅</span>
                            <div>
                              <strong>Google Calendar</strong>
                              <small>Grade em tempo real</small>
                            </div>
                          </div>
                          <div className="seg-metric-chip">
                            <span className="seg-chip-icon">⏰</span>
                            <div>
                              <strong>Anti-Falta Ativo</strong>
                              <small>Lembretes 24h e 2h</small>
                            </div>
                          </div>
                          <div className="seg-metric-chip">
                            <span className="seg-chip-icon">🩺</span>
                            <div>
                              <strong>Sem Diagnóstico</strong>
                              <small>Regras médicas estritas</small>
                            </div>
                          </div>
                        </div>

                        <div className="segment-workflow-steps">
                          <div className="seg-workflow-item">
                            <span className="seg-step-num">01</span>
                            <div className="seg-step-content">
                              <strong>Checagem Autônoma de Grade</strong>
                              <p>O paciente pede horário e a IA consulta dias e horários livres no Google Calendar sem choque de agenda.</p>
                            </div>
                          </div>
                          <div className="seg-workflow-item">
                            <span className="seg-step-num">02</span>
                            <div className="seg-step-content">
                              <strong>Escolha Direta no WhatsApp</strong>
                              <p>Apresenta 3 opções práticas e reserva a consulta na hora com dados completos do paciente.</p>
                            </div>
                          </div>
                          <div className="seg-workflow-item">
                            <span className="seg-step-num">03</span>
                            <div className="seg-step-content">
                              <strong>Confirmação e Lembretes Automáticos</strong>
                              <p>Dispara lembrete na véspera com confirmação em 1 clique para preencher horários ociosos.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formato 2: Advocacia & Consultoria (Áudio Focus + Ficha Prévia) */}
                    {currentAgent.id === "advocacia" && (
                      <div className="superpower-segment-panel segment-advocacia">
                        <div className="advocacia-focus-card">
                          <div className="focus-card-header">
                            <span className="focus-icon">🎙️</span>
                            <div>
                              <strong>Audição de Áudios Longos &amp; Triagem Preliminar</strong>
                              <small>Ouve áudios de qualquer tamanho com ruído de fundo e transcreve na hora</small>
                            </div>
                          </div>
                          <p>O cliente fala à vontade pelo WhatsApp. A IA acolhe com empatia e extrai os fatos relevantes do caso para o advogado.</p>
                        </div>

                        <div className="advocacia-dossier-preview">
                          <span className="dossier-label">📋 FICHA PRONTA ENTREGUE NO WHATSAPP DO ADVOGADO:</span>
                          <div className="dossier-row">
                            <span>Área Jurídica:</span>
                            <strong>Direito Trabalhista / Rescisão</strong>
                          </div>
                          <div className="dossier-row">
                            <span>Demanda Identificada:</span>
                            <strong>Cálculo rescisório e verbas pendentes</strong>
                          </div>
                          <div className="dossier-row">
                            <span>Status da Triagem:</span>
                            <strong className="text-success">Cliente qualificado aguardando retorno</strong>
                          </div>
                        </div>

                        <div className="advocacia-stat-line">
                          <span>⚡ <b>Economia real:</b> o advogado entra na conversa já sabendo o contexto sem perder tempo com triagem repetitiva.</span>
                        </div>
                      </div>
                    )}

                    {/* Formato 3: Comércio & Serviços (Feature Grid + Banner de Eficiência) */}
                    {currentAgent.id === "comercio" && (
                      <div className="superpower-segment-panel segment-comercio">
                        <div className="comercio-feature-grid">
                          <div className="comercio-feat-box">
                            <span className="feat-ico">📄</span>
                            <strong>OCR de Arquivos &amp; Fotos</strong>
                            <p>Lê pedidos, tabelas de medidas e comprovantes enviados pelo cliente.</p>
                          </div>
                          <div className="comercio-feat-box">
                            <span className="feat-ico">💳</span>
                            <strong>Chave Pix Copia e Cola</strong>
                            <p>Gera o código Pix imediato com o valor exato para acelerar o pagamento.</p>
                          </div>
                          <div className="comercio-feat-box">
                            <span className="feat-ico">📦</span>
                            <strong>Status de Frete &amp; Pedido</strong>
                            <p>Informa prazos de entrega e rastreio sem ninguém precisar parar para consultar.</p>
                          </div>
                        </div>

                        <div className="comercio-kpi-banner">
                          <div className="kpi-banner-item">
                            <strong>90%</strong>
                            <span>das dúvidas resolvidas de forma autônoma</span>
                          </div>
                          <div className="kpi-banner-divider" />
                          <div className="kpi-banner-item">
                            <strong>Zero</strong>
                            <span>pedidos perdidos por demora no envio do Pix</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formato 4: Imobiliária & Negócios (Comparativo Antes/Depois + Resgate de Vendas) */}
                    {currentAgent.id === "imobiliaria" && (
                      <div className="superpower-segment-panel segment-imobiliaria">
                        <div className="imob-comparison-box">
                          <div className="imob-comp-item before">
                            <span className="comp-tag">SEM O SYNC</span>
                            <strong>O vácuo das 24h</strong>
                            <p>O cliente orça o imóvel ou serviço, diz que vai pensar, ninguém faz follow-up e o negócio é esquecido.</p>
                          </div>
                          <div className="imob-comp-item after">
                            <span className="comp-tag gain">COM O SYNC</span>
                            <strong>Retomada Educada</strong>
                            <p>Após 24h sem resposta, a IA retoma a conversa com gentileza, tira dúvidas pendentes e agenda visita presencial.</p>
                          </div>
                        </div>

                        <div className="imob-recovery-kpis">
                          <div className="imob-kpi-pill">
                            <span className="pill-dot" />
                            <span><b>+38%</b> de propostas recuperadas no pós-atendimento</span>
                          </div>
                          <div className="imob-kpi-pill">
                            <span className="pill-dot" />
                            <span><b>Visitas presenciais</b> marcadas sem você perder tempo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="superpowers-footer">
                      <MagneticButton
                        type="button"
                        className="paulo-signature-btn btn-full paulo-btn-sync btn-icon-rotate"
                        onClick={() => openLead("testar o Chatbot de IA no meu WhatsApp")}
                      >
                        <span>TESTAR NO MEU WHATSAPP</span>
                        <span className="paulo-arrow-circle"><LivingArrow size={13} /></span>
                      </MagneticButton>
                      <div className="superpowers-guarantee">
                        <span>🛡️</span>
                        <span><strong>Sem fidelidade</strong> · Conexão QR Code em 5 min no seu número</span>
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Simulador de WhatsApp Business Real e Multimodal */}
                  <div className="cockpit-chat-terminal">
                    <div className="chat-terminal-bar">
                      <div className="chat-header-contact">
                        <div className="chat-avatar-sync">
                          <span className="sync-ai-icon">WA</span>
                          <span className="chat-status-online" />
                        </div>
                        <div className="chat-terminal-info">
                          <strong>WhatsApp da Sua Empresa · IA Conectada</strong>
                          <small>
                            {simStage === 1 ? "digitando..." : "● online"}
                          </small>
                        </div>
                      </div>
                      <div className="chat-header-icons" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                        </svg>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.27-.27.35-.66.24-1.01-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                        </svg>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Stepper Visual em Tempo Real da IA */}
                    <div className="cockpit-live-stepper" aria-label="Etapas da automação">
                      <div className={`step-node ${simStage >= 0 ? "is-active" : ""}`}>
                        <span className="step-dot">1</span>
                        <div className="step-text">
                          <strong>WhatsApp</strong>
                          <small>Mensagem</small>
                        </div>
                      </div>
                      <div className={`step-arrow ${simStage >= 1 ? "is-active" : ""}`}>➔</div>
                      <div className={`step-node ${simStage >= 1 ? "is-active" : ""}`}>
                        <span className="step-dot">2</span>
                        <div className="step-text">
                          <strong>Triagem IA</strong>
                          <small>Análise</small>
                        </div>
                      </div>
                      <div className={`step-arrow ${simStage >= 2 ? "is-active" : ""}`}>➔</div>
                      <div className={`step-node ${simStage >= 2 ? "is-active" : ""}`}>
                        <span className="step-dot">3</span>
                        <div className="step-text">
                          <strong>Ação &amp; Agenda</strong>
                          <small>Reserva</small>
                        </div>
                      </div>
                      <div className={`step-arrow ${simStage >= 3 ? "is-active" : ""}`}>➔</div>
                      <div className={`step-node ${simStage >= 3 ? "is-active" : ""}`}>
                        <span className="step-dot">4</span>
                        <div className="step-text">
                          <strong>Resumo</strong>
                          <small>Pronto</small>
                        </div>
                      </div>
                    </div>

                    <div className="chat-messages-scroll">
                      <div className="wa-date-pill">Hoje</div>
                      {simStage === 1 && (
                        <div className="chat-bubble ai typing-indicator-bubble">
                          <div className="bubble-ai-meta">
                            <span className="bubble-author">{currentAgent.name}</span>
                            <span className="ai-verified-badge">digitando</span>
                          </div>
                          <div className="typing-dots-wrap">
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <span className="typing-dot" />
                            <small>digitando resposta...</small>
                          </div>
                        </div>
                      )}
                      {/* Cenário 1: Áudio do WhatsApp com transcrição e CRM */}
                      {currentAgent.chatType === "audio" && (
                        <>
                          <div className="chat-bubble client chat-bubble-audio">
                            <div className="audio-player-row">
                              <button
                                type="button"
                                className={`audio-play-btn ${audioPlaying ? "is-playing" : ""}`}
                                onClick={toggleAudio}
                                aria-label={audioPlaying ? "Pausar demonstração de áudio" : "Ouvir demonstração de áudio"}
                              >
                                {audioPlaying ? "❚❚" : "▶"}
                              </button>
                              <div className={`audio-wave-bars ${audioPlaying ? "wave-animated" : ""}`}>
                                {[40, 75, 55, 95, 30, 85, 60, 100, 45, 90, 65, 35, 80, 50, 95, 70, 40, 85, 60, 30].map((h, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      height: audioPlaying ? `${Math.max(20, (h + (audioProgress * 9 + i * 13) % 75))}%` : `${h}%`,
                                    }}
                                    className="wave-bar"
                                  />
                                ))}
                              </div>
                              <span className="audio-duration">
                                {audioPlaying ? formatAudioTime(audioProgress) : currentAgent.chat.audioDuration}
                              </span>
                            </div>
                            <div className="audio-transcription-box">
                              <div className="audio-trans-header">
                                <span>🎙️ Áudio ouvido e compreendido na hora:</span>
                                {audioPlaying && <small className="audio-playing-indicator">● REPRODUZINDO DEMO</small>}
                              </div>
                              <p className={audioPlaying ? "transcription-active" : ""}>&ldquo;{currentAgent.chat.audioTranscription}&rdquo;</p>
                            </div>
                            <time>14:32</time>
                          </div>

                          {simStage >= 2 && (
                            <div className="chat-bubble ai">
                              <div className="bubble-ai-meta">
                                <span className="bubble-author">{currentAgent.name}</span>
                                <span className="ai-verified-badge">Atendente Virtual</span>
                              </div>
                              <p>{currentAgent.chat.aiResponse}</p>

                              {simStage >= 3 && currentAgent.chat.crmBadge && (
                                <div className="chat-crm-card">
                                  <div className="crm-badge-top">
                                    <span>{currentAgent.chat.crmBadge.title}</span>
                                  </div>
                                  <div className="crm-badge-body">
                                    <div><b>⚖️ Área:</b> {currentAgent.chat.crmBadge.area}</div>
                                    <div><b>📊 Demanda:</b> {currentAgent.chat.crmBadge.volume}</div>
                                    <div><b>🎯 Próximo Passo:</b> {currentAgent.chat.crmBadge.action}</div>
                                  </div>
                                </div>
                              )}
                              <time>14:32 · <span className="wa-check-blue">✓✓</span></time>
                            </div>
                          )}
                        </>
                      )}

                      {/* Cenário 2: Agendamento Interativo Google Calendar */}
                      {currentAgent.chatType === "calendar" && (
                        <>
                          <div className="chat-bubble client">
                            <span className="bubble-author">Cliente</span>
                            <p>{currentAgent.chat.clientText}</p>
                            <time>14:32</time>
                          </div>

                          {simStage >= 2 && (
                            <div className="chat-bubble ai">
                              <div className="bubble-ai-meta">
                                <span className="bubble-author">{currentAgent.name}</span>
                                <span className="ai-verified-badge">Especialista</span>
                              </div>
                              <p>{currentAgent.chat.aiResponse}</p>

                              {simStage >= 3 && (
                                <>
                                  <div className="chat-slots-container">
                                    {currentAgent.chat.slots?.map((slot, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className={`chat-slot-chip ${slot === currentAgent.chat.selectedSlot ? "selected" : ""}`}
                                      >
                                        <span>📅 {slot}</span>
                                        {slot === currentAgent.chat.selectedSlot && <b>Horário reservado ✓</b>}
                                      </div>
                                    ))}
                                  </div>

                                  {currentAgent.chat.confirmationCard && (
                                    <div className="chat-calendar-card">
                                      <div className="cal-card-top">
                                        <span>{currentAgent.chat.confirmationCard.title}</span>
                                      </div>
                                      <div className="cal-card-body">
                                        <strong>🩺 {currentAgent.chat.confirmationCard.doctor}</strong>
                                        <p>🗓️ {currentAgent.chat.confirmationCard.date}</p>
                                        <small>🔔 {currentAgent.chat.confirmationCard.reminder}</small>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                              <time>14:33 · <span className="wa-check-blue">✓✓</span></time>
                            </div>
                          )}
                        </>
                      )}

                      {/* Cenário 3: Leitor OCR de Documentos / Fotos & Pix */}
                      {currentAgent.chatType === "document" && (
                        <>
                          <div className="chat-bubble client chat-bubble-doc">
                            <div className="doc-attachment-preview">
                              <div className="doc-icon">📄</div>
                              <div className="doc-info">
                                <strong>{currentAgent.chat.docName}</strong>
                                <small>{currentAgent.chat.docSize}</small>
                              </div>
                              <span className="ocr-status-tag">✓ Arquivo recebido</span>
                            </div>
                            <p>{currentAgent.chat.clientText}</p>
                            <time>14:32</time>
                          </div>

                          {simStage >= 2 && (
                            <div className="chat-bubble ai">
                              <div className="bubble-ai-meta">
                                <span className="bubble-author">{currentAgent.name}</span>
                                <span className="ai-verified-badge">Especialista</span>
                              </div>
                              <p>{currentAgent.chat.aiResponse}</p>

                              {simStage >= 3 && currentAgent.chat.pixCard && (
                                <div className="chat-pix-card">
                                  <div className="pix-card-top">
                                    <span>{currentAgent.chat.pixCard.title}</span>
                                  </div>
                                  <div className="pix-card-body">
                                    <strong>{currentAgent.chat.pixCard.value}</strong>
                                    <div className="pix-key-box">
                                      <code>{currentAgent.chat.pixCard.pixKey}</code>
                                      <button type="button" className="copy-pix-btn">Copiar Pix</button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <time>14:33 · <span className="wa-check-blue">✓✓</span></time>
                            </div>
                          )}
                        </>
                      )}

                      {/* Cenário 4: Follow-up com Linha do Tempo e Recuperação de Venda */}
                      {(currentAgent.chatType === "followup" || currentAgent.chatType === "recovery") && (
                        <>
                          <div className="chat-timeline-divider">
                            <span>{currentAgent.chat.pastTime}</span>
                          </div>

                          <div className="chat-bubble client">
                            <span className="bubble-author">Cliente</span>
                            <p>{currentAgent.chat.pastClientText}</p>
                            <time>16:45</time>
                          </div>

                          <div className="chat-timeline-divider trigger-divider">
                            <span>⚡ {currentAgent.chat.triggerTime}</span>
                          </div>

                          {simStage >= 2 && (
                            <>
                              <div className="chat-bubble ai">
                                <div className="bubble-ai-meta">
                                  <span className="bubble-author">{currentAgent.name}</span>
                                  <span className="ai-verified-badge">Especialista</span>
                                </div>
                                <p>{currentAgent.chat.aiFollowupText}</p>
                                <time>16:50 · <span className="wa-check-blue">✓✓</span></time>
                              </div>

                              {simStage >= 3 && (
                                <>
                                  <div className="chat-bubble client">
                                    <span className="bubble-author">Cliente</span>
                                    <p>{currentAgent.chat.clientReplyText}</p>
                                    <time>16:52</time>
                                  </div>

                                  {currentAgent.chat.recoveredCard && (
                                    <div className="chat-recovery-celebration">
                                      <span className="celebration-badge">{currentAgent.chat.recoveredCard.title}</span>
                                      <p>{currentAgent.chat.recoveredCard.value}</p>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Barra de Digitação Fake do WhatsApp */}
                    <div className="wa-chat-input-bar" aria-hidden="true">
                      <span style={{ fontSize: 18, cursor: "default" }}>😊</span>
                      <span style={{ fontSize: 16, cursor: "default" }}>📎</span>
                      <div className="wa-chat-input-pill">
                        <span>Mensagem</span>
                      </div>
                      <div className="wa-chat-mic-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                      </div>
                    </div>

                    <div className="chat-action-tag-strip">
                      <span className="action-tag-pulse" />
                      <code>{currentAgent.chat.actionTag}</code>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 1.5 FAIXA DE INTEGRAÇÕES E ECOSSISTEMA COMPATÍVEL (DUAS CAMADAS) */}
      <section className="sync-integrations-section" id="integracoes" aria-labelledby="integrations-title">
        <div className="sync-integrations-container">
          <header className="integrations-header">
            <span className="integrations-kicker">ECOSSISTEMA CONECTADO</span>
            <h2 id="integrations-title">Integrado às ferramentas que você já usa no dia a dia</h2>
            <p>
              A IA da Avancini Sync não trabalha isolada: conecta diretamente à sua agenda oficial e comunica com as principais ferramentas do mercado.
            </p>
          </header>

          <div className="integrations-two-tier">
            {/* Camada 1: Integrações Universais em Cards Grandes Destacados */}
            <div className="integrations-core-grid">
              {coreSyncIntegrations.map((tool, idx) => (
                <div className="integration-core-card" key={idx}>
                  <div className="core-card-header">
                    <div
                      className="core-card-icon"
                      style={{ borderColor: `${tool.color}44`, background: `${tool.color}15`, color: tool.color }}
                    >
                      <span>{tool.icon}</span>
                    </div>
                    <div className="core-card-titles">
                      <span className="core-card-badge">{tool.category}</span>
                      <h3>{tool.name}</h3>
                    </div>
                  </div>
                  <p className="core-card-desc">{tool.desc}</p>
                  <ul className="core-card-highlights">
                    {tool.highlights.map((item, hIdx) => (
                      <li key={hIdx}>
                        <span>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Camada 2: Bloco Secundário Menor para Integrações Especializadas */}
            <div className="integrations-secondary-block">
              <div className="secondary-block-header">
                <span>PLATAFORMAS &amp; INTEGRAÇÕES NICHADAS</span>
                <small>Conectividade rápida com seu fluxo atual</small>
              </div>
              <div className="secondary-integrations-grid">
                {secondarySyncIntegrations.map((tool, idx) => (
                  <div className="secondary-integration-pill" key={idx}>
                    <span className="sec-icon">{tool.icon}</span>
                    <div className="sec-info">
                      <strong>{tool.name}</strong>
                      <small>{tool.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
              <p className="integrations-on-demand-note">
                <span className="note-pulse">●</span>
                <span><strong>E mais integrações sob demanda:</strong> conectamos a qualquer CRM, ERP ou sistema proprietário com API aberta via Webhooks.</span>
              </p>
            </div>
          </div>

          <div className="integrations-footer-badge">
            <span className="badge-shield">🛡️</span>
            <span>API Oficial Segura com criptografia de ponta a ponta e total conformidade com a LGPD.</span>
          </div>
        </div>
      </section>

      {/* 2. A JORNADA DA IA: PRÉ-VENDA → VENDA → PÓS-VENDA → OPERAÇÃO */}
      <section className="sync-commercial-section" id="jornada" aria-labelledby="sync-journey-title">
        <header className="sync-section-heading">
          <div>
            <span className="paulo-ref-kicker">REF:// ROTINA REVOLUCIONADA · 01 <span className="kicker-bar" /></span>
            <h2 id="sync-journey-title">Você foca no seu trabalho.<br /><em>O Chatbot com IA cuida do seu WhatsApp.</em></h2>
          </div>
          <p>Menos estresse com mensagens repetitivas, atendimento acolhedor para cada contato e sua agenda sempre organizada.</p>
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
                    Ver demonstração para {current.title.split("&")[0].trim()} <SyncArrow />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. COMPARATIVO FINANCEIRO & EFICIÊNCIA OPERACIONAL */}
      <section className="sync-commercial-section sync-cost-comparison" id="retorno" aria-labelledby="sync-cost-title">
        <header className="sync-section-heading">
          <div>
            <span className="paulo-ref-kicker">REF:// ECONOMIA &amp; RETORNO · 02 <span className="kicker-bar" /></span>
            <h2 id="sync-cost-title" className="roi-balanced-title">
              Uma tecnologia que cabe no bolso de qualquer empresa.<br />
              <em>Custa menos que um café por dia e se paga no 1º cliente resgatado.</em>
            </h2>
          </div>
          <p>Compare o custo de um funcionário tradicional (salário, encargos, férias e limite de 8h/dia) com um Agente de IA que nunca descansa.</p>
        </header>

        <div className="sync-roi-grid">
          {/* Card 1: A Dor Real (O que você perde hoje) */}
          <div className="sync-roi-card sync-roi-pain">
            <div className="roi-tag pain-tag">❌ O QUE VOCÊ PERDE HOJE SEM A IA</div>
            <h3>O vácuo do pós-18h e fim de semana</h3>
            <p className="roi-desc">
              Mais de 60% das mensagens chegam à noite ou no fim de semana. Sem resposta rápida, o cliente contrata o concorrente.
            </p>

            <div className="roi-inputs-box">
              <div className="roi-input-row">
                <div className="roi-label-row">
                  <span>Quanto vale em média 1 novo cliente ou consulta para você?</span>
                  <strong>R$ {clientTicket.toLocaleString("pt-BR")}</strong>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={clientTicket}
                  onChange={(e) => setClientTicket(Number(e.target.value))}
                  aria-label="Ticket médio de cliente"
                />
              </div>

              <div className="roi-input-row">
                <div className="roi-label-row">
                  <span>Contatos perdidos por mês (demora de resposta ou fora do horário):</span>
                  <strong className="text-danger">Perda estimada: {missedWeekendLeads} contatos / mês</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={missedWeekendLeads}
                  onChange={(e) => setMissedWeekendLeads(Number(e.target.value))}
                  aria-label="Clientes perdidos fora de hora"
                />
              </div>
            </div>

            <div className="sync-pain-metrics">
              <div className="pain-metric-item">
                <small>FATURAMENTO PERDIDO NA MADRUGADA / FIM DE SEMANA:</small>
                <strong className="text-danger">- R$ {(clientTicket * missedWeekendLeads).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
                <span className="text-contrast-high">Faturamento que vai direto para o caixa do concorrente.</span>
              </div>
              <div className="pain-metric-item clt-item">
                <small>COMPARATIVO COM CLT:</small>
                <span className="text-contrast-high">1 atendente na CLT para cobrir noites e fins de semana custa mais de <b>R$ 3.500/mês</b> com encargos.</span>
              </div>
            </div>
          </div>

          {/* Card 2: O Ganho Real e Previsível */}
          <div className="sync-roi-card sync-roi-gain">
            <div className="roi-tag gain-tag">✓ COM O AVANCINI SYNC</div>
            <h3>Conversão contínua sem limite de horário</h3>

            <div className="sync-break-even-pill">
              <span className="break-even-check">⚡</span>
              <div>
                <strong>RESGATE DE VENDAS EM TEMPO REAL</strong>
                <p>
                  Cada cliente atendido em segundos fora do expediente é uma oportunidade quente resgatada antes de procurar o concorrente, gerando faturamento novo no seu caixa.
                </p>
              </div>
            </div>

            <div className="sync-roi-math">
              <div className="math-line">
                <span>Custo alternativo tradicional (CLT 24/7):</span>
                <strong>R$ 3.500+ / mês <small style={{ color: "#94a3b8", fontWeight: 400 }}>(encargos + plantões)</small></strong>
              </div>
              <div className="math-line gain-highlight">
                <span>Faturamento recuperado estimado ({missedWeekendLeads} clientes acolhidos):</span>
                <strong className="text-success">+ R$ {(clientTicket * missedWeekendLeads).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
              </div>

              <div className="sync-final-profit-card">
                <div>
                  <small>RECEITA ADICIONAL RESGATADA NO SEU CAIXA:</small>
                  <strong className="text-success">+ R$ {(clientTicket * missedWeekendLeads).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
                </div>
                <span className="free-status-badge">
                  RECEITA NOVA NO CAIXA
                </span>
              </div>
            </div>

            <button
              type="button"
              className="sync-roi-cta"
              onClick={() => openLead(`Quero parar de perder clientes fora do horário. Meu ticket é de R$ ${clientTicket} e quero estruturar o atendimento da Avancini Sync.`)}
            >
              <span>ESTRUTURAR ATENDIMENTO 24/7 NA MINHA EMPRESA</span> <LivingArrow size={12} />
            </button>

            <div className="roi-trust-badges">
              <span>🛡️ <b>Sem fidelidade</b> · Teste antes de contratar</span>
              <span>📱 <b>QR Code em 5 min</b> · Mantém seu número</span>
              <span>⚡ <b>Setup incluso</b> com especialista</span>
            </div>
          </div>
        </div>

        <div className="fin-closing-note">
          <p>
            💡 <strong>A lógica é simples:</strong> Enquanto o modelo tradicional exige altos custos fixos com pessoal para horários estendidos, a IA atende em segundos 24/7 e multiplica suas conversões sem encargos trabalhistas.
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
                    <strong>Pronto para automatizar a rotina de {niche.title.split("&")[0].trim()}?</strong>
                    <small>Apresentamos uma demonstração ao vivo adaptada às regras do seu estabelecimento.</small>
                  </div>
                </div>
                <button
                  type="button"
                  className="niche-cta-highlight"
                  onClick={() => openLead(`a implantação da IA para ${niche.title}`)}
                >
                  Configurar IA para {niche.title.split("&")[0].trim()} <SyncArrow />
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. FORMATOS DE IMPLANTAÇÃO SOB MEDIDA */}
      {/* 5. FORMATOS DE IMPLANTAÇÃO SOB MEDIDA — ALTO IMPACTO & VISUAL CLEAN */}
      <section className="sync-commercial-section" id="planos" aria-labelledby="sync-plans-title">
        <header className="sync-section-heading">
          <div>
            <span className="paulo-ref-kicker">REF:// MODELOS ACESSÍVEIS · 03 <span className="kicker-bar" /></span>
            <h2 id="sync-plans-title">Tecnologia de ponta que cabe no seu orçamento.<br /><em>A IA se adapta ao tamanho e à realidade da sua empresa.</em></h2>
          </div>
          <p>Sem tabelas engessadas ou cobranças abusivas. Você testa a inteligência no seu segmento e vê o retorno antes de contratar.</p>
        </header>

        {/* 1. Dock de Garantia e Engenharia Dedicada */}
        <div className="value-assurance-dock">
          <div className="assurance-radar-pill">
            <span className="dock-radar-dot" />
            <span>IMPLANTAÇÃO CHAVE NA MÃO · CABE NO BOLSO DE TODO MUNDO</span>
          </div>
          <p className="assurance-headline">
            Não entregamos robô cru. Mapeamos as regras da sua empresa, calibramos as respostas com o seu tom de voz e conectamos no seu WhatsApp via QR Code em poucos minutos.
          </p>
          <div className="assurance-perks-row">
            <div className="perk-chip">
              <span className="perk-icon">🛡️</span>
              <span>Sem Fidelidade: Teste antes de contratar</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">📱</span>
              <span>Conexão via QR Code em 5 min no seu número</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">⚡</span>
              <span>Setup e calibração com especialista</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">📅</span>
              <span>Google Agenda em Tempo Real</span>
            </div>
          </div>
        </div>

        {/* 2. Grid com os 3 Modelos de Atendimento (Chatbot, IA Essencial e Scale Pro) */}
        <div className="plans-showcase-grid-compact">
          {simplifiedPlans.map((plan) => {
            const isFeatured = plan.featured;
            return (
              <article
                className={`plan-compact-card sync-compact-card ${isFeatured ? "featured is-featured-hero" : ""}`}
                key={plan.id}
              >
                <div className="plan-card-header-clean">
                  {isFeatured && (
                    <div className="plan-featured-tag-pill">
                      <span className="featured-tag-spark" aria-hidden="true">🔥</span>
                      <span>{plan.badge ? plan.badge.replace(/^🔥\s*/, "") : "MAIS ESCOLHIDO"}</span>
                    </div>
                  )}
                  <span className="plan-compact-kicker">{plan.kicker}</span>
                  <h3 className="plan-compact-title">{plan.name}</h3>
                </div>
                <p className="plan-compact-ideal"><strong>Para quem é:</strong> {plan.idealFor}</p>

                <div className="plan-compact-pitch">
                  {plan.pitch}
                </div>

                {/* Checklist Elegante e Direta */}
                <ul className="plan-compact-features">
                  {plan.features.map((feat, fIdx) => (
                    <li className="plan-compact-feature-item" key={fIdx}>
                      <span className="feature-check-icon">✓</span>
                      <div className="feature-body">
                        <strong>{feat.title}</strong>
                        <p>{feat.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Faixa de Retorno / Payoff */}
                <div className="plan-compact-payoff">
                  {plan.payoff}
                </div>

                {/* Botão Signature Paulo Leme */}
                <button
                  type="button"
                  className="paulo-signature-btn btn-full paulo-btn-sync btn-icon-rotate"
                  onClick={() => openLead(`Olá! Gostaria de testar uma demonstração gratuita do ${plan.name} no meu WhatsApp.`)}
                >
                  <span>{plan.ctaText}</span>
                  <span className="paulo-arrow-circle"><LivingArrow size={13} /></span>
                </button>
                <small className="plan-compact-subnote">
                  {plan.deliverableBadge}
                </small>
              </article>
            );
          })}
        </div>

        {/* 3. Card Enterprise VIP Executivo (Arquitetura Sob Medida) */}
        <div className="enterprise-vip-card">
          <div className="enterprise-vip-left">
            <div className="enterprise-vip-badge">
              <span>🏢 ARQUITETURA ENTERPRISE SOB MEDIDA</span>
            </div>
            <h3>Múltiplos Números de WhatsApp &amp; Integração Profunda com CRM/ERP</h3>
            <p>
              Para redes de clínicas, hospitais, distribuidoras e operações com alta demanda. Desenvolvemos infraestrutura dedicada com múltiplos números simultâneos, banco de dados isolado e integração bidirecional em tempo real com HubSpot, RD Station, Piperun, Salesforce ou ERP proprietário.
            </p>
            <div className="enterprise-vip-tags">
              <span className="enterprise-tag-pill">✓ SLA de 99.9% Garantido</span>
              <span className="enterprise-tag-pill">✓ Servidores Dedicados Isolados</span>
              <span className="enterprise-tag-pill">✓ Gerente de Engenharia Exclusivo</span>
              <span className="enterprise-tag-pill">✓ Múltiplos Números no Mesmo Painel</span>
            </div>
          </div>
          <div className="enterprise-vip-right">
            <button
              type="button"
              className="enterprise-vip-btn"
              onClick={() => openLead("Olá! Gostaria de conversar com um arquiteto sobre a solução Enterprise (Múltiplos Números / CRM Corporativo).")}
            >
              <span>Consultar Solução Enterprise</span>
              <SyncArrow size={14} />
            </button>
            <small>Atendimento executivo com arquiteto de software</small>
          </div>
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

      {/* 8. CTA FINAL COMERCIAL — DESIGN PREMIUM & VIVO */}
      <section className="sync-final-commercial-v2">
        <div className="final-glow-container">
          <div className="final-orbit-glow" aria-hidden="true" />
          <AvanciniMark variant="sync" className="final-mark-symbol avancini-a-mark" />
          <span className="final-eyebrow">AVANCINI SYNC // FORÇA DE TRABALHO DIGITAL</span>
          <h2>Sem fidelidade forçada. Teste a IA no seu WhatsApp antes de contratar.</h2>
          <p>Demonstração ao vivo no seu WhatsApp em menos de 10 minutos. Veja na prática a velocidade de resposta e a sincronização com a sua agenda.</p>
          
          <div className="final-buttons-row">
            <button
              type="button"
              className="final-cta-main"
              onClick={() => openLead("solicitar demonstração da equipe multiagente de IA")}
            >
              <span>Solicitar Demonstração Gratuita</span> <LivingArrow size={13} />
            </button>
            <a href="#planos" className="final-cta-secondary">
              <span>Rever planos e valores</span> <SyncDownArrow />
            </a>
          </div>

          <div className="final-proof-badges">
            <span>✓ Sem fidelidade: teste antes de contratar</span>
            <span>✓ Conexão via QR Code em 5 min no seu número</span>
            <span>✓ Setup e calibração com especialista</span>
          </div>
        </div>
      </section>

      <footer id="contato" className="paulo-footer-section">
        <div className="paulo-footer-card">
          <div className="paulo-footer-grid">
            {/* Coluna 1: Marca, Bio & Redes Sociais */}
            <div className="paulo-footer-brand">
              <Link href="/" className="logo">
                <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
                <span>
                  <span className="brand-name">AVANCINI <b>SYNC</b></span>
                  <small>Equipe Multiagente de IA</small>
                </span>
              </Link>
              <p className="paulo-footer-bio">
                Inteligência artificial e agentes 24h para WhatsApp. Atendimento humanizado, agendamentos automáticos e suporte contínuo sem perda de vendas.
              </p>
              <div className="paulo-social-row" aria-label="Redes sociais">
                <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer" className="paulo-social-btn" aria-label="Instagram da Avancini OS">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://wa.me/5573981019782" target="_blank" rel="noreferrer" className="paulo-social-btn" aria-label="WhatsApp direto">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.932.818 2.796.818 3.179 0 5.765-2.586 5.767-5.766.001-3.18-2.585-5.767-5.767-5.767zm3.376 8.204c-.14.394-.712.723-1.009.76-.282.035-.642.148-2.072-.444-1.745-.723-2.87-2.484-2.956-2.6-.088-.116-.708-.941-.708-1.795s.447-1.275.607-1.447c.159-.172.348-.215.464-.215.116 0 .232.002.333.007.107.005.25-.041.391.298.144.348.492 1.203.535 1.29.043.087.072.189.014.305-.058.115-.088.188-.174.289-.088.101-.185.226-.264.304-.088.087-.18.182-.078.358.101.174.452.744.969 1.205.666.594 1.228.778 1.402.865.174.088.276.073.377-.044.102-.116.435-.508.551-.682.116-.174.233-.145.392-.087s1.016.479 1.19.566c.174.087.29.13.333.203.044.072.044.42-.096.814z"/></svg>
                </a>
                <a href="https://github.com/IvoAvancini" target="_blank" rel="noreferrer" className="paulo-social-btn" aria-label="GitHub">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="mailto:ivoavancini@hotmail.com" className="paulo-social-btn" aria-label="E-mail">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="paulo-footer-col">
              <h4>NAVEGAÇÃO</h4>
              <a href="#inicio">Início</a>
              <a href="#jornada">Jornada da IA</a>
              <a href="#retorno">Custo x Retorno</a>
              <a href="#nichos">Segmentos Atendidos</a>
              <a href="#planos">Serviços e Planos</a>
              <a href="#conexao">Conexão WhatsApp</a>
              <a href="#duvidas">Perguntas frequentes</a>
              <Link href="/">Avancini OS <SyncArrow /></Link>
              <Link href="/dash">Avancini Dash <SyncArrow /></Link>
            </div>

            {/* Coluna 3: Soluções & IA */}
            <div className="paulo-footer-col">
              <h4>SOLUÇÕES &amp; IA</h4>
              <a href="#nichos">Agente de Atendimento 24/7</a>
              <a href="#nichos">Agendamento Google Calendar</a>
              <a href="#nichos">Triagem e Qualificação de Leads</a>
              <a href="#nichos">Follow-up &amp; Recuperação</a>
              <a href="#planos">Solução Enterprise Sob Medida</a>
              <Link href="/dash">Websites Avancini Dash <SyncArrow /></Link>
            </div>

            {/* Coluna 4: Contato & Botão Signature */}
            <div className="paulo-footer-contact">
              <h4>CONTATO</h4>
              <a href="mailto:ivoavancini@hotmail.com" className="paulo-contact-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>ivoavancini@hotmail.com</span>
              </a>
              <a href="tel:+5573981019782" className="paulo-contact-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>(73) 98101-9782</span>
              </a>
              <MagneticButton
                type="button"
                className="paulo-signature-btn btn-icon-rotate"
                onClick={() => openLead("solicitar demonstração de IA pelo rodapé")}
              >
                <span>SOLICITAR DEMONSTRAÇÃO</span>
                <span className="paulo-arrow-circle"><LivingArrow size={13} /></span>
              </MagneticButton>
            </div>
          </div>

          {/* Barra Inferior / Sub-footer */}
          <div className="paulo-footer-bottom">
            <span suppressHydrationWarning>© {new Date().getFullYear()} Avancini OS. Todos os direitos reservados.</span>
            <nav aria-label="Informações legais">
              <a href="/privacidade" className="btn-underline">Política de Privacidade</a>
              <a href="/termos" className="btn-underline">Termos de Uso</a>
              <a href="#inicio" className="btn-underline">Voltar ao topo ↑</a>
            </nav>
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
            <header className="lead-modal-header">
              <div className="lead-avatar-wrap">
                <div className="lead-avatar-img">
                  <AvanciniMark variant="sync" className="lead-logo-mark avancini-a-mark" />
                </div>
                <span className="lead-status-dot" aria-label="Online" />
              </div>
              <div className="lead-header-info">
                <strong className="lead-title">Avancini Sync · Equipe Multiagente de IA</strong>
                <div className="lead-status-row">
                  <span className="lead-online-badge">online</span>
                  <span className="lead-response-time"> - IA responde em segundos</span>
                </div>
              </div>
              <button
                className="web-lead-close"
                type="button"
                onClick={() => setLeadContext("")}
                aria-label="Fechar"
              >
                ✕
              </button>
            </header>

            {normalizedLeadContext && (
              <div className="lead-context-pill">
                <span>⚡ Interesse: <strong>{normalizedLeadContext}</strong></span>
              </div>
            )}

            <div className="lead-fields-wrap">
              <div className="lead-input-row">
                <div className="lead-field-name">
                  <span className="field-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </span>
                  <input
                    required
                    ref={leadInputRef}
                    minLength={2}
                    maxLength={60}
                    value={leadName}
                    onChange={(e) => { setLeadName(e.target.value); if (leadError) setLeadError(""); }}
                    placeholder="Seu nome ou empresa"
                    autoComplete="name"
                    aria-label="Seu nome ou empresa"
                  />
                </div>
              </div>

              <div className="lead-input-row lead-phone-row">
                <div className="lead-ddi-container">
                  <button
                    type="button"
                    className="lead-country-badge"
                    onClick={() => setDdiDropdownOpen(!ddiDropdownOpen)}
                    aria-expanded={ddiDropdownOpen}
                    aria-label={`País selecionado: ${selectedCountry.name}, código ${selectedCountry.ddi}`}
                  >
                    <CountryFlagIcon code={selectedCountry.code} />
                    <span className="country-code">{selectedCountry.ddi}</span>
                    <span className="country-caret">⌵</span>
                  </button>
                  {ddiDropdownOpen && (
                    <div className="lead-ddi-dropdown" role="listbox">
                      <div className="lead-ddi-search">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Buscar país..."
                          value={ddiSearch}
                          onChange={(e) => setDdiSearch(e.target.value)}
                          autoFocus
                          aria-label="Buscar país"
                        />
                      </div>
                      <div className="lead-ddi-list">
                        {filteredCountries.map((country) => (
                          <button
                            type="button"
                            key={country.code}
                            className={`lead-ddi-option ${selectedCountry.code === country.code ? "selected" : ""}`}
                            onClick={() => {
                              setSelectedCountry(country);
                              setDdiDropdownOpen(false);
                              setDdiSearch("");
                            }}
                          >
                            <CountryFlagIcon code={country.code} />
                            <span className="country-name">{country.name}</span>
                            <span className="country-ddi-code">{country.ddi}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="lead-field-phone">
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(event) => {
                      let v = event.target.value.replace(/\D/g, "");
                      if (selectedCountry.code === "BR") {
                        if (v.length > 11) v = v.slice(0, 11);
                        if (v.length > 10) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                        } else if (v.length > 6) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
                        } else if (v.length > 2) {
                          v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                        }
                      }
                      setLeadPhone(v);
                    }}
                    placeholder={selectedCountry.placeholder}
                    autoComplete="tel"
                    aria-label="Seu WhatsApp"
                  />
                </div>
              </div>
            </div>

            {leadError && <p className="lead-error">{leadError}</p>}

            <button className="lead-submit" type="submit" disabled={leadSubmitting}>
              {leadSubmitting ? "CONECTANDO..." : "INICIAR CONVERSA NO WHATSAPP ↗"}
            </button>
            <p className="lead-footer-note">
              🔒 Seus dados estão seguros. Você será direcionado pro WhatsApp com a mensagem pronta.
            </p>
          </form>
        </div>
      )}
    </main>
  );
}
