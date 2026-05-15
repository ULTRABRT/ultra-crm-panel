import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBolt,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { leadQuickInsights } from "../../data/leadler";

const insightIcons: Record<string, IconType> = {
  "first-call": HiOutlinePhone,
  "highest-risk": HiOutlineExclamationTriangle,
  "energy-focus": HiOutlineSparkles,
};

const todayActions = [
  {
    id: "call-hot-leads",
    title: "Çok sıcak leadleri ara",
    description:
      "Çok sıcak ve acil takip etiketli kayıtlar satış ekibinin ilk aksiyonu olmalı.",
    label: "Öncelik 1",
    icon: HiOutlineFire,
  },
  {
    id: "complete-offer-notes",
    title: "Teklif notlarını tamamla",
    description:
      "Batarya ilgisi ve aylık fatura bilgisi olan leadlerde teklif notu eksik bırakılmamalı.",
    label: "Öncelik 2",
    icon: HiOutlineDocumentText,
  },
  {
    id: "schedule-discovery",
    title: "Keşifleri netleştir",
    description:
      "Keşif isteyen fakat tarih bilgisi olmayan leadler için randevu akışı başlatılmalı.",
    label: "Öncelik 3",
    icon: HiOutlineCalendarDays,
  },
];

export function LeadAksiyonPaneli() {
  return (
    <aside className="space-y-5">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                AI Satış Asistanı
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Lead Öncelik Paneli
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/45">
              Sistem bugün ilk kime dönülmesi gerektiğini satış sinyallerine
              göre öne çıkarır.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Skor
            </p>
            <p className="text-lg font-semibold text-white">94</p>
          </div>
        </div>

        <div className="space-y-3">
          {leadQuickInsights.map((insight) => {
            const Icon = insightIcons[insight.id] ?? HiOutlineBolt;

            return (
              <article
                key={insight.id}
                className="rounded-2xl border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {insight.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/42">
                        {insight.description}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-2xl font-semibold tracking-tight text-white">
                    {insight.value}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
              <HiOutlineArrowTrendingUp className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                Bugünün Aksiyonları
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Satış Ekibi İçin Sıra
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/45">
              Günlük çalışma listesindeki ilk aksiyonlar burada netleşir.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {todayActions.map((action) => {
            const Icon = action.icon;

            return (
              <article
                key={action.id}
                className="rounded-2xl border border-white/10 bg-black/35 p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {action.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/42">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                    {action.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
          <HiOutlineCheckCircle className="h-4 w-4" />
          Aksiyonları Çalışma Listesine Al
        </button>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <HiOutlineShieldCheck className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              No Lost Lead Kontrolü
            </p>
            <p className="mt-1 text-sm leading-6 text-white/45">
              Teklif isteyen, keşif bekleyen ve çok sıcak olup bekleyen leadler
              satış kaybı oluşmadan önce işaretlenir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Riskli Lead
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">7</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Acil Takip
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">5</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
          <div className="flex items-start gap-2">
            <HiOutlineUserGroup className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
            <p className="text-xs leading-5 text-white/45">
              Satış ekibi bugün önce çok sıcak ve acil takip bekleyen leadlere
              dönmeli. Batarya ilgisi olan kayıtlar teklif sürecinde ayrıca
              işaretlenmeli.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}