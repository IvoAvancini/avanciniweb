"use client";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- As prévias roláveis precisam receber foco para funcionar também pelo teclado. */

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import Image, { type ImageProps } from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AvanciniMark } from "../avancini-mark";
import { trackLead, trackMarketingEvent } from "../marketing-events";
import type { SectorShowcaseType } from "./sector-showcases";

const SectorShowcasePage = dynamic(
  () => import("./sector-showcases").then((module) => module.SectorShowcasePage),
  { ssr: false },
);

const WebArrow = ({ size = 12 }: { size?: number }) => (
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
    className="dash-svg-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const WebDownArrow = ({ size = 12 }: { size?: number }) => (
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
    className="dash-svg-down-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

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
  "/concepts/aurea-salon-v3.webp": { width: 1672, height: 941 },
  "/concepts/moreira-law-v2.webp": { width: 1672, height: 941 },
  "/concepts/solaris/hero.jpg": { width: 1600, height: 1000 },
  "/concepts/cora-penthouse.jpg": { width: 1600, height: 1000 },
  "/concepts/nike-hero.jpg": { width: 1600, height: 1000 },
  "/concepts/tapecar-studio.jpg": { width: 1600, height: 1000 },
  "/projects/san-diego-full.png": { width: 1264, height: 6720 },
  "/projects/tape-car-full.png": { width: 1264, height: 5388 },
  "/projects/san-diego-preview.webp": { width: 1400, height: 900 },
  "/projects/tape-car-preview.webp": { width: 1400, height: 900 },
} as const;

type SiteImageProps = Omit<ImageProps, "src" | "width" | "height"> & {
  src: string;
};

function SiteImage({ src, sizes, quality, ...props }: SiteImageProps & { sizes?: string; quality?: number }) {
  const dimensions = imageDimensions[src as keyof typeof imageDimensions] ?? { width: 1600, height: 1000 };
  return (
    <Image
      src={src}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      quality={quality}
      loading="lazy"
      {...props}
    />
  );
}

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;

const portfolioRows = [
  [
    { name: "Solaris Energia", kind: "ENERGIA SOLAR & FINANCIAMENTO", image: "/concepts/solaris/hero.jpg", view: "solar", className: "web-port-solar", action: "SIMULAÇÃO · PROJETO · FINANCIAMENTO" },
    { name: "MOTORA // Ecossistema", kind: "CONCESSIONÁRIA PREMIUM", image: "/concepts/apex-cars.jpg", view: "cars", className: "web-port-cars", action: "ESTOQUE · COMPARADOR · FINANCIAMENTO" },
    { name: "Cora Imóveis", kind: "MANSÕES & PENTHOUSES", image: "/concepts/cora-penthouse.jpg", view: "realestate", className: "web-port-atlas", action: "RADAR · SIMULADOR SAC · VISITA" },
    { name: "Tape Car", kind: "PROJETO REAL · ESTÉTICA AUTOMOTIVA", image: "/projects/tape-car-preview.webp", view: "tapecar", className: "web-port-tape", action: "PROTEÇÃO · ESTÉTICA · CUIDADO" },
    { name: "Clínica San Diego", kind: "PROJETO REAL · CLÍNICA MÉDICA", image: "/projects/san-diego-preview.webp", view: "sandiego", className: "web-port-san", action: "CUIDADO · PREVENÇÃO · CONFIANÇA" },
  ],
  [
    { name: "Caio Move", kind: "CONSULTORIA ESPORTIVA & PERSONAL", image: "/concepts/caio-move.webp", view: "autonomous", className: "web-port-caio", action: "MÉTODO · PROGRAMAS · AGENDA" },
    { name: "Dr. Augusto Moreira", kind: "PORTFÓLIO · ADVOCACIA EMPRESARIAL", image: "/concepts/moreira-law-v2.webp", view: "moreira", className: "web-port-law", action: "ATUAÇÃO · MÉTODO · CONSULTA" },
    { name: "Nexo Odonto", kind: "ODONTOLOGIA ESTÉTICA & IMPLANTES", image: "/concepts/nexo-dental.webp", view: "dentistry", className: "web-port-nexo", action: "TRATAMENTOS · CONFIANÇA · AGENDA" },
    { name: "Auréa Atelier", kind: "SALÃO DE BELEZA & VISAGISMO", image: "/concepts/aurea-salon-v3.webp", view: "salon", className: "web-port-salon", action: "AGENDA · SERVIÇOS · CURADORIA" },
    { name: "Vértice // E-commerce", kind: "MODA ESPORTIVA & STREETWEAR", image: "/concepts/nike-hero.jpg", view: "fashion", className: "web-port-noma", action: "COLEÇÃO 2026 · SACOLA VIP" },
  ],
] as const;

const webPillars = [
  { number: "01", title: "Direção estratégica", text: "Antes do visual, definimos o que sua empresa precisa comunicar e qual ação o visitante deve tomar." },
  { number: "02", title: "Texto que conduz", text: "Cada título, argumento e chamada existe para transformar atenção em confiança e confiança em contato." },
  { number: "03", title: "Design com presença", text: "Hierarquia, contraste e identidade para sua empresa parecer tão profissional quanto o trabalho que entrega." },
  { number: "04", title: "Velocidade que converte", text: "Uma experiência leve, responsiva e pensada primeiro para o celular, a tela que o seu cliente realmente usa." },
] as const;

