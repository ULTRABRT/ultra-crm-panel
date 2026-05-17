import type { ReactNode } from "react";

type PanelCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "soft" | "strong";
};

const variants = {
  default:
    "border-white/10 bg-white/[0.04] shadow-2xl shadow-white/[0.03]",
  soft: "border-white/10 bg-white/[0.025]",
  strong:
    "border-white/15 bg-white/[0.06] shadow-2xl shadow-white/[0.05]",
};

export function PanelCard({
  children,
  className = "",
  variant = "default",
}: PanelCardProps) {
  return (
    <div
      className={`arqon-card-hover rounded-[2rem] border backdrop-blur-xl ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
