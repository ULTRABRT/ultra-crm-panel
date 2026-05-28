"use client";

import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { useDnaSafe } from "../../context/DnaContext";
import { noLostLeadAlerts } from "../../data/dashboard";
import { resolveLabel } from "../../lib/dna/keys";
import { Badge, DataRow, SectionHeader } from "../ui";

type AiBoardroomBriefingProps = {
  className?: string;
};

export function AiBoardroomBriefing({
  className = "",
}: AiBoardroomBriefingProps) {
  const dnaContext = useDnaSafe();
  const packageLabel = dnaContext?.activeDna.meta.packageLabel
    ? resolveLabel(dnaContext.activeDna.meta.packageLabel)
    : "Sektör DNA";
  const activeDnaName = dnaContext?.activeDna.meta.name
    ? resolveLabel(dnaContext.activeDna.meta.name)
    : "operasyon";

  return (
    <section
      className={`rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/35 ${className}`}
    >
      <SectionHeader
        eyebrow="AI Boardroom"
        title="Günaydın, komut önceliği hazır."
        description={`${packageLabel} bugün açık talepler, bekleyen takipler ve gelir riski olan fırsatları ${activeDnaName} bağlamında öne çıkarıyor.`}
        rightSlot={<Badge variant="strong">Readonly</Badge>}
      />

      <div className="grid gap-3">
        <DataRow
          label="Yönetici özeti"
          value="Bugün önce bekleyen sıcak talepler kapatılmalı."
          description="Sistem, satış kaybına dönüşmeden müdahale edilmesi gereken fırsatları üst sıraya aldı."
          rightSlot={<HiOutlineSparkles className="h-5 w-5 text-white/55" />}
        />
      </div>

      <div className="mt-5 grid gap-3">
        {noLostLeadAlerts.slice(0, 3).map((alert, index) => (
          <Link
            key={alert.customer}
            href={alert.href}
            className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/20 hover:bg-white/[0.055]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                  Öncelik {index + 1}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {alert.customer}
                </h3>
                <p className="mt-1 text-sm leading-5 text-white/50">
                  {alert.issue}
                </p>
              </div>

              <HiOutlineArrowRight className="mt-1 h-5 w-5 shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/45">
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1">
                {alert.heat}
              </span>
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1">
                {alert.wait}
              </span>
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1">
                {alert.action}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
