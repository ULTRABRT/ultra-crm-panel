import type { ReactNode } from "react";
import { designTokens } from "../../lib/design/tokens";

type BadgeVariant = "neutral" | "strong" | "muted" | "success" | "warning" | "danger";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: `${designTokens.surface.overlay.className} ${designTokens.text.secondary.className} ${designTokens.border.subtle.className}`,
  strong: `${designTokens.surface.inverse.className} ${designTokens.text.inverse.className} ${designTokens.border.transparent.className}`,
  muted: `${designTokens.surface.card.className} ${designTokens.text.faint.className} ${designTokens.border.muted.className}`,
  success: `${designTokens.surface.cardStrong.className} ${designTokens.text.primary.className} ${designTokens.border.strong.className}`,
  warning: `${designTokens.surface.cardStrong.className} ${designTokens.text.secondary.className} ${designTokens.border.strong.className}`,
  danger: `${designTokens.surface.cardStrong.className} ${designTokens.text.primary.className} ${designTokens.border.strong.className}`,
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center ${designTokens.radius.full.className} border px-3 py-1 text-[11px] font-semibold ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
