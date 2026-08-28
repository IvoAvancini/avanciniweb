import { AvanciniMark } from "./avancini-mark";

export function OSBrandMark({
  large = false,
}: {
  large?: boolean;
  accent?: "default" | "web" | "sync";
}) {
  return (
    <AvanciniMark
      variant="os"
      className={`oshub-mark official-brand-mark ${large ? "oshub-mark-large" : ""}`}
    />
  );
}
