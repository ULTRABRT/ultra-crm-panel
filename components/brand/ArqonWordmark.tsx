import type { SVGProps } from "react";

type ArqonWordmarkProps = Omit<SVGProps<SVGSVGElement>, "role"> & {
  decorative?: boolean;
  label?: string;
  variant?: "dark" | "light";
};

export function ArqonWordmark({
  decorative = true,
  label = "Arqon",
  variant = "dark",
  className = "",
  ...props
}: ArqonWordmarkProps) {
  const stroke = variant === "light" ? "#1A1C20" : "#EDEEF0";

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={className}
      fill="none"
      role={decorative ? undefined : "img"}
      viewBox="0 0 680 160"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={stroke}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth="5"
      >
        <path d="M111,110 L129,46 L143,46 L161,110" />
        <line x1="118.3" x2="153.7" y1="84" y2="84" />
        <line x1="207" x2="207" y1="46" y2="110" />
        <path d="M207,46 L235,46 A16,16 0 0 1 235,78 L207,78" />
        <line x1="207" x2="245" y1="78" y2="110" />
        <circle cx="331" cy="78" r="32" />
        <line x1="340.9" x2="362.1" y1="87.9" y2="109.1" />
        <circle cx="441" cy="78" r="32" />
        <line x1="519" x2="519" y1="46" y2="110" />
        <line x1="569" x2="569" y1="46" y2="110" />
        <line x1="519" x2="569" y1="46" y2="110" />
      </g>
    </svg>
  );
}
