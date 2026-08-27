import React from "react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ margin: "20px 0 16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "var(--cora-muted)" }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span style={{ opacity: 0.4 }}>/</span>}
            {isLast || !item.onClick ? (
              <span style={{ color: isLast ? "var(--cora-ink)" : "var(--cora-muted)", fontWeight: isLast ? 700 : 500 }}>
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "var(--cora-muted)",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cora-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cora-muted)")}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export function EmptyState({
  title,
  subtitle,
  actionText,
  onAction,
  icon,
}: {
  title: string;
  subtitle: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "60px 24px",
        textAlign: "center",
        background: "var(--cora-white)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--cora-border)",
        margin: "24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "var(--cora-stone-light)",
          display: "grid",
          placeItems: "center",
          color: "var(--cora-accent)",
        }}
      >
        {icon || (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        )}
      </div>
      <div style={{ maxWidth: "480px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--cora-ink)" }}>{title}</h3>
        <p style={{ marginTop: "6px", color: "var(--cora-muted)", fontSize: "14px", lineHeight: "1.5" }}>{subtitle}</p>
      </div>
      {actionText && onAction && (
        <button type="button" onClick={onAction} className="cora-btn cora-btn-primary" style={{ marginTop: "8px" }}>
          {actionText}
        </button>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--cora-white)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--cora-border)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16 / 10", background: "var(--cora-stone-light)" }} />
      <div style={{ padding: "20px", display: "grid", gap: "12px" }}>
        <div style={{ width: "60%", height: "14px", background: "var(--cora-stone-light)", borderRadius: "4px" }} />
        <div style={{ width: "90%", height: "20px", background: "var(--cora-stone-light)", borderRadius: "4px" }} />
        <div style={{ width: "100%", height: "1px", background: "var(--cora-border)", margin: "4px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: "40%", height: "22px", background: "var(--cora-stone-light)", borderRadius: "4px" }} />
          <div style={{ width: "25%", height: "28px", background: "var(--cora-stone-light)", borderRadius: "6px" }} />
        </div>
      </div>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: { id: string; title: string; description?: string; type?: "success" | "info" | "warning" }[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: "auto",
            minWidth: "280px",
            maxWidth: "380px",
            padding: "14px 18px",
            borderRadius: "var(--radius-sm)",
            background: "var(--cora-ink)",
            color: "var(--cora-white)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            animation: "coraSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ display: "grid", gap: "2px" }}>
            <strong style={{ fontSize: "13.5px", fontWeight: 700 }}>{toast.title}</strong>
            {toast.description && (
              <small style={{ fontSize: "12px", color: "var(--cora-stone-light)" }}>{toast.description}</small>
            )}
          </div>
          <button
            type="button"
            onClick={() => onRemove(toast.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              padding: "2px",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
