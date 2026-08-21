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
    price: "R$ 197,90",
    suffix: "/mês",
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
    price: "A partir de R$ 397,90",
    suffix: "/mês",
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
    price: "A partir de R$ 249,90",
    suffix: "/mês",
    messages: [
      { side: "client", text: "Quero agendar para quinta às 15h." },
      { side: "agent", text: "Agendamento confirmado. Você receberá um lembrete antes do horário." },
      { side: "system", text: "Contato registrado → agenda atualizada" },
      { side: "system", text: "Lembrete programado → equipe notificada" },
    ],
    events: ["Registro criado", "Agenda atualizada", "Lembrete programado"],
  },
} as const;

const syncCases = [
  {
    id: "nexo",
    label: "CLÍNICA · ATENDENTE IA",
    business: "Nexo Odonto",
    platform: "instagram" as const,
    headline: "A dúvida certa vira avaliação agendada.",
    solution: "A IA entende o incômodo, explica o primeiro passo e chama a equipe quando já existe intenção real.",
    prompt: "Tenho vergonha do meu sorriso, mas não sei qual tratamento procurar.",
    response: "Posso te orientar. O que mais incomoda hoje: cor, alinhamento ou algum dente específico?",
    result: "Avaliação encaminhada",
    events: ["Intenção compreendida", "Procedimento orientado", "Equipe acionada"],
  },
  {
    id: "vitta",
    label: "IMOBILIÁRIA · QUALIFICAÇÃO",
    business: "Vitta Urban",
    platform: "whatsapp" as const,
    headline: "O corretor recebe um perfil, não uma mensagem solta.",
    solution: "Localização, tipo de imóvel e faixa de investimento chegam organizados antes da conversa comercial.",
    prompt: "Quero um apartamento com varanda e duas vagas.",
    response: "Ótimo. Você prefere imóvel pronto ou lançamento? E qual faixa de investimento deseja manter?",
    result: "Lead qualificado",
    events: ["Perfil coletado", "Faixa identificada", "Corretor notificado"],
  },
  {
    id: "brava",
    label: "LOJA · CHATBOT",
    business: "Brava Store",
    platform: "instagram" as const,
    headline: "Produto encontrado antes do interesse esfriar.",
    solution: "O chatbot apresenta categorias, filtra preferências e conduz o cliente até uma escolha ou uma pessoa.",
    prompt: "Preciso de um presente até R$ 250 para alguém que gosta de corrida.",
    response: "Separei três opções nessa faixa. Você prefere algo para treino, recuperação ou uso no dia a dia?",
    result: "Seleção preparada",
    events: ["Faixa reconhecida", "Categoria filtrada", "Produtos sugeridos"],
  },
  {
    id: "norte",
    label: "CONTABILIDADE · AUTOMAÇÃO",
    business: "Norte Contábil",
    platform: "sheets" as const,
    headline: "Documento recebido. Processo iniciado sozinho.",
    solution: "Anexos são identificados, registrados e encaminhados para a fila certa sem depender de conferência manual.",
    prompt: "Novos documentos fiscais recebidos — Cliente Horizonte",
    response: "Arquivos validados, pasta atualizada e responsável notificado para conferência final.",
    result: "Rotina executada",
    events: ["Anexo identificado", "Registro atualizado", "Responsável avisado"],
  },
  {
    id: "forma",
    label: "ESTÚDIO · RECORRÊNCIA",
    business: "Studio Forma",
    platform: "whatsapp" as const,
    headline: "A ausência vira uma retomada no momento certo.",
    solution: "O fluxo percebe inatividade, prepara uma abordagem coerente e devolve a oportunidade para a equipe.",
    prompt: "Oi! Quero voltar a treinar, mas preciso de um horário depois das 19h.",
    response: "Temos duas turmas disponíveis. Quer conhecer a opção de segunda e quarta ou terça e quinta?",
    result: "Retorno recuperado",
    events: ["Inatividade detectada", "Contato retomado", "Aula sugerida"],
  },
  {
    id: "rota",
    label: "DISTRIBUIÇÃO · OPERAÇÃO",
    business: "Rota Prime",
    platform: "email" as const,
    headline: "Pedido confirmado sem deixar a equipe no escuro.",
    solution: "Venda, estoque e aviso interno trabalham juntos para que cada pedido avance com rastreabilidade.",
    prompt: "Pedido #1847 aprovado pelo financeiro",
    response: "Estoque reservado, separação criada e cliente avisado sobre a previsão de expedição.",
    result: "Pedido em separação",
    events: ["Pagamento aprovado", "Estoque reservado", "Expedição acionada"],
  },
] as const;

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

type PlatformId = "whatsapp" | "instagram" | "email" | "sheets";

const platformNames: Record<PlatformId, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  email: "E-mail",
  sheets: "Planilhas",
};

