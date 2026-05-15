/**
 * Ultra CRM — DNA KPI Card
 *
 * Dashboard KPI kart tanimi. Hem Core KPI'lar (Toplam Talep, Cok Sicak)
 * hem de sektore ozel KPI'lar (Batarya Firsatlari, Yuksek Fatura) bu tip ile yazilir.
 *
 * "source" alani verinin nereden ve nasil cekilecegini tanimlar.
 * "renderAs" alani gorsel rendering tipini secer.
 * "zone" alani panel icinde yerlesimi belirler.
 */

import type { DnaKpiId } from "./DnaKey";
import type { FilterExpression } from "./FilterExpression";
import type { Localizable } from "./Localizable";

/** KPI veri kaynagi varyantlari */
export type KpiSource =
  | {
      /** Filtreye uyan kayit sayisi */
      type: "count";
      /** Hangi entity koleksiyonu (orn: "leads", "requests") */
      scope: "leads" | "customers" | "requests" | "deals" | "messages";
      /** Sayilacak filtre */
      filter?: FilterExpression;
    }
  | {
      /** Bir alanin toplami */
      type: "sum";
      scope: "leads" | "customers" | "requests" | "deals";
      /** Hangi alan toplanir (DNA field key veya core field path) */
      field: string;
      filter?: FilterExpression;
    }
  | {
      /** Bir alanin ortalamasi */
      type: "average";
      scope: "leads" | "customers" | "requests" | "deals";
      field: string;
      filter?: FilterExpression;
    }
  | {
      /** Iki sayinin orani (yuzde) */
      type: "ratio";
      numerator: KpiSourceSimple;
      denominator: KpiSourceSimple;
    }
  | {
      /** Dis entegrasyon (V1'de tipte var, motoru sonra) */
      type: "external";
      integrationId: string;
      metric: string;
    };

/** Ratio icin alt tip (recursion engellemek icin) */
export type KpiSourceSimple =
  | {
      type: "count";
      scope: "leads" | "customers" | "requests" | "deals" | "messages";
      filter?: FilterExpression;
    }
  | {
      type: "sum";
      scope: "leads" | "customers" | "requests" | "deals";
      field: string;
      filter?: FilterExpression;
    };

/** KPI gorsel rendering tipi */
export type KpiRenderAs =
  | "bigNumber"
  | "progress"
  | "sparkline"
  | "deltaCard"
  | "ratio";

/** KPI format tipi */
export type KpiFormat =
  | "integer"
  | "decimal"
  | "currency"
  | "percent"
  | "duration";

/** KPI karsilastirma referansi */
export type KpiComparison = "yesterday" | "lastWeek" | "lastMonth" | "target";

/** KPI yerlesim bolgesi */
export type KpiZone =
  | "primary"
  | "secondary"
  | "boardroom_briefing"
  | "boardroom_right_column"
  | "talep_havuzu_top"
  | "leadler_top"
  | "musteri_karti_top";

/** Dashboard KPI karti tanimi */
export type KpiCard = {
  /** Branded KPI id */
  id: DnaKpiId;

  /** Etiket */
  label: Localizable<string>;

  /** Opsiyonel aciklama */
  description?: Localizable<string>;

  /** Ikon tanimlayicisi */
  icon?: string;

  /** Veri kaynagi */
  source: KpiSource;

  /** Gorsel rendering */
  renderAs: KpiRenderAs;

  /** Karsilastirma (varsa) */
  comparison?: KpiComparison;

  /** Format */
  format?: KpiFormat;

  /** Yerlesim bolgesi */
  zone: KpiZone;

  /** Siralama */
  priority: number;

  /** Tiklayinca yonlendirilecek route (orn: "/leadler?segment=...") */
  drilldownTarget?: string;

  /** Compact modda da gozuksun mu */
  showInCompactMode?: boolean;
};
