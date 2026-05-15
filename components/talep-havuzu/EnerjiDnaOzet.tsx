import type { IconType } from "react-icons";
import {
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { enerjiDnaMetrikleri, sistemSagligi } from "../../data/talep-havuzu";
import type { SistemSagligi } from "../../types/talep-havuzu";

const metricIcons: Record<string, IconType> = {
  "battery-interest": HiOutlineBolt,
  "high-bill": HiOutlineSparkles,
  "discovery-waiting": HiOutlineMapPin,
};

const systemStatusStyles: Record<SistemSagligi["status"], string> = {
  active: "bg-white text-black",
  monitoring: "border border-white/20 bg-white/10 text-white",
  clean: "border border-white/10 bg-black text-white/70",
  warning: "border border-white/10 bg-black text-white/50",
};

const systemStatusIcons: Record<SistemSagligi["status"], IconType> = {
  active: HiOutlineCheckCircle,
  monitoring: HiOutlineArrowPath,
  clean: HiOutlineShieldCheck,
  warning: HiOutlineExclamationTriangle,
};

export function EnerjiDnaOzet() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineBolt className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Sektörel DNA
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            Solify Enerji DNA
          </h2>

          <p className="mt-1 text-sm leading-6 text-white/45">
            Enerji sektörüne özel satış hafızası ve operasyon sinyalleri.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Paket
          </p>
          <p className="text-sm font-semibold text-white">v1</p>
        </div>
      </div>

      <div className="space-y-3">
        {enerjiDnaMetrikleri.map((metric) => {
          const Icon = metricIcons[metric.id] ?? HiOutlineBolt;

          return (
            <article
              key={metric.id}
              className="rounded-2xl border border-white/10 bg-black/35 p-3 transition hover:border-white/20 hover:bg-white/[0.035]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-white/70" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/40">
                      {metric.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-2xl font-semibold tracking-tight text-white">
                  {metric.value}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/45 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Sistem Sağlığı</p>
            <p className="mt-1 text-xs text-white/40">
              Bağlı kanalların işleme durumu
            </p>
          </div>

          <HiOutlineArrowPath className="h-5 w-5 text-white/55" />
        </div>

        <div className="space-y-2.5">
          {sistemSagligi.map((channel) => {
            const StatusIcon =
              systemStatusIcons[channel.status] ?? HiOutlineShieldCheck;

            return (
              <div
                key={channel.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <StatusIcon className="h-4 w-4 text-white/55" />
                  <span className="text-sm text-white/65">
                    {channel.channelLabel}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${systemStatusStyles[channel.status]}`}
                >
                  {channel.statusLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}