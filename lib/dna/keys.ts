/**
 * Ultra CRM — DNA Key & Localization Helpers
 *
 * Branded tip uretimi ve dogrulama. Tum DNA dosyalari bu helper'lari kullanir.
 * Boylece convention TS tarafindan korunur, runtime'da da dogrulanir.
 *
 * Kullanim ornekleri:
 *   const k = createDnaFieldKey("energy", "basics", "aylik_fatura");
 *   const id = createDnaKpiId("energy", "dashboard", "battery_opportunities");
 *   const label = resolveLabel({ tr: "Aylik Fatura", en: "Monthly Bill" }, "tr");
 */

import {
  DNA_KEY_PATTERN,
  DNA_SECTOR_SLUG_PATTERN,
  type DnaFieldKey,
  type DnaFieldDependencyId,
  type DnaId,
  type DnaKpiId,
  type DnaMoneyRiskRuleId,
  type DnaPersonaId,
  type DnaPipelineStageId,
  type DnaRiskRuleId,
  type DnaRoleId,
  type DnaSectionId,
  type DnaSegmentId,
  type DnaValidationRuleId,
} from "../../types/dna/DnaKey";
import type {
  Localizable,
  SupportedLocale,
} from "../../types/dna/Localizable";

/** Convention: sectorSlug_domain_key (snake_case, ASCII) */
function composeKey(sectorSlug: string, domain: string, key: string): string {
  if (!DNA_SECTOR_SLUG_PATTERN.test(sectorSlug)) {
    throw new Error(
      `Invalid sector slug "${sectorSlug}". Must match ${DNA_SECTOR_SLUG_PATTERN}.`,
    );
  }

  const composed = `${sectorSlug}_${domain}_${key}`;

  if (!DNA_KEY_PATTERN.test(composed)) {
    throw new Error(
      `Invalid DNA key "${composed}". Must match ${DNA_KEY_PATTERN}.`,
    );
  }

  return composed;
}

/** Custom field key uretici */
export function createDnaFieldKey(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaFieldKey {
  return composeKey(sectorSlug, domain, key) as DnaFieldKey;
}

/** KPI id uretici */
export function createDnaKpiId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaKpiId {
  return composeKey(sectorSlug, domain, key) as DnaKpiId;
}

/** Section id uretici */
export function createDnaSectionId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaSectionId {
  return composeKey(sectorSlug, domain, key) as DnaSectionId;
}

/** Pipeline stage id uretici */
export function createDnaPipelineStageId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaPipelineStageId {
  return composeKey(sectorSlug, domain, key) as DnaPipelineStageId;
}

/** Risk rule id uretici */
export function createDnaRiskRuleId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaRiskRuleId {
  return composeKey(sectorSlug, domain, key) as DnaRiskRuleId;
}

/** Money risk rule id uretici */
export function createDnaMoneyRiskRuleId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaMoneyRiskRuleId {
  return composeKey(sectorSlug, domain, key) as DnaMoneyRiskRuleId;
}

/** Segment id uretici */
export function createDnaSegmentId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaSegmentId {
  return composeKey(sectorSlug, domain, key) as DnaSegmentId;
}

/** Persona id uretici */
export function createDnaPersonaId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaPersonaId {
  return composeKey(sectorSlug, domain, key) as DnaPersonaId;
}

/** Validation rule id uretici */
export function createDnaValidationRuleId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaValidationRuleId {
  return composeKey(sectorSlug, domain, key) as DnaValidationRuleId;
}

/** Field dependency id uretici */
export function createDnaFieldDependencyId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaFieldDependencyId {
  return composeKey(sectorSlug, domain, key) as DnaFieldDependencyId;
}

/** Rol id uretici (security policy icin) */
export function createDnaRoleId(
  sectorSlug: string,
  domain: string,
  key: string,
): DnaRoleId {
  return composeKey(sectorSlug, domain, key) as DnaRoleId;
}

/** DNA kendi kimligi icin id uretici (orn: "energy_renewable_v1") */
export function createDnaId(value: string): DnaId {
  if (!DNA_KEY_PATTERN.test(value)) {
    throw new Error(
      `Invalid DNA id "${value}". Must match ${DNA_KEY_PATTERN}.`,
    );
  }
  return value as DnaId;
}

/**
 * Localizable<T> resolver.
 * - String verilirse aynen doner.
 * - Obje verilirse istenen dil koduna gore deger doner; yoksa tr fallback.
 */
export function resolveLabel<T extends string>(
  value: Localizable<T>,
  locale: SupportedLocale = "tr",
): T {
  if (typeof value === "string") {
    return value;
  }

  const localized = value[locale];
  if (localized !== undefined) {
    return localized;
  }

  // Fallback: tr varsa onu kullan
  if (value.tr !== undefined) {
    return value.tr;
  }

  // Son care: ilk dolu degeri don
  const firstFilled = Object.values(value).find((v) => v !== undefined);
  if (firstFilled !== undefined) {
    return firstFilled as T;
  }

  throw new Error("Localizable value has no usable translations.");
}
