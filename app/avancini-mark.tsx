type AvanciniMarkProps = {
  variant?: "os" | "dash" | "sync";
  className?: string;
};

export function AvanciniMark({ variant = "os", className = "" }: AvanciniMarkProps) {
  return (
    <span
      className={`avancini-mark avancini-mark-${variant} ${className}`.trim()}
      aria-hidden="true"
    >
      <i className="avancini-mark-orbit avancini-mark-orbit-outer" />
      <i className="avancini-mark-orbit avancini-mark-orbit-mid" />
      <i className="avancini-mark-orbit avancini-mark-orbit-inner" />
      <i className="avancini-mark-orbit avancini-mark-orbit-core" />
      <span className="avancini-mark-cap"><i /></span>
      <span className="avancini-mark-leg avancini-mark-leg-left"><i /></span>
      <span className="avancini-mark-leg avancini-mark-leg-right"><i /></span>
      <span className="avancini-mark-notch"><i /></span>
      <i className="avancini-mark-slash" />
    </span>
  );
}
