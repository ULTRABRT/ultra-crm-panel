/**
 * Ultra CRM — Localizable<T>
 *
 * V1'de tum DNA dosyalarinda label / description / placeholder gibi alanlar
 * dogrudan string olarak yazilabilir. Yarin i18n acildiginda ayni alanlar
 * { tr, en, ... } objesi olarak yazilmaya baslar. Resolver "resolveLabel"
 * her iki formati da kabul eder. Boylece DNA dosyalari kirilmadan i18n eklenir.
 *
 * Kritik: Bu tipi her label/aciklama/placeholder/helpText kullanilan yerde tercih et.
 * Stringi dogrudan yazmak da gecerli (geriye uyumlu).
 */
export type Localizable<T = string> =
  | T
  | ({ tr: T; en?: T } & Record<string, T | undefined>);

/** Desteklenen dil kodlari — V1'de sadece tr aktif. */
export type SupportedLocale = "tr" | "en";
