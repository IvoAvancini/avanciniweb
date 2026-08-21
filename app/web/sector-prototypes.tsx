import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./sector-prototypes.module.css";

export type SectorPrototypeType =
  | "cars"
  | "mechanic"
  | "dentistry"
  | "aesthetics"
  | "autonomous"
  | "fashion"
  | "law"
  | "realtor"
  | "realestate";

type SectorConfig = {
  brand: string;
  signature: string;
  accent: string;
  accentSoft: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  copy: string;
  cta: string;
  nav: string[];
  signals: string[];
  filters: Array<[string, string]>;
  consoleLabel: string;
  consoleTitle: string;
  consoleCopy: string;
  services: Array<[string, string]>;
  journey: Array<[string, string]>;
  metrics: Array<[string, string]>;
};

const sectors: Record<SectorPrototypeType, SectorConfig> = {
  cars: {
    brand: "APEX MOTORS",
    signature: "SELEÇÃO AUTOMOTIVA",
    accent: "#ff4b34",
    accentSoft: "#ffb4a8",
    image: "/concepts/apex-cars.jpg",
    imageAlt: "Showroom automotivo premium",
    eyebrow: "PROCEDÊNCIA ANTES DA PROMESSA",
    title: "O carro certo.",
    titleAccent: "Sem perder tempo no estoque errado.",
    copy: "Busca objetiva, histórico claro, simulação e atendimento no mesmo caminho — da primeira comparação ao test-drive.",
    cta: "Encontrar meu carro",
    nav: ["Estoque", "Venda seu carro", "Financiamento"],
    signals: ["Laudo cautelar", "Troca avaliada", "Financiamento", "Entrega nacional"],
    filters: [["Marca", "Todas"], ["Categoria", "SUV"], ["Faixa", "Até R$ 250 mil"], ["Ano", "2022+"]],
    consoleLabel: "ESTOQUE INTELIGENTE",
    consoleTitle: "48 veículos encontrados para o seu momento.",
    consoleCopy: "Filtros que ajudam o cliente a chegar ao carro possível antes de chamar o vendedor.",
    services: [["BMW 320i M Sport", "2024 · 8.000 km"], ["Audi Q5 Performance", "2023 · 19.000 km"], ["Volvo XC60 Recharge", "2024 · Híbrido"]],
    journey: [["Compare", "Veja preço, versão e procedência."], ["Simule", "Entrada e prazo antes da conversa."], ["Agende", "Receba atendimento já contextualizado."]],
    metrics: [["+120", "veículos"], ["4,9", "avaliação simulada"], ["24h", "reserva online"]],
  },
  mechanic: {
    brand: "TORQUE LAB",
    signature: "OFICINA & DIAGNÓSTICO",
    accent: "#29a9ff",
    accentSoft: "#9dd9ff",
    image: "/concepts/torque-mechanic.webp",
    imageAlt: "Oficina mecânica premium com diagnóstico digital",
    eyebrow: "SEU CARRO EXPLICADO SEM ENROLAÇÃO",
    title: "Diagnóstico claro.",
    titleAccent: "Serviço acompanhado do início ao fim.",
    copy: "O cliente escolhe o sintoma, agenda a avaliação e acompanha cada etapa sem precisar ligar para saber o que aconteceu.",
    cta: "Agendar diagnóstico",
    nav: ["Serviços", "Diagnóstico", "Acompanhar OS"],
    signals: ["Orçamento aprovado", "Peças registradas", "Status ao vivo", "Garantia do serviço"],
    filters: [["Veículo", "Sedã 2021"], ["Sintoma", "Ruído dianteiro"], ["Urgência", "Esta semana"], ["Unidade", "Mais próxima"]],
    consoleLabel: "ORDEM DE SERVIÇO · TL-2841",
    consoleTitle: "Seu carro está na etapa de diagnóstico.",
    consoleCopy: "Fotos, itens encontrados e orçamento ficam organizados para o cliente aprovar com segurança.",
    services: [["Diagnóstico eletrônico", "Leitura completa e teste guiado"], ["Revisão preventiva", "Plano por quilometragem"], ["Freios e suspensão", "Inspeção com registro visual"]],
    journey: [["Recebido", "Checklist e fotos registrados."], ["Em análise", "Técnico responsável identificado."], ["Aprovação", "Cliente decide antes do reparo."]],
    metrics: [["12 min", "triagem média"], ["100%", "itens documentados"], ["1 canal", "para acompanhar"]],
  },
  dentistry: {
    brand: "NEXO ODONTO",
    signature: "ODONTOLOGIA INTEGRADA",
    accent: "#2c8b76",
    accentSoft: "#a7dfcf",
    image: "/concepts/nexo-dental.webp",
    imageAlt: "Dentista orientando paciente em clínica contemporânea",
    eyebrow: "ENTENDER PRIMEIRO. CUIDAR MELHOR.",
    title: "Seu sorriso não começa",
    titleAccent: "no procedimento. Começa na confiança.",
    copy: "Tratamentos explicados com clareza, profissionais apresentados e uma agenda simples para reduzir a insegurança antes da consulta.",
    cta: "Agendar avaliação",
    nav: ["Tratamentos", "Especialistas", "Primeira consulta"],
    signals: ["Avaliação cuidadosa", "Plano individual", "Retorno organizado", "Atendimento humano"],
    filters: [["Objetivo", "Quero avaliar"], ["Tratamento", "Ainda não sei"], ["Preferência", "Esta semana"], ["Contato", "WhatsApp"]],
    consoleLabel: "JORNADA DA PRIMEIRA CONSULTA",
    consoleTitle: "Você não precisa saber qual tratamento escolher.",
    consoleCopy: "O site acolhe a dúvida, apresenta possibilidades e leva o paciente à avaliação adequada.",
    services: [["Estética do sorriso", "Planejamento natural e individual"], ["Implantes", "Avaliação, exames e acompanhamento"], ["Prevenção", "Cuidado contínuo para toda a família"]],
    journey: [["Conte sua dúvida", "Uma pergunta simples inicia o contato."], ["Receba orientação", "A equipe indica a melhor avaliação."], ["Escolha o horário", "Confirmação chega no celular."]],
    metrics: [["8", "especialidades"], ["4,9", "experiência simulada"], ["1 equipe", "cuidado integrado"]],
  },
  aesthetics: {
    brand: "LUMINA",
    signature: "ESTÉTICA AVANÇADA",
    accent: "#b87091",
    accentSoft: "#e8bbce",
    image: "/concepts/lumina-clinic.jpg",
    imageAlt: "Atendimento de estética avançada",
    eyebrow: "NATURALIDADE COMO DIREÇÃO",
    title: "Antes do protocolo,",
    titleAccent: "existe uma pessoa e um objetivo.",
    copy: "Uma experiência elegante para apresentar tratamentos sem exageros, responder inseguranças e transformar interesse em avaliação.",
    cta: "Quero uma avaliação",
    nav: ["Tratamentos", "Resultados", "Equipe"],
    signals: ["Avaliação individual", "Protocolos explicados", "Agenda rápida", "Acompanhamento"],
    filters: [["Quero cuidar", "Pele"], ["Meu objetivo", "Luminosidade"], ["Momento", "Primeira avaliação"], ["Preferência", "Tarde"]],
    consoleLabel: "MAPA DE CUIDADO",
    consoleTitle: "Um plano possível para a sua rotina.",
    consoleCopy: "O visitante entende objetivos, etapas e próximos passos antes de pedir uma avaliação.",
    services: [["Pele e luminosidade", "Textura, viço e uniformidade"], ["Equilíbrio facial", "Planejamento com naturalidade"], ["Corpo e bem-estar", "Protocolos combinados e acompanhamento"]],
    journey: [["Avaliação", "Histórico, objetivo e expectativas."], ["Planejamento", "Prioridades e número de etapas."], ["Acompanhamento", "Evolução registrada com clareza."]],
    metrics: [["3 etapas", "plano transparente"], ["1:1", "avaliação individual"], ["30 min", "primeira conversa"]],
  },
  autonomous: {
    brand: "CAIO MOVE",
    signature: "MOVIMENTO & PERFORMANCE",
    accent: "#9edb3b",
    accentSoft: "#d8f6a7",
    image: "/concepts/caio-move.webp",
    imageAlt: "Profissional autônomo em estúdio de movimento",
    eyebrow: "PRESENÇA PESSOAL QUE TRABALHA POR VOCÊ",
    title: "Seu método precisa parecer",
    titleAccent: "tão profissional quanto você é.",
    copy: "Posicionamento, agenda, serviços e autoridade em uma página que explica o valor do profissional antes da pergunta sobre preço.",
    cta: "Conhecer o método",
    nav: ["Método", "Programas", "Agenda"],
    signals: ["Marca pessoal", "Serviço claro", "Agenda direta", "Conteúdo de autoridade"],
    filters: [["Objetivo", "Voltar a treinar"], ["Formato", "Individual"], ["Frequência", "2x por semana"], ["Horário", "Manhã"]],
    consoleLabel: "PROGRAMA RECOMENDADO",
    consoleTitle: "MOVE BASE · 8 semanas.",
    consoleCopy: "A proposta certa aparece a partir do objetivo do cliente — sem uma lista confusa de serviços.",
    services: [["Avaliação de movimento", "Ponto de partida e metas reais"], ["Acompanhamento individual", "Treino adaptado à rotina"], ["Programa online", "Plano, vídeos e contato semanal"]],
    journey: [["Diagnóstico", "Entenda o momento e os limites."], ["Plano", "Escolha formato e frequência."], ["Início", "Agende a primeira sessão."]],
    metrics: [["3 formatos", "de acompanhamento"], ["8 semanas", "programa inicial"], ["1:1", "contato direto"]],
  },
  fashion: {
    brand: "NOMA",
    signature: "MODA AUTORAL",
    accent: "#eead91",
    accentSoft: "#f8d8ca",
    image: "/concepts/noma-fashion.jpg",
    imageAlt: "Editorial de moda Noma",
    eyebrow: "DROP 04 · FORMAS DE AGORA",
    title: "Menos tendências.",
    titleAccent: "Mais identidade no que você veste.",
    copy: "Editorial, coleção, tamanhos e compra reunidos em uma loja que deixa a marca respirar sem dificultar a decisão.",
    cta: "Ver nova coleção",
    nav: ["Novidades", "Feminino", "Essenciais"],
    signals: ["Coleção editorial", "Tamanhos claros", "Compra rápida", "Troca simples"],
    filters: [["Categoria", "Alfaiataria"], ["Tamanho", "M"], ["Cor", "Neutros"], ["Ordenar", "Novidades"]],
    consoleLabel: "DROP 04 · 18 PEÇAS",
    consoleTitle: "Uma coleção que combina entre si.",
    consoleCopy: "A experiência vende a identidade da marca e ainda deixa produto, preço e tamanho fáceis de encontrar.",
    services: [["Blazer Íris", "Linho misto · P ao GG"], ["Saia Linha", "Cintura alta · 4 cores"], ["Tricot Areia", "Toque macio · edição curta"]],
    journey: [["Descubra", "Editorial e combinações possíveis."], ["Escolha", "Tamanho e disponibilidade visíveis."], ["Compre", "Carrinho direto e troca clara."]],
    metrics: [["18", "peças no drop"], ["6x", "sem juros"], ["1ª troca", "gratuita"]],
  },
  law: {
    brand: "MOREIRA & LIMA",
    signature: "ADVOCACIA EMPRESARIAL",
    accent: "#c8a46a",
    accentSoft: "#ead7b6",
    image: "/concepts/moreira-law.jpg",
    imageAlt: "Escritório de advocacia empresarial",
    eyebrow: "CLAREZA PARA DECISÕES IMPORTANTES",
    title: "O jurídico deixa de ser ruído",
    titleAccent: "quando a estratégia fica clara.",
    copy: "Áreas de atuação, método e contato confidencial apresentados com sobriedade — sem promessas ou números artificiais.",
    cta: "Conversar com a equipe",
    nav: ["Escritório", "Atuação", "Conteúdo"],
    signals: ["Atuação consultiva", "Linguagem objetiva", "Contato confidencial", "Visão de negócio"],
    filters: [["Assunto", "Contratos"], ["Empresa", "Em operação"], ["Momento", "Preciso avaliar"], ["Contato", "Confidencial"]],
    consoleLabel: "TRIAGEM EMPRESARIAL",
    consoleTitle: "O cenário chega organizado à primeira conversa.",
    consoleCopy: "A empresa identifica o tema e recebe um caminho inicial sem exposição desnecessária.",
    services: [["Contratos e negociações", "Risco, clareza e execução"], ["Societário", "Estrutura e governança"], ["Trabalhista empresarial", "Prevenção e orientação"]],
    journey: [["Contexto", "Entendimento do negócio e da decisão."], ["Cenários", "Riscos e caminhos possíveis."], ["Estratégia", "Prioridades e acompanhamento."]],
    metrics: [["Brasil", "atendimento empresarial"], ["1 equipe", "visão integrada"], ["Direto", "contato confidencial"]],
  },
  realtor: {
    brand: "MARINA VALE",
    signature: "CORRETORA DE IMÓVEIS",
    accent: "#d1af77",
    accentSoft: "#ead8ba",
    image: "/concepts/marina-realty.webp",
    imageAlt: "Corretora em residência contemporânea",
    eyebrow: "CURADORIA PESSOAL · IMÓVEIS SELECIONADOS",
    title: "Você não precisa visitar tudo.",
    titleAccent: "Precisa visitar o que faz sentido.",
    copy: "Uma marca pessoal que une imóveis, bairros e atendimento consultivo para transformar busca em uma seleção realmente útil.",
    cta: "Contar o que procuro",
    nav: ["Imóveis", "Bairros", "Sobre Marina"],
    signals: ["Curadoria pessoal", "Visitas organizadas", "Bairros explicados", "Contato direto"],
    filters: [["Objetivo", "Comprar"], ["Cidade", "Porto Seguro"], ["Perfil", "Casa"], ["Faixa", "Até R$ 1,2 mi"]],
    consoleLabel: "SELEÇÃO DA MARINA",
    consoleTitle: "6 imóveis alinhados ao seu perfil.",
    consoleCopy: "A corretora aparece como especialista e cada imóvel chega acompanhado do motivo para entrar na seleção.",
    services: [["Casa Jardim", "3 suítes · área verde"], ["Apartamento Orla", "2 quartos · vista aberta"], ["Vila Reserva", "Condomínio · lazer completo"]],
    journey: [["Perfil", "Rotina, prioridades e orçamento."], ["Curadoria", "Poucos imóveis, melhores motivos."], ["Visita", "Roteiro organizado e acompanhamento."]],
    metrics: [["6", "imóveis na seleção"], ["3 bairros", "comparados"], ["1 contato", "do início ao fim"]],
  },
  realestate: {
    brand: "CORA IMÓVEIS",
    signature: "NEGÓCIOS IMOBILIÁRIOS",
    accent: "#b9e64b",
    accentSoft: "#e4f6b4",
    image: "/concepts/atlas-villa.webp",
    imageAlt: "Residência contemporânea selecionada por imobiliária",
    eyebrow: "BUSCA COMPLETA. ESCOLHA MAIS SEGURA.",
    title: "Todo o mercado organizado",
    titleAccent: "para você encontrar o endereço certo.",
    copy: "Inspirado no que funciona em imobiliárias reais: busca detalhada, imóveis atualizados, favoritos, códigos, bairros e atendimento no mesmo lugar — com uma estética muito mais atual.",
    cta: "Buscar imóveis",
    nav: ["Comprar", "Alugar", "Lançamentos", "Anunciar"],
    signals: ["Busca por código", "Mapa e bairros", "Favoritos", "Área do cliente"],
    filters: [["Negócio", "Comprar"], ["Tipo", "Casa"], ["Cidade", "Eunápolis"], ["Quartos", "3+"]],
    consoleLabel: "BUSCA ATUALIZADA · 36 RESULTADOS",
    consoleTitle: "Imóveis para morar, investir ou empreender.",
    consoleCopy: "Uma central completa sem aparência de sistema antigo: filtros úteis, cards ricos e contato contextual em cada imóvel.",
    services: [["Casa Bosque", "3 suítes · 286 m²"], ["Residencial Nascente", "2 quartos · varanda"], ["Ponto Centro", "Comercial · 420 m²"]],
    journey: [["Busque", "Filtros, código ou mapa."], ["Salve", "Compare e organize favoritos."], ["Visite", "Converse sobre o imóvel escolhido."]],
    metrics: [["36", "imóveis atualizados"], ["9 bairros", "para explorar"], ["Venda + locação", "na mesma busca"]],
  },
};

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;

