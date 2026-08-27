"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AvanciniMark } from "../avancini-mark";
import { trackLead, trackMarketingEvent } from "../marketing-events";

const SubArrow = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="dash-svg-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SubDownArrow = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="dash-svg-down-arrow"
    style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 4 }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const plans = [
  {
    id: "landing-page",
    name: "Landing Page Profissional",
    decisionLabel: "OFERTA DIRETA",
    decisionAnswer: "Uma página para levar a uma única ação.",
    price: "79,90",
    priceNoFidelity: "49,90",
    setupNoFidelity: "R$ 399,90",
    suffix: "/mês",
    contract: "R$ 0 de taxa de criação · Contrato de 6 meses",
    ideal: "Para serviços, consultores e ofertas diretas",
    description: "Página de alta conversão criada no padrão Avancini Dash para atrair contatos, clientes e agendamentos.",
    features: [
      "Estratégia, texto persuasivo e design personalizado",
      "Formulário e botão de WhatsApp integrados",
      "Versão mobile ultrarrápida, performance e publicação",
      "Endereço na rede Avancini incluso (R$ 0 de entrada)",
      "Opção de domínio .com.br próprio, sujeita à disponibilidade e análise",
      "Hospedagem de alta velocidade, SSL, suporte e 1 ajuste mensal",
    ],
    cta: "Quero a Landing Page",
    featured: false,
  },
  {
    id: "site-institucional",
    name: "Site Institucional",
    decisionLabel: "EMPRESA COMPLETA",
    decisionAnswer: "Marca, serviços, autoridade e contatos organizados.",
    price: "109,99",
    priceNoFidelity: "69,90",
    setupNoFidelity: "A partir de R$ 599,90",
    suffix: "/mês",
    contract: "R$ 0 de taxa de criação · Contrato de 6 meses",
    ideal: "Para apresentar a empresa, os serviços e a autoridade da marca",
    description: "Um site completo para explicar o negócio, organizar serviços e preparar o cliente antes do contato.",
    features: [
      "Páginas institucionais e navegação completa",
      "Serviços, diferenciais, equipe e contatos organizados",
      "Formulários e WhatsApp com contexto",
      "Opção de domínio .com.br próprio, sujeita à disponibilidade e análise",
      "Hospedagem, SSL, publicação, suporte e atualizações",
    ],
    cta: "Quero um Site Institucional",
    featured: true,
  },
  {
    id: "site-catalogo",
    name: "Site Catálogo",
    decisionLabel: "VITRINE + WHATSAPP",
    decisionAnswer: "Variedade visível e pedidos enviados para a conversa.",
    price: "139,00",
    priceNoFidelity: "89,90",
    setupNoFidelity: "A partir de R$ 790,00",
    suffix: "/mês",
    contract: "R$ 0 de taxa de criação · Contrato de 6 meses",
    ideal: "Para exibir vários produtos sem vender diretamente pelo site",
    description: "Uma vitrine organizada com fotos, detalhes, filtros essenciais e pedidos ou orçamentos enviados ao WhatsApp.",
    features: [
      "Catálogo visual de produtos ou serviços",
      "Fotos, características e categorias",
      "Pedido ou orçamento pelo WhatsApp em cada item",
      "Sem carrinho, pagamento ou gestão de estoque",
      "Hospedagem, SSL, publicação, suporte e atualizações",
    ],
    cta: "Quero um Site Catálogo",
    featured: false,
  },
  {
    id: "loja-virtual",
    name: "Loja Virtual",
    decisionLabel: "VENDA ONLINE",
    decisionAnswer: "Carrinho, pagamento, entrega e pedidos no próprio site.",
    price: "Avaliação da operação",
    priceNoFidelity: "Avaliação da operação",
    setupNoFidelity: "Definida após entender o catálogo",
    suffix: "",
    contract: "Catálogo, pagamento, entrega e rotina definidos antes da proposta",
    ideal: "Para vender e receber pagamentos diretamente pelo site",
    description: "Uma operação de venda online com catálogo, carrinho, pagamento, entrega e gestão de pedidos compatíveis com o negócio.",
    features: [
      "Produtos, variações e carrinho",
      "Pagamento online e confirmação de pedido",
      "Regras de entrega, retirada ou frete",
      "Painel de pedidos e estoque conforme a operação",
      "Implantação e mensalidade definidas com clareza",
    ],
    cta: "Avaliar minha Loja Virtual",
    featured: false,
    quoteOnly: true,
  },
] as const;

type ContractModel = "Assinatura mensal" | "Pagamento único" | "Quero entender as duas opções";

