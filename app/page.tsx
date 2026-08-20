import { BrandMark } from "./BrandMark";
import { MotionLayer } from "./MotionLayer";

const webUrl = "http://localhost:3001/web";
const syncUrl = "http://localhost:3001/sync";
const instagramUrl = "https://www.instagram.com/avancinios/";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pelo%20site%20da%20Avancini%20OS%20e%20quero%20conhecer%20uma%20das%20especializa%C3%A7%C3%B5es.";

export default function Home() {
  return (
    <main className="showcase-shell">
      <MotionLayer />

      <header className="showcase-header">
        <a className="brand" href="#inicio" aria-label="Avancini OS — início">
          <BrandMark />
          <span className="brand-copy">
            <b>AVANCINI OS</b>
            <small>TECNOLOGIA COM IDENTIDADE</small>
          </span>
        </a>

        <nav aria-label="Contato">
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="showcase-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Falar conosco</a>
        </nav>
      </header>

      <section className="showcase-main" id="inicio">
        <div className="showcase-intro" data-reveal>
          <div className="showcase-title">
            <span>AVANCINI OS</span>
            <h1>Sua empresa já tem identidade<br /><em>A tecnologia precisa estar à altura</em></h1>
          </div>

          <div className="showcase-statement">
            <BrandMark />
            <p>A Avancini OS cria presença digital e automação com IA sob medida para empresas que recusam o genérico</p>
          </div>
        </div>

        <div className="showcase-choice" data-reveal data-delay="1">
          <div className="choice-heading">
            <span>ESCOLHA ONDE AVANÇAR</span>
            <i />
          </div>

          <div className="showcase-cards">
            <a className="showcase-card showcase-web" href={webUrl} target="_blank" rel="noreferrer" aria-label="Abrir Avancini Web">
              <iframe src={webUrl} title="Prévia da Avancini Web" tabIndex={-1} aria-hidden="true" />
              <div className="card-shade" />
              <div className="showcase-card-copy">
                <small>PRESENÇA DIGITAL</small>
                <h2>Avancini Web</h2>
                <span>Abrir experiência</span>
              </div>
            </a>

            <a className="showcase-card showcase-sync" href={syncUrl} target="_blank" rel="noreferrer" aria-label="Abrir Avancini Sync">
              <iframe src={syncUrl} title="Prévia da Avancini Sync" tabIndex={-1} aria-hidden="true" />
              <div className="card-shade" />
              <div className="showcase-card-copy">
                <small>AUTOMAÇÃO & IA</small>
                <h2>Avancini Sync</h2>
                <span>Abrir experiência</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
