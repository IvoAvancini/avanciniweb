"use client";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- As prévias roláveis precisam receber foco para funcionar também pelo teclado. */

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { trackLead, trackMarketingEvent } from "../marketing-events";
import { SectorPrototypePage, type SectorPrototypeType } from "./sector-prototypes";

const imageDimensions = {
  "/concepts/apex-cars.jpg": { width: 1400, height: 2100 },
  "/concepts/lumina-clinic.jpg": { width: 2500, height: 3748 },
  "/concepts/moreira-law.jpg": { width: 2000, height: 1058 },
  "/concepts/noma-fashion.jpg": { width: 1334, height: 2000 },
  "/concepts/atlas-villa.webp": { width: 1400, height: 770 },
  "/concepts/torque-mechanic.webp": { width: 1536, height: 1024 },
  "/concepts/nexo-dental.webp": { width: 1536, height: 1024 },
  "/concepts/caio-move.webp": { width: 1536, height: 1024 },
  "/concepts/marina-realty.webp": { width: 1536, height: 1024 },
  "/projects/san-diego-full.png": { width: 1264, height: 6720 },
  "/projects/tape-car-full.png": { width: 1264, height: 5388 },
} as const;

type SiteImageProps = Omit<ImageProps, "src" | "width" | "height"> & {
  src: string;
};

function SiteImage({ src, sizes = "(max-width: 760px) 100vw, 70vw", quality = 74, ...props }: SiteImageProps) {
  const dimensions = imageDimensions[src as keyof typeof imageDimensions] ?? { width: 1600, height: 1000 };
  return <Image src={src} width={dimensions.width} height={dimensions.height} sizes={sizes} quality={quality} {...props} />;
}

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;
const portfolioRows = [
  [
    { name: "Apex Motors", kind: "CONCEITO FICTÍCIO · VEÍCULOS", image: "/concepts/apex-cars.jpg", view: "cars", className: "web-port-cars", action: "ESTOQUE · TROCA · FINANCIAMENTO" },
    { name: "Torque Lab", kind: "CONCEITO FICTÍCIO · OFICINA MECÂNICA", image: "/concepts/torque-mechanic.webp", view: "mechanic", className: "web-port-torque", action: "DIAGNÓSTICO · OS · APROVAÇÃO" },
    { name: "Clínica San Diego", kind: "PROJETO APLICADO · REDESIGN", image: "/projects/san-diego.jpg", view: "sandiego", className: "web-port-san", action: "SERVIÇOS · CONFIANÇA · CONTATO" },
    { name: "Nexo Odonto", kind: "CONCEITO FICTÍCIO · ODONTOLOGIA", image: "/concepts/nexo-dental.webp", view: "dentistry", className: "web-port-dental", action: "TRATAMENTOS · CONFIANÇA · AGENDA" },
    { name: "Lumina", kind: "CONCEITO FICTÍCIO · ESTÉTICA", image: "/concepts/lumina-clinic.jpg", view: "aesthetics", className: "web-port-lumina", action: "PROTOCOLOS · AVALIAÇÃO · AGENDA" },
    { name: "Tape Car", kind: "PROJETO APLICADO · ESTÉTICA AUTOMOTIVA", image: "/projects/tape-car.png", view: "tapecar", className: "web-port-tape", action: "PROTEÇÃO · ESTÉTICA · ORÇAMENTO" },
  ],
  [
    { name: "Noma", kind: "CONCEITO FICTÍCIO · MODA", image: "/concepts/noma-fashion.jpg", view: "fashion", className: "web-port-noma", action: "COLEÇÃO · TAMANHOS · COMPRA" },
    { name: "Caio Move", kind: "CONCEITO FICTÍCIO · PROFISSIONAL AUTÔNOMO", image: "/concepts/caio-move.webp", view: "autonomous", className: "web-port-autonomous", action: "MÉTODO · PROGRAMAS · AGENDA" },
    { name: "Moreira & Lima", kind: "CONCEITO FICTÍCIO · ADVOCACIA", image: "/concepts/moreira-law.jpg", view: "moreira", className: "web-port-moreira", action: "ATUAÇÃO · MÉTODO · CONSULTA" },
    { name: "Marina Vale", kind: "CONCEITO FICTÍCIO · CORRETORA", image: "/concepts/marina-realty.webp", view: "realtor", className: "web-port-realtor", action: "CURADORIA · BAIRROS · VISITAS" },
    { name: "Cora Imóveis", kind: "CONCEITO FICTÍCIO · IMOBILIÁRIA", image: "/concepts/atlas-villa.webp", view: "realestate", className: "web-port-atlas", action: "BUSCA · MAPA · FAVORITOS" },
  ],
] as const;

const webPillars = [
  { number: "01", title: "Direção estratégica", text: "Antes do visual, definimos o que sua empresa precisa comunicar e qual ação o visitante deve tomar." },
  { number: "02", title: "Texto que conduz", text: "Cada título, argumento e chamada existe para transformar atenção em confiança e confiança em contato." },
  { number: "03", title: "Design com presença", text: "Hierarquia, contraste e identidade para sua empresa parecer tão profissional quanto o trabalho que entrega." },
  { number: "04", title: "Velocidade de verdade", text: "Uma experiência leve, responsiva e preparada para não perder pessoas antes mesmo da primeira impressão." },
  { number: "05", title: "Conversão no celular", text: "A jornada é desenhada primeiro para a tela que o seu cliente realmente usa: o smartphone." },
] as const;

const webFaqs = [
  { question: "Como funciona o processo de criação?", answer: "Começamos entendendo sua empresa, o público e o objetivo do site. Depois alinhamos estrutura, mensagem e direção visual antes do desenvolvimento e da publicação." },
  { question: "Landing page e site institucional são a mesma coisa?", answer: "Não. A landing concentra o visitante em uma oferta e uma ação. O site institucional apresenta a empresa inteira, organiza serviços e constrói autoridade." },
  { question: "O site funciona bem no celular?", answer: "Sim. A experiência é planejada para celular, computador e outras telas, com atenção a legibilidade, velocidade e facilidade para entrar em contato." },
  { question: "Posso usar meu próprio domínio?", answer: "Sim. Conectamos um domínio que já seja seu. Também existe a opção de usar um endereço Avancini incluso; um domínio novo é registrado separadamente e fica em seu nome." },
  { question: "Quanto tempo demora para ficar pronto?", answer: "O prazo depende da estrutura e do conteúdo disponível. Como referência, projetos diretos podem levar 7 dias e estruturas completas até 30 dias, sempre combinado antes do início." },
  { question: "A Landing Start tem qualidade inferior?", answer: "Não. Landing Start e Landing Pro recebem o mesmo padrão de estratégia, texto, design, versão mobile e acabamento. O que muda é o endereço: a Start usa um endereço Avancini e a Pro utiliza o domínio próprio do cliente." },
  { question: "O que acontece depois da publicação?", answer: "Nos planos recorrentes, hospedagem, SSL, suporte e um pequeno ajuste mensal permanecem inclusos. Esse ajuste cobre troca de texto, imagem, telefone, horário ou informação existente. No pagamento único, não existe mensalidade Avancini: domínio, hospedagem e eventuais manutenções ficam sob responsabilidade do cliente ou são contratados separadamente." },
  { question: "O que acontece se eu cancelar?", answer: "Em uma contratação recorrente, a hospedagem e a publicação são encerradas depois do período aplicável. O domínio registrado pelo cliente e os materiais fornecidos por ele continuam sendo dele. No pagamento único, a proposta esclarece a entrega dos arquivos e não existe mensalidade Avancini." },
  { question: "O site pode apresentar produtos?", answer: "Sim. O Site Institucional pode incluir um catálogo de produtos ou serviços com contato pelo WhatsApp. Quando o projeto exige carrinho, pagamento, estoque ou frete, montamos uma Loja Virtual sob medida." },
] as const;

