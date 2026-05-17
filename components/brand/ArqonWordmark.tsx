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
  const tone = variant === "light" ? "text-black" : "text-white";

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={`${tone} ${className}`}
      fill="none"
      role={decorative ? undefined : "img"}
      viewBox="0 0 322 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M8 44 21.6 12H32.4L46 44" />
        <path d="M15.6 33.5H38.4" />
        <path d="M70 44V12H91.5C101 12 108 18.1 108 26.1S101 40 91.5 40H70" />
        <path d="M91.2 40 110 44" />
        <circle cx="153" cy="28" r="17" />
        <path d="M162.5 39.5 176 51" />
        <circle cx="216" cy="28" r="17" />
        <path d="M261 44V12L304 44V12" />
      </g>
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" opacity="0.38">
        <path d="M8 50H46" />
        <path d="M70 50H110" />
        <path d="M134 50H176" />
        <path d="M197 50H235" />
        <path d="M261 50H304" />
      </g>
    </svg>
  );
}
