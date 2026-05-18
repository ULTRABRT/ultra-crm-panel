import type { ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type DataRowProps = {
  label: ReactNode;
  value?: ReactNode;
  description?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export function DataRow({
  label,
  value,
  description,
  rightSlot,
  className = "",
}: DataRowProps) {
  return (
    <div
      className={`flex min-w-0 items-start justify-between gap-4 border-b ${designTokens.border.muted.className} py-3 last:border-b-0 ${className}`}
    >
      <div className="min-w-0">
        <p className={`text-xs font-medium ${designTokens.text.faint.className}`}>
          {label}
        </p>
        {value && (
          <div className={`mt-1 text-sm font-semibold ${designTokens.text.primary.className}`}>
            {value}
          </div>
        )}
        {description && (
          <div className={`mt-1 text-xs leading-5 ${designTokens.text.muted.className}`}>
            {description}
          </div>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}
