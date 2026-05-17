/**
 * Ultra CRM — DNA Key & ID Convention
 *
 * Tum DNA dosyalarinda kullanilan id/key tipleri branded olarak tanimlanir.
 * Bu sayede:
 *   - Cross-DNA cakismasi engellenir (energy_basics_aylik_fatura clinic_basics_aylik_fatura)
 *   - Migration ve securityPolicy referanslari TS tarafindan denetlenir
 *   - Yanlis stringi yanlis yere koymak compile-time'da yakalanir
 *
 * Convention: <sectorSlug>_<domain>_<key> (snake_case, ASCII, lowercase)
 * Core alanlar icin: core_<scope>_<key>  (orn: core_customer_email)
 *
 * Helper "createDnaKey" lib/dna/keys.ts'de implement edilecek.
 */

/** Brand utility — runtime'da string, compile-time'da ayri tip */
type Brand<T, B extends string> = T & { readonly __brand: B };

/** DNA icindeki tum custom alanlar bu tipte */
export type DnaFieldKey = Brand<string, "DnaFieldKey">;

/** DNA icindeki KPI kartlari */
export type DnaKpiId = Brand<string, "DnaKpiId">;

/** DNA icindeki musteri karti bolumleri */
export type DnaSectionId = Brand<string, "DnaSectionId">;

/** Pipeline asamalari */
export type DnaPipelineStageId = Brand<string, "DnaPipelineStageId">;

/** Risk kurallari (No Lost Lead) */
export type DnaRiskRuleId = Brand<string, "DnaRiskRuleId">;

/** Para riski kurallari (No Lost Money) */
export type DnaMoneyRiskRuleId = Brand<string, "DnaMoneyRiskRuleId">;

/** Segment / hizli filtre */
export type DnaSegmentId = Brand<string, "DnaSegmentId">;

/** Persona */
export type DnaPersonaId = Brand<string, "DnaPersonaId">;

/** Validation kuralı */
export type DnaValidationRuleId = Brand<string, "DnaValidationRuleId">;

/** Field dependency kuralı */
export type DnaFieldDependencyId = Brand<string, "DnaFieldDependencyId">;

/** Sektor DNA'sinin kendisi */
export type DnaId = Brand<string, "DnaId">;

/** Rol tanimi (securityPolicy icin) */
export type DnaRoleId = Brand<string, "DnaRoleId">;

/**
 * Convention regex'leri — keys.ts helper'inda dogrulama icin kullanilir.
 * Bu regex'ler runtime degil, tip tarafinda bilgi amacli export edilir.
 */
export const DNA_KEY_PATTERN = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/;
export const DNA_SECTOR_SLUG_PATTERN = /^[a-z][a-z0-9]*$/;
