import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link className="logo" href="/" aria-label="Avancini Web, página principal">
          <span className="logo-mark" aria-hidden="true"><i /></span>
          <span><span className="brand-name">AVANCINI <b>WEB</b></span><small>Uma solução Avancini OS</small></span>
        </Link>
        <Link className="legal-back" href="/"><span aria-hidden="true">←</span> Voltar para o site</Link>
      </header>
      <article className="legal-content">
        <div className="legal-intro">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <small>Última atualização: 19 de agosto de 2026</small>
        </div>
        <div className="legal-sections">
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            </section>
          ))}
        </div>
      </article>
      <footer className="legal-footer">
        <span>© 2026 Avancini OS</span>
        <nav><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link></nav>
        <a href="mailto:ivoavancini@hotmail.com">Falar sobre seus dados ou contrato ↗</a>
      </footer>
    </main>
  );
}
