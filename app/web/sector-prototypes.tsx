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

const whatsappFor = (message: string) =>
  `https://wa.me/5573981019782?text=${encodeURIComponent(message)}`;

export function SectorPrototypePage({ type }: { type: SectorPrototypeType }) {
  if (type === "cars") {
    const leadMsg = "Olá! Vi o showroom da Apex Motors no portfólio da Avancini Dash e quero uma estrutura nesse nível para minha loja de carros.";
    return (
      <main className={`${styles.page} ${styles.cars}`} style={{ "--sector-accent": "#ff3823", "--sector-accent-soft": "#ffb8b0" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>APEX MOTORS<small>ESTOQUE & PROCEDÊNCIA</small></strong>
          <div><span>Estoque (48)</span><span>Financiamento</span><span>Venda seu Usado</span><span>Blindados</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONSULTOR ONLINE <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/apex-cars.jpg" alt="Showroom Apex Motors" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> PROCEDÊNCIA COMPROVADA · LAUDO 100% APROVADO</small>
            <h2>O carro certo para o seu momento.<em>Sem perder tempo no estoque errado.</em></h2>
            <p>Filtros rápidos por marca, categoria e faixa de preço com simulação de entrada e parcelas na hora.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER ESTOQUE COMPLETO <b>↗</b></a>
              <span>48 VEÍCULOS PRONTOS PARA ENTREGA</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>48</b><small>Em estoque</small></span>
            <span><b>100%</b><small>Laudo cautelar</small></span>
            <span><b>24h</b><small>Aprovação</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {[
            "BMW 320i M Sport 2024",
            "Audi Q5 Performance Híbrido",
            "Porsche Macan GTS",
            "Volvo XC60 Recharge",
            "BMW 320i M Sport 2024",
            "Audi Q5 Performance Híbrido",
          ].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>ESTOQUE SELECIONADO</small>
              <h3>Encontre por categoria e compare condições.</h3>
            </div>
            <p>O cliente pesquisa por ano, marca e valor antes de chamar o consultor.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> FILTROS DO ESTOQUE</span>
              <button type="button"><small>01 · CATEGORIA</small><strong>SUVs Premium</strong><b>⌄</b></button>
              <button type="button"><small>02 · MARCA</small><strong>BMW / Audi / Volvo</strong><b>⌄</b></button>
              <button type="button"><small>03 · FAIXA DE VALOR</small><strong>R$ 200k a R$ 380k</strong><b>⌄</b></button>
              <button type="button"><small>04 · ANO</small><strong>2023 / 2024</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero simular um financiamento.`)} target="_blank" rel="noreferrer">SIMULAR ENTRADA <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>VEÍCULOS EM DESTAQUE</span><b>DISPONÍVEL PARA TEST-DRIVE</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/apex-cars.jpg" alt="BMW 320i" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "20% center" }} />
                    <span>2024</span><button type="button">♡</button>
                  </div>
                  <small>SEDÃ PREMIUM</small>
                  <h4>BMW 320i M Sport</h4>
                  <p>8.200 km · Teto solar · Garantia de fábrica</p>
                  <a href={whatsappFor(`${leadMsg} Tenho interesse na BMW 320i.`)} target="_blank" rel="noreferrer">SIMULAR PARCELAS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/apex-cars.jpg" alt="Audi Q5" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "50% center" }} />
                    <span>2023</span><button type="button">♡</button>
                  </div>
                  <small>SUV HÍBRIDO</small>
                  <h4>Audi Q5 Performance</h4>
                  <p>19.400 km · Tração Quattro · Interior Terracota</p>
                  <a href={whatsappFor(`${leadMsg} Tenho interesse no Audi Q5.`)} target="_blank" rel="noreferrer">SIMULAR PARCELAS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/apex-cars.jpg" alt="Volvo XC60" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "80% center" }} />
                    <span>2024</span><button type="button">♡</button>
                  </div>
                  <small>PLUG-IN HYBRID</small>
                  <h4>Volvo XC60 Recharge</h4>
                  <p>12.000 km · Som Bowers & Wilkins · Blindado</p>
                  <a href={whatsappFor(`${leadMsg} Tenho interesse no Volvo XC60.`)} target="_blank" rel="noreferrer">SIMULAR PARCELAS <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Escolha & Simule</strong><p>Entrada, prazo e estimativa de parcelas transparentes.</p><i /></div>
                <div><span>02</span><strong>Avaliação do Usado</strong><p>Envie fotos e documento pelo WhatsApp para laudo prévio.</p><i /></div>
                <div><span>03</span><strong>Test-Drive Agendado</strong><p>Carro preparado e higienizado para sua visita.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>APEX MOTORS</span>
          <div><small>ESTRUTURA AUTOMOTIVA AVANCINI DASH</small><h3>Seu estoque merece uma vitrine<br />que valoriza cada veículo.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE AUTOMOTIVO ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "mechanic") {
    const leadMsg = "Olá! Vi o conceito da Torque Lab no portfólio da Avancini Dash e quero uma estrutura com diagnóstico e OS para minha oficina mecânica.";
    return (
      <main className={`${styles.page} ${styles.mechanic}`} style={{ "--sector-accent": "#29a9ff", "--sector-accent-soft": "#9dd9ff" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>TORQUE LAB<small>CENTRO DE DIAGNÓSTICO & REPARO</small></strong>
          <div><span>Acompanhar OS</span><span>Serviços</span><span>Agendar Revisão</span><span>Garantia</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">PLANTÃO DA OFICINA <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/torque-mechanic.webp" alt="Oficina Torque Lab" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> DIAGNÓSTICO ELETRÔNICO & CHECKLIST DOCUMENTADO</small>
            <h2>Seu carro explicado sem enrolação.<em>Acompanhe cada etapa da ordem de serviço.</em></h2>
            <p>Orçamento com fotos dos itens antes da aprovação, rastreamento de peças e agendamento direto.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">AGENDAR DIAGNÓSTICO <b>↗</b></a>
              <span>CONSULTA DE OS ONLINE</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>40 itens</b><small>Checklist visual</small></span>
            <span><b>1 ano</b><small>Garantia peças</small></span>
            <span><b>100%</b><small>Digital</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Diagnóstico Eletrônico", "Revisão Preventiva", "Freios & ABS", "Suspensão & Direção", "Diagnóstico Eletrônico", "Revisão Preventiva"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>CENTRAL DE SERVIÇOS</small>
              <h3>Triagem por sintoma para resolver o problema certo.</h3>
            </div>
            <p>O cliente escolhe o sintoma (ruído, luz no painel, freio) e já chega com o técnico informado.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> CONSULTA DE OS</span>
              <button type="button"><small>01 · VEÍCULO</small><strong>Sedã / SUV / Hatch</strong><b>⌄</b></button>
              <button type="button"><small>02 · SINTOMA PRINCIPAL</small><strong>Ruído na Dianteira</strong><b>⌄</b></button>
              <button type="button"><small>03 · URGÊNCIA</small><strong>Mesmo dia / Agendado</strong><b>⌄</b></button>
              <button type="button"><small>04 · CONSULTAR OS</small><strong>Digitar Placa</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero agendar uma revisão.`)} target="_blank" rel="noreferrer">SOLICITAR GUINCHO / VAGA <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>STATUS DA ORDEM DE SERVIÇO #TL-3891</span><b>EM ANDAMENTO</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/torque-mechanic.webp" alt="Diagnóstico" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                    <span>ETAPA 01</span><button type="button">✓</button>
                  </div>
                  <small>INSPEÇÃO</small>
                  <h4>Scanner Eletrônico</h4>
                  <p>Leitura de falhas em injeção, câmbio e ABS com relatório digital.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER LAUDO <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/torque-mechanic.webp" alt="Suspensão" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "60% center" }} />
                    <span>ETAPA 02</span><button type="button">✓</button>
                  </div>
                  <small>MANUTENÇÃO</small>
                  <h4>Freios & Suspensão</h4>
                  <p>Troca de pastilhas, discos e buchas com fotos enviadas antes da troca.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER ITENS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/torque-mechanic.webp" alt="Revisão" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "90% center" }} />
                    <span>ETAPA 03</span><button type="button">✓</button>
                  </div>
                  <small>FINALIZAÇÃO</small>
                  <h4>Teste de Rodagem</h4>
                  <p>Alinhamento a laser 3D e teste em pista com certificação de entrega.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">LIBERAÇÃO <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Check-in com Fotos</strong><p>Registro do estado do veículo na entrada.</p><i /></div>
                <div><span>02</span><strong>Aprovação por WhatsApp</strong><p>Você aprova apenas os itens que autorizar.</p><i /></div>
                <div><span>03</span><strong>Entrega com Garantia</strong><p>Certificado de 1 ano em todas as peças aplicadas.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>TORQUE LAB</span>
          <div><small>ESTRUTURA PARA OFICINAS AVANCINI DASH</small><h3>Passe autoridade técnica e confiança<br />desde o primeiro clique do motorista.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE DE OFICINA ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "dentistry") {
    const leadMsg = "Olá! Vi a clínica Nexo Odonto no portfólio da Avancini Dash e quero uma estrutura para minha clínica odontológica.";
    return (
      <main className={`${styles.page} ${styles.dentistry}`} style={{ "--sector-accent": "#2c8b76", "--sector-accent-soft": "#a7dfcf" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>NEXO ODONTO<small>ODONTOLOGIA INTEGRADA & ESTÉTICA</small></strong>
          <div><span>Tratamentos</span><span>Corpo Clínico</span><span>Antes & Depois</span><span>Primeira Consulta</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">AGENDAR AVALIAÇÃO <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/nexo-dental.webp" alt="Nexo Odonto" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> ACOLHIMENTO · PLANEJAMENTO DIGITAL · SEM DOR</small>
            <h2>Seu sorriso não começa no procedimento.<em>Começa na confiança e no cuidado.</em></h2>
            <p>Tratamentos explicados com clareza, fotos de casos reais e agendamento sem complicação.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONHECER OS TRATAMENTOS <b>↗</b></a>
              <span>AVALIAÇÃO COM ESCANEAMENTO 3D</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>8</b><small>Especialidades</small></span>
            <span><b>3D</b><small>Planejamento</small></span>
            <span><b>4.9★</b><small>Satisfação</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Lentes de Contato Dental", "Implantes Guiados por Computador", "Invisalign® Doctor", "Clareamento a Laser", "Lentes de Contato Dental", "Implantes Guiados"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>ESPECIALIDADES DA CLÍNICA</small>
              <h3>Tratamentos modernos com foco em resultado natural.</h3>
            </div>
            <p>O paciente entende o tempo de tratamento, o processo e tira dúvidas antes da consulta.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> QUAL É O SEU OBJETIVO?</span>
              <button type="button"><small>01 · OBJETIVO</small><strong>Alinhar dentes sem metal</strong><b>⌄</b></button>
              <button type="button"><small>02 · PROCEDIMENTO</small><strong>Alinhadores Invisíveis</strong><b>⌄</b></button>
              <button type="button"><small>03 · DISPONIBILIDADE</small><strong>Manhã ou Tarde</strong><b>⌄</b></button>
              <button type="button"><small>04 · UNIDADE</small><strong>Centro Médico</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero agendar uma consulta odontológica.`)} target="_blank" rel="noreferrer">FALAR COM A RECEPÇÃO <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>ÁREAS DE EXCELÊNCIA</span><b>TECNOLOGIA DE PONTA</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/nexo-dental.webp" alt="Estética" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "25% center" }} />
                    <span>ESTÉTICA</span><button type="button">♥</button>
                  </div>
                  <small>PLANEJAMENTO 3D</small>
                  <h4>Lentes de Resina & Porcelana</h4>
                  <p>Harmonização do formato, cor e proporção dos dentes com naturalidade.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER CASOS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/nexo-dental.webp" alt="Ortodontia" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "50% center" }} />
                    <span>ALINHAMENTO</span><button type="button">♥</button>
                  </div>
                  <small>ORTODONTIA INVISÍVEL</small>
                  <h4>Alinhadores Transparentes</h4>
                  <p>Correção ortodôntica discreta, confortável e sem fios metálicos.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER CASOS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/nexo-dental.webp" alt="Implantes" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "75% center" }} />
                    <span>REABILITAÇÃO</span><button type="button">♥</button>
                  </div>
                  <small>CIRURGIA GUIADA</small>
                  <h4>Implantes de Alta Fixação</h4>
                  <p>Recupere a mastigação e o sorriso com procedimento minimamente invasivo.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER CASOS <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Escaneamento Digital</strong><p>Visualização do resultado antes de começar.</p><i /></div>
                <div><span>02</span><strong>Plano Personalizado</strong><p>Orçamento detalhado e parcelamento facilitado.</p><i /></div>
                <div><span>03</span><strong>Acompanhamento Humanizado</strong><p>Suporte pós-atendimento direto no WhatsApp.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>NEXO ODONTO</span>
          <div><small>ESTRUTURA PARA CLÍNICAS ODONTOLÓGICAS</small><h3>Transforme a percepção do paciente<br />e atraia tratamentos de maior valor.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE DE CLÍNICA ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "fashion") {
    const leadMsg = "Olá! Vi o editorial da Noma no portfólio da Avancini Dash e quero uma loja/vitrine nesse nível para minha marca de moda.";
    return (
      <main className={`${styles.page} ${styles.fashion}`} style={{ "--sector-accent": "#eead91", "--sector-accent-soft": "#f8d8ca" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>NOMA<small>MODA AUTORAL & ATEMPORAL</small></strong>
          <div><span>Drop 04</span><span>Alfaiataria</span><span>Linho Puro</span><span>Lookbook</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">SHOPPING BAG (0) <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/noma-fashion.jpg" alt="Noma Fashion" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> DROP 04 · FORMAS DE AGORA · TECIDOS NATURAIS</small>
            <h2>Menos tendências passageiras.<em>Mais identidade no que você veste.</em></h2>
            <p>Editorial exclusivo com caimento impecável, tabela de medidas interativa e compra rápida.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">EXPLORAR COLEÇÃO <b>↗</b></a>
              <span>FRETE GRÁTIS ACIMA DE R$ 490</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>18</b><small>Peças limitadas</small></span>
            <span><b>100%</b><small>Linho e Algodão</small></span>
            <span><b>1ª Troca</b><small>Grátis</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Blazer Alfaiataria Íris", "Calça Pantalona Linho", "Vestido Midi Areia", "Camisa Oversized Pura", "Blazer Alfaiataria Íris", "Calça Pantalona"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>COLEÇÃO EM DESTAQUE</small>
              <h3>Peças versáteis que combinam entre si.</h3>
            </div>
            <p>Imagens em alta definição com detalhes de costura, botões naturais e tabela de medidas clara.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> FILTRAR DROP</span>
              <button type="button"><small>01 · CATEGORIA</small><strong>Alfaiataria Premium</strong><b>⌄</b></button>
              <button type="button"><small>02 · TAMANHO</small><strong>P / M / G / GG</strong><b>⌄</b></button>
              <button type="button"><small>03 · TECIDO</small><strong>Linho Misto & Puro</strong><b>⌄</b></button>
              <button type="button"><small>04 · PALETA</small><strong>Tons Terrosos & Areia</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero pedir pelo WhatsApp com personal shopper.`)} target="_blank" rel="noreferrer">PERSONAL SHOPPER <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>EDITORIAL DROP 04</span><b>EDIÇÃO LIMITADA</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/noma-fashion.jpg" alt="Blazer" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                    <span>R$ 489</span><button type="button">♡</button>
                  </div>
                  <small>ALFAIATARIA</small>
                  <h4>Blazer Íris Areia</h4>
                  <p>Linho misto com ombreira suave e forro acetinado.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">COMPRAR AGORA <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/noma-fashion.jpg" alt="Pantalona" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "60% center" }} />
                    <span>R$ 369</span><button type="button">♡</button>
                  </div>
                  <small>LINHO PURO</small>
                  <h4>Pantalona Linha Alta</h4>
                  <p>Cintura alta com caimento fluido e bolsos faca.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">COMPRAR AGORA <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/noma-fashion.jpg" alt="Vestido" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "90% center" }} />
                    <span>R$ 429</span><button type="button">♡</button>
                  </div>
                  <small>VESTIDO MIDI</small>
                  <h4>Vestido Duna Cru</h4>
                  <p>Decote reto com fenda lateral elegante para dias quentes.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">COMPRAR AGORA <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Editorial Fluido</strong><p>Veja como as peças combinam em looks completos.</p><i /></div>
                <div><span>02</span><strong>Guia de Tamanhos</strong><p>Medidas exatas em centímetros sem erro.</p><i /></div>
                <div><span>03</span><strong>Envio Express</strong><p>Embalagem sustentável com aroma exclusivo.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>NOMA</span>
          <div><small>ESTRUTURA PARA MARCAS DE MODA</small><h3>Eleve o desejo pela sua marca<br />com um layout editorial de luxo.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE DE MODA ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "law") {
    const leadMsg = "Olá! Vi a Moreira & Lima no portfólio da Avancini Dash e quero uma presença digital de autoridade para meu escritório de advocacia.";
    return (
      <main className={`${styles.page} ${styles.law}`} style={{ "--sector-accent": "#c8a46a", "--sector-accent-soft": "#ead7b6" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>MOREIRA & LIMA<small>ADVOCACIA EMPRESARIAL & TRIBUTÁRIA</small></strong>
          <div><span>Áreas de Prática</span><span>Sócios</span><span>Pareceres</span><span>Consulta Segura</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CANAL CONFIDENCIAL <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/moreira-law.jpg" alt="Moreira Law" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> SEGURANÇA JURÍDICA · GOVERNANÇA CORPORATIVA</small>
            <h2>O jurídico deixa de ser obstáculo.<em>Quando a estratégia do negócio é compreendida.</em></h2>
            <p>Atuação consultiva, contratos blindados e reestruturação societária com sigilo e solidez.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONHECER ÁREAS DE PRÁTICA <b>↗</b></a>
              <span>ATENDIMENTO CORPORATIVO NACIONAL</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>18 anos</b><small>De tradição</small></span>
            <span><b>+2.4 bi</b><small>Em operações</small></span>
            <span><b>100%</b><small>Sigilo ético</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Direito Societário & M&A", "Planejamento Tributário", "Contratos Comerciais Complexos", "Contencioso Estratégico", "Direito Societário & M&A", "Planejamento Tributário"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>ÁREAS DE PRÁTICA</small>
              <h3>Soluções sob medida para empresas e famílias empresárias.</h3>
            </div>
            <p>Diagnóstico prévio de riscos e pareceres objetivos sem juridiquês desnecessário.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> CONSULTA CORPORATIVA</span>
              <button type="button"><small>01 · ÁREA</small><strong>Tributário & Fiscal</strong><b>⌄</b></button>
              <button type="button"><small>02 · MOMENTO</small><strong>Revisão de Passivo</strong><b>⌄</b></button>
              <button type="button"><small>03 · PORTE</small><strong>Médio / Grande Porte</strong><b>⌄</b></button>
              <button type="button"><small>04 · SIGILO</small><strong>Canal Criptografado</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero agendar uma reunião com os sócios.`)} target="_blank" rel="noreferrer">AGENDAR REUNIÃO <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>PRÁTICAS EM DESTAQUE</span><b>EQUIPE SÊNIOR DEDICADA</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/moreira-law.jpg" alt="Societário" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                    <span>CORPORATIVO</span><button type="button">⚖</button>
                  </div>
                  <small>ESTRUTURAÇÃO</small>
                  <h4>Societário, M&A e Holdings</h4>
                  <p>Proteção patrimonial, acordos de acionistas e fusões empresariais.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">DETALHES <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/moreira-law.jpg" alt="Tributário" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "60% center" }} />
                    <span>RECUPERAÇÃO</span><button type="button">⚖</button>
                  </div>
                  <small>COMPLIANCE</small>
                  <h4>Planejamento Tributário</h4>
                  <p>Otimização de carga tributária legal e recuperação de créditos judiciais.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">DETALHES <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/moreira-law.jpg" alt="Contratos" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "90% center" }} />
                    <span>BLINDAGEM</span><button type="button">⚖</button>
                  </div>
                  <small>PREVENÇÃO</small>
                  <h4>Contratos Comerciais</h4>
                  <p>Redação e negociação de contratos de fornecimento, tecnologia e franquias.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">DETALHES <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Análise Prévia</strong><p>Diagnóstico objetivo da situação do cliente.</p><i /></div>
                <div><span>02</span><strong>Parecer Estratégico</strong><p>Cenários, riscos e recomendações claras.</p><i /></div>
                <div><span>03</span><strong>Execução Rigorosa</strong><p>Acompanhamento direto pelos sócios responsáveis.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>MOREIRA & LIMA</span>
          <div><small>ESTRUTURA PARA ADVOCACIA AVANCINI DASH</small><h3>Transmita solidez, tradição e autoridade<br />para clientes corporativos exigentes.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE JURÍDICO ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "realestate" || type === "realtor") {
    const isRealtor = type === "realtor";
    const brandName = isRealtor ? "MARINA VALE" : "CORA IMÓVEIS";
    const subTitle = isRealtor ? "CORRETORA DE IMÓVEIS DE ALTO PADRÃO" : "IMOBILIÁRIA & LANÇAMENTOS";
    const leadMsg = `Olá! Vi o portal ${brandName} no portfólio da Avancini Dash e quero uma estrutura imobiliária completa para meus imóveis.`;
    return (
      <main className={`${styles.page} ${styles.realestate}`} style={{ "--sector-accent": "#b9e64b", "--sector-accent-soft": "#e4f6b4" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>{brandName}<small>{subTitle}</small></strong>
          <div><span>Comprar</span><span>Alugar</span><span>Lançamentos</span><span>Bairros Nobres</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CORRETOR ONLINE <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src={isRealtor ? "/concepts/marina-realty.webp" : "/concepts/atlas-villa.webp"} alt={brandName} fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> CURADORIA EXCLUSIVA · IMÓVEIS SELECIONADOS</small>
            <h2>Você não precisa visitar tudo.<em>Precisa visitar o imóvel que faz sentido.</em></h2>
            <p>Busca detalhada por código, condomínio fechado, m² e fotos panorâmicas em alta resolução.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER IMÓVEIS SELECIONADOS <b>↗</b></a>
              <span>AGENDAMENTO DE TOUR VIP</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>+140</b><small>Imóveis ativos</small></span>
            <span><b>4K</b><small>Tour virtual</small></span>
            <span><b>VIP</b><small>Atendimento</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Casa em Condomínio Fechado 480m²", "Apartamento Orla Vista Mar 3 Suítes", "Mansão Alphaville com Piscina", "Cobertura Duplex 4 Suítes", "Casa em Condomínio Fechado", "Apartamento Orla Vista Mar"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>BUSCA INTELIGENTE DE IMÓVEIS</small>
              <h3>Filtre por estilo de vida, metragem e localização.</h3>
            </div>
            <p>Cada imóvel conta com ficha técnica completa, IPTU, condomínio e botão direto para agendar visita.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> FILTROS IMOBILIÁRIOS</span>
              <button type="button"><small>01 · FINALIDADE</small><strong>Comprar Imóvel</strong><b>⌄</b></button>
              <button type="button"><small>02 · TIPO</small><strong>Casa em Condomínio</strong><b>⌄</b></button>
              <button type="button"><small>03 · BAIRRO</small><strong>Jardim Europa / Orla</strong><b>⌄</b></button>
              <button type="button"><small>04 · SUÍTES</small><strong>3 ou 4 Suítes</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero receber a seleção de imóveis.`)} target="_blank" rel="noreferrer">BUSCAR NO MAPA <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>OPORTUNIDADES EM DESTAQUE</span><b>EXCLUSIVIDADE</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/atlas-villa.webp" alt="Casa Bosque" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                    <span>R$ 1.850.000</span><button type="button">♡</button>
                  </div>
                  <small>CONDOMÍNIO FECHADO</small>
                  <h4>Residencial Villa Bosque</h4>
                  <p>4 suítes · 380 m² · Piscina aquecida e espaço gourmet.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">AGENDAR VISITA <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/marina-realty.webp" alt="Apartamento Orla" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "50% center" }} />
                    <span>R$ 1.290.000</span><button type="button">♡</button>
                  </div>
                  <small>FRENTE AO MAR</small>
                  <h4>Edifício Horizon Vista</h4>
                  <p>3 quartos (2 suítes) · 165 m² · Varanda gourmet e 2 vagas.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">AGENDAR VISITA <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/atlas-villa.webp" alt="Reserva Jardins" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "80% center" }} />
                    <span>R$ 2.400.000</span><button type="button">♡</button>
                  </div>
                  <small>ALTO LUXO</small>
                  <h4>Mansão Reserva Jardins</h4>
                  <p>5 suítes · 520 m² · Automação total e energia solar.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">AGENDAR VISITA <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Curadoria Alinhada</strong><p>Apenas opções que atendem 100% aos seus critérios.</p><i /></div>
                <div><span>02</span><strong>Visita Acompanhada</strong><p>Roteiro privativo sem pressa e com dados técnicos.</p><i /></div>
                <div><span>03</span><strong>Segurança Jurídica</strong><p>Certidões negativas e contrato redigido por especialistas.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>{brandName}</span>
          <div><small>ESTRUTURA IMOBILIÁRIA AVANCINI DASH</small><h3>Apresente seus imóveis com o requinte<br />que fecha vendas de alto valor.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM PORTAL IMOBILIÁRIO ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  if (type === "aesthetics") {
    const leadMsg = "Olá! Vi a Lumina Estética no portfólio da Avancini Dash e quero uma estrutura para minha clínica de estética.";
    return (
      <main className={`${styles.page} ${styles.aesthetics}`} style={{ "--sector-accent": "#b87091", "--sector-accent-soft": "#e8bbce" } as CSSProperties}>
        <nav className={styles.nav}>
          <strong>LUMINA<small>ESTÉTICA AVANÇADA & PROTOCOLOS FACIAIS</small></strong>
          <div><span>Protocolos</span><span>Antes & Depois</span><span>Tecnologia</span><span>Avaliação</span></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONSULTA DE AVALIAÇÃO <b>↗</b></a>
        </nav>

        <section className={styles.hero}>
          <Image src="/concepts/lumina-clinic.jpg" alt="Lumina Clinic" fill sizes="94vw" quality={84} priority unoptimized />
          <div className={styles.heroVeil} />
          <div className={styles.heroCopy}>
            <small><i /> HARMONIZAÇÃO NATURAL · CUIDADO INDIVIDUAL</small>
            <h2>Antes do protocolo, existe uma pessoa.<em>E um objetivo de beleza autêntica.</em></h2>
            <p>Tratamentos faciais e corporais sem exageros, com acompanhamento médico e resultados comprovados.</p>
            <div className={styles.heroActions}>
              <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONHECER PROTOCOLOS <b>↗</b></a>
              <span>AVALIAÇÃO FACIAL 3D</span>
            </div>
          </div>
          <aside className={styles.metrics}>
            <span><b>100%</b><small>Naturalidade</small></span>
            <span><b>3D</b><small>Mapeamento</small></span>
            <span><b>VIP</b><small>Atendimento</small></span>
          </aside>
        </section>

        <div className={styles.signal}>
          {["Bioestimuladores de Colágeno", "Harmonização Facial Natural", "Ultraformer MPT", "Protocolo Glow & Viço", "Bioestimuladores", "Ultraformer MPT"].map((item, i) => (
            <span key={i}><i /> {item}</span>
          ))}
        </div>

        <section className={styles.experience}>
          <header>
            <div>
              <small>PROTOCOLOS EXCLUSIVOS</small>
              <h3>Tratamentos focados em estímulo natural de colágeno.</h3>
            </div>
            <p>Explicamos as etapas, o tempo de recuperação e a durabilidade de cada cuidado.</p>
          </header>

          <div className={styles.console}>
            <aside className={styles.filters}>
              <span className={styles.live}><i /> MAPA DE CUIDADO</span>
              <button type="button"><small>01 · REGIÃO</small><strong>Rosto & Pescoço</strong><b>⌄</b></button>
              <button type="button"><small>02 · OBJETIVO</small><strong>Firmeza & Viço</strong><b>⌄</b></button>
              <button type="button"><small>03 · RECUPERAÇÃO</small><strong>Imediata (Sem Downtime)</strong><b>⌄</b></button>
              <button type="button"><small>04 · SESSÕES</small><strong>1 a 3 Sessões</strong><b>⌄</b></button>
              <a href={whatsappFor(`${leadMsg} Quero agendar uma avaliação estética.`)} target="_blank" rel="noreferrer">AGENDAR AVALIAÇÃO <b>↗</b></a>
            </aside>

            <div className={styles.results}>
              <div className={styles.resultsTop}><span>PROTOCOLOS RECOMENDADOS</span><b>RESULTADOS NATURAIS</b></div>
              <div className={styles.cardGrid}>
                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/lumina-clinic.jpg" alt="Bioestimulador" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                    <span>COLÁGENO</span><button type="button">♥</button>
                  </div>
                  <small>FIRMEZA</small>
                  <h4>Bioestimulador de Colágeno</h4>
                  <p>Redefinição do contorno facial com efeito lifting progressivo e duradouro.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER RESULTADOS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/lumina-clinic.jpg" alt="Ultraformer" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "60% center" }} />
                    <span>ULTRASSOM</span><button type="button">♥</button>
                  </div>
                  <small>LIFTING NÃO-CIRÚRGICO</small>
                  <h4>Ultraformer MPT</h4>
                  <p>Tecnologia microfocada para compactação de gordura e tração da pele.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER RESULTADOS <b>↗</b></a>
                </article>

                <article>
                  <div className={styles.cardImage}>
                    <Image src="/concepts/lumina-clinic.jpg" alt="Glow Facial" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "90% center" }} />
                    <span>LUMINOSIDADE</span><button type="button">♥</button>
                  </div>
                  <small>TEXTURA & VIÇO</small>
                  <h4>Protocolo Lumina Glow</h4>
                  <p>Combinação de ácidos nobres e ativos hidratantes para renovação imediata.</p>
                  <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">VER RESULTADOS <b>↗</b></a>
                </article>
              </div>

              <div className={styles.flow}>
                <div><span>01</span><strong>Avaliação 3D</strong><p>Análise detalhada da pele e das camadas de sustentação.</p><i /></div>
                <div><span>02</span><strong>Protocolo Sob Medida</strong><p>Você recebe um plano em etapas com valores claros.</p><i /></div>
                <div><span>03</span><strong>Acompanhamento Fotográfico</strong><p>Evolução documentada mês a mês.</p><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <span>LUMINA</span>
          <div><small>ESTRUTURA PARA CLÍNICAS DE ESTÉTICA</small><h3>Posicione sua clínica no mais alto padrão<br />e atraia pacientes que valorizam naturalidade.</h3></div>
          <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE DE ESTÉTICA ASSIM <b>↗</b></a>
        </section>
      </main>
    );
  }

  // Autonomous / Caio Move
  const leadMsg = "Olá! Vi o conceito Caio Move no portfólio da Avancini Dash e quero uma presença digital forte para minha consultoria/marca pessoal.";
  return (
    <main className={`${styles.page} ${styles.autonomous}`} style={{ "--sector-accent": "#9edb3b", "--sector-accent-soft": "#d8f6a7" } as CSSProperties}>
      <nav className={styles.nav}>
        <strong>CAIO MOVE<small>PERFORMANCE & MOVIMENTO HUMANO</small></strong>
        <div><span>Método</span><span>Programas</span><span>Resultados</span><span>Agenda</span></div>
        <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONSULTORIA ONLINE <b>↗</b></a>
      </nav>

      <section className={styles.hero}>
        <Image src="/concepts/caio-move.webp" alt="Caio Move" fill sizes="94vw" quality={84} priority unoptimized />
        <div className={styles.heroVeil} />
        <div className={styles.heroCopy}>
          <small><i /> TREINAMENTO INDIVIDUALIZADO · CONDICIONAMENTO REAL</small>
          <h2>Seu método precisa parecer tão forte<em>quanto os resultados que você entrega.</em></h2>
          <p>Planilhas dinâmicas, vídeos de execução, calculadora de metas e agenda direta no WhatsApp.</p>
          <div className={styles.heroActions}>
            <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">CONHECER PROGRAMAS <b>↗</b></a>
            <span>VAGAS LIMITADAS PARA CONSULTORIA</span>
          </div>
        </div>
        <aside className={styles.metrics}>
          <span><b>8 semanas</b><small>Ciclo base</small></span>
          <span><b>1:1</b><small>Acompanhamento</small></span>
          <span><b>100%</b><small>Personalizado</small></span>
        </aside>
      </section>

      <div className={styles.signal}>
        {["Consultoria Online Individual", "Acompanhamento Presencial VIP", "Periodização de Força & Mobilidade", "App com Vídeos de Execução", "Consultoria Online", "Acompanhamento VIP"].map((item, i) => (
          <span key={i}><i /> {item}</span>
        ))}
      </div>

      <section className={styles.experience}>
        <header>
          <div>
            <small>PROGRAMAS DISPONÍVEIS</small>
            <h3>Escolha a intensidade e o formato ideal para sua rotina.</h3>
          </div>
          <p>O aluno entende o que recebe, a frequência dos feedbacks e como funciona o aplicativo.</p>
        </header>

        <div className={styles.console}>
          <aside className={styles.filters}>
            <span className={styles.live}><i /> SEU PONTO DE PARTIDA</span>
            <button type="button"><small>01 · OBJETIVO</small><strong>Hipertrofia & Força</strong><b>⌄</b></button>
            <button type="button"><small>02 · FORMATO</small><strong>Consultoria Online (App)</strong><b>⌄</b></button>
            <button type="button"><small>03 · FREQUÊNCIA</small><strong>4x por semana</strong><b>⌄</b></button>
            <button type="button"><small>04 · SUPORTE</small><strong>Feedback Semanal WhatsApp</strong><b>⌄</b></button>
            <a href={whatsappFor(`${leadMsg} Quero entrar na consultoria.`)} target="_blank" rel="noreferrer">INICIAR AVALIAÇÃO <b>↗</b></a>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsTop}><span>PROGRAMAS ATIVOS</span><b>VAGAS DO MÊS</b></div>
            <div className={styles.cardGrid}>
              <article>
                <div className={styles.cardImage}>
                  <Image src="/concepts/caio-move.webp" alt="Online" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "30% center" }} />
                  <span>APP EXCLUSIVO</span><button type="button">★</button>
                </div>
                <small>DIGITAL</small>
                <h4>Consultoria Online Elite</h4>
                <p>Treinos adaptados à sua academia, vídeos demonstrativos e ajuste mensal de carga.</p>
                <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO ESTA VAGA <b>↗</b></a>
              </article>

              <article>
                <div className={styles.cardImage}>
                  <Image src="/concepts/caio-move.webp" alt="Presencial" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "60% center" }} />
                  <span>PRESENCIAL</span><button type="button">★</button>
                </div>
                <small>PERSONAL VIP</small>
                <h4>Personal Trainer 1:1</h4>
                <p>Acompanhamento direto em estúdio privado com foco em biomecânica e segurança.</p>
                <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO ESTA VAGA <b>↗</b></a>
              </article>

              <article>
                <div className={styles.cardImage}>
                  <Image src="/concepts/caio-move.webp" alt="Atletas" fill sizes="30vw" quality={76} unoptimized style={{ objectPosition: "90% center" }} />
                  <span>PERFORMANCE</span><button type="button">★</button>
                </div>
                <small>ALTA PERFORMANCE</small>
                <h4>Protocolo de Mobilidade & Corrida</h4>
                <p>Prevenção de lesões e ganho de potência para praticantes de corrida e cross-training.</p>
                <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO ESTA VAGA <b>↗</b></a>
              </article>
            </div>

            <div className={styles.flow}>
              <div><span>01</span><strong>Anamnese em Vídeo</strong><p>Avaliamos histórico de lesões e metas.</p><i /></div>
              <div><span>02</span><strong>Treino no App</strong><p>Cargas, repetições e vídeos na palma da mão.</p><i /></div>
              <div><span>03</span><strong>Check-in Semanal</strong><p>Ajuste contínuo para você nunca estagnar.</p><i /></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <span>CAIO MOVE</span>
        <div><small>ESTRUTURA PARA AUTÔNOMOS E PERSONAL AVANCINI DASH</small><h3>Cobrar mais caro exige parecer mais profissional.<br />Tenha uma presença que vende seu valor.</h3></div>
        <a href={whatsappFor(leadMsg)} target="_blank" rel="noreferrer">QUERO UM SITE DE AUTÔNOMO ASSIM <b>↗</b></a>
      </section>
    </main>
  );
}
