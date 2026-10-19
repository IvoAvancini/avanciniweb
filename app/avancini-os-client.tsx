"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { AvanciniMark } from "./avancini-mark";
import { DirectionIcon } from "./direction-icon";
import { projects } from "./project-data";
import { solutions, type SolutionSlug } from "./solutions-data";

const whatsappUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
  "Olá! Conheci a Avancini OS pelo site e gostaria de conversar sobre meu projeto."
)}`;

const menuItems = [
  ["Início", "#inicio", "O que conecta todo o trabalho"],
  ["Soluções", "#vertentes", "Seis frentes, uma mesma direção"],
  ["Integração", "#sistema", "Como as frentes trabalham juntas"],
  ["Projetos", "#projetos", "Trabalhos e experiências autorais"],
  ["Método", "#metodo", "Como um projeto avança"],
  ["Dúvidas", "#duvidas", "Respostas antes de começar"],
] as const;

const solutionCopy: Record<SolutionSlug, { lead: string; outcome: string; fit: string }> = {
  identidade: {
    lead: "Estratégia, identidade visual e linguagem para a empresa ser reconhecida com consistência.",
    outcome: "Marca clara em todos os pontos de contato",
    fit: "a empresa parece diferente em cada canal",
  },
  sites: {
    lead: "Sites institucionais e landing pages que explicam o negócio e conduzem a próxima ação.",
    outcome: "Presença digital clara e fácil de entender",
    fit: "as pessoas chegam, mas não entendem por que escolher você",
  },
  ecommerce: {
    lead: "Lojas e catálogos com produto, pagamento, logística e atendimento organizados na mesma jornada.",
    outcome: "Compra simples para o cliente e para a equipe",
    fit: "o catálogo e a compra ainda dependem de conversa manual",
  },
  "agentes-ia": {
    lead: "Agentes conectados ao conteúdo da empresa para atender, qualificar e encaminhar com supervisão humana.",
    outcome: "Atendimento mais ágil sem perder contexto",
    fit: "o atendimento trava quando a equipe está ocupada",
  },
  "crm-automacao": {
    lead: "Histórico, responsáveis e próximos passos reunidos para nenhuma conversa depender da memória da equipe.",
    outcome: "Relacionamento comercial organizado",
    fit: "contatos e próximos passos ficam espalhados",
  },
  sistemas: {
    lead: "Portais e ferramentas construídos ao redor de processos que não cabem em uma solução pronta.",
    outcome: "Operação com menos retrabalho manual",
    fit: "o processo real não cabe nas ferramentas prontas",
  },
};

const solutionVisuals: Record<SolutionSlug, string | null> = {
  ecommerce: "/images/solutions/ecommerce.jpg",
  sites: "/projects/san-diego-full.png",
  identidade: "/images/solutions/identidade.jpg",
  "agentes-ia": null,
  "crm-automacao": null,
  sistemas: null,
};

const integrationSteps = [
  {
    id: "entrada",
    title: "A pessoa encontra a empresa",
    text: "Identidade e site tornam a proposta compreensível e abrem um caminho claro para contato ou compra.",
    links: ["Identidade", "Sites", "E-commerce"],
  },
  {
    id: "conversa",
    title: "A conversa ganha contexto",
    text: "WhatsApp, agente de IA e CRM registram a necessidade, organizam o atendimento e mostram o próximo passo.",
    links: ["Agente de IA", "WhatsApp", "CRM"],
  },
  {
    id: "operacao",
    title: "A rotina continua por dentro",
    text: "Integrações e sistemas levam os dados para a equipe certa, sem copiar informações de uma ferramenta para outra.",
    links: ["Integrações", "Sistemas", "Operação"],
  },
] as const;

const method = [
  {
    title: "Entender antes de desenhar",
    text: "Começamos pelo problema, pelas pessoas envolvidas e pelo que precisa melhorar na prática.",
  },
  {
    title: "Organizar a direção",
    text: "Escopo, conteúdo, fluxos e prioridades ficam visíveis antes de a interface ganhar forma.",
  },
  {
    title: "Construir junto",
    text: "Você acompanha versões reais, testa o que foi feito e valida cada decisão importante.",
  },
  {
    title: "Publicar e evoluir",
    text: "O projeto entra no ar preparado para manutenção, aprendizado e novas etapas quando fizer sentido.",
  },
] as const;

const faqs = [
  [
    "Preciso chegar com textos e imagens prontos?",
    "Não. Organizamos o material que já existe e definimos juntos o que precisa ser escrito, produzido ou ajustado.",
  ],
  [
    "Posso contratar apenas uma das frentes?",
    "Sim. Um projeto pode começar por identidade, site, automação, IA, CRM, e-commerce ou sistema. As conexões entram somente quando ajudam.",
  ],
  [
    "Vou acompanhar o projeto antes da publicação?",
    "Sim. As validações acontecem durante o trabalho, com versões navegáveis e decisões registradas.",
  ],
  [
    "O domínio, os acessos e o conteúdo ficam comigo?",
    "Sim. A proposta define os ativos, acessos e entregáveis do projeto, sempre em nome do cliente quando aplicável.",
  ],
  [
    "Quanto tempo leva para ficar pronto?",
    "Depende da frente, das integrações e do material disponível. O prazo é apresentado depois do diagnóstico, com etapas claras.",
  ],
] as const;

function moveTab<T extends string>(
  event: KeyboardEvent<HTMLButtonElement>,
  items: readonly T[],
  current: T,
  select: (value: T) => void,
  prefix: string
) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const currentIndex = items.indexOf(current);
  const nextIndex =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
  const next = items[nextIndex];
  select(next);
  requestAnimationFrame(() => document.getElementById(`${prefix}-${next}`)?.focus());
}

function Header({
  menuOpen,
  onOpenMenu,
  menuTriggerRef,
}: {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuTriggerRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className="home-header">
      <Link href="/" className="home-brand" aria-label="Avancini OS, página inicial">
        <AvanciniMark variant="os" className="home-brand-mark" />
        <span>AVANCINI <b>OS</b></span>
      </Link>
      <nav className="home-nav" aria-label="Navegação principal">
        <a href="#vertentes">Soluções</a>
        <a href="#projetos">Projetos</a>
        <a href="#sistema">Integração</a>
        <a href="#metodo">Método</a>
      </nav>
      <div className="home-header-actions">
        <a className="home-header-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
          Conversar
          <DirectionIcon />
        </a>
        <button
          ref={menuTriggerRef}
          type="button"
          className="home-menu-trigger"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          aria-controls="home-menu"
        >
          Menu
          <span aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>
  );
}

function SolutionVisual({ solution, mode }: { solution: (typeof solutions)[number]; mode: "hero" | "panel" }) {
  const asset = solutionVisuals[solution.slug];

  return (
    <div className={`home-solution-visual home-solution-visual-${mode} home-solution-visual-${solution.slug}`}>
      <div className="home-visual-browser">
        <div className="home-visual-browser-bar" aria-hidden="true">
          <span /><span /><span />
          <b>AVANCINI OS / {solution.short}</b>
        </div>
        <div className="home-visual-browser-body">
          {asset ? (
            <Image src={asset} alt="" fill sizes={mode === "hero" ? "58vw" : "42vw"} priority={mode === "hero" && solution.slug === "sites"} />
          ) : solution.slug === "agentes-ia" ? (
            <div className="home-native-agent" aria-hidden="true">
              <div className="home-native-agent-copy">
                <span>Atendimento em andamento</span>
                <p>Olá, quero entender qual solução combina com a minha empresa.</p>
                <p className="is-answer">Posso começar por três perguntas rápidas e encaminhar você com todo o contexto.</p>
                <div><i /> Contexto identificado <b>Comercial</b></div>
              </div>
              <aside>
                <strong>Próxima ação</strong>
                <span>Qualificar necessidade</span>
                <span>Registrar no CRM</span>
                <span>Encaminhar para a equipe</span>
              </aside>
            </div>
          ) : solution.slug === "crm-automacao" ? (
            <div className="home-native-crm" aria-hidden="true">
              {[
                ["Novos contatos", "Entrada"],
                ["Em conversa", "Ativo"],
                ["Próximo passo", "Ação"],
              ].map(([label, status], columnIndex) => (
                <div key={label}>
                  <header><strong>{label}</strong><span>{status}</span></header>
                  {[0, 1, 2].slice(0, columnIndex === 2 ? 2 : 3).map((item) => (
                    <article key={item}>
                      <i />
                      <b>{["Projeto institucional", "Automação comercial", "Portal interno"][item]}</b>
                      <small>{["Diagnóstico", "Proposta", "Retorno"][columnIndex]}</small>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="home-native-system" aria-hidden="true">
              <header><strong>Operação central</strong><span>Atualizado agora</span></header>
              <div className="home-native-system-grid">
                <article><span>Solicitações</span><strong>Recebidas</strong><i className="is-wide" /></article>
                <article><span>Em andamento</span><strong>Em fluxo</strong><i /></article>
                <article className="is-chart"><span>Fluxo da semana</span><div><i /><i /><i /><i /><i /><i /></div></article>
                <article><span>Equipe</span><strong>Conectada</strong><i /></article>
              </div>
            </div>
          )}
        </div>
      </div>
      {mode === "hero" ? (
        <div className="home-visual-phone" aria-hidden="true">
          <span />
          <div>
            <AvanciniMark variant="os" />
            <small>{solution.short}</small>
            <strong>{solutionCopy[solution.slug].outcome}</strong>
            <i />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Hero({ menuOpen, onOpenMenu, menuTriggerRef }: Parameters<typeof Header>[0]) {
  const slugs = solutions.map((solution) => solution.slug);
  const [activeSlug, setActiveSlug] = useState<SolutionSlug>("sites");
  const active = solutions.find((solution) => solution.slug === activeSlug) ?? solutions[0];

  return (
    <section className="home-hero" id="inicio" aria-labelledby="home-title">
      <Header menuOpen={menuOpen} onOpenMenu={onOpenMenu} menuTriggerRef={menuTriggerRef} />
      <div className="home-hero-layout">
        <div className="home-hero-copy" data-reveal>
          <h1 id="home-title">Marca, venda e operação na mesma direção</h1>
          <p>O Avancini OS reúne identidade, sites, comércio, inteligência artificial, CRM e sistemas para a empresa funcionar como uma só.</p>
          <div className="home-hero-actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="home-primary-action">
              Começar um projeto
              <DirectionIcon />
            </a>
            <a href="#vertentes" className="home-text-action">Conhecer as soluções</a>
          </div>
        </div>

        <div
          className="home-hero-showcase"
          id="hero-solution-panel"
          role="tabpanel"
          aria-live="polite"
          key={active.slug}
          data-reveal
        >
          <div className="home-hero-active-copy">
            <div>
              <strong>{active.short}</strong>
              <small>{solutionCopy[active.slug].lead}</small>
              <p className="home-hero-fit"><span>Comece por aqui se</span>{solutionCopy[active.slug].fit}</p>
            </div>
            <Link href={`/solucoes/${active.slug}`} aria-label={`Conhecer a solução ${active.short}`}>
              Conhecer esta solução
              <DirectionIcon />
            </Link>
          </div>
          <div className="home-hero-visual-stage">
            <SolutionVisual solution={active} mode="hero" />
          </div>
        </div>
      </div>
      <div className="home-signal-dock">
        <p>Escolha o ponto que precisa avançar agora</p>
        <div className="home-hero-switcher" role="tablist" aria-label="Frentes da Avancini OS">
          {solutions.map((solution) => {
            const isSelected = solution.slug === activeSlug;
            return (
              <button
                key={solution.slug}
                id={`hero-tab-${solution.slug}`}
                data-signal-key={solution.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="hero-solution-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveSlug(solution.slug)}
                onKeyDown={(event) => moveTab(event, slugs, activeSlug, setActiveSlug, "hero-tab")}
              >
                <strong>{solution.short}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const slugs = solutions.map((solution) => solution.slug);
  const [activeSlug, setActiveSlug] = useState<SolutionSlug>("ecommerce");
  const active = solutions.find((solution) => solution.slug === activeSlug) ?? solutions[0];

  return (
    <section className="home-capabilities" id="vertentes" aria-labelledby="capabilities-title" data-reveal>
      <div className="home-section-heading">
        <h2 id="capabilities-title">Uma frente para cada momento do negócio</h2>
        <p>Você pode começar por uma necessidade específica. Quando existe vantagem real, conectamos as outras partes sem empurrar um pacote fechado.</p>
      </div>
      <div className="home-capabilities-layout">
        <div className="home-capability-list" role="tablist" aria-label="Soluções da Avancini OS">
          {solutions.map((solution) => {
            const isSelected = solution.slug === activeSlug;
            return (
              <button
                key={solution.slug}
                id={`capability-tab-${solution.slug}`}
                data-capability-key={solution.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="capability-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveSlug(solution.slug)}
                onKeyDown={(event) => moveTab(event, slugs, activeSlug, setActiveSlug, "capability-tab")}
              >
                <span className="home-capability-label">
                  <strong>{solution.short}</strong>
                  <small>{solutionCopy[solution.slug].outcome}</small>
                </span>
                <DirectionIcon />
              </button>
            );
          })}
        </div>
        <article className="home-capability-panel" id="capability-panel" role="tabpanel" aria-live="polite" key={active.slug}>
          <div className="home-capability-copy">
            <h3>{active.short}</h3>
            <p>{solutionCopy[active.slug].lead}</p>
            <p className="home-capability-fit"><span>Comece por aqui se</span>{solutionCopy[active.slug].fit}</p>
            <span className="home-capability-outcome">{solutionCopy[active.slug].outcome}</span>
            <Link href={`/solucoes/${active.slug}`} className="home-inline-action">
              Ver escopo e possibilidades
              <DirectionIcon />
            </Link>
          </div>
          <div className="home-capability-image">
            <SolutionVisual solution={active} mode="panel" />
            <div className="home-capability-scope" aria-label="Entregas possíveis">
              {active.deliverables.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Integration() {
  const ids = integrationSteps.map((step) => step.id);
  const [activeId, setActiveId] = useState<(typeof ids)[number]>("entrada");
  const active = integrationSteps.find((step) => step.id === activeId) ?? integrationSteps[0];

  return (
    <section className="home-integration" id="sistema" aria-labelledby="integration-title" data-reveal>
      <div className="home-section-heading">
        <h2 id="integration-title">Sistema integrado</h2>
        <p>Seis frentes, um fluxo. Do primeiro contato à rotina interna, cada ligação existe para evitar perda de contexto.</p>
      </div>
      <div className="home-integration-map" aria-label="Mapa de integração">
        <div className="home-integration-tabs" role="tablist" aria-label="Momentos da operação">
          {integrationSteps.map((step) => {
            const isSelected = step.id === activeId;
            return (
              <button
                key={step.id}
                id={`integration-tab-${step.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="integration-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => moveTab(event, ids, activeId, setActiveId, "integration-tab")}
              >
                {step.title}
              </button>
            );
          })}
        </div>
        <article className="home-integration-panel" id="integration-panel" role="tabpanel" aria-live="polite" key={active.id}>
          <div>
            <h3>{active.title}</h3>
            <p>{active.text}</p>
          </div>
          <div className="home-flow" aria-label="Partes conectadas nesta etapa">
            {active.links.map((link, index) => (
              <span key={link}>
                <b>{link}</b>
                {index < active.links.length - 1 ? <DirectionIcon /> : null}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="home-work" id="projetos" aria-labelledby="work-title" data-reveal>
      <div className="home-section-heading">
        <h2 id="work-title">O trabalho precisa falar antes da proposta</h2>
        <p>Oito direções para negócios diferentes. Janildo está publicado, os demais são experiências autorais navegáveis criadas para mostrar profundidade, não volume.</p>
      </div>
      <div className="home-work-grid">
        {projects.map((project, index) => {
          const isPublished = project.href.startsWith("http");
          return (
            <article className={`home-work-card home-work-card-${project.tone}`} key={project.slug} data-project-key={project.slug} data-reveal>
              <Link href={project.href} target={isPublished ? "_blank" : undefined} rel={isPublished ? "noreferrer" : undefined}>
                <div className="home-work-media">
                  <Image src={project.image} alt={`Visual de ${project.name}`} fill sizes="(max-width: 720px) 100vw, 50vw" priority={index < 2} />
                  <span>{isPublished ? "Publicado" : "Conceito navegável"}</span>
                </div>
                <div className="home-work-copy">
                  <div>
                    <span>{project.segment}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <p>{project.headline}</p>
                  <span className="home-work-link">Explorar projeto <DirectionIcon /></span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Closure() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="home-method" id="metodo" aria-labelledby="method-title" data-reveal>
        <div className="home-section-heading">
          <h2 id="method-title">O projeto avança com decisões visíveis</h2>
          <p>Sem uma sequência artificial de semanas. O ritmo depende do escopo, mas o caminho continua claro.</p>
        </div>
        <div className="home-method-list">
          {method.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-faq" id="duvidas" aria-labelledby="faq-title" data-reveal>
        <div className="home-section-heading">
          <h2 id="faq-title">Antes de começar</h2>
          <p>Respostas diretas para as dúvidas que normalmente aparecem na primeira conversa.</p>
        </div>
        <div className="home-faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <article key={question} className={isOpen ? "is-open" : ""}>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}>
                  <span>{question}</span>
                  <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
                </button>
                <div id={`faq-answer-${index}`} hidden={!isOpen}><p>{answer}</p></div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="home-footer" id="contato">
        <div className="home-footer-call">
          <h2>Tem algo que precisa funcionar melhor?</h2>
          <p>Conte o contexto. A primeira conversa serve para entender qual frente faz sentido agora.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="home-primary-action">Começar um projeto<DirectionIcon /></a>
        </div>
        <div className="home-footer-info">
          <div>
            <Link href="/" className="home-brand">
              <AvanciniMark variant="os" className="home-brand-mark" />
              <span>AVANCINI <b>OS</b></span>
            </Link>
            <p>Marca, presença digital e operação no mesmo lugar.</p>
          </div>
          <nav aria-label="Soluções no rodapé">
            {solutions.map((solution) => <Link key={solution.slug} href={`/solucoes/${solution.slug}`}>{solution.short}</Link>)}
          </nav>
          <div className="home-footer-contact">
            <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
            <a href="tel:+5573981019782">(73) 98101-9782</a>
            <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div className="home-footer-legal">
          <span>© 2026 Avancini OS, CNPJ 42.487.607/0001-98</span>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
        </div>
      </footer>

      <a className="home-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Avancini no WhatsApp">
        <Image src="/whatsapp.svg" alt="" width={28} height={28} />
      </a>
    </>
  );
}

export function AvanciniOSClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      wasOpenRef.current = true;
      menuCloseRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuTriggerRef.current?.focus();
      wasOpenRef.current = false;
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const menu = document.getElementById("home-menu");
      const focusable = Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []);
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <main className="home-page">
      <a className="home-skip-link" href="#vertentes">Pular para o conteúdo</a>
      <Hero menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} menuTriggerRef={menuTriggerRef} />
      <Capabilities />
      <Integration />
      <Showcase />
      <Closure />

      <div className={`home-menu ${menuOpen ? "is-open" : ""}`} id="home-menu" role="dialog" aria-modal="true" aria-label="Navegação" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="home-menu-top">
          <Link href="/" className="home-brand" onClick={() => setMenuOpen(false)}>
            <AvanciniMark variant="os" className="home-brand-mark" />
            <span>AVANCINI <b>OS</b></span>
          </Link>
          <button ref={menuCloseRef} type="button" onClick={() => setMenuOpen(false)}>Fechar</button>
        </div>
        <nav>
          {menuItems.map(([label, href, note]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              <strong>{label}</strong>
              <span>{note}</span>
              <DirectionIcon />
            </a>
          ))}
        </nav>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="home-menu-contact">Começar um projeto<DirectionIcon /></a>
      </div>
    </main>
  );
}
