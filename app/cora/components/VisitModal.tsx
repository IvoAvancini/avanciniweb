import { useState } from "react";
import Image from "next/image";
import { useCora } from "../store/useCoraStore";

type VisitStep = 1 | 2 | 3 | 4 | 5;

export function VisitModal() {
  const {
    isVisitModalOpen,
    closeVisitModal,
    visitTargetProperty,
    properties,
    addScheduledVisit,
  } = useCora();

  const [step, setStep] = useState<VisitStep>(1);
  const [selectedPropertyId] = useState<string>(
    visitTargetProperty?.id || properties[0]?.id || ""
  );
  const [visitType, setVisitType] = useState<"presencial" | "video">("presencial");
  const [visitDate, setVisitDate] = useState<string>("");
  const [visitTime, setVisitTime] = useState<string>("15:00");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [confirmedProtocol, setConfirmedProtocol] = useState<string>("");

  if (!isVisitModalOpen) return null;

  const currentProperty =
    properties.find((p) => p.id === selectedPropertyId) ||
    visitTargetProperty ||
    properties[0];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      if (!visitDate) {
        alert("Por favor, selecione uma data para a visita.");
        return;
      }
      setStep(3);
    } else if (step === 3) setStep(4);
    else if (step === 4) {
      if (!clientName || !clientPhone) {
        alert("Por favor, preencha seu nome e telefone para contato.");
        return;
      }
      const newVisit = addScheduledVisit({
        propertyId: currentProperty.id,
        propertyTitle: currentProperty.title,
        propertyNeighborhood: currentProperty.neighborhood,
        propertyPrice: currentProperty.price,
        propertyImage: currentProperty.images[0] || "",
        visitType,
        date: visitDate,
        time: visitTime,
        clientName,
        clientPhone,
        clientEmail,
      });
      setConfirmedProtocol(newVisit.protocol);
      setStep(5);
    }
  };

  const handleClose = () => {
    closeVisitModal();
    setStep(1);
    setConfirmedProtocol("");
  };

  return (
    <div
      className="cora-modal-overlay"
      onClick={handleClose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClose();
        }
      }}
      aria-label="Fechar agendamento de visita"
    >
      <div
        className="cora-modal-card"
        style={{ maxWidth: "620px", padding: "32px" }}
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="cora-modal-close-btn"
          aria-label="Fechar agendamento"
        >
          ✕
        </button>

        {/* STEPPER HEADER */}
        {step < 5 && (
          <div style={{ marginBottom: "24px" }}>
            <span className="cora-eyebrow" style={{ margin: 0 }}>
              Etapa {step} de 4 · Agendamento Inteligente
            </span>
            <h3 style={{ fontSize: "22px", marginTop: "4px" }}>
              {step === 1 && "Escolha o formato da sua visita"}
              {step === 2 && "Selecione a data ideal"}
              {step === 3 && "Escolha o melhor horário"}
              {step === 4 && "Seus dados para confirmação"}
            </h3>
          </div>
        )}

        {/* PROPERTY MINI SUMMARY */}
        {currentProperty && step < 5 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "var(--cora-surface)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--cora-border)",
              marginBottom: "24px",
            }}
          >
            <Image
              src={currentProperty.images[0]}
              alt={currentProperty.title}
              width={54}
              height={42}
              style={{ borderRadius: "4px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "13px", display: "block", color: "var(--cora-ink)" }}>
                {currentProperty.title}
              </strong>
              <small style={{ color: "var(--cora-muted)", fontSize: "11px" }}>
                {currentProperty.neighborhood} · {currentProperty.area} m² · R${" "}
                {(currentProperty.price / 1000000).toFixed(1)}M
              </small>
            </div>
          </div>
        )}

        {/* STEP 1: FORMATO */}
        {step === 1 && (
          <div style={{ display: "grid", gap: "14px" }}>
            <div
              onClick={() => setVisitType("presencial")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setVisitType("presencial");
                }
              }}
              style={{
                padding: "18px",
                borderRadius: "var(--radius-md)",
                border: `2px solid ${visitType === "presencial" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: visitType === "presencial" ? "var(--cora-accent-soft)" : "var(--cora-white)",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <div style={{ fontSize: "24px" }}>📍</div>
              <div>
                <strong style={{ fontSize: "15px", display: "block", color: "var(--cora-ink)" }}>
                  Visita Presencial Exclusiva
                </strong>
                <p style={{ margin: "4px 0 0", color: "var(--cora-muted)", fontSize: "13px" }}>
                  Acompanhado por consultor especialista no local, com acesso completo ao condomínio e redondezas.
                </p>
              </div>
            </div>

            <div
              onClick={() => setVisitType("video")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setVisitType("video");
                }
              }}
              style={{
                padding: "18px",
                borderRadius: "var(--radius-md)",
                border: `2px solid ${visitType === "video" ? "var(--cora-accent)" : "var(--cora-border)"}`,
                background: visitType === "video" ? "var(--cora-accent-soft)" : "var(--cora-white)",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <div style={{ fontSize: "24px" }}>📱</div>
              <div>
                <strong style={{ fontSize: "15px", display: "block", color: "var(--cora-ink)" }}>
                  Tour Virtual Guiado por Vídeo (Ao Vivo)
                </strong>
                <p style={{ margin: "4px 0 0", color: "var(--cora-muted)", fontSize: "13px" }}>
                  O consultor realiza a chamada em vídeo diretamente do imóvel, tirando dúvidas de cada detalhe da planta.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATA */}
        {step === 2 && (
          <div style={{ display: "grid", gap: "16px" }}>
            <label style={{ display: "grid", gap: "8px", fontSize: "13px", fontWeight: 700, color: "var(--cora-ink)" }}>
              Escolha a data desejada:
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                style={{
                  height: "48px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--cora-border)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              />
            </label>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Amanhã", "Próximo Sábado", "Próxima Semana"].map((label, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + (idx + 1) * 2);
                    setVisitDate(d.toISOString().split("T")[0]);
                  }}
                  className="cora-btn cora-btn-secondary"
                  style={{ minHeight: "36px", padding: "0 12px", fontSize: "12px" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: HORÁRIO */}
        {step === 3 && (
          <div style={{ display: "grid", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--cora-ink)" }}>
              Horários disponíveis com consultor:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {["09:30", "11:00", "14:00", "15:30", "17:00", "18:30"].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setVisitTime(time)}
                  style={{
                    padding: "12px",
                    borderRadius: "var(--radius-sm)",
                    border: `1.5px solid ${visitTime === time ? "var(--cora-accent)" : "var(--cora-border)"}`,
                    background: visitTime === time ? "var(--cora-accent-soft)" : "var(--cora-white)",
                    color: visitTime === time ? "var(--cora-accent)" : "var(--cora-ink)",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: CONTATO */}
        {step === 4 && (
          <div style={{ display: "grid", gap: "14px" }}>
            <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              Seu nome completo *
              <input
                type="text"
                placeholder="Ex: Carolina Mendonça"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  height: "48px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--cora-border)",
                  fontSize: "14px",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              Telefone / WhatsApp *
              <input
                type="tel"
                placeholder="Ex: (11) 98765-4321"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                style={{
                  height: "48px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--cora-border)",
                  fontSize: "14px",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: "6px", fontSize: "12px", fontWeight: 700, color: "var(--cora-muted)" }}>
              E-mail para envio de confirmação
              <input
                type="email"
                placeholder="Ex: carolina@exemplo.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                style={{
                  height: "48px",
                  padding: "0 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--cora-border)",
                  fontSize: "14px",
                }}
              />
            </label>
          </div>
        )}

        {/* STEP 5: CONFIRMADO */}
        {step === 5 && (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "rgba(37, 211, 102, 0.15)",
                color: "#25d366",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
                fontSize: "28px",
              }}
            >
              ✓
            </div>
            <span className="cora-eyebrow">Visita Solicitada com Sucesso</span>
            <h3 style={{ fontSize: "24px", margin: "8px 0" }}>
              Protocolo {confirmedProtocol}
            </h3>
            <p style={{ color: "var(--cora-muted)", fontSize: "14px", maxWidth: "460px", margin: "0 auto 20px" }}>
              Sua solicitação de visita para <b>{currentProperty?.title}</b> ({visitType === "presencial" ? "Presencial" : "Tour em Vídeo"}) no dia <b>{visitDate}</b> às <b>{visitTime}</b> foi registrada e salva na sua área <b>Minha Cora</b>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="cora-btn cora-btn-primary"
              style={{ minHeight: "46px" }}
            >
              Concluir e Fechar
            </button>
          </div>
        )}

        {/* STEP BUTTONS */}
        {step < 5 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--cora-border)" }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((p) => (p - 1) as VisitStep)}
                className="cora-btn cora-btn-secondary"
                style={{ minHeight: "44px", padding: "0 18px", fontSize: "13px" }}
              >
                ← Voltar
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="cora-btn cora-btn-primary"
              style={{ minHeight: "44px", padding: "0 22px", fontSize: "13px" }}
            >
              {step === 4 ? "Confirmar Agendamento" : "Avançar →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