const webFaqs = [
  { question: "Como funciona o processo de criação?", answer: "Começamos entendendo sua empresa, o público e o objetivo do site. Depois alinhamos estrutura, mensagem e direção visual antes do desenvolvimento e da publicação." },
  { question: "Landing page e site institucional são a mesma coisa?", answer: "Não. A landing concentra o visitante em uma oferta e uma ação. O site institucional apresenta a empresa inteira, organiza serviços e constrói autoridade." },
  { question: "O site funciona bem no celular?", answer: "Sim. A experiência é planejada para celular, computador e outras telas, com atenção a legibilidade, velocidade e facilidade para entrar em contato." },
  { question: "Posso usar meu próprio domínio?", answer: "Sim. Conectamos um domínio que já seja seu. Se precisar registrar um novo .com.br, verificamos disponibilidade e condições antes do início." },
  { question: "Quanto tempo demora para ficar pronto?", answer: "O prazo depende da estrutura e do conteúdo disponível. Como referência, projetos diretos podem levar 7 dias e estruturas completas até 30 dias, sempre combinado antes do início." },
  { question: "A opção sem entrada tem qualidade inferior?", answer: "Não. Estratégia, texto, design, versão mobile e acabamento seguem o mesmo padrão. O que muda é a forma de contratação e o endereço escolhido, nunca o cuidado com a entrega." },
  { question: "O que acontece depois da publicação ou se eu cancelar?", answer: "Hospedagem, SSL, suporte e um pequeno ajuste mensal permanecem inclusos enquanto a assinatura estiver ativa. No mensal, você pode encerrar antes da próxima renovação. No semestral ou anual, o serviço permanece ativo até o fim do período já contratado." },
  { question: "Preciso entender de tecnologia?", answer: "Não. Você explica seu negócio e envia as informações essenciais. A Avancini organiza estratégia, texto, visual, publicação e suporte para entregar tudo funcionando." },
] as const;

const heroAudiences = ["EMPRESAS", "AUTÔNOMOS", "CLÍNICAS", "ESCRITÓRIOS", "MARCAS"] as const;

