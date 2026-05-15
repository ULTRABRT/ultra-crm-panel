import type { IconType } from "react-icons";
import {
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlinePhone,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { kaynakPerformansi } from "../../data/talep-havuzu";
import type { RequestSource } from "../../types/talep-havuzu";

const sourceIcons: Record<RequestSource, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineDocumentText,
  forms: HiOutlineBanknotes,
  webChat: HiOutlineGlobeAlt,
  whatsapp: HiOutlineChatBubbleLeftRight,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

export function KaynakPerformansi() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineChartBar className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Kaynak / Kampanya Radarı
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Bugünün Kaynak Gücü
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Kanallar sadece gelen talep adedine göre değil, satış kalitesi ve
            aksiyon değerine göre izlenir.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            En güçlü kaynak
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Instagram</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {kaynakPerformansi.map((source) => {
          const Icon = sourceIcons[source.source] ?? HiOutlineInboxStack;

          return (
            <article
              key={source.id}
              className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {source.sourceLabel}
                    </h3>
                    <p className="mt-1 text-xs text-white/40">
                      {source.description}
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-semibold tracking-tight text-white">
                  {source.score}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${source.score}%` }}
                />
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
                <div className="flex items-start gap-2">
                  <HiOutlineSparkles className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />

                  <p className="text-xs leading-5 text-white/45">
                    {source.sourceLabel} kaynağı bugün takip önceliği açısından
                    izlenmeli. Kaliteli lead oranı satış kararlarında dikkate
                    alınmalı.
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}