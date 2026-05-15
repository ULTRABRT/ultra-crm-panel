import {
  HiOutlineArrowTrendingUp,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { inboxDetail } from "../../data/inbox";
import {
  inboxPriorityLabels,
  inboxPriorityStyles,
  inboxSentimentLabels,
  inboxSentimentStyles,
  inboxTemperatureLabels,
  inboxTemperatureStyles,
} from "../../types/inbox";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MusteriPaneli() {
  const { activeConversation } = inboxDetail;

  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden border-l border-white/10 bg-[#071522]">
      <div className="shrink-0 border-b border-white/10 px-5 py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black shadow-lg shadow-white/10">
            {getInitials(activeConversation.customerName)}
          </div>

          <span className="rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black">
            {activeConversation.aiScore} AI skor
          </span>
        </div>

        <h2 className="truncate text-lg font-semibold tracking-tight text-white">
          {activeConversation.customerName}
        </h2>

        <p className="mt-1 truncate text-sm text-white/40">
          {activeConversation.customerTypeLabel}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              inboxTemperatureStyles[activeConversation.temperature]
            }`}
          >
            {inboxTemperatureLabels[activeConversation.temperature]}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              inboxPriorityStyles[activeConversation.priority]
            }`}
          >
            {inboxPriorityLabels[activeConversation.priority]}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              inboxSentimentStyles[activeConversation.sentiment]
            }`}
          >
            {inboxSentimentLabels[activeConversation.sentiment]}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="mb-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2">
            <HiOutlineUserCircle className="h-4 w-4 text-white/50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">
              Müşteri
            </p>
          </div>

          <div className="space-y-2">
            <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                Telefon
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/75">
                {activeConversation.phone}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                Kaynak
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/75">
                {activeConversation.sourceLabel}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                Sorumlu
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/75">
                {activeConversation.assigneeLabel}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2">
            <HiOutlineShieldCheck className="h-4 w-4 text-white/50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">
              Aksiyon
            </p>
          </div>

          <p className="text-sm leading-6 text-white/58">
            {activeConversation.nextAction}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {activeConversation.hasBatteryInterest ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                <HiOutlineSparkles className="h-3 w-3" />
                Batarya
              </span>
            ) : null}

            {activeConversation.hasMissingInfo ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-semibold text-white/50">
                <HiOutlineExclamationTriangle className="h-3 w-3" />
                Eksik
              </span>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2">
            <HiOutlineSparkles className="h-4 w-4 text-white/50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">
              İşlemler
            </p>
          </div>

          <div className="space-y-2">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlinePhone className="h-4 w-4" />
              Ara
            </button>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/62 transition hover:bg-white/[0.09] hover:text-white">
              <HiOutlineArrowTrendingUp className="h-4 w-4" />
              Lead oluştur
            </button>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/62 transition hover:bg-white/[0.09] hover:text-white">
              <HiOutlineDocumentText className="h-4 w-4" />
              Teklif oluştur
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}