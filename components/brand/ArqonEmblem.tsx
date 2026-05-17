import type { SVGProps } from "react";

type ArqonEmblemProps = Omit<SVGProps<SVGSVGElement>, "role"> & {
  decorative?: boolean;
  label?: string;
  size?: number | string;
  variant?: "dark" | "light";
};

const darkFacets = [
  { points: "32,36 60,14 60,28 44,42", fill: "#EDEEF0" },
  { points: "60,14 88,36 76,42 60,28", fill: "#BFC3C9" },
  { points: "32,84 32,36 44,42 44,78", fill: "#9398A1" },
  { points: "88,36 88,84 76,78 76,42", fill: "#26282D" },
  { points: "60,106 32,84 44,78 60,92", fill: "#4C4F56" },
  { points: "88,84 60,106 60,92 76,78", fill: "#161719" },
  { points: "60,28 44,42 44,78 60,92", fill: "#6A6E76" },
  { points: "60,28 76,42 76,78 60,92", fill: "#34373D" },
  {
    points: "60,49 71,60 60,71 49,60",
    fill: "#F4F4F2",
    stroke: "#16181B",
    strokeWidth: 0.8,
  },
] as const;

const lightFacets = [
  { points: "32,36 60,14 60,28 44,42", fill: "#6A6E76" },
  { points: "60,14 88,36 76,42 60,28", fill: "#3A3D43" },
  { points: "32,84 32,36 44,42 44,78", fill: "#555A62" },
  { points: "88,36 88,84 76,78 76,42", fill: "#0B0C0E" },
  { points: "60,106 32,84 44,78 60,92", fill: "#2C2F35" },
  { points: "88,84 60,106 60,92 76,78", fill: "#050506" },
  { points: "60,28 44,42 44,78 60,92", fill: "#7E828A" },
  { points: "60,28 76,42 76,78 60,92", fill: "#2C2F35" },
  {
    points: "60,49 71,60 60,71 49,60",
    fill: "#0E0F12",
    stroke: "#EDEDEA",
    strokeWidth: 0.8,
  },
] as const;

export function ArqonEmblem({
  decorative = true,
  label = "Arqon",
  size = 56,
  variant = "dark",
  className = "",
  ...props
}: ArqonEmblemProps) {
  const facets = variant === "light" ? lightFacets : darkFacets;

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={className}
      height={size}
      role={decorative ? undefined : "img"}
      viewBox="0 0 120 120"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {facets.map((facet, index) => (
        <polygon
          fill={facet.fill}
          key={`${facet.points}-${index}`}
          points={facet.points}
          stroke={"stroke" in facet ? facet.stroke : undefined}
          strokeWidth={"strokeWidth" in facet ? facet.strokeWidth : undefined}
        />
      ))}
    </svg>
  );
}
