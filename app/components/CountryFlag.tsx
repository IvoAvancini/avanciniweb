interface CountryFlagProps {
  code: string;
  className?: string;
  size?: number;
}

export function CountryFlag({ code, className = "country-flag-svg", size = 18 }: CountryFlagProps) {
  const c = code.toUpperCase();

  // Todos os 18 países mapeados com vetores SVG nítidos e padronizados
  switch (c) {
    case "BR": // Brasil
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#009b3a" />
          <polygon points="16,4.5 28,16 16,27.5 4,16" fill="#fedf00" />
          <circle cx="16" cy="16" r="6.5" fill="#002776" />
          <path d="M10.2 17.2 C13 14.2 19 14.2 21.8 17.2" stroke="#ffffff" strokeWidth="1.2" fill="none" />
        </svg>
      );

    case "US": // Estados Unidos
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#b22234" />
          <path d="M0 7.5h32M0 12.5h32M0 17.5h32M0 22.5h32M0 27.5h32" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M0 0h16v16H0z" fill="#3c3b6e" />
          <circle cx="5" cy="5" r="1.5" fill="#ffffff" />
          <circle cx="11" cy="5" r="1.5" fill="#ffffff" />
          <circle cx="8" cy="8" r="1.5" fill="#ffffff" />
          <circle cx="5" cy="11" r="1.5" fill="#ffffff" />
          <circle cx="11" cy="11" r="1.5" fill="#ffffff" />
        </svg>
      );

    case "PT": // Portugal
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#da291c" />
          <path d="M0 0 A16 16 0 0 0 0 32 L13 32 L13 0 Z" fill="#046a38" />
          <circle cx="13" cy="16" r="5" fill="#ffd100" stroke="#002776" strokeWidth="0.8" />
          <circle cx="13" cy="16" r="2.5" fill="#ffffff" />
        </svg>
      );

    case "MX": // México
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 0 0 32 L11 32 L11 0 Z" fill="#006847" />
          <path d="M32 0 A16 16 0 0 1 32 32 L21 32 L21 0 Z" fill="#ce1126" />
          <circle cx="16" cy="16" r="2.8" fill="#895b29" />
        </svg>
      );

    case "AR": // Argentina
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 1 32 0 L32 10.5 L0 10.5 Z" fill="#74acdf" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 21.5 L0 21.5 Z" fill="#74acdf" />
          <circle cx="16" cy="16" r="3" fill="#f6b40e" stroke="#b87b00" strokeWidth="0.6" />
        </svg>
      );

    case "GB": // Reino Unido
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#012169" />
          <path d="M0 0 L32 32 M32 0 L0 32" stroke="#ffffff" strokeWidth="4" />
          <path d="M0 0 L32 32 M32 0 L0 32" stroke="#c8102e" strokeWidth="2" />
          <path d="M16 0v32M0 16h32" stroke="#ffffff" strokeWidth="7" />
          <path d="M16 0v32M0 16h32" stroke="#c8102e" strokeWidth="4" />
        </svg>
      );

    case "ES": // Espanha
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffc400" />
          <path d="M0 0 A16 16 0 0 1 32 0 L32 8 L0 8 Z" fill="#aa151b" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 24 L0 24 Z" fill="#aa151b" />
          <circle cx="10" cy="16" r="2.5" fill="#aa151b" />
        </svg>
      );

    case "FR": // França
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 0 0 32 L11 32 L11 0 Z" fill="#002395" />
          <path d="M32 0 A16 16 0 0 1 32 32 L21 32 L21 0 Z" fill="#ed2939" />
        </svg>
      );

    case "DE": // Alemanha
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#dd0000" />
          <path d="M0 0 A16 16 0 0 1 32 0 L32 10.5 L0 10.5 Z" fill="#000000" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 21.5 L0 21.5 Z" fill="#ffce00" />
        </svg>
      );

    case "IT": // Itália
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 0 0 32 L11 32 L11 0 Z" fill="#009246" />
          <path d="M32 0 A16 16 0 0 1 32 32 L21 32 L21 0 Z" fill="#ce2b37" />
        </svg>
      );

    case "CA": // Canadá
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 0 0 32 L8 32 L8 0 Z" fill="#ff0000" />
          <path d="M32 0 A16 16 0 0 1 32 32 L24 32 L24 0 Z" fill="#ff0000" />
          <path d="M16 10 L18 15 L21 14 L19 17 L21 19 L17 19 L16 22 L15 19 L11 19 L13 17 L11 14 L14 15 Z" fill="#ff0000" />
        </svg>
      );

    case "CL": // Chile
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 16 L0 16 Z" fill="#d52b1e" />
          <path d="M0 0h14v16H0z" fill="#0039a6" />
          <polygon points="7,4.5 8.5,8.5 12.5,8.5 9.2,11 10.5,15 7,12.5 3.5,15 4.8,11 1.5,8.5 5.5,8.5" fill="#ffffff" />
        </svg>
      );

    case "CO": // Colômbia
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffd100" />
          <path d="M0 16h32v8H0z" fill="#003893" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 24 L0 24 Z" fill="#ce1126" />
        </svg>
      );

    case "UY": // Uruguai
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 7.5h32M0 15h32M0 22.5h32" stroke="#0038a8" strokeWidth="2.5" />
          <path d="M0 0h14v14H0z" fill="#ffffff" />
          <circle cx="7" cy="7" r="3" fill="#fcd116" stroke="#0038a8" strokeWidth="0.5" />
        </svg>
      );

    case "PY": // Paraguai
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <path d="M0 0 A16 16 0 0 1 32 0 L32 10.5 L0 10.5 Z" fill="#d52b1e" />
          <path d="M0 32 A16 16 0 0 0 32 32 L32 21.5 L0 21.5 Z" fill="#0038a8" />
          <circle cx="16" cy="16" r="2.5" fill="#ffc72c" />
        </svg>
      );

    case "JP": // Japão
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <circle cx="16" cy="16" r="7" fill="#bc002d" />
        </svg>
      );

    case "CH": // Suíça
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#ff0000" />
          <rect x="13.5" y="7" width="5" height="18" fill="#ffffff" rx="1" />
          <rect x="7" y="13.5" width="18" height="5" fill="#ffffff" rx="1" />
        </svg>
      );

    case "AU": // Austrália
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#00008b" />
          <path d="M0 0h16v16H0z" fill="#012169" />
          <path d="M0 0 L16 16 M16 0 L0 16" stroke="#ffffff" strokeWidth="2" />
          <path d="M8 0v16M0 8h16" stroke="#ffffff" strokeWidth="3.5" />
          <path d="M8 0v16M0 8h16" stroke="#e4002b" strokeWidth="2" />
          <circle cx="8" cy="24" r="2.2" fill="#ffffff" />
          <circle cx="24" cy="8" r="1" fill="#ffffff" />
          <circle cx="26" cy="15" r="1" fill="#ffffff" />
          <circle cx="23" cy="22" r="1" fill="#ffffff" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#1e293b" />
          <text x="16" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#38bdf8">
            {c.slice(0, 2)}
          </text>
        </svg>
      );
  }
}
