"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

const WHATSAPP_NUMBER = "5573981019782";

const whatsappFor = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

type SolutionId = "chatbot" | "ia" | "automacao";

const solutions = {
  chatbot: {
    platform: "whatsapp",
    index: "01",
    label: "CHATBOT",
    title: "Organiza, coleta e direciona.",
    description:
      "Um fluxo claro para responder perguntas repetidas, apresentar opções, captar dados e encaminhar cada pessoa para o próximo passo.",
    ideal: "Para empresas que repetem as mesmas respostas todos os dias.",
    promise: "Pare de responder a mesma pergunta pela décima vez.",
    result: "Contato organizado e pronto para sua equipe continuar.",
    steps: ["Responde o que é recorrente", "Coleta as informações certas", "Encaminha para o próximo passo"],
    benefits: ["Respostas e menus personalizados", "Captação e triagem de contatos", "Transferência para atendimento humano"],
    messages: [
      { side: "client", text: "Olá! Quero conhecer os serviços." },
      { side: "agent", text: "Claro. Você quer solicitar um orçamento, tirar uma dúvida ou falar com uma pessoa?" },
      { side: "client", text: "Solicitar orçamento." },
      { side: "agent", text: "Perfeito. Qual serviço você procura? Vou organizar as informações para o atendimento." },
    ],
    events: ["Interesse identificado", "Dados solicitados", "Contato encaminhado"],
  },
  ia: {
    platform: "instagram",
    index: "02",
    label: "ATENDENTE COM IA",
    title: "Entende a pergunta e responde com contexto.",
    description:
      "Uma IA preparada com as informações da empresa para conversar em linguagem natural, explicar serviços e qualificar oportunidades.",
    ideal: "Para quem precisa responder melhor sem depender de menus rígidos.",
    promise: "Cada pessoa pergunta de um jeito. A IA entende mesmo assim.",
    result: "Conversa contextualizada e oportunidade qualificada.",
    steps: ["Entende a intenção", "Consulta o contexto da empresa", "Responde ou chama uma pessoa"],
    benefits: ["Base de conhecimento da empresa", "Respostas contextualizadas", "Qualificação e transbordo humano"],
    messages: [
      { side: "client", text: "Preciso de uma solução, mas ainda não sei qual combina comigo." },
      { side: "agent", text: "Posso ajudar. Me conte qual resultado você busca e o que já tentou até agora." },
      { side: "client", text: "Quero atender mais rápido sem perder o jeito da empresa." },
      { side: "agent", text: "Nesse caso, um atendente com IA pode assumir dúvidas iniciais e chamar sua equipe quando a conversa exigir uma pessoa." },
    ],
    events: ["Intenção compreendida", "Contexto consultado", "Próximo passo sugerido"],
  },
  automacao: {
    platform: "email",
    index: "03",
    label: "AUTOMAÇÃO",
    title: "Executa o trabalho depois da conversa.",
    description:
      "Fluxos que registram contatos, criam lembretes, atualizam planilhas, notificam a equipe e conectam as ferramentas que a empresa já utiliza.",
    ideal: "Para processos manuais que consomem tempo e deixam contatos esfriarem.",
    promise: "A conversa termina. O trabalho não precisa parar.",
    result: "Tarefa executada, registrada e acompanhada automaticamente.",
    steps: ["Recebe o gatilho", "Atualiza a ferramenta certa", "Avisa quem precisa agir"],
    benefits: ["Gatilhos e tarefas automáticas", "Integração entre ferramentas", "Monitoramento do fluxo"],
    messages: [
      { side: "client", text: "Quero agendar para quinta às 15h." },
      { side: "agent", text: "Agendamento confirmado. Você receberá um lembrete antes do horário." },
      { side: "system", text: "Contato registrado → agenda atualizada" },
      { side: "system", text: "Lembrete programado → equipe notificada" },
    ],
    events: ["Registro criado", "Agenda atualizada", "Lembrete programado"],
  },
} as const;

