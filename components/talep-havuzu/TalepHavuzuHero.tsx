import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineFire,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function TalepHavuzuHero() {
  return (
    <section className="mb-3 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
      <div className="relative p-4 sm:p-5 lg:p-5">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Arqon / Talep Operasyon Merkezi
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              Talep Havuzu
            </h1>

            <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-white/50 sm:block">
              Tüm kanallardan gelen müşteri talepleri tek yerel görünümde
              okunur; sıcaklık, öncelik ve sonraki adım insan onayıyla
              değerlendirilir.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-white/55 lg:justify-end">
              <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
                Readonly görünüm
              </span>
              <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
                Yerel talep sinyalleri
              </span>
              <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
                Onay gerekir
              </span>
            </div>

            <div className="arqon-action-row lg:justify-end">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-sm font-semibold text-white/75 transition hover:border-white/20 hover:bg-white/[0.04]">
                <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
                Filtrele
              </button>

              <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85">
                <HiOutlineFire className="h-4 w-4" />
                Öncelikli Liste
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