export function SectorPrototypePage({ type }: { type: SectorPrototypeType }) {
  const sector = sectors[type];
  const leadMessage = `Olá! Vi o conceito ${sector.brand} no portfólio da Avancini Dash e quero uma experiência nesse nível para o meu negócio.`;
  const style = {
    "--sector-accent": sector.accent,
    "--sector-accent-soft": sector.accentSoft,
  } as CSSProperties;

  return (
    <main className={`${styles.page} ${styles[type]}`} style={style}>
      <nav className={styles.nav}>
        <strong>{sector.brand}<small>{sector.signature}</small></strong>
        <div>{sector.nav.map((item) => <span key={item}>{item}</span>)}</div>
        <a href={whatsappFor(leadMessage)} target="_blank" rel="noreferrer">ATENDIMENTO <b>↗</b></a>
      </nav>

      <section className={styles.hero}>
        <Image src={sector.image} alt={sector.imageAlt} fill sizes="94vw" quality={84} priority unoptimized />
        <div className={styles.heroVeil} />
        <div className={styles.heroCopy}>
          <small><i /> {sector.eyebrow}</small>
          <h2>{sector.title}<em>{sector.titleAccent}</em></h2>
          <p>{sector.copy}</p>
          <div className={styles.heroActions}>
            <a href={whatsappFor(leadMessage)} target="_blank" rel="noreferrer">{sector.cta} <b>↗</b></a>
            <span>CONCEITO FICTÍCIO · EXPERIÊNCIA NAVEGÁVEL</span>
          </div>
        </div>
        <aside className={styles.metrics}>
          {sector.metrics.map(([value, label]) => <span key={label}><b>{value}</b><small>{label}</small></span>)}
        </aside>
      </section>

      <div className={styles.signal}>
        {[...sector.signals, ...sector.signals].map((item, index) => <span aria-hidden={index >= sector.signals.length || undefined} key={`${item}-${index}`}><i />{item}</span>)}
      </div>

      <section className={styles.experience}>
        <header>
          <div><small>{sector.consoleLabel}</small><h3>{sector.consoleTitle}</h3></div>
          <p>{sector.consoleCopy}</p>
        </header>
        <div className={styles.console}>
          <aside className={styles.filters}>
            <span className={styles.live}><i /> EXPERIÊNCIA ATIVA</span>
            {sector.filters.map(([label, value], index) => <button type="button" key={label}><small>0{index + 1} · {label}</small><strong>{value}</strong><b>⌄</b></button>)}
            <a href={whatsappFor(`${leadMessage} Quero entender como essa busca poderia funcionar para mim.`)} target="_blank" rel="noreferrer">APLICAR E CONTINUAR <b>↗</b></a>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsTop}><span>RESULTADOS / PRÓXIMOS PASSOS</span><b>VISUALIZAÇÃO AO VIVO</b></div>
            <div className={styles.cardGrid}>
              {sector.services.map(([name, detail], index) => (
                <article key={name}>
                  <div className={styles.cardImage}>
                    <Image src={sector.image} alt="" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: `${30 + index * 25}% center` }} />
                    <span>0{index + 1}</span><button type="button" aria-label={`Favoritar ${name}`}>♡</button>
                  </div>
                  <small>{sector.signature}</small>
                  <h4>{name}</h4>
                  <p>{detail}</p>
                  <a href={whatsappFor(`${leadMessage} Gostei de ${name}.`)} target="_blank" rel="noreferrer">VER DETALHES <b>↗</b></a>
                </article>
              ))}
            </div>
            <div className={styles.flow}>
              {sector.journey.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{copy}</p><i /></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.value}>
        <div><small>O SITE TRABALHA ANTES DO CONTATO</small><h3>O visitante chega com menos dúvida<br />e mais motivo para escolher.</h3></div>
        <p>A experiência não tenta impressionar só pelo visual. Ela organiza informação, antecipa objeções e conecta cada clique a um próximo passo real.</p>
      </section>

      <section className={styles.journey}>
        <header><small>JORNADA DESENHADA PARA O NEGÓCIO</small><h3>Do interesse à ação,<br />sem perder o contexto.</h3></header>
        <ol>{sector.journey.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div><b>↗</b></li>)}</ol>
      </section>

      <section className={styles.final}>
        <span>{sector.brand}</span>
        <div><small>CONCEITO FICTÍCIO · DIREÇÃO AVANCINI DASH</small><h3>Agora imagine essa clareza<br />trabalhando para a sua empresa.</h3></div>
        <a href={whatsappFor(leadMessage)} target="_blank" rel="noreferrer">QUERO UMA EXPERIÊNCIA ASSIM <b>↗</b></a>
      </section>
    </main>
  );
}
