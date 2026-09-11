"use client";

import { useState, useMemo } from "react";
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

/* =========================================================================
   1. NEXO ODONTOLOGIA — ODONTOLOGIA ESTÉTICA & IMPLANTES 3D (COMPLETO)
   ========================================================================= */
function DentistryShowcase() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Lentes em Porcelana 3D");
  const [fear, setFear] = useState("Sedação Consciente Sem Dor");
  const [timeline, setTimeline] = useState("Curto prazo (2 a 4 semanas)");

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Fiz a pré-avaliação 3D no site da Nexo Odonto:\n\n• Objetivo: ${goal}\n• Sensibilidade/Conforto: ${fear}\n• Expectativa: ${timeline}\n\nGostaria de agendar meu escaneamento 3D!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.dentistry}`}>
      {/* 1. Header Boutique */}
      <header className={styles.proHeader}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitle}>
            <span>NEXO</span><span style={{ color: "#0284c7" }}>ODONTO</span>
          </div>
          <span className={styles.proBrandTag}>Odontologia Estética & Implantes Digitais 3D</span>
        </div>
        <div className={styles.proHeaderReview}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      {/* 2. Trust Banner */}
      <div className={styles.proTrustRail}>
        <span>✓ CRO/BA REGULARIZADO</span>
        <span>★ 5.0 NO GOOGLE (+480 AVALIAÇÕES)</span>
        <span>⏱ SCANNER 3D SEM MOLDAGEM</span>
        <span>◇ SEDAÇÃO CONSCIENTE SEM DOR</span>
        <span>💎 CERÂMICAS IMPORTADAS</span>
      </div>

      {/* 3. Hero Section com Triagem 4 Etapas */}
      <section className={styles.proHero} style={{ background: "#0a1322" }}>
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

          <h1>A Odontologia de Alta Precisão Para Transformar Seu Sorriso</h1>

          <p>
            Tecnologia 3D guiada por computador, lentes em porcelana ultranaturais, implantes sem cortes traumáticos e sedação consciente para um atendimento 100% confortável e sem dor.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Scanner intraoral 3D: veja a prévia do seu sorriso antes de iniciar</li>
            <li><GreenCheck /> Lentes de contato ultrafinas que preservam a estrutura natural do dente</li>
            <li><GreenCheck /> Protocolo sem dor com óxido nitroso e anestesia computadorizada</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Eu tinha pavor de dentista por traumas antigos. Na Nexo fiz minhas lentes com sedação consciente e não senti absolutamente nada! O resultado ficou ultra natural, ninguém diz que são facetas.&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <Image
                  src="/concepts/avatars/dental-client.jpg"
                  alt="Fernanda Albuquerque"
                  width={38}
                  height={38}
                  className={styles.proAvatarImg}
                />
                <div>
                  <div className={styles.proUserName}>Fernanda Albuquerque</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐ (Lentes 3D)</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        {/* 4-Step Wizard */}
        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Simulador de Sorriso & Pré-Avaliação 3D</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Etapa {step} de 4 · Análise digital do paciente
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${(step / 4) * 100}%`, background: "#0284c7" }}
            />
          </div>

          {step === 1 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>1. Qual é o seu principal objetivo para o seu sorriso?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Lentes em Porcelana 3D",
                  "Implante Dentário Guiado",
                  "Alinhador Invisível",
                  "Clareamento a Laser",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${goal === opt ? styles.proOptionBtnActive : ""}`}
                    style={goal === opt ? { borderColor: "#0284c7", background: "rgba(2, 132, 199, 0.08)" } : {}}
                    onClick={() => { setGoal(opt); setStep(2); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#0284c7" }} onClick={() => setStep(2)}>
                AVANÇAR PARA ETAPA 2 <ArrowVector />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>2. Possui histórico de sensibilidade ou medo de dentista?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Sedação Consciente Sem Dor",
                  "Sensibilidade Moderada",
                  "100% Tranquilo / Sem Fobia",
                  "Bruxismo / Desgaste Dental",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${fear === opt ? styles.proOptionBtnActive : ""}`}
                    style={fear === opt ? { borderColor: "#0284c7", background: "rgba(2, 132, 199, 0.08)" } : {}}
                    onClick={() => { setFear(opt); setStep(3); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#0284c7" }} onClick={() => setStep(3)}>
                AVANÇAR PARA ETAPA 3 <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>3. Qual a sua expectativa de prazo para a transformação?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Urgente (Casamento / Evento)",
                  "Curto prazo (2 a 4 semanas)",
                  "Médio prazo (Planejado)",
                  "Avaliação de Parcelamento",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${timeline === opt ? styles.proOptionBtnActive : ""}`}
                    style={timeline === opt ? { borderColor: "#0284c7", background: "rgba(2, 132, 199, 0.08)" } : {}}
                    onClick={() => { setTimeline(opt); setStep(4); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#0284c7" }} onClick={() => setStep(4)}>
                GERAR PRÉ-DIAGNÓSTICO <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(2)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 4 && (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 16, padding: "18px", textAlign: "left" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#0369a1", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  RESUMO DA SUA PRÉ-AVALIAÇÃO
                </span>
                <strong style={{ display: "block", fontSize: 17, color: "#0f172a", margin: "8px 0 4px" }}>
                  Protocolo Indicado: {goal}
                </strong>
                <p style={{ fontSize: 12.5, color: "#475569", margin: "0 0 10px", lineHeight: 1.5 }}>
                  ✓ Conforto: {fear}<br />
                  ✓ Planejamento: {timeline}<br />
                  ✓ Escaneamento intraoral 3D incluso na primeira consulta
                </p>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#0284c7" }}>
                  ⚡ Atendimento prioritário liberado para WhatsApp
                </div>
              </div>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
                <span>RESERVAR ESCANEAMENTO 3D NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ↻ Refazer pré-avaliação
              </button>
            </div>
          )}
        </aside>
      </section>

      {/* 4. Pilares da Tecnologia Nexo */}
      <section className={styles.proSectionLight}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#0284c7" }}>EXPERIÊNCIA DIGITAL & SEM DOR</small>
          <h2>Por que a Odontologia Digital Nexo é Diferente?</h2>
          <p>Esqueça massas de moldagem que causam ânsia e procedimentos dolorosos. Investimos na melhor tecnologia mundial para você ter conforto absoluto.</p>
        </div>

        <div className={styles.proPillarsGrid}>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7" }}>📐</div>
            <h3>Scanner Intraoral 3D</h3>
            <p>Captura mais de 6.000 fotos por segundo dos seus dentes em alta resolução. Você visualiza a simulação do sorriso na tela em minutos.</p>
          </div>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7" }}>💎</div>
            <h3>Cerâmicas Alemãs Pura</h3>
            <p>Lentes e facetas fresadas em robótica CAD/CAM com espessura de até 0.2mm, preservando 100% da integridade do seu dente natural.</p>
          </div>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(2, 132, 199, 0.1)", color: "#0284c7" }}>💤</div>
            <h3>Sedação Consciente Segura</h3>
            <p>Para pacientes com fobia de agulha ou dor, utilizamos óxido nitroso e anestesia computadorizada com monitoramento de sinais vitais.</p>
          </div>
        </div>
      </section>

      {/* 5. Tratamentos Especializados */}
      <section className={styles.proSection} style={{ background: "#0c1524" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#38bdf8" }}>TRATAMENTOS DE ALTA PERFORMANCE</small>
          <h2 style={{ color: "#ffffff" }}>Especialidades da Clínica Nexo</h2>
          <p style={{ color: "#94a3b8" }}>Soluções integradas de estética, ortodontia e reabilitação com profissionais especialistas.</p>
        </div>

        <div className={styles.proCasesGrid}>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>ESTÉTICA DENTAL</span>
            <div className={styles.proCaseMetric} style={{ color: "#ffffff" }}>Lentes & Facetas 3D</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              Alinhamento de formato, fechamento de diastemas e clareamento definitivo com translucidez idêntica ao esmalte dental natural.
            </p>
          </div>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>REABILITAÇÃO ORAL</span>
            <div className={styles.proCaseMetric} style={{ color: "#ffffff" }}>Implantes Guiados 3D</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              Cirurgia sem retalhos nem pontos extensos, guiada por tomografia 3D, com cicatrização até 3x mais rápida e dente provisório imediato.
            </p>
          </div>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>ORTODONTIA DIGITAL</span>
            <div className={styles.proCaseMetric} style={{ color: "#ffffff" }}>Alinhadores Invisíveis</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              Placas transparentes termoformadas que corrigem dentes tortos sem ferir a boca e sem interferir na sua vida profissional.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Odontológico */}
      <section className={styles.proSectionLight}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#0284c7" }}>DÚVIDAS FREQUENTES</small>
          <h2>Tudo o Que Você Precisa Saber</h2>
        </div>

        <div className={styles.proFaqGrid}>
          <details className={styles.proFaqItemLight} open>
            <summary>As lentes de contato desgastam muito o dente natural? <i>+</i></summary>
            <p>Não! Na técnica digital moderna 3D, realizamos apenas micro-preparos milimétricos no esmalte (quando necessário). Mais de 90% da estrutura saudável do dente é 100% preservada.</p>
          </details>
          <details className={styles.proFaqItemLight}>
            <summary>Como funciona a sedação consciente? <i>+</i></summary>
            <p>O paciente inala uma mistura controlada de oxigênio e óxido nitroso. Você fica totalmente relaxado e livre de ansiedade, porém acordado e respondendo normalmente aos comandos, sem dor.</p>
          </details>
          <details className={styles.proFaqItemLight}>
            <summary>Quanto tempo dura um tratamento com lentes de porcelana? <i>+</i></summary>
            <p>Com higienização correta e consultas periódicas de profilaxia, as lentes em porcelana têm durabilidade comprovada de 15 a 20 anos sem perder o brilho ou amarelar.</p>
          </details>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <footer className={styles.proFooterCta} style={{ background: "#08101d", color: "#fff" }}>
        <div className={styles.proFooterCtaBox}>
          <small style={{ color: "#38bdf8", fontWeight: 900, letterSpacing: "0.14em" }}>AGENDE SUA CONSULTA BOUTIQUE</small>
          <h2>Pronto Para Conhecer Seu Novo Sorriso?</h2>
          <p style={{ color: "#94a3b8" }}>Nossa equipe de concierge está à disposição para tirar todas as dúvidas e agendar seu escaneamento 3D no melhor horário.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa} style={{ maxWidth: 360 }}>
            <span>FALAR COM CONCIERGE NO WHATSAPP</span>
            <ArrowVector />
          </a>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================================
   2. DR. AUGUSTO MOREIRA — ADVOCACIA EMPRESARIAL & ESTRATÉGICA (COMPLETO)
   ========================================================================= */
function LawShowcase() {
  const [step, setStep] = useState(1);
  const [demand, setDemand] = useState("Contratos Empresariais & Fornecedores");
  const [revenue, setRevenue] = useState("R$ 100k a R$ 500k/mês");
  const [urgency, setUrgency] = useState("Preventivo & Blindagem");

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá Dr. Augusto Moreira! Realizei o diagnóstico preliminar no site:\n\n• Demanda: ${demand}\n• Porte: ${revenue}\n• Situação: ${urgency}\n\nGostaria de agendar uma mesa de decisão jurídica estratégica.`
  )}`;

  return (
    <main className={`${styles.site} ${styles.law}`}>
      {/* 1. Header Executivo */}
      <header className={styles.proHeaderDark}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitleDark}>
            <span>AUGUSTO</span> <span style={{ color: "#d97706" }}>MOREIRA</span>
          </div>
          <span className={styles.proBrandTagDark}>Advocacia Empresarial Estratégica & Contratos</span>
        </div>
        <div className={styles.proHeaderReviewDark}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      {/* 2. Trust Banner */}
      <div className={styles.proTrustRailDark}>
        <span>✓ OAB/BA 48.912 REGULARIZADA</span>
        <span>★ 5.0 NO GOOGLE</span>
        <span>⏱ SLA DE PARECER EM 48H</span>
        <span>◇ +R$ 42M EM PASSIVOS MITIGADOS</span>
        <span>🔒 SIGILO E COMPLIANCE TOTAL</span>
      </div>

      {/* 3. Hero Section com Triagem 4 Etapas */}
      <section className={styles.proHero} style={{ background: "#0f1117" }}>
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
            Transformamos contratos frágeis, disputas societárias e passivos ocultos em decisões estruturadas que protegem o patrimônio dos sócios e aceleram o crescimento do negócio.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Diagnóstico preliminar e triagem de risco contratual em 48h</li>
            <li><GreenCheck /> Acordos de sócios blindados, memorandos de investimento e M&A</li>
            <li><GreenCheck /> Atendimento direto com advogado sócio sênior sem intermediários</li>
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

        {/* 4-Step Wizard */}
        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Diagnóstico Jurídico Empresarial</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Etapa {step} de 4 · Análise preliminar confidencial sob sigilo OAB
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${(step / 4) * 100}%`, background: "#d97706" }}
            />
          </div>

          {step === 1 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>1. Qual a principal demanda jurídica da sua empresa agora?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Contratos Comerciais & B2B",
                  "Estrutura Societária & Sócios",
                  "Passivo Trabalhista & RH",
                  "Recuperação de Crédito / Ação",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${demand === opt ? styles.proOptionBtnActive : ""}`}
                    style={demand === opt ? { borderColor: "#d97706", background: "rgba(217, 119, 6, 0.08)" } : {}}
                    onClick={() => { setDemand(opt); setStep(2); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#d97706" }} onClick={() => setStep(2)}>
                AVANÇAR PARA ETAPA 2 <ArrowVector />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>2. Qual o faturamento / porte aproximado do negócio?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Até R$ 100k/mês (Pequeno porte)",
                  "R$ 100k a R$ 500k/mês (Médio)",
                  "Acima de R$ 500k/mês (Grande)",
                  "Holding Familiar / Grupo",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${revenue === opt ? styles.proOptionBtnActive : ""}`}
                    style={revenue === opt ? { borderColor: "#d97706", background: "rgba(217, 119, 6, 0.08)" } : {}}
                    onClick={() => { setRevenue(opt); setStep(3); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#d97706" }} onClick={() => setStep(3)}>
                AVANÇAR PARA ETAPA 3 <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>3. Qual o nível de urgência da situação?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Preventivo & Blindagem",
                  "Notificação Recebida",
                  "Ação Judicial em Andamento",
                  "Entrada de Novo Sócio / M&A",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${urgency === opt ? styles.proOptionBtnActive : ""}`}
                    style={urgency === opt ? { borderColor: "#d97706", background: "rgba(217, 119, 6, 0.08)" } : {}}
                    onClick={() => { setUrgency(opt); setStep(4); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#d97706" }} onClick={() => setStep(4)}>
                GERAR ENQUADRAMENTO <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(2)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 4 && (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#1c1813", border: "1px solid #78350f", borderRadius: 16, padding: "18px", textAlign: "left", color: "#fef3c7" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  PARECER PRELIMINAR CONFIDENCIAL
                </span>
                <strong style={{ display: "block", fontSize: 17, color: "#fff", margin: "8px 0 4px" }}>
                  Demanda: {demand}
                </strong>
                <p style={{ fontSize: 12.5, color: "#d1d5db", margin: "0 0 10px", lineHeight: 1.5 }}>
                  ✓ Porte: {revenue}<br />
                  ✓ Regime: {urgency}<br />
                  ✓ Parecer preliminar com SLA de resposta em até 48h
                </p>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b" }}>
                  🔒 Linha privativa direta com sócio sênior
                </div>
              </div>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
                <span>AGENDAR MESA DE DECISÃO NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ↻ Refazer diagnóstico
              </button>
            </div>
          )}
        </aside>
      </section>

      {/* 4. Áreas de Especialidade */}
      <section className={styles.proSection} style={{ background: "#12141a" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#f59e0b" }}>ATUAÇÃO ESTRATÉGICA CORPORATIVA</small>
          <h2 style={{ color: "#fff" }}>Direito de Alta Complexidade Descomplicado</h2>
          <p style={{ color: "#94a3b8" }}>Entregamos segurança jurídica executável para quem toma decisões de alto risco todos os dias.</p>
        </div>

        <div className={styles.proPillarsGrid}>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(217, 119, 6, 0.15)", color: "#f59e0b" }}>📑</div>
            <h3 style={{ color: "#fff" }}>Contratos Comerciais & B2B</h3>
            <p style={{ color: "#cbd5e1" }}>Minutas de alta precisão com cláusulas de limitação de responsabilidade, SLAs, multas equilibradas e blindagem operacional.</p>
          </div>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(217, 119, 6, 0.15)", color: "#f59e0b" }}>🏛️</div>
            <h3 style={{ color: "#fff" }}>Societário & Acordo de Sócios</h3>
            <p style={{ color: "#cbd5e1" }}>Estruturação de regras de saída, vesting, drag-along, tag-along e governança para evitar paralisia operacional em conflitos.</p>
          </div>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(217, 119, 6, 0.15)", color: "#f59e0b" }}>🛡️</div>
            <h3 style={{ color: "#fff" }}>Compliance Trabalhista</h3>
            <p style={{ color: "#cbd5e1" }}>Auditoria preventiva em rotinas de contratação, PJotização segura e políticas internas para zerar passivos ocultos.</p>
          </div>
        </div>
      </section>

      {/* 5. FAQ Jurídico */}
      <section className={styles.proSection} style={{ background: "#0c0d12" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#f59e0b" }}>GOVERNANÇA & ATENDIMENTO</small>
          <h2 style={{ color: "#fff" }}>Perguntas Frequentes de Empresários</h2>
        </div>

        <div className={styles.proFaqGrid}>
          <details className={styles.proFaqItem} open>
            <summary style={{ color: "#fff" }}>O atendimento é feito diretamente com o Dr. Augusto Moreira? <i>+</i></summary>
            <p style={{ color: "#cbd5e1" }}>Sim. Toda a estratégia, reuniões de alinhamento e deliberações de risco são conduzidas diretamente pelo sócio sênior.</p>
          </details>
          <details className={styles.proFaqItem}>
            <summary style={{ color: "#fff" }}>Atendem empresas fora do estado? <i>+</i></summary>
            <p style={{ color: "#cbd5e1" }}>Sim. Atendemos empresas e grupos empresariais em todo o território nacional através de mesas de decisão virtuais com tecnologia segura e assinaturas digitais ICP-Brasil.</p>
          </details>
          <details className={styles.proFaqItem}>
            <summary style={{ color: "#fff" }}>Como funciona a cobrança dos honorários? <i>+</i></summary>
            <p style={{ color: "#cbd5e1" }}>Trabalhamos com formatos adaptados ao momento do negócio: assessoria mensal recorrente (retainer fixo), projetos pontuais (escopo fechado) ou honorários por êxito estratégico.</p>
          </details>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <footer className={styles.proFooterCta} style={{ background: "#07080a", color: "#fff" }}>
        <div className={styles.proFooterCtaBox}>
          <small style={{ color: "#f59e0b", fontWeight: 900, letterSpacing: "0.14em" }}>CANAL CONFIDENCIAL PARA SÓCIOS E CEOS</small>
          <h2>Proteja o Patrimônio da Sua Empresa Hoje</h2>
          <p style={{ color: "#94a3b8" }}>Inicie uma conversa reservada diretamente pelo WhatsApp para alinharmos sua demanda com discrição e agilidade.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa} style={{ maxWidth: 360 }}>
            <span>CONVERSAR DIRETAMENTE NO WHATSAPP</span>
            <ArrowVector />
          </a>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================================
   3. AURÉA ATELIER — SALÃO DE BELEZA, VISAGISMO & CONCIERGE (COMPLETO)
   ========================================================================= */
function SalonShowcase() {
  const [step, setStep] = useState(1);
  const [ritual, setRitual] = useState("Mechas Luxo Supreme Blonde");
  const [history, setHistory] = useState("Cabelo com mechas anteriores (>4 meses)");
  const [pref, setPref] = useState("Quarta a Sexta (Atendimento Tranquilo)");

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Fiz a consultoria no site do Auréa Atelier:\n\n• Ritual: ${ritual}\n• Histórico: ${history}\n• Preferência: ${pref}\n\nGostaria de verificar os horários disponíveis com o concierge!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.salon}`}>
      {/* 1. Header Boutique */}
      <header className={styles.proHeader}>
        <div className={styles.proBrandWrap}>
          <div className={styles.proBrandTitle}>
            <span>AURÉA</span> <span style={{ color: "#a86752" }}>ATELIER</span>
          </div>
          <span className={styles.proBrandTag}>Beleza, Visagismo & Rituais Autorais</span>
        </div>
        <div className={styles.proHeaderReview}>
          <b>5.0</b>
          <span style={{ color: "#f59e0b" }}>★★★★★</span>
          <GoogleWordmark />
        </div>
      </header>

      {/* 2. Trust Banner */}
      <div className={styles.proTrustRail}>
        <span>✓ EQUIPE VISAGISTA CERTIFICADA</span>
        <span>★ 5.0 NO GOOGLE (+320 AVALIAÇÕES)</span>
        <span>⏱ TESTE DE MECHA GRATUITO</span>
        <span>◇ PRODUTOS KÉRASTASE & WELLA</span>
        <span>💆 SALA DE LAVATÓRIO COM SHIATSU</span>
      </div>

      {/* 3. Hero Section com Triagem 4 Etapas */}
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

          <h1>Visagismo Autoral e Mechas Exclusivas Para Realçar Sua Identidade</h1>

          <p>
            Mais do que uma mudança de cor, um estudo completo do seu tom de pele, formato de rosto e rotina para criar um visual sofisticado, elegante e fácil de manter.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Mechas com proteção plex: clareamento seguro sem quebra</li>
            <li><GreenCheck /> Corte visagista com consultoria de imagem e harmonização facial</li>
            <li><GreenCheck /> Diagnóstico de saúde do fio com microcâmera capilar</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Nunca achei um loiro que combinasse tanto comigo sem detonar meu cabelo. O atendimento no Auréa é uma experiência de spa do começo ao fim. Saí me sentindo maravilhosa!&rdquo;
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
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐ (Loiro Manteiga)</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        {/* 4-Step Wizard */}
        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Consultoria de Ritual & Agendamento</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Etapa {step} de 4 · Diagnóstico de beleza personalizado
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${(step / 4) * 100}%`, background: "#a86752" }}
            />
          </div>

          {step === 1 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>1. Qual transformação você deseja realizar?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Mechas Luxo Supreme",
                  "Morena Iluminada Glow",
                  "Corte Visagista + Spa",
                  "Dia da Noiva / Produção VIP",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${ritual === opt ? styles.proOptionBtnActive : ""}`}
                    style={ritual === opt ? { borderColor: "#a86752", background: "rgba(168, 103, 82, 0.08)" } : {}}
                    onClick={() => { setRitual(opt); setStep(2); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#a86752" }} onClick={() => setStep(2)}>
                AVANÇAR PARA ETAPA 2 <ArrowVector />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>2. Qual o histórico recente do seu cabelo?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Cabelo virgem sem química",
                  "Mechas (>4 meses)",
                  "Progressiva / Botox",
                  "Sensibilizado / Quebradiço",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${history === opt ? styles.proOptionBtnActive : ""}`}
                    style={history === opt ? { borderColor: "#a86752", background: "rgba(168, 103, 82, 0.08)" } : {}}
                    onClick={() => { setHistory(opt); setStep(3); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#a86752" }} onClick={() => setStep(3)}>
                AVANÇAR PARA ETAPA 3 <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>3. Qual a sua preferência de dia e horário?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Quarta a Sexta (Tranquilo)",
                  "Sábado (Dia de Eventos)",
                  "Horário VIP Noturno (>18h)",
                  "Teste de Mecha Prévia",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${pref === opt ? styles.proOptionBtnActive : ""}`}
                    style={pref === opt ? { borderColor: "#a86752", background: "rgba(168, 103, 82, 0.08)" } : {}}
                    onClick={() => { setPref(opt); setStep(4); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#a86752" }} onClick={() => setStep(4)}>
                GERAR PRESCRIÇÃO DO RITUAL <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(2)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 4 && (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#fdf8f6", border: "1px solid #f5ded7", borderRadius: 16, padding: "18px", textAlign: "left", color: "#30221d" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#a86752", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  PRESCRIÇÃO DO RITUAL AURÉA
                </span>
                <strong style={{ display: "block", fontSize: 17, color: "#30221d", margin: "8px 0 4px" }}>
                  {ritual}
                </strong>
                <p style={{ fontSize: 12.5, color: "#6a5750", margin: "0 0 10px", lineHeight: 1.5 }}>
                  ✓ Perfil do Fio: {history}<br />
                  ✓ Agenda Selecionada: {pref}<br />
                  ✓ Teste de mecha e café barista inclusos
                </p>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#a86752" }}>
                  ✨ Atendimento exclusivo com concierge
                </div>
              </div>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
                <span>RESERVAR COM CONCIERGE NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ↻ Refazer consultoria
              </button>
            </div>
          )}
        </aside>
      </section>

      {/* 4. Rituais Autorais */}
      <section className={styles.proSectionLight}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#a86752" }}>EXPERIÊNCIAS SIGNATURE</small>
          <h2>Rituais Criados Para o Seu Estilo</h2>
          <p>Trabalhamos com as marcas mais prestigiadas do mundo para garantir cor luminosa e fios com saúde intocada.</p>
        </div>

        <div className={styles.proPillarsGrid}>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(168, 103, 82, 0.1)", color: "#a86752" }}>✨</div>
            <h3>Loiro Supreme Blonde</h3>
            <p>Clareamento com proteção lipídica Wella BlondorPlex. Tons areia, manteiga ou pérola com transição sem marcas.</p>
          </div>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(168, 103, 82, 0.1)", color: "#a86752" }}>🍂</div>
            <h3>Morena Iluminada Glow</h3>
            <p>Iluminação estratégica nos contornos faciais com tons de mel, avelã e caramelo para dar profundidade e brilho.</p>
          </div>
          <div className={styles.proPillarCardLight}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(168, 103, 82, 0.1)", color: "#a86752" }}>✂️</div>
            <h3>Corte de Precisão Visagista</h3>
            <p>Estudo do formato do rosto e textura do fio para criar linhas que valorizam seu perfil e são fáceis de estilizar em casa.</p>
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <footer className={styles.proFooterCta} style={{ background: "#1a120f", color: "#fff" }}>
        <div className={styles.proFooterCtaBox}>
          <small style={{ color: "#e0a899", fontWeight: 900, letterSpacing: "0.14em" }}>EXPERIÊNCIA BOUTIQUE</small>
          <h2>Sua Beleza Merece o Cuidado do Auréa</h2>
          <p style={{ color: "#cfb7ad" }}>Reserve seu horário e viva uma tarde inesquecível de cuidado e sofisticação.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa} style={{ maxWidth: 360 }}>
            <span>AGENDAR VIA WHATSAPP COM CONCIERGE</span>
            <ArrowVector />
          </a>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================================
   4. CAIO MOVE — CONSULTORIA ESPORTIVA & PERSONAL TRAINER (COMPLETO)
   ========================================================================= */
function AutonomousShowcase() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Emagrecimento & Definição");
  const [location, setLocation] = useState("Academia (3 a 5x por semana)");
  const [restriction, setRestriction] = useState("Nenhuma dor / 100% apto");

  const waUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá Caio! Fiz a simulação de treino no seu site:\n\n• Objetivo: ${goal}\n• Local/Frequência: ${location}\n• Restrição/Condição: ${restriction}\n\nQuero receber minha planilha e começar minha consultoria!`
  )}`;

  return (
    <main className={`${styles.site} ${styles.autonomous}`}>
      {/* 1. Header do Personal */}
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

      {/* 2. Trust Banner */}
      <div className={styles.proTrustRailDark}>
        <span>✓ CREF ATIVO (049821-G/BA)</span>
        <span>★ 5.0 NO GOOGLE (+840 ALUNOS)</span>
        <span>⏱ PROTOCOLO PERSONALIZADO EM 24H</span>
        <span>◇ APP EXCLUSIVO COM VÍDEOS HD</span>
        <span>💬 SUPORTE DIÁRIO WHATSAPP</span>
      </div>

      {/* 3. Hero Section com Triagem 4 Etapas */}
      <section className={styles.proHero} style={{ background: "#0b1411" }}>
        <Image
          src="/concepts/caio-move.webp"
          alt="Personal Trainer Caio Silva orientando treino inteligente"
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

          <h1>Treino Inteligente e Evolução Real Para a Sua Rotina</h1>

          <p>
            Seu corpo não precisa de dietas malucas nem treinos genéricos de gaveta. Você precisa de um método biomecânico individualizado, que respeita o seu tempo e entrega resultados consistentes sem lesões.
          </p>

          <ul className={styles.proChecklist}>
            <li><GreenCheck /> Treinos sob medida para academia ou em casa com foco nas suas metas</li>
            <li><GreenCheck /> Análise postural por vídeo e correção de biomecânica individual</li>
            <li><GreenCheck /> App exclusivo com timer, contagem de cargas e vídeos explicativos</li>
          </ul>

          <div className={styles.proGlassCard}>
            <p className={styles.proGlassQuote}>
              &ldquo;Treino com a consultoria do Caio há 1 ano. Perdi 14kg, melhorei minha postura e nunca mais tive dor na lombar. O app é sensacional e ele responde todas as dúvidas no WhatsApp!&rdquo;
            </p>
            <div className={styles.proGlassFooter}>
              <div className={styles.proGlassUser}>
                <Image
                  src="/concepts/solaris/roberto.jpg"
                  alt="Roberto Vasconcelos"
                  width={38}
                  height={38}
                  className={styles.proAvatarImg}
                />
                <div>
                  <div className={styles.proUserName}>Roberto Vasconcelos</div>
                  <div className={styles.proUserRating}>5.0 ⭐⭐⭐⭐⭐ (-14kg & Definição)</div>
                </div>
              </div>
              <GoogleWordmark />
            </div>
          </div>
        </div>

        {/* 4-Step Wizard */}
        <aside className={styles.proQuizCard}>
          <div>
            <h3 className={styles.proQuizTitle}>Simulador de Treino & Periodização</h3>
            <p className={styles.proQuizSubtitle}>
              ⏱ Etapa {step} de 4 · Análise de perfil esportivo
            </p>
          </div>

          <div className={styles.proQuizProgressBar}>
            <div
              className={styles.proQuizProgressFill}
              style={{ width: `${(step / 4) * 100}%`, background: "#10b981" }}
            />
          </div>

          {step === 1 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>1. Qual é o seu objetivo principal agora?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Emagrecimento & Definição",
                  "Hipertrofia & Massa Muscular",
                  "Saúde & Postura Sem Dores",
                  "Preparação para TAF / Corrida",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${goal === opt ? styles.proOptionBtnActive : ""}`}
                    style={goal === opt ? { borderColor: "#10b981", background: "rgba(16, 185, 129, 0.08)" } : {}}
                    onClick={() => { setGoal(opt); setStep(2); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#10b981" }} onClick={() => setStep(2)}>
                AVANÇAR PARA ETAPA 2 <ArrowVector />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>2. Onde e quantas vezes você pretende treinar?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Academia (3 a 5x por semana)",
                  "Em Casa (Halteres / Peso do corpo)",
                  "Híbrido (Academia + Corrida)",
                  "Iniciante (Começando do zero)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${location === opt ? styles.proOptionBtnActive : ""}`}
                    style={location === opt ? { borderColor: "#10b981", background: "rgba(16, 185, 129, 0.08)" } : {}}
                    onClick={() => { setLocation(opt); setStep(3); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#10b981" }} onClick={() => setStep(3)}>
                AVANÇAR PARA ETAPA 3 <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 3 && (
            <div className={styles.proQuizStep}>
              <div className={styles.proStepLabel}>3. Possui alguma dor ou restrição articular?</div>
              <div className={styles.proOptionsGrid}>
                {[
                  "Nenhuma dor / 100% apto",
                  "Dor na Coluna / Lombar",
                  "Dor no Joelho / Ombro",
                  "Pouco tempo (<40min/dia)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.proOptionBtn} ${restriction === opt ? styles.proOptionBtnActive : ""}`}
                    style={restriction === opt ? { borderColor: "#10b981", background: "rgba(16, 185, 129, 0.08)" } : {}}
                    onClick={() => { setRestriction(opt); setStep(4); }}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
              <button type="button" className={styles.proBtnPrimary} style={{ background: "#10b981" }} onClick={() => setStep(4)}>
                GERAR ESTIMATIVA DE RESULTADO <ArrowVector />
              </button>
              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(2)}>
                ← Voltar etapa
              </button>
            </div>
          )}

          {step === 4 && (
            <div className={styles.proQuizStep}>
              <div style={{ background: "#062319", border: "1px solid #059669", borderRadius: 16, padding: "18px", textAlign: "left", color: "#ecfdf5" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  ESTIMATIVA DE EVOLUÇÃO (90 DIAS)
                </span>
                <strong style={{ display: "block", fontSize: 17, color: "#fff", margin: "8px 0 4px" }}>
                  Foco: {goal}
                </strong>
                <p style={{ fontSize: 12.5, color: "#a7f3d0", margin: "0 0 10px", lineHeight: 1.5 }}>
                  ✓ Rotina: {location}<br />
                  ✓ Condição: {restriction}<br />
                  ✓ App liberado com vídeos em 24h após anamnese
                </p>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399" }}>
                  ⚡ Periodização individualizada pronta para envio
                </div>
              </div>

              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
                <span>RECEBER PLANILHA & APP NO WHATSAPP</span>
                <ArrowVector />
              </a>

              <button type="button" className={styles.proStepBackBtn} onClick={() => setStep(1)}>
                ↻ Refazer simulação
              </button>
            </div>
          )}
        </aside>
      </section>

      {/* 4. Os 3 Pilares do Método Caio Move */}
      <section className={styles.proSection} style={{ background: "#0a110e" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#10b981" }}>MÉTODO DE ALTA PERFORMANCE</small>
          <h2 style={{ color: "#fff" }}>Como Funciona a Consultoria Caio Move</h2>
          <p style={{ color: "#94a3b8" }}>Chega de fichas de academia que ninguém explica. Aqui você tem suporte de verdade na palma da mão.</p>
        </div>

        <div className={styles.proPillarsGrid}>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>📱</div>
            <h3 style={{ color: "#fff" }}>App Exclusivo com Vídeos HD</h3>
            <p style={{ color: "#cbd5e1" }}>Visualize a postura correta em cada exercício, cronometre seu descanso e anote suas cargas para acompanhar sua evolução.</p>
          </div>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>🎯</div>
            <h3 style={{ color: "#fff" }}>Periodização Ondulatória</h3>
            <p style={{ color: "#cbd5e1" }}>Seu treino muda estrategicamente a cada 4 a 6 semanas para evitar que seu corpo se acostume e pare de queimar gordura.</p>
          </div>
          <div className={styles.proPillarCard}>
            <div className={styles.proPillarIcon} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>💬</div>
            <h3 style={{ color: "#fff" }}>Suporte & Correção de Postura</h3>
            <p style={{ color: "#cbd5e1" }}>Envie vídeos executando os exercícios no WhatsApp para correção de alavancas e receba feedbacks rápidos diretamente do Caio.</p>
          </div>
        </div>
      </section>

      {/* 5. Transformações Reais */}
      <section className={styles.proSection} style={{ background: "#060b09" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#10b981" }}>CASOS DE SUCESSO</small>
          <h2 style={{ color: "#fff" }}>Resultados Reais de Quem Treina Com o Método</h2>
        </div>

        <div className={styles.proCasesGrid}>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>-16KG EM 5 MESES</span>
            <div className={styles.proCaseMetric} style={{ color: "#fff" }}>Felipe Mendes, 34 anos</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              &ldquo;Consegui secar a gordura abdominal sem passar fome e sem gastar 2 horas por dia na academia. O treino de 45 minutos do Caio é cirúrgico!&rdquo;
            </p>
          </div>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>FIM DA DOR LOMBAR</span>
            <div className={styles.proCaseMetric} style={{ color: "#fff" }}>Dra. Camila Souza, 41 anos</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              &ldquo;Sofria com hérnia de disco há anos. O fortalecimento de core e a correção postural me devolveram a qualidade de vida e a disposição.&rdquo;
            </p>
          </div>
          <div className={styles.proCaseCard}>
            <span className={styles.proCaseTag} style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>+6KG MASSA MAGRA</span>
            <div className={styles.proCaseMetric} style={{ color: "#fff" }}>Lucas Pires, 27 anos</div>
            <p className={styles.proCaseQuote} style={{ color: "#cbd5e1" }}>
              &ldquo;Estava estagnado com a mesma carga há 8 meses. Com os ajustes de amplitude e técnica do Caio, evoluí mais em 3 meses do que no ano todo.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 6. Planos de Consultoria */}
      <section className={styles.proSection} style={{ background: "#0a110e" }}>
        <div className={styles.proSectionHead}>
          <small style={{ color: "#10b981" }}>PLANOS DE ACOMPANHAMENTO</small>
          <h2 style={{ color: "#fff" }}>Escolha a Duração da Sua Evolução</h2>
        </div>

        <div className={styles.proPricingGrid}>
          <div className={styles.proPriceCard}>
            <h3 style={{ color: "#fff" }}>Trimestral</h3>
            <p style={{ color: "#94a3b8" }}>Ideal para quem quer criar o hábito e ver os primeiros resultados visíveis.</p>
            <div className={styles.proPriceValue}>
              <strong style={{ color: "#fff" }}>R$ 180</strong><small>/mês</small>
            </div>
            <ul className={styles.proPriceFeatures}>
              <li><GreenCheck /> Treino completo no App exclusivo</li>
              <li><GreenCheck /> Troca de planilha a cada 4 semanas</li>
              <li><GreenCheck /> Suporte WhatsApp em horário comercial</li>
            </ul>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
              <span>CONTRATAR TRIMESTRAL</span>
            </a>
          </div>

          <div className={`${styles.proPriceCard} ${styles.featured}`}>
            <span className={styles.proPriceTag} style={{ background: "#10b981", color: "#062319" }}>MAIS ESCOLHIDO</span>
            <h3 style={{ color: "#fff" }}>Semestral VIP</h3>
            <p style={{ color: "#94a3b8" }}>Transformação corporal completa com economia e acompanhamento contínuo.</p>
            <div className={styles.proPriceValue}>
              <strong style={{ color: "#10b981" }}>R$ 140</strong><small>/mês</small>
            </div>
            <ul className={styles.proPriceFeatures}>
              <li><GreenCheck /> Treino completo no App exclusivo</li>
              <li><GreenCheck /> Troca de planilha a cada 4 semanas</li>
              <li><GreenCheck /> Suporte prioritário diário no WhatsApp</li>
              <li><GreenCheck /> Análise de vídeos de execução sem limite</li>
              <li><GreenCheck /> Guia de mobilidade e core complementar</li>
            </ul>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa} style={{ background: "#10b981" }}>
              <span>CONTRATAR SEMESTRAL VIP</span>
            </a>
          </div>

          <div className={styles.proPriceCard}>
            <h3 style={{ color: "#fff" }}>Anual Elite</h3>
            <p style={{ color: "#94a3b8" }}>Para quem quer manter o corpo forte e definido o ano inteiro no melhor valor.</p>
            <div className={styles.proPriceValue}>
              <strong style={{ color: "#fff" }}>R$ 110</strong><small>/mês</small>
            </div>
            <ul className={styles.proPriceFeatures}>
              <li><GreenCheck /> Todos os benefícios do Semestral VIP</li>
              <li><GreenCheck /> Planejamento para férias e viagens</li>
              <li><GreenCheck /> Suporte 7 dias por semana</li>
            </ul>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa}>
              <span>CONTRATAR ANUAL ELITE</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <footer className={styles.proFooterCta} style={{ background: "#050a08", color: "#fff" }}>
        <div className={styles.proFooterCtaBox}>
          <small style={{ color: "#10b981", fontWeight: 900, letterSpacing: "0.14em" }}>COMECE A TREINAR CERTO HOJE</small>
          <h2>Chega de Adiar Sua Transformação</h2>
          <p style={{ color: "#94a3b8" }}>Envie uma mensagem e receba sua anamnese para receber seu treino personalizado no app em até 24 horas.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.proBtnWa} style={{ maxWidth: 360 }}>
            <span>INICIAR CONSULTORIA NO WHATSAPP</span>
            <ArrowVector />
          </a>
        </div>
      </footer>
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

export function SectorShowcasePage({ type, sector }: { type?: SectorShowcaseType; sector?: SectorShowcaseType }) {
  const t = type || sector;
  if (t === "cars") return <MotoraPage />;
  if (t === "fashion") return <VerticePage />;
  if (t === "realestate" || t === "realtor") return <CoraPage />;
  if (t === "tapecar") return <TapeCarShowcase />;
  if (t === "dentistry") return <DentistryShowcase />;
  if (t === "law") return <LawShowcase />;
  if (t === "salon") return <SalonShowcase />;
  if (t === "solar") return <SolarShowcase />;
  return <AutonomousShowcase />;
}
