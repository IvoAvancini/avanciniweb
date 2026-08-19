"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState, type FormEvent } from "react";

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;
const whatsapp = whatsappFor(
  "Olá! Conheci a Avancini Web e quero conversar sobre o site da minha empresa.",
);
const services = [
  {
    number: "01",
    label: "LANDINGS DE CONVERSÃO",
    title: "Uma página. Um objetivo. Mais conversão.",
    text: "Páginas estratégicas para campanhas, lançamentos e captação de contatos, com uma mensagem que conduz o visitante até a ação.",
    tag: "Performance e conversão",
    type: "landing",
    journey: ["Oferta", "Prova", "Contato"],
  },
  {
    number: "02",
    label: "SITES INSTITUCIONAIS",
    title: "Um site capaz de apresentar, convencer e vender.",
    text: "Sites autorais para posicionar sua empresa, apresentar serviços, organizar catálogos ou vender online — sempre com uma experiência coerente com sua marca.",
    tag: "Autoridade, estrutura e vendas",
    type: "institutional",
    journey: ["Estrutura", "Confiança", "Ação"],
  },
] as const;

const offers = [
  {
    name: "Landing de Conversão",
    price: "R$ 97/mês",
    deadline: "Sem entrada · permanência mínima de 6 meses",
    description: "Uma jornada direta para divulgar uma oferta específica e transformar visitas em contatos.",
    includes: ["Foco em uma única oferta", "Hospedagem, WhatsApp e suporte", "1 pequeno ajuste por mês"],
    ideal: "Ideal para anúncios, campanhas e serviços específicos",
    cta: "Quero uma landing",
    message: "Olá! Quero contratar a Landing de Conversão por R$ 97/mês e entender os próximos passos.",
    featured: false,
  },
  {
    name: "Site Institucional",
    price: "R$ 199,90/mês",
    deadline: "Sem entrada · permanência mínima de 6 meses",
    description: "Uma presença completa para organizar a empresa, seus serviços, diferenciais e caminhos de contato.",
    includes: ["Estrutura e navegação completas", "Hospedagem, WhatsApp e suporte", "1 pequeno ajuste por mês"],
    ideal: "Ideal para apresentar toda a empresa e gerar autoridade",
    cta: "Quero um site institucional",
    message: "Olá! Quero contratar o Site Institucional por R$ 199,90/mês e entender os próximos passos.",
    featured: true,
  },
  {
    name: "Projeto Exclusivo",
    price: "Sob orçamento",
    deadline: "Escopo, prazo e valor personalizados",
    description: "A mesma qualidade de criação, contratada uma única vez, com propriedade do projeto e continuidade sob sua escolha.",
    includes: ["Mesmo padrão de estratégia e design", "Pagamento único", "Domínio próprio e exclusivo", "Manutenção opcional"],
    ideal: "Ideal para quem prefere adquirir o projeto e decidir depois sobre manutenção",
    cta: "Solicitar orçamento",
    message: "Olá! Preciso de um Projeto Exclusivo e quero solicitar um orçamento personalizado.",
    featured: false,
  },
] as const;

type ContractModel = "Assinatura mensal" | "Pagamento único" | "Quero entender as duas opções";

const briefingOptions: Record<
  ContractModel,
  readonly { project: string; investments: readonly string[] }[]
> = {
  "Assinatura mensal": [
    {
      project: "Landing de Conversão — plano mensal",
      investments: ["R$ 97/mês — Landing de Conversão"],
    },
    {
      project: "Site institucional — plano mensal",
      investments: ["R$ 199,90/mês — Site institucional"],
    },
    {
      project: "Ainda não sei qual plano escolher",
      investments: [
        "Quero uma recomendação entre os planos",
        "Até R$ 97/mês",
        "Até R$ 199,90/mês",
      ],
    },
  ],
  "Pagamento único": [
    {
      project: "Landing de Conversão — pagamento único",
      investments: ["Solicitar orçamento para uma landing"],
    },
    {
      project: "Site institucional — pagamento único",
      investments: ["Solicitar orçamento para um site institucional"],
    },
    {
      project: "Projeto exclusivo ou mais complexo",
      investments: ["Solicitar orçamento personalizado"],
    },
    {
      project: "Ainda não sei qual estrutura preciso",
      investments: ["Quero uma recomendação e um orçamento"],
    },
  ],
  "Quero entender as duas opções": [
    {
      project: "Landing de Conversão",
      investments: ["Comparar mensalidade e pagamento único"],
    },
    {
      project: "Site institucional",
      investments: ["Comparar mensalidade e pagamento único"],
    },
    {
      project: "Projeto mais completo ou exclusivo",
      investments: ["Entender qual contratação faz mais sentido"],
    },
    {
      project: "Ainda não sei",
      investments: ["Quero receber uma recomendação"],
    },
  ],
};

const contractModelHelp: Record<ContractModel, string> = {
  "Assinatura mensal": "Planos sem entrada, com hospedagem, suporte e permanência mínima de 6 meses.",
  "Pagamento único": "Projeto adquirido uma única vez, com domínio próprio e manutenção opcional.",
  "Quero entender as duas opções": "Você recebe uma comparação clara para decidir sem compromisso.",
};

const heroSlides = [
  {
    id: "atlas",
    domain: "atlas.imoveis / projeto conceito",
    image: "/concepts/atlas-villa.webp",
    alt: "Villa contemporânea do projeto fictício Atlas Imóveis",
    brand: "ATLAS.",
    nav: ["Imóveis", "Lançamentos", "Contato"],
    cta: "AGENDAR VISITA",
    eyebrow: "IMÓVEIS DE ALTO PADRÃO",
    title: (
      <>
        O endereço da sua
        <br />
        <em>próxima conquista.</em>
      </>
    ),
    description:
      "Residências selecionadas para quem entende que viver bem também é uma decisão de patrimônio.",
    button: "EXPLORAR IMÓVEIS ↗",
    proof: "32",
    proofText: (
      <>
        imóveis
        <br />
        exclusivos
      </>
    ),
    niche: "Mercado imobiliário",
    chip: "Desejo que vira visita",
  },
  {
    id: "brasa",
    domain: "brasa73.com / projeto conceito",
    image: "/concepts/brasa-dining.jpg",
    alt: "Prato autoral do restaurante fictício Brasa 73",
    brand: "BRASA 73",
    nav: ["Menu", "Experiência", "Reservas"],
    cta: "RESERVAR MESA",
    eyebrow: "COZINHA AUTORAL",
    title: (
      <>
        Uma noite para
        <br />
        <em>lembrar pelo sabor.</em>
      </>
    ),
    description:
      "Ingredientes locais, fogo e técnica em uma experiência criada para permanecer na memória.",
    button: "CONHECER O MENU ↗",
    proof: "4.9",
    proofText: (
      <>
        avaliação
        <br />
        dos clientes
      </>
    ),
    niche: "Gastronomia premium",
    chip: "Experiência que lota mesas",
  },
  {
    id: "moreira",
    domain: "moreiralima.adv / projeto conceito",
    image: "/concepts/moreira-law.jpg",
    alt: "Advogados em reunião no projeto fictício Moreira e Lima",
    brand: "M&L",
    nav: ["Atuação", "Escritório", "Conteúdo"],
    cta: "FALAR COM ESPECIALISTA",
    eyebrow: "DIREITO EMPRESARIAL",
    title: (
      <>
        Segurança jurídica
        <br />
        <em>para avançar.</em>
      </>
    ),
    description:
      "Estratégia legal clara para empresas que tomam decisões importantes todos os dias.",
    button: "CONHECER O ESCRITÓRIO ↗",
    proof: "18",
    proofText: (
      <>
        anos de
        <br />
        experiência
      </>
    ),
    niche: "Advocacia empresarial",
    chip: "Autoridade antes da reunião",
  },
  {
    id: "nexa",
    domain: "nexa.solar / landing page conceito",
    image: "/concepts/atlas-villa.webp",
    alt: "Residência atendida pela empresa fictícia Nexa Solar",
    brand: "NEXA SOLAR",
    nav: ["Como funciona", "Economia", "Projetos"],
    cta: "SIMULAR ECONOMIA",
    eyebrow: "ENERGIA SOLAR INTELIGENTE",
    title: <>Energia que reduz sua conta.</>,
    description: "Uma landing page construída para transformar economia estimada em pedidos de orçamento.",
    button: "QUERO SIMULAR ↗",
    proof: "até 95%",
    proofText: <>de redução<br />na conta</>,
    niche: "Landing · Energia solar",
    chip: "Simulação que gera orçamento",
  },
  {
    id: "vitta",
    domain: "vitta.implantes / landing page conceito",
    image: "/concepts/lumina-clinic.jpg",
    alt: "Atendimento da clínica fictícia Vitta Implantes",
    brand: "VITTA",
    nav: ["Tratamento", "Especialistas", "Depoimentos"],
    cta: "AGENDAR AVALIAÇÃO",
    eyebrow: "IMPLANTES DENTÁRIOS",
    title: <>Volte a sorrir com segurança.</>,
    description: "Oferta clara, confiança clínica e agendamento direto em uma página focada em conversão.",
    button: "QUERO MINHA AVALIAÇÃO ↗",
    proof: "+1.800",
    proofText: <>sorrisos<br />transformados</>,
    niche: "Landing · Implantes",
    chip: "Confiança que vira avaliação",
  },
  {
    id: "apexprotect",
    domain: "apex.protect / landing page conceito",
    image: "/concepts/apex-cars.jpg",
    alt: "Veículo premium protegido pela empresa fictícia Apex Protect",
    brand: "APEX PROTECT",
    nav: ["Proteção", "Resultados", "Garantia"],
    cta: "PEDIR ORÇAMENTO",
    eyebrow: "PROTEÇÃO AUTOMOTIVA PREMIUM",
    title: <>Seu carro, impecável por mais tempo.</>,
    description: "Uma oferta visual e objetiva para vender vitrificação, PPF e proteção de pintura.",
    button: "PROTEGER MEU CARRO ↗",
    proof: "10 anos",
    proofText: <>de garantia<br />no PPF</>,
    niche: "Landing · Proteção automotiva",
    chip: "Desejo que vira orçamento",
  },
] as const;

