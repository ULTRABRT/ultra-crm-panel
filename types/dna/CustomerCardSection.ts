/**
 * Ultra CRM — DNA Customer Card Section
 *
 * Musteri Kartlari sayfasinin sektore ozel bolumleri.
 * Mevcut paneldeki "Enerji Talep Bilgileri" karti bu tipin bir ornegidir.
 *
 * Onemli: Ayni veri kumesi farkli layout'larla gosterilebilir:
 *   - "fieldGrid" -> duzenlenebilir input grid
 *   - "fieldList" -> sade liste
 *   - "kpiGrid"   -> sayi vurgulu KPI kartlar
 *   - "signalGrid"-> Var/Yok rozetleri
 *   - "missingChecklist" -> eksik alanlari liste
 */

import type { DnaFieldKey, DnaSectionId, DnaPersonaId, DnaPipelineStageId } from "./DnaKey";
import type { FilterExpression } from "./FilterExpression";
import type { Localizable } from "./Localizable";

/** Bolum gorunum tipi */
export type CustomerCardSectionLayout =
  | "fieldGrid"
  | "fieldList"
  | "kpiGrid"
  | "signalGrid"
  | "missingChecklist";

/** Bolum gorunurluk kosullari */
export type CustomerCardSectionVisibility = {
  /** Sadece belirli oncelik seviyelerinde gozuksun */
  minPriority?: "low" | "medium" | "high" | "critical";
  /** Sadece belirli persona'lar icin */
  showIfPersona?: DnaPersonaId[];
  /** Sadece belirli pipeline asamalarinda */
  showIfStage?: DnaPipelineStageId[];
  /** Daha karmasik kosullar icin JSON-DSL */
  condition?: FilterExpression;
};

/** Musteri karti bolum tanimi */
export type CustomerCardSection = {
  /** Branded section id */
  id: DnaSectionId;

  /** Bolum basligi */
  title: Localizable<string>;

  /** Opsiyonel aciklama / alt baslik */
  description?: Localizable<string>;

  /** Ikon tanimlayicisi */
  icon?: string;

  /** Hangi gorunumde render edilecek */
  layout: CustomerCardSectionLayout;

  /** Bolumde gosterilecek field key'leri (siralanmis) */
  fields: DnaFieldKey[];

  /** Gorunurluk kosullari */
  visibility?: CustomerCardSectionVisibility;

  /** Sayfa icinde siralama */
  priority: number;

  /** Acilip kapanabilir mi */
  collapsible?: boolean;

  /** Varsayilan kapali mi acilsin */
  defaultCollapsed?: boolean;

  /** Compact (yogun) modda da gozuksun mu */
  showInCompactMode?: boolean;
};
