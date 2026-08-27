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

  return (
    <main className={`${styles.site} ${styles.mechanic}`}>
      <header className={styles.mechHeader}>
        <strong>TORQUE<span>LAB</span><small>OFICINA MECÂNICA ESPECIALIZADA</small></strong>
        <span>SCANNER · REVISÃO · TELEMETRIA</span>
      </header>

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
          <div className={styles.mechBadge}>✦ TELEMETRIA & TRANSPARÊNCIA RADICAL</div>
          <h2>Você acompanha o diagnóstico<br /><i>antes de autorizar 1 centavo.</i></h2>
          <p>Laudo com fotos em alta resolução, leitura OBD-II com scanner de fábrica e aprovação item a item direto pelo celular.</p>

          <div className={styles.mechOSSelector}>
            <span>CONSULTAR ORDEM DE SERVIÇO ATIVA:</span>
            <div className={styles.mechOSPills}>
              {["TL-3891", "TL-4022", "TL-2950"].map((os) => (
                <button
                  key={os}
                  type="button"
                  className={selectedOS === os ? styles.osActive : ""}
                  onClick={() => { setSelectedOS(os); setReviewOpen(false); }}
                >
                  #{os}
                </button>
              ))}
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
  return (
    <main className={`${styles.site} ${styles.dentistry}`}>
      <header className={styles.dentalHeader}><strong>NEXO<span>ODONTOLOGIA</span></strong><span>AVALIAÇÃO · ESTÉTICA · IMPLANTES</span></header>
      <section className={styles.dentalHero}>
        <div className={styles.dentalHeroBackdrop}>
          <Image src="/concepts/nexo-dental.webp" alt="Atendimento odontológico acolhedor" width={1536} height={1024} sizes="100vw" quality={80} className={styles.dentalHeroImg} />
        </div>
        <div className={styles.dentalShade} />
        <div className={styles.dentalCopy}>
          <small>SEU SORRISO NÃO COMEÇA NO PROCEDIMENTO</small>
          <h2>Começa em entender<br /><i>o que faz sentido para você.</i></h2>
          <p>Diagnóstico cuidadoso, possibilidades explicadas com clareza e um plano construído no seu ritmo.</p>
          <StaticAction>CONHECER A JORNADA</StaticAction>
        </div>
      </section>
    </main>
  );
}

const lawAreas = {
  contratos: { label: "Contratos", ref: "ML · 0247", risk: "Cláusula de reajuste ambígua", decision: "Revisar antes da assinatura", deliverable: "Parecer + minuta comentada", urgency: "48h", level: "Atenção alta", score: 76, exposure: "Margem e previsibilidade", status: "Revisão preventiva" },
  societario: { label: "Societário", ref: "ML · 0312", risk: "Entrada de um novo sócio", decision: "Definir poderes, metas e saída", deliverable: "Acordo de sócios", urgency: "5 dias", level: "Estratégico", score: 64, exposure: "Governança e controle", status: "Estruturação" },
  trabalhista: { label: "Trabalhista", ref: "ML · 0189", risk: "Mudança de política interna", decision: "Validar impacto e comunicação", deliverable: "Plano de adequação", urgency: "72h", level: "Preventivo", score: 48, exposure: "Pessoas e operação", status: "Conformidade" },
  contencioso: { label: "Contencioso", ref: "ML · 0401", risk: "Notificação recebida hoje", decision: "Preservar prazo e provas", deliverable: "Estratégia de resposta", urgency: "Hoje", level: "Prioridade crítica", score: 91, exposure: "Prazo processual", status: "Resposta imediata" },
} as const;

