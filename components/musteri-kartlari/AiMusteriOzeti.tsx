import {
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";

export function AiMusteriOzeti() {
  const aiSummary = aktifMusteriKarti.aiSummary;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineSparkles className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              AI Müşteri Hafızası
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {aiSummary.title}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Müşterinin kim olduğunu, ne istediğini, hangi aşamada olduğunu ve
            sıradaki en doğru aksiyonu tek bakışta özetler.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Güven
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {aiSummary.confidenceLabel}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Müşteri Durum Özeti
              </p>
              <p className="mt-1 text-xs text-white/40">
                Yerel müşteri notlarından özetlendi
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/58">
            {aiSummary.summary}
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineArrowTrendingUp className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Önerilen Sonraki Aksiyon
              </p>
              <p className="mt-1 text-xs text-white/40">
                No Lost Lead önceliği
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/58">
            {aiSummary.recommendedAction}
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
            <div className="flex items-start gap-2">
              <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <p className="text-xs leading-5 text-white/45">
                {aiSummary.reason}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
