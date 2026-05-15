/**
 * Ultra CRM — Tenant DNA Override
 *
 * Kati prensip: Tenant raw DNA yazmaz. Sadece guvenli override yapar.
 * Ultra CRM merkez DNA'yi gunceller -> tenant override'lari korunur.
 *
 * Override yapilabilecek alanlar:
 *   - Label override'lari (vocabulary, KPI, section title)
 *   - Sicaklik esikleri
 *   - SLA / bekleme sureleri
 *   - KPI gorunurlugu (gizle / goster)
 *   - Section sirasi
 *   - Custom field eklemeleri (sinirli)
 *   - Security politika genisletmeleri (rol ekleme, izin kisitlama)
 *
 * Override yapilamayan alanlar:
 *   - DNA meta (id, version)
 *   - Field tipini degistirme (sadece label/required degistirebilir)
 *   - Yeni pipeline asamasi ekleme (eski kayitlari kirar — opsiyonel sonra)
 */

import type {
  DnaFieldKey,
  DnaKpiId,
  DnaSectionId,
  DnaPipelineStageId,
  DnaRiskRuleId,
} from "./DnaKey";
import type { Localizable } from "./Localizable";

/** Tek bir field icin override edilebilir alanlar */
export type CustomFieldOverride = {
  /** Hedef field */
  key: DnaFieldKey;
  /** Yeni etiket */
  label?: Localizable<string>;
  /** Yeni placeholder */
  placeholder?: Localizable<string>;
  /** Yeni help text */
  helpText?: Localizable<string>;
  /** Required durumu */
  required?: boolean;
  /** Gizle */
  hidden?: boolean;
  /** Yeni sira */
  sortOrder?: number;
};

/** KPI icin override */
export type KpiCardOverride = {
  id: DnaKpiId;
  label?: Localizable<string>;
  description?: Localizable<string>;
  hidden?: boolean;
  priority?: number;
};

/** Section icin override */
export type CustomerCardSectionOverride = {
  id: DnaSectionId;
  title?: Localizable<string>;
  description?: Localizable<string>;
  hidden?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  priority?: number;
};

/** Pipeline stage icin override */
export type PipelineStageOverride = {
  id: DnaPipelineStageId;
  label?: Localizable<string>;
  expectedDurationDays?: number;
  warnAfterHours?: number;
  criticalAfterHours?: number;
};

/** Risk kurali override */
export type RiskRuleOverride = {
  id: DnaRiskRuleId;
  label?: Localizable<string>;
  /** Kurali kapat */
  disabled?: boolean;
  /** Severity'i degistir */
  severity?: "low" | "medium" | "high" | "critical";
};

/** Tenant'in DNA uzerinde yaptigi tum override'lar */
export type TenantOverride = {
  /** Hangi DNA uzerinde override */
  baseDnaId: string;

  /** Hangi DNA versiyonuna karsi yazilmis (migration guvenligi icin) */
  baseDnaVersion: string;

  /** Tenant kimligi */
  tenantId: string;

  /** Override'in son guncellenme zamani */
  updatedAt: string;

  /** Override'in olusturan kullanici */
  updatedBy?: string;

  /** Vocabulary override'lari (sadece label degistirilebilir) */
  vocabularyOverrides?: {
    lead?: Localizable<string>;
    customer?: Localizable<string>;
    request?: Localizable<string>;
    deal?: Localizable<string>;
    discoveryStage?: Localizable<string>;
  };

  /** Field override'lari */
  fieldOverrides?: CustomFieldOverride[];

  /** KPI override'lari */
  kpiOverrides?: KpiCardOverride[];

  /** Section override'lari */
  sectionOverrides?: CustomerCardSectionOverride[];

  /** Pipeline stage override'lari */
  pipelineOverrides?: PipelineStageOverride[];

  /** Risk kurali override'lari */
  riskRuleOverrides?: RiskRuleOverride[];

  /** Sicaklik esiklerini degistirme */
  temperatureThresholdOverrides?: {
    veryHot?: number;
    hot?: number;
    warm?: number;
  };

  /** Paket etiketini override etme (orn: "Enerji Paketi" -> "Solify Premium") */
  packageLabelOverride?: Localizable<string>;
};
