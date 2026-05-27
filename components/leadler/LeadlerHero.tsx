import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowTrendingUp,
  HiOutlineFire,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function LeadlerHero() {
  return (
    <section className="mb-4 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/25">
      <div className="relative p-4 lg:p-5">
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Lead operasyon cockpit
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              Leadler
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48">
              Satış ekibinin bugünkü lead kanıtını, öncelik sırasını ve insan
              onayı gereken dönüş noktasını tek komut yüzeyinde toplar.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {["Readonly görünüm", "Yerel lead sinyalleri", "İnsan onayı"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/55"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="arqon-action-row lg:justify-end">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.04]">
              <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
              Filtrele
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.04]">
              <HiOutlineFire className="h-4 w-4" />
              Çok Sıcaklar
            </button>

            <button className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-white/85">
              <HiOutlineArrowTrendingUp className="h-4 w-4" />
              Bugünün Öncelikleri
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
