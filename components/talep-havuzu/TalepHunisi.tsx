import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFunnel,
  HiOutlineInboxStack,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { talepHunisi } from "../../data/talep-havuzu";
import type { RequestStage } from "../../types/talep-havuzu";

const stageIcons: Record<RequestStage, IconType> = {
  new: HiOutlineInboxStack,
  temperatureCheck: HiOutlineSparkles,
  offerStage: HiOutlineDocumentText,
  humanReview: HiOutlineUserGroup,
  ignored: HiOutlineExclamationTriangle,
};

const stageStyles: Record<RequestStage, string> = {
  new: "border-white/10 bg-white/[0.035]",
  temperatureCheck: "border-white/15 bg-white/[0.055]",
  offerStage: "border-white/10 bg-black/40",
  humanReview: "border-white/10 bg-black/50",
  ignored: "border-white/10 bg-black/30 opacity-70",
};

export function TalepHunisi() {
  const totalFlow = talepHunisi.reduce((total, step) => {
    return total + Number(step.value);
  }, 0);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineFunnel className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Akıllı Sıralama
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            Talep Hunisi
          </h2>

          <p className="mt-1 text-sm leading-6 text-white/45">
            Talepler inceleme önceliğine göre kompakt şekilde sıralanır.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Akış
          </p>
          <p className="text-lg font-semibold text-white">{totalFlow}</p>
        </div>
      </div>

      <div className="space-y-3">
        {talepHunisi.map((step) => {
          const Icon = stageIcons[step.stage] ?? HiOutlineInboxStack;

          return (
            <article
              key={step.id}
              className={`rounded-2xl border p-3 ${stageStyles[step.stage]}`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/45">
                    <Icon className="h-4 w-4 text-white/70" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {step.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/40">
                      {step.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-2xl font-semibold tracking-tight text-white">
                  {step.value}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/45 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <HiOutlineArrowTrendingUp className="h-4 w-4 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              AI öncelik önerisi
            </p>
            <p className="mt-1 text-xs leading-5 text-white/45">
              Bugün önce çok sıcak ve teklif bekleyen talepler incelenmeli.
              Eksik bilgi kayıtları ikinci inceleme notu olarak kalmalı.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
