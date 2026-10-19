"use client";

import { useState } from "react";
import Link from "next/link";
import { AvanciniMark } from "./avancini-mark";

const faqs = [
  [
    "Como funciona o início de um projeto com a Avancini OS?",
    "Começamos com um diagnóstico rápido pelo WhatsApp ou chamada de alinhamento. Entendemos seu modelo de negócio, objetivos e gargalos. Em seguida, apresentamos uma proposta técnica com escopo detalhado, cronograma semanal e investimento fixo, sem custos ocultos.",
  ],
  [
    "O código-fonte e o domínio ficam no nome da minha empresa?",
    "Sim, 100%. Ao final do projeto, todos os acessos, repositório de código, contas de hospedagem, domínios e arquivos originais são transferidos para a titularidade da sua empresa. Você não fica preso a mensalidades abusivas de licenciamento.",
  ],
  [
    "Qual a diferença entre um site/loja da Avancini OS e um feito em WordPress/Shopify?",
    "Construímos aplicações modernas com Next.js e código proprietário. Isso significa velocidade instantânea de carregamento (PageSpeed 95+), segurança contra invasões, checkout sem taxas intermediárias abusivas e total liberdade para criar fluxos personalizados que nenhuma plataforma pronta permite.",
  ],
  [
    "Vocês oferecem suporte e manutenção após o lançamento?",
    "Sim. Oferecemos planos de evolução contínua, acompanhamento de métricas de conversão, otimizações técnicas e inclusão de novos recursos ou módulos conforme a operação da sua empresa cresce.",
  ],
  [
    "Como funciona a integração com meu WhatsApp e ERP atual?",
    "Conectamos diretamente com a API oficial do WhatsApp Business e com os principais ERPs do mercado (Bling, Tiny, Omie, Sênior, ContaAzul). Pedidos, clientes e conversas são sincronizados automaticamente.",
  ],
  [
    "Qual o prazo médio de entrega dos projetos?",
    "Landing pages e sites institucionais levam em média de 2 a 3 semanas. Lojas virtuais completas e sistemas sob medida levam entre 4 e 6 semanas, sempre com entregas parciais para você acompanhar o progresso em tempo real.",
  ],
] as const;

const steps = [
  {
    number: "01",
    phase: "SEMANA 01",
    title: "Diagnóstico & Arquitetura",
    text: "Mapeamos público, regras de negócio, concorrentes e estruturamos a estratégia de conversão e a árvore de dados.",
  },
  {
    number: "02",
    phase: "SEMANA 02",
    title: "Design Autoral & Experiência",
    text: "Desenhamos telas exclusivas para desktop e mobile com foco em autoridade, usabilidade e redução de atritos.",
  },
  {
    number: "03",
    phase: "SEMANAS 03-04",
    title: "Engenharia & Integrações",
    text: "Codificação em Next.js 15, conexão de APIs de pagamento (Pix/cartão), transportadoras, ERP e agentes de IA.",
  },
  {
    number: "04",
    phase: "SEMANA 05",
    title: "Homologação & Go-Live",
    text: "Testes rigorosos de carga e transação real, configuração de domínio, SEO técnico e publicação em produção.",
  },
];