const heroAudiences = ["EMPRESAS", "AUTÔNOMOS", "CLÍNICAS", "ESCRITÓRIOS", "MARCAS"] as const;

function HeroAudienceTypewriter() {
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = heroAudiences[audienceIndex];
    const finishedTyping = text === word;
    const finishedDeleting = text.length === 0;
    const delay = finishedTyping && !deleting ? 1450 : deleting ? 48 : 82;
    const timer = window.setTimeout(() => {
      if (finishedTyping && !deleting) {
        setDeleting(true);
        return;
      }
      if (finishedDeleting && deleting) {
        setDeleting(false);
        setAudienceIndex((index) => (index + 1) % heroAudiences.length);
        return;
      }
      setText((current) => deleting ? current.slice(0, -1) : word.slice(0, current.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [audienceIndex, deleting, text]);

  return <strong>{text}<i aria-hidden="true" /></strong>;
}

const portfolioSpotlights = {
  cars: {
    name: "Apex Motors",
    kind: "Conceito fictício · automotivo premium",
    image: "/concepts/apex-cars.jpg",
    description: "Estoque, procedência, troca e financiamento apresentados como uma jornada de compra completa.",
  },
  sandiego: {
    name: "Clínica San Diego",
    kind: "Redesign completo · projeto aplicado",
    image: "/projects/san-diego-full.png",
    description: "Uma experiência mais clara, acolhedora e preparada para transformar confiança em agendamento.",
  },
  tapecar: {
    name: "Tape Car",
    kind: "Criação do zero · projeto aplicado",
    image: "/projects/tape-car-full.png",
    description: "Uma presença digital intensa para apresentar serviços, elevar a percepção da marca e conquistar novos contatos.",
  },
  mechanic: {
    name: "Torque Lab",
    kind: "Conceito fictício · oficina mecânica",
    image: "/concepts/torque-mechanic.webp",
    description: "Diagnóstico, orçamento, aprovação e acompanhamento da ordem de serviço sem ruído.",
  },
  dentistry: {
    name: "Nexo Odonto",
    kind: "Conceito fictício · odontologia",
    image: "/concepts/nexo-dental.webp",
    description: "Uma jornada que reduz insegurança, explica possibilidades e conduz à avaliação correta.",
  },
  aesthetics: {
    name: "Lumina",
    kind: "Conceito fictício · estética avançada",
    image: "/concepts/lumina-clinic.jpg",
    description: "Tratamentos, objetivos e avaliação apresentados com elegância e sem promessas exageradas.",
  },
  autonomous: {
    name: "Caio Move",
    kind: "Conceito fictício · profissional autônomo",
    image: "/concepts/caio-move.webp",
    description: "Marca pessoal, método, programas e agenda capazes de explicar valor antes da conversa sobre preço.",
  },
  realestate: {
    name: "Cora Imóveis",
    kind: "Conceito fictício · imobiliária completa",
    image: "/concepts/atlas-villa.webp",
    description: "Busca detalhada, imóveis atualizados, favoritos, bairros e atendimento contextual em uma experiência moderna.",
  },
  moreira: {
    name: "Moreira & Lima",
    kind: "Conceito fictício · advocacia empresarial",
    image: "/concepts/moreira-law.jpg",
    description: "Sobriedade, clareza e autoridade para tornar assuntos complexos mais seguros desde o primeiro contato.",
  },
  fashion: {
    name: "Noma",
    kind: "Conceito fictício · moda autoral",
    image: "/concepts/noma-fashion.jpg",
    description: "Editorial, coleção e compra integrados em uma experiência minimalista com identidade forte.",
  },
  realtor: {
    name: "Marina Vale",
    kind: "Conceito fictício · corretora de imóveis",
    image: "/concepts/marina-realty.webp",
    description: "Marca pessoal, curadoria e bairros apresentados para transformar uma busca extensa em uma seleção útil.",
  },
} as const;

type PortfolioSpotlightType = keyof typeof portfolioSpotlights;

const offers = [
  {
    name: "Landing Page Profissional",
    price: "R$ 89,90/mês",
    deadline: "R$ 0 de taxa de criação · Contrato 12 meses",
    description: "Uma landing criada no padrão Avancini Dash com alta conversão para atrair contatos e agendamentos.",
    includes: [
      "Estratégia, texto persuasivo e design exclusivo",
      "Formulário e WhatsApp integrados",
      "Versão mobile ultrarrápida e responsiva",
      "Endereço na rede Avancini incluso (R$ 0 de entrada)",
      "Opção de .com.br próprio (+ R$ 49,90 no 1º mês sob consulta de disponibilidade)",
      "Hospedagem, SSL, suporte e 1 ajuste mensal",
    ],
    ideal: "Para serviços, consultores e ofertas diretas",
    cta: "Quero minha Landing Page",
    message: "Olá! Quero contratar a Landing Page Profissional por R$ 89,90/mês (sem taxa de criação · contrato de 12 meses).",
    question: "Olá! Tenho uma dúvida sobre a Landing Page Profissional.",
    badge: "MAIS ESCOLHIDO",
    featured: false,
  },
  {
    name: "Site Catálogo / Vitrine",
    price: "R$ 179,90/mês",
    deadline: "R$ 0 de taxa de criação · Contrato 12 meses",
    description: "Estrutura completa com vitrine para empresas que apresentam múltiplos produtos, estoques ou catálogo completo de serviços.",
    includes: [
      "Vitrine de produtos/serviços com fotos e especificações",
      "Botão de orçamento ou simulação no WhatsApp em cada item",
      "Opção de .com.br próprio (+ R$ 49,90 no 1º mês sob consulta de disponibilidade)",
      "Hospedagem de alta velocidade, SSL e suporte contínuo",
    ],
    ideal: "Para empresas com múltiplos produtos e serviços",
    cta: "Planejar meu Catálogo",
    message: "Olá! Quero contratar o Site Catálogo / Vitrine por R$ 179,90/mês (contrato de 12 meses).",
    question: "Olá! Tenho uma dúvida sobre o Site Catálogo.",
    badge: "CATÁLOGO COMPLETO",
    featured: false,
  },
  {
    name: "Combo Site + Chatbot",
    price: "R$ 249,90/mês",
    deadline: "12 meses · Vitrine + WhatsApp Automático",
    description: "Landing Page Profissional integrada ao chatbot do Avancini Sync para responder e triar clientes no WhatsApp 24/7.",
    includes: [
      "Landing Page Profissional completa",
      "Chatbot no WhatsApp com triagem e respostas 24/7",
      "Respostas automáticas e direcionamento de leads",
      "Hospedagem, suporte e 1 ajuste mensal no site e no bot",
    ],
    ideal: "Para quem quer atrair no site e triar no WhatsApp",
    cta: "Quero o Combo Chatbot",
    message: "Olá! Quero contratar o Combo Site + Chatbot por R$ 249,90/mês.",
    question: "Olá! Tenho uma dúvida sobre o Combo Site + Chatbot.",
    badge: "COMBO ESSENCIAL",
    featured: false,
  },
  {
    name: "Combo Site + Atendente IA",
    price: "R$ 429,90/mês",
    deadline: "12 meses · Vitrine + Inteligência Artificial",
    description: "A solução de elite da Avancini OS: vitrine de alta conversão integrada ao atendente com IA que entende o cliente e qualifica vendas em linguagem natural.",
    includes: [
      "Site ou Landing Page de alto padrão",
      "Atendente IA treinado no WhatsApp e Instagram",
      "Conversas em linguagem natural e qualificação ativa",
      "Hospedagem, suporte prioritário e evolução contínua",
    ],
    ideal: "Para máxima autoridade e atendimento inteligente 24/7",
    cta: "Quero o Combo com IA",
    message: "Olá! Quero contratar o Combo Site + Atendente IA por R$ 429,90/mês.",
    question: "Olá! Tenho uma dúvida sobre o Combo com IA.",
    badge: "INTELIGÊNCIA TOTAL",
    featured: true,
  },
] as const;

type ContractModel = "Assinatura mensal" | "Pagamento único" | "Quero entender as duas opções";

const briefingOptions: Record<
  ContractModel,
  readonly { project: string; investments: readonly string[] }[]
> = {
  "Assinatura mensal": [
    {
      project: "Landing Pro — domínio próprio",
      investments: ["R$ 399,90 de implantação + R$ 49,90/mês"],
    },
    {
      project: "Landing Start — sem entrada",
      investments: ["R$ 89,90/mês — endereço Avancini · permanência de 6 meses"],
    },
    {
      project: "Site institucional — implantação personalizada",
      investments: ["A partir de R$ 599,90 + hospedagem e suporte a partir de R$ 79,90/mês"],
    },
    {
      project: "Projeto sob medida — catálogo, loja ou função especial",
      investments: ["Quero uma proposta compatível com a realidade da empresa"],
    },
    {
      project: "Ainda não sei qual plano escolher",
      investments: [
        "Quero uma recomendação entre os planos",
        "Quero começar sem entrada",
        "Quero usar domínio próprio",
      ],
    },
  ],
  "Pagamento único": [
    {
      project: "Landing de Conversão — pagamento único",
      investments: ["Solicitar orçamento para uma landing"],
    },
    {
      project: "Site institucional — pagamento único",
      investments: ["Solicitar orçamento para um site institucional"],
    },
    {
      project: "Projeto Sob Medida — catálogo, loja ou função especial",
      investments: ["Solicitar orçamento personalizado"],
    },
    {
      project: "Ainda não sei qual estrutura preciso",
      investments: ["Quero uma recomendação e um orçamento"],
    },
  ],
  "Quero entender as duas opções": [
    {
      project: "Landing de Conversão",
      investments: ["Comparar mensalidade e pagamento único"],
    },
    {
      project: "Site institucional",
      investments: ["Comparar mensalidade e pagamento único"],
    },
    {
      project: "Projeto mais completo ou exclusivo",
      investments: ["Entender qual contratação faz mais sentido"],
    },
    {
      project: "Ainda não sei",
      investments: ["Quero receber uma recomendação"],
    },
  ],
};

const contractModelHelp: Record<ContractModel, string> = {
  "Assinatura mensal": "Criação profissional com hospedagem, SSL, suporte e continuidade inclusos.",
  "Pagamento único": "Você paga uma vez pelo projeto, sem mensalidade Avancini. Domínio, hospedagem e manutenção ficam sob sua responsabilidade ou são contratados à parte.",
  "Quero entender as duas opções": "Você recebe uma comparação clara para decidir sem compromisso.",
};

const timelineOptionsFor = (project: string) => {
  if (project.includes("Landing")) return ["Em até 7 dias", "Em até 15 dias", "Quero alinhar o prazo"] as const;
  if (project.toLocaleLowerCase("pt-BR").includes("site institucional")) return ["Em até 15 dias", "Em até 30 dias", "Quero alinhar o prazo"] as const;
  return ["Em até 30 dias", "A combinar conforme o escopo"] as const;
};

function PortfolioConceptPage({ type }: { type: PortfolioSpotlightType }) {
  if (type === "sandiego") return (
    <div className="portfolio-full-page sandiego-full-page">
      <section className="sandiego-hero">
        <nav>
          <strong><i>SD</i><span>CLÍNICA SAN DIEGO<small>CUIDADO MÉDICO INTEGRADO</small></span></strong>
          <div><span>Especialidades</span><span>Equipe</span><span>Exames</span><span>Contato</span></div>
          <button type="button">AGENDAR CONSULTA</button>
        </nav>
        <div className="sandiego-copy">
          <small>SAÚDE COM ESCUTA, CLAREZA E CONTINUIDADE</small>
          <h2>Cuidado completo.<br /><em>Em cada etapa.</em></h2>
          <p>Consultas, exames e acompanhamento reunidos em uma experiência simples para você entender o próximo passo e se sentir bem cuidado.</p>
          <div><button type="button">AGENDAR ATENDIMENTO ↗</button><span><i /> Atendimento particular e convênios</span></div>
        </div>
        <div className="sandiego-visual">
          <SiteImage src="/concepts/lumina-clinic.jpg" alt="Profissional de saúde em atendimento cuidadoso" />
          <aside><small>PRÓXIMO HORÁRIO</small><strong>Hoje · 16:40</strong><span>Confirmação pelo WhatsApp</span></aside>
        </div>
      </section>
      <div className="sandiego-trust"><span><b>12+</b> especialidades</span><span><b>4.9</b> avaliação simulada</span><span><b>24h</b> para retorno de exames</span><span><b>1 só lugar</b> para acompanhar sua saúde</span></div>
      <section className="sandiego-services">
        <header><small>ESPECIALIDADES</small><h3>Você não precisa descobrir<br />sozinho por onde começar.</h3><p>A equipe orienta o atendimento certo e mantém seu histórico organizado ao longo do cuidado.</p></header>
        <div>{[["01", "Clínica médica", "Avaliação ampla para entender sintomas e organizar os próximos passos."], ["02", "Cardiologia", "Prevenção, exames e acompanhamento com explicações claras."], ["03", "Saúde da mulher", "Cuidado próximo em diferentes fases, com privacidade e acolhimento."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h4>{title}</h4><p>{copy}</p><b>CONHECER ↗</b></article>)}</div>
      </section>
      <section className="sandiego-journey"><div><small>SUA JORNADA</small><h3>Da primeira conversa<br />ao acompanhamento.</h3></div><ol><li><b>01</b><span>Conte o que precisa</span><em>A equipe identifica a especialidade adequada.</em></li><li><b>02</b><span>Escolha o melhor horário</span><em>Confirmação e orientações chegam no celular.</em></li><li><b>03</b><span>Acompanhe sua saúde</span><em>Histórico, exames e retorno seguem conectados.</em></li></ol></section>
      <section className="sandiego-final"><small>SEU CUIDADO PODE COMEÇAR AGORA</small><h3>Encontre o atendimento certo.</h3><button type="button">FALAR COM A CLÍNICA ↗</button></section>
    </div>
  );

  if (type === "tapecar") return null;
  const sectorType: SectorPrototypeType = type === "moreira" ? "law" : type;
  return <SectorPrototypePage type={sectorType} />;
}
const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

function WebOpportunitySimulator({ onLead }: { onLead: (message: string) => void }) {
  const [monthlyDemand, setMonthlyDemand] = useState(250);
  const [currentContacts, setCurrentContacts] = useState(8);
  const [additionalContacts, setAdditionalContacts] = useState(10);
  const [averageTicket, setAverageTicket] = useState(300);
  const [goal, setGoal] = useState<"oferta" | "empresa" | "vendas">("empresa");

  const monthlyOpportunity = additionalContacts * averageTicket;
  const yearlyOpportunity = monthlyOpportunity * 12;
  const recommendation = {
    oferta: { name: "Landing de Conversão", reason: "Para transformar uma oferta específica em uma jornada curta até o contato." },
    empresa: { name: "Site Institucional", reason: "Para apresentar a empresa com autoridade, organizar serviços e gerar confiança antes da conversa." },
    vendas: { name: "Projeto Personalizado", reason: "Para catálogo, loja ou experiência com recursos próprios de venda e atendimento." },
  }[goal];

  return (
    <section className="web-opportunity" aria-labelledby="web-opportunity-title">
      <header>
        <div><span>SIMULAÇÃO DE OPORTUNIDADE</span><h2 id="web-opportunity-title">Quanto pode custar<br /><em>continuar invisível?</em></h2></div>
        <p>Não é só sobre ter um site bonito. É sobre quantas pessoas não encontram sua empresa, não sentem confiança ou escolhem quem parece mais preparado.</p>
      </header>
      <div className="web-opportunity-console">
        <div className="web-opportunity-inputs">
          <div className="opportunity-live"><i /> EDITE AS PREMISSAS DA SUA EMPRESA <small>SIMULAÇÃO, NÃO PROMESSA</small></div>
          <fieldset className="dash-opportunity-choice">
            <legend>Qual resultado você precisa primeiro?</legend>
            <div>
              <button className={goal === "oferta" ? "active" : ""} type="button" onClick={() => setGoal("oferta")}><span>01</span>Divulgar uma oferta</button>
              <button className={goal === "empresa" ? "active" : ""} type="button" onClick={() => setGoal("empresa")}><span>02</span>Apresentar a empresa</button>
              <button className={goal === "vendas" ? "active" : ""} type="button" onClick={() => setGoal("vendas")}><span>03</span>Vender pela internet</button>
            </div>
          </fieldset>
          <label><span><b>Pessoas procurando seu serviço</b><small>estimativa mensal</small></span><output>{monthlyDemand}</output><input type="range" min="50" max="2000" step="50" value={monthlyDemand} onChange={(event) => setMonthlyDemand(Number(event.target.value))} /></label>
          <label><span><b>Quantas conversas chegam até você hoje?</b><small>contatos recebidos no mês</small></span><output>{currentContacts}</output><input type="range" min="1" max="100" value={currentContacts} onChange={(event) => setCurrentContacts(Number(event.target.value))} /></label>
          <label><span><b>Quantos novos contatos justificariam o projeto?</b><small>uma quantidade possível para simular</small></span><output>+{additionalContacts}</output><input type="range" min="1" max="50" value={additionalContacts} onChange={(event) => setAdditionalContacts(Number(event.target.value))} /></label>
          <label><span><b>Valor médio de um novo cliente</b><small>ticket ou primeira compra</small></span><output>{formatMoney(averageTicket)}</output><input type="range" min="50" max="5000" step="50" value={averageTicket} onChange={(event) => setAverageTicket(Number(event.target.value))} /></label>
        </div>
        <div className="web-opportunity-result" aria-live="polite">
          <div className="opportunity-result-top"><span>PROJEÇÃO COM AS PREMISSAS ACIMA</span><b>REF:// DASH · {String(monthlyDemand).padStart(4, "0")}</b></div>
          <div className="opportunity-current"><small>CONVERSAS QUE VOCÊ RECEBE HOJE</small><strong>{currentContacts}<em>/mês</em></strong><p>Você informou {currentContacts} contatos diante de uma procura estimada de {monthlyDemand} pessoas pelo serviço.</p></div>
          <div className="opportunity-arrow" aria-hidden="true"><i /><b>+{additionalContacts} novas conversas</b><i /></div>
          <div className="opportunity-route"><span>Cliente procura</span><i>→</i><span>Compara quem transmite confiança</span><i>→</i><span>Escolhe com quem conversar</span></div>
          <div className="opportunity-potential"><small>POTENCIAL MENSAL DESTRAVADO</small><strong>{formatMoney(monthlyOpportunity)}<em>/mês</em></strong><p>Equivale a cerca de <b>{additionalContacts} novas conversas</b> se sua presença digital capturar um pouco melhor.</p></div>
          <div className="dash-opportunity-recommendation"><div><small>MELHOR PRIMEIRO PASSO PARA ESTE OBJETIVO</small><strong>{recommendation.name}</strong><p>{recommendation.reason}</p></div><span>QUALIDADE COMPLETA<br /><b>estrutura conforme o objetivo</b></span></div>
          <footer><div><small>EM 12 MESES NESTE CENÁRIO</small><strong>{formatMoney(yearlyOpportunity)}</strong></div><button type="button" onClick={() => onLead(`Quero conversar sobre ${recommendation.name}. Na simulação, usei ${monthlyDemand} pessoas procurando o serviço por mês, ${currentContacts} contatos atuais, ${additionalContacts} novas conversas como cenário e ticket médio de ${formatMoney(averageTicket)}.`)}>Quero transformar presença em clientes <b>↗</b></button></footer>
        </div>
      </div>
      <small className="opportunity-disclaimer">Estimativa educativa baseada nos valores que você escolheu. Não representa garantia de tráfego, conversão ou faturamento. O diagnóstico real considera mercado, oferta, canal e operação.</small>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadIntent, setLeadIntent] = useState("Quero solicitar um orçamento para um site profissional da Avancini Dash.");
  const [budgetTransition, setBudgetTransition] = useState<{ title: string } | null>(null);
  const budgetTimerRef = useRef<number | null>(null);
  const leadInputRef = useRef<HTMLInputElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [fidelityMode, setFidelityMode] = useState<"com-fidelidade" | "sem-fidelidade">("com-fidelidade");
  const [portfolioSpotlight, setPortfolioSpotlight] = useState<PortfolioSpotlightType | null>(null);
  const [projectType, setProjectType] = useState("Site institucional — implantação personalizada");
  const [contractModel, setContractModel] = useState<ContractModel>("Assinatura mensal");
  const [segment, setSegment] = useState("");
  const [goal, setGoal] = useState("Gerar mais contatos");
  const [investment, setInvestment] = useState("A partir de R$ 599,90 + hospedagem e suporte a partir de R$ 79,90/mês");
  const [timeline, setTimeline] = useState("Em até 30 dias");
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      window.history.replaceState(null, "", href);
      document.querySelector(href)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 120);
  };
  useEffect(() => {
    const root = document.documentElement;
    const heroScene = document.querySelector<HTMLElement>(".web-hero-scene");
    const hero = heroScene?.querySelector<HTMLElement>(".hero");
    root.classList.add("web-motion");

    let frame = 0;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        setScrolled(currentScroll > 18);
        root.classList.toggle("web-scrolling-down", currentScroll > lastScrollY && currentScroll > 160);
        lastScrollY = currentScroll;

        if (heroScene && hero) {
          const rect = heroScene.getBoundingClientRect();
          const distance = Math.max(heroScene.offsetHeight - window.innerHeight, 1);
          const progress = Math.min(1, Math.max(0, -rect.top / distance));
          hero.style.setProperty("--web-hero-copy-x", `${progress * -58}px`);
          hero.style.setProperty("--web-hero-copy-y", `${progress * -24}px`);
          hero.style.setProperty("--web-hero-copy-opacity", String(1 - progress * 0.62));
          hero.style.setProperty("--web-hero-copy-scale", String(1 - progress * 0.055));
          hero.style.setProperty("--web-hero-blur", `${progress * 2.8}px`);
          hero.style.setProperty("--web-hero-a-x", `${progress * -135}px`);
          hero.style.setProperty("--web-hero-a-y", `${progress * 32}px`);
          hero.style.setProperty("--web-hero-a-scale", String(1 + progress * 0.16));
          hero.style.setProperty("--web-hero-a-rotate", `${progress * -4.5}deg`);
          hero.style.setProperty("--web-hero-a-opacity", String(0.92 - progress * 0.55));
          hero.style.setProperty("--web-hero-a-blur", `${progress * 3.2}px`);
          hero.style.setProperty("--web-hero-orbit-x", `${progress * -72}px`);
          hero.style.setProperty("--web-hero-orbit-scale", String(1 + progress * 0.1));
          hero.style.setProperty("--web-hero-orbit-opacity", String(1 - progress * 0.65));
          hero.style.setProperty("--web-hero-grid-opacity", String(0.72 - progress * 0.5));
          hero.style.setProperty("--web-hero-stage-x", `${progress * 72}px`);
          hero.style.setProperty("--web-hero-stage-y", `${progress * 24}px`);
          hero.style.setProperty("--web-hero-stage-scale", String(1 - progress * 0.045));
          hero.style.setProperty("--web-hero-stage-opacity", String(1 - progress * 0.5));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("web-motion", "web-scrolling-down");
    };
  }, []);
  useEffect(() => {
    if (!portfolioSpotlight && !menuOpen && !leadOpen && !budgetTransition) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (budgetTimerRef.current !== null) {
          window.clearTimeout(budgetTimerRef.current);
          budgetTimerRef.current = null;
        }
        setPortfolioSpotlight(null);
        setMenuOpen(false);
        setLeadOpen(false);
        setBudgetTransition(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [portfolioSpotlight, menuOpen, leadOpen, budgetTransition]);

  useEffect(() => () => {
    if (budgetTimerRef.current !== null) window.clearTimeout(budgetTimerRef.current);
  }, []);

  useEffect(() => {
    if (!leadOpen) return;
    const frame = window.requestAnimationFrame(() => leadInputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [leadOpen]);

  const activeSpotlight = portfolioSpotlight ? portfolioSpotlights[portfolioSpotlight] : null;
  const openPortfolioItem = (view: string) => {
    trackMarketingEvent("portfolio_open", { project: view });
    setPortfolioSpotlight(view as PortfolioSpotlightType);
  };

  const availableProjects = briefingOptions[contractModel];
  const selectedProject = availableProjects.find((option) => option.project === projectType) ?? availableProjects[0];
  const timelineOptions = timelineOptionsFor(projectType);

  const openLead = (intent: string) => {
    setLeadIntent(intent);
    setLeadError("");
    setLeadOpen(true);
  };

  const startBudgetConversation = (title: string, intent: string) => {
    if (budgetTimerRef.current !== null) window.clearTimeout(budgetTimerRef.current);
    setBudgetTransition({ title });
    trackMarketingEvent("budget_transition", { offer: title });
    budgetTimerRef.current = window.setTimeout(() => {
      budgetTimerRef.current = null;
      setBudgetTransition(null);
      openLead(intent);
    }, 1350);
  };

  const changeContractModel = (nextModel: ContractModel) => {
    const firstProject = briefingOptions[nextModel][0];
    setContractModel(nextModel);
    setProjectType(firstProject.project);
    setInvestment(firstProject.investments[0]);
    setTimeline(timelineOptionsFor(firstProject.project)[0]);
  };

  const changeProjectType = (nextProject: string) => {
    const project = briefingOptions[contractModel].find((option) => option.project === nextProject);
    setProjectType(nextProject);
    if (project) {
      setInvestment(project.investments[0]);
      setTimeline(timelineOptionsFor(nextProject)[0]);
    }
  };

  const submitBudget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackLead("briefing_principal", { projectType, contractModel, goal });
    const message = [
      "Olá! Conheci a Avancini Dash e quero conversar sobre um projeto.",
      `Tipo: ${projectType}`,
      `Contratação: ${contractModel}`,
      `Segmento: ${segment || "Ainda vou explicar"}`,
      `Objetivo: ${goal}`,
      `Investimento previsto: ${investment}`,
      `Prazo desejado: ${timeline}`,
    ].join("\n");
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = leadName.trim().replace(/\s+/g, " ");
    if (cleanName.length < 2) {
      setLeadError("Digite seu nome para continuar.");
      return;
    }
    setLeadError("");
    trackLead("whatsapp_modal", { name: cleanName });
    const message = `Olá! Meu nome é ${cleanName}. ${leadIntent}`;
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
    setLeadOpen(false);
  };

  return (
    <main className="web-page">
      <div className="page-progress" aria-hidden="true" />
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="logo" href="#inicio" aria-label="Avancini Dash, início">
          <span className="logo-mark avancini-a-mark" aria-hidden="true">
            <i />
          </span>
          <span>
            <span className="brand-name">
              AVANCINI <b>DASH</b>
            </span>
            <small>Presença que trabalha</small>
          </span>
        </a>
        <nav className="nav" aria-label="Navegação principal">
          <a href="#investimento" onClick={() => setMenuOpen(false)}>
            Serviços
          </a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>
            Projetos
          </a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>
            Método
          </a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Orçamento
          </a>
        </nav>
        <div className="web-ecosystem-switch" aria-label="Navegar entre as soluções Avancini">
          <Link className="button button-small header-cta header-sync-cta" href="/sync">
            Avancini Sync <span>↗</span>
          </Link>
          <Link className="button button-small header-cta" href="/">
            Avancini OS <span>↗</span>
          </Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <i className="menu-glyph" aria-hidden="true"><span /><span /><span /></i>
          <b>{menuOpen ? "Fechar" : "Menu"}</b>
        </button>
      </header>
      {menuOpen && (
        <div className="web-menu-overlay" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="web-menu-top">
            <span>NAVEGAÇÃO <i /> 06 SEÇÕES</span>
            <div className="web-menu-network" aria-label="Ecossistema Avancini">
              <Link href="/" onClick={() => setMenuOpen(false)}>AVANCINI OS ↗</Link>
              <Link href="/sync" onClick={() => setMenuOpen(false)}>AVANCINI SYNC ↗</Link>
            </div>
            <button type="button" onClick={() => setMenuOpen(false)}>× <b>FECHAR</b><small>ESC</small></button>
          </div>
          <nav>
            {[
              ["01", "Início", "#inicio"],
              ["02", "Portfólio", "#portfolio"],
              ["03", "Metodologia", "#metodo"],
              ["04", "Serviços e planos", "#investimento"],
              ["05", "Dúvidas", "#duvidas"],
              ["06", "Contato", "#contato"],
            ].map(([number, label, href]) => <a href={href} key={number} onClick={(event) => navigateFromMenu(event, href)}><small>{number}</small><span>{label}</span><b>↗</b></a>)}
          </nav>
          <div className="web-menu-bottom"><span><i /> SEU PROJETO PODE COMEÇAR POR UMA CONVERSA</span><button type="button" onClick={() => { setMenuOpen(false); startBudgetConversation("Seu novo site", "Quero solicitar um orçamento para um site profissional da Avancini Dash."); }}>SOLICITAR ORÇAMENTO ↗</button></div>
        </div>
      )}

      <div className="web-hero-scene">
      <section className="hero hero-reference" id="inicio">
        <div className="hero-art-backdrop" aria-hidden="true">
          <span className="hero-a-mark avancini-a-mark"><i /></span>
          <i className="art-scan" />
          <i className="art-flare" />
        </div>
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="red-sweep" aria-hidden="true" />
        <div className="kinetic-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="hero-copy">
          <div className="eyebrow hero-typewriter">
            <span /> Criação de site profissional para <HeroAudienceTypewriter />
          </div>
          <h1>
            Tenha hoje um site
            <br />bonito, rápido e que
            <br /><em>gere novos clientes.</em>
          </h1>
          <p>
            Para quem ainda não tem site ou sente que o atual ficou para trás.
            Uma presença profissional para ser encontrado, gerar confiança e
            abrir novas conversas todos os dias.
          </p>
          <div className="hero-brand-promise" aria-label="Sites impossíveis de ignorar. Preparados para vender.">
            <span>Sites impossíveis de ignorar.</span>
            <i aria-hidden="true" />
            <strong>Preparados para vender.</strong>
          </div>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => startBudgetConversation("Seu novo site", "Quero solicitar um orçamento para criar ou modernizar o site da minha empresa.")}>
              Solicitar orçamento <span>↗</span>
            </button>
            <a className="button button-ghost" href="#portfolio">
              Ver projetos <span>↓</span>
            </a>
          </div>
          <div className="hero-choice-strip" id="escolhas" aria-label="Opções de site por assinatura">
            <a href="/site-por-assinatura#plano-landing-page">
              <small>DOMÍNIO PRÓPRIO · MENOR MENSALIDADE</small>
              <strong>Landing Pro</strong>
              <span>R$ 399,90 + R$ 49,90/mês ↗</span>
            </a>
            <a href="/site-por-assinatura#plano-site-catalogo">
              <small>SEM ENTRADA · MESMA QUALIDADE</small>
              <strong>Landing Start</strong>
              <span>R$ 89,90/mês · 6 meses ↗</span>
            </a>
            <a href="/site-por-assinatura#plano-site">
              <small>EMPRESA · SERVIÇOS · AUTORIDADE</small>
              <strong>Site Institucional</strong>
              <span>Implantação a partir de R$ 599,90 ↗</span>
            </a>
          </div>
          <div className="hero-trust">
            <span>Opção sem entrada</span>
            <span>Hospedagem e suporte inclusos</span>
            <span>Mesma qualidade em todas as opções</span>
          </div>
        </div>
      </section>
      </div>

      <section className="web-portfolio-first" id="portfolio" aria-labelledby="web-portfolio-title">
        <header>
          <div><span>PORTFÓLIO / PROJETOS & CONCEITOS</span><h2 id="web-portfolio-title">Sites que fazem<br />a marca parecer maior.</h2></div>
          <div className="web-portfolio-guide">
            <span className="web-portfolio-ref" aria-label="Referência, onze experiências">
              REF:// CASES · 11 <i aria-hidden="true" />
            </span>
            <p>Veja como estratégia, mensagem e design elevam a percepção de uma empresa e preparam cada clique para virar oportunidade.</p>
            <span className="web-portfolio-drag-note">PROJETOS EM MOVIMENTO · CLIQUE PARA AMPLIAR <b aria-hidden="true">↗</b></span>
          </div>
        </header>
        <div className="web-portfolio-marquee">
          {portfolioRows.map((row, rowIndex) => (
            <div className="web-portfolio-row" key={rowIndex}>
              <div className="web-portfolio-track">
                {[...row, ...row].map((item, index) => (
                  <button type="button" onClick={() => openPortfolioItem(item.view)} className={`web-portfolio-item ${item.className}`} key={`${item.name}-${index}`} aria-hidden={index >= row.length || undefined} tabIndex={index >= row.length ? -1 : undefined} aria-label={index < row.length ? `Ampliar projeto ${item.name}` : undefined}>
                    <SiteImage src={item.image} alt={index < row.length ? item.name : ""} sizes="(max-width: 760px) 78vw, 28vw" quality={82} />
                    <span><strong>{item.name}</strong><em><i />{item.action}</em><b>Ampliar projeto ↗</b></span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="web-portfolio-all"><strong>Escolha um segmento, amplie e role dentro da experiência completa sem sair da página.</strong><span>11 EXPERIÊNCIAS COMPLETAS ↗</span></div>
      </section>

      <WebOpportunitySimulator onLead={(message) => startBudgetConversation("Simulação de oportunidade digital", message)} />

      <section className="signal-bar" aria-label="Especialidades da Avancini Dash">
        <div className="signal-track">
          {[0, 1].flatMap((copy) => [
            ["✦", "Design estratégico"], ["◇", "Segurança e clareza"], ["↗", "SEO técnico"], ["▣", "Mobile-first"], ["◎", "Foco em conversão"], ["◉", "Suporte próximo"],
          ].map(([icon, label]) => <p aria-hidden={copy === 1 || undefined} key={`${copy}-${label}`}><span>{icon}</span>{label}</p>))}
        </div>
      </section>

      <section className="web-proof-snapshot" aria-label="O que você pode explorar na Avancini Dash">
        <a href="#portfolio"><strong>02</strong><span>projetos aplicados<br />para explorar por inteiro</span><b>Ver projetos reais ↗</b></a>
        <a href="#portfolio"><strong>9</strong><span>conceitos por segmento<br />com experiências navegáveis</span><b>Explorar conceitos ↗</b></a>
        <a href="#metodo"><strong>7–30</strong><span>dias conforme a<br />complexidade do projeto</span><b>Entender o método ↗</b></a>
        <a href="#investimento"><strong>4 caminhos</strong><span>recorrente ou pagamento<br />único sob medida</span><b>Comparar opções ↗</b></a>
      </section>

      <section className="section web-method" id="metodo">
        <div className="section-heading web-method-heading">
          <div><span className="section-index">METODOLOGIA / 05 PILARES</span><h2>Site bonito chama atenção.<br />Estratégia transforma em cliente.</h2></div>
          <p>Sem estes pilares trabalhando juntos, até um visual impressionante vira apenas decoração.</p>
        </div>
        <div className="web-method-stack">
          {webPillars.map((pillar) => (
            <article data-step={pillar.number} key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="section web-diagnostic" id="diagnostico">
        <div className="web-diagnostic-heading">
          <span>DIAGNÓSTICO ANTES DO DESIGN</span>
          <h2>E se você soubesse onde está perdendo clientes antes de investir?</h2>
          <p>Dá para descobrir. É exatamente por aí que a Avancini começa.</p>
        </div>
        <div className="web-diagnostic-grid">
          <div className="web-diagnostic-copy">
            <p>Antes de desenhar, analisamos como sua empresa aparece, o que oferece e qual caminho o visitante percorre até o contato.</p>
            <ul><li><b>Presença e autoridade</b><span>O cliente entende quem você é e por que confiar?</span></li><li><b>Clareza da oferta</b><span>Fica evidente o que você vende e para quem?</span></li><li><b>Caminho até o contato</b><span>WhatsApp, formulário e chamadas aparecem no momento certo?</span></li></ul>
          </div>
          <div className="web-diagnostic-panel">
            <div className="diagnostic-search"><span>⌕</span> clínica de estética <b>SIMULAÇÃO VISUAL</b></div>
            <div className="diagnostic-head"><span>PALAVRA-CHAVE</span><b>BUSCAS/MÊS</b><em>INTENÇÃO</em></div>
            {[
              ["clínica de estética", "6.600", "alta", "72%"],
              ["limpeza de pele profissional", "4.400", "alta", "63%"],
              ["harmonização facial", "9.900", "média", "48%"],
              ["tratamento de pele", "880", "média", "84%"],
            ].map(([label, metric, intent, width]) => <div className="diagnostic-row" key={label}><span>{label}<i style={{width}} /></span><b>{metric}</b><em>{intent}</em></div>)}
            <div className="diagnostic-summary"><span><small>DEMANDA SIMULADA</small><b>21.780 buscas/mês</b></span><span><small>OPORTUNIDADE PROJETADA</small><b>Alcance nacional</b></span></div>
          </div>
        </div>
        <div className="web-diagnostic-notes"><article><b>✦ O DIFERENCIAL</b><p>O diagnóstico vira a base da estrutura, do texto e das prioridades do seu projeto. Nada construído no escuro.</p></article><article><b>↗ O RESULTADO</b><p>Você entende o que precisa melhorar antes de escolher entre landing, site institucional ou projeto exclusivo.</p></article></div>
        <div className="web-diagnostic-cta"><h3>Primeiro você enxerga o caminho. Só depois escolhe como construir.</h3><button type="button" onClick={() => startBudgetConversation("Diagnóstico do projeto", "Quero começar pelo diagnóstico e entender qual estrutura faz mais sentido para minha empresa.")}>COMEÇAR PELO DIAGNÓSTICO <span>↗</span></button></div>
      </section>

      <section className="section manifesto" id="sobre">
        <div className="section-index">
          SOBRE A AVANCINI DASH
        </div>
        <div className="manifesto-grid">
          <h2>
            O Dash posiciona sua empresa antes da primeira conversa.
          </h2>
          <div>
            <p>
              A Avancini Dash é a especialização da Avancini OS que transforma
              empresas em experiências digitais profissionais, rápidas e fáceis
              de entender.
            </p>
            <p className="highlight-line">
              Não entregamos um modelo genérico. Organizamos sua mensagem,
              construímos sua presença e deixamos o caminho até o contato claro.
            </p>
          </div>
        </div>
        <div className="impact-line decision-line" aria-label="Escolha rápida de serviço">
          <a href="/site-por-assinatura#plano-landing-page" onClick={() => trackMarketingEvent("quick_choice", { choice: "landing" })}>
            <small>QUERO DIVULGAR UMA OFERTA</small><b>Landing Page</b><span>Ver plano ↗</span>
          </a>
          <a href="/site-por-assinatura#plano-site" onClick={() => trackMarketingEvent("quick_choice", { choice: "site" })}>
            <small>QUERO APRESENTAR A EMPRESA</small><b>Site Profissional</b><span>Ver plano ↗</span>
          </a>
          <a href={whatsappFor("Olá! Conheci a Avancini Dash e quero ajuda para escolher entre uma landing page e um site profissional.")} target="_blank" rel="noreferrer" onClick={() => trackLead("duvida_escolha_servico")}>
            <small>AINDA NÃO SEI QUAL ESCOLHER</small><b>Receber orientação</b><span>Falar no WhatsApp ↗</span>
          </a>
        </div>
      </section>

      <section className="section process" id="processo">
        <div className="process-intro">
          <span className="section-index">
            05 — DO PRIMEIRO CONTATO AO LANÇAMENTO
          </span>
          <h2>
            Um processo claro.
            <br />
            Um resultado marcante.
          </h2>
          <p>
            Você acompanha as decisões importantes sem precisar entender de
            tecnologia. A Avancini Dash transforma seus objetivos em uma
            experiência digital pronta para crescer.
          </p>
          <a
            className="text-cta"
            href={whatsappFor("Olá! Vi o processo de criação da Avancini Dash e quero começar um projeto para minha empresa.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackLead("processo")}
          >
            Começar meu projeto <span>↗</span>
          </a>
        </div>
        <div className="process-steps">
          <article>
            <span>01</span>
            <div>
              <small>IMERSÃO</small>
              <h3>Entendemos sua empresa</h3>
              <p>
                Objetivos, público, diferenciais e a percepção que sua marca
                precisa transmitir.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <small>ESTRATÉGIA & DESIGN</small>
              <h3>Criamos uma presença única</h3>
              <p>
                Mensagem, estrutura e visual construídos para orientar e
                impressionar.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <small>LANÇAMENTO</small>
              <h3>Seu novo site entra em cena</h3>
              <p>
                Responsivo, rápido e preparado para receber seus próximos
                clientes.
              </p>
            </div>
          </article>
        </div>
        <div className="delivery-strip" aria-label="Prazos disponíveis para entrega">
          <div><small>PRAZO DEFINIDO ANTES DE COMEÇAR</small><strong>Entrega combinada com clareza.</strong></div>
          <span><b>7 dias</b><small>Estruturas diretas</small></span>
          <span><b>15 dias</b><small>Projetos intermediários</small></span>
          <span><b>30 dias</b><small>Estruturas completas</small></span>
          <em>O prazo começa após o recebimento do conteúdo necessário.</em>
        </div>
      </section>

      <section className="section investment" id="investimento">
        <div className="section-heading">
          <div>
            <span className="section-index">06 — INVESTIMENTO & PRAZO</span>
            <h2>O investimento precisa fazer sentido antes do primeiro clique.</h2>
          </div>
          <p>
            Compare objetivo, entrega e compromisso com clareza. O padrão de
            criação é o mesmo; muda a estrutura que você precisa e a forma de
            contratar.
          </p>
        </div>
        <div className="offer-guide" aria-label="Comparação entre landing page e site institucional">
          <article>
            <i className="offer-guide-icon" aria-hidden="true">◎</i>
            <span>QUERO VENDER UMA OFERTA</span>
            <h3>Landing de Conversão</h3>
            <p>Uma jornada curta para anunciar um serviço, reduzir dúvidas e levar o visitante a uma única ação.</p>
            <div><b>Anúncios</b><b>Campanhas</b><b>Captação</b></div>
          </article>
          <div className="offer-guide-or">OU</div>
          <article>
            <i className="offer-guide-icon" aria-hidden="true">▦</i>
            <span>QUERO APRESENTAR MINHA EMPRESA</span>
            <h3>Site Institucional</h3>
            <p>Uma estrutura completa para organizar serviços, diferenciais, conteúdo, autoridade e contatos.</p>
            <div><b>Presença</b><b>Navegação</b><b>Autoridade</b></div>
          </article>
        </div>
        <div className="offer-standard" aria-label="O que está presente em toda entrega Avancini Dash">
          <div><small>EM TODA ENTREGA</small><strong>O essencial não vira adicional.</strong></div>
          <span><b>01</b> Estratégia e texto</span>
          <span><b>02</b> Design adaptado à marca</span>
          <span><b>03</b> Celular e carregamento rápido</span>
          <span><b>04</b> Publicação e contato integrado</span>
        </div>

        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-toggle" role="group" aria-label="Opção de contratação">
            <button
              type="button"
              className={fidelityMode === "com-fidelidade" ? "active" : ""}
              onClick={() => setFidelityMode("com-fidelidade")}
            >
              ✨ Contrato 12 Meses <span className="badge-pill">R$ 0 Criação</span>
            </button>
            <button
              type="button"
              className={fidelityMode === "sem-fidelidade" ? "active" : ""}
              onClick={() => setFidelityMode("sem-fidelidade")}
            >
              🔓 Sem Fidelidade <span className="badge-pill">Cancele quando quiser</span>
            </button>
          </div>
        </div>

        <div className="offer-grid">
          {offers.map((offer) => {
            const isFidelity = fidelityMode === "com-fidelidade";
            const badgeText = isFidelity ? (offer.badge ?? "CONTRATO 12 MESES") : "SEM FIDELIDADE";
            const deadlineText = isFidelity
              ? offer.deadline
              : offer.name.includes("Landing")
                ? "R$ 490 à vista + R$ 89,90/mês · sem permanência"
                : offer.name.includes("Catálogo")
                  ? "R$ 790 à vista + R$ 179,90/mês · sem permanência"
                  : offer.name.includes("Chatbot")
                    ? "R$ 690 à vista + R$ 249,90/mês · sem permanência"
                    : "R$ 990 à vista + R$ 429,90/mês · sem permanência";
            return (
            <article className={offer.featured ? "offer-card featured" : "offer-card"} key={offer.name}>
              <small>{badgeText}</small>
              <h3>{offer.name}</h3>
              <strong>{offer.price}</strong>
              <span>{deadlineText}</span>
              <p>{offer.description}</p>
              <em className="offer-ideal">{offer.ideal}</em>
              <ul>
                {offer.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="offer-actions">
                <div className="offer-action-head">
                  <span>PRÓXIMO PASSO</span>
                  <small>Conversa direta e sem compromisso</small>
                </div>
                <div className="offer-action-row">
                  <button
                    type="button"
                    className="offer-primary"
                    onClick={() => startBudgetConversation(offer.name, offer.message.replace("Olá! ", ""))}
                  >
                    {offer.cta} <b aria-hidden="true">↗</b>
                  </button>
                  <a
                    className="offer-question"
                    href={whatsappFor(offer.question)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackLead("duvida_plano", { offer: offer.name })}
                  >
                    Tirar uma dúvida
                  </a>
                </div>
              </div>
            </article>
            );
          })}
        </div>
        <p className="investment-note">Todos os planos contam com a mesma qualidade de estratégia, texto persuasivo, design exclusivo e desenvolvimento de alta performance. Sem taxa de criação no contrato de 12 meses. O registro do domínio próprio .com.br possui taxa anual de R$ 49,90 no 1º mês (sujeito à consulta prévia de disponibilidade no Registro.br).</p>
      </section>

      <section className="section web-faq" id="duvidas">
        <div className="web-faq-intro"><span>PERGUNTAS FREQUENTES</span><h2>Tire suas dúvidas<br /><em>antes de começar.</em></h2><p>As perguntas que mais aparecem antes de iniciar um projeto. Não encontrou a sua?</p><button type="button" onClick={() => openLead("Tenho uma dúvida sobre os serviços da Avancini Dash antes de começar meu projeto.")}>FALAR COM A AVANCINI <b>↗</b></button></div>
        <div className="web-faq-list">{webFaqs.map((item)=><details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="final-cta" id="briefing-legado">
        <div className="cta-grid" />
        <div className="cta-orb" />
        <div className="eyebrow">
          <span /> Sua marca pode ocupar mais espaço
        </div>
        <div className="budget-copy">
          <h2>Vamos descobrir o projeto certo para sua empresa.</h2>
          <p>
            Responda seis pontos rápidos. O WhatsApp será aberto com um briefing
            organizado para a conversa já começar no lugar certo.
          </p>
          <div className="budget-proof">
            <span>01 · Sem formulário infinito</span>
            <span>02 · Resposta direta</span>
            <span>03 · Sem compromisso</span>
          </div>
        </div>
        <form className="budget-form" onSubmit={submitBudget}>
          <label>
            <span>Como deseja contratar?</span>
            <select value={contractModel} onChange={(event) => changeContractModel(event.target.value as ContractModel)}>
              <option>Assinatura mensal</option>
              <option>Pagamento único</option>
              <option>Quero entender as duas opções</option>
            </select>
            <small className="budget-context" aria-live="polite">{contractModelHelp[contractModel]}</small>
          </label>
          <label>
            <span>O que você precisa?</span>
            <select value={projectType} onChange={(event) => changeProjectType(event.target.value)}>
              {availableProjects.map((option) => <option key={option.project}>{option.project}</option>)}
            </select>
          </label>
          <label>
            <span>Qual é o segmento da empresa? <small>(opcional)</small></span>
            <input value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: clínica, imobiliária, restaurante" />
          </label>
          <label>
            <span>Principal objetivo</span>
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option>Gerar mais contatos</option>
              <option>Vender online</option>
              <option>Transmitir mais autoridade</option>
              <option>Divulgar um serviço específico</option>
            </select>
          </label>
          <div className="budget-row">
            <label>
              <span>Condição de investimento</span>
              <select value={investment} onChange={(event) => setInvestment(event.target.value)}>
                {selectedProject.investments.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>
              <span>Prazo desejado</span>
              <select value={timeline} onChange={(event) => setTimeline(event.target.value)}>
                {timelineOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
          <button className="button button-primary button-xl" type="submit">
            Enviar briefing pelo WhatsApp <span>↗</span>
          </button>
          <small>Você revisa a mensagem antes de enviar.</small>
        </form>
      </section>

      {activeSpotlight && portfolioSpotlight && (
        <div
          className="niche-modal portfolio-spotlight-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Projeto ${activeSpotlight.name}`}
        >
          <div className="niche-modal-dialog portfolio-spotlight-dialog">
            <button
              className="preview-close"
              type="button"
              onClick={() => setPortfolioSpotlight(null)}
              aria-label="Fechar projeto"
            >
              ×
            </button>
            <div className="preview-browser-bar">
              <div><i /><i /><i /></div>
              <span>{activeSpotlight.name}</span>
              <b>{activeSpotlight.kind}</b>
            </div>
            <div className="niche-full-scroll portfolio-case-scroll" role="region" tabIndex={0} aria-label={`Página completa do projeto ${activeSpotlight.name}`}>
              {portfolioSpotlight === "tapecar" ? (
                <SiteImage src={activeSpotlight.image} alt={`Página completa do projeto ${activeSpotlight.name}`} sizes="94vw" quality={82} />
              ) : <PortfolioConceptPage type={portfolioSpotlight} />}
            </div>
            <div className="niche-scroll-note">
              <span>↓</span> Role dentro da tela para navegar pelo projeto
            </div>
            <div className="preview-sales-cta">
              <span>{activeSpotlight.description}</span>
              <a href={whatsappFor(`Olá! Gostei do projeto ${activeSpotlight.name} e quero conversar sobre uma direção parecida para minha empresa.`)} target="_blank" rel="noreferrer" onClick={() => trackLead("portfolio_spotlight", { project: activeSpotlight.name })}>Quero algo nesse nível <b>↗</b></a>
            </div>
          </div>
        </div>
      )}

      <footer id="contato">
        <div className="footer-top">
          <div className="footer-brand"><a className="logo footer-logo" href="#inicio">
            <span className="logo-mark avancini-a-mark" aria-hidden="true">
              <i />
            </span>
            <span>
              <span className="brand-name">
                AVANCINI <b>DASH</b>
              </span>
              <small>Uma solução Avancini OS</small>
            </span>
          </a><p>Sites com identidade, velocidade e estratégia para transformar presença em oportunidade.</p><a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
          <nav><b>NAVEGAÇÃO</b><a href="#inicio">Início</a><a href="#portfolio">Portfólio</a><a href="#metodo">Metodologia</a><a href="#investimento">Serviços e planos</a><a href="#duvidas">Perguntas frequentes</a><Link href="/">Avancini OS ↗</Link><Link href="/sync">Avancini Sync ↗</Link></nav>
          <nav><b>SERVIÇOS</b><a href="/site-por-assinatura#plano-landing-page">Landing Page Profissional</a><a href="/site-por-assinatura#plano-site-catalogo">Site Catálogo</a><a href="/site-por-assinatura#plano-site-catalogo">Site Catálogo / Vitrine</a><a href="/site-por-assinatura#plano-combo-os">Combo Avancini OS</a><a href="/site-por-assinatura#projeto-sob-medida">Projeto Sob Medida</a></nav>
          <div className="footer-contact"><b>CONTATO</b><a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a><a href="tel:+5573981019782">(73) 98101-9782</a><button type="button" onClick={() => startBudgetConversation("Orçamento Avancini Dash", "Quero solicitar um orçamento para um projeto de site com a Avancini Dash.")}>SOLICITAR ORÇAMENTO ↗</button></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Avancini OS</span>
          <nav aria-label="Informações legais"><a href="/privacidade">Privacidade</a><a href="/termos">Termos</a></nav>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <button
        type="button"
        className="whatsapp-float"
        aria-label="Falar com a Avancini Dash no WhatsApp"
        onClick={() => { trackLead("botao_flutuante"); openLead("Quero conversar sobre um site profissional para minha empresa."); }}
      >
        <span className="whatsapp-icon" aria-hidden="true" />
        <i className="whatsapp-notification" aria-hidden="true">1</i>
      </button>
      {budgetTransition && (
        <div className="budget-transition" role="status" aria-live="polite">
          <div className="budget-transition-orbit" aria-hidden="true"><i /><i /><i /></div>
          <span className="budget-transition-mark avancini-a-mark" aria-hidden="true"><i /></span>
          <div className="budget-transition-copy">
            <small>PREPARANDO UMA CONVERSA SOBRE</small>
            <strong>{budgetTransition.title}</strong>
            <span><i /></span>
          </div>
        </div>
      )}
      {leadOpen && (
        <div
          className="web-lead-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Iniciar conversa pelo WhatsApp"
        >
          <form onSubmit={submitLead}>
            <button
              className="web-lead-close"
              type="button"
              onClick={() => setLeadOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <header>
              <span className="lead-logo avancini-a-mark"><i /></span>
              <div>
                <strong>
                  Avancini Dash <span>· Especialista em UI Design</span>
                </strong>
                <b><i /> atendimento direto · mensagem contextualizada</b>
              </div>
            </header>
            <p className="lead-promise">
              {leadIntent}
            </p>
            <label className="lead-name-field">
              <span aria-hidden="true">✦</span>
              <input
                required
                ref={leadInputRef}
                minLength={2}
                maxLength={60}
                value={leadName}
                onChange={(event) => { setLeadName(event.target.value); if (leadError) setLeadError(""); }}
                placeholder="Seu nome"
                autoComplete="name"
                aria-label="Seu nome"
                aria-invalid={Boolean(leadError)}
                aria-describedby={leadError ? "lead-name-error" : undefined}
              />
            </label>
            {leadError && <p className="lead-error" id="lead-name-error" role="alert">{leadError}</p>}
            <button className="lead-submit" type="submit">
              ABRIR CONVERSA NO WHATSAPP
            </button>
            <small>A mensagem já está organizada e você pode editá-la antes de enviar.</small>
          </form>
        </div>
      )}
    </main>
  );
}