const faqs = [
  {
    question: "Chatbot e atendente com IA são a mesma coisa?",
    answer: "Não. O chatbot segue fluxos e opções definidas. A IA entende perguntas livres, consulta o contexto da empresa e formula respostas. Os dois podem ser contratados separadamente.",
  },
  {
    question: "Preciso contratar as três soluções?",
    answer: "Não. O Sync foi organizado para resolver um gargalo por vez. Você pode começar somente pelo chatbot, pela IA ou por uma automação específica.",
  },
  {
    question: "Existe taxa de implementação?",
    answer: "Não na condição de lançamento apresentada nesta página. A configuração inicial do escopo contratado já faz parte da mensalidade, com permanência mínima de 6 meses.",
  },
  {
    question: "Existe permanência mínima?",
    answer: "Sim. Os valores de lançamento sem taxa de implementação consideram permanência mínima de 6 meses. Assim, a configuração inicial entra na mensalidade sem reduzir a qualidade da entrega.",
  },
  {
    question: "A IA substitui completamente uma pessoa?",
    answer: "Não é essa a proposta. Ela assume perguntas e etapas repetitivas e encaminha para uma pessoa quando a conversa exige decisão, negociação ou cuidado humano.",
  },
  {
    question: "Posso usar meu número atual do WhatsApp?",
    answer: "A possibilidade depende da estrutura atual do número e da solução escolhida. Isso é verificado antes da contratação para evitar qualquer mudança inesperada.",
  },
  {
    question: "Existem custos de mensagens ou ferramentas externas?",
    answer: "Alguns canais e ferramentas cobram conforme utilização. Quando isso for necessário, os custos e limites são apresentados antes da ativação — sem surpresa depois.",
  },
] as const;

const plans = [
  {
    id: "chatbot",
    label: "ORGANIZAR O ATENDIMENTO",
    name: "Chatbot Start",
    price: "R$ 197,90",
    suffix: "/mês",
    description: "Para responder perguntas recorrentes, captar informações e encaminhar cada contato pelo caminho certo.",
    fit: "Para quem perde tempo repetindo respostas e organizando contatos manualmente.",
    items: ["Um canal principal", "Um fluxo principal personalizado", "Captação e triagem", "Transferência para pessoa", "Monitoramento + 1 ajuste mensal"],
    featured: false,
  },
  {
    id: "ia",
    label: "RESPONDER COM CONTEXTO",
    name: "Atendente IA",
    price: "A partir de R$ 397,90",
    suffix: "/mês",
    description: "Para conversar em linguagem natural usando as informações, o tom e os limites definidos pela empresa.",
    fit: "Para quem precisa atender perguntas variadas sem transformar tudo em menu e botão.",
    items: ["Um canal principal", "Base inicial da empresa", "Respostas contextualizadas", "Qualificação e transbordo humano", "Franquia inicial + 1 ajuste mensal"],
    featured: true,
  },
  {
    id: "automacao",
    label: "EXECUTAR TAREFAS",
    name: "Automação Flow",
    price: "A partir de R$ 249,90",
    suffix: "/mês",
    description: "Para manter um processo repetitivo funcionando, monitorado e conectado às ferramentas do negócio.",
    fit: "Para quem ainda copia dados, cria lembretes ou avisa a equipe manualmente.",
    items: ["Um fluxo principal gerenciado", "Até 2 ferramentas conectadas", "Gatilhos e ações automáticas", "Alertas de falha", "Acompanhamento + 1 ajuste mensal"],
    featured: false,
  },
] as const;

function SolutionDemo({ solution, onLead }: { solution: (typeof solutions)[SolutionId]; onLead: () => void }) {
  return (
    <div className="sync-solution-demo" aria-live="polite">
      <div className="sync-demo-bar"><span><i /> SOLUÇÃO EM FOCO</span><small>{solution.label} · CONTRATAÇÃO INDEPENDENTE</small></div>
      <div className="sync-demo-copy"><span>{solution.index} / O QUE MUDA</span><h3>{solution.promise}</h3><p>{solution.description}</p></div>
      <div className="sync-offer-engine">
        <div className="sync-offer-route" aria-label="Etapas executadas pela solução">
          {solution.steps.map((step, index) => <article key={step}><small>0{index + 1}</small><i /><strong>{step}</strong><span>{index === 0 ? "ENTRADA" : index === 1 ? "INTELIGÊNCIA" : "AÇÃO"}</span></article>)}
        </div>
        <aside><small>RESULTADO PARA A EMPRESA</small><strong>{solution.result}</strong><span><i /> fluxo acompanhado pela Avancini Sync</span></aside>
      </div>
      <div className="sync-offer-footer"><div>{solution.benefits.map((benefit) => <span key={benefit}>✓ {benefit}</span>)}</div><button type="button" onClick={onLead}>Quero resolver esse gargalo <b>↗</b></button></div>
    </div>
  );
}

const formatSyncMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

