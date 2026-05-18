"use client";

import type { IconType } from "react-icons";
import { designTokens } from "../../lib/design/tokens";
import { CountUpValue } from "./CountUpValue";

type KpiCardProps = {
  label: string;
  value: string | number;
  icon?: IconType;
  description?: string;
  badge?: string;
  variant?: "default" | "highlight";
  className?: string;
  valueFormatter?: (value: number) => string;
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  description,
  badge,
  variant = "default",
  className = "",
  valueFormatter,
}: KpiCardProps) {
  const baseBg =
    variant === "highlight"
      ? designTokens.surface.cardStrong.className
      : designTokens.surface.card.className;
  const shouldCountUp = typeof value === "number" && Number.isFinite(value);

  return (
    <div
      className={`
        arqon-card-hover group relative
        ${designTokens.radius.xl.className} border ${designTokens.border.subtle.className} ${baseBg}
        ${designTokens.spacing[24].padding} ${designTokens.shadow.soft.className}
        ${className}
      `}
    >
      {/* Top row: icon + badge */}
      {(Icon || badge) && (
        <div className="mb-4 flex items-center justify-between">
          {Icon ? (
            <div
              className={`${designTokens.radius.lg.className} border ${designTokens.border.subtle.className} ${designTokens.surface.overlay.className} p-3`}
            >
              <Icon
                className={`h-5 w-5 ${designTokens.text.primary.className}`}
                aria-hidden="true"
              />
            </div>
          ) : (
            <div />
          )}

          {badge && (
            <span
              className={`${designTokens.radius.full.className} border ${designTokens.border.subtle.className} bg-black/40 px-3 py-1 text-[11px] font-medium ${designTokens.text.muted.className}`}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Label */}
      <p className={designTokens.typography.body}>{label}</p>

      {/* Value */}
      <p className={`mt-2 text-4xl font-semibold tracking-tight ${designTokens.text.primary.className}`}>
        {shouldCountUp ? (
          <CountUpValue value={value} formatter={valueFormatter} />
        ) : (
          value
        )}
      </p>

      {/* Description */}
      {description && (
        <p className={`mt-3 text-xs leading-5 ${designTokens.text.muted.className}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/*
 * Ne değişti?
 * Yeni dosya: Mevcut paneldeki KPI kartlarıyla görsel olarak özdeş atom bileşen.
 * icon kutusu (rounded-2xl bg-black/50), badge (rounded-full bg-black/40), hover geçişleri.
 * variant="highlight" ile başlangıç arka planı biraz daha koyu.
 */
