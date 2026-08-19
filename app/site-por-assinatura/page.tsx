"use client";

import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";

const plans = [
  {
    id: "landing",
    name: "Landing de Conversão",
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
    price: "199,90",
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

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;

export default function SubscriptionPage() {
  const [model, setModel] = useState("Assinatura mensal");
  const [plan, setPlan] = useState("Site Institucional — R$ 199,90/mês");
  const [segment, setSegment] = useState("");
  const [domain, setDomain] = useState("Quero usar o endereço Avancini incluso");

  const choosePlan = (selected: string) => {
    setModel("Assinatura mensal");
    setPlan(selected);
    recordConversion("plan_selected", { plan: selected });
    window.open(
      whatsappFor(`Olá! Quero contratar o plano ${selected} e entender os próximos passos.`),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const chooseCustom = () => {
    setModel("Pagamento único");
    setPlan("Projeto exclusivo — solicitar orçamento");
    recordConversion("custom_quote_selected");
    window.open(
      whatsappFor("Olá! Preciso de um Projeto Exclusivo e quero solicitar um orçamento personalizado."),
      "_blank",
      "noopener,noreferrer",
    );
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
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="sub-page">
      <header className="sub-header">
        <a className="logo" href="/" aria-label="Avancini Web, página principal">
          <span className="logo-mark" aria-hidden="true"><i /></span>
          <span><span className="brand-name">AVANCINI <b>WEB</b></span><small>Uma solução Avancini OS</small></span>
        </a>
        <nav className="sub-header-actions" aria-label="Navegação da página de planos">
          <a href="/" className="sub-back-link"><b aria-hidden="true">←</b><span>Voltar para o site</span></a>
          <a href="#planos" className="sub-header-link"><span>Ver planos</span><b aria-hidden="true">↓</b></a>
        </nav>
      </header>

      <section className="sub-hero">
        <div className="sub-art" aria-hidden="true" />
        <div className="sub-hero-copy">
          <span className="sub-kicker"><i /> Site profissional sem entrada</span>
          <h1>Sua empresa merece mais do que um perfil nas redes sociais.</h1>
          <p>Tenha uma presença profissional, rápida e preparada para transformar visitas em conversas — sem pagar milhares de reais para começar.</p>
          <div className="sub-price-line">
            <div><small>LANDING DE CONVERSÃO</small><strong>R$ 97<em>/mês</em></strong></div>
            <div><small>SITE INSTITUCIONAL</small><strong>R$ 199,90<em>/mês</em></strong></div>
          </div>
          <div className="sub-actions">
            <a href="#planos" className="button button-primary" onClick={() => recordConversion("hero_subscription_click")}>Quero meu site por assinatura <span>↗</span></a>
            <button type="button" className="button button-ghost" onClick={chooseCustom}>Prefiro pagar uma vez</button>
          </div>
          <div className="sub-microproof"><span>Sem entrada</span><span>Hospedagem inclusa</span><span>Experiência mobile</span></div>
        </div>
      </section>

      <section className="sub-benefits">
        <div><b>01</b><span>Você envia as informações</span></div>
        <div><b>02</b><span>A Avancini cria e publica</span></div>
        <div><b>03</b><span>Você recebe contatos</span></div>
      </section>

      <section className="sub-fit" aria-labelledby="sub-fit-title">
        <div>
          <span>QUAL ESTRUTURA COMBINA COM SEU OBJETIVO?</span>
          <h2 id="sub-fit-title">Não é só uma diferença de tamanho.</h2>
          <p>Cada formato conduz o cliente por uma jornada diferente. Escolha pelo objetivo, não pela quantidade de páginas.</p>
        </div>
        <div className="sub-fit-grid">
          <article>
            <small>UMA OFERTA · UMA AÇÃO</small>
            <h3>Landing de Conversão</h3>
            <p>Para anunciar um serviço, campanha ou oportunidade e levar o visitante direto ao contato.</p>
            <div><span>Clínica divulgando avaliação</span><span>Energia solar captando simulações</span><span>Serviço local recebendo pedidos</span></div>
          </article>
          <article>
            <small>EMPRESA · SERVIÇOS · AUTORIDADE</small>
            <h3>Site Institucional</h3>
            <p>Para apresentar a empresa inteira, organizar diferentes serviços e transmitir confiança antes da conversa.</p>
            <div><span>Escritório apresentando atuações</span><span>Imobiliária exibindo portfólio</span><span>Clínica mostrando equipe e estrutura</span></div>
          </article>
        </div>
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
              <small className="sub-contract">Sem entrada · permanência mínima de 6 meses</small>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <button type="button" onClick={() => choosePlan(`${item.name} — R$ ${item.price}/mês`)}>{item.id === "landing" ? "Contratar minha landing" : "Contratar meu site"} <span>↗</span></button>
            </article>
          ))}
          <article className="sub-plan custom-plan">
            <span className="sub-plan-code">03 / PAGAMENTO ÚNICO</span>
            <h3>Projeto Exclusivo</h3>
            <p>A mesma qualidade de estratégia, design e desenvolvimento, adquirida em pagamento único.</p>
            <div className="sub-plan-custom-price">Solicite um orçamento</div>
            <small className="sub-contract">Valor e prazo definidos após o briefing</small>
            <ul>
              <li>Pagamento único pelo projeto</li>
              <li>Domínio próprio e exclusivo</li>
              <li>Site entregue conforme o escopo aprovado</li>
              <li>Manutenção opcional</li>
            </ul>
            <button type="button" onClick={chooseCustom}>Conversar sobre meu projeto <span>↗</span></button>
          </article>
        </div>
        <div className="sub-domain-note"><b>Domínio na assinatura:</b> endereço Avancini incluso. Se o cliente já possui <strong>domínio próprio</strong>, conectamos ao site; se quiser registrar um novo, o domínio é pago à parte. No projeto exclusivo, o domínio próprio entra na proposta.</div>
      </section>

      <section className="sub-section sub-choice">
        <div className="sub-heading compact">
          <span>DUAS FORMAS DE CONTRATAR</span>
          <h2>A qualidade é a mesma. O que muda é como você paga.</h2>
        </div>
        <div className="sub-choice-grid">
          <article>
            <span>SEM INVESTIMENTO ALTO DE ENTRADA</span><h3>Por assinatura</h3>
            <p>Um site completo e profissional, com o investimento dividido e acompanhamento contínuo enquanto a assinatura estiver ativa.</p>
            <ul><li>Mesmo padrão de estratégia e design</li><li>Hospedagem e suporte inclusos</li><li>1 pequeno ajuste mensal</li><li>Endereço Avancini incluso</li></ul>
            <a href="#planos">Ver os planos <b>↗</b></a>
          </article>
          <article>
            <span>COMPRA ÚNICA</span><h3>Projeto exclusivo</h3>
            <p>Para quem prefere pagar uma vez, receber o projeto em seu domínio próprio e decidir se quer manutenção depois.</p>
            <ul><li>Mesmo padrão de estratégia e design</li><li>Pagamento único combinado</li><li>Domínio próprio e exclusivo</li><li>Manutenção opcional</li></ul>
            <button type="button" onClick={chooseCustom}>Solicitar orçamento <b>↗</b></button>
          </article>
        </div>
      </section>

      <section className="sub-section sub-projects">
        <div className="sub-heading compact">
          <span>VEJA A ESTRUTURA, NÃO APENAS UMA IMAGEM</span>
          <h2>Dois projetos. Dois pontos de partida.</h2>
          <p>Role dentro de cada tela para acompanhar a estrutura completa dos projetos.</p>
        </div>
        <div className="sub-project-list">
          <article className="sub-project-card sandiego">
            <div className="sub-project-copy">
              <span>01 / REDESIGN</span>
              <h3>Clínica San Diego</h3>
              <p>Uma nova proposta criada a partir do site anterior da clínica, reorganizando especialidades, equipe e agendamento.</p>
              <div><b>Saúde</b><b>Autoridade</b><b>Agendamento</b></div>
              <a href="https://clinicasandiego.com.br/" target="_blank" rel="noreferrer">Ver o site anterior para comparar <strong>↗</strong></a>
            </div>
            <div className="sub-project-screen">
              <div className="device-browser">
                <div className="device-top"><i /><i /><i /><span>avancini.web / redesign san diego</span><b>ROLE ↓</b></div>
                <div className="project-scroll" role="region" tabIndex={0} aria-label="Demonstração rolável completa do projeto Clínica San Diego">
                  <img src="/projects/san-diego-full.png" alt="Captura completa da proposta de redesign da Clínica San Diego" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="scroll-hint">Role dentro da tela <span>↓</span></div>
            </div>
          </article>
          <article className="sub-project-card tapecar">
            <div className="sub-project-copy">
              <span>02 / CRIAÇÃO DO ZERO</span>
              <h3>Tape Car</h3>
              <p>Uma presença digital construída do zero para organizar os serviços, fortalecer a marca local e facilitar o contato.</p>
              <div><b>Automotivo</b><b>Marca local</b><b>WhatsApp</b></div>
              <small>A EMPRESA NÃO POSSUÍA SITE ANTERIOR</small>
            </div>
            <div className="sub-project-screen">
              <div className="device-browser">
                <div className="device-top"><i /><i /><i /><span>avancini.web / projeto tape car</span><b>ROLE ↓</b></div>
                <div className="project-scroll" role="region" tabIndex={0} aria-label="Demonstração rolável completa do projeto Tape Car">
                  <img src="/projects/tape-car-full.png" alt="Captura completa do projeto Tape Car" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="scroll-hint">Role dentro da tela <span>↓</span></div>
            </div>
          </article>
        </div>
      </section>

      <section className="sub-section sub-faq">
        <div className="sub-heading compact"><span>SEM LETRA MIÚDA ESCONDIDA</span><h2>Dúvidas antes de começar</h2></div>
        <div className="sub-faq-grid">
          <details name="subscription-faq" open><summary>Como funciona o domínio?</summary><p>Na assinatura, você pode usar o endereço Avancini incluso ou conectar um domínio que já possui. Se quiser registrar um domínio novo, ele é pago à parte e fica em seu nome. No projeto exclusivo, o domínio próprio faz parte da proposta.</p></details>
          <details name="subscription-faq"><summary>Posso pedir alterações?</summary><p>A assinatura inclui um pequeno ajuste mensal, como trocar texto, imagem, telefone ou informação existente. Novas seções, funcionalidades ou reformulações recebem orçamento separado. No projeto exclusivo, alterações posteriores entram na manutenção opcional.</p></details>
          <details name="subscription-faq"><summary>Posso pagar diretamente pelo site?</summary><p>Sim. Depois de confirmarmos plano, domínio, conteúdo e contrato, você recebe um link seguro para pagamento. Assim nenhuma cobrança acontece antes de validarmos que a opção escolhida atende sua empresa.</p></details>
          <details name="subscription-faq"><summary>Existe permanência mínima?</summary><p>Sim. Como a assinatura não possui entrada, a permanência mínima é de 6 meses. Depois desse período, o cancelamento segue normalmente as condições do contrato.</p></details>
          <details name="subscription-faq"><summary>O que acontece se eu cancelar?</summary><p>Depois dos 6 meses, a assinatura pode ser encerrada. A hospedagem e o site por assinatura são desativados; qualquer domínio próprio registrado pelo cliente continua pertencendo a ele.</p></details>
          <details name="subscription-faq"><summary>Assinatura tem qualidade inferior?</summary><p>Não. Estratégia, design, versão mobile e cuidado de desenvolvimento seguem o mesmo padrão. O que muda é a forma de pagamento, o domínio incluído e como funciona a continuidade após a entrega.</p></details>
          <details name="subscription-faq"><summary>Em quanto tempo fica pronto?</summary><p>O prazo começa após o envio de textos, imagens e informações. A previsão exata é confirmada antes do início, conforme a estrutura escolhida.</p></details>
        </div>
      </section>

      <section className="sub-start" id="comecar">
        <div>
          <span>PRÓXIMO PASSO</span>
          <h2>Conte o que sua empresa precisa.</h2>
          <p>Você revisa a mensagem antes de enviar. A conversa continua diretamente pelo WhatsApp.</p>
        </div>
        <form onSubmit={submit}>
          <label><span>Modelo de contratação</span><select value={model} onChange={(event) => setModel(event.target.value)}><option>Assinatura mensal</option><option>Pagamento único</option><option>Quero entender as duas opções</option></select></label>
          <label><span>Plano ou necessidade</span><select value={plan} onChange={(event) => setPlan(event.target.value)}><option>Landing de Conversão — R$ 97/mês</option><option>Site Institucional — R$ 199,90/mês</option><option>Projeto exclusivo — solicitar orçamento</option><option>Quero explicar minha necessidade</option></select></label>
          <label><span>Segmento da empresa</span><input value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: clínica, restaurante, escritório" /></label>
          <label><span>Domínio</span><select value={domain} onChange={(event) => setDomain(event.target.value)}><option>Quero usar o endereço Avancini incluso</option><option>Já tenho domínio próprio</option><option>Quero registrar um domínio novo à parte</option><option>Quero pagamento único com domínio próprio</option><option>Não sei qual escolher</option></select></label>
          <button type="submit">Continuar pelo WhatsApp <span>↗</span></button>
          <small>Sem compromisso · conversa direta</small>
        </form>
      </section>

      <footer className="sub-footer">
        <a className="logo" href="/"><span className="logo-mark" aria-hidden="true"><i /></span><span><span className="brand-name">AVANCINI <b>WEB</b></span><small>Uma solução Avancini OS</small></span></a>
        <span>Landings de conversão · Sites institucionais · Eunápolis, Bahia</span>
        <a href="/">Conhecer a Avancini Web <b>↗</b></a>
      </footer>
      <a className="sub-sticky" href="#planos">Planos a partir de R$ 97/mês <b>↗</b></a>
    </main>
  );
}
