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
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20">
      <div className="mb-4 flex flex-col gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineInboxStack className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Lead operasyon akışı
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
            Lead cockpit sırası
          </h2>

          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-white/45">
            Satış önceliği, kanıt sinyali ve insan onayı gerektiren kayıtlar
            operasyon sırası için görünür.
          </p>
        </div>
      </div>

      {primaryLead ? (
        <div className="mb-4">
          <LeadCard lead={primaryLead} />
        </div>
      ) : null}

      <div className="mb-4 rounded-[1.4rem] border border-white/10 bg-black/30 p-3">
        <div className="arqon-action-row mb-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
            <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            Gelişmiş Filtre
          </button>

          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
            Önceliğe Göre
          </button>

          <button className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-white/85">
            <HiOutlineSparkles className="h-4 w-4" />
            AI Sıralama
          </button>
        </div>

        <div className="arqon-fluid-grid mb-3 [--arqon-grid-min:16rem]">
          <div className="arqon-search-field flex h-11 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 text-white/45">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />
            <input
              className="arqon-search-input h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Müşteri, telefon, kaynak, kampanya veya durum ara..."
            />
          </div>

          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 text-sm font-semibold text-white/62 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Listeyi Dışa Aktar
          </button>
        </div>

        <div className="arqon-card-grid [--arqon-grid-min:10rem]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Varsayılan Sıralama
            </p>
            <p className="mt-1 text-xs font-semibold text-white">
              Satış Önceliği
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Aktif Filtre
            </p>
            <p className="mt-1 text-xs font-semibold text-white">Tüm Leadler</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Görünen Kayıt
            </p>
            <p className="mt-1 text-xs font-semibold text-white">
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
