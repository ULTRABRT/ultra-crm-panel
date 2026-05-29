import type { IconType } from "react-icons";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import type { LeadChannel, LeadItem } from "../../types/leadler";
import {
  leadPriorityLabels,
  leadPriorityStyles,
  leadTemperatureLabels,
  leadTemperatureStyles,
} from "../../types/leadler";

type LeadCardProps = {
  lead: LeadItem;
};

const channelIcons: Record<LeadChannel, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  whatsapp: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  forms: HiOutlineBanknotes,
  webChat: HiOutlineGlobeAlt,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

export function LeadCard({ lead }: LeadCardProps) {
  const ChannelIcon = channelIcons[lead.channel] ?? HiOutlineInboxStack;

  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-black/35 p-3 transition hover:border-white/20 hover:bg-white/[0.035] lg:p-4">
      <div className="arqon-split-grid [--arqon-split-min:18rem]">
        <div className="flex min-w-0 gap-3 lg:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] lg:h-12 lg:w-12">
            <ChannelIcon className="h-4 w-4 text-white lg:h-5 lg:w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
              <h3 className="text-sm font-semibold text-white lg:text-base">
                {lead.customerName}
              </h3>

              <span className="rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[11px] text-white/50 lg:px-2.5 lg:py-1">
                {lead.channelLabel}
              </span>

              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold lg:px-2.5 lg:py-1 ${leadTemperatureStyles[lead.temperature]}`}
              >
                {leadTemperatureLabels[lead.temperature]}
              </span>

              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold lg:px-2.5 lg:py-1 ${leadPriorityStyles[lead.priority]}`}
              >
                {leadPriorityLabels[lead.priority]}
              </span>

              {lead.hasBatteryInterest ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white/65 lg:px-2.5 lg:py-1">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Batarya
                </span>
              ) : null}
            </div>

            <p className="mt-1.5 text-sm font-medium text-white/85 lg:mt-2">
              {lead.interestedService}
            </p>

            <p className="mt-1 line-clamp-2 max-w-4xl text-sm leading-5 text-white/48 lg:line-clamp-none lg:leading-6">
              {lead.lastMessageSummary}
            </p>

            <div className="arqon-card-grid mt-3 gap-2 [--arqon-grid-min:9rem] lg:mt-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Durum
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.statusLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Kaynak
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.sourceLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Lokasyon
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.locationLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Aylık Fatura
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.monthlyBillLabel}
                </p>
              </div>
            </div>

            <div className="arqon-card-grid mt-2.5 gap-2 [--arqon-grid-min:9rem] lg:mt-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Telefon
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.phone}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  E-posta
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.email}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-1.5 lg:px-3 lg:py-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
                  Kampanya
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.campaignLabel}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-black/45 p-2.5 lg:mt-4 lg:p-3">
              <div className="flex items-start gap-2.5 lg:gap-3">
                <HiOutlineShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />

                <div>
                  <p className="text-xs font-semibold text-white/70">
                    Sıradaki öneri
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {lead.nextAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid grid-cols-2 gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-2.5 lg:gap-3 lg:p-3 xl:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-2.5 lg:p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
              AI Skor
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-white lg:text-3xl">
              {lead.aiScore}
            </p>
            <p className="mt-1 text-xs text-white/40">{lead.lastUpdateLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-2.5 lg:p-3">
            <div className="mb-1.5 flex items-center gap-2 text-white/55 lg:mb-2">
              <HiOutlineCalendarDays className="h-4 w-4" />
              <p className="text-xs font-medium">Takip</p>
            </div>
            <p className="text-sm font-semibold text-white">
              {lead.followUpDateLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-2.5 lg:p-3">
            <div className="mb-1.5 flex items-center gap-2 text-white/55 lg:mb-2">
              <HiOutlineUserCircle className="h-4 w-4" />
              <p className="text-xs font-medium">Sorumlu</p>
            </div>
            <p className="text-sm font-semibold text-white">
              {lead.ownerLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-2.5 lg:p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 lg:tracking-[0.18em]">
              Risk
            </p>
            <p className="mt-1 text-xs leading-5 text-white/55">
              {lead.riskLabel}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2 py-1.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white lg:px-3 lg:py-2">
              <HiOutlinePhone className="h-3.5 w-3.5" />
              Arama notu
            </button>

            <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-xs font-semibold text-black transition hover:bg-white/85 lg:px-3 lg:py-2">
              <HiOutlineEye className="h-3.5 w-3.5" />
              İncele
            </button>
          </div>

          <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2 py-1.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white lg:gap-2 lg:px-3 lg:py-2">
            <HiOutlineDocumentText className="h-3.5 w-3.5" />
            Takip notu
          </button>

          <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2 py-1.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white lg:gap-2 lg:px-3 lg:py-2">
            <HiOutlineMapPin className="h-3.5 w-3.5" />
            Keşif notu
          </button>
        </aside>
      </div>
    </article>
  );
}
