/**
 * Ultra CRM — DNA Vocabulary
 *
 * Sektor sozlugu. UI etiketleri ve AI promptlari bu sozlukten beslenir.
 * Ornek: Klinik DNA'sinda lead = "hasta adayi", customer = "hasta".
 *
 * Bu sozluk Core sayfa metinlerini etkiler. Sayfa kodunda
 * "Lead listesi" yerine vocabulary.lead.plural.uppercase okunur.
 */

import type { Localizable } from "./Localizable";

/** Tek bir kelimenin tekil/cogul ve farkli bicimleri */
export type VocabularyTerm = {
  /** Tekil hali (orn: "Lead") */
  singular: Localizable<string>;
  /** Cogul hali (orn: "Leadler") */
  plural: Localizable<string>;
  /** Cumle ortasinda kucuk harfli kullanim (orn: "lead") */
  lowercase?: Localizable<string>;
};

/** Sektore gore degisecek temel terimler */
export type Vocabulary = {
  /** Satis fursati / potansiyel musteri */
  lead: VocabularyTerm;
  /** Musteri (orn: "musteri", "hasta", "danisan", "ogrenci") */
  customer: VocabularyTerm;
  /** Talep (orn: "talep", "basvuru", "soru") */
  request: VocabularyTerm;
  /** Anlasma / firsat (orn: "teklif", "anlasma", "paket") */
  deal: VocabularyTerm;
  /** Kesif asamasinin sektorel karsiligi (orn: "kesif", "muayene", "saha gezisi") */
  discoveryStage: VocabularyTerm;
  /** Satis sureci genel adi (orn: "satis sureci", "tedavi sureci") */
  pipeline: VocabularyTerm;
  /** Ek terimler — DNA istedigi kadar terim ekleyebilir */
  custom?: Record<string, VocabularyTerm>;
};
