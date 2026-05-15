/**
 * Ultra CRM — DNA Custom Field
 *
 * Her sektor DNA'si kendi ozel alanlarini bu tip ile tanimlar.
 * Ornekler:
 *   - Enerji: aylik_fatura, cati_tipi, sistem_kapasitesi
 *   - Klinik: sikayet, alerji, randevu_tipi
 *   - Sanayi: malzeme, kalinlik, adet, teslim_tarihi
 *
 * Alanlar musteri kartinda, lead kartinda, talep formunda ve teklifte gozukur.
 * "scope" hangi entity'e ait oldugunu belirler.
 */

import type { DnaFieldKey } from "./DnaKey";
import type { Localizable } from "./Localizable";

/** Desteklenen alan tipleri */
export type CustomFieldType =
  | "text"
  | "longtext"
  | "number"
  | "currency"
  | "percent"
  | "select"
  | "multiselect"
  | "boolean"
  | "date"
  | "datetime"
  | "address"
  | "geo"
  | "phone"
  | "email"
  | "url"
  | "file"
  | "image"
  | "richtext"
  | "computed";

/** Hangi entity'e ait alan */
export type CustomFieldScope = "request" | "lead" | "customer" | "deal";

/** Detay seviyesi — UI yogunluk kontrolu */
export type CustomFieldVisibility = "always" | "advanced" | "expert";

/** Select / multiselect icin option */
export type CustomFieldOption = {
  value: string;
  label: Localizable<string>;
  /** Bagimli alan gosterimi icin opsiyonel etiket */
  helperLabel?: Localizable<string>;
};

/** AI extraction icin ipucu */
export type CustomFieldAiHint = {
  /** "fatura tutari genelde TL/ay" gibi serbest metin ipucu */
  hint: Localizable<string>;
  /** Few-shot ornekler */
  examples?: Array<{
    inputMessage: string;
    extractedValue: string | number | boolean | null;
  }>;
};

/** DNA ozel alan tanimi */
export type CustomField = {
  /** Branded key (orn: createDnaFieldKey("energy", "basics", "aylik_fatura")) */
  key: DnaFieldKey;

  /** UI'da gosterilecek etiket */
  label: Localizable<string>;

  /** Veri tipi */
  type: CustomFieldType;

  /** Mantiksal grup adi (orn: "energy_basics", "energy_advanced") */
  group: string;

  /** Hangi entity'e ait */
  scope: CustomFieldScope;

  /** Zorunlu mu */
  required?: boolean;

  /** Placeholder metni */
  placeholder?: Localizable<string>;

  /** Help text / tooltip */
  helpText?: Localizable<string>;

  /** Birim (orn: "kWh", "TL/ay", "m2", "adet") */
  unit?: string;

  /** select / multiselect icin secenekler */
  options?: CustomFieldOption[];

  /** Varsayilan deger */
  defaultValue?: string | number | boolean | string[] | null;

  /** Detay seviyesi — UI yogunlugu kontrolu */
  visibility?: CustomFieldVisibility;

  /** Sayfa icinde siralama (kucukten buyuge) */
  sortOrder?: number;

  /** AI bu alani mesajdan cikarabilir mi */
  aiExtractable?: boolean;

  /** AI extraction icin ipuclari */
  aiExtractionHints?: CustomFieldAiHint;

  /** PII (kisisel veri) mi — maskeleme ve audit icin */
  pii?: boolean;

  /** Arama indexine girsin mi */
  searchable?: boolean;

  /** Sayisal alanlar icin min/max (UI hint, validation degil) */
  numericMin?: number;
  numericMax?: number;

  /** Sayisal alanlar icin ondalik basamak sayisi */
  precision?: number;
};
