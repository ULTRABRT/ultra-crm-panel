import type { IconType } from "react-icons";

type KpiCardProps = {
  label: string;
  value: string;
  icon?: IconType;
  description?: string;
  badge?: string;
  variant?: "default" | "highlight";
  className?: string;
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  description,
  badge,
  variant = "default",
  className = "",
}: KpiCardProps) {
  const baseBg =
    variant === "highlight" ? "bg-white/[0.055]" : "bg-white/[0.035]";

  return (
    <div
      className={`
        arqon-card-hover group relative
        rounded-3xl border border-white/10 ${baseBg}
        p-5 shadow-2xl shadow-black/20
        ${className}
      `}
    >
      {/* Top row: icon + badge */}
      {(Icon || badge) && (
        <div className="mb-4 flex items-center justify-between">
          {Icon ? (
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
          ) : (
            <div />
          )}

          {badge && (
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/50">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Label */}
      <p className="text-sm text-white/50">{label}</p>

      {/* Value */}
      <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
        {value}
      </p>

      {/* Description */}
      {description && (
        <p className="mt-3 text-xs leading-5 text-white/45">{description}</p>
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
