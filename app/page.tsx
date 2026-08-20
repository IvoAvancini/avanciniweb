import { BrandMark } from "./BrandMark";
import { MotionLayer } from "./MotionLayer";

const webUrl = "https://avanciniweb.vercel.app";
const instagramUrl = "https://www.instagram.com/avancinios/";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20conhecer%20uma%20das%20especializa%C3%A7%C3%B5es.";

export default function Home() {
  return (
    <main className="portal-shell">
      <MotionLayer />

      <header className="portal-header">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI OS</b>
            <small>TECNOLOGIA COM IDENTIDADE</small>
          </span>
        </a>

        <nav aria-label="Contato">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="portal-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Falar conosco</a>
        </nav>
      </header>

      <section className="portal-grid" id="inicio">
        <div className="portal-identity" data-reveal>
          <div className="portal-mark" aria-hidden="true"><BrandMark large /></div>
          <div className="portal-intro">
            <span>AVANCINI OS</span>
            <h1>Escolha onde<br /><em>avançar.</em></h1>
            <p>Web ou Sync. Só o que sua empresa precisa agora.</p>
          </div>
        </div>

        <div className="portal-paths" data-reveal data-delay="1">
          <a className="portal-path path-web" href={webUrl} target="_blank" rel="noreferrer" aria-label="Entrar na Avancini Web">
            <div className="path-copy">
              <span>01 / AVANCINI</span>
              <h2>WEB</h2>
              <p>Sites que posicionam<br />e convertem.</p>
              <b>Entrar</b>
            </div>
            <div className="path-visual web-window" aria-hidden="true">
              <div className="window-bar"><i /><i /><i /></div>
              <strong>Sua marca.<br />Outro nível.</strong>
              <span />
            </div>
          </a>

          <a className="portal-path path-sync" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conhecer a Avancini Sync">
            <div className="path-copy">
              <span>02 / AVANCINI</span>
              <h2>SYNC</h2>
              <p>IA que atende, responde<br />e automatiza.</p>
              <b>Conhecer</b>
            </div>
            <div className="path-visual sync-chat" aria-hidden="true">
              <div className="sync-live"><i /> IA ATIVA</div>
              <span>Olá! Como posso ajudar?</span>
              <span>Quero conhecer a empresa.</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
