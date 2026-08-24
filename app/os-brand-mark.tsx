export function OSBrandMark({
  large = false,
  accent = "default",
}: {
  large?: boolean;
  accent?: "default" | "web" | "sync";
}) {
  return (
    <span
      className={`logo-mark avancini-a-mark ${large ? "logo-mark-large" : ""} ${accent !== "default" ? `logo-mark-${accent}` : ""}`}
      aria-hidden="true"
    >
      <i />
    </span>
  );
}
