"use client";

import { useState } from "react";
import Link from "next/link";
import { DirectionIcon } from "./direction-icon";

const pipelineSteps = [
  {
    number: "01",
    phase: "ATRAÇÃO & CONVERSÃO",
    title: "Presença Digital & Landing Pages",
    subtitle: "A primeira impressão transmite autoridade inquestionável",
    description:
      "O cliente chega através de busca orgânica ou anúncios e encontra uma experiência rápida, refinada e focada em resolver sua dor. O design autoral e as provas de valor conduzem para a ação imediata.",
    solutionLink: "/solucoes/sites",
    solutionName: "Sites & Landing Pages",
    dataExchanged: "Origem do tráfego (UTMs), intenção de busca, cliques nas ofertas e dados de contato inicial.",
    kpi: "Taxa de conversão 2x superior à média do mercado",
  },
  {
    number: "02",
    phase: "QUALIFICAÇÃO EM TEMPO REAL",
    title: "Agente IA no WhatsApp 24/7",
    subtitle: "Atendimento imediato sem filas, 24 horas por dia",
    description:
      "Assim que o visitante clica no botão de contato, nosso Agente de IA assume a conversa no WhatsApp oficial. Ele tira dúvidas específicas, entende o orçamento e coleta informações-chave em linguagem natural e humana.",
    solutionLink: "/solucoes/agentes-ia",
    solutionName: "Agentes de Inteligência Artificial",
    dataExchanged: "Transcrição da conversa, nível de urgência, faixa de investimento e preferência de horário.",
    kpi: "Tempo de primeira resposta inferior a 5 segundos",
  },
  {
    number: "03",
    phase: "ORGANIZAÇÃO COMERCIAL",
    title: "CRM & Funil de Vendas",
    subtitle: "Nenhum lead fica esquecido sem próximo passo",
    description:
      "O lead qualificado entra automaticamente na etapa correta do seu funil Kanban. O vendedor recebe o resumo da conversa com o contexto pronto para fechar a proposta, com alertas de follow-up programados.",
    solutionLink: "/solucoes/crm-automacao",
    solutionName: "CRM & Automação Comercial",
    dataExchanged: "Histórico completo, responsável pela conta, valor da oportunidade e data do próximo contato.",
    kpi: "Zero oportunidades perdidas por falta de acompanhamento",
  },
  {
    number: "04",
    phase: "TRANSAÇÃO & OPERAÇÃO",
    title: "E-commerce & Sistema Sob Medida",
    subtitle: "Vendas concluídas e rotinas sincronizadas com o ERP",
    description:
      "Para produtos físicos, o pedido é fechado via checkout transparente com Pix dinâmico ou cartão. Para serviços e indústrias, ordens de serviço e contratos são emitidos no portal operacional com baixa automática de estoque.",
    solutionLink: "/solucoes/ecommerce",
    solutionName: "E-commerce & Sistemas",
    dataExchanged: "Confirmação de pagamento, nota fiscal eletrônica, código de rastreamento e dados contábeis.",
    kpi: "Operação 100% automatizada sem digitação manual",
  },
];

export function SignalSystem() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = pipelineSteps[activeStepIndex];

  return (
    <section className="signal-system" id="sistema" aria-labelledby="signal-system-title">
      <header className="signal-system-head">
        <div className="signal-system-label" data-reveal>
          <span>04</span>
          <i />
          Fluxo Operacional Integrado
        </div>
        <h2 id="signal-system-title" data-reveal>
          Como as frentes trabalham juntas<br />
          <em>para fechar negócios</em>
        </h2>
        <p data-reveal>
          Do primeiro clique no anúncio até a emissão da nota fiscal: descubra como a Avancini OS conecta design, inteligência artificial, WhatsApp e sistemas para eliminar perdas no meio do caminho.
        </p>
      </header>

      <div className="pipeline-shell">
        {/* Navegação por Etapas do Pipeline */}
        <div className="pipeline-stepper" role="tablist" aria-label="Etapas da esteira de integração">
          {pipelineSteps.map((step, index) => {
            const isSelected = activeStepIndex === index;
            return (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`pipeline-step-btn ${isSelected ? "is-selected" : ""}`}
                onClick={() => setActiveStepIndex(index)}
              >
                <div className="step-indicator">
                  <span className="step-num">{step.number}</span>
                  <span className="step-phase">{step.phase}</span>
                </div>
                <strong className="step-title">{step.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Palco do Pipeline Selecionado */}
        <div className="pipeline-stage-card" key={activeStep.number}>
          <div className="pipeline-stage-left">
            <div className="stage-step-tag">
              <i className="pulse-dot" />
              <span>ETAPA {activeStep.number} DE 04</span>
            </div>

            <h3 className="stage-headline">{activeStep.title}</h3>
            <p className="stage-subhead">{activeStep.subtitle}</p>
            <p className="stage-description">{activeStep.description}</p>

            <div className="stage-kpi-box">
              <span className="kpi-label">IMPACTO OPERACIONAL</span>
              <strong>{activeStep.kpi}</strong>
            </div>

            <div className="stage-data-flow">
              <span className="flow-label">DADOS SINCRONIZADOS NESTA ETAPA:</span>
              <p>{activeStep.dataExchanged}</p>
            </div>

            <Link href={activeStep.solutionLink} className="stage-solution-link">
              <span>Conhecer a solução de {activeStep.solutionName}</span>
              <DirectionIcon />
            </Link>
          </div>

          <div className="pipeline-stage-right">
            <div className="pipeline-flow-diagram" aria-hidden="true">
              <div className="flow-visual-box">
                <div className="flow-badge-top">CONEXÃO EM PRODUÇÃO</div>
                <div className="flow-nodes-tree">
                  <div className={`flow-node ${activeStepIndex === 0 ? "active" : ""}`}>
                    <span>01</span>
                    <b>Site / LP</b>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className={`flow-node ${activeStepIndex === 1 ? "active" : ""}`}>
                    <span>02</span>
                    <b>Agente IA</b>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className={`flow-node ${activeStepIndex === 2 ? "active" : ""}`}>
                    <span>03</span>
                    <b>CRM WhatsApp</b>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className={`flow-node ${activeStepIndex === 3 ? "active" : ""}`}>
                    <span>04</span>
                    <b>Sistema / ERP</b>
                  </div>
                </div>

                <div className="flow-state-display">
                  <div className="display-header">
                    <span className="display-led" />
                    <span>AVANCINI OS · HUB DE INTEGRAÇÃO</span>
                  </div>
                  <div className="display-terminal">
                    <code>
                      &gt; payload_received: {activeStep.title.toLowerCase()}<br />
                      &gt; status: 200 OK (latency &lt; 40ms)<br />
                      &gt; sync_target: omni_channel_pipeline<br />
                      &gt; data_state: synchronized_without_loss
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
