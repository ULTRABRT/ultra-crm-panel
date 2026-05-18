import type { CSSProperties } from "react";
import { designTokens } from "../../lib/design/tokens";

type StatusDotStatus = "connected" | "idle" | "error" | "disconnected";

type StatusDotProps = {
  status?: StatusDotStatus;
  label?: string;
  showLabel?: boolean;
  className?: string;
};

const statusStyles: Record<StatusDotStatus, string> = {
  connected: "bg-[var(--arqon-status-connected)]",
  idle: "bg-[var(--arqon-status-idle)]",
  error: "bg-[var(--arqon-status-error)]",
  disconnected: "bg-[var(--arqon-status-disconnected)]",
};

export function StatusDot({
  status = "idle",
  label,
  showLabel = false,
  className = "",
}: StatusDotProps) {
  return (
    <span
      className={`inline-flex items-center ${designTokens.spacing[8].gap} ${className}`}
      style={
        {
          "--arqon-status-connected": designTokens.color.semantic.connected,
          "--arqon-status-idle": designTokens.color.semantic.idle,
          "--arqon-status-error": designTokens.color.semantic.error,
          "--arqon-status-disconnected": designTokens.color.semantic.disconnected,
        } as CSSProperties
      }
    >
      <span
        className={`h-2 w-2 ${designTokens.radius.full.className} ${statusStyles[status]}`}
        aria-hidden="true"
      />
      {showLabel && label && (
        <span className={`text-xs font-medium ${designTokens.text.muted.className}`}>
          {label}
        </span>
      )}
    </span>
  );
}
