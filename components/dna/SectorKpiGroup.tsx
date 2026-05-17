"use client";

import { SectionHeader } from "../ui/SectionHeader";
import { KpiCard } from "../ui/KpiCard";
import { useDna } from "../../context/DnaContext";
import { evaluateKpi, formatKpiValue } from "../../lib/dna/kpiEvaluator";
import { resolveIcon } from "../../lib/dna/iconRegistry";
import { resolveLabel } from "../../lib/dna/keys";
import { mockEvaluationDataset } from "../../data/dna/mockEvaluationData";
import type { KpiZone } from "../../types/dna/KpiCard";

type SectorKpiGroupProps = {
  zone: KpiZone;
  title?: string;
  eyebrow?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;
};

const gridClass: Record<number, string> = {
  2: "grid sm:grid-cols-2 gap-4",
  3: "grid sm:grid-cols-2 xl:grid-cols-3 gap-4",
  4: "grid sm:grid-cols-2 xl:grid-cols-4 gap-4",
};

export function SectorKpiGroup({
  zone,
  title,
  eyebrow,
  description,
  columns = 2,
  className = "",
}: SectorKpiGroupProps) {
  const { activeDna } = useDna();

  const cards = activeDna.kpiCards
    .filter((k) => k.zone === zone)
    .sort((a, b) => a.priority - b.priority);

  if (cards.length === 0) return null;

  const colClass = gridClass[columns] ?? gridClass[2];

  return (
    <div className={className}>
      {(title || eyebrow) && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title ?? ""}
          description={description}
        />
      )}

      <div className={colClass}>
        {cards.map((kpi) => {
          const result = evaluateKpi(kpi, mockEvaluationDataset);
          const formattedValue = result.isUnavailable
            ? "—"
            : formatKpiValue(result.value, kpi.format);
          const displayValue = result.isUnavailable
            ? formattedValue
            : result.value;
          const Icon = resolveIcon(kpi.icon);
          const labelText = resolveLabel(kpi.label);
          const descText =
            kpi.description ? resolveLabel(kpi.description) : undefined;

          return (
            <KpiCard
              key={String(kpi.id)}
              label={labelText}
              value={displayValue}
              valueFormatter={(nextValue) =>
                formatKpiValue(nextValue, kpi.format)
              }
              icon={Icon}
              description={descText}
            />
          );
        })}
      </div>
    </div>
  );
}

/*
 * Ne değişti?
 * Yeni dosya: DnaContext'ten activeDna okuyup belirli bir zone'daki KPI'ları
 * grid halinde render eden bileşen.
 * evaluateKpi + formatKpiValue + resolveIcon + resolveLabel zinciri tam bağlı.
 * Boş zone → null, sıralama priority'e göre ascending.
 */
