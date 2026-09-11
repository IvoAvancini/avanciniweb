interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  actionText,
  onAction,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`cora-section-header ${centered ? "is-centered" : ""} ${className}`}
      style={{
        marginBottom: "36px",
        textAlign: centered ? "center" : "left",
        display: "flex",
        flexDirection: "column",
        alignItems: centered ? "center" : "flex-start",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ maxWidth: "720px" }}>
          {eyebrow && <span className="cora-eyebrow">{eyebrow}</span>}
          <h2 className="cora-section-title" style={{ marginTop: "4px" }}>
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                marginTop: "12px",
                color: "var(--cora-muted)",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actionText && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="cora-btn cora-btn-secondary"
            style={{ padding: "0 20px", minHeight: "44px", fontSize: "13px" }}
          >
            <span>{actionText}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
