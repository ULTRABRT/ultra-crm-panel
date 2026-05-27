import {
  HiOutlineSparkles,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";

export function MusteriKartlariHero() {
  const customer = aktifMusteriKarti.ozet;

  return (
    <section className="mb-3 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30">
      <div className="relative p-4 sm:p-5 lg:p-5">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Müşteri kanıt hafızası
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              Müşteri Kartları
            </h1>

            <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-white/50 sm:block">
              Müşterinin kim olduğunu, nereden geldiğini, ne istediğini, hangi
              aşamada olduğunu ve hangi kanıtla değerlendirildiğini tek yerel
              hafıza yüzeyinde okutur.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/55">
                Aktif müşteri: {customer.customerName}
              </span>

              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/55">
                Kaynak: {customer.lastSourceLabel}
              </span>

              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/55">
                Sorumlu: {customer.ownerLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-white/55 xl:justify-end">
            <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
              Readonly hafıza
            </span>
            <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
              Yerel kanıt
            </span>
            <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1">
              Onay gerekir
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
