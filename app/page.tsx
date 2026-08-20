import { FlowWS } from "./FlowWS";

const instagramUrl = "https://www.instagram.com/avancinios/";
const email = "ivoavancini@hotmail.com";
const contactUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20descobrir%20se%20minha%20empresa%20precisa%20da%20Web%2C%20da%20Sync%20ou%20das%20duas.";

const syncSite = process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL;

const specializations = [
  {
    key: "W",
    name: "AVANCINI WEB",
    area: "SITES & PRESENÇA DIGITAL",
    statement: "Presença que atrai antes mesmo da primeira conversa.",
    description:
      "Sites e páginas comerciais que explicam seu valor, elevam a confiança na sua marca e conduzem o visitante para entrar em contato.",
    services: ["Sites institucionais", "Landing pages", "Experiências de conversão"],
    href: "https://avanciniweb.vercel.app",
    cta: "Visitar o site da Web",
    className: "front-web",
  },
  {
    key: "S",
    name: "AVANCINI SYNC",
    area: "ATENDIMENTO & AUTOMAÇÃO COM IA",
    statement: "Inteligência que responde enquanto o interesse está quente.",
    description:
      "Chatbots e automações que atendem, qualificam e acompanham contatos no WhatsApp, Instagram, e-mail e outros pontos da jornada.",
    services: ["Chatbots com IA", "WhatsApp e Instagram", "Acompanhamentos automáticos"],
    href:
      syncSite ||
      `https://wa.me/5573981019782?text=${encodeURIComponent("Olá, Ivo! Quero conhecer a Avancini Sync para automatizar o atendimento da minha empresa.")}`,
    cta: syncSite ? "Visitar o site da Sync" : "Conversar sobre Sync",
    className: "front-sync",
  },
] as const;

