"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AvanciniMark } from "../avancini-mark";

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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SyncDownArrow = ({ size = 12 }: { size?: number }) => (
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
    className="sync-svg-down-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

type SolutionId = "chatbot" | "ia";
type SyncPaymentCycle = "monthly" | "semiannual" | "annual";

const syncPaymentCycles = [
  { id: "monthly", label: "Mensal", detail: "Cobrança recorrente" },
  { id: "semiannual", label: "Semestral", detail: "20% de economia" },
  { id: "annual", label: "Anual à vista", detail: "30% de economia" },
] as const;

const formatSyncPlanMoney = (value: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
}).format(value);

const solutions = {
  chatbot: {
    index: "01",
    label: "CHATBOT & AUTOMAÇÃO INTELIGENTE",
    description:
      "Respostas em 3 segundos, envio instantâneo de catálogos e orçamentos, agendamento de consultas ou serviços no piloto automático e triagem sem filas para o vendedor certo.",
    ideal: "Indispensável para clínicas, escritórios, salões, lojas e empresas que recebem alto volume de mensagens e perdem vendas pela demora em responder.",
    promise: "Automatize seu WhatsApp e feche vendas 24h sem depender de equipe online.",
    result: "Zero clientes esperando, atendimento padronizado em 100% dos contatos e sua equipe focada apenas no fechamento.",
    steps: [
      "Atendimento imediato em menos de 3 segundos (24h por dia)",
      "Qualifica a necessidade, apresenta valores/catálogo e coleta os dados",
      "Agenda horários ou entrega o cliente pronto para o fechamento",
    ],
  },
  ia: {
    index: "02",
    label: "ATENDENTE COM IA GENERATIVA",
    description:
      "Inteligência artificial avançada treinada exclusivamente no seu negócio. Conversa com empatia humana, compreende áudios e perguntas abertas, quebra objeções difíceis e conduz o cliente até o fechamento com alto valor percebido.",
    ideal: "Perfeito para empresas que vendem serviços consultivos, alto padrão, clínicas estéticas, saúde, advocacia, imobiliárias e vendas complexas.",
    promise: "Uma consultora de vendas com IA treinada para negociar, tirar dúvidas e vender.",
    result: "Vendas acontecendo de madrugada e nos finais de semana, com tom de voz sofisticado e 100% humanizado.",
    steps: [
      "Entende texto e áudios com linguagem natural e acolhedora",
      "Consulta todo o conhecimento da sua empresa e quebra objeções na hora",
      "Conduz a negociação com estratégia e fecha agendamentos ou vendas",
    ],
  },
} as const;

const faqs = [
  {
    question: "Chatbot e atendente com IA são a mesma coisa?",
    answer: "Não. O chatbot segue fluxos definidos com menus e botões, enquanto a IA entende perguntas abertas, áudios e contexto em linguagem natural. Cada solução pode ser contratada separadamente.",
  },
  {
    question: "Preciso contratar chatbot e inteligência artificial juntos?",
    answer: "Não. Você pode começar com o Chatbot para organizar a demanda ou direto com a IA para uma experiência consultiva.",
  },
  {
    question: "Existe taxa de ativação?",
    answer: "Não. A configuração inicial do Sync está totalmente inclusa na assinatura.",
  },
  {
    question: "Como funcionam os ciclos de pagamento?",
    answer: "Você pode escolher entre mensal recorrente, semestral com 20% de economia ou anual com 30% de economia.",
  },
  {
    question: "A IA substitui completamente uma pessoa?",
    answer: "Ela assume a triagem, qualificação, dúvidas repetitivas e agendamentos, encaminhando para seu time quando o fechamento final exigir toque humano.",
  },
  {
    question: "Posso usar meu número atual do WhatsApp?",
    answer: "Sim, realizamos a integração mantendo o histórico e a operação do seu número corporativo com total segurança.",
  },
  {
    question: "Existem custos de mensagens ou ferramentas externas?",
    answer: "Alguns canais cobram por consumo de API oficial. Todos os limites e projeções são alinhados com total transparência antes do início.",
  },
] as const;

const syncPlans = [
  {
    id: "chatbot",
    label: "AUTOMAÇÃO & AGENDAMENTO",
    name: "Chatbot Pro",
    price: "A partir de R$ 149,90",
    cyclePrices: { monthly: 149.9, semiannual: 719.9, annual: 1259.9 },
    suffix: "/mês",
    description: "Estrutura completa de automação com menus inteligentes, catálogo, agendamento de horários e encaminhamento direto para o vendedor certo.",
    definition: "Atendimento imediato que elimina filas e não deixa nenhum cliente esfriar.",
    fit: "Clínicas, consultórios, salões, lojas, oficinas e negócios locais com alto volume de contatos diários.",
    example: "O cliente chama às 23h, escolhe o serviço, tira dúvidas de valor, envia os dados e já recebe a confirmação na hora.",
    items: ["Um canal principal (WhatsApp/Insta)", "Fluxo estratégico de alta conversão", "Envio de orçamentos e catálogos", "Captação e triagem sem filas", "Transbordo para atendente humano", "Acompanhamento e 1 ajuste mensal"],
  },
  {
    id: "ia",
    label: "INTELIGÊNCIA ARTIFICIAL DE ELITE",
    name: "Atendente IA Ultra",
    price: "A partir de R$ 297,90",
    cyclePrices: { monthly: 297.9, semiannual: 1429.9, annual: 2499.9 },
    suffix: "/mês",
    description: "Agente de IA generativa treinada exclusivamente no seu negócio para atender em linguagem natural, quebrar objeções complexas e vender 24 horas por dia.",
    definition: "Conversa 100% natural e persuasiva, sem travar o cliente em menus engessados.",
    fit: "Marcas premium, clínicas médicas/estéticas, advocacia, imobiliárias e serviços de alto ticket que exigem atendimento impecável.",
    example: "O cliente manda um áudio com uma dúvida difícil. A IA compreende, responde no tom da sua marca e agenda a consulta.",
    items: ["IA generativa treinada na sua empresa", "Compreensão de áudios e textos livres", "Quebra de objeções e persuasão", "Qualificação aprofundada de contatos", "Transferência ágil para seu time", "Evolução e ajuste mensal contínuo"],
  },
] as const;

const formatSyncMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

const formatSyncQuantity = (value: number) =>
  value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

type SyncBottleneck = "repeticao" | "resposta" | "qualificacao";

const syncRecommendations: Record<SyncBottleneck, {
  planId: SolutionId;
  reason: string;
  status: string;
  affectedLabel: string;
  affectedHint: string;
  rateLabel: string;
  rateHint: string;
  route: [string, string, string];
}> = {
  repeticao: {
    planId: "chatbot",
    reason: "O Chatbot assume perguntas previsíveis, coleta os dados e chama sua equipe somente quando uma pessoa realmente precisa entrar.",
    status: "TEMPO OPERACIONAL PRESO",
    affectedLabel: "Quantas conversas repetem as mesmas perguntas?",
    affectedHint: "preço, horário, endereço, disponibilidade ou serviço",
    rateLabel: "Quanto tempo cada resposta costuma consumir?",
    rateHint: "inclua leitura, resposta e organização do contato",
    route: ["Pergunta recorrente chega", "Equipe interrompe o trabalho", "A mesma resposta é digitada outra vez"],
  },
  resposta: {
    planId: "ia",
    reason: "O Atendente IA entende perguntas livres, responde com o contexto da empresa e mantém a oportunidade em movimento.",
    status: "OPORTUNIDADES ESPERANDO",
    affectedLabel: "Quantos esperam demais ou ficam sem retorno?",
    affectedHint: "use uma quantidade que você reconhece",
    rateLabel: "Em cada 10 bons contatos, quantos viram clientes?",
    rateHint: "pense no seu atendimento atual",
    route: ["Cliente demonstra interesse", "Resposta ou retorno demora", "Outra empresa responde primeiro"],
  },
  qualificacao: {
    planId: "ia",
    reason: "O Atendente IA entende o que a pessoa procura, faz as perguntas certas e entrega uma oportunidade mais pronta para sua equipe.",
    status: "CONTATOS SEM PRIORIDADE",
    affectedLabel: "Quantos chegam sem as informações necessárias?",
    affectedHint: "contatos que exigem várias perguntas antes de avançar",
    rateLabel: "Em cada 10 contatos bem qualificados, quantos viram clientes?",
    rateHint: "considere somente oportunidades com perfil",
    route: ["Contato chega sem contexto", "Equipe tenta descobrir a necessidade", "A oportunidade esfria antes da proposta"],
  },
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
  const recommendedPlan = syncPlans.find((plan) => plan.id === recommendation.planId)!;
  const minutesPerRepeatedAnswer = salesPerTen * 2;
  const repetitiveHours = Number(((exposedContacts * minutesPerRepeatedAnswer) / 60).toFixed(1));
  const recoveredHours = Number((repetitiveHours * 0.5).toFixed(1));
  const isRepetition = bottleneck === "repeticao";
  const isQualification = bottleneck === "qualificacao";
  const riskLabel = isRepetition
    ? "HORAS GASTAS REPETINDO RESPOSTAS"
    : isQualification
      ? "VALOR EM CONTATOS MAL QUALIFICADOS"
      : "VALOR DAS OPORTUNIDADES EXPOSTAS";
  const riskValue = isRepetition ? `${formatSyncQuantity(repetitiveHours)} h` : formatSyncMoney(revenueAtRisk);
  const riskUnit = isRepetition ? "/mês da equipe" : "/mês";
  const riskDescription = isRepetition
    ? <>Você informou <b>{exposedContacts} conversas repetitivas</b>. Consumindo cerca de <b>{minutesPerRepeatedAnswer} minutos cada</b>, elas ocupam <b>{formatSyncQuantity(repetitiveHours)} horas mensais</b> que poderiam estar em vendas e atendimento humano.</>
    : isQualification
      ? <>Você informou <b>{exposedContacts} contatos sem contexto suficiente</b>. Se <b>{salesPerTen} em cada 10</b> oportunidades bem qualificadas viram clientes, até <b>{formatSyncQuantity(exposedSales)} vendas potenciais</b> passam por uma etapa sem prioridade clara.</>
      : <>Você informou <b>{exposedContacts} conversas com demora</b>. Se <b>{salesPerTen} em cada 10</b> bons contatos costumam virar clientes, cerca de <b>{formatSyncQuantity(exposedSales)} vendas potenciais</b> passam por uma etapa vulnerável.</>;
  const recoveryLabel = isRepetition ? "SE METADE DAS RESPOSTAS FOR ABSORVIDA" : "SE METADE DAS CONVERSAS FOR RECUPERADA";
  const recoveryValue = isRepetition ? `${formatSyncQuantity(recoveredHours)} h` : formatSyncMoney(protectedPotential);
  const recoveryUnit = isRepetition ? "/mês devolvidas" : "/mês protegidos";
  const recoveryDetail = isRepetition
    ? <>{recoverableContacts} respostas assumidas pelo fluxo<br /><b>equipe livre para conversas importantes</b></>
    : <>{recoverableContacts} conversas retomadas<br /><b>{formatSyncQuantity(recoverableSales)} vendas potenciais</b></>;
  const scenarioName = isRepetition ? "respostas repetitivas" : isQualification ? "qualificação dos contatos" : "demora no atendimento";

  return (
    <section className="sync-loss" id="diagnostico" aria-labelledby="sync-loss-title">
      <header>
        <div><span>03 / SIMULAÇÃO DO GARGALO</span><h2 id="sync-loss-title">Seu concorrente não precisa ser melhor.<br /><em>Ele só precisa responder antes.</em></h2></div>
        <p>Use sua realidade para visualizar quanto a demora, a resposta genérica e a falta de qualificação podem representar no fim do mês.</p>
      </header>
      <div className="sync-loss-console">
        <div className="sync-loss-inputs">
          <div className="sync-loss-live"><i /> CENÁRIO EDITÁVEL <small>SEM MÉDIA GENÉRICA DE MERCADO</small></div>
          <fieldset className="sync-loss-choice">
            <legend>Onde sua operação trava mais hoje?</legend>
            <div>
              <button className={bottleneck === "repeticao" ? "active" : ""} type="button" onClick={() => setBottleneck("repeticao")}><span>01</span>Repete respostas</button>
              <button className={bottleneck === "resposta" ? "active" : ""} type="button" onClick={() => setBottleneck("resposta")}><span>02</span>Demora para responder</button>
              <button className={bottleneck === "qualificacao" ? "active" : ""} type="button" onClick={() => setBottleneck("qualificacao")}><span>03</span>Contato chega desqualificado</button>
            </div>
          </fieldset>
          <label><span><b>Mensagens e contatos por mês</b><small>todos os canais</small></span><output>{monthlyMessages}</output><input type="range" min="30" max="2000" step="10" value={monthlyMessages} onChange={(event) => { const value = Number(event.target.value); setMonthlyMessages(value); setLateContacts((current) => Math.min(current, value)); }} /></label>
          <label><span><b>{recommendation.affectedLabel}</b><small>{recommendation.affectedHint}</small></span><output>{exposedContacts}</output><input type="range" min="1" max={monthlyMessages} step="1" value={lateContacts} onChange={(event) => setLateContacts(Number(event.target.value))} /></label>
          <label><span><b>{recommendation.rateLabel}</b><small>{recommendation.rateHint}</small></span><output>{isRepetition ? `${minutesPerRepeatedAnswer} min` : `${salesPerTen} em 10`}</output><input type="range" min="1" max="6" step="1" value={salesPerTen} onChange={(event) => setSalesPerTen(Number(event.target.value))} /></label>
          <label><span><b>{isRepetition ? "Valor médio de um cliente atendido" : "Valor médio de cada venda"}</b><small>{isRepetition ? "para comparar o custo de deixar a equipe presa" : "ticket médio"}</small></span><output>{formatSyncMoney(averageTicket)}</output><input type="range" min="50" max="10000" step="50" value={averageTicket} onChange={(event) => setAverageTicket(Number(event.target.value))} /></label>
        </div>
        <div className={`sync-loss-result scenario-${bottleneck}`} key={bottleneck} aria-live="polite">
          <div className="sync-loss-status"><span><i /> {recommendation.status}</span><small>SYNC:// DIAGNÓSTICO · AO VIVO</small></div>
          <div className="sync-loss-risk"><small>{riskLabel}</small><strong>{riskValue}<em>{riskUnit}</em></strong><p>{riskDescription}</p></div>
          <div className="sync-loss-route">{recommendation.route.map((step, index) => <span key={step}>{step}{index < recommendation.route.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div>
          <div className="sync-loss-protected"><div><small>{recoveryLabel}</small><strong>{recoveryValue}<em>{recoveryUnit}</em></strong></div><span>{recoveryDetail}</span></div>
          <div className="sync-loss-recommendation">
            <div><small>MELHOR PRIMEIRO PASSO PARA ESTE CENÁRIO</small><strong>{recommendedPlan.name}</strong><p>{recommendation.reason}</p></div>
          </div>
          <button type="button" onClick={() => onLead(`${recommendedPlan.name} como primeiro passo para resolver ${scenarioName}. Na simulação, considerei ${monthlyMessages} contatos por mês, ${exposedContacts} conversas afetadas e ticket médio de ${formatSyncMoney(averageTicket)}`)}>Quero começar por esta recomendação <SyncArrow /></button>
        </div>
      </div>
      <small className="sync-loss-disclaimer">Simulação educativa baseada somente nas quantidades escolhidas por você, sem usar uma média genérica de mercado. Não representa promessa de faturamento.</small>
    </section>
  );
}


type DemoScenarioId = "clinica" | "veiculos" | "estetica" | "juridico" | "moda";
type DemoMessage = { side: "user" | "ai"; text: string };
type DemoReply = { text: string; complete: boolean };
type DemoScenario = {
  id: DemoScenarioId;
  title: string;
  user: string;
  ai: string;
  suggestions: [string[], string[], string[]];
  closing: string;
};

const MAX_DEMO_TURNS = 3;

const demoScenarios: DemoScenario[] = [
  {
    id: "clinica",
    title: "Clínica / Saúde",
    user: "Quero marcar uma avaliação. Tem horário amanhã?",
    ai: "Consigo ajudar. Primeiro preciso entender o tipo de atendimento: é uma primeira consulta, retorno ou exame?",
    suggestions: [
      ["É primeira consulta", "É retorno", "Quero uma avaliação"],
      ["Prefiro à tarde", "Prefiro de manhã", "Atende convênio?"],
      ["Pode confirmar", "Quero falar com a recepção", "Qual o valor?"],
    ],
    closing: "Perfeito. Registrei o tipo de atendimento, o período e a modalidade. O próximo passo seria apresentar os horários compatíveis ou entregar tudo organizado para a recepção.",
  },
  {
    id: "veiculos",
    title: "Loja de Carros",
    user: "Procuro um SUV até R$ 120 mil e tenho carro na troca.",
    ai: "Perfeito. Já tenho a categoria e a faixa de investimento. Agora preciso entender o perfil: você prefere um SUV compacto ou de sete lugares?",
    suggestions: [
      ["Prefiro SUV compacto", "Quero sete lugares", "Aceito seminovo"],
      ["Tenho carro na troca", "Quero financiar", "Pagamento à vista"],
      ["Pode mostrar opções", "Falar com consultor", "Até R$ 120 mil"],
    ],
    closing: "Perfeito. Registrei categoria, faixa de investimento e forma de negociação. O próximo passo seria mostrar somente os veículos compatíveis ou chamar um consultor com o contexto pronto.",
  },
  {
    id: "estetica",
    title: "Clínica de Estética",
    user: "Quero melhorar manchas, mas não sei qual tratamento escolher.",
    ai: "Vamos começar com segurança. É a primeira avaliação ou você já realizou algum tratamento para essa região?",
    suggestions: [
      ["É a primeira vez", "Já fiz tratamento", "Tenho pele sensível"],
      ["Manchas no rosto", "Prefiro sábado", "Uso ácido"],
      ["Quero uma avaliação", "Falar com especialista", "Qual o valor?"],
    ],
    closing: "Perfeito. Registrei objetivo, histórico e sensibilidade. O próximo passo seria indicar a avaliação adequada e encaminhar o contexto para a especialista, sem prometer um procedimento antes da análise.",
  },
  {
    id: "juridico",
    title: "Advocacia",
    user: "Preciso revisar um contrato empresarial com confidencialidade.",
    ai: "Claro. Sem expor dados sigilosos aqui, preciso identificar o tipo do contrato e a urgência. Existe uma data limite?",
    suggestions: [
      ["Prazo esta semana", "Contrato de serviço", "Contrato societário"],
      ["Como funciona a consulta?", "Tenho urgência", "Posso enviar depois"],
      ["Pode encaminhar", "Quero agendar", "Falar com advogado"],
    ],
    closing: "Perfeito. Registrei o tipo de contrato, a urgência e o prazo sem coletar conteúdo sigiloso. O próximo passo seria encaminhar o caso ao profissional adequado com a triagem pronta.",
  },
  {
    id: "moda",
    title: "Loja de Roupas",
    user: "Gostei de uma peça, mas não sei se ainda tem meu tamanho.",
    ai: "Posso ajudar a localizar. Qual é a peça, o tamanho e a cor desejada? Assim a busca fica objetiva e mostra somente opções compatíveis.",
    suggestions: [
      ["Vestido preto M", "Camisa branca G", "Calça tamanho 40"],
      ["Vocês entregam?", "Quero retirar", "Posso trocar?"],
      ["Mostrar opções", "Confirmar disponibilidade", "Falar com vendedor"],
    ],
    closing: "Perfeito. Registrei peça, tamanho, cor e forma de entrega. O próximo passo seria mostrar apenas os itens disponíveis ou transferir o pedido pronto para um vendedor.",
  },
];

const hasAny = (text: string, terms: string[]) => terms.some((term) => text.includes(term));

function buildDemoReply(message: string, scenario: DemoScenario, turn: number): DemoReply {
  const text = message.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const isFinalTurn = turn >= MAX_DEMO_TURNS - 1;

  // 1. Solicitação de Atendente Humano / Especialista
  if (hasAny(text, ["humano", "pessoa", "atendente", "recepcao", "consultor", "especialista", "advogado", "vendedor", "falar com alguem"])) {
    return {
      text: "Contexto organizado. Em uma operação conectada, esta conversa seria transferida agora para a pessoa responsável, junto com o histórico, para você não precisar repetir tudo.",
      complete: true,
    };
  }

  // 2. Confirmação / Conclusão
  if (hasAny(text, ["obrigad", "valeu", "perfeito", "pode confirmar", "pode agendar", "fechado", "pode encaminhar", "quero esse"])) {
    return { text: scenario.closing, complete: true };
  }

  // A terceira resposta sempre fecha a experiência. A demonstração precisa
  // provar começo, contexto e próximo passo sem virar uma conversa infinita.
  if (isFinalTurn) return { text: scenario.closing, complete: true };

  // 3. Localização / Endereço / Horário de Funcionamento
  if (hasAny(text, ["onde fica", "endereco", "localizacao", "onde voces", "horario de funcionamento", "aberto"])) {
    return {
      text: "Na operação real, o Sync consulta o endereço e os horários cadastrados pela empresa antes de responder. Para continuar esta simulação, você prefere atendimento presencial ou digital?",
      complete: false,
    };
  }

  // 4. Formas de Pagamento / Parcelamento / Cartão
  if (hasAny(text, ["forma de pagamento", "cartao", "parcela", "pix", "divide em"])) {
    return {
      text: "Na operação real, o Sync apresenta somente as formas de pagamento e condições cadastradas pela empresa. Qual modalidade você gostaria de consultar?",
      complete: false,
    };
  }

  // 5. Inteligência Específica por Segmento
  if (scenario.id === "clinica") {
    if (hasAny(text, ["convenio", "plano", "unimed", "bradesco", "sulamerica", "amil", "particular"])) {
      return {
        text: "No atendimento real, eu consultaria a lista de convênios cadastrada pela clínica antes de confirmar. Qual é o seu plano e qual especialidade você procura?",
        complete: false,
      };
    }
    if (hasAny(text, ["valor", "preco", "quanto custa", "tabela"])) {
      return {
        text: "O valor depende da especialidade e da modalidade de atendimento. Em produção, eu consultaria a tabela cadastrada pela clínica. Qual atendimento você procura?",
        complete: false,
      };
    }
    if (hasAny(text, ["manha", "tarde", "noite", "horario", "amanha", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"])) {
      return {
        text: "Em produção, eu consultaria a agenda em tempo real e mostraria somente horários disponíveis. Para esta simulação, você prefere manhã ou tarde?",
        complete: false,
      };
    }
    if (hasAny(text, ["primeira", "retorno", "exame", "avaliacao", "consulta"])) {
      return {
        text: "Perfeito. Registrei o tipo de consulta. Agora preciso saber se o atendimento seria particular ou por convênio e qual período você prefere.",
        complete: false,
      };
    }
    return {
      text: "Entendido! Já organizei suas preferências. Para finalizarmos a triagem, informe se possui convênio médico e sua preferência de turno (manhã ou tarde).",
      complete: false,
    };
  }

  if (scenario.id === "veiculos") {
    if (hasAny(text, ["troca", "meu carro", "seminovo", "tabela fipe", "onix", "civic", "corolla", "hb20", "gol", "polo"])) {
      return {
        text: "Registrei que existe um veículo na troca. Em produção, o Sync coletaria modelo, ano e quilometragem para entregar o contexto ao avaliador. Você pretende financiar a diferença ou pagar à vista?",
        complete: false,
      };
    }
    if (hasAny(text, ["financ", "parcela", "entrada", "taxa", "banco", "juros"])) {
      return {
        text: "Em uma operação conectada, eu mostraria somente as condições cadastradas pela loja ou pela financeira. Para qual valor de entrada e faixa de parcela você busca uma simulação?",
        complete: false,
      };
    }
    if (hasAny(text, ["suv", "compacto", "sete lugares", "automatico", "flex", "diesel", "blindado", "corolla cross", "compass", "creta", "renegade", "tracker", "kicks"])) {
      return {
        text: "Perfil do veículo entendido. Em produção, eu filtraria o catálogo real e mostraria apenas opções compatíveis. Você prefere receber detalhes dos veículos ou falar com um consultor?",
        complete: false,
      };
    }
    return {
      text: "Certo! Já anotei o perfil do veículo procurado. Agora informe se haverá carro na troca ou se prefere uma simulação de financiamento.",
      complete: false,
    };
  }

  if (scenario.id === "estetica") {
    if (hasAny(text, ["resultado", "comprovado", "garantia", "funciona mesmo"])) {
      return {
        text: "O resultado varia conforme avaliação, histórico e resposta individual. O Sync não promete um procedimento: ele organiza o objetivo e encaminha a conversa para avaliação profissional.",
        complete: false,
      };
    }
    if (hasAny(text, ["sensivel", "alerg", "reacao", "acido", "roacutan", "gestante", "amament"])) {
      return {
        text: "Essa informação é importante. Registrei a sensibilidade para que a pessoa responsável avalie o caso antes de qualquer indicação. Qual região você deseja tratar?",
        complete: false,
      };
    }
    if (hasAny(text, ["botox", "mancha", "melasma", "limpeza", "preenchimento", "harmonizacao", "bioestimulador", "laser", "peeling"])) {
      return {
        text: "Entendi o objetivo, mas o procedimento adequado depende de avaliação profissional. Você já realizou algum tratamento nessa região ou seria a primeira vez?",
        complete: false,
      };
    }
    if (hasAny(text, ["valor", "preco", "quanto"])) {
      return {
        text: "Cada protocolo é personalizado após análise do tipo de pele e grau de necessidade. Na consulta avaliativa desenhamos o plano exato. Você prefere atendimento durante a semana ou no sábado?",
        complete: false,
      };
    }
    return {
      text: "Perfeito! Histórico e objetivo registrados com cuidado. Deseja agendar sua avaliação facial/corporal durante a semana ou no sábado?",
      complete: false,
    };
  }

  if (scenario.id === "juridico") {
    if (hasAny(text, ["nda", "confidencial", "sigilo", "dados sigilosos"])) {
      return {
        text: "Não é necessário compartilhar conteúdo sigiloso nesta triagem. Em produção, o Sync registra apenas área, urgência e preferência de contato; as condições formais são confirmadas pelo profissional responsável.",
        complete: false,
      };
    }
    if (hasAny(text, ["prazo", "urgente", "amanha", "esta semana", "audiencia", "intimacao", "liminar"])) {
      return {
        text: "Urgência processual registrada com prioridade alta. Sem compartilhar dados sigilosos aqui, trata-se de direito empresarial, trabalhista, civil ou tributário?",
        complete: false,
      };
    }
    if (hasAny(text, ["contrato", "societario", "trabalhista", "tributario", "civel", "imobiliario", "divorcio", "heranca"])) {
      return {
        text: "Área jurídica identificada. Sem coletar conteúdo sigiloso nesta etapa, eu encaminharia o contexto e a urgência ao profissional responsável. Você prefere reunião online ou presencial?",
        complete: false,
      };
    }
    return {
      text: "Dados preliminares organizados com sigilo. Para fecharmos o encaminhamento, informe sua preferência de reunião (online ou presencial) e a urgência do caso.",
      complete: false,
    };
  }

  // Segmento Moda / Varejo
  if (hasAny(text, ["como funciona", "atendimento", "como comprar", "preciso de ajuda"])) {
    return {
      text: "Posso ajudar a localizar uma peça, organizar tamanho e cor, explicar as opções cadastradas de entrega ou encaminhar tudo pronto para um vendedor. O que você quer resolver primeiro?",
      complete: false,
    };
  }
  if (hasAny(text, ["entrega", "frete", "sedex", "motoboy", "envia", "cep", "chega"])) {
    return {
      text: "Em produção, eu consultaria as modalidades e prazos configurados pela loja usando o CEP informado. Qual é o seu CEP e qual peça você procura?",
      complete: false,
    };
  }
  const mentionsSize = /(^|\s)(p|m|g|gg|38|40|42|44)(\s|$)/.test(text);
  if (mentionsSize || hasAny(text, ["tamanho", "preto", "branco", "nude", "vestido", "camisa", "calca"])) {
    return {
      text: "Registrei peça, tamanho e cor. Em produção, eu consultaria o estoque real antes de confirmar disponibilidade. Você prefere entrega ou retirada?",
      complete: false,
    };
  }
  return {
    text: "Ótimo! Registrei seu interesse. Agora me informe o tamanho desejado e se prefere entrega a domicílio ou retirada rápida.",
    complete: false,
  };
}

function InteractiveAiChatDemo({ onLead }: { onLead: (context: string) => void }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [userTurns, setUserTurns] = useState(0);
  const [demoFinished, setDemoFinished] = useState(false);
  const typingTimerRef = useRef<number | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState<DemoMessage[]>([
    { side: "user", text: demoScenarios[0].user },
    { side: "ai", text: demoScenarios[0].ai },
  ]);

  useEffect(() => () => {
    if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current);
  }, []);

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [chatHistory, isTyping, demoFinished]);

  const scheduleReply = (reply: () => void, delay: number) => {
    if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current);
    typingTimerRef.current = window.setTimeout(() => {
      reply();
      typingTimerRef.current = null;
    }, delay);
  };

  const sendMessage = (message: string) => {
    const text = message.trim();
    if (!text || isTyping || demoFinished) return;
    const answer = buildDemoReply(text, demoScenarios[currentScenario], userTurns);
    setChatHistory((history) => [...history, { side: "user", text }]);
    setCustomMsg("");
    setIsTyping(true);
    scheduleReply(() => {
      setChatHistory((history) => [...history, { side: "ai", text: answer.text }]);
      setUserTurns((turns) => turns + 1);
      setDemoFinished(answer.complete);
      setIsTyping(false);
    }, 620 + Math.min(text.length * 8, 420));
  };

  const startScenario = (index: number) => {
    const scenario = demoScenarios[index];
    if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current);
    setCurrentScenario(index);
    setCustomMsg("");
    setUserTurns(0);
    setDemoFinished(false);
    setChatHistory([{ side: "user", text: scenario.user }]);
    setIsTyping(true);
    scheduleReply(() => {
      setChatHistory([{ side: "user", text: scenario.user }, { side: "ai", text: scenario.ai }]);
      setIsTyping(false);
    }, 620);
  };

  const handleSelectScenario = (index: number) => startScenario(index);

  const handleSendCustom = (event: FormEvent) => {
    event.preventDefault();
    sendMessage(customMsg);
  };

  return (
    <section className="sync-interactive-ai-section" id="portfolio">
      <div className="section-heading" style={{ margin: "0 auto 40px", maxWidth: "1240px" }}>
        <div>
          <span className="section-index">01 / DEMONSTRAÇÃO AO VIVO</span>
          <h2>Teste uma conversa.<br />Veja o próximo passo nascer.</h2>
        </div>
        <p>Escolha um segmento e siga uma conversa completa: entender, qualificar e definir o próximo passo. A simulação encerra quando conclui a triagem.</p>
      </div>

      <div className="sync-ai-sim-grid">
        <div className="sync-ai-sim-copy">
          <span className="badge"><i /> INTELIGÊNCIA ARTIFICIAL CONVERSACIONAL</span>
          <h3>A pergunta muda.<br />A resposta acompanha.</h3>
          <p>Esta é uma simulação orientativa. No atendimento real, a IA usa a base, o tom e os limites definidos pela empresa. Quando necessário, chama uma pessoa.</p>
          <div className="sync-ai-sim-triggers">
            {demoScenarios.map((sc, idx) => (
              <button
                type="button"
                key={sc.title}
                className={currentScenario === idx ? "active" : ""}
                onClick={() => handleSelectScenario(idx)}
              >
                <span>{sc.title}: “{sc.user.slice(0, 40)}...”</span>
                <b>Testar <SyncArrow /></b>
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
          <div className="sync-demo-progress" aria-label={`Etapa ${Math.min(userTurns + 1, MAX_DEMO_TURNS)} de ${MAX_DEMO_TURNS}`}>
            {["Entender", "Qualificar", "Próximo passo"].map((label, index) => (
              <span key={label} className={index < userTurns || demoFinished ? "done" : index === userTurns ? "active" : ""}>
                <i>{index + 1}</i>{label}
              </span>
            ))}
          </div>
          <div className="sync-wa-chat-body" ref={chatBodyRef}>
            {chatHistory.map((m, i) => (
              <div key={`${m.side}-${i}-${m.text}`} className={m.side === "user" ? "sync-msg sync-msg-user" : "sync-msg sync-msg-ai"}>
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
          {demoFinished ? (
            <div className="sync-demo-complete" role="status">
              <div>
                <small>TRIAGEM CONCLUÍDA</small>
                <strong>Conversa organizada. Próximo passo definido.</strong>
                <span>{demoScenarios[currentScenario].title} · contexto coletado · equipe pronta para continuar</span>
              </div>
              <div className="sync-demo-complete-actions">
                <button type="button" onClick={() => onLead(`um atendimento inteligente para ${demoScenarios[currentScenario].title.toLocaleLowerCase("pt-BR")}`)}>Quero isso no meu atendimento <SyncArrow /></button>
                <button type="button" onClick={() => startScenario(currentScenario)}>Reiniciar conversa <b>↻</b></button>
              </div>
            </div>
          ) : (
            <>
              <div className="sync-wa-suggestions" aria-label="Sugestões para continuar a conversa">
                {demoScenarios[currentScenario].suggestions[Math.min(userTurns, MAX_DEMO_TURNS - 1)].map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)} disabled={isTyping}>{suggestion}</button>
                ))}
              </div>
              <form className="sync-wa-footer" onSubmit={handleSendCustom}>
                <input
                  type="text"
                  placeholder="Digite uma resposta de teste..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  disabled={isTyping}
                />
                <button type="submit" aria-label="Enviar mensagem de teste" disabled={isTyping || !customMsg.trim()}>➤</button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AvanciniSyncPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leadContext, setLeadContext] = useState("");
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [paymentCycle, setPaymentCycle] = useState<SyncPaymentCycle>("monthly");
  const [leadName, setLeadName] = useState("");
  const [leadError, setLeadError] = useState("");
  const leadInputRef = useRef<HTMLInputElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

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
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]');
        if (!dialog) return;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
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
      <header className={`header sync-shared-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#inicio" className="logo" aria-label="Avancini Sync, início">
          <AvanciniMark variant="sync" className="logo-mark avancini-a-mark" />
          <span><span className="brand-name">AVANCINI <b>SYNC</b></span><small>Atendimento que não esfria</small></span>
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

      {menuOpen && <div className="sync-menu" role="dialog" aria-modal="true" aria-label="Menu principal do Avancini Sync">
        <div className="sync-menu-top"><span>NAVEGAÇÃO <i /> 05 SEÇÕES</span><div><Link href="/" onClick={() => setMenuOpen(false)}>AVANCINI OS <SyncArrow /></Link><Link href="/dash" onClick={() => setMenuOpen(false)}>AVANCINI DASH <SyncArrow /></Link></div><button ref={menuCloseRef} type="button" onClick={() => setMenuOpen(false)}>× <b>FECHAR</b><small>ESC</small></button></div>
        <nav>{[
          ["01", "Início", "A oportunidade não espera", "#inicio"],
          ["02", "Demonstração", "Veja o atendimento acontecer", "#portfolio"],
          ["03", "Soluções", "Chatbot ou atendente com IA", "#solucoes"],
          ["04", "Planos", "Compare preços e escolha", "#planos"],
          ["05", "Dúvidas", "Decida com clareza", "#duvidas"],
        ].map(([number,label,description,href]) => <a href={href} key={number} onClick={() => setMenuOpen(false)}><small>{number}</small><span>{label}</span><em>{description}</em><SyncArrow /></a>)}</nav>
        <div className="sync-menu-bottom"><span><i /> ATENDIMENTO QUE RESPONDE E DIRECIONA</span><button type="button" onClick={() => { setMenuOpen(false); openLead("uma solução para melhorar meu atendimento"); }}>FALAR SOBRE MEU ATENDIMENTO <SyncArrow /></button></div>
      </div>}

      <section className="sync-hero" id="inicio">
        <div className="sync-hero-grid" aria-hidden="true" />
        <div className="sync-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <AvanciniMark variant="sync" className="sync-hero-mark avancini-a-mark" />
        <div className="sync-hero-copy">
          <span className="sync-eyebrow"><i /> CHATBOT · ATENDENTE COM INTELIGÊNCIA ARTIFICIAL</span>
          <h1>Seu cliente chamou.<br /><em>O Sync mantém a conversa viva.</em></h1>
          <p>Responda no WhatsApp e Instagram com rapidez, contexto e um próximo passo claro, mesmo quando ninguém da equipe puder atender naquele instante.</p>
          <div className="sync-hero-actions">
            <a href="#portfolio">Ver o Sync funcionando <SyncDownArrow /></a>
            <a className="sync-plans-shortcut" href="#planos">Ver planos <SyncDownArrow /></a>
            <button type="button" onClick={() => openLead("parar de perder oportunidades por demora ou falta de acompanhamento")}>Quero parar de perder oportunidades <SyncArrow /></button>
          </div>
          <div className="sync-hero-proof">
            <span><b>01</b> Responde em segundos</span>
            <span><b>02</b> Pode atender 24 horas</span>
            <span><b>03</b> Chama uma pessoa na hora certa</span>
          </div>
        </div>
      </section>

      <InteractiveAiChatDemo onLead={openLead} />

      <section className="sync-solutions" id="solucoes">
        <header className="sync-section-heading">
          <div><span>02 / ESCOLHA PELO ATENDIMENTO</span><h2>Duas soluções.<br />Cada uma funciona sozinha.</h2></div>
          <p>Chatbot organiza caminhos previsíveis. O Atendente IA entende perguntas livres. Você escolhe somente o nível de conversa que sua empresa precisa.</p>
        </header>
        <div className="sync-choice-grid" aria-label="Comparação entre Chatbot e Atendente IA">
          {(Object.keys(solutions) as SolutionId[]).map((id) => {
            const item = solutions[id];
            return (
              <article className={id === "ia" ? "featured" : ""} key={id}>
                <div className="sync-choice-top"><span>{item.index}</span><small>{item.label}</small></div>
                <h3>{item.promise}</h3>
                <p>{item.description}</p>
                <strong>{item.ideal}</strong>
                <ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <footer><span>{item.result}</span><button type="button" onClick={() => { setSelectedPlanIndex(id === "ia" ? 1 : 0); document.getElementById("planos")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Ver preço e detalhes <SyncArrow /></button></footer>
              </article>
            );
          })}
        </div>
      </section>

      <SyncLossSimulator onLead={openLead} />

      <section className="sync-pricing" id="planos">
        <header className="sync-section-heading">
          <div><span>04 / PLANOS SYNC</span><h2>Duas soluções.<br />Um preço claro para cada uma.</h2></div>
          <p>Escolha o nível de atendimento que resolve seu gargalo. Ambos incluem configuração e acompanhamento, sem taxa de criação.</p>
        </header>
        <div className="sync-offer-proof" aria-label="Por que começar com o Avancini Sync">
          <article><small>01 · COMEÇO SEGURO</small><strong>Sem taxa de criação</strong><span>Configuração inicial incluída na assinatura escolhida.</span></article>
          <article><small>02 · VALOR PERCEBIDO</small><strong>Menos contato esfriando</strong><span>O investimento entra onde a demora hoje custa oportunidades.</span></article>
          <article><small>03 · DECISÃO ASSISTIDA</small><strong>Primeiro validamos o cenário</strong><span>Nenhum pagamento antes de confirmar canal, fluxo e limites.</span></article>
        </div>
        <div className="sync-plan-configurator sync-single-plan-configurator">
        <div className="sync-plan-configurator-body">
          <div className="sync-plan-picker" role="group" aria-label="Escolha uma solução Sync">
            {syncPlans.map((plan, index) => <button type="button" key={plan.name} className={selectedPlanIndex === index ? "active" : ""} aria-pressed={selectedPlanIndex === index} onClick={() => setSelectedPlanIndex(index)}><small>0{index + 1} · {plan.label}</small><strong>{plan.name}</strong><span>{plan.definition}</span></button>)}
            <div className="sync-price-promise"><small>CONDIÇÃO DE LANÇAMENTO</small><strong>Configuração e acompanhamento inclusos.</strong><span>Sem taxa de criação</span></div>
          </div>
        <div className="sync-plan-grid">
            {[syncPlans[selectedPlanIndex]].map((plan) => {
              const selectedCycle = syncPaymentCycles.find((item) => item.id === paymentCycle) ?? syncPaymentCycles[0];
              const total = plan.cyclePrices[paymentCycle];
              const priceLabel = paymentCycle === "monthly"
                ? `${plan.price}${plan.suffix}`
                : `A partir de ${formatSyncPlanMoney(total)}${paymentCycle === "semiannual" ? "/semestre" : "/ano"}`;
              return <article className={selectedPlanIndex === 1 ? "featured" : ""} key={plan.name}>
              <div className="sync-plan-top"><span>0{selectedPlanIndex + 1}</span><small>{plan.label}</small><b>SEM TAXA DE CRIAÇÃO</b></div>
              <h3>{plan.name}</h3><strong>{priceLabel}</strong><p>{plan.description}</p>
              <div className="sync-plan-clarity">
                <div><b>O que é</b><span>{plan.definition}</span></div>
                <div><b>Para quem serve</b><span>{plan.fit}</span></div>
                <div><b>Na prática</b><span>{plan.example}</span></div>
              </div>
              <small className="sync-plan-includes">O QUE ENTRA</small>
              <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="sync-plan-closing">
                <div className="payment-cycle-block sync-payment-cycle-block">
                  <div className="payment-cycle-heading"><span>ESCOLHA O CICLO</span><small>Uma solução, três formas simples de pagamento</small></div>
                  <div className="payment-cycle-options" role="group" aria-label="Frequência de pagamento do Sync">
                    {syncPaymentCycles.map((option) => <button type="button" key={option.id} className={paymentCycle === option.id ? "active" : ""} aria-pressed={paymentCycle === option.id} onClick={() => setPaymentCycle(option.id)}><strong>{option.label}{option.id !== "monthly" && <i>{option.detail}</i>}</strong><span>{option.id === "monthly" ? `${formatSyncPlanMoney(plan.cyclePrices.monthly)} por mês` : option.id === "semiannual" ? `${formatSyncPlanMoney(plan.cyclePrices.semiannual)} a cada 6 meses` : `${formatSyncPlanMoney(plan.cyclePrices.annual)} à vista`}</span></button>)}
                  </div>
                  <p className="card-limit-note">No mensal, somente a mensalidade do mês é lançada no cartão e o valor total não ocupa o limite. Semestral e anual são cobrados antecipadamente.</p>
                </div>
                <button className="sync-plan-cta" type="button" onClick={() => openLead(`${plan.name} por ${priceLabel}, no ciclo ${selectedCycle.label.toLowerCase()} e sem taxa de criação`)}>
                  <span><strong>Conversar sobre {plan.name}</strong><small>Validar meu canal e entender o melhor fluxo</small></span>
                  <SyncArrow />
                </button>
                <small className="sync-plan-contact-note">Nenhum pagamento agora. Primeiro validamos o seu cenário.</small>
              </div>
            </article>})}
        </div>
        </div>
        </div>
        <div className="sync-pricing-conditions" aria-label="O que compõe o investimento">
          <div><small>INCLUÍDO NA MENSALIDADE</small><strong>Solução, configuração e acompanhamento</strong><span>O Sync é preparado para sua operação e acompanhado durante a assinatura.</span></div>
          <div><small>VALIDADO ANTES</small><strong>Canal, consumo e limites externos</strong><span>WhatsApp, APIs ou uso de IA só entram na proposta quando forem realmente necessários.</span></div>
        </div>
        <p className="sync-usage-note">Condições de lançamento sem taxa de criação. O mensal é recorrente; semestral e anual são antecipados. Custos de WhatsApp, APIs, inteligência artificial ou volume de uso são validados antes e apresentados com clareza quando forem necessários.</p>
      </section>

      <section className="sync-faq" id="duvidas">
        <div><span>05 / PERGUNTAS FREQUENTES</span><h2>Entenda antes<br />de escolher.</h2><p>Sem promessa mágica ou estrutura desnecessária.</p><button type="button" onClick={() => openLead("uma dúvida sobre o Avancini Sync")}>Falar com a Avancini <SyncArrow /></button></div>
        <div>{faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="sync-final">
        <AvanciniMark variant="sync" className="sync-final-mark avancini-a-mark" />
        <span>AVANCINI SYNC / PRÓXIMO PASSO</span><h2>Seu cliente já está falando.<br />A resposta não pode parecer genérica.</h2><p>Conte onde o atendimento trava. A gente identifica se o melhor começo é Chatbot ou Atendente IA.</p><button type="button" onClick={() => openLead("um diagnóstico para escolher entre chatbot e atendente IA")}>Descobrir por onde começar <SyncArrow /></button>
      </section>

      <footer className="sync-footer"><Link href="/" className="sync-brand"><AvanciniMark variant="sync" className="sync-brand-mark avancini-a-mark" /><span><b>AVANCINI <em>SYNC</em></b><small>Uma solução Avancini OS</small></span></Link><p>Chatbots e atendentes com IA para responder com rapidez, contexto e um próximo passo claro.</p><nav><a href="#portfolio">Demonstração</a><a href="#solucoes">Soluções</a><a href="#planos">Planos</a><Link href="/dash">Avancini Dash <SyncArrow /></Link></nav><div><a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a><a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <SyncArrow /></a></div><small>© 2026 AVANCINI OS · TODOS OS DIREITOS RESERVADOS</small></footer>

      <button className="whatsapp-float sync-whatsapp-float" type="button" aria-label="Conversar sobre o Avancini Sync no WhatsApp" onClick={() => openLead("uma solução do Avancini Sync")}>
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>
      {leadContext && (
        <div className="web-lead-modal sync-web-lead-modal" role="dialog" aria-modal="true" aria-label="Iniciar conversa pelo WhatsApp">
          <form onSubmit={submitLead}>
            <button className="web-lead-close" type="button" onClick={() => setLeadContext("")} aria-label="Fechar">×</button>
            <header>
              <AvanciniMark variant="sync" className="lead-logo avancini-a-mark" />
              <div><strong>Avancini Sync <span>· Chatbot &amp; IA</span></strong><b><i /> atendimento direto · mensagem contextualizada</b></div>
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
