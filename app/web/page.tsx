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
  "/concepts/aurea-salon-v2.png": { width: 1536, height: 1024 },
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
    { name: "MOTORA // Ecossistema Automotivo", kind: "CONCESSIONÁRIA PREMIUM & SEMINOVOS", image: "/concepts/apex-cars.jpg", view: "cars", className: "web-port-cars", action: "ESTOQUE · COMPARADOR · FINANCIAMENTO" },
    { name: "Vértice // E-commerce", kind: "MODA ESPORTIVA & STREETWEAR", image: "/concepts/nike-hero.jpg", view: "fashion", className: "web-port-noma", action: "COLEÇÃO 2026 · SACOLA VIP" },
    { name: "Cora Imóveis", kind: "MANSÕES & PENTHOUSES", image: "/concepts/cora-penthouse.jpg", view: "realestate", className: "web-port-atlas", action: "RADAR · SIMULADOR SAC" },
    { name: "Torque Lab", kind: "OFICINA DE ALTA PERFORMANCE", image: "/concepts/torque-mechanic.webp", view: "mechanic", className: "web-port-torque", action: "TELEMETRIA · OS AO VIVO" },
    { name: "Clínica San Diego", kind: "PROJETO REAL · CLÍNICA MÉDICA", image: "/projects/san-diego-preview.webp", view: "sandiego", className: "web-port-san", action: "CUIDADO · PREVENÇÃO" },
    { name: "Tape Car", kind: "PROJETO REAL · ESTÉTICA AUTOMOTIVA", image: "/projects/tape-car-preview.webp", view: "tapecar", className: "web-port-tape", action: "PROTEÇÃO · ESTÉTICA · CUIDADO" },
    { name: "Moreira & Lima", kind: "ADVOCACIA EMPRESARIAL", image: "/concepts/moreira-law.jpg", view: "moreira", className: "web-port-law", action: "RISCO · CONTRATOS · DECISÃO" },
    { name: "Auréa Atelier", kind: "SALÃO & EXPERIÊNCIA DE BELEZA", image: "/concepts/aurea-salon-v2.png", view: "salon", className: "web-port-salon", action: "AGENDA · SERVIÇOS · CURADORIA" },
  ],
] as const;

const webPillars = [
  { number: "01", title: "Direção estratégica", text: "Antes do visual, definimos o que sua empresa precisa comunicar e qual ação o visitante deve tomar." },
  { number: "02", title: "Texto que conduz", text: "Cada título, argumento e chamada existe para transformar atenção em confiança e confiança em contato." },
  { number: "03", title: "Design com presença", text: "Hierarquia, contraste e identidade para sua empresa parecer tão profissional quanto o trabalho que entrega." },
  { number: "04", title: "Velocidade que converte", text: "Uma experiência leve, responsiva e pensada primeiro para o celular — a tela que o seu cliente realmente usa." },
] as const;

