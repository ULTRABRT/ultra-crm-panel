import type { SVGProps } from "react";

type ArqonEmblemProps = Omit<SVGProps<SVGSVGElement>, "role"> & {
  decorative?: boolean;
  label?: string;
  size?: number | string;
  variant?: "dark" | "light";
};

export function ArqonEmblem({
  decorative = true,
  label = "Arqon",
  size = 56,
  variant = "dark",
  className = "",
  ...props
}: ArqonEmblemProps) {
  const tone = variant === "light" ? "text-black" : "text-white";

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={`${tone} ${className}`}
      fill="none"
      height={size}
      role={decorative ? undefined : "img"}
      viewBox="0 0 96 96"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48 6 78.5 23.5 88 48 78.5 72.5 48 90 17.5 72.5 8 48 17.5 23.5 48 6Z"
        fill="currentColor"
        opacity="0.055"
      />
      <path
        d="M48 6 78.5 23.5 88 48 78.5 72.5 48 90 17.5 72.5 8 48 17.5 23.5 48 6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        opacity="0.62"
      />
      <path
        d="M48 18 68 29.5 76 48 68 66.5 48 78 28 66.5 20 48 28 29.5 48 18Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.4"
        opacity="0.26"
      />
      <path
        d="M48 27 61.5 34.8 67 48 61.5 61.2 48 69 34.5 61.2 29 48 34.5 34.8 48 27Z"
        fill="currentColor"
        opacity="0.075"
      />
      <path
        d="M28 48H39.6L48 29.5 56.4 66.5 61.8 48H68"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
        opacity="0.86"
      />
      <path
        d="M38.8 38.4 48 28.8 57.2 38.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        opacity="0.72"
      />
      <circle cx="48" cy="48" fill="currentColor" opacity="0.84" r="2.7" />
      <path
        d="M48 6V0M48 96v-6M90 48h6M0 48h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
        opacity="0.24"
      />
    </svg>
  );
}
