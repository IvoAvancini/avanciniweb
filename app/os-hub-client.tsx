"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AvanciniMark } from "./avancini-mark";
import "./os-hub.css";

const WHATSAPP_NUMBER = "5573981019782";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Estive no Avancini OS e gostaria de conhecer a solução ideal para minha empresa."
)}`;

function Arrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="hub-arrow-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

type DashSectorKey = "clinica" | "advocacia" | "imoveis" | "roupa" | "solar";

interface DashSectorData {
  id: DashSectorKey;
  name: string;
  url: string;
  kicker: string;
  brandTitle: string;
  headline: string;
  subheadline: string;
  metricLabel: string;
  metricVal: string;
  lcp: string;
  options: string[];
  optionDetails: string[];
  actionCta: string;
  feedbackText: string;
}

const DASH_SECTORS: Record<DashSectorKey, DashSectorData> = {
  clinica: {
    id: "clinica",
    name: "Clínica",
    url: "avancini.tech/clinica-vitta",
    kicker: "CLÍNICA MÉDICA & SAÚDE",
    brandTitle: "Dra. Camila Duarte",
    headline: "Dermatologia & Estética Avançada",
    subheadline: "Agendamento rápido direto no WhatsApp sem tempo de espera.",
    metricLabel: "CONVERSÃO DE PACIENTES",
    metricVal: "+340%",
    lcp: "0.19s LCP · Nota 100",
    options: ["Consulta Médica", "Botox & Estética", "Laser & Peelings"],
    optionDetails: [
      "Próximo horário: Hoje às 16:30 com confirmação instantânea",
      "Procedimento estético: Avaliação facial prévia sem custo",
      "Tratamentos a laser: Protocolos modernos de alta precisão",
    ],
    actionCta: "Agendar Horário no WhatsApp",
    feedbackText: "✓ Horário pré-reservado no sistema da clínica!",
  },
  advocacia: {
    id: "advocacia",
    name: "Advocacia",
    url: "avancini.tech/moreira-direito",
    kicker: "ADVOCACIA EMPRESARIAL",
    brandTitle: "Moreira & Lima Advogados",
    headline: "Proteção Patrimonial e Direito Tributário",
    subheadline: "Atendimento consultivo sigiloso e de alta autoridade para empresas.",
    metricLabel: "LEADS B2B QUALIFICADOS",
    metricVal: "+280%",
    lcp: "0.22s LCP · Nota 100",
    options: ["Tributário & Fiscal", "Societário & M&A", "Contratos B2B"],
    optionDetails: [
      "Triagem sigilosa em até 1 hora útil por advogado sênior",
      "Estruturação jurídica e proteção patrimonial de sócios",
      "Revisão contratual estratégica e prevenção de passivos",
    ],
    actionCta: "Solicitar Análise de Risco",
    feedbackText: "✓ Triagem confidencial iniciada com sucesso!",
  },
  imoveis: {
    id: "imoveis",
    name: "Imóveis",
    url: "avancini.tech/cora-imoveis",
    kicker: "IMOBILIÁRIA ALTO PADRÃO",
    brandTitle: "Reserva Imperial",
    headline: "Mansão Contemporânea 580m² · 4 Suítes",
    subheadline: "R$ 3.850.000 · Condomínio fechado com lazer completo.",
    metricLabel: "PROPOSTAS DIRETAS",
    metricVal: "+410%",
    lcp: "0.18s LCP · Nota 100",
    options: ["Piscina & Fachada", "Área Gourmet", "Suíte Master"],
    optionDetails: [
      "Ambiente externo: fotos 4K carregadas instantaneamente sem delay",
      "Espaço gourmet integrado com climatização e churrasqueira",
      "Suíte com closet walk-in e banheira de imersão",
    ],
    actionCta: "Agendar Visita com Corretor",
    feedbackText: "✓ Corretor especialista notificado via WhatsApp!",
  },
  roupa: {
    id: "roupa",
    name: "Loja de Roupa",
    url: "avancini.tech/aura-store",
    kicker: "MODA & E-COMMERCE",
    brandTitle: "Aura Boutique Studio",
    headline: "Conjunto Alfaiataria Linho Pure · Coleção 2026",
    subheadline: "R$ 289,90 ou 3x de R$ 96,63 sem juros · Frete Grátis.",
    metricLabel: "CHECKOUT ULTRARÁPIDO",
    metricVal: "0.12s",
    lcp: "0.18s LCP · Nota 100",
    options: ["Tamanho P", "Tamanho M", "Tamanho G"],
    optionDetails: [
      "Tamanho P: Restam 3 unidades em estoque imediato",
      "Tamanho M: Mais vendido da semana · Envio hoje mesmo",
      "Tamanho G: Modelagem confortável em puro linho",
    ],
    actionCta: "Comprar em 1 Clique (PIX/Cartão)",
    feedbackText: "✓ Pedido processado em 0.12s sem travamento!",
  },
  solar: {
    id: "solar",
    name: "Energia Solar",
    url: "avancini.tech/solarium-solar",
    kicker: "ENGENHARIA FOTOVOLTAICA",
    brandTitle: "Solarium Energia Solar",
    headline: "Simulador de Economia de Energia Fotovoltaica",
    subheadline: "Reduza até 95% da conta de luz da sua residência ou empresa.",
    metricLabel: "ECONOMIA ANUAL ESTIMADA",
    metricVal: "Até 95%",
    lcp: "0.20s LCP · Nota 100",
    options: ["Conta R$ 450/mês", "Conta R$ 1.200/mês", "Conta R$ 2.800/mês"],
    optionDetails: [
      "Economia de R$ 4.860/ano · Sistema com 8 placas · Payback 2.4 anos",
      "Economia de R$ 13.200/ano · Sistema com 18 placas · Payback 2.1 anos",
      "Economia de R$ 31.000/ano · Sistema comercial · Payback 1.8 anos",
    ],
    actionCta: "Receber Estudo Gratuito",
    feedbackText: "✓ Dimensionamento solar calculado e enviado!",
  },
};

type SyncScenarioKey = "agendamento" | "audio" | "qualificacao" | "recuperacao";

interface SyncMessage {
  sender: "client" | "ai";
  content: ReactNode;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  meta?: string;
}

interface SyncScenarioData {
  shortLabel: string;
  badgeSpeed: string;
  statusStrip: string;
  messages: SyncMessage[];
}

const SYNC_SCENARIOS: Record<SyncScenarioKey, SyncScenarioData> = {
  agendamento: {
    shortLabel: "Agendamento 24h",
    badgeSpeed: "Google Calendar",
    statusStrip: "⚡ Agendamento Confirmado às 22:16 · Google Calendar Sincronizado",
    messages: [
      {
        sender: "client",
        content: "Boa noite! Gostaria de agendar para esta semana. Tem horário livre na quinta ou sexta?",
        time: "22:15",
      },
      {
        sender: "ai",
        content: (
          <>
            Boa noite! 😊 Temos <b>quinta às 15h30</b> e <b>sexta às 10h00</b>. Qual prefere?
          </>
        ),
        time: "22:15",
        meta: "Atendente IA · Resposta em 2s · Lido ✓✓",
      },
      {
        sender: "client",
        content: "Sexta às 10h fica perfeito pra mim!",
        time: "22:16",
      },
      {
        sender: "ai",
        content: (
          <>
            Confirmado! <b>Sexta às 10h00</b> sincronizado na sua agenda com lembrete automático.
          </>
        ),
        time: "22:16",
        meta: "Google Calendar · Lido ✓✓",
      },
    ],
  },
  audio: {
    shortLabel: "Ouve Áudio",
    badgeSpeed: "Áudio Transcrito",
    statusStrip: "⚡ Áudio de 22s Compreendido & Respondido em 2s · Zero Espera",
    messages: [
      {
        sender: "client",
        isAudio: true,
        audioDuration: "0:22",
        content: "Queria tirar uma dúvida sobre os prazos de entrega e se tem taxa extra para urgência...",
        time: "14:02",
      },
      {
        sender: "ai",
        content: (
          <>
            Ouvi seu áudio! Entregamos em <b>5 dias úteis</b>, e para urgências priorizamos seu projeto <b>sem nenhuma taxa extra</b>. Deseja que eu reserve a vaga?
          </>
        ),
        time: "14:02",
        meta: "Transcrição IA · Resposta em 2s · Lido ✓✓",
      },
      {
        sender: "client",
        content: "Nossa, que rápido e prático! Sim, pode reservar por favor!",
        time: "14:03",
      },
    ],
  },
  qualificacao: {
    shortLabel: "Qualificação",
    badgeSpeed: "Triagem de Leads",
    statusStrip: "⚡ Lead Corporativo Qualificado · Consultor Notificado",
    messages: [
      {
        sender: "client",
        content: "Olá! Vi o trabalho de vocês e gostaria de saber o valor para implantar.",
        time: "11:20",
      },
      {
        sender: "ai",
        content: (
          <>
            Olá! Seja muito bem-vindo. Qual é o <b>segmento da sua empresa</b> e quantas mensagens vocês recebem/dia?
          </>
        ),
        time: "11:20",
        meta: "Supervisor IA · Triagem Inteligente · Lido ✓✓",
      },
      {
        sender: "client",
        content: "Somos distribuidora com 15 colaboradores, recebemos cerca de 120 mensagens diárias.",
        time: "11:21",
      },
      {
        sender: "ai",
        content: (
          <>
            Excelente! Perfil corporativo identificado. Passei o histórico ao <b>consultor sênior</b> que já vai te chamar.
          </>
        ),
        time: "11:21",
        meta: "Filtro Comercial · Equipe Notificada · Lido ✓✓",
      },
    ],
  },
  recuperacao: {
    shortLabel: "Recuperar Vendas",
    badgeSpeed: "Follow-up Automático",
    statusStrip: "⚡ Orçamento Reengajado após 24h · Venda Salva no Automático",
    messages: [
      {
        sender: "client",
        content: "Gostei muito da proposta! Vou só alinhar com meu sócio hoje e te dou um retorno.",
        time: "Ontem 17:30",
      },
      {
        sender: "ai",
        content: (
          <>
            Oi, Marcos! Bom dia! Passando para saber se conversou com seu sócio. Ficou alguma dúvida sobre prazos ou pagamento?
          </>
        ),
        time: "Hoje 10:00",
        meta: "IA de Follow-up · 24h sem resposta · Lido ✓✓",
      },
      {
        sender: "client",
        content: "Bom dia! Conversamos sim e vamos aprovar o projeto! Pode me enviar o link para assinatura e pagamento?",
        time: "Hoje 10:05",
      },
    ],
  },
};

export function OSHubClient() {
  const [activeHover, setActiveHover] = useState<"dash" | "sync" | null>(null);
  const [dashSector, setDashSector] = useState<DashSectorKey>("clinica");
  const [dashOptionIdx, setDashOptionIdx] = useState(0);
  const [dashFeedback, setDashFeedback] = useState<string | null>(null);

  const [syncScenario, setSyncScenario] = useState<SyncScenarioKey>("agendamento");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAudioPlaying) {
      interval = setInterval(() => {
        setAudioSeconds((prev) => {
          if (prev >= 22) {
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setAudioSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAudioPlaying]);

  const handleSelectSector = (sec: DashSectorKey) => {
    setDashSector(sec);
    setDashOptionIdx(0);
    setDashFeedback(null);
  };

  const handleDashCtaClick = (feedbackMsg: string) => {
    setDashFeedback(feedbackMsg);
    setTimeout(() => {
      setDashFeedback(null);
    }, 3200);
  };

  const handleSelectScenario = (scen: SyncScenarioKey) => {
    setSyncScenario(scen);
    setIsAudioPlaying(false);
    setAudioSeconds(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = Math.min(50, Math.max(25, Math.floor(width / 32)));
    const particles = Array.from({ length: count }, () => {
      const isLeft = Math.random() < 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 1,
        color: isLeft ? "34, 197, 94" : "56, 189, 248",
        alpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        const currentAlpha = p1.alpha + Math.sin(frame * p1.pulseSpeed) * 0.15;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = `rgba(${p1.color}, 0.7)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouseX;
        const mdy = p1.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const mAlpha = (1 - mdist / 140) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(${p1.color}, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [mobileTab, setMobileTab] = useState<"dash" | "sync">("dash");

  const handleExitHub = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("is-os-hub");
      document.body.classList.remove("is-os-hub");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const root = document.querySelector(".os-hub-root");
      if (root) root.scrollTop = 0;

      document.documentElement.classList.add("is-os-hub");
      document.body.classList.add("is-os-hub");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement | null;
        const scrollable = target?.closest(".browser-viewport, .whatsapp-chat-body") as HTMLElement | null;
        if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
          scrollable.scrollTop += e.deltaY;
        }
      };
      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        document.documentElement.classList.remove("is-os-hub");
        document.body.classList.remove("is-os-hub");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
    }
  }, []);

  const currentSector = DASH_SECTORS[dashSector];
  const currentScenario = SYNC_SCENARIOS[syncScenario];

  return (
    <div className={`os-hub-root ${activeHover ? `hover-${activeHover}` : ""}`}>
      {/* Background Atmosphere: Interactive Animated Canvas + Ambient Glows */}
      <div className="hub-atmosphere" aria-hidden="true">
        <canvas ref={canvasRef} className="hub-animated-canvas" />
        <div className="ambient-glow glow-dash-left" />
        <div className="ambient-glow glow-sync-right" />
        <div className="ambient-glow glow-os-matrix" />
        <div className="hub-tech-grid" />
        <div className="hub-energy-beam" />
        <div className="hub-horizon-light" />
        <div className="hub-vignette" />
      </div>

      {/* 1. NAVBAR */}
      <header className="hub-navbar">
        <div className="hub-brand-col">
          <Link href="/" className="hub-brand" aria-label="Avancini OS - Início">
            <AvanciniMark variant="os" className="hub-brand-mark" />
            <div className="hub-brand-text">
              <span className="brand-name">
                AVANCINI <em>OS</em>
              </span>
              <span className="brand-tagline">ECOSSISTEMA DE TECNOLOGIA</span>
            </div>
          </Link>
        </div>

        <div className="hub-ecosystem-switch" aria-label="Soluções Avancini">
          <Link className="hub-switch-pill pill-dash" href="/dash" onClick={handleExitHub}>
            <span className="pill-prefix">Avancini </span>Dash <Arrow />
          </Link>
          <Link className="hub-switch-pill pill-sync" href="/sync" onClick={handleExitHub}>
            <span className="pill-prefix">Avancini </span>Sync <Arrow />
          </Link>
        </div>

        <div className="hub-actions-col">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hub-specialist-btn"
          >
            <span className="hub-status-radar">
              <span className="radar-ping" />
              <span className="radar-core" />
            </span>
            <span className="btn-label-desktop">Falar com especialista</span>
            <span className="btn-label-mobile">Contato</span>
            <Arrow />
          </a>
        </div>
      </header>

      {/* 2. HERO EDITORIAL: DIRETO AO PONTO E ESPAÇOSO (SEM REPETIÇÕES) */}
      <section className="hub-hero-section">
        <h1 className="hub-headline">
          Sua empresa <span className="highlight-dash">mais forte na internet.</span>{" "}
          <br className="hero-break" />
          E <span className="highlight-sync">mais inteligente no WhatsApp.</span>
        </h1>
        <p className="hub-subheadline">
          Websites exclusivos de alta autoridade e agentes de IA operando 24h para fechar negócios reais.
        </p>

      </section>

      {/* Alternador Mobile de Soluções (Garante tela 100% fixa sem rolagem) */}
      <div className="hub-mobile-product-switch" role="tablist" aria-label="Alternar solução mobile">
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "dash"}
          className={`mobile-tab-btn ${mobileTab === "dash" ? "is-active tab-dash" : ""}`}
          onClick={() => setMobileTab("dash")}
        >
          <span className="tab-indicator dot-dash" />
          <span>01 · Dash</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === "sync"}
          className={`mobile-tab-btn ${mobileTab === "sync" ? "is-active tab-sync" : ""}`}
          onClick={() => setMobileTab("sync")}
        >
          <span className="tab-indicator dot-sync" />
          <span>02 · Sync</span>
        </button>
      </div>

      {/* 3. ÁREA VISUAL DO ECOSSISTEMA: HISTÓRIA COESA DE DOIS PRODUTOS */}
      <main className="hub-ecosystem-stage" id="ecossistema">
        {/* ================= PRODUTO 01: AVANCINI DASH ================= */}
        <div
          className={`ecosystem-card card-dash ${activeHover === "dash" ? "is-focused" : ""} ${activeHover === "sync" ? "is-dimmed" : ""} ${mobileTab === "dash" ? "mobile-card-active" : "mobile-card-hidden"}`}
          onMouseEnter={() => setActiveHover("dash")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Atmosfera e Borda com Efeito Suave */}
          <div className="card-bg-gradient" />
          <div className="card-ambient-tint" />
          <div className="card-border-glow" />

          {/* Cabeçalho do Card */}
          <div className="card-header">
            <div className="product-category-row">
              <span className="card-badge badge-dash">
                <i className="badge-dot dot-dash" /> 01 — PRESENÇA DIGITAL
              </span>
              <span className="card-status-pill pill-dash">PERFORMANCE 100/100</span>
            </div>

            <h2 className="product-title">
              Avancini <span className="text-dash">Dash</span>
            </h2>
            <p className="product-punchline">Websites exclusivos e engenharia de alta conversão para consolidar sua marca.</p>
          </div>

          {/* Métricas e Capacidades Técnicas */}
          <div className="product-spec-strip">
            <div className="spec-item">
              <span className="spec-icon">⚡</span>
              <div className="spec-texts">
                <strong>0.2s LCP</strong>
                <small>Velocidade extrema</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">🎯</span>
              <div className="spec-texts">
                <strong>Alta Conversão</strong>
                <small>Arquitetura sob medida</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">💎</span>
              <div className="spec-texts">
                <strong>Autoridade</strong>
                <small>Design de impacto</small>
              </div>
            </div>
          </div>

          {/* Mockup Realista de Interface de Website Interativo */}
          <div className="card-mockup-wrapper dash-mockup-wrapper">
            <div className="realistic-browser-mockup">
              {/* Topbar do Navegador com Alternador Interativo de Nichos */}
              <div className="browser-topbar">
                <div className="browser-nav-group">
                  <div className="browser-traffic-lights">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <div className="browser-address-bar">
                    <span className="ssl-icon">🔒</span>
                    <span className="address-text">{currentSector.url}</span>
                  </div>
                </div>
                <div className="browser-sector-switcher" role="tablist" aria-label="Nichos de demonstração">
                  {(["clinica", "advocacia", "imoveis", "roupa", "solar"] as const).map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      role="tab"
                      aria-selected={dashSector === sec}
                      className={`sector-tab-btn ${dashSector === sec ? "is-active" : ""}`}
                      onClick={() => handleSelectSector(sec)}
                    >
                      {DASH_SECTORS[sec].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport da Página Web Dinâmico */}
              <div className="browser-viewport">
                {/* Mini Header da Página Simulada */}
                <div className="sim-website-header">
                  <div className="sim-site-brand">
                    <span className="sim-brand-dot" />
                    <span className="sim-brand-title">{currentSector.brandTitle}</span>
                  </div>
                  <div className="sim-site-speed-badge">⚡ {currentSector.lcp.split(" · ")[0]}</div>
                </div>

                <div key={dashSector} className="browser-hero-layout tab-fade-in">
                  {/* Coluna Esquerda: Simulação Rápida Interativa */}
                  <div className="viewport-content sim-content-box">
                    <span className="viewport-kicker">{currentSector.kicker}</span>
                    <h3 className="viewport-title">{currentSector.headline}</h3>
                    <p className="viewport-desc">{currentSector.subheadline}</p>

                    {/* Seletor Rápido Interativo */}
                    <div className="sim-interactive-block">
                      <span className="sim-block-label">Simulação rápida (toque para testar):</span>
                      <div className="sim-pills-row" role="group" aria-label="Opções interativas">
                        {currentSector.options.map((opt, idx) => (
                          <button
                            key={opt}
                            type="button"
                            className={`sim-pill-btn ${dashOptionIdx === idx ? "is-active" : ""}`}
                            onClick={() => {
                              setDashOptionIdx(idx);
                              setDashFeedback(null);
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <div className="sim-live-detail-box">
                        <span className="detail-icon">💡</span>
                        <span className="detail-text">{currentSector.optionDetails[dashOptionIdx]}</span>
                      </div>
                    </div>

                    <div className="viewport-btn-row">
                      <button
                        type="button"
                        className="viewport-fake-btn sim-action-trigger"
                        onClick={() => handleDashCtaClick(currentSector.feedbackText)}
                      >
                        {currentSector.actionCta} →
                      </button>
                      {dashFeedback ? (
                        <span className="sim-feedback-tag">{dashFeedback}</span>
                      ) : (
                        <span className="viewport-social-proof">⭐ 5.0 · Arquitetura de Alto Impacto</span>
                      )}
                    </div>
                  </div>

                  {/* Coluna Direita: Dashboard de Métricas e Conversão */}
                  <div className="viewport-metrics-col">
                    {/* Badge Lighthouse 100 */}
                    <div className="viewport-badge badge-lighthouse">
                      <div className="lighthouse-ring">
                        <svg viewBox="0 0 36 36" className="score-ring-svg">
                          <path
                            className="ring-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="ring-val"
                            strokeDasharray="100, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="score-digit">100</span>
                      </div>
                      <div className="lighthouse-info">
                        <strong>Lighthouse 100/100</strong>
                        <small>{currentSector.lcp}</small>
                      </div>
                    </div>

                    {/* Badge Gráfico de Conversão com Curva Visual */}
                    <div className="viewport-badge badge-conversion">
                      <div className="conversion-top-line">
                        <span className="badge-kicker">{currentSector.metricLabel}</span>
                        <strong className="badge-value">{currentSector.metricVal}</strong>
                      </div>
                      <svg className="growth-sparkline" viewBox="0 0 90 18" aria-hidden="true">
                        <defs>
                          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,16 Q20,14 35,9 T65,5 T90,2 L90,18 L0,18 Z"
                          fill="url(#sparklineGrad)"
                        />
                        <path
                          d="M0,16 Q20,14 35,9 T65,5 T90,2"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <small className="badge-note">Estrutura orientada a vendas</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ação Direta para o Produto */}
          <div className="card-action-footer">
            <Link href="/dash" className="card-explore-btn btn-dash" onClick={handleExitHub}>
              <span>Explorar Avancini Dash</span>
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Conector Central Interativo */}
        <div
          className={`ecosystem-connector-bridge ${activeHover ? `active-${activeHover}` : ""}`}
          aria-hidden="true"
        >
          <div className="bridge-laser-line line-top" />
          <div
            className="bridge-node-pill"
            title={
              activeHover === "dash"
                ? "Avancini Dash: Alta Autoridade Digital"
                : activeHover === "sync"
                ? "Avancini Sync: Conversão e IA 24/7"
                : "Sinergia Contínua: Dash atrai ⇄ Sync converte 24/7"
            }
          >
            <span className="bridge-connector-symbol">
              {activeHover === "dash" ? "←" : activeHover === "sync" ? "→" : "⇄"}
            </span>
          </div>
          <div className="bridge-laser-line line-bottom" />
        </div>

        {/* ================= PRODUTO 02: AVANCINI SYNC ================= */}
        <div
          className={`ecosystem-card card-sync ${activeHover === "sync" ? "is-focused" : ""} ${activeHover === "dash" ? "is-dimmed" : ""} ${mobileTab === "sync" ? "mobile-card-active" : "mobile-card-hidden"}`}
          onMouseEnter={() => setActiveHover("sync")}
          onMouseLeave={() => setActiveHover(null)}
        >
          {/* Atmosfera e Borda com Efeito Suave */}
          <div className="card-bg-gradient" />
          <div className="card-ambient-tint" />
          <div className="card-border-glow" />

          {/* Cabeçalho do Card */}
          <div className="card-header">
            <div className="product-category-row">
              <span className="card-badge badge-sync">
                <i className="badge-dot dot-sync" /> 02 — INTELIGÊNCIA ARTIFICIAL
              </span>
              <span className="card-status-pill pill-sync">SUPERVISOR ATIVO 24/7</span>
            </div>

            <h2 className="product-title">
              Avancini <span className="text-sync">Sync</span>
            </h2>
            <p className="product-punchline">Seu WhatsApp acolhendo, qualificando e fechando oportunidades 24 horas por dia.</p>
          </div>

          {/* Métricas e Capacidades Técnicas */}
          <div className="product-spec-strip">
            <div className="spec-item">
              <span className="spec-icon">🤖</span>
              <div className="spec-texts">
                <strong>Supervisor IA</strong>
                <small>Multiagentes treinados</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">⚡</span>
              <div className="spec-texts">
                <strong>&lt; 2s Resposta</strong>
                <small>Zero perda de contato</small>
              </div>
            </div>
            <div className="spec-item">
              <span className="spec-icon">📅</span>
              <div className="spec-texts">
                <strong>Agendamento</strong>
                <small>Fechamento automático</small>
              </div>
            </div>
          </div>

          {/* Mockup Realista de Interface de WhatsApp Interativo */}
          <div className="card-mockup-wrapper sync-mockup-wrapper">
            <div className="realistic-whatsapp-mockup">
              {/* Header do Chat WhatsApp */}
              <div className="whatsapp-topbar">
                <div className="whatsapp-avatar">
                  <span>A</span>
                  <span className="avatar-online-dot" />
                </div>
                <div className="whatsapp-agent-info">
                  <strong>
                    Avancini Sync <span className="verified-badge">✓</span>
                  </strong>
                  <small>Online agora · Resposta em &lt; 2s</small>
                </div>
                <span className="whatsapp-badge-speed">{currentScenario.badgeSpeed}</span>
              </div>

              {/* Alternador de Cenários Interativo — 4 Funções da IA */}
              <div className="whatsapp-scenario-switcher" role="tablist" aria-label="Funções da IA no WhatsApp">
                {(["agendamento", "audio", "qualificacao", "recuperacao"] as const).map((scen) => (
                  <button
                    key={scen}
                    type="button"
                    role="tab"
                    aria-selected={syncScenario === scen}
                    className={`scenario-tab-btn ${syncScenario === scen ? "is-active" : ""}`}
                    onClick={() => handleSelectScenario(scen)}
                  >
                    <span className="scen-dot" />
                    {SYNC_SCENARIOS[scen].shortLabel}
                  </button>
                ))}
              </div>

              {/* Corpo do Diálogo Dinâmico */}
              <div key={syncScenario} className="whatsapp-chat-body tab-fade-in">
                {currentScenario.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-bubble-row ${msg.sender === "client" ? "client-row" : "ai-row"}`}
                  >
                    <div
                      className={`chat-bubble ${
                        msg.sender === "client" ? "client-bubble" : "ai-bubble"
                      } ${msg.isAudio ? "audio-bubble" : ""}`}
                    >
                      {msg.isAudio ? (
                        <div className="audio-bubble-content">
                          <div className="audio-player-line">
                            <button
                              type="button"
                              className="audio-play-glyph-btn"
                              aria-label={isAudioPlaying ? "Pausar áudio" : "Tocar áudio"}
                              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                            >
                              {isAudioPlaying ? "❚❚" : "▶"}
                            </button>
                            <div className={`audio-waves ${isAudioPlaying ? "waves-playing" : ""}`} aria-hidden="true">
                              <span style={{ height: isAudioPlaying ? "65%" : "45%" }} />
                              <span style={{ height: isAudioPlaying ? "100%" : "85%" }} />
                              <span style={{ height: isAudioPlaying ? "75%" : "60%" }} />
                              <span style={{ height: isAudioPlaying ? "90%" : "100%" }} />
                              <span style={{ height: isAudioPlaying ? "50%" : "70%" }} />
                              <span style={{ height: isAudioPlaying ? "85%" : "90%" }} />
                              <span style={{ height: isAudioPlaying ? "60%" : "50%" }} />
                              <span style={{ height: isAudioPlaying ? "95%" : "75%" }} />
                            </div>
                            <span className="audio-len">
                              {isAudioPlaying
                                ? `0:${audioSeconds < 10 ? `0${audioSeconds}` : audioSeconds}`
                                : msg.audioDuration}
                            </span>
                          </div>
                          <p className="audio-transcript-text">{msg.content}</p>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                      {msg.meta ? (
                        <div className="bubble-meta">
                          <span className="ai-tag">{msg.meta.split(" · ")[0]}</span>
                          <time>{msg.time} · Lido ✓✓</time>
                        </div>
                      ) : (
                        <time>{msg.time}</time>
                      )}
                    </div>
                  </div>
                ))}

                {/* Status Sutil de Sucesso (Exibido em cenários de 3 mensagens para preencher perfeitamente) */}
                {currentScenario.messages.length <= 3 && currentScenario.statusStrip && (
                  <div className="chat-status-strip">
                    <span>{currentScenario.statusStrip}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ação Direta para o Produto */}
          <div className="card-action-footer">
            <Link href="/sync" className="card-explore-btn btn-sync" onClick={handleExitHub}>
              <span>Explorar Avancini Sync</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </main>

      {/* 4. FOOTER MINIMALISTA */}
      <footer className="hub-footer">
        <div className="footer-copyright">
          <p>© 2026 AVANCINI OS · Tecnologia com Identidade</p>
        </div>

        <nav className="footer-links-nav" aria-label="Links de rodapé">
          <Link href="/dash" className="f-link" onClick={handleExitHub}>
            Dash
          </Link>
          <span className="f-sep">/</span>
          <Link href="/sync" className="f-link" onClick={handleExitHub}>
            Sync
          </Link>
          <span className="f-sep">/</span>
          <a
            href="https://www.instagram.com/avancinios/"
            target="_blank"
            rel="noreferrer"
            className="f-link"
          >
            Instagram
          </a>
          <span className="f-sep">/</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="f-link">
            WhatsApp
          </a>
        </nav>
      </footer>
    </div>
  );
}
