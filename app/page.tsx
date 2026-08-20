import { EcosystemOrb } from "./EcosystemOrb";

const instagramUrl = "https://www.instagram.com/avancinios/";
const email = "ivoavancini@hotmail.com";
const contactUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20descobrir%20qual%20frente%20faz%20mais%20sentido%20para%20minha%20empresa.";

const syncSite = process.env.NEXT_PUBLIC_AVANCINI_SYNC_URL;
const brainSite = process.env.NEXT_PUBLIC_AVANCINI_BRAIN_URL;

const fronts = [
  {
    key: "W",
    name: "AVANCINI WEB",
    area: "PRESENÇA DIGITAL",
    statement: "Para ser encontrado, compreendido e escolhido.",
    description:
      "Sites e páginas comerciais que apresentam sua empresa com clareza, elevam a percepção de valor e conduzem visitantes para a próxima ação.",
    services: ["Sites institucionais", "Landing pages", "Experiências digitais"],
    href: "https://avanciniweb.vercel.app",
    cta: "Visitar o site da Web",
    className: "front-web",
  },
  {
    key: "S",
    name: "AVANCINI SYNC",
    area: "SISTEMAS & OPERAÇÃO",
    statement: "Para organizar clientes, conversas e processos.",
    description:
      "Sistemas, CRM e chatbots que reúnem informações e rotinas para sua equipe trabalhar com mais clareza e menos improviso.",
    services: ["Sistemas sob medida", "CRM", "Chatbots e integrações"],
    href:
      syncSite ||
      `https://wa.me/5573981019782?text=${encodeURIComponent("Olá, Ivo! Quero conhecer a Avancini Sync e organizar a operação da minha empresa.")}`,
    cta: syncSite ? "Visitar o site da Sync" : "Conversar sobre Sync",
    className: "front-sync",
  },
  {
    key: "B",
    name: "AVANCINI BRAIN",
    area: "AUTOMAÇÃO & IA",
    statement: "Para automatizar o repetitivo e ampliar sua capacidade.",
    description:
      "Inteligência artificial e automações para Instagram, WhatsApp, e-mail e fluxos que não deveriam depender de trabalho manual constante.",
    services: ["Automação com IA", "Instagram e WhatsApp", "E-mail e fluxos multicanal"],
    href:
      brainSite ||
      `https://wa.me/5573981019782?text=${encodeURIComponent("Olá, Ivo! Quero conhecer a Avancini Brain e automatizar processos da minha empresa.")}`,
    cta: brainSite ? "Visitar o site da Brain" : "Conversar sobre Brain",
    className: "front-brain",
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
      <span className="symbol-dot symbol-dot-brain" />
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
          <a href="#radar">Radar WSB</a>
          <a href="#frentes">As frentes</a>
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
          <p className="eyebrow"><span /> AVANCINI OS / MATRIZ DE TECNOLOGIA</p>
          <h1>
            Seu negócio não precisa de tudo.
            <em>Precisa da tecnologia certa.</em>
          </h1>
          <p className="hero-description">
            A Avancini OS encontra o ponto que está limitando sua empresa e direciona
            para Web, Sync ou Brain — separadamente ou em conjunto, quando fizer sentido.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#radar">Descobrir minha frente <span>↓</span></a>
            <a className="button button-ghost" href={contactUrl} target="_blank" rel="noreferrer">
              Falar com a Avancini OS <span>↗</span>
            </a>
          </div>
          <p className="hero-proof"><i /> Sem pacote obrigatório. Comece pelo que mais precisa agora.</p>
        </div>

        <div className="identity-stage" role="img" aria-label="Símbolo Avancini OS conectado às três frentes Web, Sync e Brain">
          <div className="stage-ring stage-ring-one" aria-hidden="true" />
          <div className="stage-ring stage-ring-two" aria-hidden="true" />
          <div className="stage-axis" aria-hidden="true" />
          <span className="stage-label stage-web"><i /> WEB <small>APARECER</small></span>
          <span className="stage-label stage-sync"><i /> SYNC <small>ORGANIZAR</small></span>
          <span className="stage-label stage-brain"><i /> BRAIN <small>AUTOMATIZAR</small></span>
          <BrandMark large />
          <div className="stage-caption">
            <span>UMA MARCA</span>
            <b>TRÊS CAMINHOS PARA AVANÇAR</b>
          </div>
        </div>

        <div className="hero-footer">
          <span>WEB · SYNC · BRAIN</span>
          <a href="#ponto-de-partida">ENTENDA O SEU PONTO DE PARTIDA ↓</a>
        </div>
      </section>

      <section className="starting-point" id="ponto-de-partida">
        <div className="section-intro">
          <p className="eyebrow dark"><span /> O PONTO DE PARTIDA</p>
          <h2>O gargalo muda.<br />A direção também.</h2>
          <p>
            Uma empresa pode ter um bom site e ainda perder clientes na operação.
            Pode estar organizada e desperdiçar horas em tarefas repetitivas.
            A recomendação começa pelo problema — nunca pelo pacote.
          </p>
        </div>

        <div className="problem-grid">
          <a className="problem-card problem-web" href="#radar">
            <span>01 / APARECER</span>
            <h3>Sua marca existe, mas ainda não transmite o valor que entrega.</h3>
            <p>O caminho começa pela Avancini Web.</p>
            <i>→</i>
          </a>
          <a className="problem-card problem-sync" href="#radar">
            <span>02 / ORGANIZAR</span>
            <h3>Clientes, mensagens e processos estão espalhados demais.</h3>
            <p>O caminho começa pela Avancini Sync.</p>
            <i>→</i>
          </a>
          <a className="problem-card problem-brain" href="#radar">
            <span>03 / AUTOMATIZAR</span>
            <h3>Sua equipe repete tarefas que a tecnologia poderia executar.</h3>
            <p>O caminho começa pela Avancini Brain.</p>
            <i>→</i>
          </a>
        </div>
      </section>

      <section className="radar-section" id="radar">
        <div className="radar-heading">
          <p className="eyebrow"><span /> DIAGNÓSTICO DIRETO</p>
          <h2>Radar WSB</h2>
          <p>
            Três escolhas claras. Uma recomendação imediata. Sem exigir que sua empresa
            contrate o que não precisa.
          </p>
        </div>
        <EcosystemOrb />
      </section>

      <section className="fronts-section" id="frentes">
        <div className="section-intro fronts-intro">
          <p className="eyebrow dark"><span /> UMA MARCA. TRÊS CAMINHOS.</p>
          <h2>Especialistas quando separados.<br />Conectáveis quando necessário.</h2>
          <p>
            Cada frente tem identidade, entrega e objetivo próprios. A Avancini OS mantém
            tudo no mesmo nível e conecta as partes somente quando isso melhora o resultado.
          </p>
        </div>

        <div className="front-grid">
          {fronts.map((front) => (
            <article className={`front-card ${front.className}`} data-key={front.key} key={front.name}>
              <div className="front-topline">
                <span className="front-key">{front.key}</span>
                <span>FRENTE INDEPENDENTE</span>
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

      <section className="choice-manifesto">
        <div className="choice-mark"><BrandMark large /></div>
        <div className="choice-copy">
          <p className="eyebrow"><span /> DO SEU JEITO. NO SEU MOMENTO.</p>
          <h2>Você não contrata um ecossistema inteiro.</h2>
          <p>
            Você começa pelo avanço que faz sentido agora. Se amanhã surgir um novo
            desafio, outra frente pode entrar sem apagar o que já foi construído.
          </p>
        </div>
        <div className="choice-options">
          <div><b>1</b><span>Uma frente para resolver o problema atual.</span></div>
          <div><b>2</b><span>Duas frentes quando os desafios se conectam.</span></div>
          <div><b>3</b><span>As três somente quando a operação realmente pede.</span></div>
        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="process-heading">
          <p className="eyebrow dark"><span /> COMO FUNCIONA</p>
          <h2>Da dúvida à direção certa.</h2>
          <p>O primeiro passo é simples e não exige que você entenda de tecnologia.</p>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>Você conta o que está travando</h3>
            <p>Presença digital, atendimento, organização ou tarefas repetitivas.</p>
          </article>
          <article>
            <span>02</span>
            <h3>A Avancini OS identifica a frente</h3>
            <p>Você recebe uma direção clara: Web, Sync, Brain ou uma combinação necessária.</p>
          </article>
          <article>
            <span>03</span>
            <h3>O especialista entra em ação</h3>
            <p>O projeto segue dentro da frente certa, com objetivo e entrega bem definidos.</p>
          </article>
        </div>
        <a className="process-cta" href={contactUrl} target="_blank" rel="noreferrer">
          Quero descobrir meu próximo passo <span>↗</span>
        </a>
      </section>

      <section className="faq-section">
        <div className="faq-heading">
          <p className="eyebrow"><span /> SEM LETRAS MIÚDAS</p>
          <h2>Perguntas diretas.<br />Respostas também.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Preciso contratar Web, Sync e Brain juntas?<span>+</span></summary>
            <p>Não. Cada frente funciona de forma independente. A combinação só é indicada quando mais de um desafio realmente precisa ser resolvido.</p>
          </details>
          <details>
            <summary>Como saber qual frente é a certa?<span>+</span></summary>
            <p>Use o Radar WSB ou conte seu desafio diretamente. A Avancini OS identifica se a prioridade está em presença digital, operação ou automação.</p>
          </details>
          <details>
            <summary>Posso começar por uma e conectar outra depois?<span>+</span></summary>
            <p>Sim. Essa é uma das principais vantagens da estrutura: começar pelo necessário agora e ampliar quando a empresa estiver pronta.</p>
          </details>
          <details>
            <summary>A Avancini OS atende empresas de qualquer lugar?<span>+</span></summary>
            <p>Sim. O atendimento e o desenvolvimento dos projetos podem acontecer de forma online para empresas de todo o Brasil.</p>
          </details>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-mark" aria-hidden="true"><BrandMark large /></div>
        <p className="eyebrow"><span /> PRÓXIMO MOVIMENTO</p>
        <h2>Qual parte da sua empresa precisa avançar agora?</h2>
        <p>
          Conte o desafio. A Avancini OS direciona você para a frente certa,
          sem empurrar tecnologia que não faz sentido.
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
        <p>TECNOLOGIA CERTA PARA O PRÓXIMO PASSO.</p>
        <div className="footer-links">
          <a href="https://avanciniweb.vercel.app" target="_blank" rel="noreferrer">WEB ↗</a>
          <a href="#frentes">SYNC</a>
          <a href="#frentes">BRAIN</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
        </div>
        <small>© 2026 AVANCINI OS. TODOS OS DIREITOS RESERVADOS.</small>
      </footer>
    </main>
  );
}