function HeroAudienceTypewriter() {
  const [audienceIndex, setAudienceIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAudienceIndex((index) => (index + 1) % heroAudiences.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  const audience = heroAudiences[audienceIndex];
  return <strong key={audience}>{audience}<i aria-hidden="true" /></strong>;
}

const portfolioSpotlights = {
  solar: {
    name: "Solaris Energia",
    kind: "Demonstração interativa · energia solar",
    image: "/concepts/solaris/hero.jpg",
    description: "Orçamento guiado, simulador de economia, financiamento em até 96x, processo e projetos apresentados em uma jornada de alta conversão.",
  },
  cars: {
    name: "Apex Motors",
    kind: "Demonstração interativa · superesportivos & blindados",
    image: "/concepts/apex-cars.jpg",
    description: "Estoque VIP, estúdio 360°, laudo Dekra e simulador de financiamento completo.",
  },
  sandiego: {
    name: "Clínica San Diego",
    kind: "Projeto real · Clínica Médica e Vacinas",
    image: "/projects/san-diego-full.png",
    description: "Uma experiência mais clara, acolhedora e preparada para transformar confiança em agendamento.",
  },
  tapecar: {
    name: "Tape Car",
    kind: "Projeto real · estética automotiva",
    image: "/projects/tape-car-full.png",
    description: "Climatização, insulfilm, som e acessórios automotivos com acabamento cuidadoso e orientação direta sem complicação.",
  },
  autonomous: {
    name: "Caio Move",
    kind: "Demonstração interativa · consultoria esportiva & personal",
    image: "/concepts/caio-move.webp",
    description: "Metodologia de treino inteligente, app exclusivo, acompanhamento postural e simulador de metas no WhatsApp.",
  },
  dentistry: {
    name: "Nexo Odonto",
    kind: "Demonstração interativa · odontologia estética & implantes 3D",
    image: "/concepts/nexo-dental.webp",
    description: "Lentes de contato em porcelana 3D, implantes guiados por computador, sedação consciente sem dor e pré-diagnóstico digital.",
  },
  realestate: {
    name: "Cora Imóveis",
    kind: "Demonstração interativa · mansões & penthouses",
    image: "/concepts/cora-penthouse.jpg",
    description: "Curadoria patrimonial, mapa radar interativo, simulador SAC e agendamento privativo.",
  },
  moreira: {
    name: "Dr. Augusto Moreira",
    kind: "Portfólio profissional · advocacia empresarial",
    image: "/concepts/moreira-law-v2.webp",
    description: "Trajetória, áreas de atuação, mesa de decisão estratégica e simulador de diagnóstico jurídico imediato.",
  },
  salon: {
    name: "Auréa Atelier",
    kind: "Demonstração interativa · salão de beleza & visagismo",
    image: "/concepts/aurea-salon-v3.webp",
    description: "Visagismo autoral, mechas exclusivas, concierge e simulador de rituais com reserva no WhatsApp.",
  },
  fashion: {
    name: "Nike Lab // Aether",
    kind: "Demonstração interativa · E-commerce & Sportswear",
    image: "/concepts/nike-hero.jpg",
    description: "E-commerce de alta performance, amortecimento Air Max, tecidos técnicos Dri-FIT e sacola de compras com checkout integrado.",
  },
  realtor: {
    name: "Marina Vale",
    kind: "Demonstração interativa · corretora de imóveis",
    image: "/concepts/marina-realty.webp",
    description: "Marca pessoal, curadoria e bairros apresentados para transformar uma busca extensa em uma seleção útil.",
  },
} as const;

type PortfolioSpotlightType = keyof typeof portfolioSpotlights;

type PaymentCycle = "monthly" | "semiannual" | "annual";

const paymentCycleOptions = [
  { id: "monthly", label: "Mensal", detail: "Cobrança recorrente" },
  { id: "semiannual", label: "Semestral", detail: "20% de economia" },
  { id: "annual", label: "Anual à vista", detail: "30% de economia" },
] as const;

const formatPlanMoney = (value: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
}).format(value);

const offers = [
  {
    name: "Landing Page Profissional",
    startingAt: false,
    decisionLabel: "CAPTAR PARA UMA OFERTA",
    decisionAnswer: "Uma página · uma ação principal",
    flexiblePrice: "R$ 59,90/mês",
    flexibleCyclePrices: { monthly: 59.9, semiannual: 289.9, annual: 499.9 },
    flexibleCreationFee: "R$ 299,90",
    creationFeeAmount: 299.9,
    description: "Uma landing criada no padrão Avancini Dash com alta conversão para atrair contatos e agendamentos.",
    scope: "1 página estratégica · 1 objetivo principal · conteúdo alinhado no briefing",
    includes: [
      "Estratégia, texto persuasivo e design exclusivo",
      "Formulário e WhatsApp integrados",
      "Versão mobile ultrarrápida e responsiva",
      "Endereço na rede Avancini incluso (R$ 0 de entrada)",
      "Opção de domínio .com.br próprio, sujeita à disponibilidade e análise",
      "Hospedagem, SSL, suporte e 1 ajuste mensal",
    ],
    ideal: "Para serviços, consultores e ofertas diretas",
    cta: "Quero minha Landing Page",
    question: "Olá! Tenho uma dúvida sobre a Landing Page Profissional.",
    badge: "MAIS ESCOLHIDO",
    featured: false,
  },
  {
    name: "Site Institucional",
    startingAt: true,
    decisionLabel: "APRESENTAR A EMPRESA",
    decisionAnswer: "Autoridade · serviços · contatos",
    flexiblePrice: "A partir de R$ 79,90/mês",
    flexibleCyclePrices: { monthly: 79.9, semiannual: 379.9, annual: 669.9 },
    flexibleCreationFee: "A partir de R$ 399,90",
    creationFeeAmount: 399.9,
    description: "Uma presença completa para apresentar a empresa, organizar serviços e transmitir autoridade antes da conversa.",
    scope: "Estrutura inicial de até 5 páginas · escopo ampliável após o briefing",
    includes: [
      "Estrutura institucional com páginas e navegação",
      "Serviços, diferenciais, contatos e chamadas para ação",
      "Opção de domínio .com.br próprio, sujeita à disponibilidade e análise",
      "Hospedagem de alta velocidade, SSL e suporte contínuo",
    ],
    ideal: "Para empresas que precisam apresentar sua estrutura com clareza",
    cta: "Planejar meu Site",
    message: "Olá! Quero conversar sobre um Site Institucional da Avancini Dash.",
    question: "Olá! Tenho uma dúvida sobre o Site Institucional.",
    badge: "PRESENÇA COMPLETA",
    featured: false,
  },
  {
    name: "Loja Virtual",
    startingAt: true,
    decisionLabel: "VENDER PELO SITE",
    decisionAnswer: "Carrinho · pagamento · pedidos",
    flexiblePrice: "A partir de R$ 119,90/mês",
    flexibleCyclePrices: { monthly: 119.9, semiannual: 579.9, annual: 999.9 },
    flexibleCreationFee: "A partir de R$ 599,90",
    creationFeeAmount: 599.9,
    description: "Para vender dentro do site com carrinho, pagamento, entrega e gestão dos pedidos.",
    scope: "Escopo definido por catálogo, pagamento, frete, estoque e plataforma escolhida",
    includes: [
      "Catálogo com variações de produto",
      "Carrinho e pagamento integrados",
      "Configuração de entrega ou retirada",
      "Orientação para estoque, pedidos e plataforma",
    ],
    ideal: "Para roupas, acessórios, cosméticos, brinquedos e outros produtos físicos",
    cta: "Planejar minha Loja",
    message: "Olá! Quero conversar sobre uma Loja Virtual da Avancini Dash.",
    question: "Olá! Tenho uma dúvida sobre Loja Virtual, catálogo, pagamento e entrega.",
    badge: "VENDA DENTRO DO SITE",
    featured: false,
  },
] as const;

function PortfolioConceptPage({ type }: { type: PortfolioSpotlightType }) {
  if (type === "sandiego" || type === "tapecar") return null;
  const sectorType: SectorShowcaseType = type === "moreira" ? "law" : (type as SectorShowcaseType);
  return <SectorShowcasePage type={sectorType} />;
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

type DashOpportunityGoal = "oferta" | "empresa" | "vendas";

const dashOpportunityGoals = {
  oferta: {
    name: "Landing de Conversão",
    reason: "Para concentrar uma campanha ou oferta em uma única ação, sem dispersar o visitante.",
    wins: 4,
    ticket: 250,
    winsLabel: "Quantos clientes adicionais formam um cenário possível?",
    winsHint: "escolha uma hipótese conservadora, não uma promessa",
    ticketLabel: "Valor médio de cada contratação",
    ticketHint: "ticket da oferta anunciada",
    route: ["Vê a campanha", "Entende a oferta", "Pede orçamento"],
    potentialLabel: "VALOR DESTE CENÁRIO HIPOTÉTICO",
    outcome: "novos clientes",
  },
  empresa: {
    name: "Site Institucional",
    reason: "Para apresentar a empresa com autoridade, organizar serviços e gerar confiança antes da conversa.",
    wins: 3,
    ticket: 300,
    winsLabel: "Quantos clientes adicionais formam um cenário possível?",
    winsHint: "escolha uma hipótese conservadora, não uma promessa",
    ticketLabel: "Valor médio de um novo cliente",
    ticketHint: "primeira compra ou contratação",
    route: ["Procura a empresa", "Compara confiança", "Entra em contato"],
    potentialLabel: "VALOR DESTE CENÁRIO HIPOTÉTICO",
    outcome: "novos clientes",
  },
  vendas: {
    name: "Loja Virtual",
    reason: "Para vender produtos no próprio site com catálogo, carrinho, pagamento, entrega e gestão dos pedidos.",
    wins: 12,
    ticket: 180,
    winsLabel: "Quantos pedidos adicionais formam um cenário possível?",
    winsHint: "escolha uma hipótese conservadora, não uma promessa",
    ticketLabel: "Ticket médio de cada pedido",
    ticketHint: "valor médio do carrinho",
    route: ["Descobre o produto", "Adiciona ao carrinho", "Conclui o pedido"],
    potentialLabel: "VALOR DESTE CENÁRIO HIPOTÉTICO",
    outcome: "novos pedidos",
  },
} as const;

function WebOpportunitySimulator({ onLead }: { onLead: (message: string) => void }) {
  const [additionalWins, setAdditionalWins] = useState(3);
  const [averageTicket, setAverageTicket] = useState(300);
  const [goal, setGoal] = useState<DashOpportunityGoal>("empresa");

  const currentGoal = dashOpportunityGoals[goal];
  const monthlyOpportunity = additionalWins * averageTicket;
  const yearlyOpportunity = monthlyOpportunity * 12;
  const chooseGoal = (nextGoal: DashOpportunityGoal) => {
    const next = dashOpportunityGoals[nextGoal];
    setGoal(nextGoal);
    setAdditionalWins(next.wins);
    setAverageTicket(next.ticket);
  };

  return (
    <section className="web-opportunity" aria-labelledby="web-opportunity-title">
      <header>
        <div><span>SIMULAÇÃO DE OPORTUNIDADE</span><h2 id="web-opportunity-title">Quanto pode custar<br /><em>continuar invisível?</em></h2></div>
        <p>Escolha uma hipótese simples e veja o valor envolvido. O cálculo usa somente clientes adicionais × valor médio, sem porcentagem escondida ou promessa de resultado.</p>
      </header>
      <div className="web-opportunity-console">
        <div className="web-opportunity-inputs">
          <div className="opportunity-live"><i /> EDITE AS PREMISSAS DA SUA EMPRESA <small>SIMULAÇÃO, NÃO PROMESSA</small></div>
          <fieldset className="dash-opportunity-choice">
            <legend>Qual resultado você precisa primeiro?</legend>
            <div>
              <button aria-pressed={goal === "oferta"} className={goal === "oferta" ? "active" : ""} type="button" onClick={() => chooseGoal("oferta")}><span>01</span>Divulgar uma oferta</button>
              <button aria-pressed={goal === "empresa"} className={goal === "empresa" ? "active" : ""} type="button" onClick={() => chooseGoal("empresa")}><span>02</span>Apresentar a empresa</button>
              <button aria-pressed={goal === "vendas"} className={goal === "vendas" ? "active" : ""} type="button" onClick={() => chooseGoal("vendas")}><span>03</span>Vender pela internet</button>
            </div>
          </fieldset>
          <label><span><b>{currentGoal.winsLabel}</b><small>{currentGoal.winsHint}</small></span><output>+{additionalWins}</output><input aria-label={currentGoal.winsLabel} type="range" min="1" max="50" value={additionalWins} onChange={(event) => setAdditionalWins(Number(event.target.value))} /></label>
          <label><span><b>{currentGoal.ticketLabel}</b><small>{currentGoal.ticketHint}</small></span><output>{formatMoney(averageTicket)}</output><input aria-label={currentGoal.ticketLabel} type="range" min="50" max="5000" step="50" value={averageTicket} onChange={(event) => setAverageTicket(Number(event.target.value))} /></label>
          <div className="dash-opportunity-formula">
            <small>CÁLCULO DIRETO</small>
            <div><strong>{additionalWins} {currentGoal.outcome}</strong><b>×</b><strong>{formatMoney(averageTicket)}</strong></div>
            <span>Quantidade adicional escolhida × valor médio informado</span>
          </div>
        </div>
        <div className="web-opportunity-result" aria-live="polite">
          <div className="opportunity-result-top"><span>CENÁRIO CRIADO COM AS SUAS PREMISSAS</span><b>REF:// DASH · {goal.toUpperCase()}</b></div>
          <div className="opportunity-current opportunity-current-copy"><small>O QUE ESTE NÚMERO SIGNIFICA</small><strong>{additionalWins}<em>{currentGoal.outcome}</em></strong><p>Esta hipótese ajuda a enxergar a ordem de grandeza da oportunidade. Não é uma previsão automática.</p></div>
          <div className="opportunity-arrow" aria-hidden="true"><i /><b>+{additionalWins} {currentGoal.outcome}</b><i /></div>
          <div className="opportunity-route"><span>{currentGoal.route[0]}</span><i>→</i><span>{currentGoal.route[1]}</span><i>→</i><span>{currentGoal.route[2]}</span></div>
          <div className="opportunity-potential"><small>{currentGoal.potentialLabel}</small><strong>{formatMoney(monthlyOpportunity)}<em>/mês</em></strong><p>Cálculo direto: <b>{additionalWins} {currentGoal.outcome}</b> × {formatMoney(averageTicket)} de valor médio.</p></div>
          <div className="dash-opportunity-recommendation"><div><small>MELHOR PRIMEIRO PASSO PARA ESTE OBJETIVO</small><strong>{currentGoal.name}</strong><p>{currentGoal.reason}</p></div><span>QUALIDADE COMPLETA<br /><b>estrutura conforme o objetivo</b></span></div>
          <footer><div><small>EM 12 MESES, SE O CENÁRIO SE REPETIR</small><strong>{formatMoney(yearlyOpportunity)}</strong></div><button type="button" onClick={() => onLead(`Quero conversar sobre ${currentGoal.name}. Montei uma hipótese de ${additionalWins} ${currentGoal.outcome} adicionais por mês, com valor médio de ${formatMoney(averageTicket)}.`)}>Quero avaliar este cenário <b>↗</b></button></footer>
        </div>
      </div>
      <small className="opportunity-disclaimer">Simulação educativa baseada somente nos valores escolhidos por você. Não representa média de mercado, garantia de tráfego, conversão ou faturamento.</small>
    </section>
  );
}


function DashBeforeAfterSlider() {
  return (
    <section className="dash-comparison-section" id="antes-depois">
      <div className="section-heading" style={{ margin: "0 auto 40px", maxWidth: "1240px" }}>
        <div>
          <span className="section-index">PROJETO REAL · CLÍNICA SAN DIEGO</span>
          <h2>O site anterior de um lado.<br />O projeto aprovado do outro.</h2>
        </div>
        <p>Role dentro de cada janela para percorrer os dois projetos do início ao fim. A comparação usa somente o site antigo e a Clínica San Diego real criada no padrão Avancini Dash.</p>
      </div>

      <div className="dash-comparison-browsers">
        <article className="dash-comparison-browser dash-comparison-before-browser">
          <header><span><i /><i /><i /></span><strong>ANTES · SITE PÚBLICO ATUAL</strong><a href="https://clinicasandiego.com.br/" target="_blank" rel="noreferrer">ABRIR ↗</a></header>
          <div className="dash-comparison-live-site">
            <iframe src="https://clinicasandiego.com.br/" title="Site público da Clínica San Diego" loading="lazy" />
          </div>
          <footer><span>ROLE DENTRO DA JANELA</span><b>Site real · navegação completa</b></footer>
        </article>

        <article className="dash-comparison-browser dash-comparison-after-browser">
          <header><span><i /><i /><i /></span><strong>DEPOIS · CLÍNICA SAN DIEGO REAL</strong><em>PROJETO APLICADO</em></header>
          <div className="dash-comparison-project" role="region" tabIndex={0} aria-label="Projeto completo e real da Clínica San Diego, role para navegar">
            <SiteImage src="/projects/san-diego-full.png" alt="Site completo e real da Clínica San Diego" sizes="72vw" quality={82} />
          </div>
          <footer><span>ROLE DENTRO DA JANELA</span><b>Experiência completa · do topo ao rodapé</b></footer>
        </article>
      </div>
      <div className="dash-comparison-verdict">
        <span>O QUE MUDA</span>
        <p><b>Antes:</b> informação dispersa e uma identidade que não acompanha o nível do atendimento.</p>
        <p><b>Depois:</b> proposta clara, hierarquia, confiança e caminhos objetivos até o agendamento.</p>
      </div>
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
  const menuDialogRef = useRef<HTMLDivElement | null>(null);
  const portfolioDialogRef = useRef<HTMLDivElement | null>(null);
  const menuCloseRef = useRef<HTMLButtonElement | null>(null);
  const portfolioCloseRef = useRef<HTMLButtonElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
  const [paymentCycle, setPaymentCycle] = useState<PaymentCycle>("monthly");
  const [portfolioSpotlight, setPortfolioSpotlight] = useState<PortfolioSpotlightType | null>(null);

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      window.history.replaceState(null, "", href);
      document.querySelector(href)?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 120);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
          hero.style.setProperty("--web-hero-copy-y", `${progress * -32}px`);
          hero.style.setProperty("--web-hero-copy-opacity", String(1 - progress * 0.25));
          hero.style.setProperty("--web-hero-copy-scale", String(1 - progress * 0.035));
          hero.style.setProperty("--web-hero-blur", "0px");
          hero.style.setProperty("--web-hero-a-x", `${progress * -135}px`);
          hero.style.setProperty("--web-hero-a-y", `${progress * 32}px`);
          hero.style.setProperty("--web-hero-a-scale", String(1 + progress * 0.16));
          hero.style.setProperty("--web-hero-a-rotate", `${progress * -4.5}deg`);
          hero.style.setProperty("--web-hero-a-opacity", String(0.92 - progress * 0.2));
          hero.style.setProperty("--web-hero-a-blur", "0px");
          hero.style.setProperty("--web-hero-orbit-x", `${progress * -72}px`);
          hero.style.setProperty("--web-hero-orbit-scale", String(1 + progress * 0.1));
          hero.style.setProperty("--web-hero-orbit-opacity", String(1 - progress * 0.28));
          hero.style.setProperty("--web-hero-grid-opacity", String(0.72 - progress * 0.22));
          hero.style.setProperty("--web-hero-stage-x", `${progress * 72}px`);
          hero.style.setProperty("--web-hero-stage-y", `${progress * 24}px`);
          hero.style.setProperty("--web-hero-stage-scale", String(1 - progress * 0.045));
          hero.style.setProperty("--web-hero-stage-opacity", String(1 - progress * 0.22));
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
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus({ preventScroll: true });
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

  useEffect(() => {
    if (!menuOpen) return;
    const frame = window.requestAnimationFrame(() => menuCloseRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [menuOpen]);

  useEffect(() => {
    if (!portfolioSpotlight) return;
    const frame = window.requestAnimationFrame(() => portfolioCloseRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [portfolioSpotlight]);

  const activeSpotlight = portfolioSpotlight ? portfolioSpotlights[portfolioSpotlight] : null;
  const openPortfolioItem = (view: string) => {
    trackMarketingEvent("portfolio_open", { project: view });
    setPortfolioSpotlight(view as PortfolioSpotlightType);
  };
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
          <AvanciniMark variant="dash" className="logo-mark avancini-a-mark" />
          <span>
            <span className="brand-name">
              AVANCINI <b>DASH</b>
            </span>
            <small>Presença que trabalha</small>
          </span>
        </a>
        <nav className="nav" aria-label="Navegação principal">
          <a href="#configurar-plano" onClick={() => setMenuOpen(false)}>
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
            Avancini Sync <WebArrow />
          </Link>
          <Link className="button button-small header-cta" href="/">
            Avancini OS <WebArrow />
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
        <div ref={menuDialogRef} tabIndex={-1} className="web-menu-overlay" role="dialog" aria-modal="true" aria-label="Menu principal">
          <div className="web-menu-top">
            <span>NAVEGAÇÃO <i /> 07 SEÇÕES</span>
            <div className="web-menu-network" aria-label="Ecossistema Avancini">
              <Link href="/" onClick={() => setMenuOpen(false)}>AVANCINI OS <WebArrow /></Link>
              <Link href="/sync" onClick={() => setMenuOpen(false)}>AVANCINI SYNC <WebArrow /></Link>
            </div>
            <button ref={menuCloseRef} type="button" onClick={() => setMenuOpen(false)}>× <b>FECHAR</b><small>ESC</small></button>
          </div>
          <nav>
            {[
              ["01", "Início", "Presença que trabalha", "#inicio"],
              ["02", "Portfólio", "Experiências por segmento", "#portfolio"],
              ["03", "Antes e depois", "Compare o impacto", "#antes-depois"],
              ["04", "Metodologia", "Estratégia antes do visual", "#metodo"],
              ["05", "Serviços e planos", "Encontre o formato certo", "#configurar-plano"],
              ["06", "Dúvidas", "Decida com segurança", "#duvidas"],
              ["07", "Contato", "Comece uma conversa", "#contato"],
            ].map(([number, label, description, href]) => (
              <a href={href} key={number} onClick={(event) => navigateFromMenu(event, href)}>
                <small>{number}</small>
                <span>{label}</span>
                <em>{description}</em>
                <WebArrow />
              </a>
            ))}
          </nav>
          <div className="web-menu-bottom">
            <span><i /> SEU PROJETO PODE COMEÇAR POR UMA CONVERSA</span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                startBudgetConversation("Seu novo site", "Quero solicitar um orçamento para um site profissional da Avancini Dash.");
              }}
            >
              SOLICITAR ORÇAMENTO <WebArrow />
            </button>
          </div>
        </div>
      )}
      <div className="web-hero-scene">
      <section className="hero hero-reference" id="inicio">
        <div className="hero-art-backdrop" aria-hidden="true">
          <AvanciniMark variant="dash" className="hero-a-mark avancini-a-mark" />
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
              Solicitar orçamento <WebArrow />
            </button>
            <a className="button button-ghost" href="#portfolio">
              Ver projetos <WebDownArrow />
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
            <span className="web-portfolio-ref" aria-label="Referência, dez experiências em destaque">
              REF:// DESTAQUES · 10 <i aria-hidden="true" />
            </span>
            <p>Veja como estratégia, mensagem e design elevam a percepção de uma empresa e preparam cada clique para virar oportunidade.</p>
            <span className="web-portfolio-drag-note">PROJETOS EM MOVIMENTO · CLIQUE PARA AMPLIAR <WebArrow /></span>
          </div>
        </header>
        <div className="web-portfolio-marquee">
          {portfolioRows.map((row, rowIndex) => (
            <div className="web-portfolio-row" key={rowIndex}>
              <div className="web-portfolio-track">
                {[...row, ...row, ...row, ...row].map((item, index) => (
                  <button
                    type="button"
                    onClick={() => openPortfolioItem(item.view)}
                    className={`web-portfolio-item ${item.className}`}
                    key={`${item.name}-${index}`}
                    aria-hidden={index >= row.length || undefined}
                    tabIndex={index >= row.length ? -1 : undefined}
                    aria-label={index < row.length ? `Ampliar projeto ${item.name}` : undefined}
                  >
                    <SiteImage src={item.image} alt={index < row.length ? item.name : ""} sizes="(max-width: 760px) 78vw, 28vw" quality={82} />
                    <span><strong>{item.name}</strong><em><i />{item.action}</em><b>Ampliar projeto <WebArrow /></b></span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="web-portfolio-all"><strong>Dez experiências diferentes, cada uma construída a partir do problema real do segmento, não apenas com outro nome e outra cor.</strong><span>AMPLIE E ROLE POR DENTRO <WebArrow /></span></div>
      </section>

      <section className="dash-entry-paths" id="planos-rapidos" aria-labelledby="dash-entry-title">
        <header>
          <span>COMECE PELO SEU OBJETIVO</span>
          <h2 id="dash-entry-title">Você não precisa entender de site.<br />Só precisa saber o que quer conquistar.</h2>
          <p>Escolha o cenário mais próximo do seu negócio. A gente organiza o restante.</p>
        </header>
        <div>
          {offers.map((offer, index) => (
            <a href="#configurar-plano" key={offer.name} onClick={() => setSelectedOfferIndex(index)}>
              <small>0{index + 1} · {offer.decisionLabel}</small>
              <strong>{offer.name}</strong>
              <span>{offer.decisionAnswer}</span>
              <span className="dash-entry-prices">
                <b><small>ASSINATURA</small>{offer.flexiblePrice}</b>
                <b><small>TAXA DE CRIAÇÃO</small>{offer.flexibleCreationFee}</b>
              </span>
              <span className="dash-entry-action"><em>Comparar e escolher <WebArrow /></em></span>
            </a>
          ))}
        </div>
      </section>

      <DashBeforeAfterSlider />

      <WebOpportunitySimulator onLead={(message) => startBudgetConversation("Simulação de oportunidade digital", message)} />

      <section className="section web-method" id="metodo">
        <div className="section-heading web-method-heading">
          <div><span className="section-index">METODOLOGIA / 04 PILARES</span><h2>Site bonito chama atenção.<br />Estratégia transforma em cliente.</h2></div>
          <p>Sem estes pilares trabalhando juntos, até um visual impressionante vira apenas decoração.</p>
        </div>
        <div className="web-method-stack">
          {webPillars.map((pillar) => (
            <article data-step={pillar.number} key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <WebArrow />
            </article>
          ))}
        </div>
      </section>

      <section className="section investment" id="investimento">
        <div className="section-heading">
          <div>
            <span className="section-index">CONDIÇÃO DE LANÇAMENTO · PLANOS RECORRENTES</span>
            <h2>Três formas de colocar<br />sua empresa no nível certo.</h2>
          </div>
          <p>
            Escolha a estrutura mais próxima do seu objetivo. Sua mensagem já
            chega organizada no WhatsApp para confirmarmos o melhor começo.
          </p>
        </div>
        <div className="dash-plan-configurator" id="configurar-plano">
        <div className="dash-plan-configurator-body">
        <div className="offer-product-picker" role="group" aria-label="Escolha a estrutura digital">
          {offers.map((offer, index) => (
            <button
              type="button"
              key={offer.name}
              className={selectedOfferIndex === index ? "active" : ""}
              aria-pressed={selectedOfferIndex === index}
              onClick={() => setSelectedOfferIndex(index)}
            >
              <small>0{index + 1} · {offer.decisionLabel}</small>
              <strong>{offer.name}</strong>
              <span>{offer.decisionAnswer}</span>
            </button>
          ))}
        </div>
        <div className="offer-grid">
          {[offers[selectedOfferIndex]].map((offer) => {
            const currentPrice = offer.flexiblePrice;
            const selectedCycle = paymentCycleOptions.find((item) => item.id === paymentCycle) ?? paymentCycleOptions[0];
            const cycleTotal = offer.flexibleCyclePrices[paymentCycle];
            const cyclePriceLabel = paymentCycle === "monthly"
              ? currentPrice
              : `${offer.startingAt ? "A partir de " : ""}${formatPlanMoney(cycleTotal)}${paymentCycle === "semiannual" ? "/semestre" : "/ano"}`;
            const creationFeeAmount = paymentCycle === "annual"
              ? 0
              : paymentCycle === "semiannual"
                ? Math.floor(offer.creationFeeAmount / 2) + 0.9
                : offer.creationFeeAmount;
            const regularCreationFeeAmount = offer.creationFeeAmount + 100;
            const regularCreationFee = `${offer.startingAt ? "A partir de " : ""}${formatPlanMoney(regularCreationFeeAmount)}`;
            const currentCreationFee = creationFeeAmount === 0
              ? "R$ 0"
              : `${offer.startingAt ? "A partir de " : ""}${formatPlanMoney(creationFeeAmount)}`;
            const creationCondition = paymentCycle === "annual"
              ? "Taxa de criação zerada no ciclo anual"
              : paymentCycle === "semiannual"
                ? "50% de economia na taxa de criação"
                : "R$ 100 de economia na condição de lançamento";
            const sharedIncludes = offer.includes.filter((item) => !/\.com\.br|domínio|endereço na rede avancini/i.test(item));
            const currentIncludes = [
              ...sharedIncludes,
              "Endereço na rede Avancini incluso",
              "Domínio .com.br opcional, sujeito à disponibilidade e análise",
            ];
            return (
            <article className={offer.featured ? "offer-card featured" : "offer-card"} key={offer.name}>
              <small>{offer.badge ?? "ASSINATURA RECORRENTE"}</small>
              <h3>{offer.name}</h3>
              <strong>{cyclePriceLabel}</strong>
              <div className="dash-promo-deal is-promotional">
                <small>CONDIÇÃO DE LANÇAMENTO</small>
                <div><del>{regularCreationFee}</del><strong>{currentCreationFee}</strong><span> de taxa de criação</span></div>
                <b>{creationCondition}</b>
              </div>
              <p>{offer.description}</p>
              <em className="offer-ideal">{offer.ideal}</em>
              <div className="offer-scope"><small>ESCOPO INICIAL</small><span>{offer.scope}</span></div>
              <ul>
                {currentIncludes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="payment-cycle-block">
                <div className="payment-cycle-heading"><span>ESCOLHA O CICLO</span><small>A entrega é a mesma. Muda apenas a forma de cobrança.</small></div>
                <div className="payment-cycle-options" role="group" aria-label="Frequência de pagamento">
                  {paymentCycleOptions.map((option) => (
                    <button type="button" key={option.id} className={paymentCycle === option.id ? "active" : ""} aria-pressed={paymentCycle === option.id} onClick={() => setPaymentCycle(option.id)}>
                      <strong>{option.label}{option.id !== "monthly" && <i>{option.detail}</i>}</strong>
                      <span>{option.id === "monthly" ? `${formatPlanMoney(offer.flexibleCyclePrices.monthly)} por mês` : option.id === "semiannual" ? `${formatPlanMoney(offer.flexibleCyclePrices.semiannual)} a cada 6 meses` : `${formatPlanMoney(offer.flexibleCyclePrices.annual)} à vista`}</span>
                      <b>{option.id === "monthly" ? "Taxa promocional" : option.id === "semiannual" ? "Criação pela metade" : "R$ 0 de criação"}</b>
                    </button>
                  ))}
                </div>
                <p className="card-limit-note">No mensal, somente a mensalidade do mês é lançada no cartão e o valor total não ocupa o limite. Semestral e anual são cobrados antecipadamente.</p>
              </div>
              <div className="offer-actions">
                <div className="offer-action-head">
                  <span>PRÓXIMO PASSO</span>
                  <small>Conversa direta e sem compromisso</small>
                </div>
                <div className="offer-action-row">
                  <button
                    type="button"
                    className="offer-primary"
                    onClick={() => startBudgetConversation(offer.name, `Quero conversar sobre ${offer.name}. Escolhi o ciclo ${selectedCycle.label.toLowerCase()} por ${cyclePriceLabel}, com taxa de criação ${currentCreationFee}.`)}
                  >
                    <span><strong>{offer.cta}</strong><small>Confirmar se esta opção combina com meu negócio</small></span>
                    <WebArrow />
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
        </div>
        </div>
        <div className="offer-standard" aria-label="O que está presente em toda entrega Avancini Dash">
          <div><small>O PADRÃO NÃO MUDA</small><strong>A estrutura muda. A qualidade, não.</strong></div>
          <span><b>01</b> Estratégia e texto</span>
          <span><b>02</b> Design adaptado à marca</span>
          <span><b>03</b> Celular e carregamento rápido</span>
          <span><b>04</b> Publicação e contato integrado</span>
        </div>
        <p className="investment-note">Valores de lançamento para escopos iniciais. Todos os ciclos mantêm a mesma qualidade e incluem publicação, hospedagem, SSL, suporte e acompanhamento. O domínio .com.br é opcional e depende de disponibilidade e análise.</p>
      </section>

      <section className="section web-faq" id="duvidas">
        <div className="web-faq-intro"><span>PERGUNTAS FREQUENTES</span><h2>Tire suas dúvidas<br /><em>antes de começar.</em></h2><p>As perguntas que mais aparecem antes de iniciar um projeto. Não encontrou a sua?</p><button type="button" onClick={() => openLead("Tenho uma dúvida sobre os serviços da Avancini Dash antes de começar meu projeto.")}>FALAR COM A AVANCINI <WebArrow /></button></div>
        <div className="web-faq-list">{webFaqs.map((item)=><details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      {activeSpotlight && portfolioSpotlight && (
        <div
          ref={portfolioDialogRef}
          tabIndex={-1}
          className="niche-modal portfolio-spotlight-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Projeto ${activeSpotlight.name}`}
        >
          <button
            className="portfolio-global-close"
            ref={portfolioCloseRef}
            type="button"
            onClick={() => setPortfolioSpotlight(null)}
            aria-label="Fechar projeto"
          >
            <span>Fechar projeto</span><b aria-hidden="true">×</b>
          </button>
          <div className="niche-modal-dialog portfolio-spotlight-dialog">
            <div className="preview-browser-bar">
              <div><i /><i /><i /></div>
              <span>{activeSpotlight.name}</span>
              <b>{activeSpotlight.kind}</b>
            </div>
            <div className="niche-full-scroll portfolio-case-scroll" role="region" tabIndex={0} aria-label={`Página completa do projeto ${activeSpotlight.name}`}>
              {portfolioSpotlight === "sandiego" || portfolioSpotlight === "tapecar" ? (
                <SiteImage src={activeSpotlight.image} alt={`Página completa do projeto ${activeSpotlight.name}`} sizes="94vw" quality={88} />
              ) : <PortfolioConceptPage type={portfolioSpotlight} />}
            </div>
            {(portfolioSpotlight === "sandiego" || portfolioSpotlight === "tapecar") && (
              <>
                <div className="niche-scroll-note">
                  <span>↓</span> Role dentro da tela para navegar pelo projeto
                </div>
                <div className="preview-sales-cta preview-sales-summary">
                  <span>{activeSpotlight.description}</span>
                  <b>PROJETO REAL</b>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer id="contato">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo footer-logo" href="#inicio">
              <AvanciniMark variant="dash" className="logo-mark avancini-a-mark" />
              <span>
                <span className="brand-name">
                  AVANCINI <b>DASH</b>
                </span>
                <small>Uma solução Avancini OS</small>
              </span>
            </a>
            <p>Sites com identidade, velocidade e estratégia para transformar presença em oportunidade.</p>
            <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram <WebArrow /></a>
          </div>
          <nav>
            <b>NAVEGAÇÃO</b>
            <a href="#inicio">Início</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#antes-depois">Antes e depois</a>
            <a href="#metodo">Metodologia</a>
            <a href="#investimento">Serviços e planos</a>
            <a href="#duvidas">Perguntas frequentes</a>
            <Link href="/">Avancini OS <WebArrow /></Link>
            <Link href="/sync">Avancini Sync <WebArrow /></Link>
          </nav>
          <nav>
            <b>SERVIÇOS</b>
            <a href="#investimento">Landing Page</a>
            <a href="#investimento">Site Institucional</a>
            <a href="#investimento">Loja Virtual</a>
            <Link href="/sync">Chatbot e Atendente IA <WebArrow /></Link>
          </nav>
          <div className="footer-contact">
            <b>CONTATO</b>
            <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
            <a href="tel:+5573981019782">(73) 98101-9782</a>
            <button type="button" onClick={() => startBudgetConversation("Orçamento Avancini Dash", "Quero solicitar um orçamento para um projeto de site com a Avancini Dash.")}>
              SOLICITAR ORÇAMENTO <WebArrow />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Avancini OS</span>
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
          <AvanciniMark variant="dash" className="budget-transition-mark avancini-a-mark" />
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
              <AvanciniMark variant="dash" className="lead-logo avancini-a-mark" />
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
