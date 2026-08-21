"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackLead, trackMarketingEvent } from "../marketing-events";

const plans = [
  {
    id: "landing-page",
    name: "Landing Page Profissional",
    price: "89,90",
    suffix: "/mês",
    contract: "R$ 0 de taxa de criação · Contrato de 12 meses",
    ideal: "Para serviços, consultores e ofertas diretas",
    description: "Página de alta conversão criada no padrão Avancini Dash para atrair contatos, clientes e agendamentos.",
    features: [
      "Estratégia, texto persuasivo e design personalizado",
      "Formulário e botão de WhatsApp integrados",
      "Versão mobile ultrarrápida, performance e publicação",
      "Endereço na rede Avancini incluso (R$ 0 de entrada)",
      "Opção de .com.br próprio (+ R$ 49,90 no 1º mês sob consulta de disponibilidade)",
      "Hospedagem de alta velocidade, SSL, suporte e 1 ajuste mensal",
    ],
    cta: "Quero a Landing Page",
    featured: true,
  },
  {
    id: "site-catalogo",
    name: "Site Catálogo / Vitrine",
    price: "179,90",
    suffix: "/mês",
    contract: "R$ 0 de taxa de criação · Contrato de 12 meses",
    ideal: "Para empresas com múltiplos produtos ou catálogo de serviços",
    description: "Estrutura completa com vitrine de produtos, fotos, detalhes e orçamentos diretos no WhatsApp.",
    features: [
      "Apresentação completa de múltiplos produtos ou serviços",
      "Catálogo dinâmico com fotos e especificações",
      "Botão de orçamento ou simulação no WhatsApp em cada item",
      "Opção de .com.br próprio (+ R$ 49,90 no 1º mês sob consulta de disponibilidade)",
      "Hospedagem, SSL, publicação, suporte e atualizações",
    ],
    cta: "Planejar meu Catálogo",
    featured: false,
  },
  {
    id: "combo-chatbot",
    name: "Combo Site + Chatbot",
    price: "249,90",
    suffix: "/mês",
    contract: "12 meses · Vitrine + WhatsApp Automático",
    ideal: "Para quem quer atrair no site e triar no WhatsApp 24/7",
    description: "Sua landing page profissional integrada ao fluxo de chatbot inteligente do Avancini Sync no WhatsApp.",
    features: [
      "Landing Page Profissional completa",
      "Chatbot WhatsApp com triagem e respostas automáticas 24/7",
      "Encaminhamento inteligente de contatos",
      "Domínio e hospedagem inclusos",
      "Suporte e 1 ajuste mensal no site e no bot",
    ],
    cta: "Quero o Combo Chatbot",
    featured: false,
  },
  {
    id: "combo-ia",
    name: "Combo Site + Atendente IA",
    price: "429,90",
    suffix: "/mês",
    contract: "12 meses · Vitrine + Inteligência Artificial 24/7",
    ideal: "Para empresas que buscam máxima autoridade e atendimento com IA",
    description: "Sua vitrine de alta conversão integrada ao atendente com IA treinado na sua base para qualificar oportunidades em tempo real.",
    features: [
      "Site ou Landing Page completa de alto padrão",
      "Atendente com Inteligência Artificial no WhatsApp/Instagram",
      "Respostas contextualizadas e qualificação de leads",
      "Transbordo humano quando o cliente estiver pronto",
      "Hospedagem, suporte, acompanhamento e evolução contínua",
    ],
    cta: "Quero o Combo com IA",
    featured: true,
  },
] as const;

type ContractModel = "Assinatura mensal" | "Pagamento único" | "Quero entender as duas opções";

