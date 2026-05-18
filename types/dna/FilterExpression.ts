/**
 * Ultra CRM — DNA Filter Expression (JSON-DSL)
 *
 * Tip guvenli, gorsel editor uyumlu, recursive filter dili.
 * FilterExpression; visibility, validation, riskRule, segmentFilter,
 * fieldDependency ve benzeri tum kosullu mantik icin tek kaynak.
 *
 * Kritik kural: V1'de raw eval yok. Tum kosullar bu DSL ile yazilir.
 * Helper "evaluateFilter(expression, context)" lib/dna/filterEvaluator.ts'de
 * (Adim 2'de) implement edilecek.
 */

/** Karsilastirma operatorleri */
export type FilterComparator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith"
  | "in"
  | "notIn"
  | "between"
  | "isEmpty"
  | "isNotEmpty"
  | "isTrue"
  | "isFalse";

/** Bir alan uzerinde calisan tekil kosul */
export type FieldFilterExpression = {
  op: "fieldOp";
  /** DNA field key (sectorSlug_domain_key formatinda) veya core entity path */
  field: string;
  comparator: FilterComparator;
  /** Karsilastirma degeri. isEmpty/isNotEmpty/isTrue/isFalse icin gerekmez. */
  value?: string | number | boolean | string[] | number[] | [number, number];
};

type TimeWindowHoursFields =
  | {
      /** Canonical hour window field */
      hours: number;
      /** Backward-compatible V1 field */
      windowHours?: number;
    }
  | {
      /** Canonical hour window field */
      hours?: number;
      /** Backward-compatible V1 field */
      windowHours: number;
    };

/** Yatay zaman penceresi kontrolu icin ozel kosul (orn. "son 2 saatte") */
export type TimeWindowFilterExpression = {
  op: "timeWindow";
  /** Karsilastirilacak zaman alani (orn. "lead.lastContactAt") */
  field: string;
  /** "within" = pencere icinde, "exceeds" = pencereyi astiysa */
  mode: "within" | "exceeds";
} & TimeWindowHoursFields;

/** Mantiksal AND */
export type AndFilterExpression = {
  op: "and";
  expressions: FilterExpression[];
};

/** Mantiksal OR */
export type OrFilterExpression = {
  op: "or";
  expressions: FilterExpression[];
};

/** Mantiksal NOT */
export type NotFilterExpression = {
  op: "not";
  expression: FilterExpression;
};

/** Sabit dogru / yanlis (rule editor varsayilani veya kapali kural icin) */
export type ConstantFilterExpression = {
  op: "constant";
  value: boolean;
};

/** Tum varyantlarin uniyonu */
export type FilterExpression =
  | FieldFilterExpression
  | TimeWindowFilterExpression
  | AndFilterExpression
  | OrFilterExpression
  | NotFilterExpression
  | ConstantFilterExpression;

/**
 * Evaluation context — filterEvaluator'a verilecek.
 * Adim 2'de evaluateFilter implementasyonu bu sekli kullanir.
 */
export type FilterEvaluationContext = {
  /** Tek bir entity (lead, customer, request, deal) snapshot'i */
  entity?: Record<string, unknown>;
  /** Su anki zaman (test edilebilirlik icin enjekte edilebilir) */
  now?: Date;
  /** Aktif kullanicinin rolu (securityPolicy degerlendirmesi icin) */
  currentUserRole?: string;
  /** Ek context (tenant ayarlari, kanallar vb.) */
  extra?: Record<string, unknown>;
};
