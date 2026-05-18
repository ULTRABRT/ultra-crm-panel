import type {
  ExternalKpiSource,
  KpiCard,
  KpiSourceSimple,
} from "../../types/dna/KpiCard";
import { filterCollection } from "./filterEvaluator";

// ─────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────

export type KpiDataset = {
  leads?: Record<string, unknown>[];
  customers?: Record<string, unknown>[];
  requests?: Record<string, unknown>[];
  deals?: Record<string, unknown>[];
  messages?: Record<string, unknown>[];
};

export type KpiResult = {
  value: number;
  isUnavailable: boolean;
  error?: string;
};

// ─────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────

function pickScope(
  dataset: KpiDataset,
  scope: string | undefined
): Record<string, unknown>[] {
  if (!scope) return [];
  const key = scope as keyof KpiDataset;
  return dataset[key] ?? [];
}

function evaluateSimpleSource(
  source: KpiSourceSimple,
  dataset: KpiDataset
): number {
  const items = pickScope(dataset, source.scope);
  const filtered = filterCollection(items, source.filter);

  if (source.type === "count") {
    return filtered.length;
  }

  // sum
  return filtered.reduce((acc, item) => {
    const raw = source.field ? item[source.field] : undefined;
    const num = typeof raw === "number" ? raw : 0;
    return acc + num;
  }, 0);
}

function resolveIntegrationKey(source: ExternalKpiSource): string {
  return source.integrationKey ?? source.integrationId ?? "unknown";
}

// ─────────────────────────────────────────────
// Public API — evaluateKpi
// ─────────────────────────────────────────────

export function evaluateKpi(card: KpiCard, dataset: KpiDataset): KpiResult {
  try {
    const source = card.source;

    if (source.type === "count") {
      const items = pickScope(dataset, source.scope);
      const filtered = filterCollection(items, source.filter);
      return { value: filtered.length, isUnavailable: false };
    }

    if (source.type === "sum") {
      const items = pickScope(dataset, source.scope);
      const filtered = filterCollection(items, source.filter);
      const total = filtered.reduce((acc, item) => {
        const raw = source.field ? item[source.field] : undefined;
        const num = typeof raw === "number" ? raw : 0;
        return acc + num;
      }, 0);
      return { value: total, isUnavailable: false };
    }

    if (source.type === "average") {
      const items = pickScope(dataset, source.scope);
      const filtered = filterCollection(items, source.filter);
      if (filtered.length === 0) return { value: 0, isUnavailable: false };
      const total = filtered.reduce((acc, item) => {
        const raw = source.field ? item[source.field] : undefined;
        const num = typeof raw === "number" ? raw : 0;
        return acc + num;
      }, 0);
      return { value: total / filtered.length, isUnavailable: false };
    }

    if (source.type === "ratio") {
      const numeratorVal = evaluateSimpleSource(source.numerator, dataset);
      const denominatorVal = evaluateSimpleSource(source.denominator, dataset);
      if (denominatorVal === 0) return { value: 0, isUnavailable: false };
      return { value: numeratorVal / denominatorVal, isUnavailable: false };
    }

    if (source.type === "external") {
      const integrationKey = resolveIntegrationKey(source);
      return {
        value: 0,
        isUnavailable: true,
        error: `External integration "${integrationKey}" not implemented in V1.`,
      };
    }

    return { value: 0, isUnavailable: true, error: "Unknown source type." };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { value: 0, isUnavailable: true, error: message };
  }
}

// ─────────────────────────────────────────────
// Public API — formatKpiValue
// ─────────────────────────────────────────────

export function formatKpiValue(
  value: number,
  format: KpiCard["format"] | undefined
): string {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }).format(value);

    case "percent":
      return new Intl.NumberFormat("tr-TR", {
        style: "percent",
        maximumFractionDigits: 1,
      }).format(value);

    case "decimal":
      return new Intl.NumberFormat("tr-TR", {
        maximumFractionDigits: 2,
      }).format(value);

    case "duration": {
      const totalMinutes = Math.round(value * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      if (hours > 0) return `${hours} sa ${minutes} dk`;
      return `${minutes} dk`;
    }

    case "integer":
    default:
      return new Intl.NumberFormat("tr-TR", {
        maximumFractionDigits: 0,
      }).format(value);
  }
}

/*
 * Ne değişti?
 * Yeni dosya: KpiCard.source'dan numeric değer hesaplayan evaluator.
 * count/sum/average/ratio/external dalları + formatKpiValue (tr-TR locale, 5 format tipi).
 * Tüm hata yolları try/catch ile kapatıldı, asla throw etmez.
 */
