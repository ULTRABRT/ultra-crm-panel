import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineInboxStack,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { leadSegments } from "../../data/leadler";
import type { LeadSegment } from "../../types/leadler";

const segmentIcons: Record<LeadSegment, IconType> = {
  all: HiOutlineInboxStack,
  today: HiOutlineCalendarDays,
  veryHot: HiOutlineFire,
  urgentFollowUp: HiOutlineBolt,
  offerWaiting: HiOutlineDocumentText,
  discoveryWaiting: HiOutlineMapPin,
  appointmentWaiting: HiOutlineCalendarDays,
  priceAsking: HiOutlineChatBubbleLeftRight,
  batteryInterest: HiOutlineSparkles,
  technicalSupport: HiOutlineShieldCheck,
  humanReview: HiOutlineUserGroup,
  risk: HiOutlineExclamationTriangle,
};

const primarySegments: LeadSegment[] = [
  "all",
  "today",
  "veryHot",
  "urgentFollowUp",
  "offerWaiting",
  "discoveryWaiting",
];

export function LeadSegmentleri() {
  return (
    <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineSparkles className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Hazır Segmentler
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Satış Öncelik Segmentleri
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Leadler sıcaklık, takip önceliği, teklif ve keşif durumuna göre tek
            tıkla ayrıştırılır.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Seçili görünüm
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Tüm Leadler</p>
        </div>
      </div>

      <div className="arqon-card-grid [--arqon-grid-min:10.5rem]">
        {leadSegments
          .filter((segment) => primarySegments.includes(segment.id))
          .map((segment) => {
            const Icon = segmentIcons[segment.id] ?? HiOutlineInboxStack;
            const active = segment.id === "all";

            return (
              <button
                key={segment.id}
                className={`group rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-white/20 bg-white text-black shadow-2xl shadow-white/10"
                    : "border-white/10 bg-black/35 text-white hover:border-white/20 hover:bg-white/[0.035]"
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                      active
                        ? "bg-black text-white"
                        : "border border-white/10 bg-white/[0.04] text-white/65 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      active
                        ? "bg-black text-white"
                        : "border border-white/10 bg-white/[0.035] text-white/55"
                    }`}
                  >
                    {segment.count}
                  </span>
                </div>

                <p
                  className={`text-sm font-semibold ${
                    active ? "text-black" : "text-white"
                  }`}
                >
                  {segment.label}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    active ? "text-black/55" : "text-white/40"
                  }`}
                >
                  Operasyon filtresi
                </p>
              </button>
            );
          })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {leadSegments
          .filter((segment) => !primarySegments.includes(segment.id))
          .map((segment) => {
            const Icon = segmentIcons[segment.id] ?? HiOutlineInboxStack;

            return (
              <button
                key={segment.id}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs font-medium text-white/55 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
                {segment.label}
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5 text-[10px] text-white/45">
                  {segment.count}
                </span>
              </button>
            );
          })}
      </div>
    </section>
  );
}
