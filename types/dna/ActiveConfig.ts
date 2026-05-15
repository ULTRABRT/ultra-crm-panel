/**
 * Ultra CRM — Active Config
 *
 * Panele uygulanan son hali. Uc katmanin birlesmis hali:
 *   Layer 1: SectorDna (Ultra CRM'in saglarigi)
 *   Layer 2: TenantOverride (tenant'in ozellestirmesi)
 *   Layer 3: UserPreferences (V1'de yok, V2'de eklenecek)
 *
 * "resolveActiveConfig(dna, override?)" helper'i (Adim 2'de) bu tipi uretir.
 * Tum UI component'leri ActiveConfig okur, SectorDna degil.
 * Boylece TenantOverride saydam sekilde uygulanir.
 *
 * NOT: Bu V1'de SectorDna ile cok benzer. Tip ayri tutuldu cunku ileride
 * UserPreferences eklenince ActiveConfig genisleyecek, SectorDna sade kalacak.
 */

import type { CustomField } from "./CustomField";
import type { CustomerCardSection } from "./CustomerCardSection";
import type { DnaMeta } from "./DnaMeta";
import type { KpiCard } from "./KpiCard";
import type { SecurityPolicy } from "./SecurityPolicy";
import type { Vocabulary } from "./Vocabulary";

/** Panele uygulanan son konfigurasyon */
export type ActiveConfig = {
  /** DNA kimligi (override'larin merkez DNA'siyla uyumlu oldugu dogrulanmis) */
  meta: DnaMeta;

  /** Override'larla birlesmis vocabulary */
  vocabulary: Vocabulary;

  /** Override'larla birlesmis custom fields (gizli olanlar cikarilmis) */
  customFields: CustomField[];

  /** Override'larla birlesmis sectionlar (gizli olanlar cikarilmis, siralanmis) */
  customerCardSections: CustomerCardSection[];

  /** Override'larla birlesmis KPI'lar (gizli olanlar cikarilmis, siralanmis) */
  kpiCards: KpiCard[];

  /** Security policy (override yok, dogrudan DNA'dan gelir) */
  securityPolicy?: SecurityPolicy;

  /** Birlesimde uygulanmis tenant override'in versiyonu (audit icin) */
  appliedOverrideVersion?: string;

  /** Active config olusturulma zamani */
  resolvedAt: string;
};