function LawShowcase() {
  const [area, setArea] = useState<keyof typeof lawAreas>("contratos");
  const active = lawAreas[area];
  return (
    <main className={`${styles.site} ${styles.law}`}>
      <header className={styles.lawHeader}>
        <strong>MOREIRA <i>&</i> LIMA<small>ADVOCACIA EMPRESARIAL</small></strong>
        <nav aria-label="Navegação demonstrativa"><span>EXPERTISE</span><span>VISÃO</span><span>SÓCIOS</span></nav>
        <b>CONSELHO ESTRATÉGICO</b>
      </header>
      <section className={styles.lawHero}>
        <div className={styles.lawHeroBackdrop}>
          <Image src="/concepts/moreira-law.jpg" alt="Moreira e Lima Advocacia" width={2000} height={1058} sizes="100vw" quality={80} className={styles.lawHeroImg} priority />
        </div>
        <div className={styles.lawShade} />
        <div className={styles.lawCopy}>
          <small>JURÍDICO PARA QUEM PRECISA DECIDIR</small>
          <h2>Antes da assinatura,<br /><i>existe uma escolha.</i></h2>
          <p>Transformamos contratos, conflitos e movimentos societários em cenários que a liderança consegue comparar — e decisões que consegue sustentar.</p>
          <div className={styles.lawSignals}><span>Risco traduzido</span><span>Cenários comparados</span><span>Execução documentada</span></div>
        </div>
        <aside className={styles.lawPortraitNote}><div><span>BOARD MEMO · 07/26</span><i>CONFIDENCIAL</i></div><strong>Risco não deve chegar à reunião sem tradução.</strong><dl><div><dt>DECISÕES MAPEADAS</dt><dd>18</dd></div><div><dt>PRAZO CRÍTICO</dt><dd>48h</dd></div><div><dt>STATUS</dt><dd>Em conselho</dd></div></dl><small>MOREIRA & LIMA · BUSINESS DESK</small></aside>
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
          </article>
        </div>
      </section>
      <section className={styles.lawMethod}>
        <div className={styles.lawMethodIntro}><small>CONSELHO, NÃO VOLUME</small><h3>O jurídico entra antes<br />do custo aparecer.</h3></div>
        <div className={styles.lawMethodRail}><article><span>01</span><strong>Antecipar</strong><p>Identificar a exposição enquanto ainda existe escolha.</p></article><article><span>02</span><strong>Decidir</strong><p>Comparar consequências em linguagem de negócio.</p></article><article><span>03</span><strong>Formalizar</strong><p>Converter a direção escolhida em proteção executável.</p></article><aside><small>SÍNTESE</small><b>Menos ruído.<br />Mais governo.</b></aside></div>
      </section>
    </main>
  );
}

const salonServices = {
  corte: { label: "Corte & imagem", code: "RITUAL 01", time: "75–90 min", price: "a partir de R$ 160", description: "Uma leitura de proporção, textura e rotina para o corte funcionar também fora do salão.", fit: "Mudança com segurança", finish: "Forma + movimento", care: "Guia de finalização", availability: ["09:30", "13:00", "16:40"], steps: ["Escuta e referências", "Arquitetura do corte", "Finalização ensinada"] },
  cor: { label: "Cor autoral", code: "RITUAL 02", time: "3–5 h", price: "sob avaliação", description: "Cor desenhada para pele, estilo e manutenção possível — com teste e plano antes da transformação.", fit: "Transformação planejada", finish: "Cor multidimensional", care: "Cronograma pós-cor", availability: ["08:00", "12:30", "14:00"], steps: ["Diagnóstico do fio", "Mapa de cor exclusivo", "Plano de manutenção"] },
  noiva: { label: "Experiência noiva", code: "RITUAL 03", time: "agenda exclusiva", price: "proposta personalizada", description: "Direção de beleza, prova e cronograma para que o grande dia tenha presença, coerência e nenhuma improvisação.", fit: "Imagem para um marco", finish: "Beleza completa", care: "Agenda coordenada", availability: ["CONSULTAR", "PROVA", "RESERVAR"], steps: ["Direção estética", "Prova completa", "Ritual do grande dia"] },
} as const;