const formatSyncQuantity = (value: number) =>
  value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

type SyncBottleneck = "repeticao" | "resposta" | "tarefas";

const syncRecommendations: Record<SyncBottleneck, { planId: SolutionId; reason: string }> = {
  repeticao: { planId: "chatbot", reason: "Organiza perguntas recorrentes, coleta os dados certos e entrega o contato pronto para continuar." },
  resposta: { planId: "ia", reason: "Entende perguntas livres, responde com o contexto da empresa e qualifica a oportunidade enquanto ela está quente." },
  tarefas: { planId: "automacao", reason: "Executa o próximo passo, atualiza ferramentas e avisa a equipe sem depender de memória ou trabalho manual." },
};

function SyncLossSimulator({ onLead }: { onLead: (context: string) => void }) {
  const [monthlyMessages, setMonthlyMessages] = useState(160);
  const [lateContacts, setLateContacts] = useState(24);
  const [salesPerTen, setSalesPerTen] = useState(2);
  const [averageTicket, setAverageTicket] = useState(500);
  const [bottleneck, setBottleneck] = useState<SyncBottleneck>("resposta");

  const exposedContacts = Math.min(monthlyMessages, lateContacts);
  const exposedSales = exposedContacts * (salesPerTen / 10);
  const revenueAtRisk = Math.round(exposedSales * averageTicket);
  const recoverableContacts = Math.round(exposedContacts * 0.5);
  const recoverableSales = Number((exposedSales * 0.5).toFixed(1));
  const protectedPotential = Math.round(revenueAtRisk * 0.5);
  const recommendation = syncRecommendations[bottleneck];
  const recommendedPlan = plans.find((plan) => plan.id === recommendation.planId)!;

  return (
    <section className="sync-loss" aria-labelledby="sync-loss-title">
      <header>
        <div><span>SIMULAÇÃO DE OPORTUNIDADES EM RISCO</span><h2 id="sync-loss-title">Seu concorrente não precisa ser melhor.<br /><em>Ele só precisa responder antes.</em></h2></div>
        <p>Use sua realidade para visualizar quanto a demora, a falta de acompanhamento e as tarefas esquecidas podem representar no fim do mês.</p>
      </header>
      <div className="sync-loss-console">
        <div className="sync-loss-inputs">
          <div className="sync-loss-live"><i /> CENÁRIO EDITÁVEL <small>SEM MÉDIA GENÉRICA DE MERCADO</small></div>
          <fieldset className="sync-loss-choice">
            <legend>Onde sua operação trava mais hoje?</legend>
            <div>
              <button className={bottleneck === "repeticao" ? "active" : ""} type="button" onClick={() => setBottleneck("repeticao")}><span>01</span>Repete respostas</button>
              <button className={bottleneck === "resposta" ? "active" : ""} type="button" onClick={() => setBottleneck("resposta")}><span>02</span>Demora para responder</button>
              <button className={bottleneck === "tarefas" ? "active" : ""} type="button" onClick={() => setBottleneck("tarefas")}><span>03</span>Esquece o próximo passo</button>
            </div>
          </fieldset>
          <label><span><b>Mensagens e contatos por mês</b><small>todos os canais</small></span><output>{monthlyMessages}</output><input type="range" min="30" max="2000" step="10" value={monthlyMessages} onChange={(event) => { const value = Number(event.target.value); setMonthlyMessages(value); setLateContacts((current) => Math.min(current, value)); }} /></label>
          <label><span><b>Quantos esperam demais ou ficam sem retorno?</b><small>use uma quantidade que você reconhece</small></span><output>{exposedContacts}</output><input type="range" min="1" max={monthlyMessages} step="1" value={lateContacts} onChange={(event) => setLateContacts(Number(event.target.value))} /></label>
          <label><span><b>Em cada 10 bons contatos, quantos viram clientes?</b><small>pense no seu atendimento atual</small></span><output>{salesPerTen} em 10</output><input type="range" min="1" max="6" step="1" value={salesPerTen} onChange={(event) => setSalesPerTen(Number(event.target.value))} /></label>
          <label><span><b>Valor médio de cada venda</b><small>ticket médio</small></span><output>{formatSyncMoney(averageTicket)}</output><input type="range" min="50" max="10000" step="50" value={averageTicket} onChange={(event) => setAverageTicket(Number(event.target.value))} /></label>
        </div>
        <div className="sync-loss-result" aria-live="polite">
          <div className="sync-loss-status"><span><i /> VAZAMENTO DETECTADO</span><small>SYNC:// DIAGNÓSTICO · AO VIVO</small></div>
          <div className="sync-loss-risk"><small>VALOR DAS OPORTUNIDADES EXPOSTAS</small><strong>{formatSyncMoney(revenueAtRisk)}<em>/mês</em></strong><p>Você informou <b>{exposedContacts} conversas com demora</b>. Se <b>{salesPerTen} em cada 10</b> bons contatos costumam virar clientes, cerca de <b>{formatSyncQuantity(exposedSales)} vendas potenciais</b> passam por uma etapa vulnerável.</p></div>
          <div className="sync-loss-route"><span>Cliente demonstrou interesse</span><i>→</i><span>Resposta ou retorno demorou</span><i>→</i><span>Outra empresa respondeu primeiro</span></div>
          <div className="sync-loss-protected"><div><small>SE METADE DAS CONVERSAS FOR RECUPERADA</small><strong>{formatSyncMoney(protectedPotential)}<em>/mês protegidos</em></strong></div><span>{recoverableContacts} conversas retomadas<br /><b>{formatSyncQuantity(recoverableSales)} vendas potenciais</b></span></div>
          <div className="sync-loss-recommendation">
            <div><small>MELHOR PRIMEIRO PASSO PARA ESTE CENÁRIO</small><strong>{recommendedPlan.name}</strong><p>{recommendation.reason}</p></div>
            <span><b>Escopo definido</b>após entender sua operação</span>
          </div>
          <button type="button" onClick={() => onLead(`${recommendedPlan.name} como primeiro passo. Na simulação, considerei ${monthlyMessages} contatos por mês, ${exposedContacts} conversas com demora ou sem retorno, ${salesPerTen} clientes a cada 10 bons contatos e ticket médio de ${formatSyncMoney(averageTicket)}`)}>Quero começar por esta recomendação <b>↗</b></button>
        </div>
      </div>
      <small className="sync-loss-disclaimer">Simulação educativa baseada somente nas quantidades escolhidas por você — sem usar uma média genérica de mercado. Não representa promessa de faturamento.</small>
    </section>
  );
}


