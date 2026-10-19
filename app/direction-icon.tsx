type DirectionIconProps = {
  direction?: "right" | "upRight";
  className?: string;
};

export function DirectionIcon({ direction = "upRight", className = "" }: DirectionIconProps) {
  const path = direction === "right" ? "M4 10h12M12 6l4 4-4 4" : "M5 15 15 5M8 5h7v7";
  return (
    <svg className={`direction-icon ${className}`.trim()} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`direction-icon ${className}`.trim()} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
