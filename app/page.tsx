const companies = [
  {
    number: "01",
    name: "AVANCINI WEB",
    statement: "Presença que posiciona.",
    description:
      "Sites premium, landing pages e experiências digitais criadas para transformar atenção em autoridade e novos negócios.",
    href: "#web",
    accent: "cyan",
  },
  {
    number: "02",
    name: "AVANCINI SYNC",
    statement: "Operação que conecta.",
    description:
      "Sistemas, CRM e chatbots que centralizam clientes, conversas e processos para a empresa funcionar em sintonia.",
    href: "#sync",
    accent: "blue",
  },
  {
    number: "03",
    name: "AVANCINI BRAIN",
    statement: "Inteligência que executa.",
    description:
      "Automação e IA para Instagram, WhatsApp, e-mail e fluxos que mantêm o negócio ativo em todos os canais.",
    href: "#brain",
    accent: "red",
  },
] as const;

const contactUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20conversar%20sobre%20uma%20solu%C3%A7%C3%A3o%20para%20minha%20empresa.";

const unitLinks = {
  web: process.env.NEXT_PUBLIC_AVANCINI_WEB_URL || contactUrl,
  sync: process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL || contactUrl,
  brain: process.env.NEXT_PUBLIC_AVANCINI_BRAIN_URL || contactUrl,
};

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <span className="brand-mark" aria-hidden="true" />
          <span>AVANCINI <b>OS</b></span>
        </a>

        <nav aria-label="Navegação principal">
          <a href="#ecossistema">Ecossistema</a>
          <a href="#visao">Visão</a>
          <a className="nav-cta" href="#contato">Fale conosco <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-cyan" aria-hidden="true" />
        <div className="hero-glow hero-glow-red" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span /> ECOSSISTEMA DE TECNOLOGIA</p>
          <h1>
            Construímos o digital.<br />
            Conectamos a operação.<br />
            <em>Ativamos a inteligência.</em>
          </h1>
          <p className="hero-description">
            A Avancini OS une três frentes especializadas para transformar
            tecnologia em presença, organização e crescimento real.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ecossistema">Conheça o ecossistema <span>↓</span></a>
            <a className="button button-ghost" href="#contato">Apresente seu desafio <span>↗</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Avancini OS: Web, Sync e Brain">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-core">
            <span className="core-image" aria-hidden="true" />
            <small>AVANCINI OS</small>
          </div>
          <span className="orbit-label label-web">WEB</span>
          <span className="orbit-label label-sync">SYNC</span>
          <span className="orbit-label label-brain">BRAIN</span>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>AVANCINI OS / 2026</span>
          <span>13°00&apos;S · 38°31&apos;W</span>
        </div>
      </section>

      <section className="ecosystem" id="ecossistema">
        <div className="section-heading">
          <p className="eyebrow dark"><span /> UMA MARCA. TRÊS POTÊNCIAS.</p>
          <h2>Cada frente resolve uma parte decisiva do crescimento.</h2>
          <p>Separadas, são especialistas. Juntas, formam uma operação digital completa.</p>
        </div>

        <div className="company-grid">
          {companies.map((company) => (
            <article className={`company-card ${company.accent}`} key={company.name}>
              <div className="card-top">
                <span>{company.number}</span>
                <span className="card-status">UNIDADE AVANCINI <i /></span>
              </div>
              <div className="card-symbol" aria-hidden="true">{company.name.split(" ")[1].charAt(0)}</div>
              <p className="card-name">{company.name}</p>
              <h3>{company.statement}</h3>
              <p>{company.description}</p>
              <a href={company.href} aria-label={`Conhecer ${company.name}`}>Explorar unidade <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="connection" id="visao">
        <div className="connection-copy">
          <p className="eyebrow"><span /> A ENGENHARIA DO CRESCIMENTO</p>
          <h2>Não são serviços soltos.<br />É um sistema de evolução.</h2>
          <p>
            A presença abre a porta. A operação sustenta a experiência.
            A inteligência amplia a capacidade. A Avancini OS conecta tudo em
            uma visão única, sem confundir o papel de cada especialista.
          </p>
        </div>

        <div className="flow" aria-label="Web atrai, Sync organiza e Brain automatiza">
          <div className="flow-item cyan"><span>01</span><b>WEB</b><small>ATRAI</small></div>
          <div className="flow-line"><i /></div>
          <div className="flow-item blue"><span>02</span><b>SYNC</b><small>ORGANIZA</small></div>
          <div className="flow-line"><i /></div>
          <div className="flow-item red"><span>03</span><b>BRAIN</b><small>AUTOMATIZA</small></div>
        </div>
      </section>

      <section className="unit-details" aria-label="Unidades do ecossistema">
        <article className="unit-detail" id="web">
          <div className="unit-number">01</div>
          <div className="unit-copy">
            <p className="unit-label cyan-text">AVANCINI WEB</p>
            <h2>Sua marca precisa ser percebida antes de ser escolhida.</h2>
            <p>Design, estratégia e tecnologia para criar sites que apresentam valor, geram confiança e conduzem o visitante para a próxima ação.</p>
            <div className="unit-tags"><span>Sites institucionais</span><span>Landing pages</span><span>Experiência digital</span></div>
          </div>
          <a className="unit-link cyan-bg" href={unitLinks.web} target="_blank" rel="noreferrer">Ir para Avancini Web <span>↗</span></a>
        </article>

        <article className="unit-detail" id="sync">
          <div className="unit-number">02</div>
          <div className="unit-copy">
            <p className="unit-label blue-text">AVANCINI SYNC</p>
            <h2>Quando os processos conversam, a empresa avança.</h2>
            <p>Sistemas, CRM e chatbots que concentram clientes, informações e rotinas em uma operação mais clara, rápida e conectada.</p>
            <div className="unit-tags"><span>Sistemas</span><span>CRM</span><span>Chatbots</span><span>Integrações</span></div>
          </div>
          <a className="unit-link blue-bg" href={unitLinks.sync} target="_blank" rel="noreferrer">Ir para Avancini Sync <span>↗</span></a>
        </article>

        <article className="unit-detail" id="brain">
          <div className="unit-number">03</div>
          <div className="unit-copy">
            <p className="unit-label red-text">AVANCINI BRAIN</p>
            <h2>Automação que trabalha onde seus clientes estão.</h2>
            <p>Inteligência artificial aplicada ao Instagram, WhatsApp, e-mail e fluxos multicanal para responder, acompanhar e executar tarefas continuamente.</p>
            <div className="unit-tags"><span>Inteligência artificial</span><span>Automações</span><span>WhatsApp</span><span>Instagram</span><span>E-mail</span></div>
          </div>
          <a className="unit-link red-bg" href={unitLinks.brain} target="_blank" rel="noreferrer">Ir para Avancini Brain <span>↗</span></a>
        </article>
      </section>

      <section className="manifesto">
        <div className="manifesto-mark" role="img" aria-label="Símbolo Avancini OS" />
        <div>
          <p className="eyebrow"><span /> NOSSA VISÃO</p>
          <blockquote>“Tecnologia extraordinária é aquela que torna o crescimento mais simples.”</blockquote>
          <p className="manifesto-text">A Avancini OS existe para eliminar a distância entre o que uma empresa imagina e o que ela consegue executar.</p>
        </div>
      </section>

      <section className="contact" id="contato">
        <p className="eyebrow"><span /> PRÓXIMO MOVIMENTO</p>
        <h2>Qual parte da sua empresa precisa evoluir agora?</h2>
        <p>Conte o desafio. A Avancini OS direciona você para a frente certa — Web, Sync ou Brain.</p>
        <a className="contact-button" href={contactUrl} target="_blank" rel="noreferrer">Conversar com a Avancini OS <span>↗</span></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark" aria-hidden="true" />
          <span>AVANCINI <b>OS</b></span>
        </a>
        <div className="footer-units">
          <a href="#web">WEB</a><a href="#sync">SYNC</a><a href="#brain">BRAIN</a>
        </div>
        <p>© 2026 AVANCINI OS. TODOS OS DIREITOS RESERVADOS.</p>
      </footer>
    </main>
  );
}
