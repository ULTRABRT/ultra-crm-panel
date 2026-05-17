import type { IconType } from "react-icons";
import {
  HiOutlineBanknotes,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlinePhone,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import type { RequestSource, TalepItem } from "../../types/talep-havuzu";
import {
  priorityLabels,
  temperatureLabels,
  temperatureStyles,
} from "../../types/talep-havuzu";

type TalepCardProps = {
  talep: TalepItem;
};

const sourceIcons: Record<RequestSource, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineDocumentText,
  forms: HiOutlineBanknotes,
  webChat: HiOutlineGlobeAlt,
  whatsapp: HiOutlineChatBubbleLeftRight,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

export function TalepCard({ talep }: TalepCardProps) {
  const SourceIcon = sourceIcons[talep.source] ?? HiOutlineInboxStack;

  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]">
      <div className="arqon-split-grid [--arqon-split-min:18rem]">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <SourceIcon className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-white">
                {talep.customerName}
              </h3>

              <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] text-white/50">
                {talep.sourceLabel}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${temperatureStyles[talep.temperature]}`}
              >
                {temperatureLabels[talep.temperature]}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-medium text-white/45">
                {priorityLabels[talep.priority]}
              </span>
            </div>

            <p className="mt-2 text-sm font-medium text-white/85">
              {talep.requestTitle}
            </p>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/48">
              {talep.requestDetail}
            </p>

            <div className="arqon-card-grid mt-4 gap-2 [--arqon-grid-min:9rem]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Durum
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {talep.statusLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Sorumlu
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {talep.ownerLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Sonraki Aksiyon
                </p>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {talep.nextAction}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              AI Skor
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {talep.aiScore}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/45">{talep.timeLabel}</p>

            <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-white/85">
              <HiOutlineShieldCheck className="h-3.5 w-3.5" />
              Aç
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
