import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineArrowTrendingUp,
  HiOutlineInboxStack,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { leadListesi } from "../../data/leadler";
import { LeadCard } from "./LeadCard";

export function LeadListesi() {
  const [primaryLead, ...supportingLeads] = leadListesi;

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/20 lg:p-4">
      <div className="mb-3 flex flex-col gap-2.5 lg:mb-4 lg:gap-3">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 lg:mb-2 lg:px-3">
            <HiOutlineInboxStack className="h-3.5 w-3.5 text-white/70 lg:h-4 lg:w-4" />
            <span className="text-xs font-medium text-white/55">
              Lead operasyon akışı
            </span>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white lg:text-2xl">
            Lead cockpit sırası
          </h2>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-white/45 lg:mt-1.5 lg:text-sm lg:leading-6">
            Satış önceliği, kanıt sinyali ve insan onayı gerektiren kayıtlar
            operasyon sırası için görünür.
          </p>
        </div>
      </div>

      {primaryLead ? (
        <div className="mb-3 lg:mb-4">
          <LeadCard lead={primaryLead} />
        </div>
      ) : null}

      <div className="mb-3 rounded-[1.4rem] border border-white/10 bg-black/30 p-2.5 lg:mb-4 lg:p-3">
        <div className="arqon-action-row mb-2.5 lg:mb-3">
          <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white lg:gap-2 lg:px-3.5 lg:py-2">
            <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            Gelişmiş Filtre
          </button>

          <button className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white lg:gap-2 lg:px-3.5 lg:py-2">
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
            Önceliğe Göre
          </button>

          <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-white/85 lg:gap-2 lg:px-3.5 lg:py-2">
            <HiOutlineSparkles className="h-4 w-4" />
            AI Sıralama
          </button>
        </div>

        <div className="arqon-fluid-grid mb-2.5 [--arqon-grid-min:13rem] lg:mb-3 lg:[--arqon-grid-min:16rem]">
          <div className="arqon-search-field flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-black/45 px-3 text-white/45 lg:h-11 lg:gap-3 lg:px-4">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />
            <input
              className="arqon-search-input h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Müşteri, telefon, kaynak, kampanya veya durum ara..."
            />
          </div>

          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 text-sm font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white lg:h-11 lg:px-4">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Listeyi Dışa Aktar
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-2 lg:px-3 lg:py-2.5">
            <p className="break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-white/35 lg:text-[10px] lg:tracking-[0.18em]">
              Varsayılan Sıralama
            </p>
            <p className="mt-1 break-words text-xs font-semibold text-white">
              Satış Önceliği
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-2 lg:px-3 lg:py-2.5">
            <p className="break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-white/35 lg:text-[10px] lg:tracking-[0.18em]">
              Seçili filtre
            </p>
            <p className="mt-1 break-words text-xs font-semibold text-white">
              Tüm Leadler
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-2 lg:px-3 lg:py-2.5">
            <p className="break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-white/35 lg:text-[10px] lg:tracking-[0.18em]">
              Görünen Kayıt
            </p>
            <p className="mt-1 break-words text-xs font-semibold text-white">
              {leadListesi.length} lead
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 xl:max-h-[42rem] xl:overflow-y-auto xl:pr-1">
        {supportingLeads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </section>
  );
}