const webFaqs = [
  { question: "Como funciona o processo de criação?", answer: "Começamos entendendo sua empresa, o público e o objetivo do site. Depois alinhamos estrutura, mensagem e direção visual antes do desenvolvimento e da publicação." },
  { question: "Landing page e site institucional são a mesma coisa?", answer: "Não. A landing concentra o visitante em uma oferta e uma ação. O site institucional apresenta a empresa inteira, organiza serviços e constrói autoridade." },
  { question: "O site funciona bem no celular?", answer: "Sim. A experiência é planejada para celular, computador e outras telas, com atenção a legibilidade, velocidade e facilidade para entrar em contato." },

  { question: "Posso usar meu próprio domínio?", answer: "Sim. Conectamos um domínio que já seja seu. Nos planos mensais, um novo .com.br é opcional e sujeito à análise de disponibilidade. No pagamento único, um domínio .com.br fica incluído no projeto, também sujeito à disponibilidade." },
  { question: "Quanto tempo demora para ficar pronto?", answer: "O prazo depende da estrutura e do conteúdo disponível. Como referência, projetos diretos podem levar 7 dias e estruturas completas até 30 dias, sempre combinado antes do início." },
  { question: "A opção sem entrada tem qualidade inferior?", answer: "Não. Estratégia, texto, design, versão mobile e acabamento seguem o mesmo padrão. O que muda é a forma de contratação e o endereço escolhido, nunca o cuidado com a entrega." },
  { question: "O que acontece depois da publicação ou se eu cancelar?", answer: "Nos planos recorrentes, hospedagem, SSL, suporte e um pequeno ajuste mensal permanecem inclusos. Ao cancelar, a hospedagem Avancini é encerrada depois do período aplicável; o domínio registrado pelo cliente e os materiais fornecidos por ele continuam sendo dele. No pagamento único não existe mensalidade Avancini, e a proposta define a entrega e a infraestrutura escolhida." },
  { question: "Qual é a diferença entre Site Catálogo e Loja Virtual?", answer: "O Site Catálogo apresenta produtos e leva o pedido ou orçamento para o WhatsApp. A Loja Virtual conclui a compra dentro do site, com carrinho, pagamento, entrega e controle dos pedidos." },
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
  mechanic: {
    name: "Torque Lab",
    kind: "Demonstração interativa · oficina mecânica",
    image: "/concepts/torque-mechanic.webp",
    description: "Diagnóstico, telemetria ao vivo, aprovação e acompanhamento da ordem de serviço sem ruído.",
  },
  dentistry: {
    name: "Nexo Odonto",
    kind: "Demonstração interativa · odontologia",
    image: "/concepts/nexo-dental.webp",
    description: "Uma jornada que reduz insegurança, explica possibilidades e conduz à avaliação correta.",
  },
  aesthetics: {
    name: "Lumina",
    kind: "Demonstração interativa · estética avançada",
    image: "/concepts/lumina-clinic.jpg",
    description: "Tratamentos, objetivos e avaliação apresentados com elegância e sem promessas exageradas.",
  },
  autonomous: {
    name: "Caio Move",
    kind: "Demonstração interativa · profissional autônomo",
    image: "/concepts/caio-move.webp",
    description: "Marca pessoal, método, programas e agenda capazes de explicar valor antes da conversa sobre preço.",
  },
  realestate: {
    name: "Cora Imóveis",
    kind: "Demonstração interativa · mansões & penthouses",
    image: "/concepts/cora-penthouse.jpg",
    description: "Curadoria patrimonial, mapa radar interativo, simulador SAC e agendamento privativo.",
  },
  moreira: {
    name: "Moreira & Lima",
    kind: "Demonstração interativa · advocacia empresarial",
    image: "/concepts/moreira-law.jpg",
    description: "Sobriedade, clareza e autoridade para tornar assuntos complexos mais seguros desde o primeiro contato.",
  },
  salon: {
    name: "Auréa Atelier",
    kind: "Demonstração interativa · salão de beleza",
    image: "/concepts/aurea-salon-v2.png",
    description: "Serviços, profissionais e agenda organizados em uma experiência elegante, rápida e fácil de entender.",
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

const offers = [
  {
    name: "Landing Page Profissional",
    decisionLabel: "CAPTAR PARA UMA OFERTA",
    decisionAnswer: "Uma página · uma ação principal",
    price: "R$ 79,90/mês",
    priceNoFidelity: "R$ 99,90/mês",
    setupNoFidelity: "R$ 399,90 à vista",
    oneTimePrice: "R$ 997,00",
    oneTimeTerms: "Projeto entregue · sem mensalidade Avancini",
    deadline: "R$ 0 de taxa de criação · Contrato 6 meses",
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
    message: "Olá! Quero contratar a Landing Page Profissional por R$ 79,90/mês (sem taxa de criação · contrato de 6 meses).",
    question: "Olá! Tenho uma dúvida sobre a Landing Page Profissional.",
    badge: "MAIS ESCOLHIDO",
    featured: false,
  },
  {
    name: "Site Institucional",
    decisionLabel: "APRESENTAR A EMPRESA",
    decisionAnswer: "Autoridade · serviços · contatos",
    price: "A partir de R$ 109,90/mês",
    priceNoFidelity: "A partir de R$ 139,90/mês",
    setupNoFidelity: "A partir de R$ 599,90 à vista",
    oneTimePrice: "A partir de R$ 1.997,00",
    oneTimeTerms: "Projeto entregue · sem mensalidade Avancini",
    deadline: "R$ 0 de taxa de criação · Contrato 6 meses",
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
    name: "Site Catálogo / Vitrine",
    decisionLabel: "MOSTRAR VARIEDADE",
    decisionAnswer: "Vitrine · filtros · pedido no WhatsApp",
    price: "A partir de R$ 139,00/mês",
    priceNoFidelity: "A partir de R$ 169,90/mês",
    setupNoFidelity: "A partir de R$ 790,00 à vista",
    oneTimePrice: "A partir de R$ 2.497,00",
    oneTimeTerms: "Projeto entregue · sem mensalidade Avancini",
    deadline: "R$ 0 de taxa de criação · Contrato 6 meses",
    description: "Estrutura completa para apresentar produtos, estoques ou um catálogo amplo de serviços sem parecer uma lista genérica.",
    scope: "Catálogo inicial de até 30 itens · volumes maiores recebem proposta própria",
    includes: [
      "Vitrine de produtos ou serviços com fotos e detalhes",
      "Botão de orçamento no WhatsApp em cada item",
      "Filtros e organização conforme o volume do catálogo",
      "Hospedagem, SSL, suporte e 1 ajuste mensal",
    ],
    ideal: "Para quem precisa mostrar variedade e facilitar pedidos de orçamento",
    cta: "Planejar meu Catálogo",
    message: "Olá! Quero conversar sobre um Site Catálogo / Vitrine da Avancini Dash.",
    question: "Olá! Tenho uma dúvida sobre o Site Catálogo / Vitrine.",
    badge: "CATÁLOGO COMPLETO",
    featured: false,
  },
  {
    name: "Loja Virtual",
    decisionLabel: "VENDER PELO SITE",
    decisionAnswer: "Carrinho · pagamento · pedidos",
    price: "A partir de R$ 149,90/mês",
    priceNoFidelity: "A partir de R$ 189,90/mês",
    setupNoFidelity: "A partir de R$ 999,90 à vista",
    oneTimePrice: "A partir de R$ 2.997,00",
    oneTimeTerms: "Projeto e loja entregues · custos da plataforma separados",
    deadline: "R$ 0 de taxa de criação · Contrato 6 meses",
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
  const sectorType: SectorShowcaseType = type === "moreira" ? "law" : type;
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
        <p>Escolha uma hipótese simples e veja o valor envolvido. O cálculo usa somente clientes adicionais × valor médio — sem porcentagem escondida e sem promessa de resultado.</p>
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
          <div className="dash-opportunity-formula"><small>CÁLCULO VISÍVEL</small><strong>{additionalWins} × {formatMoney(averageTicket)}</strong><span>clientes ou pedidos adicionais × valor médio</span></div>
        </div>
        <div className="web-opportunity-result" aria-live="polite">
          <div className="opportunity-result-top"><span>CENÁRIO CRIADO COM AS SUAS PREMISSAS</span><b>REF:// DASH · {goal.toUpperCase()}</b></div>
          <div className="opportunity-current opportunity-current-copy"><small>O QUE ESTE NÚMERO SIGNIFICA</small><strong>{additionalWins}<em>{currentGoal.outcome}</em></strong><p>Esta é uma hipótese escolhida por você para enxergar a ordem de grandeza da oportunidade — não uma previsão automática.</p></div>
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
  const [fidelityMode, setFidelityMode] = useState<"com-fidelidade" | "sem-fidelidade" | "pagamento-unico">("com-fidelidade");
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
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
              ["05", "Serviços e planos", "Encontre o formato certo", "#investimento"],
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
            <span className="web-portfolio-ref" aria-label="Referência, oito experiências em destaque">
              REF:// DESTAQUES · 08 <i aria-hidden="true" />
            </span>
            <p>Veja como estratégia, mensagem e design elevam a percepção de uma empresa e preparam cada clique para virar oportunidade.</p>
            <span className="web-portfolio-drag-note">PROJETOS EM MOVIMENTO · CLIQUE PARA AMPLIAR <WebArrow /></span>
          </div>
        </header>
        <div className="web-portfolio-marquee">
          {portfolioRows.map((row, rowIndex) => (
            <div className="web-portfolio-row" key={rowIndex}>
              <div className="web-portfolio-track">
                {[...row, ...row].map((item, index) => (
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
        <div className="web-portfolio-all"><strong>Oito experiências diferentes, cada uma construída a partir do problema real do segmento — sem trocar apenas nome e cor.</strong><span>AMPLIE E ROLE POR DENTRO <WebArrow /></span></div>
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
            <span className="section-index">SERVIÇOS & CONTRATAÇÃO</span>
            <h2>O investimento precisa fazer sentido antes do primeiro clique.</h2>
          </div>
          <p>
            Compare objetivo, entrega e compromisso com clareza. O padrão de
            criação é o mesmo; muda a estrutura que você precisa e a forma de
            contratar.
          </p>
        </div>
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
        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-toggle" role="group" aria-label="Opção de contratação">
            <button
              type="button"
              className={fidelityMode === "com-fidelidade" ? "active" : ""}
              aria-pressed={fidelityMode === "com-fidelidade"}
              onClick={() => setFidelityMode("com-fidelidade")}
            >
              <small>RECOMENDADO PARA COMEÇAR</small><strong>Assinatura sem entrada</strong><span className="badge-pill">R$ 0 criação · 6 meses</span>
            </button>
            <button
              type="button"
              className={fidelityMode === "sem-fidelidade" ? "active" : ""}
              aria-pressed={fidelityMode === "sem-fidelidade"}
              onClick={() => setFidelityMode("sem-fidelidade")}
            >
              <small>MAIS LIBERDADE</small><strong>Mensal flexível</strong><span className="badge-pill">criação paga · cancele quando quiser</span>
            </button>
            <button
              type="button"
              className={fidelityMode === "pagamento-unico" ? "active" : ""}
              aria-pressed={fidelityMode === "pagamento-unico"}
              onClick={() => setFidelityMode("pagamento-unico")}
            >
              <small>PROJETO SEU</small><strong>Pagamento único</strong><span className="badge-pill">sem mensalidade Avancini</span>
            </button>
          </div>
        </div>

        <div className="offer-standard" aria-label="O que está presente em toda entrega Avancini Dash">
          <div><small>O PADRÃO NÃO MUDA</small><strong>A estrutura muda. A qualidade, não.</strong></div>
          <span><b>01</b> Estratégia e texto</span>
          <span><b>02</b> Design adaptado à marca</span>
          <span><b>03</b> Celular e carregamento rápido</span>
          <span><b>04</b> Publicação e contato integrado</span>
        </div>

        <div className="offer-grid">
          {[offers[selectedOfferIndex]].map((offer) => {
            const isFidelity = fidelityMode === "com-fidelidade";
            const isOneTime = fidelityMode === "pagamento-unico";
            const currentPrice = isFidelity ? offer.price : isOneTime ? offer.oneTimePrice : offer.priceNoFidelity;
            const badgeText = isFidelity ? (offer.badge ?? "CONTRATO 6 MESES") : isOneTime ? "PAGAMENTO ÚNICO" : "SEM PERMANÊNCIA";
            const deadlineText = isFidelity
              ? offer.deadline
              : isOneTime ? offer.oneTimeTerms : `Criação: ${offer.setupNoFidelity} · Cancele quando quiser`;
            const sharedIncludes = offer.includes.filter((item) => !/\.com\.br|domínio|endereço na rede avancini/i.test(item));
            const currentIncludes = isOneTime
              ? [
                  ...sharedIncludes.filter((item) => !/hospedagem|suporte|ajuste mensal/i.test(item)),
                  "Projeto entregue pronto para publicação",
                  "Domínio .com.br incluso, sujeito à disponibilidade e análise",
                  "Hospedagem e futuras manutenções tratadas separadamente",
                ]
              : [
                  ...sharedIncludes,
                  ...(isFidelity ? ["Endereço na rede Avancini incluso, sem taxa de criação"] : []),
                  "Domínio .com.br opcional, sujeito à disponibilidade e análise",
                ];
            return (
            <article className={offer.featured ? "offer-card featured" : "offer-card"} key={offer.name}>
              <small>{badgeText}</small>
              <h3>{offer.name}</h3>
              <strong>{currentPrice}</strong>
              <span>{deadlineText}</span>
              <p>{offer.description}</p>
              <em className="offer-ideal">{offer.ideal}</em>
              <div className="offer-scope"><small>ESCOPO DE REFERÊNCIA</small><span>{offer.scope}</span></div>
              <ul>
                {currentIncludes.map((item) => <li key={item}>{item}</li>)}
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
                    onClick={() => startBudgetConversation(offer.name, `Quero conversar sobre ${offer.name}. Vi a condição ${currentPrice}, ${isFidelity ? "com criação R$ 0 e permanência de 6 meses" : isOneTime ? "em pagamento único, sem mensalidade Avancini e com infraestrutura separada" : `com ${offer.setupNoFidelity} de criação e sem fidelidade`}.`)}
                  >
                    {offer.cta} <WebArrow />
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
        <p className="investment-note">Todos os formatos mantêm a mesma qualidade de estratégia, texto, design e desenvolvimento. No pagamento único, você compra o projeto, recebe um domínio .com.br incluso e não existe mensalidade Avancini; hospedagem e futuras manutenções são tratadas separadamente. Nos formatos mensais, o .com.br é opcional. Todo domínio depende de disponibilidade e análise.</p>
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
            <a href="#investimento">Site Catálogo</a>
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
