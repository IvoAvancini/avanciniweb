export function OSBrandMark({ large = false }: { large?: boolean }) {
  return (
    <span className={`oshub-mark ${large ? "oshub-mark-large" : ""}`} aria-hidden="true">
      <i className="oshub-flare" />
      <i className="oshub-leg oshub-leg-left" />
      <i className="oshub-leg oshub-leg-right" />
      <i className="oshub-cut" />
    </span>
  );
}
