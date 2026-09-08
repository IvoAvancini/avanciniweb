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

import { CountryFlag } from "../components/CountryFlag";

function CountryFlagIcon({ code }: { code: string }) {
  return <CountryFlag code={code} size={18} />;
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
   CENTRAL DE ATENDIMENTO INTELIGENTE — SIMULAÇÃO INTERATIVA NO HERO
   -------------------------------------------------------------------------- */
const supervisorAgents = [
  {
    id: "sdr",
    name: "Atendimento & Acolhimento",
    role: "Recebe novos clientes com simpatia e agilidade",
    status: "Responde em poucos segundos",
    activeBadge: "⚡ Sempre Ativo",
    metrics: [
      { label: "Tempo de Resposta", value: "Na mesma hora" },
      { label: "Fila de Espera", value: "Zero (atende todos juntos)" },
      { label: "Disponibilidade", value: "24 horas por dia" },
    ],
    tools: ["🎙️ Ouve e entende áudios", "📄 Lê fotos e arquivos", "💬 Tira dúvidas frequentes", "🤝 Envia para sua equipe"],
    pipelineSteps: [
      { step: "01", name: "Ouve com Atenção", desc: "Entende áudios e textos longos" },
      { step: "02", name: "Tira as Dúvidas", desc: "Explica os serviços com clareza" },
      { step: "03", name: "Passa para Você", desc: "Entrega a conversa organizada" },
    ],
    capabilities: [
      "Ouve e transcreve áudios de qualquer tamanho",
      "Identifica a urgência e o perfil do cliente",
      "Responde dúvidas frequentes com simpatia",
      "Transfere para sua equipe com resumo pronto",
    ],
    chatType: "audio",
    chat: {
      audioDuration: "0:18",
      audioTranscription: 'Olá! Temos alto fluxo no WhatsApp. Vocês conseguem acolher na hora, tirar dúvidas e filtrar quem tem urgência?',
      aiResponse: "Olá, Ricardo! Com certeza. Atendemos na mesma hora, tiramos dúvidas sobre seus serviços e já passamos o resumo pronto para sua equipe.",
      crmBadge: {
        title: "⚡ CONTATO ACOLHIDO E QUALIFICADO",
        area: "Atendimento Corporativo",
        volume: "Novo contato acolhido na hora",
        action: "Resumo organizado enviado para a sua equipe",
      },
      actionTag: "⚡ Áudio Ouvido · Cliente Acolhido · Resumo Pronto",
    },
  },
  {
    id: "agenda",
    name: "Agendamento de Horários",
    role: "Consulta sua agenda e marca consultas ou reuniões",
    status: "Sincronizado com sua agenda",
    activeBadge: "📅 Agenda Conectada",
    metrics: [
      { label: "Sua Agenda", value: "Google Calendar" },
      { label: "Faltas de Clientes", value: "Lembretes automáticos" },
      { label: "Marcação", value: "Direto no WhatsApp" },
    ],
    tools: ["📅 Google Calendar", "⏰ Lembrete Anti-Falta", "✅ Horários no Chat", "🔔 Aviso para Equipe"],
    pipelineSteps: [
      { step: "01", name: "Checa a Grade", desc: "Vê dias e horários livres" },
      { step: "02", name: "Escolha Simples", desc: "O cliente escolhe no WhatsApp" },
      { step: "03", name: "Salva e Lembra", desc: "Agenda e envia lembrete antes" },
    ],
    capabilities: [
      "Sincroniza em tempo real com Google Calendar",
      "Oferece opções claras de horários livres",
      "Envia link ou endereço do local no chat",
      "Dispara lembretes gentis anti-falta",
    ],
    chatType: "calendar",
    chat: {
      clientText: "Olá! Gostaria de agendar uma consulta para quinta-feira à tarde. Tem horário livre?",
      aiResponse: "Olá! Tudo bem? 😊 Na quinta-feira à tarde com o Dr. Marcelo temos as opções:",
      slots: ["14h30", "16h00", "17h30"],
      selectedSlot: "14h30",
      confirmationCard: {
        title: "✓ Agendamento Confirmado",
        doctor: "Dr. Marcelo · Avaliação Presencial",
        date: "Quinta-feira às 14:30 (~45 min)",
        reminder: "Lembretes programados: 24h e 2h antes no WhatsApp",
      },
      actionTag: "📅 Horário Marcado no Google Calendar · Lembrete Ativo",
    },
  },
  {
    id: "suporte",
    name: "Dúvidas, Fotos & Pix",
    role: "Tira dúvidas, lê arquivos e envia chave Pix",
    status: "Zero fila de espera",
    activeBadge: "🔍 Resolução Imediata",
    metrics: [
      { label: "Dúvidas Repetitivas", value: "Resolvidas na hora" },
      { label: "Fotos e PDFs", value: "Confere arquivos enviados" },
      { label: "Chave Pix", value: "Copia e cola no WhatsApp" },
    ],
    tools: ["📄 Leitor de Fotos e PDFs", "💳 Chave Pix no Chat", "🔍 Consulta de Pedidos", "📦 Informações Claras"],
    pipelineSteps: [
      { step: "01", name: "Recebe o Arquivo", desc: "Lê o PDF, exame ou comprovante" },
      { step: "02", name: "Conferência", desc: "Checa se está legível e correto" },
      { step: "03", name: "Orientação", desc: "Passa a chave Pix ou próximo passo" },
    ],
    capabilities: [
      "Lê fotos de exames, pedidos e comprovantes",
      "Consulta status de pedidos e solicitações",
      "Gera chave Pix cópia e cola instantânea",
      "Resolve até 90% das dúvidas do dia a dia",
    ],
    chatType: "document",
    chat: {
      docName: "Exame_Sangue_Ricardo.pdf",
      docSize: "1.4 MB · Documento Médico",
      clientText: "Boa tarde! Segue o exame que o Dr. Roberto pediu. Conseguem conferir e me passar o Pix da taxa?",
      aiResponse: "Olá, Ricardo! Recebi o PDF, está legível e já anexei na sua ficha médica.\n\nSegue o Pix da taxa de retorno (R$ 65,00):",
      pixCard: {
        title: "Chave Pix Copia e Cola",
        value: "R$ 65,00 · Taxa de Retorno Clínico",
        pixKey: "00020126580014br.gov.bcb.pix0136...",
      },
      actionTag: "📄 Exame Anexado à Ficha · Chave Pix Enviada",
    },
  },
  {
    id: "recuperacao",
    name: "Retomada de Orçamentos",
    role: "Reengaja orçamentos e clientes que pararam de responder",
    status: "Acompanhamento simpático",
    activeBadge: "💬 Lembrança Gentil",
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
      "Identifica orçamentos sem resposta após 24h",
      "Envia lembrete amigável e sem insistência",
      "Tira dúvidas para destravar a contratação",
      "Recupera vendas que seriam perdidas no silêncio",
    ],
    chatType: "recovery",
    chat: {
      pastTime: "Ontem às 16:45",
      pastClientText: "Gostei da proposta! Vou alinhar com minha sócia hoje e te retorno amanhã cedo.",
      triggerTime: "Hoje · 24h sem resposta — IA retoma com gentileza",
      aiFollowupText: "Oi, Mariana! Tudo bem? Conseguiram conversar sobre a proposta? Se ficou alguma dúvida de prazos ou pagamento, estou por aqui!",
      clientReplyText: "Oi! Conversamos sim e vamos fechar! Pode me mandar o link para pagamento?",
      recoveredCard: {
        title: "🎉 ORÇAMENTO RECUPERADO COM SUCESSO",
        value: "R$ 1.800,00 · Venda salva que seria perdida no silêncio",
      },
      actionTag: "💬 Contato Reengajado · Proposta Aceita · Venda Fechada",
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
      "⚡ Resposta imediata: zero perda de clientes por demora",
      "🎙️ Compreensão total: ouve áudios, lê fotos e textos longos",
      "📋 Resumo organizado: passa o lead qualificado para sua equipe",
    ],
    metricLabel: "Impacto prático",
    metricValue: "Acaba com o abandono de clientes por demora na resposta",
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
    name: "Chatbot de Fluxo",
    badge: "AUTOMAÇÃO EXPRESSA",
    kicker: "MENU GUIADO & RESPOSTAS IMEDIATAS",
    idealFor: "Para empresas que querem respostas automáticas instantâneas, cardápio/catálogo e triagem sem IA generativa.",
    pitch: "Elimina as perguntas repetitivas do dia a dia com direcionamento objetivo em botões ou menu 1, 2, 3.",
    features: [
      { title: "Menu Inteligente de Opções (1 a 5)", desc: "Cliente escolhe o assunto e recebe a resposta oficial sem fila de espera." },
      { title: "Envio Automático de Catálogo & PDF", desc: "Dispara tabela de serviços, cardápio, fotos e localização no mesmo segundo." },
      { title: "Horários de Funcionamento & FAQ", desc: "Tira dúvidas recorrentes 24h e orienta o cliente sem intervenção humana." },
      { title: "Transbordo Direto para Atendente", desc: "Transfere a conversa para o WhatsApp do setor certo quando solicitado." },
      { title: "Zero Risco de Alucinação", desc: "Respostas 100% literais e exatas, rigorosamente dentro do fluxo que você aprovar." },
    ],
    payoff: "💡 Libere a sua equipe das dúvidas repetitivas com ativação rápida em 24h.",
    deliverableBadge: "⚡ Setup Ágil · Conexão QR Code · Sem Complexidade",
    ctaText: "Testar Chatbot no WhatsApp",
    featured: false,
  },
  {
    id: "essencial",
    name: "Operação IA Essencial",
    badge: "MAIS ESCOLHIDO",
    kicker: "IA GENERATIVA HUMANIZADA 24/7",
    idealFor: "Para clínicas, consultórios, advogados e serviços que perdem pacientes e vendas à noite e no fim de semana.",
    pitch: "Uma secretária virtual de elite com o tom de voz da sua marca que acolhe, tira dúvidas e agenda consultas na hora.",
    features: [
      { title: "Atendente IA com Empatia e Tom Autoral", desc: "Conversa com fluidez natural no WhatsApp, entende gírias e acolhe com cordialidade." },
      { title: "Ouve Áudios Longos & Analisa Exames", desc: "O paciente manda áudio de 2 minutos ou foto de documento e a IA processa perfeitamente." },
      { title: "Google Agenda Integrada em Tempo Real", desc: "Consulta a sua grade em tempo real e reserva consultas/reuniões automaticamente." },
      { title: "Lembretes Anti-Falta na Véspera", desc: "Envia confirmação ativa com botão de aceite para zerar furos de agenda e no-show." },
      { title: "Transbordo com Resumo Pronto", desc: "Passa para seu WhatsApp com ficha mastigada do que o paciente precisa." },
    ],
    payoff: "💎 Nunca mais perca um cliente fora do horário comercial enquanto o concorrente dorme.",
    deliverableBadge: "⚡ Calibração Guiada · Google Calendar · Teste sem Risco",
    ctaText: "Solicitar Demonstração da IA",
    featured: true,
  },
  {
    id: "pro",
    name: "Operação Scale Pro",
    badge: "ALTA ESCALA",
    kicker: "CENTRAL CORPORATIVA MULTISSETOR",
    idealFor: "Para clínicas com múltiplos especialistas, imobiliárias, distribuidoras e empresas com equipe de vendas.",
    pitch: "Multiagentes especializados por setor e distribuição inteligente de fila para vários atendentes no mesmo número.",
    features: [
      { title: "Multiagentes Especializados por Setor", desc: "IAs dedicadas: um agente para Vendas, um para Recepção e um para Financeiro/Cobrança." },
      { title: "Fila Inteligente de Atendentes Humanos", desc: "Vários operadores atendendo no mesmo WhatsApp oficial sem conflito de mensagens." },
      { title: "Painel de Métricas & Taxa de Conversão", desc: "Relatórios de motivos de contato, horários de pico e desempenho do time." },
      { title: "Capacidade Prioritária para Anúncios", desc: "Infraestrutura reforçada para suportar picos pesados de campanhas e tráfego pago." },
      { title: "Gerente de Conta Dedicado & SLA Prioritário", desc: "Acompanhamento VIP contínuo para calibração de processos e suporte direto." },
    ],
    payoff: "🚀 Transforme seu WhatsApp em uma máquina de vendas multissetor que atende 500 pessoas ao mesmo tempo.",
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
    answer: "É atendimento contínuo e sem estresse para o volume normal do dia a dia de clínicas, consultórios e escritórios — áudios, textos, marcações no Google Calendar e follow-ups à vontade. Você não precisa se preocupar com um contador de mensagens travando seu atendimento no meio do mês. A política de uso justo apenas previne disparos ilegais de spam em massa não autorizados.",
  },
  {
    question: "Como funciona a contratação e o processo de implantação?",
    answer: "Apresentamos uma demonstração prática focada no segmento do seu negócio para você ver a IA em ação. Em seguida, desenhamos a arquitetura do seu fluxo, calibramos as respostas com o manual da sua empresa e realizamos a conexão direta no seu WhatsApp via QR Code em poucos minutos.",
  },
  {
    question: "Preciso trocar de número de WhatsApp ou contratar chip novo?",
    answer: "Não! A IA conecta diretamente no número comercial que sua clínica ou empresa já utiliza hoje. Basta escanear um QR Code rápido pelo seu próprio WhatsApp no celular, exatamente como você faz no WhatsApp Web. Você não perde nenhum contato, histórico nem conversas anteriores.",
  },
  {
    question: "Quando faz sentido escolher a Operação Scale Pro?",
    answer: "A Operação Essencial já é 100% completa para 1 número de WhatsApp: agenda no Google Calendar, manda lembretes anti-falta, envia Pix, ouve áudios, faz follow-up e transfere para o responsável com resumo pronto da conversa. O Scale Pro faz sentido quando sua empresa cresce e passa a ter múltiplos setores (como separar comercial, financeiro e agendamento) e uma equipe com vários atendentes humanos precisando de distribuição automática de fila.",
  },
  {
    question: "A IA pode inventar dados, falar preços errados ou dar diagnósticos?",
    answer: "De jeito nenhum! A inteligência artificial é calibrada estritamente com o manual de regras, serviços, valores e horários da sua empresa. Ela é expressamente proibida de dar diagnósticos médicos, inventar informações ou prometer descontos fora da tabela. Caso receba uma pergunta imprevista, ela informa com simpatia que vai encaminhar para você e notifica seu número na hora.",
  },
  {
    question: "A IA substitui os meus funcionários?",
    answer: "O objetivo é potencializar a sua equipe, não substituí-la. A IA assume as tarefas repetitivas, como tirar dúvidas de serviços, conferir disponibilidade, marcar horários na agenda e atender à noite e nos finais de semana. Quando surge uma negociação complexa ou uma situação que exige empatia humana, ela passa o contato com o histórico mastigado para seu atendente fechar.",
  },
  {
    question: "Existe período de teste ou demonstração personalizada?",
    answer: "Sim! Antes de qualquer contratação, realizamos uma simulação guiada no WhatsApp para o seu nicho. Você testa o tempo de resposta, o envio de agenda e a audição de áudios em tempo real.",
  },
];

