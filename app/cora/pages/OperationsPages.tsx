import { useState } from "react";
import { useCora } from "../store/useCoraStore";
import { Breadcrumbs } from "../components/CommonComponents";
import { PropertyType } from "../types";

export function SubmitPropertyPage({
  onNavigateHome,
  onNavigateProperties,
}: {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}) {
  const { addPropertySubmission } = useCora();

  const [step, setStep] = useState<number>(1);
  const [purpose, setPurpose] = useState<"venda" | "locacao">("venda");
  const [propertyType, setPropertyType] = useState<PropertyType>("apartamento");
  const [city] = useState("São Paulo");
  const [neighborhood, setNeighborhood] = useState("Jardins");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState<number | "">(180);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [suites, setSuites] = useState<number>(3);
  const [parkingSpaces, setParkingSpaces] = useState<number>(2);
  const [expectedPrice, setExpectedPrice] = useState<number | "">(3500000);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedProtocol, setSubmittedProtocol] = useState("");

  const handleNext = () => {
    if (step === 7) {
      if (!ownerName || !ownerPhone) {
        alert("Por favor, preencha seu nome e telefone para contato.");
        return;
      }
      const newSub = addPropertySubmission({
        purpose,
        propertyType,
        city,
        neighborhood,
        address: address || `${neighborhood}, ${city}`,
        area: Number(area) || 100,
        bedrooms,
        suites,
        parkingSpaces,
        expectedPrice: Number(expectedPrice) || 1000000,
        ownerName,
        ownerPhone,
        ownerEmail,
        notes,
      });
      setSubmittedProtocol(newSub.protocol);
      setStep(8);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Anuncie seu Imóvel" },
        ]}
      />

      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {step < 8 && (
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span className="cora-eyebrow">Etapa {step} de 7 · Anúncio de Imóvel</span>
            <h1 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", margin: "4px 0 10px" }}>
              Seu imóvel merece uma apresentação à altura.
            </h1>
            <p style={{ color: "var(--cora-muted)", fontSize: "14.5px" }}>
              Cadastre as informações da sua propriedade para nossa equipe de curadoria realizar a avaliação.
            </p>

            {/* PROGRESS BAR */}
            <div style={{ width: "100%", height: "4px", background: "var(--cora-stone)", borderRadius: "999px", marginTop: "20px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${(step / 7) * 100}%`,
                  height: "100%",
                  background: "var(--cora-accent)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            background: "var(--cora-white)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--cora-border)",
            padding: "36px",
            boxShadow: "var(--cora-shadow-soft)",
          }}
        >
          {/* STEP 1: FINALIDADE */}
          {step === 1 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Qual é o objetivo do anúncio?</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[
                  { id: "venda", title: "Quero Vender", desc: "Avaliação mercadológica e compradores qualificados." },
                  { id: "locacao", title: "Quero Alugar", desc: "Locação rápida e garantia de gestão segura." },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPurpose(item.id as "venda" | "locacao")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setPurpose(item.id as "venda" | "locacao");
                      }
                    }}
                    aria-label={`Anunciar para ${item.title}`}
                    style={{
                      padding: "20px",
                      borderRadius: "var(--radius-md)",
                      border: `2px solid ${purpose === item.id ? "var(--cora-accent)" : "var(--cora-border)"}`,
                      background: purpose === item.id ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                      cursor: "pointer",
                    }}
                  >
                    <strong style={{ fontSize: "16px", display: "block", color: "var(--cora-ink)" }}>{item.title}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "var(--cora-muted)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: TIPO */}
          {step === 2 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Qual é o tipo do imóvel?</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {[
                  { id: "apartamento", label: "Apartamento Padrão" },
                  { id: "cobertura", label: "Cobertura / Penthouse" },
                  { id: "casa", label: "Casa / Casa de Vila" },
                  { id: "studio", label: "Studio Design" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPropertyType(item.id as PropertyType)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setPropertyType(item.id as PropertyType);
                      }
                    }}
                    aria-label={`Selecionar tipo ${item.label}`}
                    style={{
                      padding: "16px",
                      borderRadius: "var(--radius-sm)",
                      border: `1.5px solid ${propertyType === item.id ? "var(--cora-accent)" : "var(--cora-border)"}`,
                      background: propertyType === item.id ? "var(--cora-accent-soft)" : "var(--cora-surface)",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: LOCALIZAÇÃO */}
          {step === 3 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Onde fica localizado seu imóvel?</h3>
              <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                Bairro *
                <input
                  type="text"
                  placeholder="Ex: Jardins, Itaim Bibi, Moema..."
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                />
              </label>
              <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                Endereço / Condomínio (Opcional)
                <input
                  type="text"
                  placeholder="Ex: Alameda Franca ou Edifício Vila Lobos"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                />
              </label>
            </div>
          )}

          {/* STEP 4: CARACTERÍSTICAS */}
          {step === 4 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Dimensões e Divisões</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                  Área Útil Privativa (m²) *
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value ? Number(e.target.value) : "")}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                  />
                </label>
                <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                  Vagas de Garagem *
                  <input
                    type="number"
                    value={parkingSpaces}
                    onChange={(e) => setParkingSpaces(Number(e.target.value))}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                  />
                </label>
                <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                  Quartos *
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                  />
                </label>
                <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                  Suítes *
                  <input
                    type="number"
                    value={suites}
                    onChange={(e) => setSuites(Number(e.target.value))}
                    style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: PREÇO PRETENDIDO */}
          {step === 5 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Valor Pretendido</h3>
              <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                {purpose === "venda" ? "Valor de Venda Pretendido (R$)" : "Valor do Aluguel Mensal (R$)"}
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : "")}
                  style={{ height: "48px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)", fontSize: "16px", fontWeight: 700 }}
                />
              </label>
              <small style={{ color: "var(--cora-muted)", fontSize: "12px" }}>
                ✦ Nossa equipe fará um estudo comparativo de mercado (CMA) para sugerir a melhor faixa de liquidez.
              </small>
            </div>
          )}

          {/* STEP 6: OBSERVAÇÕES E FOTOS */}
          {step === 6 && (
            <div style={{ display: "grid", gap: "16px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Diferenciais & Observações</h3>
              <textarea
                rows={4}
                placeholder="Ex: Apartamento reformado em 2023, vista livre, marcenaria Ornare na cozinha e suítes, ar-condicionado em todos os cômodos..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ padding: "12px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)", fontFamily: "inherit" }}
              />
              <div style={{ padding: "16px", background: "var(--cora-surface)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--cora-stone-dark)", textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--cora-muted)" }}>
                  📸 A produção de fotos profissionais será realizada gratuitamente pela Cora após o alinhamento da proposta.
                </p>
              </div>
            </div>
          )}

          {/* STEP 7: DADOS DE CONTATO */}
          {step === 7 && (
            <div style={{ display: "grid", gap: "14px" }}>
              <h3 style={{ fontSize: "18px", margin: 0 }}>Dados do Proprietário</h3>
              <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                Nome completo *
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                />
              </label>
              <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                Telefone / WhatsApp *
                <input
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                />
              </label>
              <label style={{ display: "grid", gap: "4px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
                E-mail
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  style={{ height: "46px", padding: "0 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--cora-border)" }}
                />
              </label>
            </div>
          )}

          {/* STEP 8: CONCLUÍDO */}
          {step === 8 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
              <span className="cora-eyebrow">Recebemos Seu Imóvel</span>
              <h2 style={{ fontSize: "26px", margin: "8px 0" }}>Protocolo {submittedProtocol}</h2>
              <p style={{ color: "var(--cora-muted)", fontSize: "15px", lineHeight: "1.6", maxWidth: "520px", margin: "0 auto 24px" }}>
                Os dados da sua propriedade em <b>{neighborhood}</b> foram registrados com sucesso e salvos no seu painel <b>Minha Cora</b>.
              </p>
              <small style={{ display: "block", color: "var(--cora-muted)", fontSize: "11px", marginBottom: "24px" }}>
                * Como este é um projeto conceitual demonstrativo, os dados ficam armazenados localmente no seu navegador.
              </small>
              <button
                type="button"
                onClick={onNavigateProperties}
                className="cora-btn cora-btn-primary"
              >
                Ver Outros Imóveis no Catálogo
              </button>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          {step < 8 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--cora-border)" }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="cora-btn cora-btn-secondary"
                >
                  ← Anterior
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                className="cora-btn cora-btn-primary"
              >
                {step === 7 ? "Enviar Imóvel para Avaliação" : "Avançar →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FinancingSimulatorPage({
  onNavigateHome,
  onNavigateProperties,
}: {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}) {
  const { addSimulation } = useCora();

  const [propertyPrice, setPropertyPrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(30);
  const interestRate = 10.5; // Taxa de juros anual de referência

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;
  const termMonths = termYears * 12;

  // Cálculo SAC (Amortização Constante com parcelas decrescentes)
  const monthlyInterest = interestRate / 100 / 12;
  const amortizationPerMonth = loanAmount / termMonths;
  const firstInterest = loanAmount * monthlyInterest;
  const firstMonthlyPayment = amortizationPerMonth + firstInterest;
  
  // Última parcela SAC (saldo devedor restante é apenas 1 mês de amortização)
  const lastInterest = amortizationPerMonth * monthlyInterest;
  const lastMonthlyPayment = amortizationPerMonth + lastInterest;

  const handleSaveSimulation = () => {
    addSimulation({
      propertyPrice,
      downPayment,
      loanAmount,
      termMonths,
      interestRate,
      monthlyPayment: Math.round(firstMonthlyPayment),
      suggestedIncome: Math.round(firstMonthlyPayment * 3.3),
    });
  };

  return (
    <div className="cora-container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Breadcrumbs
        items={[
          { label: "Início", onClick: onNavigateHome },
          { label: "Simulador Financeiro" },
        ]}
      />

      <div style={{ margin: "20px 0 36px" }}>
        <span className="cora-eyebrow">Planejamento Patrimonial</span>
        <h1 style={{ fontSize: "clamp(28px, 3.8vw, 48px)", margin: "4px 0 8px" }}>
          Simulador de Aquisição Imobiliária
        </h1>
        <p style={{ color: "var(--cora-muted)", fontSize: "15px", margin: 0 }}>
          Calcule estimativas de entrada, valor financiado e projeção de parcelas iniciais e finais na Tabela SAC.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "40px", alignItems: "start" }}>
        {/* PARÂMETROS DA SIMULAÇÃO */}
        <div
          style={{
            background: "var(--cora-white)",
            padding: "32px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--cora-border)",
            display: "grid",
            gap: "26px",
            boxShadow: "var(--cora-shadow-subtle)",
          }}
        >
          <h3 style={{ fontSize: "18px", margin: 0, fontWeight: 700 }}>Parâmetros da Aquisição</h3>

          {/* 1. VALOR DO IMÓVEL */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="sim-property-price" style={{ fontSize: "13px", fontWeight: 700 }}>1. Valor do Imóvel</label>
              <strong style={{ fontSize: "16px", color: "var(--cora-accent)" }}>
                R$ {propertyPrice.toLocaleString("pt-BR")}
              </strong>
            </div>
            <input
              id="sim-property-price"
              type="range"
              min="500000"
              max="20000000"
              step="100000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--cora-accent)" }}
            />
          </div>

          {/* 2. ENTRADA */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="sim-down-payment" style={{ fontSize: "13px", fontWeight: 700 }}>2. Entrada ({downPaymentPercent}%)</label>
              <strong style={{ fontSize: "16px", color: "var(--cora-ink)" }}>
                R$ {downPayment.toLocaleString("pt-BR")}
              </strong>
            </div>
            <input
              id="sim-down-payment"
              type="range"
              min="20"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--cora-accent)" }}
            />
          </div>

          {/* 3. PRAZO */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="sim-term" style={{ fontSize: "13px", fontWeight: 700 }}>3. Prazo de Amortização</label>
              <strong style={{ fontSize: "16px", color: "var(--cora-ink)" }}>
                {termYears} anos ({termMonths} parcelas)
              </strong>
            </div>
            <input
              id="sim-term"
              type="range"
              min="5"
              max="35"
              step="5"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--cora-accent)" }}
            />
          </div>

          <button
            type="button"
            onClick={handleSaveSimulation}
            className="cora-btn cora-btn-secondary"
            style={{ width: "100%", minHeight: "46px" }}
          >
            Salvar Esta Simulação na Minha Cora
          </button>
        </div>

        {/* RESULTADOS DA SIMULAÇÃO */}
        <div
          style={{
            background: "var(--cora-ink)",
            color: "var(--cora-white)",
            padding: "36px",
            borderRadius: "var(--radius-lg)",
            display: "grid",
            gap: "22px",
            boxShadow: "var(--cora-shadow-floating)",
          }}
        >
          <div>
            <span className="cora-eyebrow" style={{ color: "var(--cora-accent-light)", margin: 0 }}>Projeção Financeira SAC</span>
            <h3 style={{ fontSize: "22px", color: "#fff", margin: "6px 0 0" }}>Resumo da Simulação</h3>
          </div>

          <div style={{ display: "grid", gap: "14px", padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--cora-stone-light)", fontSize: "14px" }}>Valor do Imóvel:</span>
              <strong style={{ fontSize: "16px" }}>R$ {propertyPrice.toLocaleString("pt-BR")}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--cora-stone-light)", fontSize: "14px" }}>Entrada Prevista:</span>
              <strong style={{ fontSize: "16px" }}>R$ {downPayment.toLocaleString("pt-BR")}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--cora-stone-light)", fontSize: "14px" }}>Valor Financiado:</span>
              <strong style={{ fontSize: "18px", color: "var(--cora-accent-light)" }}>R$ {loanAmount.toLocaleString("pt-BR")}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px dashed rgba(255,255,255,0.15)" }}>
              <span style={{ color: "var(--cora-stone-light)", fontSize: "14px" }}>Primeira Parcela Estimada:</span>
              <strong style={{ fontSize: "20px", color: "#ffffff" }}>R$ {Math.round(firstMonthlyPayment).toLocaleString("pt-BR")}/mês</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--cora-stone-light)", fontSize: "14px" }}>Última Parcela Estimada:</span>
              <strong style={{ fontSize: "17px", color: "var(--cora-stone-light)" }}>R$ {Math.round(lastMonthlyPayment).toLocaleString("pt-BR")}/mês</strong>
            </div>
          </div>

          {/* PERMANENT DISCLAIMER */}
          <div
            style={{
              padding: "14px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "12px",
              lineHeight: "1.55",
              color: "var(--cora-stone)",
            }}
          >
            ✦ <b>Simulação ilustrativa.</b> Valores não representam proposta, aprovação ou condição de instituição financeira.
          </div>

          <button
            type="button"
            onClick={onNavigateProperties}
            className="cora-btn cora-btn-primary"
            style={{ width: "100%", minHeight: "48px" }}
          >
            Ver Imóveis Disponíveis Nesta Faixa
          </button>
        </div>
      </div>
    </div>
  );
}
