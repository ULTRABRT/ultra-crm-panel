import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineFire,
  HiOutlineSparkles,
} from "react-icons/hi2";

export function TalepHavuzuHero() {
  return (
    <section className="mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
      <div className="relative p-6 lg:p-7">
        <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Ultra CRM / Solify Panel
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Talep Havuzu
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50 lg:text-base lg:leading-7">
              Tüm kanallardan gelen müşteri talepleri burada toplanır,
              sıcaklıklandırılır, önceliklendirilir ve satış aksiyonuna
              dönüştürülür.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-white/20 hover:bg-white/[0.04]">
              <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
              Filtrele
            </button>

            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlineFire className="h-4 w-4" />
              Öncelikli Liste
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