const planOptions: Record<ContractModel, readonly string[]> = {
  "Assinatura mensal": [
    "Landing Page Profissional",
    "Site Institucional",
    "Site Catálogo",
    "Loja Virtual",
    "Quero combinar Dash + Chatbot ou IA",
    "Quero ajuda para escolher o plano",
  ],
  "Pagamento único": [
    "Landing de Conversão — solicitar orçamento",
    "Site Institucional — solicitar orçamento",
    "Site Catálogo — solicitar orçamento",
    "Loja Virtual — avaliar operação",
    "Quero explicar minha necessidade",
  ],
  "Quero entender as duas opções": [
    "Landing de Conversão",
    "Site Institucional",
    "Site Catálogo",
    "Loja Virtual",
    "Quero combinar Dash + Chatbot ou IA",
    "Ainda não sei",
  ],
};

const domainOptions: Record<ContractModel, readonly string[]> = {
  "Assinatura mensal": [
    "Quero usar o endereço Avancini incluso",
    "Quero conectar meu domínio próprio",
    "Quero registrar um domínio novo à parte",
    "Não sei qual escolher",
  ],
  "Pagamento único": [
    "Já tenho domínio próprio",
    "Quero incluir um domínio próprio na proposta",
    "Não sei qual escolher",
  ],
  "Quero entender as duas opções": [
    "Já tenho domínio próprio",
    "Quero registrar um domínio próprio",
    "Posso usar o endereço Avancini se assinar",
    "Ainda não sei",
  ],
};

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;

