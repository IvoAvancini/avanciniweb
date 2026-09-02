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
      "Compreensão de áudios de clientes (transcrição instantânea)",
      "Envio de respostas em áudio com voz natural humanizada (opcional)",
      "Integração direta com CRM (RD Station, HubSpot, Notion ou Planilhas)",
      "Reativação ativa de leads que pararam de responder (Follow-up inteligente)",
      "Geração de links de pagamento Pix / Cartão dentro da conversa",
      "Regras avançadas anti-alucinação e segurança de dados",
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
    tools: ["Google Calendar", "RD Station CRM", "Qualificador de Ticket"],
    metrics: "Tempo de resposta: 1.2s · Taxa de qualificação: 88%",
    reasoning: "Lead demonstrou interesse em modernização. Agente verificou porte da empresa, extraiu necessidade e marcou reunião de proposta na agenda do consultor.",
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
        text: "Entendi perfeitamente. Nesse volume, um Agente de IA reduz o tempo de resposta para menos de 3 segundos e já qualifica o regime tributário da empresa antes de passar para seu time.\n\nTenho disponibilidade com nosso especialista amanhã às 10h ou às 15h para te mostrar uma demonstração ao vivo. Qual horário fica melhor para você?",
        actionNote: "💡 Ação: Verificou slots livres no Google Calendar do consultor comercial.",
      },
      {
        sender: "client",
        time: "21:45",
        text: "Amanhã às 15h fica ótimo!",
      },
      {
        sender: "agent",
        time: "21:45",
        text: "Perfeito! Reunião confirmada para amanhã (Quarta-feira) às 15:00. 📅\n\nEnviei o convite com o link da chamada para seu e-mail e nosso consultor já recebeu o histórico do seu escritório.",
        actionNote: "✅ Ação: Agendou no Google Calendar e criou oportunidade no CRM.",
      },
    ],
  },
  {
    id: "clinica-saude",
    name: "Agente Clínico & Saúde",
    role: "Triagem & Agendamento Médico",
    segment: "Clínicas Médicas, Odontológicas e Estética",
    tools: ["Agenda Médica", "Protocolos de Triagem", "Instruções Pré-Exame"],
    metrics: "Tempo de resposta: 0.9s · Agendamentos automáticos: 94%",
    reasoning: "Agente acolheu a paciente, esclareceu sobre o procedimento de harmonização, informou valores médios de avaliação e reservou o horário com a Dra. Mariana.",
    messages: [
      {
        sender: "client",
        time: "19:15",
        text: "Oi, gostaria de saber quanto custa a harmonização facial e se vocês têm horário para essa semana.",
      },
      {
        sender: "agent",
        time: "19:15",
        text: "Olá! Seja muito bem-vinda à Clínica Avancini Saúde. ✨\n\nOs procedimentos de harmonização são 100% personalizados após uma avaliação facial detalhada com a Dra. Mariana para analisar a estrutura e os produtos ideais.",
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
        text: "A avaliação dura em média 45 minutos, com mapeamento facial completo e planejamento 3D. 💆‍♀️\n\nTemos um horário especial nesta Quinta-feira às 18h30 com a Dra. Mariana. Gostaria que eu reservasse para você?",
        actionNote: "💡 Ação: Transcreveu o áudio e consultou horários de final de tarde.",
      },
      {
        sender: "client",
        time: "19:18",
        text: "Pode agendar sim, por favor!",
      },
      {
        sender: "agent",
        time: "19:18",
        text: "Excelente! Seu agendamento está confirmado para Quinta-feira às 18h30. Já registrei sua ficha e enviaremos o lembrete de localização no dia. Até breve! ✨",
        actionNote: "✅ Ação: Reserva gravada no sistema da clínica e lembrete programado.",
      },
    ],
  },
  {
    id: "imobiliario",
    name: "Agente Imobiliário",
    role: "Filtro de Imóveis & Agendamento",
    segment: "Imobiliárias, Construtoras e Corretores",
    tools: ["Banco de Imóveis", "Filtro de Bairros", "Agenda de Corretores"],
    metrics: "Tempo de resposta: 1.5s · Envio de portfólio instantâneo",
    reasoning: "Lead procurou apartamento de 3 quartos. Agente filtrou no acervo, enviou opções com fotos e agendou visita com o corretor responsável.",
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
    tools: ["Consulta de Pedidos", "Emissão de 2ª via Pix", "Status de Envio"],
    metrics: "Tempo de resposta: 0.8s · Resolução no 1º contato: 91%",
    reasoning: "Cliente solicitou código de rastreio e 2ª via de fatura. Agente consultou o sistema em tempo real e entregou a solução em 15 segundos.",
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
        text: "Localizei aqui! Seu pedido foi despachado ontem pela transportadora Jadlog.\n\n📦 Código de Rastreio: BR892109482\n🚚 Previsão de entrega: até Sexta-feira (05/09)\n\nVocê pode acompanhar em tempo real pelo link: rastreio.avancini.com/BR892109482. Posso ajudar com mais alguma dúvida?",
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

function AutonomousAgentShowcase({ onLead }: { onLead: (context: string) => void }) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const scenario = agentScenarios[activeScenarioIndex];

  return (
    <section className="sync-agent-showcase" id="demonstracao" aria-labelledby="sync-showcase-title">
      <header className="sync-section-heading">
        <div>
          <span>01 / AGENTES EM AÇÃO</span>
          <h2 id="sync-showcase-title">Veja como o Agente de IA<br />atende como um humano.</h2>
        </div>
        <p>Explore cenários reais de atendimento autônomo. Sem menus de botões — a IA compreende a linguagem do cliente, executa ações e fecha compromissos.</p>
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
        <div className="agent-chat-mockup">
          <div className="agent-chat-header">
            <div className="agent-chat-avatar">
              <AvanciniMark variant="sync" className="agent-avatar-mark" />
              <span className="agent-live-dot" aria-label="Online" />
            </div>
            <div className="agent-chat-info">
              <strong>{scenario.name}</strong>
              <span className="agent-chat-status">
                <i>●</i> Agente IA Ativo · Responde em segundos
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
            <span className="agent-tools-label">⚡ FERRAMENTAS CONECTADAS:</span>
            <div className="agent-tools-tags">
              {scenario.tools.map((tool) => (
                <span key={tool} className="agent-tool-tag">{tool}</span>
              ))}
            </div>
          </footer>
        </div>

        <div className="agent-brain-panel">
          <div className="agent-brain-card">
            <div className="brain-header">
              <span className="brain-tag">🧠 CÉREBRO DO AGENTE DE IA</span>
              <small>{scenario.metrics}</small>
            </div>
            <h3>O que a inteligência artificial fez nesta conversa:</h3>
            <p className="brain-reasoning">{scenario.reasoning}</p>

            <div className="brain-capabilities-list">
              <div className="brain-cap-item">
                <span className="cap-icon">01</span>
                <div>
                  <strong>Compreensão Contextual</strong>
                  <p>Entendeu a real intenção sem exigir que o cliente clique em botões engessados.</p>
                </div>
              </div>
              <div className="brain-cap-item">
                <span className="cap-icon">02</span>
                <div>
                  <strong>Execução Autônoma de Tarefas</strong>
                  <p>Consultou disponibilidade, gravou no sistema e sincronizou com a equipe.</p>
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
    oldChatbot: "Menus rígidos ('digite 1 para vendas, 2 para suporte'). Se o cliente digitar outra coisa, o bot trava e não responde.",
    aiAgent: "Conversação 100% livre e humana por texto e áudio. Entende gírias, perguntas complexas e responde com empatia imediata.",
  },
  {
    topic: "Compreensão de Áudio",
    oldChatbot: "Ignora completamente áudios ou responde com mensagem de erro pedindo para 'digitar apenas texto'.",
    aiAgent: "Ouve áudios longos, transcreve em milissegundos e pode responder em áudio com voz humanizada indistinguível.",
  },
  {
    topic: "Resolução de Problemas",
    oldChatbot: "Repete links genéricos do site e frequentemente deixa o cliente sem resposta.",
    aiAgent: "Executa ações reais: agenda reuniões no Google Calendar, consulta pedidos no sistema e emite links de pagamento.",
  },
  {
    topic: "Qualificação de Vendas (SDR)",
    oldChatbot: "Coleta formulários chatos que o cliente abandona pela metade.",
    aiAgent: "Faz perguntas fluidas em tom de conversa, descobre orçamento, regime ou urgência e entrega o lead pronto para o vendedor.",
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
    answer: "Um chatbot tradicional usa regras estáticas de botões e 'árvores de decisão' (se o cliente não clicar exatamente no botão, ele trava). Um Agente de IA da Avancini utiliza inteligência artificial avançada para raciocinar, interpretar linguagem natural em áudio ou texto, consultar bases de dados em tempo real e executar tarefas reais (como agendar compromissos e atualizar seu CRM).",
  },
  {
    question: "O Agente de IA pode inventar informações (alucinar)?",
    answer: "Não. Nossos Agentes são calibrados com rigorosas camadas de segurança (System Prompts e RAG). Eles respondem estritamente com base nos documentos, manuais e regras da sua empresa. Se um cliente fizer uma pergunta fora do escopo, o Agente informa com educação ou transfere para um humano.",
  },
  {
    question: "Preciso trocar de número de WhatsApp?",
    answer: "Não. É possível conectar o Agente de IA diretamente ao seu número de WhatsApp atual ou configurar um novo número exclusivo para a operação de atendimento e vendas.",
  },
  {
    question: "Como o Agente aprende sobre os meus produtos e serviços?",
    answer: "Nossa equipe realiza um onboarding guiado onde você nos fornece informações sobre seu negócio (PDFs, catálogo, site, regras comerciais, dúvidas frequentes). Nós processamos esses dados, estruturamos a base de conhecimento e calibramos a IA antes de colocar no ar.",
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
            <span>NAVEGAÇÃO <i /> 06 SEÇÕES</span>
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
              ["03", "Comparativo", "Chatbot vs. Agente de IA", "#comparativo"],
              ["04", "Capacidades", "Recursos e superpoderes", "#recursos"],
              ["05", "Planos e preços", "Implantação e acompanhamento", "#planos"],
              ["06", "Dúvidas", "Segurança e funcionamento", "#duvidas"],
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

      {/* Hero Section */}
      <section className="sync-hero" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <AvanciniMark variant="sync" className="sync-hero-mark avancini-a-mark" />
        <div className="sync-hero-copy">
          <span className="sync-eyebrow"><i /> AGENTE DE IA AUTÔNOMO · ATENDIMENTO &amp; VENDAS 24/7</span>
          <h1>Não é um chatbot com menus.<br /><em>É um Agente de IA que pensa, atende e fecha vendas.</em></h1>
          <p>Esqueça menus de &ldquo;digite 1 ou 2&rdquo;. O Agente de IA da Avancini compreende áudios e textos livres, consulta seus dados, qualifica clientes e agenda reuniões no automático — 24 horas por dia.</p>
          <div className="sync-hero-actions">
            <a href="#demonstracao">Explorar Agentes em ação <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("implantar um Agente de IA para automatizar meu atendimento e vendas")}>Quero um Agente de IA na minha empresa <SyncArrow /></button>
          </div>
          <div className="sync-hero-proof">
            <span><b>01</b> 100% Autônomo · Responde em segundos</span>
            <span><b>02</b> Ouve e fala com voz natural humanizada</span>
            <span><b>03</b> Integra com WhatsApp, Agenda e CRM</span>
          </div>
        </div>
      </section>

      {/* Interactive Showcase with Pre-made Real Scenarios */}
      <AutonomousAgentShowcase onLead={openLead} />

      {/* Comparison Section: Old Chatbot vs. Modern AI Agent */}
      <section className="sync-comparison-section" id="comparativo">
        <header className="sync-section-heading">
          <div>
            <span>02 / A EVOLUÇÃO DO ATENDIMENTO</span>
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
            <span>03 / RECURSOS E TECNOLOGIA</span>
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
          <div><span>04 / PLANOS &amp; IMPLANTAÇÃO</span><h2>Invista em produtividade.<br />Sem taxa de criação inicial.</h2></div>
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
          <span>05 / PERGUNTAS FREQUENTES</span>
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
        <h2>Seus concorrentes ainda usam menus lentos.<br />Coloque um Agente de IA trabalhando hoje.</h2>
        <p>Converse com nosso time e veja em poucos minutos como um Agente de IA sob medida pode assumir o atendimento da sua empresa.</p>
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
          <a href="#comparativo">Chatbot vs IA</a>
          <a href="#recursos">Recursos</a>
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
            <header className="lead-modal-header">
              <div className="lead-avatar-wrap">
                <div className="lead-avatar-img">
                  <AvanciniMark variant="sync" className="lead-logo-mark" />
                </div>
                <span className="lead-status-dot" aria-label="Online" />
              </div>
              <div className="lead-header-info">
                <strong className="lead-title">José Avancini - Agentes &amp; IA</strong>
                <div className="lead-status-row">
                  <span className="lead-online-badge">online</span>
                  <span className="lead-response-time"> - responde em minutos</span>
                </div>
              </div>
              <button className="web-lead-close" type="button" onClick={() => setLeadContext("")} aria-label="Fechar">✕</button>
            </header>
            <div className="lead-fields-wrap">
              <div className="lead-input-row">
                <div className="lead-field-name">
                  <span className="field-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </span>
                  <input ref={leadInputRef} required minLength={2} maxLength={60} value={leadName} onChange={(event) => { setLeadName(event.target.value); if (leadError) setLeadError(""); }} placeholder="Seu nome" autoComplete="name" aria-label="Seu nome" aria-invalid={Boolean(leadError)} aria-describedby={leadError ? "sync-lead-name-error" : undefined} />
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
                        {filteredCountries.map((c) => (
                          <button
                            type="button"
                            key={c.code}
                            className={`lead-ddi-option ${selectedCountry.code === c.code ? "active" : ""}`}
                            onClick={() => {
                              setSelectedCountry(c);
                              setDdiDropdownOpen(false);
                              setDdiSearch("");
                            }}
                          >
                            <CountryFlagIcon code={c.code} />
                            <span className="country-name">{c.name}</span>
                            <span className="country-ddi-code">{c.ddi}</span>
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
            {leadError && <p className="lead-error" id="sync-lead-name-error" role="alert">{leadError}</p>}
            <button className="lead-submit" type="submit" disabled={leadSubmitting}>
              {leadSubmitting ? "CONECTANDO..." : "INICIAR CONVERSA"}
            </button>
            <p className="lead-footer-note">
              Você será direcionado pro WhatsApp com a mensagem pronta.
            </p>
          </form>
        </div>
      )}
    </main>
  );
}
