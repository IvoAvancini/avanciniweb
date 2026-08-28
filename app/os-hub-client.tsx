import { OSBrandMark } from "./os-brand-mark";
import "./os-hub.css";

const instagramUrl = "https://www.instagram.com/avancinios/";
const whatsappUrl =
  "https://wa.me/5573981019782?text=Ol%C3%A1%2C%20Ivo!%20Vim%20pela%20Avancini%20OS%20e%20quero%20entender%20qual%20solu%C3%A7%C3%A3o%20faz%20mais%20sentido%20para%20minha%20empresa.";

function Arrow() {
  return (
    <span className="oshub-arrow" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  );
}

export function OSHubClient() {
  return (
    <main className="oshub-shell" id="inicio">
      <div className="oshub-atmosphere" aria-hidden="true">
        <span className="oshub-atmosphere-red" />
        <span className="oshub-atmosphere-line" />
        <span className="oshub-atmosphere-grid" />
      </div>

      <header className="oshub-header">
        <a className="oshub-brand" href="#inicio" aria-label="Avancini OS — início">
          <OSBrandMark />
          <span>
            <b>AVANCINI OS</b>
            <small>TECNOLOGIA COM IDENTIDADE</small>
          </span>
        </a>

        <nav aria-label="Contato e redes sociais">
          <a className="oshub-nav-link" href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className="oshub-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>Falar conosco</span>
            <Arrow />
          </a>
        </nav>
      </header>

      <div className="oshub-main">
        <section className="oshub-hero" aria-labelledby="oshub-title">
          <div className="oshub-headline">
            <span>AVANCINI OS · EMPRESA DE TECNOLOGIA</span>
            <h1 id="oshub-title">
              <span>Seu cliente decide rápido.</span>
              <em className="oshub-danger">antes do clique.</em>
              <span className="oshub-response-line">
                <i>Ou</i> <em>depois da mensagem.</em>
              </span>
            </h1>
            <p>
              A Dash fortalece sua presença. A Sync fortalece seu atendimento. Duas soluções independentes para
              resolver exatamente o gargalo que hoje custa oportunidades.
            </p>
          </div>

          <div className="oshub-symbol-stage" aria-hidden="true">
            <span className="oshub-orbit oshub-orbit-one" />
            <span className="oshub-orbit oshub-orbit-two" />
            <OSBrandMark large />
            <span className="oshub-symbol-label oshub-symbol-label-dash">ANTES DO CLIQUE</span>
            <span className="oshub-symbol-label oshub-symbol-label-sync">DEPOIS DA MENSAGEM</span>
            <small>UMA EMPRESA · DUAS SOLUÇÕES</small>
          </div>
        </section>

        <section className="oshub-solutions" id="solucoes" aria-labelledby="oshub-solutions-title">
          <header className="oshub-solutions-heading">
            <div>
              <span>DIAGNÓSTICO RÁPIDO · DUAS SOLUÇÕES INDEPENDENTES</span>
              <h2 id="oshub-solutions-title">O que está custando clientes hoje?</h2>
            </div>
            <p>Entre somente pelo gargalo de agora. Cada solução funciona completa por conta própria.</p>
          </header>

          <div className="oshub-choice-grid">
            <a className="oshub-choice oshub-choice-dash" href="/dash" aria-label="Conhecer a Avancini Dash">
              <div className="oshub-choice-copy">
                <div className="oshub-choice-meta">
                  <span>01</span>
                  <small>ANTES DO CLIQUE · PRESENÇA DIGITAL</small>
                </div>
                <h2>Avancini Dash</h2>
                <strong>Para quem precisa aparecer melhor e gerar mais contatos.</strong>
                <p>
                  Sites e landing pages que apresentam seu negócio com clareza, confiança e direção comercial.
                </p>
                <span className="oshub-choice-cta">
                  Conhecer a Dash <Arrow />
                </span>
              </div>

              <div className="oshub-choice-visual oshub-dash-preview" aria-hidden="true">
                <div className="oshub-browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>suaempresa.com.br</span>
                </div>
                <div className="oshub-browser-content">
                  <small>PRESENÇA DIGITAL</small>
                  <b>Sua marca.<br />No nível certo.</b>
                  <span>Serviços claros · contato fácil</span>
                  <i />
                </div>
              </div>
            </a>

            <a className="oshub-choice oshub-choice-sync" href="/sync" aria-label="Conhecer a Avancini Sync">
              <div className="oshub-choice-copy">
                <div className="oshub-choice-meta">
                  <span>02</span>
                  <small>DEPOIS DA MENSAGEM · ATENDIMENTO COM IA</small>
                </div>
                <h2>Avancini Sync</h2>
                <strong>Para quem recebe contatos, mas perde o tempo da oportunidade.</strong>
                <p>
                  Chatbot e IA para responder, entender o interesse e conduzir cada contato ao próximo passo.
                </p>
                <span className="oshub-choice-cta">
                  Conhecer a Sync <Arrow />
                </span>
              </div>

              <div className="oshub-choice-visual oshub-sync-preview" aria-hidden="true">
                <div className="oshub-chat-head">
                  <i />
                  <span>ATENDIMENTO ATIVO</span>
                </div>
                <div className="oshub-chat-message oshub-chat-message-client">
                  Quero entender qual opção combina com minha empresa.
                </div>
                <div className="oshub-chat-message oshub-chat-message-ai">
                  Posso ajudar. Me conte o que você precisa resolver primeiro.
                </div>
                <div className="oshub-chat-route">
                  <span>Interesse entendido</span>
                  <b>→</b>
                  <span>Próximo passo</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        <footer className="oshub-footer">
          <p><strong>AVANCINI OS</strong><span> · Tecnologia para não perder oportunidades.</span></p>
          <nav aria-label="Informações institucionais">
            <a href="mailto:ivoavancini@hotmail.com">Contato</a>
            <a href="/privacidade">Privacidade</a>
            <a href="/termos">Termos</a>
          </nav>
          <small>© 2026</small>
        </footer>
      </div>
    </main>
  );
}
