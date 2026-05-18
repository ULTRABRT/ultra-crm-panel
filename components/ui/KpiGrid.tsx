import type { ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type KpiGridProps = {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
};

const gridColumns: Record<NonNullable<KpiGridProps["columns"]>, string> = {
  2: "grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]",
  3: "grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]",
  4: "grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]",
};

export function KpiGrid({ children, className = "", columns = 3 }: KpiGridProps) {
  return (
    <div
      className={`grid items-start ${designTokens.spacing[16].gap} ${gridColumns[columns]} ${className}`}
    >
      {children}
    </div>
  );
}
