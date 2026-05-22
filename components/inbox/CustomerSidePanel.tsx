import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowTrendingUp,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

import { resolveLabel } from "@/lib/dna/keys";
import type { CustomField } from "@/types/dna/CustomField";
import type { SectorDna } from "@/types/dna/SectorDna";
import type {
  InboxAction,
  InboxConversation,
  InboxCustomerDnaFieldValue,
} from "@/types/inbox";

type CustomerSidePanelProps = {
  conversation: InboxConversation | null;
  actions: InboxAction[];
  activeDna: SectorDna | null;
};

type DnaSupportField = {
  label: string;
  value: string;
  note?: string;
};

function formatDnaFieldValue(value: InboxCustomerDnaFieldValue["value"]) {
  if (typeof value === "boolean") {
    return value ? "Var" : "Yok";
  }

  if (value === null || value === "") {
    return "Bekleniyor";
  }

  return String(value);
}

function resolveFieldLabel(field: CustomField | undefined) {
  return field ? resolveLabel(field.label) : null;
}

function resolveDnaSupportFields(
  activeDna: SectorDna | null,
  conversation: InboxConversation,
) {
  const values = conversation.customerIntelligence.dnaFieldValues;

  if (!activeDna || !values?.length) {
    return [];
  }

  const valueMap = new Map(values.map((item) => [item.fieldKey, item]));
  const fieldMap = new Map(
    activeDna.customFields.map((field) => [field.key, field]),
  );
  const compactSections = [...activeDna.customerCardSections]
    .filter((section) => section.showInCompactMode || !section.defaultCollapsed)
    .sort((first, second) => first.priority - second.priority);

  const supportFields: DnaSupportField[] = [];

  for (const section of compactSections) {
    for (const fieldKey of section.fields) {
      const value = valueMap.get(fieldKey);
      const label = resolveFieldLabel(fieldMap.get(fieldKey));

      if (!value || !label) {
        continue;
      }

      supportFields.push({
        label,
        value: formatDnaFieldValue(value.value),
        note: value.note ?? resolveLabel(section.title),
      });

      if (supportFields.length >= 3) {
        return supportFields;
      }
    }
  }

  return supportFields;
}

function DecisionCell({
  label,
  value,
  note,
  variant = "default",
}: {
  label: string;
  value: string;
  note?: string;
  variant?: "default" | "score" | "action" | "source";
}) {
  const isStrong = variant === "score" || variant === "action";

  return (
    <div
      className={`arqon-customer-decision-cell arqon-customer-decision-cell--${variant} min-w-0 rounded-[0.75rem] border border-black/[0.07] bg-[#F7F8FA] px-2.5 py-1.5`}
    >
      <p className="truncate text-[10px] font-semibold text-[#6B7280]">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-[12px] font-semibold ${
          isStrong ? "text-[#0B0D10]" : "text-[#1A1D22]"
        }`}
      >
        {value}
      </p>
      {note ? (
        <p className="mt-0.5 truncate text-[10px] font-medium text-[#7A808A]">
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function CustomerSidePanel({
  actions,
  activeDna,
  conversation,
}: CustomerSidePanelProps) {
  if (!conversation) {
    return (
      <aside className="arqon-inbox-detail flex min-h-[5.5rem] items-center rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] px-4">
        <p className="text-sm font-medium text-[#7A808A]">
          Müşteri zekası için bir konuşma seç.
        </p>
      </aside>
    );
  }

  const intel = conversation.customerIntelligence;
  const dnaSupportFields = resolveDnaSupportFields(activeDna, conversation);
  const leadActionLabel =
    actions.find((action) => action.type === "createLead")?.label ?? "Lead";

  return (
    <aside
      aria-label="Customer Intelligence responsive brief"
      className="arqon-inbox-detail arqon-customer-contract rounded-[1rem] border border-black/[0.10] bg-[#FFFFFF] px-3 py-2.5 shadow-[0_16px_42px_rgba(11,13,16,0.09),inset_0_1px_0_rgba(255,255,255,0.95)]"
    >
      <div className="arqon-customer-executive-band">
        <section className="arqon-customer-identity-block flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B0D10] text-[#FFFFFF]">
            <HiOutlineSquares2X2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="arqon-customer-contract-label text-[10px] font-semibold text-[#6B7280]">
              Customer Intelligence Brief
            </p>
            <h2 className="truncate text-[13px] font-semibold text-[#0B0D10]">
              {conversation.customerName}
            </h2>
            <p className="mt-0.5 truncate text-[11px] font-medium text-[#525A65]">
              {conversation.customerTypeLabel} · {intel.interest}
            </p>
            {dnaSupportFields.length > 0 ? (
              <p className="mt-0.5 truncate text-[10px] font-semibold text-[#7A808A]">
                DNA:{" "}
                {dnaSupportFields
                  .map((field) => `${field.label}: ${field.value}`)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
        </section>

        <div className="arqon-customer-decision-grid min-w-0">
          <DecisionCell
            label="Lead Skoru"
            note="Çok yüksek"
            variant="score"
            value={`${conversation.aiScore} / 100`}
          />
          <DecisionCell
            label="Değer / Risk"
            note={intel.valueRiskLabel}
            value={intel.valueLabel}
          />
          <DecisionCell
            label="En İyi Aksiyon"
            note={intel.expectedOutcome}
            variant="action"
            value={intel.nextBestAction}
          />
          <DecisionCell
            label="Kaynak"
            note={intel.sourceDate}
            variant="source"
            value={conversation.sourceLabel}
          />
        </div>

        <div className="arqon-customer-actions flex min-w-0 items-center justify-end gap-1.5">
          <button
            type="button"
            aria-label={leadActionLabel}
            className="arqon-customer-secondary-action inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.7rem] bg-[#0B0D10] px-3 text-[11px] font-semibold text-[#FFFFFF] transition hover:bg-[#1A1D22]"
          >
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
            <span className="arqon-customer-secondary-label">
              {leadActionLabel}
            </span>
          </button>
          <button
            type="button"
            aria-label="Detaylı Profili Aç"
            className="arqon-customer-action-button inline-flex h-9 items-center justify-center gap-2 rounded-[0.7rem] border border-black/[0.08] bg-[#FFFFFF] px-3 text-[11px] font-semibold text-[#0B0D10] transition hover:bg-[#EEF0F3]"
          >
            <span className="arqon-customer-action-label">
              Detaylı Profili Aç
            </span>
            <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
