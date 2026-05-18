import type { ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type EmptyStateProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-w-0 flex-col items-center justify-center border ${designTokens.border.subtle.className} ${designTokens.surface.card.className} ${designTokens.radius.xl.className} ${designTokens.spacing[24].padding} text-center ${className}`}
    >
      {icon && (
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center ${designTokens.radius.lg.className} border ${designTokens.border.subtle.className} ${designTokens.surface.overlay.className} ${designTokens.text.secondary.className}`}
        >
          {icon}
        </div>
      )}
      <h3 className={designTokens.typography.cardTitle}>{title}</h3>
      {description && (
        <div className={`mt-2 max-w-md ${designTokens.typography.body}`}>
          {description}
        </div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
