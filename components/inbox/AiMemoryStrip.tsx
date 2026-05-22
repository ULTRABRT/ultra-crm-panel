import {
  HiOutlineInformationCircle,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { resolveLabel } from "@/lib/dna/keys";
import type { CustomField } from "@/types/dna/CustomField";
import type { SectorDna } from "@/types/dna/SectorDna";
import type {
  InboxConversation,
  InboxCustomerDnaFieldValue,
} from "@/types/inbox";

type AiMemoryStripProps = {
  conversation: InboxConversation;
  activeDna: SectorDna | null;
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

function getIntentSummary(conversation: InboxConversation) {
  return conversation.customerIntelligence.interest || conversation.intentLabel;
}

function getNextAction(conversation: InboxConversation) {
  return conversation.customerIntelligence.nextBestAction;
}

function getDnaContextSummary(
  activeDna: SectorDna | null,
  conversation: InboxConversation,
) {
  const values = conversation.customerIntelligence.dnaFieldValues;

  if (!activeDna || !values?.length) {
    return conversation.customerIntelligence.valueRiskLabel;
  }

  const valueMap = new Map(values.map((item) => [item.fieldKey, item]));
  const fieldMap = new Map(
    activeDna.customFields.map((field) => [field.key, field]),
  );
  const compactSection = [...activeDna.customerCardSections]
    .filter((section) => section.showInCompactMode || !section.defaultCollapsed)
    .sort((first, second) => first.priority - second.priority)
    .find((section) => section.fields.some((fieldKey) => valueMap.has(fieldKey)));

  if (!compactSection) {
    return conversation.customerIntelligence.valueRiskLabel;
  }

  const supportFields = compactSection.fields
    .map((fieldKey) => {
      const value = valueMap.get(fieldKey);
      const label = resolveFieldLabel(fieldMap.get(fieldKey));

      if (!value || !label) {
        return null;
      }

      return `${label}: ${formatDnaFieldValue(value.value)}`;
    })
    .filter((item): item is string => Boolean(item))
    .slice(0, 2);

  if (supportFields.length === 0) {
    return conversation.customerIntelligence.valueRiskLabel;
  }

  return `${resolveLabel(compactSection.title)}: ${supportFields.join(" · ")}`;
}

export function AiMemoryStrip({
  activeDna,
  conversation,
}: AiMemoryStripProps) {
  const missionSummary = `Niyet: ${getIntentSummary(
    conversation,
  )} · Bağlam: ${getDnaContextSummary(
    activeDna,
    conversation,
  )} · Aksiyon: ${getNextAction(conversation)}`;

  return (
    <section className="arqon-memory-decision-strip rounded-none bg-[#FFFFFF]">
      <div className="arqon-mission-strip grid min-w-0 gap-2 rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] px-2 py-1.5">
        <div className="arqon-mission-priority flex min-w-0 items-center gap-2">
          <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-[0.62rem] bg-[#0B0D10] px-2.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#FFFFFF]">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
            Görev
          </span>
          <p className="truncate text-[12px] font-semibold text-[#0B0D10]">
            Karar bağlamını tamamla
          </p>
        </div>

        <p className="arqon-memory-context-line min-w-0 truncate text-[11px] font-semibold text-[#525A65]">
          {missionSummary}
        </p>

        <div className="arqon-mission-status flex min-w-0 shrink-0 items-center gap-1.5">
          <span className="hidden items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[11px] font-semibold text-[#525A65] xl:inline-flex">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
            {activeDna ? resolveLabel(activeDna.meta.packageLabel) : "Yerel bağlam"}
          </span>
          <span className="rounded-full bg-[#0B0D10] px-2 py-0.5 text-[11px] font-semibold text-[#FFFFFF]">
            {conversation.aiScore} skor
          </span>
          <span className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 py-0.5 text-[11px] font-semibold text-[#525A65]">
            {conversation.isUnread ? "Yanıt bekliyor" : "İzlemede"}
          </span>
          <button
            type="button"
            className="inline-flex h-6 items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2 text-[11px] font-semibold text-[#0B0D10] transition hover:bg-[#EEF0F3]"
          >
            Detaylar
            <HiOutlineInformationCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
