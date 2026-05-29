import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import type { ReactNode } from "react";

import { activeCustomerMemorySnapshot } from "../../data/customerMemory";
import type {
  CustomerMemoryApprovalState,
  CustomerMemoryConfidence,
} from "../../types/customerMemory";

const confidenceLabels: Record<CustomerMemoryConfidence, string> = {
  low: "Dusuk guven",
  medium: "Orta guven",
  high: "Yuksek guven",
};

const approvalLabels: Record<CustomerMemoryApprovalState, string> = {
  readonly_snapshot: "Readonly snapshot",
  human_review_required: "Insan onayi gerekli",
  blocked_without_persistence: "Persistence olmadan kapali",
};

export function CustomerMemorySnapshot() {
  const snapshot = activeCustomerMemorySnapshot;

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/20 sm:p-4">
      <div className="mb-3 flex flex-col gap-2.5 sm:mb-4 sm:gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 sm:px-3">
            <HiOutlineSparkles className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              {snapshot.snapshotLabel}
            </span>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Customer Memory Snapshot
          </h2>

          <p className="mt-1.5 max-w-3xl text-xs leading-5 text-white/45">
            Bu panel mevcut local kaynaklardan okunan readonly musteri
            hafizasini gosterir. Kalici kayit, backend yazimi veya islem
            yazimi iddiasi tasimaz.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-2 lg:w-[320px]">
          <StatusPill label="source" value={snapshot.sourceLabel} />
          <StatusPill
            label="confidence"
            value={confidenceLabels[snapshot.confidence]}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
        <article className="rounded-[1.25rem] border border-white/10 bg-black/35 p-3 sm:p-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-2 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-black sm:px-3">
              <HiOutlineUserCircle className="h-3.5 w-3.5" />
              {snapshot.customerName}
            </span>

            <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5 text-xs font-semibold text-white/55 sm:px-3">
              {snapshot.companyName}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs font-semibold text-white/60 sm:px-3">
              {approvalLabels[snapshot.approvalState]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <MemoryMetric
              label="Görünen niyet"
              value={snapshot.activeIntent}
              icon={<HiOutlineSparkles className="h-4 w-4" />}
            />
            <MemoryMetric
              label="Lifecycle"
              value={snapshot.lifecycleStage}
              icon={<HiOutlineShieldCheck className="h-4 w-4" />}
            />
            <MemoryMetric
              label="Son temas"
              value={snapshot.lastTouchAt}
              icon={<HiOutlineClock className="h-4 w-4" />}
            />
            <MemoryMetric
              label="Evidence"
              value={`${snapshot.evidence.length} local source`}
              icon={<HiOutlineDocumentText className="h-4 w-4" />}
            />
          </div>

          <div className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-2">
            <MemoryList
              title="Key facts"
              items={snapshot.keyFacts}
              emptyLabel="Key fact yok"
            />
            <MemoryList
              title="Eksik bilgi"
              items={snapshot.missingInfo}
              emptyLabel="Eksik bilgi yok"
            />
          </div>

          <div className="mt-3 rounded-[1.1rem] border border-white/10 bg-white/[0.025] p-3 sm:mt-4">
            <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
              <HiOutlineCheckCircle className="h-4 w-4 text-white/65" />
              <p className="text-sm font-semibold text-white">
                Sonraki öneri
              </p>
            </div>

            <p className="text-sm leading-5 text-white/52 sm:leading-6">
              {snapshot.nextBestAction}
            </p>
          </div>
        </article>

        <aside className="grid gap-3 sm:grid-cols-2 xl:block xl:space-y-3">
          <article className="rounded-[1.25rem] border border-white/10 bg-black/35 p-3 sm:p-4">
            <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
              <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
                <HiOutlineExclamationTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Acik riskler</p>
                <p className="mt-1 text-xs text-white/40">
                  Readonly advisory signal; işlem veya kayıt yazımı yok
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {snapshot.openRisks.slice(0, 4).map((risk) => (
                <p
                  key={risk}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs leading-5 text-white/55"
                >
                  {risk}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[1.25rem] border border-white/10 bg-black/35 p-3 sm:p-4">
            <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
              <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
                <HiOutlineDocumentText className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Evidence chips
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Local fixture source map
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {snapshot.evidence.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs font-semibold text-white/55 sm:px-3"
                  title={`${item.route} / ${item.field}: ${item.snapshotValue}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </article>
        </aside>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)]">
        <article className="rounded-[1.25rem] border border-white/10 bg-black/35 p-3 sm:p-4">
          <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
              <HiOutlineClock className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Memory timeline
              </p>
              <p className="mt-1 text-xs text-white/40">
                Local readonly snapshot akisi
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {snapshot.timeline.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-2.5 sm:p-3"
              >
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white/45">
                    {item.sourceLabel}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-3 sm:p-4">
          <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
            <HiOutlineShieldCheck className="h-4 w-4 text-white/70" />
            <p className="text-sm font-semibold text-white">
              Human approval boundary
            </p>
          </div>

          <div className="space-y-2">
            {snapshot.approvalNotes.map((note) => (
              <p
                key={note}
                className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-xs leading-5 text-white/50"
              >
                {note}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/45 px-2.5 py-2 sm:px-3 sm:py-2.5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold leading-5 text-white">
        {value}
      </p>
    </div>
  );
}

function MemoryMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.025] p-2.5 sm:p-3">
      <div className="mb-1.5 inline-flex rounded-2xl border border-white/10 bg-black/45 p-1.5 text-white/70 sm:mb-2 sm:p-2">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold leading-5 text-white sm:mt-1.5 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

function MemoryList({
  emptyLabel,
  items,
  title,
}: {
  emptyLabel: string;
  items: string[];
  title: string;
}) {
  return (
    <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.025] p-2.5 sm:p-3">
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="mt-1.5 space-y-1 sm:mt-2 sm:space-y-1.5">
        {items.length > 0 ? (
          items.slice(0, 5).map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
              <p className="text-xs leading-5 text-white/50">{item}</p>
            </div>
          ))
        ) : (
          <p className="text-xs leading-5 text-white/40">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}