const syncIntegrations = [
  {
    name: "Google Calendar",
    category: "Agendas & Horários",
    desc: "Sincronização em tempo real de dias livres, consultas e reuniões",
    icon: "📅",
    color: "#38bdf8",
  },
  {
    name: "WhatsApp Cloud API",
    category: "Comunicação Oficial",
    desc: "Conexão oficial da Meta sem risco de queda ou banimento",
    icon: "💬",
    color: "#22c55e",
  },
  {
    name: "Mercado Pago & Pix",
    category: "Cobrança Instantânea",
    desc: "Envio de chave Pix Copia e Cola e confirmação de pagamento",
    icon: "💳",
    color: "#009EE3",
  },
  {
    name: "Hotmart & Kiwify",
    category: "Vendas Digitais",
    desc: "Recuperação automática de boletos e suporte pós-venda",
    icon: "🚀",
    color: "#f59e0b",
  },
  {
    name: "Bling & Tiny ERP",
    category: "Gestão & Pedidos",
    desc: "Consulta de estoque, pedidos de clientes e emissão de notas",
    icon: "📦",
    color: "#10b981",
  },
  {
    name: "Asana, Trello & Notion",
    category: "Fluxo de Equipe",
    desc: "Criação de tarefas e resumos automáticos dos atendimentos",
    icon: "📋",
    color: "#6366f1",
  },
  {
    name: "Webhooks & Zapier",
    category: "Automação Universal",
    desc: "Integração aberta com mais de 2.000 sistemas de CRM e gestão",
    icon: "⚡",
    color: "#ec4899",
  },
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
      {/* Header Compacto de Navegação */}
      <header className={`header sync-shared-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="logo" aria-label="Avancini Sync, início">
          <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
          <span>
            <span className="brand-name">AVANCINI <b>SYNC</b></span>
            <small>Equipe Multiagente de IA</small>
          </span>
        </a>
        <div className="sync-header-actions" aria-label="Ações de navegação">
          <Link className="sync-header-btn sync-dash-btn" href="/dash">
            <span className="cta-full-name">Avancini </span>Dash <SyncArrow />
          </Link>
          <Link className="sync-header-btn sync-os-btn" href="/">
            <span className="cta-full-name">Avancini </span>OS <SyncArrow />
          </Link>
          <button className="sync-header-btn sync-menu-btn" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <i className="menu-glyph" aria-hidden="true"><span /><span /><span /></i><b>{menuOpen ? "Fechar" : "Menu"}</b>
          </button>
        </div>
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

      {/* 1. HERO COMPACTO, VIVO & INTERATIVO (CENTRAL DE ATENDIMENTO NO WHATSAPP) */}
      <section className="sync-hero sync-hero-compact" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        
        <div className="sync-hero-copy">
          <div className="sync-hero-badge-row">
            <span className="sync-eyebrow"><i /> ATENDIMENTO IMEDIATO NO WHATSAPP</span>
            <span className="sync-hero-live-pill"><i /> OPERAÇÃO 24/7 · RESPOSTA NA HORA</span>
          </div>

          <h1>Atendimento rápido, simpático e acolhedor.<br /><em>Sua empresa respondendo na hora, 24 horas por dia.</em></h1>
          
          <p>
            Inteligência artificial no WhatsApp que acolhe clientes, ouve áudios, tira dúvidas e marca horários 24h por dia, sem deixar ninguém esperando.
          </p>

          <div className="sync-hero-actions">
            <a href="#retorno">Comparar com funcionário <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("implantar a equipe de IA na minha empresa")}>
              Quero uma demonstração prática <SyncArrow />
            </button>
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
              <span className="cockpit-live-tag">STATUS: ONLINE E PRONTO</span>
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
                <div className="cockpit-body-split">
                  {/* Coluna Esquerda: Especificação Técnica, HUD de Métricas e Pipeline */}
                  <div className="cockpit-agent-spec">
                    <div>
                      <div className="cockpit-agent-header-row">
                        <div>
                          <span className="spec-agent-tag">{currentAgent.name}</span>
                          <h4>{currentAgent.role}</h4>
                        </div>
                        <span className="spec-live-pill">● {currentAgent.status}</span>
                      </div>

                      {/* Live HUD: 3 Métricas Operacionais */}
                      <div className="spec-metrics-hud">
                        {currentAgent.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="spec-metric-box">
                            <small>{m.label}</small>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>

                      {/* Ferramentas Ativas & Conectores */}
                      <div className="spec-tools-wrap">
                        <span className="spec-section-mini-title">FERRAMENTAS &amp; CONECTORES ATIVOS</span>
                        <div className="spec-tools-pills">
                          {currentAgent.tools.map((tool, tIdx) => (
                            <span key={tIdx} className="spec-tool-pill">{tool}</span>
                          ))}
                        </div>
                      </div>

                      {/* Orquestração do Supervisor: Pipeline em Tempo Real */}
                      <div className="spec-pipeline-wrap">
                        <span className="spec-section-mini-title">ORQUESTRAÇÃO DO SUPERVISOR</span>
                        <div className="spec-pipeline-flow">
                          {currentAgent.pipelineSteps.map((p, pIdx) => (
                            <div key={pIdx} className="spec-pipe-step">
                              <span className="step-num">{p.step}</span>
                              <div className="step-content">
                                <strong>{p.name}</strong>
                                <small>{p.desc}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="cockpit-supervisor-handoff-note">
                      <span>🛡️ <strong>Atendimento Humanizado:</strong> A IA conversa de forma educada e natural. Se o cliente precisar falar com você ou com sua equipe, ela transfere a conversa na hora com o resumo pronto.</span>
                    </div>
                  </div>

                  {/* Coluna Direita: Simulador de WhatsApp Business Real e Multimodal */}
                  <div className="cockpit-chat-terminal">
                    <div className="chat-terminal-bar">
                      <div className="chat-avatar-sync">
                        <span className="sync-ai-icon">A</span>
                        <span className="chat-status-online" />
                      </div>
                      <div className="chat-terminal-info">
                        <strong>WhatsApp da Sua Empresa // Conectado</strong>
                        <small>IA responde com atenção e linguagem natural</small>
                      </div>
                      <span className="chat-speed-tag">Resposta Imediata</span>
                    </div>

                    <div className="chat-messages-scroll">
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

                          <div className="chat-bubble ai">
                            <div className="bubble-ai-meta">
                              <span className="bubble-author">{currentAgent.name}</span>
                              <span className="ai-verified-badge">Atendente Virtual</span>
                            </div>
                            <p>{currentAgent.chat.aiResponse}</p>

                            {currentAgent.chat.crmBadge && (
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
                            <time>14:32 · Lido ✓✓</time>
                          </div>
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

                          <div className="chat-bubble ai">
                            <div className="bubble-ai-meta">
                              <span className="bubble-author">{currentAgent.name}</span>
                              <span className="ai-verified-badge">Especialista</span>
                            </div>
                            <p>{currentAgent.chat.aiResponse}</p>

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
                            <time>14:33 · Lido ✓✓</time>
                          </div>
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

                          <div className="chat-bubble ai">
                            <div className="bubble-ai-meta">
                              <span className="bubble-author">{currentAgent.name}</span>
                              <span className="ai-verified-badge">Especialista</span>
                            </div>
                            <p>{currentAgent.chat.aiResponse}</p>

                            {currentAgent.chat.pixCard && (
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
                            <time>14:33 · Lido ✓✓</time>
                          </div>
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

                          <div className="chat-bubble ai">
                            <div className="bubble-ai-meta">
                              <span className="bubble-author">{currentAgent.name}</span>
                              <span className="ai-verified-badge">Especialista</span>
                            </div>
                            <p>{currentAgent.chat.aiFollowupText}</p>
                            <time>16:50 · Lido ✓✓</time>
                          </div>

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

      {/* 1.5 FAIXA DE INTEGRAÇÕES E ECOSSISTEMA COMPATÍVEL */}
      <section className="sync-integrations-section" id="integracoes" aria-labelledby="integrations-title">
        <div className="sync-integrations-container">
          <header className="integrations-header">
            <span className="integrations-kicker">ECOSSISTEMA CONECTADO</span>
            <h2 id="integrations-title">Integrado às ferramentas que você já usa no dia a dia</h2>
            <p>
              A IA da Avancini Sync não trabalha isolada: ela sincroniza com sua agenda, consulta sistemas de gestão e envia avisos em tempo real para sua equipe.
            </p>
          </header>

          <div className="integrations-grid">
            {syncIntegrations.map((tool, idx) => (
              <div className="integration-card" key={idx}>
                <div className="integration-icon-wrap" style={{ borderColor: `${tool.color}33`, background: `${tool.color}15` }}>
                  <span className="integration-emoji">{tool.icon}</span>
                </div>
                <div className="integration-texts">
                  <span className="integration-cat">{tool.category}</span>
                  <strong>{tool.name}</strong>
                  <p>{tool.desc}</p>
                </div>
                <span className="integration-status-dot" style={{ backgroundColor: tool.color }} />
              </div>
            ))}
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
            <span>01 / A FORÇA DE TRABALHO DIGITAL</span>
            <h2 id="sync-journey-title">Muito além de um robô.<br />Uma equipe que atende, agenda e vende.</h2>
          </div>
          <p>Agentes especializados para acolher leads, marcar horários e tirar dúvidas 24 horas por dia.</p>
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

      {/* 3. COMPARATIVO FINANCEIRO & EFICIÊNCIA OPERACIONAL */}
      <section className="sync-commercial-section sync-cost-comparison" id="retorno" aria-labelledby="sync-cost-title">
        <header className="sync-section-heading">
          <div>
            <span>02 / EFICIÊNCIA OPERACIONAL &amp; RESULTADOS</span>
            <h2 id="sync-cost-title" className="roi-balanced-title">
              Quanto a sua empresa ganha <br />
              <em>quando nenhum cliente fica sem resposta no WhatsApp?</em>
            </h2>
          </div>
          <p>Simule a receita recuperada fora do expediente e compare com o custo de uma operação humana tradicional.</p>
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
                  <strong className="text-danger">-{missedWeekendLeads} clientes / mês</strong>
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

            {/* Prova Social e Depoimento Real */}
            <div className="roi-social-proof-strip">
              <div className="proof-stars">★★★★★</div>
              <p>&ldquo;No primeiro sábado à noite a IA atendeu e agendou 2 procedimentos particulares fora do horário. Recuperamos clientes que certamente teriam procurado outro profissional se tivessem que esperar até segunda-feira.&rdquo;</p>
              <small>— Dr. Fernando M., Diretor Clínico</small>
            </div>

            <button
              type="button"
              className="sync-roi-cta"
              onClick={() => openLead(`Quero parar de perder clientes fora do horário. Meu ticket é de R$ ${clientTicket} e quero estruturar o atendimento da Avancini Sync.`)}
            >
              ESTRUTURAR ATENDIMENTO 24/7 NA MINHA EMPRESA ↗
            </button>

            <div className="roi-trust-badges">
              <span>👥 <b>+84.000</b> conversas analisadas</span>
              <span>🛡️ <b>Setup com especialista</b></span>
              <span>⚡ <b>Sem fidelidade forçada</b></span>
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

      {/* 5. FORMATOS DE IMPLANTAÇÃO SOB MEDIDA */}
      {/* 5. FORMATOS DE IMPLANTAÇÃO SOB MEDIDA — ALTO IMPACTO & VISUAL CLEAN */}
      <section className="sync-commercial-section" id="planos" aria-labelledby="sync-plans-title">
        <header className="sync-section-heading">
          <div>
            <span>04 / FORMATOS DE IMPLANTAÇÃO SOB MEDIDA</span>
            <h2 id="sync-plans-title">Não vendemos pacotes engessados.<br />A IA é calibrada para a realidade da sua empresa.</h2>
          </div>
          <p>Sem tabelas genéricas ou limites que travam seu atendimento. Você testa a inteligência no seu segmento e vê o retorno antes de contratar.</p>
        </header>

        {/* 1. Dock de Garantia e Engenharia Dedicada */}
        <div className="value-assurance-dock">
          <div className="assurance-radar-pill">
            <span className="dock-radar-dot" />
            <span>IMPLANTAÇÃO CHAVE NA MÃO · SEM PACOTES ENGESSADOS</span>
          </div>
          <p className="assurance-headline">
            Não entregamos robô cru. Mapeamos as regras da sua clínica ou negócio, calibramos as respostas com o seu tom de voz e conectamos no seu WhatsApp via QR Code em minutos.
          </p>
          <div className="assurance-perks-row">
            <div className="perk-chip">
              <span className="perk-icon">⚡</span>
              <span>Conexão Imediata via QR Code</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">🛡️</span>
              <span>Zero Risco: Teste no seu WhatsApp</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">📅</span>
              <span>Google Agenda em Tempo Real</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">🤝</span>
              <span>Calibração Guiada por Especialista</span>
            </div>
          </div>
        </div>

        {/* 2. Grid com os 3 Modelos de Atendimento (Chatbot, IA Essencial e Scale Pro) */}
        <div className="plans-showcase-grid-compact">
          {simplifiedPlans.map((plan) => {
            const isFeatured = plan.featured;
            return (
              <article
                className={`plan-compact-card ${isFeatured ? "featured" : ""}`}
                key={plan.id}
              >
                {isFeatured && <span className="plan-compact-badge">{plan.badge || "MAIS ESCOLHIDO"}</span>}

                <span className="plan-compact-kicker">{plan.kicker}</span>
                <h3 className="plan-compact-title">{plan.name}</h3>
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

                {/* Botão Magnético de Alta Conversão */}
                <button
                  type="button"
                  className="plan-compact-btn btn-sync-glow"
                  onClick={() => openLead(`Olá! Gostaria de testar uma demonstração gratuita do ${plan.name} no meu WhatsApp.`)}
                >
                  <span>{plan.ctaText}</span>
                  <SyncArrow size={14} />
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

      {/* 5.1 ARGUMENTO & RETORNO IMEDIATO — A CONSULTA PERDIDA */}
      <section className="sync-commercial-section sync-argument-section" aria-label="Retorno sobre o investimento">
        <div className="sync-argument-box">
          <span className="sync-argument-badge">O CÁLCULO QUE REALMENTE IMPORTA</span>
          <div className="sync-argument-quote-deco" aria-hidden="true">“</div>
          <blockquote>
            A mensalidade do robô custa menos do que uma consulta ou venda perdida porque o WhatsApp demorou duas horas para responder num sábado à noite.
          </blockquote>
          <p className="sync-argument-desc">
            É esse o cálculo que importa — não quantas mensagens sobraram no fim do mês. Enquanto seu concorrente ainda está sem responder no domingo, o seu cliente já está com o horário agendado e confirmado na sua grade.
          </p>
          <div className="sync-argument-proof-row">
            <div className="argument-proof-pill">
              <strong>24h</strong>
              <span>Atendimento ativo fora do expediente</span>
            </div>
            <div className="argument-proof-pill">
              <strong>1 WhatsApp</strong>
              <span>Conecta no seu número atual via QR Code</span>
            </div>
            <div className="argument-proof-pill">
              <strong>Mais Vendas</strong>
              <span>Zero perda de leads na noite e fins de semana</span>
            </div>
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
          <h2>Pronto para automatizar o atendimento da sua empresa 24 horas por dia?</h2>
          <p>Vamos entender a rotina do seu negócio e apresentar uma demonstração funcional com os agentes configurados sob medida para o seu fluxo.</p>
          
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

      {/* Footer Estruturado em 4 Colunas (Padrão Rico e Completo como no Avancini Dash) */}
      <footer className="footer sync-footer-rich">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
              <span>
                <span className="brand-name">
                  AVANCINI <b>SYNC</b>
                </span>
                <small>Equipe Multiagente de IA</small>
              </span>
            </Link>
            <p>Força de trabalho digital autônoma para atendimento, agendamentos, suporte e triagem 24/7 no WhatsApp.</p>
            <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <SyncArrow /></a>
          </div>
          <nav>
            <b>NAVEGAÇÃO</b>
            <a href="#inicio">Início</a>
            <a href="#jornada">Jornada de atendimento</a>
            <a href="#retorno">Custo x Retorno</a>
            <a href="#nichos">Segmentos de atuação</a>
            <a href="#planos">Serviços e planos</a>
            <a href="#duvidas">Perguntas frequentes</a>
            <Link href="/">Avancini OS <SyncArrow /></Link>
            <Link href="/dash">Avancini Dash <SyncArrow /></Link>
          </nav>
          <nav>
            <b>AGENTES &amp; SOLUÇÕES</b>
            <a href="#nichos">Agente Atendimento &amp; Triagem</a>
            <a href="#nichos">Agente de Agendamentos</a>
            <a href="#nichos">Suporte &amp; Operação 24/7</a>
            <a href="#nichos">Follow-up &amp; Reativação</a>
            <Link href="/dash">Websites Avancini Dash <SyncArrow /></Link>
          </nav>
          <div className="footer-contact">
            <b>CONTATO</b>
            <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
            <a href="tel:+5573981019782">(73) 98101-9782</a>
            <button type="button" onClick={() => openLead("solicitar demonstração de IA pelo rodapé")}>
              SOLICITAR DEMONSTRAÇÃO <SyncArrow />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Avancini OS · Todos os direitos reservados</span>
          <nav aria-label="Informações legais"><a href="/privacidade">Privacidade</a><a href="/termos">Termos</a></nav>
          <a href="#inicio">Voltar ao topo ↑</a>
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
