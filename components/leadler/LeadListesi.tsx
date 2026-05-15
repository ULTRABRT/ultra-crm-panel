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
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineInboxStack className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Günlük Satış Çalışma Listesi
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Lead Listesi
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Leadler satış önceliğine göre sıralanır. Çok sıcak, acil takip,
            teklif bekleyen ve kaybolma riski taşıyan kayıtlar öne çıkar.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-xs font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
            <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            Gelişmiş Filtre
          </button>

          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-xs font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
            Önceliğe Göre
          </button>

          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/85">
            <HiOutlineSparkles className="h-4 w-4" />
            AI Sıralama
          </button>
        </div>
      </div>

      <div className="mb-5 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex h-12 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 text-white/45">
          <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            placeholder="Müşteri, telefon, kaynak, kampanya veya durum ara..."
          />
        </div>

        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Listeyi Dışa Aktar
        </button>
      </div>

      <div className="mb-4 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/35 p-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Varsayılan Sıralama
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Satış Önceliği
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Aktif Filtre
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Tüm Leadler</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Görünen Kayıt
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {leadListesi.length} lead
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {leadListesi.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </section>
  );
}