export default function SubscriptionPage() {
  const [fidelityMode, setFidelityMode] = useState<"com-fidelidade" | "sem-fidelidade">("com-fidelidade");
  const [model, setModel] = useState<ContractModel>("Assinatura mensal");
  const [plan, setPlan] = useState("Landing Page Profissional");
  const [segment, setSegment] = useState("");
  const [domain, setDomain] = useState("Quero usar o endereço Avancini incluso");
  const [timeline, setTimeline] = useState("Em até 15 dias");

  const changeModel = (nextModel: ContractModel) => {
    setModel(nextModel);
    setPlan(planOptions[nextModel][0]);
    setDomain(domainOptions[nextModel][0]);
  };

  const moveToBriefing = () => {
    window.setTimeout(() => document.getElementById("comecar")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const choosePlan = (selected: string) => {
    setModel("Assinatura mensal");
    setPlan(selected);
    setDomain(fidelityMode === "com-fidelidade" ? "Quero usar o endereço Avancini incluso" : "Quero conectar meu domínio próprio");
    trackMarketingEvent("plan_selected", { plan: selected });
    moveToBriefing();
  };

  const chooseInstitutional = () => {
    setModel("Assinatura mensal");
    setPlan("Site Institucional");
    setDomain(fidelityMode === "com-fidelidade" ? "Quero usar o endereço Avancini incluso" : "Quero conectar meu domínio próprio");
    trackMarketingEvent("institutional_plan_selected");
    moveToBriefing();
  };

  const chooseStore = () => {
    setModel("Quero entender as duas opções");
    setPlan("Loja Virtual");
    setDomain(domainOptions["Quero entender as duas opções"][0]);
    trackMarketingEvent("store_quote_selected");
    moveToBriefing();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackLead("briefing_planos", { model, plan, segment: segment || "não informado" });
    const message = [
      "Olá! Vim pela página da Avancini Dash e quero começar meu projeto.",
      `Modelo: ${model}`,
      model === "Assinatura mensal" ? `Condição: ${fidelityMode === "com-fidelidade" ? "R$ 0 de criação e contrato de 6 meses" : "criação paga, mensalidade menor e sem fidelidade"}` : "Condição: pagamento único, sem mensalidade Avancini",
      `Plano/necessidade: ${plan}`,
      `Segmento: ${segment || "Vou explicar pelo WhatsApp"}`,
      `Domínio: ${domain}`,
      `Prazo desejado: ${timeline}`,
    ].join("\n");
    window.open(whatsappFor(message), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="sub-page">
      <header className="sub-header">
        <Link className="logo" href="/dash" aria-label="Avancini Dash, página principal">
          <AvanciniMark variant="dash" className="logo-mark avancini-a-mark" />
          <span><span className="brand-name">AVANCINI <b>DASH</b></span><small>Uma solução Avancini OS</small></span>
        </Link>
        <nav className="sub-header-actions" aria-label="Navegação da página de planos">
          <Link href="/dash" className="sub-back-link"><b aria-hidden="true">←</b><span>Voltar para o site</span></Link>
          <a href="#planos" className="sub-header-link"><span>Ver planos</span><SubDownArrow /></a>
        </nav>
      </header>

      <section className="sub-hero">
        <div className="sub-art" aria-hidden="true"><AvanciniMark variant="dash" className="sub-a-mark avancini-a-mark" /></div>
        <div className="sub-hero-copy">
          <span className="sub-kicker"><i /> Condições de lançamento</span>
          <h1>Escolha a estrutura certa. A qualidade não muda.</h1>
          <p>Landing, site institucional, catálogo ou loja virtual. O que muda é o objetivo e a operação — não o padrão de estratégia, design e desenvolvimento.</p>
          <div className="sub-actions">
            <a href="#planos" className="button button-primary" onClick={() => trackMarketingEvent("hero_subscription_click")}>Comparar opções <SubArrow /></a>
            <button type="button" className="button button-ghost" onClick={chooseInstitutional}>Quero um site completo</button>
          </div>
          <div className="sub-price-line">
            <div><small>LANDING PAGE</small><strong>Uma oferta</strong><span>Captação e conversão</span></div>
            <div><small>SITE INSTITUCIONAL</small><strong>Sua empresa</strong><span>Presença e autoridade</span></div>
            <div><small>SITE CATÁLOGO</small><strong>Sua vitrine</strong><span>Pedido pelo WhatsApp</span></div>
            <div><small>LOJA VIRTUAL</small><strong>Venda online</strong><span>Carrinho e pagamento</span></div>
          </div>
          <div className="sub-microproof"><span>Mesma qualidade em todas as opções</span><span>Hospedagem e SSL inclusos</span><span>Domínio próprio ou endereço Avancini</span></div>
        </div>
      </section>

      <section className="sub-portfolio-first" aria-labelledby="portfolio-first-title">
        <div className="sub-portfolio-heading">
          <span>PORTFÓLIO / PROJETOS APLICADOS</span>
          <h2 id="portfolio-first-title">Primeiro veja o nível.<br />Depois escolha o plano.</h2>
          <p>Um redesign para uma empresa que já tinha site e uma criação completa para outra que começou do zero.</p>
        </div>
        <div className="sub-portfolio-rail">
          <Link href="/dash#portfolio" className="sub-portfolio-card portfolio-san">
            <Image src="/projects/san-diego.jpg" alt="Projeto de redesign Clínica San Diego" width={1264} height={840} sizes="(max-width: 760px) 92vw, 47vw" quality={82} />
            <span><small>01 / REDESIGN</small><strong>Clínica San Diego</strong><b>Explorar projeto <SubArrow /></b></span>
          </Link>
          <Link href="/dash#portfolio" className="sub-portfolio-card portfolio-tape">
            <Image src="/projects/tape-car.png" alt="Projeto criado do zero para Tape Car" width={1264} height={840} sizes="(max-width: 760px) 92vw, 47vw" quality={82} />
            <span><small>02 / CRIAÇÃO DO ZERO</small><strong>Tape Car</strong><b>Explorar projeto <SubArrow /></b></span>
          </Link>
        </div>
        <Link className="sub-portfolio-more" href="/dash#portfolio">Abrir o portfólio completo da Avancini Dash <SubArrow /></Link>
      </section>

      <section className="sub-fit" aria-labelledby="sub-fit-title">
        <div>
          <span>QUATRO ESTRUTURAS, QUATRO OBJETIVOS</span>
          <h2 id="sub-fit-title">A escolha começa pelo que você quer alcançar.</h2>
          <p>Não escolha pela quantidade de páginas. Escolha pela forma como o cliente precisa conhecer e contratar sua empresa.</p>
        </div>
        <div className="sub-fit-grid sub-fit-pricing-grid">
          {plans.map((item, index) => {
            const quoteOnly = "quoteOnly" in item && item.quoteOnly;
            const price = fidelityMode === "com-fidelidade" ? item.price : item.priceNoFidelity;
            return <article key={item.id}>
              <span className="sub-fit-index">0{index + 1}</span>
              <div><small>{item.decisionLabel}</small><h3>{item.name}</h3><p>{item.decisionAnswer}</p></div>
              <strong>{quoteOnly ? "Sob avaliação" : `R$ ${price}/mês`}</strong>
            </article>;
          })}
        </div>
        <p className="sub-fit-decision"><b>Em uma linha:</b> landing capta; site apresenta; catálogo exibe; loja conclui a venda.</p>
      </section>

      <section className="sub-section" id="planos">
        <div className="sub-heading">
          <span>ESCOLHA SUA ESTRUTURA</span>
          <h2>Você entende o que recebe antes de escolher.</h2>
          <p>A landing vende uma oferta específica. O site institucional apresenta a empresa inteira e também pode exibir produtos. Em todas as opções, o essencial já está incluído.</p>
        </div>
        <div className="sub-standard" aria-label="O que está incluso nos planos por assinatura">
          <div><small>EM TODOS OS PLANOS</small><strong>Sem taxas escondidas no essencial.</strong></div>
          <span>Estratégia e texto</span><span>Design adaptado à marca</span><span>Celular e performance</span><span>Publicação e suporte</span>
        </div>

        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-toggle" role="group" aria-label="Opção de fidelidade">
            <button
              type="button"
              className={fidelityMode === "com-fidelidade" ? "active" : ""}
              onClick={() => setFidelityMode("com-fidelidade")}
            >
              <small>MENOR CUSTO PARA COMEÇAR</small><strong>Mensal sem entrada</strong><span className="badge-pill">R$ 0 criação · 6 meses</span>
            </button>
            <button
              type="button"
              className={fidelityMode === "sem-fidelidade" ? "active" : ""}
              onClick={() => setFidelityMode("sem-fidelidade")}
            >
              <small>MAIS LIBERDADE</small><strong>Mensal flexível</strong><span className="badge-pill">criação paga · cancele quando quiser</span>
            </button>
          </div>
        </div>

        <div className="sub-plan-grid">
          {plans.map((item, index) => {
            const isFidelity = fidelityMode === "com-fidelidade";
            const currentPrice = isFidelity ? item.price : item.priceNoFidelity;
            const quoteOnly = "quoteOnly" in item && item.quoteOnly;
            const contractText = quoteOnly
              ? item.contract
              : isFidelity
              ? item.contract
              : `Criação única: ${item.setupNoFidelity} à vista · Sem permanência`;
            return (
            <article className={item.featured ? "sub-plan featured" : "sub-plan"} id={`plano-${item.id}`} key={item.id}>
              {item.featured && <small className="sub-popular">{isFidelity ? "CONTRATO 6 MESES" : "SEM PERMANÊNCIA"}</small>}
              <span className="sub-plan-code">0{index + 1} / PLANO ATIVO</span>
              <em className="sub-plan-ideal">{item.ideal}</em>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className={quoteOnly ? "sub-plan-price quote-only" : "sub-plan-price"}>
                {!quoteOnly && <sup>R$</sup>}<strong>{currentPrice}</strong><span>{item.suffix}</span>
              </div>
              <small className="sub-contract">{contractText}</small>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="sub-plan-actions">
                <button type="button" onClick={() => quoteOnly ? chooseStore() : choosePlan(item.name)}>{item.cta} <SubArrow /></button>
                <a href={whatsappFor(`Olá! Tenho uma dúvida sobre a ${item.name} e suas condições de implantação, hospedagem e suporte.`)} target="_blank" rel="noreferrer" onClick={() => trackLead("duvida_plano_assinatura", { plan: item.name })}>Tirar uma dúvida</a>
              </div>
            </article>
            );
          })}

        </div>
        <div className="sub-domain-note"><b>Você escolhe o endereço:</b> Endereço na rede Avancini incluso ou <strong>domínio próprio .com.br</strong>, sujeito à análise e à disponibilidade do nome desejado. Caso você já possua um domínio registrado, a conexão não possui taxa adicional.</div>
        <div className="sub-delivery" aria-label="Etapas e prazos de entrega">
          <div><small>CONTEÚDO PRONTO, CRIAÇÃO EM MOVIMENTO</small><strong>Prazo combinado antes do início.</strong><p>A contagem começa depois que textos, imagens e informações necessárias forem enviados.</p></div>
          <span><b>7 dias</b><small>Estrutura direta</small></span>
          <span><b>15 dias</b><small>Projeto intermediário</small></span>
          <span><b>30 dias</b><small>Estrutura completa</small></span>
        </div>
      </section>

      <section className="sub-section sub-faq">
        <div className="sub-heading compact"><span>SEM LETRA MIÚDA ESCONDIDA</span><h2>Dúvidas antes de começar</h2></div>
        <div className="sub-faq-grid">
          <details name="subscription-faq" open><summary>Como funciona o domínio?</summary><p>Nos planos recorrentes sem taxa de criação, você pode começar com um endereço dentro da estrutura Avancini. Se preferir um .com.br próprio, conectamos um domínio que já seja seu ou registramos um novo à parte, sempre em seu nome.</p></details>
          <details name="subscription-faq"><summary>Posso pedir alterações?</summary><p>A contratação recorrente inclui um pequeno ajuste mensal, como trocar texto, imagem, telefone ou informação existente. Novas seções, funcionalidades ou reformulações recebem orçamento separado. No pagamento único, alterações posteriores entram na manutenção opcional.</p></details>
          <details name="subscription-faq"><summary>Posso pagar diretamente pelo site?</summary><p>Sim. Depois de confirmarmos plano, domínio, conteúdo e contrato, você recebe um link seguro para pagamento. Assim nenhuma cobrança acontece antes de validarmos que a opção escolhida atende sua empresa.</p></details>
          <details name="subscription-faq"><summary>Existe permanência mínima?</summary><p>Sim, na modalidade com R$ 0 de taxa de criação existe permanência mínima de 6 meses. Na opção com criação paga e mensalidade menor, não há fidelidade. A condição escolhida aparece com clareza antes da contratação.</p></details>
          <details name="subscription-faq"><summary>O que acontece se eu cancelar?</summary><p>Ao encerrar um plano recorrente, hospedagem, suporte e publicação são desativados depois do período mínimo contratado. O domínio registrado pelo cliente e todo material fornecido por ele continuam sendo dele. A transferência dos arquivos faz parte apenas do pagamento único quando estiver prevista na proposta.</p></details>
          <details name="subscription-faq"><summary>A opção sem entrada tem qualidade inferior?</summary><p>Não. A estratégia, o texto, o design, a versão mobile e o cuidado de desenvolvimento são os mesmos. O que muda é a forma de contratação e o endereço escolhido, não a qualidade entregue.</p></details>
          <details name="subscription-faq"><summary>Qual a diferença entre Site Catálogo e Loja Virtual?</summary><p>No Site Catálogo, o cliente vê produtos e envia o pedido ou orçamento pelo WhatsApp. Na Loja Virtual, ele adiciona ao carrinho, paga, escolhe entrega ou retirada e conclui a compra dentro do site.</p></details>
          <details name="subscription-faq"><summary>Preciso contratar o Sync junto?</summary><p>Não. O Dash funciona sozinho. Chatbot ou Atendente IA são opcionais e só entram quando sua empresa também precisa responder, qualificar ou acompanhar mais contatos.</p></details>
          <details name="subscription-faq"><summary>Como funciona o pagamento único?</summary><p>Você paga uma vez pela criação, sem mensalidade Avancini. Domínio e hospedagem são contratados e pagos diretamente pelo cliente, a manutenção fica opcional e a proposta informa claramente quais arquivos serão entregues depois da quitação.</p></details>
          <details name="subscription-faq"><summary>Em quanto tempo fica pronto?</summary><p>Trabalhamos com prazos de 7, 15 ou até 30 dias, definidos antes do início conforme a estrutura escolhida. A contagem começa após o envio dos textos, imagens e informações necessárias.</p></details>
        </div>
      </section>

      <section className="sub-start" id="comecar">
        <div>
          <span>PRÓXIMO PASSO</span>
          <h2>Conte o que sua empresa precisa.</h2>
          <p>Você revisa a mensagem antes de enviar. A conversa continua diretamente pelo WhatsApp.</p>
        </div>
        <form onSubmit={submit}>
          <label><span>Modelo de contratação</span><select value={model} onChange={(event) => changeModel(event.target.value as ContractModel)}><option>Assinatura mensal</option><option>Pagamento único</option><option>Quero entender as duas opções</option></select></label>
          <label><span>Plano ou necessidade</span><select value={plan} onChange={(event) => setPlan(event.target.value)}>{planOptions[model].map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span>Segmento da empresa</span><input value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: clínica, restaurante, escritório" /></label>
          <label><span>Domínio</span><select value={domain} onChange={(event) => setDomain(event.target.value)}>{domainOptions[model].map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span>Prazo desejado</span><select value={timeline} onChange={(event) => setTimeline(event.target.value)}><option>Em até 7 dias</option><option>Em até 15 dias</option><option>Em até 30 dias</option></select></label>
          <button type="submit">Continuar pelo WhatsApp <SubArrow /></button>
          <small>Sem compromisso · conversa direta</small>
        </form>
      </section>

      <footer className="sub-footer">
        <Link className="logo" href="/dash"><AvanciniMark variant="dash" className="logo-mark avancini-a-mark" /><span><span className="brand-name">AVANCINI <b>DASH</b></span><small>Uma solução Avancini OS</small></span></Link>
        <span>Landing pages · Sites institucionais · Catálogos · Lojas virtuais</span>
        <nav className="sub-footer-legal" aria-label="Informações legais"><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link></nav>
        <Link href="/dash">Conhecer a Avancini Dash <SubArrow /></Link>
      </footer>
    </main>
  );
}
