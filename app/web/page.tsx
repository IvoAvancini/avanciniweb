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
    { name: "Solaris Energia", domain: "solarisenergia.com.br", badge: "ENERGIA SOLAR", kind: "ENERGIA SOLAR & FINANCIAMENTO", image: "/concepts/solaris/hero.jpg", view: "solar", className: "web-port-solar", action: "SIMULAÇÃO · PROJETO · FINANCIAMENTO" },
    { name: "MOTORA // Ecossistema", domain: "motora.com.br", badge: "CONCESSIONÁRIA", kind: "CONCESSIONÁRIA PREMIUM", image: "/concepts/apex-cars.jpg", view: "cars", className: "web-port-cars", action: "ESTOQUE · COMPARADOR · FINANCIAMENTO" },
    { name: "Cora Imóveis", domain: "coraimoveis.com.br", badge: "IMOBILIÁRIA", kind: "MANSÕES & PENTHOUSES", image: "/concepts/cora-penthouse.jpg", view: "realestate", className: "web-port-atlas", action: "RADAR · SIMULADOR SAC · VISITA" },
    { name: "Tape Car", domain: "tapecar.com.br", badge: "PROJETO REAL", kind: "PROJETO REAL · ESTÉTICA AUTOMOTIVA", image: "/projects/tape-car-preview.webp", view: "tapecar", className: "web-port-tape", action: "PROTEÇÃO · ESTÉTICA · CUIDADO" },
    { name: "Clínica San Diego", domain: "sandiegoclinica.com.br", badge: "PROJETO REAL", kind: "PROJETO REAL · CLÍNICA MÉDICA", image: "/projects/san-diego-preview.webp", view: "sandiego", className: "web-port-san", action: "CUIDADO · PREVENÇÃO · CONFIANÇA" },
  ],
  [
    { name: "Caio Move", domain: "caiomove.com.br", badge: "ALTA PERFORMANCE", kind: "CONSULTORIA ESPORTIVA & PERSONAL", image: "/concepts/caio-move.webp", view: "autonomous", className: "web-port-caio", action: "MÉTODO · PROGRAMAS · AGENDA" },
    { name: "Dr. Augusto Moreira", domain: "moreiraadvocacia.com.br", badge: "ADVOCACIA", kind: "PORTFÓLIO · ADVOCACIA EMPRESARIAL", image: "/concepts/moreira-law-v2.webp", view: "moreira", className: "web-port-law", action: "ATUAÇÃO · MÉTODO · CONSULTA" },
    { name: "Nexo Odonto", domain: "nexoodonto.com.br", badge: "ODONTOLOGIA", kind: "ODONTOLOGIA ESTÉTICA & IMPLANTES", image: "/concepts/nexo-dental.webp", view: "dentistry", className: "web-port-nexo", action: "TRATAMENTOS · CONFIANÇA · AGENDA" },
    { name: "Auréa Atelier", domain: "aureasalon.com.br", badge: "BELEZA & ESTILO", kind: "SALÃO DE BELEZA & VISAGISMO", image: "/concepts/aurea-salon-v3.webp", view: "salon", className: "web-port-salon", action: "AGENDA · SERVIÇOS · CURADORIA" },
    { name: "Vértice // E-commerce", domain: "verticestore.com.br", badge: "E-COMMERCE", kind: "MODA ESPORTIVA & STREETWEAR", image: "/concepts/nike-hero.jpg", view: "fashion", className: "web-port-noma", action: "COLEÇÃO 2026 · SACOLA VIP" },
  ],
] as const;

