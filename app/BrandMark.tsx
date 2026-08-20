export function BrandMark({ large = false }: { large?: boolean }) {
  return (
    <span className={`os-symbol ${large ? "os-symbol-large" : ""}`} aria-hidden="true">
      <span className="symbol-orbit symbol-orbit-one" />
      <span className="symbol-orbit symbol-orbit-two" />
      <span className="symbol-flare" />
      <i className="symbol-leg symbol-leg-left" />
      <i className="symbol-leg symbol-leg-right" />
      <i className="symbol-cut" />
      <span className="symbol-dot symbol-dot-web" />
      <span className="symbol-dot symbol-dot-sync" />
    </span>
  );
}
