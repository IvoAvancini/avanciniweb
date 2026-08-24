export function OSBrandMark({
  large = false,
  accent = "default",
}: {
  large?: boolean;
  accent?: "default" | "web" | "sync";
}) {
  const width = large ? 84 : 38;
  const height = large ? 86 : 39;
  const gradientId = `a-grad-${accent}-${large ? "lg" : "sm"}`;
  const isSync = accent === "sync";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`avancini-a-svg ${large ? "avancini-a-large" : ""} ${isSync ? "avancini-a-sync" : ""}`}
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="38" y2="39" gradientUnits="userSpaceOnUse">
          {isSync ? (
            <>
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="58%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ff4059" />
              <stop offset="58%" stopColor="#e00025" />
              <stop offset="100%" stopColor="#9e001b" />
            </>
          )}
        </linearGradient>
      </defs>

      {/* Perna esquerda do A */}
      <polygon
        points="19,0 20.9,11.31 9.5,39 0,39"
        fill={`url(#${gradientId})`}
      />

      {/* Perna direita do A */}
      <polygon
        points="19,0 38,39 28.5,34.32 17.48,11.31"
        fill={`url(#${gradientId})`}
      />

      {/* Barra transversal branca inclinada (travada matematicamente) */}
      <rect
        x="8.5"
        y="22.5"
        width="21"
        height="4"
        rx="2"
        fill="#ffffff"
        transform="rotate(-17 19 24.5)"
      />
    </svg>
  );
}
