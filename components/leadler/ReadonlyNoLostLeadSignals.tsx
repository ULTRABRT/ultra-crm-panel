import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

import { noLostLeadSignals } from "../../data/noLostLeadSignals";
import type {
  NoLostLeadConfidence,
  NoLostLeadSeverity,
  NoLostLeadStatus,
} from "../../types/noLostLead";

const severityLabels: Record<NoLostLeadSeverity, string> = {
  low: "Dusuk",
  medium: "Orta",
  high: "Yuksek",
  critical: "Kritik",
};

const severityStyles: Record<NoLostLeadSeverity, string> = {
  low: "border border-white/10 bg-black/40 text-white/55",
  medium: "border border-white/10 bg-white/[0.04] text-white/65",
  high: "border border-white/20 bg-white/10 text-white",
  critical: "bg-white text-black",
};

const confidenceLabels: Record<NoLostLeadConfidence, string> = {
  low: "Dusuk guven",
  medium: "Orta guven",
  high: "Yuksek guven",
};

const statusLabels: Record<NoLostLeadStatus, string> = {
  readonly_advisory: "Readonly advisory",
  needs_review: "Insan onayi gerekli",
  blocked_without_backend: "Backend olmadan kapali",
};

export function ReadonlyNoLostLeadSignals() {
  return (
    <section className="arqon-section-gap rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineDocumentMagnifyingGlass className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Local evidence snapshot
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            Readonly lead risk sinyalleri
          </h2>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-white/45">
            Bu sinyal oneridir, aksiyon degildir. Backend olmadan islem
            yapilmaz; kayit, durum veya gorev yazimi yoktur.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Signal mode
          </p>
          <p className="mt-1 text-xs font-semibold text-white">
            Readonly / advisory
          </p>
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {noLostLeadSignals.map((signal) => (
          <article
            key={signal.id}
            className="rounded-[1.2rem] border border-white/10 bg-black/35 p-3 transition hover:border-white/20 hover:bg-white/[0.035]"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${severityStyles[signal.severity]}`}
              >
                {severityLabels[signal.severity]}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5 text-[10px] font-semibold text-white/55">
                {confidenceLabels[signal.confidence]}
              </span>

              <span className="rounded-full border border-white/10 bg-black/45 px-2 py-0.5 text-[10px] font-semibold text-white/45">
                {statusLabels[signal.status]}
              </span>
            </div>

            <div className="mt-2 min-w-0">
              <h3 className="text-sm font-semibold leading-5 text-white">
                {signal.customerName}
              </h3>
              {signal.companyName ? (
                <p className="text-[11px] text-white/42">
                  {signal.companyName}
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <MetaPill label="Due" value={signal.dueLabel} />
              <MetaPill label="Sorumlu" value={signal.ownerLabel} />
              <MetaPill
                label="Onay"
                value={
                  signal.requiresHumanApproval ? "Insan onayi" : "Readonly"
                }
              />
            </div>

            <p className="mt-2 line-clamp-1 text-xs leading-5 text-white/50 sm:line-clamp-2">
              {signal.description}
            </p>

            <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
              <p className="line-clamp-2 text-xs leading-5 text-white/50">
                <span className="font-semibold text-white/62">
                  Insan kontrolu:
                </span>{" "}
                {signal.suggestedAction}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {signal.evidence.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-2 py-0.5 text-[10px] font-semibold text-white/52"
                  title={`${item.sourceRoute} / ${item.field}: ${item.snapshotValue}`}
                >
                  {item.label}
                </span>
              ))}

              {signal.sourceRoutes.map((route) => (
                <span
                  key={route}
                  className="rounded-full border border-white/10 bg-black/45 px-2 py-0.5 text-[10px] text-white/42"
                >
                  {route}
                </span>
              ))}
            </div>

            <div className="mt-2 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-[11px] font-semibold text-white/50 sm:hidden">
              Localde kapali: backend olmadan islem yapilmaz.
            </div>

            <div className="mt-2 hidden flex-wrap items-center gap-1.5 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 sm:flex">
              <span className="text-[11px] font-semibold text-white/55">
                Localde kapali:
              </span>
              {signal.blockedActions.map((action) => (
                <span
                  key={action}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/45"
                >
                  {action}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 rounded-[1.25rem] border border-white/10 bg-black/45 p-3">
        <div className="flex items-start gap-3">
          <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0 text-white/65" />
          <p className="text-xs leading-5 text-white/45">
            Readonly advisory boundary: customerId linking, normalized due date,
            real owner record and durable evidence store are not available in
            this local view.
          </p>
        </div>
      </div>
    </section>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[0.025] px-2 py-1 text-[10px] text-white/45">
      <span className="shrink-0 uppercase tracking-[0.14em] text-white/30">
        {label}
      </span>
      <span className="truncate font-semibold text-white/65">
        {value}
      </span>
    </span>
  );
}