const planOptions: Record<ContractModel, readonly string[]> = {
  "Assinatura mensal": [
    "Landing Pro — R$ 399,90 + R$ 49,90/mês",
    "Landing Start — R$ 89,90/mês sem implantação · 6 meses",
    "Site Institucional — a partir de R$ 599,90 + R$ 79,90/mês",
    "Projeto Sob Medida — catálogo, loja ou função especial",
    "Quero ajuda para escolher o plano",
  ],
  "Pagamento único": [
    "Landing de Conversão — solicitar orçamento",
    "Site Institucional — solicitar orçamento",
    "Projeto Sob Medida — solicitar orçamento",
    "Quero explicar minha necessidade",
  ],
  "Quero entender as duas opções": [
    "Landing de Conversão",
    "Site Institucional",
    "Projeto Sob Medida — catálogo, loja ou função especial",
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
  const [plan, setPlan] = useState("Landing Pro — R$ 399,90 + R$ 49,90/mês");
  const [segment, setSegment] = useState("");
  const [domain, setDomain] = useState("Quero conectar meu domínio próprio");
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
    setDomain(selected.includes("Start") ? "Quero usar o endereço Avancini incluso" : "Quero conectar meu domínio próprio");
    trackMarketingEvent("plan_selected", { plan: selected });
    moveToBriefing();
  };

  const chooseInstitutional = () => {
    setModel("Assinatura mensal");
    setPlan("Site Institucional — a partir de R$ 599,90 + R$ 79,90/mês");
    setDomain("Quero conectar meu domínio próprio");
    trackMarketingEvent("institutional_plan_selected");
    moveToBriefing();
  };

  const chooseCustom = () => {
    setModel("Pagamento único");
    setPlan("Projeto Sob Medida — solicitar orçamento");
    setDomain(domainOptions["Pagamento único"][0]);
    trackMarketingEvent("custom_quote_selected");
    moveToBriefing();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackLead("briefing_planos", { model, plan, segment: segment || "não informado" });
    const message = [
      "Olá! Vim pela página da Avancini Dash e quero começar meu projeto.",
      `Modelo: ${model}`,
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
          <span className="logo-mark avancini-a-mark" aria-hidden="true"><i /></span>
          <span><span className="brand-name">AVANCINI <b>DASH</b></span><small>Uma solução Avancini OS</small></span>
        </Link>
        <nav className="sub-header-actions" aria-label="Navegação da página de planos">
          <Link href="/dash" className="sub-back-link"><b aria-hidden="true">←</b><span>Voltar para o site</span></Link>
          <a href="#planos" className="sub-header-link"><span>Ver planos</span><b aria-hidden="true">↓</b></a>
        </nav>
      </header>

      <section className="sub-hero">
        <div className="sub-art" aria-hidden="true"><span className="sub-a-mark avancini-a-mark"><i /></span></div>
        <div className="sub-hero-copy">
          <span className="sub-kicker"><i /> Condições de lançamento</span>
          <h1>Comece do jeito que cabe agora. Cresça sem trocar de estrutura.</h1>
          <p>Escolha domínio próprio, entrada zero, site institucional com catálogo ou um projeto sob medida. A qualidade de estratégia, design e desenvolvimento permanece a mesma.</p>
          <div className="sub-actions">
            <a href="#planos" className="button button-primary" onClick={() => trackMarketingEvent("hero_subscription_click")}>Comparar opções <span>↗</span></a>
            <button type="button" className="button button-ghost" onClick={chooseInstitutional}>Quero um site completo</button>
          </div>
          <div className="sub-price-line">
            <div><small>LANDING PAGE</small><strong>R$ 89,90</strong><em>por mês</em><span>R$ 0 criação · 12 meses</span></div>
            <div><small>CATÁLOGO / VITRINE</small><strong>R$ 179,90</strong><em>por mês</em><span>múltiplos produtos e serviços</span></div>
            <div><small>COMBO CHATBOT</small><strong>R$ 249,90</strong><em>por mês</em><span>site + WhatsApp automático</span></div>
            <div><small>COMBO IA</small><strong>R$ 429,90</strong><em>por mês</em><span>site + Atendente IA 24/7</span></div>
          </div>
          <div className="sub-microproof"><span>Mesma qualidade em todas as opções</span><span>Hospedagem e SSL inclusos</span><span>Domínio próprio ou endereço Avancini</span></div>
        </div>
      </section>

      <section className="sub-benefits">
        <div><b>01</b><span>Você envia as informações</span></div>
        <div><b>02</b><span>A Avancini cria e publica</span></div>
        <div><b>03</b><span>Você recebe contatos</span></div>
      </section>

      <section className="sub-portfolio-first" aria-labelledby="portfolio-first-title">
        <div className="sub-portfolio-heading">
          <span>PORTFÓLIO / PROJETOS APLICADOS</span>
          <h2 id="portfolio-first-title">Primeiro veja o nível.<br />Depois escolha o plano.</h2>
          <p>Um redesign para uma empresa que já tinha site e uma criação completa para outra que começou do zero.</p>
        </div>
        <div className="sub-portfolio-rail">
          <a href="#cases" className="sub-portfolio-card portfolio-san">
            <Image src="/projects/san-diego.jpg" alt="Projeto de redesign Clínica San Diego" width={1264} height={840} sizes="(max-width: 760px) 92vw, 47vw" quality={82} />
            <span><small>01 / REDESIGN</small><strong>Clínica San Diego</strong><b>Explorar projeto ↗</b></span>
          </a>
          <a href="#cases" className="sub-portfolio-card portfolio-tape">
            <Image src="/projects/tape-car.png" alt="Projeto criado do zero para Tape Car" width={1264} height={840} sizes="(max-width: 760px) 92vw, 47vw" quality={82} />
            <span><small>02 / CRIAÇÃO DO ZERO</small><strong>Tape Car</strong><b>Explorar projeto ↗</b></span>
          </a>
        </div>
        <a className="sub-portfolio-more" href="#cases">Ver os projetos completos e rolar por dentro das telas <span>↓</span></a>
      </section>

      <section className="sub-fit" aria-labelledby="sub-fit-title">
        <div>
          <span>LANDING OU SITE: QUAL FAZ SENTIDO PARA VOCÊ?</span>
          <h2 id="sub-fit-title">A escolha começa pelo que você quer alcançar.</h2>
          <p>Não escolha pela quantidade de páginas. Escolha pela forma como o cliente precisa conhecer e contratar sua empresa.</p>
        </div>
        <div className="sub-fit-grid">
          <article>
            <small>ESCOLHA LANDING SE...</small>
            <h3>Landing de Conversão</h3>
            <p>Você quer divulgar uma oferta específica e levar a pessoa direto para uma ação, como pedir orçamento, agendar ou chamar no WhatsApp.</p>
            <div><span>Clínica divulgando avaliação</span><span>Energia solar captando simulações</span><span>Serviço local recebendo pedidos</span></div>
          </article>
          <article>
            <small>ESCOLHA SITE SE...</small>
            <h3>Site Institucional</h3>
            <p>Você precisa apresentar a empresa inteira, explicar vários serviços e construir autoridade antes do cliente entrar em contato.</p>
            <div><span>Escritório apresentando atuações</span><span>Imobiliária exibindo portfólio</span><span>Clínica mostrando equipe e estrutura</span></div>
          </article>
        </div>
        <p className="sub-fit-decision"><b>Em uma frase:</b> landing vende uma oferta; site apresenta e fortalece a empresa.</p>
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
              ✨ Contrato 12 Meses <span className="badge-pill">R$ 0 Criação</span>
            </button>
            <button
              type="button"
              className={fidelityMode === "sem-fidelidade" ? "active" : ""}
              onClick={() => setFidelityMode("sem-fidelidade")}
            >
              🔓 Sem Fidelidade <span className="badge-pill">Cancele quando quiser</span>
            </button>
          </div>
        </div>

        <div className="sub-plan-grid">
          {plans.map((item, index) => {
            const isFidelity = fidelityMode === "com-fidelidade";
            const contractText = isFidelity
              ? item.contract
              : item.name.includes("Landing")
                ? "Taxa única de criação: R$ 490 à vista · Sem permanência"
                : item.name.includes("Catálogo")
                  ? "Taxa única de criação: R$ 790 à vista · Sem permanência"
                  : item.name.includes("Chatbot")
                    ? "Taxa única de criação: R$ 690 à vista · Sem permanência"
                    : "Taxa única de criação: R$ 990 à vista · Sem permanência";
            return (
            <article className={item.featured ? "sub-plan featured" : "sub-plan"} id={`plano-${item.id}`} key={item.id}>
              {item.featured && <small className="sub-popular">{isFidelity ? "CONTRATO 12 MESES" : "SEM FIDELIDADE"}</small>}
              <span className="sub-plan-code">0{index + 1} / PLANO ATIVO</span>
              <em className="sub-plan-ideal">{item.ideal}</em>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="sub-plan-price"><sup>R$</sup><strong>{item.price}</strong><span>{item.suffix}</span></div>
              <small className="sub-contract">{contractText}</small>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="sub-plan-actions">
                <button type="button" onClick={() => choosePlan(`${item.name} — R$ ${item.price}${item.suffix === "/mês" ? "/mês" : " de implantação"}`)}>{item.cta} <span>↗</span></button>
                <a href={whatsappFor(`Olá! Tenho uma dúvida sobre a ${item.name} e suas condições de implantação, hospedagem e suporte.`)} target="_blank" rel="noreferrer" onClick={() => trackLead("duvida_plano_assinatura", { plan: item.name })}>Tirar uma dúvida</a>
              </div>
            </article>
            );
          })}

        </div>
        <div className="custom-offer" id="projeto-sob-medida">
          <div><small>NÃO CABE EM UM PLANO FECHADO?</small><h3>Projeto Sob Medida</h3><p>Catálogo avançado, loja virtual, agendamento, integrações ou uma necessidade específica. Montamos escopo, prazo e investimento de acordo com a realidade e o momento da sua empresa.</p></div>
          <button type="button" onClick={chooseCustom}>Montar meu projeto <b>↗</b></button>
        </div>
        <section className="sub-comparison" aria-labelledby="comparison-title">
          <header>
            <small>COMPARAÇÃO DIRETA</small>
            <h3 id="comparison-title">O padrão é o mesmo. Veja exatamente o que muda.</h3>
            <p>Sem esconder implantação, endereço ou permanência. Você escolhe pela realidade da empresa — nunca por diferença de qualidade.</p>
          </header>
          <div className="sub-comparison-scroll">
            <table>
              <thead><tr><th>O que comparar</th><th>Landing Pro</th><th>Landing Start</th><th>Site Institucional</th></tr></thead>
              <tbody>
                <tr><th>Qualidade de criação</th><td>Estratégia, texto e design personalizados</td><td><b>A mesma qualidade da Pro</b></td><td>Estratégia, texto e design personalizados</td></tr>
                <tr><th>Implantação</th><td>R$ 399,90</td><td><b>Sem entrada</b></td><td>A partir de R$ 599,90</td></tr>
                <tr><th>Hospedagem e suporte</th><td>R$ 49,90/mês</td><td>R$ 89,90/mês</td><td>A partir de R$ 79,90/mês</td></tr>
                <tr><th>Endereço</th><td>Domínio próprio do cliente</td><td>Endereço Avancini incluso</td><td>Domínio próprio do cliente</td></tr>
                <tr><th>Permanência mínima</th><td>Não</td><td><b>6 meses</b></td><td>Não, salvo condição definida na proposta</td></tr>
                <tr><th>Produtos e serviços</th><td>Uma oferta principal</td><td>Uma oferta principal</td><td>Vários serviços e catálogo, quando necessário</td></tr>
              </tbody>
            </table>
          </div>
          <div className="sub-comparison-notes">
            <p><b>1 pequeno ajuste mensal inclui:</b> trocar texto, imagem, telefone, horário ou informação já existente.</p>
            <p><b>Recebe orçamento separado:</b> nova seção, nova página, integração, funcionalidade ou reformulação.</p>
          </div>
        </section>
        <div className="sub-domain-note"><b>Você escolhe o endereço:</b> Endereço na rede Avancini incluso (R$ 0 de entrada) ou <strong>Domínio Próprio .com.br</strong> (+ taxa de registro anual de R$ 49,90 no 1º mês, sob consulta prévia de disponibilidade do nome desejado no Registro.br). Caso você já possua um domínio registrado, a conexão é 100% gratuita.</div>
        <div className="sub-delivery" aria-label="Etapas e prazos de entrega">
          <div><small>CONTEÚDO PRONTO, CRIAÇÃO EM MOVIMENTO</small><strong>Prazo combinado antes do início.</strong><p>A contagem começa depois que textos, imagens e informações necessárias forem enviados.</p></div>
          <span><b>7 dias</b><small>Estrutura direta</small></span>
          <span><b>15 dias</b><small>Projeto intermediário</small></span>
          <span><b>30 dias</b><small>Estrutura completa</small></span>
        </div>
      </section>

      <section className="sub-section sub-choice">
        <div className="sub-heading compact">
          <span>DUAS FORMAS DE CONTRATAR</span>
          <h2>A qualidade é a mesma. O que muda é o endereço e como você paga.</h2>
        </div>
        <div className="sub-choice-grid">
          <article>
            <span>CONTRATO 12 MESES · ENTRADA R$ 0</span><h3>Assinatura com fidelidade</h3>
            <p>Você não paga nada pela taxa de criação do site. Apenas a mensalidade a partir de R$ 89,90/mês com hospedagem, SSL, suporte e manutenção contínua inclusos.</p>
            <ul><li>Taxa de criação: R$ 0</li><li>Hospedagem e SSL de alta velocidade inclusos</li><li>1 ajuste/atualização mensal gratuita</li><li>Domínio próprio .com.br ou endereço Avancini</li></ul>
            <a href="#planos">Ver os planos anuais <b>↗</b></a>
          </article>
          <article>
            <span>SEM FIDELIDADE · CANCELE QUANDO QUISER</span><h3>Opção sem fidelidade</h3>
            <p>Para quem prefere não ter contrato de permanência: taxa única de criação de <strong>R$ 490,00 à vista</strong> + <strong>R$ 89,90/mês</strong> de hospedagem e suporte com cancelamento livre a qualquer momento.</p>
            <ul><li>Taxa única de criação: R$ 490,00 à vista</li><li>Mensalidade avulsa: R$ 89,90/mês</li><li>Sem permanência mínima · Cancele quando quiser</li><li>Manutenção e suporte ativos enquanto assinar</li></ul>
            <button type="button" onClick={chooseCustom}>Contratar sem fidelidade (R$ 490 + R$ 89,90/mês) <b>↗</b></button>
          </article>
        </div>
      </section>

      <section className="sub-section sub-projects" id="cases">
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
                <div className="device-top"><i /><i /><i /><span>avancini.dash / redesign san diego</span><b>ROLE ↓</b></div>
                {/* Região rolável precisa receber foco para também funcionar por teclado. */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div className="project-scroll" role="region" tabIndex={0} aria-label="Demonstração rolável completa do projeto Clínica San Diego">
                  <Image src="/projects/san-diego-full.png" alt="Captura completa da proposta de redesign da Clínica San Diego" width={1264} height={6720} sizes="(max-width: 760px) 92vw, 56vw" quality={82} />
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
                <div className="device-top"><i /><i /><i /><span>avancini.dash / projeto tape car</span><b>ROLE ↓</b></div>
                {/* Região rolável precisa receber foco para também funcionar por teclado. */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div className="project-scroll" role="region" tabIndex={0} aria-label="Demonstração rolável completa do projeto Tape Car">
                  <Image src="/projects/tape-car-full.png" alt="Captura completa do projeto Tape Car" width={1264} height={5388} sizes="(max-width: 760px) 92vw, 56vw" quality={82} />
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
          <details name="subscription-faq" open><summary>Como funciona o domínio?</summary><p>Na Landing Pro e no Site Institucional, conectamos um domínio próprio fornecido por você. Na Landing Start, usamos um endereço dentro da estrutura Avancini. Um domínio novo é registrado e renovado pelo cliente, sempre em seu nome.</p></details>
          <details name="subscription-faq"><summary>Posso pedir alterações?</summary><p>A contratação recorrente inclui um pequeno ajuste mensal, como trocar texto, imagem, telefone ou informação existente. Novas seções, funcionalidades ou reformulações recebem orçamento separado. No pagamento único, alterações posteriores entram na manutenção opcional.</p></details>
          <details name="subscription-faq"><summary>Posso pagar diretamente pelo site?</summary><p>Sim. Depois de confirmarmos plano, domínio, conteúdo e contrato, você recebe um link seguro para pagamento. Assim nenhuma cobrança acontece antes de validarmos que a opção escolhida atende sua empresa.</p></details>
          <details name="subscription-faq"><summary>Existe permanência mínima?</summary><p>Somente a Landing Start, que não possui taxa de implantação, exige permanência mínima de 6 meses. As demais condições são informadas claramente na proposta antes da contratação.</p></details>
          <details name="subscription-faq"><summary>O que acontece se eu cancelar?</summary><p>Ao encerrar um plano recorrente, hospedagem, suporte e publicação são desativados. Na Landing Start, isso acontece depois dos 6 meses mínimos. O domínio registrado pelo cliente e todo material fornecido por ele continuam sendo dele. A transferência dos arquivos do projeto faz parte apenas do pagamento único quando estiver prevista na proposta.</p></details>
          <details name="subscription-faq"><summary>A Landing Start tem qualidade inferior?</summary><p>Não. Landing Start e Landing Pro recebem a mesma estratégia, texto, design, versão mobile e cuidado de desenvolvimento. A diferença é somente o endereço e a forma de contratação: a Start usa um endereço Avancini; a Pro utiliza o domínio próprio do cliente.</p></details>
          <details name="subscription-faq"><summary>Posso ter produtos no site?</summary><p>Sim. O Site Institucional pode apresentar produtos ou serviços em catálogo e levar o pedido ao WhatsApp. Carrinho, pagamento, estoque e frete fazem parte de uma Loja Virtual sob medida.</p></details>
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
          <button type="submit">Continuar pelo WhatsApp <span>↗</span></button>
          <small>Sem compromisso · conversa direta</small>
        </form>
      </section>

      <footer className="sub-footer">
        <Link className="logo" href="/dash"><span className="logo-mark avancini-a-mark" aria-hidden="true"><i /></span><span><span className="brand-name">AVANCINI <b>DASH</b></span><small>Uma solução Avancini OS</small></span></Link>
        <span>Landings de conversão · Sites institucionais · Atendimento em todo o Brasil</span>
        <nav className="sub-footer-legal" aria-label="Informações legais"><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link></nav>
        <Link href="/dash">Conhecer a Avancini Dash <b>↗</b></Link>
      </footer>
    </main>
  );
}