const previewProjects = {
  landing: {
    name: "LUMINA",
    kind: "Landing page · Estética avançada",
    accent: "rose",
    pages: [
      {
        label: "Início",
        eyebrow: "PROTOCOLO EXCLUSIVO",
        title: "Sua pele, sua melhor versão.",
        text: "Uma abertura emocional, oferta clara e ação imediata para transformar interesse em avaliação.",
        metric: "+2.400 clientes atendidas",
      },
      {
        label: "Tratamentos",
        eyebrow: "JORNADA PERSONALIZADA",
        title: "Cada pele pede um cuidado único.",
        text: "Benefícios, protocolos e diferenciais organizados para reduzir dúvidas e aumentar confiança.",
        metric: "6 protocolos exclusivos",
      },
      {
        label: "Conversão",
        eyebrow: "AVALIAÇÃO INICIAL",
        title: "Seu novo ritual começa aqui.",
        text: "Uma chamada final forte, depoimentos e formulário curto levando a visitante ao agendamento.",
        metric: "Agenda integrada",
      },
    ],
  },
  institutional: {
    name: "VÉRTICE.",
    kind: "Site institucional · Arquitetura",
    accent: "earth",
    pages: [
      {
        label: "Início",
        eyebrow: "ARQUITETURA AUTORAL",
        title: "Projetos que atravessam o tempo.",
        text: "A primeira tela posiciona o escritório e transforma portfólio em desejo.",
        metric: "48 projetos entregues",
      },
      {
        label: "Projetos",
        eyebrow: "PORTFÓLIO SELECIONADO",
        title: "Espaços pensados para pertencer.",
        text: "Uma galeria editorial apresenta residências, detalhes e conceitos sem poluir a experiência.",
        metric: "12 anos de trajetória",
      },
      {
        label: "Escritório",
        eyebrow: "MÉTODO VÉRTICE",
        title: "Do primeiro traço à entrega.",
        text: "Processo, equipe e contato encerram a narrativa com autoridade e proximidade.",
        metric: "Atendimento personalizado",
      },
    ],
  },
  commerce: {
    name: "ÁUREA",
    kind: "Site completo · Skincare botânico",
    accent: "sand",
    pages: [
      {
        label: "Coleção",
        eyebrow: "RITUAL ESSENCIAL",
        title: "Menos excessos. Mais pele.",
        text: "Uma vitrine limpa que apresenta propósito, benefícios e produtos desde o primeiro olhar.",
        metric: "Rotina a partir de R$ 89",
      },
      {
        label: "Produto",
        eyebrow: "SÉRUM LUMINOSO",
        title: "Potência botânica, textura leve.",
        text: "Ingredientes, resultados e modo de uso organizados para facilitar a decisão de compra.",
        metric: "4.9 · 186 avaliações",
      },
      {
        label: "Carrinho",
        eyebrow: "COMPRA SEM ATRITO",
        title: "Seu ritual está quase completo.",
        text: "Resumo claro, frete visível e segurança para conduzir a cliente até o pagamento.",
        metric: "Frete grátis acima de R$ 199",
      },
    ],
  },
} as const;

type PreviewType = keyof typeof previewProjects;
type NicheType = "cars" | "fashion" | "realestate" | "fastfood";

const nicheModels = [
  {
    type: "cars" as const,
    number: "01",
    label: "LOJA DE CARROS",
    brand: "APEX MOTORS",
    title: "Do estoque à simulação.",
    text: "Catálogo, filtros, avaliação do usado, financiamento e contato comercial.",
    image: "/concepts/apex-cars.jpg",
    proof: "+120",
    proofLabel: "veículos selecionados",
    chips: ["Procedência", "Financiamento", "Avaliação"],
  },
  {
    type: "fashion" as const,
    number: "02",
    label: "MODA & ROUPAS",
    brand: "NOMA",
    title: "Da coleção ao carrinho.",
    text: "Campanha editorial, categorias, produto, tamanhos e compra sem atrito.",
    image: "/concepts/noma-fashion.jpg",
    proof: "DROP 04",
    proofLabel: "coleção limitada",
    chips: ["Editorial", "Tamanhos", "Checkout"],
  },
  {
    type: "realestate" as const,
    number: "03",
    label: "IMOBILIÁRIA",
    brand: "ATLAS IMÓVEIS",
    title: "Da busca à visita.",
    text: "Pesquisa inteligente, imóveis, bairros, prova de autoridade e agendamento.",
    image: "/concepts/atlas-villa.webp",
    proof: "24",
    proofLabel: "endereços exclusivos",
    chips: ["Curadoria", "Bairros", "Visitas"],
  },
  {
    type: "fastfood" as const,
    number: "04",
    label: "FAST-FOOD",
    brand: "BRASA BURGER",
    title: "Da fome ao pedido.",
    text: "Oferta visual, cardápio, combos, adicionais e pedido direto no celular.",
    image: "/concepts/brasa-burger.png",
    proof: "30–45",
    proofLabel: "minutos para chegar",
    chips: ["Cardápio", "Combos", "Pedido"],
  },
];

