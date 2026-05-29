import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineShieldCheck,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";
import {
  customerPriorityLabels,
  customerPriorityStyles,
  customerTemperatureLabels,
  customerTemperatureStyles,
} from "../../types/musteri-kartlari";

type ProcessItem = {
  id: string;
  label: string;
  value: string;
  icon: IconType;
  strong?: boolean;
};

export function SatisSureciKarti() {
  const satis = aktifMusteriKarti.satisSureci;

  const processItems: ProcessItem[] = [
    {
      id: "lead-status",
      label: "Lead Durumu",
      value: satis.leadStatusLabel,
      icon: HiOutlineArrowTrendingUp,
      strong: true,
    },
    {
      id: "offer-status",
      label: "Teklif Durumu",
      value: satis.offerStatusLabel,
      icon: HiOutlineDocumentText,
      strong: true,
    },
    {
      id: "sales-status",
      label: "Satış Durumu",
      value: satis.salesStatusLabel,
      icon: HiOutlineShieldCheck,
    },
    {
      id: "last-action",
      label: "Son İnceleme Notu",
      value: satis.lastAction,
      icon: HiOutlineClock,
    },
    {
      id: "offer-date",
      label: "Teklif Tarihi",
      value: satis.offerDateLabel,
      icon: HiOutlineCalendarDays,
    },
    {
      id: "offer-amount",
      label: "Teklif Tutarı",
      value: satis.offerAmountLabel,
      icon: HiOutlineBanknotes,
    },
    {
      id: "potential-revenue",
      label: "Potansiyel Ciro",
      value: satis.potentialRevenueLabel,
      icon: HiOutlineBanknotes,
      strong: true,
    },
    {
      id: "actual-revenue",
      label: "Gerçekleşen Ciro",
      value: satis.actualRevenueLabel,
      icon: HiOutlineCheckCircle,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineArrowTrendingUp className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Satış Süreci
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Satış Süreci Kartı
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Müşterinin lead durumu, teklif aşaması, satış statüsü, takip tarihi
            ve potansiyel ciro bilgileri yerel satış süreci görünümünde okunur.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${customerTemperatureStyles[satis.temperature]}`}
          >
            {customerTemperatureLabels[satis.temperature]}
          </span>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${customerPriorityStyles[satis.priority]}`}
          >
            {customerPriorityLabels[satis.priority]}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {processItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className={`rounded-2xl border p-4 transition hover:border-white/20 hover:bg-white/[0.035] ${
                item.strong
                  ? "border-white/15 bg-white/[0.055]"
                  : "border-white/10 bg-black/35"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-2.5">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>

                {item.strong ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                    Kritik
                  </span>
                ) : null}
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                {item.label}
              </p>

              <p className="mt-2 text-sm font-semibold leading-6 text-white">
                {item.value}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(320px,0.6fr)]">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineFire className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Satış Önceliği
              </p>
              <p className="mt-1 text-xs text-white/40">
                AI ve No Lost Lead değerlendirmesi
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Takip Tarihi
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {satis.followUpDateLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Sorumlu
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {satis.ownerLabel}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />

              <p className="text-sm leading-6 text-white/48">
                Müşteri çok sıcak ve teklif aşamasında. Bugün incelenmezse
                fırsat riski artabilir.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineUserCircle className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Satış destek notları
              </p>
              <p className="mt-1 text-xs text-white/40">
                Bu müşteri için görünen yerel notlar
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlineDocumentText className="h-4 w-4" />
              Teklif hazırlık notu
            </button>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
              <HiOutlineCalendarDays className="h-4 w-4" />
              Takip tarihi notu
            </button>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
              <HiOutlineBanknotes className="h-4 w-4" />
              Potansiyel ciro notu
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