function PlatformSimulation({
  platform,
  prompt,
  response,
  business = "Avancini Demo",
  compact = false,
}: {
  platform: PlatformId;
  prompt: string;
  response: string;
  business?: string;
  compact?: boolean;
}) {
  if (platform === "instagram") {
    return (
      <div className={`sync-platform sync-instagram ${compact ? "compact" : ""}`}>
        <div className="sync-instagram-top"><b>Instagram</b><span>♡ · ✦</span></div>
        <div className="sync-instagram-user"><i>{business.slice(0, 1)}</i><div><strong>{business.toLowerCase().replaceAll(" ", ".")}</strong><small>Conta profissional · ativo agora</small></div><span>•••</span></div>
        <div className="sync-instagram-day">HOJE, 14:32</div>
        <div className="sync-platform-message received">{prompt}</div>
        <div className="sync-platform-message sent">{response}</div>
        <div className="sync-instagram-actions"><button type="button">Ver opções</button><button type="button">Falar com especialista</button></div>
        <div className="sync-instagram-input">Mensagem... <span>♡ · ➤</span></div>
      </div>
    );
  }

  if (platform === "email") {
    return (
      <div className={`sync-platform sync-email ${compact ? "compact" : ""}`}>
        <div className="sync-email-top"><b><i>M</i> Caixa de entrada</b><span>⌕ · ? · ⚙</span></div>
        <div className="sync-email-layout">
          <aside><strong>＋ Escrever</strong><span>▣ Entrada <b>4</b></span><span>☆ Com estrela</span><span>⌁ Enviados</span></aside>
          <div className="sync-email-thread"><small>Maison Lume &lt;contato@maisonlume.com&gt;</small><h4>{prompt}</h4><p>{response}</p><div><span>✓ Contato registrado</span><span>✓ Retorno programado</span><span>✓ Equipe notificada</span></div><button type="button">Responder</button></div>
        </div>
      </div>
    );
  }

  if (platform === "sheets") {
    const rows = [
      ["Cliente", "Origem", "Status", "Próxima ação"],
      ["Horizonte", "E-mail", "Validado", "Conferência"],
      ["Alameda", "WhatsApp", "Em análise", "Revisar dados"],
      [business, "Sync", "Atualizado", "Equipe avisada"],
    ];
    return (
      <div className={`sync-platform sync-sheets ${compact ? "compact" : ""}`}>
        <div className="sync-sheets-title">
          <i>▦</i><div><strong>Operação e contatos</strong><small>Salvo automaticamente</small></div><button type="button">Compartilhar</button><span>⋮</span>
        </div>
        <div className="sync-sheets-menu"><b>Arquivo</b><b>Editar</b><b>Ver</b><b>Inserir</b><b>Dados</b><b>Ferramentas</b></div>
        <div className="sync-sheets-toolbar"><span>↶</span><span>↷</span><i /><b>100%</b><i /><strong>fx</strong><p>{response}</p></div>
        <div className="sync-sheets-grid">
          <span className="sync-sheet-corner" />
          {['A', 'B', 'C', 'D'].map((column) => <b className="sync-sheet-column" key={column}>{column}</b>)}
          {rows.map((row, rowIndex) => (
            <div className={rowIndex === rows.length - 1 ? "sync-sheet-row fresh" : "sync-sheet-row"} key={row.join("-")}>
              <small>{rowIndex + 1}</small>
              {row.map((cell, cellIndex) => <span className={rowIndex === 0 ? "heading" : cellIndex === 2 ? "status" : ""} key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
        <div className="sync-sheets-tabs"><button type="button">＋</button><b>Leads e rotinas</b><span>▾</span></div>
        <div className="sync-sheets-toast"><i>✓</i><span><b>Nova linha criada pelo Sync</b><small>{prompt}</small></span></div>
      </div>
    );
  }

  return (
    <div className={`sync-platform sync-whatsapp-ui ${compact ? "compact" : ""}`}>
      <div className="sync-whatsapp-top"><span>‹</span><i>{business.slice(0, 1)}</i><div><strong>{business}</strong><small>online</small></div><b>⌕ · ⋮</b></div>
      <div className="sync-whatsapp-wallpaper">
        <small>HOJE</small>
        <div className="sync-platform-message received">{prompt}<em>14:32</em></div>
        <div className="sync-platform-message sent">{response}<em>14:32 ✓✓</em></div>
        <div className="sync-whatsapp-typing"><i /><i /><i /></div>
      </div>
      <div className="sync-whatsapp-input"><span>＋</span><p>Mensagem</p><b>◉</b></div>
    </div>
  );
}

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

type SyncCase = (typeof syncCases)[number];

function SyncPortfolio({ onSelect }: { onSelect: (item: SyncCase) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flowStage, setFlowStage] = useState(0);
  const [flowRun, setFlowRun] = useState(0);
  const item = syncCases[activeIndex];

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setFlowStage(1), 850),
      window.setTimeout(() => setFlowStage(2), 1750),
      window.setTimeout(() => setFlowStage(3), 2800),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeIndex, flowRun]);

  const stageState = (stage: number) =>
    flowStage > stage ? "is-complete" : flowStage === stage ? "is-live" : "is-pending";

  const selectScenario = (index: number) => {
    setFlowStage(0);
    setActiveIndex(index);
    setFlowRun((current) => current + 1);
  };

  return (
    <section className="sync-flow-studio" id="portfolio">
      <header>
        <span>01 — CENTRAL DE OPERAÇÕES · SIMULAÇÃO AO VIVO</span>
        <h2>Veja o que acontece<br /><em>depois que o cliente chama.</em></h2>
        <div><small>SYNC:// FLUXOS REAIS · 06 <i /></small><p>Escolha um cenário. Cada demonstração revela a conversa, a leitura da intenção e a ação executada nos bastidores.</p></div>
      </header>
      <div className="sync-flow-console" aria-live="polite">
        <div className="sync-flow-topbar"><span><i /> SYNC EM OPERAÇÃO</span><b>{item.business.toUpperCase()} · CENÁRIO DEMONSTRATIVO</b><small>{flowStage < 3 ? `PROCESSANDO ETAPA ${flowStage + 1}/3` : "FLUXO CONCLUÍDO"}</small></div>
        <div className="sync-flow-workspace" key={item.id}>
          <nav className="sync-flow-scenarios" aria-label="Escolher cenário de automação">
            {syncCases.map((caseItem, index) => (
              <button className={index === activeIndex ? "active" : ""} type="button" key={caseItem.id} onClick={() => selectScenario(index)}>
                <small>0{index + 1}</small><span><b>{caseItem.business}</b><em>{caseItem.label.split(" · ")[0]}</em></span><i>↗</i>
              </button>
            ))}
          </nav>

          <div className={`sync-flow-map stage-${flowStage}`}>
            <div className="sync-flow-map-grid" aria-hidden="true" />
            <div className="sync-flow-route" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className={`sync-flow-node input ${stageState(0)}`}><small>01 / ENTRADA</small><strong>{platformNames[item.platform]}</strong><span>Mensagem recebida e registrada</span></div>
            <div className={`sync-flow-node brain ${stageState(1)}`}><small>02 / LEITURA</small><strong>SYNC IA</strong><span>Contexto e intenção identificados</span><i aria-hidden="true">✦</i></div>
            <div className={`sync-flow-node action ${stageState(2)}`}><small>03 / AÇÃO</small><strong>{item.events[2]}</strong><span>Próximo passo executado e registrado</span></div>
            <div className="sync-flow-pulse" aria-hidden="true"><i /><i /><i /></div>
            <div className="sync-flow-caption"><small>OBJETIVO DO FLUXO</small><h3>{item.headline}</h3><p>{item.solution}</p></div>
          </div>

          <aside className="sync-flow-live">
            <div className="sync-flow-live-head"><span><i className={`sync-platform-logo ${item.platform}`} /> {platformNames[item.platform]}</span><b>AO VIVO</b></div>
            <PlatformSimulation compact platform={item.platform} business={item.business} prompt={item.prompt} response={item.response} />
            <div className="sync-flow-events">{item.events.map((event, index) => <span className={stageState(index)} key={event}><i>0{index + 1}</i><b>{event}</b><em>{flowStage > index ? "concluído" : flowStage === index ? "processando" : "aguardando"}</em></span>)}</div>
          </aside>
        </div>
        <footer className="sync-flow-footer">
          <div><small>RESULTADO GERADO</small><strong>{item.result}</strong></div>
          <span className="sync-flow-progress">{syncCases.map((caseItem, index) => <button type="button" aria-label={`Abrir cenário ${caseItem.business}`} className={index === activeIndex ? "active" : ""} onClick={() => selectScenario(index)} key={caseItem.id} />)}</span>
          <button type="button" onClick={() => onSelect(item)}>Abrir experiência completa <b>↗</b></button>
        </footer>
      </div>
    </section>
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
            <span><b>{recommendedPlan.price}</b>{recommendedPlan.suffix}</span>
          </div>
          <button type="button" onClick={() => onLead(`${recommendedPlan.name} como primeiro passo. Na simulação, considerei ${monthlyMessages} contatos por mês, ${exposedContacts} conversas com demora ou sem retorno, ${salesPerTen} clientes a cada 10 bons contatos e ticket médio de ${formatSyncMoney(averageTicket)}`)}>Quero começar por esta recomendação <b>↗</b></button>
        </div>
      </div>
      <small className="sync-loss-disclaimer">Simulação educativa baseada somente nas quantidades escolhidas por você — sem usar uma média genérica de mercado. Não representa promessa de faturamento.</small>
    </section>
  );
}

export default function AvanciniSyncPage() {
  const [syncFidelityMode, setSyncFidelityMode] = useState<"com-fidelidade" | "sem-fidelidade">("com-fidelidade");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSolution, setActiveSolution] = useState<SolutionId>("ia");
  const [selectedCase, setSelectedCase] = useState<SyncCase | null>(null);
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
    if (!selectedCase && !leadContext && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCase(null);
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
  }, [selectedCase, leadContext, menuOpen]);

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

      <SyncPortfolio onSelect={setSelectedCase} />

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
        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-toggle" role="group" aria-label="Opção de fidelidade Sync">
            <button
              type="button"
              className={syncFidelityMode === "com-fidelidade" ? "active sync-mode" : ""}
              onClick={() => setSyncFidelityMode("com-fidelidade")}
            >
              ✨ Condição 6 Meses <span className="badge-pill">R$ 0 Implementação</span>
            </button>
            <button
              type="button"
              className={syncFidelityMode === "sem-fidelidade" ? "active sync-mode" : ""}
              onClick={() => setSyncFidelityMode("sem-fidelidade")}
            >
              🔓 Sem Fidelidade <span className="badge-pill">Cancele quando quiser</span>
            </button>
          </div>
        </div>

        <div className="sync-combo-banner">
          <div>
            <span className="kicker">🌐 ECOSSISTEMA COMPLETO AVANCINI OS</span>
            <strong>Precisa também de um Site ou Landing Page Profissional?</strong>
            <p>Contrate o <b>Combo Avancini OS</b>: sua vitrine no ar no Avancini Dash + automação de WhatsApp no Avancini Sync por apenas <b>R$ 249,90/mês</b> (Chatbot) ou <b>R$ 429,90/mês</b> (Atendente com IA).</p>
          </div>
          <Link href="/dash#investimento" className="cta">Ver Combos com Site ↗</Link>
        </div>
        <div className="sync-plan-grid">
          {plans.map((plan, index) => {
            const isFidelity = syncFidelityMode === "com-fidelidade";
            const conditionText = isFidelity
              ? "CONDIÇÃO DE LANÇAMENTO · SEM TAXA DE IMPLEMENTAÇÃO"
              : plan.name.includes("Chatbot")
                ? "TAXA DE SETUP: R$ 490 À VISTA · CANCELE QUANDO QUISER"
                : plan.name.includes("IA")
                  ? "TAXA DE SETUP: R$ 790 À VISTA · CANCELE QUANDO QUISER"
                  : "TAXA DE SETUP: R$ 590 À VISTA · CANCELE QUANDO QUISER";
            return (
            <article className={plan.featured ? "featured" : ""} key={plan.id}>
              <div className="sync-plan-top"><span>0{index + 1}</span><small>{plan.label}</small>{plan.featured && <b>MAIS COMPLETO</b>}</div>
              <h3>{plan.name}</h3><strong>{plan.price}<em>{plan.suffix}</em></strong><i>{conditionText}</i><p>{plan.description}</p>
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

      {selectedCase && (
        <div className="sync-experience-modal" role="dialog" aria-modal="true" aria-labelledby="sync-case-title">
          <button className="sync-modal-backdrop" type="button" aria-label="Fechar demonstração" onClick={() => setSelectedCase(null)} />
          <article>
            <button className="sync-modal-close" type="button" aria-label="Fechar demonstração" onClick={() => setSelectedCase(null)}>×</button>
            <div className="sync-modal-browser"><span><i /><i /><i /></span><b>{selectedCase.business.toUpperCase()} · CENÁRIO DEMONSTRATIVO</b></div>
            <div className="sync-modal-content">
              <div className="sync-modal-copy">
                <small>{selectedCase.label}</small>
                <h2 id="sync-case-title">{selectedCase.headline}</h2>
                <p>{selectedCase.solution}</p>
                <div className="sync-modal-result"><span>RESULTADO DO FLUXO</span><strong>{selectedCase.result}</strong></div>
                <button type="button" onClick={() => { setSelectedCase(null); openLead(`uma solução parecida com o fluxo ${selectedCase.business}`); }}>Quero algo assim para minha empresa <b>↗</b></button>
              </div>
              <div className="sync-modal-platform">
                <PlatformSimulation platform={selectedCase.platform} business={selectedCase.business} prompt={selectedCase.prompt} response={selectedCase.response} />
                <div>{selectedCase.events.map((event) => <b key={event}><i />{event}</b>)}</div>
              </div>
            </div>
          </article>
        </div>
      )}

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
