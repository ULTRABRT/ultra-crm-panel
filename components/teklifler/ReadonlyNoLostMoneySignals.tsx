import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

import { noLostMoneySignals } from "../../data/noLostMoneySignals";
import type {
  NoLostMoneyConfidence,
  NoLostMoneyEstimateLabel,
  NoLostMoneySeverity,
  NoLostMoneyStatus,
} from "../../types/noLostMoney";

const severityLabels: Record<NoLostMoneySeverity, string> = {
  low: "Dusuk",
  medium: "Orta",
  high: "Yuksek",
  critical: "Kritik",
};

const severityTone: Record<NoLostMoneySeverity, string> = {
  low: "border-[#D6DAE0] bg-[#F4F5F7] text-[#6B7280]",
  medium: "border-[#C8CDD5] bg-[#FFFFFF] text-[#525A65]",
  high: "border-[#0B0D10]/15 bg-[#ECEFF3] text-[#0B0D10]",
  critical: "border-[#6B4E16]/25 bg-[#F3E9D2] text-[#6B4E16]",
};

const confidenceLabels: Record<NoLostMoneyConfidence, string> = {
  low: "Dusuk guven",
  medium: "Orta guven",
  high: "Yuksek guven",
};

const statusLabels: Record<NoLostMoneyStatus, string> = {
  readonly_advisory: "Readonly advisory",
  needs_review: "Insan onayi gerekli",
  blocked_without_backend: "Backend olmadan kapali",
};

const estimateLabels: Record<NoLostMoneyEstimateLabel, string> = {
  potential_revenue_risk: "Potential revenue risk",
  advisory_only: "Advisory only",
  evidence_incomplete: "Evidence incomplete",
};

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  currency: "TRY",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatAmount(amount: number, currency: string) {
  if (currency === "TRY") {
    return moneyFormatter.format(amount);
  }

  return `${amount.toLocaleString("tr-TR")} ${currency}`;
}

export function ReadonlyNoLostMoneySignals() {
  return (
    <section className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_14px_34px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1">
            <HiOutlineDocumentMagnifyingGlass className="h-4 w-4 text-[#525A65]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#525A65]">
              Local evidence snapshot
            </span>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-[#0B0D10]">
            Readonly ciro risk sinyalleri
          </h2>

          <p className="mt-1 max-w-4xl text-xs leading-5 text-[#6B7280]">
            Bu sinyal öneridir, finansal kesinlik değildir. Backend olmadan
            işlem yapılmaz; teklif, görev veya durum kaydı yazılmaz.
          </p>
        </div>

        <div className="rounded-[0.85rem] border border-black/[0.08] bg-[#0B0D10] px-3 py-2 text-white">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Signal mode
          </p>
          <p className="mt-1 text-xs font-semibold">Readonly / advisory</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {noLostMoneySignals.map((signal) => (
          <article
            key={signal.id}
            className="min-w-0 rounded-[0.95rem] border border-black/[0.08] bg-[#F7F8FA] p-3 transition hover:border-black/[0.14] hover:bg-[#FFFFFF]"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${severityTone[signal.severity]}`}
              >
                {severityLabels[signal.severity]}
              </span>
              <span className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#525A65]">
                {confidenceLabels[signal.confidence]}
              </span>
              <span className="hidden rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#7A808A] sm:inline-flex">
                {statusLabels[signal.status]}
              </span>
            </div>

            <div className="mt-2 min-w-0">
              <h3 className="truncate text-sm font-semibold text-[#0B0D10]">
                {signal.companyName}
              </h3>
              <p className="mt-0.5 truncate text-[11px] text-[#6B7280]">
                {signal.customerName}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <MetaPill
                label="Tutar"
                value={formatAmount(signal.amount, signal.currency)}
              />
              <MetaPill label="Ihtimal" value={`%${signal.probability}`} />
              <MetaPill label="Takip" value={signal.followUpLabel} />
            </div>

            <p className="mt-2 hidden line-clamp-2 text-xs leading-5 text-[#525A65] 2xl:block">
              {signal.description}
            </p>

            <div className="mt-2 hidden rounded-[0.85rem] border border-black/[0.08] bg-[#FFFFFF] px-3 py-2 2xl:block">
              <p className="line-clamp-2 text-xs leading-5 text-[#525A65]">
                <span className="font-semibold text-[#0B0D10]">
                  Human approval:
                </span>{" "}
                {signal.suggestedAction}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-2 py-0.5 text-[10px] font-semibold text-[#6B4E16]">
                {estimateLabels[signal.estimateLabel]}
              </span>
              <span className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#7A808A]">
                {signal.ageLabel}
              </span>
              {signal.requiresHumanApproval ? (
                <span className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#525A65]">
                  insan onayı gerekli
                </span>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {signal.evidence.slice(0, 1).map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#525A65]"
                  title={`${item.sourceRoute} / ${item.field}: ${item.snapshotValue}`}
                >
                  {item.label}
                </span>
              ))}
              <span className="hidden rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-semibold text-[#525A65] sm:inline-flex">
                {signal.evidence.length} evidence
              </span>
              {signal.sourceRoutes.map((route) => (
                <span
                  key={route}
                  className="rounded-full border border-black/[0.08] bg-[#EEF0F3] px-2 py-0.5 text-[10px] text-[#7A808A]"
                >
                  {route}
                </span>
              ))}
            </div>

            <div className="mt-2 rounded-[0.85rem] border border-black/[0.08] bg-[#FFFFFF] px-3 py-1.5 text-[11px] font-semibold text-[#6B7280]">
              Localde kapalı: backend olmadan işlem yapılmaz.
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 rounded-[0.9rem] border border-black/[0.08] bg-[#0B0D10] p-3 text-white">
        <div className="flex items-start gap-2.5">
          <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
          <p className="text-xs leading-5 text-white/55">
            Readonly advisory boundary: margin, close date, durable evidence
            store and source of truth are not available in this local view.
            Financial review requires human approval.
          </p>
        </div>
      </div>
    </section>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-1 text-[10px] text-[#7A808A]">
      <span className="shrink-0 uppercase tracking-[0.12em] text-[#9AA0A8]">
        {label}
      </span>
      <span className="truncate font-semibold text-[#0B0D10]">{value}</span>
    </span>
  );
}