function InteractiveAiChatDemo() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { side: "user", text: "Olá! Gostaria de agendar uma consulta para amanhã." },
    { side: "ai", text: "Olá! Com certeza. Temos horários disponíveis amanhã às 10h30 e às 15h00. Qual especialidade ou tratamento você busca?" }
  ]);

  const scenarios = [
    {
      title: "Clínica / Saúde",
      user: "Olá! Gostaria de agendar uma consulta para amanhã.",
      ai: "Olá! Com certeza. Temos horários disponíveis amanhã às 10h30 e às 15h00. Qual especialidade ou tratamento você busca?"
    },
    {
      title: "Loja de Carros",
      user: "Vocês têm a BMW 320i em estoque e aceitam carro na troca?",
      ai: "Temos sim! A BMW 320i M Sport 2024 branca está disponível no showroom. Aceitamos seu seminovo com avaliação justa na hora. Quer simular a entrada agora?"
    },
    {
      title: "Estética Avançada",
      user: "Qual o valor do protocolo de bioestimulador de colágeno?",
      ai: "O valor varia conforme a área e número de ampolas. Realizamos uma avaliação facial 3D prévia para definir o plano ideal. Deseja agendar sua avaliação?"
    },
    {
      title: "Advocacia / Jurídico",
      user: "Preciso de uma orientação confidencial sobre revisão de contrato empresarial.",
      ai: "Perfeito. Nossos sócios atendem sob sigilo ético absoluto. Vou colher os dados básicos e direcionar para uma videoconferência com o advogado especialista."
    }
  ];

  const handleSelectScenario = (index: number) => {
    setCurrentScenario(index);
    setIsTyping(true);
    const sc = scenarios[index];
    setChatHistory([{ side: "user", text: sc.user }]);
    setTimeout(() => {
      setChatHistory([
        { side: "user", text: sc.user },
        { side: "ai", text: sc.ai }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSendCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const text = customMsg;
    setCustomMsg("");
    setChatHistory(prev => [...prev, { side: "user", text }]);
    setIsTyping(true);
    const lowerText = text.toLocaleLowerCase("pt-BR");
    const contextualAnswer = lowerText.includes("preço") || lowerText.includes("valor")
      ? "Posso te orientar sobre valores. Para indicar a opção certa, me diga qual serviço você procura e quando gostaria de começar."
      : lowerText.includes("horário") || lowerText.includes("agenda") || lowerText.includes("agendar")
        ? "Vamos encontrar um horário. Qual dia e período você prefere? Depois confirmo as opções disponíveis e organizo o agendamento."
        : lowerText.includes("carro") || lowerText.includes("veículo")
          ? "Claro. Me conte o modelo que procura, a faixa de investimento e se possui veículo para troca. Assim eu filtro as opções certas para você."
          : "Entendi. Para conduzir você ao próximo passo sem resposta genérica, me conte qual resultado busca e o que já tentou até agora.";
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          side: "ai",
          text: contextualAnswer
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <section className="sync-interactive-ai-section" id="portfolio">
      <div className="section-heading" style={{ margin: "0 auto 40px", maxWidth: "1240px" }}>
        <div>
          <span className="section-index">SIMULADOR AO VIVO · TESTE AGORA</span>
          <h2>Teste uma conversa.<br />Veja o próximo passo nascer.</h2>
        </div>
        <p>Clique em um dos cenários abaixo ou digite sua pergunta para ver como a IA da Avancini Sync entende o contexto e conduz o cliente ao fechamento.</p>
      </div>

      <div className="sync-ai-sim-grid">
        <div className="sync-ai-sim-copy">
          <span className="badge"><i /> INTELIGÊNCIA ARTIFICIAL CONVERSACIONAL</span>
          <h3>Zero respostas robóticas.<br />Linguagem natural 24/7.</h3>
          <p>O robô não apenas envia menus travados: ele lê o contexto, consulta a base de conhecimento do seu negócio e responde de forma humana e persuasiva.</p>
          <div className="sync-ai-sim-triggers">
            {scenarios.map((sc, idx) => (
              <button
                type="button"
                key={sc.title}
                className={currentScenario === idx ? "active" : ""}
                onClick={() => handleSelectScenario(idx)}
              >
                <span>{sc.title}: “{sc.user.slice(0, 38)}...”</span>
                <b>Testar ↗</b>
              </button>
            ))}
          </div>
        </div>

        <div className="sync-wa-phone">
          <div className="sync-wa-phone-top">
            <div className="sync-wa-avatar">AI</div>
            <div className="sync-wa-meta">
              <strong>Atendente Inteligente · Avancini Sync</strong>
              <small><i /> Ativo agora · Resposta instantânea</small>
            </div>
          </div>
          <div className="sync-wa-chat-body">
            {chatHistory.map((m, i) => (
              <div key={i} className={m.side === "user" ? "sync-msg sync-msg-user" : "sync-msg sync-msg-ai"}>
                {m.side === "ai" && <strong>Avancini Sync IA</strong>}
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="sync-typing-indicator">
                <span /><span /><span />
              </div>
            )}
          </div>
          <form className="sync-wa-footer" onSubmit={handleSendCustom}>
            <input
              type="text"
              placeholder="Digite uma pergunta de teste..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
            />
            <button type="submit" aria-label="Enviar mensagem de teste">➤</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSolution, setActiveSolution] = useState<SolutionId>("ia");
  const [leadContext, setLeadContext] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadError, setLeadError] = useState("");
  const leadInputRef = useRef<HTMLInputElement>(null);

  const solution = solutions[activeSolution];
  const normalizedLeadContext = leadContext.trim().replace(/[.!?]+$/, "");

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
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
    setLeadError("");
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = leadName.trim();
    if (name.length < 2) {
      setLeadError("Digite seu nome para continuar.");
      return;
    }
    const message = `Olá! Meu nome é ${name}. Conheci a Avancini Sync e quero conversar sobre ${normalizedLeadContext}.`;
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
    setLeadContext("");
  };

  return (
    <main className="sync-page">
      <header className={`sync-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="sync-brand" aria-label="Avancini Sync, início">
          <span className="sync-brand-mark avancini-a-mark" aria-hidden="true"><i /></span>
          <span><b>AVANCINI <em>SYNC</em></b><small>Uma solução Avancini OS</small></span>
        </a>
        <div className="sync-network-links" aria-label="Ecossistema Avancini"><Link href="/dash">Avancini Dash ↗</Link><Link href="/">Avancini OS ↗</Link></div>
        <button className="sync-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <i><span /><span /><span /></i><b>{menuOpen ? "Fechar" : "Menu"}</b>
        </button>
      </header>

      {menuOpen && <div className="sync-menu" role="dialog" aria-modal="true" aria-label="Menu principal do Avancini Sync">
        <div className="sync-menu-top"><span>NAVEGAÇÃO <i /> 06 SEÇÕES</span><div><Link href="/" onClick={() => setMenuOpen(false)}>AVANCINI OS ↗</Link><Link href="/dash" onClick={() => setMenuOpen(false)}>AVANCINI DASH ↗</Link></div><button type="button" onClick={() => setMenuOpen(false)}>× <b>FECHAR</b><small>ESC</small></button></div>
        <nav>{[["01","Início","#inicio"],["02","Central ao vivo","#portfolio"],["03","Soluções","#solucoes"],["04","Planos","#planos"],["05","Método","#metodo"],["06","Dúvidas","#duvidas"]].map(([number,label,href]) => <a href={href} key={number} onClick={() => setMenuOpen(false)}><small>{number}</small><span>{label}</span><b>↗</b></a>)}</nav>
        <div className="sync-menu-bottom"><span><i /> ATENDIMENTO QUE RESPONDE E OPERA</span><button type="button" onClick={() => { setMenuOpen(false); openLead("uma solução para melhorar meu atendimento"); }}>FALAR SOBRE MEU ATENDIMENTO ↗</button></div>
      </div>}

      <section className="sync-hero" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="sync-hero-mark avancini-a-mark" aria-hidden="true"><i /></div>
        <div className="sync-hero-copy">
          <span className="sync-eyebrow"><i /> CHATBOT · INTELIGÊNCIA ARTIFICIAL · AUTOMAÇÕES</span>
          <h1>Seu cliente chamou.<br /><em>O Sync responde e faz acontecer.</em></h1>
          <p>Atenda no WhatsApp e Instagram, organize cada oportunidade e automatize o próximo passo — mesmo quando ninguém da equipe está olhando.</p>
          <div className="sync-hero-actions">
            <a href="#portfolio">Ver o Sync funcionando <b>↓</b></a>
            <button type="button" onClick={() => openLead("parar de perder oportunidades por demora ou falta de acompanhamento")}>Quero parar de perder oportunidades <b>↗</b></button>
          </div>
          <div className="sync-hero-proof">
            <span><b>01</b> Responde em segundos</span>
            <span><b>02</b> Pode atender 24 horas</span>
            <span><b>03</b> Chama uma pessoa na hora certa</span>
          </div>
        </div>
      </section>

      <section className="sync-value" aria-labelledby="sync-value-title">
        <div className="sync-value-copy">
          <span>O QUE O SYNC FAZ POR VOCÊ</span>
          <h2 id="sync-value-title">Uma mensagem entra.<br /><em>O próximo passo já sai organizado.</em></h2>
          <p>Em poucos segundos, o Sync entende o contato, registra o que importa e move a oportunidade para a próxima ação.</p>
          <div><b>Menos demora</b><b>Menos trabalho manual</b><b>Mais oportunidades acompanhadas</b></div>
          <button type="button" onClick={() => openLead("entender onde o Sync pode reduzir demora e trabalho manual na minha empresa")}>Quero mapear meu atendimento <b>↗</b></button>
        </div>
        <div className="sync-opportunity" aria-label="Demonstração de uma oportunidade processada pelo Sync">
          <header><span><i /> OPORTUNIDADE EM ANDAMENTO</span><small>14:32:08</small></header>
          <div className="sync-opportunity-message"><small>WHATSAPP · NOVA MENSAGEM</small><strong>“Quero saber o valor e se ainda tem horário esta semana.”</strong><span>recebida agora</span></div>
          <ol>
            <li><i>01</i><div><small>14:32:09</small><strong>Interesse identificado</strong><span>Cliente quer preço e disponibilidade</span></div><b>concluído</b></li>
            <li><i>02</i><div><small>14:32:10</small><strong>Resposta preparada</strong><span>Contexto da empresa consultado</span></div><b>concluído</b></li>
            <li><i>03</i><div><small>14:32:12</small><strong>Próximo passo executado</strong><span>Agenda consultada e equipe avisada</span></div><b>concluído</b></li>
          </ol>
          <footer><span>RESULTADO</span><strong>Conversa atendida. Oportunidade em movimento.</strong><i>12s</i></footer>
        </div>
      </section>

      <InteractiveAiChatDemo />

      <SyncLossSimulator onLead={openLead} />

      <section className="sync-signal" aria-label="Benefícios do Avancini Sync">
        <div><span>◎</span> Resposta mais rápida</div><div><span>◇</span> Atendimento organizado</div><div><span>↗</span> Oportunidade qualificada</div><div><span>⚡</span> Tarefa automatizada</div><div><span>◉</span> Pessoa no momento certo</div>
      </section>

      <section className="sync-solutions" id="solucoes">
        <header className="sync-section-heading">
          <div><span>02 — ESCOLHA PELO GARGALO</span><h2>Três soluções.<br />Nenhuma venda casada.</h2></div>
          <p>Chatbot, IA e automação não são nomes diferentes para a mesma coisa. Cada um resolve uma etapa — e você contrata somente a etapa que precisa melhorar.</p>
        </header>
        <div className="sync-solution-layout">
          <div className="sync-solution-tabs" role="tablist" aria-label="Soluções do Avancini Sync">
            {(Object.keys(solutions) as SolutionId[]).map((id) => {
              const item = solutions[id];
              return (
                <button className={activeSolution === id ? "active" : ""} type="button" role="tab" aria-selected={activeSolution === id} onClick={() => setActiveSolution(id)} key={id}>
                  <span>{item.index}</span><div><small>{item.label}</small><strong>{item.title}</strong><p>{item.ideal}</p></div><b>↗</b>
                </button>
              );
            })}
          </div>
          <SolutionDemo solution={solution} onLead={() => openLead(`${solution.label.toLocaleLowerCase("pt-BR")}: ${solution.promise}`)} />
        </div>
      </section>

      <section className="sync-pricing" id="planos">
        <header className="sync-section-heading">
          <div><span>03 — MENSALIDADES</span><h2>Comece pelo gargalo.<br />Não por um pacote.</h2></div>
          <p>Três pontos de entrada independentes, com configuração incluída e qualidade completa desde o primeiro dia.</p>
        </header>
        <div className="sync-pricing-conditions" aria-label="Condições dos planos Sync">
          <div><small>ENTRADA</small><strong>R$ 0</strong><span>sem taxa de implementação</span></div>
          <div><small>PERMANÊNCIA</small><strong>6 meses</strong><span>condição mínima de lançamento</span></div>
          <div><small>ESCOPO</small><strong>Definido antes</strong><span>canal, fluxo e franquia sem surpresa</span></div>
        </div>
        <div className="sync-plan-grid">
          {plans.map((plan, index) => {
            return (
            <article className={plan.featured ? "featured" : ""} key={plan.id}>
              <div className="sync-plan-top"><span>0{index + 1}</span><small>{plan.label}</small>{plan.featured && <b>MAIS COMPLETO</b>}</div>
              <h3>{plan.name}</h3><strong>{plan.price}<em>{plan.suffix}</em></strong><i>CONDIÇÃO DE LANÇAMENTO · SEM TAXA DE IMPLEMENTAÇÃO</i><p>{plan.description}</p>
              <p className="sync-plan-fit"><b>Faz mais sentido para você se:</b>{plan.fit}</p>
              <small className="sync-plan-includes">O QUE ENTRA</small>
              <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <button type="button" onClick={() => openLead(`${plan.name} por ${plan.price}${plan.suffix}`)}>Quero esta solução <b>↗</b></button>
            </article>
            );
          })}
        </div>
        <div className="sync-pricing-note"><span>NÃO SABE QUAL ESCOLHER?</span><strong>Conte onde sua operação trava. A Avancini identifica o menor começo capaz de gerar resultado — sem empurrar ferramenta ou pacote desnecessário.</strong><button type="button" onClick={() => openLead("um diagnóstico para montar uma solução mensal compatível com minha operação")}>Quero uma recomendação direta <b>↗</b></button></div>
        <p className="sync-usage-note">Condição de lançamento com permanência mínima de 6 meses. Custos de WhatsApp, APIs, ferramentas externas e consumo acima da franquia são apresentados e aprovados antes da ativação. Novos canais, fluxos ou mudanças fora do escopo recebem orçamento separado.</p>
      </section>

      <section className="sync-method" id="metodo">
        <header className="sync-section-heading dark">
          <div><span>04 — COMO COLOCAMOS NO AR</span><h2>Do gargalo ao fluxo funcionando.</h2></div>
          <p>Sem projeto inflado. Primeiro entendemos o que trava, depois colocamos no ar o menor fluxo capaz de resolver.</p>
        </header>
        <div className="sync-method-stack">
          <article><span>01</span><div><small>DIAGNÓSTICO</small><h3>Encontramos o gargalo.</h3><p>Perguntas repetidas, demora, contatos sem retorno ou tarefas manuais: começamos pelo problema que realmente custa tempo.</p></div><b>ENTENDER</b></article>
          <article><span>02</span><div><small>DESENHO DA EXPERIÊNCIA</small><h3>Definimos conversa, limites e próximo passo.</h3><p>O que o Sync responde, o que coleta, quando chama uma pessoa e o que acontece depois de cada decisão.</p></div><b>ORGANIZAR</b></article>
          <article><span>03</span><div><small>CONFIGURAÇÃO</small><h3>Conectamos somente o necessário.</h3><p>Canal, informações da empresa e ferramentas entram no fluxo sem criar uma estrutura maior do que o negócio precisa.</p></div><b>CONECTAR</b></article>
          <article><span>04</span><div><small>ACOMPANHAMENTO</small><h3>O fluxo entra no ar e continua sendo observado.</h3><p>Monitoramos o funcionamento e ajustamos o que precisa ficar mais claro, rápido ou útil ao longo do uso.</p></div><b>EVOLUIR</b></article>
        </div>
      </section>

      <section className="sync-faq" id="duvidas">
        <div><span>05 — PERGUNTAS FREQUENTES</span><h2>Entenda antes<br />de automatizar.</h2><p>Sem promessa mágica e sem empurrar uma estrutura que a empresa não precisa.</p><button type="button" onClick={() => openLead("uma dúvida sobre o Avancini Sync")}>Falar com a Avancini <b>↗</b></button></div>
        <div>{faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="sync-final">
        <div className="sync-final-mark avancini-a-mark" aria-hidden="true"><i /></div>
        <span>AVANCINI SYNC / PRÓXIMO PASSO</span><h2>Seu cliente já está falando.<br />Agora sua operação precisa acompanhar.</h2><p>Conte onde o atendimento trava. A gente identifica se o melhor começo é chatbot, IA ou automação.</p><button type="button" onClick={() => openLead("um diagnóstico para descobrir por onde automatizar")}>Descobrir por onde começar <b>↗</b></button>
      </section>

      <footer className="sync-footer"><Link href="/" className="sync-brand"><span className="sync-brand-mark avancini-a-mark" aria-hidden="true"><i /></span><span><b>AVANCINI <em>SYNC</em></b><small>Uma solução Avancini OS</small></span></Link><p>Chatbots, atendentes com IA e automações construídos conforme a realidade de cada empresa.</p><nav><a href="#portfolio">Central ao vivo</a><a href="#solucoes">Soluções</a><a href="#planos">Planos</a><Link href="/dash">Avancini Dash</Link></nav><div><a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a><a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram ↗</a></div><small>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</small></footer>

      <button className="whatsapp-float sync-whatsapp-float" type="button" aria-label="Conversar sobre o Avancini Sync no WhatsApp" onClick={() => openLead("uma solução do Avancini Sync")}>
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>

      {leadContext && (
        <div className="web-lead-modal sync-web-lead-modal" role="dialog" aria-modal="true" aria-label="Iniciar conversa pelo WhatsApp">
          <form onSubmit={submitLead}>
            <button className="web-lead-close" type="button" onClick={() => setLeadContext("")} aria-label="Fechar">×</button>
            <header>
              <span className="lead-logo avancini-a-mark" aria-hidden="true"><i /></span>
              <div><strong>Avancini Sync <span>· Automação &amp; IA</span></strong><b><i /> atendimento direto · mensagem contextualizada</b></div>
            </header>
            <p className="lead-promise">Quero conversar sobre {normalizedLeadContext}.</p>
            <label className="lead-name-field">
              <span aria-hidden="true">✦</span>
              <input ref={leadInputRef} required minLength={2} maxLength={60} value={leadName} onChange={(event) => { setLeadName(event.target.value); if (leadError) setLeadError(""); }} placeholder="Seu nome" autoComplete="name" aria-label="Seu nome" aria-invalid={Boolean(leadError)} aria-describedby={leadError ? "sync-lead-name-error" : undefined} />
            </label>
            {leadError && <p className="lead-error" id="sync-lead-name-error" role="alert">{leadError}</p>}
            <button className="lead-submit" type="submit">ABRIR CONVERSA NO WHATSAPP</button>
            <small>A mensagem já está organizada e você pode editá-la antes de enviar.</small>
          </form>
        </div>
      )}
    </main>
  );
}
