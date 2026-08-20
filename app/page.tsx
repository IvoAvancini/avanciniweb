import { BrandMark } from "./BrandMark";
import { MotionLayer } from "./MotionLayer";

const webUrl = "https://avanciniweb.vercel.app";
const instagramUrl = "https://www.instagram.com/avancinios/";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20conhecer%20uma%20das%20especializa%C3%A7%C3%B5es.";

export default function Home() {
  return (
    <main className="os-shell">
      <MotionLayer />

      <header className="os-topbar">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI OS</b>
            <small>TECNOLOGIA COM IDENTIDADE</small>
          </span>
        </a>

        <nav aria-label="Contato">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="os-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Falar conosco</a>
        </nav>
      </header>

      <section className="os-stage" id="inicio">
        <div className="os-intro" data-reveal>
          <div>
            <p className="eyebrow"><span /> AVANCINI OS / WEB + SYNC</p>
            <h1>Sua empresa não precisa de mais tecnologia. <em>Precisa da tecnologia certa.</em></h1>
          </div>
          <p>
            Duas especializações independentes. Escolha pela necessidade de agora
            e conheça cada experiência no lugar certo.
          </p>
        </div>

        <div className="os-options" data-reveal data-delay="1">
          <a className="os-option os-option-web" href={webUrl} target="_blank" rel="noreferrer" aria-label="Conhecer a Avancini Web">
            <div className="os-option-top"><span>01</span><b>AVANCINI WEB</b></div>
            <div className="os-web-preview" aria-hidden="true">
              <div className="os-browser-bar"><i /><i /><i /><small>AVANCINI WEB</small></div>
              <strong>Uma presença impossível<br />de ignorar.</strong>
              <span>MARCA · PRESENÇA · CONVERSÃO</span>
            </div>
            <div className="os-option-copy">
              <small>SITES & PRESENÇA DIGITAL</small>
              <h2>Seja encontrado.<br />Passe confiança.<br />Seja escolhido.</h2>
              <span className="os-more">Conhecer a especialização</span>
            </div>
          </a>

          <a className="os-option os-option-sync" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conhecer a Avancini Sync">
            <div className="os-option-top"><span>02</span><b>AVANCINI SYNC</b></div>
            <div className="os-sync-preview" aria-hidden="true">
              <div className="os-ai-status"><i /> IA EM ATENDIMENTO</div>
              <p><small>CLIENTE · AGORA</small>Olá! Gostaria de conhecer os serviços.</p>
              <p><small>AVANCINI SYNC · 1S</small>Claro. Vou ajudar você a encontrar a melhor opção.</p>
            </div>
            <div className="os-option-copy">
              <small>CHATBOTS & AUTOMAÇÃO COM IA</small>
              <h2>O interesse chegou.<br />A resposta também.</h2>
              <span className="os-more">Conhecer a especialização</span>
            </div>
          </a>
        </div>
      </section>

      <footer className="os-footer">
        <span>DUAS ESPECIALIZAÇÕES. ESCOLHAS INDEPENDENTES.</span>
        <span>© 2026 AVANCINI OS</span>
      </footer>
    </main>
  );
}