function PreviewCanvas({ type, slide }: { type: PreviewType; slide: number }) {
  if (type === "landing") {
    if (slide === 0)
      return (
        <div className="concept-screen lumina-home">
          <img
            src="/concepts/lumina-clinic.jpg"
            alt="Atendimento estético Lumina"
          />
          <div className="concept-screen-nav">
            <strong>LUMINA</strong>
            <span>Tratamentos&nbsp;&nbsp; Sobre&nbsp;&nbsp; Resultados</span>
            <b>AGENDAR</b>
          </div>
          <div className="lumina-home-copy">
            <small>ESTÉTICA AVANÇADA</small>
            <h3>
              Sua pele,
              <br />
              <em>sem excessos.</em>
            </h3>
            <p>
              Protocolos personalizados para resultados naturais e uma relação
              mais leve com o espelho.
            </p>
            <b>QUERO MINHA AVALIAÇÃO ↗</b>
          </div>
          <div className="lumina-seal">
            +2.400
            <br />
            <span>clientes atendidas</span>
          </div>
        </div>
      );
    if (slide === 1)
      return (
        <div className="concept-screen lumina-treatments">
          <div className="concept-screen-nav">
            <strong>LUMINA</strong>
            <span>Protocolos selecionados</span>
            <b>02 / 03</b>
          </div>
          <div className="lumina-treatment-intro">
            <small>CUIDADO SOB MEDIDA</small>
            <h3>
              Não existe pele igual.
              <br />
              Nem tratamento deveria.
            </h3>
            <p>
              Uma jornada construída depois de ouvir, avaliar e entender o que
              você realmente deseja.
            </p>
          </div>
          <div className="lumina-treatment-grid">
            <article>
              <span>01</span>
              <b>Glow Natural</b>
              <small>Luminosidade e textura</small>
            </article>
            <article className="with-photo">
              <img
                src="/concepts/lumina-clinic.jpg"
                alt="Procedimento Lumina"
              />
              <span>02</span>
              <b>Firmeza Essencial</b>
              <small>Estímulo e sustentação</small>
            </article>
            <article>
              <span>03</span>
              <b>Renovação</b>
              <small>Uniformidade e viço</small>
            </article>
          </div>
        </div>
      );
    return (
      <div className="concept-screen lumina-booking">
        <div className="concept-screen-nav">
          <strong>LUMINA</strong>
          <span>Seu primeiro passo</span>
          <b>03 / 03</b>
        </div>
        <div className="lumina-proof">
          <small>RESULTADOS REAIS</small>
          <blockquote>
            “Me senti ouvida antes de qualquer procedimento. O resultado ficou
            exatamente como eu queria: natural.”
          </blockquote>
          <span>— Mariana, cliente Lumina</span>
          <div>
            <b>4.9</b>
            <small>186 avaliações verificadas</small>
          </div>
        </div>
        <div className="lumina-form">
          <small>AVALIAÇÃO PERSONALIZADA</small>
          <h3>Vamos cuidar de você?</h3>
          <div className="mock-field">
            Seu nome <span />
          </div>
          <div className="mock-field">
            WhatsApp <span />
          </div>
          <div className="mock-field">
            O que você gostaria de melhorar? <span />
          </div>
          <button>QUERO AGENDAR MINHA AVALIAÇÃO ↗</button>
          <p>Retorno em até 1 hora útil.</p>
        </div>
      </div>
    );
  }

  if (type === "institutional") {
    if (slide === 0)
      return (
        <div className="concept-screen vertice-home-full">
          <img
            src="/concepts/vertice-home.jpg"
            alt="Projeto residencial Vértice"
          />
          <div className="vertice-side-brand">VÉRTICE.</div>
          <div className="vertice-home-nav">
            PROJETOS&nbsp;&nbsp;&nbsp; ESCRITÓRIO&nbsp;&nbsp;&nbsp; CONTATO
          </div>
          <div className="vertice-home-copy">
            <span>RESIDÊNCIA 735 · BAHIA</span>
            <h3>
              Matéria.
              <br />
              Luz.
              <br />
              Silêncio.
            </h3>
            <p>Arquitetura autoral para atravessar gerações.</p>
          </div>
          <b className="vertice-counter">01 / 03</b>
        </div>
      );
    if (slide === 1)
      return (
        <div className="concept-screen vertice-gallery">
          <div className="vertice-gallery-head">
            <strong>VÉRTICE.</strong>
            <span>PROJETOS SELECIONADOS</span>
            <b>02 / 03</b>
          </div>
          <div className="vertice-gallery-grid">
            <article>
              <img src="/concepts/vertice-home.jpg" alt="Residência pátio" />
              <div>
                <b>CASA PÁTIO</b>
                <span>Trancoso · BA</span>
              </div>
            </article>
            <article>
              <img src="/concepts/atlas-villa.webp" alt="Casa horizonte" />
              <div>
                <b>CASA HORIZONTE</b>
                <span>Porto Seguro · BA</span>
              </div>
            </article>
            <article>
              <img src="/concepts/vertice-home.jpg" alt="Residência 735" />
              <div>
                <b>RESIDÊNCIA 735</b>
                <span>Eunápolis · BA</span>
              </div>
            </article>
          </div>
          <p>← ARRASTE PARA EXPLORAR →</p>
        </div>
      );
    return (
      <div className="concept-screen vertice-method">
        <div className="vertice-method-head">
          <strong>VÉRTICE.</strong>
          <span>O ESCRITÓRIO</span>
          <b>03 / 03</b>
        </div>
        <div className="vertice-method-title">
          <small>NOSSO MÉTODO</small>
          <h3>
            Do terreno
            <br />à memória.
          </h3>
          <p>
            Um processo próximo, preciso e profundamente conectado ao modo como
            você deseja viver.
          </p>
        </div>
        <div className="vertice-method-steps">
          <article>
            <span>01</span>
            <b>Escuta</b>
            <p>Rotina, desejos e contexto.</p>
          </article>
          <article>
            <span>02</span>
            <b>Conceito</b>
            <p>Forma, matéria e luz.</p>
          </article>
          <article>
            <span>03</span>
            <b>Realização</b>
            <p>Detalhe até a entrega.</p>
          </article>
        </div>
        <div className="vertice-method-stats">
          <b>
            48<small>projetos</small>
          </b>
          <b>
            12<small>anos</small>
          </b>
          <b>
            07<small>prêmios</small>
          </b>
        </div>
      </div>
    );
  }

  if (slide === 0)
    return (
      <div className="concept-screen aurea-home">
        <div className="aurea-nav">
          <strong>ÁUREA</strong>
          <span>ROSTO&nbsp;&nbsp; CORPO&nbsp;&nbsp; RITUAIS</span>
          <b>SACOLA 0</b>
        </div>
        <div className="aurea-home-copy">
          <small>SKINCARE BOTÂNICO</small>
          <h3>
            Menos etapas.
            <br />
            Mais intenção.
          </h3>
          <p>Fórmulas essenciais para uma rotina que cabe na vida real.</p>
          <b>DESCOBRIR O RITUAL ↗</b>
        </div>
        <img src="/concepts/aurea-skin.jpg" alt="Produtos Áurea" />
        <div className="aurea-ticker">
          VEGANO · CRUELTY FREE · ATIVOS BRASILEIROS · EMBALAGEM CONSCIENTE
        </div>
      </div>
    );
  if (slide === 1)
    return (
      <div className="concept-screen aurea-product">
        <div className="aurea-product-brand">
          ÁUREA <span>02 / 03</span>
        </div>
        <div className="aurea-product-photo">
          <img src="/concepts/aurea-skin.jpg" alt="Sérum Luminoso Áurea" />
          <span>ARRASTE PARA VER DETALHES</span>
        </div>
        <div className="aurea-product-info">
          <small>BEST-SELLER · 30 ML</small>
          <h3>
            Sérum
            <br />
            Luminoso
          </h3>
          <div className="stars">
            ★★★★★ <span>4.9 (186)</span>
          </div>
          <p>
            Vitamina C estabilizada, niacinamida e extrato de açaí para iluminar
            sem sensibilizar.
          </p>
          <ul>
            <li>Textura ultraleve</li>
            <li>Resultados em 21 dias</li>
            <li>Para todos os tipos de pele</li>
          </ul>
          <b>R$ 89</b>
          <button>ADICIONAR À SACOLA</button>
        </div>
      </div>
    );
  return (
    <div className="concept-screen aurea-cart">
      <div className="aurea-cart-head">
        <strong>ÁUREA</strong>
        <span>SUA SACOLA</span>
        <b>03 / 03</b>
      </div>
      <div className="aurea-cart-items">
        <div className="aurea-shipping-progress">
          <div>
            <small>FRETE GRÁTIS DESBLOQUEADO</small>
            <b>Seu ritual viaja por nossa conta.</b>
          </div>
          <span><i /> 100%</span>
        </div>
        <small>SEU RITUAL · 02 PRODUTOS</small>
        <article>
          <img src="/concepts/aurea-skin.jpg" alt="Produto Áurea" />
          <div>
            <b>Sérum Luminoso</b>
            <span>30 ml · Quantidade 1</span>
            <small>Remover</small>
          </div>
          <strong>R$ 89</strong>
        </article>
        <article>
          <div className="aurea-placeholder" />
          <div>
            <b>Creme Barreira</b>
            <span>50 g · Quantidade 1</span>
            <small>Remover</small>
          </div>
          <strong>R$ 109</strong>
        </article>
        <div className="aurea-cart-extra">
          <div className="aurea-extra-image">
            <img src="/concepts/aurea-skin.jpg" alt="Óleo de limpeza Áurea" />
          </div>
          <div>
            <small>COMPLETE O RITUAL</small>
            <b>Óleo de Limpeza Botânico</b>
            <span>Remove impurezas sem ressecar · 100 ml</span>
          </div>
          <strong>+ R$ 72</strong>
        </div>
      </div>
      <aside>
        <small>RESUMO DO PEDIDO</small>
        <h3>Quase seu.</h3>
        <p>
          Subtotal <b>R$ 198</b>
        </p>
        <p>
          Frete <b>Grátis</b>
        </p>
        <div>
          Total <b>R$ 198</b>
        </div>
        <button>FINALIZAR COMPRA ↗</button>
        <div className="aurea-coupon">Tem um cupom? <b>ADICIONAR +</b></div>
        <div className="aurea-payment-options">
          <span><b>PIX</b> 5% de desconto</span>
          <span><b>6×</b> sem juros no cartão</span>
          <span><b>↺</b> primeira troca grátis</span>
        </div>
      </aside>
    </div>
  );
}

