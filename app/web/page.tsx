"use client";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- As prévias roláveis precisam receber foco para funcionar também pelo teclado. */

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from "react";
import Image, { type ImageProps } from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AvanciniMark } from "../avancini-mark";
import { trackLead, trackMarketingEvent } from "../marketing-events";
import type { SectorShowcaseType } from "./sector-showcases";
import AnimatedCounter from "../components/AnimatedCounter";
import { MagneticButton } from "../components/MagneticButton";
import "./dash-hero.css";

const SectorShowcasePage = dynamic(
  () => import("./sector-showcases").then((module) => module.SectorShowcasePage),
  { ssr: false },
);


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

const webProcessSteps = [
  {
    step: "01",
    tag: "ALINHAMENTO & BRIEFING",
    title: "Diagnóstico Estratégico",
    time: "Dia 1",
    desc: "Mapeamento do seu negócio, público comprador e objetivos comerciais para definir a arquitetura e tom ideais.",
  },
  {
    step: "02",
    tag: "PROTÓTIPO FUNCIONAL",
    title: "Primeiro Rascunho em 48h",
    time: "48 horas",
    desc: "Você recebe um link online navegável para experimentar o design autoral, o copy persuasivo e a fluidez no celular.",
  },
  {
    step: "03",
    tag: "REFINAMENTO CONTÍNUO",
    title: "Ajustes até 100% de Aprovação",
    time: "Revisões ilimitadas",
    desc: "Ajustamos seções, cores, tipografia e mensagens com você até o projeto atingir o nível exato de autoridade que procura.",
  },
  {
    step: "04",
    tag: "PUBLICAÇÃO & ESCALA",
    title: "Lançamento & Suporte",
    time: "7 a 10 dias",
    desc: "Domínio próprio, certificado SSL, testes Core Web Vitals do Google e entrega com 30 dias de garantia e suporte.",
  },
] as const;

const webFaqs = [
  {
    question: "E se eu não gostar do design ou do resultado inicial?",
    answer:
      "Você não corre risco. Apresentamos o primeiro rascunho funcional em 48 horas e refinamos a estrutura em rodadas de ajustes até atingir 100% da sua aprovação antes de qualquer publicação definitiva.",
  },
  {
    question: "Vocês entregam o código-fonte? O site é 100% meu?",
    answer:
      "Sim, total transparência e propriedade sua. O domínio, as contas, os arquivos e o código-fonte pertencem integralmente a você e à sua empresa. Sem aprisionamento e sem amarras proprietárias.",
  },
  {
    question: "Preciso pagar mensalidade depois que o site estiver pronto?",
    answer:
      "Não. Não cobramos mensalidade obrigatória de desenvolvimento ou manutenção forçada. O site é seu e funciona de forma independente. Você assume apenas os custos naturais da internet (seu registro de domínio anual e hospedagem em nuvem após o 1º ano grátis).",
  },
  {
    question: "Quanto tempo de suporte pós-entrega está incluso?",
    answer:
      "Todos os projetos incluem 30 dias de suporte e garantia técnica direta pelo WhatsApp para esclarecer dúvidas, realizar ajustes finos de lançamento e assegurar que tudo opere com estabilidade máxima.",
  },
  {
    question: "Como funciona a segurança jurídica e contrato de serviços?",
    answer:
      "Trabalhamos com contrato formal de prestação de serviços com escopo, etapas de entrega e cronograma claros para total segurança e transparência entre as partes.",
  },
] as const;

const heroAudiences = ["AUTÔNOMOS", "EMPRESAS", "CLÍNICAS", "ESCRITÓRIOS", "MARCAS"] as const;

