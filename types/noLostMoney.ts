import type { OfferRecord } from "./offers";

export type NoLostMoneySeverity = "low" | "medium" | "high" | "critical";

export type NoLostMoneyConfidence = "low" | "medium" | "high";

export type NoLostMoneyStatus =
  | "readonly_advisory"
  | "needs_review"
  | "blocked_without_backend";

export type NoLostMoneyEstimateLabel =
  | "potential_revenue_risk"
  | "advisory_only"
  | "evidence_incomplete";

export type NoLostMoneyReasonCode =
  | "high_value_open_offer"
  | "high_potential_low_probability"
  | "aging_negotiation_followup"
  | "missing_info_revenue_risk";

export type NoLostMoneyEvidence = {
  id: string;
  sourceType: "offer" | "customer" | "memory" | "lead";
  sourceId: string;
  sourceRoute: string;
  field: string;
  snapshotValue: string;
  observedAt: string;
  label: string;
  confidence: NoLostMoneyConfidence;
};

export type NoLostMoneySignal = {
  id: string;
  offerId: OfferRecord["id"];
  customerName: string;
  companyName: string;
  amount: number;
  currency: OfferRecord["currency"];
  probability: number;
  stage: OfferRecord["status"];
  severity: NoLostMoneySeverity;
  reasonCode: NoLostMoneyReasonCode;
  description: string;
  evidence: NoLostMoneyEvidence[];
  suggestedAction: string;
  blockedActions: string[];
  ownerLabel: string;
  followUpLabel: string;
  ageLabel: string;
  confidence: NoLostMoneyConfidence;
  status: NoLostMoneyStatus;
  sourceRoutes: string[];
  requiresHumanApproval: boolean;
  estimateLabel: NoLostMoneyEstimateLabel;
};
