import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowTrendingUp,
  HiOutlineFire,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function LeadlerHero() {
  return (
    <section className="mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
      <div className="relative p-6 lg:p-7">
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Satış Çalışma Listesi
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Leadler
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 lg:text-base lg:leading-7">
              Satış ekibinin bugün kime, hangi öncelikle ve hangi aksiyonla
              dönüş yapacağını gösteren operasyon ekranı.
            </p>
          </div>

          <div className="arqon-action-row">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-white/20 hover:bg-white/[0.04]">
              <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
              Filtrele
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-white/20 hover:bg-white/[0.04]">
              <HiOutlineFire className="h-4 w-4" />
              Çok Sıcaklar
            </button>

            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlineArrowTrendingUp className="h-4 w-4" />
              Bugünün Öncelikleri
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
