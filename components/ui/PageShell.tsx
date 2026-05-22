import type { ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type PageShellProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className = "",
  contentClassName = "",
}: PageShellProps) {
  return (
    <section className={`min-w-0 ${className}`}>
      <div className="arqon-page-shell-head mb-6 flex min-w-0 flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <div className={designTokens.typography.label}>{eyebrow}</div>}
          <h1 className={`mt-2 ${designTokens.typography.pageTitle}`}>{title}</h1>
          {description && (
            <div className={`mt-3 max-w-3xl ${designTokens.typography.body}`}>
              {description}
            </div>
          )}
        </div>

        {actions && <div className="arqon-page-shell-actions shrink-0">{actions}</div>}
      </div>

      <div className={`min-w-0 space-y-6 ${contentClassName}`}>{children}</div>
    </section>
  );
}