function NicheFullPage({ type }: { type: NicheType }) {
  if (type === "cars")
    return (
      <div className="niche-page cars-page">
        <section className="cars-hero">
          <nav>
            <strong>
              APEX<span>MOTORS</span>
            </strong>
            <div>
              ESTOQUE&nbsp;&nbsp; VENDA SEU CARRO&nbsp;&nbsp; FINANCIAMENTO
            </div>
            <b>FALAR COM CONSULTOR</b>
          </nav>
          <img src="/concepts/apex-cars.jpg" alt="Showroom Apex Motors" />
          <div>
            <small>SELEÇÃO PREMIUM · PROCEDÊNCIA GARANTIDA</small>
            <h2>
              Seu próximo carro
              <br />
              começa aqui.
            </h2>
            <p>
              Veículos selecionados, avaliação transparente e uma negociação sem
              surpresa.
            </p>
            <button>VER ESTOQUE ↗</button>
          </div>
          <aside>
            <b>+120</b>
            <span>veículos disponíveis</span>
            <b>4.9</b>
            <span>avaliação dos clientes</span>
          </aside>
        </section>
        <div className="cars-assurance">
          <span><b>01</b> Laudo cautelar completo</span>
          <span><b>02</b> Garantia de procedência</span>
          <span><b>03</b> Entrega em todo o Brasil</span>
        </div>
        <section className="cars-search">
          <span>
            MARCA <b>Todas</b>
          </span>
          <span>
            MODELO <b>Todos</b>
          </span>
          <span>
            FAIXA DE PREÇO <b>Até R$ 250 mil</b>
          </span>
          <button>BUSCAR 48 VEÍCULOS →</button>
        </section>
        <section className="cars-stock">
          <header>
            <small>DESTAQUES DO ESTOQUE</small>
            <h3>Escolhidos para impressionar.</h3>
          </header>
          <div>
            {[
              "Porsche 718 Cayman",
              "BMW 320i M Sport",
              "Audi Q5 Performance",
            ].map((name, i) => (
              <article key={name}>
                <div className={`car-thumb car-${i}`}>
                  <img src="/concepts/apex-cars.jpg" alt="" />
                  <span>2024 · {i * 7 + 8}.000 km</span>
                </div>
                <h4>{name}</h4>
                <div className="car-specs">
                  <span>Automático</span><span>Gasolina</span><span>Revisado</span>
                </div>
                <p>
                  A partir de{" "}
                  <b>
                    R$ {i === 0 ? "649.900" : i === 1 ? "289.900" : "379.900"}
                  </b>
                </p>
                <button>VER DETALHES</button>
              </article>
            ))}
          </div>
        </section>
        <section className="cars-finance">
          <div>
            <small>FINANCIAMENTO SOB MEDIDA</small>
            <h3>
              Seu plano.
              <br />
              Seu ritmo.
            </h3>
            <p>
              Simule entrada, prazo e parcela antes mesmo de falar com um
              consultor.
            </p>
            <button>SIMULAR AGORA ↗</button>
          </div>
          <aside>
            <span>
              Valor do veículo <b>R$ 289.900</b>
            </span>
            <span>
              Entrada <b>R$ 90.000</b>
            </span>
            <span>
              Prazo <b>48 meses</b>
            </span>
            <strong>
              Parcela estimada <b>R$ 5.480</b>
            </strong>
          </aside>
        </section>
        <section className="cars-trade">
          <small>SEU CARRO PODE SER A ENTRADA</small>
          <h3>Avaliação rápida, justa e sem compromisso.</h3>
          <button>AVALIAR MEU CARRO →</button>
        </section>
      </div>
    );

  if (type === "fashion")
    return (
      <div className="niche-page fashion-page">
        <section className="fashion-hero">
          <nav>
            <strong>NOMA</strong>
            <span>NOVIDADES&nbsp;&nbsp; FEMININO&nbsp;&nbsp; ESSENCIAIS</span>
            <b>BUSCAR&nbsp;&nbsp; SACOLA (0)</b>
          </nav>
          <img src="/concepts/noma-fashion.jpg" alt="Editorial Noma" />
          <div>
            <small>DROP 04 · FORMAS DE AGORA</small>
            <h2>
              Vista o que
              <br />
              <em>fica em você.</em>
            </h2>
            <button>CONHECER A COLEÇÃO</button>
          </div>
          <p>
            Peças essenciais, modelagens precisas e produção em pequenos lotes.
          </p>
        </section>
        <div className="fashion-marquee">
          <span>NOVA COLEÇÃO</span> ENTREGA EXPRESSA · TROCA FÁCIL · PRODUÇÃO LIMITADA · <span>DROP 04</span>
        </div>
        <section className="fashion-categories">
          <article>
            <span>01</span>
            <h3>Alfaiataria leve</h3>
            <b>12 peças →</b>
          </article>
          <article>
            <span>02</span>
            <h3>Novos essenciais</h3>
            <b>18 peças →</b>
          </article>
          <article>
            <span>03</span>
            <h3>Últimas unidades</h3>
            <b>Comprar →</b>
          </article>
        </section>
        <section className="fashion-products">
          <header>
            <h3>Mais desejados</h3>
            <span>VER TODOS →</span>
          </header>
          <div>
            {["Blazer Íris", "Saia Linha", "Tricot Areia"].map((name, i) => (
              <article key={name}>
                <div>
                  <img
                    src="/concepts/noma-fashion.jpg"
                    alt=""
                    style={{ objectPosition: `${35 + i * 25}% center` }}
                  />
                  <button>+</button>
                </div>
                <small>NOMA · DROP 04</small>
                <h4>{name}</h4>
                <p>R$ {i === 0 ? "489" : i === 1 ? "279" : "329"}</p>
                <div className="fashion-options">
                  <span>P</span><span>M</span><span>G</span><i /><i />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="fashion-manifesto">
          <span>N</span>
          <div>
            <small>POR QUE NOMA</small>
            <h3>
              Menos tendências.
              <br />
              Mais identidade.
            </h3>
            <p>
              Desenhamos roupas que atravessam estações, combinam entre si e
              acompanham diferentes versões da mesma mulher.
            </p>
            <button>CONHEÇA NOSSA HISTÓRIA →</button>
          </div>
        </section>
        <section className="fashion-news">
          <small>10% NA PRIMEIRA COMPRA</small>
          <h3>Entre para a lista Noma.</h3>
          <div>
            seu melhor e-mail <button>QUERO RECEBER →</button>
          </div>
        </section>
      </div>
    );

  if (type === "realestate")
    return (
      <div className="niche-page estate-page">
        <section className="estate-hero">
          <img src="/concepts/atlas-villa.webp" alt="Imóvel Atlas" />
          <nav>
            <strong>ATLAS.</strong>
            <span>
              COMPRAR&nbsp;&nbsp; ALUGAR&nbsp;&nbsp; LANÇAMENTOS&nbsp;&nbsp;
              BAIRROS
            </span>
            <b>ATENDIMENTO</b>
          </nav>
          <div>
            <small>IMÓVEIS QUE MUDAM O JEITO DE VIVER</small>
            <h2>
              Encontre espaço
              <br />
              para o próximo capítulo.
            </h2>
            <div className="estate-search">
              <span>
                Quero <b>Comprar⌄</b>
              </span>
              <span>
                Em <b>Trancoso, BA⌄</b>
              </span>
              <span>
                Tipo <b>Casa⌄</b>
              </span>
              <button>BUSCAR 24 IMÓVEIS →</button>
            </div>
          </div>
        </section>
        <div className="estate-intelligence">
          <span><small>VALORIZAÇÃO MÉDIA</small><b>+18,4%</b> nos últimos 24 meses</span>
          <span><small>CURADORIA ATLAS</small><b>1 em 12</b> imóveis é selecionado</span>
          <span><small>ATENDIMENTO</small><b>7 dias</b> por semana</span>
        </div>
        <section className="estate-curation">
          <header>
            <small>CURADORIA ATLAS</small>
            <h3>Imóveis que merecem ser vistos.</h3>
            <p>
              Cada endereço é visitado, verificado e selecionado por
              especialistas locais.
            </p>
          </header>
          <div>
            <article className="estate-main">
              <img src="/concepts/atlas-villa.webp" alt="Villa Aurora" />
              <span>EXCLUSIVIDADE</span>
              <h4>Villa Aurora</h4>
              <p>
                Trancoso · 5 suítes · 680 m² <b>R$ 8,4 milhões</b>
              </p>
            </article>
            <article>
              <img src="/concepts/vertice-home.jpg" alt="Casa Pátio" />
              <h4>Casa Pátio</h4>
              <p>
                Eunápolis · 4 suítes <b>R$ 3,2 milhões</b>
              </p>
            </article>
          </div>
        </section>
        <section className="estate-neighborhood">
          <div>
            <small>VIVER EM TRANCOSO</small>
            <h3>
              Natureza por perto.
              <br />
              Tempo no seu ritmo.
            </h3>
            <p>
              Guias de bairro com escolas, gastronomia, mobilidade e tudo que
              importa antes de escolher um novo endereço.
            </p>
            <button>EXPLORAR O BAIRRO →</button>
          </div>
          <aside>
            <b>12 min</b>
            <span>do Quadrado</span>
            <b>8 km</b>
            <span>da praia</span>
            <b>24</b>
            <span>imóveis disponíveis</span>
          </aside>
        </section>
        <section className="estate-agent">
          <small>ATENDIMENTO HUMANO</small>
          <h3>
            Conte o que você procura.
            <br />
            Nós encontramos.
          </h3>
          <p>
            Um especialista local seleciona os imóveis certos e organiza sua
            agenda de visitas.
          </p>
          <button>FALAR COM UM ESPECIALISTA ↗</button>
        </section>
      </div>
    );

  return (
    <div className="niche-page fast-page">
      <section className="fast-hero">
        <nav>
          <strong>
            BRASA<span>BURGER</span>
          </strong>
          <div>CARDÁPIO&nbsp;&nbsp; LOJAS&nbsp;&nbsp; NOSSA BRASA</div>
          <b>PEDIR AGORA</b>
        </nav>
        <img src="/concepts/brasa-burger.png" alt="Burger Brasa" />
        <div>
          <small>SMASH NA BRASA · ENTREGA RÁPIDA</small>
          <h2>
            Fome não
            <br />
            espera.
          </h2>
          <p>
            Carne na brasa, pão tostado e molho da casa. Seu pedido pronto em
            poucos cliques.
          </p>
          <button>VER CARDÁPIO ↗</button>
        </div>
        <aside>
          <b>30–45 min</b>
          <span>tempo médio</span>
        </aside>
      </section>
      <div className="fast-promo-strip">
        <span>HOJE</span>
        <b>COMBO BRASA + FRITAS + REFIL</b>
        <strong>R$ 39,90</strong>
        <small>PEÇA PELO APP →</small>
      </div>
      <section className="fast-combos">
        <header>
          <small>OS MAIS PEDIDOS</small>
          <h3>Escolha seu favorito.</h3>
        </header>
        <div>
          {["Brasa Bacon", "Duplo Fogo", "Chicken Crunch"].map((name, i) => (
            <article key={name}>
              <span>0{i + 1}</span>
              <div className="burger-circle">
                <img src="/concepts/brasa-burger.png" alt="" />
              </div>
              <h4>{name}</h4>
              <p>
                {i === 0
                  ? "Bacon crocante, cheddar e molho Brasa"
                  : i === 1
                    ? "Dois smash, queijo e cebola crispy"
                    : "Frango crocante e maionese verde"}
              </p>
              <b>R$ {i === 0 ? "32,90" : i === 1 ? "38,90" : "29,90"}</b>
              <button>ADICIONAR +</button>
            </article>
          ))}
        </div>
      </section>
      <section className="fast-builder">
        <div>
          <small>MONTE DO SEU JEITO</small>
          <h3>
            Sua fome.
            <br />
            Suas regras.
          </h3>
          <p>
            Escolha a proteína, o queijo, os extras e finalize com seu molho
            favorito.
          </p>
        </div>
        <ol>
          <li>
            <b>01</b>Escolha o burger <span>→</span>
          </li>
          <li>
            <b>02</b>Adicione extras <span>→</span>
          </li>
          <li>
            <b>03</b>Escolha o acompanhamento <span>→</span>
          </li>
          <li>
            <b>04</b>Receba quentinho <span>→</span>
          </li>
        </ol>
      </section>
      <section className="fast-app">
        <span>
          BRASA
          <br />
          CLUB
        </span>
        <div>
          <small>PEÇA DIRETO. GANHE PONTOS.</small>
          <h3>
            Baixe o app e ganhe
            <br />
            20% no primeiro pedido.
          </h3>
          <button>QUERO MEU DESCONTO ↗</button>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [preview, setPreview] = useState<PreviewType | null>(null);
  const [previewSlide, setPreviewSlide] = useState(0);
  const [nichePreview, setNichePreview] = useState<NicheType | null>(null);
  const [projectType, setProjectType] = useState("Site institucional — plano mensal");
  const [contractModel, setContractModel] = useState<ContractModel>("Assinatura mensal");
  const [segment, setSegment] = useState("");
  const [goal, setGoal] = useState("Gerar mais contatos");
  const [investment, setInvestment] = useState("R$ 199,90/mês — Site institucional");
  const [timeline, setTimeline] = useState("Em até 30 dias");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(
      () => setHeroIndex((index) => (index + 1) % heroSlides.length),
      5600,
    );
    return () => window.clearInterval(timer);
  }, [heroPaused]);
  useEffect(() => {
    if (!preview && !nichePreview) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
        setNichePreview(null);
      }
      if (preview && event.key === "ArrowRight")
        setPreviewSlide((slide) => (slide + 1) % 3);
      if (preview && event.key === "ArrowLeft")
        setPreviewSlide((slide) => (slide + 2) % 3);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [preview, nichePreview]);

  const heroSlide = heroSlides[heroIndex];
  const activePreview = preview ? previewProjects[preview] : null;
  const openPreview = (type: PreviewType) => {
    setPreview(type);
    setPreviewSlide(0);
  };

  const availableProjects = briefingOptions[contractModel];
  const selectedProject = availableProjects.find((option) => option.project === projectType) ?? availableProjects[0];

  const changeContractModel = (nextModel: ContractModel) => {
    const firstProject = briefingOptions[nextModel][0];
    setContractModel(nextModel);
    setProjectType(firstProject.project);
    setInvestment(firstProject.investments[0]);
  };

  const changeProjectType = (nextProject: string) => {
    const project = briefingOptions[contractModel].find((option) => option.project === nextProject);
    setProjectType(nextProject);
    if (project) setInvestment(project.investments[0]);
  };

  const submitBudget = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track("briefing_whatsapp", { projectType, contractModel, goal });
    const message = [
      "Olá! Conheci a Avancini Web e quero conversar sobre um projeto.",
      `Tipo: ${projectType}`,
      `Contratação: ${contractModel}`,
      `Segmento: ${segment || "Ainda vou explicar"}`,
      `Objetivo: ${goal}`,
      `Investimento previsto: ${investment}`,
      `Prazo desejado: ${timeline}`,
    ].join("\n");
    window.open(`https://wa.me/5573981019782?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <div className="page-progress" aria-hidden="true" />
      <header className={scrolled ? "header scrolled" : "header"}>
        <a className="logo" href="#inicio" aria-label="Avancini Web, início">
          <span className="logo-mark" aria-hidden="true">
            <i />
          </span>
          <span>
            <span className="brand-name">
              AVANCINI <b>WEB</b>
            </span>
            <small>Uma solução Avancini OS</small>
          </span>
        </a>
        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          <a href="#servicos" onClick={() => setMenuOpen(false)}>
            Serviços
          </a>
          <a href="#projetos" onClick={() => setMenuOpen(false)}>
            Projetos
          </a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>
            Processo
          </a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Orçamento
          </a>
        </nav>
        <a
          className="button button-small header-cta"
          href="/site-por-assinatura"
        >
          Ver planos <span>↗</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-art-backdrop" aria-hidden="true">
          <i className="art-scan" />
          <i className="art-flare" />
        </div>
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="red-sweep" aria-hidden="true" />
        <div className="kinetic-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> Design estratégico para marcas ambiciosas
          </div>
          <h1>
            Sites impossíveis
            <br />
            de <em>ignorar.</em>
          </h1>
          <p>
            Criamos experiências digitais que fazem sua empresa parecer maior,
            mais confiável e mais preparada para transformar atenção em
            clientes.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="/site-por-assinatura"
            >
              Escolher meu plano <span>↗</span>
            </a>
            <a className="button button-ghost" href="#projetos">
              Ver projetos <span>↓</span>
            </a>
          </div>
          <div className="hero-trust">
            <span>Planos a partir de R$ 97/mês</span>
            <span>Design exclusivo</span>
            <span>Experiência mobile</span>
          </div>
        </div>
        <div
          className={`web-stage hero-showcase slide-${heroSlide.id}`}
          aria-label="Vitrine rotativa de exemplos fictícios"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="browser-card browser-back">
            <div className="browser-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="wireframe">
              <span />
              <b />
              <b />
              <b />
            </div>
          </div>
          <div className="browser-card browser-main" key={heroSlide.id}>
            <div className="browser-bar">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>{heroSlide.domain}</span>
              <b>LIVE</b>
            </div>
            {heroSlide.id === "atlas" && (
              <div className="hero-concept atlas-concept">
                <div className="atlas-nav">
                  <strong>ATLAS.</strong>
                  <span>BAHIA · BRASIL</span>
                  <b>MENU +</b>
                </div>
                <div className="atlas-vertical">CURATED LIVING · 16°29&apos;S</div>
                <div className="atlas-copy">
                  <small>CURADORIA IMOBILIÁRIA</small>
                  <h3>Viver raro.</h3>
                  <p>
                    Casas extraordinárias para histórias que não cabem no comum.
                  </p>
                  <button>EXPLORAR COLEÇÃO ↗</button>
                </div>
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="atlas-listing">
                  <span>01 / 08</span>
                  <b>VILLA AURORA</b>
                  <small>Trancoso · 680 m² · 5 suítes</small>
                </div>
                <div className="atlas-price">
                  A PARTIR DE
                  <br />
                  <b>R$ 8,4M</b>
                </div>
                <div className="atlas-award">
                  <b>AD</b>
                  <span>seleção<br />2026</span>
                </div>
              </div>
            )}
            {heroSlide.id === "brasa" && (
              <div className="hero-concept brasa-concept">
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="brasa-nav">
                  <strong>
                    BRASA<sup>73</sup>
                  </strong>
                  <span>
                    MENU&nbsp;&nbsp;&nbsp; HISTÓRIA&nbsp;&nbsp;&nbsp; CONTATO
                  </span>
                  <b>RESERVAS ↗</b>
                </div>
                <div className="brasa-copy">
                  <small>FOGO · TERRA · TEMPO</small>
                  <h3>
                    O sabor
                    <br />
                    de ficar.
                  </h3>
                  <p>
                    Uma cozinha brasileira contemporânea, guiada pelo fogo e
                    pelo que nasce perto.
                  </p>
                </div>
                <div className="brasa-date">
                  <span>MENU DEGUSTAÇÃO</span>
                  <b>7 tempos · R$ 280</b>
                </div>
                <div className="brasa-circle">73</div>
                <div className="brasa-availability">
                  <i /> 3 mesas disponíveis hoje
                </div>
                <div className="brasa-signature">cozinha de território</div>
              </div>
            )}
            {heroSlide.id === "moreira" && (
              <div className="hero-concept moreira-concept">
                <div className="moreira-nav">
                  <strong>
                    MOREIRA
                    <br />& LIMA
                  </strong>
                  <span>
                    SOLUÇÕES&nbsp;&nbsp;&nbsp; ESCRITÓRIO&nbsp;&nbsp;&nbsp;
                    INSIGHTS
                  </span>
                  <b>CONTATO</b>
                </div>
                <div className="moreira-copy">
                  <small>DIREITO EMPRESARIAL</small>
                  <h3>
                    Clareza para
                    <br />
                    decisões complexas.
                  </h3>
                  <p>
                    Inteligência jurídica para proteger valor, reduzir riscos e
                    sustentar o próximo movimento da sua empresa.
                  </p>
                  <button>CONHEÇA NOSSA ATUAÇÃO →</button>
                </div>
                <div className="moreira-brief">
                  <small>BRIEFING EXECUTIVO · 07</small>
                  <b>Governança que protege<br />o próximo movimento.</b>
                  <span>LER INSIGHT →</span>
                </div>
                <div className="moreira-confidential">
                  CONFIDENCIALIDADE · ESTRATÉGIA · PRECISÃO
                </div>
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="moreira-index">
                  <b>18</b>
                  <span>
                    anos construindo
                    <br />
                    relações de confiança
                  </span>
                </div>
                <div className="moreira-rule" />
              </div>
            )}
            {heroSlide.id === "nexa" && (
              <div className="hero-concept lead-concept nexa-concept">
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="lead-nav">
                  <strong>NEXA<span>SOLAR</span></strong>
                  <small>COMO FUNCIONA&nbsp;&nbsp; PROJETOS&nbsp;&nbsp; DÚVIDAS</small>
                  <b>SIMULAR AGORA</b>
                </div>
                <div className="lead-copy">
                  <small>ENERGIA SOLAR · BAHIA</small>
                  <h3>Troque a conta<br />por patrimônio.</h3>
                  <p>Descubra em 30 segundos quanto sua empresa ou residência pode economizar.</p>
                  <div className="lead-proof-row"><span>✓ Projeto completo</span><span>✓ Homologação inclusa</span></div>
                </div>
                <div className="lead-form-card nexa-form">
                  <small>SIMULAÇÃO GRATUITA</small>
                  <h4>Quanto você paga de energia?</h4>
                  <div><span>R$</span><b>1.200</b></div>
                  <p>Economia estimada em 25 anos</p>
                  <strong>R$ 318.000</strong>
                  <button>RECEBER MEU ESTUDO →</button>
                </div>
              </div>
            )}
            {heroSlide.id === "vitta" && (
              <div className="hero-concept lead-concept vitta-concept">
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="lead-nav">
                  <strong>VITTA<span>IMPLANTES</span></strong>
                  <small>TRATAMENTO&nbsp;&nbsp; EQUIPE&nbsp;&nbsp; HISTÓRIAS</small>
                  <b>AGENDAR</b>
                </div>
                <div className="lead-copy">
                  <small>IMPLANTES COM CARGA IMEDIATA</small>
                  <h3>Seu sorriso<br /><em>de volta.</em></h3>
                  <p>Planejamento digital, especialistas experientes e acompanhamento próximo em todas as etapas.</p>
                  <div className="vitta-rating"><b>4.9</b><span>★★★★★<br />326 avaliações verificadas</span></div>
                </div>
                <div className="lead-form-card vitta-form">
                  <small>AVALIAÇÃO PERSONALIZADA</small>
                  <h4>Fale com nossa equipe.</h4>
                  <div className="lead-fake-field">Seu nome <i /></div>
                  <div className="lead-fake-field">WhatsApp <i /></div>
                  <button>QUERO AGENDAR →</button>
                  <p>Retorno em até 15 minutos.</p>
                </div>
              </div>
            )}
            {heroSlide.id === "apexprotect" && (
              <div className="hero-concept lead-concept protect-concept">
                <img src={heroSlide.image} alt={heroSlide.alt} />
                <div className="lead-nav">
                  <strong>APEX<span>PROTECT</span></strong>
                  <small>PPF&nbsp;&nbsp; VITRIFICAÇÃO&nbsp;&nbsp; RESULTADOS</small>
                  <b>ORÇAMENTO</b>
                </div>
                <div className="lead-copy">
                  <small>PPF · PROTEÇÃO INVISÍVEL</small>
                  <h3>Brilho de agora.<br /><em>Proteção por anos.</em></h3>
                  <p>Película autorregenerativa contra riscos, pedras, manchas e desgaste da pintura.</p>
                  <button>QUERO PROTEGER MEU CARRO →</button>
                </div>
                <div className="protect-specs">
                  <span><b>10</b> anos de garantia</span>
                  <span><b>72h</b> para entrega</span>
                  <span><b>100%</b> acabamento premium</span>
                </div>
                <div className="protect-badge">ANTES<br /><b>—</b><br />DEPOIS</div>
              </div>
            )}
          </div>
          <div className="floating-chip chip-one">
            <span>●</span>
            <div>
              <small>NICHO EM DESTAQUE</small>
              <b>{heroSlide.niche}</b>
            </div>
          </div>
          <div className="floating-chip chip-two">
            <small>EXEMPLO FICTÍCIO</small>
            <b>{heroSlide.chip} →</b>
          </div>
          <div className="hero-controls" aria-label="Escolher segmento">
            <button
              type="button"
              onClick={() =>
                setHeroIndex(
                  (heroIndex + heroSlides.length - 1) % heroSlides.length,
                )
              }
              aria-label="Segmento anterior"
            >
              ←
            </button>
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className={index === heroIndex ? "active" : ""}
                onClick={() => setHeroIndex(index)}
                aria-label={`Ver exemplo de ${slide.niche}`}
                key={slide.id}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setHeroIndex((heroIndex + 1) % heroSlides.length)
              }
              aria-label="Próximo segmento"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section
        className="signal-bar"
        aria-label="Especialidades da Avancini Web"
      >
        <div>
          <span>01</span>Landings de conversão
        </div>
        <div>
          <span>02</span>Sites institucionais
        </div>
        <div>
          <span>03</span>Sem entrada
        </div>
        <div>
          <span>04</span>Design responsivo
        </div>
      </section>

      <section className="section manifesto">
        <div className="section-index">
          01 — SUA MARCA É JULGADA EM SEGUNDOS
        </div>
        <div className="manifesto-grid">
          <h2>
            Antes de falar com você, o cliente já decidiu o que pensa da sua
            empresa.
          </h2>
          <div>
            <p>
              Um site comum faz sua marca parecer comum. Uma mensagem confusa
              faz o visitante ir embora. Uma experiência lenta transforma
              interesse em desconfiança.
            </p>
            <p className="highlight-line">
              Seu site não é apenas uma página. É a primeira impressão, o melhor
              vendedor e a vitrine da sua empresa.
            </p>
          </div>
        </div>
        <div className="impact-line">
          <span>VISUAL QUE PRENDE</span>
          <span>MENSAGEM QUE CONVENCE</span>
          <span>EXPERIÊNCIA QUE CONVERTE</span>
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="section-heading">
          <div>
            <span className="section-index">02 — O QUE CRIAMOS</span>
            <h2>
              Não entregamos páginas.
              <br />
              Criamos percepção de valor.
            </h2>
          </div>
          <p>
            Cada exemplo abaixo mostra como estratégia, texto e design podem
            transformar negócios que disputam atenção e confiança todos os dias.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article
              className={`service-card ${service.type}`}
              key={service.number}
            >
              <div className="service-top">
                <span>{service.number}</span>
                <small>{service.label}</small>
              </div>
              <button
                className="service-visual service-preview-button"
                type="button"
                onClick={() => openPreview(service.type)}
                aria-label={`Ampliar exemplo de ${service.label.toLowerCase()}`}
              >
                {service.type === "landing" && (
                  <div className="example-site example-clinic">
                    <div className="example-nav">
                      <b>LUMINA</b>
                      <span>ESTÉTICA AVANÇADA</span>
                      <i>AGENDAR</i>
                    </div>
                    <img
                      src="/concepts/lumina-clinic.jpg"
                      alt="Profissional realizando tratamento estético"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="example-copy">
                      <small>PROTOCOLO EXCLUSIVO</small>
                      <strong>
                        Sua pele,
                        <br />
                        sua melhor versão.
                      </strong>
                      <p>
                        Avaliação personalizada e tecnologia para resultados
                        naturais.
                      </p>
                      <b>QUERO MINHA AVALIAÇÃO ↗</b>
                    </div>
                    <div className="example-badge">
                      +2.400
                      <br />
                      <span>clientes atendidas</span>
                    </div>
                  </div>
                )}
                {service.type === "institutional" && (
                  <div className="example-site example-architecture">
                    <img
                      src="/concepts/vertice-home.jpg"
                      alt="Residência contemporânea"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="example-nav">
                      <b>VÉRTICE.</b>
                      <span>Projetos · Escritório</span>
                      <i>CONTATO</i>
                    </div>
                    <div className="example-copy">
                      <small>PROJETO RESIDENCIAL</small>
                      <strong>
                        Arquitetura que
                        <br />
                        atravessa o tempo.
                      </strong>
                      <p>Residência 735 · Bahia</p>
                    </div>
                  </div>
                )}
                <span className="preview-hover">
                  <b>↗</b> Ampliar projeto
                </span>
              </button>
              <div className="service-journey">
                <small>ESTRUTURA QUE CONDUZ À AÇÃO</small>
                <div>
                  {service.journey.map((step, index) => (
                    <span key={step}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
              <div className="service-segments" aria-label="Segmentos de exemplo">
                {(service.type === "landing"
                  ? ["Clínicas", "Energia solar", "Serviços locais"]
                  : ["Advocacia", "Imobiliárias", "Restaurantes"]
                ).map((segment) => <span key={segment}>{segment}</span>)}
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-tag">
                <i />
                {service.tag}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section niche-models" id="modelos">
        <div className="section-heading">
          <div>
            <span className="section-index">03 — ESTRUTURAS POR SEGMENTO</span>
            <h2>
              Não é só uma tela bonita.
              <br />É um site inteiro pensado para vender.
            </h2>
          </div>
          <p>
            Explore quatro modelos completos e veja como conteúdo, oferta,
            catálogo e conversão mudam conforme o negócio.
          </p>
        </div>
        <div className="niche-model-grid">
          {nicheModels.map((model) => (
            <article
              className={`niche-model-card niche-${model.type}`}
              key={model.type}
            >
              <div className="niche-model-number">
                {model.number} / {model.label}
              </div>
              <button
                type="button"
                onClick={() => setNichePreview(model.type)}
                aria-label={`Ver estrutura completa de ${model.label.toLowerCase()}`}
              >
                <img
                  src={model.image}
                  alt={`Exemplo fictício ${model.brand}`}
                  decoding="async"
                />
                <div className="model-mini-nav">
                  <i />
                  <span>INÍCIO&nbsp;&nbsp; COLEÇÃO&nbsp;&nbsp; CONTATO</span>
                  <small>MENU +</small>
                </div>
                <span>{model.brand}</span>
                <div className="model-proof">
                  <strong>{model.proof}</strong>
                  <small>{model.proofLabel}</small>
                </div>
                <b>VER ESTRUTURA COMPLETA ↗</b>
              </button>
              <h3>{model.title}</h3>
              <p>{model.text}</p>
              <div>
                {model.chips.map((chip, index) => (
                  <span key={chip}>0{index + 1} {chip}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projetos">
        <div className="section-heading">
          <div>
            <span className="section-index">04 — PROJETOS SELECIONADOS</span>
            <h2>
              Veja o trabalho.
              <br />
              Imagine a sua marca.
            </h2>
          </div>
          <p>
            Um redesign construído a partir de um site anterior e uma criação
            iniciada totalmente do zero.
          </p>
        </div>
        <div className="project-list">
          <article className="project-showcase sandiego">
            <div className="project-copy">
              <div className="project-number">01 / SAÚDE & AUTORIDADE</div>
              <h3>
                Clínica
                <br />
                San Diego
              </h3>
              <p>
                Um redesign para reorganizar especialidades, equipe, horários e
                agendamento em uma experiência mais clara e acolhedora.
              </p>
              <dl className="case-details">
                <div><dt>PONTO DE PARTIDA</dt><dd>A clínica já possuía um site, usado como referência para a comparação.</dd></div>
                <div><dt>NOVA PROPOSTA</dt><dd>Estrutura, mensagem e experiência visual completamente redesenhadas.</dd></div>
                <div><dt>OBJETIVO</dt><dd>Transmitir mais confiança e facilitar o caminho até o agendamento.</dd></div>
              </dl>
              <div className="project-tags">
                <span>Site institucional</span>
                <span>Experiência mobile</span>
                <span>Conversão</span>
              </div>
              <div className="project-status">
                <i /> Redesign completo <span>a partir do site anterior</span>
              </div>
              <a className="case-link" href="https://clinicasandiego.com.br/#nossa_equipe" target="_blank" rel="noreferrer">
                Ver o site anterior para comparar <span>↗</span>
              </a>
            </div>
            <div className="project-screen">
              <div className="device-browser">
                <div className="device-top">
                  <i />
                  <i />
                  <i />
                  <span>avancini.web / redesign san diego</span>
                  <b>ROLE ↓</b>
                </div>
                <div
                  className="project-scroll"
                  role="region"
                  tabIndex={0}
                  aria-label="Demonstração rolável completa do site Clínica San Diego"
                >
                  <img
                    src="/projects/san-diego-full.png"
                    alt="Captura completa do site da Clínica San Diego"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="scroll-hint">
                Role dentro da tela <span>↓</span>
              </div>
              <div className="screen-label">REDESIGN / 01</div>
            </div>
          </article>
          <article className="project-showcase tapecar">
            <div className="project-copy">
              <div className="project-number">
                02 / AUTOMOTIVO & PRESENÇA LOCAL
              </div>
              <h3>Tape Car</h3>
              <p>
                Uma presença digital intensa para posicionar a empresa, destacar
                seus serviços automotivos e aproximar clientes em Eunápolis.
              </p>
              <dl className="case-details">
                <div><dt>OBJETIVO</dt><dd>Traduzir a força local da marca em uma vitrine digital premium.</dd></div>
                <div><dt>ESTRUTURA</dt><dd>Serviços, processo, localização e contato por WhatsApp.</dd></div>
                <div><dt>PONTO DE PARTIDA</dt><dd>A Tape Car ainda não possuía um site.</dd></div>
                <div><dt>ENTREGA</dt><dd>Estrutura e identidade digital criadas completamente do zero.</dd></div>
              </dl>
              <div className="project-tags">
                <span>Site institucional</span>
                <span>Marca local</span>
                <span>WhatsApp</span>
              </div>
              <div className="project-status">
                <i /> Criação do zero <span>sem site anterior</span>
              </div>
            </div>
            <div className="project-screen">
              <div className="device-browser">
                <div className="device-top">
                  <i />
                  <i />
                  <i />
                  <span>avancini.web / projeto tape car</span>
                  <b>ROLE ↓</b>
                </div>
                <div
                  className="project-scroll"
                  role="region"
                  tabIndex={0}
                  aria-label="Demonstração rolável completa do site Tape Car"
                >
                  <img
                    src="/projects/tape-car-full.png"
                    alt="Captura completa do site Tape Car"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="scroll-hint">
                Role dentro da tela <span>↓</span>
              </div>
              <div className="screen-label">CRIAÇÃO DO ZERO / 02</div>
            </div>
          </article>
        </div>
      </section>

      <section className="section proof-section" aria-labelledby="proof-title">
        <div className="proof-intro">
          <span className="section-index">05 — DOIS PONTOS DE PARTIDA</span>
          <h2 id="proof-title">Redesign ou criação do zero.</h2>
          <p>
            Algumas empresas já possuem um site que precisa evoluir. Outras ainda
            precisam construir sua primeira presença digital. A Avancini Web trabalha
            a partir da realidade de cada negócio.
          </p>
        </div>
        <div className="origin-grid">
          <article>
            <span>01 / REDESIGN</span>
            <h3>Clínica San Diego</h3>
            <p>O site anterior serve como comparação para enxergar a evolução de estrutura, hierarquia e percepção de valor.</p>
            <a href="https://clinicasandiego.com.br/" target="_blank" rel="noreferrer">Ver o site anterior <b>↗</b></a>
          </article>
          <article>
            <span>02 / CRIAÇÃO DO ZERO</span>
            <h3>Tape Car</h3>
            <p>Sem uma presença anterior para reformular, o projeto nasceu do posicionamento, dos serviços e da realidade da empresa.</p>
            <small>NÃO EXISTIA SITE ANTERIOR</small>
          </article>
        </div>
      </section>

      <section className="section process" id="processo">
        <div className="process-intro">
          <span className="section-index">
            06 — DO PRIMEIRO CONTATO AO LANÇAMENTO
          </span>
          <h2>
            Um processo claro.
            <br />
            Um resultado marcante.
          </h2>
          <p>
            Você acompanha as decisões importantes sem precisar entender de
            tecnologia. A Avancini Web transforma seus objetivos em uma
            experiência digital pronta para crescer.
          </p>
          <a
            className="text-cta"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Começar meu projeto <span>↗</span>
          </a>
        </div>
        <div className="process-steps">
          <article>
            <span>01</span>
            <div>
              <small>IMERSÃO</small>
              <h3>Entendemos sua empresa</h3>
              <p>
                Objetivos, público, diferenciais e a percepção que sua marca
                precisa transmitir.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <small>ESTRATÉGIA & DESIGN</small>
              <h3>Criamos uma presença única</h3>
              <p>
                Mensagem, estrutura e visual construídos para orientar e
                impressionar.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <small>LANÇAMENTO</small>
              <h3>Seu novo site entra em cena</h3>
              <p>
                Responsivo, rápido e preparado para receber seus próximos
                clientes.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section investment" id="investimento">
        <div className="section-heading">
          <div>
            <span className="section-index">07 — INVESTIMENTO & PRAZO</span>
            <h2>Escolha como quer começar.</h2>
          </div>
          <p>
            O padrão de estratégia, design e cuidado é o mesmo. Na assinatura,
            você dilui o investimento; no projeto exclusivo, paga uma vez e
            escolhe se deseja manutenção depois.
          </p>
        </div>
        <div className="offer-guide" aria-label="Comparação entre landing page e site institucional">
          <article>
            <span>QUERO VENDER UMA OFERTA</span>
            <h3>Landing de Conversão</h3>
            <p>Uma jornada curta para anunciar um serviço, reduzir dúvidas e levar o visitante a uma única ação.</p>
            <div><b>Anúncios</b><b>Campanhas</b><b>Captação</b></div>
          </article>
          <div className="offer-guide-or">OU</div>
          <article>
            <span>QUERO APRESENTAR MINHA EMPRESA</span>
            <h3>Site Institucional</h3>
            <p>Uma estrutura completa para organizar serviços, diferenciais, conteúdo, autoridade e contatos.</p>
            <div><b>Presença</b><b>Navegação</b><b>Autoridade</b></div>
          </article>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className={offer.featured ? "offer-card featured" : "offer-card"} key={offer.name}>
              {offer.featured && <small>MAIS PROCURADO</small>}
              <h3>{offer.name}</h3>
              <strong>{offer.price}</strong>
              <span>{offer.deadline}</span>
              <p>{offer.description}</p>
              <em className="offer-ideal">{offer.ideal}</em>
              <ul>
                {offer.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={whatsappFor(offer.message)} target="_blank" rel="noreferrer" onClick={() => track("offer_whatsapp", { offer: offer.name })}>{offer.cta} <b>↗</b></a>
            </article>
          ))}
        </div>
        <p className="investment-note">Na assinatura, o endereço Avancini está incluso. Se o cliente já possui domínio próprio, conectamos sem problema; a compra de um novo domínio é paga à parte. No projeto exclusivo, o domínio próprio faz parte da proposta.</p>
      </section>

      <section className="final-cta" id="contato">
        <div className="cta-grid" />
        <div className="cta-orb" />
        <div className="eyebrow">
          <span /> Sua marca pode ocupar mais espaço
        </div>
        <div className="budget-copy">
          <h2>Vamos descobrir o projeto certo para sua empresa.</h2>
          <p>
            Responda cinco pontos rápidos. O WhatsApp será aberto com um briefing
            organizado para a conversa já começar no lugar certo.
          </p>
          <div className="budget-proof">
            <span>01 · Sem formulário infinito</span>
            <span>02 · Resposta direta</span>
            <span>03 · Sem compromisso</span>
          </div>
        </div>
        <form className="budget-form" onSubmit={submitBudget}>
          <label>
            <span>Como deseja contratar?</span>
            <select value={contractModel} onChange={(event) => changeContractModel(event.target.value as ContractModel)}>
              <option>Assinatura mensal</option>
              <option>Pagamento único</option>
              <option>Quero entender as duas opções</option>
            </select>
            <small className="budget-context" aria-live="polite">{contractModelHelp[contractModel]}</small>
          </label>
          <label>
            <span>O que você precisa?</span>
            <select value={projectType} onChange={(event) => changeProjectType(event.target.value)}>
              {availableProjects.map((option) => <option key={option.project}>{option.project}</option>)}
            </select>
          </label>
          <label>
            <span>Qual é o segmento da empresa?</span>
            <input value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: clínica, imobiliária, restaurante" />
          </label>
          <label>
            <span>Principal objetivo</span>
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option>Gerar mais contatos</option>
              <option>Vender online</option>
              <option>Transmitir mais autoridade</option>
              <option>Divulgar um serviço específico</option>
            </select>
          </label>
          <div className="budget-row">
            <label>
              <span>Condição de investimento</span>
              <select value={investment} onChange={(event) => setInvestment(event.target.value)}>
                {selectedProject.investments.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>
              <span>Prazo desejado</span>
              <select value={timeline} onChange={(event) => setTimeline(event.target.value)}>
                <option>Em até 7 dias</option>
                <option>Em até 15 dias</option>
                <option>Em até 30 dias</option>
              </select>
            </label>
          </div>
          <button className="button button-primary button-xl" type="submit">
            Enviar briefing pelo WhatsApp <span>↗</span>
          </button>
          <small>Você revisa a mensagem antes de enviar.</small>
        </form>
      </section>

      {nichePreview && (
        <div
          className="niche-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Modelo completo por segmento"
        >
          <div className="niche-modal-dialog">
            <button
              className="preview-close"
              type="button"
              onClick={() => setNichePreview(null)}
              aria-label="Fechar modelo completo"
            >
              ×
            </button>
            <div className="preview-browser-bar">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>Modelo completo · role para explorar</span>
              <b>CONCEITO FICTÍCIO</b>
            </div>
            <div
              className="niche-full-scroll"
              role="region"
              aria-label="Estrutura completa rolável do modelo"
            >
              <NicheFullPage type={nichePreview} />
            </div>
            <div className="niche-scroll-note">
              <span>↓</span> Role dentro da tela para ver a estrutura completa
            </div>
            <div className="preview-sales-cta">
              <span>Imaginou sua empresa com uma estrutura assim?</span>
              <a href={whatsappFor("Olá! Vi um dos modelos completos da Avancini Web e quero uma estrutura nesse nível para minha empresa.")} target="_blank" rel="noreferrer" onClick={() => track("model_whatsapp", { model: nichePreview })}>Quero algo nesse nível <b>↗</b></a>
            </div>
          </div>
        </div>
      )}

      {activePreview && preview && (
        <div
          className="preview-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Demonstração ampliada do projeto ${activePreview.name}`}
        >
          <div className={`preview-dialog preview-${activePreview.accent}`}>
            <button
              className="preview-close"
              type="button"
              onClick={() => setPreview(null)}
              aria-label="Fechar visualização"
            >
              ×
            </button>
            <div className="preview-browser-bar">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>{activePreview.kind}</span>
              <b>{String(previewSlide + 1).padStart(2, "0")} / 03</b>
            </div>
            <div
              className="preview-unique-canvas"
              key={`${preview}-${previewSlide}`}
            >
              <PreviewCanvas type={preview} slide={previewSlide} />
            </div>
            <div className="preview-controls">
              <button
                type="button"
                onClick={() => setPreviewSlide((previewSlide + 2) % 3)}
                aria-label="Tela anterior"
              >
                ←
              </button>
              <div>
                {activePreview.pages.map((page, index) => (
                  <button
                    type="button"
                    className={index === previewSlide ? "active" : ""}
                    onClick={() => setPreviewSlide(index)}
                    aria-label={`Ver tela ${page.label}`}
                    key={page.label}
                  />
                ))}
              </div>
              <span>
                {activePreview.pages[previewSlide].label} · exemplo fictício
              </span>
              <button
                type="button"
                onClick={() => setPreviewSlide((previewSlide + 1) % 3)}
                aria-label="Próxima tela"
              >
                →
              </button>
            </div>
            <div className="preview-sales-cta">
              <span>Gostou dessa direção visual?</span>
              <a href={whatsappFor(`Olá! Gostei do exemplo ${activePreview.name} e quero conversar sobre uma direção parecida para minha empresa.`)} target="_blank" rel="noreferrer" onClick={() => track("preview_whatsapp", { preview: activePreview.name })}>Quero um projeto assim <b>↗</b></a>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-top">
          <a className="logo footer-logo" href="#inicio">
            <span className="logo-mark" aria-hidden="true">
              <i />
            </span>
            <span>
              <span className="brand-name">
                AVANCINI <b>WEB</b>
              </span>
              <small>Uma solução Avancini OS</small>
            </span>
          </a>
          <p>
            Experiências digitais criadas para posicionar, impressionar e
            converter.
          </p>
          <div>
            <a href="mailto:ivoavancini@hotmail.com">ivoavancini@hotmail.com</a>
            <a href="tel:+5573981019782">(73) 98101-9782</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Avancini OS</span>
          <span>Estratégia · Web design · Conversão</span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Avancini Web no WhatsApp"
      >
        <span>●</span>
        <b>Solicitar orçamento</b>
      </a>
    </main>
  );
}