function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <span className={`os-symbol ${large ? "os-symbol-large" : ""}`} aria-hidden="true">
      <i className="symbol-leg symbol-leg-left" />
      <i className="symbol-leg symbol-leg-right" />
      <i className="symbol-cut" />
      <span className="symbol-dot symbol-dot-web" />
      <span className="symbol-dot symbol-dot-sync" />
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI</b>
            <small>OPERATING SYSTEM</small>
          </span>
        </a>

        <nav aria-label="Navegação principal">
          <a href="#fluxo-ws">Fluxo WS</a>
          <a href="#frentes">Especializações</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>

        <a className="header-instagram" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Abrir Instagram da Avancini OS">
          <span>◎</span> @avancinios <i>↗</i>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span /> AVANCINI OS / WEB + INTELIGÊNCIA</p>
          <h1>
            Sua empresa precisa ser encontrada.
            <em>E responder quando o cliente chegar.</em>
          </h1>
          <p className="hero-description">
            A Avancini Web cria a presença que atrai. A Avancini Sync usa IA para
            atender, qualificar e acompanhar. Comece por uma ou conecte as duas.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#fluxo-ws">Encontrar meu caminho <span>↓</span></a>
            <a className="button button-ghost" href={contactUrl} target="_blank" rel="noreferrer">
              Falar com a Avancini OS <span>↗</span>
            </a>
          </div>
          <p className="hero-proof"><i /> Duas especializações. Uma direção. Nenhum pacote obrigatório.</p>
        </div>

        <div className="identity-stage identity-stage-ws" role="img" aria-label="Símbolo Avancini OS conectado às especializações Web e Sync">
          <div className="stage-ring stage-ring-one" aria-hidden="true" />
          <div className="stage-ring stage-ring-two" aria-hidden="true" />
          <div className="stage-axis" aria-hidden="true" />
          <span className="stage-label stage-web"><i /> WEB <small>ATRAIR</small></span>
          <span className="stage-label stage-sync"><i /> SYNC <small>ATENDER</small></span>
          <BrandMark large />
          <div className="stage-caption">
            <span>FLUXO WS</span>
            <b>WEB PARA ATRAIR. SYNC PARA ATENDER.</b>
          </div>
        </div>

        <div className="hero-footer">
          <span>WEB · SYNC</span>
          <a href="#momentos">DESCUBRA ONDE ESTÁ A OPORTUNIDADE ↓</a>
        </div>
      </section>

      <section className="starting-point" id="momentos">
        <div className="section-intro">
          <p className="eyebrow dark"><span /> DOIS MOMENTOS DECISIVOS</p>
          <h2>Antes do contato.<br />Depois do clique.</h2>
          <p>
            Você pode perder uma oportunidade porque sua presença não convenceu.
            Ou porque ninguém respondeu no momento em que o interesse apareceu.
            É exatamente nesses dois pontos que a Avancini atua.
          </p>
        </div>

        <div className="problem-grid problem-grid-ws">
          <a className="problem-card problem-web" href="#fluxo-ws">
            <span>W / ANTES DO CONTATO</span>
            <h3>Sua marca precisa transmitir confiança antes de pedir uma conversa.</h3>
            <p>Avancini Web — presença, clareza e conversão.</p>
            <i>→</i>
          </a>
          <a className="problem-card problem-sync" href="#fluxo-ws">
            <span>S / DEPOIS DO CLIQUE</span>
            <h3>Seu atendimento precisa responder antes que o interesse esfrie.</h3>
            <p>Avancini Sync — atendimento e automação com IA.</p>
            <i>→</i>
          </a>
        </div>
      </section>

      <section className="radar-section" id="fluxo-ws">
        <div className="radar-heading">
          <p className="eyebrow"><span /> DIRECIONAMENTO DIRETO</p>
          <h2>Fluxo WS</h2>
          <p>
            Descubra se o próximo avanço está em atrair melhor, atender melhor
            ou conectar os dois momentos.
          </p>
        </div>
        <FlowWS />
      </section>

      <section className="fronts-section" id="frentes">
        <div className="section-intro fronts-intro">
          <p className="eyebrow dark"><span /> DUAS ESPECIALIZAÇÕES</p>
          <h2>Foco para vender melhor.<br />Conexão para ir mais longe.</h2>
          <p>
            Cada marca resolve um momento específico da jornada do cliente.
            Elas funcionam separadas e se conectam quando isso aumenta a oportunidade.
          </p>
        </div>

        <div className="front-grid front-grid-ws">
          {specializations.map((front) => (
            <article className={`front-card ${front.className}`} data-key={front.key} key={front.name}>
              <div className="front-topline">
                <span className="front-key">{front.key}</span>
                <span>ESPECIALIZAÇÃO AVANCINI</span>
              </div>
              <p className="front-area">{front.area}</p>
              <h3>{front.name}</h3>
              <h4>{front.statement}</h4>
              <p className="front-description">{front.description}</p>
              <ul>
                {front.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
              <a href={front.href} target="_blank" rel="noreferrer">
                {front.cta} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="choice-manifesto choice-manifesto-ws">
        <div className="choice-mark"><BrandMark large /></div>
        <div className="choice-copy">
          <p className="eyebrow"><span /> ESCOLHA SIMPLES</p>
          <h2>Uma especialização agora. A outra quando fizer sentido.</h2>
          <p>
            Você não precisa comprar uma estrutura inteira. Pode começar pela Web,
            começar pela Sync ou conectar as duas quando o desafio estiver nos dois lados.
          </p>
        </div>
        <div className="choice-options">
          <div><b>W</b><span>Preciso atrair, posicionar e gerar mais contatos.</span></div>
          <div><b>S</b><span>Preciso atender, qualificar e acompanhar automaticamente.</span></div>
          <div><b>WS</b><span>Preciso melhorar a chegada e a resposta ao mesmo tempo.</span></div>
        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="process-heading">
          <p className="eyebrow dark"><span /> COMO FUNCIONA</p>
          <h2>Do problema à especialização certa.</h2>
          <p>Você não precisa saber o nome da solução. Basta explicar o que está acontecendo.</p>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>Você conta onde a oportunidade escapa</h3>
            <p>Antes do contato, durante o atendimento ou nos dois momentos.</p>
          </article>
          <article>
            <span>02</span>
            <h3>A Avancini OS indica o caminho</h3>
            <p>Web, Sync ou uma conexão objetiva entre as duas especializações.</p>
          </article>
          <article>
            <span>03</span>
            <h3>O projeto começa com foco</h3>
            <p>Uma entrega clara para resolver o problema que realmente importa agora.</p>
          </article>
        </div>
        <a className="process-cta" href={contactUrl} target="_blank" rel="noreferrer">
          Quero descobrir meu próximo passo <span>↗</span>
        </a>
      </section>

      <section className="faq-section">
        <div className="faq-heading">
          <p className="eyebrow"><span /> SEM COMPLICAÇÃO</p>
          <h2>Perguntas diretas.<br />Respostas também.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Preciso contratar Web e Sync juntas?<span>+</span></summary>
            <p>Não. Você pode contratar somente a especialização que resolve o problema atual. A conexão entre as duas é uma possibilidade, não uma obrigação.</p>
          </details>
          <details>
            <summary>A Sync é apenas um chatbot?<span>+</span></summary>
            <p>Não. Ela combina atendimento com IA e automações para responder, qualificar e acompanhar contatos em diferentes canais.</p>
          </details>
          <details>
            <summary>Já tenho um site. Posso contratar somente a Sync?<span>+</span></summary>
            <p>Sim. A Sync pode atuar sobre a presença que sua empresa já possui. Da mesma forma, a Web pode ser contratada sem automação.</p>
          </details>
          <details>
            <summary>Como saber por onde começar?<span>+</span></summary>
            <p>Conte onde você sente que está perdendo oportunidades. A Avancini OS identifica o caminho mais coerente antes de apresentar qualquer proposta.</p>
          </details>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-mark" aria-hidden="true"><BrandMark large /></div>
        <p className="eyebrow"><span /> PRÓXIMO MOVIMENTO</p>
        <h2>Você está perdendo antes ou depois do clique?</h2>
        <p>
          Conte o que acontece hoje. A Avancini OS mostra se o próximo passo
          está na Web, na Sync ou na conexão entre as duas.
        </p>
        <div className="contact-actions">
          <a className="contact-primary" href={contactUrl} target="_blank" rel="noreferrer">
            Conversar com a Avancini OS <span>↗</span>
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram @avancinios <span>↗</span>
          </a>
          <a href={`mailto:${email}`}>
            {email} <span>↗</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI</b>
            <small>OPERATING SYSTEM</small>
          </span>
        </a>
        <p>WEB PARA ATRAIR. SYNC PARA ATENDER.</p>
        <div className="footer-links">
          <a href="https://avanciniweb.vercel.app" target="_blank" rel="noreferrer">WEB ↗</a>
          <a href="#frentes">SYNC</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
        </div>
        <small>© 2026 AVANCINI OS. TODOS OS DIREITOS RESERVADOS.</small>
      </footer>
    </main>
  );
}
