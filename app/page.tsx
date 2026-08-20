import { BrandGateway } from "./BrandGateway";
import { BrandMark } from "./BrandMark";
import { MotionLayer } from "./MotionLayer";

const instagramUrl = "https://www.instagram.com/avancinios/";
const email = "ivoavancini@hotmail.com";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20entender%20qual%20especializa%C3%A7%C3%A3o%20faz%20sentido%20para%20minha%20empresa.";

export default function Home() {
  return (
    <main>
      <MotionLayer />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI OS</b>
            <small>TECNOLOGIA COM IDENTIDADE</small>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#web">Web</a>
          <a href="#sync">Sync</a>
          <a href="#manifesto">Manifesto</a>
        </nav>
        <a className="header-instagram" href={instagramUrl} target="_blank" rel="noreferrer">
          @avancinios <span>↗</span>
        </a>
      </header>

      <div className="hero-scroll-scene">
      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span /> AVANCINI OS / DUAS ESPECIALIZAÇÕES</p>
          <h1>Sua empresa não pode parecer <em>menor do que ela é.</em></h1>
          <p className="hero-description">
            Sem site, sua empresa pode não ser encontrada. Com uma presença fraca,
            pode não ser escolhida. E quando o atendimento demora, a oportunidade pode esfriar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#escolha">Conhecer as especializações <span>↓</span></a>
            <a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com a Avancini OS <span>↗</span></a>
          </div>
          <div className="independence-note"><i /><span><b>Web ou Sync.</b> Escolha uma. Conheça a outra quando quiser.</span></div>
        </div>

        <div className="hero-signal" aria-hidden="true" data-reveal data-delay="1">
          <span className="signal-ring signal-ring-one" />
          <span className="signal-ring signal-ring-two" />
          <span className="signal-line signal-line-web" />
          <span className="signal-line signal-line-sync" />
          <span className="signal-node signal-node-web">WEB</span>
          <span className="signal-node signal-node-sync">SYNC</span>
          <BrandMark large />
          <small>AVANCINI OS</small>
        </div>

        <div className="hero-bottom"><span>01 — PRESENÇA DIGITAL</span><span>02 — AUTOMAÇÃO COM IA</span></div>
      </section>
      </div>

      <section className="gateway-section" id="escolha" data-scroll-scene>
        <div className="gateway-intro" data-reveal>
          <p className="eyebrow"><span /> ESCOLHA DIRETA</p>
          <h2>Dois caminhos.<br />Nenhuma obrigação.</h2>
          <p>A Avancini OS reúne duas especializações independentes. Entre pela que resolve seu desafio agora e aprofunde a experiência no site de cada marca.</p>
        </div>
        <BrandGateway />
      </section>

      <section className="manifesto" id="manifesto" data-scroll-scene>
        <div className="manifesto-kicker" data-reveal>CHEGA DE</div>
        <div className="manifesto-copy" data-reveal data-delay="1">
          <h2>Soluções genéricas que fazem sua empresa parecer igual a todas.</h2>
          <p>Tecnologia não deveria ser apenas mais uma mensalidade, um template esquecido ou um robô que ninguém gosta de usar. Ela precisa carregar a identidade da sua empresa e resolver um problema real.</p>
        </div>
        <div className="manifesto-lines" aria-hidden="true"><span>IDENTIDADE</span><span>ESTRATÉGIA</span><span>IMPACTO</span></div>
      </section>

      <section className="specialization specialization-web" id="web" data-scroll-scene>
        <div className="specialization-number" data-reveal>01</div>
        <div className="specialization-head" data-reveal>
          <p>AVANCINI WEB</p>
          <h2>Seja encontrado.<br />Passe confiança.<br /><em>Seja escolhido.</em></h2>
        </div>
        <div className="specialization-body" data-reveal data-delay="1">
          <p className="specialization-lead">Sua empresa pode ser excelente. A presença digital precisa deixar isso claro antes mesmo da primeira conversa.</p>
          <div className="audience-grid">
            <article>
              <span>AINDA NÃO TEM SITE</span>
              <h3>Quem não é encontrado nem sempre entra na disputa.</h3>
              <p>Construa uma presença própria, profissional e pronta para apresentar seu valor todos os dias.</p>
            </article>
            <article>
              <span>JÁ TEM, MAS FICOU PARA TRÁS</span>
              <h3>Um site fraco pode diminuir a percepção sobre uma boa empresa.</h3>
              <p>Atualize sua imagem, organize sua mensagem e transforme atenção em novas oportunidades.</p>
            </article>
          </div>
          <a className="specialization-cta" href="https://avanciniweb.vercel.app" target="_blank" rel="noreferrer">Entrar no site da Avancini Web <span>↗</span></a>
        </div>
      </section>

      <section className="specialization specialization-sync" id="sync" data-scroll-scene>
        <div className="specialization-number" data-reveal>02</div>
        <div className="specialization-head" data-reveal>
          <p>AVANCINI SYNC</p>
          <h2>O interesse chegou.<br />A resposta não pode <em>ficar para depois.</em></h2>
        </div>
        <div className="specialization-body" data-reveal data-delay="1">
          <p className="specialization-lead">Chatbots e automações com IA para atender, organizar e acompanhar conversas no WhatsApp, Instagram, e-mail e outros canais.</p>
          <div className="sync-points">
            <span>Respostas mais ágeis</span><span>Atendimento que não para</span>
            <span>Menos tarefas repetitivas</span><span>Mais continuidade nas conversas</span>
          </div>
          <a className="specialization-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Conhecer a Avancini Sync <span>↗</span></a>
        </div>
      </section>

      <section className="independent-section" data-scroll-scene>
        <div className="independent-mark" data-reveal><BrandMark large /></div>
        <div className="independent-copy" data-reveal data-delay="1">
          <p className="eyebrow"><span /> AVANCINI OS</p>
          <h2>Especialização, não venda casada.</h2>
          <p>Você não precisa contratar Web e Sync juntas. Cada marca tem seu próprio foco, sua própria entrega e seu próprio caminho. A matriz existe para apresentar as possibilidades — a decisão continua sendo sua.</p>
          <div className="independent-links">
            <a href="https://avanciniweb.vercel.app" target="_blank" rel="noreferrer">Explorar Web <span>↗</span></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">Explorar Sync <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contato" data-reveal data-scroll-scene>
        <p className="eyebrow"><span /> SUA EMPRESA, DO SEU JEITO</p>
        <h2>Qual presença sua empresa está deixando hoje?</h2>
        <p>Conte o momento do seu negócio. A conversa começa pelo que você precisa — não por um pacote pronto.</p>
        <div className="contact-actions">
          <a className="contact-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar no WhatsApp <span>↗</span></a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram @avancinios <span>↗</span></a>
          <a href={`mailto:${email}`}>{email} <span>↗</span></a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#inicio"><BrandMark /><span className="brand-copy"><b>AVANCINI OS</b><small>TECNOLOGIA COM IDENTIDADE</small></span></a>
        <p>WEB / SYNC — DUAS ESPECIALIZAÇÕES INDEPENDENTES.</p>
        <a href={instagramUrl} target="_blank" rel="noreferrer">@avancinios ↗</a>
        <small>© 2026 AVANCINI OS. TODOS OS DIREITOS RESERVADOS.</small>
      </footer>
    </main>
  );
}
