import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AvanciniMark } from "../../avancini-mark";
import { DirectionIcon } from "../../direction-icon";
import { solutionBySlug, solutionSlugs, solutions, type SolutionSlug } from "../../solutions-data";
import { projects } from "../../project-data";
import { SolutionFaqAccordion } from "./solution-faq";
import "./solution-page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionBySlug[slug as SolutionSlug];
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.promise,
    alternates: { canonical: `/solucoes/${solution.slug}` },
    openGraph: {
      title: `${solution.title} | Avancini OS`,
      description: solution.promise,
      images: [{ url: solution.image, width: 1200, height: 675, alt: solution.title }],
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutionBySlug[slug as SolutionSlug];
  if (!solution) notFound();

  const related = solution.connections.map((item) => solutionBySlug[item]).filter(Boolean);
  const matchedProjects = projects.filter((proj) =>
    solution.relatedProjects?.includes(proj.slug)
  );

  const whatsapp = `https://wa.me/5573981019782?text=${encodeURIComponent(
    `Olá! Estava analisando a solução de ${solution.title} no site da Avancini OS e gostaria de conversar sobre um projeto para minha empresa.`
  )}`;

  return (
    <main className={`solution-page solution-${solution.slug}`}>
      {/* Header / Navegação */}
      <header className="solution-nav">
        <Link href="/" className="solution-brand" aria-label="Voltar para a página inicial da Avancini OS">
          <AvanciniMark variant="os" className="solution-brand-mark" />
          <span>AVANCINI <b>OS</b></span>
        </Link>

        <div className="solution-nav-breadcrumb" aria-label="Navegação da solução">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/#vertentes">Soluções</Link>
          <span>/</span>
          <strong>{solution.short}</strong>
        </div>

        <div className="solution-nav-actions">
          <Link href="/#vertentes" className="solution-nav-back">
            Todas as frentes
          </Link>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="solution-nav-cta">
            Falar no WhatsApp
          </a>
        </div>
      </header>

      {/* Apresentação da solução */}
      <section className="solution-hero" aria-labelledby="solution-title">
        <div className="solution-hero-content">
          <h1 id="solution-title">{solution.title}</h1>
          <p className="solution-hero-eyebrow">{solution.eyebrow}</p>
          <p className="solution-hero-lead">{solution.promise}</p>

          {/* Escopo possível, sem números ou resultados inventados */}
          <div className="solution-metrics-bar">
            {solution.metrics.map((metric) => (
              <div key={metric.label} className="solution-metric-item">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="solution-hero-actions">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="solution-primary-action">
              <span>Iniciar conversa no WhatsApp</span>
              <DirectionIcon />
            </a>
            <a href="#recursos" className="solution-secondary-action">
              <span>Conhecer recursos técnicos</span>
            </a>
          </div>
        </div>

        {/* Referência visual da frente */}
        <div className="solution-hero-visual">
          <div className="solution-mockup-card">
            <div className="solution-mockup-media">
              <Image
                src={solution.image}
                alt={`Referência visual para ${solution.title}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 60vw"
                className="solution-hero-img"
              />
              <div className="solution-mockup-reflection" aria-hidden="true" />
            </div>
          </div>
          <div className="solution-hero-glow" aria-hidden="true" />
        </div>
      </section>

      {/* Possibilidades desta frente */}
      <section className="solution-features-section" id="recursos" aria-labelledby="features-title">
        <header className="solution-section-header">
          <h2 id="features-title">O que muda<br /><em>na prática</em></h2>
          <p>
            O escopo é montado a partir do problema e das ferramentas que a empresa já usa. Estes são exemplos do que pode fazer parte do projeto.
          </p>
        </header>

        <div className="solution-bento-grid">
          {solution.features.map((feature) => (
            <article key={feature.title} className="solution-bento-card">
              <div className="bento-card-top">
                <span className="bento-card-tag">{feature.tag}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Tecnologias e integrações */}
      <section className="solution-tech-section" aria-labelledby="tech-title">
        <div className="solution-tech-container">
          <div className="solution-tech-copy">
            <h2 id="tech-title">
              Tecnologia escolhida para o contexto
            </h2>
            <p>
              Ferramentas e integrações são definidas depois do diagnóstico. A escolha considera manutenção, segurança, custo e o que a equipe realmente precisa operar.
            </p>
          </div>

          <div className="solution-tech-grid">
            {solution.techStack.map((tech) => (
              <div key={tech} className="solution-tech-item">
                <i className="tech-dot" aria-hidden="true" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Etapas de trabalho */}
      <section className="solution-timeline-section" aria-labelledby="timeline-title">
        <header className="solution-section-header">
          <h2 id="timeline-title">Como essa frente<br /><em>entra em operação</em></h2>
          <p>
            O formato e a duração variam conforme o escopo. A sequência abaixo mostra como as decisões costumam avançar.
          </p>
        </header>

        <div className="solution-timeline-track">
          {solution.operation.map((step) => (
            <article key={step.number} className="timeline-step-card">
              <div className="timeline-step-marker">
                <span>{step.number}</span>
                <i />
              </div>
              <div className="timeline-step-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Projetos relacionados */}
      {matchedProjects.length > 0 && (
        <section className="solution-projects-section" aria-labelledby="projects-title">
          <header className="solution-section-header">
            <h2 id="projects-title">
              Referências relacionadas<br />
              <em>a esta frente</em>
            </h2>
            <p>O projeto publicado e as experiências autorais aparecem identificados para deixar claro o que está sendo apresentado.</p>
          </header>

          <div className="solution-projects-grid">
            {matchedProjects.map((project) => (
              <article key={project.slug} className="solution-project-card">
                <div className="project-card-media">
                  <Image
                    src={project.image}
                    alt={`Projeto ${project.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="project-card-img"
                  />
                </div>
                <div className="project-card-content">
                  <span className="project-segment">{project.segment}</span>
                  <h3>{project.name}</h3>
                  <p>{project.headline}</p>
                  <Link href={project.href} className="project-link">
                    <span>Ver experiência</span>
                    <DirectionIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Dúvidas frequentes */}
      <section className="solution-faq-section" aria-labelledby="faq-title">
        <div className="solution-faq-layout">
          <div className="solution-faq-intro">
            <h2 id="faq-title">
              Perguntas comuns antes de começar
            </h2>
            <p>
              Prazos, propriedade, integrações e manutenção são definidos no escopo. Se alguma condição não estiver clara, fale direto conosco.
            </p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="faq-whatsapp-link">
              Tirar dúvida no WhatsApp <DirectionIcon />
            </a>
          </div>

          <SolutionFaqAccordion faqs={solution.faqs} />
        </div>
      </section>

      {/* Conexões com outras frentes */}
      <section className="solution-connections-section" aria-labelledby="connections-title">
        <div className="connections-container">
          <div className="connections-head">
            <h2 id="connections-title">
              Esta frente pode começar sozinha,<br />
              <em>mas se conecta a todas as outras</em>
            </h2>
          </div>
          <div className="connections-grid">
            {related.map((item) => (
              <Link key={item.slug} href={`/solucoes/${item.slug}`} className="connection-card">
                <span className="connection-number">{item.number}</span>
                <div className="connection-info">
                  <strong>{item.title}</strong>
                  <span>{item.eyebrow}</span>
                </div>
                <DirectionIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Próximo passo */}
      <section className="solution-cta-banner">
        <div className="solution-cta-inner">
          <h2>
            Vamos entender o que<br />
            precisa funcionar melhor?
          </h2>
          <p>
            Apresente sua necessidade ou projeto. Montamos uma proposta comercial clara com escopo detalhado, cronograma de entrega e investimento.
          </p>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="cta-whatsapp-btn">
            <span>Conversar sobre esta solução</span>
            <DirectionIcon />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="solution-footer">
        <div className="footer-left">
          <Link href="/" className="footer-brand">
            <AvanciniMark variant="os" className="footer-mark" />
            <span>AVANCINI <b>OS</b></span>
          </Link>
          <p>Marca, presença digital e operação tratadas como partes da mesma empresa.</p>
        </div>
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <span>Outras Soluções:</span>
          {solutions.map((item) => (
            <Link key={item.slug} href={`/solucoes/${item.slug}`} className={item.slug === solution.slug ? "is-current" : ""}>
              {item.short}
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}