function SalonShowcase() {
  const [service, setService] = useState<keyof typeof salonServices>("corte");
  const [selectedSlot, setSelectedSlot] = useState<string>(salonServices.corte.availability[0]);
  const active = salonServices[service];
  return (
    <main className={`${styles.site} ${styles.salon}`}>
      <header className={styles.salonHeader}><strong>AURÉA<small>ATELIER DE BELEZA</small></strong><nav><span>ATELIER</span><span>RITUAIS</span><span>JOURNAL</span></nav><b>RESERVAR EXPERIÊNCIA</b></header>
      <section className={styles.salonHero}>
        <Image src="/concepts/aurea-salon-v2.png" alt="Atelier de beleza Auréa" width={1536} height={1024} sizes="100vw" quality={86} className={styles.salonHeroImg} priority />
        <div className={styles.salonShade} />
        <div className={styles.salonCopy}><small>BELEZA COM TEMPO, ESCUTA E DIREÇÃO</small><h2>Você não vem<br />apenas <i>mudar.</i></h2><p>Vem descobrir uma imagem que faça sentido agora — desenhada com técnica, cuidado e intenção.</p><div><span>CURADORIA</span><i /><span>TÉCNICA</span><i /><span>RITUAL</span></div></div>
        <aside className={styles.salonEdition}><div><small>THE AURÉA EDIT</small><span>EDIÇÃO · 04</span></div><strong>Uma experiência tão pessoal quanto o resultado.</strong><figure><span /><span /><span /></figure><footer><b>CURADORIA DE IMAGEM</b><i>AGENDA ABERTA</i></footer></aside>
      </section>
      <section className={styles.salonLookbook}><header><small>ATELIER NOTES · 2026</small><strong>Três intenções.<br /><i>Nenhuma fórmula.</i></strong></header><div><article><span>01</span><b>Movimento natural</b><small>CORTE · TEXTURA</small></article><article><span>02</span><b>Luz sob medida</b><small>COR · DIMENSÃO</small></article><article><span>03</span><b>Presença memorável</b><small>NOIVA · DIREÇÃO</small></article></div></section>
      <section className={styles.salonConcierge}>
        <header><div><small>CONCIERGE AURÉA</small><h3>Escolha a intenção.<br /><i>Nós desenhamos o ritual.</i></h3></div><p>Explore as experiências e veja duração, investimento e cuidado antes de reservar.</p></header>
        <div className={styles.salonConciergeGrid}>
          <div className={styles.salonTabs} role="tablist" aria-label="Serviços do salão">
            {(Object.keys(salonServices) as Array<keyof typeof salonServices>).map((key, index) => <button type="button" role="tab" aria-selected={service === key} className={service === key ? styles.salonTabActive : ""} onClick={() => { setService(key); setSelectedSlot(salonServices[key].availability[0]); }} key={key}><small>0{index + 1}</small><span>{salonServices[key].label}</span><i>→</i></button>)}
          </div>
          <article className={styles.salonService} aria-live="polite" key={service}>
            <div className={styles.salonServiceTop}><span>{active.code}</span><small>SELEÇÃO ATUAL</small></div><h4>{active.label}</h4><p>{active.description}</p>
            <div className={styles.salonServiceSpecs}><span><small>PARA QUEM</small><b>{active.fit}</b></span><span><small>RESULTADO</small><b>{active.finish}</b></span><span><small>DEPOIS</small><b>{active.care}</b></span></div>
            <div className={styles.salonAvailability}><small>PRÓXIMAS JANELAS · QUINTA</small><div>{active.availability.map((slot) => <button type="button" aria-pressed={selectedSlot === slot} onClick={() => setSelectedSlot(slot)} key={slot}>{slot}</button>)}</div></div>
            <footer><span><small>DURAÇÃO</small><b>{active.time}</b></span><span><small>INVESTIMENTO</small><b>{active.price}</b></span><button type="button">PRÉ-ORGANIZAR VISITA <i>→</i></button></footer>
          </article>
        </div>
      </section>
      <section className={styles.salonJourney} key={`journey-${service}`}>
        <header><small>O RITUAL SELECIONADO</small><h3>Do primeiro olhar<br />ao espelho final.</h3><p>Cada etapa reduz incerteza e deixa a experiência mais leve, previsível e sua.</p></header>
        <div>{active.steps.map((step, index) => <article key={step}><span>0{index + 1}</span><small>{index === 0 ? "ANTES" : index === 1 ? "DURANTE" : "DEPOIS"}</small><strong>{step}</strong><p>{index === 0 ? "Referências, rotina e intenção entram na mesma conversa." : index === 1 ? "Técnica e direção evoluem com você acompanhando cada escolha." : "O resultado continua bonito porque o cuidado também foi planejado."}</p></article>)}</div>
      </section>
    </main>
  );
}

function AestheticsShowcase() {
  return (
    <main className={`${styles.site} ${styles.aesthetics}`}>
      <header className={styles.aestheticHeader}><strong>LUMINA<small>ESTÉTICA AVANÇADA</small></strong><span>ROSTO · CORPO · BEM-ESTAR</span></header>
      <section className={styles.aestheticHero}>
        <div className={styles.aestheticHeroBackdrop}>
          <Image src="/concepts/lumina-clinic.jpg" alt="Clínica de estética avançada Lumina" width={2500} height={3748} sizes="100vw" quality={80} className={styles.aestheticHeroImg} />
        </div>
        <div className={styles.aestheticShade} />
        <div className={styles.aestheticCopy}>
          <small>RESULTADOS NATURAIS COMEÇAM COM UMA BOA AVALIAÇÃO</small>
          <h2>Você continua sendo você.<br /><i>Só mais confiante.</i></h2>
          <p>Protocolos personalizados, expectativas honestas e acompanhamento em cada fase.</p>
          <StaticAction>CONHECER PROTOCOLOS</StaticAction>
        </div>
      </section>
    </main>
  );
}

function AutonomousShowcase() {
  return (
    <main className={`${styles.site} ${styles.autonomous}`}>
      <header className={styles.autoHeader}><strong>CAIO MOVE</strong><span>MOVIMENTO · FORÇA · CONSISTÊNCIA</span></header>
      <section className={styles.autoHero}>
        <div className={styles.autoHeroBackdrop}>
          <Image src="/concepts/caio-move.webp" alt="Profissional autônomo de atividade física" width={1536} height={1024} sizes="100vw" quality={80} className={styles.autoHeroImg} />
        </div>
        <div className={styles.autoShade} />
        <div className={styles.autoCopy}>
          <small>TREINO PARA A VIDA REAL</small>
          <h2>Seu corpo não precisa<br />de mais uma promessa.</h2>
          <p>Precisa de um método que cabe na rotina e mostra evolução de verdade.</p>
          <StaticAction light>CONHECER O MÉTODO</StaticAction>
        </div>
        <aside><b>+840</b><span>alunos acompanhados</span><strong>4.9</strong><span>avaliação média</span></aside>
      </section>
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
  return <AutonomousShowcase />;
}
