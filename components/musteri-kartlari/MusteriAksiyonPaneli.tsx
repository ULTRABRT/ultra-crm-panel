import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBellAlert,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";
import type {
  MusteriAksiyon,
  RiskLevel,
} from "../../types/musteri-kartlari";
import {
  riskLevelLabels,
  riskLevelStyles,
} from "../../types/musteri-kartlari";

const actionIcons: Record<MusteriAksiyon["type"], IconType> = {
  call: HiOutlinePhone,
  whatsapp: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  message: HiOutlineChatBubbleLeftRight,
  followUp: HiOutlineBellAlert,
  appointment: HiOutlineCalendarDays,
  offer: HiOutlineDocumentText,
  assign: HiOutlineUserGroup,
  note: HiOutlineDocumentText,
  humanReview: HiOutlineUserCircle,
};

const riskIcons: Record<RiskLevel, IconType> = {
  critical: HiOutlineExclamationTriangle,
  high: HiOutlineArrowTrendingUp,
  medium: HiOutlineShieldCheck,
  low: HiOutlineCheckCircle,
};

const primaryActionTypes: MusteriAksiyon["type"][] = [
  "call",
  "offer",
  "appointment",
];

export function MusteriAksiyonPaneli() {
  const customer = aktifMusteriKarti.ozet;
  const aiSummary = aktifMusteriKarti.aiSummary;
  const risks = aktifMusteriKarti.risks;
  const actions = aktifMusteriKarti.actions;

  const primaryActions = actions.filter((action) =>
    primaryActionTypes.includes(action.type)
  );

  const secondaryActions = actions.filter(
    (action) => !primaryActionTypes.includes(action.type)
  );

  return (
    <aside className="space-y-5">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                AI İnceleme Paneli
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Sıradaki İnceleme Önerisi
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/45">
              {customer.customerName} için fırsat riski yerel müşteri destek
              notu olarak görünür.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Güven
            </p>
            <p className="text-sm font-semibold text-white">
              {aiSummary.confidenceLabel}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineArrowTrendingUp className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                AI Önerisi
              </p>
              <p className="mt-1 text-xs text-white/40">
                No Lost Lead önceliğine göre
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/58">
            {aiSummary.recommendedAction}
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
            <div className="flex items-start gap-2">
              <HiOutlineShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
              <p className="text-xs leading-5 text-white/45">
                {aiSummary.reason}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          {primaryActions.map((action) => {
            const Icon = actionIcons[action.type] ?? HiOutlineCheckCircle;

            return (
              <button
                key={action.id}
                className="inline-flex w-full items-center justify-between gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {action.label}
                </span>

                <HiOutlineArrowTrendingUp className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineExclamationTriangle className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                No Lost Lead
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Müşteri Riskleri
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/45">
              Bu müşteriye özel kaçan fırsat uyarıları.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Açık Risk
            </p>
            <p className="text-lg font-semibold text-white">{risks.length}</p>
          </div>
        </div>

        <div className="space-y-3">
          {risks.map((risk) => {
            const RiskIcon = riskIcons[risk.level] ?? HiOutlineShieldCheck;

            return (
              <article
                key={risk.id}
                className="rounded-2xl border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <RiskIcon className="h-5 w-5 text-white/70" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-white">
                        {risk.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/42">
                        {risk.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${riskLevelStyles[risk.level]}`}
                  >
                    {riskLevelLabels[risk.level]}
                  </span>
                </div>

                <button className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
                  <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                  {risk.actionLabel}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <div className="mb-5">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineDocumentText className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Yerel Destek Notları
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            İnceleme notları
          </h2>

          <p className="mt-1 text-sm leading-6 text-white/45">
            Satış ekibi için görünen yerel müşteri destek notları.
          </p>
        </div>

        <div className="grid gap-2">
          {secondaryActions.map((action) => {
            const Icon = actionIcons[action.type] ?? HiOutlineCheckCircle;

            return (
              <button
                key={action.id}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-3 text-left transition hover:border-white/20 hover:bg-white/[0.035]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">
                    {action.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/42">
                    {action.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <HiOutlineMapPin className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Operasyon Notu
            </p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Müşteri çok sıcak, batarya ilgisi var ve keşif tarihi bekliyor.
              Önce telefon görüşmesi notu, sonra teklif ve keşif bağlamı incelenmeli.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}
