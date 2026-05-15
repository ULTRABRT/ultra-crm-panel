/**
 * Ultra CRM — DNA Security Policy
 *
 * 23. blok — kurumsal guvenlik katmani.
 * Bu blok DNA'ya kim, neyi gorebilir / duzenleyebilir / onaylayabilir kuralini
 * config olarak verir. Boylece SOC2 / ISO27001 hazirligi DNA seviyesinde olur.
 *
 * V1'de tipte tam olarak yer alir; tum motorlari Adim sonrasi fazlarda aktive edilir.
 */

import type { DnaFieldKey, DnaRoleId } from "./DnaKey";
import type { FilterExpression } from "./FilterExpression";
import type { Localizable } from "./Localizable";

/** Bir rolun tanimi */
export type RoleDefinition = {
  id: DnaRoleId;
  label: Localizable<string>;
  description?: Localizable<string>;
  /** Bu rol bir baska rolun tum izinlerini miras alir mi */
  inheritsFrom?: DnaRoleId[];
};

/** Field bazli erisim kurali */
export type FieldAccessRule = {
  /** Hedef alan */
  field: DnaFieldKey;
  /** Bu alani gorebilen roller (bos -> herkes gorebilir) */
  visibleTo?: DnaRoleId[];
  /** Bu alani duzenleyebilen roller (bos -> kimse duzenleyemez, sadece sistem) */
  editableBy?: DnaRoleId[];
  /** Belirli kosul saglandiginda kural devreye girer */
  condition?: FilterExpression;
};

/** Maskeleme kurali (PII vb.) */
export type FieldMaskingRule = {
  /** Hedef alan */
  field: DnaFieldKey;
  /** Bu rollerden BIRI degilse maskelenecek */
  unmaskedFor: DnaRoleId[];
  /** Maskeleme stratejisi */
  strategy: "full" | "partial" | "hash";
  /** Partial icin gosterilecek karakter sayisi (orn: son 4 hane) */
  visibleChars?: number;
};

/** Onay (approval) gerektiren islem */
export type ApprovalRule = {
  id: string;
  label: Localizable<string>;
  /** Hangi islemde tetiklenir */
  triggerAction:
    | "deleteCustomer"
    | "mergeCustomers"
    | "exportData"
    | "bulkUpdate"
    | "sendCampaign"
    | "discountAboveThreshold"
    | "stageSkip"
    | "custom";
  /** Custom trigger icin ek kosul */
  condition?: FilterExpression;
  /** Onay verebilecek roller */
  approverRoles: DnaRoleId[];
  /** Aciklama gerekiyor mu (audit icin) */
  requireJustification?: boolean;
};

/** Audit log'a dusen olay tanimi */
export type AuditEventDefinition = {
  id: string;
  /** Audit log kategorisi */
  category:
    | "data_access"
    | "data_modification"
    | "permission_change"
    | "ai_action"
    | "export"
    | "authentication"
    | "configuration";
  label: Localizable<string>;
  /** Bu olay tetiklendiginde log'a dusur */
  triggerAction: string;
  /** Log'da kalma suresi (gun) — yasal saklama icin */
  retentionDays: number;
  /** PII iceriyor mu */
  containsPii?: boolean;
};

/** AI'in bir alanda yapabilecekleri */
export type AiFieldPermission = {
  field: DnaFieldKey;
  /** AI sadece okuyabilir / oneri verebilir / dogrudan yazabilir */
  level: "readOnly" | "suggestOnly" | "autoFill";
  /** Otomatik doldurma sirasinda guven esigi (0-1) */
  minimumConfidence?: number;
};

/** AI'in genel davranissal limitleri */
export type AiPermissionLimits = {
  /** AI hangi alanlarda ne yapabilir */
  fieldPermissions: AiFieldPermission[];
  /** AI hangi aksiyonlari kendi basina alabilir */
  allowedActions: Array<
    | "draftReply"
    | "sendReply"
    | "createLead"
    | "createTask"
    | "scheduleMeeting"
    | "tagCustomer"
    | "extractFields"
    | "summarizeConversation"
  >;
  /** AI'in dokunamayacagi alanlar (her zaman insan yapmali) */
  forbiddenFields?: DnaFieldKey[];
  /** AI'in dokunamayacagi aksiyonlar */
  forbiddenActions?: Array<
    "deleteData" | "modifyPricing" | "sendContract" | "issueRefund"
  >;
};

/** Sektor DNA'sinin guvenlik politikasi */
export type SecurityPolicy = {
  /** DNA'da tanimli roller */
  roles: RoleDefinition[];

  /** Field bazli erisim kurallari */
  fieldAccess?: FieldAccessRule[];

  /** Hassas alanlar — maskeleme kurallari */
  sensitiveFields?: FieldMaskingRule[];

  /** Onay gerektiren islemler */
  approvals?: ApprovalRule[];

  /** Audit log tanimlari */
  auditEvents?: AuditEventDefinition[];

  /** AI limitleri */
  aiLimits?: AiPermissionLimits;

  /** Genel veri saklama suresi (gun) — KVKK/GDPR icin */
  defaultDataRetentionDays?: number;

  /** Aktif kullanici varsayilan rolu (atanmamis ise) */
  defaultUserRole?: DnaRoleId;
};