const webPillars = [
  { number: "01", title: "Direção Estratégica", text: "Definimos o foco da sua empresa e a ação exata que o cliente deve tomar." },
  { number: "02", title: "Texto Persuasivo", text: "Argumentos claros que transformam curiosidade em confiança e contato." },
  { number: "03", title: "Design com Autoridade", text: "Identidade visual para transmitir o peso real do seu negócio." },
  { number: "04", title: "Velocidade no Celular", text: "Carregamento leve e instantâneo pensado para quem navega pelo celular." },
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

type PlanFeature = {
  title: string;
  desc: string;
};

type DashPlan = {
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

const dashPlans: DashPlan[] = [
  {
    id: "landing",
    name: "Landing Page de Alta Conversão",
    badge: "ANÚNCIOS & TRÁFEGO PAGO",
    kicker: "CAMPANHAS NO GOOGLE & META ADS",
    idealFor: "Para quem investe em anúncios e precisa que cada clique vire contato e venda no WhatsApp.",
    pitch: "Página focada 100% em conversão rápida: carrega em 0.2s, quebra objeções e captura o lead sem dispersão.",
    features: [
      { title: "Carregamento Ultrarrápido em 0.2s LCP", desc: "Zero perda de cliques de campanhas por lentidão no 4G ou celular antigo." },
      { title: "Copywriting Persuasivo Direto ao Ponto", desc: "Texto estratégico que conduz o visitante do problema até a contratação." },
      { title: "WhatsApp em Posição de Ouro", desc: "Gatilhos e botões posicionados nos pontos de maior atenção visual." },
      { title: "Hospedagem Blindada & Certificado SSL", desc: "Infraestrutura global ultra-estável sem limites de tráfego inclusa." },
      { title: "Rastreamento Completo (Pixel & GA4)", desc: "Métricas exatas de conversão configuradas para otimizar seus anúncios." },
    ],
    payoff: "💡 Pare de queimar dinheiro em anúncios com páginas lentas que espantam clientes.",
    deliverableBadge: "⚡ Primeiro Rascunho em 48h · Código Otimizado · Suporte Dedicado",
    ctaText: "Solicitar Proposta de Landing Page",
    featured: false,
  },
  {
    id: "institucional",
    name: "Site Institucional de Autoridade",
    badge: "MAIS ESCOLHIDO",
    kicker: "AUTORIDADE MÁXIMA & SEO NO GOOGLE",
    idealFor: "Para clínicas, escritórios, consultorias e empresas que precisam transmitir liderança e fechar contratos maiores.",
    pitch: "Estrutura corporativa completa que posiciona sua marca no topo do Google e justifica honorários mais altos.",
    features: [
      { title: "Até 5 Páginas Exclusivas e Autorais", desc: "Apresentação impecável: Início, Sobre, Serviços, Equipe e Contato." },
      { title: "SEO Local Técnico Configurado", desc: "Otimização para sua empresa ranquear nas buscas orgânicas da sua cidade." },
      { title: "Design de Nível Internacional", desc: "Estética refinada que transmite confiança instantânea ao primeiro olhar." },
      { title: "Integração com Mapas, Rotas & WhatsApp", desc: "O cliente encontra sua localização e fala com você com apenas um clique." },
      { title: "Nota 100 no Google PageSpeed", desc: "Desempenho técnico impecável que o Google prioriza nas primeiras posições." },
    ],
    payoff: "💎 Quem pesquisa sua empresa no Google encontra autoridade inquestionável.",
    deliverableBadge: "⚡ Design Autoral · Nota 100 PageSpeed · SEO Local Configurado",
    ctaText: "Planejar Site Institucional",
    featured: true,
  },
  {
    id: "loja",
    name: "Loja Virtual Integrada",
    badge: "CATÁLOGO & CHECKOUT",
    kicker: "VENDAS ONLINE SEM COMISSÕES",
    idealFor: "Para marcas, atacado e varejo que querem vender online 24/7 sem pagar comissões para plataformas terceiras.",
    pitch: "Catálogo moderno, carrinho intuitivo e checkout automático com 100% da margem das vendas ficando com você.",
    features: [
      { title: "Catálogo com Fotos em Alta Definição", desc: "Variações de tamanho, cor, filtros rápidos e zoom nos detalhes do produto." },
      { title: "Pix Automático & Cartão em até 12x", desc: "Confirmação instantânea de pagamento sem fricção nem abandono de carrinho." },
      { title: "Cálculo de Frete Correios / Transportadora", desc: "Cotação em tempo real por CEP integrada com Melhor Envio e Correios." },
      { title: "Zero Taxas ou Comissões sobre Vendas", desc: "Diferente de marketplaces, todo o faturamento vai direto para a sua conta." },
      { title: "Painel Administrativo Ágil e Simples", desc: "Cadastre produtos, altere preços e controle estoque direto pelo celular." },
    ],
    payoff: "🚀 Automatize suas vendas e receba pedidos no WhatsApp mesmo dormindo.",
    deliverableBadge: "⚡ Checkout Rápido · Zero Comissão · Painel Ágil",
    ctaText: "Planejar Loja Virtual",
    featured: false,
  },
];

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
  const [ticketValue, setTicketValue] = useState(300);
  const [lostClients, setLostClients] = useState(3);

  const monthlyLost = ticketValue * lostClients;
  const siteCost = 89.9;
  const netGainWithJustThree = ticketValue * 3 - siteCost;

  return (
    <section className="web-opportunity dash-roi-section" id="retorno" aria-labelledby="web-opportunity-title">
      <header className="dash-roi-header">
        <div>
          <span className="section-index">03 / A MATEMÁTICA DO RETORNO REAL</span>
          <h2 id="web-opportunity-title" className="roi-balanced-title">
            Como um site profissional <br />
            <em>pode até se pagar logo no 1º cliente conquistado?</em>
          </h2>
        </div>
        <p>
          Veja como apenas 1 cliente conquistado no mês já pode cobrir o investimento integral do site.
        </p>
      </header>

      <div className="dash-roi-grid">
        {/* Painel Esquerdo: A Dor e a Perda */}
        <div className="dash-roi-card dash-roi-pain">
          <div className="roi-card-tag pain-tag">❌ O QUE VOCÊ PERDE HOJE SEM O SITE</div>
          <h3>Dinheiro escorrendo pelo ralo</h3>
          <p className="roi-card-desc">
            Quando o cliente clica no seu link e encontra uma página lenta ou amadora, ele fecha a aba e contrata o concorrente.
          </p>
          <div className="roi-evidence-callout">
            📊 <strong>Google:</strong> 53% dos usuários no celular abandonam sites que demoram mais de 3s para carregar.
          </div>

          <div className="roi-interactive-controls">
            <div className="roi-control-item">
              <div className="roi-control-label">
                <span>Quanto vale 1 novo cliente ou consulta para você?</span>
                <strong>R$ {ticketValue}</strong>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={ticketValue}
                onChange={(e) => setTicketValue(Number(e.target.value))}
                aria-label="Ticket médio de um cliente"
              />
            </div>

            <div className="roi-control-item">
              <div className="roi-control-label">
                <span>Clientes perdidos por mês (sem site ou site que não converte):</span>
                <strong className="roi-number-danger">-{lostClients} clientes / mês</strong>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={lostClients}
                onChange={(e) => setLostClients(Number(e.target.value))}
                aria-label="Clientes perdidos por mês"
              />
            </div>
          </div>

          <div className="roi-impact-box pain-impact">
            <small>PREJUÍZO MENSAL ESTIMADO:</small>
            <strong className="roi-number-danger">- R$ {monthlyLost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
            <p className="text-contrast-high">Faturamento que você deixa na mesa todo mês para concorrentes que passam mais confiança.</p>
          </div>
        </div>

        {/* Painel Direito: O Ganho Real e Previsível */}
        <div className="dash-roi-card dash-roi-gain">
          <div className="roi-card-tag gain-tag">✓ COM O AVANCINI DASH</div>
          <h3>O investimento que pode até se pagar sozinho</h3>

          <div className="roi-break-even-card">
            <span className="roi-check-circle">✓</span>
            <div>
              <strong>PODE BASTAR 1 ÚNICO CLIENTE NO MÊS</strong>
              <p>Com apenas 1 cliente de R$ {ticketValue} conquistado através de um site rápido e com alta credibilidade, o investimento já se paga e o restante é faturamento novo no seu caixa.</p>
            </div>
          </div>

          <div className="roi-numbers-breakdown">
            <div className="roi-line">
              <span>Impacto de autoridade &amp; velocidade:</span>
              <strong>0.2s LCP · Nota 100 PageSpeed</strong>
            </div>
            <div className="roi-line">
              <span>Novos contatos qualificados estimados:</span>
              <strong>+3 a +8 clientes / mês</strong>
            </div>
            <div className="roi-line gain-highlight">
              <span>Faturamento com 3 novos clientes fechados:</span>
              <strong className="roi-number-success">+ R$ {(ticketValue * 3).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
            </div>

            <div className="roi-final-profit-box">
              <div>
                <small>RECEITA ADICIONAL GERADA NO SEU NEGÓCIO:</small>
                <strong className="roi-number-success">+ R$ {(ticketValue * 3).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
              </div>
              <span className="roi-status-pill">SE PAGA NO 1º CONTRATO</span>
            </div>
          </div>

          {/* Prova Social e Case Real */}
          <div className="roi-social-proof-strip">
            <div className="proof-stars">★★★★★</div>
            <p>&ldquo;Colocamos a nova landing page no ar na quarta-feira e na mesma semana fechamos 2 contratos particulares que pagaram o ano inteiro de investimento do projeto.&rdquo;</p>
            <small>— Dr. Roberto M., Diretor na Clínica San Diego</small>
          </div>

          <button
            type="button"
            className="roi-action-button"
            onClick={() => onLead(`Quero parar de perder clientes. Meu ticket médio é de R$ ${ticketValue} e quero colocar um site profissional no ar com a Avancini Dash.`)}
          >
            PARAR DE PERDER CLIENTES E COMEÇAR ↗
          </button>

          <div className="roi-trust-badges">
            <span>🏆 <b>+40</b> sites no ar</span>
            <span>⚡ <b>Primeiro rascunho em 48h</b></span>
            <span>🛡️ <b>Site pronto em 5 dias</b></span>
          </div>
          <small className="roi-subnote">Sem taxas ocultas · Hospedagem ultrarrápida e suporte técnico inclusos</small>
        </div>
      </div>
    </section>
  );
}




function DashSiteDiagnosticSection({ onLead }: { onLead: (message: string) => void }) {
  const [siteUrlInput, setSiteUrlInput] = useState("");
  const [clientName, setClientName] = useState("");

  const handleDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrlInput.trim()) return;
    const msg = `Olá! Gostaria de uma análise gratuita de velocidade e conversão para o meu negócio.${clientName ? ` Meu nome é ${clientName}.` : ""} Link/perfil: ${siteUrlInput}`;
    onLead(msg);
  };

  return (
    <section className="dash-diagnostic-section" id="diagnostico" aria-labelledby="diag-title">
      <div className="dash-diagnostic-card">
        <div className="diag-header-row">
          <span className="diag-live-dot" />
          <span className="diag-kicker">DIAGNÓSTICO GRATUITO EM 5 MINUTOS</span>
        </div>
        <h2 id="diag-title">
          Quer saber a nota real do seu site ou Instagram hoje?
        </h2>
        <p>
          Analisamos gratuitamente a velocidade no celular e onde você pode estar perdendo clientes para concorrentes.
        </p>

        <form onSubmit={handleDiagnostic} className="diag-form-wrap">
          <div className="diag-inputs-grid">
            <input
              type="text"
              placeholder="Digite o link do seu site (ou seu @ do Instagram)"
              value={siteUrlInput}
              onChange={(e) => setSiteUrlInput(e.target.value)}
              required
              aria-label="Link do site ou perfil do Instagram"
              className="diag-main-input"
            />
            <input
              type="text"
              placeholder="Seu nome (opcional)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              aria-label="Seu nome"
              className="diag-name-input"
            />
            <button type="submit" className="diag-submit-btn">
              RECEBER ANÁLISE GRÁTIS NO WHATSAPP ↗
            </button>
          </div>
          <span className="diag-privacy-sub">
            🔒 100% gratuita e confidencial. Relatório prático direto no seu WhatsApp.
          </span>
        </form>
      </div>
    </section>
  );
}

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);
  const [ddiDropdownOpen, setDdiDropdownOpen] = useState(false);
  const [ddiSearch, setDdiSearch] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
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
  const [selectedDashFormat, setSelectedDashFormat] = useState<"landing" | "institucional" | "loja">("institucional");
  const [showAllMobileDash, setShowAllMobileDash] = useState(false);
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
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("is-os-hub");
      document.body.classList.remove("is-os-hub");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
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
    const cleanPhone = leadPhone.trim();
    const fullPhone = cleanPhone ? `${selectedCountry.ddi} ${cleanPhone}` : "";
    setLeadError("");
    setLeadSubmitting(true);
    trackLead("whatsapp_modal", { name: cleanName, phone: fullPhone });

    // Envio seguro para a API interna em background (salva localmente e dispara webhook)
    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          phone: fullPhone,
          intent: leadIntent,
          source: "dash_modal",
          page: "/dash",
        }),
      }).catch(() => {});
    } catch {}

    const phoneText = fullPhone ? ` Meu WhatsApp é ${fullPhone}.` : "";
    const message = `Olá! Meu nome é ${cleanName}.${phoneText} ${leadIntent}`;
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
    setLeadSubmitting(false);
    setLeadOpen(false);
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
        <div className="web-ecosystem-switch" aria-label="Navegar entre as soluções Avancini">
          <Link className="button button-small header-cta header-sync-cta" href="/sync">
            <span className="cta-full-name">Avancini </span>Sync <WebArrow />
          </Link>
          <Link className="button button-small header-cta" href="/">
            <span className="cta-full-name">Avancini </span>OS <WebArrow />
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
            <span>NAVEGAÇÃO <i /> 08 SEÇÕES</span>
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
              ["03", "Custo x Retorno", "A matemática do retorno real", "#retorno"],
              ["04", "Metodologia", "Estratégia antes do visual", "#metodo"],
              ["05", "Serviços e planos", "Encontre o formato certo", "#configurar-plano"],
              ["06", "Diagnóstico", "Análise gratuita do seu site", "#diagnostico"],
              ["07", "Dúvidas", "Decida com segurança", "#duvidas"],
              ["08", "Contato", "Comece uma conversa", "#contato"],
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
        <div className="hero-soundwaves left" aria-hidden="true">
          <span style={{ '--d': '0.1s', '--h': '65%' } as any} />
          <span style={{ '--d': '0.35s', '--h': '85%' } as any} />
          <span style={{ '--d': '0.2s', '--h': '45%' } as any} />
          <span style={{ '--d': '0.5s', '--h': '95%' } as any} />
          <span style={{ '--d': '0.15s', '--h': '70%' } as any} />
          <span style={{ '--d': '0.4s', '--h': '80%' } as any} />
          <span style={{ '--d': '0.25s', '--h': '55%' } as any} />
          <span style={{ '--d': '0.6s', '--h': '90%' } as any} />
          <span style={{ '--d': '0.3s', '--h': '60%' } as any} />
          <span style={{ '--d': '0.45s', '--h': '75%' } as any} />
        </div>
        <div className="hero-soundwaves right" aria-hidden="true">
          <span style={{ '--d': '0.3s', '--h': '75%' } as any} />
          <span style={{ '--d': '0.1s', '--h': '90%' } as any} />
          <span style={{ '--d': '0.45s', '--h': '60%' } as any} />
          <span style={{ '--d': '0.2s', '--h': '85%' } as any} />
          <span style={{ '--d': '0.55s', '--h': '50%' } as any} />
          <span style={{ '--d': '0.15s', '--h': '95%' } as any} />
          <span style={{ '--d': '0.35s', '--h': '70%' } as any} />
          <span style={{ '--d': '0.5s', '--h': '80%' } as any} />
          <span style={{ '--d': '0.25s', '--h': '65%' } as any} />
          <span style={{ '--d': '0.4s', '--h': '85%' } as any} />
        </div>
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
            Presença profissional rápida e elegante para ser encontrado no Google, transmitir autoridade e abrir conversas no seu WhatsApp.
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
                    <div className="web-portfolio-window-bar" aria-hidden="true">
                      <span className="web-portfolio-window-dots">
                        <i className="dot-red" />
                        <i className="dot-yellow" />
                        <i className="dot-green" />
                      </span>
                      <span className="web-portfolio-window-url">
                        <svg viewBox="0 0 16 16" fill="currentColor" width="9" height="9">
                          <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd"/>
                        </svg>
                        {item.domain}
                      </span>
                      <span className="web-portfolio-window-badge">{item.badge}</span>
                    </div>
                    <div className="web-portfolio-media">
                      <SiteImage src={item.image} alt={index < row.length ? item.name : ""} sizes="(max-width: 760px) 78vw, 28vw" quality={82} />
                    </div>
                    <span>
                      <small>{item.kind}</small>
                      <strong>{item.name}</strong>
                      <em><i />{item.action}</em>
                      <b>Ampliar projeto <WebArrow /></b>
                    </span>
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
          {dashPlans.map((plan, index) => (
            <a href="#investimento" key={plan.id} className="dash-entry-card">
              <div className="dash-entry-card-top">
                <small>0{index + 1} · FORMATO</small>
                <span className="dash-entry-badge">{plan.badge}</span>
              </div>
              <h3 className="dash-entry-card-title">{plan.name}</h3>
              <p className="dash-entry-desc">{plan.pitch}</p>
              
              <div className="dash-entry-price-wrap">
                <div className="dash-entry-price-amount">
                  PROJETO SOB MEDIDA
                </div>
                <div className="dash-entry-perk-row">
                  <span className="dash-entry-perk-pill">
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    {plan.deliverableBadge}
                  </span>
                </div>
              </div>

              <ul className="dash-entry-features">
                {plan.features.slice(0, 3).map((feat, hIdx) => (
                  <li key={hIdx}>
                    <i aria-hidden="true" />
                    <span><b>{feat.title}:</b> {feat.desc}</span>
                  </li>
                ))}
              </ul>

              <div className="dash-entry-action">
                <span>Ver escopo e proposta</span>
                <WebArrow />
              </div>
            </a>
          ))}
        </div>
      </section>

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

      <section className="section investment dash-investment-fluid" id="investimento">
        <div className="section-heading">
          <div>
            <span className="section-index">04 / FORMATOS DE ENGENHARIA SOB MEDIDA</span>
            <h2 id="configurar-plano">Engenharia digital de alta performance.<br />Planejada para o momento da sua empresa.</h2>
          </div>
          <p>
            Desenvolvemos páginas ultrarrápidas (0.2s LCP), responsivas e pensadas estrategicamente para transformar visitantes em contatos qualificados.
          </p>
        </div>

        {/* 1. Dock de Garantia e Engenharia de Alta Performance */}
        <div className="value-assurance-dock dash-assurance-dock">
          <div className="assurance-radar-pill dash-radar-pill">
            <span className="dock-radar-dot dash-dot" />
            <span>ENGENHARIA DE ALTA PERFORMANCE · PROJETO EXCLUSIVO</span>
          </div>
          <p className="assurance-headline">
            Páginas ultrarrápidas (0.2s LCP), design autoral e copywriting persuasivo pensados especificamente para transformar visitantes casuais em contatos qualificados no seu WhatsApp.
          </p>
          <div className="assurance-perks-row">
            <div className="perk-chip">
              <span className="perk-icon">⚡</span>
              <span>Primeiro Rascunho em até 48h</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">🚀</span>
              <span>Nota 100 no Google PageSpeed</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">🔍</span>
              <span>SEO Técnico Local Otimizado</span>
            </div>
            <div className="perk-chip">
              <span className="perk-icon">🛡️</span>
              <span>Hospedagem &amp; SSL Blindado Inclusos</span>
            </div>
          </div>
        </div>

        {/* 2. Grid com os 3 Formatos Principais (Landing, Institucional e Loja Virtual) */}
        <div className="plans-showcase-grid-compact">
          {dashPlans.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <article
                className={`plan-compact-card dash-compact-card ${isFeatured ? "featured" : ""}`}
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
                  className="plan-compact-btn btn-dash-glow"
                  onClick={() =>
                    startBudgetConversation(
                      plan.name,
                      `Olá! Gostaria de uma proposta e apresentação para o projeto de ${plan.name} da Avancini Dash.`
                    )
                  }
                >
                  <span>{plan.ctaText}</span>
                  <WebArrow />
                </button>
                <small className="plan-compact-subnote">
                  {plan.deliverableBadge}
                </small>
              </article>
            );
          })}
        </div>

        <div className="offer-standard" aria-label="O que está presente em toda entrega Avancini Dash">
          <div><small>O PADRÃO NÃO MUDA</small><strong>A estrutura muda. A qualidade, não.</strong></div>
          <span><b>01</b> Estratégia e texto</span>
          <span><b>02</b> Design adaptado à marca</span>
          <span><b>03</b> Celular e carregamento rápido</span>
          <span><b>04</b> Publicação e contato integrado</span>
        </div>
        <p className="investment-note">Valores de lançamento para escopos iniciais. Todos os ciclos mantêm a mesma qualidade e incluem publicação, hospedagem de alta velocidade, SSL, suporte e acompanhamento.</p>
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

      <DashSiteDiagnosticSection onLead={(message) => startBudgetConversation("Diagnóstico Gratuito de Site", message)} />

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
            <a href="#retorno">Custo x Retorno</a>
            <a href="#metodo">Metodologia</a>
            <a href="#configurar-plano">Serviços e planos</a>
            <a href="#diagnostico">Diagnóstico gratuito</a>
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
          className="web-lead-modal dash-web-lead-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Iniciar conversa pelo WhatsApp"
        >
          <form onSubmit={submitLead}>
            <header className="lead-modal-header">
              <div className="lead-avatar-wrap">
                <div className="lead-avatar-img">
                  <AvanciniMark variant="dash" className="lead-logo-mark avancini-a-mark" />
                </div>
                <span className="lead-status-dot" aria-label="Online" />
              </div>
              <div className="lead-header-info">
                <strong className="lead-title">José Avancini · Web &amp; Alta Performance</strong>
                <div className="lead-status-row">
                  <span className="lead-online-badge">online</span>
                  <span className="lead-response-time"> - responde em minutos</span>
                </div>
              </div>
              <button
                className="web-lead-close"
                type="button"
                onClick={() => setLeadOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </header>

            {leadIntent && (
              <div className="lead-context-pill">
                <span>⚡ Interesse: <strong>{leadIntent}</strong></span>
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
                    onChange={(event) => { setLeadName(event.target.value); if (leadError) setLeadError(""); }}
                    placeholder="Seu nome ou empresa"
                    autoComplete="name"
                    aria-label="Seu nome ou empresa"
                    aria-invalid={Boolean(leadError)}
                    aria-describedby={leadError ? "lead-name-error" : undefined}
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
            {leadError && <p className="lead-error" id="lead-name-error" role="alert">{leadError}</p>}
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