export function SignalClosure() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappUrl = `https://wa.me/5573981019782?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para um projeto com a Avancini OS."
  )}`;

  return (
    <>
      {/* Seção 06: Método de Entrega */}
      <section className="signal-method" id="metodo" aria-labelledby="signal-method-title">
        <div className="signal-method-lead">
          <div className="signal-method-label" data-reveal>
            <span>06</span>
            <i />
            Método de Entrega
          </div>
          <h2 id="signal-method-title" data-reveal>
            Engenharia previsível,<br />
            <em>sem surpresas no caminho</em>
          </h2>
          <p data-reveal>
            Dividimos a execução em etapas transparentes com entregas semanais verificáveis. Você valida cada avanço antes da próxima fase começar.
          </p>
        </div>

        <div className="signal-method-grid">
          {steps.map((step) => (
            <div key={step.title} className="method-step-card" data-reveal>
              <div className="step-top">
                <span className="step-num">{step.number}</span>
                <span className="step-badge">{step.phase}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 07: Dúvidas Frequentes */}
      <section className="signal-faq" id="duvidas" aria-labelledby="signal-faq-title">
        <header className="signal-faq-header">
          <div className="signal-faq-label" data-reveal>
            <span>07</span>
            <i />
            Dúvidas Frequentes
          </div>
          <h2 id="signal-faq-title" data-reveal>
            Respostas diretas para o que você<br />
            <em>precisa saber antes de contratar</em>
          </h2>
          <p data-reveal>
            Se tiver qualquer necessidade específica que não esteja listada abaixo, nossa equipe responde imediatamente no WhatsApp.
          </p>
        </header>

        <div className="signal-faq-list" data-reveal>
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            const answerId = `signal-faq-answer-${index}`;
            return (
              <article key={question} className={`faq-card ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="faq-question-btn"
                >
                  <span className="faq-num">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <span aria-hidden="true" className="faq-icon">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className="signal-faq-answer" id={answerId} aria-hidden={!isOpen}>
                  <p>{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Seção 08: Footer Premium Estilo Paulo Leme (Enclosed Card) */}
      <footer className="footer-section-wrapper" id="contato">
        <div className="footer-enclosed-card" data-reveal>
          <div className="footer-card-body">
            {/* Coluna 1: Marca & Social */}
            <div className="footer-brand-col">
              <Link href="/" className="footer-brand-link">
                <AvanciniMark variant="os" className="footer-brand-logo" />
                <div className="footer-brand-name">
                  <strong>AVANCINI</strong>
                  <span>OS</span>
                </div>
              </Link>
              <p className="footer-brand-bio">
                Sites bonitos, rápidos e feitos pra gerar vendas. Estratégia, design de alto padrão e engenharia para fazer seu negócio aparecer e operar melhor.
              </p>
              <div className="footer-social-row" aria-label="Redes sociais oficiais">
                <a href="https://www.instagram.com/avancinios/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                </a>
                <a href="mailto:ivoavancini@hotmail.com" aria-label="E-mail">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="footer-nav-col">
              <h4>NAVEGAÇÃO</h4>
              <nav aria-label="Navegação secundária">
                <a href="#inicio">Início</a>
                <a href="#projetos">Portfólio</a>
                <a href="#vertentes">Soluções</a>
                <a href="#sistema">Integração</a>
                <a href="#metodo">Método</a>
                <a href="#duvidas">Perguntas frequentes</a>
              </nav>
            </div>

            {/* Coluna 3: Serviços */}
            <div className="footer-nav-col">
              <h4>SERVIÇOS</h4>
              <nav aria-label="Serviços da agência">
                <Link href="/solucoes/sites">Desenvolvimento de Sites</Link>
                <Link href="/solucoes/sites">Landing Pages</Link>
                <Link href="/solucoes/ecommerce">Lojas Online</Link>
                <Link href="/solucoes/agentes-ia">Agentes de IA 24/7</Link>
                <Link href="/solucoes/crm-automacao">CRM & WhatsApp</Link>
                <Link href="/solucoes/sistemas">Sistemas Sob Medida</Link>
              </nav>
            </div>

            {/* Coluna 4: Contato & Botão de Orçamento Estilo Paulo Leme */}
            <div className="footer-contact-col">
              <h4>CONTATO</h4>
              <div className="footer-contact-items">
                <a href="mailto:ivoavancini@hotmail.com" className="contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>ivoavancini@hotmail.com</span>
                </a>
                <a href="tel:+5573981019782" className="contact-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>(73) 98101-9782</span>
                </a>
              </div>

              {/* Botão SOLICITAR ORÇAMENTO Estilo Paulo Leme com Badge Verde de Seta */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-orcamento-btn"
                aria-label="Solicitar Orçamento no WhatsApp"
              >
                <span>SOLICITAR ORÇAMENTO</span>
                <span className="orcamento-arrow-badge" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Barra de Rodapé com Copyright e Links Legais */}
          <div className="footer-card-bottom">
            <p className="copyright-text">
              © 2026 Avancini OS · CNPJ 42.487.607/0001-98. Todos os direitos reservados.
            </p>
            <div className="legal-links">
              <Link href="/privacidade">Política de Privacidade</Link>
              <Link href="/termos">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp com Badge de Notificação "1" (Estilo Imagem 2) */}
      <a
        className="floating-whatsapp-widget"
        href={whatsappUrl}
        aria-label="Conversar com a Avancini no WhatsApp (1 nova mensagem)"
        target="_blank"
        rel="noreferrer"
      >
        <span className="whatsapp-circle-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.59c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29" />
          </svg>
        </span>
        <span className="whatsapp-unread-badge" aria-label="1 nova mensagem">
          1
        </span>
      </a>
    </>
  );
}
