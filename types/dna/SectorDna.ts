/**
 * Ultra CRM — Sector DNA (Ana Tip)
 *
 * Bir sektorun tum davranisini taniyan ust tip. Yenilenebilir enerji,
 * klinik, emlak, sanayi gibi her sektor bu sekli doldurarak yazilir.
 *
 * V1 SCOPE NOTU:
 *   Bazi alanlar (pipeline detayli, derivedFields, riskRules tam motor,
 *   moneyRiskRules, integrations, offerTemplate, intakeForm, meta_versioning)
 *   Adim 1'de tipte yer ALMAZ. Tipler Adim 3'te eklenecek.
 *   Bu sayede V1 mock DNA'sini hizla yazip mimariyi gercek datayla test edebilir,
 *   sonraki adimlarda tipi genisletebiliriz.
 *
 *   Tip genisletildikce mevcut DNA'lar bozulmasin diye optional alanlar kullaniliyor.
 */

import type { CustomField } from "./CustomField";
import type { CustomerCardSection } from "./CustomerCardSection";
import type { DnaMeta } from "./DnaMeta";
import type { KpiCard } from "./KpiCard";
import type { SecurityPolicy } from "./SecurityPolicy";
import type { Vocabulary } from "./Vocabulary";

/** Sektor DNA'sinin ana yapisi (V1) */
export type SectorDna = {
  /** DNA kimligi */
  meta: DnaMeta;

  /** Sektor sozlugu */
  vocabulary: Vocabulary;

  /** Tum ozel alanlar */
  customFields: CustomField[];

  /** Musteri karti bolumleri */
  customerCardSections: CustomerCardSection[];

  /** Dashboard KPI'lari */
  kpiCards: KpiCard[];

  /**
   * Guvenlik politikasi.
   * V1'de tipte yer aliyor; motoru sonraki fazlarda aktif olacak.
   * DNA yazarken bos birakilabilir (defaults motor tarafindan uygulanir).
   */
  securityPolicy?: SecurityPolicy;

  /**
   * ASAGIDAKILER ILERIDEKI ADIMLARDA EKLENECEK:
   *
   *   personas: Persona[]
   *   fieldDependencies: FieldDependency[]
   *   derivedFields: DerivedField[]
   *   validationRules: ValidationRule[]
   *   pipeline: PipelineStage[]
   *   temperatureModel: TemperatureModel
   *   segmentFilters: SegmentFilter[]
   *   riskRules: RiskRule[]
   *   moneyRiskRules: MoneyRiskRule[]
   *   dashboardLayout: DashboardLayout
   *   aiRules: AiRules
   *   intakeForm: IntakeForm
   *   offerTemplate: OfferTemplate
   *   integrations: Integration[]
   *   commercials: Commercials
   *   inherits: DnaInheritance
   *   versioning: DnaVersioning
   *
   * Bu alanlar Adim 3'te tipte tanitilacak. V1 DNA'lari onlarsiz da gecerli olmali.
   */
};
