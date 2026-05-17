import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineInboxStack,
  HiOutlineMapPin,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { leadStats } from "../../data/leadler";

const statIcons: Record<string, IconType> = {
  "active-leads": HiOutlineInboxStack,
  "today-leads": HiOutlineCalendarDays,
  "very-hot-leads": HiOutlineFire,
  "urgent-followups": HiOutlineBolt,
  "offer-waiting": HiOutlineDocumentText,
  "discovery-waiting": HiOutlineMapPin,
  "late-followups": HiOutlineClock,
  "human-review": HiOutlineUserGroup,
};

const statHighlights: Record<string, string> = {
  "active-leads": "Tüm açık kayıtlar",
  "today-leads": "Bugünün akışı",
  "very-hot-leads": "Satışa yakın",
  "urgent-followups": "Aksiyon gerekli",
  "offer-waiting": "Teklif kuyruğu",
  "discovery-waiting": "Keşif planı",
  "late-followups": "Gecikmiş işler",
  "human-review": "Kontrol gerekli",
};

export function LeadStats() {
  return (
    <section className="arqon-section-gap arqon-kpi-grid [--arqon-grid-min:11.5rem]">
      {leadStats.map((stat) => {
        const Icon = statIcons[stat.id] ?? HiOutlineInboxStack;
        const highlight = statHighlights[stat.id] ?? "Operasyon verisi";
        const isCritical =
          stat.id === "urgent-followups" ||
          stat.id === "late-followups" ||
          stat.id === "human-review";

        return (
          <article
            key={stat.id}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20 transition hover:border-white/20 hover:bg-white/[0.055]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
                <Icon className="h-5 w-5 text-white" />
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  isCritical
                    ? "bg-white text-black"
                    : "border border-white/10 bg-black/40 text-white/50"
                }`}
              >
                {highlight}
              </span>
            </div>

            <p className="text-xs leading-5 text-white/50">{stat.label}</p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>

            <p className="mt-3 text-xs leading-5 text-white/42">
              {stat.description}
            </p>

            {isCritical ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/45 px-3 py-2">
                <HiOutlineExclamationTriangle className="h-4 w-4 text-white/60" />
                <span className="text-[11px] font-medium text-white/55">
                  Öncelikli kontrol
                </span>
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
