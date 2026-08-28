"use client";

import { useState, useMemo, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import styles from "./sector-showcases.module.css";

export type SectorShowcaseType =
  | "cars"
  | "mechanic"
  | "dentistry"
  | "aesthetics"
  | "autonomous"
  | "fashion"
  | "law"
  | "salon"
  | "realtor"
  | "realestate"
  | "solar"
  | "tapecar";

const ArrowVector = () => (
  <svg
    width="12"
    height="12"
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

const StaticAction = ({ children, light = false, onClick }: { children: ReactNode; light?: boolean; onClick?: () => void }) => (
  <button type="button" className={`${styles.action} ${light ? styles.actionLight : ""}`} onClick={onClick}>
    {children}
    <ArrowVector />
  </button>
);

const formatBRL = (val: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);

const GoogleWordmark = () => (
  <span style={{ fontWeight: 800, letterSpacing: -0.3, display: "inline-flex" }}>
    <span style={{ color: "#4285F4" }}>G</span>
    <span style={{ color: "#EA4335" }}>o</span>
    <span style={{ color: "#FBBC05" }}>o</span>
    <span style={{ color: "#4285F4" }}>g</span>
    <span style={{ color: "#34A853" }}>l</span>
    <span style={{ color: "#EA4335" }}>e</span>
  </span>
);

const SolarSunLogo = () => (
  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}>
    <circle cx="18" cy="18" r="8" fill="url(#sun-grad-opt)" />
    <path d="M18 2V6M18 30V34M2 18H6M30 18H34M6.68 6.68L9.51 9.51M26.49 26.49L29.32 29.32M6.68 29.32L9.51 26.49M26.49 9.51L29.32 6.68" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
    <defs>
      <radialGradient id="sun-grad-opt" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18 18) scale(8)">
        <stop stopColor="#fde047" />
        <stop offset="1" stopColor="#f59e0b" />
      </radialGradient>
    </defs>
  </svg>
);

const HouseIllustration = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="42" y="16" width="6" height="13" rx="1" fill="#c2410c" />
    <rect x="40" y="14" width="10" height="3" rx="1" fill="#9a3412" />
    <path d="M32 8L6 28H14V54H50V28H58L32 8Z" fill="#ef4444" />
    <path d="M32 8L6 28H11L32 12L53 28H58L32 8Z" fill="#b91c1c" />
    <rect x="14" y="27" width="36" height="27" fill="#fef08a" />
    <rect x="12" y="52" width="40" height="3" fill="#cbd5e1" />
    <rect x="19" y="32" width="10" height="10" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="24" y1="32" x2="24" y2="42" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="19" y1="37" x2="29" y2="37" stroke="#0284c7" strokeWidth="1.5" />
    <rect x="35" y="36" width="10" height="18" rx="2" fill="#92400e" />
    <circle cx="42" cy="45" r="1.2" fill="#fde047" />
    <circle cx="16" cy="51" r="3" fill="#22c55e" />
    <circle cx="48" cy="51" r="3" fill="#22c55e" />
  </svg>
);

const BuildingIllustration = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="14" width="32" height="42" rx="2" fill="#94a3b8" />
    <rect x="20" y="10" width="24" height="6" rx="1" fill="#64748b" />
    <line x1="32" y1="4" x2="32" y2="10" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="4" r="1.5" fill="#ef4444" />
    {[18, 26, 34, 42].map((y) => (
      <g key={y}>
        <rect x="20" y={y} width="6" height="5" rx="1" fill="#38bdf8" />
        <rect x="29" y={y} width="6" height="5" rx="1" fill="#38bdf8" />
        <rect x="38" y={y} width="6" height="5" rx="1" fill="#38bdf8" />
      </g>
    ))}
    <rect x="28" y="48" width="8" height="8" rx="1" fill="#1e293b" />
    <rect x="29" y="49" width="3" height="7" fill="#60a5fa" />
    <rect x="32" y="49" width="3" height="7" fill="#60a5fa" />
    <rect x="10" y="55" width="44" height="3" rx="1.5" fill="#cbd5e1" />
  </svg>
);

const GreenCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="rgba(16, 185, 129, 0.12)" />
    <path d="M8 12L10.8 14.8L16 9.2" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const mechanicOrders = {
  "TL-3891": {
    vehicle: "BMW 320i M Sport 2022",
    progress: 38,
    status: "Diagnóstico eletrônico em validação",
    alert: "Ruído dianteiro acima de 60 km/h",
    diagnosis: "Folga no braço axial direito",
    action: "Aguardando aprovação das peças",
    health: "72%",
    mileage: "48.216 km",
    estimate: "R$ 2.840",
    eta: "Hoje · 17:30",
  },
  "TL-4022": {
    vehicle: "Porsche Macan GTS 2.9 V6",
    progress: 68,
    status: "Revisão preventiva em andamento",
    alert: "Troca programada do fluido PDK",
    diagnosis: "Leitura eletrônica sem anomalias",
    action: "Teste de rodagem agendado",
    health: "91%",
    mileage: "31.804 km",
    estimate: "R$ 3.260",
    eta: "Amanhã · 11:00",
  },
  "TL-2950": {
    vehicle: "Jeep Compass Limited 2021",
    progress: 92,
    status: "Veículo em inspeção final",
    alert: "Vibração registrada na frenagem",
    diagnosis: "Discos e pastilhas substituídos",
    action: "Liberação após checklist",
    health: "96%",
    mileage: "62.491 km",
    estimate: "R$ 1.970",
    eta: "Hoje · 16:20",
  },
} as const;

function MechanicShowcase() {
  const [selectedOS, setSelectedOS] = useState<string>("TL-4022");
  const [reviewOpen, setReviewOpen] = useState(false);
  const order = mechanicOrders[selectedOS as keyof typeof mechanicOrders];

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Quero agendar um diagnóstico automotivo com scanner na Torque Lab para o meu veículo.`
  )}`;

  return (
    <main className={`${styles.site} ${styles.mechanic}`}>
      <header className={styles.proHeaderDark}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitleDark}>
            <span>TORQUE</span><span style={{ color: "#ef4444" }}>LAB</span>
          </div>
          <span className={styles.proBrandTagDark}>Centro Automotivo Especializado</span>
        </div>
        <div className={styles.proHeaderReviewDark}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRailDark}>
        <span>✓ EQUIPE ASE CERTIFICADA</span>
        <span>★ 5.0 NO GOOGLE</span>
        <span>⏱ SCANNER EM 1H</span>
        <span>◇ 12 MESES DE GARANTIA</span>
      </div>

      <section className={styles.mechHero}>
        <div className={styles.mechHeroBackdrop}>
          <Image
            src="/concepts/torque-mechanic.webp"
            alt="Oficina mecânica de precisão Torque Lab"
            width={1536}
            height={1024}
            sizes="100vw"
            quality={80}
            className={styles.mechHeroImg}
            priority
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <div className={styles.mechShade} />

        <div className={styles.mechHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h2>Você acompanha o diagnóstico<br /><i>antes de autorizar 1 centavo.</i></h2>
          <p>Laudo com fotos em alta resolução, leitura OBD-II com scanner de fábrica e aprovação item a item direto pelo celular.</p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Diagnóstico por scanner e vídeo</li>
            <li><GreenCheck /> Peças originais com garantia de 12 meses</li>
            <li><GreenCheck /> Aprovação individual por item sem surpresa</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;A Torque é de longe a oficina mais transparente que já usei. Mandaram vídeo de cada peça com desgaste e aprovei o orçamento pelo WhatsApp. Nota 10!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ef4444", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>
                  FM
                </div>
                <div>
                  <div className={styles.proUserName}>Fernando Martins</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.mechHeroAside} key={selectedOS}>
          <div className={styles.mechPanelTop}><small><i /> CENTRAL DO VEÍCULO</small><b>OS #{selectedOS}</b></div>
          <strong>{order.vehicle}</strong>
          <div className={styles.mechTelemetry}>
            <span><small>SAÚDE MECÂNICA</small><b>{order.health}</b><i>scanner + inspeção</i></span>
            <span><small>QUILOMETRAGEM</small><b>{order.mileage}</b><i>leitura registrada</i></span>
            <span><small>PREVISÃO</small><b>{order.eta}</b><i>atualizada agora</i></span>
          </div>
          <div className={styles.mechProgressMeta}><span>PROGRESSO DA ORDEM</span><b>{order.progress}%</b></div>
          <div className={styles.mechProgressBar}><div style={{ width: `${order.progress}%` }} /></div>
          <em>{order.status}</em>
          <div className={styles.mechApproval}><span><small>ORÇAMENTO TRANSPARENTE</small><b>{order.estimate}</b></span><button type="button" aria-expanded={reviewOpen} onClick={() => setReviewOpen((value) => !value)}>{reviewOpen ? "OCULTAR ITENS" : "REVISAR ITENS"} <ArrowVector /></button></div>
          {reviewOpen ? <div className={styles.mechReviewDrawer}><span><b>Diagnóstico e mão de obra</b><i>incluído</i></span><span><b>Peças recomendadas</b><i>aprovação individual</i></span><span><b>Garantia do serviço</b><i>12 meses</i></span></div> : null}

          <a href={waUrl} target="_blank" rel="noreferrer" className={styles.proBtnWa} style={{ marginTop: 14 }}>
            <span>SOLICITAR AGENDAMENTO NO WHATSAPP</span>
            <ArrowVector />
          </a>
        </aside>
      </section>
      <section className={styles.mechWorkflow} aria-live="polite" key={`workflow-${selectedOS}`}>
        <header><small>OS #{selectedOS} · TRANSPARÊNCIA EM CADA ETAPA</small><h3>Do sintoma à entrega, sem orçamento surpresa.</h3></header>
        <div>
          <article><span>01</span><small>RELATO DO CLIENTE</small><strong>{order.alert}</strong><p>O sintoma entra registrado antes da inspeção.</p></article>
          <article><span>02</span><small>DIAGNÓSTICO TÉCNICO</small><strong>{order.diagnosis}</strong><p>Fotos, leitura e causa provável ficam no mesmo histórico.</p></article>
          <article><span>03</span><small>PRÓXIMO PASSO</small><strong>{order.action}</strong><p>Nada avança sem clareza sobre serviço, prazo e autorização.</p></article>
        </div>
        <footer className={styles.mechProofRail}><span><small>01</small><b>Fotos da entrada</b><i>12 arquivos</i></span><span><small>02</small><b>Laudo do scanner</b><i>assinado digitalmente</i></span><span><small>03</small><b>Aprovação por item</b><i>controle do cliente</i></span><strong>HISTÓRICO COMPLETO · SEM SURPRESA</strong></footer>
      </section>
    </main>
  );
}

