export type NoLostLeadSubjectType =
  | "inbox"
  | "demand"
  | "lead"
  | "customer"
  | "offer";

export type NoLostLeadSeverity = "low" | "medium" | "high" | "critical";

export type NoLostLeadConfidence = "low" | "medium" | "high";

export type NoLostLeadStatus =
  | "readonly_advisory"
  | "needs_review"
  | "blocked_without_backend";

export type NoLostLeadReasonCode =
  | "missing_info_blocks_progress"
  | "high_intent_followup_window"
  | "offer_requested_link_unverified"
  | "owner_label_unverified";

export type NoLostLeadEvidence = {
  id: string;
  sourceType: NoLostLeadSubjectType;
  sourceId: string;
  sourceRoute: string;
  field: string;
  snapshotValue: string;
  observedAt: string;
  label: string;
  confidence: NoLostLeadConfidence;
};

export type NoLostLeadSignal = {
  id: string;
  subjectType: NoLostLeadSubjectType;
  subjectId: string;
  customerName: string;
  companyName?: string;
  severity: NoLostLeadSeverity;
  reasonCode: NoLostLeadReasonCode;
  description: string;
  evidence: NoLostLeadEvidence[];
  suggestedAction: string;
  blockedActions: string[];
  ownerLabel: string;
  dueLabel: string;
  confidence: NoLostLeadConfidence;
  status: NoLostLeadStatus;
  sourceRoutes: string[];
  requiresHumanApproval: boolean;
};