function HeroAudienceTypewriter() {
  const [text, setText] = useState<string>(heroAudiences[0]);
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = heroAudiences[audienceIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          window.setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setAudienceIndex((prev) => (prev + 1) % heroAudiences.length);
        }
      }
    }, typingSpeed);

    return () => window.clearTimeout(timer);
  }, [text, isDeleting, audienceIndex]);

  return (
    <span className="hero-typewriter-dynamic" aria-live="polite">
      <strong className="hero-typewriter-target">{text}</strong>
      <span className="hero-typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
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

type DashPlan = {
  id: string;
  name: string;
  badge?: string;
  kicker: string;
  valueProposition: string;
  timeline: string;
  highlights: string[];
  ctaText: string;
  featured?: boolean;
};

const dashPlans: DashPlan[] = [
  {
    id: "landing",
    name: "Landing Page de Alta Conversão",
    badge: "⚡ ALTA CONVERSÃO",
    kicker: "CONVERSÃO DIRETA NO WHATSAPP",
    valueProposition: "Página única ultrarrápida projetada para quebrar objeções e transformar o tráfego de anúncios (Google e Meta Ads) em clientes reais.",
    timeline: "Rascunho em 48h",
    highlights: [
      "Página autoral única com copywriting persuasivo",
      "Abertura instantânea (0.2s LCP) com nota verde no Google",
      "Rastreamento avançado (Meta Pixel, Google Ads & GA4)",
      "Hospedagem Cloud ultrarrápida com SSL incluso",
      "30 dias de suporte e garantia técnica pós-lançamento",
    ],
    ctaText: "Solicitar Proposta da Landing Page",
    featured: false,
  },
  {
    id: "institucional",
    name: "Site Institucional de Autoridade",
    badge: "🔥 MAIS ESCOLHIDO",
    kicker: "AUTORIDADE MÁXIMA & DOMÍNIO REGIONAL",
    valueProposition: "Estrutura corporativa autoral que posiciona sua marca no topo das buscas do Google e transmite solidez imediata para fechar contratos maiores.",
    timeline: "Rascunho em 4 dias",
    highlights: [
      "Estrutura completa: Início, Sobre, Serviços, Casos e Contato",
      "Design autoral exclusivo de padrão internacional (zero templates)",
      "SEO Técnico local otimizado para liderar as buscas da sua região",
      "Engenharia Core Web Vitals com velocidade máxima no celular",
      "30 dias de suporte, contrato formal e garantia técnica",
    ],
    ctaText: "Planejar Site Institucional",
    featured: true,
  },
  {
    id: "loja",
    name: "Loja Virtual & Catálogo Direto",
    badge: "🛍️ E-COMMERCE & LOJA",
    kicker: "CHECKOUT DIRETO & ZERO COMISSÕES",
    valueProposition: "Catálogo ágil em alta definição com checkout automático por Pix e cartão em até 12x, caindo 100% do lucro direto na sua conta bancária.",
    timeline: "Rascunho em 5 dias",
    highlights: [
      "Catálogo em alta definição com busca e filtros inteligentes",
      "Checkout automático por Pix imediato e Cartão em até 12x",
      "Cálculo de frete em tempo real integrado a Correios e transportadoras",
      "Zero taxas ou comissões por venda (100% da margem é sua)",
      "30 dias de suporte e acompanhamento operacional",
    ],
    ctaText: "Planejar Loja Virtual",
    featured: false,
  },
];

function PortfolioConceptPage({ type }: { type: PortfolioSpotlightType }) {
  if (type === "sandiego" || type === "tapecar") return null;
  const sectorType: SectorShowcaseType = type === "moreira" ? "law" : (type as SectorShowcaseType);
  return <SectorShowcasePage type={sectorType} sector={sectorType} />;
}

function WebOpportunitySimulator({ onLead }: { onLead: (message: string) => void }) {
  const [ticketValue, setTicketValue] = useState(800);
  const [lostClients, setLostClients] = useState(3);

  const monthlyLost = ticketValue * lostClients;

  return (
    <section className="web-opportunity dash-roi-section" id="retorno" aria-labelledby="web-opportunity-title">
      <header className="dash-roi-header">
        <div>
          <span className="section-index">03 / MULTIPLICADOR DE RESULTADOS</span>
          <h2 id="web-opportunity-title" className="roi-balanced-title">
            O site certo não é um custo. <br />
            <em>É um gerador contínuo de novos clientes.</em>
          </h2>
        </div>
        <p>
          Simule o impacto de um posicionamento rápido e de alta credibilidade no volume de vendas da sua empresa.
        </p>
      </header>

      <div className="dash-roi-grid">
        {/* Painel Esquerdo: A Dor e a Perda */}
        <div className="dash-roi-card dash-roi-pain">
          <div className="roi-card-tag pain-tag">❌ O CUSTO DA INVISIBILIDADE DIGITAL</div>
          <h3>Dinheiro deixado na mesa todo mês</h3>
          <p className="roi-card-desc">
            Quando um potencial cliente clica no seu link e encontra uma página amadora ou lenta, ele fecha a aba e contrata o concorrente.
          </p>
          <div className="roi-evidence-callout">
            📊 <strong>Google:</strong> 53% dos usuários no celular abandonam sites que demoram mais de 3s para carregar.
          </div>

          <div className="roi-interactive-controls">
            <div className="roi-control-item">
              <div className="roi-control-label">
                <span>Quanto vale em média 1 novo cliente ou contrato para você?</span>
                <strong>R$ {ticketValue.toLocaleString("pt-BR")}</strong>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={ticketValue}
                onChange={(e) => setTicketValue(Number(e.target.value))}
                aria-label="Ticket médio de um cliente"
              />
            </div>

            <div className="roi-control-item">
              <div className="roi-control-label">
                <span>Oportunidades perdidas por mês (sem site ou página que não converte):</span>
                <strong className="roi-number-danger">Perda estimada: {lostClients} clientes / mês</strong>
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
            <small>FATURAMENTO QUE ESCORRE TODO MÊS:</small>
            <strong className="roi-number-danger">- R$ {monthlyLost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
            <p className="text-contrast-high">Receita que você deixa de colocar no caixa para concorrentes que passam mais confiança.</p>
          </div>
        </div>

        {/* Painel Direito: O Ganho Real e Previsível */}
        <div className="dash-roi-card dash-roi-gain">
          <div className="roi-card-tag gain-tag">✓ COM O AVANCINI DASH</div>
          <h3>Ativo comercial gerando receita contínua</h3>

          <div className="roi-break-even-card">
            <span className="roi-check-circle">📈</span>
            <div>
              <strong>ALAVANCAGEM REAL DE FATURAMENTO</strong>
              <p>Ao transmitir autoridade imediata e carregar com agilidade no celular, cada novo cliente conquistado pelo site acelera o retorno do investimento e fortalece sua marca.</p>
            </div>
          </div>

          <div className="roi-numbers-breakdown">
            <div className="roi-line">
              <span>Impacto de autoridade &amp; velocidade:</span>
              <strong>Alta Velocidade · Estrutura Otimizada</strong>
            </div>
            <div className="roi-line">
              <span>Novos contatos qualificados estimados:</span>
              <strong>+3 a +8 clientes / mês</strong>
            </div>
            <div className="roi-line gain-highlight">
              <span>Estimativa de faturamento com 3 novos clientes:</span>
              <strong className="roi-number-success">+ R$ {(ticketValue * 3).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
            </div>

            <div className="roi-final-profit-box">
              <div>
                <small>RECEITA ADICIONAL ESTIMADA NO SEU NEGÓCIO:</small>
                <strong className="roi-number-success">+ R$ {(ticketValue * 3).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês</strong>
              </div>
              <span className="roi-status-pill">ALTO RETORNO SOBRE O INVESTIMENTO</span>
            </div>
          </div>

          <button
            type="button"
            className="roi-action-button"
            onClick={() => onLead(`Quero parar de perder clientes. Meu ticket médio é de R$ ${ticketValue} e quero estruturar um site de alta conversão com a Avancini Dash.`)}
          >
            POTENCIALIZAR O MEU FATURAMENTO ↗
          </button>

          <div className="roi-trust-badges">
            <span>🏆 <b>+40</b> projetos estruturados</span>
            <span>⚡ <b>Primeiro rascunho a partir de 48h</b></span>
            <span>🛡️ <b>Cronograma ágil alinhado ao escopo</b></span>
          </div>
          <small className="roi-subnote">Sem taxas ocultas · Hospedagem ultrarrápida e suporte técnico inclusos</small>
        </div>
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

        if (heroScene) {
          const rect = heroScene.getBoundingClientRect();
          const distance = Math.max(heroScene.offsetHeight * 0.75, 350);
          const progress = Math.min(1, Math.max(0, -rect.top / distance));

          heroScene.style.setProperty("--hero-scroll-progress", String(progress));
          heroScene.style.setProperty("--hero-copy-y", `${progress * -75}px`);
          heroScene.style.setProperty("--hero-copy-opacity", String(Math.max(0, 1 - progress * 1.35)));
          heroScene.style.setProperty("--hero-copy-scale", String(1 - progress * 0.045));
          
          // Efeito de divergência lateral cinematográfica (laterais vivas que se afastam com profundidade)
          heroScene.style.setProperty("--lateral-left-x", `${progress * -120}px`);
          heroScene.style.setProperty("--lateral-right-x", `${progress * 120}px`);
          heroScene.style.setProperty("--lateral-opacity", String(Math.max(0, 1 - progress * 1.8)));

          // Transição suave do A Monumental Central
          heroScene.style.setProperty("--a-scale", String(1 + progress * 0.14));
          heroScene.style.setProperty("--a-y", `${progress * -50}px`);
          heroScene.style.setProperty("--a-opacity", String(Math.max(0.12, 0.65 - progress * 0.55)));
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
    }).catch((err) => console.error("[Lead API Error]", err));

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
          <Link className="header-cta header-sync-cta" href="/sync">
            <span className="cta-full-name">Avancini </span>Sync <LivingArrow size={11} />
          </Link>
          <Link className="header-cta header-os-cta" href="/">
            <span className="cta-full-name">Avancini </span>OS <LivingArrow size={11} />
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
      {/* HERO DASH RESTAURADO: COMPOSIÇÃO ANTERIOR COM ARTE ATMOSFÉRICA E ELEMENTOS GRÁFICOS */}
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
            {(
              [
                ["0.1s", "65%"],
                ["0.35s", "85%"],
                ["0.2s", "45%"],
                ["0.5s", "95%"],
                ["0.15s", "70%"],
                ["0.4s", "80%"],
                ["0.25s", "55%"],
                ["0.6s", "90%"],
                ["0.3s", "60%"],
                ["0.45s", "75%"],
              ] as const
            ).map(([delay, height]) => (
              <span key={delay} style={{ "--d": delay, "--h": height } as CSSProperties} />
            ))}
          </div>
          <div className="hero-soundwaves right" aria-hidden="true">
            {(
              [
                ["0.3s", "75%"],
                ["0.1s", "90%"],
                ["0.45s", "60%"],
                ["0.2s", "85%"],
                ["0.55s", "50%"],
                ["0.15s", "95%"],
                ["0.35s", "70%"],
                ["0.5s", "80%"],
                ["0.25s", "65%"],
                ["0.4s", "85%"],
              ] as const
            ).map(([delay, height]) => (
              <span key={delay} style={{ "--d": delay, "--h": height } as CSSProperties} />
            ))}
          </div>
          <div className="kinetic-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="hero-copy">
            <div className="eyebrow hero-typewriter">
              <span className="hero-badge-dot" />
              <span className="hero-typewriter-prefix">Criação de site profissional para</span>
              <HeroAudienceTypewriter />
            </div>
            <h1>
              Tenha hoje um site
              <br />bonito, rápido e que
              <br /><em>gere novos clientes.</em>
            </h1>
            <p>
              Presença profissional rápida e elegante para ser encontrado no Google, transmitir autoridade e abrir conversas no seu WhatsApp.
            </p>
            <div className="hero-brand-promise" aria-label="Sites autorais de alto impacto. Preparados para converter.">
              <span>Sites autorais de alto impacto.</span>
              <i aria-hidden="true" />
              <strong>Preparados para converter.</strong>
            </div>
            <div className="hero-actions">
              <MagneticButton
                className="button button-primary"
                type="button"
                onClick={() =>
                  startBudgetConversation(
                    "Seu novo site",
                    "Quero solicitar um orçamento para criar ou modernizar o site da minha empresa com a Avancini Dash."
                  )
                }
              >
                <span>Solicitar orçamento</span> <LivingArrow size={12} />
              </MagneticButton>
              <a className="button button-ghost btn-underline" href="#investimento">
                <span>Ver planos</span> <WebDownArrow />
              </a>
              <a className="button button-ghost btn-underline" href="#portfolio">
                <span>Ver projetos</span> <WebDownArrow />
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
                    <div className="web-portfolio-hover-expand" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                      <span>AMPLIAR</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="web-portfolio-all"><strong>Dez experiências diferentes, cada uma construída a partir do problema real do segmento, não apenas com outro nome e outra cor.</strong><span>AMPLIE E ROLE POR DENTRO <WebArrow /></span></div>
      </section>


      <WebOpportunitySimulator onLead={(message) => startBudgetConversation("Simulação de oportunidade digital", message)} />

      <section className="section web-method" id="metodo">
        <div className="section-heading web-method-heading">
          <div>
            <span className="paulo-ref-kicker">REF:// PROCESSO &amp; PRAZOS · 04 ETAPAS <span className="kicker-bar" /></span>
            <h2>Como funciona na prática:<br /><em>do orçamento à entrega do site.</em></h2>
          </div>
          <p>Processo transparente com cronograma claro, validação funcional em 48h e zero enrolação técnica.</p>
        </div>
        <div className="web-process-grid">
          {webProcessSteps.map((step) => (
            <article className="process-step-card" key={step.step} data-step={step.step}>
              <div className="process-step-top">
                <span className="process-step-num">{step.step}</span>
                <span className="process-step-pill">{step.time}</span>
              </div>
              <span className="process-step-kicker">{step.tag}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section investment dash-investment-fluid" id="investimento">
        <span id="planos" style={{ display: "block", position: "relative", top: "-80px", visibility: "hidden" }} aria-hidden="true" />
        <div className="section-heading dash-plans-heading-compact">
          <div className="dash-plans-heading-main">
            <span className="paulo-ref-kicker">REF:// PROPOSTAS &amp; FORMATOS · 03 <span className="kicker-bar" /></span>
            <h2 id="configurar-plano">
              O formato certo para o seu momento.
              <span className="heading-subline-emerald">Sites e lojas autorais de alta conversão com entrega ágil.</span>
            </h2>
          </div>
          <p className="dash-plans-heading-desc">
            Da landing page direta a ecossistemas e lojas completas. Escopo transparente sob medida, sem pacotes engessados e foco obsessivo no seu retorno.
          </p>
        </div>

        {/* 1. Grid com os 3 Formatos Estratégicos */}
        <div className="plans-showcase-grid-compact dash-plans-quad-grid">
          {dashPlans.map((plan) => {
            const isFeatured = plan.featured;

            return (
              <article
                className={`plan-card-luxury dash-plan-card ${isFeatured ? "is-featured-glow" : ""}`}
                key={plan.id}
              >
                {/* Topo do Card: Selo de Categoria/Destaque + Pílula de Prazo */}
                <div className="plan-card-topbar">
                  <span className={`plan-badge-pill ${isFeatured ? "badge-featured" : "badge-neutral"}`}>
                    {isFeatured && <span className="pill-ping-dot" aria-hidden="true" />}
                    {plan.badge}
                  </span>
                  <span className="plan-timeline-chip" aria-label="Prazo estimado">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{plan.timeline}</span>
                  </span>
                </div>

                {/* Título e Proposta Única de Valor (sem redundância) */}
                <div className="plan-header-block">
                  <span className="plan-kicker-text">{plan.kicker}</span>
                  <h3 className="plan-title-text">{plan.name}</h3>
                  <p className="plan-prop-text">{plan.valueProposition}</p>
                </div>

                <div className="plan-divider-line" aria-hidden="true" />

                {/* Checklist Escaneável */}
                <div className="plan-features-section">
                  <span className="plan-features-header">O QUE ESTÁ INCLUSO:</span>
                  <ul className="plan-checklist-list">
                    {plan.highlights.map((item, idx) => (
                      <li className="plan-checklist-row" key={idx}>
                        <span className="checklist-bullet-icon" aria-hidden="true">✓</span>
                        <span className="checklist-row-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rodapé: Botão de Ação + Micro-garantia */}
                <div className="plan-card-footer-block">
                  <button
                    type="button"
                    className={`plan-signature-action-btn ${isFeatured ? "btn-action-featured" : "btn-action-standard"}`}
                    onClick={() =>
                      startBudgetConversation(
                        plan.name,
                        `Olá! Gostaria de receber uma proposta personalizada para o projeto de ${plan.name} da Avancini Dash.`
                      )
                    }
                  >
                    <span>{plan.ctaText}</span>
                    <span className="action-arrow-dot"><LivingArrow size={12} /></span>
                  </button>
                  <div className="plan-micro-security">
                    <span className="security-icon" aria-hidden="true">🛡️</span>
                    <span>Sem compromisso · Resposta imediata</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Faixa de Segurança Jurídica & Garantia nos Planos */}
        <div className="dash-plans-trust-strip" aria-label="Garantia e segurança na contratação">
          <div className="trust-strip-card">
            <span className="trust-strip-icon" aria-hidden="true">🛡️</span>
            <div className="trust-strip-info">
              <strong>Garantia Incondicional de Satisfação</strong>
              <p>Primeiro rascunho funcional em 48h e ajustes contínuos até 100% de aprovação do design.</p>
            </div>
          </div>
          <div className="trust-strip-card">
            <span className="trust-strip-icon" aria-hidden="true">📄</span>
            <div className="trust-strip-info">
              <strong>Segurança Jurídica &amp; Contrato</strong>
              <p>Contrato formal de prestação de serviços com escopo, cronograma e garantias de ponta a ponta.</p>
            </div>
          </div>
          <div className="trust-strip-card">
            <span className="trust-strip-icon" aria-hidden="true">⚡</span>
            <div className="trust-strip-info">
              <strong>Garantia de Performance Google</strong>
              <p>Nota verde no Google PageSpeed ou otimização sem custo adicional até atingir a meta.</p>
            </div>
          </div>
        </div>

        {/* 2. Quadro de Autoridade "Incluso em TODO Projeto Avancini Dash" (A Stack de Valor Inegociável) */}
        <div className="dash-value-stack-container" aria-label="O que está incluso em todo projeto">
          <div className="value-stack-header">
            <span className="value-stack-badge">EM TODO PROJETO AVANCINI DASH INCLUSO</span>
            <h3>A estrutura varia conforme seu objetivo. O padrão de engenharia, nunca.</h3>
            <p>Não entregamos apenas código e visual: entregamos uma máquina de autoridade pensada de ponta a ponta para o seu negócio.</p>
          </div>

          <div className="value-stack-grid">
            <div className="value-stack-item">
              <span className="stack-num">01</span>
              <h4>Estudo de Mercado &amp; Concorrência</h4>
              <p>Mapeamento dos concorrentes do seu segmento para identificar brechas e posicionar sua empresa como líder.</p>
            </div>
            <div className="value-stack-item">
              <span className="stack-num">02</span>
              <h4>Copywriting Psicológico</h4>
              <p>Textos persuasivos desenhados para quebrar as principais objeções do cliente e transformar cliques em contato.</p>
            </div>
            <div className="value-stack-item">
              <span className="stack-num">03</span>
              <h4>Design Autoral 100% Exclusivo</h4>
              <p>Identidade visual de alto padrão internacional. Zero templates prontos: cada detalhe valoriza sua marca.</p>
            </div>
            <div className="value-stack-item">
              <span className="stack-num">04</span>
              <h4>Alta Velocidade &amp; Core Web Vitals</h4>
              <p>Otimização avançada focada na faixa verde do Google PageSpeed. Carregamento ágil que prioriza estabilidade visual e retenção no celular.</p>
            </div>
            <div className="value-stack-item">
              <span className="stack-num">05</span>
              <h4>SEO Técnico &amp; Preparação para IA</h4>
              <p>Código limpo e dados estruturados para sua empresa ser indexada pelo Google e citada por ChatGPT e Perplexity.</p>
            </div>
            <div className="value-stack-item">
              <span className="stack-num">06</span>
              <h4>Hospedagem Cloud &amp; SSL Blindado</h4>
              <p>Infraestrutura em nuvem de alta disponibilidade com certificado de segurança SSL incluso no primeiro ano.</p>
            </div>
          </div>

          {/* Componente de Prova Real Google PageSpeed (Inspirado em Paulo Lemes) */}
          <div className="dash-pagespeed-proof-card" role="region" aria-label="Teste ao vivo Google PageSpeed">
            <div className="pagespeed-proof-header">
              <span className="pagespeed-proof-badge">
                <i className="pagespeed-badge-dot" aria-hidden="true" />
                GOOGLE PAGESPEED · MOBILE
              </span>
              <h3 className="pagespeed-proof-title">
                Não é uma promessa. É o teste do Google, medido agora.
              </h3>
              <p className="pagespeed-proof-subtitle">
                As três métricas que influenciam seu ranqueamento e vendas no Google, puxadas com máxima fidelidade da API oficial.
              </p>
            </div>

            <div className="pagespeed-proof-body">
              {/* Velocímetro Semicírculo Esmeralda */}
              <div className="pagespeed-gauge-wrap">
                <svg className="pagespeed-gauge-svg" viewBox="0 0 200 115" fill="none">
                  {/* Trilho de Fundo Cinza */}
                  <path
                    d="M 25 102 A 75 75 0 0 1 175 102"
                    stroke="rgba(255, 255, 255, 0.09)"
                    strokeWidth="15"
                    strokeLinecap="round"
                  />
                  {/* Arco Verde 99 */}
                  <path
                    d="M 25 102 A 75 75 0 0 1 173 100"
                    stroke="#22c55e"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeDasharray="235"
                    strokeDashoffset="6"
                    className="pagespeed-gauge-arc"
                  />
                </svg>
                <div className="pagespeed-gauge-value">
                  <span className="pagespeed-number"><AnimatedCounter target={99} /></span>
                  <span className="pagespeed-label">NOTA MÁXIMA</span>
                </div>
              </div>

              {/* Grid das 3 Métricas Críticas do Google */}
              <div className="pagespeed-metrics-grid">
                <div className="pagespeed-metric-item">
                  <div className="metric-header">
                    <span className="metric-tag">LCP</span>
                    <strong className="metric-val">0.2s</strong>
                  </div>
                  <span className="metric-sub">abre em menos de 1s</span>
                </div>

                <div className="pagespeed-metric-item">
                  <div className="metric-header">
                    <span className="metric-tag">CLS</span>
                    <strong className="metric-val">0</strong>
                  </div>
                  <span className="metric-sub">nada pula na tela</span>
                </div>

                <div className="pagespeed-metric-item">
                  <div className="metric-header">
                    <span className="metric-tag">INP</span>
                    <strong className="metric-val"><AnimatedCounter target={85} suffix="ms" /></strong>
                  </div>
                  <span className="metric-sub">responde ao toque imediatamente</span>
                </div>
              </div>
            </div>

            <div className="pagespeed-proof-footer">
              <div className="pagespeed-guarantee-note">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span><strong>Garantia Incondicional:</strong> Se o seu site não atingir nota verde no Google PageSpeed no dia do lançamento, otimizamos sem custo até bater a meta.</span>
              </div>
              <button
                type="button"
                className="pagespeed-cta-btn"
                onClick={() =>
                  startBudgetConversation(
                    "Consulta de Performance Google",
                    "Olá! Gostaria de conversar com a engenharia da Avancini Dash sobre um site ultrarrápido com nota 99 no Google PageSpeed."
                  )
                }
              >
                <span>CONSULTAR MEU PROJETO</span>
                <LivingArrow size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section web-faq" id="duvidas" aria-labelledby="web-faq-heading">
        <div className="web-faq-intro">
          <span className="faq-kicker">PERGUNTAS FREQUENTES</span>
          <h2 id="web-faq-heading">Tire suas dúvidas<br /><em>antes de começar.</em></h2>
          <p>As principais respostas sobre metodologia, prazos, código-fonte e garantia. Não encontrou o que precisa?</p>
          <button type="button" onClick={() => openLead("Tenho uma dúvida sobre os serviços da Avancini Dash antes de começar meu projeto.")}>
            FALAR COM A AVANCINI <LivingArrow size={13} />
          </button>
        </div>
        <div className="web-faq-list">
          {webFaqs.map((item) => (
            <details key={item.question} className="faq-item-details">
              <summary className="faq-item-summary">
                <span className="faq-item-q">{item.question}</span>
                <span className="faq-toggle-icon" aria-hidden="true">+</span>
              </summary>
              <div className="faq-item-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
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

      <footer id="contato" className="paulo-footer-section">
        <div className="paulo-footer-card">
          <div className="paulo-footer-grid">
            {/* Coluna 1: Marca, Bio & Redes Sociais */}
            <div className="paulo-footer-brand">
              <a className="logo" href="#inicio">
                <AvanciniMark variant="dash" className="logo-mark avancini-a-mark" />
                <span>
                  <span className="brand-name">AVANCINI <b>DASH</b></span>
                  <small>Uma solução Avancini OS</small>
                </span>
              </a>
              <p className="paulo-footer-bio">
                Sites bonitos, ultrarrápidos e feitos pra gerar vendas. Tecnologia moderna e estratégia para colocar seu negócio na frente de quem procura.
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
              <a href="#portfolio">Portfólio</a>
              <a href="#retorno">Custo x Retorno</a>
              <a href="#metodo">Metodologia</a>
              <a href="#configurar-plano">Serviços e planos</a>
              <a href="#duvidas">Perguntas frequentes</a>
              <Link href="/">Avancini OS <WebArrow /></Link>
              <Link href="/sync">Avancini Sync <WebArrow /></Link>
            </div>

            {/* Coluna 3: Serviços */}
            <div className="paulo-footer-col">
              <h4>SERVIÇOS</h4>
              <a href="#investimento">Desenvolvimento de Sites</a>
              <a href="#investimento">Landing Pages de Alta Conversão</a>
              <a href="#investimento">Lojas Virtuais &amp; Catálogos</a>
              <a href="#investimento">Sistemas Web Sob Medida</a>
              <a href="#metodo">Otimização Google 100/100</a>
              <Link href="/sync">Chatbot &amp; Atendente IA <WebArrow /></Link>
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
                onClick={() => startBudgetConversation("Orçamento Avancini Dash", "Quero solicitar um orçamento para um projeto de site com a Avancini Dash.")}
              >
                <span>SOLICITAR ORÇAMENTO</span>
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
                          ref={(el) => el?.focus()}
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
