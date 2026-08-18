"use client";

import { useEffect, useState } from "react";

const whatsapp = "https://wa.me/5573981019782?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20Avancini%20OS%20e%20quero%20um%20diagn%C3%B3stico%20para%20o%20meu%20neg%C3%B3cio.";

const solutions = [
  { code: "WEB.01", title: "Sites que transformam atenção em contato", text: "Landing pages e sites desenhados para explicar seu valor rápido, reduzir dúvidas e levar o visitante até a conversa comercial.", accent: "Conversão desde a primeira tela", visual: "web" },
  { code: "AI.02", title: "IA que atende enquanto você trabalha", text: "Agentes inteligentes preparados para responder, qualificar contatos, organizar informações e manter seu atendimento funcionando.", accent: "Disponível 24 horas por dia", visual: "ai" },
  { code: "OPS.03", title: "Sistemas que colocam ordem na operação", text: "CRMs e painéis sob medida para reunir clientes, agenda, tarefas e dados importantes em um único fluxo de trabalho.", accent: "Controle sem planilhas soltas", visual: "ops" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="logo" href="#inicio" aria-label="Avancini OS, início"><span className="logo-mark">A</span><span>AVANCINI<b>OS</b><small>Business operating systems</small></span></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#solucoes" onClick={() => setMenuOpen(false)}>Soluções</a>
          <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Método</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <a className="button button-small header-cta" href={whatsapp} target="_blank" rel="noreferrer">Solicitar diagnóstico <span>↗</span></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}><span /><span /></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-copy">
          <div className="system-label"><span /> Sistemas digitais para empresas que querem avançar</div>
          <h1>Seu negócio não precisa de mais uma ferramenta.<br /><em>Precisa de um sistema.</em></h1>
          <p>Criamos sites, inteligências artificiais e operações digitais que trabalham juntas para atrair clientes, organizar sua empresa e sustentar o crescimento.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Quero evoluir minha operação <span>↗</span></a>
            <a className="button button-ghost" href="#projetos">Ver projetos reais <span>↓</span></a>
          </div>
          <div className="hero-trust"><span>Estratégia antes do código</span><span>Atendimento 100% online</span><span>Projeto sob medida</span></div>
        </div>

        <div className="os-stage" aria-label="Painel conceitual da Avancini OS">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="os-window">
            <div className="window-top"><div><i /><i /><i /></div><span>AVANCINI_OS / COMMAND_CENTER</span><b>LIVE</b></div>
            <div className="window-body">
              <aside><strong>A/OS</strong><span className="active">⌁</span><span>◇</span><span>▦</span><span>◉</span><small>v.1.0</small></aside>
              <div className="dashboard">
                <div className="dash-heading"><div><small>VISÃO GERAL</small><h3>Operação em movimento.</h3></div><span>Últimos 30 dias</span></div>
                <div className="metrics"><div><small>ATENDIMENTO</small><strong>24/7</strong><em>IA ativa</em></div><div><small>FUNIL DIGITAL</small><strong>ON</strong><em>Site conectado</em></div><div><small>GESTÃO</small><strong>01</strong><em>Painel central</em></div></div>
                <div className="dash-grid">
                  <div className="activity"><div className="card-title"><span>Fluxo de oportunidades</span><b>+ ativo</b></div><div className="chart"><i style={{height:"36%"}}/><i style={{height:"52%"}}/><i style={{height:"44%"}}/><i style={{height:"68%"}}/><i style={{height:"61%"}}/><i style={{height:"84%"}}/><i style={{height:"76%"}}/><i style={{height:"94%"}}/></div><div className="chart-labels"><span>Site</span><span>WhatsApp</span><span>CRM</span></div></div>
                  <div className="automation"><div className="card-title"><span>Automações</span><b>3 ativas</b></div><div className="flow-row"><i>01</i><span>Captura de contato</span><b>ON</b></div><div className="flow-row"><i>02</i><span>Qualificação por IA</span><b>ON</b></div><div className="flow-row"><i>03</i><span>Organização no CRM</span><b>ON</b></div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-chip chip-one"><span>●</span><div><small>IA EM EXECUÇÃO</small><b>Atendimento conectado</b></div></div>
          <div className="floating-chip chip-two"><small>PRÓXIMA AÇÃO</small><b>Escalar com controle →</b></div>
        </div>
      </section>

      <section className="signal-bar" aria-label="Pilares da Avancini OS"><div><span>01</span>Sites de conversão</div><div><span>02</span>Inteligência artificial</div><div><span>03</span>CRM sob medida</div><div><span>04</span>Automação operacional</div></section>

      <section className="section problem">
        <div className="section-index">01 — O CUSTO DE FICAR PARADO</div>
        <div className="problem-grid">
          <h2>Enquanto sua empresa improvisa, alguém mais preparado conquista o cliente.</h2>
          <div><p>Um site fraco passa insegurança. Um atendimento lento perde o momento da compra. Informações espalhadas impedem você de enxergar o negócio.</p><p className="highlight-line">Não é falta de esforço. É falta de estrutura digital trabalhando em conjunto.</p></div>
        </div>
        <div className="friction-grid"><article><span>01</span><h3>Invisível</h3><p>O cliente procura, mas não entende por que deveria escolher você.</p></article><article><span>02</span><h3>Lento</h3><p>O contato chega e esfria antes de receber a resposta certa.</p></article><article><span>03</span><h3>Desorganizado</h3><p>Clientes, tarefas e números ficam espalhados em ferramentas que não conversam.</p></article></div>
      </section>

      <section className="section solutions" id="solucoes">
        <div className="section-heading"><div><span className="section-index">02 — O ECOSSISTEMA</span><h2>Uma estrutura completa.<br />Três motores de crescimento.</h2></div><p>Cada solução pode nascer separada. O ganho real aparece quando todas trabalham como um único sistema.</p></div>
        <div className="solution-grid">
          {solutions.map((item) => (
            <article className={`solution-card ${item.visual}`} key={item.code}>
              <div className="solution-code">{item.code}</div>
              <div className="solution-visual" aria-hidden="true">
                {item.visual === "web" && <><div className="mini-browser"><span/><div><i/><i/><i/></div></div><b className="cursor-dot">↗</b></>}
                {item.visual === "ai" && <><div className="ai-core"><span>AI</span></div><i className="ai-line l1"/><i className="ai-line l2"/><i className="ai-line l3"/></>}
                {item.visual === "ops" && <div className="ops-cards"><i/><i/><i/><i/><i/><i/></div>}
              </div>
              <h3>{item.title}</h3><p>{item.text}</p><div className="solution-accent"><span>✓</span>{item.accent}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projetos">
        <div className="section-heading"><div><span className="section-index">03 — PROJETOS REAIS</span><h2>Não mostramos promessas.<br />Mostramos construção.</h2></div><p>Produtos digitais desenhados para contextos diferentes, com a mesma atenção à estratégia, clareza e uso no celular.</p></div>
        <div className="project-list">
          <article className="project-card lumora">
            <div className="project-info"><div className="project-number">01 / SISTEMAS & GESTÃO</div><h3>Lumora</h3><p>Ecossistema para salões e clínicas de estética organizarem agenda, clientes e operação em uma experiência central.</p><div className="project-tags"><span>Produto digital</span><span>Gestão</span><span>Automação</span></div><a href="https://www.avancini.me/" target="_blank" rel="noreferrer">Conhecer o projeto <span>↗</span></a></div>
            <div className="project-canvas"><div className="mock-shell"><aside><b>L</b><i/><i/><i/><i/></aside><div><div className="mock-title"><span>Bom dia, Lumora</span><small>Visão geral</small></div><div className="mock-stats"><i/><i/><i/></div><div className="mock-content"><span/><span/><span/><span/><span/></div></div></div></div>
          </article>
          <article className="project-card sandiego">
            <div className="project-info"><div className="project-number">02 / SAÚDE & CONVERSÃO</div><h3>Clínica San Diego</h3><p>Presença digital para apresentar autoridade médica, especialidades e caminhos de contato com clareza e confiança.</p><div className="project-tags"><span>Site institucional</span><span>Saúde</span><span>Conversão</span></div><a href="https://clinicasandiego.vercel.app/clinica" target="_blank" rel="noreferrer">Ver projeto online <span>↗</span></a></div>
            <div className="project-canvas"><div className="clinic-mock"><div className="clinic-nav"><b>SD</b><span/><span/><span/></div><div className="clinic-hero"><small>CUIDADO ESPECIALIZADO</small><strong>Saúde com<br/>atenção humana.</strong><i/></div><div className="clinic-footer"><span/><span/><span/></div></div></div>
          </article>
        </div>
      </section>

      <section className="section method" id="metodo">
        <div className="method-intro"><span className="section-index">04 — COMO TRABALHAMOS</span><h2>Estratégia clara.<br />Execução sem ruído.</h2><p>Você não precisa dominar tecnologia. Precisa de alguém que entenda seu problema, traduza a solução e entregue algo que faça sentido no negócio.</p><a className="text-cta" href={whatsapp} target="_blank" rel="noreferrer">Conversar sobre meu projeto <span>↗</span></a></div>
        <div className="method-steps"><article><span>01</span><div><small>DIAGNÓSTICO</small><h3>Entendemos o gargalo real</h3><p>Antes de propor uma tela, entendemos onde você perde tempo, clientes ou controle.</p></div></article><article><span>02</span><div><small>ARQUITETURA</small><h3>Desenhamos o sistema certo</h3><p>Organizamos mensagem, experiência e automações de acordo com sua realidade.</p></div></article><article><span>03</span><div><small>ENTREGA</small><h3>Colocamos a operação em movimento</h3><p>Você recebe uma estrutura pronta, clara e preparada para evoluir.</p></div></article></div>
      </section>

      <section className="final-cta" id="contato">
        <div className="cta-grid" />
        <div className="cta-orb" />
        <div className="system-label"><span /> Próximo passo: diagnóstico</div>
        <h2>Seu próximo nível precisa<br />de uma estrutura à altura.</h2>
        <p>Conte o que hoje trava sua empresa. A Avancini OS ajuda você a transformar o problema em um plano digital claro.</p>
        <a className="button button-primary button-xl" href={whatsapp} target="_blank" rel="noreferrer">Falar com Ivo Avancini <span>↗</span></a>
        <small>Resposta direta pelo WhatsApp · Sem compromisso</small>
      </section>

      <footer><div className="footer-top"><a className="logo footer-logo" href="#inicio"><span className="logo-mark">A</span><span>AVANCINI<b>OS</b><small>Business operating systems</small></span></a><p>Sites, IA e sistemas para empresas que decidiram avançar.</p><div><a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a><a href="tel:+5573981019782">(73) 98101-9782</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Avancini OS</span><span>Estratégia · Design · Tecnologia</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a Avancini OS no WhatsApp"><span>●</span><b>WhatsApp</b></a>
    </main>
  );
}
