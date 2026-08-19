"use client";

import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";

const plans = [
  {
    id: "landing",
    name: "Landing Page",
    price: "97",
    description: "Para divulgar uma oferta, campanha ou serviço e receber contatos.",
    features: [
      "Jornada única focada em uma oferta",
      "Botões de WhatsApp e formulário",
      "Carregamento rápido e versão mobile",
      "Hospedagem e suporte inclusos",
      "1 pequeno ajuste por mês",
    ],
    featured: false,
  },
  {
    id: "site",
    name: "Site Institucional",
    price: "247",
    description: "Para organizar toda a presença da empresa, com navegação, autoridade e diferentes caminhos de contato.",
    features: [
      "Estrutura institucional completa",
      "Serviços, diferenciais e conteúdos organizados",
      "Navegação, formulários e WhatsApp",
      "Hospedagem e suporte inclusos",
      "1 pequeno ajuste por mês",
    ],
    featured: true,
  },
] as const;

function recordConversion(event: string, data?: Record<string, string>) {
  track(event, data);
  const browser = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  browser.gtag?.("event", event, data);
  browser.fbq?.("trackCustom", event, data);
}

export default function SubscriptionPage() {
  const [model, setModel] = useState("Assinatura mensal");
  const [plan, setPlan] = useState("Site Institucional — R$ 247/mês");
  const [segment, setSegment] = useState("");
  const [domain, setDomain] = useState("Ainda não tenho domínio");

  const choosePlan = (selected: string) => {
    setModel("Assinatura mensal");
    setPlan(selected);
    recordConversion("plan_selected", { plan: selected });
    document.querySelector("#comecar")?.scrollIntoView({ behavior: "smooth" });
  };

  const chooseCustom = () => {
    setModel("Projeto sob medida");
    setPlan("Quero explicar minha necessidade");
    recordConversion("custom_quote_selected");
    document.querySelector("#comecar")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recordConversion("lead_whatsapp", { model, plan, segment: segment || "não informado" });
    const message = [
      "Olá! Vim pela página da Avancini Web e quero começar meu projeto.",
      `Modelo: ${model}`,
      `Plano/necessidade: ${plan}`,
      `Segmento: ${segment || "Vou explicar pelo WhatsApp"}`,
      `Domínio: ${domain}`,
    ].join("\n");
    window.open(`https://wa.me/5573981019782?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="sub-page">
      <header className="sub-header">
        <a className="logo" href="/" aria-label="Avancini Web, página principal">
          <span className="logo-mark" aria-hidden="true"><i /></span>
          <span><span className="brand-name">AVANCINI <b>WEB</b></span><small>Uma solução Avancini OS</small></span>
        </a>
        <a href="#planos" className="sub-header-link">Ver planos <span>↓</span></a>
      </header>

      <section className="sub-hero">
        <div className="sub-art" aria-hidden="true" />
        <div className="sub-hero-copy">
          <span className="sub-kicker"><i /> Site profissional sem entrada</span>
          <h1>Sua empresa merece mais do que um perfil nas redes sociais.</h1>
          <p>Tenha uma presença profissional, rápida e preparada para transformar visitas em conversas — sem pagar milhares de reais para começar.</p>
          <div className="sub-price-line">
            <div><small>LANDING PAGE</small><strong>R$ 97<em>/mês</em></strong></div>
            <div><small>SITE INSTITUCIONAL</small><strong>R$ 247<em>/mês</em></strong></div>
          </div>
          <div className="sub-actions">
            <a href="#planos" className="button button-primary" onClick={() => recordConversion("hero_subscription_click")}>Quero meu site por assinatura <span>↗</span></a>
            <button type="button" className="button button-ghost" onClick={chooseCustom}>Prefiro um projeto sob medida</button>
          </div>
          <div className="sub-microproof"><span>Sem entrada</span><span>Hospedagem inclusa</span><span>Experiência mobile</span></div>
        </div>
      </section>

      <section className="sub-benefits">
        <div><b>01</b><span>Você envia as informações</span></div>
        <div><b>02</b><span>A Avancini cria e publica</span></div>
        <div><b>03</b><span>Você recebe contatos</span></div>
      </section>

      <section className="sub-section" id="planos">
        <div className="sub-heading">
          <span>ESCOLHA SUA ESTRUTURA</span>
          <h2>Comece pequeno.<br />Pareça profissional desde o primeiro dia.</h2>
          <p>A landing vende uma oferta específica. O site institucional apresenta a empresa inteira. Os dois incluem design adaptado à marca, versão mobile, hospedagem e suporte.</p>
        </div>
        <div className="sub-plan-grid">
          {plans.map((item) => (
            <article className={item.featured ? "sub-plan featured" : "sub-plan"} key={item.id}>
              {item.featured && <small className="sub-popular">MAIS ESCOLHIDO</small>}
              <span className="sub-plan-code">{item.id === "landing" ? "01" : "02"} / ASSINATURA</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="sub-plan-price"><sup>R$</sup><strong>{item.price}</strong><span>/mês</span></div>
              <small className="sub-contract">Sem entrada · permanência mínima de 12 meses</small>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <button type="button" onClick={() => choosePlan(`${item.name} — R$ ${item.price}/mês`)}>Escolher {item.name} <span>↗</span></button>
            </article>
          ))}
          <article className="sub-plan custom-plan">
            <span className="sub-plan-code">03 / SOB MEDIDA</span>
            <h3>Projeto Personalizado</h3>
            <p>Para estruturas mais completas ou complexas, com escopo definido para a necessidade real da empresa.</p>
            <div className="sub-plan-custom-price">Solicite um orçamento</div>
            <small className="sub-contract">Valor e prazo definidos após o briefing</small>
            <ul>
              <li>Catálogo, loja virtual ou integrações</li>
              <li>Funcionalidades e estrutura exclusivas</li>
              <li>Escopo, prazo e propriedade combinados</li>
              <li>Manutenção opcional</li>
            </ul>
            <button type="button" onClick={chooseCustom}>Solicitar orçamento <span>↗</span></button>
          </article>
        </div>
        <div className="sub-domain-note"><b>Domínio:</b> endereço Avancini incluso. Se preferir <strong>suaempresa.com.br</strong>, conectamos o domínio próprio e o registro anual fica em nome do cliente.</div>
      </section>

      <section className="sub-section sub-choice">
        <div className="sub-heading compact">
          <span>DUAS FORMAS DE CONTRATAR</span>
          <h2>Assinatura ou projeto sob medida?</h2>
        </div>
        <div className="sub-choice-grid">
          <article>
            <span>MAIS ACESSÍVEL</span><h3>Por assinatura</h3>
            <p>Ideal para empresas que querem começar sem investimento inicial e manter o site sempre acompanhado.</p>
            <ul><li>Mensalidade fixa</li><li>Hospedagem e suporte</li><li>Pequenos ajustes mensais</li><li>Site ativo durante a assinatura</li></ul>
            <a href="#planos">Ver os planos <b>↗</b></a>
          </article>
          <article>
            <span>ESCOPO PERSONALIZADO</span><h3>Projeto sob medida</h3>
            <p>Para quem precisa de catálogo, loja virtual, integrações, áreas especiais ou uma experiência totalmente exclusiva.</p>
            <ul><li>Pagamento único combinado</li><li>Escopo e prazo personalizados</li><li>Funcionalidades especiais</li><li>Manutenção opcional</li></ul>
            <button type="button" onClick={chooseCustom}>Solicitar orçamento <b>↗</b></button>
          </article>
        </div>
      </section>

      <section className="sub-section sub-case">
        <div className="sub-case-copy">
          <span>EXEMPLO DE REDESIGN</span>
          <h2>Clínica San Diego</h2>
          <p>A partir do site anterior da clínica, criamos uma nova proposta para organizar especialidades, apresentar a equipe e facilitar o agendamento.</p>
          <a href="https://clinicasandiego.com.br/" target="_blank" rel="noreferrer">Ver o site anterior para comparar <b>↗</b></a>
        </div>
        <div className="sub-case-screen"><img src="/projects/san-diego.jpg" alt="Página inicial da Clínica San Diego" /></div>
      </section>

      <section className="sub-section sub-faq">
        <div className="sub-heading compact"><span>SEM LETRA MIÚDA ESCONDIDA</span><h2>Dúvidas antes de começar</h2></div>
        <div className="sub-faq-grid">
          <details open><summary>O site fica no meu domínio?</summary><p>Sim. Você pode usar o endereço Avancini incluso ou conectar um domínio próprio registrado em seu nome.</p></details>
          <details><summary>Posso pedir alterações?</summary><p>Os planos incluem um pequeno ajuste mensal, como trocar um texto, imagem ou informação. Novas seções, funcionalidades ou reformulações recebem orçamento separado.</p></details>
          <details><summary>Existe permanência mínima?</summary><p>Sim. Como não cobramos entrada, os planos de assinatura possuem permanência mínima de 12 meses.</p></details>
          <details><summary>O que acontece se eu cancelar?</summary><p>Após o período mínimo, você pode cancelar conforme as condições do contrato. A hospedagem e o site por assinatura são desativados; seu domínio próprio continua sendo seu.</p></details>
          <details><summary>E se eu quiser algo diferente?</summary><p>Você pode contratar um projeto sob medida, com escopo, prazo, propriedade e manutenção definidos na proposta.</p></details>
          <details><summary>Em quanto tempo fica pronto?</summary><p>O prazo começa após o envio de textos, imagens e informações. A previsão exata é confirmada antes do início.</p></details>
        </div>
      </section>

      <section className="sub-start" id="comecar">
        <div>
          <span>PRÓXIMO PASSO</span>
          <h2>Conte o que sua empresa precisa.</h2>
          <p>Você revisa a mensagem antes de enviar. A conversa continua diretamente pelo WhatsApp.</p>
        </div>
        <form onSubmit={submit}>
          <label><span>Modelo de contratação</span><select value={model} onChange={(event) => setModel(event.target.value)}><option>Assinatura mensal</option><option>Projeto sob medida</option><option>Quero entender as duas opções</option></select></label>
          <label><span>Plano ou necessidade</span><select value={plan} onChange={(event) => setPlan(event.target.value)}><option>Landing Page — R$ 97/mês</option><option>Site Institucional — R$ 247/mês</option><option>Projeto personalizado — solicitar orçamento</option><option>Quero explicar minha necessidade</option></select></label>
          <label><span>Segmento da empresa</span><input value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: clínica, restaurante, escritório" /></label>
          <label><span>Domínio</span><select value={domain} onChange={(event) => setDomain(event.target.value)}><option>Ainda não tenho domínio</option><option>Já tenho domínio próprio</option><option>Quero usar o endereço Avancini</option><option>Não sei qual escolher</option></select></label>
          <button type="submit">Continuar pelo WhatsApp <span>↗</span></button>
          <small>Sem compromisso · conversa direta</small>
        </form>
      </section>

      <footer className="sub-footer">
        <a className="logo" href="/"><span className="logo-mark" aria-hidden="true"><i /></span><span><span className="brand-name">AVANCINI <b>WEB</b></span><small>Uma solução Avancini OS</small></span></a>
        <span>Landing pages · Sites completos · Eunápolis, Bahia</span>
        <a href="/">Conhecer a Avancini Web <b>↗</b></a>
      </footer>
      <a className="sub-sticky" href="#planos">Planos a partir de R$ 97/mês <b>↗</b></a>
    </main>
  );
}
