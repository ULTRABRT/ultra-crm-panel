import type { IconType } from "react-icons";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowTrendingUp,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlinePhone,
} from "react-icons/hi2";

import { kritikAksiyonlar } from "../../data/talep-havuzu";
import type { RequestPriority } from "../../types/talep-havuzu";
import { priorityLabels } from "../../types/talep-havuzu";

const priorityIcons: Record<RequestPriority, IconType> = {
  critical: HiOutlinePhone,
  high: HiOutlineArrowTrendingUp,
  medium: HiOutlineAdjustmentsHorizontal,
  low: HiOutlineCheckCircle,
};

const priorityStyles: Record<RequestPriority, string> = {
  critical: "bg-white text-black",
  high: "border border-white/20 bg-white/10 text-white",
  medium: "border border-white/10 bg-black text-white/70",
  low: "border border-white/10 bg-black text-white/50",
};

export function KritikAksiyonlar() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineBolt className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Lead risk uyarısı
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Bugünün Kritik Aksiyonları
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Sistem satış kaybı oluşmadan önce bekleyen, geciken veya eksik
            kalan işleri öne çıkarır.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
          <HiOutlineCheckCircle className="h-4 w-4" />
          Operasyon Listesine Al
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {kritikAksiyonlar.map((action) => {
          const Icon = priorityIcons[action.priority] ?? HiOutlineFire;

          return (
            <article
              key={action.id}
              className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${priorityStyles[action.priority]}`}
                  >
                    {priorityLabels[action.priority]}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/55">
                    {action.impactLabel}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/45">
                {action.description}
              </p>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                <span className="text-xs text-white/45">
                  Önerilen aksiyon
                </span>

                <span className="text-xs font-semibold text-white/75">
                  Bugün
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/45 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineExclamationTriangle className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Kritik uyarı
              </p>
              <p className="mt-1 text-sm leading-6 text-white/45">
                Çok sıcak talepler ve teklif bekleyen kayıtlar bugün aksiyona
                alınmazsa satış fırsatı kaybı oluşabilir.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Riskli Lead
            </p>
            <p className="mt-1 text-xl font-semibold text-white">7</p>
          </div>
        </div>
      </div>
    </section>
  );
}
