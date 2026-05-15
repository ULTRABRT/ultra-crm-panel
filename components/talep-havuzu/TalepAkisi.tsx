import {
  HiOutlineFire,
  HiOutlineInboxStack,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { talepListesi } from "../../data/talep-havuzu";
import { TalepCard } from "./TalepCard";

export function TalepAkisi() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineInboxStack className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Canlı Talep Akışı
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Gelen Talep Akışı
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            AI her talebi kaynak, sıcaklık, eksik bilgi ve sonraki aksiyona göre
            satış hafızasına işler.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs text-white/55">
            <HiOutlineInboxStack className="h-3.5 w-3.5" />
            Tümü
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white px-3 py-1.5 text-xs font-semibold text-black">
            <HiOutlineFire className="h-3.5 w-3.5" />
            Çok sıcak
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs text-white/55">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
            AI Öncelikli
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {talepListesi.map((talep) => (
          <TalepCard key={talep.id} talep={talep} />
        ))}
      </div>
    </section>
  );
}