function DentistryShowcase() {
  const [treatment, setTreatment] = useState("lentes");
  const [step, setStep] = useState(1);

  const treatments = {
    lentes: { name: "Lentes de Contato & Facetas", desc: "Correção de formato, cor e alinhamento com porcelana ultrarresistente." },
    clareamento: { name: "Clareamento a Laser", desc: "Dentes até 5 tons mais claros com tecnologia indolor e rápida." },
    implantes: { name: "Implantes & Reabilitação", desc: "Recuperação total da mastigação e estética com implantes guiados 3D." },
    invisalign: { name: "Alinhadores Invisíveis", desc: "Alinhamento ortodôntico estético sem braquetes metálicos." },
  };

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Fiz a avaliação no site da Nexo Odontologia para ${treatments[treatment as keyof typeof treatments].name} e quero agendar minha consulta de avaliação!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.dentistry}`}>
      <header className={styles.proHeader}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitle}>
            <span>NEXO</span><span style={{ color: "#0284c7" }}>ODONTOLOGIA</span>
          </div>
          <span className={styles.proBrandTag}>Estética Dental & Implantes</span>
        </div>
        <div className={styles.proHeaderReview}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRail}>
        <span>✓ CRO/SP CERTIFICADO</span>
        <span>★ 5.0 ESTRELAS NO GOOGLE</span>
        <span>⏱ AVALIAÇÃO DIGITAL 3D</span>
        <span>◇ SEDATIVO CONSCIENTE SEM DOR</span>
      </div>

      <section className={styles.proHero} style={{ background: "#0c1524" }}>
        <Image
          src="/concepts/nexo-dental.webp"
          alt="Atendimento odontológico acolhedor na Nexo Odontologia"
          fill
          sizes="100vw"
          quality={85}
          className={styles.proHeroImg}
          priority
        />
        <div className={styles.proHeroShadeDark} />

        <div className={styles.proHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>Seu Novo Sorriso Com Alta Tecnologia e Conforto</h1>

          <p>
            Tratamentos odontológicos modernos, sedação consciente sem dor e planejamento 100% digital construído no seu ritmo.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Escaneamento intraoral 3D em alta resolução</li>
            <li><GreenCheck /> Lentes de contato ultrafinas e naturais</li>
            <li><GreenCheck /> Protocolos rápidos e sem desconforto</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Fiz minhas facetas em porcelana na Nexo e o resultado ficou super natural! Toda a equipe foi extremamente cuidadosa e o procedimento foi 100% indolor. Recomendo de olhos fechados!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <Image
                  src="/concepts/avatars/dental-client.jpg"
                  alt="Beatriz Lima"
                  width={38}
                  height={38}
                  className={styles.proAvatarImg}
                />
                <div>
                  <div className={styles.proUserName}>Beatriz Lima</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Avaliação do Sorriso Online</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Resposta em menos de 1 minuto
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${step === 1 ? 50 : 100}%`, background: "#0284c7" }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>Qual o seu objetivo estético principal?</div>
              <div className={styles.proOptionsGrid}>
                {Object.entries(treatments).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.proOptionBtn} ${treatment === key ? styles.proOptionBtnActive : ""}`}
                    style={treatment === key ? { borderColor: "#0284c7", background: "rgba(2, 132, 199, 0.05)" } : {}}
                    onClick={() => {
                      setTreatment(key);
                      setStep(2);
                    }}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.proBtnPrimary}
                style={{ background: "#0284c7" }}
                onClick={() => setStep(2)}
              >
                AVANÇAR PARA PROPOSTA <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#0369a1", textTransform: "uppercase" }}>Tratamento Selecionado</span>
                <strong style={{ display: "block", fontSize: 18, color: "#0f172a", margin: "6px 0" }}>
                  {treatments[treatment as keyof typeof treatments].name}
                </strong>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0 }}>
                  {treatments[treatment as keyof typeof treatments].desc}
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proBtnWa}
              >
                <span>AGENDAR AVALIAÇÃO NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button
                type="button"
                style={{ background: "transparent", border: 0, color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center" }}
                onClick={() => setStep(1)}
              >
                ↻ Alterar tratamento
              </button>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

const lawAreas = {
  contratos: { label: "Contratos Empresariais", ref: "ML · 0247", risk: "Cláusula de reajuste ambígua", decision: "Revisar antes da assinatura", deliverable: "Parecer + minuta comentada", urgency: "48h", level: "Atenção alta", score: 76, exposure: "Margem e previsibilidade", status: "Revisão preventiva" },
  societario: { label: "Estrutura Societária", ref: "ML · 0312", risk: "Entrada de um novo sócio", decision: "Definir poderes, metas e saída", deliverable: "Acordo de sócios", urgency: "5 dias", level: "Estratégico", score: 64, exposure: "Governança e controle", status: "Estruturação" },
  trabalhista: { label: "Compliance Trabalhista", ref: "ML · 0189", risk: "Mudança de política interna", decision: "Validar impacto e comunicação", deliverable: "Plano de adequação", urgency: "72h", level: "Preventivo", score: 48, exposure: "Pessoas e operação", status: "Conformidade" },
  contencioso: { label: "Contencioso Estratégico", ref: "ML · 0401", risk: "Notificação recebida hoje", decision: "Preservar prazo e provas", deliverable: "Estratégia de resposta", urgency: "Hoje", level: "Prioridade crítica", score: 91, exposure: "Prazo processual", status: "Resposta imediata" },
} as const;

function LawShowcase() {
  const [area, setArea] = useState<keyof typeof lawAreas>("contratos");
  const [step, setStep] = useState(1);
  const active = lawAreas[area];

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Quero agendar uma consulta jurídica estratégica com o Dr. Augusto Moreira sobre ${active.label} para a minha empresa.`
  )}`;

  return (
    <main className={`${styles.site} ${styles.law}`}>
      <header className={styles.proHeaderDark}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitleDark}>
            <span>AUGUSTO</span> <span style={{ color: "#d97706" }}>MOREIRA</span>
          </div>
          <span className={styles.proBrandTagDark}>Advocacia Empresarial & Contratos</span>
        </div>
        <div className={styles.proHeaderReviewDark}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRailDark}>
        <span>✓ OAB/BA 48.271</span>
        <span>★ 5.0 NO GOOGLE</span>
        <span>⏱ RETORNO EM ATÉ 24H</span>
        <span>◇ CONTRATOS & SOCIETÁRIO</span>
      </div>

      <section className={styles.proHero} style={{ background: "#111215" }}>
        <Image
          src="/concepts/moreira-law-v2.webp"
          alt="Reunião estratégica da Moreira Advocacia Empresarial"
          fill
          sizes="100vw"
          quality={88}
          className={styles.proHeroImg}
          priority
        />
        <div className={styles.proHeroShadeGold} />

        <div className={styles.proHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>Segurança Jurídica Para Proteger e Escalar Sua Empresa</h1>

          <p>
            Transformamos contratos, conflitos e movimentos societários em decisões executáveis que protegem o patrimônio e aceleram o crescimento.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Diagnóstico e parecer preliminar em até 48h</li>
            <li><GreenCheck /> Contratos blindados e acordos de sócios precisos</li>
            <li><GreenCheck /> Atendimento consultivo direto com os sócios</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Contratamos a revisão dos nossos contratos de fornecimento e o acordo de sócios com o Dr. Augusto Moreira. A clareza e segurança jurídica que ele trouxe foram decisivas para nossa rodada de captação. Excelente!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <Image
                  src="/concepts/avatars/law-client.jpg"
                  alt="Rodrigo Mendonça"
                  width={38}
                  height={38}
                  className={styles.proAvatarImg}
                />
                <div>
                  <div className={styles.proUserName}>Rodrigo Mendonça</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐ (CEO & Founder)</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Diagnóstico Jurídico Rápido</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Análise preliminar confidencial
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${step === 1 ? 50 : 100}%`, background: "#d97706" }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>Qual a prioridade da sua empresa agora?</div>
              <div className={styles.proOptionsGrid}>
                {(Object.keys(lawAreas) as Array<keyof typeof lawAreas>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.proOptionBtn} ${area === key ? styles.proOptionBtnActive : ""}`}
                    style={area === key ? { borderColor: "#d97706", background: "rgba(217, 119, 6, 0.06)" } : {}}
                    onClick={() => {
                      setArea(key);
                      setStep(2);
                    }}
                  >
                    <span>{lawAreas[key].label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.proBtnPrimary}
                style={{ background: "#d97706" }}
                onClick={() => setStep(2)}
              >
                AVANÇAR PARA DIAGNÓSTICO <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#92400e", textTransform: "uppercase" }}>Frente Selecionada</span>
                <strong style={{ display: "block", fontSize: 17, color: "#78350f", margin: "6px 0" }}>
                  {active.label}
                </strong>
                <p style={{ fontSize: 12.5, color: "#92400e", margin: 0 }}>
                  Direção sugerida: <b>{active.decision}</b> ({active.urgency})
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proBtnWa}
              >
                <span>AGENDAR CONSULTA NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button
                type="button"
                style={{ background: "transparent", border: 0, color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center" }}
                onClick={() => setStep(1)}
              >
                ↻ Alterar área jurídica
              </button>
            </div>
          ) : null}
        </aside>
      </section>

      <section className={styles.lawPulse} aria-label="Pulso jurídico empresarial"><div><small>LEGAL INTELLIGENCE</small><strong>O que exige decisão nesta semana.</strong></div><span><b>01</b>Reajustes contratuais<i>4 movimentos</i></span><span><b>02</b>Governança societária<i>2 deliberações</i></span><span><b>03</b>Prazos e respostas<i>1 prioridade</i></span><em>ATUALIZADO · 08:42</em></section>
      <section className={styles.lawDecisionRoom}>
        <header><div><small>MESA DE DECISÃO · SIMULAÇÃO</small><h3>Um caso. Quatro leituras.<br /><i>Uma direção objetiva.</i></h3></div><p>Selecione a frente jurídica e veja como a informação deixa de ser um parecer solto para virar um mapa executivo.</p></header>
        <div className={styles.lawCommand}>
          <div className={styles.lawAreaTabs} role="tablist" aria-label="Áreas jurídicas">
            {(Object.keys(lawAreas) as Array<keyof typeof lawAreas>).map((key, index) => (
              <button key={key} type="button" role="tab" aria-selected={area === key} className={area === key ? styles.lawAreaActive : ""} onClick={() => setArea(key)}><small>0{index + 1}</small><span>{lawAreas[key].label}</span><i>↗</i></button>
            ))}
          </div>
          <article className={styles.lawDossier} aria-live="polite" key={area}>
            <div className={styles.lawDossierTop}><span>{active.ref} · CONFIDENCIAL</span><b>{active.status}</b></div>
            <div className={styles.lawDossierLead}>
              <div><small>QUESTÃO NA MESA</small><h4>{active.risk}</h4><p>O objetivo não é eliminar toda incerteza. É saber qual risco existe, o que ele afeta e qual decisão preserva mais valor.</p></div>
              <div className={styles.lawRiskDial} style={{ "--law-risk": `${active.score}%` } as CSSProperties}><strong>{active.score}</strong><span>ÍNDICE DE<br />EXPOSIÇÃO</span></div>
            </div>
            <div className={styles.lawStageRail}><span className={styles.lawStageDone}><b>01</b>Contexto</span><i /><span className={styles.lawStageDone}><b>02</b>Exposição</span><i /><span><b>03</b>Escolha</span><i /><span><b>04</b>Documento</span></div>
            <dl className={styles.lawCase}><div><dt>Nível</dt><dd>{active.level}</dd></div><div><dt>Impacto</dt><dd>{active.exposure}</dd></div><div><dt>Direção sugerida</dt><dd>{active.decision}</dd></div><div><dt>Entrega</dt><dd>{active.deliverable}</dd></div><div><dt>Primeiro retorno</dt><dd>{active.urgency}</dd></div></dl>
            <div className={styles.lawDecisionMatrix}>
              <header><small>CENÁRIOS DE DELIBERAÇÃO</small><span>IMPACTO × REVERSIBILIDADE</span></header>
              <div>
                <article><b>A</b><span>Prosseguir</span><small>Risco absorvido e documentado</small></article>
                <article className={styles.lawDecisionPreferred}><b>B</b><span>Ajustar antes</span><small>Preserva valor e poder de escolha</small><i>RECOMENDADO</i></article>
                <article><b>C</b><span>Pausar</span><small>Nova informação antes da decisão</small></article>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.lawMethod}>
        <div className={styles.lawMethodIntro}><small>CONSELHO, NÃO VOLUME</small><h3>O jurídico entra antes<br />do custo aparecer.</h3></div>
        <div className={styles.lawMethodRail}><article><span>01</span><strong>Antecipar</strong><p>Identificar a exposição enquanto ainda existe escolha.</p></article><article><span>02</span><strong>Decidir</strong><p>Comparar consequências em linguagem de negócio.</p></article><article><span>03</span><strong>Formalizar</strong><p>Converter a direção escolhida em proteção executável.</p></article><aside><small>SÍNTESE</small><b>Menos ruído.<br />Mais governo.</b></aside></div>
      </section>
      <section className={styles.lawPortfolio}>
        <header><small>O ADVOGADO À FRENTE DA ESTRATÉGIA</small><h3>Dr. Augusto Moreira</h3><p>Advocacia empresarial para decisões em que contrato, patrimônio e continuidade precisam conversar.</p></header>
        <div className={styles.lawPortfolioKpis} aria-label="Indicadores conceituais do portfólio"><small>CENÁRIO CONCEITUAL</small><span><b>+12 anos</b> de atuação empresarial</span><span><b>R$ 18 mi</b> em contratos analisados</span><span><b>86%</b> dos casos resolvidos preventivamente</span><span><b>48h</b> para o primeiro diagnóstico</span></div>
        <div className={styles.lawProfileGrid}>
          <figure><span>AM</span><figcaption><b>OAB/BA 48.271</b><small>SÓCIO FUNDADOR · PERFIL CONCEITUAL</small></figcaption></figure>
          <article><small>TRAJETÓRIA</small><h4>Direito explicado com clareza de negócio.</h4><p>Atuação consultiva em contratos, reorganizações societárias e prevenção de conflitos. Cada trabalho começa pela decisão que o cliente precisa tomar, não pelo volume de documentos.</p><dl><div><dt>Formação</dt><dd>Direito Empresarial e Governança</dd></div><div><dt>Atuação</dt><dd>Consultivo e contencioso estratégico</dd></div><div><dt>Atendimento</dt><dd>Empresas, sócios e conselhos</dd></div></dl></article>
          <aside><small>ÁREAS SELECIONADAS</small><span><b>01</b>Contratos empresariais</span><span><b>02</b>Estrutura societária</span><span><b>03</b>Gestão de conflitos</span><span><b>04</b>Planejamento preventivo</span></aside>
        </div>
        <div className={styles.lawSelectedWork}><article><small>CASO 01 · CONTRATOS</small><strong>Revisão de operação recorrente</strong><p>Risco financeiro traduzido em cláusulas, cenários e plano de negociação.</p><em>12 cláusulas críticas reorganizadas</em></article><article><small>CASO 02 · SOCIETÁRIO</small><strong>Entrada de novo sócio</strong><p>Papéis, poderes e saída definidos antes da assinatura.</p><em>4 cenários comparados antes da decisão</em></article><article><small>CASO 03 · GOVERNANÇA</small><strong>Decisão documentada</strong><p>Memória executiva para conselho, diretoria e próximas deliberações.</p><em>Conselho alinhado em uma única reunião</em></article></div>
      </section>
    </main>
  );
}

const salonServices = {
  corte: { label: "Corte & Visagismo", code: "RITUAL 01", time: "75–90 min", price: "a partir de R$ 160", description: "Uma leitura de proporção, textura e rotina para o corte funcionar também fora do salão.", fit: "Mudança com segurança", finish: "Forma + movimento", care: "Guia de finalização", availability: ["09:30", "13:00", "16:40"], steps: ["Escuta e referências", "Arquitetura do corte", "Finalização ensinada"] },
  cor: { label: "Cor Autoral & Mechas", code: "RITUAL 02", time: "3–5 h", price: "sob avaliação", description: "Cor desenhada para pele, estilo e manutenção possível — com teste e plano antes da transformação.", fit: "Transformação planejada", finish: "Cor multidimensional", care: "Cronograma pós-cor", availability: ["08:00", "12:30", "14:00"], steps: ["Diagnóstico do fio", "Mapa de cor exclusivo", "Plano de manutenção"] },
  tratamento: { label: "Spa & Terapia Capilar", code: "RITUAL 03", time: "60–90 min", price: "a partir de R$ 220", description: "Nutrição e reconstrução intensiva de alta performance com produtos importados.", fit: "Saúde e brilho profundo", finish: "Fios revitalizados", care: "Cronograma home care", availability: ["10:00", "14:30", "17:00"], steps: ["Tricoscopia digital", "Aplicação de ativos", "Selamento térmico"] },
  noiva: { label: "Experiência Noiva & Produção", code: "RITUAL 04", time: "agenda exclusiva", price: "proposta personalizada", description: "Direção de beleza, prova e cronograma para que o grande dia tenha presença, coerência e nenhuma improvisação.", fit: "Imagem para um marco", finish: "Beleza completa", care: "Agenda coordenada", availability: ["CONSULTAR", "PROVA", "RESERVAR"], steps: ["Direção estética", "Prova completa", "Ritual do grande dia"] },
} as const;

function SalonShowcase() {
  const [service, setService] = useState<keyof typeof salonServices>("corte");
  const [selectedSlot, setSelectedSlot] = useState<string>(salonServices.corte.availability[0]);
  const [step, setStep] = useState(1);
  const active = salonServices[service];

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Gostaria de reservar o ritual de ${active.label} no Auréa Atelier (${active.price}).`
  )}`;

  return (
    <main className={`${styles.site} ${styles.salon}`}>
      <header className={styles.proHeader}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitle}>
            <span>AURÉA</span> <span style={{ color: "#a86752" }}>ATELIER</span>
          </div>
          <span className={styles.proBrandTag}>Beleza, Visagismo & Rituais</span>
        </div>
        <div className={styles.proHeaderReview}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRail}>
        <span>✓ VISAGISMO AUTORAL</span>
        <span>★ 5.0 NO GOOGLE</span>
        <span>⏱ ATENDIMENTO EXCLUSIVO</span>
        <span>◇ PRODUTOS IMPORTADOS</span>
      </div>

      <section className={styles.proHero} style={{ background: "#201612" }}>
        <Image
          src="/concepts/aurea-salon-v3.webp"
          alt="Experiência de beleza no Auréa Atelier"
          fill
          sizes="100vw"
          quality={88}
          className={styles.proHeroImg}
          priority
        />
        <div className={styles.proHeroShadeWarm} />

        <div className={styles.proHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>Realce Sua Beleza Com Cuidado Autoral e Exclusivo</h1>

          <p>
            Cortes visagistas, mechas sob medida e rituais capilares de alta performance em um ambiente intimista com atendimento 100% individualizado.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Diagnóstico capilar e visagismo personalizado</li>
            <li><GreenCheck /> Produtos de padrão internacional (Kérastase, Wella)</li>
            <li><GreenCheck /> Espaço VIP e pontualidade rigorosa</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;O Auréa Atelier superou todas as minhas expectativas! O corte visagista e a iluminação me deram uma segurança enorme. Atendimento acolhedor e equipe impecável!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <Image
                  src="/concepts/avatars/salon-client.jpg"
                  alt="Mariana Vasconcelos"
                  width={38}
                  height={38}
                  className={styles.proAvatarImg}
                />
                <div>
                  <div className={styles.proUserName}>Mariana Vasconcelos</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Descubra Seu Ritual Ideal</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Leva menos de 30 segundos
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${step === 1 ? 50 : 100}%`, background: "#a86752" }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>Qual ritual você deseja viver?</div>
              <div className={styles.proOptionsGrid}>
                {(Object.keys(salonServices) as Array<keyof typeof salonServices>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.proOptionBtn} ${service === key ? styles.proOptionBtnActive : ""}`}
                    style={service === key ? { borderColor: "#a86752", background: "rgba(168, 103, 82, 0.06)" } : {}}
                    onClick={() => {
                      setService(key);
                      setStep(2);
                    }}
                  >
                    <span>{salonServices[key].label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.proBtnPrimary}
                style={{ background: "#a86752" }}
                onClick={() => setStep(2)}
              >
                CONTINUAR <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#fdf8f6", border: "1px solid #f5ded7", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#a86752", textTransform: "uppercase" }}>{active.code}</span>
                <strong style={{ display: "block", fontSize: 18, color: "#30221d", margin: "6px 0" }}>
                  {active.label}
                </strong>
                <p style={{ fontSize: 12.5, color: "#6a5750", margin: "0 0 8px" }}>
                  {active.description}
                </p>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#a86752" }}>
                  {active.price} · {active.time}
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proBtnWa}
              >
                <span>RESERVAR HORÁRIO NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button
                type="button"
                style={{ background: "transparent", border: 0, color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center" }}
                onClick={() => setStep(1)}
              >
                ↻ Alterar ritual
              </button>
            </div>
          ) : null}
        </aside>
      </section>

      <section className={styles.salonLookbook}><header><small>ATELIER NOTES · 2026</small><strong>Três intenções.<br /><i>Nenhuma fórmula.</i></strong></header><div><article><span>01</span><b>Movimento natural</b><small>CORTE · TEXTURA</small></article><article><span>02</span><b>Luz sob medida</b><small>COR · DIMENSÃO</small></article><article><span>03</span><b>Presença memorável</b><small>NOIVA · DIREÇÃO</small></article></div></section>
      <section className={styles.salonPulse} aria-label="Indicadores conceituais do atelier"><div><small>AGENDA DO ATELIER · CENÁRIO CONCEITUAL</small><strong>Uma agenda que vende experiência, não apenas horário.</strong></div><span><b>84%</b><small>clientes que retornam</small></span><span><b>4,9</b><small>experiência percebida</small></span><span><b>3 semanas</b><small>de agenda organizada</small></span><em>12 horários disponíveis nesta quinzena</em></section>
      <section className={styles.salonConcierge}>
        <header><div><small>CONCIERGE AURÉA</small><h3>Escolha a intenção.<br /><i>Nós desenhamos o ritual.</i></h3></div><p>Explore as experiências e veja duração, investimento e cuidado antes de reservar.</p></header>
        <div className={styles.salonConciergeGrid}>
          <div className={styles.salonTabs} role="tablist" aria-label="Serviços do salão">
            {(Object.keys(salonServices) as Array<keyof typeof salonServices>).map((key, index) => <button type="button" role="tab" aria-selected={service === key} className={service === key ? styles.salonTabActive : ""} onClick={() => { setService(key); setSelectedSlot(salonServices[key].availability[0]); }} key={key}><small>0{index + 1}</small><span>{salonServices[key].label}</span><i>→</i></button>)}
          </div>
          <article className={styles.salonService} aria-live="polite" key={service}>
            <div className={styles.salonServiceTop}><span>{active.code}</span><small>SELEÇÃO ATUAL</small></div><h4>{active.label}</h4><p>{active.description}</p>
            <div className={styles.salonServiceSpecs}><span><small>PARA QUEM</small><b>{active.fit}</b></span><span><small>RESULTADO</small><b>{active.finish}</b></span><span><small>DEPOIS</small><b>{active.care}</b></span></div>
            <div className={styles.salonMirror}>
              <div><small>ESPELHO DE INTENÇÃO</small><strong>{active.finish}</strong><p>Uma prévia de atmosfera para alinhar desejo, manutenção e resultado antes da execução.</p></div>
              <figure aria-hidden="true"><span /><i>{active.code}</i></figure>
              <aside><small>PALETA</small><span /><span /><span /></aside>
            </div>
            <div className={styles.salonAvailability}><small>PRÓXIMAS JANELAS · QUINTA</small><div>{active.availability.map((slot) => <button type="button" aria-pressed={selectedSlot === slot} onClick={() => setSelectedSlot(slot)} key={slot}>{slot}</button>)}</div></div>
            <footer><span><small>DURAÇÃO</small><b>{active.time}</b></span><span><small>INVESTIMENTO</small><b>{active.price}</b></span><button type="button">PRÉ-ORGANIZAR VISITA <i>→</i></button></footer>
          </article>
        </div>
      </section>
      <section className={styles.salonJourney} key={`journey-${service}`}>
        <header><small>O RITUAL SELECIONADO</small><h3>Do primeiro olhar<br />ao espelho final.</h3><p>Cada etapa reduz incerteza e deixa a experiência mais leve, previsível e sua.</p></header>
        <div>{active.steps.map((step, index) => <article key={step}><span>0{index + 1}</span><small>{index === 0 ? "ANTES" : index === 1 ? "DURANTE" : "DEPOIS"}</small><strong>{step}</strong><p>{index === 0 ? "Referências, rotina e intenção entram na mesma conversa." : index === 1 ? "Técnica e direção evoluem com você acompanhando cada escolha." : "O resultado continua bonito porque o cuidado também foi planejado."}</p></article>)}</div>
      </section>
      <section className={styles.salonEditorial}>
        <figure><Image src="/concepts/aurea-salon-v3.webp" alt="Editorial do Auréa Atelier" fill sizes="50vw" quality={88} /><figcaption><small>AURÉA JOURNAL · Nº 04</small><strong>Beleza que continua fazendo sentido depois do salão.</strong></figcaption></figure>
        <div><small>CURADORIA EM VEZ DE CARDÁPIO</small><h3>Seu momento define<br /><i>a experiência.</i></h3><p>O atendimento começa entendendo rotina, referências e manutenção possível. Só então técnica, tempo e investimento entram na conversa.</p><div className={styles.salonEditorialSteps}><article><span>01</span><b>Leitura</b><small>Imagem, rotina e intenção</small></article><article><span>02</span><b>Direção</b><small>Escolhas explicadas antes</small></article><article><span>03</span><b>Continuidade</b><small>Cuidado que funciona em casa</small></article></div><footer><span>AGENDA CONCIERGE</span><b>{selectedSlot} · {active.label}</b></footer></div>
      </section>
    </main>
  );
}

function AestheticsShowcase() {
  const [protocol, setProtocol] = useState("facial");
  const [step, setStep] = useState(1);

  const protocols = {
    facial: { name: "Harmonização & Rejuvenescimento", desc: "Preenchimento estratégico e toxina botulínica para traços naturais e descansados." },
    colageno: { name: "Bioestimuladores de Colágeno", desc: "Estímulo profundo com Sculptra e Radiesse para firmeza e viço da pele." },
    corporal: { name: "Ultraformer & Alta Performance", desc: "Ultrassom micro e macrofocado para flacidez e contorno corporal." },
    laser: { name: "Laser & Renovação Celular", desc: "Tratamento de manchas, poros e textura para pele iluminada." },
  };

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Quero agendar uma avaliação estética na Lumina Clinic para o protocolo de ${protocols[protocol as keyof typeof protocols].name}.`
  )}`;

  return (
    <main className={`${styles.site} ${styles.aesthetics}`}>
      <header className={styles.proHeader}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitle}>
            <span>LUMINA</span> <span style={{ color: "#ec4899" }}>CLINIC</span>
          </div>
          <span className={styles.proBrandTag}>Estética Avançada & Dermatologia</span>
        </div>
        <div className={styles.proHeaderReview}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRail}>
        <span>✓ EQUIPE BIOMÉDICA & MÉDICA</span>
        <span>★ 5.0 ESTRELAS NO GOOGLE</span>
        <span>⏱ PROTOCOLOS PERSONALIZADOS</span>
        <span>◇ TECNOLOGIAS ANVISA</span>
      </div>

      <section className={styles.proHero} style={{ background: "#1c1017" }}>
        <Image
          src="/concepts/lumina-clinic.jpg"
          alt="Clínica de estética avançada Lumina"
          fill
          sizes="100vw"
          quality={82}
          className={styles.proHeroImg}
          priority
        />
        <div className={styles.proHeroShadeDark} />

        <div className={styles.proHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>Você Continua Sendo Você. Só Mais Confiante.</h1>

          <p>
            Protocolos personalizados, equipamentos padrão ouro e acompanhamento cuidadoso em cada fase para valorizar sua beleza natural.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Avaliação facial e corporal com tecnologia 3D</li>
            <li><GreenCheck /> Procedimentos minimamente invasivos</li>
            <li><GreenCheck /> Resultados elegantes sem exageros</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;A Lumina transformou minha autoestima! Os protocolos de bioestimulador e Ultraformer deixaram minha pele firme e iluminada com total naturalidade. Atendimento impecável!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ec4899", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>
                  CA
                </div>
                <div>
                  <div className={styles.proUserName}>Camila Albuquerque</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Avaliação Estética Personalizada</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Leva menos de 30 segundos
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${step === 1 ? 50 : 100}%`, background: "#ec4899" }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>Qual área você deseja cuidar hoje?</div>
              <div className={styles.proOptionsGrid}>
                {Object.entries(protocols).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.proOptionBtn} ${protocol === key ? styles.proOptionBtnActive : ""}`}
                    style={protocol === key ? { borderColor: "#ec4899", background: "rgba(236, 72, 153, 0.05)" } : {}}
                    onClick={() => {
                      setProtocol(key);
                      setStep(2);
                    }}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.proBtnPrimary}
                style={{ background: "#ec4899" }}
                onClick={() => setStep(2)}
              >
                AVANÇAR PARA PROTOCOLO <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#fdf2f8", border: "1px solid #fbcfe8", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#db2777", textTransform: "uppercase" }}>Protocolo Recomendado</span>
                <strong style={{ display: "block", fontSize: 18, color: "#831843", margin: "6px 0" }}>
                  {protocols[protocol as keyof typeof protocols].name}
                </strong>
                <p style={{ fontSize: 12.5, color: "#9d174d", margin: 0 }}>
                  {protocols[protocol as keyof typeof protocols].desc}
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proBtnWa}
              >
                <span>CONSULTAR NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button
                type="button"
                style={{ background: "transparent", border: 0, color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center" }}
                onClick={() => setStep(1)}
              >
                ↻ Alterar protocolo
              </button>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

function AutonomousShowcase() {
  const [goal, setGoal] = useState("emagrecimento");
  const [step, setStep] = useState(1);

  const goals = {
    emagrecimento: { name: "Emagrecimento & Definição", desc: "Treinos metabólicos e queima calórica eficiente adaptada ao seu dia a dia." },
    hipertrofia: { name: "Ganho de Massa Muscular", desc: "Periodização de força e hipertrofia com progressão de carga estruturada." },
    saude: { name: "Condicionamento & Longevidade", desc: "Melhora de postura, mobilidade articular e disposição para o dia todo." },
    online: { name: "Consultoria 100% Online", desc: "Treinos no app próprio com vídeos explicativos e suporte semanal direto." },
  };

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá Caio! Fiz a simulação no seu site para ${goals[goal as keyof typeof goals].name} e quero começar meus treinos!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.autonomous}`}>
      <header className={styles.proHeaderDark}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitleDark}>
            <span>CAIO</span> <span style={{ color: "#10b981" }}>MOVE</span>
          </div>
          <span className={styles.proBrandTagDark}>Consultoria Esportiva & Personal Trainer</span>
        </div>
        <div className={styles.proHeaderReviewDark}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      <div className={styles.proTrustRailDark}>
        <span>✓ CREF ATIVO</span>
        <span>★ 5.0 NO GOOGLE (+840 ALUNOS)</span>
        <span>⏱ PLANO EM 24H</span>
        <span>◇ APP EXCLUSIVO DE TREINO</span>
      </div>

      <section className={styles.proHero} style={{ background: "#0b1215" }}>
        <Image
          src="/concepts/caio-move.webp"
          alt="Profissional autônomo de atividade física Caio Move"
          fill
          sizes="100vw"
          quality={82}
          className={styles.proHeroImg}
          priority
        />
        <div className={styles.proHeroShadeDark} />

        <div className={styles.proHeroCopy}>
          <div className={styles.proBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span style={{ color: "#f59e0b" }}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>Treino Inteligente e Evolução Real Para a Sua Rotina</h1>

          <p>
            Seu corpo não precisa de promessas milagrosas. Precisa de um método estruturado que cabe na sua rotina e gera resultados consistentes.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Treinos personalizados para academia ou em casa</li>
            <li><GreenCheck /> Acompanhamento postural e correção por vídeo</li>
            <li><GreenCheck /> Mais de 840 alunos transformados</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Treino com o Caio há 1 ano. Perdi 12kg e nunca mais tive dores nas costas. O método é prático e fácil de seguir mesmo na minha rotina corrida.&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#10b981", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>
                  LB
                </div>
                <div>
                  <div className={styles.proUserName}>Lucas Barreto</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐ (Aluno há 1 ano)</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Simulador de Treino & Meta</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Resposta imediata
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${step === 1 ? 50 : 100}%`, background: "#10b981" }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>Qual é o seu objetivo principal?</div>
              <div className={styles.proOptionsGrid}>
                {Object.entries(goals).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.proOptionBtn} ${goal === key ? styles.proOptionBtnActive : ""}`}
                    style={goal === key ? { borderColor: "#10b981", background: "rgba(16, 185, 129, 0.06)" } : {}}
                    onClick={() => {
                      setGoal(key);
                      setStep(2);
                    }}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.proBtnPrimary}
                style={{ background: "#10b981" }}
                onClick={() => setStep(2)}
              >
                AVANÇAR PARA O PLANO <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#065f46", textTransform: "uppercase" }}>Foco Selecionado</span>
                <strong style={{ display: "block", fontSize: 18, color: "#047857", margin: "6px 0" }}>
                  {goals[goal as keyof typeof goals].name}
                </strong>
                <p style={{ fontSize: 12.5, color: "#065f46", margin: 0 }}>
                  {goals[goal as keyof typeof goals].desc}
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proBtnWa}
              >
                <span>COMEÇAR NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button
                type="button"
                style={{ background: "transparent", border: 0, color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center" }}
                onClick={() => setStep(1)}
              >
                ↻ Alterar objetivo
              </button>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

const SOLAR_BRAND = "SOLARIS";

function SolarShowcase() {
  const [installation, setInstallation] = useState<"residencial" | "empresa">("residencial");
  const [bill, setBill] = useState(650);
  const [step, setStep] = useState(1);

  const simulation = useMemo(() => {
    const monthlySaving = Math.round(bill * 0.9);
    const systemCost = Math.round((bill * (installation === "residencial" ? 25 : 29)) / 100) * 100;
    return {
      monthlySaving,
      annualSaving: monthlySaving * 12,
      twentyYears: monthlySaving * 12 * 20,
      systemCost,
      panels: Math.max(4, Math.round(bill / 115)),
    };
  }, [bill, installation]);

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Fiz a simulação no site da ${SOLAR_BRAND} para ${
      installation === "residencial" ? "minha Casa" : "minha Empresa/Condomínio"
    } com conta de R$ ${bill}/mês (economia estimada de R$ ${simulation.monthlySaving}/mês) e quero receber minha proposta gratuita!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.solar}`}>
      {/* 1. Header estilo SunCoast */}
      <header className={styles.solarHeader}>
        <div className={styles.solarBrandWrap}>
          <div className={styles.solarBrandLogo}>
            <SolarSunLogo />
            <span>{SOLAR_BRAND}</span>
          </div>
          <span className={styles.solarBrandTag}>Instaladores de energia solar</span>
        </div>
        <div className={styles.solarHeaderReview}>
          <b>5.0</b>
          <span className={styles.solarHeaderStars}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      {/* 2. Top Trust Rail Bar */}
      <div className={styles.solarTrustRail}>
        <span>✓ 100% CERTIFICADOS</span>
        <span>★ 5.0 ESTRELAS NO GOOGLE</span>
        <span>◷ ORÇAMENTOS NO MESMO DIA</span>
        <span>◇ 25 ANOS DE GARANTIA</span>
      </div>

      {/* 3. Hero Section com Imagem de Fundo & Copy Idêntico */}
      <section className={styles.solarHero}>
        <Image
          src="/concepts/solaris/hero.jpg"
          alt="Instalação de painéis solares Solaris"
          fill
          sizes="100vw"
          quality={90}
          className={styles.solarHeroImg}
          priority
        />
        <div className={styles.solarHeroShade} />

        {/* Coluna Esquerda: Badge, Headline, Checklist & Depoimento Glassmorphism */}
        <div className={styles.solarHeroCopy}>
          <div className={styles.solarBadgePill}>
            <span>EXCELENTE 5.0</span>
            <span className={styles.solarBadgeStars}>★★★★★</span>
            <GoogleWordmark />
          </div>

          <h1>
            Economize Até 95%<br />
            Na Sua Conta De Luz
          </h1>

          <p>
            Com <strong>mais de 1.000 instalações realizadas</strong>, garantimos máxima eficiência energética em{" "}
            <strong>menos de 30 dias</strong>, sem que você precise levantar um dedo.
          </p>

          <ul className={styles.solarChecklist}>
            <li>
              <GreenCheck /> 100% Certificados
            </li>
            <li>
              <GreenCheck /> 25 anos de garantia
            </li>
            <li>
              <GreenCheck /> Instalação em 1 dia
            </li>
          </ul>

          {/* Card Flutuante de Depoimento Glassmorphic */}
          <div className={styles.solarTestimonialCard}>
            <p className={styles.solarTestimonialQuote}>
              &ldquo;Fiz minha instalação com eles. Tudo certinho, dentro do prazo, zero dor de cabeça! Atendimento do Alexandre excelente, responde mensagens muito rápido, sempre solícito. Recomendo!&rdquo;
            </p>
            <div className={styles.solarTestimonialFooter}>
              <div className={styles.solarTestimonialUser}>
                <Image
                  src="/concepts/solaris/fernanda.jpg"
                  alt="Fernanda Kame"
                  width={38}
                  height={38}
                  className={styles.solarAvatarImg}
                />
                <div>
                  <div className={styles.solarUserName}>Fernanda Kame</div>
                  <div className={styles.solarUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <div className={styles.solarGoogleMark}>
                <GoogleWordmark />
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Card Branco do Orçamento / Quiz */}
        <aside className={styles.solarQuote} aria-live="polite">
          <div className={styles.solarQuoteHeader}>
            <h3 className={styles.solarQuoteTitle}>Receba Seu Orçamento Gratuito!</h3>
            <span className={styles.solarQuoteSubtitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block" }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Leva menos de 30 segundos
            </span>
          </div>

          <div className={styles.solarQuoteProgressBar}>
            <div
              className={styles.solarQuoteProgressFill}
              style={{ width: `${step === 1 ? 33.3 : step === 2 ? 66.6 : 100}%` }}
            />
          </div>

          {step === 1 ? (
            <div className={styles.solarQuoteStep}>
              <div className={styles.solarStepTitle}>Onde será a instalação?</div>
              <div className={styles.solarPlaceGrid}>
                <button
                  type="button"
                  className={`${styles.solarPlaceBtn} ${installation === "residencial" ? styles.solarPlaceBtnActive : ""}`}
                  onClick={() => {
                    setInstallation("residencial");
                    setStep(2);
                  }}
                >
                  <HouseIllustration />
                  <span className={styles.solarPlaceLabel}>Minha Casa</span>
                </button>
                <button
                  type="button"
                  className={`${styles.solarPlaceBtn} ${installation === "empresa" ? styles.solarPlaceBtnActive : ""}`}
                  onClick={() => {
                    setInstallation("empresa");
                    setStep(2);
                  }}
                >
                  <BuildingIllustration />
                  <span className={styles.solarPlaceLabel}>Minha Empresa / Condomínio</span>
                </button>
              </div>
              <button type="button" className={styles.solarBtnPrimary} onClick={() => setStep(2)}>
                CONTINUAR <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className={styles.solarQuoteStep}>
              <div className={styles.solarStepTitle}>Quanto você paga de conta de luz?</div>
              <div className={styles.solarSliderOutput}>
                <span className={styles.solarSliderAmount}>{formatBRL(bill)}</span>
                <span className={styles.solarSliderUnit}>/mês</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                aria-label="Valor mensal da conta de energia"
                style={{ width: "100%", accentColor: "#10b981" }}
              />
              <div className={styles.solarRangeLabels}>
                <span>R$ 200</span>
                <span>R$ 5.000+</span>
              </div>
              <div className={styles.solarPresets}>
                {[350, 650, 1200, 2500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`${styles.solarPresetBtn} ${bill === preset ? styles.solarPresetBtnActive : ""}`}
                    onClick={() => setBill(preset)}
                  >
                    R$ {preset}
                  </button>
                ))}
              </div>
              <button type="button" className={styles.solarBtnPrimary} onClick={() => setStep(3)}>
                CALCULAR ECONOMIA <ArrowVector />
              </button>
            </div>
          ) : null}

          {step === 3 ? (
            <div className={styles.solarQuoteStep}>
              <div className={styles.solarResultBanner}>
                <span className={styles.solarResultBadge}>Economia Estimada</span>
                <div className={styles.solarResultValue}>
                  {formatBRL(simulation.monthlySaving)}
                  <small style={{ fontSize: "14px", fontWeight: 600, color: "#065f46", marginLeft: 4 }}>/mês</small>
                </div>
                <div style={{ fontSize: "12px", color: "#047857", fontWeight: 700 }}>
                  Economia de até {formatBRL(simulation.annualSaving)} por ano
                </div>
              </div>

              <div className={styles.solarResultGrid}>
                <div className={styles.solarResultTile}>
                  <b>~{simulation.panels} módulos</b>
                  <span>sistema estimado</span>
                </div>
                <div className={styles.solarResultTile}>
                  <b>{formatBRL(simulation.twentyYears)}</b>
                  <span>em 20 anos</span>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.solarBtnWa}
              >
                SOLICITAR ORÇAMENTO NO WHATSAPP →
              </a>

              <button type="button" className={styles.solarBtnReset} onClick={() => setStep(1)}>
                ↻ REINICIAR SIMULAÇÃO
              </button>
            </div>
          ) : null}
        </aside>
      </section>

      {/* 4. Faixa de Certificações Estilo SunCoast */}
      <section className={styles.solarCerts}>
        <div className={styles.solarCertsTitle}>100% Certificados:</div>
        <div className={styles.solarCertsList}>
          <span className={styles.solarCertItem}>⚡ ANEEL</span>
          <span className={styles.solarCertItem}>🛡 INMETRO</span>
          <span className={styles.solarCertItem}>🏛 CREA-SP</span>
          <span className={styles.solarCertItem}>⚙ ABNT</span>
          <span className={styles.solarCertItem}>🔌 DISTRIBUIDORAS</span>
        </div>
      </section>

      {/* 5. Seção O que Nossos Clientes Dizem */}
      <section className={styles.solarTestimonials}>
        <div className={styles.solarTestimonialsHeader}>
          <h3 className={styles.solarTestimonialsTitle}>
            O que <span>nossos clientes</span> dizem
          </h3>
          <div className={styles.solarHeaderReview} style={{ background: "#fff", padding: "10px 18px", borderRadius: "999px", border: "1px solid #e2e8f0" }}>
            <b>5.0</b>
            <span className={styles.solarHeaderStars}>★★★★★</span>
            <GoogleWordmark />
          </div>
        </div>
        <div className={styles.solarReviewsGrid}>
          <article className={styles.solarReviewCard}>
            <p className={styles.solarTestimonialQuote} style={{ color: "#334155", fontStyle: "normal", fontSize: "14px" }}>
              &ldquo;Fiz minha instalação com eles. Tudo certinho, dentro do prazo, zero dor de cabeça! Atendimento do Alexandre excelente, responde mensagens muito rápido, sempre solícito. Recomendo!&rdquo;
            </p>
            <div className={styles.solarTestimonialFooter} style={{ borderTopColor: "#f1f5f9" }}>
              <div className={styles.solarTestimonialUser}>
                <Image
                  src="/concepts/solaris/fernanda.jpg"
                  alt="Fernanda Kame"
                  width={42}
                  height={42}
                  className={styles.solarAvatarImg}
                  style={{ border: "2px solid #087ec3" }}
                />
                <div>
                  <div className={styles.solarUserName} style={{ color: "#0f172a" }}>Fernanda Kame</div>
                  <div className={styles.solarUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <div className={styles.solarGoogleMark}>
                <GoogleWordmark />
              </div>
            </div>
          </article>

          <article className={styles.solarReviewCard}>
            <p className={styles.solarTestimonialQuote} style={{ color: "#334155", fontStyle: "normal", fontSize: "14px" }}>
              &ldquo;Excelente qualidade de atendimento, o projeto entre fechar o negócio e instalação foi muito rápido, primeiro mês já estou obtendo o retorno, conta da Enel R$ 28,00. Antes era na faixa de R$ 400,00.&rdquo;
            </p>
            <div className={styles.solarTestimonialFooter} style={{ borderTopColor: "#f1f5f9" }}>
              <div className={styles.solarTestimonialUser}>
                <Image
                  src="/concepts/solaris/roberto.jpg"
                  alt="José Roberto Lobo"
                  width={42}
                  height={42}
                  className={styles.solarAvatarImg}
                  style={{ border: "2px solid #087ec3" }}
                />
                <div>
                  <div className={styles.solarUserName} style={{ color: "#0f172a" }}>José Roberto Lobo</div>
                  <div className={styles.solarUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <div className={styles.solarGoogleMark}>
                <GoogleWordmark />
              </div>
            </div>
          </article>

          <article className={styles.solarReviewCard}>
            <p className={styles.solarTestimonialQuote} style={{ color: "#334155", fontStyle: "normal", fontSize: "14px" }}>
              &ldquo;Equipe técnica impecável. Homologaram tudo junto à distribuidora sem burocracia. O app de monitoramento de geração diária é fantástico!&rdquo;
            </p>
            <div className={styles.solarTestimonialFooter} style={{ borderTopColor: "#f1f5f9" }}>
              <div className={styles.solarTestimonialUser}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#087ec3", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 16 }}>
                  CS
                </div>
                <div>
                  <div className={styles.solarUserName} style={{ color: "#0f172a" }}>Carlos Silva</div>
                  <div className={styles.solarUserRating}>5.0 ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <div className={styles.solarGoogleMark}>
                <GoogleWordmark />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.solarSavings}>
        <header><small>ECONOMIA REAL</small><h3>A energia aumenta.<br /><i>Sua conta não precisa acompanhar.</i></h3><p>Veja uma projeção clara antes de tomar qualquer decisão.</p></header>
        <div className={styles.solarSavingsGrid}>
          <article><small>CONTA ATUAL</small><strong>{formatBRL(bill)}<i>/mês</i></strong><span>tarifa sujeita a reajustes</span></article>
          <article className={styles.solarSavingsMain}><small>ECONOMIA EM 20 ANOS</small><strong>{formatBRL(simulation.twentyYears)}</strong><span>estimativa com as premissas selecionadas</span></article>
          <article><small>SISTEMA ESTIMADO</small><strong>{formatBRL(simulation.systemCost)}</strong><span>projeto sob medida após análise técnica</span></article>
        </div>
      </section>

      {/* 6. Seção de Financiamento em até 96x com Grid dos 8 Bancos */}
      <section className={styles.solarFinance}>
        <div className={styles.solarFinanceBadge}>
          <span className={styles.solarFinanceBadgeDot} />
          FINANCIAMENTO
        </div>

        <h2 className={styles.solarFinanceTitle}>
          Economize hoje, <b>pague em até 96x</b>
        </h2>

        <div className={styles.solarFinanceBox}>
          Em muitos casos, as parcelas são menores que a sua conta de luz, garantindo economia desde o primeiro mês.
        </div>

        <div className={styles.solarBankGrid}>
          <div className={`${styles.solarBankCard} ${styles.bankBV}`}>
            <span style={{ fontSize: "20px", lineHeight: 1 }}>BV</span>
            <small style={{ fontSize: "9px", opacity: 0.85, marginTop: 2 }}>banco</small>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankSolfacil}`}>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontWeight: 900, fontSize: "14px", color: "#0f172a" }}>
              <span style={{ color: "#10b981" }}>●</span> solfácil
            </span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankBB}`}>
            <div style={{ width: 18, height: 18, border: "2.5px solid #003399", transform: "rotate(45deg)", marginBottom: 3 }} />
            <span style={{ fontSize: "7px", letterSpacing: 0.5, fontWeight: 900 }}>BANCO DO BRASIL</span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankSicoob}`}>
            <span style={{ color: "#00ae9d", fontSize: "12px", marginBottom: 2 }}>▲</span>
            <span style={{ fontSize: "12px", letterSpacing: 0.8 }}>SICOOB</span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankItau}`}>
            <span style={{ background: "#003399", color: "#fcee21", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 900 }}>
              Itaú
            </span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankSantander}`}>
            <span style={{ fontSize: "14px", marginBottom: 2 }}>♨</span>
            <span style={{ fontSize: "10px", letterSpacing: 0.5 }}>Santander</span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankCaixa}`}>
            <span style={{ fontSize: "13px", letterSpacing: 1, fontWeight: 900 }}>
              CAI<span style={{ color: "#f59e0b" }}>X</span>A
            </span>
          </div>

          <div className={`${styles.solarBankCard} ${styles.bankSicredi}`}>
            <span style={{ color: "#007a33", fontSize: "14px", marginBottom: 1 }}>✿</span>
            <span style={{ fontSize: "11px", color: "#007a33", fontWeight: 900 }}>Sicredi</span>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.solarFinanceCta}
        >
          <span>RECEBER MEU ORÇAMENTO GRATUITO</span>
          <ArrowVector />
        </a>
      </section>

      <section className={styles.solarProcess}>
        <header><small>PROCESSO</small><h3>Rápido, acompanhado<br />e sem burocracia.</h3></header>
        <div><article><span>01</span><b>Diagnóstico</b><p>Analisamos consumo, telhado e incidência solar.</p></article><article><span>02</span><b>Projeto</b><p>Dimensionamos geração, equipamentos e retorno.</p></article><article><span>03</span><b>Instalação</b><p>Equipe certificada executa e homologa o sistema.</p></article><article><span>04</span><b>Economia</b><p>Você acompanha a geração desde o primeiro mês.</p></article></div>
      </section>

      <section className={styles.solarProjects}>
        <header><small>PROJETOS ENTREGUES</small><h3>Energia limpa.<br />Resultado visível.</h3></header>
        <div>{["project-01.jpg", "project-02.jpg", "project-03.jpg"].map((image, index) => <figure key={image}><Image src={`/concepts/solaris/${image}`} alt={`Projeto solar Solaris ${index + 1}`} fill sizes="33vw" quality={82} /><figcaption><b>PROJETO 0{index + 1}</b><span>{index === 0 ? "RESIDENCIAL" : index === 1 ? "COMERCIAL" : "GERAÇÃO DISTRIBUÍDA"}</span></figcaption></figure>)}</div>
      </section>

      <section className={styles.solarOutcomes}>
        <header><small>PROJETO, INSTALAÇÃO E MONITORAMENTO</small><h3>Você acompanha o sistema.<br />Não precisa perseguir a equipe.</h3></header>
        <div><article><span>01</span><strong>Engenharia visível</strong><p>Dimensionamento, equipamentos e previsão de geração apresentados antes da instalação.</p></article><article><span>02</span><strong>Homologação acompanhada</strong><p>Cada etapa junto à distribuidora aparece em uma linha do tempo simples.</p></article><article><span>03</span><strong>Economia monitorada</strong><p>Aplicativo, alertas e suporte para verificar o desempenho depois da entrega.</p></article><aside><small>CENÁRIO SIMULADO ATUAL</small><b>{simulation.panels} módulos</b><strong>{formatBRL(simulation.annualSaving)}<i>/ano</i></strong><span>estimativa conforme conta informada</span></aside></div>
      </section>

      <section className={styles.solarReasons}><header><small>POR QUE {SOLAR_BRAND}</small><h3>Um investimento grande<br />pede confiança completa.</h3></header><div><span><b>01</b>Material de alta qualidade</span><span><b>02</b>25 anos de garantia</span><span><b>03</b>Engenharia própria</span><span><b>04</b>Suporte pós-instalação</span></div></section>
      <section className={styles.solarFaq}><header><small>DÚVIDAS FREQUENTES</small><h3>Antes de gerar energia,<br />gere clareza.</h3></header><div><details><summary>O investimento inicial é alto?<span>+</span></summary><p>O projeto é dimensionado para que a economia e as condições de pagamento façam sentido para o imóvel.</p></details><details><summary>Quanto tempo leva para instalar?<span>+</span></summary><p>Depois da aprovação técnica, instalações residenciais costumam ser concluídas em poucos dias.</p></details><details><summary>O sistema exige manutenção frequente?<span>+</span></summary><p>Os módulos são de baixa manutenção e o desempenho pode ser acompanhado pelo aplicativo.</p></details></div></section>
      <footer className={styles.solarFooter}><strong><i>☀</i>{SOLAR_BRAND}<small>ENERGIA SOLAR</small></strong><span>Projeto claro. Instalação acompanhada. Economia monitorada.</span><div><b>RESIDENCIAL</b><b>EMPRESARIAL</b><b>RURAL</b></div></footer>
    </main>
  );
}

const TAPECAR_PACKAGES = [
  {
    id: "ppf",
    name: "PPF Ultra Shield (Full Frontal / Total)",
    tag: "PROTEÇÃO MÁXIMA CONTRA PEDRISCOS",
    description: "Película de TPU de 200 microns autorregenerativa sob calor solar. Proteção física real contra pedras de estrada, arranhões e riscos de chave.",
    specs: ["Autorregeneração térmica", "Garantia de 10 anos", "Sem alteração de cor ou textura", "Cobertura em bordas invisíveis"],
    price: "A partir de R$ 4.800",
    time: "3 a 5 dias",
  },
  {
    id: "ceramic",
    name: "Vitrificação Cerâmica 9H Graphene",
    tag: "BRILHO ESPELHADO & HIDRORREPELÊNCIA",
    description: "Revestimento de nanotecnologia de grafeno com dureza 9H+. Cria um escudo vítreo contra fezes de pássaros, seiva de árvore, maresia e raios UV.",
    specs: ["Ângulo de contato de 115°", "Proteção de 3 a 5 anos", "Toque aveludado profundo", "Lavagens até 4x mais fáceis"],
    price: "A partir de R$ 1.850",
    time: "2 dias",
  },
  {
    id: "polish",
    name: "Correção de Pintura & Polimento Técnico",
    tag: "REMOÇÃO DE 99% DOS MICRO-RISCOS",
    description: "Processo em 4 etapas (Corte, Refino, Lustro e Superlustro) com medidor ultrassônico de espessura de verniz, eliminando swirls e hologramas.",
    specs: ["Medição micrométrica de verniz", "Eliminação de marcas de lavagem", "Profundidade de cor e reflexo", "Sem mascaramento ou silicones"],
    price: "A partir de R$ 1.200",
    time: "1 a 2 dias",
  },
  {
    id: "interior",
    name: "Higienização Detalhada & Proteção de Couro",
    tag: "INTERIOR IMACULADO & PROTEGIDO",
    description: "Descontaminação a vapor térmico 180°C, ozonização antibacteriana e aplicação de cerâmica protetora em bancos de couro contra manchas e rachaduras.",
    specs: ["Vapor 180°C antibacteriano", "Proteção cerâmica para couros", "Impermeabilização de tecidos", "Ozonização de ar-condicionado"],
    price: "A partir de R$ 850",
    time: "1 dia",
  },
];

function TapeCarShowcase() {
  const [activeTab, setActiveTab] = useState<"after" | "before">("after");
  const [selectedPkg, setSelectedPkg] = useState<string>("ppf");
  const [carValue, setCarValue] = useState<number>(350000);

  const valorization = useMemo(() => {
    return Math.round(carValue * 0.16);
  }, [carValue]);

  const activePackage = TAPECAR_PACKAGES.find((p) => p.id === selectedPkg) || TAPECAR_PACKAGES[0];

  return (
    <main className={`${styles.site} ${styles.tapecar}`}>
      <header className={styles.tapecarHeader}>
        <div className={styles.tapecarBrand}>
          <strong>TAPE CAR</strong>
          <small>ESTÉTICA AUTOMOTIVA & PPF ELITE</small>
        </div>
        <div className={styles.tapecarNav}>
          <button type="button" className={styles.tapeNavActive}>STUDIO</button>
          <button type="button">PPF & CERÂMICA</button>
          <button type="button">ANTES & DEPOIS</button>
          <button type="button">SIMULADOR</button>
        </div>
        <a
          href="https://wa.me/5573981019782?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20personalizado%20no%20Tape%20Car%20Studio."
          target="_blank"
          rel="noreferrer"
          className={styles.tapecarContactBtn}
        >
          <span>Agendamento VIP</span>
          <b>↗</b>
        </a>
      </header>

      {/* HERO SECTION */}
      <section className={styles.tapecarHero}>
        <div className={styles.tapecarHeroBackdrop}>
          <Image
            src="/concepts/tapecar-studio.jpg"
            alt="Tape Car Studio de Estética Automotiva e PPF"
            width={1600}
            height={1000}
            sizes="100vw"
            quality={80}
            className={styles.tapecarHeroImg}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <div className={styles.tapecarShade} />
        
        <div className={styles.tapecarHeroCopy}>
          <span className={styles.tapecarBadge}>CERTIFICAÇÃO INTERNACIONAL EM PPF & COATINGS</span>
          <h2>
            Proteção invisível.<br />
            <i>Brilho que desafia o tempo.</i>
          </h2>
          <p>
            Tecnologia de ponta em Paint Protection Film (PPF autorregenerativo) e Vitrificação Cerâmica 9H Graphene para superesportivos e veículos de alto padrão.
          </p>
          <div className={styles.tapecarHeroCtas}>
            <a
              href="https://wa.me/5573981019782?text=Ol%C3%A1!%20Quero%20proteger%20meu%20ve%C3%ADculo%20com%20PPF%2FVitrificação%20no%20Tape%20Car."
              target="_blank"
              rel="noreferrer"
              className={styles.tapecarCtaPrimary}
            >
              <span>SOLICITAR AVALIAÇÃO TÉCNICA</span>
              <b>↗</b>
            </a>
            <span className={styles.tapecarGuarantee}>🛡️ 10 ANOS DE GARANTIA EM PPF</span>
          </div>
        </div>

        <aside className={styles.tapecarHeroAside}>
          <small>CONTROLE DE QUALIDADE ÓPTICA</small>
          <b>Laboratório Climatizado</b>
          <span>Iluminação hexagonal de inspeção laser e temperatura controlada em 22°C para cura perfeita.</span>
          <div className={styles.tapecarAsideStats}>
            <div><strong>+2.400</strong><small>Veículos Protegidos</small></div>
            <div><strong>100%</strong><small>Satisfação Dekra</small></div>
          </div>
        </aside>
      </section>

      {/* ANTES E DEPOIS INTERATIVO */}
      <section className={styles.tapecarCompareSection}>
        <div className={styles.tapecarSectionHead}>
          <div>
            <small>COMPARATIVO DE CORREÇÃO ÓPTICA</small>
            <h3>Veja o impacto real na pintura</h3>
          </div>
          <div className={styles.tapecarCompareToggle}>
            <button
              type="button"
              className={activeTab === "before" ? styles.compareBtnActive : ""}
              onClick={() => setActiveTab("before")}
            >
              ❌ ESTADO ORIGINAL
            </button>
            <button
              type="button"
              className={activeTab === "after" ? styles.compareBtnActive : ""}
              onClick={() => setActiveTab("after")}
            >
              ✨ TRATAMENTO TAPE CAR
            </button>
          </div>
        </div>

        <div className={styles.tapecarCompareCard}>
          {activeTab === "before" ? (
            <div className={styles.compareStateBox}>
              <div className={styles.compareBadgeBad}>PINTURA DESPROTEGIDA & OXIDADA</div>
              <h4>Riscos Circulares (Swirls), Manchas de Chuva Ácida e Perda de Brilho</h4>
              <p>Lavagens convencionais causam micro-fissuras no verniz, tornando a cor opaca e desvalorizando o veículo na revenda.</p>
              <ul className={styles.compareListBad}>
                <li>❌ Micro-riscos visíveis sob a luz do sol</li>
                <li>❌ Verniz vulnerável a pedriscos de estrada</li>
                <li>❌ Água e sujeira impregnam na superfície</li>
                <li>❌ Risco iminente de perda da pintura original de fábrica</li>
              </ul>
            </div>
          ) : (
            <div className={styles.compareStateBox}>
              <div className={styles.compareBadgeGood}>PADRÃO SHOWROOM TAPE CAR ELITE</div>
              <h4>PPF Autorregenerativo + Vitrificação Cerâmica 9H Graphene</h4>
              <p>A pintura ganha reflexo espelhado absoluto, hidrorrepelência instantânea e proteção física contra impactos.</p>
              <ul className={styles.compareListGood}>
                <li>✅ Auto-cura de arranhões sob calor do sol ou água quente</li>
                <li>✅ Escudo contra fezes de pássaros, solventes e raios UV</li>
                <li>✅ Ângulo de contato de 115° com repelência hidrofóbica total</li>
                <li>✅ Preservação comprovada de +15% a +18% no valor de revenda</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* PACOTES DE SERVIÇOS */}
      <section className={styles.tapecarPackagesSection}>
        <div className={styles.tapecarSectionHead}>
          <div>
            <small>TABELA DE TRATAMENTOS</small>
            <h3>Selecione a proteção ideal para o seu veículo</h3>
          </div>
        </div>

        <div className={styles.tapecarPackagesGrid}>
          {TAPECAR_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`${styles.tapecarPkgCard} ${selectedPkg === pkg.id ? styles.pkgCardSelected : ""}`}
            >
              <span className={styles.pkgTag}>{pkg.tag}</span>
              <h4>{pkg.name}</h4>
              <p>{pkg.description}</p>
              <ul className={styles.pkgSpecs}>
                {pkg.specs.map((s) => <li key={s}>✓ {s}</li>)}
              </ul>
              <div className={styles.pkgFoot}>
                <div>
                  <strong>{pkg.price}</strong>
                  <small>Prazo médio: {pkg.time}</small>
                </div>
                <button type="button" className={styles.pkgSelectBtn} onClick={() => setSelectedPkg(pkg.id)} aria-pressed={selectedPkg === pkg.id}>
                  {selectedPkg === pkg.id ? "SELECIONADO" : "DETALHES"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SIMULADOR DE VALORIZAÇÃO PATRIMONIAL */}
      <section className={styles.tapecarSimSection}>
        <div className={styles.tapecarSectionHead}>
          <div>
            <small>ENGENHARIA FINANCEIRA AUTOMOTIVA</small>
            <h3>Simulador de Preservação & Valorização</h3>
          </div>
        </div>

        <div className={styles.tapecarSimGrid}>
          <div className={styles.tapecarSimControls}>
            <label>
              <span>VALOR ATUAL DO SEU VEÍCULO:</span>
              <b>{formatBRL(carValue)}</b>
            </label>
            <input
              type="range"
              min={100000}
              max={1500000}
              step={25000}
              value={carValue}
              onChange={(e) => setCarValue(Number(e.target.value))}
            />
            <small>Arraste para calcular a preservação da pintura original em relação ao valor da tabela FIPE.</small>
          </div>

          <div className={styles.tapecarSimResults}>
            <div className={styles.simResultCard}>
              <small>VALORIZAÇÃO ESTIMADA NA REVENDA (+16%)</small>
              <strong>{formatBRL(valorization)}</strong>
              <span>Veículos com pintura original e PPF têm liquidez 3x mais rápida no mercado premium.</span>
            </div>
            <a
              href={`https://wa.me/5573981019782?text=Ol%C3%A1!%20Meu%20carro%20vale%20${encodeURIComponent(formatBRL(carValue))}%20e%20quero%20um%20or%C3%A7amento%20de%20${encodeURIComponent(activePackage.name)}%20no%20Tape%20Car.`}
              target="_blank"
              rel="noreferrer"
              className={styles.tapecarSimCta}
            >
              <span>AGENDAR {activePackage.name.split("(")[0].toUpperCase()}</span>
              <ArrowVector />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import VerticePage from "../vertice/page";
import MotoraPage from "../motora/page";
import CoraPage from "../cora/page";

export function SectorShowcasePage({ type }: { type: SectorShowcaseType }) {
  if (type === "cars") return <MotoraPage />;
  if (type === "fashion") return <VerticePage />;
  if (type === "realestate" || type === "realtor") return <CoraPage />;
  if (type === "mechanic") return <MechanicShowcase />;
  if (type === "tapecar") return <TapeCarShowcase />;
  if (type === "dentistry") return <DentistryShowcase />;
  if (type === "law") return <LawShowcase />;
  if (type === "salon") return <SalonShowcase />;
  if (type === "aesthetics") return <AestheticsShowcase />;
  if (type === "solar") return <SolarShowcase />;
  return <AutonomousShowcase />;
}
