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
    <article className="rounded-[1.7rem] border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]">
      <div className="arqon-split-grid [--arqon-split-min:18rem]">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <ChannelIcon className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-white">
                {lead.customerName}
              </h3>

              <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] text-white/50">
                {lead.channelLabel}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${leadTemperatureStyles[lead.temperature]}`}
              >
                {leadTemperatureLabels[lead.temperature]}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${leadPriorityStyles[lead.priority]}`}
              >
                {leadPriorityLabels[lead.priority]}
              </span>

              {lead.hasBatteryInterest ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/65">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Batarya
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm font-medium text-white/85">
              {lead.interestedService}
            </p>

            <p className="mt-1 max-w-4xl text-sm leading-6 text-white/48">
              {lead.lastMessageSummary}
            </p>

            <div className="arqon-card-grid mt-4 gap-2 [--arqon-grid-min:9rem]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Durum
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.statusLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Kaynak
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.sourceLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Lokasyon
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.locationLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Aylık Fatura
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {lead.monthlyBillLabel}
                </p>
              </div>
            </div>

            <div className="arqon-card-grid mt-3 gap-2 [--arqon-grid-min:9rem]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Telefon
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.phone}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  E-posta
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.email}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Kampanya
                </p>
                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {lead.campaignLabel}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/45 p-3">
              <div className="flex items-start gap-3">
                <HiOutlineShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />

                <div>
                  <p className="text-xs font-semibold text-white/70">
                    Sıradaki en doğru aksiyon
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {lead.nextAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              AI Skor
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {lead.aiScore}
            </p>
            <p className="mt-1 text-xs text-white/40">{lead.lastUpdateLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
            <div className="mb-2 flex items-center gap-2 text-white/55">
              <HiOutlineCalendarDays className="h-4 w-4" />
              <p className="text-xs font-medium">Takip</p>
            </div>
            <p className="text-sm font-semibold text-white">
              {lead.followUpDateLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
            <div className="mb-2 flex items-center gap-2 text-white/55">
              <HiOutlineUserCircle className="h-4 w-4" />
              <p className="text-xs font-medium">Sorumlu</p>
            </div>
            <p className="text-sm font-semibold text-white">
              {lead.ownerLabel}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Risk
            </p>
            <p className="mt-1 text-xs leading-5 text-white/55">
              {lead.riskLabel}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
              <HiOutlinePhone className="h-3.5 w-3.5" />
              Ara
            </button>

            <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-white/85">
              <HiOutlineEye className="h-3.5 w-3.5" />
              Aç
            </button>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
            <HiOutlineDocumentText className="h-3.5 w-3.5" />
            Takip oluştur
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
            <HiOutlineMapPin className="h-3.5 w-3.5" />
            Keşif planla
          </button>
        </aside>
      </div>
    </article>
  );
}
